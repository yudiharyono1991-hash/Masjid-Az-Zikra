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
    name: 'Sentul / Bogor (Masjid Tazkia)',
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
  {
    "number": 1,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +¦+ä+Æ+ü+Ä+º+¬+É+¡+Ä+¬+É",
    "englishName": "Al-Faatiha",
    "translation": "The Opening",
    "ayahsCount": 7,
    "type": "Makkiyah"
  },
  {
    "number": 2,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¿+Ä+é+Ä+¦+Ä+¬+É",
    "englishName": "Al-Baqara",
    "translation": "The Cow",
    "ayahsCount": 286,
    "type": "Madaniyah"
  },
  {
    "number": 3,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ô+ä+É +¦+É+à¦í+¦+Ä+º+å+Ä",
    "englishName": "Aal-i-Imraan",
    "translation": "The Family of Imraan",
    "ayahsCount": 200,
    "type": "Madaniyah"
  },
  {
    "number": 4,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+É+¦+Ä+º+í+É",
    "englishName": "An-Nisaa",
    "translation": "The Women",
    "ayahsCount": 176,
    "type": "Madaniyah"
  },
  {
    "number": 5,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Ä+º+ª+Ç+É+»+Ä+¬+É",
    "englishName": "Al-Maaida",
    "translation": "The Table",
    "ayahsCount": 120,
    "type": "Madaniyah"
  },
  {
    "number": 6,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ú+Ä+å¦í+¦+Ä+º+à+É",
    "englishName": "Al-An'aam",
    "translation": "The Cattle",
    "ayahsCount": 165,
    "type": "Makkiyah"
  },
  {
    "number": 7,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ú+Ä+¦¦í+¦+Ä+º+ü+É",
    "englishName": "Al-A'raaf",
    "translation": "The Heights",
    "ayahsCount": 206,
    "type": "Makkiyah"
  },
  {
    "number": 8,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ú+Ä+å+ü+Ä+º+ä+É",
    "englishName": "Al-Anfaal",
    "translation": "The Spoils of War",
    "ayahsCount": 75,
    "type": "Madaniyah"
  },
  {
    "number": 9,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¬+æ+Ä+ê¦í+¿+Ä+¬+É",
    "englishName": "At-Tawba",
    "translation": "The Repentance",
    "ayahsCount": 129,
    "type": "Madaniyah"
  },
  {
    "number": 10,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +è+Å+ê+å+Å+¦+Ä",
    "englishName": "Yunus",
    "translation": "Jonas",
    "ayahsCount": 109,
    "type": "Makkiyah"
  },
  {
    "number": 11,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +ç+Å+ê+»+ì",
    "englishName": "Hud",
    "translation": "Hud",
    "ayahsCount": 123,
    "type": "Makkiyah"
  },
  {
    "number": 12,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +è+Å+ê+¦+Å+ü+Ä",
    "englishName": "Yusuf",
    "translation": "Joseph",
    "ayahsCount": 111,
    "type": "Makkiyah"
  },
  {
    "number": 13,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+¦¦í+»+É",
    "englishName": "Ar-Ra'd",
    "translation": "The Thunder",
    "ayahsCount": 43,
    "type": "Madaniyah"
  },
  {
    "number": 14,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +Ñ+É+¿¦í+¦+Ä+º+ç+É+è+à+Ä",
    "englishName": "Ibrahim",
    "translation": "Abraham",
    "ayahsCount": 52,
    "type": "Makkiyah"
  },
  {
    "number": 15,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¡+É+¼¦í+¦+É",
    "englishName": "Al-Hijr",
    "translation": "The Rock",
    "ayahsCount": 99,
    "type": "Makkiyah"
  },
  {
    "number": 16,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+Ä+¡¦í+ä+É",
    "englishName": "An-Nahl",
    "translation": "The Bee",
    "ayahsCount": 128,
    "type": "Makkiyah"
  },
  {
    "number": 17,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+Ñ+É+¦¦í+¦+Ä+º+í+É",
    "englishName": "Al-Israa",
    "translation": "The Night Journey",
    "ayahsCount": 111,
    "type": "Makkiyah"
  },
  {
    "number": 18,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+â+Ä+ç¦í+ü+É",
    "englishName": "Al-Kahf",
    "translation": "The Cave",
    "ayahsCount": 110,
    "type": "Makkiyah"
  },
  {
    "number": 19,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +à+Ä+¦¦í+è+Ä+à+Ä",
    "englishName": "Maryam",
    "translation": "Mary",
    "ayahsCount": 98,
    "type": "Makkiyah"
  },
  {
    "number": 20,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +++ç",
    "englishName": "Taa-Haa",
    "translation": "Taa-Haa",
    "ayahsCount": 135,
    "type": "Makkiyah"
  },
  {
    "number": 21,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ú+Ä+å+¿+É+è+Ä+º+í+É",
    "englishName": "Al-Anbiyaa",
    "translation": "The Prophets",
    "ayahsCount": 112,
    "type": "Makkiyah"
  },
  {
    "number": 22,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¡+Ä+¼+æ+É",
    "englishName": "Al-Hajj",
    "translation": "The Pilgrimage",
    "ayahsCount": 78,
    "type": "Madaniyah"
  },
  {
    "number": 23,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+ñ¦í+à+É+å+Å+ê+å+Ä",
    "englishName": "Al-Muminoon",
    "translation": "The Believers",
    "ayahsCount": 118,
    "type": "Makkiyah"
  },
  {
    "number": 24,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+Å+ê+¦+É",
    "englishName": "An-Noor",
    "translation": "The Light",
    "ayahsCount": 64,
    "type": "Madaniyah"
  },
  {
    "number": 25,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ü+Å+¦¦í+é+Ä+º+å+É",
    "englishName": "Al-Furqaan",
    "translation": "The Criterion",
    "ayahsCount": 77,
    "type": "Makkiyah"
  },
  {
    "number": 26,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Å+¦+Ä+¦+Ä+º+í+É",
    "englishName": "Ash-Shu'araa",
    "translation": "The Poets",
    "ayahsCount": 227,
    "type": "Makkiyah"
  },
  {
    "number": 27,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+Ä+à¦í+ä+É",
    "englishName": "An-Naml",
    "translation": "The Ant",
    "ayahsCount": 93,
    "type": "Makkiyah"
  },
  {
    "number": 28,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+é+Ä+¦+Ä+¦+É",
    "englishName": "Al-Qasas",
    "translation": "The Stories",
    "ayahsCount": 88,
    "type": "Makkiyah"
  },
  {
    "number": 29,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+Ä+å+â+Ä+¿+Å+ê+¬+É",
    "englishName": "Al-Ankaboot",
    "translation": "The Spider",
    "ayahsCount": 69,
    "type": "Makkiyah"
  },
  {
    "number": 30,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Å+ê+à+É",
    "englishName": "Ar-Room",
    "translation": "The Romans",
    "ayahsCount": 60,
    "type": "Makkiyah"
  },
  {
    "number": 31,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +ä+Å+é¦í+à+Ä+º+å+Ä",
    "englishName": "Luqman",
    "translation": "Luqman",
    "ayahsCount": 34,
    "type": "Makkiyah"
  },
  {
    "number": 32,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+¼¦í+»+Ä+¬+É",
    "englishName": "As-Sajda",
    "translation": "The Prostration",
    "ayahsCount": 30,
    "type": "Makkiyah"
  },
  {
    "number": 33,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ú+Ä+¡¦í+¦+Ä+º+¿+É",
    "englishName": "Al-Ahzaab",
    "translation": "The Clans",
    "ayahsCount": 73,
    "type": "Madaniyah"
  },
  {
    "number": 34,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +¦+Ä+¿+Ä+Ñ+ì",
    "englishName": "Saba",
    "translation": "Sheba",
    "ayahsCount": 54,
    "type": "Makkiyah"
  },
  {
    "number": 35,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +ü+Ä+º+++É+¦+ì",
    "englishName": "Faatir",
    "translation": "The Originator",
    "ayahsCount": 45,
    "type": "Makkiyah"
  },
  {
    "number": 36,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +è+¦+ô",
    "englishName": "Yaseen",
    "translation": "Yaseen",
    "ayahsCount": 83,
    "type": "Makkiyah"
  },
  {
    "number": 37,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+º+ü+æ+Ä+º+¬+É",
    "englishName": "As-Saaffaat",
    "translation": "Those drawn up in Ranks",
    "ayahsCount": 182,
    "type": "Makkiyah"
  },
  {
    "number": 38,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +¦+ô",
    "englishName": "Saad",
    "translation": "The letter Saad",
    "ayahsCount": 88,
    "type": "Makkiyah"
  },
  {
    "number": 39,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Å+à+Ä+¦+É",
    "englishName": "Az-Zumar",
    "translation": "The Groups",
    "ayahsCount": 75,
    "type": "Makkiyah"
  },
  {
    "number": 40,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +¦+Ä+º+ü+É+¦+ì",
    "englishName": "Ghafir",
    "translation": "The Forgiver",
    "ayahsCount": 85,
    "type": "Makkiyah"
  },
  {
    "number": 41,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +ü+Å+¦+æ+É+ä+Ä+¬¦í",
    "englishName": "Fussilat",
    "translation": "Explained in detail",
    "ayahsCount": 54,
    "type": "Makkiyah"
  },
  {
    "number": 42,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Å+ê+¦+Ä+ë+¦",
    "englishName": "Ash-Shura",
    "translation": "Consultation",
    "ayahsCount": 53,
    "type": "Makkiyah"
  },
  {
    "number": 43,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Å+«¦í+¦+Å+ü+É",
    "englishName": "Az-Zukhruf",
    "translation": "Ornaments of gold",
    "ayahsCount": 89,
    "type": "Makkiyah"
  },
  {
    "number": 44,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+»+æ+Å+«+Ä+º+å+É",
    "englishName": "Ad-Dukhaan",
    "translation": "The Smoke",
    "ayahsCount": 59,
    "type": "Makkiyah"
  },
  {
    "number": 45,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¼+Ä+º+½+É+è+Ä+¬+É",
    "englishName": "Al-Jaathiya",
    "translation": "Crouching",
    "ayahsCount": 37,
    "type": "Makkiyah"
  },
  {
    "number": 46,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ú+Ä+¡¦í+é+Ä+º+ü+É",
    "englishName": "Al-Ahqaf",
    "translation": "The Dunes",
    "ayahsCount": 35,
    "type": "Makkiyah"
  },
  {
    "number": 47,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +à+Å+¡+Ä+à+æ+Ä+»+ì",
    "englishName": "Muhammad",
    "translation": "Muhammad",
    "ayahsCount": 38,
    "type": "Madaniyah"
  },
  {
    "number": 48,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ü+Ä+¬¦í+¡+É",
    "englishName": "Al-Fath",
    "translation": "The Victory",
    "ayahsCount": 29,
    "type": "Madaniyah"
  },
  {
    "number": 49,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¡+Å+¼+Å+¦+Ä+º+¬+É",
    "englishName": "Al-Hujuraat",
    "translation": "The Inner Apartments",
    "ayahsCount": 18,
    "type": "Madaniyah"
  },
  {
    "number": 50,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +é+ô",
    "englishName": "Qaaf",
    "translation": "The letter Qaaf",
    "ayahsCount": 45,
    "type": "Makkiyah"
  },
  {
    "number": 51,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+º+¦+É+è+Ä+º+¬+É",
    "englishName": "Adh-Dhaariyat",
    "translation": "The Winnowing Winds",
    "ayahsCount": 60,
    "type": "Makkiyah"
  },
  {
    "number": 52,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+++æ+Å+ê+¦+É",
    "englishName": "At-Tur",
    "translation": "The Mount",
    "ayahsCount": 49,
    "type": "Makkiyah"
  },
  {
    "number": 53,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+Ä+¼¦í+à+É",
    "englishName": "An-Najm",
    "translation": "The Star",
    "ayahsCount": 62,
    "type": "Makkiyah"
  },
  {
    "number": 54,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+é+Ä+à+Ä+¦+É",
    "englishName": "Al-Qamar",
    "translation": "The Moon",
    "ayahsCount": 55,
    "type": "Makkiyah"
  },
  {
    "number": 55,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+¡¦í+à+Ä+¦+å",
    "englishName": "Ar-Rahmaan",
    "translation": "The Beneficent",
    "ayahsCount": 78,
    "type": "Madaniyah"
  },
  {
    "number": 56,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ê+Ä+º+é+É+¦+Ä+¬+É",
    "englishName": "Al-Waaqia",
    "translation": "The Inevitable",
    "ayahsCount": 96,
    "type": "Makkiyah"
  },
  {
    "number": 57,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¡+Ä+»+É+è+»+É",
    "englishName": "Al-Hadid",
    "translation": "The Iron",
    "ayahsCount": 29,
    "type": "Madaniyah"
  },
  {
    "number": 58,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+¼+Ä+º+»+ä+Ä+¬+É",
    "englishName": "Al-Mujaadila",
    "translation": "The Pleading Woman",
    "ayahsCount": 22,
    "type": "Madaniyah"
  },
  {
    "number": 59,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¡+Ä+¦¦í+¦+É",
    "englishName": "Al-Hashr",
    "translation": "The Exile",
    "ayahsCount": 24,
    "type": "Madaniyah"
  },
  {
    "number": 60,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+à¦í+¬+Ä+¡+å+Ä+¬+É",
    "englishName": "Al-Mumtahana",
    "translation": "She that is to be examined",
    "ayahsCount": 13,
    "type": "Madaniyah"
  },
  {
    "number": 61,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+ü+æ+É",
    "englishName": "As-Saff",
    "translation": "The Ranks",
    "ayahsCount": 14,
    "type": "Madaniyah"
  },
  {
    "number": 62,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¼+Å+à+Å+¦+Ä+¬+É",
    "englishName": "Al-Jumu'a",
    "translation": "Friday",
    "ayahsCount": 11,
    "type": "Madaniyah"
  },
  {
    "number": 63,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+å+Ä+º+ü+É+é+Å+ê+å+Ä",
    "englishName": "Al-Munaafiqoon",
    "translation": "The Hypocrites",
    "ayahsCount": 11,
    "type": "Madaniyah"
  },
  {
    "number": 64,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¬+æ+Ä+¦+Ä+º+¿+Å+å+É",
    "englishName": "At-Taghaabun",
    "translation": "Mutual Disillusion",
    "ayahsCount": 18,
    "type": "Madaniyah"
  },
  {
    "number": 65,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+++æ+Ä+ä+Ä+º+é+É",
    "englishName": "At-Talaaq",
    "translation": "Divorce",
    "ayahsCount": 12,
    "type": "Madaniyah"
  },
  {
    "number": 66,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¬+æ+Ä+¡¦í+¦+É+è+à+É",
    "englishName": "At-Tahrim",
    "translation": "The Prohibition",
    "ayahsCount": 12,
    "type": "Madaniyah"
  },
  {
    "number": 67,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+ä¦í+â+É",
    "englishName": "Al-Mulk",
    "translation": "The Sovereignty",
    "ayahsCount": 30,
    "type": "Makkiyah"
  },
  {
    "number": 68,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+é+Ä+ä+Ä+à+É",
    "englishName": "Al-Qalam",
    "translation": "The Pen",
    "ayahsCount": 52,
    "type": "Makkiyah"
  },
  {
    "number": 69,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¡+Ä+º+é+æ+Ä+¬+É",
    "englishName": "Al-Haaqqa",
    "translation": "The Reality",
    "ayahsCount": 52,
    "type": "Makkiyah"
  },
  {
    "number": 70,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Ä+¦+Ä+º+¦+É+¼+É",
    "englishName": "Al-Ma'aarij",
    "translation": "The Ascending Stairways",
    "ayahsCount": 44,
    "type": "Makkiyah"
  },
  {
    "number": 71,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +å+Å+ê+¡+ì",
    "englishName": "Nooh",
    "translation": "Noah",
    "ayahsCount": 28,
    "type": "Makkiyah"
  },
  {
    "number": 72,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¼+É+å+æ+É",
    "englishName": "Al-Jinn",
    "translation": "The Jinn",
    "ayahsCount": 28,
    "type": "Makkiyah"
  },
  {
    "number": 73,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+¦+æ+Ä+à+æ+É+ä+É",
    "englishName": "Al-Muzzammil",
    "translation": "The Enshrouded One",
    "ayahsCount": 20,
    "type": "Makkiyah"
  },
  {
    "number": 74,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+»+æ+Ä+½+æ+É+¦+É",
    "englishName": "Al-Muddaththir",
    "translation": "The Cloaked One",
    "ayahsCount": 56,
    "type": "Makkiyah"
  },
  {
    "number": 75,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+é+É+è+Ä+º+à+Ä+¬+É",
    "englishName": "Al-Qiyaama",
    "translation": "The Resurrection",
    "ayahsCount": 40,
    "type": "Makkiyah"
  },
  {
    "number": 76,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+Ñ+É+å+¦+Ä+º+å+É",
    "englishName": "Al-Insaan",
    "translation": "Man",
    "ayahsCount": 31,
    "type": "Madaniyah"
  },
  {
    "number": 77,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+¦¦í+¦+Ä+ä+Ä+º+¬+É",
    "englishName": "Al-Mursalaat",
    "translation": "The Emissaries",
    "ayahsCount": 50,
    "type": "Makkiyah"
  },
  {
    "number": 78,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+Ä+¿+Ä+Ñ+É",
    "englishName": "An-Naba",
    "translation": "The Announcement",
    "ayahsCount": 40,
    "type": "Makkiyah"
  },
  {
    "number": 79,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+Ä+º+¦+É+¦+Ä+º+¬+É",
    "englishName": "An-Naazi'aat",
    "translation": "Those who drag forth",
    "ayahsCount": 46,
    "type": "Makkiyah"
  },
  {
    "number": 80,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +¦+Ä+¿+Ä+¦+Ä",
    "englishName": "Abasa",
    "translation": "He frowned",
    "ayahsCount": 42,
    "type": "Makkiyah"
  },
  {
    "number": 81,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¬+æ+Ä+â¦í+ê+É+è+¦+É",
    "englishName": "At-Takwir",
    "translation": "The Overthrowing",
    "ayahsCount": 29,
    "type": "Makkiyah"
  },
  {
    "number": 82,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+º+å+ü+É+++Ä+º+¦+É",
    "englishName": "Al-Infitaar",
    "translation": "The Cleaving",
    "ayahsCount": 19,
    "type": "Makkiyah"
  },
  {
    "number": 83,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Å+++Ä+ü+æ+É+ü+É+è+å+Ä",
    "englishName": "Al-Mutaffifin",
    "translation": "Defrauding",
    "ayahsCount": 36,
    "type": "Makkiyah"
  },
  {
    "number": 84,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+º+å+¦+É+é+Ä+º+é+É",
    "englishName": "Al-Inshiqaaq",
    "translation": "The Splitting Open",
    "ayahsCount": 25,
    "type": "Makkiyah"
  },
  {
    "number": 85,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¿+Å+¦+Å+ê+¼+É",
    "englishName": "Al-Burooj",
    "translation": "The Constellations",
    "ayahsCount": 22,
    "type": "Makkiyah"
  },
  {
    "number": 86,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+++æ+Ä+º+¦+É+é+É",
    "englishName": "At-Taariq",
    "translation": "The Morning Star",
    "ayahsCount": 17,
    "type": "Makkiyah"
  },
  {
    "number": 87,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ú+Ä+¦¦í+ä+Ä+ë+¦",
    "englishName": "Al-A'laa",
    "translation": "The Most High",
    "ayahsCount": 19,
    "type": "Makkiyah"
  },
  {
    "number": 88,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+Ä+º+¦+É+è+Ä+¬+É",
    "englishName": "Al-Ghaashiya",
    "translation": "The Overwhelming",
    "ayahsCount": 26,
    "type": "Makkiyah"
  },
  {
    "number": 89,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ü+Ä+¼¦í+¦+É",
    "englishName": "Al-Fajr",
    "translation": "The Dawn",
    "ayahsCount": 30,
    "type": "Makkiyah"
  },
  {
    "number": 90,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¿+Ä+ä+Ä+»+É",
    "englishName": "Al-Balad",
    "translation": "The City",
    "ayahsCount": 20,
    "type": "Makkiyah"
  },
  {
    "number": 91,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+à¦í+¦+É",
    "englishName": "Ash-Shams",
    "translation": "The Sun",
    "ayahsCount": 15,
    "type": "Makkiyah"
  },
  {
    "number": 92,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ä+æ+Ä+è¦í+ä+É",
    "englishName": "Al-Lail",
    "translation": "The Night",
    "ayahsCount": 21,
    "type": "Makkiyah"
  },
  {
    "number": 93,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Å+¡+Ä+ë+¦",
    "englishName": "Ad-Dhuhaa",
    "translation": "The Morning Hours",
    "ayahsCount": 11,
    "type": "Makkiyah"
  },
  {
    "number": 94,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+¦¦í+¡+É",
    "englishName": "Ash-Sharh",
    "translation": "The Consolation",
    "ayahsCount": 8,
    "type": "Makkiyah"
  },
  {
    "number": 95,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¬+æ+É+è+å+É",
    "englishName": "At-Tin",
    "translation": "The Fig",
    "ayahsCount": 8,
    "type": "Makkiyah"
  },
  {
    "number": 96,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+Ä+ä+Ä+é+É",
    "englishName": "Al-Alaq",
    "translation": "The Clot",
    "ayahsCount": 19,
    "type": "Makkiyah"
  },
  {
    "number": 97,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+é+Ä+»¦í+¦+É",
    "englishName": "Al-Qadr",
    "translation": "The Power, Fate",
    "ayahsCount": 5,
    "type": "Makkiyah"
  },
  {
    "number": 98,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¿+Ä+è+æ+É+å+Ä+¬+É",
    "englishName": "Al-Bayyina",
    "translation": "The Evidence",
    "ayahsCount": 8,
    "type": "Madaniyah"
  },
  {
    "number": 99,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+æ+Ä+ä¦í+¦+Ä+ä+Ä+¬+É",
    "englishName": "Az-Zalzala",
    "translation": "The Earthquake",
    "ayahsCount": 8,
    "type": "Madaniyah"
  },
  {
    "number": 100,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+Ä+º+»+É+è+Ä+º+¬+É",
    "englishName": "Al-Aadiyaat",
    "translation": "The Chargers",
    "ayahsCount": 11,
    "type": "Makkiyah"
  },
  {
    "number": 101,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+é+Ä+º+¦+É+¦+Ä+¬+É",
    "englishName": "Al-Qaari'a",
    "translation": "The Calamity",
    "ayahsCount": 11,
    "type": "Makkiyah"
  },
  {
    "number": 102,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¬+æ+Ä+â+Ä+º+½+Å+¦+É",
    "englishName": "At-Takaathur",
    "translation": "Competition",
    "ayahsCount": 8,
    "type": "Makkiyah"
  },
  {
    "number": 103,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+¦+Ä+¦¦í+¦+É",
    "englishName": "Al-Asr",
    "translation": "The Declining Day, Epoch",
    "ayahsCount": 3,
    "type": "Makkiyah"
  },
  {
    "number": 104,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ç+Å+à+Ä+¦+Ä+¬+É",
    "englishName": "Al-Humaza",
    "translation": "The Traducer",
    "ayahsCount": 9,
    "type": "Makkiyah"
  },
  {
    "number": 105,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ü+É+è+ä+É",
    "englishName": "Al-Fil",
    "translation": "The Elephant",
    "ayahsCount": 5,
    "type": "Makkiyah"
  },
  {
    "number": 106,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +é+Å+¦+Ä+è¦í+¦+ì",
    "englishName": "Quraish",
    "translation": "Quraysh",
    "ayahsCount": 4,
    "type": "Makkiyah"
  },
  {
    "number": 107,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Ä+º+¦+Å+ê+å+É",
    "englishName": "Al-Maa'un",
    "translation": "Almsgiving",
    "ayahsCount": 7,
    "type": "Makkiyah"
  },
  {
    "number": 108,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+â+Ä+ê¦í+½+Ä+¦+É",
    "englishName": "Al-Kawthar",
    "translation": "Abundance",
    "ayahsCount": 3,
    "type": "Makkiyah"
  },
  {
    "number": 109,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+â+Ä+º+ü+É+¦+Å+ê+å+Ä",
    "englishName": "Al-Kaafiroon",
    "translation": "The Disbelievers",
    "ayahsCount": 6,
    "type": "Makkiyah"
  },
  {
    "number": 110,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+Ä+¦¦í+¦+É",
    "englishName": "An-Nasr",
    "translation": "Divine Support",
    "ayahsCount": 3,
    "type": "Madaniyah"
  },
  {
    "number": 111,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+à+Ä+¦+Ä+»+É",
    "englishName": "Al-Masad",
    "translation": "The Palm Fibre",
    "ayahsCount": 5,
    "type": "Makkiyah"
  },
  {
    "number": 112,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+Ñ+É+«¦í+ä+Ä+º+¦+É",
    "englishName": "Al-Ikhlaas",
    "translation": "Sincerity",
    "ayahsCount": 4,
    "type": "Makkiyah"
  },
  {
    "number": 113,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+ü+Ä+ä+Ä+é+É",
    "englishName": "Al-Falaq",
    "translation": "The Dawn",
    "ayahsCount": 5,
    "type": "Makkiyah"
  },
  {
    "number": 114,
    "name": "+¦+Å+ê+¦+Ä+¬+Å +º+ä+å+æ+Ä+º+¦+É",
    "englishName": "An-Naas",
    "translation": "Mankind",
    "ayahsCount": 6,
    "type": "Makkiyah"
  }
];

export const SAMPLE_AYAHS_ALFATIHAH = [
  {
    "numberInSurah": 1,
    "text": "?????? ??????? ???????????? ??????????",
    "translation": "Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang."
  },
  {
    "numberInSurah": 2,
    "text": "????????? ??????? ????? ?????????????",
    "translation": "Segala puji bagi Allah, Tuhan semesta alam."
  },
  {
    "numberInSurah": 3,
    "text": "???????????? ??????????",
    "translation": "Maha Pemurah lagi Maha Penyayang."
  },
  {
    "numberInSurah": 4,
    "text": "??????? ?????? ????????",
    "translation": "Yang menguasai di Hari Pembalasan."
  },
  {
    "numberInSurah": 5,
    "text": "???????? ???????? ?????????? ???????????",
    "translation": "Hanya Engkaulah yang kami sembah, dan hanya kepada Engkaulah kami meminta pertolongan."
  },
  {
    "numberInSurah": 6,
    "text": "???????? ?????????? ??????????????",
    "translation": "Tunjukilah kami jalan yang lurus,"
  },
  {
    "numberInSurah": 7,
    "text": "??????? ????????? ?????????? ?????????? ?????? ???????????? ?????????? ????? ?????????????",
    "translation": "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat."
  }
];
