CL.define('CL.Teacher.ExEditor', function() {
  let _currentId = null;
  let _hasUnsavedChanges = false;

  // ══════════════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════════════

  function render(el) {
    console.log('[ExEditor] render called, el:', el);
    const allExs = Registry.getAll();
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
          <select id="ed-ex" style="flex:1;margin-top:8px;padding:8px;">
            <option value="">— Chọn bài tập —</option>
          </select>
          <select id="ed-bloom" style="flex:1;margin-top:8px;padding:8px;display:none;">
            <option value="">— Chọn mức Bloom —</option>
          </select>
          <select id="ed-sub" style="flex:1;margin-top:8px;padding:8px;display:none;">
            <option value="">— Chọn bài tập con —</option>
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
        loadBloomLevels(e.target.value);
      }
    });
    
    const edBloom = document.getElementById('ed-bloom');
    if (edBloom) edBloom.addEventListener('change', (e) => {
      if (e.target.value) {
        loadSubExercises(e.target.value);
      }
    });
    
    const edSub = document.getElementById('ed-sub');
    if (edSub) edSub.addEventListener('change', (e) => {
      if (e.target.value) {
        edit(e.target.value);
      }
    });
    
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
    const grade = e.target.value;
    const allExs = Registry.getAll();
    const filtered = allExs.filter(ex => ex.g === grade);
    
    const chapters = [...new Set(filtered.map(ex => ex.ch))];
    const edCh = document.getElementById('ed-ch');
    if (edCh) {
      edCh.innerHTML = '<option value="">— Chọn chủ đề —</option>' +
        chapters.map(ch => `<option>${ch}</option>`).join('');
    }
    
    // Clear exercise list
    const edEx = document.getElementById('ed-ex');
    if (edEx) edEx.innerHTML = '<option value="">— Chọn bài tập —</option>';
    
    // Hide Bloom and sub-exercise dropdowns
    const edBloom = document.getElementById('ed-bloom');
    const edSub = document.getElementById('ed-sub');
    if (edBloom) edBloom.style.display = 'none';
    if (edSub) edSub.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  //  LOAD EXERCISE LIST
  // ══════════════════════════════════════════════════════════════

  function loadList(e) {
    const chapter = e.target.value;
    const grade = document.getElementById('ed-g').value;
    const allExs = Registry.getAll();
    
    const filtered = allExs.filter(ex => ex.g === grade && ex.ch === chapter);
    
    const edEx = document.getElementById('ed-ex');
    if (edEx) {
      edEx.innerHTML = '<option value="">— Chọn bài tập —</option>' +
        filtered.map(ex => `<option value="${ex.id}">${ex.title}</option>`).join('');
    }
    
    // Hide Bloom and sub-exercise dropdowns
    const edBloom = document.getElementById('ed-bloom');
    const edSub = document.getElementById('ed-sub');
    if (edBloom) edBloom.style.display = 'none';
    if (edSub) edSub.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  //  LOAD BLOOM LEVELS
  // ══════════════════════════════════════════════════════════════

  function loadBloomLevels(exerciseId) {
    const allExs = Registry.getAll();
    const exercise = allExs.find(e => e.id === exerciseId);
    const edBloom = document.getElementById('ed-bloom');
    
    if (!edBloom) return;
    
    // Clear Bloom dropdown
    edBloom.innerHTML = '<option value="">— Chọn mức Bloom —</option>';
    
    // Get all sub-exercises (bài tập con) for this exercise
    // Sub-exercises are identified by having the same chapter and title prefix
    const subExercises = allExs.filter(ex => 
      ex.g === exercise.g && 
      ex.ch === exercise.ch &&
      ex.title && exercise.title &&
      ex.title.includes(exercise.title.split(':')[0])
    );
    
    if (subExercises && subExercises.length > 0) {
      // Get unique Bloom levels from sub-exercises
      const bloomLevels = [...new Set(subExercises.map(ex => ex.bo))].sort();
      
      if (bloomLevels.length > 0) {
        bloomLevels.forEach(bloom => {
          const option = document.createElement('option');
          option.value = bloom;
          option.textContent = bloom;
          edBloom.appendChild(option);
        });
        edBloom.style.display = 'block';
      } else {
        edBloom.style.display = 'none';
        edit(exerciseId);
      }
    } else {
      edBloom.style.display = 'none';
      edit(exerciseId);
    }
    
    // Hide sub-exercise dropdown
    const edSub = document.getElementById('ed-sub');
    if (edSub) edSub.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  //  LOAD SUB-EXERCISES
  // ══════════════════════════════════════════════════════════════

  function loadSubExercises(bloomLevel) {
    const allExs = Registry.getAll();
    const edEx = document.getElementById('ed-ex');
    const exerciseId = edEx ? edEx.value : '';
    const exercise = allExs.find(e => e.id === exerciseId);
    const edSub = document.getElementById('ed-sub');
    
    if (!edSub || !exercise) return;
    
    // Clear sub-exercise dropdown
    edSub.innerHTML = '<option value="">— Chọn bài tập con —</option>';
    
    // Get all sub-exercises with matching grade, chapter, and Bloom level
    const subExercises = allExs.filter(ex => 
      ex.g === exercise.g && 
      ex.ch === exercise.ch &&
      ex.bo === bloomLevel &&
      ex.title && exercise.title &&
      ex.title.includes(exercise.title.split(':')[0])
    );
    
    if (subExercises && subExercises.length > 0) {
      subExercises.forEach((subEx, idx) => {
        const option = document.createElement('option');
        option.value = subEx.id;
        option.textContent = subEx.title || `Bài ${idx + 1}`;
        edSub.appendChild(option);
      });
      edSub.style.display = 'block';
    } else {
      edSub.style.display = 'none';
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  EDIT EXERCISE
  // ══════════════════════════════════════════════════════════════

  function edit(id) {
    _currentId = id;
    _hasUnsavedChanges = false;
    
    const allExs = Registry.getAll();
    const ex = allExs.find(e => e.id === id);
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
