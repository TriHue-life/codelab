/**
 * data/cache.js — Stale-While-Revalidate Cache
 * ═══════════════════════════════════════════════════════════════
 * 2 tầng cache:
 *   1. Memory (_mem) — nhanh, mất khi reload trang
 *   2. localStorage ('cl_c_*') — bền, tồn tại qua reload
 *
 * Chiến lược SWR:
 *   - Nếu cache FRESH → trả ngay
 *   - Nếu cache STALE → trả cache cũ + refresh nền
 *   - Nếu cache MISS  → fetch, đợi kết quả
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js
 */

'use strict';

CL.define('Data.Cache', () => {

  const cfg = CL.require('Config');

  /** @type {Map<string, {data:*, exp:number, ts:number}>} */
  const _mem = new Map();

  // ── Restore from localStorage on boot ────────────────────────
  (function _restore() {
    const pfx = cfg.LS.CACHE_PREFIX;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k?.startsWith(pfx)) continue;
      try {
        const entry = JSON.parse(localStorage.getItem(k));
        // Giữ extra 1h sau khi hết hạn (cho SWR stale)
        if (entry && Date.now() < entry.exp + 3_600_000) {
          _mem.set(k.slice(pfx.length), entry);
        } else {
          localStorage.removeItem(k);
        }
      } catch { localStorage.removeItem(k); }
    }
  })();

  /**
   * Lấy từ cache
   * @param {string} key
   * @returns {{ data:*, stale:boolean }|null}
   */
  function get(key) {
    const entry = _mem.get(key);
    if (!entry) return null;
    return { data: entry.data, stale: Date.now() > entry.exp };
  }

  /**
   * Lưu vào cache
   * @param {string} key
   * @param {*}      data
   * @param {number} ttlMs
   */
  function set(key, data, ttlMs) {
    const entry = { data, exp: Date.now() + ttlMs, ts: Date.now() };
    _mem.set(key, entry);
    // Persist một số cache quan trọng vào localStorage
    if (_shouldPersist(key)) {
      try {
        localStorage.setItem(cfg.LS.CACHE_PREFIX + key, JSON.stringify(entry));
      } catch {}
    }
  }

  /**
   * Xóa theo prefix
   * @param {string} prefix
   */
  function invalidate(prefix) {
    for (const key of [..._mem.keys()]) {
      if (key.startsWith(prefix)) _mem.delete(key);
    }
    const pfx = cfg.LS.CACHE_PREFIX + prefix;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k?.startsWith(pfx)) localStorage.removeItem(k);
    }
  }

  /**
   * Xóa tất cả cache (logout hoặc manual cleanup)
   */
  function clear() {
    _mem.clear();
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k?.startsWith(cfg.LS.CACHE_PREFIX)) localStorage.removeItem(k);
    }
  }

  /**
   * Dọn dẹp cache hết hạn (gọi mỗi ngày)
   * @returns {number} Số entries đã xóa
   */
  function cleanup() {
    const now = Date.now();
    let count = 0;
    // Memory
    for (const [k, e] of _mem) {
      if (now > e.exp + 86_400_000) { _mem.delete(k); count++; }
    }
    // localStorage
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (!k?.startsWith(cfg.LS.CACHE_PREFIX)) continue;
      try {
        const e = JSON.parse(localStorage.getItem(k));
        if (now > e.exp + 86_400_000) { localStorage.removeItem(k); count++; }
      } catch { localStorage.removeItem(k); count++; }
    }
    localStorage.setItem(cfg.LS.LAST_CLEANUP, String(now));
    return count;
  }

  /**
   * SWR helper: đọc cache + fetch nền nếu stale
   * @param {string}   key     - Cache key
   * @param {number}   ttlMs   - TTL
   * @param {Function} fetcher - async () => data
   * @param {boolean}  [force] - Bỏ qua cache, luôn fetch
   * @returns {Promise<*>}
   */
  async function swr(key, ttlMs, fetcher, force = false) {
    const cached = get(key);
    if (cached && !cached.stale && !force) return cached.data;
    if (cached && cached.stale && !force) {
      // Trả ngay, refresh nền
      fetcher().then(data => set(key, data, ttlMs)).catch(() => {});
      return cached.data;
    }
    const data = await fetcher();
    set(key, data, ttlMs);
    return data;
  }

  // ── Private ───────────────────────────────────────────────────
  function _shouldPersist(key) {
    return key.startsWith('exams') || key.startsWith('exercise_');
  }

  // ── Auto daily cleanup ────────────────────────────────────────
  const lastCleanup = parseInt(localStorage.getItem(cfg.LS.LAST_CLEANUP) || '0');
  if (Date.now() - lastCleanup > 23 * 3_600_000) {
    setTimeout(() => {
      const n = cleanup();
      if (n > 0) console.info(`[CL.Cache] Dọn ${n} entries hết hạn`);
    }, 3000);
  }

  return { get, set, invalidate, clear, cleanup, swr };
});
