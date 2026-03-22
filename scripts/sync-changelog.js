#!/usr/bin/env node
/**
 * scripts/sync-changelog.js — Sync changelog lên Google Sheets
 * ═══════════════════════════════════════════════════════════════
 * Đọc changelog.json → gửi các entry chưa sync lên Apps Script
 *
 * Cách dùng:
 *   node scripts/sync-changelog.js
 *
 * Yêu cầu: CODELAB_SCRIPT_URL trong file .env hoặc environment
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

const fs     = require('fs');
const https  = require('https');
const path   = require('path');

const ROOT         = path.resolve(__dirname, '..');
const CHANGELOG_DB = path.join(ROOT, 'scripts/changelog.json');
const ENV_FILE     = path.join(ROOT, '.env');

// ── Load env ────────────────────────────────────────────────────
let scriptUrl = process.env.CODELAB_SCRIPT_URL || '';
if (!scriptUrl && fs.existsSync(ENV_FILE)) {
  const env = fs.readFileSync(ENV_FILE, 'utf8');
  const m   = env.match(/CODELAB_SCRIPT_URL=(.+)/);
  if (m) scriptUrl = m[1].trim();
}

if (!scriptUrl) {
  console.error('\n❌ Chưa có CODELAB_SCRIPT_URL!');
  console.error('   Tạo file .env với nội dung:');
  console.error('   CODELAB_SCRIPT_URL=https://script.google.com/macros/s/.../exec\n');
  process.exit(1);
}

// ── Load changelog ──────────────────────────────────────────────
if (!fs.existsSync(CHANGELOG_DB)) {
  console.log('\n⚠️  Chưa có changelog.json. Chạy version.js trước.\n');
  process.exit(0);
}

const db      = JSON.parse(fs.readFileSync(CHANGELOG_DB, 'utf8'));
const pending = db.filter(e => !e.synced);

if (!pending.length) {
  console.log('\n✅ Không có thay đổi mới cần sync.\n');
  process.exit(0);
}

console.log(`\n📡 Sync ${pending.length} changelog entries lên Google Sheets...\n`);

// ── POST to Apps Script ─────────────────────────────────────────
const payload = JSON.stringify({
  action:   'syncChangelog',
  entries:  pending,
});

const url = new URL(scriptUrl);
const options = {
  hostname: url.hostname,
  path:     url.pathname + url.search,
  method:   'POST',
  headers:  { 'Content-Length': Buffer.byteLength(payload) },
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      if (data.ok && data.data?.synced) {
        // Mark as synced
        pending.forEach(e => { const found = db.find(d => d.id === e.id); if (found) found.synced = true; });
        fs.writeFileSync(CHANGELOG_DB, JSON.stringify(db, null, 2), 'utf8');
        console.log(`✅ Đã sync ${data.data.synced} entries lên Google Sheets!`);
        console.log(`   Xem tại: 05_NhatKy.gsheet → tab [Changelog]\n`);
      } else {
        console.error('❌ Server trả về lỗi:', data.error || body);
      }
    } catch {
      console.error('❌ Parse lỗi:', body.slice(0, 200));
    }
  });
});

req.on('error', err => console.error('❌ Kết nối lỗi:', err.message));
req.write(payload);
req.end();
