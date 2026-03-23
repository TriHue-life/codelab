/**
 * admin/year-manager.js — Quản lý Năm học (Admin only)
 * ═══════════════════════════════════════════════════════════════
 * Chức năng:
 *   1. Xem năm học đang active
 *   2. Chuyển sang năm học mới (yearTransition)
 *   3. Import danh sách học sinh từ CSV
 *   4. Xem lịch sử lớp học (LichSuLop)
 *
 * Luồng chuyển năm:
 *   Admin upload CSV → preview → xác nhận → yearTransition()
 *   → Cập nhật lop_hien_tai từng HS → Ghi LichSuLop → active_nam_hoc mới
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Admin.YearManager', () => {
  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');

  let _parsedRows  = [];   // CSV parsed rows
  let _namHocInfo  = null; // { active, previous, list }

  // ══════════════════════════════════════════════════════════════
  //  MAIN RENDER
  // ══════════════════════════════════════════════════════════════
  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải thông tin năm học...</div>';
    try {
      _namHocInfo = await CL.API.getNamHocInfo();
    } catch(e) {
      _namHocInfo = { active: '2025-2026', previous: '', list: ['2025-2026'] };
    }

    el.innerHTML = `
      <div class="ym-wrap">

        <!-- Header info -->
        <div class="ym-header">
          <div class="ym-current">
            <div class="ym-label">Năm học đang hoạt động</div>
            <div class="ym-value" id="ym-active">${Utils.escHtml(_namHocInfo.active || '—')}</div>
          </div>
          <div class="ym-prev">
            <div class="ym-label">Năm học trước</div>
            <div class="ym-value ym-muted">${Utils.escHtml(_namHocInfo.previous || '—')}</div>
          </div>
        </div>

        <!-- Section 1: Import CSV -->
        <div class="ym-section">
          <div class="ym-section-title">📥 1. Import danh sách học sinh từ CSV</div>
          <div class="ym-hint">
            File CSV cần có header: <code>mshs</code>, <code>ho_ten</code>, <code>lop</code>
            (tuỳ chọn: <code>email</code>, <code>ngay_sinh</code>)<br>
            Học sinh đã tồn tại sẽ được <b>cập nhật lớp</b>. Học sinh mới sẽ được <b>thêm</b>.
          </div>
          <div class="ym-csv-zone" id="ym-drop-zone">
            📄 Kéo thả file CSV vào đây hoặc <b>click để chọn file</b>
            <input type="file" id="ym-file-input" accept=".csv,.txt" style="display:none">
          </div>
          <div id="ym-csv-preview" style="display:none">
            <div class="ym-preview-header">
              <span id="ym-csv-count"></span>
              <button class="ym-btn-secondary" onclick="CL.Admin.YearManager.clearCsv()">✕ Xóa</button>
            </div>
            <div class="ym-preview-table-wrap">
              <table class="ym-table" id="ym-preview-table"></table>
            </div>
          </div>
          <div class="ym-actions" id="ym-import-actions" style="display:none">
            <label class="ym-checkbox-label">
              <input type="checkbox" id="ym-reset-pw"> Reset mật khẩu về MSHS
            </label>
            <button class="ym-btn-primary" onclick="CL.Admin.YearManager.importNow()">
              📥 Import ${_parsedRows.length} học sinh
            </button>
          </div>
          <div id="ym-import-msg" class="ym-msg"></div>
        </div>

        <!-- Section 2: Chuyển năm học -->
        <div class="ym-section">
          <div class="ym-section-title">🔄 2. Chuyển sang năm học mới</div>
          <div class="ym-hint">
            ⚠️ Thao tác này sẽ:<br>
            &nbsp;&nbsp;• Cập nhật <b>lop_hien_tai</b> cho từng học sinh theo CSV đã import<br>
            &nbsp;&nbsp;• Ghi vào <b>LichSuLop</b> (lịch sử lớp học của từng HS)<br>
            &nbsp;&nbsp;• Đánh dấu <b>inactive</b> học sinh không có trong danh sách mới (đã tốt nghiệp)<br>
            &nbsp;&nbsp;• Đổi <b>Năm học active</b> trong hệ thống
          </div>
          <div class="ym-form-row">
            <label class="ym-form-label">Năm học mới</label>
            <input id="ym-new-year" class="ym-input" type="text"
              placeholder="VD: 2026-2027"
              value="${_nextYear(_namHocInfo.active)}">
          </div>
          <div id="ym-transition-preview" style="display:none"></div>
          <div class="ym-actions">
            <button class="ym-btn-secondary" onclick="CL.Admin.YearManager.previewTransition()">
              🔍 Xem trước
            </button>
            <button class="ym-btn-danger" onclick="CL.Admin.YearManager.doTransition()">
              🔄 Chuyển năm học
            </button>
          </div>
          <div id="ym-transition-msg" class="ym-msg"></div>
        </div>

        <!-- Section 3: Lịch sử lớp học -->
        <div class="ym-section">
          <div class="ym-section-title">📖 3. Lịch sử lớp học</div>
          <div class="ym-form-row">
            <input id="ym-search-mshs" class="ym-input" type="text"
              placeholder="Nhập MSHS để xem lịch sử lớp..."
              style="flex:1">
            <button class="ym-btn-secondary" onclick="CL.Admin.YearManager.loadHistory()">
              🔍 Xem
            </button>
          </div>
          <div id="ym-history-result"></div>
        </div>

      </div>`;

    // Wire dropzone
    _initDropZone();
  }

  // ══════════════════════════════════════════════════════════════
  //  CSV IMPORT
  // ══════════════════════════════════════════════════════════════
  function _initDropZone() {
    const zone  = document.getElementById('ym-drop-zone');
    const input = document.getElementById('ym-file-input');
    if (!zone || !input) return;

    zone.addEventListener('click',     () => input.click());
    zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('drag'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('drag');
      const file = e.dataTransfer?.files?.[0];
      if (file) _readCsv(file);
    });
    input.addEventListener('change', () => {
      if (input.files?.[0]) _readCsv(input.files[0]);
    });
  }

  function _readCsv(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        _parsedRows = _parseCsv(e.target.result);
        _renderPreview(_parsedRows);
      } catch(err) {
        Toast.error('❌ Lỗi đọc CSV: ' + err.message);
      }
    };
    reader.readAsText(file, 'UTF-8');
  }

  function _parseCsv(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) throw new Error('CSV trống hoặc không có dữ liệu');

    // Parse header
    const rawHeader = lines[0].split(',').map(h => h.trim().toLowerCase()
      .replace(/["""]/g, '').replace(/\s+/g, '_'));

    // Map common aliases
    const aliases = {
      'mã_số_học_sinh': 'mshs', 'ma_so_hs': 'mshs', 'cccd': 'mshs', 'cmnd': 'mshs',
      'họ_và_tên': 'ho_ten', 'ho_va_ten': 'ho_ten', 'tên': 'ten', 'fullname': 'ho_ten',
      'lớp': 'lop', 'class': 'lop', 'lop_moi': 'lop',
      'email': 'email', 'ngày_sinh': 'ngay_sinh', 'birthday': 'ngay_sinh',
    };
    const header = rawHeader.map(h => aliases[h] || h);

    const required = ['mshs', 'ho_ten', 'lop'];
    const missing  = required.filter(r => !header.includes(r));
    if (missing.length) throw new Error(`Thiếu cột: ${missing.join(', ')}`);

    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const cells = line.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      const row   = {};
      header.forEach((h, idx) => { row[h] = cells[idx] || ''; });
      if (row.mshs) rows.push(row);
    }
    return rows;
  }

  function _renderPreview(rows) {
    const preview = document.getElementById('ym-csv-preview');
    const countEl = document.getElementById('ym-csv-count');
    const table   = document.getElementById('ym-preview-table');
    const actions = document.getElementById('ym-import-actions');
    if (!preview || !table) return;

    if (countEl) countEl.textContent = `✅ Đã đọc ${rows.length} học sinh`;
    preview.style.display = '';
    if (actions) {
      actions.innerHTML = `
        <label class="ym-checkbox-label">
          <input type="checkbox" id="ym-reset-pw"> Reset mật khẩu về MSHS
        </label>
        <button class="ym-btn-primary" onclick="CL.Admin.YearManager.importNow()">
          📥 Import ${rows.length} học sinh
        </button>`;
      actions.style.display = '';
    }

    const cols  = ['mshs', 'ho_ten', 'lop', 'email'].filter(c => rows[0]?.[c] !== undefined);
    const head  = `<thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>`;
    const body  = `<tbody>${rows.slice(0, 10).map(r =>
      `<tr>${cols.map(c => `<td>${Utils.escHtml(r[c] || '')}</td>`).join('')}</tr>`
    ).join('')}${rows.length > 10 ? `<tr><td colspan="${cols.length}" style="text-align:center;color:var(--text3)">...và ${rows.length - 10} dòng khác</td></tr>` : ''}</tbody>`;
    table.innerHTML = head + body;
  }

  function clearCsv() {
    _parsedRows = [];
    const preview = document.getElementById('ym-csv-preview');
    const actions = document.getElementById('ym-import-actions');
    if (preview) preview.style.display = 'none';
    if (actions) actions.style.display = 'none';
    const fi = document.getElementById('ym-file-input');
    if (fi) fi.value = '';
  }

  async function importNow() {
    if (!_parsedRows.length) { Toast.warn('Chưa có dữ liệu CSV'); return; }
    const msg    = document.getElementById('ym-import-msg');
    const resetPw = document.getElementById('ym-reset-pw')?.checked || false;
    const namHoc  = document.getElementById('ym-new-year')?.value?.trim()
                    || _namHocInfo?.active || '';

    if (msg) msg.innerHTML = '⏳ Đang import...';
    try {
      const r = await CL.API.importStudents(_parsedRows, namHoc, resetPw);
      if (msg) msg.innerHTML =
        `✅ <b>Import thành công!</b> Thêm mới: ${r.inserted} · Cập nhật: ${r.updated} · Bỏ qua: ${r.skipped}` +
        (r.errors?.length ? `<br>⚠️ ${r.errors.slice(0,3).join('<br>')}` : '');
      Toast.success(`✅ Import xong: +${r.inserted} mới, ~${r.updated} cập nhật`);
      clearCsv();
    } catch(e) {
      if (msg) msg.innerHTML = `❌ ${e.message}`;
      Toast.error('❌ ' + e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  YEAR TRANSITION
  // ══════════════════════════════════════════════════════════════
  async function previewTransition() {
    const namHocMoi = document.getElementById('ym-new-year')?.value?.trim();
    if (!namHocMoi) { Toast.warn('Nhập năm học mới'); return; }

    const previewEl = document.getElementById('ym-transition-preview');
    if (previewEl) previewEl.innerHTML = '⏳ Đang kiểm tra...';

    try {
      const r = await CL.API.yearTransition({
        nam_hoc_moi: namHocMoi,
        ds_hoc_sinh: _parsedRows.map(s => ({ mshs: s.mshs, lop_moi: s.lop })),
        preview_only: true,
      });

      if (previewEl) {
        previewEl.style.display = '';
        previewEl.innerHTML = `
          <div class="ym-preview-box">
            <div class="ym-prev-item"><span class="ym-prev-label">Năm học mới</span><b>${Utils.escHtml(namHocMoi)}</b></div>
            <div class="ym-prev-item"><span class="ym-prev-label">Tổng học sinh trong CSV</span><b>${r.total}</b></div>
            <div class="ym-prev-item"><span class="ym-prev-label">Tìm thấy trong hệ thống</span><b class="ok">${r.found}</b></div>
            ${r.missing?.length ? `<div class="ym-prev-item warn">
              <span class="ym-prev-label">MSHS không tìm thấy (${r.missing.length})</span>
              <span>${r.missing.slice(0,5).join(', ')}${r.missing.length > 5 ? '...' : ''}</span>
            </div>` : ''}
          </div>`;
      }
    } catch(e) {
      Toast.error('❌ ' + e.message);
    }
  }

  async function doTransition() {
    const namHocMoi = document.getElementById('ym-new-year')?.value?.trim();
    if (!namHocMoi) { Toast.warn('Nhập năm học mới'); return; }

    const confirmed = await Toast.confirm(
      `⚠️ Xác nhận chuyển sang năm học ${namHocMoi}?\n\n` +
      `• ${_parsedRows.length} học sinh sẽ được cập nhật lớp\n` +
      `• Học sinh không trong danh sách → inactive\n` +
      `• Năm học active → ${namHocMoi}\n\n` +
      `Thao tác KHÔNG THỂ hoàn tác bằng nút. Bạn chắc chắn?`
    );
    if (!confirmed) return;

    const msgEl = document.getElementById('ym-transition-msg');
    if (msgEl) msgEl.innerHTML = '⏳ Đang chuyển năm học...';

    try {
      const r = await CL.API.yearTransition({
        nam_hoc_moi:  namHocMoi,
        nam_hoc_cu:   _namHocInfo?.active || '',
        ds_hoc_sinh:  _parsedRows.map(s => ({ mshs: s.mshs, lop_moi: s.lop, ghi_chu: '' })),
        preview_only: false,
      });

      if (msgEl) msgEl.innerHTML =
        `✅ <b>Chuyển năm học thành công!</b><br>` +
        `Năm học mới: <b>${namHocMoi}</b><br>` +
        `Cập nhật: ${r.updated} HS · Ghi LichSuLop: ${r.inserted_lichsu} · ` +
        `Inactive: ${r.deactivated}` +
        (r.errors?.length ? `<br>⚠️ Lỗi: ${r.errors.slice(0,3).join('; ')}` : '');

      Toast.success(`✅ Đã chuyển sang năm học ${namHocMoi}`);

      // Refresh display
      setTimeout(() => render(document.getElementById('ym-wrap')?.closest('[id]') || document.body), 1500);

    } catch(e) {
      if (msgEl) msgEl.innerHTML = `❌ ${e.message}`;
      Toast.error('❌ ' + e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  HISTORY VIEWER
  // ══════════════════════════════════════════════════════════════
  async function loadHistory() {
    const mshs   = document.getElementById('ym-search-mshs')?.value?.trim();
    const result = document.getElementById('ym-history-result');
    if (!result) return;
    result.innerHTML = '⏳';

    try {
      const rows = await CL.API.getLichSuLop(mshs);
      if (!rows?.length) {
        result.innerHTML = '<div class="tp-empty">Không có lịch sử lớp học.</div>';
        return;
      }
      result.innerHTML = `
        <table class="ym-table" style="margin-top:8px">
          <thead><tr><th>MSHS</th><th>Họ tên</th><th>Năm học</th><th>Lớp</th><th>Ghi chú</th></tr></thead>
          <tbody>${rows.map(r => `
            <tr>
              <td>${Utils.escHtml(r.mshs||'')}</td>
              <td>${Utils.escHtml(r.ho_ten||'')}</td>
              <td><span class="ym-badge">${Utils.escHtml(r.nam_hoc||'')}</span></td>
              <td><b>${Utils.escHtml(r.lop||'')}</b></td>
              <td style="color:var(--text3)">${Utils.escHtml(r.ghi_chu||'—')}</td>
            </tr>`).join('')}
          </tbody>
        </table>`;
    } catch(e) {
      result.innerHTML = `<div class="tp-empty">❌ ${e.message}</div>`;
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  UTILS
  // ══════════════════════════════════════════════════════════════
  function _nextYear(namHoc) {
    if (!namHoc) return '';
    const [y1] = namHoc.split('-').map(Number);
    if (!y1) return '';
    return `${y1 + 1}-${y1 + 2}`;
  }

  return { render, clearCsv, importNow, previewTransition, doTransition, loadHistory };
});
