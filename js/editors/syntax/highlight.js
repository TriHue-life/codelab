/**
 * editors/syntax/highlight.js — VSCode Dark+ Syntax Highlighter
 * ═══════════════════════════════════════════════════════════════
 * Màu sắc chính xác theo VSCode Dark+ theme (Microsoft):
 *
 * Python:
 *   Keywords      #C586C0  — pink/magenta (if, for, def, class...)
 *   Functions     #DCDCAA  — yellow (defined function names)
 *   Builtins      #4EC9B0  — teal (print, len, range...)
 *   Strings       #CE9178  — peach/orange
 *   Numbers       #B5CEA8  — light green
 *   Comments      #6A9955  — dark green, italic
 *   Variables     #9CDCFE  — light blue (self, cls)
 *   Operators     #D4D4D4  — light grey
 *   Class names   #4EC9B0  — teal
 *   Decorators    #DCDCAA  — yellow (@decorator)
 *   Booleans      #569CD6  — blue (True, False, None)
 *   Plain text    #D4D4D4  — light grey
 *
 * HTML/CSS:
 *   Tag names     #569CD6  — blue (<div, <p, <h1...)
 *   Attributes    #9CDCFE  — light blue (class=, id=...)
 *   Attr values   #CE9178  — peach ("value")
 *   Doctype       #808080  — grey
 *   Comments      #6A9955  — green
 *   Entities      #CE9178  — peach (&amp;)
 *   CSS selectors #D7BA7D  — tan/gold
 *   CSS props     #9CDCFE  — light blue (color:, font-size:)
 *   CSS values    #CE9178  — peach (red, 12px, #fff)
 *   CSS at-rules  #C586C0  — pink (@media, @import)
 *   CSS units     #B5CEA8  — green (px, em, %)
 *
 * SQL:
 *   Keywords      #569CD6  — blue (SELECT, FROM, WHERE...)
 *   Functions     #DCDCAA  — yellow (COUNT, SUM, AVG...)
 *   Data types    #4EC9B0  — teal (INTEGER, VARCHAR...)
 *   Strings       #CE9178  — peach
 *   Numbers       #B5CEA8  — green
 *   Comments      #6A9955  — green
 *   Operators     #D4D4D4  — grey
 *   Punctuation   #D4D4D4  — grey
 *
 * @requires core/namespace.js
 */

'use strict';

CL.define('Editors.Syntax', () => {

  // ── Common escape ─────────────────────────────────────────────
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ══════════════════════════════════════════════════════════════
  //  PYTHON — VSCode Dark+ accurate
  // ══════════════════════════════════════════════════════════════

  const PY_KW = new Set([
    'False','None','True','and','as','assert','async','await',
    'break','class','continue','def','del','elif','else','except',
    'finally','for','from','global','if','import','in','is',
    'lambda','nonlocal','not','or','pass','raise','return','try',
    'while','with','yield',
  ]);
  const PY_BOOL = new Set(['True','False','None']);

  const PY_BUILTINS = new Set([
    'abs','all','any','ascii','bin','bool','breakpoint','bytearray','bytes',
    'callable','chr','classmethod','compile','complex','copyright','credits',
    'delattr','dict','dir','divmod','enumerate','eval','exec','exit',
    'filter','float','format','frozenset','getattr','globals','hasattr',
    'hash','help','hex','id','input','int','isinstance','issubclass',
    'iter','len','license','list','locals','map','max','memoryview','min',
    'next','object','oct','open','ord','pow','print','property','quit',
    'range','repr','reversed','round','set','setattr','slice','sorted',
    'staticmethod','str','sum','super','tuple','type','vars','zip',
    // common stdlib functions people use at top level
    'math','os','sys','re','json','time','datetime','random',
  ]);

  function python(code) {
    let out = '';
    let i = 0;
    const n = code.length;
    let prevWord = null;

    const span = (cls, text) => `<span class="hl-${cls}">${esc(text)}</span>`;

    while (i < n) {
      const ch = code[i];

      // ── Comment ──────────────────────────────────────────────
      if (ch === '#') {
        let j = i;
        while (j < n && code[j] !== '\n') j++;
        out += span('cmt', code.slice(i, j));
        i = j; prevWord = null;
        continue;
      }

      // ── Triple-quoted string ──────────────────────────────────
      if ((ch === '"' || ch === "'") && code[i+1] === ch && code[i+2] === ch) {
        const q = ch.repeat(3);
        let j = i + 3;
        while (j < n && code.slice(j, j+3) !== q) {
          if (code[j] === '\\') j++;
          j++;
        }
        j += 3;
        out += span('str', code.slice(i, j));
        i = j; prevWord = null;
        continue;
      }

      // ── String (f-string prefix aware) ──────────────────────
      if ((ch === '"' || ch === "'") ||
          ((ch === 'f' || ch === 'r' || ch === 'b' || ch === 'u') &&
           (code[i+1] === '"' || code[i+1] === "'"))) {
        let start = i;
        if (ch !== '"' && ch !== "'") i++;
        const q = code[i];
        let j = i + 1;
        while (j < n && code[j] !== q && code[j] !== '\n') {
          if (code[j] === '\\') j++;
          j++;
        }
        if (j < n && code[j] === q) j++;
        out += span('str', code.slice(start, j));
        i = j; prevWord = null;
        continue;
      }

      // ── Number ───────────────────────────────────────────────
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[i+1]||''))) {
        let j = i;
        if (ch === '0' && /[xXbBoO]/.test(code[i+1]||'')) {
          j += 2;
          while (j < n && /[0-9a-fA-F_]/.test(code[j])) j++;
        } else {
          while (j < n && /[0-9._eEjJ]/.test(code[j])) j++;
        }
        out += span('num', code.slice(i, j));
        i = j; prevWord = null;
        continue;
      }

      // ── Decorator ─────────────────────────────────────────────
      if (ch === '@') {
        let j = i + 1;
        while (j < n && /[\w.]/.test(code[j])) j++;
        out += span('deco', code.slice(i, j));
        i = j; prevWord = 'deco';
        continue;
      }

      // ── Identifier / keyword ──────────────────────────────────
      if (/[a-zA-Z_\u00c0-\u024f\u1ea0-\u1ef9]/.test(ch)) {
        let j = i;
        while (j < n && /[\w\u00c0-\u024f\u1ea0-\u1ef9]/.test(code[j])) j++;
        const w = code.slice(i, j);
        let cls;
        if (prevWord === 'def')   cls = 'fn';
        else if (prevWord === 'class') cls = 'cls';
        else if (w === 'self' || w === 'cls') cls = 'self';
        else if (PY_BOOL.has(w))      cls = 'bool';
        else if (PY_KW.has(w))        cls = 'kw';
        else if (PY_BUILTINS.has(w))  cls = 'bi';
        else                          cls = 'plain';
        out += span(cls, w);
        prevWord = (w === 'def' || w === 'class') ? w : null;
        i = j;
        continue;
      }

      // ── Operators ─────────────────────────────────────────────
      if (/[+\-*/%=<>!&|^~]/.test(ch)) {
        const two = code.slice(i, i+2);
        const thr = code.slice(i, i+3);
        const len = ['//=','**=','<<=','>>='].includes(thr) ? 3
                  : ['**','//','==','!=','<=','>=','+=','-=','*=','/=','%=',
                     '&=','|=','^=','<<','>>','->','**'].includes(two) ? 2 : 1;
        out += span('op', code.slice(i, i+len));
        i += len; prevWord = null;
        continue;
      }

      // ── Punctuation ───────────────────────────────────────────
      if (/[()[\]{},.:;]/.test(ch)) {
        out += span('punc', ch); i++; prevWord = null;
        continue;
      }

      // pass-through (spaces, newlines)
      out += esc(ch);
      i++;
    }
    return out;
  }

  // ══════════════════════════════════════════════════════════════
  //  HTML/CSS — VSCode Dark+ accurate
  // ══════════════════════════════════════════════════════════════

  function html(code) {
    let out = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      // ── HTML Comment ─────────────────────────────────────────
      if (code.slice(i, i+4) === '<!--') {
        const end = code.indexOf('-->', i+4);
        const j = end < 0 ? n : end + 3;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }

      // ── Doctype ───────────────────────────────────────────────
      if (code.slice(i, i+9).toLowerCase() === '<!doctype') {
        const j = code.indexOf('>', i) + 1 || n;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }

      // ── Style tag contents → CSS highlighting ────────────────
      if (code.slice(i, i+7).toLowerCase() === '<style>') {
        // Emit <style> tag
        out += `<span class="hl-tag">&lt;style&gt;</span>`;
        i += 7;
        const end = code.toLowerCase().indexOf('</style>', i);
        const cssCode = end < 0 ? code.slice(i) : code.slice(i, end);
        out += css(cssCode);
        i = end < 0 ? n : end;
        continue;
      }

      // ── Tag ───────────────────────────────────────────────────
      if (ch(code, i) === '<' && /[a-zA-Z/!]/.test(code[i+1]||'')) {
        out += `<span class="hl-punc">&lt;</span>`;
        i++;
        // Closing tag slash
        if (code[i] === '/') { out += `<span class="hl-punc">/</span>`; i++; }
        // Tag name
        let j = i;
        while (j < n && /[\w:\-]/.test(code[j])) j++;
        if (j > i) {
          out += `<span class="hl-tag">${esc(code.slice(i, j))}</span>`;
          i = j;
        }
        // Attributes until >
        while (i < n && code[i] !== '>') {
          // Self-closing slash
          if (code[i] === '/' && code[i+1] === '>') {
            out += `<span class="hl-punc">/&gt;</span>`;
            i += 2; break;
          }
          // Attribute name
          if (/[a-zA-Z_]/.test(code[i])) {
            let k = i;
            while (k < n && /[\w:\-]/.test(code[k])) k++;
            out += `<span class="hl-attr">${esc(code.slice(i, k))}</span>`;
            i = k;
            // =
            if (code[i] === '=') {
              out += `<span class="hl-punc">=</span>`;
              i++;
              // Value
              if (code[i] === '"' || code[i] === "'") {
                const q = code[i];
                let m = i + 1;
                while (m < n && code[m] !== q) m++;
                m++;
                out += `<span class="hl-attrval">${esc(code.slice(i, m))}</span>`;
                i = m;
              } else {
                let m = i;
                while (m < n && !/[\s>]/.test(code[m])) m++;
                out += `<span class="hl-attrval">${esc(code.slice(i, m))}</span>`;
                i = m;
              }
            }
          } else {
            out += esc(code[i]); i++;
          }
        }
        if (i < n && code[i] === '>') {
          out += `<span class="hl-punc">&gt;</span>`;
          i++;
        }
        continue;
      }

      // ── Entity ────────────────────────────────────────────────
      if (code[i] === '&') {
        let j = i + 1;
        while (j < n && code[j] !== ';' && !/\s/.test(code[j])) j++;
        if (j < n && code[j] === ';') {
          out += `<span class="hl-entity">${esc(code.slice(i, j+1))}</span>`;
          i = j + 1;
          continue;
        }
      }

      out += esc(code[i]); i++;
    }
    return out;
  }

  // ── CSS highlighter ───────────────────────────────────────────
  function css(code) {
    let out = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      // Comment
      if (code.slice(i, i+2) === '/*') {
        const end = code.indexOf('*/', i+2);
        const j = end < 0 ? n : end + 2;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // At-rule
      if (code[i] === '@') {
        let j = i + 1;
        while (j < n && /[\w-]/.test(code[j])) j++;
        out += `<span class="hl-css-at">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // String
      if (code[i] === '"' || code[i] === "'") {
        const q = code[i];
        let j = i + 1;
        while (j < n && code[j] !== q) { if (code[j] === '\\') j++; j++; }
        j++;
        out += `<span class="hl-str">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // Inside braces — property: value
      if (code[i] === '{') {
        out += `<span class="hl-punc">{</span>`;
        i++;
        // parse until }
        while (i < n && code[i] !== '}') {
          // Comment inside
          if (code.slice(i, i+2) === '/*') {
            const end = code.indexOf('*/', i+2);
            const j = end < 0 ? n : end + 2;
            out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
            i = j; continue;
          }
          // Property name (before colon)
          if (/[a-zA-Z-]/.test(code[i])) {
            let j = i;
            while (j < n && /[a-zA-Z0-9-]/.test(code[j])) j++;
            const prop = code.slice(i, j);
            // Check if followed by colon (property) vs part of selector
            let k = j;
            while (k < n && code[k] === ' ') k++;
            if (code[k] === ':' && code[k+1] !== ':') {
              out += `<span class="hl-css-prop">${esc(prop)}</span>`;
              out += `<span class="hl-punc">:</span>`;
              i = k + 1;
              // Value until ; or }
              while (i < n && code[i] !== ';' && code[i] !== '}') {
                if (/[0-9.]/.test(code[i])) {
                  let m = i;
                  while (m < n && /[0-9.]/.test(code[m])) m++;
                  // unit
                  let u = m;
                  while (u < n && /[a-zA-Z%]/.test(code[u])) u++;
                  if (u > m) {
                    out += `<span class="hl-num">${esc(code.slice(i, m))}</span>`;
                    out += `<span class="hl-css-unit">${esc(code.slice(m, u))}</span>`;
                    i = u;
                  } else {
                    out += `<span class="hl-num">${esc(code.slice(i, m))}</span>`;
                    i = m;
                  }
                } else if (code[i] === '#') {
                  let m = i + 1;
                  while (m < n && /[0-9a-fA-F]/.test(code[m])) m++;
                  out += `<span class="hl-css-color">${esc(code.slice(i, m))}</span>`;
                  i = m;
                } else if (code[i] === '"' || code[i] === "'") {
                  const q = code[i]; let m = i + 1;
                  while (m < n && code[m] !== q) m++; m++;
                  out += `<span class="hl-str">${esc(code.slice(i, m))}</span>`;
                  i = m;
                } else if (/[a-zA-Z-]/.test(code[i])) {
                  let m = i;
                  while (m < n && /[a-zA-Z0-9-]/.test(code[m])) m++;
                  out += `<span class="hl-css-val">${esc(code.slice(i, m))}</span>`;
                  i = m;
                } else {
                  out += esc(code[i]); i++;
                }
              }
              if (code[i] === ';') { out += `<span class="hl-punc">;</span>`; i++; }
            } else {
              // It's a selector-like fragment
              out += `<span class="hl-css-sel">${esc(prop)}</span>`;
              i = j;
            }
          } else {
            out += esc(code[i]); i++;
          }
        }
        if (i < n) { out += `<span class="hl-punc">}</span>`; i++; }
        continue;
      }
      // Selector (outside braces)
      if (/[.#a-zA-Z:*\[]/.test(code[i])) {
        let j = i;
        while (j < n && code[j] !== '{' && code[j] !== '\n' && code[j] !== '/') j++;
        const sel = code.slice(i, j);
        out += `<span class="hl-css-sel">${esc(sel)}</span>`;
        i = j; continue;
      }
      out += esc(code[i]); i++;
    }
    return out;
  }

  // ══════════════════════════════════════════════════════════════
  //  SQL — VSCode Dark+ accurate
  // ══════════════════════════════════════════════════════════════

  const SQL_KW = new Set([
    'SELECT','FROM','WHERE','AND','OR','NOT','IN','LIKE','BETWEEN','IS','NULL',
    'INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','DATABASE',
    'DROP','ALTER','ADD','COLUMN','PRIMARY','KEY','FOREIGN','REFERENCES',
    'INNER','LEFT','RIGHT','FULL','OUTER','JOIN','ON','AS','DISTINCT',
    'ORDER','BY','GROUP','HAVING','LIMIT','OFFSET','UNION','ALL','EXCEPT',
    'INTERSECT','WITH','CASE','WHEN','THEN','ELSE','END','USING',
    'GRANT','REVOKE','COMMIT','ROLLBACK','BEGIN','TRANSACTION',
    'IF','EXISTS','NOT','CONSTRAINT','INDEX','VIEW','TRIGGER',
    'UNIQUE','CHECK','DEFAULT','AUTO_INCREMENT',
  ]);

  const SQL_FUNCS = new Set([
    'COUNT','SUM','AVG','MIN','MAX','ROUND','FLOOR','CEIL','CEILING',
    'ABS','COALESCE','NULLIF','IFNULL','ISNULL','NVL',
    'UPPER','LOWER','LENGTH','SUBSTR','SUBSTRING','TRIM','LTRIM','RTRIM',
    'REPLACE','CONCAT','CONCAT_WS','LEFT','RIGHT','LPAD','RPAD','REPEAT',
    'NOW','CURDATE','CURTIME','DATE','TIME','YEAR','MONTH','DAY',
    'HOUR','MINUTE','SECOND','DATEDIFF','DATE_FORMAT','STRFTIME',
    'CAST','CONVERT','STR_TO_DATE','TO_CHAR','TO_DATE',
    'ROW_NUMBER','RANK','DENSE_RANK','LAG','LEAD','FIRST_VALUE','LAST_VALUE',
    'OVER','PARTITION',
  ]);

  const SQL_TYPES = new Set([
    'INTEGER','INT','BIGINT','SMALLINT','TINYINT','DECIMAL','NUMERIC',
    'FLOAT','REAL','DOUBLE','CHAR','VARCHAR','TEXT','BLOB','CLOB',
    'DATE','TIME','DATETIME','TIMESTAMP','BOOLEAN','BOOL','BIT',
    'BINARY','VARBINARY','JSON','UUID',
  ]);

  function sql(code) {
    let out = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      // ── Line comment ──────────────────────────────────────────
      if (code.slice(i, i+2) === '--') {
        let j = i;
        while (j < n && code[j] !== '\n') j++;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── Block comment ─────────────────────────────────────────
      if (code.slice(i, i+2) === '/*') {
        const end = code.indexOf('*/', i+2);
        const j = end < 0 ? n : end + 2;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── String ────────────────────────────────────────────────
      if (code[i] === "'" || code[i] === '"') {
        const q = code[i];
        let j = i + 1;
        while (j < n && code[j] !== q) {
          if (code[j] === '\\') j++;
          j++;
        }
        j++;
        out += `<span class="hl-str">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── Number ────────────────────────────────────────────────
      if (/[0-9]/.test(code[i]) || (code[i] === '.' && /[0-9]/.test(code[i+1]||''))) {
        let j = i;
        while (j < n && /[0-9.eE+-]/.test(code[j])) j++;
        out += `<span class="hl-num">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── Identifier / keyword ──────────────────────────────────
      if (/[a-zA-Z_]/.test(code[i])) {
        let j = i;
        while (j < n && /[\w]/.test(code[j])) j++;
        const w   = code.slice(i, j);
        const wUp = w.toUpperCase();
        let cls;
        if (SQL_KW.has(wUp))     cls = 'sql-kw';
        else if (SQL_FUNCS.has(wUp))  cls = 'sql-fn';
        else if (SQL_TYPES.has(wUp))  cls = 'sql-type';
        else                     cls = 'sql-id';
        out += `<span class="hl-${cls}">${esc(w)}</span>`;
        i = j; continue;
      }
      // ── Backtick-quoted identifier ────────────────────────────
      if (code[i] === '`') {
        let j = i + 1;
        while (j < n && code[j] !== '`') j++;
        j++;
        out += `<span class="hl-sql-id">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── Punctuation / operators ───────────────────────────────
      if (/[().,;*=<>!]/.test(code[i])) {
        out += `<span class="hl-op">${esc(code[i])}</span>`;
        i++; continue;
      }
      out += esc(code[i]); i++;
    }
    return out;
  }

  // ── Helper ─────────────────────────────────────────────────
  function ch(code, idx) { return code[idx] || ''; }

  return { python, html, css, sql };
});
