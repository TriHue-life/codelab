// ════════════════════════════════════════════════════════════════
//  ENHANCED GRADING ENGINE  v2
// ════════════════════════════════════════════════════════════════

// ── Phát hiện lỗi phổ biến trong code ───────────────────────────
function detectCommonMistakes(code) {
  const issues = [];
  const lines  = code.split('\n');

  // 1. Gán thay vì so sánh trong điều kiện: if x = 5
  lines.forEach((ln, i) => {
    if (/\bif\b.*[^=!<>]=[^=>]/.test(ln))
      issues.push({ icon:'⚠', text:`Dòng ${i+1}: Có thể dùng <b>=</b> (gán) thay vì <b>==</b> (so sánh). Ví dụ: <code>if x = 5</code> → <code>if x == 5</code>`, lineNum: i+1, rawLine: ln.trim() });
  });

  // 2. print không có ngoặc: print "abc"
  lines.forEach((ln, i) => {
    if (/\bprint\s+["']/.test(ln))
      issues.push({ icon:'⚠', text:`Dòng ${i+1}: <b>print</b> phải có dấu ngoặc trong Python 3: <code>print("Hello")</code>`, lineNum: i+1, rawLine: ln.trim() });
  });

  // 3. Quên chuyển kiểu input() → int/float
  const hasInput  = /\binput\s*\(/.test(code);
  const hasIntConv= /\bint\s*\(\s*input/.test(code) || /\bfloat\s*\(\s*input/.test(code);
  const hasMath   = /[+\-*\/]/.test(code);
  if (hasInput && hasMath && !hasIntConv) {
    const inputLineIdx = lines.findIndex(l => /=\s*input\s*\(/.test(l) && !/int\s*\(|float\s*\(/.test(l));
    issues.push({ icon:'⚠',
      text: inputLineIdx >= 0
        ? `Dòng ${inputLineIdx+1}: Dùng input() để nhập số cần chuyển kiểu: <code>int(input(...))</code> hoặc <code>float(input(...))</code>`
        : 'Nếu dùng input() để nhập số và tính toán, cần chuyển kiểu: <code>int(input(...))</code>',
      lineNum: inputLineIdx >= 0 ? inputLineIdx+1 : null,
      rawLine: inputLineIdx >= 0 ? lines[inputLineIdx].trim() : null
    });
  }

  // 4. Lặp vô hạn: while True không có break
  if (/\bwhile\s+True\b/.test(code) && !/\bbreak\b/.test(code)) {
    const wIdx = lines.findIndex(l => /\bwhile\s+True\b/.test(l));
    issues.push({ icon:'⚠', text:`Dòng ${wIdx+1}: Vòng lặp <code>while True</code> không có <code>break</code> → có thể chạy vô hạn`, lineNum: wIdx+1, rawLine: lines[wIdx].trim() });
  }

  // 5. Dùng = trong điều kiện while
  lines.forEach((ln, i) => {
    if (/\bwhile\b.*[^=!<>]=[^=>]/.test(ln))
      issues.push({ icon:'⚠', text:`Dòng ${i+1}: Kiểm tra điều kiện trong <code>while</code>: nên dùng <code>==</code> thay vì <code>=</code>`, lineNum: i+1, rawLine: ln.trim() });
  });

  // 6. Thiếu dấu thụt đầu dòng (indent) sau : — trả về lineNum chính xác
  for (let i = 0; i < lines.length - 1; i++) {
    const ln = lines[i].trim();
    if (/:\s*$/.test(ln) && /^(if|else|elif|for|while|def|class|try|except|finally)\b/.test(ln)) {
      const nextLn = lines[i+1];
      if (nextLn && nextLn.trim().length > 0 && !/^\s/.test(nextLn))
        issues.push({ icon:'🔴', text:`Dòng ${i+2}: Thiếu thụt đầu dòng (indent) sau <code>${esc(ln)}</code>`, lineNum: i+2, rawLine: lines[i+1].trim() });
    }
  }

  // 7. Chia cho 0
  lines.forEach((ln, i) => {
    if (/\/\s*0\b/.test(ln) && !/\/\//.test(ln))
      issues.push({ icon:'🔴', text:`Dòng ${i+1}: Phép chia cho 0 sẽ gây lỗi <code>ZeroDivisionError</code>`, lineNum: i+1, rawLine: ln.trim() });
  });

  // 8. Thiếu chú thích
  if (!/#/.test(code) && code.trim().split('\n').length >= 5)
    issues.push({ icon:'💬', text:'Chưa có chú thích <code>#</code>. Thêm chú thích giúp code dễ đọc hơn', lineNum: null, rawLine: null });

  // 9. Dùng == so sánh với True/False
  lines.forEach((ln, i) => {
    if (/==\s*True\b|==\s*False\b/.test(ln))
      issues.push({ icon:'💡', text:`Dòng ${i+1}: Mẹo: thay <code>if x == True</code> → <code>if x</code>; <code>if x == False</code> → <code>if not x</code>`, lineNum: i+1, rawLine: ln.trim() });
  });

  return issues;
}

// ── Phân loại lỗi test case ──────────────────────────────────
function categorizeTestFailure(t) {
  if (t.pass) return null;
  if (t.error) {
    const e = t.actual.toLowerCase();
    if (e.includes('syntaxerror'))    return { cat:'syntax',  label:'Lỗi cú pháp',   hint: buildSyntaxHint(t.actual) };
    if (e.includes('nameerror'))      return { cat:'syntax',  label:'Biến chưa khai báo', hint: buildNameHint(t.actual) };
    if (e.includes('typeerror'))      return { cat:'syntax',  label:'Sai kiểu dữ liệu',   hint: buildTypeHint(t.actual) };
    if (e.includes('valueerror'))     return { cat:'syntax',  label:'Giá trị không hợp lệ', hint:'Kiểm tra lại phép chuyển đổi kiểu <code>int()</code> / <code>float()</code>' };
    if (e.includes('indexerror'))     return { cat:'logic',   label:'Chỉ số ngoài phạm vi', hint:'Kiểm tra lại chỉ số khi truy cập phần tử mảng/list' };
    if (e.includes('zerodivision'))   return { cat:'logic',   label:'Chia cho 0', hint:'Cần kiểm tra mẫu số ≠ 0 trước khi chia' };
    if (e.includes('attributeerror')) return { cat:'syntax',  label:'Sai thuộc tính', hint:'Kiểm tra lại tên hàm/phương thức đang gọi' };
    if (e.includes('runtimeerror'))   return { cat:'logic',   label:'Lỗi runtime', hint:'' };
    return { cat:'syntax', label:'Lỗi thực thi', hint:'' };
  }
  // Logic error: runs but wrong output
  const expected = t.expected.toLowerCase();
  const actual   = t.actual.toLowerCase();
  if (!actual.trim()) return { cat:'missing', label:'Không có output', hint:'Kiểm tra xem lệnh <code>print()</code> có được gọi không' };
  // Number off by one
  const numExp = parseFloat(expected);
  if (!isNaN(numExp)) {
    const numAct = parseFloat(actual.match(/[-\d.]+/)?.[0]);
    if (!isNaN(numAct)) {
      const diff = Math.abs(numAct - numExp);
      if (diff === 1) return { cat:'logic', label:'Kết quả lệch 1 đơn vị', hint:'Kiểm tra điều kiện vòng lặp: <code>range(n)</code> vs <code>range(n+1)</code>, hoặc dấu <code>&lt;</code> vs <code>&lt;=</code>' };
      if (diff > 0 && diff < 5) return { cat:'logic', label:'Kết quả tính sai', hint:'Kiểm tra lại công thức tính toán' };
      return { cat:'logic', label:'Kết quả sai', hint:'Xem lại logic chương trình' };
    }
  }
  return { cat:'logic', label:'Output không khớp', hint:'So sánh output thực tế với yêu cầu đề bài' };
}

function buildSyntaxHint(errMsg) {
  const m = errMsg.match(/dòng\s+(\d+)/i) || errMsg.match(/line\s+(\d+)/i);
  return m ? `Lỗi cú pháp tại dòng <b>${m[1]}</b>. Kiểm tra dấu ngoặc, dấu hai chấm <code>:</code>, thụt lề` : 'Kiểm tra cú pháp: dấu ngoặc, dấu <code>:</code>, thụt lề (indent)';
}
function buildNameHint(errMsg) {
  const m = errMsg.match(/'([^']+)'/);
  return m ? `Biến hoặc hàm <code>${esc(m[1])}</code> chưa được khai báo. Kiểm tra chính tả tên biến` : 'Biến chưa được khai báo trước khi dùng';
}
function buildTypeHint(errMsg) {
  if (/str.*int|int.*str/.test(errMsg)) return 'Đang cộng/so sánh string với số. Dùng <code>int()</code> hoặc <code>str()</code> để chuyển kiểu';
  if (/unsupported.*operand/.test(errMsg)) return 'Phép toán không hợp lệ giữa các kiểu dữ liệu';
  return 'Sai kiểu dữ liệu. Kiểm tra kết quả của <code>input()</code> (luôn là string)';
}

// ── Phân tích chất lượng code ────────────────────────────────
function analyzeCodeQuality(code) {
  const items = [];
  const lines = code.split('\n').filter(l => l.trim());
  // Comment
  items.push({ label:'Chú thích', ok: /#/.test(code), warn: false });
  // Meaningful variable names (not a,b,c,x,y single letter for long code)
  const longCode = lines.length >= 8;
  const hasSingleLetter = /\b[a-z]\s*=\s*input/.test(code) || /\b[a-z]\s*=\s*int/.test(code);
  items.push({ label:'Tên biến rõ ràng', ok: !(longCode && hasSingleLetter), warn: longCode && hasSingleLetter });
  // Proper conversion
  const hasInput = /\binput\s*\(/.test(code);
  const hasConv  = /\bint\s*\(\s*input|\bfloat\s*\(\s*input/.test(code);
  if (hasInput) items.push({ label:'Chuyển kiểu input()', ok: hasConv, warn: !hasConv });
  // Error handling
  items.push({ label:'Xử lý lỗi try/except', ok: /\btry\b/.test(code), warn: true });
  // Blank lines between blocks (readability)
  let hasBlankBetweenBlocks = false;
  for(let i=0;i<lines.length-1;i++) if(lines[i].trim()==='' && /\bdef\b|\bfor\b|\bwhile\b|\bif\b/.test(lines[i+1])) { hasBlankBetweenBlocks=true; break; }
  items.push({ label:'Dòng trống phân tách', ok: hasBlankBetweenBlocks || lines.length < 8, warn: true });
  return items;
}

// ── Normalize keyword for matching ────────────────────────────────────
function normKw(k) {
  // NFC normalize to handle mobile Vietnamese input (NFD decomposed chars)
  // Remove all spaces for matching (e.g. 'A[i] > 4' matches 'A[i]>4')
  return k.normalize('NFC').replace(/\s+/g, '').toLowerCase();
}

// ── Smart keyword matching with digit boundary check ──────────────────
// Ngăn >=10 khớp nhầm với >=100, k=1 khớp nhầm với k=10, v.v.
function kwMatchSmart(txt, kw) {
  const nkw = normKw(kw);
  if (!nkw) return false;
  let start = 0;
  while (true) {
    const idx = txt.indexOf(nkw, start);
    if (idx === -1) return false;
    // Nếu keyword kết thúc bằng chữ số → kiểm tra ký tự tiếp theo không phải chữ số
    // Tránh >=10 khớp trong >=100, s=0 khớp trong s=01, count==2 trong count==20
    if (/\d$/.test(nkw)) {
      const nextChar = txt[idx + nkw.length];
      if (nextChar !== undefined && /\d/.test(nextChar)) {
        start = idx + 1; // Tìm lần khớp tiếp theo
        continue;
      }
    }
    return true;
  }
}

// ── Rubric keyword analysis (smart) ─────────────────────────────
function analyzeRubricItem(cr, code, lines) {
  const pts = parseFloat(cr.pts) || 0;
  // Bracket-aware split: don't split commas inside [] or ()
  // e.g. 'A=[1,2,3]' stays as one keyword, 'for,while' splits normally
  const kws = (function splitKw(s) {
    const out = []; let cur = '', depth = 0;
    for (const ch of s) {
      if (ch === '[' || ch === '(') { depth++; cur += ch; }
      else if (ch === ']' || ch === ')') { depth--; cur += ch; }
      else if (ch === ',' && depth === 0) { if (cur.trim()) out.push(cur.trim().toLowerCase()); cur = ''; }
      else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim().toLowerCase());
    return out;
  })(cr.kw);
  const scope = cr.line.trim();

  // Get text to check (exclude comments when checking structural keywords)
  let checkLines = scope ? [lines[parseInt(scope)-1] || ''] : lines;

  // Strip comment-only lines for structural checks
  const codeOnlyLines = checkLines.map(l => l.replace(/#.*$/, ''));
  // NFC normalize to fix mobile Vietnamese NFD input
  const checkTxt = codeOnlyLines.join('\n').normalize('NFC').toLowerCase();
  const fullTxt  = checkLines.join('\n').normalize('NFC').toLowerCase();
  // Normalize: xóa khoảng trắng để so sánh (học sinh có thể viết s = 0 hoặc s=0)
  const normCheckTxt = checkTxt.replace(/\s+/g, '');
  const normFullTxt  = fullTxt.replace(/\s+/g, '');

  // Dùng fullTxt (có comment) cho '#', dùng checkTxt (không có comment) cho từ khóa còn lại
  // Và dùng normalized version để so sánh keyword
  const getTxt = (k) => k.trim() === '#' ? normFullTxt : normCheckTxt;

  let passed = false, matchedKws = [], missingKws = [];
  if (kws.length) {
    if (cr.mode === 'all') {
      matchedKws = kws.filter(k => kwMatchSmart(getTxt(k), k));
      missingKws = kws.filter(k => !kwMatchSmart(getTxt(k), k));
      passed = missingKws.length === 0;
    } else {
      matchedKws = kws.filter(k => kwMatchSmart(getTxt(k), k));
      missingKws = kws.filter(k => !kwMatchSmart(getTxt(k), k));
      passed = matchedKws.length > 0;
    }
  } else { passed = true; }

  // Build smart hint for missing keywords
  // Ưu tiên dùng cr.hint từ EXERCISES database nếu có
  let hint = '';
  if (!passed && missingKws.length) {
    if (cr.hint) {
      hint = cr.hint;
    } else {
      hint = buildRubricHint(cr.desc, missingKws, code);
    }
  } else if (passed && cr.hint) {
    // Khi đã pass, vẫn lưu hint để hiển thị trong tab Tiêu chí
    hint = cr.hint;
  }

  const preview = scope
    ? (lines[parseInt(scope)-1] || '(dòng trống)').trim()
    : '(Toàn bộ file)';

  return { passed, pts, matchedKws, missingKws, preview, hint,
           lineNum: scope || 'all', desc: cr.desc,
           earned: passed ? pts : 0,
           status: passed ? 'pass' : (kws.length === 0 ? 'skip' : 'fail') };
}

function buildRubricHint(desc, missing, code) {
  const d = desc.toLowerCase();
  const m = missing[0] || '';
  // Extended hints with code examples
  const hints = {
    'input':  { text: 'Dùng <code>input("Nhập ...")</code> để nhận dữ liệu từ người dùng', example: 'ten = input("Nhập tên: ")' },
    'int':    { text: 'Dùng <code>int(input(...))</code> để chuyển chuỗi nhập vào thành số nguyên', example: 'n = int(input("Nhập số: "))' },
    'float':  { text: 'Dùng <code>float(input(...))</code> để chuyển chuỗi nhập vào thành số thực', example: 'x = float(input("Nhập số thực: "))' },
    'print':  { text: 'Cần có lệnh <code>print(...)</code> để in kết quả ra màn hình', example: 'print("Kết quả:", ket_qua)' },
    'if':     { text: 'Cần dùng câu lệnh điều kiện <code>if</code>', example: 'if dieu_kien:\n    # xử lý khi đúng' },
    'else':   { text: 'Cần thêm nhánh <code>else:</code> để xử lý trường hợp còn lại', example: 'if dieu_kien:\n    ...\nelse:\n    # xử lý khi sai' },
    'elif':   { text: 'Cần thêm <code>elif điều kiện:</code> cho các trường hợp khác', example: 'if a > 0:\n    ...\nelif a == 0:\n    ...\nelse:\n    ...' },
    'for':    { text: 'Dùng vòng lặp <code>for</code> để lặp qua các phần tử', example: 'for i in range(n):\n    # xử lý từng bước' },
    'while':  { text: 'Dùng vòng lặp <code>while điều kiện:</code>', example: 'while dieu_kien:\n    # lặp cho đến khi sai' },
    'range':  { text: 'Dùng <code>range(n)</code> hoặc <code>range(start, end)</code> trong vòng lặp for', example: 'for i in range(1, n+1):  # từ 1 đến n' },
    '%':      { text: 'Dùng toán tử chia lấy dư <code>%</code> để kiểm tra chia hết', example: 'if n % 2 == 0:  # n là số chẵn' },
    'def':    { text: 'Định nghĩa hàm bằng từ khóa <code>def</code>', example: 'def tinh_tong(a, b):\n    return a + b' },
    'return': { text: 'Dùng <code>return</code> để trả về giá trị từ hàm', example: 'def ham(x):\n    ket_qua = x * 2\n    return ket_qua' },
    'append': { text: 'Dùng <code>danh_sach.append(phan_tu)</code> để thêm phần tử vào list', example: 'ds = []\nfor i in range(n):\n    ds.append(int(input()))' },
    '#':      { text: 'Thêm chú thích bắt đầu bằng <code>#</code> để giải thích code', example: '# Tính tổng các số từ 1 đến n\ntong = 0' },
    'break':  { text: 'Dùng <code>break</code> để thoát vòng lặp khi đạt điều kiện', example: 'for i in range(n):\n    if dieu_kien:\n        break' },
    'in':     { text: 'Dùng toán tử <code>in</code> để kiểm tra phần tử trong danh sách', example: 'if x in danh_sach:\n    print("Có trong danh sách")' },
  };
  if (hints[m]) return hints[m].text + `<div class="code-snippet">${esc(hints[m].example)}</div>`;
  if (d.includes('sqrt') || m.includes('sqrt')) return 'Import và dùng: <code>import math</code> → <code>math.sqrt(n)</code><div class="code-snippet">import math\nket_qua = math.sqrt(n)</div>';
  if (m.includes('**')) return 'Dùng <code>**</code> để lũy thừa<div class="code-snippet">ket_qua = 2 ** 10  # = 1024</div>';
  if (d.includes('2 chiều') || d.includes('hai chiều')) return 'Tạo mảng 2D bằng list lồng nhau hoặc 2 vòng for lồng nhau<div class="code-snippet">mang = []\nfor i in range(m):\n    hang = []\n    for j in range(n):\n        hang.append(int(input()))\n    mang.append(hang)</div>';
  return `Cần có: <code>${esc(missing.join(', '))}</code> trong code`;
}

// ── Tìm dòng tốt nhất để chèn từ khóa còn thiếu ──────────────────────
function findInsertLine(code, missingKws) {
  const lines = code.split('\n');
  const m = missingKws[0] || '';

  // Quy tắc tìm dòng theo từng loại từ khóa
  const rules = [
    // Nếu thiếu else/elif → tìm dòng if gần cuối nhất
    { kws: ['else', 'elif'], find: /^\s*if\b/, label: 'sau if' },
    // Nếu thiếu return → tìm dòng def
    { kws: ['return'], find: /^\s*def\b/, label: 'trong hàm' },
    // Nếu thiếu range/for → tìm vị trí sau input
    { kws: ['range', 'for'], find: /^\s*(n|so|count|num)\s*=\s*int\s*\(/, label: 'sau khai báo biến' },
    // Nếu thiếu int/float → tìm dòng có input() không có int/float
    { kws: ['int', 'float'], find: /=\s*input\s*\((?!.*int|.*float)/, label: 'dòng nhập liệu' },
    // Nếu thiếu print → tìm dòng cuối có biến kết quả
    { kws: ['print'], find: /^\s*(ket_qua|result|tong|tb|ans|output)\s*=/, label: 'dòng kết quả' },
    // Nếu thiếu # → dòng đầu tiên
    { kws: ['#'], find: null, label: 'dòng đầu' },
  ];

  for (const rule of rules) {
    if (!rule.kws.includes(m)) continue;
    if (!rule.find) return { lineNum: 1, label: rule.label };
    // Tìm dòng khớp từ cuối lên
    for (let i = lines.length - 1; i >= 0; i--) {
      if (rule.find.test(lines[i])) {
        return { lineNum: i + 1, label: rule.label };
      }
    }
  }

  // Mặc định: tìm dòng có từ khóa liên quan nhất
  const related = {
    'else': 'if', 'elif': 'if', 'return': 'def',
    'break': 'for', 'continue': 'for', 'append': '[',
    'range': 'for', 'int': 'input', 'float': 'input'
  };
  const relKw = related[m];
  if (relKw) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].toLowerCase().includes(relKw)) {
        return { lineNum: i + 1, label: `gần dòng ${i + 1}` };
      }
    }
  }

  return null; // Không tìm được dòng cụ thể
}

// ── Phân tích chi tiết dòng code chứa/thiếu từ khóa ─────────────
function analyzeCodeLines(code, kws, lineNum) {
  const lines = code.split('\n');
  const scope = lineNum && lineNum !== 'all' ? [parseInt(lineNum) - 1] : lines.map((_, i) => i);
  const results = [];
  scope.forEach(idx => {
    const line = lines[idx];
    if (!line || !line.trim()) return;
    const lineNorm = line.normalize('NFC').replace(/#.*$/, '').replace(/\s+/g, '').toLowerCase();
    const found = kws.filter(k => lineNorm.includes(k.normalize('NFC').replace(/\s+/g, '').toLowerCase()));
    if (found.length || scope.length <= 3) {
      results.push({ lineNum: idx + 1, text: line.trim(), found });
    }
  });
  return results;
}

// ── So sánh output chi tiết (char-level diff) ────────────────────
function buildOutputDiff(actual, expected) {
  const a = (actual  || '').trim();
  const e = (expected || '').trim();
  if (!a) return { type: 'empty', html: '<span style="color:#f85149">⚠ Không có output — kiểm tra lệnh <code>print()</code></span>' };
  // Số học: so sánh giá trị
  const numA = parseFloat(a.replace(/[^\d.\-]/g, ''));
  const numE = parseFloat(e.replace(/[^\d.\-]/g, ''));
  if (!isNaN(numA) && !isNaN(numE) && numA !== numE) {
    const diff = numA - numE;
    let hint = '';
    if (Math.abs(diff) === 1) hint = '→ Lệch 1 đơn vị: kiểm tra <code>range(n)</code> vs <code>range(n+1)</code> hoặc dấu <code>&lt;</code> vs <code>&lt;=</code>';
    else if (numA === numE * 2 || numE === numA * 2) hint = '→ Kết quả gấp đôi/nửa: có thể đang tính 2 lần hoặc thiếu chia 2';
    else if (numA === numE + numE) hint = '→ Kiểm tra lại công thức tính';
    else hint = `→ Sai ${diff > 0 ? '+' : ''}${diff.toFixed(2)}: kiểm tra lại công thức`;
    return { type: 'number', hint };
  }
  // Chuỗi: so sánh từng ký tự
  const aNorm = a.toLowerCase().replace(/\s+/g, ' ');
  const eNorm = e.toLowerCase().replace(/\s+/g, ' ');
  if (aNorm === eNorm) return { type: 'case', hint: '→ Nội dung đúng nhưng sai chữ hoa/thường hoặc khoảng trắng' };
  // Tìm phần khác nhau
  const aWords = a.split(/\s+/);
  const eWords = e.split(/\s+/);
  const missingWords = eWords.filter(w => !aWords.some(aw => aw.toLowerCase() === w.toLowerCase()));
  const extraWords   = aWords.filter(w => !eWords.some(ew => ew.toLowerCase() === w.toLowerCase()));
  let hint = '';
  if (missingWords.length) hint += `→ Thiếu từ/cụm: <code>${esc(missingWords.slice(0,3).join(', '))}</code> `;
  if (extraWords.length)   hint += `→ Thừa từ/cụm: <code>${esc(extraWords.slice(0,3).join(', '))}</code>`;
  if (!hint) hint = '→ Output không khớp, kiểm tra lại nội dung in ra';
  return { type: 'string', hint };
}

// ── Tạo danh sách lỗi ưu tiên cần sửa ──────────────────────────
function buildPriorityFixes(rubricResults, testRun, mistakes) {
  const fixes = [];
  const seenErrors = new Set(); // tránh trùng lặp

  // 1. Lỗi syntax/runtime từ test cases (ưu tiên cao nhất)
  if (testRun) {
    testRun.results.filter(t => !t.pass && t.error).forEach(t => {
      const cat = categorizeTestFailure(t);
      // Ưu tiên dùng errorLine từ PyErr.ln, fallback sang parse từ text
      let errLine = t.errorLine || null;
      if (!errLine) {
        const m = (t.actual || '').match(/(?:dòng|line)\s*(\d+)/i);
        errLine = m ? parseInt(m[1]) : null;
      }
      const errKey = `${t.errorType}:${errLine}`;
      if (seenErrors.has(errKey)) return;
      seenErrors.add(errKey);
      const errFirstLine = (t.actual || '').split('\n')[0];
      fixes.push({
        level: 'error',
        lineNum: errLine,
        title: cat ? cat.label : 'Lỗi thực thi',
        detail: errFirstLine.substring(0, 100),
        hint: cat ? cat.hint : '',
        source: 'test'
      });
    });
  }

  // 2. Lỗi indent từ detectCommonMistakes (có số dòng chính xác)
  mistakes.filter(m => m.lineNum != null).forEach(m => {
    fixes.push({
      level: 'error',
      lineNum: m.lineNum,
      title: 'Thiếu thụt đầu dòng (indent)',
      detail: `Dòng ${m.lineNum}: ${(m.rawLine||'').substring(0,60)}`,
      hint: 'Thêm 4 dấu cách hoặc 1 Tab trước lệnh sau <code>if/for/while/def:</code>',
      source: 'syntax'
    });
  });

  // 3. Rubric fail — tìm dòng chính xác
  rubricResults.filter(r => r.status === 'fail').forEach(r => {
    // Nếu có số dòng cụ thể từ rubric config
    let lineNum = r.lineNum !== 'all' ? parseInt(r.lineNum) : null;
    let lineLabel = lineNum ? `Dòng ${lineNum}` : null;
    // Nếu không có số dòng, tìm dòng tốt nhất để sửa
    if (!lineNum && r.missingKws.length > 0) {
      const codeForSearch = ci ? ci.value : '';
      const found = findInsertLine(codeForSearch, r.missingKws);
      if (found) { lineNum = found.lineNum; lineLabel = found.label; }
    }
    fixes.push({
      level: 'warn',
      lineNum,
      lineLabel,
      title: r.desc,
      detail: `Thiếu: ${r.missingKws.join(', ')}`,
      hint: r.hint || buildRubricHint(r.desc, r.missingKws, ''),
      source: 'rubric'
    });
  });

  // 4. Test case logic errors
  if (testRun) {
    testRun.results.filter(t => !t.pass && !t.error).forEach(t => {
      const diff = buildOutputDiff(t.actual, t.expected);
      fixes.push({
        level: 'warn',
        lineNum: null,
        title: `Test “${t.desc}” — Output sai`,
        detail: `Nhận: “${(t.actual||'').substring(0,50)}” | Cần: “${t.expected}”`,
        hint: diff.hint || '',
        source: 'test'
      });
    });
  }

  // 5. Cảnh báo nhẹ (không có số dòng)
  mistakes.filter(m => m.lineNum == null).forEach(m => {
    fixes.push({ level: 'info', lineNum: null, title: m.text.replace(/<[^>]+>/g,'').substring(0,60), detail: '', hint: m.text, source: 'warning' });
  });

  return fixes.slice(0, 8); // Tối đa 8 mục
}

// ── MAIN GRADE FUNCTION ──────────────────────────────────────
function gradeCode() {
  if (!rubric.length) { toast('⚠ Vui lòng chọn bài tập trước khi chấm điểm.'); return; }
  const code  = sanitizeCode(ci.value);
  const lines = code.split('\n');

  let totalPts = 0, maxPts = 0, pass = 0, fail = 0, skip = 0;
  const rubricResults = [];

  rubric.forEach(cr => {
    const r = analyzeRubricItem(cr, code, lines);
    maxPts += r.pts;
    if (r.status === 'pass')  { pass++;  totalPts += r.pts; }
    else if (r.status === 'fail') { fail++; }
    else { skip++; }
    rubricResults.push(r);
  });

  // Run test cases
  const testRun = currentExId ? runTestCases(currentExId, code) : null;

  // Detect common mistakes
  const mistakes = detectCommonMistakes(code);

  // Code quality
  const quality = analyzeCodeQuality(code);

  let finalScore;
  if (testRun) {
    const testScore   = (testRun.score / 100) * 6;
    const rubricScore = maxPts > 0 ? (totalPts / maxPts) * 4 : 0;
    finalScore = Math.round((testScore + rubricScore) * 10) / 10;
  } else {
    // Scale to 10-point grade: (earned/max) * 10
    finalScore = maxPts > 0 ? Math.round((totalPts / maxPts) * 10 * 10) / 10 : 0;
  }

  renderGrade(rubricResults, finalScore, pass, fail, skip, testRun, mistakes, quality);
  switchTab('results');
  // Record score via API (fire-and-forget)
  if (typeof API !== 'undefined' && typeof currentUser !== 'undefined'
      && currentUser.role === 'student') {
    const ex = typeof EXERCISES !== 'undefined' && typeof currentExId !== 'undefined'
              ? EXERCISES.find(e => e.id === currentExId) : null;
    if (ex && API.submitScore) {
      API.submitScore(ex.id, ex.title, finalScore);
      API.logAccess('submit_score', `${ex.id}:${finalScore}`);
    }
  }
}

// ── RENDER ────────────────────────────────────────────────────

// ── Score count-up animation ─────────────────────────────────
function _animateCount(el, from, to, duration) {
  const start = performance.now();
  const update = (now) => {
    const t = Math.min((now - start) / duration, 1);
    // ease-out-expo
    const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const val = from + (to - from) * ease;
    el.textContent = val.toFixed(1);
    if (t < 1) requestAnimationFrame(update);
    else el.textContent = to.toFixed(1);
  };
  requestAnimationFrame(update);
}

// ── Stat counter (integer) ────────────────────────────────────
function _animateStat(el, to, delay) {
  setTimeout(() => {
    let cur = 0;
    const steps = Math.max(8, Math.min(to, 15));
    const iv = setInterval(() => {
      cur = Math.min(cur + Math.ceil((to - cur) * .45 + 1), to);
      el.textContent = cur;
      if (cur >= to) { clearInterval(iv); el.textContent = to; }
    }, 40);
    // Pulse the number element
    el.classList.add('pulse');
    setTimeout(() => el.classList.remove('pulse'), 450);
  }, delay);
}

// ── Confetti burst for perfect scores ────────────────────────
function _confetti(box) {
  const colors = ['#4f9eff','#34d399','#fbbf24','#a78bfa','#f87171','#34d399'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'sc-particle';
    const angle = (i / 18) * 360;
    const dist  = 55 + Math.random() * 45;
    const tx = Math.cos(angle * Math.PI / 180) * dist;
    const ty = Math.sin(angle * Math.PI / 180) * dist - 20;
    p.style.cssText = `
      left:50%;top:50%;
      background:${colors[i % colors.length]};
      --tx:${tx}px;--ty:${ty}px;
      --rot:${Math.random()*720-360}deg;
      animation:particle-fly .8s ${i * 30}ms cubic-bezier(.4,0,.2,1) both;
      border-radius:${Math.random()>0.5?'50%':'2px'};
      width:${5+Math.random()*4}px;height:${5+Math.random()*4}px;
    `;
    box.appendChild(p);
    setTimeout(() => p.remove(), 900 + i * 30);
  }
}

function renderGrade(results, score, pass, fail, skip, testRun, mistakes, quality) {
  const pct  = Math.min(score / 10, 1);
  const ring = document.getElementById('ring-fill');
  const rv   = document.getElementById('rv');
  const sg   = document.getElementById('sg');
  const box  = document.querySelector('.score-box');
  const ringWrap = document.getElementById('ring-wrap') || box?.querySelector('.ring');

  // ── Determine grade info ──────────────────────────────────
  let grade, col, bannerCls, scoreClass;
  if      (score >= 9) { grade='Xuất sắc 🏆'; col='#34d399'; bannerCls='excellent'; scoreClass='score-high'; }
  else if (score >= 8) { grade='Giỏi ⭐';      col='#58a6ff'; bannerCls='good';      scoreClass='score-high'; }
  else if (score >= 7) { grade='Khá 👍';        col='#79b8ff'; bannerCls='good';      scoreClass='score-high'; }
  else if (score >= 5) { grade='Trung bình';    col='#fbbf24'; bannerCls='average';   scoreClass='score-mid';  }
  else                 { grade='Cần cải thiện ❌'; col='#f87171'; bannerCls='poor';   scoreClass='score-low';  }

  // ── Ring animation ────────────────────────────────────────
  ring.classList.remove('score-high','score-mid','score-low');
  ring.classList.add(scoreClass);
  ringWrap?.classList.remove('score-high','score-mid','score-low');
  ringWrap?.classList.add(scoreClass);

  // Delayed ring fill (wait 120ms for layout)
  setTimeout(() => {
    ring.style.strokeDashoffset = String(270 - 270 * pct);
  }, 120);

  // ── Count-up score number ─────────────────────────────────
  rv.classList.remove('animate');
  void rv.offsetWidth; // reflow
  rv.classList.add('animate');
  rv.style.color = col;
  _animateCount(rv, 0, score, 900);

  // ── Grade label ───────────────────────────────────────────
  sg.textContent = grade;
  sg.style.color = col;
  sg.classList.remove('animate-in');
  void sg.offsetWidth;
  sg.classList.add('animate-in');

  // ── Box glow + celebrate ──────────────────────────────────
  if (box) {
    box.classList.remove('glow-high','glow-mid','glow-low','celebrate');
    void box.offsetWidth;
    box.classList.add(
      scoreClass === 'score-high' ? 'glow-high' :
      scoreClass === 'score-mid'  ? 'glow-mid'  : 'glow-low'
    );
    setTimeout(() => box.classList.add('celebrate'), 200);
    if (score >= 9.5) setTimeout(() => _confetti(box), 350);
  }

  // ── Stats counters ────────────────────────────────────────
  const sp = document.getElementById('sp');
  const sf = document.getElementById('sf');
  const ss = document.getElementById('ss');
  sp.textContent = '0'; sf.textContent = '0'; ss.textContent = '0';
  _animateStat(sp, pass, 400);
  _animateStat(sf, fail, 500);
  _animateStat(ss, skip, 600);

  const container = document.getElementById('lr');
  container.innerHTML = '';

  // ── Summary banner ─────────────────────────────────────────
  const totalFail  = (testRun ? testRun.total - testRun.passed : 0) + fail;
  const bannerIcon = score >= 9 ? '🎉' : score >= 7 ? '👍' : score >= 5 ? '🔍' : '📚';
  let bannerMsg = '';
  if (score >= 9)      bannerMsg = '<b>Xuất sắc!</b> Code chạy đúng, cấu trúc tốt, có chú thích đầy đủ.';
  else if (score >= 8) bannerMsg = `<b>Rất tốt!</b> ${totalFail > 0 ? `Còn ${totalFail} điểm cần chú ý.` : 'Hầu hết các tiêu chí đều đạt.'}`;
  else if (score >= 7) bannerMsg = `<b>Khá tốt.</b> ${totalFail > 0 ? `Cần sửa ${totalFail} lỗi để đạt điểm cao hơn.` : ''}`;
  else if (score >= 5) bannerMsg = `<b>Trung bình.</b> Code có lỗi hoặc thiếu một số yêu cầu. Xem chi tiết bên dưới.`;
  else                 bannerMsg = `<b>Cần cải thiện.</b> Code còn nhiều vấn đề. Đọc kỹ đề bài và thử lại nhé!`;

  const banner = document.createElement('div');
  banner.className = `grade-banner ${bannerCls}`;
  const totalIssues = (testRun ? testRun.total - testRun.passed : 0) + fail + mistakes.length;
  banner.innerHTML = `<span class="gb-icon">${bannerIcon}</span><div class="gb-text"><b>${bannerMsg}</b>${totalIssues > 0 ? `<span style="font-size:11px;opacity:.85">${totalIssues} vấn đề cần xử lý. Xem mục <b>↓ Cần sửa</b> bên dưới.</span>` : ''}</div>`;
  container.appendChild(banner);

  // ── PRIORITY FIX BOX ─────────────────────────────────────
  const priorityFixes = buildPriorityFixes(results, testRun, mistakes);
  if (priorityFixes.length > 0 && score < 10) {
    const pfBox = document.createElement('div');
    pfBox.className = 'fix-priority';
    const errorCount = priorityFixes.filter(f => f.level === 'error').length;
    const warnCount  = priorityFixes.filter(f => f.level === 'warn').length;
    pfBox.innerHTML = `<div class="fix-priority-hdr">🔧 Cần sửa (${priorityFixes.length} mục${errorCount > 0 ? ` — ${errorCount} lỗi nghiêm trọng` : ''})</div><div class="fix-priority-body" id="fix-list"></div>`;
    container.appendChild(pfBox);
    const fixList = pfBox.querySelector('#fix-list');
    priorityFixes.forEach((fix, i) => {
      const fi = document.createElement('div');
      fi.className = `fix-item ${fix.level === 'warn' ? 'warn-lvl' : fix.level === 'info' ? 'info-lvl' : ''}`;
      const numCls = fix.level === 'warn' ? 'warn-lvl' : fix.level === 'info' ? 'info-lvl' : '';
      const gotoLabel = fix.lineNum ? `Dòng ${fix.lineNum}` : (fix.lineLabel ? fix.lineLabel : null);
      const gotoBtn = fix.lineNum ? `<span class="fix-goto" onclick="hlLine(${fix.lineNum});event.stopPropagation()">${gotoLabel} →</span>` : (fix.lineLabel ? `<span class="fix-goto" style="cursor:default;opacity:.6">${fix.lineLabel}</span>` : '');
      const detailTxt = fix.detail ? `<div style="font-size:11px;color:var(--text3);margin-top:2px;font-family:var(--mono)">${esc(fix.detail.substring(0,80))}</div>` : '';
      const hintTxt = fix.hint ? `<div class="hint-box" style="margin-top:5px">💡 ${fix.hint}</div>` : '';
      fi.innerHTML = `<span class="fix-num ${numCls}">${i+1}</span><div class="fix-text"><b>${esc(fix.title)}</b>${detailTxt}${hintTxt}</div>${gotoBtn}`;
      if (fix.lineNum) fi.onclick = (e) => { if (!e.target.classList.contains('fix-goto')) hlLine(fix.lineNum); };
      fixList.appendChild(fi);
    });
  }

  // ── Test results ──────────────────────────────────────────
  if (testRun && testRun.results && testRun.results.length) {
    const tSec = document.createElement('div');
    tSec.className = 'grade-section';
    tSec.textContent = `🧪 Test thực thi (${testRun.passed}/${testRun.total} qua · 60% điểm)`;
    container.appendChild(tSec);

    testRun.results.forEach((t, idx) => {
      const cat = categorizeTestFailure(t);
      const td  = document.createElement('div');
      td.className = 'li ' + (t.pass ? 'pass' : 'fail') + ' collapsed';
      td.style.cssText = 'margin-bottom:5px;';

      let catBadge = '';
      if (t.pass) {
        catBadge = `<span class="err-cat ok">Đúng</span>`;
      } else if (cat) {
        catBadge = `<span class="err-cat ${cat.cat}">${cat.label}</span>`;
      }

      let inputStr = t.inputs.length
        ? `<span style="font-size:10px;color:var(--text3)"> ⌨ Input: <code style="background:var(--surface3);padding:1px 4px;border-radius:3px">${esc(t.inputs.join(', '))}</code></span>`
        : '';

      // Enhanced output diff analysis
      let detailHtml = '';
      if (!t.pass) {
        const diff = buildOutputDiff(t.actual, t.expected);
        const gotFull  = (t.actual  || '').trim();
        const wantFull = (t.expected || '').trim();
        // Build detailed comparison rows
        let compRows = `<div class="tc-analysis">`;
        if (t.error) {
          // Runtime error: show full error message with exact line number
          const errLines = gotFull.split('\n').slice(0, 5);
          const lineTag = t.errorLine
            ? ` <span class="fix-goto" style="cursor:pointer" onclick="hlLine(${t.errorLine})">Dòng ${t.errorLine} →</span>`
            : '';
          compRows += `<div class="tca-row"><span class="tca-label">Lỗi:</span><span class="tca-val got">${esc(errLines[0] || '')}${lineTag}</span></div>`;
          if (errLines.length > 1) compRows += `<div class="tca-row"><span class="tca-label"></span><span class="tca-val" style="color:var(--text3);font-size:10px">${esc(errLines.slice(1).join(' | ').substring(0,120))}</span></div>`;
          if (t.errorLine) {
            // Show the actual line from student's code
            const codeLines = (ci ? ci.value : '').split('\n');
            const errCodeLine = codeLines[t.errorLine - 1];
            if (errCodeLine) compRows += `<div class="tca-row"><span class="tca-label">Code:</span><span class="tca-val" style="font-family:var(--mono);color:var(--text2)">L${t.errorLine}: ${esc(errCodeLine.trim().substring(0,80))}</span></div>`;
          }
        } else {
          compRows += `<div class="tca-row"><span class="tca-label">✗ Nhận:</span><span class="tca-val got">${esc(gotFull.substring(0,100)) || '(không có output)'}</span></div>`;
          compRows += `<div class="tca-row"><span class="tca-label">✓ Cần:</span><span class="tca-val want">${esc(wantFull.substring(0,100))}</span></div>`;
        }
        if (diff.hint) compRows += `<div style="margin-top:5px;font-size:11.5px;color:var(--text2);line-height:1.7">${diff.hint}</div>`;
        if (cat && cat.hint) compRows += `<div class="hint-box" style="margin-top:5px">💡 <b>Gợi ý:</b> ${cat.hint}</div>`;
        compRows += `</div>`;
        detailHtml = compRows;
      }

      td.innerHTML = `
        <span class="ln-b" style="width:28px;text-align:center;flex-shrink:0">${t.pass ? '✓' : '✗'}</span>
        <div class="li-info">
          <div class="li-pre">${catBadge}${esc(t.desc)}${inputStr}</div>
          <div class="li-msg ${t.pass ? 'ok' : 'er'}">
            ${t.pass ? `✓ Output chứa <code style="background:rgba(63,185,80,.15);padding:1px 5px;border-radius:3px;color:#3fb950">${esc(t.expected)}</code>` : (t.error ? `✗ Lỗi: <span style="font-family:var(--mono);font-size:10.5px">${esc(t.actual.split('\n')[0].substring(0,70))}</span>` : `✗ Output không khớp`)}
            ${!t.pass ? `<span class="li-toggle" onclick="toggleDetail(this)">▼ Phân tích</span>` : ''}
          </div>
          <div class="li-detail">${detailHtml}</div>
        </div>
        <div class="li-pts ${t.pass ? 'pt-ok' : 'pt-er'}" style="font-size:11px">${t.pass ? '✓' : '✗'}</div>`;
      container.appendChild(td);
    });
  }

  // ── Rubric results ────────────────────────────────────────
  const rSec = document.createElement('div');
  rSec.className = 'grade-section';
  rSec.textContent = `📋 Cấu trúc code (${pass}/${pass+fail} đạt · ${testRun ? '40%' : '100%'} điểm)`;
  container.appendChild(rSec);

  const codeForAnalysis = ci ? ci.value : '';
  results.forEach(r => {
    const d = document.createElement('div');
    d.className = `li ${r.status} collapsed`;
    d.style.cssText = 'margin-bottom:5px;';

    let catBadge = '';
    if      (r.status === 'pass') catBadge = `<span class="err-cat ok">Đạt</span>`;
    else if (r.status === 'skip') catBadge = `<span class="err-cat warn">Bỏ qua</span>`;
    else {
      const kw = (r.missingKws || []).join(',').toLowerCase();
      let catType = 'missing';
      if (/input|print|int|float/.test(kw))   catType = 'syntax';
      else if (/if|else|for|while|def/.test(kw)) catType = 'logic';
      catBadge = `<span class="err-cat ${catType}">Thiếu</span>`;
    }

    const ptDisplay = r.status === 'pass'
      ? `<span style="color:#3fb950;font-weight:800">${r.earned.toFixed(1)}</span>`
      : `<span style="color:#f85149">0</span>`;

    let msgTxt = '';
    if (r.status === 'pass') {
      msgTxt = `✓ Tìm thấy: <code style="background:rgba(63,185,80,.12);padding:1px 5px;border-radius:3px;color:#3fb950">${esc(r.matchedKws.join(', ') || '—')}</code>`;
    } else if (r.status === 'skip') {
      msgTxt = '(Không cần từ khóa cụ thể)';
    } else {
      msgTxt = `✗ Chưa tìm thấy: <code style="background:rgba(248,81,73,.12);padding:1px 5px;border-radius:3px;color:#f85149">${esc(r.missingKws.join(', '))}</code>`;
    }

    // Build detailed analysis for fail items
    let detailHtml = '';
    if (r.status === 'fail') {
      const lineAnalysis = analyzeCodeLines(codeForAnalysis, r.missingKws, r.lineNum);
      let analysisHtml = '';
      if (lineAnalysis.length > 0) {
        // Show relevant lines from student's code
        const lineRows = lineAnalysis.slice(0, 4).map(la => {
          const lineEsc = esc(la.text.substring(0, 80));
          return `<div style="font-size:10.5px;color:var(--text3);font-family:var(--mono);padding:1px 0"><span style="color:var(--text3);min-width:28px;display:inline-block">L${la.lineNum}</span><span style="color:var(--text2)">${lineEsc}</span></div>`;
        }).join('');
        if (lineRows) {
          analysisHtml = `<div class="rfd-section">Code hiện tại (dòng liên quan):</div><div class="rfd-code-found">${lineRows}</div>`;
        }
      }
      const hintContent = r.hint || buildRubricHint(r.desc, r.missingKws, codeForAnalysis);
      const hintHtml = hintContent ? `<div class="hint-box">💡 <b>Cần làm:</b> ${hintContent}</div>` : '';
      detailHtml = `<div class="tc-analysis">${analysisHtml}${hintHtml}</div>`;
    } else if (r.status === 'pass' && r.matchedKws.length) {
      // Show where keywords were found
      const lineAnalysis = analyzeCodeLines(codeForAnalysis, r.matchedKws, r.lineNum);
      if (lineAnalysis.length > 0) {
        const lineRows = lineAnalysis.slice(0, 3).map(la => {
          return `<div style="font-size:10.5px;font-family:var(--mono);padding:1px 0"><span style="color:var(--text3);min-width:28px;display:inline-block">L${la.lineNum}</span><span style="color:#3fb950">${esc(la.text.substring(0,80))}</span></div>`;
        }).join('');
        detailHtml = `<div class="tc-analysis"><div class="rfd-code-found">${lineRows}</div></div>`;
      }
    }

    const hasDetail = detailHtml.length > 0;
    d.innerHTML = `
      <span class="ln-b" style="flex-shrink:0">${r.lineNum === 'all' ? 'All' : 'L'+r.lineNum}</span>
      <div class="li-info">
        <div class="li-pre">${catBadge}${esc(r.desc)}</div>
        <div class="li-msg ${r.status === 'pass' ? 'ok' : r.status === 'skip' ? '' : 'er'}">
          ${msgTxt}
          ${hasDetail ? `<span class="li-toggle" onclick="toggleDetail(this)">▼ ${r.status === 'pass' ? 'Xem code' : 'Phân tích'}</span>` : ''}
        </div>
        <div class="li-detail">${detailHtml}</div>
      </div>
      <div class="li-pts ${r.status === 'pass' ? 'pt-ok' : 'pt-er'}">${ptDisplay}<span style="font-size:9px;color:var(--text3)">/${r.pts.toFixed(1)}</span></div>`;
    d.onclick = e => { if(!e.target.classList.contains('li-toggle')) hlLine(r.lineNum); };
    container.appendChild(d);
  });

  // ── Code quality summary ──────────────────────────────────
  if (quality && quality.length) {
    renderQualityBar(quality);
  }

  // ── Mobile: "Sửa code" shortcut button ───────────────────
  // Only inject on mobile portrait (single-panel mode)
  const existingEditBtn = document.getElementById('mob-edit-btn');
  if (existingEditBtn) existingEditBtn.remove();
  const editBtn = document.createElement('div');
  editBtn.id = 'mob-edit-btn';
  editBtn.style.cssText = 'display:none;margin:10px 14px 20px;';
  editBtn.innerHTML = `<button onclick="if(window.mobilePanel)mobilePanel('editor');else{document.getElementById('editor-panel').scrollIntoView()};" style="width:100%;padding:12px;border-radius:10px;border:1px solid var(--accent);background:rgba(88,166,255,.1);color:var(--accent);font-family:var(--sans);font-size:14px;font-weight:700;cursor:pointer;-webkit-tap-highlight-color:transparent;">✏️ Quay lại sửa code</button>`;
  container.appendChild(editBtn);
  // Show only on mobile portrait
  if (typeof isMobileDevice === 'function' && isMobileDevice() && typeof isLandscapeNow === 'function' && !isLandscapeNow()) {
    editBtn.style.display = 'block';
  }
}

function toggleDetail(btn) {
  const li = btn.closest('.li');
  if (!li) return;
  const isExp = li.classList.contains('expanded');
  li.classList.toggle('expanded', !isExp);
  li.classList.toggle('collapsed', isExp);
  // Preserve original text prefix
  const origText = btn.dataset.orig || btn.textContent.replace(/^▲ /, '▼ ');
  if (!btn.dataset.orig) btn.dataset.orig = origText;
  btn.textContent = isExp ? origText : '▲ Ẩn';
}

function renderQualityBar(quality) {
  // Inject quality bar above the score box
  const scoreBox = document.querySelector('.score-box');
  if (!scoreBox) return;
  let bar = document.getElementById('quality-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'quality-bar';
    bar.className = 'quality-bar';
    scoreBox.parentNode.insertBefore(bar, scoreBox);
  }
  bar.innerHTML = '<span style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;flex-basis:100%">Chất lượng code</span>';
  quality.forEach(q => {
    const cls = q.ok ? 'qb-ok' : q.warn ? 'qb-warn' : 'qb-bad';
    const item = document.createElement('div');
    item.className = 'qb-item';
    item.innerHTML = `<span class="qb-dot ${cls}"></span>${q.label}`;
    bar.appendChild(item);
  });
}

function hlLine(ln) {
  if (ln === 'all') return;
  const lines = ci.value.split('\n'); let pos = 0;
  for (let i = 0; i < ln - 1 && i < lines.length; i++) pos += lines[i].length + 1;
  ci.focus(); ci.setSelectionRange(pos, pos + (lines[ln - 1] || '').length);
}

async function runAndGrade() { clearOut(); await runCode_v2(ci.value.trim()); setTimeout(gradeCode, 200); }

function clearAll() {
  ci.value = ''; updLN(); updateHighlight(); clearOut();
  document.getElementById('lr').innerHTML = '<div class="empty"><div class="empty-i">📋</div>Nhấn <b>Chấm điểm</b> để xem kết quả</div>';
  document.getElementById('rv').textContent = '—';
  document.getElementById('rv').style.color = '';
  document.getElementById('sg').textContent = 'Chưa chấm';
  document.getElementById('sg').style.color = 'var(--text3)';
  const ring = document.getElementById('ring-fill');
  ring.style.strokeDashoffset = '270';
  ring.classList.remove('score-high','score-mid','score-low');
  document.querySelector('.ring')?.classList.remove('score-high','score-mid','score-low');
  const box = document.querySelector('.score-box');
  if (box) box.classList.remove('glow-high','glow-mid','glow-low','celebrate');
  ['sp','sf','ss'].forEach(id => document.getElementById(id).textContent = '—');
}

// ─── Rubric ─────────────────────────────────────────────────
function addRubric(data = {}) {
  const id = ++ridCtr;
  const div = document.createElement('div'); div.className = 'rr'; div.dataset.id = id;
  div.innerHTML = `<div class="rr-h"><span class="rlbl">#${id}</span><input class="ri" type="text" placeholder="Mô tả (VD: Dùng vòng lặp for)" value="${esc(data.desc||'')}"><button class="del-btn" onclick="delRubric(${id})">✕</button></div><div class="rr-b"><span class="mini">Dòng</span><input class="rp" type="text" placeholder="1" value="${esc(String(data.line||''))}" style="width:38px" title="Số dòng hoặc để trống = toàn file"><span class="mini">Từ khóa</span><input class="rk" type="text" placeholder="for, while, range" value="${esc(data.kw||'')}"><span class="mini">Điểm</span><input class="rp" type="number" min="0" max="10" step="0.5" value="${data.pts||1}"></div><div class="rr-b"><span class="mini">Chế độ</span><select class="rs"><option value="any" ${data.mode!=='all'?'selected':''}>OR (bất kỳ)</option><option value="all" ${data.mode==='all'?'selected':''}>AND (tất cả)</option></select></div>`;
  document.getElementById('rc').appendChild(div);
}
function delRubric(id) { document.querySelector(`[data-id="${id}"]`)?.remove(); }
function saveRubric() {
  rubric = [];
  document.querySelectorAll('#rc .rr').forEach(row => {
    const ins = row.querySelectorAll('input'); const sel = row.querySelector('select');
    rubric.push({ desc: ins[0].value.trim(), line: ins[1].value.trim(), kw: ins[2].value.trim(), pts: parseFloat(ins[3].value)||1, mode: sel?.value||'any' });
  });
  toast(`✓ Đã lưu ${rubric.length} tiêu chí`);
}
function loadSample() {
  document.getElementById('rc').innerHTML = ''; ridCtr = 0;
  const sample = [
    {desc:'Sử dụng hàm print()',line:'',kw:'print',pts:1,mode:'any'},
    {desc:'Dùng biến (phép gán =)',line:'',kw:'=',pts:1,mode:'any'},
    {desc:'Nhận dữ liệu với input()',line:'',kw:'input',pts:1.5,mode:'any'},
    {desc:'Câu lệnh điều kiện if/elif/else',line:'',kw:'if, elif, else',pts:2,mode:'any'},
    {desc:'Vòng lặp for hoặc while',line:'',kw:'for, while',pts:2,mode:'any'},
    {desc:'Định nghĩa hàm def',line:'',kw:'def',pts:1.5,mode:'any'},
    {desc:'Có chú thích (#)',line:'',kw:'#',pts:1,mode:'any'},
  ];
  sample.forEach(s => addRubric(s)); saveRubric(); toast('📥 Đã tải tiêu chí mẫu');
}

function switchTab(name) {
  // Update tab buttons by ID
  ['results','criteria','theory'].forEach(t => {
    const btn = document.getElementById('tab-btn-' + t);
    if (btn) btn.classList.toggle('on', t === name);
  });
  // Update tab content panels
  document.querySelectorAll('.tc').forEach(c => c.classList.toggle('on', c.id === 'tab-' + name));
}

function loadExample() {
  ci.value = `# Nhập code Python của bạn vào đây...`;
  updLN(); updateHighlight(); toast('📋 Đã tải ví dụ');
}

// ─── Utils ──────────────────────────────────────────────────
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function toast(msg, d = 2500) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), d); }

// ── Init ───────────────────────────────────────────────────
loadSample();

// ══════════════════════════════════════════════════════════════
//  EXERCISE DATABASE  (K10 + K11 từ đề cương)
// ══════════════════════════════════════════════════════════════
