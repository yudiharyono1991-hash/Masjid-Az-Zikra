import React, { useState, useEffect } from 'react';
import { AzzikraBrandLogo } from './AzzikraBrandLogo';
import { getSupabaseClient } from '../lib/supabase';
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
}

const DEFAULT_HERO_BACKGROUNDS = [
  '/masjid-azzikra-hero.jpg',
  '/hero-2.jpg',
  '/hero-3.jpg'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  openDigitalIbadah
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [backgrounds, setBackgrounds] = useState<string[]>(DEFAULT_HERO_BACKGROUNDS);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(interval);
  }, [backgrounds]);

  return (
    <section className="relative overflow-hidden bg-[#022C22] text-white py-8 md:py-12 border-b border-emerald-900 h-[45vh] md:h-[55vh] flex flex-col justify-center">
      {/* Background Image Carousel */}
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          className={`absolute inset-0 z-0 bg-cover bg-[center_30%] transition-all duration-1000 ease-in-out ${
            index === currentBgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ backgroundImage: `url('${bg}')` }}
        />
      ))}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#022C22]/10 via-transparent to-[#022C22]/90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Official Brand Logo Banner */}
        <div className="flex justify-center mb-6">
          <AzzikraBrandLogo variant="large" isDark={true} />
        </div>

        {/* Quick Shortcut Pills Header */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
          <button
            onClick={() => openDigitalIbadah('quran')}
            className="bg-emerald-950/90 hover:bg-emerald-600 hover:text-white text-emerald-100 border border-emerald-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>Al-Qur'an Digital</span>
          </button>
          <button
            onClick={() => openDigitalIbadah('salat')}
            className="bg-emerald-950/90 hover:bg-emerald-600 hover:text-white text-emerald-100 border border-emerald-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span>Jadwal Salat & Adzan</span>
          </button>
          <button
            onClick={() => openDigitalIbadah('kiblat')}
            className="bg-emerald-950/90 hover:bg-emerald-600 hover:text-white text-emerald-100 border border-emerald-500/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300" />
            <span>Arah Kiblat</span>
          </button>
        </div>
      </div>
    </section>
  );
};
