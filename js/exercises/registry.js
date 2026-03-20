/**
 * exercises/registry.js — Exercise Registry
 * ═══════════════════════════════════════════════════════════════
 * Tập hợp và cung cấp API tra cứu thống nhất cho TẤT CẢ bài tập
 * (Python, HTML/CSS, SQL). Không quan tâm nguồn gốc file.
 *
 * NGUYÊN TẮC:
 *   - Registry là "nguồn sự thật duy nhất" (single source of truth)
 *     cho exercise lookup.
 *   - Các module khác KHÔNG được truy cập trực tiếp
 *     EXERCISES / EXERCISES_K12 / EXERCISES_SQL.
 *   - Dùng Registry.findById(id) thay vì
 *     [...EXERCISES, ...EXERCISES_K12].find(...)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js
 *
 * Load TRƯỚC: exercises.js, exercises_k12.js, exercises_sql.js
 * Load SAU này: mọi file dùng exercise lookup
 */

'use strict';

CL.define('Exercises.Registry', () => {

  const cfg = CL.require('Config');

  // ── Lazy-build index để tránh build khi load ─────────────────
  /** @type {Map<string, Object>|null} */
  let _indexById   = null;
  let _all         = null;

  function _getAll() {
    if (_all) return _all;
    _all = [
      ...(typeof EXERCISES     !== 'undefined' ? EXERCISES     : []),
      ...(typeof EXERCISES_K12 !== 'undefined' ? EXERCISES_K12 : []),
      ...(typeof EXERCISES_SQL !== 'undefined' ? EXERCISES_SQL : []),
    ];
    return _all;
  }

  function _getIndex() {
    if (_indexById) return _indexById;
    _indexById = new Map();
    for (const ex of _getAll()) {
      _indexById.set(ex.id, ex);
    }
    return _indexById;
  }

  /**
   * Tìm bài tập theo ID — O(1)
   * @param {string} id
   * @returns {Object|undefined}
   */
  function findById(id) {
    return _getIndex().get(id);
  }

  /**
   * Lấy tất cả bài tập
   * @returns {Object[]}
   */
  function getAll() {
    return _getAll();
  }

  /**
   * Lấy bài tập theo grade key (K10, K11, K11-SQL, K12-CTST, K12-KNTT)
   * @param {string} gradeKey
   * @returns {Object[]}
   */
  function getByGrade(gradeKey) {
    return _getAll().filter(ex => _getGradeKey(ex) === gradeKey);
  }

  /**
   * Lấy bài tập theo chapter trong một grade
   * @param {string} gradeKey
   * @param {string} chapter
   * @returns {Object[]}
   */
  function getByChapter(gradeKey, chapter) {
    return getByGrade(gradeKey).filter(ex => ex.ch === chapter);
  }

  /**
   * Lấy danh sách chapters của một grade
   * @param {string} gradeKey
   * @returns {string[]}
   */
  function getChapters(gradeKey) {
    const seen = new Set();
    const result = [];
    for (const ex of getByGrade(gradeKey)) {
      if (!seen.has(ex.ch)) { seen.add(ex.ch); result.push(ex.ch); }
    }
    return result;
  }

  /**
   * Tổng số bài tập
   */
  function count() {
    return _getAll().length;
  }

  /**
   * Thống kê theo type
   * @returns {Object.<string, number>}
   */
  function stats() {
    const s = { python: 0, html: 0, sql: 0, total: 0 };
    for (const ex of _getAll()) {
      s[ex.type || 'python'] = (s[ex.type || 'python'] || 0) + 1;
      s.total++;
    }
    return s;
  }

  // ── Private helpers ───────────────────────────────────────────

  /** Map exercise → grade key cho dropdown */
  function _getGradeKey(ex) {
    // SQL exercises: dùng key riêng 'K11-SQL' thay vì 'K11-KNTT'
    if (ex.type === 'sql') return ex.g + '-SQL';  // K11-SQL
    // HTML/CSS K12: dùng bộ sách làm phân loại
    if (ex.bo && ex.type === 'html') return `${ex.g}-${ex.bo}`;  // K12-CTST, K12-KNTT
    // Python K10, K11: dùng lớp
    return ex.g;
  }

  // ── Invalidate index khi exercises reload (dynamic import) ───
  function _resetIndex() {
    _indexById = null;
    _all       = null;
  }

  // Expose reset cho trường hợp sync exercises từ Sheets
  CL.Events?.on('exercise:synced', _resetIndex);

  return {
    findById, getAll, getByGrade, getByChapter,
    getChapters, count, stats,
    _resetIndex, // internal use by sync
  };
});
