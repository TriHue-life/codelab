// ══════════════════════════════════════════════════════════════════
//  teacher-panel.js — Bảng điều khiển Giáo viên v2.0
//  Tabs: 📊 Điểm | 🚨 Vi phạm | 📖 Lịch sử | 📋 Kiểm tra | ✏️ Bài tập | ⚙️ Cấu hình
// ══════════════════════════════════════════════════════════════════
const TeacherPanel = (function () {
  'use strict';

  let _panel = null;
  const TABS = ['scores','violations','history','exams','exercises','config'];
  const TAB_LABELS = { scores:'📊 Điểm', violations:'🚨 Vi phạm', history:'📖 Lịch sử', exams:'📋 Kiểm tra', exercises:'✏️ Bài tập', config:'⚙️ Cấu hình' };

  // ── Open/Close ────────────────────────────────────────────────────
  function open() {
    if (_panel) { _panel.classList.add('show'); return; }
    _panel = document.createElement('div');
    _panel.id = 'tp-panel';
    _panel.innerHTML = `
      <div class="tp-backdrop" onclick="TeacherPanel.close()"></div>
      <div class="tp-drawer">
        <div class="tp-header">
          <span class="tp-title">👨‍🏫 Bảng điều khiển</span>
          <button class="tp-close" onclick="TeacherPanel.close()">✕</button>
        </div>
        <div class="tp-tabs" id="tp-tabs">
          ${TABS.map((t,i) => `<button class="tp-tab${i===0?' on':''}" onclick="TeacherPanel._tab('${t}')">${TAB_LABELS[t]}</button>`).join('')}
        </div>
        <div class="tp-body" id="tp-body"><div class="tp-loading">Đang tải...</div></div>
      </div>`;
    document.body.appendChild(_panel);
    requestAnimationFrame(() => _panel.classList.add('show'));
    _renderTab('scores');
  }

  function close() { if (_panel) _panel.classList.remove('show'); }

  function _tab(name) {
    _panel.querySelectorAll('.tp-tab').forEach((t,i) => t.classList.toggle('on', TABS[i]===name));
    _renderTab(name);
  }

  function _renderTab(name) {
    const body = document.getElementById('tp-body');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    const fn = { scores:renderScores, violations:renderViolations, history:renderHistory,
                 exams:renderExams, exercises:renderExercises, config:renderConfig };
    (fn[name] || (()=>{}))(body);
  }

  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function fmtTime(ts) { if (!ts) return '—'; const d=new Date(ts); return isNaN(d)?ts:`${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`; }
  function scoreColor(s) { const n=parseFloat(s); return n>=8?'score-hi':n>=5?'score-md':'score-lo'; }

  // ══════════════════════════════════════════════════════════════════
  //  BẢNG ĐIỂM
  // ══════════════════════════════════════════════════════════════════
  async function renderScores(el) {
    try {
      const rows = await API.getScores();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">📭 Chưa có bài nộp.</div>'; return; }
      const totalHS = new Set(rows.map(r=>r.mshs)).size;
      const avg = rows.reduce((s,r)=>s+(parseFloat(r.diem)||0),0)/rows.length;
      el.innerHTML = `
        <div class="tp-score-header">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Bài nộp</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${totalHS}</div><div class="tp-stat-l">Học sinh</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${avg.toFixed(1)}</div><div class="tp-stat-l">Điểm TB</div></div>
          <button class="tp-refresh" onclick="API._invalidate('scores');TeacherPanel._tab('scores')">🔄</button>
        </div>
        <div class="tp-search"><input type="text" placeholder="🔍 Tìm MSHS, tên..." oninput="TeacherPanel._filter('sc-tbody',this.value)"></div>
        <div class="tp-table-wrap"><table class="tp-table"><thead><tr>
          <th>Thời gian</th><th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>Bài tập</th><th>Điểm</th>
        </tr></thead><tbody id="sc-tbody">
          ${rows.slice().reverse().map(r=>`<tr>
            <td class="td-time">${fmtTime(r.ts)}</td>
            <td class="td-mshs">${esc(r.mshs)}</td>
            <td>${esc(r.ho_ten)}</td>
            <td><span class="vp-lop">${esc(r.lop)}</span></td>
            <td class="td-ex">${esc(r.tieu_de||r.bai_id)}</td>
            <td class="td-score ${scoreColor(r.diem)}">${r.diem||'—'}</td>
          </tr>`).join('')}
        </tbody></table></div>
        <div class="tp-actions"><button class="tp-action-btn" onclick="TeacherPanel.exportScores()">📥 Xuất CSV</button></div>`;
    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${esc(e.message)}</div>`; }
  }

  // ══════════════════════════════════════════════════════════════════
  //  VI PHẠM
  // ══════════════════════════════════════════════════════════════════
  async function renderViolations(el) {
    try {
      const rows = await API.getViolations();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">✅ Chưa có vi phạm.</div>'; return; }
      const locked = new Set(rows.filter(r=>parseInt(r.lan)>1).map(r=>r.mshs));
      el.innerHTML = `
        <div class="vp-summary">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Vi phạm</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${new Set(rows.map(r=>r.mshs)).size}</div><div class="tp-stat-l">HS</div></div>
          <div class="tp-stat ${locked.size?'vp-danger':''}"><div class="tp-stat-n">${locked.size}</div><div class="tp-stat-l">Bị khóa</div></div>
          <button class="tp-refresh" onclick="API._invalidate('violations');TeacherPanel._tab('violations')">🔄</button>
        </div>
        <div class="tp-search"><input type="text" placeholder="🔍 Tìm..." oninput="TeacherPanel._filter('vp-tbody',this.value)"></div>
        <div class="tp-table-wrap"><table class="tp-table"><thead><tr>
          <th>Thời gian</th><th>MSHS</th><th>Học sinh</th><th>Bài</th><th>Lần</th><th>Loại</th>
        </tr></thead><tbody id="vp-tbody">
          ${rows.map(r=>`<tr class="${parseInt(r.lan)>1?'vp-row-locked':''}">
            <td class="td-time">${fmtTime(r.ts)}</td>
            <td class="td-mshs">${esc(r.mshs)}</td>
            <td>${esc(r.ho_ten)} <span class="vp-lop">${esc(r.lop)}</span></td>
            <td class="td-ex">${esc(r.bai_id)}</td>
            <td style="text-align:center;font-weight:800;color:${parseInt(r.lan)>1?'var(--error)':'var(--warn)'}">${r.lan||1}</td>
            <td><span class="vp-type">${esc(r.loai)}</span></td>
          </tr>`).join('')}
        </tbody></table></div>`;
    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${esc(e.message)}</div>`; }
  }

  // ══════════════════════════════════════════════════════════════════
  //  LỊCH SỬ LÀM BÀI
  // ══════════════════════════════════════════════════════════════════
  async function renderHistory(el) {
    try {
      const rows = await API.getHistory();
      if (!rows.length) { el.innerHTML = '<div class="tp-empty">📭 Chưa có lịch sử.</div>'; return; }
      el.innerHTML = `
        <div class="tp-score-header" style="grid-template-columns:1fr 1fr auto">
          <div class="tp-stat"><div class="tp-stat-n">${rows.length}</div><div class="tp-stat-l">Lượt làm</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${new Set(rows.map(r=>r.mshs)).size}</div><div class="tp-stat-l">HS</div></div>
          <button class="tp-refresh" onclick="API._invalidate('history');TeacherPanel._tab('history')">🔄</button>
        </div>
        <div class="tp-search"><input type="text" placeholder="🔍 Tìm..." oninput="TeacherPanel._filter('hs-tbody',this.value)"></div>
        <div class="tp-table-wrap"><table class="tp-table"><thead><tr>
          <th>Thời gian</th><th>MSHS</th><th>Họ tên</th><th>Bài tập</th><th>Điểm</th><th>Lớp</th>
        </tr></thead><tbody id="hs-tbody">
          ${rows.map(r=>`<tr>
            <td class="td-time">${fmtTime(r.ts)}</td>
            <td class="td-mshs">${esc(r.mshs)}</td>
            <td>${esc(r.ho_ten)}</td>
            <td class="td-ex">${esc(r.tieu_de||r.bai_id)}</td>
            <td class="td-score ${scoreColor(r.diem)}">${r.diem||'—'}</td>
            <td>${esc(r.lop)}</td>
          </tr>`).join('')}
        </tbody></table></div>`;
    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${esc(e.message)}</div>`; }
  }

  // ══════════════════════════════════════════════════════════════════
  //  QUẢN LÝ KỲ KIỂM TRA
  // ══════════════════════════════════════════════════════════════════
  async function renderExams(el) {
    try {
      const exams = await API.getExams(true);
      el.innerHTML = `
        <div class="exam-toolbar">
          <button class="auth-btn" style="padding:7px 14px;font-size:12px" onclick="TeacherPanel._newExam()">+ Tạo kỳ kiểm tra</button>
          <button class="tp-refresh" onclick="TeacherPanel._tab('exams')">🔄</button>
        </div>
        <div class="exam-list">
          ${exams.length ? exams.map(_examCard).join('') : '<div class="tp-empty">📋 Chưa có kỳ kiểm tra.<br>Nhấn + để tạo mới.</div>'}
        </div>
        <div id="exam-form" style="display:none"></div>`;
    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${esc(e.message)}</div>`; }
  }

  const STATUS_MAP = { draft:'⬜ Nháp', active:'🟢 Đang mở', closed:'🔴 Đã đóng' };

  function _examCard(exam) {
    return `<div class="exam-card">
      <div class="ec-header">
        <div class="ec-info">
          <span class="ec-name">${esc(exam.ten)}</span>
          <span class="ec-meta">${esc(exam.lop||'Tất cả lớp')} · ${exam.thoi_gian_phut||45} phút · ${(exam.bai_tap||[]).length} bài · ${fmtTime(exam.ngay_thi)}</span>
        </div>
        <div style="display:flex;gap:4px;align-items:center;flex-shrink:0">
          <span class="ec-status ${exam.trang_thai}">${STATUS_MAP[exam.trang_thai]||exam.trang_thai}</span>
          <button class="tp-action-btn" onclick="TeacherPanel._editExam('${esc(exam.id)}')">✏️</button>
          <button class="tp-action-btn" onclick="TeacherPanel._toggleExam('${esc(exam.id)}','${exam.trang_thai}')">
            ${exam.trang_thai==='active'?'🔴':'🟢'}
          </button>
          <button class="tp-action-btn" onclick="TeacherPanel._deleteExam('${esc(exam.id)}')" style="color:var(--error)">🗑</button>
        </div>
      </div>
      ${exam.mo_ta?`<div class="ec-desc">${esc(exam.mo_ta)}</div>`:''}
    </div>`;
  }

  function _newExam() { _showExamForm({}); }

  async function _editExam(id) {
    const exams = await API.getExams();
    const exam = exams.find(e=>e.id===id);
    if (exam) _showExamForm(exam);
  }

  function _showExamForm(exam) {
    const isEdit = !!exam.id;
    const form = document.getElementById('exam-form');
    if (!form) return;
    form.style.display = 'block';

    // Build exercise selector
    const allEx = [...(typeof EXERCISES!=='undefined'?EXERCISES:[]),
                   ...(typeof EXERCISES_K12!=='undefined'?EXERCISES_K12:[])];
    const groups = {};
    allEx.forEach(e => {
      const gk = e.bo ? `K12 ${e.bo}` : e.g;
      if (!groups[gk]) groups[gk] = {};
      if (!groups[gk][e.ch]) groups[gk][e.ch] = [];
      groups[gk][e.ch].push(e);
    });

    const selected = new Set(exam.bai_tap||[]);
    const exSelector = Object.entries(groups).map(([g, chapters]) => `
      <div class="ef-group-header">${esc(g)}</div>
      ${Object.entries(chapters).map(([ch, exs]) => `
        <div class="ef-chapter">
          <div class="ef-ch-label">${esc(ch)}
            <button type="button" onclick="TeacherPanel._selAll(this,'${esc(g)}__${esc(ch)}')" class="ef-sel-all">Chọn tất</button>
          </div>
          ${exs.map(e=>`<label class="ef-ex"><input type="checkbox" data-grp="${esc(g)}__${esc(ch)}" name="ex" value="${esc(e.id)}" ${selected.has(e.id)?'checked':''}> <span class="ef-lv-dot">${e.lv?.split('–')[0]?.trim()||''}</span> ${esc(e.num)} ${esc(e.title)}</label>`).join('')}
        </div>`).join('')}
    `).join('');

    form.innerHTML = `
      <div class="ef-title">${isEdit?'✏️ Chỉnh sửa':'+ Tạo'} kỳ kiểm tra</div>
      <div class="ef-row">
        <div class="ef-field"><label>Tên kỳ kiểm tra *</label><input id="ef-ten" type="text" value="${esc(exam.ten||'')}" placeholder="VD: Kiểm tra 15 phút Bài 17-19"></div>
        <div class="ef-field"><label>Lớp áp dụng</label><input id="ef-lop" type="text" value="${esc(exam.lop||'')}" placeholder="10A1, 10A2 (rỗng = tất cả)"></div>
      </div>
      <div class="ef-row">
        <div class="ef-field"><label>Thời gian (phút)</label><input id="ef-tg" type="number" value="${exam.thoi_gian_phut||45}" min="5" max="180"></div>
        <div class="ef-field"><label>Ngày thi</label><input id="ef-ngay" type="date" value="${exam.ngay_thi||''}"></div>
      </div>
      <div class="ef-field"><label>Mô tả</label><textarea id="ef-mota" rows="2">${esc(exam.mo_ta||'')}</textarea></div>
      <div class="ef-field">
        <label>Bài tập (<span id="ef-cnt">${selected.size}</span> đã chọn)
          <input id="ef-search-ex" type="text" placeholder="🔍 Tìm..." style="margin-left:8px;width:160px;font-size:11px;padding:3px 8px" oninput="TeacherPanel._filterEx(this.value)">
        </label>
        <div class="ef-ex-list">${exSelector}</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="auth-btn" style="padding:8px 16px;font-size:12px" onclick="TeacherPanel._submitExam('${exam.id||''}')">💾 ${isEdit?'Lưu':'Tạo'}</button>
        <button class="tp-cancel-btn" onclick="document.getElementById('exam-form').style.display='none'">Hủy</button>
      </div>
      <div id="ef-msg" style="font-size:11px;margin-top:8px;color:var(--accent2)"></div>`;

    document.querySelectorAll('#exam-form input[name="ex"]').forEach(cb =>
      cb.addEventListener('change', () => {
        const cnt = document.querySelectorAll('#exam-form input[name="ex"]:checked').length;
        const el = document.getElementById('ef-cnt');
        if (el) el.textContent = cnt;
      })
    );
    form.scrollIntoView({ behavior:'smooth' });
  }

  function _selAll(btn, grp) {
    const boxes = document.querySelectorAll(`#exam-form input[data-grp="${grp}"]`);
    const all = [...boxes].every(b=>b.checked);
    boxes.forEach(b=>b.checked=!all);
    const cnt = document.querySelectorAll('#exam-form input[name="ex"]:checked').length;
    const el = document.getElementById('ef-cnt');
    if (el) el.textContent = cnt;
  }

  function _filterEx(q) {
    q = q.toLowerCase();
    document.querySelectorAll('.ef-ex').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }

  async function _submitExam(existId) {
    const ten  = document.getElementById('ef-ten')?.value?.trim();
    const lop  = document.getElementById('ef-lop')?.value?.trim();
    const tg   = document.getElementById('ef-tg')?.value;
    const ngay = document.getElementById('ef-ngay')?.value;
    const mota = document.getElementById('ef-mota')?.value?.trim();
    const baiTap = [...document.querySelectorAll('#exam-form input[name="ex"]:checked')].map(b=>b.value);
    const msg = document.getElementById('ef-msg');

    if (!ten) { if(msg) msg.textContent='⚠️ Vui lòng nhập tên kỳ kiểm tra'; return; }
    if (!baiTap.length) { if(msg) msg.textContent='⚠️ Chọn ít nhất 1 bài tập'; return; }
    if(msg) msg.textContent='⏳ Đang lưu...';

    try {
      const result = await API.saveExam({
        id: existId||undefined, ten, lop, thoi_gian_phut:parseInt(tg)||45,
        ngay_thi:ngay, mo_ta:mota, bai_tap:baiTap,
        trang_thai: existId ? undefined : 'draft',
      });
      if(msg) msg.textContent = `✅ Đã lưu! ID: ${result.id}`;
      setTimeout(() => TeacherPanel._tab('exams'), 1200);
    } catch(e) {
      if(msg) msg.textContent = '❌ ' + e.message;
    }
  }

  async function _toggleExam(id, cur) {
    const next = cur==='active' ? 'closed' : 'active';
    if (!confirm(`${next==='active'?'Mở':'Đóng'} kỳ kiểm tra này?`)) return;
    await API.setExamStatus(id, next);
    TeacherPanel._tab('exams');
  }

  async function _deleteExam(id) {
    if (!confirm('Xóa kỳ kiểm tra? Không thể hoàn tác.')) return;
    await API.deleteExam(id);
    TeacherPanel._tab('exams');
  }

  // ══════════════════════════════════════════════════════════════════
  //  QUẢN LÝ BÀI TẬP
  // ══════════════════════════════════════════════════════════════════
  async function renderExercises(el) {
    const allEx = [...(typeof EXERCISES!=='undefined'?EXERCISES:[]),
                   ...(typeof EXERCISES_K12!=='undefined'?EXERCISES_K12:[])];
    el.innerHTML = `
      <div class="tp-edit-toolbar">
        <select id="ed-g" onchange="TeacherPanel._edLoadChap()" style="flex:1">
          <option value="">— Chọn lớp —</option>
          ${[...new Set(allEx.map(e=>e.bo?`${e.g}-${e.bo}`:e.g))].map(g=>`<option>${g}</option>`).join('')}
        </select>
        <select id="ed-ch" onchange="TeacherPanel._edLoadList()" style="flex:2">
          <option value="">— Chọn chủ đề —</option>
        </select>
      </div>
      <div id="ed-list" class="tp-edit-list"></div>
      <div id="ed-form" class="tp-edit-form" style="display:none"></div>
      <div class="tp-actions" style="padding:8px 14px">
        <button class="tp-action-btn" onclick="TeacherPanel._syncExercises()">🔄 Sync lên Sheets</button>
      </div>`;
  }

  function _edLoadChap() {
    const gk = document.getElementById('ed-g').value;
    const allEx = [...(typeof EXERCISES!=='undefined'?EXERCISES:[]),...(typeof EXERCISES_K12!=='undefined'?EXERCISES_K12:[])];
    const filtered = allEx.filter(e=>(e.bo?`${e.g}-${e.bo}`:e.g)===gk);
    const chs = [...new Set(filtered.map(e=>e.ch))];
    const ch = document.getElementById('ed-ch');
    ch.innerHTML = '<option value="">— Chọn chủ đề —</option>' + chs.map(c=>`<option>${c}</option>`).join('');
    document.getElementById('ed-list').innerHTML = '';
    document.getElementById('ed-form').style.display = 'none';
  }

  function _edLoadList() {
    const gk = document.getElementById('ed-g').value;
    const ch = document.getElementById('ed-ch').value;
    const allEx = [...(typeof EXERCISES!=='undefined'?EXERCISES:[]),...(typeof EXERCISES_K12!=='undefined'?EXERCISES_K12:[])];
    const exs = allEx.filter(e=>(e.bo?`${e.g}-${e.bo}`:e.g)===gk && e.ch===ch);
    const list = document.getElementById('ed-list');
    list.innerHTML = exs.map(e=>`
      <div class="ed-item" onclick="TeacherPanel._edEdit('${esc(e.id)}')">
        <span class="ed-lv">${esc(e.lv?.split('–')[0]?.trim()||'')}</span>
        <span class="ed-num">${esc(e.num)}</span>
        <span class="ed-title">${esc(e.title)}</span>
        <span style="font-size:10px;color:var(--text3)">${(e.rb||[]).reduce((s,r)=>s+r.pts,0)}đ</span>
      </div>`).join('');
  }

  async function _edEdit(id) {
    const allEx = [...(typeof EXERCISES!=='undefined'?EXERCISES:[]),...(typeof EXERCISES_K12!=='undefined'?EXERCISES_K12:[])];
    const e = allEx.find(x=>x.id===id);
    if (!e) return;

    // Fetch server-side overrides
    let detail = { ly_thuyet:'', code_mau:[], tieu_chi:[], huong_dan:[] };
    if (API.isReady()) {
      try { detail = await API.getExerciseDetail(id); } catch {}
    }

    const form = document.getElementById('ed-form');
    form.style.display = 'block';
    form.innerHTML = `
      <div class="ed-form-title">✏️ ${esc(e.num)} – ${esc(e.title)}</div>
      <div class="ed-tabs">
        <button class="ed-tab on" onclick="TeacherPanel._edTab(this,'ly-thuyet')">📖 Lý thuyết</button>
        <button class="ed-tab" onclick="TeacherPanel._edTab(this,'code-mau')">💻 Code mẫu</button>
        <button class="ed-tab" onclick="TeacherPanel._edTab(this,'tieu-chi')">📊 Tiêu chí</button>
        <button class="ed-tab" onclick="TeacherPanel._edTab(this,'huong-dan')">⚠️ Hướng dẫn lỗi</button>
      </div>

      <!-- Lý thuyết -->
      <div id="et-ly-thuyet" class="ed-panel">
        <div class="ef-field"><label>Lý thuyết bài này (HTML)</label>
          <textarea id="ef-ly" rows="8">${esc(detail.ly_thuyet || e.theory || '')}</textarea>
        </div>
      </div>

      <!-- Code mẫu -->
      <div id="et-code-mau" class="ed-panel" style="display:none">
        <div class="ef-field">
          <label>Ngôn ngữ <input id="ef-cm-lang" type="text" value="${esc(e.type||'python')}" style="width:100px;margin-left:8px"></label>
          <textarea id="ef-cm-code" rows="10" placeholder="// Code mẫu...">${esc((detail.code_mau[0]||{}).code || '')}</textarea>
        </div>
        <div class="ef-field"><label>Mô tả code mẫu</label>
          <input id="ef-cm-desc" type="text" value="${esc((detail.code_mau[0]||{}).mo_ta||'')}">
        </div>
      </div>

      <!-- Tiêu chí -->
      <div id="et-tieu-chi" class="ed-panel" style="display:none">
        <div id="tc-list">${_renderTieuChiForm(detail.tieu_chi.length ? detail.tieu_chi : (e.rb||[]))}</div>
        <button class="tp-action-btn" onclick="TeacherPanel._addTieuChi()" style="margin-top:8px">+ Thêm tiêu chí</button>
      </div>

      <!-- Hướng dẫn lỗi -->
      <div id="et-huong-dan" class="ed-panel" style="display:none">
        <div id="hd-list">${_renderHuongDanForm(detail.huong_dan.length ? detail.huong_dan : (e.errors||[]).map((er,i)=>({loai_loi:'Lỗi '+(i+1), mo_ta_loi:er, cach_sua:'', vi_du:''})))}</div>
        <button class="tp-action-btn" onclick="TeacherPanel._addHuongDan()" style="margin-top:8px">+ Thêm hướng dẫn</button>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="auth-btn" style="padding:8px 14px;font-size:12px" onclick="TeacherPanel._saveExDetail('${esc(id)}')">💾 Lưu lên Sheets</button>
        <button class="tp-action-btn" onclick="TeacherPanel._previewEx('${esc(id)}')">👁 Preview</button>
        <button class="tp-cancel-btn" onclick="document.getElementById('ed-form').style.display='none'">Đóng</button>
      </div>
      <div id="ed-msg" style="font-size:11px;margin-top:6px;color:var(--accent2)"></div>`;
    form.scrollIntoView({behavior:'smooth'});
  }

  function _edTab(btn, panel) {
    btn.closest('.ed-tabs').querySelectorAll('.ed-tab').forEach(t=>t.classList.remove('on'));
    btn.classList.add('on');
    ['ly-thuyet','code-mau','tieu-chi','huong-dan'].forEach(p => {
      const el = document.getElementById('et-'+p);
      if (el) el.style.display = p===panel ? '' : 'none';
    });
  }

  function _renderTieuChiForm(list) {
    return (list||[]).map((tc,i)=>`
      <div class="tc-row" id="tc-${i}">
        <input class="tc-desc" type="text" placeholder="Mô tả tiêu chí" value="${esc(tc.mo_ta||tc.desc||'')}">
        <input class="tc-kw" type="text" placeholder="Từ khóa" value="${esc(tc.tu_khoa||tc.kw||'')}" style="width:120px">
        <input class="tc-pts" type="number" placeholder="Điểm" value="${tc.diem||tc.pts||0}" style="width:60px" min="0" max="10">
        <input class="tc-hint" type="text" placeholder="Gợi ý" value="${esc(tc.goi_y||tc.hint||'')}">
        <button onclick="this.closest('.tc-row').remove()" style="background:none;border:none;cursor:pointer;color:var(--error);font-size:16px">✕</button>
      </div>`).join('');
  }

  function _addTieuChi() {
    const list = document.getElementById('tc-list');
    if (!list) return;
    const i = list.children.length;
    list.insertAdjacentHTML('beforeend', _renderTieuChiForm([{mo_ta:'',tu_khoa:'',diem:2,goi_y:''}]));
  }

  function _renderHuongDanForm(list) {
    return (list||[]).map((hd,i)=>`
      <div class="hd-row" id="hd-${i}">
        <input class="hd-loai" type="text" placeholder="Loại lỗi" value="${esc(hd.loai_loi||'')}">
        <input class="hd-mo-ta" type="text" placeholder="Mô tả lỗi" value="${esc(hd.mo_ta_loi||hd||'')}">
        <input class="hd-cach-sua" type="text" placeholder="Cách sửa" value="${esc(hd.cach_sua||'')}">
        <button onclick="this.closest('.hd-row').remove()" style="background:none;border:none;cursor:pointer;color:var(--error);font-size:16px">✕</button>
      </div>`).join('');
  }

  function _addHuongDan() {
    const list = document.getElementById('hd-list');
    if (!list) return;
    list.insertAdjacentHTML('beforeend', _renderHuongDanForm([{loai_loi:'',mo_ta_loi:'',cach_sua:''}]));
  }

  async function _saveExDetail(id) {
    const msg = document.getElementById('ed-msg');
    if(msg) msg.textContent='⏳ Đang lưu...';
    try {
      // Lý thuyết
      const ly = document.getElementById('ef-ly')?.value||'';
      await API.saveLyThuyet(id, ly);

      // Code mẫu
      const lang = document.getElementById('ef-cm-lang')?.value||'python';
      const code = document.getElementById('ef-cm-code')?.value||'';
      const desc = document.getElementById('ef-cm-desc')?.value||'';
      if (code) await API.saveCodeMau(id, lang, code, desc);

      // Tiêu chí
      const tcRows = [...document.querySelectorAll('#tc-list .tc-row')];
      const tieuChi = tcRows.map(row => ({
        mo_ta:    row.querySelector('.tc-desc')?.value||'',
        tu_khoa:  row.querySelector('.tc-kw')?.value||'',
        diem:     parseFloat(row.querySelector('.tc-pts')?.value)||0,
        goi_y:    row.querySelector('.tc-hint')?.value||'',
      })).filter(t=>t.mo_ta);
      if (tieuChi.length) await API.saveTieuChi(id, tieuChi);

      // Hướng dẫn
      const hdRows = [...document.querySelectorAll('#hd-list .hd-row')];
      const huongDan = hdRows.map(row => ({
        loai_loi:  row.querySelector('.hd-loai')?.value||'',
        mo_ta_loi: row.querySelector('.hd-mo-ta')?.value||'',
        cach_sua:  row.querySelector('.hd-cach-sua')?.value||'',
        vi_du:     '',
      })).filter(h=>h.mo_ta_loi);
      if (huongDan.length) await API.saveHuongDan(id, huongDan);

      if(msg) msg.textContent='✅ Đã lưu thành công!';
      if (typeof toast === 'function') toast('✅ Đã lưu bài tập ' + id);
    } catch(e) {
      if(msg) msg.textContent='❌ Lỗi: '+e.message;
    }
  }

  async function _syncExercises() {
    if (!confirm('Sync toàn bộ bài tập lên Google Sheets? (có thể mất 1-2 phút)')) return;
    const allEx = [...(typeof EXERCISES!=='undefined'?EXERCISES:[]),...(typeof EXERCISES_K12!=='undefined'?EXERCISES_K12:[])];
    try {
      const r = await API.syncExercises(allEx);
      if (typeof toast === 'function') toast(`✅ Đã sync ${r.synced} bài tập lên Sheets`);
    } catch(e) {
      if (typeof toast === 'function') toast('❌ Sync thất bại: '+e.message);
    }
  }

  function _previewEx(id) {
    if (typeof loadExercise === 'function') { loadExercise(id); close(); }
  }

  // ══════════════════════════════════════════════════════════════════
  //  CẤU HÌNH
  // ══════════════════════════════════════════════════════════════════
  function renderConfig(el) {
    const url = API.getUrl() || '';
    el.innerHTML = `
      <div class="tp-config-body">
        <div class="tp-section-title">🔗 Apps Script URL</div>
        <div class="tp-config-field">
          <label>Web App URL</label>
          <input id="cfg-url" type="url" value="${esc(url)}" placeholder="https://script.google.com/macros/s/.../exec">
          <div class="cfg-hint">Google Sheet → Extensions → Apps Script → Deploy → Web App → Execute as: Me → Anyone with access → Copy URL</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
          <button class="tp-save-btn" onclick="TeacherPanel._saveUrl()">💾 Lưu URL</button>
          <button class="tp-action-btn" onclick="TeacherPanel._ping()">🔔 Kiểm tra</button>
          <button class="tp-action-btn" onclick="TeacherPanel._createTables()">🏗 Tạo bảng Sheets</button>
        </div>
        <div id="cfg-msg" style="margin-top:8px;font-size:12px;min-height:16px"></div>

        <div class="tp-section-title" style="margin-top:24px">🌳 Cấu trúc Google Drive</div>
        <div class="tp-schema">
          <div class="schema-tab">📁 CodeLab/</div>
          <div class="schema-row">├── 📊 01_TaiKhoan.gsheet → [GiaoVien] [HocSinh]</div>
          <div class="schema-row">├── 📊 02_BaiTap.gsheet → [BaiTap] [LyThuyet] [CodeMau] [TieuChi] [HuongDan]</div>
          <div class="schema-row">├── 📊 03_KiemTra.gsheet → [DanhSach] [BaiTapKT]</div>
          <div class="schema-row">├── 📊 04_KetQua.gsheet → [BangDiem] [LichSuLam]</div>
          <div class="schema-row">└── 📊 05_NhatKy.gsheet → [TruyCap] [ViPham]</div>
        </div>

        <div class="tp-section-title" style="margin-top:20px">🛠 Công cụ</div>
        <div class="tp-tools-grid">
          <div class="tp-tool-card" onclick="typeof SheetsDB!=='undefined'&&SheetsDB.exportToCSV()">
            <div class="tp-tool-icon">📤</div><div class="tp-tool-name">Xuất CSV bài tập</div>
          </div>
          <div class="tp-tool-card" onclick="typeof SheetsDB!=='undefined'&&SheetsDB.downloadOffline()">
            <div class="tp-tool-icon">⬇️</div><div class="tp-tool-name">Bản offline</div>
          </div>
          <div class="tp-tool-card" onclick="API.dailyCleanup();if(typeof toast!=='undefined')toast('✅ Cache đã dọn')">
            <div class="tp-tool-icon">🗑️</div><div class="tp-tool-name">Dọn cache</div>
          </div>
          <div class="tp-tool-card" onclick="TeacherPanel._changePass()">
            <div class="tp-tool-icon">🔑</div><div class="tp-tool-name">Đổi mật khẩu</div>
          </div>
        </div>
      </div>`;
  }

  function _saveUrl() {
    const url = document.getElementById('cfg-url')?.value?.trim();
    if (!url) { document.getElementById('cfg-msg').textContent='⚠️ Vui lòng nhập URL'; return; }
    API.setUrl(url);
    if (typeof Auth !== 'undefined') Auth.setConfig(url);
    document.getElementById('cfg-msg').textContent='✅ Đã lưu';
  }

  async function _ping() {
    const msg = document.getElementById('cfg-msg');
    msg.textContent='⏳ Đang kiểm tra...';
    const r = await API.ping();
    msg.textContent = r.ok ? `✅ Kết nối OK • ${r.latency}ms • v${r.version}` : '❌ Lỗi: '+r.error;
  }

  async function _createTables() {
    const msg = document.getElementById('cfg-msg');
    msg.textContent='⏳ Đang tạo bảng...';
    try {
      const r = await API.createTables();
      msg.textContent = `✅ Đã tạo: ${(r.created||[]).join(', ') || 'Các bảng đã tồn tại'}`;
    } catch(e) { msg.textContent='❌ '+e.message; }
  }

  function _changePass() {
    const old = prompt('Mật khẩu cũ:');
    if (!old) return;
    const neu = prompt('Mật khẩu mới (>=6 ký tự):');
    if (!neu) return;
    API.changePassword(old, neu)
      .then(()=>{ if(typeof toast!=='undefined') toast('✅ Đã đổi mật khẩu'); })
      .catch(e=>{ if(typeof toast!=='undefined') toast('❌ '+e.message); });
  }

  // ── Helpers ─────────────────────────────────────────────────────
  function _filter(tbodyId, q) {
    q = q.toLowerCase();
    document.querySelectorAll('#'+tbodyId+' tr').forEach(tr => {
      tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }

  function exportScores() {
    const rows = [...document.querySelectorAll('#sc-tbody tr')].map(tr =>
      [...tr.querySelectorAll('td')].map(td=>td.textContent.trim())
    );
    const csv = '\uFEFF' + ['Thời gian,MSHS,Họ tên,Lớp,Bài tập,Điểm',...rows.map(r=>r.map(c=>`"${c.replace(/"/g,'""')}"`).join(','))].join('\n');
    Object.assign(document.createElement('a'),{
      href:URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),
      download:`bangdiem-${new Date().toISOString().slice(0,10)}.csv`
    }).click();
  }

  function recordScore(user, exercise, score, thoiGian) {
    if (!user || user.role==='teacher') return;
    API.submitScore(exercise.id, exercise.title, score, thoiGian||0);
  }

  return {
    open, close, _tab,
    _filter, _newExam, _editExam, _showExamForm, _selAll, _filterEx, _submitExam, _toggleExam, _deleteExam,
    _edLoadChap, _edLoadList, _edEdit, _edTab, _addTieuChi, _addHuongDan, _saveExDetail, _syncExercises, _previewEx,
    _saveUrl, _ping, _createTables, _changePass,
    exportScores, recordScore,
  };
})();
