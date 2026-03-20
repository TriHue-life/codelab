/**
 * editors/html.js — HTML/CSS Editor với Live Preview
 * ═══════════════════════════════════════════════════════════════
 * Kích hoạt khi exercise.type === 'html'
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, exercises/registry.js
 */

'use strict';

CL.define('Editors.Html', () => {

  const cfg      = CL.require('Config');
  const Utils    = CL.require('Utils');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');
  const Store    = CL.require('Store');

  let _container = null;
  let _iframe    = null;
  let _timer     = null;

  const STARTER = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bài làm</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
  </style>
</head>
<body>
  <!-- Viết HTML của bạn tại đây -->
  <h1>Xin chào!</h1>
</body>
</html>`;

  const SNIPPETS = {
    basic:  `<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <title>Tiêu đề</title>\n  <style>\n    body { font-family: Arial; padding: 16px; }\n  </style>\n</head>\n<body>\n  <h1>Tiêu đề</h1>\n  <p>Nội dung</p>\n</body>\n</html>`,
    css:    `<style>\n  /* CSS của bạn */\n  body { font-family: Arial; margin: 0; padding: 16px; }\n  h1 { color: #2196F3; }\n</style>`,
    table:  `<table border="1" style="border-collapse:collapse;width:100%">\n  <thead><tr><th>Tiêu đề 1</th><th>Tiêu đề 2</th></tr></thead>\n  <tbody><tr><td>Dữ liệu 1</td><td>Dữ liệu 2</td></tr></tbody>\n</table>`,
    form:   `<form action="#" method="post">\n  <label for="ten">Họ tên:</label>\n  <input type="text" id="ten" name="ten" placeholder="Nhập họ tên">\n  <br><br>\n  <button type="submit">Gửi</button>\n</form>`,
  };

  // ── Mount ─────────────────────────────────────────────────────

  function mount(exercise) {
    const ws = document.getElementById('workspace') || document.querySelector('.workspace');
    if (!ws) return;
    _container = ws;
    ws.dataset.mode = 'html';

    ws.innerHTML = `
      <div class="html-editor-split">
        <div class="html-editor-left">
          <div class="html-editor-toolbar">
            <div class="htm-tools-left">
              <span class="htm-lang-badge">HTML/CSS</span>
              <button class="htm-btn" onclick="CL.Editors.Html.insertSnippet('basic')">📄 HTML</button>
              <button class="htm-btn" onclick="CL.Editors.Html.insertSnippet('css')">🎨 CSS</button>
              <button class="htm-btn" onclick="CL.Editors.Html.insertSnippet('table')">📊 Bảng</button>
              <button class="htm-btn" onclick="CL.Editors.Html.insertSnippet('form')">📝 Form</button>
            </div>
            <div class="htm-tools-right">
              <button class="htm-btn active" onclick="CL.Editors.Html.runPreview()">▶ Preview</button>
            </div>
          </div>
          <div class="html-editor-wrap" style="position:relative;flex:1;overflow:hidden">
            <div class="html-hl-overlay" id="html-hl-overlay"></div>
            <textarea id="html-code-input" class="html-code-area"
              placeholder="Viết HTML và CSS tại đây..."
              spellcheck="false" autocomplete="off"
              onkeydown="CL.Editors.Html.handleKey(event)"
              onscroll="CL.Editors.Html.syncScroll()"
              oninput="CL.Editors.Html.onInput()"></textarea>
          </div>
        </div>
        <div class="html-editor-right">
          <div class="html-preview-toolbar">
            <span class="html-preview-label">👁 Preview</span>
            <div class="html-preview-size">
              <button class="htm-size-btn active" onclick="CL.Editors.Html.setSize('full')">⬜</button>
              <button class="htm-size-btn" onclick="CL.Editors.Html.setSize('tablet')">📱</button>
              <button class="htm-size-btn" onclick="CL.Editors.Html.setSize('mobile')">📲</button>
            </div>
            <button class="htm-btn" onclick="CL.Editors.Html.openFullscreen()">↗</button>
          </div>
          <div class="html-preview-wrap" id="html-preview-wrap">
            <iframe id="html-preview" sandbox="allow-same-origin allow-scripts"
              style="width:100%;height:100%;border:none;background:#fff"></iframe>
          </div>
        </div>
      </div>
      <div class="html-action-bar">
        <button class="btn primary" onclick="CL.Editors.Html.runPreview()">▶ Chạy</button>
        <button class="btn success" onclick="gradeHTML()">📊 Chấm điểm</button>
        <button class="btn" onclick="CL.Editors.Html.reset()">🔄 Reset</button>
      </div>`;

    _iframe = document.getElementById('html-preview');
    const saved = _load(exercise.id);
    document.getElementById('html-code-input').value = saved || STARTER;
    document.addEventListener('keydown', _onKeydown);
    runPreview();
  }

  function unmount() {
    if (!_container) return;
    _container.dataset.mode = '';
    _container.innerHTML = '';
    _container = _iframe = null;
    document.removeEventListener('keydown', _onKeydown);
  }

  // ── Preview ───────────────────────────────────────────────────

  function updateHtmlHighlight() {
    const ta = document.getElementById('html-code-input');
    const ov = document.getElementById('html-hl-overlay');
    if (!ta || !ov) return;
    const Syn = typeof CL !== 'undefined' && CL.Editors?.Syntax;
    ov.innerHTML = Syn ? Syn.html(ta.value) + '\n' : ta.value;
    syncScroll();
  }

  function syncScroll() {
    const ta = document.getElementById('html-code-input');
    const ov = document.getElementById('html-hl-overlay');
    if (ta && ov) { ov.scrollTop = ta.scrollTop; ov.scrollLeft = ta.scrollLeft; }
  }

  function onInput() {
    schedulePreview();
    clearTimeout(_hlTimer);
    _hlTimer = setTimeout(updateHtmlHighlight, 30);
  }
  let _hlTimer = null;

  function schedulePreview() {
    clearTimeout(_timer);
    _timer = setTimeout(runPreview, 600);
  }

  function runPreview() {
    const ta = document.getElementById('html-code-input');
    if (!ta || !_iframe) return;
    _save(Store.get('currentExId'), ta.value);
    try {
      const doc = _iframe.contentDocument || _iframe.contentWindow.document;
      doc.open(); doc.write(ta.value); doc.close();
    } catch { _iframe.srcdoc = ta.value; }
  }

  function _onKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault(); runPreview();
    }
  }

  // ── Size presets ──────────────────────────────────────────────

  function setSize(size) {
    const wrap = document.getElementById('html-preview-wrap');
    if (!wrap) return;
    const w = { full: '100%', tablet: '768px', mobile: '375px' };
    wrap.style.maxWidth = w[size] || '100%';
    wrap.style.margin   = size === 'full' ? '0' : '0 auto';
    document.querySelectorAll('.htm-size-btn').forEach(b => b.classList.remove('active'));
    event?.target?.classList.add('active');
  }

  // ── Snippets ──────────────────────────────────────────────────

  function insertSnippet(key) {
    const ta = document.getElementById('html-code-input');
    if (!ta || !SNIPPETS[key]) return;
    const s = ta.selectionStart;
    ta.value = ta.value.slice(0, s) + SNIPPETS[key] + ta.value.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = s + SNIPPETS[key].length;
    ta.focus(); schedulePreview();
  }

  function handleKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const s  = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 2;
      schedulePreview();
    }
  }

  // ── Helpers ───────────────────────────────────────────────────

  function reset() {
    if (!confirm('Reset về code mặc định?')) return;
    const ta = document.getElementById('html-code-input');
    if (ta) { ta.value = STARTER; runPreview(); }
  }

  function openFullscreen() {
    const ta = document.getElementById('html-code-input');
    if (!ta) return;
    const w = window.open('', '_blank');
    w.document.write(ta.value); w.document.close();
  }

  function getCode() {
    return document.getElementById('html-code-input')?.value || '';
  }

  function applyCode(code) {
    const ta = document.getElementById('html-code-input');
    if (ta) { ta.value = code; runPreview(); }
  }

  function _save(id, code) {
    if (id) try { localStorage.setItem(cfg.LS.HTML_CODE + id, code); } catch {}
  }
  function _load(id) {
    try { return localStorage.getItem(cfg.LS.HTML_CODE + id); } catch { return null; }
  }

  // Backward compat
  window.HTMLEditor = { mount, unmount, runPreview, schedulePreview, getCode, insertSnippet, handleKey, reset, openFullscreen, setPreviewSize: setSize };

  return { mount, unmount, runPreview, schedulePreview, getCode, applyCode,
           insertSnippet, handleKey, reset, openFullscreen, setSize };
});
