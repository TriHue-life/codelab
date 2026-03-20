/**
 * ═══════════════════════════════════════════════════════════════════
 *  PYTHON GRADER — Google Apps Script Backend v2.0
 *  THPT
 *
 *  Deploy: Web App → Execute as: Me → Who has access: Anyone
 *
 *  Cấu trúc Google Drive:
 *  📁 CodeLab/
 *  ├── 📊 01_TaiKhoan.gsheet   (GiaoVien, HocSinh)
 *  ├── 📊 02_BaiTap.gsheet     (BaiTap, LyThuyet, CodeMau, TieuChi, HuongDan)
 *  ├── 📊 03_KiemTra.gsheet    (DanhSach, BaiTapKT)
 *  ├── 📊 04_KetQua.gsheet     (BangDiem, LichSuLam)
 *  └── 📊 05_NhatKy.gsheet     (TruyCap, ViPham)
 * ═══════════════════════════════════════════════════════════════════
 */

// ── Cấu hình: điền Spreadsheet IDs sau khi tạo ──────────────────
const DB_IDS = {
  TAIKHOAN: '',   // 01_TaiKhoan.gsheet ID
  BAITAP:   '',   // 02_BaiTap.gsheet ID
  KIEMTRA:  '',   // 03_KiemTra.gsheet ID
  KETQUA:   '',   // 04_KetQua.gsheet ID
  NHATKY:   '',   // 05_NhatKy.gsheet ID
};

// ── Constants ────────────────────────────────────────────────────
const TOKEN_TTL_MS  = 8  * 3600000;  // 8 giờ
const CACHE_TTL_S   = 300;           // 5 phút cache server
const RATE_LIMIT    = 200;           // max request/min/user
const MAX_LOG_BATCH = 50;            // tối đa log buffered

// ═══════════════════════════════════════════════════════════════════
//  ROUTING
// ═══════════════════════════════════════════════════════════════════
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = body.action || '';
    switch (action) {
      // Auth
      case 'login':              return handleLogin(body);
      case 'logout':             return handleLogout(body);
      case 'changePassword':     return handleChangePassword(body);
      case 'updateMyProfile':    return handleUpdateMyProfile(body);
      case 'adminSaveUser':      return handleAdminSaveUser(body);
      case 'adminDeleteUser':    return handleAdminDeleteUser(body);
      case 'adminResetPassword': return handleAdminResetPassword(body);
      case 'adminToggleActive':  return handleAdminToggleActive(body);
      case 'adminImportUsers':   return handleAdminImportUsers(body);
      // Results
      case 'submitScore':        return handleSubmitScore(body);
      case 'logViolation':       return handleLogViolation(body);
      case 'logAccess':          return handleLogAccessBatch(body);
      // Teacher — Exam management
      case 'saveExam':           return handleSaveExam(body);
      case 'deleteExam':         return handleDeleteExam(body);
      case 'setExamStatus':      return handleSetExamStatus(body);
      // Exam taking
      case 'submitBaiLam':        return handleSubmitBaiLam(body);
      case 'submitBaiKT':         return handleSubmitBaiKT(body);
      case 'saveMinhChung':       return handleSaveMinhChung(body);
      case 'syncAnalytics':       return handleSyncAnalytics(body);
      case 'getMyResults':        return handleGetMyResults(body);
      // Teacher — Exercise management
      case 'saveExercise':       return handleSaveExercise(body);
      case 'deleteExercise':     return handleDeleteExercise(body);
      case 'saveLyThuyet':       return handleSaveLyThuyet(body);
      case 'saveCodeMau':        return handleSaveCodeMau(body);
      case 'saveTieuChi':        return handleSaveTieuChi(body);
      case 'saveHuongDan':       return handleSaveHuongDan(body);
      // Admin
      case 'createTables':       return handleCreateTables(body);
      case 'syncExercises':      return handleSyncExercises(body);
      case 'syncChangelog':      return handleSyncChangelog(body);
      case 'syncFull':           return handleSyncFull(body);
      // Setup
      case 'autoSetup':          return handleAutoSetup(body);
      default:                   return err('Không rõ action: ' + action);
    }
  } catch (ex) {
    console.error('doPost error:', ex);
    return err(ex.message);
  }
}

function doGet(e) {
  try {
    const p = e.parameter;
    const action = p.action || '';
    switch (action) {
      case 'getExercise':     return handleGetExercise(p);
      case 'getExercises':    return handleGetExercises(p);
      case 'getExams':        return handleGetExams(p);
      case 'getMyResults':    return handleGetMyResults(p);
      case 'getBaiKT':        return handleGetBaiKT(p);
      case 'getDotKiemTra':   return handleGetDotKiemTra(p);
      case 'getScores':       return handleGetScores(p);
      case 'getChangelog':    return handleGetChangelog(p);
      case 'getHistory':      return handleGetHistory(p);
      case 'getViolations':   return handleGetViolations(p);
      case 'getAccessLog':    return handleGetAccessLog(p);
      case 'getStudentList':   return handleGetStudentList(p);
      case 'getMyProfile':     return handleGetMyProfile(p);
      case 'adminGetUsers':    return handleAdminGetUsers(p);
      case 'adminGetAdmins':   return handleAdminGetAdmins(p);
      case 'adminSaveAdmin':   return handleAdminSaveAdmin(body);
      case 'adminDeleteAdmin': return handleAdminDeleteAdmin(body);
      case 'saveAvatar':       return handleSaveAvatar(body);
      case 'ping':             return ok({ ts: Date.now(), v: '2.0' });
      case 'verifyExamCode':   return handleVerifyExamCode(p);
      case 'getSetupStatus':  return handleGetSetupStatus(p);
      default:                return err('Không rõ action: ' + action);
    }
  } catch (ex) {
    return err(ex.message);
  }
}

// ═══════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════
function ok(data)  { return cors({ ok: true,  data }); }
function err(msg)  { return cors({ ok: false, error: msg }); }
function cors(d) {
  return ContentService
    .createTextOutput(JSON.stringify(d))
    .setMimeType(ContentService.MimeType.JSON);
}

function ss(key) {
  // Ưu tiên DB_IDS constant → Script Properties (sau autoSetup)
  const fromConst = DB_IDS[key];
  const fromProp  = PropertiesService.getScriptProperties().getProperty('db_' + key);
  const id = (fromConst && fromConst !== '') ? fromConst : fromProp;
  if (!id) throw new Error(`Chưa cấu hình Sheets ID cho "${key}". Vào Teacher Panel → Cấu hình → Setup lần đầu.`);
  return SpreadsheetApp.openById(id);
}

function getSheet(ssKey, sheetName, createIfMissing) {
  const spreadsheet = ss(ssKey);
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet && createIfMissing) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

function sheetData(sheet) {
  if (!sheet) return [];
  const vals = sheet.getDataRange().getValues();
  if (vals.length < 2) return [];
  const headers = vals[0].map(h => String(h).trim());
  return vals.slice(1).filter(r => r.some(c => c !== '')).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i] !== undefined ? row[i] : '');
    return obj;
  });
}

function appendRow(sheet, headers, obj) {
  sheet.appendRow(headers.map(h => obj[h] !== undefined ? obj[h] : ''));
}

function uuidv4() { return Utilities.getUuid(); }
function nowISO() { return new Date().toISOString(); }

function hashPwd(s) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8
  );
  return bytes.map(b => ('0' + (b & 0xFF).toString(16)).slice(-2)).join('');
}

function checkPwd(input, stored) {
  if (!stored) return false;
  const h = hashPwd(input.trim());
  return stored === input.trim() || stored === h;
}

// ═══════════════════════════════════════════════════════════════════
//  SESSION / TOKEN — stored in ScriptProperties (server-side only)
// ═══════════════════════════════════════════════════════════════════
const PROP = PropertiesService.getScriptProperties();

function createToken(userObj) {
  const token = uuidv4();
  PROP.setProperty('tok_' + token, JSON.stringify({
    ...userObj, exp: Date.now() + TOKEN_TTL_MS
  }));
  return token;
}

function verifyToken(token) {
  if (!token) return null;
  try {
    const raw = PROP.getProperty('tok_' + token);
    if (!raw) return null;
    const sess = JSON.parse(raw);
    if (Date.now() > sess.exp) {
      PROP.deleteProperty('tok_' + token);
      return null;
    }
    return sess;
  } catch { return null; }
}

function deleteToken(token) {
  if (token) PROP.deleteProperty('tok_' + token);
}

function requireAuth(body) {
  const sess = verifyToken(body.token);
  if (!sess) throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
  return sess;
}

function requireAdmin(body) {
  const sess = verifyToken(body.token);
  if (!sess) throw new Error('Chưa đăng nhập');
  if (sess.role !== 'admin') throw new Error('Cần quyền Admin');
  return sess;
}

function requireTeacher(body) {
  const sess = requireAuth(body);
  // Admin có tất cả quyền của teacher
  if (sess.role !== 'teacher' && sess.role !== 'admin') {
    throw new Error('Chỉ giáo viên hoặc admin mới có quyền thực hiện thao tác này.');
  }
  return sess;
}

// ═══════════════════════════════════════════════════════════════════
//  RATE LIMITING — dùng ScriptCache
// ═══════════════════════════════════════════════════════════════════
const SCRIPT_CACHE = CacheService.getScriptCache();

function checkRateLimit(userId) {
  const key = 'rl_' + String(userId).replace(/[^a-zA-Z0-9_]/g, '_');
  const cur = parseInt(SCRIPT_CACHE.get(key) || '0');
  if (cur >= RATE_LIMIT) throw new Error('Quá nhiều yêu cầu. Vui lòng đợi 1 phút.');
  SCRIPT_CACHE.put(key, String(cur + 1), 60);
}

// ═══════════════════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════════════════
function handleLogin(body) {
  const { role, username, mshs, password } = body;

  if (role === 'teacher') {
    const u = (username || '').trim().toLowerCase();
    // Kiểm tra bảng Admin trước
    const adminSheet = getSheet('TAIKHOAN', 'Admin');
    if (adminSheet) {
      const adminRows = sheetData(adminSheet);
      const foundAdmin = adminRows.find(r => String(r.username||'').toLowerCase()===u && r.active!==false && r.active!=='FALSE');
      if (foundAdmin) {
        if (!checkPwd(password||'', String(foundAdmin.password_hash||''))) return err('Sai mật khẩu');
        const token = createToken({ role:'admin', username:u, name:foundAdmin.ho_ten||u, email:foundAdmin.email||'', lop:'' });
        _logAccess(u, foundAdmin.ho_ten||u, '', 'admin', 'login', '');
        return ok({ token, name:foundAdmin.ho_ten||u, lop:'', email:foundAdmin.email||'', role:'admin', avatar_url:foundAdmin.avatar_url||'' });
      }
    }
    // Kiểm tra bảng GiaoVien
    const sheet = getSheet('TAIKHOAN', 'GiaoVien');
    const rows = sheetData(sheet);
    const found = rows.find(r => String(r.username || '').toLowerCase() === u && r.active !== false && r.active !== 'FALSE');
    if (!found) return err('Tên đăng nhập không tồn tại');
    if (!checkPwd(password || '', String(found.password_hash || ''))) return err('Sai mật khẩu');
    const actualRole = found.role || 'teacher';
    const token = createToken({ role:actualRole, username:u, name:found.ho_ten||u, email:found.email||'', lop:found.lop_phu_trach||'' });
    _logAccess(u, found.ho_ten||u, '', actualRole, 'login', '');
    return ok({ token, name:found.ho_ten||u, lop:found.lop_phu_trach||'', email:found.email||'', role:actualRole, avatar_url:found.avatar_url||'' });
  }

  if (role === 'student') {
    const sheet = getSheet('TAIKHOAN', 'HocSinh');
    const rows = sheetData(sheet);
    const m = (mshs || '').trim();
    const found = rows.find(r => String(r.mshs || '').trim() === m && r.active !== false && r.active !== 'FALSE');
    if (!found) return err('MSHS không tồn tại trong danh sách');
    if (!checkPwd(password || '', String(found.password_hash || ''))) return err('Sai mật khẩu');
    const token = createToken({ role:'student', mshs:m, name:found.ho_ten||m, lop:found.lop||'', email:found.email||'' });
    _logAccess(m, found.ho_ten||m, found.lop||'', 'student', 'login', '');
    return ok({ token, name:found.ho_ten||m, lop:found.lop||'' });
  }

  return err('role không hợp lệ');
}

function handleLogout(body) {
  deleteToken(body.token);
  return ok({ logged_out: true });
}

function handleChangePassword(body) {
  const sess = requireAuth(body);
  const { oldPwd, newPwd } = body;
  if (!newPwd || newPwd.length < 6) return err('Mật khẩu mới phải có ít nhất 6 ký tự');

  const sheetName = sess.role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet = getSheet('TAIKHOAN', sheetName);
  const vals = sheet.getDataRange().getValues();
  const headers = vals[0];
  const keyCol = headers.indexOf(sess.role === 'teacher' ? 'username' : 'mshs');
  const pwdCol = headers.indexOf('password_hash');
  const key = sess.role === 'teacher' ? sess.username : sess.mshs;

  for (let i = 1; i < vals.length; i++) {
    if (String(vals[i][keyCol]).toLowerCase() === String(key).toLowerCase()) {
      if (!checkPwd(oldPwd || '', String(vals[i][pwdCol]))) return err('Mật khẩu cũ không đúng');
      sheet.getRange(i+1, pwdCol+1).setValue(hashPwd(newPwd.trim()));
      return ok({ changed: true });
    }
  }
  return err('Không tìm thấy tài khoản');
}

// ═══════════════════════════════════════════════════════════════════
//  EXERCISE DATA — BaiTap, LyThuyet, CodeMau, TieuChi, HuongDan
// ═══════════════════════════════════════════════════════════════════

// Headers cho từng tab
const ADMIN_H    = ['username','password_hash','ho_ten','email','avatar_url','role','active','created_at'];
const BAITAP_H   = ['id','lop','bo_sach','chuong','muc_bloom','so_bai','tieu_de','mo_ta','type','updated_at'];
const LYTH_H     = ['bai_id','noi_dung_html','updated_at'];
const CODEMAU_H  = ['bai_id','ngon_ngu','code','mo_ta','updated_at'];
const TIEUCHI_H  = ['id','bai_id','mo_ta','tu_khoa','diem','goi_y','thu_tu'];
const HUONGDAN_H = ['bai_id','loai_loi','mo_ta_loi','cach_sua','vi_du','thu_tu'];

function handleGetExercise(p) {
  const sess = verifyToken(p.token);
  if (!sess) return err('Token không hợp lệ');
  const bai_id = p.bai_id || '';
  if (!bai_id) return err('Thiếu bai_id');

  // Use cache
  const cacheKey = 'ex_' + bai_id;
  const cached = SCRIPT_CACHE.get(cacheKey);
  if (cached) return ok(JSON.parse(cached));

  const lyth   = sheetData(getSheet('BAITAP','LyThuyet'));
  const code   = sheetData(getSheet('BAITAP','CodeMau'));
  const tc     = sheetData(getSheet('BAITAP','TieuChi'));
  const hd     = sheetData(getSheet('BAITAP','HuongDan'));

  const result = {
    ly_thuyet: lyth.find(r=>r.bai_id===bai_id)?.noi_dung_html || '',
    code_mau:  code.filter(r=>r.bai_id===bai_id),
    tieu_chi:  tc.filter(r=>r.bai_id===bai_id).sort((a,b)=>(a.thu_tu||0)-(b.thu_tu||0)),
    huong_dan: hd.filter(r=>r.bai_id===bai_id).sort((a,b)=>(a.thu_tu||0)-(b.thu_tu||0)),
  };

  SCRIPT_CACHE.put(cacheKey, JSON.stringify(result), CACHE_TTL_S);
  return ok(result);
}

function handleGetExercises(p) {
  const sess = verifyToken(p.token);
  if (!sess) return err('Token không hợp lệ');

  const cacheKey = 'exercises_list';
  const cached = SCRIPT_CACHE.get(cacheKey);
  if (cached) return ok(JSON.parse(cached));

  const rows = sheetData(getSheet('BAITAP','BaiTap'));
  SCRIPT_CACHE.put(cacheKey, JSON.stringify(rows), CACHE_TTL_S);
  return ok(rows);
}

function handleSaveExercise(body) {
  requireTeacher(body);
  const { exercise } = body;
  if (!exercise || !exercise.id) return err('Thiếu dữ liệu bài tập');

  const sheet = getSheet('BAITAP', 'BaiTap', true);
  _ensureHeaders(sheet, BAITAP_H);
  _upsertRow(sheet, 'id', exercise.id, { ...exercise, updated_at: nowISO() }, BAITAP_H);

  // Clear cache
  SCRIPT_CACHE.remove('exercises_list');
  SCRIPT_CACHE.remove('ex_' + exercise.id);
  return ok({ saved: true });
}

function handleDeleteExercise(body) {
  requireTeacher(body);
  const { bai_id } = body;
  const sheet = getSheet('BAITAP', 'BaiTap');
  if (!sheet) return ok({ deleted: false });
  _deleteRow(sheet, 'id', bai_id);
  SCRIPT_CACHE.remove('exercises_list');
  SCRIPT_CACHE.remove('ex_' + bai_id);
  return ok({ deleted: true });
}

function handleSaveLyThuyet(body) {
  requireTeacher(body);
  const { bai_id, noi_dung_html } = body;
  const sheet = getSheet('BAITAP', 'LyThuyet', true);
  _ensureHeaders(sheet, LYTH_H);
  _upsertRow(sheet, 'bai_id', bai_id, { bai_id, noi_dung_html, updated_at: nowISO() }, LYTH_H);
  SCRIPT_CACHE.remove('ex_' + bai_id);
  return ok({ saved: true });
}

function handleSaveCodeMau(body) {
  requireTeacher(body);
  const { bai_id, ngon_ngu, code, mo_ta } = body;
  const sheet = getSheet('BAITAP', 'CodeMau', true);
  _ensureHeaders(sheet, CODEMAU_H);
  // Upsert by bai_id + ngon_ngu
  const vals = sheet.getDataRange().getValues();
  const headers = vals[0];
  const baiCol = headers.indexOf('bai_id');
  const lngCol = headers.indexOf('ngon_ngu');
  let found = -1;
  for (let i = 1; i < vals.length; i++) {
    if (vals[i][baiCol] === bai_id && vals[i][lngCol] === ngon_ngu) { found = i+1; break; }
  }
  const row = CODEMAU_H.map(h => ({ bai_id, ngon_ngu, code, mo_ta, updated_at: nowISO() }[h] ?? ''));
  if (found > 0) sheet.getRange(found, 1, 1, row.length).setValues([row]);
  else sheet.appendRow(row);
  SCRIPT_CACHE.remove('ex_' + bai_id);
  return ok({ saved: true });
}

function handleSaveTieuChi(body) {
  requireTeacher(body);
  const { bai_id, tieu_chi_list } = body;  // array of criteria
  const sheet = getSheet('BAITAP', 'TieuChi', true);
  _ensureHeaders(sheet, TIEUCHI_H);
  // Delete existing, re-insert
  _deleteRowsWhere(sheet, 'bai_id', bai_id);
  (tieu_chi_list || []).forEach((tc, idx) => {
    sheet.appendRow(TIEUCHI_H.map(h => ({
      id: uuidv4(), bai_id, mo_ta: tc.mo_ta||'', tu_khoa: tc.tu_khoa||'',
      diem: tc.diem||0, goi_y: tc.goi_y||'', thu_tu: idx+1
    }[h] ?? '')));
  });
  SCRIPT_CACHE.remove('ex_' + bai_id);
  return ok({ saved: true });
}

function handleSaveHuongDan(body) {
  requireTeacher(body);
  const { bai_id, huong_dan_list } = body;
  const sheet = getSheet('BAITAP', 'HuongDan', true);
  _ensureHeaders(sheet, HUONGDAN_H);
  _deleteRowsWhere(sheet, 'bai_id', bai_id);
  (huong_dan_list || []).forEach((hd, idx) => {
    sheet.appendRow(HUONGDAN_H.map(h => ({
      bai_id, loai_loi: hd.loai_loi||'', mo_ta_loi: hd.mo_ta_loi||'',
      cach_sua: hd.cach_sua||'', vi_du: hd.vi_du||'', thu_tu: idx+1
    }[h] ?? '')));
  });
  SCRIPT_CACHE.remove('ex_' + bai_id);
  return ok({ saved: true });
}

// ── Sync exercises from client JSON ──────────────────────────────
function handleSyncExercises(body) {
  requireTeacher(body);
  const { exercises, clear_first } = body;
  if (!Array.isArray(exercises)) return err('exercises phải là array');

  const sheet = getSheet('BAITAP', 'BaiTap', true);
  _ensureHeaders(sheet, BAITAP_H);

  // Lấy vị trí bắt đầu ghi
  let startRow;
  if (clear_first !== false) {
    // Batch đầu tiên: ghi từ dòng 2 (đè lên dữ liệu cũ)
    startRow = 2;
    // Xoá dữ liệu cũ (clearContent an toàn hơn deleteRows)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, BAITAP_H.length).clearContent();
    }
  } else {
    // Batch tiếp theo: tìm dòng cuối có dữ liệu rồi append
    const vals = sheet.getDataRange().getValues();
    startRow = 2;
    for (let r = vals.length - 1; r >= 1; r--) {
      if (vals[r][0]) { startRow = r + 2; break; }
    }
  }

  const rows = exercises.map(e => BAITAP_H.map(h => {
    const map = {
      id: e.id, lop: e.g, bo_sach: e.bo||'',
      chuong: e.ch, muc_bloom: e.lv, so_bai: e.num,
      tieu_de: e.title,
      mo_ta: (e.desc||'').replace(/<[^>]+>/g,' ').substring(0,500),
      type: e.type||'python', updated_at: nowISO()
    };
    return map[h] ?? '';
  }));

  if (rows.length) {
    sheet.getRange(startRow, 1, rows.length, BAITAP_H.length).setValues(rows);
  }

  SCRIPT_CACHE.remove('exercises_list');
  return ok({ synced: rows.length });
}

// ── Sync toàn bộ: BaiTap + LyThuyet + CodeMau + TieuChi + HuongDan ──
function handleSyncFull(body) {
  requireTeacher(body);
  const { exercises, tab, clear_first } = body;
  if (!Array.isArray(exercises)) return err('exercises phải là array');

  const log = [];

  function _bulkWrite(sheetName, headers, rows, isClearFirst) {
    const sheet = getSheet('BAITAP', sheetName, true);
    _ensureHeaders(sheet, headers);
    if (isClearFirst !== false) {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, headers.length).clearContent();
    }
    if (rows.length === 0) return 0;
    const startRow = isClearFirst !== false ? 2 : (sheet.getLastRow() + 1);
    sheet.getRange(startRow, 1, rows.length, headers.length).setValues(rows);
    return rows.length;
  }

  try {
    if (!tab || tab === 'BaiTap') {
      const rows = exercises.map(e => BAITAP_H.map(h => ({
        id: e.id, lop: e.g, bo_sach: e.bo||'', chuong: e.ch,
        muc_bloom: e.lv, so_bai: e.num, tieu_de: e.title,
        mo_ta: (e.desc||'').replace(/<[^>]+>/g,' ').substring(0,500),
        type: e.type||'python', updated_at: nowISO()
      }[h] ?? '')));
      const n = _bulkWrite('BaiTap', BAITAP_H, rows, clear_first);
      log.push('BaiTap: ' + n);
    }

    if (!tab || tab === 'LyThuyet') {
      const rows = exercises
        .filter(e => e.theory || e.pseudo)
        .map(e => LYTH_H.map(h => ({
          bai_id: e.id,
          noi_dung_html: (e.theory||'') + (e.pseudo||''),
          updated_at: nowISO()
        }[h] ?? '')));
      const n = _bulkWrite('LyThuyet', LYTH_H, rows, clear_first);
      log.push('LyThuyet: ' + n);
    }

    if (!tab || tab === 'CodeMau') {
      const rows = exercises
        .filter(e => e.solution)
        .map(e => CODEMAU_H.map(h => ({
          bai_id: e.id, ngon_ngu: e.type||'python',
          code: e.solution||'', mo_ta: 'Code mẫu', updated_at: nowISO()
        }[h] ?? '')));
      const n = _bulkWrite('CodeMau', CODEMAU_H, rows, clear_first);
      log.push('CodeMau: ' + n);
    }

    if (!tab || tab === 'TieuChi') {
      const rows = [];
      exercises.forEach(e => {
        (e.rb||[]).forEach((rb, idx) => {
          rows.push(TIEUCHI_H.map(h => ({
            id: 'tc-' + e.id + '-' + (idx+1),
            bai_id: e.id, mo_ta: rb.desc||rb.mo_ta||'',
            tu_khoa: rb.kw||rb.tu_khoa||'', diem: rb.pts||rb.diem||0,
            goi_y: rb.hint||'', thu_tu: idx+1
          }[h] ?? '')));
        });
      });
      const n = _bulkWrite('TieuChi', TIEUCHI_H, rows, clear_first);
      log.push('TieuChi: ' + n);
    }

    if (!tab || tab === 'HuongDan') {
      const rows = [];
      exercises.forEach(e => {
        (e.errors||[]).forEach((err, idx) => {
          rows.push(HUONGDAN_H.map(h => ({
            bai_id: e.id, loai_loi: 'Lỗi '+(idx+1),
            mo_ta_loi: String(err), cach_sua: 'Xem lý thuyết',
            vi_du: '', thu_tu: idx+1
          }[h] ?? '')));
        });
      });
      const n = _bulkWrite('HuongDan', HUONGDAN_H, rows, clear_first);
      log.push('HuongDan: ' + n);
    }

    SCRIPT_CACHE.remove('exercises_list');
    return ok({ success: true, log, synced: exercises.length });
  } catch(ex) {
    return ok({ success: false, error: ex.message, log });
  }
}


// ═══════════════════════════════════════════════════════════════════
//  CHANGELOG — Lịch sử phiên bản
// ═══════════════════════════════════════════════════════════════════

const CHANGELOG_H = ['id','version','prev_version','type','description','timestamp','synced_at'];

/**
 * handleSyncChangelog — Nhận changelog entries từ scripts/version.js
 * Ghi vào 05_NhatKy.gsheet, tab [Changelog]
 */
function handleSyncChangelog(body) {
  // Cho phép gọi không cần token (từ CI/CD script)
  // Bảo mật: chỉ nhận action này khi có đúng secret hoặc token hợp lệ
  const { entries, secret } = body;
  const CFG_SECRET = PropertiesService.getScriptProperties().getProperty('DEPLOY_SECRET') || '';
  // Nếu có secret được cấu hình thì kiểm tra; nếu không thì chỉ cho teacher/admin
  if (CFG_SECRET && secret !== CFG_SECRET) {
    // Fallback: kiểm tra token
    if (!body.token) return err('Cần xác thực');
    requireTeacher(body);
  } else if (!CFG_SECRET && body.token) {
    requireTeacher(body);
  }

  if (!Array.isArray(entries) || !entries.length) return err('Không có entries');

  const sheet = getSheet('NHATKY', 'Changelog', true);
  _ensureHeaders(sheet, CHANGELOG_H);

  const now    = nowISO();
  const values = sheet.getDataRange().getValues();
  const existIds = new Set(values.slice(1).map(r => String(r[0])));

  let added = 0;
  entries.forEach(e => {
    if (existIds.has(String(e.id))) return; // Skip duplicates
    const row = CHANGELOG_H.map(h => ({
      id:           e.id || `v${e.version}`,
      version:      e.version      || '',
      prev_version: e.prev_version || '',
      type:         e.type         || 'patch',
      description:  e.description  || '',
      timestamp:    e.timestamp    || now,
      synced_at:    now,
    }[h] ?? ''));
    sheet.appendRow(row);
    added++;
  });

  return ok({ synced: added, skipped: entries.length - added });
}

/**
 * handleGetChangelog — Lấy lịch sử changelog (dùng trong UI)
 */
function handleGetChangelog(p) {
  const sheet = getSheet('NHATKY', 'Changelog');
  if (!sheet) return ok([]);
  const rows = sheetData(sheet);
  // Sort: newest first (by timestamp)
  rows.sort((a,b) => new Date(b.timestamp||0) - new Date(a.timestamp||0));
  return ok(rows.slice(0, 50)); // Max 50 entries
}

// ═══════════════════════════════════════════════════════════════════
//  EXAM MANAGEMENT
// ═══════════════════════════════════════════════════════════════════
const EXAM_H   = ['id','ten','mo_ta','lop','thoi_gian_phut','ngay_thi','trang_thai','tao_boi','tao_luc','sua_luc','che_do_tron_de','so_bai_random','bloom_filter','toan_ven_1_lan','cho_xem_dap_an','mat_khau'];
const BAITAPKT_H = ['ky_id','bai_id','thu_tu','nhom','diem_co_phan','bloom_level'];

function handleGetExams(p) {
  const sess = verifyToken(p.token);
  if (!sess) return err('Token không hợp lệ');

  const cacheKey = 'exams_' + (sess.role === 'teacher' ? 'all' : sess.lop);
  const cached = SCRIPT_CACHE.get(cacheKey);
  if (cached) return ok(JSON.parse(cached));

  const dsSheet = getSheet('KIEMTRA', 'DanhSach');
  const btSheet = getSheet('KIEMTRA', 'BaiTapKT');
  if (!dsSheet) return ok([]);

  const exams = sheetData(dsSheet);
  const bts   = btSheet ? sheetData(btSheet) : [];

  const result = exams
    .filter(e => e.id)
    .map(e => ({
      ...e,
      bai_tap: bts.filter(b=>b.ky_id===e.id).sort((a,b)=>(a.thu_tu||0)-(b.thu_tu||0)).map(b=>b.bai_id),
    }))
    .filter(e => {
      if (sess.role === 'teacher') return true;
      return e.trang_thai === 'active' && (!e.lop || e.lop.split(',').map(s=>s.trim()).includes(sess.lop));
    });

  SCRIPT_CACHE.put(cacheKey, JSON.stringify(result), CACHE_TTL_S);
  return ok(result);
}

function handleSaveExam(body) {
  const sess = requireTeacher(body);
  const { exam } = body;
  if (!exam || !exam.ten) return err('Thiếu tên kỳ kiểm tra');

  const dsSheet = getSheet('KIEMTRA', 'DanhSach', true);
  const btSheet = getSheet('KIEMTRA', 'BaiTapKT', true);
  _ensureHeaders(dsSheet, EXAM_H);
  _ensureHeaders(btSheet, BAITAPKT_H);

  const id = exam.id || 'KT_' + Date.now();
  const isNew = !exam.id;
  const now = nowISO();

  const examRow = {
    id, ten: exam.ten||'', mo_ta: exam.mo_ta||'', lop: exam.lop||'',
    thoi_gian_phut: exam.thoi_gian_phut||45, ngay_thi: exam.ngay_thi||'',
    trang_thai: exam.trang_thai||(isNew?'draft':'draft'),
    tao_boi: isNew ? sess.name : (exam.tao_boi||sess.name),
    tao_luc: isNew ? now : (exam.tao_luc||now),
    sua_luc: now,
  };
  _upsertRow(dsSheet, 'id', id, examRow, EXAM_H);

  // Re-write bai tap list
  _deleteRowsWhere(btSheet, 'ky_id', id);
  (exam.bai_tap || []).forEach((bid, idx) => btSheet.appendRow([id, bid, idx+1]));

  // Invalidate caches
  ['all', exam.lop||''].forEach(k => SCRIPT_CACHE.remove('exams_' + k));
  return ok({ id, saved: true });
}

function handleDeleteExam(body) {
  requireTeacher(body);
  const { exam_id } = body;
  const dsSheet = getSheet('KIEMTRA', 'DanhSach');
  const btSheet = getSheet('KIEMTRA', 'BaiTapKT');
  if (dsSheet) _deleteRow(dsSheet, 'id', exam_id);
  if (btSheet) _deleteRowsWhere(btSheet, 'ky_id', exam_id);
  SCRIPT_CACHE.remove('exams_all');
  return ok({ deleted: true });
}

function handleSetExamStatus(body) {
  const sess = requireTeacher(body);
  const { exam_id, status } = body;
  const valid = ['draft','active','closed'];
  if (!valid.includes(status)) return err('Trạng thái không hợp lệ: ' + status);

  const sheet = getSheet('KIEMTRA', 'DanhSach');
  if (!sheet) return err('Không tìm thấy bảng KiemTra');
  const vals = sheet.getDataRange().getValues();
  const headers = vals[0];
  const idCol  = headers.indexOf('id');
  const stCol  = headers.indexOf('trang_thai');
  const suaCol = headers.indexOf('sua_luc');

  for (let i = 1; i < vals.length; i++) {
    if (vals[i][idCol] === exam_id) {
      sheet.getRange(i+1, stCol+1).setValue(status);
      if (suaCol >= 0) sheet.getRange(i+1, suaCol+1).setValue(nowISO());
      break;
    }
  }
  SCRIPT_CACHE.remove('exams_all');
  return ok({ updated: true });
}

// ═══════════════════════════════════════════════════════════════════
//  RESULTS
// ═══════════════════════════════════════════════════════════════════
const SCORE_H  = ['id','ts','mshs','ho_ten','lop','bai_id','tieu_de','diem','lan_thu','ky_kt_id'];
const LSLAB_H  = ['id','ts','mshs','ho_ten','lop','bai_id','tieu_de','diem','thoi_gian_lam_giay','ky_kt_id'];

function handleSubmitScore(body) {
  const sess = requireAuth(body);
  if (sess.role === 'teacher') return ok({});  // Teachers don't submit scores
  checkRateLimit(sess.mshs);

  const { bai_id, tieu_de, diem, thoi_gian, ky_kt_id } = body;
  const bdSheet  = getSheet('KETQUA', 'BangDiem',  true);
  const lslSheet = getSheet('KETQUA', 'LichSuLam', true);
  _ensureHeaders(bdSheet,  SCORE_H);
  _ensureHeaders(lslSheet, LSLAB_H);

  const ts  = nowISO();
  const id  = uuidv4();

  // BangDiem: upsert (chỉ giữ điểm tốt nhất hoặc mới nhất)
  const vals = bdSheet.getDataRange().getValues();
  const headers = vals[0];
  const mshsCol = headers.indexOf('mshs');
  const baiCol  = headers.indexOf('bai_id');
  const diemCol = headers.indexOf('diem');
  const kyCol   = headers.indexOf('ky_kt_id');
  let existRow  = -1;
  for (let i = 1; i < vals.length; i++) {
    if (vals[i][mshsCol] === sess.mshs && vals[i][baiCol] === bai_id
        && (!ky_kt_id || vals[i][kyCol] === ky_kt_id)) {
      existRow = i + 1; break;
    }
  }
  const scoreRow = SCORE_H.map(h => ({
    id, ts, mshs: sess.mshs, ho_ten: sess.name, lop: sess.lop,
    bai_id, tieu_de, diem, lan_thu: 1, ky_kt_id: ky_kt_id||''
  }[h] ?? ''));

  if (existRow > 0) {
    // Update if new score >= existing
    const existing = parseFloat(vals[existRow-1][diemCol]) || 0;
    if (parseFloat(diem) >= existing) {
      bdSheet.getRange(existRow, 1, 1, scoreRow.length).setValues([scoreRow]);
    }
  } else {
    bdSheet.appendRow(scoreRow);
  }

  // LichSuLam: always append
  lslSheet.appendRow(LSLAB_H.map(h => ({
    id: uuidv4(), ts, mshs: sess.mshs, ho_ten: sess.name, lop: sess.lop,
    bai_id, tieu_de, diem, thoi_gian_lam_giay: thoi_gian||0, ky_kt_id: ky_kt_id||''
  }[h] ?? '')));

  return ok({ saved: true });
}

function handleGetScores(p) {
  requireTeacher({ token: p.token });
  const sheet = getSheet('KETQUA', 'BangDiem');
  if (!sheet) return ok([]);
  let rows = sheetData(sheet);
  if (p.lop) rows = rows.filter(r => r.lop === p.lop);
  if (p.mshs) rows = rows.filter(r => r.mshs === p.mshs);
  return ok(rows);
}

function handleGetHistory(p) {
  const sess = verifyToken(p.token);
  if (!sess) return err('Token không hợp lệ');
  const sheet = getSheet('KETQUA', 'LichSuLam');
  if (!sheet) return ok([]);
  let rows = sheetData(sheet);
  if (sess.role === 'student') rows = rows.filter(r => r.mshs === sess.mshs);
  else if (p.mshs) rows = rows.filter(r => r.mshs === p.mshs);
  // Return newest first, max 200
  return ok(rows.reverse().slice(0, 200));
}

// ═══════════════════════════════════════════════════════════════════
//  LOGGING
// ═══════════════════════════════════════════════════════════════════
const TRUYCP_H = ['id','ts','user_id','ho_ten','lop','role','action','detail'];
const VIPHAM_H = ['id','ts','mshs','ho_ten','lop','bai_id','lan','loai','code_snap','da_xu_ly'];

function _logAccess(userId, hoTen, lop, role, action, detail) {
  try {
    const sheet = getSheet('NHATKY', 'TruyCap', true);
    _ensureHeaders(sheet, TRUYCP_H);
    sheet.appendRow([uuidv4(), nowISO(), userId, hoTen, lop, role, action, String(detail).substring(0,200)]);
  } catch(e) { console.warn('logAccess fail:', e.message); }
}

// Batched access log: client sends array of log items
function handleLogAccessBatch(body) {
  const sess = verifyToken(body.token);
  if (!sess) return ok({});  // silent fail
  const logs = Array.isArray(body.logs) ? body.logs.slice(0, MAX_LOG_BATCH) : [{ action: body.action||'', detail: body.detail||'' }];
  const sheet = getSheet('NHATKY', 'TruyCap', true);
  _ensureHeaders(sheet, TRUYCP_H);
  const rows = logs.map(l => [uuidv4(), nowISO(), sess.mshs||sess.username, sess.name, sess.lop, sess.role, l.action||'', String(l.detail||'').substring(0,200)]);
  if (rows.length) sheet.getRange(sheet.getLastRow()+1, 1, rows.length, TRUYCP_H.length).setValues(rows);
  return ok({ logged: rows.length });
}

function handleLogViolation(body) {
  const sess = verifyToken(body.token);
  if (!sess) return ok({});
  const { bai_id, lan, loai, code_snap } = body;
  const sheet = getSheet('NHATKY', 'ViPham', true);
  _ensureHeaders(sheet, VIPHAM_H);
  sheet.appendRow([uuidv4(), nowISO(), sess.mshs||'', sess.name, sess.lop, bai_id||'', lan||1, loai||'', (code_snap||'').substring(0,300), false]);
  return ok({ logged: true });
}

function handleGetViolations(p) {
  requireTeacher({ token: p.token });
  const sheet = getSheet('NHATKY', 'ViPham');
  if (!sheet) return ok([]);
  let rows = sheetData(sheet);
  if (p.mshs) rows = rows.filter(r => r.mshs === p.mshs);
  return ok(rows.reverse().slice(0, 500));
}

function handleGetAccessLog(p) {
  requireTeacher({ token: p.token });
  const sheet = getSheet('NHATKY', 'TruyCap');
  if (!sheet) return ok([]);
  return ok(sheetData(sheet).reverse().slice(0, 300));
}

function handleGetStudentList(p) {
  requireTeacher({ token: p.token });
  const sheet = getSheet('TAIKHOAN', 'HocSinh');
  if (!sheet) return ok([]);
  return ok(sheetData(sheet).map(r => ({
    mshs: r.mshs, ho_ten: r.ho_ten, lop: r.lop, email: r.email, active: r.active
  })));
}

// ═══════════════════════════════════════════════════════════════════
//  SETUP — Tạo cấu trúc bảng khi khởi tạo lần đầu
// ═══════════════════════════════════════════════════════════════════
function handleCreateTables(body) {
  requireTeacher(body);
  const created = [];
  function ensureTab(ssKey, tabName, headers) {
    try {
      const sheet = getSheet(ssKey, tabName, true);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(headers);
        sheet.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#4472C4').setFontColor('white');
        created.push(`${ssKey}/${tabName}`);
      }
    } catch(e) { console.warn(`createTable ${ssKey}/${tabName}:`, e.message); }
  }

  ensureTab('TAIKHOAN', 'Admin',    ADMIN_H);
  ensureTab('TAIKHOAN', 'GiaoVien', ['username','password_hash','ho_ten','email','lop_phu_trach','role','active','avatar_url']);
  ensureTab('TAIKHOAN', 'HocSinh',  ['mshs','password_hash','ho_ten','email','lop','ngay_sinh','active','avatar_url']);
  ensureTab('BAITAP',   'BaiTap',   BAITAP_H);
  ensureTab('BAITAP',   'LyThuyet', LYTH_H);
  ensureTab('BAITAP',   'CodeMau',  CODEMAU_H);
  ensureTab('BAITAP',   'TieuChi',  TIEUCHI_H);
  ensureTab('BAITAP',   'HuongDan', HUONGDAN_H);
  ensureTab('KIEMTRA',  'DanhSach', EXAM_H);
  ensureTab('KIEMTRA',  'BaiTapKT', BAITAPKT_H);
  ensureTab('KETQUA',   'BangDiem',  SCORE_H);
  ensureTab('KETQUA',   'LichSuLam', LSLAB_H);
  ensureTab('NHATKY',   'TruyCap',  TRUYCP_H);
  ensureTab('NHATKY',   'Changelog', CHANGELOG_H);
  ensureTab('NHATKY',   'ViPham',   VIPHAM_H);
  // New exam taking sheets
  ensureTab('KETQUA',  'BaiLam',   BAILAM_H);
  ensureTab('KETQUA',  'BaiKT',    BAIKT_H);
  ensureTab('KETQUA',  'MinhChung',MINHCHUNG_H);
  ensureTab('KIEMTRA', 'DotKiemTra', DOT_KT_H);
  ensureTab('KETQUA',  'TongHop',   ['ts','mssv','ho_ten','lop','ky_id','ten_ky','diem_tong','so_bai','da_hoan_thanh','tg_tong_giay','bloom_b1','bloom_b2','bloom_b3','bloom_b4','bloom_b5','bloom_b6']);

  return ok({ created });
}

// ═══════════════════════════════════════════════════════════════════
//  UTILITY — upsert, delete helpers
// ═══════════════════════════════════════════════════════════════════
function _ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#4472C4').setFontColor('white');
  }
}

function _upsertRow(sheet, keyCol, keyVal, obj, headers) {
  const vals = sheet.getDataRange().getValues();
  const hdr = vals[0];
  const col = hdr.indexOf(keyCol);
  for (let i = 1; i < vals.length; i++) {
    if (vals[i][col] === keyVal) {
      sheet.getRange(i+1, 1, 1, headers.length).setValues([headers.map(h => obj[h] ?? '')]);
      return;
    }
  }
  sheet.appendRow(headers.map(h => obj[h] ?? ''));
}

function _deleteRow(sheet, keyCol, keyVal) {
  const vals = sheet.getDataRange().getValues();
  const col = vals[0].indexOf(keyCol);
  for (let i = vals.length - 1; i >= 1; i--) {
    if (vals[i][col] === keyVal) { sheet.deleteRow(i+1); break; }
  }
}

function _deleteRowsWhere(sheet, keyCol, keyVal) {
  const vals = sheet.getDataRange().getValues();
  const col = vals[0].indexOf(keyCol);
  for (let i = vals.length - 1; i >= 1; i--) {
    if (vals[i][col] === keyVal) sheet.deleteRow(i+1);
  }
}

// ═══════════════════════════════════════════════════════════════════
//  DAILY CLEANUP — cài trigger Time-driven → Day timer
// ═══════════════════════════════════════════════════════════════════
function dailyCleanup() {
  // 1. Xóa session token hết hạn
  const props = PROP.getProperties();
  const now = Date.now();
  let cleaned = 0;
  Object.keys(props).forEach(k => {
    if (!k.startsWith('tok_')) return;
    try {
      const sess = JSON.parse(props[k]);
      if (now > sess.exp) { PROP.deleteProperty(k); cleaned++; }
    } catch { PROP.deleteProperty(k); cleaned++; }
  });

  // 2. Trim NhatKy: giữ tối đa 10000 dòng/tab
  ['TruyCap','ViPham'].forEach(tabName => {
    try {
      const sheet = getSheet('NHATKY', tabName);
      if (!sheet) return;
      const lastRow = sheet.getLastRow();
      if (lastRow > 10001) sheet.deleteRows(2, lastRow - 10001);
    } catch(e) {}
  });

  console.log(`Cleanup done: ${cleaned} expired tokens removed`);
  return `Cleaned ${cleaned} tokens`;
}

// ── Cài trigger tự động (chạy 1 lần) ────────────────────────────
function setupDailyTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'dailyCleanup')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('dailyCleanup')
    .timeBased().everyDays(1).atHour(2).create();
  console.log('Daily trigger created for 2 AM');
}

// ══════════════════════════════════════════════════════════════════
//  AUTO-SETUP — Tự động tạo toàn bộ cấu trúc thư mục & bảng
//  Gọi một lần duy nhất khi khởi tạo hệ thống
// ══════════════════════════════════════════════════════════════════

/**
 * handleAutoSetup — Tạo toàn bộ Google Drive structure tự động
 *
 * Luồng:
 * 1. Tạo folder CodeLab/ trong Drive
 * 2. Tạo 5 files .gsheet trong folder đó
 * 3. Tạo các tab với tiêu đề trong từng file
 * 4. Lưu Spreadsheet IDs vào Script Properties
 * 5. Cài trigger dailyCleanup
 * 6. Tạo tài khoản admin GV mặc định
 */
function handleAutoSetup(body) {
  // Bước 0: Kiểm tra xem đã setup chưa
  const setupDone = PROP.getProperty('setup_done');
  if (setupDone === 'true' && !body.force) {
    return ok({ already_done: true, msg: 'Đã cài đặt trước đó. Dùng force:true để cài lại.' });
  }

  // Bước 1: Token chỉ cần setup_key (không cần login vì chưa có tài khoản)
  const setupKey = PROP.getProperty('setup_key') || '';
  if (setupKey && body.setup_key !== setupKey) {
    return err('Setup key không đúng');
  }

  const log = [];
  try {
    // ── Tạo folder ────────────────────────────────────────────────
    let folder;
    const existing = DriveApp.getFoldersByName('CodeLab');
    if (existing.hasNext()) {
      folder = existing.next();
      log.push('✅ Folder CodeLab đã tồn tại: ' + folder.getId());
    } else {
      folder = DriveApp.createFolder('CodeLab');
      log.push('📁 Tạo folder CodeLab: ' + folder.getId());
    }

    // ── Tạo 5 Sheets files ────────────────────────────────────────
    const FILES = [
      { key: 'TAIKHOAN', name: '01_TaiKhoan', tabs: [
        { name: 'GiaoVien', headers: ['username','password_hash','ho_ten','email','lop_phu_trach','role','active'] },
        { name: 'HocSinh',  headers: ['mshs','password_hash','ho_ten','email','lop','ngay_sinh','active'] },
      ]},
      { key: 'BAITAP', name: '02_BaiTap', tabs: [
        { name: 'BaiTap',   headers: ['id','lop','bo_sach','chuong','muc_bloom','so_bai','tieu_de','mo_ta','type','updated_at'] },
        { name: 'LyThuyet', headers: ['bai_id','noi_dung_html','updated_at'] },
        { name: 'CodeMau',  headers: ['bai_id','ngon_ngu','code','mo_ta','updated_at'] },
        { name: 'TieuChi',  headers: ['id','bai_id','mo_ta','tu_khoa','diem','goi_y','thu_tu'] },
        { name: 'HuongDan', headers: ['bai_id','loai_loi','mo_ta_loi','cach_sua','vi_du','thu_tu'] },
      ]},
      { key: 'KIEMTRA', name: '03_KiemTra', tabs: [
        { name: 'DanhSach', headers: ['id','ten','mo_ta','lop','thoi_gian_phut','ngay_thi','trang_thai','tao_boi','tao_luc','sua_luc'] },
        { name: 'BaiTapKT', headers: ['ky_id','bai_id','thu_tu'] },
      ]},
      { key: 'KETQUA', name: '04_KetQua', tabs: [
        { name: 'BangDiem',  headers: ['id','ts','mshs','ho_ten','lop','bai_id','tieu_de','diem','lan_thu','ky_kt_id'] },
        { name: 'LichSuLam', headers: ['id','ts','mshs','ho_ten','lop','bai_id','tieu_de','diem','thoi_gian_lam_giay','ky_kt_id'] },
      ]},
      { key: 'NHATKY', name: '05_NhatKy', tabs: [
        { name: 'TruyCap', headers: ['id','ts','user_id','ho_ten','lop','role','action','detail'] },
        { name: 'ViPham',  headers: ['id','ts','mshs','ho_ten','lop','bai_id','lan','loai','code_snap','da_xu_ly'] },
      ]},
    ];

    const newIds = {};
    for (const file of FILES) {
      let ssId = PROP.getProperty('db_' + file.key);
      let ss;

      if (ssId) {
        try { ss = SpreadsheetApp.openById(ssId); log.push(`✅ ${file.name} tồn tại`); }
        catch(e) { ssId = null; }
      }

      if (!ssId) {
        // Tạo mới trong folder
        ss = SpreadsheetApp.create(file.name);
        const ssFile = DriveApp.getFileById(ss.getId());
        folder.addFile(ssFile);
        DriveApp.getRootFolder().removeFile(ssFile);
        ssId = ss.getId();
        PROP.setProperty('db_' + file.key, ssId);
        log.push(`📊 Tạo ${file.name}: ${ssId}`);
      }

      newIds[file.key] = ssId;

      // Tạo tabs
      for (const tab of file.tabs) {
        let sheet = ss.getSheetByName(tab.name);
        if (!sheet) {
          sheet = ss.insertSheet(tab.name);
          _setupHeaders(sheet, tab.headers);
          log.push(`  📋 Tạo tab ${tab.name}`);
        }
      }

      // Xóa Sheet1 mặc định nếu còn
      const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('Trang tính1');
      if (defaultSheet && ss.getSheets().length > 1) {
        try { ss.deleteSheet(defaultSheet); } catch(e) {}
      }
    }

    // ── Cập nhật DB_IDS trong Script Properties ───────────────────
    // (Apps Script sẽ đọc từ Properties thay vì constant)
    log.push('💾 Đã lưu IDs vào Script Properties');

    // ── Cài trigger ──────────────────────────────────────────────
    ScriptApp.getProjectTriggers()
      .filter(t => t.getHandlerFunction() === 'dailyCleanup')
      .forEach(t => ScriptApp.deleteTrigger(t));
    ScriptApp.newTrigger('dailyCleanup').timeBased().everyDays(1).atHour(2).create();
    log.push('⏰ Cài trigger dailyCleanup lúc 2:00 AM');

    // ── Tạo tài khoản GV admin mặc định ─────────────────────────
    const gvSheet = SpreadsheetApp.openById(newIds.TAIKHOAN).getSheetByName('GiaoVien');
    const existGV = gvSheet.getDataRange().getValues();
    const existAdmin = getSheet('TAIKHOAN','Admin',true);
    _ensureHeaders(existAdmin, ADMIN_H);
    if (existAdmin.getLastRow() <= 1) {
      const adminUser = body.admin_username || 'admin';
      const adminPwd  = body.admin_password || 'thuthiem@2025';
      existAdmin.appendRow(ADMIN_H.map(h => ({
        username: adminUser, password_hash: hashPwd(adminPwd),
        ho_ten: body.admin_name||'Quản trị viên', email: body.admin_email||'',
        avatar_url: '', role: 'admin', active: true, created_at: nowISO()
      }[h] ?? '')));
      existAdmin.appendRow(ADMIN_H.map(h => ({
        username: 'trihue', password_hash: hashPwd('TriHue@2025'),
        ho_ten: 'Trí Huệ', email: '', avatar_url: '', role: 'admin',
        active: true, created_at: nowISO()
      }[h] ?? '')));
      log.push(`👤 Tạo tài khoản Admin: ${adminUser} / ${adminPwd}`);
    }

    // ── Hoàn tất ─────────────────────────────────────────────────
    PROP.setProperty('setup_done', 'true');
    PROP.setProperty('setup_ts', new Date().toISOString());

    return ok({
      success: true,
      folder_id: folder.getId(),
      sheet_ids: newIds,
      log,
      msg: 'Cài đặt hoàn tất! Sao chép IDs vào DB_IDS trong Code.gs.',
    });

  } catch(ex) {
    log.push('❌ Lỗi: ' + ex.message);
    return ok({ success: false, log, error: ex.message });
  }
}

function _setupHeaders(sheet, headers) {
  sheet.appendRow(headers);
  const range = sheet.getRange(1, 1, 1, headers.length);
  range.setFontWeight('bold')
       .setBackground('#1a73e8')
       .setFontColor('#ffffff')
       .setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * handleGetSetupStatus — Kiểm tra trạng thái cài đặt
 */
function handleGetSetupStatus(p) {
  const done = PROP.getProperty('setup_done') === 'true';
  const ts   = PROP.getProperty('setup_ts') || '';
  const ids  = {};
  ['TAIKHOAN','BAITAP','KIEMTRA','KETQUA','NHATKY'].forEach(k => {
    ids[k] = PROP.getProperty('db_' + k) || '';
  });
  return ok({ done, ts, ids, has_all: Object.values(ids).every(Boolean) });
}

// ── Override ss() để đọc từ Properties nếu DB_IDS chưa điền ─────
// (Thay thế hàm ss() cũ)
function ssFromProps(key) {
  // Ưu tiên: DB_IDS constant → Script Properties
  const fromConst = DB_IDS[key];
  const fromProp  = PROP.getProperty('db_' + key);
  const id = (fromConst && fromConst !== '') ? fromConst : fromProp;
  if (!id) throw new Error(`Chưa cấu hình Sheets ID cho ${key}. Chạy Setup trước.`);
  return SpreadsheetApp.openById(id);
}

// ═══════════════════════════════════════════════════════════════════
//  EXAM TAKING — BaiLam, BaiKT, MinhChung
// ═══════════════════════════════════════════════════════════════════

// ── Tab headers ──────────────────────────────────────────────────
const BAILAM_H   = ['id','ts','mshs','ho_ten','lop','ky_id','bai_id','tieu_de',
                    'diem','code_snap','tg_lam_giay','lan_thu','type','da_nop'];
const BAIKT_H    = ['id','ts','mshs','ho_ten','lop','ky_id','ten_ky',
                    'diem_tong','so_bai','da_hoan_thanh','tg_tong_giay'];
const MINHCHUNG_H= ['id','ts','mshs','ky_id','diem','html_snippet'];

/**
 * handleSubmitBaiLam — Lưu bài làm từng câu
 */
function handleSubmitBaiLam(body) {
  const sess = requireAuth(body);
  if (sess.role === 'teacher') return ok({});
  checkRateLimit(sess.mshs);

  const { ky_id, bai_id, tieu_de, diem, code_snap, tg_lam_giay, type, da_nop } = body;

  const sheet = getSheet('KETQUA', 'BaiLam', true);
  _ensureHeaders(sheet, BAILAM_H);

  // Tìm bài đã nộp trước đó
  const vals = sheet.getDataRange().getValues();
  const hdr  = vals[0];
  const mshsCol = hdr.indexOf('mshs');
  const baiCol  = hdr.indexOf('bai_id');
  const kyCol   = hdr.indexOf('ky_id');
  const lanCol  = hdr.indexOf('lan_thu');
  let lan = 1;
  let existRow = -1;

  for (let i = 1; i < vals.length; i++) {
    if (vals[i][mshsCol] === sess.mshs && vals[i][baiCol] === bai_id && vals[i][kyCol] === ky_id) {
      existRow = i + 1;
      lan = (parseInt(vals[i][lanCol]) || 0) + 1;
    }
  }

  const row = BAILAM_H.map(h => ({
    id: uuidv4(), ts: nowISO(),
    mshs: sess.mshs, ho_ten: sess.name, lop: sess.lop,
    ky_id: ky_id||'', bai_id: bai_id||'', tieu_de: tieu_de||'',
    diem: diem||0,
    code_snap: String(code_snap||'').substring(0, 2000),
    tg_lam_giay: tg_lam_giay||0,
    lan_thu: lan,
    type: type||'python',
    da_nop: da_nop ? true : false,
  }[h] ?? ''));

  // Nếu toan_ven_1_lan và đã có bài nộp → block
  if (existRow > 0) {
    const exam = _getExamById(ky_id);
    if (exam && exam.toan_ven_1_lan === true && vals[existRow-1][hdr.indexOf('da_nop')] === true) {
      return err('Bài đã nộp, không được làm lại theo quy định kỳ thi.');
    }
    // Append mới (giữ lịch sử)
    sheet.appendRow(row);
  } else {
    sheet.appendRow(row);
  }

  SCRIPT_CACHE.remove('bailam_' + sess.mshs + '_' + ky_id);
  return ok({ saved: true, lan });
}

/**
 * handleSubmitBaiKT — Lưu kết quả tổng hợp 1 bài kiểm tra
 */
function handleSubmitBaiKT(body) {
  const sess = requireAuth(body);
  if (sess.role === 'teacher') return ok({});

  const { ky_id, ten_ky, diem_tong, so_bai, da_hoan_thanh, tg_tong_giay } = body;

  const sheet = getSheet('KETQUA', 'BaiKT', true);
  _ensureHeaders(sheet, BAIKT_H);

  const id = uuidv4();
  sheet.appendRow(BAIKT_H.map(h => ({
    id, ts: nowISO(),
    mshs: sess.mshs, ho_ten: sess.name, lop: sess.lop,
    ky_id: ky_id||'', ten_ky: ten_ky||'',
    diem_tong: diem_tong||0,
    so_bai: so_bai||0,
    da_hoan_thanh: da_hoan_thanh||0,
    tg_tong_giay: tg_tong_giay||0,
  }[h] ?? '')));

  // Cũng lưu vào BangDiem (chung với bài tập thường)
  const bdSheet = getSheet('KETQUA', 'BangDiem', true);
  _ensureHeaders(bdSheet, SCORE_H);
  bdSheet.appendRow(SCORE_H.map(h => ({
    id: uuidv4(), ts: nowISO(),
    mshs: sess.mshs, ho_ten: sess.name, lop: sess.lop,
    bai_id: ky_id, tieu_de: ten_ky,
    diem: diem_tong, lan_thu: 1, ky_kt_id: ky_id,
  }[h] ?? '')));

  SCRIPT_CACHE.remove('exams_' + sess.lop);
  return ok({ id, saved: true });
}

/**
 * handleSaveMinhChung — Lưu minh chứng PDF (HTML snippet)
 */
function handleSaveMinhChung(body) {
  const sess = requireAuth(body);
  const { ky_id, html, diem } = body;

  const sheet = getSheet('KETQUA', 'MinhChung', true);
  _ensureHeaders(sheet, MINHCHUNG_H);

  sheet.appendRow(MINHCHUNG_H.map(h => ({
    id: uuidv4(), ts: nowISO(),
    mshs: sess.mshs, ky_id: ky_id||'',
    diem: diem||0,
    html_snippet: String(html||'').substring(0, 5000),
  }[h] ?? '')));
  return ok({ saved: true });
}

/**
 * handleGetMyResults — Học sinh xem lại kết quả của mình
 */
function handleGetMyResults(body) {
  const sess = requireAuth(body);
  const ky_id = (body.ky_id || body.p?.ky_id || '');

  const sheet = getSheet('KETQUA', 'BaiLam');
  if (!sheet) return ok([]);

  let rows = sheetData(sheet).filter(r => r.mshs === sess.mshs);
  if (ky_id) rows = rows.filter(r => r.ky_id === ky_id);
  // Ẩn code_snap của bài khác nếu không phải teacher
  if (sess.role !== 'teacher') {
    rows = rows.map(r => ({ ...r, code_snap: r.code_snap }));
  }
  return ok(rows);
}

/**
 * handleGetBaiKT — Xem tổng kết bài kiểm tra
 */
function handleGetBaiKT(p) {
  const sess = verifyToken(p.token);
  if (!sess) return err('Token không hợp lệ');
  const sheet = getSheet('KETQUA', 'BaiKT');
  if (!sheet) return ok([]);
  let rows = sheetData(sheet);
  if (sess.role !== 'teacher') rows = rows.filter(r => r.mshs === sess.mshs);
  return ok(rows);
}

/**
 * _getExamById — Lấy thông tin kỳ thi (internal helper)
 */
function _getExamById(ky_id) {
  const cached = SCRIPT_CACHE.get('exam_' + ky_id);
  if (cached) try { return JSON.parse(cached); } catch {}
  const sheet = getSheet('KIEMTRA', 'DanhSach');
  if (!sheet) return null;
  const rows = sheetData(sheet);
  const exam = rows.find(r => r.id === ky_id);
  if (exam) SCRIPT_CACHE.put('exam_' + ky_id, JSON.stringify(exam), CACHE_TTL_S);
  return exam || null;
}

/**
 * handleGetExams v2 — Trả về bài tập kèm metadata đầy đủ
 */
function _enrichExamWithDetails(exam, bts) {
  const myBts = bts.filter(b => b.ky_id === exam.id)
    .sort((a, b) => (parseInt(a.thu_tu)||0) - (parseInt(b.thu_tu)||0));

  // Parse bloom_filter (có thể là JSON string)
  let bloomFilter = null;
  if (exam.bloom_filter) {
    try { bloomFilter = JSON.parse(exam.bloom_filter); } catch {}
  }

  return {
    ...exam,
    che_do_tron_de:  exam.che_do_tron_de  === true || exam.che_do_tron_de  === 'TRUE',
    toan_ven_1_lan:  exam.toan_ven_1_lan  === true || exam.toan_ven_1_lan  === 'TRUE',
    cho_xem_dap_an:  exam.cho_xem_dap_an  === true || exam.cho_xem_dap_an  === 'TRUE',
    so_bai_random:   parseInt(exam.so_bai_random) || 0,
    bloom_filter:    bloomFilter,
    // Simple list
    bai_tap: myBts.map(b => b.bai_id),
    // Detailed list with metadata
    bai_tap_detail: myBts.map(b => ({
      bai_id:       b.bai_id,
      nhom:         b.nhom || '',
      diem_co_phan: parseFloat(b.diem_co_phan) || 1.0,
      bloom_level:  b.bloom_level || '',
      thu_tu:       parseInt(b.thu_tu) || 0,
    })),
  };
}

// ═══════════════════════════════════════════════════════════════════
//  EXAM CODE VERIFICATION + ANALYTICS
// ═══════════════════════════════════════════════════════════════════

/**
 * handleVerifyExamCode — Học sinh nhập mã truy cập
 */
function handleVerifyExamCode(p) {
  const sess = verifyToken(p.token);
  if (!sess) return err('Token không hợp lệ');

  const code = (p.code || '').trim().toUpperCase();
  if (!code) return err('Mã truy cập không được để trống');

  const dsSheet = getSheet('KIEMTRA', 'DanhSach');
  if (!dsSheet) return err('Không tìm thấy dữ liệu kỳ kiểm tra');

  const rows = sheetData(dsSheet);
  const exam = rows.find(r =>
    String(r.mat_khau||'').trim().toUpperCase() === code &&
    r.trang_thai === 'active'
  );

  if (!exam) return err('Mã không đúng hoặc đợt kiểm tra chưa mở');

  // Enrich with bai_tap_detail
  const btSheet = getSheet('KIEMTRA', 'BaiTapKT');
  const bts     = btSheet ? sheetData(btSheet) : [];
  const enriched = _enrichExamWithDetails(exam, bts);

  // Log access
  _logAccess(sess.mshs||sess.username, sess.name, sess.lop, sess.role, 'enter_exam', exam.id);

  return ok({ exam: enriched });
}

/**
 * handleSyncAnalytics — Ghi dữ liệu phân tích vào sheet [TongHop]
 */
function handleSyncAnalytics(body) {
  requireTeacher(body);

  const TONGHOP_H = ['ts','mshs','ho_ten','lop','ky_id','ten_ky',
                     'diem_tong','so_bai','da_hoan_thanh','tg_tong_giay',
                     'bloom_b1','bloom_b2','bloom_b3','bloom_b4','bloom_b5','bloom_b6'];

  const baiKTSheet = getSheet('KETQUA', 'BaiKT');
  const baiLamSheet= getSheet('KETQUA', 'BaiLam');
  const thSheet    = getSheet('KETQUA', 'TongHop', true);

  _ensureHeaders(thSheet, TONGHOP_H);

  if (!baiKTSheet || !baiLamSheet) return err('Không tìm thấy dữ liệu');

  const baiKTs = sheetData(baiKTSheet);
  const baiLams = sheetData(baiLamSheet);

  // Build TongHop: enrich each BaiKT with bloom averages
  const rows = baiKTs.map(bkt => {
    const lams = baiLams.filter(l => l.mshs === bkt.mshs && l.ky_id === bkt.ky_id);
    const bloom = {};
    for (const lv of ['b1','b2','b3','b4','b5','b6']) {
      const sc = lams.filter(l => String(l.bai_id||'').includes('-'+lv+'-'))
                      .map(l => parseFloat(l.diem)||0);
      bloom['bloom_'+lv] = sc.length ? (sc.reduce((a,b)=>a+b,0)/sc.length).toFixed(2) : '';
    }
    return TONGHOP_H.map(h => ({
      ts: bkt.ts||'', mshs: bkt.mshs||'', ho_ten: bkt.ho_ten||'', lop: bkt.lop||'',
      ky_id: bkt.ky_id||'', ten_ky: bkt.ten_ky||'',
      diem_tong: bkt.diem_tong||0, so_bai: bkt.so_bai||0,
      da_hoan_thanh: bkt.da_hoan_thanh||0, tg_tong_giay: bkt.tg_tong_giay||0,
      ...bloom,
    }[h] ?? ''));
  });

  // Clear and rewrite
  if (thSheet.getLastRow() > 1) thSheet.deleteRows(2, thSheet.getLastRow() - 1);
  if (rows.length) thSheet.getRange(2, 1, rows.length, TONGHOP_H.length).setValues(rows);

  return ok({ rows_written: rows.length });
}

/**
 * Route additions
 */
// (These are already added via the route case additions above.
//  Add to doGet and doPost handlers manually or patch below:)

// ═══════════════════════════════════════════════════════════════════
//  ĐỢT KIỂM TRA — Quản lý nhiều đợt KT trong năm học
// ═══════════════════════════════════════════════════════════════════

const DOT_KT_H = ['id','ten','nam_hoc','hoc_ky','dot_so','lop',
                  'mo_ta','trang_thai','tao_boi','tao_luc',
                  'ky_kt_ids'];  // JSON array of exam IDs

/**
 * handleGetDotKiemTra — Lấy danh sách đợt kiểm tra
 */
function handleGetDotKiemTra(p) {
  const sess = verifyToken(p.token);
  if (!sess) return err('Token không hợp lệ');

  const cached = SCRIPT_CACHE.get('dot_kt_all');
  if (cached) try { return ok(JSON.parse(cached)); } catch {}

  const sheet = getSheet('KIEMTRA', 'DotKiemTra');
  if (!sheet) return ok([]);

  let rows = sheetData(sheet);
  if (sess.role !== 'teacher') {
    rows = rows.filter(d =>
      d.trang_thai === 'active' &&
      (!d.lop || d.lop.split(',').map(s=>s.trim()).includes(sess.lop))
    );
  }

  // Parse ky_kt_ids JSON
  rows = rows.map(d => ({
    ...d,
    ky_kt_ids: d.ky_kt_ids ? (function() {
      try { return JSON.parse(d.ky_kt_ids); } catch { return []; }
    })() : [],
  }));

  SCRIPT_CACHE.put('dot_kt_all', JSON.stringify(rows), CACHE_TTL_S);
  return ok(rows);
}

/**
 * handleSaveDotKiemTra — Tạo / cập nhật đợt kiểm tra
 */
function handleSaveDotKiemTra(body) {
  const sess = requireTeacher(body);
  const { dot } = body;
  if (!dot?.ten) return err('Thiếu tên đợt kiểm tra');

  const sheet = getSheet('KIEMTRA', 'DotKiemTra', true);
  _ensureHeaders(sheet, DOT_KT_H);

  const id    = dot.id || 'DOT_' + Date.now();
  const isNew = !dot.id;

  _upsertRow(sheet, 'id', id, {
    id, ten: dot.ten||'',
    nam_hoc: dot.nam_hoc||'',
    hoc_ky: dot.hoc_ky||'',
    dot_so: dot.dot_so||1,
    lop: dot.lop||'',
    mo_ta: dot.mo_ta||'',
    trang_thai: dot.trang_thai || (isNew ? 'planning' : 'planning'),
    tao_boi: isNew ? sess.name : (dot.tao_boi||sess.name),
    tao_luc: isNew ? nowISO() : (dot.tao_luc||nowISO()),
    ky_kt_ids: JSON.stringify(dot.ky_kt_ids||[]),
  }, DOT_KT_H);

  SCRIPT_CACHE.remove('dot_kt_all');
  return ok({ id, saved: true });
}

/**
 * handleDeleteDotKiemTra
 */
function handleDeleteDotKiemTra(body) {
  requireTeacher(body);
  const sheet = getSheet('KIEMTRA', 'DotKiemTra');
  if (sheet) _deleteRow(sheet, 'id', body.dot_id);
  SCRIPT_CACHE.remove('dot_kt_all');
  return ok({ deleted: true });
}

// ═══════════════════════════════════════════════════════════════════
//  EXPORT TO GOOGLE SHEETS — Xuất báo cáo
// ═══════════════════════════════════════════════════════════════════

/**
 * handleExportToSheets — Tạo/cập nhật sheet báo cáo trong Drive
 * Tạo file "CodeLab_BaoCao_[date].gsheet" trong folder CodeLab/
 */
function handleExportToSheets(body) {
  requireTeacher(body);
  const { type } = body;  // 'class' | 'student' | 'bloom' | 'all'

  try {
    // Find or create report file
    const folder   = DriveApp.getFoldersByName(
      PROP.getProperty('drive_folder_name') || 'CodeLab'
    );
    const baoCaoFolder = folder.hasNext() ? folder.next() : DriveApp.getRootFolder();

    const today    = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd');
    const fileName = `CodeLab_BaoCao_${today}`;

    // Get or create report spreadsheet
    let ss;
    const existing = baoCaoFolder.getFilesByName(fileName);
    if (existing.hasNext()) {
      ss = SpreadsheetApp.openById(existing.next().getId());
    } else {
      ss = SpreadsheetApp.create(fileName);
      const f = DriveApp.getFileById(ss.getId());
      baoCaoFolder.addFile(f);
      DriveApp.getRootFolder().removeFile(f);
    }

    const result = { url: ss.getUrl(), sheets_created: [] };

    // Load data
    const baiKTs   = sheetData(getSheet('KETQUA','BaiKT'));
    const baiLams  = sheetData(getSheet('KETQUA','BaiLam'));
    const students = sheetData(getSheet('TAIKHOAN','HocSinh'));
    const exams    = sheetData(getSheet('KIEMTRA','DanhSach'));

    // ── Sheet 1: Tổng hợp lớp ─────────────────────────────────
    if (type === 'class' || type === 'all') {
      _writeClassSummarySheet(ss, baiKTs, students, exams);
      result.sheets_created.push('Tổng hợp lớp');
    }

    // ── Sheet 2: Chi tiết học sinh ────────────────────────────
    if (type === 'student' || type === 'all') {
      _writeStudentDetailSheet(ss, baiKTs, baiLams, students, exams);
      result.sheets_created.push('Năng lực học sinh');
    }

    // ── Sheet 3: Phân tích Bloom ──────────────────────────────
    if (type === 'bloom' || type === 'all') {
      _writeBloomSheet(ss, baiLams, students, exams);
      result.sheets_created.push('Phân tích Bloom');
    }

    // ── Sheet 4: Điểm thô tất cả ─────────────────────────────
    if (type === 'all') {
      _writeRawScoresSheet(ss, baiKTs);
      result.sheets_created.push('Điểm thô');
    }

    // Remove default Sheet1 if still there
    const def = ss.getSheetByName('Sheet1') || ss.getSheetByName('Trang tính1');
    if (def && ss.getSheets().length > 1) try { ss.deleteSheet(def); } catch {}

    return ok(result);
  } catch(e) {
    return err('Lỗi xuất Sheets: ' + e.message);
  }
}

function _writeClassSummarySheet(ss, baiKTs, students, exams) {
  let sheet = ss.getSheetByName('Tổng hợp lớp');
  if (!sheet) sheet = ss.insertSheet('Tổng hợp lớp');
  sheet.clearContents();

  const headers = ['MSSV','Họ tên','Lớp',
    ...exams.filter(e => ['active','closed'].includes(e.trang_thai))
             .map(e => e.ten.substring(0,20)),
    'Điểm TB', 'Xếp loại'];

  const rows = [headers];

  const stuMap = {};
  students.forEach(s => stuMap[s.mssv] = s);

  // All students in baiKTs
  const allMssv = [...new Set(baiKTs.map(b => b.mssv))].sort();
  const activeExams = exams.filter(e => ['active','closed'].includes(e.trang_thai));

  for (const mssv of allMssv) {
    const stu   = stuMap[mssv] || {};
    const datas = activeExams.map(e => {
      const r = baiKTs.find(b => b.mssv === mssv && b.ky_id === e.id);
      return r ? (parseFloat(r.diem_tong)||0) : '';
    });
    const scores = datas.filter(d => d !== '').map(Number);
    const avg    = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : '';
    const rank   = avg === '' ? '' : avg >= 8 ? 'Giỏi' : avg >= 6.5 ? 'Khá' : avg >= 5 ? 'TB' : 'Yếu';
    rows.push([mssv, stu.ho_ten||mssv, stu.lop||'', ...datas,
      avg === '' ? '' : parseFloat(avg.toFixed(2)), rank]);
  }

  sheet.getRange(1,1,rows.length,headers.length).setValues(rows);
  const hRange = sheet.getRange(1,1,1,headers.length);
  hRange.setFontWeight('bold').setBackground('#1a73e8').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function _writeStudentDetailSheet(ss, baiKTs, baiLams, students, exams) {
  let sheet = ss.getSheetByName('Năng lực học sinh');
  if (!sheet) sheet = ss.insertSheet('Năng lực học sinh');
  sheet.clearContents();

  const headers = ['MSSV','Họ tên','Lớp','Đợt thi','Điểm tổng',
    'B1-Nhận biết','B2-Hiểu','B3-Áp dụng','B4-Phân tích','B5-Đánh giá','B6-Sáng tạo',
    'Tg làm (phút)'];
  sheet.getRange(1,1,1,headers.length).setValues([headers]);
  sheet.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#0f9d58').setFontColor('#fff');

  const stuMap = {};
  students.forEach(s => stuMap[s.mssv] = s);

  const rows = baiKTs.map(bkt => {
    const stu  = stuMap[bkt.mssv] || {};
    const exam = exams.find(e => e.id === bkt.ky_id);
    const lams = baiLams.filter(l => l.mssv === bkt.mssv && l.ky_id === bkt.ky_id);
    const bloomAvg = ['b1','b2','b3','b4','b5','b6'].map(lv => {
      const sc = lams.filter(l => String(l.bai_id||'').match(new RegExp('-'+lv+'-')))
                      .map(l => parseFloat(l.diem)||0);
      return sc.length ? parseFloat((sc.reduce((a,b)=>a+b,0)/sc.length).toFixed(2)) : '';
    });
    return [
      bkt.mssv||'', stu.ho_ten||bkt.ho_ten||'', stu.lop||bkt.lop||'',
      exam?.ten||bkt.ky_id, parseFloat(bkt.diem_tong)||0,
      ...bloomAvg,
      bkt.tg_tong_giay ? Math.round(parseInt(bkt.tg_tong_giay)/60) : '',
    ];
  });

  if (rows.length) sheet.getRange(2,1,rows.length,headers.length).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function _writeBloomSheet(ss, baiLams, students, exams) {
  let sheet = ss.getSheetByName('Phân tích Bloom');
  if (!sheet) sheet = ss.insertSheet('Phân tích Bloom');
  sheet.clearContents();

  const activeExams = exams.filter(e => ['active','closed'].includes(e.trang_thai));
  const headers = ['Đợt thi','Mức Bloom','Tổng câu','Trung bình đạt','Tỷ lệ đạt (≥5)','Tỷ lệ giỏi (≥8)'];
  sheet.getRange(1,1,1,headers.length).setValues([headers]);
  sheet.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#f4b400').setFontColor('#fff');

  const rows = [];
  for (const exam of activeExams) {
    const lams = baiLams.filter(l => l.ky_id === exam.id);
    for (const lv of ['b1','b2','b3','b4','b5','b6']) {
      const sc = lams.filter(l => String(l.bai_id||'').match(new RegExp('-'+lv+'-')))
                      .map(l => parseFloat(l.diem)||0);
      if (!sc.length) continue;
      const avg  = sc.reduce((a,b)=>a+b,0)/sc.length;
      const pass = sc.filter(s=>s>=5).length;
      const gioi = sc.filter(s=>s>=8).length;
      rows.push([
        exam.ten, `B${lv[1]} – ${['Nhận biết','Hiểu','Áp dụng','Phân tích','Đánh giá','Sáng tạo'][parseInt(lv[1])-1]}`,
        sc.length,
        parseFloat(avg.toFixed(2)),
        parseFloat((pass/sc.length*100).toFixed(1)) + '%',
        parseFloat((gioi/sc.length*100).toFixed(1)) + '%',
      ]);
    }
  }

  if (rows.length) sheet.getRange(2,1,rows.length,headers.length).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function _writeRawScoresSheet(ss, baiKTs) {
  let sheet = ss.getSheetByName('Điểm thô');
  if (!sheet) sheet = ss.insertSheet('Điểm thô');
  sheet.clearContents();

  const headers = ['ID','Thời gian','MSSV','Họ tên','Lớp','Đợt thi','Điểm','Số câu','Hoàn thành','Tg (phút)'];
  const rows = baiKTs.map(b => [
    b.id,b.ts,b.mssv,b.ho_ten,b.lop,b.ten_ky||b.ky_id,
    parseFloat(b.diem_tong)||0,
    parseInt(b.so_bai)||0,
    parseInt(b.da_hoan_thanh)||0,
    b.tg_tong_giay ? Math.round(parseInt(b.tg_tong_giay)/60) : 0,
  ]);

  sheet.getRange(1,1,1,headers.length).setValues([headers]);
  sheet.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('#fff');
  if (rows.length) sheet.getRange(2,1,rows.length,headers.length).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

// ── Route additions ──────────────────────────────────────────────
// Add these cases to doPost / doGet manually or these functions are referenced above
function _addRoutes() {
  // These routes are added in the main doPost/doGet above
  // This function documents them:
  // POST: saveDotKiemTra, deleteDotKiemTra, exportToSheets
  // GET:  getDotKiemTra
}

// ═══════════════════════════════════════════════════════════════════
//  PROFILE — My Profile CRUD
// ═══════════════════════════════════════════════════════════════════

/**
 * handleGetMyProfile — Lấy thông tin đầy đủ của user đang đăng nhập
 */
function handleUpdateProfile(body) {
  const sess = verifyToken(body.token);
  if (!sess) return err('Token không hợp lệ');
  const { ho_ten, email, ngay_sinh } = body;
  const sheetName = sess.role === 'student' ? 'HocSinh' : sess.role === 'admin' ? 'Admin' : 'GiaoVien';
  const sheet = getSheet('TAIKHOAN', sheetName);
  if (!sheet) return err('Không tìm thấy sheet');
  const vals = sheet.getDataRange().getValues();
  const hdr  = vals[0];
  const keyCol = sess.role === 'student' ? hdr.indexOf('mshs') : hdr.indexOf('username');
  const keyVal = sess.role === 'student' ? sess.mshs : sess.username;
  for (let i = 1; i < vals.length; i++) {
    if (String(vals[i][keyCol]) === String(keyVal)) {
      if (ho_ten    !== undefined) { const c = hdr.indexOf('ho_ten');    if (c>=0) sheet.getRange(i+1,c+1).setValue(ho_ten); }
      if (email     !== undefined) { const c = hdr.indexOf('email');     if (c>=0) sheet.getRange(i+1,c+1).setValue(email); }
      if (ngay_sinh !== undefined) { const c = hdr.indexOf('ngay_sinh'); if (c>=0) sheet.getRange(i+1,c+1).setValue(ngay_sinh); }
      return ok({ updated: true });
    }
  }
  return err('Không tìm thấy tài khoản');
}

function handleGetMyProfile(p) {
  const sess = verifyToken(p.token);
  if (!sess) return err('Token không hợp lệ');

  const sheetName = sess.role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet     = getSheet('TAIKHOAN', sheetName);
  if (!sheet) return ok({});

  const rows   = sheetData(sheet);
  const keyField = sess.role === 'teacher' ? 'username' : 'mshs';
  const keyVal   = sess.role === 'teacher' ? sess.username : sess.mshs;
  const found    = rows.find(r => String(r[keyField]||'').toLowerCase() === String(keyVal||'').toLowerCase());

  if (!found) return ok({});
  // Strip password_hash before returning
  const { password_hash, ...profile } = found;
  return ok(profile);
}

/**
 * handleUpdateMyProfile — Cập nhật thông tin cá nhân (không đổi mật khẩu)
 */
function handleUpdateMyProfile(body) {
  const sess = requireAuth(body);
  const { ho_ten, email, ngay_sinh } = body;
  if (!ho_ten || !ho_ten.trim()) return err('Họ tên không được để trống');

  const sheetName = sess.role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet     = getSheet('TAIKHOAN', sheetName);
  const vals      = sheet.getDataRange().getValues();
  const hdr       = vals[0];
  const keyField  = sess.role === 'teacher' ? 'username' : 'mshs';
  const keyVal    = sess.role === 'teacher' ? sess.username : sess.mshs;
  const keyCol    = hdr.indexOf(keyField);

  for (let i = 1; i < vals.length; i++) {
    if (String(vals[i][keyCol]||'').toLowerCase() !== String(keyVal||'').toLowerCase()) continue;
    // Update name
    const nameCol = hdr.indexOf('ho_ten');
    if (nameCol >= 0) sheet.getRange(i+1, nameCol+1).setValue(ho_ten.trim());
    // Update email
    const emailCol = hdr.indexOf('email');
    if (emailCol >= 0 && email !== undefined) sheet.getRange(i+1, emailCol+1).setValue(email||'');
    // Update ngay_sinh (student only)
    const dobCol = hdr.indexOf('ngay_sinh');
    if (dobCol >= 0 && ngay_sinh !== undefined) sheet.getRange(i+1, dobCol+1).setValue(ngay_sinh||'');

    // Update session token name
    SCRIPT_CACHE.remove('token_' + body.token);
    return ok({ updated: true, ho_ten: ho_ten.trim() });
  }
  return err('Không tìm thấy tài khoản');
}

// ═══════════════════════════════════════════════════════════════════
//  ADMIN — User Management
// ═══════════════════════════════════════════════════════════════════

/**
 * handleAdminGetAdmins — Lấy danh sách admin
 */
function handleAdminGetAdmins(p) {
  requireAdmin({ token: p.token });
  const sheet = getSheet('TAIKHOAN', 'Admin');
  if (!sheet) return ok([]);
  return ok(sheetData(sheet).map(r => {
    const { password_hash, ...rest } = r;
    return rest;
  }));
}

/**
 * handleAdminSaveAdmin — Thêm/sửa tài khoản admin
 */
function handleAdminSaveAdmin(body) {
  requireAdmin(body);
  const { username, ho_ten, email, is_new, password, role } = body;
  if (!username) return err('Thiếu username');
  if (!ho_ten)   return err('Thiếu họ tên');

  const sheet = getSheet('TAIKHOAN', 'Admin', true);
  _ensureHeaders(sheet, ADMIN_H);
  const vals = sheet.getDataRange().getValues();
  const hdr  = vals[0] || ADMIN_H;
  const uCol = hdr.indexOf('username');

  if (is_new) {
    // Check duplicate
    for (let i = 1; i < vals.length; i++) {
      if (String(vals[i][uCol]||'').toLowerCase() === String(username).toLowerCase())
        return err(`Username "${username}" đã tồn tại`);
    }
    const pw = password || 'thuthiem@2025';
    const row = ADMIN_H.map(h => ({
      username: username.trim(), password_hash: hashPwd(pw),
      ho_ten: ho_ten.trim(), email: email||'',
      avatar_url: '', role: role||'admin',
      active: true, created_at: nowISO()
    }[h] ?? ''));
    sheet.appendRow(row);
    return ok({ saved: true, username });
  } else {
    // Update existing
    for (let i = 1; i < vals.length; i++) {
      if (String(vals[i][uCol]||'').toLowerCase() === String(username).toLowerCase()) {
        const nameCol  = hdr.indexOf('ho_ten');
        const emailCol = hdr.indexOf('email');
        const roleCol  = hdr.indexOf('role');
        const row = i + 1;
        if (nameCol  >= 0) sheet.getRange(row, nameCol+1).setValue(ho_ten.trim());
        if (emailCol >= 0) sheet.getRange(row, emailCol+1).setValue(email||'');
        if (roleCol  >= 0) sheet.getRange(row, roleCol+1).setValue(role||'admin');
        if (password) {
          const pwCol = hdr.indexOf('password_hash');
          if (pwCol >= 0) sheet.getRange(row, pwCol+1).setValue(hashPwd(password));
        }
        return ok({ saved: true, username });
      }
    }
    return err('Không tìm thấy admin: ' + username);
  }
}

/**
 * handleAdminDeleteAdmin — Xoá tài khoản admin
 */
function handleAdminDeleteAdmin(body) {
  requireAdmin(body);
  const { username } = body;
  if (!username) return err('Thiếu username');

  // Không cho xoá chính mình
  const sess = verifyToken(body.token);
  if (sess?.username === username) return err('Không thể xoá tài khoản đang đăng nhập');

  const sheet = getSheet('TAIKHOAN', 'Admin');
  if (!sheet) return err('Không tìm thấy bảng Admin');
  const vals = sheet.getDataRange().getValues();
  const uCol = (vals[0]||[]).indexOf('username');
  for (let i = 1; i < vals.length; i++) {
    if (String(vals[i][uCol]||'').toLowerCase() === String(username).toLowerCase()) {
      sheet.deleteRow(i + 1);
      return ok({ deleted: true });
    }
  }
  return err('Không tìm thấy: ' + username);
}

/**
 * handleSaveAvatar — Lưu avatar (base64 data URL)
 */
function handleSaveAvatar(body) {
  const sess = verifyToken(body.token);
  if (!sess) return err('Token không hợp lệ');
  const { avatar_data } = body; // base64 data URL
  if (!avatar_data) return err('Thiếu avatar_data');

  try {
    // Lưu vào Drive dưới dạng file ảnh
    const base64 = avatar_data.split(',')[1] || avatar_data;
    const mime   = (avatar_data.match(/data:([^;]+);/) || [])[1] || 'image/png';
    const blob   = Utilities.newBlob(Utilities.base64Decode(base64), mime, `avatar_${sess.username||sess.mshs}.png`);

    // Tìm folder CodeLab
    const folders = DriveApp.getFoldersByName('CodeLab');
    const folder  = folders.hasNext() ? folders.next() : DriveApp.getRootFolder();

    // Xoá avatar cũ nếu có
    const oldFiles = folder.getFilesByName(`avatar_${sess.username||sess.mshs}.png`);
    while (oldFiles.hasNext()) oldFiles.next().setTrashed(true);

    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const url = `https://drive.google.com/uc?id=${file.getId()}`;

    // Cập nhật avatar_url trong bảng user
    const sheetMap = { admin:'Admin', teacher:'GiaoVien', student:'HocSinh' };
    const sn = sheetMap[sess.role] || 'HocSinh';
    const sheet = getSheet('TAIKHOAN', sn);
    if (sheet) {
      const vals = sheet.getDataRange().getValues();
      const hdr  = vals[0] || [];
      const keyCol = hdr.indexOf(sess.role==='student' ? 'mshs' : 'username');
      const avCol  = hdr.indexOf('avatar_url');
      const keyVal = sess.role==='student' ? sess.mshs : (sess.username || sess.mshs);
      if (avCol >= 0) {
        for (let i = 1; i < vals.length; i++) {
          if (String(vals[i][keyCol]||'') === String(keyVal||'')) {
            sheet.getRange(i+1, avCol+1).setValue(url);
            break;
          }
        }
      }
    }
    SCRIPT_CACHE.remove('my_profile_' + (sess.username||sess.mshs));
    return ok({ url });
  } catch(ex) {
    return ok({ error: ex.message, url: '' });
  }
}

/**
 * handleAdminGetUsers — Lấy danh sách users (teacher hoặc student)
 * Yêu cầu role teacher trở lên
 */
function handleAdminGetUsers(p) {
  requireTeacher({ token: p.token });
  const role = p.role || 'student'; // 'student' | 'teacher'
  const sheetName = role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet = getSheet('TAIKHOAN', sheetName);
  if (!sheet) return ok([]);
  return ok(sheetData(sheet).map(r => {
    const { password_hash, ...rest } = r;
    return rest;
  }));
}

/**
 * handleAdminSaveUser — Thêm hoặc sửa user (admin only)
 */
function handleAdminSaveUser(body) {
  requireTeacher(body);
  const { role, is_new, password } = body;
  const sheetName = role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet     = getSheet('TAIKHOAN', sheetName, true);
  const vals      = sheet.getDataRange().getValues();
  const hdr       = vals.length > 0 ? vals[0] : null;

  if (role === 'student') {
    const { mshs, ho_ten, lop, email, ngay_sinh } = body;
    if (!mshs)   return err('Thiếu MSHS');
    if (!ho_ten) return err('Thiếu họ tên');
    if (!lop)    return err('Thiếu lớp');

    if (is_new) {
      // Check duplicate MSHS
      if (hdr) {
        const mshs_col = hdr.indexOf('mshs');
        for (let i = 1; i < vals.length; i++) {
          if (String(vals[i][mshs_col]||'').trim() === String(mshs).trim())
            return err(`MSHS "${mshs}" đã tồn tại`);
        }
      }
      // Ensure headers
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['mshs','password_hash','ho_ten','email','lop','ngay_sinh','active']);
        sheet.getRange(1,1,1,7).setFontWeight('bold').setBackground('#4472C4').setFontColor('white');
      }
      const pw = password || mshs; // default password = mshs
      sheet.appendRow([mshs.trim(), hashPwd(pw), ho_ten.trim(), email||'', lop.trim(), ngay_sinh||'', true]);
    } else {
      // Update existing
      const mshs_col = hdr.indexOf('mshs');
      const name_col = hdr.indexOf('ho_ten');
      const lop_col  = hdr.indexOf('lop');
      const mail_col = hdr.indexOf('email');
      const dob_col  = hdr.indexOf('ngay_sinh');
      for (let i = 1; i < vals.length; i++) {
        if (String(vals[i][mshs_col]||'').trim() !== String(mshs).trim()) continue;
        if (name_col >= 0) sheet.getRange(i+1, name_col+1).setValue(ho_ten.trim());
        if (lop_col  >= 0) sheet.getRange(i+1, lop_col+1).setValue(lop.trim());
        if (mail_col >= 0) sheet.getRange(i+1, mail_col+1).setValue(email||'');
        if (dob_col  >= 0) sheet.getRange(i+1, dob_col+1).setValue(ngay_sinh||'');
        break;
      }
    }
  } else {
    // Teacher
    const { username, ho_ten, lop_phu_trach, email, user_role } = body;
    if (!username) return err('Thiếu username');
    if (!ho_ten)   return err('Thiếu họ tên');

    if (is_new) {
      // Check duplicate
      if (hdr) {
        const u_col = hdr.indexOf('username');
        for (let i = 1; i < vals.length; i++) {
          if (String(vals[i][u_col]||'').toLowerCase() === String(username).toLowerCase())
            return err(`Username "${username}" đã tồn tại`);
        }
      }
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['username','password_hash','ho_ten','email','lop_phu_trach','role','active']);
        sheet.getRange(1,1,1,7).setFontWeight('bold').setBackground('#4472C4').setFontColor('white');
      }
      const pw = password || username;
      sheet.appendRow([username.trim(), hashPwd(pw), ho_ten.trim(), email||'', lop_phu_trach||'', user_role||'teacher', true]);
    } else {
      const u_col    = hdr.indexOf('username');
      const name_col = hdr.indexOf('ho_ten');
      const mail_col = hdr.indexOf('email');
      const lop_col  = hdr.indexOf('lop_phu_trach');
      const role_col = hdr.indexOf('role');
      for (let i = 1; i < vals.length; i++) {
        if (String(vals[i][u_col]||'').toLowerCase() !== String(username).toLowerCase()) continue;
        if (name_col >= 0) sheet.getRange(i+1, name_col+1).setValue(ho_ten.trim());
        if (mail_col >= 0) sheet.getRange(i+1, mail_col+1).setValue(email||'');
        if (lop_col  >= 0) sheet.getRange(i+1, lop_col+1).setValue(lop_phu_trach||'');
        if (role_col >= 0 && user_role) sheet.getRange(i+1, role_col+1).setValue(user_role);
        break;
      }
    }
  }

  SCRIPT_CACHE.remove('users_' + role);
  return ok({ saved: true });
}

/**
 * handleAdminDeleteUser — Xoá user (admin only)
 */
function handleAdminDeleteUser(body) {
  requireTeacher(body);
  const { role, id } = body;
  const sheetName = role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet     = getSheet('TAIKHOAN', sheetName);
  if (!sheet) return err('Sheet không tồn tại');

  const vals    = sheet.getDataRange().getValues();
  const keyCol  = vals[0].indexOf(role === 'teacher' ? 'username' : 'mshs');

  for (let i = vals.length - 1; i >= 1; i--) {
    if (String(vals[i][keyCol]||'').trim().toLowerCase() === String(id||'').trim().toLowerCase()) {
      sheet.deleteRow(i + 1);
      SCRIPT_CACHE.remove('users_' + role);
      return ok({ deleted: true });
    }
  }
  return err('Không tìm thấy tài khoản');
}

/**
 * handleAdminResetPassword — Đặt lại mật khẩu (admin, không cần pw cũ)
 */
function handleAdminResetPassword(body) {
  requireTeacher(body);
  const { role, id, new_hash } = body;
  if (!new_hash) return err('Thiếu mật khẩu mới');

  const sheetName = role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet     = getSheet('TAIKHOAN', sheetName);
  if (!sheet) return err('Sheet không tồn tại');

  const vals   = sheet.getDataRange().getValues();
  const hdr    = vals[0];
  const keyCol = hdr.indexOf(role === 'teacher' ? 'username' : 'mshs');
  const pwCol  = hdr.indexOf('password_hash');

  for (let i = 1; i < vals.length; i++) {
    if (String(vals[i][keyCol]||'').trim().toLowerCase() !== String(id||'').trim().toLowerCase()) continue;
    // Store the hash directly (client already hashed)
    sheet.getRange(i+1, pwCol+1).setValue(new_hash.trim());
    SCRIPT_CACHE.remove('users_' + role);
    return ok({ reset: true });
  }
  return err('Không tìm thấy tài khoản');
}

/**
 * handleAdminToggleActive — Khoá/mở tài khoản
 */
function handleAdminToggleActive(body) {
  requireTeacher(body);
  const { role, id, active } = body;
  const sheetName = role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet     = getSheet('TAIKHOAN', sheetName);
  if (!sheet) return err('Sheet không tồn tại');

  const vals      = sheet.getDataRange().getValues();
  const hdr       = vals[0];
  const keyCol    = hdr.indexOf(role === 'teacher' ? 'username' : 'mshs');
  const activeCol = hdr.indexOf('active');

  for (let i = 1; i < vals.length; i++) {
    if (String(vals[i][keyCol]||'').trim().toLowerCase() !== String(id||'').trim().toLowerCase()) continue;
    if (activeCol >= 0) sheet.getRange(i+1, activeCol+1).setValue(active === true);
    SCRIPT_CACHE.remove('users_' + role);
    return ok({ toggled: true, active });
  }
  return err('Không tìm thấy tài khoản');
}

/**
 * handleAdminImportUsers — Import nhiều học sinh từ CSV data
 */
function handleAdminImportUsers(body) {
  requireTeacher(body);
  const { role, users } = body;
  if (!Array.isArray(users) || !users.length) return err('Không có dữ liệu');

  const sheetName = role === 'teacher' ? 'GiaoVien' : 'HocSinh';
  const sheet     = getSheet('TAIKHOAN', sheetName, true);

  // Ensure headers
  if (sheet.getLastRow() === 0) {
    if (role === 'student')
      sheet.appendRow(['mshs','password_hash','ho_ten','email','lop','ngay_sinh','active']);
    else
      sheet.appendRow(['username','password_hash','ho_ten','email','lop_phu_trach','role','active']);
    sheet.getRange(1,1,1,7).setFontWeight('bold').setBackground('#4472C4').setFontColor('white');
  }

  const vals   = sheet.getDataRange().getValues();
  const hdr    = vals[0];
  const keyCol = hdr.indexOf(role === 'student' ? 'mshs' : 'username');

  // Build existing ID set for dedup
  const existing = new Set();
  for (let i = 1; i < vals.length; i++) existing.add(String(vals[i][keyCol]||'').trim().toLowerCase());

  let imported = 0;
  const batchRows = [];
  for (const u of users) {
    const key = (role==='student' ? u.mshs : u.username)||'';
    if (!key || existing.has(key.toLowerCase())) continue; // skip duplicates
    const pw = u.mat_khau || u.password || key;
    if (role === 'student') {
      batchRows.push([key.trim(), hashPwd(pw), (u.ho_ten||'').trim(), u.email||'', (u.lop||'').trim(), u.ngay_sinh||'', true]);
    } else {
      batchRows.push([key.trim(), hashPwd(pw), (u.ho_ten||'').trim(), u.email||'', u.lop_phu_trach||'', u.role||'teacher', true]);
    }
    imported++;
  }

  if (batchRows.length > 0) {
    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, batchRows.length, batchRows[0].length).setValues(batchRows);
  }

  SCRIPT_CACHE.remove('users_' + role);
  return ok({ imported, total: users.length, skipped: users.length - imported });
}
