/**
 * features/practice-layout.js — Restructured Practice Layout
 * ═══════════════════════════════════════════════════════════════
 * Quản lý 3 chế độ: practice | exam | preview
 *
 * Layout mới:
 *   ┌── grade-panel ──────────────────────────────┐
 *   │  [📋 Đề bài] [📖 Lý thuyết] [📊 Kết quả]  │ ← tab bar ngang
 *   │  ─────────────────────────────────────────  │
 *   │  <content area>                             │
 *   └─────────────────────────────────────────────┘
 *
 * Modes:
 *   practice : Đề bài + Lý thuyết + Kết quả + Phân tích
 *   exam     : Đề bài + Kết quả (không Lý thuyết)
 *   preview  : Như practice + inline edit cho teacher/admin
 *
 * @requires core/*, auth/session.js
 */
'use strict';

CL.define('Features.PracticeLayout', () => {

  const Events  = CL.require('Events');
  const Session = CL.require('Auth.Session');

  let _mode = 'practice'; // 'practice' | 'exam' | 'preview'
  let _built = false;

  // ── Public API ────────────────────────────────────────────────

  function init() {
    if (_built) return;
    _built = true;
    _buildTabBar();
    _bindEvents();
    setMode('practice');
  }

  function setMode(mode) {
    _mode = mode;
    const user = Session.get();
    const role = user?.role || 'student';

    // Tab Lý thuyết: ẩn trong exam mode
    const theoryTab = document.getElementById('plt-tab-theory');
    if (theoryTab) {
      theoryTab.style.display = (mode === 'exam') ? 'none' : '';
    }

    // Nút Sửa: chỉ hiện với teacher/admin trong practice/preview
    const canEdit = (role === 'teacher' || role === 'admin') && mode !== 'exam';
    document.querySelectorAll('.plt-edit-btn').forEach(btn => {
      btn.style.display = canEdit ? '' : 'none';
    });

    // Exam submit bar
    const examBar = document.getElementById('exam-submit-bar');
    if (examBar) examBar.style.display = mode === 'exam' ? '' : 'none';

    // Practice score history
    const hist = document.getElementById('practice-score-history');
    if (hist && mode === 'exam') hist.style.display = 'none';

    // Active tab: default to desc
    _activateTab('desc');

    Events.emit('practiceLayout:modeChanged', { mode });
  }

  function getMode() { return _mode; }

  function activateTab(tab) { _activateTab(tab); }

  // ── Build tab bar ─────────────────────────────────────────────

  function _buildTabBar() {
    const gp = document.getElementById('grade-panel');
    if (!gp) return;

    // Tạo tab bar mới (thay thế rp-inner-tabs cũ)
    const existing = document.getElementById('plt-tabbar');
    if (existing) existing.remove();

    const tabbar = document.createElement('div');
    tabbar.id = 'plt-tabbar';
    tabbar.className = 'plt-tabbar';
    tabbar.innerHTML = `
      <button class="plt-tab active" id="plt-tab-desc"
        onclick="CL.Features.PracticeLayout.activateTab('desc')">
        <span class="plt-tab-icon">📋</span>
        <span class="plt-tab-label">Đề bài</span>
      </button>
      <button class="plt-tab" id="plt-tab-theory"
        onclick="CL.Features.PracticeLayout.activateTab('theory')">
        <span class="plt-tab-icon">📖</span>
        <span class="plt-tab-label">Lý thuyết</span>
      </button>
      <button class="plt-tab" id="plt-tab-result"
        onclick="CL.Features.PracticeLayout.activateTab('result')">
        <span class="plt-tab-icon">📊</span>
        <span class="plt-tab-label">Kết quả</span>
        <span class="plt-tab-badge" id="plt-badge-result" style="display:none"></span>
      </button>
      <button class="plt-tab" id="plt-tab-analysis"
        onclick="CL.Features.PracticeLayout.activateTab('analysis')"
        style="display:none">
        <span class="plt-tab-icon">🔍</span>
        <span class="plt-tab-label">Phân tích</span>
        <span class="plt-tab-badge err" id="plt-badge-analysis" style="display:none"></span>
      </button>`;

    // Chèn tabbar làm phần tử đầu tiên của grade-panel
    // (thay thế rp-inner-tabbar cũ)
    const oldTabbar = document.getElementById('rp-inner-tabbar');
    if (oldTabbar) {
      oldTabbar.replaceWith(tabbar);
    } else {
      gp.insertBefore(tabbar, gp.firstChild);
    }

    // Thêm edit buttons vào Đề bài và Lý thuyết panes
    _upgradeEditBars();
  }

  function _upgradeEditBars() {
    // Đề bài: thêm nút Sửa inline
    const descBar = document.getElementById('desc-edit-bar');
    if (descBar && !descBar.querySelector('.plt-edit-btn')) {
      const btn = document.createElement('button');
      btn.className = 'plt-edit-btn teacher-only';
      btn.title = 'Soạn thảo đề bài (Canvas Editor)';
      btn.onclick = () => _openInlineEditor('desc');
      btn.innerHTML = '✏️ Sửa';
      descBar.appendChild(btn);
    }

    // Lý thuyết: thêm nút Sửa inline
    const theoryPane = document.getElementById('rp-pane-theory');
    if (theoryPane) {
      const editBar = theoryPane.querySelector('.rp-edit-bar');
      if (editBar && !editBar.querySelector('.plt-edit-btn')) {
        const btn = document.createElement('button');
        btn.className = 'plt-edit-btn teacher-only';
        btn.title = 'Soạn thảo lý thuyết (Canvas Editor)';
        btn.onclick = () => _openInlineEditor('theory');
        btn.innerHTML = '✏️ Sửa';
        editBar.appendChild(btn);
      }
    }
  }

  // ── Tab activation ────────────────────────────────────────────

  function _activateTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.plt-tab').forEach(btn => {
      btn.classList.toggle('active', btn.id === `plt-tab-${tab}`);
    });

    // Map tab → pane id
    const paneMap = {
      desc:     'rp-pane-desc',
      theory:   'rp-pane-theory',
      result:   'rp-pane-result',
      analysis: 'rp-pane-analysis',
    };

    document.querySelectorAll('.rp-tabpane').forEach(pane => {
      pane.classList.toggle('on', pane.id === paneMap[tab]);
    });

    // Compat: fire old rpTab event for result/analysis
    if (tab === 'result' || tab === 'analysis') {
      // Sync old rp-inner-tabs if still exist
      document.querySelectorAll('.rp-inner-tab').forEach(t => {
        t.classList.toggle('on', t.id === `rp-tab-${tab}`);
      });
    }
  }

  // ── Show/hide analysis tab ────────────────────────────────────

  function showAnalysisTab(errorCount) {
    const tab = document.getElementById('plt-tab-analysis');
    const badge = document.getElementById('plt-badge-analysis');
    if (tab) tab.style.display = '';
    if (badge && errorCount > 0) {
      badge.textContent = errorCount;
      badge.style.display = '';
    }
    // Auto-switch to result tab when grading
    _activateTab('result');
  }

  function showResultBadge(score) {
    const badge = document.getElementById('plt-badge-result');
    if (!badge) return;
    if (score !== null && score !== undefined) {
      badge.textContent = score.toFixed(1);
      badge.style.display = '';
      badge.className = 'plt-tab-badge ' + (score >= 8 ? 'ok' : score >= 5 ? 'warn' : 'err');
    } else {
      badge.style.display = 'none';
    }
  }

  function resetTabs() {
    // Ẩn analysis tab
    const analysisTab = document.getElementById('plt-tab-analysis');
    if (analysisTab) analysisTab.style.display = 'none';
    // Xóa badges
    document.querySelectorAll('.plt-tab-badge').forEach(b => { b.style.display = 'none'; });
    // Reset về desc
    _activateTab('desc');
  }

  // ── Inline editor ─────────────────────────────────────────────

  function _openInlineEditor(field) {
    // Delegate to existing openRichEditor
    if (typeof window.openRichEditor === 'function') {
      window.openRichEditor(field);
    }
  }

  // ── Events ────────────────────────────────────────────────────

  function _bindEvents() {
    // Khi chọn bài → về tab Đề bài
    Events.on('exercise:selected', () => {
      resetTabs();
      _activateTab('desc');
    });

    // Khi chấm điểm xong → show result + analysis
    Events.on('grading:complete', ({ score, errorCount }) => {
      showResultBadge(score);
      if (errorCount > 0) showAnalysisTab(errorCount);
      _activateTab('result');
    });

    // Mode changes từ exam
    Events.on('mode:exam-entered', () => setMode('exam'));
    Events.on('mode:practice-entered', () => setMode('practice'));
  }

  // ── Backward compat ───────────────────────────────────────────
  window.rpTab = function(tab) { _activateTab(tab); };

  return {
    init, setMode, getMode, activateTab,
    showAnalysisTab, showResultBadge, resetTabs,
  };
});
