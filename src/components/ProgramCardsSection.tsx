import React, { useState } from 'react';
import { Program, ProgramCategory } from '../types';
import { formatRupiah, formatRupiahFull } from '../lib/islamicUtils';
import {
  HeartHandshake,
  Users,
  Flame,
  Building2,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  PieChart,
  CheckCircle2,
  ArrowRight,
  FileText
} from 'lucide-react';

interface ProgramCardsSectionProps {
  programs: Program[];
  openDonationForProgram: (program?: Program | string) => void;
  onSelectProgramDetail?: (program: Program) => void;
  totalCollected: number;
  activeDonors: number;
  totalDisbursed: number;
  efficiencyRate: number;
  openDonationModal: (category?: string) => void;
  openCalculator: () => void;
  openCatalogPdf?: () => void;
}

export const ProgramCardsSection: React.FC<ProgramCardsSectionProps> = ({
  programs,
  openDonationForProgram,
  onSelectProgramDetail,
  totalCollected,
  activeDonors,
  totalDisbursed,
  efficiencyRate,
  openDonationModal,
  openCalculator,
  openCatalogPdf
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPrograms = programs.filter(prog => {
    const matchesCategory = selectedCategory === 'semua' || prog.category === selectedCategory;
    const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-emerald-900/50 text-emerald-100 border-b border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* KPI Metrics Dashboard Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
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

        {/* Hero Title & Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-8 border-b border-emerald-800/50">
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


        {/* Benchmark Inspired Header */}
        <div className="text-center pt-8 pb-4">
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            Daftar Program
          </h2>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-950/80 p-3 rounded-2xl border border-emerald-800">
          <div className="relative w-full sm:w-2/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <input
              type="text"
              placeholder="Cari program donasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-emerald-900 border border-emerald-800 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-sm text-white outline-none"
            />
          </div>
          
          <div className="w-full sm:w-1/3 flex justify-end">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto bg-emerald-900 border border-emerald-800 focus:border-amber-400 rounded-xl px-4 py-2 text-sm text-white outline-none cursor-pointer appearance-none"
            >
              <option value="semua">Semua Kategori</option>
              <option value="infaq">Infaq & Shadaqah</option>
              <option value="wakaf">Wakaf Produktif</option>
              <option value="zakat">Zakat Maal</option>
            </select>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map(prog => {
            const percentage = Math.min(100, Math.round((prog.collectedAmount / prog.targetAmount) * 100));

            return (
              <div
                key={prog.id}
                className="bg-emerald-900/90 border border-emerald-800 rounded-2xl overflow-hidden hover:border-emerald-400/60 transition-all flex flex-col group shadow-md"
              >
                {/* Image Banner */}
                <div 
                  onClick={() => onSelectProgramDetail && onSelectProgramDetail(prog)}
                  className="relative h-48 overflow-hidden bg-emerald-950 cursor-pointer"
                >
                  <img
                    src={prog.imageUrl}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />

                  {/* Badge Category */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-emerald-600 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow">
                      {prog.category}
                    </span>
                    {prog.isUrgent && (
                      <span className="bg-rose-600 text-white font-mono font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                        <Flame className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">
                      {prog.subtitle}
                    </span>
                    <h3 
                      onClick={() => onSelectProgramDetail && onSelectProgramDetail(prog)}
                      className="text-lg font-serif font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {prog.title}
                    </h3>
                    <p className="text-emerald-300 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {prog.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectProgramDetail && onSelectProgramDetail(prog)}
                      className="mt-2 text-[11px] text-emerald-300 font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Rincian Program Lengkap</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Progress Bar & Amount */}
                  <div className="space-y-3 pt-3 border-t border-emerald-800">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span className="text-emerald-400">Terkumpul</span>
                        <span className="text-amber-400">
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-emerald-950 rounded-full h-2 overflow-hidden border border-emerald-800">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Terkumpul:</p>
                        <p className="text-white font-bold font-mono text-sm">
                          {formatRupiah(prog.collectedAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Target:</p>
                        <p className="text-emerald-300 font-mono text-xs font-bold">
                          {formatRupiah(prog.targetAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Donors Count */}
                    <div className="flex items-center justify-between text-xs text-emerald-300 pt-1">
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{prog.donorsCount.toLocaleString('id-ID')} Donatur</span>
                      </div>
                      <span className="text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-amber-300" /> Verifikasi DKM
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => openDonationForProgram(prog)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer mt-2 border border-emerald-400/30"
                    >
                      <HeartHandshake className="w-4 h-4 text-amber-300" />
                      <span>Wakaf / Donasi Sekarang</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
