import React, { useState } from 'react';
import { BookOpen, Calculator, CheckCircle2, ShieldAlert, Sparkles, HelpCircle, HeartHandshake, FileText, ArrowRight } from 'lucide-react';

interface EdukasiZiswafSectionProps {
  isDark?: boolean;
  onOpenCalculator?: () => void;
  onSelectCategoryDonate?: (cat: 'zakat' | 'infaq' | 'shadaqah' | 'wakaf') => void;
}

export const EdukasiZiswafSection: React.FC<EdukasiZiswafSectionProps> = ({
  isDark = false,
  onOpenCalculator,
  onSelectCategoryDonate
}) => {
  const [activeEduTab, setActiveEduTab] = useState<'zakat' | 'infaq' | 'shadaqah' | 'wakaf' | 'fidyah'>('zakat');

  const eduItems = {
    zakat: {
      title: 'Zakat (Fitrah & Maal)',
      arabic: 'الزَّكَاةُ',
      subtitle: 'Kewajiban Pokok Rukun Islam Ketiga',
      dalil: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ',
      dalilTrans: '"Dan dirikanlah shalat, tunaikanlah zakat, dan ruku\'lah rukuk bersama orang-orang yang ruku\'." (QS. Al-Baqarah: 43)',
      explanation: `Zakat adalah bagian dari harta tertentu yang wajib dikeluarkan oleh seorang muslim apabila telah mencapai syarat-syarat yang ditetapkan oleh syariat (mencapai nisab & haul). Zakat disalurkan khusus kepada 8 Asnaf (delapan golongan penerima zakat) sesuai Al-Qur'an Surah At-Taubah ayat 60.`,
      kinds: [
        {
          name: 'Zakat Maal (Harta)',
          desc: 'Zakat atas kepemilikan emas, perak, tabungan, investasi, perdagangan, dan pendapatan bulanan. Syarat: Mencapai Nisab 85 gr Emas (sekitar Rp 119.000.000) dan telah genap 1 tahun (haul). Kadar: 2.5%.'
        },
        {
          name: 'Zakat Fitrah',
          desc: 'Zakat jiwa yang wajib ditunaikan oleh setiap muslim pada bulan Ramadhan hingga sebelum Shalat Idul Fitri. Besaran: 2.5 kg beras atau makanan pokok / senilai Rp 45.000 per jiwa.'
        },
        {
          name: 'Zakat Penghasilan / Profesi',
          desc: 'Zakat atas gaji/penghasilan bulanan yang telah melebihi nisab bulanan (setara 85 gr emas / 12 bulan). Dikalkulasi 2.5% dari pendapatan bersih.'
        }
      ],
      asnaf: ['Fakir', 'Miskin', 'Amil', 'Muallaf', 'Riqab (Hamba Sahaya)', 'Gharimin (Orang Berutang)', 'Fi Sabilillah', 'Ibnu Sabil (Musafir)']
    },
    infaq: {
      title: 'Infaq',
      arabic: 'الإِنْفَاقُ',
      subtitle: 'Membelanjakan Harta untuk Kemaslahatan Umat',
      dalil: 'الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِنْدَ رَبِّهِمْ',
      dalilTrans: '"Orang-orang yang menafkahkan hartanya di malam dan di siang hari secara tersembunyi dan terang-terangan, maka mereka mendapat pahala di sisi Tuhannya." (QS. Al-Baqarah: 274)',
      explanation: `Infaq secara bahasa berarti mengeluarkan atau membelanjakan harta. Secara syariah, Infaq adalah pemberian sukarela yang dikeluarkan seseorang untuk kepentingan ibadah, dakwah, operasional masjid, fasilitas air bersih, serta membantu sesama tanpa terikat nisab atau haul tertentu.`,
      kinds: [
        {
          name: 'Infaq Operasional Masjid',
          desc: 'Membantu biaya listrik, pemeliharaan AC, kebersihan, dan kenyamanan ibadah di Masjid Az-Zikra.'
        },
        {
          name: 'Infaq Jumat Khusus',
          desc: 'Kotak infaq jamaah shalat Jumat yang digunakan untuk program kemakmuran masjid dan konsumsi jamaah.'
        },
        {
          name: 'Infaq Dakwah & Kajian',
          desc: 'Mendukung operasional kajian rutin, santunan mubaligh, dan siaran live streaming dakwah.'
        }
      ]
    },
    shadaqah: {
      title: 'Shadaqah (Sedekah)',
      arabic: 'الصَّدَقَةُ',
      subtitle: 'Bukti Keimanan & Kebaikan yang Luas',
      dalil: 'مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنْبُلَةٍ مِائَةُ حَبَّةٍ',
      dalilTrans: '"Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji." (QS. Al-Baqarah: 261)',
      explanation: `Shadaqah berasas dari kata 'Shidq' yang berarti kebenaran/kejujuran iman. Sedekah tidak terbatas pada materi/uang saja, namun mencakup setiap perbuatan baik seperti tersenyum kepada sesama, membantu fisik, ilmu yang bermanfaat, hingga menyingkirkan duri di jalan.`,
      kinds: [
        {
          name: 'Sedekah Subuh & Makanan',
          desc: 'Sedekah yang ditunaikan di awal hari untuk mendoakan keberkahan rezeki dan kesehatan keluarga.'
        },
        {
          name: 'Sedekah Non-Materi',
          desc: 'Tenaga, ilmu, hafalan Al-Qur\'an, senyuman ramah, dan pertolongan fisik kepada sesama muslim.'
        },
        {
          name: 'Sedekah Jariyah',
          desc: 'Sedekah yang pahalanya terus mengalir meskipun orang yang bersedekah telah meninggal dunia.'
        }
      ]
    },
    wakaf: {
      title: 'Wakaf (Uang & Aset)',
      arabic: 'الْوَقْفُ',
      subtitle: 'Pahala Abadi Mengalir Tiada Putus',
      dalil: 'إِذَا مَاتَ ابْنُ آدَمَ انْقَطَعَ عَمَلُهُ إِلاَّ مِنْ ثَلاَثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
      dalilTrans: '"Apabila manusia meninggal dunia maka terputuslah amalnya kecuali tiga perkara: sedekah jariyah (wakaf), ilmu yang bermanfaat, atau anak sholeh yang mendoakannya." (HR. Muslim)',
      explanation: `Wakaf adalah menahan pokok suatu harta yang tahan lama (seperti tanah, bangunan, peralatan, atau wakaf uang) dan menyerahkan manfaatnya untuk jalan Allah secara permanen. Harta wakaf tidak boleh dijual, diwariskan, atau dihibahkan.`,
      kinds: [
        {
          name: 'Wakaf Tunai / Uang Produktif',
          desc: 'Wakaf dalam bentuk nominal uang yang dikelola DKM secara produktif untuk fasilitas masjid & usaha syariah.'
        },
        {
          name: 'Wakaf Sarana & Fasilitas',
          desc: 'Wakaf sound system, karpet shalat, Al-Qur\'an hafalan, pendingin ruangan (AC), dan aula Al-Hambra.'
        },
        {
          name: 'Wakaf Tanah / Bangunan',
          desc: 'Wakaf lahan perluasan masjid, gedung Rumah Tahfidz, dan Mualaf Center Az-Zikra.'
        }
      ]
    },
    fidyah: {
      title: 'Fidyah Puasa',
      arabic: 'الْفِدْيَةُ',
      subtitle: 'Pengganti Puasa bagi Kondisi Khusus',
      dalil: 'وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ',
      dalilTrans: '"Dan wajib bagi orang-orang yang berat menjalankannya (jika mereka tidak berpuasa) membayar fidyah, (yaitu): memberi makan seorang miskin." (QS. Al-Baqarah: 184)',
      explanation: `Fidyah adalah denda syariat berupa pemberian makanan pokok/santunan kepada fakir miskin sebagai ganti dari puasa Ramadhan yang ditinggalkan oleh orang yang sudah tua renta, sakit menahun tak ada harapan sembuh, atau ibu hamil/menyusui dengan pertimbangan syar'i.`,
      kinds: [
        {
          name: 'Ketentuan Besaran Fidyah',
          desc: '1 Mud makanan pokok (sekitar 675 gram beras) atau dikonversi dengan paket makanan siap saji + lauk layak senilai Rp 45.000 / hari puasa.'
        },
        {
          name: 'Golongan Wajib Fidyah',
          desc: 'Lansia yang tidak mampu berpuasa, penderita sakit berat menahun, dan wanita hamil/menyusui yang mengkhawatirkan keselamatan bayinya.'
        }
      ]
    }
  };

  const currentInfo = eduItems[activeEduTab];

  return (
    <section className="py-12 bg-[#022C22] border-y border-emerald-900 text-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-widest">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Edukasi & Literasi Syariah Umat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
            Panduan Lengkap Zakat, Infaq, Shadaqah, Wakaf & Fidyah
          </h2>
          <p className="text-sm text-emerald-100/80">
            Pelajari perbedaan, hukum, nisab, dan tata cara penunaian ZISWAF yang sah sesuai Al-Qur'an dan As-Sunnah.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {(['zakat', 'infaq', 'shadaqah', 'wakaf', 'fidyah'] as const).map(tabKey => (
            <button
              key={tabKey}
              onClick={() => setActiveEduTab(tabKey)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 border ${
                activeEduTab === tabKey
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg scale-105 font-extrabold'
                  : 'bg-emerald-950 text-emerald-200/80 border-emerald-900 hover:text-white hover:bg-emerald-900'
              }`}
            >
              {tabKey}
            </button>
          ))}
        </div>

        {/* Selected Topic Content Display */}
        <div className="bg-emerald-950/80 border border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
          
          {/* Header Title & Arabic */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block">
                {currentInfo.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                {currentInfo.title}
              </h3>
            </div>
            <span className="text-3xl sm:text-4xl font-serif text-amber-300 font-bold tracking-wider self-start md:self-auto">
              {currentInfo.arabic}
            </span>
          </div>

          {/* Dalil Card */}
          <div className="bg-emerald-950 border-l-4 border-amber-400 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold font-mono uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Dalil Al-Qur'an / As-Sunnah:</span>
            </div>
            <p className="text-right text-lg sm:text-xl font-serif text-amber-200 leading-loose">
              {currentInfo.dalil}
            </p>
            <p className="text-xs text-emerald-100/90 italic font-sans leading-relaxed">
              {currentInfo.dalilTrans}
            </p>
          </div>

          {/* Explanation Text */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-300 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Pengertian & Hukum Syariah:</span>
            </h4>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              {currentInfo.explanation}
            </p>
          </div>

          {/* Kinds / Types Breakdown */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-300 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4" />
              <span>Bentuk & Jenis Penunaian:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentInfo.kinds.map((kind, idx) => (
                <div key={idx} className="bg-emerald-950 p-4 rounded-2xl border border-emerald-800 space-y-2 hover:border-amber-400/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <h5 className="font-bold text-white text-xs sm:text-sm font-serif">
                      {kind.name}
                    </h5>
                  </div>
                  <p className="text-xs text-emerald-200/70 leading-relaxed">
                    {kind.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Asnaf Penerima (If Zakat) */}
          {activeEduTab === 'zakat' && currentInfo.asnaf && (
            <div className="bg-emerald-950 border border-emerald-700/60 p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase text-amber-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>8 Asnaf Penerima Zakat Sesuai Surah At-Taubah Ayat 60:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentInfo.asnaf.map((asn, i) => (
                  <span key={i} className="bg-emerald-900 text-emerald-100 border border-emerald-700 text-xs px-3 py-1 rounded-xl font-mono">
                    {i + 1}. {asn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {onOpenCalculator && activeEduTab === 'zakat' && (
              <button
                onClick={onOpenCalculator}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Calculator className="w-4 h-4" />
                <span>Hitung Kalkulator Zakat Saya</span>
              </button>
            )}

            {onSelectCategoryDonate && activeEduTab !== 'fidyah' && (
              <button
                onClick={() => onSelectCategoryDonate(activeEduTab as any)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg ml-auto border border-emerald-400/30"
              >
                <span>Salurkan {currentInfo.title} Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Comparison Summary Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-sm font-bold font-serif text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-300" />
            <span>Ringkasan Perbedaan ZISWAF at a Glance:</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 px-3">Instrumen</th>
                  <th className="py-2 px-3">Hukum</th>
                  <th className="py-2 px-3">Nisab / Syarat</th>
                  <th className="py-2 px-3">Penerima</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-amber-300">Zakat Maal</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">Wajib (Fardhu 'Ain)</td>
                  <td className="py-2.5 px-3">Nisab 85 gr emas & Haul 1 thn</td>
                  <td className="py-2.5 px-3">Khusus 8 Asnaf</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-amber-300">Zakat Fitrah</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">Wajib di Ramadhan</td>
                  <td className="py-2.5 px-3">2.5 kg beras / Rp 45.000 / jiwa</td>
                  <td className="py-2.5 px-3">Fakir & Miskin utama</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-amber-300">Infaq & Shadaqah</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">Sunnah Muakkadah</td>
                  <td className="py-2.5 px-3">Bebas tanpa nisab/haul</td>
                  <td className="py-2.5 px-3">Umum, Masjid, Dhuafa</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-emerald-300">Wakaf</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-300">Sunnah / Jariyah Abadi</td>
                  <td className="py-2.5 px-3">Harta tahan lama / uang produktif</td>
                  <td className="py-2.5 px-3">Mauquf 'Alaih (Umat)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
