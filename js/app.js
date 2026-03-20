/**
 * app.js — Application Bootstrap (Entry Point)
 * PHẢI LOAD CUỐI CÙNG. Không chứa business logic.
 * @requires TẤT CẢ các module khác
 */
'use strict';

(function bootstrap() {
  const Store    = CL.require('Store');
  const Events   = CL.require('Events');
  const Dropdown = CL.require('UI.Dropdown');
  const Toast    = CL.require('UI.Toast');
  const Registry = CL.require('Exercises.Registry');

  // ── Event wiring ─────────────────────────────────────────────
  Events.on('exercise:selected', ({ exercise }) => {
    Store.set('currentExId',   exercise.id);
    Store.set('currentExType', exercise.type || 'python');
    _showDesc(exercise);
    _routeEditor(exercise);
    CL.Features.AntiCheat?.enable();
  });

  Events.on('exercise:cleared', () => {
    Store.set('currentExId',   '');
    Store.set('currentExType', '');
    document.getElementById('ex-desc')?.classList.remove('show');
    document.getElementById('grade-panel').innerHTML = '';
    CL.Features.AntiCheat?.disable();
  });

  Events.on('auth:login', ({ user }) => {
    if (user.role === 'student') {
      CL.Features.ModeManager?.init();
      _loadActiveExam(user);
    }
    if (user.role === 'teacher' || user.role === 'admin') {
      // Giáo viên/Admin: hiện workspace với dropdown bài tập
      const ws = document.getElementById('workspace');
      if (ws) ws.style.display = '';
    }
    Toast.success('Xin chào, ' + user.name + '!', 2500);
    CL.API.logAccess('login', user.role);
  });

  // ── Dropdown init ─────────────────────────────────────────────
  Dropdown.init();

  // ── Auth start ───────────────────────────────────────────────
  CL.Auth.UI.init(() => {
    if (!CL.API.isReady()) setTimeout(() => CL.Features.Setup?.checkAndShow(), 500);
  });

  // ── Private helpers ───────────────────────────────────────────
  function _routeEditor(exercise) {
    const type = exercise.type || 'python';
    if (type !== 'html') CL.Editors.Html?.unmount();
    if (type !== 'sql')  CL.Editors.Sql?.unmount();
    if (type === 'html') setTimeout(() => CL.Editors.Html?.mount(exercise), 30);
    else if (type === 'sql') setTimeout(() => CL.Editors.Sql?.mount(exercise), 30);
    else {
      const ws = document.getElementById('workspace');
      if (ws && ws.dataset.mode) ws.dataset.mode = '';
    }
  }

  function _showDesc(exercise) {
    const set = (id, txt, html) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (html) el.innerHTML = txt; else el.textContent = txt;
    };
    set('ex-desc-title', exercise.num + '. ' + exercise.title);
    set('ex-desc-body',  exercise.desc || '', true);
    const gt = document.getElementById('ex-desc-grade-tag');
    if (gt) { gt.textContent = exercise.g; gt.className = 'ex-tag ' + (exercise.g||'').toLowerCase(); }
    const ct = document.getElementById('ex-desc-chap-tag');
    if (ct) ct.textContent = exercise.ch;
    document.getElementById('ex-desc')?.classList.add('show');

    // Render theory panel
    const panel = document.getElementById('theory-panel');
    if (panel) {
      panel.innerHTML = (exercise.theory||'') + (exercise.pseudo||'') +
        ((exercise.errors||[]).length ? '<ul>' + exercise.errors.map(e=>'<li>'+e+'</li>').join('')+'</ul>' : '');
    }

    // Load Sheets override async
    if (CL.API.isReady()) {
      CL.API.getExerciseDetail(exercise.id).then(d => {
        if (d?.ly_thuyet && panel) panel.innerHTML = d.ly_thuyet + (exercise.pseudo||'');
      }).catch(()=>{});
    }
  }

  async function _loadActiveExam(user) {
    if (!CL.API.isReady()) return;
    try {
      const exams  = await CL.API.getExams();
      const active = exams.find(e => e.trang_thai === 'active' &&
        (!e.lop || e.lop.split(',').map(s=>s.trim()).includes(user.lop)));
      if (active) _showExamBanner(active);
    } catch {}
  }

  function _showExamBanner(exam) {
    const b = document.getElementById('exam-banner');
    if (!b) return;
    b.innerHTML = '<span class="eb-title">📋 ' + exam.ten + '</span><span id="eb-cd"></span>';
    b.classList.add('show');
    if (exam.thoi_gian_phut) {
      const end = Date.now() + exam.thoi_gian_phut * 60000;
      setInterval(() => {
        const r = Math.max(0, Math.floor((end - Date.now()) / 1000));
        const el = document.getElementById('eb-cd');
        if (el) el.textContent = ' ⏱ ' + Math.floor(r/60) + ':' + String(r%60).padStart(2,'0');
      }, 1000);
    }
  }

  // ── Global bridges for HTML onclick handlers ──────────────────
  window.cddOpen   = w    => Dropdown.open(w);
  window.cddSelect = (w,v)=> Dropdown.select(w,v);
  window.cddClose  = ()   => {};

  window.switchTab = tab => {
    document.querySelectorAll('.ws-tab').forEach(t => t.classList.toggle('on', t.dataset.tab === tab));
    document.querySelectorAll('.ws-panel').forEach(p => p.style.display = p.dataset.panel === tab ? '' : 'none');
  };
  window.closeDesc = () => document.getElementById('ex-desc')?.classList.remove('show');

  // Unified grade entry point
  window.gradeCode = window.gradeHTML = window.gradeSQL = function() {
    const type  = Store.get('currentExType') || 'python';
    const exId  = Store.get('currentExId');
    const user  = Store.get('currentUser');
    if (!exId) { Toast.warn('Vui lòng chọn bài tập trước'); return; }
    try {
      let result;
      if      (type === 'html') result = CL.Graders.Html.grade(CL.Editors.Html.getCode(), exId);
      else if (type === 'sql')  result = CL.Graders.Sql.grade(CL.Editors.Sql.getCode(), exId);
      else {
        const code   = CL.Editors.Python.getCode();
        const output = document.getElementById('output')?.textContent || '';
        result = CL.Graders.Python.grade(code, output, exId);
      }
      if (user?.role === 'student') {
        CL.API.submitScore(exId, result.exercise.title, result.score);
        CL.API.logAccess('grade', exId + ':' + result.score);
      }
    } catch(e) { Toast.error('❌ ' + e.message); }
  };

  window.toast = (msg, ms) => Toast.show(msg, 'info', ms);
  console.info('[' + CL.appName + '] Bootstrap — ' + Registry.count() + ' bài tập');
})();
