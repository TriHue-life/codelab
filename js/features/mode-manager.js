/**
 * features/mode-manager.js — Quản lý chế độ Luyện tập ↔ Kiểm tra
 * ═══════════════════════════════════════════════════════════════
 *
 * Hai chế độ:
 *   PRACTICE  — Luyện tập thường ngày, tự do, không anti-cheat
 *   EXAM      — Kiểm tra chính thức, cần mã truy cập, đầy đủ anti-cheat
 *
 * Luồng:
 *   1. Học sinh đăng nhập → mặc định PRACTICE
 *   2. Học sinh nhập mã → server xác thực → switch sang EXAM
 *   3. Kết thúc exam → trở về PRACTICE
 *
 * State trong CL.Store:
 *   'appMode'      : 'practice' | 'exam'
 *   'activeExam'   : exam object | null
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, api.js
 */

'use strict';

CL.define('Features.ModeManager', () => {

  const cfg     = CL.require('Config');
  const Events  = CL.require('Events');
  const Store   = CL.require('Store');
  const Session = CL.require('Auth.Session');
  const Toast   = CL.require('UI.Toast');
  const Utils   = CL.require('Utils');

  // ── Public API ────────────────────────────────────────────────

  /** Khởi động sau khi đăng nhập */
  function init() {
    Store.set('appMode',    'practice');
    Store.set('activeExam', null);
    _renderModeBanner();
    _checkOpenExams();      // Tự check nếu đang có kỳ thi mở
  }

  /**
   * Student nhập mã → xác thực → vào chế độ thi
   * @param {string} code - Mã truy cập do GV cung cấp
   */
  async function enterExamWithCode(code) {
    if (!code?.trim()) return;
    const trimmed = code.trim().toUpperCase();

    Toast.show('🔍 Đang xác thực mã...', 'info', 2000);
    try {
      const data = await CL.API.verifyExamCode(trimmed);
      if (!data?.exam) { Toast.error('❌ Mã không hợp lệ hoặc đợt kiểm tra chưa mở'); return; }

      const exam = data.exam;
      const user = Session.get();

      // Kiểm tra lớp
      if (exam.lop) {
        const lops = exam.lop.split(',').map(s => s.trim());
        if (!lops.includes(user?.lop)) {
          Toast.error(`❌ Bạn (lớp ${user?.lop}) không thuộc đối tượng kỳ thi này`);
          return;
        }
      }

      // Chuyển sang chế độ thi
      Store.set('appMode',    'exam');
      Store.set('activeExam', exam);
      Events.emit('mode:exam-entered', { exam });

      // Start exam mode UI
      CL.Features.ExamMode.start(exam);

    } catch (e) {
      Toast.error('❌ ' + e.message);
    }
  }

  /** Thoát chế độ thi, về luyện tập */
  function exitToPractice() {
    Store.set('appMode',    'practice');
    Store.set('activeExam', null);
    CL.Features.ExamMode.cleanup?.();
    Events.emit('mode:practice-entered', {});
    // Reload UI
    location.reload();
  }

  /** Chế độ hiện tại */
  function getMode() { return Store.get('appMode') || 'practice'; }
  function isPractice() { return getMode() === 'practice'; }
  function isExam()     { return getMode() === 'exam'; }

  // ── Practice mode banner ──────────────────────────────────────

  function _renderModeBanner() {
    const hdr = document.querySelector('header');
    if (!hdr) return;

    // Nút "Vào phòng thi"
    const btn = document.createElement('button');
    btn.id = 'exam-code-btn';
    btn.className = 'exam-enter-btn';
    btn.innerHTML = '📋 Vào phòng thi';
    btn.title = 'Nhập mã để vào chế độ kiểm tra';
    btn.onclick = showEnterCodeDialog;
    hdr.appendChild(btn);
  }

  function showEnterCodeDialog() {
    const ov = document.createElement('div');
    ov.id = 'enter-exam-overlay';
    ov.innerHTML = `
      <div class="eec-backdrop" onclick="document.getElementById('enter-exam-overlay').remove()"></div>
      <div class="eec-card">
        <div class="eec-icon">🎓</div>
        <div class="eec-title">Vào phòng thi</div>
        <div class="eec-desc">Nhập mã truy cập do giáo viên cung cấp để bắt đầu bài kiểm tra chính thức.</div>
        <input id="eec-code" type="text" class="eec-input"
          placeholder="Nhập mã (VD: K25A1)"
          maxlength="20" autocomplete="off" spellcheck="false"
          onkeydown="if(event.key==='Enter')CL.Features.ModeManager.enterExamWithCode(document.getElementById('eec-code').value)"
          style="text-transform:uppercase">
        <div class="eec-hint">Mã do giáo viên thông báo trước giờ thi</div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
          <button class="eec-btn-cancel" onclick="document.getElementById('enter-exam-overlay').remove()">Hủy</button>
          <button class="eec-btn-enter" onclick="CL.Features.ModeManager.enterExamWithCode(document.getElementById('eec-code').value)">
            Vào thi →
          </button>
        </div>
        <div id="eec-msg" style="margin-top:8px;font-size:11.5px;color:var(--error);min-height:14px;text-align:center"></div>
      </div>`;
    document.body.appendChild(ov);
    setTimeout(() => ov.querySelector('.eec-card')?.classList.add('show'), 10);
    document.getElementById('eec-code')?.focus();
  }

  // ── Auto-check for open exams on login ───────────────────────

  async function _checkOpenExams() {
    if (!CL.API.isReady()) return;
    const user = Session.get();
    if (!user || user.role !== 'student') return;

    try {
      const exams = await CL.API.getExams();
      const open  = exams.filter(e =>
        e.trang_thai === 'active' &&
        (!e.lop || e.lop.split(',').map(s=>s.trim()).includes(user.lop))
      );

      if (open.length > 0) {
        _showExamAlert(open);
      }
    } catch {}
  }

  function _showExamAlert(exams) {
    const names = exams.map(e => `"${e.ten}"`).join(', ');
    const banner = document.createElement('div');
    banner.className = 'exam-alert-banner';
    banner.innerHTML = `
      <span>📋 Có ${exams.length} kỳ kiểm tra đang mở dành cho lớp bạn: <b>${names}</b></span>
      <button onclick="CL.Features.ModeManager.showEnterCodeDialog()">Vào thi ngay →</button>
      <button style="background:none;border:none;color:inherit;cursor:pointer;padding:0 4px"
        onclick="this.closest('.exam-alert-banner').remove()">✕</button>`;
    document.body.prepend(banner);
  }

  // Expose
  window.ModeManager = { init, enterExamWithCode, exitToPractice, isPractice, isExam, showEnterCodeDialog };

  return { init, enterExamWithCode, exitToPractice, isPractice, isExam, showEnterCodeDialog };
});
