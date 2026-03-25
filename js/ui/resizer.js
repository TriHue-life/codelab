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
        getComputedStyle(ws).getPropertyValue('--col-right') || '370', 10
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
        ws.style.setProperty('--col-right', '370px');
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
    ws.style.setProperty('--col-right', '370px');
    ws.style.setProperty('--row-top', '60vh');
    try {
      localStorage.removeItem(LS_COL);
      localStorage.removeItem(LS_ROW);
    } catch {}
  }

  return { init, reset };
});
