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
      version: '5.13.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.13.0: Prompt Templates 2-tang: System Prompt an (chuan CT2018 + JSON schema) + User Template GV chinh (co bien {{bloom}}/{{content}}/{{count}}...). Few-shot tu dong chon 2 bai mau cung type+Bloom tu ngan hang. Tab Prompt AI trong menu Cau hinh voi editor, preview full prompt, token estimate. ai-generator.js dung PromptConfig.buildPrompt() thay vi hardcoded.'
    },
    {
      version: '5.12.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.12.0: Cau hinh da AI API trong menu Cau hinh - ho tro Claude/OpenAI/Gemini. Moi provider co card rieng voi: API key (masked), model selection, test connection. Provider mac dinh duoc chon, ai-generator.js tu dong dung key tu Config module.'
    },
    {
      version: '5.11.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.11.0: AI Sinh bai tap - Teacher Panel tab moi 🤖. Dung Claude API (Haiku $0.01 hoac Sonnet $0.06/bai). Tinh nang: nhap noi dung SGK, chon lop/bai/Bloom, AI sinh JSON structured, validate Pyodide, review + luu vao ngan hang. API key luu localStorage. Them saveBaiTapRecord endpoint Code.gs.'
    },
    {
      version: '5.10.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'N6: Ma tran de live-update khi add/remove cau hoi (debounce 600ms). N5: Trang phu-huynh.html - xem ket qua con chi bang MSHS, Code.gs endpoint getStudentReport (rate-limited, no auth). N7: Export PDF bao cao lop (print-friendly HTML, mo tab moi).'
    },
    {
      version: '5.9.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'N2: Ma tran de preview TT26/2022 trong exam creator - Bloom distribution, NL1/NL2/NL3, bang 2 chieu Chu de x Muc do, tu dong cap nhat. N3: Them tc[] cho 45 bai Python (tong 53 bai kich hoat Pyodide grading). N1: GitHub Actions CI auto-rebuild bundle.js khi push JS.'
    },
    {
      version: '5.8.1', type: 'patch',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Hotfix: F1 mobilePanel() thiếu định nghĩa (crash mobile nav). F2 api.js exports thiếu getItemAnalysis/getExamMatrix/getBaiLamForStudent. F4 analytics NL profile kết hợp cả dữ liệu luyện tập + thi. F5 GRADE_FILE_MAP thêm K12-CTST/K12-KNTT/K11-SQL. F7 CSS 0 duplicate selector còn lại.'
    },
    {
      version: '5.8.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Phase 2+3+4 CT GDPT 2018: Config BLOOM_NL_MAP (Bloom→NL1/NL2/NL3), Registry helpers getNL/getBloomGroup/buildExamMatrix. Analytics v2: Tab Tổng hợp lớp (early warning HS nguy cơ, so sánh lớp bar chart), Tab Năng lực HS (hồ sơ NL1/NL2/NL3 radar, Bloom 6 mức, trend chart, PC3 persistence), Tab Phân tích đề (Item Analysis p/D/r, Cronbach alpha, histogram phân phối, ma trận TT26/2022), Tab Xuất CSV hồ sơ năng lực CT2018.'
    },
    {
      version: '5.7.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Đợt 3 performance: P1 — Bundle 45 JS files → dist/bundle.js (1 HTTP request thay 45). P2 — Lazy load exercise data: 2MB exercise bundle chia thành 3 file, chỉ load khi chọn lớp (K10=784KB, K11=508KB, SQL=699KB). First paint tiết kiệm ~2s trên 3G. Thêm scripts/build.py + index.dev.html cho development workflow.'
    },
    {
      version: '5.6.1', type: 'patch',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Đợt 2 clean up: Xóa 9 legacy files (3099 dòng dead code). Dedup CSS: 326 rule trùng lặp → tiết kiệm 958 dòng / 43KB. Thêm tc[] test cases cho 8 bài Python mẫu (B1-B6) để kích hoạt Pyodide grading.'
    },
    {
      version: '5.6.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Phase 1 bugs: fix exam mode không kích hoạt (B1), gộp duplicate exercise:selected (B3), fix runCode/await graders (B5/B6), restore UI sau thi (B7), dedup verifyExamCode (B8). Phase 2 multi-year: thêm nam_hoc vào SCORE_H/BAIKT_H/BAILAM_H, LichSuLop schema, HOCSINH_H cập nhật, yearTransition()/importStudents() backend, Admin UI Quản lý năm học với CSV import.'
    },
    {
      version: '5.5.2', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Ngân hàng bài: Tab Đề bài + Lý thuyết dùng RichText editor (Quill + KaTeX + bảng + upload ảnh). Bỏ Tab Tiêu chí và Hướng dẫn lỗi (xử lý tự động bởi Python grader). Tab Code mẫu giữ nguyên textarea. Lưu về Sheets tương ứng.'
    },
    {
      version: '5.5.1', type: 'patch',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Hotfix: exam-result-modal hiện ngay khi load trang (CSS display:flex !important override). Fix lsSwitch và mobileRunGrade undefined. Fix null-safe addEventListener trong ui.js. Toàn bộ onclick handlers đã kiểm tra và đủ định nghĩa.'
    },
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
