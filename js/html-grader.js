// ══════════════════════════════════════════════════════════════════
//  html-grader.js — Chấm điểm HTML/CSS
//  Kiểm tra: tags present, CSS properties, structure
// ══════════════════════════════════════════════════════════════════

function gradeHTML() {
  const ex = typeof EXERCISES !== 'undefined' && window.currentExId
    ? EXERCISES.find(e => e.id === window.currentExId) ||
      (typeof EXERCISES_K12 !== 'undefined' ? EXERCISES_K12.find(e => e.id === window.currentExId) : null)
    : null;
  if (!ex) { if (typeof toast === 'function') toast('❌ Không tìm thấy bài tập'); return; }

  const code = typeof HTMLEditor !== 'undefined' ? HTMLEditor.getCode() : '';
  if (!code.trim()) { if (typeof toast === 'function') toast('⚠️ Vui lòng viết code trước khi chấm'); return; }

  const rb = ex.rb || [];
  if (!rb.length) { if (typeof toast === 'function') toast('⚠️ Bài này chưa có tiêu chí chấm'); return; }

  // ── Run checks ─────────────────────────────────────────────────
  const results = rb.map(criterion => {
    const kw = (criterion.kw || '').trim();
    const pts = parseInt(criterion.pts) || 0;
    const passed = checkCriterion(code, kw);
    return { ...criterion, passed, earned: passed ? pts : 0 };
  });

  const total = rb.reduce((s, r) => s + (parseInt(r.pts) || 0), 0);
  const earned = results.reduce((s, r) => s + r.earned, 0);
  const score = total > 0 ? Math.round((earned / total) * 10 * 10) / 10 : 0;

  // ── Render results ─────────────────────────────────────────────
  const panel = document.getElementById('grade-panel');
  if (!panel) return;

  const pct = total > 0 ? Math.round(earned/total*100) : 0;
  const color = score >= 8 ? '#4ade80' : score >= 5 ? '#facc15' : '#f87171';

  panel.innerHTML = `
    <div class="grade-header">
      <div class="grade-score-ring" style="--score-color:${color};--pct:${pct}">
        <svg viewBox="0 0 36 36" class="gsr-svg">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--surface3)" stroke-width="3"/>
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="${color}" stroke-width="3"
            stroke-dasharray="${pct} ${100-pct}" stroke-dashoffset="25" stroke-linecap="round"/>
        </svg>
        <div class="gsr-text">${score}<span>/10</span></div>
      </div>
      <div class="grade-info">
        <div class="grade-ex-title">${ex.num}. ${ex.title}</div>
        <div class="grade-pts">${earned}/${total} điểm • ${pct}%</div>
        <div class="grade-lv-badge">${ex.lv}</div>
      </div>
    </div>
    <div class="grade-criteria">
      ${results.map(r => `
        <div class="criterion-row ${r.passed ? 'pass' : 'fail'}">
          <span class="cr-icon">${r.passed ? '✅' : '❌'}</span>
          <span class="cr-desc">${r.desc}</span>
          <span class="cr-pts ${r.passed ? 'pass' : 'fail'}">${r.passed ? '+'+r.earned : '0'}/${r.pts}đ</span>
        </div>`).join('')}
    </div>
    ${ex.errors && ex.errors.length ? `
      <div class="grade-errors">
        <div class="ge-title">⚠️ Lỗi thường gặp</div>
        <ul>${ex.errors.map(e => `<li>${e}</li>`).join('')}</ul>
      </div>` : ''}`;

  // Switch to results tab
  switchTab('results');

  // Save score via API
  if (typeof API !== 'undefined' && typeof currentUser !== 'undefined'
      && currentUser.role === 'student') {
    API.submitScore(ex.id, ex.title, score);
    API.logAccess('submit_html', `${ex.id}:${score}`);
  }
}

// ── Criterion checker ────────────────────────────────────────────
function checkCriterion(code, kw) {
  if (!kw) return true;
  const lower = code.toLowerCase();
  const kwLow = kw.toLowerCase();

  // Handle HTML entity patterns like &lt;h1
  if (kw.startsWith('&lt;')) {
    const realTag = kw.replace('&lt;', '<').replace('&gt;', '>').toLowerCase();
    return lower.includes(realTag);
  }

  // CSS property patterns like "color:", "display: flex", "border-radius:"
  if (kw.includes(':') && !kw.startsWith('http')) {
    // Remove spaces for flexible match
    const kwNoSpace = kwLow.replace(/\s+/g, '');
    const codeNoSpace = lower.replace(/\s+/g, '');
    return codeNoSpace.includes(kwNoSpace);
  }

  // Direct keyword match
  return lower.includes(kwLow);
}
