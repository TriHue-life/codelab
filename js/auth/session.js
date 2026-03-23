/**
 * auth/session.js — Session Storage Management
 * ═══════════════════════════════════════════════════════════════
 * Đóng gói mọi thao tác với sessionStorage liên quan đến auth.
 * Không chứa UI logic.
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js
 */

'use strict';

CL.define('Auth.Session', () => {

  const cfg = CL.require('Config');
  const KEY = cfg.SS.SESSION;

  /**
   * @typedef {Object} UserSession
   * @property {'teacher'|'student'} role
   * @property {string} token   - Server-side session token
   * @property {string} name    - Họ tên
   * @property {string} lop     - Lớp
   * @property {string} [mshs]  - MSHS (student only)
   * @property {string} [username] - Username (teacher only)
   * @property {string} [email]
   * @property {number} createdAt - timestamp
   */

  /**
   * Lưu session sau đăng nhập
   * @param {UserSession} user
   */
  function save(user) {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        ...user,
        createdAt: Date.now(),
      }));
    } catch (e) {
      console.error('[CL.Session] Không thể lưu session:', e);
    }
  }

  /**
   * Lấy session hiện tại
   * @returns {UserSession|null}
   */
  function get() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Kiểm tra TTL (8h)
      if (Date.now() - (data.createdAt || 0) > cfg.AUTH.TOKEN_TTL_MS) {
        clear();
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  /**
   * Lấy token từ session hiện tại
   * @returns {string}
   */
  function getToken() {
    return get()?.token || '';
  }

  /**
   * Kiểm tra có đang đăng nhập không
   */
  function isLoggedIn() {
    return !!get();
  }

  /**
   * Xóa session (logout)
   */
  function clear() {
    localStorage.removeItem(KEY);
  }

  /**
   * Kiểm tra role
   * @param {'teacher'|'student'} role
   */
  function hasRole(role) {
    return get()?.role === role;
  }

  return { save, get, getToken, isLoggedIn, clear, hasRole };
});
