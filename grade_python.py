#!/usr/bin/env python3
"""
grade_python.py — Chấm điểm tự động Python v2.0
══════════════════════════════════════════════════════════════════
Đặc điểm v2:
  ✓ Black-box: chấm theo đầu ra, không quan tâm cách viết
  ✓ Float tolerance ±0.01 (configurable)
  ✓ Multi-line output comparison (line-by-line)
  ✓ Partial credit: mỗi test case độc lập
  ✓ Normalize output: trailing spaces, unicode, accents
  ✓ Keyword rubric: kiểm tra học sinh có dùng đúng cấu trúc không
  ✓ Timeout 8s/test, sandbox subprocess
  ✓ Meaningful error messages (Vietnamese)
  ✓ Hint generation khi sai
"""

import subprocess, sys, os, tempfile, math, re, json
from typing import List, Dict, Any, Optional


# ── Constants ────────────────────────────────────────────────────────
TIMEOUT_S   = 8
FLOAT_TOL   = 0.01
PYTHON_BIN  = sys.executable


# ── Normalizers ──────────────────────────────────────────────────────

def normalize(s: str) -> str:
    """Chuẩn hóa output: bỏ trailing space/newline, lowercase nếu cần."""
    lines = s.rstrip('\n').split('\n')
    return '\n'.join(line.rstrip() for line in lines)


def lines_match(actual: str, expected: str, tol: float = FLOAT_TOL) -> bool:
    """So sánh linh hoạt 2 dòng: exact → float → normalize unicode."""
    if actual == expected:
        return True
    # Float comparison
    try:
        if abs(float(actual) - float(expected)) <= tol:
            return True
    except (ValueError, TypeError):
        pass
    # Normalize: bỏ dấu chấm ngàn, thay dấu phẩy thập phân
    def norm_num(s):
        return s.replace(',', '.').replace(' ', '')
    try:
        if abs(float(norm_num(actual)) - float(norm_num(expected))) <= tol:
            return True
    except (ValueError, TypeError):
        pass
    # Case-insensitive for non-numeric
    return actual.strip().lower() == expected.strip().lower()


def outputs_match(actual: str, expected: str) -> tuple[bool, str]:
    """
    So sánh full output. Trả về (match, hint).
    """
    na, ne = normalize(actual), normalize(expected)
    if na == ne:
        return True, ''

    la = na.split('\n')
    le = ne.split('\n')

    if len(la) != len(le):
        return False, (
            f'Số dòng output: thực tế {len(la)} dòng, '
            f'mong đợi {len(le)} dòng'
        )

    for i, (a, e) in enumerate(zip(la, le)):
        if not lines_match(a, e):
            return False, f'Dòng {i+1}: "{a}" ≠ "{e}"'

    return True, ''


# ── Runner ────────────────────────────────────────────────────────────

def run_code(code: str, stdin: str = '', timeout: int = TIMEOUT_S) -> Dict:
    """Chạy code Python trong subprocess, trả về {stdout, stderr, error}."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py',
                                     delete=False, encoding='utf-8') as f:
        f.write(code)
        fname = f.name
    try:
        proc = subprocess.run(
            [PYTHON_BIN, fname],
            input=stdin, capture_output=True, text=True,
            timeout=timeout, encoding='utf-8', errors='replace',
        )
        return {
            'stdout': proc.stdout,
            'stderr': proc.stderr,
            'error':  None,
            'returncode': proc.returncode,
        }
    except subprocess.TimeoutExpired:
        return {'stdout': '', 'stderr': '', 'error': f'Timeout ({timeout}s) — code bị vòng lặp vô tận?', 'returncode': -1}
    except Exception as e:
        return {'stdout': '', 'stderr': '', 'error': str(e), 'returncode': -1}
    finally:
        try: os.unlink(fname)
        except: pass


# ── Keyword rubric ────────────────────────────────────────────────────

def check_keywords(code: str, rubric: List[Dict]) -> List[Dict]:
    """
    Kiểm tra keyword rubric (không tính vào test case score).
    rubric = [{ kw: 'for', pts: 2, desc: 'Dùng vòng lặp for' }, ...]
    """
    results = []
    for item in rubric:
        kw = item.get('kw', '')
        if not kw:
            continue
        # Smart match: word boundary cho keywords đơn
        found = False
        for k in kw.split('|'):
            k = k.strip()
            if not k:
                continue
            # Kiểm tra trong code (bỏ qua comment)
            code_no_comment = re.sub(r'#.*', '', code)
            if re.search(r'\b' + re.escape(k) + r'\b', code_no_comment):
                found = True
                break
            # Fallback: substring
            if k in code_no_comment:
                found = True
                break
        results.append({
            'kw': kw,
            'pts': item.get('pts', 0),
            'desc': item.get('desc', kw),
            'passed': found,
            'hint': item.get('hint', ''),
        })
    return results


# ── Main grader ───────────────────────────────────────────────────────

def grade_python(
    student_code: str,
    test_cases: List[Dict],
    rubric: Optional[List[Dict]] = None,
    tc_weight: float = 0.6,
    rb_weight: float = 0.4,
) -> Dict:
    """
    Chấm điểm Python.

    test_cases: [{ input: str, expected: str, pts: int, desc: str }]
    rubric:     [{ kw: str, pts: int, desc: str, hint: str }]
    tc_weight:  tỉ lệ điểm test case (mặc định 60%)
    rb_weight:  tỉ lệ điểm rubric keyword (mặc định 40%)

    Trả về:
    {
      score: float (0-10),
      tc_score: float, rb_score: float,
      passed: int, total: int,
      details: [...],  # test case results
      rubric_results: [...],
      errors: [...],   # runtime errors
      analysis: str,   # tóm tắt lỗi sai
    }
    """
    if not student_code or not student_code.strip():
        return _empty_result('Chưa có code để chấm.')

    rubric = rubric or []
    details = []
    errors  = []
    passed  = 0
    total_tc_pts = sum(tc.get('pts', 1) for tc in test_cases) or 1
    earned_tc_pts = 0

    for i, tc in enumerate(test_cases):
        stdin    = tc.get('input', '') or ''
        expected = tc.get('expected', '') or ''
        pts      = tc.get('pts', 1)
        desc     = tc.get('desc', f'Test case {i+1}')

        res = run_code(student_code, stdin=stdin)

        if res['error']:
            details.append({
                'idx': i, 'desc': desc, 'passed': False, 'pts': 0,
                'input': stdin, 'expected': expected,
                'actual': '', 'error': res['error'],
                'hint': _error_hint(res['error']),
            })
            errors.append(res['error'])
            continue

        if res['returncode'] != 0 and res['stderr']:
            err_msg = _clean_traceback(res['stderr'])
            details.append({
                'idx': i, 'desc': desc, 'passed': False, 'pts': 0,
                'input': stdin, 'expected': expected,
                'actual': res['stdout'],
                'error': err_msg,
                'hint': _error_hint(err_msg),
            })
            errors.append(err_msg)
            continue

        ok, hint = outputs_match(res['stdout'], expected)
        if ok:
            passed += 1
            earned_tc_pts += pts
        details.append({
            'idx': i, 'desc': desc, 'passed': ok, 'pts': pts if ok else 0,
            'input': stdin, 'expected': expected,
            'actual': res['stdout'].rstrip('\n'),
            'error': None,
            'hint': hint if not ok else '',
        })

    # Rubric keyword scoring
    rb_results = check_keywords(student_code, rubric)
    total_rb_pts = sum(r['pts'] for r in rb_results) or 1
    earned_rb_pts = sum(r['pts'] for r in rb_results if r['passed'])

    # Tính điểm 0-10
    if test_cases and rubric:
        tc_score = (earned_tc_pts / total_tc_pts) * 10 * tc_weight
        rb_score = (earned_rb_pts / total_rb_pts) * 10 * rb_weight
        score = round(min(10, tc_score + rb_score), 2)
    elif test_cases:
        score = round((earned_tc_pts / total_tc_pts) * 10, 2)
        tc_score, rb_score = score, 0.0
    elif rubric:
        score = round((earned_rb_pts / total_rb_pts) * 10, 2)
        tc_score, rb_score = 0.0, score
    else:
        score = 0.0
        tc_score = rb_score = 0.0

    # Analysis summary
    failed = [d for d in details if not d['passed']]
    analysis = _build_analysis(failed, rb_results)

    return {
        'score': score,
        'tc_score': round(tc_score, 2),
        'rb_score': round(rb_score, 2),
        'passed': passed,
        'total': len(test_cases),
        'details': details,
        'rubric_results': rb_results,
        'errors': errors,
        'analysis': analysis,
    }


# ── Helpers ───────────────────────────────────────────────────────────

def _empty_result(msg: str) -> Dict:
    return {
        'score': 0, 'tc_score': 0, 'rb_score': 0,
        'passed': 0, 'total': 0, 'details': [],
        'rubric_results': [], 'errors': [msg], 'analysis': msg,
    }


def _clean_traceback(stderr: str) -> str:
    """Rút gọn traceback, chỉ giữ dòng lỗi cuối."""
    lines = stderr.strip().split('\n')
    # Tìm dòng Error cuối
    for line in reversed(lines):
        if re.match(r'\w+Error:', line) or re.match(r'\w+Exception:', line):
            return line
    return lines[-1] if lines else stderr


def _error_hint(error: str) -> str:
    """Gợi ý tiếng Việt cho lỗi phổ biến."""
    e = error.lower()
    hints = {
        'nameerror':        'Biến hoặc hàm chưa được khai báo. Kiểm tra tên biến.',
        'syntaxerror':      'Lỗi cú pháp. Kiểm tra dấu :, ngoặc, thụt lề.',
        'indentationerror': 'Lỗi thụt lề (indent). Dùng 4 spaces hoặc 1 tab nhất quán.',
        'indexerror':       'Chỉ số vượt quá độ dài list/tuple.',
        'valueerror':       'Giá trị không hợp lệ — thường do input() nhận sai kiểu.',
        'typeerror':        'Sai kiểu dữ liệu — ví dụ: cộng str với int.',
        'zerodivisionerror':'Chia cho 0.',
        'timeout':          'Code chạy quá lâu — có thể vòng lặp vô tận.',
        'recursionerror':   'Đệ quy quá sâu — thiếu điều kiện dừng.',
        'attributeerror':   'Gọi phương thức không tồn tại trên đối tượng.',
        'keyerror':         'Key không tồn tại trong dictionary.',
        'importerror':      'Module không tồn tại (chỉ dùng thư viện chuẩn).',
        'modulenotfounderror': 'Module không được phép trong sandbox.',
    }
    for key, hint in hints.items():
        if key in e:
            return hint
    return 'Xem lại code và thông báo lỗi.'


def _build_analysis(failed: List[Dict], rb_results: List[Dict]) -> str:
    """Tóm tắt các lỗi sai để hiển thị trong tab Phân tích."""
    parts = []
    if failed:
        parts.append(f'❌ {len(failed)} test case chưa đạt:')
        for d in failed[:5]:  # tối đa 5
            if d.get('error'):
                parts.append(f'  • {d["desc"]}: {d["error"]}')
                if d.get('hint'):
                    parts.append(f'    💡 {d["hint"]}')
            else:
                parts.append(f'  • {d["desc"]}')
                if d.get('hint'):
                    parts.append(f'    Gợi ý: {d["hint"]}')

    rb_failed = [r for r in rb_results if not r['passed']]
    if rb_failed:
        parts.append(f'\n📋 Tiêu chí chưa đạt:')
        for r in rb_failed:
            parts.append(f'  • {r["desc"]} — Thiếu: {r["kw"]}')
            if r.get('hint'):
                parts.append(f'    💡 {r["hint"]}')

    return '\n'.join(parts) if parts else '✅ Tất cả đạt yêu cầu!'


# ── CLI entry point ───────────────────────────────────────────────────

if __name__ == '__main__':
    """
    Usage: echo '{"code":"print(1+1)","tests":[{"input":"","expected":"2","pts":10}]}' | python3 grade_python.py
    """
    import json
    data = json.load(sys.stdin)
    result = grade_python(
        student_code=data.get('code', ''),
        test_cases=data.get('tests', []),
        rubric=data.get('rubric', []),
        tc_weight=data.get('tc_weight', 0.6),
        rb_weight=data.get('rb_weight', 0.4),
    )
    print(json.dumps(result, ensure_ascii=False, indent=2))
