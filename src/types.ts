export type ProgramCategory = 'zakat' | 'infaq' | 'shadaqah' | 'wakaf';

export type GalleryType = 'photo' | 'video' | 'artikel';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Kajian Rutin' | 'Tabligh Akbar' | 'Bakti Sosial' | 'Program Ramadhan' | 'Pendidikan & TPA' | 'Lainnya';
  mediaType: GalleryType;
  mediaUrl: string;
  videoEmbedUrl?: string;
  thumbnailUrl?: string;
  date: string;
  ustadzName?: string;
  location?: string;
  summary: string;
  articleContent: string;
  likesCount: number;
  viewsCount: number;
  tags?: string[];
  isFeatured?: boolean;
}

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  category: ProgramCategory;
  targetAmount: number;
  collectedAmount: number;
  donorsCount: number;
  imageUrl: string;
  description: string;
  isUrgent?: boolean;
  featured?: boolean;
}

export interface DonationRecord {
  id: string;
  programId: string;
  programTitle: string;
  category: ProgramCategory;
  amount: number;
  uniqueCode: number;
  totalAmount: number;
  donorName: string;
  donorPhone: string;
  paymentMethod: string;
  isAnonymous: boolean;
  recurringPeriod?: 'none' | 'daily' | 'weekly' | 'monthly';
  status: 'berhasil' | 'menunggu_pembayaran';
  createdAt: string;
  transactionRef: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'masuk' | 'keluar';
  title: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  proofUrl?: string;
}

export interface PetugasJadwal {
  id: string;
  date: string;
  dayName: string;
  subuh: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  khatibJumat?: string;
  imamJumat?: string;
  muadzinJumat?: string;
  bilalJumat?: string;
  topikJumat?: string;
  timeJumat?: string;
  notesJumat?: string;
}

export interface QurbanParticipant {
  id: string;
  groupId: string;
  groupTitle: string;
  mudhahhiName: string;
  phone: string;
  sharesCount: number;
  totalPaid: number;
  paymentStatus: 'Lunas' | 'Menunggu Pembayaran';
  createdAt: string;
  transactionRef: string;
}

export interface QurbanGroup {
  id: string;
  title: string;
  animalType: 'Sapi' | 'Kambing / Domba';
  type: 'sapi_patungan' | 'kambing_individual' | 'sapi_utuh';
  pricePerShare: number;
  totalShares: number;
  filledShares: number;
  weightEstimate: string;
  imageUrl: string;
  description: string;
  isCompleted: boolean;
  participants: QurbanParticipant[];
}

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  condition: 'Baik' | 'Perlu Perbaikan' | 'Rusak';
  location: string;
  lastMaintenance: string;
  imageUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Penting' | 'Kajian' | 'Kegiatan' | 'Keuangan';
  date: string;
  isPinned?: boolean;
  author: string;
  imageUrl?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  translation: string;
  latin: string;
  numberInSurah: number;
  audio?: string;
}

export interface DoaItem {
  id: string;
  title: string;
  category: 'Harian' | 'Salat' | 'Ramadhan' | 'Rezeki' | 'Perlindungan';
  arabic: string;
  latin: string;
  translation: string;
  source: string;
}

export interface HadisItem {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  narrator: string;
  source: string;
}

export interface PrayerTimeData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  dateStr: string;
  hijriDate: string;
  city: string;
}

export type ColorPalette = 'emerald_green' | 'emerald_gold' | 'deep_blue' | 'sky_blue' | 'navy_gold' | 'royal_gold';

export type ThemeMode = 'light' | 'dark';

export type UserRole = 'jamaah' | 'pengurus_dkm';

export interface UserSession {
  isLoggedIn: boolean;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  voucherNo: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description: string;
  category: 'Zakat' | 'Infaq' | 'Wakaf' | 'Amil' | 'Operasional';
  proofUrl?: string;
}

export interface GeneralLedgerAccount {
  code: string;
  name: string;
  category: 'Aset' | 'Kewajiban' | 'Penerimaan ZISWAF' | 'Beban Operasional';
  initialBalance: number;
  totalDebit: number;
  totalCredit: number;
  endingBalance: number;
}

export interface PettyCashEntry {
  id: string;
  date: string;
  refNo: string;
  purpose: string;
  picName: string;
  type: 'Pencairan' | 'Pengeluaran';
  amount: number;
  remainingBalance: number;
  receiptProof?: string;
  proofUrl?: string;
}

export interface AppAdminSettings {
  showAiAssistant: boolean;
  showTvSignageOption: boolean;
  showQuranModule: boolean;
  showLiveMutations: boolean;
  showTargetDonationBar: boolean;
  allowAnonymousDonation: boolean;
  runningTextTv: string;
  goldNisabPrice: number;
  bankAccountBsi: string;
  bankAccountBca: string;
  qrisMerchantName: string;
  iqamahCountdownMinutes: number;
  masjidLogoUrl?: string;
  masjidHeroPhotoUrl?: string;
  qrisCodeImageUrl?: string;
  // Friday Khutbah & Feature Info Settings
  jumatKhatibName?: string;
  jumatImamName?: string;
  jumatMuadzinName?: string;
  jumatTopicTitle?: string;
  jumatTimeInfo?: string;
  masjidAddressInfo?: string;
  masjidPhoneContact?: string;
  featureInfoAnnouncement?: string;
}
