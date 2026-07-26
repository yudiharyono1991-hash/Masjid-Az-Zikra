export function formatRupiah(amount: number): string {
  if (amount >= 1000000000) {
    const bill = amount / 1000000000;
    return `Rp ${bill % 1 === 0 ? bill : bill.toFixed(1)}M`;
  } else if (amount >= 1000000) {
    const jt = amount / 1000000;
    return `Rp ${jt % 1 === 0 ? jt : jt.toFixed(1)}Jt`;
  } else if (amount >= 1000) {
    const rb = amount / 1000;
    return `Rp ${rb % 1 === 0 ? rb : rb.toFixed(1)}rb`;
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatRupiahFull(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export interface CityPrayerTime {
  name: string;
  lat: number;
  lng: number;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export const CITIES_DATA: CityPrayerTime[] = [
  {
    name: 'Sentul / Bogor (Masjid Az-Zikra)',
    lat: -6.5815,
    lng: 106.8710,
    fajr: '04:44',
    sunrise: '06:01',
    dhuhr: '12:03',
    asr: '15:25',
    maghrib: '18:01',
    isha: '19:13'
  },
  {
    name: 'Jakarta & Depok',
    lat: -6.2088,
    lng: 106.8456,
    fajr: '04:43',
    sunrise: '06:00',
    dhuhr: '12:02',
    asr: '15:24',
    maghrib: '18:00',
    isha: '19:12'
  },
  {
    name: 'Bandung',
    lat: -6.9175,
    lng: 107.6191,
    fajr: '04:41',
    sunrise: '05:58',
    dhuhr: '12:00',
    asr: '15:22',
    maghrib: '17:58',
    isha: '19:10'
  },
  {
    name: 'Surabaya',
    lat: -7.2575,
    lng: 112.7521,
    fajr: '04:22',
    sunrise: '05:39',
    dhuhr: '11:41',
    asr: '15:02',
    maghrib: '17:39',
    isha: '18:51'
  },
  {
    name: 'Medan',
    lat: 3.5952,
    lng: 98.6722,
    fajr: '05:01',
    sunrise: '06:21',
    dhuhr: '12:30',
    asr: '15:53',
    maghrib: '18:35',
    isha: '19:48'
  },
  {
    name: 'Makassar',
    lat: -5.1477,
    lng: 119.4327,
    fajr: '04:47',
    sunrise: '06:04',
    dhuhr: '12:08',
    asr: '15:30',
    maghrib: '18:06',
    isha: '19:18'
  }
];

// Calculate Qibla angle from user lat/lng to Mecca (21.4225, 39.8262)
export function calculateQiblaDirection(userLat: number, userLng: number): number {
  const meccaLat = 21.4225 * (Math.PI / 180);
  const meccaLng = 39.8262 * (Math.PI / 180);
  const phi = userLat * (Math.PI / 180);
  const lambda = userLng * (Math.PI / 180);

  const deltaLambda = meccaLng - lambda;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi) * Math.tan(meccaLat) - Math.sin(phi) * Math.cos(deltaLambda);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = qiblaRad * (180 / Math.PI);

  if (qiblaDeg < 0) {
    qiblaDeg += 360;
  }

  return Math.round(qiblaDeg);
}

export function getHijriDate(): string {
  // Approximate Hijri conversion for demonstration
  const today = new Date();
  const day = today.getDate();
  const monthNames = [
    'Muharram', 'Safar', 'Rabi\'ul Awal', 'Rabi\'ul Akhir',
    'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
    'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
  ];
  // Example approximate date in 1448 AH
  return `${day + 2} Safar 1448 H`;
}

export const SURAHS_LIST = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", translation: "Pembukaan", ayahsCount: 7, type: "Makkiyah" },
  { number: 36, name: "يس", englishName: "Yasin", translation: "Ya Sin", ayahsCount: 83, type: "Makkiyah" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", translation: "Yang Maha Pemurah", ayahsCount: 78, type: "Madaniyah" },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", translation: "Hari Kiamat", ayahsCount: 96, type: "Makkiyah" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", translation: "Kerajaan", ayahsCount: 30, type: "Makkiyah" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", translation: "Ikhlas", ayahsCount: 4, type: "Makkiyah" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", translation: "Waktu Subuh", ayahsCount: 5, type: "Makkiyah" },
  { number: 114, name: "الناس", englishName: "An-Nas", translation: "Manusia", ayahsCount: 6, type: "Makkiyah" }
];

export const SAMPLE_AYAHS_ALFATIHAH = [
  {
    numberInSurah: 1,
    text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    latin: "Bismillaahir-rahmaanir-rahiim",
    translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."
  },
  {
    numberInSurah: 2,
    text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    latin: "Al-hamdu lillaahi rabbil-'aalamiin",
    translation: "Segala puji bagi Allah, Tuhan seluruh alam."
  },
  {
    numberInSurah: 3,
    text: "الرَّحْمَٰنِ الرَّحِيمِ",
    latin: "Ar-rahmaanir-rahiim",
    translation: "Yang Maha Pengasih, Maha Penyayang."
  },
  {
    numberInSurah: 4,
    text: "مَالِكِ يَوْمِ الدِّينِ",
    latin: "Maaliki yaumid-diin",
    translation: "Pemilik hari pembalasan."
  },
  {
    numberInSurah: 5,
    text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    latin: "Iyyaaka na'budu wa iyyaaka nasta'iin",
    translation: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan."
  },
  {
    numberInSurah: 6,
    text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    latin: "Ihdinas-siraatal-mustaqiim",
    translation: "Tunjukilah kami jalan yang lurus,"
  },
  {
    numberInSurah: 7,
    text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    latin: "Siraatalladziina an'amta 'alaihim gairil-magduubi 'alaihim wa lad-daalliin",
    translation: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat."
  }
];
