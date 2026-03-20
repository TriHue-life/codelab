/**
 * features/profile.js — User Profile Panel
 * ═══════════════════════════════════════════════════════════════
 * Thông tin cá nhân, thống kê học tập, lịch sử làm bài, bảo mật.
 * @requires core/*, auth/session.js, CL.API
 */
'use strict';

CL.define('Features.Profile', () => {
  const Utils   = CL.require('Utils');
  const Session = CL.require('Auth.Session');
  const Toast   = CL.require('UI.Toast');

  let _el = null;

  const PALETTE = [
    ['1a73e8','fff'],['0d47a1','fff'],['15803d','fff'],['7c3aed','fff'],
    ['db2777','fff'],['0891b2','fff'],['ea580c','fff'],['b45309','fff'],
  ];
  function _color(name) {
    let h = 0;
    for (let i=0;i<(name||'').length;i++) h=(h*31+name.charCodeAt(i))&0xffff;
    return PALETTE[h % PALETTE.length];
  }
  function _init(name) {
    const w=(name||'?').trim().split(/\s+/);
    return (w.length>=2?w[0][0]+w[w.length-1][0]:w[0][0]).toUpperCase();
  }

  function open() {
    if (_el) { _el.classList.add('show'); _tab('info'); return; }
    _el = document.createElement('div');
    _el.id = 'profile-overlay';
    _el.innerHTML = `
      <div class="pf-backdrop" onclick="CL.Features.Profile.close()"></div>
      <div class="pf-drawer">
        <div class="pf-header">
          <span class="pf-title">👤 Hồ sơ cá nhân</span>
          <button class="pf-close" onclick="CL.Features.Profile.close()">✕</button>
        </div>
        <div class="pf-tabs" id="pf-tabs">
          <button class="pf-tab on"  data-tab="info"     onclick="CL.Features.Profile._tab('info')">📋 Thông tin</button>
          <button class="pf-tab"     data-tab="stats"    onclick="CL.Features.Profile._tab('stats')">📊 Thống kê</button>
          <button class="pf-tab"     data-tab="history"  onclick="CL.Features.Profile._tab('history')">📖 Lịch sử</button>
          <button class="pf-tab"     data-tab="security" onclick="CL.Features.Profile._tab('security')">🔑 Bảo mật</button>
        </div>
        <div class="pf-body" id="pf-body"></div>
      </div>`;
    document.body.appendChild(_el);
    requestAnimationFrame(() => _el.classList.add('show'));
    _tab('info');
  }

  function close() { _el?.classList.remove('show'); }

  async function _tab(name) {
    document.querySelectorAll('.pf-tab').forEach(t =>
      t.classList.toggle('on', t.dataset.tab === name));
    const body = document.getElementById('pf-body');
    if (!body) return;
    body.innerHTML = '<div class="pf-loading">⏳</div>';
    if      (name==='info')     await _tabInfo(body);
    else if (name==='stats')    await _tabStats(body);
    else if (name==='history')  await _tabHistory(body);
    else if (name==='security') _tabSecurity(body);
  }

  // ── Info ────────────────────────────────────────────────────────
  async function _tabInfo(el) {
    const user = Session.get();
    if (!user) { el.innerHTML = '<div class="pf-empty">Chưa đăng nhập</div>'; return; }
    const [bg,fg] = _color(user.name);
    const isStu  = user.role === 'student';
    let extra = {};
    if (CL.API?.isReady()) { try { extra = await CL.API.getMyProfile()||{}; } catch {} }

    el.innerHTML = `
      <div class="pf-hero">
        <div class="pf-avatar" style="background:#${bg};color:#${fg}">${_init(user.name)}</div>
        <div class="pf-hero-right">
          <div class="pf-hero-name">${Utils.escHtml(user.name)}</div>
          <div class="pf-hero-sub">
            <span class="pf-role-badge pf-role-${user.role}">
              ${user.role==='student'?'🎓 Học sinh':user.role==='admin'?'⚡ Admin':'👨‍🏫 Giáo viên'}
            </span>
            ${user.lop?'<span class="pf-lop-tag">'+Utils.escHtml(user.lop)+'</span>':''}
          </div>
        </div>
      </div>
      <div class="pf-info-grid">
        ${_ir(isStu?'MSHS':'Tên đăng nhập', isStu?(user.mshs||'—'):(user.username||'—'))}
        ${_ir('Họ và tên', user.name)}
        ${user.lop ? _ir('Lớp',user.lop) : ''}
        ${extra.email ? _ir('Email',extra.email) : ''}
        ${extra.ngay_sinh ? _ir('Ngày sinh',extra.ngay_sinh) : ''}
        ${_ir('Trạng thái','<span class="pf-active-dot">● Hoạt động</span>')}
      </div>
      <div class="pf-section-title">✏️ Chỉnh sửa thông tin</div>
      <div class="pf-form">
        <div class="pf-field"><label>Họ và tên <span class="pf-req">*</span></label>
          <input id="pf-name" type="text" value="${Utils.escHtml(user.name)}"></div>
        <div class="pf-field"><label>Email</label>
          <input id="pf-email" type="email" value="${Utils.escHtml(extra.email||'')}"></div>
        ${isStu?'<div class="pf-field"><label>Ngày sinh</label><input id="pf-dob" type="date" value="'+Utils.escHtml(extra.ngay_sinh||'')+'"></div>':''}
        <div id="pf-info-msg" class="pf-msg"></div>
        <button class="pf-btn-primary" onclick="CL.Features.Profile.saveInfo()">💾 Lưu</button>
      </div>`;
  }
  function _ir(l,v){return `<div class="pf-irow"><span class="pf-irow-l">${l}</span><span class="pf-irow-v">${v}</span></div>`;}

  async function saveInfo() {
    const n=document.getElementById('pf-name')?.value?.trim();
    const e=document.getElementById('pf-email')?.value?.trim()||'';
    const d=document.getElementById('pf-dob')?.value||'';
    const msg=document.getElementById('pf-info-msg');
    if(!n){_msg(msg,'⚠️ Vui lòng nhập họ tên','warn');return;}
    _msg(msg,'⏳ Đang lưu...','info');
    try {
      await CL.API.updateMyProfile({ho_ten:n,email:e,ngay_sinh:d});
      const sess=Session.get();
      if(sess){sess.name=n;Session.save(sess);}
      _msg(msg,'✅ Đã cập nhật','ok');
      Toast.success('✅ Hồ sơ đã được cập nhật');
      const ub=document.querySelector('#user-badge .uname');
      if(ub) ub.textContent=n+(sess?.lop?' · '+sess.lop:'');
    } catch(err){_msg(msg,'❌ '+err.message,'err');}
  }

  // ── Stats ───────────────────────────────────────────────────────
  async function _tabStats(el) {
    try {
      const hist=await CL.API.getHistory(true);
      if(!hist?.length){el.innerHTML='<div class="pf-empty">📭 Chưa có bài làm nào.</div>';return;}
      const Registry=CL.require('Exercises.Registry');
      const sc=hist.map(r=>parseFloat(r.diem)||0);
      const tot=hist.length, avg=sc.reduce((a,b)=>a+b,0)/tot;
      const max=Math.max(...sc);
      const n8=sc.filter(d=>d>=8).length, n5=sc.filter(d=>d>=5&&d<8).length, n0=sc.filter(d=>d<5).length;
      const bloom={b1:0,b2:0,b3:0,b4:0,b5:0,b6:0};
      const tp={python:0,html:0,sql:0};
      hist.forEach(r=>{
        const m=(r.bai_id||'').match(/-b([1-6])-/);
        if(m) bloom['b'+m[1]]++;
        const ex=Registry.findById(r.bai_id);
        tp[ex?.type||'python']=(tp[ex?.type||'python']||0)+1;
      });
      const recent=hist.slice(0,10);
      el.innerHTML=`
        <div class="pf-stat-row">
          ${_sc(tot,'Bài đã làm','📝')}${_sc(avg.toFixed(1),'Điểm TB','⭐')}
          ${_sc(max.toFixed(1),'Điểm cao nhất','🏆')}${_sc(Math.round(n8/tot*100)+'%','Tỷ lệ Giỏi','✅')}
        </div>
        <div class="pf-section-title">📊 Phân phối điểm</div>
        <div class="pf-dist">
          ${_db('≥ 8.0 — Giỏi',n8,tot,'var(--accent2)')}
          ${_db('5–7.9 — TB',n5,tot,'#f59e0b')}
          ${_db('< 5 — Chưa đạt',n0,tot,'var(--error)')}
        </div>
        <div class="pf-section-title">🧠 Phân phối Bloom</div>
        <div class="pf-bloom-dist">
          ${Object.entries(bloom).map(([lv,n])=>n>0?`<div class="pf-bd-row">
            <span class="bloom-badge bloom-${lv}">${lv.toUpperCase()}</span>
            <div class="pf-bd-track"><div class="pf-bd-fill bloom-fill-${lv}" style="width:${Math.round(n/tot*100)}%"></div></div>
            <span class="pf-bd-n">${n}</span></div>`:'').join('')}
        </div>
        <div class="pf-section-title">💻 Theo loại</div>
        <div class="pf-type-row">
          ${tp.python>0?'<div class="pf-type-chip t-python">🐍 Python <b>'+tp.python+'</b></div>':''}
          ${tp.html>0?'<div class="pf-type-chip t-html">🌐 HTML/CSS <b>'+tp.html+'</b></div>':''}
          ${tp.sql>0?'<div class="pf-type-chip t-sql">🗃 SQL <b>'+tp.sql+'</b></div>':''}
        </div>
        <div class="pf-section-title">📈 10 bài gần nhất</div>
        <div class="pf-sparkline">
          ${recent.map(r=>{
            const d=parseFloat(r.diem)||0;
            const h=Math.max(4,Math.round(d/10*48));
            const c=d>=8?'var(--accent2)':d>=5?'#f59e0b':'var(--error)';
            return `<div class="pf-spark-col" title="${Utils.escHtml(r.tieu_de||r.bai_id)}: ${d}">
              <div class="pf-spark-bar" style="height:${h}px;background:${c}"></div>
              <span class="pf-spark-val" style="color:${c}">${d}</span></div>`;
          }).join('')}
        </div>`;
    } catch(e){el.innerHTML=`<div class="pf-empty">❌ ${Utils.escHtml(e.message)}</div>`;}
  }
  function _sc(v,l,i){return `<div class="pf-scard"><div class="pf-scard-icon">${i}</div><div class="pf-scard-val">${v}</div><div class="pf-scard-lbl">${l}</div></div>`;}
  function _db(l,n,tot,c){const p=tot>0?Math.round(n/tot*100):0;return `<div class="pf-dbar-row"><span class="pf-dbar-lbl">${l}</span><div class="pf-dbar-track"><div class="pf-dbar-fill" style="width:${p}%;background:${c}"></div></div><span class="pf-dbar-val">${n} <small>(${p}%)</small></span></div>`;}

  // ── History ──────────────────────────────────────────────────────
  async function _tabHistory(el) {
    try {
      const hist=await CL.API.getHistory(true);
      if(!hist?.length){el.innerHTML='<div class="pf-empty">📭 Chưa có lịch sử.</div>';return;}
      el.innerHTML=`
        <div class="pf-hist-bar">
          <input class="pf-search" type="text" placeholder="🔍 Tìm bài tập..."
            oninput="CL.Features.Profile._filterH(this.value)">
          <span class="pf-hist-count">${hist.length} lần</span>
        </div>
        <div id="pf-hist-list" class="pf-hist-list">
          ${hist.map(r=>{
            const d=parseFloat(r.diem);
            const c=isNaN(d)?'':Utils.scoreClass(d);
            const tg=r.thoi_gian_lam_giay?` · ${Math.floor(r.thoi_gian_lam_giay/60)}m${String(r.thoi_gian_lam_giay%60).padStart(2,'0')}s`:'';
            return `<div class="pf-hist-item" data-q="${Utils.escHtml((r.tieu_de||r.bai_id||'').toLowerCase())}">
              <div class="pf-hist-left">
                <div class="pf-hist-title">${Utils.escHtml(r.tieu_de||r.bai_id||'—')}</div>
                <div class="pf-hist-meta">${Utils.formatTime(r.ts)}${tg}</div>
              </div>
              <div class="pf-hist-score ${c}">${isNaN(d)?'—':d}</div>
            </div>`;
          }).join('')}
        </div>`;
    } catch(e){el.innerHTML=`<div class="pf-empty">❌ ${Utils.escHtml(e.message)}</div>`;}
  }
  function _filterH(q){
    q=q.toLowerCase();
    document.querySelectorAll('#pf-hist-list .pf-hist-item').forEach(i=>{
      i.style.display=(i.dataset.q||'').includes(q)?'':'none';
    });
  }

  // ── Security ─────────────────────────────────────────────────────
  function _tabSecurity(el) {
    const user=Session.get();
    const isStu=user?.role==='student';
    el.innerHTML=`
      <div class="pf-section-title">🔑 Đổi mật khẩu</div>
      <div class="pf-form">
        <div class="pf-field"><label>Mật khẩu hiện tại <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-old" type="password" placeholder="••••••••" autocomplete="current-password">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-old',this)">👁</button>
          </div>
        </div>
        <div class="pf-field"><label>Mật khẩu mới <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-new" type="password" placeholder="Ít nhất 6 ký tự"
              autocomplete="new-password" oninput="CL.Features.Profile._chkPw()">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-new',this)">👁</button>
          </div>
        </div>
        <div class="pf-field"><label>Xác nhận mật khẩu mới <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-cfm" type="password" placeholder="Nhập lại mật khẩu mới"
              autocomplete="new-password" oninput="CL.Features.Profile._chkPw()">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-cfm',this)">👁</button>
          </div>
        </div>
        <div class="pf-pw-rules">
          <div class="pf-rule" id="pwr-len">○ Ít nhất 6 ký tự</div>
          <div class="pf-rule" id="pwr-match">○ Mật khẩu xác nhận khớp</div>
          <div class="pf-rule" id="pwr-diff">○ Khác mật khẩu cũ</div>
        </div>
        <div id="pf-pw-msg" class="pf-msg"></div>
        <button class="pf-btn-primary" onclick="CL.Features.Profile.changePw()">🔑 Xác nhận đổi mật khẩu</button>
      </div>
      <div class="pf-section-title" style="margin-top:20px">🖥 Phiên đăng nhập</div>
      <div class="pf-session-box">
        ${_ir(isStu?'MSHS':'Username', isStu?(user?.mshs||'—'):(user?.username||'—'))}
        ${_ir('Vai trò', user?.role==='admin'?'⚡ Admin':isStu?'🎓 Học sinh':'👨‍🏫 Giáo viên')}
        ${_ir('Thời hạn phiên','8 giờ kể từ khi đăng nhập')}
      </div>
      <button class="pf-btn-danger" style="margin-top:12px" onclick="CL.Auth.UI.logout()">↩ Đăng xuất</button>`;
  }

  function _chkPw(){
    const pw=document.getElementById('pf-new')?.value||'';
    const cfm=document.getElementById('pf-cfm')?.value||'';
    const old=document.getElementById('pf-old')?.value||'';
    _rule('pwr-len',  pw.length>=6,           '✅ Ít nhất 6 ký tự',       '○ Ít nhất 6 ký tự');
    _rule('pwr-match',cfm.length>0&&pw===cfm, '✅ Mật khẩu xác nhận khớp','○ Mật khẩu xác nhận khớp');
    _rule('pwr-diff', pw.length>0&&pw!==old,  '✅ Khác mật khẩu cũ',      '○ Khác mật khẩu cũ');
  }
  function _rule(id,ok,y,n){
    const el=document.getElementById(id);
    if(!el)return; el.textContent=ok?y:n; el.className='pf-rule'+(ok?' ok':'');
  }
  function _eye(id,btn){
    const el=document.getElementById(id);
    if(!el)return;
    el.type=el.type==='password'?'text':'password';
    btn.textContent=el.type==='password'?'👁':'🙈';
  }

  async function changePw() {
    const oldPw=document.getElementById('pf-old')?.value||'';
    const newPw=document.getElementById('pf-new')?.value||'';
    const cfmPw=document.getElementById('pf-cfm')?.value||'';
    const msg=document.getElementById('pf-pw-msg');
    if(!oldPw){_msg(msg,'⚠️ Nhập mật khẩu hiện tại','warn');return;}
    if(newPw.length<6){_msg(msg,'⚠️ Mật khẩu mới ít nhất 6 ký tự','warn');return;}
    if(newPw!==cfmPw){_msg(msg,'⚠️ Mật khẩu xác nhận không khớp','warn');return;}
    if(newPw===oldPw){_msg(msg,'⚠️ Mật khẩu mới phải khác mật khẩu cũ','warn');return;}
    _msg(msg,'⏳ Đang xử lý...','info');
    try {
      const oh=await Utils.sha256(oldPw);
      const nh=await Utils.sha256(newPw);
      await CL.API.changePassword(oh,nh);
      _msg(msg,'✅ Đổi mật khẩu thành công!','ok');
      ['pf-old','pf-new','pf-cfm'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
      document.querySelectorAll('.pf-rule').forEach(r=>{r.textContent=r.textContent.replace('✅','○');r.className='pf-rule';});
      Toast.success('🔑 Mật khẩu đã được thay đổi');
    } catch(err){_msg(msg,'❌ '+err.message,'err');}
  }

  function _msg(el,text,type){if(!el)return;el.textContent=text;el.className='pf-msg pf-msg-'+(type||'info');}

  window.ProfilePanel={open,close};
  return {open,close,saveInfo,changePw,_tab,_chkPw,_eye,_filterH};
});
