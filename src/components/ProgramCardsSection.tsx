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
  ArrowUpRight
} from 'lucide-react';

interface ProgramCardsSectionProps {
  programs: Program[];
  openDonationForProgram: (program: Program) => void;
  onSelectProgramDetail?: (program: Program) => void;
}

export const ProgramCardsSection: React.FC<ProgramCardsSectionProps> = ({
  programs,
  openDonationForProgram,
  onSelectProgramDetail
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Layanan & Program Keumatan
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white">
              Program Unggulan <span className="font-serif italic font-semibold text-amber-400">Masjid Az-Zikra</span>
            </h2>
            <p className="text-emerald-300 text-sm mt-2 max-w-2xl font-sans">
              Pilih program dakwah, pendidikan, sosial, atau wakaf produktif yang ingin Anda dukung secara amanah dan transparan.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Cari program donasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-emerald-900 border border-emerald-700 focus:border-emerald-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Feature Cards Showcase matching PDF Page 2 (Muallaf Center, TPA Anak, Sewa Gedung) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Muallaf Center */}
          <div className="bg-emerald-900/90 border border-emerald-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-all shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
              Muallaf Center
            </h3>
            <p className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider mt-1 mb-3">
              Pembinaan & Dukungan Iman Baru
            </p>
            <p className="text-emerald-300 text-xs leading-relaxed">
              Layanan pendampingan belajar Al-Qur'an, Fiqh dasar, penataan keimanan, serta bantuan sosial kemandirian bagi saudara muallaf.
            </p>
            <button
              onClick={() => setSelectedCategory('shadaqah')}
              className="mt-5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>Lihat Program Muallaf</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: TPA Anak */}
          <div className="bg-emerald-900/90 border border-emerald-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-400/50 transition-all shadow-md">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white group-hover:text-emerald-300 transition-colors">
              TPA Anak & Rumah Tahfidz
            </h3>
            <p className="text-xs text-emerald-300 font-mono font-bold uppercase tracking-wider mt-1 mb-3">
              Pendidikan Al-Qur'an & Akhlak
            </p>
            <p className="text-emerald-300 text-xs leading-relaxed">
              Pendidikan karakter, hafalan juz amma, serta beasiswa santri dhuafa agar terbebas dari buta aksara Al-Qur'an.
            </p>
            <button
              onClick={() => setSelectedCategory('zakat')}
              className="mt-5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>Lihat Beasiswa TPA</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Sewa Gedung Hall */}
          <div className="bg-gradient-to-br from-[#064E3B] to-[#022C22] text-white border-2 border-amber-500/40 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">
              Sewa Gedung Al-Hambra Hall
            </h3>
            <p className="text-xs text-amber-300 font-mono font-bold uppercase tracking-wider mt-1 mb-3">
              Hall Serbaguna Acara Syariah
            </p>
            <p className="text-emerald-200 text-xs leading-relaxed">
              Aula syariah lengkap dengan AC standing, stage, sound system kristal, dan area parkir luas untuk walimah & acara keutamaan.
            </p>
            <button
              onClick={() => setSelectedCategory('infaq')}
              className="mt-5 text-xs font-mono font-bold uppercase tracking-wider text-amber-300 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>Info Reservasi Hall</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-[10px] uppercase tracking-wider">
          {[
            { id: 'semua', label: 'Semua Program' },
            { id: 'wakaf', label: 'Wakaf Tunai' },
            { id: 'zakat', label: 'Zakat Mal & Profesi' },
            { id: 'infaq', label: 'Infaq Dakwah' },
            { id: 'shadaqah', label: 'Shadaqah Sosial' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md border border-emerald-400/50'
                  : 'bg-emerald-900 text-emerald-300 hover:bg-emerald-800 border border-emerald-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
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
