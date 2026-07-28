import React from 'react';
import { Home, HeartHandshake, BookOpen, Bot, Menu } from 'lucide-react';

interface FloatingMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openDonationModal: () => void;
  openDigitalIbadah: (tab?: 'quran' | 'salat' | 'kiblat') => void;
  openAiAssistant: () => void;
  toggleMobileMenu: () => void;
  isDark?: boolean;
}

export const FloatingMobileNav: React.FC<FloatingMobileNavProps> = ({
  activeTab,
  setActiveTab,
  openDonationModal,
  openDigitalIbadah,
  openAiAssistant,
  toggleMobileMenu,
  isDark = true
}) => {
  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#172554]/95 border-t border-blue-800/80 backdrop-blur-md px-2 py-1.5 shadow-2xl transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto text-[9px] font-mono font-bold uppercase tracking-wider text-blue-200">
        
        {/* Beranda */}
        <button
          onClick={() => { setActiveTab('beranda'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'beranda' ? 'text-amber-300 font-black scale-105' : 'hover:text-white opacity-80'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Beranda</span>
        </button>

        {/* Program / Donasi */}
        <button
          onClick={() => { openDonationModal(); }}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer text-blue-300 hover:text-white"
        >
          <HeartHandshake className="w-5 h-5 text-amber-400" />
          <span>Donasi</span>
        </button>

        {/* Al-Qur'an */}
        <button
          onClick={() => { openDigitalIbadah('quran'); }}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer hover:text-white"
        >
          <BookOpen className="w-5 h-5 text-blue-400" />
          <span>Al-Qur'an</span>
        </button>

        {/* AI Syariah */}
        <button
          onClick={() => { openAiAssistant(); }}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer hover:text-white"
        >
          <Bot className="w-5 h-5 text-amber-400" />
          <span>AI Syariah</span>
        </button>

        {/* Menu Susun Tiga */}
        <button
          onClick={toggleMobileMenu}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer text-amber-300 bg-amber-500/10 border border-amber-500/30 font-black"
        >
          <Menu className="w-5 h-5" />
          <span>Menu</span>
        </button>

      </div>
    </nav>
  );
};
