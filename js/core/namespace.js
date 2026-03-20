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
  CL.version    = '4.0.0';
  CL.appName    = 'CodeLab';
  CL._initialized = true;

  console.info(
    `%c🖥️  ${CL.appName} v${CL.version} — namespace ready`,
    'color:#4f9eff;font-weight:700;font-size:12px'
  );
}
