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
  APP_VERSION: '4.4.1',
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
