/**
 * features/theme.js — Theme Switcher
 * ═══════════════════════════════════════════════════════════════
 * 8 themes: Dark Navy, One Dark, Dracula, Monokai,
 *           GitHub Dark, Solarized Dark, Light, Solarized Light
 * Lưu vào localStorage, áp dụng ngay qua data-theme trên <html>
 */
'use strict';

CL.define('Features.Theme', () => {

  const LS_KEY = 'cl_theme';

  const THEMES = [
    {
      id: 'dark-navy', name: 'Dark Navy', dark: true,
      preview: ['#0a0e1a','#4f9eff','#34d399','#a78bfa'],
    },
    {
      id: 'one-dark', name: 'One Dark', dark: true,
      preview: ['#282c34','#61afef','#98c379','#c678dd'],
    },
    {
      id: 'dracula', name: 'Dracula', dark: true,
      preview: ['#282a36','#8be9fd','#50fa7b','#bd93f9'],
    },
    {
      id: 'monokai', name: 'Monokai', dark: true,
      preview: ['#272822','#66d9e8','#a6e22e','#ae81ff'],
    },
    {
      id: 'github-dark', name: 'GitHub Dark', dark: true,
      preview: ['#0d1117','#58a6ff','#3fb950','#bc8cff'],
    },
    {
      id: 'solarized-dark', name: 'Solarized Dark', dark: true,
      preview: ['#002b36','#268bd2','#859900','#6c71c4'],
    },
    {
      id: 'light', name: 'Light', dark: false,
      preview: ['#f6f8fa','#0969da','#1a7f37','#8250df'],
    },
    {
      id: 'solarized-light', name: 'Solarized Light', dark: false,
      preview: ['#fdf6e3','#268bd2','#859900','#6c71c4'],
    },
  ];

  // ── Apply theme ───────────────────────────────────────────────
  function apply(themeId) {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    document.documentElement.setAttribute('data-theme', theme.id);
    // Update meta theme-color for mobile browser chrome
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement('meta'); meta.name='theme-color'; document.head.appendChild(meta); }
    meta.content = theme.preview[0];
    localStorage.setItem(LS_KEY, theme.id);
    _updateActiveCard(theme.id);
  }

  function current() {
    return localStorage.getItem(LS_KEY) || 'dark-navy';
  }

  // ── Init: apply saved theme on load ──────────────────────────
  function init() {
    apply(current());
    _injectButton();
  }

  // ── Inject / re-wire theme button ───────────────────────────
  function _injectButton() {
    // Wire the button (already in HTML topbar) — use delegation to avoid clone issues
    const btn = document.getElementById('theme-picker-btn');
    if (btn) {
      btn.title = 'Đổi giao diện (Shift+click = nhanh tối/sáng)';
      btn.innerHTML = '🎨';
      btn.style.cssText = 'background:none;border:1px solid rgba(255,255,255,.15);color:var(--text2);border-radius:8px;padding:5px 9px;font-size:16px;cursor:pointer;transition:.15s;flex-shrink:0;line-height:1';
      if (!btn._themeWired) {
        btn._themeWired = true;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (e.shiftKey) {
            // Quick toggle: dark-navy ↔ light
            const cur = current();
            const isDark = THEMES.find(t => t.id === cur)?.dark !== false;
            apply(isDark ? 'light' : 'dark-navy');
          } else {
            togglePanel();
          }
        });
      }
    }

    // Build fresh panel with dark/light grouping
    document.getElementById('theme-picker-panel')?.remove();

    const dark  = THEMES.filter(t =>  t.dark);
    const light = THEMES.filter(t => !t.dark);
    const cur   = current();

    const panel = document.createElement('div');
    panel.id = 'theme-picker-panel';
    panel.innerHTML = `
      <div class="tp-header-row">
        <span style="font-size:13px;font-weight:800;color:var(--text)">🎨 Giao diện</span>
        <button class="tp-close-btn" title="Đóng" id="tp-close-x">✕</button>
      </div>
      <div class="theme-section-label">🌙 Tối</div>
      <div class="theme-grid" id="theme-grid-dark">
        ${dark.map(t => _cardHtml(t, cur)).join('')}
      </div>
      <div class="theme-section-label">☀️ Sáng</div>
      <div class="theme-grid" id="theme-grid-light">
        ${light.map(t => _cardHtml(t, cur)).join('')}
      </div>`;

    document.body.appendChild(panel);

    // Wire close button
    document.getElementById('tp-close-x')?.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.style.display = 'none';
      panel.classList.remove('show');
    });

    // Wire theme cards
    panel.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        apply(card.dataset.tid);
      });
    });

    // ✅ Close on outside click — clean up previous listener to avoid stacking
    if (window._themeOutsideClose) document.removeEventListener('click', window._themeOutsideClose);
    window._themeOutsideClose = (e) => {
      if (!panel.contains(e.target) && e.target.id !== 'theme-picker-btn') {
        panel.classList.remove('show');
        panel.style.display = 'none';
      }
    };
    setTimeout(() => document.addEventListener('click', window._themeOutsideClose), 0);
  }

  function _cardHtml(t, cur) {
    return `<div class="theme-card${t.id === cur ? ' active' : ''}" data-tid="${t.id}" title="${t.name}">
      <div class="theme-preview" style="background:${t.preview[0]}">
        ${t.preview.slice(1).map(c => `<span style="background:${c}"></span>`).join('')}
      </div>
      <div class="theme-name">${t.name}</div>
    </div>`;
  }

  function togglePanel() {
    const panel = document.getElementById('theme-picker-panel');
    const btn   = document.getElementById('theme-picker-btn');
    if (!panel) { _injectButton(); togglePanel(); return; }

    // ✅ Fix: check classList, not inline style — CSS .show{display:block !important} beats style=""
    const isShowing = panel.classList.contains('show');
    if (isShowing) {
      panel.classList.remove('show');
      panel.style.display = 'none';
      return;
    }

    // Position below the button, aligned right
    const rect  = btn ? btn.getBoundingClientRect() : { bottom: 60, right: window.innerWidth - 16 };
    const pw    = 300;
    let left    = rect.right - pw;
    if (left < 8) left = 8;
    if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;

    panel.style.top    = (rect.bottom + 8) + 'px';
    panel.style.left   = left + 'px';
    panel.style.right  = 'auto';
    panel.style.width  = pw + 'px';
    panel.style.display = 'block';
    panel.classList.add('show');
    _updateActiveCard(current());
  }

  function _updateActiveCard(themeId) {
    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.toggle('active', card.dataset.tid === themeId);
    });
  }

  return { init, apply, current, togglePanel };
});
