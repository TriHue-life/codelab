/**
 * features/teacher/exercises.js — Ngân hàng bài tập (Teacher/Admin)
 * ═══════════════════════════════════════════════════════════════
 * Tabs: Đề bài (RichText) | Lý thuyết (RichText) | Code mẫu (textarea)
 * Tiêu chí & Hướng dẫn lỗi: xử lý tự động bởi Python grader
 *
 * @requires core/*, CL.API, exercises/registry.js, CL.Editors.RichText
 */
'use strict';

CL.define('Teacher.ExEditor', () => {
  const Utils    = CL.require('Utils');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  // Theo dõi instance RichText đang mở
  let _currentId = null;

  // ══════════════════════════════════════════════════════════════
  //  RENDER: danh sách bài tập
  // ══════════════════════════════════════════════════════════════

  async function render(el) {
    console.log('[ExEditor] render called, el:', el);
    const allExs = Registry.getAll();
    const grades = [...new Set(allExs.map(e => e.bo ? `${e.g}-${e.bo}` : e.g))];

    el.innerHTML = `
      <div class="tp-edit-toolbar">
        <select id="ed-g" style="flex:1">
          <option value="">— Chọn lớp —</option>
          ${grades.map(g => `<option>${g}</option>`).join('')}
        </select>
        <select id="ed-ch" style="flex:2">
          <option value="">— Chọn chủ đề —</option>
        </select>
      </div>
      <div id="ed-list" class="tp-edit-list"></div>
      <div id="ed-form" class="tp-edit-form" style="display:none"></div>
      <div class="tp-actions" style="padding:8px 14px">
        <button class="tp-action-btn" id="sync-all-btn">
          🔄 Sync lên Sheets
        </button>
      </div>`;
    
    // Attach event listeners (inline onchange doesn't work with innerHTML)
    const edG = document.getElementById('ed-g');
    const edCh = document.getElementById('ed-ch');
    const syncBtn = document.getElementById('sync-all-btn');
    
    if (edG) edG.addEventListener('change', loadChap);
    if (edCh) edCh.addEventListener('change', loadList);
    if (syncBtn) syncBtn.addEventListener('click', syncAll);
  }

  // ══════════════════════════════════════════════════════════════
  //  LOAD chapters & list
  // ══════════════════════════════════════════════════════════════

  function loadChap() {
    console.log('[ExEditor] loadChap called');
    const gk  = document.getElementById('ed-g')?.value;
    const chs = Registry.getChapters(gk);
    const sel = document.getElementById('ed-ch');
    if (!sel) return;
    sel.innerHTML = '<option value="">— Chọn chủ đề —</option>' +
      chs.map(c => `<option>${c}</option>`).join('');
    document.getElementById('ed-list').innerHTML = '';
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
    _unmountAll();
  }

  function loadList() {
    const gk  = document.getElementById('ed-g')?.value;
    const ch  = document.getElementById('ed-ch')?.value;
    const exs = Registry.getByChapter(gk, ch);
    const list = document.getElementById('ed-list');
    if (!list) return;
    list.innerHTML = exs.map(e => `
      <div class="ed-item" onclick="CL.Teacher.ExEditor.edit('${Utils.escHtml(e.id)}')">
        <span class="ed-lv">${(e.lv || '').split('–')[0].trim()}</span>
        <span class="ed-num">${Utils.escHtml(e.num)}</span>
        <span class="ed-title">${Utils.escHtml(e.title)}</span>
        <span class="ed-type-badge ${e.type || 'python'}">${(e.type || 'python').toUpperCase()}</span>
      </div>`).join('');
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
    _unmountAll();
  }

  // ══════════════════════════════════════════════════════════════
  //  EDIT: mở form chỉnh sửa bài tập
  // ══════════════════════════════════════════════════════════════

  async function edit(id) {
    const ex = Registry.findById(id);
    if (!ex) return;

    // Unmount previous rich editors
    _unmountAll();
    _currentId = id;

    // Load saved override from Sheets (if any)
    let detail = { ly_thuyet: '', code_mau: [] };
    if (CL.API?.isReady?.()) {
      try { detail = await CL.API.getExerciseDetail(id); } catch {}
    }

    // Load saved desc/theory from NoiDung sheet (via localStorage cache or API)
    const savedDesc   = localStorage.getItem(`cl_content_${id}_desc`);
    const savedTheory = localStorage.getItem(`cl_content_${id}_theory`);

    const form = document.getElementById('ed-form');
    if (!form) return;
    form.style.display = 'block';
    form.innerHTML = `
      <div class="ed-form-header">
        <div class="ed-form-title">
          <span class="ed-form-type-badge ${ex.type || 'python'}">${(ex.type||'python').toUpperCase()}</span>
          ✏️ ${Utils.escHtml(ex.num)} – ${Utils.escHtml(ex.title)}
        </div>
        <button class="ed-close-btn" onclick="CL.Teacher.ExEditor.closeForm()">✕</button>
      </div>

      <div class="ed-tabs" id="ed-tabs-main">
        <button class="ed-tab on" onclick="CL.Teacher.ExEditor.switchTab(this,'de-bai')">
          📋 Đề bài
        </button>
        <button class="ed-tab" onclick="CL.Teacher.ExEditor.switchTab(this,'ly-thuyet')">
          📖 Lý thuyết
        </button>
        <button class="ed-tab" onclick="CL.Teacher.ExEditor.switchTab(this,'code-mau')">
          💻 Code mẫu
        </button>
      </div>

      <!-- TAB: ĐỀ BÀI -->
      <div id="et-de-bai" class="ed-panel">
        <div class="ed-rte-hint">
          <span>✏️ Soạn đề bài bằng trình soạn thảo bên dưới — học sinh sẽ thấy đúng như bạn soạn.</span>
        </div>
        <div id="ef-desc-container" class="ed-rte-container">
          ${savedDesc || ex.desc || '<p>Chưa có đề bài.</p>'}
        </div>
        <div class="ed-panel-footer">
          <button class="ed-save-btn" onclick="CL.Teacher.ExEditor.saveField('${Utils.escHtml(id)}','desc')">
            💾 Lưu đề bài
          </button>
          <span class="ed-save-msg" id="ed-msg-desc"></span>
        </div>
      </div>

      <!-- TAB: LÝ THUYẾT -->
      <div id="et-ly-thuyet" class="ed-panel" style="display:none">
        <div class="ed-rte-hint">
          <span>📖 Soạn lý thuyết liên quan — chỉ hiện khi học sinh luyện tập, ẩn khi kiểm tra.</span>
        </div>
        <div id="ef-ly-container" class="ed-rte-container">
          ${savedTheory || detail.ly_thuyet || ex.theory || '<p>Chưa có lý thuyết.</p>'}
        </div>
        <div class="ed-panel-footer">
          <button class="ed-save-btn" onclick="CL.Teacher.ExEditor.saveField('${Utils.escHtml(id)}','theory')">
            💾 Lưu lý thuyết
          </button>
          <span class="ed-save-msg" id="ed-msg-theory"></span>
        </div>
      </div>

      <!-- TAB: CODE MẪU -->
      <div id="et-code-mau" class="ed-panel" style="display:none">
        <div class="ed-rte-hint">
          <span>💻 Soạn code mẫu (có thể có giải thích) — học sinh sẽ thấy khi xem lời giải.</span>
        </div>
        <div id="ef-code-container" class="ed-rte-container">
          ${_codeToHtml((detail.code_mau?.[0]?.code) || ex.solution || '', ex.type || 'python')}
        </div>
        <div class="ed-panel-footer">
          <button class="ed-save-btn" onclick="CL.Teacher.ExEditor.saveField('${Utils.escHtml(id)}','code')">
            💾 Lưu code mẫu
          </button>
          <span class="ed-save-msg" id="ed-msg-code"></span>
        </div>
      </div>`;

    // Mount rich editors after HTML is set
    await _mountRichEditors(id, ex, detail, savedDesc, savedTheory);
  }

  // ══════════════════════════════════════════════════════════════
  //  MOUNT rich text editors for desc + theory tabs
  // ══════════════════════════════════════════════════════════════

  async function _mountRichEditors(id, ex, detail, savedDesc, savedTheory) {
    if (!CL.Editors?.RichText) {
      console.warn('[ExEditor] RichText module not loaded');
      return;
    }

    // Mount DESC editor
    const descInitial = savedDesc || ex.desc || '';
    await _mountRte('ef-desc-container', descInitial);

    // Mount THEORY editor
    const theoryInitial = savedTheory || detail.ly_thuyet || ex.theory || '';
    await _mountRte('ef-ly-container', theoryInitial);

    // Mount CODE editor — initial content as code-block
    const codeInitial = _codeToHtml(
      (detail.code_mau?.[0]?.code) || ex.solution || '', ex.type || 'python'
    );
    await _mountRte('ef-code-container', codeInitial);
  }

  async function _mountRte(containerId, initialHtml) {
    try {
      await CL.Editors.RichText.mount(containerId, initialHtml, null);
      // null onSave = manual save via saveField button
    } catch(e) {
      console.warn(`[ExEditor] Cannot mount RTE for ${containerId}:`, e.message);
    }
  }

  function _unmountAll() {
    if (!CL.Editors?.RichText) return;
    CL.Editors.RichText.unmount('ef-desc-container');
    CL.Editors.RichText.unmount('ef-ly-container');
    CL.Editors.RichText.unmount('ef-code-container');
    _currentId = null;
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB SWITCH
  // ══════════════════════════════════════════════════════════════

  function switchTab(btn, panel) {
    const tabs = document.getElementById('ed-tabs-main');
    tabs?.querySelectorAll('.ed-tab').forEach(t => t.classList.remove('on'));
    btn.classList.add('on');
    ['de-bai', 'ly-thuyet', 'code-mau'].forEach(p => {
      const el = document.getElementById('et-' + p);
      if (el) el.style.display = (p === panel ? '' : 'none');
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  SAVE individual field
  // ══════════════════════════════════════════════════════════════

  async function saveField(id, field) {
    const msgId = `ed-msg-${field === 'code' ? 'code' : field === 'desc' ? 'desc' : 'theory'}`;
    const msgEl = document.getElementById(msgId);
    if (msgEl) msgEl.textContent = '⏳ Đang lưu...';

    try {
      if (field === 'desc') {
        const html = CL.Editors.RichText.getHtml('ef-desc-container');
        await CL.API.saveExerciseContent(id, 'desc', html);
        // Cache locally too
        localStorage.setItem(`cl_content_${id}_desc`, html);
        if (msgEl) msgEl.textContent = '✅ Đã lưu đề bài';

      } else if (field === 'theory') {
        const html = CL.Editors.RichText.getHtml('ef-ly-container');
        await CL.API.saveLyThuyet(id, html);
        // Cache locally
        localStorage.setItem(`cl_content_${id}_theory`, html);
        if (msgEl) msgEl.textContent = '✅ Đã lưu lý thuyết';

      } else if (field === 'code') {
        // Get content from RichText editor (HTML with code blocks + explanations)
        const html = CL.Editors.RichText.getHtml('ef-code-container');
        // Extract pure code from first code-block for backward compat grading
        const codeOnly = _extractCode(html);
        const ex = CL.require('Exercises.Registry').findById(id);
        const lang = ex?.type || 'python';
        // Save HTML version (rich) + plain code for grader compatibility
        await CL.API.saveCodeMau(id, lang, codeOnly || html, '');
        await CL.API.saveExerciseContent(id, 'code_rich', html);
        if (msgEl) msgEl.textContent = '✅ Đã lưu code mẫu';
      }

      Toast.success(`✅ Đã lưu ${field === 'desc' ? 'đề bài' : field === 'theory' ? 'lý thuyết' : 'code mẫu'}`);
      setTimeout(() => { if (msgEl) msgEl.textContent = ''; }, 3000);

    } catch(e) {
      if (msgEl) msgEl.textContent = '❌ ' + e.message;
      Toast.error('❌ ' + e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  CLOSE form
  // ══════════════════════════════════════════════════════════════

  function closeForm() {
    _unmountAll();
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  //  SYNC ALL to Google Sheets
  // ══════════════════════════════════════════════════════════════

  async function syncAll() {
    const confirmed = await Toast.confirm(
      'Sync toàn bộ bài tập lên Google Sheets?\n' +
      'Sẽ sync: BaiTap + LyThuyet + CodeMau\n' +
      'Quá trình mất 3–8 phút. Không đóng tab trong khi sync.'
    );
    if (!confirmed) return;

    const all   = Registry.getAll();
    const BATCH = 100;
    const TABS  = [
      { tab: 'BaiTap',   label: '📋 BaiTap'   },
      { tab: 'LyThuyet', label: '📖 LyThuyet'  },
      { tab: 'CodeMau',  label: '💻 CodeMau'   },
    ];
    const totalSteps = TABS.length * Math.ceil(all.length / BATCH);
    let step = 0;

    const container = document.getElementById('tp-bar-body') || document.body;
    const progBox   = _showProgress(container);
    progBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const btn = document.querySelector('[id="sync-all-btn"]');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang sync...'; }

    try {
      for (const { tab, label } of TABS) {
        const tabBatches = Math.ceil(all.length / BATCH);
        for (let i = 0; i < all.length; i += BATCH) {
          step++;
          const batchNum = Math.floor(i / BATCH) + 1;
          const batch    = all.slice(i, i + BATCH);
          _updateProgress(step, totalSteps,
            `${label} — batch ${batchNum}/${tabBatches}`);
          await CL.API.syncFull(batch, tab, i === 0);
          _updateProgress(step, totalSteps,
            `✓ ${label} batch ${batchNum}/${tabBatches} (${Math.min(i + BATCH, all.length)}/${all.length} bài)`);
          await new Promise(r => setTimeout(r, 300));
        }
      }
      _finishProgress(true);
      Toast.success('✅ Sync hoàn tất!');
    } catch(e) {
      _finishProgress(false);
      Toast.error('❌ Sync lỗi: ' + e.message);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '🔄 Sync lên Sheets'; }
    }
  }

  // ── Progress bar ────────────────────────────────────────────

  function _showProgress(container) {
    document.getElementById('sync-progress-box')?.remove();
    const el = document.createElement('div');
    el.id = 'sync-progress-box';
    el.innerHTML = `
      <div class="sync-prog-title">🔄 Đang sync bài tập lên Google Sheets...</div>
      <div class="sync-prog-wrap"><div class="sync-prog-bar" id="sync-prog-bar" style="width:0%"></div></div>
      <div class="sync-prog-info">
        <span id="sync-prog-text">Chuẩn bị...</span>
        <span id="sync-prog-pct">0%</span>
      </div>
      <div class="sync-prog-steps" id="sync-prog-steps"></div>`;
    container.appendChild(el);
    return el;
  }

  function _updateProgress(step, total, msg) {
    const pct = Math.round(step / total * 100);
    const bar  = document.getElementById('sync-prog-bar');
    const txt  = document.getElementById('sync-prog-text');
    const pctEl = document.getElementById('sync-prog-pct');
    const steps = document.getElementById('sync-prog-steps');
    if (bar)  bar.style.width     = pct + '%';
    if (txt)  txt.textContent     = msg;
    if (pctEl) pctEl.textContent  = pct + '%';
    if (steps && msg) {
      const line = document.createElement('div');
      line.className = 'sync-prog-step';
      line.textContent = '✅ ' + msg;
      steps.appendChild(line);
      steps.scrollTop = steps.scrollHeight;
    }
  }

  function _finishProgress(success) {
    const bar   = document.getElementById('sync-prog-bar');
    const txt   = document.getElementById('sync-prog-text');
    const pctEl = document.getElementById('sync-prog-pct');
    const box   = document.getElementById('sync-progress-box');
    if (bar)  { bar.style.width = '100%'; bar.style.background = success ? 'var(--accent2)' : 'var(--error)'; }
    if (txt)  txt.textContent  = success ? '✅ Sync hoàn tất!' : '❌ Sync thất bại';
    if (pctEl) pctEl.textContent = success ? '100%' : 'Lỗi';
    if (box && success) {
      setTimeout(() => { box.style.opacity = '0'; setTimeout(() => box.remove(), 600); }, 3000);
    }
  }

  // ── Helper: convert code to HTML ────────────────────────────

  function _codeToHtml(code, lang) {
    if (!code) return '<p>Chưa có code mẫu.</p>';
    return `<pre><code class="language-${lang}">${Utils.escHtml(code)}</code></pre>`;
  }

  function _extractCode(html) {
    const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
    return match ? match[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : '';
  }

  return { render, loadChap, loadList, edit, switchTab, saveField, closeForm, syncAll };
});
