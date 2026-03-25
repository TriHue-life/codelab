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

  // ── CT2018 helpers ───────────────────────────────────────────

  /** Lấy năng lực CT2018 của 1 bài tập (derive từ Bloom nếu chưa tag) */
  function getNL(exercise) {
    if (exercise.nl && exercise.nl.length) return exercise.nl;
    const bloom = (exercise.lv || '').match(/B(\d)/)?.[1];
    if (!bloom) return [];
    const cfg = CL.require('Config');
    return cfg.BLOOM_NL_MAP?.['B' + bloom] || [];
  }

  /** Lấy nhóm Bloom theo TT26/2022 (Nhận biết / Thông hiểu / Vận dụng / VD cao) */
  function getBloomGroup(exercise) {
    const bloom = (exercise.lv || '').match(/B(\d)/)?.[1];
    if (!bloom) return 'Khác';
    const cfg = CL.require('Config');
    return cfg.BLOOM_TT26?.['B' + bloom] || 'Khác';
  }

  /** Lấy chủ đề chuẩn của bài tập (chu_de field hoặc derive từ ch) */
  function getChuyenDe(exercise) {
    if (exercise.chu_de) return exercise.chu_de;
    // Derive from ch: "Bài 17: Biến và lệnh gán" → "Biến và lệnh gán"
    return (exercise.ch || '').replace(/^Bài \d+[:\s]+/i, '').trim() || exercise.ch || '';
  }

  /** Tính Bloom distribution cho danh sách bài */
  function bloomDistribution(exercises) {
    const cfg = CL.require('Config');
    const dist = {};
    for (const ex of exercises) {
      const bloom = (ex.lv || '').match(/B(\d)/)?.[1];
      if (!bloom) continue;
      const group = cfg.BLOOM_TT26?.['B' + bloom] || 'B' + bloom;
      if (!dist[group]) dist[group] = { count: 0, pts: 0, exercises: [] };
      dist[group].count++;
      dist[group].pts += (ex._weight || 1);
      dist[group].exercises.push(ex.id);
    }
    return dist;
  }

  /** Tính ma trận đề: chủ đề × nhóm Bloom */
  function buildExamMatrix(exercises) {
    const matrix = {};   // { chu_de: { 'Nhận biết': [...], 'Thông hiểu': [...], ... } }
    for (const ex of exercises) {
      const cd    = getChuyenDe(ex);
      const group = getBloomGroup(ex);
      if (!matrix[cd]) matrix[cd] = {};
      if (!matrix[cd][group]) matrix[cd][group] = [];
      matrix[cd][group].push(ex);
    }
    return matrix;
  }

  // ── Lazy loading support ──────────────────────────────────────
  // Map: grade key prefix → JS file path
  const GRADE_FILE_MAP = {
    'K10':         'js/exercises.js?v=1080dba6',       // 784KB — Python K10 KNTT
    'K11':         'js/exercises_k12.js?v=97049c56',   // 508KB — Python K11 + K12 HTML
    'K12':         'js/exercises_k12.js?v=97049c56',
    'K12-CTST':    'js/exercises_k12.js?v=97049c56',   // K12 HTML/CSS CTST
    'K12-KNTT':    'js/exercises_k12.js?v=97049c56',   // K12 HTML/CSS KNTT
    'K11-SQL':     'js/exercises_sql.js?v=dbb62a5e',   // 699KB — SQL K11
    'K11-KNTT':    'js/exercises_sql.js?v=dbb62a5e',   // SQL exercises
  };

  const _loaded = new Set();  // track which files have been loaded

  async function ensureLoaded(gradeKey) {
    if (!gradeKey) return;

    // Determine which file to load
    const prefix = gradeKey.split('-')[0];  // 'K10', 'K11', etc.
    const file   = GRADE_FILE_MAP[gradeKey] || GRADE_FILE_MAP[prefix];
    if (!file || _loaded.has(file)) return;

    // Check if already loaded as a global
    if (gradeKey.startsWith('K10') && typeof EXERCISES !== 'undefined' && EXERCISES.length) {
      _loaded.add(file); _resetIndex(); return;
    }
    if ((gradeKey.startsWith('K11') || gradeKey.startsWith('K12')) && typeof EXERCISES_K12 !== 'undefined' && EXERCISES_K12.length) {
      _loaded.add(file); _resetIndex(); return;
    }
    if (gradeKey.toLowerCase().includes('sql') && typeof EXERCISES_SQL !== 'undefined' && EXERCISES_SQL.length) {
      _loaded.add(file); _resetIndex(); return;
    }

    // Lazy inject <script>
    await new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${file}"]`);
      if (existing) { _loaded.add(file); _resetIndex(); resolve(); return; }
      const s = document.createElement('script');
      s.src = file;
      s.onload = () => { _loaded.add(file); _resetIndex(); resolve(); };
      s.onerror = () => reject(new Error(`Không thể tải: ${file}`));
      document.head.appendChild(s);
    });
  }

  function isLoaded(gradeKey) {
    if (!gradeKey) return true;
    const prefix = gradeKey.split('-')[0];
    const file   = GRADE_FILE_MAP[gradeKey] || GRADE_FILE_MAP[prefix];
    return !file || _loaded.has(file);
  }

  return {
    findById, getAll, getByGrade, getByChapter,
    getChapters, count, stats,
    getNL, getBloomGroup, getChuyenDe, bloomDistribution, buildExamMatrix,
    ensureLoaded, isLoaded,
    _resetIndex, // internal use by sync
  };
});
