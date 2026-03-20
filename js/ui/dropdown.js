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
  let _active   = null;   // 'grade' | 'chapter' | 'exercise'
  let _grade    = '';
  let _chapter  = '';
  let _exId     = '';

  const _items = {
    grade:    cfg.GRADES.map(g => ({ value: g.value, text: g.text })),
    chapter:  [],
    exercise: [],
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

    const labels = { grade: 'Chọn lớp / bộ sách', chapter: 'Chọn chủ đề', exercise: 'Chọn bài tập' };
    title.textContent = labels[which] || '';

    const curVal = { grade: _grade, chapter: _chapter, exercise: _exId }[which];
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
    if (which === 'grade')    _selectGrade(value);
    if (which === 'chapter')  _selectChapter(value);
    if (which === 'exercise') _selectExercise(value);
  }

  function _selectGrade(value) {
    _grade   = value;
    _chapter = '';
    _exId    = '';

    _setLabel('grade', _items.grade.find(i => i.value === value)?.text || '— Chọn lớp —');
    _setLabel('chapter',  '— Chọn chủ đề —');
    _setLabel('exercise', '— Chọn bài —');

    // Build chapter items
    const chapters = Registry.getChapters(value);
    _items.chapter = chapters.map(ch => ({ value: ch, text: ch }));

    setLocked('chapter',  !value || !chapters.length);
    setLocked('exercise', true);

    Events.emit('exercise:cleared', {});
  }

  function _selectChapter(value) {
    _chapter = value;
    _exId    = '';

    _setLabel('chapter', value || '— Chọn chủ đề —');
    _setLabel('exercise', '— Chọn bài —');

    // Build exercise items grouped by Bloom
    const exs = Registry.getByChapter(_grade, value);
    _items.exercise = exs.map(ex => ({
      value: ex.id,
      text:  `${ex.num} – ${ex.title}`,
    }));

    setLocked('exercise', !value || !exs.length);
    Events.emit('exercise:cleared', {});
  }

  function _selectExercise(id) {
    _exId = id;
    const ex = Registry.findById(id);
    if (!ex) return;

    _setLabel('exercise', `${ex.num} – ${ex.title}`);
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
    _exId    = '';
    ['grade','chapter','exercise'].forEach(w => {
      _setLabel(w, w === 'grade' ? '— Chọn lớp —' :
                   w === 'chapter' ? '— Chọn chủ đề —' : '— Chọn bài —');
    });
    setLocked('chapter',  true);
    setLocked('exercise', true);
    Events.emit('exercise:cleared', {});
  }

  return { init, open, select, setLocked, reset };
});
