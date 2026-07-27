import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Compass, Heart, MapPin, Sparkles, History, Users, ShieldCheck } from 'lucide-react';

interface SejarahTazkiaSectionProps {
  isDark?: boolean;
}

export const SejarahTazkiaSection: React.FC<SejarahTazkiaSectionProps> = ({ isDark = false }) => {
  const [activeTab, setActiveTab] = useState<'sejarah' | 'arsitektur' | 'kegiatan' | 'pendiri'>('sejarah');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const SEJARAH_IMAGES = [
    '/hero-4.jpg',
    '/hero-5.jpg',
    '/hero-6.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SEJARAH_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`py-12 md:py-20 ${isDark ? 'bg-blue-950 text-white' : 'bg-stone-50 text-blue-900'} border-b border-blue-200 dark:border-blue-800 transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">
            <History className="w-3.5 h-3.5" />
            <span>Wisata Religi & Warisan Ulama</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-blue-900 dark:text-white leading-tight">
            Menelusuri Sejarah & Keagungan <br />
            <span className="italic text-blue-700 dark:text-blue-400">Masjid Tazkia</span>
          </h2>

          <p className="text-sm sm:text-base text-blue-600 dark:text-blue-300 leading-relaxed font-sans">
            Pusat Zikir Akbar, Pendidikan Pesantren, dan Syiar Islam Nusantara di Kampung Sunnah Tazkia, Bukit Sentul, Kabupaten Bogor.
          </p>
        </div>

        {/* Feature Banner Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl border border-blue-200 dark:border-blue-800 group min-h-[320px]">
            {SEJARAH_IMAGES.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out group-hover:scale-105 ${
                  idx === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                }`}
                style={{ backgroundImage: `url('${imgUrl}')` }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-500/40 w-fit mb-2">
                Kampung Sunnah Sentul
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Kubah Putih Megah & Menara Menjulang 50 Meter
              </h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-2 line-clamp-2">
                Didirikan di atas lahan seluas 5 hektar di Bukit Sentul, Babakan Madang, Bogor. Mampu menampung hingga 22.000 jamaah Zikir Akbar.
              </p>
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-between">
            <div className="p-6 rounded-3xl bg-white dark:bg-blue-900 border border-blue-200 dark:border-blue-800 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                ??
              </div>
              <div>
                <h4 className="font-serif font-bold text-blue-900 dark:text-white text-base">Lokasi Strategis</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 leading-relaxed">
                  Kampung Sunnah Tazkia, Perumahan Bukit Sentul, Cipambuan, Kec. Babakan Madang, Kab. Bogor, Jawa Barat 16810.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-blue-800 text-white shadow-xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users className="w-24 h-24 text-white" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200 font-bold">
                Kapasitas Jamaah
              </span>
              <h4 className="text-3xl font-serif font-extrabold text-amber-300">
                22.000+ Jamaah
              </h4>
              <p className="text-xs text-blue-100">
                Ruang shalat utama marmer putih bersuasana khusyuk dan sejuk di kaki pegunungan Sentul.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation for History details */}
        <div className="flex border-b border-blue-200 dark:border-blue-800 gap-2 overflow-x-auto pb-1">
          {[
            { id: 'sejarah', label: '1. Sejarah Pendirian', icon: History },
            { id: 'pendiri', label: '2. KH. Muhammad Arifin Ilham', icon: Award },
            { id: 'arsitektur', label: '3. Arsitektur Putih Suci', icon: Compass },
            { id: 'kegiatan', label: '4. Pusat Majelis Zikir Akbar', icon: Users }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-5 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/20'
                    : 'bg-white dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:text-blue-900 border border-blue-200 dark:border-blue-800'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white dark:bg-blue-900 rounded-3xl border border-blue-200 dark:border-blue-800 p-6 sm:p-10 shadow-xl space-y-6">
          {activeTab === 'sejarah' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-blue-900 dark:text-white">
                    Awal Mula Pendirian Masjid Tazkia
                  </h3>
                  <p className="text-xs text-blue-500 font-mono">Pusat Dakwah & Zikir Akbar Sejak Tahun 2009</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed space-y-3 font-sans">
                <p>
                  Masjid Tazkia dibangun atas prakarsa almarhum KH. Muhammad Arifin Ilham bersama Yayasan Majelis Tazkia. Pembangunan masjid ini bermula dari kebutuhan tempat peribadatan yang representatif bagi puluhan ribu jamaah zikir yang selalu memadati kegiatan Zikir Akbar bulanan.
                </p>
                <p>
                  Dengan dukungan dari para donatur internasional, pemerintah, serta jamaah Majelis Tazkia, kompleks masjid ini diresmikan di kawasan Bukit Sentul, Cipambuan, Babakan Madang, Kabupaten Bogor. Kawasan ini kemudian berkembang menjadi **Kampung Sunnah Tazkia**, sebuah pemukiman islami yang dikembangkan dengan mengedepankan nilai-nilai kedamaian, persaudaraan, dan pengamalan sunnah Rasulullah SAW.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-blue-100 dark:border-blue-800">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <p className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">Luas Lahan</p>
                  <p className="text-lg font-bold font-serif text-blue-900 dark:text-white mt-1">± 5 Hektar</p>
                  <p className="text-[11px] text-blue-500 mt-0.5">Termasuk kompleks pesantren & sekolah</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <p className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">Kawasan</p>
                  <p className="text-lg font-bold font-serif text-blue-900 dark:text-white mt-1">Kampung Sunnah</p>
                  <p className="text-[11px] text-blue-500 mt-0.5">Pemukiman bernuansa islami</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <p className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">Layanan Mualaf</p>
                  <p className="text-lg font-bold font-serif text-blue-900 dark:text-white mt-1">Muallaf Center</p>
                  <p className="text-[11px] text-blue-500 mt-0.5">Pembinaan & advokasi ribuan mualaf</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pendiri' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-blue-900 dark:text-white">
                    Almarhum KH. Muhammad Arifin Ilham (Pendiri)
                  </h3>
                  <p className="text-xs text-blue-500 font-mono">Tokoh Pemersatu & Dai Zikir Akbar Indonesia</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed space-y-3 font-sans">
                <p>
                  KH. Muhammad Arifin Ilham dikenal dengan kelembutan tutur kata dan seruan zikirnya yang menggetarkan hati jutaan umat Islam di Indonesia. Beliau mempopulerkan gerakan Zikir Bersama yang dihadiri oleh berbagai lapisan masyarakat, pejabat, ulama, hingga rakyat biasa tanpa sekat.
                </p>
                <p>
                  Pesan mendalam beliau yang selalu diwariskan kepada jamaah Tazkia adalah menjaga 7 Sunnah Harian Rasulullah SAW: Shalat Tahajjud, Membaca Al-Qur'an, Shalat Berjamaah di Masjid, Shalat Dhuha, Bersedekah, Menjaga Wudhu, dan Selalu Berzikir.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <p className="font-bold font-serif text-sm">7 Sunnah Harian Istiqamah Majelis Tazkia:</p>
                <p className="text-[11px] leading-relaxed">
                  1. Shalat Tahajjud &bull; 2. Membaca & Merenungkan Al-Qur'an &bull; 3. Shalat Berjamaah Awal Waktu di Masjid &bull; 4. Shalat Dhuha &bull; 5. Sedekah Harian &bull; 6. Menjaga Wudhu &bull; 7. Istighfar & Zikir Setiap Saat.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'arsitektur' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-blue-900 dark:text-white">
                    Arsitektur Berbalut Warna Putih Suci
                  </h3>
                  <p className="text-xs text-blue-500 font-mono">Desain Klasik Islami & Pencahayaan Alami</p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed space-y-3 font-sans">
                <p>
                  Warna dominan **putih bersih** menjadi ciri khas visual Masjid Tazkia. Warna putih melambangkan kesucian niat, kebersihan jiwa, dan persatuan dalam zikir.
                </p>
                <p>
                  Bangunan utama memiliki kubah raksasa berwarna putih bersih, dikelilingi ornamen kaligrafi Arab yang indah. Menara azan setinggi 50 meter berdiri menjulang di samping masjid, menjadi landmark megah di wilayah Sentul Bogor. Interior ruang shalat dilapisi lantai marmer putih dingin dengan sirkulasi udara alami yang segar.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'kegiatan' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-blue-900 dark:text-white">
                    Pusat Kegiatan Keumatan & Zikrukah Bulanan
                  </h3>
                  <p className="text-xs text-blue-500 font-mono">Dzikir Akbar, Pesantren, dan ZISWAF</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-800 bg-stone-50 dark:bg-blue-950 space-y-1.5">
                  <h4 className="font-bold text-blue-900 dark:text-white font-serif text-sm">Zikir Akbar Ahad Pertama</h4>
                  <p className="text-blue-600 dark:text-blue-400 leading-relaxed">
                    Setiap hari Ahad minggu pertama setiap bulan, puluhan ribu jamaah dari seluruh Indonesia berkumpul untuk menghadiri Dzikir Akbar & Tausiyah Subuh.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-blue-200 dark:border-blue-800 bg-stone-50 dark:bg-blue-950 space-y-1.5">
                  <h4 className="font-bold text-blue-900 dark:text-white font-serif text-sm">Pondok Pesantren Tazkia</h4>
                  <p className="text-blue-600 dark:text-blue-400 leading-relaxed">
                    Mendidik ratusan santri penghafal Al-Qur'an (Tahfidz) dan kader ustadz yang dibekali akhlakul karimah serta jiwa kewirausahaan syariah.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

