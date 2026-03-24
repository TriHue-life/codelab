/**
 * features/teacher/ai-generator.js — AI Sinh bài tập từ nội dung SGK
 * ═══════════════════════════════════════════════════════════════
 * Dùng Claude API (claude-haiku-4-5 để parse, claude-sonnet-4-6 để sinh)
 * Không cần server — gọi trực tiếp từ browser với API key của GV
 *
 * Luồng:
 *   1. GV nhập API key (lưu localStorage cl_claude_key)
 *   2. GV nhập/paste nội dung bài SGK (text hoặc upload PDF→text)
 *   3. Cấu hình: lớp, bài, số câu/Bloom, loại bài (python/html/sql)
 *   4. AI sinh → stream kết quả từng câu
 *   5. GV review inline, sửa nếu cần
 *   6. Validate: chạy Pyodide để verify expected output
 *   7. Lưu vào ngân hàng bài (Sheets)
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Teacher.AIGenerator', () => {
  const Utils    = CL.require('Utils');
  const Toast    = CL.require('UI.Toast');
  const Registry = CL.require('Exercises.Registry');

  const LS_KEY = 'cl_claude_key';
  const MODEL  = 'claude-haiku-4-5-20251001';   // haiku: nhanh + rẻ (~$0.01/bài)
  const MODEL_SMART = 'claude-sonnet-4-6';       // sonnet: khi cần chất lượng cao

  let _generated = [];   // { exercise, status:'pending'|'ok'|'edit'|'skip' }
  let _isRunning = false;

  // ══════════════════════════════════════════════════════════════
  //  MAIN RENDER
  // ══════════════════════════════════════════════════════════════
  function render(el) {
    const hasKey = !!_getKey();
    el.innerHTML = `
      <div class="aig-wrap">

        <!-- API Key setup -->
        <div class="aig-key-bar ${hasKey ? 'aig-key-ok' : ''}">
          <div class="aig-key-left">
            ${hasKey
              ? `<span class="aig-key-status">🔑 API Key đã cấu hình</span>`
              : `<span class="aig-key-status aig-key-missing">⚠️ Chưa có API Key</span>`}
          </div>
          <button class="aig-btn-ghost" onclick="CL.Teacher.AIGenerator.showKeyDialog()">
            ${hasKey ? '✏️ Đổi key' : '+ Thêm API Key'}
          </button>
        </div>

        <!-- Content input -->
        <div class="aig-section">
          <div class="aig-section-title">📄 1. Nội dung bài học</div>
          <div class="aig-hint">
            Paste nội dung từ SGK, slide, hoặc gõ trực tiếp. AI sẽ hiểu và sinh bài tập phù hợp.
          </div>
          <textarea id="aig-content" class="aig-textarea"
            placeholder="Ví dụ: Bài 17 — Biến và lệnh gán&#10;&#10;1. Biến (Variable)&#10;Biến là tên đại diện cho một giá trị trong bộ nhớ...&#10;&#10;Ví dụ: x = 10, ten = 'An', diem = 8.5&#10;&#10;2. Kiểu dữ liệu: int, float, str, bool..."
            rows="8">${_lastContent || ''}</textarea>
          <div class="aig-char-count" id="aig-char-count">0 ký tự</div>
        </div>

        <!-- Config -->
        <div class="aig-section">
          <div class="aig-section-title">⚙️ 2. Cấu hình</div>
          <div class="aig-config-grid">

            <div class="aig-field">
              <label class="aig-label">Lớp</label>
              <select id="aig-grade" class="aig-select">
                <option value="K10">🐍 Lớp 10 – Python</option>
                <option value="K11">🐍 Lớp 11 – Python</option>
                <option value="K11-SQL">🗃 Lớp 11 – SQL</option>
                <option value="K12-CTST">🌐 Lớp 12 – HTML (CTST)</option>
                <option value="K12-KNTT">🌐 Lớp 12 – HTML (KNTT)</option>
              </select>
            </div>

            <div class="aig-field">
              <label class="aig-label">Tên bài/chương</label>
              <input id="aig-chapter" class="aig-input" type="text"
                placeholder="VD: Bài 17: Biến và lệnh gán">
            </div>

            <div class="aig-field">
              <label class="aig-label">Mô hình AI</label>
              <select id="aig-model" class="aig-select">
                <option value="claude-haiku-4-5-20251001">⚡ Haiku (~$0.01/bài, nhanh)</option>
                <option value="claude-sonnet-4-6">🧠 Sonnet (~$0.06/bài, chất lượng cao)</option>
              </select>
            </div>

            <div class="aig-field">
              <label class="aig-label">Số câu mỗi mức Bloom</label>
              <select id="aig-per-bloom" class="aig-select">
                <option value="1">1 câu × 6 mức = 6 câu</option>
                <option value="2" selected>2 câu × 6 mức = 12 câu</option>
                <option value="3">3 câu × 6 mức = 18 câu</option>
              </select>
            </div>

          </div>

          <!-- Bloom level selection -->
          <div class="aig-bloom-row">
            <label class="aig-label">Mức Bloom cần sinh</label>
            <div class="aig-bloom-checks">
              ${['B1 – Nhận biết','B2 – Hiểu','B3 – Áp dụng','B4 – Phân tích','B5 – Đánh giá','B6 – Sáng tạo'].map((lv,i) => `
                <label class="aig-bloom-check">
                  <input type="checkbox" value="B${i+1}" ${i<4?'checked':''} id="aig-b${i+1}">
                  <span class="aig-bloom-tag aig-b${i+1}">B${i+1}</span>
                  <span class="aig-bloom-lv">${lv.split(' – ')[1]}</span>
                </label>`).join('')}
            </div>
          </div>
        </div>

        <!-- Generate button -->
        <div class="aig-generate-bar">
          <button class="aig-btn-generate" id="aig-gen-btn"
            onclick="CL.Teacher.AIGenerator.generate()">
            ✨ Sinh bài tập với AI
          </button>
          <div class="aig-cost-preview" id="aig-cost-preview">
            Ước tính: ~2 câu × 6 mức = 12 câu · ~$0.02
          </div>
        </div>

        <!-- Progress -->
        <div class="aig-progress" id="aig-progress" style="display:none">
          <div class="aig-progress-bar"><div id="aig-pbar" style="width:0%"></div></div>
          <div class="aig-progress-text" id="aig-progress-text">Đang kết nối Claude API...</div>
        </div>

        <!-- Results -->
        <div id="aig-results" style="display:none">
          <div class="aig-results-header">
            <div class="aig-results-title" id="aig-results-title">Kết quả</div>
            <div class="aig-results-actions">
              <button class="aig-btn-ghost" onclick="CL.Teacher.AIGenerator.selectAll()">
                Chọn tất cả
              </button>
              <button class="aig-btn-primary" onclick="CL.Teacher.AIGenerator.saveSelected()">
                💾 Lưu vào ngân hàng
              </button>
            </div>
          </div>
          <div id="aig-cards"></div>
        </div>

      </div>`;

    // Wire textarea counter
    const ta = document.getElementById('aig-content');
    if (ta) {
      ta.addEventListener('input', () => {
        const n = ta.value.length;
        document.getElementById('aig-char-count').textContent =
          `${n.toLocaleString()} ký tự (~${Math.round(n/4)} tokens)`;
        _updateCostPreview();
      });
    }

    // Wire config changes
    ['aig-per-bloom','aig-model'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', _updateCostPreview);
    });
    document.querySelectorAll('[id^="aig-b"]').forEach(cb => {
      cb.addEventListener('change', _updateCostPreview);
    });
    _updateCostPreview();
  }

  function _updateCostPreview() {
    const perBloom  = parseInt(document.getElementById('aig-per-bloom')?.value) || 2;
    const model     = document.getElementById('aig-model')?.value || MODEL;
    const bloomSel  = [...document.querySelectorAll('[id^="aig-b"]:checked')].length;
    const total     = perBloom * bloomSel;
    const costPer   = model.includes('haiku') ? 0.001 : 0.006;  // per câu estimate
    const totalCost = (total * costPer).toFixed(3);
    const el = document.getElementById('aig-cost-preview');
    if (el) el.textContent =
      `Ước tính: ${perBloom} câu × ${bloomSel} mức = ${total} câu · ~$${totalCost}`;
  }

  let _lastContent = '';

  // ══════════════════════════════════════════════════════════════
  //  API KEY DIALOG
  // ══════════════════════════════════════════════════════════════
  function showKeyDialog() {
    const cur = _getKey();
    const masked = cur ? cur.slice(0,12) + '...' + cur.slice(-4) : '';

    Toast.dialog?.(`
      <div style="padding:4px 0">
        <div style="font-size:13px;font-weight:700;margin-bottom:8px">🔑 Claude API Key</div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:12px">
          Lấy tại: <a href="https://platform.claude.com/api-keys" target="_blank"
          style="color:var(--accent)">platform.claude.com/api-keys</a><br>
          Key được lưu trong localStorage của trình duyệt này, không gửi về server.
        </div>
        <input id="aig-key-input" type="password"
          style="width:100%;padding:9px 12px;background:var(--surface2);border:1px solid var(--border);
          border-radius:8px;color:var(--text);font-size:13px;font-family:var(--mono);outline:none"
          placeholder="sk-ant-api03-..."
          value="${masked}">
      </div>
    `, [
      { label: 'Lưu', action: () => {
        const v = document.getElementById('aig-key-input')?.value?.trim();
        if (v && !v.includes('...')) {
          localStorage.setItem(LS_KEY, v);
          Toast.success('✅ Đã lưu API key');
          // Re-render to update key bar
          const el = document.querySelector('.aig-wrap')?.parentElement;
          if (el) render(el);
        }
      }},
      { label: 'Xóa key', action: () => {
        localStorage.removeItem(LS_KEY);
        Toast.info('Key đã xóa');
        const el = document.querySelector('.aig-wrap')?.parentElement;
        if (el) render(el);
      }},
    ]) || alert('Nhập API key của bạn:\n\nLấy tại platform.claude.com/api-keys');
  }

  function _getKey() {
    // Prefer Config module (multi-provider) if available
    if (CL.require && CL.require('Teacher.Config')?.getApiKey) {
      const cfg = CL.require('Teacher.Config');
      const provider = cfg.getActiveProvider?.();
      if (provider?.key) return provider.key;
    }
    return localStorage.getItem(LS_KEY) || '';
  }

  function _getActiveModel(override) {
    if (override) return override;
    if (CL.require && CL.require('Teacher.Config')?.getActiveProvider) {
      const cfg = CL.require('Teacher.Config');
      const provider = cfg.getActiveProvider?.();
      if (provider?.active_model) return provider.active_model;
    }
    return MODEL;
  }

  // ══════════════════════════════════════════════════════════════
  //  GENERATE
  // ══════════════════════════════════════════════════════════════
  async function generate() {
    if (_isRunning) return;

    const key     = _getKey();
    if (!key) { Toast.error('⚠️ Cần nhập API Key trước'); showKeyDialog(); return; }

    const content = document.getElementById('aig-content')?.value?.trim();
    if (!content || content.length < 30) {
      Toast.warn('⚠️ Vui lòng nhập nội dung bài học (ít nhất 30 ký tự)'); return;
    }

    const grade    = document.getElementById('aig-grade')?.value || 'K10';
    const chapter  = document.getElementById('aig-chapter')?.value?.trim() || 'Bài học';
    const model    = _getActiveModel(document.getElementById('aig-model')?.value);
    const perBloom = parseInt(document.getElementById('aig-per-bloom')?.value) || 2;
    const blooms   = [...document.querySelectorAll('[id^="aig-b"]:checked')].map(cb => cb.value);

    if (!blooms.length) { Toast.warn('⚠️ Chọn ít nhất 1 mức Bloom'); return; }

    _isRunning  = true;
    _generated  = [];
    _lastContent = content;

    const genBtn   = document.getElementById('aig-gen-btn');
    const progress = document.getElementById('aig-progress');
    const pbar     = document.getElementById('aig-pbar');
    const ptext    = document.getElementById('aig-progress-text');
    const results  = document.getElementById('aig-results');
    const cards    = document.getElementById('aig-cards');

    if (genBtn)   { genBtn.disabled = true; genBtn.textContent = '⏳ Đang sinh...'; }
    if (progress) progress.style.display = '';
    if (results)  results.style.display  = 'none';
    if (cards)    cards.innerHTML = '';

    const typeMap = { K10:'python', K11:'python', 'K11-SQL':'sql',
                      'K12-CTST':'html', 'K12-KNTT':'html' };
    const exType  = typeMap[grade] || 'python';

    try {
      // Process blooms in batches of 2 (to keep prompts focused)
      const total  = blooms.length;
      let   done   = 0;

      for (const bloom of blooms) {
        if (ptext) ptext.textContent = `Đang sinh ${bloom} (${done+1}/${total})...`;
        if (pbar)  pbar.style.width = `${Math.round(done/total*100)}%`;

        const exercises = await _callClaude(key, model, {
          content, chapter, grade, bloom, perBloom, exType,
        });

        for (const ex of exercises) {
          const item = { exercise: ex, status: 'ok' };
          _generated.push(item);
          _appendCard(item, cards);
        }

        done++;
        if (pbar) pbar.style.width = `${Math.round(done/total*100)}%`;
      }

      if (pbar)   pbar.style.width = '100%';
      if (ptext)  ptext.textContent = `✅ Đã sinh ${_generated.length} câu hỏi`;

      const titleEl = document.getElementById('aig-results-title');
      if (titleEl) titleEl.textContent =
        `✨ ${_generated.length} câu hỏi đã sinh — Review và lưu vào ngân hàng`;

      if (results) results.style.display = '';

    } catch(e) {
      Toast.error('❌ ' + (e.message || String(e)));
      if (ptext) ptext.textContent = '❌ ' + e.message;
    } finally {
      _isRunning = false;
      if (genBtn) { genBtn.disabled = false; genBtn.textContent = '✨ Sinh bài tập với AI'; }
    }
  }

  // ── Call Claude API ──────────────────────────────────────────
  async function _callClaude(key, model, { content, chapter, grade, bloom, perBloom, exType }) {
    // ── Use PromptConfig (2-tier: system + template + few-shot) if available ──
    const PromptCfg = (() => { try { return CL.require('Teacher.PromptConfig'); } catch { return null; } })();

    if (PromptCfg?.buildPrompt) {
      const { systemMsg, userMsg } = PromptCfg.buildPrompt({
        type: exType, bloom, grade, chapter, content, count: perBloom,
      });

      // ✅ FIX: Dùng AIClient — tự route đến đúng provider
      let raw = '';
      if (AIClient) {
        const result = await AIClient.callActive({
          system: systemMsg,
          messages: [{ role: 'user', content: userMsg }],
          max_tokens: 4096,
        });
        raw = result.text;
      } else {
        // Last resort fallback: hardcoded Claude
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':key,
            'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true' },
          body: JSON.stringify({ model, max_tokens:4096, system:systemMsg,
            messages:[{role:'user',content:userMsg}] }),
        });
        if (!resp.ok) { const e=await resp.json().catch(()=>({})); throw new Error(e?.error?.message||`HTTP ${resp.status}`); }
        const data = await resp.json();
        raw = data.content?.[0]?.text || '';
      }
      const clean = raw.replace(/^```json\s*/,'').replace(/```\s*$/,'').trim();
      let parsed;
      try { parsed = JSON.parse(clean); }
      catch { throw new Error(`AI trả về không phải JSON. Raw: ${raw.slice(0,200)}`); }
      if (!Array.isArray(parsed)) throw new Error('AI không trả về array');
      return _formatExercises(parsed, { grade, bloom, chapter, exType, perBloom });
    }

    // ── Fallback: legacy hardcoded prompt ───────────────────────
    const BLOOM_DESC = {
      B1: 'Nhận biết — câu hỏi đơn giản, nhận dạng cú pháp, điền vào chỗ trống, đọc code đơn giản',
      B2: 'Hiểu — giải thích khái niệm, dự đoán output khi đọc code, phân biệt đúng/sai',
      B3: 'Áp dụng — viết code hoàn chỉnh để giải bài toán cụ thể có input/output rõ ràng',
      B4: 'Phân tích — tìm lỗi trong code, so sánh 2 cách viết, phân tích độ phức tạp',
      B5: 'Đánh giá — chọn giải pháp tốt nhất, đánh giá hiệu quả, tối ưu code',
      B6: 'Sáng tạo — thiết kế giải pháp tổng hợp, mở rộng bài toán thực tế',
    };

    const TYPE_GUIDE = {
      python: 'Python 3, dùng print() để xuất, input() nếu cần nhận dữ liệu',
      sql:    'SQL (SQLite), viết câu truy vấn SELECT/INSERT/CREATE TABLE',
      html:   'HTML5 + CSS3, viết code tạo giao diện web đơn giản',
    };

    const prompt = `Bạn là chuyên gia giáo dục Tin học THPT Việt Nam (CT GDPT 2018).

Tạo CHÍNH XÁC ${perBloom} bài tập ${exType.toUpperCase()} mức độ ${bloom} – ${BLOOM_DESC[bloom]} cho:
- Lớp: ${grade}  
- Bài: ${chapter}
- Ngôn ngữ/loại: ${TYPE_GUIDE[exType]}

NỘI DUNG BÀI HỌC:
${content}

YÊU CẦU ĐỊNH DẠNG — Trả về JSON array, KHÔNG có markdown, KHÔNG có text thêm:
[
  {
    "title": "Tiêu đề ngắn gọn 5-8 từ",
    "desc": "HTML đề bài: <b>Đề bài:</b> ... <br><b>Input:</b> ...<br><b>Output:</b><pre class=\\"ex-code\\">...</pre>",
    "solution": "code mẫu ${exType} đúng, chạy được",
    "expected_output": "output chính xác khi chạy code mẫu với input mẫu (chỉ text thuần, không HTML)",
    "sample_input": "input mẫu để test (rỗng nếu không có input)",
    "keywords": ["từ_khóa_1", "từ_khóa_2"],
    "nl": "${bloom.startsWith('B1')||bloom.startsWith('B2') ? 'NL2a' : bloom.startsWith('B3')||bloom.startsWith('B4') ? 'NL2c' : 'NL1c'}"
  }
]

QUAN TRỌNG:
- solution phải chạy được và cho đúng expected_output
- Nếu bài không có input: sample_input = "", expected_output phải chính xác 100%
- Viết bằng tiếng Việt, phù hợp học sinh THPT
- Chỉ trả về JSON array, KHÔNG thêm bất kỳ text nào khác`;

    // ✅ FIX: Dùng AIClient — tự route đến đúng provider
    let raw = '';
    if (AIClient) {
      const result = await AIClient.callActive({
        messages:   [{ role: 'user', content: prompt }],
        max_tokens: 4096,
        model,
      });
      raw = result.text;
    } else {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type':'application/json','x-api-key':key,
          'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true' },
        body: JSON.stringify({ model, max_tokens:4096, messages:[{role:'user',content:prompt}] }),
      });
      if (!resp.ok) { const e=await resp.json().catch(()=>({})); throw new Error(e?.error?.message||`HTTP ${resp.status}`); }
      const d = await resp.json();
      raw = d.content?.[0]?.text || '';
    }

    // Parse JSON — strip any markdown fences
    const clean = raw.replace(/^```json\s*/,'').replace(/```\s*$/,'').trim();
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      throw new Error(`AI trả về không phải JSON hợp lệ. Raw: ${raw.slice(0,200)}`);
    }

    if (!Array.isArray(parsed)) throw new Error('AI không trả về array');

    // Convert to CodeLab exercise format
    const grade_code = grade.replace('-','').toLowerCase();
    const chapterSlug = chapter.replace(/[^a-zA-Z0-9]/g,'').toLowerCase().slice(0,8);
    const bloomNum = bloom.replace('B','');

    return _formatExercises(parsed.slice(0, perBloom), { grade, bloom, chapter, exType, perBloom });
  }

  function _formatExercises(parsed, { grade, bloom, chapter, exType, perBloom }) {
    const grade_code  = grade.replace('-','').toLowerCase();
    const chapterSlug = chapter.replace(/[^a-zA-Z0-9]/g,'').toLowerCase().slice(0,8);
    const bloomNum    = (bloom||'B3').replace('B','');

    return parsed.slice(0, perBloom).map((ex, i) => ({
      id:       `ai-${grade_code}-${chapterSlug}-b${bloomNum}-${Date.now()%10000}-${i+1}`,
      g:        grade.split('-')[0],   // K10, K11, K12
      bo:       grade.includes('-') ? grade.split('-')[1] : 'KNTT',
      ch:       chapter,
      lv:       `B${bloomNum} – ${['Nhận biết','Hiểu','Áp dụng','Phân tích','Đánh giá','Sáng tạo'][bloomNum-1]}`,
      type:     exType,
      num:      `${bloomNum}.${i+1}`,
      title:    ex.title || 'Bài tập',
      desc:     ex.desc  || '',
      theory:   '',
      solution: ex.solution || '',
      nl:       [ex.nl || 'NL2c'],
      chu_de:   chapter.replace(/^Bài \d+[:\s]+/i,'').trim(),
      rb: (ex.keywords || []).map((kw, ki) => ({
        desc: `Dùng ${kw}`, kw, pts: Math.floor(10/(ex.keywords?.length||1)), hint: '',
      })),
      tc: ex.expected_output && ex.solution ? [{
        input:    ex.sample_input || '',
        expected: ex.expected_output,
        pts:      10,
        desc:     'Output đúng',
      }] : [],
      _ai_generated: true,
      _solution: ex.solution,
      _sample_input: ex.sample_input || '',
      _expected_output: ex.expected_output || '',
    }));
  }

  // ── Render result card ───────────────────────────────────────
  function _appendCard(item, container) {
    const ex   = item.exercise;
    const BCOL = {b1:'#6366f1',b2:'#3b82f6',b3:'#10b981',b4:'#f59e0b',b5:'#ef4444',b6:'#8b5cf6'};
    const bn   = ex.lv?.match(/B(\d)/)?.[1] || '3';
    const bcol = BCOL['b'+bn] || '#888';

    const card = document.createElement('div');
    card.className = 'aig-card';
    card.id = 'aig-card-' + ex.id;
    card.innerHTML = `
      <div class="aig-card-header">
        <label class="aig-card-check-label">
          <input type="checkbox" class="aig-card-check" data-id="${Utils.escHtml(ex.id)}" checked>
        </label>
        <span class="aig-bloom-tag" style="background:${bcol}18;color:${bcol};border:1px solid ${bcol}40">
          ${Utils.escHtml(ex.lv?.split(' – ')[0]||'')}
        </span>
        <span class="aig-card-title">${Utils.escHtml(ex.title)}</span>
        <div class="aig-card-badges">
          ${ex.tc?.length ? '<span class="aig-badge aig-badge-tc">✓ test case</span>' : ''}
          <span class="aig-badge">${ex.type||'python'}</span>
        </div>
        <div class="aig-card-actions">
          <button class="aig-card-btn" onclick="CL.Teacher.AIGenerator.previewCard('${ex.id}')"
            title="Xem đề">👁</button>
          <button class="aig-card-btn" onclick="CL.Teacher.AIGenerator.runCard('${ex.id}')"
            title="Chạy thử code mẫu">▶</button>
          <button class="aig-card-btn aig-card-btn-del"
            onclick="CL.Teacher.AIGenerator.removeCard('${ex.id}')" title="Bỏ">✕</button>
        </div>
      </div>
      <div class="aig-card-body" id="aig-card-body-${ex.id}" style="display:none">
        <div class="aig-card-desc">${ex.desc}</div>
        ${ex._solution ? `
        <div class="aig-card-code-wrap">
          <div class="aig-card-code-label">💡 Code mẫu</div>
          <pre class="aig-card-code">${Utils.escHtml(ex._solution)}</pre>
        </div>` : ''}
        <div id="aig-card-run-${ex.id}" class="aig-card-run"></div>
      </div>`;

    container?.appendChild(card);
  }

  function previewCard(id) {
    const body = document.getElementById('aig-card-body-' + id);
    if (body) body.style.display = body.style.display === 'none' ? '' : 'none';
  }

  async function runCard(id) {
    const item = _generated.find(g => g.exercise.id === id);
    if (!item) return;
    const ex  = item.exercise;
    const out = document.getElementById('aig-card-run-' + id);
    if (!out) return;

    // Show the card body if hidden
    const body = document.getElementById('aig-card-body-' + id);
    if (body) body.style.display = '';

    out.innerHTML = '<span style="color:var(--text3)">⏳ Đang chạy code mẫu...</span>';

    const code = ex._solution;
    if (!code) { out.textContent = '⚠️ Không có code mẫu'; return; }

    try {
      if (ex.type === 'python') {
        // Use PyInterp for quick validation
        let stdout = '';
        const toks   = PyInterp.tokenize(code);
        const parser = new PyInterp.Parser(toks);
        const ast    = parser.parse();
        const interp = new PyInterp.Interp(
          t => { stdout += t; },
          () => ex._sample_input?.split('\n').shift() || ''
        );
        interp.run(ast);
        const expected = (ex._expected_output || '').trim();
        const actual   = stdout.trim();
        const ok       = actual === expected;
        out.innerHTML = ok
          ? `<span style="color:var(--accent2)">✅ Output khớp: <code>${Utils.escHtml(actual)}</code></span>`
          : `<span style="color:var(--warn)">⚠️ Expected: <code>${Utils.escHtml(expected)}</code><br>
             Got: <code>${Utils.escHtml(actual)}</code></span>`;

        // Update tc[] with actual output if different
        if (!ok && actual) {
          item.exercise.tc = [{ input: ex._sample_input||'', expected: actual, pts:10, desc:'Output đúng' }];
          item.exercise._expected_output = actual;
          out.innerHTML += '<br><span style="font-size:11px;color:var(--text3)">→ Đã cập nhật expected output</span>';
        }
      } else {
        out.textContent = `ℹ️ Validate ${ex.type} cần chạy trong editor. Câu này sẽ lưu mà không có tc[].`;
      }
    } catch(e) {
      out.innerHTML = `<span style="color:var(--error)">❌ ${Utils.escHtml(e.message||String(e))}</span>`;
    }
  }

  function removeCard(id) {
    const idx = _generated.findIndex(g => g.exercise.id === id);
    if (idx >= 0) _generated.splice(idx, 1);
    document.getElementById('aig-card-' + id)?.remove();
  }

  function selectAll() {
    document.querySelectorAll('.aig-card-check').forEach(cb => { cb.checked = true; });
  }

  // ══════════════════════════════════════════════════════════════
  //  SAVE TO EXERCISE BANK
  // ══════════════════════════════════════════════════════════════
  async function saveSelected() {
    const checked = [...document.querySelectorAll('.aig-card-check:checked')].map(cb => cb.dataset.id);
    if (!checked.length) { Toast.warn('⚠️ Chưa chọn câu nào để lưu'); return; }

    const toSave = _generated.filter(g => checked.includes(g.exercise.id));
    let saved = 0, errors = 0;

    Toast.info(`Đang lưu ${toSave.length} bài tập...`);

    for (const item of toSave) {
      const ex = item.exercise;
      try {
        // Save desc HTML to Sheets NoiDung
        await CL.API.saveExerciseContent(ex.id, 'desc', ex.desc);

        // Save solution as code mẫu if exists
        if (ex._solution) {
          await CL.API.saveCodeMau(ex.id, ex.type || 'python', ex._solution, 'AI generated');
        }

        // Save BaiTap record
        if (CL.API.saveBaiTapRecord) {
          await CL.API.saveBaiTapRecord({
            id:         ex.id,
            lop:        ex.g,
            bo_sach:    ex.bo || 'KNTT',
            chuong:     ex.ch,
            muc_bloom:  ex.lv,
            so_bai:     ex.num,
            tieu_de:    ex.title,
            type:       ex.type || 'python',
            nguon:      'AI',
          });
        }

        // Mark card as saved
        const card = document.getElementById('aig-card-' + ex.id);
        if (card) {
          card.style.opacity = '0.6';
          card.querySelector('.aig-card-title').textContent += ' ✅';
        }
        saved++;
      } catch(e) {
        errors++;
        console.error('Save failed:', ex.id, e.message);
      }
    }

    if (saved)  Toast.success(`✅ Đã lưu ${saved} bài tập vào ngân hàng`);
    if (errors) Toast.error(`❌ ${errors} bài không lưu được (xem console)`);
  }

  return { render, showKeyDialog, generate, previewCard, runCard, removeCard, selectAll, saveSelected };
});
