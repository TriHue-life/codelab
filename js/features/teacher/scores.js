/**
 * features/teacher/scores.js — Teacher Panel: Tab Điểm
 * @requires core/*, CL.API, CL.Utils
 */
'use strict';

CL.define('Teacher.Scores', () => {
  const Utils  = CL.require('Utils');
  const Events = CL.require('Events');

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải bảng điểm...</div>';
    try {
      const rows = await CL.API.getScores();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">📭 Chưa có bài nộp nào.</div>'; return; }

      const totalHS = new Set(rows.map(r => r.mshs)).size;
      const avg     = rows.reduce((s, r) => s + (parseFloat(r.diem) || 0), 0) / rows.length;

      el.innerHTML = `
        <div class="tp-score-header">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Bài nộp</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${totalHS}</div><div class="tp-stat-l">Học sinh</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${avg.toFixed(1)}</div><div class="tp-stat-l">Điểm TB</div></div>
          <button class="tp-refresh" onclick="CL.API._invalidate('scores');CL.Teacher.Panel.switchTab('scores')">🔄</button>
        </div>
        <div class="tp-search">
          <input type="text" placeholder="🔍 Tìm MSHS, tên, bài tập..."
            oninput="_filterTable('sc-tbody', this.value)">
        </div>
        <div class="tp-table-wrap">
          <table class="tp-table"><thead><tr>
            <th>Thời gian</th><th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>Bài tập</th><th>Điểm</th>
          </tr></thead>
          <tbody id="sc-tbody">
            ${rows.slice().reverse().map(r => `<tr>
              <td class="td-time">${Utils.formatTime(r.ts)}</td>
              <td class="td-mshs">${Utils.escHtml(r.mshs)}</td>
              <td>${Utils.escHtml(r.ho_ten)}</td>
              <td><span class="vp-lop">${Utils.escHtml(r.lop)}</span></td>
              <td class="td-ex">${Utils.escHtml(r.tieu_de || r.bai_id)}</td>
              <td class="td-score ${Utils.scoreClass(r.diem)}">${r.diem || '—'}</td>
            </tr>`).join('')}
          </tbody></table>
        </div>
        <div class="tp-actions">
          <button class="tp-action-btn" onclick="CL.Teacher.Scores.exportCsv()">📥 Xuất CSV</button>
        </div>`;
    } catch (e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function exportCsv() {
    const rows = [...document.querySelectorAll('#sc-tbody tr')].map(tr =>
      [...tr.querySelectorAll('td')].map(td => td.textContent.trim())
    );
    Utils.downloadCsv(
      [['Thời gian','MSHS','Họ tên','Lớp','Bài tập','Điểm'], ...rows],
      `bangdiem-${new Date().toISOString().slice(0, 10)}.csv`
    );
  }

  return { render, exportCsv };
});

// ── Filter helper (shared, module-level) ─────────────────────────
function _filterTable(tbodyId, q) {
  q = q.toLowerCase();
  document.querySelectorAll('#' + tbodyId + ' tr').forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
