# 6. Security & Infrastructure

## Security Measures (Keamanan Aplikasi)
- **Supabase RLS (Row Level Security):** Direncanakan pada migrasi database. Saat ini data finansial masih sangat bergantung pada enkripsi/caching frontend. Ke depan, akses tabel PostgreSQL dibatasi berdasar `user_role` via RLS.
- **Client-Side Storage:** Kredensial tidak pernah disimpan di `localStorage` dalam bentuk plain text (kecuali state session non-sensitif untuk demo).

## Incident Response (Respon Insiden)
- Jika layanan Cloud Run / Netlify down, periksa log build di Netlify Dashboard.
- Jika Supabase Storage gagal diakses, periksa status kuota (Operational Credits) di Supabase Dashboard. Aplikasi sudah dirancang agar jika unggahan Supabase gagal (error rate > 0), sistem otomatis *fallback* menyimpan gambar sebagai Base64 lokal (IndexedDB).

## Backup & Recovery
- Backup rutin harian untuk database PostgreSQL Supabase harus diaktifkan via pengaturan Supabase.
- Pengguna (Bendahara) memiliki menu "Export Data" untuk mencadangkan Buku Besar ke dalam file Excel sebagai backup luring independen.

## Monitoring & Alerting
- Saat ini error ditangkap via console browser (`console.warn` atau `console.error`) dan antarmuka *Toast notifications* untuk memberi tahu admin jika sebuah operasi gagal (misal gagal unggah).

## Runbook / Troubleshooting Dasar
- **Masalah:** "Supabase Client not initialized".
- **Solusi:** Pastikan file `.env` mengandung URL dan Anon Key Supabase yang sah. Jika kosong, sistem akan mereduksi fungsi cloud dan berjalan secara *local-only*.
- **Masalah:** Gambar ndut-ndutan atau hilang di HP lain.
- **Solusi:** Pastikan telah mengklik tombol "Simpan ke Database" di modul pengaturan agar gambar di-upload ke Supabase Storage, bukan hanya di cache IndexedDB.
