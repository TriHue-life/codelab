/**
 * editors/python.js — Python Code Editor
 * ═══════════════════════════════════════════════════════════════
 * Trách nhiệm:
 *   - Textarea + syntax highlight overlay
 *   - Line numbers
 *   - Mobile keyboard toolbar (Python shortcuts)
 *   - Tab / indent / dedent
 *   - Run code (→ interpreter.js)
 *
 * KHÔNG chứa: grading logic (→ Graders.Python)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, core/utils.js
 */

'use strict';

CL.define('Editors.Python', () => {

  const Events = CL.require('Events');

  // ── Syntax highlighter ────────────────────────────────────────

  const KW = new Set([
    'False','None','True','and','as','assert','async','await',
    'break','class','continue','def','del','elif','else','except',
    'finally','for','from','global','if','import','in','is',
    'lambda','not','or','pass','raise','return','try','while',
    'with','yield',
  ]);
  const BUILTINS = new Set([
    'abs','all','any','bin','bool','chr','dict','dir','divmod',
    'enumerate','eval','filter','float','format','frozenset','getattr',
    'globals','hasattr','hash','help','hex','id','input','int','isinstance',
    'issubclass','iter','len','list','locals','map','max','min','next',
    'object','oct','open','ord','pow','print','property','range','repr',
    'reversed','round','set','setattr','slice','sorted','staticmethod',
    'str','sum','super','tuple','type','vars','zip',
  ]);

  function highlight(code) {
    // Use VSCode Dark+ accurate highlighter
    if (typeof CL !== 'undefined' && CL.Editors?.Syntax?.python) {
      return CL.Editors.Syntax.python(code);
    }
    const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    let result = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      // String
      if ((code[i] === '"' || code[i] === "'")) {
        const q = code[i];
        const triple = code.slice(i, i+3) === q.repeat(3);
        const delim  = triple ? q.repeat(3) : q;
        let j = i + delim.length;
        while (j < n) {
          if (code[j] === '\\') { j += 2; continue; }
          if (code.slice(j, j + delim.length) === delim) { j += delim.length; break; }
          j++;
        }
        result += `<span class="hl-str">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // Comment
      if (code[i] === '#') {
        const eol = code.indexOf('\n', i);
        const end = eol < 0 ? n : eol;
        result += `<span class="hl-cmt">${esc(code.slice(i, end))}</span>`;
        i = end; continue;
      }
      // Number
      if (/\d/.test(code[i]) || (code[i] === '.' && /\d/.test(code[i+1]||''))) {
        let j = i;
        while (j < n && /[\d.eExXoObB_]/.test(code[j])) j++;
        result += `<span class="hl-num">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // Word
      if (/[a-zA-Z_]/.test(code[i])) {
        let j = i;
        while (j < n && /\w/.test(code[j])) j++;
        const w = code.slice(i, j);
        if (KW.has(w)) result += `<span class="hl-kw">${w}</span>`;
        else if (BUILTINS.has(w)) result += `<span class="hl-bi">${w}</span>`;
        else result += esc(w);
        i = j; continue;
      }
      result += esc(code[i]);
      i++;
    }
    return result;
  }

  // ── Editor functions ──────────────────────────────────────────

  function updateHighlight() {
    const ta  = document.getElementById('code-input');
    const hl  = document.getElementById('code-highlight');
    if (!ta || !hl) return;
    hl.innerHTML = highlight(ta.value) + '\n';
    _syncScroll(ta, hl);
  }

  function _syncScroll(ta, hl) {
    hl.scrollTop  = ta.scrollTop;
    hl.scrollLeft = ta.scrollLeft;
  }

  function updateLineNumbers() {
    const ta = document.getElementById('code-input');
    const ln = document.getElementById('line-numbers');
    if (!ta || !ln) return;
    const count = ta.value.split('\n').length;
    ln.innerHTML = Array.from({ length: count }, (_, i) => i + 1).join('\n');
    ln.scrollTop = ta.scrollTop;
  }

  // ── Tab key handler ───────────────────────────────────────────

  function handleTab(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const ta    = e.target;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const INDENT = '    '; // 4 spaces

    if (start === end) {
      // No selection: insert indent
      ta.value = ta.value.slice(0, start) + INDENT + ta.value.slice(end);
      ta.selectionStart = ta.selectionEnd = start + INDENT.length;
    } else {
      // Multi-line selection: indent/dedent block
      const lines = ta.value.split('\n');
      let cs = 0, sel_start_line = 0, sel_end_line = 0;
      for (let i = 0; i < lines.length; i++) {
        if (cs + lines[i].length + 1 > start && sel_start_line === 0) sel_start_line = i;
        if (cs + lines[i].length + 1 > end) { sel_end_line = i; break; }
        if (i === lines.length - 1) sel_end_line = i;
        cs += lines[i].length + 1;
      }
      if (e.shiftKey) {
        for (let i = sel_start_line; i <= sel_end_line; i++) {
          if (lines[i].startsWith(INDENT)) lines[i] = lines[i].slice(INDENT.length);
          else if (lines[i].startsWith(' ')) lines[i] = lines[i].replace(/^ +/, '');
        }
      } else {
        for (let i = sel_start_line; i <= sel_end_line; i++) lines[i] = INDENT + lines[i];
      }
      ta.value = lines.join('\n');
    }
    updateHighlight();
    updateLineNumbers();
  }

  // ── Mobile toolbar helpers ────────────────────────────────────

  function insertText(text) {
    const ta    = document.getElementById('code-input');
    if (!ta) return;
    const start = ta.selectionStart;
    ta.value = ta.value.slice(0, start) + text + ta.value.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = start + text.length;
    ta.focus();
    updateHighlight();
    updateLineNumbers();
  }

  function indent() {
    const ta = document.getElementById('code-input');
    if (!ta) return;
    const lines  = ta.value.split('\n');
    const curLine = ta.value.slice(0, ta.selectionStart).split('\n').length - 1;
    if (lines[curLine] !== undefined) {
      const pos = ta.selectionStart - lines.slice(0, curLine).join('\n').length - (curLine > 0 ? 1 : 0);
      lines[curLine] = '    ' + lines[curLine];
      ta.value = lines.join('\n');
      ta.selectionStart = ta.selectionEnd = ta.selectionStart + 4;
    }
    updateHighlight();
  }

  function dedent() {
    const ta = document.getElementById('code-input');
    if (!ta) return;
    const lines   = ta.value.split('\n');
    const curLine = ta.value.slice(0, ta.selectionStart).split('\n').length - 1;
    if (lines[curLine]?.startsWith('    ')) {
      lines[curLine] = lines[curLine].slice(4);
      ta.value = lines.join('\n');
      ta.selectionStart = ta.selectionEnd = Math.max(0, ta.selectionStart - 4);
    }
    updateHighlight();
  }

  // ── Get / set code ────────────────────────────────────────────

  function getCode() {
    return document.getElementById('code-input')?.value || '';
  }

  function setCode(code) {
    const ta = document.getElementById('code-input');
    if (ta) {
      ta.value = code;
      updateHighlight();
      updateLineNumbers();
    }
  }

  function clear() { setCode(''); }

  // ── Backward compat globals ───────────────────────────────────
  window.updateHighlight   = updateHighlight;
  window.updLN             = updateLineNumbers;
  window.mkInsert          = text => () => insertText(text);
  window.mkIndent          = () => indent;
  window.mkDedent          = () => dedent;

  return { highlight, updateHighlight, updateLineNumbers, handleTab,
           insertText, indent, dedent, getCode, setCode, clear };
});
