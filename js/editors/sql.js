/**
 * editors/sql.js — SQL Editor (SQLite WebAssembly)
 * ═══════════════════════════════════════════════════════════════
 * Kích hoạt khi exercise.type === 'sql'
 * Dùng sql.js (SQLite compiled to WASM) chạy trong browser.
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, exercises/registry.js
 */

'use strict';

CL.define('Editors.Sql', () => {

  const cfg   = CL.require('Config');
  const Utils = CL.require('Utils');
  const Store = CL.require('Store');

  let _db          = null;
  let _sqlJs       = null;
  let _initPromise = null;
  let _container   = null;
  let _exId        = null;

  const SNIPPETS = {
    select: 'SELECT *\nFROM ten_bang\nWHERE dieu_kien\nORDER BY cot;',
    where:  "WHERE cot = 'gia_tri'\nAND cot2 > so\nOR cot3 LIKE '%chuoi%'",
    join:   'SELECT a.cot1, b.cot2\nFROM bang_a a\nINNER JOIN bang_b b ON a.khoa = b.khoa\nWHERE dieu_kien;',
    insert: "INSERT INTO ten_bang (cot1, cot2)\nVALUES ('gia_tri_1', 'gia_tri_2');",
    create: "CREATE TABLE ten_bang (\n    id INTEGER PRIMARY KEY,\n    ten VARCHAR(64) NOT NULL,\n    FOREIGN KEY (id) REFERENCES bang_khac(id)\n);",
  };

  // ── Init sql.js (CDN lazy load) ───────────────────────────────

  async function _initSqlJs() {
    if (_sqlJs) return _sqlJs;
    if (_initPromise) return _initPromise;
    _initPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js';
      s.onload = async () => {
        try { _sqlJs = await initSqlJs({ locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}` }); resolve(_sqlJs); }
        catch (e) { reject(e); }
      };
      s.onerror = () => reject(new Error('Không tải được sql.js'));
      document.head.appendChild(s);
    });
    return _initPromise;
  }

  // ── Mount ─────────────────────────────────────────────────────

  async function mount(exercise) {
    _exId = exercise.id;
    const ws = document.getElementById('workspace') || document.querySelector('.workspace');
    if (!ws) return;
    _container = ws;
    ws.dataset.mode = 'sql';

    ws.innerHTML = `
      <div class="sql-editor-layout">
        <div class="sql-editor-left">
          <div class="sql-toolbar">
            <div class="sql-tools-l">
              <span class="sql-lang-badge">SQL</span>
              <button class="sql-btn" onclick="CL.Editors.Sql.insertSnippet('select')">SELECT</button>
              <button class="sql-btn" onclick="CL.Editors.Sql.insertSnippet('where')">WHERE</button>
              <button class="sql-btn" onclick="CL.Editors.Sql.insertSnippet('join')">JOIN</button>
              <button class="sql-btn" onclick="CL.Editors.Sql.insertSnippet('insert')">INSERT</button>
              <button class="sql-btn" onclick="CL.Editors.Sql.insertSnippet('create')">CREATE</button>
            </div>
            <div class="sql-tools-r">
              <button class="sql-btn primary" onclick="CL.Editors.Sql.run()">▶ Chạy</button>
            </div>
          </div>
          <div class="sql-editor-wrap" style="position:relative;flex:1;overflow:hidden;display:flex;flex-direction:column">
            <div class="sql-hl-overlay" id="sql-hl-overlay"></div>
            <textarea id="sql-input" class="sql-code-area"
              placeholder="-- Viết câu SQL tại đây&#10;-- Ctrl+Enter để chạy"
              spellcheck="false" autocomplete="off"
              onkeydown="CL.Editors.Sql.handleKey(event)"
              onscroll="CL.Editors.Sql.syncScroll()"
              oninput="CL.Editors.Sql.onInput()"></textarea>
          </div>
        </div>
        <div class="sql-editor-right">
          <div class="sql-result-tabs">
            <button class="sql-rtab on" onclick="CL.Editors.Sql.showPanel('result')">📊 Kết quả</button>
            <button class="sql-rtab"    onclick="CL.Editors.Sql.showPanel('schema')">🗄 Schema</button>
            <button class="sql-rtab"    onclick="CL.Editors.Sql.showPanel('theory')">📖 Lý thuyết</button>
            <div id="sql-row-count" class="sql-rowcount"></div>
          </div>
          <div id="sql-panel-result" class="sql-panel">
            <div class="sql-empty-state">▶ Nhấn <b>Chạy</b> để xem kết quả</div>
          </div>
          <div id="sql-panel-schema" class="sql-panel" style="display:none">
            <div class="sql-loading">⏳ Đang tải schema...</div>
          </div>
          <div id="sql-panel-theory" class="sql-panel" style="display:none">
            <div class="sql-theory-body">${exercise.theory || ''}</div>
          </div>
        </div>
      </div>
      <div class="sql-action-bar">
        <button class="btn primary" onclick="CL.Editors.Sql.run()">▶ Chạy SQL</button>
        <button class="btn success" onclick="gradeSQL()">📊 Chấm điểm</button>
        <button class="btn" onclick="CL.Editors.Sql.resetDb()">🔄 Reset DB</button>
        <span id="sql-status" class="sql-status"></span>
      </div>`;

    const saved = _load(exercise.id);
    document.getElementById('sql-input').value = saved || _starterCode(exercise);
    document.addEventListener('keydown', _onKeydown);

    await _loadDb(exercise.sample_db || '');
    _renderSchema();
  }

  function unmount() {
    if (!_container) return;
    _container.dataset.mode = '';
    _container.innerHTML = '';
    _container = _db = null;
    document.removeEventListener('keydown', _onKeydown);
  }

  // ── DB init ───────────────────────────────────────────────────

  async function _loadDb(schema) {
    _setStatus('⏳ Khởi tạo CSDL...', 'loading');
    try {
      const SQL = await _initSqlJs();
      _db = new SQL.Database();
      if (schema) _db.run(schema);
      _setStatus('✅ Sẵn sàng', 'ok');
      setTimeout(() => _setStatus(''), 2000);
    } catch (e) {
      _setStatus('❌ ' + e.message, 'err');
    }
  }

  async function resetDb() {
    const ex = typeof EXERCISES_SQL !== 'undefined'
      ? EXERCISES_SQL.find(e => e.id === _exId) : null;
    await _loadDb(ex?.sample_db || '');
    _renderSchema();
    CL.UI.Toast?.show('🔄 CSDL đã được reset');
  }

  // ── Run SQL ───────────────────────────────────────────────────

  async function run() {
    const ta = document.getElementById('sql-input');
    if (!ta) return;
    const sql = ta.value.trim();
    if (!sql) return;

    if (!_db) await _loadDb('');
    _save(_exId, sql);
    _setStatus('⏳ Đang chạy...', 'loading');
    showPanel('result');

    try {
      const stmts = _splitSql(sql);
      let lastResult = null;
      let affected = 0;
      for (const s of stmts) {
        const up = s.trim().toUpperCase().replace(/\s+/g,' ');
        if (up.startsWith('SELECT') || up.startsWith('WITH') || up.startsWith('PRAGMA')) {
          lastResult = _db.exec(s);
        } else { _db.run(s); affected++; }
      }
      if (lastResult?.length) _renderTable(lastResult[0]);
      else _renderSuccess(affected);
      _setStatus('✅ OK', 'ok');
      setTimeout(() => _setStatus(''), 2000);
    } catch (e) {
      _renderError(e.message);
      _setStatus('❌ Lỗi SQL', 'err');
    }
  }

  // ── Render results ────────────────────────────────────────────

  function _renderTable(result) {
    const panel = document.getElementById('sql-panel-result');
    const rc    = document.getElementById('sql-row-count');
    const cols  = result.columns;
    const rows  = result.values;
    if (rc) rc.textContent = `${rows.length} dòng`;
    if (!rows.length) {
      panel.innerHTML = '<div class="sql-empty-state">🔍 Không có dòng nào thỏa điều kiện</div>';
      return;
    }
    const e = Utils.escHtml;
    panel.innerHTML = `
      <div class="sql-table-wrap">
        <table class="sql-result-table">
          <thead><tr>${cols.map(c=>`<th>${e(c)}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(r=>`<tr>${r.map(v=>`<td class="${v===null?'sql-null':''}">${v===null?'NULL':e(v)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
  }

  function _renderSuccess(n) {
    document.getElementById('sql-panel-result').innerHTML =
      `<div class="sql-success-msg">✅ Thực thi thành công ${n} lệnh<br><small>Dùng SELECT để xem kết quả</small></div>`;
    const rc = document.getElementById('sql-row-count');
    if (rc) rc.textContent = '';
  }

  function _renderError(msg) {
    document.getElementById('sql-panel-result').innerHTML = `
      <div class="sql-error-box">
        <div class="sql-error-title">❌ Lỗi SQL</div>
        <div class="sql-error-msg">${Utils.escHtml(msg)}</div>
        <div class="sql-error-tips">
          <b>Kiểm tra:</b>
          <ul>
            <li>Dấu <code>;</code> cuối câu SQL</li>
            <li>Tên bảng / cột đúng chính xác</li>
            <li>Chuỗi ký tự bọc trong <code>'...'</code></li>
            <li>Thứ tự: SELECT → FROM → WHERE → ORDER BY</li>
          </ul>
        </div>
      </div>`;
  }

  // ── Schema panel ──────────────────────────────────────────────

  function _renderSchema() {
    const panel = document.getElementById('sql-panel-schema');
    if (!panel || !_db) return;
    try {
      const tables = _db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
      if (!tables.length) { panel.innerHTML = '<div class="sql-empty-state">Chưa có bảng</div>'; return; }
      let html = '<div class="sql-schema">';
      for (const [t] of tables[0].values) {
        const cols = _db.exec(`PRAGMA table_info(${t})`);
        const cnt  = _db.exec(`SELECT COUNT(*) FROM ${t}`);
        const n    = cnt[0]?.values[0]?.[0] ?? 0;
        html += `<div class="ss-table">
          <div class="ss-table-name">📋 ${t} <span class="ss-row-count">${n} dòng</span></div>
          <table class="ss-cols"><thead><tr><th>Cột</th><th>Kiểu</th><th>KK</th><th>PK</th></tr></thead>
          <tbody>${(cols[0]?.values||[]).map(r=>`<tr><td class="ss-col-name">${r[1]}</td><td class="ss-col-type">${r[2]}</td><td>${r[3]?'✓':''}</td><td>${r[5]?'🔑':''}</td></tr>`).join('')}</tbody></table>
        </div>`;
      }
      panel.innerHTML = html + '</div>';
    } catch (e) { panel.innerHTML = `<div class="sql-error-box">${e.message}</div>`; }
  }

  // ── Panel switching ───────────────────────────────────────────

  function showPanel(name) {
    ['result','schema','theory'].forEach(p => {
      const el = document.getElementById('sql-panel-' + p);
      if (el) el.style.display = p === name ? '' : 'none';
    });
    document.querySelectorAll('.sql-rtab').forEach((t, i) => {
      t.classList.toggle('on', ['result','schema','theory'][i] === name);
    });
    if (name === 'schema') _renderSchema();
  }

  // ── Helpers ───────────────────────────────────────────────────

  function insertSnippet(key) {
    const ta = document.getElementById('sql-input');
    if (!ta || !SNIPPETS[key]) return;
    const s  = ta.selectionStart;
    ta.value = ta.value.slice(0, s) + SNIPPETS[key] + ta.value.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = s + SNIPPETS[key].length;
    ta.focus();
  }

  function handleKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target, s = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 2;
    }
  }

  function _onKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); }
  }

  function _splitSql(sql) {
    const stmts = []; let cur = '', inStr = false, q = '';
    for (let i = 0; i < sql.length; i++) {
      const c = sql[i];
      if (!inStr && (c==='"'||c==="'")) { inStr=true; q=c; cur+=c; }
      else if (inStr && c===q && sql[i-1]!=='\\') { inStr=false; cur+=c; }
      else if (!inStr && c===';') { if(cur.trim()) stmts.push(cur.trim()); cur=''; }
      else cur+=c;
    }
    if (cur.trim()) stmts.push(cur.trim());
    return stmts;
  }

  function _setStatus(msg, type) {
    const el = document.getElementById('sql-status');
    if (!el) return;
    el.textContent = msg;
    el.className   = 'sql-status ' + (type||'');
  }

  function _starterCode(ex) {
    const d = (ex.desc||'').toLowerCase();
    if (d.includes('create table')) return '-- Viết lệnh CREATE TABLE tại đây\n';
    if (d.includes('insert'))       return '-- Viết lệnh INSERT INTO tại đây\n';
    if (d.includes('update'))       return '-- Viết lệnh UPDATE tại đây\n';
    if (d.includes('delete'))       return '-- Viết lệnh DELETE tại đây\n';
    return '-- Viết câu SQL tại đây\nSELECT ';
  }

  function _updateHighlight() {
    const ta = document.getElementById('sql-input');
    const ov = document.getElementById('sql-hl-overlay');
    if (!ta || !ov) return;
    const Syn = typeof CL !== 'undefined' && CL.Editors?.Syntax;
    ov.innerHTML = Syn ? Syn.sql(ta.value) + '\n' : ta.value;
    syncScroll();
  }

  function syncScroll() {
    const ta = document.getElementById('sql-input');
    const ov = document.getElementById('sql-hl-overlay');
    if (ta && ov) { ov.scrollTop = ta.scrollTop; ov.scrollLeft = ta.scrollLeft; }
  }

  let _sqlHlTimer = null;
  function onInput() {
    clearTimeout(_sqlHlTimer);
    _sqlHlTimer = setTimeout(_updateHighlight, 30);
  }

  function getCode() { return document.getElementById('sql-input')?.value || ''; }
  function applyCode(code) {
    const ta = document.getElementById('sql-input');
    if (ta) { ta.value = code; run(); }
  }

  function _save(id, code) { if(id) try { localStorage.setItem(cfg.LS.SQL_CODE+id, code); } catch{} }
  function _load(id) { try { return localStorage.getItem(cfg.LS.SQL_CODE+id); } catch { return null; } }

  // Backward compat
  window.SQLEditor = { mount, unmount, runSQL: run, resetDB: resetDb, getCode, insertSnippet, handleKey, showPanel, syncScroll, onInput };

  return { mount, unmount, run, resetDb, getCode, applyCode, insertSnippet, handleKey, showPanel };
});
