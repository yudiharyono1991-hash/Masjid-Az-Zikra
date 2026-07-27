import React, { useState, useEffect } from 'react';
import { CITIES_DATA, getHijriDate, CityPrayerTime } from '../lib/islamicUtils';
import { Announcement, PetugasJadwal, AppAdminSettings } from '../types';
import { Tv, X, Volume2, Calendar, MapPin, Sparkles } from 'lucide-react';

interface TvDisplayModeProps {
  onExit: () => void;
  announcements: Announcement[];
  petugasList: PetugasJadwal[];
  adminSettings?: AppAdminSettings;
}

export const TvDisplayMode: React.FC<TvDisplayModeProps> = ({
  onExit,
  announcements,
  petugasList,
  adminSettings
}) => {
  const [time, setTime] = useState<Date>(new Date());
  const [selectedCity] = useState<CityPrayerTime>(CITIES_DATA[0]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto rotate slides every 8 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(slideTimer);
  }, []);

  const timeStr = time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = time.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const nextFriday = petugasList.find(p => p.khatibJumat);

  return (
    <div className="fixed inset-0 z-50 bg-[#070c1b] text-white flex flex-col justify-between p-6 font-sans overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-amber-500/30 pb-4 bg-blue-900/60 p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center text-3xl shadow-lg">
            ??
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              Masjid Tazkia
            </h1>
            <p className="text-xs text-amber-400 font-medium flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sentul City, Bogor • {selectedCity.name}</span>
            </p>
          </div>
        </div>

        {/* Realtime Digital Clock */}
        <div className="text-right flex items-center gap-6">
          <div className="text-right">
            <div className="text-3xl sm:text-5xl font-mono font-extrabold text-amber-400 tracking-wider">
              {timeStr}
            </div>
            <p className="text-xs text-blue-300 mt-1 font-medium">
              {dateStr} • <span className="text-amber-300 font-serif">{getHijriDate()}</span>
            </p>
          </div>

          <button
            onClick={onExit}
            className="p-3 bg-blue-800 hover:bg-blue-700 text-blue-300 rounded-2xl border border-blue-700 cursor-pointer"
            title="Keluar Mode TV"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Center Dynamic Rotating Banner Slides */}
      <div className="my-auto py-8">
        {currentSlideIndex === 0 && (
          <div className="bg-gradient-to-r from-blue-900 via-[#0f1d3a] to-blue-900 border-2 border-amber-500/40 rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <span className="bg-amber-500 text-blue-950 font-bold font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                INFORMASI KHUTBAH JUMAT
              </span>
              {adminSettings?.jumatTimeInfo && (
                <span className="bg-blue-800 text-amber-300 font-mono text-xs px-3 py-1 rounded-full border border-amber-500/30">
                  {adminSettings.jumatTimeInfo}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-300 leading-snug">
              "{adminSettings?.jumatTopicTitle || nextFriday?.topikJumat || 'Optimalisasi ZISWAF untuk Kesejahteraan Umat'}"
            </h2>
            <div className="flex flex-wrap justify-center gap-6 text-base sm:text-lg pt-2 text-blue-200 font-sans">
              <p>Khatib: <strong className="text-white font-serif">{adminSettings?.jumatKhatibName || nextFriday?.khatibJumat || 'Prof. Dr. KH. Nasaruddin Umar, MA'}</strong></p>
              <p>Imam: <strong className="text-white font-serif">{adminSettings?.jumatImamName || nextFriday?.imamJumat || 'Ustadz H. M. Zainuddin, Sq'}</strong></p>
              {adminSettings?.jumatMuadzinName && (
                <p>Muadzin: <strong className="text-white font-serif">{adminSettings.jumatMuadzinName}</strong></p>
              )}
            </div>
          </div>
        )}

        {currentSlideIndex === 1 && (
          <div className="bg-gradient-to-r from-blue-900 via-[#0f1d3a] to-blue-900 border-2 border-amber-500/40 rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl text-center space-y-4 animate-fade-in">
            <span className="bg-blue-500 text-blue-950 font-bold font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest inline-block">
              HADIS SHAHIH HARI INI
            </span>
            <p className="text-3xl sm:text-4xl font-serif text-amber-300 leading-relaxed">
              "??? ???????? ???????? ???? ?????"
            </p>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto font-serif italic">
              "Sedekah itu tidak akan pernah mengurangi harta sedikit pun, melainkan Allah akan menambah kemuliaan."
            </p>
            <p className="text-xs text-amber-400 font-mono">(HR. Muslim no. 2588)</p>
          </div>
        )}

        {currentSlideIndex === 2 && (
          <div className="bg-gradient-to-r from-blue-900 via-[#0f1d3a] to-blue-900 border-2 border-amber-500/40 rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl text-center space-y-4 animate-fade-in">
            <span className="bg-amber-500 text-blue-950 font-bold font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest inline-block">
              PROGRAM WAKAF UTAMA
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Wakaf Tunai Sound System & Akustik Ruang Shalat Utama
            </h2>
            <p className="text-blue-300 text-base max-w-2xl mx-auto">
              Dukung pengadaan tata suara jernih kristal untuk kekhusyu'an ibadah jamaah Masjid Tazkia.
            </p>
            <p className="text-amber-400 font-mono font-bold text-xl">
              Terkumpul: Rp 8.25M / Target: Rp 15M
            </p>
          </div>
        )}
      </div>

      {/* Bottom Prayer Times Bar */}
      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-3">
          {[
            { name: 'SUBUH', time: selectedCity.fajr, icon: '??' },
            { name: 'TERBIT', time: selectedCity.sunrise, icon: '??' },
            { name: 'DZUHUR', time: selectedCity.dhuhr, icon: '??' },
            { name: 'ASHAR', time: selectedCity.asr, icon: '???' },
            { name: 'MAGHRIB', time: selectedCity.maghrib, icon: '??', active: true },
            { name: 'ISYA', time: selectedCity.isha, icon: '??' }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center transition-all ${
                item.active
                  ? 'bg-amber-500 text-blue-950 border-amber-300 shadow-2xl scale-105'
                  : 'bg-blue-900/90 border-blue-800 text-blue-200'
              }`}
            >
              <p className={`text-xs font-bold font-mono ${item.active ? 'text-blue-950' : 'text-blue-400'}`}>
                {item.name}
              </p>
              <p className={`text-2xl sm:text-3xl font-extrabold font-mono mt-1 ${item.active ? 'text-blue-950' : 'text-amber-400'}`}>
                {item.time}
              </p>
            </div>
          ))}
        </div>

        {/* Running Text Announcement Footer */}
        <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl px-4 py-2 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee text-xs font-medium text-amber-300 space-x-8">
            <span>? Harap mematikan atau mengheningkan nada dering ponsel saat berada di ruang shalat utama.</span>
            <span>? Kajian Subuh Berkah setiap hari Sabtu bersama KH. Ridwan Kamil, Lc.</span>
            <span>? Salurkan ZISWAF Anda melalui Portal Digital Masjid Tazkia atau Sekertariat DKM.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

