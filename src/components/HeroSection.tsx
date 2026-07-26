import React from 'react';
import { AzzikraBrandLogo } from './AzzikraBrandLogo';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  PieChart,
  ArrowRight,
  HeartHandshake,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { formatRupiah } from '../lib/islamicUtils';

interface HeroSectionProps {
  totalCollected: number;
  activeDonors: number;
  totalDisbursed: number;
  efficiencyRate: number;
  openDonationModal: (category?: string) => void;
  openCalculator: () => void;
  openDigitalIbadah: (tab?: 'quran' | 'salat' | 'kiblat') => void;
  openCatalogPdf?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalCollected,
  activeDonors,
  totalDisbursed,
  efficiencyRate,
  openDonationModal,
  openCalculator,
  openDigitalIbadah,
  openCatalogPdf
}) => {
  return (
    <section className="relative overflow-hidden bg-[#022C22] text-white py-12 md:py-20 border-b border-emerald-900">
      {/* Background Image of Masjid Az-Zikra Sentul */}
      <div className="absolute inset-0 z-0 opacity-80 bg-cover bg-center scale-105 pointer-events-none transition-transform duration-1000"
           style={{ backgroundImage: `url('/masjid-azzikra-hero.jpg')` }}>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#022C22]/30 via-[#043927]/50 to-[#022C22] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Official Brand Logo Banner */}
        <div className="flex justify-center mb-6">
          <AzzikraBrandLogo variant="large" isDark={true} />
        </div>

        {/* Quick Shortcut Pills Header */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
          <button
            onClick={() => openDigitalIbadah('quran')}
            className="bg-emerald-950/90 hover:bg-emerald-600 hover:text-white text-emerald-100 border border-emerald-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>Al-Qur'an Digital</span>
          </button>
          <button
            onClick={() => openDigitalIbadah('salat')}
            className="bg-emerald-950/90 hover:bg-emerald-600 hover:text-white text-emerald-100 border border-emerald-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>Jadwal Salat & Adzan</span>
          </button>
          <button
            onClick={() => openDigitalIbadah('kiblat')}
            className="bg-emerald-950/90 hover:bg-emerald-600 hover:text-white text-emerald-100 border border-emerald-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300" />
            <span>Arah Kiblat</span>
          </button>
        </div>

        {/* KPI Metrics Dashboard Bar */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {/* Metric 1 */}
          <div className="bg-emerald-950/80 rounded-2xl p-3.5 sm:p-6 border border-emerald-800/80 shadow-md relative overflow-hidden group hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] text-emerald-200 font-mono font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] truncate">
                Dana Terhimpun
              </span>
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-2 sm:mt-4">
              <div className="text-base xs:text-xl sm:text-3xl font-serif font-black text-white tracking-tight truncate">
                {formatRupiah(totalCollected)}
              </div>
              <div className="mt-1 sm:mt-2 flex items-center text-[9px] sm:text-[11px] text-emerald-300 font-mono font-bold">
                <span className="bg-emerald-500/20 px-1 py-0.5 rounded mr-1 border border-emerald-500/30">
                  +8.1%
                </span>
                <span className="hidden xs:inline">Pertumbuhan</span>
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-emerald-950/80 rounded-2xl p-3.5 sm:p-6 border border-emerald-800/80 shadow-md relative overflow-hidden group hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] text-emerald-200 font-mono font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] truncate">
                Muzakki & Donatur
              </span>
              <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-2 sm:mt-4">
              <div className="text-base xs:text-xl sm:text-3xl font-serif font-black text-white tracking-tight truncate">
                {activeDonors.toLocaleString('id-ID')}rb
              </div>
              <div className="mt-1 sm:mt-2 flex items-center text-[9px] sm:text-[11px] text-amber-300 font-mono font-bold">
                <span className="bg-amber-500/20 px-1 py-0.5 rounded mr-1 border border-amber-500/30">
                  +12 Hari Ini
                </span>
                <span className="hidden xs:inline">Jamaah</span>
              </div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-emerald-950/80 rounded-2xl p-3.5 sm:p-6 border border-emerald-800/80 shadow-md relative overflow-hidden group hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] text-emerald-200 font-mono font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] truncate">
                Penyaluran
              </span>
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
                <PieChart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-2 sm:mt-4">
              <div className="text-base xs:text-xl sm:text-3xl font-serif font-black text-white tracking-tight truncate">
                {formatRupiah(totalDisbursed)}
              </div>
              <div className="mt-1 sm:mt-2 flex items-center text-[9px] sm:text-[11px] text-emerald-300 font-mono font-bold">
                <span className="bg-emerald-500/20 px-1 py-0.5 rounded mr-1 border border-emerald-500/30">
                  37.6%
                </span>
                <span className="hidden xs:inline">Mustahik</span>
              </div>
            </div>
          </div>

          {/* Metric 4 - Highlighted Green / Gold Card */}
          <div className="bg-gradient-to-br from-[#064E3B] to-[#022C22] text-white rounded-2xl p-3.5 sm:p-6 border-2 border-amber-400 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] text-amber-300 font-mono font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] truncate">
                Capaian Target
              </span>
              <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-2 sm:mt-4">
              <div className="text-xl xs:text-2xl sm:text-4xl font-serif font-black text-amber-300 tracking-tight">
                {efficiencyRate}%
              </div>
              <div className="mt-2 sm:mt-3">
                <div className="w-full bg-emerald-950/80 rounded-full h-1.5 sm:h-2 overflow-hidden border border-emerald-800">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-1000 shadow-sm"
                    style={{ width: `${efficiencyRate}%` }}
                  />
                </div>
                <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-emerald-200 block mt-1">
                  Target Tahunan
                </span>
              </div>
            </div>
          </div>
        </div>
      \n\n        {/* Hero Title & Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-full shadow-sm">
            Ekosistem Digital Masjid Az-Zikra Sentul
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-serif text-white leading-snug sm:leading-[1.15] tracking-tight drop-shadow-lg">
            Pusat Peradaban Islam &amp; <br className="hidden sm:inline" /> Kesejahteraan Umat
            <span className="block font-serif italic font-semibold text-amber-300 mt-2 text-xl sm:text-4xl lg:text-5xl">
              Melalui Optimalisasi ZISWAF, Dakwah &amp; Zikir
            </span>
          </h1>

          <p className="text-emerald-100 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans px-2">
            Salurkan Zakat, Infaq, Shadaqah, dan Wakaf Anda secara transparan di Masjid Az-Zikra Sentul untuk dakwah, pendidikan pesantren, dan pemberdayaan ekonomi umat.
            <span className="block mt-1.5 font-bold text-amber-300 font-mono text-[10px] sm:text-xs tracking-wider">
              #ZISWAFMasjidAzZikraSentul
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-2">
            <button
              onClick={() => openDonationModal()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer border border-emerald-400/40 w-full sm:w-auto"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Daftar Program / Donasi</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </button>

            <button
              onClick={openCalculator}
              className="bg-emerald-950/90 hover:bg-emerald-900 text-amber-300 border border-amber-500/40 font-bold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hitung Zakat</span>
            </button>

            {openCatalogPdf && (
              <button
                onClick={openCatalogPdf}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md backdrop-blur-sm w-full sm:w-auto"
              >
                <FileText className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Katalog PDF</span>
              </button>
            )}
          </div>
        </div>

</div>
    </section>
  );
};
