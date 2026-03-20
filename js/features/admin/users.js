/**
 * features/admin/users.js — Admin User Management
 * ═══════════════════════════════════════════════════════════════
 * Quản lý tài khoản toàn hệ thống (chỉ role admin).
 *
 * Tính năng:
 *   - Danh sách học sinh: search, filter lớp, sort
 *   - Thêm học sinh đơn lẻ hoặc import CSV hàng loạt
 *   - Sửa thông tin: tên, lớp, email, ngày sinh
 *   - Đặt lại mật khẩu (không cần mật khẩu cũ — quyền admin)
 *   - Khoá / mở tài khoản
 *   - Xoá học sinh
 *   - Tab riêng: Quản lý giáo viên (thêm/sửa/xoá GV)
 *
 * Mở qua CL.Teacher.Panel (tab 👥 Người dùng)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, CL.API, CL.UI.Toast
 */

'use strict';

CL.define('Admin.Users', () => {

  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');

  // ── Main render ───────────────────────────────────────────────

  async function render(el) {
    el.innerHTML = `
      <div class="au-tabs">
        <button class="au-tab on" data-t="students" onclick="CL.Admin.Users._auTab(this,'students')">🎓 Học sinh</button>
        <button class="au-tab"    data-t="teachers" onclick="CL.Admin.Users._auTab(this,'teachers')">👨‍🏫 Giáo viên</button>
      </div>
      <div id="au-body"></div>`;
    await _renderStudents(document.getElementById('au-body'));
  }

  function _auTab(btn, which) {
    document.querySelectorAll('.au-tab').forEach(t => t.classList.toggle('on', t.dataset.t === which));
    const body = document.getElementById('au-body');
    if (body) {
      body.innerHTML = '<div class="pf-loading">⏳</div>';
      if (which === 'students') _renderStudents(body);
      else                      _renderTeachers(body);
    }
  }

  // ════════════════════════════════════════════════════════════════
  //  STUDENT MANAGEMENT
  // ════════════════════════════════════════════════════════════════

  async function _renderStudents(el) {
    try {
      const students = await CL.API.adminGetUsers('student', true);
      const classes  = [...new Set(students.map(s => s.lop).filter(Boolean))].sort();

      el.innerHTML = `
        <div class="au-toolbar">
          <input class="au-search" type="text" placeholder="🔍 Tìm MSHS / tên..."
            oninput="CL.Admin.Users._filterStu(this.value)">
          <select id="au-filter-lop" class="au-select" onchange="CL.Admin.Users._filterStu()">
            <option value="">— Tất cả lớp —</option>
            ${classes.map(c => `<option>${Utils.escHtml(c)}</option>`).join('')}
          </select>
          <div style="flex:1"></div>
          <button class="au-btn-add" onclick="CL.Admin.Users.showStudentForm({})">+ Thêm học sinh</button>
          <button class="au-btn-import" onclick="CL.Admin.Users.showImport()">📥 Import CSV</button>
        </div>

        <div class="au-stat-row">
          <span class="au-stat-chip">Tổng: <b>${students.length}</b></span>
          <span class="au-stat-chip ok">Hoạt động: <b>${students.filter(s=>s.active!==false&&s.active!=='FALSE').length}</b></span>
          <span class="au-stat-chip warn">Khoá: <b>${students.filter(s=>s.active===false||s.active==='FALSE').length}</b></span>
        </div>

        <div class="au-table-wrap">
          <table class="au-table" id="au-stu-table">
            <thead><tr>
              <th>MSHS</th><th>Họ và tên</th><th>Lớp</th>
              <th>Email</th><th>Trạng thái</th><th>Thao tác</th>
            </tr></thead>
            <tbody id="au-stu-tbody">
              ${students.map(_stuRow).join('')}
            </tbody>
          </table>
        </div>

        <div id="au-stu-form" style="display:none;margin-top:14px"></div>
        <div id="au-import-panel" style="display:none;margin-top:14px"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="pf-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _stuRow(s) {
    const active  = s.active !== false && s.active !== 'FALSE';
    const statusCls = active ? 'au-active' : 'au-locked';
    const statusLbl = active ? '● Hoạt động' : '🔒 Khoá';
    return `<tr data-mshs="${Utils.escHtml(s.mshs||'')}"
               data-name="${Utils.escHtml((s.ho_ten||'').toLowerCase())}"
               data-lop="${Utils.escHtml((s.lop||'').toLowerCase())}"
               class="${active?'':'au-row-locked'}">
      <td class="au-mshs">${Utils.escHtml(s.mshs||'—')}</td>
      <td class="au-name">${Utils.escHtml(s.ho_ten||'—')}</td>
      <td><span class="au-lop-tag">${Utils.escHtml(s.lop||'—')}</span></td>
      <td class="au-email">${Utils.escHtml(s.email||'—')}</td>
      <td><span class="au-status ${statusCls}">${statusLbl}</span></td>
      <td class="au-actions">
        <button class="au-act-btn" title="Sửa"
          onclick="CL.Admin.Users.showStudentForm(${JSON.stringify({mshs:s.mshs,ho_ten:s.ho_ten,lop:s.lop,email:s.email,ngay_sinh:s.ngay_sinh||''})})">✏️</button>
        <button class="au-act-btn" title="Đặt lại mật khẩu"
          onclick="CL.Admin.Users.resetPassword('${Utils.escHtml(s.mshs||'')}','student')">🔑</button>
        <button class="au-act-btn au-toggle-btn" title="${active?'Khoá':'Mở khoá'}"
          onclick="CL.Admin.Users.toggleActive('${Utils.escHtml(s.mshs||'')}','student',${active})">
          ${active?'🔒':'🔓'}</button>
        <button class="au-act-btn au-del-btn" title="Xoá"
          onclick="CL.Admin.Users.deleteUser('${Utils.escHtml(s.mshs||'')}','student')">🗑</button>
      </td>
    </tr>`;
  }

  function _filterStu(q) {
    const search = (q || document.querySelector('.au-search')?.value || '').toLowerCase();
    const lopSel = document.getElementById('au-filter-lop')?.value?.toLowerCase() || '';
    document.querySelectorAll('#au-stu-tbody tr').forEach(tr => {
      const mshs = (tr.dataset.mshs||'').toLowerCase();
      const name = (tr.dataset.name||'').toLowerCase();
      const lop  = (tr.dataset.lop||'').toLowerCase();
      const matchQ   = !search || mshs.includes(search) || name.includes(search);
      const matchLop = !lopSel || lop === lopSel;
      tr.style.display = matchQ && matchLop ? '' : 'none';
    });
  }

  // ── Student form (add/edit) ───────────────────────────────────

  function showStudentForm(student) {
    const form = document.getElementById('au-stu-form');
    if (!form) return;
    const isEdit = !!student.mshs;
    form.style.display = 'block';
    form.innerHTML = `
      <div class="au-form-title">${isEdit ? '✏️ Sửa học sinh' : '+ Thêm học sinh mới'}</div>
      <div class="au-form-grid">
        <div class="pf-field">
          <label>MSHS <span class="pf-req">*</span></label>
          <input id="auf-mshs" type="text" value="${Utils.escHtml(student.mshs||'')}"
            placeholder="HS240001" ${isEdit?'readonly':''}>
        </div>
        <div class="pf-field">
          <label>Họ và tên <span class="pf-req">*</span></label>
          <input id="auf-name" type="text" value="${Utils.escHtml(student.ho_ten||'')}"
            placeholder="Nguyễn Văn An">
        </div>
        <div class="pf-field">
          <label>Lớp <span class="pf-req">*</span></label>
          <input id="auf-lop" type="text" value="${Utils.escHtml(student.lop||'')}"
            placeholder="11A1">
        </div>
        <div class="pf-field">
          <label>Email</label>
          <input id="auf-email" type="email" value="${Utils.escHtml(student.email||'')}"
            placeholder="hs@example.com">
        </div>
        <div class="pf-field">
          <label>Ngày sinh</label>
          <input id="auf-dob" type="date" value="${Utils.escHtml(student.ngay_sinh||'')}">
        </div>
        ${!isEdit ? `
        <div class="pf-field">
          <label>Mật khẩu ban đầu</label>
          <input id="auf-pw" type="text" placeholder="Để trống = dùng MSHS làm mật khẩu">
          <div class="au-field-hint">Học sinh nên đổi mật khẩu sau khi đăng nhập lần đầu</div>
        </div>` : ''}
      </div>
      <div id="auf-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary" onclick="CL.Admin.Users.saveStudent('${isEdit?student.mshs:''}')">
          💾 ${isEdit ? 'Lưu thay đổi' : 'Thêm học sinh'}
        </button>
        <button class="au-btn-cancel" onclick="document.getElementById('au-stu-form').style.display='none'">Hủy</button>
      </div>`;
    form.scrollIntoView({ behavior: 'smooth' });
  }

  async function saveStudent(existMshs) {
    const msg  = document.getElementById('auf-msg');
    const mshs = existMshs || document.getElementById('auf-mshs')?.value?.trim();
    const name = document.getElementById('auf-name')?.value?.trim();
    const lop  = document.getElementById('auf-lop')?.value?.trim();
    const email= document.getElementById('auf-email')?.value?.trim() || '';
    const dob  = document.getElementById('auf-dob')?.value || '';
    const pw   = document.getElementById('auf-pw')?.value?.trim() || mshs; // default pw = mshs

    if (!mshs) { _msg(msg, '⚠️ Vui lòng nhập MSHS', 'warn'); return; }
    if (!name) { _msg(msg, '⚠️ Vui lòng nhập họ tên', 'warn'); return; }
    if (!lop)  { _msg(msg, '⚠️ Vui lòng nhập lớp', 'warn'); return; }

    _msg(msg, '⏳ Đang lưu...', 'info');
    try {
      await CL.API.adminSaveUser({
        role: 'student', mshs, ho_ten: name, lop, email,
        ngay_sinh: dob, password: existMshs ? undefined : pw,
        is_new: !existMshs,
      });
      _msg(msg, `✅ ${existMshs ? 'Đã cập nhật' : 'Đã thêm'} học sinh ${mshs}`, 'ok');
      Toast.success(`✅ ${existMshs ? 'Cập nhật' : 'Thêm'} học sinh thành công`);
      CL.API._invalidate('users_student');
      setTimeout(() => {
        document.getElementById('au-stu-form').style.display = 'none';
        CL.Teacher.Panel.switchTab('users');
      }, 1200);
    } catch(e) { _msg(msg, '❌ ' + e.message, 'err'); }
  }

  // ── Import CSV ────────────────────────────────────────────────

  function showImport() {
    const panel = document.getElementById('au-import-panel');
    if (!panel) return;
    panel.style.display = 'block';
    panel.innerHTML = `
      <div class="au-form-title">📥 Import học sinh từ CSV</div>
      <div class="au-import-desc">
        File CSV cần có cột theo thứ tự: <code>mshs, ho_ten, lop, email, ngay_sinh, mat_khau</code><br>
        Dòng đầu tiên là header. <b>mat_khau</b> có thể để trống (mặc định = mshs).
      </div>
      <div class="au-import-example">
        <div class="au-ie-title">Ví dụ CSV:</div>
        <pre>mshs,ho_ten,lop,email,ngay_sinh,mat_khau
HS240001,Nguyễn Văn An,11A1,an@tt.edu.vn,2007-05-12,
HS240002,Trần Thị Bình,11A1,binh@tt.edu.vn,2007-03-22,</pre>
      </div>
      <div class="pf-field" style="margin-top:10px">
        <label>Chọn file CSV</label>
        <input id="au-csv-file" type="file" accept=".csv" onchange="CL.Admin.Users._previewCsv(this)">
      </div>
      <div id="au-csv-preview" style="margin-top:8px"></div>
      <div id="au-import-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary" id="au-import-btn" style="display:none"
          onclick="CL.Admin.Users.importCsv()">📤 Import</button>
        <button class="au-btn-cancel" onclick="document.getElementById('au-import-panel').style.display='none'">Hủy</button>
      </div>`;
  }

  let _csvData = [];

  function _previewCsv(input) {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const lines = e.target.result.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) return;
      // Parse header
      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      _csvData = [];
      const errs = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        const row  = {};
        header.forEach((h, ci) => row[h] = (cols[ci]||'').trim());
        if (!row.mshs || !row.ho_ten || !row.lop) {
          errs.push(`Dòng ${i+1}: thiếu mshs/ho_ten/lop`); continue;
        }
        _csvData.push(row);
      }
      const preview = document.getElementById('au-csv-preview');
      const btn     = document.getElementById('au-import-btn');
      if (preview) {
        preview.innerHTML = `
          <div class="au-csv-stats">
            ✅ ${_csvData.length} học sinh hợp lệ
            ${errs.length ? `<br>⚠️ ${errs.length} dòng lỗi: ${errs.slice(0,3).map(Utils.escHtml).join('; ')}` : ''}
          </div>
          <div class="au-csv-sample">
            <b>Xem trước 3 dòng đầu:</b>
            <table class="au-table" style="margin-top:6px">
              <thead><tr><th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>Email</th></tr></thead>
              <tbody>
                ${_csvData.slice(0,3).map(r=>`<tr>
                  <td>${Utils.escHtml(r.mshs)}</td><td>${Utils.escHtml(r.ho_ten)}</td>
                  <td>${Utils.escHtml(r.lop)}</td><td>${Utils.escHtml(r.email||'—')}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>`;
      }
      if (btn) btn.style.display = _csvData.length > 0 ? 'block' : 'none';
    };
    reader.readAsText(file, 'UTF-8');
  }

  async function importCsv() {
    if (!_csvData.length) return;
    const msg = document.getElementById('au-import-msg');
    _msg(msg, `⏳ Đang import ${_csvData.length} học sinh...`, 'info');
    try {
      const result = await CL.API.adminImportUsers('student', _csvData);
      _msg(msg, `✅ Import thành công ${result.imported || _csvData.length} học sinh!`, 'ok');
      Toast.success(`✅ Đã import ${result.imported || _csvData.length} học sinh`);
      CL.API._invalidate('users_student');
      setTimeout(() => CL.Teacher.Panel.switchTab('users'), 1500);
    } catch(e) { _msg(msg, '❌ ' + e.message, 'err'); }
  }

  // ── Shared actions ────────────────────────────────────────────

  async function resetPassword(id, role) {
    const label = role === 'student' ? `học sinh ${id}` : `giáo viên ${id}`;
    const newPw = prompt(`🔑 Đặt mật khẩu mới cho ${label}:\n(Để trống = dùng "${id}" làm mật khẩu)`);
    if (newPw === null) return; // cancelled
    const pw = newPw.trim() || id;
    if (pw.length < 4) { Toast.warn('⚠️ Mật khẩu quá ngắn (ít nhất 4 ký tự)'); return; }
    try {
      const hash = await Utils.sha256(pw);
      await CL.API.adminResetPassword({ role, id, new_hash: hash, new_plain: pw });
      Toast.success(`🔑 Đã đặt lại mật khẩu. Mật khẩu mới: "${pw}"`);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  async function toggleActive(id, role, currentActive) {
    const action = currentActive ? 'Khoá' : 'Mở khoá';
    if (!await Toast.confirm(`${action} tài khoản "${id}"?`)) return;
    try {
      await CL.API.adminToggleActive({ role, id, active: !currentActive });
      Toast.success(`✅ Đã ${action.toLowerCase()} tài khoản ${id}`);
      CL.API._invalidate('users_' + role);
      CL.Teacher.Panel.switchTab('users');
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  async function deleteUser(id, role) {
    const label = role === 'student' ? `học sinh ${id}` : `giáo viên ${id}`;
    if (!await Toast.confirm(`🗑 Xoá ${label}?\n\nHành động này KHÔNG thể hoàn tác.\nDữ liệu điểm vẫn được giữ lại.`)) return;
    try {
      await CL.API.adminDeleteUser({ role, id });
      Toast.success(`✅ Đã xoá ${label}`);
      CL.API._invalidate('users_' + role);
      CL.Teacher.Panel.switchTab('users');
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  // ════════════════════════════════════════════════════════════════
  //  TEACHER MANAGEMENT
  // ════════════════════════════════════════════════════════════════

  async function _renderTeachers(el) {
    try {
      const teachers = await CL.API.adminGetUsers('teacher', true);
      el.innerHTML = `
        <div class="au-toolbar">
          <input class="au-search" type="text" placeholder="🔍 Tìm username / tên..."
            oninput="CL.Admin.Users._filterGv(this.value)">
          <div style="flex:1"></div>
          <button class="au-btn-add" onclick="CL.Admin.Users.showTeacherForm({})">+ Thêm giáo viên</button>
        </div>
        <div class="au-table-wrap">
          <table class="au-table">
            <thead><tr>
              <th>Username</th><th>Họ tên</th><th>Lớp phụ trách</th>
              <th>Email</th><th>Vai trò</th><th>Trạng thái</th><th>Thao tác</th>
            </tr></thead>
            <tbody id="au-gv-tbody">
              ${teachers.map(_gvRow).join('')}
            </tbody>
          </table>
        </div>
        <div id="au-gv-form" style="display:none;margin-top:14px"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="pf-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _gvRow(t) {
    const active  = t.active !== false && t.active !== 'FALSE';
    const isAdmin = t.role === 'admin';
    return `<tr data-u="${Utils.escHtml(t.username||'')}"
               data-n="${Utils.escHtml((t.ho_ten||'').toLowerCase())}"
               class="${active?'':'au-row-locked'}">
      <td class="au-mshs">${Utils.escHtml(t.username||'—')}</td>
      <td class="au-name">${Utils.escHtml(t.ho_ten||'—')}</td>
      <td>${Utils.escHtml(t.lop_phu_trach||'—')}</td>
      <td class="au-email">${Utils.escHtml(t.email||'—')}</td>
      <td><span class="au-role-tag ${isAdmin?'au-admin':''}">
        ${isAdmin?'⚡ Admin':'👨‍🏫 GV'}
      </span></td>
      <td><span class="au-status ${active?'au-active':'au-locked'}">${active?'● Hoạt động':'🔒 Khoá'}</span></td>
      <td class="au-actions">
        <button class="au-act-btn" title="Sửa"
          onclick="CL.Admin.Users.showTeacherForm(${JSON.stringify({username:t.username,ho_ten:t.ho_ten,lop_phu_trach:t.lop_phu_trach||'',email:t.email||'',role:t.role||'teacher'})})">✏️</button>
        <button class="au-act-btn" title="Đặt lại mật khẩu"
          onclick="CL.Admin.Users.resetPassword('${Utils.escHtml(t.username||'')}','teacher')">🔑</button>
        <button class="au-act-btn au-toggle-btn" title="${active?'Khoá':'Mở khoá'}"
          onclick="CL.Admin.Users.toggleActive('${Utils.escHtml(t.username||'')}','teacher',${active})">
          ${active?'🔒':'🔓'}</button>
        <button class="au-act-btn au-del-btn" title="Xoá"
          onclick="CL.Admin.Users.deleteUser('${Utils.escHtml(t.username||'')}','teacher')">🗑</button>
      </td>
    </tr>`;
  }

  function _filterGv(q) {
    q = (q||'').toLowerCase();
    document.querySelectorAll('#au-gv-tbody tr').forEach(tr => {
      tr.style.display = (tr.dataset.u||'').includes(q) || (tr.dataset.n||'').includes(q) ? '' : 'none';
    });
  }

  function showTeacherForm(t) {
    const form = document.getElementById('au-gv-form');
    if (!form) return;
    const isEdit = !!t.username;
    form.style.display = 'block';
    form.innerHTML = `
      <div class="au-form-title">${isEdit ? '✏️ Sửa giáo viên' : '+ Thêm giáo viên mới'}</div>
      <div class="au-form-grid">
        <div class="pf-field">
          <label>Username <span class="pf-req">*</span></label>
          <input id="aufg-user" type="text" value="${Utils.escHtml(t.username||'')}"
            placeholder="gv_an" ${isEdit?'readonly':''}>
        </div>
        <div class="pf-field">
          <label>Họ và tên <span class="pf-req">*</span></label>
          <input id="aufg-name" type="text" value="${Utils.escHtml(t.ho_ten||'')}"
            placeholder="Nguyễn Văn A">
        </div>
        <div class="pf-field">
          <label>Lớp phụ trách</label>
          <input id="aufg-lop" type="text" value="${Utils.escHtml(t.lop_phu_trach||'')}"
            placeholder="11A1, 11A2">
        </div>
        <div class="pf-field">
          <label>Email</label>
          <input id="aufg-email" type="email" value="${Utils.escHtml(t.email||'')}"
            placeholder="gv@thuthiem.edu.vn">
        </div>
        <div class="pf-field">
          <label>Vai trò</label>
          <select id="aufg-role" class="au-select">
            <option value="teacher" ${(t.role||'teacher')==='teacher'?'selected':''}>👨‍🏫 Giáo viên</option>
            <option value="admin"   ${t.role==='admin'?'selected':''}>⚡ Admin (toàn quyền)</option>
          </select>
        </div>
        ${!isEdit ? `
        <div class="pf-field">
          <label>Mật khẩu ban đầu</label>
          <input id="aufg-pw" type="text" placeholder="Để trống = dùng username">
        </div>` : ''}
      </div>
      <div id="aufg-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary" onclick="CL.Admin.Users.saveTeacher('${isEdit?t.username:''}')">
          💾 ${isEdit ? 'Lưu thay đổi' : 'Thêm giáo viên'}
        </button>
        <button class="au-btn-cancel" onclick="document.getElementById('au-gv-form').style.display='none'">Hủy</button>
      </div>`;
    form.scrollIntoView({ behavior: 'smooth' });
  }

  async function saveTeacher(existUser) {
    const msg  = document.getElementById('aufg-msg');
    const user = existUser || document.getElementById('aufg-user')?.value?.trim();
    const name = document.getElementById('aufg-name')?.value?.trim();
    const lop  = document.getElementById('aufg-lop')?.value?.trim() || '';
    const email= document.getElementById('aufg-email')?.value?.trim() || '';
    const role = document.getElementById('aufg-role')?.value || 'teacher';
    const pw   = document.getElementById('aufg-pw')?.value?.trim() || user;

    if (!user) { _msg(msg, '⚠️ Vui lòng nhập username', 'warn'); return; }
    if (!name) { _msg(msg, '⚠️ Vui lòng nhập họ tên', 'warn'); return; }

    _msg(msg, '⏳ Đang lưu...', 'info');
    try {
      await CL.API.adminSaveUser({
        role: 'teacher', username: user, ho_ten: name, lop_phu_trach: lop,
        email, user_role: role, password: existUser ? undefined : pw,
        is_new: !existUser,
      });
      _msg(msg, `✅ ${existUser ? 'Đã cập nhật' : 'Đã thêm'} giáo viên ${user}`, 'ok');
      Toast.success(`✅ ${existUser ? 'Cập nhật' : 'Thêm'} giáo viên thành công`);
      CL.API._invalidate('users_teacher');
      setTimeout(() => {
        document.getElementById('au-gv-form').style.display = 'none';
        _auTab(null, 'teachers');
      }, 1200);
    } catch(e) { _msg(msg, '❌ ' + e.message, 'err'); }
  }

  // ── Helper ────────────────────────────────────────────────────
  function _msg(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = 'pf-msg pf-msg-' + (type||'info');
  }

  return {
    render, saveStudent, showStudentForm, importCsv, _previewCsv, _filterStu,
    showTeacherForm, saveTeacher, _filterGv, _auTab,
    resetPassword, toggleActive, deleteUser,
  };
});
