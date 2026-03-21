/**
 * graders/sql.js — SQL Grader
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, exercises/registry.js
 */

'use strict';

CL.define('Graders.Sql', () => {

  const cfg      = CL.require('Config');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');

  function grade(code, exerciseId) {
    const ex = Registry.findById(exerciseId);
    if (!ex) throw new Error(`Không tìm thấy bài tập: ${exerciseId}`);

    const rb = ex.rb || [];
    if (!rb.length) throw new Error('Bài này chưa có tiêu chí chấm');

    const results = rb.map(c => {
      const passed = _check(code, c.kw || '');
      return { ...c, passed, earned: passed ? (parseInt(c.pts) || 0) : 0 };
    });

    const total  = rb.reduce((s, r) => s + (parseInt(r.pts) || 0), 0);
    const earned = results.reduce((s, r) => s + r.earned, 0);
    const score  = total > 0 ? Math.round((earned / total) * 100) / 10 : 0;
    const showSolution = score < cfg.GRADE.SHOW_SOLUTION_BELOW && ex.solution;

    const result = { score, results, total, earned, exercise: ex, showSolution };
    Events.emit('grade:complete', result);
    return result;
  }

  function _check(code, kw) {
    if (!kw) return true;
    // Normalize: strip SQL comments, collapse whitespace
    const noComment = code.toLowerCase()
      .replace(/--[^\n]*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ');
    const kwLow = kw.toLowerCase().replace(/\s+/g, ' ');
    if (noComment.includes(kwLow)) return true;
    // Fuzzy: remove all spaces
    return noComment.replace(/\s/g, '').includes(kwLow.replace(/\s/g, ''));
  }

  return { grade };
});
