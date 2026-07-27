import React from 'react';
import { Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';

export const SocialMediaSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#022C22] border-t border-emerald-900/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#022C22] to-emerald-950/40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Media Sosial & Dakwah Digital</h2>
          <p className="text-emerald-300 text-sm mt-2 font-sans">Ikuti terus pembaruan berita, kajian, dan aktivitas Masjid Tazkia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/Tazkiamediaofficial/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-gradient-to-br from-pink-600/10 to-[#022C22] border border-pink-500/30 rounded-2xl hover:border-pink-500 hover:-translate-y-1 transition-all group shadow-md"
          >
            <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 group-hover:scale-110 transition-all">
              <Instagram className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">Instagram</h3>
            <p className="text-emerald-300 text-xs mb-5 text-center">@Tazkiamediaofficial</p>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-pink-400 flex items-center gap-1.5 bg-pink-500/10 px-4 py-2 rounded-full">
              Kunjungi Profil <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/masjidTazkiasentul/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-600/10 to-[#022C22] border border-blue-500/30 rounded-2xl hover:border-blue-500 hover:-translate-y-1 transition-all group shadow-md"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
              <Facebook className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Facebook</h3>
            <p className="text-emerald-300 text-xs mb-5 text-center">Masjid Tazkia</p>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5 bg-blue-500/10 px-4 py-2 rounded-full">
              Kunjungi Halaman <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* YouTube */}
          <a 
            href="https://www.youtube.com/@Tazkiamedia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-gradient-to-br from-red-600/10 to-[#022C22] border border-red-500/30 rounded-2xl hover:border-red-500 hover:-translate-y-1 transition-all group shadow-md"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mb-4 group-hover:bg-red-500/20 group-hover:scale-110 transition-all">
              <Youtube className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-red-500 transition-colors">YouTube</h3>
            <p className="text-emerald-300 text-xs mb-5 text-center">Tazkiamedia</p>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5 bg-red-500/10 px-4 py-2 rounded-full">
              Tonton Video <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

