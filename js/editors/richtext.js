/**
 * editors/richtext.js — Rich Text Editor (Canvas LMS style)
 * ═══════════════════════════════════════════════════════════════
 * Powered by Quill 2 + quill-better-table + KaTeX
 *
 * Features:
 *   - Canvas LMS-style 2-row toolbar
 *   - Tables (quill-better-table)
 *   - Math formulas $$...$$ (KaTeX, lazy-loaded)
 *   - Code blocks with syntax hint
 *   - Drag-drop + paste image → upload to Google Drive
 *   - Image by URL dialog
 *   - HTML source toggle </> 
 *   - Vietnamese unicode, Ctrl+S save
 *
 * Output: clean HTML string, rendered by student browser
 *         + KaTeX auto-render for $$...$$ blocks
 *
 * API:
 *   CL.Editors.RichText.mount(containerId, initialHtml, onSave)
 *   CL.Editors.RichText.unmount(containerId)
 *   CL.Editors.RichText.getHtml(containerId)
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Editors.RichText', () => {

  const Utils = CL.require('Utils');

  // ── CDN urls ─────────────────────────────────────────────────
  const CDN = {
    quillCss:  'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css',
    quillJs:   'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js',
    tableCss:  'https://cdn.jsdelivr.net/npm/quill-better-table@1.2.10/dist/quill-better-table.min.css',
    tableJs:   'https://cdn.jsdelivr.net/npm/quill-better-table@1.2.10/dist/quill-better-table.min.js',
    katexCss:  'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
    katexJs:   'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
    katexAuto: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js',
  };

  let _quillReady = false;
  let _katexReady = false;
  const _instances = {};  // containerId → { quill, wrapper, showingSource }

  // ══════════════════════════════════════════════════════════════
  //  LOADERS
  // ══════════════════════════════════════════════════════════════

  function _loadCss(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const el = Object.assign(document.createElement('link'), { rel: 'stylesheet', href });
    document.head.appendChild(el);
  }

  function _loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = () => reject(new Error('Không thể tải: ' + src));
      document.head.appendChild(s);
    });
  }

  async function _loadQuill() {
    if (_quillReady && typeof Quill !== 'undefined') return;
    _loadCss(CDN.quillCss);
    _loadCss(CDN.tableCss);
    await _loadScript(CDN.quillJs);
    await _loadScript(CDN.tableJs);
    // Register quill-better-table
    if (typeof QuillBetterTable !== 'undefined') {
      Quill.register({ 'modules/better-table': QuillBetterTable }, true);
    }
    _quillReady = true;
  }

  async function _loadKatex() {
    if (_katexReady && typeof katex !== 'undefined') return;
    _loadCss(CDN.katexCss);
    await _loadScript(CDN.katexJs);
    await _loadScript(CDN.katexAuto);
    _katexReady = true;
  }

  // ══════════════════════════════════════════════════════════════
  //  TOOLBAR CONFIG (Canvas LMS style — 2 rows)
  // ══════════════════════════════════════════════════════════════

  const TOOLBAR = [
    // Row 1: text format
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['clean'],
    // Row 2: blocks + media
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ align: [] }],
  ];

  // ══════════════════════════════════════════════════════════════
  //  MOUNT
  // ══════════════════════════════════════════════════════════════

  async function mount(containerId, initialHtml, onSave) {
    await _loadQuill();

    const container = document.getElementById(containerId);
    if (!container) throw new Error(`#${containerId} không tìm thấy`);

    unmount(containerId);

    // ── Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'rte-wrapper';
    wrapper.id = `rte-wrap-${containerId}`;

    // ── Upload progress bar (hidden)
    const uploadBar = document.createElement('div');
    uploadBar.className = 'rte-upload-bar';
    uploadBar.id = `rte-ubar-${containerId}`;
    uploadBar.innerHTML = `<div class="rte-upload-inner" id="rte-uinner-${containerId}"></div>`;

    // ── Quill container
    const editorDiv = document.createElement('div');
    editorDiv.id = `rte-ql-${containerId}`;
    editorDiv.className = 'rte-editor-area';

    // ── HTML source textarea
    const srcArea = document.createElement('textarea');
    srcArea.id = `rte-src-${containerId}`;
    srcArea.className = 'rte-source-area';
    srcArea.placeholder = '<!-- Dán hoặc gõ HTML tại đây -->';
    srcArea.spellcheck = false;

    // ── Bottom actions bar
    const actBar = document.createElement('div');
    actBar.className = 'rte-actions';
    actBar.innerHTML = `
      <div class="rte-actions-left">
        <button class="rte-btn rte-btn-icon" id="rte-toggle-${containerId}"
          title="Xem/chỉnh HTML nguồn">&lt;/&gt;</button>
        <button class="rte-btn rte-btn-icon" id="rte-math-${containerId}"
          title="Chèn công thức toán (LaTeX)">∑</button>
        <button class="rte-btn rte-btn-icon" id="rte-table-${containerId}"
          title="Chèn bảng">⊞</button>
        <button class="rte-btn rte-btn-icon" id="rte-img-${containerId}"
          title="Chèn ảnh từ URL hoặc upload">🖼</button>
      </div>
      <div class="rte-actions-right">
        <span class="rte-hint">Ctrl+S lưu · Kéo thả ảnh để upload</span>
      </div>`;

    wrapper.appendChild(uploadBar);
    wrapper.appendChild(editorDiv);
    wrapper.appendChild(srcArea);
    wrapper.appendChild(actBar);

    container.style.display = 'none';
    container.parentNode.insertBefore(wrapper, container.nextSibling);

    // ── Init Quill
    const tableModule = typeof QuillBetterTable !== 'undefined'
      ? { 'better-table': { operationMenu: { items: {
            insertColumnRight: { text: 'Thêm cột phải' },
            insertColumnLeft:  { text: 'Thêm cột trái' },
            insertRowUp:       { text: 'Thêm hàng trên' },
            insertRowDown:     { text: 'Thêm hàng dưới' },
            mergeCells:        { text: 'Gộp ô' },
            unmergeCells:      { text: 'Bỏ gộp' },
            deleteColumn:      { text: 'Xóa cột' },
            deleteRow:         { text: 'Xóa hàng' },
            deleteTable:       { text: 'Xóa bảng' },
          }}} }
      : {};

    const quill = new Quill(`#rte-ql-${containerId}`, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR,
          handlers: {
            image: () => _showImageDialog(containerId, quill),
          },
        },
        ...tableModule,
        history: { delay: 1000, maxStack: 100 },
      },
      placeholder: 'Soạn nội dung đề bài / lý thuyết...',
    });

    // Set initial content
    if (initialHtml) {
      quill.root.innerHTML = initialHtml;
    }

    _instances[containerId] = { quill, wrapper, showingSource: false };

    // ── Event handlers

    // Save
    const doSave = async () => {
      const html = getHtml(containerId);
      const btn  = document.getElementById(`rte-save-${containerId}`);
      if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang lưu...'; }
      try {
        if (onSave) await onSave(html);
        // Update display
        container.innerHTML = html || '<div class="criteria-empty"><div class="ci-icon">📝</div><div>Chưa có nội dung.</div></div>';
        // Render math in saved content
        _renderMath(container);
      } catch(e) {
        alert('Lỗi lưu: ' + e.message);
        if (btn) { btn.disabled = false; btn.textContent = '💾 Lưu'; }
        return;
      }
      unmount(containerId);
      container.style.display = '';
    };

    // Event listeners for save/cancel buttons removed (buttons hidden)

    // Ctrl+S
    quill.root.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); doSave(); }
    });

    // HTML source toggle
    document.getElementById(`rte-toggle-${containerId}`)?.addEventListener('click', () => {
      _toggleSource(containerId);
    });

    // Math insert
    document.getElementById(`rte-math-${containerId}`)?.addEventListener('click', () => {
      _showMathDialog(containerId, quill);
    });

    // Table insert
    document.getElementById(`rte-table-${containerId}`)?.addEventListener('click', () => {
      _showTableDialog(containerId, quill);
    });

    // Image insert
    document.getElementById(`rte-img-${containerId}`)?.addEventListener('click', () => {
      _showImageDialog(containerId, quill);
    });

    // Drag-drop image onto editor
    quill.root.addEventListener('dragover', e => e.preventDefault());
    quill.root.addEventListener('drop', e => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files?.length) _handleImageFiles(containerId, quill, files);
    });

    // Paste image
    quill.root.addEventListener('paste', e => {
      const items = e.clipboardData?.items || [];
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) _handleImageFiles(containerId, quill, [file]);
          break;
        }
      }
    });

    setTimeout(() => quill.focus(), 100);
  }

  // ══════════════════════════════════════════════════════════════
  //  HTML SOURCE TOGGLE
  // ══════════════════════════════════════════════════════════════

  function _toggleSource(containerId) {
    const inst    = _instances[containerId];
    if (!inst) return;
    const srcEl   = document.getElementById(`rte-src-${containerId}`);
    const togBtn  = document.getElementById(`rte-toggle-${containerId}`);
    const qlWrap  = inst.wrapper.querySelector('.ql-container');
    const qlBar   = inst.wrapper.querySelector('.ql-toolbar');

    if (!inst.showingSource) {
      // → HTML source
      const html = inst.quill.root.innerHTML;
      srcEl.value = _prettyHtml(html === '<p><br></p>' ? '' : html);
      srcEl.style.display = 'block';
      if (qlWrap) qlWrap.style.display = 'none';
      if (qlBar)  qlBar.style.display  = 'none';
      if (togBtn) { togBtn.textContent = '✏️'; togBtn.title = 'Quay lại WYSIWYG'; togBtn.classList.add('on'); }
      srcEl.focus();
      inst.showingSource = true;
    } else {
      // → WYSIWYG
      inst.quill.root.innerHTML = srcEl.value.trim() || '<p><br></p>';
      srcEl.style.display = 'none';
      if (qlWrap) qlWrap.style.display = '';
      if (qlBar)  qlBar.style.display  = '';
      if (togBtn) { togBtn.innerHTML = '&lt;/&gt;'; togBtn.title = 'Xem/chỉnh HTML nguồn'; togBtn.classList.remove('on'); }
      inst.quill.focus();
      inst.showingSource = false;
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  MATH DIALOG
  // ══════════════════════════════════════════════════════════════

  function _showMathDialog(containerId, quill) {
    _removeDialog(containerId);
    const d = document.createElement('div');
    d.className = 'rte-dialog';
    d.id = `rte-dlg-${containerId}`;
    d.innerHTML = `
      <div class="rte-dlg-card">
        <div class="rte-dlg-title">∑ Chèn công thức LaTeX</div>
        <div class="rte-dlg-body">
          <label class="rte-dlg-label">Công thức LaTeX</label>
          <input id="rte-math-input-${containerId}" class="rte-dlg-input rte-mono"
            placeholder="Ví dụ: x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" autocomplete="off">
          <div class="rte-math-preview" id="rte-math-prev-${containerId}">
            Xem trước công thức ở đây...
          </div>
          <div class="rte-dlg-hint">
            Inline: <code>$x^2$</code> &nbsp;·&nbsp;
            Block: <code>$$\\sum_{i=1}^n$$</code> &nbsp;·&nbsp;
            <a href="https://katex.org/docs/supported.html" target="_blank">Tham khảo KaTeX</a>
          </div>
        </div>
        <div class="rte-dlg-footer">
          <button class="rte-btn" id="rte-dlg-cancel-${containerId}">Hủy</button>
          <button class="rte-btn rte-btn-primary" id="rte-dlg-ok-${containerId}">Chèn</button>
        </div>
      </div>`;

    document.body.appendChild(d);

    const input   = document.getElementById(`rte-math-input-${containerId}`);
    const preview = document.getElementById(`rte-math-prev-${containerId}`);

    // Live preview
    let _previewTimer;
    input.addEventListener('input', () => {
      clearTimeout(_previewTimer);
      _previewTimer = setTimeout(async () => {
        const tex = input.value.trim();
        if (!tex) { preview.textContent = 'Xem trước công thức ở đây...'; return; }
        try {
          await _loadKatex();
          preview.innerHTML = '';
          katex.render(tex, preview, { displayMode: true, throwOnError: false });
        } catch(e) {
          preview.textContent = '⚠️ ' + e.message;
        }
      }, 300);
    });

    document.getElementById(`rte-dlg-ok-${containerId}`)?.addEventListener('click', async () => {
      const tex = input.value.trim();
      if (!tex) return;
      // Insert as $$...$$ block (will be rendered by KaTeX auto-render)
      const range = quill.getSelection(true);
      quill.insertText(range.index, `$$${tex}$$`, 'user');
      quill.setSelection(range.index + tex.length + 4);
      _removeDialog(containerId);
    });

    document.getElementById(`rte-dlg-cancel-${containerId}`)?.addEventListener('click', () => {
      _removeDialog(containerId);
    });

    setTimeout(() => input.focus(), 50);
  }

  // ══════════════════════════════════════════════════════════════
  //  TABLE DIALOG
  // ══════════════════════════════════════════════════════════════

  function _showTableDialog(containerId, quill) {
    _removeDialog(containerId);

    // If quill-better-table is available, use its API
    const tblModule = quill.getModule('better-table');
    if (tblModule) {
      const d = document.createElement('div');
      d.className = 'rte-dialog';
      d.id = `rte-dlg-${containerId}`;
      d.innerHTML = `
        <div class="rte-dlg-card" style="width:260px">
          <div class="rte-dlg-title">⊞ Chèn bảng</div>
          <div class="rte-dlg-body" style="display:flex;gap:12px;align-items:center">
            <label class="rte-dlg-label" style="white-space:nowrap">Hàng:</label>
            <input id="rte-rows-${containerId}" class="rte-dlg-input" type="number" value="3" min="1" max="20" style="width:64px">
            <label class="rte-dlg-label" style="white-space:nowrap">Cột:</label>
            <input id="rte-cols-${containerId}" class="rte-dlg-input" type="number" value="3" min="1" max="10" style="width:64px">
          </div>
          <div class="rte-dlg-footer">
            <button class="rte-btn" id="rte-dlg-cancel-${containerId}">Hủy</button>
            <button class="rte-btn rte-btn-primary" id="rte-dlg-ok-${containerId}">Chèn</button>
          </div>
        </div>`;
      document.body.appendChild(d);

      document.getElementById(`rte-dlg-ok-${containerId}`)?.addEventListener('click', () => {
        const rows = parseInt(document.getElementById(`rte-rows-${containerId}`)?.value) || 3;
        const cols = parseInt(document.getElementById(`rte-cols-${containerId}`)?.value) || 3;
        tblModule.insertTable(rows, cols);
        _removeDialog(containerId);
      });

      document.getElementById(`rte-dlg-cancel-${containerId}`)?.addEventListener('click', () => {
        _removeDialog(containerId);
      });
      return;
    }

    // Fallback: insert basic HTML table via source
    const range = quill.getSelection(true);
    const html  = `<table border="1" style="border-collapse:collapse;width:100%"><thead><tr><th>Tiêu đề 1</th><th>Tiêu đề 2</th><th>Tiêu đề 3</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p></p>`;
    quill.clipboard.dangerouslyPasteHTML(range.index, html);
  }

  // ══════════════════════════════════════════════════════════════
  //  IMAGE DIALOG
  // ══════════════════════════════════════════════════════════════

  function _showImageDialog(containerId, quill) {
    _removeDialog(containerId);
    const d = document.createElement('div');
    d.className = 'rte-dialog';
    d.id = `rte-dlg-${containerId}`;
    d.innerHTML = `
      <div class="rte-dlg-card">
        <div class="rte-dlg-title">🖼 Chèn ảnh</div>
        <div class="rte-dlg-body">
          <div class="rte-img-tabs">
            <button class="rte-img-tab on" id="rte-itab-url-${containerId}" onclick="_rteImgTab('${containerId}','url')">📎 URL</button>
            <button class="rte-img-tab" id="rte-itab-file-${containerId}" onclick="_rteImgTab('${containerId}','file')">☁️ Upload</button>
          </div>
          <div id="rte-iurl-${containerId}">
            <label class="rte-dlg-label">URL ảnh</label>
            <input id="rte-img-url-${containerId}" class="rte-dlg-input"
              placeholder="https://..." autocomplete="off">
            <div style="margin-top:6px;text-align:center">
              <img id="rte-img-preview-${containerId}" style="max-width:100%;max-height:120px;display:none;border-radius:4px;border:1px solid var(--border)">
            </div>
          </div>
          <div id="rte-ifile-${containerId}" style="display:none">
            <label class="rte-dlg-label">Chọn file ảnh (max 2MB)</label>
            <div class="rte-dropzone" id="rte-dz-${containerId}">
              📁 Kéo thả file vào đây hoặc <b>click để chọn</b>
              <input type="file" id="rte-file-${containerId}" accept="image/*" style="display:none">
            </div>
            <div class="rte-upload-status" id="rte-ustatus-${containerId}"></div>
          </div>
        </div>
        <div class="rte-dlg-footer">
          <button class="rte-btn" id="rte-dlg-cancel-${containerId}">Hủy</button>
          <button class="rte-btn rte-btn-primary" id="rte-dlg-ok-${containerId}">Chèn</button>
        </div>
      </div>`;

    document.body.appendChild(d);

    // URL preview
    const urlInput = document.getElementById(`rte-img-url-${containerId}`);
    const preview  = document.getElementById(`rte-img-preview-${containerId}`);
    urlInput?.addEventListener('input', () => {
      const v = urlInput.value.trim();
      if (v && (v.startsWith('http') || v.startsWith('/'))) {
        preview.src = v; preview.style.display = 'block';
        preview.onerror = () => { preview.style.display = 'none'; };
      } else {
        preview.style.display = 'none';
      }
    });

    // File input
    const dz      = document.getElementById(`rte-dz-${containerId}`);
    const fileInp = document.getElementById(`rte-file-${containerId}`);
    dz?.addEventListener('click', () => fileInp?.click());
    dz?.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag'); });
    dz?.addEventListener('dragleave', () => dz.classList.remove('drag'));
    dz?.addEventListener('drop', e => {
      e.preventDefault(); dz.classList.remove('drag');
      const files = e.dataTransfer?.files;
      if (files?.length) _uploadFileForDialog(containerId, files[0]);
    });
    fileInp?.addEventListener('change', () => {
      if (fileInp.files?.length) _uploadFileForDialog(containerId, fileInp.files[0]);
    });

    // Insert
    document.getElementById(`rte-dlg-ok-${containerId}`)?.addEventListener('click', () => {
      const inst = _instances[containerId];
      if (!inst) return;
      const url = urlInput?.value.trim() || inst._uploadedUrl;
      if (!url) return;
      const range = inst.quill.getSelection(true);
      inst.quill.insertEmbed(range.index, 'image', url, 'user');
      inst.quill.setSelection(range.index + 1);
      _removeDialog(containerId);
    });

    document.getElementById(`rte-dlg-cancel-${containerId}`)?.addEventListener('click', () => {
      _removeDialog(containerId);
    });

    setTimeout(() => urlInput?.focus(), 50);
  }

  // Tab switcher for image dialog (exposed globally)
  window._rteImgTab = function(cid, tab) {
    const urlDiv  = document.getElementById(`rte-iurl-${cid}`);
    const fileDiv = document.getElementById(`rte-ifile-${cid}`);
    const tabUrl  = document.getElementById(`rte-itab-url-${cid}`);
    const tabFile = document.getElementById(`rte-itab-file-${cid}`);
    if (tab === 'url') {
      if (urlDiv)  urlDiv.style.display  = '';
      if (fileDiv) fileDiv.style.display = 'none';
      tabUrl?.classList.add('on');  tabFile?.classList.remove('on');
    } else {
      if (urlDiv)  urlDiv.style.display  = 'none';
      if (fileDiv) fileDiv.style.display = '';
      tabUrl?.classList.remove('on'); tabFile?.classList.add('on');
    }
  };

  async function _uploadFileForDialog(containerId, file) {
    const statusEl = document.getElementById(`rte-ustatus-${containerId}`);
    const inst     = _instances[containerId];
    if (!inst || !file) return;

    if (file.size > 2 * 1024 * 1024) {
      if (statusEl) statusEl.innerHTML = '<span style="color:var(--error)">❌ File quá lớn (max 2MB)</span>';
      return;
    }

    if (statusEl) statusEl.innerHTML = '⏳ Đang upload...';

    try {
      const url = await _uploadImage(file);
      inst._uploadedUrl = url;
      if (statusEl) statusEl.innerHTML = `✅ Upload thành công! <img src="${url}" style="max-height:60px;display:block;margin-top:4px;border-radius:4px">`;
    } catch(e) {
      if (statusEl) statusEl.innerHTML = `<span style="color:var(--error)">❌ ${e.message}</span>`;
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  IMAGE UPLOAD → Google Drive via Apps Script
  // ══════════════════════════════════════════════════════════════

  async function _handleImageFiles(containerId, quill, files) {
    const barEl   = document.getElementById(`rte-ubar-${containerId}`);
    const innerEl = document.getElementById(`rte-uinner-${containerId}`);

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 2 * 1024 * 1024) {
        CL.UI?.Toast?.warn('⚠️ Ảnh quá lớn (tối đa 2MB)');
        continue;
      }
      try {
        if (barEl) { barEl.style.display = 'block'; if (innerEl) innerEl.style.width = '0%'; }
        // Animate progress
        let prog = 0;
        const tick = setInterval(() => {
          prog = Math.min(prog + 15, 85);
          if (innerEl) innerEl.style.width = prog + '%';
        }, 200);

        const url = await _uploadImage(file);

        clearInterval(tick);
        if (innerEl) innerEl.style.width = '100%';
        setTimeout(() => { if (barEl) barEl.style.display = 'none'; }, 600);

        // Insert image at cursor
        const range = quill.getSelection(true);
        quill.insertEmbed(range?.index ?? quill.getLength(), 'image', url, 'user');
        quill.setSelection((range?.index ?? 0) + 1);

      } catch(e) {
        if (barEl) barEl.style.display = 'none';
        CL.UI?.Toast?.error('❌ Upload thất bại: ' + e.message);
      }
    }
  }

  async function _uploadImage(file) {
    const url = localStorage.getItem('cl_script_url');

    // If no server configured, fall back to base64 data URL (for offline/demo)
    if (!url) {
      return await _toDataUrl(file);
    }

    const base64 = await _toBase64(file);
    const token  = CL.Auth?.Session?.getToken?.() || '';

    const Http = CL.require('Data.Http');
    const resp = await Http.post(url, {
      action:   'uploadImage',
      token,
      base64,
      filename: file.name || 'image.png',
      mimeType: file.type || 'image/png',
    });

    if (!resp?.url) throw new Error(resp?.error || 'Upload không trả về URL');
    return resp.url;
  }

  function _toBase64(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload  = () => resolve(r.result.split(',')[1]);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  function _toDataUrl(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload  = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  KATEX RENDER (for student view)
  // ══════════════════════════════════════════════════════════════

  async function renderMath(el) {
    if (!el) return;
    await _loadKatex();
    if (typeof renderMathInElement !== 'undefined') {
      renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$',  right: '$',  display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true  },
        ],
        throwOnError: false,
        errorColor:   '#cc0000',
      });
    }
  }

  function _renderMath(el) {
    // Non-blocking: try to render math, ignore if KaTeX not loaded
    if (typeof renderMathInElement !== 'undefined' && typeof katex !== 'undefined') {
      try {
        renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true  },
            { left: '$',  right: '$',  display: false },
          ],
          throwOnError: false,
        });
      } catch(e) {}
    } else {
      // Lazy load then render
      renderMath(el).catch(() => {});
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  UNMOUNT / GET HTML
  // ══════════════════════════════════════════════════════════════

  function unmount(containerId) {
    const inst = _instances[containerId];
    if (inst) { inst.wrapper?.remove(); delete _instances[containerId]; }
    document.getElementById(`rte-wrap-${containerId}`)?.remove();
    _removeDialog(containerId);
  }

  function getHtml(containerId) {
    const inst = _instances[containerId];
    if (!inst) return '';
    if (inst.showingSource) {
      return document.getElementById(`rte-src-${containerId}`)?.value?.trim() || '';
    }
    const html = inst.quill.root.innerHTML;
    return html === '<p><br></p>' ? '' : html;
  }

  function _removeDialog(containerId) {
    document.getElementById(`rte-dlg-${containerId}`)?.remove();
  }

  // ══════════════════════════════════════════════════════════════
  //  HTML PRETTY PRINT
  // ══════════════════════════════════════════════════════════════

  function _prettyHtml(html) {
    if (!html) return '';
    const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
    let result = '', indent = 0;
    const pad = () => '  '.repeat(indent);
    (html.match(/<[^>]+>|[^<]+/g) || []).forEach(tok => {
      const trimmed = tok.trim();
      if (!trimmed) return;
      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        result += pad() + trimmed + '\n';
      } else if (trimmed.startsWith('<')) {
        const tag = (trimmed.match(/^<([a-zA-Z]+)/) || [])[1]?.toLowerCase() || '';
        result += pad() + trimmed + '\n';
        if (!VOID.has(tag) && !trimmed.endsWith('/>') && !trimmed.startsWith('<!')) indent++;
      } else {
        result += pad() + trimmed + '\n';
      }
    });
    return result.trim();
  }

  return { mount, unmount, getHtml, renderMath };
});
