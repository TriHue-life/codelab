/**
 * features/changelog-ui.js — Changelog viewer trong Teacher Panel
 * Xem lịch sử phiên bản từ Google Sheets (tab [Changelog])
 */
'use strict';

CL.define('Features.Changelog', () => {

  const Utils = CL.require('Utils');

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải lịch sử...</div>';
    try {
      const entries = await _fetchChangelog();
      if (!entries.length) {
        el.innerHTML = `<div class="tp-empty">📝 Chưa có lịch sử phiên bản.<br>
          <small>Chạy: <code>node scripts/version.js minor "Mô tả"</code></small></div>`;
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
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  async function _fetchChangelog() {
    if (!CL.API.isReady()) return _localChangelog();
    try {
      return await CL.API._get({ action: 'getChangelog' });
    } catch {
      return _localChangelog();
    }
  }

  function _localChangelog() {
    // Fallback: đọc từ meta tag được inject lúc build
    const meta = document.querySelector('meta[name="cl-changelog"]');
    if (meta) {
      try { return JSON.parse(decodeURIComponent(meta.content)); } catch {}
    }
    return [];
  }

  function _entryHtml(e) {
    const typeInfo = {
      major: { icon: '🔴', label: 'Major', cls: 'cl-major' },
      minor: { icon: '🟡', label: 'Minor', cls: 'cl-minor' },
      patch: { icon: '🟢', label: 'Patch', cls: 'cl-patch' },
    }[e.type] || { icon: '🔵', label: e.type, cls: 'cl-patch' };

    const date = e.timestamp
      ? new Date(e.timestamp).toLocaleDateString('vi-VN', {
          day:'2-digit', month:'2-digit', year:'numeric',
          hour:'2-digit', minute:'2-digit'
        })
      : '—';

    return `
      <div class="cl-entry ${typeInfo.cls}">
        <div class="cl-entry-head">
          <span class="cl-ver">v${Utils.escHtml(e.version||'?')}</span>
          <span class="cl-type-badge">${typeInfo.icon} ${typeInfo.label}</span>
          <span class="cl-date">${date}</span>
          ${e.prev_version ? `<span class="cl-prev">← v${Utils.escHtml(e.prev_version)}</span>` : ''}
        </div>
        <div class="cl-desc">${Utils.escHtml(e.description||'')}</div>
      </div>`;
  }

  return { render };
});
