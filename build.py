"""Salin file Apps Script ke repo Vercel (isinya sama persis, hanya ganti nama):
   Vendor.html → index.html, Portal.html → portal.html
Pakai: python3 build.py <folder berisi Vendor.html & Portal.html>
Tanpa Python: cukup copy-paste isi file di GitHub (lihat README)."""
import pathlib, shutil, sys

src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '..')
here = pathlib.Path(__file__).parent
for name, out in [('Vendor.html', 'index.html'), ('Portal.html', 'portal.html')]:
    html = (src / name).read_text(encoding='utf-8')
    assert 'DEPLOY_ID' in html, f'{name}: bukan versi yang sudah berisi penghubung Vercel'
    (here / out).write_text(html, encoding='utf-8')
    print('OK', out)
