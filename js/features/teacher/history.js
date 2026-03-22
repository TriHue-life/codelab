/**
 * features/teacher/history.js — Teacher Panel: Tab Lịch sử
 * @requires core/*, CL.API
 */
'use strict';

CL.define('Teacher.History', () => {
  const Utils = CL.require('Utils');

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    try {
      const rows = await CL.API.getHistory();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">📭 Chưa có lịch sử.</div>'; return; }

      el.innerHTML = `
        <div class="tp-score-header" style="grid-template-columns:1fr 1fr auto">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Lượt làm</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${new Set(rows.map(r=>r.mshs)).size}</div><div class="tp-stat-l">HS</div></div>
          <button class="tp-refresh" onclick="CL.API._invalidate('history');CL.Teacher.Panel.switchTab('history')">🔄</button>
        </div>
        <div class="tp-search">
          <input type="text" placeholder="🔍 Tìm..." oninput="_filterTable('hs-tbody',this.value)">
        </div>
        <div class="tp-table-wrap">
          <table class="tp-table"><thead><tr>
            <th>Thời gian</th><th>MSHS</th><th>Họ tên</th><th>Bài tập</th><th>Điểm</th><th>Lớp</th>
          </tr></thead>
          <tbody id="hs-tbody">
            ${rows.map(r => `<tr>
              <td class="td-time">${Utils.formatTime(r.ts)}</td>
              <td class="td-mshs">${Utils.escHtml(r.mshs)}</td>
              <td>${Utils.escHtml(r.ho_ten)}</td>
              <td class="td-ex">${Utils.escHtml(r.tieu_de || r.bai_id)}</td>
              <td class="td-score ${Utils.scoreClass(r.diem)}">${r.diem || '—'}</td>
              <td>${Utils.escHtml(r.lop)}</td>
            </tr>`).join('')}
          </tbody></table>
        </div>`;
    } catch (e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  return { render };
});
