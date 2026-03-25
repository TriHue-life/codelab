#!/usr/bin/env python3
"""
grade_sql.py — Chấm điểm tự động SQL v2.0
══════════════════════════════════════════════════════════════════
Đặc điểm v2:
  ✓ Dùng sqlite3 in-memory để chạy SQL học sinh
  ✓ Order-insensitive: so sánh result set, không quan tâm thứ tự
  ✓ Column alias flexible: tên cột khác nhau vẫn đúng nếu dữ liệu đúng
  ✓ Partial credit theo số dòng đúng
  ✓ Schema setup tự động từ test case
  ✓ Error hints tiếng Việt
  ✓ SELECT/INSERT/UPDATE/DELETE/CREATE support
"""

import sqlite3, sys, json, re
from typing import List, Dict, Any, Optional


# ── SQL Runner ────────────────────────────────────────────────────────

def run_sql(
    student_sql: str,
    setup_sql: str = '',
    expected_rows: Optional[List] = None,
    expected_cols: Optional[List[str]] = None,
) -> Dict:
    """
    Chạy SQL trong SQLite in-memory.
    Returns: { rows, cols, error, rowcount }
    """
    conn = sqlite3.connect(':memory:')
    conn.row_factory = sqlite3.Row
    try:
        cur = conn.cursor()
        # Setup schema + data
        if setup_sql.strip():
            for stmt in _split_statements(setup_sql):
                if stmt.strip():
                    cur.execute(stmt)
            conn.commit()

        # Run student query
        stmts = _split_statements(student_sql)
        last_result = {'rows': [], 'cols': [], 'rowcount': 0}

        for stmt in stmts:
            stmt = stmt.strip()
            if not stmt:
                continue
            cur.execute(stmt)
            if cur.description:  # SELECT
                rows = [list(r) for r in cur.fetchall()]
                cols = [d[0] for d in cur.description]
                last_result = {'rows': rows, 'cols': cols, 'rowcount': len(rows), 'error': None}
            else:  # DML/DDL
                conn.commit()
                last_result = {'rows': [], 'cols': [], 'rowcount': cur.rowcount, 'error': None}

        return last_result
    except sqlite3.OperationalError as e:
        return {'rows': [], 'cols': [], 'rowcount': 0, 'error': f'Lỗi SQL: {str(e)}'}
    except sqlite3.ProgrammingError as e:
        return {'rows': [], 'cols': [], 'rowcount': 0, 'error': f'Lỗi cú pháp SQL: {str(e)}'}
    except Exception as e:
        return {'rows': [], 'cols': [], 'rowcount': 0, 'error': str(e)}
    finally:
        conn.close()


def _split_statements(sql: str) -> List[str]:
    """Tách multiple SQL statements ngăn cách bởi ';'."""
    # Xử lý string literals có chứa ';'
    stmts, current, in_str, str_char = [], [], False, None
    for char in sql:
        if in_str:
            current.append(char)
            if char == str_char:
                in_str = False
        elif char in ("'", '"'):
            in_str, str_char = True, char
            current.append(char)
        elif char == ';':
            stmts.append(''.join(current).strip())
            current = []
        else:
            current.append(char)
    if ''.join(current).strip():
        stmts.append(''.join(current).strip())
    return stmts


# ── Comparators ───────────────────────────────────────────────────────

def rows_match_ordered(actual: List, expected: List) -> tuple[bool, str]:
    """So sánh có thứ tự (khi query có ORDER BY)."""
    if len(actual) != len(expected):
        return False, f'Số dòng: thực tế {len(actual)}, mong đợi {len(expected)}'
    for i, (a, e) in enumerate(zip(actual, expected)):
        if not _row_equal(a, e):
            return False, f'Dòng {i+1}: {a} ≠ {e}'
    return True, ''


def rows_match_unordered(actual: List, expected: List) -> tuple[bool, str]:
    """So sánh không thứ tự (result set equality)."""
    if len(actual) != len(expected):
        return False, f'Số dòng: thực tế {len(actual)}, mong đợi {len(expected)}'

    used = [False] * len(expected)
    for a_row in actual:
        found = False
        for j, e_row in enumerate(expected):
            if not used[j] and _row_equal(a_row, e_row):
                used[j] = True
                found = True
                break
        if not found:
            return False, f'Dòng {a_row} không có trong kết quả mong đợi'
    return True, ''


def _row_equal(a, e) -> bool:
    """So sánh 2 rows, flexible với float."""
    if len(a) != len(e):
        return False
    for av, ev in zip(a, e):
        # Normalize
        av_s = str(av).strip() if av is not None else 'NULL'
        ev_s = str(ev).strip() if ev is not None else 'NULL'
        if av_s == ev_s:
            continue
        try:
            if abs(float(av_s) - float(ev_s)) <= 0.01:
                continue
        except (ValueError, TypeError):
            pass
        # Case insensitive for strings
        if av_s.lower() == ev_s.lower():
            continue
        return False
    return True


# ── Main grader ───────────────────────────────────────────────────────

def grade_sql(
    student_sql: str,
    test_cases: List[Dict],
    rubric: Optional[List[Dict]] = None,
) -> Dict:
    """
    Chấm điểm SQL.

    test_cases: [{
        setup: str,          # CREATE TABLE + INSERT statements
        expected_rows: list, # [[col1, col2, ...], ...]
        expected_cols: list, # ['col1', 'col2']
        ordered: bool,       # True nếu cần đúng thứ tự
        pts: int,
        desc: str,
    }]
    """
    if not student_sql or not student_sql.strip():
        return _empty_result('Chưa có SQL để chấm.')

    rubric = rubric or []
    details, errors = [], []
    passed, total_pts, earned_pts = 0, 0, 0

    for i, tc in enumerate(test_cases):
        setup    = tc.get('setup', '') or ''
        exp_rows = tc.get('expected_rows', []) or []
        exp_cols = tc.get('expected_cols', []) or []
        ordered  = tc.get('ordered', False)
        pts      = tc.get('pts', 1)
        desc     = tc.get('desc', f'Test {i+1}')
        total_pts += pts

        result = run_sql(student_sql, setup_sql=setup)

        if result.get('error'):
            hint = _sql_hint(result['error'])
            details.append({
                'idx': i, 'desc': desc, 'passed': False, 'pts': 0,
                'error': result['error'], 'hint': hint,
                'actual_rows': [], 'expected_rows': exp_rows,
            })
            errors.append(result['error'])
            continue

        act_rows = result['rows']

        if ordered:
            ok, hint = rows_match_ordered(act_rows, exp_rows)
        else:
            ok, hint = rows_match_unordered(act_rows, exp_rows)

        if ok:
            passed += 1
            earned_pts += pts

        details.append({
            'idx': i, 'desc': desc, 'passed': ok,
            'pts': pts if ok else 0,
            'actual_rows': act_rows,
            'actual_cols': result.get('cols', []),
            'expected_rows': exp_rows,
            'expected_cols': exp_cols,
            'error': None,
            'hint': hint if not ok else '',
        })

    # Rubric keyword
    rb_results = _check_sql_keywords(student_sql, rubric)
    total_rb = sum(r['pts'] for r in rb_results) or 0
    earned_rb = sum(r['pts'] for r in rb_results if r['passed'])

    # Score 0-10
    if test_cases and total_pts > 0:
        tc_score = (earned_pts / total_pts) * 10
    else:
        tc_score = 0

    if total_rb > 0:
        rb_score = (earned_rb / total_rb) * 10 * 0.3
        score = round(min(10, tc_score * 0.7 + rb_score), 2)
    else:
        score = round(tc_score, 2)

    failed = [d for d in details if not d['passed']]
    analysis = _build_sql_analysis(failed, rb_results)

    return {
        'score': score,
        'passed': passed,
        'total': len(test_cases),
        'details': details,
        'rubric_results': rb_results,
        'errors': errors,
        'analysis': analysis,
    }


def _check_sql_keywords(sql: str, rubric: List[Dict]) -> List[Dict]:
    sql_upper = sql.upper()
    results = []
    for item in rubric:
        kw = item.get('kw', '').upper()
        found = kw in sql_upper
        results.append({
            'kw': kw, 'pts': item.get('pts', 0),
            'desc': item.get('desc', kw),
            'passed': found,
        })
    return results


def _sql_hint(error: str) -> str:
    e = error.lower()
    hints = {
        'no such table':    'Bảng không tồn tại. Kiểm tra tên bảng (case-sensitive).',
        'no such column':   'Cột không tồn tại. Kiểm tra tên cột.',
        'syntax error':     'Lỗi cú pháp SQL. Kiểm tra SELECT, FROM, WHERE, GROUP BY...',
        'near':             'Lỗi cú pháp gần từ khóa đó.',
        'ambiguous':        'Tên cột mơ hồ — hãy thêm tên bảng: table.column',
        'unique constraint':'Vi phạm ràng buộc UNIQUE.',
        'not null':         'Cột NOT NULL không thể để trống.',
    }
    for key, hint in hints.items():
        if key in e:
            return hint
    return 'Xem lại cú pháp SQL.'


def _build_sql_analysis(failed: List[Dict], rb_results: List[Dict]) -> str:
    parts = []
    if failed:
        parts.append(f'❌ {len(failed)} test chưa đạt:')
        for d in failed[:5]:
            if d.get('error'):
                parts.append(f'  • {d["desc"]}: {d["error"]}')
                if d.get('hint'):
                    parts.append(f'    💡 {d["hint"]}')
            else:
                parts.append(f'  • {d["desc"]}: kết quả khác mong đợi')
                if d.get('hint'):
                    parts.append(f'    {d["hint"]}')
    rb_failed = [r for r in rb_results if not r['passed']]
    if rb_failed:
        parts.append('\n📋 Thiếu:')
        for r in rb_failed:
            parts.append(f'  • Nên dùng: {r["kw"]}')
    return '\n'.join(parts) if parts else '✅ Kết quả đúng!'


def _empty_result(msg: str) -> Dict:
    return {
        'score': 0, 'passed': 0, 'total': 0,
        'details': [], 'rubric_results': [],
        'errors': [msg], 'analysis': msg,
    }


if __name__ == '__main__':
    data = json.load(sys.stdin)
    result = grade_sql(
        student_sql=data.get('code', ''),
        test_cases=data.get('tests', []),
        rubric=data.get('rubric', []),
    )
    print(json.dumps(result, ensure_ascii=False, indent=2))
