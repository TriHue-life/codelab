/**
 * features/sidebar.js — Canvas LMS-style Sidebar Navigation
 * ═══════════════════════════════════════════════════════════════
 * Left sidebar with role-based menus:
 *   Student : Luyện tập | Kiểm tra | Điểm của tôi | Hồ sơ
 *   Teacher : Luyện tập | Điểm lớp | Vi phạm | Lịch sử | Kiểm tra | Thống kê | Bài tập | Cấu hình
 *   Admin   : (teacher items) + Người dùng | Bảng điểm
 */
'use strict';

CL.define('Features.Sidebar', () => {
  const Events = CL.require('Events');

  let _role    = 'student';
  let _active  = 'practice';
  let _pinned  = false;

  // ── Menu config per role ──────────────────────────────────────
  const MENUS = {
    student: [
      { id:'practice',  icon:'✏️',  label:'Luyện tập',    section:'editor' },
      { id:'exam',      icon:'📋',  label:'Kiểm tra',     section:'exam'   },
      { id:'my-scores', icon:'📊',  label:'Điểm của tôi', section:'scores' },
      { id:'profile',   icon:'👤',  label:'Hồ sơ',        section:'profile'},
    ],
    teacher: [
      { id:'practice',    icon:'✏️',  label:'Luyện tập',   section:'editor'     },
      { id:'scores',      icon:'📊',  label:'Điểm lớp',    section:'tp:scores'  },
      { id:'violations',  icon:'🚨',  label:'Vi phạm',     section:'tp:violations'},
      { id:'history',     icon:'📖',  label:'Lịch sử',     section:'tp:history' },
      { id:'exams',       icon:'📋',  label:'Kỳ kiểm tra', section:'tp:exams'   },
      { id:'analytics',   icon:'📈',  label:'Thống kê',    section:'tp:analytics'},
      { id:'exercises',   icon:'📝',  label:'Bài tập',     section:'tp:exercises'},
      { id:'settings',    icon:'⚙️',  label:'Cấu hình',    section:'tp:config'  },
    ],
    admin: [
      { id:'practice',    icon:'✏️',  label:'Luyện tập',   section:'editor'          },
      { id:'users',       icon:'👥',  label:'Người dùng',  section:'tp:users'        },
      { id:'scores',      icon:'📊',  label:'Bảng điểm',   section:'tp:scores'       },
      { id:'violations',  icon:'🚨',  label:'Vi phạm',     section:'tp:violations'   },
      { id:'history',     icon:'📖',  label:'Lịch sử',     section:'tp:history'      },
      { id:'exams',       icon:'📋',  label:'Kỳ kiểm tra', section:'tp:exams'        },
      { id:'analytics',   icon:'📈',  label:'Thống kê',    section:'tp:analytics'    },
      { id:'exercises',   icon:'📝',  label:'Bài tập',     section:'tp:exercises'    },
      { id:'settings',    icon:'⚙️',  label:'Cấu hình',    section:'tp:config'       },
      { id:'changelog',   icon:'📋',  label:'Phiên bản',   section:'tp:changelog'    },
    ],
  };

  // ── Build sidebar DOM ─────────────────────────────────────────
  function init(role) {
    _role = role || 'student';
    _pinned = localStorage.getItem('cl_sb_pinned') === '1';

    const sb = document.getElementById('sidebar');
    if (!sb) return;

    const items = MENUS[_role] || MENUS.student;
    sb.innerHTML = `
      <div class="sb-top">
        <button class="sb-pin-btn" id="sb-pin" title="Ghim/Thu menu"
          onclick="CL.Features.Sidebar.togglePin()">
          <span class="sb-pin-icon">${_pinned ? '◀' : '▶'}</span>
        </button>
      </div>
      <nav class="sb-nav" role="navigation" aria-label="Menu chính">
        ${items.map(it => _itemHtml(it)).join('')}
      </nav>
      <div class="sb-bottom">
        <button class="sb-item sb-logout" onclick="CL.Auth.UI.logout()" title="Đăng xuất">
          <span class="sb-icon">↩</span>
          <span class="sb-label">Đăng xuất</span>
        </button>
      </div>`;

    if (_pinned) sb.classList.add('pinned');
    document.getElementById('app-shell')?.classList.toggle('sb-pinned', _pinned);

    // Mobile overlay close
    document.getElementById('sb-overlay')?.addEventListener('click', closeMobile);

    // Show app-shell (remove auth-pending effect)
    document.getElementById('app-shell')?.style.removeProperty('visibility');

    // Restore last active
    const saved = localStorage.getItem('cl_sb_active') || 'practice';
    navigate(saved, false);

    // Ensure workspace-view is flex by default if showing editor
    const wv = document.getElementById('workspace-view');
    if (wv && wv.style.display === '') wv.style.display = 'flex';
  }

  function _itemHtml(it) {
    return `<button class="sb-item${_active===it.id?' active':''}"
      data-id="${it.id}" data-section="${it.section}"
      onclick="CL.Features.Sidebar.navigate('${it.id}')"
      title="${it.label}">
      <span class="sb-icon">${it.icon}</span>
      <span class="sb-label">${it.label}</span>
    </button>`;
  }

  // ── Navigate to section ───────────────────────────────────────
  function navigate(id, save = true) {
    _active = id;
    if (save) localStorage.setItem('cl_sb_active', id);

    // Update active state
    document.querySelectorAll('.sb-item[data-id]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.id === id);
    });

    const items = MENUS[_role] || MENUS.student;
    const item  = items.find(i => i.id === id);
    if (!item) return;

    const section = item.section;

    // Close mobile sidebar
    closeMobile();

    if (section === 'editor') {
      _showSection('workspace-view');
    } else if (section === 'profile') {
      CL.Features.Profile?.open();
    } else if (section.startsWith('tp:')) {
      const tabId = section.replace('tp:', '');
      _showSection('panel-view');
      _renderPanel(tabId);
    } else if (section === 'scores') {
      _showSection('panel-view');
      _renderStudentScores();
    } else if (section === 'exam') {
      _showSection('workspace-view');
      // exam mode handled by existing system
    }

    // Update breadcrumb
    const bc = document.getElementById('breadcrumb-title');
    if (bc) bc.textContent = item.label;
  }

  function _showSection(which) {
    const wv = document.getElementById('workspace-view');
    const pv = document.getElementById('panel-view');
    const exBar = document.getElementById('tb-ex-bar');
    if (wv) wv.style.display = which === 'workspace-view' ? 'flex' : 'none';
    if (pv) pv.style.display = which === 'panel-view'    ? 'flex' : 'none';
    // Show exercise bar only in practice view
    if (exBar) exBar.style.display = which === 'workspace-view' ? '' : 'none';
  }

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
      users:      () => CL.Admin.Users?.render(pv),
      changelog:  () => CL.Features.Changelog?.render(pv),
    };
    (RENDERERS[tabId] || (() => { pv.innerHTML = '<div class="pv-empty">Chưa có nội dung</div>'; }))();
  }

  async function _renderStudentScores() {
    const pv = document.getElementById('panel-view');
    if (!pv) return;
    pv.innerHTML = '<div class="pv-loading">⏳ Đang tải điểm...</div>';
    try {
      const history = await CL.API.getHistory?.();
      if (!history?.length) {
        pv.innerHTML = `<div class="pv-empty"><div style="font-size:40px;margin-bottom:12px">📊</div><div>Bạn chưa có bài nộp nào.</div></div>`;
        return;
      }
      pv.innerHTML = `
        <div class="pv-header"><h2>📊 Lịch sử điểm của tôi</h2></div>
        <div class="pv-table-wrap">
          <table class="au-table">
            <thead><tr><th>Bài tập</th><th>Điểm</th><th>Lần</th><th>Thời gian</th></tr></thead>
            <tbody>
              ${history.slice(0,100).map(r => {
                const d = +r.diem || 0;
                const cls = d>=9?'sc-ex':d>=7?'sc-ok':d>=5?'sc-warn':'sc-bad';
                const ts = r.ts ? new Date(r.ts).toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—';
                return `<tr>
                  <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.tieu_de||r.bai_id||'—'}</td>
                  <td><span class="sc-badge ${cls}">${d.toFixed(1)}</span></td>
                  <td style="text-align:center;color:var(--text3)">${r.lan_thu||1}</td>
                  <td style="font-size:11px;color:var(--text3)">${ts}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`;
    } catch(e) {
      pv.innerHTML = `<div class="pv-empty">❌ ${e.message}</div>`;
    }
  }

  // ── Pin / collapse sidebar ────────────────────────────────────
  function togglePin() {
    _pinned = !_pinned;
    localStorage.setItem('cl_sb_pinned', _pinned ? '1' : '0');
    const sb = document.getElementById('sidebar');
    sb?.classList.toggle('pinned', _pinned);
    document.getElementById('app-shell')?.classList.toggle('sb-pinned', _pinned);
    const icon = document.getElementById('sb-pin')?.querySelector('.sb-pin-icon');
    if (icon) icon.textContent = _pinned ? '◀' : '▶';
  }

  // ── Mobile toggle ─────────────────────────────────────────────
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

  return { init, navigate, togglePin, openMobile, closeMobile };
});
