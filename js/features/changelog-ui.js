/**
 * features/changelog-ui.js — Changelog viewer trong Teacher Panel
 * Xem lịch sử phiên bản từ Google Sheets (tab [Changelog])
 * BUGFIX: _get không exposed → dùng CL.API.getChangelog(); fallback hardcoded
 */
'use strict';

CL.define('Features.Changelog', () => {

  const Utils = CL.require('Utils');

  // ── Bảng changelog cứng — luôn hiển thị dù server offline ──────
  const BUILTIN_CHANGELOG = [
    {
      version: '5.5.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Canvas LMS-style Rich Editor: Quill 2 + quill-better-table + KaTeX math ($$...$$) + kéo thả ảnh upload Google Drive + dialog chèn ảnh URL/file + dialog công thức LaTeX + dialog chèn bảng + toggle HTML nguồn. Học sinh xem công thức toán tự động render KaTeX.'
    },
    {
      version: '5.4.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Rich editor: thêm nút toggle HTML nguồn (</> HTML). Admin: cho phép sửa MSHS/username. Theme: fix toggle light/dark. Xóa nút Lịch sử phiên bản khỏi sidebar. Giáo viên không có menu Cấu hình. Fix nút Cập nhật user không hoạt động.'
    },
    {
      version: '4.8.0', type: 'minor',
      timestamp: '2025-03-20T18:00:00Z',
      description: 'Sửa bug đổi mật khẩu (admin/teacher/student), fix quản lý người dùng race condition, fix adminDeleteAdmin tham số sai, chuẩn hóa màu VS Code, theme toggle, score box interactive (count-up, confetti, glow).'
    },
    {
      version: '4.7.0', type: 'minor',
      timestamp: '2025-03-20T12:00:00Z',
      description: 'Thêm tab Quản lý hệ thống cho Admin: CRUD học sinh, giáo viên, admin; reset mật khẩu, khoá/mở tài khoản, xuất CSV bảng điểm.'
    },
    {
      version: '4.6.0', type: 'minor',
      timestamp: '2025-03-19T10:00:00Z',
      description: 'Thêm SQL Editor & SQL Grader. Ngân hàng bài tập SQL lớp 11 KNTT. Sidebar 3 cột chuẩn Canvas LMS. Profile panel với avatar.'
    },
    {
      version: '4.5.0', type: 'minor',
      timestamp: '2025-03-18T08:00:00Z',
      description: 'HTML Editor & HTML Grader. Syntax highlighting real-time. Exam Mode chống gian lận. Anti-cheat fullscreen + tab-switch detection.'
    },
    {
      version: '4.0.0', type: 'major',
      timestamp: '2025-03-15T00:00:00Z',
      description: 'Kiến trúc mô-đun CL.define / CL.require. Auth 2 lớp (Admin/Teacher dùng username, Student dùng MSHS+mật khẩu). Teacher Panel đầy đủ.'
    },
    {
      version: '3.0.0', type: 'major',
      timestamp: '2025-03-10T00:00:00Z',
      description: 'Single-file grader v3. Pyodide WebAssembly Python runtime. Test case engine + Rubric engine. Submission queue offline.'
    },
  ];

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải lịch sử...</div>';
    try {
      const entries = await _fetchChangelog();
      _renderList(el, entries);
    } catch(e) {
      // Nếu lỗi vẫn còn → render fallback hardcoded
      _renderList(el, BUILTIN_CHANGELOG);
    }
  }

  async function _fetchChangelog() {
    // Ưu tiên: server → meta tag → hardcoded
    if (CL.API?.isReady?.()) {
      try {
        const rows = await CL.API.getChangelog?.();
        if (Array.isArray(rows) && rows.length) return rows;
      } catch {}
    }
    // meta tag fallback (nếu build script inject)
    const meta = document.querySelector('meta[name="cl-changelog"]');
    if (meta) {
      try {
        const parsed = JSON.parse(decodeURIComponent(meta.content));
        if (parsed.length) return parsed;
      } catch {}
    }
    return BUILTIN_CHANGELOG;
  }

  function _renderList(el, entries) {
    if (!entries.length) {
      el.innerHTML = '<div class="tp-empty">📝 Chưa có lịch sử phiên bản.</div>';
      return;
    }
    el.innerHTML = `
      <div class="cl-header">
        <h3>📋 Lịch sử phiên bản CodeLab</h3>
        <span class="cl-count">${entries.length} phiên bản</span>
      </div>
      <div class="cl-list">
        ${entries.map(_entryHtml).join('')}
      </div>`;
  }

  function _entryHtml(e, i) {
    const typeInfo = {
      major: { icon: '🔴', label: 'Major', cls: 'cl-major' },
      minor: { icon: '🟡', label: 'Minor', cls: 'cl-minor' },
      patch: { icon: '🟢', label: 'Patch', cls: 'cl-patch' },
    }[e.type] || { icon: '🔵', label: e.type||'Update', cls: 'cl-patch' };

    const date = e.timestamp
      ? new Date(e.timestamp).toLocaleDateString('vi-VN', {
          day:'2-digit', month:'2-digit', year:'numeric'
        })
      : '—';

    const isLatest = i === 0;

    return `
      <div class="cl-entry ${typeInfo.cls}${isLatest ? ' cl-latest' : ''}">
        <div class="cl-entry-head">
          <span class="cl-ver">v${Utils.escHtml(e.version||'?')}${isLatest ? ' <span class="cl-badge-latest">Hiện tại</span>' : ''}</span>
          <span class="cl-type-badge">${typeInfo.icon} ${typeInfo.label}</span>
          <span class="cl-date">${date}</span>
          ${e.prev_version ? `<span class="cl-prev">← v${Utils.escHtml(e.prev_version)}</span>` : ''}
        </div>
        <div class="cl-desc">${Utils.escHtml(e.description||'Không có mô tả.')}</div>
      </div>`;
  }

  return { render };
});
