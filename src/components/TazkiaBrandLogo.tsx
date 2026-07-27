import React from 'react';

interface TazkiaBrandLogoProps {
  variant?: 'navbar' | 'hero' | 'footer' | 'large';
  isDark?: boolean;
  className?: string;
}

export const TazkiaBrandLogo: React.FC<TazkiaBrandLogoProps> = ({
  variant = 'navbar',
  isDark = true,
  className = ''
}) => {
  if (variant === 'large' || variant === 'hero') {
    return (
      <div className={`flex flex-col items-center text-center space-y-2 ${className}`}>
        {/* Emblem Dome Graphic */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-blue-900 to-blue-950 border-2 border-amber-400/60 p-2 shadow-2xl flex items-center justify-center relative overflow-hidden group">
            {/* Custom Logo Image */}
            <img src="/logo.png" alt="Logo Masjid Tazkia" className="w-full h-full object-contain drop-shadow-md z-10 relative" />
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10 z-0" />
          </div>
        </div>

        {/* 3D Facade Style Tazkia Logo Text */}
        <div className="space-y-0.5">
          <div className="inline-block px-3 py-0.5 bg-amber-500/20 border border-amber-400/40 rounded-full font-mono text-[10px] font-bold text-amber-300 uppercase tracking-[0.25em]">
            MASJID OFFICIAL BRANDING
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-blue-300 drop-shadow-[0_2px_10px_rgba(217,119,6,0.3)] transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] cursor-default">
            Tazkia
          </h1>
          <p className="font-mono text-xs font-bold text-blue-400 uppercase tracking-[0.3em]">
            SENTUL &bull; BOGOR
          </p>
        </div>
      </div>
    );
  }

  // Default Navbar / Footer Logo
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Mini Mosque Emblem */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] border border-amber-400/50 flex items-center justify-center shadow-lg relative shrink-0">
        <img src="/logo.png" alt="Logo Masjid Tazkia" className="w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-md relative z-10" />
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] opacity-90 font-mono font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap mb-0.5">
          Masjid
        </p>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`whitespace-nowrap leading-none text-base sm:text-xl font-serif font-extrabold tracking-wider ${isDark ? 'text-white hover:text-amber-300' : 'text-blue-900 hover:text-blue-600'} drop-shadow-sm transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-default`}>
            Tazkia
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-widest bg-blue-800/20 text-blue-600 dark:text-blue-300 px-1.5 sm:px-2 py-0.5 rounded border border-blue-500/30">
            SENTUL
          </span>
        </div>
      </div>
    </div>
  );
};

