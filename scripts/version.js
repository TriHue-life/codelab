#!/usr/bin/env node
/**
 * scripts/version.js — CodeLab Version Manager
 * ═══════════════════════════════════════════════════════════════
 * Tự động tăng phiên bản và ghi changelog.
 *
 * Cách dùng:
 *   node scripts/version.js patch  "Sửa lỗi dropdown bị khoá"
 *   node scripts/version.js minor  "Thêm sidebar Canvas LMS"
 *   node scripts/version.js major  "Đại tu giao diện"
 *   node scripts/version.js info   "Xem phiên bản hiện tại"
 *
 * Loại bump:
 *   patch  →  4.0.0 → 4.0.1  (sửa lỗi nhỏ)
 *   minor  →  4.0.0 → 4.1.0  (tính năng mới)
 *   major  →  4.0.0 → 5.0.0  (thay đổi lớn)
 *
 * Sau khi chạy:
 *   - js/core/config.js  ← cập nhật APP_VERSION
 *   - CHANGELOG.md       ← thêm mục mới
 *   - changelog.json     ← database JSON (sync lên Sheets)
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT         = path.resolve(__dirname, '..');
const CONFIG_FILE  = path.join(ROOT, 'js/core/config.js');
const CHANGELOG_MD = path.join(ROOT, 'CHANGELOG.md');
const CHANGELOG_DB = path.join(ROOT, 'scripts/changelog.json');

// ── Parse args ─────────────────────────────────────────────────
const [,, bumpType = 'patch', ...descWords] = process.argv;
const description = descWords.join(' ');

if (bumpType === 'info') {
  const ver = _readVersion();
  console.log(`\n📦 Phiên bản hiện tại: v${ver}\n`);
  _printChangelog(3);
  process.exit(0);
}

if (!['patch','minor','major'].includes(bumpType)) {
  console.error(`\n❌ Loại bump không hợp lệ: "${bumpType}"`);
  console.error('   Dùng: patch | minor | major | info\n');
  process.exit(1);
}

if (!description) {
  console.error('\n❌ Thiếu mô tả thay đổi!');
  console.error('   Ví dụ: node scripts/version.js patch "Sửa lỗi dropdown"\n');
  process.exit(1);
}

// ── Main ────────────────────────────────────────────────────────
const oldVersion = _readVersion();
const newVersion = _bumpVersion(oldVersion, bumpType);
const timestamp  = new Date().toISOString();
const dateStr    = new Date().toLocaleDateString('vi-VN', {
  day: '2-digit', month: '2-digit', year: 'numeric',
  hour: '2-digit', minute: '2-digit'
});

console.log(`\n🚀 CodeLab Version Bump`);
console.log(`   ${oldVersion} → ${newVersion}  (${bumpType})`);
console.log(`   📝 ${description}\n`);

// 1. Update config.js
_updateConfig(newVersion);
console.log(`✅ config.js → APP_VERSION: '${newVersion}'`);

// 2. Update CHANGELOG.md
_updateChangelog(newVersion, bumpType, description, dateStr);
console.log(`✅ CHANGELOG.md → thêm v${newVersion}`);

// 3. Update changelog.json (database)
const entry = _updateChangelogDB(newVersion, oldVersion, bumpType, description, timestamp);
console.log(`✅ changelog.json → ${CHANGELOG_DB}`);

// 4. Print next steps
console.log(`
📋 Tiếp theo:
   git add .
   git commit -m "chore: bump version to v${newVersion} — ${description}"
   git push

   → Chạy 'node scripts/version.js sync' để đẩy changelog lên Google Sheets
`);

// ── Helpers ─────────────────────────────────────────────────────

function _readVersion() {
  const content = fs.readFileSync(CONFIG_FILE, 'utf8');
  const match   = content.match(/APP_VERSION\s*:\s*'([^']+)'/);
  return match ? match[1] : '4.0.0';
}

function _bumpVersion(version, type) {
  const parts = version.split('.').map(Number);
  if (parts.length < 3) parts.push(0, 0);
  if (type === 'major') { parts[0]++; parts[1] = 0; parts[2] = 0; }
  if (type === 'minor') { parts[1]++; parts[2] = 0; }
  if (type === 'patch') { parts[2]++; }
  return parts.join('.');
}

function _updateConfig(newVer) {
  let content = fs.readFileSync(CONFIG_FILE, 'utf8');
  content = content.replace(
    /APP_VERSION\s*:\s*'[^']+'/,
    `APP_VERSION: '${newVer}'`
  );
  fs.writeFileSync(CONFIG_FILE, content, 'utf8');
}

function _updateChangelog(ver, type, desc, dateStr) {
  const badge = type === 'major' ? '🔴 Major' :
                type === 'minor' ? '🟡 Minor' : '🟢 Patch';
  
  const entry = `## v${ver} — ${dateStr} [${badge}]\n\n- ${desc}\n\n---\n\n`;

  let existing = '';
  if (fs.existsSync(CHANGELOG_MD)) {
    existing = fs.readFileSync(CHANGELOG_MD, 'utf8');
    // Remove header if exists to re-prepend
    existing = existing.replace(/^# CHANGELOG.*?\n\n/, '');
  }

  const header = `# CHANGELOG — CodeLab\n\nLịch sử thay đổi phiên bản. Mới nhất ở trên.\n\n---\n\n`;
  fs.writeFileSync(CHANGELOG_MD, header + entry + existing, 'utf8');
}

function _updateChangelogDB(ver, oldVer, type, desc, ts) {
  let db = [];
  if (fs.existsSync(CHANGELOG_DB)) {
    try { db = JSON.parse(fs.readFileSync(CHANGELOG_DB, 'utf8')); } catch {}
  }

  const entry = {
    id:          `v${ver}`,
    version:     ver,
    prev_version: oldVer,
    type,
    description: desc,
    timestamp:   ts,
    synced:      false,
  };

  db.unshift(entry); // newest first
  fs.writeFileSync(CHANGELOG_DB, JSON.stringify(db, null, 2), 'utf8');
  return entry;
}

function _printChangelog(n) {
  if (!fs.existsSync(CHANGELOG_DB)) { console.log('  Chưa có lịch sử thay đổi.'); return; }
  const db = JSON.parse(fs.readFileSync(CHANGELOG_DB, 'utf8'));
  const items = db.slice(0, n);
  console.log(`📜 ${items.length} thay đổi gần nhất:`);
  items.forEach(e => {
    const icon = e.type === 'major' ? '🔴' : e.type === 'minor' ? '🟡' : '🟢';
    const date = new Date(e.timestamp).toLocaleDateString('vi-VN');
    console.log(`   ${icon} v${e.version} (${date}) — ${e.description}`);
  });
}
