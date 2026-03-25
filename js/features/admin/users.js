/**
 * features/admin/users.js — Admin: Quản lý người dùng
 */
'use strict';

CL.define('Admin.Users', () => {

  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');
  let _curTab = 'students';
  const _stuCache   = {};  // mshs → student obj
  const _gvCache    = {};  // username → teacher obj
  const _adminCache = {};  // username → admin obj

  // ── Main render ───────────────────────────────────────────────
  async function render(el) {
    el.innerHTML = `
      <div class="au-tabs">
        <button class="au-tab on" data-t="students"
          onclick="CL.Admin.Users._auTab(this,'students')">🎓 Học sinh</button>
        <button class="au-tab" data-t="teachers"
          onclick="CL.Admin.Users._auTab(this,'teachers')">👨‍🏫 Giáo viên</button>
        <button class="au-tab" data-t="admins"
          onclick="CL.Admin.Users._auTab(this,'admins')">⚡ Admin</button>
        <button class="au-tab" data-t="scores"
          onclick="CL.Admin.Users._auTab(this,'scores')">📊 Bảng điểm</button>
      </div>
      <div id="au-body"></div>`;
    await _renderStudents(document.getElementById('au-body'));
  }

  function _auTab(btn, which) {
    _curTab = which;
    document.querySelectorAll('.au-tab').forEach(t =>
      t.classList.toggle('on', t.dataset.t === which));
    const body = document.getElementById('au-body');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    ({ students:_renderStudents, teachers:_renderTeachers,
       admins:_renderAdmins, scores:_renderScores }[which] || _renderStudents)(body);
  }

  // ════════════════════════════════════════════════════════════════
  //  TAB 1 — HỌC SINH
  // ════════════════════════════════════════════════════════════════
  async function _renderStudents(el) {
    try {
      const students = await CL.API.adminGetUsers('student', true);
      const classes  = [...new Set(students.map(s => s.lop).filter(Boolean))].sort();
      students.forEach(s => { _stuCache[s.mshs] = s; });

      el.innerHTML = `
        <div class="au-toolbar">
          <input id="stu-search" class="au-search" type="text"
            placeholder="🔍 Tìm MSHS / họ tên..."
            oninput="CL.Admin.Users._filterStu()">
          <select class="au-select" id="au-filter-lop"
            onchange="CL.Admin.Users._filterStu()">
            <option value="">Tất cả lớp</option>
            ${classes.map(c => `<option>${Utils.escHtml(c)}</option>`).join('')}
          </select>
          <span class="au-count" id="au-stu-count">${students.length} học sinh</span>
          <button class="au-btn-add" onclick="CL.Admin.Users.showStudentForm({})">+ Thêm</button>
        </div>
        <div class="au-table-wrap">
          <table class="au-table">
            <thead><tr>
              <th>MSHS / CCCD</th><th>Họ tên</th><th>Lớp</th>
              <th>Email</th><th>Trạng thái</th><th>Thao tác</th>
            </tr></thead>
            <tbody id="au-stu-tbody">
              ${students.map(_stuRow).join('')}
            </tbody>
          </table>
        </div>
        <div id="au-stu-form" style="display:none;padding:14px"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _stuRow(s) {
    const active = s.active !== false && s.active !== 'FALSE';
    // data-q: mshs + tên, đều lowercase để so sánh nhất quán
    const q = ((s.mshs||'') + ' ' + (s.ho_ten||'')).toLowerCase();
    return `<tr data-q="${Utils.escHtml(q)}"
               data-lop="${Utils.escHtml((s.lop||'').toLowerCase())}"
               class="${active?'':'au-row-locked'}">
      <td class="au-mshs">${Utils.escHtml(s.mshs||'—')}</td>
      <td class="au-name">${Utils.escHtml(s.ho_ten||'—')}</td>
      <td>${Utils.escHtml(s.lop||'—')}</td>
      <td class="au-email">${Utils.escHtml(s.email||'—')}</td>
      <td><span class="au-status ${active?'au-active':'au-locked'}">${active?'● Hoạt động':'🔒 Khoá'}</span></td>
      <td class="au-actions">
        <button class="au-act-btn" title="Sửa"
          onclick="CL.Admin.Users.showStudentForm(CL.Admin.Users._getStu('${Utils.escHtml(String(s.mshs||''))}'))">✏️</button>
        <button class="au-act-btn" title="Reset mật khẩu"
          onclick="CL.Admin.Users.resetPassword('${Utils.escHtml(String(s.mshs||''))}','student')">🔑</button>
        <button class="au-act-btn au-toggle-btn" title="${active?'Khoá':'Mở'}"
          onclick="CL.Admin.Users.toggleActive('${Utils.escHtml(String(s.mshs||''))}','student',${active})">
          ${active?'🔒':'🔓'}</button>
        <button class="au-act-btn au-del-btn" title="Xoá"
          onclick="CL.Admin.Users.deleteUser('${Utils.escHtml(String(s.mshs||''))}','student')">🗑</button>
      </td>
    </tr>`;
  }

  function _filterStu() {
    const q   = (document.getElementById('stu-search')?.value||'').toLowerCase().trim();
    const lop = (document.getElementById('au-filter-lop')?.value||'').toLowerCase().trim();
    let vis = 0;
    document.querySelectorAll('#au-stu-tbody tr').forEach(tr => {
      const matchQ   = !q   || (tr.dataset.q  ||'').includes(q);
      const matchLop = !lop || (tr.dataset.lop||'') === lop;
      tr.style.display = matchQ && matchLop ? '' : 'none';
      if (matchQ && matchLop) vis++;
    });
    const cnt = document.getElementById('au-stu-count');
    if (cnt) cnt.textContent = vis + ' học sinh';
  }

  function _getStu(mshs)    { return _stuCache[mshs]    || { mshs }; }
  function _getGv(user)     { return _gvCache[user]     || { username: user }; }
  function _getAdmin(user)  { return _adminCache[user]  || { username: user }; }

  function showStudentForm(s) {
    const form = document.getElementById('au-stu-form');
    if (!form) return;
    const isEdit = !!s.mshs;
    const active = s.active !== false && s.active !== 'FALSE';
    form.style.display = 'block';
    form.innerHTML = `
      <div class="au-form-title">${isEdit ? '✏️ Sửa học sinh' : '+ Thêm học sinh mới'}</div>
      <div class="au-form-grid">
        <div class="pf-field">
          <label>MSHS / CCCD <span class="pf-req">*</span></label>
          <input id="aufs-mshs" type="text" value="${Utils.escHtml(s.mshs||'')}"
            placeholder="12 chữ số">
          ${isEdit ? '<div class="au-field-hint">⚠️ Chỉ sửa ID khi thật sự cần thiết</div>' : ''}
        </div>
        <div class="pf-field">
          <label>Họ và tên <span class="pf-req">*</span></label>
          <input id="aufs-name" type="text" value="${Utils.escHtml(s.ho_ten||'')}"
            placeholder="Nguyễn Văn A">
        </div>
        <div class="pf-field">
          <label>Lớp <span class="pf-req">*</span></label>
          <input id="aufs-lop" type="text" value="${Utils.escHtml(s.lop||'')}"
            placeholder="10A1">
        </div>
        <div class="pf-field">
          <label>Email</label>
          <input id="aufs-email" type="email" value="${Utils.escHtml(s.email||'')}"
            placeholder="hs@thuthiem.edu.vn">
        </div>
        <div class="pf-field">
          <label>Ngày sinh</label>
          <input id="aufs-dob" type="date" value="${Utils.escHtml(s.ngay_sinh||'')}">
        </div>
        ${isEdit ? `
        <div class="pf-field">
          <label>Mật khẩu mới <span style="font-weight:400;color:var(--text3)">(để trống = không đổi)</span></label>
          <input id="aufs-pw" type="text" placeholder="Nhập để đặt mật khẩu mới">
        </div>
        <div class="pf-field">
          <label>Trạng thái</label>
          <select id="aufs-active">
            <option value="true"  ${active?'selected':''}>● Hoạt động</option>
            <option value="false" ${!active?'selected':''}>🔒 Khoá</option>
          </select>
        </div>` : `
        <div class="pf-field">
          <label>Mật khẩu ban đầu <span style="font-weight:400;color:var(--text3)">(để trống = dùng MSHS)</span></label>
          <input id="aufs-pw" type="text" placeholder="Để trống = dùng MSHS">
        </div>`}
      </div>
      <div id="aufs-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary"
          data-exist-mshs="${Utils.escHtml(isEdit?String(s.mshs||''):'')}"
          onclick="CL.Admin.Users.saveStudent(this.dataset.existMshs)">
          💾 ${isEdit?'Lưu thay đổi':'Thêm học sinh'}
        </button>
        <button class="au-btn-cancel"
          onclick="document.getElementById('au-stu-form').style.display='none'">Hủy</button>
      </div>`;
    form.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  async function saveStudent(existMshs) {
    const msg     = document.getElementById('aufs-msg');
    const newMshs = document.getElementById('aufs-mshs')?.value?.trim();
    const oldMshs = document.getElementById('aufs-old-mshs')?.value?.trim() || existMshs || '';
    const mshs    = newMshs || existMshs;
    const name  = document.getElementById('aufs-name')?.value?.trim();
    const lop   = document.getElementById('aufs-lop')?.value?.trim() || '';
    const email = document.getElementById('aufs-email')?.value?.trim() || '';
    const dob   = document.getElementById('aufs-dob')?.value?.trim()  || '';
    const pw    = document.getElementById('aufs-pw')?.value?.trim()   || '';
    const activeVal = document.getElementById('aufs-active')?.value;

    if (!mshs) return _msg(msg, '⚠️ Vui lòng nhập MSHS', 'warn');
    if (!name) return _msg(msg, '⚠️ Vui lòng nhập họ tên', 'warn');
    _msg(msg, '⏳ Đang lưu...', 'info');
    try {
      const payload = {
        role:'student', mshs, ho_ten:name, lop, email,
        ngay_sinh: dob, is_new: !existMshs,
        old_mshs: (existMshs && oldMshs !== mshs) ? oldMshs : existMshs,
      };
      if (pw) payload.password = pw;
      if (activeVal !== undefined) payload.active = activeVal === 'true';
      await CL.API.adminSaveUser(payload);
      // Update cache
      // If ID changed, delete old cache entry
      if (existMshs && existMshs !== mshs) delete _stuCache[existMshs];
      _stuCache[mshs] = { ...(_stuCache[existMshs]||_stuCache[mshs]||{}), mshs, ho_ten:name, lop, email, ngay_sinh:dob,
                          active: activeVal !== undefined ? activeVal === 'true' : true };
      _msg(msg, `✅ ${existMshs?'Đã cập nhật':'Đã thêm'} ${mshs}`, 'ok');
      Toast.success(`✅ ${existMshs?'Cập nhật':'Thêm'} học sinh thành công`);
      CL.API._invalidate('users_student');
      setTimeout(() => _auTab(null, 'students'), 1200);
    } catch(e) { _msg(msg, '❌ ' + e.message, 'err'); }
  }

  // ════════════════════════════════════════════════════════════════
  //  TAB 2 — GIÁO VIÊN
  // ════════════════════════════════════════════════════════════════
  async function _renderTeachers(el) {
    try {
      const teachers = await CL.API.adminGetUsers('teacher', true);
      teachers.forEach(t => { _gvCache[t.username] = t; });
      el.innerHTML = `
        <div class="au-toolbar">
          <input id="gv-search" class="au-search" type="text"
            placeholder="🔍 Tìm username / tên..."
            oninput="CL.Admin.Users._filterGv()">
          <span class="au-count">${teachers.length} giáo viên</span>
          <button class="au-btn-add" onclick="CL.Admin.Users.showTeacherForm({})">+ Thêm</button>
        </div>
        <div class="au-table-wrap">
          <table class="au-table">
            <thead><tr>
              <th>Username</th><th>Họ tên</th><th>Lớp phụ trách</th>
              <th>Email</th><th>Trạng thái</th><th>Thao tác</th>
            </tr></thead>
            <tbody id="au-gv-tbody">
              ${teachers.map(_gvRow).join('')}
            </tbody>
          </table>
        </div>
        <div id="au-gv-form" style="display:none;padding:14px"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _gvRow(t) {
    const active = t.active !== false && t.active !== 'FALSE';
    const q = ((t.username||'') + ' ' + (t.ho_ten||'')).toLowerCase();
    return `<tr data-q="${Utils.escHtml(q)}" class="${active?'':'au-row-locked'}">
      <td class="au-mshs">${Utils.escHtml(t.username||'—')}</td>
      <td class="au-name">${Utils.escHtml(t.ho_ten||'—')}</td>
      <td>${Utils.escHtml(t.lop_phu_trach||'—')}</td>
      <td class="au-email">${Utils.escHtml(t.email||'—')}</td>
      <td><span class="au-status ${active?'au-active':'au-locked'}">${active?'● Hoạt động':'🔒 Khoá'}</span></td>
      <td class="au-actions">
        <button class="au-act-btn" title="Sửa"
          onclick="CL.Admin.Users.showTeacherForm(CL.Admin.Users._getGv('${Utils.escHtml(String(t.username||''))}'))">✏️</button>
        <button class="au-act-btn" title="Reset mật khẩu"
          onclick="CL.Admin.Users.resetPassword('${Utils.escHtml(String(t.username||''))}','teacher')">🔑</button>
        <button class="au-act-btn au-toggle-btn"
          onclick="CL.Admin.Users.toggleActive('${Utils.escHtml(String(t.username||''))}','teacher',${active})">
          ${active?'🔒':'🔓'}</button>
        <button class="au-act-btn au-del-btn"
          onclick="CL.Admin.Users.deleteUser('${Utils.escHtml(String(t.username||''))}','teacher')">🗑</button>
      </td>
    </tr>`;
  }

  function _filterGv() {
    const q = (document.getElementById('gv-search')?.value||'').toLowerCase().trim();
    document.querySelectorAll('#au-gv-tbody tr').forEach(tr =>
      tr.style.display = !q || (tr.dataset.q||'').includes(q) ? '' : 'none'
    );
  }

  function showTeacherForm(t) {
    const form = document.getElementById('au-gv-form');
    if (!form) return;
    const isEdit = !!t.username;
    const active = t.active !== false && t.active !== 'FALSE';
    form.style.display = 'block';
    form.innerHTML = `
      <div class="au-form-title">${isEdit?'✏️ Sửa giáo viên':'+ Thêm giáo viên mới'}</div>
      <div class="au-form-grid">
        <div class="pf-field">
          <label>Username <span class="pf-req">*</span></label>
          <input id="aufg-user" type="text" value="${Utils.escHtml(t.username||'')}"
            placeholder="gv_an">
          ${isEdit ? '<div class="au-field-hint">⚠️ Chỉ sửa username khi thật sự cần thiết</div>' : ''}
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
          <label>Mật khẩu ${isEdit?'mới':'ban đầu'} <span style="font-weight:400;color:var(--text3)">(để trống = ${isEdit?'không đổi':'dùng username'})</span></label>
          <input id="aufg-pw" type="text" placeholder="${isEdit?'Nhập để đổi mật khẩu':'Để trống = dùng username'}">
        </div>
        ${isEdit?`
        <div class="pf-field">
          <label>Trạng thái</label>
          <select id="aufg-active">
            <option value="true"  ${active?'selected':''}>● Hoạt động</option>
            <option value="false" ${!active?'selected':''}>🔒 Khoá</option>
          </select>
        </div>`:''}
      </div>
      <div id="aufg-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary"
          data-exist-id="${Utils.escHtml(isEdit?String(t.username||''):'')}"
          onclick="CL.Admin.Users.saveTeacher(this.dataset.existId)">
          💾 ${isEdit?'Lưu thay đổi':'Thêm giáo viên'}
        </button>
        <button class="au-btn-cancel"
          onclick="document.getElementById('au-gv-form').style.display='none'">Hủy</button>
      </div>`;
    form.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  async function saveTeacher(existUser) {
    const msg     = document.getElementById('aufg-msg');
    const newUser = document.getElementById('aufg-user')?.value?.trim();
    const oldUser = document.getElementById('aufg-old-user')?.value?.trim() || existUser || '';
    const user    = newUser || existUser;
    const name  = document.getElementById('aufg-name')?.value?.trim();
    const lop   = document.getElementById('aufg-lop')?.value?.trim()  || '';
    const email = document.getElementById('aufg-email')?.value?.trim()|| '';
    const pw    = document.getElementById('aufg-pw')?.value?.trim()   || '';
    const activeVal = document.getElementById('aufg-active')?.value;
    if (!user) return _msg(msg,'⚠️ Vui lòng nhập username','warn');
    if (!name) return _msg(msg,'⚠️ Vui lòng nhập họ tên','warn');
    _msg(msg,'⏳ Đang lưu...','info');
    try {
      const payload = {
        role:'teacher', username:user, ho_ten:name, lop_phu_trach:lop,
        email, user_role:'teacher', is_new:!existUser,
        old_username: (existUser && oldUser !== user) ? oldUser : existUser,
      };
      if (pw) payload.password = pw;
      if (activeVal !== undefined) payload.active = activeVal === 'true';
      await CL.API.adminSaveUser(payload);
      if (existUser && existUser !== user) delete _gvCache[existUser];
      _gvCache[user] = { ...(_gvCache[existUser]||_gvCache[user]||{}), username:user, ho_ten:name, lop_phu_trach:lop,
                         email, active: activeVal !== undefined ? activeVal === 'true' : true };
      _msg(msg,`✅ ${existUser?'Cập nhật':'Đã thêm'} ${user}`,'ok');
      Toast.success(`✅ ${existUser?'Cập nhật':'Thêm'} giáo viên thành công`);
      CL.API._invalidate('users_teacher');
      setTimeout(() => { document.getElementById('au-gv-form').style.display='none'; _auTab(null,'teachers'); }, 1200);
    } catch(e) { _msg(msg,'❌ '+e.message,'err'); }
  }

  // ════════════════════════════════════════════════════════════════
  //  TAB 3 — ADMIN
  // ════════════════════════════════════════════════════════════════
  async function _renderAdmins(el) {
    try {
      const admins = await CL.API.adminGetAdmins();
      admins.forEach(a => { _adminCache[a.username] = a; });
      el.innerHTML = `
        <div class="au-admin-note">
          ⚡ Tài khoản Admin lưu trong tab <b>[Admin]</b> của 01_TaiKhoan.gsheet — tách biệt với Giáo viên.
        </div>
        <div class="au-toolbar">
          <span class="au-count">${admins.length} tài khoản admin</span>
          <button class="au-btn-add" onclick="CL.Admin.Users.showAdminForm({})">+ Thêm Admin</button>
        </div>
        <div class="au-table-wrap">
          <table class="au-table">
            <thead><tr>
              <th>Username</th><th>Họ tên</th><th>Email</th>
              <th>Trạng thái</th><th>Ngày tạo</th><th>Thao tác</th>
            </tr></thead>
            <tbody>
              ${admins.length ? admins.map(_adminRow).join('')
                : '<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text3)">Chưa có tài khoản admin</td></tr>'}
            </tbody>
          </table>
        </div>
        <div id="au-adm-form" style="display:none;padding:14px"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _adminRow(a) {
    const active  = a.active !== false && a.active !== 'FALSE';
    const created = a.created_at ? new Date(a.created_at).toLocaleDateString('vi-VN') : '—';
    return `<tr class="${active?'':'au-row-locked'}">
      <td><span class="au-admin-badge">⚡</span> ${Utils.escHtml(a.username||'—')}</td>
      <td class="au-name">${Utils.escHtml(a.ho_ten||'—')}</td>
      <td class="au-email">${Utils.escHtml(a.email||'—')}</td>
      <td><span class="au-status ${active?'au-active':'au-locked'}">${active?'● Hoạt động':'🔒 Khoá'}</span></td>
      <td style="font-size:11px;color:var(--text3)">${created}</td>
      <td class="au-actions">
        <button class="au-act-btn" title="Sửa"
          onclick="CL.Admin.Users.showAdminForm(CL.Admin.Users._getAdmin('${Utils.escHtml(String(a.username||''))}'))">✏️</button>
        <button class="au-act-btn" title="Reset mật khẩu"
          onclick="CL.Admin.Users.resetAdminPw('${Utils.escHtml(String(a.username||''))}')">🔑</button>
        <button class="au-act-btn au-del-btn" title="Xoá"
          onclick="CL.Admin.Users.deleteAdmin('${Utils.escHtml(String(a.username||''))}')">🗑</button>
      </td>
    </tr>`;
  }

  function showAdminForm(a) {
    const form = document.getElementById('au-adm-form');
    if (!form) return;
    const isEdit = !!a.username;
    form.style.display = 'block';
    form.innerHTML = `
      <div class="au-form-title">${isEdit?'✏️ Sửa Admin':'+ Thêm tài khoản Admin mới'}</div>
      <div class="au-form-grid">
        <div class="pf-field">
          <label>Username <span class="pf-req">*</span></label>
          <input id="aufa-user" type="text" value="${Utils.escHtml(a.username||'')}"
            placeholder="admin2" ${isEdit?'readonly':''}>
        </div>
        <div class="pf-field">
          <label>Họ và tên <span class="pf-req">*</span></label>
          <input id="aufa-name" type="text" value="${Utils.escHtml(a.ho_ten||'')}" placeholder="Nguyễn Văn A">
        </div>
        <div class="pf-field">
          <label>Email</label>
          <input id="aufa-email" type="email" value="${Utils.escHtml(a.email||'')}" placeholder="admin@thuthiem.edu.vn">
        </div>
        <div class="pf-field">
          <label>Mật khẩu ${isEdit?'mới':'*'} <span style="font-weight:400;color:var(--text3)">${isEdit?'(để trống = không đổi)':''}</span></label>
          <input id="aufa-pw" type="text" placeholder="${isEdit?'Để trống = không đổi':'Mật khẩu mạnh'}">
        </div>
      </div>
      <div id="aufa-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary"
          data-exist-id="${Utils.escHtml(isEdit?String(a.username||''):'')}"
          onclick="CL.Admin.Users.saveAdmin(this.dataset.existId)">
          💾 ${isEdit?'Lưu':'Tạo tài khoản Admin'}
        </button>
        <button class="au-btn-cancel"
          onclick="document.getElementById('au-adm-form').style.display='none'">Hủy</button>
      </div>`;
    form.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  async function saveAdmin(existUser) {
    const msg   = document.getElementById('aufa-msg');
    const user  = existUser || document.getElementById('aufa-user')?.value?.trim();
    const name  = document.getElementById('aufa-name')?.value?.trim();
    const email = document.getElementById('aufa-email')?.value?.trim() || '';
    const pw    = document.getElementById('aufa-pw')?.value?.trim() || '';
    if (!user) return _msg(msg,'⚠️ Vui lòng nhập username','warn');
    if (!name) return _msg(msg,'⚠️ Vui lòng nhập họ tên','warn');
    if (!existUser && !pw) return _msg(msg,'⚠️ Vui lòng nhập mật khẩu','warn');
    _msg(msg,'⏳ Đang lưu...','info');
    try {
      const pwHash = pw ? await Utils.sha256(pw) : '';
      await CL.API.adminSaveAdmin({ username:user, ho_ten:name, email, password_hash:pwHash, is_new:!existUser });
      _msg(msg,`✅ ${existUser?'Cập nhật':'Đã tạo'} admin ${user}`,'ok');
      Toast.success(`✅ ${existUser?'Cập nhật':'Tạo'} admin thành công`);
      setTimeout(() => { document.getElementById('au-adm-form').style.display='none'; _auTab(null,'admins'); }, 1200);
    } catch(e) { _msg(msg,'❌ '+e.message,'err'); }
  }

  async function resetAdminPw(username) {
    const newPw = await _promptPw(`Đặt lại mật khẩu cho admin "${username}"`);
    if (newPw === null) return;
    try {
      const hash = await Utils.sha256(newPw);
      await CL.API.adminSaveAdmin({ username, password_hash: hash, is_new: false });
      Toast.success(`🔑 Đã đặt lại mật khẩu cho ${username}`);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  async function deleteAdmin(username) {
    if (!await Toast.confirm(`🗑 Xoá tài khoản admin "${username}"?\n\nHành động này không thể hoàn tác.`)) return;
    try {
      await CL.API.adminDeleteAdmin({ username });
      Toast.success(`✅ Đã xoá admin ${username}`);
      _auTab(null,'admins');
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  // ════════════════════════════════════════════════════════════════
  //  TAB 4 — BẢNG ĐIỂM (unchanged)
  // ════════════════════════════════════════════════════════════════
  async function _renderScores(el) {
    el.innerHTML = `
      <div class="au-toolbar" style="flex-wrap:wrap;gap:6px">
        <input class="au-search" id="sc-search" type="text" placeholder="🔍 MSHS / họ tên..."
          oninput="CL.Admin.Users._filterScores()">
        <input class="au-select" id="sc-lop" type="text" placeholder="Lớp (VD: 10A1)"
          style="width:90px" oninput="CL.Admin.Users._filterScores()">
        <select class="au-select" id="sc-sort" onchange="CL.Admin.Users._filterScores()">
          <option value="desc">Điểm cao → thấp</option>
          <option value="asc">Điểm thấp → cao</option>
          <option value="name">Tên A-Z</option>
          <option value="time">Mới nhất</option>
        </select>
        <button class="au-btn-add" style="background:var(--accent2)" onclick="CL.Admin.Users._exportScoresCsv()">
          📥 Xuất CSV
        </button>
      </div>
      <div id="sc-summary" class="au-score-summary"></div>
      <div id="sc-body" class="tp-loading">⏳ Đang tải dữ liệu...</div>`;
    try {
      const scores = await CL.API.getScores(true);
      window._scAllScores = scores;
      _renderScoreTable(scores);
      _renderScoreSummary(scores);
    } catch(e) {
      document.getElementById('sc-body').innerHTML =
        `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _renderScoreSummary(scores) {
    const el = document.getElementById('sc-summary');
    if (!el || !scores.length) return;
    const total = scores.length;
    const avg   = (scores.reduce((s,r)=>s+(+r.diem||0),0)/total).toFixed(1);
    const pass  = scores.filter(r=>(+r.diem||0)>=5).length;
    const dist  = {'9-10':0,'7-8':0,'5-6':0,'<5':0};
    scores.forEach(r=>{const d=+r.diem||0;if(d>=9)dist['9-10']++;else if(d>=7)dist['7-8']++;else if(d>=5)dist['5-6']++;else dist['<5']++;});
    el.innerHTML = `
      <div class="au-score-stat"><span class="au-stat-n">${total}</span><span class="au-stat-l">Lần nộp</span></div>
      <div class="au-score-stat"><span class="au-stat-n">${avg}</span><span class="au-stat-l">Điểm TB</span></div>
      <div class="au-score-stat ok"><span class="au-stat-n">${pass}</span><span class="au-stat-l">Đạt (≥5)</span></div>
      <div class="au-score-stat err"><span class="au-stat-n">${total-pass}</span><span class="au-stat-l">Chưa đạt</span></div>
      <div class="au-score-dist">
        ${[['9-10','var(--accent2)'],['7-8','var(--accent)'],['5-6','var(--warn)'],['<5','var(--error)']].map(([k,c])=>
          `<div class="au-dist-bar" style="--pct:${(dist[k]/total*100).toFixed(0)}%;--clr:${c}"><span>${k}</span><b>${dist[k]}</b></div>`
        ).join('')}
      </div>`;
  }

  function _renderScoreTable(scores) {
    const body = document.getElementById('sc-body');
    if (!body) return;
    if (!scores.length){body.innerHTML='<div class="tp-empty">Chưa có dữ liệu điểm</div>';return;}
    body.innerHTML=`<div class="au-table-wrap"><table class="au-table" id="sc-table">
      <thead><tr><th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>Bài tập</th><th>Điểm</th><th>Lần</th><th>Thời gian</th></tr></thead>
      <tbody id="sc-tbody">${scores.map(_scoreRow).join('')}</tbody></table></div>`;
  }

  function _scoreRow(r) {
    const d=+r.diem||0,cls=d>=9?'sc-ex':d>=7?'sc-ok':d>=5?'sc-warn':'sc-bad';
    const ts=r.ts?new Date(r.ts).toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):'—';
    return `<tr data-q="${Utils.escHtml(((r.mshs||'')+(r.ho_ten||'')).toLowerCase())}"
      data-lop="${Utils.escHtml((r.lop||'').toLowerCase())}" data-d="${d}" data-ts="${r.ts||0}"
      data-tn="${Utils.escHtml((r.ho_ten||'').toLowerCase())}">
      <td class="au-mshs">${Utils.escHtml(r.mshs||'—')}</td>
      <td>${Utils.escHtml(r.ho_ten||'—')}</td>
      <td>${Utils.escHtml(r.lop||'—')}</td>
      <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
        title="${Utils.escHtml(r.tieu_de||r.bai_id||'')}">${Utils.escHtml(r.tieu_de||r.bai_id||'—')}</td>
      <td><span class="sc-badge ${cls}">${d.toFixed(1)}</span></td>
      <td style="text-align:center;font-size:11px;color:var(--text3)">${r.lan_thu||1}</td>
      <td style="font-size:11px;color:var(--text3)">${ts}</td>
    </tr>`;
  }

  function _filterScores() {
    const q   =(document.getElementById('sc-search')?.value||'').toLowerCase();
    const lop =(document.getElementById('sc-lop')?.value||'').toLowerCase();
    const sort= document.getElementById('sc-sort')?.value||'desc';
    if (!window._scAllScores) return;
    let filtered = window._scAllScores.filter(r=>{
      const mq=!q  ||(r.mshs||'').includes(q)||(r.ho_ten||'').toLowerCase().includes(q);
      const ml=!lop||(r.lop||'').toLowerCase().includes(lop);
      return mq&&ml;
    });
    if(sort==='desc')  filtered.sort((a,b)=>(+b.diem||0)-(+a.diem||0));
    else if(sort==='asc')  filtered.sort((a,b)=>(+a.diem||0)-(+b.diem||0));
    else if(sort==='name') filtered.sort((a,b)=>(a.ho_ten||'').localeCompare(b.ho_ten||''));
    else if(sort==='time') filtered.sort((a,b)=>new Date(b.ts||0)-new Date(a.ts||0));
    _renderScoreTable(filtered); _renderScoreSummary(filtered);
  }

  function _exportScoresCsv() {
    const scores=window._scAllScores||[];
    if(!scores.length){Toast.warn('Chưa có dữ liệu điểm');return;}
    const header='MSHS,Ho Ten,Lop,Bai Tap,Diem,Lan Thu,Thoi Gian\n';
    const rows=scores.map(r=>[r.mshs,r.ho_ten,r.lop,(r.tieu_de||r.bai_id||'').replace(/,/g,' '),r.diem,r.lan_thu||1,r.ts||''].join(',')).join('\n');
    const blob=new Blob(['\uFEFF'+header+rows],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download=`BangDiem_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();URL.revokeObjectURL(url);
    Toast.success('📥 Đã xuất bảng điểm CSV');
  }

  // ════════════════════════════════════════════════════════════════
  //  SHARED ACTIONS
  // ════════════════════════════════════════════════════════════════

  // Custom password prompt — no browser prompt() (blocked in some contexts)
  function _promptPw(title) {
    return new Promise(resolve => {
      const ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center';
      ov.innerHTML = `
        <div style="background:var(--surface,#1e2433);border:1px solid var(--border,#334155);border-radius:14px;padding:24px;max-width:360px;width:90%;font-family:system-ui,sans-serif">
          <div style="font-size:14px;font-weight:600;color:var(--text,#f1f5f9);margin-bottom:12px">🔑 ${Utils.escHtml(title)}</div>
          <input id="_pwprompt" type="text" style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--border,#475569);background:var(--surface2,#0f172a);color:var(--text,#f1f5f9);font-size:13px;outline:none;margin-bottom:6px"
            placeholder="Mật khẩu mới (để trống = dùng ID)">
          <div style="font-size:11px;color:var(--text3,#64748b);margin-bottom:16px">Tối thiểu 4 ký tự</div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button id="_pwcancel" style="padding:8px 18px;border:1px solid var(--border,#475569);background:none;border-radius:8px;color:var(--text3,#94a3b8);cursor:pointer;font-size:13px">Hủy</button>
            <button id="_pwok" style="padding:8px 18px;background:#4f9eff;border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:13px;font-weight:700">Đặt mật khẩu</button>
          </div>
        </div>`;
      document.body.appendChild(ov);
      const inp = ov.querySelector('#_pwprompt');
      inp.focus();
      const done = (v) => { ov.remove(); resolve(v); };
      ov.querySelector('#_pwok').onclick = () => {
        const v = inp.value.trim();
        if (v && v.length < 4) { inp.style.borderColor='#ef4444'; return; }
        done(v || null);
      };
      ov.querySelector('#_pwcancel').onclick = () => done(null);
      inp.onkeydown = e => { if(e.key==='Enter') ov.querySelector('#_pwok').click(); if(e.key==='Escape') done(null); };
    });
  }

  async function resetPassword(id, role) {
    const label = role==='student' ? `học sinh "${id}"` : `giáo viên "${id}"`;
    const newPw = await _promptPw(`Đặt lại mật khẩu cho ${label}`);
    if (newPw === null) return;  // cancelled or blank
    const pw = newPw || id;  // blank = use id as password
    try {
      const hash = await Utils.sha256(pw);
      await CL.API.adminResetPassword({ role, id, new_hash: hash, new_plain: pw });
      Toast.success(`🔑 Đã đặt lại mật khẩu cho ${id}. Mật khẩu mới: "${pw}"`);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  async function toggleActive(id, role, cur) {
    const action = cur ? 'Khoá' : 'Mở khoá';
    if (!await Toast.confirm(`${action} tài khoản "${id}"?`)) return;
    try {
      await CL.API.adminToggleActive({ role, id, active: !cur });
      Toast.success(`✅ Đã ${action.toLowerCase()} tài khoản ${id}`);
      CL.API._invalidate('users_'+role);
      _auTab(null, _curTab);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  async function deleteUser(id, role) {
    if (!await Toast.confirm(`🗑 Xoá tài khoản "${id}"?\n\nHành động này KHÔNG thể hoàn tác.`)) return;
    try {
      await CL.API.adminDeleteUser({ role, id });
      Toast.success(`✅ Đã xoá ${id}`);
      CL.API._invalidate('users_'+role);
      _auTab(null, _curTab);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  function _msg(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = 'pf-msg pf-msg-'+(type||'info');
  }

  return {
    render, _auTab,
    showStudentForm, saveStudent, _filterStu, _getStu, _getAdmin,
    showTeacherForm, saveTeacher, _filterGv, _getGv,
    showAdminForm, saveAdmin, resetAdminPw, deleteAdmin,
    _filterScores, _exportScoresCsv,
    resetPassword, toggleActive, deleteUser,
  };
});
