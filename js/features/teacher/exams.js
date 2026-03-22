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
