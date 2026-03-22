/**
 * runtime/sqljs-worker.js — sql.js Web Worker
 * ═══════════════════════════════════════════════════════════════
 * Chạy SQLite thật trong browser bằng sql.js (WebAssembly).
 *
 * Messages nhận vào:
 *   { type: 'load' }                           — khởi tạo sql.js
 *   { type: 'exec', id, initSql, query }       — chạy query trên DB
 *
 * Messages gửi ra:
 *   { type: 'ready' }
 *   { type: 'error', message }
 *   { type: 'result', id, columns, rows, error } — kết quả query
 */

'use strict';

let _SQL = null;

self.onmessage = async function(e) {
  const msg = e.data;

  if (msg.type === 'load') {
    if (_SQL) { self.postMessage({ type: 'ready' }); return; }
    try {
      importScripts('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/sql-wasm.js');
      _SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/${file}`
      });
      self.postMessage({ type: 'ready' });
    } catch(err) {
      self.postMessage({ type: 'error', message: 'Không thể tải sql.js: ' + err.message });
    }
    return;
  }

  if (msg.type === 'exec') {
    const { id, initSql, query } = msg;
    if (!_SQL) {
      self.postMessage({ type: 'result', id, error: 'sql.js chưa load', columns: [], rows: [] });
      return;
    }

    let db;
    try {
      db = new _SQL.Database();

      // Run init SQL to create tables + insert data
      if (initSql) {
        db.run(initSql);
      }

      // Execute student query
      const stmts = db.exec(query.trim());

      if (!stmts || stmts.length === 0) {
        // Query ran but returned no rows (e.g. INSERT, UPDATE — check effect)
        self.postMessage({ type: 'result', id, columns: [], rows: [], rowsAffected: db.getRowsModified() });
        return;
      }

      const { columns, values } = stmts[0];
      self.postMessage({ type: 'result', id, columns, rows: values || [] });

    } catch(err) {
      self.postMessage({ type: 'result', id, error: err.message, columns: [], rows: [] });
    } finally {
      if (db) db.close();
    }
  }
};
