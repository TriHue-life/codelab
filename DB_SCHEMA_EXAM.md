# 📊 DB Schema — Kỳ kiểm tra & Lớp học

## Thay đổi bổ sung vào Google Sheets backend

### 1. Sheet `03_KiemTra` — Tab `DanhSach` (cập nhật)

| Cột mới | Kiểu | Mô tả |
|---------|------|-------|
| `lop_ids` | JSON Array | `["10A1","10A2"]` — thay thế trường `lop` (text) |
| `ngay_bat_dau` | Date | Ngày mở thi (thay `ngay_thi`) |
| `ngay_ket_thuc` | Date | Ngày đóng thi |
| `gio_mo` | Time | Giờ mở thi mỗi ngày, VD `"07:00"` |
| `gio_dong` | Time | Giờ đóng thi mỗi ngày, VD `"17:00"` |
| `bat_buoc_fullscreen` | Boolean | Bắt buộc toàn màn hình |
| `so_lan_thi_max` | Number | Số lần làm bài tối đa (0 = không giới hạn) |

### 2. Sheet `06_LopHoc` (MỚI)

Lưu danh sách lớp chính thức để teacher chọn khi tạo kỳ thi.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `lop` | Text PK | Mã lớp, VD `"10A1"` |
| `ten_day_du` | Text | Tên đầy đủ, VD `"Lớp 10A1 — Tin học"` |
| `giao_vien_chu_nhiem` | Text | Tên giáo viên |
| `si_so` | Number | Sĩ số kế hoạch |
| `khoi` | Number | Khối: 10, 11, 12 |
| `nam_hoc` | Text | Năm học, VD `"2024-2025"` |
| `active` | Boolean | Lớp đang hoạt động |

### 3. Sheet `03_KiemTra` — Tab `PhanCong` (MỚI)

Cho phép mỗi lớp có lịch riêng trong cùng 1 kỳ thi.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `exam_id` | Text FK | ID kỳ kiểm tra |
| `lop` | Text FK | Mã lớp |
| `ngay_thi_rieng` | Date | Ngày thi riêng cho lớp (nếu khác mặc định) |
| `gio_mo_rieng` | Time | Giờ mở riêng cho lớp |
| `gio_dong_rieng` | Time | Giờ đóng riêng cho lớp |
| `ghi_chu` | Text | Ghi chú thêm |

### 4. Logic kết nối Exam ↔ Student

```
Exam.lop_ids = ["10A1", "10A2"]
              ↓
Student.lop ∈ lop_ids  →  học sinh được phép vào thi
              ↓
getActiveExamForClass(student.lop)  →  trả về kỳ thi đang mở
```

### 5. Cập nhật `getActiveExamForClass` (api.js)

```js
// Hỗ trợ cả lop (string cũ) và lop_ids (array mới)
async function getActiveExamForClass(lop) {
  const exams = await getExams();
  return exams.find(e => {
    if (e.trang_thai !== 'active') return false;
    // Backward compat: no lop = mở cho tất cả
    if (!e.lop && !e.lop_ids?.length) return true;
    // New: array of class ids
    const ids = e.lop_ids?.length ? e.lop_ids
               : (e.lop||'').split(',').map(s=>s.trim()).filter(Boolean);
    return ids.length === 0 || ids.includes(lop);
  }) || null;
}
```

---

## Cập nhật v2 — Question Groups model

### Trường mới trong `exam` object

```json
{
  "groups": [
    {
      "id":           "grp_abc123",
      "name":         "Nhóm 1 — Nhận biết & Hiểu",
      "pick_count":   2,
      "points_each":  2.0,
      "thu_tu":       1,
      "question_ids": ["k10-b1-01", "k10-b2-01", "k10-b2-03"]
    },
    {
      "id":           "grp_def456",
      "name":         "Nhóm 2 — Áp dụng & Phân tích",
      "pick_count":   3,
      "points_each":  2.67,
      "thu_tu":       2,
      "question_ids": ["k10-b3-01", "k10-b3-02", "k10-b4-01", "k10-b4-02", "k10-b3-03"]
    }
  ]
}
```

### Công thức điểm

```
Điểm cuối = Σ(điểm_câu_i × weight_i) / Σ(weight_i)

Ví dụ:
  Nhóm 1: 2 câu, 2đ/câu → HS làm được 1 câu 8/10 và 1 câu 6/10
    → đóng góp: (8×2 + 6×2) = 28 điểm_trọng_số
  Nhóm 2: 3 câu, 2.67đ/câu → HS làm được 7, 9, 5 /10
    → đóng góp: (7+9+5) × 2.67 = 55.9

  Tổng weight = 2×2 + 3×2.67 = 4 + 8.01 = 12.01
  Điểm cuối   = (28 + 55.9) / 12.01 = 6.99 ≈ 7.0
```

### Backward compatibility

| Trường | Mô tả |
|--------|-------|
| `bai_tap` | Flat list tất cả question IDs (luôn có, để code cũ đọc được) |
| `bai_tap_detail` | Flat list với group_id, nhom, diem_co_phan |
| `groups` | Mới — array nhóm đầy đủ |
| `so_bai_random` | Giữ = 0 khi dùng groups model |
| `bloom_filter` | Giữ = '' khi dùng groups model |
