import React from 'react';
import { PetugasJadwal } from '../types';
import { Calendar, UserCheck, Mic, Clock, Sparkles, BookOpen, Share2, CheckCircle2, ShieldAlert, Volume2 } from 'lucide-react';

interface FridayAgendaSectionProps {
  petugasList: PetugasJadwal[];
  isDark?: boolean;
}

export const FridayAgendaSection: React.FC<FridayAgendaSectionProps> = ({
  petugasList = [],
  isDark = false
}) => {
  // Find current active Friday agenda or fallback to first item
  const currentFriday = petugasList.find(p => p.khatibJumat && p.dayName.toLowerCase().includes('jumat')) || petugasList[0] || {
    id: 'jumat-default',
    date: '2026-07-31',
    dayName: 'Jumat Ini',
    khatibJumat: 'Prof. Dr. KH. Nasaruddin Umar, MA',
    imamJumat: 'Ustadz H. M. Zainuddin, Sq',
    muadzinJumat: 'Ustadz Bilal Al-Habsyi',
    bilalJumat: 'Ustadz Ridwan Syah, S.Pd.I',
    topikJumat: 'Keberkahan Rezeki dalam Zakat, Wakaf Produktif & Spirit Qurban',
    timeJumat: '11:45 WIB - Selesai',
    notesJumat: 'Jamaah diimbau hadir lebih awal, mengambil wudhu dari rumah, dan menjaga kerapian shaf shalat.'
  };

  const handleShare = () => {
    const text = `Agenda Shalat Jumat Masjid Az-Zikra Sentul:\n📅 ${currentFriday.date}\n🎙️ Khatib: ${currentFriday.khatibJumat}\n📖 Imam: ${currentFriday.imamJumat}\n📢 Topik: "${currentFriday.topikJumat}"`;
    if (navigator.share) {
      navigator.share({ title: 'Agenda Jumat Masjid Az-Zikra Sentul', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Agenda Jumat berhasil disalin ke papan klip!');
    }
  };

  return (
    <section className="py-12 bg-[#022C22] text-white border-b border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-widest">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Jadwal Ibadah & Khutbah Jumat</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-2">
              Agenda Shalat Jumat Masjid Az-Zikra
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
              Informasi lengkap Khatib, Imam, Muadzin, Bilal, serta Tema Khutbah Jumat pekan ini.
            </p>
          </div>

          <button
            onClick={handleShare}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-lg shrink-0 self-start sm:self-auto border border-emerald-400/30"
          >
            <Share2 className="w-4 h-4 text-amber-300" />
            <span>Bagikan Agenda Ke Jamaah</span>
          </button>
        </div>

        {/* Featured Friday Highlight Card */}
        <div className="relative bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#064E3B] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Graphic */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-8">
            
            {/* Top Bar Date & Time */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-700 text-white font-mono text-xs font-extrabold uppercase px-3 py-1 rounded-xl shadow-md border border-emerald-500">
                  {currentFriday.dayName || 'Jumat Utama'}
                </span>
                <span className="text-xs sm:text-sm font-bold font-mono text-emerald-100">
                  Tanggal: {currentFriday.date}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-emerald-950/80 px-4 py-1.5 rounded-xl border border-emerald-800 text-xs font-mono text-amber-300">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span>Waktu Panggilan: {currentFriday.timeJumat || '11:45 WIB - Selesai'}</span>
              </div>
            </div>

            {/* Topik Khutbah Display */}
            <div className="bg-emerald-950/90 p-5 rounded-2xl border border-emerald-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Judul / Topik Khutbah Jumat:</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white leading-tight">
                "{currentFriday.topikJumat || 'Pentingnya Menjaga Ukhuwah & Ketakwaan Dalam Kehidupan Sehari-hari'}"
              </h3>
            </div>

            {/* Grid of Petugas (Khatib, Imam, Muadzin, Bilal) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Khatib Card */}
              <div className="bg-emerald-950 p-4 rounded-2xl border border-emerald-800 space-y-2 hover:border-amber-400/50 transition-colors">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold uppercase">
                  <Mic className="w-4 h-4" />
                  <span>Khatib Jumat:</span>
                </div>
                <h4 className="font-bold font-serif text-white text-sm sm:text-base leading-snug">
                  {currentFriday.khatibJumat || 'Prof. Dr. KH. Nasaruddin Umar, MA'}
                </h4>
                <p className="text-[11px] text-emerald-200/70">Penyampai Khutbah & Nasihat Agama</p>
              </div>

              {/* Imam Card */}
              <div className="bg-emerald-950 p-4 rounded-2xl border border-emerald-800 space-y-2 hover:border-amber-400/50 transition-colors">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-bold uppercase">
                  <UserCheck className="w-4 h-4" />
                  <span>Imam Shalat:</span>
                </div>
                <h4 className="font-bold font-serif text-white text-sm sm:text-base leading-snug">
                  {currentFriday.imamJumat || 'Ustadz H. M. Zainuddin, Sq'}
                </h4>
                <p className="text-[11px] text-emerald-200/70">Imam Shalat Jumat Berjamaah</p>
              </div>

              {/* Muadzin Card */}
              <div className="bg-emerald-950 p-4 rounded-2xl border border-emerald-800 space-y-2 hover:border-amber-400/50 transition-colors">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                  <Volume2 className="w-4 h-4" />
                  <span>Muadzin Jumat:</span>
                </div>
                <h4 className="font-bold font-serif text-white text-sm sm:text-base leading-snug">
                  {currentFriday.muadzinJumat || 'Ustadz Bilal Al-Habsyi'}
                </h4>
                <p className="text-[11px] text-emerald-200/70">Pumandang Adzan & Iqamah</p>
              </div>

              {/* Bilal / MC Card */}
              <div className="bg-emerald-950 p-4 rounded-2xl border border-emerald-800 space-y-2 hover:border-amber-400/50 transition-colors">
                <div className="flex items-center gap-2 text-amber-200 text-xs font-mono font-bold uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Bilal & Petugas:</span>
                </div>
                <h4 className="font-bold font-serif text-white text-sm sm:text-base leading-snug">
                  {currentFriday.bilalJumat || 'Ustadz Ridwan Syah, S.Pd.I'}
                </h4>
                <p className="text-[11px] text-emerald-200/70">Muraqqi & Pemandu Acara</p>
              </div>

            </div>

            {/* Imbauan / Catatan Jamaah */}
            {currentFriday.notesJumat && (
              <div className="bg-emerald-950/80 border border-emerald-700/60 p-4 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold font-mono text-amber-300 uppercase block">Imbauan DKM untuk Jamaah:</span>
                  <p className="text-xs text-emerald-100 mt-0.5 leading-relaxed">
                    {currentFriday.notesJumat}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Schedule Table for Upcoming Fridays */}
        {petugasList.length > 1 && (
          <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold font-mono text-emerald-300 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Jadwal Khutbah Jumat Mendatang:</span>
            </h4>

            <div className="divide-y divide-emerald-900">
              {petugasList.filter(p => p.khatibJumat && p.id !== currentFriday.id).map((p, i) => (
                <div key={p.id || i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-emerald-200/70 font-mono block">{p.date} ({p.dayName})</span>
                    <span className="font-serif font-bold text-white text-sm">{p.topikJumat || 'Khutbah Jumat'}</span>
                  </div>
                  <div className="text-right sm:text-left font-mono">
                    <span className="text-amber-300 font-bold block">Khatib: {p.khatibJumat}</span>
                    <span className="text-emerald-200/70">Imam: {p.imamJumat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
