/**
 * api.js — Public API Facade
 * Lớp mỏng trên Data.Http + Data.Cache + Data.Queue.
 * @requires core/*, data/*, auth/session.js
 */
'use strict';

CL.define('API', () => {

  const cfg     = CL.require('Config');
  const Http    = CL.require('Data.Http');
  const Cache   = CL.require('Data.Cache');
  const Queue   = CL.require('Data.Queue');
  const Session = CL.require('Auth.Session');
  const Events  = CL.require('Events');

  const _logBuf = [];
  let _logTimer = null;

  function _flushLogs() {
    if (!_logBuf.length) return;
    const url = _url(), token = Session.getToken();
    if (!url || !token) return;
    Http.postAsync(url, { action: 'logAccess', token, logs: _logBuf.splice(0, cfg.API.LOG_BATCH_SIZE) });
  }
  window.addEventListener('visibilitychange', () => { if (document.hidden) _flushLogs(); });

  function _url()  { return localStorage.getItem(cfg.LS.SCRIPT_URL) || ''; }
  function _tok()  { return Session.getToken(); }
  function _ok()   { return !!_url(); }
  async function _post(body, timeoutMs) { return Http.post(_url(), body, timeoutMs); }
  async function _get(params){ return Http.get(_url(), { ...params, token: _tok() }); }
  function _bufLog(a, d) {
    _logBuf.push({ action: a, detail: String(d||''). substring(0,100) });
    clearTimeout(_logTimer);
    _logTimer = setTimeout(_flushLogs, cfg.API.LOG_FLUSH_MS);
  }

  // Auth
  async function login(role, creds) { return _post({ action: 'login', role, ...creds }); }
  async function logout() { Http.postAsync(_url(), { action: 'logout', token: _tok() }); }
  async function changePassword(o, n) { return _post({ action: 'changePassword', token: _tok(), oldPwd: o, newPwd: n }); }
  async function updateProfile(data)  { return _post({ action: 'updateProfile',   token: _tok(), ...data }); }

  // Exercises
  async function getExerciseDetail(id, force) {
    return Cache.swr('exercise_'+id, cfg.CACHE_TTL.EXERCISE_DETAIL, () => _get({ action: 'getExercise', bai_id: id }), force);
  }

  // Scores & History
  function submitScore(baiId, tieuDe, diem, thoiGian, kyKtId) {
    Queue.enqueue('submitScore', { token: _tok(), bai_id: baiId, tieu_de: tieuDe, diem, thoi_gian: thoiGian||0, ky_kt_id: kyKtId||'' });
    _bufLog('submit', baiId+':'+diem);
    Events.emit('grade:submitted', { exId: baiId, score: diem });
  }
  async function getScores(force)   { return Cache.swr('scores_all',   cfg.CACHE_TTL.SCORES,     () => _get({ action: 'getScores' }),     force); }
  async function getHistory(force)  { return Cache.swr('history_me',   cfg.CACHE_TTL.HISTORY,    () => _get({ action: 'getHistory' }),    force); }

  // Violations
  function logViolation(baiId, lan, loai, snap) {
    Queue.enqueue('logViolation', { token: _tok(), bai_id: baiId, lan, loai, code_snap: (snap||''). substring(0,300) });
  }
  async function getViolations(force){ return Cache.swr('violations_all', cfg.CACHE_TTL.VIOLATIONS, () => _get({ action: 'getViolations' }), force); }

  // Access log
  function logAccess(action, detail) { _bufLog(action, detail); }
  async function getAccessLog() { return _get({ action: 'getAccessLog' }); }

  // Exams
  async function getExams(force)    { return Cache.swr('exams_list', cfg.CACHE_TTL.EXAMS, () => _get({ action: 'getExams' }), force); }
  async function saveExam(exam)     { const d = await _post({ action: 'saveExam', token: _tok(), exam }); Cache.invalidate('exams'); return d; }
  async function deleteExam(id)     { const d = await _post({ action: 'deleteExam', token: _tok(), exam_id: id }); Cache.invalidate('exams'); return d; }
  async function setExamStatus(id, s){ const d = await _post({ action: 'setExamStatus', token: _tok(), exam_id: id, status: s }); Cache.invalidate('exams'); return d; }

  // Exercise management (teacher)
  async function saveLyThuyet(id, html)   { const d = await _post({ action: 'saveLyThuyet',  token: _tok(), bai_id: id, noi_dung_html: html }); Cache.invalidate('exercise_'+id); return d; }
  async function saveCodeMau(id, l, c, m) { const d = await _post({ action: 'saveCodeMau',   token: _tok(), bai_id: id, ngon_ngu: l, code: c, mo_ta: m||'' }); Cache.invalidate('exercise_'+id); return d; }
  async function saveTieuChi(id, list)    { const d = await _post({ action: 'saveTieuChi',   token: _tok(), bai_id: id, tieu_chi_list: list }); Cache.invalidate('exercise_'+id); return d; }
  async function saveHuongDan(id, list)   { const d = await _post({ action: 'saveHuongDan',  token: _tok(), bai_id: id, huong_dan_list: list }); Cache.invalidate('exercise_'+id); return d; }
  async function syncExercises(exs, isFirst=true) { return _post({ action: 'syncExercises', token: _tok(), exercises: exs, clear_first: isFirst }, 120_000); }
  async function syncFull(exs, tab, isFirst=true) { return _post({ action: 'syncFull', token: _tok(), exercises: exs, tab, clear_first: isFirst }, 120_000); }
  async function adminGetAdmins()          { return _get({ action: 'adminGetAdmins', token: _tok() }); }
  async function adminSaveAdmin(data)      { return _post({ action: 'adminSaveAdmin', token: _tok(), ...data }); }
  async function adminDeleteAdmin(data){ 
    // Hỗ trợ cả adminDeleteAdmin('user') và adminDeleteAdmin({ username: 'user' })
    const username = (typeof data === 'string') ? data : data?.username;
    return _post({ action: 'adminDeleteAdmin', token: _tok(), username }); 
  }
  async function saveAvatar(data)          { return _post({ action: 'saveAvatar', token: _tok(), avatar_data: data }, 60_000); }

  // Setup & ping
  async function createTables() { return _post({ action: 'createTables', token: _tok() }); }
  async function autoSetup(p)   { return Http.post(_url(), { action: 'autoSetup', ...p }, cfg.API.SETUP_TIMEOUT_MS); }
  async function ping() {
    try { const t = Date.now(); const d = await _get({ action: 'ping' }); return { ok: true, latency: Date.now()-t, version: d.v }; }
    catch(e) { return { ok: false, error: e.message }; }
  }

  // URL
  function setUrl(url) { localStorage.setItem(cfg.LS.SCRIPT_URL, url.trim()); }
  function getUrl()    { return _url(); }
  function isReady()   { return _ok(); }

  // Helpers exposed for teacher tabs
  function _invalidate(p) { Cache.invalidate(p); }
  function _queueSize()   { return Queue.size(); }

  // Mode manager
  async function verifyExamCode(code) {
    return _get({ action: 'verifyExamCode', code });
  }
  async function syncAnalyticsToSheets() {
    return _post({ action: 'syncAnalytics', token: _tok() });
  }

  // Exam code verification
  async function verifyExamCode(code) {
    return _get({ action: 'verifyExamCode', code });
  }
  async function getExamByCode(code) {
    const data = await _get({ action: 'verifyExamCode', code });
    return data?.exam || null;
  }
  // Derive unique class list from student roster (cached)
  async function getClasses(force) {
    return Cache.swr('classes_list', 5*60000, async () => {
      const students = await adminGetUsers('student', false);
      const grouped  = {};
      students.forEach(s => {
        const lop = (s.lop || '').trim();
        if (!lop) return;
        if (!grouped[lop]) grouped[lop] = 0;
        grouped[lop]++;
      });
      return Object.entries(grouped)
        .sort(([a],[b]) => a.localeCompare(b, 'vi'))
        .map(([lop, count]) => ({lop, count}));
    }, force);
  }

  async function getActiveExamForClass(lop) {
    const exams = await getExams();
    return exams.find(e => e.trang_thai === 'active' && (!e.lop || e.lop.split(',').map(s=>s.trim()).includes(lop))) || null;
  }

  // Đợt kiểm tra
  async function getDotKiemTra(force) {
    return Cache.swr('dot_kt_all', cfg.CACHE_TTL.EXAMS,
      () => _get({ action: 'getDotKiemTra' }), force);
  }
  async function saveDotKiemTra(dot) {
    const d = await _post({ action: 'saveDotKiemTra', token: _tok(), dot });
    Cache.invalidate('dot_kt'); return d;
  }
  async function deleteDotKiemTra(id) {
    const d = await _post({ action: 'deleteDotKiemTra', token: _tok(), dot_id: id });
    Cache.invalidate('dot_kt'); return d;
  }

  // Export to Google Sheets
  async function exportToSheets(type) {
    return _post({ action: 'exportToSheets', token: _tok(), type: type||'all' });
  }
  async function syncAnalytics() {
    return _post({ action: 'syncAnalytics', token: _tok() });
  }

  // ── Profile API ─────────────────────────────────────────────
  async function getMyProfile() {
    return Cache.swr('my_profile', 300_000, () => _get({ action: 'getMyProfile' }));
  }
  async function updateMyProfile(data) {
    const r = await _post({ action: 'updateMyProfile', token: _tok(), ...data });
    Cache.invalidate('my_profile');
    return r;
  }

  // ── Admin: User Management ───────────────────────────────────
  async function adminGetUsers(role, force) {
    return Cache.swr('users_' + role, cfg.CACHE_TTL.STUDENTS,
      () => _get({ action: 'adminGetUsers', role }), force);
  }
  async function adminSaveUser(userData) {
    const r = await _post({ action: 'adminSaveUser', token: _tok(), ...userData });
    Cache.invalidate('users_' + userData.role);
    return r;
  }
  async function adminDeleteUser(data) {
    const r = await _post({ action: 'adminDeleteUser', token: _tok(), ...data });
    Cache.invalidate('users_' + data.role);
    return r;
  }
  async function adminResetPassword(data) {
    return _post({ action: 'adminResetPassword', token: _tok(), ...data });
  }
  async function adminToggleActive(data) {
    const r = await _post({ action: 'adminToggleActive', token: _tok(), ...data });
    Cache.invalidate('users_' + data.role);
    return r;
  }
  async function adminImportUsers(role, users) {
    const r = await _post({ action: 'adminImportUsers', token: _tok(), role, users });
    Cache.invalidate('users_' + role);
    return r;
  }

  // ── Exam taking API
  async function submitBaiLam(data) {
    return _post({ action: 'submitBaiLam', token: _tok(), ...data });
  }
  async function submitBaiKT(data) {
    const d = await _post({ action: 'submitBaiKT', token: _tok(), ...data });
    Cache.invalidate('baikt'); return d;
  }
  async function saveMinhChung(data) {
    return _post({ action: 'saveMinhChung', token: _tok(), ...data });
  }
  async function getMyResults(kyId) {
    return Cache.swr('results_' + kyId, 60000,
      () => _get({ action: 'getMyResults', ky_id: kyId }));
  }
  async function getBaiKT() {
    return Cache.swr('baikt_me', cfg.CACHE_TTL.HISTORY,
      () => _get({ action: 'getBaiKT' }));
  }

  // ── Changelog ───────────────────────────────────────────────
  async function getChangelog(force) {
    return Cache.swr('changelog', 300_000,
      () => _get({ action: 'getChangelog' }), force);
  }

    const facade = { setUrl, getUrl, isReady, getToken: _tok,
    login, logout, changePassword, updateProfile, getExerciseDetail,
    submitScore, getScores, getHistory,
    logViolation, getViolations, logAccess, getAccessLog,
    getExams, saveExam, deleteExam, setExamStatus, getClasses,
    saveLyThuyet, saveCodeMau, saveTieuChi, saveHuongDan, syncExercises, syncFull,
    adminGetAdmins, adminSaveAdmin, adminDeleteAdmin, saveAvatar,
    adminGetUsers, adminSaveUser, adminDeleteUser, adminResetPassword, adminToggleActive, adminImportUsers,
    createTables, autoSetup, ping,
    _invalidate, _queueSize,
    verifyExamCode, getExamByCode, getActiveExamForClass,
    getDotKiemTra, saveDotKiemTra, deleteDotKiemTra,
    exportToSheets, syncAnalytics,
    submitBaiLam, submitBaiKT, saveMinhChung, getMyResults, getBaiKT,
    verifyExamCode, syncAnalyticsToSheets,
    getChangelog };
  window.API = facade;
  return facade;
});
