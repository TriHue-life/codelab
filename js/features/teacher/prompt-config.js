/**
 * features/teacher/prompt-config.js — Quản lý Prompt Templates
 * ═══════════════════════════════════════════════════════════════
 * Kiến trúc 2 tầng:
 *   Tầng 1 — System Prompt (ẩn, chuẩn CT2018, hardcode)
 *     → Không cần GV quan tâm, đảm bảo chất lượng baseline
 *   Tầng 2 — User Template (GV chỉnh trong ⚙️)
 *     → Biến: {{bloom}}, {{bloom_desc}}, {{grade}}, {{type}}
 *             {{content}}, {{count}}, {{chapter}}, {{examples}}
 *
 * Few-shot: tự động lấy 2 bài mẫu từ ngân hàng đúng type + bloom
 *   → AI học phong cách viết bài của ngân hàng hiện có
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Teacher.PromptConfig', () => {
  const Utils    = CL.require('Utils');
  const Toast    = CL.require('UI.Toast');
  const Registry = CL.require('Exercises.Registry');

  const LS_PREFIX = 'cl_prompt_';

  // ══════════════════════════════════════════════════════════════
  //  SYSTEM PROMPTS (Tầng 1 — ẩn, chuẩn CT GDPT 2018)
  //  Cố định, đảm bảo output đúng định dạng + ngữ cảnh
  // ══════════════════════════════════════════════════════════════
  const SYSTEM_PROMPTS = {
    python: `Bạn là chuyên gia giáo dục Tin học THPT Việt Nam, chuyên soạn bài tập lập trình Python theo Chương trình GDPT 2018.

NGUYÊN TẮC SOẠN BÀI:
• Ngôn ngữ Python 3, phù hợp THPT — dùng input(), print(), f-string, list, dict, hàm
• Bài tập phải có ứng dụng thực tế, gần gũi với học sinh Việt Nam
• Đề bài rõ ràng: Input → Processing → Output
• Câu hỏi theo Bloom: B1(nhận biết) → B6(sáng tạo), tăng dần độ phức tạp
• Mỗi bài có code mẫu chạy được 100%, có expected_output chính xác
• Tích hợp các năng lực CT2018: NL1(tư duy máy tính), NL2(giải quyết vấn đề), NL3(ứng dụng)

ĐỊNH DẠNG OUTPUT — Chỉ trả về JSON array, không markdown, không giải thích:`,

    html: `Bạn là chuyên gia giáo dục Tin học THPT Việt Nam, chuyên soạn bài tập HTML/CSS theo Chương trình GDPT 2018.

NGUYÊN TẮC SOẠN BÀI:
• HTML5 + CSS3 thuần, không dùng JavaScript (trừ B5-B6)
• Bài tập thiết kế giao diện web thực tế: trang cá nhân, sản phẩm, trường học
• Tăng dần: B1(nhận dạng tag) → B6(thiết kế layout hoàn chỉnh)
• Code mẫu phải render được ngay trong browser
• Chú trọng semantic HTML, accessibility, responsive cơ bản

ĐỊNH DẠNG OUTPUT — Chỉ trả về JSON array, không markdown, không giải thích:`,

    sql: `Bạn là chuyên gia giáo dục Tin học THPT Việt Nam, chuyên soạn bài tập SQL/CSDL theo Chương trình GDPT 2018.

NGUYÊN TẮC SOẠN BÀI:
• SQL chuẩn SQLite, phù hợp SGK Tin học 11 KNTT
• CSDL thực tế: quản lý học sinh, bán hàng, thư viện, âm nhạc
• B1-B2: SELECT cơ bản; B3-B4: JOIN, GROUP BY; B5-B6: subquery, DDL
• Cung cấp sẵn CSDL mẫu (CREATE TABLE + INSERT) trong sample_db
• Code mẫu là câu SQL đúng, chạy được trên SQLite

ĐỊNH DẠNG OUTPUT — Chỉ trả về JSON array, không markdown, không giải thích:`,
  };

  // Schema JSON output (nhúng vào system prompt)
  const JSON_SCHEMA = `
[
  {
    "title": "Tiêu đề 5-8 từ",
    "desc": "<b>Đề bài:</b> HTML mô tả...<br><b>Input:</b> ...<br><b>Output:</b><pre class=\\"ex-code\\">...</pre>",
    "solution": "code mẫu chạy được",
    "expected_output": "output thuần text khi chạy code với sample_input",
    "sample_input": "input mẫu (rỗng nếu không có)",
    "keywords": ["từ_khóa_kỹ_thuật"],
    "nl": "NL2c"
  }
]`;

  // ══════════════════════════════════════════════════════════════
  //  DEFAULT USER TEMPLATES (Tầng 2 — GV chỉnh được)
  // ══════════════════════════════════════════════════════════════
  const DEFAULT_TEMPLATES = {
    python: `Tạo CHÍNH XÁC {{count}} bài tập Python mức {{bloom}} – {{bloom_desc}} cho:
• Lớp: {{grade}}
• Bài/Chủ đề: {{chapter}}

NỘI DUNG BÀI HỌC:
{{content}}

{{examples}}

YÊU CẦU:
• Số câu: đúng {{count}} câu, không hơn không kém
• Độ khó: phù hợp {{bloom}} ({{bloom_desc}})
• Ngữ cảnh: gần gũi học sinh THPT Việt Nam
• Code mẫu: chạy được, ngắn gọn, dễ hiểu`,

    html: `Tạo CHÍNH XÁC {{count}} bài tập HTML/CSS mức {{bloom}} – {{bloom_desc}} cho:
• Lớp: {{grade}}
• Bài/Chủ đề: {{chapter}}

NỘI DUNG BÀI HỌC:
{{content}}

{{examples}}

YÊU CẦU:
• Số câu: đúng {{count}} câu
• Code mẫu HTML/CSS đầy đủ, render được ngay
• Mô tả giao diện rõ ràng (màu sắc, layout, nội dung mẫu)`,

    sql: `Tạo CHÍNH XÁC {{count}} bài tập SQL mức {{bloom}} – {{bloom_desc}} cho:
• Lớp: {{grade}}
• Bài/Chủ đề: {{chapter}}

NỘI DUNG BÀI HỌC:
{{content}}

{{examples}}

YÊU CẦU:
• Số câu: đúng {{count}} câu
• Dùng CSDL mẫu đã cung cấp ở phần few-shot (nếu có)
• SQL chuẩn SQLite, không dùng function đặc thù MySQL/PostgreSQL`,
  };

  // ══════════════════════════════════════════════════════════════
  //  LOAD / SAVE TEMPLATES
  // ══════════════════════════════════════════════════════════════
  function getTemplate(type) {
    return localStorage.getItem(LS_PREFIX + type) || DEFAULT_TEMPLATES[type] || DEFAULT_TEMPLATES.python;
  }

  function saveTemplate(type, tmpl) {
    localStorage.setItem(LS_PREFIX + type, tmpl);
  }

  function resetTemplate(type) {
    localStorage.removeItem(LS_PREFIX + type);
  }

  function isCustomized(type) {
    return !!localStorage.getItem(LS_PREFIX + type);
  }

  // ══════════════════════════════════════════════════════════════
  //  FEW-SHOT BUILDER
  //  Tự động chọn 2 bài mẫu từ ngân hàng đúng type + bloom gần
  // ══════════════════════════════════════════════════════════════
  function buildFewShot(type, bloom, count = 2) {
    try {
      const all = Registry.getAll();
      const bloomNum = parseInt(bloom.replace('B','')) || 3;

      // Tìm bài cùng type + bloom gần nhất, ưu tiên có tc[]
      const candidates = all.filter(ex => {
        const exType  = ex.type || 'python';
        const exBloom = parseInt((ex.lv||'').match(/B(\d)/)?.[1] || '3');
        const typeMismatch = exType !== type;
        const bloomDiff    = Math.abs(exBloom - bloomNum);
        return !typeMismatch && bloomDiff <= 1;
      });

      // Ưu tiên: có tc[] > có rb[] > bất kỳ
      const sorted = candidates.sort((a, b) => {
        const scoreA = (a.tc?.length ? 3 : 0) + (a.rb?.length ? 1 : 0);
        const scoreB = (b.tc?.length ? 3 : 0) + (b.rb?.length ? 1 : 0);
        return scoreB - scoreA;
      });

      const picked = sorted.slice(0, count);
      if (!picked.length) return '';

      // Format thành few-shot block
      const examplesStr = picked.map((ex, i) => {
        // Làm sạch desc
        const cleanDesc = (ex.desc||'').replace(/<[^>]+>/g, '')
          .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&')
          .replace(/\s+/g,' ').trim().slice(0, 300);

        const obj = {
          title:           ex.title || '',
          desc:            ex.desc  || '',
          solution:        ex.solution || ex._solution || '',
          expected_output: ex.tc?.[0]?.expected || '',
          sample_input:    ex.tc?.[0]?.input    || '',
          keywords:        ex.rb?.map(r => r.kw).filter(Boolean) || [],
          nl:              ex.nl?.[0] || 'NL2c',
        };
        return JSON.stringify(obj, null, 2);
      }).join(',\n');

      return `VÍ DỤ BÀI TẬP MẪU (phong cách tương tự — KHÔNG copy, chỉ tham khảo):
\`\`\`json
[
${examplesStr}
]
\`\`\``;
    } catch(e) {
      console.warn('Few-shot build failed:', e.message);
      return '';
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  BUILD FULL PROMPT (kết hợp system + template + few-shot)
  // ══════════════════════════════════════════════════════════════
  const BLOOM_DESCS = {
    B1:'Nhận biết — nhận dạng cú pháp, điền vào chỗ trống, đọc code đơn giản',
    B2:'Hiểu — giải thích khái niệm, dự đoán output, phân biệt đúng/sai',
    B3:'Áp dụng — viết code hoàn chỉnh giải bài toán cụ thể có I/O rõ',
    B4:'Phân tích — tìm lỗi, so sánh giải pháp, phân tích độ phức tạp',
    B5:'Đánh giá — chọn giải pháp tốt nhất, tối ưu code, đánh giá hiệu quả',
    B6:'Sáng tạo — thiết kế tổng hợp, mở rộng bài toán thực tế, kết hợp kỹ năng',
  };

  function buildPrompt({ type, bloom, grade, chapter, content, count }) {
    const bloomDesc = BLOOM_DESCS[bloom] || bloom;
    const fewShot   = buildFewShot(type, bloom, 2);
    const tmpl      = getTemplate(type);

    // Render template variables
    const userMsg = tmpl
      .replace(/\{\{bloom\}\}/g,       bloom)
      .replace(/\{\{bloom_desc\}\}/g,  bloomDesc)
      .replace(/\{\{grade\}\}/g,       grade)
      .replace(/\{\{chapter\}\}/g,     chapter)
      .replace(/\{\{content\}\}/g,     content)
      .replace(/\{\{count\}\}/g,       String(count))
      .replace(/\{\{type\}\}/g,        type)
      .replace(/\{\{examples\}\}/g,    fewShot);

    const systemMsg = (SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.python) + '\n' + JSON_SCHEMA;

    return { systemMsg, userMsg };
  }

  // ══════════════════════════════════════════════════════════════
  //  RENDER — Tab Prompt trong config
  // ══════════════════════════════════════════════════════════════
  function renderTab(el) {
    const types = [
      { id:'python', icon:'🐍', label:'Python (K10/K11)' },
      { id:'html',   icon:'🌐', label:'HTML/CSS (K12)'   },
      { id:'sql',    icon:'🗃', label:'SQL (K11)'         },
    ];
    let activeType = 'python';

    el.innerHTML = `
      <div class="prc-wrap">
        <div class="prc-header">
          <div class="prc-title">📝 Cấu hình Prompt AI</div>
          <div class="prc-subtitle">
            Kiến trúc 2 tầng: System Prompt (ẩn, chuẩn CT2018) + Template (GV tùy chỉnh)
          </div>
        </div>

        <!-- Type tabs -->
        <div class="prc-type-tabs">
          ${types.map(t => `
            <button class="prc-type-tab ${t.id==='python'?'active':''}"
              id="prc-tab-${t.id}"
              onclick="CL.Teacher.PromptConfig.switchType('${t.id}')">
              ${t.icon} ${t.label}
              ${isCustomized(t.id) ? '<span class="prc-custom-badge">✏️</span>' : ''}
            </button>`).join('')}
        </div>

        <!-- System prompt preview (readonly) -->
        <div class="prc-section">
          <div class="prc-section-header">
            <span class="prc-section-title">🔒 System Prompt (tự động, ẩn với GV)</span>
            <button class="prc-btn-ghost prc-toggle-sys"
              onclick="CL.Teacher.PromptConfig.toggleSystem()">👁 Xem</button>
          </div>
          <div id="prc-system-body" style="display:none">
            <div class="prc-system-hint">
              Context cố định về CT GDPT 2018, chuẩn đầu ra JSON. GV không cần sửa.
            </div>
            <pre class="prc-system-pre" id="prc-system-content"></pre>
          </div>
        </div>

        <!-- User template editor -->
        <div class="prc-section">
          <div class="prc-section-header">
            <span class="prc-section-title">✏️ Template người dùng</span>
            <div style="display:flex;gap:6px">
              <button class="prc-btn-ghost" onclick="CL.Teacher.PromptConfig.previewFewShot()">
                🔍 Xem few-shot
              </button>
              <button class="prc-btn-ghost" onclick="CL.Teacher.PromptConfig.resetCurrent()">
                ↺ Về mặc định
              </button>
              <button class="prc-btn-primary" onclick="CL.Teacher.PromptConfig.saveCurrent()">
                💾 Lưu
              </button>
            </div>
          </div>

          <div class="prc-vars">
            <span class="prc-var-label">Biến có sẵn:</span>
            ${['{{bloom}}','{{bloom_desc}}','{{grade}}','{{chapter}}',
               '{{content}}','{{count}}','{{examples}}'].map(v =>
              `<code class="prc-var">${v}</code>`).join('')}
          </div>

          <textarea id="prc-editor" class="prc-editor"
            spellcheck="false" rows="18"></textarea>
        </div>

        <!-- Few-shot preview -->
        <div class="prc-section" id="prc-fewshot-section" style="display:none">
          <div class="prc-section-title">🎯 Few-shot preview (2 bài mẫu từ ngân hàng)</div>
          <div class="prc-fewshot-hint">
            Hệ thống tự động chọn 2 bài có cùng type + Bloom gần nhất làm ví dụ.
            AI học phong cách từ đây, không copy nguyên bài.
          </div>
          <pre class="prc-fewshot-pre" id="prc-fewshot-content"></pre>
        </div>

        <!-- Test prompt -->
        <div class="prc-section">
          <div class="prc-section-title">🧪 Preview prompt đầy đủ</div>
          <div class="prc-test-row">
            <input id="prc-test-content" class="prc-test-input" type="text"
              placeholder="Nhập 1-2 câu nội dung bài học để xem prompt thực tế..."
              value="Biến là tên đại diện cho giá trị. Python tự nhận kiểu: x=10 (int), s='hello' (str)">
            <select id="prc-test-bloom" class="prc-test-sel">
              ${['B1','B2','B3','B4','B5','B6'].map(b =>
                `<option ${b==='B3'?'selected':''}>${b}</option>`).join('')}
            </select>
            <button class="prc-btn-primary" onclick="CL.Teacher.PromptConfig.previewFull()">
              🔍 Preview
            </button>
          </div>
          <div id="prc-preview-out" style="display:none">
            <div class="prc-preview-tabs">
              <button class="prc-ptab active" onclick="CL.Teacher.PromptConfig.switchPreview('system',this)">System</button>
              <button class="prc-ptab" onclick="CL.Teacher.PromptConfig.switchPreview('user',this)">User</button>
            </div>
            <pre class="prc-preview-pre" id="prc-preview-system"></pre>
            <pre class="prc-preview-pre" id="prc-preview-user" style="display:none"></pre>
          </div>
        </div>

      </div>`;

    // Load initial content
    _loadEditorContent('python');
  }

  let _currentType = 'python';

  function switchType(type) {
    _currentType = type;
    document.querySelectorAll('.prc-type-tab').forEach(b =>
      b.classList.toggle('active', b.id === 'prc-tab-' + type));
    _loadEditorContent(type);
    document.getElementById('prc-fewshot-section').style.display = 'none';
  }

  function _loadEditorContent(type) {
    const ed = document.getElementById('prc-editor');
    if (ed) ed.value = getTemplate(type);
    const sysEl = document.getElementById('prc-system-content');
    if (sysEl) sysEl.textContent = (SYSTEM_PROMPTS[type]||'') + '\n[JSON Schema...]\n';
  }

  function toggleSystem() {
    const body = document.getElementById('prc-system-body');
    if (body) body.style.display = body.style.display === 'none' ? '' : 'none';
  }

  function saveCurrent() {
    const ed  = document.getElementById('prc-editor');
    if (!ed?.value?.trim()) return;
    saveTemplate(_currentType, ed.value);
    // Update badge
    const tab = document.getElementById('prc-tab-' + _currentType);
    if (tab && !tab.querySelector('.prc-custom-badge')) {
      const b = document.createElement('span');
      b.className = 'prc-custom-badge'; b.textContent = '✏️';
      tab.appendChild(b);
    }
    Toast.success(`✅ Đã lưu template ${_currentType.toUpperCase()}`);
  }

  function resetCurrent() {
    resetTemplate(_currentType);
    const ed = document.getElementById('prc-editor');
    if (ed) ed.value = DEFAULT_TEMPLATES[_currentType] || '';
    // Remove badge
    document.getElementById('prc-tab-' + _currentType)
      ?.querySelector('.prc-custom-badge')?.remove();
    Toast.info('↺ Đã reset về mặc định');
  }

  function previewFewShot() {
    const section = document.getElementById('prc-fewshot-section');
    const content = document.getElementById('prc-fewshot-content');
    if (!section || !content) return;
    const bloom   = document.getElementById('prc-test-bloom')?.value || 'B3';
    const fewShot = buildFewShot(_currentType, bloom, 2);
    content.textContent = fewShot || '(Chưa có bài mẫu phù hợp trong ngân hàng)';
    section.style.display = '';
  }

  function previewFull() {
    const content = document.getElementById('prc-test-content')?.value || '';
    const bloom   = document.getElementById('prc-test-bloom')?.value  || 'B3';
    const out     = document.getElementById('prc-preview-out');
    const sysPre  = document.getElementById('prc-preview-system');
    const usrPre  = document.getElementById('prc-preview-user');
    if (!out || !sysPre || !usrPre) return;

    const { systemMsg, userMsg } = buildPrompt({
      type: _currentType, bloom, grade: 'K10',
      chapter: 'Bài 17: Biến và lệnh gán',
      content, count: 2,
    });

    sysPre.textContent = systemMsg;
    usrPre.textContent = userMsg;
    out.style.display  = '';

    // Token estimate
    const totalChars = systemMsg.length + userMsg.length;
    const est = Math.round(totalChars / 4);
    Toast.info(`~${est.toLocaleString()} tokens input · ước tính $${(est/1000000*3).toFixed(4)}`);
  }

  function switchPreview(which, btn) {
    document.querySelectorAll('.prc-ptab').forEach(b => b.classList.toggle('active', b === btn));
    document.getElementById('prc-preview-system').style.display = which==='system' ? '' : 'none';
    document.getElementById('prc-preview-user').style.display   = which==='user'   ? '' : 'none';
  }

  return {
    renderTab, switchType, toggleSystem, saveCurrent, resetCurrent,
    previewFewShot, previewFull, switchPreview,
    // Public API for ai-generator.js
    buildPrompt, getTemplate, buildFewShot, BLOOM_DESCS, JSON_SCHEMA,
  };
});
