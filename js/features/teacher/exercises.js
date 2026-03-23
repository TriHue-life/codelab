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
  let _hasUnsavedChanges = false;

  // ══════════════════════════════════════════════════════════════
  //  RENDER: danh sách bài tập
  // ══════════════════════════════════════════════════════════════

  async function render(el) {
    console.log('[ExEditor] render called, el:', el);
    const allExs = Registry.getAll();
    const grades = [...new Set(allExs.map(e => e.bo ? `${e.g}-${e.bo}` : e.g))];

    el.innerHTML = `
      <div class="tp-edit-container">
        <div class="tp-edit-sidebar" id="ed-sidebar">
          <button class="tp-edit-toggle-btn" id="ed-toggle-btn" title="Thu nhỏ danh sách">◀</button>
          <div class="tp-edit-toolbar">
            <select id="ed-g" style="flex:1">
              <option value="">— Chọn lớp —</option>
              ${grades.map(g => `<option>${g}</option>`).join('')}
            </select>
            <select id="ed-ch" style="flex:2">
              <option value="">— Chọn chủ đề —</option>
            </select>
          </div>
          <select id="ed-ex" style="flex:1;margin-top:8px;padding:8px;">
            <option value="">— Chọn bài tập —</option>
          </select>
        </div>
        <div class="tp-edit-content">
          <div id="ed-form" class="tp-edit-form" style="display:none"></div>
        </div>
      </div>`;
    
    // Attach event listeners (inline onchange doesn't work with innerHTML)
    const edG = document.getElementById('ed-g');
    const edCh = document.getElementById('ed-ch');
    const toggleBtn = document.getElementById('ed-toggle-btn');
    const sidebar = document.getElementById('ed-sidebar');
    
    if (edG) edG.addEventListener('change', loadChap);
    if (edCh) edCh.addEventListener('change', loadList);
    
    const edEx = document.getElementById('ed-ex');
    if (edEx) edEx.addEventListener('change', (e) => {
      if (e.target.value) {
        edit(e.target.value);
      }
    });
    
    // Toggle sidebar
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
        localStorage.setItem('ed-sidebar-collapsed', sidebar.classList.contains('collapsed'));
      });
      
      // Restore collapsed state
      if (localStorage.getItem('ed-sidebar-collapsed') === 'true') {
        sidebar.classList.add('collapsed');
        toggleBtn.textContent = '▶';
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  LOAD CHAPTERS: tải danh sách chủ đề theo lớp
  // ══════════════════════════════════════════════════════════════

  function loadChap() {
    console.log('[ExEditor] loadChap called');
    const gk = document.getElementById('ed-g')?.value;
    if (!gk) return;
    
    const chapters = Registry.getChapters(gk);
    const chDropdown = document.getElementById('ed-ch');
    if (!chDropdown) return;
    
    chDropdown.innerHTML = `
      <option value="">— Chọn chủ đề —</option>
      ${chapters.map(ch => `<option value="${Utils.escHtml(ch)}">${Utils.escHtml(ch)}</option>`).join('')}
    `;
  }

  // ══════════════════════════════════════════════════════════════
  //  LOAD LIST: tải danh sách bài tập theo chủ đề
  // ══════════════════════════════════════════════════════════════

  function loadList() {
    console.log('[ExEditor] loadList called');
    const gk  = document.getElementById('ed-g')?.value;
    const ch  = document.getElementById('ed-ch')?.value;
    const exs = Registry.getByChapter(gk, ch);
    const dropdown = document.getElementById('ed-ex');
    if (!dropdown) return;
    
    dropdown.innerHTML = `
      <option value="">— Chọn bài tập —</option>
      ${exs.map(e => `<option value="${Utils.escHtml(e.id)}">${Utils.escHtml(e.num)} - ${Utils.escHtml(e.title)}</option>`).join('')}
    `;
    
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
    _unmountAll();
  }
  // ══════════════════════════════════════════════════════════════
  //  EDIT: mở form chỉnh sửa bài tập
  // ══════════════════════════════════════════════════════════════

  async function edit(id) {
    // Cảnh báo nếu chưa lưu thay đổi
    if (_hasUnsavedChanges) {
      const confirmed = await Toast.confirm('Bạn chưa lưu thay đổi. Tiếp tục?');
      if (!confirmed) return;
    }

    const ex = Registry.findById(id);
    if (!ex) return;

    // Unmount previous rich editors
    _unmountAll();
    _currentId = id;
    _hasUnsavedChanges = false;

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
      <div class="ed-tabs">
        <button class="ed-tab-btn active" data-tab="desc">📋 Đề bài</button>
        <button class="ed-tab-btn" data-tab="theory">📖 Lý thuyết</button>
        <button class="ed-tab-btn" data-tab="code">💻 Code mẫu</button>
      </div>
      <div class="ed-tab-content">
        <div class="ed-tab-pane active" data-tab="desc">
          <div id="ed-desc-container" class="ed-rte-container"></div>
        </div>
        <div class="ed-tab-pane" data-tab="theory">
          <div id="ed-theory-container" class="ed-rte-container"></div>
        </div>
        <div class="ed-tab-pane" data-tab="code">
          <textarea id="ed-code" class="ed-code-textarea" placeholder="Python code mẫu...">${Utils.escHtml(detail.code_mau?.[0] || '')}</textarea>
          <button class="ed-save-btn" onclick="CL.Teacher.ExEditor.saveField('${Utils.escHtml(id)}', 'code')">💾 Lưu code mẫu</button>
        </div>
      </div>`;

    // Tab switching
    form.querySelectorAll('.ed-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Mount RichText editors
    const descContainer = document.getElementById('ed-desc-container');
    const theoryContainer = document.getElementById('ed-theory-container');
    
    if (descContainer) {
      await CL.Editors.RichText.mount('ed-desc', savedDesc || ex.desc || '', async (html) => {
        await saveField(id, 'desc', html);
      });
    }
    
    if (theoryContainer) {
      await CL.Editors.RichText.mount('ed-theory', savedTheory || detail.ly_thuyet || '', async (html) => {
        await saveField(id, 'theory', html);
      });
    }

    // Code textarea change tracking
    const codeTextarea = document.getElementById('ed-code');
    if (codeTextarea) {
      codeTextarea.addEventListener('change', () => {
        _hasUnsavedChanges = true;
      });
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB SWITCHING
  // ══════════════════════════════════════════════════════════════

  function switchTab(tabName) {
    const form = document.getElementById('ed-form');
    if (!form) return;
    
    form.querySelectorAll('.ed-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    form.querySelectorAll('.ed-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.dataset.tab === tabName);
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  SAVE FIELD
  // ══════════════════════════════════════════════════════════════

  async function saveField(id, field, html) {
    console.log('[ExEditor] saveField:', field);
    if (!html) {
      Toast.warn('Nội dung trống');
      return;
    }
    
    try {
      // Save to localStorage first (for offline support)
      localStorage.setItem(`cl_content_${id}_${field}`, html);
      
      // Then sync to backend
      await CL.API.saveExerciseContent(id, field, html);
      Toast.success(`✅ Lưu ${field} thành công`);
      _hasUnsavedChanges = false;
    } catch(e) {
      Toast.error(`❌ Lỗi lưu: ${e.message}`);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  CLOSE FORM
  // ══════════════════════════════════════════════════════════════

  function closeForm() {
    if (_hasUnsavedChanges) {
      if (!confirm('Bạn chưa lưu thay đổi. Đóng?')) return;
    }
    
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
    _unmountAll();
    _currentId = null;
    _hasUnsavedChanges = false;
  }

  // ══════════════════════════════════════════════════════════════
  //  SYNC ALL (removed - functionality moved to admin panel)
  // ══════════════════════════════════════════════════════════════

  // ── Progress bar ────────────────────────────────────────────

  function _showProgress(container) {
    const box = document.createElement('div');
    box.className = 'ed-progress-box';
    box.innerHTML = `
      <div class="ed-progress-title">Đang xử lý...</div>
      <div class="ed-progress-bar"><div class="ed-progress-fill"></div></div>
      <div class="ed-progress-text"></div>`;
    container.appendChild(box);
    return box;
  }

  function _updateProgress(step, total, msg) {
    const box = document.querySelector('.ed-progress-box');
    if (!box) return;
    const pct = Math.round(100 * step / total);
    box.querySelector('.ed-progress-fill').style.width = pct + '%';
    box.querySelector('.ed-progress-text').textContent = `${msg} (${pct}%)`;
  }

  function _finishProgress(success) {
    const box = document.querySelector('.ed-progress-box');
    if (box) {
      box.querySelector('.ed-progress-fill').style.width = '100%';
      box.className = 'ed-progress-box ' + (success ? 'success' : 'error');
    }
  }

  // ── Unmount all RichText instances ──────────────────────────

  function _unmountAll() {
    if (CL.Editors?.RichText?.unmountAll) {
      CL.Editors.RichText.unmountAll();
    }
  }

  // ── Extract code from HTML ─────────────────────────────────

  function _extractCode(html) {
    const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
    return match ? match[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : '';
  }

  return { render, loadChap, loadList, edit, switchTab, saveField, closeForm };
});
