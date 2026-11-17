# Antrean Truk DSC Jatake 1601 — Web (Vercel)

Tampilan web (form vendor + portal petugas) di-hosting di **Vercel**.
Data tetap di **Google Sheets**, diproses oleh **Apps Script** (Kode.gs) sebagai API.

```
HP / laptop ──▶ Vercel (index.html, portal.html) ──POST {fn,args}──▶ Apps Script /exec ──▶ Google Sheets & Drive
```

| Alamat | Halaman |
| --- | --- |
| `/` | Form pendaftaran vendor |
| `/portal` | Pilih portal petugas |
| `/portal?p=security` · `?p=gdfg` · `?p=gdrm` · `?p=gdpm` · `?p=ppic` | Langsung ke portal |
| `/admin` | Portal admin |

## File

| File | Isi |
| --- | --- |
| `index.html` | Form vendor (hasil build dari Vendor.html) |
| `portal.html` | Portal petugas (hasil build dari Portal.html) |
| `config.js` | **Alamat API** = URL Aplikasi web Apps Script (berakhiran `/exec`) |
| `gas-shim.js` | Penghubung: meneruskan panggilan `google.script.run` ke API |
| `vercel.json` | Alamat rapi + header keamanan (anti-clickjacking, CSP, izin kamera) |
| `build.py` | Membuat ulang index.html & portal.html dari Vendor.html & Portal.html |

## Update tampilan
1. Ubah `Vendor.html` / `Portal.html` seperti biasa.
2. `python3 build.py <folder Vendor.html & Portal.html>`
3. Commit & push ke GitHub → Vercel otomatis deploy ulang (±1 menit).

## Update server (Kode.gs)
Tetap lewat Apps Script: Kelola deployment → pensil → **Versi baru** → Terapkan. URL `/exec` tidak berubah, `config.js` tidak perlu diubah.
