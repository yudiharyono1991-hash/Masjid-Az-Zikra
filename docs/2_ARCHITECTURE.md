# 2. Architecture & Data Flow

## Arsitektur Sistem
Aplikasi ini dibangun menggunakan arsitektur Single Page Application (SPA) dengan teknologi berikut:
- **Frontend Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (Mobile-first)
- **State Management:** Zustand (Client-side global state) + LocalStorage (Offline caching)
- **Backend & Database:** Supabase (PostgreSQL, Storage)

## Data Flow
1. **Client Action:** Pengguna melakukan aksi di UI (misal: isi form donasi).
2. **State Update:** Zustand store memperbarui state secara instan untuk UI yang responsif.
3. **Persistence:** Data dikirim ke Supabase untuk disimpan secara permanen. Jika berupa file media (gambar/PDF), diunggah ke Supabase Storage, lalu URL-nya disimpan ke database/state.
4. **Offline Fallback:** Untuk versi saat ini, beberapa data masih disinkronkan ke `localStorage` atau `IndexedDB` sebagai cache lokal jika koneksi terputus.

## Skema Database (Logical Schema)
### 1. `users`
- `id` (UUID, Primary Key)
- `email`, `name`, `phone`
- `role` (enum: jamaah, ketua_dkm, bendahara, penghimpunan, penyaluran, admin_masjid, pengurus_dkm)

### 2. `transactions`
- `id` (UUID)
- `type` (masuk, keluar)
- `category` (zakat, infaq, operasional, dll)
- `amount` (numeric)
- `date` (timestamp)
- `description` (text)
- `approved_by` (UUID user yang menyetujui, jika pengeluaran)

### 3. `settings`
- `id` (singleton)
- `masjid_name`, `logo_url`, `hero_urls`, `qris_url`

## Ringkasan API Spec
Karena menggunakan Supabase, komunikasi data terjadi via Supabase Client (RPC & PostgREST API).
- `supabase.storage.from('masjid-media').upload()`: Endpoint unggah media.
- `supabase.from('transactions').insert()`: Rekam transaksi baru.
