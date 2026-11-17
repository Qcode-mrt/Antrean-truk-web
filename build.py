"""Salin Vendor.html & Portal.html (versi Apps Script) menjadi index.html & portal.html untuk Vercel.
Pakai: python3 build.py <folder berisi Vendor.html & Portal.html>"""
import pathlib, sys

src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '..')
here = pathlib.Path(__file__).parent
SHIM = '<script src="/config.js"></script>\n<script src="/gas-shim.js"></script>\n'

def build(name, out, title):
    html = (src / name).read_text(encoding='utf-8')
    # Di Apps Script judul & viewport diisi doGet; di Vercel ditulis langsung
    head = (f'<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            f'<title>{title}</title>\n<meta name="robots" content="noindex, nofollow">\n' + SHIM)
    html = html.replace('<base target="_top">\n', '', 1).replace('<meta charset="utf-8">\n', '<meta charset="utf-8">\n' + head, 1)
    assert SHIM in html, f'{name}: <meta charset> tidak ditemukan'
    (here / out).write_text(html, encoding='utf-8')
    print('OK', out)

build('Vendor.html', 'index.html', 'Pendaftaran Antrean Truk')
build('Portal.html', 'portal.html', 'Portal Petugas · Antrean Truk')
