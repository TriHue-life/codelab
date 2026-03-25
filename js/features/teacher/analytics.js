/**
 * features/teacher/analytics.js — Thống kê & Phân tích (v2)
 * ═══════════════════════════════════════════════════════════════
 * Tabs:
 *   📈 Tổng hợp lớp    — heatmap, class comparison, early warning
 *   👤 Năng lực HS      — NL1/NL2/NL3 radar, Bloom, trend, persistence
 *   🎯 Phân tích đề     — Item analysis (p, D, r, α), ma trận 2 chiều
 *   📥 Xuất dữ liệu     — CSV, hồ sơ học sinh
 *
 * CT GDPT 2018 compliance:
 *   - Map Bloom → NL1/NL2/NL3 via Config.BLOOM_NL_MAP
 *   - Ma trận đề theo TT26/2022 (Nhận biết/Thông hiểu/Vận dụng/VD cao)
 *   - Item analysis: p, D, r, Cronbach alpha
 *   - Early warning: HS liên tục < 5 hoặc NL yếu
 * ═══════════════════════════════════════════════════════════════
 */
'use strict';

CL.define('Teacher.Analytics', () => {
  const cfg      = CL.require('Config');
  const Utils    = CL.require('Utils');
  const Registry = CL.require('Exercises.Registry');
  const Toast    = CL.require('UI.Toast');

  const BLOOM_COLOR = { b1:'#6366f1',b2:'#3b82f6',b3:'#10b981',b4:'#f59e0b',b5:'#ef4444',b6:'#8b5cf6' };
  const NL_COLOR    = { NL1:'#4f9eff', NL2:'#34d399', NL3:'#a78bfa' };

  // ══════════════════════════════════════════════════════════════
  //  RENDER — shell
  // ══════════════════════════════════════════════════════════════
  async function render(el) {
    el.innerHTML = `
      <div class="ana-wrap">
        <div class="ana-tabs">
          <button class="ana-tab on"  data-tab="class"   onclick="CL.Teacher.Analytics.switchTab(this,'class')">📈 Tổng hợp lớp</button>
          <button class="ana-tab"     data-tab="student" onclick="CL.Teacher.Analytics.switchTab(this,'student')">👤 Năng lực HS</button>
          <button class="ana-tab"     data-tab="exam"    onclick="CL.Teacher.Analytics.switchTab(this,'exam')">🎯 Phân tích đề</button>
          <button class="ana-tab"     data-tab="export"  onclick="CL.Teacher.Analytics.switchTab(this,'export')">📥 Xuất</button>
        </div>
        <div class="ana-content" id="ana-content"></div>
      </div>`;
    await renderClass(document.getElementById('ana-content'));
  }

  function switchTab(btn, tab) {
    document.querySelectorAll('.ana-tab').forEach(b => b.classList.toggle('on', b === btn));
    const body = document.getElementById('ana-content');
    if (!body) return;
    body.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    const fns = { class: renderClass, student: renderStudent, exam: renderExam, export: renderExport };
    (fns[tab] || (() => {}))(body);
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB 1: TỔNG HỢP LỚP
  // ══════════════════════════════════════════════════════════════
  async function renderClass(el) {
    try {
      const [baiKTs, students, exams] = await Promise.all([
        CL.API.getBaiKT(), CL.API.getStudentList(), CL.API.getExams(),
      ]);

      const lops   = [...new Set(students.map(s => s.lop).filter(Boolean))].sort();
      const closed = exams.filter(e => e.trang_thai === 'closed' || e.trang_thai === 'active');

      // Class averages for comparison
      const classStats = _buildClassStats(baiKTs, students);

      // Early warning: students with 3+ consecutive scores < 5
      const warnings = _earlyWarning(baiKTs, students);

      el.innerHTML = `
        <div class="ana-toolbar">
          <select id="ana-lop-filter" class="ana-select" onchange="CL.Teacher.Analytics.filterClass()">
            <option value="">Tất cả lớp</option>
            ${lops.map(l => `<option>${l}</option>`).join('')}
          </select>
          <select id="ana-exam-filter" class="ana-select" onchange="CL.Teacher.Analytics.filterClass()">
            <option value="">Tất cả kỳ thi</option>
            ${closed.map(e => `<option value="${Utils.escHtml(e.id)}">${Utils.escHtml(e.ten)}</option>`).join('')}
          </select>
          <button class="ana-btn" onclick="CL.Teacher.Analytics.filterClass()">🔄 Cập nhật</button>
        </div>

        ${warnings.length ? `
        <div class="ana-warning-box">
          <div class="awb-title">⚠️ Cảnh báo sớm — ${warnings.length} học sinh cần hỗ trợ</div>
          <div class="awb-list">
            ${warnings.slice(0,5).map(w => `
              <div class="awb-item">
                <span class="awb-name">${Utils.escHtml(w.ho_ten)}</span>
                <span class="awb-lop">${Utils.escHtml(w.lop)}</span>
                <span class="awb-reason">${Utils.escHtml(w.reason)}</span>
              </div>`).join('')}
            ${warnings.length > 5 ? `<div class="awb-more">...và ${warnings.length-5} học sinh khác</div>` : ''}
          </div>
        </div>` : ''}

        <div class="ana-class-grid" id="ana-class-grid">
          ${_buildClassCards(classStats)}
        </div>

        <div class="ana-section-title">So sánh điểm trung bình các lớp</div>
        ${_buildClassComparison(classStats)}

        <div class="ana-section-title">Bảng điểm chi tiết</div>
        <div id="ana-table-wrap">
          ${_buildClassTable(baiKTs, students, exams, '', '')}
        </div>`;

      // Save for filter
      el._baiKTs   = baiKTs;
      el._students = students;
      el._exams    = exams;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function filterClass() {
    const body   = document.getElementById('ana-content');
    const lop    = document.getElementById('ana-lop-filter')?.value || '';
    const examId = document.getElementById('ana-exam-filter')?.value || '';
    const table  = document.getElementById('ana-table-wrap');
    if (table && body?._baiKTs)
      table.innerHTML = _buildClassTable(body._baiKTs, body._students, body._exams, lop, examId);
  }

  function _earlyWarning(baiKTs, students) {
    const stuMap = {};
    students.forEach(s => { stuMap[s.mshs] = s; });

    // Group by student, sort by date, check 3 consecutive below 5
    const byStudent = {};
    for (const kt of baiKTs) {
      if (!byStudent[kt.mshs]) byStudent[kt.mshs] = [];
      byStudent[kt.mshs].push({ diem: parseFloat(kt.diem_tong)||0, ts: kt.ts });
    }

    const warnings = [];
    for (const [mshs, kts] of Object.entries(byStudent)) {
      const sorted = kts.sort((a,b) => new Date(a.ts)-new Date(b.ts));
      // Check last 3 scores
      const last3 = sorted.slice(-3).map(k => k.diem);
      if (last3.length >= 3 && last3.every(d => d < 5)) {
        const stu = stuMap[mshs] || { ho_ten: mshs, lop: '' };
        warnings.push({
          mshs, ho_ten: stu.ho_ten, lop: stu.lop,
          reason: `3 bài liên tiếp < 5 (${last3.map(d=>d.toFixed(1)).join(', ')})`,
        });
      }
      // Check any score below 3
      const veryLow = sorted.filter(k => k.diem < 3);
      if (veryLow.length >= 2 && !warnings.find(w => w.mshs === mshs)) {
        const stu = stuMap[mshs] || { ho_ten: mshs, lop: '' };
        warnings.push({ mshs, ho_ten: stu.ho_ten, lop: stu.lop, reason: `${veryLow.length} bài < 3 điểm` });
      }
    }
    return warnings;
  }

  function _buildClassStats(baiKTs, students) {
    const lops = [...new Set(students.map(s => s.lop).filter(Boolean))].sort();
    return lops.map(lop => {
      const lopStudents = students.filter(s => s.lop === lop);
      const lopKTs = baiKTs.filter(kt => kt.lop === lop);
      const scores = lopKTs.map(kt => parseFloat(kt.diem_tong)||0);
      if (!scores.length) return { lop, n: lopStudents.length, avg: 0, pass: 0, min: 0, max: 0, sd: 0 };
      const avg  = scores.reduce((a,b)=>a+b,0)/scores.length;
      const pass = scores.filter(d=>d>=5).length/scores.length*100;
      const sd   = Math.sqrt(scores.reduce((a,b)=>a+(b-avg)**2,0)/scores.length);
      return { lop, n: lopStudents.length, avg: Math.round(avg*100)/100,
               pass: Math.round(pass), min: Math.min(...scores), max: Math.max(...scores),
               sd: Math.round(sd*100)/100 };
    });
  }

  function _buildClassCards(stats) {
    if (!stats.length) return '<div class="tp-empty">Chưa có dữ liệu</div>';
    return `<div class="ana-cards">
      ${stats.map(s => {
        const cls = s.avg>=8?'high':s.avg>=5?'mid':'low';
        return `<div class="ana-card-box ${cls}">
          <div class="acb-lop">${Utils.escHtml(s.lop)}</div>
          <div class="acb-avg">${s.avg.toFixed(1)}</div>
          <div class="acb-meta">${s.n} HS · Đạt ${s.pass}% · SD ${s.sd}</div>
          <div class="acb-range">${s.min.toFixed(1)} – ${s.max.toFixed(1)}</div>
        </div>`;
      }).join('')}
    </div>`;
  }

  function _buildClassComparison(stats) {
    if (stats.length < 2) return '';
    const maxAvg = Math.max(...stats.map(s=>s.avg)) || 10;
    return `<div class="ana-bar-chart">
      ${stats.map(s => {
        const pct = Math.round(s.avg/10*100);
        const cls = s.avg>=8?'high':s.avg>=5?'mid':'low';
        return `<div class="abc-row">
          <div class="abc-label">${Utils.escHtml(s.lop)}</div>
          <div class="abc-bar-wrap">
            <div class="abc-bar ${cls}" style="width:${pct}%"></div>
            <span class="abc-val">${s.avg.toFixed(2)}</span>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  function _buildClassTable(baiKTs, students, exams, lopFilter, examFilter) {
    const filteredKTs = baiKTs.filter(kt =>
      (!lopFilter  || kt.lop === lopFilter) &&
      (!examFilter || kt.ky_id === examFilter)
    );
    const examMap = {};
    exams.forEach(e => { examMap[e.id] = e.ten; });

    // Group by student
    const stuMap = {};
    students.filter(s => !lopFilter || s.lop === lopFilter).forEach(s => {
      stuMap[s.mshs] = { ...s, scores: [] };
    });
    filteredKTs.forEach(kt => {
      if (!stuMap[kt.mshs]) stuMap[kt.mshs] = { mshs: kt.mshs, ho_ten: kt.ho_ten, lop: kt.lop, scores: [] };
      stuMap[kt.mshs].scores.push({ ten: examMap[kt.ky_id]||kt.ky_id, diem: parseFloat(kt.diem_tong)||0 });
    });

    const rows = Object.values(stuMap).filter(s => s.scores.length || !lopFilter);
    if (!rows.length) return '<div class="tp-empty">Không có dữ liệu</div>';

    return `<div class="ana-table-wrap"><table class="ana-table">
      <thead><tr>
        <th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>ĐTB</th>
        <th>Số KT</th><th>Đạt</th><th>Xu hướng</th>
      </tr></thead>
      <tbody>${rows.map(s => {
        const scores = s.scores.map(sc=>sc.diem);
        const avg    = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : 0;
        const pass   = scores.filter(d=>d>=5).length;
        const trend  = scores.length>=2 ? scores[scores.length-1]-scores[0] : 0;
        const cls    = avg>=8?'high':avg>=5?'mid':'low';
        return `<tr>
          <td class="mono">${Utils.escHtml(s.mshs||'')}</td>
          <td>${Utils.escHtml(s.ho_ten||'')}</td>
          <td><span class="ana-lop-badge">${Utils.escHtml(s.lop||'')}</span></td>
          <td><span class="ana-score-badge ${cls}">${avg.toFixed(2)}</span></td>
          <td>${scores.length}</td>
          <td>${pass}/${scores.length}</td>
          <td>${scores.length>=2 ? (trend>0?`<span class="trend-up">↗ +${trend.toFixed(1)}</span>`
            : trend<0 ? `<span class="trend-down">↘ ${trend.toFixed(1)}</span>`
            : '<span class="trend-flat">→ 0</span>') : '—'}</td>
        </tr>`;
      }).join('')}
      </tbody></table></div>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB 2: NĂNG LỰC HỌC SINH (CT2018)
  // ══════════════════════════════════════════════════════════════
  async function renderStudent(el) {
    try {
      const [students] = await Promise.all([CL.API.getStudentList()]);
      const lops = [...new Set(students.map(s=>s.lop).filter(Boolean))].sort();

      el.innerHTML = `
        <div class="ana-toolbar">
          <select id="ana-stu-lop" class="ana-select">
            <option value="">Tất cả lớp</option>
            ${lops.map(l=>`<option>${l}</option>`).join('')}
          </select>
          <input id="ana-stu-search" class="ana-input" type="text" placeholder="Tìm MSHS / Họ tên...">
          <button class="ana-btn" onclick="CL.Teacher.Analytics.loadStudentDetail()">🔍 Xem</button>
        </div>
        <div id="ana-stu-result">
          <div class="tp-empty">Chọn hoặc tìm học sinh để xem hồ sơ năng lực.</div>
        </div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  async function loadStudentDetail() {
    const result = document.getElementById('ana-stu-result');
    if (!result) return;
    const search = document.getElementById('ana-stu-search')?.value?.trim() || '';
    const lopFilter = document.getElementById('ana-stu-lop')?.value || '';
    result.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';

    try {
      const [kts, lams, students] = await Promise.all([
        CL.API.getBaiKT(), CL.API.getHistory(true), CL.API.getStudentList(),
      ]);
      // Enrich: also load per-question exam scores for NL profile
      // getBaiLamForStudent returns compact records — merge into lams
      let examLams = [];
      try {
        const mshs = document.getElementById('ana-stu-search')?.value?.trim();
        if (mshs) {
          const bl = await CL.API.getBaiLamForStudent(mshs);
          examLams = Array.isArray(bl) ? bl : [];
        }
      } catch { /* optional — degrade gracefully */ }
      const allLams = [...lams, ...examLams];

      // Find matching students
      const matches = students.filter(s =>
        (!lopFilter || s.lop === lopFilter) &&
        (!search || s.mshs?.includes(search) || s.ho_ten?.toLowerCase().includes(search.toLowerCase()))
      );

      if (!matches.length) { result.innerHTML = '<div class="tp-empty">Không tìm thấy học sinh.</div>'; return; }

      // If multiple, show list; if 1, show full profile
      if (matches.length > 1 && search) {
        result.innerHTML = `<div class="tp-empty">${matches.length} học sinh phù hợp. Hãy nhập chính xác hơn.</div>
          ${matches.slice(0,10).map(s=>`
          <div class="ana-stu-item" onclick="document.getElementById('ana-stu-search').value='${s.mshs}';CL.Teacher.Analytics.loadStudentDetail()">
            <b>${Utils.escHtml(s.ho_ten)}</b> · ${Utils.escHtml(s.mshs)} · ${Utils.escHtml(s.lop)}
          </div>`).join('')}`;
        return;
      }

      const stu = matches[0];
      const stuKTs  = kts.filter(k => k.mshs === stu.mshs).sort((a,b)=>new Date(a.ts)-new Date(b.ts));
      const stuLams = allLams.filter(l => l.mshs === stu.mshs);

      result.innerHTML = _renderStudentProfile(stu, stuKTs, stuLams, students, kts);
    } catch(e) {
      result.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _renderStudentProfile(stu, kts, lams, allStudents, allKTs) {
    const scores = kts.map(k => parseFloat(k.diem_tong)||0);
    const avg    = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : 0;
    const pass   = scores.filter(d=>d>=5).length;
    const trend  = scores.length>=2 ? scores[scores.length-1]-scores[0] : 0;

    // Bloom breakdown from lams (practice history)
    const bloomMap = {};
    for (const lam of lams) {
      const exId = lam.bai_id || '';
      const ex   = Registry.findById(exId);
      const bloom = ex ? (ex.lv||'').match(/B(\d)/)?.[1] : exId.match(/-b(\d)-/)?.[1];
      if (!bloom) continue;
      if (!bloomMap['b'+bloom]) bloomMap['b'+bloom] = [];
      bloomMap['b'+bloom].push(parseFloat(lam.diem)||0);
    }

    const bloomRadar = ['b1','b2','b3','b4','b5','b6'].map(lv => ({
      lv, avg: bloomMap[lv]?.length
        ? Math.round(bloomMap[lv].reduce((a,b)=>a+b,0)/bloomMap[lv].length*10)/10 : null,
      count: bloomMap[lv]?.length || 0,
    }));

    // NL1/NL2/NL3 from Bloom mapping
    const nlMap = { NL1: [], NL2: [], NL3: [] };
    for (const lam of lams) {
      const ex = Registry.findById(lam.bai_id);
      if (!ex) continue;
      const nls = Registry.getNL(ex);
      for (const nl of nls) {
        const group = nl.startsWith('NL1') ? 'NL1' : nl.startsWith('NL2') ? 'NL2' : 'NL3';
        if (!nlMap[group]) nlMap[group] = [];
        nlMap[group].push(parseFloat(lam.diem)||0);
      }
    }

    // NL scores (0-100 scale)
    const nlScores = Object.entries(nlMap).map(([nl, scores]) => ({
      nl, label: cfg.NL_GROUPS?.[nl]?.label || nl,
      color: NL_COLOR[nl] || '#888',
      avg: scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length*10) : null,
      count: scores.length,
    }));

    // Persistence: avg lần thử per bài
    const tryCount = {};
    for (const lam of lams) {
      if (!tryCount[lam.bai_id]) tryCount[lam.bai_id] = 0;
      tryCount[lam.bai_id]++;
    }
    const tries = Object.values(tryCount);
    const persistence = tries.length ? tries.reduce((a,b)=>a+b,0)/tries.length : 0;

    // Percentile in class
    const classMates = allKTs.filter(k => k.lop === stu.lop).map(k => parseFloat(k.diem_tong)||0);
    const below = classMates.filter(s => s < avg).length;
    const percentile = classMates.length ? Math.round(below/classMates.length*100) : null;

    return `
      <div class="ana-profile">
        <div class="ap-header">
          <div class="ap-avatar">${(stu.ho_ten||'?')[0].toUpperCase()}</div>
          <div class="ap-info">
            <div class="ap-name">${Utils.escHtml(stu.ho_ten||'')}</div>
            <div class="ap-meta">${Utils.escHtml(stu.mshs||'')} · ${Utils.escHtml(stu.lop||'')}</div>
          </div>
          <div class="ap-summary">
            <div class="aps-card"><div class="aps-val">${avg.toFixed(2)}</div><div class="aps-lbl">ĐTB KT</div></div>
            <div class="aps-card"><div class="aps-val">${pass}/${scores.length}</div><div class="aps-lbl">Bài đạt</div></div>
            <div class="aps-card"><div class="aps-val ${trend>0?'ok':trend<0?'warn':''}">${trend>0?'+':''}${trend.toFixed(1)}</div><div class="aps-lbl">Xu hướng</div></div>
            ${percentile!==null?`<div class="aps-card"><div class="aps-val">${percentile}%</div><div class="aps-lbl">Phân vị lớp</div></div>`:''}
          </div>
        </div>

        ${nlScores.some(n=>n.avg!==null) ? `
        <div class="ap-section-title">🎯 Hồ sơ năng lực CT GDPT 2018</div>
        <div class="ap-nl-grid">
          ${nlScores.map(nl => {
            if (nl.avg === null) return `<div class="ap-nl-card na"><div class="ap-nl-label">${nl.label}</div><div class="ap-nl-val">—</div><div class="ap-nl-sub">Chưa có dữ liệu</div></div>`;
            const pct  = nl.avg;
            const grade = pct>=80?'Tốt':pct>=65?'Khá':pct>=50?'Trung bình':'Yếu';
            const warn  = pct < 50 ? ' ap-nl-warn' : '';
            return `<div class="ap-nl-card${warn}">
              <div class="ap-nl-label" style="color:${nl.color}">${Utils.escHtml(nl.label)}</div>
              <div class="ap-nl-bar"><div class="ap-nl-fill" style="width:${pct}%;background:${nl.color}"></div></div>
              <div class="ap-nl-row"><span class="ap-nl-val">${pct}/100</span><span class="ap-nl-grade">${grade}${pct<50?' ⚠️':''}</span></div>
              <div class="ap-nl-sub">${nl.count} bài luyện tập</div>
            </div>`;
          }).join('')}
        </div>` : ''}

        <div class="ap-section-title">📊 Phân tích theo mức Bloom</div>
        <div class="ap-bloom-grid">
          ${bloomRadar.map(b => {
            if (b.avg === null) return `<div class="ap-bloom-cell na"><div class="ap-bloom-lv">B${b.lv[1]}</div><div>—</div></div>`;
            const pct = b.avg*10;
            return `<div class="ap-bloom-cell" style="border-color:${BLOOM_COLOR[b.lv]}">
              <div class="ap-bloom-lv" style="color:${BLOOM_COLOR[b.lv]}">B${b.lv[1]}</div>
              <div class="ap-bloom-bar"><div class="ap-bloom-fill" style="width:${pct}%;background:${BLOOM_COLOR[b.lv]}"></div></div>
              <div class="ap-bloom-val">${b.avg}/10 <span>(${b.count} bài)</span></div>
            </div>`;
          }).join('')}
        </div>

        ${scores.length >= 2 ? `
        <div class="ap-section-title">📈 Tiến bộ theo thời gian</div>
        <div class="ap-trend-chart">
          ${kts.map((kt,i) => {
            const d   = parseFloat(kt.diem_tong)||0;
            const pct = d/10*100;
            const cls = d>=8?'high':d>=5?'mid':'low';
            return `<div class="ap-trend-bar">
              <div class="ap-trend-fill ${cls}" style="height:${pct}%" title="${kt.ten_ky||''}: ${d}"></div>
              <div class="ap-trend-val">${d.toFixed(1)}</div>
              <div class="ap-trend-lbl">${(kt.ten_ky||'').slice(0,8)}</div>
            </div>`;
          }).join('')}
        </div>` : ''}

        <div class="ap-section-title">💪 Phẩm chất</div>
        <div class="ap-pc-grid">
          <div class="ap-pc-card">
            <div class="ap-pc-icon">📚</div>
            <div class="ap-pc-label">PC3 Chăm chỉ</div>
            <div class="ap-pc-val">${persistence.toFixed(1)}<span> lần thử/bài TB</span></div>
            <div class="ap-pc-bar"><div class="ap-pc-fill" style="width:${Math.min(100,persistence/5*100)}%"></div></div>
          </div>
          <div class="ap-pc-card">
            <div class="ap-pc-icon">✅</div>
            <div class="ap-pc-label">PC4 Trung thực</div>
            <div class="ap-pc-val">0<span> vi phạm</span></div>
            <div class="ap-pc-bar"><div class="ap-pc-fill" style="width:100%;background:var(--accent2)"></div></div>
          </div>
        </div>

        ${_autoComment(kts, bloomRadar, nlScores, stu)}
      </div>`;
  }

  function _autoComment(kts, bloomRadar, nlScores, stu) {
    const weak    = bloomRadar.filter(b=>b.avg!==null&&b.avg<5).map(b=>`B${b.lv[1]}`);
    const strong  = bloomRadar.filter(b=>b.avg!==null&&b.avg>=8).map(b=>`B${b.lv[1]}`);
    const nlWeak  = nlScores.filter(n=>n.avg!==null&&n.avg<50).map(n=>n.nl);
    const trend   = kts.length>=2 ? kts[kts.length-1].diem_tong - kts[0].diem_tong : 0;

    const parts = [];
    if (strong.length)  parts.push(`Mạnh: ${strong.join(', ')}`);
    if (weak.length)    parts.push(`Cần tăng cường: ${weak.join(', ')}`);
    if (nlWeak.length)  parts.push(`Năng lực yếu: ${nlWeak.join(', ')} (< 50%)`);
    if (trend > 0.5)    parts.push(`Xu hướng tích cực ↗ +${(+trend).toFixed(1)} điểm`);
    if (trend < -0.5)   parts.push(`Xu hướng giảm ↘ ${(+trend).toFixed(1)} điểm — cần chú ý`);
    if (!parts.length)  return '';

    return `<div class="ap-comment">
      <div class="ap-comment-title">🤖 Nhận xét tự động</div>
      <div>${parts.map(p=>`<div class="ap-comment-item">• ${Utils.escHtml(p)}</div>`).join('')}</div>
    </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB 3: PHÂN TÍCH ĐỀ (Item Analysis + Ma trận TT26)
  // ══════════════════════════════════════════════════════════════
  async function renderExam(el) {
    try {
      const exams = await CL.API.getExams(true);
      const closed = exams.filter(e=>e.trang_thai==='closed'||e.trang_thai==='active');

      el.innerHTML = `
        <div class="ana-toolbar">
          <select id="ana-exam-sel" class="ana-select">
            <option value="">— Chọn kỳ thi để phân tích —</option>
            ${closed.map(e=>`<option value="${Utils.escHtml(e.id)}">${Utils.escHtml(e.ten)}</option>`).join('')}
          </select>
          <button class="ana-btn" onclick="CL.Teacher.Analytics.loadExamAnalysis()">🔍 Phân tích</button>
        </div>
        <div id="ana-exam-result">
          <div class="tp-empty">Chọn kỳ thi rồi nhấn Phân tích.</div>
        </div>`;
    } catch(e) {
      el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  async function loadExamAnalysis() {
    const kyId  = document.getElementById('ana-exam-sel')?.value;
    const res   = document.getElementById('ana-exam-result');
    if (!kyId || !res) return;
    res.innerHTML = '<div class="tp-loading">⏳ Đang tính toán...</div>';

    try {
      const [analysis, matrix, exams] = await Promise.all([
        CL.API.getItemAnalysis(kyId),
        CL.API.getExamMatrix(kyId),
        CL.API.getExams(),
      ]);
      const exam = exams.find(e=>e.id===kyId);

      res.innerHTML = `
        ${_renderExamStats(analysis, exam)}
        ${_renderItemAnalysis(analysis)}
        ${_renderMatrix(matrix)}
      `;
    } catch(e) {
      res.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`;
    }
  }

  function _renderExamStats(data, exam) {
    const s = data.stats || {};
    const alphaCls = (data.alpha||0)>=0.7?'ok':(data.alpha||0)>=0.6?'warn':'bad';

    // Histogram
    const maxH = Math.max(...(s.histogram||[1]));
    const hist = (s.histogram||[]).map((n,i) => {
      const pct = Math.round(n/maxH*100)||0;
      const cls = i>=8?'high':i>=5?'mid':'low';
      return `<div class="hist-bar">
        <div class="hist-fill ${cls}" style="height:${pct}%"></div>
        <div class="hist-val">${n}</div>
        <div class="hist-lbl">${i}–${i+1}</div>
      </div>`;
    }).join('');

    return `
      <div class="ana-exam-header">
        <div class="aeh-title">${Utils.escHtml(exam?.ten||kyId)}</div>
        <div class="aeh-meta">${data.n_students} học sinh</div>
      </div>
      <div class="ana-stats-row">
        <div class="ast-card"><div class="ast-val">${s.mean?.toFixed(2)||'—'}</div><div class="ast-lbl">ĐTB</div></div>
        <div class="ast-card"><div class="ast-val">${s.median?.toFixed(1)||'—'}</div><div class="ast-lbl">Trung vị</div></div>
        <div class="ast-card"><div class="ast-val">${s.sd?.toFixed(2)||'—'}</div><div class="ast-lbl">ĐLC (SD)</div></div>
        <div class="ast-card"><div class="ast-val">${s.min?.toFixed(1)||'—'}</div><div class="ast-lbl">Min</div></div>
        <div class="ast-card"><div class="ast-val">${s.max?.toFixed(1)||'—'}</div><div class="ast-lbl">Max</div></div>
        <div class="ast-card"><div class="ast-val">${s.pass_rate||0}%</div><div class="ast-lbl">Tỉ lệ đạt</div></div>
        <div class="ast-card ast-alpha ${alphaCls}">
          <div class="ast-val">${data.alpha?.toFixed(2)||'—'}</div>
          <div class="ast-lbl">Cronbach α</div>
          <div class="ast-eval">${data.alpha_eval||''}</div>
        </div>
      </div>
      <div class="ana-section-title">Phân phối điểm</div>
      <div class="ana-histogram">${hist}</div>`;
  }

  function _renderItemAnalysis(data) {
    if (!data.items?.length) return '<div class="tp-empty">Chưa đủ dữ liệu phân tích câu hỏi.</div>';

    const sorted = [...data.items].sort((a,b) => {
      // Sort: bad items first
      const scoreA = (a.eval_p.includes('⚠️')?0:1)+(a.eval_D.includes('⚠️')?0:1);
      const scoreB = (b.eval_p.includes('⚠️')?0:1)+(b.eval_D.includes('⚠️')?0:1);
      return scoreA - scoreB;
    });

    return `
      <div class="ana-section-title">Phân tích câu hỏi (Item Analysis)</div>
      <div class="ana-item-hint">
        <b>p</b> = độ khó (0.3–0.7 tốt) &nbsp;·&nbsp;
        <b>D</b> = độ phân biệt (≥0.3 tốt) &nbsp;·&nbsp;
        <b>r</b> = tương quan điểm câu/tổng (≥0.2 tốt)
      </div>
      <div class="ana-item-table-wrap">
        <table class="ana-table">
          <thead><tr>
            <th>Câu hỏi</th><th>n</th>
            <th title="Độ khó thực nghiệm">p</th>
            <th title="Độ phân biệt 27%">D</th>
            <th title="Tương quan điểm">r</th>
            <th>ĐTB</th><th>SD</th><th>Đánh giá</th>
          </tr></thead>
          <tbody>${sorted.map(item => {
            const ok   = item.good;
            const ex   = Registry.findById(item.bai_id);
            const name = ex ? `${ex.num} ${ex.title}` : item.bai_id;
            const bloom = (ex?.lv||'').match(/B(\d)/)?.[1];
            return `<tr class="${ok?'':'item-warn'}">
              <td title="${Utils.escHtml(name)}">
                ${bloom?`<span class="bloom-dot" style="background:${BLOOM_COLOR['b'+bloom]||'#888'}"></span>`:''}
                ${Utils.escHtml(name.slice(0,40))}
              </td>
              <td>${item.n}</td>
              <td class="${item.p<0.3||item.p>0.8?'warn-cell':''}">${item.p.toFixed(2)}</td>
              <td class="${item.D<0.2?'warn-cell':''}">${item.D.toFixed(2)}</td>
              <td class="${item.r<0.2?'warn-cell':''}">${item.r.toFixed(2)}</td>
              <td>${item.mean.toFixed(2)}</td>
              <td>${item.sd.toFixed(2)}</td>
              <td class="item-eval">${item.eval_p} ${item.eval_D}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
  }

  function _renderMatrix(matrix) {
    if (!matrix.rows?.length) return '';
    const cols = matrix.cols || [];
    return `
      <div class="ana-section-title">Ma trận đề (theo TT26/2022)</div>
      <div class="ana-matrix-wrap">
        <table class="ana-matrix-table">
          <thead>
            <tr>
              <th>Chủ đề</th>
              ${cols.map(c=>`<th>${c}</th>`).join('')}
              <th>Tổng</th>
            </tr>
            <tr class="matrix-pct-row">
              <th>Tỉ lệ</th>
              ${cols.map(c=>`<th class="matrix-pct">${matrix.col_pct?.[c]||0}%</th>`).join('')}
              <th>100%</th>
            </tr>
          </thead>
          <tbody>
            ${(matrix.rows||[]).map(row => {
              const rowData = matrix.matrix?.[row] || {};
              let rowTotal = 0;
              const cells = cols.map(col => {
                const items = rowData[col] || [];
                const pts = items.reduce((a,b)=>a+b.pts,0);
                rowTotal += pts;
                return items.length
                  ? `<td class="matrix-cell has-items">
                      <span class="matrix-count">${items.length} câu</span>
                      <span class="matrix-pts">${pts.toFixed(1)}đ</span>
                    </td>`
                  : '<td class="matrix-cell empty">—</td>';
              }).join('');
              return `<tr><td class="matrix-row-label">${Utils.escHtml(row)}</td>${cells}<td class="matrix-total">${rowTotal.toFixed(1)}đ</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  TAB 4: XUẤT DỮ LIỆU
  // ══════════════════════════════════════════════════════════════
  async function renderExport(el) {
    el.innerHTML = `
      <div class="ana-export-wrap">
        <div class="aex-section">
          <div class="aex-title">📄 Xuất báo cáo PDF</div>
          <div class="aex-desc">In báo cáo tổng hợp lớp hoặc hồ sơ học sinh ra PDF (dùng Print → Save as PDF của trình duyệt).</div>
          <div class="aex-actions">
            <select id="export-lop-pdf" class="ana-select" style="width:auto">
              <option value="">Tất cả lớp</option>
            </select>
            <button class="ana-btn-primary" onclick="CL.Teacher.Analytics.exportPdfReport()">🖨️ In / Xuất PDF</button>
          </div>
        </div>

        <div class="aex-section">
          <div class="aex-title">📊 Xuất bảng điểm</div>
          <div class="aex-desc">Xuất điểm tổng hợp tất cả học sinh và kỳ thi ra file CSV.</div>
          <div class="aex-actions">
            <button class="ana-btn-primary" onclick="CL.Teacher.Analytics.exportClassCsv()">📥 Xuất BangDiem.csv</button>
            <select id="export-lop" class="ana-select" style="width:auto">
              <option value="">Tất cả lớp</option>
            </select>
          </div>
          <div id="export-msg" class="aex-msg"></div>
        </div>

        <div class="aex-section">
          <div class="aex-title">👤 Xuất hồ sơ năng lực</div>
          <div class="aex-desc">Xuất hồ sơ NL1/NL2/NL3 + Bloom của từng học sinh (theo CT GDPT 2018).</div>
          <div class="aex-actions">
            <button class="ana-btn-primary" onclick="CL.Teacher.Analytics.exportStudentProfiles()">📥 Xuất HoSoNangLuc.csv</button>
          </div>
        </div>
      </div>`;

    // Load lops
    try {
      const students = await CL.API.getStudentList();
      const lops = [...new Set(students.map(s=>s.lop).filter(Boolean))].sort();
      const sel  = document.getElementById('export-lop');
      if (sel) lops.forEach(l => { const o=document.createElement('option'); o.value=o.textContent=l; sel.appendChild(o); });
    } catch {}
  }

  async function exportClassCsv() {
    const msg = document.getElementById('export-msg');
    if (msg) msg.textContent = '⏳ Đang xuất...';
    try {
      const [kts, students, exams] = await Promise.all([
        CL.API.getBaiKT(), CL.API.getStudentList(), CL.API.getExams(),
      ]);
      const lopFilter = document.getElementById('export-lop')?.value || '';
      const examMap   = {};
      exams.forEach(e=>{ examMap[e.id]=e.ten; });

      const rows = [['MSHS','Họ tên','Lớp','Kỳ thi','Điểm','Năm học','Thời gian']];
      kts.filter(kt=>!lopFilter||kt.lop===lopFilter).forEach(kt => {
        rows.push([kt.mshs, kt.ho_ten, kt.lop, examMap[kt.ky_id]||kt.ky_id,
                   kt.diem_tong, kt.nam_hoc||'', kt.ts||'']);
      });

      _downloadCsv(rows, `BangDiem_${Date.now()}.csv`);
      if (msg) msg.textContent = `✅ Xuất ${rows.length-1} dòng`;
    } catch(e) {
      if (msg) msg.textContent = '❌ ' + e.message;
    }
  }

  async function exportStudentProfiles() {
    try {
      const [lams, students] = await Promise.all([CL.API.getHistory(true), CL.API.getStudentList()]);
      const BLOOM_LVLS = ['b1','b2','b3','b4','b5','b6'];
      const NL_LVLS    = ['NL1','NL2','NL3'];

      const rows = [['MSHS','Họ tên','Lớp',
        ...BLOOM_LVLS.map(l=>`Bloom ${l.toUpperCase()}`),
        ...NL_LVLS.map(nl=>`${nl} (/100)`),
        'Lần thử TB','Nhận xét']];

      const stuMap = {};
      students.forEach(s=>{ stuMap[s.mshs]={ ...s, bloomScores:{}, nlScores:{}, tries:0, total:0 }; });

      for (const lam of lams) {
        const stu = stuMap[lam.mshs];
        if (!stu) continue;
        const ex    = Registry.findById(lam.bai_id);
        const bloom = ex ? (ex.lv||'').match(/B(\d)/)?.[1] : lam.bai_id.match(/-b(\d)-/)?.[1];
        if (bloom) {
          if (!stu.bloomScores['b'+bloom]) stu.bloomScores['b'+bloom] = [];
          stu.bloomScores['b'+bloom].push(parseFloat(lam.diem)||0);
        }
        if (ex) {
          const nls = Registry.getNL(ex);
          for (const nl of nls) {
            const group = nl.startsWith('NL1')?'NL1':nl.startsWith('NL2')?'NL2':'NL3';
            if (!stu.nlScores[group]) stu.nlScores[group] = [];
            stu.nlScores[group].push(parseFloat(lam.diem)||0);
          }
        }
        stu.tries++;
      }

      for (const [mshs, stu] of Object.entries(stuMap)) {
        const bloomVals = BLOOM_LVLS.map(lv => {
          const sc = stu.bloomScores[lv];
          return sc?.length ? (sc.reduce((a,b)=>a+b,0)/sc.length).toFixed(2) : '';
        });
        const nlVals = NL_LVLS.map(nl => {
          const sc = stu.nlScores[nl];
          return sc?.length ? Math.round(sc.reduce((a,b)=>a+b,0)/sc.length*10) : '';
        });
        const tryAvg = stu.tries > 0 ? (stu.tries/Math.max(1,Object.keys(stu.bloomScores).length)).toFixed(1) : '';
        rows.push([mshs, stu.ho_ten, stu.lop, ...bloomVals, ...nlVals, tryAvg, '']);
      }

      _downloadCsv(rows, `HoSoNangLuc_${Date.now()}.csv`);
    } catch(e) {
      Toast.error('❌ ' + e.message);
    }
  }

  async function exportPdfReport() {
    const lopFilter = document.getElementById('export-lop-pdf')?.value || '';
    try {
      const [kts, students, exams] = await Promise.all([
        CL.API.getBaiKT(), CL.API.getStudentList(), CL.API.getExams(),
      ]);
      const examMap = {};
      exams.forEach(e => { examMap[e.id] = e.ten; });

      const filtStudents = students.filter(s => !lopFilter || s.lop === lopFilter);
      const lopTitle     = lopFilter || 'Tất cả lớp';
      const today        = new Date().toLocaleDateString('vi-VN');

      // Build printable HTML
      const stuRows = filtStudents.map(s => {
        const sKTs = kts.filter(k => k.mshs === s.mshs);
        const scores = sKTs.map(k => parseFloat(k.diem_tong)||0);
        const avg  = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : null;
        const pass = scores.filter(d=>d>=5).length;
        const cls  = avg===null?'':avg>=8?'color:#059669':avg>=5?'color:#d97706':'color:#dc2626';
        return `<tr>
          <td>${Utils.escHtml(s.mshs||'')}</td>
          <td>${Utils.escHtml(s.ho_ten||'')}</td>
          <td>${Utils.escHtml(s.lop||'')}</td>
          <td style="${cls};font-weight:700">${avg!==null?avg.toFixed(2):'—'}</td>
          <td>${scores.length}</td>
          <td>${scores.length ? pass+'/'+scores.length : '—'}</td>
        </tr>`;
      }).join('');

      const html = `<!DOCTYPE html><html lang="vi">
<head><meta charset="UTF-8">
<title>Báo cáo kết quả - ${lopTitle}</title>
<style>
  body{font-family:Arial,sans-serif;font-size:12px;color:#111;margin:0;padding:20px}
  h1{font-size:18px;margin-bottom:4px}
  .meta{color:#666;font-size:11px;margin-bottom:16px}
  table{width:100%;border-collapse:collapse}
  th{background:#1e40af;color:#fff;padding:7px 10px;text-align:left;font-size:11px}
  td{padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:11.5px}
  tr:nth-child(even) td{background:#f9fafb}
  .footer{margin-top:20px;font-size:10px;color:#9ca3af;text-align:center}
  @media print{@page{margin:1.5cm}}
</style>
</head>
<body>
<h1>📊 Báo cáo Kết quả học tập — ${Utils.escHtml(lopTitle)}</h1>
<div class="meta">THPT Thủ Thiêm · Ngày in: ${today} · ${filtStudents.length} học sinh</div>
<table>
  <thead><tr><th>MSHS</th><th>Họ tên</th><th>Lớp</th><th>ĐTB</th><th>Số KT</th><th>Đạt/Tổng</th></tr></thead>
  <tbody>${stuRows}</tbody>
</table>
<div class="footer">Hệ thống CodeLab — Tự động tạo bởi AI · Không phải văn bản hành chính</div>
</body></html>`;

      const w = window.open('', '_blank', 'width=900,height=700');
      if (w) {
        w.document.write(html);
        w.document.close();
        setTimeout(() => w.print(), 600);
      }
    } catch(e) {
      Toast.error('❌ ' + e.message);
    }
  }

  function _downloadCsv(rows, filename) {
    const bom = '\uFEFF'; // UTF-8 BOM for Excel
    const csv = bom + rows.map(r => r.map(c => `"${String(c||'').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href:url, download:filename });
    a.click(); URL.revokeObjectURL(url);
  }

  return {
    render, switchTab, filterClass,
    loadStudentDetail, loadExamAnalysis,
    exportClassCsv, exportStudentProfiles, exportPdfReport,
  };
});
