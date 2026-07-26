import React from 'react';

interface AzzikraBrandLogoProps {
  variant?: 'navbar' | 'hero' | 'footer' | 'large';
  isDark?: boolean;
  className?: string;
}

export const AzzikraBrandLogo: React.FC<AzzikraBrandLogoProps> = ({
  variant = 'navbar',
  isDark = true,
  className = ''
}) => {
  if (variant === 'large' || variant === 'hero') {
    return (
      <div className={`flex flex-col items-center text-center space-y-2 ${className}`}>
        {/* Emblem Dome Graphic */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-emerald-900 to-emerald-950 border-2 border-amber-400/60 p-2 shadow-2xl flex items-center justify-center relative overflow-hidden group">
            {/* Mosque Dome SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2.5">
              {/* Central Dome */}
              <path d="M50,20 C35,20 28,35 28,52 L72,52 C72,35 65,20 50,20 Z" fill="currentColor" fillOpacity="0.25" />
              {/* Crescent Moon */}
              <path d="M50,10 A4,4 0 1,0 50,18 A3,3 0 1,1 50,10 Z" fill="currentColor" stroke="none" />
              {/* Minarets */}
              <rect x="14" y="32" width="10" height="42" rx="2" fill="currentColor" fillOpacity="0.15" />
              <rect x="76" y="32" width="10" height="42" rx="2" fill="currentColor" fillOpacity="0.15" />
              <path d="M14,32 L19,22 L24,32 Z" fill="currentColor" />
              <path d="M76,32 L81,22 L86,32 Z" fill="currentColor" />
              {/* Pillars Base */}
              <rect x="25" y="52" width="50" height="25" fill="currentColor" fillOpacity="0.1" />
              <line x1="33" y1="52" x2="33" y2="77" />
              <line x1="50" y1="52" x2="50" y2="77" />
              <line x1="67" y1="52" x2="67" y2="77" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-emerald-500/10" />
          </div>
        </div>

        {/* 3D Facade Style AZ-ZIKRA Logo Text */}
        <div className="space-y-0.5">
          <div className="inline-block px-3 py-0.5 bg-amber-500/20 border border-amber-400/40 rounded-full font-mono text-[10px] font-bold text-amber-300 uppercase tracking-[0.25em]">
            MASJID OFFICIAL BRANDING
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-300 drop-shadow-[0_2px_10px_rgba(217,119,6,0.3)]">
            AZ-ZIKRA
          </h1>
          <p className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-[0.3em]">
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
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#064E3B] to-[#022C22] border border-amber-400/50 flex items-center justify-center shadow-lg relative shrink-0">
        <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M50,22 C37,22 30,35 30,50 L70,50 C70,35 63,22 50,22 Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M50,12 A3,3 0 1,0 50,18 A2,2 0 1,1 50,12 Z" fill="currentColor" stroke="none" />
          <rect x="18" y="30" width="8" height="40" rx="1" fill="currentColor" fillOpacity="0.2" />
          <rect x="74" y="30" width="8" height="40" rx="1" fill="currentColor" fillOpacity="0.2" />
          <path d="M18,30 L22,20 L26,30 Z" fill="currentColor" />
          <path d="M74,30 L78,20 L82,30 Z" fill="currentColor" />
        </svg>
      </div>

      <div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`text-base sm:text-xl font-serif font-extrabold tracking-wider ${isDark ? 'text-white' : 'text-emerald-900'} drop-shadow-sm`}>
            AZ-ZIKRA
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-800/20 text-emerald-600 dark:text-emerald-300 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-500/30">
            SENTUL
          </span>
        </div>
        <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] opacity-70 font-mono font-bold text-amber-600 dark:text-amber-400 line-clamp-1">
          MASJID &amp; KAMPUNG SUNNAH
        </p>
      </div>
    </div>
  );
};
