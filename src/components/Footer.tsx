import React from 'react';
import { AzzikraBrandLogo } from './AzzikraBrandLogo';
import {
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  Shield,
  BookOpen,
  Calendar,
  Sparkles,
  FileText,
  History
} from 'lucide-react';

interface FooterProps {
  openDonationModal: () => void;
  openCalculator: () => void;
  openDigitalIbadah: (tab?: 'quran' | 'salat' | 'kiblat') => void;
  openTvMode: () => void;
  openCatalogPdf?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  openDonationModal,
  openCalculator,
  openDigitalIbadah,
  openTvMode,
  openCatalogPdf
}) => {
  return (
    <footer className="bg-[#022C22] text-white border-t border-emerald-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <AzzikraBrandLogo variant="navbar" isDark={true} />

            <p className="text-xs text-emerald-300 leading-relaxed font-sans">
              Pusat Zikir Akbar, Pendidikan Pesantren, Muallaf Center, dan Transaksi ZISWAF yang transparan serta amanah.
            </p>

            <div className="pt-2 text-xs text-emerald-300 space-y-1.5 font-mono">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">Kampung Sunnah Az-Zikra, Bukit Sentul, Babakan Madang, Bogor 16810</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+62 812-9876-5432 (Sekretariat DKM Az-Zikra)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>ziswaf@azzikra-sentul.or.id</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigasi Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-emerald-800 pb-2">
              Layanan Jamaah
            </h4>
            <ul className="space-y-2 text-xs font-medium text-emerald-300">
              <li>
                <button onClick={openDonationModal} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>Donasi Zakat, Infaq & Wakaf</span>
                </button>
              </li>
              <li>
                <button onClick={openCalculator} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kalkulator ZISWAF Syariah</span>
                </button>
              </li>
              <li>
                <button onClick={() => openDigitalIbadah('quran')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Al-Qur'an Digital Audio Murottal</span>
                </button>
              </li>
              <li>
                <button onClick={() => openDigitalIbadah('salat')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Jadwal Shalat & Adzan Sentul</span>
                </button>
              </li>
              {openCatalogPdf && (
                <li>
                  <button onClick={openCatalogPdf} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-400 font-bold">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Katalog Perancangan Application (PDF)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Program Keumatan */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-emerald-800 pb-2">
              Program Unggulan
            </h4>
            <ul className="space-y-2 text-xs text-emerald-300 font-medium">
              <li>&bull; Operasional Masjid (Az-Zikra)</li>
              <li>&bull; Santunan Yatim Piatu</li>
              <li>&bull; Wakaf Masjid (Pemeliharaan & Pengembangan)</li>
              <li>&bull; Santunan Dhuafa (& Fakir Miskin)</li>
              <li>&bull; Patungan Qurban Idul Adha</li>
            </ul>
          </div>

          {/* Col 4: Akuntabilitas & Display TV */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-emerald-800 pb-2">
              Layar TV Signage
            </h4>
            <p className="text-xs text-emerald-300 leading-relaxed font-sans">
              Buka tampilan khusus Digital Signage TV Masjid Az-Zikra Sentul untuk diproyeksikan pada TV utama masjid.
            </p>

            <button
              onClick={openTvMode}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-mono font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all border border-emerald-500/40"
            >
              <span>Tampilkan Mode TV Masjid</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright - Precision Mobile Design */}
        <div className="pt-8 border-t border-emerald-800 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400 gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-emerald-200 tracking-wide text-xs sm:text-sm">
              &copy; 2026 Masjid Az-Zikra. All Rights Reserved.
            </p>
            <p className="text-[11px] text-emerald-400">
              Kampung Sunnah Az-Zikra, Bukit Sentul, Babakan Madang, Kabupaten Bogor, Jawa Barat.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider bg-emerald-900/80 px-4 py-2 rounded-xl border border-emerald-800">
            <span>Dzikir &amp; ZISWAF</span>
            <span className="opacity-40">&bull;</span>
            <span>Al-Qur'an Audio</span>
            <span className="opacity-40">&bull;</span>
            <span>Katalog PDF</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
