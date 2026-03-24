//  UI CODE
// ══════════════════════════════════════════════════════════════

// ─── Input dialog system ────────────────────────────────────
let inputResolveQ = [];
let currentInputResolve = null;

function askUserInput(promptText) {
  return new Promise(resolve => {
    currentInputResolve = resolve;
    document.getElementById('input-prompt').textContent = promptText || '▶ Nhập giá trị:';
    const inp = document.getElementById('input-field');
    inp.value = '';
    document.getElementById('input-overlay').classList.add('show');
    setTimeout(() => inp.focus(), 100);
  });
}

function submitInput() {
  const val = document.getElementById('input-field').value;
  document.getElementById('input-overlay').classList.remove('show');
  appendOut(val + '\n', 'o-n');
  if (currentInputResolve) { currentInputResolve(val); currentInputResolve = null; }
}

document.getElementById('input-field')?.addEventListener('keydown', e => { if (e.key === 'Enter') submitInput(); });

// ─── Line numbers ───────────────────────────────────────────
const ci = document.getElementById('code-input');
const lnEl = document.getElementById('lnums');

function updLN() {
  const lines = ci.value.split('\n');
  const cur = ci.value.substring(0, ci.selectionStart).split('\n');
  const curLine = cur.length;
  document.getElementById('lc').textContent = `Ln ${curLine}, Col ${cur[cur.length-1].length+1}`;
  lnEl.innerHTML = lines.map((_, i) => `<span${i+1===curLine?' class="al"':''}>${i+1}</span>`).join('');
  lnEl.scrollTop = ci.scrollTop;
}

// ── Syntax Highlighting Engine (VSCode Dark+ for Python) ────────────────────
const hlOverlay = document.getElementById('hl-overlay');

const PY_KEYWORDS = new Set([
  'False','None','True','and','as','assert','async','await','break','class',
  'continue','def','del','elif','else','except','finally','for','from',
  'global','if','import','in','is','lambda','nonlocal','not','or','pass',
  'raise','return','try','while','with','yield'
]);

const PY_BUILTINS = new Set([
  'abs','all','any','bin','bool','breakpoint','bytearray','bytes','callable',
  'chr','classmethod','compile','complex','delattr','dict','dir','divmod',
  'enumerate','eval','exec','filter','float','format','frozenset','getattr',
  'globals','hasattr','hash','help','hex','id','input','int','isinstance',
  'issubclass','iter','len','list','locals','map','max','memoryview','min',
  'next','object','oct','open','ord','pow','print','property','range',
  'repr','reversed','round','set','setattr','slice','sorted','staticmethod',
  'str','sum','super','tuple','type','vars','zip'
]);

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function hlPython(code) {
  if (typeof CL !== 'undefined' && CL.Editors?.Syntax?.python) {
    return CL.Editors.Syntax.python(code);
  }
  let out = '';
  let i = 0;
  const n = code.length;
  let prevTokType = null; // track if prev was 'def' or 'class'

  while (i < n) {
    const ch = code[i];

    // Comment
    if (ch === '#') {
      let j = i;
      while (j < n && code[j] !== '\n') j++;
      out += `<span class="hl-cmt">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Triple-quoted string
    if ((ch === '"' || ch === "'") && code[i+1] === ch && code[i+2] === ch) {
      const q = ch.repeat(3);
      let j = i + 3;
      while (j < n && code.slice(j, j+3) !== q) j++;
      j += 3;
      out += `<span class="hl-str">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Single/double quoted string
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < n && code[j] !== ch && code[j] !== '\n') {
        if (code[j] === '\\') j++; // skip escape
        j++;
      }
      if (j < n && code[j] === ch) j++;
      out += `<span class="hl-str">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Number (int, float, hex, binary)
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[i+1] || ''))) {
      let j = i;
      if (ch === '0' && (code[i+1] === 'x' || code[i+1] === 'X')) { j += 2; while (j < n && /[0-9a-fA-F_]/.test(code[j])) j++; }
      else if (ch === '0' && (code[i+1] === 'b' || code[i+1] === 'B')) { j += 2; while (j < n && /[01_]/.test(code[j])) j++; }
      else { while (j < n && /[0-9._eE+\-]/.test(code[j])) j++; }
      out += `<span class="hl-num">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Decorator
    if (ch === '@') {
      let j = i + 1;
      while (j < n && /[\w.]/.test(code[j])) j++;
      out += `<span class="hl-deco">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = 'deco';
      continue;
    }

    // Identifier or keyword
    if (/[a-zA-Z_\u00c0-\u024f\u1ea0-\u1ef9]/.test(ch)) {
      let j = i;
      while (j < n && /[\w\u00c0-\u024f\u1ea0-\u1ef9]/.test(code[j])) j++;
      const word = code.slice(i, j);
      let cls;
      if (prevTokType === 'def') cls = 'hl-fn';
      else if (prevTokType === 'class') cls = 'hl-cls';
      else if (word === 'self' || word === 'cls') cls = 'hl-self';
      else if (word === 'True' || word === 'False' || word === 'None') cls = 'hl-bool';
      else if (PY_KEYWORDS.has(word)) cls = 'hl-kw';
      else if (PY_BUILTINS.has(word)) cls = 'hl-bi';
      else cls = 'hl-plain';
      out += `<span class="${cls}">${escHtml(word)}</span>`;
      prevTokType = (word === 'def' || word === 'class') ? word : null;
      i = j;
      continue;
    }

    // Operators
    if (/[+\-*/%=<>!&|^~]/.test(ch)) {
      let j = i;
      // Multi-char operators
      const two = code.slice(i, i+2);
      if (['**','//','==','!=','<=','>=','+=','-=','*=','/=','//=','**=','%=','&=','|=','^=','<<','>>','->'].includes(two)) j = i + 2;
      else j = i + 1;
      out += `<span class="hl-op">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Punctuation
    if (/[()\[\]{},.:;]/.test(ch)) {
      out += `<span class="hl-punc">${escHtml(ch)}</span>`;
      i++;
      prevTokType = null;
      continue;
    }

    // Whitespace and newlines - pass through
    out += escHtml(ch);
    if (ch !== ' ' && ch !== '\t' && ch !== '\n') prevTokType = null;
    i++;
  }
  return out;
}

function updateHighlight() {
  if (!hlOverlay) return;
  const code = ci.value;
  hlOverlay.innerHTML = hlPython(code) + '\n'; // trailing newline prevents scroll jump
  hlOverlay.scrollTop = ci.scrollTop;
  hlOverlay.scrollLeft = ci.scrollLeft;
}

ci.addEventListener('input', () => { updLN(); updateHighlight(); });
ci.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = ci.selectionStart, en = ci.selectionEnd;
    if (s !== en) {
      // Multi-line indent
      const before = ci.value.substring(0, s);
      const sel = ci.value.substring(s, en);
      const after = ci.value.substring(en);
      const indented = sel.replace(/^/gm, '    ');
      ci.value = before + indented + after;
      ci.selectionStart = s;
      ci.selectionEnd = s + indented.length;
    } else {
      ci.value = ci.value.substring(0, s) + '    ' + ci.value.substring(en);
      ci.selectionStart = ci.selectionEnd = s + 4;
    }
    updLN(); updateHighlight();
  }
  if (e.key === 'Enter') {
    // Auto-indent: match indent of current line
    const s = ci.selectionStart;
    const before = ci.value.substring(0, s);
    const after = ci.value.substring(s);
    const lines = before.split('\n');
    const curLine = lines[lines.length - 1];
    const indent = curLine.match(/^(\s*)/)[1];
    // Extra indent after colon
    const extraIndent = /:\s*$/.test(curLine.trimEnd()) ? '    ' : '';
    e.preventDefault();
    const ins = '\n' + indent + extraIndent;
    ci.value = before + ins + after;
    ci.selectionStart = ci.selectionEnd = s + ins.length;
    updLN(); updateHighlight();
  }
  if ((e.ctrlKey||e.metaKey) && e.key === 'Enter') runCode();
});

// ── Mobile keyboard toolbar helpers ─────────────────────────────────────────
function mkInsert(text) {
  const s = ci.selectionStart, en = ci.selectionEnd;
  const before = ci.value.substring(0, s);
  const after = ci.value.substring(en);
  // For paired chars, wrap selection or place cursor inside
  const pairs = { '()': ['(', ')'], '[]': ['[', ']'], '{}': ['{', '}'], '""': ['"', '"'], "''": ["'", "'"] };
  if (pairs[text]) {
    const [open, close] = pairs[text];
    const sel = ci.value.substring(s, en);
    ci.value = before + open + sel + close + after;
    if (sel.length > 0) {
      ci.selectionStart = s + 1;
      ci.selectionEnd = s + 1 + sel.length;
    } else {
      ci.selectionStart = ci.selectionEnd = s + 1;
    }
  } else {
    ci.value = before + text + after;
    ci.selectionStart = ci.selectionEnd = s + text.length;
  }
  ci.focus();
  updLN(); updateHighlight();
}

function mkIndent() {
  const s = ci.selectionStart, en = ci.selectionEnd;
  const before = ci.value.substring(0, s);
  const sel = ci.value.substring(s, en);
  const after = ci.value.substring(en);
  if (s !== en) {
    const indented = sel.replace(/^/gm, '    ');
    ci.value = before + indented + after;
    ci.selectionStart = s; ci.selectionEnd = s + indented.length;
  } else {
    ci.value = before + '    ' + after;
    ci.selectionStart = ci.selectionEnd = s + 4;
  }
  ci.focus(); updLN(); updateHighlight();
}

function mkDedent() {
  const s = ci.selectionStart, en = ci.selectionEnd;
  const before = ci.value.substring(0, s);
  const sel = ci.value.substring(s, en);
  const after = ci.value.substring(en);
  if (s !== en) {
    const dedented = sel.replace(/^    /gm, '');
    ci.value = before + dedented + after;
    ci.selectionStart = s; ci.selectionEnd = s + dedented.length;
  } else {
    // Dedent current line
    const lineStart = before.lastIndexOf('\n') + 1;
    const line = ci.value.substring(lineStart);
    if (line.startsWith('    ')) {
      ci.value = ci.value.substring(0, lineStart) + line.substring(4);
      ci.selectionStart = ci.selectionEnd = Math.max(lineStart, s - 4);
    }
  }
  ci.focus(); updLN(); updateHighlight();
}
ci.addEventListener('scroll', () => { lnEl.scrollTop = ci.scrollTop; if(hlOverlay){hlOverlay.scrollTop=ci.scrollTop;hlOverlay.scrollLeft=ci.scrollLeft;} });
ci.addEventListener('click', updLN); ci.addEventListener('keyup', updLN);

// ─── Sync editor layout (font/lineheight) ─────────────────────────────────
function syncEditorLayout() {
  // hl-overlay now lives inside .code-area-wrap so left:0 = correct — no offset needed
  // Still sync font/lineheight so overlay matches textarea exactly
  const cs = window.getComputedStyle(ci);
  const fs = parseFloat(cs.fontSize);
  const lh = parseFloat(cs.lineHeight) || fs * 1.6;
  lnEl.style.setProperty('--lh', lh + 'px');
  if (hlOverlay) {
    hlOverlay.style.fontSize   = cs.fontSize;
    hlOverlay.style.lineHeight = cs.lineHeight;
    hlOverlay.style.padding    = cs.padding;
  }
  // Đồng bộ chiều cao header và ex-bar để panel.mob-active tính đúng
  const hdr = document.querySelector('header');
  const bar = document.getElementById('content-bar');
  const desc = document.getElementById('ex-desc');
  if (hdr) document.documentElement.style.setProperty('--header-h', hdr.offsetHeight + 'px');
  if (bar) {
    const descH = (desc && desc.classList.contains('show')) ? desc.offsetHeight : 0;
    document.documentElement.style.setProperty('--exbar-h', (bar.offsetHeight + descH) + 'px');
  }
}
window.addEventListener('resize', syncEditorLayout);
window.addEventListener('orientationchange', () => setTimeout(syncEditorLayout, 300));
// Chạy lại sau khi tất cả fonts/layout đã render xong
window.addEventListener('load', () => setTimeout(syncEditorLayout, 100));
syncEditorLayout();

updLN(); updateHighlight();

// ─── Output ─────────────────────────────────────────────────
function clearOut() { document.getElementById('out').innerHTML = '<span class="o-p">// Output đã xóa…</span>'; }
function appendOut(text, cls = 'o-n') {
  const el = document.getElementById('out');
  const prompt = el.querySelector('.o-p'); if (prompt) prompt.remove();
  const span = document.createElement('span'); span.className = cls;
  span.textContent = text; el.appendChild(span); el.scrollTop = el.scrollHeight;
}

// runCode defined below (override version)

async function runWithInputs(code) {
  // We need a synchronous interpreter but async input.
  // Solution: detect input() calls, ask user, then re-run with pre-filled inputs
  let inputIdx = 0;
  let collectedInputs = [];
  let firstRun = true;

  async function execute() {
    inputIdx = 0;
    let blocked = false;

    function syncInput(prompt) {
      if (inputIdx < collectedInputs.length) {
        return collectedInputs[inputIdx++];
      }
      // Need more input - we'll collect it
      blocked = true;
      return '__NEED_INPUT__:' + prompt;
    }

    let outputLines = [];
    function outCb(text, isErr) {
      if (!firstRun) return; // Only show output on final run
      appendOut(text, isErr ? 'o-e' : 'o-n');
    }

    // Run synchronously
    try {
      const toks = PyInterp.tokenize(code);
      const parser = new PyInterp.Parser(toks);
      const ast = parser.parse();
      const interp = new PyInterp.Interp((text, isErr) => {
        outputLines.push({ text, isErr });
        if (firstRun) appendOut(text, isErr ? 'o-e' : 'o-n');
      }, syncInput);

      const r = interp.run(ast);
      if (r && r.e) {
        appendOut('\n' + r.e.toString() + '\n', 'o-e');
      } else if (!blocked) {
        // Check if any output was blocked (contained __NEED_INPUT__)
        const needInput = outputLines.find(l => l.text && l.text.includes('__NEED_INPUT__:'));
        if (!needInput) {
          appendOut('\n✓ Thực thi thành công\n', 'o-s');
          return;
        }
      }
    } catch (e) {
      // Check if blocked by input
      const blockedInput = e.message || String(e);
      if (!blocked) {
        appendOut('\n' + (e instanceof PyInterp.PyErr ? e.toString() : 'RuntimeError: ' + blockedInput) + '\n', 'o-e');
        return;
      }
    }

    // If blocked, we need to collect input differently
    if (blocked) {
      // Clear what we showed and restart with input dialog
      const el = document.getElementById('out');
      while (el.lastChild && el.lastChild.textContent.includes('__NEED_INPUT__')) el.removeChild(el.lastChild);
      const promptText = 'Nhập dữ liệu';
      const userInput = await askUserInput(promptText);
      collectedInputs.push(userInput);
      firstRun = true;
      clearOut();
      await execute();
    }
  }

  await execute();
}

// ── Sanitize code: fix mobile keyboard issues ─────────────────────────
function sanitizeCode(code) {
  return code
    // Smart/curly double quotes → straight quotes
    .replace(/\u201c|\u201d|\u201e|\u201f|\u00ab|\u00bb/g, '"')
    // Smart/curly single quotes → straight apostrophe
    .replace(/\u2018|\u2019|\u201a|\u201b|\u2032|\u2035/g, "'")
    // Zero-width spaces and other invisible Unicode
    .replace(/[\u200b\u200c\u200d\u200e\u200f\ufeff\u00ad]/g, '')
    // Non-breaking space → regular space
    .replace(/\u00a0/g, ' ')
    // Full-width colon → ASCII colon (common on some Asian keyboards)
    .replace(/\uff1a/g, ':')
    // Full-width parentheses → ASCII
    .replace(/\uff08/g, '(').replace(/\uff09/g, ')')
    // Normalize line endings (including Unicode line/paragraph separators from iOS copy-paste)
    .replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    .replace(/\u2028|\u2029/g, '\n');
}

// Better approach: Use pre-prompting
async function runCode_v2(code) {
  code = sanitizeCode(code);
  clearOut();
  // Count input() calls
  const inputMatches = (code.match(/\binput\s*\(/g) || []).length;

  if (inputMatches === 0) {
    runSync(code);
    return;
  }

  // Collect inputs first via dialogs
  const inputs = [];
  const inputCalls = extractInputPrompts(code);

  for (let i = 0; i < inputCalls.length; i++) {
    const val = await askUserInput(inputCalls[i] || `Nhập giá trị cho input() thứ ${i+1}:`);
    inputs.push(val);
  }

  runSync(code, inputs);
}

function extractInputPrompts(code) {
  const prompts = [];
  // Match input("...") or input('...')
  const regex = /\binput\s*\(\s*(['"])((?:[^\\]|\\.)*?)\1\s*\)/g;
  let m;
  const withArgPositions = new Set();
  while ((m = regex.exec(code)) !== null) {
    prompts.push(m[2]);
    withArgPositions.add(m.index);
  }
  // Also find input() without args - but avoid double-counting
  const noArgRegex = /\binput\s*\(\s*\)/g;
  let m2;
  while ((m2 = noArgRegex.exec(code)) !== null) {
    if (!withArgPositions.has(m2.index)) prompts.push('');
  }
  return prompts;
}

function runSync(code, inputs = []) {
  code = sanitizeCode(code);
  let inputIdx = 0;

  try {
    const toks = PyInterp.tokenize(code);
    const parser = new PyInterp.Parser(toks);
    const ast = parser.parse();
    const interp = new PyInterp.Interp(
      (text, isErr) => {
        if (text.endsWith('\n')) {
          appendOut(text, isErr ? 'o-e' : 'o-n');
        } else {
          appendOut(text, isErr ? 'o-e' : 'o-n');
        }
      },
      (prompt) => {
        if (inputIdx < inputs.length) {
          const val = inputs[inputIdx++];
          // Show prompt + user input in output
          if (prompt) appendOut(prompt, 'o-n');
          appendOut(val + '\n', 'o-p');
          return val;
        }
        if (prompt) appendOut(prompt, 'o-n');
        return '';
      }
    );

    const r = interp.run(ast);
    if (r && r.e) {
      appendOut('\n' + r.e.toString() + '\n', 'o-e');
    } else if (!r) {
      appendOut('\n✓ Thực thi thành công\n', 'o-s');
    }
  } catch (e) {
    appendOut('\n' + (e instanceof PyInterp.PyErr ? e.toString() : 'RuntimeError: ' + (e.message || String(e))) + '\n', 'o-e');
  }
}


/// ─── Run code silently (for test execution) ──────────────────
function runSilent(code, inputs = []) {
  code = sanitizeCode(code);
  let output = '';
  let hasError = false;
  let errorLine = null;  // số dòng lỗi chính xác
  let errorType = null;  // loại lỗi
  let inputIdx = 0;
  try {
    const toks = PyInterp.tokenize(code);
    const parser = new PyInterp.Parser(toks);
    const ast = parser.parse();
    const interp = new PyInterp.Interp(
      (text) => { output += text; },
      (prompt) => { if (inputIdx < inputs.length) return inputs[inputIdx++]; return '0'; }
    );
    const r = interp.run(ast);
    if (r && r.e) {
      hasError = true;
      errorLine = r.e.ln || null;
      errorType = r.e.et || null;
      output += r.e.toString();
    } else if (r && r.constructor && r.constructor.name === 'RetSig') {
      hasError = true;
      errorType = 'SyntaxError';
      output += "SyntaxError: 'return' outside function";
    }
  } catch(e) {
    hasError = true;
    if (e instanceof PyInterp.PyErr) {
      errorLine = e.ln || null;
      errorType = e.et || null;
      output += e.toString();
    } else {
      output += 'RuntimeError: ' + (e.message || String(e));
    }
  }
  return { output: output.trim(), error: hasError, errorLine, errorType };
}

function runTestCases(exId, code) {
  const tests = EXERCISE_TESTS[exId];
  if (!tests || !tests.length) return null;
  const results = [];
  let passed = 0;
  tests.forEach(t => {
    const res = runSilent(code, t.i || []);
    // Normalize: collapse whitespace, trim, lowercase for comparison
    const normalizeOut = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
    const outNorm = normalizeOut(res.output);
    const expected = (t.e || '').toLowerCase().trim();

    // Numeric tolerance: nếu expected là số, so sánh với sai số 0.01
    // Tránh lỗi float như 135.91999999 thay vì 135.92
    let pass = false;
    if (!res.error && expected) {
      const numExp = parseFloat(expected);
      if (!isNaN(numExp) && /^-?[\d.]+$/.test(expected)) {
        // Tìm số đầu tiên trong output khớp với expected (tolerance 0.01)
        const numMatches = outNorm.match(/-?[\d]+(?:\.[\d]+)?/g) || [];
        pass = numMatches.some(m => Math.abs(parseFloat(m) - numExp) < 0.01);
      } else {
        // String matching: output phải chứa expected
        pass = outNorm.includes(expected);
      }
    }

    if (pass) passed++;
    results.push({
      desc: t.d, inputs: t.i || [], expected: t.e || '',
      actual: res.output, pass, error: res.error,
      errorLine: res.errorLine,   // số dòng lỗi chính xác từ PyErr.ln
      errorType: res.errorType    // loại lỗi
    });
  });
  return { results, passed, total: tests.length, score: Math.round((passed / tests.length) * 100) };
}

// Override runCode to use better version
async function runCode() {
  const code = ci.value.trim();
  if (!code) { toast('⚠ Vui lòng nhập code Python'); return; }
  clearOut();
  await runCode_v2(code);
}

// ─── Grade code ─────────────────────────────────────────────
let rubric = [];
let ridCtr = 0;

let currentExId = '';


// ════════════════════════════════════════════════════════════════
