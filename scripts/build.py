#!/usr/bin/env python3
"""
scripts/build.py — CodeLab Production Build v2
Output: ./dist/ (deployed to gh-pages, KHÔNG có source code)
"""
import os, re, subprocess, shutil, sys
from pathlib import Path

ROOT     = Path(__file__).parent.parent
SRC_JS   = ROOT / 'js'
SRC_CSS  = ROOT / 'css'
DIST     = ROOT / 'dist'
DIST_JS  = DIST / 'js'
DIST_CSS = DIST / 'css'

TERSER = shutil.which('terser') or \
         shutil.which(os.path.expanduser('~/.npm-global/bin/terser'))
if not TERSER:
    print('ERROR: npm install -g terser', file=sys.stderr); sys.exit(1)

shutil.rmtree(DIST, ignore_errors=True)
DIST_JS.mkdir(parents=True); DIST_CSS.mkdir(parents=True)

def minify_js(path, ecma='2020'):
    r = subprocess.run(
        [TERSER, str(path),
         '--compress', 'passes=1,drop_debugger=true,pure_funcs=["console.log","console.info","console.debug"]',
         '--mangle', '--ecma', ecma],
        capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None

print('🔨 Building CodeLab v4...\n')

# ── Load order MUST match index.html ────────────────────────────
APP_FILES = [
    # Core
    'core/namespace.js', 'core/config.js', 'core/utils.js',
    'core/events.js', 'core/store.js',
    # Data
    'data/http.js', 'data/cache.js', 'data/queue.js',
    # Auth
    'auth/session.js', 'auth/auth.js',
    # Exercises
    'exercises/registry.js',
    # Graders
    'graders/python.js', 'graders/html.js', 'graders/sql.js',
    # Editors
    'editors/syntax/highlight.js',
    'editors/python.js', 'editors/html.js', 'editors/sql.js',
    # UI components
    'ui/dropdown.js', 'ui/toast.js', 'ui/results.js',
    # Features
    'features/anti-cheat.js', 'features/setup-wizard.js',
    'features/teacher/panel.js', 'features/teacher/scores.js',
    'features/teacher/violations.js', 'features/teacher/history.js',
    'features/teacher/exams.js', 'features/teacher/exercises.js',
    'features/teacher/config.js',
    'features/mode-manager.js',
    'features/exam-mode.js',
    'features/profile.js',
    'features/admin/users.js',
    'features/teacher/analytics.js',
    # API + Bootstrap
    'api.js', 'app.js',
]

parts = []; ok = 0; fail = 0
for rel in APP_FILES:
    fp = SRC_JS / rel
    if not fp.exists(): print(f'  ⚠️  MISSING: {rel}'); continue
    out = minify_js(fp)
    if out: parts.append(out); ok += 1
    else:   parts.append(fp.read_text(encoding='utf-8')); fail += 1; print(f'  ⚠️  fallback: {rel}')

(DIST_JS / 'app.min.js').write_text('\n;'.join(parts), encoding='utf-8')
orig = sum((SRC_JS/r).stat().st_size for r in APP_FILES if (SRC_JS/r).exists())
built = (DIST_JS / 'app.min.js').stat().st_size
print(f'  ✅ app.min.js: {orig//1024}KB → {built//1024}KB ({100-built*100//orig}% smaller) | {ok} files')

# Exercise bundles
for bundle in ['exercises.js','exercises_k12.js','exercises_sql.js','interpreter.js']:
    src = SRC_JS / bundle; dst = DIST_JS / bundle
    if not src.exists(): continue
    r = subprocess.run([TERSER, str(src), '--compress', 'passes=1', '--mangle',
                        '--ecma', '2020', '--output', str(dst)], capture_output=True)
    if r.returncode != 0: shutil.copy(src, dst)
    print(f'  ✅ {bundle}: {src.stat().st_size//1024}KB → {dst.stat().st_size//1024}KB')

# CSS
css = (SRC_CSS / 'style.css').read_text(encoding='utf-8')
css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
css = re.sub(r'\s+', ' ', css)
for p, s in [(r'\s*{\s*','{'), (r'\s*}\s*','}'), (r'\s*:\s*',':'), (r'\s*;\s*',';'), (r'\s*,\s*',',')]:
    css = re.sub(p, s, css)
css = css.replace(';}', '}').strip()
(DIST_CSS / 'style.min.css').write_text(css, encoding='utf-8')
print(f'  ✅ style.min.css: {(SRC_CSS/"style.css").stat().st_size//1024}KB → {len(css)//1024}KB')

# index.html
html = (ROOT / 'index.html').read_text(encoding='utf-8')
html = re.sub(r'\s*<script src="js/[^"]*"></script>', '', html)
html = html.replace('href="css/style.css"', 'href="css/style.min.css"')
html = re.sub(r'<!--.*?-->', '', html, flags=re.DOTALL)
html = re.sub(r'\n{3,}', '\n\n', html).strip()
INJECT = '''\n  <script src="js/exercises.js"></script>
  <script src="js/exercises_k12.js"></script>
  <script src="js/exercises_sql.js"></script>
  <script src="js/interpreter.js"></script>
  <script src="js/app.min.js"></script>
  <script>!function(){document.addEventListener('contextmenu',e=>e.preventDefault());document.addEventListener('keydown',e=>{const k=e.key,c=e.ctrlKey||e.metaKey,s=e.shiftKey;if(c&&(k==='u'||k==='s'||k==='p'))e.preventDefault();if(k==='F12')e.preventDefault();if(c&&s&&(k==='I'||k==='J'||k==='C'))e.preventDefault()});setInterval(()=>{const w=window.outerWidth-window.innerWidth>200,h=window.outerHeight-window.innerHeight>200;if((w||h)&&!document._dvLocked){document._dvLocked=true;document.body.style.filter='blur(8px)'}else if(!w&&!h&&document._dvLocked){document._dvLocked=false;document.body.style.filter=''}},800)}();</script>\n'''
html = html.replace('</body>', INJECT + '</body>')
(DIST / 'index.html').write_text(html, encoding='utf-8')
print(f'  ✅ index.html: {(ROOT/"index.html").stat().st_size//1024}KB → {len(html)//1024}KB')

shutil.copy(ROOT / 'Code.gs', DIST / 'Code.gs')
(DIST / '.nojekyll').touch()
total = sum(f.stat().st_size for f in DIST.rglob('*') if f.is_file())
print(f'\n✅ Build complete! dist/: {total//1024}KB total')
