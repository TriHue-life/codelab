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
    // Anti-cheat chỉ bật trong exam mode, KHÔNG bật khi luyện tập
    // CL.Features.AntiCheat?.enable(); ← disabled for practice
  });

  Events.on('exercise:cleared', () => {
    Store.set('currentExId',   '');
    Store.set('currentExType', '');
    document.getElementById('ex-desc')?.classList.remove('show');
    const gp = document.getElementById('grade-panel');
    if (gp) {
      // Reset grade panel to initial state (keep tab structure)
      const rv = document.getElementById('rv'); if (rv) rv.textContent = '—';
      const sg = document.getElementById('sg'); if (sg) { sg.textContent='Chưa chấm'; sg.style.color='var(--text3)'; }
      const sp = document.getElementById('sp'); if (sp) sp.textContent='—';
      const sf = document.getElementById('sf'); if (sf) sf.textContent='—';
      const lr = document.getElementById('lr');
      if (lr) lr.innerHTML='<div class="empty"><div class="empty-i">📋</div>Nhấn <b>Chấm điểm</b> để xem kết quả</div>';
      const ring = document.getElementById('ring-fill');
      if (ring) { ring.style.strokeDashoffset='270'; ring.style.stroke=''; }
    }
  });

  Events.on('auth:login', ({ user }) => {
    // Hiện app shell sau khi đăng nhập thành công
    document.body.classList.remove('auth-pending');
    const shell = document.getElementById('app-shell');
    if (shell) shell.style.removeProperty('display');

    // Init sidebar navigation (Canvas-style)
    CL.Features.Sidebar?.init(user.role);

    // Update user badge in topbar
    const area = document.getElementById('user-badge-area');
    if (area && !document.getElementById('user-badge')) {
      const isAdmin = user.role === 'admin';
      const isTeacher = user.role === 'teacher' || isAdmin;
      const icon = isAdmin ? '⚡' : isTeacher ? '👨‍🏫' : '🎓';
      area.innerHTML = `<div id="user-badge">
        <span class="ubadge ${user.role}">${icon}</span>
        <span class="uname">${CL.require('Utils').escHtml(user.name)}${user.lop ? ' · '+user.lop : ''}</span>
        <button class="u-profile-btn" onclick="CL.Features.Profile?.open()" title="Hồ sơ">👤</button>
      </div>`;
    }

    // Student: check exam
    if (user.role === 'student') {
      CL.Features.ModeManager?.init();
      _loadActiveExam(user);
    }

    // Show/hide exercise bar based on role & view
    const exBar = document.getElementById('tb-ex-bar');
    if (exBar) exBar.style.display = '';

    Toast.success('Xin chào, ' + user.name + '!', 2500);
    CL.API.logAccess('login', user.role);
  });

  // ── Dropdown init ─────────────────────────────────────────────
  Dropdown.init();

  // ── Theme init ──────────────────────────────────────────────
  // Init immediately for early theme application
  CL.Features.Theme?.init();

  // ── Auth start ───────────────────────────────────────────────
  CL.Auth.UI.init(() => {
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
    // Update editor panel title
    const labelMap = { python: 'Code Editor — Python', html: 'Code Editor — HTML/CSS', sql: 'Code Editor — SQL' };
    const lbl = document.getElementById('editor-lang-label');
    if (lbl) lbl.textContent = labelMap[type] || 'Code Editor';
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
    const panel = document.getElementById('theory-content');
    if (panel) {
      panel.innerHTML = (exercise.theory||'') + (exercise.pseudo||'') +
        ((exercise.errors||[]).length ? '<ul>' + exercise.errors.map(e=>'<li>'+e+'</li>').join('')+'</ul>' : '');
    }

    // Update criteria tab content
    const criEl = document.getElementById('criteria-content');
    if (criEl && exercise.desc) {
      criEl.innerHTML = `
        <div class="ex-criteria-wrap">
          <div class="ex-criteria-header">
            <span class="ex-tag ${(exercise.g||'').toLowerCase()}">${exercise.g}</span>
            <span class="ex-lv-tag">${exercise.lv||''}</span>
          </div>
          <div class="ex-criteria-body">${exercise.desc}</div>
          ${(exercise.rb||[]).length ? `
            <div class="ex-criteria-rubric">
              <div class="ex-rub-title">📋 Tiêu chí chấm điểm</div>
              ${exercise.rb.map(rb=>`
                <div class="ex-rub-item">
                  <span class="ex-rub-desc">${rb.desc||rb.mo_ta||''}</span>
                  <span class="ex-rub-pts">${rb.pts||rb.diem||0}đ</span>
                </div>`).join('')}
            </div>` : ''}
        </div>`;
      // Expand criteria and theory sections when exercise selected
      window.rpExpand?.('criteria');
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
      const active = exams.find(e => {
        if (e.trang_thai !== 'active') return false;
        // No class restriction → open to all
        const ids = Array.isArray(e.lop_ids) && e.lop_ids.length ? e.lop_ids
          : (e.lop||'').split(',').map(s=>s.trim()).filter(Boolean);
        return ids.length === 0 || ids.includes(user.lop);
      });
      if (active) _showExamBanner(active);
    } catch {}
  }

  function _showExamBanner(exam) {
    const b = document.getElementById('exam-banner');
    if (!b) return;
    b.style.display = 'flex';
    b.classList.add('show');

    const startExam = () => CL.Features.ExamMode?.start(exam);
    window._pendingExam = exam;

    b.innerHTML = `
      <div class="eb-left">
        <span class="eb-icon">📋</span>
        <div>
          <div class="eb-title">${Utils.escHtml(exam.ten)}</div>
          <div class="eb-meta">
            ${exam.thoi_gian_phut ? `⏱ ${exam.thoi_gian_phut} phút` : ''}
            ${exam.mat_khau ? ' · 🔐 Có mã vào' : ''}
          </div>
        </div>
      </div>
      <div class="eb-right">
        <span class="eb-cd" id="eb-cd"></span>
        <button class="eb-start-btn" onclick="CL.Features.ExamMode?.start(window._pendingExam)">
          Vào thi ngay →
        </button>
      </div>`;

    // Countdown to close time
    if (exam.gio_dong) {
      const [hh, mm] = exam.gio_dong.split(':').map(Number);
      const now  = new Date();
      const end  = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0);
      const tick = () => {
        const r   = Math.max(0, Math.floor((end - Date.now()) / 1000));
        const el  = document.getElementById('eb-cd');
        if (el) el.textContent = r > 0
          ? `Còn ${Math.floor(r/3600) ? Math.floor(r/3600)+'h ' : ''}${Math.floor((r%3600)/60)}:${String(r%60).padStart(2,'0')}`
          : 'Hết giờ';
        if (r > 0) setTimeout(tick, 1000);
      };
      tick();
    }
  }

  // ── Global bridges for HTML onclick handlers ──────────────────
  window.cddOpen   = w    => Dropdown.open(w);
  window.cddSelect = (w,v)=> Dropdown.select(w,v);
  window.cddClose  = ()   => {};

  // ── Right panel section toggle ───────────────────────────────
  window.rpToggle = function(section) {
    const el = document.getElementById('rp-' + section);
    if (el) el.classList.toggle('collapsed');
  };

  // ── Ensure a section is expanded ─────────────────────────────
  window.rpExpand = function(section) {
    const el = document.getElementById('rp-' + section);
    if (el) el.classList.remove('collapsed');
    // Scroll section into view
    const body = document.getElementById('rp-body-' + section);
    if (body) body.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Backward compat: switchTab now just expands the matching section
  window.switchTab = function(tab) {
    const map = { criteria:'criteria', theory:'theory', results:'results' };
    const sec = map[tab];
    if (sec) window.rpExpand(sec);
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
        const output = document.getElementById('out')?.textContent || '';
        result = CL.Graders.Python.grade(code, output, exId);
      }
      if (user?.role === 'student') {
        CL.API.submitScore(exId, result.exercise.title, result.score);
        CL.API.logAccess('grade', exId + ':' + result.score);
      }
    } catch(e) { Toast.error('❌ ' + e.message); }
  };

  window.toast = (msg, ms) => Toast.show(msg, 'info', ms);

  // ── Code execution globals ────────────────────────────────────

  let _inputResolve = null;

  window.clearOut = function() {
    const el = document.getElementById('out');
    if (el) el.innerHTML = '<span class="o-p">// Output sẽ hiển thị tại đây sau khi nhấn Chạy code…</span>';
  };

  window.appendOut = function(text, cls = 'o-n') {
    const el = document.getElementById('out');
    if (!el) return;
    const prompt = el.querySelector('.o-p'); if (prompt) prompt.remove();
    const span = document.createElement('span'); span.className = cls;
    span.textContent = text; el.appendChild(span); el.scrollTop = el.scrollHeight;
  };

  window.submitInput = function() {
    const val = document.getElementById('input-field')?.value || '';
    document.getElementById('input-overlay')?.classList.remove('show');
    window.appendOut(val + '\n', 'o-n');
    if (_inputResolve) { _inputResolve(val); _inputResolve = null; }
  };

  // Wire input field Enter key
  document.getElementById('input-field')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') window.submitInput();
  });

  function _askInput(promptText) {
    return new Promise(resolve => {
      _inputResolve = resolve;
      const pr = document.getElementById('input-prompt');
      if (pr) pr.textContent = promptText || '▶ Nhập giá trị:';
      const inp = document.getElementById('input-field');
      if (inp) { inp.value = ''; }
      document.getElementById('input-overlay')?.classList.add('show');
      setTimeout(() => inp?.focus(), 100);
    });
  }

  function _sanitizeCode(code) {
    return (code || '')
      .replace(/[\u201c\u201d\u201e\u201f\u00ab\u00bb]/g, '"')
      .replace(/[\u2018\u2019\u201a\u201b]/g, "'")
      .replace(/[\u200b\u200c\u200d\u200e\u200f\ufeff\u00ad]/g, '')
      .replace(/\u00a0/g, ' ')
      .replace(/\uff1a/g, ':')
      .replace(/\uff08/g, '(').replace(/\uff09/g, ')');
  }

  function _extractInputPrompts(code) {
    const prompts = [];
    const re = /\binput\s*\(\s*(['"\`])((?:[^\\]|\\.)*?)\1\s*\)/g;
    const positions = new Set();
    let m;
    while ((m = re.exec(code)) !== null) { prompts.push(m[2]); positions.add(m.index); }
    const re2 = /\binput\s*\(\s*\)/g;
    let m2;
    while ((m2 = re2.exec(code)) !== null) {
      if (!positions.has(m2.index)) prompts.push('');
    }
    return prompts;
  }

  window.runCode = async function() {
    const code = _sanitizeCode(CL.Editors.Python?.getCode() || document.getElementById('code-input')?.value || '');
    if (!code.trim()) { Toast.warn('Vui lòng nhập code'); return; }
    window.clearOut();

    const inputPrompts = _extractInputPrompts(code);
    const inputs = [];
    for (let i = 0; i < inputPrompts.length; i++) {
      const val = await _askInput(inputPrompts[i] || `Nhập giá trị cho input() thứ ${i+1}:`);
      inputs.push(val);
    }

    let inputIdx = 0;
    try {
      const toks   = PyInterp.tokenize(code);
      const parser = new PyInterp.Parser(toks);
      const ast    = parser.parse();
      const interp = new PyInterp.Interp(
        (text, isErr) => window.appendOut(text, isErr ? 'o-e' : 'o-n'),
        (prompt) => {
          if (inputIdx < inputs.length) {
            const val = inputs[inputIdx++];
            if (prompt) window.appendOut(prompt, 'o-n');
            window.appendOut(val + '\n', 'o-p');
            return val;
          }
          if (prompt) window.appendOut(prompt, 'o-n');
          return '';
        }
      );
      const r = interp.run(ast);
      if (r && r.e) window.appendOut('\n' + r.e.toString() + '\n', 'o-e');
    } catch(e) {
      window.appendOut('\n' + (e instanceof PyInterp.PyErr ? e.toString() : 'RuntimeError: ' + (e.message || String(e))) + '\n', 'o-e');
    }
  };

  window.runAndGrade = async function() {
    await window.runCode();
    setTimeout(window.gradeCode, 300);
  };

  window.clearAll = function() {
    const ci = document.getElementById('code-input');
    if (ci) { ci.value = ''; }
    if (typeof CL.Editors.Python?.setCode === 'function') CL.Editors.Python.setCode('');
    window.clearOut();
    // Reset grade panel
    const rv = document.getElementById('rv'); if (rv) rv.textContent = '—';
    const sg = document.getElementById('sg'); if (sg) { sg.textContent = 'Chưa chấm'; sg.style.color = 'var(--text3)'; }
    ['sp','sf','ss'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '—'; });
    const lr = document.getElementById('lr');
    if (lr) lr.innerHTML = '<div class="empty"><div class="empty-i">📋</div>Nhấn <b>Chấm điểm</b> để xem kết quả</div>';
    const rf = document.getElementById('ring-fill');
    if (rf) { rf.style.strokeDashoffset = '270'; rf.style.stroke = ''; }
    if (typeof CL.Editors.Python?.updateHighlight === 'function') CL.Editors.Python.updateHighlight();
    if (typeof window.updLN === 'function') window.updLN();
  };

  console.info('[' + CL.appName + '] Bootstrap — ' + Registry.count() + ' bài tập');
})();
