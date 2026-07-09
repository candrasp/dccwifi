# Panduan Pengembangan (Development Guide)

Dokumen ini berisi panduan untuk menjalankan, mengembangkan, dan mem-build proyek DCCWIFI Landing Page di lingkungan lokal Anda.

## 🛠️ Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- NPM (bawaan dari Node.js)

## 💻 Menjalankan Server Pengembangan Lokal

1. **Instal dependensi proyek:**
   ```bash
   npm install
   ```
2. **Jalankan dev server:**
   ```bash
   npm run dev
   ```
3. Buka browser Anda dan akses alamat IP/port yang ditampilkan di terminal (secara default di-set pada port `3002`).

## ⚙️ Konfigurasi Vite (`vite.config.js`)
Konfigurasi dev server dapat diatur di [vite.config.js](file:///c:/laragon/www/dcc/vite.config.js):
- **Host & Port:** Port diatur statis ke `3002` untuk pengerjaan lokal multi-device.
- **Rollup Inputs:** Mendaftarkan file entry point (`index.html`, `privacy-policy.html`, `terms-conditions.html`) agar ikut ter-build ke folder `dist` saat rilis.

## 📦 Build untuk Produksi
Gunakan perintah berikut untuk melakukan kompilasi aset menjadi siap pakai di production:
```bash
npm run build
```
Hasil build berupa file statis HTML, CSS, dan JS yang sudah di-minify akan berada di folder `dist/`.

## 📁 Struktur Folder Proyek
- `/images` — Aset gambar publik statis (logo, ikon).
- `/src` — File logika inti:
  - [`main.js`](file:///c:/laragon/www/dcc/src/main.js) — Logika UI (accordion FAQ, modal galeri, interaksi navigasi).
  - [`loader.js`](file:///c:/laragon/www/dcc/src/loader.js) — Skrip loader awal dan FOUC handler.
  - `style.css` — Entry stylesheet Tailwind CSS.
- `/public` — Folder root web server produksi (sitemap, favicon, robot.txt).
