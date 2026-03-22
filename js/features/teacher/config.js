/**
 * features/teacher/config.js — Teacher Panel: Tab Cấu hình (v2)
 * Thêm: Cấu hình đa AI API (Claude, OpenAI, Gemini) — admin only
 */
'use strict';

CL.define('Teacher.Config', () => {
  const cfg   = CL.require('Config');
  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');

  // ── AI Provider definitions ──────────────────────────────────
  const AI_PROVIDERS = [
    {
      id:       'claude',
      name:     'Claude (Anthropic)',
      icon:     '🧠',
      models:   [
        { id:'claude-haiku-4-5-20251001', label:'Haiku 4.5 — Nhanh, rẻ (~$0.01/bài)' },
        { id:'claude-sonnet-4-6',         label:'Sonnet 4.6 — Tốt hơn (~$0.06/bài)'  },
        { id:'claude-opus-4-6',           label:'Opus 4.6 — Mạnh nhất (~$0.20/bài)'  },
      ],
      key_prefix:  'sk-ant-',
      key_url:     'https://platform.claude.com/api-keys',
      ls_key:      'cl_claude_key',
      ls_model:    'cl_claude_model',
      endpoint:    'https://api.anthropic.com/v1/messages',
      docs:        'Claude API — Anthropic',
    },
    {
      id:       'openai',
      name:     'ChatGPT (OpenAI)',
      icon:     '🤖',
      models:   [
        { id:'gpt-4o-mini',  label:'GPT-4o Mini — Rẻ (~$0.01/bài)'  },
        { id:'gpt-4o',       label:'GPT-4o — Cân bằng (~$0.08/bài)'  },
        { id:'o3-mini',      label:'o3-mini — Lập luận (~$0.05/bài)'  },
      ],
      key_prefix:  'sk-',
      key_url:     'https://platform.openai.com/api-keys',
      ls_key:      'cl_openai_key',
      ls_model:    'cl_openai_model',
      endpoint:    'https://api.openai.com/v1/chat/completions',
      docs:        'OpenAI API',
    },
    {
      id:       'gemini',
      name:     'Gemini (Google)',
      icon:     '✨',
      models:   [
        { id:'gemini-2.0-flash',      label:'Gemini 2.0 Flash — Nhanh, miễn phí giới hạn' },
        { id:'gemini-2.5-pro-preview',label:'Gemini 2.5 Pro — Mạnh nhất'                  },
      ],
      key_prefix:  'AIza',
      key_url:     'https://aistudio.google.com/app/apikey',
      ls_key:      'cl_gemini_key',
      ls_model:    'cl_gemini_model',
      endpoint:    'https://generativelanguage.googleapis.com/v1beta/models',
      docs:        'Google AI Studio',
    },
  ];

  // ── Helpers ──────────────────────────────────────────────────
  function _getProviderCfg(providerId) {
    const p = AI_PROVIDERS.find(p => p.id === providerId);
    if (!p) return null;
    return {
      ...p,
      key:          localStorage.getItem(p.ls_key)   || '',
      active_model: localStorage.getItem(p.ls_model) || p.models[0].id,
    };
  }

  function getActiveProvider() {
    const activeId = localStorage.getItem('cl_ai_provider') || 'claude';
    return _getProviderCfg(activeId);
  }

  function getApiKey(providerId) {
    const p = AI_PROVIDERS.find(x => x.id === providerId);
    return p ? (localStorage.getItem(p.ls_key) || '') : '';
  }

  function getModel(providerId) {
    const p = AI_PROVIDERS.find(x => x.id === providerId);
    return p ? (localStorage.getItem(p.ls_model) || p.models[0].id) : '';
  }

  // ── RENDER ───────────────────────────────────────────────────
  function render(el) {
    el.innerHTML = `
      <div class="cfg-nav-tabs">
        <button class="cfg-ntab active" onclick="CL.Teacher.Config.switchNav('general',this)">⚙️ Hệ thống</button>
        <button class="cfg-ntab" onclick="CL.Teacher.Config.switchNav('ai',this)">🤖 AI API</button>
        <button class="cfg-ntab" onclick="CL.Teacher.Config.switchNav('prompt',this)">📝 Prompt AI</button>
      </div>
      <div id="cfg-nav-general"></div>
      <div id="cfg-nav-ai" style="display:none"></div>
      <div id="cfg-nav-prompt" style="display:none"></div>`;

    // Load general tab by default
    _renderGeneral(document.getElementById('cfg-nav-general'));

    // Lazy load AI and Prompt tabs on click
    return;
  }

  function switchNav(tab, btn) {
    document.querySelectorAll('.cfg-ntab').forEach(b => b.classList.toggle('active', b===btn));
    ['general','ai','prompt'].forEach(t => {
      const el = document.getElementById('cfg-nav-' + t);
      if (!el) return;
      el.style.display = t === tab ? '' : 'none';
      if (t === tab && !el.dataset.loaded) {
        el.dataset.loaded = '1';
        if (t === 'general') _renderGeneral(el);
        if (t === 'ai')      _renderAI(el);
        if (t === 'prompt')  CL.require('Teacher.PromptConfig')?.renderTab(el);
      }
    });
  }

  function _renderGeneral(el) {
    const url = localStorage.getItem(cfg.LS.SCRIPT_URL) || '';
    el.innerHTML = `
      <div class="tp-config-body">

        <!-- ─────── Apps Script URL ─────── -->
        <div class="tp-section-title">🔗 Apps Script URL</div>
        <div class="tp-config-field">
          <label>Web App URL</label>
          <input id="cfg-url" type="url" value="${Utils.escHtml(url)}"
            placeholder="https://script.google.com/macros/s/.../exec">
          <div class="cfg-hint">
            Google Sheet → Extensions → Apps Script → Deploy → Web App
            → Execute as: <b>Me</b> → Who has access: <b>Anyone</b> → Copy URL
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
          <button class="tp-save-btn" onclick="CL.Teacher.Config.saveUrl()">💾 Lưu URL</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.ping()">🔔 Kiểm tra kết nối</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.createTables()">🏗 Tạo bảng Sheets</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.changePassword()">🔑 Đổi mật khẩu</button>
        </div>
        <div id="cfg-msg" style="margin-top:8px;font-size:12px;min-height:16px"></div>

      `;
  }

  function _renderAI(el) {
    el.innerHTML = `
        <!-- ─────── AI API Configuration ─────── -->
        <div class="tp-section-title" style="margin-top:28px">🤖 Cấu hình AI API</div>
        <div class="cfg-ai-hint">
          Dùng cho tính năng <b>AI Sinh bài tập</b>. Key lưu trong localStorage của trình duyệt,
          <b>không gửi về server</b>. Chỉ truyền trực tiếp đến API provider khi sinh bài.
        </div>

        <!-- Provider selector -->
        <div class="cfg-ai-provider-row">
          <div class="cfg-ai-label">Provider mặc định</div>
          <div class="cfg-ai-providers">
            ${AI_PROVIDERS.map(p => {
              const active = (localStorage.getItem('cl_ai_provider')||'claude') === p.id;
              const hasKey = !!localStorage.getItem(p.ls_key);
              return `<button class="cfg-ai-provider-btn ${active?'active':''}"
                id="cfg-prov-${p.id}"
                onclick="CL.Teacher.Config.setProvider('${p.id}')">
                <span class="cfg-ai-prov-icon">${p.icon}</span>
                <span class="cfg-ai-prov-name">${p.name.split(' ')[0]}</span>
                ${hasKey ? '<span class="cfg-ai-prov-ok">✓</span>' : ''}
              </button>`;
            }).join('')}
          </div>
        </div>

        <!-- Per-provider config cards -->
        <div class="cfg-ai-cards" id="cfg-ai-cards">
          ${AI_PROVIDERS.map(p => _renderProviderCard(p)).join('')}
        </div>

        <!-- Test button -->
        <div style="margin-top:12px;display:flex;gap:8px;align-items:center">
          <button class="tp-save-btn" onclick="CL.Teacher.Config.testActiveAI()">
            🧪 Test AI đang chọn
          </button>
          <div id="cfg-ai-test-msg" style="font-size:12.5px;color:var(--text3)"></div>
        </div>

        `;
  }

  function _renderAI2_placeholder(el) { el.innerHTML = `
<!-- ─────── Drive / Schema ─────── -->
        <div class="tp-section-title" style="margin-top:28px">🌳 Cấu trúc Google Drive</div>
        <div class="tp-schema">
          <div class="schema-tab">📁 ${cfg.DRIVE.FOLDER_NAME}/</div>
          <div class="schema-row">├─ 📊 01_TaiKhoan.gsheet  → [GiaoVien] [HocSinh] [LichSuLop]</div>
          <div class="schema-row">├─ 📊 02_BaiTap.gsheet   → [BaiTap] [LyThuyet] [CodeMau] [NoiDung]</div>
          <div class="schema-row">├─ 📊 03_KiemTra_YYYY.gsheet → [DanhSach] [BaiTapKT] [DotKiemTra]</div>
          <div class="schema-row">├─ 📊 04_KetQua_YYYY.gsheet → [BangDiem] [BaiLam] [BaiKT] [DiemLuyenTap]</div>
          <div class="schema-row">└─ 📊 05_NhatKy_YYYY.gsheet → [TruyCap] [ViPham]</div>
        </div>

        <!-- ─────── Stats ─────── -->
        <div class="tp-section-title" style="margin-top:20px">📊 Thống kê ngân hàng bài</div>
        <div class="tp-tools-grid" style="padding:0;margin-top:8px">
          ${_statCard('🐍 Python', '576 bài', 'K10+K11 KNTT')}
          ${_statCard('🌐 HTML/CSS', '288 bài', 'K12 CTST+KNTT')}
          ${_statCard('🗃 SQL', '54 bài', 'K11 KNTT')}
          ${_statCard('📝 Tổng', '918 bài', '6 mức Bloom × 3 bài')}
        </div>

        <!-- ─────── Tools ─────── -->
        <div class="tp-section-title" style="margin-top:20px">🛠 Công cụ</div>
        <div class="tp-tools-grid">
          <div class="tp-tool-card" onclick="CL.Data.Cache.cleanup();CL.UI.Toast.success('✅ Cache đã dọn')">
            <div class="tp-tool-icon">🗑️</div><div class="tp-tool-name">Dọn cache</div>
          </div>
          <div class="tp-tool-card" onclick="CL.Teacher.Scores.exportCsv?.()">
            <div class="tp-tool-icon">📥</div><div class="tp-tool-name">Xuất điểm CSV</div>
          </div>
        </div>

      </div>`;
  }

  function _renderProviderCard(p) {
    const saved_key   = localStorage.getItem(p.ls_key)   || '';
    const saved_model = localStorage.getItem(p.ls_model) || p.models[0].id;
    const masked_key  = saved_key
      ? saved_key.slice(0, Math.min(10, saved_key.length)) + '••••' + saved_key.slice(-4)
      : '';
    const active = (localStorage.getItem('cl_ai_provider')||'claude') === p.id;

    return `
      <div class="cfg-ai-card ${active?'cfg-ai-card-active':''}" id="cfg-ai-card-${p.id}">
        <div class="cfg-ai-card-header">
          <span class="cfg-ai-card-icon">${p.icon}</span>
          <span class="cfg-ai-card-name">${p.name}</span>
          ${saved_key ? '<span class="cfg-ai-card-badge">✓ Đã cấu hình</span>' : ''}
          ${active ? '<span class="cfg-ai-card-badge cfg-ai-active-badge">⚡ Đang dùng</span>' : ''}
        </div>

        <div class="cfg-ai-card-body">
          <div class="cfg-ai-field">
            <label class="cfg-ai-field-label">API Key</label>
            <div class="cfg-ai-key-row">
              <input type="password" id="cfg-key-${p.id}"
                class="cfg-ai-key-input"
                placeholder="${p.key_prefix}... (lấy tại ${p.docs})"
                value="${Utils.escHtml(masked_key)}"
                onfocus="if(this.value.includes('••')) this.value=''"
                autocomplete="off">
              <button class="cfg-ai-key-btn"
                onclick="CL.Teacher.Config.saveKey('${p.id}')">Lưu</button>
              ${saved_key ? `<button class="cfg-ai-key-btn cfg-ai-key-del"
                onclick="CL.Teacher.Config.clearKey('${p.id}')">Xóa</button>` : ''}
            </div>
            <div class="cfg-ai-key-hint">
              <a href="${p.key_url}" target="_blank" class="cfg-ai-link">
                🔗 Lấy API key tại ${p.docs}
              </a>
            </div>
          </div>

          <div class="cfg-ai-field">
            <label class="cfg-ai-field-label">Mô hình mặc định</label>
            <select id="cfg-model-${p.id}" class="cfg-ai-model-sel"
              onchange="CL.Teacher.Config.saveModel('${p.id}',this.value)">
              ${p.models.map(m =>
                `<option value="${m.id}" ${m.id===saved_model?'selected':''}>${m.label}</option>`
              ).join('')}
            </select>
          </div>
        </div>
      </div>`;
  }

  // ── Provider actions ─────────────────────────────────────────
  function setProvider(providerId) {
    localStorage.setItem('cl_ai_provider', providerId);
    // Update active styles
    AI_PROVIDERS.forEach(p => {
      document.getElementById('cfg-prov-' + p.id)
        ?.classList.toggle('active', p.id === providerId);
      document.getElementById('cfg-ai-card-' + p.id)
        ?.classList.toggle('cfg-ai-card-active', p.id === providerId);
    });
    // Update active badge
    document.querySelectorAll('.cfg-ai-active-badge').forEach(el => el.remove());
    const activeCard = document.getElementById('cfg-ai-card-' + providerId);
    if (activeCard) {
      const hdr = activeCard.querySelector('.cfg-ai-card-header');
      const badge = document.createElement('span');
      badge.className = 'cfg-ai-card-badge cfg-ai-active-badge';
      badge.textContent = '⚡ Đang dùng';
      hdr?.appendChild(badge);
    }
    Toast.success(`✅ Đặt ${AI_PROVIDERS.find(p=>p.id===providerId)?.name} làm AI mặc định`);
  }

  function saveKey(providerId) {
    const p = AI_PROVIDERS.find(x => x.id === providerId);
    if (!p) return;
    const val = document.getElementById('cfg-key-' + providerId)?.value?.trim();
    if (!val || val.includes('••')) { Toast.warn('⚠️ Vui lòng nhập API key mới'); return; }
    localStorage.setItem(p.ls_key, val);
    // Also update cl_claude_key for backward compat with ai-generator.js
    if (providerId === 'claude') localStorage.setItem('cl_claude_key', val);
    Toast.success(`✅ Đã lưu key cho ${p.name}`);
    // Re-render to show masked key + badge
    const el = document.querySelector('.tp-config-body')?.parentElement;
    if (el) render(el);
  }

  function clearKey(providerId) {
    const p = AI_PROVIDERS.find(x => x.id === providerId);
    if (!p) return;
    localStorage.removeItem(p.ls_key);
    if (providerId === 'claude') localStorage.removeItem('cl_claude_key');
    Toast.info(`Đã xóa key của ${p.name}`);
    const el = document.querySelector('.tp-config-body')?.parentElement;
    if (el) render(el);
  }

  function saveModel(providerId, modelId) {
    const p = AI_PROVIDERS.find(x => x.id === providerId);
    if (!p) return;
    localStorage.setItem(p.ls_model, modelId);
    Toast.success(`✅ Mô hình: ${modelId}`);
  }

  // ── Test active AI ───────────────────────────────────────────
  async function testActiveAI() {
    const msg = document.getElementById('cfg-ai-test-msg');
    const activeId = localStorage.getItem('cl_ai_provider') || 'claude';
    const p  = _getProviderCfg(activeId);
    if (!p)  { if(msg) msg.textContent = '❌ Không tìm thấy provider'; return; }
    if (!p.key) { if(msg) msg.textContent = '⚠️ Chưa nhập API key'; return; }

    if (msg) msg.textContent = `⏳ Đang test ${p.name}...`;

    try {
      let ok = false, latency = 0;
      const t0 = Date.now();

      if (activeId === 'claude') {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': p.key,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: p.active_model,
            max_tokens: 10,
            messages: [{ role: 'user', content: 'Say "OK"' }],
          }),
        });
        ok = r.ok;
        if (!ok) { const e = await r.json(); throw new Error(e?.error?.message || r.status); }

      } else if (activeId === 'openai') {
        const r = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + p.key },
          body: JSON.stringify({
            model: p.active_model, max_tokens: 5,
            messages: [{ role: 'user', content: 'Say OK' }],
          }),
        });
        ok = r.ok;
        if (!ok) { const e = await r.json(); throw new Error(e?.error?.message || r.status); }

      } else if (activeId === 'gemini') {
        const model = p.active_model;
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${p.key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: 'Say OK' }] }] }),
          }
        );
        ok = r.ok;
        if (!ok) { const e = await r.json(); throw new Error(e?.error?.message || r.status); }
      }

      latency = Date.now() - t0;
      if (msg) msg.innerHTML =
        `<span style="color:var(--accent2)">✅ ${p.name} OK · ${latency}ms · model: ${p.active_model}</span>`;

    } catch(e) {
      if (msg) msg.innerHTML =
        `<span style="color:var(--error)">❌ ${Utils.escHtml(e.message)}</span>`;
    }
  }

  // ── Existing functions ───────────────────────────────────────
  function _statCard(icon, count, sub) {
    return `<div class="tp-tool-card" style="cursor:default">
      <div class="tp-tool-icon" style="font-size:20px">${icon}</div>
      <div class="tp-tool-name">${count}</div>
      <div class="tp-tool-desc">${sub}</div>
    </div>`;
  }

  function saveUrl() {
    const url = document.getElementById('cfg-url')?.value?.trim();
    if (!url) { _msg('⚠️ Vui lòng nhập URL'); return; }
    localStorage.setItem(cfg.LS.SCRIPT_URL, url);
    if (typeof CL.API?.setUrl === 'function') CL.API.setUrl(url);
    _msg('✅ Đã lưu');
  }

  async function ping() {
    _msg('⏳ Đang kiểm tra...');
    const r = await CL.API.ping();
    _msg(r.ok ? `✅ Kết nối OK · ${r.latency}ms · v${r.version}` : '❌ Lỗi: ' + r.error);
  }

  async function createTables() {
    _msg('⏳ Đang tạo bảng...');
    try {
      const r = await CL.API.createTables();
      _msg(`✅ Đã tạo: ${(r.created||[]).join(', ') || 'Đã tồn tại'}`);
    } catch(e) { _msg('❌ ' + e.message); }
  }

  function changePassword() {
    const old = prompt('Mật khẩu cũ:');
    if (!old) return;
    const neu = prompt('Mật khẩu mới (≥6 ký tự):');
    if (!neu || neu.length < 6) { Toast.warn('Mật khẩu quá ngắn'); return; }
    CL.API.changePassword(old, neu)
      .then(() => Toast.success('✅ Đã đổi mật khẩu'))
      .catch(e => Toast.error('❌ ' + e.message));
  }

  function _msg(text) {
    const el = document.getElementById('cfg-msg');
    if (el) el.textContent = text;
  }

  // Expose helpers for ai-generator.js
  return {
    render, switchNav, _renderGeneral, _renderAI, saveUrl, ping, createTables, changePassword,
    setProvider, saveKey, clearKey, saveModel, testActiveAI,
    // Public API for ai-generator and other modules
    getActiveProvider, getApiKey, getModel, AI_PROVIDERS,
  };
});
