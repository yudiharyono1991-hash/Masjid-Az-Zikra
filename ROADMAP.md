# Roadmap Pengembangan Aplikasi Masjid Tazkia

## Ringkasan Aplikasi
Aplikasi ini dirancang sebagai platform digital untuk Masjid Tazkia yang menggabungkan:
- Portal donasi ZISWAF, zakat, infaq, wakaf, dan qurban.
- Kalkulator Zakat dan ZISWAF.
- Digital Ibadah: Al-Qur'an, jadwal shalat, arah kiblat, doa.
- Transparansi laporan keuangan, inventaris, dan petugas jadwal.
- Dashboard pengurus DKM untuk manajemen program, inventaris, dan pelaporan.
- Mode tampilan TV masjid.
- AI assistant untuk membantu jamaah dan pengurus.

## Status Saat Ini
Fitur inti yang ada dalam proyek:
- Navigasi tab untuk beranda, program, transparansi, jadwal, qurban, sejarah, edukasi, galeri, dan portal DKM.
- Program donasi dengan target, jumlah terkumpul, dan kategori.
- Donasi modal interaktif dengan pilihan kategori dan program.
- Kalkulator ZISWAF dan UI edukasi syariah.
- Seksi agenda Jumat dan data petugas shalat.
- Galeri dan statistik interaksi.
- Dashboard internal untuk pengurus dengan manajemen keuangan, inventaris, program, jurnal, dan pengumuman.
- Modal konfigurasi Supabase dan login sederhana.
- Mode tampilan TV, katalog PDF, dan asisten AI.

## Prioritas Pengembangan
1. Implementasi backend Supabase penuh
   - Penyimpanan data program, donasi, keuangan, petugas, inventaris, galeri, qurban.
   - Autentikasi pengguna dan peran DKM.
   - Proteksi rute dashboard pengurus.

2. Integrasi pembayaran riil
   - Integrasi QRIS, transfer bank, dan notifikasi pembayaran.
   - Otomatisasi penomoran unik dan status transaksi.

3. Pengembangan fitur laporan dan transparansi
   - Laporan bulanan, ringkasan kas, dan visualisasi KPI.
   - Ekspor PDF/CSV untuk laporan keuangan dan donasi.

4. Peningkatan pengalaman jamaah
   - Notifikasi jadwal shalat dan pengingat agenda Jumat.
   - Fitur volunteer, pendaftaran event, dan booking ruang.
   - Multi-bahasa (Indonesia / Inggris).

5. Penyempurnaan mode TV dan siaran masjid
   - Slide otomatis untuk jadwal, program, donasi, dan pengumuman.
   - Integrasi live streaming atau tautan tampilan presentasi.

6. Kematangan AI assistant
   - Jawaban otomatis FAQ masjid.
   - Rekomendasi program donasi, zakat, dan doa berdasarkan kebutuhan jamaah.

## Langkah Pengembangan
1. Perjelas scope aplikasi dan tetapkan fitur utama untuk versi MVP.
2. Rancang model data dan skema Supabase.
3. Sambungkan frontend ke backend Supabase dan buat API/CRUD.
4. Uji alur donasi dan keamanan data.
5. Kerjakan UI/UX responsif mobile dan tablet.
6. Selesaikan deployment pada host yang mendukung server Node dan Vite.

## Fitur Tambahan Masa Depan
- Booking acara majelis, kursus, dan konser religius.
- Modul relawan: pendaftaran, jadwal tugas, dan absensi.
- Sistem notifikasi WhatsApp/email untuk donatur dan jamaah.
- Pelacakan wakaf produktif dan ROI untuk aset wakaf.
- Integrasi digital sign-in untuk tamu, santri, dan jamaah.

## Catatan Teknis
- Stack utama: React 19, Vite 6, Tailwind CSS, Supabase, Express, Gemini AI.
- Pastikan `GEMINI_API_KEY` tersedia untuk fitur AI.
- Jalankan dengan `npm install` dan `npm run dev`.

