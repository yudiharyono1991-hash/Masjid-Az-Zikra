import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';

// Masjid Tazkia YouTube channel uploads playlist
// Playlist ID = "UU" + channel_id (without "UC" prefix)
// This automatically shows the LATEST videos from the channel - no API key needed!
const YT_CHANNEL_ID = 'UC5107eQh328s76H_mZ34Sog';
const YT_UPLOADS_PLAYLIST = `UU${YT_CHANNEL_ID.replace('UC', '')}`;
const YT_CHANNEL_URL = 'https://www.youtube.com/@masjidtazkia';

export const SocialMediaSection: React.FC = () => {
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* ========== YOUTUBE — Left Column ========== */}
          <div className="bg-black/30 border border-red-500/20 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            <div className="flex items-center gap-3 px-5 py-3 bg-red-600/10 border-b border-red-500/20 shrink-0">
              <Youtube className="w-5 h-5 text-red-500" />
              <span className="text-white font-semibold text-sm">YouTube Masjid Tazkia</span>
              <a href={YT_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="ml-auto text-[10px] text-red-400 flex items-center gap-1 hover:text-red-300 transition-colors">
                Lihat Channel <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* YouTube Channel Playlist Embed — always shows latest videos automatically */}
            <div className="aspect-video bg-black w-full">
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${YT_UPLOADS_PLAYLIST}&controls=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Terbaru Masjid Tazkia"
                loading="lazy"
              />
            </div>

            {/* Info bar + CTA */}
            <div className="px-4 py-2 bg-black/20 flex items-center justify-between gap-2 shrink-0">
              <span className="text-[10px] text-blue-400 font-mono">🔴 Otomatis update video terbaru dari channel</span>
              <a href={YT_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5 bg-red-500/10 px-3 py-1.5 rounded-full hover:bg-red-500/20 transition-colors shrink-0">
                Semua Video <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ========== RIGHT: Instagram + Facebook ========== */}
          <div className="flex flex-col gap-5">

            {/* Instagram */}
            <div className="bg-black/30 border border-pink-500/20 rounded-2xl overflow-hidden shadow-xl flex-1">
              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-pink-600/10 to-purple-600/10 border-b border-pink-500/20">
                <Instagram className="w-5 h-5 text-pink-400" />
                <span className="text-white font-semibold text-sm">Instagram @masjidtazkia</span>
                <a href="https://www.instagram.com/masjidtazkia/" target="_blank" rel="noopener noreferrer"
                  className="ml-auto text-[10px] text-pink-400 flex items-center gap-1 hover:text-pink-300 transition-colors">
                  Kunjungi <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {/* Instagram Embed — auto-loads latest posts */}
              <div className="overflow-hidden" style={{ minHeight: '320px' }}>
                {!igLoaded ? (
                  <div className="flex flex-col items-center gap-3 py-8 px-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <Instagram className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-white font-semibold text-sm">@masjidtazkia</p>
                    <p className="text-blue-200 text-xs text-center text-balance">
                      Foto &amp; Reels dakwah terbaru dari Masjid Tazkia Islamic Center
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-1">
                      <button onClick={() => setIgLoaded(true)}
                        className="text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-lg">
                        Tampilkan Postingan
                      </button>
                      <a href="https://www.instagram.com/masjidtazkia/" target="_blank" rel="noopener noreferrer"
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5 bg-pink-500/10 px-3 py-2 rounded-full hover:bg-pink-500/20 transition-colors border border-pink-500/20">
                        Buka Instagram <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src="https://www.instagram.com/masjidtazkia/embed"
                    className="w-full border-0"
                    height="380"
                    scrolling="no"
                    frameBorder="0"
                    allowTransparency={true}
                    title="Instagram Masjid Tazkia"
                  />
                )}
              </div>
            </div>

            {/* Facebook */}
            <div className="bg-black/30 border border-blue-500/20 rounded-2xl overflow-hidden shadow-xl flex-1">
              <div className="flex items-center gap-3 px-5 py-3 bg-blue-600/10 border-b border-blue-500/20">
                <Facebook className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold text-sm">Facebook Masjid Tazkia</span>
                <a href="https://www.facebook.com/MasjidTazkia/" target="_blank" rel="noopener noreferrer"
                  className="ml-auto text-[10px] text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors">
                  Kunjungi <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="overflow-hidden" style={{ minHeight: '260px' }}>
                {!fbLoaded ? (
                  <div className="flex flex-col items-center gap-3 py-8 px-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                      <Facebook className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-white font-semibold text-sm">Masjid Tazkia Islamic Center</p>
                    <p className="text-blue-200 text-xs text-center text-balance">
                      Berita kajian &amp; kegiatan terbaru Masjid Tazkia di Facebook
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-1">
                      <button onClick={() => setFbLoaded(true)}
                        className="text-xs font-bold text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 transition-colors shadow-lg">
                        Tampilkan Timeline
                      </button>
                      <a href="https://www.facebook.com/MasjidTazkia/" target="_blank" rel="noopener noreferrer"
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 bg-blue-500/10 px-3 py-2 rounded-full hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                        Buka Facebook <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMasjidTazkia%2F&tabs=timeline&width=340&height=280&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
                    className="w-full border-0"
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
          <a href={YT_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-bold rounded-full shadow-lg hover:bg-red-500 transition-colors">
            <Youtube className="w-4 h-4" /> Subscribe YouTube
          </a>
        </div>

      </div>
    </section>
  );
};
