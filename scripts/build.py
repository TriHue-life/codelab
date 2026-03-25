#!/usr/bin/env python3
"""
scripts/build.py — CodeLab JS Bundle Builder
═══════════════════════════════════════════════════════════════
Đọc thứ tự script từ index.html và concat thành dist/bundle.js.
Chạy sau mỗi khi thêm/sửa JS file:

    python3 scripts/build.py
    # hoặc:
    python3 scripts/build.py --watch    (tự động rebuild khi file thay đổi)

Exercise files (js/exercises*.js) KHÔNG được bundle — lazy loaded.
═══════════════════════════════════════════════════════════════
"""

import os, re, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def build():
    html_path = os.path.join(ROOT, 'index.html')
    html = open(html_path, encoding='utf-8').read()

    # Find all <script src="..."> tags
    # Also support dev mode: index.dev.html with individual scripts
    scripts = re.findall(r'<script src="([^"]+)">', html)

    # Filter: skip bundle itself, skip exercise data files (lazy loaded)
    SKIP = {'dist/bundle.js', 'dist/bundle.min.js'}
    LAZY = {  # lazy-loaded exercise data - not bundled
        'js/exercises.js',
        'js/exercises_k12.js',
        'js/exercises_sql.js',
    }

    to_bundle = [s for s in scripts if s not in SKIP and s not in LAZY]

    # FIX: Nếu index.html đã ở "bundled mode" (chỉ có dist/bundle.js),
    # đọc danh sách module từ index.dev.html — source of truth cho build.
    CORE_MODULES = {'js/core/namespace.js', 'js/core/config.js', 'js/auth/auth.js', 'js/app.js'}
    already_bundled = 'dist/bundle.js' in scripts and not any(c in scripts for c in CORE_MODULES)

    if not to_bundle or already_bundled:
        dev_html_path = os.path.join(ROOT, 'index.dev.html')
        if os.path.exists(dev_html_path):
            dev_html = open(dev_html_path, encoding='utf-8').read()
            to_bundle = [s for s in re.findall(r'<script src="([^"]+)">', dev_html)
                         if s not in SKIP and s not in LAZY]
            if already_bundled:
                print("ℹ️  index.html ở bundled mode → đọc module list từ index.dev.html")
        else:
            print("⚠️  No scripts found. Run from project root or create index.dev.html")
            return

    # Build bundle
    parts = [
        f'/* CodeLab Bundle — built {time.strftime("%Y-%m-%d %H:%M")}\n'
        f' * {len(to_bundle)} modules bundled\n'
        f' * Exercise data lazy-loaded on grade selection\n'
        f' */\n'
    ]

    missing = []
    for script in to_bundle:
        path = os.path.join(ROOT, script)
        if not os.path.exists(path):
            missing.append(script)
            parts.append(f'\n// ⚠️ MISSING: {script}\n')
            continue
        code = open(path, encoding='utf-8').read()
        parts.append(f'\n// ─── {script} ───────────────────────────\n')
        parts.append(code)

    bundle = ''.join(parts)

    # Write
    dist_dir = os.path.join(ROOT, 'dist')
    os.makedirs(dist_dir, exist_ok=True)
    out_path = os.path.join(dist_dir, 'bundle.js')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(bundle)

    size_kb = os.path.getsize(out_path) // 1024
    lines = bundle.count('\n')
    print(f"✅ dist/bundle.js: {size_kb}KB, {lines:,} lines ({len(to_bundle)} modules)")
    if missing:
        print(f"⚠️  Missing files ({len(missing)}): {', '.join(missing)}")


def watch():
    print("👁  Watching for changes... (Ctrl+C to stop)")
    prev_mtimes = {}

    while True:
        changed = False
        for root, dirs, files in os.walk(os.path.join(ROOT, 'js')):
            # Skip exercise data files and node_modules
            dirs[:] = [d for d in dirs if d not in ('node_modules', 'dist')]
            for f in files:
                if not f.endswith('.js'): continue
                if f.startswith('exercises'): continue
                path = os.path.join(root, f)
                mtime = os.path.getmtime(path)
                if prev_mtimes.get(path) != mtime:
                    prev_mtimes[path] = mtime
                    if prev_mtimes:  # not first run
                        print(f"  Changed: {os.path.relpath(path, ROOT)}")
                        changed = True

        if changed:
            print(f"  Rebuilding bundle...")
            build()

        time.sleep(1)


if __name__ == '__main__':
    os.chdir(ROOT)
    if '--watch' in sys.argv or '-w' in sys.argv:
        build()
        watch()
    else:
        build()
