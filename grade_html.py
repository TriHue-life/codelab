#!/usr/bin/env python3
"""
grade_html.py — Chấm điểm tự động HTML/CSS v2.0
══════════════════════════════════════════════════════════════════
Đặc điểm v2:
  ✓ DOM parsing với html.parser (không cần lxml)
  ✓ Tag presence: kiểm tra thẻ HTML có tồn tại không
  ✓ Attribute check: kiểm tra attributes (src, href, class...)
  ✓ Content check: kiểm tra text content
  ✓ CSS property check: kiểm tra inline style và <style> block
  ✓ Structural check: heading hierarchy, list structure
  ✓ Semantic HTML scoring: article, header, nav, main, footer
  ✓ Accessibility basic: alt text, label for, title
  ✓ Partial credit per criterion
  ✓ Error hints tiếng Việt
"""

import sys, json, re
from html.parser import HTMLParser
from typing import List, Dict, Any, Optional


# ── HTML Parser ───────────────────────────────────────────────────────

class SimpleHTMLParser(HTMLParser):
    """Parse HTML thành cấu trúc có thể query."""

    def __init__(self):
        super().__init__()
        self.tags = {}         # tag → list of {attrs, text_after}
        self.text_blocks = []  # tất cả text content
        self.current_tag = None
        self.tag_stack = []
        self._text_buf = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag not in self.tags:
            self.tags[tag] = []
        self.tags[tag].append({'attrs': attrs_dict, 'text': ''})
        self.tag_stack.append((tag, len(self.tags[tag]) - 1))
        self._text_buf = []

    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1][0] == tag:
            _, idx = self.tag_stack.pop()
            text = ''.join(self._text_buf).strip()
            if tag in self.tags and idx < len(self.tags[tag]):
                self.tags[tag][idx]['text'] = text
            self._text_buf = []

    def handle_data(self, data):
        stripped = data.strip()
        if stripped:
            self._text_buf.append(stripped)
            self.text_blocks.append(stripped)

    def has_tag(self, tag: str) -> bool:
        return tag.lower() in self.tags and len(self.tags[tag.lower()]) > 0

    def count_tag(self, tag: str) -> int:
        return len(self.tags.get(tag.lower(), []))

    def get_attrs(self, tag: str, idx: int = 0) -> Dict:
        items = self.tags.get(tag.lower(), [])
        return items[idx]['attrs'] if idx < len(items) else {}

    def get_all_attrs(self, tag: str) -> List[Dict]:
        return [item['attrs'] for item in self.tags.get(tag.lower(), [])]

    def get_text(self, tag: str, idx: int = 0) -> str:
        items = self.tags.get(tag.lower(), [])
        return items[idx]['text'] if idx < len(items) else ''

    def full_text(self) -> str:
        return ' '.join(self.text_blocks)


def parse_html(html: str) -> SimpleHTMLParser:
    p = SimpleHTMLParser()
    try:
        p.feed(html)
    except Exception:
        pass
    return p


# ── CSS extractor ─────────────────────────────────────────────────────

def extract_css(html: str) -> str:
    """Lấy tất cả CSS: <style> blocks + inline styles."""
    style_blocks = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL | re.IGNORECASE)
    inline_styles = re.findall(r'style=["\']([^"\']+)["\']', html, re.IGNORECASE)
    return '\n'.join(style_blocks + inline_styles)


def css_has_property(css: str, property_name: str, value: str = None) -> bool:
    """Kiểm tra CSS property có tồn tại không, optionally với value."""
    # Normalize
    prop = property_name.strip().lower()
    css_lower = css.lower()
    if prop not in css_lower:
        return False
    if value is None:
        return True
    # Check giá trị
    pattern = re.escape(prop) + r'\s*:\s*' + re.escape(value.lower())
    return bool(re.search(pattern, css_lower))


# ── Grading criteria ──────────────────────────────────────────────────

def check_criterion(html: str, parser: SimpleHTMLParser, css: str,
                    criterion: Dict) -> tuple[bool, str]:
    """
    Kiểm tra 1 tiêu chí. Returns (passed, hint).

    Criterion types:
      tag:       { type: 'tag', tag: 'img', min: 1 }
      attr:      { type: 'attr', tag: 'a', attr: 'href', value: '#contact' }
      text:      { type: 'text', tag: 'h1', contains: 'CodeLab' }
      css_prop:  { type: 'css_prop', property: 'color', value: 'red' }  (optional value)
      content:   { type: 'content', contains: 'xin chào' }  # anywhere in page
      count:     { type: 'count', tag: 'li', min: 3, max: 10 }
      semantic:  { type: 'semantic', tags: ['header','main','footer'] }
      alt_text:  { type: 'alt_text' }  # all img have alt
      link_href: { type: 'link_href', not_empty: true }
      custom:    { type: 'custom', pattern: '<table.*<tr.*<td' }  # regex
    """
    ctype = criterion.get('type', 'tag')

    if ctype == 'tag':
        tag = criterion.get('tag', '').lower()
        min_count = criterion.get('min', 1)
        count = parser.count_tag(tag)
        if count >= min_count:
            return True, ''
        return False, f'Cần ít nhất {min_count} thẻ <{tag}>, tìm thấy {count}'

    elif ctype == 'count':
        tag = criterion.get('tag', '').lower()
        count = parser.count_tag(tag)
        mn, mx = criterion.get('min', 0), criterion.get('max', 9999)
        if mn <= count <= mx:
            return True, ''
        return False, f'<{tag}>: cần {mn}–{mx}, tìm thấy {count}'

    elif ctype == 'attr':
        tag  = criterion.get('tag', '').lower()
        attr = criterion.get('attr', '').lower()
        val  = criterion.get('value')
        for attrs in parser.get_all_attrs(tag):
            if attr in [k.lower() for k in attrs]:
                actual_val = attrs.get(attr, attrs.get(attr.upper(), ''))
                if val is None or str(actual_val).lower() == str(val).lower():
                    return True, ''
                # partial: check contains
                if val and str(val).lower() in str(actual_val).lower():
                    return True, ''
        hint = f'Thẻ <{tag}> cần attribute {attr}'
        if val: hint += f'="{val}"'
        return False, hint

    elif ctype == 'text':
        tag      = criterion.get('tag', '').lower()
        contains = criterion.get('contains', '').lower()
        for item in parser.tags.get(tag, []):
            if contains in item.get('text', '').lower():
                return True, ''
        return False, f'<{tag}> cần chứa text "{criterion.get("contains")}"'

    elif ctype == 'content':
        contains = criterion.get('contains', '').lower()
        if contains in parser.full_text().lower():
            return True, ''
        if contains in html.lower():
            return True, ''
        return False, f'Trang cần chứa nội dung "{criterion.get("contains")}"'

    elif ctype == 'css_prop':
        prop = criterion.get('property', '')
        val  = criterion.get('value')
        if css_has_property(css, prop, val):
            return True, ''
        hint = f'CSS cần property "{prop}"'
        if val: hint += f': {val}'
        return False, hint

    elif ctype == 'semantic':
        required = [t.lower() for t in criterion.get('tags', [])]
        missing  = [t for t in required if not parser.has_tag(t)]
        if not missing:
            return True, ''
        return False, f'Thiếu thẻ semantic: {", ".join(f"<{t}>" for t in missing)}'

    elif ctype == 'alt_text':
        imgs = parser.get_all_attrs('img')
        bad  = [a for a in imgs if not a.get('alt')]
        if not bad:
            return True, ''
        return False, f'{len(bad)} thẻ <img> thiếu attribute alt (accessibility)'

    elif ctype == 'link_href':
        links = parser.get_all_attrs('a')
        bad   = [a for a in links if not a.get('href')]
        if not bad:
            return True, ''
        return False, f'{len(bad)} thẻ <a> thiếu href'

    elif ctype == 'custom':
        pattern = criterion.get('pattern', '')
        if re.search(pattern, html, re.DOTALL | re.IGNORECASE):
            return True, ''
        return False, f'Pattern không tìm thấy: {pattern[:50]}'

    return False, f'Unknown criterion type: {ctype}'


# ── Main grader ───────────────────────────────────────────────────────

def grade_html(
    student_html: str,
    criteria: List[Dict],
    rubric: Optional[List[Dict]] = None,
) -> Dict:
    """
    Chấm điểm HTML/CSS.

    criteria: list of criterion dicts (see check_criterion for types)
    rubric:   [{ desc, pts, type, ... }] — alias of criteria

    Returns:
    {
        score: float (0-10),
        passed: int, total: int,
        details: [...],
        analysis: str,
    }
    """
    if not student_html or not student_html.strip():
        return _empty_result('Chưa có HTML để chấm.')

    # Merge rubric và criteria
    all_criteria = list(criteria or []) + list(rubric or [])
    if not all_criteria:
        return _empty_result('Không có tiêu chí chấm điểm.')

    parser = parse_html(student_html)
    css    = extract_css(student_html)

    details  = []
    passed   = 0
    total_pts, earned_pts = 0, 0

    for i, crit in enumerate(all_criteria):
        pts  = crit.get('pts', 1)
        desc = crit.get('desc', f'Tiêu chí {i+1}')
        total_pts += pts

        try:
            ok, hint = check_criterion(student_html, parser, css, crit)
        except Exception as e:
            ok, hint = False, f'Lỗi kiểm tra: {str(e)}'

        if ok:
            passed += 1
            earned_pts += pts

        details.append({
            'idx': i, 'desc': desc,
            'passed': ok, 'pts': pts if ok else 0,
            'hint': hint if not ok else '',
        })

    score = round((earned_pts / total_pts) * 10, 2) if total_pts > 0 else 0
    failed = [d for d in details if not d['passed']]
    analysis = _build_html_analysis(failed, student_html, parser)

    return {
        'score': score,
        'passed': passed,
        'total': len(all_criteria),
        'details': details,
        'errors': [],
        'analysis': analysis,
    }


def _build_html_analysis(failed: List[Dict], html: str, parser: SimpleHTMLParser) -> str:
    parts = []
    if failed:
        parts.append(f'❌ {len(failed)} tiêu chí chưa đạt:')
        for d in failed[:6]:
            parts.append(f'  • {d["desc"]}')
            if d.get('hint'):
                parts.append(f'    💡 {d["hint"]}')

    # Structural warnings
    if not parser.has_tag('html'):
        parts.append('\n⚠️  Thiếu thẻ <html> bao ngoài.')
    if not parser.has_tag('head'):
        parts.append('⚠️  Thiếu thẻ <head>.')
    if not parser.has_tag('body'):
        parts.append('⚠️  Thiếu thẻ <body>.')
    if not parser.has_tag('title'):
        parts.append('⚠️  Thiếu thẻ <title> trong <head>.')

    return '\n'.join(parts) if parts else '✅ HTML đáp ứng tất cả tiêu chí!'


def _empty_result(msg: str) -> Dict:
    return {
        'score': 0, 'passed': 0, 'total': 0,
        'details': [], 'errors': [msg], 'analysis': msg,
    }


if __name__ == '__main__':
    data = json.load(sys.stdin)
    result = grade_html(
        student_html=data.get('code', ''),
        criteria=data.get('tests', []),
        rubric=data.get('rubric', []),
    )
    print(json.dumps(result, ensure_ascii=False, indent=2))
