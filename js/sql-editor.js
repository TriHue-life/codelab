// ══════════════════════════════════════════════════════════════════
//  sql-editor.js — SQL Editor với sql.js (WebAssembly SQLite)
//  Kích hoạt khi exercise.type === 'sql'
//  • Load sql.js từ CDN (SQLite compiled to WASM)
//  • Pre-load schema + data mẫu
//  • Chạy SQL → hiển thị bảng kết quả
//  • Tab: Editor | Kết quả | Schema
// ══════════════════════════════════════════════════════════════════
const SQLEditor = (function () {
  'use strict';

  let _db = null;
  let _sqlJs = null;
  let _initPromise = null;
  let _container = null;
  let _currentExId = null;

  // ── Init sql.js (CDN) ──────────────────────────────────────────
  async function _initSqlJs() {
    if (_sqlJs) return _sqlJs;
    if (_initPromise) return _initPromise;

    _initPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js';
      script.onload = async () => {
        try {
          _sqlJs = await initSqlJs({
            locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}`
          });
          resolve(_sqlJs);
        } catch (e) { reject(e); }
      };
      script.onerror = () => reject(new Error('Không tải được sql.js từ CDN'));
      document.head.appendChild(script);
    });
    return _initPromise;
  }

  // ── Mount SQL editor ───────────────────────────────────────────
  async function mount(exercise) {
    _currentExId = exercise.id;

    const workspace = document.getElementById('workspace') || document.querySelector('.workspace');
    if (!workspace) return;

    workspace.dataset.mode = 'sql';
    _container = workspace;

    workspace.innerHTML = `
      <div class="sql-editor-layout">
        <!-- LEFT: Code + tabs -->
        <div class="sql-editor-left">
          <div class="sql-toolbar">
            <div class="sql-tools-l">
              <span class="sql-lang-badge">SQL</span>
              <button class="sql-btn" onclick="SQLEditor.insertSnippet('select')" title="SELECT template">SELECT</button>
              <button class="sql-btn" onclick="SQLEditor.insertSnippet('where')" title="WHERE">WHERE</button>
              <button class="sql-btn" onclick="SQLEditor.insertSnippet('join')" title="JOIN">JOIN</button>
              <button class="sql-btn" onclick="SQLEditor.insertSnippet('insert')" title="INSERT">INSERT</button>
              <button class="sql-btn" onclick="SQLEditor.insertSnippet('create')" title="CREATE TABLE">CREATE</button>
            </div>
            <div class="sql-tools-r">
              <button class="sql-btn primary" onclick="SQLEditor.runSQL()" title="Chạy SQL (Ctrl+Enter)">▶ Chạy</button>
            </div>
          </div>
          <textarea id="sql-input" class="sql-code-area"
            placeholder="-- Viết câu SQL tại đây&#10;-- Ctrl+Enter để chạy"
            spellcheck="false" autocomplete="off"
            onkeydown="SQLEditor.handleKey(event)"></textarea>
        </div>

        <!-- RIGHT: Result + Schema tabs -->
        <div class="sql-editor-right">
          <div class="sql-result-tabs">
            <button class="sql-rtab on" onclick="SQLEditor.showPanel('result')">📊 Kết quả</button>
            <button class="sql-rtab" onclick="SQLEditor.showPanel('schema')">🗄 Schema</button>
            <button class="sql-rtab" onclick="SQLEditor.showPanel('theory')">📖 Lý thuyết</button>
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

      <!-- Bottom bar -->
      <div class="sql-action-bar">
        <button class="btn primary" onclick="SQLEditor.runSQL()">▶ Chạy SQL</button>
        <button class="btn success" onclick="gradeSQL()">📊 Chấm điểm</button>
        <button class="btn" onclick="SQLEditor.resetDB()">🔄 Reset DB</button>
        <span id="sql-status" class="sql-status"></span>
      </div>`;

    // Restore saved code
    const saved = _getSaved(exercise.id);
    document.getElementById('sql-input').value = saved || _getStarterCode(exercise);

    // Init DB + load schema
    await _loadDB(exercise.sample_db || '');
    _renderSchema();

    // Global keydown
    document.addEventListener('keydown', _onKeydown);
  }

  function unmount() {
    if (_container) {
      _container.dataset.mode = '';
      _container.innerHTML = '';
      _container = null;
    }
    document.removeEventListener('keydown', _onKeydown);
    _db = null;
    _currentExId = null;
  }

  function _onKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runSQL();
    }
  }

  // ── Load / Reset DB ────────────────────────────────────────────
  async function _loadDB(schemaSql) {
    _setStatus('⏳ Đang khởi tạo CSDL...', 'loading');
    try {
      const SQL = await _initSqlJs();
      _db = new SQL.Database();
      if (schemaSql) {
        _db.run(schemaSql);
      }
      _setStatus('✅ CSDL sẵn sàng', 'ok');
      setTimeout(() => _setStatus(''), 2000);
    } catch (e) {
      _setStatus('❌ Lỗi khởi tạo: ' + e.message, 'err');
    }
  }

  async function resetDB() {
    const ex = _getCurrentExercise();
    if (ex) await _loadDB(ex.sample_db || '');
    _renderSchema();
    _clearResult();
    if (typeof toast === 'function') toast('🔄 CSDL đã được reset về dữ liệu mẫu');
  }

  // ── Run SQL ────────────────────────────────────────────────────
  async function runSQL() {
    const input = document.getElementById('sql-input');
    if (!input) return;
    const sql = input.value.trim();
    if (!sql) return;

    if (!_db) {
      _setStatus('⏳ Đang khởi tạo...', 'loading');
      const ex = _getCurrentExercise();
      await _loadDB(ex?.sample_db || '');
    }

    // Save code
    if (_currentExId) _save(_currentExId, sql);

    _setStatus('⏳ Đang chạy...', 'loading');
    showPanel('result');

    try {
      // Split statements by semicolon
      const statements = _splitSQL(sql);
      let lastResult = null;
      let rowsAffected = 0;

      for (const stmt of statements) {
        const s = stmt.trim();
        if (!s) continue;
        const upper = s.toUpperCase().replace(/\s+/g,' ').trimStart();
        if (upper.startsWith('SELECT')) {
          lastResult = _db.exec(s);
        } else {
          _db.run(s);
          rowsAffected++;
        }
      }

      if (lastResult && lastResult.length > 0) {
        _renderTable(lastResult[0]);
      } else if (rowsAffected > 0) {
        document.getElementById('sql-panel-result').innerHTML =
          `<div class="sql-success-msg">✅ Thực thi thành công ${rowsAffected} câu lệnh<br><small>Dùng SELECT để xem kết quả</small></div>`;
        document.getElementById('sql-row-count').textContent = '';
      } else {
        _clearResult();
      }
      _setStatus('✅ OK', 'ok');
      setTimeout(() => _setStatus(''), 2000);
    } catch (e) {
      _renderError(e.message);
      _setStatus('❌ Lỗi SQL', 'err');
    }
  }

  function _splitSQL(sql) {
    // Split by ; but not inside strings
    const stmts = [];
    let cur = '', inStr = false, strChar = '';
    for (let i = 0; i < sql.length; i++) {
      const c = sql[i];
      if (!inStr && (c === "'" || c === '"')) { inStr = true; strChar = c; cur += c; }
      else if (inStr && c === strChar && sql[i-1] !== '\\') { inStr = false; cur += c; }
      else if (!inStr && c === ';') { if (cur.trim()) stmts.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    if (cur.trim()) stmts.push(cur.trim());
    return stmts;
  }

  // ── Render results ─────────────────────────────────────────────
  function _renderTable(result) {
    const panel = document.getElementById('sql-panel-result');
    const cols = result.columns;
    const rows = result.values;
    const rowCount = document.getElementById('sql-row-count');
    if (rowCount) rowCount.textContent = `${rows.length} dòng`;

    if (!rows.length) {
      panel.innerHTML = '<div class="sql-empty-state">🔍 Truy vấn thành công nhưng không có dòng nào thỏa điều kiện</div>';
      return;
    }

    const esc = s => String(s ?? 'NULL').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    panel.innerHTML = `
      <div class="sql-table-wrap">
        <table class="sql-result-table">
          <thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(r=>`<tr>${r.map(v=>`<td class="${v===null?'sql-null':''}">${v===null?'NULL':esc(v)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
  }

  function _renderError(msg) {
    const panel = document.getElementById('sql-panel-result');
    const esc = s => String(s).replace(/</g,'&lt;');
    panel.innerHTML = `
      <div class="sql-error-box">
        <div class="sql-error-title">❌ Lỗi SQL</div>
        <div class="sql-error-msg">${esc(msg)}</div>
        <div class="sql-error-tips">
          <b>Kiểm tra:</b>
          <ul>
            <li>Dấu chấm phẩy <code>;</code> cuối câu</li>
            <li>Tên bảng / cột đúng chính xác</li>
            <li>Chuỗi ký tự bọc trong <code>'...'</code></li>
            <li>Thứ tự: SELECT → FROM → WHERE → ORDER BY</li>
          </ul>
        </div>
      </div>`;
  }

  function _clearResult() {
    const panel = document.getElementById('sql-panel-result');
    if (panel) panel.innerHTML = '<div class="sql-empty-state">▶ Nhấn <b>Chạy</b> để xem kết quả</div>';
    const rc = document.getElementById('sql-row-count');
    if (rc) rc.textContent = '';
  }

  // ── Schema panel ───────────────────────────────────────────────
  function _renderSchema() {
    const panel = document.getElementById('sql-panel-schema');
    if (!panel) return;
    if (!_db) { panel.innerHTML = '<div class="sql-loading">⏳ Đang tải...</div>'; return; }

    try {
      const tables = _db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
      if (!tables.length || !tables[0].values.length) {
        panel.innerHTML = '<div class="sql-empty-state">Chưa có bảng nào</div>';
        return;
      }
      let html = '<div class="sql-schema">';
      for (const [tbl] of tables[0].values) {
        const cols = _db.exec(`PRAGMA table_info(${tbl})`);
        const count = _db.exec(`SELECT COUNT(*) FROM ${tbl}`);
        const nRows = count[0]?.values[0]?.[0] ?? 0;
        html += `<div class="ss-table">
          <div class="ss-table-name">📋 ${tbl} <span class="ss-row-count">${nRows} dòng</span></div>
          <table class="ss-cols">
            <thead><tr><th>Cột</th><th>Kiểu</th><th>KK</th><th>PK</th></tr></thead>
            <tbody>${(cols[0]?.values||[]).map(r=>`
              <tr>
                <td class="ss-col-name">${r[1]}</td>
                <td class="ss-col-type">${r[2]}</td>
                <td>${r[3]?'✓':''}</td>
                <td>${r[5]?'🔑':''}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
      }
      html += '</div>';
      panel.innerHTML = html;
    } catch(e) {
      panel.innerHTML = `<div class="sql-error-box">${e.message}</div>`;
    }
  }

  // ── Panel switching ────────────────────────────────────────────
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

  // ── Snippets ───────────────────────────────────────────────────
  const SNIPPETS = {
    select: 'SELECT *\nFROM ten_bang\nWHERE dieu_kien\nORDER BY cot;',
    where:  'WHERE cot = \'gia_tri\'\nAND cot2 > so\nOR cot3 LIKE \'%chuoi%\'',
    join:   'SELECT a.cot1, b.cot2\nFROM bang_a a\nINNER JOIN bang_b b ON a.khoa = b.khoa\nWHERE dieu_kien;',
    insert: 'INSERT INTO ten_bang (cot1, cot2)\nVALUES (\'gia_tri_1\', \'gia_tri_2\');',
    create: 'CREATE TABLE ten_bang (\n    id INTEGER PRIMARY KEY,\n    ten VARCHAR(64) NOT NULL,\n    khoa_ngoai INTEGER,\n    FOREIGN KEY (khoa_ngoai) REFERENCES bang_khac(id)\n);',
  };

  function insertSnippet(key) {
    const ta = document.getElementById('sql-input');
    if (!ta) return;
    const snip = SNIPPETS[key] || '';
    const start = ta.selectionStart;
    ta.value = ta.value.slice(0, start) + snip + ta.value.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = start + snip.length;
    ta.focus();
  }

  function handleKey(e) {
    const ta = e.target;
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 2;
    }
  }

  // ── Helpers ────────────────────────────────────────────────────
  function _setStatus(msg, type) {
    const el = document.getElementById('sql-status');
    if (!el) return;
    el.textContent = msg;
    el.className = 'sql-status ' + (type || '');
  }

  function _getStarterCode(ex) {
    const saved = _getSaved(ex.id);
    if (saved) return saved;
    // Extract first SQL keyword from desc to suggest starter
    const d = (ex.desc || '').toLowerCase();
    if (d.includes('create table')) return '-- Viết lệnh CREATE TABLE tại đây\n';
    if (d.includes('insert')) return '-- Viết lệnh INSERT INTO tại đây\n';
    if (d.includes('update')) return '-- Viết lệnh UPDATE tại đây\n';
    if (d.includes('delete')) return '-- Viết lệnh DELETE tại đây\n';
    return '-- Viết câu SQL tại đây\nSELECT ';
  }

  function _getCurrentExercise() {
    if (!_currentExId) return null;
    const all = [
      ...(typeof EXERCISES !== 'undefined' ? EXERCISES : []),
      ...(typeof EXERCISES_SQL !== 'undefined' ? EXERCISES_SQL : []),
    ];
    return all.find(e => e.id === _currentExId) || null;
  }

  function getCode() {
    return document.getElementById('sql-input')?.value || '';
  }

  function _save(id, code) {
    try { localStorage.setItem('cl_sql_' + id, code); } catch {}
  }
  function _getSaved(id) {
    try { return localStorage.getItem('cl_sql_' + id); } catch { return null; }
  }

  // ── Run SQL against DB for grading ────────────────────────────
  function execForGrade(sql) {
    if (!_db) return null;
    try {
      return _db.exec(sql.trim().replace(/;?\s*$/, ''));
    } catch { return null; }
  }

  return {
    mount, unmount, runSQL, resetDB, getCode,
    insertSnippet, handleKey, showPanel, execForGrade,
  };
})();
