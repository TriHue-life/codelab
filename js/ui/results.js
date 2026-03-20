/**
 * ui/results.js — Results Panel Renderer
 * ═══════════════════════════════════════════════════════════════
 * Hiển thị kết quả chấm điểm trong panel #grade-panel.
 * Tách khỏi grader engine để UI và logic hoàn toàn độc lập.
 *
 * Lắng nghe event 'grade:complete' → tự render.
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, ui/toast.js
 */

'use strict';

CL.define('UI.Results', () => {

  const Utils  = CL.require('Utils');
  const Events = CL.require('Events');

  /**
   * Render kết quả vào #grade-panel
   * @param {{ score, results, total, earned, exercise, showSolution? }} gradeResult
   */
  function render(gradeResult) {
    const { score, results, total, earned, exercise, showSolution } = gradeResult;
    const pct   = Utils.calcPercent(earned, total);
    const color = score >= 8 ? '#4ade80' : score >= 5 ? '#facc15' : '#f87171';

    // ── Update #tab-results content (keep tab structure) ─────
    const tabResults = document.getElementById('tab-results');
    if (tabResults) {
      tabResults.innerHTML = `
        <div class="score-box">
          <div class="ring">
            <svg width="96" height="96" viewBox="0 0 96 96">
              <defs><linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4f9eff"/>
                <stop offset="100%" stop-color="#34d399"/>
              </linearGradient></defs>
              <circle class="ring-bg" cx="48" cy="48" r="43" fill="none" stroke-width="7"/>
              <circle class="ring-fill" id="ring-fill" cx="48" cy="48" r="43" fill="none"
                stroke-width="7" stroke-linecap="round"/>
            </svg>
            <div class="ring-val" id="rv">—</div>
          </div>
          <div class="score-lbl">Điểm / 10</div>
          <div class="score-grade" id="sg" style="color:var(--text3)">Đang tính...</div>
        </div>
        <div class="stats">
          <div class="sc"><div class="sn nok" id="sp">${results.filter(r=>r.passed).length}</div><div class="sl">Đúng</div></div>
          <div class="sc"><div class="sn ner" id="sf">${results.filter(r=>!r.passed).length}</div><div class="sl">Sai</div></div>
          <div class="sc"><div class="sn nwn" id="ss">0</div><div class="sl">Bỏ qua</div></div>
        </div>
        <div class="sec-t">${exercise.num}. ${Utils.escHtml(exercise.title)}
          <span style="margin-left:8px;font-size:11px;color:var(--text3)">${earned}/${total}đ · ${pct}%</span>
        </div>
        <div class="lr" id="lr">
          ${results.map(r => `
            <div class="li ${r.passed ? 'pass' : 'fail'}">
              <span class="li-icon">${r.passed ? '✅' : '❌'}</span>
              <span class="li-desc">${Utils.escHtml(r.desc)}</span>
              <span class="li-pts ${r.passed ? 'ok' : 'err'}">${r.passed ? '+'+r.earned : '0'}/${r.pts}đ</span>
            </div>`).join('')}
        </div>
        ${_renderHints(results, exercise)}
        ${(score < 9.5 && exercise.solution) ? _renderSolution(exercise) : ''}`;

      // Animate ring AFTER DOM renders
      requestAnimationFrame(() => {
        const rf = document.getElementById('ring-fill');
        if (rf) {
          rf.style.stroke = color;
          rf.style.strokeDasharray = '270';
          rf.style.strokeDashoffset = '270';
          // Trigger transition
          requestAnimationFrame(() => {
            rf.style.strokeDashoffset = String(270 - (pct / 100) * 270);
          });
        }
        const rv = document.getElementById('rv');
        if (rv) rv.textContent = score;
        const sg = document.getElementById('sg');
        if (sg) { sg.textContent = _scoreLabel(score); sg.style.color = color; }
      });
    }

    // Switch to results tab
    if (typeof switchTab === 'function') switchTab('results');
  }

  function _scoreLabel(score) {
    if (score >= 9) return 'Xuất sắc';
    if (score >= 8) return 'Giỏi';
    if (score >= 6.5) return 'Khá';
    if (score >= 5) return 'Trung bình';
    return 'Cần cố gắng';
  }

  function _renderHints(results, exercise) {
    const failed = results.filter(r => !r.passed);
    if (!failed.length && !exercise.errors?.length) return '';

    const hints = [];
    // Per-criterion hints
    failed.forEach(r => {
      if (r.hint) hints.push(`<li>💡 <b>${Utils.escHtml(r.desc)}:</b> ${Utils.escHtml(r.hint)}</li>`);
    });
    // Exercise-level errors
    if (exercise.errors?.length) {
      exercise.errors.forEach(e => hints.push(`<li>⚠️ ${Utils.escHtml(String(e))}</li>`));
    }

    if (!hints.length) return '';
    return `<div class="grade-errors">
      <div class="ge-title">💡 Khuyến nghị chỉnh sửa</div>
      <ul>${hints.join('')}</ul>
    </div>`;
  }

  function _renderSolution(ex) {
    const sol = Utils.escHtml(ex.solution || '');
    const type = ex.type || 'python';
    const applyFn = type === 'sql'
      ? `CL.Editors.Sql.applyCode(${JSON.stringify(ex.solution)})`
      : type === 'html'
        ? `CL.Editors.Html.applyCode(${JSON.stringify(ex.solution)})`
        : `document.getElementById('code-input').value=${JSON.stringify(ex.solution)}`;

    return `
      <div class="grade-solution">
        <div class="gs-title">💡 Gợi ý đáp án (điểm < 9.5)</div>
        <pre class="gs-code">${sol}</pre>
        <button class="gs-apply-btn" onclick="${applyFn}">
          📋 Áp dụng đáp án và chạy thử
        </button>
      </div>`;
  }

  // ── Auto-render on grade:complete event ───────────────────────
  Events.on('grade:complete', render);

  // ── Backward compat: expose render globally ───────────────────
  window.renderGradeResult = render;

  return { render };
});
