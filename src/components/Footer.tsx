import React from 'react';
import { TazkiaBrandLogo } from './TazkiaBrandLogo';
import {
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  BookOpen,
  Calendar,
  Sparkles,
  FileText,
  UserCheck
} from 'lucide-react';

interface FooterProps {
  openDonationModal: () => void;
  openCalculator: () => void;
  openDigitalIbadah: (tab?: 'quran' | 'salat' | 'kiblat') => void;
  openTvMode: () => void;
  openCatalogPdf?: () => void;
  isDark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  openDonationModal,
  openCalculator,
  openDigitalIbadah,
  openTvMode,
  openCatalogPdf,
  isDark = false
}) => {
  return (
    <footer className={`pt-16 pb-12 border-t transition-colors ${isDark ? 'bg-[#172554] text-white border-blue-900' : 'bg-stone-50 text-blue-900 border-blue-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <TazkiaBrandLogo variant="navbar" isDark={isDark} />

            <p className={`text-xs leading-relaxed font-sans transition-colors ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              Pusat ibadah, ZISWAF transparan, dan pelayanan umat di Sentul City, Bogor.
            </p>

            <div className={`pt-2 text-xs space-y-1.5 font-mono transition-colors ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">Jl. Ir. H. Djuanda No. 78 Sentul City, Bogor Indonesia</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>0858 1000 8899 (WA / Telp Sekretariat DKM)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>masjidtazkia@tazkia.ac.id</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigasi Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-blue-800 pb-2">
              Layanan Jamaah
            </h4>
            <ul className="space-y-2 text-xs font-medium text-blue-300">
              <li>
                <button onClick={openDonationModal} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>Donasi Zakat, Infaq & Wakaf</span>
                </button>
              </li>
              <li>
                <button onClick={openCalculator} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kalkulator ZISWAF Syariah</span>
                </button>
              </li>
              <li>
                <button onClick={() => openDigitalIbadah('quran')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Al-Qur'an Digital Audio Murottal</span>
                </button>
              </li>
              <li>
                <button onClick={() => openDigitalIbadah('salat')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Jadwal Shalat & Adzan</span>
                </button>
              </li>
              {openCatalogPdf && (
                <li>
                  <button onClick={openCatalogPdf} className="hover:text-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer text-blue-400 font-bold">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>Katalog Perancangan Aplikasi (PDF)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Program Operasional */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-blue-800 pb-2">
              Program Operasional Masjid
            </h4>
            <ul className={`space-y-2 text-xs font-medium transition-colors ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              <li>&bull; Santunan Yatim Piatu</li>
              <li>&bull; Wakaf Masjid</li>
              <li>&bull; Santunan Dhuafa</li>
            </ul>
          </div>

          {/* Col 4: Pengurus DKM */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-blue-800 pb-2">
              Pengurus DKM
            </h4>
            <div className={`space-y-2 text-xs transition-colors ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              <p className="flex items-start gap-2">
                <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-blue-100">Dewan Pembina:</strong> Prof. Dr. M. Syafii Antonio
                </span>
              </p>
              <p className="flex items-start gap-2">
                <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-blue-100">Direktur / Ketua DKM:</strong> Syarifudin Kusin
                </span>
              </p>
              <p className="pl-5 leading-relaxed opacity-90">
                Akses petugas: Ketua DKM, Bendahara, Bagian Penghimpunan, Bagian Penyaluran.
              </p>
            </div>

            <button
              onClick={openTvMode}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-mono font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all border border-blue-500/40 mt-4"
            >
              <span>Tampilkan Mode TV Masjid</span>
            </button>
          </div>
        </div>

        {/* Bottom: Salam & Identitas Resmi */}
        <div className={`rounded-2xl border p-6 space-y-4 ${isDark ? 'bg-blue-950/50 border-blue-800' : 'bg-white border-blue-200'}`}>
          <p className={`text-sm font-serif italic leading-relaxed ${isDark ? 'text-amber-200' : 'text-blue-800'}`}>
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh.
          </p>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            Aplikasi digital <strong>Masjid Tazkia</strong> hadir untuk memudahkan jamaah dalam ber-ZISWAF,
            memantau transparansi keuangan, serta mengakses layanan ibadah dan informasi masjid secara modern dan amanah.
          </p>
          <div className={`grid sm:grid-cols-2 gap-3 text-[11px] font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            <p><span className="text-amber-400 font-bold">Nama Masjid:</span> Masjid Tazkia</p>
            <p><span className="text-amber-400 font-bold">Direktur / Ketua DKM:</span> Syarifudin Kusin</p>
            <p className="sm:col-span-2"><span className="text-amber-400 font-bold">Alamat:</span> Jl. Ir. H. Djuanda No. 78 Sentul City, Bogor Indonesia</p>
            <p><span className="text-amber-400 font-bold">Email:</span> masjidtazkia@tazkia.ac.id</p>
            <p><span className="text-amber-400 font-bold">Telp / WA:</span> 0858 1000 8899</p>
          </div>
        </div>

        <div className="pt-4 border-t border-blue-800 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-400 gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-blue-200 tracking-wide text-xs sm:text-sm">
              &copy; 2026 Masjid Tazkia. All Rights Reserved.
            </p>
            <p className="text-[11px] text-blue-400">
              Jl. Ir. H. Djuanda No. 78 Sentul City, Bogor Indonesia
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider bg-blue-900/80 px-4 py-2 rounded-xl border border-blue-800">
            <span>ZISWAF</span>
            <span className="opacity-40">&bull;</span>
            <span>Al-Qur&apos;an Digital</span>
            <span className="opacity-40">&bull;</span>
            <span>Katalog PDF</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
