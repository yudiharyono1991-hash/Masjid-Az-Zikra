# 3. Compliance & Governance

## Kebijakan Four Eyes Principle (Prinsip Dua Pasang Mata)
Setiap pengeluaran dana masjid (operasional, penyaluran ziswaf) yang melebihi ambang batas tertentu (contoh: Rp 5.000.000) memerlukan persetujuan ganda:
1. **Maker:** Dibuat/diajukan oleh Bendahara.
2. **Checker/Approver:** Disetujui (Approved) secara digital oleh Ketua DKM.
Tanpa approval, dana tidak dapat dibukukan sebagai "Keluar" di Jurnal Umum.

## Audit Trail (Jejak Audit)
- Setiap transaksi (CRUD) harus mencatat `created_by`, `updated_by`, dan `timestamp`.
- Log ini tidak dapat dihapus oleh sembarang user, digunakan untuk keperluan audit keuangan masjid secara transparan.

## KYC & Kebijakan Data Pribadi (Privacy Policy)
- Data jamaah (Nama, Email, No. HP) hanya digunakan untuk keperluan pelayanan (kuitansi donasi, informasi jadwal qurban).
- **Data Retention:** Data transaksi historis (lebih dari 5 tahun) dapat diarsipkan secara cold-storage, namun ringkasan saldo tetap dipertahankan.
- Aplikasi wajib memastikan kerahasiaan nominal donasi jika jamaah memilih opsi "Hamba Allah".

## Verifikasi Masjid (Mosque Verification)
- Untuk memastikan keabsahan, akun DKM dan rekening bank tujuan donasi harus melalui proses verifikasi dokumen administrasi (SK Pengurus, Rekening Koran Masjid) sebelum fitur QRIS diaktifkan sepenuhnya.
