# 9. Product Backlog & Roadmap

Dokumen ini berisi daftar fitur, peningkatan, dan perbaikan (backlog) yang telah diprioritaskan untuk pengembangan Sistem Ekosistem Digital Masjid Tazkia.

## 🚀 Sprint Berjalan (Current / To-Do)
- [ ] **Penyempurnaan Integrasi Supabase Database (Tahap 1):** Migrasi data master (users, profile) dari `localStorage` ke PostgreSQL.
- [ ] **Auth & Role Enforcement:** Menyempurnakan pembatasan halaman berdasarkan role dengan proteksi rute di React (React Router / Private Route) agar Admin tidak bisa melihat laporan keuangan spesifik Bendahara.
- [ ] **Integrasi Notifikasi Donasi Jamaah:** Menambahkan pengingat target donasi bulanan (recurring donation) di Portal Jamaah agar mendapat notifikasi 3 hari sebelum tanggal tagihan.

## 📈 Prioritas Menengah (Next Release)
- [ ] **Migrasi Transaksi ke Supabase (Tahap 2):** Memindahkan data transaksi Jurnal Umum dan Buku Besar ke database agar aman dan dapat diaudit (Audit Trail).
- [ ] **Export & Import Data (Excel/CSV):** Mengembangkan fitur agar bendahara dapat mengunduh laporan keuangan, neraca, dan jurnal ke dalam format Excel standar akuntansi.
- [ ] **Manajemen Artikel/Berita Dinamis:** Membuat sistem CMS (Content Management System) lengkap dengan Rich Text Editor (WYSIWYG) untuk tim publikasi menambahkan berita/kajian.
- [ ] **Fitur PWA (Progressive Web App):** Menambahkan `manifest.json` dan *Service Worker* agar aplikasi dapat di-install di layar utama (Home Screen) smartphone layaknya aplikasi native, serta memiliki cache *offline* yang lebih kuat.

## 🔮 Prioritas Rendah & Inovasi Jangka Panjang (Future Epics)
- [ ] **WhatsApp Gateway Integration (Kuitansi Digital):** Menyambungkan webhook donasi dengan layanan API WhatsApp untuk mengirim bukti penerimaan ziswaf secara otomatis ke no HP jamaah.
- [ ] **Four Eyes Principle / Approval System:** Membangun *workflow* persetujuan bertingkat; di mana Bendahara membuat *draft* pengeluaran, dan Ketua DKM harus mengklik tombol "Setuju" sebelum dana bisa dicatat keluar.
- [ ] **Booking Gedung Otomatis & Payment Gateway:** Sistem kalender interaktif untuk jamaah melakukan penyewaan gedung Alhambra, langsung terhubung dengan integrasi pembayaran (Midtrans/Xendit).
- [ ] **Integrasi AI Syariah (Chatbot Fiqih):** Menanamkan widget asisten virtual pintar yang dilatih (Fine-Tuned) dengan dataset khusus kajian/fatwa terpercaya untuk menjawab pertanyaan jamaah 24/7.
- [ ] **OCR (Optical Character Recognition) Kuitansi:** Fitur bagi bendahara untuk memfoto kuitansi kertas, lalu AI secara otomatis membaca nominal dan mengisinya ke form Jurnal Umum.
