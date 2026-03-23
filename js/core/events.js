/**
 * core/events.js — EventBus (Pub/Sub)
 * ═══════════════════════════════════════════════════════════════
 * Giảm coupling giữa các module: thay vì module A gọi trực tiếp
 * module B, A chỉ emit event, B lắng nghe và phản ứng.
 *
 * ── DANH SÁCH EVENTS CHUẨN ─────────────────────────────────────
 *
 * Auth:
 *   'auth:login'            { user }         Đăng nhập thành công
 *   'auth:logout'           {}               Đăng xuất
 *   'auth:session-expired'  {}               Session hết hạn
 *
 * Exercise:
 *   'exercise:selected'     { exercise }     Chọn bài tập
 *   'exercise:cleared'      {}               Bỏ chọn bài
 *   'exercise:loaded'       { exercise }     Bài đã load xong
 *
 * Grade:
 *   'grade:submitted'       { exId, score }  Nộp điểm
 *   'grade:complete'        { result }       Chấm xong
 *
 * Exam:
 *   'exam:status-changed'   { examId, status }
 *   'exam:saved'            { exam }
 *
 * Violation:
 *   'violation:detected'    { type, count }  Phát hiện gian lận
 *   'violation:locked'      { exId }         Bị khóa bài
 *
 * API:
 *   'api:connected'         { latency }      Kết nối thành công
 *   'api:error'             { error }        Lỗi API
 *   'api:queue-flush'       { count }        Queue được flush
 *
 * UI:
 *   'ui:tab-changed'        { tab }          Đổi tab
 *   'ui:theme-changed'      { theme }        Đổi theme
 *
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js
 */

'use strict';

CL.define('Events', () => {

  /** @type {Map<string, Set<Function>>} */
  const _listeners = new Map();

  /**
   * Đăng ký lắng nghe event
   * @param {string}   event    - Tên event 'domain:action'
   * @param {Function} listener - Callback nhận data
   * @returns {Function} Hàm unsubscribe
   */
  function on(event, listener) {
    if (!_listeners.has(event)) _listeners.set(event, new Set());
    _listeners.get(event).add(listener);
    // Trả về hàm để dễ cleanup
    return () => off(event, listener);
  }

  /**
   * Đăng ký lắng nghe 1 lần duy nhất
   */
  function once(event, listener) {
    const wrapper = (data) => {
      listener(data);
      off(event, wrapper);
    };
    return on(event, wrapper);
  }

  /**
   * Hủy đăng ký
   */
  function off(event, listener) {
    _listeners.get(event)?.delete(listener);
  }

  /**
   * Phát sự kiện
   * @param {string} event - Tên event
   * @param {*}      data  - Dữ liệu đính kèm
   */
  function emit(event, data) {
    if (!_listeners.has(event)) return;
    // Clone để tránh vấn đề nếu listener tự off() trong callback
    const fns = [..._listeners.get(event)];
    for (const fn of fns) {
      try {
        fn(data);
      } catch (err) {
        console.error(`[CL.Events] Lỗi trong listener "${event}":`, err);
      }
    }
  }

  /**
   * Xem danh sách events đã đăng ký (debug)
   */
  function debug() {
    const info = {};
    for (const [event, set] of _listeners) {
      info[event] = set.size;
    }
    console.table(info);
  }

  return { on, once, off, emit, debug };
});
