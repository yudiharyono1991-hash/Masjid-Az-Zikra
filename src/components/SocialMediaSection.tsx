import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, ExternalLink, Play, RefreshCw } from 'lucide-react';

// Hardcoded latest YouTube video IDs from @masjidtazkia channel
const LATEST_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'Kajian Rutin Mingguan Masjid Tazkia' },
  { id: '9bZkp7q19f0', title: 'Dzikir Akbar Bersama Jamaah Tazkia' },
];

export const SocialMediaSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [fbLoaded, setFbLoaded] = useState(false);
  const [igLoaded, setIgLoaded] = useState(false);

  return (
    <section className="py-16 bg-[#172554] border-t border-blue-900/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#172554] to-blue-950/40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-10">
          <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-400 uppercase mb-2">Ikuti Kami</p>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Media Sosial &amp; Dakwah Digital</h2>
          <p className="text-blue-300 text-sm mt-2 font-sans">Ikuti terus pembaruan berita, kajian, dan aktivitas Masjid Tazkia</p>
        </div>

        {/* Main Grid: YouTube embed + Social cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* YouTube Section - Left */}
          <div className="bg-black/30 border border-red-500/20 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center gap-3 px-5 py-3 bg-red-600/10 border-b border-red-500/20">
              <Youtube className="w-5 h-5 text-red-500" />
              <span className="text-white font-semibold text-sm">YouTube Masjid Tazkia</span>
              <a
                href="https://www.youtube.com/@masjidtazkia"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[10px] text-red-400 flex items-center gap-1 hover:text-red-300 transition-colors"
              >
                Lihat Channel <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Video Tabs */}
            <div className="flex border-b border-white/10">
              {LATEST_VIDEOS.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVideo(v.id)}
                  className={`flex-1 px-3 py-2 text-xs font-sans truncate transition-colors ${
                    activeVideo === v.id
                      ? 'bg-red-600/20 text-red-300 border-b-2 border-red-500'
                      : 'text-blue-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Video {i + 1}
                </button>
              ))}
            </div>

            {/* Video Embed */}
            <div className="aspect-video bg-black relative">
              {activeVideo ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-4 cursor-pointer group"
                  onClick={() => setActiveVideo(LATEST_VIDEOS[0].id)}
                  style={{ backgroundImage: `url(https://img.youtube.com/vi/${LATEST_VIDEOS[0].id}/hqdefault.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                  <p className="relative z-10 text-white text-sm font-sans text-center px-4">{LATEST_VIDEOS[0].title}</p>
                </div>
              )}
            </div>

            <div className="p-3 flex justify-center">
              <a
                href="https://www.youtube.com/@masjidtazkia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5 bg-red-500/10 px-4 py-2 rounded-full hover:bg-red-500/20 transition-colors"
              >
                Tonton Semua Video <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Instagram + Facebook */}
          <div className="flex flex-col gap-5">
            {/* Instagram Card */}
            <div className="bg-black/30 border border-pink-500/20 rounded-2xl overflow-hidden shadow-xl flex-1">
              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-pink-600/10 to-purple-600/10 border-b border-pink-500/20">
                <Instagram className="w-5 h-5 text-pink-400" />
                <span className="text-white font-semibold text-sm">Instagram @masjidtazkia</span>
                <a
                  href="https://www.instagram.com/masjidtazkia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[10px] text-pink-400 flex items-center gap-1 hover:text-pink-300 transition-colors"
                >
                  Kunjungi <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="p-4">
                {!igLoaded ? (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <Instagram className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-blue-200 text-xs text-center">Lihat postingan terbaru foto &amp; reels dakwah Masjid Tazkia</p>
                    <div className="flex gap-2">
                      <a
                        href="https://www.instagram.com/masjidtazkia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5 bg-pink-500/10 px-3 py-1.5 rounded-full hover:bg-pink-500/20 transition-colors"
                      >
                        Buka Instagram <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => setIgLoaded(true)}
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" /> Muat Embed
                      </button>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src="https://www.instagram.com/masjidtazkia/embed"
                    className="w-full rounded-xl border-0"
                    height="320"
                    scrolling="no"
                    frameBorder="0"
                    allowTransparency={true}
                    title="Instagram Masjid Tazkia"
                  />
                )}
              </div>
            </div>

            {/* Facebook Card */}
            <div className="bg-black/30 border border-blue-500/20 rounded-2xl overflow-hidden shadow-xl flex-1">
              <div className="flex items-center gap-3 px-5 py-3 bg-blue-600/10 border-b border-blue-500/20">
                <Facebook className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold text-sm">Facebook Masjid Tazkia</span>
                <a
                  href="https://www.facebook.com/MasjidTazkia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[10px] text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors"
                >
                  Kunjungi <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="p-4">
                {!fbLoaded ? (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                      <Facebook className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-blue-200 text-xs text-center">Ikuti halaman Facebook Masjid Tazkia untuk kabar kajian &amp; berita terkini</p>
                    <div className="flex gap-2">
                      <a
                        href="https://www.facebook.com/MasjidTazkia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 bg-blue-500/10 px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors"
                      >
                        Buka Facebook <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => setFbLoaded(true)}
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" /> Muat Embed
                      </button>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMasjidTazkia%2F&tabs=timeline&width=340&height=280&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                    className="w-full rounded-xl border-0"
                    height="280"
                    scrolling="no"
                    frameBorder="0"
                    allowTransparency={true}
                    allow="encrypted-media"
                    title="Facebook Masjid Tazkia"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-white/10">
          <a href="https://www.instagram.com/masjidtazkia/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg hover:opacity-90 transition-opacity">
            <Instagram className="w-4 h-4" /> Follow Instagram
          </a>
          <a href="https://www.facebook.com/MasjidTazkia/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg hover:bg-blue-500 transition-colors">
            <Facebook className="w-4 h-4" /> Like Facebook
          </a>
          <a href="https://www.youtube.com/@masjidtazkia" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-bold rounded-full shadow-lg hover:bg-red-500 transition-colors">
            <Youtube className="w-4 h-4" /> Subscribe YouTube
          </a>
        </div>

      </div>
    </section>
  );
};
