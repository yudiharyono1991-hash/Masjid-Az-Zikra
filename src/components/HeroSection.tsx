import React, { useState, useEffect } from 'react';
import { AzzikraBrandLogo } from './AzzikraBrandLogo';
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
interface HeroSectionProps {
  openDigitalIbadah: (tab?: 'quran' | 'salat' | 'kiblat') => void;
}

const HERO_BACKGROUNDS = [
  '/masjid-azzikra-hero.jpg',
  '/hero-2.jpg',
  '/hero-3.jpg'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  openDigitalIbadah
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#022C22] text-white py-8 md:py-12 border-b border-emerald-900 h-[60vh] md:h-[70vh] flex flex-col justify-center">
      {/* Background Image Carousel */}
      {HERO_BACKGROUNDS.map((bg, index) => (
        <div
          key={bg}
          className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            index === currentBgIndex ? 'opacity-80 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ backgroundImage: `url('${bg}')` }}
        />
      ))}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#022C22]/40 via-[#043927]/60 to-[#022C22] pointer-events-none" />

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
