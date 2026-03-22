/**
 * graders/sql.js — SQL Grader Engine v2
 * ═══════════════════════════════════════════════════════════════
 * Dùng sql.js (SQLite WebAssembly) chạy query thật trong browser.
 *
 * - Khởi tạo DB ảo từ sample_db (CREATE TABLE + INSERT)
 * - Chạy câu query của học sinh + câu query mẫu (solution)
 * - So sánh kết quả (columns + rows), bỏ qua thứ tự nếu không có ORDER BY
 * - Fallback về rubric keyword matching nếu sql.js không load được
 */
'use strict';

CL.define('Graders.Sql', () => {

  const cfg      = CL.require('Config');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');

  // ── sql.js Worker ────────────────────────────────────────────
  let _worker = null, _workerReady = false, _pendingCbs = {}, _callId = 0;

  function _getWorker() {
    if (_worker) return _worker;
    try {
      _worker = new Worker('js/runtime/sqljs-worker.js');
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
    } catch(e) { console.warn('[Graders.Sql] Worker error:', e.message); }
    return _worker;
  }

  function _ensureWorker() {
    return new Promise((resolve, reject) => {
      const w = _getWorker();
      if (!w) { reject(new Error('Worker không khả dụng')); return; }
      if (_workerReady) { resolve(); return; }
      _pendingCbs['__load'] = (err) => err ? reject(new Error(err)) : resolve();
      w.postMessage({ type: 'load' });
    });
  }

  function _execQuery(initSql, query) {
    return new Promise((resolve, reject) => {
      const w = _getWorker();
      if (!w) { reject(new Error('Worker không khả dụng')); return; }
      const id = ++_callId;
      _pendingCbs[id] = resolve;
      w.postMessage({ type: 'exec', id, initSql, query });
    });
  }

  // ── Main grade ───────────────────────────────────────────────
  async function grade(code, exerciseId) {
    const ex = Registry.findById(exerciseId);
    if (!ex) throw new Error(`Không tìm thấy bài tập: ${exerciseId}`);

    // Try real SQL execution if solution exists
    if (ex.solution && ex.sample_db) {
      try {
        const result = await _gradeRealSql(code.trim(), ex);
        Events.emit('grade:complete', result);
        return result;
      } catch(e) {
        console.warn('[Graders.Sql] Real SQL failed, falling back to rubric:', e.message);
      }
    }

    // Fallback: rubric
    const result = _gradeRubric(code, ex);
    Events.emit('grade:complete', result);
    return result;
  }

  // ── Real SQL execution ────────────────────────────────────────
  async function _gradeRealSql(studentQuery, ex) {
    // Load worker (timeout 6s)
    await Promise.race([
      _ensureWorker(),
      new Promise((_, r) => setTimeout(() => r(new Error('Timeout load sql.js')), 6000))
    ]);

    const initSql = ex.sample_db || '';

    // Run expected (solution) query
    let expectedResult, studentResult;
    try {
      expectedResult = await _execQuery(initSql, ex.solution);
    } catch(e) {
      throw new Error('Lỗi chạy query mẫu: ' + e.message);
    }

    // Run student query
    studentResult = await _execQuery(initSql, studentQuery);

    if (studentResult.error) {
      const result = {
        mode: 'sql-real', score: 0, passed: false,
        exercise: ex,
        syntaxError: studentResult.error,
        expectedColumns: expectedResult.columns || [],
        expectedRows:    expectedResult.rows    || [],
        studentColumns:  [],
        studentRows:     [],
        results: [{ desc: 'Cú pháp SQL', passed: false, earned: 0, pts: 10,
                    hint: studentResult.error }],
        total: 10, earned: 0,
      };
      return result;
    }

    // Compare results
    const expCols = expectedResult.columns || [];
    const expRows = expectedResult.rows    || [];
    const stuCols = studentResult.columns  || [];
    const stuRows = studentResult.rows     || [];

    const colsMatch = _colsMatch(expCols, stuCols);
    const rowsMatch = _rowsMatch(expRows, stuRows, studentQuery);

    const correct = colsMatch && rowsMatch;
    const score   = correct ? 10 : (colsMatch ? 4 : 0);

    const results = [];
    results.push({
      desc: 'Tên cột (columns) đúng',
      passed: colsMatch,
      earned: colsMatch ? 4 : 0,
      pts: 4,
      hint: colsMatch ? '' : `Mong đợi: [${expCols.join(', ')}]\nNhận được: [${stuCols.join(', ')}]`,
    });
    results.push({
      desc: 'Dữ liệu (rows) đúng',
      passed: rowsMatch,
      earned: rowsMatch ? 6 : 0,
      pts: 6,
      hint: rowsMatch ? '' : `Số dòng mong đợi: ${expRows.length}, nhận được: ${stuRows.length}`,
    });

    return {
      mode: 'sql-real', score, passed: correct,
      exercise: ex,
      expectedColumns: expCols, expectedRows: expRows,
      studentColumns: stuCols,  studentRows:  stuRows,
      results, total: 10, earned: score,
      showSolution: score < cfg.GRADE.SHOW_SOLUTION_BELOW && ex.solution,
    };
  }

  function _colsMatch(expected, actual) {
    if (expected.length !== actual.length) return false;
    const e = expected.map(c => c.toLowerCase().trim());
    const a = actual.map(c => c.toLowerCase().trim());
    return e.every((col, i) => col === a[i]);
  }

  function _rowsMatch(expected, actual, query) {
    if (expected.length !== actual.length) return false;
    // If no ORDER BY in student query, sort both before comparing
    const hasOrder = /\bORDER\s+BY\b/i.test(query);
    const norm = row => row.map(v => v === null ? 'NULL' : String(v).trim());
    const e = expected.map(norm);
    const a = actual.map(norm);
    if (hasOrder) {
      return e.every((row, i) => row.every((v, j) => v === a[i]?.[j]));
    } else {
      // Sort both for comparison
      const sort = arr => [...arr].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
      const es = sort(e), as = sort(a);
      return es.every((row, i) => row.every((v, j) => v === as[i]?.[j]));
    }
  }

  // ── Rubric fallback ───────────────────────────────────────────
  function _gradeRubric(code, ex) {
    const rb = ex.rb || [];
    if (!rb.length) throw new Error('Bài này chưa có tiêu chí chấm');

    const results = rb.map(c => {
      const passed = _checkKw(code, c.kw || '');
      return { ...c, passed, earned: passed ? (parseInt(c.pts)||0) : 0 };
    });
    const total  = rb.reduce((s,r) => s + (parseInt(r.pts)||0), 0);
    const earned = results.reduce((s,r) => s + r.earned, 0);
    const score  = total > 0 ? Math.round((earned/total)*100)/10 : 0;
    return { mode: 'rubric', score, results, total, earned, exercise: ex };
  }

  function _checkKw(code, kw) {
    if (!kw) return true;
    const clean = code.toLowerCase().replace(/--[^\n]*/g,'').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ');
    const k = kw.toLowerCase().replace(/\s+/g,' ');
    return clean.includes(k) || clean.replace(/\s/g,'').includes(k.replace(/\s/g,''));
  }

  return { grade };
});
