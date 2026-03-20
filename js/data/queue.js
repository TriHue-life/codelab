/**
 * data/queue.js — Write Queue (Fire-and-Forget với Retry)
 * ═══════════════════════════════════════════════════════════════
 * Đảm bảo các write operation (nộp điểm, log) không bị mất dù
 * mạng chập chờn, xử lý 200+ user đồng thời không bị flood.
 *
 * Chiến lược:
 *   - Ghi vào queue ngay lập tức (non-blocking)
 *   - Worker xử lý tuần tự, retry với exponential backoff
 *   - Tối đa MAX_TRIES lần, sau đó discard
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js, core/events.js, data/http.js
 */

'use strict';

CL.define('Data.Queue', () => {

  const cfg = CL.require('Config');

  /** @type {{ action:string, body:Object, tries:number }[]} */
  const _queue  = [];
  let   _busy   = false;

  /**
   * Thêm operation vào queue
   * @param {string} action - Apps Script action name
   * @param {Object} body   - Request body
   */
  function enqueue(action, body) {
    _queue.push({ action, body, tries: 0 });
    if (!_busy) _processNext();
  }

  /**
   * Số items đang chờ trong queue
   */
  function size() { return _queue.length; }

  // ── Worker ────────────────────────────────────────────────────

  async function _processNext() {
    if (!_queue.length) { _busy = false; return; }
    _busy = true;

    const item = _queue[0];
    item.tries++;

    const url = localStorage.getItem(cfg.LS.SCRIPT_URL);
    if (!url) {
      // Chưa cấu hình URL — giữ trong queue, thử lại sau
      setTimeout(_processNext, 5_000);
      return;
    }

    try {
      await CL.Data.Http.post(url, { action: item.action, ...item.body });
      _queue.shift(); // thành công
      CL.Events.emit('api:queue-flush', { action: item.action });
    } catch (err) {
      if (item.tries >= cfg.API.QUEUE_MAX_TRIES) {
        console.warn(`[CL.Queue] Bỏ qua sau ${item.tries} lần thử: ${item.action}`);
        _queue.shift();
      } else {
        // Exponential backoff
        const delay = cfg.API.QUEUE_BACKOFF_MS * item.tries;
        await new Promise(r => setTimeout(r, delay));
      }
    }

    _processNext();
  }

  return { enqueue, size };
});
