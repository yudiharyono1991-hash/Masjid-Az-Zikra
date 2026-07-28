# 4. AI & Integration Specifications

## Rencana Integrasi AI (AI Spec)
Sebagai Masjid percontohan ekosistem digital, aplikasi ini merencanakan integrasi kecerdasan buatan (AI) untuk membantu operasional.

### 1. AI Syariah (Islamic Chatbot)
- **Fungsi:** Menjawab pertanyaan jamaah seputar fikih (waktu shalat, cara shalat qashar, hukum zakat) berdasarkan dalil shahih.
- **Prompt Registry:** Prompt diatur agar AI hanya menjawab berdasarkan referensi fiqih yang kredibel (Al-Qur'an & As-Sunnah) dan merujuk jamaah ke asatidz DKM untuk pertanyaan kompleks.

### 2. OCR Integration (Pengenalan Karakter Optik)
- **Fungsi:** Otomatis membaca struk transfer bank atau nota belanja pengeluaran.
- **Alur:** Bendahara memfoto nota -> OCR mengekstrak nominal dan tanggal -> Draft Jurnal Umum otomatis terisi.

### 3. WhatsApp Bot Flow (Notifikasi & Interaksi)
- **Fungsi:** Notifikasi donasi berhasil, pengingat target sedekah bulanan, dan broadcast jadwal kajian.
- **Alur Donasi:** 
  1. Jamaah donasi via portal.
  2. Sistem memicu webhook.
  3. Layanan WA Gateway mengirim pesan kuitansi digital ke No. HP Jamaah.

### 4. Integration Contracts
Format JSON yang disepakati antara frontend dan layanan third-party AI / WA API:
```json
// Contoh Payload Notifikasi WA
{
  "phone": "+628123456789",
  "message": "Terima kasih, Hamba Allah. Donasi sebesar Rp 100.000 telah kami terima.",
  "type": "receipt"
}
```
