/**
 * features/teacher/exercises.js — Teacher Panel: Tab Bài tập
 * Cho phép giáo viên chỉnh sửa lý thuyết, code mẫu, tiêu chí, hướng dẫn lỗi
 * @requires core/*, CL.API, exercises/registry.js
 */
'use strict';

CL.define('Teacher.ExEditor', () => {
  const Utils    = CL.require('Utils');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  async function render(el) {
    const allExs = Registry.getAll();
    const grades = [...new Set(allExs.map(e => e.bo ? `${e.g}-${e.bo}` : e.g))];

    el.innerHTML = `
      <div class="tp-edit-toolbar">
        <select id="ed-g" onchange="CL.Teacher.ExEditor.loadChap()" style="flex:1">
          <option value="">— Chọn lớp —</option>
          ${grades.map(g=>`<option>${g}</option>`).join('')}
        </select>
        <select id="ed-ch" onchange="CL.Teacher.ExEditor.loadList()" style="flex:2">
          <option value="">— Chọn chủ đề —</option>
        </select>
      </div>
      <div id="ed-list" class="tp-edit-list"></div>
      <div id="ed-form" class="tp-edit-form" style="display:none"></div>
      <div class="tp-actions" style="padding:8px 14px">
        <button class="tp-action-btn" onclick="CL.Teacher.ExEditor.syncAll()">🔄 Sync lên Sheets</button>
      </div>`;
  }

  function loadChap() {
    const gk  = document.getElementById('ed-g').value;
    const chs = Registry.getChapters(gk);
    const sel = document.getElementById('ed-ch');
    sel.innerHTML = '<option value="">— Chọn chủ đề —</option>' +
      chs.map(c => `<option>${c}</option>`).join('');
    document.getElementById('ed-list').innerHTML = '';
    document.getElementById('ed-form').style.display = 'none';
  }

  function loadList() {
    const gk  = document.getElementById('ed-g').value;
    const ch  = document.getElementById('ed-ch').value;
    const exs = Registry.getByChapter(gk, ch);
    document.getElementById('ed-list').innerHTML = exs.map(e => `
      <div class="ed-item" onclick="CL.Teacher.ExEditor.edit('${Utils.escHtml(e.id)}')">
        <span class="ed-lv">${(e.lv||'').split('–')[0].trim()}</span>
        <span class="ed-num">${Utils.escHtml(e.num)}</span>
        <span class="ed-title">${Utils.escHtml(e.title)}</span>
        <span style="font-size:10px;color:var(--text3)">${(e.rb||[]).reduce((s,r)=>s+r.pts,0)}đ</span>
      </div>`).join('');
  }

  async function edit(id) {
    const ex = Registry.findById(id);
    if (!ex) return;
    let detail = { ly_thuyet: '', code_mau: [], tieu_chi: [], huong_dan: [] };
    if (CL.API?.isReady?.()) {
      try { detail = await CL.API.getExerciseDetail(id); } catch {}
    }
    const form = document.getElementById('ed-form');
    form.style.display = 'block';
    form.innerHTML = `
      <div class="ed-form-title">✏️ ${Utils.escHtml(ex.num)} – ${Utils.escHtml(ex.title)}</div>
      <div class="ed-tabs">
        <button class="ed-tab on" onclick="CL.Teacher.ExEditor.switchEdTab(this,'ly-thuyet')">📖 Lý thuyết</button>
        <button class="ed-tab" onclick="CL.Teacher.ExEditor.switchEdTab(this,'code-mau')">💻 Code mẫu</button>
        <button class="ed-tab" onclick="CL.Teacher.ExEditor.switchEdTab(this,'tieu-chi')">📊 Tiêu chí</button>
        <button class="ed-tab" onclick="CL.Teacher.ExEditor.switchEdTab(this,'huong-dan')">⚠️ Hướng dẫn lỗi</button>
      </div>
      <div id="et-ly-thuyet" class="ed-panel">
        <div class="ef-field"><label>Lý thuyết (HTML)</label>
          <textarea id="ef-ly" rows="8">${Utils.escHtml(detail.ly_thuyet || ex.theory || '')}</textarea>
        </div>
      </div>
      <div id="et-code-mau" class="ed-panel" style="display:none">
        <div class="ef-field">
          <label>Ngôn ngữ <input id="ef-cm-lang" type="text" value="${Utils.escHtml(ex.type||'python')}" style="width:100px;margin-left:8px"></label>
          <textarea id="ef-cm-code" rows="8" placeholder="Code mẫu / đáp án...">${Utils.escHtml((detail.code_mau[0]||{}).code||ex.solution||'')}</textarea>
        </div>
      </div>
      <div id="et-tieu-chi" class="ed-panel" style="display:none">
        <div id="tc-list">${_renderTieuChi(detail.tieu_chi.length ? detail.tieu_chi : (ex.rb||[]))}</div>
        <button class="tp-action-btn" onclick="CL.Teacher.ExEditor.addTieuChi()" style="margin-top:8px">+ Thêm tiêu chí</button>
      </div>
      <div id="et-huong-dan" class="ed-panel" style="display:none">
        <div id="hd-list">${_renderHuongDan(detail.huong_dan.length ? detail.huong_dan : (ex.errors||[]).map((e,i)=>({loai_loi:'Lỗi '+(i+1),mo_ta_loi:e,cach_sua:''})))}</div>
        <button class="tp-action-btn" onclick="CL.Teacher.ExEditor.addHuongDan()" style="margin-top:8px">+ Thêm hướng dẫn</button>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="auth-btn" style="padding:8px 14px;font-size:12px"
          onclick="CL.Teacher.ExEditor.save('${Utils.escHtml(id)}')">💾 Lưu lên Sheets</button>
        <button class="tp-cancel-btn" onclick="document.getElementById('ed-form').style.display='none'">Đóng</button>
      </div>
      <div id="ed-msg" style="font-size:11px;margin-top:6px;color:var(--accent2)"></div>`;
    form.scrollIntoView({ behavior: 'smooth' });
  }

  function switchEdTab(btn, panel) {
    btn.closest('.ed-tabs').querySelectorAll('.ed-tab').forEach(t => t.classList.remove('on'));
    btn.classList.add('on');
    ['ly-thuyet','code-mau','tieu-chi','huong-dan'].forEach(p => {
      const el = document.getElementById('et-' + p);
      if (el) el.style.display = p === panel ? '' : 'none';
    });
  }

  function _renderTieuChi(list) {
    return (list||[]).map((tc,i) => `
      <div class="tc-row">
        <input class="tc-desc" type="text" placeholder="Mô tả tiêu chí" value="${Utils.escHtml(tc.mo_ta||tc.desc||'')}">
        <input class="tc-kw" type="text" placeholder="Từ khóa" value="${Utils.escHtml(tc.tu_khoa||tc.kw||'')}" style="width:120px">
        <input class="tc-pts" type="number" placeholder="Điểm" value="${tc.diem||tc.pts||0}" style="width:60px" min="0" max="10">
        <button onclick="this.closest('.tc-row').remove()" style="background:none;border:none;cursor:pointer;color:var(--error);font-size:16px">✕</button>
      </div>`).join('');
  }

  function _renderHuongDan(list) {
    return (list||[]).map(hd => `
      <div class="hd-row">
        <input class="hd-loai" type="text" placeholder="Loại lỗi" value="${Utils.escHtml(hd.loai_loi||'')}">
        <input class="hd-mo-ta" type="text" placeholder="Mô tả lỗi" value="${Utils.escHtml(hd.mo_ta_loi||String(hd)||'')}">
        <input class="hd-cach-sua" type="text" placeholder="Cách sửa" value="${Utils.escHtml(hd.cach_sua||'')}">
        <button onclick="this.closest('.hd-row').remove()" style="background:none;border:none;cursor:pointer;color:var(--error);font-size:16px">✕</button>
      </div>`).join('');
  }

  function addTieuChi() {
    document.getElementById('tc-list')?.insertAdjacentHTML('beforeend', _renderTieuChi([{}]));
  }
  function addHuongDan() {
    document.getElementById('hd-list')?.insertAdjacentHTML('beforeend', _renderHuongDan([{}]));
  }

  async function save(id) {
    const msg = document.getElementById('ed-msg');
    if(msg) msg.textContent = '⏳ Đang lưu...';
    try {
      await CL.API.saveLyThuyet(id, document.getElementById('ef-ly')?.value||'');
      const code = document.getElementById('ef-cm-code')?.value||'';
      const lang = document.getElementById('ef-cm-lang')?.value||'python';
      if (code) await CL.API.saveCodeMau(id, lang, code, '');
      const tc = [...document.querySelectorAll('#tc-list .tc-row')].map(r=>({
        mo_ta: r.querySelector('.tc-desc')?.value||'',
        tu_khoa: r.querySelector('.tc-kw')?.value||'',
        diem: parseFloat(r.querySelector('.tc-pts')?.value)||0,
      })).filter(t=>t.mo_ta);
      if(tc.length) await CL.API.saveTieuChi(id, tc);
      const hd = [...document.querySelectorAll('#hd-list .hd-row')].map(r=>({
        loai_loi: r.querySelector('.hd-loai')?.value||'',
        mo_ta_loi: r.querySelector('.hd-mo-ta')?.value||'',
        cach_sua: r.querySelector('.hd-cach-sua')?.value||'',
      })).filter(h=>h.mo_ta_loi);
      if(hd.length) await CL.API.saveHuongDan(id, hd);
      if(msg) msg.textContent='✅ Đã lưu thành công!';
      Toast.success('✅ Đã lưu bài tập ' + id);
    } catch(e) { if(msg) msg.textContent='❌ '+e.message; }
  }

  async function syncAll() {
    if (!await Toast.confirm('Sync toàn bộ 918 bài tập lên Google Sheets? (1-2 phút)')) return;
    try {
      const r = await CL.API.syncExercises(Registry.getAll());
      Toast.success(`✅ Đã sync ${r.synced} bài tập`);
    } catch(e) { Toast.error('❌ ' + e.message); }
  }

  return { render, loadChap, loadList, edit, switchEdTab, addTieuChi, addHuongDan, save, syncAll };
});
