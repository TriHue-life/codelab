/**
 * features/teacher/ai-client.js — Universal AI Client
 * ═══════════════════════════════════════════════════════════════
 * Adapter pattern: 1 interface thống nhất cho Claude / OpenAI / Gemini
 *
 * Usage:
 *   const client = AIClient.create();          // dùng provider đang active
 *   const client = AIClient.create('openai');  // chỉ định provider
 *
 *   const resp = await client.chat({
 *     system: '...',
 *     messages: [{role:'user', content:'...'}],
 *     max_tokens: 2048,
 *   });
 *   // resp.text = string output
 *   // resp.model, resp.latency, resp.tokens_used
 *
 * ═══════════════════════════════════════════════════════════════
 * Bug fixes so với code cũ:
 *   - ai-generator.js luôn gọi Anthropic dù đổi provider ✓ (fixed)
 *   - testActiveAI đọc localStorage nhưng UI chưa set ✓ (fixed)
 *   - Gemini/OpenAI không được dùng khi sinh bài ✓ (fixed)
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Teacher.AIClient', () => {

  // ── Provider registry ────────────────────────────────────────
  // Dữ liệu tĩnh: endpoint, headers, request/response schema
  const PROVIDERS = {

    claude: {
      name:       'Claude (Anthropic)',
      icon:       '🧠',
      ls_key:     'cl_claude_key',
      ls_model:   'cl_claude_model',
      key_url:    'https://platform.claude.com/api-keys',
      key_prefix: 'sk-ant-',
      models: [
        { id:'claude-haiku-4-5-20251001', label:'Haiku 4.5',  note:'Nhanh · ~$0.01/bài',  default: true },
        { id:'claude-sonnet-4-6',         label:'Sonnet 4.6', note:'Tốt hơn · ~$0.06/bài' },
        { id:'claude-opus-4-6',           label:'Opus 4.6',   note:'Mạnh nhất · ~$0.20/bài'},
      ],
      // Xây request body theo format Claude Messages API
      buildRequest({ model, system, messages, max_tokens }) {
        return {
          url: 'https://api.anthropic.com/v1/messages',
          headers: (key) => ({
            'Content-Type': 'application/json',
            'x-api-key': key,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          }),
          body: { model, max_tokens: max_tokens || 4096, system, messages },
        };
      },
      // Trích text từ response Claude
      parseResponse(data) {
        if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
        return {
          text:         data.content?.[0]?.text || '',
          tokens_input: data.usage?.input_tokens  || 0,
          tokens_output:data.usage?.output_tokens || 0,
        };
      },
    },

    openai: {
      name:       'ChatGPT (OpenAI)',
      icon:       '🤖',
      ls_key:     'cl_openai_key',
      ls_model:   'cl_openai_model',
      key_url:    'https://platform.openai.com/api-keys',
      key_prefix: 'sk-',
      models: [
        { id:'gpt-4o-mini',  label:'GPT-4o Mini',  note:'Nhanh · ~$0.01/bài', default: true },
        { id:'gpt-4o',       label:'GPT-4o',        note:'Tốt hơn · ~$0.08/bài' },
        { id:'o3-mini',      label:'o3-mini',       note:'Lập luận · ~$0.05/bài' },
      ],
      buildRequest({ model, system, messages, max_tokens }) {
        // OpenAI: system message là 1 element đầu tiên trong messages array
        const msgs = system
          ? [{ role: 'system', content: system }, ...messages]
          : messages;
        return {
          url: 'https://api.openai.com/v1/chat/completions',
          headers: (key) => ({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + key,
          }),
          body: { model, max_tokens: max_tokens || 4096, messages: msgs },
        };
      },
      parseResponse(data) {
        if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
        return {
          text:         data.choices?.[0]?.message?.content || '',
          tokens_input: data.usage?.prompt_tokens     || 0,
          tokens_output:data.usage?.completion_tokens || 0,
        };
      },
    },

    gemini: {
      name:       'Gemini (Google)',
      icon:       '✨',
      ls_key:     'cl_gemini_key',
      ls_model:   'cl_gemini_model',
      key_url:    'https://aistudio.google.com/app/apikey',
      key_prefix: 'AIza',
      models: [
        { id:'gemini-2.0-flash',        label:'Gemini 2.0 Flash', note:'Miễn phí · nhanh', default: true },
        { id:'gemini-2.5-pro-preview',  label:'Gemini 2.5 Pro',   note:'Mạnh nhất' },
      ],
      buildRequest({ model, system, messages, max_tokens }) {
        // Gemini: system instruction riêng, contents format khác
        const contents = messages.map(m => ({
          role:  m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));
        const body = { contents };
        if (system) body.system_instruction = { parts: [{ text: system }] };
        if (max_tokens) body.generationConfig = { maxOutputTokens: max_tokens };
        return {
          // key được append vào URL (Gemini dùng ?key= thay vì header)
          url: (key) =>
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
          headers: () => ({ 'Content-Type': 'application/json' }),
          body,
        };
      },
      parseResponse(data) {
        if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const usage = data.usageMetadata || {};
        return {
          text,
          tokens_input:  usage.promptTokenCount      || 0,
          tokens_output: usage.candidatesTokenCount  || 0,
        };
      },
    },
  };

  // ── State helpers ────────────────────────────────────────────
  function getProviderIds()  { return Object.keys(PROVIDERS); }
  function getProviderDef(id){ return PROVIDERS[id] || null; }

  function getActiveId() {
    return localStorage.getItem('cl_ai_provider') || 'claude';
  }
  function setActiveId(id) {
    if (PROVIDERS[id]) localStorage.setItem('cl_ai_provider', id);
  }

  function getKey(providerId) {
    const p = PROVIDERS[providerId];
    return p ? (localStorage.getItem(p.ls_key) || '') : '';
  }
  function setKey(providerId, key) {
    const p = PROVIDERS[providerId];
    if (!p) return;
    localStorage.setItem(p.ls_key, key);
    // Backward compat: cl_claude_key still used by older code
    if (providerId === 'claude') localStorage.setItem('cl_claude_key', key);
  }
  function clearKey(providerId) {
    const p = PROVIDERS[providerId];
    if (!p) return;
    localStorage.removeItem(p.ls_key);
    if (providerId === 'claude') localStorage.removeItem('cl_claude_key');
  }

  function getModel(providerId) {
    const p = PROVIDERS[providerId];
    if (!p) return '';
    return localStorage.getItem(p.ls_model)
      || p.models.find(m => m.default)?.id
      || p.models[0]?.id || '';
  }
  function setModel(providerId, modelId) {
    const p = PROVIDERS[providerId];
    if (p) localStorage.setItem(p.ls_model, modelId);
  }

  function hasKey(providerId) { return !!getKey(providerId); }

  // ── Core: unified HTTP call ──────────────────────────────────
  /**
   * call(providerId, { system, messages, max_tokens, model? })
   * → { text, model, latency, tokens_input, tokens_output }
   */
  async function call(providerId, { system = '', messages, max_tokens, model }) {
    const p = PROVIDERS[providerId];
    if (!p) throw new Error(`Unknown AI provider: ${providerId}`);

    const key = getKey(providerId);
    if (!key) throw new Error(`Chưa cấu hình API key cho ${p.name}`);

    const activeModel = model || getModel(providerId);
    const req = p.buildRequest({ model: activeModel, system, messages, max_tokens });

    // Resolve URL (Gemini đặt key trong URL)
    const url = typeof req.url === 'function' ? req.url(key) : req.url;

    const t0 = Date.now();
    const resp = await fetch(url, {
      method:  'POST',
      headers: req.headers(key),
      body:    JSON.stringify(req.body),
    });

    const data = await resp.json();

    // Throw on HTTP error (parse error message from body)
    if (!resp.ok) {
      const msg = data?.error?.message
        || data?.error?.errors?.[0]?.message
        || `HTTP ${resp.status}`;
      throw new Error(msg);
    }

    const parsed = p.parseResponse(data);
    return {
      ...parsed,
      model:   activeModel,
      latency: Date.now() - t0,
      provider: providerId,
    };
  }

  /**
   * callActive({ system, messages, max_tokens, model? })
   * Gọi provider đang active (cl_ai_provider localStorage)
   */
  async function callActive(opts) {
    return call(getActiveId(), opts);
  }

  /**
   * test(providerId?) — Ping test với 1 token
   * → { ok, latency, model, provider, error? }
   */
  async function test(providerId) {
    const id = providerId || getActiveId();
    const p  = PROVIDERS[id];
    if (!p) return { ok: false, error: 'Unknown provider: ' + id };
    if (!getKey(id)) return { ok: false, error: `Chưa nhập API key cho ${p.name}` };

    try {
      const r = await call(id, {
        messages:   [{ role: 'user', content: 'Respond with only the word OK' }],
        max_tokens: 10,
      });
      return { ok: true, latency: r.latency, model: r.model, provider: id, text: r.text };
    } catch(e) {
      return { ok: false, error: e.message, provider: id };
    }
  }

  // ── Factory ──────────────────────────────────────────────────
  /**
   * create(providerId?) → { chat, test, provider, model, key }
   * Simple wrapper object bound to 1 provider
   */
  function create(providerId) {
    const id = providerId || getActiveId();
    return {
      provider: id,
      get model() { return getModel(id); },
      get key()   { return getKey(id); },
      chat:  (opts) => call(id, opts),
      test:  ()     => test(id),
    };
  }

  return {
    // Provider info
    PROVIDERS,
    getProviderIds, getProviderDef,
    // Active provider
    getActiveId, setActiveId,
    // Key management
    getKey, setKey, clearKey, hasKey,
    // Model management
    getModel, setModel,
    // Core API calls
    call, callActive, test,
    // Factory
    create,
  };
});
