/**
 * features/setup-wizard.js — First-Time Setup Wizard
 * ═══════════════════════════════════════════════════════════════
 * Wizard 5 bước hướng dẫn thiết lập lần đầu:
 *   1. Tạo Google Sheet
 *   2. Dán Code.gs
 *   3. Deploy + dán URL
 *   4. Auto-setup (tạo Drive folder + 5 Sheets)
 *   5. Hoàn tất
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, data/http.js, api.js
 */

'use strict';

CL.define('Features.Setup', () => {

  const cfg   = CL.require('Config');
  const Utils = CL.require('Utils');

  let _overlay = null;
  let _step    = 1;

  // ── Public API ────────────────────────────────────────────────

  function show() {
    if (_overlay) return;
    _overlay = document.createElement('div');
    _overlay.id = 'setup-overlay';
    document.body.appendChild(_overlay);
    requestAnimationFrame(() => _overlay.classList.add('show'));
    _renderStep(1);
  }

  function hide() {
    if (!_overlay) return;
    _overlay.classList.remove('show');
    setTimeout(() => { _overlay?.remove(); _overlay = null; }, 400);
  }

  async function checkAndShow() {
    // Only show if explicitly called from config panel (not auto on missing URL)
    const url = localStorage.getItem(cfg.LS.SCRIPT_URL) || cfg.DEPLOY_URL;
    if (!url) return;  // No URL = nothing to check, user must configure via Config
    try {
      const res  = await fetch(`${url}?action=getSetupStatus`);
      const data = await res.json();
      if (data.ok && !data.data.done) { _step = 4; show(); }
    } catch {}
  }

  // ── Step rendering ────────────────────────────────────────────

  function _renderStep(n) {
    _step = n;
    _overlay.innerHTML = `
      <div class="sw-card">
        <div class="sw-header">
          <div class="sw-logo">🖥️</div>
          <div class="sw-title">${cfg.APP_NAME} — Thiết lập lần đầu</div>
          <div class="sw-steps">
            ${[1,2,3,4,5].map(i =>
              `<div class="sw-step-dot ${i<n?'done':i===n?'active':''}">${i<n?'✓':i}</div>`
            ).join('')}
          </div>
        </div>
        <div class="sw-body">${_stepBody(n)}</div>
        <div class="sw-footer">${_stepFooter(n)}</div>
      </div>`;
  }

  function _stepBody(n) {
    switch (n) {
      case 1: return `
        <div class="sw-step-title">Bước 1 — Tạo Google Sheet</div>
        <div class="sw-desc">Chỉ cần tạo <b>1 file Google Sheet</b> — hệ thống tự tạo toàn bộ còn lại.</div>
        <div class="sw-steps-visual">
          ${_swStep(1, `Vào <a href="https://sheets.google.com" target="_blank">sheets.google.com</a> → Tạo bảng tính mới`)}
          ${_swStep(2, `Đặt tên: <code>${cfg.APP_NAME}_Script</code>`)}
          ${_swStep(3, '<b>Extensions → Apps Script</b> → Mở editor')}
        </div>
        <div class="sw-note">💡 File này chỉ chứa script. Dữ liệu thực tự tạo trong <b>📁 ${cfg.DRIVE.FOLDER_NAME}/</b></div>`;

      case 2: return `
        <div class="sw-step-title">Bước 2 — Dán Code.gs</div>
        <div class="sw-desc">Xóa code cũ trong Apps Script editor và dán code backend vào.</div>
        <div class="sw-steps-visual">
          ${_swStep(1, 'Chọn tất cả code cũ → Xóa')}
          ${_swStep(2, 'Tải về <a href="Code.gs" download>Code.gs</a> → Dán vào editor')}
          ${_swStep(3, 'Nhấn <b>Ctrl+S</b> để lưu')}
        </div>
        <div class="sw-code-preview">
          <div class="scp-header">Code.gs — preview</div>
          <pre>/**
 * ${cfg.APP_NAME} — Apps Script Backend v${cfg.APP_VERSION}
 * Deploy: Web App → Execute as: Me → Anyone
 */
const DB_IDS = { TAIKHOAN:'', BAITAP:'', ... };</pre>
        </div>`;

      case 3: return `
        <div class="sw-step-title">Bước 3 — Deploy Web App</div>
        <div class="sw-desc">Tạo URL để app kết nối với Google Sheets.</div>
        <div class="sw-steps-visual">
          ${_swStep(1, '<b>Deploy → New deployment</b>')}
          ${_swStep(2, 'Type: <b>Web app</b>')}
          ${_swStep(3, '<b>Execute as: Me</b> · <b>Who has access: Anyone</b>')}
          ${_swStep(4, 'Deploy → Copy URL (bắt đầu bằng <code>https://script.google.com/...</code>)')}
        </div>
        <div class="sw-field">
          <label>Dán Web App URL:</label>
          <input id="sw-url" type="url" value="${Utils.escHtml(localStorage.getItem(cfg.LS.SCRIPT_URL)||'')}"
            placeholder="https://script.google.com/macros/s/.../exec">
          <div id="sw-url-status" style="font-size:11px;margin-top:4px;min-height:14px"></div>
        </div>`;

      case 4: return `
        <div class="sw-step-title">Bước 4 — Tạo cấu trúc dữ liệu</div>
        <div class="sw-desc">Hệ thống tự tạo toàn bộ folder và files trong Google Drive của bạn.</div>
        <div class="sw-folder-tree">
          <div class="sft-item folder">📁 ${cfg.DRIVE.FOLDER_NAME}/ <span class="sft-new">sẽ được tạo</span></div>
          <div class="sft-item">  └─ 📊 01_TaiKhoan.gsheet <span class="sft-tabs">GiaoVien, HocSinh</span></div>
          <div class="sft-item">  ├─ 📊 02_BaiTap.gsheet <span class="sft-tabs">BaiTap, LyThuyet, CodeMau, TieuChi, HuongDan</span></div>
          <div class="sft-item">  ├─ 📊 03_KiemTra.gsheet <span class="sft-tabs">DanhSach, BaiTapKT</span></div>
          <div class="sft-item">  ├─ 📊 04_KetQua.gsheet <span class="sft-tabs">BangDiem, LichSuLam</span></div>
          <div class="sft-item">  └─ 📊 05_NhatKy.gsheet <span class="sft-tabs">TruyCap, ViPham</span></div>
        </div>
        <div class="sw-admin-form">
          <div class="sw-field-row">
            <div class="sw-field"><label>Tài khoản GV admin</label>
              <input id="sw-user" type="text" value="giaovien"></div>
            <div class="sw-field"><label>Mật khẩu</label>
              <input id="sw-pwd" type="text" value="thuthiem@2025"></div>
          </div>
          <div class="sw-field"><label>Họ tên giáo viên</label>
            <input id="sw-name" type="text" placeholder="Nguyễn Văn A"></div>
          <div class="sw-field"><label>Email</label>
            <input id="sw-email" type="email" placeholder="gv@thuthiem.edu.vn"></div>
        </div>
        <div id="sw-setup-log" class="sw-log" style="display:none"></div>`;

      case 5: return `
        <div class="sw-step-title">✅ Cài đặt hoàn tất!</div>
        <div class="sw-success-icon">🎉</div>
        <div class="sw-desc">Hệ thống đã sẵn sàng. Đăng nhập bằng tài khoản GV vừa tạo.</div>
        <div class="sw-result-grid" id="sw-result-grid"></div>
        <div class="sw-next-steps">
          <div class="sns-title">Bước tiếp theo:</div>
          <div class="sns-item">1. Đăng nhập tài khoản Giáo viên</div>
          <div class="sns-item">2. Vào ⚙️ → Bài tập → <b>🔄 Sync lên Sheets</b> (918 bài tập)</div>
          <div class="sns-item">3. Thêm học sinh vào tab HocSinh trong Google Sheets</div>
          <div class="sns-item">4. Tạo kỳ kiểm tra trong ⚙️ → Kiểm tra</div>
        </div>`;

      default: return '';
    }
  }

  function _swStep(n, text) {
    return `<div class="swv-step"><div class="swv-num">${n}</div><div class="swv-text">${text}</div></div>`;
  }

  function _stepFooter(n) {
    const back = `<button class="sw-btn-back" onclick="CL.Features.Setup._back()">← Quay lại</button>`;
    const next = (label, fn) => `<button class="sw-btn-next" onclick="CL.Features.Setup.${fn}()">${label}</button>`;
    const primary = (label, fn) => `<button class="sw-btn-primary" id="sw-primary" onclick="CL.Features.Setup.${fn}()">${label}</button>`;
    switch (n) {
      case 1: return next('Tiếp theo →', '_next');
      case 2: return `${back}${next('Đã dán code →', '_next')}`;
      case 3: return `${back}${next('Kiểm tra kết nối →', '_testUrl')}`;
      case 4: return `${back}${primary('🚀 Bắt đầu cài đặt', '_runSetup')}`;
      case 5: return primary('Bắt đầu sử dụng 🎓', 'hide');
      default: return '';
    }
  }

  // ── Step actions ──────────────────────────────────────────────

  function _next() { _renderStep(_step + 1); }
  function _back() { _renderStep(_step - 1); }

  async function _testUrl() {
    const input  = document.getElementById('sw-url');
    const status = document.getElementById('sw-url-status');
    const url    = (input?.value || '').trim();
    if (!url) { status.textContent = '⚠️ Vui lòng nhập URL'; return; }
    status.textContent = '⏳ Đang kiểm tra...';
    localStorage.setItem(cfg.LS.SCRIPT_URL, url);
    const r = await CL.API.ping();
    if (r.ok) {
      status.textContent = `✅ Kết nối thành công! (${r.latency}ms)`;
      status.style.color = 'var(--accent2)';
      setTimeout(() => _renderStep(4), 1000);
    } else {
      status.textContent = '❌ ' + r.error;
      status.style.color = 'var(--error)';
    }
  }

  async function _runSetup() {
    const btn = document.getElementById('sw-primary');
    const log = document.getElementById('sw-setup-log');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang cài đặt...'; }
    if (log) { log.style.display = 'block'; log.textContent = '🔄 Đang tạo cấu trúc Google Drive...\n'; }

    try {
      const data = await CL.API.autoSetup({
        admin_username: document.getElementById('sw-user')?.value?.trim()  || 'giaovien',
        admin_password: document.getElementById('sw-pwd')?.value?.trim()   || 'thuthiem@2025',
        admin_name:     document.getElementById('sw-name')?.value?.trim()  || 'Giáo viên',
        admin_email:    document.getElementById('sw-email')?.value?.trim() || '',
        force: true,   // Cho phép chạy lại nếu đã setup trước đó
      });
      if (log) { log.textContent = (data.log || []).join('\n'); }
      // already_done = đã setup rồi → vẫn coi là thành công
      if (data.success || data.already_done) {
        if (data.already_done && log) log.textContent = '✅ Hệ thống đã được cài đặt trước đó.';
        _renderStep(5);
        const grid = document.getElementById('sw-result-grid');
        if (grid && data.sheet_ids) {
          const names = { TAIKHOAN:'01_TaiKhoan', BAITAP:'02_BaiTap', KIEMTRA:'03_KiemTra', KETQUA:'04_KetQua', NHATKY:'05_NhatKy' };
          grid.innerHTML = Object.entries(data.sheet_ids).map(([k, id]) =>
            `<div class="srg-item">
               <span class="srg-name">📊 ${names[k]||k}</span>
               <a href="https://docs.google.com/spreadsheets/d/${id}/edit" target="_blank" class="srg-link">Mở Sheet ↗</a>
             </div>`
          ).join('');
        }
      } else {
        if (btn) { btn.disabled = false; btn.textContent = '🔄 Thử lại'; }
        if (log) log.textContent += '\n\n❌ Cài đặt thất bại: ' + (data.error || 'Không rõ lỗi');
      }
    } catch (e) {
      if (btn) { btn.disabled = false; btn.textContent = '🔄 Thử lại'; }
      if (log) log.textContent += '\n\n❌ Lỗi: ' + e.message;
    }
  }

  // Backward compat
  window.SetupWizard = { show, hide, checkAndShow, _next, _back, _testUrl, _runSetup };

  return { show, hide, checkAndShow, _next, _back, _testUrl, _runSetup };
});
