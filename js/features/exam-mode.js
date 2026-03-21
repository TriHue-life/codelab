/**
 * features/exam-mode.js — Chế độ Thi/Kiểm tra
 * ═══════════════════════════════════════════════════════════════
 * Tuân thủ chuẩn thi quốc tế:
 *   - 1 lần nộp duy nhất (hoặc theo cấu hình)
 *   - Chống chuyển tab, DevTools, refresh
 *   - Timer đếm ngược chính xác
 *   - Xáo đề ngẫu nhiên theo bloom levels
 *   - Lưu tiến trình tự động
 *   - Xuất PDF minh chứng sau khi nộp
 *
 * Events phát ra:
 *   'exam:started'        { exam, questions }
 *   'exam:question-nav'   { index, question }
 *   'exam:question-saved' { baiId, code }
 *   'exam:submitted'      { result }
 *   'exam:time-warning'   { remaining }
 *   'exam:time-up'        {}
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, features/anti-cheat.js, graders/*
 */

'use strict';

CL.define('Features.ExamMode', () => {

  const cfg      = CL.require('Config');
  const Utils    = CL.require('Utils');
  const Events   = CL.require('Events');
  const Store    = CL.require('Store');
  const Session  = CL.require('Auth.Session');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  // ── Session state ─────────────────────────────────────────────
  let _exam      = null;      // Exam metadata
  let _questions = [];        // Ordered question list for this student
  let _answers   = {};        // { baiId: { code, diem, tg, ts } }
  let _curIdx    = 0;         // Current question index
  let _startTs   = 0;         // Unix timestamp when exam started
  let _timerIv   = null;      // Countdown interval
  let _submitted = false;
  let _locked    = false;

  // ── ENTRY: Start exam from banner/code ────────────────────────

  /**
   * Mở giao diện nhập mã thi hoặc trực tiếp bắt đầu
   * @param {Object} exam - Exam object từ API.getExams()
   */
  async function start(exam) {
    if (_submitted) return;

    // Kiểm tra mã vào phòng thi (nếu có)
    if (exam.mat_khau) {
      const entered = prompt(`🔐 Nhập mã vào phòng thi "${exam.ten}":`);
      if (entered?.trim() !== exam.mat_khau) {
        Toast.error('❌ Mã không đúng'); return;
      }
    }

    _exam = exam;
    _questions = _buildQuestionList(exam);
    _answers   = _restoreProgress(exam.id) || {};
    _curIdx    = 0;
    _startTs   = Date.now();
    _submitted = false;
    _locked    = false;

    // Fullscreen
    _requestFullscreen();

    // Anti-cheat: strict mode
    _enableStrictAntiCheat();

    // Render UI
    _renderExamUI();

    // Start timer
    if (exam.thoi_gian_phut > 0) _startTimer(exam.thoi_gian_phut * 60);

    // Navigate to first question
    _navTo(0);

    Events.emit('exam:started', { exam, questions: _questions });
    CL.API.logAccess('exam_start', exam.id);
  }

  // ── Question selection / shuffling ────────────────────────────

  function _buildQuestionList(exam) {
    // ── NEW: groups model ─────────────────────────────────────
    if (Array.isArray(exam.groups) && exam.groups.length) {
      const all = [];
      exam.groups.forEach(g => {
        const pool = (g.question_ids || [])
          .map(id => Registry.findById(id))
          .filter(Boolean)
          .map(ex => ({
            ...ex,
            _weight:     parseFloat(g.points_each) || 1.0,
            _group:      g.name || '',
            _group_id:   g.id   || '',
          }));
        const pick = Math.min(parseInt(g.pick_count) || pool.length, pool.length);
        const picked = pick < pool.length ? _shuffle(pool).slice(0, pick) : [...pool];
        all.push(...picked);
      });
      return exam.che_do_tron_de ? _shuffle(all) : all;
    }

    // ── LEGACY: flat bai_tap_detail ───────────────────────────
    const pool = exam.bai_tap_detail || [];

    if (!pool.length) {
      const ids = exam.bai_tap || [];
      const exs = ids.map(id => Registry.findById(id)).filter(Boolean);
      return exam.che_do_tron_de ? _shuffle(exs) : exs;
    }

    let selected = [];
    const bf = exam.bloom_filter;
    const bloomObj = typeof bf === 'string' ? (() => { try { return JSON.parse(bf); } catch { return null; } })() : bf;

    if (bloomObj && typeof bloomObj === 'object' && Object.keys(bloomObj).length) {
      const bloomGroups = {};
      for (const item of pool) {
        const lv = item.bloom_level || _inferBloom(item.bai_id);
        if (!bloomGroups[lv]) bloomGroups[lv] = [];
        bloomGroups[lv].push(item);
      }
      for (const [lv, count] of Object.entries(bloomObj)) {
        const picks = _shuffle(bloomGroups[lv] || []).slice(0, parseInt(count));
        selected.push(...picks);
      }
    } else if (exam.so_bai_random > 0) {
      selected = _shuffle([...pool]).slice(0, exam.so_bai_random);
    } else {
      selected = [...pool];
    }

    if (exam.che_do_tron_de) selected = _shuffle(selected);

    return selected.map(item => {
      const ex = Registry.findById(item.bai_id);
      if (!ex) return null;
      return { ...ex, _weight: item.diem_co_phan || 1.0, _group: item.nhom || '' };
    }).filter(Boolean);
  }

  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function _inferBloom(baiId) {
    // Extract bloom level from ID pattern: *-b1-*, *-b2-*, ...
    const m = (baiId || '').match(/-b([1-6])-/);
    return m ? 'b' + m[1] : 'b3';
  }

  // ── Render exam UI ────────────────────────────────────────────

  function _renderExamUI() {
    const q  = _questions;
    const ex = _exam;

    document.body.innerHTML = `
      <div id="exam-wrapper" class="exam-wrapper">
        <!-- HEADER BAR -->
        <header class="exam-header">
          <div class="exam-header-left">
            <div class="exam-title">📋 ${Utils.escHtml(ex.ten)}</div>
            <div class="exam-meta">
              <span class="exam-student">${Utils.escHtml(Session.get()?.name || '')}</span>
              <span class="exam-lop">${Utils.escHtml(Session.get()?.lop || '')}</span>
            </div>
          </div>
          <div class="exam-header-center">
            <div class="exam-timer-wrap">
              <div class="exam-timer" id="exam-timer">--:--</div>
              <div class="exam-timer-label">Thời gian còn lại</div>
            </div>
          </div>
          <div class="exam-header-right">
            <div class="exam-progress">
              <span id="exam-done-count">0</span>/${q.length} câu
            </div>
            <button class="exam-submit-btn" onclick="CL.Features.ExamMode.confirmSubmit()">
              📤 Nộp bài
            </button>
          </div>
        </header>

        <!-- BODY: question nav + workspace -->
        <div class="exam-body">
          <!-- LEFT: Question navigator -->
          <div class="exam-nav">
            <div class="exam-nav-title">Danh sách câu hỏi</div>
            <div class="exam-nav-grid" id="exam-nav-grid">
              ${q.map((e, i) => `
                <div class="exam-nav-cell" id="nav-cell-${i}"
                     data-idx="${i}" data-bloom="${(e.lv||'').split('–')[0].trim()}"
                     onclick="CL.Features.ExamMode.navTo(${i})"
                     title="${Utils.escHtml(e.num+' '+e.title)}">
                  ${i + 1}
                </div>`).join('')}
            </div>
            <div class="exam-nav-legend">
              <span class="enc-dot answered"></span> Đã làm
              <span class="enc-dot current"></span> Hiện tại
              <span class="enc-dot"></span> Chưa làm
            </div>
          </div>

          <!-- RIGHT: Question workspace -->
          <div class="exam-workspace" id="exam-workspace">
            <!-- filled by _navTo() -->
          </div>
        </div>

        <!-- SUBMIT OVERLAY -->
        <div class="exam-submit-overlay" id="exam-submit-overlay" style="display:none">
          <div class="eso-card">
            <div class="eso-icon">📊</div>
            <div class="eso-title" id="eso-title">Đang chấm bài...</div>
            <div class="eso-progress">
              <div class="eso-bar" id="eso-bar" style="width:0%"></div>
            </div>
            <div class="eso-result" id="eso-result"></div>
            <button class="eso-pdf-btn" id="eso-pdf-btn" style="display:none"
              onclick="CL.Features.ExamMode.downloadPdf()">
              📄 Tải minh chứng PDF
            </button>
          </div>
        </div>

        <!-- ANTI-CHEAT OVERLAY -->
        <div class="exam-anticheat-overlay" id="exam-ac-overlay" style="display:none">
          <div class="eac-card">
            <div class="eac-icon" id="eac-icon">⚠️</div>
            <div class="eac-title" id="eac-title">Cảnh báo</div>
            <div class="eac-msg"  id="eac-msg"></div>
            <button class="eac-btn" id="eac-btn">Trở lại làm bài</button>
          </div>
        </div>
      </div>`;
  }

  // ── Navigation ────────────────────────────────────────────────

  function navTo(idx) {
    if (idx < 0 || idx >= _questions.length) return;

    // Auto-save current question's code before navigating away
    _saveCurrentAnswer();

    _curIdx = idx;
    const exercise = _questions[idx];
    const saved    = _answers[exercise.id];

    // Update nav grid
    document.querySelectorAll('.exam-nav-cell').forEach(cell => {
      const i = parseInt(cell.dataset.idx);
      cell.className = 'exam-nav-cell' +
        (i === idx ? ' current' : _answers[_questions[i]?.id] ? ' answered' : '');
    });

    // Render question area
    const ws = document.getElementById('exam-workspace');
    if (!ws) return;

    ws.innerHTML = `
      <div class="eq-header">
        <div class="eq-num">Câu ${idx + 1}/${_questions.length}</div>
        <div class="eq-lv"><span class="bloom-badge bloom-${_inferBloom(exercise.id)}">${exercise.lv}</span></div>
        <div class="eq-title">${Utils.escHtml(exercise.num + ' — ' + exercise.title)}</div>
        ${exercise._weight !== 1.0 ? `<div class="eq-weight">Hệ số: ×${exercise._weight}</div>` : ''}
      </div>

      <div class="eq-desc">${exercise.desc || ''}</div>

      ${exercise.theory ? `
        <details class="eq-theory">
          <summary>📖 Lý thuyết tham khảo</summary>
          <div>${exercise.theory}</div>
        </details>` : ''}

      <div class="eq-editor" id="eq-editor">
        ${_renderEditor(exercise, saved?.code)}
      </div>

      <div class="eq-actions">
        <button class="eq-btn-prev" onclick="CL.Features.ExamMode.navTo(${idx - 1})"
          ${idx === 0 ? 'disabled' : ''}>← Câu trước</button>

        ${!_exam.toan_ven_1_lan || !saved?.da_nop
          ? `<button class="eq-btn-submit" onclick="CL.Features.ExamMode.submitQuestion(${idx})">
               ✅ Nộp câu ${idx + 1}
             </button>`
          : `<div class="eq-submitted-badge">✅ Đã nộp</div>`}

        <button class="eq-btn-next" onclick="CL.Features.ExamMode.navTo(${idx + 1})"
          ${idx === _questions.length - 1 ? 'disabled' : ''}>Câu tiếp →</button>
      </div>`;

    Events.emit('exam:question-nav', { index: idx, question: exercise });
  }

  function _renderEditor(exercise, savedCode) {
    const type    = exercise.type || 'python';
    const starter = savedCode || _starterCode(exercise);
    const lines   = starter.split('\n').length;
    const h       = Math.max(120, Math.min(400, lines * 20));

    if (type === 'python') return `
      <div class="eq-editor-label">💻 Python Editor</div>
      <textarea id="eq-code-input" class="eq-code-area" style="height:${h}px"
        spellcheck="false" autocomplete="off"
        onkeydown="CL.Features.ExamMode.handleEditorKey(event)"
        onpaste="CL.Features.ExamMode.onPaste(event)">${Utils.escHtml(starter)}</textarea>
      <div class="eq-run-bar">
        <button class="eq-run-btn" onclick="CL.Features.ExamMode.runCode()">▶ Chạy thử</button>
        <span class="eq-run-note">⚠️ Chạy thử không ảnh hưởng điểm</span>
      </div>
      <div id="eq-output" class="eq-output"></div>`;

    if (type === 'html') return `
      <div class="eq-editor-label">🌐 HTML/CSS Editor</div>
      <textarea id="eq-code-input" class="eq-code-area" style="height:${h}px"
        spellcheck="false" autocomplete="off"
        onkeydown="CL.Features.ExamMode.handleEditorKey(event)"
        onpaste="CL.Features.ExamMode.onPaste(event)"
        oninput="CL.Features.ExamMode.scheduleHtmlPreview()">${Utils.escHtml(starter)}</textarea>
      <div class="eq-preview-label">👁 Preview</div>
      <iframe id="eq-html-preview" sandbox="allow-same-origin allow-scripts"
        style="width:100%;height:200px;border:1px solid var(--border);border-radius:6px;background:#fff"></iframe>`;

    if (type === 'sql') return `
      <div class="eq-editor-label">🗃 SQL Editor</div>
      <textarea id="eq-code-input" class="eq-code-area" style="height:${h}px"
        spellcheck="false" autocomplete="off"
        onkeydown="CL.Features.ExamMode.handleEditorKey(event)"
        onpaste="CL.Features.ExamMode.onPaste(event)">${Utils.escHtml(starter)}</textarea>
      <button class="eq-run-btn" onclick="CL.Features.ExamMode.runSQL()">▶ Chạy SQL</button>
      <div id="eq-output" class="eq-output"></div>`;

    return `<div class="eq-editor-label">Editor không hỗ trợ type: ${type}</div>`;
  }

  function _starterCode(ex) {
    const t = ex.type || 'python';
    if (t === 'html') return `<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <title>Bài làm</title>\n</head>\n<body>\n  <!-- Viết code tại đây -->\n</body>\n</html>`;
    if (t === 'sql')  return '-- Viết SQL tại đây\nSELECT ';
    return '# Viết code Python tại đây\n';
  }

  // ── Editor helpers ────────────────────────────────────────────

  function handleEditorKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target, s = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 4;
    }
  }

  function onPaste(e) {
    // Log paste event for anti-cheat record
    CL.API.logAccess('exam_paste', `${_exam?.id}:q${_curIdx}`);
  }

  let _htmlPreviewTimer = null;
  function scheduleHtmlPreview() {
    clearTimeout(_htmlPreviewTimer);
    _htmlPreviewTimer = setTimeout(() => {
      const ta = document.getElementById('eq-code-input');
      const fr = document.getElementById('eq-html-preview');
      if (!ta || !fr) return;
      try { const d = fr.contentDocument; d.open(); d.write(ta.value); d.close(); }
      catch { fr.srcdoc = ta.value; }
    }, 500);
  }

  async function runCode() {
    const ta = document.getElementById('eq-code-input');
    const out = document.getElementById('eq-output');
    if (!ta || !out) return;
    out.textContent = '⏳ Đang chạy...';
    try {
      const result = await runPython(ta.value);
      out.textContent = result;
    } catch (e) {
      out.textContent = '❌ ' + e.message;
    }
  }

  // ── Save answer ───────────────────────────────────────────────

  function _saveCurrentAnswer() {
    if (_curIdx < 0 || _curIdx >= _questions.length) return;
    const exercise = _questions[_curIdx];
    const ta       = document.getElementById('eq-code-input');
    if (!ta) return;
    const code = ta.value;
    if (!_answers[exercise.id]) _answers[exercise.id] = {};
    _answers[exercise.id].code = code;
    _answers[exercise.id].ts   = Date.now();
    _saveProgress(_exam.id, _answers);
    Events.emit('exam:question-saved', { baiId: exercise.id, code });
  }

  function _saveProgress(examId, answers) {
    try { localStorage.setItem('cl_exam_progress_' + examId, JSON.stringify(answers)); } catch {}
  }

  function _restoreProgress(examId) {
    try { return JSON.parse(localStorage.getItem('cl_exam_progress_' + examId)) || {}; } catch { return {}; }
  }

  // ── Submit single question ────────────────────────────────────

  async function submitQuestion(idx) {
    const exercise = _questions[idx];
    if (!exercise) return;

    // Nếu toan_ven_1_lan và đã nộp → block
    if (_exam.toan_ven_1_lan && _answers[exercise.id]?.da_nop) {
      Toast.warn('⚠️ Bài này đã nộp, không thể sửa'); return;
    }

    const ta   = document.getElementById('eq-code-input');
    const code = ta?.value || _answers[exercise.id]?.code || '';
    if (!code.trim()) { Toast.warn('⚠️ Vui lòng viết code trước khi nộp'); return; }

    const t0 = _answers[exercise.id]?.t0 || _startTs;
    const tg = Math.round((Date.now() - t0) / 1000);

    // Grade
    let gradeResult;
    try {
      if      (exercise.type === 'html') gradeResult = CL.Graders.Html.grade(code, exercise.id);
      else if (exercise.type === 'sql')  gradeResult = CL.Graders.Sql.grade(code, exercise.id);
      else {
        const output = document.getElementById('eq-output')?.textContent || '';
        gradeResult = CL.Graders.Python.grade(code, output, exercise.id);
      }
    } catch(e) { Toast.error('❌ ' + e.message); return; }

    const weighted = Math.round(gradeResult.score * (exercise._weight || 1) * 10) / 10;

    _answers[exercise.id] = {
      code, diem: gradeResult.score, diem_weighted: weighted,
      tg, ts: Date.now(), da_nop: true,
      results: gradeResult.results,
    };
    _saveProgress(_exam.id, _answers);

    // Save to server
    CL.API.submitBaiLam({
      ky_id:  _exam.id,
      bai_id: exercise.id,
      tieu_de: exercise.title,
      diem:   gradeResult.score,
      code_snap: code.substring(0, 1000),
      tg_lam_giay: tg,
      type:   exercise.type || 'python',
      da_nop: true,
    });

    // Update nav cell
    const cell = document.getElementById(`nav-cell-${idx}`);
    if (cell) cell.classList.add('answered');

    // Update done count
    const done = Object.values(_answers).filter(a => a.da_nop).length;
    const el   = document.getElementById('exam-done-count');
    if (el) el.textContent = done;

    // Show inline result
    const editArea = document.getElementById('eq-editor');
    if (editArea) {
      const color = gradeResult.score >= 8 ? '#4ade80' : gradeResult.score >= 5 ? '#facc15' : '#f87171';
      editArea.insertAdjacentHTML('beforeend', `
        <div class="eq-grade-result" style="border-color:${color}">
          <div style="font-size:20px;font-weight:800;color:${color}">${gradeResult.score}/10</div>
          <div style="font-size:12px;color:var(--text2)">${gradeResult.earned}/${gradeResult.total} điểm</div>
          ${_exam.cho_xem_dap_an && gradeResult.exercise?.solution
            ? `<details style="margin-top:8px"><summary style="cursor:pointer;font-size:12px">💡 Xem gợi ý đáp án</summary>
               <pre style="font-size:11px;margin:4px 0 0">${Utils.escHtml(gradeResult.exercise.solution)}</pre></details>`
            : ''}
        </div>`);
    }

    // Lock editor if toan_ven_1_lan
    if (_exam.toan_ven_1_lan && ta) {
      ta.readOnly = true;
      ta.style.opacity = '0.7';
    }

    // Auto move to next
    if (idx < _questions.length - 1) {
      setTimeout(() => navTo(idx + 1), 1500);
    } else {
      Toast.success('✅ Đã nộp câu cuối! Nhấn "Nộp bài" để hoàn tất.');
    }
  }

  // ── Submit all (final) ────────────────────────────────────────

  async function confirmSubmit() {
    const unanswered = _questions.filter(q => !_answers[q.id]?.da_nop).length;
    const msg = unanswered > 0
      ? `Còn ${unanswered} câu chưa nộp. Bạn có chắc muốn kết thúc bài thi?`
      : 'Xác nhận nộp toàn bộ bài thi?';
    if (!await Toast.confirm(msg)) return;
    await _submitAll();
  }

  async function _submitAll() {
    if (_submitted) return;
    _submitted = true;
    _stopTimer();
    _saveCurrentAnswer(); // save last editor state

    const overlay  = document.getElementById('exam-submit-overlay');
    const titleEl  = document.getElementById('eso-title');
    const barEl    = document.getElementById('eso-bar');
    const resultEl = document.getElementById('eso-result');
    if (overlay) overlay.style.display = 'flex';

    let scored = 0, totalDiem = 0, countAnswered = 0;

    // Grade all unanswered questions
    for (let i = 0; i < _questions.length; i++) {
      const exercise = _questions[i];
      const ans      = _answers[exercise.id];
      const pct      = Math.round((i + 1) / _questions.length * 100);
      if (barEl) barEl.style.width = pct + '%';
      if (titleEl) titleEl.textContent = `Đang chấm câu ${i + 1}/${_questions.length}...`;

      if (!ans?.code || ans.code.trim() === '') {
        // No answer → 0 điểm
        _answers[exercise.id] = { ...(_answers[exercise.id]||{}), diem: 0, diem_weighted: 0, da_nop: true };
        continue;
      }

      if (!ans.da_nop) {
        // Grade now
        try {
          let gr;
          if      (exercise.type === 'html') gr = CL.Graders.Html.grade(ans.code, exercise.id);
          else if (exercise.type === 'sql')  gr = CL.Graders.Sql.grade(ans.code, exercise.id);
          else                               gr = CL.Graders.Python.grade(ans.code, '', exercise.id);
          _answers[exercise.id].diem          = gr.score;
          _answers[exercise.id].diem_weighted = Math.round(gr.score * (exercise._weight||1) * 10) / 10;
          _answers[exercise.id].results       = gr.results;
          _answers[exercise.id].da_nop        = true;
        } catch { _answers[exercise.id].diem = 0; }
      }

      if (_answers[exercise.id]?.diem !== undefined) {
        totalDiem += _answers[exercise.id].diem_weighted || _answers[exercise.id].diem || 0;
        countAnswered++;
      }
      scored++;
    }

    // Calculate final score: sum of weighted scores / total weight → scale to 10
    const totalWeight = _questions.reduce((s, q) => s + (q._weight || 1), 0) || 1;
    // Each question raw score is 0–10; weighted score = raw * weight
    const rawWeighted = _questions.reduce((s, q) => {
      const a = _answers[q.id];
      return s + (a?.diem || 0) * (q._weight || 1);
    }, 0);
    // Final = sum(raw_i * w_i) / sum(w_i), scaled to 10
    const diemFinal = Math.min(10, Math.round(rawWeighted / totalWeight * 10) / 10);

    const tgTong = Math.round((Date.now() - _startTs) / 1000);

    // Save BaiKT to server
    const baiKtId = await CL.API.submitBaiKT({
      ky_id:         _exam.id,
      ten_ky:        _exam.ten,
      diem_tong:     diemFinal,
      so_bai:        _questions.length,
      da_hoan_thanh: countAnswered,
      tg_tong_giay:  tgTong,
      answers:       _answers,
    });

    // Generate PDF proof
    if (titleEl) titleEl.textContent = '📄 Đang tạo minh chứng PDF...';
    const pdfData = await _generatePdfProof(diemFinal, tgTong, baiKtId);

    // Show results
    if (titleEl) titleEl.textContent = '✅ Nộp bài thành công!';
    if (resultEl) {
      const color = diemFinal >= 8 ? '#4ade80' : diemFinal >= 5 ? '#facc15' : '#f87171';
      resultEl.innerHTML = `
        <div class="eso-score" style="color:${color}">${diemFinal}<span>/10</span></div>
        <div class="eso-detail">
          ${countAnswered}/${_questions.length} câu đã làm ·
          ${Math.floor(tgTong/60)}:${String(tgTong%60).padStart(2,'0')} phút
        </div>
        <div class="eso-breakdown">
          ${_questions.map((q, i) => {
            const a = _answers[q.id];
            const d = a?.diem ?? '—';
            const c = parseFloat(d) >= 8 ? '#4ade80' : parseFloat(d) >= 5 ? '#facc15' : '#f87171';
            return `<div class="esob-item">
              <span>Câu ${i+1}</span>
              <span class="bloom-badge bloom-${_inferBloom(q.id)}" style="font-size:9px">${q.lv?.split('–')[0]?.trim()}</span>
              <span style="color:${c};font-weight:700">${d}/10</span>
            </div>`;
          }).join('')}
        </div>`;
    }

    Store.set('_lastPdfData', pdfData);
    const pdfBtn = document.getElementById('eso-pdf-btn');
    if (pdfBtn) pdfBtn.style.display = 'block';

    // Clear progress cache
    try { localStorage.removeItem('cl_exam_progress_' + _exam.id); } catch {}

    Events.emit('exam:submitted', { diemFinal, exam: _exam });
    CL.API.logAccess('exam_submit', `${_exam.id}:${diemFinal}`);
  }

  // ── Timer ─────────────────────────────────────────────────────

  function _startTimer(totalSecs) {
    let remaining = totalSecs;
    const timerEl = document.getElementById('exam-timer');

    _timerIv = setInterval(() => {
      remaining--;
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      if (timerEl) {
        timerEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
        timerEl.className   = 'exam-timer' + (remaining <= 300 ? ' warn' : '') + (remaining <= 60 ? ' danger' : '');
      }
      if (remaining === 300) {
        Events.emit('exam:time-warning', { remaining: 300 });
        Toast.warn('⏱ Còn 5 phút!', 6000);
      }
      if (remaining === 60) {
        Events.emit('exam:time-warning', { remaining: 60 });
        Toast.error('⏱ Còn 1 phút! Hãy nộp bài!', 10000);
      }
      if (remaining <= 0) {
        _stopTimer();
        Events.emit('exam:time-up', {});
        Toast.error('⏰ Hết giờ! Đang nộp bài tự động...', 5000);
        setTimeout(() => _submitAll(), 1000);
      }
    }, 1000);
  }

  function _stopTimer() {
    clearInterval(_timerIv);
    _timerIv = null;
  }

  // ── Anti-cheat (strict exam mode) ────────────────────────────

  let _acViolations = 0;

  function _enableStrictAntiCheat() {
    // Fullscreen exit detection
    document.addEventListener('fullscreenchange', _onFullscreenChange);
    // Tab/window visibility
    document.addEventListener('visibilitychange', _onVisibilityChange);
    // Disable ALL keyboard shortcuts
    document.addEventListener('keydown', _strictKeydown, true);
    // Disable right-click
    document.addEventListener('contextmenu', e => e.preventDefault(), true);

    // ── BLOCK COPY/PASTE/CUT in exam editors ──────────────────
    _blockPasteCutCopy();
    // Warn on beforeunload
    window.addEventListener('beforeunload', _onBeforeUnload);
    // DevTools detection
    _devToolsCheck();
  }

  function _disableStrictAntiCheat() {
    document.removeEventListener('fullscreenchange', _onFullscreenChange);
    document.removeEventListener('visibilitychange', _onVisibilityChange);
    document.removeEventListener('keydown', _strictKeydown, true);
    window.removeEventListener('beforeunload', _onBeforeUnload);
  }

  function _onFullscreenChange() {
    if (!document.fullscreenElement && !_submitted) {
      _recordViolation('rời toàn màn hình');
    }
  }

  function _onVisibilityChange() {
    if (document.hidden && !_submitted) {
      _recordViolation('chuyển tab');
    }
  }

  function _strictKeydown(e) {
    const c = e.ctrlKey || e.metaKey, s = e.shiftKey;
    if (e.key === 'F12' || (c && (e.key==='u'||e.key==='s'||e.key==='p'))
        || (c && s && (e.key==='I'||e.key==='J'||e.key==='C'))) {
      e.preventDefault(); e.stopPropagation();
    }
  }

  function _onBeforeUnload(e) {
    if (!_submitted) {
      _saveCurrentAnswer();
      _recordViolation('tải lại trang');
      e.preventDefault();
      return (e.returnValue = 'Bài thi chưa nộp!');
    }
  }

  let _devInterval = null;
  function _devToolsCheck() {
    _devInterval = setInterval(() => {
      if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
        _recordViolation('mở DevTools', true);
      }
    }, 2000);
  }

  function _recordViolation(type, immediate) {
    if (_submitted) return;
    _saveCurrentAnswer();
    _acViolations++;

    CL.API.logViolation(_exam?.id, _acViolations, type, '');
    CL.API.logAccess('exam_violation', `${_exam?.id}:${type}:${_acViolations}`);

    const overlay = document.getElementById('exam-ac-overlay');
    const iconEl  = document.getElementById('eac-icon');
    const titleEl = document.getElementById('eac-title');
    const msgEl   = document.getElementById('eac-msg');
    const btnEl   = document.getElementById('eac-btn');

    if (immediate || _acViolations >= 2) {
      // Auto-submit
      if (iconEl)  iconEl.textContent  = '🔒';
      if (titleEl) titleEl.textContent = 'Bài đã bị nộp tự động!';
      if (msgEl)   msgEl.textContent   = `Vi phạm lần ${_acViolations}: ${type}. Hệ thống tự động nộp bài theo quy định thi.`;
      if (btnEl) { btnEl.style.display = 'none'; }
      if (overlay) overlay.style.display = 'flex';
      setTimeout(() => _submitAll(), 500);
    } else {
      // Warning
      if (iconEl)  iconEl.textContent  = '⚠️';
      if (titleEl) titleEl.textContent = `Cảnh báo vi phạm (lần ${_acViolations}/2)`;
      if (msgEl)   msgEl.textContent   = `Phát hiện: ${type}. Lần tiếp theo bài sẽ tự động nộp!`;
      if (btnEl) {
        btnEl.textContent = 'Tôi hiểu, trở lại làm bài';
        btnEl.onclick = () => {
          if (overlay) overlay.style.display = 'none';
          _requestFullscreen();
        };
      }
      if (overlay) overlay.style.display = 'flex';
    }
  }

  function _requestFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen)   el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  // ── PDF Proof generation ──────────────────────────────────────

  async function _generatePdfProof(diemFinal, tgTong, baiKtId) {
    const user = Session.get();
    const exam = _exam;
    const ts   = new Date().toLocaleString('vi-VN');

    // Build HTML for PDF (using iframe print approach)
    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; font-size: 12px; color: #111; padding: 20px; }
  .header { border-bottom: 2px solid #1a73e8; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start; }
  .school { font-size: 11px; color: #555; }
  .title  { font-size: 16px; font-weight: bold; color: #1a73e8; }
  .badge  { background: #1a73e8; color: white; padding: 4px 10px; border-radius: 4px; font-size: 10px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #f8faff; border: 1px solid #dde; border-radius: 6px; padding: 12px; margin-bottom: 16px; }
  .info-item label { font-size: 10px; color: #555; font-weight: bold; text-transform: uppercase; }
  .info-item value { display: block; font-size: 13px; font-weight: bold; }
  .score-box { text-align: center; background: #f0f8ff; border: 2px solid #1a73e8; border-radius: 8px; padding: 12px; margin-bottom: 16px; }
  .score-num { font-size: 36px; font-weight: 900; color: #1a73e8; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 16px; }
  th { background: #1a73e8; color: white; padding: 6px 8px; text-align: left; }
  td { padding: 5px 8px; border-bottom: 1px solid #eee; }
  tr:nth-child(even) td { background: #f8f8f8; }
  .code-block { background: #1e1e2e; color: #cdd6f4; font-family: monospace; font-size: 10px; padding: 8px; border-radius: 4px; white-space: pre-wrap; word-break: break-all; max-height: 120px; overflow: hidden; margin-top: 4px; }
  .footer { border-top: 1px solid #ddd; padding-top: 8px; font-size: 10px; color: #888; display: flex; justify-content: space-between; }
  @media print { body { padding: 10px; } }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="school">TRƯỜNG THPT THỦ THIÊM · HỆ THỐNG CODELAB</div>
    <div class="title">PHIẾU MINH CHỨNG KẾT QUẢ THI</div>
  </div>
  <div class="badge">OFFICIAL</div>
</div>

<div class="info-grid">
  <div class="info-item"><label>Họ tên</label><value>${user?.name || '—'}</value></div>
  <div class="info-item"><label>MSHS</label><value>${user?.mshs || '—'}</value></div>
  <div class="info-item"><label>Lớp</label><value>${user?.lop || '—'}</value></div>
  <div class="info-item"><label>Kỳ thi</label><value>${Utils.escHtml(exam.ten)}</value></div>
  <div class="info-item"><label>Thời gian làm bài</label><value>${Math.floor(tgTong/60)}:${String(tgTong%60).padStart(2,'0')} phút</value></div>
  <div class="info-item"><label>Thời điểm nộp</label><value>${ts}</value></div>
</div>

<div class="score-box">
  <div style="font-size:12px;color:#555;margin-bottom:4px">ĐIỂM TỔNG KẾT</div>
  <div class="score-num">${diemFinal}<span style="font-size:18px;color:#555">/10</span></div>
  <div style="font-size:11px;color:#555;margin-top:4px">
    ${Object.values(_answers).filter(a=>a.da_nop).length}/${_questions.length} câu hoàn thành
  </div>
</div>

<table>
  <thead>
    <tr><th>#</th><th>Câu hỏi</th><th>Mức Bloom</th><th>Điểm</th><th>Thời gian</th></tr>
  </thead>
  <tbody>
    ${_questions.map((q, i) => {
      const a = _answers[q.id];
      const d = a?.diem ?? '—';
      return `<tr>
        <td>${i+1}</td>
        <td>${Utils.escHtml(q.num + ' ' + q.title)}</td>
        <td>${q.lv || '—'}</td>
        <td style="font-weight:bold;color:${parseFloat(d)>=8?'#15803d':parseFloat(d)>=5?'#92400e':'#b91c1c'}">${d}</td>
        <td>${a?.tg ? Math.floor(a.tg/60)+'m'+String(a.tg%60).padStart(2,'0')+'s' : '—'}</td>
      </tr>`;
    }).join('')}
  </tbody>
</table>

${_questions.slice(0, 5).map((q, i) => {
  const a = _answers[q.id];
  if (!a?.code) return '';
  return `<div style="margin-bottom:12px">
    <div style="font-weight:bold;font-size:11px">Câu ${i+1}: ${Utils.escHtml(q.title)}</div>
    <div class="code-block">${Utils.escHtml(a.code.substring(0, 500))}${a.code.length>500?'...(xem file đầy đủ)':''}</div>
  </div>`;
}).join('')}

<div class="footer">
  <span>Mã bài thi: ${exam.id} · Mã nộp: ${baiKtId||'—'}</span>
  <span>Hệ thống CodeLab v${cfg.APP_VERSION} · ${ts}</span>
</div>
</body>
</html>`;

    // Save to server (compressed)
    try {
      await CL.API.saveMinhChung({
        ky_id:   exam.id,
        html:    html.substring(0, 5000), // truncate for Sheets cell limit
        diem:    diemFinal,
        ts:      new Date().toISOString(),
      });
    } catch {}

    return html;
  }

  function downloadPdf() {
    const html = Store.get('_lastPdfData');
    if (!html) return;
    // Open in new window → print as PDF
    const win = window.open('', '_blank', 'width=800,height=1000');
    win.document.write(html);
    win.document.close();
    win.onload = () => {
      setTimeout(() => { win.focus(); win.print(); }, 500);
    };
  }

  // ── Run SQL helper ────────────────────────────────────────────
  function runSQL() {
    const ta  = document.getElementById('eq-code-input');
    const out = document.getElementById('eq-output');
    if (!ta || !out) return;
    // Delegate to sql editor if available
    if (CL.Editors?.Sql) {
      // use the sql.js db
      out.textContent = '⏳ Đang chạy SQL...';
    }
  }

  // ── Block paste/cut/copy in exam editors ─────────────────────

  let _pasteHandlers = [];

  function _blockPasteCutCopy() {
    const handler = (e) => {
      if (_submitted || _locked) return;
      const target = e.target;
      const isEditor = target.id === 'eq-code-input'
        || target.classList.contains('eq-code-area')
        || target.classList.contains('html-code-area')
        || target.classList.contains('sql-code-area');
      if (!isEditor) return;

      if (e.type === 'paste') {
        e.preventDefault();
        e.stopPropagation();
        // Log violation
        CL.API.logAccess('exam_paste_blocked', `${_exam?.id}:q${_curIdx}`);
        _showPasteBlocked();
        return false;
      }
      if (e.type === 'cut') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      // Allow copy (viewing own work is ok, but log it)
      if (e.type === 'copy') {
        CL.API.logAccess('exam_copy', `${_exam?.id}:q${_curIdx}`);
      }
    };
    // Capture phase ensures it fires before any other handler
    document.addEventListener('paste', handler, true);
    document.addEventListener('cut',   handler, true);
    document.addEventListener('copy',  handler, true);
    _pasteHandlers.push(handler);

    // Also block Ctrl+V / Ctrl+X via keydown (belt + suspenders)
    const kwHandler = (e) => {
      if (_submitted || _locked) return;
      const target = e.target;
      const isEditor = target.id === 'eq-code-input'
        || target.classList.contains('eq-code-area');
      if (!isEditor) return;
      const c = e.ctrlKey || e.metaKey;
      if (c && (e.key === 'v' || e.key === 'V')) {
        e.preventDefault(); e.stopPropagation();
        _showPasteBlocked();
      }
      if (c && (e.key === 'x' || e.key === 'X')) {
        e.preventDefault(); e.stopPropagation();
      }
    };
    document.addEventListener('keydown', kwHandler, true);
    _pasteHandlers.push(kwHandler);
  }

  let _pasteToastTimer = null;
  function _showPasteBlocked() {
    // Show temporary overlay on the editor
    const existing = document.getElementById('exam-paste-msg');
    if (existing) { clearTimeout(_pasteToastTimer); existing.remove(); }
    const msg = document.createElement('div');
    msg.id = 'exam-paste-msg';
    msg.className = 'exam-paste-block-msg';
    msg.innerHTML = '🚫 Không được dán (paste) trong giờ kiểm tra';
    const ws = document.getElementById('exam-workspace');
    if (ws) ws.appendChild(msg);
    _pasteToastTimer = setTimeout(() => msg.remove(), 2500);
  }

  // ── Cleanup ───────────────────────────────────────────────────
  function cleanup() {
    _stopTimer();
    clearInterval(_devInterval);
    _disableStrictAntiCheat();
    // Remove paste/cut/copy handlers
    _pasteHandlers.forEach(h => {
      document.removeEventListener('paste', h, true);
      document.removeEventListener('cut',   h, true);
      document.removeEventListener('copy',  h, true);
      document.removeEventListener('keydown', h, true);
    });
    _pasteHandlers = [];
  }

  // Backward compat
  window.ExamMode = { start, navTo, submitQuestion, confirmSubmit, downloadPdf, cleanup, handleEditorKey, onPaste, scheduleHtmlPreview, runCode, runSQL };

  return { start, navTo, submitQuestion, confirmSubmit, downloadPdf, cleanup, handleEditorKey, onPaste, scheduleHtmlPreview, runCode, runSQL };
});
