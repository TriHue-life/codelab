/**
 * features/teacher/config.js — Teacher Panel: Tab Cấu hình
 * @requires core/*, CL.API, CL.UI.Toast
 */
'use strict';

CL.define('Teacher.Config', () => {
  const cfg   = CL.require('Config');
  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');

  function render(el) {
    const url = localStorage.getItem(cfg.LS.SCRIPT_URL) || '';
    el.innerHTML = `
      <div class="tp-config-body">
        <div class="tp-section-title">🔗 Apps Script URL</div>
        <div class="tp-config-field">
          <label>Web App URL</label>
          <input id="cfg-url" type="url" value="${Utils.escHtml(url)}"
            placeholder="https://script.google.com/macros/s/.../exec">
          <div class="cfg-hint">
            Google Sheet → Extensions → Apps Script → Deploy → Web App
            → Execute as: <b>Me</b> → Who has access: <b>Anyone</b> → Copy URL
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
          <button class="tp-save-btn" onclick="CL.Teacher.Config.saveUrl()">💾 Lưu URL</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.ping()">🔔 Kiểm tra kết nối</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.createTables()">🏗 Tạo bảng Sheets</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.changePassword()">🔑 Đổi mật khẩu</button>
        </div>
        <div id="cfg-msg" style="margin-top:8px;font-size:12px;min-height:16px"></div>

        <div class="tp-section-title" style="margin-top:24px">🌳 Cấu trúc Google Drive</div>
        <div class="tp-schema">
          <div class="schema-tab">📁 ${cfg.DRIVE.FOLDER_NAME}/</div>
          <div class="schema-row">├─ 📊 01_TaiKhoan.gsheet  → [GiaoVien] [HocSinh]</div>
          <div class="schema-row">├─ 📊 02_BaiTap.gsheet   → [BaiTap] [LyThuyet] [CodeMau] [TieuChi] [HuongDan]</div>
          <div class="schema-row">├─ 📊 03_KiemTra.gsheet  → [DanhSach] [BaiTapKT]</div>
          <div class="schema-row">├─ 📊 04_KetQua.gsheet   → [BangDiem] [LichSuLam]</div>
          <div class="schema-row">└─ 📊 05_NhatKy.gsheet   → [TruyCap] [ViPham]</div>
        </div>

        <div class="tp-section-title" style="margin-top:20px">📊 Thống kê</div>
        <div class="tp-tools-grid" style="padding:0;margin-top:8px">
          ${_statCard('🐍 Python', '576 bài', 'K10+K11 KNTT')}
          ${_statCard('🌐 HTML/CSS', '288 bài', 'K12 CTST+KNTT')}
          ${_statCard('🗃 SQL', '54 bài', 'K11 KNTT')}
          ${_statCard('📝 Tổng', '918 bài', '6 mức Bloom × 3 bài')}
        </div>

        <div class="tp-section-title" style="margin-top:20px">🛠 Công cụ</div>
        <div class="tp-tools-grid">
          <div class="tp-tool-card" onclick="CL.Data.Cache.cleanup();CL.UI.Toast.success('✅ Cache đã dọn')">
            <div class="tp-tool-icon">🗑️</div><div class="tp-tool-name">Dọn cache</div>
          </div>
          <div class="tp-tool-card" onclick="CL.Teacher.Scores.exportCsv?.()">
            <div class="tp-tool-icon">📥</div><div class="tp-tool-name">Xuất điểm CSV</div>
          </div>
        </div>
      </div>`;
  }

  function _statCard(icon, count, sub) {
    return `<div class="tp-tool-card" style="cursor:default">
      <div class="tp-tool-icon" style="font-size:20px">${icon}</div>
      <div class="tp-tool-name">${count}</div>
      <div class="tp-tool-desc">${sub}</div>
    </div>`;
  }

  function saveUrl() {
    const url = document.getElementById('cfg-url')?.value?.trim();
    if (!url) { _msg('⚠️ Vui lòng nhập URL'); return; }
    localStorage.setItem(cfg.LS.SCRIPT_URL, url);
    if (typeof CL.API?.setUrl === 'function') CL.API.setUrl(url);
    _msg('✅ Đã lưu');
  }

  async function ping() {
    _msg('⏳ Đang kiểm tra...');
    const r = await CL.API.ping();
    _msg(r.ok ? `✅ Kết nối OK · ${r.latency}ms · v${r.version}` : '❌ Lỗi: ' + r.error);
  }

  async function createTables() {
    _msg('⏳ Đang tạo bảng...');
    try {
      const r = await CL.API.createTables();
      _msg(`✅ Đã tạo: ${(r.created||[]).join(', ') || 'Đã tồn tại'}`);
    } catch(e) { _msg('❌ ' + e.message); }
  }

  function changePassword() {
    const old = prompt('Mật khẩu cũ:');
    if (!old) return;
    const neu = prompt('Mật khẩu mới (≥6 ký tự):');
    if (!neu || neu.length < 6) { Toast.warn('Mật khẩu quá ngắn'); return; }
    CL.API.changePassword(old, neu)
      .then(() => Toast.success('✅ Đã đổi mật khẩu'))
      .catch(e => Toast.error('❌ ' + e.message));
  }

  function _msg(text) {
    const el = document.getElementById('cfg-msg');
    if (el) el.textContent = text;
  }

  return { render, saveUrl, ping, createTables, changePassword };
});
