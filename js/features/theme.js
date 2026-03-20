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
    // Wire the button (already in HTML)
    const existBtn = document.getElementById('theme-picker-btn');
    if (existBtn) {
      existBtn.title = 'Đổi giao diện';
      existBtn.innerHTML = '🎨';
      existBtn.style.cssText = [
        'background:none',
        'border:1px solid var(--border)',
        'color:var(--text2)',
        'border-radius:8px',
        'padding:5px 8px',
        'font-size:15px',
        'cursor:pointer',
        'transition:.15s',
        'line-height:1',
        'flex-shrink:0',
      ].join(';');
      existBtn.onclick = (e) => { e.stopPropagation(); togglePanel(); };
    }

    // Remove old panel if exists (re-init)
    document.getElementById('theme-picker-panel')?.remove();

    // Create panel fresh
    const panel = document.createElement('div');
    panel.id = 'theme-picker-panel';
    panel.innerHTML = `
      <div class="tp-header-row">
        <span>🎨 Giao diện</span>
        <button class="tp-close-btn" onclick="CL.Features.Theme.togglePanel()">✕</button>
      </div>
      <div class="theme-grid" id="theme-grid">
        ${THEMES.map(t => `
          <div class="theme-card${t.id === current() ? ' active' : ''}"
               data-tid="${t.id}"
               onclick="CL.Features.Theme.apply('${t.id}')"
               title="${t.name}">
            <div class="theme-preview" style="background:${t.preview[0]}">
              ${t.preview.slice(1).map(c => `<span style="background:${c}"></span>`).join('')}
            </div>
            <div class="theme-name">${t.name}</div>
          </div>`).join('')}
      </div>`;
    document.body.appendChild(panel);

    // Position panel below the button
    panel.style.cssText = 'position:fixed;z-index:99999;display:none';

    // Close on outside click (use capture to catch before stopPropagation)
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#theme-picker-panel') && !e.target.closest('#theme-picker-btn')) {
        panel.classList.remove('show');
        panel.style.display = 'none';
      }
    }, true);
  }

  function togglePanel() {
    const panel = document.getElementById('theme-picker-panel');
    const btn   = document.getElementById('theme-picker-btn');
    if (!panel) return;

    const isShowing = panel.style.display === 'block';
    if (isShowing) {
      panel.style.display = 'none';
      panel.classList.remove('show');
      return;
    }

    // Position below the button
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const pw   = 280;
      let left   = rect.right - pw;
      if (left < 8) left = 8;
      panel.style.top  = (rect.bottom + 6) + 'px';
      panel.style.left = left + 'px';
      panel.style.right = 'auto';
    } else {
      panel.style.top   = '60px';
      panel.style.right = '16px';
      panel.style.left  = 'auto';
    }

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
