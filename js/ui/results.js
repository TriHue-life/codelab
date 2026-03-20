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
    const panel = document.getElementById('grade-panel');
    if (!panel) return;

    const { score, results, total, earned, exercise, showSolution } = gradeResult;
    const pct   = Utils.calcPercent(earned, total);
    const color = score >= 8 ? '#4ade80' : score >= 5 ? '#facc15' : '#f87171';

    panel.innerHTML = `
      <div class="grade-header">
        <div class="grade-score-ring">
          <svg viewBox="0 0 36 36" class="gsr-svg">
            <circle cx="18" cy="18" r="15.9" fill="none"
              stroke="var(--surface3)" stroke-width="3"/>
            <circle cx="18" cy="18" r="15.9" fill="none"
              stroke="${color}" stroke-width="3"
              stroke-dasharray="${pct} ${100 - pct}"
              stroke-dashoffset="25" stroke-linecap="round"/>
          </svg>
          <div class="gsr-text">${score}<span>/10</span></div>
        </div>
        <div class="grade-info">
          <div class="grade-ex-title">${exercise.num}. ${Utils.escHtml(exercise.title)}</div>
          <div class="grade-pts">${earned}/${total} điểm · ${pct}%</div>
          <div class="grade-lv-badge">${Utils.escHtml(exercise.lv)}</div>
        </div>
      </div>

      <div class="grade-criteria">
        ${results.map(r => `
          <div class="criterion-row ${r.passed ? 'pass' : 'fail'}">
            <span class="cr-icon">${r.passed ? '✅' : '❌'}</span>
            <span class="cr-desc">${Utils.escHtml(r.desc)}</span>
            <span class="cr-pts ${r.passed ? 'pass' : 'fail'}">
              ${r.passed ? '+' + r.earned : '0'}/${r.pts}đ
            </span>
          </div>`).join('')}
      </div>

      ${exercise.errors?.length ? `
        <div class="grade-errors">
          <div class="ge-title">⚠️ Lỗi thường gặp</div>
          <ul>${exercise.errors.map(e => `<li>${e}</li>`).join('')}</ul>
        </div>` : ''}

      ${showSolution ? _renderSolution(exercise) : ''}`;

    // Switch to results tab
    if (typeof switchTab === 'function') switchTab('results');
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
