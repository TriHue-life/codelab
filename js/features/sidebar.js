/**
 * features/sidebar.js — Sidebar + Panel Layout (Canvas LMS style)
 * ═══════════════════════════════════════════════════════════════
 * Cấu trúc 3 cột: Sidebar | Sub-nav | Content
 *
 * Phân quyền:
 *   👑 Admin   : Tất cả chức năng + Quản lý hệ thống
 *   👨‍🏫 Giáo viên: Dạy học + Theo dõi lớp (không có quản lý users)
 *   🎓 Học sinh : Luyện tập + Xem điểm cá nhân
 */
'use strict';

CL.define('Features.Sidebar', () => {
  const Events = CL.require('Events');

  let _role   = 'student';
  let _active = '';
  let _pinned = false;

  // ══════════════════════════════════════════════════════════════
  //  MENU DEFINITIONS (role-based)
  // ══════════════════════════════════════════════════════════════

  const MENUS = {

    // ── HỌC SINH ──────────────────────────────────────────────
    student: [
      {
        id:'learn', icon:'📚', label:'Học tập',
        children:[
          { id:'practice', icon:'✏️', label:'Luyện tập code',  section:'editor'     },
          { id:'exam',     icon:'📋', label:'Vào phòng thi',   section:'exam'       },
        ]
      },
      {
        id:'results', icon:'📊', label:'Kết quả',
        children:[
          { id:'my-scores',  icon:'🏆', label:'Điểm của tôi',    section:'scores'  },
          { id:'my-history', icon:'📖', label:'Lịch sử làm bài', section:'history' },
        ]
      },
      {
        id:'account', icon:'👤', label:'Tài khoản',
        children:[
          { id:'profile', icon:'🪪', label:'Hồ sơ cá nhân', section:'profile' },
        ]
      },
    ],

    // ── GIÁO VIÊN ─────────────────────────────────────────────
    teacher: [
      {
        id:'teach', icon:'📚', label:'Giảng dạy',
        children:[
          { id:'practice',  icon:'✏️', label:'Luyện tập',      section:'editor'           },
          { id:'exercises', icon:'📝', label:'Ngân hàng bài',  section:'tp:exercises'     },
          { id:'ai-gen',    icon:'🤖', label:'AI Sinh bài tập', section:'tp:ai-gen'        },
        ]
      },
      {
        id:'monitor', icon:'📊', label:'Theo dõi lớp',
        children:[
          { id:'scores',     icon:'🏆', label:'Bảng điểm lớp',  section:'tp:scores'      },
          { id:'history',    icon:'📖', label:'Lịch sử nộp bài',section:'tp:history'     },
          { id:'violations', icon:'🚨', label:'Vi phạm',        section:'tp:violations'  },
          { id:'analytics',  icon:'📈', label:'Thống kê',       section:'tp:analytics'   },
        ]
      },
      {
        id:'exam-mgmt', icon:'📋', label:'Kiểm tra',
        children:[
          { id:'exams', icon:'📋', label:'Kỳ kiểm tra',   section:'tp:exams'   },
        ]
      },
      // Giáo viên không có menu Cấu hình (chỉ Admin mới có)
    ],

    // ── ADMIN (teacher + hệ thống) ─────────────────────────────
    admin: [
      {
        id:'teach', icon:'📚', label:'Giảng dạy',
        children:[
          { id:'practice',  icon:'✏️', label:'Luyện tập',      section:'editor'       },
          { id:'exercises', icon:'📝', label:'Ngân hàng bài',  section:'tp:exercises' },
        ]
      },
      {
        id:'monitor', icon:'📊', label:'Theo dõi',
        children:[
          { id:'scores',     icon:'🏆', label:'Bảng điểm',      section:'tp:scores'     },
          { id:'history',    icon:'📖', label:'Lịch sử',        section:'tp:history'    },
          { id:'violations', icon:'🚨', label:'Vi phạm',        section:'tp:violations' },
          { id:'analytics',  icon:'📈', label:'Thống kê',       section:'tp:analytics'  },
        ]
      },
      {
        id:'exam-mgmt', icon:'📋', label:'Kiểm tra',
        children:[
          { id:'exams', icon:'📋', label:'Kỳ kiểm tra', section:'tp:exams' },
        ]
      },
      {
        id:'admin-mgmt', icon:'👥', label:'Quản lý hệ thống',
        children:[
          { id:'users-student',  icon:'🎓', label:'Học sinh',       section:'tp:users:student'  },
          { id:'users-teacher',  icon:'👨‍🏫', label:'Giáo viên',     section:'tp:users:teacher'  },
          { id:'users-admin',    icon:'⚡', label:'Quản trị viên',  section:'tp:users:admin'    },
          { id:'scores-all',     icon:'📊', label:'Bảng điểm toàn trường', section:'tp:users:scores' },
          { id:'year-mgr',       icon:'📅', label:'Quản lý năm học', section:'tp:year'           },
        ]
      },
      {
        id:'sys', icon:'⚙️', label:'Hệ thống',
        children:[
          { id:'config',    icon:'⚙️', label:'Cấu hình',       section:'tp:config'    },
        ]
      },
    ],
  };

  // ══════════════════════════════════════════════════════════════
  //  BUILD SIDEBAR
  // ══════════════════════════════════════════════════════════════

  function init(role) {
    _role   = role || 'student';
    _pinned = localStorage.getItem('cl_sb_pinned') === '1';

    const sb = document.getElementById('sidebar');
    if (!sb) return;

    const groups = MENUS[_role] || MENUS.student;

    // Role badge
    const roleInfo = {
      admin:   { icon:'⚡', label:'Admin',      cls:'sb-role-admin'   },
      teacher: { icon:'👨‍🏫', label:'Giáo viên', cls:'sb-role-teacher' },
      student: { icon:'🎓', label:'Học sinh',   cls:'sb-role-student' },
    }[_role] || { icon:'👤', label:'', cls:'' };

    sb.innerHTML = `
      <div class="sb-header">
        <div class="sb-logo">
          <span class="sb-logo-icon">🖥️</span>
          <div class="sb-logo-text">
            <div class="sb-logo-name">CodeLab</div>
            <div class="sb-role-badge ${roleInfo.cls}">${roleInfo.icon} ${roleInfo.label}</div>
          </div>
        </div>
        <button class="sb-pin-btn" id="sb-pin" title="Ghim/Thu menu"
          onclick="CL.Features.Sidebar.togglePin()">
          <span class="sb-pin-icon">${_pinned ? '◀' : '▶'}</span>
        </button>
      </div>

      <nav class="sb-nav" role="navigation" aria-label="Menu chính">
        ${groups.map(g => _groupHtml(g)).join('')}
      </nav>

      <div class="sb-bottom">
        <button class="sb-item sb-profile-btn"
          onclick="CL.Features.Profile?.open()"
          title="Hồ sơ cá nhân">
          <span class="sb-icon">👤</span>
          <span class="sb-label">Hồ sơ</span>
        </button>
        <button class="sb-item sb-logout"
          onclick="CL.Auth.UI.logout()"
          title="Đăng xuất">
          <span class="sb-icon">↩</span>
          <span class="sb-label">Đăng xuất</span>
        </button>
      </div>`;

    if (_pinned) sb.classList.add('pinned');
    document.getElementById('app-shell')?.style.removeProperty('visibility');
    document.getElementById('sb-overlay')?.addEventListener('click', closeMobile);

    // Auto-expand first group
    const firstGroup = sb.querySelector('.sb-group');
    if (firstGroup) firstGroup.classList.add('expanded');

    // Restore last active
    const saved = localStorage.getItem('cl_sb_active') || _getDefaultId();
    navigate(saved, false);

    const wv = document.getElementById('workspace-view');
    if (wv && wv.style.display === '') wv.style.display = 'flex';
  }

  function _getDefaultId() {
    const groups = MENUS[_role] || MENUS.student;
    return groups[0]?.children?.[0]?.id || 'practice';
  }

  function _groupHtml(group) {
    const hasActive = group.children.some(c => c.id === _active);
    return `
      <div class="sb-group${hasActive ? ' has-active' : ''}" data-gid="${group.id}">
        <button class="sb-group-header${hasActive ? ' has-active' : ''}"
          aria-haspopup="true">
          <span class="sb-icon">${group.icon}</span>
          <span class="sb-label">${group.label}</span>
          <span class="sb-group-arrow">›</span>
        </button>
        <div class="sb-dropdown" role="menu">
          <div class="sb-dropdown-label">${group.label}</div>
          ${group.children.map(c => _childHtml(c)).join('')}
        </div>
      </div>`;
  }

  function _childHtml(item) {
    return `
      <button class="sb-child${_active === item.id ? ' active' : ''}"
        data-id="${item.id}" data-section="${item.section}"
        onclick="CL.Features.Sidebar.navigate('${item.id}')"
        title="${item.label}">
        <span class="sb-child-icon">${item.icon}</span>
        <span class="sb-label">${item.label}</span>
      </button>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  NAVIGATION
  // ══════════════════════════════════════════════════════════════

  function navigate(id, save = true) {
    _active = id;
    if (save) localStorage.setItem('cl_sb_active', id);

    // Update active state
    document.querySelectorAll('.sb-child[data-id]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.id === id);
    });

    // Find item across all groups
    const groups = MENUS[_role] || MENUS.student;
    let item = null;
    for (const g of groups) {
      item = g.children.find(c => c.id === id);
      if (item) {
        // Expand parent group
        document.querySelector(`.sb-group[data-gid="${g.id}"]`)?.classList.add('expanded');
        break;
      }
    }
    if (!item) return;

    closeMobile();

    const section = item.section;

    if (section === 'editor') {
      _showSection('workspace-view');
    } else if (section === 'profile') {
      CL.Features.Profile?.open();
      return;
    } else if (section === 'exam') {
      _showSection('workspace-view');
    } else if (section === 'history') {
      _showSection('panel-view');
      _renderStudentHistory();
    } else if (section === 'scores') {
      _showSection('panel-view');
      _renderStudentScores();
    } else if (section.startsWith('tp:users:')) {
      const sub = section.replace('tp:users:', '');
      _showSection('panel-view');
      _renderUsersPanel(sub);
    } else if (section.startsWith('tp:')) {
      const tabId = section.replace('tp:', '');
      _showSection('panel-view');
      _renderPanel(tabId);
    }

    // Update breadcrumb
    const bc = document.getElementById('breadcrumb-title');
    if (bc) bc.textContent = item.label;
  }

  function toggleGroup(gid) {
    // No-op: dropdowns are hover-based now
  }

  function _showSection(which) {
    const wv = document.getElementById('workspace-view');
    const pv = document.getElementById('panel-view');
    const exBar = document.getElementById('tb-ex-bar');
    if (wv) wv.style.display = which === 'workspace-view' ? 'flex' : 'none';
    if (pv) pv.style.display = which === 'panel-view'    ? 'flex' : 'none';
    if (exBar) exBar.style.display = which === 'workspace-view' ? '' : 'none';
  }

  // ══════════════════════════════════════════════════════════════
  //  PANEL RENDERERS
  // ══════════════════════════════════════════════════════════════

  function _renderPanel(tabId) {
    const pv = document.getElementById('panel-view');
    if (!pv) return;
    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải...</div>';
    const RENDERERS = {
      scores:     () => CL.Teacher.Scores?.render(pv),
      violations: () => CL.Teacher.Violations?.render(pv),
      history:    () => CL.Teacher.History?.render(pv),
      exams:      () => CL.Teacher.Exams?.render(pv),
      analytics:  () => CL.Teacher.Analytics?.render(pv),
      exercises:  () => CL.Teacher.ExEditor?.render(pv),
      config:     () => CL.Teacher.Config?.render(pv),
      changelog:  () => CL.Features.Changelog?.render(pv),
    };
    (RENDERERS[tabId] || (() => { pv.innerHTML = '<div class="pv-empty">Chức năng đang phát triển</div>'; }))();
  }

  async function _renderUsersPanel(sub) {
    const pv = document.getElementById('panel-view');
    if (!pv) return;

    // ✅ Kiểm tra quyền admin ở frontend trước khi gọi API
    const Session = CL.require('Auth.Session');
    const user = Session?.get?.();
    if (!user || user.role !== 'admin') {
      pv.innerHTML = '<div class="tp-empty">❌ Chỉ Admin mới có quyền thực hiện thao tác này.</div>';
      return;
    }

    const tabMap = { student:'students', teacher:'teachers', admin:'admins', scores:'scores' };
    const tab = tabMap[sub] || 'students';

    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải...</div>';

    // ✅ Chỉ gọi render() MỘT LẦN duy nhất, tránh double-render gây race condition
    if (CL.Admin?.Users?.render) {
      await CL.Admin.Users.render(pv);
      CL.Admin.Users._auTab(null, tab);
    } else {
      pv.innerHTML = '<div class="tp-empty">⚠️ Module quản lý người dùng chưa được tải.</div>';
    }
  }

  async function _renderStudentScores() {
    const pv = document.getElementById('panel-view');
    if (!pv) return;
    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải điểm...</div>';
    try {
      const history = await CL.API.getHistory?.();
      if (!history?.length) {
        pv.innerHTML = `<div class="pv-empty"><div style="font-size:40px;margin-bottom:12px">📊</div>Bạn chưa có bài nộp nào.</div>`;
        return;
      }
      const avg = (history.reduce((s,r)=>s+(+r.diem||0),0)/history.length).toFixed(1);
      const pass = history.filter(r=>(+r.diem||0)>=5).length;
      pv.innerHTML = `
        <div class="pv-page">
          <div class="pv-page-header">
            <h2>🏆 Điểm của tôi</h2>
            <div class="pv-stats-row">
              <div class="pv-stat"><span class="pv-stat-n">${history.length}</span><span class="pv-stat-l">Bài đã nộp</span></div>
              <div class="pv-stat"><span class="pv-stat-n">${avg}</span><span class="pv-stat-l">Điểm TB</span></div>
              <div class="pv-stat ok"><span class="pv-stat-n">${pass}</span><span class="pv-stat-l">Đạt ≥5</span></div>
            </div>
          </div>
          <div class="pv-table-wrap">
            <table class="au-table">
              <thead><tr><th>Bài tập</th><th>Điểm</th><th>Lần</th><th>Thời gian</th></tr></thead>
              <tbody>
                ${history.slice(0,100).map(r => {
                  const d = +r.diem || 0;
                  const cls = d>=9?'sc-ex':d>=7?'sc-ok':d>=5?'sc-warn':'sc-bad';
                  const ts = r.ts ? new Date(r.ts).toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—';
                  return `<tr>
                    <td style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.tieu_de||''}">${r.tieu_de||r.bai_id||'—'}</td>
                    <td><span class="sc-badge ${cls}">${d.toFixed(1)}</span></td>
                    <td style="text-align:center;color:var(--text3)">${r.lan_thu||1}</td>
                    <td style="font-size:11px;color:var(--text3)">${ts}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
    } catch(e) {
      pv.innerHTML = `<div class="pv-empty">❌ ${e.message}</div>`;
    }
  }

  async function _renderStudentHistory() {
    const pv = document.getElementById('panel-view');
    if (!pv) return;
    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải...</div>';
    try {
      const history = await CL.API.getHistory?.();
      if (!history?.length) {
        pv.innerHTML = `<div class="pv-empty">Chưa có lịch sử làm bài.</div>`;
        return;
      }
      pv.innerHTML = `
        <div class="pv-page">
          <div class="pv-page-header"><h2>📖 Lịch sử làm bài</h2></div>
          <div class="pv-table-wrap">
            <table class="au-table">
              <thead><tr><th>Bài tập</th><th>Loại</th><th>Điểm</th><th>Thời gian</th></tr></thead>
              <tbody>
                ${history.slice(0,200).map(r => {
                  const d = +r.diem || 0;
                  const cls = d>=9?'sc-ex':d>=7?'sc-ok':d>=5?'sc-warn':'sc-bad';
                  const ts = r.ts ? new Date(r.ts).toLocaleString('vi-VN') : '—';
                  const type = r.type==='html'?'🌐 HTML':r.type==='sql'?'🗃 SQL':'🐍 Python';
                  return `<tr>
                    <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.tieu_de||r.bai_id||'—'}</td>
                    <td style="font-size:11px">${type}</td>
                    <td><span class="sc-badge ${cls}">${d.toFixed(1)}</span></td>
                    <td style="font-size:11px;color:var(--text3)">${ts}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
    } catch(e) {
      pv.innerHTML = `<div class="pv-empty">❌ ${e.message}</div>`;
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  SIDEBAR CONTROLS
  // ══════════════════════════════════════════════════════════════

  function togglePin() {
    _pinned = !_pinned;
    localStorage.setItem('cl_sb_pinned', _pinned ? '1' : '0');
    const sb = document.getElementById('sidebar');
    sb?.classList.toggle('pinned', _pinned);
    document.getElementById('app-shell')?.classList.toggle('sb-pinned', _pinned);
    const icon = document.getElementById('sb-pin')?.querySelector('.sb-pin-icon');
    if (icon) icon.textContent = _pinned ? '◀' : '▶';
  }

  function openMobile() {
    document.getElementById('sidebar')?.classList.add('mobile-open');
    document.getElementById('sb-overlay')?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    document.getElementById('sidebar')?.classList.remove('mobile-open');
    document.getElementById('sb-overlay')?.classList.remove('show');
    document.body.style.overflow = '';
  }

  return { init, navigate, toggleGroup, togglePin, openMobile, closeMobile };
});
