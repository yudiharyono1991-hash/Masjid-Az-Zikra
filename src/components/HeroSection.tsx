import React, { useState, useEffect } from 'react';
import { TazkiaBrandLogo } from './TazkiaBrandLogo';
import { getSupabaseClient } from '../lib/supabase';
import { useMasjidStore } from '../lib/store';
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
  openDigitalIbadah: (tab?: 'quran' | 'salat' | 'kiblat') => void;
  isDark?: boolean;
}

const DEFAULT_HERO_BACKGROUNDS = [
  '/hero-1.jpg'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  openDigitalIbadah,
  isDark = false
}) => {
  const { state } = useMasjidStore();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const [backgrounds, setBackgrounds] = useState<string[]>(DEFAULT_HERO_BACKGROUNDS);

  useEffect(() => {
    const configuredUrls = state.adminSettings.masjidHeroCarouselUrls && state.adminSettings.masjidHeroCarouselUrls.length > 0 
      ? state.adminSettings.masjidHeroCarouselUrls 
      : (state.adminSettings.masjidHeroPhotoUrl ? [state.adminSettings.masjidHeroPhotoUrl] : []);
    // If we have custom URLs from store, use them and skip Supabase fetch
    if (configuredUrls.length > 0) {
      setBackgrounds(configuredUrls);
      return;
    }

    const fetchHeroImages = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return;
      
      try {
        const { data, error } = await supabase.storage.from('hero-images').list();
        if (error) {
          console.error('Error fetching hero images from Supabase:', error);
          return;
        }
        
        if (data && data.length > 0) {
          // Filter out .emptyFolderPlaceholder or non-image files if needed
          const imageFiles = data.filter(file => file.name.match(/\.(jpg|jpeg|png|webp|avif)$/i));
          
          if (imageFiles.length > 0) {
            const urls = imageFiles.map(file => {
              const { data: { publicUrl } } = supabase.storage.from('hero-images').getPublicUrl(file.name);
              return publicUrl;
            });
            setBackgrounds(urls);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic hero images', err);
      }
    };

    fetchHeroImages();
  }, [state.adminSettings.masjidHeroCarouselUrls, state.adminSettings.masjidHeroPhotoUrl]);

  useEffect(() => {
    if (backgrounds.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(interval);
  }, [backgrounds]);

  return (
    <section className="relative overflow-hidden bg-[#172554] text-white py-12 md:py-16 border-b border-blue-900 min-h-[50vh] md:min-h-[85vh] flex flex-col justify-center">
      {/* Background Image Carousel */}
      {backgrounds.map((bg, index) => (
        <div
          key={`${bg}-${index}`}
          className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            index === currentBgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ backgroundImage: `url("${bg}"), url("/hero-1.jpg")` }}
        />
      ))}
      <div className={`absolute inset-0 z-0 bg-gradient-to-b ${isDark ? 'from-slate-950/40 via-transparent to-slate-950/90' : 'from-[#172554]/10 via-transparent to-[#172554]/90'} pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Official Brand Logo Banner */}
        <div className="flex justify-center mb-6">
          <TazkiaBrandLogo variant="large" isDark={true} />
        </div>

        {/* Quick Shortcut Pills Header */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 font-sans text-xs font-medium">
          <button
            onClick={() => openDigitalIbadah('quran')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5 border ${
              isDark 
                ? 'bg-blue-950/90 hover:bg-blue-600 hover:text-white text-blue-100 border-blue-500/40' 
                : 'bg-white/90 backdrop-blur hover:bg-blue-50 text-blue-900 border-blue-200'
            }`}
          >
            <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>Al-Qur'an Digital</span>
          </button>
          <button
            onClick={() => openDigitalIbadah('salat')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5 border ${
              isDark 
                ? 'bg-blue-950/90 hover:bg-blue-600 hover:text-white text-blue-100 border-blue-500/40' 
                : 'bg-white/90 backdrop-blur hover:bg-blue-50 text-blue-900 border-blue-200'
            }`}
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>Jadwal Shalat & Adzan</span>
          </button>
          <button
            onClick={() => openDigitalIbadah('kiblat')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5 border ${
              isDark 
                ? 'bg-blue-950/90 hover:bg-blue-600 hover:text-white text-blue-100 border-blue-500/40' 
                : 'bg-white/90 backdrop-blur hover:bg-blue-50 text-blue-900 border-blue-200'
            }`}
          >
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300" />
            <span>Arah Kiblat</span>
          </button>
        </div>
      </div>

      {/* Carousel Indicators */}
      {backgrounds.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {backgrounds.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBgIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentBgIndex 
                  ? 'w-8 bg-amber-400' 
                  : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

