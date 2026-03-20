/**
 * data/http.js — HTTP Client
 * ═══════════════════════════════════════════════════════════════
 * Wrapper mỏng quanh fetch() với:
 *   - Timeout tự động
 *   - Chuẩn hóa lỗi
 *   - Không biết về business logic (cache, queue, auth)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js
 */

'use strict';

CL.define('Data.Http', () => {

  const cfg = CL.require('Config');

  /**
   * POST JSON đến Apps Script backend
   * @param {string} url
   * @param {Object} body
   * @param {number} [timeoutMs]
   * @returns {Promise<*>} data field từ response
   * @throws {Error} Nếu !response.ok hoặc timeout
   */
  async function post(url, body, timeoutMs = cfg.API.TIMEOUT_MS) {
    _assertUrl(url);
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res  = await fetch(url, {
        method:  'POST',
        redirect: 'follow',
        body:    JSON.stringify(body),
        signal:  ctrl.signal,
      });
      return _parseResponse(res);
    } catch (err) {
      throw _normalizeError(err);
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * GET với query string từ Apps Script backend
   * @param {string} url
   * @param {Object} params
   * @param {number} [timeoutMs]
   * @returns {Promise<*>}
   */
  async function get(url, params = {}, timeoutMs = cfg.API.TIMEOUT_MS) {
    _assertUrl(url);
    const qs  = new URLSearchParams(params);
    const res = await fetch(`${url}?${qs}`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    return _parseResponse(res);
  }

  /**
   * POST fire-and-forget (mode no-cors, không đợi response)
   * Dùng cho log access — không block UI, không cần response
   */
  function postAsync(url, body) {
    if (!url) return;
    fetch(url, {
      method:  'POST',
      redirect: 'follow',
      body:    JSON.stringify(body),
    }).catch(() => {}); // silent fail
  }

  // ── Helpers ──────────────────────────────────────────────────

  async function _parseResponse(res) {
    let data;
    try { data = await res.json(); }
    catch { throw new Error(`Server trả về response không phải JSON (status ${res.status})`); }
    if (!data.ok) throw new Error(data.error || `API error (status ${res.status})`);
    return data.data;
  }

  function _assertUrl(url) {
    if (!url) throw new Error('Chưa cấu hình Apps Script URL. Vào ⚙️ Cấu hình để thiết lập.');
  }

  function _normalizeError(err) {
    if (err.name === 'AbortError') {
      return new Error('Kết nối quá lâu (timeout). Kiểm tra kết nối mạng.');
    }
    return err;
  }

  return { post, get, postAsync };
});
