// ══════════════════════════════════════════════════════════════════
//  setup-wizard.js — Hướng dẫn thiết lập lần đầu
//  Chỉ hiển thị khi chưa có Script URL hoặc chưa setup
// ══════════════════════════════════════════════════════════════════
const SetupWizard = (function () {
  'use strict';

  let _overlay = null;
  let _step = 1;

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

  // ── Check nếu cần hiển thị wizard ────────────────────────────────
  async function checkAndShow() {
    const url = API.getUrl();
    if (!url) { show(); return; }
    // Kiểm tra setup status từ server
    try {
      const res = await fetch(`${url}?action=getSetupStatus&token=`);
      const data = await res.json();
      if (data.ok && !data.data.done) {
        // URL có nhưng chưa setup
        _skipToStep(4); // Bỏ qua bước 1-3, thẳng đến bước tạo bảng
        show();
      }
    } catch {}
  }

  function _skipToStep(n) { _step = n; }

  // ── Render từng bước ─────────────────────────────────────────────
  function _renderStep(n) {
    _step = n;
    _overlay.innerHTML = `
      <div class="sw-card">
        <div class="sw-header">
          <div class="sw-logo">🐍</div>
          <div class="sw-title">CodeLab — Thiết lập lần đầu</div>
          <div class="sw-steps">
            ${[1,2,3,4,5].map(i =>
              `<div class="sw-step-dot ${i<n?'done':i===n?'active':''}">${i<n?'✓':i}</div>`
            ).join('')}
          </div>
        </div>
        <div class="sw-body" id="sw-body">
          ${_stepContent(n)}
        </div>
        <div class="sw-footer" id="sw-footer">
          ${_stepFooter(n)}
        </div>
      </div>`;
  }

  function _stepContent(n) {
    switch(n) {
      case 1: return `
        <div class="sw-step-title">Bước 1 — Tạo Google Sheet</div>
        <div class="sw-desc">
          Toàn bộ dữ liệu (tài khoản, bài tập, điểm...) được lưu trong Google Sheets của trường.
          Chỉ cần tạo <strong>1 file Google Sheet</strong> — hệ thống sẽ tự tạo toàn bộ còn lại.
        </div>
        <div class="sw-steps-visual">
          <div class="swv-step">
            <div class="swv-num">1</div>
            <div class="swv-text">Vào <a href="https://sheets.google.com" target="_blank">sheets.google.com</a> → Tạo bảng tính mới</div>
          </div>
          <div class="swv-step">
            <div class="swv-num">2</div>
            <div class="swv-text">Đặt tên: <code>CodeLab_Script</code></div>
          </div>
          <div class="swv-step">
            <div class="swv-num">3</div>
            <div class="swv-text"><strong>Extensions → Apps Script</strong> → mở editor</div>
          </div>
        </div>
        <div class="sw-note">💡 File này chỉ dùng để chứa script. Dữ liệu thực sẽ tự được tạo trong thư mục <strong>CodeLab/</strong></div>`;

      case 2: return `
        <div class="sw-step-title">Bước 2 — Dán Code.gs</div>
        <div class="sw-desc">Trong Apps Script editor, xóa nội dung cũ và dán code backend vào.</div>
        <div class="sw-steps-visual">
          <div class="swv-step">
            <div class="swv-num">1</div>
            <div class="swv-text">Chọn tất cả code cũ trong editor → Xóa</div>
          </div>
          <div class="swv-step">
            <div class="swv-num">2</div>
            <div class="swv-text">Tải về <a href="#" onclick="SetupWizard._downloadCodeGs();return false">Code.gs</a> và dán vào editor</div>
          </div>
          <div class="swv-step">
            <div class="swv-num">3</div>
            <div class="swv-text">Nhấn <strong>Ctrl+S</strong> để lưu</div>
          </div>
        </div>
        <div class="sw-code-preview">
          <div class="scp-header">Code.gs — 5 dòng đầu</div>
          <pre>/**
 * PYTHON GRADER — Apps Script Backend v2.0
 * Deploy: Web App → Execute as: Me → Anyone
 */
const DB_IDS = { TAIKHOAN:'', BAITAP:'', ... };</pre>
        </div>`;

      case 3: return `
        <div class="sw-step-title">Bước 3 — Deploy Web App</div>
        <div class="sw-desc">Tạo URL để app có thể giao tiếp với Google Sheets.</div>
        <div class="sw-steps-visual">
          <div class="swv-step">
            <div class="swv-num">1</div>
            <div class="swv-text">Trong Apps Script → <strong>Deploy → New deployment</strong></div>
          </div>
          <div class="swv-step">
            <div class="swv-num">2</div>
            <div class="swv-text">Chọn type: <strong>Web app</strong></div>
          </div>
          <div class="swv-step">
            <div class="swv-num">3</div>
            <div class="swv-text"><strong>Execute as: Me</strong><br><strong>Who has access: Anyone</strong></div>
          </div>
          <div class="swv-step">
            <div class="swv-num">4</div>
            <div class="swv-text">Nhấn <strong>Deploy</strong> → Copy URL (bắt đầu bằng <code>https://script.google.com/macros/s/</code>)</div>
          </div>
        </div>
        <div class="sw-field">
          <label>Dán Web App URL vào đây:</label>
          <input id="sw-url" type="url" placeholder="https://script.google.com/macros/s/.../exec"
            value="${API.getUrl()||''}">
          <div id="sw-url-status" style="font-size:11px;margin-top:4px;min-height:14px"></div>
        </div>`;

      case 4: return `
        <div class="sw-step-title">Bước 4 — Tự động tạo cấu trúc dữ liệu</div>
        <div class="sw-desc">Hệ thống sẽ tự tạo toàn bộ folder và files trong Google Drive của bạn.</div>
        <div class="sw-folder-tree">
          <div class="sft-item folder">📁 CodeLab/ <span class="sft-new">sẽ được tạo</span></div>
          <div class="sft-item">  └─ 📊 01_TaiKhoan.gsheet <span class="sft-tabs">GiaoVien, HocSinh</span></div>
          <div class="sft-item">  ├─ 📊 02_BaiTap.gsheet <span class="sft-tabs">BaiTap, LyThuyet, CodeMau, TieuChi, HuongDan</span></div>
          <div class="sft-item">  ├─ 📊 03_KiemTra.gsheet <span class="sft-tabs">DanhSach, BaiTapKT</span></div>
          <div class="sft-item">  ├─ 📊 04_KetQua.gsheet <span class="sft-tabs">BangDiem, LichSuLam</span></div>
          <div class="sft-item">  └─ 📊 05_NhatKy.gsheet <span class="sft-tabs">TruyCap, ViPham</span></div>
        </div>
        <div class="sw-admin-form">
          <div class="sw-field-row">
            <div class="sw-field"><label>Tên đăng nhập GV admin</label>
              <input id="sw-user" type="text" value="giaovien" placeholder="giaovien"></div>
            <div class="sw-field"><label>Mật khẩu</label>
              <input id="sw-pwd" type="text" value="thuthiem@2025" placeholder="mật khẩu"></div>
          </div>
          <div class="sw-field"><label>Họ tên giáo viên</label>
            <input id="sw-name" type="text" value="" placeholder="Nguyễn Văn A"></div>
          <div class="sw-field"><label>Email</label>
            <input id="sw-email" type="email" value="" placeholder="gv@thuthiem.edu.vn"></div>
        </div>
        <div id="sw-setup-log" class="sw-log" style="display:none"></div>`;

      case 5: return `
        <div class="sw-step-title">✅ Cài đặt hoàn tất!</div>
        <div class="sw-success-icon">🎉</div>
        <div class="sw-desc" id="sw-success-msg">
          Hệ thống đã sẵn sàng. Đăng nhập bằng tài khoản GV vừa tạo để bắt đầu.
        </div>
        <div class="sw-result-grid" id="sw-result-grid"></div>
        <div class="sw-next-steps">
          <div class="sns-title">Bước tiếp theo:</div>
          <div class="sns-item">1. Đăng nhập bằng tài khoản Giáo viên</div>
          <div class="sns-item">2. Vào ⚙️ → Bài tập → <strong>🔄 Sync lên Sheets</strong> để đẩy 864 bài tập</div>
          <div class="sns-item">3. Thêm học sinh vào tab HocSinh trong Google Sheets</div>
          <div class="sns-item">4. Tạo kỳ kiểm tra trong ⚙️ → Kiểm tra</div>
        </div>`;
    }
    return '';
  }

  function _stepFooter(n) {
    switch(n) {
      case 1: return `<button class="sw-btn-next" onclick="SetupWizard._next()">Tiếp theo →</button>`;
      case 2: return `
        <button class="sw-btn-back" onclick="SetupWizard._back()">← Quay lại</button>
        <button class="sw-btn-next" onclick="SetupWizard._next()">Đã dán code →</button>`;
      case 3: return `
        <button class="sw-btn-back" onclick="SetupWizard._back()">← Quay lại</button>
        <button class="sw-btn-next" onclick="SetupWizard._testUrl()">Kiểm tra kết nối →</button>`;
      case 4: return `
        <button class="sw-btn-back" onclick="SetupWizard._back()">← Quay lại</button>
        <button class="sw-btn-primary" onclick="SetupWizard._runSetup()" id="sw-run-btn">🚀 Bắt đầu cài đặt</button>`;
      case 5: return `<button class="sw-btn-primary" onclick="SetupWizard.hide()">Bắt đầu sử dụng 🎓</button>`;
    }
    return '';
  }

  // ── Handlers ─────────────────────────────────────────────────────
  function _next() { _renderStep(_step + 1); }
  function _back() { _renderStep(_step - 1); }

  async function _testUrl() {
    const input = document.getElementById('sw-url');
    const status = document.getElementById('sw-url-status');
    const url = (input?.value || '').trim();
    if (!url) { status.textContent = '⚠️ Vui lòng nhập URL'; status.style.color='var(--warn)'; return; }

    status.textContent = '⏳ Đang kiểm tra...';
    API.setUrl(url);
    const r = await API.ping();
    if (r.ok) {
      status.textContent = `✅ Kết nối thành công! (${r.latency}ms)`;
      status.style.color = 'var(--accent2)';
      setTimeout(() => _renderStep(4), 1000);
    } else {
      status.textContent = '❌ Không kết nối được: ' + r.error;
      status.style.color = 'var(--error)';
    }
  }

  async function _runSetup() {
    const btn = document.getElementById('sw-run-btn');
    const log = document.getElementById('sw-setup-log');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang cài đặt...'; }
    if (log) { log.style.display = 'block'; log.innerHTML = '🔄 Đang tạo cấu trúc Google Drive...\n'; }

    try {
      const result = await API._rawPost('autoSetup', {
        admin_username: document.getElementById('sw-user')?.value?.trim() || 'giaovien',
        admin_password: document.getElementById('sw-pwd')?.value?.trim()  || 'thuthiem@2025',
        admin_name:     document.getElementById('sw-name')?.value?.trim() || 'Giáo viên',
        admin_email:    document.getElementById('sw-email')?.value?.trim() || '',
      });

      if (log) {
        log.innerHTML = (result.log || []).join('\n');
        log.scrollTop = log.scrollHeight;
      }

      if (result.success) {
        // Show step 5
        _renderStep(5);
        // Populate result grid
        const grid = document.getElementById('sw-result-grid');
        if (grid && result.sheet_ids) {
          const names = { TAIKHOAN:'01_TaiKhoan', BAITAP:'02_BaiTap', KIEMTRA:'03_KiemTra', KETQUA:'04_KetQua', NHATKY:'05_NhatKy' };
          grid.innerHTML = Object.entries(result.sheet_ids).map(([k,id]) =>
            `<div class="srg-item">
              <span class="srg-name">📊 ${names[k]}</span>
              <a href="https://docs.google.com/spreadsheets/d/${id}/edit" target="_blank" class="srg-link">Mở Sheet ↗</a>
            </div>`
          ).join('');
        }
      } else {
        if (btn) { btn.disabled = false; btn.textContent = '🔄 Thử lại'; }
        if (log) log.innerHTML += '\n\n❌ Cài đặt thất bại: ' + result.error;
      }
    } catch(e) {
      if (btn) { btn.disabled = false; btn.textContent = '🔄 Thử lại'; }
      if (log) log.innerHTML += '\n\n❌ Lỗi: ' + e.message;
    }
  }

  function _downloadCodeGs() {
    // Fetch Code.gs and download
    fetch('Code.gs').then(r => r.text()).then(code => {
      const a = Object.assign(document.createElement('a'), {
        href: URL.createObjectURL(new Blob([code], {type:'text/plain'})),
        download: 'Code.gs'
      });
      a.click();
    }).catch(() => { alert('Tải Code.gs thành công khi chạy trên server. Tìm file Code.gs trong thư mục dự án.'); });
  }

  // Add rawPost to API (for autoSetup which doesn't need token)
  if (typeof API !== 'undefined' && !API._rawPost) {
    API._rawPost = async function(action, body) {
      const url = API.getUrl();
      if (!url) throw new Error('Chưa có URL');
      const res = await fetch(url, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ action, ...body }),
        signal: AbortSignal.timeout(60000),  // 60s for setup
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      return data.data;
    };
  }

  return { show, hide, checkAndShow, _next, _back, _testUrl, _runSetup, _downloadCodeGs };
})();
