# Hướng dẫn Bảo mật Triển khai CodeLab

## Mô hình 2 nhánh (quan trọng nhất)

```
GitHub Repo (⚠️ PHẢI là PRIVATE)
│
├── main          ← Source đầy đủ, chỉ bạn thấy
└── gh-pages      ← dist/ đã build, học sinh thấy
```

## Thiết lập

### Bước 1 — Tạo Private Repo
- GitHub → New repository → **☑ Private**
- Upload source code lên nhánh `main`

### Bước 2 — GitHub Actions tự động deploy
Workflow `.github/workflows/deploy.yml` chạy tự động khi push.
Nó build `dist/` và đẩy lên `gh-pages`.

### Bước 3 — GitHub Pages từ gh-pages
Settings → Pages → Branch: **gh-pages**

### Mỗi khi cập nhật
```bash
git push origin main   # GitHub Actions tự build + deploy
```

## Các lớp bảo vệ

| # | Kỹ thuật | Hiệu quả |
|---|----------|----------|
| 1 | **Private repo** (quan trọng nhất) | ⭐⭐⭐⭐⭐ |
| 2 | Minification + bundling | ⭐⭐⭐ |
| 3 | Anti-DevTools overlay | ⭐⭐ |
| 4 | Disable F12/Ctrl+U shortcuts | ⭐⭐ |
| 5 | Logic nghiệp vụ trong Code.gs | ⭐⭐⭐⭐ |

> 💡 Code quan trọng (auth, scoring, API keys) đã nằm trong
> **Google Apps Script** — học sinh không thể đọc được.
