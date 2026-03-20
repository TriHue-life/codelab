// ══════════════════════════════════════════════════════════════════
//  antitab.js — Chống gian lận + Ghi vi phạm qua API
//  Phát hiện: visibilitychange + blur + beforeunload
//  Ghi vi phạm: api.js → Apps Script → Sheets NhatKy/ViPham
// ══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const MAX_WARN = 1;
  let enabled = false, violations = 0, locked = false, blurTimer = null;

  const $ = id => document.getElementById(id);

  function enable() {
    if (enabled || locked) return;
    enabled = true; violations = 0;
    const b = $('antitab-badge');
    if (b) b.style.display = 'none';
    _checkPreviousLock();
  }
  function disable() {
    enabled = false;
    const ov = $('antitab-overlay');
    if (ov) ov.classList.remove('show');
  }

  // Kiểm tra HS đã bị khóa bài này trước đó chưa (qua local cache)
  function _checkPreviousLock() {
    const user  = window.currentUser;
    const exId  = window.currentExId;
    if (!user || user.role === 'teacher' || !exId) return;
    try {
      const vps = JSON.parse(localStorage.getItem('cl_vp_cache') || '[]');
      const prev = vps.find(v => v.mshs === user.mshs && v.bai === exId && v.lan > MAX_WARN);
      if (prev) { locked = true; enabled = false; _lockEditor(); _showPrevLock(prev); }
    } catch {}
  }

  function _showPrevLock(prev) {
    const ov = $('antitab-overlay');
    if (!ov) return;
    $('antitab-icon').textContent  = '🔒';
    $('antitab-title').textContent = 'Bài đã bị khóa!';
    $('antitab-title').style.color = 'var(--error)';
    $('antitab-msg').innerHTML     = `Bài này đã bị khóa lúc <b>${_fmtTime(prev.ts)}</b> do vi phạm lần ${prev.lan}.<br>Liên hệ giáo viên để mở khóa.`;
    $('antitab-count').textContent = '🔒 Không thể tiếp tục';
    $('antitab-btn').textContent   = 'Đã hiểu';
    $('antitab-btn').style.background = 'var(--surface3)';
    $('antitab-btn').onclick = dismiss;
    ov.classList.add('show');
  }

  function onLeave(type) {
    if (!enabled || locked) return;
    violations++;
    _updateBadge();
    _logViolation(type);
    if (violations > MAX_WARN) _autoSubmit(type);
    else _showWarning(type);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) onLeave('chuyển tab');
  });
  window.addEventListener('blur', () => {
    if (!enabled || locked) return;
    blurTimer = setTimeout(() => { if (!document.hidden) onLeave('rời trang'); }, 300);
  });
  window.addEventListener('focus', () => clearTimeout(blurTimer));
  window.addEventListener('beforeunload', e => {
    if (!enabled || locked) return;
    _logViolation('F5/đóng tab');
    e.preventDefault();
    return e.returnValue = 'Bạn đang trong giờ thi!';
  });

  async function _logViolation(type) {
    const user = window.currentUser;
    const exId = window.currentExId || '';
    const code = ($('code-input') || {}).value || '';

    // 1. Lưu local cache (tức thì)
    try {
      const vps = JSON.parse(localStorage.getItem('cl_vp_cache') || '[]');
      vps.push({ ts: new Date().toISOString(), mshs: user?.mshs||'', bai: exId, lan: violations, loai: type });
      localStorage.setItem('cl_vp_cache', JSON.stringify(vps.slice(-100)));
    } catch {}

    // 2. Ghi lên Sheets qua api.js (fire-and-forget)
    if (typeof API !== 'undefined' && API.logViolation) {
      API.logViolation(exId, violations, type, code.substring(0, 150));
    }
  }

  function _updateBadge() {
    const b = $('antitab-badge'), c = $('antitab-badge-count');
    if (b && c) { c.textContent = violations; b.style.display = 'block'; }
  }

  function _showWarning(type) {
    const ov = $('antitab-overlay');
    if (!ov) return;
    $('antitab-icon').textContent  = '⚠️';
    $('antitab-title').textContent = 'Cảnh báo vi phạm!';
    $('antitab-title').style.color = 'var(--error)';
    $('antitab-msg').innerHTML     = `Bạn đã <b>${type}</b> trong giờ thi.<br>Hành vi đã được ghi nhận và báo cáo giáo viên.`;
    $('antitab-count').textContent = `⚠️ Vi phạm lần ${violations}/${MAX_WARN+1} — Lần sau sẽ nộp bài ngay!`;
    $('antitab-btn').textContent   = 'Tiếp tục làm bài';
    $('antitab-btn').style.background = 'var(--error)';
    $('antitab-btn').onclick = dismiss;
    ov.classList.add('show');
  }

  function _autoSubmit(type) {
    if (locked) return;
    locked = true; enabled = false;
    const ov = $('antitab-overlay');
    if (!ov) return;
    $('antitab-icon').textContent  = '📊';
    $('antitab-title').textContent = 'Bài đã được nộp!';
    $('antitab-title').style.color = 'var(--accent)';
    $('antitab-msg').innerHTML     = `Vi phạm lần ${violations}: <b>${type}</b>.<br>Hệ thống tự động chấm và khóa bài làm.`;
    $('antitab-count').textContent = '🔒 Bài đã bị khóa — Không thể chỉnh sửa thêm';
    $('antitab-btn').textContent   = 'Xem kết quả';
    $('antitab-btn').style.background = 'var(--accent)';
    $('antitab-btn').onclick = () => {
      ov.classList.remove('show');
      if (typeof gradeCode === 'function') gradeCode();
    };
    ov.classList.add('show');
    _lockEditor();
    setTimeout(() => { if (typeof gradeCode === 'function') gradeCode(); }, 500);
  }

  function _lockEditor() {
    const ci = $('code-input');
    if (ci) { ci.readOnly = true; ci.style.opacity = '0.6'; ci.style.cursor = 'not-allowed'; }
    document.querySelectorAll('.btn').forEach(b => {
      if (b.textContent.includes('Chạy') || b.textContent.includes('Chấm')) {
        b.disabled = true; b.style.opacity = '0.4'; b.style.pointerEvents = 'none';
      }
    });
  }

  function dismiss() { const ov = $('antitab-overlay'); if (ov) ov.classList.remove('show'); }
  function _fmtTime(ts) {
    const d = new Date(ts);
    return isNaN(d) ? ts : `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  window.antitabEnable  = enable;
  window.antitabDisable = disable;
  window.antitabDismiss = dismiss;
})();
