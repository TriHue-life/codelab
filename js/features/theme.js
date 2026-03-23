/**
 * features/theme.js — Theme & Editor Settings
 * ═══════════════════════════════════════════════════════════════
 * 8 themes: Dark Navy, One Dark, Dracula, Monokai,
 *           GitHub Dark, Solarized Dark, Light, Solarized Light
 * + Editor font size, font family, line height settings
 * Keyboard: Shift+T = toggle panel | Shift+click btn = quick toggle
 */
'use strict';

CL.define('Features.Theme', () => {

  const LS_KEY        = 'cl_theme';
  const LS_FONT_SIZE  = 'cl_editor_fontsize';
  const LS_FONT_FAM   = 'cl_editor_fontfam';
  const LS_LINE_HT    = 'cl_editor_lineheight';

  const THEMES = [
    { id: 'dark-navy',      name: 'Dark Navy',       dark: true,  preview: ['#0a0e1a','#4f9eff','#34d399','#a78bfa'] },
    { id: 'one-dark',       name: 'One Dark',        dark: true,  preview: ['#282c34','#61afef','#98c379','#c678dd'] },
    { id: 'dracula',        name: 'Dracula',         dark: true,  preview: ['#282a36','#8be9fd','#50fa7b','#bd93f9'] },
    { id: 'monokai',        name: 'Monokai',         dark: true,  preview: ['#272822','#66d9e8','#a6e22e','#ae81ff'] },
    { id: 'github-dark',    name: 'GitHub Dark',     dark: true,  preview: ['#0d1117','#58a6ff','#3fb950','#bc8cff'] },
    { id: 'solarized-dark', name: 'Solarized Dark',  dark: true,  preview: ['#002b36','#268bd2','#859900','#6c71c4'] },
    { id: 'light',          name: 'Light',           dark: false, preview: ['#f3f3f3','#0969da','#1a7f37','#8250df'] },
    { id: 'solarized-light',name: 'Solarized Light', dark: false, preview: ['#fdf6e3','#268bd2','#859900','#6c71c4'] },
  ];

  const FONT_FAMILIES = [
    { id: 'default',       name: 'Mặc định',         css: "'JetBrains Mono','Cascadia Code','Fira Code','Consolas',monospace" },
    { id: 'jetbrains',     name: 'JetBrains Mono',   css: "'JetBrains Mono',monospace" },
    { id: 'cascadia',      name: 'Cascadia Code',    css: "'Cascadia Code',monospace" },
    { id: 'consolas',      name: 'Consolas',         css: "'Consolas','Courier New',monospace" },
    { id: 'firacode',      name: 'Fira Code',        css: "'Fira Code',monospace" },
    { id: 'sourcecodepro', name: 'Source Code Pro',  css: "'Source Code Pro',monospace" },
  ];

  const FONT_SIZES   = [11, 12, 13, 14, 15, 16, 18];
  const LINE_HEIGHTS = [
    { id: '1.4', name: 'Compact',  value: 1.4 },
    { id: '1.6', name: 'Normal',   value: 1.6 },
    { id: '1.8', name: 'Relaxed',  value: 1.8 },
    { id: '2.0', name: 'Spacious', value: 2.0 },
  ];

  // ── Apply theme ───────────────────────────────────────────────
  function apply(themeId) {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    document.documentElement.setAttribute('data-theme', theme.id);
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
    meta.content = theme.preview[0];
    localStorage.setItem(LS_KEY, theme.id);
    _updateActiveCard(theme.id);
  }

  // ── Apply editor font/size settings via injected <style> ─────
  function applyEditorSettings() {
    const fs  = parseInt(localStorage.getItem(LS_FONT_SIZE)) || 13;
    const fam = localStorage.getItem(LS_FONT_FAM) || 'default';
    const lh  = parseFloat(localStorage.getItem(LS_LINE_HT)) || 1.6;
    const famDef = FONT_FAMILIES.find(f => f.id === fam) || FONT_FAMILIES[0];

    let s = document.getElementById('_cl_editor_style');
    if (!s) { s = document.createElement('style'); s.id = '_cl_editor_style'; document.head.appendChild(s); }

    s.textContent = `
      #code-input, .editor-wrap textarea, .html-editor-wrap textarea,
      .hl-kw,.hl-fn,.hl-cls,.hl-bi,.hl-str,.hl-num,.hl-cmt,.hl-self,.hl-bool,
      .hl-deco,.hl-op,.hl-punc,.hl-plain,.hl-tag,.hl-attr,.hl-attrval,.hl-entity,
      .hl-css-sel,.hl-css-prop,.hl-css-val,.hl-css-unit,.hl-css-color,.hl-css-at,
      .hl-sql-kw,.hl-sql-fn,.hl-sql-type,.hl-sql-id {
        font-size: ${fs}px !important;
        font-family: ${famDef.css} !important;
        line-height: ${lh} !important;
      }
      .lnums span { height: calc(${fs}px * ${lh}) !important; line-height: ${lh} !important; }
    `;
  }

  function setFontSize(sz)  { localStorage.setItem(LS_FONT_SIZE, sz);  applyEditorSettings(); _updateEditorControls(); }
  function setFontFamily(id){ localStorage.setItem(LS_FONT_FAM,  id);  applyEditorSettings(); _updateEditorControls(); }
  function setLineHeight(v) { localStorage.setItem(LS_LINE_HT,   v);   applyEditorSettings(); _updateEditorControls(); }
  function current()        { return localStorage.getItem(LS_KEY) || 'dark-navy'; }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    apply(current());
    applyEditorSettings();
    _injectButton();
    document.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key === 'T' &&
          !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName || '')) {
        e.preventDefault();
        togglePanel();
      }
    });
  }

  // ── Wire button ───────────────────────────────────────────────
  function _injectButton() {
    const btn = document.getElementById('theme-picker-btn');
    if (btn) {
      btn.title = 'Cài đặt giao diện & Editor (Shift+T)';
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="display:block;flex-shrink:0">
        <circle cx="8" cy="8" r="2.2" fill="currentColor"/>
        <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.27 1.27M11.33 11.33l1.27 1.27M3.4 12.6l1.27-1.27M11.33 4.67l1.27-1.27"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`;
      if (!btn._themeWired) {
        btn._themeWired = true;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (e.shiftKey) {
            const isDark = THEMES.find(t => t.id === current())?.dark !== false;
            apply(isDark ? 'light' : 'dark-navy');
          } else {
            togglePanel();
          }
        });
      }
    }
    _buildPanel();
  }

  // ── Build panel HTML ─────────────────────────────────────────
  function _buildPanel() {
    document.getElementById('theme-picker-panel')?.remove();
    const dark  = THEMES.filter(t =>  t.dark);
    const light = THEMES.filter(t => !t.dark);
    const cur   = current();
    const curFs  = parseInt(localStorage.getItem(LS_FONT_SIZE)) || 13;
    const curFam = localStorage.getItem(LS_FONT_FAM) || 'default';
    const curLh  = localStorage.getItem(LS_LINE_HT) || '1.6';

    const panel = document.createElement('div');
    panel.id = 'theme-picker-panel';
    panel.innerHTML = `
      <div class="tp-header-row">
        <span>⚙ Giao diện &amp; Editor</span>
        <button class="tp-close-btn" id="tp-close-x" title="Đóng (Esc)">✕</button>
      </div>

      <div class="theme-section-label">🎨 Màu giao diện</div>
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text3);margin-bottom:4px">🌙 Tối</div>
      <div class="theme-grid" id="theme-grid-dark">
        ${dark.map(t => _cardHtml(t, cur)).join('')}
      </div>
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text3);margin:8px 0 4px">☀ Sáng</div>
      <div class="theme-grid" id="theme-grid-light">
        ${light.map(t => _cardHtml(t, cur)).join('')}
      </div>

      <div class="theme-section-label" style="margin-top:12px">✏ Cài đặt Editor</div>

      <div class="tp-editor-row">
        <span class="tp-editor-label">Cỡ chữ</span>
        <div class="tp-font-btns" id="tp-font-size-btns">
          ${FONT_SIZES.map(sz => `<button class="tp-sz-btn${sz === curFs ? ' active' : ''}" data-sz="${sz}">${sz}</button>`).join('')}
        </div>
      </div>

      <div class="tp-editor-row">
        <span class="tp-editor-label">Font</span>
        <select class="tp-select" id="tp-font-fam">
          ${FONT_FAMILIES.map(f => `<option value="${f.id}"${f.id === curFam ? ' selected' : ''}>${f.name}</option>`).join('')}
        </select>
      </div>

      <div class="tp-editor-row">
        <span class="tp-editor-label">Dãn dòng</span>
        <div class="tp-seg" id="tp-lineht-btns">
          ${LINE_HEIGHTS.map(lh => `<button class="tp-seg-btn${lh.id === curLh ? ' active' : ''}" data-lh="${lh.value}">${lh.name}</button>`).join('')}
        </div>
      </div>

      <div class="tp-shortcut-hint">
        <kbd>Shift</kbd>+<kbd>T</kbd> mở/đóng &nbsp;·&nbsp; <kbd>Shift</kbd>+click chuyển tối↔sáng
      </div>
    `;

    document.body.appendChild(panel);

    document.getElementById('tp-close-x')?.addEventListener('click', (e) => { e.stopPropagation(); _hidePanel(); });
    panel.querySelectorAll('.theme-card').forEach(c => c.addEventListener('click', (e) => { e.stopPropagation(); apply(c.dataset.tid); }));
    panel.querySelectorAll('.tp-sz-btn').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); setFontSize(parseInt(b.dataset.sz)); }));
    panel.querySelector('#tp-font-fam')?.addEventListener('change', (e) => setFontFamily(e.target.value));
    panel.querySelectorAll('.tp-seg-btn').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); setLineHeight(b.dataset.lh); }));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('show')) _hidePanel();
    });

    if (window._themeOutsideClose) document.removeEventListener('click', window._themeOutsideClose);
    window._themeOutsideClose = (e) => {
      if (!panel.contains(e.target) && e.target.id !== 'theme-picker-btn') _hidePanel();
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

  function _hidePanel() {
    const p = document.getElementById('theme-picker-panel');
    if (!p) return;
    p.classList.remove('show');
    p.style.display = 'none';
  }

  function togglePanel() {
    const panel = document.getElementById('theme-picker-panel');
    const btn   = document.getElementById('theme-picker-btn');
    if (!panel) { _buildPanel(); togglePanel(); return; }
    if (panel.classList.contains('show')) { _hidePanel(); return; }

    const rect = btn ? btn.getBoundingClientRect() : { bottom: 60, right: window.innerWidth - 16 };
    const pw   = 296;
    let left   = rect.right - pw;
    if (left < 8) left = 8;
    if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
    panel.style.top     = (rect.bottom + 6) + 'px';
    panel.style.left    = left + 'px';
    panel.style.right   = 'auto';
    panel.style.width   = pw + 'px';
    panel.style.display = 'block';
    panel.classList.add('show');
    _updateActiveCard(current());
    _updateEditorControls();
  }

  function _updateActiveCard(themeId) {
    document.querySelectorAll('.theme-card').forEach(c => c.classList.toggle('active', c.dataset.tid === themeId));
  }

  function _updateEditorControls() {
    const curFs = parseInt(localStorage.getItem(LS_FONT_SIZE)) || 13;
    const curLh = localStorage.getItem(LS_LINE_HT) || '1.6';
    const curFam = localStorage.getItem(LS_FONT_FAM) || 'default';
    document.querySelectorAll('.tp-sz-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.sz) === curFs));
    document.querySelectorAll('.tp-seg-btn').forEach(b => b.classList.toggle('active', b.dataset.lh === curLh));
    const sel = document.getElementById('tp-font-fam');
    if (sel) sel.value = curFam;
  }

  return { init, apply, current, togglePanel };
});
