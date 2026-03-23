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
