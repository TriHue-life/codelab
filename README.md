# 🖥️ CodeLab – Chấm điểm code tự động

Nền tảng chấm điểm tự động cho học sinh THPT.
Hỗ trợ Python (K10–11) · HTML/CSS (K12) · SQL (K11).

**GitHub:** [TriHue-life](https://github.com/TriHue-life) · THPT Thủ Thiêm

---

## 📁 Cấu trúc file

```
codelab/
├── index.html              ← Entry point
├── Code.gs                 ← Google Apps Script backend
├── css/style.css           ← Dark navy theme
└── js/
    ├── api.js              ← Client API layer (cache + queue + retry)
    ├── auth.js             ← Đăng nhập (SHA-256 hash)
    ├── setup-wizard.js     ← Wizard thiết lập lần đầu (5 bước)
    ├── exercises.js        ← 576 bài Python K10+K11
    ├── exercises_k12.js    ← 288 bài HTML/CSS K12
    ├── exercises_sql.js    ← 54 bài SQL K11
    ├── interpreter.js      ← Python runtime (WebAssembly)
    ├── html-editor.js      ← HTML/CSS editor + live preview
    ├── html-grader.js      ← Chấm HTML/CSS
    ├── sql-editor.js       ← SQL editor (sql.js / SQLite WASM)
    ├── sql-grader.js       ← Chấm SQL
    ├── ui.js               ← Editor, syntax highlight
    ├── grader.js           ← Engine chấm Python (rubric + test)
    ├── app.js              ← App init, dropdown chọn bài
    ├── antitab.js          ← Chống gian lận
    └── teacher-panel.js    ← Bảng điều khiển giáo viên
```

---

## 🗂️ Cấu trúc Google Drive

```
📁 CodeLab/
├── 📊 01_TaiKhoan.gsheet    → [GiaoVien]  [HocSinh]
├── 📊 02_BaiTap.gsheet      → [BaiTap]  [LyThuyet]  [CodeMau]  [TieuChi]  [HuongDan]
├── 📊 03_KiemTra.gsheet     → [DanhSach]  [BaiTapKT]
├── 📊 04_KetQua.gsheet      → [BangDiem]  [LichSuLam]
└── 📊 05_NhatKy.gsheet      → [TruyCap]  [ViPham]
```

---

## 📚 Ngân hàng bài tập (918 bài)

| Loại | Bộ sách | Lớp | Số bài |
|------|---------|-----|--------|
| 🐍 Python | KNTT | K10 (Bài 17–32) | 306 |
| 🐍 Python | KNTT | K11 (Bài 17–31) | 270 |
| 🌐 HTML/CSS | CTST | K12 (F1–F9) | 108 |
| 🌐 HTML/CSS | KNTT | K12 (Bài 7–18) | 180 |
| 🗃️ SQL | KNTT | K11 (Bài 10,13,14) | 54 |
| **Tổng** | | | **918** |

Mỗi chủ đề: **6 mức Bloom × 3 bài = 18 bài**

---

## 🔐 Bảo mật & Hiệu suất 200+ users

| Vấn đề | Giải pháp |
|--------|-----------|
| API Key lộ client | Không có key ở client — tất cả qua Apps Script |
| Token bị steal | Server-side ScriptProperties, TTL 8h |
| 200 users đồng thời | Rate limit 200 req/min, write queue + retry |
| Log spam | Batch 50 items, flush mỗi 5 giây |
| Cache stale | SWR: trả ngay + refresh nền |
| Token rác | Trigger dailyCleanup 2AM |

---

## 🚀 Thiết lập lần đầu

### Bước 1 — Tạo 1 Google Sheet
```
sheets.google.com → Tạo bảng tính mới → "CodeLab_Script"
→ Extensions → Apps Script → dán Code.gs → Ctrl+S
```

### Bước 2 — Deploy Web App
```
Deploy → New deployment → Web app
→ Execute as: Me  ·  Who has access: Anyone
→ Deploy → Copy URL
```

### Bước 3 — Mở app → Setup Wizard tự động
Wizard 5 bước tự động tạo toàn bộ `📁 CodeLab/` trong Drive.

---

## 👨‍🏫 Teacher Panel (nhấn ⚙️ trên header)

| Tab | Chức năng |
|-----|-----------|
| 📊 Điểm | Bảng điểm toàn lớp, lọc, xuất CSV |
| 🚨 Vi phạm | Danh sách vi phạm, HS bị khóa |
| 📖 Lịch sử | Tất cả lần làm bài |
| 📋 Kiểm tra | Tạo/sửa/xóa/mở/đóng kỳ kiểm tra |
| ✏️ Bài tập | Sửa lý thuyết, code mẫu, tiêu chí, hướng dẫn lỗi |
| ⚙️ Cấu hình | Apps Script URL, setup, sync bài tập |

---

## 📝 Changelog

| Version | Thay đổi |
|---------|----------|
| v4.0 — CodeLab | Đổi tên, 918 bài, SQL editor, Setup Wizard |
| v3.0 | K12 HTML/CSS, Teacher Panel v2, auto-setup |
| v2.0 | 576 bài Python, rubric, multi-file |
| v1.0 | Python interpreter offline |
