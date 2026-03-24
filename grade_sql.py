#!/usr/bin/env python3
"""
grade_sql.py — Chấm điểm tự động SQL
══════════════════════════════════════════════════════════════════
Tạo SQLite in-memory, chạy query thật của học sinh, so sánh với
kết quả của query mẫu. Không so sánh chuỗi SQL — chỉ so kết quả.

Đặc điểm:
  - Black-box testing: chấm theo kết quả truy vấn
  - Bỏ qua thứ tự dòng nếu học sinh không dùng ORDER BY
  - So sánh cột: case-insensitive tên cột
  - Hỗ trợ multiple test cases với các DB khác nhau
  - Phân tích lỗi cú pháp và gợi ý sửa lỗi

Tác giả: CodeLab THPT Thủ Thiêm
"""

import sqlite3
import re
from typing import Any


def normalize_cell(val: Any) -> str:
    """Chuẩn hóa giá trị cell để so sánh."""
    if val is None:
        return 'NULL'
    if isinstance(val, float):
        if val == int(val):
            return str(int(val))
        return f'{val:.4f}'.rstrip('0').rstrip('.')
    return str(val).strip()


def normalize_row(row: tuple) -> tuple:
    """Chuẩn hóa một dòng dữ liệu."""
    return tuple(normalize_cell(v) for v in row)


def rows_match(expected: list, actual: list, student_query: str) -> bool:
    """So sánh hai tập hợp dòng, xử lý ORDER BY."""
    if len(expected) != len(actual):
        return False

    exp_norm = [normalize_row(r) for r in expected]
    act_norm = [normalize_row(r) for r in actual]

    # Nếu có ORDER BY trong query của học sinh → so sánh theo thứ tự
    has_order = bool(re.search(r'\bORDER\s+BY\b', student_query, re.IGNORECASE))
    if has_order:
        return exp_norm == act_norm

    # Không có ORDER BY → sort cả hai rồi so sánh
    return sorted(exp_norm) == sorted(act_norm)


def columns_match(expected_cols: list, actual_cols: list) -> bool:
    """So sánh tên cột (case-insensitive)."""
    if len(expected_cols) != len(actual_cols):
        return False
    return [c.lower().strip() for c in expected_cols] == [c.lower().strip() for c in actual_cols]


def grade_sql_query(student_query: str, correct_query: str, db_init_script: str,
                    allow_order_mismatch: bool = True) -> dict:
    """
    Chấm điểm câu truy vấn SQL.

    Args:
        student_query:   Câu SQL của học sinh
        correct_query:   Câu SQL mẫu (đúng)
        db_init_script:  Script tạo bảng + INSERT dữ liệu (SQLite)
        allow_order_mismatch: Cho phép thứ tự dòng khác nhau (mặc định True)

    Returns:
        {
          'score': float,           # 0 hoặc 10
          'passed': bool,
          'cols_match': bool,
          'rows_match': bool,
          'expected_cols': list,
          'expected_rows': list,
          'actual_cols': list,
          'actual_rows': list,
          'syntax_error': str,      # lỗi cú pháp nếu có
          'row_count_match': bool,
          'errors': list,
          'hints': list,
        }
    """
    errors = []
    hints  = []

    conn = sqlite3.connect(':memory:')
    try:
        cursor = conn.cursor()

        # Khởi tạo database
        cursor.executescript(db_init_script)
        conn.commit()

        # Chạy câu mẫu để lấy kết quả chuẩn
        try:
            cursor.execute(correct_query)
            expected_cols = [desc[0] for desc in cursor.description or []]
            expected_rows = cursor.fetchall()
        except Exception as e:
            conn.close()
            return {
                'score': 0, 'passed': False,
                'syntax_error': f'Lỗi câu mẫu (giáo viên): {e}',
                'errors': [str(e)], 'hints': [],
                'expected_cols': [], 'expected_rows': [],
                'actual_cols': [], 'actual_rows': [],
                'cols_match': False, 'rows_match': False, 'row_count_match': False,
            }

        # Chạy câu của học sinh
        try:
            cursor.execute(student_query.strip())
            actual_cols = [desc[0] for desc in cursor.description or []]
            actual_rows = cursor.fetchall()
        except sqlite3.Error as e:
            err_msg = str(e)
            # Phân tích lỗi phổ biến và gợi ý
            if 'no such table' in err_msg.lower():
                table_name = re.search(r'no such table: (\S+)', err_msg, re.IGNORECASE)
                if table_name:
                    hints.append(f'Bảng "{table_name.group(1)}" không tồn tại. Kiểm tra tên bảng trong đề bài.')
            elif 'no such column' in err_msg.lower():
                col_name = re.search(r'no such column: (\S+)', err_msg, re.IGNORECASE)
                if col_name:
                    hints.append(f'Cột "{col_name.group(1)}" không tồn tại. Kiểm tra tên cột.')
            elif 'syntax error' in err_msg.lower():
                hints.append('Lỗi cú pháp SQL. Kiểm tra dấu phẩy, từ khóa và dấu nháy.')

            return {
                'score': 0, 'passed': False,
                'syntax_error': err_msg,
                'errors': [f'Lỗi SQL: {err_msg}'],
                'hints': hints,
                'expected_cols': expected_cols, 'expected_rows': expected_rows,
                'actual_cols': [], 'actual_rows': [],
                'cols_match': False, 'rows_match': False, 'row_count_match': False,
            }

        # So sánh kết quả
        col_ok = columns_match(expected_cols, actual_cols)
        row_count_ok = len(expected_rows) == len(actual_rows)
        row_ok = rows_match(expected_rows, actual_rows, student_query) if col_ok else False

        passed = col_ok and row_ok

        # Gợi ý cụ thể khi sai
        if not col_ok:
            errors.append(
                f'Cột không đúng.\n'
                f'  Mong đợi: {expected_cols}\n'
                f'  Nhận được: {actual_cols}'
            )
            hints.append('Kiểm tra mệnh đề SELECT — tên và số lượng cột phải khớp.')
        elif not row_count_ok:
            errors.append(
                f'Số dòng không đúng: mong đợi {len(expected_rows)}, nhận được {len(actual_rows)}'
            )
            hints.append('Kiểm tra mệnh đề WHERE hoặc JOIN — có thể đang lọc sai điều kiện.')
        elif not row_ok:
            errors.append('Dữ liệu không đúng. Cột đúng nhưng giá trị trong dòng khác nhau.')
            hints.append('Kiểm tra lại điều kiện WHERE, phép JOIN, hoặc hàm tính toán.')

        score = 10.0 if passed else (4.0 if col_ok else 0.0)

        return {
            'score': score,
            'passed': passed,
            'cols_match': col_ok,
            'rows_match': row_ok,
            'row_count_match': row_count_ok,
            'expected_cols': expected_cols,
            'expected_rows': [list(r) for r in expected_rows[:20]],  # limit display
            'actual_cols': actual_cols,
            'actual_rows': [list(r) for r in actual_rows[:20]],
            'syntax_error': '',
            'errors': errors,
            'hints': hints,
        }

    finally:
        conn.close()


def grade_sql_multiple(student_query: str, exercise: dict) -> dict:
    """
    Chấm bài SQL từ exercise object (dùng trong server).

    exercise: {
        'solution':   str (correct SQL),
        'sample_db':  str (init script),
        'rb':         list (rubric, optional)
    }
    """
    solution  = exercise.get('solution', '')
    sample_db = exercise.get('sample_db', '')

    if not solution or not sample_db:
        raise ValueError('Exercise thiếu solution hoặc sample_db')

    return grade_sql_query(student_query, solution, sample_db)


# ── Ví dụ sử dụng ──────────────────────────────────────────────
if __name__ == '__main__':
    init_db = """
    CREATE TABLE nhacsi (Aid INTEGER PRIMARY KEY, TenNS VARCHAR(64));
    CREATE TABLE bannhac (Mid CHAR(4) PRIMARY KEY, Aid INTEGER, TenBN VARCHAR(128));
    INSERT INTO nhacsi VALUES (1,'Trịnh Công Sơn'),(2,'Văn Cao'),(3,'Phú Quang');
    INSERT INTO bannhac VALUES ('001',1,'Nối vòng tay lớn'),('002',1,'Diễm xưa'),
                               ('003',2,'Tiến về Hà Nội'),('004',3,'Em ơi Hà Nội phố');
    """

    # Test 1: Đúng hoàn toàn
    result1 = grade_sql_query(
        student_query="SELECT TenNS FROM nhacsi WHERE Aid = 1",
        correct_query="SELECT TenNS FROM nhacsi WHERE Aid = 1",
        db_init_script=init_db
    )
    print(f"Test 1 (đúng): {result1['score']}/10 — Pass: {result1['passed']}")

    # Test 2: Đúng kết quả nhưng cú pháp khác
    result2 = grade_sql_query(
        student_query="select tenns from NHACSI where aid=1",  # lowercase
        correct_query="SELECT TenNS FROM nhacsi WHERE Aid = 1",
        db_init_script=init_db
    )
    print(f"Test 2 (lowercase): {result2['score']}/10 — Pass: {result2['passed']}")

    # Test 3: Sai WHERE
    result3 = grade_sql_query(
        student_query="SELECT TenNS FROM nhacsi WHERE Aid > 1",
        correct_query="SELECT TenNS FROM nhacsi WHERE Aid = 1",
        db_init_script=init_db
    )
    print(f"Test 3 (sai điều kiện): {result3['score']}/10 — Pass: {result3['passed']}")
    if result3['errors']:
        print(f"  Lỗi: {result3['errors'][0]}")

    # Test 4: Lỗi cú pháp
    result4 = grade_sql_query(
        student_query="SELCT TenNS FORM nhacsi",
        correct_query="SELECT TenNS FROM nhacsi",
        db_init_script=init_db
    )
    print(f"Test 4 (syntax error): {result4['score']}/10")
    print(f"  Syntax error: {result4['syntax_error']}")
