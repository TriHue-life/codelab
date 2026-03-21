/**
 * features/teacher/analytics.js — Thống kê & Phân tích
 * ═══════════════════════════════════════════════════════════════
 * Tabs:
 *   📈 Tổng hợp lớp  — Điểm TB các đợt KT của cả lớp
 *   👤 Năng lực HS    — Phân tích từng học sinh qua thời gian
 *   🎯 Phân tích đề   — Thống kê độ khó, Bloom, tỷ lệ đạt
 *   📥 Xuất Sheets    — Export toàn bộ ra Google Sheets
 * ═══════════════════════════════════════════════════════════════
 * @requires core/*, CL.API
 */

'use strict';

CL.define('Teacher.Analytics', () => {

  const Utils  = CL.require('Utils');
  const Toast  = CL.require('UI.Toast');

  // ── Main render ───────────────────────────────────────────────

  async function render(el) {
    el.innerHTML = `
      <div class="ana-tabs">
        <button class="ana-tab on" data-tab="class"   onclick="CL.Teacher.Analytics.switchTab(this,'class')">📈 Tổng hợp lớp</button>
        <button class="ana-tab"    data-tab="student" onclick="CL.Teacher.Analytics.switchTab(this,'student')">👤 Năng lực HS</button>
        <button class="ana-tab"    data-tab="exam"    onclick="CL.Teacher.Analytics.switchTab(this,'exam')">🎯 Phân tích đề</button>
        <button class="ana-tab"    data-tab="export"  onclick="CL.Teacher.Analytics.switchTab(this,'export')">📥 Xuất dữ liệu</button>
      </div>
      <div id="ana-content" class="ana-content">
        <div class="tp-loading">⏳ Đang tải...</div>
      </div>`;

    await renderClass(document.getElementById('ana-content'));
  }

  function switchTab(btn, tab) {
    document.querySelectorAll('.ana-tab').forEach(t => t.classList.toggle('on', t.dataset.tab === tab));
    const el = document.getElementById('ana-content');
    if (!el) return;
    el.innerHTML = '<div class="tp-loading">⏳ Đang tải...</div>';
    const fns = { class: renderClass, student: renderStudent, exam: renderExam, export: renderExport };
    (fns[tab] || (() => {}))(el);
  }

  // ════════════════════════════════════════════════════════════
  //  📈 TỔNG HỢP LỚP
  // ════════════════════════════════════════════════════════════

  async function renderClass(el) {
    try {
      const [exams, baiKTs, students] = await Promise.all([
        CL.API.getExams(true),
        CL.API.getBaiKT(),
        CL.API.getStudentList(),
      ]);

      const closedExams = exams.filter(e => ['active','closed'].includes(e.trang_thai));
      const lops        = [...new Set(students.map(s => s.lop))].sort();

      el.innerHTML = `
        <div class="ana-filter-bar">
          <select id="ana-lop-filter" onchange="CL.Teacher.Analytics.filterClass()" style="flex:1">
            <option value="">Tất cả lớp</option>
            ${lops.map(l => `<option>${Utils.escHtml(l)}</option>`).join('')}
          </select>
          <select id="ana-exam-filter" onchange="CL.Teacher.Analytics.filterClass()" style="flex:2">
            <option value="">Tất cả đợt kiểm tra</option>
            ${closedExams.map(e => `<option value="${Utils.escHtml(e.id)}">${Utils.escHtml(e.ten)}</option>`).join('')}
          </select>
          <button class="tp-action-btn" onclick="CL.Teacher.Analytics.exportClassCsv()">📥 CSV</button>
        </div>

        <div id="class-stats-cards" class="ana-cards">
          ${_buildClassCards(baiKTs, students, null, null)}
        </div>

        <div id="class-heatmap" style="margin-top:16px">
          ${_buildScoreHeatmap(baiKTs, students, closedExams)}
        </div>

        <div id="class-table" class="tp-table-wrap" style="margin-top:16px">
          ${_buildClassTable(baiKTs, students, closedExams, null, null)}
        </div>`;

      // Store for filtering
      el._data = { baiKTs, students, closedExams };

    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  function filterClass() {
    const lopFilter  = document.getElementById('ana-lop-filter')?.value  || '';
    const examFilter = document.getElementById('ana-exam-filter')?.value || '';
    const el = document.getElementById('ana-content');
    const d  = el?._data;
    if (!d) return;

    const baiKTs   = lopFilter  ? d.baiKTs.filter(b => b.lop === lopFilter) : d.baiKTs;
    const students = lopFilter  ? d.students.filter(s => s.lop === lopFilter) : d.students;
    const exams    = examFilter ? d.closedExams.filter(e => e.id === examFilter) : d.closedExams;

    const cards = document.getElementById('class-stats-cards');
    const table = document.getElementById('class-table');
    if (cards) cards.innerHTML = _buildClassCards(baiKTs, students, lopFilter, examFilter);
    if (table) table.innerHTML = _buildClassTable(baiKTs, students, exams, lopFilter, examFilter);
  }

  function _buildClassCards(baiKTs, students, lopFilter, examFilter) {
    const rows = baiKTs.filter(b =>
      (!lopFilter  || b.lop    === lopFilter) &&
      (!examFilter || b.ky_id  === examFilter)
    );
    if (!rows.length) return '<div class="tp-empty">Chưa có dữ liệu</div>';

    const scores  = rows.map(r => parseFloat(r.diem_tong) || 0);
    const avg     = scores.reduce((a, b) => a + b, 0) / scores.length;
    const max     = Math.max(...scores);
    const min     = Math.min(...scores);
    const pass    = scores.filter(s => s >= 5).length;
    const gioi    = scores.filter(s => s >= 8).length;
    const n       = rows.length;

    // Distribution buckets: <5, 5-6.5, 6.5-8, 8-10
    const dist = [
      { label: 'Yếu (<5)',      count: scores.filter(s=>s<5).length,           color:'#f87171' },
      { label: 'TB (5–6.5)',    count: scores.filter(s=>s>=5&&s<6.5).length,   color:'#fb923c' },
      { label: 'Khá (6.5–8)',   count: scores.filter(s=>s>=6.5&&s<8).length,   color:'#facc15' },
      { label: 'Giỏi (≥8)',     count: scores.filter(s=>s>=8).length,           color:'#4ade80' },
    ];

    const bars = dist.map(d => {
      const w = Math.round(d.count / n * 100);
      return `<div class="dist-row">
        <div class="dist-label">${d.label}</div>
        <div class="dist-bar-wrap">
          <div class="dist-bar" style="width:${w}%;background:${d.color}"></div>
          <span class="dist-count">${d.count} (${w}%)</span>
        </div>
      </div>`;
    }).join('');

    return `
      <div class="ana-card"><div class="ana-card-n">${avg.toFixed(2)}</div><div class="ana-card-l">Điểm TB</div></div>
      <div class="ana-card"><div class="ana-card-n">${max.toFixed(1)}</div><div class="ana-card-l">Cao nhất</div></div>
      <div class="ana-card"><div class="ana-card-n">${min.toFixed(1)}</div><div class="ana-card-l">Thấp nhất</div></div>
      <div class="ana-card ${pass/n >= 0.7 ? 'good' : 'warn'}">
        <div class="ana-card-n">${Math.round(pass/n*100)}%</div><div class="ana-card-l">Đạt (≥5)</div>
      </div>
      <div class="ana-card good">
        <div class="ana-card-n">${Math.round(gioi/n*100)}%</div><div class="ana-card-l">Giỏi (≥8)</div>
      </div>
      <div class="ana-card full">
        <div class="dist-title">Phân phối điểm (${n} học sinh)</div>
        ${bars}
      </div>`;
  }

  function _buildScoreHeatmap(baiKTs, students, exams) {
    if (!exams.length || !baiKTs.length) return '';
    // Show top 10 exams, all students
    const topExams = exams.slice(-10);
    const allStudents = students.slice(0, 30);

    const rows = allStudents.map(s => {
      const cells = topExams.map(e => {
        const r = baiKTs.find(b => b.mshs === s.mshs && b.ky_id === e.id);
        if (!r) return `<td class="hm-empty">—</td>`;
        const d  = parseFloat(r.diem_tong) || 0;
        const c  = d >= 8 ? 'hm-gioi' : d >= 6.5 ? 'hm-kha' : d >= 5 ? 'hm-tb' : 'hm-yeu';
        return `<td class="hm-cell ${c}" title="${s.ho_ten}: ${d}">${d.toFixed(1)}</td>`;
      }).join('');
      return `<tr><td class="hm-name">${Utils.escHtml(s.ho_ten.split(' ').pop())}</td>${cells}</tr>`;
    }).join('');

    return `
      <div class="ana-section-title">🌡 Bản đồ nhiệt điểm số (${allStudents.length} HS × ${topExams.length} đợt)</div>
      <div class="hm-wrap">
        <table class="hm-table">
          <thead><tr>
            <th style="min-width:70px">HS</th>
            ${topExams.map(e => `<th title="${Utils.escHtml(e.ten)}">${Utils.escHtml(e.ten.substring(0,10))}</th>`).join('')}
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="hm-legend">
        <span class="hm-cell hm-gioi">≥8 Giỏi</span>
        <span class="hm-cell hm-kha">≥6.5 Khá</span>
        <span class="hm-cell hm-tb">≥5 TB</span>
        <span class="hm-cell hm-yeu">&lt;5 Yếu</span>
        <span class="hm-empty">— Chưa thi</span>
      </div>`;
  }

  function _buildClassTable(baiKTs, students, exams, lopFilter, examFilter) {
    const filtered = baiKTs.filter(b =>
      (!lopFilter  || b.lop   === lopFilter) &&
      (!examFilter || b.ky_id === examFilter)
    );
    if (!filtered.length) return '<div class="tp-empty">Không có dữ liệu phù hợp</div>';

    // Group by student, show their exam history
    const byStudent = Utils.groupBy(filtered, b => b.mshs);
    const rows = Object.entries(byStudent).map(([mshs, results]) => {
      const avg = results.reduce((s,r) => s + (parseFloat(r.diem_tong)||0), 0) / results.length;
      const stu = students.find(s => s.mshs === mshs);
      const cells = exams.map(e => {
        const r = results.find(b => b.ky_id === e.id);
        if (!r) return `<td class="hm-empty">—</td>`;
        const d = parseFloat(r.diem_tong)||0;
        return `<td class="td-score ${Utils.scoreClass(d)}">${d.toFixed(1)}</td>`;
      }).join('');
      return `<tr>
        <td class="td-mshs">${Utils.escHtml(mshs)}</td>
        <td>${Utils.escHtml(stu?.ho_ten || mshs)}</td>
        <td>${Utils.escHtml(stu?.lop || '')}</td>
        ${cells}
        <td class="td-score ${Utils.scoreClass(avg)}" style="font-weight:900">${avg.toFixed(2)}</td>
      </tr>`;
    }).join('');

    return `
      <table class="tp-table">
        <thead><tr>
          <th>MSHS</th><th>Họ tên</th><th>Lớp</th>
          ${exams.map(e => `<th title="${Utils.escHtml(e.ten)}">${Utils.escHtml(e.ten.substring(0,12))}</th>`).join('')}
          <th>TB</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  // ════════════════════════════════════════════════════════════
  //  👤 NĂNG LỰC HỌC SINH
  // ════════════════════════════════════════════════════════════

  async function renderStudent(el) {
    try {
      const [students, baiKTs, baiLams] = await Promise.all([
        CL.API.getStudentList(),
        CL.API.getBaiKT(),
        CL.API.getHistory(true),
      ]);

      el.innerHTML = `
        <div class="ana-filter-bar">
          <select id="ana-stu-filter" onchange="CL.Teacher.Analytics.loadStudentDetail()" style="flex:2">
            <option value="">— Chọn học sinh —</option>
            ${students.map(s => `<option value="${Utils.escHtml(s.mshs)}">${Utils.escHtml(s.ho_ten)} (${Utils.escHtml(s.mshs)}) — ${Utils.escHtml(s.lop)}</option>`).join('')}
          </select>
        </div>
        <div id="stu-detail" class="stu-detail">
          <div class="tp-empty">Chọn học sinh để xem phân tích năng lực</div>
        </div>`;

      el._data = { students, baiKTs, baiLams };

    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  async function loadStudentDetail() {
    const mshs = document.getElementById('ana-stu-filter')?.value;
    const el   = document.getElementById('stu-detail');
    const data = document.getElementById('ana-content')?._data;
    if (!mshs || !el || !data) return;

    const stu    = data.students.find(s => s.mshs === mshs);
    const kts    = data.baiKTs.filter(b => b.mshs === mshs);
    const lams   = data.baiLams.filter(b => b.mshs === mshs);

    if (!kts.length && !lams.length) {
      el.innerHTML = '<div class="tp-empty">Học sinh chưa có dữ liệu</div>';
      return;
    }

    // Bloom analysis from baiLams
    const bloomStats = { b1:[], b2:[], b3:[], b4:[], b5:[], b6:[] };
    lams.forEach(l => {
      const m = (l.bai_id||'').match(/-b([1-6])-/);
      const lv = m ? 'b'+m[1] : null;
      if (lv) bloomStats[lv].push(parseFloat(l.diem)||0);
    });

    const bloomRadar = Object.entries(bloomStats).map(([lv, scores]) => {
      const avg = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : 0;
      return { lv, avg: Math.round(avg*10)/10, count: scores.length };
    });

    // Trend over exams
    const sorted = kts.sort((a,b) => new Date(a.ts) - new Date(b.ts));

    el.innerHTML = `
      <div class="stu-header">
        <div class="stu-avatar">${(stu?.ho_ten||'?').split(' ').pop()[0]}</div>
        <div>
          <div class="stu-name">${Utils.escHtml(stu?.ho_ten||mshs)}</div>
          <div class="stu-meta">MSHS: ${Utils.escHtml(mshs)} · Lớp: ${Utils.escHtml(stu?.lop||'—')}</div>
        </div>
      </div>

      <!-- Summary cards -->
      <div class="ana-cards" style="grid-template-columns:repeat(auto-fill,minmax(120px,1fr));margin-top:12px">
        ${_stuSummaryCards(kts, lams)}
      </div>

      <!-- Trend chart (CSS bars) -->
      ${sorted.length > 1 ? `
        <div class="ana-section-title" style="margin-top:16px">📈 Xu hướng điểm qua các kỳ</div>
        <div class="trend-chart">
          ${sorted.map(k => {
            const d = parseFloat(k.diem_tong)||0;
            const h = Math.round(d * 10);
            const c = d>=8?'#4ade80':d>=5?'#facc15':'#f87171';
            return `<div class="tc-bar-wrap">
              <div class="tc-bar" style="height:${h}%;background:${c}" title="${k.ten_ky}: ${d}"></div>
              <div class="tc-label">${d.toFixed(1)}</div>
              <div class="tc-exam">${Utils.escHtml((k.ten_ky||'').substring(0,8))}</div>
            </div>`;
          }).join('')}
        </div>` : ''}

      <!-- Bloom radar (CSS) -->
      <div class="ana-section-title" style="margin-top:16px">🧠 Năng lực theo mức Bloom</div>
      <div class="bloom-radar">
        ${bloomRadar.map(b => {
          const pct = Math.round(b.avg * 10);
          const c   = b.avg>=8?'#4ade80':b.avg>=5?'#facc15':'#f87171';
          return `<div class="br-row">
            <div class="br-lv"><span class="bloom-badge bloom-${b.lv}">${b.lv.toUpperCase()}</span></div>
            <div class="br-bar-wrap">
              <div class="br-bar" style="width:${pct}%;background:${c}"></div>
            </div>
            <div class="br-val">${b.avg}/10 (${b.count} bài)</div>
          </div>`;
        }).join('')}
      </div>

      <!-- Nhận xét tự động -->
      <div class="ana-section-title" style="margin-top:16px">💬 Nhận xét tự động</div>
      <div class="auto-comment">
        ${_autoComment(kts, bloomRadar, stu)}
      </div>`;
  }

  function _stuSummaryCards(kts, lams) {
    if (!kts.length) return '';
    const scores = kts.map(k => parseFloat(k.diem_tong)||0);
    const avg    = scores.reduce((a,b)=>a+b,0)/scores.length;
    const trend  = scores.length >= 2 ? scores[scores.length-1] - scores[0] : 0;
    const total  = lams.length;
    const pass   = lams.filter(l => (parseFloat(l.diem)||0) >= 5).length;

    return `
      <div class="ana-card"><div class="ana-card-n">${avg.toFixed(2)}</div><div class="ana-card-l">ĐTB KT</div></div>
      <div class="ana-card"><div class="ana-card-n">${kts.length}</div><div class="ana-card-l">Đợt KT</div></div>
      <div class="ana-card"><div class="ana-card-n">${total}</div><div class="ana-card-l">Câu đã làm</div></div>
      <div class="ana-card ${pass/total>=0.7?'good':'warn'}">
        <div class="ana-card-n">${total?Math.round(pass/total*100):0}%</div><div class="ana-card-l">Tỉ lệ đạt</div>
      </div>
      <div class="ana-card ${trend>0?'good':trend<0?'warn':''}">
        <div class="ana-card-n">${trend>0?'+':''}${trend.toFixed(1)}</div>
        <div class="ana-card-l">Xu hướng</div>
      </div>`;
  }

  function _autoComment(kts, bloomRadar, stu) {
    const scores  = kts.map(k => parseFloat(k.diem_tong)||0);
    const avg     = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : 0;
    const weak    = bloomRadar.filter(b => b.count > 0 && b.avg < 5).map(b => b.lv.toUpperCase());
    const strong  = bloomRadar.filter(b => b.count > 0 && b.avg >= 8).map(b => b.lv.toUpperCase());
    const trend   = scores.length >= 3 ? scores[scores.length-1] - scores[0] : 0;

    let comment = `<b>${stu?.ho_ten||'Học sinh'}</b> `;
    if      (avg >= 8)  comment += 'có năng lực xuất sắc. ';
    else if (avg >= 6.5)comment += 'đạt mức khá. ';
    else if (avg >= 5)  comment += 'đạt mức trung bình. ';
    else                comment += 'cần được hỗ trợ thêm. ';

    if (trend > 1)  comment += '📈 Điểm số có xu hướng tăng tốt. ';
    if (trend < -1) comment += '📉 Điểm số có xu hướng giảm, cần theo dõi. ';

    if (strong.length) comment += `✅ Thành thạo ở mức: ${strong.join(', ')}. `;
    if (weak.length)   comment += `⚠️ Cần cải thiện mức: ${weak.join(', ')}. `;

    return `<div class="comment-box">${comment}</div>`;
  }

  // ════════════════════════════════════════════════════════════
  //  🎯 PHÂN TÍCH ĐỀ THI
  // ════════════════════════════════════════════════════════════

  async function renderExam(el) {
    try {
      const [exams, baiLams] = await Promise.all([
        CL.API.getExams(true),
        CL.API.getHistory(true),
      ]);

      const closedExams = exams.filter(e => e.trang_thai === 'closed');

      el.innerHTML = `
        <div class="ana-filter-bar">
          <select id="ana-exam-sel" onchange="CL.Teacher.Analytics.loadExamAnalysis()" style="flex:2">
            <option value="">— Chọn đợt kiểm tra —</option>
            ${closedExams.map(e => `<option value="${Utils.escHtml(e.id)}">${Utils.escHtml(e.ten)}</option>`).join('')}
          </select>
        </div>
        <div id="exam-analysis" class="tp-empty">Chọn đợt kiểm tra để phân tích</div>`;

      el._data = { exams: closedExams, baiLams };

    } catch(e) { el.innerHTML = `<div class="tp-empty">❌ ${Utils.escHtml(e.message)}</div>`; }
  }

  async function loadExamAnalysis() {
    const examId = document.getElementById('ana-exam-sel')?.value;
    const el     = document.getElementById('exam-analysis');
    const data   = document.getElementById('ana-content')?._data;
    if (!examId || !el || !data) return;

    const exam  = data.exams.find(e => e.id === examId);
    const lams  = data.baiLams.filter(l => l.ky_id === examId);
    if (!lams.length) { el.innerHTML = '<div class="tp-empty">Chưa có dữ liệu nộp bài</div>'; return; }

    // Per-question stats
    const byQ = Utils.groupBy(lams, l => l.bai_id);
    const qStats = Object.entries(byQ).map(([baiId, answers]) => {
      const scores = answers.map(a => parseFloat(a.diem)||0);
      const avg    = scores.reduce((a,b)=>a+b,0) / scores.length;
      const pass   = scores.filter(s => s >= 5).length;
      const bloom  = (baiId.match(/-b([1-6])-/)||[])[1] || '?';
      return { baiId, avg, pass, total: scores.length, passRate: pass/scores.length, bloom };
    }).sort((a,b) => a.avg - b.avg);   // sorted by avg (hardest first)

    // Bloom distribution
    const bloomDist = {};
    qStats.forEach(q => {
      if (!bloomDist[q.bloom]) bloomDist[q.bloom] = { total: 0, sumAvg: 0 };
      bloomDist[q.bloom].total++;
      bloomDist[q.bloom].sumAvg += q.avg;
    });

    const bloomRows = Object.entries(bloomDist).sort().map(([lv, d]) => {
      const avg = d.sumAvg / d.total;
      return `<tr>
        <td><span class="bloom-badge bloom-b${lv}">B${lv}</span></td>
        <td>${d.total} câu</td>
        <td class="td-score ${Utils.scoreClass(avg)}">${avg.toFixed(2)}</td>
        <td>${avg>=5?'✅ Đạt':'⚠️ Khó'}  </td>
      </tr>`;
    }).join('');

    const disRecommend = qStats.filter(q => q.avg < 3).length > qStats.length * 0.3
      ? '⚠️ Đề quá khó — Hơn 30% câu hỏi có điểm TB < 3. Cân nhắc điều chỉnh độ khó.'
      : qStats.filter(q => q.avg >= 9).length > qStats.length * 0.5
        ? '⚠️ Đề quá dễ — Hơn 50% câu hỏi có điểm TB ≥ 9.'
        : '✅ Độ khó tổng thể hợp lý.';

    el.innerHTML = `
      <div class="ana-section-title">🎯 Phân tích đề: ${Utils.escHtml(exam?.ten||examId)}</div>

      <div class="ana-cards" style="margin-top:8px">
        <div class="ana-card"><div class="ana-card-n">${[...new Set(lams.map(l=>l.mshs))].length}</div><div class="ana-card-l">HS tham gia</div></div>
        <div class="ana-card"><div class="ana-card-n">${qStats.length}</div><div class="ana-card-l">Câu hỏi</div></div>
        <div class="ana-card"><div class="ana-card-n">${(qStats.reduce((s,q)=>s+q.avg,0)/qStats.length).toFixed(2)}</div><div class="ana-card-l">ĐTB toàn đề</div></div>
        <div class="ana-card"><div class="ana-card-n">${Math.round(qStats.reduce((s,q)=>s+q.passRate,0)/qStats.length*100)}%</div><div class="ana-card-l">Tỉ lệ đạt TB</div></div>
      </div>

      <div class="comment-box" style="margin-top:12px">${disRecommend}</div>

      <div class="ana-section-title" style="margin-top:16px">📊 Theo mức Bloom</div>
      <table class="tp-table" style="margin-top:6px">
        <thead><tr><th>Mức Bloom</th><th>Số câu</th><th>Điểm TB</th><th>Đánh giá</th></tr></thead>
        <tbody>${bloomRows}</tbody>
      </table>

      <div class="ana-section-title" style="margin-top:16px">📋 Chi tiết từng câu (sắp xếp từ khó nhất)</div>
      <div class="tp-table-wrap">
        <table class="tp-table">
          <thead><tr><th>Câu</th><th>Bloom</th><th>ĐTB</th><th>Tỉ lệ đạt</th><th>Đánh giá</th></tr></thead>
          <tbody>${qStats.map((q,i) => `<tr>
            <td class="td-ex" style="max-width:200px">${Utils.escHtml(q.baiId.split('-').slice(-3).join('-'))}</td>
            <td><span class="bloom-badge bloom-b${q.bloom}">B${q.bloom}</span></td>
            <td class="td-score ${Utils.scoreClass(q.avg)}">${q.avg.toFixed(2)}</td>
            <td>${Math.round(q.passRate*100)}% (${q.pass}/${q.total})</td>
            <td>${q.avg<4?'🔴 Rất khó':q.avg<6?'🟡 Khó':q.avg<8?'🟢 Vừa':'⭐ Dễ'}</td>
          </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  }

  // ════════════════════════════════════════════════════════════
  //  📥 XUẤT DỮ LIỆU
  // ════════════════════════════════════════════════════════════

  async function renderExport(el) {
    el.innerHTML = `
      <div class="export-grid">

        <div class="exp-card">
          <div class="exp-icon">📊</div>
          <div class="exp-title">Bảng điểm tổng hợp</div>
          <div class="exp-desc">Điểm tất cả đợt KT của tất cả học sinh, kèm điểm TB</div>
          <button class="exp-btn" onclick="CL.Teacher.Analytics.exportSummary()">📥 Xuất CSV</button>
        </div>

        <div class="exp-card">
          <div class="exp-icon">👤</div>
          <div class="exp-title">Năng lực học sinh</div>
          <div class="exp-desc">Điểm theo mức Bloom, xu hướng, nhận xét từng học sinh</div>
          <button class="exp-btn" onclick="CL.Teacher.Analytics.exportStudentProfiles()">📥 Xuất CSV</button>
        </div>

        <div class="exp-card">
          <div class="exp-icon">🎯</div>
          <div class="exp-title">Phân tích câu hỏi</div>
          <div class="exp-desc">Độ khó, tỉ lệ đạt, phân tích Bloom từng câu hỏi</div>
          <button class="exp-btn" onclick="CL.Teacher.Analytics.exportQuestionAnalysis()">📥 Xuất CSV</button>
        </div>

        <div class="exp-card">
          <div class="exp-icon">📝</div>
          <div class="exp-title">Lịch sử làm bài</div>
          <div class="exp-desc">Toàn bộ lịch sử nộp bài của tất cả học sinh</div>
          <button class="exp-btn" onclick="CL.Teacher.Analytics.exportHistory()">📥 Xuất CSV</button>
        </div>

        <div class="exp-card highlight">
          <div class="exp-icon">🔗</div>
          <div class="exp-title">Đồng bộ Google Sheets</div>
          <div class="exp-desc">Tự động ghi dữ liệu vào file Google Sheets của trường (cần cấu hình Apps Script)</div>
          <button class="exp-btn" id="exp-sheets-btn"
            onclick="CL.Teacher.Analytics.syncToSheets()">📤 Sync → Google Sheets</button>
          <div id="exp-sheets-msg" style="font-size:11px;margin-top:6px;color:var(--text3)"></div>
        </div>

      </div>`;
  }

  async function exportSummary() {
    try {
      const [students, baiKTs, exams] = await Promise.all([
        CL.API.getStudentList(), CL.API.getBaiKT(), CL.API.getExams(true)
      ]);
      const closedExams = exams.filter(e => e.trang_thai !== 'draft');
      const header = ['MSHS','Họ tên','Lớp',...closedExams.map(e=>e.ten),'Điểm TB'];
      const rows = students.map(s => {
        const scores = closedExams.map(e => {
          const r = baiKTs.find(b => b.mshs===s.mshs && b.ky_id===e.id);
          return r ? parseFloat(r.diem_tong)||0 : '';
        });
        const filled = scores.filter(s => s !== '');
        const avg    = filled.length ? filled.reduce((a,b)=>a+b,0)/filled.length : '';
        return [s.mshs, s.ho_ten, s.lop, ...scores, avg ? avg.toFixed(2) : ''];
      });
      Utils.downloadCsv([header, ...rows], `bangdiem-tonghop-${_today()}.csv`);
      Toast.success('✅ Đã xuất bảng điểm tổng hợp');
    } catch(e) { Toast.error('❌ '+e.message); }
  }

  async function exportStudentProfiles() {
    try {
      const [students, baiLams, baiKTs] = await Promise.all([
        CL.API.getStudentList(), CL.API.getHistory(true), CL.API.getBaiKT()
      ]);
      const bloomLvs = ['b1','b2','b3','b4','b5','b6'];
      const header   = ['MSHS','Họ tên','Lớp','ĐTB KT','Số đợt KT',
        ...bloomLvs.map(l=>`ĐTB ${l.toUpperCase()}`),'Xu hướng','Nhận xét'];
      const rows = students.map(s => {
        const kts  = baiKTs.filter(b => b.mshs===s.mshs);
        const lams = baiLams.filter(l => l.mshs===s.mshs);
        const avg  = kts.length ? kts.reduce((a,b)=>a+(parseFloat(b.diem_tong)||0),0)/kts.length : 0;
        const sorted = kts.sort((a,b)=>new Date(a.ts)-new Date(b.ts));
        const trend  = sorted.length>=2 ? (parseFloat(sorted[sorted.length-1].diem_tong)||0)-(parseFloat(sorted[0].diem_tong)||0) : 0;
        const blooms = bloomLvs.map(lv => {
          const sc = lams.filter(l=>(l.bai_id||'').includes(`-${lv}-`)).map(l=>parseFloat(l.diem)||0);
          return sc.length ? (sc.reduce((a,b)=>a+b,0)/sc.length).toFixed(2) : '';
        });
        const comment = avg>=8?'Xuất sắc':avg>=6.5?'Khá':avg>=5?'Trung bình':'Cần hỗ trợ';
        return [s.mshs,s.ho_ten,s.lop,avg.toFixed(2),kts.length,...blooms,trend.toFixed(2),comment];
      });
      Utils.downloadCsv([header,...rows], `nangluc-hocsinh-${_today()}.csv`);
      Toast.success('✅ Đã xuất hồ sơ năng lực học sinh');
    } catch(e) { Toast.error('❌ '+e.message); }
  }

  async function exportQuestionAnalysis() {
    try {
      const [exams, baiLams] = await Promise.all([CL.API.getExams(true), CL.API.getHistory(true)]);
      const rows = [['Đợt KT','Câu','Bloom','Số HS','ĐTB','Tỉ lệ đạt','Đánh giá']];
      for (const exam of exams.filter(e=>e.trang_thai==='closed')) {
        const lams = baiLams.filter(l=>l.ky_id===exam.id);
        const byQ  = Utils.groupBy(lams, l=>l.bai_id);
        Object.entries(byQ).forEach(([baiId, answers]) => {
          const scores  = answers.map(a=>parseFloat(a.diem)||0);
          const avg     = scores.reduce((a,b)=>a+b,0)/scores.length;
          const passRate= scores.filter(s=>s>=5).length/scores.length;
          const bloom   = (baiId.match(/-b([1-6])-/)||['','?'])[1];
          const tag     = avg<4?'Rất khó':avg<6?'Khó':avg<8?'Vừa':'Dễ';
          rows.push([exam.ten,baiId,`B${bloom}`,scores.length,avg.toFixed(2),(passRate*100).toFixed(1)+'%',tag]);
        });
      }
      Utils.downloadCsv(rows, `phantich-cauho-${_today()}.csv`);
      Toast.success('✅ Đã xuất phân tích câu hỏi');
    } catch(e) { Toast.error('❌ '+e.message); }
  }

  async function exportHistory() {
    try {
      const rows = await CL.API.getHistory(true);
      const header = ['Thời gian','MSHS','Họ tên','Lớp','Đợt KT','Câu hỏi','Điểm','Thời gian làm (giây)'];
      const data   = rows.map(r => [r.ts,r.mshs,r.ho_ten,r.lop,r.ky_id||'Luyện tập',r.bai_id,r.diem,r.tg_lam_giay||'']);
      Utils.downloadCsv([header,...data], `lichsu-lam-bai-${_today()}.csv`);
      Toast.success('✅ Đã xuất lịch sử làm bài');
    } catch(e) { Toast.error('❌ '+e.message); }
  }

  async function exportClassCsv() {
    const lopFilter  = document.getElementById('ana-lop-filter')?.value  || '';
    const examFilter = document.getElementById('ana-exam-filter')?.value || '';
    const d = document.getElementById('ana-content')?._data;
    if (!d) return;
    const header = ['MSHS','Họ tên','Lớp','Đợt KT','Điểm tổng','Số câu','Hoàn thành','Thời gian (s)'];
    const rows = d.baiKTs
      .filter(b => (!lopFilter||b.lop===lopFilter) && (!examFilter||b.ky_id===examFilter))
      .map(b => [b.mshs,b.ho_ten,b.lop,b.ten_ky||b.ky_id,b.diem_tong,b.so_bai,b.da_hoan_thanh,b.tg_tong_giay]);
    Utils.downloadCsv([header,...rows], `bangdiem-lop-${_today()}.csv`);
    Toast.success('✅ Đã xuất');
  }

  async function syncToSheets() {
    const btn = document.getElementById('exp-sheets-btn');
    const msg = document.getElementById('exp-sheets-msg');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang đồng bộ...'; }
    if (msg) msg.textContent = '';
    try {
      const result = await CL.API.syncAnalyticsToSheets();
      if (msg) msg.textContent = `✅ Đã đồng bộ: ${result.rows_written} dòng`;
      Toast.success('✅ Đã đồng bộ dữ liệu lên Google Sheets');
    } catch(e) {
      if (msg) msg.textContent = '❌ ' + e.message;
      Toast.error('❌ ' + e.message);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '📤 Sync → Google Sheets'; }
    }
  }

  function _today() { return new Date().toISOString().slice(0,10); }

  return { render, switchTab, filterClass, exportClassCsv,
           loadStudentDetail, loadExamAnalysis,
           exportSummary, exportStudentProfiles, exportQuestionAnalysis, exportHistory, syncToSheets };
});
