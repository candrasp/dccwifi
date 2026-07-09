# Kebijakan Keamanan (Security Policy)

Kami berkomitmen untuk menjaga keamanan website DCCWIFI tetap aman dari berbagai potensi celah keamanan di sisi browser (*client-side security*).

## 🛡️ Konfigurasi Keamanan yang Diterapkan

Proyek ini telah dikonfigurasi dengan langkah-selangkah mitigasi standar industri untuk mencegah serangan XSS (*Cross-Site Scripting*) dan kebocoran informasi data pengguna:

### 1. Content Security Policy (CSP)
Semua halaman HTML (`index.html`, `privacy-policy.html`, `terms-conditions.html`) dilengkapi dengan tag CSP:
```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self';" />
```
- **Tanpa `'unsafe-inline'` di script-src:** Semua skrip inline diblokir oleh browser. Semua file JavaScript dijalankan dari file eksternal yang sah (`src/loader.js` dan `src/main.js`).
- **Pembatasan Koneksi:** `connect-src 'none'` memastikan kode JavaScript di sisi client tidak bisa melakukan pertukaran data (exfiltrasi) ke server asing ilegal.

### 2. Referrer Policy
Mencegah kebocoran informasi URL halaman pengirim ke situs eksternal saat pengguna mengeklik tautan WhatsApp atau sosial media:
```html
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

### 3. Tautan Tab Baru yang Aman
Semua tautan yang mengarah ke luar menggunakan atribut tambahan untuk mencegah manipulasi tab sebelumnya (*tabnapping*):
```html
target="_blank" rel="noopener noreferrer"
```

## 🐛 Melaporkan Celah Keamanan (Vulnerability Reports)
Jika Anda menemukan kerentanan keamanan pada kode landing page ini, silakan hubungi tim IT DCCWIFI secara langsung melalui email pengelola atau kontak resmi di WhatsApp, bukan melalui GitHub Issue publik, untuk menerapkan penanganan secara privat.
