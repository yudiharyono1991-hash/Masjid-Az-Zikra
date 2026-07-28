import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SejarahTazkiaSectionProps {
  isDark?: boolean;
}

export const SejarahTazkiaSection: React.FC<SejarahTazkiaSectionProps> = ({ isDark }) => {
  const goHome = () => {
    window.location.hash = '#beranda';
    window.location.reload();
  };

  return (
    <section className={`min-h-screen font-sans pb-8 ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'}`}>
      {/* Header */}
      <div className="bg-[#1e3a8a] text-white py-10 px-4 text-center relative flex flex-col items-center justify-center">
        <button 
          onClick={goHome}
          className="absolute left-4 sm:left-8 bg-white/10 hover:bg-white/20 text-white px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors border border-white/20 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Kembali ke Beranda</span>
          <span className="sm:hidden">Kembali</span>
        </button>
        <p className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-blue-300 mb-2 uppercase">Tentang Kami</p>
        <h1 className="text-xl sm:text-3xl font-serif font-bold">Profil Masjid Tazkia</h1>
      </div>

      <div className="w-full h-[85vh] bg-gray-50 border-t-4 border-amber-500">
        <iframe 
          src="https://www.masjidtazkia.com/profil"
          className="w-full h-full border-0"
          title="Profil Masjid Tazkia"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        ></iframe>
      </div>
    </section>
  );
};
