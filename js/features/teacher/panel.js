/**
 * features/teacher/panel.js — Teacher Panel Shell + Tab Router
 * ═══════════════════════════════════════════════════════════════
 * Chỉ chứa: khung UI, tab switching, open/close.
 * Nội dung từng tab → file riêng trong features/teacher/
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, features/teacher/scores.js, violations.js,
 *           history.js, exams.js, exercises.js, config.js
 */

'use strict';

CL.define('Teacher.Panel', () => {

  const cfg    = CL.require('Config');
  const Events = CL.require('Events');

  let _el   = null;
  let _curTab = 'scores';

  function open() {
    if (_el) { _el.classList.add('show'); return; }

    _el = document.createElement('div');
    _el.id = 'tp-panel';
    _el.innerHTML = `
      <div class="tp-backdrop" onclick="CL.Teacher.Panel.close()"></div>
      <div class="tp-drawer">
        <div class="tp-header">
          <span class="tp-title">👨‍🏫 Bảng điều khiển</span>
          <button class="tp-close" onclick="CL.Teacher.Panel.close()">✕</button>
        </div>
        <div class="tp-tabs" id="tp-tabs">
          ${cfg.TEACHER_TABS.map((t, i) =>
            `<button class="tp-tab${i === 0 ? ' on' : ''}"
                     data-tab="${t.id}"
                     onclick="CL.Teacher.Panel.switchTab('${t.id}')">
               ${t.label}
             </button>`
          ).join('')}
          <!-- Admin-only tab -->
          <button class="tp-tab tp-admin-tab" data-tab="users"
                  onclick="CL.Teacher.Panel.switchTab('users')"
                  id="tp-tab-users" style="display:none">
            👥 Người dùng
          </button>
        </div>
        <div class="tp-body" id="tp-body">
          <div class="tp-loading">Đang tải...</div>
        </div>
      </div>`;

    document.body.appendChild(_el);
    requestAnimationFrame(() => _el.classList.add('show'));
    switchTab('scores');
    // Show admin tab if role=admin
    const sess = CL.Auth?.Session?.get() || window.currentUser;
    const role = sess?.role || '';
    const adminBtn = document.getElementById('tp-tab-users');
    if (adminBtn && (role === 'admin' || role === 'teacher')) adminBtn.style.display = '';
  }

  function close() {
    _el?.classList.remove('show');
  }

  function switchTab(tabId) {
    _curTab = tabId;

    // Update tab buttons
    _el?.querySelectorAll('.tp-tab').forEach(btn => {
      btn.classList.toggle('on', btn.dataset.tab === tabId);
    });

    // Render tab content
    const body = document.getElementById('tp-body');
    if (!body) return;

    const RENDERERS = {
      scores:     () => CL.Teacher.Scores?.render(body),
      violations: () => CL.Teacher.Violations?.render(body),
      history:    () => CL.Teacher.History?.render(body),
      exams:      () => CL.Teacher.Exams?.render(body),
      analytics:  () => CL.Teacher.Analytics?.render(body),
      exercises:  () => CL.Teacher.ExEditor?.render(body),
      config:     () => CL.Teacher.Config?.render(body),
      users:      () => CL.Admin?.Users?.render(body),
    };

    body.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    (RENDERERS[tabId] || (() => {}))();
  }

  // Listen for events that should refresh teacher panel
  Events.on('grade:submitted',       () => { if (_curTab === 'scores')     switchTab('scores');     });
  Events.on('violation:detected',    () => { if (_curTab === 'violations') switchTab('violations'); });
  Events.on('exam:status-changed',   () => { if (_curTab === 'exams')      switchTab('exams');      });

  // Backward compat
  window.TeacherPanel = { open, close, _tab: switchTab };

  return { open, close, switchTab };
});
