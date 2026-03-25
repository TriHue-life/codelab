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
      case 'submitScore':           return handleSubmitScore(body);
      case 'submitPracticeScore':   return handleSubmitPracticeScore(body);
      case 'saveExerciseContent':   return handleSaveExerciseContent(body);
      case 'uploadImage':           return handleUploadImage(body);
      case 'getImageConfig':        return handleGetImageConfig(body);
      case 'saveImageConfig':       return handleSaveImageConfig(body);
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
      // Admin management
      case 'adminSaveAdmin':     return handleAdminSaveAdmin(body);
      case 'adminDeleteAdmin':   return handleAdminDeleteAdmin(body);
      case 'saveAvatar':         return handleSaveAvatar(body);
      // DotKiemTra + Export
      case 'saveDotKiemTra':     return handleSaveDotKiemTra(body);
      case 'deleteDotKiemTra':   return handleDeleteDotKiemTra(body);
      case 'exportToSheets':     return handleExportToSheets(body);
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
      case 'getItemAnalysis':   return handleGetItemAnalysis(p);
      case 'getBaiLamForStudent': return handleGetBaiLamForStudent(p);
      case 'saveBaiTap':          return handleSaveBaiTap(body);
      case 'getExamMatrix':     return handleGetExamMatrix(p);
      case 'getDotKiemTra':   return handleGetDotKiemTra(p);
      case 'getScores':       return handleGetScores(p);
      case 'getChangelog':    return handleGetChangelog(p);
      case 'getStudentReport': return handleGetStudentReport(p);
      case 'getHistory':      return handleGetHistory(p);
      case 'getViolations':   return handleGetViolations(p);
      case 'getAccessLog':    return handleGetAccessLog(p);
      case 'getStudentList':    return handleGetStudentList(p);
      case 'getLichSuLop':      return handleGetLichSuLop(p);
      case 'getNamHocInfo':     return handleGetNamHocInfo(p);
      case 'yearTransition':    return handleYearTransition(body);
      case 'importStudents':    return handleImportStudents(body);
      case 'getMyProfile':     return handleGetMyProfile(p);
      case 'adminGetUsers':    return handleAdminGetUsers(p);
      case 'adminGetAdmins':   return handleAdminGetAdmins(p);
      case 'ping':             return ok({ ts: Date.now(), v: '2.0' });
      case 'verifyExamCode':   return handleVerifyExamCode(p);
      case 'getSetupStatus':  return handleGetSetupStatus(p);
      case 'health':          return HtmlService.createHtmlOutput('<ok/>')
                                .addMetaTag('viewport','width=device-width')
                                .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DENY);
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
  // ContentService không hỗ trợ custom headers (giới hạn của Apps Script)
  // X-Frame-Options được bảo vệ qua CSP frame-ancestors ở client
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
  const inp = (input || '').trim();
  // Case 1: stored == inp directly (stored = sha256(raw), input = sha256(raw))
  if (stored === inp) return true;
  // Case 2: stored = sha256(sha256(raw)) — legacy double-hash
  if (stored === hashPwd(inp)) return true;
  // Case 3: stored = plaintext, input = sha256(plaintext)
  if (hashPwd(stored) === inp) return true;
  return false;
}

// ═══════════════════════════════════════════════════════════════════
//  UTILITY — Chạy thủ công từ Apps Script Editor khi cần
// ═══════════════════════════════════════════════════════════════════
function resetAdminPassword() {
  const TARGET_USERNAME = 'admin';
  const NEW_PASSWORD    = 'Admin@2025';
  try {
    const sheet = getSheet('TAIKHOAN', 'Admin', false);
    if (!sheet) { Logger.log('❌ Không tìm thấy tab Admin'); return; }
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const pwCol   = headers.indexOf('password_hash');
    const userCol = headers.indexOf('username');
    if (pwCol < 0 || userCol < 0) { Logger.log('❌ Thiếu cột'); return; }
    const newHash = hashPwd(NEW_PASSWORD);
    let found = false;
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][userCol]).trim().toLowerCase() === TARGET_USERNAME.toLowerCase()) {
        sheet.getRange(i + 1, pwCol + 1).setValue(newHash);
        Logger.log('✅ Reset thành công: ' + TARGET_USERNAME + ' / ' + NEW_PASSWORD);
        found = true; break;
      }
    }
    if (!found) {
      const ADMIN_H = ['username','password_hash','ho_ten','email','avatar_url','role','active','created_at'];
      if (data.length <= 1) sheet.getRange(1,1,1,ADMIN_H.length).setValues([ADMIN_H]);
      sheet.appendRow(ADMIN_H.map(h=>({username:TARGET_USERNAME,password_hash:newHash,ho_ten:'Admin',email:'',avatar_url:'',role:'admin',active:true,created_at:new Date().toISOString()}[h]??'')));
      Logger.log('✅ Tạo admin mới: ' + TARGET_USERNAME + ' / ' + NEW_PASSWORD);
    }
  } catch(e) { Logger.log('❌ ' + e.message); }
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

  // Brute force protection: giới hạn 10 lần thử login/IP/phút
  const loginKey = 'login_' + String(username || mshs || 'anon').replace(/[^a-zA-Z0-9_]/g,'_').slice(0,30);
  const loginAttempts = parseInt(SCRIPT_CACHE.get(loginKey) || '0');
  if (loginAttempts >= 10) return err('Quá nhiều lần thử đăng nhập. Vui lòng đợi 1 phút.');
  SCRIPT_CACHE.put(loginKey, String(loginAttempts + 1), 60);

  // Input validation
  if (!role || !password) return err('Thiếu thông tin đăng nhập');
  if (password.length < 4 || password.length > 200) return err('Mật khẩu không hợp lệ');

  if (role === 'teacher') {
    const u = (username || '').trim().toLowerCase();
    if (!u || u.length > 50) return err('Tên đăng nhập không hợp lệ');
    // Kiểm tra bảng Admin trước
    const adminSheet = getSheet('TAIKHOAN', 'Admin');
    if (adminSheet) {
      const adminRows = sheetData(adminSheet);
      const foundAdmin = adminRows.find(r => String(r.username||'').toLowerCase()===u && r.active!==false && r.active!=='FALSE');
      if (foundAdmin) {
        if (!checkPwd(password||'', String(foundAdmin.password_hash||''))) return err('Sai mật khẩu');
        const token = createToken({ role:'admin', username:u, name:foundAdmin.ho_ten||u, email:foundAdmin.email||'', lop:'' });
        _logAccess(u, foundAdmin.ho_ten||u, '', 'admin', 'login', '');
        SCRIPT_CACHE.remove(loginKey); // reset attempt counter on success
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
    if (!m || !/^\d{9,12}$/.test(m)) return err('MSHS không hợp lệ (phải là 9-12 chữ số)');
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
  // newPwd đã được SHA256 ở client, chỉ cần kiểm tra độ dài hash (64 hex chars)
  if (!newPwd || newPwd.length < 6) return err('Mật khẩu mới phải có ít nhất 6 ký tự');

  // ✅ Hỗ trợ cả 3 role: admin, teacher, student
  const sheetName = sess.role === 'admin'   ? 'Admin'    :
                    sess.role === 'teacher'  ? 'GiaoVien' : 'HocSinh';
  const sheet = getSheet('TAIKHOAN', sheetName);
  if (!sheet) return err('Không tìm thấy sheet tài khoản');

  const vals = sheet.getDataRange().getValues();
  const headers = vals[0];
  // Admin và teacher dùng cột 'username', student dùng 'mshs'
  const keyCol = headers.indexOf(sess.role === 'student' ? 'mshs' : 'username');
  const pwdCol = headers.indexOf('password_hash');
  const key    = sess.role === 'student' ? sess.mshs : sess.username;

  if (keyCol < 0 || pwdCol < 0) return err('Cấu trúc sheet không hợp lệ');

  for (let i = 1; i < vals.length; i++) {
    if (String(vals[i][keyCol]).toLowerCase() !== String(key).toLowerCase()) continue;
    // oldPwd đã là SHA256 hash từ client — checkPwd so sánh với stored hash
    if (!checkPwd(oldPwd || '', String(vals[i][pwdCol]))) return err('Mật khẩu cũ không đúng');
    // ✅ newPwd đã là SHA256 hash từ client — lưu trực tiếp, KHÔNG hash lại
    sheet.getRange(i + 1, pwdCol + 1).setValue(newPwd.trim());
    return ok({ changed: true });
  }
  return err('Không tìm thấy tài khoản');
}

// ═══════════════════════════════════════════════════════════════════
//  EXERCISE DATA — BaiTap, LyThuyet, CodeMau, TieuChi, HuongDan
// ═══════════════════════════════════════════════════════════════════

// Headers cho từng tab
const ADMIN_H    = ['username','password_hash','ho_ten','email','avatar_url','role','active','created_at'];

// ── Năm học ───────────────────────────────────────────────────────
// S3: HocSinh thêm 3 cột: nam_nhap_hoc, lop_hien_tai, nam_hoc_ht
const HOCSINH_H  = ['mshs','password_hash','ho_ten','email','lop_hien_tai',
                     'ngay_sinh','active','avatar_url','nam_nhap_hoc','nam_hoc_ht'];
// S2: Lịch sử lớp theo từng năm (APPEND ONLY - không bao giờ xóa)
const LICHSULOP_H = ['id','mshs','ho_ten','nam_hoc','lop','ghi_chu','ts'];

// S5: Lấy năm học đang hoạt động từ PropertiesService
function getActiveNamHoc() {
  return PROP.getProperty('active_nam_hoc') || '2025-2026';
}
function setActiveNamHoc(namHoc) {
  PROP.setProperty('active_nam_hoc', namHoc);
}
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

  // Read NoiDung sheet for rich-editor overrides (desc/theory saved by teacher)
  const noidu        = sheetData(getSheet('BAITAP', 'NoiDung'));
  const descOverride = noidu.find(r => r.bai_id === bai_id && r.field === 'desc')?.html  || '';
  const theoryOvr    = noidu.find(r => r.bai_id === bai_id && r.field === 'theory')?.html || '';
  // LyThuyet sheet is canonical for theory; NoiDung override takes priority
  const lyThuyet = theoryOvr || lyth.find(r => r.bai_id === bai_id)?.noi_dung_html || '';

  const result = {
    ly_thuyet:     lyThuyet,
    desc_override: descOverride,
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
const EXAM_H   = ['id','ten','mo_ta','lop','lop_ids','thoi_gian_phut','ngay_thi','ngay_bat_dau','ngay_ket_thuc','gio_mo','gio_dong','trang_thai','tao_boi','tao_luc','sua_luc','che_do_tron_de','so_bai_random','bloom_filter','toan_ven_1_lan','cho_xem_dap_an','mat_khau','bat_buoc_fullscreen','so_lan_thi_max','groups'];
const BAITAPKT_H = ['ky_id','bai_id','thu_tu','nhom','group_id','diem_co_phan','bloom_level'];

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
    .map(e => _enrichExamWithDetails(e, bts))
    .filter(e => {
      if (sess.role === 'teacher') return true;
      if (e.trang_thai !== 'active') return false;
      // No class restriction → visible to all
      const hasLopIds = e.lop_ids && e.lop_ids !== '[]' && e.lop_ids !== '';
      const hasLop    = e.lop && e.lop.trim();
      if (!hasLopIds && !hasLop) return true;
      // New format: lop_ids JSON array
      if (hasLopIds) {
        try {
          const ids = typeof e.lop_ids === 'string' ? JSON.parse(e.lop_ids) : e.lop_ids;
          if (Array.isArray(ids) && ids.length) return ids.map(s=>String(s).trim()).includes(String(sess.lop));
        } catch {}
      }
      // Backward compat: lop comma-string
      if (hasLop) return e.lop.split(',').map(s=>s.trim()).includes(String(sess.lop));
      return false;
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

  // Normalize lop_ids: accept array or JSON string
  let lopIdsArr = [];
  if (Array.isArray(exam.lop_ids)) lopIdsArr = exam.lop_ids;
  else if (exam.lop_ids) try { lopIdsArr = JSON.parse(exam.lop_ids); } catch {}
  // Also keep lop string for backward compat
  const lopStr = lopIdsArr.length ? lopIdsArr.join(',') : (exam.lop||'');

  const examRow = {
    id,
    ten:                exam.ten||'',
    mo_ta:              exam.mo_ta||'',
    lop:                lopStr,
    lop_ids:            lopIdsArr.length ? JSON.stringify(lopIdsArr) : '',
    thoi_gian_phut:     exam.thoi_gian_phut||45,
    ngay_thi:           exam.ngay_bat_dau || exam.ngay_thi || '',
    ngay_bat_dau:       exam.ngay_bat_dau || exam.ngay_thi || '',
    ngay_ket_thuc:      exam.ngay_ket_thuc || '',
    gio_mo:             exam.gio_mo   || '07:00',
    gio_dong:           exam.gio_dong || '17:00',
    trang_thai:         exam.trang_thai || (isNew ? 'draft' : undefined),
    tao_boi:            isNew ? sess.name : (exam.tao_boi||sess.name),
    tao_luc:            isNew ? now : (exam.tao_luc||now),
    sua_luc:            now,
    che_do_tron_de:     exam.che_do_tron_de  || false,
    so_bai_random:      exam.so_bai_random   || 0,
    bloom_filter:       exam.bloom_filter    || '',
    toan_ven_1_lan:     exam.toan_ven_1_lan  || false,
    cho_xem_dap_an:     exam.cho_xem_dap_an  || false,
    mat_khau:           exam.mat_khau        || '',
    bat_buoc_fullscreen:exam.bat_buoc_fullscreen !== false,
    so_lan_thi_max:     parseInt(exam.so_lan_thi_max)||0,
    groups:             Array.isArray(exam.groups) && exam.groups.length
                          ? JSON.stringify(exam.groups.map(g => ({
                              id:           g.id,
                              name:         g.name||'Nhóm',
                              pick_count:   parseInt(g.pick_count)||1,
                              group_points: parseFloat(g.group_points)||0,
                              points_each:  parseFloat(g.points_each)||0,
                              question_ids: Array.isArray(g.question_ids) ? g.question_ids : [],
                            })))
                          : '',
  };
  // Remove undefined values (keep existing sheet values for optional-update fields)
  Object.keys(examRow).forEach(k => { if (examRow[k] === undefined) delete examRow[k]; });
  _upsertRow(dsSheet, 'id', id, examRow, EXAM_H);

  // Re-write BaiTapKT (flat list — backward compat for student-facing code)
  _deleteRowsWhere(btSheet, 'ky_id', id);
  const baiTapDetail = exam.bai_tap_detail || [];
  if (baiTapDetail.length) {
    baiTapDetail.forEach((b, idx) => {
      btSheet.appendRow(BAITAPKT_H.map(h => ({
        ky_id:        id,
        bai_id:       b.bai_id   || '',
        thu_tu:       b.thu_tu   || idx + 1,
        nhom:         b.nhom     || '',
        group_id:     b.group_id || '',
        diem_co_phan: parseFloat(b.diem_co_phan) || 1.0,
        bloom_level:  b.bloom_level || '',
      }[h] ?? '')));
    });
  } else {
    // Fallback: simple flat list
    (exam.bai_tap || []).forEach((bid, idx) =>
      btSheet.appendRow(BAITAPKT_H.map(h => ({ky_id:id, bai_id:bid, thu_tu:idx+1}[h]??'')))
    );
  }

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
const SCORE_H  = ['id','ts','mshs','ho_ten','lop','bai_id','tieu_de','diem','lan_thu','ky_kt_id','nam_hoc'];
const LSLAB_H  = ['id','ts','mshs','ho_ten','lop','bai_id','tieu_de','diem','thoi_gian_lam_giay','ky_kt_id','nam_hoc'];

// ══════════════════════════════════════════════════════════════════
//  UPLOAD ẢNH → GOOGLE DRIVE (Teacher/Admin)
// ══════════════════════════════════════════════════════════════════
// ── Lấy thư mục Drive cho upload ảnh (dùng ID nếu đã cấu hình)
function _getImageFolder() {
  const customId = PROP.getProperty('IMAGES_FOLDER_ID');
  if (customId) {
    try {
      return DriveApp.getFolderById(customId);
    } catch(e) {
      // ID không hợp lệ, fallback về tên
    }
  }
  // Fallback: tìm/tạo CodeLab/Images
  const codeLabs = DriveApp.getFoldersByName('CodeLab');
  const cl = codeLabs.hasNext() ? codeLabs.next() : DriveApp.createFolder('CodeLab');
  const imgFolders = cl.getFoldersByName('Images');
  return imgFolders.hasNext() ? imgFolders.next() : cl.createFolder('Images');
}

function handleUploadImage(body) {
  const session = verifyToken(body.token);
  if (session.error) return session;
  if (session.role !== 'teacher' && session.role !== 'admin') {
    return error('Không có quyền upload ảnh');
  }

  const { base64, filename, mimeType } = body;
  if (!base64) return error('Thiếu dữ liệu ảnh');

  try {
    const bytes  = Utilities.base64Decode(base64);
    const blob   = Utilities.newBlob(bytes, mimeType || 'image/png', filename || 'image.png');
    const folder = _getImageFolder();

    const file   = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const fileId = file.getId();
    const url    = `https://drive.google.com/uc?export=view&id=${fileId}`;
    const folderUrl = `https://drive.google.com/drive/folders/${folder.getId()}`;

    return ok({ url, fileId, filename: file.getName(), folderUrl });

  } catch(e) {
    return error('Upload thất bại: ' + e.message);
  }
}

// ══════════════════════════════════════════════════════════════════
//  CẤU HÌNH ẢNH — Admin đặt thư mục Drive lưu ảnh
// ══════════════════════════════════════════════════════════════════
function handleGetImageConfig(body) {
  const session = verifyToken(body.token);
  if (session.error) return session;
  if (session.role !== 'admin') return error('Chỉ Admin mới xem cấu hình ảnh');

  const folderId  = PROP.getProperty('IMAGES_FOLDER_ID') || '';
  let folderName  = '';
  let folderUrl   = '';
  let imageCount  = 0;

  if (folderId) {
    try {
      const folder = DriveApp.getFolderById(folderId);
      folderName  = folder.getName();
      folderUrl   = `https://drive.google.com/drive/folders/${folderId}`;
      imageCount  = folder.getFiles().hasNext() ? -1 : 0; // -1 = có file (lazy count)
    } catch(e) {
      folderName = '⚠️ ID không hợp lệ';
    }
  } else {
    // Mô tả thư mục mặc định
    folderName = 'CodeLab/Images (mặc định)';
  }

  return ok({ folderId, folderName, folderUrl });
}

function handleSaveImageConfig(body) {
  const session = verifyToken(body.token);
  if (session.error) return session;
  if (session.role !== 'admin') return error('Chỉ Admin mới thay đổi cấu hình ảnh');

  const { folder_id } = body;

  if (!folder_id || folder_id.trim() === '') {
    // Xóa cấu hình → dùng thư mục mặc định
    PROP.deleteProperty('IMAGES_FOLDER_ID');
    return ok({ saved: true, message: 'Đã đặt lại thư mục mặc định (CodeLab/Images)' });
  }

  // Kiểm tra ID có hợp lệ không
  try {
    const folder = DriveApp.getFolderById(folder_id.trim());
    PROP.setProperty('IMAGES_FOLDER_ID', folder_id.trim());
    return ok({
      saved:      true,
      folderName: folder.getName(),
      folderUrl:  `https://drive.google.com/drive/folders/${folder_id.trim()}`,
      message:    `Đã cấu hình thư mục: ${folder.getName()}`,
    });
  } catch(e) {
    return error('ID thư mục không hợp lệ hoặc không có quyền truy cập: ' + e.message);
  }
}

// ══════════════════════════════════════════════════════════════════
//  ĐIỂM LUYỆN TẬP — Ghi riêng vào sheet DiemLuyenTap
// ══════════════════════════════════════════════════════════════════
function handleSubmitPracticeScore(body) {
  const session = verifyToken(body.token);
  if (session.error) return session;

  const { bai_id, tieu_de, diem } = body;
  if (!bai_id || diem === undefined) return error('Thiếu thông tin điểm luyện tập');

  const sheet = getSheet('KETQUA', 'DiemLuyenTap', true);
  if (!sheet) return error('Không tìm thấy sheet DiemLuyenTap');

  const headers = ['id','ts','mshs','ho_ten','lop','bai_id','tieu_de','diem','lan_thu'];
  ensureHeaders(sheet, headers);

  const data = sheet.getDataRange().getValues();
  const hRow = data[0];
  const idCol  = hRow.indexOf('mshs');
  const baiCol = hRow.indexOf('bai_id');
  const lanCol = hRow.indexOf('lan_thu');
  const diemCol = hRow.indexOf('diem');

  // Tính số lần đã làm
  let lanThu = 1;
  let bestScore = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i][idCol] == session.mshs && data[i][baiCol] == bai_id) {
      lanThu++;
      bestScore = Math.max(bestScore, parseFloat(data[i][diemCol]) || 0);
    }
  }

  sheet.appendRow([
    Utilities.getUuid(),
    new Date().toISOString(),
    session.mshs,
    session.ho_ten || '',
    session.lop    || '',
    bai_id,
    tieu_de || '',
    diem,
    lanThu,
    getActiveNamHoc(),
  ]);

  return ok({
    saved: true,
    lan_thu: lanThu,
    best_score: Math.max(bestScore, parseFloat(diem) || 0),
  });
}

// ══════════════════════════════════════════════════════════════════
//  LƯU NỘI DUNG ĐỀ BÀI / LÝ THUYẾT (Teacher/Admin)
// ══════════════════════════════════════════════════════════════════
function handleSaveExerciseContent(body) {
  const session = verifyToken(body.token);
  if (session.error) return session;
  if (session.role !== 'teacher' && session.role !== 'admin') {
    return error('Không có quyền chỉnh sửa nội dung');
  }

  const { bai_id, field, html } = body;
  if (!bai_id || !field || !['desc', 'theory', 'code_rich'].includes(field)) {
    return error('Tham số không hợp lệ');
  }
  if (!html && html !== '') return error('Thiếu nội dung');

  const sheet = getSheet('BAITAP', 'NoiDung', true);
  if (!sheet) return error('Không tìm thấy sheet NoiDung');

  const headers = ['bai_id', 'field', 'html', 'updated_by', 'updated_at'];
  ensureHeaders(sheet, headers);

  const data = sheet.getDataRange().getValues();
  const hRow   = data[0];
  const idCol  = hRow.indexOf('bai_id');
  const fldCol = hRow.indexOf('field');
  const htmlCol = hRow.indexOf('html');
  const byCol  = hRow.indexOf('updated_by');
  const atCol  = hRow.indexOf('updated_at');

  // Upsert
  let found = false;
  for (let i = 1; i < data.length; i++) {
    if (data[i][idCol] == bai_id && data[i][fldCol] == field) {
      sheet.getRange(i + 1, htmlCol + 1).setValue(html);
      sheet.getRange(i + 1, byCol  + 1).setValue(session.ho_ten || session.mshs);
      sheet.getRange(i + 1, atCol  + 1).setValue(new Date().toISOString());
      found = true;
      break;
    }
  }

  if (!found) {
    sheet.appendRow([bai_id, field, html, session.ho_ten || session.mshs, new Date().toISOString()]);
  }

  // ALSO update LyThuyet sheet (source of truth for theory content)
  if (field === 'theory') {
    const lySheet = getSheet('BAITAP', 'LyThuyet', true);
    if (lySheet) {
      const lyData    = lySheet.getDataRange().getValues();
      const lyH       = lyData[0] || ['bai_id','noi_dung_html','updated_at'];
      const lyIdCol   = lyH.indexOf('bai_id');
      const lyHtmlCol = lyH.indexOf('noi_dung_html');
      const lyAtCol   = lyH.indexOf('updated_at');
      let lyFound = false;
      for (let i = 1; i < lyData.length; i++) {
        if (String(lyData[i][lyIdCol]) === bai_id) {
          lySheet.getRange(i+1, lyHtmlCol+1).setValue(html);
          if (lyAtCol >= 0) lySheet.getRange(i+1, lyAtCol+1).setValue(new Date().toISOString());
          lyFound = true; break;
        }
      }
      if (!lyFound) lySheet.appendRow([bai_id, html, new Date().toISOString()]);
    }
  }

  // Invalidate all related caches
  const sc = CacheService.getScriptCache();
  sc.remove('content_' + bai_id + '_' + field);
  sc.remove('ex_' + bai_id);
  sc.remove('exercises_list');

  return ok({ saved: true, bai_id, field });
}

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
  ensureTab('TAIKHOAN', 'HocSinh',  HOCSINH_H);
  ensureTab('TAIKHOAN', 'LichSuLop', LICHSULOP_H);
  ensureTab('BAITAP',   'BaiTap',   BAITAP_H);
  ensureTab('BAITAP',   'LyThuyet', LYTH_H);
  ensureTab('BAITAP',   'CodeMau',  CODEMAU_H);
  ensureTab('BAITAP',   'TieuChi',  TIEUCHI_H);
  ensureTab('BAITAP',   'HuongDan', HUONGDAN_H);
  ensureTab('KIEMTRA',  'DanhSach', EXAM_H);       // now includes groups, lop_ids, new date fields
  ensureTab('KIEMTRA',  'BaiTapKT', BAITAPKT_H);  // now includes group_id
  ensureTab('KETQUA',   'BangDiem',  SCORE_H);
  ensureTab('KETQUA',   'DiemLuyenTap', ['id','ts','mshs','ho_ten','lop','bai_id','tieu_de','diem','lan_thu']);
  ensureTab('BAITAP',   'NoiDung',   ['bai_id','field','html','updated_by','updated_at']);
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
// ══════════════════════════════════════════════════════════════════
//  ITEM ANALYSIS — Phân tích câu hỏi sau kỳ thi (Phase 2)
// ══════════════════════════════════════════════════════════════════

/**
 * handleGetItemAnalysis
 * Tính p, D, r, Cronbach alpha cho 1 kỳ thi
 * Params: { token, ky_id }
 */
/**
 * handleGetBaiLamForStudent — Lấy điểm từng câu của 1 học sinh
 * Dùng cho analytics NL profile (kết hợp với LichSuLam practice)
 */
/**
 * handleSaveBaiTap — Lưu bài tập từ AI Generator vào BaiTap sheet
 */
function handleSaveBaiTap(body) {
  requireTeacher(body);
  const { id, lop, bo_sach, chuong, muc_bloom, so_bai, tieu_de, type, nguon } = body;
  if (!id || !tieu_de) return error('Thiếu id hoặc tieu_de');

  const sheet = getSheet('BAITAP', 'BaiTap', true);
  _ensureHeaders(sheet, BAITAP_H);
  _upsertRow(sheet, 'id', id, {
    id, lop: lop||'', bo_sach: bo_sach||'KNTT',
    chuong: chuong||'', muc_bloom: muc_bloom||'',
    so_bai: so_bai||'', tieu_de: tieu_de||'',
    mo_ta: (nguon||'') + ' | AI Generated', type: type||'python',
    updated_at: nowISO(),
  }, BAITAP_H);
  return ok({ saved: true, id });
}

function handleGetBaiLamForStudent(p) {
  requireTeacher(p);
  const { mshs, ky_id } = p;
  const sheet = getSheet('KETQUA', 'BaiLam', false);
  if (!sheet) return ok([]);
  let rows = sheetData(sheet);
  if (mshs)  rows = rows.filter(r => r.mshs === mshs);
  if (ky_id) rows = rows.filter(r => r.ky_id === ky_id);
  // Return with essential fields only (avoid payload size issue)
  return ok(rows.map(r => ({
    mshs:    r.mshs,
    bai_id:  r.bai_id,
    ky_id:   r.ky_id,
    diem:    r.diem,
    da_nop:  r.da_nop,
    ts:      r.ts,
    lop:     r.lop,
    nam_hoc: r.nam_hoc || '',
  })));
}

/**
 * handleGetStudentReport — Báo cáo công khai cho phụ huynh
 * Không cần đăng nhập, chỉ cần biết MSHS (mã số học sinh)
 * Trả về điểm tổng hợp (không gồm code, không gồm vi phạm)
 */
function handleGetStudentReport(p) {
  const mshs = (p.mshs || '').trim();
  if (!mshs || mshs.length < 5) return error('MSHS không hợp lệ');

  // Rate limit per MSHS: 20 lần/giờ
  const limKey = 'rpt_' + mshs;
  const limVal = parseInt(PROP.getProperty(limKey)||'0');
  if (limVal > 20) return error('Vui lòng thử lại sau 1 giờ');
  PROP.setProperty(limKey, String(limVal+1));

  // Get student basic info
  const hsSheet = getSheet('TAIKHOAN', 'HocSinh', false);
  if (!hsSheet) return error('Không tìm thấy dữ liệu');
  const hsRows = sheetData(hsSheet);
  const stu    = hsRows.find(r => String(r.mshs).trim() === mshs);
  if (!stu) return error('Không tìm thấy học sinh với MSHS: ' + mshs);

  // BaiKT: exam results
  const baiKTSheet = getSheet('KETQUA', 'BaiKT', false);
  const baiKTs = baiKTSheet
    ? sheetData(baiKTSheet).filter(r => r.mshs === mshs).map(r => ({
        ky_id: r.ky_id, ten_ky: r.ten_ky,
        diem: r.diem_tong, so_bai: r.so_bai,
        da_hoan_thanh: r.da_hoan_thanh,
        ts: r.ts, nam_hoc: r.nam_hoc||'',
      }))
    : [];

  // DiemLuyenTap: practice summary
  const dltSheet = getSheet('KETQUA', 'DiemLuyenTap', false);
  let practiceAvg = null, practiceCount = 0;
  if (dltSheet) {
    const dlts = sheetData(dltSheet).filter(r => r.mshs === mshs);
    practiceCount = dlts.length;
    if (dlts.length) {
      practiceAvg = Math.round(
        dlts.reduce((s,r)=>s+(parseFloat(r.diem)||0),0)/dlts.length*100)/100;
    }
  }

  // Compute stats
  const examScores = baiKTs.map(k=>parseFloat(k.diem)||0);
  const examAvg = examScores.length
    ? Math.round(examScores.reduce((a,b)=>a+b,0)/examScores.length*100)/100 : null;

  return ok({
    student: {
      ho_ten: stu.ho_ten, lop: stu.lop_hien_tai || stu.lop,
      nam_hoc: stu.nam_hoc_ht || '', avatar: stu.avatar_url || '',
    },
    exams:        baiKTs,
    exam_avg:     examAvg,
    practice_avg: practiceAvg,
    practice_count: practiceCount,
    generated_at: nowISO(),
  });
}

function handleGetItemAnalysis(p) {
  requireTeacher(p);
  const kyId = p.ky_id;
  if (!kyId) return error('Thiếu ky_id');

  // Lấy tất cả BaiLam của kỳ thi này
  const baiLamSheet = getSheet('KETQUA', 'BaiLam', false);
  if (!baiLamSheet) return ok({ items: [], stats: {}, alpha: null });

  const allBaiLam = sheetData(baiLamSheet).filter(r => r.ky_id === kyId);
  if (!allBaiLam.length) return ok({ items: [], stats: {}, alpha: null });

  // Lấy danh sách BaiKT (điểm tổng từng HS) để tính nhóm giỏi/yếu
  const baiKTSheet = getSheet('KETQUA', 'BaiKT', false);
  const allBaiKT   = baiKTSheet ? sheetData(baiKTSheet).filter(r => r.ky_id === kyId) : [];

  // Build student total score map
  const studentTotalMap = {};
  for (const kt of allBaiKT) {
    studentTotalMap[kt.mshs] = parseFloat(kt.diem_tong) || 0;
  }

  // Group BaiLam by bai_id
  const byQuestion = {};
  for (const bl of allBaiLam) {
    if (!bl.bai_id || !bl.da_nop) continue;
    if (!byQuestion[bl.bai_id]) byQuestion[bl.bai_id] = [];
    byQuestion[bl.bai_id].push({
      mshs:  bl.mshs,
      diem:  parseFloat(bl.diem) || 0,
      total: studentTotalMap[bl.mshs] || 0,
    });
  }

  const n = Object.keys(studentTotalMap).length || 1;
  const items = [];

  for (const [baiId, scores] of Object.entries(byQuestion)) {
    if (scores.length < 2) continue;

    const rawScores = scores.map(s => s.diem);

    // p = tỉ lệ đúng (diem >= 5/10)
    const passed = rawScores.filter(d => d >= 5).length;
    const p = passed / rawScores.length;

    // Mean & SD của câu
    const mean = rawScores.reduce((a,b)=>a+b,0) / rawScores.length;
    const variance = rawScores.reduce((a,b)=>a+(b-mean)**2,0) / rawScores.length;
    const sd = Math.sqrt(variance);

    // D = p(giỏi) - p(yếu): chia 2 nhóm 27% trên và 27% dưới
    const sortedByTotal = [...scores].sort((a,b) => b.total - a.total);
    const n27 = Math.max(1, Math.floor(sortedByTotal.length * 0.27));
    const topGroup  = sortedByTotal.slice(0, n27).map(s => s.diem);
    const botGroup  = sortedByTotal.slice(-n27).map(s => s.diem);
    const pTop = topGroup.filter(d => d >= 5).length / topGroup.length;
    const pBot = botGroup.filter(d => d >= 5).length / botGroup.length;
    const D = pTop - pBot;

    // r = tương quan điểm câu / điểm tổng (Pearson)
    const totals   = scores.map(s => s.total);
    const meanQ    = mean;
    const meanT    = totals.reduce((a,b)=>a+b,0) / totals.length;
    const sdT      = Math.sqrt(totals.reduce((a,b)=>a+(b-meanT)**2,0)/totals.length);
    let r = 0;
    if (sd > 0 && sdT > 0) {
      const cov = scores.reduce((a,s)=>a+(s.diem-meanQ)*(s.total-meanT),0)/scores.length;
      r = cov / (sd * sdT);
    }

    // Đánh giá tự động
    const eval_p = p < 0.3 ? '⚠️ Quá khó' : p > 0.8 ? '⚠️ Quá dễ' : '✅ Tốt';
    const eval_D = D < 0.2 ? '⚠️ Kém phân biệt' : D < 0.3 ? '⚡ TB' : '✅ Tốt';
    const eval_r = r < 0.2 ? '⚠️ Tương quan yếu' : r < 0.3 ? '⚡ TB' : '✅ Tốt';

    items.push({
      bai_id: baiId,
      n:      rawScores.length,
      mean:   Math.round(mean * 100) / 100,
      sd:     Math.round(sd * 100) / 100,
      p:      Math.round(p * 100) / 100,
      D:      Math.round(D * 100) / 100,
      r:      Math.round(r * 100) / 100,
      eval_p, eval_D, eval_r,
      good:   eval_p === '✅ Tốt' && eval_D !== '⚠️ Kém phân biệt',
    });
  }

  // ── Test-level stats ──────────────────────────────────────────
  const allTotals = Object.values(studentTotalMap);
  const tMean  = allTotals.reduce((a,b)=>a+b,0)/allTotals.length;
  const tSD    = Math.sqrt(allTotals.reduce((a,b)=>a+(b-tMean)**2,0)/allTotals.length);
  const tMin   = Math.min(...allTotals);
  const tMax   = Math.max(...allTotals);
  const sorted = [...allTotals].sort((a,b)=>a-b);
  const tMedian = sorted[Math.floor(sorted.length/2)];
  const passCount = allTotals.filter(d => d >= 5).length;

  // Histogram (9 khoảng: 0-1,1-2,...,8-9,9-10)
  const histogram = Array(10).fill(0);
  for (const d of allTotals) histogram[Math.min(9, Math.floor(d))]++;

  // Cronbach Alpha = (k/(k-1)) * (1 - ΣVar_i / Var_total)
  const k = items.length;
  let alpha = null;
  if (k >= 2 && tSD > 0) {
    const sumVarItems = items.reduce((a,it) => a + it.sd * it.sd, 0);
    const varTotal    = tSD * tSD;
    alpha = Math.round((k/(k-1)) * (1 - sumVarItems/varTotal) * 100) / 100;
    // Cap at reasonable range
    alpha = Math.max(-1, Math.min(1, alpha));
  }

  const alphaEval = alpha === null ? '' :
    alpha >= 0.9 ? '✅ Xuất sắc' :
    alpha >= 0.7 ? '✅ Tốt' :
    alpha >= 0.6 ? '⚡ Chấp nhận được' : '⚠️ Cần cải thiện';

  return ok({
    ky_id:    kyId,
    n_students: allTotals.length,
    items,
    stats: {
      mean: Math.round(tMean*100)/100, sd: Math.round(tSD*100)/100,
      median: tMedian, min: tMin, max: tMax,
      pass_rate: allTotals.length ? Math.round(passCount/allTotals.length*100) : 0,
      histogram,
    },
    alpha, alpha_eval: alphaEval,
  });
}

/**
 * handleGetExamMatrix — Ma trận đề 2 chiều (Chủ đề × Bloom TT26)
 * Params: { token, ky_id }
 */
function handleGetExamMatrix(p) {
  requireTeacher(p);
  const kyId = p.ky_id;
  if (!kyId) return error('Thiếu ky_id');

  const btSheet = getSheet('KIEMTRA', 'BaiTapKT', false);
  if (!btSheet) return ok({ matrix: {}, rows: [], cols: [] });

  const questions = sheetData(btSheet).filter(r => r.ky_id === kyId);
  if (!questions.length) return ok({ matrix: {}, rows: [], cols: [] });

  const BLOOM_TT26 = {
    'b1':'Nhận biết','b2':'Thông hiểu','b3':'Thông hiểu',
    'b4':'Vận dụng', 'b5':'Vận dụng cao','b6':'Vận dụng cao',
  };
  const COLS_ORDER = ['Nhận biết','Thông hiểu','Vận dụng','Vận dụng cao'];

  const matrix = {};  // { chu_de: { nhom_bloom: [bai_ids] } }
  const rows   = new Set();

  for (const q of questions) {
    const bloomLevel = (q.bloom_level || 'b3').toLowerCase();
    const nhomBloom  = BLOOM_TT26[bloomLevel] || 'Vận dụng';
    const chuDe      = q.nhom || q.bai_id.split('-')[1] || 'Chủ đề khác';

    rows.add(chuDe);
    if (!matrix[chuDe]) matrix[chuDe] = {};
    if (!matrix[chuDe][nhomBloom]) matrix[chuDe][nhomBloom] = [];
    matrix[chuDe][nhomBloom].push({
      bai_id: q.bai_id,
      pts:    parseFloat(q.diem_co_phan) || 1,
    });
  }

  // Tính tổng điểm mỗi cột
  const colTotals = {};
  const totalPts  = questions.reduce((a,q) => a+(parseFloat(q.diem_co_phan)||1),0);
  for (const col of COLS_ORDER) {
    let pts = 0;
    for (const row of matrix) {
      pts += (matrix[row]?.[col] || []).reduce((a,b)=>a+b.pts,0);
    }
    colTotals[col] = Math.round(pts/totalPts*100);
  }

  return ok({
    ky_id:     kyId,
    matrix,
    rows:      [...rows],
    cols:      COLS_ORDER,
    col_pct:   colTotals,
    total_pts: totalPts,
  });
}

// ══════════════════════════════════════════════════════════════════
//  CHUYỂN NĂM HỌC — Admin chạy 1 lần đầu năm học mới
// ══════════════════════════════════════════════════════════════════

/**
 * handleYearTransition — Chuyển sang năm học mới
 * 1. Tạo file KetQua, KiemTra, NhatKy mới cho năm học mới
 * 2. Cập nhật lop_hien_tai + nam_hoc_ht cho học sinh theo CSV
 * 3. Ghi LichSuLop cho mỗi học sinh
 * 4. Đánh dấu học sinh tốt nghiệp (K12 năm cũ) → active = false
 * 5. Cập nhật PROP active_nam_hoc
 *
 * Body: { token, nam_hoc_moi, ds_hoc_sinh: [{mshs, lop_moi}], ...}
 */
function handleYearTransition(body) {
  requireAdmin(body);
  const { nam_hoc_moi, ds_hoc_sinh, nam_hoc_cu, preview_only } = body;

  if (!nam_hoc_moi || !/^\d{4}-\d{4}$/.test(nam_hoc_moi)) {
    return error('Định dạng năm học không hợp lệ. Dùng: YYYY-YYYY (VD: 2026-2027)');
  }

  const preview = [];
  const errors  = [];

  // ── Validate học sinh list ──────────────────────────────────
  const hsSheet = getSheet('TAIKHOAN', 'HocSinh', false);
  if (!hsSheet) return error('Không tìm thấy sheet HocSinh');

  const hsData = hsSheet.getDataRange().getValues();
  const hsHdr  = hsData[0];
  const mshsCol     = hsHdr.indexOf('mshs');
  const lopHtCol    = hsHdr.indexOf('lop_hien_tai');
  const namHocHtCol = hsHdr.indexOf('nam_hoc_ht');
  const activeCol   = hsHdr.indexOf('active');
  const namNhapCol  = hsHdr.indexOf('nam_nhap_hoc');

  // Thêm cột mới nếu chưa có
  function _ensureCol(sheet, hdrRow, colName, defaultVal) {
    const idx = hdrRow.indexOf(colName);
    if (idx >= 0) return idx;
    const newIdx = hdrRow.length;
    sheet.getRange(1, newIdx + 1).setValue(colName);
    return newIdx;
  }

  // Map mshs → row index (1-based)
  const mshs2row = {};
  for (let i = 1; i < hsData.length; i++) {
    mshs2row[String(hsData[i][mshsCol] || '').trim()] = i + 1;
  }

  // ── Chuẩn bị LichSuLop sheet ───────────────────────────────
  const lichSuSheet = getSheet('TAIKHOAN', 'LichSuLop', true);
  _ensureHeaders(lichSuSheet, LICHSULOP_H);

  if (preview_only) {
    // Chỉ kiểm tra, không thực sự thay đổi
    const missing = (ds_hoc_sinh || []).filter(s => !mshs2row[s.mshs]);
    return ok({
      preview: true,
      total:   (ds_hoc_sinh || []).length,
      found:   (ds_hoc_sinh || []).length - missing.length,
      missing: missing.map(s => s.mshs),
      nam_hoc_moi,
    });
  }

  // ── Thực hiện chuyển năm ────────────────────────────────────
  const dsHocSinh = ds_hoc_sinh || [];
  let updated = 0, inserted = 0, deactivated = 0;

  // 1. Cập nhật lop_hien_tai, nam_hoc_ht cho học sinh được cung cấp
  for (const hs of dsHocSinh) {
    const mshs = String(hs.mshs || '').trim();
    const lopMoi = String(hs.lop_moi || '').trim();
    if (!mshs || !lopMoi) continue;

    const rowNum = mshs2row[mshs];
    if (!rowNum) {
      errors.push(`MSHS ${mshs} không tìm thấy — bỏ qua`);
      continue;
    }

    // Update lop_hien_tai (nếu cột tồn tại)
    if (lopHtCol >= 0)    hsSheet.getRange(rowNum, lopHtCol + 1).setValue(lopMoi);
    if (namHocHtCol >= 0) hsSheet.getRange(rowNum, namHocHtCol + 1).setValue(nam_hoc_moi);
    updated++;

    // 2. Ghi vào LichSuLop
    const tenHS = String(hsData[rowNum - 1]?.[hsHdr.indexOf('ho_ten')] || '');
    lichSuSheet.appendRow(LICHSULOP_H.map(h => ({
      id:       uuidv4(),
      mshs:     mshs,
      ho_ten:   tenHS,
      nam_hoc:  nam_hoc_moi,
      lop:      lopMoi,
      ghi_chu:  hs.ghi_chu || '',
      ts:       nowISO(),
    }[h] ?? '')));
    inserted++;
  }

  // 3. Đánh dấu học sinh không có trong danh sách mới → inactive
  //    (tốt nghiệp hoặc chuyển trường)
  if (dsHocSinh.length > 0) {
    const mshsInList = new Set(dsHocSinh.map(s => String(s.mshs).trim()));
    for (let i = 1; i < hsData.length; i++) {
      const mshs = String(hsData[i][mshsCol] || '').trim();
      if (!mshs) continue;
      const isActive = hsData[i][activeCol];
      if (isActive !== false && isActive !== 'FALSE' && !mshsInList.has(mshs)) {
        if (activeCol >= 0) {
          hsSheet.getRange(i + 1, activeCol + 1).setValue(false);
          deactivated++;
        }
      }
    }
  }

  // 4. Cập nhật active_nam_hoc
  setActiveNamHoc(nam_hoc_moi);
  PROP.setProperty('nam_hoc_cu', nam_hoc_cu || getActiveNamHoc());

  // 5. Invalidate cache
  SCRIPT_CACHE.remove('students_all');
  SCRIPT_CACHE.remove('nam_hoc_active');

  return ok({
    success:     true,
    nam_hoc_moi,
    updated,
    inserted_lichsu: inserted,
    deactivated,
    errors,
  });
}

/**
 * handleImportStudents — Import danh sách học sinh từ CSV
 * Hỗ trợ: thêm mới + cập nhật lớp nếu đã tồn tại
 */
function handleImportStudents(body) {
  requireAdmin(body);
  const { rows, nam_hoc, reset_password } = body;
  if (!Array.isArray(rows) || !rows.length) return error('Không có dữ liệu');

  const sheet  = getSheet('TAIKHOAN', 'HocSinh', true);
  _ensureHeaders(sheet, HOCSINH_H);
  const vals   = sheet.getDataRange().getValues();
  const hdr    = vals[0];
  const mshsCol = hdr.indexOf('mshs');
  const namHoc  = nam_hoc || getActiveNamHoc();

  let inserted = 0, updated = 0, skipped = 0;
  const errors = [];

  // Build existing map
  const existing = {};
  for (let i = 1; i < vals.length; i++) {
    existing[String(vals[i][mshsCol] || '').trim()] = i + 1;
  }

  for (const row of rows) {
    const mshs   = String(row.mshs || '').trim();
    const hoTen  = String(row.ho_ten || row.ten || '').trim();
    const lop    = String(row.lop || '').trim();
    const email  = String(row.email || '').trim();
    const ngaySinh = String(row.ngay_sinh || '').trim();

    if (!mshs || !hoTen || !lop) {
      errors.push(`Bỏ qua dòng thiếu mshs/ho_ten/lop: ${JSON.stringify(row)}`);
      skipped++;
      continue;
    }

    const pw = reset_password ? hashPwd(mshs) : null;
    const obj = {
      mshs, ho_ten: hoTen, lop_hien_tai: lop,
      email: email || '',
      ngay_sinh: ngaySinh,
      active: true,
      nam_nhap_hoc: row.nam_nhap_hoc || namHoc,
      nam_hoc_ht: namHoc,
      password_hash: pw || '',
      avatar_url: '',
    };

    if (existing[mshs]) {
      // Update lop + nam_hoc_ht
      const rowNum = existing[mshs];
      HOCSINH_H.forEach((h, idx) => {
        if (h === 'password_hash' && !pw) return; // keep existing pw
        if (obj[h] !== undefined)
          sheet.getRange(rowNum, idx + 1).setValue(obj[h]);
      });
      updated++;
    } else {
      // Insert new student (default pw = mshs)
      if (!pw) obj.password_hash = hashPwd(mshs);
      sheet.appendRow(HOCSINH_H.map(h => obj[h] ?? ''));
      inserted++;
    }
  }

  SCRIPT_CACHE.remove('students_all');
  return ok({ inserted, updated, skipped, errors, nam_hoc: namHoc });
}

/**
 * handleGetLichSuLop — Lấy lịch sử lớp của học sinh
 */
function handleGetLichSuLop(body) {
  requireTeacher(body);
  const { mshs } = body;
  const sheet = getSheet('TAIKHOAN', 'LichSuLop', false);
  if (!sheet) return ok([]);
  const rows = sheetData(sheet);
  return ok(mshs ? rows.filter(r => r.mshs === mshs) : rows);
}

/**
 * handleGetNamHocInfo — Lấy thông tin năm học đang active
 */
function handleGetNamHocInfo(body) {
  requireTeacher(body);
  return ok({
    active:   getActiveNamHoc(),
    previous: PROP.getProperty('nam_hoc_cu') || '',
    list:     (PROP.getProperty('nam_hoc_list') || getActiveNamHoc()).split(','),
  });
}

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
                    'diem','code_snap','tg_lam_giay','lan_thu','type','da_nop','nam_hoc'];
const BAIKT_H    = ['id','ts','mshs','ho_ten','lop','ky_id','ten_ky',
                    'diem_tong','so_bai','da_hoan_thanh','tg_tong_giay','nam_hoc'];
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
    nam_hoc: getActiveNamHoc(),
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

  // Parse lop_ids
  let lopIds = [];
  if (exam.lop_ids) {
    try { lopIds = JSON.parse(exam.lop_ids); } catch {}
  }
  if (!lopIds.length && exam.lop) lopIds = exam.lop.split(',').map(s=>s.trim()).filter(Boolean);

  // Parse groups — source of truth for new exams
  let groups = null;
  if (exam.groups) {
    try {
      const parsed = typeof exam.groups === 'string' ? JSON.parse(exam.groups) : exam.groups;
      if (Array.isArray(parsed) && parsed.length) groups = parsed;
    } catch {}
  }
  // Migration: exam saved without groups → synthesize from bai_tap_detail
  if (!groups && myBts.length) {
    // Group by nhom name
    const byNhom = {};
    myBts.forEach(b => {
      const key = b.nhom || 'Nhóm câu hỏi';
      if (!byNhom[key]) byNhom[key] = [];
      byNhom[key].push(b);
    });
    groups = Object.entries(byNhom).map(([name, bts], i) => ({
      id:           'grp_migrated_' + i,
      name,
      pick_count:   bts.length,
      group_points: bts.reduce((s,b) => s + (parseFloat(b.diem_co_phan)||1), 0),
      points_each:  parseFloat(bts[0]?.diem_co_phan) || 1.0,
      question_ids: bts.map(b => b.bai_id),
    }));
  }

  return {
    ...exam,
    lop_ids:         lopIds,
    che_do_tron_de:  exam.che_do_tron_de  === true || exam.che_do_tron_de  === 'TRUE',
    toan_ven_1_lan:  exam.toan_ven_1_lan  === true || exam.toan_ven_1_lan  === 'TRUE',
    cho_xem_dap_an:  exam.cho_xem_dap_an  === true || exam.cho_xem_dap_an  === 'TRUE',
    bat_buoc_fullscreen: exam.bat_buoc_fullscreen === true || exam.bat_buoc_fullscreen === 'TRUE',
    so_bai_random:   parseInt(exam.so_bai_random)  || 0,
    so_lan_thi_max:  parseInt(exam.so_lan_thi_max) || 0,
    bloom_filter:    bloomFilter,
    groups,
    // Flat list (backward compat for student-facing code)
    bai_tap: myBts.map(b => b.bai_id),
    bai_tap_detail: myBts.map(b => ({
      bai_id:       b.bai_id,
      nhom:         b.nhom     || '',
      group_id:     b.group_id || '',
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
  const { username, ho_ten, email, is_new, password, password_hash, role } = body;
  if (!username) return err('Thiếu username');
  if (!ho_ten)   return err('Thiếu họ tên');

  // Resolve: client may send pre-hashed password_hash OR raw password
  function _resolveAdminHash(ph, pw, fallback) {
    if (ph) return ph;
    if (pw) return hashPwd(pw);
    return fallback ? hashPwd(fallback) : null;
  }

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
    const storedHash = _resolveAdminHash(password_hash, password, 'thuthiem@2025');
    const row = ADMIN_H.map(h => ({
      username: username.trim(), password_hash: storedHash,
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
        const newHash = password_hash || (password ? hashPwd(password) : null);
        if (newHash) {
          const pwCol = hdr.indexOf('password_hash');
          if (pwCol >= 0) sheet.getRange(row, pwCol+1).setValue(newHash);
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
  const { role, is_new, password, password_hash } = body;
  function _resolveHash(ph, pw, fallback) {
    if (ph) return ph;
    if (pw) return hashPwd(pw);
    return fallback ? hashPwd(fallback) : null;
  }
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
      const storedHash = _resolveHash(password_hash, password, mshs);
      sheet.appendRow([mshs.trim(), storedHash, ho_ten.trim(), email||'', lop.trim(), ngay_sinh||'', true]);
    } else {
      // Update existing — support changing MSHS (Admin only)
      const { ngay_sinh, active, password, old_mshs } = body;
      const lookupMshs = old_mshs || mshs;  // use old_mshs if ID was changed
      const mshs_col   = hdr.indexOf('mshs');
      const name_col   = hdr.indexOf('ho_ten');
      const lop_col    = hdr.indexOf('lop');
      const mail_col   = hdr.indexOf('email');
      const dob_col    = hdr.indexOf('ngay_sinh');
      const active_col = hdr.indexOf('active');
      const pw_col     = hdr.indexOf('password_hash');
      let found = false;
      for (let i = 1; i < vals.length; i++) {
        if (String(vals[i][mshs_col]||'').trim() !== String(lookupMshs).trim()) continue;
        found = true;
        if (mshs_col   >= 0) sheet.getRange(i+1, mshs_col+1).setValue(mshs.trim());  // Update ID
        if (name_col   >= 0) sheet.getRange(i+1, name_col+1).setValue(ho_ten.trim());
        if (lop_col    >= 0) sheet.getRange(i+1, lop_col+1).setValue(lop.trim());
        if (mail_col   >= 0) sheet.getRange(i+1, mail_col+1).setValue(email||'');
        if (dob_col    >= 0 && ngay_sinh !== undefined) sheet.getRange(i+1, dob_col+1).setValue(ngay_sinh||'');
        if (active_col >= 0 && active    !== undefined) sheet.getRange(i+1, active_col+1).setValue(active === true || active === 'true');
        const updHash = _resolveHash(body.password_hash, password, null);
        if (pw_col >= 0 && updHash) sheet.getRange(i+1, pw_col+1).setValue(updHash);
        break;
      }
      if (!found) return err('Không tìm thấy học sinh: ' + lookupMshs);
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
      const storedHash = _resolveHash(password_hash, password, username);
      sheet.appendRow([username.trim(), storedHash, ho_ten.trim(), email||'', lop_phu_trach||'', user_role||'teacher', true]);
    } else {
      const { active, password, old_username } = body;
      const lookupUser = old_username || username;
      const u_col      = hdr.indexOf('username');
      const name_col   = hdr.indexOf('ho_ten');
      const mail_col   = hdr.indexOf('email');
      const lop_col    = hdr.indexOf('lop_phu_trach');
      const role_col   = hdr.indexOf('role');
      const active_col = hdr.indexOf('active');
      const pw_col     = hdr.indexOf('password_hash');
      let foundGv = false;
      for (let i = 1; i < vals.length; i++) {
        if (String(vals[i][u_col]||'').toLowerCase() !== String(lookupUser).toLowerCase()) continue;
        foundGv = true;
        if (u_col >= 0) sheet.getRange(i+1, u_col+1).setValue(username.trim());  // Update username
        if (name_col   >= 0) sheet.getRange(i+1, name_col+1).setValue(ho_ten.trim());
        if (mail_col   >= 0) sheet.getRange(i+1, mail_col+1).setValue(email||'');
        if (lop_col    >= 0) sheet.getRange(i+1, lop_col+1).setValue(lop_phu_trach||'');
        if (role_col   >= 0 && user_role)  sheet.getRange(i+1, role_col+1).setValue(user_role);
        if (active_col >= 0 && active !== undefined) sheet.getRange(i+1, active_col+1).setValue(active === true || active === 'true');
        const updGvHash = _resolveHash(body.password_hash, password, null);
        if (pw_col >= 0 && updGvHash) sheet.getRange(i+1, pw_col+1).setValue(updGvHash);
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
