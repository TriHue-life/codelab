// ══════════════════════════════════════════════════════════════════
//  auth.js — Xác thực người dùng qua Apps Script backend
//  Không có API Key hay Spreadsheet ID ở client.
//  Mật khẩu được hash SHA-256 trước khi gửi.
// ══════════════════════════════════════════════════════════════════
const Auth = (function () {
  'use strict';

  const SESSION_KEY = 'cl_session_v3';

  // ── SHA-256 hash mật khẩu trước khi gửi ─────────────────────────
  async function hashPwd(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Session ──────────────────────────────────────────────────────
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch { return null; }
  }
  function setSession(u) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
  function clearSession() { sessionStorage.removeItem(SESSION_KEY); }
  function logout() { clearSession(); location.reload(); }
  function getConfig() { return { scriptUrl: API.getScriptUrl() }; }
  function setConfig(scriptUrl) { API.setScriptUrl(scriptUrl); }

  // ── Màn hình đăng nhập ──────────────────────────────────────────
  function showLogin(onSuccess) {
    const ov = document.createElement('div');
    ov.id = 'auth-overlay';
    ov.innerHTML = `
<div class="auth-card">
  <div class="auth-logo">
    <div class="auth-logo-icon">🐍</div>
    <div class="auth-logo-text">CodeLab</div>
    <div class="auth-logo-sub">THPT</div>
  </div>

  <div class="auth-tabs">
    <button class="auth-tab on" id="tab-student" onclick="Auth._tab('student')">🎓 Học sinh</button>
    <button class="auth-tab"   id="tab-teacher" onclick="Auth._tab('teacher')">👨‍🏫 Giáo viên</button>
  </div>

  <div id="form-student" class="auth-form">
    <div class="auth-field"><label>Mã số học sinh (MSHS)</label>
      <input id="in-mshs" type="text" placeholder="HS2024001"
        autocomplete="username" spellcheck="false"
        onkeydown="if(event.key==='Enter')document.getElementById('in-hs-pw').focus()">
    </div>
    <div class="auth-field"><label>Mật khẩu</label>
      <input id="in-hs-pw" type="password" placeholder="••••••••"
        autocomplete="current-password"
        onkeydown="if(event.key==='Enter')Auth._doLogin('student')">
    </div>
    <div class="auth-error" id="err-s"></div>
    <button class="auth-btn" id="btn-s" onclick="Auth._doLogin('student')">Đăng nhập →</button>
  </div>

  <div id="form-teacher" class="auth-form" style="display:none">
    <div class="auth-field"><label>Tên đăng nhập</label>
      <input id="in-user" type="text" placeholder="username"
        autocomplete="username" spellcheck="false"
        onkeydown="if(event.key==='Enter')document.getElementById('in-pass').focus()">
    </div>
    <div class="auth-field"><label>Mật khẩu</label>
      <input id="in-pass" type="password" placeholder="••••••••"
        autocomplete="current-password"
        onkeydown="if(event.key==='Enter')Auth._doLogin('teacher')">
    </div>
    <div class="auth-error" id="err-t"></div>
    <button class="auth-btn" id="btn-t" onclick="Auth._doLogin('teacher')">Đăng nhập →</button>
  </div>

  <div class="auth-setup-hint" id="auth-setup-hint"
    style="display:${API.isConfigured()?'none':'flex'}">
    ⚙️ Chưa kết nối server —
    <a href="#" onclick="Auth._firstSetup();return false">Thiết lập ngay</a>
  </div>
</div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
    setTimeout(() => document.getElementById('in-mshs').focus(), 300);
    Auth._cb = onSuccess;
  }

  function _tab(t) {
    ['student','teacher'].forEach(x => {
      document.getElementById('tab-'+x).classList.toggle('on', x===t);
      document.getElementById('form-'+x).style.display = x===t?'block':'none';
    });
    setTimeout(() => document.getElementById(t==='student'?'in-mshs':'in-user').focus(), 50);
  }

  function _err(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg; el.style.opacity = '1';
    setTimeout(() => el.style.opacity = '0', 4500);
  }

  function _setBtn(id, loading) {
    const b = document.getElementById(id);
    if (b) { b.disabled = loading; b.textContent = loading ? '⏳ Đang đăng nhập...' : 'Đăng nhập →'; }
  }

  async function _doLogin(role) {
    const btnId = role === 'student' ? 'btn-s' : 'btn-t';
    const errId = role === 'student' ? 'err-s' : 'err-t';

    const mshs = (document.getElementById('in-mshs')?.value || '').trim();
    const name = '';
    const user = (document.getElementById('in-user')?.value || '').trim().toLowerCase();
    const rawPass = role === 'student'
      ? (document.getElementById('in-hs-pw')?.value || '').trim()
      : (document.getElementById('in-pass')?.value || '').trim();

    if (!rawPass) { _err(errId, 'Vui lòng nhập mật khẩu'); return; }
    if (role === 'student' && !mshs) { _err(errId, 'Vui lòng nhập MSHS'); return; }
    if (role === 'teacher' && !user) { _err(errId, 'Vui lòng nhập tên đăng nhập'); return; }

    if (!API.isConfigured()) { _err(errId, 'Chưa cấu hình server'); return; }

    _setBtn(btnId, true);
    try {
      const password = await hashPwd(rawPass);
      const creds = role === 'student' ? { mshs, password } : { username: user, password };
      const data  = await API.login(role, creds);
      // data = { token, name, lop }
      const session = { role, token: data.token, name: data.name, lop: data.lop,
                        ...(role==='student' ? {mshs} : {username:user}), time: Date.now() };
      setSession(session);
      _afterLogin(session);
    } catch(e) {
      _err(errId, e.message || 'Lỗi kết nối server');
      _setBtn(btnId, false);
    }
  }

  function _afterLogin(user) {
    const ov = document.getElementById('auth-overlay');
    ov.classList.remove('show'); ov.classList.add('hide');
    setTimeout(() => ov.remove(), 400);
    _applyRole(user);
    // Ghi lịch sử đăng nhập (non-blocking)
    API.logAccess('login', `${user.role}:${user.mshs||user.username}`);
    if (Auth._cb) Auth._cb(user);
  }

  function _applyRole(user) {
    const isGV = user.role === 'teacher';
    const hdr  = document.querySelector('header');
    if (hdr && !document.getElementById('user-badge')) {
      const b = document.createElement('div');
      b.id = 'user-badge';
      b.innerHTML = `
        <span class="ubadge ${user.role}">${isGV?'👨‍🏫':'🎓'}</span>
        <span class="uname">${user.name}${user.lop?' · '+user.lop:''}</span>
        ${isGV ? '<button class="u-tp-btn" onclick="TeacherPanel.open()" title="Bảng điều khiển">⚙️</button>' : ''}
        <button class="u-logout" onclick="Auth.logout()" title="Đăng xuất">↩</button>`;
      hdr.appendChild(b);
    }
    document.querySelectorAll('.teacher-only').forEach(el => el.style.display = isGV?'':'none');
    if (isGV && typeof antitabDisable === 'function') antitabDisable();
    window.currentUser = user;
  }

  function _firstSetup() {
    const ov = document.getElementById('auth-overlay');
    if (ov) ov.style.display = 'none';
    if (typeof SetupWizard !== 'undefined') {
      SetupWizard.show();
    } else {
      const url = prompt('🔗 Dán Apps Script Web App URL:');
      if (url?.trim()) { API.setUrl(url.trim()); if(ov) ov.style.display=''; location.reload(); }
    }
  }

  function init(onReady) {
    const s = getSession();
    if (s) { _applyRole(s); onReady(s); }
    else showLogin(onReady);
  }

  return { init, logout, getSession, getConfig, setConfig,
           _tab, _doLogin, _firstSetup };
})();
