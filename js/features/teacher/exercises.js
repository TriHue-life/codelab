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
    el.innerHTML = '<div style="padding:20px;text-align:center">⏳ Đang tải dữ liệu bài tập...</div>';
    
    // Load exercises from API
    const token = localStorage.getItem('token');
    if (!token) {
      el.innerHTML = '<div style="padding:20px;color:red">❌ Chưa đăng nhập</div>';
      return;
    }
    
    CL.API.post('getExercises', { token }, (res) => {
      if (!res.success) {
        el.innerHTML = `<div style="padding:20px;color:red">❌ Lỗi: ${res.text}</div>`;
        return;
      }
      
      const allExs = res.data || [];
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
    });
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
    
    const filtered = _allExercises.filter(ex => 
      ex.g === _currentGrade && ex.id.split('-')[1] === _currentChapter
    );
    
    // Extract Bloom levels
    const bloomSet = new Set();
    filtered.forEach(ex => {
      const parts = ex.id.split('-');
      if (parts.length >= 3) {
        const bloom = parts[2]; // e.g., "b1", "b2"
        bloomSet.add(bloom);
      }
    });
    
    const blooms = [...bloomSet].sort();
    const edBloom = document.getElementById('ed-bloom');
    if (edBloom) {
      edBloom.innerHTML = '<option value="">— Tất cả mức Bloom —</option>' +
        blooms.map(b => {
          const bloomLabel = b.toUpperCase();
          return `<option value="${b}">${bloomLabel}</option>`;
        }).join('');
      edBloom.style.display = 'block';
    }
    
    // Display all exercises for this chapter
    filterList();
  }

  // ══════════════════════════════════════════════════════════════
  //  FILTER LIST
  // ══════════════════════════════════════════════════════════════

  function filterList() {
    const edBloom = document.getElementById('ed-bloom');
    if (edBloom) {
      _currentBloom = edBloom.value;
    }
    
    let filtered = _allExercises.filter(ex => 
      ex.g === _currentGrade && ex.id.split('-')[1] === _currentChapter
    );
    
    if (_currentBloom) {
      filtered = filtered.filter(ex => ex.id.split('-')[2] === _currentBloom);
    }
    
    // Sort naturally
    filtered.sort((a, b) => {
      const aParts = a.id.split('-');
      const bParts = b.id.split('-');
      if (aParts[3] !== bParts[3]) {
        return parseInt(aParts[3]) - parseInt(bParts[3]);
      }
      return a.id.localeCompare(b.id);
    });
    
    const edList = document.getElementById('ed-list');
    if (edList) {
      edList.innerHTML = filtered.map(e => `
        <div class="ed-item" onclick="CL.Teacher.ExEditor.edit('${e.id}')">
          <span class="ed-lv">${(e.lv || '').split('–')[0].trim()}</span>
          <span class="ed-num">${e.num || ''}</span>
          <span class="ed-title">${e.title || ''}</span>
          <span class="ed-type-badge ${e.type || 'python'}">${(e.type || 'python').toUpperCase()}</span>
        </div>`).join('');
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  EDIT EXERCISE
  // ══════════════════════════════════════════════════════════════

  function edit(id) {
    _currentId = id;
    const ex = _allExercises.find(e => e.id === id);
    if (!ex) return;

    const form = document.getElementById('ed-form');
    if (!form) return;

    form.innerHTML = `
      <div class="ed-form-header">
        <h3>${ex.title || 'Bài tập'}</h3>
        <button onclick="CL.Teacher.ExEditor.close()" class="ed-close-btn">✕</button>
      </div>
      <div class="ed-tabs">
        <button class="ed-tab-btn active" data-tab="desc">📝 Mô tả</button>
        <button class="ed-tab-btn" data-tab="theory">📖 Lý thuyết</button>
        <button class="ed-tab-btn" data-tab="code">💻 Code mẫu</button>
      </div>
      <div class="ed-tab-content">
        <div class="ed-tab-pane active" data-tab="desc">
          <textarea id="ed-desc" class="ed-textarea" placeholder="Nhập mô tả bài tập...">${ex.desc || ''}</textarea>
        </div>
        <div class="ed-tab-pane" data-tab="theory">
          <textarea id="ed-theory" class="ed-textarea" placeholder="Nhập lý thuyết..."></textarea>
        </div>
        <div class="ed-tab-pane" data-tab="code">
          <textarea id="ed-code" class="ed-textarea" placeholder="Nhập code mẫu..."></textarea>
        </div>
      </div>
      <div class="ed-form-footer">
        <button onclick="CL.Teacher.ExEditor.save()" class="ed-save-btn">💾 Lưu</button>
        <button onclick="CL.Teacher.ExEditor.close()" class="ed-cancel-btn">Hủy</button>
      </div>`;

    form.style.display = 'block';

    // Tab switching
    const tabBtns = form.querySelectorAll('.ed-tab-btn');
    const tabPanes = form.querySelectorAll('.ed-tab-pane');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        form.querySelector(`[data-tab="${btn.dataset.tab}"]`).classList.add('active');
      });
    });
  }

  function save() {
    if (!_currentId) return;
    
    const desc = document.getElementById('ed-desc')?.value || '';
    const token = localStorage.getItem('token');
    
    const exercise = {
      id: _currentId,
      desc: desc
    };

    CL.API.post('saveExercise', { token, exercise }, (res) => {
      if (res.success) {
        alert('✅ Lưu thành công');
        _hasUnsavedChanges = false;
      } else {
        alert('❌ Lỗi: ' + res.text);
      }
    });
  }

  function close() {
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
    _currentId = null;
  }

  return {
    render: render,
    edit: edit,
    save: save,
    close: close
  };
});
