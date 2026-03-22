// exercises_k12.js — Bài tập HTML/CSS Lớp 12
// K12 CTST: 6 chủ đề F1,F2,F3,F7,F8,F9 — Chân trời sáng tạo
// K12 KNTT: 12 chủ đề Bài 7-18 — Kết nối tri thức
// Mỗi chủ đề: 6 mức Bloom × 3 bài = 18 bài
// Loại bài: type="html" → dùng HTML/CSS editor

const EXERCISES_K12 = [
  {
    "id": "k12-ctst-f1-b1-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Nhận biết DOCTYPE và cấu trúc HTML",
    "desc": "<b>Đề bài:</b> Viết trang HTML đầy đủ: DOCTYPE, html[lang=\"vi\"], head (meta charset, title), body (h1, p). Quan sát cấu trúc trong preview.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "DOCTYPE html",
        "kw": "DOCTYPE",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "lang=\"vi\"",
        "kw": "lang=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "meta charset UTF-8",
        "kw": "charset",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "h1 và p trong body",
        "kw": "&lt;h1",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b1-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Điền thẻ còn thiếu",
    "desc": "<b>Đề bài:</b> Điền đúng thẻ vào cấu trúc: &lt;___&gt; → html, head, body. Thêm title \"Trang của tôi\" và h1 \"Xin chào\".<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "html tag",
        "kw": "&lt;html",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "head tag",
        "kw": "&lt;head",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "body tag",
        "kw": "&lt;body",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "title và h1",
        "kw": "&lt;title",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b1-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Nhận biết thẻ tiêu đề h1-h3",
    "desc": "<b>Đề bài:</b> Tạo trang với 3 cấp tiêu đề: h1 \"Trường THPT Thủ Thiêm\", h2 \"Giới thiệu\", h3 \"Lịch sử hình thành\". Quan sát kích thước font trong preview.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "h1",
        "kw": "&lt;h1",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "h2",
        "kw": "&lt;h2",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "h3",
        "kw": "&lt;h3",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b2-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Giải thích DOCTYPE và charset",
    "desc": "<b>Đề bài:</b> Viết trang tiếng Việt có dấu. Thêm comment giải thích vai trò của DOCTYPE và meta charset=\"UTF-8\". Demo: bỏ charset xem lỗi.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "DOCTYPE comment",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "charset UTF-8",
        "kw": "charset=\"UTF-8\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Tiếng Việt có dấu",
        "kw": "ế",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b2-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "Phân biệt head và body",
    "desc": "<b>Đề bài:</b> Trang demo: head chứa title, meta, style; body chứa h1, p, img. Thêm comment /* HEAD */ và /* BODY */ giải thích từng vùng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Comment HEAD",
        "kw": "&lt;!-- HEAD",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment BODY",
        "kw": "&lt;!-- BODY",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "meta trong head",
        "kw": "&lt;meta",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Nội dung trong body",
        "kw": "&lt;h1",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b2-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "Hiểu semantic HTML5",
    "desc": "<b>Đề bài:</b> Viết lại trang dùng semantic tags: header, nav, main, article, aside, footer thay vì dùng div. Giải thích ý nghĩa từng tag bằng comment.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "header",
        "kw": "&lt;header",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "main",
        "kw": "&lt;main",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "article",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footer",
        "kw": "&lt;footer",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment giải thích",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b3-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Trang giới thiệu bản thân",
    "desc": "<b>Đề bài:</b> Tạo trang giới thiệu bản thân: h1 (họ tên), h2 (thông tin cá nhân), 3 đoạn p (lớp, sở thích, ước mơ), hr phân cách, p footer.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "h1 họ tên",
        "kw": "&lt;h1",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "h2 thông tin",
        "kw": "&lt;h2",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 đoạn p",
        "kw": "&lt;p",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "hr phân cách",
        "kw": "&lt;hr",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f1-b3-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Trang thông báo sự kiện",
    "desc": "<b>Đề bài:</b> Tạo trang thông báo \"Hội thao Tin học 2025\": h1 tên sự kiện, h2 thời gian/địa điểm, đoạn mô tả, hr, liên hệ.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "h1 sự kiện",
        "kw": "&lt;h1",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "h2 chi tiết",
        "kw": "&lt;h2",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "p mô tả",
        "kw": "&lt;p",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hr và liên hệ",
        "kw": "&lt;hr",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f1-b3-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Trang lớp học",
    "desc": "<b>Đề bài:</b> Trang web lớp 12: header tên lớp+GVCN, 3 mục h2 (TKB, Thông báo, Liên hệ), br và hr hợp lý, footer năm học.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "3 mục h2",
        "kw": "&lt;h2",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "br hợp lý",
        "kw": "&lt;br",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hr phân cách mục",
        "kw": "&lt;hr",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "DOCTYPE đầy đủ",
        "kw": "DOCTYPE",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f1-b4-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug trang HTML lỗi",
    "desc": "<b>Đề bài:</b> Code sau có 3 lỗi HTML. Tìm, giải thích và sửa:\n<pre>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;&lt;title&gt;Trang lỗi&lt;title&gt;&lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề&lt;/H1&gt;\n    &lt;p&gt;Đoạn chưa đóng\n  &lt;/body&gt;\n&lt;/html&gt;</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Sửa title thiếu /",
        "kw": "&lt;/title&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Sửa H1 thường",
        "kw": "&lt;/h1&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Sửa p chưa đóng",
        "kw": "&lt;/p&gt;",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b4-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Cải thiện với Semantic HTML5",
    "desc": "<b>Đề bài:</b> Viết lại trang chỉ dùng div sang semantic HTML5 (header, main, article, footer). Giải thích lợi ích SEO và accessibility.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "header thay div",
        "kw": "&lt;header",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "main thay div",
        "kw": "&lt;main",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "footer thay div",
        "kw": "&lt;footer",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b4-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Tối ưu meta tags cho SEO",
    "desc": "<b>Đề bài:</b> Thêm đầy đủ meta tags: description, viewport, og:title, og:image. Giải thích vai trò từng tag.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "meta description",
        "kw": "description",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "meta viewport",
        "kw": "viewport",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "og:title",
        "kw": "og:title",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f1-b5-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "So sánh HTML4 vs HTML5",
    "desc": "<b>Đề bài:</b> Demo 5 cải tiến HTML5: semantic tags, input types mới, video native, placeholder, required validation. Kết luận ưu điểm.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Semantic HTML5",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Input type mới",
        "kw": "type=\"date\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Video native",
        "kw": "&lt;video",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Required",
        "kw": "required",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment ưu điểm",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f1-b5-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Đánh giá Accessibility",
    "desc": "<b>Đề bài:</b> Cải thiện trang đạt WCAG 2.1: thêm alt cho ảnh, aria-label cho link, role, lang cho html. Giải thích từng cải thiện.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "alt text",
        "kw": "alt=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "aria-label",
        "kw": "aria-label",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "lang=\"vi\"",
        "kw": "lang=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "role attribute",
        "kw": "role=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f1-b5-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Chọn cấu trúc tốt nhất",
    "desc": "<b>Đề bài:</b> So sánh 2 cấu trúc: (1) div-only, (2) semantic HTML5 cho cùng trang blog. Kết luận cách nào tốt hơn về SEO, accessibility.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Cách 1 div",
        "kw": "&lt;div",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Cách 2 semantic",
        "kw": "&lt;article",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment kết luận",
        "kw": "&lt;!-- semantic",
        "pts": 5,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f1-b6-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Trang cá nhân đầy đủ",
    "desc": "<b>Đề bài:</b> Thiết kế trang cá nhân với semantic HTML5: header (tên+nav), main (giới thiệu+kỹ năng list+ảnh), aside (links), footer. Tự do sáng tạo nội dung.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "header + nav",
        "kw": "&lt;nav",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "main với content",
        "kw": "&lt;main",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "aside links",
        "kw": "&lt;aside",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footer",
        "kw": "&lt;footer",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ul kỹ năng",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f1-b6-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Trang tin tức lớp",
    "desc": "<b>Đề bài:</b> Trang tin tức với 3 article: tiêu đề h2, time (ngày), p tóm tắt, link \"Đọc thêm\". Có aside tags. Semantic hoàn chỉnh.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "3 article",
        "kw": "&lt;article",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "time element",
        "kw": "&lt;time",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "aside tags",
        "kw": "&lt;aside",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Link đọc thêm",
        "kw": "href=",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f1-b6-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F1: HTML và trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Landing page sự kiện",
    "desc": "<b>Đề bài:</b> Landing page \"Hội thi Lập trình Web K12 2025\": hero (h1+slogan), 3 features (section), form đăng ký, footer. Semantic HTML5 đầy đủ.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc trang HTML chuẩn</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;meta name=\"viewport\" content=\"width=device-width\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Tiêu đề chính&lt;/h1&gt;\n    &lt;p&gt;Đoạn văn&lt;/p&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Thẻ cơ bản:</b> h1–h6, p, br, hr, !-- --",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Hero section",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 features",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Form đăng ký",
        "kw": "&lt;form",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Footer đầy đủ",
        "kw": "&lt;footer",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b1-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Nhận biết thẻ định dạng",
    "desc": "<b>Đề bài:</b> Demo 6 kiểu định dạng: in đậm (b/strong), nghiêng (i/em), gạch chân (u), tô nổi (mark), chỉ số trên (x²), chỉ số dưới (H₂O).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "b hoặc strong",
        "kw": "&lt;strong",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "i hoặc em",
        "kw": "&lt;i",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "u",
        "kw": "&lt;u",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "mark",
        "kw": "&lt;mark",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "sup",
        "kw": "&lt;sup",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "sub",
        "kw": "&lt;sub",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b1-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Nhận biết danh sách ul/ol",
    "desc": "<b>Đề bài:</b> Tạo 2 danh sách: (1) 5 môn học yêu thích (ul), (2) 5 bước cài Python (ol). Preview hiện ● và 1.2.3.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "ul 5 li",
        "kw": "&lt;ul",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "ol 5 li",
        "kw": "&lt;ol",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "li đúng",
        "kw": "&lt;li",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b1-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Nhận biết link và ảnh",
    "desc": "<b>Đề bài:</b> Trang với: (1) link Google mở tab mới, (2) ảnh placeholder 300×200 có alt, (3) ảnh là link. Preview hiển thị đúng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "target=\"_blank\"",
        "kw": "target=\"_blank\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "img src alt",
        "kw": "&lt;img",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Ảnh trong link",
        "kw": "&lt;a href",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b2-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Phân biệt b vs strong",
    "desc": "<b>Đề bài:</b> Demo cả &lt;b&gt; và &lt;strong&gt; với comment giải thích: b là visual, strong là semantic. Screen reader đọc strong khác b.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Demo b",
        "kw": "&lt;b&gt;",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo strong",
        "kw": "&lt;strong&gt;",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment semantic",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Em vs i tương tự",
        "kw": "&lt;em",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b2-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "Hiểu 4 loại href",
    "desc": "<b>Đề bài:</b> Demo 4 loại href: https:// (web), mailto:, tel:, #anchor. Giải thích từng loại bằng comment.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "https link",
        "kw": "https://",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "mailto",
        "kw": "mailto:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "tel",
        "kw": "tel:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "anchor href",
        "kw": "href=\"#",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b2-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "Phân tích figure figcaption",
    "desc": "<b>Đề bài:</b> 4 ảnh gallery dùng figure+figcaption. Giải thích tại sao figure tốt hơn img+p cho accessibility.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "figure",
        "kw": "&lt;figure",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "figcaption",
        "kw": "&lt;figcaption",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "4 ảnh",
        "kw": "&lt;img",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment giải thích",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b3-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Bài văn có định dạng",
    "desc": "<b>Đề bài:</b> Viết bài văn ngắn với: h1 tiêu đề, 3 đoạn p, strong từ khóa, em trích dẫn, link tham khảo, ul/ol ý chính.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "h1 tiêu đề",
        "kw": "&lt;h1",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "strong từ khóa",
        "kw": "&lt;strong",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "em trích dẫn",
        "kw": "&lt;em",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "link tham khảo",
        "kw": "href=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Danh sách",
        "kw": "&lt;ul",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b3-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Portfolio gallery ảnh",
    "desc": "<b>Đề bài:</b> 6 ảnh placeholder (via.placeholder.com/200) theo chủ đề, mỗi ảnh có figure+figcaption, caption ghi tên và năm.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "6 ảnh",
        "kw": "&lt;img",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "figure",
        "kw": "&lt;figure",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "figcaption",
        "kw": "&lt;figcaption",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Alt text",
        "kw": "alt=",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b3-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Menu nhà hàng",
    "desc": "<b>Đề bài:</b> Menu nhà hàng: h1 tên, h2 (Khai vị/Chính/Tráng miệng), ol/ul từng mục 3 món có giá, link \"Đặt bàn\".<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "3 mục h2",
        "kw": "&lt;h2",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Danh sách món",
        "kw": "&lt;li",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Giá dùng strong",
        "kw": "&lt;strong",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Link đặt bàn",
        "kw": "href=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b4-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug HTML lồng thẻ sai",
    "desc": "<b>Đề bài:</b> <b>Sửa 3 lỗi:</b>\n<pre>&lt;p&gt;&lt;b&gt;đậm &lt;i&gt;đậm nghiêng&lt;/b&gt;&lt;/i&gt;&lt;/p&gt;\n&lt;ul&gt;Mục 1&lt;ul&gt;\n&lt;img src=\"a.jpg\" alt=Ảnh đẹp&gt;</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Sửa lồng b/i",
        "kw": "&lt;/i&gt;&lt;/b&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "li trong ul",
        "kw": "&lt;li",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "alt cần nháy",
        "kw": "alt=\"",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b4-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Tối ưu danh sách lồng nhau",
    "desc": "<b>Đề bài:</b> Danh sách lồng cho chương trình Tin học 12: Chủ đề (ol) → Bài (ul) → Mục tiêu (li). 2 chủ đề, 3 bài mỗi chủ đề.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "ol lồng ul",
        "kw": "&lt;ul&gt;\n",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "ul con đúng cấp",
        "kw": "  &lt;li",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Link nội bộ",
        "kw": "href=\"#",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b4-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Cải thiện accessibility link",
    "desc": "<b>Đề bài:</b> Cải thiện 5 link \"click here\" thành anchor text có nghĩa. Thêm aria-label cho link icon. rel=\"noopener\" cho external.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Anchor text có nghĩa",
        "kw": "Tìm hiểu",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "aria-label",
        "kw": "aria-label",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "noopener",
        "kw": "noopener",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f2-b5-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "So sánh ul, ol, dl",
    "desc": "<b>Đề bài:</b> Demo 3 loại danh sách: ul, ol, dl (definition list). Kết luận khi nào dùng mỗi loại trong comment.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "ul demo",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ol demo",
        "kw": "&lt;ol",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "dl dt dd",
        "kw": "&lt;dl",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment khi nào dùng",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b5-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Đánh giá inline vs block",
    "desc": "<b>Đề bài:</b> So sánh span (inline) và div (block). Demo bố cục khác nhau. Khi nào dùng span, khi nào dùng div?<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "span inline",
        "kw": "&lt;span",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "div block",
        "kw": "&lt;div",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment giải thích",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b5-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Chọn thẻ semantic đúng",
    "desc": "<b>Đề bài:</b> Chọn thẻ đúng cho: ngày đăng (time), tác giả (address), trích dẫn (blockquote), code (code/pre). Giải thích.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "time cho ngày",
        "kw": "&lt;time",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "blockquote",
        "kw": "&lt;blockquote",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "code/pre",
        "kw": "&lt;code",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "address",
        "kw": "&lt;address",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b6-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Blog cá nhân đầy đủ",
    "desc": "<b>Đề bài:</b> 3 bài blog: mỗi bài có article, h2 tiêu đề, time ngày, address tác giả, p nội dung, ul tags, ảnh. Semantic HTML5.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "3 article",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "time+address",
        "kw": "&lt;time",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Tags ul",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Ảnh figure",
        "kw": "&lt;figure",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Semantic nav",
        "kw": "&lt;nav",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b6-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Trang chủ trường học",
    "desc": "<b>Đề bài:</b> Trang THPT Thủ Thiêm: header (logo+nav), hero section, 3 tin tức (article), liên kết nhanh (aside), footer. Đầy đủ semantic.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "header nav",
        "kw": "&lt;nav",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hero section",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 article tin",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "aside liên kết",
        "kw": "&lt;aside",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footer",
        "kw": "&lt;footer",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f2-b6-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F2: Thẻ HTML định dạng văn bản",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Product page e-commerce",
    "desc": "<b>Đề bài:</b> Trang sản phẩm: h1 tên SP, gallery ảnh (figure), giá (strong), đánh giá ★ (span), bảng thông số, form \"Thêm giỏ hàng\".<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Định dạng văn bản</b>\n<pre class=\"ex-code\">&lt;b&gt;In đậm&lt;/b&gt;  &lt;strong&gt;Quan trọng&lt;/strong&gt;\n&lt;i&gt;Nghiêng&lt;/i&gt; &lt;em&gt;Nhấn mạnh&lt;/em&gt;\n&lt;u&gt;Gạch chân&lt;/u&gt; &lt;mark&gt;Tô nổi&lt;/mark&gt;\n&lt;sup&gt;chỉ số trên&lt;/sup&gt; &lt;sub&gt;chỉ số dưới&lt;/sub&gt;</pre>\n<b>Danh sách và liên kết:</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;a href=\"url\" target=\"_blank\"&gt;Liên kết&lt;/a&gt;\n&lt;img src=\"url\" alt=\"mô tả\" width=\"300\"&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "h1 tên SP",
        "kw": "&lt;h1",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Gallery figure",
        "kw": "&lt;figure",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Bảng thông số",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Form đặt hàng",
        "kw": "&lt;form",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Rating span",
        "kw": "★",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b1-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Bảng 3×3 đơn giản",
    "desc": "<b>Đề bài:</b> Bảng HTML 3×3: hàng đầu th tiêu đề, 2 hàng td dữ liệu. Nội dung: bảng điểm 3 môn của 2 HS. Thêm border=\"1\".<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "table",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "thead th",
        "kw": "&lt;th",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "tbody td",
        "kw": "&lt;td",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "border",
        "kw": "border=",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b1-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Bảng có colspan rowspan",
    "desc": "<b>Đề bài:</b> Bảng thời khóa biểu: \"Thứ 2\" gộp 2 cột (colspan=\"2\"), \"Tin học\" kéo dài 2 hàng (rowspan=\"2\"). Tổng 4 cột 4 hàng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "colspan=\"2\"",
        "kw": "colspan",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "rowspan=\"2\"",
        "kw": "rowspan",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Cấu trúc đúng",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b1-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Nhúng iframe",
    "desc": "<b>Đề bài:</b> Nhúng Google Maps (iframe) vị trí THPT Thủ Thiêm. width=\"100%\", height=\"400\", title=\"Bản đồ\". Thêm p caption bên dưới.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "iframe src",
        "kw": "&lt;iframe",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "width=\"100%\"",
        "kw": "width=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "height=\"400\"",
        "kw": "height=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "title",
        "kw": "title=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b2-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "thead tbody tfoot",
    "desc": "<b>Đề bài:</b> Bảng điểm học kỳ với thead (tiêu đề), tbody (dữ liệu 5 HS), tfoot (điểm TB). Comment giải thích vai trò từng phần.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "thead",
        "kw": "&lt;thead",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "tbody",
        "kw": "&lt;tbody",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "tfoot TB",
        "kw": "&lt;tfoot",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b2-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "border-collapse qua CSS",
    "desc": "<b>Đề bài:</b> Demo bảng CÓ và KHÔNG CÓ border-collapse: collapse bằng CSS inline. Thấy sự khác biệt đường viền đôi/đơn.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Bảng không collapse",
        "kw": "border=\"1\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Bảng có collapse",
        "kw": "border-collapse: collapse",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "2 bảng để so sánh",
        "kw": "&lt;table",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b2-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "caption vs h2",
    "desc": "<b>Đề bài:</b> Demo tiêu đề bảng bằng &lt;caption&gt; (trong bảng) và &lt;h2&gt; (ngoài bảng). Giải thích khi nào dùng mỗi loại.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "caption trong bảng",
        "kw": "&lt;caption",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "h2 ngoài bảng",
        "kw": "&lt;h2",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment giải thích",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b3-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Thời khóa biểu lớp",
    "desc": "<b>Đề bài:</b> TKB 5 ngày × 5 tiết với: th cho ngày và số tiết, colspan cho giờ giải lao, CSS inline xen kẽ màu.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "5 cột th",
        "kw": "&lt;th",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "5 hàng tiết",
        "kw": "&lt;tr",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "colspan giải lao",
        "kw": "colspan",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "CSS màu xen kẽ",
        "kw": "background",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b3-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Bảng điểm tổng kết",
    "desc": "<b>Đề bài:</b> 5 HS × 5 môn, tfoot tính điểm TB, CSS inline: đỏ cho điểm <5.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "5 HS 5 môn",
        "kw": "&lt;td",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "tfoot điểm TB",
        "kw": "&lt;tfoot",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Màu đỏ <5",
        "kw": "color: red",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b3-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Bảng so sánh sản phẩm",
    "desc": "<b>Đề bài:</b> 3 điện thoại × 6 tiêu chí. Icon ✅/❌. Hàng \"Đề xuất\" dùng colspan. border-collapse: collapse.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "3 cột sản phẩm",
        "kw": "colspan",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "6 tiêu chí",
        "kw": "&lt;th",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Icon ✅ ❌",
        "kw": "✅",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "border-collapse",
        "kw": "collapse",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b4-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug bảng lỗi",
    "desc": "<b>Đề bài:</b> <b>Sửa 3 lỗi:</b>\n<pre>&lt;table&gt;&lt;tr&gt;\n  &lt;th&gt;Tên&lt;th&gt;&lt;th&gt;Điểm&lt;/th&gt;\n&lt;tr&gt;&lt;td&gt;An&lt;/td&gt;\n  &lt;td&gt;8.5&lt;td&gt;&lt;/tr&gt;&lt;/table&gt;</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "th thiếu /",
        "kw": "&lt;/th&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "td chưa đóng",
        "kw": "&lt;/td&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Thêm border",
        "kw": "border=",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b4-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Bảng responsive",
    "desc": "<b>Đề bài:</b> Bọc bảng rộng trong &lt;div style=\"overflow-x:auto\"&gt; để scroll ngang trên mobile. Thêm max-width: 100% cho table.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Div overflow-x",
        "kw": "overflow-x: auto",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "max-width 100%",
        "kw": "max-width: 100%",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Bảng vẫn đúng",
        "kw": "&lt;table",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b4-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Bảng accessible",
    "desc": "<b>Đề bài:</b> Thêm scope=\"col\"/\"row\" cho th, caption mô tả, summary. Giải thích lợi ích cho screen reader.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "scope col",
        "kw": "scope=\"col\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "caption",
        "kw": "&lt;caption",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment accessibility",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f3-b5-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "So sánh table vs flex",
    "desc": "<b>Đề bài:</b> Cùng dữ liệu học sinh: (1) HTML table, (2) div+flexbox. Khi nào dùng table? Khi nào dùng flex?<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Table version",
        "kw": "&lt;table",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Flex version",
        "kw": "display: flex",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment kết luận",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b5-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Đánh giá iframe vs embed",
    "desc": "<b>Đề bài:</b> Demo nhúng YouTube bằng iframe với: allow, allowfullscreen, loading=\"lazy\". Giải thích các thuộc tính bảo mật.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "iframe YouTube",
        "kw": "iframe",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "allow attribute",
        "kw": "allow=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "loading lazy",
        "kw": "loading=\"lazy\"",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b5-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Bảng accessible nâng cao",
    "desc": "<b>Đề bài:</b> Bảng WCAG 2.1: scope, caption, aria-label, zebra striping. Giải thích từng cải thiện.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "scope",
        "kw": "scope=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "caption",
        "kw": "&lt;caption",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "aria-label",
        "kw": "aria-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Zebra CSS",
        "kw": "nth-child",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b6-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Dashboard dữ liệu lớp",
    "desc": "<b>Đề bài:</b> Dashboard 3 bảng: điểm tổng kết, điểm danh, thành tích. Mỗi bảng trong section. Có caption và tfoot.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "3 section bảng",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "tfoot tổng kết",
        "kw": "&lt;tfoot",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "caption từng bảng",
        "kw": "&lt;caption",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "iframe biểu đồ",
        "kw": "&lt;iframe",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b6-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Lịch thi học kỳ",
    "desc": "<b>Đề bài:</b> Bảng lịch thi phức tạp: colspan cho buổi, rowspan cho môn kéo dài, CSS highlight hôm nay, iframe embed map địa điểm thi.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "colspan buổi",
        "kw": "colspan",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "rowspan môn",
        "kw": "rowspan",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "CSS highlight",
        "kw": "background",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "iframe map",
        "kw": "&lt;iframe",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f3-b6-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F3: Bảng và khung HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Hệ thống so sánh laptop",
    "desc": "<b>Đề bài:</b> 4 laptop × 8 tiêu chí. Rating ★☆. Badge \"Best Value\". CSS: hover highlight, fixed header (sticky), responsive overflow.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tạo bảng HTML</b>\n<pre class=\"ex-code\">&lt;table border=\"1\"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n  &lt;tfoot&gt;&lt;tr&gt;&lt;td&gt;Tổng&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan=\"2\", rowspan=\"3\"<br>\n<b>iframe:</b>\n<pre class=\"ex-code\">&lt;iframe src=\"url\" width=\"100%\" height=\"400\" title=\"...\"&gt;&lt;/iframe&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "4 cột laptop",
        "kw": "&lt;th",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Rating sao",
        "kw": "★",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Badge",
        "kw": "&lt;span",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "position sticky",
        "kw": "sticky",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "overflow-x",
        "kw": "overflow-x",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b1-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "3 cách CSS",
    "desc": "<b>Đề bài:</b> Demo 3 cách CSS cho \"Python Grader\": (1) inline blue, (2) internal red, (3) comment external green. Mỗi cách màu khác nhau.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Inline style=",
        "kw": "style=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Internal &lt;style&gt;",
        "kw": "&lt;style&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment external",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b1-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Selector cơ bản",
    "desc": "<b>Đề bài:</b> Viết CSS: p màu xanh, .important màu đỏ, #header nền vàng, a không gạch chân.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Tag selector p",
        "kw": "p {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Class .important",
        "kw": ".important",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "ID #header",
        "kw": "#header",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "a text-decoration",
        "kw": "text-decoration: none",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b1-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Thuộc tính CSS cơ bản",
    "desc": "<b>Đề bài:</b> Áp dụng CSS: h1 màu #2196F3 căn giữa; p line-height 1.6; a màu cam, không gạch chân; .highlight nền vàng in đậm.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "h1 color center",
        "kw": "text-align: center",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "p line-height",
        "kw": "line-height:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "a color decoration",
        "kw": "text-decoration: none",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".highlight mark",
        "kw": "background",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b2-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Cascading ưu tiên",
    "desc": "<b>Đề bài:</b> Demo conflict CSS: p { color: blue }, .red { color: red }, inline red. Dự đoán màu. Giải thích thứ tự ưu tiên.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "3 mức conflict",
        "kw": "color:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Inline wins",
        "kw": "style=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment giải thích",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b2-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "Specificity chi tiết",
    "desc": "<b>Đề bài:</b> Tính điểm specificity: p (0,0,1), .box (0,1,0), #main (1,0,0), p.box (0,1,1). Demo và xác nhận.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "tag 0,0,1",
        "kw": "p {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "class 0,1,0",
        "kw": ".box",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "id 1,0,0",
        "kw": "#main",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "combo p.box",
        "kw": "p.box",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b2-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "margin vs padding",
    "desc": "<b>Đề bài:</b> Demo box model: div viền đỏ, padding vàng, margin xanh. Thay đổi từng giá trị xem sự khác biệt.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "border",
        "kw": "border:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "padding",
        "kw": "padding:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "margin",
        "kw": "margin:",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b3-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "CSS trang cá nhân",
    "desc": "<b>Đề bài:</b> CSS internal cho trang cá nhân: body font Arial nền #f5f5f5; h1 màu #2196F3 căn giữa; p line-height 1.6; a màu cam no-underline; .highlight nền vàng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "body CSS",
        "kw": "body {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "h1 màu căn giữa",
        "kw": "text-align: center",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "p line-height",
        "kw": "line-height:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "a hover",
        "kw": "a {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".highlight",
        "kw": ".highlight",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b3-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Card component",
    "desc": "<b>Đề bài:</b> 3 card học sinh: div.card nền trắng, border-radius 8px, padding 16px, box-shadow. Hover: nền nhạt.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "3 div.card",
        "kw": ".card {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "border-radius",
        "kw": "border-radius:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "box-shadow",
        "kw": "box-shadow:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "hover",
        "kw": ":hover {",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b3-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Navigation bar",
    "desc": "<b>Đề bài:</b> Thanh nav ngang: ul list-style none display flex, li a nền #333 màu trắng padding, hover nền #4CAF50.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "ul flex nav",
        "kw": "display: flex",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "li a display block",
        "kw": "display: block",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hover",
        "kw": "a:hover {",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ".active",
        "kw": "a.active",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b4-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug CSS lỗi",
    "desc": "<b>Đề bài:</b> <b>Sửa 4 lỗi:</b>\n<pre>p { colour: blue; font-size 18px }\n.box { background-color: #ggg; }\nh1 { text-align centre; }</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "colour→color",
        "kw": "color:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Thiếu ; ",
        "kw": "font-size: 18px;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "#ggg không hợp lệ",
        "kw": "background-color: #",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "centre→center",
        "kw": "text-align: center",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b4-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Phân tích CSS conflict",
    "desc": "<b>Đề bài:</b> Tại sao h1 không đổi màu? Sửa:\n<pre>&lt;style&gt;h1 { color: blue; }&lt;/style&gt;\n&lt;h1 id=\"t\" style=\"color:red\"&gt;...&lt;/h1&gt;</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Inline cao hơn",
        "kw": "&lt;!-- inline",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "!important",
        "kw": "!important",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Hoặc bỏ inline",
        "kw": "loại style=",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b4-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Tối ưu CSS trùng",
    "desc": "<b>Đề bài:</b> Refactor 3 card giống nhau thành 1 class, dùng CSS variables:\n<pre>.c1,.c2,.c3 { bg:#fff; p:16px; r:8px; }</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "1 class .card",
        "kw": ".card {",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "CSS variable",
        "kw": "--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Shorthand",
        "kw": "padding: 16px",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f7-b5-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "So sánh Internal vs External",
    "desc": "<b>Đề bài:</b> Demo trang: internal CSS (1 trang) vs external (giả lập 2 trang dùng chung style). Ưu nhược điểm mỗi loại.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Internal &lt;style&gt;",
        "kw": "&lt;style&gt;",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "External link",
        "kw": "&lt;link",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment ưu nhược",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Consistent theme",
        "kw": "consistent",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b5-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Đánh giá BEM naming",
    "desc": "<b>Đề bài:</b> Demo 3 cách đặt tên: random, BEM (.block__element--modifier), utility. Kết luận cách dễ bảo trì.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "BEM naming",
        "kw": "__",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Utility classes",
        "kw": ".mb-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment ưu nhược",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Kết luận",
        "kw": "kết luận",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b5-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "CSS Reset",
    "desc": "<b>Đề bài:</b> Demo và so sánh: * { margin:0; padding:0 } vs Normalize approach. Demo trước/sau reset.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Reset *",
        "kw": "* {",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "box-sizing",
        "kw": "box-sizing:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo before after",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b6-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Mini CSS Framework",
    "desc": "<b>Đề bài:</b> Xây \"mini framework\": typography (h1-h6), utilities (.text-center, .mt-16, .flex), card, button với hover. Demo trang áp dụng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Typography",
        "kw": "h1, h2",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Utilities",
        "kw": ".text-center",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Card .card",
        "kw": ".card",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Button",
        "kw": "button {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo trang",
        "kw": "&lt;div class=",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b6-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "CSS Theme Switching",
    "desc": "<b>Đề bài:</b> Light/Dark mode dùng CSS variables: :root { --bg: white } .dark { --bg: #1a1a2e }. JS inline toggle classList.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Variables :root",
        "kw": "--bg:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ".dark override",
        "kw": ".dark {",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "JS toggle",
        "kw": "classList.toggle",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f7-b6-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F7: Giới thiệu CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Website hoàn chỉnh",
    "desc": "<b>Đề bài:</b> Website câu lạc bộ Tin học: header+nav, hero, 3 card thành viên, gallery, form liên hệ, footer. CSS đầy đủ.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>3 cách thêm CSS</b>\n<pre class=\"ex-code\">&lt;!-- 1. Inline --&gt;\n&lt;p style=\"color: red; font-size: 18px;\"&gt;...&lt;/p&gt;\n&lt;!-- 2. Internal --&gt;\n&lt;style&gt;\n  p { color: red; }\n&lt;/style&gt;\n&lt;!-- 3. External --&gt;\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Selector cơ bản:</b>\n<pre class=\"ex-code\">p       { color: blue; }   /* tag */\n.class  { color: green; }  /* class */\n#id     { color: red; }    /* id */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Header nav CSS",
        "kw": "nav {",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Hero background",
        "kw": "background",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 card flex",
        "kw": "display: flex",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Form CSS",
        "kw": "input {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Footer",
        "kw": "footer {",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Responsive cơ bản",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b1-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "4 cách biểu diễn màu",
    "desc": "<b>Đề bài:</b> Demo 4 cách màu đỏ: tên màu, hex, rgb, hsl. Thêm màu nền gradient cơ bản.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "color name",
        "kw": "color: red",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hex",
        "kw": "#FF0000",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "rgb()",
        "kw": "rgb(",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "gradient",
        "kw": "gradient",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b1-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Font chữ đầy đủ",
    "desc": "<b>Đề bài:</b> Đoạn văn với đầy đủ font properties: family (Google Fonts Roboto), size 16px, weight bold, style italic. Thêm text-decoration, text-align.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "font-family",
        "kw": "font-family:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "font-size",
        "kw": "font-size:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Google Fonts",
        "kw": "@import",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "text-align",
        "kw": "text-align:",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b1-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Box Model demo",
    "desc": "<b>Đề bài:</b> 3 div cùng kích thước 200×100px: div1 không padding/margin; div2 padding 20px; div3 margin 20px. Border màu khác nhau.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Content area",
        "kw": "width: 200px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "padding:",
        "kw": "padding: 20px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "margin:",
        "kw": "margin: 20px",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "border màu khác",
        "kw": "border:",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b2-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Đơn vị CSS",
    "desc": "<b>Đề bài:</b> Demo 5 đơn vị: px, em, rem, %, vw/vh. Mỗi loại 1 phần tử. Resize cửa sổ xem responsive.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "px",
        "kw": "px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "em",
        "kw": "em",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "rem",
        "kw": "rem",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "%",
        "kw": "%",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "vw/vh",
        "kw": "vw",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b2-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "opacity vs rgba",
    "desc": "<b>Đề bài:</b> Demo: opacity: 0.5 (ảnh hưởng cả text con) vs rgba(0,0,0,0.5) (chỉ màu nền). 2 card xanh 50% transparency.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "opacity",
        "kw": "opacity:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "rgba",
        "kw": "rgba(",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Demo khác biệt",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b2-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "display block/inline/flex",
    "desc": "<b>Đề bài:</b> Demo 3 chế độ: block (div), inline (span), inline-block (button). Quan sát kích thước và sắp xếp.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "block",
        "kw": "display: block",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "inline",
        "kw": "display: inline",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "inline-block",
        "kw": "inline-block",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b3-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Trang tin tức CSS",
    "desc": "<b>Đề bài:</b> CSS đầy đủ: Google Fonts, gradient header, article box-shadow hover, typography line-height letter-spacing, footer tối màu.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Google Fonts",
        "kw": "fonts.googleapis",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Gradient",
        "kw": "linear-gradient",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "box-shadow hover",
        "kw": "box-shadow",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Typography",
        "kw": "line-height",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Footer tối",
        "kw": "footer {",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b3-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Form đẹp",
    "desc": "<b>Đề bài:</b> CSS form liên hệ: input:focus border xanh, button gradient hover, label in đậm, placeholder nhạt, .error border đỏ.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "input:focus",
        "kw": ":focus {",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Button gradient",
        "kw": "gradient",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "::placeholder",
        "kw": "::placeholder",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".error",
        "kw": ".error {",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b3-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Responsive typography",
    "desc": "<b>Đề bài:</b> Typography responsive dùng clamp(): tiêu đề tự co giãn, nội dung em, max-width 65ch cho đoạn văn.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "clamp()",
        "kw": "clamp(",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "em",
        "kw": "em",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "max-width 65ch",
        "kw": "65ch",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "line-height",
        "kw": "1.6",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b4-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug CSS màu sai",
    "desc": "<b>Đề bài:</b> <b>Sửa 4 lỗi:</b>\n<pre>p { color: #GGHHII; }\nh1 { background: rbg(255,0,0); }\ndiv { opacity: 150%; }\nspan { font-size: bold; }</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "hex sai",
        "kw": "#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "rbg→rgb",
        "kw": "rgb(",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "opacity 0-1",
        "kw": "opacity: 1",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "font-size cần px",
        "kw": "font-size: 16px",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b4-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Shorthand vs longhand",
    "desc": "<b>Đề bài:</b> So sánh: margin-top/right/bottom/left riêng vs shorthand margin. font-size+family vs font shorthand. Code ngắn hơn bao nhiêu?<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Longhand",
        "kw": "margin-top:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Shorthand",
        "kw": "margin:",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Comment so sánh",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b4-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Dark Mode CSS",
    "desc": "<b>Đề bài:</b> Dark mode dùng @media prefers-color-scheme: dark + CSS variables. Đảm bảo contrast ratio đủ.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "CSS variables",
        "kw": "--bg-color:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "prefers-color-scheme",
        "kw": "prefers-color-scheme: dark",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Variables dark",
        "kw": "--bg-color: #",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f8-b5-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "Animation: transition vs keyframes",
    "desc": "<b>Đề bài:</b> Demo nút: (1) hover transition (màu+scale 0.3s), (2) animation nhấp nháy. Khi nào dùng cái nào?<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "transition",
        "kw": "transition:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "@keyframes",
        "kw": "@keyframes",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Comment khi nào",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b5-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "CSS performance",
    "desc": "<b>Đề bài:</b> Demo: animate width (bad, paint) vs transform+opacity (good, GPU). Thêm will-change.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Bad width",
        "kw": "width:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Good transform",
        "kw": "transform:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "will-change",
        "kw": "will-change:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment GPU",
        "kw": "/* GPU",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b5-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Approach định kiểu",
    "desc": "<b>Đề bài:</b> 20 button khác màu: so sánh (1) inline style mỗi cái, (2) 20 class, (3) CSS custom properties. Demo 5 button đại diện.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Inline approach",
        "kw": "style=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Class approach",
        "kw": ".btn-primary",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Variables --",
        "kw": "--btn-color",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Kết luận",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b6-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Mini UI Kit",
    "desc": "<b>Đề bài:</b> UI Kit: 4 loại button, 3 loại card, 2 badge, 1 toast notification, 1 modal CSS-only. Hover/active states đầy đủ.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Buttons",
        "kw": ".btn-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Cards",
        "kw": ".card-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Badge",
        "kw": ".badge",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Toast",
        "kw": ".toast",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Modal",
        "kw": ".modal",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b6-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Animation landing page",
    "desc": "<b>Đề bài:</b> Landing page: (1) hero parallax (background-attachment: fixed), (2) card slide-in (@keyframes), (3) button pulsing.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Parallax",
        "kw": "background-attachment: fixed",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Slide keyframes",
        "kw": "@keyframes slideIn",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Pulse",
        "kw": "@keyframes pulse",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f8-b6-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F8: Thuộc tính CSS cơ bản",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "CSS Art",
    "desc": "<b>Đề bài:</b> Vẽ hình sao 5 cánh hoặc trái tim CHỈ BẰNG CSS (không ảnh, không unicode). Dùng transform, clip-path hoặc CSS shapes.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc và font</b>\n<pre class=\"ex-code\">color: red;                  /* tên màu */\ncolor: #FF0000;              /* hex */\ncolor: rgb(255, 0, 0);       /* rgb */\nbackground-color: #f0f0f0;\nfont-family: Arial, sans-serif;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;</pre>\n<b>Box Model:</b>\n<pre class=\"ex-code\">margin: 10px;   /* lề ngoài */\npadding: 10px;  /* đệm trong */\nborder: 1px solid black;\nborder-radius: 8px;\nbox-shadow: 3px 3px 5px gray;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "clip-path hoặc transform",
        "kw": "clip-path",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Hình nhận ra được",
        "kw": "width:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment kỹ thuật",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b1-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "5 loại selector",
    "desc": "<b>Đề bài:</b> Demo 5 selector: tag (p), class (.box), id (#hero), attribute ([type]), universal (*). Mỗi loại màu khác nhau.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "tag",
        "kw": "p {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "class",
        "kw": ".box",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "id",
        "kw": "#hero",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "[type]",
        "kw": "[type",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "* universal",
        "kw": "* {",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b1-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Pseudo-class",
    "desc": "<b>Đề bài:</b> Demo 4 pseudo-class cho danh sách: :first-child, :last-child, :nth-child(odd), :hover.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": ":first-child",
        "kw": ":first-child",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ":last-child",
        "kw": ":last-child",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "nth-child odd",
        "kw": "nth-child(odd)",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ":hover",
        "kw": ":hover",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b1-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Pseudo-element",
    "desc": "<b>Đề bài:</b> Demo ::before (icon trước heading), ::after (dấu chấm sau li), ::first-line (dòng đầu in đậm).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "::before",
        "kw": "::before",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "::after",
        "kw": "::after",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "::first-line",
        "kw": "::first-line",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b2-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "4 combinator",
    "desc": "<b>Đề bài:</b> Demo descendant (div p), child (div>p), adjacent (h1+p), sibling (h1~p). Giải thích sự khác biệt.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "div p",
        "kw": "div p",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "div > p",
        "kw": "div > p",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "h1 + p",
        "kw": "h1 + p",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "h1 ~ p",
        "kw": "h1 ~ p",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b2-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": ":is() và :not()",
    "desc": "<b>Đề bài:</b> Demo :is(h1,h2,h3) màu xanh; li:not(:last-child) border-bottom; input:not([type=\"submit\"]) border xanh.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": ":is() group",
        "kw": ":is(",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": ":not() exclude",
        "kw": ":not(",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo thực tế",
        "kw": "&lt;ul",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b2-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "Selector specificity",
    "desc": "<b>Đề bài:</b> Demo: h1 vs .title vs #hero-title vs inline. Tính điểm và xác nhận bằng preview.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "h1 tag",
        "kw": "h1 {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".title class",
        "kw": ".title",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "#hero id",
        "kw": "#hero",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Inline wins",
        "kw": "style=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b3-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Navigation dropdown",
    "desc": "<b>Đề bài:</b> Nav menu với dropdown: ul li ngang flex, submenu hiện khi hover (li:hover > ul), combinator > đúng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Nav flex",
        "kw": "display: flex",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hover dropdown",
        "kw": "li:hover >",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Submenu hidden",
        "kw": "display: none",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Show on hover",
        "kw": "display: block",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b3-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Bảng điểm styled",
    "desc": "<b>Đề bài:</b> CSS nâng cao cho bảng: nth-child(even) xen kẽ, hover vàng, td:last-child in đậm.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "nth-child even",
        "kw": "nth-child(even)",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "tr:hover",
        "kw": "tr:hover",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "td:last-child",
        "kw": "td:last-child",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "th scope",
        "kw": "scope=",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b3-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Form validation visual",
    "desc": "<b>Đề bài:</b> CSS pseudo-class form: input:valid nền xanh, :invalid nền đỏ, :required icon *, :focus border nổi.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": ":valid",
        "kw": ":valid",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ":invalid",
        "kw": ":invalid",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ":required",
        "kw": ":required",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ":focus",
        "kw": ":focus",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b4-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug selector không khớp",
    "desc": "<b>Đề bài:</b> <b>Tìm lỗi:</b>\ndiv > p > span { color: red }\n/* HTML: div > p > b > span */\nth-child(2n) không có hàng xanh?<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Lỗi 1: b chen vào",
        "kw": "div p span {",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Lỗi 2: nth-child đúng",
        "kw": "nth-child(even)",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Sửa đúng",
        "kw": "color: red",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b4-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "CSS conflicts",
    "desc": "<b>Đề bài:</b> Sắp xếp CSS theo thứ tự đúng: reset → base → components → utilities → overrides. Tránh !important.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Thứ tự comment",
        "kw": "/* reset */",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "!important explain",
        "kw": "/* Tránh !important */",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Layered CSS",
        "kw": "/* base */",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b4-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Reusable CSS utilities",
    "desc": "<b>Đề bài:</b> Tạo utilities: .text-center, .flex, .mt-16, .bg-primary. Áp dụng vào 3 component khác nhau.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": ".text-center",
        "kw": ".text-center {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".flex",
        "kw": ".flex {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".mt-16",
        "kw": ".mt-16 {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".bg-primary",
        "kw": ".bg-primary {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 components",
        "kw": "&lt;div class=",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-ctst-f9-b5-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "Grid vs Flexbox",
    "desc": "<b>Đề bài:</b> Demo 5 layout: equal cols, card grid, holy grail, navigation, masonry. Grid cho 2D, Flex cho 1D. Comment pros/cons.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Grid 2D",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Flex 1D",
        "kw": "display: flex",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Masonry approach",
        "kw": "grid-template-rows",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment pros/cons",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b5-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Advanced pseudo-element",
    "desc": "<b>Đề bài:</b> 3 hiệu ứng chỉ ::before/::after: (1) custom checkbox, (2) tooltip hover, (3) quote cho blockquote.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Custom checkbox",
        "kw": "::before {",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Tooltip attr()",
        "kw": "content: attr(",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Quote blockquote",
        "kw": "blockquote::before",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b5-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Pseudo-class form",
    "desc": "<b>Đề bài:</b> Form với CSS: :valid/:invalid màu, :focus shadow, :placeholder-shown style, :checked toggle.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": ":valid :invalid",
        "kw": ":valid",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ":placeholder-shown",
        "kw": ":placeholder-shown",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ":checked",
        "kw": ":checked",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b6-1",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "BEM Component Library",
    "desc": "<b>Đề bài:</b> Components theo BEM: .card (block), .card__title/__body/__footer (elements), .card--featured/--disabled (modifiers). 5 card demo.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": ".card block",
        "kw": ".card {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "element __",
        "kw": "__title",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "modifier --",
        "kw": ".card--featured",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "5 card demo",
        "kw": "class=\"card",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b6-2",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "CSS-only Interactive",
    "desc": "<b>Đề bài:</b> Accordion FAQ CHỈ CSS: input:checkbox + label trick. 5 câu hỏi về HTML/CSS.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "input:checked",
        "kw": "input[type=\"checkbox\"]",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Label trigger",
        "kw": "label[for]",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ":checked + show",
        "kw": ":checked + label + .answer",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-ctst-f9-b6-3",
    "g": "K12",
    "bo": "CTST",
    "ch": "F9: Bộ chọn CSS nâng cao",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Website Clone",
    "desc": "<b>Đề bài:</b> Clone giao diện 1 section website nổi tiếng (Google, GitHub, Notion...) chỉ HTML+CSS. Flexbox+Grid+Variables.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Selector nâng cao</b>\n<pre class=\"ex-code\">/* Pseudo-class */\na:hover   { color: orange; }\nli:nth-child(odd) { background: #f5f5f5; }\ninput:focus { border-color: blue; }\n/* Pseudo-element */\np::first-line { font-weight: bold; }\n.btn::before  { content: \"→ \"; }\n/* Combinator */\ndiv > p   /* con trực tiếp */\nh1 + p    /* kế tiếp */\nh1 ~ p    /* anh em chung */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Layout chính",
        "kw": "display: flex",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Typography",
        "kw": "font-family:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Màu đúng",
        "kw": "#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Component chính",
        "kw": "&lt;header",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS Grid đúng chỗ",
        "kw": "grid-template",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Cấu trúc HTML đầy đủ",
    "desc": "<b>Đề bài:</b> Viết trang HTML đầy đủ: DOCTYPE, html[lang=\"vi\"], head (meta charset, title), body (h1, p). Preview hiển thị đúng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "DOCTYPE",
        "kw": "DOCTYPE",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "lang=\"vi\"",
        "kw": "lang=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "charset UTF-8",
        "kw": "charset",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "h1 p trong body",
        "kw": "&lt;h1",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Thẻ đôi và thẻ đơn",
    "desc": "<b>Đề bài:</b> Demo thẻ đôi (p, h1, div, a) và thẻ đơn (br, hr, img, meta). Comment giải thích sự khác biệt.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Thẻ đôi 4 loại",
        "kw": "&lt;p",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Thẻ đơn 4 loại",
        "kw": "&lt;br",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment giải thích",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Cú pháp đúng",
        "kw": "DOCTYPE",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Trang giới thiệu bản thân",
    "desc": "<b>Đề bài:</b> Trang \"Giới thiệu bản thân\": h1 tên, h2 thông tin, ul sở thích, blockquote câu yêu thích.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "h1 tên",
        "kw": "&lt;h1",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "h2 thông tin",
        "kw": "&lt;h2",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ul sở thích",
        "kw": "&lt;ul",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "blockquote",
        "kw": "&lt;blockquote",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Semantic HTML5",
    "desc": "<b>Đề bài:</b> Demo semantic tags HTML5: header, nav, main, article, aside, section, footer. Comment giải thích từng tag.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "header",
        "kw": "&lt;header",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "main article",
        "kw": "&lt;main",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "aside",
        "kw": "&lt;aside",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footer",
        "kw": "&lt;footer",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "Character encoding",
    "desc": "<b>Đề bài:</b> Trang tiếng Việt với meta charset UTF-8. HTML entities cho ký tự đặc biệt: &amp;lt; &amp;gt; &amp;amp; &amp;copy;<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "charset UTF-8",
        "kw": "charset=\"UTF-8\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Entities",
        "kw": "&amp;amp;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Tiếng Việt",
        "kw": "ệ",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "div vs span",
    "desc": "<b>Đề bài:</b> Demo div (block) vs span (inline): màu nền khác nhau thấy rõ display. Giải thích khi nào dùng mỗi cái.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "div block",
        "kw": "&lt;div",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "span inline",
        "kw": "&lt;span",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "CSS background",
        "kw": "background",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Trang THPT Thủ Thiêm",
    "desc": "<b>Đề bài:</b> Trang THPT Thủ Thiêm: header (tên+ảnh logo), nav (4 mục), main (giới thiệu h2+p), footer (địa chỉ).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "header",
        "kw": "&lt;header",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "nav 4 mục",
        "kw": "&lt;nav",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "main h2 p",
        "kw": "&lt;main",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footer",
        "kw": "&lt;footer",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Trang tin tức",
    "desc": "<b>Đề bài:</b> 3 tin tức bằng article: h2, time ngày, p tóm tắt, a đọc thêm. Có aside với tags.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "3 article",
        "kw": "&lt;article",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "time",
        "kw": "&lt;time",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "aside",
        "kw": "&lt;aside",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "a đọc thêm",
        "kw": "href=",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "CV đơn giản",
    "desc": "<b>Đề bài:</b> CV cá nhân: ảnh đại diện, thông tin liên hệ (address), học vấn (table), kỹ năng (dl), liên hệ (a:mailto).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "img avatar",
        "kw": "&lt;img",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "table học vấn",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "dl kỹ năng",
        "kw": "&lt;dl",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "address mailto",
        "kw": "mailto:",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug thẻ sai",
    "desc": "<b>Đề bài:</b> <b>Sửa 3 lỗi:</b>\n<pre>&lt;b&gt;&lt;i&gt;đậm nghiêng&lt;/b&gt;&lt;/i&gt;\n&lt;p&gt;đoạn 1&lt;p&gt;đoạn 2&lt;/p&gt;\n&lt;img src=anh.jpg alt=ảnh&gt;</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Lồng sai b/i",
        "kw": "&lt;/i&gt;&lt;/b&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "p chưa đóng",
        "kw": "&lt;/p&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Thuộc tính nháy",
        "kw": "src=\"",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Heading hierarchy",
    "desc": "<b>Đề bài:</b> Trang với heading đúng thứ tự h1→h2→h3 (không bỏ cấp). Giải thích tại sao không nên skip từ h1 sang h3.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "h1→h2→h3",
        "kw": "&lt;h3",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment SEO",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Ít nhất 1h1, 2h2, 3h3",
        "kw": "&lt;h2",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Meta SEO",
    "desc": "<b>Đề bài:</b> Thêm meta tags SEO: description, viewport, og:title. Giải thích từng tag.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "description",
        "kw": "description",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "viewport",
        "kw": "viewport",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "og:title",
        "kw": "og:title",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b7-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "HTML4 vs HTML5",
    "desc": "<b>Đề bài:</b> Demo 5 cải tiến HTML5: semantic, input mới, video, placeholder, required. Kết luận lợi ích.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Semantic",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Input mới",
        "kw": "type=\"date\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Video",
        "kw": "&lt;video",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Placeholder",
        "kw": "placeholder=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Required",
        "kw": "required",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Accessibility WCAG",
    "desc": "<b>Đề bài:</b> Cải thiện trang: alt cho ảnh, aria-label, role, skip link.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "alt text",
        "kw": "alt=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "aria-label",
        "kw": "aria-label",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "skip link",
        "kw": "#main",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "role",
        "kw": "role=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Semantic vs div layout",
    "desc": "<b>Đề bài:</b> So sánh div-only và semantic HTML5 cho cùng trang blog. Kết luận ưu điểm semantic.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "div layout",
        "kw": "&lt;div",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Semantic layout",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment kết luận",
        "kw": "&lt;!-- semantic",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "CSS basic",
        "kw": "display:",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Mini Blog",
    "desc": "<b>Đề bài:</b> 5 trang liên kết: Trang chủ, Bài 1, Bài 2, Về tôi, Liên hệ. Mỗi trang có header/nav chung. Links hoạt động.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "5 trang",
        "kw": "&lt;html",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Nav links",
        "kw": "href=\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "article",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "header chung",
        "kw": "&lt;header",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footer",
        "kw": "&lt;footer",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Portfolio",
    "desc": "<b>Đề bài:</b> Portfolio \"Web Designer\": hero section, gallery dự án (figure), skills (dl), contact form. Semantic HTML5.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Hero section",
        "kw": "id=\"hero\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Gallery figure",
        "kw": "&lt;figure",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Skills dl",
        "kw": "&lt;dl",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Contact form",
        "kw": "&lt;form",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Layout flex",
        "kw": "display:",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b7-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 7: HTML và cấu trúc trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Pattern Library",
    "desc": "<b>Đề bài:</b> Tài liệu hóa 6 components: button, input, card, badge, alert, modal CSS-only. Mỗi cái có demo + code snippet.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Cấu trúc HTML chuẩn (KNTT)</b>\n<pre class=\"ex-code\">&lt;!DOCTYPE html&gt;\n&lt;html lang=\"vi\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Tiêu đề trang&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Nội dung --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre>\n<b>Phần tử HTML:</b> thẻ mở + nội dung + thẻ đóng<br>\nThẻ đơn: br, hr, img, meta (tự đóng)",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "6 components",
        "kw": "&lt;section",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Code snippet",
        "kw": "&lt;pre&gt;&lt;code",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo sống",
        "kw": "class=\"demo\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS đẹp",
        "kw": "border-radius",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Nav links",
        "kw": "#",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Thẻ định dạng",
    "desc": "<b>Đề bài:</b> Demo: strong, em, mark, sup (x²), sub (H₂O), del (giá cũ), ins (giá mới). Preview rõ sự khác biệt.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "strong",
        "kw": "&lt;strong",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "em",
        "kw": "&lt;em",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "mark",
        "kw": "&lt;mark",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "sup/sub",
        "kw": "&lt;sup",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "del/ins",
        "kw": "&lt;del",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Danh sách 3 loại",
    "desc": "<b>Đề bài:</b> Demo ul (sở thích), ol (bước học), dl (thuật ngữ HTML: 5 từ với định nghĩa).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "ul",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ol",
        "kw": "&lt;ol",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "dl dt dd",
        "kw": "&lt;dl",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "5 định nghĩa",
        "kw": "&lt;dt",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "blockquote và cite",
    "desc": "<b>Đề bài:</b> Bài báo có: blockquote (trích dẫn dài), cite (tên nguồn), code (đoạn code inline), pre (code block).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "blockquote",
        "kw": "&lt;blockquote",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "cite",
        "kw": "&lt;cite",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "code inline",
        "kw": "&lt;code",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "pre block",
        "kw": "&lt;pre",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Giải thích b vs strong",
    "desc": "<b>Đề bài:</b> Demo b và strong. Comment: b là visual formatting, strong là semantic importance. i vs em tương tự.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Demo b",
        "kw": "&lt;b&gt;",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo strong",
        "kw": "&lt;strong&gt;",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment semantic",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "em vs i",
        "kw": "&lt;em",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "figure figcaption",
    "desc": "<b>Đề bài:</b> 4 ảnh dùng figure+figcaption. Giải thích figure tốt hơn img+p: semantic, accessibility, SEO.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "figure",
        "kw": "&lt;figure",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "figcaption",
        "kw": "&lt;figcaption",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "4 ảnh",
        "kw": "&lt;img",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "Heading hierarchy",
    "desc": "<b>Đề bài:</b> Bài viết với h1→h2→h3 đúng cấp. Tại sao không skip cấp? Demo trang có cấu trúc đúng và sai.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Đúng h1 h2 h3",
        "kw": "&lt;h2",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Sai: h1 h3",
        "kw": "&lt;h3",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment SEO",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Cấu trúc đúng",
        "kw": "DOCTYPE",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Wikipedia mini",
    "desc": "<b>Đề bài:</b> Trang Wiki về AI: TOC (anchor links), 5 sections, infobox (table), blockquotes, references (ol).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "TOC anchor",
        "kw": "href=\"#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "5 sections",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Infobox table",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "blockquote",
        "kw": "&lt;blockquote",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "references ol",
        "kw": "&lt;ol",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Recipe page",
    "desc": "<b>Đề bài:</b> Công thức nấu ăn: tên (h1), thời gian (time), nguyên liệu (ul+số lượng), bước (ol), dinh dưỡng (table).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "time",
        "kw": "&lt;time",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ul nguyên liệu",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ol các bước",
        "kw": "&lt;ol",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "table dinh dưỡng",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "h1 tên",
        "kw": "&lt;h1",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Trang sự kiện",
    "desc": "<b>Đề bài:</b> \"Hội thi Lập trình Web 2025\": countdown (time), đăng ký (form), kết quả (table), địa điểm (iframe map).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "time datetime",
        "kw": "datetime=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "form đăng ký",
        "kw": "&lt;form",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "table kết quả",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "iframe map",
        "kw": "&lt;iframe",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "h1 sự kiện",
        "kw": "&lt;h1",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug link và ảnh",
    "desc": "<b>Đề bài:</b> <b>Sửa 4 lỗi:</b>\n<pre>&lt;a href=google.com target=blank&gt;Google&lt;/a&gt;\n&lt;img src=\"a.jpg\"&gt;\n&lt;a href=\"tel: 0901\"&gt;📞&lt;/a&gt;\n&lt;a href=\"#s1&gt;Link&lt;/a&gt;</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "href cần nháy",
        "kw": "href=\"google.com\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "target=\"_blank\"",
        "kw": "target=\"_blank\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "alt cho img",
        "kw": "alt=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "href đóng nháy",
        "kw": "href=\"#s1\"",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Optimize images",
    "desc": "<b>Đề bài:</b> 4 ảnh tối ưu: loading=\"lazy\", width+height đúng, srcset responsive, alt text chính xác.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "loading lazy",
        "kw": "loading=\"lazy\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "width height",
        "kw": "width=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "srcset",
        "kw": "srcset=",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "alt text",
        "kw": "alt=\"",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Long-form article",
    "desc": "<b>Đề bài:</b> Bài báo về AI với TOC, 5 sections, blockquote, ảnh figure, footnotes (sup+a), related (aside).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "TOC links",
        "kw": "href=\"#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "5 sections",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "blockquote",
        "kw": "&lt;blockquote",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footnotes",
        "kw": "&lt;sup",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "aside",
        "kw": "&lt;aside",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b8-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "So sánh text formatting",
    "desc": "<b>Đề bài:</b> So sánh visual tags (b,i,u) và semantic tags (strong,em,ins). Demo và kết luận khi nào dùng loại nào.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "visual b i u",
        "kw": "&lt;b",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "semantic strong em",
        "kw": "&lt;strong",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment khi nào dùng",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Kết luận accessibility",
        "kw": "accessibility",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Đánh giá media types",
    "desc": "<b>Đề bài:</b> Demo 4 loại media: img, video, audio, svg inline. So sánh cách nhúng và khi nào dùng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "img",
        "kw": "&lt;img",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "video",
        "kw": "&lt;video",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "audio",
        "kw": "&lt;audio",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "svg",
        "kw": "&lt;svg",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Chọn list type",
    "desc": "<b>Đề bài:</b> Cho 5 nội dung: chọn ul/ol/dl phù hợp. (1) Hướng dẫn cài, (2) Mua sắm, (3) Menu, (4) Thuật ngữ, (5) Top 10.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "ol hướng dẫn",
        "kw": "&lt;ol",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ul mua sắm",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "dl thuật ngữ",
        "kw": "&lt;dl",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment giải thích",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Long-form article sáng tạo",
    "desc": "<b>Đề bài:</b> Bài viết dài về \"Tương lai ngành Công nghệ thông tin\": TOC, 6 sections, pull quotes, infographic text, footnotes.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "TOC + anchor",
        "kw": "href=\"#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "6 sections",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "blockquote pull",
        "kw": "&lt;blockquote",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footnote sup",
        "kw": "&lt;sup",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Semantic đầy đủ",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Interactive FAQ",
    "desc": "<b>Đề bài:</b> FAQ với accordion CSS-only (input:checked). 10 câu về HTML. Có search input và link #share.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Checkbox trick",
        "kw": "input[type=\"checkbox\"]",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Label for",
        "kw": "&lt;label for=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "10 câu",
        "kw": "&lt;dt",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ":checked + show",
        "kw": ":checked + label + .answer",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b8-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 8: Định dạng văn bản HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Study Guide K12",
    "desc": "<b>Đề bài:</b> Tài liệu ôn tập HTML/CSS K12: index.html (mục lục), 3 trang nội dung, code snippets (pre+code), download link.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Thẻ định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">&lt;h1&gt;–&lt;h6&gt;  Tiêu đề (6 cấp)\n&lt;p&gt;        Đoạn văn\n&lt;strong&gt;   In đậm (semantic)\n&lt;em&gt;       In nghiêng (semantic)\n&lt;mark&gt;     Tô nổi\n&lt;sup&gt;&lt;sub&gt; Chỉ số trên/dưới\n&lt;blockquote&gt; Trích dẫn dài\n&lt;code&gt;&lt;pre&gt; Code/văn bản định dạng sẵn</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Index nav",
        "kw": "&lt;nav",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 trang",
        "kw": "href=\".html\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Code snippets",
        "kw": "&lt;pre&gt;&lt;code",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Download",
        "kw": "download",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "ul ol dl cơ bản",
    "desc": "<b>Đề bài:</b> Demo 3 loại: ul 5 môn học yêu thích, ol 5 bước học lập trình, dl 5 thuật ngữ HTML.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "ul",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ol",
        "kw": "&lt;ol",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "dl dt dd",
        "kw": "&lt;dl",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "5 mục mỗi loại",
        "kw": "&lt;li",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Bảng 4×4",
    "desc": "<b>Đề bài:</b> Bảng điểm 3 học sinh × 3 môn: th tiêu đề, td dữ liệu, tfoot điểm TB.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "th tiêu đề",
        "kw": "&lt;th",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "td dữ liệu",
        "kw": "&lt;td",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "tfoot",
        "kw": "&lt;tfoot",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "border",
        "kw": "border=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "4 loại link",
    "desc": "<b>Đề bài:</b> Demo: link web (https), email (mailto), điện thoại (tel), anchor nội bộ (#). Mỗi link có title.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "https",
        "kw": "https://",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "mailto",
        "kw": "mailto:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "tel",
        "kw": "tel:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "anchor",
        "kw": "href=\"#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "title",
        "kw": "title=",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Danh sách lồng nhau",
    "desc": "<b>Đề bài:</b> Cây mục lục 3 cấp: Phần (ol) → Chương (ul) → Bài (li). 2 phần, 3 chương, 3 bài.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "ol ngoài",
        "kw": "&lt;ol",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ul lồng",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "li con",
        "kw": "  &lt;li",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 cấp lồng",
        "kw": "    &lt;ul",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "colspan rowspan",
    "desc": "<b>Đề bài:</b> Bảng lịch thi học kỳ: \"Buổi sáng\" colspan 3 ngày, \"Sáng/Chiều\" rowspan 2.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "colspan 3",
        "kw": "colspan=\"3\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "rowspan 2",
        "kw": "rowspan=\"2\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Cấu trúc logic",
        "kw": "&lt;table",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "figure figcaption link",
    "desc": "<b>Đề bài:</b> Photo blog: 6 ảnh (figure+figcaption), mỗi ảnh là link xem phóng to. Tags (ul).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "6 figure",
        "kw": "&lt;figure",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "figcaption",
        "kw": "&lt;figcaption",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Link phóng to",
        "kw": "target=\"_blank\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Tags ul",
        "kw": "&lt;ul",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Menu nhà hàng đầy đủ",
    "desc": "<b>Đề bài:</b> Menu: h1 tên nhà hàng, 3 danh mục (ul), giá in đậm, link \"Đặt bàn\" → form. TKB lồng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "3 ul danh mục",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Giá strong",
        "kw": "&lt;strong",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Link đặt bàn",
        "kw": "href=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "TKB table",
        "kw": "&lt;table",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Trang Wikipedia mini",
    "desc": "<b>Đề bài:</b> Wiki về HTML: TOC (anchor), 4 sections, bảng so sánh HTML4 vs HTML5, references (ol).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "TOC",
        "kw": "href=\"#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "4 sections",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Bảng so sánh",
        "kw": "&lt;table",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "References",
        "kw": "&lt;ol",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Resource hub",
    "desc": "<b>Đề bài:</b> Hub học tập: ul links theo danh mục (HTML, CSS, JS), bảng so sánh công cụ, dl thuật ngữ.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "ul links",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Bảng so sánh",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "dl thuật ngữ",
        "kw": "&lt;dl",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Link external",
        "kw": "href=",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug bảng và danh sách",
    "desc": "<b>Đề bài:</b> <b>Sửa 4 lỗi:</b>\n<pre>&lt;ul&gt;&lt;p&gt;Mục 1&lt;/p&gt;&lt;/ul&gt;\n&lt;td colspan=3&gt;tiêu đề&lt;/td&gt;\n&lt;a href=url&gt;link&lt;/a&gt;</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "li không p trong ul",
        "kw": "&lt;li",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "colspan nháy",
        "kw": "colspan=\"3\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "href nháy",
        "kw": "href=\"url\"",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Bảng responsive",
    "desc": "<b>Đề bài:</b> Bảng rộng bọc trong div overflow-x:auto. Sticky header (position:sticky). Mobile-friendly.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "overflow-x auto",
        "kw": "overflow-x: auto",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "position sticky",
        "kw": "position: sticky",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Bảng vẫn đúng",
        "kw": "&lt;table",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Link best practices",
    "desc": "<b>Đề bài:</b> Cải thiện 5 link \"click here\": anchor text có nghĩa, rel=\"noopener noreferrer\" external, aria-label icon.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Anchor text có nghĩa",
        "kw": "Tìm hiểu",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "noopener",
        "kw": "noopener noreferrer",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "aria-label",
        "kw": "aria-label",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b9-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "So sánh navigation styles",
    "desc": "<b>Đề bài:</b> Demo 3 navigation: text links, button links, icon links. Kết luận accessibility.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Text links",
        "kw": "&lt;a href",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Button links",
        "kw": "&lt;button",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "aria-label icon",
        "kw": "aria-label",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment accessibility",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Table vs Flex cho data",
    "desc": "<b>Đề bài:</b> Cùng dữ liệu học sinh: (1) HTML table, (2) div+CSS. Khi nào table tốt hơn?<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Table version",
        "kw": "&lt;table",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Flex version",
        "kw": "display: flex",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment kết luận",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Link rel attributes",
    "desc": "<b>Đề bài:</b> Demo rel attributes: noopener noreferrer, nofollow, prev/next pagination.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "noopener",
        "kw": "noopener noreferrer",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "nofollow",
        "kw": "nofollow",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "pagination",
        "kw": "rel=\"next\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Trang kết quả học tập",
    "desc": "<b>Đề bài:</b> Dashboard học sinh: bảng điểm (table+CSS), lịch sử (timeline với ol), tài nguyên (dl links), thành tích (ul).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Bảng điểm table",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Timeline ol",
        "kw": "&lt;ol",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "dl tài nguyên",
        "kw": "&lt;dl",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ul thành tích",
        "kw": "&lt;ul",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS styling",
        "kw": "border-radius",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Accessible Resource Hub",
    "desc": "<b>Đề bài:</b> Hub tài nguyên accessible: aria-describedby, skip link, keyboard navigation (tabindex), breadcrumb nav.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "aria-describedby",
        "kw": "aria-describedby",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Skip link",
        "kw": "#main",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "tabindex",
        "kw": "tabindex=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Breadcrumb",
        "kw": "aria-label=\"breadcrumb\"",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b9-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 9: Danh sách, bảng và liên kết",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Complete Reference",
    "desc": "<b>Đề bài:</b> Tài liệu tham khảo HTML đầy đủ: tất cả thẻ đã học, bảng so sánh, ví dụ code, index A-Z.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Danh sách và bảng (KNTT)</b>\n<pre class=\"ex-code\">&lt;ul&gt;&lt;li&gt;Không thứ tự&lt;/li&gt;&lt;/ul&gt;\n&lt;ol&gt;&lt;li&gt;Có thứ tự&lt;/li&gt;&lt;/ol&gt;\n&lt;dl&gt;&lt;dt&gt;Thuật ngữ&lt;/dt&gt;&lt;dd&gt;Định nghĩa&lt;/dd&gt;&lt;/dl&gt;\n\n&lt;table&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Tiêu đề&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Dữ liệu&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;\n&lt;/table&gt;</pre>\n<b>Gộp ô:</b> colspan, rowspan<br>\n<b>Liên kết:</b>\n<pre class=\"ex-code\">&lt;a href=\"url\" target=\"_blank\" rel=\"noopener\"&gt;Link&lt;/a&gt;\n&lt;a href=\"mailto:gv@school.edu\"&gt;Email&lt;/a&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Bảng tất cả thẻ",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Code examples",
        "kw": "&lt;pre&gt;&lt;code",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Index A-Z",
        "kw": "&lt;dl",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Navigation trang",
        "kw": "href=\"#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "overflow-x",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Form đăng ký học sinh",
    "desc": "<b>Đề bài:</b> Form đăng ký: tên (text), email, ngày sinh (date), lớp (select), giới tính (radio), môn học (checkbox 5), ảnh (file), submit.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "text email",
        "kw": "type=\"text\"",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "date",
        "kw": "type=\"date\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "select option",
        "kw": "&lt;select",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "radio",
        "kw": "type=\"radio\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "checkbox",
        "kw": "type=\"checkbox\"",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Tất cả input types",
    "desc": "<b>Đề bài:</b> Gallery input types HTML5: text, email, password, number, range, color, date, time, file, hidden. Mỗi cái có label và placeholder.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "10 types",
        "kw": "type=\"range\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Label mỗi cái",
        "kw": "&lt;label",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "placeholder",
        "kw": "placeholder=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "required",
        "kw": "required",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "textarea select optgroup",
    "desc": "<b>Đề bài:</b> Form liên hệ: textarea 5 hàng, select \"Lý do liên hệ\" (optgroup 2 nhóm), button submit.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "textarea rows=5",
        "kw": "rows=\"5\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "select options",
        "kw": "&lt;option",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "optgroup",
        "kw": "&lt;optgroup",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "label",
        "kw": "&lt;label",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Validation HTML5",
    "desc": "<b>Đề bài:</b> Demo validation: required, minlength, maxlength, pattern, min/max. Custom error message qua title.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "required",
        "kw": "required",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "minlength",
        "kw": "minlength=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "pattern",
        "kw": "pattern=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "title error",
        "kw": "title=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "fieldset legend",
    "desc": "<b>Đề bài:</b> Form chia nhóm bằng fieldset: \"Thông tin cá nhân\", \"Thông tin học tập\", \"Tùy chọn\". Giải thích accessibility.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "3 fieldset",
        "kw": "&lt;fieldset",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "legend mỗi nhóm",
        "kw": "&lt;legend",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment accessibility",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "POST vs GET",
    "desc": "<b>Đề bài:</b> 2 form: GET (tìm kiếm), POST (đăng ký). Giải thích tại sao password không dùng GET.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "GET form",
        "kw": "method=\"get\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "POST form",
        "kw": "method=\"post\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment security",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Form đăng ký khóa học",
    "desc": "<b>Đề bài:</b> Form đầy đủ: ảnh đại diện, họ tên, email, SĐT, trình độ (select), kỳ vọng (textarea), đồng ý (checkbox required), submit.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "10+ fields",
        "kw": "&lt;input",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "select trình độ",
        "kw": "&lt;select",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "checkbox required",
        "kw": "required",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "fieldset",
        "kw": "&lt;fieldset",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Form khảo sát",
    "desc": "<b>Đề bài:</b> Khảo sát 10 câu: radio (mức đồng ý), checkbox (chọn nhiều), range slider, text góp ý.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "radio scales",
        "kw": "type=\"radio\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "checkbox multi",
        "kw": "type=\"checkbox\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "range",
        "kw": "type=\"range\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "10 câu",
        "kw": "name=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Form thanh toán",
    "desc": "<b>Đề bài:</b> Form checkout: info cá nhân, địa chỉ, thẻ (pattern 16 số), CVV, total, confirm.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Pattern thẻ",
        "kw": "pattern=\"[0-9]{16}\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "CVV pattern",
        "kw": "pattern=\"[0-9]{3}\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "autocomplete",
        "kw": "autocomplete=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ":valid styling",
        "kw": ":valid {",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug form",
    "desc": "<b>Đề bài:</b> <b>Sửa 3 lỗi:</b>\n<pre>&lt;form&gt;\n  &lt;input type=text name=\"\"&gt;\n  &lt;button&gt;Gửi&lt;/button&gt;\n  &lt;input type=\"email\" require&gt;\n&lt;/form&gt;</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "type cần nháy",
        "kw": "type=\"text\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "name cần giá trị",
        "kw": "name=\"ten\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "require→required",
        "kw": "required",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "button submit",
        "kw": "type=\"submit\"",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "UX form cải thiện",
    "desc": "<b>Đề bài:</b> Cải thiện UX: autocomplete, hint text (aria-describedby), inline error, progress steps.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "autocomplete",
        "kw": "autocomplete=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "aria-describedby",
        "kw": "aria-describedby",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Inline error",
        "kw": ".error",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Progress steps",
        "kw": ".step",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Form accessibility WCAG",
    "desc": "<b>Đề bài:</b> Audit form: label/id pair, role=\"alert\" error, fieldset, aria-required, focus management.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "label for/id",
        "kw": "for=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "role=\"alert\"",
        "kw": "role=\"alert\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "aria-required",
        "kw": "aria-required",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "fieldset",
        "kw": "&lt;fieldset",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b12-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "HTML5 vs CSS validation",
    "desc": "<b>Đề bài:</b> So sánh: HTML5 built-in (required, pattern) vs CSS :valid/:invalid. Ưu nhược điểm.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "HTML5 required",
        "kw": "required",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ":valid :invalid",
        "kw": ":valid {",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment so sánh",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "UX visual feedback",
        "kw": "border-color",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Multi-step form",
    "desc": "<b>Đề bài:</b> Form 3 bước CSS-only (input:checked): Thông tin → Tùy chọn → Xem lại. Progress bar CSS.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "3 fieldsets",
        "kw": "&lt;fieldset",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS navigation",
        "kw": ":checked",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Progress bar",
        "kw": "width: 33%",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Step indicators",
        "kw": ".step",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Accessible form",
    "desc": "<b>Đề bài:</b> Form WCAG 2.1 AA: keyboard navigable, screen reader friendly, high contrast, error recovery.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "tabindex",
        "kw": "tabindex=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "role alert",
        "kw": "role=\"alert\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "High contrast",
        "kw": "--contrast",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Success state",
        "kw": ".success",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Form đặt phòng",
    "desc": "<b>Đề bài:</b> Form đặt phòng: ngày (date min/max), số phòng (number), loại phòng (radio+ảnh), tiện ích (checkbox), thanh toán. CSS chuyên nghiệp.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "date min/max",
        "kw": "min=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Radio ảnh",
        "kw": "type=\"radio\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "checkbox",
        "kw": "type=\"checkbox\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS professional",
        "kw": "border-radius:",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Form Builder demo",
    "desc": "<b>Đề bài:</b> \"Form Builder\" tĩnh: components gallery (inputs, selects, textareas) có thể highlight khi click. Preview area.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "All types",
        "kw": "type=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Click highlight",
        "kw": ":focus + label",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Preview section",
        "kw": "class=\"preview\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Component library",
        "kw": "class=\"form-builder\"",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b12-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 12: Tạo biểu mẫu HTML",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Hệ thống đăng ký hoàn chỉnh",
    "desc": "<b>Đề bài:</b> Đăng ký học sinh đầy đủ: form cá nhân, chọn môn (checkboxes), upload ảnh, review (readonly), confirmation page.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Biểu mẫu HTML (KNTT)</b>\n<pre class=\"ex-code\">&lt;form action=\"#\" method=\"post\"&gt;\n  &lt;label for=\"ten\"&gt;Họ tên:&lt;/label&gt;\n  &lt;input type=\"text\"  id=\"ten\" name=\"ten\"&gt;\n  &lt;input type=\"email\"    name=\"email\"&gt;\n  &lt;input type=\"password\" name=\"pass\"&gt;\n  &lt;input type=\"radio\"  name=\"gioitinh\" value=\"nam\"&gt; Nam\n  &lt;input type=\"checkbox\" name=\"dongY\"&gt; Đồng ý\n  &lt;select name=\"lop\"&gt;\n    &lt;option value=\"12a1\"&gt;12A1&lt;/option&gt;\n  &lt;/select&gt;\n  &lt;textarea name=\"noidung\" rows=\"4\"&gt;&lt;/textarea&gt;\n  &lt;button type=\"submit\"&gt;Gửi&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "5 bước",
        "kw": "fieldset",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Checkboxes",
        "kw": "checked",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "File upload",
        "kw": "type=\"file\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Readonly review",
        "kw": "readonly",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Confirmation",
        "kw": "class=\"confirm\"",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "3 cách CSS demo",
    "desc": "<b>Đề bài:</b> Demo 3 cách CSS: (1) inline blue, (2) internal red, (3) comment external green. Giải thích ưu tiên.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Inline blue",
        "kw": "style=\"color: blue\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Internal red",
        "kw": "color: red",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment external",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Comment ưu tiên",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "5 loại selector",
    "desc": "<b>Đề bài:</b> Demo: tag (p), class (.title), id (#hero), attribute ([type]), combinator (div > p).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "tag",
        "kw": "p {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "class",
        "kw": ".title",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "id",
        "kw": "#hero",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "[type]",
        "kw": "[type",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "div > p",
        "kw": "div > p",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "10 thuộc tính cơ bản",
    "desc": "<b>Đề bài:</b> Áp dụng: color, background-color, font-size, font-weight, text-align, margin, padding, border, width, height.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "color background",
        "kw": "background-color",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "font",
        "kw": "font-size",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "text-align",
        "kw": "text-align",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "spacing",
        "kw": "margin",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "size",
        "kw": "width",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Cascade demo",
    "desc": "<b>Đề bài:</b> Demo conflict: 3 style trên cùng element. Predict và explain: inline > id > class > tag.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "3 conflict",
        "kw": "color:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Predict đúng",
        "kw": "color: ",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment cascade",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "Box model visual",
    "desc": "<b>Đề bài:</b> Div với: border đỏ, padding background vàng, margin outline xanh. 3 màu khác nhau.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "border",
        "kw": "border:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "padding",
        "kw": "padding:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "outline margin",
        "kw": "outline:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "3 màu",
        "kw": "background",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "4 giá trị display",
    "desc": "<b>Đề bài:</b> Demo: block (div), inline (span), inline-block (button), none (hidden). Giải thích từng loại.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "block",
        "kw": "display: block",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "inline",
        "kw": "display: inline",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "inline-block",
        "kw": "inline-block",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "none",
        "kw": "display: none",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Style landing page",
    "desc": "<b>Đề bài:</b> CSS landing page Python Grader: typography đẹp, color scheme nhất quán, spacing, button hover.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Body CSS",
        "kw": "body {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Color scheme",
        "kw": "--primary-color",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Spacing",
        "kw": "margin:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Button hover",
        "kw": ":hover {",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Card grid",
    "desc": "<b>Đề bài:</b> 6 cards bài học: nền trắng, shadow, rounded, hover lift. Flex container 3×2.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "6 cards",
        "kw": ".card {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "box-shadow",
        "kw": "box-shadow",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "hover",
        "kw": "transform: translateY",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "flex container",
        "kw": "display: flex",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Theme trường",
    "desc": "<b>Đề bài:</b> CSS theme THPT Thủ Thiêm: màu xanh trường, Google Fonts, nav bar, hero section.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Color school",
        "kw": "#1a73e8",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Google Fonts",
        "kw": "@import",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Nav",
        "kw": "nav {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Hero",
        "kw": "hero {",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug CSS",
    "desc": "<b>Đề bài:</b> <b>Sửa 4 lỗi:</b>\n<pre>p { colour: blue; }\n.box { backgroud-color: red; }\nh1 { text-align: centre; }\nspan { font-size: bold; }</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "colour→color",
        "kw": "color:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "backgroud→background",
        "kw": "background-color:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "centre→center",
        "kw": "text-align: center",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "font-size px",
        "kw": "font-size: 24px",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Specificity analysis",
    "desc": "<b>Đề bài:</b> Tính specificity: h1, .title, #hero, inline. Predict màu nào thắng. Demo.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "h1 (0,0,1)",
        "kw": "h1 {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "class (0,1,0)",
        "kw": ".title",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "id (1,0,0)",
        "kw": "#hero",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Inline wins",
        "kw": "style=",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "DRY CSS",
    "desc": "<b>Đề bài:</b> Refactor CSS vi phạm DRY: CSS variables, shared classes, utility classes.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "CSS variables",
        "kw": "--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Utility classes",
        "kw": ".flex {",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Base reset",
        "kw": "* { box-sizing",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "DRY improvement",
        "kw": "&lt;!-- DRY",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b13-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "Internal vs External",
    "desc": "<b>Đề bài:</b> Demo internal vs external (link). Ưu nhược điểm. Khi nào dùng external?<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Internal",
        "kw": "&lt;style&gt;",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "External link",
        "kw": "&lt;link",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment ưu nhược",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Consistent",
        "kw": "consistent",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Framework approach",
    "desc": "<b>Đề bài:</b> 3 cách CSS: custom, Bootstrap-style, utility-first. Demo card component theo 3 cách.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Custom CSS",
        "kw": ".card { background",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Bootstrap-like",
        "kw": ".btn-primary {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Utility-first",
        "kw": ".bg-white",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "CSS architecture",
    "desc": "<b>Đề bài:</b> Viết lại CSS blog theo SMACSS: Base, Layout, Module, State, Theme. Comments rõ ràng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Base",
        "kw": "* { margin: 0",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Layout",
        "kw": "#header {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Module",
        "kw": "/* module: card",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "State",
        "kw": "is-active {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Theme",
        "kw": "theme-dark {",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Full CSS từ zero",
    "desc": "<b>Đề bài:</b> Trang tin tức đầy đủ từ zero: reset, typography scale, color palette, grid, components, responsive.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Reset",
        "kw": "* {",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Typography",
        "kw": "clamp(",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Color palette",
        "kw": "--color-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Grid",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Components",
        "kw": ".card {",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "CSS Mastery",
    "desc": "<b>Đề bài:</b> Trang portfolio: parallax scroll (background-attachment), morphing shape (clip-path animation), glassmorphism (backdrop-filter).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Parallax",
        "kw": "background-attachment: fixed",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Morphing",
        "kw": "@keyframes morph",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Glass",
        "kw": "backdrop-filter: blur",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b13-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 13: Giới thiệu CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "CSS Masterpiece tự do",
    "desc": "<b>Đề bài:</b> Sáng tạo tự do — trang web ấn tượng với: CSS variables, responsive, animations, accessibility, clean code.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS – Cascading Style Sheets (KNTT)</b>\n<pre class=\"ex-code\">/* 3 cách thêm CSS */\n/* 1. Inline */\n&lt;p style=\"color: blue\"&gt;...&lt;/p&gt;\n/* 2. Internal trong &lt;head&gt; */\n&lt;style&gt;\n  p { color: blue; }\n&lt;/style&gt;\n/* 3. External .css file */\n&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</pre>\n<b>Độ ưu tiên:</b> inline (1000) &gt; id (100) &gt; class (10) &gt; tag (1)",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Variables",
        "kw": "--",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Animation",
        "kw": "@keyframes",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Accessibility",
        "kw": "aria-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Semantic HTML",
        "kw": "&lt;main",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Font properties",
    "desc": "<b>Đề bài:</b> Đoạn văn với: font-family (Google Fonts Roboto), size 18px, weight 700, style italic. Tiêu đề dùng Playfair Display.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Google Fonts",
        "kw": "fonts.googleapis",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "font-family",
        "kw": "font-family:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "font-size weight",
        "kw": "font-size: 18px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Heading font",
        "kw": "Playfair",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Text properties",
    "desc": "<b>Đề bài:</b> Demo: text-align (4 giá trị), text-decoration, text-transform, letter-spacing, word-spacing.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "text-align 4",
        "kw": "text-align:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "text-decoration",
        "kw": "text-decoration:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "text-transform",
        "kw": "text-transform:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "spacing",
        "kw": "letter-spacing:",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "line-height và text-indent",
    "desc": "<b>Đề bài:</b> Bài viết dài với: line-height 1.6 dễ đọc, text-indent 30px cho đoạn đầu, text-shadow cho tiêu đề.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "line-height",
        "kw": "line-height: 1.6",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "text-indent",
        "kw": "text-indent:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "text-shadow",
        "kw": "text-shadow:",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Font stack",
    "desc": "<b>Đề bài:</b> Font stack ưu tiên: custom → Google Font → web safe → generic. Demo fallback khi font không load.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Font stack",
        "kw": "Arial, sans-serif",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "@import Google",
        "kw": "@import",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "generic sans-serif",
        "kw": "sans-serif",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "em rem px khác nhau",
    "desc": "<b>Đề bài:</b> Demo 3 đơn vị font: px (cố định), em (tương đối cha), rem (tương đối root). Thay root size xem rem ảnh hưởng.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "px cố định",
        "kw": "px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "em relative",
        "kw": "em",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "rem root",
        "kw": "rem",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "HTML root",
        "kw": "font-size: 16px",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "Typographic scale",
    "desc": "<b>Đề bài:</b> Xây dựng type scale: xs→sm→base→lg→xl→2xl. CSS variables. Demo trong bài viết.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Modular scale",
        "kw": "--text-xs:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "1.25 ratio",
        "kw": "clamp(",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Usage",
        "kw": "var(--text-",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo article",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Typography article",
    "desc": "<b>Đề bài:</b> Bài báo: dropcap (::first-letter), pull quote (.pullquote), highlighted mark, footnotes. Google Fonts.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "::first-letter",
        "kw": "::first-letter",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Pull quote",
        "kw": ".pullquote",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "mark style",
        "kw": "mark {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "footnote",
        "kw": ".footnote",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Brand identity",
    "desc": "<b>Đề bài:</b> Brand guide THPT Thủ Thiêm: logo colors (CSS), typography scale, button colors.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "CSS variables",
        "kw": "--primary:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Typography scale",
        "kw": "h1 { font-size: clamp",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Button variants",
        "kw": ".btn-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo demo",
        "kw": "&lt;div class=",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Dark theme typography",
    "desc": "<b>Đề bài:</b> Dark mode: CSS variables + prefers-color-scheme. Contrast ratio đủ WCAG AA.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Variables",
        "kw": "--bg:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "prefers-color-scheme",
        "kw": "prefers-color-scheme",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Contrast",
        "kw": "contrast",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "All themed",
        "kw": "var(--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug font",
    "desc": "<b>Đề bài:</b> <b>Sửa lỗi:</b>\n<pre>p { font-family: Times New Roman; }\nh1 { font-size: 2; }\n.bold { font-weight: very-bold; }</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Quotes trong font",
        "kw": "\"Times New Roman\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Đơn vị size",
        "kw": "2rem",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "font-weight: 700",
        "kw": "700",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Color accessibility",
    "desc": "<b>Đề bài:</b> Fix contrast: #999 trên #f0f0f0 (fail WCAG). Cải thiện đến pass AA (4.5:1). Before/after.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Low contrast",
        "kw": "color: #999",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "High contrast",
        "kw": "color: #333",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "4.5:1 ratio",
        "kw": "4.5:1",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "WCAG",
        "kw": "WCAG",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Font loading optimize",
    "desc": "<b>Đề bài:</b> Tối ưu font: font-display: swap, preconnect hints, subset Vietnamese, FOUT handling.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "font-display",
        "kw": "font-display: swap",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "preconnect",
        "kw": "rel=\"preconnect\"",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "subset vi",
        "kw": "&subset=vietnamese",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b14-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "Typography system",
    "desc": "<b>Đề bài:</b> Type scale modular (1.25): xs/sm/base/lg/xl/2xl. CSS custom properties. Demo bài viết thực.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Scale vars",
        "kw": "--text-xs:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Ratio",
        "kw": "clamp(",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Consistent",
        "kw": "var(--text-",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Color system",
    "desc": "<b>Đề bài:</b> Color system: primary 5 shades, neutral 9 shades, semantic (success/error/warning). CSS variables + demo.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Primary shades",
        "kw": "--primary-100:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Neutral",
        "kw": "--neutral-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Semantic",
        "kw": "--success:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo usage",
        "kw": "background: var(",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Brand cohesive",
    "desc": "<b>Đề bài:</b> Landing page với: custom fonts, consistent colors, micro-typography, reading width, leading.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Fonts",
        "kw": "font-family:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Color vars",
        "kw": "var(--",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "tracking",
        "kw": "letter-spacing:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "max-width 65ch",
        "kw": "65ch",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "leading",
        "kw": "line-height: 1.6",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Style guide interactive",
    "desc": "<b>Đề bài:</b> Style guide: click xem màu HEX/RGB/HSL (::after content attr()), dark/light toggle. CSS-only.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Color swatches",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS properties",
        "kw": "--color-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "::after attr",
        "kw": "::after { content: attr(",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Toggle",
        "kw": "prefers-color-scheme",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Typography playground",
    "desc": "<b>Đề bài:</b> Demo font effects: gradient text, letter reveal animation, animated underline, morphing.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Gradient text",
        "kw": "background-clip: text",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "@keyframes",
        "kw": "@keyframes",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "letter-spacing anim",
        "kw": "letter-spacing:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Creative",
        "kw": "font-size: clamp",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b14-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 14: Định dạng văn bản bằng CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Complete typography demo",
    "desc": "<b>Đề bài:</b> Trang demo typography hoàn chỉnh: 6 font styles, 3 color modes, 4 spacing scales, print CSS.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS định dạng văn bản (KNTT)</b>\n<pre class=\"ex-code\">/* Font */\nfont-family: 'Roboto', Arial, sans-serif;\nfont-size: 16px;     font-weight: bold;\nfont-style: italic;  font-variant: small-caps;\n/* Text */\ntext-align: center;  text-decoration: underline;\ntext-transform: uppercase;\nletter-spacing: 2px; word-spacing: 5px;\nline-height: 1.6;    text-indent: 30px;\ntext-shadow: 2px 2px 4px rgba(0,0,0,0.3);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "6 font styles",
        "kw": "font-weight:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Color modes",
        "kw": "prefers-color-scheme",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Spacing scale",
        "kw": "--spacing-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@media print",
        "kw": "@media print",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo trang",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "4 cách biểu diễn màu",
    "desc": "<b>Đề bài:</b> Demo màu xanh dương (#0000FF) bằng 4 cách: tên, hex, rgb, hsl. Quan sát giống nhau.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "named blue",
        "kw": "color: blue",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hex",
        "kw": "#0000FF",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "rgb",
        "kw": "rgb(0,0,255)",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hsl",
        "kw": "hsl(240",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "background-color và ảnh nền",
    "desc": "<b>Đề bài:</b> Demo: (1) solid background-color, (2) background-image url, (3) linear-gradient. Mỗi div 200×150.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "solid bg",
        "kw": "background-color:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "image url",
        "kw": "background-image: url",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "gradient",
        "kw": "linear-gradient",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "3 divs",
        "kw": "&lt;div",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "opacity vs rgba",
    "desc": "<b>Đề bài:</b> Demo khác biệt: opacity (ảnh hưởng cả nội dung con) vs rgba (chỉ nền). Hai card overlay.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "opacity",
        "kw": "opacity:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "rgba nền",
        "kw": "rgba(",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Demo khác biệt",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Color theory",
    "desc": "<b>Đề bài:</b> Demo color wheel: primary (R,G,B), secondary (cyan,magenta,yellow), complementary. 6+ màu.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Primary",
        "kw": "rgb(255,0,0)",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Secondary",
        "kw": "rgb(0,255,255)",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Complementary",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "6 colors",
        "kw": "background",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "Web safe fonts và colors",
    "desc": "<b>Đề bài:</b> Palette màu website: primary (5 shades HSL), neutral (9 shades), semantic (success/error). CSS variables.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Primary HSL shades",
        "kw": "hsl(220",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Neutral shades",
        "kw": "--gray-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Semantic",
        "kw": "--success:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Variables usage",
        "kw": "var(--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "Gradient types",
    "desc": "<b>Đề bài:</b> Demo: linear-gradient (4 hướng), radial-gradient, conic-gradient. Gradient text (background-clip).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "linear-gradient",
        "kw": "linear-gradient",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "radial-gradient",
        "kw": "radial-gradient",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "conic",
        "kw": "conic-gradient",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Gradient text",
        "kw": "background-clip: text",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Trang tin tức có màu sắc",
    "desc": "<b>Đề bài:</b> Trang tin tức: màu chủ đạo từ CSS variables, gradient header, article nền xen kẽ, footer tối.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "CSS variables",
        "kw": "--primary:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Gradient header",
        "kw": "linear-gradient",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Xen kẽ nền",
        "kw": "nth-child",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Footer tối",
        "kw": "background: #",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Dark theme",
    "desc": "<b>Đề bài:</b> Dark mode: prefers-color-scheme + CSS variables. Contrast đủ WCAG.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Variables :root",
        "kw": "--bg:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "prefers-color-scheme",
        "kw": "prefers-color-scheme",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Good contrast",
        "kw": "#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Tất cả themed",
        "kw": "var(--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Gradient animations",
    "desc": "<b>Đề bài:</b> Animated gradient: background-size + @keyframes shift. Button gradient hover. Card glassmorphism.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "@keyframes gradient",
        "kw": "@keyframes",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "background-size",
        "kw": "background-size:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Glassmorphism",
        "kw": "backdrop-filter",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Hover gradient",
        "kw": "background-position",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug màu CSS",
    "desc": "<b>Đề bài:</b> <b>Sửa 4 lỗi màu:</b>\n<pre>p { color: #GGHHII; }\nh1 { background: rbg(0,0,255); }\ndiv { opacity: 150%; }\nspan { color: bluee; }</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "hex sai",
        "kw": "#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "rbg→rgb",
        "kw": "rgb(",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "opacity 0-1",
        "kw": "opacity: 0.5",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "bluee→blue",
        "kw": "color: blue",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Contrast accessibility",
    "desc": "<b>Đề bài:</b> Check contrast: white (#fff) trên blue (#1976D2) pass AA? Demo before/after với color tools.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Original contrast",
        "kw": "background: #1976D2",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "White text",
        "kw": "color: #ffffff",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Pass AA comment",
        "kw": "/* AA pass",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "WCAG reference",
        "kw": "4.5:1",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Dark mode complete",
    "desc": "<b>Đề bài:</b> Trang hoàn chỉnh với dark mode tự động: all elements dùng CSS variables, smooth transition.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "All vars",
        "kw": "--bg:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Dark override",
        "kw": "prefers-color-scheme: dark",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Transition",
        "kw": "transition:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "All elements themed",
        "kw": "var(--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b15-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "CSS Color Palette",
    "desc": "<b>Đề bài:</b> Xây color palette cho brand: primary (5 shades), secondary, accent, neutral. Demo usage.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Primary shades",
        "kw": "--primary-50:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Secondary",
        "kw": "--secondary-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Accent",
        "kw": "--accent:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo usage",
        "kw": "var(--primary-",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Color accessibility deep",
    "desc": "<b>Đề bài:</b> Test 5 color combos. Fix 3 combo fail WCAG AA. Dùng contrast-color() hoặc tính tay.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "5 combos",
        "kw": "contrast",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Fix 3 fail",
        "kw": "color: #",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "WCAG AA 4.5:1",
        "kw": "4.5:1",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment fixes",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Brand Color System",
    "desc": "<b>Đề bài:</b> Brand guide đầy đủ: primary, secondary, semantic, neutral. Export CSS variables. Demo trang.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Primary palette",
        "kw": "--brand-primary:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Semantic colors",
        "kw": "--success: #",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Neutral scale",
        "kw": "--neutral-100:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo page",
        "kw": "background: var(",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Color Palette Generator CSS",
    "desc": "<b>Đề bài:</b> CSS-only tool: 12 color swatches, hover hiện HEX (::after content attr(data-color)), tint/shade bằng filter.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "12 swatches",
        "kw": "class=\"swatch\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "data-color attr",
        "kw": "data-color",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "::after content",
        "kw": "::after { content: attr(",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "filter tint",
        "kw": "filter: brightness",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Animated Background Art",
    "desc": "<b>Đề bài:</b> Background nghệ thuật: animated gradient mesh, moving particles (CSS pseudo), color pulse.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "@keyframes color",
        "kw": "@keyframes",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Moving particles",
        "kw": "::before",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Gradient mesh",
        "kw": "conic-gradient",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Pulse",
        "kw": "animation:",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b15-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 15: Tạo màu cho chữ và nền",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Full Color Showcase",
    "desc": "<b>Đề bài:</b> Trang showcase màu sắc: palette K12 Tin học, typography, icons, components. Print CSS in ảnh.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Màu sắc CSS (KNTT)</b>\n<pre class=\"ex-code\">/* Màu chữ và nền */\ncolor: red;                  /* tên màu */\ncolor: #FF0000;              /* hex 6 ký tự */\ncolor: #F00;                 /* hex 3 ký tự */\ncolor: rgb(255, 0, 0);       /* rgb */\ncolor: rgba(255, 0, 0, 0.5); /* rgba với độ trong */\ncolor: hsl(0, 100%, 50%);    /* hsl */\nbackground-color: #f0f8ff;\nbackground-image: url('anh.jpg');\n/* Gradient */\nbackground: linear-gradient(to right, #ff6b6b, #4ecdc4);</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Complete palette",
        "kw": "--",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Typography",
        "kw": "font-family:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Components",
        "kw": "border-radius:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@media print",
        "kw": "@media print",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo đầy đủ",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Box Model visual",
    "desc": "<b>Đề bài:</b> Visual demo box model: div có content, padding vàng, border đỏ, margin xanh. CSS color khác nhau.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "content",
        "kw": "width: 200px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "padding",
        "kw": "padding: 20px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "border",
        "kw": "border: 4px solid red",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "margin",
        "kw": "margin: 20px",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Width Height units",
    "desc": "<b>Đề bài:</b> Demo: px, %, vw/vh, min-content, fit-content. Resize cửa sổ xem responsive.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "px",
        "kw": "width: 300px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "%",
        "kw": "width: 50%",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "vw/vh",
        "kw": "width: 50vw",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "fit-content",
        "kw": "fit-content",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Overflow",
    "desc": "<b>Đề bài:</b> Demo 4 overflow: visible, hidden, scroll, auto. Div cố định 200×100 với text dài.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "visible",
        "kw": "overflow: visible",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hidden",
        "kw": "overflow: hidden",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "scroll",
        "kw": "overflow: scroll",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "auto",
        "kw": "overflow: auto",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "box-sizing",
    "desc": "<b>Đề bài:</b> Demo content-box vs border-box với 2 div width:300px. Actual width khác nhau.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "content-box",
        "kw": "content-box",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "border-box",
        "kw": "border-box",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo actual size",
        "kw": "width: 300px",
        "pts": 5,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "margin collapse",
    "desc": "<b>Đề bài:</b> Demo margin collapse: div 20px + div 30px = 30px (không phải 50px). Cách ngăn collapse.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Demo collapse",
        "kw": "margin: 20px",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Giải thích",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Ngăn collapse",
        "kw": "overflow: hidden",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "border vs outline",
    "desc": "<b>Đề bài:</b> Demo: border (chiếm không gian) vs outline (không chiếm). Focus outline cho accessibility.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "border",
        "kw": "border: 2px solid",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "outline",
        "kw": "outline: 2px solid",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "focus outline",
        "kw": "input:focus { outline:",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Card grid đẹp",
    "desc": "<b>Đề bài:</b> 4 cards: padding 20px nhất quán, margin-bottom spacing, border-radius, box-shadow, hover transform.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "padding 20px",
        "kw": "padding: 20px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "border-radius",
        "kw": "border-radius: 8px",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "box-shadow",
        "kw": "box-shadow:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hover transform",
        "kw": "transform: scale",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Container system",
    "desc": "<b>Đề bài:</b> Container system: .container max-width 1200px auto margin, .container-sm (800px), .container-lg (1400px).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "max-width",
        "kw": "max-width: 1200px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Auto center",
        "kw": "margin: 0 auto",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Container variants",
        "kw": ".container-sm {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "@media",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "Grid system 12 cột",
    "desc": "<b>Đề bài:</b> Grid 12 cột: .col-1 đến .col-12. Dùng flex. Demo layout 3 cột, 4 cột, mixed.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "12 cols flex",
        "kw": "display: flex",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "col widths",
        "kw": ".col-6 { width: 50%",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo 3 cột",
        "kw": "class=\"col-4\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo mixed",
        "kw": "class=\"col-8\"",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug box model",
    "desc": "<b>Đề bài:</b> <b>Sửa:</b>\n<pre>.box { width: 100%; padding: 20px; border: 5px solid; }\n/* Box tràn ra ngoài container */</pre><br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "box-sizing border-box",
        "kw": "box-sizing: border-box",
        "pts": 4,
        "hint": ""
      },
      {
        "desc": "Hoặc calc()",
        "kw": "calc(100% - 50px)",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo sửa đúng",
        "kw": "width:",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Spacing system",
    "desc": "<b>Đề bài:</b> Tạo spacing scale (4,8,12,16,24,32,48px) bằng CSS variables. Utility classes .p-4, .m-8...<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Variables",
        "kw": "--space-4:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Utilities",
        "kw": ".p-4 { padding",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Consistent usage",
        "kw": "var(--space-",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Layout bugs",
    "desc": "<b>Đề bài:</b> Fix 3 bugs: float không clear, image tràn container, text overlap.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Clearfix",
        "kw": "::after { content: \"\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "max-width image",
        "kw": "max-width: 100%",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "z-index",
        "kw": "z-index:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "overflow hidden",
        "kw": "overflow: hidden",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b16-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "Float vs Inline-block vs Flex vs Grid",
    "desc": "<b>Đề bài:</b> Demo cùng 3-column layout bằng 4 cách. Code lượng và responsive comparison.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "float",
        "kw": "float: left",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "inline-block",
        "kw": "display: inline-block",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "flex",
        "kw": "display: flex",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "grid",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "CSS Reset so sánh",
    "desc": "<b>Đề bài:</b> Demo 3 reset: Eric Meyer, Normalize, Modern reset. So sánh kết quả.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "margin 0",
        "kw": "margin: 0",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Normalize",
        "kw": "box-sizing: border-box",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Modern reset",
        "kw": "min-height: 100vh",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Container strategies",
    "desc": "<b>Đề bài:</b> Container cho mobile/tablet/desktop/wide với CSS clamp. CSS variables cho breakpoints.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Mobile container",
        "kw": "calc(100% - 32px)",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Clamp",
        "kw": "width: clamp(",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Breakpoints",
        "kw": "@media (min-width:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Max-width",
        "kw": "max-width: 1440px",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Full page layout",
    "desc": "<b>Đề bài:</b> Layout: fixed header, sidebar, main, footer. Sticky sidebar. Responsive: mobile stack, tablet 2col, desktop 3col.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Sticky header",
        "kw": "position: sticky",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Grid layout",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Main flex:1",
        "kw": "flex: 1",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Sticky sidebar",
        "kw": "position: sticky",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Component library box model",
    "desc": "<b>Đề bài:</b> 10 components consistent: card, button, input, badge, avatar, divider, tooltip, progress, accordion, modal.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "10 components",
        "kw": "class=\"component\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Spacing vars",
        "kw": "--spacing-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Radius system",
        "kw": "--radius-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Shadow system",
        "kw": "--shadow-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Demo page",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b16-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 16: Định dạng khung CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Pixel perfect clone",
    "desc": "<b>Đề bài:</b> Clone 1 section website nổi tiếng dùng DevTools. Screenshot + result so sánh.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>CSS Box Model và khung (KNTT)</b>\n<pre class=\"ex-code\">/* Box Model */\nwidth: 300px;    height: 200px;\nmargin: 10px;    padding: 15px;\nborder: 2px solid #333;\nborder-radius: 8px;\nbox-shadow: 3px 3px 10px rgba(0,0,0,0.2);\nbox-sizing: border-box;  /* quan trọng! */\n/* Display */\ndisplay: block | inline | inline-block | flex | grid | none;\n/* Overflow */\noverflow: visible | hidden | scroll | auto;</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Accurate size",
        "kw": "px",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Font match",
        "kw": "font-family:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Color match",
        "kw": "#",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Spacing precise",
        "kw": "padding:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "box-sizing",
        "kw": "box-sizing",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Selector specificity cơ bản",
    "desc": "<b>Đề bài:</b> Tính điểm và demo: h1 (0,0,1), .title (0,1,0), #hero (1,0,0), h1.title (0,1,1). Confirm bằng preview.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "h1 tag",
        "kw": "h1 {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".title class",
        "kw": ".title",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "#hero id",
        "kw": "#hero",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "h1.title combo",
        "kw": "h1.title",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "!important",
    "desc": "<b>Đề bài:</b> Demo !important override tất cả. Giải thích tại sao cần tránh dùng !important trong production.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "!important wins",
        "kw": "!important",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Tại sao tránh",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo conflict",
        "kw": "color:",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "Inline vs stylesheet",
    "desc": "<b>Đề bài:</b> Demo inline style override stylesheet. Giải thích khi nào inline style cần thiết.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Inline wins",
        "kw": "style=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Stylesheet",
        "kw": "&lt;style&gt;",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment khi nào inline",
        "kw": "&lt;!--",
        "pts": 5,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Cascade order",
    "desc": "<b>Đề bài:</b> Demo 3 nguồn CSS: browser default, user stylesheet (giả lập), author stylesheet. Thứ tự ưu tiên.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Browser default",
        "kw": "h1 { font-size",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Author stylesheet",
        "kw": "&lt;style&gt;",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment cascade",
        "kw": "&lt;!--",
        "pts": 5,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "Specificity conflict thực tế",
    "desc": "<b>Đề bài:</b> Debug: tại sao .btn-primary không áp dụng trong .modal .btn? Sửa bằng cách tăng specificity.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Modal .btn-primary",
        "kw": ".modal .btn-primary",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Giải thích",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Fix specificity",
        "kw": "selector",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "Inheritance CSS",
    "desc": "<b>Đề bài:</b> Demo: color, font-family được kế thừa từ cha; border, margin không kế thừa. Dùng inherit và initial.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Demo kế thừa",
        "kw": "color: inherit",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Không kế thừa",
        "kw": "border: inherit",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "initial reset",
        "kw": "initial",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Debug specificity hell",
    "desc": "<b>Đề bài:</b> Codebase có nhiều !important. Refactor: bỏ !important, dùng specificity đúng, layer @layer.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Remove !important",
        "kw": "/* Remove !important */",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "@layer CSS",
        "kw": "@layer",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Refactored",
        "kw": "specificity",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Specificity calculator",
    "desc": "<b>Đề bài:</b> Demo 5 selectors phức tạp: tính điểm, dự đoán, xác nhận. Bảng so sánh.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "5 complex selectors",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Calculate a,b,c",
        "kw": "(1,0,0)",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Prediction correct",
        "kw": "color:",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Table so sánh",
        "kw": "&lt;table",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "CSS :where() và :is()",
    "desc": "<b>Đề bài:</b> Demo :where() (specificity 0) và :is() (highest specificity con). Khi nào dùng mỗi cái.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": ":where() zero",
        "kw": "(:where(",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": ":is() high",
        "kw": ":is(",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment khi nào",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Debug cascade conflict",
    "desc": "<b>Đề bài:</b> Trang có 3 CSS: reset, component, utility. Conflict xảy ra. Debug và sắp xếp đúng thứ tự.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Reset first",
        "kw": "/* reset */",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Component second",
        "kw": "/* component */",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Utility last",
        "kw": "/* utility */",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment order",
        "kw": "&lt;!-- Order ",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Phân tích specificity thực",
    "desc": "<b>Đề bài:</b> Bootstrap-style: .btn và .btn-primary và button.btn. Tại sao .btn-primary đôi khi không áp dụng?<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": ".btn base",
        "kw": ".btn {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": ".btn-primary",
        "kw": ".btn-primary",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Debug conflict",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Fix selector",
        "kw": "button.btn-primary",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Minimize global scope",
    "desc": "<b>Đề bài:</b> Refactor global CSS sang scoped CSS dùng data-* attributes. Demo 2 components tách biệt.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "Global CSS",
        "kw": "p {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Scoped data-*",
        "kw": "[data-component=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Demo 2 scoped",
        "kw": "data-component=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Comment benefit",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b17-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "Specificity strategies",
    "desc": "<b>Đề bài:</b> So sánh 4 strategies: BEM, SMACSS, Atomic, Tailwind-like. Demo cùng card component.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "BEM",
        "kw": "__",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "SMACSS",
        "kw": "/* module */",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Atomic",
        "kw": ".p-16",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Tailwind-like",
        "kw": ".flex",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "CSS @layer",
    "desc": "<b>Đề bài:</b> Demo CSS @layer (cascade layers): @layer reset, base, components, utilities. Giải thích ưu điểm.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "@layer reset",
        "kw": "@layer reset",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@layer base",
        "kw": "@layer base",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@layer components",
        "kw": "@layer components",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@layer utilities",
        "kw": "@layer utilities",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Specificity debugging workflow",
    "desc": "<b>Đề bài:</b> Systematic workflow debug specificity: DevTools simulation, specificity graphs, refactoring approach.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Debug step",
        "kw": "/* Step 1:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Specificity note",
        "kw": "(0,1,0)",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Refactor plan",
        "kw": "/* Refactor:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Test coverage",
        "kw": "assert",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "CSS Architecture Project",
    "desc": "<b>Đề bài:</b> Áp dụng SMACSS cho website hoàn chỉnh: Base, Layout, Module, State, Theme files. Demo.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Base file",
        "kw": "/* Base */",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Layout",
        "kw": "/* Layout */",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Module",
        "kw": "/* Module */",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "State",
        "kw": "is-active {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Theme",
        "kw": "[data-theme=\"dark\"]",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "Design Token System",
    "desc": "<b>Đề bài:</b> Design tokens: spacing, typography, color, radius, shadow. CSS custom properties + demo components.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Spacing tokens",
        "kw": "--spacing-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Typography tokens",
        "kw": "--font-size-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Color tokens",
        "kw": "--color-primary-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Usage",
        "kw": "var(--spacing-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Components demo",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b17-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 17: Các mức ưu tiên của bộ chọn CSS",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "CSS Masterclass K12",
    "desc": "<b>Đề bài:</b> Project tổng kết K12: toàn bộ kiến thức HTML+CSS. Trang hoàn chỉnh, responsive, accessible, animated.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Specificity – Độ ưu tiên bộ chọn (KNTT)</b>\n<pre class=\"ex-code\">/* Tính điểm specificity: (a,b,c) */\n/* a: ID selectors  (#id = 1,0,0) */\n/* b: class, pseudo-class (.class = 0,1,0) */\n/* c: tag, pseudo-element  (p = 0,0,1) */\n\n#main .card p   → (1,1,1) = 111 điểm\n.card p         → (0,1,1) = 11 điểm\np               → (0,0,1) = 1 điểm\np { color: blue !important } /* Vô hiệu hóa, tránh dùng! */</pre>\n<b>Thứ tự: !important > inline > ID > class > tag</b>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Semantic HTML",
        "kw": "&lt;main",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "CSS variables",
        "kw": "--",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@keyframes",
        "kw": "@keyframes",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "WCAG accessible",
        "kw": "aria-",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Specificity đúng",
        "kw": ":is(",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b1-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.1",
    "title": "Nhận biết layout pattern",
    "desc": "<b>Đề bài:</b> Nhận dạng 3 layout phổ biến từ screenshot: Holy Grail (header+3col+footer), Magazine, Card Grid. Viết cấu trúc HTML cho 1 cái.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Nhận dạng pattern",
        "kw": "&lt;!--",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "HTML Holy Grail",
        "kw": "&lt;header",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 columns",
        "kw": "display: flex",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "footer",
        "kw": "&lt;footer",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b1-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.2",
    "title": "Wireframe to HTML",
    "desc": "<b>Đề bài:</b> Từ wireframe đơn giản (text mô tả): \"Header | Nav | Hero | 3 Features | Footer\". Viết HTML+CSS cơ bản.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "Header",
        "kw": "&lt;header",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Nav",
        "kw": "&lt;nav",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Hero",
        "kw": "id=\"hero\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 features",
        "kw": "&lt;section",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Footer",
        "kw": "&lt;footer",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b1-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B1 – Nhận biết",
    "num": "1.3",
    "title": "CSS checklist",
    "desc": "<b>Đề bài:</b> Kiểm tra trang hiện có đủ: charset, viewport, title, CSS reset, hover states, focus styles. Fix những gì thiếu.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B1 – Nhận biết\nĐỌC code/đề bài\nXÁC ĐỊNH thẻ/thuộc tính cần dùng\nVIẾT code và QUAN SÁT preview</pre>",
    "rb": [
      {
        "desc": "charset UTF-8",
        "kw": "charset=\"UTF-8\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "viewport",
        "kw": "viewport",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS reset",
        "kw": "* {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "hover states",
        "kw": ":hover {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "focus",
        "kw": "outline:",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b2-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.1",
    "title": "Giải thích responsive design",
    "desc": "<b>Đề bài:</b> Demo trang không responsive vs responsive. Giải thích: viewport meta, flexible units, media queries, fluid images.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "viewport meta",
        "kw": "viewport",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Fluid units",
        "kw": "%",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@media queries",
        "kw": "@media",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "max-width img",
        "kw": "max-width: 100%",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b2-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.2",
    "title": "Hiểu CSS Grid cho layout",
    "desc": "<b>Đề bài:</b> Demo CSS Grid areas: header, sidebar, main, footer. Named areas. Giải thích grid-template-areas.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "grid-template-areas",
        "kw": "grid-template-areas",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Named areas",
        "kw": "header header",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "grid-area",
        "kw": "grid-area:",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b2-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B2 – Hiểu",
    "num": "2.3",
    "title": "Mobile-first approach",
    "desc": "<b>Đề bài:</b> Giải thích mobile-first: viết base CSS cho mobile, sau đó min-width media queries cho lớn hơn.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B2 – Hiểu\nDỰ ĐOÁN kết quả trước khi viết\nGIẢI THÍCH vai trò từng thẻ/thuộc tính\nSO SÁNH các cách khác nhau</pre>",
    "rb": [
      {
        "desc": "Mobile base",
        "kw": "/* mobile base */",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "min-width",
        "kw": "min-width: 768px",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Content first",
        "kw": "flex-direction: column",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment",
        "kw": "&lt;!--",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b3-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.1",
    "title": "Trang web trường học",
    "desc": "<b>Đề bài:</b> THPT Thủ Thiêm: header (logo+nav), hero (ảnh+slogan), 3 tin tức, gallery, liên hệ, footer. Responsive.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Header + nav",
        "kw": "&lt;nav",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Hero",
        "kw": "background-image",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "3 tin tức",
        "kw": "&lt;article",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Gallery grid",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Footer",
        "kw": "&lt;footer",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b3-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.2",
    "title": "Portfolio website",
    "desc": "<b>Đề bài:</b> Portfolio học sinh: about, skills (progress bars CSS), projects (card grid), contact form. Animations.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "About section",
        "kw": "&lt;section",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "Progress bars",
        "kw": ".progress-bar {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Card grid",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Contact form",
        "kw": "&lt;form",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@keyframes",
        "kw": "@keyframes",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b3-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B3 – Áp dụng",
    "num": "3.3",
    "title": "E-learning platform",
    "desc": "<b>Đề bài:</b> Trang khóa học online: course listing (grid), course detail (layout phức tạp), video (iframe), quiz form.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B3 – Áp dụng\nXÁC ĐỊNH cấu trúc HTML cần thiết\nVIẾT HTML semantic\nÁP DỤNG CSS đúng selector\nKIỂM TRA preview</pre>",
    "rb": [
      {
        "desc": "Course grid",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Course detail",
        "kw": "display: flex",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Video iframe",
        "kw": "&lt;iframe",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Quiz form",
        "kw": "&lt;form",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS responsive",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b4-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.1",
    "title": "Audit và fix trang có sẵn",
    "desc": "<b>Đề bài:</b> Audit trang: HTML validation, CSS errors, accessibility, performance. Fix ít nhất 5 vấn đề.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "HTML valid",
        "kw": "DOCTYPE",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "CSS fix",
        "kw": "border-radius:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Accessibility",
        "kw": "alt=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Performance",
        "kw": "loading=\"lazy\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "5 fixes",
        "kw": "/* FIX",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b4-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.2",
    "title": "Responsive breakpoints",
    "desc": "<b>Đề bài:</b> Trang bị vỡ layout ở mobile. Tìm 3 điểm vỡ, thêm media queries phù hợp.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "3 breakpoints",
        "kw": "@media",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Mobile first",
        "kw": "flex-direction: column",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Tablet fix",
        "kw": "@media (min-width: 768px)",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Desktop fix",
        "kw": "@media (min-width: 1024px)",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b4-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B4 – Phân tích",
    "num": "4.3",
    "title": "Performance optimization",
    "desc": "<b>Đề bài:</b> Tối ưu CSS: loại bỏ unused, inline critical CSS, lazy load images, font-display swap.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B4 – Phân tích\nĐỌC code lỗi cẩn thận\nXÁC ĐỊNH loại lỗi\nSỬA và test lại\nGIẢI THÍCH nguyên nhân</pre>",
    "rb": [
      {
        "desc": "font-display",
        "kw": "font-display: swap",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "loading lazy",
        "kw": "loading=\"lazy\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Critical CSS",
        "kw": "/* critical */",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Unused removed",
        "kw": "/* removed */",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu thẻ đóng &lt;/...&gt;",
      "Sai cú pháp thuộc tính — cần dấu nháy: src=\"...\"",
      "Thẻ lồng nhau sai thứ tự"
    ]
  },
  {
    "id": "k12-kntt-b18-b5-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.1",
    "title": "Framework comparison",
    "desc": "<b>Đề bài:</b> Demo card component bằng: (1) Custom CSS, (2) Bootstrap CDN, (3) Tailwind CDN. So sánh code lượng, flexibility.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Custom CSS",
        "kw": ".card {",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Bootstrap",
        "kw": "class=\"card\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Tailwind",
        "kw": "class=\"rounded-lg",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Comment comparison",
        "kw": "&lt;!--",
        "pts": 4,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b5-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.2",
    "title": "Accessibility audit",
    "desc": "<b>Đề bài:</b> Full accessibility audit: color contrast, keyboard nav, screen reader, focus management, ARIA. Fix 5 issues.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "Color contrast",
        "kw": "contrast",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Keyboard nav",
        "kw": "tabindex=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "ARIA",
        "kw": "aria-",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Focus",
        "kw": "outline:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "5 fixes",
        "kw": "/* FIX:",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b5-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B5 – Đánh giá",
    "num": "5.3",
    "title": "Web vitals",
    "desc": "<b>Đề bài:</b> Demo các yếu tố ảnh hưởng Core Web Vitals: LCP (largest image), CLS (no layout shift), FID (responsive).<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B5 – Đánh giá\nVIẾT 2+ cách khác nhau\nSO SÁNH: ngắn gọn, dễ đọc, hiệu quả\nKẾT LUẬN phương án tốt nhất</pre>",
    "rb": [
      {
        "desc": "LCP image",
        "kw": "loading=\"eager\"",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "No CLS",
        "kw": "width= height=",
        "pts": 3,
        "hint": ""
      },
      {
        "desc": "Font swap",
        "kw": "font-display: swap",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Preload",
        "kw": "rel=\"preload\"",
        "pts": 3,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b6-1",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.1",
    "title": "Complete portfolio",
    "desc": "<b>Đề bài:</b> Portfolio hoàn chỉnh 4 trang: index, about, projects (3 projects), contact. Consistent theme, animations, responsive.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "4 trang HTML",
        "kw": "href=",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Consistent CSS",
        "kw": "--primary:",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@keyframes",
        "kw": "@keyframes",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Contact form",
        "kw": "&lt;form",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b6-2",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.2",
    "title": "E-commerce product",
    "desc": "<b>Đề bài:</b> Trang sản phẩm đầy đủ: gallery (CSS Grid), filter sidebar, product cards, cart preview, checkout form.<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Gallery grid",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Filter sidebar",
        "kw": "&lt;aside",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Product cards",
        "kw": ".card",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Cart preview",
        "kw": ".cart",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Checkout form",
        "kw": "&lt;form",
        "pts": 2,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  },
  {
    "id": "k12-kntt-b18-b6-3",
    "g": "K12",
    "bo": "KNTT",
    "ch": "Bài 18: Thực hành tổng hợp thiết kế trang web",
    "type": "html",
    "lv": "B6 – Sáng tạo",
    "num": "6.3",
    "title": "Tổng kết K12 HTML+CSS",
    "desc": "<b>Đề bài:</b> Tự do sáng tạo trang web chủ đề tự chọn. Yêu cầu: semantic HTML5, CSS variables, flexbox+grid, responsive, animations, accessibility. Tốt nhất trong class!<br><b>Yêu cầu:</b> Viết code HTML/CSS, quan sát kết quả trong Preview bên phải.",
    "theory": "<b>Tổng hợp HTML+CSS – Quy trình thiết kế web (KNTT)</b>\n<pre class=\"ex-code\">/* Quy trình thiết kế web:\n1. Phân tích yêu cầu (wireframe)\n2. Cấu trúc HTML (semantic)\n3. CSS base styles (reset, variables)\n4. Components (cards, buttons, forms)\n5. Layout (flexbox/grid)\n6. Responsive (mobile-first)\n7. Accessibility (aria, contrast)\n8. Testing (preview, validate) */</pre>",
    "pseudo": "<pre class=\"ex-code\">## B6 – Sáng tạo\nXÁC ĐỊNH mục đích, đối tượng\nTHIẾT KẾ cấu trúc HTML semantic\nVIẾT CSS đầy đủ\nKIỂM TRA responsive + accessibility</pre>",
    "rb": [
      {
        "desc": "Semantic HTML",
        "kw": "&lt;article",
        "pts": 1,
        "hint": ""
      },
      {
        "desc": "CSS variables",
        "kw": "--",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Flex+Grid",
        "kw": "display: grid",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "@keyframes",
        "kw": "@keyframes",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Responsive",
        "kw": "@media",
        "pts": 2,
        "hint": ""
      },
      {
        "desc": "Accessibility",
        "kw": "aria-",
        "pts": 1,
        "hint": ""
      }
    ],
    "errors": [
      "Thiếu dấu ; sau thuộc tính CSS",
      "Sai tên: colour → color",
      "Sai đơn vị: cần px/em/rem"
    ]
  }
];

if (typeof module !== "undefined") module.exports = EXERCISES_K12;