/**
 * core/utils.js — Pure Utility Functions
 * ═══════════════════════════════════════════════════════════════
 * NGUYÊN TẮC:
 *   - Hàm thuần túy (pure): không có side effects, không đọc/ghi
 *     state bên ngoài trừ tham số truyền vào.
 *   - Không import bất kỳ CL module nào khác.
 *   - Có thể unit test độc lập.
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js
 */

'use strict';

CL.define('Utils', () => {

  // ── String / HTML ─────────────────────────────────────────────

  /**
   * Escape HTML entities để tránh XSS
   * @param {*} value
   * @returns {string}
   */
  function escHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Strip HTML tags, trả về plain text
   * @param {string} html
   * @returns {string}
   */
  function stripHtml(html) {
    return String(html || '')
      .replace(/<pre[^>]*>/gi, '\n')
      .replace(/<\/pre>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /**
   * Truncate string, thêm '...' nếu dài hơn max
   */
  function truncate(str, max = 100) {
    const s = String(str || '');
    return s.length > max ? s.slice(0, max) + '…' : s;
  }

  // ── Date / Time ───────────────────────────────────────────────

  /**
   * Format timestamp thành dd/MM HH:mm
   * @param {string|Date} ts
   * @returns {string}
   */
  function formatTime(ts) {
    if (!ts) return '—';
    const d = ts instanceof Date ? ts : new Date(ts);
    if (isNaN(d.getTime())) return String(ts);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getDate()}/${d.getMonth() + 1} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  /**
   * Format timestamp thành ISO string (cho log)
   */
  function nowISO() {
    return new Date().toISOString();
  }

  // ── Number ────────────────────────────────────────────────────

  /**
   * Phân loại điểm thành CSS class
   * @param {number|string} score
   * @returns {'score-hi'|'score-md'|'score-lo'}
   */
  function scoreClass(score) {
    const n = parseFloat(score);
    if (n >= 8) return 'score-hi';
    if (n >= 5) return 'score-md';
    return 'score-lo';
  }

  /**
   * Tính phần trăm, làm tròn 1 chữ số
   */
  function calcPercent(earned, total) {
    if (!total) return 0;
    return Math.round((earned / total) * 1000) / 10;
  }

  // ── Crypto ────────────────────────────────────────────────────

  /**
   * SHA-256 hash chuỗi (async, Web Crypto API)
   * @param {string} str
   * @returns {Promise<string>} hex string
   */
  async function sha256(str) {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(str)
    );
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // ── CSV / Export ──────────────────────────────────────────────

  /**
   * Escape một cell CSV
   */
  function csvCell(val) {
    const s = String(val ?? '').replace(/"/g, '""');
    return (s.includes(',') || s.includes('\n') || s.includes('"'))
      ? `"${s}"`
      : s;
  }

  /**
   * Tạo và download file CSV
   * @param {string[][]} rows  - Mảng 2 chiều
   * @param {string}     fname - Tên file
   */
  function downloadCsv(rows, fname) {
    const csv = '\uFEFF' + rows.map(r => r.map(csvCell).join(',')).join('\n');
    const a   = Object.assign(document.createElement('a'), {
      href:     URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })),
      download: fname,
    });
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }

  // ── DOM ───────────────────────────────────────────────────────

  /**
   * Lấy element theo id, throw nếu không tìm thấy (debug helper)
   */
  function getEl(id) {
    const el = document.getElementById(id);
    if (!el) console.warn(`[CL.Utils] Element #${id} không tồn tại`);
    return el;
  }

  /**
   * Tạo element từ HTML string (trả về HTMLElement đầu tiên)
   */
  function createEl(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstElementChild;
  }

  // ── Object ────────────────────────────────────────────────────

  /**
   * Deep clone (JSON-safe)
   */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Safe JSON parse, trả về fallback nếu lỗi
   */
  function safeJsonParse(str, fallback = null) {
    try { return JSON.parse(str); }
    catch { return fallback; }
  }

  // ── Array ─────────────────────────────────────────────────────

  /**
   * Group array by key function
   * @returns {Object.<string, Array>}
   */
  function groupBy(arr, keyFn) {
    return arr.reduce((acc, item) => {
      const key = keyFn(item);
      (acc[key] = acc[key] || []).push(item);
      return acc;
    }, {});
  }

  /**
   * Unique array by key function
   */
  function uniqueBy(arr, keyFn) {
    const seen = new Set();
    return arr.filter(item => {
      const k = keyFn(item);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  // ── Public API ────────────────────────────────────────────────
  return {
    escHtml, stripHtml, truncate,
    formatTime, nowISO,
    scoreClass, calcPercent,
    sha256,
    csvCell, downloadCsv,
    getEl, createEl,
    deepClone, safeJsonParse,
    groupBy, uniqueBy,
  };
});
