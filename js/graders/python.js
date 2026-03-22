/**
 * graders/python.js — Python Grader Engine v2
 * ═══════════════════════════════════════════════════════════════
 * Mode 1: tc[] (test cases) → Pyodide output-based grading
 * Mode 2: rb[] (rubric)     → keyword matching (fallback)
 *
 * tc format: [{ input:"5\n10", expected:"15", pts:2, desc:"..." }]
 * rb format: [{ kw:"print", pts:3, desc:"..." }]
 */
'use strict';

CL.define('Graders.Python', () => {

  const cfg      = CL.require('Config');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');

  // ── Pyodide Worker ───────────────────────────────────────────
  let _worker = null, _workerReady = false, _pendingCbs = {}, _callId = 0;

  function _getWorker() {
    if (_worker) return _worker;
    try {
      _worker = new Worker('js/runtime/pyodide-worker.js');
      _worker.onmessage = (e) => {
        const msg = e.data;
        if (msg.type === 'ready') {
          _workerReady = true;
          const cb = _pendingCbs['__load'];
          if (cb) { delete _pendingCbs['__load']; cb(null); }
        } else if (msg.type === 'error') {
          const cb = _pendingCbs['__load'];
          if (cb) { delete _pendingCbs['__load']; cb(msg.message); }
          _worker = null; _workerReady = false;
        } else if (msg.type === 'result') {
          const cb = _pendingCbs[msg.id];
          if (cb) { delete _pendingCbs[msg.id]; cb(msg); }
        }
      };
      _worker.onerror = () => { _worker = null; _workerReady = false; };
    } catch(e) { console.warn('[Graders.Python] Worker error:', e.message); }
    return _worker;
  }

  function _ensureWorkerReady() {
    return new Promise((resolve, reject) => {
      const w = _getWorker();
      if (!w) { reject(new Error('Worker không khả dụng')); return; }
      if (_workerReady) { resolve(); return; }
      _pendingCbs['__load'] = (err) => err ? reject(new Error(err)) : resolve();
      w.postMessage({ type: 'load' });
    });
  }

  function _runCode(code, inputs, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const w = _getWorker();
      if (!w) { reject(new Error('Worker không khả dụng')); return; }
      const id = ++_callId;
      _pendingCbs[id] = resolve;
      w.postMessage({ type: 'run', id, code, inputs, timeout });
    });
  }

  // ── Main grade ───────────────────────────────────────────────
  async function grade(code, legacyOutput, exerciseId) {
    const ex = Registry.findById(exerciseId);
    if (!ex) throw new Error(`Không tìm thấy bài tập: ${exerciseId}`);

    const result = ex.tc && ex.tc.length > 0
      ? await _gradeTestCases(code, ex)
      : _gradeRubric(code, legacyOutput, ex);

    Events.emit('grade:complete', result);
    return result;
  }

  // ── Test case grading (Pyodide) ──────────────────────────────
  async function _gradeTestCases(code, ex) {
    let useWorker = true;
    try {
      await Promise.race([
        _ensureWorkerReady(),
        new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 8000))
      ]);
    } catch(e) { useWorker = false; }

    const tc = ex.tc;
    let totalPts = 0, earnedPts = 0, passed = 0;
    const results = [];

    for (let i = 0; i < tc.length; i++) {
      const t    = tc[i];
      const pts  = parseInt(t.pts) || 1;
      totalPts  += pts;
      const inputLines = (t.input || '').replace(/\\n/g,'\n').split('\n').filter(Boolean);
      let actual = '', error = '', ok = true;

      if (useWorker) {
        try {
          const res = await Promise.race([
            _runCode(code, inputLines),
            new Promise(r => setTimeout(() => r({ ok:false, stdout:'', stderr:'TLE' }), 6000))
          ]);
          actual = (res.stdout || '').trimEnd();
          error  = res.ok ? '' : (res.stderr || '');
          ok     = res.ok;
        } catch(e) { error = e.message; ok = false; }
      } else {
        const r = _runPyInterp(code, inputLines);
        actual = r.stdout.trimEnd(); error = r.error; ok = !r.error;
      }

      const expected = (t.expected || '').trimEnd();
      const pass     = ok && _matches(actual, expected);
      if (pass) { passed++; earnedPts += pts; }

      results.push({
        desc: t.desc || `Test ${i+1}`, pts,
        earned: pass ? pts : 0, passed: pass,
        input: t.input || '', expected, actual, error,
        hint: t.hint || '',
      });
    }

    const score = totalPts > 0 ? Math.round((earnedPts / totalPts) * 10 * 10) / 10 : 0;
    return {
      mode: 'testcase', score, results,
      total: totalPts, earned: earnedPts,
      passedTests: passed, totalTests: tc.length,
      exercise: ex, showSolution: score < cfg.GRADE.SHOW_SOLUTION_BELOW && ex.solution,
    };
  }

  function _matches(actual, expected) {
    if (actual === expected) return true;
    const norm = s => s.trim().split('\n').map(l => l.trim()).join('\n');
    if (norm(actual) === norm(expected)) return true;
    const af = parseFloat(actual), ef = parseFloat(expected);
    if (!isNaN(af) && !isNaN(ef) && Math.abs(af - ef) <= cfg.GRADE.FLOAT_TOLERANCE) return true;
    return false;
  }

  function _runPyInterp(code, inputLines) {
    if (typeof PyInterp === 'undefined') return { stdout:'', error:'PyInterp không khả dụng' };
    let stdout = '', error = '', inputIdx = 0;
    try {
      const toks = PyInterp.tokenize(code);
      const ast  = new PyInterp.Parser(toks).parse();
      const interp = new PyInterp.Interp(
        (t) => { stdout += t; },
        ()  => inputIdx < inputLines.length ? inputLines[inputIdx++] : ''
      );
      const r = interp.run(ast);
      if (r && r.e) error = r.e.toString();
    } catch(e) { error = e instanceof PyInterp?.PyErr ? e.toString() : (e.message || String(e)); }
    return { stdout, error };
  }

  // ── Rubric grading (legacy) ───────────────────────────────────
  function _gradeRubric(code, output, ex) {
    const rb = ex.rb || [];
    if (!rb.length) throw new Error('Bài này chưa có tiêu chí chấm (rb[])');

    const results = rb.map(c => {
      const passed = _checkKw(code, output, c.kw || '');
      return { ...c, passed, earned: passed ? (parseInt(c.pts) || 0) : 0 };
    });

    const total  = rb.reduce((s,r) => s + (parseInt(r.pts)||0), 0);
    const earned = results.reduce((s,r) => s + r.earned, 0);
    const score  = total > 0 ? Math.round((earned/total)*10*10)/10 : 0;
    return {
      mode: 'rubric', score, results, total, earned, exercise: ex,
      showSolution: score < cfg.GRADE.SHOW_SOLUTION_BELOW && ex.solution,
    };
  }

  function _checkKw(code, output, kw) {
    if (!kw) return true;
    if (/^-?\d+\.?\d*$/.test(kw)) {
      const tol  = cfg.GRADE.FLOAT_TOLERANCE;
      return (output.match(/-?\d+\.?\d*/g)||[]).map(Number).some(n => Math.abs(n - parseFloat(kw)) <= tol);
    }
    const text = (code + '\n' + output).toLowerCase();
    const k    = kw.toLowerCase();
    const idx  = text.indexOf(k);
    if (idx < 0) return false;
    const after = text[idx + k.length] || '';
    if (/\d/.test(after) && /\d$/.test(k)) return false;
    return true;
  }

  window._gradePython = (code, output, exId) => grade(code, output, exId);

  return { grade };
});
