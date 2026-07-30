import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Bell, Settings } from 'lucide-react';
import { JamaahProfile } from '../types';
import adhanMp3 from '../assets/adhan.mp3';

interface AdhanPlayerProps {
  profile: JamaahProfile;
  onUpdateSettings: (settings: NonNullable<JamaahProfile['adhanSettings']>) => void;
  prayerTimes: { name: string; time: string }[];
}

export const AdhanPlayer: React.FC<AdhanPlayerProps> = ({ profile, onUpdateSettings, prayerTimes }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synth = window.speechSynthesis;

  const defaultSettings = {
    enabled: true,
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    soundType: 'makkah' as const
  };

  const settings = profile.adhanSettings || defaultSettings;

  const adhanText = "Allahu Akbar. Allahu Akbar. Allahu Akbar. Allahu Akbar.";

  useEffect(() => {
    // Check prayer times every minute
    const interval = setInterval(() => {
      if (!settings.enabled) return;

      const now = new Date();
      const currentHour = now.getHours().toString().padStart(2, '0');
      const currentMin = now.getMinutes().toString().padStart(2, '0');
      const timeStr = `${currentHour}:${currentMin}`;

      const activePrayer = prayerTimes.find(p => p.time === timeStr);

      if (activePrayer) {
        // Check if this specific prayer alarm is enabled
        const prayerKey = activePrayer.name.toLowerCase() as keyof typeof settings;
        if (settings[prayerKey] === true) {
          playAdhan(activePrayer.name);
        }
      }
    }, 60000); // every minute

    return () => clearInterval(interval);
  }, [settings, prayerTimes]);

  const playAdhan = (prayerName: string) => {
    setCurrentPrayer(prayerName);
    setIsPlaying(true);
    
    // Gunakan Web Speech API sebagai pengganti berkas MP3 yang diblokir CORS/Captcha
    const utterance = new SpeechSynthesisUtterance(adhanText);
    utterance.lang = 'ar-SA'; // Aksen arab jika didukung
    utterance.rate = 0.8;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentPrayer(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentPrayer(null);
    };

    synth.cancel(); // Stop anything playing
    synth.speak(utterance);
  };

  const stopAdhan = () => {
    synth.cancel();
    setIsPlaying(false);
    setCurrentPrayer(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isPlaying ? 'bg-emerald-500 text-white animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">Alarm Adzan</h4>
            <p className="text-xs text-gray-500">
              {isPlaying ? `Memutar Adzan ${currentPrayer}...` : settings.enabled ? 'Aktif' : 'Nonaktif'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isPlaying && (
            <button onClick={stopAdhan} className="text-xs bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm">
              Stop
            </button>
          )}
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition ${showSettings ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in space-y-4">
          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div>
              <p className="text-sm font-bold text-blue-900">Aktifkan Alarm Utama</p>
              <p className="text-xs text-blue-700/70">Nyalakan/matikan semua alarm</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.enabled}
                onChange={(e) => onUpdateSettings({ ...settings, enabled: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Suara Notifikasi</p>
              <div className="flex items-center gap-2">
                <select
                  value={settings.soundType}
                  onChange={(e) => onUpdateSettings({ ...settings, soundType: e.target.value as any })}
                  className="flex-1 text-sm bg-white border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="makkah">Adzan Makkah</option>
                  <option value="madinah">Adzan Madinah</option>
                  <option value="local">Adzan Lokal (Mishary)</option>
                  <option value="beep">Beep Sederhana</option>
                </select>
                <button
                  onClick={() => playAdhan('Test Suara')}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-lg font-bold text-xs whitespace-nowrap transition-colors"
                >
                  Tes Suara
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Pilih Waktu</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'fajr', label: 'Subuh' },
                  { id: 'dhuhr', label: 'Dzuhur' },
                  { id: 'asr', label: 'Ashar' },
                  { id: 'maghrib', label: 'Maghrib' },
                  { id: 'isha', label: 'Isya' },
                ].map(waktu => (
                  <label key={waktu.id} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border cursor-pointer text-xs font-bold transition ${settings[waktu.id as keyof typeof settings] ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={settings[waktu.id as keyof typeof settings] as boolean}
                      onChange={(e) => onUpdateSettings({ ...settings, [waktu.id]: e.target.checked })}
                    />
                    <Bell className="w-3 h-3" /> {waktu.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-[10px] text-gray-400 flex justify-center text-center p-2 bg-gray-50 rounded">
            Catatan: Pastikan browser Anda mengizinkan pemutaran audio otomatis (Autoplay). Alarm mungkin tidak berbunyi jika portal ditutup atau HP dalam mode tidur.
          </div>
        </div>
      )}
    </div>
  );
};
