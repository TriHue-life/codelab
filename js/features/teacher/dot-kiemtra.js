/**
 * features/teacher/dot-kiemtra.js — Quản lý Đợt kiểm tra
 * ═══════════════════════════════════════════════════════════════
 * Đợt kiểm tra = nhóm nhiều kỳ KT trong cùng 1 đợt (VD: HK1)
 * Mỗi đợt có tên, năm học, học kỳ, lớp áp dụng.
 * Tổng hợp điểm các kỳ KT trong đợt.
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Teacher.DotKiemTra', () => {
  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');

  const STATUS = {
    planning: '📋 Lên kế hoạch',
    active:   '🟢 Đang diễn ra',
    completed:'✅ Đã kết thúc',
  };
  const HOC_KY = ['HK1','HK2','HK Phụ','Cuối năm'];

  // ── Main render ───────────────────────────────────────────────

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    try {
      const [dots, exams] = await Promise.all([
        CL.API.getDotKiemTra(true),
        CL.API.getExams(true),
      ]);

      el.innerHTML = `
        <div class="exam-toolbar">
          <button class="auth-btn" style="padding:7px 14px;font-size:12px"
            onclick="CL.Teacher.DotKiemTra.showForm({})">+ Tạo đợt kiểm tra</button>
          <button class="tp-refresh" onclick="CL.Teacher.Panel.switchTab('dotkt')">🔄</button>
        </div>
        <div class="dot-list" id="dot-list">
          ${dots.length ? dots.map(d => _card(d, exams)).join('') : '<div class="tp-empty">📋 Chưa có đợt kiểm tra nào.</div>'}
        </div>
        <div id="dot-form" style="display:none"></div>`;
    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  function _card(dot, exams) {
    const myExams = (dot.ky_kt_ids || []).map(id => exams.find(e => e.id === id)).filter(Boolean);
    return `<div class="dot-card">
      <div class="dc-header">
        <div class="dc-info">
          <div class="dc-name">${Utils.escHtml(dot.ten)}</div>
          <div class="dc-meta">
            ${dot.nam_hoc} · ${dot.hoc_ky} · ${Utils.escHtml(dot.lop||'Tất cả lớp')}
            · ${myExams.length} kỳ thi
          </div>
        </div>
        <div class="dc-actions">
          <span class="ec-status ${dot.trang_thai}">${STATUS[dot.trang_thai]||dot.trang_thai}</span>
          <button class="tp-action-btn" onclick="CL.Teacher.DotKiemTra.editDot('${Utils.escHtml(dot.id)}')">✏️</button>
          <button class="tp-action-btn" onclick="CL.Teacher.DotKiemTra.viewSummary('${Utils.escHtml(dot.id)}')">📊</button>
          <button class="tp-action-btn" onclick="CL.Teacher.DotKiemTra.deleteDot('${Utils.escHtml(dot.id)}')" style="color:var(--error)">🗑</button>
        </div>
      </div>
      ${myExams.length ? `
        <div class="dc-exams">
          ${myExams.map(e => `<span class="dc-exam-tag ec-status ${e.trang_thai||'draft'}">${Utils.escHtml(e.ten.substring(0,20))}</span>`).join('')}
        </div>` : ''}
      ${dot.mo_ta ? `<div class="ec-desc">${Utils.escHtml(dot.mo_ta)}</div>` : ''}
    </div>`;
  }

  // ── Form ──────────────────────────────────────────────────────

  async function showForm(dot) {
    const form = document.getElementById('dot-form');
    if (!form) return;
    form.style.display = 'block';
    const isEdit = !!dot.id;
    const exams  = await CL.API.getExams(true);
    const selIds = new Set(dot.ky_kt_ids || []);

    form.innerHTML = `
      <div class="ef-title">${isEdit ? '✏️ Chỉnh sửa' : '+ Tạo'} đợt kiểm tra</div>
      <div class="ef-row">
        <div class="ef-field"><label>Tên đợt *</label>
          <input id="df-ten" type="text" value="${Utils.escHtml(dot.ten||'')}"
            placeholder="VD: Kiểm tra HK1 – Lớp 11 – 2025"></div>
        <div class="ef-field"><label>Năm học</label>
          <input id="df-namhoc" type="text" value="${Utils.escHtml(dot.nam_hoc||'2024-2025')}"
            placeholder="2024-2025"></div>
      </div>
      <div class="ef-row">
        <div class="ef-field"><label>Học kỳ</label>
          <select id="df-hocky">
            ${HOC_KY.map(k => `<option ${dot.hoc_ky===k?'selected':''}>${k}</option>`).join('')}
          </select></div>
        <div class="ef-field"><label>Đợt số</label>
          <input id="df-dot" type="number" value="${dot.dot_so||1}" min="1" max="20"></div>
      </div>
      <div class="ef-row">
        <div class="ef-field"><label>Lớp áp dụng</label>
          <input id="df-lop" type="text" value="${Utils.escHtml(dot.lop||'')}"
            placeholder="11A1, 11A2 (rỗng = tất cả)"></div>
        <div class="ef-field"><label>Trạng thái</label>
          <select id="df-status">
            ${Object.entries(STATUS).map(([v,l]) =>
              `<option value="${v}" ${(dot.trang_thai||'planning')===v?'selected':''}>${l}</option>`
            ).join('')}
          </select></div>
      </div>
      <div class="ef-field"><label>Mô tả</label>
        <textarea id="df-mota" rows="2">${Utils.escHtml(dot.mo_ta||'')}</textarea></div>

      <div class="ef-field">
        <label>Kỳ kiểm tra trong đợt này (<span id="df-cnt">${selIds.size}</span> đã chọn)</label>
        <div class="ef-ex-list" style="max-height:200px">
          ${exams.map(e => `
            <label class="ef-ex">
              <input type="checkbox" name="dot-ex" value="${Utils.escHtml(e.id)}"
                ${selIds.has(e.id)?'checked':''}>
              <span class="ec-status ${e.trang_thai}" style="font-size:9px">${e.trang_thai}</span>
              <span class="ef-ex-title">${Utils.escHtml(e.ten)}</span>
              <span style="font-size:10px;color:var(--text3)">${Utils.escHtml(e.ngay_thi||'')}</span>
            </label>`).join('')}
        </div>
      </div>

      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="auth-btn" style="padding:8px 14px;font-size:12px"
          onclick="CL.Teacher.DotKiemTra.saveDot('${dot.id||''}')">💾 ${isEdit?'Lưu':'Tạo'}</button>
        <button class="tp-cancel-btn" onclick="document.getElementById('dot-form').style.display='none'">Hủy</button>
      </div>
      <div id="df-msg" style="font-size:11px;margin-top:6px;color:var(--accent2)"></div>`;

    document.querySelectorAll('[name="dot-ex"]').forEach(cb =>
      cb.addEventListener('change', () => {
        const n = document.querySelectorAll('[name="dot-ex"]:checked').length;
        const el = document.getElementById('df-cnt');
        if (el) el.textContent = n;
      })
    );
    form.scrollIntoView({ behavior: 'smooth' });
  }

  async function editDot(id) {
    const dots = await CL.API.getDotKiemTra(true);
    const dot  = dots.find(d => d.id === id);
    if (dot) showForm(dot);
  }

  async function saveDot(existId) {
    const msg = document.getElementById('df-msg');
    const ten = document.getElementById('df-ten')?.value?.trim();
    if (!ten) { if(msg) msg.textContent = '⚠️ Vui lòng nhập tên'; return; }
    const kyIds = [...document.querySelectorAll('[name="dot-ex"]:checked')].map(cb => cb.value);
    if(msg) msg.textContent = '⏳ Đang lưu...';
    try {
      const r = await CL.API.saveDotKiemTra({
        id: existId || undefined,
        ten,
        nam_hoc: document.getElementById('df-namhoc')?.value?.trim() || '2024-2025',
        hoc_ky:  document.getElementById('df-hocky')?.value  || 'HK1',
        dot_so:  parseInt(document.getElementById('df-dot')?.value) || 1,
        lop:     document.getElementById('df-lop')?.value?.trim() || '',
        mo_ta:   document.getElementById('df-mota')?.value?.trim() || '',
        trang_thai: document.getElementById('df-status')?.value || 'planning',
        ky_kt_ids: kyIds,
      });
      if(msg) msg.textContent = '✅ Đã lưu!';
      setTimeout(() => CL.Teacher.Panel.switchTab('dotkt'), 1000);
    } catch(e) { if(msg) msg.textContent = '❌ ' + e.message; }
  }

  async function deleteDot(id) {
    if (!await Toast.confirm('Xóa đợt kiểm tra? Các kỳ thi trong đợt vẫn được giữ.')) return;
    await CL.API.deleteDotKiemTra(id);
    CL.Teacher.Panel.switchTab('dotkt');
  }

  // ── Summary: Tổng hợp điểm cả đợt ───────────────────────────

  async function viewSummary(dotId) {
    const body = document.getElementById('tp-body');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tổng hợp...</div>';
    try {
      const [dots, exams, baiKTs, students] = await Promise.all([
        CL.API.getDotKiemTra(true),
        CL.API.getExams(true),
        CL.API.getBaiKT(),
        CL.API.getStudentList(),
      ]);

      const dot     = dots.find(d => d.id === dotId);
      const myExams = (dot?.ky_kt_ids || []).map(id => exams.find(e => e.id === id)).filter(Boolean);
      const myKTs   = baiKTs.filter(b => dot?.ky_kt_ids?.includes(b.ky_id));

      if (!dot) { body.innerHTML = '<div class="tp-empty">Không tìm thấy đợt kiểm tra</div>'; return; }

      // Build student summary: one row per student, cols = exams
      const stuMap  = {};
      students.forEach(s => stuMap[s.mssv] = s);
      const allMssv = [...new Set(myKTs.map(b => b.mssv))].sort();

      const tableRows = allMssv.map(mssv => {
        const stu    = stuMap[mssv] || {};
        const scores = myExams.map(e => {
          const r = myKTs.find(b => b.mssv === mssv && b.ky_id === e.id);
          return r ? parseFloat(r.diem_tong) || 0 : null;
        });
        const valid  = scores.filter(s => s !== null);
        const avg    = valid.length ? valid.reduce((a,b)=>a+b,0)/valid.length : null;
        const cells  = scores.map(s => s === null
          ? `<td class="hm-empty">—</td>`
          : `<td class="td-score ${Utils.scoreClass(s)}">${s.toFixed(1)}</td>`
        ).join('');
        const avgCell = avg === null ? '<td>—</td>'
          : `<td class="td-score ${Utils.scoreClass(avg)}" style="font-weight:900">${avg.toFixed(2)}</td>`;
        const rank    = avg === null ? '—' : avg >= 8 ? '🌟 Giỏi' : avg >= 6.5 ? '👍 Khá' : avg >= 5 ? '✓ TB' : '⚠️ Yếu';
        return `<tr>
          <td class="td-mssv">${Utils.escHtml(mssv)}</td>
          <td>${Utils.escHtml(stu.ho_ten||mssv)}</td>
          <td>${Utils.escHtml(stu.lop||baiKTs.find(b=>b.mssv===mssv)?.lop||'')}</td>
          ${cells}${avgCell}
          <td>${rank}</td>
        </tr>`;
      }).join('');

      // Stats
      const allScores = myKTs.map(b => parseFloat(b.diem_tong)||0);
      const avg  = allScores.length ? allScores.reduce((a,b)=>a+b,0)/allScores.length : 0;
      const pass = allScores.filter(s => s >= 5).length;
      const gioi = allScores.filter(s => s >= 8).length;

      body.innerHTML = `
        <div style="padding:10px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border)">
          <button class="tp-action-btn" onclick="CL.Teacher.Panel.switchTab('dotkt')">← Đợt KT</button>
          <div style="font-weight:800;font-size:14px">📊 ${Utils.escHtml(dot.ten)}</div>
          <span style="font-size:11px;color:var(--text3)">${dot.nam_hoc} · ${dot.hoc_ky} · ${myExams.length} kỳ</span>
          <button class="tp-action-btn" style="margin-left:auto"
            onclick="CL.Teacher.DotKiemTra.exportSummary('${dotId}')">📥 Xuất Sheets</button>
        </div>

        <div class="tp-score-header" style="padding:10px 14px">
          <div class="tp-stat"><div class="tp-stat-n">${allMssv.length}</div><div class="tp-stat-l">Học sinh</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${avg.toFixed(2)}</div><div class="tp-stat-l">Điểm TB</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${Math.round(pass/Math.max(allScores.length,1)*100)}%</div><div class="tp-stat-l">Đạt (≥5)</div></div>
          <div class="tp-stat good"><div class="tp-stat-n">${Math.round(gioi/Math.max(allScores.length,1)*100)}%</div><div class="tp-stat-l">Giỏi (≥8)</div></div>
        </div>

        <div class="tp-table-wrap" style="padding:0 14px 14px">
          <table class="tp-table">
            <thead><tr>
              <th>MSSV</th><th>Họ tên</th><th>Lớp</th>
              ${myExams.map(e => `<th title="${Utils.escHtml(e.ten)}">${Utils.escHtml(e.ten.substring(0,12))}</th>`).join('')}
              <th>TB</th><th>Xếp loại</th>
            </tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>`;
    } catch(e) { body.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  async function exportSummary(dotId) {
    try {
      const r = await CL.API.exportToSheets('all');
      Toast.success(`✅ Đã xuất ra Google Sheets!`);
      if (r.url) window.open(r.url, '_blank');
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  return { render, showForm, editDot, saveDot, deleteDot, viewSummary, exportSummary };
});
