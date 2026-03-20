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

  // ── Inject theme button into header ──────────────────────────
  function _injectButton() {
    // #theme-picker-btn already exists in index.html (in #topbar)
    // Just wire it up and create the panel
    const existBtn = document.getElementById('theme-picker-btn');
    if (existBtn) {
      existBtn.title = 'Đổi giao diện (chọn theme)';
      existBtn.innerHTML = '🎨 Theme';
      existBtn.style.cssText = 'background:none;border:1px solid var(--border);color:var(--text2);border-radius:8px;padding:5px 10px;font-size:12px;cursor:pointer;transition:.15s;font-family:var(--sans);font-weight:600;white-space:nowrap';
      existBtn.onclick = togglePanel;
    }
    if (document.getElementById('theme-picker-panel')) return;

    // Create panel
    const panel = document.createElement('div');
    panel.id = 'theme-picker-panel';
    panel.innerHTML = `
      <div class="tp-header-row">
        <span>🎨 Chọn giao diện</span>
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

    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('#theme-picker-panel') && !e.target.closest('#theme-picker-btn')) {
        panel.classList.remove('show');
      }
    });
  }

  function togglePanel() {
    const panel = document.getElementById('theme-picker-panel');
    if (panel) panel.classList.toggle('show');
  }

  function _updateActiveCard(themeId) {
    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.toggle('active', card.dataset.tid === themeId);
    });
  }

  return { init, apply, current, togglePanel };
});
