/**
 * features/teacher/violations.js — Teacher Panel: Tab Vi phạm
 * @requires core/*, CL.API
 */
'use strict';

CL.define('Teacher.Violations', () => {
  const Utils = CL.require('Utils');

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    try {
      const rows = await CL.API.getViolations();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">✅ Chưa có vi phạm.</div>'; return; }

      const locked = new Set(rows.filter(r => parseInt(r.lan) > 1).map(r => r.mshs));

      el.innerHTML = `
        <div class="vp-summary">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Vi phạm</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${new Set(rows.map(r=>r.mshs)).size}</div><div class="tp-stat-l">HS</div></div>
          <div class="tp-stat ${locked.size ? 'vp-danger' : ''}"><div class="tp-stat-n">${locked.size}</div><div class="tp-stat-l">Bị khóa</div></div>
          <button class="tp-refresh" onclick="CL.API._invalidate('violations');CL.Teacher.Panel.switchTab('violations')">🔄</button>
        </div>
        <div class="tp-search">
          <input type="text" placeholder="🔍 Tìm..." oninput="_filterTable('vp-tbody',this.value)">
        </div>
        <div class="tp-table-wrap">
          <table class="tp-table"><thead><tr>
            <th>Thời gian</th><th>MSHS</th><th>Học sinh</th><th>Bài</th><th>Lần</th><th>Loại</th>
          </tr></thead>
          <tbody id="vp-tbody">
            ${rows.map(r => `<tr class="${parseInt(r.lan) > 1 ? 'vp-row-locked' : ''}">
              <td class="td-time">${Utils.formatTime(r.ts)}</td>
              <td class="td-mshs">${Utils.escHtml(r.mshs)}</td>
              <td>${Utils.escHtml(r.ho_ten)} <span class="vp-lop">${Utils.escHtml(r.lop)}</span></td>
              <td class="td-ex">${Utils.escHtml(r.bai_id)}</td>
              <td style="text-align:center;font-weight:800;color:${parseInt(r.lan)>1?'var(--error)':'var(--warn)'}">${r.lan||1}</td>
              <td><span class="vp-type">${Utils.escHtml(r.loai)}</span></td>
            </tr>`).join('')}
          </tbody></table>
        </div>`;
    } catch (e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  return { render };
});
