/**
 * core/store.js — Global State Store
 * ═══════════════════════════════════════════════════════════════
 * Lưu trữ state ứng dụng tập trung. Mọi module đọc/ghi state
 * thông qua đây thay vì dùng biến global.
 *
 * NGUYÊN TẮC:
 *   - State chỉ thay đổi qua Store.set()
 *   - Đọc qua Store.get()
 *   - Thay đổi state tự động emit event 'store:changed'
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/events.js
 */

'use strict';

CL.define('Store', () => {

  /** @type {Object.<string, *>} */
  const _state = {
    // Auth
    currentUser:      null,   // { role, name, mshs|username, lop, token }
    isAuthenticated:  false,

    // Exercise selection
    currentExId:      '',     // ID bài tập đang chọn
    currentExType:    '',     // 'python' | 'html' | 'sql'
    currentGrade:     '',     // 'K10' | 'K11' | ...
    currentChapter:   '',

    // Exam
    activeExams:      [],     // Kỳ thi đang mở

    // App
    isOnline:         true,
    lastError:        null,
  };

  /**
   * Lấy giá trị state
   * @param {string} key
   * @returns {*}
   */
  function get(key) {
    if (!(key in _state)) {
      console.warn(`[CL.Store] Key "${key}" chưa được khai báo trong store`);
    }
    return _state[key];
  }

  /**
   * Cập nhật state, tự emit 'store:changed'
   * @param {string} key
   * @param {*}      value
   */
  function set(key, value) {
    const prev = _state[key];
    _state[key] = value;
    // Emit nếu thực sự thay đổi (shallow compare)
    if (prev !== value) {
      CL.Events.emit('store:changed', { key, value, prev });
    }
  }

  /**
   * Cập nhật nhiều key cùng lúc
   * @param {Object} updates
   */
  function update(updates) {
    for (const [key, value] of Object.entries(updates)) {
      set(key, value);
    }
  }

  /**
   * Reset toàn bộ auth state khi logout
   */
  function resetAuth() {
    update({
      currentUser:     null,
      isAuthenticated: false,
    });
  }

  /**
   * Lấy snapshot toàn bộ state (deep clone, để debug)
   */
  function snapshot() {
    return JSON.parse(JSON.stringify(_state));
  }

  // ── Backward-compat: duy trì window.currentUser / window.currentExId
  // cho các file cũ chưa refactor
  CL.Events.on('store:changed', ({ key, value }) => {
    if (key === 'currentUser')  window.currentUser  = value;
    if (key === 'currentExId')  window.currentExId  = value;
  });

  return { get, set, update, resetAuth, snapshot };
});
