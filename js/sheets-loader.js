// ══════════════════════════════════════════════════════════════════
//  sheets-loader.js — Tải bài tập từ Google Sheets (Private)
//  Dùng Google Sheets API v4 với API Key
//  Offline: tải bản offline đã đóng gói
// ══════════════════════════════════════════════════════════════════

const SheetsDB = (function () {
  'use strict';

  // ── CẤU HÌNH — Giáo viên điền vào đây ─────────────────────────
  const CONFIG = {
    // 1. Spreadsheet ID: lấy từ URL của Google Sheet
    //    https://docs.google.com/spreadsheets/d/ →ID NÀY← /edit
    SPREADSHEET_ID: '',

    // 2. API Key: tạo tại console.cloud.google.com
    //    → APIs & Services → Credentials → Create API Key
    //    → Restrict key: API restrictions → Google Sheets API
    //    → Application restrictions → HTTP referrers → domain trường
    API_KEY: '',

    // 3. Tên 2 tab trong Sheet (phân biệt HOA/thường)
    SHEET_K10: 'K10',
    SHEET_K11: 'K11',
  };

  const CACHE_KEY   = 'pg_exercises_v2';
  const CACHE_TS    = 'pg_exercises_ts';
  const CACHE_TTL   = 2 * 60 * 60 * 1000; // 2 tiếng

  // ── Cột trong Google Sheet (A=0, B=1, ...) ──────────────────────
  // A:id  B:lop  C:chuong  D:muc_bloom  E:so_bai  F:tieu_de
  // G:de_bai  H:ly_thuyet  I:ma_gia  J:tieu_chi_JSON  K:loi_JSON
  const C = { id:0,g:1,ch:2,lv:3,num:4,title:5,desc:6,theory:7,pseudo:8,rb:9,errors:10 };

  // ── Fetch 1 tab qua API v4 ───────────────────────────────────────
  async function fetchTab(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}`
              + `/values/${encodeURIComponent(sheetName)}`
              + `?key=${CONFIG.API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }
    const data = await res.json();
    const rows = (data.values || []).slice(1); // bỏ hàng tiêu đề
    return rows.map(parseRow).filter(Boolean);
  }

  function parseRow(row) {
    if (!row[C.id] || String(row[C.id]).startsWith('#')) return null;
    let rb = [], errors = [];
    try { rb     = JSON.parse(row[C.rb]     || '[]'); } catch(e) {}
    try { errors = JSON.parse(row[C.errors] || '[]'); } catch(e) {}
    return {
      id:     row[C.id]     || '',
      g:      row[C.g]      || 'K10',
      ch:     row[C.ch]     || '',
      lv:     row[C.lv]     || '',
      num:    row[C.num]    || '',
      title:  row[C.title]  || '',
      desc:   row[C.desc]   || '',
      theory: row[C.theory] || '',
      pseudo: row[C.pseudo] || '',
      rb, errors,
    };
  }

  // ── Cache helpers ────────────────────────────────────────────────
  function readCache() {
    try {
      const ts = parseInt(localStorage.getItem(CACHE_TS) || '0');
      if (Date.now() - ts > CACHE_TTL) return null;
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function writeCache(exercises) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(exercises));
      localStorage.setItem(CACHE_TS, String(Date.now()));
    } catch { /* quota */ }
  }

  // ── Banner UI ───────────────────────────────────────────────────
  function banner(msg, color) {
    let el = document.getElementById('sheets-banner');
    if (!el) {
      el = document.createElement('div');
      el.id = 'sheets-banner';
      document.body.prepend(el);
    }
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
    el.style.background = color || 'rgba(79,158,255,.12)';
    el.style.color = color ? '#fff' : '#4f9eff';
  }

  // ── Khởi tạo chính ──────────────────────────────────────────────
  async function init(onReady) {
    if (!CONFIG.SPREADSHEET_ID || !CONFIG.API_KEY) {
      onReady(null, 'static');
      return;
    }

    // 1. Thử tải từ Sheets API
    try {
      banner('🔄 Đang tải bài tập từ Google Sheets...');
      const [k10, k11] = await Promise.all([
        fetchTab(CONFIG.SHEET_K10),
        fetchTab(CONFIG.SHEET_K11),
      ]);
      const all = [...k10, ...k11];
      if (all.length > 0) {
        writeCache(all);
        banner('');
        if (typeof toast === 'function')
          toast(`✅ Tải ${all.length} bài tập từ Sheets`, 2500);
        onReady(all, 'sheets');
        return;
      }
    } catch (err) {
      console.warn('[SheetsDB]', err.message);
      banner('⚠ Không thể tải từ Sheets: ' + err.message, '#c0392b');
      setTimeout(() => banner(''), 4000);
    }

    // 2. Fallback: cache
    const cached = readCache();
    if (cached && cached.length > 0) {
      if (typeof toast === 'function')
        toast('⚡ Dùng dữ liệu cache (offline)', 3000);
      onReady(cached, 'cache');
      return;
    }

    // 3. Fallback: bài tập tĩnh trong exercises.js
    onReady(null, 'static');
  }

  // ── Xuất CSV để import vào Sheets ───────────────────────────────
  function exportToCSV() {
    if (typeof EXERCISES === 'undefined' || !EXERCISES.length) return;
    const Q = s => { s = String(s||'').replace(/"/g,'""'); return s.includes(',')||s.includes('\n')||s.includes('"') ? `"${s}"` : s; };
    const header = 'id,lop,chuong,muc_bloom,so_bai,tieu_de,de_bai,ly_thuyet,ma_gia,tieu_chi_JSON,loi_JSON';
    const rows = EXERCISES.map(e => [
      Q(e.id),Q(e.g),Q(e.ch),Q(e.lv),Q(e.num),Q(e.title),
      Q(e.desc),Q(e.theory||''),Q(e.pseudo||''),
      Q(JSON.stringify(e.rb||[])),
      Q(JSON.stringify(e.errors||[])),
    ].join(','));
    const csv = '\uFEFF' + [header, ...rows].join('\n');
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'})),
      download: 'bai-tap-python.csv'
    });
    a.click();
    if (typeof toast === 'function') toast('📥 Đã xuất ' + EXERCISES.length + ' bài tập ra CSV');
  }

  // ── Tạo bản offline (HTML tự chứa) ──────────────────────────────
  function downloadOffline() {
    const loading = document.getElementById('sheets-banner');
    banner('⏳ Đang đóng gói bản offline...');

    // Đọc tất cả JS/CSS hiện tại
    function readFile(path) {
      return fetch(path).then(r => r.text()).catch(() => '');
    }

    Promise.all([
      readFile('css/style.css'),
      readFile('js/interpreter.js'),
      readFile('js/exercises.js'),
      readFile('js/ui.js'),
      readFile('js/grader.js'),
      readFile('js/app.js'),
      readFile('js/antitab.js'),
    ]).then(([css, interp, exjs, ui, grader, appjs, antitab]) => {

      // Lấy HTML hiện tại, thay thế external refs bằng inline
      let html = document.documentElement.outerHTML;

      // Remove external script/link tags
      html = html
        .replace(/<link[^>]+stylesheet[^>]*>/g, '')
        .replace(/<script src="[^"]*"><\/script>/g, '')
        .replace(/<div id="sheets-banner"[^>]*>[^<]*<\/div>/, '');

      // Inject inline styles and scripts
      const inlineCSS = `<style>\n${css}\n</style>`;
      const inlineJS  = `<script>\n${interp}\n${exjs}\n</script>\n`
                      + `<script>\n${ui}\n${grader}\n${appjs}\n${antitab}\n</script>`;

      html = html.replace('</head>', inlineCSS + '\n</head>');
      html = html.replace('</body>', inlineJS + '\n</body>');

      const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
      const a = Object.assign(document.createElement('a'), {
        href: URL.createObjectURL(blob),
        download: 'tinlab-offline.html'
      });
      a.click();
      banner('');
      if (typeof toast === 'function')
        toast('✅ Đã tải bản offline — mở file HTML để dùng không cần internet', 5000);
    });
  }

  return { init, exportToCSV, downloadOffline, readCache, writeCache };
})();
