#!/usr/bin/env python3
"""
grade_python.py — Chấm điểm tự động code Python
══════════════════════════════════════════════════════════════════
Chạy code học sinh trong subprocess riêng biệt, cung cấp stdin,
bắt stdout và so sánh với expected output.

Đặc điểm:
  - Black-box testing: chấm theo đầu ra, không quan tâm cách viết
  - Hỗ trợ đa đầu vào (multiple input() calls)
  - Float tolerance ±0.01 khi so sánh số
  - Timeout 5s mỗi test case
  - Normalize output: bỏ trailing spaces, so sánh line-by-line

Cách dùng:
  result = grade_python_code(student_code, test_cases)
  # result: { score, passed_tests, total_tests, errors, details }

Tích hợp với hệ thống:
  - Browser gọi qua Pyodide (js/runtime/pyodide-worker.js)
  - Script này dùng cho CI/CD hoặc server-side grading

Tác giả: CodeLab THPT Thủ Thiêm
"""

import subprocess
import sys
import os
import tempfile
import math


def normalize_output(s: str) -> str:
    """
    Chuẩn hóa output để so sánh linh hoạt.
    - Bỏ trailing whitespace trên mỗi dòng
    - Bỏ trailing newlines thừa
    - Giữ nguyên số dòng và nội dung
    """
    lines = s.rstrip('\n').split('\n')
    return '\n'.join(line.rstrip() for line in lines)


def outputs_match(actual: str, expected: str) -> bool:
    """
    So sánh output với nhiều mức linh hoạt:
    1. Exact match sau normalize
    2. Float tolerance ±0.01 (cho output 1 số)
    3. Multi-line: so sánh từng dòng với float tolerance
    """
    norm_a = normalize_output(actual)
    norm_e = normalize_output(expected)

    # Level 1: exact
    if norm_a == norm_e:
        return True

    # Level 2: single number float comparison
    try:
        af, ef = float(norm_a), float(norm_e)
        if math.isfinite(af) and math.isfinite(ef) and abs(af - ef) <= 0.01:
            return True
    except (ValueError, TypeError):
        pass

    # Level 3: multi-line float comparison
    lines_a = norm_a.split('\n')
    lines_e = norm_e.split('\n')
    if len(lines_a) == len(lines_e):
        all_match = True
        for la, le in zip(lines_a, lines_e):
            if la == le:
                continue
            try:
                if abs(float(la) - float(le)) <= 0.01:
                    continue
            except (ValueError, TypeError):
                pass
            all_match = False
            break
        if all_match:
            return True

    return False


def grade_python_code(student_code: str, test_cases: list) -> dict:
    """
    Chấm điểm code Python.

    Args:
        student_code: Code Python của học sinh (string)
        test_cases: List các dict, mỗi dict gồm:
            {
              'input': str,     # stdin (dùng \\n ngăn cách các input)
              'expected': str,  # expected stdout
              'pts': int,       # điểm cho test này (default 1)
              'desc': str,      # mô tả test (optional)
              'hint': str,      # gợi ý khi sai (optional)
            }

    Returns:
        {
          'score': float,       # điểm thang 10
          'passed_tests': int,
          'total_tests': int,
          'total_pts': int,     # tổng điểm có thể đạt
          'earned_pts': int,    # điểm thực sự đạt được
          'details': list,      # chi tiết từng test case
          'errors': list,       # danh sách lỗi/thông báo
        }
    """
    if not test_cases:
        return {'score': 0, 'passed_tests': 0, 'total_tests': 0,
                'total_pts': 0, 'earned_pts': 0, 'details': [], 'errors': ['Không có test case']}

    passed = 0
    total_pts = sum(int(tc.get('pts', 1)) for tc in test_cases)
    earned_pts = 0
    details = []
    errors = []

    # Write code to a temp file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False,
                                     encoding='utf-8') as tmp:
        tmp.write(student_code)
        tmp_path = tmp.name

    try:
        for i, tc in enumerate(test_cases):
            pts = int(tc.get('pts', 1))
            stdin_data = tc.get('input', '')
            expected   = tc.get('expected', '')
            desc       = tc.get('desc', f'Test {i+1}')
            hint       = tc.get('hint', '')

            # Normalize expected
            expected_norm = normalize_output(expected)

            result_detail = {
                'index':    i + 1,
                'desc':     desc,
                'pts':      pts,
                'earned':   0,
                'passed':   False,
                'input':    stdin_data,
                'expected': expected,
                'actual':   '',
                'error':    '',
                'hint':     hint,
            }

            try:
                proc = subprocess.run(
                    [sys.executable, tmp_path],
                    input=stdin_data,
                    text=True,
                    capture_output=True,
                    timeout=5,
                    encoding='utf-8',
                    errors='replace',
                )

                actual = proc.stdout
                stderr = proc.stderr.strip()
                result_detail['actual'] = actual

                if proc.returncode != 0 and stderr:
                    result_detail['error'] = stderr[:200]
                    errors.append(f'Test {i+1} [{desc}]: Runtime error — {stderr[:100]}')
                elif outputs_match(actual, expected):
                    result_detail['passed'] = True
                    result_detail['earned'] = pts
                    passed += 1
                    earned_pts += pts
                else:
                    actual_norm = normalize_output(actual)
                    errors.append(
                        f'Test {i+1} [{desc}]:\n'
                        f'  Input:    {repr(stdin_data)}\n'
                        f'  Mong đợi: {repr(expected_norm)}\n'
                        f'  Nhận được: {repr(actual_norm)}'
                    )

            except subprocess.TimeoutExpired:
                result_detail['error'] = 'Time Limit Exceeded (>5s)'
                errors.append(f'Test {i+1} [{desc}]: Quá thời gian (vòng lặp vô hạn?)')

            except Exception as e:
                result_detail['error'] = str(e)
                errors.append(f'Test {i+1} [{desc}]: Lỗi hệ thống — {e}')

            details.append(result_detail)

    finally:
        os.unlink(tmp_path)

    score = round((earned_pts / total_pts) * 10, 1) if total_pts > 0 else 0

    return {
        'score':        score,
        'passed_tests': passed,
        'total_tests':  len(test_cases),
        'total_pts':    total_pts,
        'earned_pts':   earned_pts,
        'details':      details,
        'errors':       errors,
    }


# ── Ví dụ sử dụng ──────────────────────────────────────────────
if __name__ == '__main__':
    # Test 1: Tính tổng hai số
    code_sum = """
a = int(input())
b = int(input())
print(a + b)
"""
    tests_sum = [
        {'input': '5\n10\n',   'expected': '15',  'pts': 2, 'desc': 'Tổng dương'},
        {'input': '-2\n8\n',   'expected': '6',   'pts': 2, 'desc': 'Có số âm'},
        {'input': '0\n0\n',    'expected': '0',   'pts': 1, 'desc': 'Hai số 0'},
        {'input': '100\n200\n','expected': '300', 'pts': 2, 'desc': 'Số lớn'},
        {'input': '-5\n-3\n',  'expected': '-8',  'pts': 3, 'desc': 'Cả hai âm'},
    ]
    result = grade_python_code(code_sum, tests_sum)
    print(f"Điểm: {result['score']}/10")
    print(f"Pass: {result['passed_tests']}/{result['total_tests']}")
    if result['errors']:
        print("Lỗi:")
        for e in result['errors']:
            print(f"  - {e}")

    print()

    # Test 2: Tính điểm trung bình + xếp loại
    code_grade = """
d1 = float(input())
d2 = float(input())
d3 = float(input())
tb = (d1 + d2 + d3) / 3
if tb >= 8:
    xl = "Gioi"
elif tb >= 6.5:
    xl = "Kha"
elif tb >= 5:
    xl = "TB"
else:
    xl = "Yeu"
print(f"{tb:.2f}")
print(xl)
"""
    tests_grade = [
        {'input': '9\n8\n10\n', 'expected': '9.00\nGioi', 'pts': 3},
        {'input': '7\n6.5\n8\n','expected': '7.17\nKha',  'pts': 3},
        {'input': '4\n5\n6\n',  'expected': '5.00\nTB',   'pts': 2},
        {'input': '3\n4\n2\n',  'expected': '3.00\nYeu',  'pts': 2},
    ]
    result2 = grade_python_code(code_grade, tests_grade)
    print(f"Bài 2 - Điểm: {result2['score']}/10")
    print(f"Pass: {result2['passed_tests']}/{result2['total_tests']}")
