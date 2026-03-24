/**
 * runtime/pyodide-worker.js — Pyodide Web Worker
 * ═══════════════════════════════════════════════════════════════
 * Chạy trong background thread, không block UI.
 * Hỗ trợ: exec code + capture stdout/stderr, timeout, multiple inputs.
 *
 * Messages nhận vào:
 *   { type: 'load' }                          — khởi tạo Pyodide
 *   { type: 'run', id, code, inputs, timeout } — chạy code
 *
 * Messages gửi ra:
 *   { type: 'ready' }                          — Pyodide đã sẵn sàng
 *   { type: 'error', message }                 — lỗi load
 *   { type: 'result', id, stdout, stderr, ok } — kết quả chạy
 */

'use strict';

let _pyodide = null;
let _loading = false;

// Intercept importScripts for Cloudflare blocked domains
self.onmessage = async function(e) {
  const msg = e.data;

  if (msg.type === 'load') {
    if (_pyodide) { self.postMessage({ type: 'ready' }); return; }
    if (_loading) return;
    _loading = true;
    try {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js');
      _pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
      // Patch sys.stdin for input() support
      _pyodide.runPython(`
import sys, io
class _FakeStdin:
    def __init__(self): self._lines = iter([])
    def set_lines(self, lines): self._lines = iter(lines)
    def readline(self):
        try: return next(self._lines) + '\\n'
        except StopIteration: return ''
    def read(self): return self.readline()
_fake_stdin = _FakeStdin()
sys.stdin = _fake_stdin
`);
      self.postMessage({ type: 'ready' });
    } catch(err) {
      _loading = false;
      self.postMessage({ type: 'error', message: err.message });
    }
    return;
  }

  if (msg.type === 'run') {
    const { id, code, inputs = [], timeout = 5000 } = msg;
    if (!_pyodide) {
      self.postMessage({ type: 'result', id, ok: false, stdout: '', stderr: 'Pyodide chưa load xong' });
      return;
    }

    let stdout = '';
    let stderr = '';
    let ok = true;

    try {
      // Set up stdin with provided inputs
      const inputLines = inputs.map(String);
      _pyodide.runPython(`_fake_stdin.set_lines(${JSON.stringify(inputLines)})`);

      // Capture stdout/stderr
      _pyodide.runPython(`
import sys, io
_stdout_buf = io.StringIO()
_stderr_buf = io.StringIO()
sys.stdout = _stdout_buf
sys.stderr = _stderr_buf
`);

      // Run with timeout using JS Promise.race
      const runPromise = new Promise((resolve, reject) => {
        try {
          _pyodide.runPython(code);
          resolve();
        } catch(e) {
          reject(e);
        }
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Time Limit Exceeded (>' + timeout/1000 + 's)')), timeout)
      );

      await Promise.race([runPromise, timeoutPromise]);

      stdout = _pyodide.runPython('_stdout_buf.getvalue()');
      stderr = _pyodide.runPython('_stderr_buf.getvalue()');

    } catch(err) {
      ok = false;
      try {
        stdout = _pyodide.runPython('_stdout_buf.getvalue()') || '';
        stderr = err.message || String(err);
      } catch(e2) {
        stderr = err.message || String(err);
      }
    } finally {
      // Restore stdout/stderr
      try { _pyodide.runPython('sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__'); } catch(e) {}
    }

    self.postMessage({ type: 'result', id, ok, stdout, stderr });
  }
};
