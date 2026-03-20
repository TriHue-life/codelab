/**
 * graders/python.js — Python Code Grader Engine
 * ═══════════════════════════════════════════════════════════════
 * Trách nhiệm:
 *   - Chấm bài Python theo rubric (keyword matching)
 *   - So sánh output với expected (float tolerance ±0.01)
 *   - Phát 'grade:complete' event với kết quả
 *
 * KHÔNG chứa: UI rendering (→ ui/results.js), score submission (→ api.js)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, exercises/registry.js
 */

'use strict';

CL.define('Graders.Python', () => {

  const cfg      = CL.require('Config');
  const Utils    = CL.require('Utils');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');

  /**
   * Chấm bài cho exercise hiện tại
   * @param {string} code       - Code Python của học sinh
   * @param {string} output     - Output thực tế từ interpreter
   * @param {string} exerciseId - ID bài tập
   * @returns {{ score:number, results:Array, total:number, earned:number }}
   */
  function grade(code, output, exerciseId) {
    const ex = Registry.findById(exerciseId);
    if (!ex) throw new Error(`Không tìm thấy bài tập: ${exerciseId}`);

    const rb = ex.rb || [];
    if (!rb.length) throw new Error('Bài này chưa có tiêu chí chấm');

    const results = rb.map(criterion => {
      const passed = _checkCriterion(code, output, criterion);
      return {
        ...criterion,
        passed,
        earned: passed ? (parseInt(criterion.pts) || 0) : 0,
      };
    });

    const total  = rb.reduce((s, r) => s + (parseInt(r.pts) || 0), 0);
    const earned = results.reduce((s, r) => s + r.earned, 0);
    const score  = total > 0
      ? Math.round((earned / total) * 10 * 10) / 10
      : 0;

    const gradeResult = { score, results, total, earned, exercise: ex };
    Events.emit('grade:complete', gradeResult);
    return gradeResult;
  }

  // ── Criterion checker ─────────────────────────────────────────

  /**
   * Kiểm tra 1 tiêu chí có đạt không
   * @param {string} code
   * @param {string} output
   * @param {{ kw:string, pts:number }} criterion
   * @returns {boolean}
   */
  function _checkCriterion(code, output, criterion) {
    const kw = (criterion.kw || '').trim();
    if (!kw) return true;

    // Nếu keyword là số — so sánh với output (float tolerance)
    if (/^-?\d+\.?\d*$/.test(kw)) {
      return _outputContainsNumber(output, parseFloat(kw));
    }

    // Keyword là đoạn code — tìm trong code + output
    const combined = (code + '\n' + output).toLowerCase();
    const kwLow    = kw.toLowerCase();

    // Tránh substring false positive: e.g. ">=10" không match trong ">=100"
    return _smartMatch(combined, kwLow);
  }

  /**
   * So sánh số với float tolerance ±0.01
   */
  function _outputContainsNumber(output, expected) {
    const tol = cfg.GRADE.FLOAT_TOLERANCE;
    const nums = (output.match(/-?\d+\.?\d*/g) || []).map(Number);
    return nums.some(n => Math.abs(n - expected) <= tol);
  }

  /**
   * Smart match tránh substring false positive
   * e.g. kw=">=10" không match trong ">=100"
   */
  function _smartMatch(text, kw) {
    const idx = text.indexOf(kw);
    if (idx < 0) return false;

    // Kiểm tra ký tự sau kw không phải digit (để tránh prefix match)
    const after = text[idx + kw.length] || '';
    if (/\d/.test(after) && /\d$/.test(kw)) return false;

    return true;
  }

  // ── Backward compat: global gradeCode() ──────────────────────
  // app.js sẽ bridge hàm này
  window._gradePython = grade;

  return { grade };
});
