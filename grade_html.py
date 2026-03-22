#!/usr/bin/env python3
"""
grade_html.py — Chấm điểm tự động HTML/CSS
══════════════════════════════════════════════════════════════════
Dùng BeautifulSoup để phân tích DOM thay vì so sánh chuỗi văn bản.
Bỏ qua khoảng trắng, thụt lề, thứ tự thuộc tính.

Hỗ trợ các quy tắc (rule):
  - tag: "h1"              → kiểm tra thẻ <h1> tồn tại
  - text: "h1:Xin chào"   → <h1> có text chứa "Xin chào"
  - attr: "img[src][alt]" → <img> có cả src và alt
  - css:  "color:red"     → <style> có property color:red
  - count: "li>=3"        → có ít nhất 3 thẻ <li>
  - id:   "#myid"         → phần tử có id="myid"
  - class: ".myclass"     → phần tử có class="myclass"
  - custom function       → hàm Python tự viết

Cài đặt: pip install beautifulsoup4

Tác giả: CodeLab THPT Thủ Thiêm
"""

import re
from typing import Callable, Union

try:
    from bs4 import BeautifulSoup, Tag
    HAS_BS4 = True
except ImportError:
    HAS_BS4 = False
    print("⚠️  Cần cài: pip install beautifulsoup4")


class HtmlRule:
    """Định nghĩa một tiêu chí chấm điểm HTML."""
    def __init__(self, desc: str, pts: int, rule: Union[str, Callable],
                 hint: str = ''):
        self.desc = desc
        self.pts  = pts
        self.rule = rule   # str (DSL) hoặc callable(soup) → (bool, str)
        self.hint = hint


def _check_rule(soup: 'BeautifulSoup', raw_code: str, rule: Union[str, Callable]) -> tuple:
    """
    Kiểm tra một quy tắc.
    Returns: (passed: bool, detail: str)
    """
    if callable(rule):
        return rule(soup, raw_code)

    rule = rule.strip()

    # count:tag>=N — đếm số phần tử
    count_m = re.match(r'^count:(.+?)(>=|<=|>|<|==?)(\d+)$', rule, re.IGNORECASE)
    if count_m:
        sel, op, n_str = count_m.groups()
        n = int(n_str)
        try:
            count = len(soup.select(sel))
        except Exception:
            count = len(soup.find_all(sel))
        ops = {'>=': lambda a,b: a>=b, '<=': lambda a,b: a<=b,
               '>': lambda a,b: a>b, '<': lambda a,b: a<b,
               '=': lambda a,b: a==b, '==': lambda a,b: a==b}
        passed = ops.get(op, lambda a,b: False)(count, n)
        return (passed, '' if passed else f'Cần {op}{n} thẻ <{sel}>, thực tế: {count}')

    # css:property[:value] — kiểm tra trong <style>
    if rule.startswith('css:'):
        prop_val = rule[4:].strip().lower()
        style_texts = [s.get_text().lower() for s in soup.find_all('style')]
        # Also inline styles
        style_texts += [el.get('style', '').lower() for el in soup.find_all(style=True)]
        full_css = ' '.join(style_texts)
        # Remove comments
        full_css = re.sub(r'/\*.*?\*/', '', full_css, flags=re.DOTALL)
        found = prop_val in full_css.replace(' ', '')
        if not found:
            found = prop_val.replace(' ', '') in full_css.replace(' ', '')
        return (found, '' if found else f'Không tìm thấy CSS: {prop_val}')

    # @rule — at-rules trong CSS
    if rule.startswith('@'):
        found = rule.lower() in raw_code.lower()
        return (found, '' if found else f'Không tìm thấy: {rule}')

    # tag:text — thẻ có text cụ thể
    if ':' in rule and not rule.startswith('http') and '[' not in rule:
        colon = rule.index(':')
        sel  = rule[:colon].strip()
        text = rule[colon+1:].strip()
        try:
            elements = soup.select(sel)
        except Exception:
            elements = soup.find_all(sel)
        found = any(text.lower() in (el.get_text() or '').lower() for el in elements)
        return (found, '' if found else f'Thẻ <{sel}> không có text "{text}"')

    # [attr=val] — CSS selector với attributes
    if '[' in rule and ']' in rule:
        try:
            elements = soup.select(rule)
            found = len(elements) > 0
            return (found, '' if found else f'Không tìm thấy: {rule}')
        except Exception as e:
            # Manual fallback
            tag_m = re.match(r'^([a-zA-Z][a-zA-Z0-9]*)', rule)
            tag = tag_m.group(1) if tag_m else None
            attrs_raw = re.findall(r'\[([^\]]+)\]', rule)
            elements = soup.find_all(tag) if tag else soup.find_all(True)
            found = False
            for el in elements:
                ok = True
                for attr_expr in attrs_raw:
                    if '=' in attr_expr:
                        key, val = attr_expr.split('=', 1)
                        key = key.strip(); val = val.strip().strip('"\'')
                        if (el.get(key) or '').lower() != val.lower():
                            ok = False; break
                    else:
                        if not el.has_attr(attr_expr.strip()):
                            ok = False; break
                if ok:
                    found = True; break
            return (found, '' if found else f'Không tìm thấy: {rule}')

    # Simple CSS selector (tag, .class, #id, parent > child)
    try:
        elements = soup.select(rule)
        found = len(elements) > 0
        return (found, '' if found else f'Không tìm thấy: {rule}')
    except Exception:
        # Plain text fallback
        found = rule.lower() in raw_code.lower()
        return (found, '' if found else f'Không tìm thấy: {rule}')


def grade_html_code(student_html: str, rules: list) -> dict:
    """
    Chấm điểm HTML.

    Args:
        student_html: Mã HTML của học sinh
        rules: List HtmlRule hoặc dict với keys: desc, pts, rule, hint

    Returns:
        {
          'score': float,
          'passed': int,
          'total': int,
          'total_pts': int,
          'earned_pts': int,
          'details': list,
          'errors': list,
        }
    """
    if not HAS_BS4:
        raise ImportError("Cần cài: pip install beautifulsoup4")

    if not rules:
        return {'score': 0, 'passed': 0, 'total': 0,
                'total_pts': 0, 'earned_pts': 0, 'details': [], 'errors': []}

    soup = BeautifulSoup(student_html, 'html.parser')
    raw  = student_html

    passed_count = 0
    total_pts    = 0
    earned_pts   = 0
    details      = []
    errors       = []

    for rule_obj in rules:
        # Accept both HtmlRule and dict
        if isinstance(rule_obj, dict):
            desc = rule_obj.get('desc', '')
            pts  = int(rule_obj.get('pts', 1))
            rule = rule_obj.get('rule', '') or rule_obj.get('kw', '')
            hint = rule_obj.get('hint', '')
        else:
            desc = rule_obj.desc
            pts  = rule_obj.pts
            rule = rule_obj.rule
            hint = rule_obj.hint

        total_pts += pts

        try:
            passed, detail = _check_rule(soup, raw, rule)
        except Exception as e:
            passed = False
            detail = f'Lỗi kiểm tra: {e}'

        if passed:
            passed_count += 1
            earned_pts   += pts
        else:
            err_msg = f'{desc}: {detail or "Không đạt"}' + (f' — Gợi ý: {hint}' if hint else '')
            errors.append(err_msg)

        details.append({
            'desc':   desc,
            'pts':    pts,
            'earned': pts if passed else 0,
            'passed': passed,
            'detail': detail,
            'hint':   hint,
        })

    score = round((earned_pts / total_pts) * 10, 1) if total_pts > 0 else 0

    return {
        'score':      score,
        'passed':     passed_count,
        'total':      len(rules),
        'total_pts':  total_pts,
        'earned_pts': earned_pts,
        'details':    details,
        'errors':     errors,
    }


# ── Hàm check tùy chỉnh ──────────────────────────────────────────
def check_heading_with_class(soup, raw, expected_class='title'):
    """Custom check: <h1> có class cụ thể."""
    h1 = soup.find('h1', class_=expected_class)
    return (h1 is not None, '' if h1 else f'<h1 class="{expected_class}"> không tìm thấy')


def check_form_has_submit(soup, raw):
    """Custom check: form có nút submit."""
    submit = (soup.find('input', type='submit') or
              soup.find('button', type='submit') or
              soup.find('button', string=re.compile(r'submit|gửi|nộp', re.IGNORECASE)))
    return (submit is not None, '' if submit else 'Form không có nút Submit')


# ── Ví dụ sử dụng ──────────────────────────────────────────────
if __name__ == '__main__':
    student1 = """
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>Trang cá nhân</title>
        <style>
            body { font-family: Arial; background-color: #f0f0f0; }
            h1 { color: #333; text-align: center; }
            .intro { padding: 20px; }
        </style>
    </head>
    <body>
        <h1>Xin chào thế giới</h1>
        <div class="intro">
            <p>Tôi là học sinh lớp 12.</p>
            <img src="avatar.jpg" alt="Ảnh đại diện" width="200">
        </div>
        <ul>
            <li>Sở thích 1</li>
            <li>Sở thích 2</li>
            <li>Sở thích 3</li>
        </ul>
    </body>
    </html>
    """

    rules = [
        {'desc': 'Có thẻ <h1>',                    'pts': 2, 'rule': 'h1'},
        {'desc': '<h1> có text "Xin chào"',         'pts': 2, 'rule': 'h1:Xin chào'},
        {'desc': '<img> có src và alt',             'pts': 2, 'rule': 'img[src][alt]'},
        {'desc': 'Có ít nhất 3 thẻ <li>',          'pts': 2, 'rule': 'count:li>=3'},
        {'desc': 'CSS có background-color',         'pts': 1, 'rule': 'css:background-color'},
        {'desc': 'CSS có color cho h1',             'pts': 1, 'rule': 'css:color'},
    ]

    result = grade_html_code(student1, rules)
    print(f"Điểm: {result['score']}/10")
    print(f"Pass: {result['passed']}/{result['total']} tiêu chí")
    if result['errors']:
        print("Lỗi:")
        for e in result['errors']:
            print(f"  - {e}")
    else:
        print("✅ Tất cả tiêu chí đạt!")

    print()
    # Test với form
    student2 = """
    <form action="/submit" method="post">
        <label>Họ tên: <input type="text" name="name" required></label>
        <label>Email: <input type="email" name="email"></label>
        <label>Tuổi: <input type="number" name="age" min="0" max="120"></label>
        <button type="submit">Gửi</button>
    </form>
    """
    rules2 = [
        {'desc': 'Có <form>',                    'pts': 2, 'rule': 'form'},
        {'desc': 'Form có method="post"',        'pts': 2, 'rule': 'form[method=post]'},
        {'desc': 'Có input type="email"',        'pts': 2, 'rule': 'input[type=email]'},
        {'desc': 'Input có thuộc tính required', 'pts': 2, 'rule': 'input[required]'},
        {'desc': 'Có nút submit',                'pts': 2,
         'rule': lambda s, r: check_form_has_submit(s, r)},
    ]
    result2 = grade_html_code(student2, rules2)
    print(f"Bài 2 (Form) - Điểm: {result2['score']}/10")
    print(f"Pass: {result2['passed']}/{result2['total']} tiêu chí")
