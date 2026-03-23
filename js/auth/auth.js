/**
 * auth/auth.js — Login UI & Authentication Flow
 * ═══════════════════════════════════════════════════════════════
 * Trách nhiệm:
 *   - Render màn hình đăng nhập
 *   - Hash mật khẩu SHA-256 trước khi gửi
 *   - Gọi API login → lưu session → emit 'auth:login'
 *   - Áp dụng role vào UI (teacher/student)
 *
 * KHÔNG chứa: HTTP logic (→ Data.Http), session storage (→ Auth.Session)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, auth/session.js, data/http.js
 */

'use strict';

CL.define('Auth.UI', () => {

  const cfg     = CL.require('Config');
  const Utils   = CL.require('Utils');
  const Events  = CL.require('Events');
  const Store   = CL.require('Store');
  const Session = CL.require('Auth.Session');

  let _onSuccess = null;

  // ── Public API ────────────────────────────────────────────────

  /**
   * Khởi động auth: nếu có session hợp lệ → dùng ngay,
   * ngược lại → hiển thị màn hình login.
   * @param {Function} onReady - Callback nhận user object
   */
  function init(onReady) {
    _onSuccess = onReady;
    const existing = Session.get();
    if (existing) {
      // Session còn hợp lệ (F5) → khôi phục không login lại
      document.documentElement.classList.remove('auth-required');
      document.body.classList.remove('auth-pending');
      const shell = document.getElementById('app-shell');
      if (shell) { shell.style.removeProperty('display'); shell.style.removeProperty('visibility'); }
      _applyRole(existing);
      // Emit auth:login event TRƯỚC onReady để app.js có thể init sidebar
      CL.Events?.emit('auth:login', { user: existing });
      // Đảm bảo sidebar được init ngay lập tức nếu chưa init
      if (!document.querySelector('.sb-group')) {
        CL.Features.Sidebar?.init(existing.role);
      }
      onReady(existing);
    } else {
      _renderLoginScreen();
    }
  }

  /**
   * Đăng xuất: xóa session, emit event, reload UI
   */
  async function logout() {
    const token = Session.getToken();
    // Thông báo server (fire-and-forget)
    const url = localStorage.getItem(cfg.LS.SCRIPT_URL);
    if (url && token) {
      CL.Data.Http.postAsync(url, { action: 'logout', token });
    }
    Session.clear();
    Store.resetAuth();
    Events.emit('auth:logout', {});
    // Xóa localStorage sidebar state trước khi reload
    localStorage.removeItem('cl_sb_active');
    localStorage.removeItem('cl_sb_expanded');
    location.reload();
  }

  function setScriptUrl(url) {
    localStorage.setItem(cfg.LS.SCRIPT_URL, url.trim());
  }

  // ── Render login screen ───────────────────────────────────────

  function _renderLoginScreen() {
    // Đảm bảo app-shell bị ẩn hoàn toàn trong khi overlay chưa hiện
    document.body.classList.add('auth-pending');
    const shell = document.getElementById('app-shell');
    if (shell) shell.style.removeProperty('visibility'); // xoá inline style nếu có

    const ov = document.createElement('div');
    ov.id = 'auth-overlay';
    ov.innerHTML = `
      <div class="auth-card">
        <div class="auth-brand">
          <div class="auth-brand-icon">🖥️</div>
          <div class="auth-brand-name">${cfg.APP_NAME}</div>
          <div class="auth-brand-school">THPT Thủ Thiêm</div>
          <div class="auth-brand-sub">Hệ thống luyện tập &amp; kiểm tra lập trình</div>
        </div>

        <div class="auth-form">
          <input type="text" style="display:none" aria-hidden="true" tabindex="-1">
          <input type="password" style="display:none" aria-hidden="true" tabindex="-1">

          <div class="auth-field">
            <label for="in-id">Tài khoản</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon" id="in-id-icon">🪪</span>
              <input id="in-id" type="text"
                placeholder="CCCD (12 số) hoặc username"
                autocomplete="off" autocorrect="off" autocapitalize="off"
                spellcheck="false" name="cl-id-field"
                readonly
                onfocus="this.removeAttribute('readonly');CL.Auth.UI._detectType(this.value)"
                onclick="this.removeAttribute('readonly')"
                oninput="CL.Auth.UI._detectType(this.value)"
                onkeydown="if(event.key==='Enter')document.getElementById('in-pw').focus()">
            </div>
            <div class="auth-type-hint" id="auth-type-hint"></div>
          </div>

          <div class="auth-field">
            <label for="in-pw">Mật khẩu</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔑</span>
              <input id="in-pw" type="password"
                placeholder="Nhập mật khẩu"
                autocomplete="new-password" name="cl-pw-field"
                readonly
                onfocus="this.removeAttribute('readonly')"
                onclick="this.removeAttribute('readonly')"
                onkeydown="if(event.key==='Enter')CL.Auth.UI._submit()">
              <button class="auth-eye" type="button"
                onclick="CL.Auth.UI._togglePw('in-pw',this)">👁</button>
            </div>
          </div>

          <div class="auth-hint" id="auth-hint"><span id="in-pw-hint">💡 Học sinh nhập CCCD · Giáo viên nhập username</span></div>
          <div class="auth-error" id="err-main" role="alert"></div>

          <button class="auth-submit-btn" id="btn-main"
            onclick="CL.Auth.UI._submit()">
            <span>Đăng nhập</span>
            <span class="auth-btn-arrow">→</span>
          </button>
        </div>



        <div class="auth-footer">
          <span>CodeLab v${cfg.APP_VERSION}</span>
          <span>THPT Thủ Thiêm · ${new Date().getFullYear()}</span>
        </div>
      </div>`;

    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
    setTimeout(() => {
      const el = document.getElementById('in-id');
      if (el) { el.value = ''; el.focus(); }
      const pw = document.getElementById('in-pw');
      if (pw) pw.value = '';
    }, 400);
  }
  // ── Auto-detect user type from input ────────────────────────
  function _detectType(val) {
    const hint = document.getElementById('auth-type-hint');
    const icon = document.getElementById('in-id-icon');
    const pw   = document.getElementById('in-pw-hint');
    val = (val || '').trim();
    if (!val) {
      if (hint) { hint.textContent = ''; hint.className = 'auth-type-hint'; }
      if (icon) icon.textContent = '🪪';
      return;
    }
    const isStudent = /^\d{9,12}$/.test(val);
    if (isStudent) {
      if (hint) { hint.textContent = '🎓 Học sinh'; hint.className = 'auth-type-hint student'; }
      if (icon) icon.textContent = '🎓';
      if (pw)   pw.textContent   = 'Mật khẩu mặc định = CCCD của bạn';
    } else {
      if (hint) { hint.textContent = '👨‍🏫 Giáo viên / Admin'; hint.className = 'auth-type-hint teacher'; }
      if (icon) icon.textContent = '👨‍🏫';
      if (pw)   pw.textContent   = '';
    }
  }

  // ── Submit ────────────────────────────────────────────────────
  async function _submit() {
    const idVal  = (document.getElementById('in-id')?.value || '').trim();
    const rawPwd = (document.getElementById('in-pw')?.value  || '').trim();

    if (!idVal)   return _showError('err-main', 'Vui lòng nhập tài khoản');
    if (!rawPwd)  return _showError('err-main', 'Vui lòng nhập mật khẩu');

    const url = (cfg.DEPLOY_URL && cfg.DEPLOY_URL.startsWith('http'))
      ? cfg.DEPLOY_URL
      : localStorage.getItem(cfg.LS.SCRIPT_URL);
    if (!url) return _showError('err-main', '⚠️ Chưa cấu hình server. Liên hệ quản trị viên.');

    // Auto-detect: chỉ số 9-12 chữ số = học sinh, còn lại = giáo viên/admin
    const role = /^\d{9,12}$/.test(idVal) ? 'student' : 'teacher';

    // Cập nhật hint
    _detectType(idVal);

    const btn = document.getElementById('btn-main');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span>⏳ Đang đăng nhập...</span>'; }

    try {
      const password = await Utils.sha256(rawPwd);
      const creds = role === 'student'
        ? { mshs: idVal, password }
        : { username: idVal.toLowerCase(), password };

      const data = await CL.Data.Http.post(url, { action: 'login', role, ...creds });

      const user = {
        role: data.role || role,
        token: data.token,
        name: data.name, lop: data.lop,
        ...(role === 'student' ? { mshs: idVal } : { username: idVal.toLowerCase() }),
      };
      Session.save(user);
      Store.update({ currentUser: user, isAuthenticated: true });
      _afterLogin(user);
    } catch (e) {
      _showError('err-main', e.message || 'Tài khoản hoặc mật khẩu không đúng');
      if (btn) { btn.disabled = false; btn.innerHTML = '<span>Đăng nhập</span><span class="auth-btn-arrow">→</span>'; }
    }
  }

  // Giữ backward compat
  function _switchTab() {}

  function _afterLogin(user) {
    const ov = document.getElementById('auth-overlay');
    ov?.classList.remove('show');
    ov?.classList.add('hide');
    setTimeout(() => ov?.remove(), 400);
    // Hiện workspace — xoá tất cả auth guard classes
    document.body.classList.remove('auth-pending');
    document.documentElement.classList.remove('auth-required');
    const shell = document.getElementById('app-shell');
    if (shell) shell.style.removeProperty('display');
    _applyRole(user);
    // Log access (non-blocking)
    CL.Events?.emit('auth:login', { user });
    _onSuccess?.(user);
  }

  // ── Apply role to UI ──────────────────────────────────────────

  function _applyRole(user) {
    // Badge is now injected by app.js auth:login → sidebar init
    // Just handle teacher-only elements
    const isTeacher = user.role === 'teacher' || user.role === 'admin';
    document.querySelectorAll('.teacher-only').forEach(el => {
      el.style.display = isTeacher ? '' : 'none';
    });
  }


  /** @deprecated - URL managed in Cấu hình section */
  function _openSetup() {}
  function _saveUrl() {}
  function _showUrlInput() {}

  // ── Helpers ───────────────────────────────────────────────────

  function _showError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 4500);
  }

  function _setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? '⏳ Đang đăng nhập...' : 'Đăng nhập →';
  }

  // ── Backward compat ───────────────────────────────────────────
  window.Auth = { init, logout, setConfig: setScriptUrl,
                  getSession: Session.get, getConfig: () => ({ scriptUrl: localStorage.getItem(cfg.LS.SCRIPT_URL) || '' }) };

  function _togglePw(id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    el.type = el.type === 'password' ? 'text' : 'password';
    btn.textContent = el.type === 'password' ? '👁' : '🙈';
  }

  return { init, logout, setScriptUrl, _switchTab, _submit, _openSetup, _togglePw, _detectType };
});
