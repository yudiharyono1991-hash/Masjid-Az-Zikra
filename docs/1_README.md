# 1. README & General Setup

## Pengantar
Masjid Tazkia Digital Ecosystem adalah aplikasi manajemen masjid terpadu yang dirancang untuk mengelola keuangan, jamaah, donasi, ZISWAF, dan inventaris secara transparan dan efisien.

## Local Setup (Panduan Instalasi)
### Prasyarat
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Akun Supabase (untuk database dan storage)

### Langkah Instalasi
1. Clone repositori ini: `git clone <repo-url>`
2. Masuk ke direktori: `cd MasjidTazkia`
3. Install dependensi: `npm install`
4. Buat file `.env` di root direktori dan tambahkan konfigurasi Supabase:
   ```env
   VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```
5. Jalankan server lokal: `npm run dev`
6. Akses aplikasi di `http://localhost:5173`

## Changelog
### v1.0.0
- Inisialisasi proyek dengan React + Vite + TypeScript.
- Implementasi Portal Jamaah (Donasi, Jadwal Shalat, Qurban).
- Implementasi Portal Admin (Dashboard Keuangan, Jurnal Umum, Buku Besar).
- Integrasi Supabase Storage untuk penyimpanan foto/media.
- Optimasi UI Mobile-first dengan Tailwind CSS.
