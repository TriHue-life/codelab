/**
 * graders/html.js — HTML/CSS Grader Engine v2
 * ═══════════════════════════════════════════════════════════════
 * Dùng DOMParser (built-in) để phân tích cấu trúc HTML thay vì
 * so sánh chuỗi văn bản — bỏ qua khoảng trắng, thụt lề, thứ tự attr.
 *
 * Rubric criterion formats:
 *   kw: "h1"               → kiểm tra thẻ <h1> tồn tại
 *   kw: "h1:Xin chào"      → <h1> có text chứa "Xin chào"
 *   kw: "img[src][alt]"    → <img> có cả src và alt
 *   kw: "table>tr"         → <table> chứa <tr>
 *   kw: "css:color"        → có property color trong <style>
 *   kw: "@media"           → có media query
 *   kw: "#id-name"         → element có id="id-name"
 *   kw: ".class-name"      → element có class="class-name"
 *   kw: "input[type=email]"→ <input type="email">
 *   kw: "count:li>=3"      → có ít nhất 3 thẻ <li>
 */
'use strict';

CL.define('Graders.Html', () => {

  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');

  function grade(code, exerciseId) {
    const ex = Registry.findById(exerciseId);
    if (!ex) throw new Error(`Không tìm thấy bài tập: ${exerciseId}`);

    const rb = ex.rb || [];
    if (!rb.length) throw new Error('Bài này chưa có tiêu chí chấm');

    // Parse student HTML once
    const parser = new DOMParser();
    const doc    = parser.parseFromString(code, 'text/html');

    const results = rb.map(c => {
      let passed = false;
      let errorDetail = '';
      try {
        const r = _checkRule(doc, code, c.kw || '');
        passed = r.passed;
        errorDetail = r.detail || '';
      } catch(e) { errorDetail = e.message; }
      return { ...c, passed, earned: passed ? (parseInt(c.pts)||0) : 0, errorDetail };
    });

    const total  = rb.reduce((s,r) => s + (parseInt(r.pts)||0), 0);
    const earned = results.reduce((s,r) => s + r.earned, 0);
    const score  = total > 0 ? Math.round((earned/total)*100)/10 : 0;

    const result = { mode: 'html-dom', score, results, total, earned, exercise: ex };
    Events.emit('grade:complete', result);
    return result;
  }

  // ── Rule engine ───────────────────────────────────────────────

  function _checkRule(doc, rawCode, kw) {
    if (!kw) return { passed: true };
    kw = kw.trim();

    // count:li>=3 — count elements
    const countMatch = kw.match(/^count:(.+?)(>=|<=|>|<|==?)(\d+)$/i);
    if (countMatch) {
      const [, sel, op, nStr] = countMatch;
      const n = parseInt(nStr);
      const count = doc.querySelectorAll(sel).length;
      const passed = _compareCount(count, op, n);
      return { passed, detail: passed ? '' : `Cần ${op}${n} thẻ <${sel}>, thực tế: ${count}` };
    }

    // css:property — check CSS property in <style>
    if (kw.startsWith('css:')) {
      const prop = kw.slice(4).toLowerCase().trim();
      const styleEls = doc.querySelectorAll('style');
      let found = false;
      styleEls.forEach(s => { if (s.textContent.toLowerCase().includes(prop)) found = true; });
      // Also check inline styles
      if (!found) {
        const all = doc.querySelectorAll('[style]');
        all.forEach(el => { if (el.getAttribute('style').toLowerCase().includes(prop)) found = true; });
      }
      return { passed: found, detail: found ? '' : `Không tìm thấy CSS property: ${prop}` };
    }

    // @rule — CSS at-rules (@media, @keyframes, etc.)
    if (kw.startsWith('@')) {
      const rule = kw.toLowerCase();
      const code = rawCode.toLowerCase();
      const found = code.includes(rule);
      return { passed: found, detail: found ? '' : `Không tìm thấy: ${kw}` };
    }

    // selector:text — element with text content
    if (kw.includes(':') && !kw.startsWith('http')) {
      const colonIdx = kw.indexOf(':');
      const sel  = kw.slice(0, colonIdx).trim();
      const text = kw.slice(colonIdx + 1).trim();
      const els  = doc.querySelectorAll(sel);
      const found = Array.from(els).some(el => el.textContent.toLowerCase().includes(text.toLowerCase()));
      return { passed: found, detail: found ? '' : `Thẻ <${sel}> không có text "${text}"` };
    }

    // selector[attr1][attr2] — element with attributes
    if (kw.match(/\[.+\]/)) {
      try {
        const els = doc.querySelectorAll(kw);
        return { passed: els.length > 0, detail: els.length > 0 ? '' : `Không tìm thấy: ${kw}` };
      } catch(e) {
        // Fallback: manual check
        const tagMatch = kw.match(/^([a-z]+)/i);
        const tag = tagMatch ? tagMatch[1] : '';
        const attrsRaw = [...kw.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);
        const els = tag ? doc.querySelectorAll(tag) : doc.querySelectorAll('*');
        const found = Array.from(els).some(el =>
          attrsRaw.every(attr => {
            if (attr.includes('=')) {
              const [key, val] = attr.split('=').map(s => s.replace(/['"]/g,'').trim());
              return el.getAttribute(key)?.toLowerCase() === val.toLowerCase();
            }
            return el.hasAttribute(attr);
          })
        );
        return { passed: found, detail: found ? '' : `Không tìm thấy phần tử khớp: ${kw}` };
      }
    }

    // parent>child or parent child — descendant check
    if (kw.includes('>') || (kw.includes(' ') && !kw.startsWith('.'))) {
      try {
        const els = doc.querySelectorAll(kw);
        return { passed: els.length > 0, detail: els.length > 0 ? '' : `Không tìm thấy: ${kw}` };
      } catch(e) { return { passed: false, detail: 'CSS selector lỗi: ' + e.message }; }
    }

    // Simple tag / class / id selector
    try {
      const els = doc.querySelectorAll(kw);
      return { passed: els.length > 0, detail: els.length > 0 ? '' : `Không tìm thấy thẻ/phần tử: ${kw}` };
    } catch(e) {
      // Plain text fallback
      const found = rawCode.toLowerCase().includes(kw.toLowerCase());
      return { passed: found, detail: found ? '' : `Không tìm thấy: ${kw}` };
    }
  }

  function _compareCount(count, op, n) {
    switch(op) {
      case '>=': case '=>': return count >= n;
      case '<=': case '=<': return count <= n;
      case '>':  return count > n;
      case '<':  return count < n;
      case '=':  case '==': return count === n;
      default: return false;
    }
  }

  return { grade };
});
