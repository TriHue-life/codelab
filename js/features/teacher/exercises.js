CL.define('CL.Teacher.ExEditor', function() {
  let _currentId = null;
  let _hasUnsavedChanges = false;
  let _allExercises = [];
  let _currentGrade = '';
  let _currentChapter = '';
  let _currentBloom = '';

  // ══════════════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════════════

  function render(el) {
    console.log('[ExEditor] render called, el:', el);
    const allExs = Registry.getAll();
    _allExercises = allExs;
    const grades = [...new Set(allExs.map(e => e.g))];

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
          <select id="ed-bloom" style="flex:1;margin-top:8px;padding:8px;display:none;">
            <option value="">— Tất cả mức Bloom —</option>
          </select>
          <div id="ed-list" class="tp-edit-list"></div>
        </div>
        <div class="tp-edit-content">
          <div id="ed-form" class="tp-edit-form" style="display:none"></div>
        </div>
      </div>`;
    
    // Attach event listeners (inline onchange doesn't work with innerHTML)
    const edG = document.getElementById('ed-g');
    const edCh = document.getElementById('ed-ch');
    const edBloom = document.getElementById('ed-bloom');
    const toggleBtn = document.getElementById('ed-toggle-btn');
    const sidebar = document.getElementById('ed-sidebar');
    
    if (edG) edG.addEventListener('change', loadChap);
    if (edCh) edCh.addEventListener('change', loadList);
    if (edBloom) edBloom.addEventListener('change', filterList);
    
    // Toggle sidebar
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  LOAD CHAPTERS
  // ══════════════════════════════════════════════════════════════

  function loadChap(e) {
    _currentGrade = e.target.value;
    _currentChapter = '';
    _currentBloom = '';
    
    const filtered = _allExercises.filter(ex => ex.g === _currentGrade);
    
    // Extract chapter numbers from IDs (e.g., "17" from "k10-17-b1-1_1")
    const chapterSet = new Set();
    filtered.forEach(ex => {
      const parts = ex.id.split('-');
      if (parts.length >= 2) {
        const chNum = parts[1]; // e.g., "17"
        chapterSet.add(chNum);
      }
    });
    
    const chapters = [...chapterSet].sort((a, b) => parseInt(a) - parseInt(b));
    const edCh = document.getElementById('ed-ch');
    if (edCh) {
      edCh.innerHTML = '<option value="">— Chọn chủ đề —</option>' +
        chapters.map(ch => `<option>${ch}</option>`).join('');
    }
    
    // Clear list and Bloom dropdown
    const edList = document.getElementById('ed-list');
    if (edList) edList.innerHTML = '';
    
    const edBloom = document.getElementById('ed-bloom');
    if (edBloom) edBloom.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  //  LOAD EXERCISE LIST
  // ══════════════════════════════════════════════════════════════

  function loadList(e) {
    _currentChapter = e.target.value;
    _currentBloom = '';
    
    const filtered = _allExercises.filter(ex => {
      const parts = ex.id.split('-');
      return parts.length >= 2 && 
             ex.g === _currentGrade && 
             parts[1] === _currentChapter;
    });
    
    // Get unique Bloom levels
    const bloomLevels = [...new Set(filtered.map(ex => ex.bo))].sort();
    
    const edBloom = document.getElementById('ed-bloom');
    if (edBloom) {
      edBloom.innerHTML = '<option value="">— Tất cả mức Bloom —</option>' +
        bloomLevels.map(b => `<option>${b}</option>`).join('');
      edBloom.style.display = 'block';
    }
    
    // Display all exercises in this chapter
    renderList(filtered);
  }

  // ══════════════════════════════════════════════════════════════
  //  FILTER LIST BY BLOOM
  // ══════════════════════════════════════════════════════════════

  function filterList(e) {
    _currentBloom = e.target.value;
    
    let filtered = _allExercises.filter(ex => {
      const parts = ex.id.split('-');
      return parts.length >= 2 && 
             ex.g === _currentGrade && 
             parts[1] === _currentChapter;
    });
    
    // Filter by Bloom if selected
    if (_currentBloom) {
      filtered = filtered.filter(ex => ex.bo === _currentBloom);
    }
    
    renderList(filtered);
  }

  // ══════════════════════════════════════════════════════════════
  //  RENDER LIST
  // ══════════════════════════════════════════════════════════════

  function renderList(exercises) {
    const edList = document.getElementById('ed-list');
    if (!edList) return;
    
    if (!exercises || exercises.length === 0) {
      edList.innerHTML = '<div style="padding:10px;color:#999;">Không có bài tập</div>';
      return;
    }
    
    // Sort exercises by ID (natural sort)
    exercises.sort((a, b) => {
      const aParts = a.id.split('-').pop().split('_').map(Number);
      const bParts = b.id.split('-').pop().split('_').map(Number);
      if (aParts[0] !== bParts[0]) return aParts[0] - bParts[0];
      return aParts[1] - bParts[1];
    });
    
    edList.innerHTML = exercises.map(e => `
      <div class="ed-item" onclick="CL.Teacher.ExEditor.edit('${e.id}')">
        <span class="ed-lv">${(e.bo || '').split('–')[0].trim()}</span>
        <span class="ed-num">${e.id.split('-').pop()}</span>
        <span class="ed-title">${e.title || ''}</span>
        <span class="ed-type-badge ${e.type || 'python'}">${(e.type || 'python').toUpperCase()}</span>
      </div>`).join('');
    
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
    _unmountAll();
  }

  // ══════════════════════════════════════════════════════════════
  //  EDIT EXERCISE
  // ══════════════════════════════════════════════════════════════

  function edit(id) {
    _currentId = id;
    _hasUnsavedChanges = false;
    
    const ex = _allExercises.find(e => e.id === id);
    if (!ex) {
      console.error('[ExEditor] Exercise not found:', id);
      return;
    }

    console.log('[ExEditor] Editing:', ex);
    
    const form = document.getElementById('ed-form');
    if (!form) return;
    
    form.innerHTML = `
      <div class="ed-header">
        <h2>${ex.title}</h2>
        <button class="ed-close-btn" id="ed-close">✕</button>
      </div>
      <div class="ed-tabs">
        <button class="ed-tab-btn active" data-tab="desc">Mô tả</button>
        <button class="ed-tab-btn" data-tab="theory">Lý thuyết</button>
        <button class="ed-tab-btn" data-tab="code">Code mẫu</button>
      </div>
      <div class="ed-tab-content" data-tab="desc" style="display:block"></div>
      <div class="ed-tab-content" data-tab="theory" style="display:none"></div>
      <div class="ed-tab-content" data-tab="code" style="display:none"></div>
      <div class="ed-actions">
        <button id="ed-save-desc" class="ed-save-btn">💾 Lưu Mô tả</button>
        <button id="ed-save-theory" class="ed-save-btn">💾 Lưu Lý thuyết</button>
        <button id="ed-save-code" class="ed-save-btn">💾 Lưu Code mẫu</button>
      </div>`;
    
    form.style.display = 'block';
    
    // Mount RichText editors
    const descContainer = form.querySelector('[data-tab="desc"]');
    const theoryContainer = form.querySelector('[data-tab="theory"]');
    const codeContainer = form.querySelector('[data-tab="code"]');
    
    if (CL.Editors?.RichText) {
      const descContent = localStorage.getItem(`cl_content_${id}_desc`) || ex.desc || '';
      const theoryContent = localStorage.getItem(`cl_content_${id}_theory`) || ex.ly_thuyet || '';
      const codeContent = localStorage.getItem(`cl_content_${id}_code`) || ex.code_mau || '';
      
      CL.Editors.RichText.mount(descContainer, descContent, () => {
        _hasUnsavedChanges = true;
      });
      CL.Editors.RichText.mount(theoryContainer, theoryContent, () => {
        _hasUnsavedChanges = true;
      });
      CL.Editors.RichText.mount(codeContainer, codeContent, () => {
        _hasUnsavedChanges = true;
      });
    }
    
    // Tab switching
    form.querySelectorAll('.ed-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
    });
    
    // Close button
    form.querySelector('.ed-close-btn').addEventListener('click', closeForm);
    
    // Save buttons
    form.querySelector('#ed-save-desc').addEventListener('click', () => saveField(id, 'desc'));
    form.querySelector('#ed-save-theory').addEventListener('click', () => saveField(id, 'theory'));
    form.querySelector('#ed-save-code').addEventListener('click', () => saveField(id, 'code'));
  }

  // ══════════════════════════════════════════════════════════════
  //  SWITCH TAB
  // ══════════════════════════════════════════════════════════════

  function switchTab(tabName) {
    const form = document.getElementById('ed-form');
    if (!form) return;
    
    // Hide all tabs
    form.querySelectorAll('.ed-tab-content').forEach(tab => {
      tab.style.display = 'none';
    });
    
    // Deactivate all buttons
    form.querySelectorAll('.ed-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = form.querySelector(`[data-tab="${tabName}"]`);
    if (selectedTab) selectedTab.style.display = 'block';
    
    // Activate button
    const selectedBtn = form.querySelector(`[data-tab="${tabName}"]`).previousElementSibling;
    if (selectedBtn) selectedBtn.classList.add('active');
  }

  // ══════════════════════════════════════════════════════════════
  //  SAVE FIELD
  // ══════════════════════════════════════════════════════════════

  async function saveField(id, field) {
    try {
      const editor = document.querySelector(`[data-tab="${field}"] .ProseMirror`);
      if (!editor) {
        Toast.error(`❌ Không tìm thấy editor cho ${field}`);
        return;
      }
      
      const html = editor.innerHTML;
      
      // First save to localStorage
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

  // ── Unmount all RichText instances ──────────────────────────

  function _unmountAll() {
    if (CL.Editors?.RichText?.unmountAll) {
      CL.Editors.RichText.unmountAll();
    }
  }

  return { render, edit, switchTab, saveField, closeForm };
});
