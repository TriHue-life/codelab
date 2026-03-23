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
    _showDesc(exercise);    // update floating ex-desc bar
    _routeEditor(exercise); // mount correct editor (python/html/sql)
    // Anti-cheat chỉ bật trong exam mode, KHÔNG bật khi luyện tập
    // CL.Features.AntiCheat?.enable(); ← disabled for practice
    // Reset grade results
    const rv = document.getElementById('rv'); if (rv) rv.textContent = '—';
    const sg = document.getElementById('sg');
    if (sg) { sg.textContent = 'Chưa chấm'; sg.style.color = 'var(--text3)'; }
    const rf = document.getElementById('ring-fill');
    if (rf) { rf.style.strokeDashoffset = '270'; rf.style.stroke = ''; }
    const lr = document.getElementById('lr');
    if (lr) lr.innerHTML = '<div class="empty"><div class="empty-i">📋</div>Nhấn <b>Chấm điểm</b> để xem kết quả</div>';
    ['sp','sf','ss'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '—'; });
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

  // ── Exam mode event wiring ───────────────────────────────────
  Events.on('mode:exam-entered', ({ exam }) => {
    _setExamMode(true);
    Store.set('currentExamId', exam?.id || '');
    _examScores = {};
    // Hide practice toolbar, show exam toolbar
    const pb = document.getElementById('toolbar-practice');
    const eb = document.getElementById('toolbar-exam');
    if (pb) pb.style.display = 'none';
    if (eb) eb.style.display = '';
    _updateExamProgress();
  });

  Events.on('mode:practice-entered', () => {
    _setExamMode(false);
    Store.set('currentExamId', '');
    _examScores = {};
  });

  // After exam:submitted — restore practice UI
  Events.on('exam:submitted', ({ diemFinal, exam }) => {
    // ExamMode replaced document.body.innerHTML — need full page reload
    // to restore the SPA shell cleanly
    setTimeout(() => {
      if (confirm(`✅ Điểm thi: ${diemFinal}/10
Tải lại trang để về giao diện luyện tập?`)) {
        window.location.reload();
      }
    }, 2000);
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
    const exBar = document.getElementById('content-bar');
    if (exBar) exBar.style.display = '';

    // ── FIX: Đảm bảo workspace-view hiển thị đúng sau login ──────
    const wv = document.getElementById('workspace-view');
    if (wv && (!wv.style.display || wv.style.display === 'none')) {
      wv.style.display = 'flex';
    }

    // ── FIX: Mobile — init editor panel as active on first load ───
    if (window.innerWidth <= 768) {
      const edPanel  = document.getElementById('editor-panel');
      const outPanel = document.getElementById('output-panel');
      const grPanel  = document.getElementById('grade-panel');
      if (edPanel)  { edPanel.classList.add('mob-active');     edPanel.style.display  = ''; }
      if (outPanel) { outPanel.classList.remove('mob-active'); outPanel.style.display = 'none'; }
      if (grPanel)  { grPanel.classList.remove('mob-active');  grPanel.style.display  = 'none'; }
      const mnEditor = document.getElementById('mnav-editor');
      const mnOutput = document.getElementById('mnav-output');
      const mnGrade  = document.getElementById('mnav-grade');
      if (mnEditor) mnEditor.classList.add('on');
      if (mnOutput) mnOutput.classList.remove('on');
      if (mnGrade)  mnGrade.classList.remove('on');
    }

    Toast.success('Xin chào, ' + user.name + '!', 2500);
    CL.API.logAccess('login', user.role);
  });

  // ── Dropdown init ─────────────────────────────────────────────
  Dropdown.init();

  // ── Theme init ──────────────────────────────────────────────
  // Init immediately for early theme application
  CL.Features.Theme?.init();

  // ── Auth start ───────────────────────────────────────────────
  // Auth: fires after login OR valid session restore
  CL.Auth.UI.init(function onAuthReady(user) {
    document.documentElement.classList.remove('auth-required');
    document.body.classList.remove('auth-pending');
    const shell = document.getElementById('app-shell');
    if (shell) {
      shell.style.removeProperty('display');
      shell.style.removeProperty('visibility');
    }
    
    // ── FIX: Init sidebar khi page load lại (F5) ──────────────────
    // Sidebar cần được init khi auth ready, không chỉ khi login
    CL.Features.Sidebar?.init(user.role);
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
    // Update floating ex-desc bar (above workspace)
    const titleEl = document.getElementById('ex-desc-title');
    if (titleEl) titleEl.textContent = (exercise.num ? exercise.num + '. ' : '') + (exercise.title || '');
    const bodyEl = document.getElementById('ex-desc-body');
    if (bodyEl) bodyEl.innerHTML = exercise.desc || '';
    const gt = document.getElementById('ex-desc-grade-tag');
    if (gt) { gt.textContent = exercise.g || ''; gt.className = 'ex-tag ' + (exercise.g||'').toLowerCase(); }
    const ct = document.getElementById('ex-desc-chap-tag');
    if (ct) ct.textContent = exercise.ch || '';
    // Don't auto-show the floating desc bar — user opens via tab now
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
  window.cddClose  = ()   => {
    document.getElementById('cdd-overlay')?.classList.remove('show');
    document.getElementById('cdd-popup')?.classList.remove('show');
  };

  // ── Tab system (new v2) ──────────────────────────────────────
  window.rpTab = function(tab) {
    // Update content-bar tabs (desc, theory)
    document.querySelectorAll('#rp-tabbar .rp-tab').forEach(t => t.classList.remove('on'));
    // Update inner grade-panel tabs (result, analysis)
    document.querySelectorAll('.rp-inner-tab').forEach(t => t.classList.remove('on'));
    // Update all tabpanes
    document.querySelectorAll('.rp-tabpane').forEach(p => p.classList.remove('on'));

    const tabEl  = document.getElementById('rp-tab-' + tab);
    const paneEl = document.getElementById('rp-pane-' + tab);
    if (tabEl)  tabEl.classList.add('on');
    if (paneEl) paneEl.classList.add('on');
  };;

  // Backward compat
  window.rpToggle = window.rpExpand = function(section) {
    const map = { criteria:'desc', theory:'theory', results:'result' };
    window.rpTab(map[section] || section);
  };
  window.switchTab = (tab) => {
    const map = { criteria:'desc', theory:'theory', results:'result' };
    window.rpTab(map[tab] || tab);
  };
  window.closeDesc = () => document.getElementById('ex-desc')?.classList.remove('show');

  // ── Exam mode state ───────────────────────────────────────────
  let _isExamMode = false;
  let _examScores = {};  // { exId: score }

  function _setExamMode(active) {
    _isExamMode = active;
    const pb = document.getElementById('toolbar-practice');
    const eb = document.getElementById('toolbar-exam');
    const theoryTab = document.getElementById('rp-tab-theory');
    const submitBar = document.getElementById('exam-submit-bar');
    if (pb) pb.style.display = active ? 'none' : '';
    if (eb) eb.style.display = active ? '' : 'none';
    if (theoryTab) theoryTab.style.display = active ? 'none' : '';
    if (submitBar) submitBar.style.display = active ? '' : 'none';
    // If was on theory tab and entering exam, switch to desc
    if (active) window.rpTab('desc');
  }

  // ── Unified async grade entry point ──────────────────────────
  window.gradeCode = window.gradeHTML = window.gradeSQL = async function() {
    const type = Store.get('currentExType') || 'python';
    const exId = Store.get('currentExId');
    const user = Store.get('currentUser');
    if (!exId) { Toast.warn('Vui lòng chọn bài tập trước'); return; }

    // Show loading in result tab
    window.rpTab('result');
    const lr = document.getElementById('lr');
    if (lr) lr.innerHTML = `
      <div class="grade-loading">
        <div class="grade-loading-spinner"></div>
        <div class="grade-loading-msg">Đang chấm điểm...</div>
        <div class="grade-loading-sub">${type === 'python' ? 'Đang chạy Python...' : type === 'sql' ? 'Đang thực thi SQL...' : 'Đang kiểm tra HTML...'}</div>
      </div>`;

    try {
      let result;
      if (type === 'html') {
        result = CL.Graders.Html.grade(CL.Editors.Html.getCode(), exId);
      } else if (type === 'sql') {
        result = await CL.Graders.Sql.grade(CL.Editors.Sql.getCode(), exId);
      } else {
        const code   = document.getElementById('code-input')?.value || '';
        const output = document.getElementById('out')?.textContent || '';
        result = await CL.Graders.Python.grade(code, output, exId);
      }

      // Render results
      _renderGradeResult(result, type);

      // Save score
      if (user?.role === 'student') {
        if (_isExamMode) {
          _examScores[exId] = result.score;
          _updateExamProgress();
          // Don't submit yet — wait for examSubmitAll
        } else {
          // Practice mode: submit as practice score
          CL.API.submitPracticeScore(exId, result.exercise?.title || '', result.score);
          CL.API.logAccess('grade_practice', exId + ':' + result.score);
          _updatePracticeHistory(exId, result.score);
        }
      }

      // Show analysis tab badge if there are errors
      const hasFails = result.results?.some(r => !r.passed) || false;
      _renderAnalysis(result, type);
      // Analysis tab: show with fail count badge when there are errors
      const analysisTab = document.getElementById('rp-tab-analysis');
      const analysisBadge = document.getElementById('analysis-badge');
      if (analysisTab) {
        const failCount = result.results?.filter(r => !r.passed).length || 0;
        analysisTab.style.display = hasFails ? '' : 'none';
        if (analysisBadge) {
          analysisBadge.style.display = hasFails && failCount ? '' : 'none';
          analysisBadge.textContent = failCount || '';
        }
      }

    } catch(e) {
      Toast.error('❌ ' + e.message);
      if (lr) lr.innerHTML = `<div class="empty"><div class="empty-i">❌</div>${e.message}</div>`;
    }
  };

  // ── Rich editor integration ───────────────────────────────────
  window.openRichEditor = async function(field) {
    const exId = Store.get('currentExId');
    if (!exId) { Toast.warn('Chọn bài tập trước'); return; }

    const contentId = field === 'desc' ? 'desc-content' : 'theory-content';
    const paneId    = field === 'desc' ? 'rp-pane-desc' : 'rp-pane-theory';
    const el = document.getElementById(contentId);
    const currentHtml = el ? el.innerHTML : '';

    window.rpTab(field === 'desc' ? 'desc' : 'theory');

    if (!CL.Editors?.RichText) {
      Toast.error('Rich editor chưa tải'); return;
    }

    await CL.Editors.RichText.mount(contentId, currentHtml, async (html) => {
      // Save to server via API
      if (CL.API.isReady()) {
        try {
          await CL.API.saveExerciseContent(exId, field, html);
          Toast.success('✅ Đã lưu!');
        } catch(e) {
          Toast.error('Lỗi lưu: ' + e.message);
          throw e;
        }
      } else {
        // Offline: save to localStorage
        localStorage.setItem('cl_content_' + exId + '_' + field, html);
        Toast.info('💾 Đã lưu offline');
      }
    });
  };

  // ── Exam: submit all & show stats ─────────────────────────────
  window.examSubmitAll = async function() {
    const user = Store.get('currentUser');
    if (!user) return;

    const registry = CL.require('Exercises.Registry');
    const rows = Object.entries(_examScores).map(([exId, score]) => {
      const ex = registry.findById(exId);
      return { exId, title: ex?.title || exId, type: ex?.type || 'python', score };
    });

    if (!rows.length) { Toast.warn('Chưa có bài nào được chấm'); return; }

    // Submit all scores to server
    const kyKtId = Store.get('currentExamId') || '';
    for (const row of rows) {
      CL.API.submitScore(row.exId, row.title, row.score, 0, kyKtId);
    }
    CL.API.logAccess('exam_submit', kyKtId);

    // Show modal
    _showExamResultModal(rows);
  };

  function _showExamResultModal(rows) {
    const modal = document.getElementById('exam-result-modal');
    const body  = document.getElementById('exam-modal-body');
    const total = document.getElementById('exam-modal-total');
    if (!modal || !body) return;

    const sum = rows.reduce((s,r) => s + r.score, 0);
    const avg = rows.length ? Math.round(sum / rows.length * 10) / 10 : 0;

    const typeIcon = { python:'🐍', sql:'🗃', html:'🌐' };
    body.innerHTML = rows.map(row => {
      const cls = row.score >= 8 ? 'high' : row.score >= 5 ? 'mid' : 'low';
      const icon = row.score >= 8 ? '🏆' : row.score >= 5 ? '✅' : '❌';
      return `<div class="exam-result-row ${cls}">
        <div>
          <div class="err-title">${row.title}</div>
          <div class="err-type">${typeIcon[row.type]||'📝'} ${row.type.toUpperCase()}</div>
        </div>
        <div class="err-score ${cls}">${row.score}</div>
        <div class="err-badge">${icon}</div>
      </div>`;
    }).join('');

    if (total) total.innerHTML = `${avg} <small style="font-size:13px;color:var(--text3)">/ 10 (TB)</small>`;
    modal.style.display = 'flex';
  }

  function _updateExamProgress() {
    const el = document.getElementById('exam-prog-text');
    if (!el) return;
    const done = Object.keys(_examScores).length;
    el.textContent = done + ' bài đã chấm';
  }

  function _updatePracticeHistory(exId, score) {
    const key = 'cl_best_' + exId;
    const best = parseFloat(localStorage.getItem(key) || '0');
    if (score > best) localStorage.setItem(key, score);

    const bar = document.getElementById('practice-score-history');
    const bestEl = document.getElementById('psh-best');
    const curEl  = document.getElementById('psh-current');
    if (bar && bestEl && curEl) {
      bar.style.display = '';
      bestEl.textContent = Math.max(score, best).toFixed(1);
      curEl.textContent  = score.toFixed(1);
    }
  }

  window.toast = (msg, ms) => Toast.show(msg, 'info', ms);

  // ── Exam mode events ─────────────────────────────────────────

  // B1 FIX: Connect ModeManager → app grading context
  Events.on('mode:exam-entered', ({ exam }) => {
    _setExamMode(true);
    _examScores = {};                         // reset per-exam scores
    Store.set('currentExamId', exam?.id || '');
    // Hide theory tab during exam
    const theoryTab = document.getElementById('rp-tab-theory');
    if (theoryTab) theoryTab.style.display = 'none';
    // Show exam toolbar, hide practice toolbar
    const tb = document.getElementById('toolbar-practice');
    const te = document.getElementById('toolbar-exam');
    if (tb) tb.style.display = 'none';
    if (te) te.style.display = '';
    // Show exam submit bar
    const esb = document.getElementById('exam-submit-bar');
    if (esb) esb.style.display = '';
  });

  // B7 FIX: Restore UI after exam submit
  Events.on('exam:submitted', () => {
    _setExamMode(false);
    _examScores = {};
    Store.set('currentExamId', '');
    // ExamMode replaces body.innerHTML — page reload is cleanest restore
    setTimeout(() => window.location.reload(), 3500);
  });

  Events.on('mode:practice-entered', () => {
    _setExamMode(false);
    _examScores = {};
  });

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
    await window.gradeCode();
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

  // ── Render grade result in result tab ───────────────────────
  function _renderGradeResult(result, type) {
    const rv   = document.getElementById('rv');
    const sg   = document.getElementById('sg');
    const sp   = document.getElementById('sp');
    const sf   = document.getElementById('sf');
    const ss   = document.getElementById('ss');
    const lr   = document.getElementById('lr');
    const rf   = document.getElementById('ring-fill');

    const score = result.score ?? 0;
    if (rv) rv.textContent = score.toFixed(1);
    if (sg) {
      const grade = score >= 9 ? '🏆 Xuất sắc' : score >= 8 ? '✅ Giỏi' : score >= 6.5 ? '👍 Khá' : score >= 5 ? '⚠️ Trung bình' : '❌ Yếu';
      sg.textContent = grade;
      sg.style.color = score >= 8 ? 'var(--accent2)' : score >= 5 ? 'var(--warn)' : 'var(--error)';
    }

    const results = result.results || [];
    const passed  = results.filter(r => r.passed).length;
    const failed  = results.filter(r => !r.passed).length;
    const skipped = 0;
    if (sp) sp.textContent = passed;
    if (sf) sf.textContent = failed;
    if (ss) ss.textContent = skipped;

    // Ring animation
    if (rf) {
      const offset = 270 - (score / 10) * 270;
      rf.style.strokeDashoffset = offset;
      rf.style.stroke = score >= 8 ? 'var(--accent2)' : score >= 5 ? 'var(--warn)' : 'var(--error)';
    }

    // Detail rows
    if (lr) {
      if (!results.length) { lr.innerHTML = '<div class="empty"><div class="empty-i">📋</div>Không có tiêu chí nào</div>'; return; }

      if (result.mode === 'testcase') {
        lr.innerHTML = results.map((r, i) => `
          <div class="lr-item ${r.passed ? 'pass' : 'fail'}">
            <span class="lr-icon">${r.passed ? '✅' : '❌'}</span>
            <div class="lr-body">
              <div class="lr-desc">${r.desc || 'Test ' + (i+1)}</div>
              <div class="lr-pts">${r.earned}/${r.pts} điểm</div>
              ${!r.passed && r.error ? '<div class="lr-err">' + _esc(r.error.slice(0,80)) + '</div>' : ''}
            </div>
          </div>`).join('');
      } else if (result.mode === 'sql-real') {
        lr.innerHTML = results.map(r => `
          <div class="lr-item ${r.passed ? 'pass' : 'fail'}">
            <span class="lr-icon">${r.passed ? '✅' : '❌'}</span>
            <div class="lr-body">
              <div class="lr-desc">${r.desc}</div>
              <div class="lr-pts">${r.earned}/${r.pts} điểm</div>
            </div>
          </div>`).join('');
      } else {
        lr.innerHTML = results.map(r => `
          <div class="lr-item ${r.passed ? 'pass' : 'fail'}">
            <span class="lr-icon">${r.passed ? '✅' : '❌'}</span>
            <div class="lr-body">
              <div class="lr-desc">${r.desc || r.mo_ta || ''}</div>
              <div class="lr-pts">${r.earned}/${r.pts || r.diem || 0} điểm</div>
            </div>
          </div>`).join('');
      }

      // Show solution if score low
      if (result.showSolution && result.exercise?.solution) {
        lr.innerHTML += `
          <div style="margin-top:12px;padding:10px 12px;background:rgba(79,158,255,.08);border:1px solid rgba(79,158,255,.2);border-radius:8px">
            <div style="font-size:11px;font-weight:700;color:var(--accent);margin-bottom:6px">💡 Gợi ý đáp án</div>
            <pre style="font-family:var(--mono);font-size:12px;color:var(--editor-fg,#d4d4d4);overflow-x:auto;white-space:pre-wrap">${_esc(result.exercise.solution)}</pre>
          </div>`;
      }
    }
  }

  function _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Render analysis tab ───────────────────────────────────────
  function _renderAnalysis(result, type) {
    const body = document.getElementById('analysis-body');
    const sub  = document.getElementById('analysis-subtitle');
    const sqlDiff = document.getElementById('sql-diff');
    if (!body) return;

    const fails = (result.results || []).filter(r => !r.passed);
    if (sub) sub.textContent = fails.length + ' vấn đề cần chú ý';

    // SQL: show table diff
    if (type === 'sql' && result.mode === 'sql-real' && sqlDiff) {
      sqlDiff.style.display = '';
      document.getElementById('sql-expected-table').innerHTML = _renderSqlTable(result.expectedColumns, result.expectedRows);
      document.getElementById('sql-actual-table').innerHTML   = _renderSqlTable(result.studentColumns,  result.studentRows);
    } else if (sqlDiff) { sqlDiff.style.display = 'none'; }

    if (!fails.length) {
      body.innerHTML = '<div class="empty"><div class="empty-i">🎉</div>Tất cả tiêu chí đều đạt!</div>';
      return;
    }

    body.innerHTML = fails.map(r => {
      let extra = '';
      if (r.input !== undefined) {
        extra = `<div class="analysis-io">
          <div><span class="aio-label">Input:</span> ${_esc(r.input || '(không có)')}</div>
          <div><span class="aio-label">Mong đợi:</span> <span class="aio-expected">${_esc(r.expected || '')}</span></div>
          <div><span class="aio-label">Nhận được:</span> <span class="aio-actual">${_esc(r.actual || r.error || '')}</span></div>
        </div>`;
      } else if (r.errorDetail) {
        extra = `<div class="analysis-hint">💡 ${_esc(r.errorDetail)}</div>`;
      }
      return `<div class="analysis-item fail">
        <span class="analysis-icon">❌</span>
        <div class="analysis-content">
          <div class="analysis-desc">${r.desc || r.mo_ta || ''}</div>
          <div class="analysis-pts">0/${r.pts || r.diem || 0} điểm</div>
          ${extra}
          ${r.hint ? '<div class="analysis-hint">💡 ' + _esc(r.hint) + '</div>' : ''}
        </div>
      </div>`;
    }).join('');
  }

  function _renderSqlTable(columns, rows) {
    if (!columns || !columns.length) return '<div style="padding:8px;color:var(--text3);font-size:12px">(trống)</div>';
    const esc = s => String(s===null?'NULL':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<table class="sql-result-table">
      <thead><tr>${columns.map(c => '<th>'+esc(c)+'</th>').join('')}</tr></thead>
      <tbody>${(rows||[]).slice(0,50).map(row =>
        '<tr>' + (row||[]).map(v => '<td>'+esc(v)+'</td>').join('') + '</tr>'
      ).join('')}</tbody>
    </table>` + (rows.length > 50 ? '<div style="font-size:11px;color:var(--text3);padding:4px">...và ' + (rows.length-50) + ' dòng khác</div>' : '');
  }

  // ── Exercise selected: update desc/theory content ─────────────
  Events.on('exercise:selected', ({ exercise }) => {
    // Update desc tab — include rubric/error hints under desc
    const descEl = document.getElementById('desc-content');
    if (descEl) {
      let html = exercise.desc || '';
      // Add rubric display below desc
      if ((exercise.rb||[]).length) {
        html += `<div class="ex-rubric-box">
          <div class="ex-rub-title">📋 Tiêu chí chấm điểm</div>
          ${exercise.rb.map(rb=>`<div class="ex-rub-item">
            <span class="ex-rub-desc">${rb.desc||rb.mo_ta||''}</span>
            <span class="ex-rub-pts">${rb.pts||rb.diem||0}đ</span>
          </div>`).join('')}
        </div>`;
      }
      // Add common errors
      if ((exercise.errors||[]).length) {
        html += `<div class="ex-errors-box">
          <div class="ex-err-title">⚠️ Lỗi hay gặp</div>
          <ul>${exercise.errors.map(e=>'<li>'+e+'</li>').join('')}</ul>
        </div>`;
      }
      descEl.innerHTML = html || '<div class="criteria-empty"><div class="ci-icon">📚</div><div>Chọn bài tập để xem đề bài.</div></div>';
    }
    // Update theory tab
    const theoryEl = document.getElementById('theory-content');
    if (theoryEl) {
      theoryEl.innerHTML = exercise.theory || '<div class="theory-empty"><div class="ci-icon">📖</div><div>Không có lý thuyết.</div></div>';
    }
    // Update desc edit bar title
    const titleEl = document.getElementById('desc-ex-title');
    if (titleEl) titleEl.textContent = (exercise.num ? exercise.num + '. ' : '') + (exercise.title || '');
    // Switch to desc tab when exercise selected
    window.rpTab('desc');
    // Render math formulas in desc and theory content (non-blocking)
    setTimeout(() => {
      CL.Editors?.RichText?.renderMath(descEl);
      CL.Editors?.RichText?.renderMath(theoryEl);
    }, 100);
    // Reset analysis tab
    const analysisTab = document.getElementById('rp-tab-analysis');
    if (analysisTab) analysisTab.style.display = 'none';
    // Reset practice history
    const bar = document.getElementById('practice-score-history');
    if (bar) {
      const best = parseFloat(localStorage.getItem('cl_best_' + exercise.id) || '0');
      if (best > 0) {
        bar.style.display = '';
        const bestEl = document.getElementById('psh-best');
        if (bestEl) bestEl.textContent = best.toFixed(1);
        const curEl  = document.getElementById('psh-current');
        if (curEl)  curEl.textContent  = '—';
      } else {
        bar.style.display = 'none';
      }
    }
    // Load offline override if any
    const offlineDesc   = localStorage.getItem('cl_content_' + exercise.id + '_desc');
    const offlineTheory = localStorage.getItem('cl_content_' + exercise.id + '_theory');
    if (offlineDesc   && descEl)   descEl.innerHTML   = offlineDesc;
    if (offlineTheory && theoryEl) theoryEl.innerHTML = offlineTheory;
  });


  // ── lsSwitch: landscape mode output/grade panel switcher ──────
  // ── mobilePanel: chuyển panel trên mobile ────────────────────
  window.mobilePanel = function(panel) {
    const panels = {
      editor: document.getElementById('editor-panel'),
      output: document.getElementById('output-panel'),
      grade:  document.getElementById('grade-panel'),
    };
    const btns = {
      editor: document.getElementById('mnav-editor'),
      output: document.getElementById('mnav-output'),
      grade:  document.getElementById('mnav-grade'),
    };
    // Show selected panel, hide others
    Object.entries(panels).forEach(([name, el]) => {
      if (!el) return;
      el.classList.toggle('mob-active', name === panel);
      el.style.display = (name === panel) ? '' : 'none';
    });
    // Update nav button states
    Object.entries(btns).forEach(([name, btn]) => {
      if (btn) btn.classList.toggle('on', name === panel);
    });
  };

  window.lsSwitch = function(panel) {
    const outPanel   = document.getElementById('output-panel');
    const gradePanel = document.getElementById('grade-panel');
    const btnOut     = document.getElementById('ls-btn-out');
    const btnGrade   = document.getElementById('ls-btn-grade');

    if (panel === 'output') {
      if (outPanel)   { outPanel.classList.remove('ls-hidden');  outPanel.style.display = ''; }
      if (gradePanel) { gradePanel.classList.remove('ls-visible'); gradePanel.style.display = 'none'; }
      btnOut?.classList.add('on'); btnGrade?.classList.remove('on');
    } else {
      if (outPanel)   { outPanel.classList.add('ls-hidden');    outPanel.style.display = 'none'; }
      if (gradePanel) { gradePanel.classList.add('ls-visible'); gradePanel.style.display = ''; }
      btnOut?.classList.remove('on'); btnGrade?.classList.add('on');
    }
  };

  // ── mobileRunGrade: mobile bottom nav run+grade button ────────
  window.mobileRunGrade = async function() {
    await window.runCode();
    await window.gradeCode();
  };

})();
