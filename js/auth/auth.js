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
      _applyRole(existing);
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
    location.reload();
  }

  function setScriptUrl(url) {
    localStorage.setItem(cfg.LS.SCRIPT_URL, url.trim());
  }

  // ── Render login screen ───────────────────────────────────────

  function _renderLoginScreen() {
    const ov = document.createElement('div');
    ov.id = 'auth-overlay';
    const hasUrl = !!localStorage.getItem(cfg.LS.SCRIPT_URL);
    ov.innerHTML = `
      <div class="auth-card">
        <!-- Logo / Brand -->
        <div class="auth-brand">
          <div class="auth-brand-icon">🖥️</div>
          <div class="auth-brand-name">${cfg.APP_NAME}</div>
          <div class="auth-brand-school">THPT Thủ Thiêm</div>
          <div class="auth-brand-sub">Hệ thống luyện tập &amp; kiểm tra lập trình</div>
        </div>

        <!-- Tab selector -->
        <div class="auth-tabs" role="tablist">
          <button class="auth-tab on" id="tab-student" role="tab"
            aria-selected="true" aria-controls="form-student"
            onclick="CL.Auth.UI._switchTab('student')">
            <span class="auth-tab-icon">🎓</span>
            <span>Học sinh</span>
          </button>
          <button class="auth-tab" id="tab-teacher" role="tab"
            aria-selected="false" aria-controls="form-teacher"
            onclick="CL.Auth.UI._switchTab('teacher')">
            <span class="auth-tab-icon">👨‍🏫</span>
            <span>Giáo viên</span>
          </button>
        </div>

        <!-- Student form -->
        <div id="form-student" class="auth-form" role="tabpanel">
          <div class="auth-field">
            <label for="in-mshs">Số định danh cá nhân (CCCD)</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🪪</span>
              <input id="in-mshs" type="text" inputmode="numeric"
                placeholder="12 số CCCD" maxlength="12"
                autocomplete="username" spellcheck="false"
                onkeydown="if(event.key==='Enter')document.getElementById('in-hs-pw').focus()">
            </div>
          </div>
          <div class="auth-field">
            <label for="in-hs-pw">Mật khẩu</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔑</span>
              <input id="in-hs-pw" type="password"
                placeholder="Nhập mật khẩu"
                autocomplete="current-password"
                onkeydown="if(event.key==='Enter')CL.Auth.UI._submit('student')">
              <button class="auth-eye" type="button"
                onclick="CL.Auth.UI._togglePw('in-hs-pw',this)">👁</button>
            </div>
          </div>
          <div class="auth-hint">💡 Mật khẩu mặc định = CCCD của bạn</div>
          <div class="auth-error" id="err-s" role="alert"></div>
          <button class="auth-submit-btn" id="btn-s"
            onclick="CL.Auth.UI._submit('student')">
            <span>Đăng nhập</span>
            <span class="auth-btn-arrow">→</span>
          </button>
        </div>

        <!-- Teacher / Admin form -->
        <div id="form-teacher" class="auth-form" role="tabpanel" style="display:none">
          <div class="auth-field">
            <label for="in-user">Tên đăng nhập</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">👤</span>
              <input id="in-user" type="text" placeholder="username"
                autocomplete="username" spellcheck="false"
                onkeydown="if(event.key==='Enter')document.getElementById('in-pass').focus()">
            </div>
          </div>
          <div class="auth-field">
            <label for="in-pass">Mật khẩu</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔑</span>
              <input id="in-pass" type="password"
                placeholder="Nhập mật khẩu"
                autocomplete="current-password"
                onkeydown="if(event.key==='Enter')CL.Auth.UI._submit('teacher')">
              <button class="auth-eye" type="button"
                onclick="CL.Auth.UI._togglePw('in-pass',this)">👁</button>
            </div>
          </div>
          <div class="auth-error" id="err-t" role="alert"></div>
          <button class="auth-submit-btn" id="btn-t"
            onclick="CL.Auth.UI._submit('teacher')">
            <span>Đăng nhập</span>
            <span class="auth-btn-arrow">→</span>
          </button>
        </div>

        <!-- Setup hint -->
        <div class="auth-setup-hint" id="auth-setup-hint"
          style="display:${hasUrl ? 'none' : 'flex'}">
          <span>⚙️ Chưa kết nối server</span>
          <a href="#" onclick="CL.Auth.UI._openSetup();return false">Thiết lập ngay →</a>
        </div>

        <!-- Footer -->
        <div class="auth-footer">
          <span>CodeLab v${cfg.APP_VERSION}</span>
          <span>THPT Thủ Thiêm · ${new Date().getFullYear()}</span>
        </div>
      </div>`;

    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
    setTimeout(() => document.getElementById('in-mshs')?.focus(), 300);
  }

  // ── Tab switching ─────────────────────────────────────────────

  function _switchTab(role) {
    ['student', 'teacher'].forEach(r => {
      document.getElementById(`tab-${r}`)?.classList.toggle('on', r === role);
      const form = document.getElementById(`form-${r}`);
      if (form) form.style.display = r === role ? 'block' : 'none';
    });
    setTimeout(() => {
      document.getElementById(role === 'student' ? 'in-mshs' : 'in-user')?.focus();
    }, 50);
  }

  // ── Submit ────────────────────────────────────────────────────

  async function _submit(role) {
    const btnId = role === 'student' ? 'btn-s' : 'btn-t';
    const errId = role === 'student' ? 'err-s' : 'err-t';

    const mshs    = document.getElementById('in-mshs')?.value.trim() || '';
    const username = document.getElementById('in-user')?.value.trim().toLowerCase() || '';
    const rawPwd  = document.getElementById(role === 'student' ? 'in-hs-pw' : 'in-pass')?.value.trim() || '';

    if (!rawPwd)                         return _showError(errId, 'Vui lòng nhập mật khẩu');
    if (role === 'student' && !mshs)     return _showError(errId, 'Vui lòng nhập MSHS');
    if (role === 'teacher' && !username) return _showError(errId, 'Vui lòng nhập tên đăng nhập');

    const url = localStorage.getItem(cfg.LS.SCRIPT_URL);
    if (!url) return _showError(errId, 'Chưa cấu hình server. Nhấn "Thiết lập ngay".');

    _setLoading(btnId, true);
    try {
      const password = await Utils.sha256(rawPwd);
      const creds    = role === 'student' ? { mshs, password } : { username, password };
      const data     = await CL.Data.Http.post(url, { action: 'login', role, ...creds });
      // data = { token, name, lop }
      const user = {
        role: data.role || role,  // Dùng role từ server (admin/teacher/student)
        token: data.token,
        name: data.name, lop: data.lop,
        ...(role === 'student' ? { mshs } : { username }),
      };
      Session.save(user);
      Store.update({ currentUser: user, isAuthenticated: true });
      _afterLogin(user);
    } catch (e) {
      _showError(errId, e.message || 'Lỗi kết nối server');
      _setLoading(btnId, false);
    }
  }

  function _afterLogin(user) {
    const ov = document.getElementById('auth-overlay');
    ov?.classList.remove('show');
    ov?.classList.add('hide');
    setTimeout(() => ov?.remove(), 400);
    // Hiện workspace (xoá class ẩn)
    document.body.classList.remove('auth-pending');
    _applyRole(user);
    // Log access (non-blocking)
    CL.Events?.emit('auth:login', { user });
    _onSuccess?.(user);
  }

  // ── Apply role to UI ──────────────────────────────────────────

  function _applyRole(user) {
    const isTeacher = user.role === 'teacher' || user.role === 'admin';
    const isAdmin   = user.role === 'admin';
    const hdr = document.querySelector('header');
    if (hdr && !document.getElementById('user-badge')) {
      const b = document.createElement('div');
      b.id = 'user-badge';
      const icon = isAdmin ? '⚡' : isTeacher ? '👨‍🏫' : '🎓';
      b.innerHTML = `
        <span class="ubadge ${user.role}">${icon}</span>
        <span class="uname">${Utils.escHtml(user.name)}${user.lop ? ' · ' + user.lop : ''}</span>
        <button class="u-profile-btn" onclick="CL.Features.Profile?.open()" title="Hồ sơ cá nhân">👤</button>
        ${isTeacher
          ? '<button class="u-tp-btn" onclick="CL.Teacher.Panel.open()" title="Bảng điều khiển">⚙️</button>'
          : ''}
        <button class="u-logout" onclick="CL.Auth.UI.logout()" title="Đăng xuất">↩</button>`;
      hdr.appendChild(b);
    }
    document.querySelectorAll('.teacher-only').forEach(el => {
      el.style.display = isTeacher ? '' : 'none';
    });
  }

  // ── Setup wizard opener ───────────────────────────────────────

  function _openSetup() {
    document.getElementById('auth-overlay')?.remove();
    if (typeof CL.Features?.Setup?.show === 'function') {
      CL.Features.Setup.show();
    } else {
      const url = prompt('🔗 Dán Apps Script Web App URL:');
      if (url?.trim()) {
        localStorage.setItem(cfg.LS.SCRIPT_URL, url.trim());
        location.reload();
      }
    }
  }

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

  return { init, logout, setScriptUrl, _switchTab, _submit, _openSetup, _togglePw };
});
