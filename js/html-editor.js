// ══════════════════════════════════════════════════════════════════
//  html-editor.js — HTML/CSS Editor với Live Preview
//  Kích hoạt khi exercise.type === 'html'
// ══════════════════════════════════════════════════════════════════
const HTMLEditor = (function() {
  'use strict';

  let _pane = null;
  let _iframe = null;
  let _previewTimer = null;
  let _active = false;

  const STARTER = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bài làm</title>
  <style>
    /* Viết CSS của bạn tại đây */
    body { font-family: Arial, sans-serif; padding: 16px; }
  </style>
</head>
<body>
  <!-- Viết HTML của bạn tại đây -->
  <h1>Xin chào!</h1>
</body>
</html>`;

  // ── Mount HTML editor pane ────────────────────────────────────────
  function mount(exercise) {
    const workspace = document.getElementById('workspace') || document.querySelector('.workspace');
    if (!workspace) return;

    _active = true;
    _pane = workspace;

    // Replace normal workspace layout with split pane
    workspace.dataset.mode = 'html';

    // Inject HTML editor UI
    workspace.innerHTML = `
      <div class="html-editor-split">
        <!-- LEFT: Code editor -->
        <div class="html-editor-left">
          <div class="html-editor-toolbar">
            <div class="htm-tools-left">
              <button class="htm-btn" onclick="HTMLEditor.insertSnippet('basic')" title="Cấu trúc HTML cơ bản">📄 HTML</button>
              <button class="htm-btn" onclick="HTMLEditor.insertSnippet('css')" title="Thêm CSS">🎨 CSS</button>
              <button class="htm-btn" onclick="HTMLEditor.insertSnippet('table')" title="Thêm bảng">📊 Bảng</button>
              <button class="htm-btn" onclick="HTMLEditor.insertSnippet('form')" title="Thêm form">📝 Form</button>
              <button class="htm-btn" onclick="HTMLEditor.formatCode()" title="Format code">✨ Format</button>
            </div>
            <div class="htm-tools-right">
              <span class="htm-lang-badge">HTML/CSS</span>
              <button class="htm-btn active" onclick="HTMLEditor.runPreview()" title="Xem Preview (Ctrl+Enter)">▶ Preview</button>
            </div>
          </div>
          <textarea id="html-code-input" class="html-code-area"
            placeholder="Viết HTML và CSS tại đây..."
            spellcheck="false" autocomplete="off"
            onkeydown="HTMLEditor.handleKey(event)"
            oninput="HTMLEditor.schedulePreview()">${STARTER}</textarea>
        </div>
        <!-- RIGHT: Preview -->
        <div class="html-editor-right">
          <div class="html-preview-toolbar">
            <span class="html-preview-label">👁 Preview</span>
            <div class="html-preview-size">
              <button class="htm-size-btn active" onclick="HTMLEditor.setPreviewSize('full')" title="Full width">⬜</button>
              <button class="htm-size-btn" onclick="HTMLEditor.setPreviewSize('tablet')" title="Tablet (768px)">📱</button>
              <button class="htm-size-btn" onclick="HTMLEditor.setPreviewSize('mobile')" title="Mobile (375px)">📲</button>
            </div>
            <button class="htm-btn" onclick="HTMLEditor.openFullscreen()" title="Mở trong tab mới">↗</button>
          </div>
          <div class="html-preview-wrap" id="html-preview-wrap">
            <iframe id="html-preview" sandbox="allow-same-origin allow-scripts"
              style="width:100%;height:100%;border:none;background:#fff"></iframe>
          </div>
        </div>
      </div>
      <!-- Bottom action bar -->
      <div class="html-action-bar">
        <button class="btn primary" onclick="HTMLEditor.runPreview()">▶ Chạy</button>
        <button class="btn success" onclick="gradeHTML()">📊 Chấm điểm</button>
        <button class="btn" onclick="HTMLEditor.resetCode()">🔄 Reset</button>
      </div>`;

    _iframe = document.getElementById('html-preview');

    // Restore saved code if any
    const saved = _getSavedCode(exercise.id);
    if (saved) {
      document.getElementById('html-code-input').value = saved;
    }

    // Auto preview on load
    runPreview();

    // Keyboard shortcut Ctrl+Enter
    document.addEventListener('keydown', _globalKeydown);
  }

  function _globalKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runPreview();
    }
  }

  // ── Unmount HTML editor ────────────────────────────────────────────
  function unmount() {
    if (!_active) return;
    _active = false;
    document.removeEventListener('keydown', _globalKeydown);
    if (_pane) {
      _pane.dataset.mode = '';
      _pane.innerHTML = '';
    }
    _iframe = null;
    _pane = null;
  }

  // ── Live preview ───────────────────────────────────────────────────
  function schedulePreview() {
    clearTimeout(_previewTimer);
    _previewTimer = setTimeout(runPreview, 600);
  }

  function runPreview() {
    const ta = document.getElementById('html-code-input');
    if (!ta || !_iframe) return;
    const code = ta.value;
    // Save to localStorage
    if (window.currentExId) _saveCode(window.currentExId, code);
    // Write to iframe
    try {
      const doc = _iframe.contentDocument || _iframe.contentWindow.document;
      doc.open();
      doc.write(code);
      doc.close();
    } catch(e) {
      _iframe.srcdoc = code;
    }
  }

  // ── Preview size ───────────────────────────────────────────────────
  function setPreviewSize(size) {
    const wrap = document.getElementById('html-preview-wrap');
    if (!wrap) return;
    const sizes = { full:'100%', tablet:'768px', mobile:'375px' };
    wrap.style.maxWidth = sizes[size] || '100%';
    wrap.style.margin = size === 'full' ? '0' : '0 auto';
    document.querySelectorAll('.htm-size-btn').forEach(b => b.classList.remove('active'));
    event?.target?.classList.add('active');
  }

  // ── Snippet insertion ─────────────────────────────────────────────
  const SNIPPETS = {
    basic: `<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <title>Tiêu đề</title>\n  <style>\n    body { font-family: Arial; padding: 16px; }\n  </style>\n</head>\n<body>\n  <h1>Tiêu đề</h1>\n  <p>Nội dung</p>\n</body>\n</html>`,
    css: `<style>\n  /* CSS của bạn */\n  body { font-family: Arial; margin: 0; padding: 16px; }\n  h1 { color: #2196F3; }\n</style>`,
    table: `<table border="1" style="border-collapse: collapse; width: 100%;">\n  <thead>\n    <tr><th>Tiêu đề 1</th><th>Tiêu đề 2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Dữ liệu 1</td><td>Dữ liệu 2</td></tr>\n  </tbody>\n</table>`,
    form: `<form action="#" method="post">\n  <label for="ten">Họ tên:</label>\n  <input type="text" id="ten" name="ten" placeholder="Nhập họ tên">\n  <br><br>\n  <button type="submit">Gửi</button>\n</form>`,
  };

  function insertSnippet(type) {
    const ta = document.getElementById('html-code-input');
    if (!ta) return;
    const snippet = SNIPPETS[type];
    if (!snippet) return;
    const start = ta.selectionStart;
    const val = ta.value;
    ta.value = val.slice(0, start) + snippet + val.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = start + snippet.length;
    ta.focus();
    schedulePreview();
  }

  // ── Tab key support ────────────────────────────────────────────────
  function handleKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      ta.value = ta.value.slice(0, start) + '  ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = start + 2;
      schedulePreview();
    }
  }

  // ── Format code (basic indent normalize) ─────────────────────────
  function formatCode() {
    const ta = document.getElementById('html-code-input');
    if (!ta) return;
    let code = ta.value;
    // Very basic: normalize line endings
    code = code.replace(/\r\n/g, '\n').replace(/\t/g, '  ');
    ta.value = code;
    if (typeof toast === 'function') toast('✨ Code đã được format');
    runPreview();
  }

  // ── Reset to starter code ────────────────────────────────────────
  function resetCode() {
    if (!confirm('Reset về code mặc định? Code hiện tại sẽ bị xóa.')) return;
    const ta = document.getElementById('html-code-input');
    if (ta) { ta.value = STARTER; runPreview(); }
  }

  // ── Open in new tab ───────────────────────────────────────────────
  function openFullscreen() {
    const ta = document.getElementById('html-code-input');
    if (!ta) return;
    const win = window.open('', '_blank');
    win.document.write(ta.value);
    win.document.close();
  }

  // ── Get current code ──────────────────────────────────────────────
  function getCode() {
    const ta = document.getElementById('html-code-input');
    return ta ? ta.value : '';
  }

  // ── Storage ──────────────────────────────────────────────────────
  function _saveCode(exId, code) {
    try { localStorage.setItem('cl_html_' + exId, code); } catch{}
  }
  function _getSavedCode(exId) {
    try { return localStorage.getItem('cl_html_' + exId); } catch{ return null; }
  }

  return { mount, unmount, runPreview, schedulePreview, getCode,
           insertSnippet, handleKey, formatCode, resetCode, openFullscreen, setPreviewSize };
})();
