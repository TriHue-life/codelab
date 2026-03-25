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

    // Lọc traceback: bỏ đường dẫn nội bộ Pyodide, chỉ giữ dòng lỗi có ích
    self.postMessage({ type: 'result', id, ok, stdout, stderr: _cleanTraceback(stderr) });
  }
};

/**
 * Lọc + dịch traceback Pyodide sang tiếng Việt
 */
function _cleanTraceback(raw) {
  if (!raw) return raw;

  const lines = raw.split('\n');
  const userLines = [];   // chỉ giữ các dòng liên quan đến code người dùng
  let foundExec = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Bỏ header "Traceback (most recent call last):"
    if (line.trim() === 'Traceback (most recent call last):') continue;

    // Bỏ đường dẫn nội bộ Pyodide
    if (line.includes('python311.zip') ||
        line.includes('_pyodide') ||
        line.includes('pyodide-') ||
        line.includes('/lib/python3')) continue;

    // Dịch dòng File "<exec>" / "<string>"
    if (line.includes('File "<exec>"') || line.includes('File "<string>"')) {
      foundExec = true;
      const translated = line
        .replace(/File "<exec>",\s*line\s*(\d+),\s*in\s*<module>/g, '📍 Dòng $1 trong code của bạn:')
        .replace(/File "<exec>",\s*line\s*(\d+)/g, '📍 Dòng $1 trong code của bạn:')
        .replace(/File "<string>",\s*line\s*(\d+),\s*in\s*<module>/g, '📍 Dòng $1 trong code của bạn:')
        .replace(/File "<string>",\s*line\s*(\d+)/g, '📍 Dòng $1 trong code của bạn:');
      userLines.push(translated);
      // Thêm dòng code tiếp theo (nếu có, là dòng gây lỗi)
      if (i + 1 < lines.length && !lines[i+1].includes('Error:') && !lines[i+1].includes('  ^')) {
        userLines.push('    ' + lines[i+1].trim());
        i++;
      }
      continue;
    }

    // Bỏ dòng ^^^^ (chỉ thị vị trí, không cần thiết)
    if (/^\s*\^+\s*$/.test(line)) continue;

    userLines.push(line);
  }

  let result = userLines.join('\n').trim();
  result = _translateError(result);
  return result;
}

function _translateError(msg) {
  // ── NameError ────────────────────────────────────────────────
  msg = msg.replace(
    /NameError: name '(.+?)' is not defined/g,
    "❌ NameError: Tên '$1' chưa được khai báo\n💡 Kiểm tra: viết đúng tên biến/hàm, khai báo trước khi dùng."
  );
  // ── SyntaxError ──────────────────────────────────────────────
  msg = msg.replace(
    /SyntaxError: invalid syntax/g,
    "❌ SyntaxError: Sai cú pháp\n💡 Kiểm tra: thiếu dấu ':', ngoặc chưa đóng, hay lỗi thụt lề."
  );
  msg = msg.replace(
    /SyntaxError: EOL while scanning string literal/g,
    "❌ SyntaxError: Chuỗi chưa được đóng (thiếu dấu ' hoặc ")"
  );
  msg = msg.replace(
    /SyntaxError: unexpected EOF while parsing/g,
    "❌ SyntaxError: Code chưa hoàn chỉnh (thiếu ngoặc hoặc lệnh)"
  );
  msg = msg.replace(
    /SyntaxError: (.+)/g,
    "❌ SyntaxError: Lỗi cú pháp — $1\n💡 Kiểm tra dấu :, ngoặc, thụt lề."
  );
  // ── IndentationError ─────────────────────────────────────────
  msg = msg.replace(
    /IndentationError: unexpected indent/g,
    "❌ IndentationError: Thụt lề không đúng (thụt vào chỗ không cần)\n💡 Dùng 4 spaces hoặc 1 tab nhất quán."
  );
  msg = msg.replace(
    /IndentationError: expected an indented block/g,
    "❌ IndentationError: Thân lệnh if/for/while/def phải được thụt lề\n💡 Thêm 4 spaces ở đầu dòng tiếp theo."
  );
  msg = msg.replace(
    /IndentationError: (.+)/g,
    "❌ IndentationError: Lỗi thụt lề — $1"
  );
  // ── TypeError ────────────────────────────────────────────────
  msg = msg.replace(
    /TypeError: unsupported operand type\(s\) for (.+?): '(.+?)' and '(.+?)'/g,
    "❌ TypeError: Không thể dùng toán tử '$1' giữa '$2' và '$3'\n💡 Kiểm tra kiểu dữ liệu, ví dụ: int('5') + 3 → cần int()."
  );
  msg = msg.replace(
    /TypeError: '(.+?)' object is not iterable/g,
    "❌ TypeError: Không thể duyệt qua '$1' bằng for\n💡 Kiểm tra biến có phải list/tuple/string không."
  );
  msg = msg.replace(
    /TypeError: '(.+?)' object is not subscriptable/g,
    "❌ TypeError: Kiểu '$1' không hỗ trợ truy cập bằng chỉ số []\n💡 Kiểm tra đây có phải list/dict/string không."
  );
  msg = msg.replace(
    /TypeError: (.+?) takes (.+?) argument\(s\) but (.+?) (was|were) given/g,
    "❌ TypeError: Hàm nhận $2 tham số nhưng bạn truyền $3\n💡 Kiểm tra số lượng đối số khi gọi hàm."
  );
  msg = msg.replace(
    /TypeError: (.+)/g,
    "❌ TypeError: Lỗi kiểu dữ liệu — $1\n💡 Kiểm tra kiểu của các biến đang dùng."
  );
  // ── ValueError ───────────────────────────────────────────────
  msg = msg.replace(
    /ValueError: invalid literal for int\(\) with base 10: '(.+?)'/g,
    "❌ ValueError: Không thể chuyển '$1' thành số nguyên\n💡 Kiểm tra input() có nhập đúng số không."
  );
  msg = msg.replace(
    /ValueError: could not convert string to float: '(.+?)'/g,
    "❌ ValueError: Không thể chuyển '$1' thành số thực\n💡 Kiểm tra input() có nhập đúng số không."
  );
  msg = msg.replace(
    /ValueError: (.+)/g,
    "❌ ValueError: Giá trị không hợp lệ — $1\n💡 Kiểm tra dữ liệu đầu vào."
  );
  // ── IndexError ───────────────────────────────────────────────
  msg = msg.replace(
    /IndexError: list index out of range/g,
    "❌ IndexError: Chỉ số vượt quá độ dài danh sách\n💡 Kiểm tra: chỉ số bắt đầu từ 0, và không được >= len(list)."
  );
  msg = msg.replace(
    /IndexError: string index out of range/g,
    "❌ IndexError: Chỉ số vượt quá độ dài chuỗi\n💡 Kiểm tra chỉ số < len(chuỗi)."
  );
  msg = msg.replace(
    /IndexError: (.+)/g,
    "❌ IndexError: Lỗi chỉ số — $1"
  );
  // ── KeyError ─────────────────────────────────────────────────
  msg = msg.replace(
    /KeyError: (.+)/g,
    "❌ KeyError: Khóa $1 không tồn tại trong dictionary\n💡 Dùng dict.get(key) để tránh lỗi."
  );
  // ── ZeroDivisionError ────────────────────────────────────────
  msg = msg.replace(
    /ZeroDivisionError: (.+)/g,
    "❌ ZeroDivisionError: Chia cho 0\n💡 Kiểm tra mẫu số trước khi chia."
  );
  // ── RecursionError ───────────────────────────────────────────
  msg = msg.replace(
    /RecursionError: (.+)/g,
    "❌ RecursionError: Đệ quy quá sâu (vòng lặp vô tận?)\n💡 Kiểm tra điều kiện dừng của hàm đệ quy."
  );
  // ── AttributeError ───────────────────────────────────────────
  msg = msg.replace(
    /AttributeError: '(.+?)' object has no attribute '(.+?)'/g,
    "❌ AttributeError: Kiểu '$1' không có thuộc tính/phương thức '$2'\n💡 Kiểm tra tên phương thức hoặc kiểu dữ liệu của biến."
  );
  msg = msg.replace(
    /AttributeError: (.+)/g,
    "❌ AttributeError: $1"
  );
  // ── ImportError ──────────────────────────────────────────────
  msg = msg.replace(
    /ModuleNotFoundError: No module named '(.+?)'/g,
    "❌ ImportError: Module '$1' không có sẵn trong môi trường này\n💡 Chỉ dùng thư viện chuẩn Python: math, random, string, datetime..."
  );
  msg = msg.replace(
    /ImportError: (.+)/g,
    "❌ ImportError: $1\n💡 Chỉ dùng thư viện chuẩn Python."
  );
  // ── StopIteration ────────────────────────────────────────────
  msg = msg.replace(
    /StopIteration/g,
    "❌ StopIteration: Vòng lặp kết thúc nhưng vẫn gọi next()\n💡 Kiểm tra điều kiện dừng vòng lặp."
  );
  // ── TimeoutError ─────────────────────────────────────────────
  msg = msg.replace(
    /Time Limit Exceeded/g,
    "⏱️ Quá thời gian cho phép\n💡 Code bị vòng lặp vô tận? Kiểm tra điều kiện while."
  );
  // ── EOFError ─────────────────────────────────────────────────
  msg = msg.replace(
    /EOFError: EOF when reading a line/g,
    "❌ EOFError: Không đủ dữ liệu input()\n💡 Bài yêu cầu nhập nhiều giá trị hơn bạn cung cấp."
  );
  // ── OverflowError ────────────────────────────────────────────
  msg = msg.replace(
    /OverflowError: (.+)/g,
    "❌ OverflowError: Giá trị quá lớn vượt giới hạn số — $1"
  );

  return msg;
}
