/* CodeLab Bundle — built 2026-03-25 11:42
 * 49 modules bundled
 * Exercise data lazy-loaded on grade selection
 */

// ─── js/core/namespace.js ───────────────────────────
/**
 * core/namespace.js — CodeLab Global Namespace Bootstrap
 * ═══════════════════════════════════════════════════════════════
 *
 * MỌI file JS đều phải được load SAU file này.
 *
 * ── QUY TẮC ĐẶT TÊN (Naming Conventions) ──────────────────────
 *
 * Namespace & Modules:
 *   CL                     → Root namespace (CodeLab)
 *   CL.Config              → Hằng số, cấu hình
 *   CL.Events              → EventBus
 *   CL.Store               → Global state
 *   CL.Data.Http           → HTTP client
 *   CL.Data.Cache          → Cache layer
 *   CL.Data.Queue          → Write queue
 *   CL.Auth.Session        → Session management
 *   CL.Auth.UI             → Login screen
 *   CL.Exercises.Registry  → Exercise lookup
 *   CL.Graders.Python      → Python grader
 *   CL.Graders.Html        → HTML grader
 *   CL.Graders.Sql         → SQL grader
 *   CL.Editors.Python      → Python editor
 *   CL.Editors.Html        → HTML editor
 *   CL.Editors.Sql         → SQL editor
 *   CL.UI.Dropdown         → Dropdown component
 *   CL.UI.Toast            → Notifications
 *   CL.UI.Results          → Results panel
 *   CL.Features.AntiCheat  → Anti-cheat
 *   CL.Features.Setup      → Setup wizard
 *   CL.Teacher.Panel       → Teacher panel shell
 *   CL.Teacher.Scores      → Tab: Điểm
 *   CL.Teacher.Violations  → Tab: Vi phạm
 *   CL.Teacher.History     → Tab: Lịch sử
 *   CL.Teacher.Exams       → Tab: Kiểm tra
 *   CL.Teacher.ExEditor    → Tab: Bài tập
 *   CL.Teacher.Config      → Tab: Cấu hình
 *   CL.API                 → Public API facade
 *
 * ── NAMING CONVENTIONS ─────────────────────────────────────────
 *
 * Variables / Properties:
 *   camelCase              → biến thường, thuộc tính public
 *   _camelCase             → thuộc tính private
 *   UPPER_SNAKE_CASE       → hằng số
 *
 * Functions:
 *   camelCase()            → hàm thường
 *   handleXxx()            → event handler
 *   renderXxx()            → render UI
 *   getXxx() / setXxx()    → getter / setter
 *   isXxx() / hasXxx()     → boolean predicate
 *   onXxx()                → callback khi sự kiện xảy ra
 *
 * Events (CL.Events):
 *   'domain:action'        → kebab-case, 2 phần
 *   'auth:login'           → đăng nhập thành công
 *   'auth:logout'          → đăng xuất
 *   'exercise:selected'    → chọn bài tập
 *   'grade:submitted'      → nộp điểm
 *   'exam:status-changed'  → trạng thái kỳ thi thay đổi
 *   'violation:detected'   → phát hiện gian lận
 *
 * CSS Classes (kebab-case):
 *   .cl-component          → prefix cl- cho component mới
 *   .is-active             → state class (is-/has-)
 *
 * LocalStorage Keys:
 *   'cl_*'                 → prefix cl_ cho mọi key
 *
 * ── LOAD ORDER ─────────────────────────────────────────────────
 *  1. core/namespace.js    ← PHẢI ĐẦU TIÊN
 *  2. core/config.js
 *  3. core/utils.js
 *  4. core/events.js
 *  5. core/store.js
 *  6. data/http.js
 *  7. data/cache.js
 *  8. data/queue.js
 *  9. auth/session.js
 * 10. auth/auth.js
 * 11. exercises/registry.js
 * 12. exercises.js, exercises_k12.js, exercises_sql.js
 * 13. interpreter.js
 * 14. graders/python.js, graders/html.js, graders/sql.js
 * 15. editors/python.js, editors/html.js, editors/sql.js
 * 16. ui/dropdown.js, ui/toast.js, ui/results.js
 * 17. features/anti-cheat.js, features/setup-wizard.js
 * 18. features/teacher/*.js
 * 19. api.js
 * 20. app.js              ← PHẢI CUỐI CÙNG
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// ── Guard: chỉ khởi tạo 1 lần ───────────────────────────────────
if (typeof window.CL !== 'undefined' && window.CL._initialized) {
  console.warn('[CL] Namespace đã khởi tạo, bỏ qua.');
} else {
  window.CL = window.CL || {};

  // ── Sub-namespaces (khai báo trước để tránh ReferenceError) ───
  CL.Data     = {};
  CL.Auth     = {};
  CL.Exercises = {};
  CL.Graders  = {};
  CL.Editors  = {};
  CL.UI       = {};
  CL.Features = {};
  CL.Teacher  = {};

  // ── Module registry ──────────────────────────────────────────
  CL._modules = {};

  /**
   * CL.define(path, factory)
   * Đăng ký module vào namespace CL.
   *
   * @param {string}   path    - Đường dẫn dot-notation: 'Data.Cache'
   * @param {Function} factory - Factory function trả về module object
   * @returns Module object đã đăng ký
   *
   * @example
   *   CL.define('Data.Cache', () => ({ get, set, invalidate }));
   *   CL.Data.Cache.get('key');
   */
  CL.define = function (path, factory) {
    if (CL._modules[path]) {
      console.warn(`[CL] Module "${path}" đã tồn tại — ghi đè`);
    }
    const parts = path.split('.');
    let ns = CL;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!ns[parts[i]]) ns[parts[i]] = {};
      ns = ns[parts[i]];
    }
    const leaf = parts[parts.length - 1];
    const mod  = (typeof factory === 'function') ? factory() : factory;
    ns[leaf] = mod;
    CL._modules[path] = mod;
    return mod;
  };

  /**
   * CL.require(path)
   * Lấy module đã đăng ký. Throw Error nếu chưa load.
   *
   * @param {string} path - Đường dẫn dot-notation: 'Data.Cache'
   * @returns Module object
   */
  CL.require = function (path) {
    const parts = path.split('.');
    let ns = CL;
    for (const p of parts) {
      if (!ns || !(p in ns)) {
        throw new ReferenceError(
          `[CL] Module "${path}" chưa được đăng ký.\n` +
          `Kiểm tra load order trong index.html.\n` +
          `Modules đã có: ${Object.keys(CL._modules).join(', ')}`
        );
      }
      ns = ns[p];
    }
    return ns;
  };

  // ── Metadata ─────────────────────────────────────────────────
  CL.version    = '5.3.0';
  CL.appName    = 'CodeLab';
  CL._initialized = true;

  console.info(
    `%c🖥️  ${CL.appName} v${CL.version} — namespace ready`,
    'color:#4f9eff;font-weight:700;font-size:12px'
  );
}

// ─── js/core/config.js ───────────────────────────
/**
 * core/config.js — Tất cả hằng số và cấu hình
 * ═══════════════════════════════════════════════════════════════
 * NGUYÊN TẮC: Mọi magic number / magic string phải được định nghĩa
 * tại đây. Không được hard-code trực tiếp trong business logic.
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js
 */

'use strict';

CL.define('Config', () => ({

  // ── App ────────────────────────────────────────────────────────
  APP_NAME:    'CodeLab',
  APP_VERSION: '5.15.0',

  // ── Server URL — điền URL Apps Script sau khi deploy ─────────
  // Admin dán URL vào đây một lần duy nhất trước khi phân phối app:
  //   https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
  // Nếu để trống: app đọc từ localStorage (nhập qua trang Cấu hình)
  DEPLOY_URL: 'https://script.google.com/macros/s/AKfycbyZBN0-eluSX08_QJXIz5Y7RA-UuJp9GQ5rXaA1OXeXvmNtYQGzLzCJVyDzaw90sday/exec',

  // ── CT GDPT 2018 — Năng lực đặc thù Tin học ──────────────────
  // Mapping Bloom Level → Năng lực chính (theo TT32/2018)
  BLOOM_NL_MAP: {
    'B1': ['NL2a'],               // Nhận biết → Nhận diện vấn đề
    'B2': ['NL1a', 'NL2a'],       // Hiểu → Mô hình hóa, Phân tích
    'B3': ['NL1b', 'NL2b'],       // Vận dụng → Phân tích, Lập kế hoạch
    'B4': ['NL1b', 'NL1c', 'NL2c'], // Phân tích → Thiết kế, Thực hiện
    'B5': ['NL1d', 'NL2d'],       // Đánh giá → Đánh giá, Điều chỉnh
    'B6': ['NL1c', 'NL2c', 'NL3'], // Sáng tạo → Thiết kế, Ứng dụng
  },

  // Nhóm NL cấp cao (dùng cho radar chart)
  NL_GROUPS: {
    NL1: { label: 'Tư duy & lập luận CT',   color: '#4f9eff', subs: ['NL1a','NL1b','NL1c','NL1d'] },
    NL2: { label: 'Giải quyết vấn đề CNTT', color: '#34d399', subs: ['NL2a','NL2b','NL2c','NL2d'] },
    NL3: { label: 'Ứng dụng CNTT',          color: '#a78bfa', subs: ['NL3']                       },
  },

  // Bloom → nhóm theo TT26/2022 (4 mức cho ma trận đề)
  BLOOM_TT26: {
    'B1': 'Nhận biết',     'B2': 'Thông hiểu',
    'B3': 'Thông hiểu',    'B4': 'Vận dụng',
    'B5': 'Vận dụng cao',  'B6': 'Vận dụng cao',
  },
  ACTIVE_NAM_HOC: '',    // loaded from server via API.getNamHocInfo()
  APP_REPO:    'https://github.com/TriHue-life',

  // ── LocalStorage keys (prefix cl_) ───────────────────────────
  LS: {
    SCRIPT_URL:   'cl_script_url',
    LAST_CLEANUP: 'cl_last_cleanup',
    VIOLATION:    'cl_vp_cache',
    HTML_CODE:    'cl_html_',       // + exerciseId
    SQL_CODE:     'cl_sql_',        // + exerciseId
    CACHE_PREFIX: 'cl_c_',          // + cacheKey
  },

  // ── SessionStorage keys ───────────────────────────────────────
  SS: {
    SESSION: 'cl_session_v4',
  },

  // ── Auth ──────────────────────────────────────────────────────
  AUTH: {
    TOKEN_TTL_MS:    8 * 3600_000,   // 8 giờ
    SESSION_VERSION: 'v4',
  },

  // ── API / Network ─────────────────────────────────────────────
  API: {
    TIMEOUT_MS:       12_000,   // 12 giây
    SETUP_TIMEOUT_MS: 60_000,   // 60 giây (autoSetup)
    RATE_LIMIT:       200,      // req/min/user
    LOG_BATCH_SIZE:   50,       // tối đa log buffered
    LOG_FLUSH_MS:     5_000,    // flush log mỗi 5 giây
    QUEUE_MAX_TRIES:  3,        // retry tối đa
    QUEUE_BACKOFF_MS: 1_000,    // backoff cơ sở (x tries)
  },

  // ── Cache TTL (milliseconds) ──────────────────────────────────
  CACHE_TTL: {
    EXERCISES:  24 * 3600_000,  // 24h — bundle tĩnh
    EXAMS:       5 * 60_000,    // 5 phút
    SCORES:      2 * 60_000,    // 2 phút
    HISTORY:     5 * 60_000,
    VIOLATIONS:      60_000,    // 1 phút
    EXERCISE_DETAIL: 10 * 60_000,
    STUDENTS:    2 * 60_000,
    SERVER_CACHE_S:    300,     // 5 phút (Apps Script ScriptCache)
  },

  // ── Anti-cheat ────────────────────────────────────────────────
  ANTI_CHEAT: {
    MAX_WARNINGS:    1,    // cảnh báo trước khi auto-submit
    BLUR_DELAY_MS: 300,    // delay phân biệt blur vs tab switch
    LOCAL_CACHE_MAX: 100,  // tối đa violation records local
  },

  // ── Grading ───────────────────────────────────────────────────
  GRADE: {
    FLOAT_TOLERANCE:  0.01,  // ±0.01 khi so sánh số thực Python
    SHOW_SOLUTION_BELOW: 9.5,  // hiện đáp án nếu điểm < 9.5
  },

  // ── Exercise types ────────────────────────────────────────────
  EX_TYPE: {
    PYTHON: 'python',
    HTML:   'html',
    SQL:    'sql',
  },

  // ── Grade keys (dropdown) ─────────────────────────────────────
  GRADES: [
    { value: 'K10',      text: '🐍 Lớp 10 – Python (KNTT)',         type: 'python' },
    { value: 'K11',      text: '🐍 Lớp 11 – Python (KNTT)',         type: 'python' },
    { value: 'K11-SQL',  text: '🗃 Lớp 11 – SQL/CSDL (KNTT)',       type: 'sql'    },
    { value: 'K12-CTST', text: '🌐 Lớp 12 – HTML/CSS (CTST)',       type: 'html'   },
    { value: 'K12-KNTT', text: '🌐 Lớp 12 – HTML/CSS (KNTT)',       type: 'html'   },
  ],

  // ── Google Drive folder name ──────────────────────────────────
  DRIVE: {
    FOLDER_NAME: 'CodeLab',
  },

  // ── Teacher panel tabs ────────────────────────────────────────
  TEACHER_TABS: [
    { id: 'scores',     label: '📊 Điểm'       },
    { id: 'violations', label: '🚨 Vi phạm'    },
    { id: 'history',    label: '📖 Lịch sử'    },
    { id: 'exams',      label: '📋 Kiểm tra'   },
    { id: 'analytics',  label: '📈 Thống kê'   },
    { id: 'exercises',  label: '✏️ Bài tập'    },
    { id: 'config',     label: '⚙️ Cấu hình'   },
  ],

  // ── Bloom levels ─────────────────────────────────────────────
  BLOOM_LEVELS: [
    'B1 – Nhận biết',
    'B2 – Hiểu',
    'B3 – Áp dụng',
    'B4 – Phân tích',
    'B5 – Đánh giá',
    'B6 – Sáng tạo',
  ],

}));

// ─── js/core/utils.js ───────────────────────────
/**
 * core/utils.js — Pure Utility Functions
 * ═══════════════════════════════════════════════════════════════
 * NGUYÊN TẮC:
 *   - Hàm thuần túy (pure): không có side effects, không đọc/ghi
 *     state bên ngoài trừ tham số truyền vào.
 *   - Không import bất kỳ CL module nào khác.
 *   - Có thể unit test độc lập.
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js
 */

'use strict';

CL.define('Utils', () => {

  // ── String / HTML ─────────────────────────────────────────────

  /**
   * Escape HTML entities để tránh XSS
   * @param {*} value
   * @returns {string}
   */
  function escHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Strip HTML tags, trả về plain text
   * @param {string} html
   * @returns {string}
   */
  function stripHtml(html) {
    return String(html || '')
      .replace(/<pre[^>]*>/gi, '\n')
      .replace(/<\/pre>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /**
   * Truncate string, thêm '...' nếu dài hơn max
   */
  function truncate(str, max = 100) {
    const s = String(str || '');
    return s.length > max ? s.slice(0, max) + '…' : s;
  }

  // ── Date / Time ───────────────────────────────────────────────

  /**
   * Format timestamp thành dd/MM HH:mm
   * @param {string|Date} ts
   * @returns {string}
   */
  function formatTime(ts) {
    if (!ts) return '—';
    const d = ts instanceof Date ? ts : new Date(ts);
    if (isNaN(d.getTime())) return String(ts);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getDate()}/${d.getMonth() + 1} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  /**
   * Format timestamp thành ISO string (cho log)
   */
  function nowISO() {
    return new Date().toISOString();
  }

  // ── Number ────────────────────────────────────────────────────

  /**
   * Phân loại điểm thành CSS class
   * @param {number|string} score
   * @returns {'score-hi'|'score-md'|'score-lo'}
   */
  function scoreClass(score) {
    const n = parseFloat(score);
    if (n >= 8) return 'score-hi';
    if (n >= 5) return 'score-md';
    return 'score-lo';
  }

  /**
   * Tính phần trăm, làm tròn 1 chữ số
   */
  function calcPercent(earned, total) {
    if (!total) return 0;
    return Math.round((earned / total) * 1000) / 10;
  }

  // ── Crypto ────────────────────────────────────────────────────

  /**
   * SHA-256 hash chuỗi (async, Web Crypto API)
   * @param {string} str
   * @returns {Promise<string>} hex string
   */
  async function sha256(str) {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(str)
    );
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // ── CSV / Export ──────────────────────────────────────────────

  /**
   * Escape một cell CSV
   */
  function csvCell(val) {
    const s = String(val ?? '').replace(/"/g, '""');
    return (s.includes(',') || s.includes('\n') || s.includes('"'))
      ? `"${s}"`
      : s;
  }

  /**
   * Tạo và download file CSV
   * @param {string[][]} rows  - Mảng 2 chiều
   * @param {string}     fname - Tên file
   */
  function downloadCsv(rows, fname) {
    const csv = '\uFEFF' + rows.map(r => r.map(csvCell).join(',')).join('\n');
    const a   = Object.assign(document.createElement('a'), {
      href:     URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })),
      download: fname,
    });
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }

  // ── DOM ───────────────────────────────────────────────────────

  /**
   * Lấy element theo id, throw nếu không tìm thấy (debug helper)
   */
  function getEl(id) {
    const el = document.getElementById(id);
    if (!el) console.warn(`[CL.Utils] Element #${id} không tồn tại`);
    return el;
  }

  /**
   * Tạo element từ HTML string (trả về HTMLElement đầu tiên)
   */
  function createEl(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstElementChild;
  }

  // ── Object ────────────────────────────────────────────────────

  /**
   * Deep clone (JSON-safe)
   */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Safe JSON parse, trả về fallback nếu lỗi
   */
  function safeJsonParse(str, fallback = null) {
    try { return JSON.parse(str); }
    catch { return fallback; }
  }

  // ── Array ─────────────────────────────────────────────────────

  /**
   * Group array by key function
   * @returns {Object.<string, Array>}
   */
  function groupBy(arr, keyFn) {
    return arr.reduce((acc, item) => {
      const key = keyFn(item);
      (acc[key] = acc[key] || []).push(item);
      return acc;
    }, {});
  }

  /**
   * Unique array by key function
   */
  function uniqueBy(arr, keyFn) {
    const seen = new Set();
    return arr.filter(item => {
      const k = keyFn(item);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  // ── Public API ────────────────────────────────────────────────
  return {
    escHtml, stripHtml, truncate,
    formatTime, nowISO,
    scoreClass, calcPercent,
    sha256,
    csvCell, downloadCsv,
    getEl, createEl,
    deepClone, safeJsonParse,
    groupBy, uniqueBy,
  };
});

// ─── js/core/events.js ───────────────────────────
/**
 * core/events.js — EventBus (Pub/Sub)
 * ═══════════════════════════════════════════════════════════════
 * Giảm coupling giữa các module: thay vì module A gọi trực tiếp
 * module B, A chỉ emit event, B lắng nghe và phản ứng.
 *
 * ── DANH SÁCH EVENTS CHUẨN ─────────────────────────────────────
 *
 * Auth:
 *   'auth:login'            { user }         Đăng nhập thành công
 *   'auth:logout'           {}               Đăng xuất
 *   'auth:session-expired'  {}               Session hết hạn
 *
 * Exercise:
 *   'exercise:selected'     { exercise }     Chọn bài tập
 *   'exercise:cleared'      {}               Bỏ chọn bài
 *   'exercise:loaded'       { exercise }     Bài đã load xong
 *
 * Grade:
 *   'grade:submitted'       { exId, score }  Nộp điểm
 *   'grade:complete'        { result }       Chấm xong
 *
 * Exam:
 *   'exam:status-changed'   { examId, status }
 *   'exam:saved'            { exam }
 *
 * Violation:
 *   'violation:detected'    { type, count }  Phát hiện gian lận
 *   'violation:locked'      { exId }         Bị khóa bài
 *
 * API:
 *   'api:connected'         { latency }      Kết nối thành công
 *   'api:error'             { error }        Lỗi API
 *   'api:queue-flush'       { count }        Queue được flush
 *
 * UI:
 *   'ui:tab-changed'        { tab }          Đổi tab
 *   'ui:theme-changed'      { theme }        Đổi theme
 *
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js
 */

'use strict';

CL.define('Events', () => {

  /** @type {Map<string, Set<Function>>} */
  const _listeners = new Map();

  /**
   * Đăng ký lắng nghe event
   * @param {string}   event    - Tên event 'domain:action'
   * @param {Function} listener - Callback nhận data
   * @returns {Function} Hàm unsubscribe
   */
  function on(event, listener) {
    if (!_listeners.has(event)) _listeners.set(event, new Set());
    _listeners.get(event).add(listener);
    // Trả về hàm để dễ cleanup
    return () => off(event, listener);
  }

  /**
   * Đăng ký lắng nghe 1 lần duy nhất
   */
  function once(event, listener) {
    const wrapper = (data) => {
      listener(data);
      off(event, wrapper);
    };
    return on(event, wrapper);
  }

  /**
   * Hủy đăng ký
   */
  function off(event, listener) {
    _listeners.get(event)?.delete(listener);
  }

  /**
   * Phát sự kiện
   * @param {string} event - Tên event
   * @param {*}      data  - Dữ liệu đính kèm
   */
  function emit(event, data) {
    if (!_listeners.has(event)) return;
    // Clone để tránh vấn đề nếu listener tự off() trong callback
    const fns = [..._listeners.get(event)];
    for (const fn of fns) {
      try {
        fn(data);
      } catch (err) {
        console.error(`[CL.Events] Lỗi trong listener "${event}":`, err);
      }
    }
  }

  /**
   * Xem danh sách events đã đăng ký (debug)
   */
  function debug() {
    const info = {};
    for (const [event, set] of _listeners) {
      info[event] = set.size;
    }
    console.table(info);
  }

  return { on, once, off, emit, debug };
});

// ─── js/core/store.js ───────────────────────────
/**
 * core/store.js — Global State Store
 * ═══════════════════════════════════════════════════════════════
 * Lưu trữ state ứng dụng tập trung. Mọi module đọc/ghi state
 * thông qua đây thay vì dùng biến global.
 *
 * NGUYÊN TẮC:
 *   - State chỉ thay đổi qua Store.set()
 *   - Đọc qua Store.get()
 *   - Thay đổi state tự động emit event 'store:changed'
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/events.js
 */

'use strict';

CL.define('Store', () => {

  /** @type {Object.<string, *>} */
  const _state = {
    // Auth
    currentUser:      null,   // { role, name, mshs|username, lop, token }
    isAuthenticated:  false,

    // Exercise selection
    currentExId:      '',     // ID bài tập đang chọn
    currentExType:    '',     // 'python' | 'html' | 'sql'
    currentGrade:     '',     // 'K10' | 'K11' | ...
    currentChapter:   '',

    // Exam
    activeExams:      [],     // Kỳ thi đang mở

    // App
    isOnline:         true,
    lastError:        null,
  };

  /**
   * Lấy giá trị state
   * @param {string} key
   * @returns {*}
   */
  function get(key) {
    if (!(key in _state)) {
      console.warn(`[CL.Store] Key "${key}" chưa được khai báo trong store`);
    }
    return _state[key];
  }

  /**
   * Cập nhật state, tự emit 'store:changed'
   * @param {string} key
   * @param {*}      value
   */
  function set(key, value) {
    const prev = _state[key];
    _state[key] = value;
    // Emit nếu thực sự thay đổi (shallow compare)
    if (prev !== value) {
      CL.Events.emit('store:changed', { key, value, prev });
    }
  }

  /**
   * Cập nhật nhiều key cùng lúc
   * @param {Object} updates
   */
  function update(updates) {
    for (const [key, value] of Object.entries(updates)) {
      set(key, value);
    }
  }

  /**
   * Reset toàn bộ auth state khi logout
   */
  function resetAuth() {
    update({
      currentUser:     null,
      isAuthenticated: false,
    });
  }

  /**
   * Lấy snapshot toàn bộ state (deep clone, để debug)
   */
  function snapshot() {
    return JSON.parse(JSON.stringify(_state));
  }

  // ── Backward-compat: duy trì window.currentUser / window.currentExId
  // cho các file cũ chưa refactor
  CL.Events.on('store:changed', ({ key, value }) => {
    if (key === 'currentUser')  window.currentUser  = value;
    if (key === 'currentExId')  window.currentExId  = value;
  });

  return { get, set, update, resetAuth, snapshot };
});

// ─── js/data/http.js ───────────────────────────
/**
 * data/http.js — HTTP Client
 * ═══════════════════════════════════════════════════════════════
 * Wrapper mỏng quanh fetch() với:
 *   - Timeout tự động
 *   - Chuẩn hóa lỗi
 *   - Không biết về business logic (cache, queue, auth)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js
 */

'use strict';

CL.define('Data.Http', () => {

  const cfg = CL.require('Config');

  /**
   * POST JSON đến Apps Script backend
   * @param {string} url
   * @param {Object} body
   * @param {number} [timeoutMs]
   * @returns {Promise<*>} data field từ response
   * @throws {Error} Nếu !response.ok hoặc timeout
   */
  async function post(url, body, timeoutMs = cfg.API.TIMEOUT_MS) {
    _assertUrl(url);
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res  = await fetch(url, {
        method:   'POST',
        redirect: 'follow',
        body:     JSON.stringify(body),
        signal:   ctrl.signal,
      });
      return _parseResponse(res);
    } catch (err) {
      throw _normalizeError(err);
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * GET với query string từ Apps Script backend
   * @param {string} url
   * @param {Object} params
   * @param {number} [timeoutMs]
   * @returns {Promise<*>}
   */
  async function get(url, params = {}, timeoutMs = cfg.API.TIMEOUT_MS) {
    _assertUrl(url);
    const qs  = new URLSearchParams(params);
    const res = await fetch(`${url}?${qs}`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    return _parseResponse(res);
  }

  /**
   * POST fire-and-forget (mode no-cors, không đợi response)
   * Dùng cho log access — không block UI, không cần response
   */
  function postAsync(url, body) {
    if (!url) return;
    fetch(url, {
      method:   'POST',
      redirect: 'follow',
      body:     JSON.stringify(body),
    }).catch(() => {}); // silent fail
  }

  // ── Helpers ──────────────────────────────────────────────────

  async function _parseResponse(res) {
    let data;
    try { data = await res.json(); }
    catch { throw new Error(`Server trả về response không phải JSON (status ${res.status})`); }
    if (!data.ok) throw new Error(data.error || `API error (status ${res.status})`);
    return data.data;
  }

  function _assertUrl(url) {
    if (!url) throw new Error('Chưa cấu hình Apps Script URL. Vào ⚙️ Cấu hình để thiết lập.');
  }

  function _normalizeError(err) {
    if (err.name === 'AbortError') {
      return new Error('Kết nối quá lâu (timeout). Kiểm tra kết nối mạng.');
    }
    return err;
  }

  return { post, get, postAsync };
});

// ─── js/data/cache.js ───────────────────────────
/**
 * data/cache.js — Stale-While-Revalidate Cache
 * ═══════════════════════════════════════════════════════════════
 * 2 tầng cache:
 *   1. Memory (_mem) — nhanh, mất khi reload trang
 *   2. localStorage ('cl_c_*') — bền, tồn tại qua reload
 *
 * Chiến lược SWR:
 *   - Nếu cache FRESH → trả ngay
 *   - Nếu cache STALE → trả cache cũ + refresh nền
 *   - Nếu cache MISS  → fetch, đợi kết quả
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js
 */

'use strict';

CL.define('Data.Cache', () => {

  const cfg = CL.require('Config');

  /** @type {Map<string, {data:*, exp:number, ts:number}>} */
  const _mem = new Map();

  // ── Restore from localStorage on boot ────────────────────────
  (function _restore() {
    const pfx = cfg.LS.CACHE_PREFIX;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k?.startsWith(pfx)) continue;
      try {
        const entry = JSON.parse(localStorage.getItem(k));
        // Giữ extra 1h sau khi hết hạn (cho SWR stale)
        if (entry && Date.now() < entry.exp + 3_600_000) {
          _mem.set(k.slice(pfx.length), entry);
        } else {
          localStorage.removeItem(k);
        }
      } catch { localStorage.removeItem(k); }
    }
  })();

  /**
   * Lấy từ cache
   * @param {string} key
   * @returns {{ data:*, stale:boolean }|null}
   */
  function get(key) {
    const entry = _mem.get(key);
    if (!entry) return null;
    return { data: entry.data, stale: Date.now() > entry.exp };
  }

  /**
   * Lưu vào cache
   * @param {string} key
   * @param {*}      data
   * @param {number} ttlMs
   */
  function set(key, data, ttlMs) {
    const entry = { data, exp: Date.now() + ttlMs, ts: Date.now() };
    _mem.set(key, entry);
    // Persist một số cache quan trọng vào localStorage
    if (_shouldPersist(key)) {
      try {
        localStorage.setItem(cfg.LS.CACHE_PREFIX + key, JSON.stringify(entry));
      } catch {}
    }
  }

  /**
   * Xóa theo prefix
   * @param {string} prefix
   */
  function invalidate(prefix) {
    for (const key of [..._mem.keys()]) {
      if (key.startsWith(prefix)) _mem.delete(key);
    }
    const pfx = cfg.LS.CACHE_PREFIX + prefix;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k?.startsWith(pfx)) localStorage.removeItem(k);
    }
  }

  /**
   * Xóa tất cả cache (logout hoặc manual cleanup)
   */
  function clear() {
    _mem.clear();
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k?.startsWith(cfg.LS.CACHE_PREFIX)) localStorage.removeItem(k);
    }
  }

  /**
   * Dọn dẹp cache hết hạn (gọi mỗi ngày)
   * @returns {number} Số entries đã xóa
   */
  function cleanup() {
    const now = Date.now();
    let count = 0;
    // Memory
    for (const [k, e] of _mem) {
      if (now > e.exp + 86_400_000) { _mem.delete(k); count++; }
    }
    // localStorage
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (!k?.startsWith(cfg.LS.CACHE_PREFIX)) continue;
      try {
        const e = JSON.parse(localStorage.getItem(k));
        if (now > e.exp + 86_400_000) { localStorage.removeItem(k); count++; }
      } catch { localStorage.removeItem(k); count++; }
    }
    localStorage.setItem(cfg.LS.LAST_CLEANUP, String(now));
    return count;
  }

  /**
   * SWR helper: đọc cache + fetch nền nếu stale
   * @param {string}   key     - Cache key
   * @param {number}   ttlMs   - TTL
   * @param {Function} fetcher - async () => data
   * @param {boolean}  [force] - Bỏ qua cache, luôn fetch
   * @returns {Promise<*>}
   */
  async function swr(key, ttlMs, fetcher, force = false) {
    const cached = get(key);
    if (cached && !cached.stale && !force) return cached.data;
    if (cached && cached.stale && !force) {
      // Trả ngay, refresh nền
      fetcher().then(data => set(key, data, ttlMs)).catch(() => {});
      return cached.data;
    }
    const data = await fetcher();
    set(key, data, ttlMs);
    return data;
  }

  // ── Private ───────────────────────────────────────────────────
  function _shouldPersist(key) {
    return key.startsWith('exams') || key.startsWith('exercise_');
  }

  // ── Auto daily cleanup ────────────────────────────────────────
  const lastCleanup = parseInt(localStorage.getItem(cfg.LS.LAST_CLEANUP) || '0');
  if (Date.now() - lastCleanup > 23 * 3_600_000) {
    setTimeout(() => {
      const n = cleanup();
      if (n > 0) console.info(`[CL.Cache] Dọn ${n} entries hết hạn`);
    }, 3000);
  }

  return { get, set, invalidate, clear, cleanup, swr };
});

// ─── js/data/queue.js ───────────────────────────
/**
 * data/queue.js — Write Queue (Fire-and-Forget với Retry)
 * ═══════════════════════════════════════════════════════════════
 * Đảm bảo các write operation (nộp điểm, log) không bị mất dù
 * mạng chập chờn, xử lý 200+ user đồng thời không bị flood.
 *
 * Chiến lược:
 *   - Ghi vào queue ngay lập tức (non-blocking)
 *   - Worker xử lý tuần tự, retry với exponential backoff
 *   - Tối đa MAX_TRIES lần, sau đó discard
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js, core/events.js, data/http.js
 */

'use strict';

CL.define('Data.Queue', () => {

  const cfg = CL.require('Config');

  /** @type {{ action:string, body:Object, tries:number }[]} */
  const _queue  = [];
  let   _busy   = false;

  /**
   * Thêm operation vào queue
   * @param {string} action - Apps Script action name
   * @param {Object} body   - Request body
   */
  function enqueue(action, body) {
    _queue.push({ action, body, tries: 0 });
    if (!_busy) _processNext();
  }

  /**
   * Số items đang chờ trong queue
   */
  function size() { return _queue.length; }

  // ── Worker ────────────────────────────────────────────────────

  async function _processNext() {
    if (!_queue.length) { _busy = false; return; }
    _busy = true;

    const item = _queue[0];
    item.tries++;

    const url = localStorage.getItem(cfg.LS.SCRIPT_URL);
    if (!url) {
      // Chưa cấu hình URL — giữ trong queue, thử lại sau
      setTimeout(_processNext, 5_000);
      return;
    }

    try {
      await CL.Data.Http.post(url, { action: item.action, ...item.body });
      _queue.shift(); // thành công
      CL.Events.emit('api:queue-flush', { action: item.action });
    } catch (err) {
      if (item.tries >= cfg.API.QUEUE_MAX_TRIES) {
        console.warn(`[CL.Queue] Bỏ qua sau ${item.tries} lần thử: ${item.action}`);
        _queue.shift();
      } else {
        // Exponential backoff
        const delay = cfg.API.QUEUE_BACKOFF_MS * item.tries;
        await new Promise(r => setTimeout(r, delay));
      }
    }

    _processNext();
  }

  return { enqueue, size };
});

// ─── js/auth/session.js ───────────────────────────
/**
 * auth/session.js — Session Storage Management
 * ═══════════════════════════════════════════════════════════════
 * Đóng gói mọi thao tác với sessionStorage liên quan đến auth.
 * Không chứa UI logic.
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js
 */

'use strict';

CL.define('Auth.Session', () => {

  const cfg = CL.require('Config');
  const KEY = cfg.SS.SESSION;

  /**
   * @typedef {Object} UserSession
   * @property {'teacher'|'student'} role
   * @property {string} token   - Server-side session token
   * @property {string} name    - Họ tên
   * @property {string} lop     - Lớp
   * @property {string} [mshs]  - MSHS (student only)
   * @property {string} [username] - Username (teacher only)
   * @property {string} [email]
   * @property {number} createdAt - timestamp
   */

  /**
   * Lưu session sau đăng nhập
   * @param {UserSession} user
   */
  function save(user) {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        ...user,
        createdAt: Date.now(),
      }));
    } catch (e) {
      console.error('[CL.Session] Không thể lưu session:', e);
    }
  }

  /**
   * Lấy session hiện tại
   * @returns {UserSession|null}
   */
  function get() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Kiểm tra TTL (8h)
      if (Date.now() - (data.createdAt || 0) > cfg.AUTH.TOKEN_TTL_MS) {
        clear();
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  /**
   * Lấy token từ session hiện tại
   * @returns {string}
   */
  function getToken() {
    return get()?.token || '';
  }

  /**
   * Kiểm tra có đang đăng nhập không
   */
  function isLoggedIn() {
    return !!get();
  }

  /**
   * Xóa session (logout)
   */
  function clear() {
    localStorage.removeItem(KEY);
  }

  /**
   * Kiểm tra role
   * @param {'teacher'|'student'} role
   */
  function hasRole(role) {
    return get()?.role === role;
  }

  return { save, get, getToken, isLoggedIn, clear, hasRole };
});

// ─── js/auth/auth.js ───────────────────────────
/**
 * auth/auth.js — Login UI & Authentication Flow
 * ═══════════════════════════════════════════════════════════════
 * Trách nhiệm:
 *   - Render màn hình đăng nhập
 *   - Hash mật khẩu SHA-256 trước khi gửi
 *   - Gọi API login → lưu session → emit 'auth:login'
 *   - Áp dụng role vào UI (teacher/student)
 *
 * KHÔNG chứa: HTTP logic (→ Data.Http), session storage (→ Auth.Session)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, auth/session.js, data/http.js
 */

'use strict';

CL.define('Auth.UI', () => {

  const cfg     = CL.require('Config');
  const Utils   = CL.require('Utils');
  const Events  = CL.require('Events');
  const Store   = CL.require('Store');
  const Session = CL.require('Auth.Session');

  let _onSuccess = null;

  // ── Public API ────────────────────────────────────────────────

  /**
   * Khởi động auth: nếu có session hợp lệ → dùng ngay,
   * ngược lại → hiển thị màn hình login.
   * @param {Function} onReady - Callback nhận user object
   */
  function init(onReady) {
    _onSuccess = onReady;
    const existing = Session.get();
    if (existing) {
      // Session còn hợp lệ (F5) → khôi phục không login lại
      document.documentElement.classList.remove('auth-required');
      document.body.classList.remove('auth-pending');
      const shell = document.getElementById('app-shell');
      if (shell) { shell.style.removeProperty('display'); shell.style.removeProperty('visibility'); }
      _applyRole(existing);
      CL.Events?.emit('auth:login', { user: existing });
      onReady(existing);
    } else {
      _renderLoginScreen();
    }
  }

  /**
   * Đăng xuất: xóa session, emit event, reload UI
   */
  async function logout() {
    const token = Session.getToken();
    // Thông báo server (fire-and-forget)
    const url = localStorage.getItem(cfg.LS.SCRIPT_URL);
    if (url && token) {
      CL.Data.Http.postAsync(url, { action: 'logout', token });
    }
    Session.clear();
    Store.resetAuth();
    Events.emit('auth:logout', {});
    location.reload();
  }

  function setScriptUrl(url) {
    localStorage.setItem(cfg.LS.SCRIPT_URL, url.trim());
  }

  // ── Render login screen ───────────────────────────────────────

  function _renderLoginScreen() {
    // Đảm bảo app-shell bị ẩn hoàn toàn trong khi overlay chưa hiện
    document.body.classList.add('auth-pending');
    const shell = document.getElementById('app-shell');
    if (shell) shell.style.removeProperty('visibility'); // xoá inline style nếu có

    const ov = document.createElement('div');
    ov.id = 'auth-overlay';
    ov.innerHTML = `
      <div class="auth-card">
        <div class="auth-brand">
          <div class="auth-brand-icon">🖥️</div>
          <div class="auth-brand-name">${cfg.APP_NAME}</div>
          <div class="auth-brand-school">THPT Thủ Thiêm</div>
          <div class="auth-brand-sub">Hệ thống luyện tập &amp; kiểm tra lập trình</div>
        </div>

        <div class="auth-form">
          <input type="text" style="display:none" aria-hidden="true" tabindex="-1">
          <input type="password" style="display:none" aria-hidden="true" tabindex="-1">

          <div class="auth-field">
            <label for="in-id">Tài khoản</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon" id="in-id-icon">🪪</span>
              <input id="in-id" type="text"
                placeholder="CCCD (12 số) hoặc username"
                autocomplete="off" autocorrect="off" autocapitalize="off"
                spellcheck="false" name="cl-id-field"
                readonly
                onfocus="this.removeAttribute('readonly');CL.Auth.UI._detectType(this.value)"
                onclick="this.removeAttribute('readonly')"
                oninput="CL.Auth.UI._detectType(this.value)"
                onkeydown="if(event.key==='Enter')document.getElementById('in-pw').focus()">
            </div>
            <div class="auth-type-hint" id="auth-type-hint"></div>
          </div>

          <div class="auth-field">
            <label for="in-pw">Mật khẩu</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔑</span>
              <input id="in-pw" type="password"
                placeholder="Nhập mật khẩu"
                autocomplete="new-password" name="cl-pw-field"
                readonly
                onfocus="this.removeAttribute('readonly')"
                onclick="this.removeAttribute('readonly')"
                onkeydown="if(event.key==='Enter')CL.Auth.UI._submit()">
              <button class="auth-eye" type="button"
                onclick="CL.Auth.UI._togglePw('in-pw',this)">👁</button>
            </div>
          </div>

          <div class="auth-hint" id="auth-hint"><span id="in-pw-hint">💡 Học sinh nhập CCCD · Giáo viên nhập username</span></div>
          <div class="auth-error" id="err-main" role="alert"></div>

          <button class="auth-submit-btn" id="btn-main"
            onclick="CL.Auth.UI._submit()">
            <span>Đăng nhập</span>
            <span class="auth-btn-arrow">→</span>
          </button>
        </div>



        <div class="auth-footer">
          <span>CodeLab v${cfg.APP_VERSION}</span>
          <span>THPT Thủ Thiêm · ${new Date().getFullYear()}</span>
        </div>
      </div>`;

    document.body.appendChild(ov);
    ov.classList.add('show');  // immediate — no rAF delay
    setTimeout(() => {
      const el = document.getElementById('in-id');
      if (el) { el.value = ''; el.focus(); }
      const pw = document.getElementById('in-pw');
      if (pw) pw.value = '';

    }, 400);
  }
  // ── Auto-detect user type from input ────────────────────────
  function _detectType(val) {
    const hint = document.getElementById('auth-type-hint');
    const icon = document.getElementById('in-id-icon');
    const pw   = document.getElementById('in-pw-hint');
    val = (val || '').trim();
    if (!val) {
      if (hint) { hint.textContent = ''; hint.className = 'auth-type-hint'; }
      if (icon) icon.textContent = '🪪';
      return;
    }
    const isStudent = /^\d{9,12}$/.test(val);
    if (isStudent) {
      if (hint) { hint.textContent = '🎓 Học sinh'; hint.className = 'auth-type-hint student'; }
      if (icon) icon.textContent = '🎓';
      if (pw)   pw.textContent   = 'Mật khẩu mặc định = CCCD của bạn';
    } else {
      if (hint) { hint.textContent = '👨‍🏫 Giáo viên / Admin'; hint.className = 'auth-type-hint teacher'; }
      if (icon) icon.textContent = '👨‍🏫';
      if (pw)   pw.textContent   = '';
    }
  }

  // ── Submit ────────────────────────────────────────────────────
  async function _submit() {
    const idVal  = (document.getElementById('in-id')?.value || '').trim();
    const rawPwd = (document.getElementById('in-pw')?.value  || '').trim();

    if (!idVal)   return _showError('err-main', 'Vui lòng nhập tài khoản');
    if (!rawPwd)  return _showError('err-main', 'Vui lòng nhập mật khẩu');

    const url = (cfg.DEPLOY_URL && cfg.DEPLOY_URL.startsWith('http'))
      ? cfg.DEPLOY_URL
      : localStorage.getItem(cfg.LS.SCRIPT_URL);
    if (!url) return _showError('err-main', '⚠️ Chưa cấu hình server. Liên hệ quản trị viên.');

    // Auto-detect: chỉ số 9-12 chữ số = học sinh, còn lại = giáo viên/admin
    const role = /^\d{9,12}$/.test(idVal) ? 'student' : 'teacher';

    // Cập nhật hint
    _detectType(idVal);

    const btn = document.getElementById('btn-main');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span>⏳ Đang đăng nhập...</span>'; }

    try {
      const password = await Utils.sha256(rawPwd);
      const creds = role === 'student'
        ? { mshs: idVal, password }
        : { username: idVal.toLowerCase(), password };

      const data = await CL.Data.Http.post(url, { action: 'login', role, ...creds });

      const user = {
        role: data.role || role,
        token: data.token,
        name: data.name, lop: data.lop,
        ...(role === 'student' ? { mshs: idVal } : { username: idVal.toLowerCase() }),
      };
      sessionStorage.removeItem('_la'); // reset attempt counter
      Session.save(user);
      Store.update({ currentUser: user, isAuthenticated: true });
      _afterLogin(user);
    } catch (e) {
      // Đếm số lần thử sai (lưu trong sessionStorage)
      const attempts = parseInt(sessionStorage.getItem('_la') || '0') + 1;
      sessionStorage.setItem('_la', attempts);
      const msg = e.message || 'Tài khoản hoặc mật khẩu không đúng';
      _showError('err-main', attempts >= 3 ? msg + ` (lần ${attempts})` : msg);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>Đăng nhập</span><span class="auth-btn-arrow">→</span>';
        // Sau 5 lần sai: disable 30 giây
        if (attempts >= 5) {
          btn.disabled = true;
          let secs = 30;
          btn.innerHTML = `<span>Thử lại sau ${secs}s</span>`;
          const t = setInterval(() => {
            secs--;
            if (secs <= 0) {
              clearInterval(t);
              btn.disabled = false;
              btn.innerHTML = '<span>Đăng nhập</span><span class="auth-btn-arrow">→</span>';
              sessionStorage.removeItem('_la');
            } else {
              btn.innerHTML = `<span>Thử lại sau ${secs}s</span>`;
            }
          }, 1000);
        }
      }
    }
  }

  // Giữ backward compat
  function _switchTab() {}

  function _afterLogin(user) {
    const ov = document.getElementById('auth-overlay');
    ov?.classList.remove('show');
    ov?.classList.add('hide');
    setTimeout(() => ov?.remove(), 400);
    // Hiện workspace — xoá tất cả auth guard classes
    document.body.classList.remove('auth-pending');
    document.documentElement.classList.remove('auth-required');
    const shell = document.getElementById('app-shell');
    if (shell) shell.style.removeProperty('display');
    _applyRole(user);
    // Log access (non-blocking)
    CL.Events?.emit('auth:login', { user });
    _onSuccess?.(user);
  }

  // ── Apply role to UI ──────────────────────────────────────────

  function _applyRole(user) {
    // Badge is now injected by app.js auth:login → sidebar init
    // Just handle teacher-only elements
    const isTeacher = user.role === 'teacher' || user.role === 'admin';
    document.querySelectorAll('.teacher-only').forEach(el => {
      el.style.display = isTeacher ? '' : 'none';
    });
  }


  /** @deprecated - URL managed in Cấu hình section */
  function _openSetup() {}
  function _saveUrl() {}
  function _showUrlInput() {}

  // ── Helpers ───────────────────────────────────────────────────

  function _showError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 4500);
  }

  function _setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? '⏳ Đang đăng nhập...' : 'Đăng nhập →';
  }

  // ── Backward compat ───────────────────────────────────────────
  window.Auth = { init, logout, setConfig: setScriptUrl,
                  getSession: Session.get, getConfig: () => ({ scriptUrl: localStorage.getItem(cfg.LS.SCRIPT_URL) || '' }) };




  function _togglePw(id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    el.type = el.type === 'password' ? 'text' : 'password';
    btn.textContent = el.type === 'password' ? '👁' : '🙈';
  }

  return { init, logout, setScriptUrl, _switchTab, _submit, _openSetup, _togglePw, _detectType };
});

// ─── js/exercises/registry.js ───────────────────────────
/**
 * exercises/registry.js — Exercise Registry
 * ═══════════════════════════════════════════════════════════════
 * Tập hợp và cung cấp API tra cứu thống nhất cho TẤT CẢ bài tập
 * (Python, HTML/CSS, SQL). Không quan tâm nguồn gốc file.
 *
 * NGUYÊN TẮC:
 *   - Registry là "nguồn sự thật duy nhất" (single source of truth)
 *     cho exercise lookup.
 *   - Các module khác KHÔNG được truy cập trực tiếp
 *     EXERCISES / EXERCISES_K12 / EXERCISES_SQL.
 *   - Dùng Registry.findById(id) thay vì
 *     [...EXERCISES, ...EXERCISES_K12].find(...)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js
 *
 * Load TRƯỚC: exercises.js, exercises_k12.js, exercises_sql.js
 * Load SAU này: mọi file dùng exercise lookup
 */

'use strict';

CL.define('Exercises.Registry', () => {

  const cfg = CL.require('Config');

  // ── Lazy-build index để tránh build khi load ─────────────────
  /** @type {Map<string, Object>|null} */
  let _indexById   = null;
  let _all         = null;

  function _getAll() {
    if (_all) return _all;
    _all = [
      ...(typeof EXERCISES     !== 'undefined' ? EXERCISES     : []),
      ...(typeof EXERCISES_K12 !== 'undefined' ? EXERCISES_K12 : []),
      ...(typeof EXERCISES_SQL !== 'undefined' ? EXERCISES_SQL : []),
    ];
    return _all;
  }

  function _getIndex() {
    if (_indexById) return _indexById;
    _indexById = new Map();
    for (const ex of _getAll()) {
      _indexById.set(ex.id, ex);
    }
    return _indexById;
  }

  /**
   * Tìm bài tập theo ID — O(1)
   * @param {string} id
   * @returns {Object|undefined}
   */
  function findById(id) {
    return _getIndex().get(id);
  }

  /**
   * Lấy tất cả bài tập
   * @returns {Object[]}
   */
  function getAll() {
    return _getAll();
  }

  /**
   * Lấy bài tập theo grade key (K10, K11, K11-SQL, K12-CTST, K12-KNTT)
   * @param {string} gradeKey
   * @returns {Object[]}
   */
  function getByGrade(gradeKey) {
    return _getAll().filter(ex => _getGradeKey(ex) === gradeKey);
  }

  /**
   * Lấy bài tập theo chapter trong một grade
   * @param {string} gradeKey
   * @param {string} chapter
   * @returns {Object[]}
   */
  function getByChapter(gradeKey, chapter) {
    return getByGrade(gradeKey).filter(ex => ex.ch === chapter);
  }

  /**
   * Lấy danh sách chapters của một grade
   * @param {string} gradeKey
   * @returns {string[]}
   */
  function getChapters(gradeKey) {
    const seen = new Set();
    const result = [];
    for (const ex of getByGrade(gradeKey)) {
      if (!seen.has(ex.ch)) { seen.add(ex.ch); result.push(ex.ch); }
    }
    return result;
  }

  /**
   * Tổng số bài tập
   */
  function count() {
    return _getAll().length;
  }

  /**
   * Thống kê theo type
   * @returns {Object.<string, number>}
   */
  function stats() {
    const s = { python: 0, html: 0, sql: 0, total: 0 };
    for (const ex of _getAll()) {
      s[ex.type || 'python'] = (s[ex.type || 'python'] || 0) + 1;
      s.total++;
    }
    return s;
  }

  // ── Private helpers ───────────────────────────────────────────

  /** Map exercise → grade key cho dropdown */
  function _getGradeKey(ex) {
    // SQL exercises: dùng key riêng 'K11-SQL' thay vì 'K11-KNTT'
    if (ex.type === 'sql') return ex.g + '-SQL';  // K11-SQL
    // HTML/CSS K12: dùng bộ sách làm phân loại
    if (ex.bo && ex.type === 'html') return `${ex.g}-${ex.bo}`;  // K12-CTST, K12-KNTT
    // Python K10, K11: dùng lớp
    return ex.g;
  }

  // ── Invalidate index khi exercises reload (dynamic import) ───
  function _resetIndex() {
    _indexById = null;
    _all       = null;
  }

  // Expose reset cho trường hợp sync exercises từ Sheets
  CL.Events?.on('exercise:synced', _resetIndex);

  // ── CT2018 helpers ───────────────────────────────────────────

  /** Lấy năng lực CT2018 của 1 bài tập (derive từ Bloom nếu chưa tag) */
  function getNL(exercise) {
    if (exercise.nl && exercise.nl.length) return exercise.nl;
    const bloom = (exercise.lv || '').match(/B(\d)/)?.[1];
    if (!bloom) return [];
    const cfg = CL.require('Config');
    return cfg.BLOOM_NL_MAP?.['B' + bloom] || [];
  }

  /** Lấy nhóm Bloom theo TT26/2022 (Nhận biết / Thông hiểu / Vận dụng / VD cao) */
  function getBloomGroup(exercise) {
    const bloom = (exercise.lv || '').match(/B(\d)/)?.[1];
    if (!bloom) return 'Khác';
    const cfg = CL.require('Config');
    return cfg.BLOOM_TT26?.['B' + bloom] || 'Khác';
  }

  /** Lấy chủ đề chuẩn của bài tập (chu_de field hoặc derive từ ch) */
  function getChuyenDe(exercise) {
    if (exercise.chu_de) return exercise.chu_de;
    // Derive from ch: "Bài 17: Biến và lệnh gán" → "Biến và lệnh gán"
    return (exercise.ch || '').replace(/^Bài \d+[:\s]+/i, '').trim() || exercise.ch || '';
  }

  /** Tính Bloom distribution cho danh sách bài */
  function bloomDistribution(exercises) {
    const cfg = CL.require('Config');
    const dist = {};
    for (const ex of exercises) {
      const bloom = (ex.lv || '').match(/B(\d)/)?.[1];
      if (!bloom) continue;
      const group = cfg.BLOOM_TT26?.['B' + bloom] || 'B' + bloom;
      if (!dist[group]) dist[group] = { count: 0, pts: 0, exercises: [] };
      dist[group].count++;
      dist[group].pts += (ex._weight || 1);
      dist[group].exercises.push(ex.id);
    }
    return dist;
  }

  /** Tính ma trận đề: chủ đề × nhóm Bloom */
  function buildExamMatrix(exercises) {
    const matrix = {};   // { chu_de: { 'Nhận biết': [...], 'Thông hiểu': [...], ... } }
    for (const ex of exercises) {
      const cd    = getChuyenDe(ex);
      const group = getBloomGroup(ex);
      if (!matrix[cd]) matrix[cd] = {};
      if (!matrix[cd][group]) matrix[cd][group] = [];
      matrix[cd][group].push(ex);
    }
    return matrix;
  }

  // ── Lazy loading support ──────────────────────────────────────
  // Map: grade key prefix → JS file path
  const GRADE_FILE_MAP = {
    'K10':         'js/exercises.js?v=d63513e2',       // 784KB — Python K10 KNTT
    'K11':         'js/exercises_k12.js?v=97049c56',   // 508KB — Python K11 + K12 HTML
    'K12':         'js/exercises_k12.js?v=97049c56',
    'K12-CTST':    'js/exercises_k12.js?v=97049c56',   // K12 HTML/CSS CTST
    'K12-KNTT':    'js/exercises_k12.js?v=97049c56',   // K12 HTML/CSS KNTT
    'K11-SQL':     'js/exercises_sql.js?v=dbb62a5e',   // 699KB — SQL K11
    'K11-KNTT':    'js/exercises_sql.js?v=dbb62a5e',   // SQL exercises
  };

  const _loaded = new Set();  // track which files have been loaded

  async function ensureLoaded(gradeKey) {
    if (!gradeKey) return;

    // Determine which file to load
    const prefix = gradeKey.split('-')[0];  // 'K10', 'K11', etc.
    const file   = GRADE_FILE_MAP[gradeKey] || GRADE_FILE_MAP[prefix];
    if (!file || _loaded.has(file)) return;

    // Check if already loaded as a global
    if (gradeKey.startsWith('K10') && typeof EXERCISES !== 'undefined' && EXERCISES.length) {
      _loaded.add(file); _resetIndex(); return;
    }
    if ((gradeKey.startsWith('K11') || gradeKey.startsWith('K12')) && typeof EXERCISES_K12 !== 'undefined' && EXERCISES_K12.length) {
      _loaded.add(file); _resetIndex(); return;
    }
    if (gradeKey.toLowerCase().includes('sql') && typeof EXERCISES_SQL !== 'undefined' && EXERCISES_SQL.length) {
      _loaded.add(file); _resetIndex(); return;
    }

    // Lazy inject <script>
    await new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${file}"]`);
      if (existing) { _loaded.add(file); _resetIndex(); resolve(); return; }
      const s = document.createElement('script');
      s.src = file;
      s.onload = () => { _loaded.add(file); _resetIndex(); resolve(); };
      s.onerror = () => reject(new Error(`Không thể tải: ${file}`));
      document.head.appendChild(s);
    });
  }

  function isLoaded(gradeKey) {
    if (!gradeKey) return true;
    const prefix = gradeKey.split('-')[0];
    const file   = GRADE_FILE_MAP[gradeKey] || GRADE_FILE_MAP[prefix];
    return !file || _loaded.has(file);
  }

  return {
    findById, getAll, getByGrade, getByChapter,
    getChapters, count, stats,
    getNL, getBloomGroup, getChuyenDe, bloomDistribution, buildExamMatrix,
    ensureLoaded, isLoaded,
    _resetIndex, // internal use by sync
  };
});

// ─── js/interpreter.js ───────────────────────────
// ══════════════════════════════════════════════════════════════
//  PYTHON INTERPRETER  (Pure JavaScript, không cần thư viện)
// ══════════════════════════════════════════════════════════════

const PyInterp = (() => {

// ─── Token types ───────────────────────────────────────────
const KW = new Set(['False','None','True','and','as','assert','break','class',
  'continue','def','del','elif','else','except','finally','for','from','global',
  'if','import','in','is','lambda','nonlocal','not','or','pass','raise','return',
  'try','while','with','yield']);

// ─── Tokenizer ─────────────────────────────────────────────
function tokenize(src) {
  const toks = [];
  // Normalize Unicode line separators before tokenizing
  src = src.replace(/\u2028|\u2029/g, '\n').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = src.split('\n');
  const indStack = [0];
  let parenD = 0, lineNo = 0;

  for (let li = 0; li < lines.length; li++) {
    lineNo = li + 1;
    let line = lines[li].replace(/\r$/,'');
    const trim = line.trimStart();
    if (!trim || trim[0] === '#') continue;

    // Indentation
    if (parenD === 0) {
      let ind = 0;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === ' ') ind++;
        else if (line[i] === '\t') ind = ((ind >> 3)+1) << 3;
        else break;
      }
      const top = indStack[indStack.length-1];
      if (ind > top) { indStack.push(ind); toks.push({t:'INDENT',ln:lineNo}); }
      else if (ind < top) {
        while (indStack.length > 1 && indStack[indStack.length-1] > ind) { indStack.pop(); toks.push({t:'DEDENT',ln:lineNo}); }
      }
    }

    // Scan tokens on line
    let pos = 0;
    while (pos < line.length && (line[pos]===' '||line[pos]==='\t')) pos++;
    while (pos < line.length) {
      const c = line[pos];
      if (c===' '||c==='\t') { pos++; continue; }
      if (c==='#') break;
      if (c==='\\' && pos===line.length-1) { pos++; break; } // line continuation

      // String
      if (c==='"'||c==="'") {
        const [tok,np] = rdStr(line,pos,lineNo,lines,li,'');
        toks.push(tok); if(np.nl!==undefined){li=np.nl;pos=np.p;if(li<lines.length)line=lines[li].replace(/\r$/,'');}else pos=np;
        continue;
      }
      // Prefixed string: f, r, b, fr, rf, rb, br
      if (/^[frFRbB]/.test(c) && pos+1<line.length && (line[pos+1]===String.fromCharCode(39)||line[pos+1]===String.fromCharCode(34))) {
        const pfx=c.toLowerCase();
        const [tok,np]=rdStr(line,pos+1,lineNo,lines,li,pfx);
        toks.push(tok); if(np&&np.nl!==undefined){li=np.nl;pos=np.p;if(li<lines.length)line=lines[li].replace(/\r$/,'');}else pos=np; continue;
      }
      if (/^[frFRbB]{2}/.test(line.slice(pos,pos+2)) && pos+2<line.length && (line[pos+2]===String.fromCharCode(39)||line[pos+2]===String.fromCharCode(34))) {
        const pfx=(c+line[pos+1]).toLowerCase();
        const [tok,np]=rdStr(line,pos+2,lineNo,lines,li,pfx);
        toks.push(tok); if(np&&np.nl!==undefined){li=np.nl;pos=np.p;if(li<lines.length)line=lines[li].replace(/\r$/,'');}else pos=np; continue;
      }
      // Number
      if (c>='0'&&c<='9'||(c==='.'&&pos+1<line.length&&line[pos+1]>='0'&&line[pos+1]<='9')) {
        const [tok,np]=rdNum(line,pos,lineNo); toks.push(tok); pos=np; continue;
      }
      // Name/keyword
      if (c==='_'||/[a-zA-Z]/.test(c)) {
        let e=pos+1; while(e<line.length&&/[\w]/.test(line[e]))e++;
        const w=line.slice(pos,e);
        toks.push(KW.has(w)?{t:w,v:w,ln:lineNo}:{t:'NAME',v:w,ln:lineNo}); pos=e; continue;
      }
      // Operators
      const [tok,np]=rdOp(line,pos,lineNo);
      if(tok){if('([{'.includes(tok.t))parenD++;if(')]}'.includes(tok.t))parenD--;toks.push(tok);}
      pos=np;
    }
    if(parenD===0){const last=toks[toks.length-1];if(last&&last.t!=='NEWLINE'&&last.t!=='INDENT'&&last.t!=='DEDENT')toks.push({t:'NEWLINE',ln:lineNo});}
  }
  while(indStack.length>1){indStack.pop();toks.push({t:'DEDENT',ln:lineNo});}
  toks.push({t:'NEWLINE',ln:lineNo});toks.push({t:'EOF',ln:lineNo});
  return toks;
}

function rdStr(line,pos,lineNo,allLines,li,pfx){
  const q=line[pos++]; let isTr=false,str='';
  if(pos+1<line.length&&line[pos]===q&&line[pos+1]===q){isTr=true;pos+=2;}
  const isFStr=pfx.includes('f');
  if(isTr){
    while(li<allLines.length){
      while(pos<line.length){
        if(line[pos]===q&&line[pos+1]===q&&line[pos+2]===q)return[{t:'STRING',v:str,f:isFStr,ln:lineNo},{nl:li,p:pos+3}];
        if(line[pos]==='\\'){str+=unesc(line[pos+1]);pos+=2;}else str+=line[pos++];
      }
      str+='\n';li++;line=li<allLines.length?allLines[li].replace(/\r$/,''):'';pos=0;
    }
    throw new PyErr('SyntaxError','Unterminated triple-quoted string');
  }
  while(pos<line.length&&line[pos]!==q){
    if(line[pos]==='\\'){str+=unesc(line[pos+1]);pos+=2;}else str+=line[pos++];
  }
  return [{t:'STRING',v:str,f:isFStr,ln:lineNo},pos+1];
}

function unesc(c){return{n:'\n',t:'\t',r:'\r','\\':'\\','\'':'\'','"':'"','0':'\0',a:'\x07',b:'\x08',f:'\x0C',v:'\x0B'}[c]??('\\'+c);}

function rdNum(line,pos,lineNo){
  let e=pos;
  if(line[e]==='0'&&e+1<line.length){
    const nx=line[e+1].toLowerCase();
    if(nx==='x'){e+=2;while(e<line.length&&/[0-9a-fA-F_]/.test(line[e]))e++;return[{t:'NUMBER',v:parseInt(line.slice(pos,e).replace(/_/g,''),16),ln:lineNo},e];}
    if(nx==='o'){e+=2;while(e<line.length&&/[0-7_]/.test(line[e]))e++;return[{t:'NUMBER',v:parseInt(line.slice(pos+2,e).replace(/_/g,''),8),ln:lineNo},e];}
    if(nx==='b'){e+=2;while(e<line.length&&/[01_]/.test(line[e]))e++;return[{t:'NUMBER',v:parseInt(line.slice(pos+2,e).replace(/_/g,''),2),ln:lineNo},e];}
  }
  let isF=false;
  while(e<line.length&&(line[e]>='0'&&line[e]<='9'||line[e]==='_'))e++;
  if(e<line.length&&line[e]==='.'){isF=true;e++;while(e<line.length&&(line[e]>='0'&&line[e]<='9'||line[e]==='_'))e++;}
  if(e<line.length&&(line[e]==='e'||line[e]==='E')){isF=true;e++;if(e<line.length&&(line[e]==='+'||line[e]==='-'))e++;while(e<line.length&&line[e]>='0'&&line[e]<='9')e++;}
  const s=line.slice(pos,e).replace(/_/g,'');
  return [{t:'NUMBER',v:isF?parseFloat(s):parseInt(s,10),ln:lineNo},e];
}

function rdOp(line,pos,lineNo){
  const t3=line.slice(pos,pos+3), t2=line.slice(pos,pos+2);
  for(const op of['**=','//=','>>=','<<='])if(t3===op)return[{t:op,ln:lineNo},pos+3];
  for(const op of['==','!=','<=','>=','**','//',':=','+=','-=','*=','/=','%=','&=','|=','^=','->','<<','>>'])if(t2===op)return[{t:op,ln:lineNo},pos+2];
  if('+-*/%<>=!&|^~()[]{},:;.@'.includes(line[pos]))return[{t:line[pos],ln:lineNo},pos+1];
  return[null,pos+1];
}

// ─── Error / Signals ───────────────────────────────────────
class PyErr extends Error{constructor(t,m,ln){super(m);this.et=t;this.msg=m;this.ln=ln;this.name='PyErr';}toString(){return`${this.et}: ${this.msg}${this.ln?' (dòng '+this.ln+')':''}`;}}
class BreakSig{}
class ContSig{}
class RetSig{constructor(v){this.v=v;}}
class ExcSig{constructor(e){this.e=e;}}

// ─── Parser ────────────────────────────────────────────────
class Parser{
  constructor(toks){this.toks=toks;this.p=0;}
  pk(){return this.toks[this.p];}
  nx(){return this.toks[this.p++];}
  is(t){return this.pk().t===t;}
  isAny(...ts){return ts.includes(this.pk().t);}
  eat(t){const tok=this.nx();if(tok.t!==t)throw new PyErr('SyntaxError',`Mong đợi '${t}', gặp '${tok.t}'`,tok.ln);return tok;}
  opt(t){if(this.is(t))return this.nx();return null;}
  skipNL(){while(this.isAny('NEWLINE','INDENT','DEDENT'))this.nx();}

  parse(){const b=[];this.skipNL();while(!this.is('EOF')){b.push(this.stmt());while(this.is('NEWLINE'))this.nx();}return{t:'Prog',b};}

  block(){
    this.eat('NEWLINE');this.eat('INDENT');
    const b=[];this.skipNL();
    while(!this.isAny('DEDENT','EOF')){b.push(this.stmt());while(this.isAny('NEWLINE','INDENT'))this.nx();}
    this.opt('DEDENT');return{t:'Block',b};
  }

  stmt(){
    const tok=this.pk();
    switch(tok.t){
      case'if':return this.sIf();
      case'while':return this.sWhile();
      case'for':return this.sFor();
      case'def':return this.sDef();
      case'class':return this.sClass();
      case'return':this.nx();let rv=null;if(!this.isAny('NEWLINE','EOF',';'))rv=this.exprList();this.opt('NEWLINE');return{t:'Ret',v:rv,ln:tok.ln};
      case'break':this.nx();this.opt('NEWLINE');return{t:'Break',ln:tok.ln};
      case'continue':this.nx();this.opt('NEWLINE');return{t:'Cont',ln:tok.ln};
      case'pass':this.nx();this.opt('NEWLINE');return{t:'Pass',ln:tok.ln};
      case'global':this.nx();const gns=[this.eat('NAME').v];while(this.is(','))this.nx()&&gns.push(this.eat('NAME').v);return{t:'Global',ns:gns};
      case'nonlocal':this.nx();while(!this.isAny('NEWLINE','EOF'))this.nx();return{t:'Pass',ln:tok.ln};
      case'del':this.nx();const dt=[this.expr()];while(this.is(','))this.nx()&&dt.push(this.expr());return{t:'Del',ts:dt};
      case'import':{this.nx();const mn=this.eat('NAME').v;let alias=mn;if(this.is('as'))this.nx()&&(alias=this.eat('NAME').v);while(!this.isAny('NEWLINE','EOF'))this.nx();return{t:'Import',mn,alias,ln:tok.ln};}
      case'from':{while(!this.isAny('NEWLINE','EOF'))this.nx();return{t:'Pass',ln:tok.ln};}
      case'try':return this.sTry();
      case'raise':this.nx();let re=null;if(!this.isAny('NEWLINE','EOF'))re=this.expr();return{t:'Raise',e:re};
      case'assert':this.nx();const at=this.expr();let am=null;if(this.is(','))this.nx()&&(am=this.expr());return{t:'Assert',test:at,msg:am,ln:tok.ln};
      case'NEWLINE':this.nx();return{t:'Pass',ln:tok.ln};
      default:return this.sExpr();
    }
  }

  sIf(){
    const ln=this.pk().ln;this.eat('if');const test=this.expr();this.eat(':');const body=this.block();
    let chain=[];
    while(this.is('elif')){const el=this.pk().ln;this.nx();const et=this.expr();this.eat(':');chain.push({t:'If',test:et,body:this.block(),els:[],ln:el});}
    if(this.is('else')){this.nx();this.eat(':');const eb=this.block();
      if(chain.length)chain[chain.length-1].els=[eb];else chain=[eb];
    }
    // chain elif
    for(let i=chain.length-2;i>=0;i--)if(chain[i].t==='If')chain[i].els=[chain[i+1]];
    return{t:'If',test,body,els:chain.length?[chain[0]]:[],ln};
  }
  sWhile(){const ln=this.pk().ln;this.eat('while');const test=this.expr();this.eat(':');const body=this.block();let eb=null;if(this.is('else'))this.nx()&&this.eat(':')&&(eb=this.block());return{t:'While',test,body,eb,ln};}
  sFor(){const ln=this.pk().ln;this.eat('for');const tgt=this.forTarget();this.eat('in');const iter=this.expr();this.eat(':');const body=this.block();let eb=null;if(this.is('else'))this.nx()&&this.eat(':')&&(eb=this.block());return{t:'For',tgt,iter,body,eb,ln};}
  forTarget(){const ts=[this.primary()];while(this.is(','))this.nx()&&ts.push(this.is('in')?ts.pop():this.primary());return ts.length===1?ts[0]:{t:'Tuple',e:ts};}

  sDef(){
    const ln=this.pk().ln;this.eat('def');const name=this.eat('NAME').v;this.eat('(');
    const args=[];while(!this.is(')')){
      let star=0;if(this.is('*'))this.nx()&&(star=1);else if(this.is('**'))this.nx()&&(star=2);
      const n=this.eat('NAME').v;if(this.is(':'))this.nx()&&this.expr();
      let df=null;if(this.is('='))this.nx()&&(df=this.expr());
      args.push({n,s:star,d:df});if(!this.is(')'))this.eat(',');
    }
    this.eat(')');if(this.is('->'))this.nx()&&this.expr();this.eat(':');
    return{t:'Def',name,args,body:this.block(),ln};
  }

  sClass(){const ln=this.pk().ln;this.eat('class');const name=this.eat('NAME').v;if(this.is('('))this.nx()&&this.expr()&&this.eat(')');this.eat(':');return{t:'Class',name,body:this.block(),ln};}

  sTry(){
    this.eat('try');this.eat(':');const body=this.block();const hs=[];
    while(this.is('except')){this.nx();let et=null,en=null;if(!this.is(':'))et=this.expr();if(this.is('as'))this.nx()&&(en=this.eat('NAME').v);this.eat(':');hs.push({et,en,body:this.block()});}
    let eb=null;if(this.is('else'))this.nx()&&this.eat(':')&&(eb=this.block());
    let fb=null;if(this.is('finally'))this.nx()&&this.eat(':')&&(fb=this.block());
    return{t:'Try',body,hs,eb,fb};
  }

  sExpr(){
    const ln=this.pk().ln;const e=this.exprList();
    if(this.is('=')){
      const ts=[e];while(this.is('='))this.nx()&&ts.push(this.exprList());
      const v=ts.pop();this.opt('NEWLINE');return{t:'Asgn',ts,v,ln};
    }
    const augOps=['+=','-=','*=','/=','//=','%=','**=','&=','|=','^='];
    for(const op of augOps)if(this.is(op)){this.nx();const v=this.expr();this.opt('NEWLINE');return{t:'AugAsgn',tgt:e,op,v,ln};}
    this.opt('NEWLINE');return{t:'Expr',e,ln};
  }

  exprList(){
    const e=this.expr();if(!this.is(','))return e;
    const es=[e];while(this.is(','))this.nx()&&(this.isAny('NEWLINE','EOF',')','in',':','=','DEDENT')||es.push(this.expr()));
    return{t:'Tuple',e:es};
  }

  expr(){return this.lamb();}
  lamb(){
    if(this.is('lambda')){
      this.nx();const as=[];while(!this.is(':')){as.push({n:this.eat('NAME').v,s:0,d:null});if(!this.is(':'))this.eat(',');}
      this.eat(':');return{t:'Lambda',as,body:this.expr()};
    }
    return this.tern();
  }
  tern(){let l=this.eor();if(this.is('if')){this.nx();const t=this.eor();this.eat('else');return{t:'Tern',test:t,b:l,o:this.tern()};}return l;}
  eor(){let l=this.eand();while(this.is('or'))this.nx()&&(l={t:'BoolOp',op:'or',l,r:this.eand()});return l;}
  eand(){let l=this.enot();while(this.is('and'))this.nx()&&(l={t:'BoolOp',op:'and',l,r:this.enot()});return l;}
  enot(){if(this.is('not'))return this.nx()&&{t:'UnOp',op:'not',v:this.enot()};return this.cmp();}
  cmp(){
    let l=this.bor();
    while(true){
      let op=null;
      if(this.isAny('==','!=','<','>','<=','>='))op=this.nx().t;
      else if(this.is('in')){op='in';this.nx();}
      else if(this.is('not')&&this.toks[this.p+1]?.t==='in'){this.nx();this.nx();op='not in';}
      else if(this.is('is')&&this.toks[this.p+1]?.t==='not'){this.nx();this.nx();op='is not';}
      else if(this.is('is')){this.nx();op='is';}
      else break;
      l={t:'Cmp',op,l,r:this.bor()};
    }
    return l;
  }
  bor(){let l=this.bxor();while(this.is('|'))this.nx()&&(l={t:'Bin',op:'|',l,r:this.bxor()});return l;}
  bxor(){let l=this.band();while(this.is('^'))this.nx()&&(l={t:'Bin',op:'^',l,r:this.band()});return l;}
  band(){let l=this.shl();while(this.is('&'))this.nx()&&(l={t:'Bin',op:'&',l,r:this.shl()});return l;}
  shl(){let l=this.add();while(this.isAny('<<','>>')){const op=this.nx().t;l={t:'Bin',op,l,r:this.add()};}return l;}
  add(){let l=this.mul();while(this.isAny('+','-')){const op=this.nx().t;l={t:'Bin',op,l,r:this.mul()};}return l;}
  mul(){let l=this.unary();while(this.isAny('*','/','//', '%')){const op=this.nx().t;l={t:'Bin',op,l,r:this.unary()};}return l;}
  unary(){if(this.isAny('+','-','~'))return{t:'UnOp',op:this.nx().t,v:this.unary()};return this.pow();}
  pow(){let l=this.postfix();if(this.is('**'))this.nx()&&(l={t:'Bin',op:'**',l,r:this.unary()});return l;}

  postfix(){
    let e=this.primary();
    while(true){
      if(this.is('.')){this.nx();const a=this.eat('NAME').v;e={t:'Attr',o:e,a};}
      else if(this.is('[')){this.nx();const s=this.sliceOrIdx();this.eat(']');e=s.sl?{t:'Slice',o:e,...s}:{t:'Idx',o:e,i:s.v};}
      else if(this.is('(')){this.nx();const {as,kw}=this.callArgs();this.eat(')');e={t:'Call',fn:e,as,kw};}
      else break;
    }
    return e;
  }
  sliceOrIdx(){
    if(this.is(':')){this.nx();const u=this.isAny(']',':')? null:this.expr();let st=null;if(this.is(':'))this.nx()&&(st=this.is(']')?null:this.expr());return{sl:true,lo:null,up:u,st};}
    const v=this.expr();
    if(this.is(':')){this.nx();const u=this.isAny(']',':')? null:this.expr();let st=null;if(this.is(':'))this.nx()&&(st=this.is(']')?null:this.expr());return{sl:true,lo:v,up:u,st};}
    return{sl:false,v};
  }
  callArgs(){
    const as=[],kw={};
    while(!this.is(')')){
      if(this.is('**')){this.nx();as.push({t:'SS',v:this.expr()});}
      else if(this.is('*')){this.nx();as.push({t:'S',v:this.expr()});}
      else if(this.pk().t==='NAME'&&this.toks[this.p+1]?.t==='='){const k=this.nx().v;this.nx();kw[k]=this.expr();}
      else as.push(this.expr());
      if(!this.is(')'))this.eat(',');
    }
    return{as,kw};
  }
  primary(){
    const tok=this.pk();
    switch(tok.t){
      case'NUMBER':this.nx();return{t:'Num',v:tok.v};
      case'STRING':this.nx();return{t:'Str',v:tok.v,f:tok.f};
      case'True':this.nx();return{t:'Bool',v:true};
      case'False':this.nx();return{t:'Bool',v:false};
      case'None':this.nx();return{t:'NoneV'};
      case'NAME':this.nx();return{t:'Name',n:tok.v};
      case'(':{
        this.nx();if(this.is(')'))return this.nx()&&{t:'Tuple',e:[]};
        const e=this.expr();if(this.is(',')){const es=[e];while(this.is(','))this.nx()&&(this.is(')')||es.push(this.expr()));this.eat(')');return{t:'Tuple',e:es};}
        this.eat(')');return e;
      }
      case'[':{
        this.nx();if(this.is(']'))return this.nx()&&{t:'List',e:[]};
        const first=this.expr();if(this.is('for'))return this.listComp(first);
        const es=[first];while(this.is(','))this.nx()&&(this.is(']')||es.push(this.expr()));this.eat(']');return{t:'List',e:es};
      }
      case'{':{
        this.nx();if(this.is('}'))return this.nx()&&{t:'Dict',ps:[]};
        return this.dictOrSet();
      }
      default:throw new PyErr('SyntaxError',`Unexpected '${tok.t}'`,tok.ln);
    }
  }
  listComp(elt){
    const gens=[];while(this.is('for')){
      this.eat('for');const tgt=this.forTarget();this.eat('in');const iter=this.eor();
      const ifs=[];while(this.is('if'))this.nx()&&ifs.push(this.eor());
      gens.push({tgt,iter,ifs});
    }
    this.eat(']');return{t:'ListComp',elt,gens};
  }
  dictOrSet(){
    const first=this.expr();
    if(this.is(':')){
      this.nx();const fv=this.expr();
      // Dict comprehension
      if(this.is('for')){
        const gens=[];while(this.is('for')){this.eat('for');const tgt=this.forTarget();this.eat('in');const iter=this.eor();const ifs=[];while(this.is('if'))this.nx()&&ifs.push(this.eor());gens.push({tgt,iter,ifs});}
        this.eat('}');return{t:'DictComp',k:first,v:fv,gens};
      }
      const ps=[[first,fv]];
      while(this.is(','))this.nx()&&(this.is('}')||(()=>{const k=this.expr();this.eat(':');ps.push([k,this.expr()]);})());
      this.eat('}');return{t:'Dict',ps};
    }
    // Set comprehension
    if(this.is('for')){
      const gens=[];while(this.is('for')){this.eat('for');const tgt=this.forTarget();this.eat('in');const iter=this.eor();const ifs=[];while(this.is('if'))this.nx()&&ifs.push(this.eor());gens.push({tgt,iter,ifs});}
      this.eat('}');return{t:'SetComp',elt:first,gens};
    }
    const es=[first];while(this.is(','))this.nx()&&(this.is('}')||es.push(this.expr()));
    this.eat('}');return{t:'Set',e:es};
  }
}

// ─── Environment ───────────────────────────────────────────
class Env{
  constructor(par=null){this.vs={};this.par=par;this.globals=par?par.globals:this;}
  get(n){
    // Check if declared global in this scope
    if(this.vs['__global__'+n]===true)return this.globals.vs[n];
    if(Object.prototype.hasOwnProperty.call(this.vs,n))return this.vs[n];
    if(this.par)return this.par.get(n);
    throw new PyErr('NameError',`name '${n}' is not defined`);
  }
  set(n,v){this.vs[n]=v;}
  asgn(n,v){
    // Check if declared global in this scope
    if(this.vs['__global__'+n]===true){this.globals.vs[n]=v;return;}
    let e=this;
    while(e){
      if(Object.prototype.hasOwnProperty.call(e.vs,n)&&!e.vs['__global__'+n]){
        e.vs[n]=v;return;
      }
      e=e.par;
    }
    this.vs[n]=v;
  }
  gset(n,v){this.globals.vs[n]=v;}
}

// ─── Interpreter ───────────────────────────────────────────
// mkf: tag an integer as 'float' so pStr shows decimal point (e.g. 3.0)
const mkf=(n)=>{if(Number.isInteger(n)){const o=Object(n);o.__float__=true;o.valueOf=()=>n;return o;}return n;};
class Interp{
  constructor(outCb,inCb){
    this.out=outCb;this.inCb=inCb;
    this.steps=0;this.depth=0;
    this.MAX_STEPS=500000;this.MAX_DEPTH=300;
  }
  step(){if(++this.steps>this.MAX_STEPS)throw new PyErr('RuntimeError','Chương trình chạy quá lâu (>500k bước). Kiểm tra vòng lặp vô hạn.');}

  run(ast){const env=new Env();this.builtins(env);return this.execBlock(ast.b,env);}

  builtins(env){
    const py=this;
    const B={
      print:(...args)=>{
        let sep=' ',end='\n';
        const last=args[args.length-1];
        if(last&&typeof last==='object'&&last.__kw__){const kw=args.pop().__kw__;if('sep'in kw)sep=kw.sep===null?' ':py.pStr(kw.sep);if('end'in kw)end=kw.end===null?'':py.pStr(kw.end);}
        py.out(args.map(a=>py.pStr(a)).join(sep)+end);return null;
      },
      input:(prompt='')=>{py.out(py.pStr(prompt));const v=py.inCb();return v===null||v===undefined?'':String(v);},
      int:(x,base)=>{
        if(x===null)return 0;if(typeof x==='boolean')return x?1:0;
        if(x&&typeof x==='object'&&x.__float__)return Math.trunc(x.valueOf());
        if(typeof x==='number')return Math.trunc(x);
        if(typeof x==='string'){const n=base?parseInt(x.trim(),base):parseInt(x.trim(),10);if(isNaN(n))throw new PyErr('ValueError',`invalid literal for int(): '${x}'`);return n;}
        throw new PyErr('TypeError',`int() không nhận '${py.tname(x)}'`);
      },
      float:(x)=>{if(x===null)return mkf(0);if(typeof x==='boolean')return mkf(x?1:0);if(typeof x==='number')return Number.isInteger(x)?mkf(x):x;if(x&&x.__float__)return x;if(typeof x==='string'){const s=x.trim().toLowerCase();if(s==='inf'||s==='+inf'||s==='infinity'||s==='+infinity')return Infinity;if(s==='-inf'||s==='-infinity')return -Infinity;if(s==='nan')return NaN;const n=parseFloat(s);if(isNaN(n))throw new PyErr('ValueError',`could not convert to float: '${x}'`);return Number.isInteger(n)?mkf(n):n;}throw new PyErr('TypeError','float() needs a number or string');},
      str:(x)=>py.pStr(x),
      bool:(x)=>py.pBool(x),
      list:(x)=>py.toArr(x),
      tuple:(x)=>{const a=py.toArr(x);a.__tup__=true;return a;},
      dict:(x)=>x&&x.__d__?x:{__d__:{},__k__:[]},
      set:(x)=>{const a=py.toArr(x);return{__set__:true,data:new Map(a.map(v=>[py.pRepr(v),v]))};},
      len:(x)=>{if(typeof x==='string')return x.length;if(Array.isArray(x))return x.length;if(x&&x.__d__)return(x.__k__||[]).length;if(x&&x.__set__)return x.data.size;throw new PyErr('TypeError',`object of type '${py.tname(x)}' has no len()`);},
      range:(a,b,s=1)=>{if(b===undefined){b=a;a=0;}return{__rng__:true,a,b,s};},
      enumerate:(it,st=0)=>{return py.toArr(it).map((v,i)=>{const t=[i+st,v];t.__tup__=true;return t;});},
      zip:(...its)=>{const as=its.map(i=>py.toArr(i));const m=Math.min(...as.map(a=>a.length));return Array.from({length:m},(_,i)=>{const t=as.map(a=>a[i]);t.__tup__=true;return t;});},
      map:(fn,it)=>py.toArr(it).map(v=>py.call(fn,[v],{})),
      filter:(fn,it)=>py.toArr(it).filter(v=>fn===null?py.pBool(v):py.pBool(py.call(fn,[v],{}))),
      sorted:(it,...rest)=>{
        let key=null,rev=false;const last=rest[rest.length-1];if(last&&last.__kw__){const kw=rest.pop().__kw__;key=kw.key||null;rev=kw.reverse||false;}
        const arr=[...py.toArr(it)];arr.sort((a,b)=>{const ka=key?py.call(key,[a],{}):a;const kb=key?py.call(key,[b],{}):b;return py.pLt(ka,kb)?-1:py.pLt(kb,ka)?1:0;});if(rev)arr.reverse();return arr;
      },
      reversed:(it)=>[...py.toArr(it)].reverse(),
      abs:(x)=>{const xv=x&&typeof x==='object'&&x.__float__?x.valueOf():x;const r=Math.abs(xv);return(x&&typeof x==='object'&&x.__float__&&Number.isInteger(r))?mkf(r):r;},
      round:(x,n=0)=>{const xv=x&&typeof x==='object'&&x.__float__?x.valueOf():x;if(n===0){const r=Math.round(xv);return(x&&typeof x==='object'&&x.__float__&&Number.isInteger(r))?mkf(r):r;}const f=Math.pow(10,n);const r=Math.round(xv*f)/f;return(x&&typeof x==='object'&&x.__float__&&Number.isInteger(r))?mkf(r):r;},
      pow:(x,y,m)=>{const r=Math.pow(x,y);return m!==undefined?r%m:r;},
      divmod:(a,b)=>{const q=Math.floor(a/b);return[q,a-q*b];},
      min:(...args)=>{let a=args.length===1&&Array.isArray(args[0])?args[0]:args;if(a[a.length-1]&&a[a.length-1].__kw__)a=a.slice(0,-1);return a.reduce((x,y)=>py.pLt(x,y)?x:y);},
      max:(...args)=>{let a=args.length===1&&Array.isArray(args[0])?args[0]:args;if(a[a.length-1]&&a[a.length-1].__kw__)a=a.slice(0,-1);return a.reduce((x,y)=>py.pLt(x,y)?y:x);},
      sum:(it,s=0)=>py.toArr(it).reduce((a,b)=>a+b,s),
      any:(it)=>py.toArr(it).some(v=>py.pBool(v)),
      all:(it)=>py.toArr(it).every(v=>py.pBool(v)),
      type:(x)=>py.tname(x),
      isinstance:(o,c)=>{if(typeof c==='string')return py.tname(o)===c;if(c&&c.__cls__)return o&&o.__inst__&&o.__cls__===c;if(c==='int'||c===B?.int)return typeof o==='number'&&Number.isInteger(o);if(c==='float'||c===B?.float)return typeof o==='number'||(o&&typeof o==='object'&&o.__float__);if(c==='str'||c===B?.str)return typeof o==='string';if(c==='list'||c===B?.list)return Array.isArray(o)&&!o.__tup__;if(c==='bool'||c===B?.bool)return typeof o==='boolean';return false;},
      repr:(x)=>py.pRepr(x),
      chr:(x)=>String.fromCharCode(x),ord:(x)=>x.charCodeAt(0),
      hex:(x)=>'0x'+x.toString(16),bin:(x)=>'0b'+Math.abs(x).toString(2),oct:(x)=>'0o'+x.toString(8),
      format:(v,s='')=>String(v),
      id:(x)=>Math.floor(Math.random()*1e9),
      vars:(o)=>o?o.__d__||{}:{},dir:(o)=>[],
      open:()=>{throw new PyErr('IOError','File I/O không được hỗ trợ trong môi trường này');},
      // Error names - callable exception classes
      ValueError:{__cls__:true,__name__:'ValueError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      TypeError:{__cls__:true,__name__:'TypeError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      IndexError:{__cls__:true,__name__:'IndexError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      KeyError:{__cls__:true,__name__:'KeyError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      NameError:{__cls__:true,__name__:'NameError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      ZeroDivisionError:{__cls__:true,__name__:'ZeroDivisionError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      Exception:{__cls__:true,__name__:'Exception',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      RuntimeError:{__cls__:true,__name__:'RuntimeError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      AttributeError:{__cls__:true,__name__:'AttributeError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      StopIteration:{__cls__:true,__name__:'StopIteration',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      OverflowError:{__cls__:true,__name__:'OverflowError',__m__:{__init__:(self,msg='')=>{self.__attrs__.msg=msg;self.__attrs__.args=[msg];return null;}}},
      // Math module
      math:{
        __mod__:true,
        pi:Math.PI,e:Math.E,
        sqrt:(x)=>{const r=Math.sqrt(x);return Number.isInteger(r)?mkf(r):r;},
        floor:(x)=>Math.floor(x),ceil:(x)=>Math.ceil(x),fabs:(x)=>Math.abs(x),
        sin:(x)=>mkf(Math.sin(x)),cos:(x)=>mkf(Math.cos(x)),tan:(x)=>mkf(Math.tan(x)),
        asin:(x)=>mkf(Math.asin(x)),acos:(x)=>mkf(Math.acos(x)),atan:(x)=>mkf(Math.atan(x)),atan2:(y,x)=>mkf(Math.atan2(y,x)),
        log:(x,b)=>mkf(b?Math.log(x)/Math.log(b):Math.log(x)),
        log2:(x)=>mkf(Math.log2(x)),log10:(x)=>mkf(Math.log10(x)),pow:(x,y)=>mkf(Math.pow(x,y)),exp:(x)=>mkf(Math.exp(x)),
        factorial:(n)=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;},
        gcd:(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;},
        inf:Infinity,nan:NaN,isnan:(x)=>isNaN(x),isinf:(x)=>!isFinite(x),
        trunc:(x)=>Math.trunc(x),degrees:(r)=>mkf(r*180/Math.PI),radians:(d)=>mkf(d*Math.PI/180),
        hypot:(...args)=>mkf(Math.hypot(...args)),
      },
      random:{
        __mod__:true,
        random:()=>Math.random(),
        randint:(a,b)=>Math.floor(Math.random()*(b-a+1))+a,
        randrange:(a,b,s=1)=>{if(b===undefined){b=a;a=0;}const cs=[];for(let i=a;i<b;i+=s)cs.push(i);return cs[Math.floor(Math.random()*cs.length)];},
        choice:(a)=>a[Math.floor(Math.random()*a.length)],
        shuffle:(a)=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return null;},
        uniform:(a,b)=>Math.random()*(b-a)+a,
        sample:(a,k)=>{const c=[...a];for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]];}return c.slice(0,k);},
      },
    };
    Object.entries(B).forEach(([k,v])=>env.set(k,v));
  }

  // ── Statement execution ──────────────────────────────────
  execBlock(stmts,env){
    for(const s of stmts){
      const r=this.execStmt(s,env);
      if(r instanceof RetSig||r instanceof BreakSig||r instanceof ContSig||r instanceof ExcSig)return r;
    }
    return null;
  }

  execStmt(s,env){
    this.step();
    switch(s.t){
      case'Prog':return this.execBlock(s.b,env);
      case'Block':return this.execBlock(s.b,env);
      case'Pass':return null;
      case'Break':return new BreakSig();
      case'Cont':return new ContSig();
      case'Expr':this.eval(s.e,env);return null;
      case'Asgn':{const v=this.eval(s.v,env);for(const t of s.ts)this.setTgt(t,v,env);return null;}
      case'AugAsgn':{const cur=this.eval(s.tgt,env);const v=this.eval(s.v,env);const r=this.augOp(s.op,cur,v);this.setTgt(s.tgt,r,env);return null;}
      case'If':return this.execIf(s,env);
      case'While':return this.execWhile(s,env);
      case'For':return this.execFor(s,env);
      case'Def':{env.set(s.name,{__fn__:true,name:s.name,args:s.args,body:s.body,cl:env});return null;}
      case'Class':return this.execClass(s,env);
      case'Ret':{const v=s.v?this.eval(s.v,env):null;return new RetSig(v);}
      case'Global':{s.ns.forEach(n=>{env.globals.vs[n]=env.globals.vs[n]??null;env.vs['__global__'+n]=true;});return null;}
      case'Import':{try{const mod=env.get(s.mn);env.set(s.alias,mod);}catch(e){/* module not found, ignore */}return null;}
      case'Del':{for(const t of s.ts){if(t.t==='Name')delete env.vs[t.n];else if(t.t==='Idx'){const o=this.eval(t.o,env);const i=this.eval(t.i,env);if(Array.isArray(o))o.splice(i<0?o.length+i:i,1);else if(o&&o.__d__)delete o.__d__[this.pRepr(i)];}}return null;}
      case'Assert':{if(!this.pBool(this.eval(s.test,env)))return new ExcSig(new PyErr('AssertionError',s.msg?this.pStr(this.eval(s.msg,env)):'Assertion failed',s.ln));return null;}
      case'Try':return this.execTry(s,env);
      case'Raise':{
        const ev=s.e?this.eval(s.e,env):null;
        if(!ev)return new ExcSig(new PyErr('RuntimeError',''));
        if(ev instanceof PyErr)return new ExcSig(ev);
        // Instance of exception class (e.g. ValueError("msg"))
        if(ev&&ev.__inst__&&ev.__cls__&&ev.__cls__.__name__){
          const ename=ev.__cls__.__name__;
          const emsg=ev.__attrs__&&ev.__attrs__.msg!==undefined?String(ev.__attrs__.msg):'';
          const pyerr=new PyErr(ename,emsg);
          pyerr.__inst__=ev; // keep original instance for 'as e' binding
          return new ExcSig(pyerr);
        }
        // Exception class itself (e.g. raise ValueError)
        if(ev&&ev.__cls__&&ev.__name__)return new ExcSig(new PyErr(ev.__name__,''));
        return new ExcSig(new PyErr('Exception',this.pStr(ev)));
      }
      default:return null;
    }
  }

  setTgt(t,v,env){
    switch(t.t){
      case'Name':env.asgn(t.n,v);break;
      case'Idx':{const o=this.eval(t.o,env);const i=this.eval(t.i,env);if(Array.isArray(o))o[i<0?o.length+i:i]=v;else if(o&&o.__d__){o.__d__[this.pRepr(i)]=v;if(!(o.__k__||[]).some(k=>this.pEq(k,i))){o.__k__=o.__k__||[];o.__k__.push(i);}}break;}
      case'Attr':{const o=this.eval(t.o,env);if(o&&o.__inst__)o.__attrs__[t.a]=v;else if(o&&typeof o==='object')o[t.a]=v;break;}
      case'Tuple':case'List':{const arr=this.toArr(v);t.e.forEach((tgt,i)=>this.setTgt(tgt,arr[i],env));break;}
    }
  }

  execIf(s,env){
    if(this.pBool(this.eval(s.test,env))){const r=this.execBlock(s.body.b,env);return r;}
    for(const alt of s.els){
      if(alt.t==='If'){const r=this.execStmt(alt,env);if(r)return r;return null;}
      return this.execBlock(alt.b,env);
    }
    return null;
  }

  execWhile(s,env){
    let iter=0;let broke=false;
    while(this.pBool(this.eval(s.test,env))){
      this.step();if(++iter>200000)throw new PyErr('RuntimeError','Vòng while lặp quá nhiều lần');
      const r=this.execBlock(s.body.b,env);
      if(r instanceof BreakSig){broke=true;break;}if(r instanceof ContSig)continue;
      if(r instanceof RetSig||r instanceof ExcSig)return r;
    }
    if(!broke&&s.eb)return this.execBlock(s.eb.b,env);
    return null;
  }

  execFor(s,env){
    const items=this.toArr(this.eval(s.iter,env));
    let broke=false;
    for(const item of items){
      this.step();this.setTgt(s.tgt,item,env);
      const r=this.execBlock(s.body.b,env);
      if(r instanceof BreakSig){broke=true;break;}if(r instanceof ContSig)continue;
      if(r instanceof RetSig||r instanceof ExcSig)return r;
    }
    if(!broke&&s.eb)return this.execBlock(s.eb.b,env);
    return null;
  }

  execClass(s,env){
    const clEnv=new Env(env);this.execBlock(s.body.b,clEnv);
    env.set(s.name,{__cls__:true,__name__:s.name,__m__:clEnv.vs});return null;
  }

  execTry(s,env){
    let r=null;
    let caughtErr=null;
    try{
      r=this.execBlock(s.body.b,env);
    }catch(e){
      // PyErr thrown directly (not via ExcSig)
      if(e instanceof PyErr)caughtErr=e;
      else throw e;
    }
    // Convert thrown PyErr to ExcSig
    if(caughtErr)r=new ExcSig(caughtErr);
    if(r instanceof ExcSig){
      let handled=false;
      for(const h of s.hs){
        const mt=h.et?this.eval(h.et,env):null;
        const errType=r.e&&r.e.et?r.e.et:'Exception';
        // mt can be: null (bare except), string (old style), class object {__cls__,__name__}
        const mtName=mt===null?null:(typeof mt==='string'?mt:(mt&&mt.__cls__&&mt.__name__?mt.__name__:null));
        const matches=!mtName||mtName==='Exception'||errType===mtName||errType.includes(mtName);
        if(matches){
          // Bind exception to variable: prefer original instance, else PyErr
          const bindVal=r.e&&r.e.__inst__?r.e.__inst__:r.e;
          if(h.en)env.set(h.en,bindVal);r=this.execBlock(h.body.b,env);handled=true;break;
        }
      }
      if(!handled){if(s.fb)this.execBlock(s.fb.b,env);return r;}
    } else {
      // No exception: run else clause if present
      if(s.eb)r=this.execBlock(s.eb.b,env);
    }
    if(s.fb)this.execBlock(s.fb.b,env);
    return(r instanceof BreakSig||r instanceof ContSig||r instanceof RetSig)?r:null;
  }

  augOp(op,a,b){
    const af=a&&typeof a==='object'&&a.__float__;const bf=b&&typeof b==='object'&&b.__float__;
    const av=af?a.valueOf():a;const bv=bf?b.valueOf():b;
    const wf=(res)=>(af||bf)&&Number.isInteger(res)?mkf(res):res;
    switch(op){
      case'+=':if(Array.isArray(av)&&Array.isArray(bv)){av.push(...bv);return av;}return wf(av+bv);
      case'-=':return wf(av-bv);case'*=':return wf(av*bv);case'/=':return av/bv;
      case'//=':return wf(Math.floor(av/bv));case'%=':return wf(((av%bv)+bv)%bv);
      case'**=':return wf(Math.pow(av,bv));case'&=':return av&bv;case'|=':return av|bv;case'^=':return av^bv;
    }
  }

  // ── Expression evaluation ────────────────────────────────
  eval(e,env){
    if(!e)return null;
    switch(e.t){
      case'Num':return e.v;
      case'Bool':return e.v;
      case'NoneV':return null;
      case'Str':return e.f?this.evalFStr(e.v,env):e.v;
      case'Name':return env.get(e.n);
      case'List':return e.e.map(x=>this.eval(x,env));
      case'Tuple':{const a=e.e.map(x=>this.eval(x,env));a.__tup__=true;return a;}
      case'Set':{const es=e.e.map(x=>this.eval(x,env));return{__set__:true,data:new Map(es.map(v=>[this.pRepr(v),v]))};}
      case'Dict':{
        const d={__d__:{},__k__:[]};
        for(const[k,v]of e.ps){const kv=this.eval(k,env);const vv=this.eval(v,env);d.__d__[this.pRepr(kv)]=vv;d.__k__.push(kv);}
        return d;
      }
      case'Bin':return this.evalBin(e,env);
      case'UnOp':{const v=this.eval(e.v,env);if(e.op==='-'){const nv=-v;return(v&&typeof v==='object'&&v.__float__&&Number.isInteger(nv))?mkf(nv):nv;}if(e.op==='+'){const pv=+v;return(v&&typeof v==='object'&&v.__float__&&Number.isInteger(pv))?mkf(pv):pv;}if(e.op==='~')return~v;if(e.op==='not')return!this.pBool(v);break;}
      case'BoolOp':{const l=this.eval(e.l,env);if(e.op==='or')return this.pBool(l)?l:this.eval(e.r,env);return!this.pBool(l)?l:this.eval(e.r,env);}
      case'Cmp':{const l=this.eval(e.l,env);const r=this.eval(e.r,env);return this.cmp(e.op,l,r);}
      case'Call':return this.evalCall(e,env);
      case'Attr':{const o=this.eval(e.o,env);return this.getAttr(o,e.a);}
      case'Idx':{const o=this.eval(e.o,env);const i=this.eval(e.i,env);return this.getItem(o,i);}
      case'Slice':{const o=this.eval(e.o,env);const lo=e.lo?this.eval(e.lo,env):null;const up=e.up?this.eval(e.up,env):null;const st=e.st?this.eval(e.st,env):null;return this.getSlice(o,lo,up,st);}
      case'Tern':{return this.pBool(this.eval(e.test,env))?this.eval(e.b,env):this.eval(e.o,env);}
      case'Lambda':{return{__fn__:true,name:'<lambda>',args:e.as,body:{t:'Block',b:[{t:'Ret',v:e.body}]},cl:env};}
      case'ListComp':{const rs=[];this.evalComp(e.gens,0,env,(ie)=>rs.push(this.eval(e.elt,ie)));return rs;}
      case'DictComp':{const d={__d__:{},__k__:[]};this.evalComp(e.gens,0,env,(ie)=>{const k=this.eval(e.k,ie);const v=this.eval(e.v,ie);d.__d__[this.pRepr(k)]=v;if(!(d.__k__||[]).some(x=>this.pEq(x,k)))d.__k__.push(k);});return d;}
      case'SetComp':{const s={__set__:true,data:new Map()};this.evalComp(e.gens,0,env,(ie)=>{const v=this.eval(e.elt,ie);s.data.set(this.pRepr(v),v);});return s;}
      case'S':{const a=this.eval(e.v,env);if(!Array.isArray(a))throw new PyErr('TypeError','* needs iterable');return{__star__:true,vs:a};}
      case'SS':{const d=this.eval(e.v,env);return{__ss__:true,d};}
      default:throw new PyErr('RuntimeError',`Unknown node: ${e.t}`);
    }
  }

  evalComp(gens,idx,env,cb){
    if(idx>=gens.length){cb(env);return;}
    const gen=gens[idx];const items=this.toArr(this.eval(gen.iter,env));
    for(const item of items){const ie=new Env(env);this.setTgt(gen.tgt,item,ie);if(gen.ifs.every(c=>this.pBool(this.eval(c,ie))))this.evalComp(gens,idx+1,ie,cb);}
  }

  evalFStr(tmpl,env){
    return tmpl.replace(/\{([^}]+)\}/g,(_,es)=>{
      const colonIdx=es.indexOf(':');const src=colonIdx>=0?es.slice(0,colonIdx).trim():es.trim();const spec=colonIdx>=0?es.slice(colonIdx+1):'';
      try{const toks=tokenize(src+'\n');const p=new Parser(toks);const ast=p.expr();const v=this.eval(ast,env);
        if(spec){if(/[eEfFgG]/.test(spec)){const prec=parseInt(spec.match(/\.(\d+)/)?.[1]??'6');if(spec.includes('e')||spec.includes('E'))return typeof v==='number'?v.toExponential(prec):String(v);return typeof v==='number'?v.toFixed(prec):String(v);}
          if(spec.includes('d'))return Math.trunc(v).toString();
          if(spec.includes('%')){const prec=parseInt(spec.match(/\.(\d+)/)?.[1]??'2');return typeof v==='number'?(v*100).toFixed(prec)+'%':String(v);}
          const wMatch=spec.match(/^(\d+)$/);if(wMatch){const w=parseInt(wMatch[1]);return this.pStr(v).padStart(w);}
        }
        return this.pStr(v);
      }catch{return`{${es}}`;}  
    });
  }

  evalBin(e,env){
    const l=this.eval(e.l,env);const r=this.eval(e.r,env);
    const lf=l&&typeof l==='object'&&l.__float__;const rf=r&&typeof r==='object'&&r.__float__;
    const lv=lf?l.valueOf():l;const rv=rf?r.valueOf():r;
    const wf=(res)=>(lf||rf)&&Number.isInteger(res)?mkf(res):res;
    switch(e.op){
      case'+':if(Array.isArray(lv)&&Array.isArray(rv))return[...lv,...rv];if(typeof lv==='string'||typeof rv==='string')return this.pStr(lv)+this.pStr(rv);return wf(lv+rv);
      case'-':return wf(lv-rv);
      case'*':if(typeof lv==='string'&&typeof rv==='number')return lv.repeat(Math.max(0,rv));if(typeof rv==='string'&&typeof lv==='number')return rv.repeat(Math.max(0,lv));if(Array.isArray(lv)&&typeof rv==='number'){const a=[];for(let i=0;i<rv;i++)a.push(...lv);return a;}return wf(lv*rv);
      case'/':if(rv===0)throw new PyErr('ZeroDivisionError','division by zero');return lv/rv;
      case'//':if(rv===0)throw new PyErr('ZeroDivisionError','division by zero');return wf(Math.floor(lv/rv));
      case'%':if(rv===0)throw new PyErr('ZeroDivisionError','modulo by zero');if(typeof lv==='string')return this.pyFmt(lv,rv);return wf(((lv%rv)+Math.abs(rv))%Math.abs(rv));
      case'**':return wf(Math.pow(lv,rv));
      case'&':return lv&rv;case'|':return lv|rv;case'^':return lv^rv;
      case'<<':return lv<<rv;case'>>':return lv>>rv;
    }
  }

  pyFmt(fmt,args){
    if(!Array.isArray(args))args=[args];let i=0;
    return fmt.replace(/%([.0-9]*)([dsifr%])/g,(_,sp,tp)=>{
      if(tp==='%')return'%';const v=args[i++];
      if(tp==='d'||tp==='i')return Math.trunc(v).toString();
      if(tp==='f'){const p=parseInt(sp.match(/\.(\d+)/)?.[1]??'6');return Number(v).toFixed(p);}
      if(tp==='s'||tp==='r')return this.pStr(v);return String(v);
    });
  }

  cmp(op,l,r){
    switch(op){
      case'==':return this.pEq(l,r);case'!=':return!this.pEq(l,r);
      case'<':return this.pLt(l,r);case'>':return this.pLt(r,l);
      case'<=':return!this.pLt(r,l);case'>=':return!this.pLt(l,r);
      case'in':return this.pIn(l,r);case'not in':return!this.pIn(l,r);
      case'is':return l===r;case'is not':return l!==r;
    }
  }
  pEq(a,b){
    const av=a&&typeof a==='object'&&a.__float__?a.valueOf():a;
    const bv=b&&typeof b==='object'&&b.__float__?b.valueOf():b;
    if(av===bv)return true;if(av===null||bv===null)return av===bv;
    if(Array.isArray(av)&&Array.isArray(bv))return av.length===bv.length&&av.every((v,i)=>this.pEq(v,bv[i]));
    return av==bv;
  }
  pLt(a,b){
    const av=a&&typeof a==='object'&&a.__float__?a.valueOf():a;
    const bv=b&&typeof b==='object'&&b.__float__?b.valueOf():b;
    if(typeof av==='string'&&typeof bv==='string')return av<bv;
    if(Array.isArray(av)&&Array.isArray(bv)){for(let i=0;i<Math.min(av.length,bv.length);i++){if(this.pLt(av[i],bv[i]))return true;if(this.pLt(bv[i],av[i]))return false;}return av.length<bv.length;}
    return av<bv;
  }
  pIn(x,c){
    if(typeof c==='string')return c.includes(this.pStr(x));
    if(Array.isArray(c))return c.some(v=>this.pEq(v,x));
    if(c&&c.__d__)return(c.__k__||[]).some(k=>this.pEq(k,x));
    if(c&&c.__set__)return c.data.has(this.pRepr(x));
    if(c&&c.__rng__){const r=c;const xv=x&&typeof x==='object'&&x.__float__?x.valueOf():x;if(typeof xv!=='number')return false;if(r.s>0)return xv>=r.a&&xv<r.b&&Number.isInteger((xv-r.a)/r.s);return xv<=r.a&&xv>r.b&&Number.isInteger((r.a-xv)/(-r.s));}
    throw new PyErr('TypeError',`'${this.tname(c)}' is not iterable`);
  }

  evalCall(e,env){
    const fn=this.eval(e.fn,env);
    let args=[];const kw={};
    Object.entries(e.kw||{}).forEach(([k,v])=>kw[k]=this.eval(v,env));
    for(const a of e.as){const v=this.eval(a,env);if(v&&v.__star__)args.push(...v.vs);else if(v&&v.__ss__){const d=v.d;(d.__k__||[]).forEach(k=>kw[this.pStr(k)]=d.__d__[this.pRepr(k)]);}else args.push(v);}
    if(fn===null||fn===undefined)throw new PyErr('TypeError',`'NoneType' is not callable`);
    if(typeof fn!=='function'&&!(fn&&(fn.__fn__||fn.__cls__||fn.__bm__)))throw new PyErr('TypeError',`'${this.tname(fn)}' is not callable`);
    return this.call(fn,args,kw);
  }

  call(fn,args,kw={}){
    if(++this.depth>this.MAX_DEPTH){this.depth--;throw new PyErr('RecursionError','maximum recursion depth exceeded');}
    try{
      if(typeof fn==='function'){return Object.keys(kw).length>0?fn(...args,{__kw__:kw}):fn(...args);}
      if(fn&&fn.__fn__){
        const fe=new Env(fn.cl);let pi=0;
        for(const p of fn.args){
          if(p.s===1){fe.set(p.n,args.slice(pi));pi=args.length;}
          else if(p.s===2){const d={__d__:{},__k__:[]};Object.entries(kw).forEach(([k,v])=>{d.__d__[this.pRepr(k)]=v;d.__k__.push(k);});fe.set(p.n,d);}
          else{const v=p.n in kw?kw[p.n]:pi<args.length?args[pi++]:p.d!==null?this.eval(p.d,fn.cl):null;fe.set(p.n,v);}
        }
        const r=this.execBlock(fn.body.b,fe);
        if(r instanceof RetSig)return r.v;if(r instanceof ExcSig)throw r.e;return null;
      }
      if(fn&&fn.__cls__){
        const inst={__inst__:true,__cls__:fn,__attrs__:{}};
        const init=fn.__m__.__init__;
        if(init){
          if(typeof init==='function'){init(inst,...args);}  // native __init__
          else{this.call({...init,__fn__:true},[inst,...args],kw);}  // user-defined __init__
        }
        return inst;
      }
      if(fn&&fn.__bm__){return this.call(fn.fn,[fn.self,...args],kw);}
      throw new PyErr('TypeError',`'${this.tname(fn)}' is not callable`);
    }finally{this.depth--;}
  }

  // ── Object attribute/item access ──────────────────────────
  getAttr(o,a){
    if(o===null)throw new PyErr('AttributeError',`'NoneType' has no attribute '${a}'`);
    if(typeof o==='string')return this.strMethod(o,a);
    if(Array.isArray(o))return this.listMethod(o,a);
    if(o&&o.__d__!==undefined&&!o.__mod__)return this.dictMethod(o,a);
    if(o&&o.__set__)return this.setMethod(o,a);
    // PyErr object (from except e as err) - expose .msg, .args
    if(o instanceof PyErr){if(a==='msg'||a==='args')return a==='msg'?o.msg:[o.msg];if(a==='__class__')return o.et;return o[a]??null;}
    if(o&&o.__inst__){if(a in o.__attrs__)return o.__attrs__[a];const m=o.__cls__.__m__[a];if(m)return{__bm__:true,fn:m,self:o};throw new PyErr('AttributeError',`'${o.__cls__.__name__}' has no attribute '${a}'`);}
    if(o&&o.__mod__&&a in o)return o[a];
    if(o&&typeof o==='object'&&a in o){const v=o[a];return typeof v==='function'?v:v;}
    throw new PyErr('AttributeError',`'${this.tname(o)}' has no attribute '${a}'`);
  }

  strMethod(s,m){
    const py=this;
    const ms={
      upper:()=>s.toUpperCase(),lower:()=>s.toLowerCase(),
      strip:(c)=>c?s.replace(new RegExp(`^[${c}]+|[${c}]+$`,'g'),''):s.trim(),
      lstrip:(c)=>c?s.replace(new RegExp(`^[${c}]+`),''):s.trimStart(),
      rstrip:(c)=>c?s.replace(new RegExp(`[${c}]+$`),''):s.trimEnd(),
      split:(sep,mx=-1)=>{
        if(sep==null){const p=s.trim().split(/\s+/);return s.trim()===''?[]:p;}
        if(mx===-1)return s.split(sep);
        const ps=[];let str=s;for(let i=0;i<mx;i++){const idx=str.indexOf(sep);if(idx===-1)break;ps.push(str.slice(0,idx));str=str.slice(idx+sep.length);}ps.push(str);return ps;
      },
      splitlines:()=>s.split('\n'),
      join:(it)=>py.toArr(it).map(v=>py.pStr(v)).join(s),
      replace:(old,nw,cnt=-1)=>{if(cnt===-1)return s.replaceAll(old,nw);let r=s,i=0;while(i<cnt){const idx=r.indexOf(old);if(idx===-1)break;r=r.slice(0,idx)+nw+r.slice(idx+old.length);i++;}return r;},
      find:(sub,st=0)=>s.indexOf(sub,st),rfind:(sub)=>s.lastIndexOf(sub),
      index:(sub,st=0)=>{const i=s.indexOf(sub,st);if(i===-1)throw new PyErr('ValueError','substring not found');return i;},
      count:(sub)=>{let c=0,p=0;while((p=s.indexOf(sub,p))!==-1){c++;p+=sub.length||1;}return c;},
      startswith:(pfx)=>Array.isArray(pfx)?pfx.some(p=>s.startsWith(p)):s.startsWith(pfx),
      endswith:(sfx)=>Array.isArray(sfx)?sfx.some(p=>s.endsWith(p)):s.endsWith(sfx),
      isdigit:()=>/^\d+$/.test(s),isalpha:()=>/^[a-zA-Z]+$/.test(s),
      isalnum:()=>/^[a-zA-Z0-9]+$/.test(s),isspace:()=>/^\s+$/.test(s),
      isupper:()=>s===s.toUpperCase()&&/[a-zA-Z]/.test(s),
      islower:()=>s===s.toLowerCase()&&/[a-zA-Z]/.test(s),
      capitalize:()=>s.charAt(0).toUpperCase()+s.slice(1).toLowerCase(),
      title:()=>s.replace(/\b\w/g,c=>c.toUpperCase()),
      center:(w,f=' ')=>s.padStart(Math.floor((w+s.length)/2),f).padEnd(w,f),
      ljust:(w,f=' ')=>s.padEnd(w,f),rjust:(w,f=' ')=>s.padStart(w,f),
      zfill:(w)=>s.padStart(w,'0'),
      format:(...args)=>{
        let i=0;return s.replace(/\{(\d*)(:[^}]*)?\}/g,(_,idx,spec)=>{
          const v=idx!==''?args[parseInt(idx)]:args[i++];
          if(spec){const fs=spec.slice(1);if(fs.includes('f')){const p=parseInt(fs.match(/\.(\d+)/)?.[1]??'6');return typeof v==='number'?v.toFixed(p):String(v);}if(fs.includes('d'))return Math.trunc(v).toString();}
          return py.pStr(v);
        });
      },
      encode:()=>s,decode:()=>s,
      __len__:()=>s.length,__contains__:(x)=>s.includes(x),
    };
    if(m in ms)return ms[m];
    throw new PyErr('AttributeError',`'str' has no attribute '${m}'`);
  }

  listMethod(arr,m){
    const py=this;
    const ms={
      append:(v)=>{arr.push(v);return null;},
      extend:(v)=>{arr.push(...py.toArr(v));return null;},
      insert:(i,v)=>{arr.splice(i,0,v);return null;},
      pop:(i=-1)=>{const idx=i<0?arr.length+i:i;if(idx<0||idx>=arr.length)throw new PyErr('IndexError','pop index out of range');return arr.splice(idx,1)[0];},
      remove:(v)=>{const i=arr.findIndex(x=>py.pEq(x,v));if(i===-1)throw new PyErr('ValueError','list.remove(x): x not in list');arr.splice(i,1);return null;},
      index:(v,st=0)=>{const i=arr.findIndex((x,j)=>j>=st&&py.pEq(x,v));if(i===-1)throw new PyErr('ValueError',`${py.pRepr(v)} not in list`);return i;},
      count:(v)=>arr.filter(x=>py.pEq(x,v)).length,
      sort:(...args)=>{let key=null,rev=false;const last=args[args.length-1];if(last&&last.__kw__){const kw=args.pop().__kw__;key=kw.key||null;rev=kw.reverse||false;}arr.sort((a,b)=>{const ka=key?py.call(key,[a],{}):a;const kb=key?py.call(key,[b],{}):b;return py.pLt(ka,kb)?-1:py.pLt(kb,ka)?1:0;});if(rev)arr.reverse();return null;},
      reverse:()=>{arr.reverse();return null;},
      clear:()=>{arr.length=0;return null;},
      copy:()=>[...arr],
      __len__:()=>arr.length,__contains__:(x)=>arr.some(v=>py.pEq(v,x)),
    };
    if(m in ms)return ms[m];
    throw new PyErr('AttributeError',`'list' has no attribute '${m}'`);
  }

  dictMethod(d,m){
    const py=this;const gk=(k)=>py.pRepr(k);
    const ms={
      get:(k,df=null)=>{const r=gk(k);return r in d.__d__?d.__d__[r]:df;},
      keys:()=>[...(d.__k__||[])],values:()=>(d.__k__||[]).map(k=>d.__d__[gk(k)]),
      items:()=>(d.__k__||[]).map(k=>[k,d.__d__[gk(k)]]),
      update:(o)=>{(o.__k__||[]).forEach(k=>{d.__d__[gk(k)]=o.__d__[gk(k)];if(!(d.__k__||[]).some(x=>py.pEq(x,k))){d.__k__=d.__k__||[];d.__k__.push(k);}});return null;},
      pop:(k,df)=>{const r=gk(k);if(r in d.__d__){const v=d.__d__[r];delete d.__d__[r];d.__k__=(d.__k__||[]).filter(x=>!py.pEq(x,k));return v;}if(df!==undefined)return df;throw new PyErr('KeyError',py.pRepr(k));},
      setdefault:(k,df=null)=>{const r=gk(k);if(!(r in d.__d__)){d.__d__[r]=df;d.__k__=d.__k__||[];d.__k__.push(k);}return d.__d__[r];},
      clear:()=>{d.__d__={};d.__k__=[];return null;},copy:()=>({__d__:{...d.__d__},__k__:[...(d.__k__||[])]}),
      __len__:()=>(d.__k__||[]).length,__contains__:(k)=>gk(k) in d.__d__,
    };
    if(m in ms)return ms[m];
    throw new PyErr('AttributeError',`'dict' has no attribute '${m}'`);
  }

  setMethod(s,m){
    const py=this;
    const ms={
      add:(v)=>{s.data.set(py.pRepr(v),v);return null;},
      remove:(v)=>{const k=py.pRepr(v);if(!s.data.has(k))throw new PyErr('KeyError',py.pRepr(v));s.data.delete(k);return null;},
      discard:(v)=>{s.data.delete(py.pRepr(v));return null;},
      pop:()=>{const[k,v]=s.data.entries().next().value;s.data.delete(k);return v;},
      clear:()=>{s.data.clear();return null;},copy:()=>({__set__:true,data:new Map(s.data)}),
      union:(o)=>({__set__:true,data:new Map([...s.data,...o.data])}),
      intersection:(o)=>({__set__:true,data:new Map([...s.data].filter(([k])=>o.data.has(k)))}),
      difference:(o)=>({__set__:true,data:new Map([...s.data].filter(([k])=>!o.data.has(k)))}),
      issubset:(o)=>[...s.data.keys()].every(k=>o.data.has(k)),
      issuperset:(o)=>[...o.data.keys()].every(k=>s.data.has(k)),
      __len__:()=>s.data.size,__contains__:(v)=>s.data.has(py.pRepr(v)),
    };
    if(m in ms)return ms[m];
    throw new PyErr('AttributeError',`'set' has no attribute '${m}'`);
  }

  getItem(o,idx){
    const idxv=idx&&typeof idx==='object'&&idx.__float__?idx.valueOf():idx;
    if(typeof o==='string'){const i=idxv<0?o.length+idxv:idxv;if(i<0||i>=o.length)throw new PyErr('IndexError','string index out of range');return o[i];}
    if(Array.isArray(o)){const i=typeof idxv==='number'?(idxv<0?o.length+idxv:idxv):idxv;if(typeof i==='number'&&(i<0||i>=o.length))throw new PyErr('IndexError','list index out of range');return o[i];}
    if(o&&o.__d__!==undefined){const k=this.pRepr(idx);if(!(k in o.__d__))throw new PyErr('KeyError',this.pRepr(idx));return o.__d__[k];}
    if(o&&o.__rng__){const r=o;const i=idx<0?Math.ceil((r.b-r.a)/r.s)+idx:idx;return r.a+i*r.s;}
    throw new PyErr('TypeError',`'${this.tname(o)}' is not subscriptable`);
  }

  getSlice(o,lo,up,st){
    const arr=typeof o==='string'?o.split(''):Array.isArray(o)?o:this.toArr(o);
    const len=arr.length;const step=st===null?1:st;if(step===0)throw new PyErr('ValueError','slice step cannot be zero');
    const start=lo===null?(step<0?len-1:0):(lo<0?Math.max(step<0?-1:0,len+lo):Math.min(len,lo));
    const stop=up===null?(step<0?-1:len):(up<0?Math.max(step<0?-1:0,len+up):Math.min(len,up));
    const res=[];if(step>0)for(let i=start;i<stop;i+=step)res.push(arr[i]);else for(let i=start;i>stop;i+=step)res.push(arr[i]);
    return typeof o==='string'?res.join(''):res;
  }

  toArr(it){
    if(Array.isArray(it))return it;if(typeof it==='string')return it.split('');
    if(it&&it.__rng__){const r=it,res=[];if(r.s>0){for(let i=r.a;i<r.b;i+=r.s)res.push(i);}else{for(let i=r.a;i>r.b;i+=r.s)res.push(i);}return res;}
    if(it&&it.__set__)return[...it.data.values()];
    if(it&&it.__d__)return it.__k__||[];
    if(it===null||it===undefined)throw new PyErr('TypeError',"'NoneType' is not iterable");
    throw new PyErr('TypeError',`'${this.tname(it)}' is not iterable`);
  }

  // ── Type helpers ─────────────────────────────────────────
  pBool(v){
    if(v===null||v===undefined)return false;if(typeof v==='boolean')return v;
    if(typeof v==='number')return v!==0;if(typeof v==='string')return v.length>0;
    if(v&&typeof v==='object'&&v.__float__)return v.valueOf()!==0;
    if(Array.isArray(v))return v.length>0;if(v.__d__!==undefined)return(v.__k__||[]).length>0;
    if(v.__set__)return v.data.size>0;if(v.__rng__)return v.s>0?v.a<v.b:v.a>v.b;return true;
  }
  pStr(v){
    if(v===null)return'None';if(v===true)return'True';if(v===false)return'False';
    // Tagged float object (from mkf)
    if(v&&typeof v==='object'&&v.__float__){
      const n=v.valueOf();
      return Number.isInteger(n)?n+'.0':String(n);
    }
    if(typeof v==='number'){
      if(!isFinite(v))return v>0?'inf':'-inf';if(isNaN(v))return'nan';
      // Python-like float display: match Python's repr for floats
      if(!Number.isInteger(v)){
        const s=String(v);
        // Only trim if JS produces absurdly long strings (>17 significant digits)
        // Python shows 0.30000000000000004 as-is, so we do the same
        if(s.replace('-','').replace('.','').length>18){
          const r=parseFloat(v.toPrecision(15));
          return String(r);
        }
        return s;
      }
      return String(v);
    }
    if(typeof v==='string')return v;
    if(v.__tup__)return`(${v.map(x=>this.pRepr(x)).join(', ')}${v.length===1?',':''})`;
    if(Array.isArray(v))return`[${v.map(x=>this.pRepr(x)).join(', ')}]`;
    if(v.__d__!==undefined){const ps=(v.__k__||[]).map(k=>`${this.pRepr(k)}: ${this.pRepr(v.__d__[this.pRepr(k)])}`);return`{${ps.join(', ')}}`;}
    if(v.__set__)return`{${[...v.data.values()].map(x=>this.pRepr(x)).join(', ')}}`;
    if(v.__rng__)return v.s===1?`range(${v.a}, ${v.b})`:`range(${v.a}, ${v.b}, ${v.s})`;
    if(v.__inst__)return`<${v.__cls__.__name__} object>`;if(v.__cls__)return`<class '${v.__name__}'>`;
    if(v.__fn__)return`<function ${v.name}>`;if(typeof v==='function')return'<built-in function>';
    return String(v);
  }
  pRepr(v){
    if(typeof v==='string')return`'${v.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n').replace(/\t/g,'\\t')}'`;
    if(v===null)return'None';if(v===true)return'True';if(v===false)return'False';
    if(v&&typeof v==='object'&&v.__float__)return this.pStr(v);
    if(typeof v==='number')return this.pStr(v);
    if(v.__tup__)return`(${v.map(x=>this.pRepr(x)).join(', ')}${v.length===1?',':''})`;
    if(Array.isArray(v))return`[${v.map(x=>this.pRepr(x)).join(', ')}]`;
    return this.pStr(v);
  }
  tname(v){
    if(v===null)return'NoneType';if(v===true||v===false)return'bool';
    if(v&&typeof v==='object'&&v.__float__)return'float';
    if(typeof v==='number')return Number.isInteger(v)?'int':'float';if(typeof v==='string')return'str';
    if(v.__tup__)return'tuple';if(Array.isArray(v))return'list';if(v.__d__!==undefined)return'dict';
    if(v.__set__)return'set';if(v.__rng__)return'range';if(v.__inst__)return v.__cls__.__name__;
    if(v.__fn__||v.__bm__)return'function';if(typeof v==='function')return'builtin_function';return'object';
  }
}

// ─── Async runner with input support ───────────────────────
function run(source, outCb, inputResolver){
  return new Promise((resolve)=>{
    let output='';
    const addOut=(s)=>{output+=s;outCb(s,false);};
    let inputQ=[];let waitingInput=false;let inputResolve=null;
    const syncIn=()=>{
      // This uses the callback system - will be resolved externally
      // We use a synchronous blocking mechanism via a shared array (not possible in pure JS)
      // Instead, we collect all inputs needed via prompts
      return inputResolver();
    };
    try{
      const toks=tokenize(source);
      const parser=new Parser(toks);
      const ast=parser.parse();
      const interp=new Interp(addOut,syncIn);
      const r=interp.run(ast);
      if(r instanceof ExcSig){outCb('\n'+r.e.toString()+'\n',true);resolve({ok:false,output});return;}
      if(r instanceof RetSig){outCb('\nSyntaxError: \'return\' outside function\n',true);resolve({ok:false,output});return;}
      resolve({ok:true,output});
    }catch(e){
      const msg=e instanceof PyErr?e.toString():'RuntimeError: '+(e.message||String(e));
      outCb('\n'+msg+'\n',true);
      resolve({ok:false,output});
    }
  });
}

return{run,tokenize,Parser,Interp,PyErr};
})();


// ─── js/editors/syntax/highlight.js ───────────────────────────
/**
 * editors/syntax/highlight.js — VSCode Dark+ Syntax Highlighter
 * ═══════════════════════════════════════════════════════════════
 * Màu sắc chính xác theo VSCode Dark+ theme (Microsoft):
 *
 * Python:
 *   Keywords      #C586C0  — pink/magenta (if, for, def, class...)
 *   Functions     #DCDCAA  — yellow (defined function names)
 *   Builtins      #4EC9B0  — teal (print, len, range...)
 *   Strings       #CE9178  — peach/orange
 *   Numbers       #B5CEA8  — light green
 *   Comments      #6A9955  — dark green, italic
 *   Variables     #9CDCFE  — light blue (self, cls)
 *   Operators     #D4D4D4  — light grey
 *   Class names   #4EC9B0  — teal
 *   Decorators    #DCDCAA  — yellow (@decorator)
 *   Booleans      #569CD6  — blue (True, False, None)
 *   Plain text    #D4D4D4  — light grey
 *
 * HTML/CSS:
 *   Tag names     #569CD6  — blue (<div, <p, <h1...)
 *   Attributes    #9CDCFE  — light blue (class=, id=...)
 *   Attr values   #CE9178  — peach ("value")
 *   Doctype       #808080  — grey
 *   Comments      #6A9955  — green
 *   Entities      #CE9178  — peach (&amp;)
 *   CSS selectors #D7BA7D  — tan/gold
 *   CSS props     #9CDCFE  — light blue (color:, font-size:)
 *   CSS values    #CE9178  — peach (red, 12px, #fff)
 *   CSS at-rules  #C586C0  — pink (@media, @import)
 *   CSS units     #B5CEA8  — green (px, em, %)
 *
 * SQL:
 *   Keywords      #569CD6  — blue (SELECT, FROM, WHERE...)
 *   Functions     #DCDCAA  — yellow (COUNT, SUM, AVG...)
 *   Data types    #4EC9B0  — teal (INTEGER, VARCHAR...)
 *   Strings       #CE9178  — peach
 *   Numbers       #B5CEA8  — green
 *   Comments      #6A9955  — green
 *   Operators     #D4D4D4  — grey
 *   Punctuation   #D4D4D4  — grey
 *
 * @requires core/namespace.js
 */

'use strict';

CL.define('Editors.Syntax', () => {

  // ── Common escape ─────────────────────────────────────────────
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ══════════════════════════════════════════════════════════════
  //  PYTHON — VSCode Dark+ accurate
  // ══════════════════════════════════════════════════════════════

  const PY_KW = new Set([
    'False','None','True','and','as','assert','async','await',
    'break','class','continue','def','del','elif','else','except',
    'finally','for','from','global','if','import','in','is',
    'lambda','nonlocal','not','or','pass','raise','return','try',
    'while','with','yield',
  ]);
  const PY_BOOL = new Set(['True','False','None']);

  const PY_BUILTINS = new Set([
    'abs','all','any','ascii','bin','bool','breakpoint','bytearray','bytes',
    'callable','chr','classmethod','compile','complex','copyright','credits',
    'delattr','dict','dir','divmod','enumerate','eval','exec','exit',
    'filter','float','format','frozenset','getattr','globals','hasattr',
    'hash','help','hex','id','input','int','isinstance','issubclass',
    'iter','len','license','list','locals','map','max','memoryview','min',
    'next','object','oct','open','ord','pow','print','property','quit',
    'range','repr','reversed','round','set','setattr','slice','sorted',
    'staticmethod','str','sum','super','tuple','type','vars','zip',
    // common stdlib functions people use at top level
    'math','os','sys','re','json','time','datetime','random',
  ]);

  function python(code) {
    let out = '';
    let i = 0;
    const n = code.length;
    let prevWord = null;

    const span = (cls, text) => `<span class="hl-${cls}">${esc(text)}</span>`;

    while (i < n) {
      const ch = code[i];

      // ── Comment ──────────────────────────────────────────────
      if (ch === '#') {
        let j = i;
        while (j < n && code[j] !== '\n') j++;
        out += span('cmt', code.slice(i, j));
        i = j; prevWord = null;
        continue;
      }

      // ── Triple-quoted string ──────────────────────────────────
      if ((ch === '"' || ch === "'") && code[i+1] === ch && code[i+2] === ch) {
        const q = ch.repeat(3);
        let j = i + 3;
        while (j < n && code.slice(j, j+3) !== q) {
          if (code[j] === '\\') j++;
          j++;
        }
        j += 3;
        out += span('str', code.slice(i, j));
        i = j; prevWord = null;
        continue;
      }

      // ── String (f-string prefix aware) ──────────────────────
      if ((ch === '"' || ch === "'") ||
          ((ch === 'f' || ch === 'r' || ch === 'b' || ch === 'u') &&
           (code[i+1] === '"' || code[i+1] === "'"))) {
        let start = i;
        if (ch !== '"' && ch !== "'") i++;
        const q = code[i];
        let j = i + 1;
        while (j < n && code[j] !== q && code[j] !== '\n') {
          if (code[j] === '\\') j++;
          j++;
        }
        if (j < n && code[j] === q) j++;
        out += span('str', code.slice(start, j));
        i = j; prevWord = null;
        continue;
      }

      // ── Number ───────────────────────────────────────────────
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[i+1]||''))) {
        let j = i;
        if (ch === '0' && /[xXbBoO]/.test(code[i+1]||'')) {
          j += 2;
          while (j < n && /[0-9a-fA-F_]/.test(code[j])) j++;
        } else {
          while (j < n && /[0-9._eEjJ]/.test(code[j])) j++;
        }
        out += span('num', code.slice(i, j));
        i = j; prevWord = null;
        continue;
      }

      // ── Decorator ─────────────────────────────────────────────
      if (ch === '@') {
        let j = i + 1;
        while (j < n && /[\w.]/.test(code[j])) j++;
        out += span('deco', code.slice(i, j));
        i = j; prevWord = 'deco';
        continue;
      }

      // ── Identifier / keyword ──────────────────────────────────
      if (/[a-zA-Z_\u00c0-\u024f\u1ea0-\u1ef9]/.test(ch)) {
        let j = i;
        while (j < n && /[\w\u00c0-\u024f\u1ea0-\u1ef9]/.test(code[j])) j++;
        const w = code.slice(i, j);
        let cls;
        if (prevWord === 'def')   cls = 'fn';
        else if (prevWord === 'class') cls = 'cls';
        else if (w === 'self' || w === 'cls') cls = 'self';
        else if (PY_BOOL.has(w))      cls = 'bool';
        else if (PY_KW.has(w))        cls = 'kw';
        else if (PY_BUILTINS.has(w))  cls = 'bi';
        else                          cls = 'plain';
        out += span(cls, w);
        prevWord = (w === 'def' || w === 'class') ? w : null;
        i = j;
        continue;
      }

      // ── Operators ─────────────────────────────────────────────
      if (/[+\-*/%=<>!&|^~]/.test(ch)) {
        const two = code.slice(i, i+2);
        const thr = code.slice(i, i+3);
        const len = ['//=','**=','<<=','>>='].includes(thr) ? 3
                  : ['**','//','==','!=','<=','>=','+=','-=','*=','/=','%=',
                     '&=','|=','^=','<<','>>','->','**'].includes(two) ? 2 : 1;
        out += span('op', code.slice(i, i+len));
        i += len; prevWord = null;
        continue;
      }

      // ── Punctuation ───────────────────────────────────────────
      if (/[()[\]{},.:;]/.test(ch)) {
        out += span('punc', ch); i++; prevWord = null;
        continue;
      }

      // pass-through (spaces, newlines)
      out += esc(ch);
      i++;
    }
    return out;
  }

  // ══════════════════════════════════════════════════════════════
  //  HTML/CSS — VSCode Dark+ accurate
  // ══════════════════════════════════════════════════════════════

  function html(code) {
    let out = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      // ── HTML Comment ─────────────────────────────────────────
      if (code.slice(i, i+4) === '<!--') {
        const end = code.indexOf('-->', i+4);
        const j = end < 0 ? n : end + 3;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }

      // ── Doctype ───────────────────────────────────────────────
      if (code.slice(i, i+9).toLowerCase() === '<!doctype') {
        const j = code.indexOf('>', i) + 1 || n;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }

      // ── Style tag contents → CSS highlighting ────────────────
      if (code.slice(i, i+7).toLowerCase() === '<style>') {
        // Emit <style> tag
        out += `<span class="hl-tag">&lt;style&gt;</span>`;
        i += 7;
        const end = code.toLowerCase().indexOf('</style>', i);
        const cssCode = end < 0 ? code.slice(i) : code.slice(i, end);
        out += css(cssCode);
        i = end < 0 ? n : end;
        continue;
      }

      // ── Tag ───────────────────────────────────────────────────
      if (ch(code, i) === '<' && /[a-zA-Z/!]/.test(code[i+1]||'')) {
        out += `<span class="hl-punc">&lt;</span>`;
        i++;
        // Closing tag slash
        if (code[i] === '/') { out += `<span class="hl-punc">/</span>`; i++; }
        // Tag name
        let j = i;
        while (j < n && /[\w:\-]/.test(code[j])) j++;
        if (j > i) {
          out += `<span class="hl-tag">${esc(code.slice(i, j))}</span>`;
          i = j;
        }
        // Attributes until >
        while (i < n && code[i] !== '>') {
          // Self-closing slash
          if (code[i] === '/' && code[i+1] === '>') {
            out += `<span class="hl-punc">/&gt;</span>`;
            i += 2; break;
          }
          // Attribute name
          if (/[a-zA-Z_]/.test(code[i])) {
            let k = i;
            while (k < n && /[\w:\-]/.test(code[k])) k++;
            out += `<span class="hl-attr">${esc(code.slice(i, k))}</span>`;
            i = k;
            // =
            if (code[i] === '=') {
              out += `<span class="hl-punc">=</span>`;
              i++;
              // Value
              if (code[i] === '"' || code[i] === "'") {
                const q = code[i];
                let m = i + 1;
                while (m < n && code[m] !== q) m++;
                m++;
                out += `<span class="hl-attrval">${esc(code.slice(i, m))}</span>`;
                i = m;
              } else {
                let m = i;
                while (m < n && !/[\s>]/.test(code[m])) m++;
                out += `<span class="hl-attrval">${esc(code.slice(i, m))}</span>`;
                i = m;
              }
            }
          } else {
            out += esc(code[i]); i++;
          }
        }
        if (i < n && code[i] === '>') {
          out += `<span class="hl-punc">&gt;</span>`;
          i++;
        }
        continue;
      }

      // ── Entity ────────────────────────────────────────────────
      if (code[i] === '&') {
        let j = i + 1;
        while (j < n && code[j] !== ';' && !/\s/.test(code[j])) j++;
        if (j < n && code[j] === ';') {
          out += `<span class="hl-entity">${esc(code.slice(i, j+1))}</span>`;
          i = j + 1;
          continue;
        }
      }

      out += esc(code[i]); i++;
    }
    return out;
  }

  // ── CSS highlighter ───────────────────────────────────────────
  function css(code) {
    let out = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      // Comment
      if (code.slice(i, i+2) === '/*') {
        const end = code.indexOf('*/', i+2);
        const j = end < 0 ? n : end + 2;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // At-rule
      if (code[i] === '@') {
        let j = i + 1;
        while (j < n && /[\w-]/.test(code[j])) j++;
        out += `<span class="hl-css-at">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // String
      if (code[i] === '"' || code[i] === "'") {
        const q = code[i];
        let j = i + 1;
        while (j < n && code[j] !== q) { if (code[j] === '\\') j++; j++; }
        j++;
        out += `<span class="hl-str">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // Inside braces — property: value
      if (code[i] === '{') {
        out += `<span class="hl-punc">{</span>`;
        i++;
        // parse until }
        while (i < n && code[i] !== '}') {
          // Comment inside
          if (code.slice(i, i+2) === '/*') {
            const end = code.indexOf('*/', i+2);
            const j = end < 0 ? n : end + 2;
            out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
            i = j; continue;
          }
          // Property name (before colon)
          if (/[a-zA-Z-]/.test(code[i])) {
            let j = i;
            while (j < n && /[a-zA-Z0-9-]/.test(code[j])) j++;
            const prop = code.slice(i, j);
            // Check if followed by colon (property) vs part of selector
            let k = j;
            while (k < n && code[k] === ' ') k++;
            if (code[k] === ':' && code[k+1] !== ':') {
              out += `<span class="hl-css-prop">${esc(prop)}</span>`;
              out += `<span class="hl-punc">:</span>`;
              i = k + 1;
              // Value until ; or }
              while (i < n && code[i] !== ';' && code[i] !== '}') {
                if (/[0-9.]/.test(code[i])) {
                  let m = i;
                  while (m < n && /[0-9.]/.test(code[m])) m++;
                  // unit
                  let u = m;
                  while (u < n && /[a-zA-Z%]/.test(code[u])) u++;
                  if (u > m) {
                    out += `<span class="hl-num">${esc(code.slice(i, m))}</span>`;
                    out += `<span class="hl-css-unit">${esc(code.slice(m, u))}</span>`;
                    i = u;
                  } else {
                    out += `<span class="hl-num">${esc(code.slice(i, m))}</span>`;
                    i = m;
                  }
                } else if (code[i] === '#') {
                  let m = i + 1;
                  while (m < n && /[0-9a-fA-F]/.test(code[m])) m++;
                  out += `<span class="hl-css-color">${esc(code.slice(i, m))}</span>`;
                  i = m;
                } else if (code[i] === '"' || code[i] === "'") {
                  const q = code[i]; let m = i + 1;
                  while (m < n && code[m] !== q) m++; m++;
                  out += `<span class="hl-str">${esc(code.slice(i, m))}</span>`;
                  i = m;
                } else if (/[a-zA-Z-]/.test(code[i])) {
                  let m = i;
                  while (m < n && /[a-zA-Z0-9-]/.test(code[m])) m++;
                  out += `<span class="hl-css-val">${esc(code.slice(i, m))}</span>`;
                  i = m;
                } else {
                  out += esc(code[i]); i++;
                }
              }
              if (code[i] === ';') { out += `<span class="hl-punc">;</span>`; i++; }
            } else {
              // It's a selector-like fragment
              out += `<span class="hl-css-sel">${esc(prop)}</span>`;
              i = j;
            }
          } else {
            out += esc(code[i]); i++;
          }
        }
        if (i < n) { out += `<span class="hl-punc">}</span>`; i++; }
        continue;
      }
      // Selector (outside braces)
      if (/[.#a-zA-Z:*\[]/.test(code[i])) {
        let j = i;
        while (j < n && code[j] !== '{' && code[j] !== '\n' && code[j] !== '/') j++;
        const sel = code.slice(i, j);
        out += `<span class="hl-css-sel">${esc(sel)}</span>`;
        i = j; continue;
      }
      out += esc(code[i]); i++;
    }
    return out;
  }

  // ══════════════════════════════════════════════════════════════
  //  SQL — VSCode Dark+ accurate
  // ══════════════════════════════════════════════════════════════

  const SQL_KW = new Set([
    'SELECT','FROM','WHERE','AND','OR','NOT','IN','LIKE','BETWEEN','IS','NULL',
    'INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','DATABASE',
    'DROP','ALTER','ADD','COLUMN','PRIMARY','KEY','FOREIGN','REFERENCES',
    'INNER','LEFT','RIGHT','FULL','OUTER','JOIN','ON','AS','DISTINCT',
    'ORDER','BY','GROUP','HAVING','LIMIT','OFFSET','UNION','ALL','EXCEPT',
    'INTERSECT','WITH','CASE','WHEN','THEN','ELSE','END','USING',
    'GRANT','REVOKE','COMMIT','ROLLBACK','BEGIN','TRANSACTION',
    'IF','EXISTS','NOT','CONSTRAINT','INDEX','VIEW','TRIGGER',
    'UNIQUE','CHECK','DEFAULT','AUTO_INCREMENT',
  ]);

  const SQL_FUNCS = new Set([
    'COUNT','SUM','AVG','MIN','MAX','ROUND','FLOOR','CEIL','CEILING',
    'ABS','COALESCE','NULLIF','IFNULL','ISNULL','NVL',
    'UPPER','LOWER','LENGTH','SUBSTR','SUBSTRING','TRIM','LTRIM','RTRIM',
    'REPLACE','CONCAT','CONCAT_WS','LEFT','RIGHT','LPAD','RPAD','REPEAT',
    'NOW','CURDATE','CURTIME','DATE','TIME','YEAR','MONTH','DAY',
    'HOUR','MINUTE','SECOND','DATEDIFF','DATE_FORMAT','STRFTIME',
    'CAST','CONVERT','STR_TO_DATE','TO_CHAR','TO_DATE',
    'ROW_NUMBER','RANK','DENSE_RANK','LAG','LEAD','FIRST_VALUE','LAST_VALUE',
    'OVER','PARTITION',
  ]);

  const SQL_TYPES = new Set([
    'INTEGER','INT','BIGINT','SMALLINT','TINYINT','DECIMAL','NUMERIC',
    'FLOAT','REAL','DOUBLE','CHAR','VARCHAR','TEXT','BLOB','CLOB',
    'DATE','TIME','DATETIME','TIMESTAMP','BOOLEAN','BOOL','BIT',
    'BINARY','VARBINARY','JSON','UUID',
  ]);

  function sql(code) {
    let out = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      // ── Line comment ──────────────────────────────────────────
      if (code.slice(i, i+2) === '--') {
        let j = i;
        while (j < n && code[j] !== '\n') j++;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── Block comment ─────────────────────────────────────────
      if (code.slice(i, i+2) === '/*') {
        const end = code.indexOf('*/', i+2);
        const j = end < 0 ? n : end + 2;
        out += `<span class="hl-cmt">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── String ────────────────────────────────────────────────
      if (code[i] === "'" || code[i] === '"') {
        const q = code[i];
        let j = i + 1;
        while (j < n && code[j] !== q) {
          if (code[j] === '\\') j++;
          j++;
        }
        j++;
        out += `<span class="hl-str">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── Number ────────────────────────────────────────────────
      if (/[0-9]/.test(code[i]) || (code[i] === '.' && /[0-9]/.test(code[i+1]||''))) {
        let j = i;
        while (j < n && /[0-9.eE+-]/.test(code[j])) j++;
        out += `<span class="hl-num">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── Identifier / keyword ──────────────────────────────────
      if (/[a-zA-Z_]/.test(code[i])) {
        let j = i;
        while (j < n && /[\w]/.test(code[j])) j++;
        const w   = code.slice(i, j);
        const wUp = w.toUpperCase();
        let cls;
        if (SQL_KW.has(wUp))     cls = 'sql-kw';
        else if (SQL_FUNCS.has(wUp))  cls = 'sql-fn';
        else if (SQL_TYPES.has(wUp))  cls = 'sql-type';
        else                     cls = 'sql-id';
        out += `<span class="hl-${cls}">${esc(w)}</span>`;
        i = j; continue;
      }
      // ── Backtick-quoted identifier ────────────────────────────
      if (code[i] === '`') {
        let j = i + 1;
        while (j < n && code[j] !== '`') j++;
        j++;
        out += `<span class="hl-sql-id">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // ── Punctuation / operators ───────────────────────────────
      if (/[().,;*=<>!]/.test(code[i])) {
        out += `<span class="hl-op">${esc(code[i])}</span>`;
        i++; continue;
      }
      out += esc(code[i]); i++;
    }
    return out;
  }

  // ── Helper ─────────────────────────────────────────────────
  function ch(code, idx) { return code[idx] || ''; }

  return { python, html, css, sql };
});

// ─── js/graders/python.js ───────────────────────────
/**
 * graders/python.js — Python Grader Engine v2
 * ═══════════════════════════════════════════════════════════════
 * Mode 1: tc[] (test cases) → Pyodide output-based grading
 * Mode 2: rb[] (rubric)     → keyword matching (fallback)
 *
 * tc format: [{ input:"5\n10", expected:"15", pts:2, desc:"..." }]
 * rb format: [{ kw:"print", pts:3, desc:"..." }]
 */
'use strict';

CL.define('Graders.Python', () => {

  const cfg      = CL.require('Config');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');

  // ── Pyodide Worker ───────────────────────────────────────────
  let _worker = null, _workerReady = false, _pendingCbs = {}, _callId = 0;

  function _getWorker() {
    if (_worker) return _worker;
    try {
      _worker = new Worker('js/runtime/pyodide-worker.js');
      _worker.onmessage = (e) => {
        const msg = e.data;
        if (msg.type === 'ready') {
          _workerReady = true;
          const cb = _pendingCbs['__load'];
          if (cb) { delete _pendingCbs['__load']; cb(null); }
        } else if (msg.type === 'error') {
          const cb = _pendingCbs['__load'];
          if (cb) { delete _pendingCbs['__load']; cb(msg.message); }
          _worker = null; _workerReady = false;
        } else if (msg.type === 'result') {
          const cb = _pendingCbs[msg.id];
          if (cb) { delete _pendingCbs[msg.id]; cb(msg); }
        }
      };
      _worker.onerror = () => { _worker = null; _workerReady = false; };
    } catch(e) { console.warn('[Graders.Python] Worker error:', e.message); }
    return _worker;
  }

  function _ensureWorkerReady() {
    return new Promise((resolve, reject) => {
      const w = _getWorker();
      if (!w) { reject(new Error('Worker không khả dụng')); return; }
      if (_workerReady) { resolve(); return; }
      _pendingCbs['__load'] = (err) => err ? reject(new Error(err)) : resolve();
      w.postMessage({ type: 'load' });
    });
  }

  function _runCode(code, inputs, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const w = _getWorker();
      if (!w) { reject(new Error('Worker không khả dụng')); return; }
      const id = ++_callId;
      _pendingCbs[id] = resolve;
      w.postMessage({ type: 'run', id, code, inputs, timeout });
    });
  }

  // ── Main grade ───────────────────────────────────────────────
  async function grade(code, legacyOutput, exerciseId) {
    const ex = Registry.findById(exerciseId);
    if (!ex) throw new Error(`Không tìm thấy bài tập: ${exerciseId}`);

    const result = ex.tc && ex.tc.length > 0
      ? await _gradeTestCases(code, ex)
      : _gradeRubric(code, legacyOutput, ex);

    Events.emit('grade:complete', result);
    return result;
  }

  // ── Test case grading (Pyodide) ──────────────────────────────
  async function _gradeTestCases(code, ex) {
    let useWorker = true;
    try {
      await Promise.race([
        _ensureWorkerReady(),
        new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 8000))
      ]);
    } catch(e) { useWorker = false; }

    const tc = ex.tc;
    let totalPts = 0, earnedPts = 0, passed = 0;
    const results = [];

    for (let i = 0; i < tc.length; i++) {
      const t    = tc[i];
      const pts  = parseInt(t.pts) || 1;
      totalPts  += pts;
      const inputLines = (t.input || '').replace(/\\n/g,'\n').split('\n').filter(Boolean);
      let actual = '', error = '', ok = true;

      if (useWorker) {
        try {
          const res = await Promise.race([
            _runCode(code, inputLines),
            new Promise(r => setTimeout(() => r({ ok:false, stdout:'', stderr:'TLE' }), 6000))
          ]);
          actual = (res.stdout || '').trimEnd();
          error  = res.ok ? '' : (res.stderr || '');
          ok     = res.ok;
        } catch(e) { error = e.message; ok = false; }
      } else {
        const r = _runPyInterp(code, inputLines);
        actual = r.stdout.trimEnd(); error = r.error; ok = !r.error;
      }

      const expected = (t.expected || '').trimEnd();
      const pass     = ok && _matches(actual, expected);
      if (pass) { passed++; earnedPts += pts; }

      results.push({
        desc: t.desc || `Test ${i+1}`, pts,
        earned: pass ? pts : 0, passed: pass,
        input: t.input || '', expected, actual, error,
        hint: t.hint || '',
      });
    }

    const score = totalPts > 0 ? Math.round((earnedPts / totalPts) * 10 * 10) / 10 : 0;
    return {
      mode: 'testcase', score, results,
      total: totalPts, earned: earnedPts,
      passedTests: passed, totalTests: tc.length,
      exercise: ex, showSolution: score < cfg.GRADE.SHOW_SOLUTION_BELOW && ex.solution,
    };
  }

  function _matches(actual, expected) {
    if (actual === expected) return true;
    const norm = s => s.trim().split('\n').map(l => l.trim()).join('\n');
    if (norm(actual) === norm(expected)) return true;
    const af = parseFloat(actual), ef = parseFloat(expected);
    if (!isNaN(af) && !isNaN(ef) && Math.abs(af - ef) <= cfg.GRADE.FLOAT_TOLERANCE) return true;
    return false;
  }

  function _runPyInterp(code, inputLines) {
    if (typeof PyInterp === 'undefined') return { stdout:'', error:'PyInterp không khả dụng' };
    let stdout = '', error = '', inputIdx = 0;
    try {
      const toks = PyInterp.tokenize(code);
      const ast  = new PyInterp.Parser(toks).parse();
      const interp = new PyInterp.Interp(
        (t) => { stdout += t; },
        ()  => inputIdx < inputLines.length ? inputLines[inputIdx++] : ''
      );
      const r = interp.run(ast);
      if (r && r.e) error = r.e.toString();
    } catch(e) { error = e instanceof PyInterp?.PyErr ? e.toString() : (e.message || String(e)); }
    return { stdout, error };
  }

  // ── Rubric grading (legacy) ───────────────────────────────────
  function _gradeRubric(code, output, ex) {
    const rb = ex.rb || [];
    if (!rb.length) throw new Error('Bài này chưa có tiêu chí chấm (rb[])');

    const results = rb.map(c => {
      const passed = _checkKw(code, output, c.kw || '');
      return { ...c, passed, earned: passed ? (parseInt(c.pts) || 0) : 0 };
    });

    const total  = rb.reduce((s,r) => s + (parseInt(r.pts)||0), 0);
    const earned = results.reduce((s,r) => s + r.earned, 0);
    const score  = total > 0 ? Math.round((earned/total)*10*10)/10 : 0;
    return {
      mode: 'rubric', score, results, total, earned, exercise: ex,
      showSolution: score < cfg.GRADE.SHOW_SOLUTION_BELOW && ex.solution,
    };
  }

  function _checkKw(code, output, kw) {
    if (!kw) return true;
    if (/^-?\d+\.?\d*$/.test(kw)) {
      const tol  = cfg.GRADE.FLOAT_TOLERANCE;
      return (output.match(/-?\d+\.?\d*/g)||[]).map(Number).some(n => Math.abs(n - parseFloat(kw)) <= tol);
    }
    const text = (code + '\n' + output).toLowerCase();
    const k    = kw.toLowerCase();
    const idx  = text.indexOf(k);
    if (idx < 0) return false;
    const after = text[idx + k.length] || '';
    if (/\d/.test(after) && /\d$/.test(k)) return false;
    return true;
  }

  window._gradePython = (code, output, exId) => grade(code, output, exId);

  return { grade };
});

// ─── js/graders/html.js ───────────────────────────
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

// ─── js/graders/sql.js ───────────────────────────
/**
 * graders/sql.js — SQL Grader Engine v2
 * ═══════════════════════════════════════════════════════════════
 * Dùng sql.js (SQLite WebAssembly) chạy query thật trong browser.
 *
 * - Khởi tạo DB ảo từ sample_db (CREATE TABLE + INSERT)
 * - Chạy câu query của học sinh + câu query mẫu (solution)
 * - So sánh kết quả (columns + rows), bỏ qua thứ tự nếu không có ORDER BY
 * - Fallback về rubric keyword matching nếu sql.js không load được
 */
'use strict';

CL.define('Graders.Sql', () => {

  const cfg      = CL.require('Config');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');

  // ── sql.js Worker ────────────────────────────────────────────
  let _worker = null, _workerReady = false, _pendingCbs = {}, _callId = 0;

  function _getWorker() {
    if (_worker) return _worker;
    try {
      _worker = new Worker('js/runtime/sqljs-worker.js');
      _worker.onmessage = (e) => {
        const msg = e.data;
        if (msg.type === 'ready') {
          _workerReady = true;
          const cb = _pendingCbs['__load'];
          if (cb) { delete _pendingCbs['__load']; cb(null); }
        } else if (msg.type === 'error') {
          const cb = _pendingCbs['__load'];
          if (cb) { delete _pendingCbs['__load']; cb(msg.message); }
          _worker = null; _workerReady = false;
        } else if (msg.type === 'result') {
          const cb = _pendingCbs[msg.id];
          if (cb) { delete _pendingCbs[msg.id]; cb(msg); }
        }
      };
      _worker.onerror = () => { _worker = null; _workerReady = false; };
    } catch(e) { console.warn('[Graders.Sql] Worker error:', e.message); }
    return _worker;
  }

  function _ensureWorker() {
    return new Promise((resolve, reject) => {
      const w = _getWorker();
      if (!w) { reject(new Error('Worker không khả dụng')); return; }
      if (_workerReady) { resolve(); return; }
      _pendingCbs['__load'] = (err) => err ? reject(new Error(err)) : resolve();
      w.postMessage({ type: 'load' });
    });
  }

  function _execQuery(initSql, query) {
    return new Promise((resolve, reject) => {
      const w = _getWorker();
      if (!w) { reject(new Error('Worker không khả dụng')); return; }
      const id = ++_callId;
      _pendingCbs[id] = resolve;
      w.postMessage({ type: 'exec', id, initSql, query });
    });
  }

  // ── Main grade ───────────────────────────────────────────────
  async function grade(code, exerciseId) {
    const ex = Registry.findById(exerciseId);
    if (!ex) throw new Error(`Không tìm thấy bài tập: ${exerciseId}`);

    // Try real SQL execution if solution exists
    if (ex.solution && ex.sample_db) {
      try {
        const result = await _gradeRealSql(code.trim(), ex);
        Events.emit('grade:complete', result);
        return result;
      } catch(e) {
        console.warn('[Graders.Sql] Real SQL failed, falling back to rubric:', e.message);
      }
    }

    // Fallback: rubric
    const result = _gradeRubric(code, ex);
    Events.emit('grade:complete', result);
    return result;
  }

  // ── Real SQL execution ────────────────────────────────────────
  async function _gradeRealSql(studentQuery, ex) {
    // Load worker (timeout 6s)
    await Promise.race([
      _ensureWorker(),
      new Promise((_, r) => setTimeout(() => r(new Error('Timeout load sql.js')), 6000))
    ]);

    const initSql = ex.sample_db || '';

    // Run expected (solution) query
    let expectedResult, studentResult;
    try {
      expectedResult = await _execQuery(initSql, ex.solution);
    } catch(e) {
      throw new Error('Lỗi chạy query mẫu: ' + e.message);
    }

    // Run student query
    studentResult = await _execQuery(initSql, studentQuery);

    if (studentResult.error) {
      const result = {
        mode: 'sql-real', score: 0, passed: false,
        exercise: ex,
        syntaxError: studentResult.error,
        expectedColumns: expectedResult.columns || [],
        expectedRows:    expectedResult.rows    || [],
        studentColumns:  [],
        studentRows:     [],
        results: [{ desc: 'Cú pháp SQL', passed: false, earned: 0, pts: 10,
                    hint: studentResult.error }],
        total: 10, earned: 0,
      };
      return result;
    }

    // Compare results
    const expCols = expectedResult.columns || [];
    const expRows = expectedResult.rows    || [];
    const stuCols = studentResult.columns  || [];
    const stuRows = studentResult.rows     || [];

    const colsMatch = _colsMatch(expCols, stuCols);
    const rowsMatch = _rowsMatch(expRows, stuRows, studentQuery);

    const correct = colsMatch && rowsMatch;
    const score   = correct ? 10 : (colsMatch ? 4 : 0);

    const results = [];
    results.push({
      desc: 'Tên cột (columns) đúng',
      passed: colsMatch,
      earned: colsMatch ? 4 : 0,
      pts: 4,
      hint: colsMatch ? '' : `Mong đợi: [${expCols.join(', ')}]\nNhận được: [${stuCols.join(', ')}]`,
    });
    results.push({
      desc: 'Dữ liệu (rows) đúng',
      passed: rowsMatch,
      earned: rowsMatch ? 6 : 0,
      pts: 6,
      hint: rowsMatch ? '' : `Số dòng mong đợi: ${expRows.length}, nhận được: ${stuRows.length}`,
    });

    return {
      mode: 'sql-real', score, passed: correct,
      exercise: ex,
      expectedColumns: expCols, expectedRows: expRows,
      studentColumns: stuCols,  studentRows:  stuRows,
      results, total: 10, earned: score,
      showSolution: score < cfg.GRADE.SHOW_SOLUTION_BELOW && ex.solution,
    };
  }

  function _colsMatch(expected, actual) {
    if (expected.length !== actual.length) return false;
    const e = expected.map(c => c.toLowerCase().trim());
    const a = actual.map(c => c.toLowerCase().trim());
    return e.every((col, i) => col === a[i]);
  }

  function _rowsMatch(expected, actual, query) {
    if (expected.length !== actual.length) return false;
    // If no ORDER BY in student query, sort both before comparing
    const hasOrder = /\bORDER\s+BY\b/i.test(query);
    const norm = row => row.map(v => v === null ? 'NULL' : String(v).trim());
    const e = expected.map(norm);
    const a = actual.map(norm);
    if (hasOrder) {
      return e.every((row, i) => row.every((v, j) => v === a[i]?.[j]));
    } else {
      // Sort both for comparison
      const sort = arr => [...arr].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
      const es = sort(e), as = sort(a);
      return es.every((row, i) => row.every((v, j) => v === as[i]?.[j]));
    }
  }

  // ── Rubric fallback ───────────────────────────────────────────
  function _gradeRubric(code, ex) {
    const rb = ex.rb || [];
    if (!rb.length) throw new Error('Bài này chưa có tiêu chí chấm');

    const results = rb.map(c => {
      const passed = _checkKw(code, c.kw || '');
      return { ...c, passed, earned: passed ? (parseInt(c.pts)||0) : 0 };
    });
    const total  = rb.reduce((s,r) => s + (parseInt(r.pts)||0), 0);
    const earned = results.reduce((s,r) => s + r.earned, 0);
    const score  = total > 0 ? Math.round((earned/total)*100)/10 : 0;
    return { mode: 'rubric', score, results, total, earned, exercise: ex };
  }

  function _checkKw(code, kw) {
    if (!kw) return true;
    const clean = code.toLowerCase().replace(/--[^\n]*/g,'').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ');
    const k = kw.toLowerCase().replace(/\s+/g,' ');
    return clean.includes(k) || clean.replace(/\s/g,'').includes(k.replace(/\s/g,''));
  }

  return { grade };
});

// ─── js/editors/python.js ───────────────────────────
/**
 * editors/python.js — Python Code Editor
 * ═══════════════════════════════════════════════════════════════
 * Trách nhiệm:
 *   - Textarea + syntax highlight overlay
 *   - Line numbers
 *   - Mobile keyboard toolbar (Python shortcuts)
 *   - Tab / indent / dedent
 *   - Run code (→ interpreter.js)
 *
 * KHÔNG chứa: grading logic (→ Graders.Python)
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, core/utils.js
 */

'use strict';

CL.define('Editors.Python', () => {

  const Events = CL.require('Events');

  // ── Syntax highlighter ────────────────────────────────────────

  const KW = new Set([
    'False','None','True','and','as','assert','async','await',
    'break','class','continue','def','del','elif','else','except',
    'finally','for','from','global','if','import','in','is',
    'lambda','not','or','pass','raise','return','try','while',
    'with','yield',
  ]);
  const BUILTINS = new Set([
    'abs','all','any','bin','bool','chr','dict','dir','divmod',
    'enumerate','eval','filter','float','format','frozenset','getattr',
    'globals','hasattr','hash','help','hex','id','input','int','isinstance',
    'issubclass','iter','len','list','locals','map','max','min','next',
    'object','oct','open','ord','pow','print','property','range','repr',
    'reversed','round','set','setattr','slice','sorted','staticmethod',
    'str','sum','super','tuple','type','vars','zip',
  ]);

  function highlight(code) {
    // Use VSCode Dark+ accurate highlighter
    if (typeof CL !== 'undefined' && CL.Editors?.Syntax?.python) {
      return CL.Editors.Syntax.python(code);
    }
    const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    let result = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      // String
      if ((code[i] === '"' || code[i] === "'")) {
        const q = code[i];
        const triple = code.slice(i, i+3) === q.repeat(3);
        const delim  = triple ? q.repeat(3) : q;
        let j = i + delim.length;
        while (j < n) {
          if (code[j] === '\\') { j += 2; continue; }
          if (code.slice(j, j + delim.length) === delim) { j += delim.length; break; }
          j++;
        }
        result += `<span class="hl-str">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // Comment
      if (code[i] === '#') {
        const eol = code.indexOf('\n', i);
        const end = eol < 0 ? n : eol;
        result += `<span class="hl-cmt">${esc(code.slice(i, end))}</span>`;
        i = end; continue;
      }
      // Number
      if (/\d/.test(code[i]) || (code[i] === '.' && /\d/.test(code[i+1]||''))) {
        let j = i;
        while (j < n && /[\d.eExXoObB_]/.test(code[j])) j++;
        result += `<span class="hl-num">${esc(code.slice(i, j))}</span>`;
        i = j; continue;
      }
      // Word
      if (/[a-zA-Z_]/.test(code[i])) {
        let j = i;
        while (j < n && /\w/.test(code[j])) j++;
        const w = code.slice(i, j);
        if (KW.has(w)) result += `<span class="hl-kw">${w}</span>`;
        else if (BUILTINS.has(w)) result += `<span class="hl-bi">${w}</span>`;
        else result += esc(w);
        i = j; continue;
      }
      result += esc(code[i]);
      i++;
    }
    return result;
  }

  // ── Editor functions ──────────────────────────────────────────

  function updateHighlight() {
    const ta  = document.getElementById('code-input');
    const hl  = document.getElementById('hl-overlay');
    if (!ta || !hl) return;
    hl.innerHTML = highlight(ta.value) + '\n';
    _syncScroll(ta, hl);
  }

  function _syncScroll(ta, hl) {
    hl.scrollTop  = ta.scrollTop;
    hl.scrollLeft = ta.scrollLeft;
  }

  function updateLineNumbers() {
    const ta = document.getElementById('code-input');
    const ln = document.getElementById('line-numbers');
    if (!ta || !ln) return;
    const count = ta.value.split('\n').length;
    ln.innerHTML = Array.from({ length: count }, (_, i) => i + 1).join('\n');
    ln.scrollTop = ta.scrollTop;
  }

  // ── Tab key handler ───────────────────────────────────────────

  function handleTab(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const ta    = e.target;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const INDENT = '    '; // 4 spaces

    if (start === end) {
      // No selection: insert indent
      ta.value = ta.value.slice(0, start) + INDENT + ta.value.slice(end);
      ta.selectionStart = ta.selectionEnd = start + INDENT.length;
    } else {
      // Multi-line selection: indent/dedent block
      const lines = ta.value.split('\n');
      let cs = 0, sel_start_line = 0, sel_end_line = 0;
      for (let i = 0; i < lines.length; i++) {
        if (cs + lines[i].length + 1 > start && sel_start_line === 0) sel_start_line = i;
        if (cs + lines[i].length + 1 > end) { sel_end_line = i; break; }
        if (i === lines.length - 1) sel_end_line = i;
        cs += lines[i].length + 1;
      }
      if (e.shiftKey) {
        for (let i = sel_start_line; i <= sel_end_line; i++) {
          if (lines[i].startsWith(INDENT)) lines[i] = lines[i].slice(INDENT.length);
          else if (lines[i].startsWith(' ')) lines[i] = lines[i].replace(/^ +/, '');
        }
      } else {
        for (let i = sel_start_line; i <= sel_end_line; i++) lines[i] = INDENT + lines[i];
      }
      ta.value = lines.join('\n');
    }
    updateHighlight();
    updateLineNumbers();
  }

  // ── Mobile toolbar helpers ────────────────────────────────────

  function insertText(text) {
    const ta    = document.getElementById('code-input');
    if (!ta) return;
    const start = ta.selectionStart;
    ta.value = ta.value.slice(0, start) + text + ta.value.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = start + text.length;
    ta.focus();
    updateHighlight();
    updateLineNumbers();
  }

  function indent() {
    const ta = document.getElementById('code-input');
    if (!ta) return;
    const lines  = ta.value.split('\n');
    const curLine = ta.value.slice(0, ta.selectionStart).split('\n').length - 1;
    if (lines[curLine] !== undefined) {
      const pos = ta.selectionStart - lines.slice(0, curLine).join('\n').length - (curLine > 0 ? 1 : 0);
      lines[curLine] = '    ' + lines[curLine];
      ta.value = lines.join('\n');
      ta.selectionStart = ta.selectionEnd = ta.selectionStart + 4;
    }
    updateHighlight();
  }

  function dedent() {
    const ta = document.getElementById('code-input');
    if (!ta) return;
    const lines   = ta.value.split('\n');
    const curLine = ta.value.slice(0, ta.selectionStart).split('\n').length - 1;
    if (lines[curLine]?.startsWith('    ')) {
      lines[curLine] = lines[curLine].slice(4);
      ta.value = lines.join('\n');
      ta.selectionStart = ta.selectionEnd = Math.max(0, ta.selectionStart - 4);
    }
    updateHighlight();
  }

  // ── Get / set code ────────────────────────────────────────────

  function getCode() {
    return document.getElementById('code-input')?.value || '';
  }

  function setCode(code) {
    const ta = document.getElementById('code-input');
    if (ta) {
      ta.value = code;
      updateHighlight();
      updateLineNumbers();
    }
  }

  function clear() { setCode(''); }

  // ── Backward compat globals ───────────────────────────────────
  window.updateHighlight   = updateHighlight;
  window.updLN             = updateLineNumbers;
  window.mkInsert          = text => () => insertText(text);
  window.mkIndent          = () => indent;
  window.mkDedent          = () => dedent;

  return { highlight, updateHighlight, updateLineNumbers, handleTab,
           insertText, indent, dedent, getCode, setCode, clear };
});

// ─── js/editors/html.js ───────────────────────────
/**
 * editors/html.js — HTML/CSS Editor với Live Preview
 * ═══════════════════════════════════════════════════════════════
 * Kích hoạt khi exercise.type === 'html'
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, exercises/registry.js
 */

'use strict';

CL.define('Editors.Html', () => {

  const cfg      = CL.require('Config');
  const Utils    = CL.require('Utils');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');
  const Store    = CL.require('Store');

  let _container = null;
  let _iframe    = null;
  let _timer     = null;

  const STARTER = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bài làm</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
  </style>
</head>
<body>
  <!-- Viết HTML của bạn tại đây -->
  <h1>Xin chào!</h1>
</body>
</html>`;

  const SNIPPETS = {
    basic:  `<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <title>Tiêu đề</title>\n  <style>\n    body { font-family: Arial; padding: 16px; }\n  </style>\n</head>\n<body>\n  <h1>Tiêu đề</h1>\n  <p>Nội dung</p>\n</body>\n</html>`,
    css:    `<style>\n  /* CSS của bạn */\n  body { font-family: Arial; margin: 0; padding: 16px; }\n  h1 { color: #2196F3; }\n</style>`,
    table:  `<table border="1" style="border-collapse:collapse;width:100%">\n  <thead><tr><th>Tiêu đề 1</th><th>Tiêu đề 2</th></tr></thead>\n  <tbody><tr><td>Dữ liệu 1</td><td>Dữ liệu 2</td></tr></tbody>\n</table>`,
    form:   `<form action="#" method="post">\n  <label for="ten">Họ tên:</label>\n  <input type="text" id="ten" name="ten" placeholder="Nhập họ tên">\n  <br><br>\n  <button type="submit">Gửi</button>\n</form>`,
  };

  // ── Mount ─────────────────────────────────────────────────────

  function mount(exercise) {
    const ws = document.getElementById('editor-panel') || document.getElementById('workspace');
    if (!ws) return;
    _container = ws;
    ws.dataset.mode = 'html';

    // Hide Python editor elements
    const pyWrap = ws.querySelector('.editor-wrap');
    const pyBar  = ws.querySelector('.toolbar');
    const pyKeys = ws.querySelector('.mob-keys');
    const pyRs   = ws.querySelector('#rs-row');
    if (pyWrap) pyWrap.style.display = 'none';
    if (pyBar)  pyBar.style.display  = 'none';
    if (pyKeys) pyKeys.style.display = 'none';
    if (pyRs)   pyRs.style.display   = 'none';

    // Remove old html editor if exists
    ws.querySelector('.html-editor-split')?.remove();
    ws.querySelector('.html-action-bar')?.remove();

    // Inject HTML editor
    const _div = document.createElement('div');
    _div.id = 'html-editor-root';
    _div.style.cssText = 'flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:0';
    _div.innerHTML = `
      <div class="html-editor-split">
        <div class="html-editor-left">
          <div class="html-editor-toolbar">
            <div class="htm-tools-left">
              <span class="htm-lang-badge">HTML/CSS</span>
              <button class="htm-btn" onclick="CL.Editors.Html.insertSnippet('basic')">📄 HTML</button>
              <button class="htm-btn" onclick="CL.Editors.Html.insertSnippet('css')">🎨 CSS</button>
              <button class="htm-btn" onclick="CL.Editors.Html.insertSnippet('table')">📊 Bảng</button>
              <button class="htm-btn" onclick="CL.Editors.Html.insertSnippet('form')">📝 Form</button>
            </div>
            <div class="htm-tools-right">
              <button class="htm-btn active" onclick="CL.Editors.Html.runPreview()">▶ Preview</button>
            </div>
          </div>
          <div class="html-editor-wrap" style="position:relative;flex:1;overflow:hidden">
            <div class="html-hl-overlay" id="html-hl-overlay"></div>
            <textarea id="html-code-input" class="html-code-area"
              placeholder="Viết HTML và CSS tại đây..."
              spellcheck="false" autocomplete="off"
              onkeydown="CL.Editors.Html.handleKey(event)"
              onscroll="CL.Editors.Html.syncScroll()"
              oninput="CL.Editors.Html.onInput()"></textarea>
          </div>
        </div>
        <div class="html-editor-right">
          <div class="html-preview-toolbar">
            <span class="html-preview-label">👁 Preview</span>
            <div class="html-preview-size">
              <button class="htm-size-btn active" onclick="CL.Editors.Html.setSize('full')">⬜</button>
              <button class="htm-size-btn" onclick="CL.Editors.Html.setSize('tablet')">📱</button>
              <button class="htm-size-btn" onclick="CL.Editors.Html.setSize('mobile')">📲</button>
            </div>
            <button class="htm-btn" onclick="CL.Editors.Html.openFullscreen()">↗</button>
          </div>
          <div class="html-preview-wrap" id="html-preview-wrap">
            <iframe id="html-preview" sandbox="allow-same-origin allow-scripts"
              style="width:100%;height:100%;border:none;background:#fff"></iframe>
          </div>
        </div>
      </div>
      <div class="html-action-bar">
        <button class="btn primary" onclick="CL.Editors.Html.runPreview()">▶ Chạy</button>
        <button class="btn success" onclick="gradeHTML()">📊 Chấm điểm</button>
        <button class="btn" onclick="CL.Editors.Html.reset()">🔄 Reset</button>
      </div>`;

    ws.appendChild(_div);   // ← gắn vào DOM trước khi query elements
    _iframe = document.getElementById('html-preview');
    const saved = _load(exercise.id);
    document.getElementById('html-code-input').value = saved || STARTER;
    document.addEventListener('keydown', _onKeydown);
    setTimeout(updateHtmlHighlight, 50);   // render colors on first load
    runPreview();
  }

  function unmount() {
    if (!_container) return;
    _container.dataset.mode = '';
    // Remove HTML editor elements
    document.getElementById('html-editor-root')?.remove();
    // Restore Python editor elements
    const ws = _container;
    ws.querySelector('.editor-wrap')?.style.removeProperty('display');
    ws.querySelector('.toolbar')?.style.removeProperty('display');
    ws.querySelector('.mob-keys')?.style.removeProperty('display');
    ws.querySelector('#rs-row')?.style.removeProperty('display');
    _container = null;
    _iframe    = null;
    document.removeEventListener('keydown', _onKeydown);
  }

  // ── Preview ───────────────────────────────────────────────────

  function updateHtmlHighlight() {
    const ta = document.getElementById('html-code-input');
    const ov = document.getElementById('html-hl-overlay');
    if (!ta || !ov) return;
    const Syn = typeof CL !== 'undefined' && CL.Editors?.Syntax;
    ov.innerHTML = Syn ? Syn.html(ta.value) + '\n' : ta.value;
    syncScroll();
  }

  function syncScroll() {
    const ta = document.getElementById('html-code-input');
    const ov = document.getElementById('html-hl-overlay');
    if (ta && ov) { ov.scrollTop = ta.scrollTop; ov.scrollLeft = ta.scrollLeft; }
  }

  function onInput() {
    schedulePreview();
    clearTimeout(_hlTimer);
    _hlTimer = setTimeout(updateHtmlHighlight, 30);
  }
  let _hlTimer = null;

  function schedulePreview() {
    clearTimeout(_timer);
    _timer = setTimeout(runPreview, 600);
  }

  function runPreview() {
    const ta = document.getElementById('html-code-input');
    if (!ta || !_iframe) return;
    _save(Store.get('currentExId'), ta.value);
    try {
      const doc = _iframe.contentDocument || _iframe.contentWindow.document;
      doc.open(); doc.write(ta.value); doc.close();
    } catch { _iframe.srcdoc = ta.value; }
  }

  function _onKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault(); runPreview();
    }
  }

  // ── Size presets ──────────────────────────────────────────────

  function setSize(size) {
    const wrap = document.getElementById('html-preview-wrap');
    if (!wrap) return;
    const w = { full: '100%', tablet: '768px', mobile: '375px' };
    wrap.style.maxWidth = w[size] || '100%';
    wrap.style.margin   = size === 'full' ? '0' : '0 auto';
    document.querySelectorAll('.htm-size-btn').forEach(b => b.classList.remove('active'));
    event?.target?.classList.add('active');
  }

  // ── Snippets ──────────────────────────────────────────────────

  function insertSnippet(key) {
    const ta = document.getElementById('html-code-input');
    if (!ta || !SNIPPETS[key]) return;
    const s = ta.selectionStart;
    ta.value = ta.value.slice(0, s) + SNIPPETS[key] + ta.value.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = s + SNIPPETS[key].length;
    ta.focus(); schedulePreview();
  }

  function handleKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const s  = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 2;
      schedulePreview();
    }
  }

  // ── Helpers ───────────────────────────────────────────────────

  function reset() {
    if (!confirm('Reset về code mặc định?')) return;
    const ta = document.getElementById('html-code-input');
    if (ta) { ta.value = STARTER; runPreview(); }
  }

  function openFullscreen() {
    const ta = document.getElementById('html-code-input');
    if (!ta) return;
    const w = window.open('', '_blank');
    w.document.write(ta.value); w.document.close();
  }

  function getCode() {
    return document.getElementById('html-code-input')?.value || '';
  }

  function applyCode(code) {
    const ta = document.getElementById('html-code-input');
    if (ta) { ta.value = code; runPreview(); }
  }

  function _save(id, code) {
    if (id) try { localStorage.setItem(cfg.LS.HTML_CODE + id, code); } catch {}
  }
  function _load(id) {
    try { return localStorage.getItem(cfg.LS.HTML_CODE + id); } catch { return null; }
  }

  // Backward compat
  window.HTMLEditor = { mount, unmount, runPreview, schedulePreview, getCode, insertSnippet, handleKey, reset, openFullscreen, setPreviewSize: setSize };

  return { mount, unmount, runPreview, schedulePreview, getCode, applyCode,
           insertSnippet, handleKey, reset, openFullscreen, setSize };
});

// ─── js/editors/sql.js ───────────────────────────
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
    const ws = document.getElementById('editor-panel') || document.getElementById('workspace');
    if (!ws) return;
    _container = ws;
    ws.dataset.mode = 'sql';

    // Hide Python elements, inject SQL editor
    ws.querySelector('.editor-wrap')?.style.setProperty('display','none');
    ws.querySelector('.toolbar')?.style.setProperty('display','none');
    ws.querySelector('.mob-keys')?.style.setProperty('display','none');
    ws.querySelector('#rs-row')?.style.setProperty('display','none');
    document.getElementById('sql-editor-root')?.remove();
    const _sdiv = document.createElement('div');
    _sdiv.id = 'sql-editor-root';
    _sdiv.style.cssText = 'flex:1;display:flex;overflow:hidden;min-height:0;position:relative';
    _sdiv.innerHTML = `
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

    ws.appendChild(_sdiv);   // ← gắn vào DOM trước khi query elements
    const saved = _load(exercise.id);
    document.getElementById('sql-input').value = saved || _starterCode(exercise);
    document.addEventListener('keydown', _onKeydown);

    await _loadDb(exercise.sample_db || '');
    _renderSchema();
    setTimeout(_updateHighlight, 50);   // render colors on first load
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

// ─── js/ui/dropdown.js ───────────────────────────
/**
 * ui/dropdown.js — Custom Dropdown Component (CDD)
 * ═══════════════════════════════════════════════════════════════
 * Dropdown 3 cấp: Lớp → Chủ đề → Bài tập
 * Tách khỏi app.js để dễ maintain và test.
 *
 * Public API:
 *   CL.UI.Dropdown.init()          Khởi tạo sau khi DOM sẵn sàng
 *   CL.UI.Dropdown.reset()         Reset về trạng thái ban đầu
 *   CL.UI.Dropdown.setLocked(id, locked)
 *
 * Events phát ra:
 *   'exercise:selected'  { exercise }   Khi chọn bài tập
 *   'exercise:cleared'   {}             Khi bỏ chọn
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js, core/config.js, core/events.js,
 *           exercises/registry.js
 */

'use strict';

CL.define('UI.Dropdown', () => {

  const cfg      = CL.require('Config');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');
  const Utils    = CL.require('Utils');

  // ── State ─────────────────────────────────────────────────────
  let _active   = null;   // 'grade' | 'chap' | 'bloom' | 'ex'
  let _grade    = '';
  let _chapter  = '';
  let _bloom    = '';    // '' = tất cả
  let _exId     = '';

  const _items = {
    grade: cfg.GRADES.map(g => ({ value: g.value, text: g.text })),
    chap:  [],
    bloom: [],
    ex:    [],
  };

  // ── Init ──────────────────────────────────────────────────────

  function init() {
    // Đóng dropdown khi click ngoài
    document.addEventListener('click', e => {
      if (!e.target.closest('#cdd-popup') && !e.target.closest('.cdd-btn')) {
        _close();
      }
    });
  }

  // ── Open ──────────────────────────────────────────────────────

  function open(which) {
    const btn = document.getElementById(`cdd-${which}-btn`);
    if (!btn || btn.disabled) return;
    _active = which;

    const popup   = document.getElementById('cdd-popup');
    const overlay = document.getElementById('cdd-overlay');
    const title   = document.getElementById('cdd-popup-title');
    const list    = document.getElementById('cdd-popup-list');

    const labels = { grade: 'Chọn lớp / bộ sách', chap: 'Chọn chủ đề', bloom: 'Thang Bloom', ex: 'Chọn bài tập' };
    title.textContent = labels[which] || '';

    const curVal = { grade: _grade, chap: _chapter, bloom: _bloom, ex: _exId }[which];
    const items  = _items[which] || [];

    list.innerHTML = items.length
      ? items.map(it => `
          <div class="cdd-item${it.value === curVal ? ' selected' : ''}"
               data-value="${Utils.escHtml(it.value)}"
               onclick="CL.UI.Dropdown.select('${which}', this.dataset.value)">
            ${Utils.escHtml(it.text)}
          </div>`).join('')
      : '<div class="cdd-item" style="color:var(--text3);cursor:default">Không có mục nào</div>';

    // Position (desktop)
    if (window.innerWidth >= 769) {
      const rect = btn.getBoundingClientRect();
      popup.style.setProperty('--cdd-x', rect.left + 'px');
      popup.style.setProperty('--cdd-y', (rect.bottom + 4) + 'px');
      popup.style.setProperty('--cdd-w', Math.max(rect.width, 220) + 'px');
    }

    overlay.classList.add('show');
    popup.classList.add('show');
  }

  function _close() {
    _active = null;
    document.getElementById('cdd-overlay')?.classList.remove('show');
    document.getElementById('cdd-popup')?.classList.remove('show');
  }

  // ── Select ────────────────────────────────────────────────────

  function select(which, value) {
    _close();
    if (which === 'grade') _selectGrade(value);
    if (which === 'chap')  _selectChapter(value);
    if (which === 'bloom') _selectBloom(value);
    if (which === 'ex')    _selectExercise(value);
  }

  async function _selectGrade(value) {
    _grade   = value;
    _chapter = '';
    _exId    = '';

    _setLabel('grade', _items.grade.find(i => i.value === value)?.text || '— Chọn lớp —');
    _setLabel('chap',  '⏳ Đang tải...');
    _setLabel('bloom', '— Tất cả —');
    _setLabel('ex',    '— Chọn bài —');
    setLocked('chap',  true);
    setLocked('bloom', true);
    setLocked('ex',    true);

    // P2: Lazy load exercise bundle for this grade
    try {
      await Registry.ensureLoaded(value);
    } catch(e) {
      _setLabel('chap', '❌ Lỗi tải bài tập');
      console.error('[Dropdown] lazy load failed:', e.message);
      return;
    }

    // Build chapter items
    const chapters = Registry.getChapters(value);
    console.log('[Dropdown] getChapters('+value+'):', chapters.length, 'chapters');
    _items.chap = chapters.map(ch => ({ value: ch, text: ch }));

    _setLabel('chap', '— Chọn chủ đề —');
    setLocked('chap', !value || !chapters.length);
    setLocked('ex',   true);

    Events.emit('exercise:cleared', {});
  }

  function _selectChapter(value) {
    _chapter = value;
    _bloom   = '';
    _exId    = '';

    _setLabel('chap',  value || '— Chọn chủ đề —');
    _setLabel('bloom', '— Tất cả —');
    _setLabel('ex',    '— Chọn bài —');

    // Build bloom items from exercises in this chapter
    const exs = Registry.getByChapter(_grade, value);
    const bloomSet = [...new Set(exs.map(ex => ex.lv).filter(Boolean))];
    _items.bloom = bloomSet.map(b => ({ value: b, text: b }));
    _items.ex = exs.map(ex => ({
      value: ex.id,
      text:  (ex.lv ? '[' + ex.lv.split('–')[0].trim() + '] ' : '') + ex.num + ' – ' + ex.title,
    }));

    setLocked('bloom', !value || bloomSet.length === 0);
    setLocked('ex',    !value || exs.length === 0);
    Events.emit('exercise:cleared', {});
  }

  function _selectBloom(value) {
    _bloom = value;
    _exId  = '';
    const label = value
      ? _items.bloom.find(i => i.value === value)?.text || value
      : '— Tất cả —';
    _setLabel('bloom', label);
    _setLabel('ex', '— Chọn bài —');
    // Lọc lại bài tập theo bloom
    _buildExItems();
    setLocked('ex', false);
    Events.emit('exercise:cleared', {});
  }

  function _buildExItems() {
    const exs = Registry.getByChapter(_grade, _chapter);
    const filtered = _bloom ? exs.filter(ex => ex.lv === _bloom) : exs;
    _items.ex = filtered.map(ex => ({
      value: ex.id,
      text:  (ex.lv ? '[' + ex.lv.split('–')[0].trim() + '] ' : '') + ex.num + ' – ' + ex.title,
    }));
    setLocked('ex', filtered.length === 0);
  }

  function _selectExercise(id) {
    _exId = id;
    const ex = Registry.findById(id);
    if (!ex) return;

    _setLabel('ex', `${ex.num} – ${ex.title}`);
    Events.emit('exercise:selected', { exercise: ex });
  }

  // ── Helpers ───────────────────────────────────────────────────

  function setLocked(which, locked) {
    const el  = document.getElementById(`cdd-${which}`);
    const btn = document.getElementById(`cdd-${which}-btn`);
    if (!el || !btn) return;
    el.classList.toggle('cdd-locked', locked);
    btn.disabled = locked;
  }

  function _setLabel(which, text) {
    const lbl = document.getElementById(`cdd-${which}-label`);
    if (lbl) lbl.textContent = text;
  }

  function reset() {
    _grade   = '';
    _chapter = '';
    _bloom   = '';
    _exId    = '';
    _setLabel('grade', '— Chọn lớp —');
    _setLabel('chap',  '— Chọn chủ đề —');
    _setLabel('bloom', '— Tất cả —');
    _setLabel('ex',    '— Chọn bài —');
    setLocked('chap',  true);
    setLocked('bloom', true);
    setLocked('ex',    true);
    Events.emit('exercise:cleared', {});
  }

  return { init, open, select, setLocked, reset };
});

// ─── js/ui/toast.js ───────────────────────────
/**
 * ui/toast.js — Toast Notifications
 * ═══════════════════════════════════════════════════════════════
 * Hiển thị thông báo tạm thời (toast) và modal confirm.
 * Thay thế window.alert() và hàm toast() global cũ.
 *
 * Public API:
 *   CL.UI.Toast.show(msg, type?, durationMs?)
 *   CL.UI.Toast.success(msg)
 *   CL.UI.Toast.error(msg)
 *   CL.UI.Toast.warn(msg)
 *   CL.UI.Toast.confirm(msg) → Promise<boolean>
 * ═══════════════════════════════════════════════════════════════
 * @requires core/namespace.js
 */

'use strict';

CL.define('UI.Toast', () => {

  let _container = null;

  function _getContainer() {
    if (!_container) {
      _container = document.createElement('div');
      _container.id = 'cl-toast-container';
      _container.style.cssText = `
        position:fixed; bottom:24px; right:24px; z-index:99999;
        display:flex; flex-direction:column; gap:8px; align-items:flex-end;
        pointer-events:none;`;
      document.body.appendChild(_container);
    }
    return _container;
  }

  /**
   * @param {string}  msg
   * @param {'info'|'success'|'error'|'warn'} [type='info']
   * @param {number}  [durationMs=3000]
   */
  function show(msg, type = 'info', durationMs = 3000) {
    const colors = {
      info:    { bg: '#1e293b', border: '#4f9eff', icon: 'ℹ️' },
      success: { bg: '#052e16', border: '#4ade80', icon: '✅' },
      error:   { bg: '#2d0a0a', border: '#f87171', icon: '❌' },
      warn:    { bg: '#2d1f00', border: '#facc15', icon: '⚠️' },
    };
    const c = colors[type] || colors.info;

    const el = document.createElement('div');
    el.style.cssText = `
      background:${c.bg}; border:1px solid ${c.border}; border-radius:10px;
      padding:10px 16px; font-size:13px; color:#f1f5f9;
      font-family:system-ui,sans-serif; box-shadow:0 4px 20px rgba(0,0,0,.4);
      pointer-events:all; cursor:pointer; max-width:320px; line-height:1.5;
      animation: cl-toast-in .25s ease both;`;
    el.innerHTML = `${c.icon} ${msg}`;
    el.onclick = () => _remove(el);

    _getContainer().appendChild(el);
    setTimeout(() => _remove(el), durationMs);
    return el;
  }

  function _remove(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    el.style.transition = 'all .2s';
    setTimeout(() => el.remove(), 200);
  }

  function success(msg, ms) { return show(msg, 'success', ms); }
  function error(msg, ms)   { return show(msg, 'error',   ms || 5000); }
  function warn(msg, ms)    { return show(msg, 'warn',    ms); }

  /**
   * Modal confirm (thay window.confirm)
   * @param {string} msg
   * @returns {Promise<boolean>}
   */
  function confirm(msg) {
    return new Promise(resolve => {
      const ov = document.createElement('div');
      ov.style.cssText = `
        position:fixed;inset:0;z-index:100000;
        background:rgba(0,0,0,.6);backdrop-filter:blur(4px);
        display:flex;align-items:center;justify-content:center;`;
      ov.innerHTML = `
        <div style="background:#1e2433;border:1px solid #334155;border-radius:14px;
          padding:24px;max-width:360px;width:90%;font-family:system-ui,sans-serif">
          <div style="font-size:14px;color:#f1f5f9;line-height:1.6;margin-bottom:20px">${msg}</div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button id="cl-confirm-no"  style="padding:8px 18px;border:1px solid #475569;
              background:none;border-radius:8px;color:#94a3b8;cursor:pointer;font-size:13px">Hủy</button>
            <button id="cl-confirm-yes" style="padding:8px 18px;background:#4f9eff;
              border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:13px;font-weight:700">OK</button>
          </div>
        </div>`;
      document.body.appendChild(ov);

      const done = (v) => { ov.remove(); resolve(v); };
      ov.querySelector('#cl-confirm-yes').onclick = () => done(true);
      ov.querySelector('#cl-confirm-no').onclick  = () => done(false);
    });
  }

  // Inject CSS animation
  if (!document.getElementById('cl-toast-style')) {
    const s = document.createElement('style');
    s.id = 'cl-toast-style';
    s.textContent = `@keyframes cl-toast-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}`;
    document.head.appendChild(s);
  }

  // ── Backward compat: window.toast() ──────────────────────────
  window.toast = (msg, ms) => show(msg, 'info', ms);

  return { show, success, error, warn, confirm };
});

// ─── js/ui/results.js ───────────────────────────
/**
 * ui/results.js — Results Panel Renderer
 * ═══════════════════════════════════════════════════════════════
 * Hiển thị kết quả chấm điểm trong panel #grade-panel.
 * Tách khỏi grader engine để UI và logic hoàn toàn độc lập.
 *
 * Lắng nghe event 'grade:complete' → tự render.
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, ui/toast.js
 */

'use strict';

CL.define('UI.Results', () => {

  const Utils  = CL.require('Utils');
  const Events = CL.require('Events');

  /**
   * Render kết quả vào #grade-panel
   * @param {{ score, results, total, earned, exercise, showSolution? }} gradeResult
   */
  function render(gradeResult) {
    const { score, results, total, earned, exercise, showSolution } = gradeResult;
    const pct   = Utils.calcPercent(earned, total);
    const color = score >= 8 ? '#4ade80' : score >= 5 ? '#facc15' : '#f87171';

    // ── Update #tab-results content (keep tab structure) ─────
    const tabResults = document.getElementById('tab-results');
    if (tabResults) {
      tabResults.innerHTML = `
        <div class="score-box">
          <div class="ring">
            <svg width="96" height="96" viewBox="0 0 96 96">
              <defs><linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4f9eff"/>
                <stop offset="100%" stop-color="#34d399"/>
              </linearGradient></defs>
              <circle class="ring-bg" cx="48" cy="48" r="43" fill="none" stroke-width="7"/>
              <circle class="ring-fill" id="ring-fill" cx="48" cy="48" r="43" fill="none"
                stroke-width="7" stroke-linecap="round"/>
            </svg>
            <div class="ring-val" id="rv">—</div>
          </div>
          <div class="score-lbl">Điểm / 10</div>
          <div class="score-grade" id="sg" style="color:var(--text3)">Đang tính...</div>
        </div>
        <div class="stats">
          <div class="sc"><div class="sn nok" id="sp">${results.filter(r=>r.passed).length}</div><div class="sl">Đúng</div></div>
          <div class="sc"><div class="sn ner" id="sf">${results.filter(r=>!r.passed).length}</div><div class="sl">Sai</div></div>
          <div class="sc"><div class="sn nwn" id="ss">0</div><div class="sl">Bỏ qua</div></div>
        </div>
        <div class="sec-t">${exercise.num}. ${Utils.escHtml(exercise.title)}
          <span style="margin-left:8px;font-size:11px;color:var(--text3)">${earned}/${total}đ · ${pct}%</span>
        </div>
        <div class="lr" id="lr">
          ${results.map(r => `
            <div class="li ${r.passed ? 'pass' : 'fail'}">
              <span class="li-icon">${r.passed ? '✅' : '❌'}</span>
              <span class="li-desc">${Utils.escHtml(r.desc)}</span>
              <span class="li-pts ${r.passed ? 'ok' : 'err'}">${r.passed ? '+'+r.earned : '0'}/${r.pts}đ</span>
            </div>`).join('')}
        </div>
        ${_renderHints(results, exercise)}
        ${(score < 9.5 && exercise.solution) ? _renderSolution(exercise) : ''}`;

      // Animate ring AFTER DOM renders
      requestAnimationFrame(() => {
        const rf = document.getElementById('ring-fill');
        if (rf) {
          rf.style.stroke = color;
          rf.style.strokeDasharray = '270';
          rf.style.strokeDashoffset = '270';
          // Trigger transition
          requestAnimationFrame(() => {
            rf.style.strokeDashoffset = String(270 - (pct / 100) * 270);
          });
        }
        const rv = document.getElementById('rv');
        if (rv) rv.textContent = score;
        const sg = document.getElementById('sg');
        if (sg) { sg.textContent = _scoreLabel(score); sg.style.color = color; }
      });
    }

    // Expand results section and scroll to it
    if (typeof window.rpExpand === 'function') window.rpExpand('results');
    else if (typeof switchTab === 'function') switchTab('results');

    // Also expand criteria/theory so student can compare
    if (typeof window.rpExpand === 'function') {
      // Keep all sections open after grading
    }
  }

  function _scoreLabel(score) {
    if (score >= 9) return 'Xuất sắc';
    if (score >= 8) return 'Giỏi';
    if (score >= 6.5) return 'Khá';
    if (score >= 5) return 'Trung bình';
    return 'Cần cố gắng';
  }

  function _renderHints(results, exercise) {
    const failed  = results.filter(r => !r.passed);
    const passed  = results.filter(r => r.passed);
    const hasErrs = exercise.errors?.length;

    if (!failed.length && !hasErrs) return '';

    let html = '<div class="grade-hints">';
    html += '<div class="gh-title">💡 Cần cải thiện</div>';

    // Failed criteria - prominent cards
    failed.forEach(r => {
      html += `<div class="gh-item fail">
        <div class="gh-item-head">
          <span class="gh-badge fail">❌ Chưa đạt — ${r.pts}đ</span>
          <span class="gh-desc">${Utils.escHtml(r.desc)}</span>
        </div>
        ${r.hint ? `<div class="gh-hint">💡 ${Utils.escHtml(r.hint)}</div>` : ''}
        ${r.kw  ? `<div class="gh-kw">Từ khoá cần có: <code>${Utils.escHtml(r.kw)}</code></div>` : ''}
      </div>`;
    });

    // Common errors
    if (hasErrs) {
      html += '<div class="gh-errors-title">⚠️ Lỗi thường gặp</div>';
      exercise.errors.forEach(e => {
        html += `<div class="gh-error-item">• ${Utils.escHtml(String(e))}</div>`;
      });
    }

    // Passed criteria summary
    if (passed.length) {
      html += `<div class="gh-passed-summary">✅ ${passed.length} tiêu chí đạt — ${passed.reduce((s,r)=>s+r.earned,0)}đ</div>`;
    }

    html += '</div>';
    return html;
  }

  function _renderSolution(ex) {
    const sol = Utils.escHtml(ex.solution || '');
    const type = ex.type || 'python';
    const applyFn = type === 'sql'
      ? `CL.Editors.Sql.applyCode(${JSON.stringify(ex.solution)})`
      : type === 'html'
        ? `CL.Editors.Html.applyCode(${JSON.stringify(ex.solution)})`
        : `document.getElementById('code-input').value=${JSON.stringify(ex.solution)}`;

    return `
      <div class="grade-solution">
        <div class="gs-title">💡 Gợi ý đáp án (điểm < 9.5)</div>
        <pre class="gs-code">${sol}</pre>
        <button class="gs-apply-btn" onclick="${applyFn}">
          📋 Áp dụng đáp án và chạy thử
        </button>
      </div>`;
  }

  // ── Auto-render on grade:complete event ───────────────────────
  Events.on('grade:complete', render);

  // ── Backward compat: expose render globally ───────────────────
  window.renderGradeResult = render;

  return { render };
});

// ─── js/features/anti-cheat.js ───────────────────────────
/**
 * features/anti-cheat.js — Anti-Cheat Monitor
 * ═══════════════════════════════════════════════════════════════
 * Phát hiện: chuyển tab, rời trang, F5
 * Ghi vi phạm vào localStorage + gọi API
 * Tự nộp bài sau MAX_WARNINGS vi phạm
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, auth/session.js
 */

'use strict';

CL.define('Features.AntiCheat', () => {

  const cfg     = CL.require('Config');
  const Events  = CL.require('Events');
  const Store   = CL.require('Store');
  const Session = CL.require('Auth.Session');
  const MAX     = cfg.ANTI_CHEAT.MAX_WARNINGS;

  let _enabled    = false;
  let _locked     = false;
  let _violations = 0;
  let _blurTimer  = null;

  // ── Public API ────────────────────────────────────────────────

  function enable() {
    if (_enabled || _locked) return;
    _enabled    = true;
    _violations = 0;
    const badge = document.getElementById('antitab-badge');
    if (badge) badge.style.display = 'none';
    _checkPreviousLock();
  }

  function disable() {
    _enabled = false;
    _hideOverlay();
  }

  // ── Event listeners ───────────────────────────────────────────

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) _onLeave('chuyển tab');
  });

  window.addEventListener('blur', () => {
    if (!_enabled || _locked) return;
    _blurTimer = setTimeout(() => {
      if (!document.hidden) _onLeave('rời cửa sổ');
    }, cfg.ANTI_CHEAT.BLUR_DELAY_MS);
  });

  window.addEventListener('focus', () => clearTimeout(_blurTimer));

  window.addEventListener('beforeunload', e => {
    if (!_enabled || _locked) return;
    _logViolation('đóng/tải lại trang');
    e.preventDefault();
    return (e.returnValue = 'Bạn đang trong giờ thi!');
  });

  // ── Core logic ────────────────────────────────────────────────

  function _onLeave(type) {
    if (!_enabled || _locked) return;
    _violations++;
    _updateBadge();
    _logViolation(type);
    if (_violations > MAX) _autoSubmit(type);
    else _showWarning(type);
  }

  function _logViolation(type) {
    const user  = Session.get();
    const exId  = Store.get('currentExId') || '';
    const code  = document.getElementById('code-input')?.value
               || document.getElementById('html-code-input')?.value
               || document.getElementById('sql-input')?.value || '';
    // 1. LocalStorage
    try {
      const vps = JSON.parse(localStorage.getItem(cfg.LS.VIOLATION) || '[]');
      vps.push({ ts: new Date().toISOString(), mshs: user?.mshs||'', bai: exId, lan: _violations, loai: type });
      localStorage.setItem(cfg.LS.VIOLATION, JSON.stringify(vps.slice(-cfg.ANTI_CHEAT.LOCAL_CACHE_MAX)));
    } catch {}
    // 2. API (fire-and-forget)
    Events.emit('violation:detected', { type, count: _violations });
    CL.API?.logViolation(exId, _violations, type, code.substring(0, 150));
  }

  function _updateBadge() {
    const b = document.getElementById('antitab-badge');
    const c = document.getElementById('antitab-badge-count');
    if (b && c) { c.textContent = _violations; b.style.display = 'block'; }
  }

  function _showWarning(type) {
    const ov = document.getElementById('antitab-overlay');
    if (!ov) return;
    _setOverlayContent('⚠️', 'Cảnh báo vi phạm!', 'var(--error)',
      `Bạn đã <b>${type}</b> trong giờ thi. Hành vi đã được ghi nhận.`,
      `⚠️ Vi phạm lần ${_violations}/${MAX + 1} — Lần sau sẽ nộp bài ngay!`,
      'Tiếp tục làm bài', _hideOverlay);
    ov.classList.add('show');
  }

  function _autoSubmit(type) {
    if (_locked) return;
    _locked  = true;
    _enabled = false;
    _lockEditor();
    const ov = document.getElementById('antitab-overlay');
    if (!ov) return;
    _setOverlayContent('📊', 'Bài đã được nộp!', 'var(--accent)',
      `Vi phạm lần ${_violations}: <b>${type}</b>. Hệ thống tự động nộp bài.`,
      '🔒 Bài đã bị khóa — Không thể chỉnh sửa thêm',
      'Xem kết quả', () => {
        _hideOverlay();
        // Trigger grading based on current type
        const t = Store.get('currentExType');
        if (t === 'html' && typeof gradeHTML === 'function')  gradeHTML();
        else if (t === 'sql' && typeof gradeSQL === 'function') gradeSQL();
        else if (typeof gradeCode === 'function')               gradeCode();
        Events.emit('violation:locked', { exId: Store.get('currentExId') });
      });
    ov.classList.add('show');
    setTimeout(() => {
      const t = Store.get('currentExType');
      if (t === 'html')     gradeHTML?.();
      else if (t === 'sql') gradeSQL?.();
      else                  gradeCode?.();
    }, 500);
  }

  function _lockEditor() {
    ['code-input','html-code-input','sql-input'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.readOnly = true; el.style.opacity='0.6'; el.style.cursor='not-allowed'; }
    });
    document.querySelectorAll('.btn').forEach(b => {
      if (/Chạy|Chấm/.test(b.textContent)) { b.disabled = true; b.style.opacity = '0.4'; }
    });
  }

  function _checkPreviousLock() {
    const user = Session.get();
    const exId = Store.get('currentExId');
    if (!user || !exId) return;
    try {
      const vps = JSON.parse(localStorage.getItem(cfg.LS.VIOLATION) || '[]');
      const prev = vps.find(v => v.mshs === user.mshs && v.bai === exId && v.lan > MAX);
      if (prev) { _locked = true; _enabled = false; _lockEditor(); }
    } catch {}
  }

  function _hideOverlay() {
    document.getElementById('antitab-overlay')?.classList.remove('show');
  }

  function _setOverlayContent(icon, title, titleColor, msg, count, btnText, btnFn) {
    const $ = id => document.getElementById(id);
    if ($('antitab-icon'))  $('antitab-icon').textContent  = icon;
    if ($('antitab-title')) { $('antitab-title').textContent = title; $('antitab-title').style.color = titleColor; }
    if ($('antitab-msg'))   $('antitab-msg').innerHTML     = msg;
    if ($('antitab-count')) $('antitab-count').textContent = count;
    if ($('antitab-btn'))   { $('antitab-btn').textContent = btnText; $('antitab-btn').onclick = btnFn; }
  }

  // ── Backward compat ───────────────────────────────────────────
  window.antitabEnable  = enable;
  window.antitabDisable = disable;
  window.antitabDismiss = _hideOverlay;

  return { enable, disable };
});

// ─── js/features/teacher/panel.js ───────────────────────────
/**
 * features/teacher/panel.js — Teacher Panel (Inline Top Bar)
 * ═══════════════════════════════════════════════════════════════
 * Hiển thị dưới header như thanh điều hướng nằm ngang.
 * - CHỈ hiện với role teacher / admin
 * - Học sinh KHÔNG thấy
 * - Responsive: desktop tabs ngang, mobile scroll ngang
 */
'use strict';

CL.define('Teacher.Panel', () => {

  const cfg    = CL.require('Config');
  const Events = CL.require('Events');

  let _el      = null;
  let _panel   = null;
  let _curTab  = 'scores';
  let _visible = false;

  // ── Build panel (chỉ gọi 1 lần) ─────────────────────────────
  function _build(role) {
    if (_el) return;

    // Container nằm ngay sau header
    _el = document.createElement('div');
    _el.id = 'tp-bar';
    _el.setAttribute('role', 'navigation');
    _el.setAttribute('aria-label', 'Bảng điều khiển giáo viên');

    const isAdmin = role === 'admin';
    const tabs    = [...cfg.TEACHER_TABS];
    if (isAdmin) tabs.push({ id:'users', label:'👥 Người dùng' });

    _el.innerHTML = `
      <div class="tp-bar-inner">
        <div class="tp-bar-tabs" id="tp-bar-tabs" role="tablist">
          ${tabs.map((t, i) => `
            <button class="tp-bar-tab${i===0?' on':''}"
                    role="tab"
                    aria-selected="${i===0}"
                    data-tab="${t.id}"
                    onclick="CL.Teacher.Panel.switchTab('${t.id}')">
              ${t.label}
            </button>`).join('')}
        </div>
        <button class="tp-bar-toggle" id="tp-bar-toggle"
                onclick="CL.Teacher.Panel.toggle()"
                title="Ẩn/Hiện bảng điều khiển">
          <span id="tp-bar-toggle-icon">▲</span>
        </button>
      </div>
      <div class="tp-bar-body" id="tp-bar-body">
        <div class="tp-loading">⏳ Đang tải...</div>
      </div>`;

    // Chèn vào sau header, trước workspace
    const header = document.querySelector('header');
    if (header?.nextSibling) {
      header.parentNode.insertBefore(_el, header.nextSibling);
    } else {
      document.body.prepend(_el);
    }

    _panel = document.getElementById('tp-bar-body');
    _visible = true;
    document.body.classList.add('has-tp-bar');
    // Adjust workspace height dynamically
    const ro = new ResizeObserver(() => {
      const h = _el?.offsetHeight || 0;
      document.documentElement.style.setProperty('--tp-bar-h', h + 'px');
    });
    ro.observe(_el);
  }

  // ── Open: tạo nếu chưa có, hiện panel ───────────────────────
  function open(role) {
    const sess = CL.Auth?.Session?.get?.();
    const r    = role || sess?.role || '';
    if (r !== 'teacher' && r !== 'admin') return; // học sinh không được vào

    if (!_el) { _build(r); switchTab('scores'); return; }
    _el.style.display = '';
    _visible = true;
    _updateToggle(true);
  }

  function close() {
    if (_el) _el.style.display = 'none';
    _visible = false;
  }

  function toggle() {
    _visible = !_visible;
    _panel.style.display = _visible ? '' : 'none';
    _updateToggle(_visible);
  }

  function _updateToggle(open) {
    const icon = document.getElementById('tp-bar-toggle-icon');
    if (icon) icon.textContent = open ? '▲' : '▼';
    const btn = document.getElementById('tp-bar-toggle');
    if (btn) btn.title = open ? 'Thu gọn' : 'Mở rộng bảng điều khiển';
  }

  // ── Switch tab ───────────────────────────────────────────────
  function switchTab(tabId) {
    _curTab = tabId;

    // Highlight tab
    document.querySelectorAll('.tp-bar-tab').forEach(b => {
      const on = b.dataset.tab === tabId;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on);
    });

    // Show panel if collapsed
    if (!_visible) {
      _visible = true;
      if (_panel) _panel.style.display = '';
      _updateToggle(true);
    }

    const body = document.getElementById('tp-bar-body');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';

    const RENDERERS = {
      scores:     () => CL.Teacher.Scores?.render(body),
      violations: () => CL.Teacher.Violations?.render(body),
      history:    () => CL.Teacher.History?.render(body),
      exams:      () => CL.Teacher.Exams?.render(body),
      analytics:  () => CL.Teacher.Analytics?.render(body),
      exercises:  () => CL.Teacher.ExEditor?.render(body),
      config:     () => CL.Teacher.Config?.render(body),
      users:      () => CL.Admin?.Users?.render(body),
      year:       () => CL.Admin?.YearManager?.render(body),
      'ai-gen':   () => CL.Teacher?.AIGenerator?.render(body),
    };
    (RENDERERS[tabId] || (() => {}))();
  }

  // Events
  Events.on('grade:submitted',     () => { if (_curTab==='scores')     switchTab('scores');     });
  Events.on('violation:detected',  () => { if (_curTab==='violations') switchTab('violations'); });
  Events.on('exam:status-changed', () => { if (_curTab==='exams')      switchTab('exams');      });

  // Backward compat
  window.TeacherPanel = { open, close, _tab: switchTab };

  return { open, close, switchTab, toggle };
});

// ─── js/features/teacher/scores.js ───────────────────────────
/**
 * features/teacher/scores.js — Teacher Panel: Tab Điểm
 * @requires core/*, CL.API, CL.Utils
 */
'use strict';

CL.define('Teacher.Scores', () => {
  const Utils  = CL.require('Utils');
  const Events = CL.require('Events');

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải bảng điểm...</div>';
    try {
      const rows = await CL.API.getScores();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">📭 Chưa có bài nộp nào.</div>'; return; }

      const totalHS = new Set(rows.map(r => r.mshs)).size;
      const avg     = rows.reduce((s, r) => s + (parseFloat(r.diem) || 0), 0) / rows.length;

      el.innerHTML = `
        <div class="tp-score-header">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Bài nộp</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${totalHS}</div><div class="tp-stat-l">Học sinh</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${avg.toFixed(1)}</div><div class="tp-stat-l">Điểm TB</div></div>
          <button class="tp-refresh" onclick="CL.API._invalidate('scores');CL.Teacher.Panel.switchTab('scores')">🔄</button>
        </div>
        <div class="tp-search">
          <input type="text" placeholder="🔍 Tìm MSHS, tên, bài tập..."
            oninput="_filterTable('sc-tbody', this.value)">
        </div>
        <div class="tp-table-wrap">
          <table class="tp-table"><thead><tr>
            <th>Thời gian</th><th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>Bài tập</th><th>Điểm</th>
          </tr></thead>
          <tbody id="sc-tbody">
            ${rows.slice().reverse().map(r => `<tr>
              <td class="td-time">${Utils.formatTime(r.ts)}</td>
              <td class="td-mshs">${Utils.escHtml(r.mshs)}</td>
              <td>${Utils.escHtml(r.ho_ten)}</td>
              <td><span class="vp-lop">${Utils.escHtml(r.lop)}</span></td>
              <td class="td-ex">${Utils.escHtml(r.tieu_de || r.bai_id)}</td>
              <td class="td-score ${Utils.scoreClass(r.diem)}">${r.diem || '—'}</td>
            </tr>`).join('')}
          </tbody></table>
        </div>
        <div class="tp-actions">
          <button class="tp-action-btn" onclick="CL.Teacher.Scores.exportCsv()">📥 Xuất CSV</button>
        </div>`;
    } catch (e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function exportCsv() {
    const rows = [...document.querySelectorAll('#sc-tbody tr')].map(tr =>
      [...tr.querySelectorAll('td')].map(td => td.textContent.trim())
    );
    Utils.downloadCsv(
      [['Thời gian','MSHS','Họ tên','Lớp','Bài tập','Điểm'], ...rows],
      `bangdiem-${new Date().toISOString().slice(0, 10)}.csv`
    );
  }

  return { render, exportCsv };
});

// ── Filter helper (shared, module-level) ─────────────────────────
function _filterTable(tbodyId, q) {
  q = q.toLowerCase();
  document.querySelectorAll('#' + tbodyId + ' tr').forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ─── js/features/teacher/violations.js ───────────────────────────
/**
 * features/teacher/violations.js — Teacher Panel: Tab Vi phạm
 * @requires core/*, CL.API
 */
'use strict';

CL.define('Teacher.Violations', () => {
  const Utils = CL.require('Utils');

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    try {
      const rows = await CL.API.getViolations();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">✅ Chưa có vi phạm.</div>'; return; }

      const locked = new Set(rows.filter(r => parseInt(r.lan) > 1).map(r => r.mshs));

      el.innerHTML = `
        <div class="vp-summary">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Vi phạm</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${new Set(rows.map(r=>r.mshs)).size}</div><div class="tp-stat-l">HS</div></div>
          <div class="tp-stat ${locked.size ? 'vp-danger' : ''}"><div class="tp-stat-n">${locked.size}</div><div class="tp-stat-l">Bị khóa</div></div>
          <button class="tp-refresh" onclick="CL.API._invalidate('violations');CL.Teacher.Panel.switchTab('violations')">🔄</button>
        </div>
        <div class="tp-search">
          <input type="text" placeholder="🔍 Tìm..." oninput="_filterTable('vp-tbody',this.value)">
        </div>
        <div class="tp-table-wrap">
          <table class="tp-table"><thead><tr>
            <th>Thời gian</th><th>MSHS</th><th>Học sinh</th><th>Bài</th><th>Lần</th><th>Loại</th>
          </tr></thead>
          <tbody id="vp-tbody">
            ${rows.map(r => `<tr class="${parseInt(r.lan) > 1 ? 'vp-row-locked' : ''}">
              <td class="td-time">${Utils.formatTime(r.ts)}</td>
              <td class="td-mshs">${Utils.escHtml(r.mshs)}</td>
              <td>${Utils.escHtml(r.ho_ten)} <span class="vp-lop">${Utils.escHtml(r.lop)}</span></td>
              <td class="td-ex">${Utils.escHtml(r.bai_id)}</td>
              <td style="text-align:center;font-weight:800;color:${parseInt(r.lan)>1?'var(--error)':'var(--warn)'}">${r.lan||1}</td>
              <td><span class="vp-type">${Utils.escHtml(r.loai)}</span></td>
            </tr>`).join('')}
          </tbody></table>
        </div>`;
    } catch (e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  return { render };
});

// ─── js/features/teacher/history.js ───────────────────────────
/**
 * features/teacher/history.js — Teacher Panel: Tab Lịch sử
 * @requires core/*, CL.API
 */
'use strict';

CL.define('Teacher.History', () => {
  const Utils = CL.require('Utils');

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    try {
      const rows = await CL.API.getHistory();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">📭 Chưa có lịch sử.</div>'; return; }

      el.innerHTML = `
        <div class="tp-score-header" style="grid-template-columns:1fr 1fr auto">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Lượt làm</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${new Set(rows.map(r=>r.mshs)).size}</div><div class="tp-stat-l">HS</div></div>
          <button class="tp-refresh" onclick="CL.API._invalidate('history');CL.Teacher.Panel.switchTab('history')">🔄</button>
        </div>
        <div class="tp-search">
          <input type="text" placeholder="🔍 Tìm..." oninput="_filterTable('hs-tbody',this.value)">
        </div>
        <div class="tp-table-wrap">
          <table class="tp-table"><thead><tr>
            <th>Thời gian</th><th>MSHS</th><th>Họ tên</th><th>Bài tập</th><th>Điểm</th><th>Lớp</th>
          </tr></thead>
          <tbody id="hs-tbody">
            ${rows.map(r => `<tr>
              <td class="td-time">${Utils.formatTime(r.ts)}</td>
              <td class="td-mshs">${Utils.escHtml(r.mshs)}</td>
              <td>${Utils.escHtml(r.ho_ten)}</td>
              <td class="td-ex">${Utils.escHtml(r.tieu_de || r.bai_id)}</td>
              <td class="td-score ${Utils.scoreClass(r.diem)}">${r.diem || '—'}</td>
              <td>${Utils.escHtml(r.lop)}</td>
            </tr>`).join('')}
          </tbody></table>
        </div>`;
    } catch (e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  return { render };
});

// ─── js/features/teacher/exams.js ───────────────────────────
/**
 * features/teacher/exams.js — Exam Creator (Canvas LMS style v2)
 * ═══════════════════════════════════════════════════════════════
 * Layout:  Top tab bar · Main content · Sticky summary sidebar
 * Tabs:    Thông tin · Lịch thi · Phân công lớp · Cài đặt · Câu hỏi
 * New:     Per-question point weight · Class eligibility counter ·
 *          datetime-local open/close · so_lan_thi_max · bat_buoc_fullscreen
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Teacher.Exams', () => {
  const Utils    = CL.require('Utils');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  const STATUS = {
    draft:  { label:'Nháp',    cls:'draft'  },
    active: { label:'Đang mở', cls:'active' },
    closed: { label:'Đã đóng', cls:'closed' },
  };
  const BLOOM       = ['b1','b2','b3','b4','b5','b6'];
  const BLOOM_LABEL = {b1:'B1',b2:'B2',b3:'B3',b4:'B4',b5:'B5',b6:'B6'};
  const BLOOM_COLOR = {b1:'#6366f1',b2:'#3b82f6',b3:'#10b981',b4:'#f59e0b',b5:'#ef4444',b6:'#8b5cf6'};

  // ─── state ────────────────────────────────────────────────────
  const GROUP_COLORS = ['#378ADD','#1D9E75','#8b5cf6','#f59e0b','#D85A30','#D4537E'];

  // ─── state ────────────────────────────────────────────────────
  let _classes  = [];   // [{lop, count, students:[]}]
  let _activeTab = 'info';
  let _groups   = [];   // [{id, name, pick_count, group_points, pool: Set}]
  let _examId   = '';   // exam being edited

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    try {
      const exams = await CL.API.getExams(true);
      el.innerHTML = `
        <div class="ec-list-toolbar">
          <div class="ec-toolbar-left">
            <span class="ec-list-title">📋 Kỳ kiểm tra</span>
            <span class="ec-list-count">${exams.length} kỳ</span>
          </div>
          <div class="ec-toolbar-right">
            <button class="ec-btn-primary"
              onclick="CL.Teacher.Exams.showForm({})">+ Tạo kỳ kiểm tra</button>
            <button class="ec-btn-icon" title="Làm mới"
              onclick="CL.Teacher.Panel.switchTab('exams')">↺</button>
          </div>
        </div>
        <div class="ec-list-grid">
          ${exams.length
            ? exams.map(_examCard).join('')
            : `<div class="ec-empty">
                <div class="ec-empty-icon">📋</div>
                <div>Chưa có kỳ kiểm tra nào.<br>
                Nhấn <b>+ Tạo kỳ kiểm tra</b> để bắt đầu.</div>
               </div>`}
        </div>
        <div id="exam-form-root" style="display:none"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _examCard(exam) {
    const st   = STATUS[exam.trang_thai] || {label: exam.trang_thai, cls:'draft'};
    const lops = _parseLops(exam.lop);
    // Groups info: if new format, show per-group breakdown
    const groups   = Array.isArray(exam.groups) && exam.groups.length ? exam.groups : null;
    const nBai     = groups
      ? groups.reduce((s,g) => s + (parseInt(g.pick_count)||0), 0)
      : (exam.bai_tap||[]).length;
    const poolSize = groups
      ? groups.reduce((s,g) => s + (g.question_ids||[]).length, 0)
      : nBai;
    const flags = [];
    if (exam.che_do_tron_de)    flags.push({icon:'🔀', tip:'Xáo đề'});
    if (exam.toan_ven_1_lan)    flags.push({icon:'🔒', tip:'1 lần nộp'});
    if (exam.so_bai_random > 0) flags.push({icon:'🎲', tip:`Random ${exam.so_bai_random} câu`});
    if (exam.mat_khau)          flags.push({icon:'🔐', tip:'Có mã vào'});
    if (exam.bat_buoc_fullscreen) flags.push({icon:'🖥', tip:'Fullscreen'});

    // Date range display
    const bd = exam.ngay_bat_dau || exam.ngay_thi || '';
    const kt = exam.ngay_ket_thuc || '';
    const dateRange = bd
      ? (kt ? `${_fmtDate(bd)} → ${_fmtDate(kt)}` : _fmtDate(bd))
      : '';

    return `<div class="ec-card">
      <div class="ec-card-header">
        <div class="ec-card-title-row">
          <span class="ec-card-name">${Utils.escHtml(exam.ten)}</span>
          <span class="ec-status-badge ec-status-${st.cls}">${st.label}</span>
        </div>
        <div class="ec-card-meta">
          ${lops.length
            ? `<span class="ec-meta-chip">🏫 ${Utils.escHtml(lops.join(', '))}</span>`
            : '<span class="ec-meta-chip">🏫 Tất cả lớp</span>'}
          <span class="ec-meta-chip">⏱ ${exam.thoi_gian_phut||45} phút</span>
          ${groups
            ? `<span class="ec-meta-chip">📝 ${nBai} câu ra</span><span class="ec-meta-chip ec-chip-pool">📚 pool ${poolSize}</span>`
            : `<span class="ec-meta-chip">📝 ${nBai} câu</span>`}
          ${dateRange ? `<span class="ec-meta-chip">📅 ${Utils.escHtml(dateRange)}</span>` : ''}
          ${exam.gio_mo ? `<span class="ec-meta-chip">🕐 ${exam.gio_mo}–${exam.gio_dong||'?'}</span>` : ''}
          ${flags.map(f=>`<span class="ec-meta-chip" title="${f.tip}">${f.icon}</span>`).join('')}
        </div>
        ${exam.mo_ta ? `<div class="ec-card-desc">${Utils.escHtml(exam.mo_ta)}</div>` : ''}
      </div>
      <div class="ec-card-actions">
        <button class="ec-act-btn"
          onclick="CL.Teacher.Exams.editExam('${Utils.escHtml(exam.id)}')">✏️ Sửa</button>
        <button class="ec-act-btn"
          onclick="CL.Teacher.Exams.viewResults('${Utils.escHtml(exam.id)}')">📊 Kết quả</button>
        <button class="ec-act-btn ec-act-toggle"
          onclick="CL.Teacher.Exams.toggleExam('${Utils.escHtml(exam.id)}','${exam.trang_thai}')">
          ${exam.trang_thai==='active'?'🔴 Đóng':'🟢 Mở'}</button>
        <button class="ec-act-btn ec-act-danger"
          onclick="CL.Teacher.Exams.deleteExam('${Utils.escHtml(exam.id)}')">🗑</button>
      </div>
    </div>`;
  }

  // ════════════════════════════════════════════════════════════════
  //  CANVAS-STYLE CREATE / EDIT FORM  (tab layout)
  // ════════════════════════════════════════════════════════════════
  // ════════════════════════════════════════════════════════════════
  //  CANVAS-STYLE CREATE / EDIT FORM
  // ════════════════════════════════════════════════════════════════

  async function showForm(exam) {
    const root = document.getElementById('exam-form-root');
    if (!root) return;
    document.querySelector('.ec-list-grid')?.style.setProperty('display','none');
    document.querySelector('.ec-list-toolbar')?.style.setProperty('display','none');
    root.style.display = 'block';
    root.innerHTML = '<div class="tp-loading">⏳ Đang tải dữ liệu...</div>';

    _examId = exam.id || '';

    // ── Load classes ──────────────────────────────────────────
    _classes = [];
    try {
      const students = await CL.API.adminGetUsers('student', false);
      const grouped  = Utils.groupBy(students, s => s.lop || '');
      _classes = Object.entries(grouped)
        .filter(([lop]) => lop.trim())
        .sort(([a],[b]) => a.localeCompare(b, 'vi'))
        .map(([lop, sts]) => ({lop, count: sts.length, students: sts}));
    } catch {
      try {
        const scores = await CL.API.getScores(false);
        const map = {};
        scores.forEach(s => { if (s.lop) map[s.lop] = (map[s.lop]||0)+1; });
        _classes = Object.entries(map)
          .sort(([a],[b]) => a.localeCompare(b,'vi'))
          .map(([lop, count]) => ({lop, count, students:[]}));
      } catch {/* ignore */}
    }

    // ── Init groups ───────────────────────────────────────────
    _groups = _initGroups(exam);

    const selectedLops = new Set(_parseLops(exam.lop));
    const isEdit       = !!exam.id;

    root.innerHTML = `
<div class="ecf-page" id="ecf-page">

  <!-- top bar: back · title input · save buttons -->
  <div class="ecf-topbar">
    <button class="ecf-back-btn" onclick="CL.Teacher.Exams._closeForm()">← Danh sách</button>
    <input id="ef-ten" class="ecf-title-input" type="text"
      value="${Utils.escHtml(exam.ten||'')}"
      placeholder="Tên kỳ kiểm tra..."
      oninput="CL.Teacher.Exams._updateSummary()">
    <div class="ecf-topbar-actions">
      <span id="ecf-save-msg" class="ecf-save-msg"></span>
      <button class="ecf-btn-draft"
        onclick="CL.Teacher.Exams.saveExam('${exam.id||''}','draft')">💾 Lưu nháp</button>
      <button class="ecf-btn-publish"
        onclick="CL.Teacher.Exams.saveExam('${exam.id||''}','active')">🚀 Công bố</button>
    </div>
  </div>

  <!-- tab bar -->
  <div class="ecf-tabs" id="ecf-tabs">
    <button class="ecf-tab ecf-tab-active" data-tab="info"
      onclick="CL.Teacher.Exams._switchTab('info',this)">
      <span class="ecf-tab-icon">📋</span> Thông tin
    </button>
    <button class="ecf-tab" data-tab="schedule"
      onclick="CL.Teacher.Exams._switchTab('schedule',this)">
      <span class="ecf-tab-icon">📅</span> Lịch thi
    </button>
    <button class="ecf-tab" data-tab="assign"
      onclick="CL.Teacher.Exams._switchTab('assign',this)">
      <span class="ecf-tab-icon">🏫</span> Phân công
      <span class="ecf-tab-badge" id="tab-badge-assign">
        ${selectedLops.size || _classes.length || '—'}
      </span>
    </button>
    <button class="ecf-tab" data-tab="settings"
      onclick="CL.Teacher.Exams._switchTab('settings',this)">
      <span class="ecf-tab-icon">⚙️</span> Cài đặt
    </button>
    <button class="ecf-tab" data-tab="questions"
      onclick="CL.Teacher.Exams._switchTab('questions',this)">
      <span class="ecf-tab-icon">📝</span> Câu hỏi
      <span class="ecf-tab-badge" id="tab-badge-questions">${_totalPickCount()}</span>
    </button>
  </div>

  <!-- body: main + sidebar -->
  <div class="ecf-body">

    <div class="ecf-main">

      <!-- ── TAB 1: Thông tin ──────────────────────────────── -->
      <div class="ecf-tab-panel" id="ecftab-info">
        <div class="ecf-section-card">
          <div class="ecf-sc-title">📋 Thông tin cơ bản</div>
          <div class="ecf-field">
            <label class="ecf-label">Mô tả / Hướng dẫn cho học sinh</label>
            <textarea id="ef-mota" class="ecf-textarea" rows="4"
              placeholder="Học sinh sẽ thấy hướng dẫn này trước khi vào thi..."
              >${Utils.escHtml(exam.mo_ta||'')}</textarea>
          </div>
          <div class="ecf-field">
            <label class="ecf-label">Trạng thái hiện tại</label>
            <div class="ecf-status-row">
              ${['draft','active','closed'].map(s => {
                const st = STATUS[s];
                return `<span class="ec-status-badge ec-status-${st.cls} ${exam.trang_thai===s?'ec-status-cur':''}">${st.label}</span>`;
              }).join('')}
              <span class="ecf-hint-inline">
                ${isEdit ? '(thay đổi bằng nút 🟢 Mở / 🔴 Đóng trong danh sách)' : '(sẽ lưu là Nháp)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── TAB 2: Lịch thi ──────────────────────────────── -->
      <div class="ecf-tab-panel" id="ecftab-schedule" style="display:none">
        <div class="ecf-section-card">
          <div class="ecf-sc-title">📅 Lịch thi</div>
          <div class="ecf-row-3">
            <div class="ecf-field">
              <label class="ecf-label">⏱ Thời gian (phút)</label>
              <input id="ef-tg" class="ecf-input" type="number"
                value="${exam.thoi_gian_phut||45}" min="5" max="180"
                oninput="CL.Teacher.Exams._updateSummary()">
            </div>
            <div class="ecf-field">
              <label class="ecf-label">📅 Ngày bắt đầu</label>
              <input id="ef-ngay-bd" class="ecf-input" type="date"
                value="${exam.ngay_bat_dau||exam.ngay_thi||''}"
                onchange="CL.Teacher.Exams._refreshSchedulePreview()">
            </div>
            <div class="ecf-field">
              <label class="ecf-label">📅 Ngày kết thúc</label>
              <input id="ef-ngay-kt" class="ecf-input" type="date"
                value="${exam.ngay_ket_thuc||''}"
                onchange="CL.Teacher.Exams._refreshSchedulePreview()">
            </div>
          </div>
          <div class="ecf-row-2" style="margin-top:10px">
            <div class="ecf-field">
              <label class="ecf-label">🕐 Giờ mở thi mỗi ngày</label>
              <input id="ef-gio-mo" class="ecf-input" type="time"
                value="${exam.gio_mo||'07:00'}"
                onchange="CL.Teacher.Exams._refreshSchedulePreview()">
            </div>
            <div class="ecf-field">
              <label class="ecf-label">🕑 Giờ đóng thi mỗi ngày</label>
              <input id="ef-gio-dong" class="ecf-input" type="time"
                value="${exam.gio_dong||'17:00'}"
                onchange="CL.Teacher.Exams._refreshSchedulePreview()">
            </div>
          </div>
          <div id="ecf-schedule-preview" class="ecf-schedule-preview" style="margin-top:12px"></div>
        </div>
      </div>

      <!-- ── TAB 3: Phân công lớp ──────────────────────────── -->
      <div class="ecf-tab-panel" id="ecftab-assign" style="display:none">
        <div class="ecf-section-card">
          <div class="ecf-sc-title">🏫 Phân công lớp</div>
          ${_classes.length === 0
            ? `<div class="ecf-hint">⚠️ Chưa có dữ liệu lớp. Vào <b>Quản lý người dùng</b> thêm học sinh trước.</div>`
            : `<div class="ecf-lop-toolbar">
                <span class="ecf-hint">Không chọn = áp dụng tất cả lớp</span>
                <div style="display:flex;gap:6px">
                  <button type="button" class="ecf-sel-btn"
                    onclick="CL.Teacher.Exams._selectAllLops(true)">Chọn tất cả</button>
                  <button type="button" class="ecf-sel-btn"
                    onclick="CL.Teacher.Exams._selectAllLops(false)">Bỏ chọn</button>
                </div>
               </div>
               <div class="ecf-lop-grid">
               ${_classes.map(({lop,count}) => {
                 const on = selectedLops.has(lop);
                 return `<label class="ecf-lop-card ${on?'selected':''}">
                   <input type="checkbox" class="ecf-lop-cb" value="${Utils.escHtml(lop)}"
                     ${on?'checked':''}
                     onchange="CL.Teacher.Exams._onLopChange(this)">
                   <div class="ecf-lop-info">
                     <span class="ecf-lop-name">${Utils.escHtml(lop)}</span>
                     <span class="ecf-lop-count">${count} học sinh</span>
                   </div>
                   <span class="ecf-lop-check">✓</span>
                 </label>`;
               }).join('')}
               </div>
               <div id="ecf-elig-bar" style="margin-top:10px">
                 ${_eligibilityBar(selectedLops, _classes)}
               </div>`}
        </div>
      </div>

      <!-- ── TAB 4: Cài đặt ────────────────────────────────── -->
      <div class="ecf-tab-panel" id="ecftab-settings" style="display:none">
        <div class="ecf-section-card">
          <div class="ecf-sc-title">⚙️ Cài đặt thi</div>
          <div class="ecf-opts-grid">
            ${_optCard('ef-tron','🔀','Xáo đề ngẫu nhiên',
              'Mỗi học sinh nhận thứ tự câu hỏi khác nhau', exam.che_do_tron_de)}
            ${_optCard('ef-1lan','🔒','Nộp 1 lần duy nhất',
              'Không thể sửa bài sau khi đã nộp từng câu', exam.toan_ven_1_lan)}
            ${_optCard('ef-dapan','💡','Hiện gợi ý sau nộp',
              'Hiện đáp án gợi ý khi điểm < 9.5', exam.cho_xem_dap_an)}
            ${_optCard('ef-fullscreen','🖥','Bắt buộc toàn màn hình',
              'Thoát khỏi full-screen = cảnh báo vi phạm', exam.bat_buoc_fullscreen!==false)}
          </div>
          <div class="ecf-row-2" style="margin-top:14px">
            <div class="ecf-field">
              <label class="ecf-label">🔁 Số lần làm bài tối đa
                <span class="ecf-hint-inline">(0 = không giới hạn)</span></label>
              <input id="ef-so-lan" class="ecf-input" type="number"
                value="${exam.so_lan_thi_max||0}" min="0" max="10">
            </div>
            <div class="ecf-field">
              <label class="ecf-label">🔐 Mã vào phòng thi
                <span class="ecf-hint-inline">(để trống = không cần mã)</span></label>
              <div class="ecf-input-group">
                <input id="ef-matkhau" class="ecf-input" type="text"
                  value="${Utils.escHtml(exam.mat_khau||'')}"
                  placeholder="Ví dụ: HS2025"
                  oninput="CL.Teacher.Exams._updateSummary()">
                <button type="button" class="ecf-gen-btn"
                  onclick="CL.Teacher.Exams._genCode()">⚡ Tạo</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── TAB 5: Câu hỏi / Nhóm ────────────────────────── -->
      <div class="ecf-tab-panel" id="ecftab-questions" style="display:none">
        ${_buildGroupsTab(exam)}
      </div>

      <!-- bottom nav -->
      <div class="ecf-tab-nav-btns">
        <button class="ecf-btn-ghost" id="ecf-prev-btn"
          onclick="CL.Teacher.Exams._prevTab()" style="display:none">← Trước</button>
        <button class="ecf-btn-draft" id="ecf-next-btn"
          onclick="CL.Teacher.Exams._nextTab()">Tiếp theo →</button>
        <button class="ecf-btn-publish ecf-btn-pub-final" id="ecf-publish-btn" style="display:none"
          onclick="CL.Teacher.Exams.saveExam('${exam.id||''}','active')">🚀 Công bố kỳ thi</button>
      </div>

    </div><!-- end ecf-main -->

    <!-- RIGHT: sticky summary sidebar -->
    <div class="ecf-sidebar">
      <div class="ecf-summary-card">
        <div class="ecf-sum-title">📊 Tóm tắt</div>
        <div class="ecf-sum-name" id="sum-ten">—</div>
        <div class="ecf-sum-divider"></div>
        <div class="ecf-sum-stats">
          <div class="ecf-sum-stat">
            <div class="ecf-sum-num" id="sum-lop-count">—</div>
            <div class="ecf-sum-lab">Lớp</div>
          </div>
          <div class="ecf-sum-stat">
            <div class="ecf-sum-num" id="sum-ex-count">0</div>
            <div class="ecf-sum-lab">Câu ra</div>
          </div>
          <div class="ecf-sum-stat">
            <div class="ecf-sum-num" id="sum-tg">45'</div>
            <div class="ecf-sum-lab">Phút</div>
          </div>
        </div>
        <div class="ecf-sum-divider"></div>
        <div class="ecf-sum-row-item">
          <span class="ecf-sum-ico">📅</span>
          <span class="ecf-sum-val" id="sum-date">—</span>
        </div>
        <div class="ecf-sum-row-item" id="sum-pass-row" style="display:none">
          <span class="ecf-sum-ico">🔐</span>
          <span class="ecf-sum-val" id="sum-pass">—</span>
        </div>
        <div class="ecf-sum-divider"></div>
        <!-- Groups summary -->
        <div class="ecf-sum-bloom-title">Nhóm câu hỏi</div>
        <div id="sum-groups" class="ecf-sum-groups">
          <span style="color:var(--text3);font-size:11px">Chưa tạo nhóm</span>
        </div>
        <div class="ecf-sum-divider"></div>
        <!-- Total points progress -->
        <div class="ecf-sum-pts-header">
          <span class="ecf-sum-pts-lbl">Tổng điểm</span>
          <span class="ecf-sum-pts-val" id="sum-total-pts">0.0 / 10 đ</span>
        </div>
        <div class="ecf-pts-bar-wrap">
          <div class="ecf-pts-bar-fill" id="sum-pts-bar" style="width:0%"></div>
        </div>
        <div class="ecf-pts-status" id="sum-pts-status"></div>
        <button class="ecf-btn-balance" id="ecf-btn-balance" style="display:none"
          onclick="CL.Teacher.Exams._autoBalance()">⚖ Tự động cân bằng 10đ</button>
        <div class="ecf-sum-divider"></div>
        <button class="ecf-btn-publish ecf-btn-full"
          onclick="CL.Teacher.Exams.saveExam('${exam.id||''}','active')">
          🚀 Công bố kỳ thi
        </button>
        <button class="ecf-btn-draft ecf-btn-full" style="margin-top:6px"
          onclick="CL.Teacher.Exams.saveExam('${exam.id||''}','draft')">
          💾 Lưu nháp
        </button>
        <div id="ecf-msg" class="ecf-msg"></div>
      </div>
    </div>

  </div><!-- end ecf-body -->
</div><!-- end ecf-page -->`;

    root.scrollIntoView({behavior:'smooth', block:'start'});
    _updateSummary();
    _updateNavBtns();
    _refreshSchedulePreview();
  }

  function _schedulePreview(bd, kt, gmo, gdong) {
    if (!bd && !kt) return '';
    const bdFmt = bd ? `${_fmtDate(bd)} lúc ${gmo}` : '—';
    const ktFmt = kt ? `${_fmtDate(kt)} lúc ${gdong}` : '—';
    return `<div class="ecf-sched-preview">
      <span class="ecf-sched-badge sched-open">🟢 Mở: ${Utils.escHtml(bdFmt)}</span>
      <span class="ecf-sched-arrow">→</span>
      <span class="ecf-sched-badge sched-close">🔴 Đóng: ${Utils.escHtml(ktFmt)}</span>
    </div>`;
  }

  // ── Eligibility bar ──────────────────────────────────────────
  function _eligibilityBar(selectedLops, classes) {
    const total = selectedLops.size
      ? classes.filter(c => selectedLops.has(c.lop)).reduce((s,c) => s+c.count, 0)
      : classes.reduce((s,c) => s+c.count, 0);
    const lopLabel = selectedLops.size ? `${selectedLops.size} lớp` : 'Tất cả lớp';
    return `<div class="ecf-elig-wrap">
      <span class="ecf-elig-icon">👥</span>
      <div>
        <div class="ecf-elig-main">${total} học sinh đủ điều kiện</div>
        <div class="ecf-elig-sub">${lopLabel} · ${classes.length} lớp trong hệ thống</div>
      </div>
    </div>`;
  }

  // ── Tab switching ────────────────────────────────────────────
  const TAB_ORDER = ['info','schedule','assign','settings','questions'];

  function _switchTab(tab, btn) {
    _activeTab = tab;
    document.querySelectorAll('.ecf-tab-panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.ecf-tab').forEach(b => b.classList.remove('ecf-tab-active'));
    const panel = document.getElementById('ecftab-'+tab);
    if (panel) panel.style.display = 'block';
    if (btn) btn.classList.add('ecf-tab-active');
    _updateNavBtns();
    // Update schedule preview when switching to schedule tab
    if (tab === 'schedule') _refreshSchedulePreview();
  }

  function _nextTab() {
    const idx = TAB_ORDER.indexOf(_activeTab);
    if (idx < TAB_ORDER.length-1) {
      const nextTab = TAB_ORDER[idx+1];
      const btn = document.querySelector(`.ecf-tab[data-tab="${nextTab}"]`);
      _switchTab(nextTab, btn);
    }
  }

  function _prevTab() {
    const idx = TAB_ORDER.indexOf(_activeTab);
    if (idx > 0) {
      const prevTab = TAB_ORDER[idx-1];
      const btn = document.querySelector(`.ecf-tab[data-tab="${prevTab}"]`);
      _switchTab(prevTab, btn);
    }
  }

  function _updateNavBtns() {
    const idx = TAB_ORDER.indexOf(_activeTab);
    const prevBtn    = document.getElementById('ecf-prev-btn');
    const nextBtn    = document.getElementById('ecf-next-btn');
    const publishBtn = document.getElementById('ecf-publish-btn');
    const isLast = idx === TAB_ORDER.length - 1;
    if (prevBtn)    prevBtn.style.display    = idx > 0   ? '' : 'none';
    if (nextBtn)    nextBtn.style.display    = !isLast   ? '' : 'none';
    if (publishBtn) publishBtn.style.display = isLast    ? '' : 'none';
  }

  function _refreshSchedulePreview() {
    const bd    = document.getElementById('ef-ngay-bd')?.value  || '';
    const kt    = document.getElementById('ef-ngay-kt')?.value  || '';
    const gmo   = document.getElementById('ef-gio-mo')?.value   || '07:00';
    const gdong = document.getElementById('ef-gio-dong')?.value || '17:00';
    const el = document.getElementById('ecf-schedule-preview');
    if (el) el.innerHTML = _schedulePreview(bd, kt, gmo, gdong);
  }

  // ── Per-question points ──────────────────────────────────────
  function _updatePointsCb(cb) {
    // Toggle row highlight when checked
    cb.closest('.ecf-ex-item')?.classList.toggle('ecf-ex-checked', cb.checked);
  }

  // ── Option card ──────────────────────────────────────────────
  function _optCard(id, icon, title, desc, checked) {
    return `<label class="ecf-opt-card ${checked?'opt-on':''}">
      <input type="checkbox" id="${id}" ${checked?'checked':''}
        onchange="this.closest('.ecf-opt-card').classList.toggle('opt-on',this.checked)">
      <div class="ecf-opt-icon">${icon}</div>
      <div class="ecf-opt-body">
        <div class="ecf-opt-title">${title}</div>
        <div class="ecf-opt-desc">${desc}</div>
      </div>
      <span class="ecf-opt-check">✓</span>
    </label>`;
  }

  // ════════════════════════════════════════════════════════════════
  //  QUESTION GROUPS — init, render, manage
  // ════════════════════════════════════════════════════════════════

  function _initGroups(exam) {
    // New format: exam.groups array
    if (Array.isArray(exam.groups) && exam.groups.length) {
      return exam.groups.map(g => ({
        id:          g.id || ('grp_' + Date.now() + '_' + Math.random().toString(36).slice(2,5)),
        name:        g.name || 'Nhóm câu hỏi',
        pick_count:  parseInt(g.pick_count) || 1,
        group_points: parseFloat(g.group_points) || parseFloat(g.points_each) || 1.0,
        pool:        new Set(g.question_ids || []),
      }));
    }
    // Migration: single flat list → one default group
    if ((exam.bai_tap || []).length) {
      return [{
        id:          'grp_migrate_' + Date.now(),
        name:        'Nhóm câu hỏi',
        pick_count:  (exam.bai_tap || []).length,
        group_points: 10.0,
        pool:        new Set(exam.bai_tap || []),
      }];
    }
    // Brand new exam → one empty group
    return [_newGroup(0)];
  }

  function _newGroup(idx) {
    return {
      id:          'grp_' + Date.now() + '_' + (idx||0),
      name:        'Nhóm ' + ((idx||0) + 1),
      pick_count:  1,
      group_points: 0.0,
      pool:        new Set(),
    };
  }

  function _totalPickCount() {
    return _groups.reduce((s, g) => s + (parseInt(g.pick_count)||0), 0);
  }

  function _totalPoints() {
    return _groups.reduce((s, g) => s + (parseFloat(g.group_points)||0), 0);
  }

  const EXAM_MAX_PTS = 10;
  function _perQuestion(g) {
    const pc = parseInt(g.pick_count)||1;
    const gp = parseFloat(g.group_points)||0;
    return gp / pc;
  }
  function _autoBalance() { _autoDistribute(); }

  function _autoDistribute() {
    if (!_groups.length) return;
    const each = +(10 / _groups.length).toFixed(2);
    let rem = 10;
    _groups.forEach((g, i) => {
      g.group_points = i === _groups.length - 1
        ? +rem.toFixed(2)
        : each;
      rem = +(rem - each).toFixed(2);
    });
    _refreshGroupsList();
    _updateSummary();
  }

  // ── All question IDs already assigned to ANY group ────────────
  function _assignedIds() {
    const all = new Set();
    _groups.forEach(g => g.pool.forEach(id => all.add(id)));
    return all;
  }

  // ── Which group owns an exercise id ──────────────────────────
  function _ownerGroup(exId) {
    return _groups.find(g => g.pool.has(exId)) || null;
  }

  // ════════════════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════════════════

  function _buildGroupsTab(exam) {
    const allExs = Registry.getAll();
    return `
      <div class="ecf-grp-topbar">
        <span class="ecf-grp-topbar-info" id="ecf-grp-info">
          ${_grpInfoText()}
        </span>
        <div style="display:flex;gap:6px">
          <button type="button" class="ecf-btn-auto-dist"
            onclick="CL.Teacher.Exams._autoDistribute()" title="Chia đều 10 điểm cho các nhóm">
            ⚖️ Chia đều 10đ
          </button>
          <button type="button" class="ecf-btn-add-grp"
            onclick="CL.Teacher.Exams._addGroup()">+ Thêm nhóm</button>
        </div>
      </div>
      <div id="ecf-grp-list">
        ${_groups.map((g, i) => _renderGroupCard(g, i, allExs)).join('')}
      </div>
      <div class="ecf-grp-addrow">
        <button type="button" class="ecf-grp-add-big"
          onclick="CL.Teacher.Exams._addGroup()">
          + Thêm nhóm câu hỏi
        </button>
      </div>

      <!-- ── Ma trận đề preview (TT26/2022) ───────────────────── -->
      <div class="ecf-matrix-section" id="ecf-matrix-section">
        <div class="ecf-matrix-header">
          <span class="ecf-matrix-title">📊 Ma trận đề (TT26/2022)</span>
          <button type="button" class="ecf-matrix-toggle"
            onclick="CL.Teacher.Exams.refreshMatrix()">🔄 Cập nhật</button>
        </div>
        <div id="ecf-matrix-body">
          <div class="ecf-matrix-hint">Thêm câu hỏi rồi nhấn Cập nhật để xem ma trận.</div>
        </div>
      </div>`;
  }

  function _grpInfoText() {
    const total = _totalPickCount();
    const pts   = _totalPoints();
    const ptsFmt = pts % 1 === 0 ? pts.toFixed(0) : pts.toFixed(1);
    const pool  = _assignedIds().size;
    const ptsStr = pts.toFixed(2).replace(/\.?0+$/, '') + '/10';
    return total
      ? `${_groups.length} nhóm · ${total} câu ra · ${ptsStr} điểm · ngân hàng ${pool} bài`
      : 'Tạo nhóm rồi thêm câu hỏi từ ngân hàng';
  }

  function _renderGroupCard(g, idx, allExs) {
    allExs = allExs || Registry.getAll();
    const color   = GROUP_COLORS[idx % GROUP_COLORS.length];
    const poolArr = [...g.pool].map(id => Registry.findById(id)).filter(Boolean);
    const total   = (parseFloat(g.group_points)||0).toFixed(1);
    const warn    = g.pool.size < (parseInt(g.pick_count)||0);

    return `<div class="ecf-grp-card" id="gc-${g.id}">
      <div class="ecf-grp-accent" style="background:${color}"></div>
      <div class="ecf-grp-inner">

        <!-- header row -->
        <div class="ecf-grp-header">
          <input class="ecf-grp-name-inp" type="text" value="${Utils.escHtml(g.name)}"
            oninput="CL.Teacher.Exams._onGrpName('${g.id}',this.value)">
          <div class="ecf-grp-controls">
            <span class="ecf-grp-ctl-lbl">Lấy</span>
            <input class="ecf-grp-num" type="number" min="1" max="99"
              value="${g.pick_count}" id="gpc-${g.id}"
              oninput="CL.Teacher.Exams._onGrpPick('${g.id}',this.value)">
            <span class="ecf-grp-ctl-lbl">câu</span>
            <span class="ecf-grp-sep">·</span>
            <span class="ecf-grp-ctl-lbl">Điểm nhóm:</span>
            <input class="ecf-grp-num ecf-grp-pts-inp" type="number" min="0" max="10" step="0.25"
              value="${g.group_points}" id="gpt-${g.id}"
              oninput="CL.Teacher.Exams._onGrpPts('${g.id}',this.value)">
            <span class="ecf-grp-ctl-lbl">đ</span>
            <span class="ecf-grp-ppq" id="gppq-${g.id}" style="color:var(--text3)">
              = ${(g.pick_count > 0 ? (parseFloat(g.group_points)||0)/g.pick_count : 0).toFixed(2)}đ/câu
            </span>
          </div>
          <button class="ecf-grp-del-btn" title="Xóa nhóm"
            onclick="CL.Teacher.Exams._removeGroup('${g.id}')">✕</button>
        </div>

        <!-- pool list -->
        <div class="ecf-grp-pool" id="gpool-${g.id}">
          ${_renderPool(g, poolArr, color)}
        </div>

        <!-- pool status bar -->
        <div class="ecf-grp-poolstat ${warn?'ecf-poolstat-warn':''}" id="gstat-${g.id}">
          ${_renderPoolStat(g)}
        </div>

        <!-- add from bank button -->
        <button type="button" class="ecf-grp-addbank-btn"
          onclick="CL.Teacher.Exams._toggleBankPicker('${g.id}')">
          <span id="gbank-arrow-${g.id}">▶</span> Thêm từ ngân hàng bài tập
        </button>

        <!-- bank picker (hidden) -->
        <div class="ecf-bank-picker" id="bank-${g.id}" style="display:none">
          ${_renderBankPicker(g, allExs)}
        </div>

      </div>
    </div>`;
  }

  function _renderPool(g, poolArr, color) {
    if (!poolArr || !poolArr.length) {
      return `<div class="ecf-pool-empty">Chưa có câu hỏi. Nhấn "Thêm từ ngân hàng" bên dưới.</div>`;
    }
    return poolArr.map(e => {
      const bl = (e.id.match(/-b([1-6])-/)||[])[1]||'3';
      return `<div class="ecf-pool-item">
        <span class="ecf-bl-dot" style="background:${BLOOM_COLOR['b'+bl]}">B${bl}</span>
        <span class="ecf-pool-title">${Utils.escHtml(e.num)} — ${Utils.escHtml(e.title)}</span>
        <span class="ecf-pool-lv">${Utils.escHtml(e.lv||'')}</span>
        <button class="ecf-pool-rm" title="Xóa khỏi nhóm"
          onclick="CL.Teacher.Exams._removeFromPool('${g.id}','${Utils.escHtml(e.id)}')">×</button>
      </div>`;
    }).join('');
  }

  function _renderPoolStat(g) {
    const pc   = parseInt(g.pick_count)||0;
    const size = g.pool.size;
    const warn = size < pc;
    if (warn) {
      return `<span>Ngân hàng: <b>${size}</b> bài</span>
              <span class="ecf-pool-warn">⚠️ Cần thêm ${pc - size} bài nữa để rút đủ ${pc} câu</span>`;
    }
    return `<span>Ngân hàng: <b>${size}</b> bài</span>
            <span>Rút ngẫu nhiên: <b>${pc}</b> câu khi thi</span>`;
  }

  function _renderBankPicker(g, allExs) {
    allExs = allExs || Registry.getAll();
    const groups = Utils.groupBy(allExs, e => e.g);
    const rows = Object.entries(groups).map(([grade, exs]) => {
      const byChap = Utils.groupBy(exs, e => e.ch || 'Chung');
      return Object.entries(byChap).map(([ch, ces]) => {
        const items = ces.map(e => {
          const bl    = (e.id.match(/-b([1-6])-/)||[])[1]||'3';
          const inMe  = g.pool.has(e.id);
          const owner = _ownerGroup(e.id);
          const inOther = owner && owner.id !== g.id;
          return `<div class="ecf-bank-item ${inMe?'ecf-bank-in-me':''} ${inOther?'ecf-bank-in-other':''}"
            data-bloom="b${bl}"
            data-q="${Utils.escHtml(((e.num||'')+(e.title||'')+grade+ch).toLowerCase())}">
            <span class="ecf-bl-dot" style="background:${BLOOM_COLOR['b'+bl]}">B${bl}</span>
            <span class="ecf-bank-title">${Utils.escHtml(e.num)} — ${Utils.escHtml(e.title)}</span>
            <span class="ecf-bank-chapter">${Utils.escHtml(ch)}</span>
            ${inMe
              ? `<span class="ecf-bank-tag ecf-bank-tag-mine">✓ Trong nhóm</span>`
              : inOther
                ? `<span class="ecf-bank-tag ecf-bank-tag-other">Nhóm: ${Utils.escHtml(owner.name)}</span>`
                : `<button class="ecf-bank-add-btn"
                    onclick="CL.Teacher.Exams._addToPool('${g.id}','${Utils.escHtml(e.id)}')">+ Thêm</button>`
            }
          </div>`;
        }).join('');
        return `<div class="ecf-bank-chap-head">${Utils.escHtml(grade)} · ${Utils.escHtml(ch)}</div>${items}`;
      }).join('');
    }).join('');

    return `<div class="ecf-bank-toolbar">
      <input class="ecf-bank-search ecf-search" type="text"
        placeholder="🔍 Tìm bài..."
        oninput="CL.Teacher.Exams._filterBank('${g.id}',this.value,null)">
      <div class="ecf-bloom-filter">
        <button type="button" class="ecf-bloom-ftag ecf-ftag-active" data-bloom="all"
          onclick="CL.Teacher.Exams._filterBank('${g.id}',null,'all',this)">Tất cả</button>
        ${BLOOM.map(lv => `
          <button type="button" class="ecf-bloom-ftag" data-bloom="${lv}"
            style="--bc:${BLOOM_COLOR[lv]}"
            onclick="CL.Teacher.Exams._filterBank('${g.id}',null,'${lv}',this)">
            ${BLOOM_LABEL[lv]}
          </button>`).join('')}
      </div>
    </div>
    <div class="ecf-bank-items" id="banks-${g.id}">${rows}</div>`;
  }

  // ════════════════════════════════════════════════════════════════
  //  GROUP MANAGEMENT
  // ════════════════════════════════════════════════════════════════

  function _addGroup() {
    const g = _newGroup(_groups.length);
    _groups.push(g);
    _refreshGroupsList();
    _updateSummary();
    // scroll to new group
    setTimeout(() => document.getElementById('gc-'+g.id)?.scrollIntoView({behavior:'smooth',block:'nearest'}), 50);
  }

  function _removeGroup(gid) {
    if (_groups.length === 1) {
      Toast.warn('Cần ít nhất 1 nhóm câu hỏi');
      return;
    }
    _groups = _groups.filter(g => g.id !== gid);
    _refreshGroupsList();
    _updateSummary();
  }

  function _onGrpName(gid, val) {
    const g = _groups.find(x => x.id === gid);
    if (g) g.name = val;
  }

  function _onGrpPick(gid, val) {
    const g = _groups.find(x => x.id === gid);
    if (!g) return;
    g.pick_count = Math.max(1, parseInt(val)||1);
    const warn   = g.pool.size < g.pick_count;
    const ppqEl  = document.getElementById('gppq-'+gid);
    const stEl   = document.getElementById('gstat-'+gid);
    if (ppqEl) ppqEl.textContent = '= ' + (g.pick_count > 0 ? ((parseFloat(g.group_points)||0)/g.pick_count).toFixed(2) : '0.00') + 'đ/câu';
    if (stEl)  { stEl.innerHTML = _renderPoolStat(g); stEl.className = 'ecf-grp-poolstat '+(warn?'ecf-poolstat-warn':''); }
    _updateSummary();
  }

  function _onGrpPts(gid, val) {
    const g = _groups.find(x => x.id === gid);
    if (!g) return;
    g.group_points = Math.max(0, Math.min(10, parseFloat(val)||0));
    const ppqEl = document.getElementById('gppq-'+gid);
    if (ppqEl) ppqEl.textContent = '= ' + (g.pick_count > 0 ? (g.group_points/g.pick_count).toFixed(2) : '0.00') + 'đ/câu';
    _updateSummary();
  }

  function _addToPool(gid, exId) {
    const g = _groups.find(x => x.id === gid);
    if (!g) return;
    g.pool.add(exId);
    _refreshPoolSection(g);
    _refreshBankItems(g);          // update bank status across all groups
    _groups.forEach(other => {
      if (other.id !== gid) _refreshBankItems(other);
    });
    _updateSummary();
    _scheduleMatrixRefresh();
  }

  function _removeFromPool(gid, exId) {
    const g = _groups.find(x => x.id === gid);
    if (!g) return;
    g.pool.delete(exId);
    _refreshPoolSection(g);
    _refreshBankItems(g);
    _groups.forEach(other => {
      if (other.id !== gid) _refreshBankItems(other);
    });
    _updateSummary();
    _scheduleMatrixRefresh();
  }

  let _matrixTimer = null;
  function _scheduleMatrixRefresh() {
    clearTimeout(_matrixTimer);
    _matrixTimer = setTimeout(() => {
      if (document.getElementById('ecf-matrix-body')) refreshMatrix();
    }, 600);
  }

  function _toggleBankPicker(gid) {
    const panel = document.getElementById('bank-'+gid);
    const arrow = document.getElementById('gbank-arrow-'+gid);
    if (!panel) return;
    const open = panel.style.display === 'none';
    panel.style.display = open ? 'block' : 'none';
    if (arrow) arrow.textContent = open ? '▼' : '▶';
    if (open) {
      // refresh bank contents when opening
      const g = _groups.find(x => x.id === gid);
      if (g) {
        const itemsEl = document.getElementById('banks-'+gid);
        if (itemsEl) itemsEl.parentElement && _rebuildBankPicker(g);
      }
    }
  }

  function _filterBank(gid, q, bloom, btn) {
    if (bloom !== null && btn) {
      document.querySelectorAll(`#bank-${gid} .ecf-bloom-ftag`).forEach(b => b.classList.remove('ecf-ftag-active'));
      btn.classList.add('ecf-ftag-active');
    }
    const container = document.getElementById('banks-'+gid);
    if (!container) return;
    const activeBloom = bloom !== null ? bloom
      : document.querySelector(`#bank-${gid} .ecf-bloom-ftag.ecf-ftag-active`)?.dataset.bloom || 'all';
    const searchQ = q !== null ? q.toLowerCase()
      : document.querySelector(`#bank-${gid} .ecf-bank-search`)?.value?.toLowerCase() || '';
    container.querySelectorAll('.ecf-bank-item').forEach(item => {
      const matchQ     = !searchQ || item.dataset.q?.includes(searchQ);
      const matchBloom = activeBloom === 'all' || item.dataset.bloom === activeBloom;
      item.style.display = (matchQ && matchBloom) ? '' : 'none';
    });
    container.querySelectorAll('.ecf-bank-chap-head').forEach(head => {
      const next = head.nextElementSibling;
      let visible = false;
      let el = next;
      while (el && !el.classList.contains('ecf-bank-chap-head')) {
        if (el.style.display !== 'none') visible = true;
        el = el.nextElementSibling;
      }
      head.style.display = visible ? '' : 'none';
    });
  }

  // ── Targeted re-renders (avoid full card re-render to preserve input focus) ──

  function _refreshPoolSection(g) {
    const poolEl = document.getElementById('gpool-'+g.id);
    const statEl = document.getElementById('gstat-'+g.id);
    const totEl  = document.getElementById('gtot-'+g.id);
    const poolArr = [...g.pool].map(id => Registry.findById(id)).filter(Boolean);
    if (poolEl) poolEl.innerHTML = _renderPool(g, poolArr, GROUP_COLORS[_groups.indexOf(g) % GROUP_COLORS.length]);
    if (statEl) {
      statEl.innerHTML   = _renderPoolStat(g);
      statEl.className   = 'ecf-grp-poolstat ' + (g.pool.size < g.pick_count ? 'ecf-poolstat-warn' : '');
    }
    const ppq = g.pick_count > 0 ? (parseFloat(g.group_points)||0) / g.pick_count : 0;
    if (totEl) totEl.textContent = ppq.toFixed(2) + 'đ/câu';
  }

  function _refreshBankItems(g) {
    const bank = document.getElementById('bank-'+g.id);
    if (!bank || bank.style.display === 'none') return; // skip if closed
    _rebuildBankPicker(g);
  }

  function _rebuildBankPicker(g) {
    const bank = document.getElementById('bank-'+g.id);
    if (!bank) return;
    const searchQ  = bank.querySelector('.ecf-bank-search')?.value || '';
    const activeB  = bank.querySelector('.ecf-bloom-ftag.ecf-ftag-active')?.dataset.bloom || 'all';
    const itemsEl  = document.getElementById('banks-'+g.id);
    if (itemsEl) {
      const allExs  = Registry.getAll();
      const groups  = Utils.groupBy(allExs, e => e.g);
      const rows = Object.entries(groups).map(([grade, exs]) => {
        const byChap = Utils.groupBy(exs, e => e.ch || 'Chung');
        return Object.entries(byChap).map(([ch, ces]) => {
          const items = ces.map(e => {
            const bl      = (e.id.match(/-b([1-6])-/)||[])[1]||'3';
            const inMe    = g.pool.has(e.id);
            const owner   = _ownerGroup(e.id);
            const inOther = owner && owner.id !== g.id;
            return `<div class="ecf-bank-item ${inMe?'ecf-bank-in-me':''} ${inOther?'ecf-bank-in-other':''}"
              data-bloom="b${bl}"
              data-q="${Utils.escHtml(((e.num||'')+(e.title||'')+grade+ch).toLowerCase())}">
              <span class="ecf-bl-dot" style="background:${BLOOM_COLOR['b'+bl]}">B${bl}</span>
              <span class="ecf-bank-title">${Utils.escHtml(e.num)} — ${Utils.escHtml(e.title)}</span>
              <span class="ecf-bank-chapter">${Utils.escHtml(ch)}</span>
              ${inMe
                ? `<span class="ecf-bank-tag ecf-bank-tag-mine">✓ Trong nhóm</span>`
                : inOther
                  ? `<span class="ecf-bank-tag ecf-bank-tag-other">${Utils.escHtml(owner.name)}</span>`
                  : `<button class="ecf-bank-add-btn"
                      onclick="CL.Teacher.Exams._addToPool('${g.id}','${Utils.escHtml(e.id)}')">+ Thêm</button>`
              }
            </div>`;
          }).join('');
          return `<div class="ecf-bank-chap-head">${Utils.escHtml(grade)} · ${Utils.escHtml(ch)}</div>${items}`;
        }).join('');
      }).join('');
      itemsEl.innerHTML = rows;
    }
    // Reapply filter
    _filterBank(g.id, searchQ || null, activeB !== 'all' ? activeB : null, null);
    if (activeB && activeB !== 'all') {
      bank.querySelectorAll('.ecf-bloom-ftag').forEach(b =>
        b.classList.toggle('ecf-ftag-active', b.dataset.bloom === activeB));
    }
  }

  function _refreshGroupsList() {
    const list = document.getElementById('ecf-grp-list');
    if (!list) return;
    const allExs = Registry.getAll();
    list.innerHTML = _groups.map((g,i) => _renderGroupCard(g,i,allExs)).join('');
    const info = document.getElementById('ecf-grp-info');
    if (info) info.textContent = _grpInfoText();
  }

  // ════════════════════════════════════════════════════════════════
  //  LIVE SUMMARY SIDEBAR
  // ════════════════════════════════════════════════════════════════

  function _updateSummary() {
    const ten  = document.getElementById('ef-ten')?.value?.trim() || '—';
    const tg   = document.getElementById('ef-tg')?.value || '45';
    const bd   = document.getElementById('ef-ngay-bd')?.value || '';
    const kt   = document.getElementById('ef-ngay-kt')?.value || '';
    const pass = document.getElementById('ef-matkhau')?.value?.trim() || '';
    const lops = [...document.querySelectorAll('.ecf-lop-cb:checked')].map(c => c.value);

    _s('sum-ten',       ten.length > 42 ? ten.slice(0,40)+'…' : ten);
    _s('sum-lop-count', lops.length || (_classes.length ? _classes.length : '—'));
    _s('sum-ex-count',  _totalPickCount());
    _s('sum-tg',        tg + "'");
    _s('sum-date',      bd && kt ? `${_fmtDate(bd)} → ${_fmtDate(kt)}` : bd ? _fmtDate(bd) : '—');

    const passRow = document.getElementById('sum-pass-row');
    if (passRow) passRow.style.display = pass ? '' : 'none';
    _s('sum-pass', pass ? '🔐 ' + pass : '');

    // Groups summary
    const grpEl = document.getElementById('sum-groups');
    if (grpEl) {
      if (!_groups.length || !_totalPickCount()) {
        grpEl.innerHTML = '<span style="color:var(--text3);font-size:11px">Chưa tạo nhóm</span>';
      } else {
        grpEl.innerHTML = _groups.map((g, i) => {
          const color = GROUP_COLORS[i % GROUP_COLORS.length];
          const pts   = (parseFloat(g.group_points)||0).toFixed(1);
          const ppq   = g.pick_count > 0 ? (parseFloat(g.group_points)||0)/g.pick_count : 0;
          const warn  = g.pool.size < (parseInt(g.pick_count)||0) && g.pool.size > 0;
          return `<div class="ecf-sum-grp-row">
            <span class="ecf-sum-grp-dot" style="background:${color}"></span>
            <div class="ecf-sum-grp-info">
              <span class="ecf-sum-grp-name">${Utils.escHtml(g.name)}</span>
              <span class="ecf-sum-grp-meta">
                pool ${g.pool.size} · chọn ${g.pick_count} · ${pts}đ nhóm · ${ppq.toFixed(2)}đ/câu
                ${warn ? ' ⚠️' : ''}
              </span>
            </div>
          </div>`;
        }).join('');
      }
    }

    // Total points progress bar
    const total   = _totalPoints();
    const pct     = Math.min(100, total / EXAM_MAX_PTS * 100);
    const over    = total > EXAM_MAX_PTS + 0.001;
    const exact   = Math.abs(total - EXAM_MAX_PTS) < 0.001;
    const ptsEl   = document.getElementById('sum-total-pts');
    const barEl   = document.getElementById('sum-pts-bar');
    const statEl  = document.getElementById('sum-pts-status');
    const balBtn  = document.getElementById('ecf-btn-balance');
    if (ptsEl)  ptsEl.textContent  = total.toFixed(1) + ' / ' + EXAM_MAX_PTS + 'đ';
    if (barEl)  { barEl.style.width = pct + '%'; barEl.className = 'ecf-pts-bar-fill' + (over?' ecf-pts-over':exact?' ecf-pts-exact':''); }
    if (statEl) statEl.innerHTML   = exact ? '<span class="ecf-pts-ok">✓ Đúng 10 điểm</span>'
                                   : over  ? `<span class="ecf-pts-warn">⚠ Vượt ${(total-EXAM_MAX_PTS).toFixed(1)}đ</span>`
                                           : `<span class="ecf-pts-short">Còn thiếu ${(EXAM_MAX_PTS-total).toFixed(1)}đ</span>`;
    if (balBtn) balBtn.style.display = exact ? 'none' : '';

    // Update badges
    const exBadge  = document.getElementById('tab-badge-questions');
    const lopBadge = document.getElementById('tab-badge-assign');
    if (exBadge)  exBadge.textContent  = _totalPickCount();
    if (lopBadge) lopBadge.textContent = lops.length || (_classes.length || '—');

    // Update groups info bar
    const info = document.getElementById('ecf-grp-info');
    if (info) info.textContent = _grpInfoText();
  }

  function _s(id, txt) { const el = document.getElementById(id); if (el) el.textContent = txt; }

  // ── Interaction helpers ──────────────────────────────────────

  function _toggleGroup(headEl) { headEl.closest('.ecf-group')?.classList.toggle('collapsed'); }

  function _onLopChange(cb) {
    cb.closest('.ecf-lop-card')?.classList.toggle('selected', cb.checked);
    _updateSummary();
  }

  function _selectAllLops(on) {
    document.querySelectorAll('.ecf-lop-cb').forEach(cb => {
      cb.checked = on;
      cb.closest('.ecf-lop-card')?.classList.toggle('selected', on);
    });
    _updateSummary();
  }

  function _selectGroup(grp, on) {
    document.querySelectorAll(`.ecf-ex-cb[data-grp="${grp}"]`).forEach(cb => cb.checked = on);
    document.querySelectorAll(`.ecf-ex-item[data-grp="${grp}"]`).forEach(el => el.classList.toggle('ecf-ex-checked', on));
    _updateSummary();
  }

  function _selectBloom(bloom, grp) {
    const boxes = document.querySelectorAll(`.ecf-ex-cb[data-grp="${grp}"][data-bloom="${bloom}"]`);
    const all   = [...boxes].every(b => b.checked);
    boxes.forEach(b => { b.checked = !all; b.closest('.ecf-ex-item')?.classList.toggle('ecf-ex-checked', !all); });
    _updateSummary();
  }

  function filterEx(q) {
    q = (q||'').toLowerCase();
    document.querySelectorAll('.ecf-ex-item').forEach(item =>
      item.style.display = (!q || item.dataset.q?.includes(q)) ? '' : 'none'
    );
  }

  function _filterBloom(btn, bloom) {
    document.querySelectorAll('.ecf-bloom-ftag').forEach(b => b.classList.remove('ecf-ftag-active'));
    btn.classList.add('ecf-ftag-active');
    document.querySelectorAll('.ecf-ex-item').forEach(item =>
      item.style.display = (bloom === 'all' || item.dataset.bloom === bloom) ? '' : 'none'
    );
  }

  function _genCode() {
    const c    = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    const code = Array.from({length:6}, () => c[Math.random()*c.length|0]).join('');
    const inp  = document.getElementById('ef-matkhau');
    if (inp) { inp.value = code; inp.focus(); _updateSummary(); }
  }

  function _parseLops(lopStr) {
    if (!lopStr) return [];
    if (Array.isArray(lopStr)) return lopStr.filter(Boolean);
    return lopStr.split(',').map(s => s.trim()).filter(Boolean);
  }

  function _fmtDate(d) {
    if (!d) return '';
    const [y,m,day] = d.split('-');
    return day ? `${day}/${m}/${y}` : d;
  }

  function _closeForm() {
    const root = document.getElementById('exam-form-root');
    if (root) { root.style.display = 'none'; root.innerHTML = ''; }
    document.querySelector('.ec-list-grid')?.style.removeProperty('display');
    document.querySelector('.ec-list-toolbar')?.style.removeProperty('display');
  }

  // ════════════════════════════════════════════════════════════════
  // ════════════════════════════════════════════════════════════════
  //  SAVE / PUBLISH
  // ════════════════════════════════════════════════════════════════

  async function saveExam(existId, forceStatus) {
    const msgEl     = document.getElementById('ecf-msg');
    const saveMsgEl = document.getElementById('ecf-save-msg');
    const _m = (txt, type='info') => {
      if (msgEl)     { msgEl.textContent = txt;     msgEl.className     = 'ecf-msg ecf-msg-'+type; }
      if (saveMsgEl) { saveMsgEl.textContent = txt; saveMsgEl.className = 'ecf-save-msg ecf-sm-'+type; }
    };

    const ten = document.getElementById('ef-ten')?.value?.trim();
    if (!ten) {
      _m('⚠️ Vui lòng nhập tên kỳ kiểm tra', 'warn');
      document.getElementById('ef-ten')?.focus();
      return;
    }

    // Validate groups
    const totalPick = _totalPickCount();
    if (!totalPick) {
      _m('⚠️ Cần ít nhất 1 câu hỏi (chuyển sang tab Câu hỏi)', 'warn');
      const btn = document.querySelector('.ecf-tab[data-tab="questions"]');
      _switchTab('questions', btn);
      return;
    }
    const emptyGroups = _groups.filter(g => g.pool.size === 0);
    if (emptyGroups.length) {
      _m(`⚠️ Nhóm "${emptyGroups[0].name}" chưa có câu hỏi`, 'warn');
      const btn = document.querySelector('.ecf-tab[data-tab="questions"]');
      _switchTab('questions', btn);
      return;
    }
    const underpoolGroups = _groups.filter(g => g.pool.size < (parseInt(g.pick_count)||0));
    const totalPts = _totalPoints();
    const ptsOk = Math.abs(totalPts - 10) < 0.01;
    if (!ptsOk) {
      const diff = (10 - totalPts).toFixed(2);
      const sign = diff > 0 ? '+' : '';
      _m(`⚠️ Tổng điểm = ${totalPts.toFixed(2)}đ (cần đúng 10đ, còn ${sign}${diff}đ). Nhấn ⚖️ để tự động cân bằng.`, 'warn');
      if (!await Toast.confirm(`Tổng điểm hiện tại là ${totalPts.toFixed(2)}đ, không phải 10đ. Tiếp tục lưu?`)) return;
    }
    if (underpoolGroups.length) {
      _m(`⚠️ Nhóm "${underpoolGroups[0].name}": ngân hàng ít hơn số câu cần rút`, 'warn');
    }

    const lopIds = [...document.querySelectorAll('.ecf-lop-cb:checked')].map(c => c.value);

    // Collect groups data
    const groupsData = _groups.map((g, i) => ({
      id:           g.id,
      name:         g.name,
      pick_count:   parseInt(g.pick_count)||1,
      group_points: parseFloat(g.group_points)||0,
      points_each:  (parseInt(g.pick_count)||1) > 0
                      ? (parseFloat(g.group_points)||0) / (parseInt(g.pick_count)||1)
                      : 0,
      thu_tu:       i + 1,
      question_ids: [...g.pool],
    }));

    // Flatten for backward compat
    let globalOrder = 0;
    const baiTapDetail = [];
    groupsData.forEach(g => {
      g.question_ids.forEach(bai_id => {
        const ex = Registry.findById(bai_id);
        const bl = (bai_id.match(/-b([1-6])-/)||[])[1]||'3';
        baiTapDetail.push({
          bai_id,
          thu_tu:       ++globalOrder,
          nhom:         g.name,
          group_id:     g.id,
          bloom_level:  'b'+bl,
          diem_co_phan: g.pick_count > 0 ? (parseFloat(g.group_points)||0) / g.pick_count : 1.0,
        });
      });
    });

    if (underpoolGroups.length && forceStatus === 'active') {
      if (!await Toast.confirm('Có nhóm ngân hàng ít hơn số câu cần rút. Tiếp tục công bố?')) return;
    }

    _m('⏳ Đang lưu...', 'info');
    try {
      const status = forceStatus || (existId ? undefined : 'draft');
      const r = await CL.API.saveExam({
        id:                  existId || undefined,
        ten,
        lop:                 lopIds.join(','),
        lop_ids:             lopIds,
        thoi_gian_phut:      parseInt(document.getElementById('ef-tg')?.value)||45,
        ngay_bat_dau:        document.getElementById('ef-ngay-bd')?.value    || '',
        ngay_ket_thuc:       document.getElementById('ef-ngay-kt')?.value    || '',
        ngay_thi:            document.getElementById('ef-ngay-bd')?.value    || '',
        gio_mo:              document.getElementById('ef-gio-mo')?.value     || '07:00',
        gio_dong:            document.getElementById('ef-gio-dong')?.value   || '17:00',
        mo_ta:               document.getElementById('ef-mota')?.value?.trim() || '',
        trang_thai:          status,
        che_do_tron_de:      document.getElementById('ef-tron')?.checked       || false,
        toan_ven_1_lan:      document.getElementById('ef-1lan')?.checked       || false,
        cho_xem_dap_an:      document.getElementById('ef-dapan')?.checked      || false,
        bat_buoc_fullscreen: document.getElementById('ef-fullscreen')?.checked || false,
        mat_khau:            document.getElementById('ef-matkhau')?.value?.trim() || '',
        so_bai_random:       0,   // handled per-group now
        so_lan_thi_max:      parseInt(document.getElementById('ef-so-lan')?.value)||0,
        bloom_filter:        '',  // not needed with group model
        groups:              groupsData,
        bai_tap:             baiTapDetail.map(b => b.bai_id),
        bai_tap_detail:      baiTapDetail,
      });
      _m(`✅ ${status==='active'?'Công bố':'Lưu nháp'} thành công!`, 'ok');
      Events.emit('exam:saved', {id: r.id, status});
      setTimeout(() => { _closeForm(); CL.Teacher.Panel.switchTab('exams'); }, 1400);
    } catch(e) { _m('❌ ' + e.message, 'err'); }
  }

  // ════════════════════════════════════════════════════════════════
  //  EDIT / TOGGLE / DELETE
  // ════════════════════════════════════════════════════════════════

  async function editExam(id) {
    const exams = await CL.API.getExams(true);
    const exam  = exams.find(e => e.id === id);
    if (exam) showForm(exam);
  }

  async function toggleExam(id, cur) {
    const next = cur === 'active' ? 'closed' : 'active';
    if (!await Toast.confirm(`${next==='active'?'🟢 Mở':'🔴 Đóng'} kỳ kiểm tra này?`)) return;
    await CL.API.setExamStatus(id, next);
    Events.emit('exam:status-changed', {examId: id, status: next});
    CL.Teacher.Panel.switchTab('exams');
  }

  async function deleteExam(id) {
    if (!await Toast.confirm('🗑 Xóa kỳ kiểm tra? Không thể hoàn tác.')) return;
    await CL.API.deleteExam(id);
    CL.Teacher.Panel.switchTab('exams');
  }

  // ════════════════════════════════════════════════════════════════
  //  RESULTS VIEW
  // ════════════════════════════════════════════════════════════════

  async function viewResults(examId) {
    const body = document.getElementById('tp-body');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tải kết quả...</div>';
    try {
      const scores     = await CL.API.getScores(true);
      const examScores = scores.filter(s => s.ky_kt_id === examId || s.bai_id === examId);

      if (!examScores.length) {
        body.innerHTML = `<div class="tp-empty">📭 Chưa có học sinh nộp bài.
          <br><button class="ec-act-btn" style="margin-top:10px"
            onclick="CL.Teacher.Panel.switchTab('exams')">← Quay lại</button></div>`;
        return;
      }

      const avg    = examScores.reduce((s, r) => s + (parseFloat(r.diem)||0), 0) / examScores.length;
      const byLop  = Utils.groupBy(examScores, s => s.lop || 'Chưa rõ');
      const dist   = [['≥9','#10b981'],['7–9','#3b82f6'],['5–7','#f59e0b'],['<5','#ef4444']];
      const dCounts = [0,0,0,0];
      examScores.forEach(r => {
        const d = parseFloat(r.diem)||0;
        if (d >= 9) dCounts[0]++;
        else if (d >= 7) dCounts[1]++;
        else if (d >= 5) dCounts[2]++;
        else dCounts[3]++;
      });
      const total = examScores.length;

      body.innerHTML = `
        <div class="ec-result-header">
          <button class="ec-act-btn" onclick="CL.Teacher.Panel.switchTab('exams')">← Danh sách</button>
          <div class="ec-result-title">Kết quả kỳ thi</div>
          <button class="ec-act-btn"
            onclick="CL.Teacher.Exams.exportResultsCsv('${examId}')">📥 Xuất CSV</button>
        </div>
        <div class="ec-result-stats">
          <div class="tp-stat"><div class="tp-stat-n">${new Set(examScores.map(r=>r.mshs)).size}</div><div class="tp-stat-l">Học sinh</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${total}</div><div class="tp-stat-l">Bài nộp</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${avg.toFixed(1)}</div><div class="tp-stat-l">Điểm TB</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${Object.keys(byLop).length}</div><div class="tp-stat-l">Lớp tham gia</div></div>
        </div>
        <div class="ec-dist-wrap">
          <div class="ec-dist-label">Phân phối điểm</div>
          <div class="ec-dist-bar">
            ${dist.map(([range, color], i) =>
              `<div class="ec-dist-seg" style="flex:${dCounts[i]||0.01};background:${color}"
                title="${range}: ${dCounts[i]} HS (${Math.round(dCounts[i]/total*100)}%)">
                ${Math.round(dCounts[i]/total*100) > 8
                  ? `<span>${range}<br>${Math.round(dCounts[i]/total*100)}%</span>` : ''}
              </div>`).join('')}
          </div>
          <div class="ec-dist-legend">
            ${dist.map(([range, color], i) =>
              `<span><span style="color:${color}">■</span> ${range}: ${dCounts[i]}</span>`).join('')}
          </div>
        </div>
        <div class="tp-table-wrap">
          <table class="tp-table"><thead><tr>
            <th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>Điểm</th><th>Thời gian nộp</th>
          </tr></thead>
          <tbody>
            ${examScores.slice().reverse().map(r => `<tr>
              <td class="td-mshs">${Utils.escHtml(r.mshs)}</td>
              <td>${Utils.escHtml(r.ho_ten)}</td>
              <td>${Utils.escHtml(r.lop)}</td>
              <td class="td-score ${Utils.scoreClass(r.diem)}">${r.diem}</td>
              <td class="td-time">${Utils.formatTime(r.ts)}</td>
            </tr>`).join('')}
          </tbody></table>
        </div>`;
    } catch(e) {
      body.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  async function exportResultsCsv(examId) {
    const scores = await CL.API.getScores(true);
    const rows   = [['MSHS','Họ tên','Lớp','Điểm','Thời gian nộp']];
    scores.filter(s => s.ky_kt_id === examId || s.bai_id === examId)
          .forEach(r => rows.push([r.mshs, r.ho_ten, r.lop, r.diem, r.ts]));
    Utils.downloadCsv(rows, `ket-qua-ky-thi-${examId.slice(-6)}.csv`);
  }

  // ── Ma trận đề preview ───────────────────────────────────────

  function refreshMatrix() {
    const body = document.getElementById('ecf-matrix-body');
    if (!body) return;

    const allExs = Registry.getAll();
    const cfg    = CL.require('Config');
    const BLOOM_TT26 = cfg.BLOOM_TT26 || {
      B1:'Nhận biết',B2:'Thông hiểu',B3:'Thông hiểu',
      B4:'Vận dụng', B5:'Vận dụng cao',B6:'Vận dụng cao',
    };
    const COLS = ['Nhận biết','Thông hiểu','Vận dụng','Vận dụng cao'];
    const BCOL = {b1:'#6366f1',b2:'#3b82f6',b3:'#10b981',b4:'#f59e0b',b5:'#ef4444',b6:'#8b5cf6'};
    const NLCOL = {NL1:'#4f9eff',NL2:'#34d399',NL3:'#a78bfa'};

    // Collect picked questions from all groups
    const picked = [];
    for (const g of _groups) {
      const ids   = [...(g.pool || new Set())];
      const count = Math.min(parseInt(g.pick_count)||ids.length, ids.length);
      const ptsEach = _totalPoints() > 0 ? (_perQuestion(g)||1) : 1;
      ids.slice(0, count).forEach(id => {
        const ex = allExs.find(e => e.id === id);
        if (!ex) return;
        const bloom = (ex.lv||'').match(/B(\d)/)?.[1] || '3';
        const tt26  = BLOOM_TT26['B'+bloom] || 'Vận dụng';
        const chuDe = (ex.ch||'').replace(/^Bài \d+[:\s]+/i,'').trim() || ex.ch || 'Khác';
        picked.push({ id, bloom, tt26, chuDe, pts: ptsEach });
      });
    }

    if (!picked.length) {
      body.innerHTML = '<div class="ecf-matrix-hint">Chưa có câu hỏi nào trong các nhóm.</div>';
      return;
    }

    const totalQ = picked.length;
    const totalPts = picked.reduce((s,p)=>s+p.pts,0);
    const chudSet = [...new Set(picked.map(p=>p.chuDe))];

    // Bloom distribution
    const bloomDist = {};
    picked.forEach(p => { bloomDist['b'+p.bloom] = (bloomDist['b'+p.bloom]||0)+1; });

    // NL distribution (derive from Bloom)
    const bloomNLMap = cfg.BLOOM_NL_MAP||{};
    const nlDist = {NL1:0,NL2:0,NL3:0};
    picked.forEach(p => {
      (bloomNLMap['B'+p.bloom]||[]).forEach(nl => {
        const g = nl.startsWith('NL1')?'NL1':nl.startsWith('NL2')?'NL2':'NL3';
        nlDist[g]++;
      });
    });

    // Matrix
    const matrix = {};
    const colTotals = {};
    COLS.forEach(c=>{ colTotals[c]=0; });
    picked.forEach(p => {
      if (!matrix[p.chuDe]) matrix[p.chuDe] = {};
      if (!matrix[p.chuDe][p.tt26]) matrix[p.chuDe][p.tt26] = {count:0,pts:0};
      matrix[p.chuDe][p.tt26].count++;
      matrix[p.chuDe][p.tt26].pts += p.pts;
      colTotals[p.tt26] = (colTotals[p.tt26]||0) + 1;
    });

    body.innerHTML = `
      <div class="ecf-mx-badges">
        ${['b1','b2','b3','b4','b5','b6'].map(lv => {
          const n = bloomDist[lv]||0;
          if (!n) return '';
          return '<span class="ecf-mx-bloom" style="background:'+BCOL[lv]+'18;color:'+BCOL[lv]+'">B'+lv[1]+' · '+n+' câu · '+Math.round(n/totalQ*100)+'%</span>';
        }).join('')}
        <span class="ecf-mx-total">${totalQ} câu · ${totalPts.toFixed(1)} điểm</span>
      </div>
      <div class="ecf-mx-nl">
        ${['NL1','NL2','NL3'].map(nl => {
          const n = nlDist[nl]; if(!n) return '';
          return '<span class="ecf-mx-nl-badge" style="background:'+NLCOL[nl]+'18;color:'+NLCOL[nl]+'">'+nl+': '+Math.round(n/totalQ*100)+'%</span>';
        }).join('')}
      </div>
      <div class="ecf-mx-table-wrap">
        <table class="ecf-mx-table">
          <thead>
            <tr>
              <th>Chủ đề</th>
              ${COLS.map(c=>'<th>'+c+'<div class="ecf-mx-col-n">'+(colTotals[c]||0)+'</div></th>').join('')}
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            ${chudSet.map(cd => {
              let rowTotal = 0;
              const cells = COLS.map(col => {
                const cell = matrix[cd]?.[col];
                if (!cell?.count) return '<td class="ecf-mx-empty">—</td>';
                rowTotal += cell.count;
                return '<td class="ecf-mx-cell"><span class="ecf-mx-count">'+cell.count+'</span><span class="ecf-mx-pts">'+cell.pts.toFixed(1)+'đ</span></td>';
              }).join('');
              return '<tr><td class="ecf-mx-row-label">'+Utils.escHtml(cd)+'</td>'+cells+'<td class="ecf-mx-row-total">'+rowTotal+'</td></tr>';
            }).join('')}
          </tbody>
          <tfoot>
            <tr class="ecf-mx-foot">
              <td>Tỉ lệ</td>
              ${COLS.map(c=>'<td class="ecf-mx-pct">'+Math.round((colTotals[c]||0)/totalQ*100)+'%</td>').join('')}
              <td>100%</td>
            </tr>
          </tfoot>
        </table>
      </div>`;
  }



  return {
    render, showForm, editExam, saveExam, refreshMatrix,
    toggleExam, deleteExam, viewResults, exportResultsCsv,
    // Group management
    _addGroup, _removeGroup, _onGrpName, _onGrpPick, _onGrpPts, _autoBalance: _autoDistribute, _autoDistribute,
    _toggleBankPicker, _addToPool, _removeFromPool, _filterBank,
    // Tab nav
    _switchTab, _nextTab, _prevTab,
    // Lop helpers
    _onLopChange, _selectAllLops,
    // Misc
    _genCode, _closeForm, _updateSummary, _refreshSchedulePreview,
  };
});

// ─── js/features/teacher/exercises.js ───────────────────────────
/**
 * features/teacher/exercises.js — Ngân hàng bài tập (Teacher/Admin)
 * ═══════════════════════════════════════════════════════════════
 * Tabs: Đề bài (RichText) | Lý thuyết (RichText) | Code mẫu (textarea)
 * Tiêu chí & Hướng dẫn lỗi: xử lý tự động bởi Python grader
 *
 * @requires core/*, CL.API, exercises/registry.js, CL.Editors.RichText
 */
'use strict';

CL.define('Teacher.ExEditor', () => {
  const Utils    = CL.require('Utils');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  // Theo dõi instance RichText đang mở
  let _currentId = null;

  // ══════════════════════════════════════════════════════════════
  //  RENDER: danh sách bài tập
  // ══════════════════════════════════════════════════════════════

  async function render(el) {
    const Cfg = CL.require('Config');

    el.innerHTML = `
      <div class="ed-selector-bar">
        <div class="ed-sel-group">
          <span class="ed-sel-label">Lớp</span>
          <div class="cdd" id="ed-cdd-grade">
            <button class="cdd-btn tb-cdd-btn" id="ed-cdd-grade-btn"
              onclick="CL.Teacher.ExEditor.openCdd('grade')" type="button">
              <span id="ed-grade-label">— Chọn lớp —</span>
              <span class="cdd-arrow">▾</span>
            </button>
          </div>
        </div>
        <div class="ed-sel-sep"></div>
        <div class="ed-sel-group">
          <span class="ed-sel-label">Chủ đề</span>
          <div class="cdd cdd-locked" id="ed-cdd-chap">
            <button class="cdd-btn tb-cdd-btn" id="ed-cdd-chap-btn"
              onclick="CL.Teacher.ExEditor.openCdd('chap')" type="button" disabled>
              <span id="ed-chap-label">—</span>
              <span class="cdd-arrow">▾</span>
            </button>
          </div>
        </div>
        <div class="ed-sel-sep"></div>
        <div class="ed-sel-group">
          <span class="ed-sel-label">Thang Bloom</span>
          <div class="cdd cdd-locked" id="ed-cdd-bloom">
            <button class="cdd-btn tb-cdd-btn" id="ed-cdd-bloom-btn"
              onclick="CL.Teacher.ExEditor.openCdd('bloom')" type="button" disabled>
              <span id="ed-bloom-label">— Tất cả —</span>
              <span class="cdd-arrow">▾</span>
            </button>
          </div>
        </div>
        <div class="ed-sel-sep"></div>
        <div class="ed-sel-group" style="flex:1;min-width:180px">
          <span class="ed-sel-label">Bài tập</span>
          <div class="cdd cdd-locked" id="ed-cdd-ex">
            <button class="cdd-btn tb-cdd-btn" id="ed-cdd-ex-btn"
              onclick="CL.Teacher.ExEditor.openCdd('ex')" type="button" disabled>
              <span id="ed-ex-label">— Chọn bài —</span>
              <span class="cdd-arrow">▾</span>
            </button>
          </div>
        </div>
        <div style="flex-shrink:0;margin-left:auto">
          <button class="tp-action-btn" onclick="CL.Teacher.ExEditor.syncAll()">
            🔄 Sync Sheets
          </button>
        </div>
      </div>

      <div id="ed-cdd-overlay" onclick="CL.Teacher.ExEditor.closeCdd()"
        style="display:none;position:fixed;inset:0;z-index:999"></div>
      <div id="ed-cdd-popup"
        style="display:none;position:fixed;z-index:1000;min-width:200px;max-height:320px;
               overflow-y:auto;background:var(--surface);border:1px solid var(--border);
               border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.25);padding:4px 0">
        <div id="ed-cdd-popup-list"></div>
      </div>

      <div id="ed-form" class="tp-edit-form" style="display:none"></div>`;

    _edItems.grade = (Cfg.GRADES || []).map(g => ({ value: g.value, text: g.text }));
    _edGrade = _edChap = _edBloom = '';
  }

  // ── CDD state ─────────────────────────────────────────────────
  let _edGrade = '', _edChap = '', _edBloom = '';
  let _edItems = { grade: [], chap: [], bloom: [], ex: [] };
  let _edActiveCdd = null;

  function openCdd(which) {
    const btn = document.getElementById('ed-cdd-' + which + '-btn');
    if (!btn || btn.disabled) return;
    _edActiveCdd = which;
    const overlay = document.getElementById('ed-cdd-overlay');
    const popup   = document.getElementById('ed-cdd-popup');
    const list    = document.getElementById('ed-cdd-popup-list');
    if (!popup || !list) return;
    const items  = _edItems[which] || [];
    const curVal = { grade:_edGrade, chap:_edChap, bloom:_edBloom, ex:'' }[which] || '';
    list.innerHTML = items.length
      ? items.map(it => `<div class="cdd-item${it.value===curVal?' selected':''}"
          onclick="CL.Teacher.ExEditor.selectCdd('${which}','${Utils.escHtml(it.value)}')"
          style="padding:9px 14px;cursor:pointer;font-size:13px">${Utils.escHtml(it.text)}</div>`).join('')
      : '<div style="padding:10px 14px;color:var(--text3)">Không có mục nào</div>';
    const rect = btn.getBoundingClientRect();
    popup.style.left  = rect.left + 'px';
    popup.style.top   = (rect.bottom + 4) + 'px';
    popup.style.width = Math.max(rect.width, 200) + 'px';
    popup.style.display = '';
    if (overlay) overlay.style.display = '';
  }

  function closeCdd() {
    const o = document.getElementById('ed-cdd-overlay');
    const p = document.getElementById('ed-cdd-popup');
    if (o) o.style.display = 'none';
    if (p) p.style.display = 'none';
    _edActiveCdd = null;
  }

  async function selectCdd(which, value) {
    closeCdd();
    const Registry = CL.require('Exercises.Registry');
    if (which === 'grade') {
      _edGrade = value; _edChap = ''; _edBloom = '';
      const item = _edItems.grade.find(i => i.value === value);
      _setEdLabel('grade', item?.text || value);
      await Registry.ensureLoaded(value);
      const chaps = Registry.getChapters(value);
      _edItems.chap = chaps.map(c => ({ value: c, text: c }));
      _edItems.bloom = []; _edItems.ex = [];
      _setEdLabel('chap', '— Chọn chủ đề —'); _setEdLabel('bloom', '— Tất cả —'); _setEdLabel('ex', '— Chọn bài —');
      _setEdLocked('chap', !chaps.length); _setEdLocked('bloom', true); _setEdLocked('ex', true);
      _closeEdForm();
    } else if (which === 'chap') {
      _edChap = value; _edBloom = '';
      _setEdLabel('chap', value || '— Chọn chủ đề —');
      const exs = Registry.getByChapter(_edGrade, value);
      const bloomSet = [...new Set(exs.map(e => e.lv).filter(Boolean))];
      _edItems.bloom = [{ value:'', text:'— Tất cả —' }, ...bloomSet.map(b => ({ value:b, text:b }))];
      _edItems.ex = exs.map(e => ({
        value: e.id,
        text: (e.lv ? '[' + e.lv.split('–')[0].trim() + '] ' : '') + (e.num||'') + ' – ' + (e.title||''),
      }));
      _setEdLabel('bloom', '— Tất cả —'); _setEdLabel('ex', '— Chọn bài —');
      _setEdLocked('bloom', !bloomSet.length); _setEdLocked('ex', !exs.length);
      _closeEdForm();
    } else if (which === 'bloom') {
      _edBloom = value;
      _setEdLabel('bloom', value || '— Tất cả —');
      const exs = Registry.getByChapter(_edGrade, _edChap);
      const filtered = value ? exs.filter(e => e.lv === value) : exs;
      _edItems.ex = filtered.map(e => ({
        value: e.id,
        text: (e.lv ? '[' + e.lv.split('–')[0].trim() + '] ' : '') + (e.num||'') + ' – ' + (e.title||''),
      }));
      _setEdLabel('ex', '— Chọn bài —'); _setEdLocked('ex', !filtered.length);
      _closeEdForm();
    } else if (which === 'ex') {
      const ex = Registry.findById(value);
      if (ex) _setEdLabel('ex', (ex.num||'') + ' – ' + (ex.title||''));
      await edit(value);
    }
  }

  function _setEdLabel(which, text) {
    const el = document.getElementById('ed-' + which + '-label');
    if (el) el.textContent = text;
  }

  function _setEdLocked(which, locked) {
    const wrap = document.getElementById('ed-cdd-' + which);
    const btn  = document.getElementById('ed-cdd-' + which + '-btn');
    if (wrap) wrap.classList.toggle('cdd-locked', locked);
    if (btn)  btn.disabled = locked;
  }

  function _closeEdForm() {
    _unmountAll();
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  //  EDIT: mở form chỉnh sửa bài tập
  // ══════════════════════════════════════════════════════════════

  async function edit(id) {
    const ex = Registry.findById(id);
    if (!ex) return;

    // Unmount previous rich editors
    _unmountAll();
    _currentId = id;

    // Load saved override from Sheets (if any)
    let detail = { ly_thuyet: '', code_mau: [] };
    if (CL.API?.isReady?.()) {
      try { detail = await CL.API.getExerciseDetail(id); } catch {}
    }

    // Load saved desc/theory from NoiDung sheet (via localStorage cache or API)
    const savedDesc   = localStorage.getItem(`cl_content_${id}_desc`);
    const savedTheory = localStorage.getItem(`cl_content_${id}_theory`);

    const form = document.getElementById('ed-form');
    if (!form) return;
    form.style.display = 'block';
    form.innerHTML = `
      <div class="ed-form-header">
        <div class="ed-form-title">
          <span class="ed-form-type-badge ${ex.type || 'python'}">${(ex.type||'python').toUpperCase()}</span>
          ✏️ ${Utils.escHtml(ex.num)} – ${Utils.escHtml(ex.title)}
        </div>
        <button class="ed-close-btn" onclick="CL.Teacher.ExEditor.closeForm()">✕</button>
      </div>

      <div class="ed-tabs" id="ed-tabs-main">
        <button class="ed-tab on" onclick="CL.Teacher.ExEditor.switchTab(this,'de-bai')">
          📋 Đề bài
        </button>
        <button class="ed-tab" onclick="CL.Teacher.ExEditor.switchTab(this,'ly-thuyet')">
          📖 Lý thuyết
        </button>
        <button class="ed-tab" onclick="CL.Teacher.ExEditor.switchTab(this,'code-mau')">
          💻 Code mẫu
        </button>
      </div>

      <!-- TAB: ĐỀ BÀI -->
      <div id="et-de-bai" class="ed-panel">
        <div class="ed-rte-hint">
          <span>✏️ Soạn đề bài bằng trình soạn thảo bên dưới — học sinh sẽ thấy đúng như bạn soạn.</span>
        </div>
        <div id="ef-desc-container" class="ed-rte-container">
          ${savedDesc || ex.desc || '<p>Chưa có đề bài.</p>'}
        </div>
        <div class="ed-panel-footer">
          <button class="ed-save-btn" onclick="CL.Teacher.ExEditor.saveField('${Utils.escHtml(id)}','desc')">
            💾 Lưu đề bài
          </button>
          <span class="ed-save-msg" id="ed-msg-desc"></span>
        </div>
      </div>

      <!-- TAB: LÝ THUYẾT -->
      <div id="et-ly-thuyet" class="ed-panel" style="display:none">
        <div class="ed-rte-hint">
          <span>📖 Soạn lý thuyết liên quan — chỉ hiện khi học sinh luyện tập, ẩn khi kiểm tra.</span>
        </div>
        <div id="ef-ly-container" class="ed-rte-container">
          ${savedTheory || detail.ly_thuyet || ex.theory || '<p>Chưa có lý thuyết.</p>'}
        </div>
        <div class="ed-panel-footer">
          <button class="ed-save-btn" onclick="CL.Teacher.ExEditor.saveField('${Utils.escHtml(id)}','theory')">
            💾 Lưu lý thuyết
          </button>
          <span class="ed-save-msg" id="ed-msg-theory"></span>
        </div>
      </div>

      <!-- TAB: CODE MẪU — RichText (có thể kết hợp giải thích + code block) -->
      <div id="et-code-mau" class="ed-panel" style="display:none">
        <div class="ed-rte-hint">
          <span>💻 Code mẫu & giải thích — chỉ hiện khi điểm &lt; ${CL.require('Config').GRADE.SHOW_SOLUTION_BELOW}/10. Dùng nút <b>code-block</b> (</>) để chèn code có highlight.</span>
        </div>
        <div id="ef-code-container" class="ed-rte-container">
          ${_codeToHtml((detail.code_mau?.[0]||{}).code || ex.solution || '', ex.type || 'python')}
        </div>
        <div class="ed-panel-footer">
          <button class="ed-save-btn" onclick="CL.Teacher.ExEditor.saveField('${Utils.escHtml(id)}','code')">
            💾 Lưu code mẫu
          </button>
          <span class="ed-save-msg" id="ed-msg-code"></span>
        </div>
      </div>

      <div id="ed-msg-global" class="ed-global-msg"></div>`;

    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Mount RichText editors after DOM is ready
    await _mountRichEditors(id, ex, detail, savedDesc, savedTheory);
  }

  // ── Convert raw code string → HTML for RichText initial content ──
  function _codeToHtml(code, lang) {
    if (!code || !code.trim()) return '';
    // Wrap in a proper pre/code block that Quill can display
    const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<pre class="ql-syntax" data-language="${lang || 'python'}">${esc(code.trim())}</pre>`;
  }

  // ── Extract raw code from RichText HTML (first <pre> block) ────
  function _extractCode(html) {
    if (!html) return '';
    const m = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
    if (!m) return html.replace(/<[^>]+>/g, '').trim();
    // Unescape HTML entities
    return m[1].replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').trim();
  }

  // ══════════════════════════════════════════════════════════════
  //  MOUNT rich text editors for desc + theory tabs
  // ══════════════════════════════════════════════════════════════

  async function _mountRichEditors(id, ex, detail, savedDesc, savedTheory) {
    if (!CL.Editors?.RichText) {
      console.warn('[ExEditor] RichText module not loaded');
      return;
    }

    // Mount DESC editor
    const descInitial = savedDesc || ex.desc || '';
    await _mountRte('ef-desc-container', descInitial);

    // Mount THEORY editor
    const theoryInitial = savedTheory || detail.ly_thuyet || ex.theory || '';
    await _mountRte('ef-ly-container', theoryInitial);

    // Mount CODE editor — initial content as code-block
    const codeInitial = _codeToHtml(
      (detail.code_mau?.[0]?.code) || ex.solution || '', ex.type || 'python'
    );
    await _mountRte('ef-code-container', codeInitial);
  }

  async function _mountRte(containerId, initialHtml) {
    try {
      await CL.Editors.RichText.mount(containerId, initialHtml, null);
      // null onSave = manual save via saveField button
    } catch(e) {
      console.warn(`[ExEditor] Cannot mount RTE for ${containerId}:`, e.message);
    }
  }

  function _unmountAll() {
    if (!CL.Editors?.RichText) return;
    CL.Editors.RichText.unmount('ef-desc-container');
    CL.Editors.RichText.unmount('ef-ly-container');
    CL.Editors.RichText.unmount('ef-code-container');
    _currentId = null;
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB SWITCH
  // ══════════════════════════════════════════════════════════════

  function switchTab(btn, panel) {
    const tabs = document.getElementById('ed-tabs-main');
    tabs?.querySelectorAll('.ed-tab').forEach(t => t.classList.remove('on'));
    btn.classList.add('on');
    ['de-bai', 'ly-thuyet', 'code-mau'].forEach(p => {
      const el = document.getElementById('et-' + p);
      if (el) el.style.display = (p === panel ? '' : 'none');
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  SAVE individual field
  // ══════════════════════════════════════════════════════════════

  async function saveField(id, field) {
    const msgId = `ed-msg-${field === 'code' ? 'code' : field === 'desc' ? 'desc' : 'theory'}`;
    const msgEl = document.getElementById(msgId);
    if (msgEl) msgEl.textContent = '⏳ Đang lưu...';

    try {
      if (field === 'desc') {
        const html = CL.Editors.RichText.getHtml('ef-desc-container');
        await CL.API.saveExerciseContent(id, 'desc', html);
        // Cache locally too
        localStorage.setItem(`cl_content_${id}_desc`, html);
        if (msgEl) msgEl.textContent = '✅ Đã lưu đề bài';

      } else if (field === 'theory') {
        const html = CL.Editors.RichText.getHtml('ef-ly-container');
        await CL.API.saveLyThuyet(id, html);
        // Cache locally
        localStorage.setItem(`cl_content_${id}_theory`, html);
        if (msgEl) msgEl.textContent = '✅ Đã lưu lý thuyết';

      } else if (field === 'code') {
        // Get content from RichText editor (HTML with code blocks + explanations)
        const html = CL.Editors.RichText.getHtml('ef-code-container');
        // Extract pure code from first code-block for backward compat grading
        const codeOnly = _extractCode(html);
        const ex = CL.require('Exercises.Registry').findById(id);
        const lang = ex?.type || 'python';
        // Save HTML version (rich) + plain code for grader compatibility
        await CL.API.saveCodeMau(id, lang, codeOnly || html, '');
        await CL.API.saveExerciseContent(id, 'code_rich', html);
        if (msgEl) msgEl.textContent = '✅ Đã lưu code mẫu';
      }

      Toast.success(`✅ Đã lưu ${field === 'desc' ? 'đề bài' : field === 'theory' ? 'lý thuyết' : 'code mẫu'}`);
      setTimeout(() => { if (msgEl) msgEl.textContent = ''; }, 3000);

    } catch(e) {
      if (msgEl) msgEl.textContent = '❌ ' + e.message;
      Toast.error('❌ ' + e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  CLOSE form
  // ══════════════════════════════════════════════════════════════

  function closeForm() {
    _unmountAll();
    const form = document.getElementById('ed-form');
    if (form) form.style.display = 'none';
  }

  // ══════════════════════════════════════════════════════════════
  //  SYNC ALL to Google Sheets
  // ══════════════════════════════════════════════════════════════

  async function syncAll() {
    const confirmed = await Toast.confirm(
      'Sync toàn bộ bài tập lên Google Sheets?\n' +
      'Sẽ sync: BaiTap + LyThuyet + CodeMau\n' +
      'Quá trình mất 3–8 phút. Không đóng tab trong khi sync.'
    );
    if (!confirmed) return;

    const all   = Registry.getAll();
    const BATCH = 100;
    const TABS  = [
      { tab: 'BaiTap',   label: '📋 BaiTap'   },
      { tab: 'LyThuyet', label: '📖 LyThuyet'  },
      { tab: 'CodeMau',  label: '💻 CodeMau'   },
    ];
    const totalSteps = TABS.length * Math.ceil(all.length / BATCH);
    let step = 0;

    const container = document.getElementById('tp-bar-body') || document.body;
    const progBox   = _showProgress(container);
    progBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const btn = document.querySelector('[onclick*="syncAll"]');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang sync...'; }

    try {
      for (const { tab, label } of TABS) {
        const tabBatches = Math.ceil(all.length / BATCH);
        for (let i = 0; i < all.length; i += BATCH) {
          step++;
          const batchNum = Math.floor(i / BATCH) + 1;
          const batch    = all.slice(i, i + BATCH);
          _updateProgress(step, totalSteps,
            `${label} — batch ${batchNum}/${tabBatches}`);
          await CL.API.syncFull(batch, tab, i === 0);
          _updateProgress(step, totalSteps,
            `✓ ${label} batch ${batchNum}/${tabBatches} (${Math.min(i + BATCH, all.length)}/${all.length} bài)`);
          await new Promise(r => setTimeout(r, 300));
        }
      }
      _finishProgress(true);
      Toast.success('✅ Sync hoàn tất!');
    } catch(e) {
      _finishProgress(false);
      Toast.error('❌ Sync lỗi: ' + e.message);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '🔄 Sync lên Sheets'; }
    }
  }

  // ── Progress bar ────────────────────────────────────────────

  function _showProgress(container) {
    document.getElementById('sync-progress-box')?.remove();
    const el = document.createElement('div');
    el.id = 'sync-progress-box';
    el.innerHTML = `
      <div class="sync-prog-title">🔄 Đang sync bài tập lên Google Sheets...</div>
      <div class="sync-prog-wrap"><div class="sync-prog-bar" id="sync-prog-bar" style="width:0%"></div></div>
      <div class="sync-prog-info">
        <span id="sync-prog-text">Chuẩn bị...</span>
        <span id="sync-prog-pct">0%</span>
      </div>
      <div class="sync-prog-steps" id="sync-prog-steps"></div>`;
    container.appendChild(el);
    return el;
  }

  function _updateProgress(step, total, msg) {
    const pct = Math.round(step / total * 100);
    const bar  = document.getElementById('sync-prog-bar');
    const txt  = document.getElementById('sync-prog-text');
    const pctEl = document.getElementById('sync-prog-pct');
    const steps = document.getElementById('sync-prog-steps');
    if (bar)  bar.style.width     = pct + '%';
    if (txt)  txt.textContent     = msg;
    if (pctEl) pctEl.textContent  = pct + '%';
    if (steps && msg) {
      const line = document.createElement('div');
      line.className = 'sync-prog-step';
      line.textContent = '✅ ' + msg;
      steps.appendChild(line);
      steps.scrollTop = steps.scrollHeight;
    }
  }

  function _finishProgress(success) {
    const bar   = document.getElementById('sync-prog-bar');
    const txt   = document.getElementById('sync-prog-text');
    const pctEl = document.getElementById('sync-prog-pct');
    const box   = document.getElementById('sync-progress-box');
    if (bar)  { bar.style.width = '100%'; bar.style.background = success ? 'var(--accent2)' : 'var(--error)'; }
    if (txt)  txt.textContent  = success ? '✅ Sync hoàn tất!' : '❌ Sync thất bại';
    if (pctEl) pctEl.textContent = success ? '100%' : 'Lỗi';
    if (box && success) {
      setTimeout(() => { box.style.opacity = '0'; setTimeout(() => box.remove(), 600); }, 3000);
    }
  }

  return { render, openCdd, closeCdd, selectCdd, edit, switchTab, saveField, closeForm, syncAll };
});

// ─── js/features/teacher/config.js ───────────────────────────
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
        <button class="cfg-ntab active" onclick="CL.Teacher.Config.switchNav('general',this)">
          <span>⚙️</span> Hệ thống
        </button>
        <button class="cfg-ntab" onclick="CL.Teacher.Config.switchNav('ai',this)">
          <span>🤖</span> AI API
        </button>
        <button class="cfg-ntab" onclick="CL.Teacher.Config.switchNav('prompt',this)">
          <span>📝</span> Prompt AI
        </button>
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
    // Ưu tiên DEPLOY_URL hardcode, sau đó localStorage
    const url = (cfg.DEPLOY_URL && cfg.DEPLOY_URL.startsWith('http'))
      ? cfg.DEPLOY_URL
      : (localStorage.getItem(cfg.LS.SCRIPT_URL) || '');
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
          <div class="cfg-hint" style="margin-top:6px;color:var(--accent2)">
            💡 Cách tốt nhất: Dán URL vào <code>DEPLOY_URL</code> trong <b>js/core/config.js</b>
            trước khi phân phối app — tất cả máy trạm dùng chung URL mà không cần cấu hình lại.
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
          <button class="tp-save-btn" onclick="CL.Teacher.Config.saveUrl()">💾 Lưu URL</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.ping()">🔔 Kiểm tra kết nối</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.createTables()">🏗 Tạo bảng Sheets</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Config.changePassword()">🔑 Đổi mật khẩu</button>
          ${CL.require('Auth.Session')?.get()?.role === 'admin'
            ? '<button class="tp-action-btn" onclick="localStorage.removeItem(\'cl_setup_dismissed\');CL.Features.Setup?.show()" style="border-color:var(--accent);color:var(--accent)">🧙 Setup Wizard</button>'
            : ''}
        </div>
        <div id="cfg-msg" style="margin-top:8px;font-size:12px;min-height:16px"></div>

      </div>`;
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
    // ✅ FIX: Dùng AIClient để set active provider
    const AIClient = (() => { try { return CL.require('Teacher.AIClient'); } catch { return null; } })();
    if (AIClient) AIClient.setActiveId(providerId);
    else localStorage.setItem('cl_ai_provider', providerId);
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
    const AIClient = (() => { try { return CL.require('Teacher.AIClient'); } catch { return null; } })();
    const val = document.getElementById('cfg-key-' + providerId)?.value?.trim();
    if (!val || val.includes('••')) { Toast.warn('⚠️ Vui lòng nhập API key mới'); return; }
    // ✅ FIX: Dùng AIClient.setKey (xử lý backward compat bên trong)
    if (AIClient) AIClient.setKey(providerId, val);
    else localStorage.setItem('cl_ai_provider_key_' + providerId, val);
    Toast.success(`✅ Đã lưu key cho ${p.name}`);
    // Re-render to show masked key + badge
    const el = document.querySelector('.tp-config-body')?.parentElement;
    if (el) render(el);
  }

  function clearKey(providerId) {
    const AIClient = (() => { try { return CL.require('Teacher.AIClient'); } catch { return null; } })();
    if (AIClient) AIClient.clearKey(providerId);
    Toast.info(`Đã xóa key của ${p.name}`);
    const el = document.querySelector('.tp-config-body')?.parentElement;
    if (el) render(el);
  }

  function saveModel(providerId, modelId) {
    const AIClient = (() => { try { return CL.require('Teacher.AIClient'); } catch { return null; } })();
    if (AIClient) AIClient.setModel(providerId, modelId);
    Toast.success(`✅ Mô hình: ${modelId}`);
  }

  // ── Test active AI ───────────────────────────────────────────
  async function testActiveAI() {
    const msg = document.getElementById('cfg-ai-test-msg');
    // ✅ FIX: Dùng AIClient.test() thay vì hardcode từng provider
    const AIClient = CL.require('Teacher.AIClient');
    if (!AIClient) { if(msg) msg.textContent = '❌ AIClient chưa load'; return; }

    const activeId = AIClient.getActiveId();
    const p        = AIClient.getProviderDef(activeId);
    if (!p) { if(msg) msg.textContent = '❌ Provider không hợp lệ'; return; }
    if (!AIClient.hasKey(activeId)) {
      if(msg) msg.innerHTML = `<span style="color:var(--warn)">⚠️ Chưa nhập API key cho ${p.name}</span>`;
      return;
    }

    if (msg) msg.innerHTML = `<span style="color:var(--text3)">⏳ Đang test ${p.icon} ${p.name}...</span>`;

    const result = await AIClient.test(activeId);

    if (result.ok) {
      if (msg) msg.innerHTML =
        `<span style="color:var(--accent2)">✅ ${p.icon} ${p.name} OK · ${result.latency}ms · ${result.model}</span>`;
    } else {
      if (msg) msg.innerHTML =
        `<span style="color:var(--error)">❌ ${Utils.escHtml(result.error)}</span>`;
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

// ─── js/features/mode-manager.js ───────────────────────────
/**
 * features/mode-manager.js — Quản lý chế độ Luyện tập ↔ Kiểm tra
 * ═══════════════════════════════════════════════════════════════
 *
 * Hai chế độ:
 *   PRACTICE  — Luyện tập thường ngày, tự do, không anti-cheat
 *   EXAM      — Kiểm tra chính thức, cần mã truy cập, đầy đủ anti-cheat
 *
 * Luồng:
 *   1. Học sinh đăng nhập → mặc định PRACTICE
 *   2. Học sinh nhập mã → server xác thực → switch sang EXAM
 *   3. Kết thúc exam → trở về PRACTICE
 *
 * State trong CL.Store:
 *   'appMode'      : 'practice' | 'exam'
 *   'activeExam'   : exam object | null
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, api.js
 */

'use strict';

CL.define('Features.ModeManager', () => {

  const cfg     = CL.require('Config');
  const Events  = CL.require('Events');
  const Store   = CL.require('Store');
  const Session = CL.require('Auth.Session');
  const Toast   = CL.require('UI.Toast');
  const Utils   = CL.require('Utils');

  // ── Public API ────────────────────────────────────────────────

  /** Khởi động sau khi đăng nhập */
  function init() {
    Store.set('appMode',    'practice');
    Store.set('activeExam', null);
    _renderModeBanner();
    _checkOpenExams();      // Tự check nếu đang có kỳ thi mở
  }

  /**
   * Student nhập mã → xác thực → vào chế độ thi
   * @param {string} code - Mã truy cập do GV cung cấp
   */
  async function enterExamWithCode(code) {
    if (!code?.trim()) return;
    const trimmed = code.trim().toUpperCase();

    Toast.show('🔍 Đang xác thực mã...', 'info', 2000);
    try {
      const data = await CL.API.verifyExamCode(trimmed);
      if (!data?.exam) { Toast.error('❌ Mã không hợp lệ hoặc đợt kiểm tra chưa mở'); return; }

      const exam = data.exam;
      const user = Session.get();

      // Kiểm tra lớp — hỗ trợ cả string "10A1,10A2" và array ["10A1","10A2"]
      const _lopList = (e) => {
        if (!e.lop && !(e.lop_ids && e.lop_ids.length)) return [];
        if (Array.isArray(e.lop_ids) && e.lop_ids.length) return e.lop_ids.map(s=>String(s).trim());
        if (Array.isArray(e.lop)) return e.lop.map(s=>String(s).trim());
        return (e.lop||'').split(',').map(s=>s.trim()).filter(Boolean);
      };
      if (exam.lop || (exam.lop_ids && exam.lop_ids.length)) {
        const lops = _lopList(exam);
        if (lops.length > 0 && !lops.includes(String(user?.lop||'').trim())) {
          Toast.error(`❌ Bạn (lớp ${user?.lop}) không thuộc đối tượng kỳ thi này`);
          return;
        }
      }

      // Chuyển sang chế độ thi
      Store.set('appMode',    'exam');
      Store.set('activeExam', exam);
      Events.emit('mode:exam-entered', { exam });

      // Start exam mode UI
      CL.Features.ExamMode.start(exam);

    } catch (e) {
      Toast.error('❌ ' + e.message);
    }
  }

  /** Thoát chế độ thi, về luyện tập */
  function exitToPractice() {
    Store.set('appMode',    'practice');
    Store.set('activeExam', null);
    CL.Features.ExamMode.cleanup?.();
    Events.emit('mode:practice-entered', {});
    // Reload UI
    location.reload();
  }

  /** Chế độ hiện tại */
  function getMode() { return Store.get('appMode') || 'practice'; }
  function isPractice() { return getMode() === 'practice'; }
  function isExam()     { return getMode() === 'exam'; }

  // ── Practice mode banner ──────────────────────────────────────

  function _renderModeBanner() {
    const hdr = document.querySelector('header');
    if (!hdr) return;

    // Nút "Vào phòng thi"
    const btn = document.createElement('button');
    btn.id = 'exam-code-btn';
    btn.className = 'exam-enter-btn';
    btn.innerHTML = '📋 Vào phòng thi';
    btn.title = 'Nhập mã để vào chế độ kiểm tra';
    btn.onclick = showEnterCodeDialog;
    hdr.appendChild(btn);
  }

  function showEnterCodeDialog() {
    const ov = document.createElement('div');
    ov.id = 'enter-exam-overlay';
    ov.innerHTML = `
      <div class="eec-backdrop" onclick="document.getElementById('enter-exam-overlay').remove()"></div>
      <div class="eec-card">
        <div class="eec-icon">🎓</div>
        <div class="eec-title">Vào phòng thi</div>
        <div class="eec-desc">Nhập mã truy cập do giáo viên cung cấp để bắt đầu bài kiểm tra chính thức.</div>
        <input id="eec-code" type="text" class="eec-input"
          placeholder="Nhập mã (VD: K25A1)"
          maxlength="20" autocomplete="off" spellcheck="false"
          onkeydown="if(event.key==='Enter')CL.Features.ModeManager.enterExamWithCode(document.getElementById('eec-code').value)"
          style="text-transform:uppercase">
        <div class="eec-hint">Mã do giáo viên thông báo trước giờ thi</div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
          <button class="eec-btn-cancel" onclick="document.getElementById('enter-exam-overlay').remove()">Hủy</button>
          <button class="eec-btn-enter" onclick="CL.Features.ModeManager.enterExamWithCode(document.getElementById('eec-code').value)">
            Vào thi →
          </button>
        </div>
        <div id="eec-msg" style="margin-top:8px;font-size:11.5px;color:var(--error);min-height:14px;text-align:center"></div>
      </div>`;
    document.body.appendChild(ov);
    setTimeout(() => ov.querySelector('.eec-card')?.classList.add('show'), 10);
    document.getElementById('eec-code')?.focus();
  }

  // ── Auto-check for open exams on login ───────────────────────

  async function _checkOpenExams() {
    if (!CL.API.isReady()) return;
    const user = Session.get();
    if (!user || user.role !== 'student') return;

    try {
      const exams = await CL.API.getExams();
      const open  = exams.filter(e => {
        if (e.trang_thai !== 'active') return false;
        if (!e.lop && !(e.lop_ids && e.lop_ids.length)) return true;
        const ids = Array.isArray(e.lop_ids) && e.lop_ids.length ? e.lop_ids.map(s=>String(s).trim())
                  : Array.isArray(e.lop) ? e.lop.map(s=>String(s).trim())
                  : (e.lop||'').split(',').map(s=>s.trim()).filter(Boolean);
        return ids.length === 0 || ids.includes(String(user?.lop||'').trim());
      });

      if (open.length > 0) {
        _showExamAlert(open);
      }
    } catch {}
  }

  function _showExamAlert(exams) {
    const names = exams.map(e => `"${e.ten}"`).join(', ');
    const banner = document.createElement('div');
    banner.className = 'exam-alert-banner';
    banner.innerHTML = `
      <span>📋 Có ${exams.length} kỳ kiểm tra đang mở dành cho lớp bạn: <b>${names}</b></span>
      <button onclick="CL.Features.ModeManager.showEnterCodeDialog()">Vào thi ngay →</button>
      <button style="background:none;border:none;color:inherit;cursor:pointer;padding:0 4px"
        onclick="this.closest('.exam-alert-banner').remove()">✕</button>`;
    document.body.prepend(banner);
  }

  // Expose
  window.ModeManager = { init, enterExamWithCode, exitToPractice, isPractice, isExam, showEnterCodeDialog };

  return { init, enterExamWithCode, exitToPractice, isPractice, isExam, showEnterCodeDialog };
});

// ─── js/features/exam-mode.js ───────────────────────────
/**
 * features/exam-mode.js — Chế độ Thi/Kiểm tra
 * ═══════════════════════════════════════════════════════════════
 * Tuân thủ chuẩn thi quốc tế:
 *   - 1 lần nộp duy nhất (hoặc theo cấu hình)
 *   - Chống chuyển tab, DevTools, refresh
 *   - Timer đếm ngược chính xác
 *   - Xáo đề ngẫu nhiên theo bloom levels
 *   - Lưu tiến trình tự động
 *   - Xuất PDF minh chứng sau khi nộp
 *
 * Events phát ra:
 *   'exam:started'        { exam, questions }
 *   'exam:question-nav'   { index, question }
 *   'exam:question-saved' { baiId, code }
 *   'exam:submitted'      { result }
 *   'exam:time-warning'   { remaining }
 *   'exam:time-up'        {}
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, features/anti-cheat.js, graders/*
 */

'use strict';

CL.define('Features.ExamMode', () => {

  const cfg      = CL.require('Config');
  const Utils    = CL.require('Utils');
  const Events   = CL.require('Events');
  const Store    = CL.require('Store');
  const Session  = CL.require('Auth.Session');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  // ── Session state ─────────────────────────────────────────────
  let _exam      = null;      // Exam metadata
  let _questions = [];        // Ordered question list for this student
  let _answers   = {};        // { baiId: { code, diem, tg, ts } }
  let _curIdx    = 0;         // Current question index
  let _startTs   = 0;         // Unix timestamp when exam started
  let _timerIv   = null;      // Countdown interval
  let _submitted = false;
  let _locked    = false;

  // ── ENTRY: Start exam from banner/code ────────────────────────

  /**
   * Mở giao diện nhập mã thi hoặc trực tiếp bắt đầu
   * @param {Object} exam - Exam object từ API.getExams()
   */
  async function start(exam) {
    if (_submitted) return;

    // Kiểm tra mã vào phòng thi (nếu có)
    if (exam.mat_khau) {
      const entered = prompt(`🔐 Nhập mã vào phòng thi "${exam.ten}":`);
      if (entered?.trim() !== exam.mat_khau) {
        Toast.error('❌ Mã không đúng'); return;
      }
    }

    _exam = exam;
    _questions = _buildQuestionList(exam);
    _answers   = _restoreProgress(exam.id) || {};
    _curIdx    = 0;
    _startTs   = Date.now();
    _submitted = false;
    _locked    = false;

    // Fullscreen
    _requestFullscreen();

    // Anti-cheat: strict mode
    _enableStrictAntiCheat();

    // Render UI
    _renderExamUI();

    // Start timer
    if (exam.thoi_gian_phut > 0) _startTimer(exam.thoi_gian_phut * 60);

    // Navigate to first question
    _navTo(0);

    Events.emit('exam:started', { exam, questions: _questions });
    CL.API.logAccess('exam_start', exam.id);
  }

  // ── Question selection / shuffling ────────────────────────────

  function _buildQuestionList(exam) {
    // ── NEW: groups model ─────────────────────────────────────
    if (Array.isArray(exam.groups) && exam.groups.length) {
      const all = [];
      exam.groups.forEach(g => {
        const pool = (g.question_ids || [])
          .map(id => Registry.findById(id))
          .filter(Boolean)
          .map(ex => ({
            ...ex,
            _weight:     parseFloat(g.points_each) || 1.0,
            _group:      g.name || '',
            _group_id:   g.id   || '',
          }));
        const pick = Math.min(parseInt(g.pick_count) || pool.length, pool.length);
        const picked = pick < pool.length ? _shuffle(pool).slice(0, pick) : [...pool];
        all.push(...picked);
      });
      return exam.che_do_tron_de ? _shuffle(all) : all;
    }

    // ── LEGACY: flat bai_tap_detail ───────────────────────────
    const pool = exam.bai_tap_detail || [];

    if (!pool.length) {
      const ids = exam.bai_tap || [];
      const exs = ids.map(id => Registry.findById(id)).filter(Boolean);
      return exam.che_do_tron_de ? _shuffle(exs) : exs;
    }

    let selected = [];
    const bf = exam.bloom_filter;
    const bloomObj = typeof bf === 'string' ? (() => { try { return JSON.parse(bf); } catch { return null; } })() : bf;

    if (bloomObj && typeof bloomObj === 'object' && Object.keys(bloomObj).length) {
      const bloomGroups = {};
      for (const item of pool) {
        const lv = item.bloom_level || _inferBloom(item.bai_id);
        if (!bloomGroups[lv]) bloomGroups[lv] = [];
        bloomGroups[lv].push(item);
      }
      for (const [lv, count] of Object.entries(bloomObj)) {
        const picks = _shuffle(bloomGroups[lv] || []).slice(0, parseInt(count));
        selected.push(...picks);
      }
    } else if (exam.so_bai_random > 0) {
      selected = _shuffle([...pool]).slice(0, exam.so_bai_random);
    } else {
      selected = [...pool];
    }

    if (exam.che_do_tron_de) selected = _shuffle(selected);

    return selected.map(item => {
      const ex = Registry.findById(item.bai_id);
      if (!ex) return null;
      return { ...ex, _weight: item.diem_co_phan || 1.0, _group: item.nhom || '' };
    }).filter(Boolean);
  }

  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function _inferBloom(baiId) {
    // Extract bloom level from ID pattern: *-b1-*, *-b2-*, ...
    const m = (baiId || '').match(/-b([1-6])-/);
    return m ? 'b' + m[1] : 'b3';
  }

  // ── Render exam UI ────────────────────────────────────────────

  function _renderExamUI() {
    const q  = _questions;
    const ex = _exam;

    document.body.innerHTML = `
      <div id="exam-wrapper" class="exam-wrapper">
        <!-- HEADER BAR -->
        <header class="exam-header">
          <div class="exam-header-left">
            <div class="exam-title">📋 ${Utils.escHtml(ex.ten)}</div>
            <div class="exam-meta">
              <span class="exam-student">${Utils.escHtml(Session.get()?.name || '')}</span>
              <span class="exam-lop">${Utils.escHtml(Session.get()?.lop || '')}</span>
            </div>
          </div>
          <div class="exam-header-center">
            <div class="exam-timer-wrap">
              <div class="exam-timer" id="exam-timer">--:--</div>
              <div class="exam-timer-label">Thời gian còn lại</div>
            </div>
          </div>
          <div class="exam-header-right">
            <div class="exam-progress">
              <span id="exam-done-count">0</span>/${q.length} câu
            </div>
            <button class="exam-submit-btn" onclick="CL.Features.ExamMode.confirmSubmit()">
              📤 Nộp bài
            </button>
          </div>
        </header>

        <!-- BODY: question nav + workspace -->
        <div class="exam-body">
          <!-- LEFT: Question navigator -->
          <div class="exam-nav">
            <div class="exam-nav-title">Danh sách câu hỏi</div>
            <div class="exam-nav-grid" id="exam-nav-grid">
              ${q.map((e, i) => `
                <div class="exam-nav-cell" id="nav-cell-${i}"
                     data-idx="${i}" data-bloom="${(e.lv||'').split('–')[0].trim()}"
                     onclick="CL.Features.ExamMode.navTo(${i})"
                     title="${Utils.escHtml(e.num+' '+e.title)}">
                  ${i + 1}
                </div>`).join('')}
            </div>
            <div class="exam-nav-legend">
              <span class="enc-dot answered"></span> Đã làm
              <span class="enc-dot current"></span> Hiện tại
              <span class="enc-dot"></span> Chưa làm
            </div>
          </div>

          <!-- RIGHT: Question workspace -->
          <div class="exam-workspace" id="exam-workspace">
            <!-- filled by _navTo() -->
          </div>
        </div>

        <!-- SUBMIT OVERLAY -->
        <div class="exam-submit-overlay" id="exam-submit-overlay" style="display:none">
          <div class="eso-card">
            <div class="eso-icon">📊</div>
            <div class="eso-title" id="eso-title">Đang chấm bài...</div>
            <div class="eso-progress">
              <div class="eso-bar" id="eso-bar" style="width:0%"></div>
            </div>
            <div class="eso-result" id="eso-result"></div>
            <button class="eso-pdf-btn" id="eso-pdf-btn" style="display:none"
              onclick="CL.Features.ExamMode.downloadPdf()">
              📄 Tải minh chứng PDF
            </button>
          </div>
        </div>

        <!-- ANTI-CHEAT OVERLAY -->
        <div class="exam-anticheat-overlay" id="exam-ac-overlay" style="display:none">
          <div class="eac-card">
            <div class="eac-icon" id="eac-icon">⚠️</div>
            <div class="eac-title" id="eac-title">Cảnh báo</div>
            <div class="eac-msg"  id="eac-msg"></div>
            <button class="eac-btn" id="eac-btn">Trở lại làm bài</button>
          </div>
        </div>
      </div>`;
  }

  // ── Navigation ────────────────────────────────────────────────

  function navTo(idx) {
    if (idx < 0 || idx >= _questions.length) return;

    // Auto-save current question's code before navigating away
    _saveCurrentAnswer();

    _curIdx = idx;
    const exercise = _questions[idx];
    const saved    = _answers[exercise.id];

    // Update nav grid
    document.querySelectorAll('.exam-nav-cell').forEach(cell => {
      const i = parseInt(cell.dataset.idx);
      cell.className = 'exam-nav-cell' +
        (i === idx ? ' current' : _answers[_questions[i]?.id] ? ' answered' : '');
    });

    // Render question area
    const ws = document.getElementById('exam-workspace');
    if (!ws) return;

    ws.innerHTML = `
      <div class="eq-header">
        <div class="eq-num">Câu ${idx + 1}/${_questions.length}</div>
        <div class="eq-lv"><span class="bloom-badge bloom-${_inferBloom(exercise.id)}">${exercise.lv}</span></div>
        <div class="eq-title">${Utils.escHtml(exercise.num + ' — ' + exercise.title)}</div>
        ${exercise._weight !== 1.0 ? `<div class="eq-weight">Hệ số: ×${exercise._weight}</div>` : ''}
      </div>

      <div class="eq-desc">${exercise.desc || ''}</div>

      ${exercise.theory ? `
        <details class="eq-theory">
          <summary>📖 Lý thuyết tham khảo</summary>
          <div>${exercise.theory}</div>
        </details>` : ''}

      <div class="eq-editor" id="eq-editor">
        ${_renderEditor(exercise, saved?.code)}
      </div>

      <div class="eq-actions">
        <button class="eq-btn-prev" onclick="CL.Features.ExamMode.navTo(${idx - 1})"
          ${idx === 0 ? 'disabled' : ''}>← Câu trước</button>

        ${!_exam.toan_ven_1_lan || !saved?.da_nop
          ? `<button class="eq-btn-submit" onclick="CL.Features.ExamMode.submitQuestion(${idx})">
               ✅ Nộp câu ${idx + 1}
             </button>`
          : `<div class="eq-submitted-badge">✅ Đã nộp</div>`}

        <button class="eq-btn-next" onclick="CL.Features.ExamMode.navTo(${idx + 1})"
          ${idx === _questions.length - 1 ? 'disabled' : ''}>Câu tiếp →</button>
      </div>`;

    Events.emit('exam:question-nav', { index: idx, question: exercise });
  }

  function _renderEditor(exercise, savedCode) {
    const type    = exercise.type || 'python';
    const starter = savedCode || _starterCode(exercise);
    const lines   = starter.split('\n').length;
    const h       = Math.max(120, Math.min(400, lines * 20));

    if (type === 'python') return `
      <div class="eq-editor-label">💻 Python Editor</div>
      <textarea id="eq-code-input" class="eq-code-area" style="height:${h}px"
        spellcheck="false" autocomplete="off"
        onkeydown="CL.Features.ExamMode.handleEditorKey(event)"
        onpaste="CL.Features.ExamMode.onPaste(event)">${Utils.escHtml(starter)}</textarea>
      <div class="eq-run-bar">
        <button class="eq-run-btn" onclick="CL.Features.ExamMode.runCode()">▶ Chạy thử</button>
        <span class="eq-run-note">⚠️ Chạy thử không ảnh hưởng điểm</span>
      </div>
      <div id="eq-output" class="eq-output"></div>`;

    if (type === 'html') return `
      <div class="eq-editor-label">🌐 HTML/CSS Editor</div>
      <textarea id="eq-code-input" class="eq-code-area" style="height:${h}px"
        spellcheck="false" autocomplete="off"
        onkeydown="CL.Features.ExamMode.handleEditorKey(event)"
        onpaste="CL.Features.ExamMode.onPaste(event)"
        oninput="CL.Features.ExamMode.scheduleHtmlPreview()">${Utils.escHtml(starter)}</textarea>
      <div class="eq-preview-label">👁 Preview</div>
      <iframe id="eq-html-preview" sandbox="allow-same-origin allow-scripts"
        style="width:100%;height:200px;border:1px solid var(--border);border-radius:6px;background:#fff"></iframe>`;

    if (type === 'sql') return `
      <div class="eq-editor-label">🗃 SQL Editor</div>
      <textarea id="eq-code-input" class="eq-code-area" style="height:${h}px"
        spellcheck="false" autocomplete="off"
        onkeydown="CL.Features.ExamMode.handleEditorKey(event)"
        onpaste="CL.Features.ExamMode.onPaste(event)">${Utils.escHtml(starter)}</textarea>
      <button class="eq-run-btn" onclick="CL.Features.ExamMode.runSQL()">▶ Chạy SQL</button>
      <div id="eq-output" class="eq-output"></div>`;

    return `<div class="eq-editor-label">Editor không hỗ trợ type: ${type}</div>`;
  }

  function _starterCode(ex) {
    const t = ex.type || 'python';
    if (t === 'html') return `<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <title>Bài làm</title>\n</head>\n<body>\n  <!-- Viết code tại đây -->\n</body>\n</html>`;
    if (t === 'sql')  return '-- Viết SQL tại đây\nSELECT ';
    return '# Viết code Python tại đây\n';
  }

  // ── Editor helpers ────────────────────────────────────────────

  function handleEditorKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target, s = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 4;
    }
  }

  function onPaste(e) {
    // Log paste event for anti-cheat record
    CL.API.logAccess('exam_paste', `${_exam?.id}:q${_curIdx}`);
  }

  let _htmlPreviewTimer = null;
  function scheduleHtmlPreview() {
    clearTimeout(_htmlPreviewTimer);
    _htmlPreviewTimer = setTimeout(() => {
      const ta = document.getElementById('eq-code-input');
      const fr = document.getElementById('eq-html-preview');
      if (!ta || !fr) return;
      try { const d = fr.contentDocument; d.open(); d.write(ta.value); d.close(); }
      catch { fr.srcdoc = ta.value; }
    }, 500);
  }

  async function runCode() {
    const ta  = document.getElementById('eq-code-input');
    const out = document.getElementById('eq-output');
    if (!ta || !out) return;

    const exercise = _questions[_curIdx];
    const type     = exercise?.type || 'python';
    const code     = ta.value;

    out.innerHTML = '<span style="color:var(--text3)">⏳ Đang chạy...</span>';

    try {
      if (type === 'sql') {
        // Run SQL via sql.js grader (quick check)
        const gr = await CL.Graders.Sql.grade(code, exercise.id);
        const rows = gr.studentRows || [];
        const cols = gr.studentColumns || [];
        if (cols.length) {
          const header = '<tr>' + cols.map(c => `<th>${_esc(c)}</th>`).join('') + '</tr>';
          const body   = rows.slice(0,20).map(r =>
            '<tr>' + r.map(v => `<td>${_esc(String(v??''))}</td>`).join('') + '</tr>'
          ).join('');
          out.innerHTML = `<table class="eq-sql-result"><thead>${header}</thead><tbody>${body}</tbody></table>`;
        } else {
          out.textContent = gr.syntax_error || '(Không có kết quả)';
        }
        return;
      }

      if (type === 'html') {
        const fr = document.getElementById('eq-html-preview');
        if (fr) {
          try { const d=fr.contentDocument; d.open(); d.write(code); d.close(); }
          catch { fr.srcdoc = code; }
        }
        out.textContent = '✅ HTML đã cập nhật trong preview';
        return;
      }

      // Python: use PyInterp (fast, synchronous) for run-preview
      // Pyodide is used only for grading to ensure accuracy
      let stdout = '';
      try {
        const toks   = PyInterp.tokenize(code);
        const parser = new PyInterp.Parser(toks);
        const ast    = parser.parse();
        const interp = new PyInterp.Interp(
          (text) => { stdout += text; },
          (prompt) => {
            // In exam mode, input() returns empty string (no interactive input)
            return '';
          }
        );
        const r = interp.run(ast);
        if (r && r.e) stdout += '\n' + r.e.toString();
        out.textContent = stdout || '(Không có output)';
      } catch(e) {
        out.innerHTML = `<span style="color:var(--error)">${_esc(e instanceof PyInterp.PyErr ? e.toString() : e.message)}</span>`;
      }
    } catch(e) {
      out.innerHTML = `<span style="color:var(--error)">❌ ${_esc(e.message)}</span>`;
    }
  }

  function _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Save answer ───────────────────────────────────────────────

  function _saveCurrentAnswer() {
    if (_curIdx < 0 || _curIdx >= _questions.length) return;
    const exercise = _questions[_curIdx];
    const ta       = document.getElementById('eq-code-input');
    if (!ta) return;
    const code = ta.value;
    if (!_answers[exercise.id]) _answers[exercise.id] = {};
    _answers[exercise.id].code = code;
    _answers[exercise.id].ts   = Date.now();
    _saveProgress(_exam.id, _answers);
    Events.emit('exam:question-saved', { baiId: exercise.id, code });
  }

  function _saveProgress(examId, answers) {
    try { localStorage.setItem('cl_exam_progress_' + examId, JSON.stringify(answers)); } catch {}
  }

  function _restoreProgress(examId) {
    try { return JSON.parse(localStorage.getItem('cl_exam_progress_' + examId)) || {}; } catch { return {}; }
  }

  // ── Submit single question ────────────────────────────────────

  async function submitQuestion(idx) {
    const exercise = _questions[idx];
    if (!exercise) return;

    // Nếu toan_ven_1_lan và đã nộp → block
    if (_exam.toan_ven_1_lan && _answers[exercise.id]?.da_nop) {
      Toast.warn('⚠️ Bài này đã nộp, không thể sửa'); return;
    }

    const ta   = document.getElementById('eq-code-input');
    const code = ta?.value || _answers[exercise.id]?.code || '';
    if (!code.trim()) { Toast.warn('⚠️ Vui lòng viết code trước khi nộp'); return; }

    const t0 = _answers[exercise.id]?.t0 || _startTs;
    const tg = Math.round((Date.now() - t0) / 1000);

    // Grade
    let gradeResult;
    try {
      if      (exercise.type === 'html') gradeResult = CL.Graders.Html.grade(code, exercise.id);
      else if (exercise.type === 'sql')  gradeResult = await CL.Graders.Sql.grade(code, exercise.id);
      else {
        const output = document.getElementById('eq-output')?.textContent || '';
        gradeResult = await CL.Graders.Python.grade(code, output, exercise.id);
      }
    } catch(e) { Toast.error('❌ ' + e.message); return; }

    const weighted = Math.round(gradeResult.score * (exercise._weight || 1) * 10) / 10;

    _answers[exercise.id] = {
      code, diem: gradeResult.score, diem_weighted: weighted,
      tg, ts: Date.now(), da_nop: true,
      results: gradeResult.results,
    };
    _saveProgress(_exam.id, _answers);

    // Save to server
    CL.API.submitBaiLam({
      ky_id:  _exam.id,
      bai_id: exercise.id,
      tieu_de: exercise.title,
      diem:   gradeResult.score,
      code_snap: code.substring(0, 1000),
      tg_lam_giay: tg,
      type:   exercise.type || 'python',
      da_nop: true,
    });

    // Update nav cell
    const cell = document.getElementById(`nav-cell-${idx}`);
    if (cell) cell.classList.add('answered');

    // Update done count
    const done = Object.values(_answers).filter(a => a.da_nop).length;
    const el   = document.getElementById('exam-done-count');
    if (el) el.textContent = done;

    // Show inline result
    const editArea = document.getElementById('eq-editor');
    if (editArea) {
      const color = gradeResult.score >= 8 ? '#4ade80' : gradeResult.score >= 5 ? '#facc15' : '#f87171';
      editArea.insertAdjacentHTML('beforeend', `
        <div class="eq-grade-result" style="border-color:${color}">
          <div style="font-size:20px;font-weight:800;color:${color}">${gradeResult.score}/10</div>
          <div style="font-size:12px;color:var(--text2)">${gradeResult.earned}/${gradeResult.total} điểm</div>
          ${_exam.cho_xem_dap_an && gradeResult.exercise?.solution
            ? `<details style="margin-top:8px"><summary style="cursor:pointer;font-size:12px">💡 Xem gợi ý đáp án</summary>
               <pre style="font-size:11px;margin:4px 0 0">${Utils.escHtml(gradeResult.exercise.solution)}</pre></details>`
            : ''}
        </div>`);
    }

    // Lock editor if toan_ven_1_lan
    if (_exam.toan_ven_1_lan && ta) {
      ta.readOnly = true;
      ta.style.opacity = '0.7';
    }

    // Auto move to next
    if (idx < _questions.length - 1) {
      setTimeout(() => navTo(idx + 1), 1500);
    } else {
      Toast.success('✅ Đã nộp câu cuối! Nhấn "Nộp bài" để hoàn tất.');
    }
  }

  // ── Submit all (final) ────────────────────────────────────────

  async function confirmSubmit() {
    const unanswered = _questions.filter(q => !_answers[q.id]?.da_nop).length;
    const msg = unanswered > 0
      ? `Còn ${unanswered} câu chưa nộp. Bạn có chắc muốn kết thúc bài thi?`
      : 'Xác nhận nộp toàn bộ bài thi?';
    if (!await Toast.confirm(msg)) return;
    await _submitAll();
  }

  async function _submitAll() {
    if (_submitted) return;
    _submitted = true;
    _stopTimer();
    _saveCurrentAnswer(); // save last editor state

    const overlay  = document.getElementById('exam-submit-overlay');
    const titleEl  = document.getElementById('eso-title');
    const barEl    = document.getElementById('eso-bar');
    const resultEl = document.getElementById('eso-result');
    if (overlay) overlay.style.display = 'flex';

    let scored = 0, totalDiem = 0, countAnswered = 0;

    // Grade all unanswered questions
    for (let i = 0; i < _questions.length; i++) {
      const exercise = _questions[i];
      const ans      = _answers[exercise.id];
      const pct      = Math.round((i + 1) / _questions.length * 100);
      if (barEl) barEl.style.width = pct + '%';
      if (titleEl) titleEl.textContent = `Đang chấm câu ${i + 1}/${_questions.length}...`;

      if (!ans?.code || ans.code.trim() === '') {
        // No answer → 0 điểm
        _answers[exercise.id] = { ...(_answers[exercise.id]||{}), diem: 0, diem_weighted: 0, da_nop: true };
        continue;
      }

      if (!ans.da_nop) {
        // Grade now (await async graders)
        try {
          let gr;
          if      (exercise.type === 'html') gr = CL.Graders.Html.grade(ans.code, exercise.id);
          else if (exercise.type === 'sql')  gr = await CL.Graders.Sql.grade(ans.code, exercise.id);
          else                               gr = await CL.Graders.Python.grade(ans.code, '', exercise.id);
          _answers[exercise.id].diem          = gr.score;
          _answers[exercise.id].diem_weighted = Math.round(gr.score * (exercise._weight||1) * 10) / 10;
          _answers[exercise.id].results       = gr.results;
          _answers[exercise.id].da_nop        = true;
        } catch { _answers[exercise.id].diem = 0; }
      }

      if (_answers[exercise.id]?.diem !== undefined) {
        totalDiem += _answers[exercise.id].diem_weighted || _answers[exercise.id].diem || 0;
        countAnswered++;
      }
      scored++;
    }

    // Calculate final score: sum of weighted scores / total weight → scale to 10
    const totalWeight = _questions.reduce((s, q) => s + (q._weight || 1), 0) || 1;
    // Each question raw score is 0–10; weighted score = raw * weight
    const rawWeighted = _questions.reduce((s, q) => {
      const a = _answers[q.id];
      return s + (a?.diem || 0) * (q._weight || 1);
    }, 0);
    // Final = sum(raw_i * w_i) / sum(w_i), scaled to 10
    const diemFinal = Math.min(10, Math.round(rawWeighted / totalWeight * 10) / 10);

    const tgTong = Math.round((Date.now() - _startTs) / 1000);

    // Save BaiKT to server
    const baiKtId = await CL.API.submitBaiKT({
      ky_id:         _exam.id,
      ten_ky:        _exam.ten,
      diem_tong:     diemFinal,
      so_bai:        _questions.length,
      da_hoan_thanh: countAnswered,
      tg_tong_giay:  tgTong,
      answers:       _answers,
    });

    // Generate PDF proof
    if (titleEl) titleEl.textContent = '📄 Đang tạo minh chứng PDF...';
    const pdfData = await _generatePdfProof(diemFinal, tgTong, baiKtId);

    // Show results
    if (titleEl) titleEl.textContent = '✅ Nộp bài thành công!';
    if (resultEl) {
      const color = diemFinal >= 8 ? '#4ade80' : diemFinal >= 5 ? '#facc15' : '#f87171';
      resultEl.innerHTML = `
        <div class="eso-score" style="color:${color}">${diemFinal}<span>/10</span></div>
        <div class="eso-detail">
          ${countAnswered}/${_questions.length} câu đã làm ·
          ${Math.floor(tgTong/60)}:${String(tgTong%60).padStart(2,'0')} phút
        </div>
        <div class="eso-breakdown">
          ${_questions.map((q, i) => {
            const a = _answers[q.id];
            const d = a?.diem ?? '—';
            const c = parseFloat(d) >= 8 ? '#4ade80' : parseFloat(d) >= 5 ? '#facc15' : '#f87171';
            return `<div class="esob-item">
              <span>Câu ${i+1}</span>
              <span class="bloom-badge bloom-${_inferBloom(q.id)}" style="font-size:9px">${q.lv?.split('–')[0]?.trim()}</span>
              <span style="color:${c};font-weight:700">${d}/10</span>
            </div>`;
          }).join('')}
        </div>`;
    }

    Store.set('_lastPdfData', pdfData);
    const pdfBtn = document.getElementById('eso-pdf-btn');
    if (pdfBtn) pdfBtn.style.display = 'block';

    // Show exit button — return to practice UI
    const overlayCard = document.querySelector('.eso-card');
    if (overlayCard && !document.getElementById('eso-exit-btn')) {
      const exitBtn = document.createElement('button');
      exitBtn.id        = 'eso-exit-btn';
      exitBtn.className = 'eso-exit-btn';
      exitBtn.textContent = '🏠 Về trang luyện tập';
      exitBtn.onclick   = () => {
        try { _disableStrictAntiCheat(); } catch {}
        // Full reload to restore SPA shell cleanly
        window.location.reload();
      };
      overlayCard.appendChild(exitBtn);
    }

    // Clear progress cache
    try { localStorage.removeItem('cl_exam_progress_' + _exam.id); } catch {}

    Events.emit('exam:submitted', { diemFinal, exam: _exam });
    CL.API.logAccess('exam_submit', `${_exam.id}:${diemFinal}`);
  }

  // ── Timer ─────────────────────────────────────────────────────

  function _startTimer(totalSecs) {
    let remaining = totalSecs;
    const timerEl = document.getElementById('exam-timer');

    _timerIv = setInterval(() => {
      remaining--;
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      if (timerEl) {
        timerEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
        timerEl.className   = 'exam-timer' + (remaining <= 300 ? ' warn' : '') + (remaining <= 60 ? ' danger' : '');
      }
      if (remaining === 300) {
        Events.emit('exam:time-warning', { remaining: 300 });
        Toast.warn('⏱ Còn 5 phút!', 6000);
      }
      if (remaining === 60) {
        Events.emit('exam:time-warning', { remaining: 60 });
        Toast.error('⏱ Còn 1 phút! Hãy nộp bài!', 10000);
      }
      if (remaining <= 0) {
        _stopTimer();
        Events.emit('exam:time-up', {});
        Toast.error('⏰ Hết giờ! Đang nộp bài tự động...', 5000);
        setTimeout(() => _submitAll(), 1000);
      }
    }, 1000);
  }

  function _stopTimer() {
    clearInterval(_timerIv);
    _timerIv = null;
  }

  // ── Anti-cheat (strict exam mode) ────────────────────────────

  let _acViolations = 0;

  function _enableStrictAntiCheat() {
    // Fullscreen exit detection
    document.addEventListener('fullscreenchange', _onFullscreenChange);
    // Tab/window visibility
    document.addEventListener('visibilitychange', _onVisibilityChange);
    // Disable ALL keyboard shortcuts
    document.addEventListener('keydown', _strictKeydown, true);
    // Disable right-click
    document.addEventListener('contextmenu', e => e.preventDefault(), true);

    // ── BLOCK COPY/PASTE/CUT in exam editors ──────────────────
    _blockPasteCutCopy();
    // Warn on beforeunload
    window.addEventListener('beforeunload', _onBeforeUnload);
    // DevTools detection
    _devToolsCheck();
  }

  function _disableStrictAntiCheat() {
    document.removeEventListener('fullscreenchange', _onFullscreenChange);
    document.removeEventListener('visibilitychange', _onVisibilityChange);
    document.removeEventListener('keydown', _strictKeydown, true);
    window.removeEventListener('beforeunload', _onBeforeUnload);
  }

  function _onFullscreenChange() {
    if (!document.fullscreenElement && !_submitted) {
      _recordViolation('rời toàn màn hình');
    }
  }

  function _onVisibilityChange() {
    if (document.hidden && !_submitted) {
      _recordViolation('chuyển tab');
    }
  }

  function _strictKeydown(e) {
    const c = e.ctrlKey || e.metaKey, s = e.shiftKey;
    if (e.key === 'F12' || (c && (e.key==='u'||e.key==='s'||e.key==='p'))
        || (c && s && (e.key==='I'||e.key==='J'||e.key==='C'))) {
      e.preventDefault(); e.stopPropagation();
    }
  }

  function _onBeforeUnload(e) {
    if (!_submitted) {
      _saveCurrentAnswer();
      _recordViolation('tải lại trang');
      e.preventDefault();
      return (e.returnValue = 'Bài thi chưa nộp!');
    }
  }

  let _devInterval = null;
  function _devToolsCheck() {
    _devInterval = setInterval(() => {
      if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
        _recordViolation('mở DevTools', true);
      }
    }, 2000);
  }

  function _recordViolation(type, immediate) {
    if (_submitted) return;
    _saveCurrentAnswer();
    _acViolations++;

    CL.API.logViolation(_exam?.id, _acViolations, type, '');
    CL.API.logAccess('exam_violation', `${_exam?.id}:${type}:${_acViolations}`);

    const overlay = document.getElementById('exam-ac-overlay');
    const iconEl  = document.getElementById('eac-icon');
    const titleEl = document.getElementById('eac-title');
    const msgEl   = document.getElementById('eac-msg');
    const btnEl   = document.getElementById('eac-btn');

    if (immediate || _acViolations >= 2) {
      // Auto-submit
      if (iconEl)  iconEl.textContent  = '🔒';
      if (titleEl) titleEl.textContent = 'Bài đã bị nộp tự động!';
      if (msgEl)   msgEl.textContent   = `Vi phạm lần ${_acViolations}: ${type}. Hệ thống tự động nộp bài theo quy định thi.`;
      if (btnEl) { btnEl.style.display = 'none'; }
      if (overlay) overlay.style.display = 'flex';
      setTimeout(() => _submitAll(), 500);
    } else {
      // Warning
      if (iconEl)  iconEl.textContent  = '⚠️';
      if (titleEl) titleEl.textContent = `Cảnh báo vi phạm (lần ${_acViolations}/2)`;
      if (msgEl)   msgEl.textContent   = `Phát hiện: ${type}. Lần tiếp theo bài sẽ tự động nộp!`;
      if (btnEl) {
        btnEl.textContent = 'Tôi hiểu, trở lại làm bài';
        btnEl.onclick = () => {
          if (overlay) overlay.style.display = 'none';
          _requestFullscreen();
        };
      }
      if (overlay) overlay.style.display = 'flex';
    }
  }

  function _requestFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen)   el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  // ── PDF Proof generation ──────────────────────────────────────

  async function _generatePdfProof(diemFinal, tgTong, baiKtId) {
    const user = Session.get();
    const exam = _exam;
    const ts   = new Date().toLocaleString('vi-VN');

    // Build HTML for PDF (using iframe print approach)
    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; font-size: 12px; color: #111; padding: 20px; }
  .header { border-bottom: 2px solid #1a73e8; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start; }
  .school { font-size: 11px; color: #555; }
  .title  { font-size: 16px; font-weight: bold; color: #1a73e8; }
  .badge  { background: #1a73e8; color: white; padding: 4px 10px; border-radius: 4px; font-size: 10px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #f8faff; border: 1px solid #dde; border-radius: 6px; padding: 12px; margin-bottom: 16px; }
  .info-item label { font-size: 10px; color: #555; font-weight: bold; text-transform: uppercase; }
  .info-item value { display: block; font-size: 13px; font-weight: bold; }
  .score-box { text-align: center; background: #f0f8ff; border: 2px solid #1a73e8; border-radius: 8px; padding: 12px; margin-bottom: 16px; }
  .score-num { font-size: 36px; font-weight: 900; color: #1a73e8; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 16px; }
  th { background: #1a73e8; color: white; padding: 6px 8px; text-align: left; }
  td { padding: 5px 8px; border-bottom: 1px solid #eee; }
  tr:nth-child(even) td { background: #f8f8f8; }
  .code-block { background: #1e1e2e; color: #cdd6f4; font-family: monospace; font-size: 10px; padding: 8px; border-radius: 4px; white-space: pre-wrap; word-break: break-all; max-height: 120px; overflow: hidden; margin-top: 4px; }
  .footer { border-top: 1px solid #ddd; padding-top: 8px; font-size: 10px; color: #888; display: flex; justify-content: space-between; }
  @media print { body { padding: 10px; } }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="school">TRƯỜNG THPT THỦ THIÊM · HỆ THỐNG CODELAB</div>
    <div class="title">PHIẾU MINH CHỨNG KẾT QUẢ THI</div>
  </div>
  <div class="badge">OFFICIAL</div>
</div>

<div class="info-grid">
  <div class="info-item"><label>Họ tên</label><value>${user?.name || '—'}</value></div>
  <div class="info-item"><label>MSHS</label><value>${user?.mshs || '—'}</value></div>
  <div class="info-item"><label>Lớp</label><value>${user?.lop || '—'}</value></div>
  <div class="info-item"><label>Kỳ thi</label><value>${Utils.escHtml(exam.ten)}</value></div>
  <div class="info-item"><label>Thời gian làm bài</label><value>${Math.floor(tgTong/60)}:${String(tgTong%60).padStart(2,'0')} phút</value></div>
  <div class="info-item"><label>Thời điểm nộp</label><value>${ts}</value></div>
</div>

<div class="score-box">
  <div style="font-size:12px;color:#555;margin-bottom:4px">ĐIỂM TỔNG KẾT</div>
  <div class="score-num">${diemFinal}<span style="font-size:18px;color:#555">/10</span></div>
  <div style="font-size:11px;color:#555;margin-top:4px">
    ${Object.values(_answers).filter(a=>a.da_nop).length}/${_questions.length} câu hoàn thành
  </div>
</div>

<table>
  <thead>
    <tr><th>#</th><th>Câu hỏi</th><th>Mức Bloom</th><th>Điểm</th><th>Thời gian</th></tr>
  </thead>
  <tbody>
    ${_questions.map((q, i) => {
      const a = _answers[q.id];
      const d = a?.diem ?? '—';
      return `<tr>
        <td>${i+1}</td>
        <td>${Utils.escHtml(q.num + ' ' + q.title)}</td>
        <td>${q.lv || '—'}</td>
        <td style="font-weight:bold;color:${parseFloat(d)>=8?'#15803d':parseFloat(d)>=5?'#92400e':'#b91c1c'}">${d}</td>
        <td>${a?.tg ? Math.floor(a.tg/60)+'m'+String(a.tg%60).padStart(2,'0')+'s' : '—'}</td>
      </tr>`;
    }).join('')}
  </tbody>
</table>

${_questions.slice(0, 5).map((q, i) => {
  const a = _answers[q.id];
  if (!a?.code) return '';
  return `<div style="margin-bottom:12px">
    <div style="font-weight:bold;font-size:11px">Câu ${i+1}: ${Utils.escHtml(q.title)}</div>
    <div class="code-block">${Utils.escHtml(a.code.substring(0, 500))}${a.code.length>500?'...(xem file đầy đủ)':''}</div>
  </div>`;
}).join('')}

<div class="footer">
  <span>Mã bài thi: ${exam.id} · Mã nộp: ${baiKtId||'—'}</span>
  <span>Hệ thống CodeLab v${cfg.APP_VERSION} · ${ts}</span>
</div>
</body>
</html>`;

    // Save to server (compressed)
    try {
      await CL.API.saveMinhChung({
        ky_id:   exam.id,
        html:    html.substring(0, 5000), // truncate for Sheets cell limit
        diem:    diemFinal,
        ts:      new Date().toISOString(),
      });
    } catch {}

    return html;
  }

  function downloadPdf() {
    const html = Store.get('_lastPdfData');
    if (!html) return;
    // Open in new window → print as PDF
    const win = window.open('', '_blank', 'width=800,height=1000');
    win.document.write(html);
    win.document.close();
    win.onload = () => {
      setTimeout(() => { win.focus(); win.print(); }, 500);
    };
  }

  // ── Run SQL helper ────────────────────────────────────────────
  function runSQL() {
    const ta  = document.getElementById('eq-code-input');
    const out = document.getElementById('eq-output');
    if (!ta || !out) return;
    // Delegate to sql editor if available
    if (CL.Editors?.Sql) {
      // use the sql.js db
      out.textContent = '⏳ Đang chạy SQL...';
    }
  }

  // ── Block paste/cut/copy in exam editors ─────────────────────

  let _pasteHandlers = [];

  function _blockPasteCutCopy() {
    const handler = (e) => {
      if (_submitted || _locked) return;
      const target = e.target;
      const isEditor = target.id === 'eq-code-input'
        || target.classList.contains('eq-code-area')
        || target.classList.contains('html-code-area')
        || target.classList.contains('sql-code-area');
      if (!isEditor) return;

      if (e.type === 'paste') {
        e.preventDefault();
        e.stopPropagation();
        // Log violation
        CL.API.logAccess('exam_paste_blocked', `${_exam?.id}:q${_curIdx}`);
        _showPasteBlocked();
        return false;
      }
      if (e.type === 'cut') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      // Allow copy (viewing own work is ok, but log it)
      if (e.type === 'copy') {
        CL.API.logAccess('exam_copy', `${_exam?.id}:q${_curIdx}`);
      }
    };
    // Capture phase ensures it fires before any other handler
    document.addEventListener('paste', handler, true);
    document.addEventListener('cut',   handler, true);
    document.addEventListener('copy',  handler, true);
    _pasteHandlers.push(handler);

    // Also block Ctrl+V / Ctrl+X via keydown (belt + suspenders)
    const kwHandler = (e) => {
      if (_submitted || _locked) return;
      const target = e.target;
      const isEditor = target.id === 'eq-code-input'
        || target.classList.contains('eq-code-area');
      if (!isEditor) return;
      const c = e.ctrlKey || e.metaKey;
      if (c && (e.key === 'v' || e.key === 'V')) {
        e.preventDefault(); e.stopPropagation();
        _showPasteBlocked();
      }
      if (c && (e.key === 'x' || e.key === 'X')) {
        e.preventDefault(); e.stopPropagation();
      }
    };
    document.addEventListener('keydown', kwHandler, true);
    _pasteHandlers.push(kwHandler);
  }

  let _pasteToastTimer = null;
  function _showPasteBlocked() {
    // Show temporary overlay on the editor
    const existing = document.getElementById('exam-paste-msg');
    if (existing) { clearTimeout(_pasteToastTimer); existing.remove(); }
    const msg = document.createElement('div');
    msg.id = 'exam-paste-msg';
    msg.className = 'exam-paste-block-msg';
    msg.innerHTML = '🚫 Không được dán (paste) trong giờ kiểm tra';
    const ws = document.getElementById('exam-workspace');
    if (ws) ws.appendChild(msg);
    _pasteToastTimer = setTimeout(() => msg.remove(), 2500);
  }

  // ── Cleanup ───────────────────────────────────────────────────
  function cleanup() {
    _stopTimer();
    clearInterval(_devInterval);
    _disableStrictAntiCheat();
    // Remove paste/cut/copy handlers
    _pasteHandlers.forEach(h => {
      document.removeEventListener('paste', h, true);
      document.removeEventListener('cut',   h, true);
      document.removeEventListener('copy',  h, true);
      document.removeEventListener('keydown', h, true);
    });
    _pasteHandlers = [];
  }

  // Backward compat
  window.ExamMode = { start, navTo, submitQuestion, confirmSubmit, downloadPdf, cleanup, handleEditorKey, onPaste, scheduleHtmlPreview, runCode, runSQL };

  return { start, navTo, submitQuestion, confirmSubmit, downloadPdf, cleanup, handleEditorKey, onPaste, scheduleHtmlPreview, runCode, runSQL };
});

// ─── js/features/teacher/analytics.js ───────────────────────────
/**
 * features/teacher/analytics.js — Thống kê & Phân tích (v2)
 * ═══════════════════════════════════════════════════════════════
 * Tabs:
 *   📈 Tổng hợp lớp    — heatmap, class comparison, early warning
 *   👤 Năng lực HS      — NL1/NL2/NL3 radar, Bloom, trend, persistence
 *   🎯 Phân tích đề     — Item analysis (p, D, r, α), ma trận 2 chiều
 *   📥 Xuất dữ liệu     — CSV, hồ sơ học sinh
 *
 * CT GDPT 2018 compliance:
 *   - Map Bloom → NL1/NL2/NL3 via Config.BLOOM_NL_MAP
 *   - Ma trận đề theo TT26/2022 (Nhận biết/Thông hiểu/Vận dụng/VD cao)
 *   - Item analysis: p, D, r, Cronbach alpha
 *   - Early warning: HS liên tục < 5 hoặc NL yếu
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Teacher.Analytics', () => {
  const cfg      = CL.require('Config');
  const Utils    = CL.require('Utils');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  const BLOOM_COLOR = { b1:'#6366f1',b2:'#3b82f6',b3:'#10b981',b4:'#f59e0b',b5:'#ef4444',b6:'#8b5cf6' };
  const NL_COLOR    = { NL1:'#4f9eff', NL2:'#34d399', NL3:'#a78bfa' };

  // ══════════════════════════════════════════════════════════════
  //  RENDER — shell
  // ══════════════════════════════════════════════════════════════
  async function render(el) {
    el.innerHTML = `
      <div class="ana-wrap">
        <div class="ana-tabs">
          <button class="ana-tab on"  data-tab="class"   onclick="CL.Teacher.Analytics.switchTab(this,'class')">📈 Tổng hợp lớp</button>
          <button class="ana-tab"     data-tab="student" onclick="CL.Teacher.Analytics.switchTab(this,'student')">👤 Năng lực HS</button>
          <button class="ana-tab"     data-tab="exam"    onclick="CL.Teacher.Analytics.switchTab(this,'exam')">🎯 Phân tích đề</button>
          <button class="ana-tab"     data-tab="export"  onclick="CL.Teacher.Analytics.switchTab(this,'export')">📥 Xuất</button>
        </div>
        <div class="ana-content" id="ana-content"></div>
      </div>`;
    await renderClass(document.getElementById('ana-content'));
  }

  function switchTab(btn, tab) {
    document.querySelectorAll('.ana-tab').forEach(b => b.classList.toggle('on', b === btn));
    const body = document.getElementById('ana-content');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    const fns = { class: renderClass, student: renderStudent, exam: renderExam, export: renderExport };
    (fns[tab] || (() => {}))(body);
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB 1: TỔNG HỢP LỚP
  // ══════════════════════════════════════════════════════════════
  async function renderClass(el) {
    try {
      const [baiKTs, students, exams] = await Promise.all([
        CL.API.getBaiKT(), CL.API.getStudentList(), CL.API.getExams(),
      ]);

      const lops   = [...new Set(students.map(s => s.lop).filter(Boolean))].sort();
      const closed = exams.filter(e => e.trang_thai === 'closed' || e.trang_thai === 'active');

      // Class averages for comparison
      const classStats = _buildClassStats(baiKTs, students);

      // Early warning: students with 3+ consecutive scores < 5
      const warnings = _earlyWarning(baiKTs, students);

      el.innerHTML = `
        <div class="ana-toolbar">
          <select id="ana-lop-filter" class="ana-select" onchange="CL.Teacher.Analytics.filterClass()">
            <option value="">Tất cả lớp</option>
            ${lops.map(l => `<option>${l}</option>`).join('')}
          </select>
          <select id="ana-exam-filter" class="ana-select" onchange="CL.Teacher.Analytics.filterClass()">
            <option value="">Tất cả kỳ thi</option>
            ${closed.map(e => `<option value="${Utils.escHtml(e.id)}">${Utils.escHtml(e.ten)}</option>`).join('')}
          </select>
          <button class="ana-btn" onclick="CL.Teacher.Analytics.filterClass()">🔄 Cập nhật</button>
        </div>

        ${warnings.length ? `
        <div class="ana-warning-box">
          <div class="awb-title">⚠️ Cảnh báo sớm — ${warnings.length} học sinh cần hỗ trợ</div>
          <div class="awb-list">
            ${warnings.slice(0,5).map(w => `
              <div class="awb-item">
                <span class="awb-name">${Utils.escHtml(w.ho_ten)}</span>
                <span class="awb-lop">${Utils.escHtml(w.lop)}</span>
                <span class="awb-reason">${Utils.escHtml(w.reason)}</span>
              </div>`).join('')}
            ${warnings.length > 5 ? `<div class="awb-more">...và ${warnings.length-5} học sinh khác</div>` : ''}
          </div>
        </div>` : ''}

        <div class="ana-class-grid" id="ana-class-grid">
          ${_buildClassCards(classStats)}
        </div>

        <div class="ana-section-title">So sánh điểm trung bình các lớp</div>
        ${_buildClassComparison(classStats)}

        <div class="ana-section-title">Bảng điểm chi tiết</div>
        <div id="ana-table-wrap">
          ${_buildClassTable(baiKTs, students, exams, '', '')}
        </div>`;

      // Save for filter
      el._baiKTs   = baiKTs;
      el._students = students;
      el._exams    = exams;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function filterClass() {
    const body   = document.getElementById('ana-content');
    const lop    = document.getElementById('ana-lop-filter')?.value || '';
    const examId = document.getElementById('ana-exam-filter')?.value || '';
    const table  = document.getElementById('ana-table-wrap');
    if (table && body?._baiKTs)
      table.innerHTML = _buildClassTable(body._baiKTs, body._students, body._exams, lop, examId);
  }

  function _earlyWarning(baiKTs, students) {
    const stuMap = {};
    students.forEach(s => { stuMap[s.mshs] = s; });

    // Group by student, sort by date, check 3 consecutive below 5
    const byStudent = {};
    for (const kt of baiKTs) {
      if (!byStudent[kt.mshs]) byStudent[kt.mshs] = [];
      byStudent[kt.mshs].push({ diem: parseFloat(kt.diem_tong)||0, ts: kt.ts });
    }

    const warnings = [];
    for (const [mshs, kts] of Object.entries(byStudent)) {
      const sorted = kts.sort((a,b) => new Date(a.ts)-new Date(b.ts));
      // Check last 3 scores
      const last3 = sorted.slice(-3).map(k => k.diem);
      if (last3.length >= 3 && last3.every(d => d < 5)) {
        const stu = stuMap[mshs] || { ho_ten: mshs, lop: '' };
        warnings.push({
          mshs, ho_ten: stu.ho_ten, lop: stu.lop,
          reason: `3 bài liên tiếp < 5 (${last3.map(d=>d.toFixed(1)).join(', ')})`,
        });
      }
      // Check any score below 3
      const veryLow = sorted.filter(k => k.diem < 3);
      if (veryLow.length >= 2 && !warnings.find(w => w.mshs === mshs)) {
        const stu = stuMap[mshs] || { ho_ten: mshs, lop: '' };
        warnings.push({ mshs, ho_ten: stu.ho_ten, lop: stu.lop, reason: `${veryLow.length} bài < 3 điểm` });
      }
    }
    return warnings;
  }

  function _buildClassStats(baiKTs, students) {
    const lops = [...new Set(students.map(s => s.lop).filter(Boolean))].sort();
    return lops.map(lop => {
      const lopStudents = students.filter(s => s.lop === lop);
      const lopKTs = baiKTs.filter(kt => kt.lop === lop);
      const scores = lopKTs.map(kt => parseFloat(kt.diem_tong)||0);
      if (!scores.length) return { lop, n: lopStudents.length, avg: 0, pass: 0, min: 0, max: 0, sd: 0 };
      const avg  = scores.reduce((a,b)=>a+b,0)/scores.length;
      const pass = scores.filter(d=>d>=5).length/scores.length*100;
      const sd   = Math.sqrt(scores.reduce((a,b)=>a+(b-avg)**2,0)/scores.length);
      return { lop, n: lopStudents.length, avg: Math.round(avg*100)/100,
               pass: Math.round(pass), min: Math.min(...scores), max: Math.max(...scores),
               sd: Math.round(sd*100)/100 };
    });
  }

  function _buildClassCards(stats) {
    if (!stats.length) return '<div class="tp-empty">Chưa có dữ liệu</div>';
    return `<div class="ana-cards">
      ${stats.map(s => {
        const cls = s.avg>=8?'high':s.avg>=5?'mid':'low';
        return `<div class="ana-card-box ${cls}">
          <div class="acb-lop">${Utils.escHtml(s.lop)}</div>
          <div class="acb-avg">${s.avg.toFixed(1)}</div>
          <div class="acb-meta">${s.n} HS · Đạt ${s.pass}% · SD ${s.sd}</div>
          <div class="acb-range">${s.min.toFixed(1)} – ${s.max.toFixed(1)}</div>
        </div>`;
      }).join('')}
    </div>`;
  }

  function _buildClassComparison(stats) {
    if (stats.length < 2) return '';
    const maxAvg = Math.max(...stats.map(s=>s.avg)) || 10;
    return `<div class="ana-bar-chart">
      ${stats.map(s => {
        const pct = Math.round(s.avg/10*100);
        const cls = s.avg>=8?'high':s.avg>=5?'mid':'low';
        return `<div class="abc-row">
          <div class="abc-label">${Utils.escHtml(s.lop)}</div>
          <div class="abc-bar-wrap">
            <div class="abc-bar ${cls}" style="width:${pct}%"></div>
            <span class="abc-val">${s.avg.toFixed(2)}</span>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  function _buildClassTable(baiKTs, students, exams, lopFilter, examFilter) {
    const filteredKTs = baiKTs.filter(kt =>
      (!lopFilter  || kt.lop === lopFilter) &&
      (!examFilter || kt.ky_id === examFilter)
    );
    const examMap = {};
    exams.forEach(e => { examMap[e.id] = e.ten; });

    // Group by student
    const stuMap = {};
    students.filter(s => !lopFilter || s.lop === lopFilter).forEach(s => {
      stuMap[s.mshs] = { ...s, scores: [] };
    });
    filteredKTs.forEach(kt => {
      if (!stuMap[kt.mshs]) stuMap[kt.mshs] = { mshs: kt.mshs, ho_ten: kt.ho_ten, lop: kt.lop, scores: [] };
      stuMap[kt.mshs].scores.push({ ten: examMap[kt.ky_id]||kt.ky_id, diem: parseFloat(kt.diem_tong)||0 });
    });

    const rows = Object.values(stuMap).filter(s => s.scores.length || !lopFilter);
    if (!rows.length) return '<div class="tp-empty">Không có dữ liệu</div>';

    return `<div class="ana-table-wrap"><table class="ana-table">
      <thead><tr>
        <th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>ĐTB</th>
        <th>Số KT</th><th>Đạt</th><th>Xu hướng</th>
      </tr></thead>
      <tbody>${rows.map(s => {
        const scores = s.scores.map(sc=>sc.diem);
        const avg    = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : 0;
        const pass   = scores.filter(d=>d>=5).length;
        const trend  = scores.length>=2 ? scores[scores.length-1]-scores[0] : 0;
        const cls    = avg>=8?'high':avg>=5?'mid':'low';
        return `<tr>
          <td class="mono">${Utils.escHtml(s.mshs||'')}</td>
          <td>${Utils.escHtml(s.ho_ten||'')}</td>
          <td><span class="ana-lop-badge">${Utils.escHtml(s.lop||'')}</span></td>
          <td><span class="ana-score-badge ${cls}">${avg.toFixed(2)}</span></td>
          <td>${scores.length}</td>
          <td>${pass}/${scores.length}</td>
          <td>${scores.length>=2 ? (trend>0?`<span class="trend-up">↗ +${trend.toFixed(1)}</span>`
            : trend<0 ? `<span class="trend-down">↘ ${trend.toFixed(1)}</span>`
            : '<span class="trend-flat">→ 0</span>') : '—'}</td>
        </tr>`;
      }).join('')}
      </tbody></table></div>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB 2: NĂNG LỰC HỌC SINH (CT2018)
  // ══════════════════════════════════════════════════════════════
  async function renderStudent(el) {
    try {
      const [students] = await Promise.all([CL.API.getStudentList()]);
      const lops = [...new Set(students.map(s=>s.lop).filter(Boolean))].sort();

      el.innerHTML = `
        <div class="ana-toolbar">
          <select id="ana-stu-lop" class="ana-select">
            <option value="">Tất cả lớp</option>
            ${lops.map(l=>`<option>${l}</option>`).join('')}
          </select>
          <input id="ana-stu-search" class="ana-input" type="text" placeholder="Tìm MSHS / Họ tên...">
          <button class="ana-btn" onclick="CL.Teacher.Analytics.loadStudentDetail()">🔍 Xem</button>
        </div>
        <div id="ana-stu-result">
          <div class="tp-empty">Chọn hoặc tìm học sinh để xem hồ sơ năng lực.</div>
        </div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  async function loadStudentDetail() {
    const result = document.getElementById('ana-stu-result');
    if (!result) return;
    const search = document.getElementById('ana-stu-search')?.value?.trim() || '';
    const lopFilter = document.getElementById('ana-stu-lop')?.value || '';
    result.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';

    try {
      const [kts, lams, students] = await Promise.all([
        CL.API.getBaiKT(), CL.API.getHistory(true), CL.API.getStudentList(),
      ]);
      // Enrich: also load per-question exam scores for NL profile
      // getBaiLamForStudent returns compact records — merge into lams
      let examLams = [];
      try {
        const mshs = document.getElementById('ana-stu-search')?.value?.trim();
        if (mshs) {
          const bl = await CL.API.getBaiLamForStudent(mshs);
          examLams = Array.isArray(bl) ? bl : [];
        }
      } catch { /* optional — degrade gracefully */ }
      const allLams = [...lams, ...examLams];

      // Find matching students
      const matches = students.filter(s =>
        (!lopFilter || s.lop === lopFilter) &&
        (!search || s.mshs?.includes(search) || s.ho_ten?.toLowerCase().includes(search.toLowerCase()))
      );

      if (!matches.length) { result.innerHTML = '<div class="tp-empty">Không tìm thấy học sinh.</div>'; return; }

      // If multiple, show list; if 1, show full profile
      if (matches.length > 1 && search) {
        result.innerHTML = `<div class="tp-empty">${matches.length} học sinh phù hợp. Hãy nhập chính xác hơn.</div>
          ${matches.slice(0,10).map(s=>`
          <div class="ana-stu-item" onclick="document.getElementById('ana-stu-search').value='${s.mshs}';CL.Teacher.Analytics.loadStudentDetail()">
            <b>${Utils.escHtml(s.ho_ten)}</b> · ${Utils.escHtml(s.mshs)} · ${Utils.escHtml(s.lop)}
          </div>`).join('')}`;
        return;
      }

      const stu = matches[0];
      const stuKTs  = kts.filter(k => k.mshs === stu.mshs).sort((a,b)=>new Date(a.ts)-new Date(b.ts));
      const stuLams = allLams.filter(l => l.mshs === stu.mshs);

      result.innerHTML = _renderStudentProfile(stu, stuKTs, stuLams, students, kts);
    } catch(e) {
      result.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _renderStudentProfile(stu, kts, lams, allStudents, allKTs) {
    const scores = kts.map(k => parseFloat(k.diem_tong)||0);
    const avg    = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : 0;
    const pass   = scores.filter(d=>d>=5).length;
    const trend  = scores.length>=2 ? scores[scores.length-1]-scores[0] : 0;

    // Bloom breakdown from lams (practice history)
    const bloomMap = {};
    for (const lam of lams) {
      const exId = lam.bai_id || '';
      const ex   = Registry.findById(exId);
      const bloom = ex ? (ex.lv||'').match(/B(\d)/)?.[1] : exId.match(/-b(\d)-/)?.[1];
      if (!bloom) continue;
      if (!bloomMap['b'+bloom]) bloomMap['b'+bloom] = [];
      bloomMap['b'+bloom].push(parseFloat(lam.diem)||0);
    }

    const bloomRadar = ['b1','b2','b3','b4','b5','b6'].map(lv => ({
      lv, avg: bloomMap[lv]?.length
        ? Math.round(bloomMap[lv].reduce((a,b)=>a+b,0)/bloomMap[lv].length*10)/10 : null,
      count: bloomMap[lv]?.length || 0,
    }));

    // NL1/NL2/NL3 from Bloom mapping
    const nlMap = { NL1: [], NL2: [], NL3: [] };
    for (const lam of lams) {
      const ex = Registry.findById(lam.bai_id);
      if (!ex) continue;
      const nls = Registry.getNL(ex);
      for (const nl of nls) {
        const group = nl.startsWith('NL1') ? 'NL1' : nl.startsWith('NL2') ? 'NL2' : 'NL3';
        if (!nlMap[group]) nlMap[group] = [];
        nlMap[group].push(parseFloat(lam.diem)||0);
      }
    }

    // NL scores (0-100 scale)
    const nlScores = Object.entries(nlMap).map(([nl, scores]) => ({
      nl, label: cfg.NL_GROUPS?.[nl]?.label || nl,
      color: NL_COLOR[nl] || '#888',
      avg: scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length*10) : null,
      count: scores.length,
    }));

    // Persistence: avg lần thử per bài
    const tryCount = {};
    for (const lam of lams) {
      if (!tryCount[lam.bai_id]) tryCount[lam.bai_id] = 0;
      tryCount[lam.bai_id]++;
    }
    const tries = Object.values(tryCount);
    const persistence = tries.length ? tries.reduce((a,b)=>a+b,0)/tries.length : 0;

    // Percentile in class
    const classMates = allKTs.filter(k => k.lop === stu.lop).map(k => parseFloat(k.diem_tong)||0);
    const below = classMates.filter(s => s < avg).length;
    const percentile = classMates.length ? Math.round(below/classMates.length*100) : null;

    return `
      <div class="ana-profile">
        <div class="ap-header">
          <div class="ap-avatar">${(stu.ho_ten||'?')[0].toUpperCase()}</div>
          <div class="ap-info">
            <div class="ap-name">${Utils.escHtml(stu.ho_ten||'')}</div>
            <div class="ap-meta">${Utils.escHtml(stu.mshs||'')} · ${Utils.escHtml(stu.lop||'')}</div>
          </div>
          <div class="ap-summary">
            <div class="aps-card"><div class="aps-val">${avg.toFixed(2)}</div><div class="aps-lbl">ĐTB KT</div></div>
            <div class="aps-card"><div class="aps-val">${pass}/${scores.length}</div><div class="aps-lbl">Bài đạt</div></div>
            <div class="aps-card"><div class="aps-val ${trend>0?'ok':trend<0?'warn':''}">${trend>0?'+':''}${trend.toFixed(1)}</div><div class="aps-lbl">Xu hướng</div></div>
            ${percentile!==null?`<div class="aps-card"><div class="aps-val">${percentile}%</div><div class="aps-lbl">Phân vị lớp</div></div>`:''}
          </div>
        </div>

        ${nlScores.some(n=>n.avg!==null) ? `
        <div class="ap-section-title">🎯 Hồ sơ năng lực CT GDPT 2018</div>
        <div class="ap-nl-grid">
          ${nlScores.map(nl => {
            if (nl.avg === null) return `<div class="ap-nl-card na"><div class="ap-nl-label">${nl.label}</div><div class="ap-nl-val">—</div><div class="ap-nl-sub">Chưa có dữ liệu</div></div>`;
            const pct  = nl.avg;
            const grade = pct>=80?'Tốt':pct>=65?'Khá':pct>=50?'Trung bình':'Yếu';
            const warn  = pct < 50 ? ' ap-nl-warn' : '';
            return `<div class="ap-nl-card${warn}">
              <div class="ap-nl-label" style="color:${nl.color}">${Utils.escHtml(nl.label)}</div>
              <div class="ap-nl-bar"><div class="ap-nl-fill" style="width:${pct}%;background:${nl.color}"></div></div>
              <div class="ap-nl-row"><span class="ap-nl-val">${pct}/100</span><span class="ap-nl-grade">${grade}${pct<50?' ⚠️':''}</span></div>
              <div class="ap-nl-sub">${nl.count} bài luyện tập</div>
            </div>`;
          }).join('')}
        </div>` : ''}

        <div class="ap-section-title">📊 Phân tích theo mức Bloom</div>
        <div class="ap-bloom-grid">
          ${bloomRadar.map(b => {
            if (b.avg === null) return `<div class="ap-bloom-cell na"><div class="ap-bloom-lv">B${b.lv[1]}</div><div>—</div></div>`;
            const pct = b.avg*10;
            return `<div class="ap-bloom-cell" style="border-color:${BLOOM_COLOR[b.lv]}">
              <div class="ap-bloom-lv" style="color:${BLOOM_COLOR[b.lv]}">B${b.lv[1]}</div>
              <div class="ap-bloom-bar"><div class="ap-bloom-fill" style="width:${pct}%;background:${BLOOM_COLOR[b.lv]}"></div></div>
              <div class="ap-bloom-val">${b.avg}/10 <span>(${b.count} bài)</span></div>
            </div>`;
          }).join('')}
        </div>

        ${scores.length >= 2 ? `
        <div class="ap-section-title">📈 Tiến bộ theo thời gian</div>
        <div class="ap-trend-chart">
          ${kts.map((kt,i) => {
            const d   = parseFloat(kt.diem_tong)||0;
            const pct = d/10*100;
            const cls = d>=8?'high':d>=5?'mid':'low';
            return `<div class="ap-trend-bar">
              <div class="ap-trend-fill ${cls}" style="height:${pct}%" title="${kt.ten_ky||''}: ${d}"></div>
              <div class="ap-trend-val">${d.toFixed(1)}</div>
              <div class="ap-trend-lbl">${(kt.ten_ky||'').slice(0,8)}</div>
            </div>`;
          }).join('')}
        </div>` : ''}

        <div class="ap-section-title">💪 Phẩm chất</div>
        <div class="ap-pc-grid">
          <div class="ap-pc-card">
            <div class="ap-pc-icon">📚</div>
            <div class="ap-pc-label">PC3 Chăm chỉ</div>
            <div class="ap-pc-val">${persistence.toFixed(1)}<span> lần thử/bài TB</span></div>
            <div class="ap-pc-bar"><div class="ap-pc-fill" style="width:${Math.min(100,persistence/5*100)}%"></div></div>
          </div>
          <div class="ap-pc-card">
            <div class="ap-pc-icon">✅</div>
            <div class="ap-pc-label">PC4 Trung thực</div>
            <div class="ap-pc-val">0<span> vi phạm</span></div>
            <div class="ap-pc-bar"><div class="ap-pc-fill" style="width:100%;background:var(--accent2)"></div></div>
          </div>
        </div>

        ${_autoComment(kts, bloomRadar, nlScores, stu)}
      </div>`;
  }

  function _autoComment(kts, bloomRadar, nlScores, stu) {
    const weak    = bloomRadar.filter(b=>b.avg!==null&&b.avg<5).map(b=>`B${b.lv[1]}`);
    const strong  = bloomRadar.filter(b=>b.avg!==null&&b.avg>=8).map(b=>`B${b.lv[1]}`);
    const nlWeak  = nlScores.filter(n=>n.avg!==null&&n.avg<50).map(n=>n.nl);
    const trend   = kts.length>=2 ? kts[kts.length-1].diem_tong - kts[0].diem_tong : 0;

    const parts = [];
    if (strong.length)  parts.push(`Mạnh: ${strong.join(', ')}`);
    if (weak.length)    parts.push(`Cần tăng cường: ${weak.join(', ')}`);
    if (nlWeak.length)  parts.push(`Năng lực yếu: ${nlWeak.join(', ')} (< 50%)`);
    if (trend > 0.5)    parts.push(`Xu hướng tích cực ↗ +${(+trend).toFixed(1)} điểm`);
    if (trend < -0.5)   parts.push(`Xu hướng giảm ↘ ${(+trend).toFixed(1)} điểm — cần chú ý`);
    if (!parts.length)  return '';

    return `<div class="ap-comment">
      <div class="ap-comment-title">🤖 Nhận xét tự động</div>
      <div>${parts.map(p=>`<div class="ap-comment-item">• ${Utils.escHtml(p)}</div>`).join('')}</div>
    </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB 3: PHÂN TÍCH ĐỀ (Item Analysis + Ma trận TT26)
  // ══════════════════════════════════════════════════════════════
  async function renderExam(el) {
    try {
      const exams = await CL.API.getExams(true);
      const closed = exams.filter(e=>e.trang_thai==='closed'||e.trang_thai==='active');

      el.innerHTML = `
        <div class="ana-toolbar">
          <select id="ana-exam-sel" class="ana-select">
            <option value="">— Chọn kỳ thi để phân tích —</option>
            ${closed.map(e=>`<option value="${Utils.escHtml(e.id)}">${Utils.escHtml(e.ten)}</option>`).join('')}
          </select>
          <button class="ana-btn" onclick="CL.Teacher.Analytics.loadExamAnalysis()">🔍 Phân tích</button>
        </div>
        <div id="ana-exam-result">
          <div class="tp-empty">Chọn kỳ thi rồi nhấn Phân tích.</div>
        </div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  async function loadExamAnalysis() {
    const kyId  = document.getElementById('ana-exam-sel')?.value;
    const res   = document.getElementById('ana-exam-result');
    if (!kyId || !res) return;
    res.innerHTML = '<div class="tp-loading">⏳ Đang tính toán...</div>';

    try {
      const [analysis, matrix, exams] = await Promise.all([
        CL.API.getItemAnalysis(kyId),
        CL.API.getExamMatrix(kyId),
        CL.API.getExams(),
      ]);
      const exam = exams.find(e=>e.id===kyId);

      res.innerHTML = `
        ${_renderExamStats(analysis, exam)}
        ${_renderItemAnalysis(analysis)}
        ${_renderMatrix(matrix)}
      `;
    } catch(e) {
      res.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _renderExamStats(data, exam) {
    const s = data.stats || {};
    const alphaCls = (data.alpha||0)>=0.7?'ok':(data.alpha||0)>=0.6?'warn':'bad';

    // Histogram
    const maxH = Math.max(...(s.histogram||[1]));
    const hist = (s.histogram||[]).map((n,i) => {
      const pct = Math.round(n/maxH*100)||0;
      const cls = i>=8?'high':i>=5?'mid':'low';
      return `<div class="hist-bar">
        <div class="hist-fill ${cls}" style="height:${pct}%"></div>
        <div class="hist-val">${n}</div>
        <div class="hist-lbl">${i}–${i+1}</div>
      </div>`;
    }).join('');

    return `
      <div class="ana-exam-header">
        <div class="aeh-title">${Utils.escHtml(exam?.ten||kyId)}</div>
        <div class="aeh-meta">${data.n_students} học sinh</div>
      </div>
      <div class="ana-stats-row">
        <div class="ast-card"><div class="ast-val">${s.mean?.toFixed(2)||'—'}</div><div class="ast-lbl">ĐTB</div></div>
        <div class="ast-card"><div class="ast-val">${s.median?.toFixed(1)||'—'}</div><div class="ast-lbl">Trung vị</div></div>
        <div class="ast-card"><div class="ast-val">${s.sd?.toFixed(2)||'—'}</div><div class="ast-lbl">ĐLC (SD)</div></div>
        <div class="ast-card"><div class="ast-val">${s.min?.toFixed(1)||'—'}</div><div class="ast-lbl">Min</div></div>
        <div class="ast-card"><div class="ast-val">${s.max?.toFixed(1)||'—'}</div><div class="ast-lbl">Max</div></div>
        <div class="ast-card"><div class="ast-val">${s.pass_rate||0}%</div><div class="ast-lbl">Tỉ lệ đạt</div></div>
        <div class="ast-card ast-alpha ${alphaCls}">
          <div class="ast-val">${data.alpha?.toFixed(2)||'—'}</div>
          <div class="ast-lbl">Cronbach α</div>
          <div class="ast-eval">${data.alpha_eval||''}</div>
        </div>
      </div>
      <div class="ana-section-title">Phân phối điểm</div>
      <div class="ana-histogram">${hist}</div>`;
  }

  function _renderItemAnalysis(data) {
    if (!data.items?.length) return '<div class="tp-empty">Chưa đủ dữ liệu phân tích câu hỏi.</div>';

    const sorted = [...data.items].sort((a,b) => {
      // Sort: bad items first
      const scoreA = (a.eval_p.includes('⚠️')?0:1)+(a.eval_D.includes('⚠️')?0:1);
      const scoreB = (b.eval_p.includes('⚠️')?0:1)+(b.eval_D.includes('⚠️')?0:1);
      return scoreA - scoreB;
    });

    return `
      <div class="ana-section-title">Phân tích câu hỏi (Item Analysis)</div>
      <div class="ana-item-hint">
        <b>p</b> = độ khó (0.3–0.7 tốt) &nbsp;·&nbsp;
        <b>D</b> = độ phân biệt (≥0.3 tốt) &nbsp;·&nbsp;
        <b>r</b> = tương quan điểm câu/tổng (≥0.2 tốt)
      </div>
      <div class="ana-item-table-wrap">
        <table class="ana-table">
          <thead><tr>
            <th>Câu hỏi</th><th>n</th>
            <th title="Độ khó thực nghiệm">p</th>
            <th title="Độ phân biệt 27%">D</th>
            <th title="Tương quan điểm">r</th>
            <th>ĐTB</th><th>SD</th><th>Đánh giá</th>
          </tr></thead>
          <tbody>${sorted.map(item => {
            const ok   = item.good;
            const ex   = Registry.findById(item.bai_id);
            const name = ex ? `${ex.num} ${ex.title}` : item.bai_id;
            const bloom = (ex?.lv||'').match(/B(\d)/)?.[1];
            return `<tr class="${ok?'':'item-warn'}">
              <td title="${Utils.escHtml(name)}">
                ${bloom?`<span class="bloom-dot" style="background:${BLOOM_COLOR['b'+bloom]||'#888'}"></span>`:''}
                ${Utils.escHtml(name.slice(0,40))}
              </td>
              <td>${item.n}</td>
              <td class="${item.p<0.3||item.p>0.8?'warn-cell':''}">${item.p.toFixed(2)}</td>
              <td class="${item.D<0.2?'warn-cell':''}">${item.D.toFixed(2)}</td>
              <td class="${item.r<0.2?'warn-cell':''}">${item.r.toFixed(2)}</td>
              <td>${item.mean.toFixed(2)}</td>
              <td>${item.sd.toFixed(2)}</td>
              <td class="item-eval">${item.eval_p} ${item.eval_D}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
  }

  function _renderMatrix(matrix) {
    if (!matrix.rows?.length) return '';
    const cols = matrix.cols || [];
    return `
      <div class="ana-section-title">Ma trận đề (theo TT26/2022)</div>
      <div class="ana-matrix-wrap">
        <table class="ana-matrix-table">
          <thead>
            <tr>
              <th>Chủ đề</th>
              ${cols.map(c=>`<th>${c}</th>`).join('')}
              <th>Tổng</th>
            </tr>
            <tr class="matrix-pct-row">
              <th>Tỉ lệ</th>
              ${cols.map(c=>`<th class="matrix-pct">${matrix.col_pct?.[c]||0}%</th>`).join('')}
              <th>100%</th>
            </tr>
          </thead>
          <tbody>
            ${(matrix.rows||[]).map(row => {
              const rowData = matrix.matrix?.[row] || {};
              let rowTotal = 0;
              const cells = cols.map(col => {
                const items = rowData[col] || [];
                const pts = items.reduce((a,b)=>a+b.pts,0);
                rowTotal += pts;
                return items.length
                  ? `<td class="matrix-cell has-items">
                      <span class="matrix-count">${items.length} câu</span>
                      <span class="matrix-pts">${pts.toFixed(1)}đ</span>
                    </td>`
                  : '<td class="matrix-cell empty">—</td>';
              }).join('');
              return `<tr><td class="matrix-row-label">${Utils.escHtml(row)}</td>${cells}<td class="matrix-total">${rowTotal.toFixed(1)}đ</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB 4: XUẤT DỮ LIỆU
  // ══════════════════════════════════════════════════════════════
  async function renderExport(el) {
    el.innerHTML = `
      <div class="ana-export-wrap">
        <div class="aex-section">
          <div class="aex-title">📄 Xuất báo cáo PDF</div>
          <div class="aex-desc">In báo cáo tổng hợp lớp hoặc hồ sơ học sinh ra PDF (dùng Print → Save as PDF của trình duyệt).</div>
          <div class="aex-actions">
            <select id="export-lop-pdf" class="ana-select" style="width:auto">
              <option value="">Tất cả lớp</option>
            </select>
            <button class="ana-btn-primary" onclick="CL.Teacher.Analytics.exportPdfReport()">🖨️ In / Xuất PDF</button>
          </div>
        </div>

        <div class="aex-section">
          <div class="aex-title">📊 Xuất bảng điểm</div>
          <div class="aex-desc">Xuất điểm tổng hợp tất cả học sinh và kỳ thi ra file CSV.</div>
          <div class="aex-actions">
            <button class="ana-btn-primary" onclick="CL.Teacher.Analytics.exportClassCsv()">📥 Xuất BangDiem.csv</button>
            <select id="export-lop" class="ana-select" style="width:auto">
              <option value="">Tất cả lớp</option>
            </select>
          </div>
          <div id="export-msg" class="aex-msg"></div>
        </div>

        <div class="aex-section">
          <div class="aex-title">👤 Xuất hồ sơ năng lực</div>
          <div class="aex-desc">Xuất hồ sơ NL1/NL2/NL3 + Bloom của từng học sinh (theo CT GDPT 2018).</div>
          <div class="aex-actions">
            <button class="ana-btn-primary" onclick="CL.Teacher.Analytics.exportStudentProfiles()">📥 Xuất HoSoNangLuc.csv</button>
          </div>
        </div>
      </div>`;

    // Load lops
    try {
      const students = await CL.API.getStudentList();
      const lops = [...new Set(students.map(s=>s.lop).filter(Boolean))].sort();
      const sel  = document.getElementById('export-lop');
      if (sel) lops.forEach(l => { const o=document.createElement('option'); o.value=o.textContent=l; sel.appendChild(o); });
    } catch {}
  }

  async function exportClassCsv() {
    const msg = document.getElementById('export-msg');
    if (msg) msg.textContent = '⏳ Đang xuất...';
    try {
      const [kts, students, exams] = await Promise.all([
        CL.API.getBaiKT(), CL.API.getStudentList(), CL.API.getExams(),
      ]);
      const lopFilter = document.getElementById('export-lop')?.value || '';
      const examMap   = {};
      exams.forEach(e=>{ examMap[e.id]=e.ten; });

      const rows = [['MSHS','Họ tên','Lớp','Kỳ thi','Điểm','Năm học','Thời gian']];
      kts.filter(kt=>!lopFilter||kt.lop===lopFilter).forEach(kt => {
        rows.push([kt.mshs, kt.ho_ten, kt.lop, examMap[kt.ky_id]||kt.ky_id,
                   kt.diem_tong, kt.nam_hoc||'', kt.ts||'']);
      });

      _downloadCsv(rows, `BangDiem_${Date.now()}.csv`);
      if (msg) msg.textContent = `✅ Xuất ${rows.length-1} dòng`;
    } catch(e) {
      if (msg) msg.textContent = '❌ ' + e.message;
    }
  }

  async function exportStudentProfiles() {
    try {
      const [lams, students] = await Promise.all([CL.API.getHistory(true), CL.API.getStudentList()]);
      const BLOOM_LVLS = ['b1','b2','b3','b4','b5','b6'];
      const NL_LVLS    = ['NL1','NL2','NL3'];

      const rows = [['MSHS','Họ tên','Lớp',
        ...BLOOM_LVLS.map(l=>`Bloom ${l.toUpperCase()}`),
        ...NL_LVLS.map(nl=>`${nl} (/100)`),
        'Lần thử TB','Nhận xét']];

      const stuMap = {};
      students.forEach(s=>{ stuMap[s.mshs]={ ...s, bloomScores:{}, nlScores:{}, tries:0, total:0 }; });

      for (const lam of lams) {
        const stu = stuMap[lam.mshs];
        if (!stu) continue;
        const ex    = Registry.findById(lam.bai_id);
        const bloom = ex ? (ex.lv||'').match(/B(\d)/)?.[1] : lam.bai_id.match(/-b(\d)-/)?.[1];
        if (bloom) {
          if (!stu.bloomScores['b'+bloom]) stu.bloomScores['b'+bloom] = [];
          stu.bloomScores['b'+bloom].push(parseFloat(lam.diem)||0);
        }
        if (ex) {
          const nls = Registry.getNL(ex);
          for (const nl of nls) {
            const group = nl.startsWith('NL1')?'NL1':nl.startsWith('NL2')?'NL2':'NL3';
            if (!stu.nlScores[group]) stu.nlScores[group] = [];
            stu.nlScores[group].push(parseFloat(lam.diem)||0);
          }
        }
        stu.tries++;
      }

      for (const [mshs, stu] of Object.entries(stuMap)) {
        const bloomVals = BLOOM_LVLS.map(lv => {
          const sc = stu.bloomScores[lv];
          return sc?.length ? (sc.reduce((a,b)=>a+b,0)/sc.length).toFixed(2) : '';
        });
        const nlVals = NL_LVLS.map(nl => {
          const sc = stu.nlScores[nl];
          return sc?.length ? Math.round(sc.reduce((a,b)=>a+b,0)/sc.length*10) : '';
        });
        const tryAvg = stu.tries > 0 ? (stu.tries/Math.max(1,Object.keys(stu.bloomScores).length)).toFixed(1) : '';
        rows.push([mshs, stu.ho_ten, stu.lop, ...bloomVals, ...nlVals, tryAvg, '']);
      }

      _downloadCsv(rows, `HoSoNangLuc_${Date.now()}.csv`);
    } catch(e) {
      Toast.error('❌ ' + e.message);
    }
  }

  async function exportPdfReport() {
    const lopFilter = document.getElementById('export-lop-pdf')?.value || '';
    try {
      const [kts, students, exams] = await Promise.all([
        CL.API.getBaiKT(), CL.API.getStudentList(), CL.API.getExams(),
      ]);
      const examMap = {};
      exams.forEach(e => { examMap[e.id] = e.ten; });

      const filtStudents = students.filter(s => !lopFilter || s.lop === lopFilter);
      const lopTitle     = lopFilter || 'Tất cả lớp';
      const today        = new Date().toLocaleDateString('vi-VN');

      // Build printable HTML
      const stuRows = filtStudents.map(s => {
        const sKTs = kts.filter(k => k.mshs === s.mshs);
        const scores = sKTs.map(k => parseFloat(k.diem_tong)||0);
        const avg  = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : null;
        const pass = scores.filter(d=>d>=5).length;
        const cls  = avg===null?'':avg>=8?'color:#059669':avg>=5?'color:#d97706':'color:#dc2626';
        return `<tr>
          <td>${Utils.escHtml(s.mshs||'')}</td>
          <td>${Utils.escHtml(s.ho_ten||'')}</td>
          <td>${Utils.escHtml(s.lop||'')}</td>
          <td style="${cls};font-weight:700">${avg!==null?avg.toFixed(2):'—'}</td>
          <td>${scores.length}</td>
          <td>${scores.length ? pass+'/'+scores.length : '—'}</td>
        </tr>`;
      }).join('');

      const html = `<!DOCTYPE html><html lang="vi">
<head><meta charset="UTF-8">
<title>Báo cáo kết quả - ${lopTitle}</title>
<style>
  body{font-family:Arial,sans-serif;font-size:12px;color:#111;margin:0;padding:20px}
  h1{font-size:18px;margin-bottom:4px}
  .meta{color:#666;font-size:11px;margin-bottom:16px}
  table{width:100%;border-collapse:collapse}
  th{background:#1e40af;color:#fff;padding:7px 10px;text-align:left;font-size:11px}
  td{padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:11.5px}
  tr:nth-child(even) td{background:#f9fafb}
  .footer{margin-top:20px;font-size:10px;color:#9ca3af;text-align:center}
  @media print{@page{margin:1.5cm}}
</style>
</head>
<body>
<h1>📊 Báo cáo Kết quả học tập — ${Utils.escHtml(lopTitle)}</h1>
<div class="meta">THPT Thủ Thiêm · Ngày in: ${today} · ${filtStudents.length} học sinh</div>
<table>
  <thead><tr><th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>ĐTB</th><th>Số KT</th><th>Đạt/Tổng</th></tr></thead>
  <tbody>${stuRows}</tbody>
</table>
<div class="footer">Hệ thống CodeLab — Tự động tạo bởi AI · Không phải văn bản hành chính</div>
</body></html>`;

      const w = window.open('', '_blank', 'width=900,height=700');
      if (w) {
        w.document.write(html);
        w.document.close();
        setTimeout(() => w.print(), 600);
      }
    } catch(e) {
      Toast.error('❌ ' + e.message);
    }
  }

  function _downloadCsv(rows, filename) {
    const bom = '\uFEFF'; // UTF-8 BOM for Excel
    const csv = bom + rows.map(r => r.map(c => `"${String(c||'').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href:url, download:filename });
    a.click(); URL.revokeObjectURL(url);
  }

  return {
    render, switchTab, filterClass,
    loadStudentDetail, loadExamAnalysis,
    exportClassCsv, exportStudentProfiles, exportPdfReport,
  };
});

// ─── js/api.js ───────────────────────────
/**
 * api.js — Public API Facade
 * Lớp mỏng trên Data.Http + Data.Cache + Data.Queue.
 * @requires core/*, data/*, auth/session.js
 */
'use strict';

CL.define('API', () => {

  const cfg     = CL.require('Config');
  const Http    = CL.require('Data.Http');
  const Cache   = CL.require('Data.Cache');
  const Queue   = CL.require('Data.Queue');
  const Session = CL.require('Auth.Session');
  const Events  = CL.require('Events');

  const _logBuf = [];
  let _logTimer = null;

  function _flushLogs() {
    if (!_logBuf.length) return;
    const url = _url(), token = Session.getToken();
    if (!url || !token) return;
    Http.postAsync(url, { action: 'logAccess', token, logs: _logBuf.splice(0, cfg.API.LOG_BATCH_SIZE) });
  }
  window.addEventListener('visibilitychange', () => { if (document.hidden) _flushLogs(); });

  // URL priority: 1) config.DEPLOY_URL (hardcoded by admin at deploy time)
  //               2) localStorage (set via teacher config panel)
  function _url() {
    return (cfg.DEPLOY_URL && cfg.DEPLOY_URL.startsWith('http'))
      ? cfg.DEPLOY_URL
      : (localStorage.getItem(cfg.LS.SCRIPT_URL) || '');
  }
  function _tok()  { return Session.getToken(); }
  function _ok()   { return !!_url(); }
  async function _post(body, timeoutMs) { return Http.post(_url(), body, timeoutMs); }
  async function _get(params){ return Http.get(_url(), { ...params, token: _tok() }); }
  function _bufLog(a, d) {
    _logBuf.push({ action: a, detail: String(d||''). substring(0,100) });
    clearTimeout(_logTimer);
    _logTimer = setTimeout(_flushLogs, cfg.API.LOG_FLUSH_MS);
  }

  // Auth
  async function login(role, creds) { return _post({ action: 'login', role, ...creds }); }
  async function logout() { Http.postAsync(_url(), { action: 'logout', token: _tok() }); }
  async function changePassword(o, n) { return _post({ action: 'changePassword', token: _tok(), oldPwd: o, newPwd: n }); }
  async function updateProfile(data)  { return _post({ action: 'updateMyProfile',   token: _tok(), ...data }); }

  // Exercises
  async function getExerciseDetail(id, force) {
    return Cache.swr('exercise_'+id, cfg.CACHE_TTL.EXERCISE_DETAIL, () => _get({ action: 'getExercise', bai_id: id }), force);
  }

  // Scores & History
  function submitScore(baiId, tieuDe, diem, thoiGian, kyKtId) {
    Queue.enqueue('submitScore', { token: _tok(), bai_id: baiId, tieu_de: tieuDe, diem, thoi_gian: thoiGian||0, ky_kt_id: kyKtId||'' });
    _bufLog('submit', baiId+':'+diem);
    Events.emit('grade:submitted', { exId: baiId, score: diem });
  }

  // Điểm luyện tập — lưu riêng để theo dõi tiến bộ
  function submitPracticeScore(baiId, tieuDe, diem) {
    Queue.enqueue('submitPracticeScore', { token: _tok(), bai_id: baiId, tieu_de: tieuDe, diem, ts: Date.now() });
    _bufLog('practice', baiId+':'+diem);
  }

  // ── Năm học ──────────────────────────────────────────────────
  // ── Item Analysis + Ma trận đề ───────────────────────────────
  // ── AI Generator ─────────────────────────────────────────────
  async function saveBaiTapRecord(data) {
    return _post({ action: 'saveBaiTap', token: _tok(), ...data });
  }

  async function getItemAnalysis(kyId) {
    return _get({ action: 'getItemAnalysis', ky_id: kyId });
  }
  async function getExamMatrix(kyId) {
    return _get({ action: 'getExamMatrix', ky_id: kyId });
  }

  // Per-question exam scores for a student (NL profile enrichment)
  async function getBaiLamForStudent(mshs, kyId) {
    return _get({ action: 'getBaiLamForStudent', mshs: mshs||'', ky_id: kyId||'' });
  }

  async function getNamHocInfo() {
    return _get({ action: 'getNamHocInfo' });
  }
  async function yearTransition(data) {
    return _post({ action: 'yearTransition', token: _tok(), ...data });
  }
  async function importStudents(rows, namHoc, resetPw) {
    return _post({ action: 'importStudents', token: _tok(),
                   rows, nam_hoc: namHoc, reset_password: resetPw });
  }
  async function getLichSuLop(mshs) {
    return _get({ action: 'getLichSuLop', mshs: mshs || '' });
  }

  // Cấu hình thư mục Google Drive lưu ảnh (admin only)
  async function getImageConfig() {
    return _get({ action: 'getImageConfig' });
  }
  async function saveImageConfig(folderId) {
    return _post({ action: 'saveImageConfig', folder_id: folderId || '' });
  }

  // Lưu nội dung đề bài/lý thuyết (teacher/admin)
  async function saveExerciseContent(baiId, field, html) {
    const url = _url();
    if (!url) throw new Error('Chưa cấu hình server URL');
    Cache.invalidate('exercise_' + baiId);
    return Http.post(url, { action: 'saveExerciseContent', token: _tok(), bai_id: baiId, field, html });
  }
  async function getScores(force)   { return Cache.swr('scores_all',   cfg.CACHE_TTL.SCORES,     () => _get({ action: 'getScores' }),     force); }
  async function getHistory(force)  { return Cache.swr('history_me',   cfg.CACHE_TTL.HISTORY,    () => _get({ action: 'getHistory' }),    force); }

  // Violations
  function logViolation(baiId, lan, loai, snap) {
    Queue.enqueue('logViolation', { token: _tok(), bai_id: baiId, lan, loai, code_snap: (snap||''). substring(0,300) });
  }
  async function getViolations(force){ return Cache.swr('violations_all', cfg.CACHE_TTL.VIOLATIONS, () => _get({ action: 'getViolations' }), force); }

  // Access log
  function logAccess(action, detail) { _bufLog(action, detail); }
  async function getAccessLog() { return _get({ action: 'getAccessLog' }); }

  // Exams
  async function getExams(force)    { return Cache.swr('exams_list', cfg.CACHE_TTL.EXAMS, () => _get({ action: 'getExams' }), force); }
  async function saveExam(exam)     { const d = await _post({ action: 'saveExam', token: _tok(), exam }); Cache.invalidate('exams'); return d; }
  async function deleteExam(id)     { const d = await _post({ action: 'deleteExam', token: _tok(), exam_id: id }); Cache.invalidate('exams'); return d; }
  async function setExamStatus(id, s){ const d = await _post({ action: 'setExamStatus', token: _tok(), exam_id: id, status: s }); Cache.invalidate('exams'); return d; }

  // Exercise management (teacher)
  async function saveLyThuyet(id, html)   { const d = await _post({ action: 'saveLyThuyet',  token: _tok(), bai_id: id, noi_dung_html: html }); Cache.invalidate('exercise_'+id); return d; }
  async function saveCodeMau(id, l, c, m) { const d = await _post({ action: 'saveCodeMau',   token: _tok(), bai_id: id, ngon_ngu: l, code: c, mo_ta: m||'' }); Cache.invalidate('exercise_'+id); return d; }
  async function saveTieuChi(id, list)    { const d = await _post({ action: 'saveTieuChi',   token: _tok(), bai_id: id, tieu_chi_list: list }); Cache.invalidate('exercise_'+id); return d; }
  async function saveHuongDan(id, list)   { const d = await _post({ action: 'saveHuongDan',  token: _tok(), bai_id: id, huong_dan_list: list }); Cache.invalidate('exercise_'+id); return d; }
  async function syncExercises(exs, isFirst=true) { return _post({ action: 'syncExercises', token: _tok(), exercises: exs, clear_first: isFirst }, 120_000); }
  async function syncFull(exs, tab, isFirst=true) { return _post({ action: 'syncFull', token: _tok(), exercises: exs, tab, clear_first: isFirst }, 120_000); }
  async function adminGetAdmins()          { return _get({ action: 'adminGetAdmins', token: _tok() }); }
  async function adminSaveAdmin(data)      { return _post({ action: 'adminSaveAdmin', token: _tok(), ...data }); }
  async function adminDeleteAdmin(data){ 
    // Hỗ trợ cả adminDeleteAdmin('user') và adminDeleteAdmin({ username: 'user' })
    const username = (typeof data === 'string') ? data : data?.username;
    return _post({ action: 'adminDeleteAdmin', token: _tok(), username }); 
  }
  async function saveAvatar(data)          { return _post({ action: 'saveAvatar', token: _tok(), avatar_data: data }, 60_000); }

  // Setup & ping
  async function createTables() { return _post({ action: 'createTables', token: _tok() }); }
  async function autoSetup(p)   { return Http.post(_url(), { action: 'autoSetup', ...p }, cfg.API.SETUP_TIMEOUT_MS); }
  async function ping() {
    try { const t = Date.now(); const d = await _get({ action: 'ping' }); return { ok: true, latency: Date.now()-t, version: d.v }; }
    catch(e) { return { ok: false, error: e.message }; }
  }

  // URL
  function setUrl(url) { localStorage.setItem(cfg.LS.SCRIPT_URL, url.trim()); }
  function getUrl()    { return _url(); }
  function isReady()   { return _ok(); }

  // Helpers exposed for teacher tabs
  function _invalidate(p) { Cache.invalidate(p); }
  function _queueSize()   { return Queue.size(); }

  async function syncAnalyticsToSheets() {
    return _post({ action: 'syncAnalytics', token: _tok() });
  }

  // Exam code verification
  async function verifyExamCode(code) {
    return _get({ action: 'verifyExamCode', code });
  }
  async function getExamByCode(code) {
    const data = await _get({ action: 'verifyExamCode', code });
    return data?.exam || null;
  }
  // Derive unique class list from student roster (cached)
  async function getClasses(force) {
    return Cache.swr('classes_list', 5*60000, async () => {
      const students = await adminGetUsers('student', false);
      const grouped  = {};
      students.forEach(s => {
        const lop = (s.lop || '').trim();
        if (!lop) return;
        if (!grouped[lop]) grouped[lop] = 0;
        grouped[lop]++;
      });
      return Object.entries(grouped)
        .sort(([a],[b]) => a.localeCompare(b, 'vi'))
        .map(([lop, count]) => ({lop, count}));
    }, force);
  }

  async function getActiveExamForClass(lop) {
    const exams = await getExams();
    return exams.find(e => {
      if (e.trang_thai !== 'active') return false;
      if (!e.lop && !(e.lop_ids && e.lop_ids.length)) return true;  // no restriction
      const ids = Array.isArray(e.lop_ids) && e.lop_ids.length ? e.lop_ids
                : Array.isArray(e.lop) ? e.lop
                : (e.lop||'').split(',').map(s=>s.trim()).filter(Boolean);
      return ids.length === 0 || ids.map(s=>String(s).trim()).includes(String(lop));
    }) || null;
  }

  // Đợt kiểm tra
  async function getDotKiemTra(force) {
    return Cache.swr('dot_kt_all', cfg.CACHE_TTL.EXAMS,
      () => _get({ action: 'getDotKiemTra' }), force);
  }
  async function saveDotKiemTra(dot) {
    const d = await _post({ action: 'saveDotKiemTra', token: _tok(), dot });
    Cache.invalidate('dot_kt'); return d;
  }
  async function deleteDotKiemTra(id) {
    const d = await _post({ action: 'deleteDotKiemTra', token: _tok(), dot_id: id });
    Cache.invalidate('dot_kt'); return d;
  }

  // Export to Google Sheets
  async function exportToSheets(type) {
    return _post({ action: 'exportToSheets', token: _tok(), type: type||'all' });
  }
  async function syncAnalytics() {
    return _post({ action: 'syncAnalytics', token: _tok() });
  }

  // ── Profile API ─────────────────────────────────────────────
  async function getMyProfile() {
    return Cache.swr('my_profile', 300_000, () => _get({ action: 'getMyProfile' }));
  }
  async function updateMyProfile(data) {
    const r = await _post({ action: 'updateMyProfile', token: _tok(), ...data });
    Cache.invalidate('my_profile');
    return r;
  }

  // ── Admin: User Management ───────────────────────────────────
  async function adminGetUsers(role, force) {
    return Cache.swr('users_' + role, cfg.CACHE_TTL.STUDENTS,
      () => _get({ action: 'adminGetUsers', role }), force);
  }
  async function adminSaveUser(userData) {
    const r = await _post({ action: 'adminSaveUser', token: _tok(), ...userData });
    Cache.invalidate('users_' + userData.role);
    return r;
  }
  async function adminDeleteUser(data) {
    const r = await _post({ action: 'adminDeleteUser', token: _tok(), ...data });
    Cache.invalidate('users_' + data.role);
    return r;
  }
  async function adminResetPassword(data) {
    return _post({ action: 'adminResetPassword', token: _tok(), ...data });
  }
  async function adminToggleActive(data) {
    const r = await _post({ action: 'adminToggleActive', token: _tok(), ...data });
    Cache.invalidate('users_' + data.role);
    return r;
  }
  async function adminImportUsers(role, users) {
    const r = await _post({ action: 'adminImportUsers', token: _tok(), role, users });
    Cache.invalidate('users_' + role);
    return r;
  }

  // ── Exam taking API
  async function submitBaiLam(data) {
    return _post({ action: 'submitBaiLam', token: _tok(), ...data });
  }
  async function submitBaiKT(data) {
    const d = await _post({ action: 'submitBaiKT', token: _tok(), ...data });
    Cache.invalidate('baikt'); return d;
  }
  async function saveMinhChung(data) {
    return _post({ action: 'saveMinhChung', token: _tok(), ...data });
  }
  async function getMyResults(kyId) {
    return Cache.swr('results_' + kyId, 60000,
      () => _get({ action: 'getMyResults', ky_id: kyId }));
  }
  async function getBaiKT() {
    return Cache.swr('baikt_me', cfg.CACHE_TTL.HISTORY,
      () => _get({ action: 'getBaiKT' }));
  }

  // ── Changelog ───────────────────────────────────────────────
  async function getChangelog(force) {
    return Cache.swr('changelog', 300_000,
      () => _get({ action: 'getChangelog' }), force);
  }

    const facade = { setUrl, getUrl, isReady, getToken: _tok,
    login, logout, changePassword, updateProfile, getExerciseDetail,
    submitScore, submitPracticeScore, saveExerciseContent,
    saveBaiTapRecord, getItemAnalysis, getExamMatrix, getBaiLamForStudent,
    getImageConfig, saveImageConfig, getNamHocInfo, yearTransition, importStudents, getLichSuLop,
    getScores, getHistory,
    logViolation, getViolations, logAccess, getAccessLog,
    getExams, saveExam, deleteExam, setExamStatus, getClasses,
    saveLyThuyet, saveCodeMau, saveTieuChi, saveHuongDan, syncExercises, syncFull,
    adminGetAdmins, adminSaveAdmin, adminDeleteAdmin, saveAvatar,
    adminGetUsers, adminSaveUser, adminDeleteUser, adminResetPassword, adminToggleActive, adminImportUsers,
    createTables, autoSetup, ping,
    _invalidate, _queueSize,
    verifyExamCode, getExamByCode, getActiveExamForClass,
    getDotKiemTra, saveDotKiemTra, deleteDotKiemTra,
    exportToSheets, syncAnalytics,
    submitBaiLam, submitBaiKT, saveMinhChung, getMyResults, getBaiKT,
    syncAnalyticsToSheets,
    getChangelog };
  window.API = facade;
  return facade;
});

// ─── js/features/profile.js ───────────────────────────
/**
 * features/profile.js — Profile Panel
 * ═══════════════════════════════════════════════════════════════
 * Tabs: Thông tin | Thống kê | Lịch sử | Bảo mật
 * Features: Avatar upload, đổi mật khẩu có xác nhận 2 bước
 */
'use strict';

CL.define('Features.Profile', () => {
  const Utils   = CL.require('Utils');
  const Session = CL.require('Auth.Session');
  const Toast   = CL.require('UI.Toast');
  const Events  = CL.require('Events');

  let _el = null;

  // ── Avatar helpers ────────────────────────────────────────────
  const AV_LS = 'cl_avatar_';
  function _avKey(user) { return AV_LS + (user?.username || user?.mshs || 'u'); }

  function _getAvatar(user) {
    // localStorage cache first, then server url
    return localStorage.getItem(_avKey(user)) || user?.avatar_url || '';
  }

  function _setAvatar(user, dataUrl) {
    localStorage.setItem(_avKey(user), dataUrl);
    // Update all avatar elements on page
    document.querySelectorAll('.pf-avatar-img,.user-avatar-img').forEach(el => {
      el.src = dataUrl;
    });
  }

  function _initials(name) {
    const w = (name||'?').trim().split(/\s+/);
    return (w.length>=2 ? w[0][0]+w[w.length-1][0] : w[0][0]).toUpperCase();
  }

  function _color(name) {
    let h = 0;
    for (let c of (name||'')) h = (h*31 + c.charCodeAt(0)) & 0xffffffff;
    const hue = Math.abs(h) % 360;
    return [`hsl(${hue},55%,35%)`, `hsl(${hue},80%,90%)`];
  }

  function _avatarHtml(user, size=72) {
    const av = _getAvatar(user);
    const [bg,fg] = _color(user?.name||'');
    if (av) return `<img class="pf-avatar-img" src="${av}" 
      style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;cursor:pointer"
      onclick="CL.Features.Profile._pickAvatar()"
      title="Nhấp để đổi ảnh đại diện">`;
    return `<div class="pf-avatar" style="width:${size}px;height:${size}px;background:${bg};color:${fg};font-size:${size*.35}px;cursor:pointer"
      onclick="CL.Features.Profile._pickAvatar()" title="Nhấp để đổi ảnh đại diện">
      ${_initials(user?.name)}
      <div class="pf-avatar-overlay">📷</div>
    </div>`;
  }

  // ── Avatar picker ─────────────────────────────────────────────
  function _pickAvatar() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) { Toast.error('Ảnh không quá 2MB'); return; }

      const reader = new FileReader();
      reader.onload = async ev => {
        const dataUrl = ev.target.result;
        // Resize to 200x200
        const compressed = await _resizeImage(dataUrl, 200);
        const user = Session.get();
        _setAvatar(user, compressed);
        // Re-render info tab
        const body = document.getElementById('pf-body');
        if (body) await _tabInfo(body);
        Toast.info('⏳ Đang lưu ảnh đại diện...');
        // Upload to server (non-blocking)
        if (CL.API?.isReady()) {
          try {
            const r = await CL.API.saveAvatar(compressed);
            if (r?.url) Toast.success('✅ Đã lưu ảnh đại diện');
          } catch { Toast.info('📱 Ảnh lưu trên thiết bị này'); }
        }
      };
      reader.readAsDataURL(file);
    };
    inp.click();
  }

  async function _resizeImage(dataUrl, maxSize) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const sz = Math.min(img.width, img.height, maxSize);
        canvas.width = canvas.height = sz;
        const ctx = canvas.getContext('2d');
        const s = Math.min(img.width, img.height);
        const ox = (img.width - s) / 2, oy = (img.height - s) / 2;
        ctx.drawImage(img, ox, oy, s, s, 0, 0, sz, sz);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  // ── Open / Close ──────────────────────────────────────────────
  function open() {
    if (_el) { _el.classList.add('show'); _tab('info'); return; }
    _el = document.createElement('div');
    _el.id = 'profile-overlay';
    _el.innerHTML = `
      <div class="pf-backdrop" onclick="CL.Features.Profile.close()"></div>
      <div class="pf-drawer">
        <div class="pf-header">
          <span class="pf-title">👤 Hồ sơ cá nhân</span>
          <button class="pf-close" onclick="CL.Features.Profile.close()">✕</button>
        </div>
        <div class="pf-tabs" id="pf-tabs">
          <button class="pf-tab on"  data-tab="info"     onclick="CL.Features.Profile._tab('info')">📋 Thông tin</button>
          <button class="pf-tab"     data-tab="stats"    onclick="CL.Features.Profile._tab('stats')">📊 Thống kê</button>
          <button class="pf-tab"     data-tab="history"  onclick="CL.Features.Profile._tab('history')">📖 Lịch sử</button>
          <button class="pf-tab"     data-tab="security" onclick="CL.Features.Profile._tab('security')">🔑 Bảo mật</button>
        </div>
        <div class="pf-body" id="pf-body"></div>
      </div>`;
    document.body.appendChild(_el);
    requestAnimationFrame(() => _el.classList.add('show'));
    _tab('info');
  }

  function close() { _el?.classList.remove('show'); }

  async function _tab(name) {
    document.querySelectorAll('.pf-tab').forEach(t =>
      t.classList.toggle('on', t.dataset.tab === name));
    const body = document.getElementById('pf-body');
    if (!body) return;
    body.innerHTML = '<div class="pf-loading">⏳</div>';
    if      (name==='info')     await _tabInfo(body);
    else if (name==='stats')    await _tabStats(body);
    else if (name==='history')  await _tabHistory(body);
    else if (name==='security') _tabSecurity(body);
  }

  // ── Tab: Thông tin ────────────────────────────────────────────
  async function _tabInfo(el) {
    const user = Session.get();
    if (!user) { el.innerHTML = '<div class="pf-empty">Chưa đăng nhập</div>'; return; }
    const isStu = user.role === 'student';
    let extra = {};
    if (CL.API?.isReady()) { try { extra = await CL.API.getMyProfile()||{}; } catch {} }

    el.innerHTML = `
      <div class="pf-hero">
        <div class="pf-avatar-wrap">
          ${_avatarHtml(user, 80)}
          <button class="pf-av-change-btn" onclick="CL.Features.Profile._pickAvatar()" title="Đổi ảnh đại diện">📷</button>
        </div>
        <div class="pf-hero-right">
          <div class="pf-hero-name">${Utils.escHtml(user.name)}</div>
          <div class="pf-hero-sub">
            <span class="pf-role-badge pf-role-${user.role}">
              ${user.role==='student'?'🎓 Học sinh':user.role==='admin'?'⚡ Admin':'👨‍🏫 Giáo viên'}
            </span>
            ${user.lop?`<span class="pf-lop-tag">${Utils.escHtml(user.lop)}</span>`:''}
          </div>
        </div>
      </div>
      <div class="pf-info-grid">
        ${isStu ? _ir('MSHS', user.mshs||'—') : _ir('Username', user.username||'—')}
        ${_ir('Email', extra.email || user.email || '—')}
        ${isStu ? _ir('Lớp', user.lop||extra.lop||'—') : _ir('Lớp phụ trách', user.lop||extra.lop||'—')}
        ${isStu ? _ir('Ngày sinh', extra.ngay_sinh||'—') : ''}
      </div>
      <div class="pf-section-title" style="margin-top:16px">✏️ Cập nhật thông tin</div>
      <div class="pf-form" id="pf-info-form">
        <div class="pf-field"><label>Họ và tên</label>
          <input id="pf-name" type="text" value="${Utils.escHtml(user.name||'')}" placeholder="Họ và tên">
        </div>
        <div class="pf-field"><label>Email</label>
          <input id="pf-email" type="email" value="${Utils.escHtml(extra.email||user.email||'')}" placeholder="email@example.com">
        </div>
        ${isStu ? `<div class="pf-field"><label>Ngày sinh</label>
          <input id="pf-dob" type="date" value="${Utils.escHtml(extra.ngay_sinh||'')}"></div>` : ''}
        <div id="pf-info-msg" class="pf-msg"></div>
        <button class="pf-btn-primary" onclick="CL.Features.Profile.saveInfo()">💾 Lưu thông tin</button>
      </div>`;
  }

  function _ir(l,v){return `<div class="pf-irow"><span class="pf-irow-l">${l}</span><span class="pf-irow-v">${Utils.escHtml(String(v))}</span></div>`;}

  async function saveInfo() {
    const msg = document.getElementById('pf-info-msg');
    const name  = document.getElementById('pf-name')?.value.trim();
    const email = document.getElementById('pf-email')?.value.trim();
    const dob   = document.getElementById('pf-dob')?.value||'';
    if (!name) { _msg(msg,'⚠️ Tên không được để trống','warn'); return; }
    _msg(msg,'⏳ Đang lưu...','info');
    try {
      await CL.API.updateProfile({ name, email, ngay_sinh: dob });
      const user = Session.get();
      Session.save({ ...user, name });
      _msg(msg,'✅ Đã lưu!','ok');
      Toast.success('✅ Cập nhật thành công');
    } catch(e) { _msg(msg,'❌ '+e.message,'err'); }
  }

  // ── Tab: Thống kê ─────────────────────────────────────────────
  async function _tabStats(el) {
    if (!CL.API?.isReady()) { el.innerHTML='<div class="pf-empty">📡 Chưa kết nối server</div>'; return; }
    try {
      const stats = await CL.API.getMyStats?.() || {};
      el.innerHTML = `
        <div class="pf-stats-grid">
          ${_sc(stats.total_submissions||0,'Lần nộp bài','📝')}
          ${_sc(stats.avg_score!=null?stats.avg_score.toFixed(1):'—','Điểm TB','⭐')}
          ${_sc(stats.perfect||0,'Bài đạt 10/10','🏆')}
          ${_sc(stats.exercises_done||0,'Bài đã làm','✅')}
        </div>
        ${stats.by_grade ? `<div class="pf-section-title" style="margin-top:16px">📊 Theo khối lớp</div>
          <div class="pf-dbars">
            ${Object.entries(stats.by_grade).map(([g,n])=>_db(g,n,stats.total_submissions,'var(--accent)')).join('')}
          </div>` : ''}`;
    } catch(e) { el.innerHTML=`<div class="pf-empty">❌ ${e.message}</div>`; }
  }
  function _sc(v,l,i){return `<div class="pf-scard"><div class="pf-scard-icon">${i}</div><div class="pf-scard-val">${v}</div><div class="pf-scard-lbl">${l}</div></div>`;}
  function _db(l,n,tot,c){const p=tot>0?Math.round(n/tot*100):0;return `<div class="pf-dbar-row"><span class="pf-dbar-lbl">${l}</span><div class="pf-dbar-track"><div class="pf-dbar-fill" style="width:${p}%;background:${c}"></div></div><span class="pf-dbar-val">${n} <small>(${p}%)</small></span></div>`;}

  // ── Tab: Lịch sử ──────────────────────────────────────────────
  async function _tabHistory(el) {
    if (!CL.API?.isReady()) { el.innerHTML='<div class="pf-empty">📡 Chưa kết nối server</div>'; return; }
    try {
      const hist = await CL.API.getMyHistory?.() || [];
      el.innerHTML = `
        <div class="pf-hist-search">
          <input id="pf-hsearch" type="search" placeholder="🔍 Tìm bài..."
            oninput="CL.Features.Profile._filterH(this.value)">
        </div>
        <div id="pf-hlist">
          ${hist.length ? hist.map(h=>`
            <div class="pf-hitem" data-title="${Utils.escHtml((h.title||'').toLowerCase())}">
              <span class="pf-hbadge" style="background:${h.score>=9?'var(--accent2)':h.score>=6?'var(--accent)':'var(--error)'}">
                ${(h.score||0).toFixed(1)}
              </span>
              <div class="pf-hcontent">
                <div class="pf-htitle">${Utils.escHtml(h.title||h.bai_id||'—')}</div>
                <div class="pf-hdate">${h.submitted_at||''}</div>
              </div>
            </div>`).join('') : '<div class="pf-empty">Chưa có lịch sử</div>'}
        </div>`;
    } catch(e) { el.innerHTML=`<div class="pf-empty">❌ ${e.message}</div>`; }
  }

  function _filterH(q) {
    const kw = q.toLowerCase();
    document.querySelectorAll('.pf-hitem').forEach(el => {
      el.style.display = !kw || el.dataset.title?.includes(kw) ? '' : 'none';
    });
  }

  // ── Tab: Bảo mật ─────────────────────────────────────────────
  function _tabSecurity(el) {
    const user = Session.get();
    const isStu = user?.role === 'student';
    el.innerHTML = `
      <div class="pf-section-title">🔑 Đổi mật khẩu</div>
      <div class="pf-form">
        <div class="pf-field">
          <label>Mật khẩu hiện tại <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-old" type="password" placeholder="Nhập mật khẩu hiện tại" autocomplete="current-password">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-old',this)">👁</button>
          </div>
        </div>
        <div class="pf-field">
          <label>Mật khẩu mới <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-new" type="password" placeholder="Ít nhất 8 ký tự"
              autocomplete="new-password" oninput="CL.Features.Profile._chkPw()">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-new',this)">👁</button>
          </div>
          <div class="pf-pw-strength" id="pf-pw-strength"></div>
        </div>
        <div class="pf-field">
          <label>Xác nhận mật khẩu mới <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-cfm" type="password" placeholder="Nhập lại mật khẩu mới"
              autocomplete="new-password" oninput="CL.Features.Profile._chkPw()">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-cfm',this)">👁</button>
          </div>
        </div>
        <div class="pf-pw-rules">
          <div class="pf-rule" id="pwr-len">○ Ít nhất 8 ký tự</div>
          <div class="pf-rule" id="pwr-upper">○ Có chữ hoa (A-Z)</div>
          <div class="pf-rule" id="pwr-num">○ Có chữ số (0-9)</div>
          <div class="pf-rule" id="pwr-match">○ Mật khẩu xác nhận khớp</div>
          <div class="pf-rule" id="pwr-diff">○ Khác mật khẩu cũ</div>
        </div>
        <div id="pf-pw-msg" class="pf-msg"></div>
        <button class="pf-btn-primary" id="pf-pw-btn"
          onclick="CL.Features.Profile.changePw()">🔑 Đổi mật khẩu</button>
      </div>
      <div class="pf-section-title" style="margin-top:20px">🖥 Phiên đăng nhập</div>
      <div class="pf-session-box">
        ${_ir(isStu?'MSHS':'Username', isStu?(user?.mshs||'—'):(user?.username||'—'))}
        ${_ir('Vai trò', user?.role==='admin'?'⚡ Admin':isStu?'🎓 Học sinh':'👨‍🏫 Giáo viên')}
        ${_ir('Thời hạn','8 giờ kể từ khi đăng nhập')}
      </div>
      <button class="pf-btn-danger" style="margin-top:12px" onclick="CL.Auth.UI.logout()">↩ Đăng xuất</button>`;
  }

  function _chkPw() {
    const pw  = document.getElementById('pf-new')?.value||'';
    const cfm = document.getElementById('pf-cfm')?.value||'';
    const old = document.getElementById('pf-old')?.value||'';
    _rule('pwr-len',   pw.length>=8,              '✅ Ít nhất 8 ký tự',        '○ Ít nhất 8 ký tự');
    _rule('pwr-upper', /[A-Z]/.test(pw),          '✅ Có chữ hoa',             '○ Có chữ hoa (A-Z)');
    _rule('pwr-num',   /[0-9]/.test(pw),          '✅ Có chữ số',              '○ Có chữ số (0-9)');
    _rule('pwr-match', cfm.length>0 && pw===cfm,  '✅ Mật khẩu xác nhận khớp','○ Mật khẩu xác nhận khớp');
    _rule('pwr-diff',  pw.length>0 && pw!==old,   '✅ Khác mật khẩu cũ',      '○ Khác mật khẩu cũ');

    // Strength bar
    const str = document.getElementById('pf-pw-strength');
    if (str && pw) {
      let score = 0;
      if (pw.length>=8) score++;
      if (pw.length>=12) score++;
      if (/[A-Z]/.test(pw)) score++;
      if (/[0-9]/.test(pw)) score++;
      if (/[^A-Za-z0-9]/.test(pw)) score++;
      const labels=['','Rất yếu','Yếu','Trung bình','Mạnh','Rất mạnh'];
      const colors=['','#f87171','#fb923c','#fbbf24','#34d399','#4f9eff'];
      str.innerHTML = `<div class="pf-strength-bar"><div style="width:${score*20}%;background:${colors[score]};height:100%;border-radius:4px;transition:.3s"></div></div>
        <span style="font-size:10px;color:${colors[score]}">${labels[score]||''}</span>`;
    }
  }

  function _rule(id,ok,y,n) {
    const el=document.getElementById(id);
    if(!el)return; el.textContent=ok?y:n; el.className='pf-rule'+(ok?' ok':'');
  }

  function _eye(id,btn) {
    const el=document.getElementById(id);
    if(!el)return;
    el.type=el.type==='password'?'text':'password';
    btn.textContent=el.type==='password'?'👁':'🙈';
  }

  async function changePw() {
    const oldPw = document.getElementById('pf-old')?.value||'';
    const newPw = document.getElementById('pf-new')?.value||'';
    const cfmPw = document.getElementById('pf-cfm')?.value||'';
    const msg   = document.getElementById('pf-pw-msg');

    if (!oldPw)           { _msg(msg,'⚠️ Nhập mật khẩu hiện tại','warn');     return; }
    if (newPw.length < 8) { _msg(msg,'⚠️ Mật khẩu mới ít nhất 8 ký tự','warn'); return; }
    if (newPw !== cfmPw)  { _msg(msg,'⚠️ Mật khẩu xác nhận không khớp','warn'); return; }
    if (newPw === oldPw)  { _msg(msg,'⚠️ Mật khẩu mới phải khác mật khẩu cũ','warn'); return; }

    // Step 2: Confirm dialog
    const ok = await _confirmDialog(
      '🔑 Xác nhận đổi mật khẩu',
      'Bạn chắc chắn muốn đổi mật khẩu?\nSau khi đổi, bạn cần đăng nhập lại.',
      'Xác nhận đổi', 'Huỷ'
    );
    if (!ok) return;

    _msg(msg,'⏳ Đang xử lý...','info');
    const btn = document.getElementById('pf-pw-btn');
    if (btn) btn.disabled = true;
    try {
      const oh = await Utils.sha256(oldPw);
      const nh = await Utils.sha256(newPw);
      await CL.API.changePassword(oh, nh);
      _msg(msg,'✅ Đổi mật khẩu thành công! Vui lòng đăng nhập lại.','ok');
      ['pf-old','pf-new','pf-cfm'].forEach(id => {
        const e=document.getElementById(id); if(e)e.value='';
      });
      document.querySelectorAll('.pf-rule').forEach(r => {
        r.textContent=r.textContent.replace('✅','○'); r.className='pf-rule';
      });
      Toast.success('🔑 Mật khẩu đã được thay đổi. Đang đăng xuất...');
      setTimeout(() => CL.Auth.UI.logout(), 2500);
    } catch(err) {
      _msg(msg,'❌ '+(err.message||'Lỗi không xác định'),'err');
      if (btn) btn.disabled = false;
    }
  }

  // ── Confirm Dialog ────────────────────────────────────────────
  function _confirmDialog(title, text, yesLabel='Xác nhận', noLabel='Huỷ') {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.className = 'pf-confirm-overlay';
      overlay.innerHTML = `
        <div class="pf-confirm-box">
          <div class="pf-confirm-title">${title}</div>
          <div class="pf-confirm-text">${text.replace(/\n/g,'<br>')}</div>
          <div class="pf-confirm-btns">
            <button class="pf-btn-ghost" id="pf-cfm-no">${noLabel}</button>
            <button class="pf-btn-primary" id="pf-cfm-yes">${yesLabel}</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('show'));
      const cleanup = (val) => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 250);
        resolve(val);
      };
      document.getElementById('pf-cfm-yes').onclick = () => cleanup(true);
      document.getElementById('pf-cfm-no').onclick  = () => cleanup(false);
      overlay.onclick = e => { if(e.target===overlay) cleanup(false); };
    });
  }

  function _msg(el,text,type){if(!el)return;el.textContent=text;el.className='pf-msg pf-msg-'+(type||'info');}

  window.ProfilePanel = {open, close};
  return {open, close, saveInfo, changePw, _tab, _chkPw, _eye, _filterH, _pickAvatar};
});

// ─── js/features/admin/users.js ───────────────────────────
/**
 * features/admin/users.js — Admin: Quản lý người dùng
 */
'use strict';

CL.define('Admin.Users', () => {

  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');
  let _curTab = 'students';
  const _stuCache   = {};  // mshs → student obj
  const _gvCache    = {};  // username → teacher obj
  const _adminCache = {};  // username → admin obj

  // ── Main render ───────────────────────────────────────────────
  async function render(el) {
    el.innerHTML = `
      <div class="au-tabs">
        <button class="au-tab on" data-t="students"
          onclick="CL.Admin.Users._auTab(this,'students')">🎓 Học sinh</button>
        <button class="au-tab" data-t="teachers"
          onclick="CL.Admin.Users._auTab(this,'teachers')">👨‍🏫 Giáo viên</button>
        <button class="au-tab" data-t="admins"
          onclick="CL.Admin.Users._auTab(this,'admins')">⚡ Admin</button>
        <button class="au-tab" data-t="scores"
          onclick="CL.Admin.Users._auTab(this,'scores')">📊 Bảng điểm</button>
      </div>
      <div id="au-body"></div>`;
    await _renderStudents(document.getElementById('au-body'));
  }

  function _auTab(btn, which) {
    _curTab = which;
    document.querySelectorAll('.au-tab').forEach(t =>
      t.classList.toggle('on', t.dataset.t === which));
    const body = document.getElementById('au-body');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    ({ students:_renderStudents, teachers:_renderTeachers,
       admins:_renderAdmins, scores:_renderScores }[which] || _renderStudents)(body);
  }

  // ════════════════════════════════════════════════════════════════
  //  TAB 1 — HỌC SINH
  // ════════════════════════════════════════════════════════════════
  async function _renderStudents(el) {
    try {
      const students = await CL.API.adminGetUsers('student', true);
      const classes  = [...new Set(students.map(s => s.lop).filter(Boolean))].sort();
      students.forEach(s => { _stuCache[s.mshs] = s; });

      el.innerHTML = `
        <div class="au-toolbar">
          <input id="stu-search" class="au-search" type="text"
            placeholder="🔍 Tìm MSHS / họ tên..."
            oninput="CL.Admin.Users._filterStu()">
          <select class="au-select" id="au-filter-lop"
            onchange="CL.Admin.Users._filterStu()">
            <option value="">Tất cả lớp</option>
            ${classes.map(c => `<option>${Utils.escHtml(c)}</option>`).join('')}
          </select>
          <span class="au-count" id="au-stu-count">${students.length} học sinh</span>
          <button class="au-btn-add" onclick="CL.Admin.Users.showStudentForm({})">+ Thêm</button>
        </div>
        <div class="au-table-wrap">
          <table class="au-table">
            <thead><tr>
              <th>MSHS / CCCD</th><th>Họ tên</th><th>Lớp</th>
              <th>Email</th><th>Trạng thái</th><th>Thao tác</th>
            </tr></thead>
            <tbody id="au-stu-tbody">
              ${students.map(_stuRow).join('')}
            </tbody>
          </table>
        </div>
        <div id="au-stu-form" style="display:none;padding:14px"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _stuRow(s) {
    const active = s.active !== false && s.active !== 'FALSE';
    // data-q: mshs + tên, đều lowercase để so sánh nhất quán
    const q = ((s.mshs||'') + ' ' + (s.ho_ten||'')).toLowerCase();
    return `<tr data-q="${Utils.escHtml(q)}"
               data-lop="${Utils.escHtml((s.lop||'').toLowerCase())}"
               class="${active?'':'au-row-locked'}">
      <td class="au-mshs">${Utils.escHtml(s.mshs||'—')}</td>
      <td class="au-name">${Utils.escHtml(s.ho_ten||'—')}</td>
      <td>${Utils.escHtml(s.lop||'—')}</td>
      <td class="au-email">${Utils.escHtml(s.email||'—')}</td>
      <td><span class="au-status ${active?'au-active':'au-locked'}">${active?'● Hoạt động':'🔒 Khoá'}</span></td>
      <td class="au-actions">
        <button class="au-act-btn" title="Sửa"
          onclick="CL.Admin.Users.showStudentForm(CL.Admin.Users._getStu('${Utils.escHtml(String(s.mshs||''))}'))">✏️</button>
        <button class="au-act-btn" title="Reset mật khẩu"
          onclick="CL.Admin.Users.resetPassword('${Utils.escHtml(String(s.mshs||''))}','student')">🔑</button>
        <button class="au-act-btn au-toggle-btn" title="${active?'Khoá':'Mở'}"
          onclick="CL.Admin.Users.toggleActive('${Utils.escHtml(String(s.mshs||''))}','student',${active})">
          ${active?'🔒':'🔓'}</button>
        <button class="au-act-btn au-del-btn" title="Xoá"
          onclick="CL.Admin.Users.deleteUser('${Utils.escHtml(String(s.mshs||''))}','student')">🗑</button>
      </td>
    </tr>`;
  }

  function _filterStu() {
    const q   = (document.getElementById('stu-search')?.value||'').toLowerCase().trim();
    const lop = (document.getElementById('au-filter-lop')?.value||'').toLowerCase().trim();
    let vis = 0;
    document.querySelectorAll('#au-stu-tbody tr').forEach(tr => {
      const matchQ   = !q   || (tr.dataset.q  ||'').includes(q);
      const matchLop = !lop || (tr.dataset.lop||'') === lop;
      tr.style.display = matchQ && matchLop ? '' : 'none';
      if (matchQ && matchLop) vis++;
    });
    const cnt = document.getElementById('au-stu-count');
    if (cnt) cnt.textContent = vis + ' học sinh';
  }

  function _getStu(mshs)    { return _stuCache[mshs]    || { mshs }; }
  function _getGv(user)     { return _gvCache[user]     || { username: user }; }
  function _getAdmin(user)  { return _adminCache[user]  || { username: user }; }

  function showStudentForm(s) {
    const form = document.getElementById('au-stu-form');
    if (!form) return;
    const isEdit = !!s.mshs;
    const active = s.active !== false && s.active !== 'FALSE';
    form.style.display = 'block';
    form.innerHTML = `
      <div class="au-form-title">${isEdit ? '✏️ Sửa học sinh' : '+ Thêm học sinh mới'}</div>
      <div class="au-form-grid">
        <div class="pf-field">
          <label>MSHS / CCCD <span class="pf-req">*</span></label>
          <input id="aufs-mshs" type="text" value="${Utils.escHtml(s.mshs||'')}"
            placeholder="12 chữ số">
          ${isEdit ? '<div class="au-field-hint">⚠️ Chỉ sửa ID khi thật sự cần thiết</div>' : ''}
        </div>
        <div class="pf-field">
          <label>Họ và tên <span class="pf-req">*</span></label>
          <input id="aufs-name" type="text" value="${Utils.escHtml(s.ho_ten||'')}"
            placeholder="Nguyễn Văn A">
        </div>
        <div class="pf-field">
          <label>Lớp <span class="pf-req">*</span></label>
          <input id="aufs-lop" type="text" value="${Utils.escHtml(s.lop||'')}"
            placeholder="10A1">
        </div>
        <div class="pf-field">
          <label>Email</label>
          <input id="aufs-email" type="email" value="${Utils.escHtml(s.email||'')}"
            placeholder="hs@thuthiem.edu.vn">
        </div>
        <div class="pf-field">
          <label>Ngày sinh</label>
          <input id="aufs-dob" type="date" value="${Utils.escHtml(s.ngay_sinh||'')}">
        </div>
        ${isEdit ? `
        <div class="pf-field">
          <label>Mật khẩu mới <span style="font-weight:400;color:var(--text3)">(để trống = không đổi)</span></label>
          <input id="aufs-pw" type="text" placeholder="Nhập để đặt mật khẩu mới">
        </div>
        <div class="pf-field">
          <label>Trạng thái</label>
          <select id="aufs-active">
            <option value="true"  ${active?'selected':''}>● Hoạt động</option>
            <option value="false" ${!active?'selected':''}>🔒 Khoá</option>
          </select>
        </div>` : `
        <div class="pf-field">
          <label>Mật khẩu ban đầu <span style="font-weight:400;color:var(--text3)">(để trống = dùng MSHS)</span></label>
          <input id="aufs-pw" type="text" placeholder="Để trống = dùng MSHS">
        </div>`}
      </div>
      <div id="aufs-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary"
          data-exist-mshs="${Utils.escHtml(isEdit?String(s.mshs||''):'')}"
          onclick="CL.Admin.Users.saveStudent(this.dataset.existMshs)">
          💾 ${isEdit?'Lưu thay đổi':'Thêm học sinh'}
        </button>
        <button class="au-btn-cancel"
          onclick="document.getElementById('au-stu-form').style.display='none'">Hủy</button>
      </div>`;
    form.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  async function saveStudent(existMshs) {
    const msg     = document.getElementById('aufs-msg');
    const newMshs = document.getElementById('aufs-mshs')?.value?.trim();
    const oldMshs = document.getElementById('aufs-old-mshs')?.value?.trim() || existMshs || '';
    const mshs    = newMshs || existMshs;
    const name  = document.getElementById('aufs-name')?.value?.trim();
    const lop   = document.getElementById('aufs-lop')?.value?.trim() || '';
    const email = document.getElementById('aufs-email')?.value?.trim() || '';
    const dob   = document.getElementById('aufs-dob')?.value?.trim()  || '';
    const pw    = document.getElementById('aufs-pw')?.value?.trim()   || '';
    const activeVal = document.getElementById('aufs-active')?.value;

    if (!mshs) return _msg(msg, '⚠️ Vui lòng nhập MSHS', 'warn');
    if (!name) return _msg(msg, '⚠️ Vui lòng nhập họ tên', 'warn');
    _msg(msg, '⏳ Đang lưu...', 'info');
    try {
      const payload = {
        role:'student', mshs, ho_ten:name, lop, email,
        ngay_sinh: dob, is_new: !existMshs,
        old_mshs: (existMshs && oldMshs !== mshs) ? oldMshs : existMshs,
      };
      if (pw) payload.password = pw;
      if (activeVal !== undefined) payload.active = activeVal === 'true';
      await CL.API.adminSaveUser(payload);
      // Update cache
      // If ID changed, delete old cache entry
      if (existMshs && existMshs !== mshs) delete _stuCache[existMshs];
      _stuCache[mshs] = { ...(_stuCache[existMshs]||_stuCache[mshs]||{}), mshs, ho_ten:name, lop, email, ngay_sinh:dob,
                          active: activeVal !== undefined ? activeVal === 'true' : true };
      _msg(msg, `✅ ${existMshs?'Đã cập nhật':'Đã thêm'} ${mshs}`, 'ok');
      Toast.success(`✅ ${existMshs?'Cập nhật':'Thêm'} học sinh thành công`);
      CL.API._invalidate('users_student');
      setTimeout(() => _auTab(null, 'students'), 1200);
    } catch(e) { _msg(msg, '❌ ' + e.message, 'err'); }
  }

  // ════════════════════════════════════════════════════════════════
  //  TAB 2 — GIÁO VIÊN
  // ════════════════════════════════════════════════════════════════
  async function _renderTeachers(el) {
    try {
      const teachers = await CL.API.adminGetUsers('teacher', true);
      teachers.forEach(t => { _gvCache[t.username] = t; });
      el.innerHTML = `
        <div class="au-toolbar">
          <input id="gv-search" class="au-search" type="text"
            placeholder="🔍 Tìm username / tên..."
            oninput="CL.Admin.Users._filterGv()">
          <span class="au-count">${teachers.length} giáo viên</span>
          <button class="au-btn-add" onclick="CL.Admin.Users.showTeacherForm({})">+ Thêm</button>
        </div>
        <div class="au-table-wrap">
          <table class="au-table">
            <thead><tr>
              <th>Username</th><th>Họ tên</th><th>Lớp phụ trách</th>
              <th>Email</th><th>Trạng thái</th><th>Thao tác</th>
            </tr></thead>
            <tbody id="au-gv-tbody">
              ${teachers.map(_gvRow).join('')}
            </tbody>
          </table>
        </div>
        <div id="au-gv-form" style="display:none;padding:14px"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _gvRow(t) {
    const active = t.active !== false && t.active !== 'FALSE';
    const q = ((t.username||'') + ' ' + (t.ho_ten||'')).toLowerCase();
    return `<tr data-q="${Utils.escHtml(q)}" class="${active?'':'au-row-locked'}">
      <td class="au-mshs">${Utils.escHtml(t.username||'—')}</td>
      <td class="au-name">${Utils.escHtml(t.ho_ten||'—')}</td>
      <td>${Utils.escHtml(t.lop_phu_trach||'—')}</td>
      <td class="au-email">${Utils.escHtml(t.email||'—')}</td>
      <td><span class="au-status ${active?'au-active':'au-locked'}">${active?'● Hoạt động':'🔒 Khoá'}</span></td>
      <td class="au-actions">
        <button class="au-act-btn" title="Sửa"
          onclick="CL.Admin.Users.showTeacherForm(CL.Admin.Users._getGv('${Utils.escHtml(String(t.username||''))}'))">✏️</button>
        <button class="au-act-btn" title="Reset mật khẩu"
          onclick="CL.Admin.Users.resetPassword('${Utils.escHtml(String(t.username||''))}','teacher')">🔑</button>
        <button class="au-act-btn au-toggle-btn"
          onclick="CL.Admin.Users.toggleActive('${Utils.escHtml(String(t.username||''))}','teacher',${active})">
          ${active?'🔒':'🔓'}</button>
        <button class="au-act-btn au-del-btn"
          onclick="CL.Admin.Users.deleteUser('${Utils.escHtml(String(t.username||''))}','teacher')">🗑</button>
      </td>
    </tr>`;
  }

  function _filterGv() {
    const q = (document.getElementById('gv-search')?.value||'').toLowerCase().trim();
    document.querySelectorAll('#au-gv-tbody tr').forEach(tr =>
      tr.style.display = !q || (tr.dataset.q||'').includes(q) ? '' : 'none'
    );
  }

  function showTeacherForm(t) {
    const form = document.getElementById('au-gv-form');
    if (!form) return;
    const isEdit = !!t.username;
    const active = t.active !== false && t.active !== 'FALSE';
    form.style.display = 'block';
    form.innerHTML = `
      <div class="au-form-title">${isEdit?'✏️ Sửa giáo viên':'+ Thêm giáo viên mới'}</div>
      <div class="au-form-grid">
        <div class="pf-field">
          <label>Username <span class="pf-req">*</span></label>
          <input id="aufg-user" type="text" value="${Utils.escHtml(t.username||'')}"
            placeholder="gv_an">
          ${isEdit ? '<div class="au-field-hint">⚠️ Chỉ sửa username khi thật sự cần thiết</div>' : ''}
        </div>
        <div class="pf-field">
          <label>Họ và tên <span class="pf-req">*</span></label>
          <input id="aufg-name" type="text" value="${Utils.escHtml(t.ho_ten||'')}"
            placeholder="Nguyễn Văn A">
        </div>
        <div class="pf-field">
          <label>Lớp phụ trách</label>
          <input id="aufg-lop" type="text" value="${Utils.escHtml(t.lop_phu_trach||'')}"
            placeholder="11A1, 11A2">
        </div>
        <div class="pf-field">
          <label>Email</label>
          <input id="aufg-email" type="email" value="${Utils.escHtml(t.email||'')}"
            placeholder="gv@thuthiem.edu.vn">
        </div>
        <div class="pf-field">
          <label>Mật khẩu ${isEdit?'mới':'ban đầu'} <span style="font-weight:400;color:var(--text3)">(để trống = ${isEdit?'không đổi':'dùng username'})</span></label>
          <input id="aufg-pw" type="text" placeholder="${isEdit?'Nhập để đổi mật khẩu':'Để trống = dùng username'}">
        </div>
        ${isEdit?`
        <div class="pf-field">
          <label>Trạng thái</label>
          <select id="aufg-active">
            <option value="true"  ${active?'selected':''}>● Hoạt động</option>
            <option value="false" ${!active?'selected':''}>🔒 Khoá</option>
          </select>
        </div>`:''}
      </div>
      <div id="aufg-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary"
          data-exist-id="${Utils.escHtml(isEdit?String(t.username||''):'')}"
          onclick="CL.Admin.Users.saveTeacher(this.dataset.existId)">
          💾 ${isEdit?'Lưu thay đổi':'Thêm giáo viên'}
        </button>
        <button class="au-btn-cancel"
          onclick="document.getElementById('au-gv-form').style.display='none'">Hủy</button>
      </div>`;
    form.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  async function saveTeacher(existUser) {
    const msg     = document.getElementById('aufg-msg');
    const newUser = document.getElementById('aufg-user')?.value?.trim();
    const oldUser = document.getElementById('aufg-old-user')?.value?.trim() || existUser || '';
    const user    = newUser || existUser;
    const name  = document.getElementById('aufg-name')?.value?.trim();
    const lop   = document.getElementById('aufg-lop')?.value?.trim()  || '';
    const email = document.getElementById('aufg-email')?.value?.trim()|| '';
    const pw    = document.getElementById('aufg-pw')?.value?.trim()   || '';
    const activeVal = document.getElementById('aufg-active')?.value;
    if (!user) return _msg(msg,'⚠️ Vui lòng nhập username','warn');
    if (!name) return _msg(msg,'⚠️ Vui lòng nhập họ tên','warn');
    _msg(msg,'⏳ Đang lưu...','info');
    try {
      const payload = {
        role:'teacher', username:user, ho_ten:name, lop_phu_trach:lop,
        email, user_role:'teacher', is_new:!existUser,
        old_username: (existUser && oldUser !== user) ? oldUser : existUser,
      };
      if (pw) payload.password = pw;
      if (activeVal !== undefined) payload.active = activeVal === 'true';
      await CL.API.adminSaveUser(payload);
      if (existUser && existUser !== user) delete _gvCache[existUser];
      _gvCache[user] = { ...(_gvCache[existUser]||_gvCache[user]||{}), username:user, ho_ten:name, lop_phu_trach:lop,
                         email, active: activeVal !== undefined ? activeVal === 'true' : true };
      _msg(msg,`✅ ${existUser?'Cập nhật':'Đã thêm'} ${user}`,'ok');
      Toast.success(`✅ ${existUser?'Cập nhật':'Thêm'} giáo viên thành công`);
      CL.API._invalidate('users_teacher');
      setTimeout(() => { document.getElementById('au-gv-form').style.display='none'; _auTab(null,'teachers'); }, 1200);
    } catch(e) { _msg(msg,'❌ '+e.message,'err'); }
  }

  // ════════════════════════════════════════════════════════════════
  //  TAB 3 — ADMIN
  // ════════════════════════════════════════════════════════════════
  async function _renderAdmins(el) {
    try {
      const admins = await CL.API.adminGetAdmins();
      admins.forEach(a => { _adminCache[a.username] = a; });
      el.innerHTML = `
        <div class="au-admin-note">
          ⚡ Tài khoản Admin lưu trong tab <b>[Admin]</b> của 01_TaiKhoan.gsheet — tách biệt với Giáo viên.
        </div>
        <div class="au-toolbar">
          <span class="au-count">${admins.length} tài khoản admin</span>
          <button class="au-btn-add" onclick="CL.Admin.Users.showAdminForm({})">+ Thêm Admin</button>
        </div>
        <div class="au-table-wrap">
          <table class="au-table">
            <thead><tr>
              <th>Username</th><th>Họ tên</th><th>Email</th>
              <th>Trạng thái</th><th>Ngày tạo</th><th>Thao tác</th>
            </tr></thead>
            <tbody>
              ${admins.length ? admins.map(_adminRow).join('')
                : '<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text3)">Chưa có tài khoản admin</td></tr>'}
            </tbody>
          </table>
        </div>
        <div id="au-adm-form" style="display:none;padding:14px"></div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _adminRow(a) {
    const active  = a.active !== false && a.active !== 'FALSE';
    const created = a.created_at ? new Date(a.created_at).toLocaleDateString('vi-VN') : '—';
    return `<tr class="${active?'':'au-row-locked'}">
      <td><span class="au-admin-badge">⚡</span> ${Utils.escHtml(a.username||'—')}</td>
      <td class="au-name">${Utils.escHtml(a.ho_ten||'—')}</td>
      <td class="au-email">${Utils.escHtml(a.email||'—')}</td>
      <td><span class="au-status ${active?'au-active':'au-locked'}">${active?'● Hoạt động':'🔒 Khoá'}</span></td>
      <td style="font-size:11px;color:var(--text3)">${created}</td>
      <td class="au-actions">
        <button class="au-act-btn" title="Sửa"
          onclick="CL.Admin.Users.showAdminForm(CL.Admin.Users._getAdmin('${Utils.escHtml(String(a.username||''))}'))">✏️</button>
        <button class="au-act-btn" title="Reset mật khẩu"
          onclick="CL.Admin.Users.resetAdminPw('${Utils.escHtml(String(a.username||''))}')">🔑</button>
        <button class="au-act-btn au-del-btn" title="Xoá"
          onclick="CL.Admin.Users.deleteAdmin('${Utils.escHtml(String(a.username||''))}')">🗑</button>
      </td>
    </tr>`;
  }

  function showAdminForm(a) {
    const form = document.getElementById('au-adm-form');
    if (!form) return;
    const isEdit = !!a.username;
    form.style.display = 'block';
    form.innerHTML = `
      <div class="au-form-title">${isEdit?'✏️ Sửa Admin':'+ Thêm tài khoản Admin mới'}</div>
      <div class="au-form-grid">
        <div class="pf-field">
          <label>Username <span class="pf-req">*</span></label>
          <input id="aufa-user" type="text" value="${Utils.escHtml(a.username||'')}"
            placeholder="admin2" ${isEdit?'readonly':''}>
        </div>
        <div class="pf-field">
          <label>Họ và tên <span class="pf-req">*</span></label>
          <input id="aufa-name" type="text" value="${Utils.escHtml(a.ho_ten||'')}" placeholder="Nguyễn Văn A">
        </div>
        <div class="pf-field">
          <label>Email</label>
          <input id="aufa-email" type="email" value="${Utils.escHtml(a.email||'')}" placeholder="admin@thuthiem.edu.vn">
        </div>
        <div class="pf-field">
          <label>Mật khẩu ${isEdit?'mới':'*'} <span style="font-weight:400;color:var(--text3)">${isEdit?'(để trống = không đổi)':''}</span></label>
          <input id="aufa-pw" type="text" placeholder="${isEdit?'Để trống = không đổi':'Mật khẩu mạnh'}">
        </div>
      </div>
      <div id="aufa-msg" class="pf-msg"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="pf-btn-primary"
          data-exist-id="${Utils.escHtml(isEdit?String(a.username||''):'')}"
          onclick="CL.Admin.Users.saveAdmin(this.dataset.existId)">
          💾 ${isEdit?'Lưu':'Tạo tài khoản Admin'}
        </button>
        <button class="au-btn-cancel"
          onclick="document.getElementById('au-adm-form').style.display='none'">Hủy</button>
      </div>`;
    form.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  async function saveAdmin(existUser) {
    const msg   = document.getElementById('aufa-msg');
    const user  = existUser || document.getElementById('aufa-user')?.value?.trim();
    const name  = document.getElementById('aufa-name')?.value?.trim();
    const email = document.getElementById('aufa-email')?.value?.trim() || '';
    const pw    = document.getElementById('aufa-pw')?.value?.trim() || '';
    if (!user) return _msg(msg,'⚠️ Vui lòng nhập username','warn');
    if (!name) return _msg(msg,'⚠️ Vui lòng nhập họ tên','warn');
    if (!existUser && !pw) return _msg(msg,'⚠️ Vui lòng nhập mật khẩu','warn');
    _msg(msg,'⏳ Đang lưu...','info');
    try {
      const pwHash = pw ? await Utils.sha256(pw) : '';
      await CL.API.adminSaveAdmin({ username:user, ho_ten:name, email, password_hash:pwHash, is_new:!existUser });
      _msg(msg,`✅ ${existUser?'Cập nhật':'Đã tạo'} admin ${user}`,'ok');
      Toast.success(`✅ ${existUser?'Cập nhật':'Tạo'} admin thành công`);
      setTimeout(() => { document.getElementById('au-adm-form').style.display='none'; _auTab(null,'admins'); }, 1200);
    } catch(e) { _msg(msg,'❌ '+e.message,'err'); }
  }

  async function resetAdminPw(username) {
    const newPw = await _promptPw(`Đặt lại mật khẩu cho admin "${username}"`);
    if (newPw === null) return;
    try {
      const hash = await Utils.sha256(newPw);
      await CL.API.adminSaveAdmin({ username, password_hash: hash, is_new: false });
      Toast.success(`🔑 Đã đặt lại mật khẩu cho ${username}`);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  async function deleteAdmin(username) {
    if (!await Toast.confirm(`🗑 Xoá tài khoản admin "${username}"?\n\nHành động này không thể hoàn tác.`)) return;
    try {
      await CL.API.adminDeleteAdmin({ username });
      Toast.success(`✅ Đã xoá admin ${username}`);
      _auTab(null,'admins');
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  // ════════════════════════════════════════════════════════════════
  //  TAB 4 — BẢNG ĐIỂM (unchanged)
  // ════════════════════════════════════════════════════════════════
  async function _renderScores(el) {
    el.innerHTML = `
      <div class="au-toolbar" style="flex-wrap:wrap;gap:6px">
        <input class="au-search" id="sc-search" type="text" placeholder="🔍 MSHS / họ tên..."
          oninput="CL.Admin.Users._filterScores()">
        <input class="au-select" id="sc-lop" type="text" placeholder="Lớp (VD: 10A1)"
          style="width:90px" oninput="CL.Admin.Users._filterScores()">
        <select class="au-select" id="sc-sort" onchange="CL.Admin.Users._filterScores()">
          <option value="desc">Điểm cao → thấp</option>
          <option value="asc">Điểm thấp → cao</option>
          <option value="name">Tên A-Z</option>
          <option value="time">Mới nhất</option>
        </select>
        <button class="au-btn-add" style="background:var(--accent2)" onclick="CL.Admin.Users._exportScoresCsv()">
          📥 Xuất CSV
        </button>
      </div>
      <div id="sc-summary" class="au-score-summary"></div>
      <div id="sc-body" class="tp-loading">⏳ Đang tải dữ liệu...</div>`;
    try {
      const scores = await CL.API.getScores(true);
      window._scAllScores = scores;
      _renderScoreTable(scores);
      _renderScoreSummary(scores);
    } catch(e) {
      document.getElementById('sc-body').innerHTML =
        `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _renderScoreSummary(scores) {
    const el = document.getElementById('sc-summary');
    if (!el || !scores.length) return;
    const total = scores.length;
    const avg   = (scores.reduce((s,r)=>s+(+r.diem||0),0)/total).toFixed(1);
    const pass  = scores.filter(r=>(+r.diem||0)>=5).length;
    const dist  = {'9-10':0,'7-8':0,'5-6':0,'<5':0};
    scores.forEach(r=>{const d=+r.diem||0;if(d>=9)dist['9-10']++;else if(d>=7)dist['7-8']++;else if(d>=5)dist['5-6']++;else dist['<5']++;});
    el.innerHTML = `
      <div class="au-score-stat"><span class="au-stat-n">${total}</span><span class="au-stat-l">Lần nộp</span></div>
      <div class="au-score-stat"><span class="au-stat-n">${avg}</span><span class="au-stat-l">Điểm TB</span></div>
      <div class="au-score-stat ok"><span class="au-stat-n">${pass}</span><span class="au-stat-l">Đạt (≥5)</span></div>
      <div class="au-score-stat err"><span class="au-stat-n">${total-pass}</span><span class="au-stat-l">Chưa đạt</span></div>
      <div class="au-score-dist">
        ${[['9-10','var(--accent2)'],['7-8','var(--accent)'],['5-6','var(--warn)'],['<5','var(--error)']].map(([k,c])=>
          `<div class="au-dist-bar" style="--pct:${(dist[k]/total*100).toFixed(0)}%;--clr:${c}"><span>${k}</span><b>${dist[k]}</b></div>`
        ).join('')}
      </div>`;
  }

  function _renderScoreTable(scores) {
    const body = document.getElementById('sc-body');
    if (!body) return;
    if (!scores.length){body.innerHTML='<div class="tp-empty">Chưa có dữ liệu điểm</div>';return;}
    body.innerHTML=`<div class="au-table-wrap"><table class="au-table" id="sc-table">
      <thead><tr><th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>Bài tập</th><th>Điểm</th><th>Lần</th><th>Thời gian</th></tr></thead>
      <tbody id="sc-tbody">${scores.map(_scoreRow).join('')}</tbody></table></div>`;
  }

  function _scoreRow(r) {
    const d=+r.diem||0,cls=d>=9?'sc-ex':d>=7?'sc-ok':d>=5?'sc-warn':'sc-bad';
    const ts=r.ts?new Date(r.ts).toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):'—';
    return `<tr data-q="${Utils.escHtml(((r.mshs||'')+(r.ho_ten||'')).toLowerCase())}"
      data-lop="${Utils.escHtml((r.lop||'').toLowerCase())}" data-d="${d}" data-ts="${r.ts||0}"
      data-tn="${Utils.escHtml((r.ho_ten||'').toLowerCase())}">
      <td class="au-mshs">${Utils.escHtml(r.mshs||'—')}</td>
      <td>${Utils.escHtml(r.ho_ten||'—')}</td>
      <td>${Utils.escHtml(r.lop||'—')}</td>
      <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
        title="${Utils.escHtml(r.tieu_de||r.bai_id||'')}">${Utils.escHtml(r.tieu_de||r.bai_id||'—')}</td>
      <td><span class="sc-badge ${cls}">${d.toFixed(1)}</span></td>
      <td style="text-align:center;font-size:11px;color:var(--text3)">${r.lan_thu||1}</td>
      <td style="font-size:11px;color:var(--text3)">${ts}</td>
    </tr>`;
  }

  function _filterScores() {
    const q   =(document.getElementById('sc-search')?.value||'').toLowerCase();
    const lop =(document.getElementById('sc-lop')?.value||'').toLowerCase();
    const sort= document.getElementById('sc-sort')?.value||'desc';
    if (!window._scAllScores) return;
    let filtered = window._scAllScores.filter(r=>{
      const mq=!q  ||(r.mshs||'').includes(q)||(r.ho_ten||'').toLowerCase().includes(q);
      const ml=!lop||(r.lop||'').toLowerCase().includes(lop);
      return mq&&ml;
    });
    if(sort==='desc')  filtered.sort((a,b)=>(+b.diem||0)-(+a.diem||0));
    else if(sort==='asc')  filtered.sort((a,b)=>(+a.diem||0)-(+b.diem||0));
    else if(sort==='name') filtered.sort((a,b)=>(a.ho_ten||'').localeCompare(b.ho_ten||''));
    else if(sort==='time') filtered.sort((a,b)=>new Date(b.ts||0)-new Date(a.ts||0));
    _renderScoreTable(filtered); _renderScoreSummary(filtered);
  }

  function _exportScoresCsv() {
    const scores=window._scAllScores||[];
    if(!scores.length){Toast.warn('Chưa có dữ liệu điểm');return;}
    const header='MSHS,Ho Ten,Lop,Bai Tap,Diem,Lan Thu,Thoi Gian\n';
    const rows=scores.map(r=>[r.mshs,r.ho_ten,r.lop,(r.tieu_de||r.bai_id||'').replace(/,/g,' '),r.diem,r.lan_thu||1,r.ts||''].join(',')).join('\n');
    const blob=new Blob(['\uFEFF'+header+rows],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download=`BangDiem_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();URL.revokeObjectURL(url);
    Toast.success('📥 Đã xuất bảng điểm CSV');
  }

  // ════════════════════════════════════════════════════════════════
  //  SHARED ACTIONS
  // ════════════════════════════════════════════════════════════════

  // Custom password prompt — no browser prompt() (blocked in some contexts)
  function _promptPw(title) {
    return new Promise(resolve => {
      const ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center';
      ov.innerHTML = `
        <div style="background:var(--surface,#1e2433);border:1px solid var(--border,#334155);border-radius:14px;padding:24px;max-width:360px;width:90%;font-family:system-ui,sans-serif">
          <div style="font-size:14px;font-weight:600;color:var(--text,#f1f5f9);margin-bottom:12px">🔑 ${Utils.escHtml(title)}</div>
          <input id="_pwprompt" type="text" style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--border,#475569);background:var(--surface2,#0f172a);color:var(--text,#f1f5f9);font-size:13px;outline:none;margin-bottom:6px"
            placeholder="Mật khẩu mới (để trống = dùng ID)">
          <div style="font-size:11px;color:var(--text3,#64748b);margin-bottom:16px">Tối thiểu 4 ký tự</div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button id="_pwcancel" style="padding:8px 18px;border:1px solid var(--border,#475569);background:none;border-radius:8px;color:var(--text3,#94a3b8);cursor:pointer;font-size:13px">Hủy</button>
            <button id="_pwok" style="padding:8px 18px;background:#4f9eff;border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:13px;font-weight:700">Đặt mật khẩu</button>
          </div>
        </div>`;
      document.body.appendChild(ov);
      const inp = ov.querySelector('#_pwprompt');
      inp.focus();
      const done = (v) => { ov.remove(); resolve(v); };
      ov.querySelector('#_pwok').onclick = () => {
        const v = inp.value.trim();
        if (v && v.length < 4) { inp.style.borderColor='#ef4444'; return; }
        done(v || null);
      };
      ov.querySelector('#_pwcancel').onclick = () => done(null);
      inp.onkeydown = e => { if(e.key==='Enter') ov.querySelector('#_pwok').click(); if(e.key==='Escape') done(null); };
    });
  }

  async function resetPassword(id, role) {
    const label = role==='student' ? `học sinh "${id}"` : `giáo viên "${id}"`;
    const newPw = await _promptPw(`Đặt lại mật khẩu cho ${label}`);
    if (newPw === null) return;  // cancelled or blank
    const pw = newPw || id;  // blank = use id as password
    try {
      const hash = await Utils.sha256(pw);
      await CL.API.adminResetPassword({ role, id, new_hash: hash, new_plain: pw });
      Toast.success(`🔑 Đã đặt lại mật khẩu cho ${id}. Mật khẩu mới: "${pw}"`);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  async function toggleActive(id, role, cur) {
    const action = cur ? 'Khoá' : 'Mở khoá';
    if (!await Toast.confirm(`${action} tài khoản "${id}"?`)) return;
    try {
      await CL.API.adminToggleActive({ role, id, active: !cur });
      Toast.success(`✅ Đã ${action.toLowerCase()} tài khoản ${id}`);
      CL.API._invalidate('users_'+role);
      _auTab(null, _curTab);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  async function deleteUser(id, role) {
    if (!await Toast.confirm(`🗑 Xoá tài khoản "${id}"?\n\nHành động này KHÔNG thể hoàn tác.`)) return;
    try {
      await CL.API.adminDeleteUser({ role, id });
      Toast.success(`✅ Đã xoá ${id}`);
      CL.API._invalidate('users_'+role);
      _auTab(null, _curTab);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  function _msg(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = 'pf-msg pf-msg-'+(type||'info');
  }

  return {
    render, _auTab,
    showStudentForm, saveStudent, _filterStu, _getStu, _getAdmin,
    showTeacherForm, saveTeacher, _filterGv, _getGv,
    showAdminForm, saveAdmin, resetAdminPw, deleteAdmin,
    _filterScores, _exportScoresCsv,
    resetPassword, toggleActive, deleteUser,
  };
});

// ─── js/features/admin/year-manager.js ───────────────────────────
/**
 * admin/year-manager.js — Quản lý Năm học (Admin only)
 * ═══════════════════════════════════════════════════════════════
 * Chức năng:
 *   1. Xem năm học đang active
 *   2. Chuyển sang năm học mới (yearTransition)
 *   3. Import danh sách học sinh từ CSV
 *   4. Xem lịch sử lớp học (LichSuLop)
 *
 * Luồng chuyển năm:
 *   Admin upload CSV → preview → xác nhận → yearTransition()
 *   → Cập nhật lop_hien_tai từng HS → Ghi LichSuLop → active_nam_hoc mới
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Admin.YearManager', () => {
  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');

  let _parsedRows  = [];   // CSV parsed rows
  let _namHocInfo  = null; // { active, previous, list }

  // ══════════════════════════════════════════════════════════════
  //  MAIN RENDER
  // ══════════════════════════════════════════════════════════════
  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải thông tin năm học...</div>';
    try {
      _namHocInfo = await CL.API.getNamHocInfo();
    } catch(e) {
      _namHocInfo = { active: '2025-2026', previous: '', list: ['2025-2026'] };
    }

    el.innerHTML = `
      <div class="ym-wrap">

        <!-- Header info -->
        <div class="ym-header">
          <div class="ym-current">
            <div class="ym-label">Năm học đang hoạt động</div>
            <div class="ym-value" id="ym-active">${Utils.escHtml(_namHocInfo.active || '—')}</div>
          </div>
          <div class="ym-prev">
            <div class="ym-label">Năm học trước</div>
            <div class="ym-value ym-muted">${Utils.escHtml(_namHocInfo.previous || '—')}</div>
          </div>
        </div>

        <!-- Section 1: Import CSV -->
        <div class="ym-section">
          <div class="ym-section-title">📥 1. Import danh sách học sinh từ CSV</div>
          <div class="ym-hint">
            File CSV cần có header: <code>mshs</code>, <code>ho_ten</code>, <code>lop</code>
            (tuỳ chọn: <code>email</code>, <code>ngay_sinh</code>)<br>
            Học sinh đã tồn tại sẽ được <b>cập nhật lớp</b>. Học sinh mới sẽ được <b>thêm</b>.
          </div>
          <div class="ym-csv-zone" id="ym-drop-zone">
            📄 Kéo thả file CSV vào đây hoặc <b>click để chọn file</b>
            <input type="file" id="ym-file-input" accept=".csv,.txt" style="display:none">
          </div>
          <div id="ym-csv-preview" style="display:none">
            <div class="ym-preview-header">
              <span id="ym-csv-count"></span>
              <button class="ym-btn-secondary" onclick="CL.Admin.YearManager.clearCsv()">✕ Xóa</button>
            </div>
            <div class="ym-preview-table-wrap">
              <table class="ym-table" id="ym-preview-table"></table>
            </div>
          </div>
          <div class="ym-actions" id="ym-import-actions" style="display:none">
            <label class="ym-checkbox-label">
              <input type="checkbox" id="ym-reset-pw"> Reset mật khẩu về MSHS
            </label>
            <button class="ym-btn-primary" onclick="CL.Admin.YearManager.importNow()">
              📥 Import ${_parsedRows.length} học sinh
            </button>
          </div>
          <div id="ym-import-msg" class="ym-msg"></div>
        </div>

        <!-- Section 2: Chuyển năm học -->
        <div class="ym-section">
          <div class="ym-section-title">🔄 2. Chuyển sang năm học mới</div>
          <div class="ym-hint">
            ⚠️ Thao tác này sẽ:<br>
            &nbsp;&nbsp;• Cập nhật <b>lop_hien_tai</b> cho từng học sinh theo CSV đã import<br>
            &nbsp;&nbsp;• Ghi vào <b>LichSuLop</b> (lịch sử lớp học của từng HS)<br>
            &nbsp;&nbsp;• Đánh dấu <b>inactive</b> học sinh không có trong danh sách mới (đã tốt nghiệp)<br>
            &nbsp;&nbsp;• Đổi <b>Năm học active</b> trong hệ thống
          </div>
          <div class="ym-form-row">
            <label class="ym-form-label">Năm học mới</label>
            <input id="ym-new-year" class="ym-input" type="text"
              placeholder="VD: 2026-2027"
              value="${_nextYear(_namHocInfo.active)}">
          </div>
          <div id="ym-transition-preview" style="display:none"></div>
          <div class="ym-actions">
            <button class="ym-btn-secondary" onclick="CL.Admin.YearManager.previewTransition()">
              🔍 Xem trước
            </button>
            <button class="ym-btn-danger" onclick="CL.Admin.YearManager.doTransition()">
              🔄 Chuyển năm học
            </button>
          </div>
          <div id="ym-transition-msg" class="ym-msg"></div>
        </div>

        <!-- Section 3: Lịch sử lớp học -->
        <div class="ym-section">
          <div class="ym-section-title">📖 3. Lịch sử lớp học</div>
          <div class="ym-form-row">
            <input id="ym-search-mshs" class="ym-input" type="text"
              placeholder="Nhập MSHS để xem lịch sử lớp..."
              style="flex:1">
            <button class="ym-btn-secondary" onclick="CL.Admin.YearManager.loadHistory()">
              🔍 Xem
            </button>
          </div>
          <div id="ym-history-result"></div>
        </div>

      </div>`;

    // Wire dropzone
    _initDropZone();
  }

  // ══════════════════════════════════════════════════════════════
  //  CSV IMPORT
  // ══════════════════════════════════════════════════════════════
  function _initDropZone() {
    const zone  = document.getElementById('ym-drop-zone');
    const input = document.getElementById('ym-file-input');
    if (!zone || !input) return;

    zone.addEventListener('click',     () => input.click());
    zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('drag'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('drag');
      const file = e.dataTransfer?.files?.[0];
      if (file) _readCsv(file);
    });
    input.addEventListener('change', () => {
      if (input.files?.[0]) _readCsv(input.files[0]);
    });
  }

  function _readCsv(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        _parsedRows = _parseCsv(e.target.result);
        _renderPreview(_parsedRows);
      } catch(err) {
        Toast.error('❌ Lỗi đọc CSV: ' + err.message);
      }
    };
    reader.readAsText(file, 'UTF-8');
  }

  function _parseCsv(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) throw new Error('CSV trống hoặc không có dữ liệu');

    // Parse header
    const rawHeader = lines[0].split(',').map(h => h.trim().toLowerCase()
      .replace(/["""]/g, '').replace(/\s+/g, '_'));

    // Map common aliases
    const aliases = {
      'mã_số_học_sinh': 'mshs', 'ma_so_hs': 'mshs', 'cccd': 'mshs', 'cmnd': 'mshs',
      'họ_và_tên': 'ho_ten', 'ho_va_ten': 'ho_ten', 'tên': 'ten', 'fullname': 'ho_ten',
      'lớp': 'lop', 'class': 'lop', 'lop_moi': 'lop',
      'email': 'email', 'ngày_sinh': 'ngay_sinh', 'birthday': 'ngay_sinh',
    };
    const header = rawHeader.map(h => aliases[h] || h);

    const required = ['mshs', 'ho_ten', 'lop'];
    const missing  = required.filter(r => !header.includes(r));
    if (missing.length) throw new Error(`Thiếu cột: ${missing.join(', ')}`);

    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const cells = line.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      const row   = {};
      header.forEach((h, idx) => { row[h] = cells[idx] || ''; });
      if (row.mshs) rows.push(row);
    }
    return rows;
  }

  function _renderPreview(rows) {
    const preview = document.getElementById('ym-csv-preview');
    const countEl = document.getElementById('ym-csv-count');
    const table   = document.getElementById('ym-preview-table');
    const actions = document.getElementById('ym-import-actions');
    if (!preview || !table) return;

    if (countEl) countEl.textContent = `✅ Đã đọc ${rows.length} học sinh`;
    preview.style.display = '';
    if (actions) {
      actions.innerHTML = `
        <label class="ym-checkbox-label">
          <input type="checkbox" id="ym-reset-pw"> Reset mật khẩu về MSHS
        </label>
        <button class="ym-btn-primary" onclick="CL.Admin.YearManager.importNow()">
          📥 Import ${rows.length} học sinh
        </button>`;
      actions.style.display = '';
    }

    const cols  = ['mshs', 'ho_ten', 'lop', 'email'].filter(c => rows[0]?.[c] !== undefined);
    const head  = `<thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>`;
    const body  = `<tbody>${rows.slice(0, 10).map(r =>
      `<tr>${cols.map(c => `<td>${Utils.escHtml(r[c] || '')}</td>`).join('')}</tr>`
    ).join('')}${rows.length > 10 ? `<tr><td colspan="${cols.length}" style="text-align:center;color:var(--text3)">...và ${rows.length - 10} dòng khác</td></tr>` : ''}</tbody>`;
    table.innerHTML = head + body;
  }

  function clearCsv() {
    _parsedRows = [];
    const preview = document.getElementById('ym-csv-preview');
    const actions = document.getElementById('ym-import-actions');
    if (preview) preview.style.display = 'none';
    if (actions) actions.style.display = 'none';
    const fi = document.getElementById('ym-file-input');
    if (fi) fi.value = '';
  }

  async function importNow() {
    if (!_parsedRows.length) { Toast.warn('Chưa có dữ liệu CSV'); return; }
    const msg    = document.getElementById('ym-import-msg');
    const resetPw = document.getElementById('ym-reset-pw')?.checked || false;
    const namHoc  = document.getElementById('ym-new-year')?.value?.trim()
                    || _namHocInfo?.active || '';

    if (msg) msg.innerHTML = '⏳ Đang import...';
    try {
      const r = await CL.API.importStudents(_parsedRows, namHoc, resetPw);
      if (msg) msg.innerHTML =
        `✅ <b>Import thành công!</b> Thêm mới: ${r.inserted} · Cập nhật: ${r.updated} · Bỏ qua: ${r.skipped}` +
        (r.errors?.length ? `<br>⚠️ ${r.errors.slice(0,3).join('<br>')}` : '');
      Toast.success(`✅ Import xong: +${r.inserted} mới, ~${r.updated} cập nhật`);
      clearCsv();
    } catch(e) {
      if (msg) msg.innerHTML = `❌ ${e.message}`;
      Toast.error('❌ ' + e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  YEAR TRANSITION
  // ══════════════════════════════════════════════════════════════
  async function previewTransition() {
    const namHocMoi = document.getElementById('ym-new-year')?.value?.trim();
    if (!namHocMoi) { Toast.warn('Nhập năm học mới'); return; }

    const previewEl = document.getElementById('ym-transition-preview');
    if (previewEl) previewEl.innerHTML = '⏳ Đang kiểm tra...';

    try {
      const r = await CL.API.yearTransition({
        nam_hoc_moi: namHocMoi,
        ds_hoc_sinh: _parsedRows.map(s => ({ mshs: s.mshs, lop_moi: s.lop })),
        preview_only: true,
      });

      if (previewEl) {
        previewEl.style.display = '';
        previewEl.innerHTML = `
          <div class="ym-preview-box">
            <div class="ym-prev-item"><span class="ym-prev-label">Năm học mới</span><b>${Utils.escHtml(namHocMoi)}</b></div>
            <div class="ym-prev-item"><span class="ym-prev-label">Tổng học sinh trong CSV</span><b>${r.total}</b></div>
            <div class="ym-prev-item"><span class="ym-prev-label">Tìm thấy trong hệ thống</span><b class="ok">${r.found}</b></div>
            ${r.missing?.length ? `<div class="ym-prev-item warn">
              <span class="ym-prev-label">MSHS không tìm thấy (${r.missing.length})</span>
              <span>${r.missing.slice(0,5).join(', ')}${r.missing.length > 5 ? '...' : ''}</span>
            </div>` : ''}
          </div>`;
      }
    } catch(e) {
      Toast.error('❌ ' + e.message);
    }
  }

  async function doTransition() {
    const namHocMoi = document.getElementById('ym-new-year')?.value?.trim();
    if (!namHocMoi) { Toast.warn('Nhập năm học mới'); return; }

    const confirmed = await Toast.confirm(
      `⚠️ Xác nhận chuyển sang năm học ${namHocMoi}?\n\n` +
      `• ${_parsedRows.length} học sinh sẽ được cập nhật lớp\n` +
      `• Học sinh không trong danh sách → inactive\n` +
      `• Năm học active → ${namHocMoi}\n\n` +
      `Thao tác KHÔNG THỂ hoàn tác bằng nút. Bạn chắc chắn?`
    );
    if (!confirmed) return;

    const msgEl = document.getElementById('ym-transition-msg');
    if (msgEl) msgEl.innerHTML = '⏳ Đang chuyển năm học...';

    try {
      const r = await CL.API.yearTransition({
        nam_hoc_moi:  namHocMoi,
        nam_hoc_cu:   _namHocInfo?.active || '',
        ds_hoc_sinh:  _parsedRows.map(s => ({ mshs: s.mshs, lop_moi: s.lop, ghi_chu: '' })),
        preview_only: false,
      });

      if (msgEl) msgEl.innerHTML =
        `✅ <b>Chuyển năm học thành công!</b><br>` +
        `Năm học mới: <b>${namHocMoi}</b><br>` +
        `Cập nhật: ${r.updated} HS · Ghi LichSuLop: ${r.inserted_lichsu} · ` +
        `Inactive: ${r.deactivated}` +
        (r.errors?.length ? `<br>⚠️ Lỗi: ${r.errors.slice(0,3).join('; ')}` : '');

      Toast.success(`✅ Đã chuyển sang năm học ${namHocMoi}`);

      // Refresh display
      setTimeout(() => render(document.getElementById('ym-wrap')?.closest('[id]') || document.body), 1500);

    } catch(e) {
      if (msgEl) msgEl.innerHTML = `❌ ${e.message}`;
      Toast.error('❌ ' + e.message);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  HISTORY VIEWER
  // ══════════════════════════════════════════════════════════════
  async function loadHistory() {
    const mshs   = document.getElementById('ym-search-mshs')?.value?.trim();
    const result = document.getElementById('ym-history-result');
    if (!result) return;
    result.innerHTML = '⏳';

    try {
      const rows = await CL.API.getLichSuLop(mshs);
      if (!rows?.length) {
        result.innerHTML = '<div class="tp-empty">Không có lịch sử lớp học.</div>';
        return;
      }
      result.innerHTML = `
        <table class="ym-table" style="margin-top:8px">
          <thead><tr><th>MSHS</th><th>Họ tên</th><th>Năm học</th><th>Lớp</th><th>Ghi chú</th></tr></thead>
          <tbody>${rows.map(r => `
            <tr>
              <td>${Utils.escHtml(r.mshs||'')}</td>
              <td>${Utils.escHtml(r.ho_ten||'')}</td>
              <td><span class="ym-badge">${Utils.escHtml(r.nam_hoc||'')}</span></td>
              <td><b>${Utils.escHtml(r.lop||'')}</b></td>
              <td style="color:var(--text3)">${Utils.escHtml(r.ghi_chu||'—')}</td>
            </tr>`).join('')}
          </tbody>
        </table>`;
    } catch(e) {
      result.innerHTML = `<div class="tp-empty">❌ ${e.message}</div>`;
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  UTILS
  // ══════════════════════════════════════════════════════════════
  function _nextYear(namHoc) {
    if (!namHoc) return '';
    const [y1] = namHoc.split('-').map(Number);
    if (!y1) return '';
    return `${y1 + 1}-${y1 + 2}`;
  }

  return { render, clearCsv, importNow, previewTransition, doTransition, loadHistory };
});

// ─── js/ui.js ───────────────────────────
//  UI CODE
// ══════════════════════════════════════════════════════════════

// ─── Input dialog system ────────────────────────────────────
let inputResolveQ = [];
let currentInputResolve = null;

function askUserInput(promptText) {
  return new Promise(resolve => {
    currentInputResolve = resolve;
    document.getElementById('input-prompt').textContent = promptText || '▶ Nhập giá trị:';
    const inp = document.getElementById('input-field');
    inp.value = '';
    document.getElementById('input-overlay').classList.add('show');
    setTimeout(() => inp.focus(), 100);
  });
}

function submitInput() {
  const val = document.getElementById('input-field').value;
  document.getElementById('input-overlay').classList.remove('show');
  appendOut(val + '\n', 'o-n');
  if (currentInputResolve) { currentInputResolve(val); currentInputResolve = null; }
}

document.getElementById('input-field')?.addEventListener('keydown', e => { if (e.key === 'Enter') submitInput(); });

// ─── Line numbers ───────────────────────────────────────────
const ci = document.getElementById('code-input');
const lnEl = document.getElementById('lnums');

function updLN() {
  const lines = ci.value.split('\n');
  const cur = ci.value.substring(0, ci.selectionStart).split('\n');
  const curLine = cur.length;
  document.getElementById('lc').textContent = `Ln ${curLine}, Col ${cur[cur.length-1].length+1}`;
  lnEl.innerHTML = lines.map((_, i) => `<span${i+1===curLine?' class="al"':''}>${i+1}</span>`).join('');
  lnEl.scrollTop = ci.scrollTop;
}

// ── Syntax Highlighting Engine (VSCode Dark+ for Python) ────────────────────
const hlOverlay = document.getElementById('hl-overlay');

const PY_KEYWORDS = new Set([
  'False','None','True','and','as','assert','async','await','break','class',
  'continue','def','del','elif','else','except','finally','for','from',
  'global','if','import','in','is','lambda','nonlocal','not','or','pass',
  'raise','return','try','while','with','yield'
]);

const PY_BUILTINS = new Set([
  'abs','all','any','bin','bool','breakpoint','bytearray','bytes','callable',
  'chr','classmethod','compile','complex','delattr','dict','dir','divmod',
  'enumerate','eval','exec','filter','float','format','frozenset','getattr',
  'globals','hasattr','hash','help','hex','id','input','int','isinstance',
  'issubclass','iter','len','list','locals','map','max','memoryview','min',
  'next','object','oct','open','ord','pow','print','property','range',
  'repr','reversed','round','set','setattr','slice','sorted','staticmethod',
  'str','sum','super','tuple','type','vars','zip'
]);

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function hlPython(code) {
  if (typeof CL !== 'undefined' && CL.Editors?.Syntax?.python) {
    return CL.Editors.Syntax.python(code);
  }
  let out = '';
  let i = 0;
  const n = code.length;
  let prevTokType = null; // track if prev was 'def' or 'class'

  while (i < n) {
    const ch = code[i];

    // Comment
    if (ch === '#') {
      let j = i;
      while (j < n && code[j] !== '\n') j++;
      out += `<span class="hl-cmt">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Triple-quoted string
    if ((ch === '"' || ch === "'") && code[i+1] === ch && code[i+2] === ch) {
      const q = ch.repeat(3);
      let j = i + 3;
      while (j < n && code.slice(j, j+3) !== q) j++;
      j += 3;
      out += `<span class="hl-str">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Single/double quoted string
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < n && code[j] !== ch && code[j] !== '\n') {
        if (code[j] === '\\') j++; // skip escape
        j++;
      }
      if (j < n && code[j] === ch) j++;
      out += `<span class="hl-str">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Number (int, float, hex, binary)
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[i+1] || ''))) {
      let j = i;
      if (ch === '0' && (code[i+1] === 'x' || code[i+1] === 'X')) { j += 2; while (j < n && /[0-9a-fA-F_]/.test(code[j])) j++; }
      else if (ch === '0' && (code[i+1] === 'b' || code[i+1] === 'B')) { j += 2; while (j < n && /[01_]/.test(code[j])) j++; }
      else { while (j < n && /[0-9._eE+\-]/.test(code[j])) j++; }
      out += `<span class="hl-num">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Decorator
    if (ch === '@') {
      let j = i + 1;
      while (j < n && /[\w.]/.test(code[j])) j++;
      out += `<span class="hl-deco">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = 'deco';
      continue;
    }

    // Identifier or keyword
    if (/[a-zA-Z_\u00c0-\u024f\u1ea0-\u1ef9]/.test(ch)) {
      let j = i;
      while (j < n && /[\w\u00c0-\u024f\u1ea0-\u1ef9]/.test(code[j])) j++;
      const word = code.slice(i, j);
      let cls;
      if (prevTokType === 'def') cls = 'hl-fn';
      else if (prevTokType === 'class') cls = 'hl-cls';
      else if (word === 'self' || word === 'cls') cls = 'hl-self';
      else if (word === 'True' || word === 'False' || word === 'None') cls = 'hl-bool';
      else if (PY_KEYWORDS.has(word)) cls = 'hl-kw';
      else if (PY_BUILTINS.has(word)) cls = 'hl-bi';
      else cls = 'hl-plain';
      out += `<span class="${cls}">${escHtml(word)}</span>`;
      prevTokType = (word === 'def' || word === 'class') ? word : null;
      i = j;
      continue;
    }

    // Operators
    if (/[+\-*/%=<>!&|^~]/.test(ch)) {
      let j = i;
      // Multi-char operators
      const two = code.slice(i, i+2);
      if (['**','//','==','!=','<=','>=','+=','-=','*=','/=','//=','**=','%=','&=','|=','^=','<<','>>','->'].includes(two)) j = i + 2;
      else j = i + 1;
      out += `<span class="hl-op">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      prevTokType = null;
      continue;
    }

    // Punctuation
    if (/[()\[\]{},.:;]/.test(ch)) {
      out += `<span class="hl-punc">${escHtml(ch)}</span>`;
      i++;
      prevTokType = null;
      continue;
    }

    // Whitespace and newlines - pass through
    out += escHtml(ch);
    if (ch !== ' ' && ch !== '\t' && ch !== '\n') prevTokType = null;
    i++;
  }
  return out;
}

function updateHighlight() {
  if (!hlOverlay) return;
  const code = ci.value;
  hlOverlay.innerHTML = hlPython(code) + '\n'; // trailing newline prevents scroll jump
  hlOverlay.scrollTop = ci.scrollTop;
  hlOverlay.scrollLeft = ci.scrollLeft;
}

ci.addEventListener('input', () => { updLN(); updateHighlight(); });
ci.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = ci.selectionStart, en = ci.selectionEnd;
    if (s !== en) {
      // Multi-line indent
      const before = ci.value.substring(0, s);
      const sel = ci.value.substring(s, en);
      const after = ci.value.substring(en);
      const indented = sel.replace(/^/gm, '    ');
      ci.value = before + indented + after;
      ci.selectionStart = s;
      ci.selectionEnd = s + indented.length;
    } else {
      ci.value = ci.value.substring(0, s) + '    ' + ci.value.substring(en);
      ci.selectionStart = ci.selectionEnd = s + 4;
    }
    updLN(); updateHighlight();
  }
  if (e.key === 'Enter') {
    // Auto-indent: match indent of current line
    const s = ci.selectionStart;
    const before = ci.value.substring(0, s);
    const after = ci.value.substring(s);
    const lines = before.split('\n');
    const curLine = lines[lines.length - 1];
    const indent = curLine.match(/^(\s*)/)[1];
    // Extra indent after colon
    const extraIndent = /:\s*$/.test(curLine.trimEnd()) ? '    ' : '';
    e.preventDefault();
    const ins = '\n' + indent + extraIndent;
    ci.value = before + ins + after;
    ci.selectionStart = ci.selectionEnd = s + ins.length;
    updLN(); updateHighlight();
  }
  if ((e.ctrlKey||e.metaKey) && e.key === 'Enter') runCode();
});

// ── Mobile keyboard toolbar helpers ─────────────────────────────────────────
function mkInsert(text) {
  const s = ci.selectionStart, en = ci.selectionEnd;
  const before = ci.value.substring(0, s);
  const after = ci.value.substring(en);
  // For paired chars, wrap selection or place cursor inside
  const pairs = { '()': ['(', ')'], '[]': ['[', ']'], '{}': ['{', '}'], '""': ['"', '"'], "''": ["'", "'"] };
  if (pairs[text]) {
    const [open, close] = pairs[text];
    const sel = ci.value.substring(s, en);
    ci.value = before + open + sel + close + after;
    if (sel.length > 0) {
      ci.selectionStart = s + 1;
      ci.selectionEnd = s + 1 + sel.length;
    } else {
      ci.selectionStart = ci.selectionEnd = s + 1;
    }
  } else {
    ci.value = before + text + after;
    ci.selectionStart = ci.selectionEnd = s + text.length;
  }
  ci.focus();
  updLN(); updateHighlight();
}

function mkIndent() {
  const s = ci.selectionStart, en = ci.selectionEnd;
  const before = ci.value.substring(0, s);
  const sel = ci.value.substring(s, en);
  const after = ci.value.substring(en);
  if (s !== en) {
    const indented = sel.replace(/^/gm, '    ');
    ci.value = before + indented + after;
    ci.selectionStart = s; ci.selectionEnd = s + indented.length;
  } else {
    ci.value = before + '    ' + after;
    ci.selectionStart = ci.selectionEnd = s + 4;
  }
  ci.focus(); updLN(); updateHighlight();
}

function mkDedent() {
  const s = ci.selectionStart, en = ci.selectionEnd;
  const before = ci.value.substring(0, s);
  const sel = ci.value.substring(s, en);
  const after = ci.value.substring(en);
  if (s !== en) {
    const dedented = sel.replace(/^    /gm, '');
    ci.value = before + dedented + after;
    ci.selectionStart = s; ci.selectionEnd = s + dedented.length;
  } else {
    // Dedent current line
    const lineStart = before.lastIndexOf('\n') + 1;
    const line = ci.value.substring(lineStart);
    if (line.startsWith('    ')) {
      ci.value = ci.value.substring(0, lineStart) + line.substring(4);
      ci.selectionStart = ci.selectionEnd = Math.max(lineStart, s - 4);
    }
  }
  ci.focus(); updLN(); updateHighlight();
}
ci.addEventListener('scroll', () => { lnEl.scrollTop = ci.scrollTop; if(hlOverlay){hlOverlay.scrollTop=ci.scrollTop;hlOverlay.scrollLeft=ci.scrollLeft;} });
ci.addEventListener('click', updLN); ci.addEventListener('keyup', updLN);

// ─── Sync editor layout (font/lineheight) ─────────────────────────────────
function syncEditorLayout() {
  // hl-overlay now lives inside .code-area-wrap so left:0 = correct — no offset needed
  // Still sync font/lineheight so overlay matches textarea exactly
  const cs = window.getComputedStyle(ci);
  const fs = parseFloat(cs.fontSize);
  const lh = parseFloat(cs.lineHeight) || fs * 1.6;
  lnEl.style.setProperty('--lh', lh + 'px');
  if (hlOverlay) {
    hlOverlay.style.fontSize   = cs.fontSize;
    hlOverlay.style.lineHeight = cs.lineHeight;
    hlOverlay.style.padding    = cs.padding;
  }
  // Đồng bộ chiều cao header và ex-bar để panel.mob-active tính đúng
  const hdr = document.querySelector('header');
  const bar = document.getElementById('content-bar');
  const desc = document.getElementById('ex-desc');
  if (hdr) document.documentElement.style.setProperty('--header-h', hdr.offsetHeight + 'px');
  if (bar) {
    const descH = (desc && desc.classList.contains('show')) ? desc.offsetHeight : 0;
    document.documentElement.style.setProperty('--exbar-h', (bar.offsetHeight + descH) + 'px');
  }
}
window.addEventListener('resize', syncEditorLayout);
window.addEventListener('orientationchange', () => setTimeout(syncEditorLayout, 300));
// Chạy lại sau khi tất cả fonts/layout đã render xong
window.addEventListener('load', () => setTimeout(syncEditorLayout, 100));
syncEditorLayout();

updLN(); updateHighlight();

// ─── Output ─────────────────────────────────────────────────
function clearOut() { document.getElementById('out').innerHTML = '<span class="o-p">// Output đã xóa…</span>'; }
function appendOut(text, cls = 'o-n') {
  const el = document.getElementById('out');
  const prompt = el.querySelector('.o-p'); if (prompt) prompt.remove();
  const span = document.createElement('span'); span.className = cls;
  span.textContent = text; el.appendChild(span); el.scrollTop = el.scrollHeight;
}

// runCode defined below (override version)

async function runWithInputs(code) {
  // We need a synchronous interpreter but async input.
  // Solution: detect input() calls, ask user, then re-run with pre-filled inputs
  let inputIdx = 0;
  let collectedInputs = [];
  let firstRun = true;

  async function execute() {
    inputIdx = 0;
    let blocked = false;

    function syncInput(prompt) {
      if (inputIdx < collectedInputs.length) {
        return collectedInputs[inputIdx++];
      }
      // Need more input - we'll collect it
      blocked = true;
      return '__NEED_INPUT__:' + prompt;
    }

    let outputLines = [];
    function outCb(text, isErr) {
      if (!firstRun) return; // Only show output on final run
      appendOut(text, isErr ? 'o-e' : 'o-n');
    }

    // Run synchronously
    try {
      const toks = PyInterp.tokenize(code);
      const parser = new PyInterp.Parser(toks);
      const ast = parser.parse();
      const interp = new PyInterp.Interp((text, isErr) => {
        outputLines.push({ text, isErr });
        if (firstRun) appendOut(text, isErr ? 'o-e' : 'o-n');
      }, syncInput);

      const r = interp.run(ast);
      if (r && r.e) {
        appendOut('\n' + r.e.toString() + '\n', 'o-e');
      } else if (!blocked) {
        // Check if any output was blocked (contained __NEED_INPUT__)
        const needInput = outputLines.find(l => l.text && l.text.includes('__NEED_INPUT__:'));
        if (!needInput) {
          appendOut('\n✓ Thực thi thành công\n', 'o-s');
          return;
        }
      }
    } catch (e) {
      // Check if blocked by input
      const blockedInput = e.message || String(e);
      if (!blocked) {
        appendOut('\n' + (e instanceof PyInterp.PyErr ? e.toString() : 'RuntimeError: ' + blockedInput) + '\n', 'o-e');
        return;
      }
    }

    // If blocked, we need to collect input differently
    if (blocked) {
      // Clear what we showed and restart with input dialog
      const el = document.getElementById('out');
      while (el.lastChild && el.lastChild.textContent.includes('__NEED_INPUT__')) el.removeChild(el.lastChild);
      const promptText = 'Nhập dữ liệu';
      const userInput = await askUserInput(promptText);
      collectedInputs.push(userInput);
      firstRun = true;
      clearOut();
      await execute();
    }
  }

  await execute();
}

// ── Sanitize code: fix mobile keyboard issues ─────────────────────────
function sanitizeCode(code) {
  return code
    // Smart/curly double quotes → straight quotes
    .replace(/\u201c|\u201d|\u201e|\u201f|\u00ab|\u00bb/g, '"')
    // Smart/curly single quotes → straight apostrophe
    .replace(/\u2018|\u2019|\u201a|\u201b|\u2032|\u2035/g, "'")
    // Zero-width spaces and other invisible Unicode
    .replace(/[\u200b\u200c\u200d\u200e\u200f\ufeff\u00ad]/g, '')
    // Non-breaking space → regular space
    .replace(/\u00a0/g, ' ')
    // Full-width colon → ASCII colon (common on some Asian keyboards)
    .replace(/\uff1a/g, ':')
    // Full-width parentheses → ASCII
    .replace(/\uff08/g, '(').replace(/\uff09/g, ')')
    // Normalize line endings (including Unicode line/paragraph separators from iOS copy-paste)
    .replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    .replace(/\u2028|\u2029/g, '\n');
}

// Better approach: Use pre-prompting
async function runCode_v2(code) {
  code = sanitizeCode(code);
  clearOut();
  // Count input() calls
  const inputMatches = (code.match(/\binput\s*\(/g) || []).length;

  if (inputMatches === 0) {
    runSync(code);
    return;
  }

  // Collect inputs first via dialogs
  const inputs = [];
  const inputCalls = extractInputPrompts(code);

  for (let i = 0; i < inputCalls.length; i++) {
    const val = await askUserInput(inputCalls[i] || `Nhập giá trị cho input() thứ ${i+1}:`);
    inputs.push(val);
  }

  runSync(code, inputs);
}

function extractInputPrompts(code) {
  const prompts = [];
  // Match input("...") or input('...')
  const regex = /\binput\s*\(\s*(['"])((?:[^\\]|\\.)*?)\1\s*\)/g;
  let m;
  const withArgPositions = new Set();
  while ((m = regex.exec(code)) !== null) {
    prompts.push(m[2]);
    withArgPositions.add(m.index);
  }
  // Also find input() without args - but avoid double-counting
  const noArgRegex = /\binput\s*\(\s*\)/g;
  let m2;
  while ((m2 = noArgRegex.exec(code)) !== null) {
    if (!withArgPositions.has(m2.index)) prompts.push('');
  }
  return prompts;
}

function runSync(code, inputs = []) {
  code = sanitizeCode(code);
  let inputIdx = 0;

  try {
    const toks = PyInterp.tokenize(code);
    const parser = new PyInterp.Parser(toks);
    const ast = parser.parse();
    const interp = new PyInterp.Interp(
      (text, isErr) => {
        if (text.endsWith('\n')) {
          appendOut(text, isErr ? 'o-e' : 'o-n');
        } else {
          appendOut(text, isErr ? 'o-e' : 'o-n');
        }
      },
      (prompt) => {
        if (inputIdx < inputs.length) {
          const val = inputs[inputIdx++];
          // Show prompt + user input in output
          if (prompt) appendOut(prompt, 'o-n');
          appendOut(val + '\n', 'o-p');
          return val;
        }
        if (prompt) appendOut(prompt, 'o-n');
        return '';
      }
    );

    const r = interp.run(ast);
    if (r && r.e) {
      appendOut('\n' + r.e.toString() + '\n', 'o-e');
    } else if (!r) {
      appendOut('\n✓ Thực thi thành công\n', 'o-s');
    }
  } catch (e) {
    appendOut('\n' + (e instanceof PyInterp.PyErr ? e.toString() : 'RuntimeError: ' + (e.message || String(e))) + '\n', 'o-e');
  }
}


/// ─── Run code silently (for test execution) ──────────────────
function runSilent(code, inputs = []) {
  code = sanitizeCode(code);
  let output = '';
  let hasError = false;
  let errorLine = null;  // số dòng lỗi chính xác
  let errorType = null;  // loại lỗi
  let inputIdx = 0;
  try {
    const toks = PyInterp.tokenize(code);
    const parser = new PyInterp.Parser(toks);
    const ast = parser.parse();
    const interp = new PyInterp.Interp(
      (text) => { output += text; },
      (prompt) => { if (inputIdx < inputs.length) return inputs[inputIdx++]; return '0'; }
    );
    const r = interp.run(ast);
    if (r && r.e) {
      hasError = true;
      errorLine = r.e.ln || null;
      errorType = r.e.et || null;
      output += r.e.toString();
    } else if (r && r.constructor && r.constructor.name === 'RetSig') {
      hasError = true;
      errorType = 'SyntaxError';
      output += "SyntaxError: 'return' outside function";
    }
  } catch(e) {
    hasError = true;
    if (e instanceof PyInterp.PyErr) {
      errorLine = e.ln || null;
      errorType = e.et || null;
      output += e.toString();
    } else {
      output += 'RuntimeError: ' + (e.message || String(e));
    }
  }
  return { output: output.trim(), error: hasError, errorLine, errorType };
}

function runTestCases(exId, code) {
  const tests = EXERCISE_TESTS[exId];
  if (!tests || !tests.length) return null;
  const results = [];
  let passed = 0;
  tests.forEach(t => {
    const res = runSilent(code, t.i || []);
    // Normalize: collapse whitespace, trim, lowercase for comparison
    const normalizeOut = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
    const outNorm = normalizeOut(res.output);
    const expected = (t.e || '').toLowerCase().trim();

    // Numeric tolerance: nếu expected là số, so sánh với sai số 0.01
    // Tránh lỗi float như 135.91999999 thay vì 135.92
    let pass = false;
    if (!res.error && expected) {
      const numExp = parseFloat(expected);
      if (!isNaN(numExp) && /^-?[\d.]+$/.test(expected)) {
        // Tìm số đầu tiên trong output khớp với expected (tolerance 0.01)
        const numMatches = outNorm.match(/-?[\d]+(?:\.[\d]+)?/g) || [];
        pass = numMatches.some(m => Math.abs(parseFloat(m) - numExp) < 0.01);
      } else {
        // String matching: output phải chứa expected
        pass = outNorm.includes(expected);
      }
    }

    if (pass) passed++;
    results.push({
      desc: t.d, inputs: t.i || [], expected: t.e || '',
      actual: res.output, pass, error: res.error,
      errorLine: res.errorLine,   // số dòng lỗi chính xác từ PyErr.ln
      errorType: res.errorType    // loại lỗi
    });
  });
  return { results, passed, total: tests.length, score: Math.round((passed / tests.length) * 100) };
}

// Override runCode to use better version
async function runCode() {
  const code = ci.value.trim();
  if (!code) { toast('⚠ Vui lòng nhập code Python'); return; }
  clearOut();
  await runCode_v2(code);
}

// ─── Grade code ─────────────────────────────────────────────
let rubric = [];
let ridCtr = 0;

let currentExId = '';


// ════════════════════════════════════════════════════════════════

// ─── js/features/setup-wizard.js ───────────────────────────
/**
 * features/setup-wizard.js — First-Time Setup Wizard
 * ═══════════════════════════════════════════════════════════════
 * Wizard 5 bước hướng dẫn thiết lập lần đầu:
 *   1. Tạo Google Sheet
 *   2. Dán Code.gs
 *   3. Deploy + dán URL
 *   4. Auto-setup (tạo Drive folder + 5 Sheets)
 *   5. Hoàn tất
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, data/http.js, api.js
 */

'use strict';

CL.define('Features.Setup', () => {

  const cfg   = CL.require('Config');
  const Utils = CL.require('Utils');

  let _overlay = null;
  let _step    = 1;

  // ── Public API ────────────────────────────────────────────────

  function show() {
    if (_overlay) return;
    _overlay = document.createElement('div');
    _overlay.id = 'setup-overlay';
    document.body.appendChild(_overlay);
    requestAnimationFrame(() => _overlay.classList.add('show'));
    _renderStep(1);
  }

  function hide() {
    if (!_overlay) return;
    _overlay.classList.remove('show');
    setTimeout(() => { _overlay?.remove(); _overlay = null; }, 400);
  }

  async function checkAndShow() {
    // Chỉ hiện 1 lần — dùng flag localStorage để không popup lại
    if (localStorage.getItem('cl_setup_dismissed')) return;
    const url = (cfg.DEPLOY_URL && cfg.DEPLOY_URL.startsWith('http'))
      ? cfg.DEPLOY_URL : localStorage.getItem(cfg.LS.SCRIPT_URL);
    if (!url) return;
    try {
      const res  = await fetch(`${url}?action=getSetupStatus`);
      const data = await res.json();
      if (data.ok && !data.data?.done) { _step = 4; show(); }
    } catch {}
  }

  function dismiss() {
    localStorage.setItem('cl_setup_dismissed', '1');
    hide();
  }

  // ── Step rendering ────────────────────────────────────────────

  function _renderStep(n) {
    _step = n;
    _overlay.innerHTML = `
      <div class="sw-card">
        <div class="sw-header">
          <div class="sw-logo">🖥️</div>
          <div class="sw-title">${cfg.APP_NAME} — Thiết lập lần đầu</div>
          <div class="sw-steps">
            ${[1,2,3,4,5].map(i =>
              `<div class="sw-step-dot ${i<n?'done':i===n?'active':''}">${i<n?'✓':i}</div>`
            ).join('')}
          </div>
        </div>
        <div class="sw-body">${_stepBody(n)}</div>
        <div class="sw-footer">${_stepFooter(n)}</div>
      </div>`;
  }

  function _stepBody(n) {
    switch (n) {
      case 1: return `
        <div class="sw-step-title">Bước 1 — Tạo Google Sheet</div>
        <div class="sw-desc">Chỉ cần tạo <b>1 file Google Sheet</b> — hệ thống tự tạo toàn bộ còn lại.</div>
        <div class="sw-steps-visual">
          ${_swStep(1, `Vào <a href="https://sheets.google.com" target="_blank">sheets.google.com</a> → Tạo bảng tính mới`)}
          ${_swStep(2, `Đặt tên: <code>${cfg.APP_NAME}_Script</code>`)}
          ${_swStep(3, '<b>Extensions → Apps Script</b> → Mở editor')}
        </div>
        <div class="sw-note">💡 File này chỉ chứa script. Dữ liệu thực tự tạo trong <b>📁 ${cfg.DRIVE.FOLDER_NAME}/</b></div>`;

      case 2: return `
        <div class="sw-step-title">Bước 2 — Dán Code.gs</div>
        <div class="sw-desc">Xóa code cũ trong Apps Script editor và dán code backend vào.</div>
        <div class="sw-steps-visual">
          ${_swStep(1, 'Chọn tất cả code cũ → Xóa')}
          ${_swStep(2, 'Tải về <a href="Code.gs" download>Code.gs</a> → Dán vào editor')}
          ${_swStep(3, 'Nhấn <b>Ctrl+S</b> để lưu')}
        </div>
        <div class="sw-code-preview">
          <div class="scp-header">Code.gs — preview</div>
          <pre>/**
 * ${cfg.APP_NAME} — Apps Script Backend v${cfg.APP_VERSION}
 * Deploy: Web App → Execute as: Me → Anyone
 */
const DB_IDS = { TAIKHOAN:'', BAITAP:'', ... };</pre>
        </div>`;

      case 3: return `
        <div class="sw-step-title">Bước 3 — Deploy Web App</div>
        <div class="sw-desc">Tạo URL để app kết nối với Google Sheets.</div>
        <div class="sw-steps-visual">
          ${_swStep(1, '<b>Deploy → New deployment</b>')}
          ${_swStep(2, 'Type: <b>Web app</b>')}
          ${_swStep(3, '<b>Execute as: Me</b> · <b>Who has access: Anyone</b>')}
          ${_swStep(4, 'Deploy → Copy URL (bắt đầu bằng <code>https://script.google.com/...</code>)')}
        </div>
        <div class="sw-field">
          <label>Dán Web App URL:</label>
          <input id="sw-url" type="url" value="${Utils.escHtml(localStorage.getItem(cfg.LS.SCRIPT_URL)||'')}"
            placeholder="https://script.google.com/macros/s/.../exec">
          <div id="sw-url-status" style="font-size:11px;margin-top:4px;min-height:14px"></div>
        </div>`;

      case 4: return `
        <div class="sw-step-title">Bước 4 — Tạo cấu trúc dữ liệu</div>
        <div class="sw-desc">Hệ thống tự tạo toàn bộ folder và files trong Google Drive của bạn.</div>
        <div class="sw-folder-tree">
          <div class="sft-item folder">📁 ${cfg.DRIVE.FOLDER_NAME}/ <span class="sft-new">sẽ được tạo</span></div>
          <div class="sft-item">  └─ 📊 01_TaiKhoan.gsheet <span class="sft-tabs">GiaoVien, HocSinh</span></div>
          <div class="sft-item">  ├─ 📊 02_BaiTap.gsheet <span class="sft-tabs">BaiTap, LyThuyet, CodeMau, TieuChi, HuongDan</span></div>
          <div class="sft-item">  ├─ 📊 03_KiemTra.gsheet <span class="sft-tabs">DanhSach, BaiTapKT</span></div>
          <div class="sft-item">  ├─ 📊 04_KetQua.gsheet <span class="sft-tabs">BangDiem, LichSuLam</span></div>
          <div class="sft-item">  └─ 📊 05_NhatKy.gsheet <span class="sft-tabs">TruyCap, ViPham</span></div>
        </div>
        <div class="sw-admin-form">
          <div class="sw-field-row">
            <div class="sw-field"><label>Tài khoản GV admin</label>
              <input id="sw-user" type="text" placeholder="vd: giaovien" value=""></div>
            <div class="sw-field"><label>Mật khẩu (≥6 ký tự)</label>
              <input id="sw-pwd" type="password" placeholder="Nhập mật khẩu" value=""></div>
          </div>
          <div class="sw-field"><label>Họ tên giáo viên</label>
            <input id="sw-name" type="text" placeholder="Nguyễn Văn A"></div>
          <div class="sw-field"><label>Email</label>
            <input id="sw-email" type="email" placeholder="giaovien@truong.edu.vn"></div>
        </div>
        <div id="sw-setup-log" class="sw-log" style="display:none"></div>`;

      case 5: return `
        <div class="sw-step-title">✅ Cài đặt hoàn tất!</div>
        <div class="sw-success-icon">🎉</div>
        <div class="sw-desc">Hệ thống đã sẵn sàng. Đăng nhập bằng tài khoản GV vừa tạo.</div>
        <div class="sw-result-grid" id="sw-result-grid"></div>
        <div class="sw-next-steps">
          <div class="sns-title">Bước tiếp theo:</div>
          <div class="sns-item">1. Đăng nhập tài khoản Giáo viên</div>
          <div class="sns-item">2. Vào ⚙️ → Bài tập → <b>🔄 Sync lên Sheets</b> (918 bài tập)</div>
          <div class="sns-item">3. Thêm học sinh vào tab HocSinh trong Google Sheets</div>
          <div class="sns-item">4. Tạo kỳ kiểm tra trong ⚙️ → Kiểm tra</div>
        </div>`;

      default: return '';
    }
  }

  function _swStep(n, text) {
    return `<div class="swv-step"><div class="swv-num">${n}</div><div class="swv-text">${text}</div></div>`;
  }

  function _stepFooter(n) {
    const back = `<button class="sw-btn-back" onclick="CL.Features.Setup._back()">← Quay lại</button>`;
    const next = (label, fn) => `<button class="sw-btn-next" onclick="CL.Features.Setup.${fn}()">${label}</button>`;
    const primary = (label, fn) => `<button class="sw-btn-primary" id="sw-primary" onclick="CL.Features.Setup.${fn}()">${label}</button>`;
    switch (n) {
      case 1: return next('Tiếp theo →', '_next');
      case 2: return `${back}${next('Đã dán code →', '_next')}`;
      case 3: return `${back}${next('Kiểm tra kết nối →', '_testUrl')}`;
      case 4: return `${back}${primary('🚀 Bắt đầu cài đặt', '_runSetup')}<button class="sw-btn-skip" onclick="CL.Features.Setup.dismiss()">Bỏ qua</button>`;
      case 5: return primary('Bắt đầu sử dụng 🎓', 'hide');
      default: return '';
    }
  }

  // ── Step actions ──────────────────────────────────────────────

  function _next() { _renderStep(_step + 1); }
  function _back() { _renderStep(_step - 1); }

  async function _testUrl() {
    const input  = document.getElementById('sw-url');
    const status = document.getElementById('sw-url-status');
    const url    = (input?.value || '').trim();
    if (!url) { status.textContent = '⚠️ Vui lòng nhập URL'; return; }
    status.textContent = '⏳ Đang kiểm tra...';
    localStorage.setItem(cfg.LS.SCRIPT_URL, url);
    const r = await CL.API.ping();
    if (r.ok) {
      status.textContent = `✅ Kết nối thành công! (${r.latency}ms)`;
      status.style.color = 'var(--accent2)';
      setTimeout(() => _renderStep(4), 1000);
    } else {
      status.textContent = '❌ ' + r.error;
      status.style.color = 'var(--error)';
    }
  }

  async function _runSetup() {
    const btn = document.getElementById('sw-primary');
    const log = document.getElementById('sw-setup-log');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang cài đặt...'; }
    if (log) { log.style.display = 'block'; log.textContent = '🔄 Đang tạo cấu trúc Google Drive...\n'; }

    try {
      const data = await CL.API.autoSetup({
        admin_username: document.getElementById('sw-user')?.value?.trim()  || 'giaovien',
        admin_password: document.getElementById('sw-pwd')?.value?.trim()   || '',
        admin_name:     document.getElementById('sw-name')?.value?.trim()  || 'Giáo viên',
        admin_email:    document.getElementById('sw-email')?.value?.trim() || '',
        force: true,   // Cho phép chạy lại nếu đã setup trước đó
      });
      if (log) { log.textContent = (data.log || []).join('\n'); }
      // already_done = đã setup rồi → vẫn coi là thành công
      if (data.success || data.already_done) {
        if (data.already_done && log) log.textContent = '✅ Hệ thống đã được cài đặt trước đó.';
        _renderStep(5);
        const grid = document.getElementById('sw-result-grid');
        if (grid && data.sheet_ids) {
          const names = { TAIKHOAN:'01_TaiKhoan', BAITAP:'02_BaiTap', KIEMTRA:'03_KiemTra', KETQUA:'04_KetQua', NHATKY:'05_NhatKy' };
          grid.innerHTML = Object.entries(data.sheet_ids).map(([k, id]) =>
            `<div class="srg-item">
               <span class="srg-name">📊 ${names[k]||k}</span>
               <a href="https://docs.google.com/spreadsheets/d/${id}/edit" target="_blank" class="srg-link">Mở Sheet ↗</a>
             </div>`
          ).join('');
        }
      } else {
        if (btn) { btn.disabled = false; btn.textContent = '🔄 Thử lại'; }
        if (log) log.textContent += '\n\n❌ Cài đặt thất bại: ' + (data.error || 'Không rõ lỗi');
      }
    } catch (e) {
      if (btn) { btn.disabled = false; btn.textContent = '🔄 Thử lại'; }
      if (log) log.textContent += '\n\n❌ Lỗi: ' + e.message;
    }
  }

  // Backward compat
  window.SetupWizard = { show, hide, checkAndShow, dismiss, _next, _back, _testUrl, _runSetup };

  return { show, hide, checkAndShow, dismiss, _next, _back, _testUrl, _runSetup };
});

// ─── js/sheets-loader.js ───────────────────────────
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

// ─── js/editors/richtext.js ───────────────────────────
/**
 * editors/richtext.js — Rich Text Editor (Canvas LMS style)
 * ═══════════════════════════════════════════════════════════════
 * Powered by Quill 2 + quill-better-table + KaTeX
 *
 * Features:
 *   - Canvas LMS-style 2-row toolbar
 *   - Tables (quill-better-table)
 *   - Math formulas $$...$$ (KaTeX, lazy-loaded)
 *   - Code blocks with syntax hint
 *   - Drag-drop + paste image → upload to Google Drive
 *   - Image by URL dialog
 *   - HTML source toggle </> 
 *   - Vietnamese unicode, Ctrl+S save
 *
 * Output: clean HTML string, rendered by student browser
 *         + KaTeX auto-render for $$...$$ blocks
 *
 * API:
 *   CL.Editors.RichText.mount(containerId, initialHtml, onSave)
 *   CL.Editors.RichText.unmount(containerId)
 *   CL.Editors.RichText.getHtml(containerId)
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Editors.RichText', () => {

  const Utils = CL.require('Utils');

  // ── CDN urls ─────────────────────────────────────────────────
  const CDN = {
    quillCss:  'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css',
    quillJs:   'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js',
    tableCss:  'https://cdn.jsdelivr.net/npm/quill-better-table@1.2.10/dist/quill-better-table.min.css',
    tableJs:   'https://cdn.jsdelivr.net/npm/quill-better-table@1.2.10/dist/quill-better-table.min.js',
    katexCss:  'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
    katexJs:   'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
    katexAuto: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js',
  };

  let _quillReady = false;
  let _katexReady = false;
  const _instances = {};  // containerId → { quill, wrapper, showingSource }

  // ══════════════════════════════════════════════════════════════
  //  LOADERS
  // ══════════════════════════════════════════════════════════════

  function _loadCss(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const el = Object.assign(document.createElement('link'), { rel: 'stylesheet', href });
    document.head.appendChild(el);
  }

  function _loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = () => reject(new Error('Không thể tải: ' + src));
      document.head.appendChild(s);
    });
  }

  async function _loadQuill() {
    if (_quillReady && typeof Quill !== 'undefined') return;
    _loadCss(CDN.quillCss);
    _loadCss(CDN.tableCss);
    await _loadScript(CDN.quillJs);
    await _loadScript(CDN.tableJs);
    // Register quill-better-table
    if (typeof QuillBetterTable !== 'undefined') {
      Quill.register({ 'modules/better-table': QuillBetterTable }, true);
    }
    _quillReady = true;
  }

  async function _loadKatex() {
    if (_katexReady && typeof katex !== 'undefined') return;
    _loadCss(CDN.katexCss);
    await _loadScript(CDN.katexJs);
    await _loadScript(CDN.katexAuto);
    _katexReady = true;
  }

  // ══════════════════════════════════════════════════════════════
  //  TOOLBAR CONFIG (Canvas LMS style — 2 rows)
  // ══════════════════════════════════════════════════════════════

  const TOOLBAR = [
    // Row 1: text format
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['clean'],
    // Row 2: blocks + media
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ align: [] }],
  ];

  // ══════════════════════════════════════════════════════════════
  //  MOUNT
  // ══════════════════════════════════════════════════════════════

  async function mount(containerId, initialHtml, onSave) {
    await _loadQuill();

    const container = document.getElementById(containerId);
    if (!container) throw new Error(`#${containerId} không tìm thấy`);

    unmount(containerId);

    // ── Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'rte-wrapper';
    wrapper.id = `rte-wrap-${containerId}`;

    // ── Upload progress bar (hidden)
    const uploadBar = document.createElement('div');
    uploadBar.className = 'rte-upload-bar';
    uploadBar.id = `rte-ubar-${containerId}`;
    uploadBar.innerHTML = `<div class="rte-upload-inner" id="rte-uinner-${containerId}"></div>`;

    // ── Quill container
    const editorDiv = document.createElement('div');
    editorDiv.id = `rte-ql-${containerId}`;
    editorDiv.className = 'rte-editor-area';

    // ── HTML source textarea
    const srcArea = document.createElement('textarea');
    srcArea.id = `rte-src-${containerId}`;
    srcArea.className = 'rte-source-area';
    srcArea.placeholder = '<!-- Dán hoặc gõ HTML tại đây -->';
    srcArea.spellcheck = false;

    // ── Bottom actions bar
    const actBar = document.createElement('div');
    actBar.className = 'rte-actions';
    actBar.innerHTML = `
      <div class="rte-actions-left">
        <button class="rte-btn rte-btn-icon" id="rte-toggle-${containerId}"
          title="Xem/chỉnh HTML nguồn">&lt;/&gt;</button>
        <button class="rte-btn rte-btn-icon" id="rte-math-${containerId}"
          title="Chèn công thức toán (LaTeX)">∑</button>
        <button class="rte-btn rte-btn-icon" id="rte-table-${containerId}"
          title="Chèn bảng">⊞</button>
        <button class="rte-btn rte-btn-icon" id="rte-img-${containerId}"
          title="Chèn ảnh từ URL hoặc upload">🖼</button>
      </div>
      <div class="rte-actions-right">
        <span class="rte-hint">Ctrl+S lưu · Kéo thả ảnh để upload</span>
        <button class="rte-btn" id="rte-cancel-${containerId}">Hủy</button>
        <button class="rte-btn rte-btn-primary" id="rte-save-${containerId}">💾 Lưu</button>
      </div>`;

    wrapper.appendChild(uploadBar);
    wrapper.appendChild(editorDiv);
    wrapper.appendChild(srcArea);
    wrapper.appendChild(actBar);

    container.style.display = 'none';
    container.parentNode.insertBefore(wrapper, container.nextSibling);

    // ── Init Quill
    const tableModule = typeof QuillBetterTable !== 'undefined'
      ? { 'better-table': { operationMenu: { items: {
            insertColumnRight: { text: 'Thêm cột phải' },
            insertColumnLeft:  { text: 'Thêm cột trái' },
            insertRowUp:       { text: 'Thêm hàng trên' },
            insertRowDown:     { text: 'Thêm hàng dưới' },
            mergeCells:        { text: 'Gộp ô' },
            unmergeCells:      { text: 'Bỏ gộp' },
            deleteColumn:      { text: 'Xóa cột' },
            deleteRow:         { text: 'Xóa hàng' },
            deleteTable:       { text: 'Xóa bảng' },
          }}} }
      : {};

    const quill = new Quill(`#rte-ql-${containerId}`, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR,
          handlers: {
            image: () => _showImageDialog(containerId, quill),
          },
        },
        ...tableModule,
        history: { delay: 1000, maxStack: 100 },
      },
      placeholder: 'Soạn nội dung đề bài / lý thuyết...',
    });

    // Set initial content
    if (initialHtml) {
      quill.root.innerHTML = initialHtml;
    }

    _instances[containerId] = { quill, wrapper, showingSource: false };

    // ── Event handlers

    // Save
    const doSave = async () => {
      const html = getHtml(containerId);
      const btn  = document.getElementById(`rte-save-${containerId}`);
      if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang lưu...'; }
      try {
        if (onSave) await onSave(html);
        // Update display
        container.innerHTML = html || '<div class="criteria-empty"><div class="ci-icon">📝</div><div>Chưa có nội dung.</div></div>';
        // Render math in saved content
        _renderMath(container);
      } catch(e) {
        alert('Lỗi lưu: ' + e.message);
        if (btn) { btn.disabled = false; btn.textContent = '💾 Lưu'; }
        return;
      }
      unmount(containerId);
      container.style.display = '';
    };

    document.getElementById(`rte-save-${containerId}`)?.addEventListener('click', doSave);
    document.getElementById(`rte-cancel-${containerId}`)?.addEventListener('click', () => {
      unmount(containerId);
      container.style.display = '';
    });

    // Ctrl+S
    quill.root.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); doSave(); }
    });

    // HTML source toggle
    document.getElementById(`rte-toggle-${containerId}`)?.addEventListener('click', () => {
      _toggleSource(containerId);
    });

    // Math insert
    document.getElementById(`rte-math-${containerId}`)?.addEventListener('click', () => {
      _showMathDialog(containerId, quill);
    });

    // Table insert
    document.getElementById(`rte-table-${containerId}`)?.addEventListener('click', () => {
      _showTableDialog(containerId, quill);
    });

    // Image insert
    document.getElementById(`rte-img-${containerId}`)?.addEventListener('click', () => {
      _showImageDialog(containerId, quill);
    });

    // Drag-drop image onto editor
    quill.root.addEventListener('dragover', e => e.preventDefault());
    quill.root.addEventListener('drop', e => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files?.length) _handleImageFiles(containerId, quill, files);
    });

    // Paste image
    quill.root.addEventListener('paste', e => {
      const items = e.clipboardData?.items || [];
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) _handleImageFiles(containerId, quill, [file]);
          break;
        }
      }
    });

    setTimeout(() => quill.focus(), 100);
  }

  // ══════════════════════════════════════════════════════════════
  //  HTML SOURCE TOGGLE
  // ══════════════════════════════════════════════════════════════

  function _toggleSource(containerId) {
    const inst    = _instances[containerId];
    if (!inst) return;
    const srcEl   = document.getElementById(`rte-src-${containerId}`);
    const togBtn  = document.getElementById(`rte-toggle-${containerId}`);
    const qlWrap  = inst.wrapper.querySelector('.ql-container');
    const qlBar   = inst.wrapper.querySelector('.ql-toolbar');

    if (!inst.showingSource) {
      // → HTML source
      const html = inst.quill.root.innerHTML;
      srcEl.value = _prettyHtml(html === '<p><br></p>' ? '' : html);
      srcEl.style.display = 'block';
      if (qlWrap) qlWrap.style.display = 'none';
      if (qlBar)  qlBar.style.display  = 'none';
      if (togBtn) { togBtn.textContent = '✏️'; togBtn.title = 'Quay lại WYSIWYG'; togBtn.classList.add('on'); }
      srcEl.focus();
      inst.showingSource = true;
    } else {
      // → WYSIWYG
      inst.quill.root.innerHTML = srcEl.value.trim() || '<p><br></p>';
      srcEl.style.display = 'none';
      if (qlWrap) qlWrap.style.display = '';
      if (qlBar)  qlBar.style.display  = '';
      if (togBtn) { togBtn.innerHTML = '&lt;/&gt;'; togBtn.title = 'Xem/chỉnh HTML nguồn'; togBtn.classList.remove('on'); }
      inst.quill.focus();
      inst.showingSource = false;
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  MATH DIALOG
  // ══════════════════════════════════════════════════════════════

  function _showMathDialog(containerId, quill) {
    _removeDialog(containerId);
    const d = document.createElement('div');
    d.className = 'rte-dialog';
    d.id = `rte-dlg-${containerId}`;
    d.innerHTML = `
      <div class="rte-dlg-card">
        <div class="rte-dlg-title">∑ Chèn công thức LaTeX</div>
        <div class="rte-dlg-body">
          <label class="rte-dlg-label">Công thức LaTeX</label>
          <input id="rte-math-input-${containerId}" class="rte-dlg-input rte-mono"
            placeholder="Ví dụ: x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" autocomplete="off">
          <div class="rte-math-preview" id="rte-math-prev-${containerId}">
            Xem trước công thức ở đây...
          </div>
          <div class="rte-dlg-hint">
            Inline: <code>$x^2$</code> &nbsp;·&nbsp;
            Block: <code>$$\\sum_{i=1}^n$$</code> &nbsp;·&nbsp;
            <a href="https://katex.org/docs/supported.html" target="_blank">Tham khảo KaTeX</a>
          </div>
        </div>
        <div class="rte-dlg-footer">
          <button class="rte-btn" id="rte-dlg-cancel-${containerId}">Hủy</button>
          <button class="rte-btn rte-btn-primary" id="rte-dlg-ok-${containerId}">Chèn</button>
        </div>
      </div>`;

    document.body.appendChild(d);

    const input   = document.getElementById(`rte-math-input-${containerId}`);
    const preview = document.getElementById(`rte-math-prev-${containerId}`);

    // Live preview
    let _previewTimer;
    input.addEventListener('input', () => {
      clearTimeout(_previewTimer);
      _previewTimer = setTimeout(async () => {
        const tex = input.value.trim();
        if (!tex) { preview.textContent = 'Xem trước công thức ở đây...'; return; }
        try {
          await _loadKatex();
          preview.innerHTML = '';
          katex.render(tex, preview, { displayMode: true, throwOnError: false });
        } catch(e) {
          preview.textContent = '⚠️ ' + e.message;
        }
      }, 300);
    });

    document.getElementById(`rte-dlg-ok-${containerId}`)?.addEventListener('click', async () => {
      const tex = input.value.trim();
      if (!tex) return;
      // Insert as $$...$$ block (will be rendered by KaTeX auto-render)
      const range = quill.getSelection(true);
      quill.insertText(range.index, `$$${tex}$$`, 'user');
      quill.setSelection(range.index + tex.length + 4);
      _removeDialog(containerId);
    });

    document.getElementById(`rte-dlg-cancel-${containerId}`)?.addEventListener('click', () => {
      _removeDialog(containerId);
    });

    setTimeout(() => input.focus(), 50);
  }

  // ══════════════════════════════════════════════════════════════
  //  TABLE DIALOG
  // ══════════════════════════════════════════════════════════════

  function _showTableDialog(containerId, quill) {
    _removeDialog(containerId);

    // If quill-better-table is available, use its API
    const tblModule = quill.getModule('better-table');
    if (tblModule) {
      const d = document.createElement('div');
      d.className = 'rte-dialog';
      d.id = `rte-dlg-${containerId}`;
      d.innerHTML = `
        <div class="rte-dlg-card" style="width:260px">
          <div class="rte-dlg-title">⊞ Chèn bảng</div>
          <div class="rte-dlg-body" style="display:flex;gap:12px;align-items:center">
            <label class="rte-dlg-label" style="white-space:nowrap">Hàng:</label>
            <input id="rte-rows-${containerId}" class="rte-dlg-input" type="number" value="3" min="1" max="20" style="width:64px">
            <label class="rte-dlg-label" style="white-space:nowrap">Cột:</label>
            <input id="rte-cols-${containerId}" class="rte-dlg-input" type="number" value="3" min="1" max="10" style="width:64px">
          </div>
          <div class="rte-dlg-footer">
            <button class="rte-btn" id="rte-dlg-cancel-${containerId}">Hủy</button>
            <button class="rte-btn rte-btn-primary" id="rte-dlg-ok-${containerId}">Chèn</button>
          </div>
        </div>`;
      document.body.appendChild(d);

      document.getElementById(`rte-dlg-ok-${containerId}`)?.addEventListener('click', () => {
        const rows = parseInt(document.getElementById(`rte-rows-${containerId}`)?.value) || 3;
        const cols = parseInt(document.getElementById(`rte-cols-${containerId}`)?.value) || 3;
        tblModule.insertTable(rows, cols);
        _removeDialog(containerId);
      });

      document.getElementById(`rte-dlg-cancel-${containerId}`)?.addEventListener('click', () => {
        _removeDialog(containerId);
      });
      return;
    }

    // Fallback: insert basic HTML table via source
    const range = quill.getSelection(true);
    const html  = `<table border="1" style="border-collapse:collapse;width:100%"><thead><tr><th>Tiêu đề 1</th><th>Tiêu đề 2</th><th>Tiêu đề 3</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p></p>`;
    quill.clipboard.dangerouslyPasteHTML(range.index, html);
  }

  // ══════════════════════════════════════════════════════════════
  //  IMAGE DIALOG
  // ══════════════════════════════════════════════════════════════

  function _showImageDialog(containerId, quill) {
    _removeDialog(containerId);
    const d = document.createElement('div');
    d.className = 'rte-dialog';
    d.id = `rte-dlg-${containerId}`;
    d.innerHTML = `
      <div class="rte-dlg-card">
        <div class="rte-dlg-title">🖼 Chèn ảnh</div>
        <div class="rte-dlg-body">
          <div class="rte-img-tabs">
            <button class="rte-img-tab on" id="rte-itab-url-${containerId}" onclick="_rteImgTab('${containerId}','url')">📎 URL</button>
            <button class="rte-img-tab" id="rte-itab-file-${containerId}" onclick="_rteImgTab('${containerId}','file')">☁️ Upload</button>
          </div>
          <div id="rte-iurl-${containerId}">
            <label class="rte-dlg-label">URL ảnh</label>
            <input id="rte-img-url-${containerId}" class="rte-dlg-input"
              placeholder="https://..." autocomplete="off">
            <div style="margin-top:6px;text-align:center">
              <img id="rte-img-preview-${containerId}" style="max-width:100%;max-height:120px;display:none;border-radius:4px;border:1px solid var(--border)">
            </div>
          </div>
          <div id="rte-ifile-${containerId}" style="display:none">
            <label class="rte-dlg-label">Chọn file ảnh (max 2MB)</label>
            <div class="rte-dropzone" id="rte-dz-${containerId}">
              📁 Kéo thả file vào đây hoặc <b>click để chọn</b>
              <input type="file" id="rte-file-${containerId}" accept="image/*" style="display:none">
            </div>
            <div class="rte-upload-status" id="rte-ustatus-${containerId}"></div>
          </div>
        </div>
        <div class="rte-dlg-footer">
          <button class="rte-btn" id="rte-dlg-cancel-${containerId}">Hủy</button>
          <button class="rte-btn rte-btn-primary" id="rte-dlg-ok-${containerId}">Chèn</button>
        </div>
      </div>`;

    document.body.appendChild(d);

    // URL preview
    const urlInput = document.getElementById(`rte-img-url-${containerId}`);
    const preview  = document.getElementById(`rte-img-preview-${containerId}`);
    urlInput?.addEventListener('input', () => {
      const v = urlInput.value.trim();
      if (v && (v.startsWith('http') || v.startsWith('/'))) {
        preview.src = v; preview.style.display = 'block';
        preview.onerror = () => { preview.style.display = 'none'; };
      } else {
        preview.style.display = 'none';
      }
    });

    // File input
    const dz      = document.getElementById(`rte-dz-${containerId}`);
    const fileInp = document.getElementById(`rte-file-${containerId}`);
    dz?.addEventListener('click', () => fileInp?.click());
    dz?.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag'); });
    dz?.addEventListener('dragleave', () => dz.classList.remove('drag'));
    dz?.addEventListener('drop', e => {
      e.preventDefault(); dz.classList.remove('drag');
      const files = e.dataTransfer?.files;
      if (files?.length) _uploadFileForDialog(containerId, files[0]);
    });
    fileInp?.addEventListener('change', () => {
      if (fileInp.files?.length) _uploadFileForDialog(containerId, fileInp.files[0]);
    });

    // Insert
    document.getElementById(`rte-dlg-ok-${containerId}`)?.addEventListener('click', () => {
      const inst = _instances[containerId];
      if (!inst) return;
      const url = urlInput?.value.trim() || inst._uploadedUrl;
      if (!url) return;
      const range = inst.quill.getSelection(true);
      inst.quill.insertEmbed(range.index, 'image', url, 'user');
      inst.quill.setSelection(range.index + 1);
      _removeDialog(containerId);
    });

    document.getElementById(`rte-dlg-cancel-${containerId}`)?.addEventListener('click', () => {
      _removeDialog(containerId);
    });

    setTimeout(() => urlInput?.focus(), 50);
  }

  // Tab switcher for image dialog (exposed globally)
  window._rteImgTab = function(cid, tab) {
    const urlDiv  = document.getElementById(`rte-iurl-${cid}`);
    const fileDiv = document.getElementById(`rte-ifile-${cid}`);
    const tabUrl  = document.getElementById(`rte-itab-url-${cid}`);
    const tabFile = document.getElementById(`rte-itab-file-${cid}`);
    if (tab === 'url') {
      if (urlDiv)  urlDiv.style.display  = '';
      if (fileDiv) fileDiv.style.display = 'none';
      tabUrl?.classList.add('on');  tabFile?.classList.remove('on');
    } else {
      if (urlDiv)  urlDiv.style.display  = 'none';
      if (fileDiv) fileDiv.style.display = '';
      tabUrl?.classList.remove('on'); tabFile?.classList.add('on');
    }
  };

  async function _uploadFileForDialog(containerId, file) {
    const statusEl = document.getElementById(`rte-ustatus-${containerId}`);
    const inst     = _instances[containerId];
    if (!inst || !file) return;

    if (file.size > 2 * 1024 * 1024) {
      if (statusEl) statusEl.innerHTML = '<span style="color:var(--error)">❌ File quá lớn (max 2MB)</span>';
      return;
    }

    if (statusEl) statusEl.innerHTML = '⏳ Đang upload...';

    try {
      const url = await _uploadImage(file);
      inst._uploadedUrl = url;
      if (statusEl) statusEl.innerHTML = `✅ Upload thành công! <img src="${url}" style="max-height:60px;display:block;margin-top:4px;border-radius:4px">`;
    } catch(e) {
      if (statusEl) statusEl.innerHTML = `<span style="color:var(--error)">❌ ${e.message}</span>`;
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  IMAGE UPLOAD → Google Drive via Apps Script
  // ══════════════════════════════════════════════════════════════

  async function _handleImageFiles(containerId, quill, files) {
    const barEl   = document.getElementById(`rte-ubar-${containerId}`);
    const innerEl = document.getElementById(`rte-uinner-${containerId}`);

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 2 * 1024 * 1024) {
        CL.UI?.Toast?.warn('⚠️ Ảnh quá lớn (tối đa 2MB)');
        continue;
      }
      try {
        if (barEl) { barEl.style.display = 'block'; if (innerEl) innerEl.style.width = '0%'; }
        // Animate progress
        let prog = 0;
        const tick = setInterval(() => {
          prog = Math.min(prog + 15, 85);
          if (innerEl) innerEl.style.width = prog + '%';
        }, 200);

        const url = await _uploadImage(file);

        clearInterval(tick);
        if (innerEl) innerEl.style.width = '100%';
        setTimeout(() => { if (barEl) barEl.style.display = 'none'; }, 600);

        // Insert image at cursor
        const range = quill.getSelection(true);
        quill.insertEmbed(range?.index ?? quill.getLength(), 'image', url, 'user');
        quill.setSelection((range?.index ?? 0) + 1);

      } catch(e) {
        if (barEl) barEl.style.display = 'none';
        CL.UI?.Toast?.error('❌ Upload thất bại: ' + e.message);
      }
    }
  }

  async function _uploadImage(file) {
    const url = localStorage.getItem('cl_script_url');

    // If no server configured, fall back to base64 data URL (for offline/demo)
    if (!url) {
      return await _toDataUrl(file);
    }

    const base64 = await _toBase64(file);
    const token  = CL.Auth?.Session?.getToken?.() || '';

    const Http = CL.require('Data.Http');
    const resp = await Http.post(url, {
      action:   'uploadImage',
      token,
      base64,
      filename: file.name || 'image.png',
      mimeType: file.type || 'image/png',
    });

    if (!resp?.url) throw new Error(resp?.error || 'Upload không trả về URL');
    return resp.url;
  }

  function _toBase64(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload  = () => resolve(r.result.split(',')[1]);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  function _toDataUrl(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload  = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  KATEX RENDER (for student view)
  // ══════════════════════════════════════════════════════════════

  async function renderMath(el) {
    if (!el) return;
    await _loadKatex();
    if (typeof renderMathInElement !== 'undefined') {
      renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$',  right: '$',  display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true  },
        ],
        throwOnError: false,
        errorColor:   '#cc0000',
      });
    }
  }

  function _renderMath(el) {
    // Non-blocking: try to render math, ignore if KaTeX not loaded
    if (typeof renderMathInElement !== 'undefined' && typeof katex !== 'undefined') {
      try {
        renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true  },
            { left: '$',  right: '$',  display: false },
          ],
          throwOnError: false,
        });
      } catch(e) {}
    } else {
      // Lazy load then render
      renderMath(el).catch(() => {});
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  UNMOUNT / GET HTML
  // ══════════════════════════════════════════════════════════════

  function unmount(containerId) {
    const inst = _instances[containerId];
    if (inst) { inst.wrapper?.remove(); delete _instances[containerId]; }
    document.getElementById(`rte-wrap-${containerId}`)?.remove();
    _removeDialog(containerId);
  }

  function getHtml(containerId) {
    const inst = _instances[containerId];
    if (!inst) return '';
    if (inst.showingSource) {
      return document.getElementById(`rte-src-${containerId}`)?.value?.trim() || '';
    }
    const html = inst.quill.root.innerHTML;
    return html === '<p><br></p>' ? '' : html;
  }

  function _removeDialog(containerId) {
    document.getElementById(`rte-dlg-${containerId}`)?.remove();
  }

  // ══════════════════════════════════════════════════════════════
  //  HTML PRETTY PRINT
  // ══════════════════════════════════════════════════════════════

  function _prettyHtml(html) {
    if (!html) return '';
    const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
    let result = '', indent = 0;
    const pad = () => '  '.repeat(indent);
    (html.match(/<[^>]+>|[^<]+/g) || []).forEach(tok => {
      const trimmed = tok.trim();
      if (!trimmed) return;
      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        result += pad() + trimmed + '\n';
      } else if (trimmed.startsWith('<')) {
        const tag = (trimmed.match(/^<([a-zA-Z]+)/) || [])[1]?.toLowerCase() || '';
        result += pad() + trimmed + '\n';
        if (!VOID.has(tag) && !trimmed.endsWith('/>') && !trimmed.startsWith('<!')) indent++;
      } else {
        result += pad() + trimmed + '\n';
      }
    });
    return result.trim();
  }

  return { mount, unmount, getHtml, renderMath };
});

// ─── js/features/theme.js ───────────────────────────
/**
 * features/theme.js — Theme & Editor Settings
 * ═══════════════════════════════════════════════════════════════
 * 8 themes: Dark Navy, One Dark, Dracula, Monokai,
 *           GitHub Dark, Solarized Dark, Light, Solarized Light
 * + Editor font size, font family, line height settings
 * Keyboard: Shift+T = toggle panel | Shift+click btn = quick toggle
 */
'use strict';

CL.define('Features.Theme', () => {

  const LS_KEY        = 'cl_theme';
  const LS_FONT_SIZE  = 'cl_editor_fontsize';
  const LS_FONT_FAM   = 'cl_editor_fontfam';
  const LS_LINE_HT    = 'cl_editor_lineheight';

  const THEMES = [
    { id: 'dark-navy',      name: 'Dark Navy',       dark: true,  preview: ['#0a0e1a','#4f9eff','#34d399','#a78bfa'] },
    { id: 'one-dark',       name: 'One Dark',        dark: true,  preview: ['#282c34','#61afef','#98c379','#c678dd'] },
    { id: 'dracula',        name: 'Dracula',         dark: true,  preview: ['#282a36','#8be9fd','#50fa7b','#bd93f9'] },
    { id: 'monokai',        name: 'Monokai',         dark: true,  preview: ['#272822','#66d9e8','#a6e22e','#ae81ff'] },
    { id: 'github-dark',    name: 'GitHub Dark',     dark: true,  preview: ['#0d1117','#58a6ff','#3fb950','#bc8cff'] },
    { id: 'solarized-dark', name: 'Solarized Dark',  dark: true,  preview: ['#002b36','#268bd2','#859900','#6c71c4'] },
    { id: 'light',          name: 'Light',           dark: false, preview: ['#f3f3f3','#0969da','#1a7f37','#8250df'] },
    { id: 'solarized-light',name: 'Solarized Light', dark: false, preview: ['#fdf6e3','#268bd2','#859900','#6c71c4'] },
  ];

  const FONT_FAMILIES = [
    { id: 'default',       name: 'Mặc định',         css: "'JetBrains Mono','Cascadia Code','Fira Code','Consolas',monospace" },
    { id: 'jetbrains',     name: 'JetBrains Mono',   css: "'JetBrains Mono',monospace" },
    { id: 'cascadia',      name: 'Cascadia Code',    css: "'Cascadia Code',monospace" },
    { id: 'consolas',      name: 'Consolas',         css: "'Consolas','Courier New',monospace" },
    { id: 'firacode',      name: 'Fira Code',        css: "'Fira Code',monospace" },
    { id: 'sourcecodepro', name: 'Source Code Pro',  css: "'Source Code Pro',monospace" },
  ];

  const FONT_SIZES   = [11, 12, 13, 14, 15, 16, 18];
  const LINE_HEIGHTS = [
    { id: '1.4', name: 'Compact',  value: 1.4 },
    { id: '1.6', name: 'Normal',   value: 1.6 },
    { id: '1.8', name: 'Relaxed',  value: 1.8 },
    { id: '2.0', name: 'Spacious', value: 2.0 },
  ];

  // ── Apply theme ───────────────────────────────────────────────
  function apply(themeId) {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    document.documentElement.setAttribute('data-theme', theme.id);
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
    meta.content = theme.preview[0];
    localStorage.setItem(LS_KEY, theme.id);
    _updateActiveCard(theme.id);
  }

  // ── Apply editor font/size settings via injected <style> ─────
  function applyEditorSettings() {
    const fs  = parseInt(localStorage.getItem(LS_FONT_SIZE)) || 13;
    const fam = localStorage.getItem(LS_FONT_FAM) || 'default';
    const lh  = parseFloat(localStorage.getItem(LS_LINE_HT)) || 1.6;
    const famDef = FONT_FAMILIES.find(f => f.id === fam) || FONT_FAMILIES[0];

    let s = document.getElementById('_cl_editor_style');
    if (!s) { s = document.createElement('style'); s.id = '_cl_editor_style'; document.head.appendChild(s); }

    s.textContent = `
      #code-input, .editor-wrap textarea, .html-editor-wrap textarea,
      .hl-kw,.hl-fn,.hl-cls,.hl-bi,.hl-str,.hl-num,.hl-cmt,.hl-self,.hl-bool,
      .hl-deco,.hl-op,.hl-punc,.hl-plain,.hl-tag,.hl-attr,.hl-attrval,.hl-entity,
      .hl-css-sel,.hl-css-prop,.hl-css-val,.hl-css-unit,.hl-css-color,.hl-css-at,
      .hl-sql-kw,.hl-sql-fn,.hl-sql-type,.hl-sql-id {
        font-size: ${fs}px !important;
        font-family: ${famDef.css} !important;
        line-height: ${lh} !important;
      }
      .lnums span { height: calc(${fs}px * ${lh}) !important; line-height: ${lh} !important; }
    `;
  }

  function setFontSize(sz)  { localStorage.setItem(LS_FONT_SIZE, sz);  applyEditorSettings(); _updateEditorControls(); }
  function setFontFamily(id){ localStorage.setItem(LS_FONT_FAM,  id);  applyEditorSettings(); _updateEditorControls(); }
  function setLineHeight(v) { localStorage.setItem(LS_LINE_HT,   v);   applyEditorSettings(); _updateEditorControls(); }
  function current()        { return localStorage.getItem(LS_KEY) || 'dark-navy'; }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    apply(current());
    applyEditorSettings();
    _injectButton();
    document.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key === 'T' &&
          !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName || '')) {
        e.preventDefault();
        togglePanel();
      }
    });
  }

  // ── Wire button ───────────────────────────────────────────────
  function _injectButton() {
    const btn = document.getElementById('theme-picker-btn');
    if (btn) {
      btn.title = 'Cài đặt giao diện & Editor (Shift+T)';
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="display:block;flex-shrink:0">
        <circle cx="8" cy="8" r="2.2" fill="currentColor"/>
        <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.27 1.27M11.33 11.33l1.27 1.27M3.4 12.6l1.27-1.27M11.33 4.67l1.27-1.27"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`;
      if (!btn._themeWired) {
        btn._themeWired = true;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (e.shiftKey) {
            const isDark = THEMES.find(t => t.id === current())?.dark !== false;
            apply(isDark ? 'light' : 'dark-navy');
          } else {
            togglePanel();
          }
        });
      }
    }
    _buildPanel();
  }

  // ── Build panel HTML ─────────────────────────────────────────
  function _buildPanel() {
    document.getElementById('theme-picker-panel')?.remove();
    const dark  = THEMES.filter(t =>  t.dark);
    const light = THEMES.filter(t => !t.dark);
    const cur   = current();
    const curFs  = parseInt(localStorage.getItem(LS_FONT_SIZE)) || 13;
    const curFam = localStorage.getItem(LS_FONT_FAM) || 'default';
    const curLh  = localStorage.getItem(LS_LINE_HT) || '1.6';

    const panel = document.createElement('div');
    panel.id = 'theme-picker-panel';
    panel.innerHTML = `
      <div class="tp-header-row">
        <span>⚙ Giao diện &amp; Editor</span>
        <button class="tp-close-btn" id="tp-close-x" title="Đóng (Esc)">✕</button>
      </div>

      <div class="theme-section-label">🎨 Màu giao diện</div>
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text3);margin-bottom:4px">🌙 Tối</div>
      <div class="theme-grid" id="theme-grid-dark">
        ${dark.map(t => _cardHtml(t, cur)).join('')}
      </div>
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text3);margin:8px 0 4px">☀ Sáng</div>
      <div class="theme-grid" id="theme-grid-light">
        ${light.map(t => _cardHtml(t, cur)).join('')}
      </div>

      <div class="theme-section-label" style="margin-top:12px">✏ Cài đặt Editor</div>

      <div class="tp-editor-row">
        <span class="tp-editor-label">Cỡ chữ</span>
        <div class="tp-font-btns" id="tp-font-size-btns">
          ${FONT_SIZES.map(sz => `<button class="tp-sz-btn${sz === curFs ? ' active' : ''}" data-sz="${sz}">${sz}</button>`).join('')}
        </div>
      </div>

      <div class="tp-editor-row">
        <span class="tp-editor-label">Font</span>
        <select class="tp-select" id="tp-font-fam">
          ${FONT_FAMILIES.map(f => `<option value="${f.id}"${f.id === curFam ? ' selected' : ''}>${f.name}</option>`).join('')}
        </select>
      </div>

      <div class="tp-editor-row">
        <span class="tp-editor-label">Dãn dòng</span>
        <div class="tp-seg" id="tp-lineht-btns">
          ${LINE_HEIGHTS.map(lh => `<button class="tp-seg-btn${lh.id === curLh ? ' active' : ''}" data-lh="${lh.value}">${lh.name}</button>`).join('')}
        </div>
      </div>

      <div class="tp-shortcut-hint">
        <kbd>Shift</kbd>+<kbd>T</kbd> mở/đóng &nbsp;·&nbsp; <kbd>Shift</kbd>+click chuyển tối↔sáng
      </div>
    `;

    document.body.appendChild(panel);

    document.getElementById('tp-close-x')?.addEventListener('click', (e) => { e.stopPropagation(); _hidePanel(); });
    panel.querySelectorAll('.theme-card').forEach(c => c.addEventListener('click', (e) => { e.stopPropagation(); apply(c.dataset.tid); }));
    panel.querySelectorAll('.tp-sz-btn').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); setFontSize(parseInt(b.dataset.sz)); }));
    panel.querySelector('#tp-font-fam')?.addEventListener('change', (e) => setFontFamily(e.target.value));
    panel.querySelectorAll('.tp-seg-btn').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); setLineHeight(b.dataset.lh); }));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('show')) _hidePanel();
    });

    if (window._themeOutsideClose) document.removeEventListener('click', window._themeOutsideClose);
    window._themeOutsideClose = (e) => {
      if (!panel.contains(e.target) && e.target.id !== 'theme-picker-btn') _hidePanel();
    };
    setTimeout(() => document.addEventListener('click', window._themeOutsideClose), 0);
  }

  function _cardHtml(t, cur) {
    return `<div class="theme-card${t.id === cur ? ' active' : ''}" data-tid="${t.id}" title="${t.name}">
      <div class="theme-preview" style="background:${t.preview[0]}">
        ${t.preview.slice(1).map(c => `<span style="background:${c}"></span>`).join('')}
      </div>
      <div class="theme-name">${t.name}</div>
    </div>`;
  }

  function _hidePanel() {
    const p = document.getElementById('theme-picker-panel');
    if (!p) return;
    p.classList.remove('show');
    p.style.display = 'none';
  }

  function togglePanel() {
    const panel = document.getElementById('theme-picker-panel');
    const btn   = document.getElementById('theme-picker-btn');
    if (!panel) { _buildPanel(); togglePanel(); return; }
    if (panel.classList.contains('show')) { _hidePanel(); return; }

    const rect = btn ? btn.getBoundingClientRect() : { bottom: 60, right: window.innerWidth - 16 };
    const pw   = 296;
    let left   = rect.right - pw;
    if (left < 8) left = 8;
    if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
    panel.style.top     = (rect.bottom + 6) + 'px';
    panel.style.left    = left + 'px';
    panel.style.right   = 'auto';
    panel.style.width   = pw + 'px';
    panel.style.display = 'block';
    panel.classList.add('show');
    _updateActiveCard(current());
    _updateEditorControls();
  }

  function _updateActiveCard(themeId) {
    document.querySelectorAll('.theme-card').forEach(c => c.classList.toggle('active', c.dataset.tid === themeId));
  }

  function _updateEditorControls() {
    const curFs = parseInt(localStorage.getItem(LS_FONT_SIZE)) || 13;
    const curLh = localStorage.getItem(LS_LINE_HT) || '1.6';
    const curFam = localStorage.getItem(LS_FONT_FAM) || 'default';
    document.querySelectorAll('.tp-sz-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.sz) === curFs));
    document.querySelectorAll('.tp-seg-btn').forEach(b => b.classList.toggle('active', b.dataset.lh === curLh));
    const sel = document.getElementById('tp-font-fam');
    if (sel) sel.value = curFam;
  }

  return { init, apply, current, togglePanel };
});

// ─── js/features/sidebar.js ───────────────────────────
/**
 * features/sidebar.js — Sidebar + Panel Layout (Canvas LMS style)
 * ═══════════════════════════════════════════════════════════════
 * Cấu trúc 3 cột: Sidebar | Sub-nav | Content
 *
 * Phân quyền:
 *   👑 Admin   : Tất cả chức năng + Quản lý hệ thống
 *   👨‍🏫 Giáo viên: Dạy học + Theo dõi lớp (không có quản lý users)
 *   🎓 Học sinh : Luyện tập + Xem điểm cá nhân
 */
'use strict';

CL.define('Features.Sidebar', () => {
  const Events = CL.require('Events');

  let _role   = 'student';
  let _active = '';
  let _pinned = false;

  // ══════════════════════════════════════════════════════════════
  //  MENU DEFINITIONS (role-based)
  // ══════════════════════════════════════════════════════════════

  const MENUS = {

    // ── HỌC SINH ──────────────────────────────────────────────
    student: [
      {
        id:'learn', icon:'📚', label:'Học tập',
        children:[
          { id:'practice', icon:'✏️', label:'Luyện tập code',  section:'editor'     },
          { id:'exam',     icon:'📋', label:'Vào phòng thi',   section:'exam'       },
        ]
      },
      {
        id:'results', icon:'📊', label:'Kết quả',
        children:[
          { id:'my-scores',  icon:'🏆', label:'Điểm của tôi',    section:'scores'  },
          { id:'my-history', icon:'📖', label:'Lịch sử làm bài', section:'history' },
        ]
      },
      {
        id:'account', icon:'👤', label:'Tài khoản',
        children:[
          { id:'profile', icon:'🪪', label:'Hồ sơ cá nhân', section:'profile' },
        ]
      },
    ],

    // ── GIÁO VIÊN ─────────────────────────────────────────────
    teacher: [
      {
        id:'teach', icon:'📚', label:'Giảng dạy',
        children:[
          { id:'practice',  icon:'✏️', label:'Luyện tập',      section:'editor'           },
          { id:'exercises', icon:'📝', label:'Ngân hàng bài',  section:'tp:exercises'     },
          { id:'ai-gen',    icon:'🤖', label:'AI Sinh bài tập', section:'tp:ai-gen'        },
        ]
      },
      {
        id:'monitor', icon:'📊', label:'Theo dõi lớp',
        children:[
          { id:'scores',     icon:'🏆', label:'Bảng điểm lớp',  section:'tp:scores'      },
          { id:'history',    icon:'📖', label:'Lịch sử nộp bài',section:'tp:history'     },
          { id:'violations', icon:'🚨', label:'Vi phạm',        section:'tp:violations'  },
          { id:'analytics',  icon:'📈', label:'Thống kê',       section:'tp:analytics'   },
        ]
      },
      {
        id:'exam-mgmt', icon:'📋', label:'Kiểm tra',
        children:[
          { id:'exams', icon:'📋', label:'Kỳ kiểm tra',   section:'tp:exams'   },
        ]
      },
      // Giáo viên không có menu Cấu hình (chỉ Admin mới có)
    ],

    // ── ADMIN (teacher + hệ thống) ─────────────────────────────
    admin: [
      {
        id:'teach', icon:'📚', label:'Giảng dạy',
        children:[
          { id:'practice',  icon:'✏️', label:'Luyện tập',      section:'editor'       },
          { id:'exercises', icon:'📝', label:'Ngân hàng bài',  section:'tp:exercises' },
        ]
      },
      {
        id:'monitor', icon:'📊', label:'Theo dõi',
        children:[
          { id:'scores',     icon:'🏆', label:'Bảng điểm',      section:'tp:scores'     },
          { id:'history',    icon:'📖', label:'Lịch sử',        section:'tp:history'    },
          { id:'violations', icon:'🚨', label:'Vi phạm',        section:'tp:violations' },
          { id:'analytics',  icon:'📈', label:'Thống kê',       section:'tp:analytics'  },
        ]
      },
      {
        id:'exam-mgmt', icon:'📋', label:'Kiểm tra',
        children:[
          { id:'exams', icon:'📋', label:'Kỳ kiểm tra', section:'tp:exams' },
        ]
      },
      {
        id:'admin-mgmt', icon:'👥', label:'Quản lý hệ thống',
        children:[
          { id:'users-student',  icon:'🎓', label:'Học sinh',       section:'tp:users:student'  },
          { id:'users-teacher',  icon:'👨‍🏫', label:'Giáo viên',     section:'tp:users:teacher'  },
          { id:'users-admin',    icon:'⚡', label:'Quản trị viên',  section:'tp:users:admin'    },
          { id:'scores-all',     icon:'📊', label:'Bảng điểm toàn trường', section:'tp:users:scores' },
          { id:'year-mgr',       icon:'📅', label:'Quản lý năm học', section:'tp:year'           },
        ]
      },
      {
        id:'sys', icon:'⚙️', label:'Hệ thống',
        children:[
          { id:'config',    icon:'⚙️', label:'Cấu hình',       section:'tp:config'    },
        ]
      },
    ],
  };

  // ══════════════════════════════════════════════════════════════
  //  BUILD SIDEBAR
  // ══════════════════════════════════════════════════════════════

  function init(role) {
    _role   = role || 'student';
    // Default to pinned=true on first load (better UX: user sees functions immediately)
    // Luôn pinned — menu inline, không dùng flyout
    _pinned = true;
    localStorage.setItem('cl_sb_pinned', '1');

    const sb = document.getElementById('sidebar');
    if (!sb) return;

    const groups = MENUS[_role] || MENUS.student;

    // Role badge
    const roleInfo = {
      admin:   { icon:'⚡', label:'Admin',      cls:'sb-role-admin'   },
      teacher: { icon:'👨‍🏫', label:'Giáo viên', cls:'sb-role-teacher' },
      student: { icon:'🎓', label:'Học sinh',   cls:'sb-role-student' },
    }[_role] || { icon:'👤', label:'', cls:'' };

    sb.innerHTML = `
      <div class="sb-header">
        <div class="sb-logo">
          <span class="sb-logo-icon">🖥️</span>
          <div class="sb-logo-text">
            <div class="sb-logo-name">CodeLab</div>
            <div class="sb-role-badge ${roleInfo.cls}">${roleInfo.icon} ${roleInfo.label}</div>
          </div>
        </div>
        <button class="sb-pin-btn" id="sb-pin" title="Ghim/Thu menu"
          onclick="CL.Features.Sidebar.togglePin()">
          <span class="sb-pin-icon">${_pinned ? '◀' : '▶'}</span>
        </button>
      </div>

      <nav class="sb-nav" role="navigation" aria-label="Menu chính">
        ${groups.map(g => _groupHtml(g)).join('')}
      </nav>

      <div class="sb-bottom">
        <button class="sb-item sb-profile-btn"
          onclick="CL.Features.Profile?.open()"
          title="Hồ sơ cá nhân">
          <span class="sb-icon">👤</span>
          <span class="sb-label">Hồ sơ</span>
        </button>
        <button class="sb-item sb-logout"
          onclick="CL.Auth.UI.logout()"
          title="Đăng xuất">
          <span class="sb-icon">↩</span>
          <span class="sb-label">Đăng xuất</span>
        </button>
      </div>`;

    if (_pinned) {
      sb.classList.add('pinned');
      document.getElementById('app-shell')?.classList.add('sb-pinned');
    }
    // Restore expanded groups from localStorage
    try {
      const savedExp = JSON.parse(localStorage.getItem('cl_sb_expanded') || '[]');
      savedExp.forEach(gid => {
        sb.querySelector(`.sb-group[data-gid="${gid}"]`)?.classList.add('expanded');
      });
    } catch(e) {}
    document.getElementById('app-shell')?.style.removeProperty('visibility');
    document.getElementById('sb-overlay')?.addEventListener('click', closeMobile);

    // Close flyouts when clicking outside sidebar
    // Add document listeners only once (guard with flag)
    if (!window._sbListenersAdded) {
      window._sbListenersAdded = true;
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#sidebar') && !e.target.closest('.sb-flyout')) {
          _hideAllFlyouts();
        }
      }, true);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') _hideAllFlyouts();
      });
    }

    // Pinned mode: restore expanded groups from localStorage.
    // navigate() below will handle expanding the active group.
    // Auto-expand first group only if nothing was saved (true first load).
    if (_pinned) {
      const savedExpArr = JSON.parse(localStorage.getItem('cl_sb_expanded') || '[]');
      if (savedExpArr.length === 0) {
        const firstGroup = sb.querySelector('.sb-group');
        if (firstGroup) firstGroup.classList.add('expanded');
      }
    }

    // Restore last active
    const saved = localStorage.getItem('cl_sb_active') || _getDefaultId();
    navigate(saved, false);

    // _showSection() đã xử lý visibility qua classList.cl-hidden
    // Xong init: bỏ trạng thái loading
    sb.classList.remove('sb-init-pending');
  }

  function _getDefaultId() {
    const groups = MENUS[_role] || MENUS.student;
    return groups[0]?.children?.[0]?.id || 'practice';
  }

  function _groupHtml(group) {
    const hasActive = group.children.some(c => c.id === _active);
    return `
      <div class="sb-group${hasActive ? ' has-active' : ''}" data-gid="${group.id}">
        <button class="sb-group-header${hasActive ? ' has-active' : ''}"
          aria-haspopup="true"
          data-gid="${group.id}"
          onclick="CL.Features.Sidebar.groupHeaderClick('${group.id}')">
          <span class="sb-icon">${group.icon}</span>
          <span class="sb-label">${group.label}</span>
          <span class="sb-group-arrow">›</span>
        </button>
        <div class="sb-flyout" id="sbf-${group.id}" role="menu">
          <div class="sb-flyout-label">${group.icon} ${group.label}</div>
          ${group.children.map(c => _childHtml(c)).join('')}
        </div>
      </div>`;
  }

  function _childHtml(item) {
    return `
      <button class="sb-child${_active === item.id ? ' active' : ''}"
        data-id="${item.id}" data-section="${item.section}"
        onclick="CL.Features.Sidebar.navigate('${item.id}')"
        title="${item.label}">
        <span class="sb-child-icon">${item.icon}</span>
        <span class="sb-label">${item.label}</span>
      </button>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  NAVIGATION
  // ══════════════════════════════════════════════════════════════

  function navigate(id, save = true) {
    _active = id;
    if (save) localStorage.setItem('cl_sb_active', id);

    // Update active state
    document.querySelectorAll('.sb-child[data-id]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.id === id);
    });

    // Find item across all groups
    const groups = MENUS[_role] || MENUS.student;
    let item = null;
    for (const g of groups) {
      item = g.children.find(c => c.id === id);
      if (item) {
        // Expand parent group and always persist it (fixes F5 restore)
        const grpEl = document.querySelector(`.sb-group[data-gid="${g.id}"]`);
        if (grpEl) {
          grpEl.classList.add('expanded');
          const sb = document.getElementById('sidebar');
          const expGroups = [...(sb?.querySelectorAll('.sb-group.expanded') || [])]
            .map(g => g.dataset.gid).filter(Boolean);
          localStorage.setItem('cl_sb_expanded', JSON.stringify(expGroups));
        }
        break;
      }
    }
    if (!item) return;

    closeMobile();
    _hideAllFlyouts();

    const section = item.section;

    if (section === 'editor') {
      _showSection('workspace-view', true);  // true = show content-bar
    } else if (section === 'profile') {
      CL.Features.Profile?.open();
      return;
    } else if (section === 'exam') {
      _showSection('workspace-view', false); // exam không cần content-bar
    } else if (section === 'history') {
      _showSection('panel-view');
      _renderStudentHistory();
    } else if (section === 'scores') {
      _showSection('panel-view');
      _renderStudentScores();
    } else if (section.startsWith('tp:users:')) {
      const sub = section.replace('tp:users:', '');
      _showSection('panel-view');
      _renderUsersPanel(sub);
    } else if (section.startsWith('tp:')) {
      const tabId = section.replace('tp:', '');
      _showSection('panel-view');
      _renderPanel(tabId);
    }

    // Update breadcrumb
    const bc = document.getElementById('breadcrumb-title');
    if (bc) bc.textContent = item.label;
  }

  function toggleGroup(gid) {
    // No-op: hover-based
  }

  // When narrow sidebar: clicking group header navigates to its first child
  let _flyoutTimers = {};

  function groupHeaderClick(gid) {
    const sidebar  = document.getElementById('sidebar');
    const isPinned = sidebar?.classList.contains('pinned');

    if (isPinned) {
      // Pinned: toggle inline accordion
      const grpEl = sidebar?.querySelector(`.sb-group[data-gid="${gid}"]`);
      if (grpEl) {
        grpEl.classList.toggle('expanded');
        // Persist expanded state
        const expGroups = [...(sidebar?.querySelectorAll('.sb-group.expanded') || [])]
          .map(g => g.dataset.gid).filter(Boolean);
        localStorage.setItem('cl_sb_expanded', JSON.stringify(expGroups));
      }
      return;
    }

    // Collapsed/hover mode: always show flyout on click
    // (don't toggle based on .open state — hover may have already added .open via rAF,
    //  causing isOpen=true → close-without-reopen bug)
    _hideAllFlyouts();
    const btn = sidebar?.querySelector(`.sb-group-header[data-gid="${gid}"]`)
             || sidebar?.querySelector(`.sb-group[data-gid="${gid}"] .sb-group-header`);
    _positionAndShowFlyout(gid, btn);
  }

  function _positionAndShowFlyout(gid, refEl) {
    const flyout = document.getElementById('sbf-' + gid);
    if (!flyout) return;
    clearTimeout(_flyoutTimers[gid]);
    // Use requestAnimationFrame to ensure DOM is painted before measuring
    requestAnimationFrame(() => {
      const sb   = document.getElementById('sidebar');
      const sbW  = sb ? sb.getBoundingClientRect().width : 52;
      // Minimum 52px (collapsed width)
      const left = Math.max(sbW, 52) + 4;
      const rect = refEl ? refEl.getBoundingClientRect() : null;
      const top  = rect ? rect.top : 80;
      flyout.style.top  = top + 'px';
      flyout.style.left = left + 'px';
      flyout.classList.add('open');
    });
  }

  function _showFlyout(gid, btn) {
    // Pinned = accordion mode: ignore hover flyout completely
    if (document.getElementById('sidebar')?.classList.contains('pinned')) return;
    clearTimeout(_flyoutTimers[gid]);
    document.querySelectorAll('.sb-flyout.open').forEach(f => {
      if (f.id !== 'sbf-' + gid) f.classList.remove('open');
    });
    _positionAndShowFlyout(gid, btn);
  }

  function _keepFlyout(gid) {
    if (document.getElementById('sidebar')?.classList.contains('pinned')) return;
    clearTimeout(_flyoutTimers[gid]);
  }

  function _hideFlyout(gid) {
    if (document.getElementById('sidebar')?.classList.contains('pinned')) return;
    _flyoutTimers[gid] = setTimeout(() => {
      document.getElementById('sbf-' + gid)?.classList.remove('open');
    }, 180);
  }

  function _hideAllFlyouts() {
    document.querySelectorAll('.sb-flyout.open').forEach(f => f.classList.remove('open'));
  }

  function _showSection(which, showExBar = false) {
    const wv    = document.getElementById('workspace-view');
    const pv    = document.getElementById('panel-view');
    const exBar = document.getElementById('tb-ex-bar');
    // Dùng class thay vì inline style để override CSS !important
    if (wv)    wv.classList.toggle('cl-hidden',    which !== 'workspace-view');
    if (pv)    pv.classList.toggle('cl-hidden',    which !== 'panel-view');
    // tb-ex-bar chỉ hiện khi Luyện tập (showExBar = true)
    if (exBar) exBar.classList.toggle('cl-hidden', !showExBar);
    // Xoá inline style cũ
    if (wv)    wv.style.removeProperty('display');
    if (pv)    pv.style.removeProperty('display');
    if (exBar) exBar.style.removeProperty('display');
  }

  // ══════════════════════════════════════════════════════════════
  //  PANEL RENDERERS
  // ══════════════════════════════════════════════════════════════

  function _renderPanel(tabId) {
    const pv = document.getElementById('panel-view');
    if (!pv) return;
    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải...</div>';
    const RENDERERS = {
      scores:     () => CL.Teacher.Scores?.render(pv),
      violations: () => CL.Teacher.Violations?.render(pv),
      history:    () => CL.Teacher.History?.render(pv),
      exams:      () => CL.Teacher.Exams?.render(pv),
      analytics:  () => CL.Teacher.Analytics?.render(pv),
      exercises:  () => CL.Teacher.ExEditor?.render(pv),
      config:     () => CL.Teacher.Config?.render(pv),
      changelog:  () => CL.Features.Changelog?.render(pv),
    };
    (RENDERERS[tabId] || (() => { pv.innerHTML = '<div class="pv-empty">Chức năng đang phát triển</div>'; }))();
  }

  async function _renderUsersPanel(sub) {
    const pv = document.getElementById('panel-view');
    if (!pv) return;

    // ✅ Kiểm tra quyền admin ở frontend trước khi gọi API
    const Session = CL.require('Auth.Session');
    const user = Session?.get?.();
    if (!user || user.role !== 'admin') {
      pv.innerHTML = '<div class="tp-empty">❌ Chỉ Admin mới có quyền thực hiện thao tác này.</div>';
      return;
    }

    const tabMap = { student:'students', teacher:'teachers', admin:'admins', scores:'scores' };
    const tab = tabMap[sub] || 'students';

    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải...</div>';

    // ✅ Chỉ gọi render() MỘT LẦN duy nhất, tránh double-render gây race condition
    if (CL.Admin?.Users?.render) {
      await CL.Admin.Users.render(pv);
      CL.Admin.Users._auTab(null, tab);
    } else {
      pv.innerHTML = '<div class="tp-empty">⚠️ Module quản lý người dùng chưa được tải.</div>';
    }
  }

  async function _renderStudentScores() {
    const pv = document.getElementById('panel-view');
    if (!pv) return;
    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải điểm...</div>';
    try {
      const history = await CL.API.getHistory?.();
      if (!history?.length) {
        pv.innerHTML = `<div class="pv-empty"><div style="font-size:40px;margin-bottom:12px">📊</div>Bạn chưa có bài nộp nào.</div>`;
        return;
      }
      const avg = (history.reduce((s,r)=>s+(+r.diem||0),0)/history.length).toFixed(1);
      const pass = history.filter(r=>(+r.diem||0)>=5).length;
      pv.innerHTML = `
        <div class="pv-page">
          <div class="pv-page-header">
            <h2>🏆 Điểm của tôi</h2>
            <div class="pv-stats-row">
              <div class="pv-stat"><span class="pv-stat-n">${history.length}</span><span class="pv-stat-l">Bài đã nộp</span></div>
              <div class="pv-stat"><span class="pv-stat-n">${avg}</span><span class="pv-stat-l">Điểm TB</span></div>
              <div class="pv-stat ok"><span class="pv-stat-n">${pass}</span><span class="pv-stat-l">Đạt ≥5</span></div>
            </div>
          </div>
          <div class="pv-table-wrap">
            <table class="au-table">
              <thead><tr><th>Bài tập</th><th>Điểm</th><th>Lần</th><th>Thời gian</th></tr></thead>
              <tbody>
                ${history.slice(0,100).map(r => {
                  const d = +r.diem || 0;
                  const cls = d>=9?'sc-ex':d>=7?'sc-ok':d>=5?'sc-warn':'sc-bad';
                  const ts = r.ts ? new Date(r.ts).toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—';
                  return `<tr>
                    <td style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.tieu_de||''}">${r.tieu_de||r.bai_id||'—'}</td>
                    <td><span class="sc-badge ${cls}">${d.toFixed(1)}</span></td>
                    <td style="text-align:center;color:var(--text3)">${r.lan_thu||1}</td>
                    <td style="font-size:11px;color:var(--text3)">${ts}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
    } catch(e) {
      pv.innerHTML = `<div class="pv-empty">❌ ${e.message}</div>`;
    }
  }

  async function _renderStudentHistory() {
    const pv = document.getElementById('panel-view');
    if (!pv) return;
    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải...</div>';
    try {
      const history = await CL.API.getHistory?.();
      if (!history?.length) {
        pv.innerHTML = `<div class="pv-empty">Chưa có lịch sử làm bài.</div>`;
        return;
      }
      pv.innerHTML = `
        <div class="pv-page">
          <div class="pv-page-header"><h2>📖 Lịch sử làm bài</h2></div>
          <div class="pv-table-wrap">
            <table class="au-table">
              <thead><tr><th>Bài tập</th><th>Loại</th><th>Điểm</th><th>Thời gian</th></tr></thead>
              <tbody>
                ${history.slice(0,200).map(r => {
                  const d = +r.diem || 0;
                  const cls = d>=9?'sc-ex':d>=7?'sc-ok':d>=5?'sc-warn':'sc-bad';
                  const ts = r.ts ? new Date(r.ts).toLocaleString('vi-VN') : '—';
                  const type = r.type==='html'?'🌐 HTML':r.type==='sql'?'🗃 SQL':'🐍 Python';
                  return `<tr>
                    <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.tieu_de||r.bai_id||'—'}</td>
                    <td style="font-size:11px">${type}</td>
                    <td><span class="sc-badge ${cls}">${d.toFixed(1)}</span></td>
                    <td style="font-size:11px;color:var(--text3)">${ts}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
    } catch(e) {
      pv.innerHTML = `<div class="pv-empty">❌ ${e.message}</div>`;
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  SIDEBAR CONTROLS
  // ══════════════════════════════════════════════════════════════

  function togglePin() {
    _pinned = !_pinned;
    localStorage.setItem('cl_sb_pinned', _pinned ? '1' : '0');
    const sb = document.getElementById('sidebar');
    sb?.classList.toggle('pinned', _pinned);
    document.getElementById('app-shell')?.classList.toggle('sb-pinned', _pinned);
    const icon = document.getElementById('sb-pin')?.querySelector('.sb-pin-icon');
    if (icon) icon.textContent = _pinned ? '◀' : '▶';
    // When pinning: expand first group automatically
    if (_pinned) {
      const firstGroup = sb?.querySelector('.sb-group');
      if (firstGroup && !firstGroup.classList.contains('expanded')) {
        firstGroup.classList.add('expanded');
      }
    } else {
      // When unpinning: close all flyouts
      _hideAllFlyouts();
    }
  }

  function openMobile() {
    document.getElementById('sidebar')?.classList.add('mobile-open');
    document.getElementById('sb-overlay')?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    document.getElementById('sidebar')?.classList.remove('mobile-open');
    document.getElementById('sb-overlay')?.classList.remove('show');
    document.body.style.overflow = '';
  }

  return { init, navigate, toggleGroup, groupHeaderClick, togglePin, openMobile, closeMobile, _showFlyout, _keepFlyout, _hideFlyout, _hideAllFlyouts };
});

// ─── js/features/changelog-ui.js ───────────────────────────
/**
 * features/changelog-ui.js — Changelog viewer trong Teacher Panel
 * Xem lịch sử phiên bản từ Google Sheets (tab [Changelog])
 * BUGFIX: _get không exposed → dùng CL.API.getChangelog(); fallback hardcoded
 */
'use strict';

CL.define('Features.Changelog', () => {

  const Utils = CL.require('Utils');

  // ── Bảng changelog cứng — luôn hiển thị dù server offline ──────
  const BUILTIN_CHANGELOG = [
    {
      version: '5.15.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.15.0: UI fixes - Sidebar redesign: hover dropdown menu (Canvas LMS style) thay collapsible div, submenu hien thi khi hover menu cap 1. Theme: bo sung day du vars cho solarized-light, them 32 override cho light theme components. Score panel: fix tp-bar-body overflow cho bang diem hien thi dung.'
    },
    {
      version: '5.14.0', type: 'patch',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.14.0 Final: Kiem tra toan dien - fix syntax error _formatExercises, AIClient vao bundle (fix CL.require not found), updateProfile -> updateMyProfile (fix API action mismatch), xoa file rac css/c. All JS syntax check: 0 errors.'
    },
    {
      version: '5.14.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.14.0: Tái cấu trúc AI API module - Universal AIClient (adapter pattern). Fix bug: test/sinh bai luon goi Anthropic du chon Gemini/OpenAI. AIClient.call(provider, opts) route dung endpoint cho tung provider. Config, ai-generator, prompt-config deu dung AIClient thay vi hardcode.'
    },
    {
      version: '5.13.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.13.0: Prompt Templates 2-tang: System Prompt an (chuan CT2018 + JSON schema) + User Template GV chinh (co bien {{bloom}}/{{content}}/{{count}}...). Few-shot tu dong chon 2 bai mau cung type+Bloom tu ngan hang. Tab Prompt AI trong menu Cau hinh voi editor, preview full prompt, token estimate. ai-generator.js dung PromptConfig.buildPrompt() thay vi hardcoded.'
    },
    {
      version: '5.12.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.12.0: Cau hinh da AI API trong menu Cau hinh - ho tro Claude/OpenAI/Gemini. Moi provider co card rieng voi: API key (masked), model selection, test connection. Provider mac dinh duoc chon, ai-generator.js tu dong dung key tu Config module.'
    },
    {
      version: '5.11.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'v5.11.0: AI Sinh bai tap - Teacher Panel tab moi 🤖. Dung Claude API (Haiku $0.01 hoac Sonnet $0.06/bai). Tinh nang: nhap noi dung SGK, chon lop/bai/Bloom, AI sinh JSON structured, validate Pyodide, review + luu vao ngan hang. API key luu localStorage. Them saveBaiTapRecord endpoint Code.gs.'
    },
    {
      version: '5.10.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'N6: Ma tran de live-update khi add/remove cau hoi (debounce 600ms). N5: Trang phu-huynh.html - xem ket qua con chi bang MSHS, Code.gs endpoint getStudentReport (rate-limited, no auth). N7: Export PDF bao cao lop (print-friendly HTML, mo tab moi).'
    },
    {
      version: '5.9.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'N2: Ma tran de preview TT26/2022 trong exam creator - Bloom distribution, NL1/NL2/NL3, bang 2 chieu Chu de x Muc do, tu dong cap nhat. N3: Them tc[] cho 45 bai Python (tong 53 bai kich hoat Pyodide grading). N1: GitHub Actions CI auto-rebuild bundle.js khi push JS.'
    },
    {
      version: '5.8.1', type: 'patch',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Hotfix: F1 mobilePanel() thiếu định nghĩa (crash mobile nav). F2 api.js exports thiếu getItemAnalysis/getExamMatrix/getBaiLamForStudent. F4 analytics NL profile kết hợp cả dữ liệu luyện tập + thi. F5 GRADE_FILE_MAP thêm K12-CTST/K12-KNTT/K11-SQL. F7 CSS 0 duplicate selector còn lại.'
    },
    {
      version: '5.8.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Phase 2+3+4 CT GDPT 2018: Config BLOOM_NL_MAP (Bloom→NL1/NL2/NL3), Registry helpers getNL/getBloomGroup/buildExamMatrix. Analytics v2: Tab Tổng hợp lớp (early warning HS nguy cơ, so sánh lớp bar chart), Tab Năng lực HS (hồ sơ NL1/NL2/NL3 radar, Bloom 6 mức, trend chart, PC3 persistence), Tab Phân tích đề (Item Analysis p/D/r, Cronbach alpha, histogram phân phối, ma trận TT26/2022), Tab Xuất CSV hồ sơ năng lực CT2018.'
    },
    {
      version: '5.7.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Đợt 3 performance: P1 — Bundle 45 JS files → dist/bundle.js (1 HTTP request thay 45). P2 — Lazy load exercise data: 2MB exercise bundle chia thành 3 file, chỉ load khi chọn lớp (K10=784KB, K11=508KB, SQL=699KB). First paint tiết kiệm ~2s trên 3G. Thêm scripts/build.py + index.dev.html cho development workflow.'
    },
    {
      version: '5.6.1', type: 'patch',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Đợt 2 clean up: Xóa 9 legacy files (3099 dòng dead code). Dedup CSS: 326 rule trùng lặp → tiết kiệm 958 dòng / 43KB. Thêm tc[] test cases cho 8 bài Python mẫu (B1-B6) để kích hoạt Pyodide grading.'
    },
    {
      version: '5.6.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Phase 1 bugs: fix exam mode không kích hoạt (B1), gộp duplicate exercise:selected (B3), fix runCode/await graders (B5/B6), restore UI sau thi (B7), dedup verifyExamCode (B8). Phase 2 multi-year: thêm nam_hoc vào SCORE_H/BAIKT_H/BAILAM_H, LichSuLop schema, HOCSINH_H cập nhật, yearTransition()/importStudents() backend, Admin UI Quản lý năm học với CSV import.'
    },
    {
      version: '5.5.2', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Ngân hàng bài: Tab Đề bài + Lý thuyết dùng RichText editor (Quill + KaTeX + bảng + upload ảnh). Bỏ Tab Tiêu chí và Hướng dẫn lỗi (xử lý tự động bởi Python grader). Tab Code mẫu giữ nguyên textarea. Lưu về Sheets tương ứng.'
    },
    {
      version: '5.5.1', type: 'patch',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Hotfix: exam-result-modal hiện ngay khi load trang (CSS display:flex !important override). Fix lsSwitch và mobileRunGrade undefined. Fix null-safe addEventListener trong ui.js. Toàn bộ onclick handlers đã kiểm tra và đủ định nghĩa.'
    },
    {
      version: '5.5.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Canvas LMS-style Rich Editor: Quill 2 + quill-better-table + KaTeX math ($$...$$) + kéo thả ảnh upload Google Drive + dialog chèn ảnh URL/file + dialog công thức LaTeX + dialog chèn bảng + toggle HTML nguồn. Học sinh xem công thức toán tự động render KaTeX.'
    },
    {
      version: '5.4.0', type: 'minor',
      timestamp: '2026-03-22T00:00:00Z',
      description: 'Rich editor: thêm nút toggle HTML nguồn (</> HTML). Admin: cho phép sửa MSHS/username. Theme: fix toggle light/dark. Xóa nút Lịch sử phiên bản khỏi sidebar. Giáo viên không có menu Cấu hình. Fix nút Cập nhật user không hoạt động.'
    },
    {
      version: '4.8.0', type: 'minor',
      timestamp: '2025-03-20T18:00:00Z',
      description: 'Sửa bug đổi mật khẩu (admin/teacher/student), fix quản lý người dùng race condition, fix adminDeleteAdmin tham số sai, chuẩn hóa màu VS Code, theme toggle, score box interactive (count-up, confetti, glow).'
    },
    {
      version: '4.7.0', type: 'minor',
      timestamp: '2025-03-20T12:00:00Z',
      description: 'Thêm tab Quản lý hệ thống cho Admin: CRUD học sinh, giáo viên, admin; reset mật khẩu, khoá/mở tài khoản, xuất CSV bảng điểm.'
    },
    {
      version: '4.6.0', type: 'minor',
      timestamp: '2025-03-19T10:00:00Z',
      description: 'Thêm SQL Editor & SQL Grader. Ngân hàng bài tập SQL lớp 11 KNTT. Sidebar 3 cột chuẩn Canvas LMS. Profile panel với avatar.'
    },
    {
      version: '4.5.0', type: 'minor',
      timestamp: '2025-03-18T08:00:00Z',
      description: 'HTML Editor & HTML Grader. Syntax highlighting real-time. Exam Mode chống gian lận. Anti-cheat fullscreen + tab-switch detection.'
    },
    {
      version: '4.0.0', type: 'major',
      timestamp: '2025-03-15T00:00:00Z',
      description: 'Kiến trúc mô-đun CL.define / CL.require. Auth 2 lớp (Admin/Teacher dùng username, Student dùng MSHS+mật khẩu). Teacher Panel đầy đủ.'
    },
    {
      version: '3.0.0', type: 'major',
      timestamp: '2025-03-10T00:00:00Z',
      description: 'Single-file grader v3. Pyodide WebAssembly Python runtime. Test case engine + Rubric engine. Submission queue offline.'
    },
  ];

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải lịch sử...</div>';
    try {
      const entries = await _fetchChangelog();
      _renderList(el, entries);
    } catch(e) {
      // Nếu lỗi vẫn còn → render fallback hardcoded
      _renderList(el, BUILTIN_CHANGELOG);
    }
  }

  async function _fetchChangelog() {
    // Ưu tiên: server → meta tag → hardcoded
    if (CL.API?.isReady?.()) {
      try {
        const rows = await CL.API.getChangelog?.();
        if (Array.isArray(rows) && rows.length) return rows;
      } catch {}
    }
    // meta tag fallback (nếu build script inject)
    const meta = document.querySelector('meta[name="cl-changelog"]');
    if (meta) {
      try {
        const parsed = JSON.parse(decodeURIComponent(meta.content));
        if (parsed.length) return parsed;
      } catch {}
    }
    return BUILTIN_CHANGELOG;
  }

  function _renderList(el, entries) {
    if (!entries.length) {
      el.innerHTML = '<div class="tp-empty">📝 Chưa có lịch sử phiên bản.</div>';
      return;
    }
    el.innerHTML = `
      <div class="cl-header">
        <h3>📋 Lịch sử phiên bản CodeLab</h3>
        <span class="cl-count">${entries.length} phiên bản</span>
      </div>
      <div class="cl-list">
        ${entries.map(_entryHtml).join('')}
      </div>`;
  }

  function _entryHtml(e, i) {
    const typeInfo = {
      major: { icon: '🔴', label: 'Major', cls: 'cl-major' },
      minor: { icon: '🟡', label: 'Minor', cls: 'cl-minor' },
      patch: { icon: '🟢', label: 'Patch', cls: 'cl-patch' },
    }[e.type] || { icon: '🔵', label: e.type||'Update', cls: 'cl-patch' };

    const date = e.timestamp
      ? new Date(e.timestamp).toLocaleDateString('vi-VN', {
          day:'2-digit', month:'2-digit', year:'numeric'
        })
      : '—';

    const isLatest = i === 0;

    return `
      <div class="cl-entry ${typeInfo.cls}${isLatest ? ' cl-latest' : ''}">
        <div class="cl-entry-head">
          <span class="cl-ver">v${Utils.escHtml(e.version||'?')}${isLatest ? ' <span class="cl-badge-latest">Hiện tại</span>' : ''}</span>
          <span class="cl-type-badge">${typeInfo.icon} ${typeInfo.label}</span>
          <span class="cl-date">${date}</span>
          ${e.prev_version ? `<span class="cl-prev">← v${Utils.escHtml(e.prev_version)}</span>` : ''}
        </div>
        <div class="cl-desc">${Utils.escHtml(e.description||'Không có mô tả.')}</div>
      </div>`;
  }

  return { render };
});

// ─── js/ui/resizer.js ───────────────────────────
/**
 * ui/resizer.js — Drag-to-resize panels
 * ═══════════════════════════════════════════════════════════════
 * Cho phép kéo thanh #rs-col (ngang) và #rs-row (dọc) để
 * thay đổi kích thước editor, output, và grade panel.
 *
 * Layout grid:
 *   col1-row1 = editor-panel   | col2-row1↕2 = grade-panel
 *   col1-row2 = output-panel   |
 *
 * CSS vars trên .workspace:
 *   --col-right : width của grade panel (px)
 *   --row-top   : height của editor (px hoặc %)
 */
'use strict';

CL.define('UI.Resizer', () => {

  const LS_COL = 'cl_rs_col';  // localStorage key cho col width
  const LS_ROW = 'cl_rs_row';  // localStorage key cho row height

  const MIN_COL = 240;   // min width grade panel
  const MAX_COL_RATIO = 0.75; // max = 75% viewport
  const MIN_ROW = 120;   // min height editor
  const MIN_OUT = 80;    // min height output

  function init() {
    _initColResizer();
    _initRowResizer();
    _restoreSavedSizes();
  }

  // ── Column resizer (#rs-col) ──────────────────────────────────

  function _initColResizer() {
    const handle = document.getElementById('rs-col');
    if (!handle) return;

    let startX, startColW;

    handle.addEventListener('pointerdown', e => {
      e.preventDefault();
      handle.setPointerCapture(e.pointerId);
      handle.classList.add('dragging');

      const ws = document.querySelector('.workspace');
      const colRight = parseInt(
        getComputedStyle(ws).getPropertyValue('--col-right') || '480', 10
      );
      startX    = e.clientX;
      startColW = colRight;

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    handle.addEventListener('pointermove', e => {
      if (!handle.hasPointerCapture(e.pointerId)) return;

      const ws = document.querySelector('.workspace');
      if (!ws) return;

      const dx     = startX - e.clientX; // kéo sang trái → tăng col right
      const maxCol = Math.floor(ws.offsetWidth * MAX_COL_RATIO);
      const newW   = Math.max(MIN_COL, Math.min(maxCol, startColW + dx));

      ws.style.setProperty('--col-right', newW + 'px');
    });

    handle.addEventListener('pointerup', e => {
      if (!handle.hasPointerCapture(e.pointerId)) return;
      handle.releasePointerCapture(e.pointerId);
      handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      // Save
      const ws = document.querySelector('.workspace');
      if (ws) {
        const val = getComputedStyle(ws).getPropertyValue('--col-right').trim();
        try { localStorage.setItem(LS_COL, val); } catch {}
      }
    });

    // Double-click → reset to default
    handle.addEventListener('dblclick', () => {
      const ws = document.querySelector('.workspace');
      if (ws) {
        ws.style.setProperty('--col-right', '480px');
        try { localStorage.removeItem(LS_COL); } catch {}
      }
    });
  }

  // ── Row resizer (#rs-row) ─────────────────────────────────────

  function _initRowResizer() {
    const handle = document.getElementById('rs-row');
    if (!handle) return;

    let startY, startTopH;

    handle.addEventListener('pointerdown', e => {
      e.preventDefault();
      handle.setPointerCapture(e.pointerId);
      handle.classList.add('dragging');

      const ws = document.querySelector('.workspace');
      const topH = parseInt(
        getComputedStyle(ws).getPropertyValue('--row-top') || '0', 10
      ) || document.getElementById('editor-panel')?.offsetHeight || 300;

      startY    = e.clientY;
      startTopH = topH;

      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    });

    handle.addEventListener('pointermove', e => {
      if (!handle.hasPointerCapture(e.pointerId)) return;

      const ws = document.querySelector('.workspace');
      if (!ws) return;

      const dy    = e.clientY - startY;
      const wsH   = ws.offsetHeight;
      const maxH  = wsH - MIN_OUT;
      const newH  = Math.max(MIN_ROW, Math.min(maxH, startTopH + dy));

      ws.style.setProperty('--row-top', newH + 'px');
    });

    handle.addEventListener('pointerup', e => {
      if (!handle.hasPointerCapture(e.pointerId)) return;
      handle.releasePointerCapture(e.pointerId);
      handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      const ws = document.querySelector('.workspace');
      if (ws) {
        const val = getComputedStyle(ws).getPropertyValue('--row-top').trim();
        try { localStorage.setItem(LS_ROW, val); } catch {}
      }
    });

    handle.addEventListener('dblclick', () => {
      const ws = document.querySelector('.workspace');
      if (ws) {
        ws.style.setProperty('--row-top', '60vh');
        try { localStorage.removeItem(LS_ROW); } catch {}
      }
    });
  }

  // ── Restore saved sizes ───────────────────────────────────────

  function _restoreSavedSizes() {
    const ws = document.querySelector('.workspace');
    if (!ws) return;

    try {
      const col = localStorage.getItem(LS_COL);
      if (col) ws.style.setProperty('--col-right', col);

      const row = localStorage.getItem(LS_ROW);
      if (row) ws.style.setProperty('--row-top', row);
    } catch {}
  }

  // ── Public: reset all sizes ───────────────────────────────────

  function reset() {
    const ws = document.querySelector('.workspace');
    if (!ws) return;
    ws.style.setProperty('--col-right', '480px');
    ws.style.setProperty('--row-top', '60vh');
    try {
      localStorage.removeItem(LS_COL);
      localStorage.removeItem(LS_ROW);
    } catch {}
  }

  return { init, reset };
});

// ─── js/features/practice-layout.js ───────────────────────────
/**
 * features/practice-layout.js — Restructured Practice Layout
 * ═══════════════════════════════════════════════════════════════
 * Quản lý 3 chế độ: practice | exam | preview
 *
 * Layout mới:
 *   ┌── grade-panel ──────────────────────────────┐
 *   │  [📋 Đề bài] [📖 Lý thuyết] [📊 Kết quả]  │ ← tab bar ngang
 *   │  ─────────────────────────────────────────  │
 *   │  <content area>                             │
 *   └─────────────────────────────────────────────┘
 *
 * Modes:
 *   practice : Đề bài + Lý thuyết + Kết quả + Phân tích
 *   exam     : Đề bài + Kết quả (không Lý thuyết)
 *   preview  : Như practice + inline edit cho teacher/admin
 *
 * @requires core/*, auth/session.js
 */
'use strict';

CL.define('Features.PracticeLayout', () => {

  const Events  = CL.require('Events');
  const Session = CL.require('Auth.Session');

  let _mode = 'practice'; // 'practice' | 'exam' | 'preview'
  let _built = false;

  // ── Public API ────────────────────────────────────────────────

  function init() {
    if (_built) return;
    _built = true;
    _buildTabBar();
    _bindEvents();
    setMode('practice');
  }

  function setMode(mode) {
    _mode = mode;
    const user = Session.get();
    const role = user?.role || 'student';

    // Tab Lý thuyết: ẩn trong exam mode
    const theoryTab = document.getElementById('plt-tab-theory');
    if (theoryTab) {
      theoryTab.style.display = (mode === 'exam') ? 'none' : '';
    }

    // Nút Sửa: chỉ hiện với teacher/admin trong practice/preview
    const canEdit = (role === 'teacher' || role === 'admin') && mode !== 'exam';
    document.querySelectorAll('.plt-edit-btn').forEach(btn => {
      btn.style.display = canEdit ? '' : 'none';
    });

    // Exam submit bar
    const examBar = document.getElementById('exam-submit-bar');
    if (examBar) examBar.style.display = mode === 'exam' ? '' : 'none';

    // Practice score history
    const hist = document.getElementById('practice-score-history');
    if (hist && mode === 'exam') hist.style.display = 'none';

    // Active tab: default to desc
    _activateTab('desc');

    Events.emit('practiceLayout:modeChanged', { mode });
  }

  function getMode() { return _mode; }

  function activateTab(tab) { _activateTab(tab); }

  // ── Build tab bar ─────────────────────────────────────────────

  function _buildTabBar() {
    const gp = document.getElementById('grade-panel');
    if (!gp) return;

    // Tạo tab bar mới (thay thế rp-inner-tabs cũ)
    const existing = document.getElementById('plt-tabbar');
    if (existing) existing.remove();

    const tabbar = document.createElement('div');
    tabbar.id = 'plt-tabbar';
    tabbar.className = 'plt-tabbar';
    tabbar.innerHTML = `
      <button class="plt-tab active" id="plt-tab-desc"
        onclick="CL.Features.PracticeLayout.activateTab('desc')">
        <span class="plt-tab-icon">📋</span>
        <span class="plt-tab-label">Đề bài</span>
      </button>
      <button class="plt-tab" id="plt-tab-theory"
        onclick="CL.Features.PracticeLayout.activateTab('theory')">
        <span class="plt-tab-icon">📖</span>
        <span class="plt-tab-label">Lý thuyết</span>
      </button>
      <button class="plt-tab" id="plt-tab-result"
        onclick="CL.Features.PracticeLayout.activateTab('result')">
        <span class="plt-tab-icon">📊</span>
        <span class="plt-tab-label">Kết quả</span>
        <span class="plt-tab-badge" id="plt-badge-result" style="display:none"></span>
      </button>
      <button class="plt-tab" id="plt-tab-analysis"
        onclick="CL.Features.PracticeLayout.activateTab('analysis')"
        style="display:none">
        <span class="plt-tab-icon">🔍</span>
        <span class="plt-tab-label">Phân tích</span>
        <span class="plt-tab-badge err" id="plt-badge-analysis" style="display:none"></span>
      </button>`;

    // Chèn tabbar làm phần tử đầu tiên của grade-panel
    // (thay thế rp-inner-tabbar cũ)
    const oldTabbar = document.getElementById('rp-inner-tabbar');
    if (oldTabbar) {
      oldTabbar.replaceWith(tabbar);
    } else {
      gp.insertBefore(tabbar, gp.firstChild);
    }

    // Thêm edit buttons vào Đề bài và Lý thuyết panes
    _upgradeEditBars();
  }

  function _upgradeEditBars() {
    // Đề bài: thêm nút Sửa inline
    const descBar = document.getElementById('desc-edit-bar');
    if (descBar && !descBar.querySelector('.plt-edit-btn')) {
      const btn = document.createElement('button');
      btn.className = 'plt-edit-btn teacher-only';
      btn.title = 'Soạn thảo đề bài (Canvas Editor)';
      btn.onclick = () => _openInlineEditor('desc');
      btn.innerHTML = '✏️ Sửa';
      descBar.appendChild(btn);
    }

    // Lý thuyết: thêm nút Sửa inline
    const theoryPane = document.getElementById('rp-pane-theory');
    if (theoryPane) {
      const editBar = theoryPane.querySelector('.rp-edit-bar');
      if (editBar && !editBar.querySelector('.plt-edit-btn')) {
        const btn = document.createElement('button');
        btn.className = 'plt-edit-btn teacher-only';
        btn.title = 'Soạn thảo lý thuyết (Canvas Editor)';
        btn.onclick = () => _openInlineEditor('theory');
        btn.innerHTML = '✏️ Sửa';
        editBar.appendChild(btn);
      }
    }
  }

  // ── Tab activation ────────────────────────────────────────────

  function _activateTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.plt-tab').forEach(btn => {
      btn.classList.toggle('active', btn.id === `plt-tab-${tab}`);
    });

    // Map tab → pane id
    const paneMap = {
      desc:     'rp-pane-desc',
      theory:   'rp-pane-theory',
      result:   'rp-pane-result',
      analysis: 'rp-pane-analysis',
    };

    document.querySelectorAll('.rp-tabpane').forEach(pane => {
      pane.classList.toggle('on', pane.id === paneMap[tab]);
    });

    // Compat: fire old rpTab event for result/analysis
    if (tab === 'result' || tab === 'analysis') {
      // Sync old rp-inner-tabs if still exist
      document.querySelectorAll('.rp-inner-tab').forEach(t => {
        t.classList.toggle('on', t.id === `rp-tab-${tab}`);
      });
    }
  }

  // ── Show/hide analysis tab ────────────────────────────────────

  function showAnalysisTab(errorCount) {
    const tab = document.getElementById('plt-tab-analysis');
    const badge = document.getElementById('plt-badge-analysis');
    if (tab) tab.style.display = '';
    if (badge && errorCount > 0) {
      badge.textContent = errorCount;
      badge.style.display = '';
    }
    // Auto-switch to result tab when grading
    _activateTab('result');
  }

  function showResultBadge(score) {
    const badge = document.getElementById('plt-badge-result');
    if (!badge) return;
    if (score !== null && score !== undefined) {
      badge.textContent = score.toFixed(1);
      badge.style.display = '';
      badge.className = 'plt-tab-badge ' + (score >= 8 ? 'ok' : score >= 5 ? 'warn' : 'err');
    } else {
      badge.style.display = 'none';
    }
  }

  function resetTabs() {
    // Ẩn analysis tab
    const analysisTab = document.getElementById('plt-tab-analysis');
    if (analysisTab) analysisTab.style.display = 'none';
    // Xóa badges
    document.querySelectorAll('.plt-tab-badge').forEach(b => { b.style.display = 'none'; });
    // Reset về desc
    _activateTab('desc');
  }

  // ── Inline editor ─────────────────────────────────────────────

  function _openInlineEditor(field) {
    // Delegate to existing openRichEditor
    if (typeof window.openRichEditor === 'function') {
      window.openRichEditor(field);
    }
  }

  // ── Events ────────────────────────────────────────────────────

  function _bindEvents() {
    // Khi chọn bài → về tab Đề bài
    Events.on('exercise:selected', () => {
      resetTabs();
      _activateTab('desc');
    });

    // Khi chấm điểm xong → show result + analysis
    Events.on('grading:complete', ({ score, errorCount }) => {
      showResultBadge(score);
      if (errorCount > 0) showAnalysisTab(errorCount);
      _activateTab('result');
    });

    // Mode changes từ exam
    Events.on('mode:exam-entered', () => setMode('exam'));
    Events.on('mode:practice-entered', () => setMode('practice'));
  }

  // ── Backward compat ───────────────────────────────────────────
  window.rpTab = function(tab) { _activateTab(tab); };

  return {
    init, setMode, getMode, activateTab,
    showAnalysisTab, showResultBadge, resetTabs,
  };
});

// ─── js/app.js ───────────────────────────
/**
 * app.js — Application Bootstrap (Entry Point)
 * PHẢI LOAD CUỐI CÙNG. Không chứa business logic.
 * @requires TẤT CẢ các module khác
 */
'use strict';

(function bootstrap() {
  const Store    = CL.require('Store');
  const Events   = CL.require('Events');
  const Dropdown = CL.require('UI.Dropdown');
  const Toast    = CL.require('UI.Toast');
  const Registry = CL.require('Exercises.Registry');

  // ── Event wiring ─────────────────────────────────────────────
  Events.on('exercise:selected', ({ exercise }) => {
    Store.set('currentExId',   exercise.id);
    Store.set('currentExType', exercise.type || 'python');
    _showDesc(exercise);    // update floating ex-desc bar
    _routeEditor(exercise); // mount correct editor (python/html/sql)
    // Anti-cheat chỉ bật trong exam mode, KHÔNG bật khi luyện tập
    // CL.Features.AntiCheat?.enable(); ← disabled for practice
    // Reset grade results
    const rv = document.getElementById('rv'); if (rv) rv.textContent = '—';
    const sg = document.getElementById('sg');
    if (sg) { sg.textContent = 'Chưa chấm'; sg.style.color = 'var(--text3)'; }
    const rf = document.getElementById('ring-fill');
    if (rf) { rf.style.strokeDashoffset = '270'; rf.style.stroke = ''; }
    const lr = document.getElementById('lr');
    if (lr) lr.innerHTML = '<div class="empty"><div class="empty-i">📋</div>Nhấn <b>Chấm điểm</b> để xem kết quả</div>';
    ['sp','sf','ss'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '—'; });
  });

  Events.on('exercise:cleared', () => {
    Store.set('currentExId',   '');
    Store.set('currentExType', '');
    document.getElementById('ex-desc')?.classList.remove('show');
    const gp = document.getElementById('grade-panel');
    if (gp) {
      // Reset grade panel to initial state (keep tab structure)
      const rv = document.getElementById('rv'); if (rv) rv.textContent = '—';
      const sg = document.getElementById('sg'); if (sg) { sg.textContent='Chưa chấm'; sg.style.color='var(--text3)'; }
      const sp = document.getElementById('sp'); if (sp) sp.textContent='—';
      const sf = document.getElementById('sf'); if (sf) sf.textContent='—';
      const lr = document.getElementById('lr');
      if (lr) lr.innerHTML='<div class="empty"><div class="empty-i">📋</div>Nhấn <b>Chấm điểm</b> để xem kết quả</div>';
      const ring = document.getElementById('ring-fill');
      if (ring) { ring.style.strokeDashoffset='270'; ring.style.stroke=''; }
    }
  });

  // ── Exam mode event wiring ───────────────────────────────────
  Events.on('mode:exam-entered', ({ exam }) => {
    _setExamMode(true);
    CL.Features.PracticeLayout?.setMode('exam');
    document.body.classList.add('mode-exam');
    Store.set('currentExamId', exam?.id || '');
    _examScores = {};
    // Hide practice toolbar, show exam toolbar
    const pb = document.getElementById('toolbar-practice');
    const eb = document.getElementById('toolbar-exam');
    if (pb) pb.style.display = 'none';
    if (eb) eb.style.display = '';
    _updateExamProgress();
  });

  Events.on('mode:practice-entered', () => {
    _setExamMode(false);
    CL.Features.PracticeLayout?.setMode('practice');
    document.body.classList.remove('mode-exam');
    Store.set('currentExamId', '');
    _examScores = {};
  });

  // After exam:submitted — restore practice UI
  Events.on('exam:submitted', ({ diemFinal, exam }) => {
    // ExamMode replaced document.body.innerHTML — need full page reload
    // to restore the SPA shell cleanly
    setTimeout(() => {
      if (confirm(`✅ Điểm thi: ${diemFinal}/10
Tải lại trang để về giao diện luyện tập?`)) {
        window.location.reload();
      }
    }, 2000);
  });

  Events.on('auth:login', ({ user }) => {
    // Hiện app shell sau khi đăng nhập thành công
    document.body.classList.remove('auth-pending');
    const shell = document.getElementById('app-shell');
    if (shell) shell.style.removeProperty('display');

    // Init sidebar navigation (Canvas-style)
    CL.Features.Sidebar?.init(user.role);

    // Init panel resizers (drag to resize)
    CL.UI.Resizer?.init();

    // Init practice layout (tab bar + modes)
    CL.Features.PracticeLayout?.init();

    // Update user badge in topbar
    const area = document.getElementById('user-badge-area');
    if (area && !document.getElementById('user-badge')) {
      const isAdmin = user.role === 'admin';
      const isTeacher = user.role === 'teacher' || isAdmin;
      const icon = isAdmin ? '⚡' : isTeacher ? '👨‍🏫' : '🎓';
      area.innerHTML = `<div id="user-badge">
        <span class="ubadge ${user.role}">${icon}</span>
        <span class="uname">${CL.require('Utils').escHtml(user.name)}${user.lop ? ' · '+user.lop : ''}</span>
        <button class="u-profile-btn" onclick="CL.Features.Profile?.open()" title="Hồ sơ">👤</button>
      </div>`;
    }

    // Student: check exam
    if (user.role === 'student') {
      CL.Features.ModeManager?.init();
      _loadActiveExam(user);
    }

    // Chỉ Admin mới thấy setup wizard
    if (user.role === 'admin') {
      setTimeout(() => CL.Features.Setup?.checkAndShow(), 1500);
    }

    // content-bar visibility: do sidebar.navigate() quyết định (chỉ hiện khi Luyện tập)

    // sidebar.navigate() đã xử lý show/hide workspace-view qua _showSection()
    // Không can thiệp thêm ở đây để tránh conflict.

    // ── FIX: Mobile — init editor panel as active on first load ───
    if (window.innerWidth <= 768) {
      const edPanel  = document.getElementById('editor-panel');
      const outPanel = document.getElementById('output-panel');
      const grPanel  = document.getElementById('grade-panel');
      if (edPanel)  { edPanel.classList.add('mob-active');     edPanel.style.display  = ''; }
      if (outPanel) { outPanel.classList.remove('mob-active'); outPanel.style.display = 'none'; }
      if (grPanel)  { grPanel.classList.remove('mob-active');  grPanel.style.display  = 'none'; }
      const mnEditor = document.getElementById('mnav-editor');
      const mnOutput = document.getElementById('mnav-output');
      const mnGrade  = document.getElementById('mnav-grade');
      if (mnEditor) mnEditor.classList.add('on');
      if (mnOutput) mnOutput.classList.remove('on');
      if (mnGrade)  mnGrade.classList.remove('on');
    }

    Toast.success('Xin chào, ' + user.name + '!', 2500);
    CL.API.logAccess('login', user.role);
  });

  // ── Dropdown init ─────────────────────────────────────────────
  Dropdown.init();

  // ── Theme init ──────────────────────────────────────────────
  // Init immediately for early theme application
  CL.Features.Theme?.init();

  // ── Auth start ───────────────────────────────────────────────
  // Auth: fires after login OR valid session restore
  CL.Auth.UI.init(function onAuthReady(user) {
    document.documentElement.classList.remove('auth-required');
    document.body.classList.remove('auth-pending');
    const shell = document.getElementById('app-shell');
    if (shell) {
      shell.style.removeProperty('display');
      shell.style.removeProperty('visibility');
    }
  });

  // ── Private helpers ───────────────────────────────────────────
  function _routeEditor(exercise) {
    const type = exercise.type || 'python';
    if (type !== 'html') CL.Editors.Html?.unmount();
    if (type !== 'sql')  CL.Editors.Sql?.unmount();
    if (type === 'html') setTimeout(() => CL.Editors.Html?.mount(exercise), 30);
    else if (type === 'sql') setTimeout(() => CL.Editors.Sql?.mount(exercise), 30);
    else {
      const ws = document.getElementById('workspace');
      if (ws && ws.dataset.mode) ws.dataset.mode = '';
    }
    // Update editor panel title
    const labelMap = { python: 'Code Editor — Python', html: 'Code Editor — HTML/CSS', sql: 'Code Editor — SQL' };
    const lbl = document.getElementById('editor-lang-label');
    if (lbl) lbl.textContent = labelMap[type] || 'Code Editor';
  }

  function _showDesc(exercise) {
    // Update floating ex-desc bar (above workspace)
    const titleEl = document.getElementById('ex-desc-title');
    if (titleEl) titleEl.textContent = (exercise.num ? exercise.num + '. ' : '') + (exercise.title || '');
    const bodyEl = document.getElementById('ex-desc-body');
    if (bodyEl) bodyEl.innerHTML = exercise.desc || '';
    const gt = document.getElementById('ex-desc-grade-tag');
    if (gt) { gt.textContent = exercise.g || ''; gt.className = 'ex-tag ' + (exercise.g||'').toLowerCase(); }
    const ct = document.getElementById('ex-desc-chap-tag');
    if (ct) ct.textContent = exercise.ch || '';
    // Don't auto-show the floating desc bar — user opens via tab now
  }

  async function _loadActiveExam(user) {
    if (!CL.API.isReady()) return;
    try {
      const exams  = await CL.API.getExams();
      const active = exams.find(e => {
        if (e.trang_thai !== 'active') return false;
        // No class restriction → open to all
        const ids = Array.isArray(e.lop_ids) && e.lop_ids.length ? e.lop_ids
          : (e.lop||'').split(',').map(s=>s.trim()).filter(Boolean);
        return ids.length === 0 || ids.includes(user.lop);
      });
      if (active) _showExamBanner(active);
    } catch {}
  }

  function _showExamBanner(exam) {
    const b = document.getElementById('exam-banner');
    if (!b) return;
    b.style.display = 'flex';
    b.classList.add('show');

    const startExam = () => CL.Features.ExamMode?.start(exam);
    window._pendingExam = exam;

    b.innerHTML = `
      <div class="eb-left">
        <span class="eb-icon">📋</span>
        <div>
          <div class="eb-title">${Utils.escHtml(exam.ten)}</div>
          <div class="eb-meta">
            ${exam.thoi_gian_phut ? `⏱ ${exam.thoi_gian_phut} phút` : ''}
            ${exam.mat_khau ? ' · 🔐 Có mã vào' : ''}
          </div>
        </div>
      </div>
      <div class="eb-right">
        <span class="eb-cd" id="eb-cd"></span>
        <button class="eb-start-btn" onclick="CL.Features.ExamMode?.start(window._pendingExam)">
          Vào thi ngay →
        </button>
      </div>`;

    // Countdown to close time
    if (exam.gio_dong) {
      const [hh, mm] = exam.gio_dong.split(':').map(Number);
      const now  = new Date();
      const end  = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0);
      const tick = () => {
        const r   = Math.max(0, Math.floor((end - Date.now()) / 1000));
        const el  = document.getElementById('eb-cd');
        if (el) el.textContent = r > 0
          ? `Còn ${Math.floor(r/3600) ? Math.floor(r/3600)+'h ' : ''}${Math.floor((r%3600)/60)}:${String(r%60).padStart(2,'0')}`
          : 'Hết giờ';
        if (r > 0) setTimeout(tick, 1000);
      };
      tick();
    }
  }

  // ── Global bridges for HTML onclick handlers ──────────────────
  window.cddOpen   = w    => Dropdown.open(w);
  window.cddSelect = (w,v)=> Dropdown.select(w,v);
  window.cddClose  = ()   => {
    document.getElementById('cdd-overlay')?.classList.remove('show');
    document.getElementById('cdd-popup')?.classList.remove('show');
  };

  // ── Tab system: delegate to PracticeLayout ──────────────────
  window.rpTab = function(tab) {
    if (CL.Features?.PracticeLayout) {
      CL.Features.PracticeLayout.activateTab(tab);
    } else {
      // Fallback nếu PracticeLayout chưa init
      document.querySelectorAll('.rp-tabpane').forEach(p => p.classList.remove('on'));
      const paneEl = document.getElementById('rp-pane-' + tab);
      if (paneEl) paneEl.classList.add('on');
    }
  };

  // Backward compat
  window.rpToggle = window.rpExpand = function(section) {
    const map = { criteria:'desc', theory:'theory', results:'result' };
    window.rpTab(map[section] || section);
  };
  window.switchTab = (tab) => {
    const map = { criteria:'desc', theory:'theory', results:'result' };
    window.rpTab(map[tab] || tab);
  };
  window.closeDesc = () => document.getElementById('ex-desc')?.classList.remove('show');

  // ── Exam mode state ───────────────────────────────────────────
  let _isExamMode = false;
  let _examScores = {};  // { exId: score }

  function _setExamMode(active) {
    _isExamMode = active;
    const pb = document.getElementById('toolbar-practice');
    const eb = document.getElementById('toolbar-exam');
    const theoryTab = document.getElementById('rp-tab-theory');
    const submitBar = document.getElementById('exam-submit-bar');
    if (pb) pb.style.display = active ? 'none' : '';
    if (eb) eb.style.display = active ? '' : 'none';
    if (theoryTab) theoryTab.style.display = active ? 'none' : '';
    if (submitBar) submitBar.style.display = active ? '' : 'none';
    // If was on theory tab and entering exam, switch to desc
    if (active) window.rpTab('desc');
  }

  // ── Unified async grade entry point ──────────────────────────
  window.gradeCode = window.gradeHTML = window.gradeSQL = async function() {
    const type = Store.get('currentExType') || 'python';
    const exId = Store.get('currentExId');
    const user = Store.get('currentUser');
    if (!exId) { Toast.warn('Vui lòng chọn bài tập trước'); return; }

    // Show loading in result tab
    window.rpTab('result');
    const lr = document.getElementById('lr');
    if (lr) lr.innerHTML = `
      <div class="grade-loading">
        <div class="grade-loading-spinner"></div>
        <div class="grade-loading-msg">Đang chấm điểm...</div>
        <div class="grade-loading-sub">${type === 'python' ? 'Đang chạy Python...' : type === 'sql' ? 'Đang thực thi SQL...' : 'Đang kiểm tra HTML...'}</div>
      </div>`;

    try {
      let result;
      if (type === 'html') {
        result = CL.Graders.Html.grade(CL.Editors.Html.getCode(), exId);
      } else if (type === 'sql') {
        result = await CL.Graders.Sql.grade(CL.Editors.Sql.getCode(), exId);
      } else {
        const code   = document.getElementById('code-input')?.value || '';
        const output = document.getElementById('out')?.textContent || '';
        result = await CL.Graders.Python.grade(code, output, exId);
      }

      // Render results
      _renderGradeResult(result, type);

      // Save score
      if (user?.role === 'student') {
        if (_isExamMode) {
          _examScores[exId] = result.score;
          _updateExamProgress();
          // Don't submit yet — wait for examSubmitAll
        } else {
          // Practice mode: submit as practice score
          CL.API.submitPracticeScore(exId, result.exercise?.title || '', result.score);
          CL.API.logAccess('grade_practice', exId + ':' + result.score);
          _updatePracticeHistory(exId, result.score);
        }
      }

      // Thông báo PracticeLayout cập nhật tabs + badges
      const errCount = (result.results||[]).filter(r => !r.passed).length;
      CL.Features.PracticeLayout?.showResultBadge(result.score);
      if (errCount > 0) CL.Features.PracticeLayout?.showAnalysisTab(errCount);
      else CL.Features.PracticeLayout?.activateTab('result');

      // Show analysis tab badge if there are errors
      const hasFails = result.results?.some(r => !r.passed) || false;
      _renderAnalysis(result, type);
      // Analysis tab: show with fail count badge when there are errors
      const analysisTab = document.getElementById('rp-tab-analysis');
      const analysisBadge = document.getElementById('analysis-badge');
      if (analysisTab) {
        const failCount = result.results?.filter(r => !r.passed).length || 0;
        analysisTab.style.display = hasFails ? '' : 'none';
        if (analysisBadge) {
          analysisBadge.style.display = hasFails && failCount ? '' : 'none';
          analysisBadge.textContent = failCount || '';
        }
      }

    } catch(e) {
      Toast.error('❌ ' + e.message);
      if (lr) lr.innerHTML = `<div class="empty"><div class="empty-i">❌</div>${e.message}</div>`;
    }
  };

  // ── Rich editor integration ───────────────────────────────────
  window.openRichEditor = async function(field) {
    const exId = Store.get('currentExId');
    if (!exId) { Toast.warn('Chọn bài tập trước'); return; }

    const contentId = field === 'desc' ? 'desc-content' : 'theory-content';
    const paneId    = field === 'desc' ? 'rp-pane-desc' : 'rp-pane-theory';
    const el = document.getElementById(contentId);
    const currentHtml = el ? el.innerHTML : '';

    window.rpTab(field === 'desc' ? 'desc' : 'theory');

    if (!CL.Editors?.RichText) {
      Toast.error('Rich editor chưa tải'); return;
    }

    await CL.Editors.RichText.mount(contentId, currentHtml, async (html) => {
      // Update DOM immediately so teacher sees result right away
      const domEl = document.getElementById(contentId);
      if (domEl) {
        domEl.innerHTML = html;
        CL.Editors?.RichText?.renderMath(domEl);
      }
      // Save to server
      if (CL.API.isReady()) {
        try {
          await CL.API.saveExerciseContent(exId, field, html);
          Toast.success('✅ Đã lưu vào hệ thống!');
        } catch(e) {
          Toast.error('❌ Lỗi lưu: ' + e.message);
          // Revert DOM on error
          if (domEl) domEl.innerHTML = currentHtml;
          throw e;
        }
      } else {
        // Offline mode: save to localStorage
        localStorage.setItem('cl_content_' + exId + '_' + field, html);
        Toast.info('💾 Đã lưu offline (sẽ đồng bộ khi có mạng)');
      }
    });
  };

  // ── Exam: submit all & show stats ─────────────────────────────
  window.examSubmitAll = async function() {
    const user = Store.get('currentUser');
    if (!user) return;

    const registry = CL.require('Exercises.Registry');
    const rows = Object.entries(_examScores).map(([exId, score]) => {
      const ex = registry.findById(exId);
      return { exId, title: ex?.title || exId, type: ex?.type || 'python', score };
    });

    if (!rows.length) { Toast.warn('Chưa có bài nào được chấm'); return; }

    // Submit all scores to server
    const kyKtId = Store.get('currentExamId') || '';
    for (const row of rows) {
      CL.API.submitScore(row.exId, row.title, row.score, 0, kyKtId);
    }
    CL.API.logAccess('exam_submit', kyKtId);

    // Show modal
    _showExamResultModal(rows);
  };

  function _showExamResultModal(rows) {
    const modal = document.getElementById('exam-result-modal');
    const body  = document.getElementById('exam-modal-body');
    const total = document.getElementById('exam-modal-total');
    if (!modal || !body) return;

    const sum = rows.reduce((s,r) => s + r.score, 0);
    const avg = rows.length ? Math.round(sum / rows.length * 10) / 10 : 0;

    const typeIcon = { python:'🐍', sql:'🗃', html:'🌐' };
    body.innerHTML = rows.map(row => {
      const cls = row.score >= 8 ? 'high' : row.score >= 5 ? 'mid' : 'low';
      const icon = row.score >= 8 ? '🏆' : row.score >= 5 ? '✅' : '❌';
      return `<div class="exam-result-row ${cls}">
        <div>
          <div class="err-title">${row.title}</div>
          <div class="err-type">${typeIcon[row.type]||'📝'} ${row.type.toUpperCase()}</div>
        </div>
        <div class="err-score ${cls}">${row.score}</div>
        <div class="err-badge">${icon}</div>
      </div>`;
    }).join('');

    if (total) total.innerHTML = `${avg} <small style="font-size:13px;color:var(--text3)">/ 10 (TB)</small>`;
    modal.style.display = 'flex';
  }

  function _updateExamProgress() {
    const el = document.getElementById('exam-prog-text');
    if (!el) return;
    const done = Object.keys(_examScores).length;
    el.textContent = done + ' bài đã chấm';
  }

  function _updatePracticeHistory(exId, score) {
    const key = 'cl_best_' + exId;
    const best = parseFloat(localStorage.getItem(key) || '0');
    if (score > best) localStorage.setItem(key, score);

    const bar = document.getElementById('practice-score-history');
    const bestEl = document.getElementById('psh-best');
    const curEl  = document.getElementById('psh-current');
    if (bar && bestEl && curEl) {
      bar.style.display = '';
      bestEl.textContent = Math.max(score, best).toFixed(1);
      curEl.textContent  = score.toFixed(1);
    }
  }

  window.toast = (msg, ms) => Toast.show(msg, 'info', ms);

  // ── Exam mode events ─────────────────────────────────────────

  // B1 FIX: Connect ModeManager → app grading context
  Events.on('mode:exam-entered', ({ exam }) => {
    _setExamMode(true);
    CL.Features.PracticeLayout?.setMode('exam');
    document.body.classList.add('mode-exam');
    _examScores = {};                         // reset per-exam scores
    Store.set('currentExamId', exam?.id || '');
    // Hide theory tab during exam
    const theoryTab = document.getElementById('rp-tab-theory');
    if (theoryTab) theoryTab.style.display = 'none';
    // Show exam toolbar, hide practice toolbar
    const tb = document.getElementById('toolbar-practice');
    const te = document.getElementById('toolbar-exam');
    if (tb) tb.style.display = 'none';
    if (te) te.style.display = '';
    // Show exam submit bar
    const esb = document.getElementById('exam-submit-bar');
    if (esb) esb.style.display = '';
  });

  // B7 FIX: Restore UI after exam submit
  Events.on('exam:submitted', () => {
    _setExamMode(false);
    _examScores = {};
    Store.set('currentExamId', '');
    // ExamMode replaces body.innerHTML — page reload is cleanest restore
    setTimeout(() => window.location.reload(), 3500);
  });

  Events.on('mode:practice-entered', () => {
    _setExamMode(false);
    CL.Features.PracticeLayout?.setMode('practice');
    document.body.classList.remove('mode-exam');
    _examScores = {};
  });

  // ── Code execution globals ────────────────────────────────────

  let _inputResolve = null;

  window.clearOut = function() {
    const el = document.getElementById('out');
    if (el) el.innerHTML = '<span class="o-p">// Output sẽ hiển thị tại đây sau khi nhấn Chạy code…</span>';
  };

  window.appendOut = function(text, cls = 'o-n') {
    const el = document.getElementById('out');
    if (!el) return;
    const prompt = el.querySelector('.o-p'); if (prompt) prompt.remove();
    const span = document.createElement('span'); span.className = cls;
    span.textContent = text; el.appendChild(span); el.scrollTop = el.scrollHeight;
  };

  window.submitInput = function() {
    const val = document.getElementById('input-field')?.value || '';
    document.getElementById('input-overlay')?.classList.remove('show');
    window.appendOut(val + '\n', 'o-n');
    if (_inputResolve) { _inputResolve(val); _inputResolve = null; }
  };

  // Wire input field Enter key
  document.getElementById('input-field')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') window.submitInput();
  });

  function _askInput(promptText) {
    return new Promise(resolve => {
      _inputResolve = resolve;
      const pr = document.getElementById('input-prompt');
      if (pr) pr.textContent = promptText || '▶ Nhập giá trị:';
      const inp = document.getElementById('input-field');
      if (inp) { inp.value = ''; }
      document.getElementById('input-overlay')?.classList.add('show');
      setTimeout(() => inp?.focus(), 100);
    });
  }

  function _sanitizeCode(code) {
    return (code || '')
      .replace(/[\u201c\u201d\u201e\u201f\u00ab\u00bb]/g, '"')
      .replace(/[\u2018\u2019\u201a\u201b]/g, "'")
      .replace(/[\u200b\u200c\u200d\u200e\u200f\ufeff\u00ad]/g, '')
      .replace(/\u00a0/g, ' ')
      .replace(/\uff1a/g, ':')
      .replace(/\uff08/g, '(').replace(/\uff09/g, ')');
  }

  function _extractInputPrompts(code) {
    const prompts = [];
    const re = /\binput\s*\(\s*(['"\`])((?:[^\\]|\\.)*?)\1\s*\)/g;
    const positions = new Set();
    let m;
    while ((m = re.exec(code)) !== null) { prompts.push(m[2]); positions.add(m.index); }
    const re2 = /\binput\s*\(\s*\)/g;
    let m2;
    while ((m2 = re2.exec(code)) !== null) {
      if (!positions.has(m2.index)) prompts.push('');
    }
    return prompts;
  }

  window.runCode = async function() {
    const code = _sanitizeCode(CL.Editors.Python?.getCode() || document.getElementById('code-input')?.value || '');
    if (!code.trim()) { Toast.warn('Vui lòng nhập code'); return; }
    window.clearOut();

    const inputPrompts = _extractInputPrompts(code);
    const inputs = [];
    for (let i = 0; i < inputPrompts.length; i++) {
      const val = await _askInput(inputPrompts[i] || `Nhập giá trị cho input() thứ ${i+1}:`);
      inputs.push(val);
    }

    let inputIdx = 0;
    try {
      const toks   = PyInterp.tokenize(code);
      const parser = new PyInterp.Parser(toks);
      const ast    = parser.parse();
      const interp = new PyInterp.Interp(
        (text, isErr) => window.appendOut(text, isErr ? 'o-e' : 'o-n'),
        (prompt) => {
          if (inputIdx < inputs.length) {
            const val = inputs[inputIdx++];
            if (prompt) window.appendOut(prompt, 'o-n');
            window.appendOut(val + '\n', 'o-p');
            return val;
          }
          if (prompt) window.appendOut(prompt, 'o-n');
          return '';
        }
      );
      const r = interp.run(ast);
      if (r && r.e) window.appendOut('\n' + r.e.toString() + '\n', 'o-e');
    } catch(e) {
      window.appendOut('\n' + (e instanceof PyInterp.PyErr ? e.toString() : 'RuntimeError: ' + (e.message || String(e))) + '\n', 'o-e');
    }
  };

  window.runAndGrade = async function() {
    await window.runCode();
    await window.gradeCode();
  };

  window.clearAll = function() {
    const ci = document.getElementById('code-input');
    if (ci) { ci.value = ''; }
    if (typeof CL.Editors.Python?.setCode === 'function') CL.Editors.Python.setCode('');
    window.clearOut();
    // Reset grade panel
    const rv = document.getElementById('rv'); if (rv) rv.textContent = '—';
    const sg = document.getElementById('sg'); if (sg) { sg.textContent = 'Chưa chấm'; sg.style.color = 'var(--text3)'; }
    ['sp','sf','ss'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '—'; });
    const lr = document.getElementById('lr');
    if (lr) lr.innerHTML = '<div class="empty"><div class="empty-i">📋</div>Nhấn <b>Chấm điểm</b> để xem kết quả</div>';
    const rf = document.getElementById('ring-fill');
    if (rf) { rf.style.strokeDashoffset = '270'; rf.style.stroke = ''; }
    if (typeof CL.Editors.Python?.updateHighlight === 'function') CL.Editors.Python.updateHighlight();
    if (typeof window.updLN === 'function') window.updLN();
  };

  console.info('[' + CL.appName + '] Bootstrap — ' + Registry.count() + ' bài tập');

  // ── Render grade result in result tab ───────────────────────
  function _renderGradeResult(result, type) {
    const rv   = document.getElementById('rv');
    const sg   = document.getElementById('sg');
    const sp   = document.getElementById('sp');
    const sf   = document.getElementById('sf');
    const ss   = document.getElementById('ss');
    const lr   = document.getElementById('lr');
    const rf   = document.getElementById('ring-fill');

    const score = result.score ?? 0;
    if (rv) rv.textContent = score.toFixed(1);
    if (sg) {
      const grade = score >= 9 ? '🏆 Xuất sắc' : score >= 8 ? '✅ Giỏi' : score >= 6.5 ? '👍 Khá' : score >= 5 ? '⚠️ Trung bình' : '❌ Yếu';
      sg.textContent = grade;
      sg.style.color = score >= 8 ? 'var(--accent2)' : score >= 5 ? 'var(--warn)' : 'var(--error)';
    }

    const results = result.results || [];
    const passed  = results.filter(r => r.passed).length;
    const failed  = results.filter(r => !r.passed).length;
    const skipped = 0;
    if (sp) sp.textContent = passed;
    if (sf) sf.textContent = failed;
    if (ss) ss.textContent = skipped;

    // Ring animation
    if (rf) {
      const offset = 270 - (score / 10) * 270;
      rf.style.strokeDashoffset = offset;
      rf.style.stroke = score >= 8 ? 'var(--accent2)' : score >= 5 ? 'var(--warn)' : 'var(--error)';
    }

    // Detail rows
    if (lr) {
      if (!results.length) { lr.innerHTML = '<div class="empty"><div class="empty-i">📋</div>Không có tiêu chí nào</div>'; return; }

      if (result.mode === 'testcase') {
        lr.innerHTML = results.map((r, i) => `
          <div class="lr-item ${r.passed ? 'pass' : 'fail'}">
            <span class="lr-icon">${r.passed ? '✅' : '❌'}</span>
            <div class="lr-body">
              <div class="lr-desc">${r.desc || 'Test ' + (i+1)}</div>
              <div class="lr-pts">${r.earned}/${r.pts} điểm</div>
              ${!r.passed && r.error ? '<div class="lr-err">' + _esc(r.error.slice(0,80)) + '</div>' : ''}
            </div>
          </div>`).join('');
      } else if (result.mode === 'sql-real') {
        lr.innerHTML = results.map(r => `
          <div class="lr-item ${r.passed ? 'pass' : 'fail'}">
            <span class="lr-icon">${r.passed ? '✅' : '❌'}</span>
            <div class="lr-body">
              <div class="lr-desc">${r.desc}</div>
              <div class="lr-pts">${r.earned}/${r.pts} điểm</div>
            </div>
          </div>`).join('');
      } else {
        lr.innerHTML = results.map(r => `
          <div class="lr-item ${r.passed ? 'pass' : 'fail'}">
            <span class="lr-icon">${r.passed ? '✅' : '❌'}</span>
            <div class="lr-body">
              <div class="lr-desc">${r.desc || r.mo_ta || ''}</div>
              <div class="lr-pts">${r.earned}/${r.pts || r.diem || 0} điểm</div>
            </div>
          </div>`).join('');
      }

      // Show solution if score low
      if (result.showSolution && result.exercise?.solution) {
        lr.innerHTML += `
          <div style="margin-top:12px;padding:10px 12px;background:rgba(79,158,255,.08);border:1px solid rgba(79,158,255,.2);border-radius:8px">
            <div style="font-size:11px;font-weight:700;color:var(--accent);margin-bottom:6px">💡 Gợi ý đáp án</div>
            <pre style="font-family:var(--mono);font-size:12px;color:var(--editor-fg,#d4d4d4);overflow-x:auto;white-space:pre-wrap">${_esc(result.exercise.solution)}</pre>
          </div>`;
      }
    }
  }

  function _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Render analysis tab ───────────────────────────────────────
  function _renderAnalysis(result, type) {
    const body = document.getElementById('analysis-body');
    const sub  = document.getElementById('analysis-subtitle');
    const sqlDiff = document.getElementById('sql-diff');
    if (!body) return;

    const fails = (result.results || []).filter(r => !r.passed);
    if (sub) sub.textContent = fails.length + ' vấn đề cần chú ý';

    // SQL: show table diff
    if (type === 'sql' && result.mode === 'sql-real' && sqlDiff) {
      sqlDiff.style.display = '';
      document.getElementById('sql-expected-table').innerHTML = _renderSqlTable(result.expectedColumns, result.expectedRows);
      document.getElementById('sql-actual-table').innerHTML   = _renderSqlTable(result.studentColumns,  result.studentRows);
    } else if (sqlDiff) { sqlDiff.style.display = 'none'; }

    if (!fails.length) {
      body.innerHTML = '<div class="empty"><div class="empty-i">🎉</div>Tất cả tiêu chí đều đạt!</div>';
      return;
    }

    body.innerHTML = fails.map(r => {
      let extra = '';
      if (r.input !== undefined) {
        extra = `<div class="analysis-io">
          <div><span class="aio-label">Input:</span> ${_esc(r.input || '(không có)')}</div>
          <div><span class="aio-label">Mong đợi:</span> <span class="aio-expected">${_esc(r.expected || '')}</span></div>
          <div><span class="aio-label">Nhận được:</span> <span class="aio-actual">${_esc(r.actual || r.error || '')}</span></div>
        </div>`;
      } else if (r.errorDetail) {
        extra = `<div class="analysis-hint">💡 ${_esc(r.errorDetail)}</div>`;
      }
      return `<div class="analysis-item fail">
        <span class="analysis-icon">❌</span>
        <div class="analysis-content">
          <div class="analysis-desc">${r.desc || r.mo_ta || ''}</div>
          <div class="analysis-pts">0/${r.pts || r.diem || 0} điểm</div>
          ${extra}
          ${r.hint ? '<div class="analysis-hint">💡 ' + _esc(r.hint) + '</div>' : ''}
        </div>
      </div>`;
    }).join('');
  }

  function _renderSqlTable(columns, rows) {
    if (!columns || !columns.length) return '<div style="padding:8px;color:var(--text3);font-size:12px">(trống)</div>';
    const esc = s => String(s===null?'NULL':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<table class="sql-result-table">
      <thead><tr>${columns.map(c => '<th>'+esc(c)+'</th>').join('')}</tr></thead>
      <tbody>${(rows||[]).slice(0,50).map(row =>
        '<tr>' + (row||[]).map(v => '<td>'+esc(v)+'</td>').join('') + '</tr>'
      ).join('')}</tbody>
    </table>` + (rows.length > 50 ? '<div style="font-size:11px;color:var(--text3);padding:4px">...và ' + (rows.length-50) + ' dòng khác</div>' : '');
  }

  // ── Exercise selected: update desc/theory content ─────────────
  Events.on('exercise:selected', ({ exercise }) => {
    Store.update({ currentExId: exercise.id });

    const descEl   = document.getElementById('desc-content');
    const theoryEl = document.getElementById('theory-content');

    // Sau khi hiện nội dung tĩnh xong, fetch nội dung đã chỉnh sửa từ server
    if (CL.API.isReady() && exercise.id) {
      CL.API.getExerciseDetail(exercise.id).then(detail => {
        if (detail?.desc_override && descEl) {
          descEl.innerHTML = detail.desc_override;
          CL.Editors?.RichText?.renderMath(descEl);
        }
        if (detail?.ly_thuyet && theoryEl) {
          theoryEl.innerHTML = detail.ly_thuyet;
          CL.Editors?.RichText?.renderMath(theoryEl);
        }
      }).catch(() => {});   // silent fail — nội dung tĩnh đã hiển thị rồi
    }

    // Update desc tab — include rubric/error hints under desc
    if (descEl) {
      let html = exercise.desc || '';
      // Add rubric display below desc
      if ((exercise.rb||[]).length) {
        html += `<div class="ex-rubric-box">
          <div class="ex-rub-title">📋 Tiêu chí chấm điểm</div>
          ${exercise.rb.map(rb=>`<div class="ex-rub-item">
            <span class="ex-rub-desc">${rb.desc||rb.mo_ta||''}</span>
            <span class="ex-rub-pts">${rb.pts||rb.diem||0}đ</span>
          </div>`).join('')}
        </div>`;
      }
      // Add common errors
      if ((exercise.errors||[]).length) {
        html += `<div class="ex-errors-box">
          <div class="ex-err-title">⚠️ Lỗi hay gặp</div>
          <ul>${exercise.errors.map(e=>'<li>'+e+'</li>').join('')}</ul>
        </div>`;
      }
      descEl.innerHTML = html || '<div class="criteria-empty"><div class="ci-icon">📚</div><div>Chọn bài tập để xem đề bài.</div></div>';
    }
    // Update theory tab
    if (theoryEl) {
      theoryEl.innerHTML = exercise.theory || '<div class="theory-empty"><div class="ci-icon">📖</div><div>Không có lý thuyết.</div></div>';
    }
    // Update desc edit bar title
    const titleEl = document.getElementById('desc-ex-title');
    if (titleEl) titleEl.textContent = (exercise.num ? exercise.num + '. ' : '') + (exercise.title || '');
    // Switch to desc tab when exercise selected
    window.rpTab('desc');
    // Render math formulas in desc and theory content (non-blocking)
    setTimeout(() => {
      CL.Editors?.RichText?.renderMath(descEl);
      CL.Editors?.RichText?.renderMath(theoryEl);
    }, 100);
    // Reset analysis tab
    const analysisTab = document.getElementById('rp-tab-analysis');
    if (analysisTab) analysisTab.style.display = 'none';
    // Reset practice history
    const bar = document.getElementById('practice-score-history');
    if (bar) {
      const best = parseFloat(localStorage.getItem('cl_best_' + exercise.id) || '0');
      if (best > 0) {
        bar.style.display = '';
        const bestEl = document.getElementById('psh-best');
        if (bestEl) bestEl.textContent = best.toFixed(1);
        const curEl  = document.getElementById('psh-current');
        if (curEl)  curEl.textContent  = '—';
      } else {
        bar.style.display = 'none';
      }
    }
    // Load offline override if any
    const offlineDesc   = localStorage.getItem('cl_content_' + exercise.id + '_desc');
    const offlineTheory = localStorage.getItem('cl_content_' + exercise.id + '_theory');
    if (offlineDesc   && descEl)   descEl.innerHTML   = offlineDesc;
    if (offlineTheory && theoryEl) theoryEl.innerHTML = offlineTheory;
  });


  // ── lsSwitch: landscape mode output/grade panel switcher ──────
  // ── mobilePanel: chuyển panel trên mobile ────────────────────
  window.mobilePanel = function(panel) {
    const panels = {
      editor: document.getElementById('editor-panel'),
      output: document.getElementById('output-panel'),
      grade:  document.getElementById('grade-panel'),
    };
    const btns = {
      editor: document.getElementById('mnav-editor'),
      output: document.getElementById('mnav-output'),
      grade:  document.getElementById('mnav-grade'),
    };
    // Show selected panel, hide others
    Object.entries(panels).forEach(([name, el]) => {
      if (!el) return;
      el.classList.toggle('mob-active', name === panel);
      el.style.display = (name === panel) ? '' : 'none';
    });
    // Update nav button states
    Object.entries(btns).forEach(([name, btn]) => {
      if (btn) btn.classList.toggle('on', name === panel);
    });
  };

  window.lsSwitch = function(panel) {
    const outPanel   = document.getElementById('output-panel');
    const gradePanel = document.getElementById('grade-panel');
    const btnOut     = document.getElementById('ls-btn-out');
    const btnGrade   = document.getElementById('ls-btn-grade');

    if (panel === 'output') {
      if (outPanel)   { outPanel.classList.remove('ls-hidden');  outPanel.style.display = ''; }
      if (gradePanel) { gradePanel.classList.remove('ls-visible'); gradePanel.style.display = 'none'; }
      btnOut?.classList.add('on'); btnGrade?.classList.remove('on');
    } else {
      if (outPanel)   { outPanel.classList.add('ls-hidden');    outPanel.style.display = 'none'; }
      if (gradePanel) { gradePanel.classList.add('ls-visible'); gradePanel.style.display = ''; }
      btnOut?.classList.remove('on'); btnGrade?.classList.add('on');
    }
  };

  // ── mobileRunGrade: mobile bottom nav run+grade button ────────
  window.mobileRunGrade = async function() {
    await window.runCode();
    await window.gradeCode();
  };

})();

// ─── js/features/teacher/ai-client.js ───────────────────────────
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

// ─── js/features/teacher/dot-kiemtra.js ───────────────────────────
/**
 * features/teacher/dot-kiemtra.js — Quản lý Đợt kiểm tra
 * ═══════════════════════════════════════════════════════════════
 * Đợt kiểm tra = nhóm nhiều kỳ KT trong cùng 1 đợt (VD: HK1)
 * Mỗi đợt có tên, năm học, học kỳ, lớp áp dụng.
 * Tổng hợp điểm các kỳ KT trong đợt.
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Teacher.DotKiemTra', () => {
  const Utils = CL.require('Utils');
  const Toast = CL.require('UI.Toast');

  const STATUS = {
    planning: '📋 Lên kế hoạch',
    active:   '🟢 Đang diễn ra',
    completed:'✅ Đã kết thúc',
  };
  const HOC_KY = ['HK1','HK2','HK Phụ','Cuối năm'];

  // ── Main render ───────────────────────────────────────────────

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    try {
      const [dots, exams] = await Promise.all([
        CL.API.getDotKiemTra(true),
        CL.API.getExams(true),
      ]);

      el.innerHTML = `
        <div class="exam-toolbar">
          <button class="auth-btn" style="padding:7px 14px;font-size:12px"
            onclick="CL.Teacher.DotKiemTra.showForm({})">+ Tạo đợt kiểm tra</button>
          <button class="tp-refresh" onclick="CL.Teacher.Panel.switchTab('dotkt')">🔄</button>
        </div>
        <div class="dot-list" id="dot-list">
          ${dots.length ? dots.map(d => _card(d, exams)).join('') : '<div class="tp-empty">📋 Chưa có đợt kiểm tra nào.</div>'}
        </div>
        <div id="dot-form" style="display:none"></div>`;
    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  function _card(dot, exams) {
    const myExams = (dot.ky_kt_ids || []).map(id => exams.find(e => e.id === id)).filter(Boolean);
    return `<div class="dot-card">
      <div class="dc-header">
        <div class="dc-info">
          <div class="dc-name">${Utils.escHtml(dot.ten)}</div>
          <div class="dc-meta">
            ${dot.nam_hoc} · ${dot.hoc_ky} · ${Utils.escHtml(dot.lop||'Tất cả lớp')}
            · ${myExams.length} kỳ thi
          </div>
        </div>
        <div class="dc-actions">
          <span class="ec-status ${dot.trang_thai}">${STATUS[dot.trang_thai]||dot.trang_thai}</span>
          <button class="tp-action-btn" onclick="CL.Teacher.DotKiemTra.editDot('${Utils.escHtml(dot.id)}')">✏️</button>
          <button class="tp-action-btn" onclick="CL.Teacher.DotKiemTra.viewSummary('${Utils.escHtml(dot.id)}')">📊</button>
          <button class="tp-action-btn" onclick="CL.Teacher.DotKiemTra.deleteDot('${Utils.escHtml(dot.id)}')" style="color:var(--error)">🗑</button>
        </div>
      </div>
      ${myExams.length ? `
        <div class="dc-exams">
          ${myExams.map(e => `<span class="dc-exam-tag ec-status ${e.trang_thai||'draft'}">${Utils.escHtml(e.ten.substring(0,20))}</span>`).join('')}
        </div>` : ''}
      ${dot.mo_ta ? `<div class="ec-desc">${Utils.escHtml(dot.mo_ta)}</div>` : ''}
    </div>`;
  }

  // ── Form ──────────────────────────────────────────────────────

  async function showForm(dot) {
    const form = document.getElementById('dot-form');
    if (!form) return;
    form.style.display = 'block';
    const isEdit = !!dot.id;
    const exams  = await CL.API.getExams(true);
    const selIds = new Set(dot.ky_kt_ids || []);

    form.innerHTML = `
      <div class="ef-title">${isEdit ? '✏️ Chỉnh sửa' : '+ Tạo'} đợt kiểm tra</div>
      <div class="ef-row">
        <div class="ef-field"><label>Tên đợt *</label>
          <input id="df-ten" type="text" value="${Utils.escHtml(dot.ten||'')}"
            placeholder="VD: Kiểm tra HK1 – Lớp 11 – 2025"></div>
        <div class="ef-field"><label>Năm học</label>
          <input id="df-namhoc" type="text" value="${Utils.escHtml(dot.nam_hoc||'2024-2025')}"
            placeholder="2024-2025"></div>
      </div>
      <div class="ef-row">
        <div class="ef-field"><label>Học kỳ</label>
          <select id="df-hocky">
            ${HOC_KY.map(k => `<option ${dot.hoc_ky===k?'selected':''}>${k}</option>`).join('')}
          </select></div>
        <div class="ef-field"><label>Đợt số</label>
          <input id="df-dot" type="number" value="${dot.dot_so||1}" min="1" max="20"></div>
      </div>
      <div class="ef-row">
        <div class="ef-field"><label>Lớp áp dụng</label>
          <input id="df-lop" type="text" value="${Utils.escHtml(dot.lop||'')}"
            placeholder="11A1, 11A2 (rỗng = tất cả)"></div>
        <div class="ef-field"><label>Trạng thái</label>
          <select id="df-status">
            ${Object.entries(STATUS).map(([v,l]) =>
              `<option value="${v}" ${(dot.trang_thai||'planning')===v?'selected':''}>${l}</option>`
            ).join('')}
          </select></div>
      </div>
      <div class="ef-field"><label>Mô tả</label>
        <textarea id="df-mota" rows="2">${Utils.escHtml(dot.mo_ta||'')}</textarea></div>

      <div class="ef-field">
        <label>Kỳ kiểm tra trong đợt này (<span id="df-cnt">${selIds.size}</span> đã chọn)</label>
        <div class="ef-ex-list" style="max-height:200px">
          ${exams.map(e => `
            <label class="ef-ex">
              <input type="checkbox" name="dot-ex" value="${Utils.escHtml(e.id)}"
                ${selIds.has(e.id)?'checked':''}>
              <span class="ec-status ${e.trang_thai}" style="font-size:9px">${e.trang_thai}</span>
              <span class="ef-ex-title">${Utils.escHtml(e.ten)}</span>
              <span style="font-size:10px;color:var(--text3)">${Utils.escHtml(e.ngay_thi||'')}</span>
            </label>`).join('')}
        </div>
      </div>

      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="auth-btn" style="padding:8px 14px;font-size:12px"
          onclick="CL.Teacher.DotKiemTra.saveDot('${dot.id||''}')">💾 ${isEdit?'Lưu':'Tạo'}</button>
        <button class="tp-cancel-btn" onclick="document.getElementById('dot-form').style.display='none'">Hủy</button>
      </div>
      <div id="df-msg" style="font-size:11px;margin-top:6px;color:var(--accent2)"></div>`;

    document.querySelectorAll('[name="dot-ex"]').forEach(cb =>
      cb.addEventListener('change', () => {
        const n = document.querySelectorAll('[name="dot-ex"]:checked').length;
        const el = document.getElementById('df-cnt');
        if (el) el.textContent = n;
      })
    );
    form.scrollIntoView({ behavior: 'smooth' });
  }

  async function editDot(id) {
    const dots = await CL.API.getDotKiemTra(true);
    const dot  = dots.find(d => d.id === id);
    if (dot) showForm(dot);
  }

  async function saveDot(existId) {
    const msg = document.getElementById('df-msg');
    const ten = document.getElementById('df-ten')?.value?.trim();
    if (!ten) { if(msg) msg.textContent = '⚠️ Vui lòng nhập tên'; return; }
    const kyIds = [...document.querySelectorAll('[name="dot-ex"]:checked')].map(cb => cb.value);
    if(msg) msg.textContent = '⏳ Đang lưu...';
    try {
      const r = await CL.API.saveDotKiemTra({
        id: existId || undefined,
        ten,
        nam_hoc: document.getElementById('df-namhoc')?.value?.trim() || '2024-2025',
        hoc_ky:  document.getElementById('df-hocky')?.value  || 'HK1',
        dot_so:  parseInt(document.getElementById('df-dot')?.value) || 1,
        lop:     document.getElementById('df-lop')?.value?.trim() || '',
        mo_ta:   document.getElementById('df-mota')?.value?.trim() || '',
        trang_thai: document.getElementById('df-status')?.value || 'planning',
        ky_kt_ids: kyIds,
      });
      if(msg) msg.textContent = '✅ Đã lưu!';
      setTimeout(() => CL.Teacher.Panel.switchTab('dotkt'), 1000);
    } catch(e) { if(msg) msg.textContent = '❌ ' + e.message; }
  }

  async function deleteDot(id) {
    if (!await Toast.confirm('Xóa đợt kiểm tra? Các kỳ thi trong đợt vẫn được giữ.')) return;
    await CL.API.deleteDotKiemTra(id);
    CL.Teacher.Panel.switchTab('dotkt');
  }

  // ── Summary: Tổng hợp điểm cả đợt ───────────────────────────

  async function viewSummary(dotId) {
    const body = document.getElementById('tp-body');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tổng hợp...</div>';
    try {
      const [dots, exams, baiKTs, students] = await Promise.all([
        CL.API.getDotKiemTra(true),
        CL.API.getExams(true),
        CL.API.getBaiKT(),
        CL.API.getStudentList(),
      ]);

      const dot     = dots.find(d => d.id === dotId);
      const myExams = (dot?.ky_kt_ids || []).map(id => exams.find(e => e.id === id)).filter(Boolean);
      const myKTs   = baiKTs.filter(b => dot?.ky_kt_ids?.includes(b.ky_id));

      if (!dot) { body.innerHTML = '<div class="tp-empty">Không tìm thấy đợt kiểm tra</div>'; return; }

      // Build student summary: one row per student, cols = exams
      const stuMap  = {};
      students.forEach(s => stuMap[s.mssv] = s);
      const allMssv = [...new Set(myKTs.map(b => b.mssv))].sort();

      const tableRows = allMssv.map(mssv => {
        const stu    = stuMap[mssv] || {};
        const scores = myExams.map(e => {
          const r = myKTs.find(b => b.mssv === mssv && b.ky_id === e.id);
          return r ? parseFloat(r.diem_tong) || 0 : null;
        });
        const valid  = scores.filter(s => s !== null);
        const avg    = valid.length ? valid.reduce((a,b)=>a+b,0)/valid.length : null;
        const cells  = scores.map(s => s === null
          ? `<td class="hm-empty">—</td>`
          : `<td class="td-score ${Utils.scoreClass(s)}">${s.toFixed(1)}</td>`
        ).join('');
        const avgCell = avg === null ? '<td>—</td>'
          : `<td class="td-score ${Utils.scoreClass(avg)}" style="font-weight:900">${avg.toFixed(2)}</td>`;
        const rank    = avg === null ? '—' : avg >= 8 ? '🌟 Giỏi' : avg >= 6.5 ? '👍 Khá' : avg >= 5 ? '✓ TB' : '⚠️ Yếu';
        return `<tr>
          <td class="td-mssv">${Utils.escHtml(mssv)}</td>
          <td>${Utils.escHtml(stu.ho_ten||mssv)}</td>
          <td>${Utils.escHtml(stu.lop||baiKTs.find(b=>b.mssv===mssv)?.lop||'')}</td>
          ${cells}${avgCell}
          <td>${rank}</td>
        </tr>`;
      }).join('');

      // Stats
      const allScores = myKTs.map(b => parseFloat(b.diem_tong)||0);
      const avg  = allScores.length ? allScores.reduce((a,b)=>a+b,0)/allScores.length : 0;
      const pass = allScores.filter(s => s >= 5).length;
      const gioi = allScores.filter(s => s >= 8).length;

      body.innerHTML = `
        <div style="padding:10px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border)">
          <button class="tp-action-btn" onclick="CL.Teacher.Panel.switchTab('dotkt')">← Đợt KT</button>
          <div style="font-weight:800;font-size:14px">📊 ${Utils.escHtml(dot.ten)}</div>
          <span style="font-size:11px;color:var(--text3)">${dot.nam_hoc} · ${dot.hoc_ky} · ${myExams.length} kỳ</span>
          <button class="tp-action-btn" style="margin-left:auto"
            onclick="CL.Teacher.DotKiemTra.exportSummary('${dotId}')">📥 Xuất Sheets</button>
        </div>

        <div class="tp-score-header" style="padding:10px 14px">
          <div class="tp-stat"><div class="tp-stat-n">${allMssv.length}</div><div class="tp-stat-l">Học sinh</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${avg.toFixed(2)}</div><div class="tp-stat-l">Điểm TB</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${Math.round(pass/Math.max(allScores.length,1)*100)}%</div><div class="tp-stat-l">Đạt (≥5)</div></div>
          <div class="tp-stat good"><div class="tp-stat-n">${Math.round(gioi/Math.max(allScores.length,1)*100)}%</div><div class="tp-stat-l">Giỏi (≥8)</div></div>
        </div>

        <div class="tp-table-wrap" style="padding:0 14px 14px">
          <table class="tp-table">
            <thead><tr>
              <th>MSSV</th><th>Họ tên</th><th>Lớp</th>
              ${myExams.map(e => `<th title="${Utils.escHtml(e.ten)}">${Utils.escHtml(e.ten.substring(0,12))}</th>`).join('')}
              <th>TB</th><th>Xếp loại</th>
            </tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>`;
    } catch(e) { body.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  async function exportSummary(dotId) {
    try {
      const r = await CL.API.exportToSheets('all');
      Toast.success(`✅ Đã xuất ra Google Sheets!`);
      if (r.url) window.open(r.url, '_blank');
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  return { render, showForm, editDot, saveDot, deleteDot, viewSummary, exportSummary };
});
