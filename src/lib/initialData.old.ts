import {
  Program,
  DonationRecord,
  FinancialTransaction,
  PetugasJadwal,
  InventoryItem,
  Announcement,
  DoaItem,
  HadisItem,
  GalleryItem,
  QurbanGroup
} from '../types';

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prg-1',
    title: 'Wakaf Tunai Sound System & Akustik Ruang Utama Az-Zikra',
    subtitle: 'Satu Suara Keagungan Ibadah',
    category: 'wakaf',
    targetAmount: 15000000000,
    collectedAmount: 8250000000,
    donorsCount: 3420,
    imageUrl: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=800&q=80',
    description: 'Pengadaan sistem tata suara audio kristal dan peredam akustik modern agar seluruh jamaah mendengar lantunan ayat dan khotbah di Masjid Az-Zikra Sentul dengan jelas dan khusyuk.',
    isUrgent: true,
    featured: true
  },
  {
    id: 'prg-2',
    title: 'Program Sahur & Buka Puasa Ramadhan Jamaah Az-Zikra',
    subtitle: 'Berbagi Santapan Berkah',
    category: 'infaq',
    targetAmount: 50000000000,
    collectedAmount: 32100000000,
    donorsCount: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    description: 'Penyediaan 2.000 paket hidangan sahur dan iftar gratis setiap hari selama bulan suci Ramadhan bagi jamaah Zikir Akbar, musafir, serta warga Kampung Sunnah Sentul.',
    isUrgent: false,
    featured: true
  },
  {
    id: 'prg-3',
    title: 'Pemeliharaan Kubah Putih & Pengembangan Selasar Az-Zikra',
    subtitle: 'Pengembangan Sarana Umat',
    category: 'wakaf',
    targetAmount: 100000000000,
    collectedAmount: 75400000000,
    donorsCount: 14200,
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    description: 'Pekerjaan peremajaan cat putih suci kubah utama dan perluasan selasar marmer untuk menampung jamaah Dzikir Akbar bulanan.',
    isUrgent: false,
    featured: true
  },
  {
    id: 'prg-4',
    title: 'Muallaf Center Az-Zikra - Pembinaan & Pendampingan Imunitas Iman',
    subtitle: 'Merangkul Saudara Baru',
    category: 'shadaqah',
    targetAmount: 5000000000,
    collectedAmount: 3800000000,
    donorsCount: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    description: 'Pusat layanan pembinaan membaca Al-Qur\'an, fiqh dasar, bantuan ekonomi awal, dan advokasi hukum bagi para saudara muallaf di wilayah Sentul & Bogor.',
    isUrgent: false,
    featured: false
  },
  {
    id: 'prg-5',
    title: 'Pesantren Tahfidz & TPA Az-Zikra Anak Dhuafa',
    subtitle: 'Mencetak Generasi Qur\'ani',
    category: 'zakat',
    targetAmount: 10000000000,
    collectedAmount: 8900000000,
    donorsCount: 4120,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Pemberian beasiswa penuh, seragam, insentif ustadz/ustadzah, dan kitab suci bagi santri TPA dari keluarga dhuafa.',
    isUrgent: false,
    featured: false
  },
  {
    id: 'prg-6',
    title: 'Operasional Wisma Jamaah & Hall Resepsi Syariah Az-Zikra',
    subtitle: 'Kemitraan Usaha Syariah Masjid',
    category: 'infaq',
    targetAmount: 2000000000,
    collectedAmount: 1650000000,
    donorsCount: 940,
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    description: 'Pemeliharaan fasilitas pendingin udara, lighting, serta wisma transit jamaah yang digunakan untuk kegiatan syiar islami.',
    isUrgent: false,
    featured: false
  }
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'DON-9821',
    programId: 'prg-1',
    programTitle: 'Wakaf Tunai Sound Masjid & Akustik Ruang Utama',
    category: 'wakaf',
    amount: 1000000,
    uniqueCode: 14,
    totalAmount: 1000014,
    donorName: 'Haji Ahmad Subagja',
    donorPhone: '081298765432',
    paymentMethod: 'QRIS Auto-Confirm',
    isAnonymous: false,
    status: 'berhasil',
    createdAt: '2026-07-26T04:30:00Z',
    transactionRef: 'TRX-TZK-88219'
  },
  {
    id: 'DON-9822',
    programId: 'prg-2',
    programTitle: 'Program Sahur & Buka Puasa Ramadhan Jamaah',
    category: 'infaq',
    amount: 500000,
    uniqueCode: 22,
    totalAmount: 500022,
    donorName: 'Hamba Allah',
    donorPhone: '081311223344',
    paymentMethod: 'Bank Transfer BCA',
    isAnonymous: true,
    status: 'berhasil',
    createdAt: '2026-07-26T03:15:00Z',
    transactionRef: 'TRX-TZK-88220'
  },
  {
    id: 'DON-9823',
    programId: 'prg-5',
    programTitle: 'TPA & Rumah Tahfidz Anak Kurang Mampu',
    category: 'zakat',
    amount: 2500000,
    uniqueCode: 37,
    totalAmount: 2500037,
    donorName: 'Ibu Ratna Dewi',
    donorPhone: '085699887766',
    paymentMethod: 'Bank Transfer Mandiri',
    isAnonymous: false,
    status: 'berhasil',
    createdAt: '2026-07-25T18:40:00Z',
    transactionRef: 'TRX-TZK-88221'
  }
];

export const INITIAL_FINANCIAL: FinancialTransaction[] = [
  {
    id: 'FIN-101',
    type: 'masuk',
    title: 'Penerimaan Zakat Mal Jamaah Periode Juli 2026',
    category: 'Zakat Mal',
    amount: 125000000,
    date: '2026-07-25',
    description: 'Penerimaan dana zakat mal via transfer bank & QRIS resmi Masjid Az-Zikra.',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'FIN-102',
    type: 'keluar',
    title: 'Penyaluran Santunan 150 Paket Sembako Fakir Miskin',
    category: 'Penyaluran ZISWAF',
    amount: 45000000,
    date: '2026-07-24',
    description: 'Pendistribusian bahan pokok kepada keluarga dhuafa terdaftar di 5 kelurahan sekitar.',
    proofUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'FIN-103',
    type: 'masuk',
    title: 'Infaq Keliling Salat Jumat Az-Zikra',
    category: 'Infaq Jumat',
    amount: 18450000,
    date: '2026-07-24',
    description: 'Perhitungan kotam infaq Jumat jamaah masjid.',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'FIN-104',
    type: 'keluar',
    title: 'Biaya Listrik, Kebersihan, & Pemeliharaan AC Utama',
    category: 'Operasional Masjid',
    amount: 12800000,
    date: '2026-07-22',
    description: 'Pembayaran tagihan utilitas PLN, PDAM, dan servis berkala 12 unit AC Sentral.',
    proofUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_PETUGAS: PetugasJadwal[] = [
  {
    id: 'JDW-1',
    date: '2026-07-31',
    dayName: 'Jumat Ini',
    subuh: 'Ustadz Ahmad Fawzi, S.Ag',
    dzuhur: 'Prof. Dr. KH. Nasaruddin Umar, MA',
    ashar: 'Ustadz Dr. H. Abdul Malik',
    maghrib: 'KH. Ridwan Kamil, Lc',
    isya: 'Ustadz Farhan Basalamah, M.A',
    khatibJumat: 'Prof. Dr. KH. Nasaruddin Umar, MA',
    imamJumat: 'Ustadz H. M. Zainuddin, Sq',
    muadzinJumat: 'Ustadz Bilal Al-Habsyi',
    bilalJumat: 'Ustadz Ridwan Syah, S.Pd.I',
    topikJumat: 'Keberkahan Rezeki dalam Zakat, Wakaf Produktif & Spirit Qurban',
    timeJumat: '11:45 WIB - Selesai',
    notesJumat: 'Diharapkan jamaah hadir lebih awal, membawa sajadah sendiri, serta menjaga kerapian shaf shalat.'
  },
  {
    id: 'JDW-2',
    date: '2026-08-07',
    dayName: 'Jumat Depan',
    subuh: 'Ustadz Farhan Basalamah, M.A',
    dzuhur: 'Dr. KH. M. Hidayatullah, M.A.',
    ashar: 'Ustadz Ahmad Fawzi, S.Ag',
    maghrib: 'Ustadz Dr. H. Abdul Malik',
    isya: 'KH. Ridwan Kamil, Lc',
    khatibJumat: 'Dr. KH. M. Hidayatullah, M.A.',
    imamJumat: 'Ustadz H. M. Zainuddin, Sq',
    muadzinJumat: 'Ustadz Hasan Basri',
    bilalJumat: 'Ustadz Salman Al-Farisi',
    topikJumat: 'Membangun Keluarga Rabbani Bebas Riba di Era Digital',
    timeJumat: '11:45 WIB - Selesai',
    notesJumat: 'Kajian ba\'da Jumat dilanjutkan dengan konsultasi zakat & waris syariah gratis.'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-001',
    code: 'SND-01',
    name: 'Sistem Line Array Sound Speaker TOA Professional',
    category: 'Elektronik & Audio',
    quantity: 8,
    unit: 'Unit',
    condition: 'Baik',
    location: 'Ruang Shalat Utama Lt 1',
    lastMaintenance: '2026-07-10',
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'INV-002',
    code: 'AC-04',
    name: 'AC Inverter Standing Floor 5 PK Daikin',
    category: 'Elektronik & Pendingin',
    quantity: 12,
    unit: 'Unit',
    condition: 'Baik',
    location: 'Ruang Shalat Utama & Hall',
    lastMaintenance: '2026-07-22',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'INV-003',
    code: 'KRP-02',
    name: 'Karpet Masjid Sajadah Tebal Turkish Super Red',
    category: 'Peralatan Ibadah',
    quantity: 45,
    unit: 'Gulung',
    condition: 'Baik',
    location: 'Ruang Shalat Utama',
    lastMaintenance: '2026-06-15',
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'INV-004',
    code: 'MIC-03',
    name: 'Microphone Wireless Shure SM58 Professional',
    category: 'Elektronik & Audio',
    quantity: 6,
    unit: 'Set',
    condition: 'Perlu Perbaikan',
    location: 'Mimbar Utama',
    lastMaintenance: '2026-07-18',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANC-1',
    title: 'Kajian Rutin Subuh Berkah: Fiqh Muamalah & ZISWAF',
    content: 'Diberitahukan kepada seluruh jamaah bahwa Kajian Subuh Berkah bersama KH. Ridwan Kamil, Lc akan dilaksanakan setiap Sabtu subuh dilanjutkan dengan sarapan ramah tamah.',
    category: 'Kajian',
    date: '2026-07-25',
    isPinned: true,
    author: 'Pengurus DKM Az-Zikra',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ANC-2',
    title: 'Laporan Akuntabilitas & Transparansi Kas Masjid Bulan Juni 2026',
    content: 'Laporan rincian pemasukan dan pengeluaran kas Masjid Az-Zikra periode Juni 2026 telah terverifikasi oleh Tim Audit Internal. Informasi selengkapnya dapat diakses pada menu Transparansi.',
    category: 'Keuangan',
    date: '2026-07-20',
    isPinned: true,
    author: 'Bendahara DKM Az-Zikra',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ANC-3',
    title: 'Pendaftaran Santri Baru TPA Anak & Pembina Muallaf Center',
    content: 'Gelombang pendaftaran santri TPA Anak dan pembinaan Muallaf Center angkatan 2026/2027 telah dibuka. Silakan daftar via Sekretariat DKM.',
    category: 'Kegiatan',
    date: '2026-07-18',
    isPinned: false,
    author: 'Divisi Pendidikan DKM',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_DOA: DoaItem[] = [
  {
    id: 'doa-1',
    title: 'Doa Memohon Kelapangan Rezeki & Keberkahan',
    category: 'Rezeki',
    arabic: '+º+ä+ä+Ä+æ+ç+Å+à+Ä+æ +Ñ+É+å+É+æ+è +ú+Ä+¦+Æ+ú+Ä+ä+Å+â+Ä +¦+É+ä+Æ+à+ï+º +å+Ä+º+ü+É+¦+ï+º +ê+Ä+¦+É+¦+Æ+é+ï+º +++Ä+è+É+æ+¿+ï+º +ê+Ä+¦+Ä+à+Ä+ä+ï+º +à+Å+¬+Ä+é+Ä+¿+Ä+æ+ä+ï+º',
    latin: 'Allahumma inni as-aluka \'ilman nafi\'an wa rizqan thayyiban wa \'amalan mutaqabbalan',
    translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima. (HR. Ibn Majah)',
    source: 'HR. Ibn Majah no. 925'
  },
  {
    id: 'doa-2',
    title: 'Doa Setelah Bersedekah / Menunaikan Zakat',
    category: 'Rezeki',
    arabic: '+¦+Ä+¿+Ä+æ+å+Ä+º +¬+Ä+é+Ä+¿+Ä+æ+ä+Æ +à+É+å+Ä+æ+º +Ñ+É+å+Ä+æ+â+Ä +ú+Ä+å+Æ+¬+Ä +º+ä+¦+Ä+æ+à+É+è+¦+Å +º+ä+Æ+¦+Ä+ä+É+è+à+Å',
    latin: 'Rabbana taqabbal minna innaka antas-sami\'ul-\'alim',
    translation: 'Ya Tuhan kami, terimalah amalan dari kami, sesungguhnya Engkaulah Yang Maha Mendengar lagi Maha Mengetahui. (QS. Al-Baqarah: 127)',
    source: 'QS. Al-Baqarah: 127'
  },
  {
    id: 'doa-3',
    title: 'Doa Memohon Perlindungan dari Kesusahan & Utang',
    category: 'Perlindungan',
    arabic: '+º+ä+ä+Ä+æ+ç+Å+à+Ä+æ +Ñ+É+å+É+æ+è +ú+Ä+¦+Å+ê+¦+Å +¿+É+â+Ä +à+É+å+Ä +º+ä+Æ+ç+Ä+à+É+æ +ê+Ä+º+ä+Æ+¡+Ä+¦+Ä+å+É +ê+Ä+º+ä+Æ+¦+Ä+¼+Æ+¦+É +ê+Ä+º+ä+Æ+â+Ä+¦+Ä+ä+É +ê+Ä+º+ä+Æ+¿+Å+«+Æ+ä+É +ê+Ä+º+ä+Æ+¼+Å+¿+Æ+å+É +ê+Ä+¦+Ä+ä+Ä+¦+É +º+ä+»+Ä+æ+è+Æ+å+É +ê+Ä+¦+Ä+ä+Ä+¿+Ä+¬+É +º+ä+¦+É+æ+¼+Ä+º+ä+É',
    latin: 'Allahumma inni a\'udzu bika minal-hammi wal-hazani wal-\'agzi wal-kasali wal-bukhli wal-jubni wa dhala\'id-daini wa ghalabatir-rijal',
    translation: 'Ya Allah, aku berlindung kepada-Mu dari rasa sedih dan gelisah, kecemasan, kelemahan dan kemalasan, sifat kikir dan penakut, beban utang dan tekanan orang lain. (HR. Bukhari)',
    source: 'HR. Bukhari no. 2893'
  },
  {
    id: 'doa-4',
    title: 'Doa Masuk Masjid',
    category: 'Shalat',
    arabic: '+º+ä+ä+Ä+æ+ç+Å+à+Ä+æ +º+ü+Æ+¬+Ä+¡+Æ +ä+É+è +ú+Ä+¿+Æ+ê+Ä+º+¿+Ä +¦+Ä+¡+Æ+à+Ä+¬+É+â+Ä',
    latin: 'Allahummaf-tah lii abwaaba rahmatika',
    translation: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
    source: 'HR. Muslim'
  }
];

export const INITIAL_HADIS: HadisItem[] = [
  {
    id: 'hds-1',
    title: 'Sedekah Tidak Mengurangi Harta',
    arabic: '+à+Ä+º +å+Ä+é+Ä+¦+Ä+¬+Æ +¦+Ä+»+Ä+é+Ä+¬+î +à+É+å+Æ +à+Ä+º+ä+ì',
    translation: 'Sedekah itu tidak akan mengurangi harta sedikit pun, melainkan Allah akan menambah kemuliaan bagi orang yang bersedekah.',
    narrator: 'Abu Hurairah radhiyallahu \'anhu',
    source: 'HR. Muslim no. 2588'
  },
  {
    id: 'hds-2',
    title: 'Amal Jariah Yang Terus Mengalir',
    arabic: '+Ñ+É+¦+Ä+º +à+Ä+º+¬+Ä +º+ä+Æ+Ñ+É+å+Æ+¦+Ä+º+å+Å +º+å+Æ+é+Ä+++Ä+¦+Ä +¦+Ä+å+Æ+ç+Å +¦+Ä+à+Ä+ä+Å+ç+Å +Ñ+É+ä+Ä+æ+º +à+É+å+Æ +½+Ä+ä+Ä+º+½+ì: +¦+Ä+»+Ä+é+Ä+¬+ì +¼+Ä+º+¦+É+è+Ä+¬+ì+î +ú+Ä+ê+Æ +¦+É+ä+Æ+à+ì +è+Å+å+Æ+¬+Ä+ü+Ä+¦+Å +¿+É+ç+É+î +ú+Ä+ê+Æ +ê+Ä+ä+Ä+»+ì +¦+Ä+º+ä+É+¡+ì +è+Ä+»+Æ+¦+Å+ê +ä+Ä+ç+Å',
    translation: 'Apabila manusia meninggal dunia, maka terputuslah amalnya kecuali tiga perkara: sedekah jariah (wakaf), ilmu yang bermanfaat, atau anak saleh yang mendoakannya.',
    narrator: 'Abu Hurairah radhiyallahu \'anhu',
    source: 'HR. Muslim no. 1631'
  },
  {
    id: 'hds-3',
    title: 'Pahala Membangun Masjid',
    arabic: '+à+Ä+å+Æ +¿+Ä+å+Ä+ë +à+Ä+¦+Æ+¼+É+»+ï+º +ä+É+ä+Ä+æ+ç+É +¿+Ä+å+Ä+ë +º+ä+ä+Ä+æ+ç+Å +ä+Ä+ç+Å +à+É+½+Æ+ä+Ä+ç+Å +ü+É+è +º+ä+Æ+¼+Ä+å+Ä+æ+¬+É',
    translation: 'Barangsiapa membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah yang serupa di dalam surga.',
    narrator: 'Utsman bin Affan radhiyallahu \'anhu',
    source: 'HR. Bukhari & Muslim'
  }
];

export const INITIAL_JOURNAL_ENTRIES = [
  {
    id: 'JRN-001',
    date: '2026-07-26',
    voucherNo: 'VCH-2026/07/001',
    accountCode: '1101',
    accountName: 'Kas Utama Operasional Masjid',
    debit: 1500000,
    credit: 0,
    description: 'Penerimaan Infaq Subuh Jamaah via QRIS',
    category: 'Infaq' as const
  },
  {
    id: 'JRN-002',
    date: '2026-07-26',
    voucherNo: 'VCH-2026/07/001',
    accountCode: '4101',
    accountName: 'Penerimaan Infaq Terikat/Bebas',
    debit: 0,
    credit: 1500000,
    description: 'Penerimaan Infaq Subuh Jamaah via QRIS',
    category: 'Infaq' as const
  },
  {
    id: 'JRN-003',
    date: '2026-07-25',
    voucherNo: 'VCH-2026/07/002',
    accountCode: '1102',
    accountName: 'Bank BSI - Zakat Fitrah & Maal',
    debit: 5000000,
    credit: 0,
    description: 'Penerimaan Zakat Profesi Hamba Allah',
    category: 'Zakat' as const
  },
  {
    id: 'JRN-004',
    date: '2026-07-25',
    voucherNo: 'VCH-2026/07/002',
    accountCode: '4201',
    accountName: 'Penerimaan Zakat Harta & Profesi',
    debit: 0,
    credit: 5000000,
    description: 'Penerimaan Zakat Profesi Hamba Allah',
    category: 'Zakat' as const
  },
  {
    id: 'JRN-005',
    date: '2026-07-24',
    voucherNo: 'VCH-2026/07/003',
    accountCode: '5101',
    accountName: 'Beban Operasional Kebersihan & AC',
    debit: 750000,
    credit: 0,
    description: 'Servis Berkala AC Ruang Salat Utama & Pengadaan Sabun',
    category: 'Operasional' as const
  },
  {
    id: 'JRN-006',
    date: '2026-07-24',
    voucherNo: 'VCH-2026/07/003',
    accountCode: '1103',
    accountName: 'Kas Kecil Operasional Harian',
    debit: 0,
    credit: 750000,
    description: 'Servis Berkala AC Ruang Salat Utama & Pengadaan Sabun',
    category: 'Operasional' as const
  }
];

export const INITIAL_GL_ACCOUNTS = [
  {
    code: '1101',
    name: 'Kas Utama Operasional Masjid',
    category: 'Aset' as const,
    initialBalance: 125000000,
    totalDebit: 15500000,
    totalCredit: 4200000,
    endingBalance: 136300000
  },
  {
    code: '1102',
    name: 'Bank BSI - Zakat Fitrah & Maal',
    category: 'Aset' as const,
    initialBalance: 450000000,
    totalDebit: 32000000,
    totalCredit: 12500000,
    endingBalance: 469500000
  },
  {
    code: '1103',
    name: 'Kas Kecil Operasional Harian (Petty Cash)',
    category: 'Aset' as const,
    initialBalance: 5000000,
    totalDebit: 2000000,
    totalCredit: 1450000,
    endingBalance: 5550000
  },
  {
    code: '2101',
    name: 'Kewajiban Penyaluran Mustahik (Zakat Unspent)',
    category: 'Kewajiban' as const,
    initialBalance: 180000000,
    totalDebit: 25000000,
    totalCredit: 42000000,
    endingBalance: 197000000
  },
  {
    code: '4101',
    name: 'Penerimaan Infaq & Shadaqah (PSAK 409)',
    category: 'Penerimaan ZISWAF' as const,
    initialBalance: 240000000,
    totalDebit: 0,
    totalCredit: 35000000,
    endingBalance: 275000000
  },
  {
    code: '5101',
    name: 'Beban Operasional & Pemeliharaan Masjid',
    category: 'Beban Operasional' as const,
    initialBalance: 48000000,
    totalDebit: 6200000,
    totalCredit: 0,
    endingBalance: 54200000
  }
];

export const INITIAL_PETTY_CASH = [
  {
    id: 'KC-001',
    date: '2026-07-26',
    refNo: 'PKC-01',
    purpose: 'Pembelian Konsumsi Pengajian Rutin Ba\'da Maghrib',
    picName: 'Ust. Marzuki (DKM)',
    type: 'Pengeluaran' as const,
    amount: 350000,
    remainingBalance: 5550000,
    receiptProof: 'Nota Toko Berkah Jaya',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'KC-002',
    date: '2026-07-25',
    refNo: 'PKC-02',
    purpose: 'Pengisian Kasbon Operasional Kebersihan Masjid',
    picName: 'Bpk. Hendra (Marbot)',
    type: 'Pengeluaran' as const,
    amount: 250000,
    remainingBalance: 5900000,
    receiptProof: 'Kuitansi Petugas',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'KC-003',
    date: '2026-07-20',
    refNo: 'PKC-03',
    purpose: 'Pencairan Dana Top-Up Imprest System dari Bank BSI',
    picName: 'Bendahara DKM',
    type: 'Pencairan' as const,
    amount: 3000000,
    remainingBalance: 6150000,
    receiptProof: 'Slip Penarikan BSI',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_ADMIN_SETTINGS = {
  showAiAssistant: true,
  showTvSignageOption: true,
  showQuranModule: true,
  showLiveMutations: true,
  showTargetDonationBar: true,
  allowAnonymousDonation: true,
  runningTextTv: 'Selamat Datang di Masjid Az-Zikra Sentul (Kampung Sunnah Sentul) - Mohon menonaktifkan nada dering HP selama pelaksanaan Ibadah Salat Jamaah & Dzikir Akbar.',
  goldNisabPrice: 1350000,
  bankAccountBsi: '7130-2498-17 (a.n. DKM Masjid Az-Zikra ZISWAF)',
  bankAccountBca: '8820-1192-33 (a.n. Yayasan Az-Zikra Sentul)',
  qrisMerchantName: 'MASJID AZ-ZIKRA SENTUL QRIS NASIONAL',
  iqamahCountdownMinutes: 10,
  masjidLogoUrl: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=800&q=80',
  masjidHeroPhotoUrl: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=1200&q=80',
  qrisCodeImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  jumatKhatibName: 'Prof. Dr. KH. Nasaruddin Umar, MA',
  jumatImamName: 'Ustadz H. M. Zainuddin, Sq',
  jumatMuadzinName: 'Ustadz Bilal Al-Hafiz',
  jumatTopicTitle: 'Keagungan Zikir & Transparansi Pengelolaan Aset Umat',
  jumatTimeInfo: 'Jumat Ini, 11:55 WIB - Selesai',
  masjidAddressInfo: 'Kampung Sunnah Az-Zikra, Perumahan Bukit Sentul, Cipambuan, Babakan Madang, Bogor',
  masjidPhoneContact: '+62 812-9876-5432 (Sekertariat DKM Az-Zikra)',
  featureInfoAnnouncement: 'Ekosistem Digital Masjid Az-Zikra Sentul melayani ZISWAF, Al-Qur\'an MP3, Jadwal Salat & Adzan, Penunjuk Arah Kiblat, Sejarah Masjid, serta TV Signage Display.'
};

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Tabligh Akbar Sentul: Membangun Peradaban Berbasis Al-Qur\'an',
    subtitle: 'Kajian Utama Masjid Az-Zikra',
    category: 'Tabligh Akbar',
    mediaType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=1200&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: '2026-07-20',
    ustadzName: 'Dr. KH. M. Hidayatullah, M.A.',
    location: 'Ruang Utama Masjid Az-Zikra Sentul',
    summary: 'Dokumentasi video dan artikel lengkap Tabligh Akbar yang dihadiri lebih dari 3.000 jamaah di Masjid Az-Zikra Sentul City.',
    articleContent: `Alhamdulillah, pelaksanaan Tabligh Akbar Sentul City dengan tema "Membangun Peradaban Berbasis Al-Qur'an" berjalan dengan sangat khidmat, lancar, dan penuh keberkahan.\n\nDalam tausiyah utamanya, Dr. KH. M. Hidayatullah menegaskan pentingnya menjadikan nilai-nilai Al-Qur'an sebagai pondasi utama kehidupan modern GÇö tidak hanya dalam dimensi ibadah ritual, namun juga dalam etika bermuamalah, pendidikan generasi muda, serta penguatan kemandirian ekonomi umat melalui optimalisasi ZISWAF.\n\nAcara dimulai sejak pukul 08.00 WIB diawali pembacaan ayat suci Al-Qur'an oleh Qari Internasional, dilanjutkan sambutan hangat Ketua DKM Masjid Az-Zikra. Ribuan jamaah dari Bogor, Jakarta, dan sekitarnya memadati area dalam dan plaza outdoor masjid.\n\nSimak video dokumentasi lengkap serta foto kegiatan di atas untuk meraih ilmu serta keberkahan bersama.`,
    likesCount: 342,
    viewsCount: 2150,
    tags: ['TablighAkbar', 'KajianSentul', 'PeradabanIslam'],
    isFeatured: true
  },
  {
    id: 'gal-2',
    title: 'Penyaluran Zakat & Sembako Bagi 500 Mustahik Sentul & Babakan Madang',
    subtitle: 'Aksi Nyata Kepedulian Sosial Umat',
    category: 'Bakti Sosial',
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    date: '2026-07-15',
    ustadzName: 'Tim UPZ DKM Az-Zikra',
    location: 'Plaza & Sekretariat ZISWAF Az-Zikra',
    summary: 'Penyaluran beras premium, paket minyak, dan santunan tunai secara terverifikasi bagi lansia, janda kurang mampu, dan kaum dhuafa.',
    articleContent: `Program Bakti Sosial Keumatan ini merupakan wujud pertanggungjawaban dan penyaluran amanah zakat, infaq, dan shadaqah yang dipercayakan oleh para muzakki kepada DKM Masjid Az-Zikra Sentul.\n\nSebanyak 500 paket bantuan pangan dan uang tunai diserahkan secara tertib dan penuh kehangatan. Pendataan dilakukan secara presisi oleh Tim Unit Pengumpul Zakat (UPZ) DKM bekerjasama dengan pengurus RT/RW setempat agar tepat sasaran.\n\nKetua UPZ DKM menyampaikan ucapan terima kasih mendalam kepada para donatur: "Jazakumullah khairan katsiran. Semoga setiap bulir beras dan rupiah yang disalurkan menjadi pembersih harta serta penolak bala bagi para muzakki beserta keluarga."`,
    likesCount: 289,
    viewsCount: 1820,
    tags: ['BaktiSosial', 'ZakatTepatSasaran', 'SentulPeduli'],
    isFeatured: true
  },
  {
    id: 'gal-3',
    title: 'Kajian Subuh Syariah: Fiqih Muamalah & Investasi Bebas Riba',
    subtitle: 'Literasi Keuangan Syariah Kontemporer',
    category: 'Kajian Rutin',
    mediaType: 'artikel',
    mediaUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    date: '2026-07-12',
    ustadzName: 'Prof. Dr. Syafi\'i Antonio, M.Ec.',
    location: 'Aula Utama Institut Tazkia Sentul',
    summary: 'Bedah tuntas rukun transaksi syariah, bahaya riba implisit, dan cara memilih instrumen investasi syariah yang aman di era digital.',
    articleContent: `Pentingnya memahami Fiqih Muamalah bagi setiap muslim yang berbisnis, berinvestasi, dan mengelola keuangan keluarga menjadi fokus utama dalam Kajian Subuh Tematik ini.\n\nProf. Dr. Syafi'i Antonio menjelaskan bahwa transaksi keuangan dalam Islam harus memenuhi prinsip keadilan ('adl), keterbukaan (transparansi), dan kerelaan (anta taradin minkum). Beliau menekankan agar jamaah mewaspadai skema investasi bodong yang berkedok syariah.\n\nPoin-poin Penting Kajian:\n1. Membedakan antara akad Mudharabah (bagi hasil) dan Musyarakah (kemitraan modal).\n2. Bahaya unsur Gharar (ketidakjelasan) dan Maisir (spekulasi perjudian).\n3. Tata cara menghitung zakat investasi saham dan emas simpanan.\n\nSesi dilanjutkan dengan tanya jawab interaktif bersama jamaah mengenai transaksi QRIS, e-wallet, dan zakat penghasilan bulanan.`,
    likesCount: 512,
    viewsCount: 3400,
    tags: ['FiqihMuamalah', 'EkonomiSyariah', 'KajianSubuh'],
    isFeatured: false
  },
  {
    id: 'gal-4',
    title: 'Wisuda Santri TPA & Tahfidz Al-Qur\'an Angkatan VI',
    subtitle: 'Mencetak Generasi Rabbani Penghafal Al-Qur\'an',
    category: 'Pendidikan & TPA',
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    date: '2026-06-28',
    ustadzName: 'Ustadz H. M. Zainuddin, Sq & Pengasuh TPA',
    location: 'Ruang Utama Masjid Az-Zikra',
    summary: 'Sebanyak 85 santri cilik TPA Az-Zikra lulus ujian munaqosyah hafalan Juz 30 dan Juz 29 dengan predikat Mumtaz.',
    articleContent: `Suasana penuh haru dan kebanggaan menyelimuti Wisuda Santri TPA & Tahfidz Al-Qur'an Masjid Az-Zikra Sentul. Para santri memasangkan mahkota secara simbolis di hadapan kedua orang tua mereka sebagai perlambang syafaat Al-Qur'an di akhirat kelak.\n\nDKM Masjid Az-Zikra memberikan penghargaan apresiasi serta beasiswa sekolah penuh bagi santri berprestasi yang berasal dari keluarga dhuafa.\n\n"Kami berkomitmen melahirkan generasi yang tidak hanya mahir membaca Al-Qur'an, namun juga berakhlaqul karimah dan berprestasi secara akademis," pungkas Kepala Pengasuh TPA Az-Zikra.`,
    likesCount: 410,
    viewsCount: 2900,
    tags: ['WisudaSantri', 'TahfidzAnak', 'PendidikanAlquran'],
    isFeatured: false
  }
];

export const INITIAL_QURBAN_GROUPS: QurbanGroup[] = [
  {
    id: 'qrb-sapi-1',
    title: 'Kelompok Sapi Patungan A (Az-Zikra 1447H)',
    animalType: 'Sapi',
    type: 'sapi_patungan',
    pricePerShare: 3500000,
    totalShares: 7,
    filledShares: 5,
    weightEstimate: '320 - 350 kg (Sapi Limosin / Simental)',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=1200&q=80',
    description: 'Patungan Qurban Sapi 1/7 Saham Sesuai Syariat Islam. Bebas Biaya Operasional & Pemotongan di Masjid Az-Zikra Sentul. Daging disalurkan ke 350+ KK Mustahik & Fakir Miskin Sentul.',
    isCompleted: false,
    participants: [
      {
        id: 'p-1',
        groupId: 'qrb-sapi-1',
        groupTitle: 'Kelompok Sapi Patungan A (Az-Zikra 1447H)',
        mudhahhiName: 'Bapak H. Bambang Soetrisno & Keluarga',
        phone: '081298761234',
        sharesCount: 1,
        totalPaid: 3500000,
        paymentStatus: 'Lunas',
        createdAt: '2026-07-20',
        transactionRef: 'QRB-8821'
      },
      {
        id: 'p-2',
        groupId: 'qrb-sapi-1',
        groupTitle: 'Kelompok Sapi Patungan A (Az-Zikra 1447H)',
        mudhahhiName: 'Ibu Hj. Siti Aminah binti Fulan',
        phone: '081388123456',
        sharesCount: 2,
        totalPaid: 7000000,
        paymentStatus: 'Lunas',
        createdAt: '2026-07-22',
        transactionRef: 'QRB-8825'
      },
      {
        id: 'p-3',
        groupId: 'qrb-sapi-1',
        groupTitle: 'Kelompok Sapi Patungan A (Az-Zikra 1447H)',
        mudhahhiName: 'Drs. Ahmad Hidayat',
        phone: '08119022311',
        sharesCount: 2,
        totalPaid: 7000000,
        paymentStatus: 'Lunas',
        createdAt: '2026-07-24',
        transactionRef: 'QRB-8830'
      }
    ]
  },
  {
    id: 'qrb-sapi-2',
    title: 'Kelompok Sapi Patungan B (Az-Zikra 1447H)',
    animalType: 'Sapi',
    type: 'sapi_patungan',
    pricePerShare: 3500000,
    totalShares: 7,
    filledShares: 2,
    weightEstimate: '330 - 360 kg (Sapi PO Super)',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
    description: 'Sapi Patungan Kloter B. Kesempatan meraih pahala Qurban bersama 7 shohibul qurban di Masjid Az-Zikra Sentul.',
    isCompleted: false,
    participants: [
      {
        id: 'p-4',
        groupId: 'qrb-sapi-2',
        groupTitle: 'Kelompok Sapi Patungan B (Az-Zikra 1447H)',
        mudhahhiName: 'Bapak Dr. Hendra Wijaya',
        phone: '081277665544',
        sharesCount: 2,
        totalPaid: 7000000,
        paymentStatus: 'Lunas',
        createdAt: '2026-07-25',
        transactionRef: 'QRB-8841'
      }
    ]
  },
  {
    id: 'qrb-kambing-1',
    title: 'Kambing / Domba Individual Premium',
    animalType: 'Kambing / Domba',
    type: 'kambing_individual',
    pricePerShare: 2800000,
    totalShares: 1,
    filledShares: 0,
    weightEstimate: '28 - 32 kg (Kambing Etawa / Garut)',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=1200&q=80',
    description: 'Qurban 1 Ekor Kambing / Domba Individual Atas Nama Pribadi. Hewan sehat, cukup umur (musinnah), certified oleh dokter hewan & DKM Masjid Az-Zikra Sentul.',
    isCompleted: false,
    participants: []
  },
  {
    id: 'qrb-kambing-2',
    title: 'Domba Garut Super Tanduk (Kambing / Domba)',
    animalType: 'Kambing / Domba',
    type: 'kambing_individual',
    pricePerShare: 3500000,
    totalShares: 1,
    filledShares: 0,
    weightEstimate: '35 - 40 kg (Domba Garut Super)',
    imageUrl: 'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?auto=format&fit=crop&w=1200&q=80',
    description: 'Domba Garut Pilihan dengan bobot ekstra besar. Bebas PMK, sehat & cukup umur sesuai syariat ibadah Qurban.',
    isCompleted: false,
    participants: []
  }
];

