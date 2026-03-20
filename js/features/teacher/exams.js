/**
 * features/teacher/exams.js — Teacher Panel: Tab Kiểm tra (v2)
 * Hỗ trợ: xáo đề, chọn ngẫu nhiên theo bloom, 1 lần nộp, PDF, timer
 * @requires core/*, CL.API, exercises/registry.js
 */
'use strict';

CL.define('Teacher.Exams', () => {
  const Utils    = CL.require('Utils');
  const Events   = CL.require('Events');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  const STATUS = { draft:'⬜ Nháp', active:'🟢 Đang mở', closed:'🔴 Đã đóng' };
  const BLOOM_LABELS = { b1:'B1', b2:'B2', b3:'B3', b4:'B4', b5:'B5', b6:'B6' };

  // ── Main render ───────────────────────────────────────────────

  async function render(el) {
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    try {
      const exams = await CL.API.getExams(true);
      el.innerHTML = `
        <div class="exam-toolbar">
          <button class="auth-btn" style="padding:7px 14px;font-size:12px"
            onclick="CL.Teacher.Exams.showForm({})">+ Tạo kỳ kiểm tra</button>
          <button class="tp-refresh" onclick="CL.Teacher.Panel.switchTab('exams')">🔄</button>
        </div>
        <div class="exam-list">
          ${exams.length ? exams.map(_card).join('') : '<div class="tp-empty">📋 Chưa có kỳ kiểm tra nào.</div>'}
        </div>
        <div id="exam-form" style="display:none"></div>`;
    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  function _card(exam) {
    const flags = [];
    if (exam.che_do_tron_de) flags.push('🔀 Xáo đề');
    if (exam.toan_ven_1_lan) flags.push('🔒 1 lần');
    if (exam.so_bai_random > 0) flags.push(`🎲 ${exam.so_bai_random} bài`);
    if (exam.mat_khau) flags.push('🔐 Có mã');

    return `<div class="exam-card">
      <div class="ec-header">
        <div class="ec-info">
          <span class="ec-name">${Utils.escHtml(exam.ten)}</span>
          <span class="ec-meta">
            ${Utils.escHtml(exam.lop||'Tất cả lớp')} · ${exam.thoi_gian_phut||45}' ·
            ${(exam.bai_tap||[]).length} bài
            ${flags.length ? '· ' + flags.join(' · ') : ''}
          </span>
          ${exam.ngay_thi ? `<span class="ec-date">📅 ${exam.ngay_thi}</span>` : ''}
        </div>
        <div style="display:flex;gap:4px;align-items:center;flex-shrink:0">
          <span class="ec-status ${exam.trang_thai}">${STATUS[exam.trang_thai]||exam.trang_thai}</span>
          <button class="tp-action-btn" onclick="CL.Teacher.Exams.editExam('${Utils.escHtml(exam.id)}')">✏️</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Exams.toggleExam('${Utils.escHtml(exam.id)}','${exam.trang_thai}')">
            ${exam.trang_thai==='active'?'🔴 Đóng':'🟢 Mở'}</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Exams.viewResults('${Utils.escHtml(exam.id)}')" title="Xem kết quả">📊</button>
          <button class="tp-action-btn" onclick="CL.Teacher.Exams.deleteExam('${Utils.escHtml(exam.id)}')" style="color:var(--error)">🗑</button>
        </div>
      </div>
      ${exam.mo_ta ? `<div class="ec-desc">${Utils.escHtml(exam.mo_ta)}</div>` : ''}
    </div>`;
  }

  // ── Exam Form ─────────────────────────────────────────────────

  function showForm(exam) {
    const form = document.getElementById('exam-form');
    if (!form) return;
    form.style.display = 'block';
    const isEdit = !!exam.id;
    const selected = new Set(exam.bai_tap||[]);

    // Build exercise table with bloom tags
    const allExs = Registry.getAll();
    const groups = Utils.groupBy(allExs, e => e.bo ? `${e.g}-${e.bo}` : e.g);

    const exSelector = Object.entries(groups).map(([g, exs]) => {
      const byChap = Utils.groupBy(exs, e => e.ch);
      return `<div class="ef-group-header">${Utils.escHtml(g)}</div>
        ${Object.entries(byChap).map(([ch, ces]) => {
          const byBloom = Utils.groupBy(ces, e => {
            const m = e.id.match(/-b([1-6])-/); return m ? 'b'+m[1] : 'b3';
          });
          return `<div class="ef-chapter">
            <div class="ef-ch-label">
              ${Utils.escHtml(ch)}
              <div style="display:flex;gap:3px">
                ${Object.keys(BLOOM_LABELS).map(lv =>
                  `<button type="button" class="ef-sel-bloom" data-bloom="${lv}"
                    data-grp="${Utils.escHtml(g)}__${Utils.escHtml(ch)}"
                    onclick="CL.Teacher.Exams.selectBloom(this,'${lv}','${Utils.escHtml(g)}__${Utils.escHtml(ch)}')"
                    title="Chọn tất cả ${BLOOM_LABELS[lv]}">${BLOOM_LABELS[lv]}</button>`
                ).join('')}
                <button type="button" class="ef-sel-all"
                  onclick="CL.Teacher.Exams.selectAll(this,'${Utils.escHtml(g)}__${Utils.escHtml(ch)}')">Tất cả</button>
              </div>
            </div>
            ${ces.map(e => {
              const bloomClass = (e.id.match(/-b([1-6])-/)||[])[1] || '3';
              return `<label class="ef-ex">
                <input type="checkbox" name="ex" value="${Utils.escHtml(e.id)}"
                  data-grp="${Utils.escHtml(g)}__${Utils.escHtml(ch)}"
                  data-bloom="${'b'+bloomClass}"
                  data-weight="1.0"
                  ${selected.has(e.id)?'checked':''}>
                <span class="ef-lv-dot bloom-b${bloomClass}">${'B'+bloomClass}</span>
                <span class="ef-ex-title">${Utils.escHtml(e.num)} ${Utils.escHtml(e.title)}</span>
                <input class="ef-weight" type="number" step="0.5" min="0.5" max="5"
                  value="1.0" title="Hệ số điểm" style="width:46px;font-size:10px;padding:1px 4px">
              </label>`;
            }).join('')}
          </div>`;
        }).join('')}`;
    }).join('');

    form.innerHTML = `
      <div class="ef-title">${isEdit?'✏️ Chỉnh sửa':'+ Tạo'} kỳ kiểm tra</div>

      <!-- Row 1: Tên + Lớp -->
      <div class="ef-row">
        <div class="ef-field"><label>Tên kỳ kiểm tra *</label>
          <input id="ef-ten" type="text" value="${Utils.escHtml(exam.ten||'')}" placeholder="VD: Kiểm tra 15 phút Bài 17"></div>
        <div class="ef-field"><label>Lớp áp dụng</label>
          <input id="ef-lop" type="text" value="${Utils.escHtml(exam.lop||'')}" placeholder="10A1, 10A2 (rỗng = tất cả)"></div>
      </div>

      <!-- Row 2: Thời gian + Ngày -->
      <div class="ef-row">
        <div class="ef-field"><label>⏱ Thời gian làm bài (phút)</label>
          <input id="ef-tg" type="number" value="${exam.thoi_gian_phut||45}" min="5" max="180"></div>
        <div class="ef-field"><label>📅 Ngày thi</label>
          <input id="ef-ngay" type="date" value="${exam.ngay_thi||''}"></div>
      </div>

      <!-- Row 3: Options -->
      <div class="ef-options-grid">
        <label class="ef-opt-item">
          <input type="checkbox" id="ef-tron" ${exam.che_do_tron_de?'checked':''}>
          <div class="ef-opt-label"><span>🔀</span>Xáo đề ngẫu nhiên</div>
          <div class="ef-opt-desc">Mỗi học sinh nhận thứ tự bài khác nhau</div>
        </label>
        <label class="ef-opt-item">
          <input type="checkbox" id="ef-1lan" ${exam.toan_ven_1_lan?'checked':''}>
          <div class="ef-opt-label"><span>🔒</span>Nộp 1 lần duy nhất</div>
          <div class="ef-opt-desc">Không cho sửa sau khi đã nộp từng câu</div>
        </label>
        <label class="ef-opt-item">
          <input type="checkbox" id="ef-dapan" ${exam.cho_xem_dap_an?'checked':''}>
          <div class="ef-opt-label"><span>💡</span>Cho xem gợi ý sau khi nộp</div>
          <div class="ef-opt-desc">Hiện gợi ý đáp án nếu điểm < 9.5</div>
        </label>
        <label class="ef-opt-item">
          <input type="checkbox" id="ef-fullscreen" checked>
          <div class="ef-opt-label"><span>🖥</span>Bắt buộc toàn màn hình</div>
          <div class="ef-opt-desc">Rời toàn màn hình = cảnh báo vi phạm</div>
        </label>
      </div>

      <!-- Row 4: Mã phòng thi + Random -->
      <div class="ef-row">
        <div class="ef-field"><label>🔐 Mã vào phòng thi (tùy chọn)</label>
          <input id="ef-matkhau" type="text" value="${Utils.escHtml(exam.mat_khau||'')}" placeholder="Để trống = không cần mã"></div>
        <div class="ef-field">
          <label>🎲 Chọn ngẫu nhiên N bài (0 = tất cả)</label>
          <input id="ef-random" type="number" value="${exam.so_bai_random||0}" min="0" max="50">
        </div>
      </div>

      <!-- Row 5: Bloom filter -->
      <div class="ef-field">
        <label>📊 Cơ cấu đề theo mức Bloom (để trống = không dùng)</label>
        <div class="ef-bloom-grid">
          ${Object.entries(BLOOM_LABELS).map(([lv, label]) => {
            const cur = exam.bloom_filter?.[lv] || 0;
            return `<div class="ef-bloom-item">
              <span class="bloom-badge bloom-${lv}">${label}</span>
              <input type="number" id="ef-bloom-${lv}" value="${cur}"
                min="0" max="10" style="width:48px;font-size:11px" placeholder="0">
              <span style="font-size:10px;color:var(--text3)">bài</span>
            </div>`;
          }).join('')}
        </div>
        <div class="ef-opt-desc" style="margin-top:4px">
          VD: B1=1, B3=2, B5=1 → đề có 4 câu với đúng mức Bloom. Ưu tiên hơn "Chọn ngẫu nhiên N bài".
        </div>
      </div>

      <!-- Row 6: Mô tả -->
      <div class="ef-field"><label>Mô tả / Hướng dẫn cho học sinh</label>
        <textarea id="ef-mota" rows="2" placeholder="Hướng dẫn làm bài...">${Utils.escHtml(exam.mo_ta||'')}</textarea></div>

      <!-- Row 7: Exercise selection -->
      <div class="ef-field">
        <label>
          Bài tập ngân hàng (<span id="ef-cnt">${selected.size}</span> đã chọn)
          <input id="ef-search-ex" type="text" placeholder="🔍 Tìm..."
            style="margin-left:8px;width:160px;font-size:11px;padding:3px 8px"
            oninput="CL.Teacher.Exams.filterEx(this.value)">
        </label>
        <div class="ef-ex-list" style="max-height:300px">${exSelector}</div>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="auth-btn" style="padding:8px 14px;font-size:12px"
          onclick="CL.Teacher.Exams.saveExam('${exam.id||''}')">💾 ${isEdit?'Lưu thay đổi':'Tạo kỳ kiểm tra'}</button>
        <button class="auth-btn" style="padding:8px 14px;font-size:12px;background:var(--surface2);border:1px solid var(--border);color:var(--text)"
          onclick="CL.Teacher.Exams.previewExam()">👁 Preview đề</button>
        <button class="tp-cancel-btn" onclick="document.getElementById('exam-form').style.display='none'">Hủy</button>
      </div>
      <div id="ef-msg" style="font-size:11px;margin-top:8px;color:var(--accent2)"></div>`;

    // Wire checkbox counters
    document.querySelectorAll('#exam-form input[name="ex"]').forEach(cb =>
      cb.addEventListener('change', _updateCount)
    );
    form.scrollIntoView({ behavior: 'smooth' });
  }

  function _updateCount() {
    const n  = document.querySelectorAll('#exam-form input[name="ex"]:checked').length;
    const el = document.getElementById('ef-cnt');
    if (el) el.textContent = n;
  }

  function selectBloom(btn, bloom, grp) {
    const boxes = document.querySelectorAll(`#exam-form input[data-grp="${grp}"][data-bloom="${bloom}"]`);
    const all   = [...boxes].every(b => b.checked);
    boxes.forEach(b => b.checked = !all);
    _updateCount();
  }

  function selectAll(btn, grp) {
    const boxes = document.querySelectorAll(`#exam-form input[data-grp="${grp}"]`);
    const all   = [...boxes].every(b => b.checked);
    boxes.forEach(b => b.checked = !all);
    _updateCount();
  }

  function filterEx(q) {
    q = q.toLowerCase();
    document.querySelectorAll('.ef-ex').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }

  function previewExam() {
    // Show what the exam will look like
    const ten = document.getElementById('ef-ten')?.value?.trim() || 'Đề thử';
    const tg  = document.getElementById('ef-tg')?.value || 45;
    const items = [...document.querySelectorAll('#exam-form input[name="ex"]:checked')];
    if (!items.length) { Toast.warn('Chọn ít nhất 1 bài tập'); return; }
    const preview = window.open('', '_blank', 'width=700,height=900');
    const qs = items.map((cb, i) => {
      const ex = Registry.findById(cb.value);
      if (!ex) return '';
      const wt = cb.closest('.ef-ex')?.querySelector('.ef-weight')?.value || '1.0';
      return `<div style="border:1px solid #e5e7eb;border-radius:8px;padding:14px;margin-bottom:12px">
        <div style="font-weight:700;font-size:13px">Câu ${i+1}: ${ex.num} — ${ex.title}</div>
        <div style="font-size:11px;color:#888;margin:3px 0">Mức: ${ex.lv} · Hệ số: ×${wt}</div>
        <div style="font-size:12px;margin-top:8px;color:#374151">${ex.desc||''}</div>
      </div>`;
    }).join('');
    preview.document.write(`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8">
    <style>body{font-family:Arial;padding:24px;font-size:13px}h2{color:#1a73e8}</style></head>
    <body><h2>📋 ${ten}</h2>
    <p>Thời gian: <b>${tg} phút</b> · Số câu: <b>${items.length}</b></p>
    <hr>${qs}</body></html>`);
    preview.document.close();
  }

  // ── Save exam ─────────────────────────────────────────────────

  async function saveExam(existId) {
    const msg = document.getElementById('ef-msg');
    const ten  = document.getElementById('ef-ten')?.value?.trim();
    if (!ten) { if(msg) msg.textContent='⚠️ Vui lòng nhập tên'; return; }

    const items = [...document.querySelectorAll('#exam-form input[name="ex"]:checked')];
    if (!items.length) { if(msg) msg.textContent='⚠️ Chọn ít nhất 1 bài tập'; return; }

    // Collect bloom filter
    const bloomFilter = {};
    let hasBloom = false;
    for (const lv of ['b1','b2','b3','b4','b5','b6']) {
      const v = parseInt(document.getElementById(`ef-bloom-${lv}`)?.value || '0');
      if (v > 0) { bloomFilter[lv] = v; hasBloom = true; }
    }

    // Collect bai_tap_detail
    const baiTapDetail = items.map((cb, i) => {
      const wt = parseFloat(cb.closest('.ef-ex')?.querySelector('.ef-weight')?.value || '1.0') || 1.0;
      return {
        bai_id: cb.value,
        thu_tu: i + 1,
        nhom:   cb.dataset.grp || '',
        diem_co_phan: wt,
        bloom_level: cb.dataset.bloom || '',
      };
    });

    if(msg) msg.textContent = '⏳ Đang lưu...';
    try {
      const r = await CL.API.saveExam({
        id: existId || undefined,
        ten,
        lop:             document.getElementById('ef-lop')?.value?.trim()     || '',
        thoi_gian_phut:  parseInt(document.getElementById('ef-tg')?.value)    || 45,
        ngay_thi:        document.getElementById('ef-ngay')?.value            || '',
        mo_ta:           document.getElementById('ef-mota')?.value?.trim()    || '',
        trang_thai:      existId ? undefined : 'draft',
        che_do_tron_de:  document.getElementById('ef-tron')?.checked  || false,
        toan_ven_1_lan:  document.getElementById('ef-1lan')?.checked  || false,
        cho_xem_dap_an:  document.getElementById('ef-dapan')?.checked || false,
        mat_khau:        document.getElementById('ef-matkhau')?.value?.trim() || '',
        so_bai_random:   parseInt(document.getElementById('ef-random')?.value) || 0,
        bloom_filter:    hasBloom ? JSON.stringify(bloomFilter) : '',
        bai_tap:         baiTapDetail.map(b => b.bai_id),
        bai_tap_detail:  baiTapDetail,
      });
      if(msg) msg.textContent = `✅ Đã lưu! ID: ${r.id}`;
      Events.emit('exam:saved', { id: r.id });
      setTimeout(() => CL.Teacher.Panel.switchTab('exams'), 1200);
    } catch(e) { if(msg) msg.textContent='❌ '+e.message; }
  }

  // ── Edit, toggle, delete, results ────────────────────────────

  async function editExam(id) {
    const exams = await CL.API.getExams(true);
    const exam  = exams.find(e => e.id === id);
    if (exam) showForm(exam);
  }

  async function toggleExam(id, cur) {
    const next = cur==='active' ? 'closed' : 'active';
    if (!await Toast.confirm(`${next==='active'?'🟢 Mở':'🔴 Đóng'} kỳ kiểm tra này?`)) return;
    await CL.API.setExamStatus(id, next);
    Events.emit('exam:status-changed', { examId: id, status: next });
    CL.Teacher.Panel.switchTab('exams');
  }

  async function deleteExam(id) {
    if (!await Toast.confirm('🗑 Xóa kỳ kiểm tra? Không thể hoàn tác.')) return;
    await CL.API.deleteExam(id);
    CL.Teacher.Panel.switchTab('exams');
  }

  async function viewResults(examId) {
    const body = document.getElementById('tp-body');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tải kết quả...</div>';
    try {
      const scores = await CL.API.getScores(true);
      const examScores = scores.filter(s => s.ky_kt_id === examId || s.bai_id === examId);

      if (!examScores.length) {
        body.innerHTML = `<div class="tp-empty">📭 Chưa có học sinh nộp bài.<br>
          <button class="tp-action-btn" onclick="CL.Teacher.Panel.switchTab('exams')" style="margin-top:10px">← Quay lại</button></div>`;
        return;
      }

      // Group by student
      const byStudent = Utils.groupBy(examScores, s => s.mshs);
      const avg = examScores.reduce((s, r) => s + (parseFloat(r.diem)||0), 0) / examScores.length;

      body.innerHTML = `
        <div style="padding:10px 14px;display:flex;align-items:center;gap:8px">
          <button class="tp-action-btn" onclick="CL.Teacher.Panel.switchTab('exams')">← Danh sách</button>
          <div style="font-weight:700;font-size:13px">Kết quả kỳ thi</div>
        </div>
        <div class="tp-score-header">
          <div class="tp-stat"><div class="tp-stat-n">${Object.keys(byStudent).length}</div><div class="tp-stat-l">Học sinh</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${examScores.length}</div><div class="tp-stat-l">Bài nộp</div></div>
          <div class="tp-stat"><div class="tp-stat-n">${avg.toFixed(1)}</div><div class="tp-stat-l">Điểm TB</div></div>
          <button class="tp-refresh" onclick="CL.Teacher.Exams.exportResultsCsv('${examId}')">📥 CSV</button>
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
    } catch(e) { body.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  async function exportResultsCsv(examId) {
    const scores = await CL.API.getScores(true);
    const rows = [['MSHS','Họ tên','Lớp','Điểm','Thời gian nộp']];
    scores.filter(s => s.ky_kt_id === examId || s.bai_id === examId).forEach(r => {
      rows.push([r.mshs, r.ho_ten, r.lop, r.diem, r.ts]);
    });
    Utils.downloadCsv(rows, `ket-qua-ky-thi-${examId.slice(-6)}.csv`);
  }

  return { render, showForm, editExam, selectBloom, selectAll, filterEx, previewExam,
           saveExam, toggleExam, deleteExam, viewResults, exportResultsCsv };
});
