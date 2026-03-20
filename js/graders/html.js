/**
 * graders/html.js — HTML/CSS Grader
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, exercises/registry.js
 */

'use strict';

CL.define('Graders.Html', () => {

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

    const result = { score, results, total, earned, exercise: ex };
    Events.emit('grade:complete', result);
    return result;
  }

  function _check(code, kw) {
    if (!kw) return true;
    const lower = code.toLowerCase();
    const kwLow = kw.toLowerCase();
    // HTML entity pattern: &lt;h1 → <h1
    if (kw.startsWith('&lt;')) {
      return lower.includes(kw.replace(/&lt;/g, '<').replace(/&gt;/g, '>').toLowerCase());
    }
    // CSS property pattern: remove spaces
    if (kw.includes(':') && !kw.startsWith('http')) {
      return lower.replace(/\s+/g, '').includes(kwLow.replace(/\s+/g, ''));
    }
    return lower.includes(kwLow);
  }

  return { grade };
});
