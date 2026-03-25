// exercises.js — Exercise Database + Theory DB
// 576 bài tập · 32 chủ đề · 6 mức Bloom · THPT Thủ Thiêm

// ── THEORY DB ───────────────────────────────────────────────────────────
const THEORY = {
  'Bài 16: Ngôn ngữ Python':`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,
  'Bài 17: Biến và lệnh gán':`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,
  'Bài 17: Mảng 1&2 chiều':`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,
  'Bài 18: TH dữ liệu mảng':`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,
  'Bài 18: Vào ra đơn giản':`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,
  'Bài 19: Bài toán tìm kiếm':`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,
  'Bài 19: Câu lệnh if':`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,
  'Bài 20: Câu lệnh for':`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,
  'Bài 20: TH tìm kiếm':`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,
  'Bài 21: Câu lệnh while':`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,
  'Bài 21: Sắp xếp đơn giản':`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,
  'Bài 22: Kiểu danh sách':`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,
  'Bài 22: TH sắp xếp':`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,
  'Bài 23: Kiểm thử & đánh giá':`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,
  'Bài 23: Lệnh với list':`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,
  'Bài 24: Xâu ký tự':`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,
  'Bài 24: Độ phức tạp TG':`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,
  'Bài 25: Lệnh với xâu':`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,
  'Bài 25: TH độ phức tạp':`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,
  'Bài 26: Hàm trong Python':`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,
  'Bài 26: Làm mịn dần':`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,
  'Bài 27: TH làm mịn dần':`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,
  'Bài 27: Tham số hàm':`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,
  'Bài 28: Phạm vi biến':`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,
  'Bài 28: Thiết kế mô-đun':`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,
  'Bài 29: Nhận biết lỗi':`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,
  'Bài 29: TH thiết kế mô-đun':`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,
  'Bài 30: Kiểm thử & gỡ lỗi':`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,
  'Bài 30: Thư viện':`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,
  'Bài 31: TH thư viện':`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,
  'Bài 31: Thực hành viết CT':`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,
  'Bài 32: Ôn tập':`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,
};

// ── EXERCISES ──────────────────────────────────────────────────────────
const EXERCISES = [
/* ─── K10 ─── */
/* Bài 17: Biến và lệnh gán */
{id:'k10-17-b1-1_1',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B1 – Nhận biết',num:'1.1',title:'Tính giá trị biểu thức',desc:`<b>Đề bài:</b> Cho <code>x = 10</code>, <code>y = 3</code>. Tính và in ra 7 giá trị: <code>a=x+y</code>, <code>b=x-y</code>, <code>c=x*y</code>, <code>d=x/y</code>, <code>e=x//y</code>, <code>f=x%y</code>, <code>g=x**2</code>.<br><b>Input:</b> Không có (giá trị cố định x=10, y=3)<br><b>Output:</b><pre class="ex-code">13
7
30
3.3333333333333335
3
1
100</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'In đúng 7 kết quả với print()',kw:'print',pts:4,hint:''},{desc:'Dùng đúng 7 toán tử (+,-,*,/,//,%,**)',kw:'**',pts:4,hint:''},{desc:'Có chú thích # giải thích',kw:'#',pts:2,hint:''}],
  tc:[{input:'',expected:'13\n7\n30\n3.3333333333333335\n3\n1\n100',pts:10,desc:'Tính đúng 7 phép toán'}],errors:['Nhầm <code>//</code> (chia nguyên) với <code>/</code> (chia thực)','Nhầm <code>**</code> (lũy thừa) với <code>^</code> (XOR trong Python)']},
{id:'k10-17-b1-1_2',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết kiểu dữ liệu',desc:`<b>Đề bài:</b> Gán các biến sau rồi dùng <code>type()</code> in ra kiểu dữ liệu của từng biến:<br>• <code>ten = "Nguyễn An"</code><br>• <code>tuoi = 16</code><br>• <code>diem = 8.5</code><br>• <code>la_hoc_sinh = True</code><br><b>Input:</b> Không có<br><b>Output (gợi ý):</b><pre class="ex-code">&lt;class 'str'&gt;
&lt;class 'int'&gt;
&lt;class 'float'&gt;
&lt;class 'bool'&gt;</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'Khai báo đủ 4 biến đúng kiểu',kw:'True',pts:3,hint:''},{desc:'Dùng type() in kiểu dữ liệu',kw:'type',pts:4,hint:''},{desc:'In đúng 4 kiểu',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],
  tc:[{input:'',expected:"<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>",pts:10,desc:'Đúng 4 kiểu dữ liệu'}],errors:['Nhầm chuỗi: <code>ten = Nguyen An</code> (thiếu dấu nháy)','Nhầm bool: <code>True</code> (chữ hoa T) không phải <code>true</code>']},
{id:'k10-17-b1-1_3',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B1 – Nhận biết',num:'1.3',title:'Gán đồng thời nhiều biến',desc:`<b>Đề bài:</b> Thực hiện:<br>1. Gán đồng thời <code>a, b, c = 5, 10, 15</code> trên MỘT dòng duy nhất<br>2. In tổng <code>a + b + c</code><br>3. Hoán đổi <code>a</code> và <code>b</code> không dùng biến phụ, in kết quả sau hoán đổi.<br><b>Input:</b> Không có<br><b>Output:</b><pre class="ex-code">30
a=10, b=5</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'Gán đồng thời a,b,c trên 1 dòng',kw:'a, b, c',pts:4,hint:''},{desc:'In đúng tổng 30',kw:'print',pts:3,hint:''},{desc:'Hoán đổi không dùng biến phụ',kw:'a, b = b, a',pts:3,hint:''}],
  tc:[{input:'',expected:'30\na=10, b=5',pts:10,desc:'Gán đồng thời và hoán vị'}],errors:['Dùng biến phụ khi hoán đổi (không dùng kỹ thuật gán đồng thời)','Viết <code>a,b,c=5,10,15</code> (thiếu khoảng trắng — vẫn chạy được nhưng khó đọc)']},
{id:'k10-17-b2-2_1',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B2 – Hiểu',num:'2.1',title:'Trace giá trị biến qua nhiều lệnh gán',desc:`<b>Đề bài:</b> Đọc code sau, dự đoán rồi chạy kiểm tra — in ra giá trị cuối của x, y, z:<pre class="ex-code">x = 5
y = x + 3
x = x * 2
z = x - y
y = z ** 2</pre><b>Input:</b> Không có<br><b>Output:</b><pre class="ex-code">x = 10
y = 4
z = 2</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'In đúng x=10',kw:'print',pts:3,hint:''},{desc:'In đúng y=4',kw:'print',pts:4,hint:''},{desc:'In đúng z=2',kw:'print',pts:3,hint:''}],
  tc:[{input:'',expected:'x = 10\ny = 4\nz = 2',pts:10,desc:'Gán và tính đúng 3 biến'}],errors:['Tính sai vì không chú ý thứ tự: x đã đổi sang 10 trước khi tính z','Nhầm <code>z = x - y = 10 - 8 = 2</code> (y lúc này vẫn là 8, chưa cập nhật)']},
{id:'k10-17-b2-2_2',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích thứ tự ưu tiên toán tử',desc:`<b>Đề bài:</b> Tính và in kết quả THỰC TẾ của 2 biểu thức sau, giải thích tại sao kết quả khác kỳ vọng:<br>• <code>ket_qua_1 = 7 + 8 + 9 / 3</code> (kỳ vọng: 8.0, thực tế: ?)<br>• <code>ket_qua_2 = 2 + 3 ** 2 * 4</code> (kỳ vọng: 100, thực tế: ?)<br>Sau đó viết lại biểu thức đúng bằng dấu ngoặc.<br><b>Output:</b><pre class="ex-code">Thực tế 1: 18.0 → Đúng: 8.0
Thực tế 2: 38 → Đúng: 100</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'In đúng kết quả thực tế 18.0 và 38',kw:'18.0',pts:3,hint:''},{desc:'Sửa đúng biểu thức 1: (7+8+9)/3',kw:'(7',pts:3,hint:''},{desc:'Sửa đúng biểu thức 2: (2+3)**2*4',kw:'(2',pts:4,hint:''}],
  tc:[{input:'',expected:'Thực tế 1: 18.0 → Đúng: 8.0\nThực tế 2: 38 → Đúng: 100',pts:10,desc:'Output đúng'}],errors:['Không biết ưu tiên: <code>**</code> > <code>*,/</code> > <code>+,-</code>','Thêm ngoặc sai chỗ']},
{id:'k10-17-b2-2_3',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B2 – Hiểu',num:'2.3',title:'Tính chu vi và diện tích hình chữ nhật',desc:`<b>Đề bài:</b> Nhập chiều dài <code>dai</code> và chiều rộng <code>rong</code> (số thực). Tính và in chu vi, diện tích hình chữ nhật.<br><b>Input:</b> 2 số thực trên 2 dòng<br><b>Ví dụ input:</b><pre class="ex-code">5.0
3.0</pre><b>Output:</b><pre class="ex-code">Chu vi = 16.0
Diện tích = 15.0</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Áp dụng
NHẬP dữ liệu vào biến (input)
TÍNH toán sử dụng các toán tử
IN kết quả ra màn hình (print)</pre>`,rb:[{desc:'Nhập float bằng float(input())',kw:'float',pts:3,hint:''},{desc:'Tính đúng chu vi = 2*(dai+rong)',kw:'chu_vi',pts:3,hint:''},{desc:'Tính đúng diện tích = dai*rong',kw:'dien_tich',pts:3,hint:''},{desc:'In kết quả đúng định dạng',kw:'print',pts:1,hint:''}],
  tc:[{input:'3\n5\n',expected:'Chu vi = 16.0\nDiện tích = 15.0',pts:10,desc:'Input: chiều dài 3, chiều rộng 5'}],errors:['Dùng <code>input()</code> không ép kiểu → TypeError khi tính','Công thức sai: <code>dai + rong</code> thay vì <code>2*(dai+rong)</code>']},
{id:'k10-17-b3-3_1',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B3 – Áp dụng',num:'3.1',title:'Tính điểm trung bình và xếp loại',desc:`<b>Đề bài:</b> Nhập điểm 3 bài kiểm tra (số thực 0–10). Tính điểm trung bình và xếp loại: ≥8.5=Giỏi, ≥6.5=Khá, ≥5.0=Trung bình, còn lại=Yếu.<br><b>Input:</b> 3 số thực, mỗi số 1 dòng<br><b>Ví dụ:</b><pre class="ex-code">8.0
9.0
7.5</pre><b>Output:</b><pre class="ex-code">Điểm TB = 8.17
Xếp loại: Giỏi</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Áp dụng
NHẬP dữ liệu vào biến (input)
TÍNH toán sử dụng các toán tử
IN kết quả ra màn hình (print)</pre>`,rb:[{desc:'Nhập 3 điểm bằng float(input())',kw:'float',pts:2,hint:''},{desc:'Tính TB = (d1+d2+d3)/3',kw:'d1',pts:2,hint:''},{desc:'Dùng if-elif-else phân loại',kw:'if',pts:3,hint:''},{desc:'In TB đúng 2 chữ số thập phân',kw:':.2f',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],
  tc:[{input:'8.0\n9.0\n7.5\n',expected:'Điểm TB = 8.17\nXếp loại: Giỏi',pts:10,desc:'Output đúng'}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (dùng Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: <code>int(input())</code> thay vì <code>input()</code>']},
{id:'k10-17-b3-3_2',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B3 – Áp dụng',num:'3.2',title:'Đổi đơn vị nhiệt độ',desc:`<b>Đề bài:</b> Nhập nhiệt độ Celsius (C). Tính và in:<br>• Fahrenheit: <code>F = C * 9/5 + 32</code><br>• Kelvin: <code>K = C + 273.15</code><br><b>Input:</b> 1 số thực<br><b>Ví dụ:</b><pre class="ex-code">100</pre><b>Output:</b><pre class="ex-code">Fahrenheit = 212.0
Kelvin = 373.15</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Áp dụng
NHẬP dữ liệu vào biến (input)
TÍNH toán sử dụng các toán tử
IN kết quả ra màn hình (print)</pre>`,rb:[{desc:'Nhập C bằng float(input())',kw:'float',pts:2,hint:''},{desc:'Tính đúng F = C*9/5+32',kw:'F',pts:4,hint:''},{desc:'Tính đúng K = C+273.15',kw:'K',pts:3,hint:''},{desc:'In đúng 2 kết quả',kw:'print',pts:1,hint:''}],
  tc:[{input:'100\n',expected:'Fahrenheit = 212.0\nKelvin = 373.15',pts:10,desc:'100°C → Fahrenheit và Kelvin'}],errors:['Sai thứ tự toán tử: <code>C*9/5+32</code> đúng, <code>C*9/(5+32)</code> sai','Quên ép kiểu float khi nhập']},
{id:'k10-17-b3-3_3',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B3 – Áp dụng',num:'3.3',title:'Tính tiền điện bậc thang',desc:`<b>Đề bài:</b> Nhập số kWh. Tính tiền điện theo bậc thang:<br>• 0–50 kWh: 1.678đ/kWh<br>• 51–100 kWh: 1.734đ/kWh (phần vượt 50)<br>• >100 kWh: 2.014đ/kWh (phần vượt 100)<br><b>Input:</b> Số kWh (số thực)<br><b>Ví dụ:</b><pre class="ex-code">120</pre><b>Output:</b><pre class="ex-code">Tiền điện = 210880 đồng</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Áp dụng
NHẬP dữ liệu vào biến (input)
TÍNH toán sử dụng các toán tử
IN kết quả ra màn hình (print)</pre>`,rb:[{desc:'Nhập kWh bằng float(input())',kw:'float',pts:1,hint:''},{desc:'Dùng if-elif tính đúng 3 bậc',kw:'elif',pts:4,hint:''},{desc:'Tính đúng: 50×1678+50×1734+20×2014=210880',kw:'1678',pts:3,hint:''},{desc:'In kết quả dạng số nguyên',kw:'int',pts:2,hint:''}],
  tc:[{input:'120\n',expected:'Tiền điện = 210880 đồng',pts:10,desc:'120 kWh → tính tiền đúng'}],errors:['Tính sai phần vượt: phải là <code>(kwh-50)*1734</code> không phải <code>kwh*1734</code>','Nhầm đơn giá: nhân toàn bộ kwh với giá bậc cao nhất']},
{id:'k10-17-b4-4_1',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic trong tính lương',desc:`<b>Đề bài:</b> Code tính lương sau có <b>3 lỗi logic</b>. Tìm, giải thích và sửa:<pre class="ex-code">luong = float(input("Lương cơ bản: "))
he_so = float(input("Hệ số: "))
bao_hiem = luong * 10.5         # Lỗi 1
luong_thuc = luong + he_so       # Lỗi 2
if luong_thuc > 11000:           # Lỗi 3
    thue = (luong_thuc - 11000) * 0.05
print(luong_thuc - thue)</pre><b>Input:</b> Lương=5000000, hệ số=2.34<br><b>Output sau sửa:</b> Lương thực ≈ 9,995,875`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'Sửa lỗi 1: bảo hiểm = lương*hệ_số*0.105',kw:'0.105',pts:3,hint:''},{desc:'Sửa lỗi 2: lương_thực = lương*hệ_số - bảo_hiểm',kw:'he_so',pts:4,hint:''},{desc:'Sửa lỗi 3: ngưỡng thuế = 11_000_000',kw:'11000000',pts:3,hint:''}],errors:['Không nhận ra sự khác biệt giữa <code>11000</code> và <code>11_000_000</code>']},
{id:'k10-17-b4-4_2',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích code tính BMI',desc:`<b>Đề bài:</b> Code tính BMI sau chạy được nhưng cho kết quả sai. Phân tích nguyên nhân và sửa:<pre class="ex-code">can = float(input("Cân nặng (kg): "))
cao = float(input("Chiều cao (cm): "))  # Nhập cm!
bmi = can / cao ** 2
print(f"BMI = {bmi:.2f}")</pre><b>Yêu cầu:</b> Sửa để nhận chiều cao tính bằng <b>mét</b>, BMI công thức: <code>kg/m²</code>.<br><b>Ví dụ:</b> 70kg, 1.75m → BMI = 22.86`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'Sửa nhập chiều cao bằng mét (không chia 100)',kw:'cao',pts:3,hint:''},{desc:'Công thức BMI đúng: can/cao**2',kw:'can',pts:4,hint:''},{desc:'Kiểm tra hợp lệ: cao > 0',kw:'if',pts:2,hint:''},{desc:'In BMI 2 chữ số thập phân',kw:':.2f',pts:1,hint:''}],errors:['Không phát hiện chiều cao nhập bằng cm nhưng dùng như mét','Nhầm công thức: <code>can / cao * 2</code> thay vì <code>can / cao**2</code>']},
{id:'k10-17-b4-4_3',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B4 – Phân tích',num:'4.3',title:'Refactor code trùng lặp',desc:`<b>Đề bài:</b> Viết lại đoạn code sau ngắn gọn hơn (≤8 dòng, không dùng hàm) mà vẫn đúng:<pre class="ex-code">luong_co_ban = float(input("Lương cơ bản: "))
he_so = float(input("Hệ số: "))
phu_cap = float(input("Phụ cấp: "))
bao_hiem = luong_co_ban * he_so * 0.105
bao_hiem = round(bao_hiem, 0)
luong_truoc_thue = luong_co_ban * he_so + phu_cap
luong_truoc_thue = luong_truoc_thue - bao_hiem
thue = 0
if luong_truoc_thue > 11000000:
    thue = (luong_truoc_thue - 11000000) * 0.05
thue = round(thue, 0)
luong_thuc_linh = luong_truoc_thue - thue
luong_thuc_linh = round(luong_thuc_linh, 0)
print("Lương thực lĩnh:", luong_thuc_linh)</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'Dùng round() hoặc int() gộp tính toán',kw:'round',pts:3,hint:''},{desc:'Dùng max() xử lý thuế tối thiểu 0',kw:'max',pts:3,hint:''},{desc:'Code ≤8 dòng, kết quả giống cũ',kw:'print',pts:4,hint:''}],errors:['Quên gộp round() vào cùng dòng tính toán','Dùng biến trung gian không cần thiết']},
{id:'k10-17-b5-5_1',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh int và float trong tính toán',desc:`<b>Đề bài:</b> Hai cách tính diện tích hình thang sau khác gì nhau? Cách nào chính xác hơn khi nhập số lẻ?<pre class="ex-code">## Cách 1: dùng int
day_lon = int(input("Đáy lớn: "))
## Cách 2: dùng float
day_lon = float(input("Đáy lớn: "))</pre>Viết code Cách 2 hoàn chỉnh. Kiểm tra với đáy lớn=5.5, đáy nhỏ=3.5, cao=4.<br><b>Kết quả đúng:</b> <code>Diện tích = 18.0</code>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'Dùng float() cho cả 3 biến',kw:'float',pts:4,hint:''},{desc:'Công thức đúng: (a+b)*h/2',kw:'*h',pts:3,hint:''},{desc:'In kết quả đúng 18.0',kw:'18',pts:2,hint:''},{desc:'Có chú thích giải thích lý do dùng float',kw:'#',pts:1,hint:''}],errors:['Nhầm int() với float() khi đầu vào có số thập phân']},
{id:'k10-17-b5-5_2',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá code tốt vs code xấu',desc:`<b>Đề bài:</b> Giải thích tại sao Code A "xấu" và viết lại theo phong cách Code B (tên biến có nghĩa + comment):<pre class="ex-code">## Code A (xấu):
a=float(input());b=float(input())
c=a*b*0.105;d=round(c,0)
e=a*b+float(input())-d
print(round(e-round(max(0,e-11000000)*0.05,0),0))</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Nhận biết
ĐỌC đoạn code
→ XÁC ĐỊNH kiểu từng biến
→ TÍNH kết quả theo thứ tự từ trên xuống
→ IN kết quả</pre>`,rb:[{desc:'Dùng tên biến có nghĩa (luong_co_ban, he_so...)',kw:'luong',pts:3,hint:''},{desc:'Thêm comment # giải thích từng bước',kw:'#',pts:3,hint:''},{desc:'Kết quả giống Code A (kiểm tra với cùng input)',kw:'round',pts:4,hint:''}],errors:['Đặt tên biến quá ngắn (a,b,c) gây khó đọc','Viết tất cả trên một dòng làm code khó debug']},
{id:'k10-17-b5-5_3',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B5 – Đánh giá',num:'5.3',title:'Kiểm tra và validate đầu vào',desc:`<b>Đề bài:</b> Viết chương trình nhập tuổi học sinh. Đánh giá: nên hay không nên kiểm tra đầu vào? Lập luận và viết code có kiểm tra: tuổi phải là số nguyên từ 6–18.<br><b>Input:</b> Một số nguyên<br><b>Ví dụ 1:</b> Nhập 25 → <code>Lỗi: Tuổi phải từ 6 đến 18</code><br><b>Ví dụ 2:</b> Nhập 15 → <code>Tuổi hợp lệ: 15</code>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Áp dụng
NHẬP dữ liệu vào biến (input)
TÍNH toán sử dụng các toán tử
IN kết quả ra màn hình (print)</pre>`,rb:[{desc:'Nhập int từ bàn phím',kw:'int',pts:2,hint:''},{desc:'Kiểm tra điều kiện 6 ≤ tuổi ≤ 18',kw:'if',pts:3,hint:''},{desc:'In thông báo lỗi khi không hợp lệ',kw:'Lỗi',pts:3,hint:''},{desc:'In xác nhận khi hợp lệ',kw:'hợp lệ',pts:2,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (dùng Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: <code>int(input())</code> thay vì <code>input()</code>']},
{id:'k10-17-b6-6_1',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B6 – Sáng tạo',num:'6.1',title:'Máy tính bỏ túi 7 phép toán',desc:`<b>Đề bài:</b> Thiết kế "máy tính bỏ túi" mini: nhập 2 số thực và phép toán (<code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>//</code> <code>%</code> <code>**</code>), in kết quả. Xử lý chia cho 0.<br><b>Input:</b><pre class="ex-code">10
/
3</pre><b>Output:</b><pre class="ex-code">10.0 / 3.0 = 3.3333333333333335</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Sáng tạo
NHẬP các thông tin cần thiết
TÍNH toán nhiều bước phức tạp
ĐỊNH DẠNG output đẹp với f-string
XỬ LÝ trường hợp đặc biệt (ví dụ: chia cho 0)</pre>`,rb:[{desc:'Nhập 2 số float và phép toán',kw:'float',pts:2,hint:''},{desc:'Xử lý đúng 7 phép toán bằng if-elif',kw:'elif',pts:3,hint:''},{desc:'Xử lý chia cho 0 (ZeroDivisionError)',kw:'if b == 0',pts:3,hint:''},{desc:'In đúng định dạng: a op b = kq',kw:'print',pts:2,hint:''}],
  tc:[{input:'10\n/\n3\n',expected:'10\n/\n3',pts:10,desc:'Output đúng'}],errors:['Quên xử lý trường hợp chia cho 0','Nhầm <code>**</code> với <code>^</code> (XOR, không phải lũy thừa)']},
{id:'k10-17-b6-6_2',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B6 – Sáng tạo',num:'6.2',title:'Chuyển đổi thời gian',desc:`<b>Đề bài:</b> Nhập số giây (số nguyên lớn). Chuyển sang định dạng <code>X ngày Y giờ Z phút W giây</code> dùng toán tử <code>//</code> và <code>%</code>.<br><b>Input:</b><pre class="ex-code">90061</pre><b>Output:</b><pre class="ex-code">1 ngày 1 giờ 1 phút 1 giây</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Sáng tạo
NHẬP các thông tin cần thiết
TÍNH toán nhiều bước phức tạp
ĐỊNH DẠNG output đẹp với f-string
XỬ LÝ trường hợp đặc biệt (ví dụ: chia cho 0)</pre>`,rb:[{desc:'Tính ngày: giây//86400',kw:'86400',pts:3,hint:''},{desc:'Tính giờ: còn_lại//3600',kw:'3600',pts:3,hint:''},{desc:'Tính phút và giây: //60 và %60',kw:'60',pts:3,hint:''},{desc:'In đúng định dạng',kw:'ngày',pts:1,hint:''}],
  tc:[{input:'90061\n',expected:'1 ngày 1 giờ 1 phút 1 giây',pts:5,desc:'90061 giây = 1d 1h 1m 1s'},{input:'3600\n',expected:'0 ngày 1 giờ 0 phút 0 giây',pts:5,desc:'3600 giây = 1 giờ'}],errors:['Sai thứ tự: phải tính ngày → giờ → phút → giây','Nhầm 1 ngày = 84600 giây (đúng: 86400)']},
{id:'k10-17-b6-6_3',g:'K10',ch:'Bài 17: Biến và lệnh gán',lv:'B6 – Sáng tạo',num:'6.3',title:'Bảng điểm học kỳ có trọng số',desc:`<b>Đề bài:</b> Nhập điểm 5 môn (Toán, Văn, Anh, Lý, Hóa). Toán và Văn hệ số 2, các môn còn lại hệ số 1. Tính điểm TB có trọng số. In bảng kết quả đẹp và xếp loại.<br><b>Input:</b> 5 số thực (mỗi số 1 dòng)<br><b>Ví dụ:</b><pre class="ex-code">8 7.5 8.5 7 6.5</pre><b>Output:</b><pre class="ex-code">╔══════════════════╗
║  BẢNG ĐIỂM HK   ║
╚══════════════════╝
Điểm TB: 7.64
Học lực: Khá</pre>`,theory:`<b>1. Biến (Variable)</b><br>
Biến là tên gọi đại diện cho một vùng nhớ. Python tự xác định kiểu dữ liệu qua giá trị được gán.
<pre class="ex-code">ten = "An"        # str
tuoi = 16         # int
diem = 8.5        # float
la_hs = True      # bool</pre>
<b>2. Lệnh gán và toán tử</b><br>
<pre class="ex-code">x = 10; y = 3
a = x + y    # Cộng   → 13
b = x - y    # Trừ    → 7
c = x * y    # Nhân   → 30
d = x / y    # Chia   → 3.333...
e = x // y   # Chia nguyên → 3
f = x % y    # Chia dư → 1
g = x ** 2   # Lũy thừa → 100</pre>
<b>3. Gán đồng thời</b><br>
<pre class="ex-code">a, b, c = 5, 10, 15   # gán 3 biến cùng lúc
a, b = b, a           # hoán đổi giá trị</pre>`,pseudo:`<pre class="ex-code">## Mã giả – Sáng tạo
NHẬP các thông tin cần thiết
TÍNH toán nhiều bước phức tạp
ĐỊNH DẠNG output đẹp với f-string
XỬ LÝ trường hợp đặc biệt (ví dụ: chia cho 0)</pre>`,rb:[{desc:'Nhập 5 điểm bằng float',kw:'float',pts:2,hint:''},{desc:'Công thức đúng: (T*2+V*2+A+L+H)/7',kw:'2',pts:3,hint:''},{desc:'Xếp loại đúng 4 mức',kw:'elif',pts:3,hint:''},{desc:'In bảng có đường viền đẹp',kw:'╔',pts:2,hint:''}],
  tc:[{input:'8 7.5 8.5 7 6.5\n',expected:'8 7.5 8.5 7 6.5',pts:10,desc:'Output đúng'}],errors:['Sai mẫu số: tổng hệ số = 2+2+1+1+1 = 7 (không phải 5)','Quên nhân hệ số 2 cho Toán và Văn']},
/* Bài 18: Vào ra đơn giản */
{id:'k10-18-b1-1_1',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết lệnh print()',desc:`<b>Đề bài:</b> In ra 3 dòng sau bằng lệnh <code>print()</code>:<pre class="ex-code">Xin chào, Thế giới!
Python 3
Tin học 10</pre><b>Input:</b> Không có<br><b>Output:</b> 3 dòng như trên`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'Dùng print() đúng 3 lần',kw:'print',pts:6,hint:''},{desc:'In đúng 3 chuỗi theo yêu cầu',kw:'Xin chào',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b1-1_2',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết input() và ép kiểu',desc:`<b>Đề bài:</b> Điền đúng hàm ép kiểu vào chỗ trống và giải thích:<pre class="ex-code">ten  = _____(input("Tên: "))    # a) không cần
tuoi = _____(input("Tuổi: "))   # b) int
diem = _____(input("Điểm: "))   # c) float</pre>Viết code hoàn chỉnh, nhập và in: <code>Tên: An, Tuổi: 16, Điểm: 8.5</code>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'Không ép kiểu cho tên (str)',kw:'input',pts:2,hint:''},{desc:'Ép kiểu int() cho tuổi',kw:'int',pts:4,hint:''},{desc:'Ép kiểu float() cho điểm',kw:'float',pts:3,hint:''},{desc:'In đủ 3 thông tin',kw:'print',pts:1,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b1-1_3',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết f-string',desc:`<b>Đề bài:</b> Cho <code>ten="An"</code>, <code>diem=8.5</code>. Viết 3 cách in ra: <code>Bạn An đạt 8.50 điểm</code><br>• Cách 1: dùng <code>+</code> nối chuỗi<br>• Cách 2: dùng <code>print(a, b)</code> với sep<br>• Cách 3: dùng f-string<br><b>Output (cả 3 cách):</b><pre class="ex-code">Bạn An đạt 8.50 điểm
Bạn An đạt 8.50 điểm
Bạn An đạt 8.50 điểm</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'Cách 1: nối chuỗi với str()',kw:'str(',pts:3,hint:''},{desc:'Cách 2: print nhiều giá trị',kw:'sep',pts:3,hint:''},{desc:'Cách 3: f-string với :.2f',kw:'f"',pts:4,hint:''}],
  tc:[{input:'',expected:'Bạn An đạt 8.50 điểm\nBạn An đạt 8.50 điểm\nBạn An đạt 8.50 điểm',pts:10,desc:'Output đúng'}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b2-2_1',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B2 – Hiểu',num:'2.1',title:'Giải thích sự khác biệt int vs float',desc:`<b>Đề bài:</b> Chạy và giải thích tại sao 2 kết quả khác nhau:<pre class="ex-code">a = int(input("a: "))    # nhập 10
b = int(input("b: "))    # nhập 3
print(a / b)   # Kết quả 1: ?
print(a // b)  # Kết quả 2: ?
print(a % b)   # Kết quả 3: ?</pre><b>Output:</b><pre class="ex-code">3.3333333333333335
3
1</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'In đúng kết quả /',kw:'print',pts:3,hint:''},{desc:'In đúng kết quả //',kw:'print',pts:3,hint:''},{desc:'In đúng kết quả %',kw:'print',pts:3,hint:''},{desc:'Có giải thích bằng comment',kw:'#',pts:1,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b2-2_2',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B2 – Hiểu',num:'2.2',title:'Trace lệnh input và kiểu dữ liệu',desc:`<b>Đề bài:</b> Phát hiện và sửa lỗi trong code sau. Giải thích lỗi là gì:<pre class="ex-code">a = input("a: ")
b = input("b: ")
print(a + b)    # Nhập 5 và 3, kỳ vọng: 8, thực tế: 53</pre><b>Input:</b><pre class="ex-code">5
3</pre><b>Output sau sửa:</b><pre class="ex-code">8</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'Sửa đúng: int(input()) cho cả a,b',kw:'int',pts:4,hint:''},{desc:'Giải thích lỗi: + chuỗi thay vì + số',kw:'#',pts:3,hint:''},{desc:'Kết quả in đúng: 8',kw:'print',pts:3,hint:''}],
  tc:[{input:'5\n3\n',expected:'8',pts:10,desc:'Output đúng'}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b2-2_3',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B2 – Hiểu',num:'2.3',title:'Đọc code và dự đoán output',desc:`<b>Đề bài:</b> Dự đoán output rồi chạy kiểm tra:<pre class="ex-code">x = 5
print(f"Bình phương: {x**2}")
print(f"Căn (gần đúng): {x**0.5:.4f}")
y = x * 2 + 1
print(f"{x} * 2 + 1 = {y}")</pre><b>Output:</b><pre class="ex-code">Bình phương: 25
Căn (gần đúng): 2.2361
5 * 2 + 1 = 11</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'In đúng bình phương 25',kw:'25',pts:3,hint:''},{desc:'In đúng căn 2.2361 với :.4f',kw:':.4f',pts:4,hint:''},{desc:'In đúng dòng 3',kw:'11',pts:3,hint:''}],
  tc:[{input:'',expected:'Bình phương: 25\nCăn (gần đúng): 2.2361\n5 * 2 + 1 = 11',pts:10,desc:'Output đúng'}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b3-3_1',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B3 – Áp dụng',num:'3.1',title:'Tính BMI và phân loại',desc:`<b>Đề bài:</b> Nhập cân nặng (kg) và chiều cao (m). Tính BMI = kg/m². Phân loại: BMI<18.5=Thiếu cân, <25=Bình thường, <30=Thừa cân, ≥30=Béo phì.<br><b>Input:</b><pre class="ex-code">70
1.75</pre><b>Output:</b><pre class="ex-code">BMI = 22.86
Phân loại: Bình thường</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Nhập float cho cân và chiều cao',kw:'float',pts:2,hint:''},{desc:'Tính BMI = can/cao**2',kw:'can',pts:3,hint:''},{desc:'Phân loại đúng 4 mức',kw:'elif',pts:3,hint:''},{desc:'In BMI 2 chữ số thập phân',kw:':.2f',pts:2,hint:''}],
  tc:[{input:'70\n1.75\n',expected:'BMI = 22.86\nPhân loại: Bình thường',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-18-b3-3_2',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B3 – Áp dụng',num:'3.2',title:'Phiếu thông tin học sinh',desc:`<b>Đề bài:</b> Nhập tên, lớp, ngày sinh (dd/mm/yyyy) và 3 điểm. In phiếu thông tin đẹp:<pre class="ex-code">╔═══════════════════════╗
║   PHIẾU THÔNG TIN HS  ║
╠═══════════════════════╣
║ Họ tên: Nguyễn An     ║
║ Lớp: 10A1             ║
║ Điểm TB: 8.17         ║
╚═══════════════════════╝</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Nhập đủ tên, lớp, ngày sinh',kw:'input',pts:2,hint:''},{desc:'Nhập 3 điểm và tính TB',kw:'float',pts:2,hint:''},{desc:'In viền đúng ╔╠╚',kw:'╔',pts:3,hint:''},{desc:'Điểm TB 2 chữ số thập phân',kw:':.2f',pts:3,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b3-3_3',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B3 – Áp dụng',num:'3.3',title:'Máy tính tiền mua sách',desc:`<b>Đề bài:</b> Nhập số quyển sách và đơn giá. Tính tổng tiền áp dụng giảm giá: <5 quyển=0%, 5–9=10%, ≥10=20%.<br><b>Input:</b><pre class="ex-code">7
50000</pre><b>Output:</b><pre class="ex-code">Tổng trước giảm: 350,000 đồng
Giảm giá: 10%
Tổng phải trả: 315,000 đồng</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Nhập số quyển int và đơn giá float',kw:'int',pts:2,hint:''},{desc:'Tính tổng = so_quyen * don_gia',kw:'*',pts:2,hint:''},{desc:'Áp dụng giảm giá đúng 3 mức',kw:'elif',pts:3,hint:''},{desc:'In tổng có dấu phân cách ngàn',kw:':,',pts:3,hint:''}],
  tc:[{input:'7\n50000\n',expected:'Tổng trước giảm: 350,000 đồng\nGiảm giá: 10%\nTổng phải trả: 315,000 đồng',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-18-b4-4_1',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi nhập sai kiểu dữ liệu',desc:`<b>Đề bài:</b> Code sau báo lỗi. Xác định dòng lỗi, loại lỗi và sửa:<pre class="ex-code">ten = input("Tên: ")
tuoi = input("Tuổi: ")
nguoi_lon = tuoi >= 18
nam_sinh = 2024 - tuoi
print(f"{ten} ({tuoi} tuổi), sinh năm {nam_sinh}")</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Xác định lỗi: tuổi là str, không so sánh được',kw:'int',pts:3,hint:''},{desc:'Sửa dòng 2: int(input())',kw:'int',pts:4,hint:''},{desc:'Sửa so sánh tuổi đúng',kw:'>=',pts:2,hint:''},{desc:'Code chạy đúng sau sửa',kw:'print',pts:1,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b4-4_2',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích lỗi định dạng output',desc:`<b>Đề bài:</b> Code in sai định dạng. Tìm lỗi và sửa để ra đúng output:<pre class="ex-code">x = 3.14159265
print("Pi = " + x)      # Lỗi 1
print(f"Pi ≈ {x:2f}")   # Lỗi 2: 2 chứ không phải .2
print("Pi = %f" % x)    # In quá nhiều số lẻ</pre><b>Output mong muốn:</b><pre class="ex-code">Pi = 3.14159265
Pi ≈ 3.14
Pi = 3.14</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Sửa lỗi 1: dùng str(x) hoặc f-string',kw:'str(',pts:3,hint:''},{desc:'Sửa lỗi 2: dùng :.2f',kw:':.2f',pts:4,hint:''},{desc:'Sửa lỗi 3: định dạng 2 chữ số',kw:'.2',pts:3,hint:''}],
  tc:[{input:'',expected:'Pi = 3.14159265\nPi ≈ 3.14\nPi = 3.14',pts:10,desc:'Output đúng'}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b4-4_3',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B4 – Phân tích',num:'4.3',title:'Refactor code nhập nhiều biến',desc:`<b>Đề bài:</b> Viết lại code sau trên 1 dòng input cho mỗi loại dữ liệu, dùng cách nhập nhiều giá trị cùng lúc:<pre class="ex-code">x = int(input("x: "))
y = int(input("y: "))
z = int(input("z: "))</pre>Gợi ý: <code>x, y, z = map(int, input().split())</code><br><b>Input:</b> <code>3 4 5</code> (cách nhau dấu cách)<br><b>Output:</b> <code>Tổng = 12</code>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Dùng map(int,...) hoặc split()',kw:'map',pts:3,hint:''},{desc:'Nhập 3 số trên 1 dòng',kw:'split',pts:4,hint:''},{desc:'In tổng đúng',kw:'print',pts:3,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b5-5_1',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh các cách định dạng output',desc:`<b>Đề bài:</b> So sánh 4 cách in giá trị x=3.14159, y=2718.28 — cách nào phù hợp nhất cho từng trường hợp?<pre class="ex-code">print(x, y)                  # Cách 1
print(f"{x:.2f}, {y:.2f}")   # Cách 2
print(f"{x:10.2f}")          # Cách 3
print(f"{y:,.0f}")           # Cách 4</pre>Chạy và giải thích output của từng cách.`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'In đúng output cả 4 cách',kw:'print',pts:4,hint:''},{desc:'Giải thích :.2f',kw:':.2f',pts:2,hint:''},{desc:'Giải thích :10.2f (căn lề)',kw:'10.',pts:2,hint:''},{desc:'Giải thích :, (phân cách ngàn)',kw:':,',pts:2,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b5-5_2',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá cách nhập dữ liệu an toàn',desc:`<b>Đề bài:</b> So sánh 2 cách nhập số — cách nào tốt hơn và tại sao?<pre class="ex-code">## Cách 1: Không kiểm tra
n = int(input("Nhập n: "))

## Cách 2: Có kiểm tra
try:
    n = int(input("Nhập n: "))
except ValueError:
    print("Lỗi: Phải nhập số nguyên!")</pre>Thử nhập "abc" với cả 2 cách.`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'Thử nhập abc → Cách 1 báo lỗi gì',kw:'ValueError',pts:3,hint:''},{desc:'Cách 2 dùng try-except',kw:'try',pts:4,hint:''},{desc:'Giải thích tại sao Cách 2 tốt hơn',kw:'#',pts:3,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b5-5_3',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn cách in bảng đẹp',desc:`<b>Đề bài:</b> In bảng cửu chương 5×5 đầu tiên (1×1 đến 5×5) sao cho cột thẳng hàng. So sánh cách dùng <code>\\t</code> và cách dùng <code>:4d</code>.<br><b>Output (mẫu):</b><pre class="ex-code">   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'Dùng vòng lặp lồng nhau',kw:'for',pts:3,hint:''},{desc:'Căn cột bằng :4d hoặc tương đương',kw:':4',pts:4,hint:''},{desc:'Output đúng 5×5',kw:'print',pts:3,hint:''}],
  tc:[{input:'',expected:'1   2   3   4   5\n   2   4   6   8  10\n   3   6   9  12  15\n   4   8  12  16  20\n   5  10  15  20  25',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-18-b6-6_1',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B6 – Sáng tạo',num:'6.1',title:'Hệ thống nhập và in thông tin học sinh',desc:`<b>Đề bài:</b> Thiết kế chương trình nhập đầy đủ thông tin 1 học sinh: họ tên, ngày sinh, lớp, email, 5 điểm môn học. Tính điểm TB, xếp loại, in phiếu đẹp có header và footer.<br><b>Input:</b> Lần lượt các thông tin<br><b>Output:</b> Phiếu học bạ đẹp có viền`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'Nhập đủ thông tin (tên, lớp, điểm...)',kw:'input',pts:2,hint:''},{desc:'Tính TB và xếp loại',kw:'if',pts:3,hint:''},{desc:'In phiếu có viền ╔╠╚',kw:'╔',pts:3,hint:''},{desc:'Dùng f-string định dạng đẹp',kw:'f"',pts:2,hint:''}],errors:['Thiếu dấu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> (gán) với <code>==</code> (so sánh)','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-18-b6-6_2',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B6 – Sáng tạo',num:'6.2',title:'Máy đổi tiền',desc:`<b>Đề bài:</b> Nhập số tiền VNĐ và mệnh giá tờ tiền (500.000, 200.000, 100.000, 50.000, 20.000, 10.000). In số tờ mỗi loại cần dùng (ít tờ nhất).<br><b>Ví dụ Input:</b><pre class="ex-code">850000</pre><b>Output:</b><pre class="ex-code">500,000đ × 1 tờ
200,000đ × 1 tờ
100,000đ × 1 tờ
50,000đ × 1 tờ</pre>`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'Nhập số tiền int',kw:'int',pts:2,hint:''},{desc:'Dùng vòng lặp qua các mệnh giá',kw:'for',pts:3,hint:''},{desc:'Tính đúng số tờ từng loại (//,%)',kw:'//,',pts:4,hint:''},{desc:'In đúng kết quả',kw:':,',pts:1,hint:''}],
  tc:[{input:'850000\n',expected:'500,000đ × 1 tờ\n200,000đ × 1 tờ\n100,000đ × 1 tờ\n50,000đ × 1 tờ',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-18-b6-6_3',g:'K10',ch:'Bài 18: Vào ra đơn giản',lv:'B6 – Sáng tạo',num:'6.3',title:'Hệ thống điểm thi THPT Quốc gia',desc:`<b>Đề bài:</b> Nhập điểm 6 môn (Toán, Văn, Anh bắt buộc; 3 môn tự chọn). Tính điểm xét tuyển theo tổ hợp A00 (Toán+Lý+Hóa), B00 (Toán+Hóa+Sinh), C00 (Văn+Sử+Địa), D01 (Toán+Văn+Anh). In tổ hợp có điểm cao nhất.<br><b>Input:</b> 6 điểm, mỗi điểm 1 dòng (Toán, Văn, Anh, Lý, Hóa, Sinh/Sử/Địa)`,theory:`<b>1. Lệnh print()</b>
<pre class="ex-code">print("Xin chào!")           # in chuỗi
print(x, y, sep=", ")        # in nhiều giá trị
print("Kết quả:", end=" ")   # không xuống dòng
print(f"x = {x:.2f}")        # f-string</pre>
<b>2. Lệnh input()</b>
<pre class="ex-code">ten  = input("Nhập tên: ")      # → chuỗi (str)
tuoi = int(input("Tuổi: "))     # → số nguyên
diem = float(input("Điểm: "))   # → số thực</pre>
<b>3. Định dạng số với f-string</b>
<pre class="ex-code">f"{so:.2f}"    # 2 chữ số thập phân
f"{so:,}"      # thêm dấu phân cách ngàn
f"{so:>10}"    # căn phải trong 10 ký tự</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'Nhập 6 điểm float',kw:'float',pts:2,hint:''},{desc:'Tính đúng 4 tổ hợp',kw:'A00',pts:3,hint:''},{desc:'Tìm tổ hợp cao nhất',kw:'max',pts:3,hint:''},{desc:'In tổ hợp và điểm',kw:'print',pts:2,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
/* Bài 19: Câu lệnh if */
{id:'k10-19-b1-1_1',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết biểu thức logic True/False',desc:`<b>Đề bài:</b> Cho <code>x=10, y=5, z=9</code>. Điền True/False vào chỗ trống rồi chạy kiểm tra:<pre class="ex-code">a = x < 11 and z > 5    # ___
b = x > 15 or y < 9    # ___
c = not a               # ___
d = x == 10 and y != 10 # ___</pre><b>Output:</b><pre class="ex-code">True
True
False
True</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'In đúng a=True',kw:'True',pts:3,hint:''},{desc:'In đúng c=False',kw:'False',pts:3,hint:''},{desc:'Tính đúng b=True (or)',kw:'or',pts:2,hint:''},{desc:'In đúng d=True',kw:'and',pts:2,hint:''}],
  tc:[{input:'',expected:'True\nTrue\nFalse\nTrue',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b1-1_2',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận diện cú pháp if đúng/sai',desc:`<b>Đề bài:</b> Câu nào sau đây có cú pháp ĐÚNG? Viết lại 2 câu đúng, chạy với x=5 in ra "dương":<pre class="ex-code">A) if x > 0    print("dương")   # sai
B) if x > 0:   print("dương")   # đúng
C) if (x > 0): print("dương")   # đúng
D) If x > 0:   print("dương")   # sai</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'Viết đúng cú pháp B',kw:'if x > 0:',pts:4,hint:''},{desc:'Viết đúng cú pháp C (ngoặc thừa ok)',kw:'if (x',pts:2,hint:''},{desc:'Giải thích lỗi A và D bằng comment',kw:'#',pts:4,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b1-1_3',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B1 – Nhận biết',num:'1.3',title:'Điền if/elif/else phân loại nhiệt độ',desc:`<b>Đề bài:</b> Điền <code>if</code>, <code>elif</code>, hoặc <code>else</code> vào chỗ trống để phân loại nhiệt độ:<pre class="ex-code">nhiet_do = int(input("Nhiệt độ (°C): "))
___ nhiet_do < 15: print("Lạnh")
___ nhiet_do < 25: print("Mát mẻ")
___ nhiet_do < 35: print("Nóng")
___:               print("Rất nóng")</pre><b>Kiểm tra:</b> 20→Mát mẻ, 38→Rất nóng`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'Dùng if đầu tiên',kw:'if',pts:2,hint:''},{desc:'Dùng elif đúng chỗ',kw:'elif',pts:4,hint:''},{desc:'Dùng else cuối',kw:'else',pts:2,hint:''},{desc:'Kết quả đúng 2 test',kw:'print',pts:2,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b2-2_1',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B2 – Hiểu',num:'2.1',title:'Dự đoán output if lồng nhau',desc:`<b>Đề bài:</b> Dự đoán output với x=8, x=6, x=7 rồi chạy kiểm tra:<pre class="ex-code">x = int(input("x = "))
if x % 2 == 0:
    print(x, "là số chẵn")
    if x % 4 == 0:
        print(x, "chia hết cho 4")
else:
    print(x, "là số lẻ")</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'8→chẵn và chia hết cho 4',kw:'chẵn',pts:3,hint:''},{desc:'6→chẵn nhưng không chia hết 4',kw:'chẵn',pts:3,hint:''},{desc:'7→lẻ',kw:'lẻ',pts:3,hint:''},{desc:'Có chú thích giải thích logic',kw:'#',pts:1,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b2-2_2',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích if-elif-else vs 3 if riêng',desc:`<b>Đề bài:</b> Hai đoạn code sau cho kết quả khác nhau khi x=3. Giải thích và in kết quả cả hai:<pre class="ex-code">## Đoạn A (if-elif-else)
if x > 0:   print("A1")
elif x > 1: print("A2")
else:       print("A3")

## Đoạn B (3 if riêng lẻ)
if x > 0:   print("B1")
if x > 1:   print("B2")
if x <= 0:  print("B3")</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'A: chỉ in "A1" (elif không kiểm tra tiếp)',kw:'A1',pts:3,hint:''},{desc:'B: in cả "B1" và "B2" (2 điều kiện đúng)',kw:'B1',pts:3,hint:''},{desc:'Giải thích sự khác biệt bằng comment',kw:'#',pts:4,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b2-2_3',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B2 – Hiểu',num:'2.3',title:'Trace lệnh if tìm số lớn nhất',desc:`<b>Đề bài:</b> Nhập 3 số a, b, c. Tìm số lớn nhất bằng if lồng nhau (không dùng max()):<pre class="ex-code">a = int(input("a = "))
b = int(input("b = "))
c = int(input("c = "))
if a > b:
    if a > c: print("Max là", a)
    else:     print("Max là", c)
else:
    if b > c: print("Max là", b)
    else:     print("Max là", c)</pre><b>Kiểm tra:</b> 5,3,7 → Max là 7`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'Nhập 3 số bằng int(input())',kw:'int',pts:2,hint:''},{desc:'Dùng if lồng đúng cấu trúc',kw:'if',pts:4,hint:''},{desc:'Kết quả đúng với 5,3,7',kw:'Max là 7',pts:4,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b3-3_1',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B3 – Áp dụng',num:'3.1',title:'Phân loại tam giác',desc:`<b>Đề bài:</b> Nhập 3 cạnh a, b, c. Kiểm tra tạo được tam giác không, nếu có phân loại: Đều / Vuông cân / Vuông / Cân / Thường.<br><b>Input:</b><pre class="ex-code">3
4
5</pre><b>Output:</b><pre class="ex-code">Tam giác vuông</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Kiểm tra điều kiện tạo tam giác',kw:'a + b > c',pts:3,hint:''},{desc:'Phân loại đều: a==b==c',kw:'a == b == c',pts:2,hint:''},{desc:'Phân loại vuông: a²+b²=c²',kw:'**2',pts:3,hint:''},{desc:'Phân loại cân và thường',kw:'a == b',pts:2,hint:''}],
  tc:[{input:'3\n4\n5\n',expected:'Tam giác vuông',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b3-3_2',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B3 – Áp dụng',num:'3.2',title:'Tính phí vận chuyển',desc:`<b>Đề bài:</b> Nhập khối lượng bưu kiện (kg) và loại vận chuyển (N=nội thành, T=tỉnh, Q=quốc tế). Tính phí:
<br>• ≤1kg: N=15k, T=25k, Q=150k
<br>• +mỗi kg vượt 1: N=+8k, T=+12k, Q=+80k
<br><b>Input:</b><pre class="ex-code">2.5
N</pre><b>Output:</b><pre class="ex-code">Phí vận chuyển: 27,000 đồng</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Nhập kg=float và loại=str',kw:'float',pts:2,hint:''},{desc:'Xác định đúng giá cơ bản theo loại',kw:'elif',pts:3,hint:''},{desc:'Tính đúng phần vượt',kw:'kg - 1',pts:3,hint:''},{desc:'In phí đúng có dấu ngàn',kw:':,',pts:2,hint:''}],
  tc:[{input:'2.5\nN\n',expected:'Phí vận chuyển: 27,000 đồng',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b3-3_3',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B3 – Áp dụng',num:'3.3',title:'Mô phỏng ATM rút tiền',desc:`<b>Đề bài:</b> Nhập số dư tài khoản và số tiền muốn rút. Kiểm tra:
<br>1. Số tiền > 0
<br>2. Bội số của 50,000
<br>3. Không vượt 10,000,000/lần
<br>4. Số dư sau rút ≥ 50,000 (số dư tối thiểu)
<br><b>Input:</b><pre class="ex-code">2000000
500000</pre><b>Output:</b><pre class="ex-code">Rút thành công!
Số dư còn lại: 1,500,000 đồng</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Kiểm tra > 0',kw:'if rut > 0',pts:1,hint:''},{desc:'Kiểm tra bội số 50000',kw:'% 50000',pts:3,hint:''},{desc:'Kiểm tra không vượt 10 triệu',kw:'10000000',pts:2,hint:''},{desc:'Kiểm tra số dư tối thiểu',kw:'50000',pts:3,hint:''},{desc:'In kết quả đúng',kw:':,',pts:1,hint:''}],
  tc:[{input:'2000000\n500000\n',expected:'Rút thành công!\nSố dư còn lại: 1,500,000 đồng',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b4-4_1',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic phân loại học lực',desc:`<b>Đề bài:</b> Code phân loại học lực sau có lỗi logic. Với điểm 9.0, nó in ra gì sai? Sửa lại:<pre class="ex-code">diem = float(input("Điểm: "))
if diem >= 5.0:
    print("Trung bình")
if diem >= 6.5:
    print("Khá")
if diem >= 8.5:
    print("Giỏi")
else:
    print("Yếu")</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Phát hiện lỗi: 3 if riêng lẻ in 3 dòng',kw:'elif',pts:3,hint:''},{desc:'Sửa thành if-elif-else đúng',kw:'elif',pts:4,hint:''},{desc:'9.0 chỉ in "Giỏi"',kw:'Giỏi',pts:3,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b4-4_2',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B4 – Phân tích',num:'4.2',title:'Tối giản chuỗi điều kiện lồng nhau',desc:`<b>Đề bài:</b> Viết lại đoạn code sau ngắn gọn hơn dùng <code>and</code>/<code>or</code> (không dùng if lồng):<pre class="ex-code">n = int(input("n = "))
if n > 0:
    if n % 2 == 0:
        if n % 3 == 0:
            print("Dương, chẵn, chia hết 3")
        else:
            print("Dương, chẵn, không chia hết 3")
    else:
        print("Dương, lẻ")
else:
    print("Không dương")</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Dùng and gộp điều kiện',kw:'and',pts:4,hint:''},{desc:'Kết quả giống code gốc',kw:'print',pts:3,hint:''},{desc:'Code ngắn hơn (≤6 dòng)',kw:'elif',pts:3,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b4-4_3',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B4 – Phân tích',num:'4.3',title:'Kiểm tra điều kiện biên',desc:`<b>Đề bài:</b> Viết hàm tính % giảm giá theo số lượng: 1–4=0%, 5–9=5%, 10–19=10%, ≥20=20%. Kiểm thử 8 trường hợp biên: 1, 4, 5, 9, 10, 19, 20, 100.<br><b>Output mẫu:</b><pre class="ex-code">SL=  1 → Giảm  0%
SL=  4 → Giảm  0%
SL=  5 → Giảm  5%
SL=  9 → Giảm  5%
SL= 10 → Giảm 10%
...</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Dùng if-elif-else đúng 4 mức',kw:'elif',pts:3,hint:''},{desc:'Kiểm thử đủ 8 trường hợp biên',kw:'for',pts:3,hint:''},{desc:'Kết quả biên đúng (1,4→0%, 5,9→5%)',kw:'Giảm',pts:4,hint:''}],
  tc:[{input:'',expected:'SL=  1 → Giảm  0%\nSL=  4 → Giảm  0%\nSL=  5 → Giảm  5%\nSL=  9 → Giảm  5%\nSL= 10 → Giảm 10%\n...',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b5-5_1',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 thuật toán tìm max 3 số',desc:`<b>Đề bài:</b> Viết 2 hàm tìm max 3 số. So sánh số lần so sánh trong best case:<pre class="ex-code">## Cách 1: gán max tạm
def max3_v1(a,b,c): mx=a; if b>mx: mx=b; if c>mx: mx=c; return mx
## Cách 2: kiểm tra trực tiếp
def max3_v2(a,b,c):
    if a>=b and a>=c: return a
    elif b>=c:         return b
    else:              return c</pre>Kiểm tra 5 bộ test, in kết quả và nhận xét.`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'Viết đúng 2 hàm',kw:'def max3',pts:3,hint:''},{desc:'Kiểm tra ≥5 bộ test',kw:'assert',pts:3,hint:''},{desc:'So sánh số lần kiểm tra',kw:'#',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Tham số thiếu hoặc thừa khi gọi hàm']},
{id:'k10-19-b5-5_2',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hệ thống phân loại điểm',desc:`<b>Đề bài:</b> Thiết kế hệ thống phân loại điểm học sinh theo 2 tiêu chí: điểm số (≥8.5=Giỏi...) VÀ hạnh kiểm (T=Tốt/K=Khá/TB=Trung bình). Quy tắc: muốn Học sinh Giỏi cần điểm ≥8.5 VÀ hạnh kiểm Tốt.<br><b>Input:</b><pre class="ex-code">8.7
T</pre><b>Output:</b><pre class="ex-code">Danh hiệu: Học sinh Giỏi</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'Nhập điểm float và hạnh kiểm str',kw:'float',pts:2,hint:''},{desc:'Kết hợp 2 điều kiện bằng and',kw:'and',pts:4,hint:''},{desc:'Phân loại đúng 4 danh hiệu',kw:'elif',pts:4,hint:''}],
  tc:[{input:'8.7\nT\n',expected:'Danh hiệu: Học sinh Giỏi',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b5-5_3',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B5 – Đánh giá',num:'5.3',title:'Thiết kế hệ thống xét tốt nghiệp THPT',desc:`<b>Đề bài:</b> Nhập điểm 3 môn bắt buộc (Toán, Văn, NN) và 2 môn tự chọn, điểm học bạ (0–10). Điểm thi = TB 5 môn, Điểm xét TN = 0.7×điểm_thi + 0.3×học_bạ. Đỗ nếu điểm xét ≥5.0 VÀ không có môn nào < 1.0.<br><b>Input:</b> 6 số thực (5 môn thi + học bạ)`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'Nhập 6 điểm float',kw:'float',pts:2,hint:''},{desc:'Tính điểm thi = TB 5 môn',kw:'5',pts:2,hint:''},{desc:'Tính điểm xét TN = 0.7*thi + 0.3*hb',kw:'0.7',pts:3,hint:''},{desc:'Kiểm tra đủ 2 điều kiện đỗ',kw:'and',pts:3,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b6-6_1',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B6 – Sáng tạo',num:'6.1',title:'Máy bán vé xe buýt',desc:`<b>Đề bài:</b> Thiết kế hệ thống tính giá vé xe buýt theo loại khách (T=Thường, H=Học sinh, S=Sinh viên, N=NCT, K=Khuyết tật) và khoảng cách (≤5km, 5–15km, >15km). Giờ cao điểm (7–9h, 17–19h) tính thêm 20%.<br><b>Input:</b><pre class="ex-code">T
8
10</pre><b>Output:</b><pre class="ex-code">Giá vé: 10,800 đồng (cao điểm +20%)</pre>`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'Phân loại đúng 5 loại khách',kw:'elif',pts:3,hint:''},{desc:'Tính đúng theo khoảng cách',kw:'elif',pts:2,hint:''},{desc:'Xử lý giờ cao điểm +20%',kw:'*1.2',pts:3,hint:''},{desc:'In giá có dấu ngàn',kw:':,',pts:2,hint:''}],
  tc:[{input:'T\n8\n10\n',expected:'Giá vé: 10,800 đồng (cao điểm +20%)',pts:10,desc:'Output đúng'}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b6-6_2',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B6 – Sáng tạo',num:'6.2',title:'Hệ thống xét học bổng',desc:`<b>Đề bài:</b> Nhập điểm TB, điểm rèn luyện (A/B/C/D), hoạt động ngoại khóa (0–100 điểm). Xét học bổng:
<br>• Loại 1 (100%): TB≥9.0, RL=A, HĐNK≥80
<br>• Loại 2 (70%): TB≥8.0, RL≥B, HĐNK≥60
<br>• Loại 3 (50%): TB≥7.0, RL≥C
<br>• Không đạt: còn lại
<br><b>Input:</b> 3 giá trị tương ứng`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'Nhập đúng 3 loại dữ liệu',kw:'input',pts:2,hint:''},{desc:'Kiểm tra Loại 1 đủ 3 điều kiện',kw:'and',pts:4,hint:''},{desc:'Kiểm tra đúng Loại 2 và 3',kw:'elif',pts:3,hint:''},{desc:'In kết quả rõ ràng',kw:'Học bổng',pts:1,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
{id:'k10-19-b6-6_3',g:'K10',ch:'Bài 19: Câu lệnh if',lv:'B6 – Sáng tạo',num:'6.3',title:'Game đoán số có 7 lần',desc:`<b>Đề bài:</b> Máy tạo số ngẫu nhiên 1–100, người chơi đoán tối đa 7 lần. Sau mỗi lần in: "Quá nhỏ!", "Quá lớn!", hoặc "Chính xác! (X lần)". Hết 7 lần in "Hết lượt! Số bí ẩn là Y." Xếp loại: 1–2=Thiên tài, 3–4=Giỏi, 5–6=Khá, 7=May mắn.`,theory:`<b>1. Biểu thức logic</b>
<pre class="ex-code">==  !=  >  <  >=  <=   (so sánh)
and  or  not             (logic)
x > 0 and x < 100       (kết hợp)</pre>
<b>2. Cú pháp if-elif-else</b>
<pre class="ex-code">if dieu_kien_1:
    khoi_lenh_1
elif dieu_kien_2:
    khoi_lenh_2
else:
    khoi_lenh_mac_dinh</pre>
<b>3. Lưu ý quan trọng</b><br>
• Sau điều kiện BẮT BUỘC có dấu <code>:</code><br>
• Thụt lề 4 dấu cách (bắt buộc trong Python)<br>
• if-elif-else: chỉ 1 nhánh được thực thi<br>
• 3 if riêng lẻ: cả 3 đều được kiểm tra`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'import random và randint(1,100)',kw:'random',pts:2,hint:''},{desc:'Vòng lặp tối đa 7 lần',kw:'for',pts:3,hint:''},{desc:'So sánh và in gợi ý đúng',kw:'Quá',pts:2,hint:''},{desc:'Xếp loại sau khi đoán đúng',kw:'Thiên tài',pts:3,hint:''}],errors:['Dùng 3 <code>if</code> riêng lẻ thay vì <code>if-elif-else</code>','Thiếu dấu <code>:</code> sau điều kiện','Thụt lề khối lệnh không đều']},
/* Bài 20: Câu lệnh for */
{id:'k10-20-b1-1_1',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B1 – Nhận biết',num:'1.1',title:'Điền kết quả range()',desc:`<b>Đề bài:</b> Điền kết quả của từng hàm <code>range()</code> rồi chạy kiểm tra:<pre class="ex-code">list(range(5))          # ___
list(range(2, 7))       # ___
list(range(0, 10, 2))   # ___
list(range(5, 0, -1))   # ___</pre><b>Output:</b><pre class="ex-code">[0, 1, 2, 3, 4]
[2, 3, 4, 5, 6]
[0, 2, 4, 6, 8]
[5, 4, 3, 2, 1]</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'In đúng range(5)',kw:'[0, 1',pts:3,hint:''},{desc:'In đúng range(0,10,2)',kw:'[0, 2',pts:4,hint:''},{desc:'In đúng range đếm lùi',kw:'5, 4',pts:3,hint:''}],
  tc:[{input:'',expected:'[0, 1, 2, 3, 4]\n[2, 3, 4, 5, 6]\n[0, 2, 4, 6, 8]\n[5, 4, 3, 2, 1]',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b1-1_2',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B1 – Nhận biết',num:'1.2',title:'Đọc code vòng for tính tổng',desc:`<b>Đề bài:</b> Code sau tính gì? Điền kết quả và chạy kiểm tra:<pre class="ex-code">tong = 0
for i in range(1, 11):
    tong += i
print("Tổng =", tong)</pre><b>Sau đó:</b> Sửa để tính tổng các số chẵn từ 2 đến 20.<br><b>Output 1:</b> <code>Tổng = 55</code><br><b>Output 2:</b> <code>Tổng = 110</code>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'In đúng tổng 1+..+10=55',kw:'55',pts:4,hint:''},{desc:'Sửa range đúng cho số chẵn',kw:'range(2',pts:3,hint:''},{desc:'In đúng tổng 2+4+..+20=110',kw:'110',pts:3,hint:''}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b1-1_3',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B1 – Nhận biết',num:'1.3',title:'In từng phần tử danh sách',desc:`<b>Đề bài:</b> Duyệt và in từng phần tử của list <code>A = [3,1,4,1,5,9,2,6]</code> trên 1 dòng, cách nhau dấu cách. Dùng <b>2 cách</b>: (1) for...in, (2) for range(len).<br><b>Output:</b><pre class="ex-code">3 1 4 1 5 9 2 6
3 1 4 1 5 9 2 6</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B1 – Nhận biết
ĐỌC đoạn code từng dòng
THEO DÕI giá trị từng biến
TÍNH kết quả theo thứ tự thực thi
IN kết quả (hoặc điền vào chỗ trống)</pre>`,rb:[{desc:'Cách 1: for x in A',kw:'for x in',pts:4,hint:''},{desc:'Cách 2: for i in range(len(A))',kw:'range(len',pts:3,hint:''},{desc:'Dùng end=" " để in cùng hàng',kw:'end=',pts:3,hint:''}],
  tc:[{input:'',expected:'3 1 4 1 5 9 2 6\n3 1 4 1 5 9 2 6',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b2-2_1',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B2 – Hiểu',num:'2.1',title:'Dự đoán output vòng lặp lồng',desc:`<b>Đề bài:</b> Dự đoán output rồi chạy kiểm tra:<pre class="ex-code">for i in range(3):
    for j in range(i+1):
        print("*", end="")
    print()</pre><b>Output:</b><pre class="ex-code">*
**
***</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'In đúng dòng 1 (1 dấu *)',kw:'* ',pts:3,hint:''},{desc:'In đúng dòng 3 (3 dấu *)',kw:'***',pts:4,hint:''},{desc:'Dùng end="" đúng',kw:'end=',pts:3,hint:''}],
  tc:[{input:'',expected:'*\n**\n***',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b2-2_2',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích enumerate()',desc:`<b>Đề bài:</b> Chạy và giải thích kết quả:<pre class="ex-code">fruits = ["táo","cam","xoài","chuối"]
for i, ten in enumerate(fruits, start=1):
    print(f"{i}. {ten}")</pre><b>Output:</b><pre class="ex-code">1. táo
2. cam
3. xoài
4. chuối</pre>Sau đó viết lại KHÔNG dùng enumerate (dùng range + chỉ số).`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'In đúng đánh số 1–4',kw:'enumerate',pts:3,hint:''},{desc:'Giải thích start=1',kw:'start=1',pts:3,hint:''},{desc:'Viết lại với range',kw:'range',pts:4,hint:''}],
  tc:[{input:'',expected:'1. táo\n2. cam\n3. xoài\n4. chuối',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b2-2_3',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu for-else kiểm tra số nguyên tố',desc:`<b>Đề bài:</b> Chạy với n=7 và n=9, giải thích tại sao kết quả khác nhau:<pre class="ex-code">n = int(input("n = "))
for i in range(2, n):
    if n % i == 0:
        print(n, "không phải số nguyên tố")
        break
else:
    print(n, "là số nguyên tố")</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B2 – Hiểu
TRACE code từng bước
GHI CHÉP giá trị biến sau mỗi lệnh
DỰ ĐOÁN output trước khi chạy
CHẠY kiểm tra và so sánh</pre>`,rb:[{desc:'7→số nguyên tố (else được thực thi)',kw:'nguyên tố',pts:4,hint:''},{desc:'9→không phải (break, else bỏ qua)',kw:'không phải',pts:3,hint:''},{desc:'Giải thích for-else',kw:'#',pts:3,hint:''}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b3-3_1',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B3 – Áp dụng',num:'3.1',title:'Bảng cửu chương',desc:`<b>Đề bài:</b> Nhập n (2–9). In bảng cửu chương của n từ 1×n đến 10×n.<br><b>Input:</b> 5<br><b>Output:</b><pre class="ex-code">5 x 1 = 5
5 x 2 = 10
...
5 x 10 = 50</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Nhập n bằng int(input())',kw:'int',pts:2,hint:''},{desc:'Dùng for range(1,11)',kw:'range(1, 11)',pts:3,hint:''},{desc:'In đúng định dạng n x i = kq',kw:'x',pts:3,hint:''},{desc:'Kết quả đúng (5×10=50)',kw:'= 50',pts:2,hint:''}],
  tc:[{input:'5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50\n',expected:'5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b3-3_2',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B3 – Áp dụng',num:'3.2',title:'Tính n số Fibonacci',desc:`<b>Đề bài:</b> Nhập n. In n số đầu của dãy Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, ...<br><b>Input:</b> 8<br><b>Output:</b><pre class="ex-code">0 1 1 2 3 5 8 13</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Khởi tạo a=0, b=1',kw:'a, b = 0, 1',pts:3,hint:''},{desc:'Vòng lặp n lần in và cập nhật',kw:'for',pts:3,hint:''},{desc:'Cập nhật đúng: a,b=b,a+b',kw:'a, b = b',pts:4,hint:''}],
  tc:[{input:'0 1 1 2 3 5 8 13\n',expected:'0 1 1 2 3 5 8 13',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b3-3_3',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B3 – Áp dụng',num:'3.3',title:'Thống kê điểm lớp học',desc:`<b>Đề bài:</b> Nhập n điểm. Tính và in: điểm cao nhất, thấp nhất, trung bình, số học sinh đạt (≥5.0).<br><b>Input:</b><pre class="ex-code">5
8 5 3 9 7</pre><b>Output:</b><pre class="ex-code">Cao nhất: 9.0 | Thấp nhất: 3.0
Trung bình: 6.40
Đạt: 4/5 học sinh</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B3 – Áp dụng
NHẬN biết Input và Output từ đề bài
NHẬP dữ liệu vào (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ theo yêu cầu
IN KẾT QUẢ đúng định dạng</pre>`,rb:[{desc:'Nhập n điểm vào list',kw:'append',pts:2,hint:''},{desc:'Dùng max(), min(), sum()',kw:'max',pts:3,hint:''},{desc:'Đếm số đạt (≥5.0)',kw:'if d >= 5',pts:3,hint:''},{desc:'In đúng 3 dòng kết quả',kw:'Cao nhất',pts:2,hint:''}],
  tc:[{input:'5\n8 5 3 9 7\n',expected:'Cao nhất: 9.0 | Thấp nhất: 3.0\nTrung bình: 6.40\nĐạt: 4/5 học sinh',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b4-4_1',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B4 – Phân tích',num:'4.1',title:'Debug vòng lặp sai biên',desc:`<b>Đề bài:</b> Code bảng cửu chương sau có <b>2 lỗi</b>. Chạy thử, tìm và sửa:<pre class="ex-code">n = int(input("n = "))
for i in range(n):     # Lỗi 1: range sai
    print(f"{n} x {i} = {n*i}")  # Lỗi 2: nhân sai</pre>Kết quả mong muốn với n=3: 3×1=3, 3×2=6, ..., 3×10=30`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Sửa Lỗi 1: range(1,11)',kw:'range(1, 11)',pts:4,hint:''},{desc:'Sửa Lỗi 2: n*i đúng',kw:'n*i',pts:3,hint:''},{desc:'Kết quả đúng 3×10=30',kw:'= 30',pts:3,hint:''}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b4-4_2',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích độ phức tạp vòng lặp lồng',desc:`<b>Đề bài:</b> Đếm số lần thực hiện dòng print với các giá trị n=3, n=10, n=100 rồi lập bảng:<pre class="ex-code">for i in range(n):
    for j in range(n):
        print("*", end="")
    print()</pre>Kết luận về độ phức tạp O(?) theo n.`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Tính đúng n=3: 9 lần',kw:'9',pts:3,hint:''},{desc:'Tính đúng n=10: 100 lần',kw:'100',pts:3,hint:''},{desc:'Kết luận O(n²)',kw:'n²',pts:4,hint:''}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b4-4_3',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu tìm số lớn nhất trong list',desc:`<b>Đề bài:</b> So sánh 2 cách tìm max và kết luận:<pre class="ex-code">A = [3,1,4,1,5,9,2,6,5,3]
## Cách 1: max() có sẵn
kq1 = max(A)
## Cách 2: vòng for tự tìm
kq2 = A[0]
for x in A:
    if x > kq2: kq2 = x
print(kq1 == kq2)   # True?</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B4 – Phân tích
ĐỌC code lỗi, xác định loại lỗi
TÌM dòng gây ra lỗi
GIẢI THÍCH nguyên nhân
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Dùng max() đúng',kw:'max(A)',pts:3,hint:''},{desc:'Viết for tìm max tự tay',kw:'for x in',pts:4,hint:''},{desc:'In True (2 cách bằng nhau)',kw:'True',pts:3,hint:''}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b5-5_1',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh for với list comprehension',desc:`<b>Đề bài:</b> Viết 2 cách tạo list bình phương 1–10: (1) for + append, (2) list comprehension. So sánh kết quả và code ngắn hơn bao nhiêu.<br><b>Output:</b><pre class="ex-code">for:   [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
LC:    [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Bằng nhau: True</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'Cách 1: for + append',kw:'append',pts:3,hint:''},{desc:'Cách 2: list comprehension',kw:'[x**2',pts:4,hint:''},{desc:'In True (giống nhau)',kw:'True',pts:3,hint:''}],
  tc:[{input:'',expected:'for:   [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nLC:    [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nBằng nhau: True',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b5-5_2',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá 2 thuật toán kiểm tra nguyên tố',desc:`<b>Đề bài:</b> So sánh 2 cách kiểm tra số nguyên tố — cách nào nhanh hơn với n=10000?<pre class="ex-code">def is_prime_v1(n):  # kiểm tra 2..n-1
def is_prime_v2(n):  # kiểm tra 2..√n</pre>Đếm số lần kiểm tra với n=10007. Kết luận tốc độ.`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'Viết đúng v1 duyệt 2..n-1',kw:'range(2, n)',pts:3,hint:''},{desc:'Viết đúng v2 duyệt đến sqrt(n)',kw:'int(n**0.5)',pts:4,hint:''},{desc:'Đếm và so sánh số lần kiểm tra',kw:'dem',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Tham số thiếu hoặc thừa khi gọi hàm']},
{id:'k10-20-b5-5_3',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B5 – Đánh giá',num:'5.3',title:'Đánh giá hiệu suất tính tổng bình phương',desc:`<b>Đề bài:</b> Tính 1²+2²+...+n² bằng 3 cách, so sánh kết quả và kiểm tra cách nào đúng:<pre class="ex-code">## Cách 1: for
## Cách 2: list comprehension + sum()
## Cách 3: công thức n(n+1)(2n+1)/6</pre>Kiểm tra với n=100: cả 3 phải ra 338350.`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B5 – Đánh giá
VIẾT 2+ cách giải quyết cùng vấn đề
SO SÁNH về: độ chính xác, tốc độ, dễ đọc
ĐO LƯỜNG bằng time hoặc đếm bước
KẾT LUẬN cách nào tốt hơn và khi nào</pre>`,rb:[{desc:'Cách 1: for tính tổng',kw:'for',pts:2,hint:''},{desc:'Cách 2: LC + sum()',kw:'sum([',pts:3,hint:''},{desc:'Cách 3: công thức đúng',kw:'(2*n+1)',pts:3,hint:''},{desc:'Kiểm tra cả 3 ra 338350',kw:'338350',pts:2,hint:''}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b6-6_1',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B6 – Sáng tạo',num:'6.1',title:'In hình học ký tự',desc:`<b>Đề bài:</b> Nhập n (3–20) và kiểu hình (T=tam giác, K=kim cương). In hình bằng dấu *.<br><b>Ví dụ n=5, T:</b><pre class="ex-code">    *
   ***
  *****
 ******* 
*********</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'Nhập n và loại hình',kw:'input',pts:2,hint:''},{desc:'In hình tam giác đúng (khoảng trắng+dấu*)',kw:'*',pts:3,hint:''},{desc:'In hình kim cương (2 nửa)',kw:'range(n-1',pts:3,hint:''},{desc:'Tính đúng số khoảng trắng và dấu*',kw:'2*i-1',pts:2,hint:''}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b6-6_2',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B6 – Sáng tạo',num:'6.2',title:'Mã hóa Caesar',desc:`<b>Đề bài:</b> Thiết kế mã hóa/giải mã Caesar: dịch chuyển mỗi chữ cái k vị trí, giữ nguyên ký tự khác.<br><b>Input:</b><pre class="ex-code">Hello, World!
3</pre><b>Output:</b><pre class="ex-code">Mã hóa: Khoor, Zruog!
Giải mã: Hello, World!</pre>`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'Duyệt từng ký tự bằng for',kw:'for',pts:2,hint:''},{desc:'Kiểm tra isalpha()',kw:'isalpha',pts:3,hint:''},{desc:'Dịch đúng: (ord-base+k)%26+base',kw:'ord',pts:4,hint:''},{desc:'Giải mã ngược lại đúng',kw:'- k',pts:1,hint:''}],
  tc:[{input:'Hello, World!\n3\n',expected:'Mã hóa: Khoor, Zruog!\nGiải mã: Hello, World!',pts:10,desc:'Output đúng'}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → dùng <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy tổng','Quên biến đếm/tổng chưa khởi tạo']},
{id:'k10-20-b6-6_3',g:'K10',ch:'Bài 20: Câu lệnh for',lv:'B6 – Sáng tạo',num:'6.3',title:'Tìm số hoàn hảo từ 1 đến 10000',desc:`<b>Đề bài:</b> Số hoàn hảo: tổng các ước thực bằng chính nó (vd: 6=1+2+3). Tìm tất cả số hoàn hảo từ 1 đến 10000.<br><b>Output:</b><pre class="ex-code">6
28
496
8128</pre>Bonus: kiểm tra 2 số nhập vào có phải cặp số thân thiện không.`,theory:`<b>1. range()</b>
<pre class="ex-code">range(n)          # 0, 1, ..., n-1
range(a, b)       # a, a+1, ..., b-1
range(a, b, k)    # a, a+k, a+2k, ...
range(n, 0, -1)   # đếm lùi: n, n-1, ..., 1</pre>
<b>2. Duyệt danh sách</b>
<pre class="ex-code">for x in danh_sach:       # duyệt phần tử
for i, x in enumerate(A): # kèm chỉ số</pre>
<b>3. break và continue</b>
<pre class="ex-code">if dieu_kien: break     # thoát vòng lặp
if dieu_kien: continue  # bỏ qua lần này</pre>`,pseudo:`<pre class="ex-code">## Ý tưởng B6 – Sáng tạo
ĐỌC ĐỀ: Input là gì? Output là gì?
LẬP TRÌNH từng bước nhỏ
KIỂM TRA điều kiện biên và lỗi
HOÀN THIỆN giao diện và định dạng output</pre>`,rb:[{desc:'Duyệt 1..10000 bằng for',kw:'range(1, 10001)',pts:2,hint:''},{desc:'Hàm tính tổng ước',kw:'def tong_uoc',pts:3,hint:''},{desc:'Tìm đúng 4 số hoàn hảo: 6,28,496,8128',kw:'28',pts:4,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],
  tc:[{input:'',expected:'6\n28\n496\n8128',pts:10,desc:'Output đúng'}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Tham số thiếu hoặc thừa khi gọi hàm']},
/* Bài 21: Câu lệnh while */
{id:'k10-21-b1-1_1',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết cú pháp while',desc:`<b>Đề bài:</b> Điền kết quả rồi chạy kiểm tra:<pre class="ex-code">i = 1
while i <= 5:
    print(i, end=" ")
    i += 1</pre><b>Output:</b><pre class="ex-code">1 2 3 4 5</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'In đúng 1 2 3 4 5',kw:'1 2 3',pts:4,hint:''},{desc:'Dùng while đúng cú pháp',kw:'while',pts:4,hint:''},{desc:'Có cập nhật i += 1',kw:'i += 1',pts:2,hint:''}],
  tc:[{input:'',expected:'1 2 3 4 5',pts:10,desc:'Output đúng'}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b1-1_2',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B1 – Nhận biết',num:'1.2',title:'Phân biệt break và continue',desc:`<b>Đề bài:</b> Điền break/continue đúng chỗ để in 1 2 3 4 6 7 (bỏ 5, dừng tại 8):<pre class="ex-code">for i in range(1, 11):
    if i == 5: ___
    if i == 8: ___
    print(i, end=" ")</pre><b>Output:</b> <code>1 2 3 4 6 7</code>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'Dùng continue đúng',kw:'continue',pts:4,hint:''},{desc:'Dùng break đúng',kw:'break',pts:4,hint:''},{desc:'Output đúng 1 2 3 4 6 7',kw:'6 7',pts:2,hint:''}],errors:['Sai phạm vi: <code>range(1,n)</code> thiếu n → cần <code>range(1,n+1)</code>','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy','Quên khởi tạo biến tổng/đếm trước vòng lặp']},
{id:'k10-21-b1-1_3',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết vòng lặp vô tận',desc:`<b>Đề bài:</b> Code nào sau đây sẽ lặp vô tận? Sửa lại:<pre class="ex-code">## Code A:
i = 1
while i <= 10:
    print(i)
## Code B:
i = 10
while i > 0:
    print(i)
    i -= 1</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'Xác định đúng Code A là vô tận',kw:'i += 1',pts:4,hint:''},{desc:'Sửa Code A: thêm i += 1',kw:'i += 1',pts:4,hint:''},{desc:'Code B đúng',kw:'i -= 1',pts:2,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b2-2_1',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B2 – Hiểu',num:'2.1',title:'Trace số bước thuật toán Collatz',desc:`<b>Đề bài:</b> Thuật toán Collatz: n chẵn→n//2, n lẻ→3n+1, dừng khi n=1. Trace và đếm số bước với n=100:<pre class="ex-code">n = 100; dem = 0
while n > 1:
    if n%2==0: n=n//2
    else: n=3*n+1
    dem += 1
print(dem, n)</pre><b>Output:</b> <code>25 1</code>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'Đếm đúng 25 bước',kw:'25',pts:4,hint:''},{desc:'Giá trị cuối n=1',kw:'1',pts:3,hint:''},{desc:'Hiểu while chạy đến khi n=1',kw:'while',pts:3,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b2-2_2',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích ƯCLN bằng Euclid',desc:`<b>Đề bài:</b> Chạy và giải thích thuật toán Euclid tính ƯCLN(36,24):<pre class="ex-code">a, b = 36, 24
while b != 0:
    a, b = b, a % b
print(a)</pre><b>Output:</b> <code>12</code><br>Trace từng bước: (36,24) → (24,12) → (12,0)`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'Output đúng: 12',kw:'12',pts:4,hint:''},{desc:'Trace đủ 3 bước',kw:'# bước',pts:3,hint:''},{desc:'Giải thích điều kiện dừng',kw:'while b != 0',pts:3,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b2-2_3',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu nhập đến khi hợp lệ',desc:`<b>Đề bài:</b> Code sau thực hiện gì? Chạy với các input: 0, -5, abc, 7 và giải thích behavior:<pre class="ex-code">while True:
    try:
        n = int(input("n > 0: "))
        if n > 0: break
        print("Phải > 0!")
    except ValueError:
        print("Phải là số nguyên!")</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'Giải thích while True+break',kw:'while True',pts:3,hint:''},{desc:'Giải thích try-except',kw:'try',pts:4,hint:''},{desc:'Chạy đúng với các input trên',kw:'break',pts:3,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b3-3_1',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B3 – Áp dụng',num:'3.1',title:'Nhập dữ liệu đến khi hợp lệ',desc:`<b>Đề bài:</b> Nhập điểm (0–10). Nếu không hợp lệ yêu cầu nhập lại. Sau khi có điểm hợp lệ, in xếp loại.<br><b>Ví dụ:</b><pre class="ex-code">Nhập điểm: -1
Phải từ 0–10, nhập lại!
Nhập điểm: 7.5
Xếp loại: Khá</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Dùng while True + break',kw:'while True',pts:3,hint:''},{desc:'Kiểm tra 0 <= diem <= 10',kw:'0 <= diem <= 10',pts:4,hint:''},{desc:'In xếp loại đúng',kw:'elif',pts:3,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b3-3_2',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B3 – Áp dụng',num:'3.2',title:'Tính ƯCLN và BCNN',desc:`<b>Đề bài:</b> Nhập 2 số nguyên a, b. Tính ƯCLN (thuật toán Euclid) và BCNN = a×b/ƯCLN.<br><b>Input:</b><pre class="ex-code">12
8</pre><b>Output:</b><pre class="ex-code">ƯCLN(12, 8) = 4
BCNN(12, 8) = 24</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Nhập 2 số int',kw:'int',pts:2,hint:''},{desc:'Dùng while b != 0: a,b=b,a%b',kw:'while b != 0',pts:4,hint:''},{desc:'Tính BCNN = a*b//ucln',kw:'a * b',pts:4,hint:''}],
  tc:[{input:'12\n8\n',expected:'ƯCLN(12, 8) = 4\nBCNN(12, 8) = 24',pts:10,desc:'Output đúng'}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b3-3_3',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B3 – Áp dụng',num:'3.3',title:'Đổi số thập phân sang nhị phân',desc:`<b>Đề bài:</b> Nhập số nguyên dương n. Đổi sang nhị phân bằng while (không dùng bin()).<br><b>Input:</b> 13<br><b>Output:</b> <code>1101</code>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Nhập n bằng int(input())',kw:'int',pts:2,hint:''},{desc:'Dùng while n > 0: n//2',kw:'while n > 0',pts:4,hint:''},{desc:'Ghép bit từ phải sang trái đúng',kw:'nhi_phan = str(n%2) + nhi_phan',pts:4,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b4-4_1',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B4 – Phân tích',num:'4.1',title:'Debug vòng lặp đếm sai',desc:`<b>Đề bài:</b> Code sau in sai kết quả. Tìm 2 lỗi và sửa:<pre class="ex-code">## Mục tiêu: in 1+2+...+n
n = int(input("n = "))
while n > 0:
    tong += n   # Lỗi 1
    n -= 1
print(tong)     # Lỗi 2</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'Sửa Lỗi 1: khai báo tong = 0 trước',kw:'tong = 0',pts:4,hint:''},{desc:'Giải thích Lỗi 1: NameError',kw:'#',pts:3,hint:''},{desc:'Code chạy đúng sau sửa',kw:'print',pts:3,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b4-4_2',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích while vs for',desc:`<b>Đề bài:</b> Viết cùng chức năng (tính tổng 1→n) bằng for và while. So sánh 2 cách. Kiểm tra cùng kết quả với n=100.<br><b>Output:</b><pre class="ex-code">for: 5050
while: 5050
Bằng nhau: True</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'Viết đúng bằng for',kw:'for i in range',pts:3,hint:''},{desc:'Viết đúng bằng while',kw:'while i <= n',pts:3,hint:''},{desc:'In True (cùng kết quả)',kw:'True',pts:4,hint:''}],
  tc:[{input:'',expected:'for: 5050\nwhile: 5050\nBằng nhau: True',pts:10,desc:'Output đúng'}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b4-4_3',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B4 – Phân tích',num:'4.3',title:'Debug thuật toán Newton sqrt',desc:`<b>Đề bài:</b> Code Newton tính √n có lỗi điều kiện dừng. Sửa để kết quả đúng trong 0.0001:<pre class="ex-code">n = float(input("n = "))
x = n / 2.0
while abs(x*x - n) > 1:   # Lỗi: ngưỡng quá lớn
    x = (x + n/x) / 2
print(f"√{n:.0f} ≈ {x:.6f}")</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'Sửa ngưỡng: 0.0001',kw:'0.0001',pts:4,hint:''},{desc:'Kết quả √144 ≈ 12.000000',kw:'12',pts:3,hint:''},{desc:'Đếm số vòng lặp cần thiết',kw:'dem',pts:3,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b5-5_1',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh BinarySearch vs LinearSearch',desc:`<b>Đề bài:</b> Cài BinarySearch (while) và LinearSearch. Đếm số bước mỗi loại với mảng 1000 phần tử. Tìm phần tử không có → bao nhiêu bước mỗi loại?<br><b>Kết quả mẫu:</b><pre class="ex-code">LinearSearch: 1000 bước
BinarySearch: 10 bước (log₂1000≈10)</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Cài LinearSearch đếm bước',kw:'dem',pts:3,hint:''},{desc:'Cài BinarySearch đếm bước',kw:'while lo <= hi',pts:4,hint:''},{desc:'So sánh và nhận xét',kw:'print',pts:3,hint:''}],
  tc:[{input:'',expected:'LinearSearch: 1000 bước\nBinarySearch: 10 bước (log₂1000≈10)',pts:10,desc:'Output đúng'}],errors:['BinarySearch chỉ đúng với mảng đã SẮP XẾP','Sai điều kiện: lo <= hi (không phải lo < hi)']},
{id:'k10-21-b5-5_2',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá tính π Leibniz',desc:`<b>Đề bài:</b> Tính π dùng chuỗi Leibniz: π/4 = 1-1/3+1/5-1/7+... Dùng while đến khi sai số < 0.0001. Đếm số hạng cần thiết.<br><b>Output mẫu:</b><pre class="ex-code">π ≈ 3.1415 (sau 10000 hạng)</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Dùng while sai_so > 0.0001',kw:'sai_so',pts:4,hint:''},{desc:'Tính đúng chuỗi Leibniz',kw:'1/(2*i-1)',pts:3,hint:''},{desc:'Đếm số hạng cần thiết',kw:'dem',pts:3,hint:''}],
  tc:[{input:'',expected:'π ≈ 3.1415 (sau 10000 hạng)',pts:10,desc:'Output đúng'}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b5-5_3',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B5 – Đánh giá',num:'5.3',title:'Phân tích mô phỏng dân số',desc:`<b>Đề bài:</b> Dân số hiện tại 100 triệu, tăng 1.1%/năm. Dùng while tính: năm nào đạt 120 triệu? Bao nhiêu năm gấp đôi?<br><b>Output mẫu:</b><pre class="ex-code">Năm 2041: 120.59 triệu
Gấp đôi sau 64 năm</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Dùng while dan_so < 120e6',kw:'while',pts:3,hint:''},{desc:'Tăng đúng 1.1% mỗi năm',kw:'*= 1.011',pts:4,hint:''},{desc:'Tính năm gấp đôi',kw:'200e6',pts:3,hint:''}],
  tc:[{input:'',expected:'Năm 2041: 120.59 triệu\nGấp đôi sau 64 năm',pts:10,desc:'Output đúng'}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b6-6_1',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B6 – Sáng tạo',num:'6.1',title:'Game máy đoán số người nghĩ',desc:`<b>Đề bài:</b> Người nghĩ số 1–100, máy dùng binary search để đoán. Người trả lời cao/thấp/đúng. Máy đoán tối đa 7 lần.<br><b>Output mẫu:</b><pre class="ex-code">Lần 1: 50. (cao/thấp/đúng): thấp
Lần 2: 75. (cao/thấp/đúng): đúng
Đoán đúng sau 2 lần! Xếp loại: Thiên tài</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Thuật toán binary search: lo,hi,mid',kw:'lo, hi',pts:3,hint:''},{desc:'Cập nhật lo/hi theo câu trả lời',kw:'elif',pts:3,hint:''},{desc:'Xếp loại sau khi đoán đúng',kw:'Thiên tài',pts:4,hint:''}],
  tc:[{input:'',expected:'Lần 1: 50. (cao/thấp/đúng): thấp\nLần 2: 75. (cao/thấp/đúng): đúng\nĐoán đúng sau 2 lần! Xếp loại: Thiên tài',pts:10,desc:'Output đúng'}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b6-6_2',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B6 – Sáng tạo',num:'6.2',title:'Mô phỏng menu ngân hàng',desc:`<b>Đề bài:</b> Viết chương trình menu ATM vòng lặp: 1.Xem số dư, 2.Gửi tiền, 3.Rút tiền, 4.Lịch sử, 5.Thoát. Lưu lịch sử tất cả giao dịch.<br><b>Input mẫu:</b><pre class="ex-code">2 → Gửi: 500000
3 → Rút: 200000
5 → Thoát</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Vòng while True + break khi thoát',kw:'while True',pts:3,hint:''},{desc:'Xử lý đúng 5 tùy chọn',kw:'elif',pts:3,hint:''},{desc:'Lưu lịch sử giao dịch',kw:'lich_su.append',pts:4,hint:''}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
{id:'k10-21-b6-6_3',g:'K10',ch:'Bài 21: Câu lệnh while',lv:'B6 – Sáng tạo',num:'6.3',title:'Mô phỏng bộ đếm thời gian',desc:`<b>Đề bài:</b> Đồng hồ đếm ngược: nhập số giây (1–3600). Hiển thị MM:SS đếm từ T về 0:00. Sau khi về 0 in "⏰ Hết giờ!" và tính tổng giây đã đếm.<br><b>Output mẫu:</b><pre class="ex-code">01:30
01:29
...
00:00
⏰ Hết giờ! (đếm 90 giây)</pre>`,theory:`<b>1. Cú pháp while</b><pre class="ex-code">i = 1
while i <= 10:
    print(i)
    i += 1      # BẮT BUỘC cập nhật!</pre>
<b>2. while True + break</b><pre class="ex-code">while True:
    x = int(input("Nhập số dương: "))
    if x > 0: break
    print("Sai, nhập lại!")</pre>
<b>3. for vs while</b><br>• <code>for</code>: biết trước số lần lặp<br>• <code>while</code>: lặp đến khi thỏa điều kiện`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập và kiểm tra 1<=t<=3600',kw:'while True',pts:2,hint:''},{desc:'Hiển thị MM:SS đúng',kw:'//60',pts:3,hint:''},{desc:'Đếm ngược và in đúng',kw:'while t > 0',pts:4,hint:''},{desc:'In thông báo kết thúc',kw:'Hết giờ',pts:1,hint:''}],
  tc:[{input:'',expected:'01:30\n01:29\n...\n00:00\n⏰ Hết giờ! (đếm 90 giây)',pts:10,desc:'Output đúng'}],errors:['Quên cập nhật biến điều kiện → lặp vô tận','Sai hướng: i+=1 thay vì i-=1 khi đếm lùi']},
/* Bài 22: Kiểu danh sách */
{id:'k10-22-b1-1_1',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B1 – Nhận biết',num:'1.1',title:'Truy cập phần tử list',desc:`<b>Đề bài:</b> Cho <code>A = [10, 20, 30, 40, 50]</code>. In ra: A[0], A[-1], A[1:3], len(A), kiểm tra 30 in A.<br><b>Output:</b><pre class="ex-code">10
50
[20, 30]
5
True</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'In đúng A[0],
  tc:[{input:'',expected:'10\n50\n[20, 30]\n5\nTrue',pts:10,desc:'Output đúng'}]=10',kw:'A[0]',pts:2,hint:''},{desc:'In đúng A[-1]=50',kw:'A[-1]',pts:2,hint:''},{desc:'Slicing A[1:3]=[20,30]',kw:'A[1:3]',pts:3,hint:''},{desc:'len(A)=5',kw:'len(A)',pts:2,hint:''},{desc:'30 in A = True',kw:'in A',pts:1,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b1-1_2',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết các thao tác list',desc:`<b>Đề bài:</b> Điền kết quả sau mỗi lệnh:<pre class="ex-code">A = [1, 2, 3]
A.append(4)      # A = ___
A.insert(1, 9)   # A = ___
A.remove(2)      # A = ___
print(len(A))    # ___</pre><b>Output:</b><pre class="ex-code">[1, 2, 3, 4]
[1, 9, 2, 3, 4]
[1, 9, 3, 4]
4</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'In đúng sau append',kw:'append',pts:3,hint:''},{desc:'In đúng sau insert',kw:'insert',pts:3,hint:''},{desc:'In đúng sau remove',kw:'remove',pts:3,hint:''},{desc:'len=4',kw:'4',pts:1,hint:''}],
  tc:[{input:'',expected:'[1, 2, 3, 4]\n[1, 9, 2, 3, 4]\n[1, 9, 3, 4]\n4',pts:10,desc:'Output đúng'}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b1-1_3',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B1 – Nhận biết',num:'1.3',title:'Tạo list từ input',desc:`<b>Đề bài:</b> Nhập n. Nhập n số nguyên. In list và tổng các phần tử.<br><b>Input:</b><pre class="ex-code">4
3 1 4 2</pre><b>Output:</b><pre class="ex-code">List: [3, 1, 4, 2]
Tổng: 10</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'Nhập n bằng int(input())',kw:'int',pts:2,hint:''},{desc:'Nhập n số vào list',kw:'append',pts:3,hint:''},{desc:'In list đúng',kw:'print',pts:3,hint:''},{desc:'In tổng = sum(A)',kw:'sum',pts:2,hint:''}],
  tc:[{input:'4\n3 1 4 2\n',expected:'List: [3, 1, 4, 2]\nTổng: 10',pts:10,desc:'Output đúng'}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b2-2_1',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B2 – Hiểu',num:'2.1',title:'Dự đoán sorted() vs sort()',desc:`<b>Đề bài:</b> Dự đoán và giải thích output:<pre class="ex-code">A = [5, 3, 8, 1, 9, 2]
B = sorted(A)
A.sort()
print(A == B)
print(A is B)</pre><b>Output:</b><pre class="ex-code">True
False</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'In True (A==B về giá trị)',kw:'True',pts:4,hint:''},{desc:'In False (A is not B, khác object)',kw:'False',pts:3,hint:''},{desc:'Giải thích is vs ==',kw:'#',pts:3,hint:''}],
  tc:[{input:'',expected:'True\nFalse',pts:10,desc:'Output đúng'}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b2-2_2',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích list slicing',desc:`<b>Đề bài:</b> Chạy và giải thích từng dòng:<pre class="ex-code">A = list(range(1, 11))
print(A[::2])   # bước 2
print(A[::-1])  # đảo ngược
print(A[2:7:2]) # từ 2 đến 7, bước 2</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'In đúng A[::2]=[1,3,5,7,9]',kw:'1, 3, 5',pts:3,hint:''},{desc:'In đúng A[::-1] đảo ngược',kw:'10, 9',pts:3,hint:''},{desc:'In đúng A[2:7:2]=[3,5,7]',kw:'3, 5, 7',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b2-2_3',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu tham chiếu vs bản sao',desc:`<b>Đề bài:</b> Giải thích tại sao B[0]=99 nhưng C[0]=1:<pre class="ex-code">A = [1, 2, 3]
B = A          # tham chiếu
C = A.copy()   # bản sao
A[0] = 99
print(B[0])    # ___
print(C[0])    # ___</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'B[0]=99 (cùng tham chiếu)',kw:'99',pts:4,hint:''},{desc:'C[0]=1 (bản sao độc lập)',kw:'1',pts:3,hint:''},{desc:'Giải thích sự khác biệt',kw:'#',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b3-3_1',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B3 – Áp dụng',num:'3.1',title:'Lọc số chẵn và số lẻ',desc:`<b>Đề bài:</b> Nhập n số nguyên. Tách thành 2 list: số chẵn và số lẻ. In cả hai.<br><b>Input:</b><pre class="ex-code">5
1 2 3 4 5</pre><b>Output:</b><pre class="ex-code">Số chẵn: [2, 4]
Số lẻ: [1, 3, 5]</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Nhập n số vào list',kw:'append',pts:2,hint:''},{desc:'Lọc chẵn: x%2==0',kw:'% 2 == 0',pts:4,hint:''},{desc:'Lọc lẻ: x%2!=0',kw:'% 2 != 0',pts:3,hint:''},{desc:'In đúng 2 list',kw:'print',pts:1,hint:''}],
  tc:[{input:'5\n1 2 3 4 5\n',expected:'Số chẵn: [2, 4]\nSố lẻ: [1, 3, 5]',pts:10,desc:'Output đúng'}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b3-3_2',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B3 – Áp dụng',num:'3.2',title:'Xóa phần tử trùng giữ thứ tự',desc:`<b>Đề bài:</b> Nhập list có phần tử trùng. Tạo list mới mỗi phần tử chỉ xuất hiện 1 lần, giữ thứ tự ban đầu (không dùng set).<br><b>Ví dụ:</b> [3,1,4,1,5,9,2,6,5,3] → [3,1,4,5,9,2,6]`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Kiểm tra if x not in ket_qua',kw:'not in',pts:4,hint:''},{desc:'Chỉ thêm khi chưa có',kw:'append',pts:3,hint:''},{desc:'Giữ đúng thứ tự xuất hiện lần đầu',kw:'ket_qua',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b3-3_3',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B3 – Áp dụng',num:'3.3',title:'Xoay list k vị trí',desc:`<b>Đề bài:</b> Nhập list n phần tử và số k. Xoay phải k vị trí (phần tử cuối lên đầu).<br><b>Ví dụ:</b> [1,2,3,4,5], k=2 → [4,5,1,2,3]<br><b>Gợi ý:</b> Dùng slicing <code>A[-k:] + A[:-k]</code>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Nhập list và k',kw:'int',pts:2,hint:''},{desc:'Xoay đúng: A[-k:]+A[:-k]',kw:'A[-k:]',pts:5,hint:''},{desc:'Kết quả [4,5,1,2,3]',kw:'print',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b4-4_1',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B4 – Phân tích',num:'4.1',title:'Debug IndexError',desc:`<b>Đề bài:</b> Code sau gây IndexError. Tìm và sửa 2 lỗi:<pre class="ex-code">A = [1, 2, 3, 4, 5]
for i in range(len(A) + 1):  # Lỗi 1
    print(A[i])
print(A[5])                   # Lỗi 2</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'Sửa Lỗi 1: range(len(A))',kw:'range(len(A))',pts:4,hint:''},{desc:'Sửa Lỗi 2: A[-1] hoặc A[4]',kw:'A[-1]',pts:3,hint:''},{desc:'Giải thích IndexError',kw:'#',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b4-4_2',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích list vs tuple về bộ nhớ',desc:`<b>Đề bài:</b> So sánh kích thước bộ nhớ list và tuple với 1000 phần tử:<pre class="ex-code">import sys
a = list(range(1000))
b = tuple(range(1000))
print(sys.getsizeof(a), "bytes")
print(sys.getsizeof(b), "bytes")</pre>In và giải thích tại sao tuple nhỏ hơn.`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'In kích thước list',kw:'getsizeof',pts:3,hint:''},{desc:'In kích thước tuple',kw:'getsizeof',pts:3,hint:''},{desc:'Giải thích tuple nhỏ hơn (immutable)',kw:'#',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b4-4_3',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B4 – Phân tích',num:'4.3',title:'Phẳng hóa list lồng nhau',desc:`<b>Đề bài:</b> Nhập ma trận n×m. Phẳng hóa thành list 1 chiều.<br><b>Ví dụ:</b> [[1,2],[3,4],[5,6]] → [1,2,3,4,5,6]<br><b>Dùng:</b> list comprehension [x for row in M for x in row]`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'Nhập ma trận 2D',kw:'for i in range',pts:2,hint:''},{desc:'Phẳng hóa: [x for row in M for x in row]',kw:'for row in M',pts:5,hint:''},{desc:'Kết quả đúng',kw:'print',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b5-5_1',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 3 cách khởi tạo list',desc:`<b>Đề bài:</b> So sánh tốc độ 3 cách tạo list bình phương 1–100000: for+append, list comprehension, map().<br><b>Output mẫu:</b><pre class="ex-code">for:    15.2ms
LC:      8.1ms
map():   7.9ms
Kết quả bằng nhau: True</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Cách 1: for+append',kw:'append',pts:2,hint:''},{desc:'Cách 2: LC',kw:'[x**2',pts:3,hint:''},{desc:'Đo thời gian bằng time',kw:'time.time',pts:3,hint:''},{desc:'So sánh kết quả True',kw:'True',pts:2,hint:''}],
  tc:[{input:'',expected:'for:    15.2ms\nLC:      8.1ms\nmap():   7.9ms\nKết quả bằng nhau: True',pts:10,desc:'Output đúng'}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b5-5_2',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B5 – Đánh giá',num:'5.2',title:'Tìm top-3 không dùng sort()',desc:`<b>Đề bài:</b> Nhập n điểm. Tìm top-3 cao nhất không dùng sort(). So sánh kết quả với sort() để kiểm chứng.<br><b>Gợi ý:</b> Dùng ý tưởng SelectionSort lặp 3 lần.`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Tìm max rồi xóa, lặp 3 lần',kw:'max',pts:4,hint:''},{desc:'So sánh với sorted()',kw:'sorted',pts:3,hint:''},{desc:'Kết quả top-3 đúng',kw:'True',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b5-5_3',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B5 – Đánh giá',num:'5.3',title:'Phân phối điểm theo phân loại',desc:`<b>Đề bài:</b> Nhập n điểm. Thống kê: số lượng Giỏi/Khá/TB/Yếu. Vẽ biểu đồ đơn giản bằng ký tự *.<br><b>Output mẫu:</b><pre class="ex-code">Giỏi (≥8.5): *** (3)
Khá  (≥6.5): ***** (5)
TB   (≥5.0): ** (2)</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Đếm từng loại',kw:'count_gioi',pts:3,hint:''},{desc:'In đúng số học sinh mỗi loại',kw:'print',pts:3,hint:''},{desc:'Vẽ biểu đồ * tương ứng số lượng',kw:'*',pts:4,hint:''}],
  tc:[{input:'',expected:'Giỏi (≥8.5): *** (3)\nKhá  (≥6.5): ***** (5)\nTB   (≥5.0): ** (2)',pts:10,desc:'Output đúng'}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b6-6_1',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B6 – Sáng tạo',num:'6.1',title:'Xếp hạng lớp',desc:`<b>Đề bài:</b> Nhập n học sinh (tên và điểm). Xếp hạng theo điểm giảm dần (không dùng sort, dùng InsertionSort hoặc chọn).<br><b>Output:</b> Bảng xếp hạng có số thứ tự, tên, điểm, xếp loại.`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập n cặp (tên, điểm)',kw:'input',pts:2,hint:''},{desc:'Sắp xếp giảm dần (tự cài)',kw:'for i in range',pts:3,hint:''},{desc:'In bảng đúng thứ tự',kw:'print',pts:3,hint:''},{desc:'Hiển thị xếp loại',kw:'Giỏi',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b6-6_2',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B6 – Sáng tạo',num:'6.2',title:'Nhân ma trận 2 chiều',desc:`<b>Đề bài:</b> Nhập ma trận A (m×n) và B (n×p). Tính tích C=A×B (nhân ma trận).<br><b>Input:</b><pre class="ex-code">2 3  (m n)
1 2 3
4 5 6
3 2  (n p)
7 8
9 10
11 12</pre><b>Output:</b> Ma trận C (2×2)`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập 2 ma trận đúng',kw:'for i in range',pts:2,hint:''},{desc:'3 vòng lặp lồng nhau i,j,k',kw:'for k in range',pts:4,hint:''},{desc:'Tính C[i][j] += A[i][k]*B[k][j]',kw:'C[i][j]',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-22-b6-6_3',g:'K10',ch:'Bài 22: Kiểu danh sách',lv:'B6 – Sáng tạo',num:'6.3',title:'Xáo bài và chia bài',desc:`<b>Đề bài:</b> Tạo bộ bài 52 lá (4 chất × 13 giá trị). Xáo ngẫu nhiên (Fisher-Yates). Nhập số người chơi (2–4), chia đều. In bài từng người.<br><b>Output mẫu:</b><pre class="ex-code">Người 1 (13 lá): A♠ 5♥ K♦ ...
Người 2 (13 lá): 3♣ 8♠ ...</pre>`,theory:`<b>1. Tạo và truy cập</b><pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0]      # 10  (đầu)
A[-1]     # 50  (cuối)
A[1:3]    # [20, 30]
len(A)    # 5</pre>
<b>2. Thêm / xóa / sắp xếp</b><pre class="ex-code">A.append(x)    # thêm cuối
A.insert(i,x)  # chèn tại vị trí i
A.remove(x)    # xóa giá trị x
A.sort()       # tăng dần (in-place)
sorted(A)      # trả về list mới</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Tạo 52 lá bài đúng',kw:'for',pts:2,hint:''},{desc:'Xáo Fisher-Yates',kw:'random.randint',pts:3,hint:''},{desc:'Chia đều cho n người',kw:'[i::nguoi]',pts:3,hint:''},{desc:'In bài từng người',kw:'print',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
/* Bài 23: Lệnh với list */
{id:'k10-23-b1-1_1',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết phương thức list',desc:`<b>Đề bài:</b> Cho <code>A=[5,3,8,1,9,2]</code>. Điền kết quả của: <code>len(A)</code>, <code>max(A)</code>, <code>min(A)</code>, <code>sum(A)</code>, <code>A.count(3)</code>, <code>sorted(A)</code>.<br><b>Output:</b><pre class="ex-code">6
9
1
28
1
[1, 2, 3, 5, 8, 9]</pre>`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'len/max/min/sum',kw:'max',pts:4,hint:''},{desc:'count đúng',kw:'count',pts:3,hint:''},{desc:'sorted đúng',kw:'sorted',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b1-1_2',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết list comprehension',desc:`<b>Đề bài:</b> Điền kết quả và giải thích:<pre class="ex-code">A = [1,2,3,4,5,6,7,8,9,10]
B = [x for x in A if x%2==0]
C = [x**2 for x in range(1,6)]</pre><b>Output B:</b> [2,4,6,8,10]<br><b>Output C:</b> [1,4,9,16,25]`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'B đúng (số chẵn)',kw:'[2, 4',pts:4,hint:''},{desc:'C đúng (bình phương)',kw:'[1, 4',pts:3,hint:''},{desc:'Giải thích cú pháp LC',kw:'#',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b1-1_3',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết 2D list',desc:`<b>Đề bài:</b> Cho ma trận 3×3. In phần tử M[1][2], hàng 0, cột 1:<pre class="ex-code">M = [[1,2,3],[4,5,6],[7,8,9]]
print(M[1][2])
print(M[0])
print([M[i][1] for i in range(3)])</pre>`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị từng biến
INDIELT kết quả</pre>`,rb:[{desc:'M[1][2]=6',kw:'6',pts:4,hint:''},{desc:'M[0]=[1,2,3]',kw:'[1, 2, 3]',pts:3,hint:''},{desc:'Cột 1=[2,5,8]',kw:'[2, 5, 8]',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b2-2_1',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B2 – Hiểu',num:'2.1',title:'Trace append vs insert vs remove',desc:`<b>Đề bài:</b> Trace và in list sau mỗi lệnh:<pre class="ex-code">A = [3,1,4,1,5]
A.append(9)
A.insert(2,99)
A.remove(1)
A.sort()
print(A)</pre><b>Output cuối:</b> [1,3,4,5,9,99]`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'Trace đúng từng bước',kw:'append',pts:3,hint:''},{desc:'Output cuối đúng',kw:'[1, 3',pts:4,hint:''},{desc:'Có trace từng bước',kw:'#',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b2-2_2',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích copy vs tham chiếu',desc:`<b>Đề bài:</b> Giải thích tại sao kết quả khác:<pre class="ex-code">A=[1,2,3]; B=A; C=A.copy()
A.append(99)
print(B)  # [1,2,3,99]
print(C)  # [1,2,3]</pre>`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'B thay đổi theo A',kw:'[1, 2, 3, 99]',pts:4,hint:''},{desc:'C không đổi',kw:'[1, 2, 3]',pts:3,hint:''},{desc:'Giải thích tham chiếu',kw:'#',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b2-2_3',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu list comprehension với điều kiện',desc:`<b>Đề bài:</b> Viết list comprehension tương đương:<pre class="ex-code">## Viết LC tương đương:
ket_qua = []
for x in range(1,101):
    if x%3==0 and x%5==0:
        ket_qua.append(x)
print(ket_qua)  # [15,30,45,60,75,90]</pre>`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE code bước bước
DỰ ĐOÁN output trước
CHẠY và so sánh</pre>`,rb:[{desc:'LC đúng điều kiện %3 và %5',kw:'and x%5==0',pts:5,hint:''},{desc:'Kết quả [15,30,45,60,75,90]',kw:'15',pts:3,hint:''},{desc:'Ngắn hơn code gốc',kw:'[x for',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b3-3_1',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B3 – Áp dụng',num:'3.1',title:'Sắp xếp học sinh theo điểm',desc:`<b>Đề bài:</b> Nhập n học sinh (tên, điểm). Sắp xếp theo điểm giảm dần. Nếu bằng điểm thì theo tên ABC.<br><b>Gợi ý:</b> <code>sorted(ds, key=lambda x: (-x[1], x[0]))</code>`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Nhập list (tên,điểm)',kw:'input',pts:2,hint:''},{desc:'sorted với key lambda',kw:'lambda',pts:4,hint:''},{desc:'Bằng điểm → theo tên ABC',kw:'x[0]',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b3-3_2',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B3 – Áp dụng',num:'3.2',title:'Đếm và thống kê list',desc:`<b>Đề bài:</b> Nhập list n số. Đếm: số dương, số âm, số 0, tổng số dương, trung bình tổng thể.<br><b>Input:</b> <code>3 -1 0 5 -2 0 4</code><br><b>Output:</b><pre class="ex-code">Dương: 3 (tổng=12) | Âm: 2 | Zero: 2
Trung bình: 1.29</pre>`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Đếm 3 loại đúng',kw:'count_duong',pts:3,hint:''},{desc:'Tính tổng số dương',kw:'tong_duong',pts:3,hint:''},{desc:'Tính TB đúng',kw:'sum(A)/n',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b3-3_3',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B3 – Áp dụng',num:'3.3',title:'Ma trận tổng theo hàng và cột',desc:`<b>Đề bài:</b> Nhập ma trận n×m. Tính và in tổng mỗi hàng, tổng mỗi cột, tổng toàn bộ ma trận.`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TINH TOÁN / XỬ LÝ
IN kết quả</pre>`,rb:[{desc:'Nhập ma trận 2D',kw:'for i in range',pts:2,hint:''},{desc:'Tổng từng hàng: sum(M[i])',kw:'sum(M[i])',pts:4,hint:''},{desc:'Tổng từng cột: sum(M[i][j])',kw:'for j in range',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b4-4_1',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B4 – Phân tích',num:'4.1',title:'Debug list index out of range',desc:`<b>Đề bài:</b> Sửa 3 lỗi liên quan đến list trong code sau:<pre class="ex-code">A = [1,2,3,4,5]
print(A[5])        # Lỗi 1
for i in range(1,len(A)+1):  # Lỗi 2
    A[i] = A[i]*2
A.remove(A[3])    # Lỗi 3 (xóa giá trị hay chỉ số?)</pre>`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'Sửa A[5]→A[-1] hoặc A[4]',kw:'A[-1]',pts:3,hint:''},{desc:'Sửa range đúng',kw:'range(len',pts:3,hint:''},{desc:'Giải thích remove(giá_trị)',kw:'#',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b4-4_2',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích hiệu suất tìm kiếm trong list',desc:`<b>Đề bài:</b> So sánh <code>x in list</code> vs <code>x in set</code> khi tìm 10000 phần tử.<br>Đo thời gian và giải thích O(n) vs O(1).`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'Tạo list và set tương ứng',kw:'set(',pts:3,hint:''},{desc:'Đo thời gian bằng time',kw:'time.time',pts:3,hint:''},{desc:'Kết luận set nhanh hơn nhiều',kw:'#',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b4-4_3',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B4 – Phân tích',num:'4.3',title:'Refactor code xử lý list',desc:`<b>Đề bài:</b> Viết lại code sau bằng list comprehension (không dùng vòng for thường):<pre class="ex-code">duong=[]; am=[]; zero=[]
for x in A:
    if x>0: duong.append(x)
    elif x<0: am.append(x)
    else: zero.append(x)</pre>`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra</pre>`,rb:[{desc:'LC lọc số dương',kw:'[x for x in A if x>0]',pts:3,hint:''},{desc:'LC lọc số âm',kw:'[x for x in A if x<0]',pts:3,hint:''},{desc:'LC lọc số 0',kw:'[x for x in A if x==0]',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b5-5_1',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh list vs set về tìm kiếm',desc:`<b>Đề bài:</b> Với n=100000 phần tử, đo thời gian tìm 1000 giá trị trong list và set. Kết luận về O(n) vs O(1).`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Tạo list và set 100000 phần tử',kw:'set(',pts:2,hint:''},{desc:'Đo thời gian tìm kiếm',kw:'time.time',pts:4,hint:''},{desc:'Kết luận rõ ràng có số liệu',kw:'set nhanh',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b5-5_2',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá list comprehension vs filter',desc:`<b>Đề bài:</b> So sánh 3 cách lọc số nguyên tố 1–10000: for+if, LC, filter+lambda. Đo thời gian và so sánh code đọc.`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Cách 1: for+if+append',kw:'append',pts:2,hint:''},{desc:'Cách 2: LC',kw:'[x for',pts:3,hint:''},{desc:'Cách 3: filter',kw:'filter(',pts:2,hint:''},{desc:'So sánh thời gian',kw:'time',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b5-5_3',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn cấu trúc dữ liệu phù hợp',desc:`<b>Đề bài:</b> Với bài toán đếm tần suất từ trong 1 đoạn văn, nên dùng list hay dict? Lập luận và minh họa với 2 cách.`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH tốc độ, độ chính xác
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Cách list: đếm thủ công',kw:'count(',pts:3,hint:''},{desc:'Cách dict: nhanh hơn',kw:'{}',pts:3,hint:''},{desc:'Kết luận và giải thích',kw:'#',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b6-6_1',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế lớp học quản lý điểm',desc:`<b>Đề bài:</b> Thiết kế hệ thống quản lý điểm lớp: thêm/sửa/xóa học sinh, tính thống kê, in báo cáo đẹp với viền.`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Thêm học sinh vào list',kw:'append',pts:2,hint:''},{desc:'Sắp xếp và thống kê',kw:'sort',pts:3,hint:''},{desc:'In báo cáo đẹp',kw:'╔',pts:3,hint:''},{desc:'Xử lý thêm/sửa/xóa',kw:'input',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b6-6_2',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B6 – Sáng tạo',num:'6.2',title:'Tạo bộ bài và các trò chơi',desc:`<b>Đề bài:</b> Tạo bộ bài 52 lá, xáo và chia cho 4 người. Kiểm tra: ai có Át Pích? Ai có tổng điểm cao nhất (A=11, J/Q/K=10)?`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Tạo và xáo bộ bài',kw:'random',pts:2,hint:''},{desc:'Chia 4 tay bài đều',kw:'[i::4]',pts:3,hint:''},{desc:'Tính điểm từng tay',kw:'for la in tay',pts:4,hint:''},{desc:'Tìm người có điểm cao nhất',kw:'max',pts:1,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
{id:'k10-23-b6-6_3',g:'K10',ch:'Bài 23: Lệnh với list',lv:'B6 – Sáng tạo',num:'6.3',title:'Phân tích dữ liệu thời tiết',desc:`<b>Đề bài:</b> Nhập 30 nhiệt độ trong tháng. Tính: TB, max, min, độ lệch chuẩn. Tìm ngày nóng nhất/lạnh nhất. In biểu đồ cột đơn giản.`,theory:`<b>Phương thức quan trọng:</b><pre class="ex-code">A.count(x)    # đếm x trong A
A.index(x)    # vị trí đầu tiên của x
A.reverse()   # đảo ngược tại chỗ
A.copy()      # bản sao độc lập
sum(A), max(A), min(A)</pre>
<b>List comprehension:</b><pre class="ex-code">[x for x in A if x > 0]    # lọc
[x**2 for x in range(10)]  # biến đổi</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập 30 nhiệt độ',kw:'append',pts:2,hint:''},{desc:'Tính đúng mean và std',kw:'sum(A)/n',pts:3,hint:''},{desc:'Tìm ngày nóng/lạnh nhất',kw:'A.index(max',pts:3,hint:''},{desc:'In biểu đồ ký tự',kw:'*',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0, không phải 1','IndexError khi truy cập chỉ số ngoài phạm vi','Nhầm A.append(x) với A = A + [x]']},
/* Bài 24: Xâu ký tự */
{id:'k10-24-b1-1_1',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B1 – Nhận biết',num:'1.1',title:'Truy cập ký tự và cắt chuỗi',desc:`<b>Đề bài:</b> Cho <code>s = "Tin học KNTT"</code>. Tính và in:<br>• Độ dài chuỗi<br>• Ký tự đầu và cuối<br>• 3 ký tự đầu, 4 ký tự cuối<br>• Chuỗi đảo ngược<br><b>Output:</b><pre class="ex-code">12
T t
Tin TTNk
TTNK cọh niT</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI giá trị biến
ĐIỀN kết quả vào chỗ trống</pre>`,rb:[{desc:'In đúng len(s)=12',kw:'len',pts:3,hint:''},{desc:'Truy cập s[0] và s[-1]',kw:'s[-1]',pts:3,hint:''},{desc:'Cắt s[:3] và s[-4:]',kw:'s[-4:]',pts:2,hint:''},{desc:'Đảo ngược s[::-1]',kw:'[::-1]',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b1-1_2',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B1 – Nhận biết',num:'1.2',title:'Nối và lặp chuỗi',desc:`<b>Đề bài:</b> Điền kết quả rồi chạy kiểm tra:<pre class="ex-code">a = "Python"
b = " 3.x"
print(a + b)    # ___
print(a * 3)    # ___
print(len(a*3)) # ___</pre><b>Output:</b><pre class="ex-code">Python 3.x
PythonPythonPython
18</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI giá trị biến
ĐIỀN kết quả vào chỗ trống</pre>`,rb:[{desc:'Nối chuỗi a+b',kw:'Python 3.x',pts:3,hint:''},{desc:'Lặp a*3',kw:'PythonPython',pts:3,hint:''},{desc:'len(a*3)=18',kw:'18',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b1-1_3',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết slicing chuỗi',desc:`<b>Đề bài:</b> Cho <code>s = "0123456789"</code>. Điền kết quả:<pre class="ex-code">s[2:5]    # ___
s[::2]    # ___
s[1::3]   # ___
s[9:2:-2] # ___</pre><b>Output:</b><pre class="ex-code">234
02468
147
9753</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI giá trị biến
ĐIỀN kết quả vào chỗ trống</pre>`,rb:[{desc:'s[2:5]="234"',kw:'234',pts:3,hint:''},{desc:'s[::2]="02468"',kw:'02468',pts:3,hint:''},{desc:'s[1::3]="147"',kw:'147',pts:2,hint:''},{desc:'s[9:2:-2]="9753"',kw:'9753',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b2-2_1',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B2 – Hiểu',num:'2.1',title:'Đếm ký tự trong chuỗi',desc:`<b>Đề bài:</b> Nhập chuỗi s. Dùng vòng for đếm số lần xuất hiện của mỗi ký tự "a", "e", "i", "o", "u" (không phân biệt hoa/thường). In số nguyên âm tổng cộng.<br><b>Input:</b> <code>Hello World</code><br><b>Output:</b> <code>Nguyên âm: 3</code>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng → GHI giá trị
DỰ ĐOÁN output → CHẠY kiểm tra</pre>`,rb:[{desc:'Chuyển lower() trước',kw:'lower()',pts:3,hint:''},{desc:'Dùng for duyệt từng ký tự',kw:'for',pts:3,hint:''},{desc:'Đếm đúng 3 nguyên âm',kw:'dem',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b2-2_2',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B2 – Hiểu',num:'2.2',title:'Trace đảo ngược và kiểm tra palindrome',desc:`<b>Đề bài:</b> Trace từng bước và dự đoán output:<pre class="ex-code">def la_palindrome(s):
    s = s.lower().replace(" ","")
    return s == s[::-1]

for w in ["racecar","hello","A man a plan a canal Panama"]:
    print(w, "→", la_palindrome(w))</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng → GHI giá trị
DỰ ĐOÁN output → CHẠY kiểm tra</pre>`,rb:[{desc:'Kết quả racecar=True',kw:'True',pts:3,hint:''},{desc:'Kết quả hello=False',kw:'False',pts:3,hint:''},{desc:'Panama sau xử lý=True',kw:'True',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b2-2_3',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích in/not in với chuỗi',desc:`<b>Đề bài:</b> Chạy và giải thích:<pre class="ex-code">s = "Python Programming"
print("Python" in s)      # ___
print("python" in s)      # ___
print("gram" in s)        # ___
print(s.find("gram"))     # ___</pre><b>Output:</b><pre class="ex-code">True
False
True
9</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng → GHI giá trị
DỰ ĐOÁN output → CHẠY kiểm tra</pre>`,rb:[{desc:'Giải thích case-sensitive',kw:'False',pts:4,hint:''},{desc:'"gram" in s → True',kw:'True',pts:3,hint:''},{desc:'find("gram")=9',kw:'9',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b3-3_1',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B3 – Áp dụng',num:'3.1',title:'Đếm từ trong câu',desc:`<b>Đề bài:</b> Nhập một câu. In: số từ, số ký tự (không tính khoảng trắng), từ dài nhất, từ ngắn nhất.<br><b>Input:</b> <code>Tin hoc la mon hoc thu vi</code><br><b>Output:</b><pre class="ex-code">Số từ: 7
Số ký tự: 20
Dài nhất: hoc
Ngắn nhất: la</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. XÁC ĐỊNH Input / Output
2. NHẬP dữ liệu (input + ép kiểu)
3. XỬ LÝ theo yêu cầu
4. IN kết quả</pre>`,rb:[{desc:'Tách từ bằng split()',kw:'split()',pts:3,hint:''},{desc:'Đếm len(ds_tu)',kw:'len(',pts:2,hint:''},{desc:'Tổng ký tự không khoảng trắng',kw:'replace(" ","",2)',pts:2,hint:''},{desc:'Tìm từ dài/ngắn nhất',kw:'max(ds_tu,key=len)',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b3-3_2',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B3 – Áp dụng',num:'3.2',title:'Kiểm tra mật khẩu mạnh',desc:`<b>Đề bài:</b> Nhập mật khẩu. Kiểm tra: ≥8 ký tự, có chữ hoa, có chữ thường, có số, có ký tự đặc biệt (!@#$%). In "Mạnh" / "Trung bình" / "Yếu".<br><b>Input:</b> <code>Abc123!</code><br><b>Output:</b> <code>Mật khẩu: Trung bình (≥8 ký tự chưa đạt)</code>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. XÁC ĐỊNH Input / Output
2. NHẬP dữ liệu (input + ép kiểu)
3. XỬ LÝ theo yêu cầu
4. IN kết quả</pre>`,rb:[{desc:'Kiểm tra len >= 8',kw:'len(pw) >= 8',pts:2,hint:''},{desc:'Kiểm tra any(c.isupper())',kw:'isupper',pts:2,hint:''},{desc:'Kiểm tra có số',kw:'isdigit',pts:2,hint:''},{desc:'Kiểm tra ký tự đặc biệt',kw:'!@#',pts:2,hint:''},{desc:'Phân loại đúng Mạnh/TB/Yếu',kw:'elif',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b3-3_3',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B3 – Áp dụng',num:'3.3',title:'Mã hóa ROT13',desc:`<b>Đề bài:</b> Cài mã hóa ROT13: dịch chữ cái 13 vị trí (a→n, b→o, ..., z→m). Chữ hoa/thường giữ nguyên, ký tự khác không đổi. Mã hóa và giải mã dùng cùng hàm.<br><b>Input:</b> <code>Hello, World!</code><br><b>Output:</b><pre class="ex-code">Mã hóa:  Uryyb, Jbeyq!
Giải mã: Hello, World!</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. XÁC ĐỊNH Input / Output
2. NHẬP dữ liệu (input + ép kiểu)
3. XỬ LÝ theo yêu cầu
4. IN kết quả</pre>`,rb:[{desc:'Xử lý chữ thường a-z',kw:'ord',pts:3,hint:''},{desc:'Xử lý chữ hoa A-Z',kw:'ord',pts:3,hint:''},{desc:'Giữ nguyên ký tự không phải chữ',kw:'isalpha',pts:2,hint:''},{desc:'Mã hóa và giải mã giống nhau',kw:'rot13',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b4-4_1',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi chuỗi bất biến',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm, giải thích và sửa:<pre class="ex-code">s = "hello world"
s[0] = "H"        # Lỗi 1
s[6] = "W"        # Lỗi 2
print(s)</pre><b>Output sau sửa:</b> <code>Hello World</code>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. ĐỌC code có lỗi
2. CHẠY để thấy lỗi
3. PHÂN TÍCH nguyên nhân
4. SỬA và kiểm tra lại</pre>`,rb:[{desc:'Giải thích TypeError: str bất biến',kw:'#',pts:3,hint:''},{desc:'Sửa Lỗi 1: s = "H" + s[1:]',kw:'s[1:]',pts:4,hint:''},{desc:'Sửa Lỗi 2: thay thế đúng từ vị trí 6',kw:'s[7:]',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b4-4_2',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích kiểm tra email hợp lệ',desc:`<b>Đề bài:</b> Code kiểm tra email có lỗi logic. Tìm và sửa 3 điều kiện thiếu:<pre class="ex-code">def hop_le(email):
    return "@" in email  # Chưa đủ!

# Kiểm tra: abc@x.com, @bad.com, no-at-sign, a@b</pre>Viết lại đầy đủ: có @, có ký tự trước @, có dấu chấm sau @, TLD ≥ 2 ký tự.`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. ĐỌC code có lỗi
2. CHẠY để thấy lỗi
3. PHÂN TÍCH nguyên nhân
4. SỬA và kiểm tra lại</pre>`,rb:[{desc:'Kiểm tra @ có trong email',kw:'@ in email',pts:2,hint:''},{desc:'Kiểm tra ký tự trước @',kw:'at_idx > 0',pts:2,hint:''},{desc:'Kiểm tra dấu chấm sau @',kw:'dot_idx',pts:2,hint:''},{desc:'Kiểm tra TLD ≥ 2 ký tự',kw:'len(email[dot_idx+1:]) >= 2',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b4-4_3',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu đảo ngược từng từ trong câu',desc:`<b>Đề bài:</b> Viết lại code sau dùng list comprehension và join():<pre class="ex-code">cau = "Python rat thu vi"
tu_list = cau.split(" ")
ket_qua = []
for tu in tu_list:
    ket_qua.append(tu[::-1])
print(" ".join(ket_qua))</pre><b>Output:</b> <code>nohtyP tar iv uht</code>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. ĐỌC code có lỗi
2. CHẠY để thấy lỗi
3. PHÂN TÍCH nguyên nhân
4. SỬA và kiểm tra lại</pre>`,rb:[{desc:'Dùng split()',kw:'split()',pts:2,hint:''},{desc:'List comprehension đảo ngược',kw:'[::-1]',pts:4,hint:''},{desc:'Dùng join() đúng',kw:'join(',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b5-5_1',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh tốc độ nối chuỗi',desc:`<b>Đề bài:</b> So sánh 3 cách nối 10000 chuỗi — cách nào nhanh nhất?<pre class="ex-code">## Cách 1: += nối trực tiếp (chậm)
## Cách 2: list + join() (nhanh)
## Cách 3: "".join(str(i) for i in range(10000))</pre>Đo thời gian và giải thích tại sao Cách 2,3 nhanh hơn.`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. VIẾT 2+ cách giải
2. SO SÁNH: đúng, nhanh, đọc
3. ĐO LƯỜNG bằng time hoặc đếm
4. KẾT LUẬN cách tối ưu</pre>`,rb:[{desc:'Cách 1: += nối',kw:'+=',pts:2,hint:''},{desc:'Cách 2: list+join',kw:'join(',pts:3,hint:''},{desc:'Đo time chính xác',kw:'time.time',pts:3,hint:''},{desc:'Giải thích O(n²) vs O(n)',kw:'#',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b5-5_2',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá thuật toán kiểm tra palindrome',desc:`<b>Đề bài:</b> So sánh 2 cách kiểm tra palindrome — cách nào ngắn hơn và hiệu quả hơn?<pre class="ex-code">## Cách 1: đảo rồi so sánh
def p1(s): return s==s[::-1]
## Cách 2: 2 con trỏ
def p2(s):
    lo,hi=0,len(s)-1
    while lo<hi:
        if s[lo]!=s[hi]: return False
        lo+=1;hi-=1
    return True</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. VIẾT 2+ cách giải
2. SO SÁNH: đúng, nhanh, đọc
3. ĐO LƯỜNG bằng time hoặc đếm
4. KẾT LUẬN cách tối ưu</pre>`,rb:[{desc:'Cài đúng cả 2 cách',kw:'def p1',pts:3,hint:''},{desc:'Kiểm tra 5 test cases',kw:'assert',pts:3,hint:''},{desc:'So sánh O(n) cả 2, nhưng hằng số khác',kw:'#',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b5-5_3',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn cách xử lý chuỗi tiếng Việt',desc:`<b>Đề bài:</b> So sánh 2 cách chuẩn hóa chuỗi tiếng Việt (bỏ dấu):<pre class="ex-code">## Cách 1: replace() thủ công từng ký tự
## Cách 2: unicodedata.normalize + encode/decode</pre>Kiểm tra: "Xin chào Việt Nam" → "Xin chao Viet Nam"`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. VIẾT 2+ cách giải
2. SO SÁNH: đúng, nhanh, đọc
3. ĐO LƯỜNG bằng time hoặc đếm
4. KẾT LUẬN cách tối ưu</pre>`,rb:[{desc:'Cách 1: dùng dict replace',kw:'replace(',pts:3,hint:''},{desc:'Cách 2: unicodedata',kw:'unicodedata',pts:3,hint:''},{desc:'Kết quả chuẩn hóa đúng',kw:'Viet Nam',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b6-6_1',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B6 – Sáng tạo',num:'6.1',title:'Bộ tách từ và thống kê văn bản',desc:`<b>Đề bài:</b> Nhập đoạn văn nhiều dòng (kết thúc bằng dòng trống). Thống kê: tổng từ, từ phổ biến nhất (top 5), số câu, mật độ từ.<br><b>Output mẫu:</b><pre class="ex-code">Tổng từ: 87 | Câu: 5
Top 5: [("the",12),("is",8),...]</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. ĐỌC ĐỀ: Input? Output? Ràng buộc?
2. MÃ GIẢ → thiết kế thuật toán
3. VIẾT CODE từng bước nhỏ
4. KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập nhiều dòng đến dòng trống',kw:'while True',pts:2,hint:''},{desc:'Tách từ và đếm tần suất',kw:'split()',pts:3,hint:''},{desc:'Sắp xếp theo tần suất giảm dần',kw:'sorted(',pts:3,hint:''},{desc:'In đúng top 5',kw:'print',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b6-6_2',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B6 – Sáng tạo',num:'6.2',title:'Sinh mật khẩu ngẫu nhiên',desc:`<b>Đề bài:</b> Thiết kế hàm sinh mật khẩu mạnh: độ dài tùy chọn (8–32), đảm bảo có ít nhất 1 hoa, 1 thường, 1 số, 1 đặc biệt. Sinh 5 mật khẩu mẫu.<br><b>Output mẫu:</b><pre class="ex-code">Kq9#mXpL
T3@nWvRz
...</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. ĐỌC ĐỀ: Input? Output? Ràng buộc?
2. MÃ GIẢ → thiết kế thuật toán
3. VIẾT CODE từng bước nhỏ
4. KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Dùng random.choice',kw:'random',pts:2,hint:''},{desc:'Đảm bảo 4 loại ký tự',kw:'upper()',pts:3,hint:''},{desc:'Xáo ngẫu nhiên kết quả',kw:'random.shuffle',pts:3,hint:''},{desc:'Sinh đúng 5 mật khẩu khác nhau',kw:'for',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-24-b6-6_3',g:'K10',ch:'Bài 24: Xâu ký tự',lv:'B6 – Sáng tạo',num:'6.3',title:'Phân tích và định dạng dữ liệu CSV',desc:`<b>Đề bài:</b> Đọc chuỗi CSV, parse dữ liệu, tính thống kê và in bảng đẹp:<br><b>Input chuỗi:</b> <code>An,16,8.5;Bình,17,7.0;Cường,16,9.2;Dung,17,6.8</code><br><b>Output:</b><pre class="ex-code">╔═══════╦═════╦═══════╗
║ Tên   ║Tuổi ║ Điểm  ║
╠═══════╬═════╬═══════╣
║ An    ║  16 ║  8.50 ║
...</pre>`,theory:`<b>1. Chuỗi cơ bản</b>
<pre class="ex-code">s = "Xin chào Python"
len(s)        # 17 – độ dài
s[0]          # 'X' – ký tự đầu
s[-1]         # 'n' – ký tự cuối
s[4:8]        # 'chào' – cắt chuỗi
s[::-1]       # đảo ngược chuỗi</pre>
<b>2. Nối và lặp</b>
<pre class="ex-code">s1 + s2        # nối
s * 3          # lặp 3 lần
f"Xin chào {ten}!"  # f-string</pre>
<b>3. Chuỗi bất biến (immutable)</b><br>
Không thể sửa trực tiếp: <code>s[0]="a"</code> → <b>TypeError!</b><br>
Phải tạo chuỗi mới: <code>s = "a" + s[1:]</code>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. ĐỌC ĐỀ: Input? Output? Ràng buộc?
2. MÃ GIẢ → thiết kế thuật toán
3. VIẾT CODE từng bước nhỏ
4. KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Split ";" để tách hàng',kw:'split(";")',pts:2,hint:''},{desc:'Split "," để tách cột',kw:'split(",")',pts:2,hint:''},{desc:'In bảng có viền đẹp',kw:'╔',pts:3,hint:''},{desc:'Tính TB điểm đúng',kw:'sum/len',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
/* Bài 25: Lệnh với xâu */
{id:'k10-25-b1-1_1',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B1 – Nhận biết',num:'1.1',title:'Phương thức upper/lower/strip',desc:`<b>Đề bài:</b> Cho <code>s = "  Hello World  "</code>. Điền kết quả:<pre class="ex-code">print(s.strip())       # ___
print(s.upper())       # ___
print(s.lower())       # ___
print(len(s))          # ___
print(len(s.strip())) # ___</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI giá trị biến
ĐIỀN kết quả vào chỗ trống</pre>`,rb:[{desc:'strip() đúng',kw:'Hello World',pts:3,hint:''},{desc:'upper()/lower() đúng',kw:'HELLO',pts:3,hint:''},{desc:'len(s)=15 vs len(strip)=11',kw:'15',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b1-1_2',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B1 – Nhận biết',num:'1.2',title:'Phương thức split/join',desc:`<b>Đề bài:</b> Điền kết quả rồi chạy kiểm tra:<pre class="ex-code">s = "Tin,Hoc,10,KNTT"
ds = s.split(",")     # ___
print(len(ds))        # ___
print(ds[2])          # ___
print("-".join(ds))   # ___</pre><b>Output:</b><pre class="ex-code">["Tin","Hoc","10","KNTT"]
4
10
Tin-Hoc-10-KNTT</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI giá trị biến
ĐIỀN kết quả vào chỗ trống</pre>`,rb:[{desc:'split đúng',kw:'split',pts:3,hint:''},{desc:'len=4',kw:'4',pts:2,hint:''},{desc:'ds[2]="10"',kw:'10',pts:2,hint:''},{desc:'join đúng',kw:'Tin-Hoc',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b1-1_3',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B1 – Nhận biết',num:'1.3',title:'Phương thức find/replace/count',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">s = "banana"
print(s.count("a"))     # ___
print(s.find("nan"))    # ___
print(s.replace("a","o")) # ___
print(s.startswith("ban")) # ___</pre><b>Output:</b><pre class="ex-code">3
1
bonono
True</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI giá trị biến
ĐIỀN kết quả vào chỗ trống</pre>`,rb:[{desc:'count("a")=3',kw:'3',pts:3,hint:''},{desc:'find("nan")=1',kw:'1',pts:3,hint:''},{desc:'replace đúng',kw:'bonono',pts:2,hint:''},{desc:'startswith=True',kw:'True',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b2-2_1',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B2 – Hiểu',num:'2.1',title:'Trace phân tích họ tên',desc:`<b>Đề bài:</b> Trace và dự đoán output:<pre class="ex-code">ho_ten = "Nguyễn Văn An"
ds = ho_ten.split()
print(ds[-1])           # tên
print(ds[0])            # họ
print(len(ds))          # số từ
print(ho_ten.upper())   # in hoa</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng → GHI giá trị
DỰ ĐOÁN output → CHẠY kiểm tra</pre>`,rb:[{desc:'ds[-1]="An"',kw:'An',pts:3,hint:''},{desc:'ds[0]="Nguyễn"',kw:'Nguyễn',pts:3,hint:''},{desc:'len=3 từ',kw:'3',pts:2,hint:''},{desc:'upper đúng',kw:'NGUYỄN',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b2-2_2',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích chuỗi định dạng',desc:`<b>Đề bài:</b> Chạy và giải thích output của từng dòng:<pre class="ex-code">s = "Hello"
print(s.center(11,"*"))  # *****Hello*****
print(s.ljust(10,"-"))   # Hello-----
print(s.rjust(10,"."))   # .....Hello
print(s.zfill(8))        # 000Hello</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng → GHI giá trị
DỰ ĐOÁN output → CHẠY kiểm tra</pre>`,rb:[{desc:'center đúng',kw:'*****Hello*****',pts:3,hint:''},{desc:'ljust/rjust đúng',kw:'Hello-----',pts:3,hint:''},{desc:'zfill đúng',kw:'000Hello',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b2-2_3',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu is-methods',desc:`<b>Đề bài:</b> Dự đoán True/False rồi kiểm tra:<pre class="ex-code">print("123".isdigit())   # ___
print("abc".isalpha())   # ___
print("abc123".isalnum()) # ___
print("  ".isspace())    # ___
print("Hello".istitle()) # ___</pre><b>Output:</b> True True True True True`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng → GHI giá trị
DỰ ĐOÁN output → CHẠY kiểm tra</pre>`,rb:[{desc:'5 kết quả đúng True',kw:'True',pts:8,hint:''},{desc:'Có chú thích giải thích từng hàm',kw:'#',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b3-3_1',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B3 – Áp dụng',num:'3.1',title:'Chuẩn hóa và kiểm tra dữ liệu nhập',desc:`<b>Đề bài:</b> Nhập họ tên, xử lý: loại khoảng trắng thừa, viết hoa chữ đầu mỗi từ, kiểm tra chỉ gồm chữ và khoảng trắng.<br><b>Input:</b> <code>  nguyen van  an  </code><br><b>Output:</b> <code>Nguyễn Van An</code> (sau title())<br><b>Input sai:</b> <code>Nguyen123</code> → <code>Lỗi: Họ tên chứa ký tự không hợp lệ</code>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. XÁC ĐỊNH Input / Output
2. NHẬP dữ liệu (input + ép kiểu)
3. XỬ LÝ theo yêu cầu
4. IN kết quả</pre>`,rb:[{desc:'strip() loại khoảng trắng',kw:'strip()',pts:2,hint:''},{desc:'title() viết hoa đầu từ',kw:'title()',pts:3,hint:''},{desc:'Kiểm tra replace(" ","").isalpha()',kw:'isalpha',pts:3,hint:''},{desc:'Thông báo lỗi khi sai',kw:'Lỗi',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b3-3_2',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B3 – Áp dụng',num:'3.2',title:'Phân tích và đếm từ loại',desc:`<b>Đề bài:</b> Nhập câu văn. Đếm: tổng từ, từ bắt đầu bằng chữ hoa, từ toàn số, từ dài nhất và ngắn nhất.<br><b>Input:</b> <code>Python 3 là ngôn ngữ Tuyệt Vời số 1</code><br><b>Output:</b><pre class="ex-code">Tổng từ: 9
Chữ hoa đầu: 3
Toàn số: 2
Dài nhất: ngôn (4 ký tự)
Ngắn nhất: 3 (1 ký tự)</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. XÁC ĐỊNH Input / Output
2. NHẬP dữ liệu (input + ép kiểu)
3. XỬ LÝ theo yêu cầu
4. IN kết quả</pre>`,rb:[{desc:'split() tách từ',kw:'split()',pts:2,hint:''},{desc:'Đếm isupper()/istitle()',kw:'isupper',pts:3,hint:''},{desc:'Đếm isdigit()',kw:'isdigit',pts:2,hint:''},{desc:'max/min theo len',kw:'key=len',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b3-3_3',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B3 – Áp dụng',num:'3.3',title:'Định dạng bảng điểm từ chuỗi CSV',desc:`<b>Đề bài:</b> Nhập n dòng dữ liệu CSV dạng "Tên,Toán,Văn,Anh". Tính điểm TB từng học sinh, sắp xếp giảm dần, in bảng đẹp với cột thẳng hàng.<br><b>Input:</b><pre class="ex-code">An,8,7,9
Binh,6,8,7
Cuong,9,9,9</pre><b>Output bảng xếp hạng theo TB</b>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. XÁC ĐỊNH Input / Output
2. NHẬP dữ liệu (input + ép kiểu)
3. XỬ LÝ theo yêu cầu
4. IN kết quả</pre>`,rb:[{desc:'split(",") tách cột',kw:'split(",",',pts:2,hint:''},{desc:'Tính TB 3 môn',kw:'(t+v+a)/3',pts:3,hint:''},{desc:'Sắp xếp giảm dần',kw:'sorted(',pts:2,hint:''},{desc:'In bảng căn cột',kw:'ljust',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b4-4_1',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi xử lý chuỗi',desc:`<b>Đề bài:</b> Code tách email có 3 lỗi. Sửa để chạy đúng:<pre class="ex-code">email = "user@example.com"
user = email.split("@")[0]
domain = email.split("@")[1]
tld = domain.split(".")[1]  # Lỗi nếu domain có nhiều .
print(f"User: {user}")
print(f"TLD: {tld.upper}")</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. ĐỌC code có lỗi
2. CHẠY để thấy lỗi
3. PHÂN TÍCH nguyên nhân
4. SỬA và kiểm tra lại</pre>`,rb:[{desc:'Sửa lấy TLD: split(".")[-1]',kw:'[-1]',pts:4,hint:''},{desc:'Sửa upper(): cần dấu ()',kw:'upper()',pts:3,hint:''},{desc:'Code chạy đúng với gmail.com.vn',kw:'print',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b4-4_2',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích replace vs re.sub',desc:`<b>Đề bài:</b> replace() có hạn chế gì? Viết 2 cách xóa tất cả dấu câu trong câu:<pre class="ex-code">s = "Hello, World! This is Python 3.x; great?"
## Cách 1: replace() từng ký tự
## Cách 2: translate()</pre>In kết quả không có dấu câu.`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. ĐỌC code có lỗi
2. CHẠY để thấy lỗi
3. PHÂN TÍCH nguyên nhân
4. SỬA và kiểm tra lại</pre>`,rb:[{desc:'Cách 1: lặp replace từng dấu câu',kw:'for dau in',pts:3,hint:''},{desc:'Cách 2: translate/maketrans',kw:'translate(',pts:3,hint:''},{desc:'Kết quả đúng không có dấu câu',kw:'print',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b4-4_3',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu đếm tần suất ký tự',desc:`<b>Đề bài:</b> Viết 3 cách đếm tần suất ký tự trong chuỗi, so sánh code và kết quả:<pre class="ex-code">## Cách 1: dict thủ công
## Cách 2: s.count(c) cho từng ký tự
## Cách 3: from collections import Counter</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. ĐỌC code có lỗi
2. CHẠY để thấy lỗi
3. PHÂN TÍCH nguyên nhân
4. SỬA và kiểm tra lại</pre>`,rb:[{desc:'Cách 1: dict tự đếm',kw:'if c in dem',pts:2,hint:''},{desc:'Cách 2: s.count()',kw:'for c in set(s)',pts:2,hint:''},{desc:'Cách 3: Counter',kw:'Counter(',pts:4,hint:''},{desc:'Kết quả 3 cách giống nhau',kw:'True',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b5-5_1',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh split() và re.split()',desc:`<b>Đề bài:</b> Tách chuỗi "An; Bình,  Cường	Dung" theo nhiều loại dấu phân cách. So sánh split() (tách theo 1 ký tự) vs re.split() (tách theo nhiều loại).`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. VIẾT 2+ cách giải
2. SO SÁNH: đúng, nhanh, đọc
3. ĐO LƯỜNG bằng time hoặc đếm
4. KẾT LUẬN cách tối ưu</pre>`,rb:[{desc:'split thất bại với mixed delimiters',kw:'split',pts:2,hint:''},{desc:'re.split pattern đúng',kw:'re.split',pts:4,hint:''},{desc:'Kết quả chuẩn hóa đúng',kw:'["An","Bình"',pts:4,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b5-5_2',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hàm kiểm tra số nguyên',desc:`<b>Đề bài:</b> So sánh 2 cách kiểm tra chuỗi có phải số nguyên không — cách nào robust hơn?<pre class="ex-code">## Cách 1: isdigit()
"123".isdigit()    # True
"-123".isdigit()   # False! (sai)
## Cách 2: try-except
try: int(s); True
except: False</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. VIẾT 2+ cách giải
2. SO SÁNH: đúng, nhanh, đọc
3. ĐO LƯỜNG bằng time hoặc đếm
4. KẾT LUẬN cách tối ưu</pre>`,rb:[{desc:'isdigit() thất bại với số âm',kw:'"−123"',pts:3,hint:''},{desc:'try-except xử lý đúng số âm',kw:'try',pts:4,hint:''},{desc:'Kết luận cách 2 robust hơn',kw:'#',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b5-5_3',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn phương thức tối ưu',desc:`<b>Đề bài:</b> Với bài toán "tìm tất cả email trong đoạn văn", đánh giá: find() lặp, split() lặp, hay re.findall()? Minh họa và đo thời gian với 10000 ký tự.`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. VIẾT 2+ cách giải
2. SO SÁNH: đúng, nhanh, đọc
3. ĐO LƯỜNG bằng time hoặc đếm
4. KẾT LUẬN cách tối ưu</pre>`,rb:[{desc:'find() lặp tìm @',kw:'find("@")',pts:2,hint:''},{desc:'split() tách heuristic',kw:'split()',pts:2,hint:''},{desc:'re.findall() chính xác nhất',kw:'re.findall',pts:3,hint:''},{desc:'Đo thời gian 3 cách',kw:'time',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b6-6_1',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B6 – Sáng tạo',num:'6.1',title:'Trình phân tích log hệ thống',desc:`<b>Đề bài:</b> Nhập n dòng log dạng: <code>[2024-01-15 09:30:21] ERROR: File not found</code>. Parse và thống kê: số lỗi ERROR/WARNING/INFO, in 3 lỗi ERROR gần nhất.<br><b>Input:</b> Nhiều dòng log, kết thúc bằng "END"`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. ĐỌC ĐỀ: Input? Output? Ràng buộc?
2. MÃ GIẢ → thiết kế thuật toán
3. VIẾT CODE từng bước nhỏ
4. KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Tách timestamp bằng split/find',kw:'split("]")',pts:2,hint:''},{desc:'Xác định loại log (ERROR/WARNING)',kw:'split(":")[-1]',pts:3,hint:''},{desc:'Đếm từng loại',kw:'count_error',pts:3,hint:''},{desc:'In 3 ERROR gần nhất',kw:'[-3:]',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b6-6_2',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B6 – Sáng tạo',num:'6.2',title:'Sinh slug URL từ tiêu đề',desc:`<b>Đề bài:</b> Chuyển tiêu đề bài viết thành slug URL: loại dấu tiếng Việt, viết thường, thay khoảng trắng bằng "-", xóa ký tự đặc biệt.<br><b>Input:</b> <code>Hướng dẫn lập trình Python 3!</code><br><b>Output:</b> <code>huong-dan-lap-trinh-python-3</code>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. ĐỌC ĐỀ: Input? Output? Ràng buộc?
2. MÃ GIẢ → thiết kế thuật toán
3. VIẾT CODE từng bước nhỏ
4. KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Xóa dấu tiếng Việt',kw:'replace(',pts:2,hint:''},{desc:'lower() viết thường',kw:'lower()',pts:2,hint:''},{desc:'replace khoảng trắng → "-"',kw:'replace(" ","-")',pts:3,hint:''},{desc:'Xóa ký tự đặc biệt',kw:'isalnum',pts:3,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
{id:'k10-25-b6-6_3',g:'K10',ch:'Bài 25: Lệnh với xâu',lv:'B6 – Sáng tạo',num:'6.3',title:'Trò chơi đố chữ Hangman',desc:`<b>Đề bài:</b> Cài game Hangman: máy chọn từ ngẫu nhiên, người đoán từng chữ, tối đa 6 lần sai. Hiển thị gợi ý (ký tự đúng/sai) và "hình treo cổ" bằng text art.<br><b>Output mẫu:</b><pre class="ex-code">P _ _ h _ n  (3/6 sai)
Các chữ sai: [a, b, c]</pre>`,theory:`<b>Phương thức chuỗi quan trọng:</b>
<pre class="ex-code">s.upper()           # CHUYỂN HOA
s.lower()           # chuyển thường
s.strip()           # xóa khoảng trắng đầu cuối
s.lstrip(), rstrip()# xóa 1 bên
s.split(",")        # tách → list
",".join(lst)       # nối list → chuỗi
s.replace("a","b")  # thay thế
s.find("sub")       # vị trí (-1 nếu không có)
s.count("a")        # đếm lần xuất hiện
s.startswith("Hi")  # kiểm tra đầu chuỗi
s.endswith(".py")   # kiểm tra cuối chuỗi
s.isdigit()         # toàn số?
s.isalpha()         # toàn chữ cái?
s.isspace()         # toàn khoảng trắng?
s.center(20,"*")    # căn giữa</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. ĐỌC ĐỀ: Input? Output? Ràng buộc?
2. MÃ GIẢ → thiết kế thuật toán
3. VIẾT CODE từng bước nhỏ
4. KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Chọn từ ngẫu nhiên',kw:'random.choice',pts:2,hint:''},{desc:'Hiển thị _ và ký tự đúng',kw:'_',pts:3,hint:''},{desc:'Theo dõi chữ đã đoán và sai',kw:'chua_doan',pts:3,hint:''},{desc:'Kết thúc đúng lúc thắng/thua',kw:'break',pts:2,hint:''}],errors:['Chuỗi bất biến: <code>s[0]="a"</code> → TypeError','Nhầm <code>+</code> nối chuỗi với <code>+</code> cộng số: <code>"5"+3</code> → TypeError','Quên dấu nháy khi so sánh: <code>if x == abc</code> → NameError']},
/* Bài 26: Hàm trong Python */
{id:'k10-26-b1-1_1',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết cú pháp def',desc:`<b>Đề bài:</b> Câu nào có cú pháp hàm ĐÚNG? Điền kết quả của hàm đúng khi gọi với x=5:<pre class="ex-code">A) def tinh(x) return x*2      # sai
B) def tinh(x): return x*2     # đúng
C) function tinh(x): return x*2 # sai
D) def tinh(x):
       return x*2              # đúng</pre>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'Chọn đúng B và D',kw:'def tinh(x):',pts:4,hint:''},{desc:'Giải thích lỗi A (thiếu :)',kw:'#',pts:3,hint:''},{desc:'Giải thích lỗi C (function không dùng)',kw:'#',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b1-1_2',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B1 – Nhận biết',num:'1.2',title:'Đọc và điền kết quả hàm',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">def chao(ten):
    return f"Xin chào, {ten}!"

def tinh_bq(a, b):
    return (a + b) / 2

print(chao("An"))         # ___
print(tinh_bq(6, 10))     # ___
print(type(chao("An")))   # ___</pre>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'chao("An") đúng',kw:'Xin chào, An!',pts:4,hint:''},{desc:'tinh_bq(6,10)=8.0',kw:'8.0',pts:3,hint:''},{desc:'type là str',kw:'str',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b1-1_3',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết return vs print trong hàm',desc:`<b>Đề bài:</b> Hai hàm sau khác nhau thế nào? Dự đoán và chạy kiểm tra:<pre class="ex-code">def ham_a(x):       def ham_b(x):
    print(x*2)          return x*2

ket_qua_a = ham_a(5)
ket_qua_b = ham_b(5)
print(ket_qua_a)    # ___
print(ket_qua_b)    # ___</pre>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'ham_a in ra 10 nhưng kq_a=None',kw:'None',pts:4,hint:''},{desc:'ham_b không in, kq_b=10',kw:'10',pts:3,hint:''},{desc:'Giải thích return vs print',kw:'#',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b2-2_1',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B2 – Hiểu',num:'2.1',title:'Trace hàm đệ quy đơn giản',desc:`<b>Đề bài:</b> Trace từng bước gọi hàm với n=4:<pre class="ex-code">def tinh_tong(n):
    if n == 0: return 0
    return n + tinh_tong(n-1)

print(tinh_tong(4))</pre>Vẽ cây gọi hàm và kết quả từng bước.<br><b>Output:</b> <code>10</code>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'Output đúng 10',kw:'10',pts:4,hint:''},{desc:'Trace đúng: 4+3+2+1+0',kw:'tinh_tong(3)',pts:3,hint:''},{desc:'Hiểu base case n==0',kw:'if n == 0',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b2-2_2',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích scope của biến trong hàm',desc:`<b>Đề bài:</b> Dự đoán và giải thích output:<pre class="ex-code">x = 10
def ham():
    x = 99    # biến local
    return x

print(ham())   # ___
print(x)       # ___</pre><b>Output:</b><pre class="ex-code">99
10</pre>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'ham() trả 99 (local)',kw:'99',pts:4,hint:''},{desc:'x ngoài vẫn là 10 (global)',kw:'10',pts:3,hint:''},{desc:'Giải thích biến local vs global',kw:'#',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b2-2_3',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu hàm là đối tượng first-class',desc:`<b>Đề bài:</b> Chạy và giải thích:<pre class="ex-code">def nhan_doi(x): return x * 2
def ap_dung(ham, danh_sach):
    return [ham(x) for x in danh_sach]

print(ap_dung(nhan_doi, [1,2,3,4,5]))</pre><b>Output:</b> <code>[2, 4, 6, 8, 10]</code>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'Output [2,4,6,8,10] đúng',kw:'[2, 4',pts:4,hint:''},{desc:'Giải thích hàm là tham số',kw:'#',pts:3,hint:''},{desc:'Hiểu higher-order function',kw:'ap_dung',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b3-3_1',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B3 – Áp dụng',num:'3.1',title:'Bộ 4 hàm hình học',desc:`<b>Đề bài:</b> Viết 4 hàm tính diện tích: hình tròn (r), hình chữ nhật (a,b), tam giác (a,h), hình thang (a,b,h). Nhập loại hình và các tham số, gọi hàm tương ứng in kết quả.<br><b>Input:</b><pre class="ex-code">hinh_tron
5</pre><b>Output:</b><pre class="ex-code">Diện tích hình tròn: 78.54</pre>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Định nghĩa đúng 4 hàm',kw:'def',pts:3,hint:''},{desc:'Gọi hàm đúng theo lựa chọn',kw:'if',pts:3,hint:''},{desc:'In kết quả 2 chữ số TP',kw:':.2f',pts:2,hint:''},{desc:'Xử lý loại hình không hợp lệ',kw:'else',pts:2,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b3-3_2',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B3 – Áp dụng',num:'3.2',title:'Hàm tính tiền điện theo bậc thang',desc:`<b>Đề bài:</b> Viết hàm <code>tinh_tien_dien(kwh)</code> theo bậc thang (≤50=1678đ, ≤100=1734đ, >100=2014đ). Nhập số kWh và in kết quả.<br><b>Input:</b> <code>120</code><br><b>Output:</b> <code>Tiền điện: 210,880 đồng</code>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Định nghĩa hàm với tham số kwh',kw:'def tinh_tien_dien',pts:3,hint:''},{desc:'Tính đúng 3 bậc trong hàm',kw:'elif',pts:4,hint:''},{desc:'Gọi hàm và in đúng',kw:':,',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b3-3_3',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B3 – Áp dụng',num:'3.3',title:'Hàm kiểm tra số nguyên tố',desc:`<b>Đề bài:</b> Viết hàm <code>la_nguyen_to(n)</code> trả True/False. Dùng hàm để in tất cả số nguyên tố từ 2 đến n.<br><b>Input:</b> <code>30</code><br><b>Output:</b> <code>2 3 5 7 11 13 17 19 23 29</code>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Hàm la_nguyen_to(n) đúng',kw:'def la_nguyen_to',pts:3,hint:''},{desc:'Kiểm tra chia hết từ 2 đến sqrt(n)',kw:'int(n**0.5)',pts:3,hint:''},{desc:'Dùng hàm trong vòng for',kw:'la_nguyen_to(',pts:4,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b4-4_1',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B4 – Phân tích',num:'4.1',title:'Debug hàm không có return',desc:`<b>Đề bài:</b> Hàm sau tại sao in ra None? Sửa lại:<pre class="ex-code">def tinh_tb(a, b, c):
    tb = (a + b + c) / 3
    print(f"TB = {tb:.2f}")  # in ra nhưng không return!

ket_qua = tinh_tb(7, 8, 9)
print("Kết quả:", ket_qua)  # In: None!</pre>`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Thêm return tb',kw:'return tb',pts:4,hint:''},{desc:'Giải thích: print ≠ return',kw:'#',pts:3,hint:''},{desc:'In kết quả đúng 8.0',kw:'8.0',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b4-4_2',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích lỗi gọi đệ quy không dừng',desc:`<b>Đề bài:</b> Hàm đệ quy sau chạy mãi và báo RecursionError. Tìm lỗi và sửa:<pre class="ex-code">def dem_nguoc(n):
    print(n)
    dem_nguoc(n - 1)   # Lỗi: không có điều kiện dừng!</pre>Sửa: dừng khi n <= 0.`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Thêm if n <= 0: return',kw:'if n <= 0',pts:4,hint:''},{desc:'Giải thích RecursionError',kw:'#',pts:3,hint:''},{desc:'Test đúng với n=5',kw:'dem_nguoc(5)',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b4-4_3',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu hàm tính n! bằng memoization',desc:`<b>Đề bài:</b> Hàm n! đệ quy tính lại nhiều lần. Tối ưu bằng cách lưu kết quả đã tính:<pre class="ex-code">## Chậm: tính lại mỗi lần
def giai_thua_cham(n):
    if n==0: return 1
    return n * giai_thua_cham(n-1)</pre>Thêm dict cache để lưu kết quả đã tính.`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Dict cache lưu kết quả',kw:'cache',pts:4,hint:''},{desc:'Kiểm tra cache trước khi tính',kw:'if n in cache',pts:3,hint:''},{desc:'Kết quả giống hàm cũ',kw:'assert',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b5-5_1',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh hàm vs code inline',desc:`<b>Đề bài:</b> So sánh: viết tính diện tích 5 hình khác nhau (1) không dùng hàm (2) dùng hàm. Đếm số dòng code và số lần lặp lại.`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Code inline: công thức lặp 5 lần',kw:'print',pts:2,hint:''},{desc:'Code hàm: def 1 lần, gọi 5 lần',kw:'def',pts:4,hint:''},{desc:'Đếm dòng code tiết kiệm được',kw:'#',pts:4,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b5-5_2',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá đệ quy vs vòng lặp',desc:`<b>Đề bài:</b> So sánh tính n! bằng đệ quy và vòng lặp với n=10,100,1000. Đo thời gian và giới hạn đệ quy Python (mặc định 1000).`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Cài đệ quy đúng',kw:'def gt_dq',pts:2,hint:''},{desc:'Cài vòng lặp đúng',kw:'for i in range',pts:2,hint:''},{desc:'Đo thời gian cả hai',kw:'time',pts:3,hint:''},{desc:'Tìm giới hạn sys.setrecursionlimit',kw:'RecursionError',pts:3,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b5-5_3',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B5 – Đánh giá',num:'5.3',title:'Lambda vs def: khi nào dùng cái nào',desc:`<b>Đề bài:</b> Viết cùng 3 phép tính bằng def và lambda. Đánh giá độ đọc và tái sử dụng:<pre class="ex-code">## def: rõ ràng, có docstring
## lambda: ngắn gọn, dùng 1 lần</pre>Kết luận khi nào dùng lambda.`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Viết đúng def',kw:'def',pts:3,hint:''},{desc:'Viết đúng lambda',kw:'lambda',pts:3,hint:''},{desc:'Kết luận có căn cứ',kw:'#',pts:4,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b6-6_1',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B6 – Sáng tạo',num:'6.1',title:'Thư viện toán học mini',desc:`<b>Đề bài:</b> Thiết kế module "math_mini" gồm 8 hàm: ucln, bcnn, la_nguyen_to, giai_thua, to_hop, hoan_vi, power (đệ quy), fibonacci(n). Kiểm thử mỗi hàm 3 test cases.`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Định nghĩa đủ 8 hàm',kw:'def ucln',pts:2,hint:''},{desc:'Mỗi hàm đúng thuật toán',kw:'def la_nguyen_to',pts:4,hint:''},{desc:'8×3=24 test cases assert',kw:'assert',pts:4,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b6-6_2',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B6 – Sáng tạo',num:'6.2',title:'Máy tính khoa học dùng hàm',desc:`<b>Đề bài:</b> Viết máy tính khoa học: nhập biểu thức dạng "10 sin", "3.14 sqrt", "5 log", "8 2 pow". Mỗi phép tính là một hàm. Menu lặp đến khi nhập "quit".`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Mỗi phép tính là 1 hàm riêng',kw:'def ham_sin',pts:3,hint:''},{desc:'Dispatch đúng theo phép toán nhập',kw:'if op ==',pts:3,hint:''},{desc:'Xử lý lỗi đầu vào không hợp lệ',kw:'try',pts:2,hint:''},{desc:'Vòng lặp menu hoạt động',kw:'while True',pts:2,hint:''}],errors:['f','u','n','c']},
{id:'k10-26-b6-6_3',g:'K10',ch:'Bài 26: Hàm trong Python',lv:'B6 – Sáng tạo',num:'6.3',title:'Hệ thống bán hàng dùng hàm',desc:`<b>Đề bài:</b> Thiết kế hệ thống bán hàng: hàm <code>tinh_gia(san_pham, so_luong)</code>, <code>tinh_giam_gia(tong, ma_giam)</code>, <code>tinh_thue(tong)</code>, <code>in_hoa_don(khach, items)</code>. Test với đơn hàng mẫu.`,theory:`<b>1. Định nghĩa và gọi hàm</b>
<pre class="ex-code">def tinh_dien_tich(r):
    import math
    return math.pi * r ** 2

dt = tinh_dien_tich(5)   # gọi hàm
print(f"{dt:.2f}")        # 78.54</pre>
<b>2. Hàm không có return</b>
<pre class="ex-code">def in_duong_ke(n=30, ky="─"):
    print(ky * n)   # in ra màn hình</pre>
<b>3. Lợi ích của hàm</b><br>
• Tái sử dụng: viết 1 lần, dùng nhiều lần<br>
• Dễ kiểm thử từng phần độc lập<br>
• Code rõ ràng, dễ bảo trì`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'4 hàm định nghĩa đúng',kw:'def tinh_gia',pts:2,hint:''},{desc:'Logic tính đúng từng bước',kw:'tinh_giam_gia',pts:3,hint:''},{desc:'In hóa đơn đẹp có viền',kw:'╔',pts:3,hint:''},{desc:'Tổng cộng đúng',kw:'tong',pts:2,hint:''}],errors:['f','u','n','c']},
/* Bài 27: Tham số hàm */
{id:'k10-27-b1-1_1',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết tham số mặc định',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">def chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"
print(chao("An"))              # ___
print(chao("Bình", "Hello"))   # ___
print(chao(loi="Hi", ten="Cường")) # ___</pre><b>Output:</b><pre class="ex-code">Xin chào, An!
Hello, Bình!
Hi, Cường!</pre>`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'Gọi thiếu loi → dùng mặc định',kw:'Xin chào, An!',pts:4,hint:''},{desc:'Gọi đủ 2 tham số',kw:'Hello, Bình!',pts:3,hint:''},{desc:'Gọi keyword arguments',kw:'Hi, Cường!',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b1-1_2',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết *args',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">def tong(*so):
    return sum(so)
print(tong(1,2,3))       # ___
print(tong(1,2,3,4,5))   # ___
print(tong())            # ___</pre><b>Output:</b><pre class="ex-code">6
15
0</pre>`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'tong(1,2,3)=6',kw:'6',pts:4,hint:''},{desc:'tong(1,2,3,4,5)=15',kw:'15',pts:3,hint:''},{desc:'tong()=0',kw:'0',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b1-1_3',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết return nhiều giá trị',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">def phan_tich(n):
    return n//100, (n%100)//10, n%10
t, ch, d = phan_tich(987)
print(t, ch, d)
print(type(phan_tich(987)))</pre><b>Output:</b><pre class="ex-code">9 8 7
&lt;class 'tuple'&gt;</pre>`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'In đúng 9 8 7',kw:'9 8 7',pts:4,hint:''},{desc:'type là tuple',kw:'tuple',pts:3,hint:''},{desc:'Hiểu unpacking t,ch,d',kw:'=',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b2-2_1',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B2 – Hiểu',num:'2.1',title:'Trace hàm có tham số mặc định',desc:`<b>Đề bài:</b> Trace và dự đoán output:<pre class="ex-code">def luy_thua(co_so, so_mu=2):
    return co_so ** so_mu
print(luy_thua(3))       # 9
print(luy_thua(2, 10))   # 1024
print(luy_thua(so_mu=3, co_so=4)) # 64</pre>`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'luy_thua(3)=9',kw:'9',pts:3,hint:''},{desc:'luy_thua(2,10)=1024',kw:'1024',pts:4,hint:''},{desc:'keyword args đúng=64',kw:'64',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b2-2_2',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích *args vs explicit params',desc:`<b>Đề bài:</b> So sánh 2 hàm: khi nào dùng *args tốt hơn?<pre class="ex-code">def tb_explicit(a,b,c):
    return (a+b+c)/3
def tb_args(*so):
    return sum(so)/len(so)</pre>Kiểm tra cả 2 với 3, 5, và 10 số. Hàm nào linh hoạt hơn?`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'explicit chỉ nhận đúng 3 số',kw:'tb_explicit(1,2,3)',pts:2,hint:''},{desc:'*args nhận bất kỳ số lượng',kw:'tb_args(1,2,3,4,5)',pts:4,hint:''},{desc:'Kết luận *args linh hoạt hơn',kw:'#',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b2-2_3',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu tuple unpacking',desc:`<b>Đề bài:</b> Chạy và giải thích:<pre class="ex-code">def doi_tien(vnd, ti_gia_usd=25000, ti_gia_eur=27000):
    return vnd/ti_gia_usd, vnd/ti_gia_eur

usd, eur = doi_tien(5_000_000)
print(f"\${usd:.0f} | €{eur:.0f}")</pre><b>Output:</b> <code>$200 | €185</code>`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'Output $200 | €185 đúng',kw:'$200',pts:4,hint:''},{desc:'Giải thích tham số mặc định tỷ giá',kw:'#',pts:3,hint:''},{desc:'Hiểu tuple unpacking',kw:'usd, eur',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b3-3_1',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B3 – Áp dụng',num:'3.1',title:'Hàm xử lý danh sách với *args',desc:`<b>Đề bài:</b> Viết hàm <code>thong_ke(*so)</code> nhận bất kỳ số lượng đối số. Trả về tuple (min, max, mean, stdev). In kết quả với 5 số nhập từ bàn phím.<br><b>Input:</b> <code>3 7 2 9 5</code><br><b>Output:</b><pre class="ex-code">Min=2 | Max=9 | TB=5.20 | SD=2.48</pre>`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Hàm nhận *so',kw:'def thong_ke(*so)',pts:3,hint:''},{desc:'Tính đúng min,max,mean',kw:'min(so)',pts:3,hint:''},{desc:'Tính đúng stdev',kw:'**0.5',pts:3,hint:''},{desc:'In kết quả đúng',kw:':.2f',pts:1,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b3-3_2',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B3 – Áp dụng',num:'3.2',title:'Hàm format bảng tùy chỉnh',desc:`<b>Đề bài:</b> Viết hàm <code>in_tieu_de(text, width=40, fill="═", align="center")</code>. Gọi với các tham số khác nhau để in tiêu đề đẹp.<br><b>Ví dụ:</b><pre class="ex-code">╔══════════════════════╗
║   KẾT QUẢ THI HK1   ║
╚══════════════════════╝</pre>`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Tham số mặc định đúng',kw:'width=40',pts:2,hint:''},{desc:'center/ljust/rjust theo align',kw:'center()',pts:3,hint:''},{desc:'Gọi 3+ lần với params khác nhau',kw:'in_tieu_de(',pts:3,hint:''},{desc:'Viền đẹp',kw:'╔',pts:2,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b3-3_3',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B3 – Áp dụng',num:'3.3',title:'Hàm lũy thừa đệ quy với memoization',desc:`<b>Đề bài:</b> Viết hàm <code>power(base, exp, cache={})</code> tính base^exp bằng đệ quy, lưu cache. So sánh tốc độ với và không có cache khi tính 2^30 liên tiếp 1000 lần.<br><b>Output:</b> Thời gian với/không cache.`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Đệ quy đúng: base*power(base,exp-1)',kw:'power(base,exp-1)',pts:3,hint:''},{desc:'Cache đúng: if (base,exp) in cache',kw:'cache',pts:4,hint:''},{desc:'So sánh thời gian',kw:'time',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b4-4_1',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B4 – Phân tích',num:'4.1',title:'Debug tham số mặc định dùng list',desc:`<b>Đề bài:</b> Đây là "cạm bẫy" nổi tiếng Python. Giải thích tại sao kết quả sai:<pre class="ex-code">def them(item, lst=[]):
    lst.append(item)
    return lst
print(them("a"))   # ["a"]
print(them("b"))   # ["a","b"]! Sai!
print(them("c"))   # ["a","b","c"]! Sai!</pre>`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Giải thích: default list tạo 1 lần',kw:'#',pts:4,hint:''},{desc:'Sửa: dùng None làm default',kw:'lst=None',pts:4,hint:''},{desc:'Code sửa chạy đúng',kw:'if lst is None',pts:2,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b4-4_2',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích lỗi *args thứ tự',desc:`<b>Đề bài:</b> Code báo TypeError. Tìm lỗi và sửa:<pre class="ex-code">def ham(a, *args, b):   # b là keyword-only
    print(a, args, b)
ham(1, 2, 3, 4)  # TypeError!
ham(1, 2, 3, b=4) # Đúng!</pre>Giải thích tại sao tham số sau *args phải là keyword-only.`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Gọi đúng với b=4',kw:'b=4',pts:4,hint:''},{desc:'Giải thích keyword-only params',kw:'#',pts:3,hint:''},{desc:'Test thêm 2 trường hợp',kw:'ham(',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b4-4_3',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu hàm với caching',desc:`<b>Đề bài:</b> Dùng <code>functools.lru_cache</code> để tối ưu hàm Fibonacci đệ quy. So sánh tốc độ fibonacci(35) có và không có cache.`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Dùng @lru_cache đúng',kw:'lru_cache',pts:4,hint:''},{desc:'Test fibonacci(35) có cache nhanh hơn',kw:'time',pts:3,hint:''},{desc:'Kết quả fibonacci(35) đúng',kw:'9227465',pts:3,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b5-5_1',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh đệ quy vs iteration',desc:`<b>Đề bài:</b> Tính dãy Fibonacci 3 cách: (1) đệ quy naive, (2) đệ quy+cache, (3) vòng lặp. Đo thời gian n=30 mỗi cách 1000 lần.`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'3 cách cài đúng',kw:'def fib',pts:3,hint:''},{desc:'Đo thời gian chính xác',kw:'time',pts:3,hint:''},{desc:'Kết luận rõ ràng có số liệu',kw:'#',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b5-5_2',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá *args vs explicit',desc:`<b>Đề bài:</b> Thiết kế hàm tính điểm TB có trọng số. Đánh giá: tốt hơn khi dùng explicit params (tinh_tb(d1,d2,d3)) hay *args+**kwargs (tinh_tb(*diem, **he_so))?`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Cài explicit params',kw:'def tinh_tb(d1',pts:2,hint:''},{desc:'Cài *args **kwargs',kw:'def tinh_tb(*diem',pts:3,hint:''},{desc:'Đánh giá ưu nhược điểm',kw:'#',pts:5,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b5-5_3',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B5 – Đánh giá',num:'5.3',title:'Lambda vs def trong sort',desc:`<b>Đề bài:</b> Sắp xếp danh sách dict học sinh theo nhiều tiêu chí: (1) lambda (2) operator.attrgetter (3) def cmp. So sánh độ đọc và hiệu năng.`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Dùng lambda key',kw:'lambda x:',pts:3,hint:''},{desc:'Dùng operator.itemgetter',kw:'itemgetter',pts:3,hint:''},{desc:'So sánh và nhận xét',kw:'#',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b6-6_1',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B6 – Sáng tạo',num:'6.1',title:'Plugin calculator với *args và **kwargs',desc:`<b>Đề bài:</b> Thiết kế máy tính hỗ trợ plugin: hàm <code>calculate(op, *args, **kwargs)</code> nhận tên phép toán và các số. Đăng ký plugin bằng dict. Người dùng thêm phép toán mới không cần sửa code cũ.`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Dict đăng ký hàm plugin',kw:'phep_tinh = {}',pts:3,hint:''},{desc:'calculate dispatch đúng',kw:'phep_tinh[op]',pts:3,hint:''},{desc:'Thêm plugin mới được',kw:'phep_tinh["ten"]=ham',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b6-6_2',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B6 – Sáng tạo',num:'6.2',title:'Decorator logging',desc:`<b>Đề bài:</b> Viết decorator <code>@ghi_log</code> tự động in "Gọi hàm X(args)" trước và "Kết quả: Y" sau khi hàm thực thi. Áp dụng cho 3 hàm khác nhau.`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Wrapper function đúng',kw:'def wrapper(*args',pts:3,hint:''},{desc:'In thông tin trước khi gọi',kw:'print(f"Gọi',pts:3,hint:''},{desc:'In kết quả sau khi gọi',kw:'print(f"Kết',pts:2,hint:''},{desc:'Áp dụng đúng @decorator',kw:'@ghi_log',pts:2,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
{id:'k10-27-b6-6_3',g:'K10',ch:'Bài 27: Tham số hàm',lv:'B6 – Sáng tạo',num:'6.3',title:'Hệ thống báo cáo đa định dạng',desc:`<b>Đề bài:</b> Viết hàm <code>tao_bao_cao(data, format="text", title="Báo cáo", **options)</code>. Format: "text" (bảng ký tự), "html" (thẻ table), "csv" (dấu phẩy). Test với dữ liệu điểm lớp.`,theory:`<b>1. Tham số mặc định</b>
<pre class="ex-code">def xin_chao(ten, loi="Xin chào"):
    return f"{loi}, {ten}!"</pre>
<b>2. Trả nhiều giá trị (tuple)</b>
<pre class="ex-code">def min_max(lst):
    return min(lst), max(lst)
a, b = min_max([3,1,5])</pre>
<b>3. *args – số lượng tùy ý</b>
<pre class="ex-code">def tong(*so):
    return sum(so)
tong(1,2,3,4)   # 10</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Hàm nhận **options',kw:'**options',pts:3,hint:''},{desc:'Sinh đúng 3 format',kw:'if format ==',pts:3,hint:''},{desc:'HTML table đúng cú pháp',kw:'<table>',pts:2,hint:''},{desc:'CSV đúng',kw:'",".join',pts:2,hint:''}],errors:['Quên <code>return</code> → hàm trả <code>None</code>','Gọi hàm trước khi <code>def</code> → NameError','Nhầm số tham số khi gọi hàm']},
/* Bài 28: Phạm vi biến */
{id:'k10-28-b1-1_1',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết local vs global',desc:`<b>Đề bài:</b> Điền kết quả và xác định mỗi biến x là local hay global:<pre class="ex-code">x = "global"
def ham():
    x = "local"
    print(x)    # ___
ham()
print(x)        # ___</pre><b>Output:</b><pre class="ex-code">local
global</pre>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'In "local" trong hàm',kw:'local',pts:4,hint:''},{desc:'In "global" ngoài hàm',kw:'global',pts:4,hint:''},{desc:'Xác định đúng local/global',kw:'#',pts:2,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b1-1_2',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết từ khóa global',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1
tang(); tang(); tang()
print(dem)   # ___</pre><b>Output:</b> <code>3</code>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'dem=3 sau 3 lần gọi',kw:'3',pts:5,hint:''},{desc:'Giải thích: global cho phép sửa biến ngoài',kw:'global',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:2,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b1-1_3',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết NameError',desc:`<b>Đề bài:</b> Code nào báo lỗi? Giải thích và sửa:<pre class="ex-code">def ham_a():
    y = 10
def ham_b():
    print(y)   # Lỗi! y là local của ham_a
ham_b()</pre>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'Giải thích NameError: y không tồn tại',kw:'NameError',pts:4,hint:''},{desc:'Sửa: truyền y qua tham số',kw:'def ham_b(y)',pts:4,hint:''},{desc:'Code chạy đúng',kw:'ham_b(10)',pts:2,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b2-2_1',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B2 – Hiểu',num:'2.1',title:'Trace phạm vi biến lồng nhau',desc:`<b>Đề bài:</b> Dự đoán và giải thích output:<pre class="ex-code">x = 1
def ham_ngoai():
    x = 2
    def ham_trong():
        x = 3
        print("Trong:", x)
    ham_trong()
    print("Ngoài:", x)
ham_ngoai()
print("Global:", x)</pre>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'Trong: 3',kw:'3',pts:3,hint:''},{desc:'Ngoài: 2',kw:'2',pts:3,hint:''},{desc:'Global: 1',kw:'1',pts:4,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b2-2_2',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích nonlocal',desc:`<b>Đề bài:</b> nonlocal cho phép sửa biến của hàm cha. Trace và giải thích:<pre class="ex-code">def tao_bo_dem():
    dem = 0
    def tang():
        nonlocal dem
        dem += 1
        return dem
    return tang

btn = tao_bo_dem()
print(btn(), btn(), btn())  # 1 2 3</pre>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'Output: 1 2 3',kw:'1 2 3',pts:4,hint:''},{desc:'Giải thích closure và nonlocal',kw:'nonlocal',pts:3,hint:''},{desc:'Mỗi btn() tăng dem',kw:'#',pts:3,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b2-2_3',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu LEGB rule',desc:`<b>Đề bài:</b> Python tìm biến theo thứ tự L→E→G→B. Trace và dự đoán:<pre class="ex-code">x = "G"  # Global
def ngoai():
    x = "E"  # Enclosing
    def trong():
        # x = "L"  # Local (comment out)
        print(x)  # Tìm E trước G
    trong()
ngoai()
print(x)  # Global</pre>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'trong() in "E" (Enclosing)',kw:'E',pts:4,hint:''},{desc:'Global vẫn là "G"',kw:'G',pts:3,hint:''},{desc:'Giải thích LEGB',kw:'#',pts:3,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b3-3_1',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B3 – Áp dụng',num:'3.1',title:'Đếm số lần gọi hàm dùng global',desc:`<b>Đề bài:</b> Viết hàm <code>tinh_can(n)</code> tính √n. Dùng biến global <code>so_lan_goi</code> đếm tổng số lần hàm được gọi. Gọi 5 lần, in số lần cuối.<br><b>Output:</b> <code>Đã tính căn 5 lần</code>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Biến global so_lan_goi',kw:'global so_lan_goi',pts:3,hint:''},{desc:'Tăng đúng mỗi lần gọi',kw:'so_lan_goi += 1',pts:3,hint:''},{desc:'In đúng sau 5 lần',kw:'5 lần',pts:4,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b3-3_2',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B3 – Áp dụng',num:'3.2',title:'Bộ đếm đa luồng với closure',desc:`<b>Đề bài:</b> Tạo 2 bộ đếm độc lập dùng closure (không dùng class). Mỗi bộ đếm có hàm <code>tang()</code>, <code>giam()</code>, <code>reset()</code>, <code>gia_tri()</code>.<br><b>Output:</b><pre class="ex-code">A: 1 2 3 2
B: 5 4 3</pre>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Tạo closure đúng',kw:'def tao_bo_dem',pts:3,hint:''},{desc:'nonlocal cho tất cả hàm con',kw:'nonlocal dem',pts:3,hint:''},{desc:'2 bộ đếm độc lập nhau',kw:'btn_a, btn_b',pts:4,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b3-3_3',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B3 – Áp dụng',num:'3.3',title:'Config hệ thống dùng global dict',desc:`<b>Đề bài:</b> Tạo dict global <code>CONFIG</code> lưu cài đặt hệ thống. Viết hàm <code>get(key)</code>, <code>set(key,val)</code>, <code>reset()</code>. Dùng trong 3 hàm khác nhau của chương trình.`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Dict CONFIG là global',kw:'CONFIG = {}',pts:2,hint:''},{desc:'Hàm get/set/reset đúng',kw:'def get(',pts:3,hint:''},{desc:'3 hàm sử dụng CONFIG',kw:'CONFIG["',pts:3,hint:''},{desc:'Không dùng global keyword (dùng dict)',kw:'#',pts:2,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b4-4_1',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi UnboundLocalError',desc:`<b>Đề bài:</b> Code báo UnboundLocalError. Giải thích tại sao và sửa:<pre class="ex-code">x = 10
def ham():
    x += 1    # UnboundLocalError!
    return x
print(ham())</pre>Python thấy <code>x+=1</code> → biết x là local → nhưng x chưa có giá trị local!`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Giải thích: Python treat x là local',kw:'#',pts:4,hint:''},{desc:'Sửa Cách 1: global x',kw:'global x',pts:3,hint:''},{desc:'Sửa Cách 2: truyền tham số',kw:'def ham(x):',pts:3,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b4-4_2',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích biến bị shadow',desc:`<b>Đề bài:</b> Code có bug ẩn vì tên biến trùng. Tìm và sửa:<pre class="ex-code">def tinh_tong(A):
    tong = 0
    for A in A:    # Bug: A bị shadow!
        tong += A
    return tong
print(tinh_tong([1,2,3,4,5]))</pre>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Phát hiện: biến A bị shadow',kw:'for A',pts:4,hint:''},{desc:'Sửa: đổi tên biến loop',kw:'for x in A',pts:4,hint:''},{desc:'Kết quả đúng sau sửa',kw:'15',pts:2,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b4-4_3',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B4 – Phân tích',num:'4.3',title:'Refactor global thành dependency injection',desc:`<b>Đề bài:</b> Refactor code dùng global sang "dependency injection" (truyền qua tham số):<pre class="ex-code">## Before (dùng global):
DATA = []
def them(x): DATA.append(x)
def xoa(x): DATA.remove(x)
## After: truyền data qua tham số</pre>`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Hàm them nhận data tham số',kw:'def them(data, x)',pts:4,hint:''},{desc:'Hàm xoa nhận data tham số',kw:'def xoa(data, x)',pts:3,hint:''},{desc:'Không dùng global nữa',kw:'# không có global',pts:3,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b5-5_1',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh global vs dependency injection',desc:`<b>Đề bài:</b> Viết hệ thống giỏ hàng 2 cách: (1) biến global, (2) truyền qua tham số. So sánh khả năng kiểm thử và tái sử dụng.`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Cách 1: global GIO_HANG',kw:'global GIO_HANG',pts:2,hint:''},{desc:'Cách 2: ham(gio_hang,...)',kw:'def them(gio_hang',pts:3,hint:''},{desc:'So sánh khả năng test',kw:'assert',pts:2,hint:''},{desc:'Kết luận Cách 2 tốt hơn cho test',kw:'#',pts:3,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b5-5_2',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá closure vs class',desc:`<b>Đề bài:</b> Thiết kế bộ đếm 3 cách: (1) global, (2) closure, (3) class. So sánh về: rõ ràng, tái sử dụng, tạo nhiều instance.`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Cách 1: global',kw:'global dem',pts:2,hint:''},{desc:'Cách 2: closure',kw:'nonlocal',pts:2,hint:''},{desc:'Cách 3: class Counter',kw:'class Counter',pts:3,hint:''},{desc:'So sánh 3 cách',kw:'#',pts:3,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b5-5_3',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B5 – Đánh giá',num:'5.3',title:'Phân tích memory leak qua global',desc:`<b>Đề bài:</b> Phát hiện memory issue trong code dùng global để cache. Sử dụng <code>sys.getsizeof()</code> để đo bộ nhớ cache sau 1000 lần tính. Đề xuất giải pháp dọn dẹp.`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Đo bộ nhớ cache',kw:'sys.getsizeof',pts:3,hint:''},{desc:'Nhận ra cache tăng không giới hạn',kw:'#',pts:3,hint:''},{desc:'Giải pháp: LRU cache giới hạn',kw:'lru_cache(maxsize=128)',pts:4,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b6-6_1',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B6 – Sáng tạo',num:'6.1',title:'Hệ thống plugin dùng global registry',desc:`<b>Đề bài:</b> Thiết kế hệ thống plugin: dict global <code>PLUGINS</code>. Hàm <code>@dang_ky(ten)</code> là decorator tự đăng ký hàm vào PLUGINS. Gọi plugin qua tên.`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'PLUGINS global dict',kw:'PLUGINS = {}',pts:2,hint:''},{desc:'Decorator đăng ký đúng',kw:'PLUGINS[ten] = func',pts:4,hint:''},{desc:'Gọi plugin qua tên',kw:'PLUGINS[ten](*args)',pts:4,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b6-6_2',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B6 – Sáng tạo',num:'6.2',title:'State machine đơn giản',desc:`<b>Đề bài:</b> Cài máy trạng thái (state machine) cho đèn giao thông: Đỏ→Xanh→Vàng→Đỏ. Dùng closure lưu trạng thái hiện tại. Gọi <code>next_state()</code> 6 lần in trạng thái.`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Closure lưu state',kw:'nonlocal state',pts:3,hint:''},{desc:'Chuyển trạng thái đúng',kw:'Đỏ→Xanh→Vàng',pts:4,hint:''},{desc:'Gọi 6 lần đúng chu kỳ',kw:'for _ in range(6)',pts:3,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
{id:'k10-28-b6-6_3',g:'K10',ch:'Bài 28: Phạm vi biến',lv:'B6 – Sáng tạo',num:'6.3',title:'Config manager thread-safe',desc:`<b>Đề bài:</b> Thiết kế ConfigManager: singleton (chỉ 1 instance), thread-safe, hỗ trợ namespace (config["db"]["host"]). Dùng closure hoặc class.`,theory:`<b>1. Local vs Global</b>
<pre class="ex-code">x = 10      # global
def ham():
    x = 99  # local, không ảnh hưởng global
    return x
print(ham()) # 99
print(x)     # 10</pre>
<b>2. Từ khóa global</b>
<pre class="ex-code">dem = 0
def tang():
    global dem
    dem += 1   # sửa biến global</pre>
<b>3. Nguyên tắc tốt</b><br>
• Ưu tiên truyền qua tham số hơn global<br>
• Global chỉ dùng khi thực sự cần thiết`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Singleton pattern',kw:'_instance = None',pts:3,hint:''},{desc:'Lưu nested config',kw:'config["db"]',pts:3,hint:''},{desc:'get/set với default value',kw:'get(key, default=None)',pts:4,hint:''}],errors:['Dùng biến local ngoài hàm → NameError','Quên <code>global</code> khi sửa biến toàn cục trong hàm','Nhầm tên: local che global cùng tên']},
/* Bài 29: Nhận biết lỗi */
{id:'k10-29-b1-1_1',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết loại lỗi',desc:`<b>Đề bài:</b> Phân loại 6 đoạn code sau là SyntaxError, RuntimeError, hay LogicError:<pre class="ex-code">A) if x > 0    print(x)    # ___
B) 1/0                     # ___
C) int("abc")              # ___
D) A[100] (A có 5 phần tử) # ___
E) s = "hello"; s[0]="H"  # ___
F) tb = a+b+c (không /3)  # ___</pre>`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'A=SyntaxError đúng',kw:'SyntaxError',pts:2,hint:''},{desc:'B,C,D,E=RuntimeError',kw:'RuntimeError',pts:4,hint:''},{desc:'F=LogicError',kw:'LogicError',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b1-1_2',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết thông báo lỗi',desc:`<b>Đề bài:</b> Ghép thông báo lỗi với nguyên nhân:<pre class="ex-code">1. NameError: name "x" is not defined
2. TypeError: unsupported operand type(s)
3. IndentationError: unexpected indent
4. AttributeError: "str" has no attribute</pre>A. Gọi phương thức không tồn tại<br>B. Dùng biến chưa khai báo<br>C. Thụt lề sai<br>D. Phép toán sai kiểu`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'1-B: NameError = chưa khai báo',kw:'B',pts:3,hint:''},{desc:'2-D: TypeError = sai kiểu',kw:'D',pts:3,hint:''},{desc:'3-C: IndentationError = lề sai',kw:'C',pts:2,hint:''},{desc:'4-A: AttributeError = method không có',kw:'A',pts:2,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b1-1_3',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B1 – Nhận biết',num:'1.3',title:'Đọc traceback Python',desc:`<b>Đề bài:</b> Đọc traceback sau và trả lời: lỗi gì, dòng nào, nguyên nhân:<pre class="ex-code">Traceback (most recent call last):
  File "bai.py", line 5, in <module>
    ket_qua = 10 / so_nhap
ZeroDivisionError: division by zero</pre>`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'Xác định: ZeroDivisionError',kw:'ZeroDivisionError',pts:3,hint:''},{desc:'Xác định: dòng 5',kw:'dòng 5',pts:3,hint:''},{desc:'Nguyên nhân: so_nhap = 0',kw:'so_nhap = 0',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b2-2_1',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B2 – Hiểu',num:'2.1',title:'Trace try-except',desc:`<b>Đề bài:</b> Dự đoán output với input "abc", "0", "5":<pre class="ex-code">try:
    n = int(input("n = "))
    print(100 / n)
except ValueError:
    print("Không phải số!")
except ZeroDivisionError:
    print("Chia cho 0!")</pre>`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'abc → "Không phải số!"',kw:'Không phải số!',pts:4,hint:''},{desc:'0 → "Chia cho 0!"',kw:'Chia cho 0!',pts:3,hint:''},{desc:'5 → 20.0',kw:'20.0',pts:3,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b2-2_2',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích except thứ tự quan trọng',desc:`<b>Đề bài:</b> Tại sao except Exception nên đặt cuối?<pre class="ex-code">try:
    pass
except Exception:    # Bắt tất cả!
    pass
except ValueError:   # Không bao giờ chạy!
    pass</pre>Sửa thứ tự đúng và giải thích.`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'ValueError trước Exception',kw:'except ValueError',pts:4,hint:''},{desc:'Giải thích Exception bắt tất cả',kw:'#',pts:3,hint:''},{desc:'Code sửa đúng thứ tự',kw:'except Exception',pts:3,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b2-2_3',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu finally',desc:`<b>Đề bài:</b> finally luôn chạy dù có lỗi hay không. Chạy và giải thích:<pre class="ex-code">try:
    x = int(input("x = "))
    print(10/x)
except:
    print("Có lỗi")
finally:
    print("Finally luôn chạy!")</pre>`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'finally luôn in dù có lỗi hay không',kw:'finally luôn',pts:4,hint:''},{desc:'Test 2 trường hợp: hợp lệ và lỗi',kw:'int("abc")',pts:3,hint:''},{desc:'Giải thích ứng dụng finally',kw:'#',pts:3,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b3-3_1',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B3 – Áp dụng',num:'3.1',title:'Nhập số an toàn với try-except',desc:`<b>Đề bài:</b> Viết hàm <code>nhap_so(thong_bao, kieu=int, min=None, max=None)</code>. Lặp đến khi nhập hợp lệ: đúng kiểu, trong khoảng min–max.<br><b>Ví dụ gọi:</b><pre class="ex-code">tuoi = nhap_so("Tuổi: ", int, 1, 120)
diem = nhap_so("Điểm: ", float, 0, 10)</pre>`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'try-except ValueError',kw:'try',pts:3,hint:''},{desc:'Kiểm tra min và max',kw:'if min is not None',pts:3,hint:''},{desc:'Lặp đến khi hợp lệ',kw:'while True',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b3-3_2',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B3 – Áp dụng',num:'3.2',title:'Xử lý lỗi file an toàn',desc:`<b>Đề bài:</b> Viết hàm đọc file điểm học sinh. Xử lý: FileNotFoundError, PermissionError, UnicodeDecodeError, định dạng sai. Trả về list rỗng nếu lỗi, in thông báo rõ ràng.`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'except FileNotFoundError',kw:'FileNotFoundError',pts:2,hint:''},{desc:'except ValueError cho định dạng sai',kw:'ValueError',pts:2,hint:''},{desc:'finally đóng file',kw:'finally',pts:3,hint:''},{desc:'Trả list rỗng khi lỗi',kw:'return []',pts:3,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b3-3_3',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B3 – Áp dụng',num:'3.3',title:'Custom Exception cho bài toán điểm',desc:`<b>Đề bài:</b> Tạo Exception tùy chỉnh: <code>DiemKhongHopLe</code>, <code>HocSinhKhongTon</code>. Raise khi gặp dữ liệu sai. Catch và in thông báo thân thiện.<br><b>Ví dụ:</b><pre class="ex-code">if not 0 <= diem <= 10:
    raise DiemKhongHopLe(f"Điểm {diem} không hợp lệ")</pre>`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'class DiemKhongHopLe(Exception)',kw:'class DiemKhongHopLe',pts:3,hint:''},{desc:'raise đúng lúc',kw:'raise DiemKhongHopLe',pts:3,hint:''},{desc:'catch và in thông báo đẹp',kw:'except DiemKhongHopLe',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b4-4_1',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi không bắt đúng exception',desc:`<b>Đề bài:</b> Code bắt lỗi nhưng không hoạt động. Tìm và sửa 3 vấn đề:<pre class="ex-code">try:
    n = int(input())
    print(A[n])     # A chưa định nghĩa
except ValueError, ZeroDivisionError:  # Sai cú pháp!
    print("Lỗi")
# Còn lỗi NameError không được bắt!</pre>`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Sửa cú pháp except',kw:'except (ValueError, ZeroDivisionError)',pts:3,hint:''},{desc:'Thêm except NameError',kw:'except NameError',pts:3,hint:''},{desc:'Test tất cả trường hợp lỗi',kw:'try',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b4-4_2',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích raise vs print error',desc:`<b>Đề bài:</b> So sánh 2 cách xử lý lỗi: (1) print "Lỗi" và return None, (2) raise Exception. Khi nào dùng cái nào? Viết ví dụ cho từng cách.`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Cách 1: return None khi lỗi',kw:'return None',pts:3,hint:''},{desc:'Cách 2: raise Exception',kw:'raise ValueError',pts:3,hint:''},{desc:'Kết luận: raise tốt hơn cho library',kw:'#',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b4-4_3',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B4 – Phân tích',num:'4.3',title:'Debug lỗi logic trong tính thuế',desc:`<b>Đề bài:</b> Hàm tính thuế sau cho kết quả sai. Dùng assert để tìm lỗi logic:<pre class="ex-code">def tinh_thue(thu_nhap):
    if thu_nhap <= 5e6: return 0
    elif thu_nhap <= 10e6: return thu_nhap * 0.05
    else: return thu_nhap * 0.10
# Lỗi: thuế theo bậc, không phải toàn bộ!</pre>`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Phát hiện lỗi bậc thang',kw:'#',pts:3,hint:''},{desc:'Sửa đúng: chỉ tính phần vượt',kw:'(thu_nhap - 5e6)',pts:4,hint:''},{desc:'Kiểm thử với assert',kw:'assert',pts:3,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b5-5_1',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh EAFP vs LBYL',desc:`<b>Đề bài:</b> EAFP (try first) vs LBYL (check first). So sánh 2 cách đọc dict:<pre class="ex-code">## LBYL: if key in d: ...
## EAFP: try: d[key] except: ...</pre>Đo hiệu năng với 1 triệu lần tra cứu, 50% key không tồn tại.`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'LBYL: if key in d',kw:'if key in d',pts:3,hint:''},{desc:'EAFP: try...except',kw:'try',pts:3,hint:''},{desc:'Kết luận EAFP thường nhanh hơn trong Python',kw:'#',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b5-5_2',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá chiến lược xử lý lỗi',desc:`<b>Đề bài:</b> Với hệ thống nhập điểm 30 HS, đánh giá 3 chiến lược: (1) crash ngay, (2) skip dòng lỗi, (3) dừng và hỏi người dùng. Khi nào dùng chiến lược nào?`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Cài chiến lược 1: raise',kw:'raise',pts:2,hint:''},{desc:'Cài chiến lược 2: continue',kw:'continue',pts:2,hint:''},{desc:'Cài chiến lược 3: input lại',kw:'input',pts:2,hint:''},{desc:'Đánh giá ưu nhược 3 cách',kw:'#',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b5-5_3',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B5 – Đánh giá',num:'5.3',title:'Logging vs print debug',desc:`<b>Đề bài:</b> So sánh <code>print()</code> debug với module <code>logging</code>. Viết hàm tính lãi suất với logging DEBUG/INFO/WARNING/ERROR. Tắt log khi deploy.`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'import logging đúng',kw:'import logging',pts:2,hint:''},{desc:'Dùng đủ 4 levels DEBUG/INFO/WARNING/ERROR',kw:'logging.DEBUG',pts:3,hint:''},{desc:'Tắt log bằng basicConfig level',kw:'logging.WARNING',pts:3,hint:''},{desc:'Kết luận logging tốt hơn print',kw:'#',pts:2,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b6-6_1',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B6 – Sáng tạo',num:'6.1',title:'Validation framework tổng quát',desc:`<b>Đề bài:</b> Thiết kế hàm <code>validate(data, rules)</code>: rules là dict quy định kiểu, min, max, required. Trả về (True, {}) hoặc (False, {field: error}).`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Kiểm tra required',kw:'if field not in data',pts:2,hint:''},{desc:'Kiểm tra kiểu dữ liệu',kw:'isinstance',pts:3,hint:''},{desc:'Kiểm tra min/max',kw:'if val < rules["min"]',pts:3,hint:''},{desc:'Trả về dict lỗi đầy đủ',kw:'return False, errors',pts:2,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b6-6_2',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B6 – Sáng tạo',num:'6.2',title:'Circuit breaker pattern',desc:`<b>Đề bài:</b> Cài Circuit Breaker: nếu hàm lỗi 3 lần liên tiếp → "mở mạch" (không gọi nữa, trả lỗi ngay) trong 60 giây. Áp dụng cho hàm giả lập gọi API.`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Đếm số lần lỗi liên tiếp',kw:'so_lan_loi',pts:3,hint:''},{desc:'Mở mạch sau 3 lỗi',kw:'if so_lan_loi >= 3',pts:3,hint:''},{desc:'Tự phục hồi sau timeout',kw:'time.time',pts:4,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
{id:'k10-29-b6-6_3',g:'K10',ch:'Bài 29: Nhận biết lỗi',lv:'B6 – Sáng tạo',num:'6.3',title:'Retry với exponential backoff',desc:`<b>Đề bài:</b> Viết decorator <code>@retry(max=3, delay=1)</code>: tự retry khi hàm raise Exception, chờ delay*2^n giây. Áp dụng cho hàm giả lập mạng không ổn định.`,theory:`<b>1. 3 loại lỗi Python</b>
<pre class="ex-code">## SyntaxError – viết sai cú pháp
if x > 0    # Thiếu dấu :

## RuntimeError – lỗi khi chạy
int("abc")   → ValueError
10 / 0       → ZeroDivisionError
A[100]       → IndexError

## LogicError – chạy được nhưng sai
tb = d1+d2+d3   # thiếu /3 !</pre>
<b>2. try-except</b>
<pre class="ex-code">try:
    x = int(input("Nhập số: "))
except ValueError:
    print("Không phải số nguyên!")
except ZeroDivisionError:
    print("Không chia cho 0!")</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Wrapper retry đúng',kw:'for attempt in range',pts:3,hint:''},{desc:'Exponential backoff: delay*2**i',kw:'2**attempt',pts:4,hint:''},{desc:'Dừng sau max attempts',kw:'if attempt == max-1: raise',pts:3,hint:''}],errors:['Không dùng try-except → crash khi nhập sai','Bắt Exception quá rộng che lỗi thật','Nhầm loại: ValueError vs TypeError vs IndexError']},
/* Bài 30: Kiểm thử & gỡ lỗi */
{id:'k10-30-b1-1_1',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết test case đúng/sai',desc:`<b>Đề bài:</b> Với hàm <code>tinh_tb(a,b,c)</code>, test case nào ĐÚNG?<pre class="ex-code">A) assert tinh_tb(3,6,9) == 6       # đúng
B) assert tinh_tb(0,0,0) = 0        # sai (=)
C) assert tinh_tb(-3,0,3) == 0.0    # đúng
D) tinh_tb(1,2,3) == 2.0            # thiếu assert</pre>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'A và C là test đúng',kw:'assert tinh_tb(3',pts:4,hint:''},{desc:'B sai vì dùng = thay ==',kw:'==',pts:3,hint:''},{desc:'D thiếu assert nên không test được',kw:'assert',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b1-1_2',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết loại test case',desc:`<b>Đề bài:</b> Phân loại test case: bình thường, biên, đặc biệt:<pre class="ex-code">## Hàm: is_leap_year(n) kiểm tra năm nhuận
assert is_leap_year(2000) == True   # ___
assert is_leap_year(1900) == False  # ___
assert is_leap_year(2024) == True   # ___
assert is_leap_year(2023) == False  # ___</pre>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'2000: biên (chia 400)',kw:'biên',pts:3,hint:''},{desc:'1900: biên (chia 100 không chia 400)',kw:'biên',pts:3,hint:''},{desc:'2024: bình thường',kw:'bình thường',pts:2,hint:''},{desc:'2023: bình thường',kw:'bình thường',pts:2,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b1-1_3',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B1 – Nhận biết',num:'1.3',title:'Đọc kết quả test',desc:`<b>Đề bài:</b> Chạy code sau và giải thích kết quả:<pre class="ex-code">def max2(a, b):
    if a > b: return a
    return b
assert max2(5, 3) == 5   # pass
assert max2(3, 5) == 5   # pass
assert max2(5, 5) == 5   # pass
assert max2(-1,-3) == -1 # pass?
print("Tất cả pass!")</pre>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code → THEO DÕI biến
ĐIỀN kết quả</pre>`,rb:[{desc:'4 assert đều pass',kw:'Tất cả pass!',pts:4,hint:''},{desc:'max2(-1,-3)=-1 đúng',kw:'-1',pts:3,hint:''},{desc:'Giải thích tại sao test bằng nhau quan trọng',kw:'#',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b2-2_1',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B2 – Hiểu',num:'2.1',title:'Trace debug in biến trung gian',desc:`<b>Đề bài:</b> Thêm print debug để tìm lỗi:<pre class="ex-code">def tinh_tong_nguyen_to(n):
    tong = 0
    for i in range(2, n+1):
        for j in range(2, i):  # Lỗi logic?
            if i % j == 0: break
        tong += i  # Sai: cộng cả số không nguyên tố!
    return tong</pre>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'Thêm print để trace i và j',kw:'print(f"DEBUG',pts:3,hint:''},{desc:'Phát hiện: cộng cả composite number',kw:'#',pts:4,hint:''},{desc:'Sửa đúng dùng for-else',kw:'else: tong',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b2-2_2',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích assert và thông báo lỗi',desc:`<b>Đề bài:</b> Viết test cases tốt với thông báo lỗi rõ ràng:<pre class="ex-code">def chia(a, b):
    return a / b
assert chia(10,2)==5, f"Kỳ vọng 5, nhận {chia(10,2)}"
assert chia(7,2)==3.5, "7/2 phải là 3.5"</pre>Thêm test cho b=0 và kiểm tra raise ZeroDivisionError.`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'Test bình thường đúng',kw:'chia(10,2)==5',pts:3,hint:''},{desc:'Test b=0 phải raise',kw:'pytest.raises',pts:3,hint:''},{desc:'Thông báo assert rõ ràng',kw:'assert ... , f"',pts:4,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b2-2_3',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu boundary testing',desc:`<b>Đề bài:</b> Hàm phân loại học lực có 4 biên điều kiện: 5.0, 6.5, 8.5. Viết test case cho đúng 6 giá trị biên: 4.99, 5.0, 6.49, 6.5, 8.49, 8.5.`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng dòng
DỰ ĐOÁN → KIỂM TRA</pre>`,rb:[{desc:'Test 4.99→Yếu',kw:'4.99',pts:2,hint:''},{desc:'Test 5.0→TB',kw:'5.0',pts:2,hint:''},{desc:'Test 6.49→TB',kw:'6.49',pts:2,hint:''},{desc:'Test 6.5→Khá',kw:'6.5',pts:2,hint:''},{desc:'Test 8.49→Khá',kw:'8.49',pts:1,hint:''},{desc:'Test 8.5→Giỏi',kw:'8.5',pts:1,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b3-3_1',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B3 – Áp dụng',num:'3.1',title:'Kiểm thử hàm tính diện tích',desc:`<b>Đề bài:</b> Viết hàm <code>dien_tich(hinh, *args)</code> cho 4 loại hình. Viết 16 test cases (4 hình × 4 cases: bình thường, biên, đặc biệt, lỗi).<br><b>Output:</b> In số test pass và fail.`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'4 hàm diện tích đúng',kw:'def dien_tich',pts:2,hint:''},{desc:'16 test cases đủ loại',kw:'assert',pts:4,hint:''},{desc:'Đếm pass/fail',kw:'try',pts:3,hint:''},{desc:'In báo cáo rõ ràng',kw:'print',pts:1,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b3-3_2',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B3 – Áp dụng',num:'3.2',title:'Test driven development: hàm xử lý tên',desc:`<b>Đề bài:</b> Viết test cases TRƯỚC, sau đó viết hàm <code>chuan_hoa_ten(s)</code> thỏa mãn:<br>• "nguyễn van an" → "Nguyễn Van An"<br>• "  TRần  TÍ  " → "Trần Tí" (trim, title case)<br>• "" → raise ValueError<br>• "123" → raise ValueError`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Test cases viết trước',kw:'assert chuan_hoa_ten("nguyễn',pts:3,hint:''},{desc:'Test ValueError',kw:'try: chuan_hoa_ten("")',pts:3,hint:''},{desc:'Hàm thỏa mãn tất cả test',kw:'title()',pts:4,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b3-3_3',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B3 – Áp dụng',num:'3.3',title:'Kiểm thử thuật toán sắp xếp',desc:`<b>Đề bài:</b> Viết test suite cho InsertionSort: 8 test cases bao gồm mảng rỗng, 1 phần tử, đã sắp xếp, đảo ngược, số trùng, số âm, số float, mảng lớn.<br><b>Output:</b> <code>8/8 tests passed</code>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
1. Xác định Input/Output
2. Nhập dữ liệu
3. Xử lý
4. In kết quả</pre>`,rb:[{desc:'Test mảng rỗng []=[]',kw:'assert InsertionSort([]) == []',pts:2,hint:''},{desc:'Test 1 phần tử',kw:'assert InsertionSort([5]) == [5]',pts:2,hint:''},{desc:'Test đảo ngược',kw:'assert InsertionSort([5,4,3,2,1])',pts:2,hint:''},{desc:'Test số trùng và âm',kw:'[-1,0,0,1]',pts:2,hint:''},{desc:'In 8/8 passed',kw:'8/8',pts:2,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b4-4_1',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B4 – Phân tích',num:'4.1',title:'Debug hàm sắp xếp sai',desc:`<b>Đề bài:</b> InsertionSort dưới đây không sắp xếp đúng. Thêm print debug, tìm và sửa 2 lỗi:<pre class="ex-code">def InsertionSort(A):
    for i in range(len(A)):    # Lỗi 1
        key = A[i]; j = i
        while j > 0 and A[j-1] > key:  # Lỗi 2
            A[j] = A[j-1]
            j += 1             # Lỗi 3!
        A[j] = key
    return A</pre>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Sửa range: range(1,len(A))',kw:'range(1',pts:3,hint:''},{desc:'Sửa j+=1→j-=1',kw:'j -= 1',pts:4,hint:''},{desc:'Test với [5,3,1,4,2]',kw:'assert',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b4-4_2',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích test case thiếu',desc:`<b>Đề bài:</b> Hàm <code>tinh_can_bac2(n)</code> pass hết test dưới đây nhưng vẫn sai. Tìm test case bị thiếu:<pre class="ex-code">assert tinh_can_bac2(4) == 2.0
assert tinh_can_bac2(9) == 3.0
assert tinh_can_bac2(16) == 4.0
# Hàm: return n**2  # Bug! Bình phương chứ không căn!</pre>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Phát hiện: hàm bình phương thay vì căn',kw:'#',pts:3,hint:''},{desc:'Test case thiếu: n=2 → 1.41...',kw:'assert abs(tinh_can_bac2(2)-1.414)<0.01',pts:4,hint:''},{desc:'Test n=0 và n<0',kw:'n < 0',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b4-4_3',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B4 – Phân tích',num:'4.3',title:'Refactor code khó test',desc:`<b>Đề bài:</b> Code sau khó test vì trộn lẫn input/output với logic. Refactor tách thành hàm thuần túy dễ test:<pre class="ex-code">## Khó test:
def tinh_luong():
    cb = float(input("Lương CB: "))
    hs = float(input("Hệ số: "))
    bh = cb*hs*0.105
    print(round(cb*hs-bh, 0))</pre>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B4 – Phân tích
1. Đọc code lỗi
2. Xác định loại lỗi
3. Sửa và kiểm tra</pre>`,rb:[{desc:'Tách hàm thuần túy không input/print',kw:'def calc_luong(cb, hs)',pts:4,hint:''},{desc:'Hàm main() xử lý input/output',kw:'def main()',pts:3,hint:''},{desc:'Test hàm thuần túy dễ dàng',kw:'assert calc_luong(',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b5-5_1',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh unittest vs assert',desc:`<b>Đề bài:</b> Viết cùng test suite cho BinarySearch bằng (1) assert thủ công và (2) unittest.TestCase. So sánh output, khả năng mở rộng.`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Assert thủ công đúng',kw:'assert BinarySearch',pts:2,hint:''},{desc:'unittest.TestCase đúng',kw:'class Test',pts:3,hint:''},{desc:'So sánh output: unittest rõ hơn',kw:'#',pts:2,hint:''},{desc:'Kết luận unittest tốt hơn cho project',kw:'#',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b5-5_2',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá test coverage',desc:`<b>Đề bài:</b> Với hàm if-elif-else 4 nhánh, cần tối thiểu bao nhiêu test để đảm bảo mỗi dòng được chạy ít nhất 1 lần? Viết test suite 100% line coverage.`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Phân tích 4 nhánh cần 4 test',kw:'#',pts:3,hint:''},{desc:'Viết test mỗi nhánh',kw:'assert',pts:4,hint:''},{desc:'Kiểm tra 100% coverage',kw:'#',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b5-5_3',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B5 – Đánh giá',num:'5.3',title:'Tìm regression bug',desc:`<b>Đề bài:</b> Sau khi thêm tính năng xử lý số âm, 3 test cũ bị fail. Tìm nguyên nhân regression và sửa mà không break test cũ:<pre class="ex-code">## Code mới thêm: if n < 0: n = abs(n)</pre>`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
1. Viết 2+ cách giải
2. So sánh ưu nhược
3. Kết luận tối ưu</pre>`,rb:[{desc:'Chạy test cũ sau thay đổi',kw:'assert',pts:3,hint:''},{desc:'Tìm test nào fail',kw:'#',pts:3,hint:''},{desc:'Sửa code không break test cũ',kw:'if n < 0',pts:4,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b6-6_1',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B6 – Sáng tạo',num:'6.1',title:'Test suite đầy đủ cho máy tính',desc:`<b>Đề bài:</b> Viết test suite 20+ test cases cho máy tính 4 phép: +, -, *, /. Bao gồm: số âm, số thực, chia 0, số rất lớn, chuỗi thay số.`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Test 4 phép cơ bản',kw:'assert calc(10,"+",3)==13',pts:2,hint:''},{desc:'Test chia 0 raise lỗi',kw:'try',pts:2,hint:''},{desc:'Test số âm và số thực',kw:'assert calc(-1,"*",-1)==1',pts:3,hint:''},{desc:'≥20 test cases',kw:'assert',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b6-6_2',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B6 – Sáng tạo',num:'6.2',title:'Property-based testing',desc:`<b>Đề bài:</b> Viết "property test" cho InsertionSort: thay vì test case cụ thể, sinh mảng ngẫu nhiên và kiểm tra tính chất:<br>• Output là hoán vị của input<br>• Output được sắp xếp<br>• len(output) == len(input)<br>Chạy 100 mảng ngẫu nhiên.`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Sinh mảng ngẫu nhiên',kw:'random.sample',pts:2,hint:''},{desc:'Kiểm tra sorted(A)==result',kw:'sorted(A)',pts:3,hint:''},{desc:'Kiểm tra len giống nhau',kw:'len',pts:2,hint:''},{desc:'Kiểm tra hoán vị (Counter)',kw:'Counter',pts:3,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
{id:'k10-30-b6-6_3',g:'K10',ch:'Bài 30: Kiểm thử & gỡ lỗi',lv:'B6 – Sáng tạo',num:'6.3',title:'Tự động tìm bug bằng fuzzing',desc:`<b>Đề bài:</b> Viết fuzzer: sinh input ngẫu nhiên (số âm, 0, rất lớn, float, None) và chạy vào hàm. Nếu raise Exception ghi log. Chạy 1000 lần và báo cáo bugs tìm được.`,theory:`<b>1. Test case</b>
<pre class="ex-code">def tinh_tb(a, b, c):
    return (a + b + c) / 3
# Test cases:
assert tinh_tb(6,8,10) == 8.0     # bình thường
assert tinh_tb(0,0,0) == 0.0      # biên
assert tinh_tb(10,10,10) == 10.0  # tất cả bằng</pre>
<b>2. Kỹ thuật gỡ lỗi</b>
<pre class="ex-code">print(f"DEBUG: x={x}, n={n}")  # in biến
# Chạy từng bước nhỏ
# Kiểm tra: 0, âm, rỗng, None, rất lớn</pre>
<b>3. Trường hợp biên quan trọng</b><br>
• Giá trị 0, âm, None, rỗng []<br>
• Cận trên/dưới của điều kiện<br>
• Phần tử duy nhất (n=1)<br>
• Danh sách đã sắp xếp/đảo ngược`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
1. Input? Output? Ràng buộc?
2. Thiết kế mã giả
3. Viết code
4. Kiểm thử biên</pre>`,rb:[{desc:'Sinh input ngẫu nhiên nhiều loại',kw:'random',pts:2,hint:''},{desc:'try-except bắt lỗi không mong đợi',kw:'try',pts:3,hint:''},{desc:'Ghi log bug tìm được',kw:'log.append',pts:3,hint:''},{desc:'Báo cáo tổng kết',kw:'print',pts:2,hint:''}],errors:['Test bình thường nhưng bỏ sót trường hợp biên','<code>assert x = 5</code> → SyntaxError, phải là <code>==</code>','Không test đầu vào không hợp lệ (âm, rỗng, None)']},
/* Bài 16: Ngôn ngữ Python */
{id:'k10-16-b1-1_1',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B1 – Nhận biết',num:'1.1',title:'Chương trình Python đầu tiên',desc:`<b>Đề bài:</b> Viết chương trình in ra 3 dòng:<pre class="ex-code">Xin chào, Thế giới!
Python 3
Tin học 10</pre><b>Input:</b> Không có<br><b>Output:</b> Đúng 3 dòng như trên`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'Dùng print() đúng 3 lần',kw:'print',pts:6,hint:''},{desc:'In đúng 3 chuỗi theo yêu cầu',kw:'Xin chào',pts:3,hint:''},{desc:'Có chú thích #',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b1-1_2',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết lỗi cú pháp',desc:`<b>Đề bài:</b> 3 câu lệnh sau, câu nào đúng? Viết lại 2 câu đúng và giải thích lỗi của câu sai:<pre class="ex-code">A) print "Hello"      # Python 2 style
B) Print("Hello")     # sai chữ hoa
C) print("Hello")     # đúng</pre><b>Output:</b> <code>Hello</code> (từ câu C)`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'Xác định câu đúng là C',kw:'print("Hello")',pts:4,hint:''},{desc:'Giải thích A: Python 3 cần ngoặc',kw:'#',pts:3,hint:''},{desc:'Giải thích B: Python phân biệt HOA/thường',kw:'#',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b1-1_3',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B1 – Nhận biết',num:'1.3',title:'Ghi chú và quy tắc đặt tên',desc:`<b>Đề bài:</b> Viết chương trình có <b>ít nhất 3 chú thích</b> (#). Khai báo 3 biến đúng quy tắc: tên học sinh, tuổi, điểm. In ra thông tin.<br><b>Output mẫu:</b><pre class="ex-code">Học sinh: Nguyễn An
Tuổi: 16
Điểm: 8.5</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'Có ít nhất 3 chú thích #',kw:'#',pts:3,hint:''},{desc:'Đặt tên biến đúng quy tắc (gạch_dưới)',kw:'ten_hoc_sinh',pts:4,hint:''},{desc:'In đúng 3 thông tin',kw:'print',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b2-2_1',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B2 – Hiểu',num:'2.1',title:'Trace giá trị và kiểu dữ liệu',desc:`<b>Đề bài:</b> Chạy và điền kết quả của từng dòng:<pre class="ex-code">x = 10
y = "5"
z = x + int(y)    # z = ___
print(type(z))     # ___
print(type(y))     # ___
print(z * 2)       # ___</pre><b>Output:</b><pre class="ex-code">30
&lt;class 'int'&gt;
&lt;class 'str'&gt;
30</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'z=30 đúng',kw:'30',pts:3,hint:''},{desc:'type(z)=int',kw:'int',pts:3,hint:''},{desc:'z*2=30 (không phải 15)',kw:'30',pts:4,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b2-2_2',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B2 – Hiểu',num:'2.2',title:'Phân biệt Shell vs Script',desc:`<b>Đề bài:</b> Điền "Shell" hoặc "Script" cho mỗi trường hợp:<br>• Kiểm tra nhanh <code>2+3</code> → ___<br>• Viết chương trình 50 dòng → ___<br>• Tính ngay <code>math.sqrt(2)</code> → ___<br>• Chương trình chạy mỗi ngày tự động → ___<br>Sau đó chạy code ngắn trong Shell mode.`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Phân biệt đúng Shell/Script',kw:'#',pts:4,hint:''},{desc:'Chạy ít nhất 2 lệnh trong Shell mode',kw:'print',pts:3,hint:''},{desc:'Giải thích ưu điểm mỗi loại',kw:'#',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b2-2_3',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu lỗi SyntaxError',desc:`<b>Đề bài:</b> Code sau báo SyntaxError. Chạy, đọc thông báo lỗi, giải thích và sửa:<pre class="ex-code">ten = "An
print(ten)
tuoi = 16
print("Tuổi:", tuoi)</pre><b>Sau khi sửa:</b><pre class="ex-code">An
Tuổi: 16</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Tìm lỗi 1: thiếu " đóng chuỗi',kw:'"An"',pts:3,hint:''},{desc:'Tìm lỗi 2: dấu nháy trong print',kw:'f-string',pts:3,hint:''},{desc:'Code chạy đúng sau sửa',kw:'print',pts:4,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b3-3_1',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B3 – Áp dụng',num:'3.1',title:'Tính và in kết quả biểu thức',desc:`<b>Đề bài:</b> Tính và in kết quả 5 biểu thức: <code>2**10</code>, <code>100//7</code>, <code>100%7</code>, <code>3.14*5**2</code>, <code>int(3.99)</code>.<br><b>Output:</b><pre class="ex-code">1024
14
2
78.5
3</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'In đúng 2**10=1024',kw:'1024',pts:3,hint:''},{desc:'In đúng 100//7=14 và 100%7=2',kw:'14',pts:3,hint:''},{desc:'In đúng float và int()',kw:'78.5',pts:4,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b3-3_2',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B3 – Áp dụng',num:'3.2',title:'In thông tin cá nhân theo định dạng',desc:`<b>Đề bài:</b> Khai báo biến tên, lớp, ngày sinh, điểm TB. In ra phiếu thông tin đẹp theo mẫu:<pre class="ex-code">╔══════════════════════╗
║   THÔNG TIN HỌC SINH ║
╚══════════════════════╝
Họ tên : Nguyễn An
Lớp    : 10A1
Điểm TB: 8.50</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Khai báo đủ 4 biến',kw:'ten',pts:2,hint:''},{desc:'In viền bằng ký tự đặc biệt ╔',kw:'╔',pts:3,hint:''},{desc:'Căn cột bằng khoảng trắng hoặc f-string',kw:':',pts:5,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b3-3_3',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B3 – Áp dụng',num:'3.3',title:'Vẽ hình bằng ký tự',desc:`<b>Đề bài:</b> In hình chữ nhật rỗng bằng ký tự <code>*</code>, chiều rộng 10, chiều cao 4:<pre class="ex-code">**********
*        *
*        *
**********</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'In đúng dòng trên/dưới (10 dấu *)',kw:'**********',pts:4,hint:''},{desc:'In đúng 2 dòng giữa (*, 8 cách, *)',kw:'*        *',pts:4,hint:''},{desc:'Dùng print() đúng 4 lần',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b4-4_1',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B4 – Phân tích',num:'4.1',title:'Phân tích 3 loại lỗi Python',desc:`<b>Đề bài:</b> Viết ví dụ cho mỗi loại lỗi và giải thích:<br>• <b>SyntaxError</b> – lỗi cú pháp (viết sai quy tắc)<br>• <b>RuntimeError</b> – lỗi khi chạy (vd: chia cho 0)<br>• <b>LogicError</b> – lỗi logic (chạy nhưng sai kết quả)<br>Mỗi loại 1 ví dụ code, giải thích nguyên nhân.`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Ví dụ SyntaxError đúng',kw:'SyntaxError',pts:3,hint:''},{desc:'Ví dụ RuntimeError đúng',kw:'ZeroDivisionError',pts:3,hint:''},{desc:'Ví dụ LogicError đúng (chạy nhưng sai)',kw:'#',pts:4,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b4-4_2',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B4 – Phân tích',num:'4.2',title:'Debug chương trình in sai',desc:`<b>Đề bài:</b> Code sau in sai kết quả. Tìm 2 lỗi, giải thích và sửa:<pre class="ex-code">ten = input("Tên: ")
nam_sinh = input("Năm sinh: ")
tuoi = 2024 - nam_sinh    # Lỗi 1
print("Xin chào" + ten)   # Lỗi 2: thiếu dấu cách
print("Tuổi:", tuoi)</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Sửa Lỗi 1: int(input()) cho năm sinh',kw:'int(',pts:4,hint:''},{desc:'Sửa Lỗi 2: thêm dấu cách',kw:'", " + ten',pts:3,hint:''},{desc:'Code chạy đúng sau sửa',kw:'print',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b4-4_3',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B4 – Phân tích',num:'4.3',title:'Refactor code trùng lặp',desc:`<b>Đề bài:</b> Code sau in 5 dòng bằng 5 lệnh print riêng. Viết lại dùng vòng for và dùng hàm – ngắn hơn mà kết quả giống nhau:<pre class="ex-code">print("Học sinh 1")
print("Học sinh 2")
print("Học sinh 3")
print("Học sinh 4")
print("Học sinh 5")</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Dùng for range(1,6)',kw:'for',pts:4,hint:''},{desc:'Output giống hệt ban đầu',kw:'Học sinh',pts:3,hint:''},{desc:'Code ≤3 dòng',kw:'print',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b5-5_1',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh Python với ngôn ngữ khác',desc:`<b>Đề bài:</b> Cùng tính 1+2+...+100, so sánh Python với C (mã giả). Viết code Python, chạy và giải thích tại sao Python ngắn hơn:<pre class="ex-code">## C (11 dòng):           ## Python (1 dòng):
int main() {              print(sum(range(101)))
  int s=0,i;
  for(i=1;i<=100;i++)
    s+=i;
  printf("%d",s);
}</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'In đúng kết quả 5050',kw:'5050',pts:4,hint:''},{desc:'Giải thích Python ngắn hơn',kw:'#',pts:3,hint:''},{desc:'Biết dùng sum(range())',kw:'sum(range',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b5-5_2',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá print() với nhiều tham số',desc:`<b>Đề bài:</b> So sánh 4 cách in "Xin chào, An! Tuổi 16" — chọn cách tốt nhất và giải thích:<pre class="ex-code">## Cách 1: nối chuỗi
print("Xin chào, "+ten+"! Tuổi "+str(tuoi))
## Cách 2: nhiều tham số
print("Xin chào,", ten+"! Tuổi", tuoi)
## Cách 3: f-string
print(f"Xin chào, {ten}! Tuổi {tuoi}")
## Cách 4: format()
print("Xin chào, {}! Tuổi {}".format(ten,tuoi))</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Chạy đúng cả 4 cách',kw:'Xin chào',pts:3,hint:''},{desc:'Kết quả 4 cách giống nhau',kw:'True',pts:3,hint:''},{desc:'Chọn f-string và giải thích',kw:'f-string',pts:4,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b5-5_3',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn kiểu dữ liệu phù hợp',desc:`<b>Đề bài:</b> Cho các tình huống sau, chọn kiểu dữ liệu phù hợp (int/float/str/bool) và giải thích:<br>• Điểm kiểm tra (0–10, có thể 8.5)<br>• Số học sinh trong lớp<br>• Tên học sinh<br>• Đã đạt hay chưa đạt<br>• Năm sinh (1990–2010)`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Điểm → float',kw:'float',pts:2,hint:''},{desc:'Số HS → int',kw:'int',pts:2,hint:''},{desc:'Tên → str',kw:'str',pts:2,hint:''},{desc:'Đạt/chưa → bool',kw:'bool',pts:2,hint:''},{desc:'Năm sinh → int và giải thích tại sao',kw:'int',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b6-6_1',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B6 – Sáng tạo',num:'6.1',title:'Chương trình giới thiệu bản thân',desc:`<b>Đề bài:</b> Thiết kế chương trình nhập và in đầy đủ thông tin cá nhân: tên, lớp, trường, ngày sinh, sở thích, 3 môn học yêu thích. In đẹp với viền và biểu tượng.<br><b>Yêu cầu:</b> Có ít nhất 5 chú thích, đặt tên biến có nghĩa, dùng f-string.`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập đủ thông tin',kw:'input',pts:2,hint:''},{desc:'Có ít nhất 5 chú thích',kw:'#',pts:2,hint:''},{desc:'Dùng f-string',kw:'f"',pts:3,hint:''},{desc:'In đẹp với viền',kw:'╔',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-16-b6-6_2',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B6 – Sáng tạo',num:'6.2',title:'Mini calculator nhập từ bàn phím',desc:`<b>Đề bài:</b> Thiết kế "máy tính" nhận 2 số và phép toán (+,-,*,/) từ bàn phím. In kết quả đúng định dạng.<br><b>Input:</b><pre class="ex-code">10
+
5</pre><b>Output:</b><pre class="ex-code">10.0 + 5.0 = 15.0</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập 2 số float và phép toán str',kw:'float',pts:2,hint:''},{desc:'Xử lý đúng 4 phép toán',kw:'elif',pts:4,hint:''},{desc:'Xử lý chia cho 0',kw:'if b == 0',pts:3,hint:''},{desc:'In đúng định dạng a op b = kq',kw:'print',pts:1,hint:''}],errors:['Dùng 3 if riêng lẻ thay vì if-elif-else','Thiếu <code>:</code> sau điều kiện if','Nhầm thứ tự elif (điều kiện rộng trước hẹp)']},
{id:'k10-16-b6-6_3',g:'K10',ch:'Bài 16: Ngôn ngữ Python',lv:'B6 – Sáng tạo',num:'6.3',title:'Tạo pattern nghệ thuật',desc:`<b>Đề bài:</b> Nhập n (3–15). In hình kim cương (diamond) bằng ký tự * có chiều rộng lớn nhất là 2n-1.<br><b>Ví dụ n=4:</b><pre class="ex-code">   *
  ***
 *****
*******
 *****
  ***
   *</pre>`,theory:`<b>1. Python là gì?</b><br>Python là ngôn ngữ lập trình bậc cao, thông dịch, đa mục đích. Phiên bản hiện tại: Python 3.<pre class="ex-code">print("Xin chào, Thế giới!")  # Chương trình đầu tiên</pre>
<b>2. Chạy Python</b><br>• <b>Shell (REPL):</b> nhập lệnh → Enter → kết quả ngay<br>• <b>Script (.py):</b> viết file → chạy cả file<br>
<b>3. Chú thích (Comment)</b><pre class="ex-code"># Đây là chú thích một dòng
# Python bỏ qua dòng bắt đầu bằng #</pre>
<b>4. Quy tắc đặt tên</b><br>• Chỉ dùng chữ, số, dấu gạch dưới<br>• Không bắt đầu bằng số<br>• Phân biệt HOA/thường: <code>Ten</code> ≠ <code>ten</code>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập n và kiểm tra 3 ≤ n ≤ 15',kw:'int',pts:2,hint:''},{desc:'In đúng nửa trên (n dòng)',kw:'range(n)',pts:3,hint:''},{desc:'In đúng nửa dưới (n-1 dòng)',kw:'range(n-2',pts:3,hint:''},{desc:'Số khoảng trắng và dấu * đúng',kw:'2*i-1',pts:2,hint:''}],errors:['Sai phạm vi range(): thiếu +1 ở cuối','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy','Quên khởi tạo biến tổng trước vòng lặp']},
/* Bài 31: Thực hành viết CT */
{id:'k10-31-b1-1_1',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết quy trình 4 bước',desc:`<b>Đề bài:</b> Sắp xếp 4 bước viết chương trình theo thứ tự đúng rồi áp dụng cho bài "Tính tổng 2 số":<br>A) Kiểm thử  B) Lập kế hoạch  C) Đọc đề  D) Viết code<br><b>Thứ tự đúng:</b> C → B → D → A`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'Sắp xếp đúng thứ tự C→B→D→A',kw:'#',pts:3,hint:''},{desc:'Viết code tính tổng 2 số',kw:'a + b',pts:4,hint:''},{desc:'Test với 2+ bộ số',kw:'print',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-31-b1-1_2',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết Input/Output từ đề bài',desc:`<b>Đề bài:</b> Với mỗi bài toán, xác định Input và Output:<br>• Bài 1: "Nhập 3 cạnh tam giác, kiểm tra có tạo tam giác không"<br>• Bài 2: "In bảng cửu chương của n"<br>• Bài 3: "Tìm số lớn nhất trong mảng n phần tử"<br>Ghi ra giấy rồi code bài 1.`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'Xác định đúng Input/Output bài 1',kw:'a + b > c',pts:3,hint:''},{desc:'Code kiểm tra tam giác đúng',kw:'a + b > c',pts:4,hint:''},{desc:'In kết quả đúng',kw:'Tam giác',pts:3,hint:''}],errors:['Dùng 3 if riêng lẻ thay vì if-elif-else','Thiếu <code>:</code> sau điều kiện if','Nhầm thứ tự elif (điều kiện rộng trước hẹp)']},
{id:'k10-31-b1-1_3',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B1 – Nhận biết',num:'1.3',title:'Đọc mã giả và chuyển sang Python',desc:`<b>Đề bài:</b> Chuyển mã giả sau sang Python và chạy kiểm tra:<pre class="ex-code">BẮT ĐẦU
  NHẬP n (số nguyên dương)
  tong = 0
  LẶP i từ 1 đến n:
    tong = tong + i
  IN tong
KẾT THÚC</pre>`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'Nhập n bằng int(input())',kw:'int',pts:2,hint:''},{desc:'Dùng for range(1, n+1)',kw:'range(1',pts:4,hint:''},{desc:'Tính tổng += i',kw:'tong += i',pts:3,hint:''},{desc:'In tong đúng',kw:'print',pts:1,hint:''}],errors:['Sai phạm vi range(): thiếu +1 ở cuối','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy','Quên khởi tạo biến tổng trước vòng lặp']},
{id:'k10-31-b2-2_1',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B2 – Hiểu',num:'2.1',title:'Trace quy trình giải bài toán đổi tiền',desc:`<b>Đề bài:</b> Trace qua quy trình 4 bước cho bài "Đổi số tiền VNĐ sang USD (tỉ giá 25.000 VNĐ/USD)":<br>1. Input? Output?<br>2. Mã giả?<br>3. Code Python<br>4. Test: 500.000 VNĐ → ? USD`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Input: VNĐ, Output: USD',kw:'#',pts:2,hint:''},{desc:'Mã giả đúng',kw:'#',pts:2,hint:''},{desc:'Code: usd = vnd / 25000',kw:'25000',pts:3,hint:''},{desc:'Test đúng: 500000→20.0 USD',kw:'20',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-31-b2-2_2',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích chiến lược chia bài toán',desc:`<b>Đề bài:</b> Bài "Tính điểm học kỳ" có thể chia nhỏ thành:
<br>1. Nhập điểm
<br>2. Tính điểm TB
<br>3. Xếp loại
<br>4. In kết quả
<br>Viết code theo từng bước nhỏ, kiểm tra từng phần.`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Chia đúng 4 bước',kw:'#',pts:2,hint:''},{desc:'Code từng bước có thể chạy độc lập',kw:'def',pts:3,hint:''},{desc:'Kết hợp 4 bước cho kết quả cuối',kw:'print',pts:5,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Sai số tham số khi gọi hàm']},
{id:'k10-31-b2-2_3',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B2 – Hiểu',num:'2.3',title:'So sánh 2 cách giải cùng bài toán',desc:`<b>Đề bài:</b> Bài "Đảo ngược chuỗi" có 2 cách: (1) slicing s[::-1], (2) vòng for đảo từng ký tự. Giải thích cả 2, so sánh độ dài code và tốc độ.<br><b>Input:</b> "Hello"<br><b>Output:</b> "olleH"`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Cách 1: s[::-1] đúng',kw:'[::-1]',pts:4,hint:''},{desc:'Cách 2: for đảo đúng',kw:'for i in range',pts:3,hint:''},{desc:'So sánh có nhận xét',kw:'#',pts:3,hint:''}],errors:['Chuỗi không thể sửa trực tiếp: s[0]="a" → TypeError','Nhầm s.split() với s.split(",")']},
{id:'k10-31-b3-3_1',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B3 – Áp dụng',num:'3.1',title:'Giải bài toán tính tiền taxi',desc:`<b>Đề bài:</b> Tính tiền taxi: 2km đầu = 10.000đ, mỗi km tiếp = 5.000đ. Nhập số km, in tiền phải trả.<br><b>Input:</b> 7<br><b>Output:</b> <code>Tiền taxi: 35,000 đồng</code>`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Nhập km bằng float(input())',kw:'float',pts:2,hint:''},{desc:'Tính đúng: 10000 + (km-2)*5000 nếu km>2',kw:'10000',pts:4,hint:''},{desc:'Xử lý km ≤ 2 (tính phẳng 10000)',kw:'if km <= 2',pts:3,hint:''},{desc:'In có dấu phân cách ngàn',kw:':,',pts:1,hint:''}],errors:['Dùng 3 if riêng lẻ thay vì if-elif-else','Thiếu <code>:</code> sau điều kiện if','Nhầm thứ tự elif (điều kiện rộng trước hẹp)']},
{id:'k10-31-b3-3_2',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B3 – Áp dụng',num:'3.2',title:'Giải bài toán vẽ hình tam giác số',desc:`<b>Đề bài:</b> Nhập n. In tam giác số: dòng i in i số i (dòng 1 in "1", dòng 2 in "2 2", dòng 3 in "3 3 3").<br><b>Input:</b> 5<br><b>Output:</b><pre class="ex-code">1
2 2
3 3 3
4 4 4 4
5 5 5 5 5</pre>`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Nhập n bằng int(input())',kw:'int',pts:2,hint:''},{desc:'Vòng for i từ 1 đến n',kw:'range(1, n+1)',pts:3,hint:''},{desc:'In i số i đúng',kw:'str(i)*i',pts:4,hint:''},{desc:'Dùng sep hoặc join',kw:'join',pts:1,hint:''}],errors:['Sai phạm vi range(): thiếu +1 ở cuối','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy','Quên khởi tạo biến tổng trước vòng lặp']},
{id:'k10-31-b3-3_3',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B3 – Áp dụng',num:'3.3',title:'Giải bài toán số Armstrong',desc:`<b>Đề bài:</b> Số Armstrong 3 chữ số: tổng lập phương các chữ số = chính nó (vd: 153=1³+5³+3³). Tìm tất cả số Armstrong từ 100–999.<br><b>Output:</b><pre class="ex-code">153
370
371
407</pre>`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Vòng for 100–999',kw:'range(100, 1000)',pts:2,hint:''},{desc:'Tách chữ số đúng (//100, //10%10, %10)',kw:'// 100',pts:4,hint:''},{desc:'Kiểm tra a³+b³+c³==n',kw:'**3',pts:3,hint:''},{desc:'In đúng 4 số',kw:'153',pts:1,hint:''}],errors:['Sai phạm vi range(): thiếu +1 ở cuối','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy','Quên khởi tạo biến tổng trước vòng lặp']},
{id:'k10-31-b4-4_1',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B4 – Phân tích',num:'4.1',title:'Debug bài toán tính lãi kép',desc:`<b>Đề bài:</b> Code tính lãi kép sau có 3 lỗi. Tìm, giải thích và sửa:<pre class="ex-code">von = float(input("Vốn: "))
lai_suat = float(input("Lãi suất %/năm: "))
n = int(input("Số năm: "))
tien_cuoi = von * (1 + lai_suat) ** n   # Lỗi: chưa /100
print(f"Tiền sau {n} năm: {tien_cuoi}")</pre>`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Sửa Lỗi: lai_suat/100',kw:'lai_suat / 100',pts:5,hint:''},{desc:'Kiểm tra: 100tr, 6%, 10năm → 179.08tr',kw:'179',pts:3,hint:''},{desc:'In có định dạng đẹp',kw:':.2f',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-31-b4-4_2',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích và tối ưu code kiểm tra số nguyên tố',desc:`<b>Đề bài:</b> Code sau đúng nhưng chậm. Giải thích tại sao và tối ưu:<pre class="ex-code">def is_prime_cham(n):
    if n < 2: return False
    for i in range(2, n):  # Chậm: O(n)
        if n % i == 0: return False
    return True</pre>Viết lại nhanh hơn dùng range(2, int(n**0.5)+1).`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Viết is_prime nhanh dùng sqrt',kw:'int(n**0.5)',pts:5,hint:''},{desc:'Giải thích O(n) → O(√n)',kw:'#',pts:3,hint:''},{desc:'Kiểm tra cùng kết quả với 20 số',kw:'assert',pts:2,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Sai số tham số khi gọi hàm']},
{id:'k10-31-b4-4_3',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code đếm ước số',desc:`<b>Đề bài:</b> Cải thiện code đếm ước số theo 2 bước: (1) dừng sớm khi tìm thấy ước, (2) chỉ duyệt đến √n và đếm cả ước đôi. Kiểm tra n=36: có 9 ước.<pre class="ex-code">def dem_uoc_cham(n):
    return sum(1 for i in range(1, n+1) if n%i==0)</pre>`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Cách nhanh: duyệt đến √n',kw:'int(n**0.5)',pts:5,hint:''},{desc:'Đếm đúng cả ước đôi',kw:'dem += 2',pts:3,hint:''},{desc:'n=36 có đúng 9 ước',kw:'9',pts:2,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Sai số tham số khi gọi hàm']},
{id:'k10-31-b5-5_1',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh đệ quy vs vòng lặp',desc:`<b>Đề bài:</b> Tính n! bằng 2 cách: đệ quy và vòng for. So sánh số bước và tính n=10.<pre class="ex-code">def factorial_dequy(n):
    if n <= 1: return 1
    return n * factorial_dequy(n-1)

def factorial_voilap(n):
    kq = 1
    for i in range(2, n+1): kq *= i
    return kq</pre>`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Đệ quy đúng',kw:'factorial_dequy',pts:3,hint:''},{desc:'Vòng lặp đúng',kw:'factorial_voilap',pts:3,hint:''},{desc:'10! = 3628800 cả 2 cách',kw:'3628800',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Sai số tham số khi gọi hàm']},
{id:'k10-31-b5-5_2',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá 3 cách tính tổng 1..n',desc:`<b>Đề bài:</b> So sánh 3 cách tính 1+2+...+1000000:<br>• Cách 1: for loop<br>• Cách 2: sum(range())<br>• Cách 3: công thức n(n+1)/2<br>Đo thời gian bằng time.time() và so sánh.`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Cách 1: for đúng',kw:'for',pts:2,hint:''},{desc:'Cách 2: sum(range())',kw:'sum(range',pts:2,hint:''},{desc:'Cách 3: n*(n+1)//2',kw:'n*(n+1)',pts:2,hint:''},{desc:'Đo thời gian và so sánh',kw:'time.time',pts:4,hint:''}],errors:['Sai phạm vi range(): thiếu +1 ở cuối','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy','Quên khởi tạo biến tổng trước vòng lặp']},
{id:'k10-31-b5-5_3',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B5 – Đánh giá',num:'5.3',title:'Thiết kế hàm kiểm thử tự động',desc:`<b>Đề bài:</b> Viết hàm <code>test_all()</code> chạy 10 test case tự động cho hàm tính BMI. In kết quả "PASS/FAIL" từng test.<br><b>Mẫu:</b><pre class="ex-code">Test 1 (70kg,1.75m): PASS (BMI=22.86)
Test 2 (50kg,1.60m): PASS (BMI=19.53)</pre>`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Viết hàm tinh_bmi(can,cao)',kw:'def tinh_bmi',pts:3,hint:''},{desc:'Danh sách 10 test case',kw:'test_cases',pts:3,hint:''},{desc:'In PASS/FAIL từng test',kw:'PASS',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Sai số tham số khi gọi hàm']},
{id:'k10-31-b6-6_1',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B6 – Sáng tạo',num:'6.1',title:'Hệ thống quản lý điểm lớp',desc:`<b>Đề bài:</b> Thiết kế đầy đủ theo quy trình 4 bước: nhập điểm n học sinh, tính TB, tìm cao nhất/thấp nhất, xếp loại tất cả, in báo cáo có số thứ tự và định dạng đẹp.`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập n học sinh (tên, điểm)',kw:'input',pts:2,hint:''},{desc:'Tính TB, max, min',kw:'max',pts:2,hint:''},{desc:'Xếp loại từng HS',kw:'elif',pts:3,hint:''},{desc:'In báo cáo đẹp có số thứ tự',kw:'╔',pts:3,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k10-31-b6-6_2',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B6 – Sáng tạo',num:'6.2',title:'Chương trình quiz kiến thức Python',desc:`<b>Đề bài:</b> Thiết kế chương trình hỏi 5 câu trắc nghiệm về Python (lệnh print, input, kiểu dữ liệu...). Chấm điểm, hiển thị kết quả chi tiết và xếp loại.`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Có ít nhất 5 câu hỏi với 4 đáp án',kw:'câu',pts:2,hint:''},{desc:'Nhận câu trả lời và kiểm tra',kw:'input',pts:2,hint:''},{desc:'Đếm số câu đúng',kw:'dem_dung',pts:3,hint:''},{desc:'In kết quả và xếp loại',kw:'print',pts:3,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-31-b6-6_3',g:'K10',ch:'Bài 31: Thực hành viết CT',lv:'B6 – Sáng tạo',num:'6.3',title:'Mô phỏng máy tính khoa học',desc:`<b>Đề bài:</b> Thiết kế máy tính khoa học mini hỗ trợ: 7 phép toán cơ bản, căn bậc hai, lũy thừa, log, sin/cos (dùng module math). Vòng lặp while cho phép tính nhiều phép.`,theory:`<b>Quy trình viết chương trình</b><pre class="ex-code">Bước 1: ĐỌC KỸ ĐỀ BÀI
  → Xác định rõ Input là gì?
  → Xác định rõ Output là gì?
  → Có ràng buộc gì không?

Bước 2: LẬP KẾ HOẠCH (Mã giả)
  → Viết pseudocode từng bước
  → Chọn cấu trúc phù hợp

Bước 3: VIẾT CODE
  → Từng bước nhỏ, kiểm tra ngay
  → Đặt tên biến có nghĩa

Bước 4: KIỂM THỬ
  → Test với ví dụ đề bài
  → Test trường hợp biên: 0, âm, rỗng</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'import math',kw:'import math',pts:2,hint:''},{desc:'Vòng while cho phép tính nhiều lần',kw:'while',pts:3,hint:''},{desc:'Xử lý ≥8 loại phép toán',kw:'elif',pts:3,hint:''},{desc:'Xử lý lỗi (chia 0, căn âm...)',kw:'if',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
/* Bài 32: Ôn tập */
{id:'k10-32-b1-1_1',g:'K10',ch:'Bài 32: Ôn tập',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết cú pháp cơ bản K10',desc:`<b>Đề bài:</b> Khoanh đúng/sai và sửa lại các câu lệnh sau:<pre class="ex-code">A) x == 5            # gán x bằng 5
B) if x > 0           # thiếu gì?
C) for i in range(5)  # thiếu gì?
D) def f(x)           # thiếu gì?
E) print(x, y sep=,)  # sai ở đâu?</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'A sai: = thay ==',kw:'x = 5',pts:2,hint:''},{desc:'B,C,D thiếu dấu :',kw:'if x > 0:',pts:4,hint:''},{desc:'E: sep="," cần dấu nháy',kw:'sep=","',pts:4,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-32-b1-1_2',g:'K10',ch:'Bài 32: Ôn tập',lv:'B1 – Nhận biết',num:'1.2',title:'Điền kết quả các hàm phổ biến',desc:`<b>Đề bài:</b> Điền kết quả rồi chạy kiểm tra:<pre class="ex-code">A = [3,1,4,1,5,9,2]
print(len(A))          # ___
print(max(A))          # ___
print(min(A))          # ___
print(sum(A))          # ___
print(sorted(A))       # ___
print(A.count(1))      # ___</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'len=7',kw:'7',pts:2,hint:''},{desc:'max=9, min=1',kw:'9',pts:2,hint:''},{desc:'sum=25',kw:'25',pts:2,hint:''},{desc:'sorted đúng',kw:'[1, 1',pts:2,hint:''},{desc:'count(1)=2',kw:'2',pts:2,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k10-32-b1-1_3',g:'K10',ch:'Bài 32: Ôn tập',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết kiểu dữ liệu và phép toán',desc:`<b>Đề bài:</b> Xác định kiểu và kết quả:<pre class="ex-code">print(type(3 + 4))     # ___
print(type(3 / 4))     # ___
print(type(3 // 4))    # ___
print(3 + 4 == 7)      # ___
print("3" + "4")       # ___
print(int("3") + 4)    # ___</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'3+4 → int',kw:'int',pts:2,hint:''},{desc:'3/4 → float',kw:'float',pts:2,hint:''},{desc:'3//4 → int',kw:'int',pts:1,hint:''},{desc:'3==7 → True',kw:'True',pts:2,hint:''},{desc:'str+str → "34"',kw:'"34"',pts:2,hint:''},{desc:'int+int → 7',kw:'7',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while/def','Thụt lề sai (Tab thay vì 4 dấu cách)','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu: cần <code>int(input())</code>']},
{id:'k10-32-b2-2_1',g:'K10',ch:'Bài 32: Ôn tập',lv:'B2 – Hiểu',num:'2.1',title:'Trace chương trình tổng hợp',desc:`<b>Đề bài:</b> Trace toàn bộ, ghi giá trị từng biến sau mỗi lệnh, dự đoán output:<pre class="ex-code">A = [5, 3, 8, 1, 9]
t = 0
for x in A:
    if x % 2 != 0: t += x
print(t)</pre><b>Output:</b> <code>17</code> (5+3+9)`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Xác định đúng các số lẻ: 5,3,9',kw:'5+3+9',pts:4,hint:''},{desc:'Tổng đúng t=17',kw:'17',pts:4,hint:''},{desc:'Trace từng bước có ghi chú',kw:'#',pts:2,hint:''}],errors:['Sai phạm vi range(): thiếu +1 ở cuối','Dùng <code>=</code> thay vì <code>+=</code> khi tích lũy','Quên khởi tạo biến tổng trước vòng lặp']},
{id:'k10-32-b2-2_2',g:'K10',ch:'Bài 32: Ôn tập',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích chương trình tìm kiếm',desc:`<b>Đề bài:</b> Giải thích từng dòng code LinearSearch và nêu khi nào nên dùng BinarySearch thay thế:<pre class="ex-code">def tim(A, K):
    for i in range(len(A)):
        if A[i] == K:
            return i
    return -1</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Giải thích đúng từng dòng',kw:'#',pts:4,hint:''},{desc:'Nêu được O(n) của LinearSearch',kw:'O(n)',pts:3,hint:''},{desc:'Biết BinarySearch cần mảng sắp xếp',kw:'sắp xếp',pts:3,hint:''}],errors:['BinarySearch chỉ đúng với mảng đã SẮP XẾP','Sai điều kiện: lo <= hi']},
{id:'k10-32-b2-2_3',g:'K10',ch:'Bài 32: Ôn tập',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu đệ quy qua Fibonacci',desc:`<b>Đề bài:</b> Giải thích cách hàm đệ quy tính Fibonacci(5). Vẽ cây đệ quy và đếm số lần gọi hàm:<pre class="ex-code">def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Trace fib(5)=5 đúng',kw:'5',pts:3,hint:''},{desc:'Đếm số lần gọi hàm (15 lần)',kw:'15',pts:3,hint:''},{desc:'Giải thích cây đệ quy',kw:'#',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Sai số tham số khi gọi hàm']},
{id:'k10-32-b3-3_1',g:'K10',ch:'Bài 32: Ôn tập',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập tổng hợp: Quản lý điểm',desc:`<b>Đề bài:</b> Nhập n điểm (float). Tính TB, tìm max, min. Đếm số Giỏi(≥8.5)/Khá(≥6.5)/TB(≥5.0)/Yếu. In bảng thống kê đẹp.<br><b>Input:</b> n=5, điểm: 8.5 6.5 9.0 4.0 7.5<br><b>Output:</b> Bảng thống kê đầy đủ`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Nhập n điểm vào list',kw:'append',pts:2,hint:''},{desc:'Tính TB, max, min',kw:'sum(A)/n',pts:2,hint:''},{desc:'Đếm đúng 4 loại',kw:'dem_gioi',pts:3,hint:''},{desc:'In bảng đẹp',kw:'╔',pts:3,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k10-32-b3-3_2',g:'K10',ch:'Bài 32: Ôn tập',lv:'B3 – Áp dụng',num:'3.2',title:'Bài tập tổng hợp: Chuỗi và List',desc:`<b>Đề bài:</b> Nhập một câu tiếng Việt. Đếm số từ, số ký tự, số nguyên âm (a,e,i,o,u,â,ê...). In thống kê.<br><b>Input:</b> "Python là ngôn ngữ lập trình"<br><b>Output:</b><pre class="ex-code">Số từ: 6
Số ký tự: 27
Số nguyên âm: 9</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Đếm từ bằng split()',kw:'split()',pts:3,hint:''},{desc:'Đếm ký tự bằng len()',kw:'len(',pts:2,hint:''},{desc:'Đếm nguyên âm (bao gồm tiếng Việt)',kw:'â',pts:5,hint:''}],errors:['Chuỗi không thể sửa trực tiếp: s[0]="a" → TypeError','Nhầm s.split() với s.split(",")']},
{id:'k10-32-b3-3_3',g:'K10',ch:'Bài 32: Ôn tập',lv:'B3 – Áp dụng',num:'3.3',title:'Bài tập tổng hợp: Hàm và Module',desc:`<b>Đề bài:</b> Viết module gồm 4 hàm: tính ƯCLN(a,b), BCNN(a,b), kiểm tra nguyên tố(n), liệt kê nguyên tố từ 2 đến n. Kiểm thử mỗi hàm với 3 test case.`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Hàm ucln dùng while',kw:'def ucln',pts:2,hint:''},{desc:'Hàm bcnn = a*b//ucln',kw:'def bcnn',pts:2,hint:''},{desc:'Hàm is_prime đúng',kw:'def is_prime',pts:2,hint:''},{desc:'Hàm liệt kê nguyên tố',kw:'def liet_ke',pts:2,hint:''},{desc:'3 test case mỗi hàm',kw:'assert',pts:2,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Sai số tham số khi gọi hàm']},
{id:'k10-32-b4-4_1',g:'K10',ch:'Bài 32: Ôn tập',lv:'B4 – Phân tích',num:'4.1',title:'Debug chương trình sắp xếp sai',desc:`<b>Đề bài:</b> InsertionSort sau có lỗi. Tìm 2 lỗi, giải thích và sửa:<pre class="ex-code">def InsertionSort(A):
    for i in range(len(A)):  # Lỗi 1
        key = A[i]
        j = i
        while j > 0 and A[j] > key:  # Lỗi 2
            A[j] = A[j-1]
            j -= 1
        A[j] = key</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Lỗi 1: range phải bắt đầu từ 1',kw:'range(1,',pts:4,hint:''},{desc:'Lỗi 2: A[j] > key phải là A[j-1] > key',kw:'A[j-1]',pts:4,hint:''},{desc:'Test với [5,3,8,1,9] → [1,3,5,8,9]',kw:'[1, 3',pts:2,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số trong vòng lặp sắp xếp']},
{id:'k10-32-b4-4_2',g:'K10',ch:'Bài 32: Ôn tập',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán tìm kiếm nhị phân',desc:`<b>Đề bài:</b> BinarySearch sau không tìm thấy khi phần tử ở cuối mảng. Tìm lỗi và sửa:<pre class="ex-code">def BinSearch(A, K):
    lo, hi = 0, len(A)
    while lo < hi:          # Lỗi điều kiện
        mid = (lo+hi) // 2
        if A[mid] == K: return mid
        elif A[mid] < K: lo = mid
        else: hi = mid</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Sửa hi = len(A)-1',kw:'len(A) - 1',pts:3,hint:''},{desc:'Sửa lo <= hi',kw:'lo <= hi',pts:3,hint:''},{desc:'Sửa lo = mid+1',kw:'mid + 1',pts:4,hint:''}],errors:['BinarySearch chỉ đúng với mảng đã SẮP XẾP','Sai điều kiện: lo <= hi']},
{id:'k10-32-b4-4_3',g:'K10',ch:'Bài 32: Ôn tập',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code đọc được dễ hơn',desc:`<b>Đề bài:</b> Refactor code sau thành dễ đọc hơn, không đổi chức năng. Dùng list comprehension, hàm có tên rõ ràng, comment:<pre class="ex-code">def f(a):
    b=[]
    for x in a:
        if x%2==0 and x>0: b.append(x**2)
    return sorted(b)</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Dùng list comprehension',kw:'[x**2 for',pts:4,hint:''},{desc:'Đặt tên hàm có nghĩa',kw:'def',pts:3,hint:''},{desc:'Thêm comment giải thích',kw:'#',pts:3,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k10-32-b5-5_1',g:'K10',ch:'Bài 32: Ôn tập',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh Linear vs Binary Search',desc:`<b>Đề bài:</b> Với mảng 10000 phần tử, đo số bước và thời gian tìm phần tử cuối cùng bằng cả 2 thuật toán. Lập bảng so sánh.<br><b>Output mẫu:</b><pre class="ex-code">LinearSearch: 10000 bước, 0.003s
BinarySearch: 14 bước, 0.0001s
Nhanh hơn: 214×</pre>`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Đo số bước LinearSearch',kw:'dem_linear',pts:3,hint:''},{desc:'Đo số bước BinarySearch',kw:'dem_binary',pts:3,hint:''},{desc:'Tính tỉ lệ nhanh hơn',kw:'dem_linear / dem_binary',pts:4,hint:''}],errors:['BinarySearch chỉ đúng với mảng đã SẮP XẾP','Sai điều kiện: lo <= hi']},
{id:'k10-32-b5-5_2',g:'K10',ch:'Bài 32: Ôn tập',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá Insertion vs Selection Sort',desc:`<b>Đề bài:</b> Với n=1000 phần tử random, đếm số phép so sánh và hoán đổi của InsertionSort vs SelectionSort. Mảng nào thì Insertion tốt hơn?<br>Kiểm tra: mảng ngẫu nhiên, mảng gần sắp xếp, mảng đã sắp xếp.`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Đếm số so sánh mỗi thuật toán',kw:'so_sanh',pts:3,hint:''},{desc:'Đếm số hoán đổi mỗi thuật toán',kw:'hoan_doi',pts:3,hint:''},{desc:'Kết luận Insertion tốt hơn khi gần sắp xếp',kw:'#',pts:4,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số trong vòng lặp sắp xếp']},
{id:'k10-32-b5-5_3',g:'K10',ch:'Bài 32: Ôn tập',lv:'B5 – Đánh giá',num:'5.3',title:'Thiết kế bộ test toàn diện',desc:`<b>Đề bài:</b> Thiết kế bộ test case toàn diện cho hàm <code>BinarySearch</code>: phần tử đầu, giữa, cuối, không có, mảng 1 phần tử, mảng 2 phần tử, giá trị âm.<br>In PASS/FAIL từng test.`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Test phần tử đầu/giữa/cuối',kw:'assert',pts:3,hint:''},{desc:'Test phần tử không có',kw:'== -1',pts:3,hint:''},{desc:'Test các trường hợp biên',kw:'mang_1',pts:4,hint:''}],errors:['BinarySearch chỉ đúng với mảng đã SẮP XẾP','Sai điều kiện: lo <= hi']},
{id:'k10-32-b6-6_1',g:'K10',ch:'Bài 32: Ôn tập',lv:'B6 – Sáng tạo',num:'6.1',title:'Hệ thống quản lý thư viện mini',desc:`<b>Đề bài:</b> Thiết kế hệ thống: mượn/trả sách, kiểm tra sách có sẵn, in danh sách. Dùng list chứa dict {tên, tác_giả, có_sẵn}.`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Dùng list chứa dict sách',kw:'{}',pts:2,hint:''},{desc:'Hàm muon_sach() và tra_sach()',kw:'def muon',pts:3,hint:''},{desc:'Tìm kiếm theo tên sách',kw:'if sach["ten"]',pts:3,hint:''},{desc:'In danh sách đẹp',kw:'print',pts:2,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k10-32-b6-6_2',g:'K10',ch:'Bài 32: Ôn tập',lv:'B6 – Sáng tạo',num:'6.2',title:'Game đoán từ Wordle mini',desc:`<b>Đề bài:</b> Thiết kế game đoán từ 5 chữ cái (tiếng Anh). Sau mỗi lần đoán in: ✓ (đúng vị trí), ? (có nhưng sai chỗ), ✗ (không có). Tối đa 6 lần.`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Chọn từ bí ẩn ngẫu nhiên từ danh sách',kw:'random.choice',pts:2,hint:''},{desc:'Kiểm tra từng ký tự đúng vị trí',kw:'✓',pts:3,hint:''},{desc:'Kiểm tra ký tự có nhưng sai vị trí',kw:'?',pts:3,hint:''},{desc:'Vòng lặp 6 lần, xử lý thắng/thua',kw:'for i in range(6)',pts:2,hint:''}],errors:['Chuỗi không thể sửa trực tiếp: s[0]="a" → TypeError','Nhầm s.split() với s.split(",")']},
{id:'k10-32-b6-6_3',g:'K10',ch:'Bài 32: Ôn tập',lv:'B6 – Sáng tạo',num:'6.3',title:'Phân tích dữ liệu điểm thi THPT',desc:`<b>Đề bài:</b> Nhập điểm thi 3 môn của 30 học sinh. Thống kê: điểm TB toàn khối, tỉ lệ đỗ/trượt, phân phối Giỏi/Khá/TB/Yếu. In bảng có biểu đồ cột ASCII.`,theory:`<b>Tổng kết K10 – Tin học 10 KNTT</b><pre class="ex-code">## Biến và kiểu dữ liệu:
x = 5       # int
y = 3.14    # float
s = "hello" # str
b = True    # bool

## Rẽ nhánh:
if dk: ... elif dk2: ... else: ...

## Vòng lặp:
for i in range(n): ...  # biết trước n lần
while dk: ...           # đến khi sai

## Hàm:
def f(x, y=0): return x + y

## Cấu trúc dữ liệu:
lst = [1, 2, 3]    # list – thay đổi được
s   = "abc"        # str – không thay đổi</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập 30 bộ điểm',kw:'for i in range(30)',pts:2,hint:''},{desc:'Tính TB và phân loại từng HS',kw:'tinh_tb',pts:3,hint:''},{desc:'Thống kê toàn khối',kw:'tong_gioi',pts:3,hint:''},{desc:'In biểu đồ ASCII',kw:'* ',pts:2,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
/* ─── K11 ─── */
/* Bài 17: Mảng 1&2 chiều */
{id:'k11-17-b1-1_1',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B1 – Nhận biết',num:'1.1',title:'Nhận biết cú pháp mảng 1 chiều',desc:`<b>Đề bài:</b> Cho <code>A = [10, 20, 30, 40, 50]</code>. Điền kết quả:<pre class="ex-code">print(A[0])      # ___
print(A[-1])     # ___
print(A[1:3])    # ___
print(len(A))    # ___
print(30 in A)   # ___</pre><b>Output:</b><pre class="ex-code">10
50
[20, 30]
5
True</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'A[0]=10, A[-1]=50',kw:'10',pts:3,hint:''},{desc:'A[1:3]=[20,30]',kw:'[20, 30]',pts:3,hint:''},{desc:'len=5, True',kw:'len',pts:4,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b1-1_2',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp mảng 2 chiều',desc:`<b>Đề bài:</b> Cho ma trận M. Điền kết quả các truy cập:<pre class="ex-code">M = [[1,2,3],[4,5,6],[7,8,9]]
print(M[0][0])   # ___
print(M[1][2])   # ___
print(M[2])      # ___
print(len(M))    # ___
print(len(M[0])) # ___</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'M[0][0]=1, M[1][2]=6',kw:'1',pts:3,hint:''},{desc:'M[2]=[7,8,9]',kw:'[7, 8, 9]',pts:3,hint:''},{desc:'len(M)=3, len(M[0])=3',kw:'3',pts:4,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b1-1_3',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết khởi tạo mảng',desc:`<b>Đề bài:</b> Điền kết quả tạo mảng:<pre class="ex-code">A = [0] * 5            # A = ___
B = list(range(1,6))   # B = ___
M = [[0]*3]*2          # M = ___
N = [[0]*3 for _ in range(2)]  # N = ___</pre>Câu hỏi: M và N khác nhau ở điểm gì?`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B1 – Nhận biết
ĐỌC code từng dòng
THEO DÕI giá trị biến
INTIN kết quả</pre>`,rb:[{desc:'A=[0,0,0,0,0]',kw:'[0, 0',pts:2,hint:''},{desc:'B=[1,2,3,4,5]',kw:'[1, 2',pts:2,hint:''},{desc:'M và N giống nhau về giá trị',kw:'[[0, 0',pts:2,hint:''},{desc:'Giải thích khác biệt: M tham chiếu chung hàng',kw:'#',pts:4,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b2-2_1',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B2 – Hiểu',num:'2.1',title:'Trace duyệt mảng tìm max',desc:`<b>Đề bài:</b> Trace và điền bảng giá trị sau mỗi vòng lặp:<pre class="ex-code">A = [5, 3, 8, 1, 9, 2]
max_val = A[0]
for x in A:
    if x > max_val:
        max_val = x
print(max_val)</pre><b>Output:</b> <code>9</code>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'max_val ban đầu = 5',kw:'5',pts:2,hint:''},{desc:'Sau x=8: max_val=8',kw:'8',pts:3,hint:''},{desc:'Sau x=9: max_val=9, kết quả 9',kw:'9',pts:5,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b2-2_2',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích duyệt ma trận',desc:`<b>Đề bài:</b> Giải thích output và viết lại vòng lặp dùng chỉ số i,j:<pre class="ex-code">M = [[1,2,3],[4,5,6],[7,8,9]]
for hang in M:
    for pt in hang:
        print(pt, end=" ")
    print()</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Output: 3 dòng 1 2 3 / 4 5 6 / 7 8 9',kw:'1 2 3',pts:3,hint:''},{desc:'Viết lại dùng M[i][j]',kw:'M[i][j]',pts:4,hint:''},{desc:'Giải thích 2 vòng for lồng',kw:'#',pts:3,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b2-2_3',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu hoán đổi phần tử mảng',desc:`<b>Đề bài:</b> Trace hoán đổi A[0] và A[-1] rồi giải thích kết quả:<pre class="ex-code">A = [10, 20, 30, 40, 50]
A[0], A[-1] = A[-1], A[0]
print(A)</pre><b>Output:</b> <code>[50, 20, 30, 40, 10]</code>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B2 – Hiểu
TRACE từng bước
DỰ ĐOÁN trước khi chạy
SO SÁNH kết quả thực tế</pre>`,rb:[{desc:'Output đúng [50,20,30,40,10]',kw:'[50, 20',pts:4,hint:''},{desc:'Giải thích gán đồng thời',kw:'#',pts:3,hint:''},{desc:'So sánh với cách dùng biến phụ',kw:'tam',pts:3,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b3-3_1',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B3 – Áp dụng',num:'3.1',title:'Nhập và tìm max/min mảng',desc:`<b>Đề bài:</b> Nhập n và n số nguyên. Tìm và in: max, min, vị trí max, vị trí min.<br><b>Input:</b><pre class="ex-code">5
3 8 1 9 2</pre><b>Output:</b><pre class="ex-code">Max = 9 tại vị trí 3
Min = 1 tại vị trí 2</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Nhập n và mảng',kw:'append',pts:2,hint:''},{desc:'Tìm max và vị trí',kw:'A.index(max',pts:3,hint:''},{desc:'Tìm min và vị trí',kw:'A.index(min',pts:3,hint:''},{desc:'In đúng định dạng',kw:'print',pts:2,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b3-3_2',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B3 – Áp dụng',num:'3.2',title:'Đếm phần tử thỏa điều kiện',desc:`<b>Đề bài:</b> Nhập mảng n phần tử. Đếm và in: số phần tử dương, số phần tử chẵn, số phần tử trong khoảng [5,10].<br><b>Input:</b><pre class="ex-code">6
-2 5 8 3 11 6</pre><b>Output:</b><pre class="ex-code">Dương: 5
Chẵn: 3
Trong [5,10]: 3</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Nhập mảng n phần tử',kw:'append',pts:2,hint:''},{desc:'Đếm dương (x>0)',kw:'if x > 0',pts:2,hint:''},{desc:'Đếm chẵn (x%2==0)',kw:'if x % 2',pts:2,hint:''},{desc:'Đếm [5,10]: 5<=x<=10',kw:'5 <= x <= 10',pts:4,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b3-3_3',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B3 – Áp dụng',num:'3.3',title:'Nhân ma trận vô hướng và tổng ma trận',desc:`<b>Đề bài:</b> Nhập ma trận n×m. Thực hiện 2 yêu cầu: (1) Nhân tất cả phần tử với k, (2) Tính tổng từng hàng và từng cột.<br><b>Input:</b> n=2, m=3, k=2`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B3 – Áp dụng
XÁC ĐỊNH Input / Output
NHẬP dữ liệu (input + ép kiểu)
TÍNH TOÁN / XỬ LÝ
IN kết quả đúng định dạng</pre>`,rb:[{desc:'Nhập ma trận 2D',kw:'M[i][j]',pts:2,hint:''},{desc:'Nhân mỗi phần tử với k',kw:'M[i][j] *= k',pts:3,hint:''},{desc:'Tính tổng từng hàng',kw:'sum(M[i])',pts:3,hint:''},{desc:'Tính tổng từng cột',kw:'sum(M[i][j]',pts:2,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b4-4_1',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi duyệt mảng 2 chiều',desc:`<b>Đề bài:</b> Code sau bị lỗi khi tính tổng ma trận. Tìm và sửa 2 lỗi:<pre class="ex-code">M = [[1,2,3],[4,5,6]]
tong = 0
for i in range(len(M)):    # 2 hàng
    for j in range(len(M)):  # Lỗi 1
        tong += M[i][j]
print(tong)</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Lỗi 1: len(M) phải là len(M[0])',kw:'len(M[0])',pts:5,hint:''},{desc:'Kết quả đúng sau sửa: 21',kw:'21',pts:3,hint:''},{desc:'Giải thích nguyên nhân lỗi',kw:'#',pts:2,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b4-4_2',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích vòng lặp đếm phần tử',desc:`<b>Đề bài:</b> Code đếm phần tử > 5 trong mảng 2D. Nêu 2 cách viết (nested for vs list comprehension) và so sánh:<pre class="ex-code">M = [[1,8,3],[4,6,2],[7,5,9]]
## Cách 1: nested for
## Cách 2: list comprehension</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Cách 1: 2 for lồng đếm đúng',kw:'for hang in M',pts:3,hint:''},{desc:'Cách 2: LC đúng',kw:'sum(x>5 for',pts:4,hint:''},{desc:'Cả 2 ra kết quả 4',kw:'4',pts:3,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b4-4_3',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu tạo ma trận tránh bẫy tham chiếu',desc:`<b>Đề bài:</b> Code sau có lỗi tiềm ẩn. Giải thích và sửa:<pre class="ex-code">## Cách SAI - tất cả hàng trỏ cùng object:
M = [[0]*3] * 3
M[0][0] = 99
print(M)  # Tại sao cột đầu toàn 99?</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B4 – Phân tích
ĐỌC code lỗi
XÁC ĐỊNH loại lỗi
SỬA và kiểm tra lại</pre>`,rb:[{desc:'Giải thích lỗi: tham chiếu chung',kw:'#',pts:4,hint:''},{desc:'Sửa đúng: [[0]*3 for _ in range(3)]',kw:'for _ in range',pts:4,hint:''},{desc:'Kiểm tra: M[0][0]=99 không ảnh hưởng hàng khác',kw:'print',pts:2,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b5-5_1',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh mảng 1D vs 2D lưu điểm',desc:`<b>Đề bài:</b> Lưu điểm 30 HS × 5 môn. So sánh 2 cách: list 1D (150 phần tử) vs list 2D (30×5). Cách nào dễ tính điểm TB từng HS?<br>Viết code cả 2 cách tính TB HS đầu tiên.`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Code mảng 1D: diem[hs*5 + mon]',kw:'diem[0*5',pts:3,hint:''},{desc:'Code mảng 2D: diem[hs][mon]',kw:'diem[0][',pts:3,hint:''},{desc:'Kết luận 2D dễ đọc hơn',kw:'#',pts:4,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b5-5_2',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá thuật toán tìm max 2D',desc:`<b>Đề bài:</b> So sánh 2 cách tìm max trong ma trận n×n: (1) 2 for lồng O(n²), (2) max(max(row) for row in M) – cùng O(n²) nhưng code ngắn hơn. Kiểm thử cả 2 cùng cho 1 ma trận.`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Cách 1: 2 for lồng đúng',kw:'for i in range',pts:3,hint:''},{desc:'Cách 2: max comprehension',kw:'max(max(row)',pts:4,hint:''},{desc:'Kết quả giống nhau',kw:'assert',pts:3,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b5-5_3',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn cấu trúc lưu dữ liệu học sinh',desc:`<b>Đề bài:</b> Lưu thông tin 30 HS (tên, tuổi, điểm 5 môn). So sánh: list 2D vs list of dict. Cách nào dễ tìm theo tên? Dễ thêm môn mới?`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B5 – Đánh giá
VIẾT 2+ cách giải
SO SÁNH hiệu quả
KẾT LUẬN cách tốt nhất</pre>`,rb:[{desc:'Code với list 2D',kw:'M[i][0]',pts:2,hint:''},{desc:'Code với list of dict',kw:'{"ten":',pts:3,hint:''},{desc:'So sánh ưu nhược điểm rõ ràng',kw:'#',pts:3,hint:''},{desc:'Kết luận dict dễ bảo trì hơn',kw:'dict',pts:2,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b6-6_1',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B6 – Sáng tạo',num:'6.1',title:'Ma trận chuyển vị',desc:`<b>Đề bài:</b> Nhập ma trận m×n. In ra ma trận chuyển vị n×m (hàng thành cột, cột thành hàng).<br><b>Input:</b><pre class="ex-code">2 3
1 2 3
4 5 6</pre><b>Output:</b><pre class="ex-code">1 4
2 5
3 6</pre>`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập ma trận m×n',kw:'for i in range(m)',pts:2,hint:''},{desc:'Tạo ma trận chuyển vị [[M[j][i]]',kw:'M[j][i]',pts:5,hint:''},{desc:'In ma trận kết quả đúng',kw:'print(*T[i])',pts:3,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b6-6_2',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B6 – Sáng tạo',num:'6.2',title:'Nhân 2 ma trận',desc:`<b>Đề bài:</b> Nhập 2 ma trận A (m×n) và B (n×p). Tính tích C = A×B (m×p). In C.<br><b>Công thức:</b> C[i][j] = Σ A[i][k]×B[k][j] với k từ 0 đến n-1`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Nhập A (m×n) và B (n×p)',kw:'for i in range(m)',pts:2,hint:''},{desc:'3 vòng lặp i,j,k',kw:'for k in range(n)',pts:4,hint:''},{desc:'C[i][j] += A[i][k]*B[k][j]',kw:'C[i][j]',pts:4,hint:''}],errors:['Chỉ số list bắt đầu từ 0','IndexError khi truy cập ngoài phạm vi','Nhầm .append() với += []']},
{id:'k11-17-b6-6_3',g:'K11',ch:'Bài 17: Mảng 1&2 chiều',lv:'B6 – Sáng tạo',num:'6.3',title:'Mê cung tìm đường',desc:`<b>Đề bài:</b> Cho mảng 2D n×n (0=đường đi, 1=tường). Từ (0,0) đến (n-1,n-1), chỉ đi sang phải hoặc xuống. Tìm số đường đi có thể (bài toán đệ quy đơn giản).`,theory:`<b>1. Mảng 1 chiều (List)</b><pre class="ex-code">n = int(input("n = "))
A = []
for i in range(n):
    A.append(int(input()))
print("Max:", max(A))
print("Min:", min(A))
print("Tổng:", sum(A))</pre>
<b>2. Mảng 2 chiều (Ma trận)</b><pre class="ex-code">n, m = 3, 4  # n hàng, m cột
M = [[0]*m for _ in range(n)]
# Nhập:
for i in range(n):
    for j in range(m):
        M[i][j] = int(input())
# In:
for hang in M:
    print(*hang)</pre>`,pseudo:`<pre class="ex-code">## B6 – Sáng tạo
ĐỌC ĐỀ: Input? Output?
LẬP KẾ HOẠCH → mã giả
VIẾT CODE từng bước
KIỂM THỬ điều kiện biên</pre>`,rb:[{desc:'Đọc mảng 2D',kw:'M[i][j]',pts:2,hint:''},{desc:'Đệ quy: dem(i,j)=dem(i+1,j)+dem(i,j+1)',kw:'def dem',pts:4,hint:''},{desc:'Xử lý điều kiện biên',kw:'if i==n-1',pts:4,hint:''}],errors:['Quên <code>return</code> → hàm trả về None','Gọi hàm trước khi định nghĩa','Sai số tham số khi gọi hàm']},
/* Bài 22: TH sắp xếp */
{id:'k11-22-b1-1_1',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b1-1_2',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b1-1_3',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b2-2_1',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b2-2_2',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b2-2_3',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b3-3_1',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b3-3_2',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b3-3_3',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b4-4_1',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b4-4_2',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b4-4_3',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b5-5_1',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b5-5_2',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b5-5_3',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b6-6_1',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b6-6_2',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-22-b6-6_3',g:'K11',ch:'Bài 22: TH sắp xếp',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Kiểm thử thuật toán sắp xếp</b><pre class="ex-code">def is_sorted(A):
    return all(A[i] <= A[i+1] for i in range(len(A)-1))

## Test InsertionSort:
A = [5,3,8,1,9,2]
InsertionSort(A)
assert is_sorted(A), "Sắp xếp sai!"
print("PASS:", A)

## Đếm số hoán đổi:
def selection_with_count(A):
    count = 0
    for i in range(len(A)):
        m = min(range(i,len(A)), key=lambda x:A[x])
        if m != i: A[i],A[m]=A[m],A[i]; count+=1
    return count</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 23: Kiểm thử & đánh giá */
{id:'k11-23-b1-1_1',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b1-1_2',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b1-1_3',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b2-2_1',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b2-2_2',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b2-2_3',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b3-3_1',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b3-3_2',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b3-3_3',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b4-4_1',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b4-4_2',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b4-4_3',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b5-5_1',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b5-5_2',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b5-5_3',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b6-6_1',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b6-6_2',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-23-b6-6_3',g:'K11',ch:'Bài 23: Kiểm thử & đánh giá',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Kiểm thử hệ thống</b><pre class="ex-code">## assert – kiểm tra tự động:
def tinh_tb(a, b, c):
    return (a + b + c) / 3

assert tinh_tb(6,8,10) == 8.0    # bình thường
assert tinh_tb(0,0,0)  == 0.0    # biên
assert tinh_tb(10,10,10) == 10.0 # đặc biệt</pre>
<b>Các loại test:</b><br>• Trường hợp bình thường<br>• Biên: 0, âm, rỗng, max<br>• Đặc biệt: chia hết, nguyên tố...`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 24: Độ phức tạp TG */
{id:'k11-24-b1-1_1',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b1-1_2',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b1-1_3',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b2-2_1',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b2-2_2',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b2-2_3',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b3-3_1',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b3-3_2',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b3-3_3',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b4-4_1',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b4-4_2',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b4-4_3',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b5-5_1',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b5-5_2',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b5-5_3',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b6-6_1',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b6-6_2',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-24-b6-6_3',g:'K11',ch:'Bài 24: Độ phức tạp TG',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Big-O Notation</b><pre class="ex-code">O(1)       # Hằng số
O(log n)   # BinarySearch
O(n)       # LinearSearch
O(n log n) # QuickSort, MergeSort
O(n²)      # InsertionSort, SelectionSort</pre>
<b>Phân tích:</b><pre class="ex-code">for i in range(n):        # n lần → O(n)
    for j in range(n):    # n*n → O(n²)
        pass</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 25: TH độ phức tạp */
{id:'k11-25-b1-1_1',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b1-1_2',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b1-1_3',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b2-2_1',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b2-2_2',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b2-2_3',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b3-3_1',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b3-3_2',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b3-3_3',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b4-4_1',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b4-4_2',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b4-4_3',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b5-5_1',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b5-5_2',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b5-5_3',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b6-6_1',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b6-6_2',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-25-b6-6_3',g:'K11',ch:'Bài 25: TH độ phức tạp',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Đếm bước thực tế</b><pre class="ex-code">## Đếm bước BinarySearch:
buoc = 0
lo, hi = 0, len(A)-1
while lo <= hi:
    mid = (lo+hi)//2; buoc += 1
    if A[mid]==K: break
    elif A[mid]<K: lo=mid+1
    else: hi=mid-1
print(f"Tìm {K}: {buoc} bước (log₂{len(A)}≈{len(A).bit_length()})")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 26: Làm mịn dần */
{id:'k11-26-b1-1_1',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b1-1_2',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b1-1_3',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b2-2_1',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b2-2_2',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b2-2_3',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b3-3_1',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b3-3_2',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b3-3_3',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b4-4_1',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b4-4_2',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b4-4_3',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b5-5_1',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b5-5_2',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b5-5_3',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b6-6_1',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b6-6_2',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-26-b6-6_3',g:'K11',ch:'Bài 26: Làm mịn dần',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Stepwise Refinement (Top-Down Design)</b><pre class="ex-code">## Mức 1 (tổng quát):
GIẢI bài toán quản lý sinh viên

## Mức 2 (chi tiết hơn):
NHẬP danh sách sinh viên
TÍNH điểm TB từng sinh viên
SẮP XẾP theo điểm giảm dần
IN bảng xếp hạng

## Mức 3 (cài đặt từng hàm):
def nhap_sv(n): ...
def tinh_dtb(diem): ...
def sap_xep(ds): ...
def in_bang(ds): ...</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 27: TH làm mịn dần */
{id:'k11-27-b1-1_1',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b1-1_2',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b1-1_3',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b2-2_1',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b2-2_2',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b2-2_3',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b3-3_1',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b3-3_2',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b3-3_3',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b4-4_1',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b4-4_2',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b4-4_3',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b5-5_1',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b5-5_2',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b5-5_3',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b6-6_1',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b6-6_2',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-27-b6-6_3',g:'K11',ch:'Bài 27: TH làm mịn dần',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Áp dụng Làm Mịn Dần thực tế</b><pre class="ex-code">## Bài toán: Hệ thống điểm lớp học
## Mức 1: Mô tả yêu cầu
## Mức 2: Chia thành 4 module
## Mức 3: Cài đặt từng module

def module_nhap():
    ds = []
    n = int(input("Số học sinh: "))
    for i in range(n):
        ten = input(f"Tên HS {i+1}: ")
        diem = [float(input(f"  Môn {j+1}: ")) for j in range(5)]
        ds.append({'ten': ten, 'diem': diem})
    return ds</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 28: Thiết kế mô-đun */
{id:'k11-28-b1-1_1',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b1-1_2',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b1-1_3',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b2-2_1',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b2-2_2',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b2-2_3',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b3-3_1',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b3-3_2',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b3-3_3',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b4-4_1',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b4-4_2',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b4-4_3',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b5-5_1',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b5-5_2',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b5-5_3',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b6-6_1',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b6-6_2',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-28-b6-6_3',g:'K11',ch:'Bài 28: Thiết kế mô-đun',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Module hóa chương trình</b><pre class="ex-code">## Module là tập hàm cùng chủ đề
## Ưu điểm: tái sử dụng, dễ kiểm thử, dễ bảo trì

## Ví dụ module thống kê:
def tinh_tb(A):   return sum(A)/len(A)
def tinh_var(A):
    tb = tinh_tb(A)
    return sum((x-tb)**2 for x in A)/len(A)
def tinh_std(A):  return tinh_var(A)**0.5
def tinh_med(A):  return sorted(A)[len(A)//2]</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 29: TH thiết kế mô-đun */
{id:'k11-29-b1-1_1',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b1-1_2',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b1-1_3',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b2-2_1',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b2-2_2',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b2-2_3',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b3-3_1',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b3-3_2',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b3-3_3',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b4-4_1',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b4-4_2',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b4-4_3',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b5-5_1',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b5-5_2',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b5-5_3',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b6-6_1',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b6-6_2',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-29-b6-6_3',g:'K11',ch:'Bài 29: TH thiết kế mô-đun',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thực hành thiết kế module</b><pre class="ex-code">## Module quản lý học sinh:
def nhap_ds(n): ...          # nhập dữ liệu
def tinh_dtb(ds): ...        # tính điểm TB
def sap_xep_dtb(ds): ...     # sắp xếp
def in_bang_diem(ds): ...    # in báo cáo
def tim_hs(ds, ten): ...     # tìm kiếm
def them_hs(ds, hs): ...     # thêm HS
def xoa_hs(ds, ten): ...     # xóa HS</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 30: Thư viện */
{id:'k11-30-b1-1_1',g:'K11',ch:'Bài 30: Thư viện',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b1-1_2',g:'K11',ch:'Bài 30: Thư viện',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b1-1_3',g:'K11',ch:'Bài 30: Thư viện',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b2-2_1',g:'K11',ch:'Bài 30: Thư viện',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b2-2_2',g:'K11',ch:'Bài 30: Thư viện',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b2-2_3',g:'K11',ch:'Bài 30: Thư viện',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b3-3_1',g:'K11',ch:'Bài 30: Thư viện',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b3-3_2',g:'K11',ch:'Bài 30: Thư viện',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b3-3_3',g:'K11',ch:'Bài 30: Thư viện',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b4-4_1',g:'K11',ch:'Bài 30: Thư viện',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b4-4_2',g:'K11',ch:'Bài 30: Thư viện',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b4-4_3',g:'K11',ch:'Bài 30: Thư viện',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b5-5_1',g:'K11',ch:'Bài 30: Thư viện',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b5-5_2',g:'K11',ch:'Bài 30: Thư viện',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b5-5_3',g:'K11',ch:'Bài 30: Thư viện',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b6-6_1',g:'K11',ch:'Bài 30: Thư viện',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b6-6_2',g:'K11',ch:'Bài 30: Thư viện',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-30-b6-6_3',g:'K11',ch:'Bài 30: Thư viện',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thư viện Python quan trọng</b><pre class="ex-code">import math
math.sqrt(16)    # 4.0
math.pi          # 3.14159...
math.log(100,10) # 2.0

import random
random.randint(1,10)   # số ngẫu nhiên
random.shuffle(lst)    # xáo trộn
random.sample(lst, k)  # chọn k phần tử

import time
t = time.time()        # timestamp
# ... code ...
print(time.time()-t)   # đo thời gian</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 31: TH thư viện */
{id:'k11-31-b1-1_1',g:'K11',ch:'Bài 31: TH thư viện',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code điền kết quả',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b1-1_2',g:'K11',ch:'Bài 31: TH thư viện',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết cú pháp',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b1-1_3',g:'K11',ch:'Bài 31: TH thư viện',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận diện lỗi cơ bản',desc:`<b>Đề bài:</b> Đọc code và điền kết quả đúng. Chạy kiểm tra lại.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b2-2_1',g:'K11',ch:'Bài 31: TH thư viện',lv:'B2 – Hiểu',num:'2.1',title:'Trace từng bước',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b2-2_2',g:'K11',ch:'Bài 31: TH thư viện',lv:'B2 – Hiểu',num:'2.2',title:'Dự đoán output',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b2-2_3',g:'K11',ch:'Bài 31: TH thư viện',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích code',desc:`<b>Đề bài:</b> Trace code từng bước. Dự đoán output trước khi chạy.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b3-3_1',g:'K11',ch:'Bài 31: TH thư viện',lv:'B3 – Áp dụng',num:'3.1',title:'Bài tập cơ bản',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b3-3_2',g:'K11',ch:'Bài 31: TH thư viện',lv:'B3 – Áp dụng',num:'3.2',title:'Bài toán thực tế',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b3-3_3',g:'K11',ch:'Bài 31: TH thư viện',lv:'B3 – Áp dụng',num:'3.3',title:'Ứng dụng mở rộng',desc:`<b>Đề bài:</b> Viết chương trình Python giải bài toán theo yêu cầu. Ghi rõ Input/Output.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập dữ liệu đúng kiểu',kw:'input',pts:2,hint:''},{desc:'Xử lý logic chính',kw:'for',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print',pts:2,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b4-4_1',g:'K11',ch:'Bài 31: TH thư viện',lv:'B4 – Phân tích',num:'4.1',title:'Debug lỗi logic',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b4-4_2',g:'K11',ch:'Bài 31: TH thư viện',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích thuật toán',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b4-4_3',g:'K11',ch:'Bài 31: TH thư viện',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu code',desc:`<b>Đề bài:</b> Code sau có lỗi. Tìm lỗi, giải thích và sửa cho đúng.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b5-5_1',g:'K11',ch:'Bài 31: TH thư viện',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh 2 cách giải',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b5-5_2',g:'K11',ch:'Bài 31: TH thư viện',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá hiệu suất',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b5-5_3',g:'K11',ch:'Bài 31: TH thư viện',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn giải pháp',desc:`<b>Đề bài:</b> Viết 2+ cách giải quyết cùng vấn đề. So sánh và kết luận.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Kết quả đúng theo yêu cầu',kw:'print',pts:6,hint:''},{desc:'Logic xử lý đúng',kw:'if',pts:3,hint:''},{desc:'Có chú thích',kw:'#',pts:1,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b6-6_1',g:'K11',ch:'Bài 31: TH thư viện',lv:'B6 – Sáng tạo',num:'6.1',title:'Thiết kế chương trình',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b6-6_2',g:'K11',ch:'Bài 31: TH thư viện',lv:'B6 – Sáng tạo',num:'6.2',title:'Dự án nhỏ',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
{id:'k11-31-b6-6_3',g:'K11',ch:'Bài 31: TH thư viện',lv:'B6 – Sáng tạo',num:'6.3',title:'Kết hợp sáng tạo',desc:`<b>Đề bài:</b> Thiết kế và viết chương trình hoàn chỉnh theo quy trình 4 bước.`,theory:`<b>Thực hành dùng thư viện</b><pre class="ex-code">import math, random, time

## Tính toán nâng cao:
print(math.factorial(10))   # 3628800
print(math.gcd(12, 8))      # 4
print(math.comb(5, 2))      # 10 (C(5,2))

## Mô phỏng ngẫu nhiên:
ds = list(range(1, 53))  # bộ bài 52 lá
random.shuffle(ds)
print(ds[:5])            # 5 lá đầu

## Đo thời gian thuật toán:
import time
start = time.perf_counter()
sorted(random.sample(range(10**6), 10000))
print(f"{time.perf_counter()-start:.4f}s")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập dữ liệu',kw:'input',pts:1,hint:''},{desc:'Logic chính hoạt động',kw:'def',pts:3,hint:''},{desc:'Xử lý đầy đủ các trường hợp',kw:'elif',pts:4,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['Thiếu <code>:</code> sau if/for/while','Thụt lề sai','Nhầm <code>=</code> với <code>==</code>','Quên ép kiểu int/float']},
/* Bài 18: TH dữ liệu mảng */
{id:'k11-18-b1-1_1',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B1 – Nhận biết',num:'1.1',title:'Đọc code thống kê mảng',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">A = [5,-2,8,0,3,-1,7]
print(sum(A))                         # ___
print(sum(x for x in A if x>0))       # ___
print(sum(1 for x in A if x%2==0))    # ___</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'sum(A)=20',kw:'20',pts:3,hint:''},{desc:'tổng dương=23',kw:'23',pts:4,hint:''},{desc:'đếm chẵn=3',kw:'-2',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b1-1_2',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B1 – Nhận biết',num:'1.2',title:'Nhận biết list comprehension lọc',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">A = [3,1,4,1,5,9,2,6,5]
B = [x for x in A if x > 4]
C = [x**2 for x in A if x%2==0]
print(B)  # ___
print(C)  # ___</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'B=[5,9,6,5] đúng',kw:'[5, 9',pts:4,hint:''},{desc:'C=[4,4,36] đúng',kw:'[4, 4',pts:3,hint:''},{desc:'Giải thích điều kiện if x>4',kw:'#',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b1-1_3',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết ma trận tổng theo hàng/cột',desc:`<b>Đề bài:</b> Cho M=[[1,2,3],[4,5,6]]. Điền kết quả:<pre class="ex-code">print([sum(M[i]) for i in range(2)])    # ___
print([sum(M[i][j] for i in range(2)) for j in range(3)])  # ___</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Tổng hàng: [6,15]',kw:'[6, 15]',pts:4,hint:''},{desc:'Tổng cột: [5,7,9]',kw:'[5, 7, 9]',pts:4,hint:''},{desc:'Giải thích từng biểu thức',kw:'#',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b2-2_1',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B2 – Hiểu',num:'2.1',title:'Trace tìm phần tử lớn thứ 2',desc:`<b>Đề bài:</b> Trace từng bước và kết quả:<pre class="ex-code">A = [3,8,1,5,9,2]
A_sort = sorted(A, reverse=True)
print(A_sort[1])</pre><b>Output:</b> <code>8</code>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'A_sort=[9,8,5,3,2,1]',kw:'[9, 8',pts:3,hint:''},{desc:'A_sort[1]=8',kw:'8',pts:4,hint:''},{desc:'Giải thích reverse=True',kw:'#',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b2-2_2',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích xử lý mảng điều kiện',desc:`<b>Đề bài:</b> Giải thích output và viết lại không dùng LC:<pre class="ex-code">A = [10,20,5,30,15,25]
B = [x for x in A if 10 <= x <= 25]
print(sum(B), len(B))</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'B=[10,20,15,25], sum=70',kw:'70',pts:3,hint:''},{desc:'len(B)=4',kw:'4',pts:3,hint:''},{desc:'Viết lại dùng for+if',kw:'for x in A',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b2-2_3',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B2 – Hiểu',num:'2.3',title:'Hiểu xử lý mảng 2D theo điều kiện',desc:`<b>Đề bài:</b> Dự đoán output rồi chạy kiểm tra:<pre class="ex-code">M = [[1,2,3],[4,5,6],[7,8,9]]
B = [M[i][j] for i in range(3) for j in range(3) if (i+j)%2==0]
print(B)</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'B=[1,3,5,7,9]',kw:'[1, 3',pts:4,hint:''},{desc:'Giải thích điều kiện (i+j)%2==0',kw:'#',pts:3,hint:''},{desc:'Tổng B = 25',kw:'25',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b3-3_1',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B3 – Áp dụng',num:'3.1',title:'Tách mảng thành 2 mảng con',desc:`<b>Đề bài:</b> Nhập mảng n phần tử. Tách thành 2 mảng: số dương và số âm (bỏ số 0). In cả hai.<br><b>Input:</b><pre class="ex-code">7
3 -1 0 5 -2 0 4</pre><b>Output:</b><pre class="ex-code">Dương: [3, 5, 4]
Âm: [-1, -2]</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Lọc dương x>0',kw:'[x for x in A if x > 0]',pts:4,hint:''},{desc:'Lọc âm x<0',kw:'[x for x in A if x < 0]',pts:4,hint:''},{desc:'In đúng 2 mảng',kw:'print',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b3-3_2',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B3 – Áp dụng',num:'3.2',title:'Tính điểm trung bình cột ma trận',desc:`<b>Đề bài:</b> Nhập ma trận điểm n HS × m môn. Tính điểm TB từng môn (theo cột). In môn có điểm TB cao nhất.<br><b>Input:</b><pre class="ex-code">3 3
8 7 9
6 8 7
7 6 8</pre><b>Output:</b><pre class="ex-code">TB môn 1: 7.00  TB môn 2: 7.00  TB môn 3: 8.00
Môn cao nhất: Môn 3 (8.00)</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập ma trận n×m',kw:'M[i][j]',pts:2,hint:''},{desc:'Tính TB từng cột',kw:'sum(M[i][j]',pts:4,hint:''},{desc:'Tìm cột có TB cao nhất',kw:'max(tb_cot)',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b3-3_3',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B3 – Áp dụng',num:'3.3',title:'Xoay ma trận 90 độ',desc:`<b>Đề bài:</b> Nhập ma trận vuông n×n. In ma trận sau khi xoay 90 độ theo chiều kim đồng hồ.<br>Công thức: <code>R[j][n-1-i] = M[i][j]</code><br><b>Input:</b><pre class="ex-code">3
1 2 3
4 5 6
7 8 9</pre><b>Output:</b><pre class="ex-code">7 4 1
8 5 2
9 6 3</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập ma trận n×n',kw:'for i in range(n)',pts:2,hint:''},{desc:'Áp dụng công thức R[j][n-1-i]',kw:'R[j][n-1-i]',pts:5,hint:''},{desc:'In kết quả đúng',kw:'print(*R[i])',pts:3,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b4-4_1',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B4 – Phân tích',num:'4.1',title:'Debug lọc mảng sai điều kiện',desc:`<b>Đề bài:</b> Code lọc số trong [5,10] bị sai. Tìm lỗi và sửa:<pre class="ex-code">A = [3,7,12,5,9,15,8]
B = [x for x in A if x > 5 and x < 10]  # Lỗi
print(B)  # Mong đợi: [7,5,9,8]</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Lỗi: 5 và 10 bị loại',kw:'5 <= x <= 10',pts:5,hint:''},{desc:'Sửa đúng: 5<=x<=10',kw:'5 <= x',pts:3,hint:''},{desc:'B=[7,5,9,8] đúng',kw:'[7, 5',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b4-4_2',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích tổng ma trận sai',desc:`<b>Đề bài:</b> Code tính tổng đường chéo chính bị sai. Tìm và sửa:<pre class="ex-code">M = [[1,2,3],[4,5,6],[7,8,9]]
tong_cheo = sum(M[i][i] for i in range(3))
print(tong_cheo)  # Đúng: 15</pre>Thêm tính tổng đường chéo phụ (M[i][n-1-i]).`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Giải thích code đúng cho chéo chính',kw:'M[i][i]',pts:3,hint:''},{desc:'Tổng chéo chính = 15',kw:'15',pts:3,hint:''},{desc:'Thêm chéo phụ: M[i][n-1-i]',kw:'M[i][n-1-i]',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b4-4_3',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu mảng dùng list comprehension',desc:`<b>Đề bài:</b> Refactor code sau dùng list comprehension (mỗi đoạn ≤1 dòng):<pre class="ex-code">## Đoạn 1: lọc và bình phương
B = []
for x in A:
    if x > 0: B.append(x**2)
## Đoạn 2: flatten ma trận
C = []
for hang in M:
    for x in hang: C.append(x)</pre>`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'LC đoạn 1: [x**2 for x in A if x>0]',kw:'[x**2',pts:4,hint:''},{desc:'LC đoạn 2: [x for row in M for x in row]',kw:'for row in M',pts:4,hint:''},{desc:'Cả 2 cách cho kết quả giống nhau',kw:'assert',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b5-5_1',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh sort() vs sorted()',desc:`<b>Đề bài:</b> So sánh <code>A.sort()</code> và <code>sorted(A)</code> về: thay đổi mảng gốc, trả giá trị, khi nào dùng cái nào.<br>Kiểm tra với A=[5,3,8,1]: sau gọi mỗi cách, A có thay đổi không?`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'sort() thay đổi A tại chỗ',kw:'A.sort()',pts:3,hint:''},{desc:'sorted(A) trả list mới, A không đổi',kw:'sorted',pts:3,hint:''},{desc:'Kết luận khi nào dùng mỗi cách',kw:'#',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b5-5_2',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá phương pháp tìm median',desc:`<b>Đề bài:</b> Tính median (số ở giữa) theo 3 cách. So sánh độ phức tạp:<br>1. Sort + lấy giữa: O(n log n)<br>2. QuickSelect: O(n) trung bình<br>3. Dùng statistics.median<br>Kiểm tra cùng kết quả với A=[5,3,8,1,9,2,7].`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Cách 1: sort đúng',kw:'sorted(A)[n//2]',pts:3,hint:''},{desc:'Cách 3: statistics.median',kw:'import statistics',pts:3,hint:''},{desc:'Cả 3 cùng kết quả',kw:'assert',pts:4,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b5-5_3',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn thuật toán xử lý mảng lớn',desc:`<b>Đề bài:</b> Với mảng 1 triệu phần tử, so sánh thời gian: (1) đếm dương bằng for+if, (2) bằng sum+generator, (3) bằng numpy (nếu có). Kết luận nên dùng cách nào.`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Cách 1: for+if',kw:'for x in A',pts:2,hint:''},{desc:'Cách 2: sum(generator)',kw:'sum(1 for x',pts:3,hint:''},{desc:'Đo thời gian bằng time',kw:'time.time',pts:3,hint:''},{desc:'Kết luận có căn cứ số liệu',kw:'#',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b6-6_1',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B6 – Sáng tạo',num:'6.1',title:'Hệ thống quản lý học sinh K11',desc:`<b>Đề bài:</b> Thiết kế hệ thống nhập/xuất/thống kê điểm 30 HS × 5 môn. Tính TB, xếp hạng, tìm HS có điểm cao nhất mỗi môn, in báo cáo đẹp.`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập ma trận 30×5 điểm',kw:'for i in range',pts:2,hint:''},{desc:'Tính TB và xếp hạng',kw:'tinh_dtb',pts:3,hint:''},{desc:'Tìm HS cao nhất từng môn',kw:'max',pts:3,hint:''},{desc:'In báo cáo đẹp',kw:'print',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b6-6_2',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B6 – Sáng tạo',num:'6.2',title:'Phân tích dữ liệu cảm biến nhiệt độ',desc:`<b>Đề bài:</b> Nhập mảng nhiệt độ 30 ngày × 24 giờ (ma trận 30×24). Tính: nhiệt độ TB ngày, cao nhất/thấp nhất mỗi ngày, ngày nóng nhất, biểu đồ ASCII theo ngày.`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập ma trận 30×24',kw:'for i in range(30)',pts:2,hint:''},{desc:'TB/max/min từng ngày',kw:'sum(M[i])/24',pts:3,hint:''},{desc:'Tìm ngày nóng nhất',kw:'max(tb_ngay)',pts:3,hint:''},{desc:'In biểu đồ ASCII',kw:'* ',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-18-b6-6_3',g:'K11',ch:'Bài 18: TH dữ liệu mảng',lv:'B6 – Sáng tạo',num:'6.3',title:'Mô phỏng trò chơi Tic-Tac-Toe',desc:`<b>Đề bài:</b> Thiết kế game Tic-Tac-Toe (Caro 3×3) cho 2 người chơi. Kiểm tra thắng/thua/hòa. Hiển thị bảng sau mỗi nước đi.`,theory:`<b>Thực hành xử lý mảng 1&2 chiều</b><pre class="ex-code">## Tổng, đếm, lọc:
tong = sum(A)
tong_duong = sum(x for x in A if x > 0)
dem_chan = sum(1 for x in A if x % 2 == 0)
loc_duong = [x for x in A if x > 0]

## Ma trận – tổng theo hàng/cột:
tong_hang = [sum(M[i]) for i in range(n)]
tong_cot  = [sum(M[i][j] for i in range(n)) for j in range(m)]</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Bảng 3×3 dùng list 2D',kw:'board = [[',pts:2,hint:''},{desc:'Kiểm tra thắng: hàng, cột, chéo',kw:'for i in range(3)',pts:3,hint:''},{desc:'Vòng while cho phép chơi nhiều lượt',kw:'while',pts:3,hint:''},{desc:'Hiển thị bảng đẹp',kw:'print',pts:2,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
/* Bài 19: Bài toán tìm kiếm */
{id:'k11-19-b1-1_1',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B1 – Nhận biết',num:'1.1',title:'Trace LinearSearch',desc:`<b>Đề bài:</b> Trace LinearSearch(A, K=7) với A=[5,3,8,1,7,9,2]. Ghi bảng i và A[i] từng bước:<br><b>Output:</b> <code>4</code> (vị trí của 7)`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'i=0: A[0]=5≠7',kw:'5',pts:2,hint:''},{desc:'i=4: A[4]=7=K, return 4',kw:'4',pts:5,hint:''},{desc:'Giải thích return -1 khi không tìm thấy',kw:'-1',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b1-1_2',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B1 – Nhận biết',num:'1.2',title:'Trace BinarySearch',desc:`<b>Đề bài:</b> Trace BinarySearch(A, K=7) với A=[1,3,5,7,9,11,13]. Ghi lo, hi, mid từng bước:<br><b>Bước 1:</b> lo=0, hi=6, mid=3, A[3]=7 → <b>Tìm thấy tại 3</b>`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'lo=0, hi=6, mid=3',kw:'mid=3',pts:3,hint:''},{desc:'A[mid]=7=K, return 3',kw:'return 3',pts:4,hint:''},{desc:'Giải thích tại sao chỉ 1 bước',kw:'#',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b1-1_3',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết điều kiện BinarySearch',desc:`<b>Đề bài:</b> Câu nào SAI về BinarySearch?<br>A) Cần mảng đã sắp xếp<br>B) O(log n)<br>C) Luôn tốt hơn LinearSearch<br>D) Có thể dùng trên mảng chưa sắp xếp<br>Giải thích từng câu.`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'C sai: BinarySearch cần sắp xếp trước',kw:'#',pts:4,hint:''},{desc:'D sai: không dùng được',kw:'#',pts:3,hint:''},{desc:'A và B đúng',kw:'O(log n)',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b2-2_1',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B2 – Hiểu',num:'2.1',title:'Dự đoán kết quả tìm kiếm',desc:`<b>Đề bài:</b> Dự đoán và chạy kiểm tra:<pre class="ex-code">A = [2,5,8,12,16,23,38,56,72,91]
print(BinarySearch(A, 23))   # ___
print(BinarySearch(A, 100))  # ___
print(LinearSearch(A, 56))   # ___</pre>`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'BinarySearch(A,23)=5',kw:'5',pts:3,hint:''},{desc:'BinarySearch(A,100)=-1',kw:'-1',pts:3,hint:''},{desc:'LinearSearch(A,56)=7',kw:'7',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b2-2_2',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích số bước tìm kiếm',desc:`<b>Đề bài:</b> Tại sao BinarySearch luôn tìm thấy trong tối đa ⌈log₂(n+1)⌉ bước?<br>Minh họa với n=15: tối đa 4 bước. Vẽ cây quyết định.`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'n=15: log₂(16)=4 bước',kw:'4',pts:4,hint:''},{desc:'Giải thích mỗi bước loại ½ phần tử',kw:'#',pts:3,hint:''},{desc:'Vẽ hoặc mô tả cây tìm kiếm',kw:'#',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b2-2_3',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B2 – Hiểu',num:'2.3',title:'So sánh 2 thuật toán tìm kiếm',desc:`<b>Đề bài:</b> Với A=[1..100], so sánh số bước tìm K=99 (gần cuối) bằng Linear và Binary:<pre class="ex-code">## LinearSearch: i duyệt từ 0 đến 98 → 99 bước
## BinarySearch: lo,hi,mid... → ? bước</pre>`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'LinearSearch=99 bước',kw:'99',pts:3,hint:''},{desc:'BinarySearch=7 bước (log₂100≈7)',kw:'7',pts:4,hint:''},{desc:'Kết luận khi nào dùng mỗi loại',kw:'#',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b3-3_1',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B3 – Áp dụng',num:'3.1',title:'Cài đặt LinearSearch trả tất cả vị trí',desc:`<b>Đề bài:</b> Cài đặt LinearSearch trả về LIST tất cả vị trí xuất hiện (không chỉ vị trí đầu).<br><b>Input:</b> A=[3,1,4,1,5,1], K=1<br><b>Output:</b> <code>[1, 3, 5]</code>`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Dùng list để lưu tất cả vị trí',kw:'vi_tri = []',pts:3,hint:''},{desc:'Duyệt hết mảng không return sớm',kw:'for i in range(len',pts:4,hint:''},{desc:'Trả về list đúng [1,3,5]',kw:'return vi_tri',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b3-3_2',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B3 – Áp dụng',num:'3.2',title:'Cài đặt BinarySearch tìm vị trí chèn',desc:`<b>Đề bài:</b> Cài đặt <code>BinarySearchInsert(A, K)</code>: trả vị trí mà K nên được chèn vào để mảng vẫn tăng dần.<br><b>Ví dụ:</b> A=[1,3,5,7,9], K=4 → vị trí 2 (chèn giữa 3 và 5)`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Vòng while lo <= hi',kw:'while lo <= hi',pts:3,hint:''},{desc:'Cập nhật lo/hi đúng',kw:'lo = mid + 1',pts:3,hint:''},{desc:'Trả về lo sau khi kết thúc',kw:'return lo',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b3-3_3',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B3 – Áp dụng',num:'3.3',title:'Tìm kiếm trong mảng 2D',desc:`<b>Đề bài:</b> Nhập ma trận n×m và giá trị K. Tìm và in tất cả vị trí (i,j) có A[i][j]==K.<br><b>Input:</b><pre class="ex-code">3 3
1 2 3
4 2 6
7 8 2
2</pre><b>Output:</b><pre class="ex-code">(0,1) (1,1) (2,2)</pre>`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập ma trận n×m',kw:'for i in range',pts:2,hint:''},{desc:'Duyệt 2 vòng lặp lồng',kw:'for i in range(n)',pts:3,hint:''},{desc:'In đúng tất cả (i,j) tìm thấy',kw:'print(f"({i},{j})"',pts:5,hint:''}],errors:['Chỉ số bắt đầu từ 0','IndexError ngoài phạm vi','Nhầm .append() với +=']},
{id:'k11-19-b4-4_1',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B4 – Phân tích',num:'4.1',title:'Debug BinarySearch sai điều kiện',desc:`<b>Đề bài:</b> BinarySearch sau không tìm phần tử đầu/cuối. Tìm 2 lỗi:<pre class="ex-code">def BinSearch(A, K):
    lo, hi = 0, len(A)     # Lỗi 1
    while lo < hi:          # Lỗi 2
        mid = (lo+hi)//2
        if A[mid]==K: return mid
        elif A[mid]<K: lo=mid+1
        else: hi=mid-1</pre>`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Lỗi 1: hi = len(A)-1',kw:'len(A) - 1',pts:4,hint:''},{desc:'Lỗi 2: while lo <= hi',kw:'lo <= hi',pts:4,hint:''},{desc:'Test với phần tử đầu và cuối',kw:'assert',pts:2,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b4-4_2',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích LinearSearch tìm tất cả',desc:`<b>Đề bài:</b> Tại sao LinearSearch sau chỉ tìm được 1 vị trí? Sửa để tìm tất cả:<pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K:
            return i    # return ngay lập tức!
    return -1</pre>`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Giải thích return dừng vòng lặp',kw:'#',pts:3,hint:''},{desc:'Sửa: dùng list, không return sớm',kw:'vi_tri = []',pts:4,hint:''},{desc:'Test A=[1,2,1,3,1], K=1 → [0,2,4]',kw:'[0, 2, 4]',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b4-4_3',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu tìm kiếm cho mảng sắp xếp cục bộ',desc:`<b>Đề bài:</b> Với mảng đã sắp xếp theo cụm (giá trị trùng liên tiếp nhau), tối ưu hóa tìm tất cả vị trí của K dùng BinarySearch để tìm lần đầu, sau đó mở rộng.`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'BinarySearch tìm 1 vị trí đầu',kw:'BinarySearch',pts:3,hint:''},{desc:'Mở rộng trái: while A[i-1]==K',kw:'while i > 0',pts:3,hint:''},{desc:'Mở rộng phải: while A[i+1]==K',kw:'while i < n-1',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b5-5_1',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh Linear vs Binary với nhiều n',desc:`<b>Đề bài:</b> Tạo bảng so sánh số bước với n = 10, 100, 1000, 10000, 100000:<br>• LinearSearch (worst case): n bước<br>• BinarySearch: ⌈log₂n⌉ bước`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Tính đúng n bước linear',kw:'n',pts:2,hint:''},{desc:'Tính đúng log₂n bước binary',kw:'import math',pts:3,hint:''},{desc:'In bảng so sánh đẹp',kw:'print',pts:5,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b5-5_2',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá khi nào Binary tốt hơn Linear',desc:`<b>Đề bài:</b> Đánh giá: nếu phải sắp xếp trước (O(n log n)) rồi mới BinarySearch (O(log n)) thì tổng là O(n log n). Có tốt hơn LinearSearch (O(n)) khi tìm 1 lần không?<br>Kết luận: nếu tìm k lần thì đáng sắp xếp khi k > n/log(n).`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Tính tổng chi phí Sort+Binary',kw:'#',pts:4,hint:''},{desc:'So sánh với k lần LinearSearch',kw:'k * n',pts:3,hint:''},{desc:'Kết luận đúng về ngưỡng k',kw:'#',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b5-5_3',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B5 – Đánh giá',num:'5.3',title:'Tìm kiếm xâu trong văn bản',desc:`<b>Đề bài:</b> So sánh 2 cách tìm từ trong đoạn văn 1000 từ: (1) dùng LinearSearch duyệt list, (2) dùng "in" operator của Python. Đo thời gian với 100 lần tìm.`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Cách 1: LinearSearch tự cài',kw:'for w in words',pts:3,hint:''},{desc:'Cách 2: from in list',kw:'tu in words',pts:3,hint:''},{desc:'Đo và so sánh thời gian',kw:'time.time',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b6-6_1',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B6 – Sáng tạo',num:'6.1',title:'Hệ thống tìm kiếm học sinh',desc:`<b>Đề bài:</b> Nhập danh sách 20 HS (tên, MSHS, điểm TB). Cho phép tìm theo: tên (LinearSearch), MSHS (BinarySearch sau khi sort). In kết quả tìm kiếm đẹp.`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập 20 HS',kw:'for i in range(20)',pts:2,hint:''},{desc:'LinearSearch theo tên',kw:'LinearSearch',pts:3,hint:''},{desc:'Sort và BinarySearch theo MSHS',kw:'sorted',pts:3,hint:''},{desc:'Giao diện tìm kiếm vòng lặp',kw:'while',pts:2,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b6-6_2',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B6 – Sáng tạo',num:'6.2',title:'Hệ thống điện thoại tìm kiếm danh bạ',desc:`<b>Đề bài:</b> Thiết kế danh bạ điện thoại: thêm/xóa liên lạc, tìm theo tên (có gợi ý khi gõ thiếu), tìm theo số điện thoại, xuất danh sách đã sắp xếp.`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Thêm/xóa liên lạc',kw:'append',pts:2,hint:''},{desc:'Tìm gần đúng theo tên',kw:'if ten in lc["ten"]',pts:3,hint:''},{desc:'Sort danh bạ theo tên',kw:'sorted',pts:3,hint:''},{desc:'Giao diện menu vòng while',kw:'while True',pts:2,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-19-b6-6_3',g:'K11',ch:'Bài 19: Bài toán tìm kiếm',lv:'B6 – Sáng tạo',num:'6.3',title:'Mô phỏng công cụ tìm kiếm mini',desc:`<b>Đề bài:</b> Nhập 50 câu văn bản. Cho phép tìm kiếm từ khóa và trả về tất cả câu chứa từ khóa đó (không phân biệt hoa/thường). Xếp kết quả theo độ liên quan (số lần xuất hiện từ khóa).`,theory:`<b>LinearSearch – O(n)</b><pre class="ex-code">def LinearSearch(A, K):
    for i in range(len(A)):
        if A[i] == K: return i
    return -1</pre>
<b>BinarySearch – O(log n) – mảng PHẢI sắp xếp</b><pre class="ex-code">def BinarySearch(A, K):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if   A[mid] == K: return mid
        elif A[mid] <  K: lo = mid + 1
        else:             hi = mid - 1
    return -1</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập 50 câu',kw:'for i in range(50)',pts:2,hint:''},{desc:'Tìm kiếm không phân biệt hoa/thường',kw:'lower()',pts:3,hint:''},{desc:'Đếm số lần xuất hiện',kw:'count(tu_khoa)',pts:3,hint:''},{desc:'Sắp xếp theo độ liên quan',kw:'sorted',pts:2,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
/* Bài 20: TH tìm kiếm */
{id:'k11-20-b1-1_1',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B1 – Nhận biết',num:'1.1',title:'Trace LinearSearch',desc:`<b>Đề bài:</b> Điền kết quả:<pre class="ex-code">A = [15,3,8,1,12,9,7]
print(LinearSearch(A, 8))   # ___
print(LinearSearch(A, 10))  # ___</pre>`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'LinearSearch(A,8)=2',kw:'2',pts:5,hint:''},{desc:'LinearSearch(A,10)=-1',kw:'-1',pts:5,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b1-1_2',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B1 – Nhận biết',num:'1.2',title:'Trace BinarySearch bước bước',desc:`<b>Đề bài:</b> Trace BinarySearch(A, 9) với A=[1,3,5,7,9,11]. Điền bảng:<br>Bước 1: lo=0, hi=5, mid=2, A[2]=5 < 9 → lo=3<br>Bước 2: lo=3, hi=5, mid=4, A[4]=9 → tìm thấy!`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'Bước 1 đúng: lo→3',kw:'lo = 3',pts:3,hint:''},{desc:'Bước 2 đúng: mid=4, return 4',kw:'return 4',pts:4,hint:''},{desc:'Kết quả: vị trí 4',kw:'4',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b1-1_3',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết test case tìm kiếm',desc:`<b>Đề bài:</b> Điền expected output cho các test case BinarySearch:<pre class="ex-code">A = [2,4,6,8,10]
print(BinarySearch(A, 2))   # phần tử đầu → ___
print(BinarySearch(A, 10))  # phần tử cuối → ___
print(BinarySearch(A, 6))   # phần tử giữa → ___
print(BinarySearch(A, 5))   # không có → ___</pre>`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'BinarySearch(A,2)=0',kw:'0',pts:3,hint:''},{desc:'BinarySearch(A,10)=4',kw:'4',pts:3,hint:''},{desc:'BinarySearch(A,6)=2, A,5=-1',kw:'2',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b2-2_1',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B2 – Hiểu',num:'2.1',title:'So sánh 2 cài đặt LinearSearch',desc:`<b>Đề bài:</b> So sánh và giải thích sự khác biệt:<pre class="ex-code">## Phiên bản 1:
for i in range(len(A)):
    if A[i] == K: return i
return -1

## Phiên bản 2:
try:
    return A.index(K)
except ValueError:
    return -1</pre>`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Phiên bản 2 ngắn gọn hơn',kw:'A.index(K)',pts:3,hint:''},{desc:'Cả 2 cho cùng kết quả',kw:'assert',pts:3,hint:''},{desc:'Giải thích khi nào dùng mỗi cách',kw:'#',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b2-2_2',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B2 – Hiểu',num:'2.2',title:'Giải thích tại sao BinarySearch cần sắp xếp',desc:`<b>Đề bài:</b> Chạy BinarySearch(A, 5) với A=[5,3,8,1,9] (chưa sắp xếp) và A_sorted=[1,3,5,8,9]. Giải thích tại sao kết quả khác nhau.`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'BinarySearch mảng chưa sort → sai',kw:'#',pts:4,hint:''},{desc:'Giải thích logic mid mất hiệu lực',kw:'#',pts:3,hint:''},{desc:'Phải sort trước: A_sorted',kw:'sorted(A)',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b2-2_3',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B2 – Hiểu',num:'2.3',title:'Dự đoán hiệu suất',desc:`<b>Đề bài:</b> Cho n=1024. Dự đoán và tính:<br>• LinearSearch worst case: ___  bước<br>• BinarySearch worst case: ___ bước (log₂1024=10)<br>• Binary nhanh hơn: ___ lần`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Linear=1024 bước',kw:'1024',pts:3,hint:''},{desc:'Binary=10 bước (log₂1024)',kw:'10',pts:4,hint:''},{desc:'Nhanh hơn 102.4 lần',kw:'102',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b3-3_1',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B3 – Áp dụng',num:'3.1',title:'Kiểm thử LinearSearch',desc:`<b>Đề bài:</b> Viết bộ test 5 case cho LinearSearch, dùng assert:<br>• phần tử đầu, giữa, cuối<br>• phần tử không có<br>• mảng 1 phần tử`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Test phần tử đầu/giữa/cuối',kw:'LinearSearch',pts:3,hint:''},{desc:'Test không tìm thấy: -1',kw:'== -1',pts:3,hint:''},{desc:'Test mảng 1 phần tử',kw:'[K]',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b3-3_2',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B3 – Áp dụng',num:'3.2',title:'Kiểm thử BinarySearch đầy đủ',desc:`<b>Đề bài:</b> Viết bộ test cho BinarySearch:<br>• Mảng lẻ, chẵn phần tử<br>• Tìm phần tử đầu/cuối/giữa<br>• Không tìm thấy, mảng 1 và 2 phần tử<br>• Phần tử trùng nhau`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Test mảng lẻ và chẵn',kw:'assert',pts:2,hint:''},{desc:'Test phần tử đầu/cuối',kw:'BinarySearch',pts:3,hint:''},{desc:'Test mảng 1 phần tử và 2 phần tử',kw:'[5]',pts:5,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b3-3_3',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B3 – Áp dụng',num:'3.3',title:'So sánh và đo thời gian thực tế',desc:`<b>Đề bài:</b> Tạo mảng n=100000. Đo thời gian tìm phần tử CUỐI bằng cả 2 thuật toán. In bảng so sánh rõ ràng.`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Tạo mảng và sắp xếp',kw:'list(range',pts:2,hint:''},{desc:'Đo thời gian Linear và Binary',kw:'time.perf_counter',pts:4,hint:''},{desc:'In bảng so sánh đẹp',kw:'print',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b4-4_1',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B4 – Phân tích',num:'4.1',title:'Debug test case sai',desc:`<b>Đề bài:</b> Các assert sau có assert nào sai không? Tìm và giải thích:<pre class="ex-code">A = [1,3,5,7,9]
assert BinarySearch(A, 1)  == 0  # ___
assert BinarySearch(A, 9)  == 4  # ___
assert BinarySearch(A, 6)  == -1 # ___
assert BinarySearch(A, 5)  == 3  # ___</pre>`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Assert 4 sai: A[2]=5, phải là 2',kw:'== 2',pts:4,hint:''},{desc:'Các assert khác đúng',kw:'0, 4, -1',pts:3,hint:''},{desc:'Giải thích lỗi chỉ số',kw:'#',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b4-4_2',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích BinarySearch sai lo/hi',desc:`<b>Đề bài:</b> Code sau vòng lặp vô tận với một số input. Tìm lỗi:<pre class="ex-code">def BinSearch(A, K):
    lo, hi = 0, len(A)-1
    while lo <= hi:
        mid = (lo+hi)//2
        if A[mid]==K: return mid
        elif A[mid]<K: lo=mid    # Lỗi!
        else: hi=mid              # Lỗi!</pre>`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Lỗi: lo=mid phải là lo=mid+1',kw:'lo = mid + 1',pts:4,hint:''},{desc:'Lỗi: hi=mid phải là hi=mid-1',kw:'hi = mid - 1',pts:4,hint:''},{desc:'Giải thích tại sao gây vòng lặp vô tận',kw:'#',pts:2,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b4-4_3',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu tìm kiếm mảng 2D ma trận sắp xếp',desc:`<b>Đề bài:</b> Ma trận n×n mỗi hàng và cột đều tăng dần. Tìm K bắt đầu từ góc trên phải: nếu A[i][j]>K thì j--, nếu <K thì i++. O(n) thay vì O(n²).`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Bắt đầu từ A[0][n-1]',kw:'i, j = 0, n-1',pts:3,hint:''},{desc:'Điều kiện cập nhật i,j đúng',kw:'if M[i][j] > K: j -= 1',pts:4,hint:''},{desc:'O(n) đúng: max 2n bước',kw:'#',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b5-5_1',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B5 – Đánh giá',num:'5.1',title:'So sánh hiệu suất trên mảng khác nhau',desc:`<b>Đề bài:</b> Với 3 loại mảng: random, gần sắp xếp, đã sắp xếp – đo thời gian tìm 1000 phần tử ngẫu nhiên bằng Linear và Binary. Kết luận.`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Tạo 3 loại mảng',kw:'sorted',pts:2,hint:''},{desc:'Đo thời gian 1000 lần tìm',kw:'for _ in range(1000)',pts:4,hint:''},{desc:'Bảng so sánh và kết luận',kw:'print',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b5-5_2',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B5 – Đánh giá',num:'5.2',title:'Đánh giá A.index() vs BinarySearch',desc:`<b>Đề bài:</b> Python có hàm <code>A.index(K)</code>. So sánh với BinarySearch tự cài đặt về tốc độ (dùng time) và khi nào dùng mỗi cái.`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'So sánh thời gian cả 2',kw:'time.perf_counter',pts:4,hint:''},{desc:'A.index() là LinearSearch O(n)',kw:'O(n)',pts:3,hint:''},{desc:'Kết luận: binary tốt khi n lớn và đã sort',kw:'#',pts:3,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b5-5_3',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B5 – Đánh giá',num:'5.3',title:'Tìm kiếm tối ưu trong bài toán thực tế',desc:`<b>Đề bài:</b> Cơ sở dữ liệu 10000 học sinh (tên, MSHS, điểm). Thiết kế chiến lược tìm kiếm tốt nhất cho: tìm theo MSHS, tìm theo điểm trong [a,b], tìm theo tên gần đúng.`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'MSHS: sort + BinarySearch',kw:'BinarySearch',pts:3,hint:''},{desc:'Điểm [a,b]: BinarySearch 2 lần',kw:'BinarySearch',pts:3,hint:''},{desc:'Tên gần đúng: LinearSearch',kw:'LinearSearch',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b6-6_1',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B6 – Sáng tạo',num:'6.1',title:'Cài đặt tìm kiếm đa tiêu chí',desc:`<b>Đề bài:</b> Nhập 30 HS. Tìm kiếm theo: tên, điểm trong khoảng, xếp loại. Kết hợp cả 3 tiêu chí. In kết quả.`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập 30 HS',kw:'for i in range(30)',pts:2,hint:''},{desc:'Lọc theo từng tiêu chí',kw:'if',pts:3,hint:''},{desc:'Kết hợp điều kiện and',kw:'and',pts:3,hint:''},{desc:'In kết quả đẹp',kw:'print',pts:2,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b6-6_2',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B6 – Sáng tạo',num:'6.2',title:'Hệ thống gợi ý sản phẩm',desc:`<b>Đề bài:</b> Danh sách 50 sản phẩm (tên, giá, loại). Cho phép tìm theo tên (gần đúng), lọc theo giá, lọc theo loại. Sắp xếp kết quả theo giá tăng dần.`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Tìm tên gần đúng (in operator)',kw:'in san_pham["ten"]',pts:3,hint:''},{desc:'Lọc giá: a <= gia <= b',kw:'gia_min <= sp["gia"]',pts:3,hint:''},{desc:'Sắp xếp kết quả theo giá',kw:'sorted',pts:4,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
{id:'k11-20-b6-6_3',g:'K11',ch:'Bài 20: TH tìm kiếm',lv:'B6 – Sáng tạo',num:'6.3',title:'Tìm kiếm trong văn bản lớn',desc:`<b>Đề bài:</b> Nhập đoạn văn bản dài. Tìm tất cả vị trí xuất hiện của từ khóa (không phân biệt hoa/thường). Đếm tần suất từng từ trong văn bản.`,theory:`<b>Cài đặt và kiểm thử tìm kiếm</b><pre class="ex-code">## Test đầy đủ:
A = [1,3,5,7,9,11,13]  # mảng tăng dần

assert BinarySearch(A, 7)  == 3   # phần tử giữa
assert BinarySearch(A, 1)  == 0   # phần tử đầu
assert BinarySearch(A, 13) == 6   # phần tử cuối
assert BinarySearch(A, 6)  == -1  # không có
print("Tất cả test PASS!")</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Tách từ bằng split()',kw:'split()',pts:2,hint:''},{desc:'Tìm tất cả vị trí của từ khóa',kw:'for i, tu in enumerate',pts:3,hint:''},{desc:'Đếm tần suất bằng dict',kw:'{}',pts:3,hint:''},{desc:'In top-10 từ phổ biến nhất',kw:'sorted',pts:2,hint:''}],errors:['BinarySearch cần mảng SẮP XẾP','Sai: lo <= hi (không phải <)']},
/* Bài 21: Sắp xếp đơn giản */
{id:'k11-21-b1-1_1',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B1 – Nhận biết',num:'1.1',title:'Trace InsertionSort',desc:`<b>Đề bài:</b> Trace InsertionSort qua 3 bước đầu với A=[5,3,8,1,9]:<br>i=1: key=3, A=[3,5,8,1,9]<br>i=2: key=8, A=[3,5,8,1,9]<br>i=3: key=1, A=[1,3,5,8,9]<br>Điền bảng giá trị A sau mỗi bước.`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'i=1: A=[3,5,8,1,9]',kw:'[3, 5',pts:3,hint:''},{desc:'i=3: A=[1,3,5,8,9]',kw:'[1, 3',pts:4,hint:''},{desc:'Giải thích "chèn" key vào đúng chỗ',kw:'#',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b1-1_2',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B1 – Nhận biết',num:'1.2',title:'Trace SelectionSort',desc:`<b>Đề bài:</b> Trace SelectionSort qua 2 bước đầu với A=[5,3,8,1,9]:<br>i=0: min_j=3 (A[3]=1), hoán đổi → A=[1,3,8,5,9]<br>i=1: min_j=1 (A[1]=3), không đổi`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'i=0: hoán đổi A[0]↔A[3]',kw:'[1, 3',pts:3,hint:''},{desc:'i=1: không đổi (A[1] đã min)',kw:'A[1]',pts:3,hint:''},{desc:'Kết quả cuối [1,3,5,8,9]',kw:'[1, 3',pts:4,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b1-1_3',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B1 – Nhận biết',num:'1.3',title:'Nhận biết kết quả sắp xếp',desc:`<b>Đề bài:</b> Sau mỗi lần duyệt i của SelectionSort, điền trạng thái mảng:<pre class="ex-code">A = [4,2,7,1,5]
# Sau i=0: ___  (min=1 tại vị trí 3)
# Sau i=1: ___  (min=2 tại vị trí 1)
# Sau i=2: ___  (min=4 tại vị trí 0, đổi vị 2)</pre>`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B1
ĐỌC code, xác định biến
THEO DÕI giá trị, điền kết quả</pre>`,rb:[{desc:'i=0: [1,2,7,4,5]',kw:'[1, 2',pts:3,hint:''},{desc:'i=1: [1,2,7,4,5] (đã đúng)',kw:'[1, 2',pts:3,hint:''},{desc:'i=2: [1,2,4,7,5]',kw:'[1, 2, 4',pts:4,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b2-2_1',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B2 – Hiểu',num:'2.1',title:'Đếm số hoán đổi InsertionSort',desc:`<b>Đề bài:</b> Thêm biến đếm vào InsertionSort. Đếm số lần dịch chuyển với A=[5,3,8,1,9]:<pre class="ex-code">def InsertionSort_count(A):
    count = 0
    for i in range(1, len(A)):
        key = A[i]; j = i-1
        while j>=0 and A[j]>key:
            A[j+1]=A[j]; j-=1; count+=1
        A[j+1]=key
    return count</pre>`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Kết quả count=6',kw:'6',pts:4,hint:''},{desc:'Giải thích từng bước dịch chuyển',kw:'#',pts:3,hint:''},{desc:'Mảng tăng dần → count=0',kw:'0',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b2-2_2',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B2 – Hiểu',num:'2.2',title:'So sánh số hoán đổi 2 thuật toán',desc:`<b>Đề bài:</b> Với A=[9,8,7,6,5] (giảm dần = worst case): đếm số hoán đổi của InsertionSort (nhiều dịch chuyển) và SelectionSort (ít hoán đổi). Kết luận.`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Insertion dịch chuyển nhiều',kw:'count',pts:3,hint:''},{desc:'Selection hoán đổi n-1 lần',kw:'n-1',pts:4,hint:''},{desc:'Kết luận Selection ít hoán đổi hơn',kw:'#',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b2-2_3',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B2 – Hiểu',num:'2.3',title:'Giải thích sắp xếp giảm dần',desc:`<b>Đề bài:</b> Sửa InsertionSort để sắp xếp GIẢM dần (thay > thành <). Chạy với A=[5,3,8,1,9] → [9,8,5,3,1].`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B2
TRACE từng bước
DỰ ĐOÁN output trước khi chạy</pre>`,rb:[{desc:'Sửa điều kiện: A[j] < key',kw:'A[j] < key',pts:5,hint:''},{desc:'Output [9,8,5,3,1] đúng',kw:'[9, 8',pts:3,hint:''},{desc:'Giải thích logic thay đổi',kw:'#',pts:2,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b3-3_1',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B3 – Áp dụng',num:'3.1',title:'Sắp xếp điểm lớp học',desc:`<b>Đề bài:</b> Nhập n học sinh (tên, điểm). Dùng InsertionSort sắp xếp theo điểm giảm dần. In bảng xếp hạng.<br><b>Input:</b><pre class="ex-code">4
An 8.5
Bình 7.0
Cúc 9.0
Dung 6.5</pre><b>Output:</b><pre class="ex-code">1. Cúc - 9.0
2. An - 8.5
...</pre>`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập n cặp tên+điểm',kw:'input',pts:2,hint:''},{desc:'InsertionSort theo điểm giảm dần',kw:'key = ds[i]',pts:4,hint:''},{desc:'In bảng xếp hạng đúng',kw:'print',pts:4,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b3-3_2',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B3 – Áp dụng',num:'3.2',title:'Sắp xếp theo nhiều tiêu chí',desc:`<b>Đề bài:</b> Nhập n học sinh (tên, điểm, lớp). Sắp xếp: trước theo lớp tăng, sau theo điểm giảm.<br>Dùng <code>sorted(ds, key=lambda x: (x[2], -x[1]))</code>`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'Nhập n học sinh',kw:'input',pts:2,hint:''},{desc:'Sắp xếp đa tiêu chí với lambda',kw:'lambda x: (x[2]',pts:5,hint:''},{desc:'In đúng thứ tự',kw:'print',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b3-3_3',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B3 – Áp dụng',num:'3.3',title:'Kiểm tra mảng đã sắp xếp',desc:`<b>Đề bài:</b> Viết hàm <code>is_sorted(A)</code> trả True/False. Sau khi gọi InsertionSort, dùng is_sorted kiểm tra kết quả.<br>Viết thêm hàm <code>is_sorted_desc(A)</code> cho chiều giảm.`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B3
XÁC ĐỊNH Input / Output
NHẬP dữ liệu → XỬ LÝ → IN kết quả</pre>`,rb:[{desc:'is_sorted dùng all()',kw:'all(A[i]<=A[i+1]',pts:4,hint:''},{desc:'is_sorted_desc đúng',kw:'A[i]>=A[i+1]',pts:3,hint:''},{desc:'Kiểm tra sau sort',kw:'assert is_sorted',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b4-4_1',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B4 – Phân tích',num:'4.1',title:'Debug InsertionSort sai chỉ số',desc:`<b>Đề bài:</b> InsertionSort sau cho kết quả sai. Tìm 2 lỗi:<pre class="ex-code">def InsertionSort(A):
    for i in range(len(A)):   # Lỗi 1
        key = A[i]
        j = i
        while j > 0 and A[j] > key:  # Lỗi 2
            A[j] = A[j-1]
            j -= 1
        A[j] = key</pre>`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Lỗi 1: range phải bắt đầu từ 1',kw:'range(1,',pts:4,hint:''},{desc:'Lỗi 2: A[j] > key phải là A[j-1] > key',kw:'A[j-1]',pts:4,hint:''},{desc:'Test [5,3,8,1] → [1,3,5,8]',kw:'[1, 3',pts:2,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b4-4_2',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B4 – Phân tích',num:'4.2',title:'Phân tích SelectionSort sai min_j',desc:`<b>Đề bài:</b> Tìm lỗi trong SelectionSort:<pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)-1):  # OK
        min_j = 0             # Lỗi: phải là i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i],A[min_j] = A[min_j],A[i]</pre>`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Lỗi: min_j=0 phải là min_j=i',kw:'min_j = i',pts:5,hint:''},{desc:'Giải thích: so sánh sai phần đã sắp xếp',kw:'#',pts:3,hint:''},{desc:'Test sau sửa',kw:'[1, 2',pts:2,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b4-4_3',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B4 – Phân tích',num:'4.3',title:'Tối ưu InsertionSort dùng nhị phân',desc:`<b>Đề bài:</b> Tối ưu InsertionSort: dùng BinarySearch tìm vị trí chèn đúng (Binary Insertion Sort). Số so sánh giảm từ O(n²) xuống O(n log n) nhưng số dịch chuyển vẫn O(n²).`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B4
ĐỌC code lỗi → XÁC ĐỊNH → SỬA</pre>`,rb:[{desc:'Dùng BinarySearchInsert tìm vị trí',kw:'BinarySearchInsert',pts:4,hint:''},{desc:'Dịch chuyển phần tử sau đó chèn',kw:'A[j+1]=A[j]',pts:3,hint:''},{desc:'Giải thích tại sao vẫn O(n²)',kw:'#',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b5-5_1',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B5 – Đánh giá',num:'5.1',title:'Đo thời gian thực tế 2 thuật toán',desc:`<b>Đề bài:</b> Với n=1000 phần tử ngẫu nhiên, đo thời gian InsertionSort và SelectionSort. Chạy 3 lần, lấy TB. So sánh.`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Đo thời gian 3 lần mỗi thuật toán',kw:'time.perf_counter',pts:4,hint:''},{desc:'Tính trung bình',kw:'sum(t)/3',pts:3,hint:''},{desc:'So sánh và nhận xét',kw:'#',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b5-5_2',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B5 – Đánh giá',num:'5.2',title:'So sánh trên các loại mảng',desc:`<b>Đề bài:</b> Đo thời gian với: (1) mảng ngẫu nhiên, (2) mảng đã sort tăng, (3) mảng đã sort giảm. Kết luận Insertion tốt khi nào.`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'Test cả 2 algo × 3 loại mảng',kw:'InsertionSort',pts:3,hint:''},{desc:'Insertion nhanh hơn với mảng gần sort',kw:'#',pts:4,hint:''},{desc:'Selection ổn định hơn',kw:'#',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b5-5_3',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B5 – Đánh giá',num:'5.3',title:'Lựa chọn thuật toán theo tình huống',desc:`<b>Đề bài:</b> Cho 4 tình huống, chọn thuật toán phù hợp và giải thích:<br>• 10 phần tử ngẫu nhiên<br>• 1000 phần tử gần sắp xếp<br>• 1000000 phần tử hoàn toàn ngẫu nhiên<br>• Cần ít hoán đổi nhất`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B5
VIẾT 2+ cách → SO SÁNH → KẾT LUẬN</pre>`,rb:[{desc:'10 phần tử: cả hai ok',kw:'InsertionSort',pts:2,hint:''},{desc:'Gần sort: Insertion tốt hơn',kw:'#',pts:3,hint:''},{desc:'Lớn: cần O(n log n)',kw:'sorted()',pts:2,hint:''},{desc:'Ít hoán đổi: SelectionSort',kw:'SelectionSort',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b6-6_1',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B6 – Sáng tạo',num:'6.1',title:'Sắp xếp danh sách học sinh đa tiêu chí',desc:`<b>Đề bài:</b> Nhập 30 HS (tên, lớp, điểm TB, hạnh kiểm). Sắp xếp theo 3 tiêu chí: lớp → hạnh kiểm → điểm giảm. In bảng đẹp.`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Nhập 30 HS',kw:'for i in range(30)',pts:2,hint:''},{desc:'Sắp xếp đa tiêu chí',kw:'sorted',pts:3,hint:''},{desc:'In bảng có header và viền',kw:'╔',pts:3,hint:''},{desc:'Đánh số thứ tự',kw:'i+1',pts:2,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b6-6_2',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B6 – Sáng tạo',num:'6.2',title:'Thuật toán sắp xếp hình ảnh trực quan',desc:`<b>Đề bài:</b> Mô phỏng InsertionSort TRỰC QUAN: sau mỗi bước in mảng, dùng ký hiệu [x] để đánh dấu phần tử đang xét.<br><b>Ví dụ:</b> 5 [3] 8 1 → [3] 5 8 1`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'In mảng sau mỗi bước',kw:'print',pts:3,hint:''},{desc:'Đánh dấu key bằng [key]',kw:'f"[{key}]"',pts:4,hint:''},{desc:'Mô phỏng đúng InsertionSort',kw:'key',pts:3,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},
{id:'k11-21-b6-6_3',g:'K11',ch:'Bài 21: Sắp xếp đơn giản',lv:'B6 – Sáng tạo',num:'6.3',title:'So sánh sắp xếp Python built-in vs tự cài',desc:`<b>Đề bài:</b> So sánh tốc độ: InsertionSort tự cài vs Python sorted() với n=10000. Giải thích tại sao built-in nhanh hơn nhiều lần (TimSort O(n log n)).`,theory:`<b>InsertionSort</b><pre class="ex-code">def InsertionSort(A):
    for i in range(1, len(A)):
        key = A[i]; j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]; j -= 1
        A[j+1] = key
    return A
# Tốt khi mảng gần sắp xếp → O(n)</pre>
<b>SelectionSort</b><pre class="ex-code">def SelectionSort(A):
    for i in range(len(A)):
        min_j = i
        for j in range(i+1, len(A)):
            if A[j] < A[min_j]: min_j = j
        A[i], A[min_j] = A[min_j], A[i]
    return A
# Luôn O(n²), ít hoán đổi</pre>`,pseudo:`<pre class="ex-code">## B6
ĐỌC ĐỀ → LẬP KẾ HOẠCH → CODE → TEST</pre>`,rb:[{desc:'Đo thời gian cả 2',kw:'time.perf_counter',pts:3,hint:''},{desc:'Python sorted nhanh hơn nhiều',kw:'sorted()',pts:3,hint:''},{desc:'Giải thích TimSort và O(n log n)',kw:'#',pts:4,hint:''}],errors:['Nhầm gán = với hoán đổi a,b=b,a','Sai chỉ số vòng lặp']},

];

const EXERCISE_TESTS = {};