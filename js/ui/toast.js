/**
 * ui/toast.js — Toast Notifications
 * ═══════════════════════════════════════════════════════════════
 * Hiển thị thông báo tạm thời (toast) và modal confirm.
 * Thay thế window.alert() và hàm toast() global cũ.
 *
 * Public API:
 *   CL.UI.Toast.show(msg, type?, durationMs?)
 *   CL.UI.Toast.success(msg)
 *   CL.UI.Toast.error(msg)
 *   CL.UI.Toast.warn(msg)
 *   CL.UI.Toast.confirm(msg) → Promise<boolean>
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js
 */

'use strict';

CL.define('UI.Toast', () => {

  let _container = null;

  function _getContainer() {
    if (!_container) {
      _container = document.createElement('div');
      _container.id = 'cl-toast-container';
      _container.style.cssText = `
        position:fixed; bottom:24px; right:24px; z-index:99999;
        display:flex; flex-direction:column; gap:8px; align-items:flex-end;
        pointer-events:none;`;
      document.body.appendChild(_container);
    }
    return _container;
  }

  /**
   * @param {string}  msg
   * @param {'info'|'success'|'error'|'warn'} [type='info']
   * @param {number}  [durationMs=3000]
   */
  function show(msg, type = 'info', durationMs = 3000) {
    const colors = {
      info:    { bg: '#1e293b', border: '#4f9eff', icon: 'ℹ️' },
      success: { bg: '#052e16', border: '#4ade80', icon: '✅' },
      error:   { bg: '#2d0a0a', border: '#f87171', icon: '❌' },
      warn:    { bg: '#2d1f00', border: '#facc15', icon: '⚠️' },
    };
    const c = colors[type] || colors.info;

    const el = document.createElement('div');
    el.style.cssText = `
      background:${c.bg}; border:1px solid ${c.border}; border-radius:10px;
      padding:10px 16px; font-size:13px; color:#f1f5f9;
      font-family:system-ui,sans-serif; box-shadow:0 4px 20px rgba(0,0,0,.4);
      pointer-events:all; cursor:pointer; max-width:320px; line-height:1.5;
      animation: cl-toast-in .25s ease both;`;
    el.innerHTML = `${c.icon} ${msg}`;
    el.onclick = () => _remove(el);

    _getContainer().appendChild(el);
    setTimeout(() => _remove(el), durationMs);
    return el;
  }

  function _remove(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    el.style.transition = 'all .2s';
    setTimeout(() => el.remove(), 200);
  }

  function success(msg, ms) { return show(msg, 'success', ms); }
  function error(msg, ms)   { return show(msg, 'error',   ms || 5000); }
  function warn(msg, ms)    { return show(msg, 'warn',    ms); }

  /**
   * Modal confirm (thay window.confirm)
   * @param {string} msg
   * @returns {Promise<boolean>}
   */
  function confirm(msg) {
    return new Promise(resolve => {
      const ov = document.createElement('div');
      ov.style.cssText = `
        position:fixed;inset:0;z-index:100000;
        background:rgba(0,0,0,.6);backdrop-filter:blur(4px);
        display:flex;align-items:center;justify-content:center;`;
      ov.innerHTML = `
        <div style="background:#1e2433;border:1px solid #334155;border-radius:14px;
          padding:24px;max-width:360px;width:90%;font-family:system-ui,sans-serif">
          <div style="font-size:14px;color:#f1f5f9;line-height:1.6;margin-bottom:20px">${msg}</div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button id="cl-confirm-no"  style="padding:8px 18px;border:1px solid #475569;
              background:none;border-radius:8px;color:#94a3b8;cursor:pointer;font-size:13px">Hủy</button>
            <button id="cl-confirm-yes" style="padding:8px 18px;background:#4f9eff;
              border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:13px;font-weight:700">OK</button>
          </div>
        </div>`;
      document.body.appendChild(ov);

      const done = (v) => { ov.remove(); resolve(v); };
      ov.querySelector('#cl-confirm-yes').onclick = () => done(true);
      ov.querySelector('#cl-confirm-no').onclick  = () => done(false);
    });
  }

  // Inject CSS animation
  if (!document.getElementById('cl-toast-style')) {
    const s = document.createElement('style');
    s.id = 'cl-toast-style';
    s.textContent = `@keyframes cl-toast-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}`;
    document.head.appendChild(s);
  }

  // ── Backward compat: window.toast() ──────────────────────────
  window.toast = (msg, ms) => show(msg, 'info', ms);

  return { show, success, error, warn, confirm };
});
