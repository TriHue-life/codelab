/**
 * features/anti-cheat.js — Anti-Cheat Monitor
 * ═══════════════════════════════════════════════════════════════
 * Phát hiện: chuyển tab, rời trang, F5
 * Ghi vi phạm vào localStorage + gọi API
 * Tự nộp bài sau MAX_WARNINGS vi phạm
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, auth/session.js
 */

'use strict';

CL.define('Features.AntiCheat', () => {

  const cfg     = CL.require('Config');
  const Events  = CL.require('Events');
  const Store   = CL.require('Store');
  const Session = CL.require('Auth.Session');
  const MAX     = cfg.ANTI_CHEAT.MAX_WARNINGS;

  let _enabled    = false;
  let _locked     = false;
  let _violations = 0;
  let _blurTimer  = null;

  // ── Public API ────────────────────────────────────────────────

  function enable() {
    if (_enabled || _locked) return;
    _enabled    = true;
    _violations = 0;
    const badge = document.getElementById('antitab-badge');
    if (badge) badge.style.display = 'none';
    _checkPreviousLock();
  }

  function disable() {
    _enabled = false;
    _hideOverlay();
  }

  // ── Event listeners ───────────────────────────────────────────

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) _onLeave('chuyển tab');
  });

  window.addEventListener('blur', () => {
    if (!_enabled || _locked) return;
    _blurTimer = setTimeout(() => {
      if (!document.hidden) _onLeave('rời cửa sổ');
    }, cfg.ANTI_CHEAT.BLUR_DELAY_MS);
  });

  window.addEventListener('focus', () => clearTimeout(_blurTimer));

  window.addEventListener('beforeunload', e => {
    if (!_enabled || _locked) return;
    _logViolation('đóng/tải lại trang');
    e.preventDefault();
    return (e.returnValue = 'Bạn đang trong giờ thi!');
  });

  // ── Core logic ────────────────────────────────────────────────

  function _onLeave(type) {
    if (!_enabled || _locked) return;
    _violations++;
    _updateBadge();
    _logViolation(type);
    if (_violations > MAX) _autoSubmit(type);
    else _showWarning(type);
  }

  function _logViolation(type) {
    const user  = Session.get();
    const exId  = Store.get('currentExId') || '';
    const code  = document.getElementById('code-input')?.value
               || document.getElementById('html-code-input')?.value
               || document.getElementById('sql-input')?.value || '';
    // 1. LocalStorage
    try {
      const vps = JSON.parse(localStorage.getItem(cfg.LS.VIOLATION) || '[]');
      vps.push({ ts: new Date().toISOString(), mshs: user?.mshs||'', bai: exId, lan: _violations, loai: type });
      localStorage.setItem(cfg.LS.VIOLATION, JSON.stringify(vps.slice(-cfg.ANTI_CHEAT.LOCAL_CACHE_MAX)));
    } catch {}
    // 2. API (fire-and-forget)
    Events.emit('violation:detected', { type, count: _violations });
    CL.API?.logViolation(exId, _violations, type, code.substring(0, 150));
  }

  function _updateBadge() {
    const b = document.getElementById('antitab-badge');
    const c = document.getElementById('antitab-badge-count');
    if (b && c) { c.textContent = _violations; b.style.display = 'block'; }
  }

  function _showWarning(type) {
    const ov = document.getElementById('antitab-overlay');
    if (!ov) return;
    _setOverlayContent('⚠️', 'Cảnh báo vi phạm!', 'var(--error)',
      `Bạn đã <b>${type}</b> trong giờ thi. Hành vi đã được ghi nhận.`,
      `⚠️ Vi phạm lần ${_violations}/${MAX + 1} — Lần sau sẽ nộp bài ngay!`,
      'Tiếp tục làm bài', _hideOverlay);
    ov.classList.add('show');
  }

  function _autoSubmit(type) {
    if (_locked) return;
    _locked  = true;
    _enabled = false;
    _lockEditor();
    const ov = document.getElementById('antitab-overlay');
    if (!ov) return;
    _setOverlayContent('📊', 'Bài đã được nộp!', 'var(--accent)',
      `Vi phạm lần ${_violations}: <b>${type}</b>. Hệ thống tự động nộp bài.`,
      '🔒 Bài đã bị khóa — Không thể chỉnh sửa thêm',
      'Xem kết quả', () => {
        _hideOverlay();
        // Trigger grading based on current type
        const t = Store.get('currentExType');
        if (t === 'html' && typeof gradeHTML === 'function')  gradeHTML();
        else if (t === 'sql' && typeof gradeSQL === 'function') gradeSQL();
        else if (typeof gradeCode === 'function')               gradeCode();
        Events.emit('violation:locked', { exId: Store.get('currentExId') });
      });
    ov.classList.add('show');
    setTimeout(() => {
      const t = Store.get('currentExType');
      if (t === 'html')     gradeHTML?.();
      else if (t === 'sql') gradeSQL?.();
      else                  gradeCode?.();
    }, 500);
  }

  function _lockEditor() {
    ['code-input','html-code-input','sql-input'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.readOnly = true; el.style.opacity='0.6'; el.style.cursor='not-allowed'; }
    });
    document.querySelectorAll('.btn').forEach(b => {
      if (/Chạy|Chấm/.test(b.textContent)) { b.disabled = true; b.style.opacity = '0.4'; }
    });
  }

  function _checkPreviousLock() {
    const user = Session.get();
    const exId = Store.get('currentExId');
    if (!user || !exId) return;
    try {
      const vps = JSON.parse(localStorage.getItem(cfg.LS.VIOLATION) || '[]');
      const prev = vps.find(v => v.mshs === user.mshs && v.bai === exId && v.lan > MAX);
      if (prev) { _locked = true; _enabled = false; _lockEditor(); }
    } catch {}
  }

  function _hideOverlay() {
    document.getElementById('antitab-overlay')?.classList.remove('show');
  }

  function _setOverlayContent(icon, title, titleColor, msg, count, btnText, btnFn) {
    const $ = id => document.getElementById(id);
    if ($('antitab-icon'))  $('antitab-icon').textContent  = icon;
    if ($('antitab-title')) { $('antitab-title').textContent = title; $('antitab-title').style.color = titleColor; }
    if ($('antitab-msg'))   $('antitab-msg').innerHTML     = msg;
    if ($('antitab-count')) $('antitab-count').textContent = count;
    if ($('antitab-btn'))   { $('antitab-btn').textContent = btnText; $('antitab-btn').onclick = btnFn; }
  }

  // ── Backward compat ───────────────────────────────────────────
  window.antitabEnable  = enable;
  window.antitabDisable = disable;
  window.antitabDismiss = _hideOverlay;

  return { enable, disable };
});
