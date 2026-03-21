// ══════════════════════════════════════════════════════════════════
//  sql-grader.js — Chấm điểm SQL
//  Kiểm tra: keywords, cấu trúc câu, so sánh kết quả (nếu có DB)
// ══════════════════════════════════════════════════════════════════

function gradeSQL() {
  const allEx = [
    ...(typeof EXERCISES     !== 'undefined' ? EXERCISES     : []),
    ...(typeof EXERCISES_SQL !== 'undefined' ? EXERCISES_SQL : []),
  ];
  const ex = allEx.find(e => e.id === window.currentExId);
  if (!ex) { if (typeof toast !== 'undefined') toast('❌ Không tìm thấy bài tập'); return; }

  const code = typeof SQLEditor !== 'undefined' ? SQLEditor.getCode() : '';
  if (!code.trim()) { if (typeof toast !== 'undefined') toast('⚠️ Vui lòng viết SQL trước khi chấm'); return; }

  const rb = ex.rb || [];
  if (!rb.length) { if (typeof toast !== 'undefined') toast('⚠️ Bài này chưa có tiêu chí chấm'); return; }

  // ── Check each criterion ──────────────────────────────────────
  const results = rb.map(c => {
    const passed = _checkSQL(code, c.kw || '');
    return { ...c, passed, earned: passed ? (parseInt(c.pts) || 0) : 0 };
  });

  const total  = rb.reduce((s, r) => s + (parseInt(r.pts) || 0), 0);
  const earned = results.reduce((s, r) => s + r.earned, 0);
  const score  = total > 0 ? Math.round((earned / total) * 10 * 10) / 10 : 0;

  // ── Show solution if score < 10 ───────────────────────────────
  const showSolution = score < 9.5 && ex.solution;

  // ── Render ────────────────────────────────────────────────────
  const panel = document.getElementById('grade-panel');
  if (!panel) return;

  const pct   = total > 0 ? Math.round(earned / total * 100) : 0;
  const color = score >= 8 ? '#4ade80' : score >= 5 ? '#facc15' : '#f87171';

  panel.innerHTML = `
    <div class="grade-header">
      <div class="grade-score-ring" style="--score-color:${color}">
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
          <span class="cr-pts ${r.passed ? 'pass' : 'fail'}">${r.passed ? '+' + r.earned : '0'}/${r.pts}đ</span>
        </div>`).join('')}
    </div>

    ${ex.errors && ex.errors.length ? `
      <div class="grade-errors">
        <div class="ge-title">⚠️ Lỗi thường gặp trong SQL</div>
        <ul>${ex.errors.map(e => `<li>${e}</li>`).join('')}</ul>
      </div>` : ''}

    ${showSolution ? `
      <div class="grade-solution">
        <div class="gs-title">💡 Gợi ý đáp án (điểm < 9.5)</div>
        <pre class="gs-code">${_esc(ex.solution)}</pre>
        <button class="gs-apply-btn" onclick="SQLEditor_applySolution(${JSON.stringify(ex.solution)})">
          📋 Áp dụng đáp án → chạy thử
        </button>
      </div>` : ''}`;

  switchTab('results');

  // Save score
  if (typeof API !== 'undefined' && typeof currentUser !== 'undefined'
      && currentUser.role === 'student') {
    API.submitScore(ex.id, ex.title, score, 0);
    API.logAccess('submit_sql', `${ex.id}:${score}`);
  }
}

// ── Apply solution helper ──────────────────────────────────────
function SQLEditor_applySolution(sol) {
  const ta = document.getElementById('sql-input');
  if (ta) { ta.value = sol; SQLEditor.runSQL(); }
}

// ── Keyword checker (case-insensitive, flexible) ──────────────
function _checkSQL(code, kw) {
  if (!kw) return true;
  const c   = code.toLowerCase().replace(/\s+/g, ' ');
  const k   = kw.toLowerCase().replace(/\s+/g, ' ');

  // Remove SQL comments before checking
  const noComment = c.replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

  // Exact substring match (case-insensitive, spaces normalized)
  if (noComment.includes(k)) return true;

  // Keyword list match (split by comma/space)
  const parts = k.split(/[,\s]+/).filter(Boolean);
  if (parts.length > 1) return parts.every(p => noComment.includes(p));

  // Fuzzy: remove spaces from both sides
  const cn = noComment.replace(/\s/g,'');
  const kn = k.replace(/\s/g,'');
  return cn.includes(kn);
}

function _esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
