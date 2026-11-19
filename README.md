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
| `index.html` | Form vendor = isi **Vendor.html** apa adanya |
| `portal.html` | Portal petugas = isi **Portal.html** apa adanya |
| `vercel.json` | Alamat rapi + header keamanan (anti-clickjacking, CSP, izin kamera) |
| `build.py` | Membuat ulang index.html & portal.html dari Vendor.html & Portal.html |

## Update tampilan (tanpa alat apa pun)
File HTML di Apps Script dan di GitHub **isinya sama persis**, hanya beda nama:

| Apps Script | GitHub |
| --- | --- |
| Portal.html | portal.html |
| Vendor.html | index.html |

1. Apps Script: paste file baru → Simpan → Kelola deployment → pensil → **Versi baru**.
2. GitHub: buka `portal.html` (atau `index.html`) → ikon pensil → hapus semua → paste isi yang sama → **Commit changes**.
3. Vercel otomatis memperbarui web ±1 menit. Tidak perlu membuka Vercel.

## Pindah deployment Apps Script
Alamat API ada di baris `var DEPLOY_ID = '...'` di bagian atas **Portal.html** dan **Vendor.html**.
Ganti ID-nya di kedua file (lalu langkah update di atas).

## Update server (Kode.gs)
Tetap lewat Apps Script: Kelola deployment → pensil → **Versi baru** → Terapkan. URL `/exec` tidak berubah, file HTML tidak perlu diubah.
