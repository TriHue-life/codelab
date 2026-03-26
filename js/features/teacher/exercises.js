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
    const Cfg = CL.require('Config');

    el.innerHTML = `
      <div class="ed-selector-bar">
        <div class="ed-sel-group">
          <span class="ed-sel-label">Lớp</span>
          <div class="cdd" id="ed-cdd-grade">
            <button class="cdd-btn tb-cdd-btn" id="ed-cdd-grade-btn"
              onclick="CL.Teacher.ExEditor.openCdd('grade')" type="button">
              <span id="ed-grade-label">— Chọn lớp —</span>
              <span class="cdd-arrow">▾</span>
            </button>
          </div>
        </div>
        <div class="ed-sel-sep"></div>
        <div class="ed-sel-group">
          <span class="ed-sel-label">Chủ đề</span>
          <div class="cdd cdd-locked" id="ed-cdd-chap">
            <button class="cdd-btn tb-cdd-btn" id="ed-cdd-chap-btn"
              onclick="CL.Teacher.ExEditor.openCdd('chap')" type="button" disabled>
              <span id="ed-chap-label">—</span>
              <span class="cdd-arrow">▾</span>
            </button>
          </div>
        </div>
        <div class="ed-sel-sep"></div>
        <div class="ed-sel-group">
          <span class="ed-sel-label">Thang Bloom</span>
          <div class="cdd cdd-locked" id="ed-cdd-bloom">
            <button class="cdd-btn tb-cdd-btn" id="ed-cdd-bloom-btn"
              onclick="CL.Teacher.ExEditor.openCdd('bloom')" type="button" disabled>
              <span id="ed-bloom-label">— Tất cả —</span>
              <span class="cdd-arrow">▾</span>
            </button>
          </div>
        </div>
        <div class="ed-sel-sep"></div>
        <div class="ed-sel-group" style="flex:1;min-width:180px">
          <span class="ed-sel-label">Bài tập</span>
          <div class="cdd cdd-locked" id="ed-cdd-ex">
            <button class="cdd-btn tb-cdd-btn" id="ed-cdd-ex-btn"
              onclick="CL.Teacher.ExEditor.openCdd('ex')" type="button" disabled>
              <span id="ed-ex-label">— Chọn bài —</span>
              <span class="cdd-arrow">▾</span>
            </button>
          </div>
        </div>
        <div style="flex-shrink:0;margin-left:auto">
          <button class="tp-action-btn" onclick="CL.Teacher.ExEditor.syncAll()">
            🔄 Sync Sheets
          </button>
        </div>
      </div>

      <div id="ed-cdd-overlay" onclick="CL.Teacher.ExEditor.closeCdd()"
        style="display:none;position:fixed;inset:0;z-index:999"></div>
      <div id="ed-cdd-popup"
        style="display:none;position:fixed;z-index:1000;min-width:200px;max-height:320px;
               overflow-y:auto;background:var(--surface);border:1px solid var(--border);
               border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.25);padding:4px 0">
        <div id="ed-cdd-popup-list"></div>
      </div>

      <div id="ed-form" class="tp-edit-form" style="display:none"></div>`;

    _edItems.grade = (Cfg.GRADES || []).map(g => ({ value: g.value, text: g.text }));
    _edGrade = _edChap = _edBloom = '';
  }

  // ── CDD state ─────────────────────────────────────────────────
  let _edGrade = '', _edChap = '', _edBloom = '';
  let _edItems = { grade: [], chap: [], bloom: [], ex: [] };
  let _edActiveCdd = null;

  function openCdd(which) {
    const btn = document.getElementById('ed-cdd-' + which + '-btn');
    if (!btn || btn.disabled) return;
    _edActiveCdd = which;
    const overlay = document.getElementById('ed-cdd-overlay');
    const popup   = document.getElementById('ed-cdd-popup');
    const list    = document.getElementById('ed-cdd-popup-list');
    if (!popup || !list) return;
    const items  = _edItems[which] || [];
    const curVal = { grade:_edGrade, chap:_edChap, bloom:_edBloom, ex:'' }[which] || '';
    list.innerHTML = items.length
      ? items.map(it => `<div class="cdd-item${it.value===curVal?' selected':''}"
          onclick="CL.Teacher.ExEditor.selectCdd('${which}','${Utils.escHtml(it.value)}')"
          style="padding:9px 14px;cursor:pointer;font-size:13px">${Utils.escHtml(it.text)}</div>`).join('')
      : '<div style="padding:10px 14px;color:var(--text3)">Không có mục nào</div>';
    const rect = btn.getBoundingClientRect();
    popup.style.left  = rect.left + 'px';
    popup.style.top   = (rect.bottom + 4) + 'px';
    popup.style.width = Math.max(rect.width, 200) + 'px';
    popup.style.display = '';
    if (overlay) overlay.style.display = '';
  }

  function closeCdd() {
    const o = document.getElementById('ed-cdd-overlay');
    const p = document.getElementById('ed-cdd-popup');
    if (o) o.style.display = 'none';
    if (p) p.style.display = 'none';
    _edActiveCdd = null;
  }

  async function selectCdd(which, value) {
    closeCdd();
    const Registry = CL.require('Exercises.Registry');
    if (which === 'grade') {
      _edGrade = value; _edChap = ''; _edBloom = '';
      const item = _edItems.grade.find(i => i.value === value);
      _setEdLabel('grade', item?.text || value);
      await Registry.ensureLoaded(value);
      const chaps = Registry.getChapters(value);
      _edItems.chap = chaps.map(c => ({ value: c, text: c }));
      _edItems.bloom = []; _edItems.ex = [];
      _setEdLabel('chap', '— Chọn chủ đề —'); _setEdLabel('bloom', '— Tất cả —'); _setEdLabel('ex', '— Chọn bài —');
      _setEdLocked('chap', !chaps.length); _setEdLocked('bloom', true); _setEdLocked('ex', true);
      _closeEdForm();
    } else if (which === 'chap') {
      _edChap = value; _edBloom = '';
      _setEdLabel('chap', value || '— Chọn chủ đề —');
      const exs = Registry.getByChapter(_edGrade, value);
      const bloomSet = [...new Set(exs.map(e => e.lv).filter(Boolean))];
      _edItems.bloom = [{ value:'', text:'— Tất cả —' }, ...bloomSet.map(b => ({ value:b, text:b }))];
      _edItems.ex = exs.map(e => ({
        value: e.id,
        text: (e.lv ? '[' + e.lv.split('–')[0].trim() + '] ' : '') + (e.num||'') + ' – ' + (e.title||''),
      }));
      _setEdLabel('bloom', '— Tất cả —'); _setEdLabel('ex', '— Chọn bài —');
      _setEdLocked('bloom', !bloomSet.length); _setEdLocked('ex', !exs.length);
      _closeEdForm();
    } else if (which === 'bloom') {
      _edBloom = value;
      _setEdLabel('bloom', value || '— Tất cả —');
      const exs = Registry.getByChapter(_edGrade, _edChap);
      const filtered = value ? exs.filter(e => e.lv === value) : exs;
      _edItems.ex = filtered.map(e => ({
        value: e.id,
        text: (e.lv ? '[' + e.lv.split('–')[0].trim() + '] ' : '') + (e.num||'') + ' – ' + (e.title||''),
      }));
      _setEdLabel('ex', '— Chọn bài —'); _setEdLocked('ex', !filtered.length);
      _closeEdForm();
    } else if (which === 'ex') {
      const ex = Registry.findById(value);
      if (ex) _setEdLabel('ex', (ex.num||'') + ' – ' + (ex.title||''));
      await edit(value);
    }
  }

  function _setEdLabel(which, text) {
    const el = document.getElementById('ed-' + which + '-label');
    if (el) el.textContent = text;
  }

  function _setEdLocked(which, locked) {
    const wrap = document.getElementById('ed-cdd-' + which);
    const btn  = document.getElementById('ed-cdd-' + which + '-btn');
    if (wrap) wrap.classList.toggle('cdd-locked', locked);
    if (btn)  btn.disabled = locked;
  }

  function _closeEdForm() {
    _unmountAll();
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
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

      <!-- TAB: CODE MẪU — RichText (có thể kết hợp giải thích + code block) -->
      <div id="et-code-mau" class="ed-panel" style="display:none">
        <div class="ed-rte-hint">
          <span>💻 Code mẫu & giải thích — chỉ hiện khi điểm &lt; ${CL.require('Config').GRADE.SHOW_SOLUTION_BELOW}/10. Dùng nút <b>code-block</b> (</>) để chèn code có highlight.</span>
        </div>
        <div id="ef-code-container" class="ed-rte-container">
          ${_codeToHtml((detail.code_mau?.[0]||{}).code || ex.solution || '', ex.type || 'python')}
        </div>
        <div class="ed-panel-footer">
          <button class="ed-save-btn" onclick="CL.Teacher.ExEditor.saveField('${Utils.escHtml(id)}','code')">
            💾 Lưu code mẫu
          </button>
          <span class="ed-save-msg" id="ed-msg-code"></span>
        </div>
      </div>

      <div id="ed-msg-global" class="ed-global-msg"></div>`;

    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Mount RichText editors after DOM is ready
    await _mountRichEditors(id, ex, detail, savedDesc, savedTheory);
  }

  // ── Convert raw code string → HTML for RichText initial content ──
  function _codeToHtml(code, lang) {
    if (!code || !code.trim()) return '';
    // Wrap in a proper pre/code block that Quill can display
    const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<pre class="ql-syntax" data-language="${lang || 'python'}">${esc(code.trim())}</pre>`;
  }

  // ── Extract raw code from RichText HTML (first <pre> block) ────
  function _extractCode(html) {
    if (!html) return '';
    const m = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
    if (!m) return html.replace(/<[^>]+>/g, '').trim();
    // Unescape HTML entities
    return m[1].replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').trim();
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
      await CL.Editors.RichText.mount(containerId, initialHtml, null, { hideSaveBtn: true });
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
    // Guard: chỉ teacher/admin
    const user = CL.require('Auth.Session')?.get();
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      CL.require('UI.Toast')?.warn('Không có quyền lưu nội dung');
      return;
    }
    if (!CL.API.isReady()) {
      CL.require('UI.Toast')?.warn('Chưa kết nối server. Kiểm tra cấu hình URL.');
      return;
    }

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

    const btn = document.querySelector('[onclick*="syncAll"]');
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

  return { render, openCdd, closeCdd, selectCdd, edit, switchTab, saveField, closeForm, syncAll };
});
