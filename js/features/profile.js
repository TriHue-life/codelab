/**
 * features/profile.js — Profile Panel
 * ═══════════════════════════════════════════════════════════════
 * Tabs: Thông tin | Thống kê | Lịch sử | Bảo mật
 * Features: Avatar upload, đổi mật khẩu có xác nhận 2 bước
 */
'use strict';

CL.define('Features.Profile', () => {
  const Utils   = CL.require('Utils');
  const Session = CL.require('Auth.Session');
  const Toast   = CL.require('UI.Toast');
  const Events  = CL.require('Events');

  let _el = null;

  // ── Avatar helpers ────────────────────────────────────────────
  const AV_LS = 'cl_avatar_';
  function _avKey(user) { return AV_LS + (user?.username || user?.mshs || 'u'); }

  function _getAvatar(user) {
    // localStorage cache first, then server url
    return localStorage.getItem(_avKey(user)) || user?.avatar_url || '';
  }

  function _setAvatar(user, dataUrl) {
    localStorage.setItem(_avKey(user), dataUrl);
    // Update all avatar elements on page
    document.querySelectorAll('.pf-avatar-img,.user-avatar-img').forEach(el => {
      el.src = dataUrl;
    });
  }

  function _initials(name) {
    const w = (name||'?').trim().split(/\s+/);
    return (w.length>=2 ? w[0][0]+w[w.length-1][0] : w[0][0]).toUpperCase();
  }

  function _color(name) {
    let h = 0;
    for (let c of (name||'')) h = (h*31 + c.charCodeAt(0)) & 0xffffffff;
    const hue = Math.abs(h) % 360;
    return [`hsl(${hue},55%,35%)`, `hsl(${hue},80%,90%)`];
  }

  function _avatarHtml(user, size=72) {
    const av = _getAvatar(user);
    const [bg,fg] = _color(user?.name||'');
    if (av) return `<img class="pf-avatar-img" src="${av}" 
      style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;cursor:pointer"
      onclick="CL.Features.Profile._pickAvatar()"
      title="Nhấp để đổi ảnh đại diện">`;
    return `<div class="pf-avatar" style="width:${size}px;height:${size}px;background:${bg};color:${fg};font-size:${size*.35}px;cursor:pointer"
      onclick="CL.Features.Profile._pickAvatar()" title="Nhấp để đổi ảnh đại diện">
      ${_initials(user?.name)}
      <div class="pf-avatar-overlay">📷</div>
    </div>`;
  }

  // ── Avatar picker ─────────────────────────────────────────────
  function _pickAvatar() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) { Toast.error('Ảnh không quá 2MB'); return; }

      const reader = new FileReader();
      reader.onload = async ev => {
        const dataUrl = ev.target.result;
        // Resize to 200x200
        const compressed = await _resizeImage(dataUrl, 200);
        const user = Session.get();
        _setAvatar(user, compressed);
        // Re-render info tab
        const body = document.getElementById('pf-body');
        if (body) await _tabInfo(body);
        Toast.info('⏳ Đang lưu ảnh đại diện...');
        // Upload to server (non-blocking)
        if (CL.API?.isReady()) {
          try {
            const r = await CL.API.saveAvatar(compressed);
            if (r?.url) Toast.success('✅ Đã lưu ảnh đại diện');
          } catch { Toast.info('📱 Ảnh lưu trên thiết bị này'); }
        }
      };
      reader.readAsDataURL(file);
    };
    inp.click();
  }

  async function _resizeImage(dataUrl, maxSize) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const sz = Math.min(img.width, img.height, maxSize);
        canvas.width = canvas.height = sz;
        const ctx = canvas.getContext('2d');
        const s = Math.min(img.width, img.height);
        const ox = (img.width - s) / 2, oy = (img.height - s) / 2;
        ctx.drawImage(img, ox, oy, s, s, 0, 0, sz, sz);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  // ── Open / Close ──────────────────────────────────────────────
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

  // ── Tab: Thông tin ────────────────────────────────────────────
  async function _tabInfo(el) {
    const user = Session.get();
    if (!user) { el.innerHTML = '<div class="pf-empty">Chưa đăng nhập</div>'; return; }
    const isStu = user.role === 'student';
    let extra = {};
    if (CL.API?.isReady()) { try { extra = await CL.API.getMyProfile()||{}; } catch {} }

    el.innerHTML = `
      <div class="pf-hero">
        <div class="pf-avatar-wrap">
          ${_avatarHtml(user, 80)}
          <button class="pf-av-change-btn" onclick="CL.Features.Profile._pickAvatar()" title="Đổi ảnh đại diện">📷</button>
        </div>
        <div class="pf-hero-right">
          <div class="pf-hero-name">${Utils.escHtml(user.name)}</div>
          <div class="pf-hero-sub">
            <span class="pf-role-badge pf-role-${user.role}">
              ${user.role==='student'?'🎓 Học sinh':user.role==='admin'?'⚡ Admin':'👨‍🏫 Giáo viên'}
            </span>
            ${user.lop?`<span class="pf-lop-tag">${Utils.escHtml(user.lop)}</span>`:''}
          </div>
        </div>
      </div>
      <div class="pf-info-grid">
        ${isStu ? _ir('MSHS', user.mshs||'—') : _ir('Username', user.username||'—')}
        ${_ir('Email', extra.email || user.email || '—')}
        ${isStu ? _ir('Lớp', user.lop||extra.lop||'—') : _ir('Lớp phụ trách', user.lop||extra.lop||'—')}
        ${isStu ? _ir('Ngày sinh', extra.ngay_sinh||'—') : ''}
      </div>
      <div class="pf-section-title" style="margin-top:16px">✏️ Cập nhật thông tin</div>
      <div class="pf-form" id="pf-info-form">
        <div class="pf-field"><label>Họ và tên</label>
          <input id="pf-name" type="text" value="${Utils.escHtml(user.name||'')}" placeholder="Họ và tên">
        </div>
        <div class="pf-field"><label>Email</label>
          <input id="pf-email" type="email" value="${Utils.escHtml(extra.email||user.email||'')}" placeholder="email@example.com">
        </div>
        ${isStu ? `<div class="pf-field"><label>Ngày sinh</label>
          <input id="pf-dob" type="date" value="${Utils.escHtml(extra.ngay_sinh||'')}"></div>` : ''}
        <div id="pf-info-msg" class="pf-msg"></div>
        <button class="pf-btn-primary" onclick="CL.Features.Profile.saveInfo()">💾 Lưu thông tin</button>
      </div>`;
  }

  function _ir(l,v){return `<div class="pf-irow"><span class="pf-irow-l">${l}</span><span class="pf-irow-v">${Utils.escHtml(String(v))}</span></div>`;}

  async function saveInfo() {
    const msg = document.getElementById('pf-info-msg');
    const name  = document.getElementById('pf-name')?.value.trim();
    const email = document.getElementById('pf-email')?.value.trim();
    const dob   = document.getElementById('pf-dob')?.value||'';
    if (!name) { _msg(msg,'⚠️ Tên không được để trống','warn'); return; }
    _msg(msg,'⏳ Đang lưu...','info');
    try {
      await CL.API.updateProfile({ name, email, ngay_sinh: dob });
      const user = Session.get();
      Session.save({ ...user, name });
      _msg(msg,'✅ Đã lưu!','ok');
      Toast.success('✅ Cập nhật thành công');
    } catch(e) { _msg(msg,'❌ '+e.message,'err'); }
  }

  // ── Tab: Thống kê ─────────────────────────────────────────────
  async function _tabStats(el) {
    if (!CL.API?.isReady()) { el.innerHTML='<div class="pf-empty">📡 Chưa kết nối server</div>'; return; }
    try {
      const stats = await CL.API.getMyStats?.() || {};
      el.innerHTML = `
        <div class="pf-stats-grid">
          ${_sc(stats.total_submissions||0,'Lần nộp bài','📝')}
          ${_sc(stats.avg_score!=null?stats.avg_score.toFixed(1):'—','Điểm TB','⭐')}
          ${_sc(stats.perfect||0,'Bài đạt 10/10','🏆')}
          ${_sc(stats.exercises_done||0,'Bài đã làm','✅')}
        </div>
        ${stats.by_grade ? `<div class="pf-section-title" style="margin-top:16px">📊 Theo khối lớp</div>
          <div class="pf-dbars">
            ${Object.entries(stats.by_grade).map(([g,n])=>_db(g,n,stats.total_submissions,'var(--accent)')).join('')}
          </div>` : ''}`;
    } catch(e) { el.innerHTML=`<div class="pf-empty">❌ ${e.message}</div>`; }
  }
  function _sc(v,l,i){return `<div class="pf-scard"><div class="pf-scard-icon">${i}</div><div class="pf-scard-val">${v}</div><div class="pf-scard-lbl">${l}</div></div>`;}
  function _db(l,n,tot,c){const p=tot>0?Math.round(n/tot*100):0;return `<div class="pf-dbar-row"><span class="pf-dbar-lbl">${l}</span><div class="pf-dbar-track"><div class="pf-dbar-fill" style="width:${p}%;background:${c}"></div></div><span class="pf-dbar-val">${n} <small>(${p}%)</small></span></div>`;}

  // ── Tab: Lịch sử ──────────────────────────────────────────────
  async function _tabHistory(el) {
    if (!CL.API?.isReady()) { el.innerHTML='<div class="pf-empty">📡 Chưa kết nối server</div>'; return; }
    try {
      const hist = await CL.API.getMyHistory?.() || [];
      el.innerHTML = `
        <div class="pf-hist-search">
          <input id="pf-hsearch" type="search" placeholder="🔍 Tìm bài..."
            oninput="CL.Features.Profile._filterH(this.value)">
        </div>
        <div id="pf-hlist">
          ${hist.length ? hist.map(h=>`
            <div class="pf-hitem" data-title="${Utils.escHtml((h.title||'').toLowerCase())}">
              <span class="pf-hbadge" style="background:${h.score>=9?'var(--accent2)':h.score>=6?'var(--accent)':'var(--error)'}">
                ${(h.score||0).toFixed(1)}
              </span>
              <div class="pf-hcontent">
                <div class="pf-htitle">${Utils.escHtml(h.title||h.bai_id||'—')}</div>
                <div class="pf-hdate">${h.submitted_at||''}</div>
              </div>
            </div>`).join('') : '<div class="pf-empty">Chưa có lịch sử</div>'}
        </div>`;
    } catch(e) { el.innerHTML=`<div class="pf-empty">❌ ${e.message}</div>`; }
  }

  function _filterH(q) {
    const kw = q.toLowerCase();
    document.querySelectorAll('.pf-hitem').forEach(el => {
      el.style.display = !kw || el.dataset.title?.includes(kw) ? '' : 'none';
    });
  }

  // ── Tab: Bảo mật ─────────────────────────────────────────────
  function _tabSecurity(el) {
    const user = Session.get();
    const isStu = user?.role === 'student';
    el.innerHTML = `
      <div class="pf-section-title">🔑 Đổi mật khẩu</div>
      <div class="pf-form">
        <div class="pf-field">
          <label>Mật khẩu hiện tại <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-old" type="password" placeholder="Nhập mật khẩu hiện tại" autocomplete="current-password">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-old',this)">👁</button>
          </div>
        </div>
        <div class="pf-field">
          <label>Mật khẩu mới <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-new" type="password" placeholder="Ít nhất 8 ký tự"
              autocomplete="new-password" oninput="CL.Features.Profile._chkPw()">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-new',this)">👁</button>
          </div>
          <div class="pf-pw-strength" id="pf-pw-strength"></div>
        </div>
        <div class="pf-field">
          <label>Xác nhận mật khẩu mới <span class="pf-req">*</span></label>
          <div class="pf-pw-wrap">
            <input id="pf-cfm" type="password" placeholder="Nhập lại mật khẩu mới"
              autocomplete="new-password" oninput="CL.Features.Profile._chkPw()">
            <button class="pf-eye" onclick="CL.Features.Profile._eye('pf-cfm',this)">👁</button>
          </div>
        </div>
        <div class="pf-pw-rules">
          <div class="pf-rule" id="pwr-len">○ Ít nhất 8 ký tự</div>
          <div class="pf-rule" id="pwr-upper">○ Có chữ hoa (A-Z)</div>
          <div class="pf-rule" id="pwr-num">○ Có chữ số (0-9)</div>
          <div class="pf-rule" id="pwr-match">○ Mật khẩu xác nhận khớp</div>
          <div class="pf-rule" id="pwr-diff">○ Khác mật khẩu cũ</div>
        </div>
        <div id="pf-pw-msg" class="pf-msg"></div>
        <button class="pf-btn-primary" id="pf-pw-btn"
          onclick="CL.Features.Profile.changePw()">🔑 Đổi mật khẩu</button>
      </div>
      <div class="pf-section-title" style="margin-top:20px">🖥 Phiên đăng nhập</div>
      <div class="pf-session-box">
        ${_ir(isStu?'MSHS':'Username', isStu?(user?.mshs||'—'):(user?.username||'—'))}
        ${_ir('Vai trò', user?.role==='admin'?'⚡ Admin':isStu?'🎓 Học sinh':'👨‍🏫 Giáo viên')}
        ${_ir('Thời hạn','8 giờ kể từ khi đăng nhập')}
      </div>
      <button class="pf-btn-danger" style="margin-top:12px" onclick="CL.Auth.UI.logout()">↩ Đăng xuất</button>`;
  }

  function _chkPw() {
    const pw  = document.getElementById('pf-new')?.value||'';
    const cfm = document.getElementById('pf-cfm')?.value||'';
    const old = document.getElementById('pf-old')?.value||'';
    _rule('pwr-len',   pw.length>=8,              '✅ Ít nhất 8 ký tự',        '○ Ít nhất 8 ký tự');
    _rule('pwr-upper', /[A-Z]/.test(pw),          '✅ Có chữ hoa',             '○ Có chữ hoa (A-Z)');
    _rule('pwr-num',   /[0-9]/.test(pw),          '✅ Có chữ số',              '○ Có chữ số (0-9)');
    _rule('pwr-match', cfm.length>0 && pw===cfm,  '✅ Mật khẩu xác nhận khớp','○ Mật khẩu xác nhận khớp');
    _rule('pwr-diff',  pw.length>0 && pw!==old,   '✅ Khác mật khẩu cũ',      '○ Khác mật khẩu cũ');

    // Strength bar
    const str = document.getElementById('pf-pw-strength');
    if (str && pw) {
      let score = 0;
      if (pw.length>=8) score++;
      if (pw.length>=12) score++;
      if (/[A-Z]/.test(pw)) score++;
      if (/[0-9]/.test(pw)) score++;
      if (/[^A-Za-z0-9]/.test(pw)) score++;
      const labels=['','Rất yếu','Yếu','Trung bình','Mạnh','Rất mạnh'];
      const colors=['','#f87171','#fb923c','#fbbf24','#34d399','#4f9eff'];
      str.innerHTML = `<div class="pf-strength-bar"><div style="width:${score*20}%;background:${colors[score]};height:100%;border-radius:4px;transition:.3s"></div></div>
        <span style="font-size:10px;color:${colors[score]}">${labels[score]||''}</span>`;
    }
  }

  function _rule(id,ok,y,n) {
    const el=document.getElementById(id);
    if(!el)return; el.textContent=ok?y:n; el.className='pf-rule'+(ok?' ok':'');
  }

  function _eye(id,btn) {
    const el=document.getElementById(id);
    if(!el)return;
    el.type=el.type==='password'?'text':'password';
    btn.textContent=el.type==='password'?'👁':'🙈';
  }

  async function changePw() {
    const oldPw = document.getElementById('pf-old')?.value||'';
    const newPw = document.getElementById('pf-new')?.value||'';
    const cfmPw = document.getElementById('pf-cfm')?.value||'';
    const msg   = document.getElementById('pf-pw-msg');

    if (!oldPw)           { _msg(msg,'⚠️ Nhập mật khẩu hiện tại','warn');     return; }
    if (newPw.length < 8) { _msg(msg,'⚠️ Mật khẩu mới ít nhất 8 ký tự','warn'); return; }
    if (newPw !== cfmPw)  { _msg(msg,'⚠️ Mật khẩu xác nhận không khớp','warn'); return; }
    if (newPw === oldPw)  { _msg(msg,'⚠️ Mật khẩu mới phải khác mật khẩu cũ','warn'); return; }

    // Step 2: Confirm dialog
    const ok = await _confirmDialog(
      '🔑 Xác nhận đổi mật khẩu',
      'Bạn chắc chắn muốn đổi mật khẩu?\nSau khi đổi, bạn cần đăng nhập lại.',
      'Xác nhận đổi', 'Huỷ'
    );
    if (!ok) return;

    _msg(msg,'⏳ Đang xử lý...','info');
    const btn = document.getElementById('pf-pw-btn');
    if (btn) btn.disabled = true;
    try {
      const oh = await Utils.sha256(oldPw);
      const nh = await Utils.sha256(newPw);
      await CL.API.changePassword(oh, nh);
      _msg(msg,'✅ Đổi mật khẩu thành công! Vui lòng đăng nhập lại.','ok');
      ['pf-old','pf-new','pf-cfm'].forEach(id => {
        const e=document.getElementById(id); if(e)e.value='';
      });
      document.querySelectorAll('.pf-rule').forEach(r => {
        r.textContent=r.textContent.replace('✅','○'); r.className='pf-rule';
      });
      Toast.success('🔑 Mật khẩu đã được thay đổi. Đang đăng xuất...');
      setTimeout(() => CL.Auth.UI.logout(), 2500);
    } catch(err) {
      _msg(msg,'❌ '+(err.message||'Lỗi không xác định'),'err');
      if (btn) btn.disabled = false;
    }
  }

  // ── Confirm Dialog ────────────────────────────────────────────
  function _confirmDialog(title, text, yesLabel='Xác nhận', noLabel='Huỷ') {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.className = 'pf-confirm-overlay';
      overlay.innerHTML = `
        <div class="pf-confirm-box">
          <div class="pf-confirm-title">${title}</div>
          <div class="pf-confirm-text">${text.replace(/\n/g,'<br>')}</div>
          <div class="pf-confirm-btns">
            <button class="pf-btn-ghost" id="pf-cfm-no">${noLabel}</button>
            <button class="pf-btn-primary" id="pf-cfm-yes">${yesLabel}</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('show'));
      const cleanup = (val) => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 250);
        resolve(val);
      };
      document.getElementById('pf-cfm-yes').onclick = () => cleanup(true);
      document.getElementById('pf-cfm-no').onclick  = () => cleanup(false);
      overlay.onclick = e => { if(e.target===overlay) cleanup(false); };
    });
  }

  function _msg(el,text,type){if(!el)return;el.textContent=text;el.className='pf-msg pf-msg-'+(type||'info');}

  window.ProfilePanel = {open, close};
  return {open, close, saveInfo, changePw, _tab, _chkPw, _eye, _filterH, _pickAvatar};
});
