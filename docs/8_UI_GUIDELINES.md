# 8. UI Guidelines (Panduan Antarmuka Pengguna)

## Filosofi Desain
Aplikasi Masjid Tazkia menggunakan pendekatan desain *Modern Islamic, Trustworthy, & Clean*. Estetika harus memancarkan kredibilitas, profesionalisme, namun tetap hangat dan kental nuansa islami.

## Warna Utama (Brand Colors)
Kami menghindari warna generik dan menggunakan palet premium Tailwind:
- **Primary Navy Blue (`bg-blue-900` / `bg-[#1e3a8a]`):** Melambangkan profesionalisme, ketenangan, dan kepercayaan (sering digunakan di instansi resmi/keuangan).
- **Gold / Amber (`bg-amber-500` / `text-amber-300`):** Melambangkan kemuliaan, keagungan islam, dan estetika premium (khas ornamen masjid dan Al-Qur'an).
- **Background Netral (`bg-[#F9F8F4]`):** Putih gading memberikan kesan kertas mushaf atau dinding masjid yang bersih.

## Tipografi
- **Font Utama (Sans-serif):** `Inter` atau bawaan sistem (untuk data keuangan, UI aplikasi yang butuh kejelasan ekstra).
- **Font Aksen (Serif):** `Merriweather` atau serif klasik (digunakan pada teks "Tazkia", judul hero, kutipan hadist) untuk memberikan sentuhan elegan dan historis.
- **Font Monospace:** Digunakan untuk label status, nomor rekening, dan label struktural yang kaku (misal: "MASJID OFFICIAL BRANDING").

## Panduan Mobile-First
1. **Lebar Konten:** Pastikan tidak ada scroll horizontal berlebih di layar 320px (iPhone SE) hingga 430px (iPhone Pro Max).
2. **Navigasi Bawah (Bottom Navigation):** Menu utama di perangkat mobile berada di bawah agar mudah dijangkau ibu jari (Beranda, Donasi, Al-Qur'an, AI Syariah, Menu).
3. **Menu Laci (Drawer Menu):** Khusus layar mobile, menu kompleks harus disembunyikan di dalam *hamburger menu* yang digeser (slide-in) dari bawah atau samping, dan harus memiliki **Tombol Tutup (X)** yang terlihat jelas.
4. **Touch Target:** Semua tombol dan area interaktif (input, link) di mobile harus memiliki ukuran minimal `44px x 44px` agar tidak meleset saat ditekan.

## Komponen Interaktif (Micro-animations)
- Gunakan transisi halus pada tombol (hover efek: meredup atau sedikit membesar).
- Pastikan teks di atas gambar Hero (beranda) selalu memiliki bayangan (`drop-shadow` atau `text-shadow`) agar tetap terbaca jika foto latarnya terang.
- Gunakan ikon SVG (Lucide-react) berukuran proporsional (w-4 h-4 s/d w-6 h-6).
