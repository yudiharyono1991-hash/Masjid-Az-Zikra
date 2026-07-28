# 5. Developer Guide

## Standar Pengkodean (Coding Standards)
- **Bahasa:** TypeScript ketat (`strict: true`). Hindari penggunaan `any` sebisa mungkin.
- **Komponen React:** Gunakan Functional Components dengan React Hooks. Pisahkan logika UI kompleks ke custom hooks.
- **Styling:** Tailwind CSS utility classes. Jangan membuat file CSS kustom kecuali benar-benar diperlukan untuk animasi atau override library spesifik (misal: Chart.js tooltips).
- **Penamaan:**
  - File komponen: PascalCase (`SewaGedungAdmin.tsx`)
  - File utilitas/hooks: camelCase (`mediaUpload.ts`, `useMasjidStore.ts`)
  - Konstanta global: UPPER_SNAKE_CASE

## Git Workflow
- Menggunakan pendekatan Branching standar.
- Branch `main`: Cabang produksi (Stabil).
- Fitur baru dikerjakan di branch `feature/<nama-fitur>`.
- Perbaikan bug dikerjakan di branch `hotfix/<nama-bug>`.
- Wajib menyertakan pesan commit yang deskriptif (Convention: `feat:`, `fix:`, `refactor:`, `docs:`).

## Strategi Pengujian (Testing Strategy)
- **Unit Testing:** Fungsi utilitas inti (seperti konversi nilai mata uang, perhitungan zakat) harus diuji.
- **TypeScript Check:** Dilarang me-merge kode yang gagal saat menjalankan perintah `npx tsc --noEmit`. Build harus selalu bersih dari error TS.
- **Manual UI Testing:** Verifikasi tampilan di layar mobile (min 320px) setiap menambahkan komponen visual.

## Panduan Deployment
- Proyek ini terintegrasi langsung dengan Netlify.
- Setiap push ke branch `main` akan memicu build otomatis (Continuous Deployment).
- Jika perlu mengubah ENV Variables (seperti kredensial Supabase), lakukan melalui dashboard Netlify di bagian *Environment variables*.
