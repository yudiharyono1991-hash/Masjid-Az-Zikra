import React, { useState, useEffect } from 'react';
import { TazkiaBrandLogo } from './TazkiaBrandLogo';
import {
  Compass,
  BookOpen,
  Calendar,
  HeartHandshake,
  Tv,
  UserCheck,
  Sparkles,
  Bot,
  Settings,
  FileText,
  Moon,
  Sun,
  ChevronDown,
  Clock
} from 'lucide-react';
import { ColorPalette, UserSession, ThemeMode, hasDkmPortalAccess } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openDonationModal: (category?: string) => void;
  openCalculator: () => void;
  openDigitalIbadah: (subTab?: 'quran' | 'salat' | 'kiblat' | 'doa') => void;
  openAiAssistant: () => void;
  openSupabaseModal: () => void;
  openTvMode: () => void;
  openCatalogPdf: () => void;
  session: UserSession;
  openLoginModal: () => void;
  palette: ColorPalette;
  setPalette: (p: ColorPalette) => void;
  themeMode?: ThemeMode;
  toggleThemeMode?: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openDonationModal,
  openCalculator,
  openDigitalIbadah,
  openAiAssistant,
  openSupabaseModal,
  openTvMode,
  openCatalogPdf,
  session,
  openLoginModal,
  palette,
  setPalette,
  themeMode = 'light',
  toggleThemeMode,
  mobileMenuOpen: externalMobileMenuOpen,
  setMobileMenuOpen: externalSetMobileMenuOpen
}) => {
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const mobileMenuOpen = externalMobileMenuOpen !== undefined ? externalMobileMenuOpen : internalMobileMenuOpen;
  const setMobileMenuOpen = externalSetMobileMenuOpen || setInternalMobileMenuOpen;
  const isDark = themeMode === 'dark';

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getNextPrayer = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const timeNum = hour * 60 + minute;
    
    // Estimasi waktu: Subuh 04:30(270), Dzuhur 12:00(720), Ashar 15:15(915), Maghrib 18:00(1080), Isya 19:15(1155)
    if (timeNum < 270) return { name: 'Subuh', time: '04:30' };
    if (timeNum < 720) return { name: 'Dzuhur', time: '12:00' };
    if (timeNum < 915) return { name: 'Ashar', time: '15:15' };
    if (timeNum < 1080) return { name: 'Maghrib', time: '18:00' };
    if (timeNum < 1155) return { name: 'Isya', time: '19:15' };
    return { name: 'Subuh', time: '04:30' }; // Next day
  };
  const nextPrayer = getNextPrayer();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <header className={`sticky w-full z-40 top-0 transition-colors backdrop-blur-md bg-[#172554]/95 text-white border-b border-[#172554]`}>
      {/* Top Quick Announcement Bar */}
      <div className={`border-b px-2 sm:px-4 py-1 text-[10px] sm:text-[11px] flex items-center justify-between gap-1 sm:gap-2 max-w-7xl mx-auto font-sans transition-colors overflow-x-auto whitespace-nowrap scrollbar-none bg-[#1e3a8a] border-[#172554] text-blue-100`}>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="bg-blue-700 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest font-mono shadow-sm">
            Official
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">
            Masjid Tazkia <span className="hidden sm:inline">&bull; Sentul City, Bogor</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 ml-auto text-[10px] sm:text-[11px] font-mono uppercase tracking-wider shrink-0">
          
          {/* Jadwal Sholat & Kiblat Info */}
          <div className="hidden md:flex items-center gap-3 text-amber-300 font-bold border-r border-blue-800/50 pr-3 mr-1">
            <div className="flex items-center gap-1 cursor-default" title="Arah Kiblat: 295° dari Utara">
              <Compass className="w-3 h-3" />
              <span>Kiblat: 295°</span>
            </div>
            <div className="flex items-center gap-1 cursor-default">
              <Clock className="w-3 h-3" />
              <span>{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
            </div>
            <div className="flex items-center gap-1 cursor-default bg-blue-900/50 px-2 py-0.5 rounded-full border border-blue-700/50 text-[9px]">
              <Moon className="w-3 h-3 text-amber-400" />
              <span>{nextPrayer.name}: {nextPrayer.time}</span>
            </div>
          </div>

          {/* Theme Mode Toggle Button (Light/Dark) */}
          <span className="opacity-30">|</span>
          <button
            onClick={toggleThemeMode}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[9px] sm:text-[10px] tracking-wider transition-all cursor-pointer border ${
              isDark
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-blue-900 text-amber-300 border-blue-700 hover:bg-blue-800'
            }`}
            title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Dark Mode)"}
          >
            {isDark ? (
              <>
                <Sun className="w-3 h-3 text-amber-300 animate-spin-slow" />
                <span className="hidden xs:inline">Mode Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-amber-300" />
                <span className="hidden xs:inline">Mode Gelap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          {/* Brand Logo */}
          <div
            className="cursor-pointer group py-1"
            onClick={() => setActiveTab('beranda')}
            title="Masjid Tazkia &bull; Beranda"
          >
            <TazkiaBrandLogo variant="navbar" isDark={isDark} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleTabClick('beranda')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-semibold text-sm ${
                activeTab === 'beranda'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-amber-300 hover:text-amber-200 hover:bg-blue-800/50'
              }`}
            >
              Home
            </button>

            {/* ZISWAF Dropdown */}
            <div className="relative group">
              <button
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-semibold text-sm flex items-center gap-1 ${
                  ['program', 'qurban', 'transparansi', 'edukasi'].includes(activeTab)
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-amber-300 hover:text-amber-200 hover:bg-blue-800/50'
                }`}
              >
                ZISWAF <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl shadow-xl border border-[#172554] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 bg-[#1e3a8a]">
                <div className="py-2 flex flex-col">
                  <button onClick={() => handleTabClick('program')} className="text-left px-4 py-2 hover:bg-amber-500/20 hover:text-amber-200 transition-colors text-amber-300 font-medium">Program ZISWAF</button>
                  <button onClick={() => handleTabClick('qurban')} className="text-left px-4 py-2 hover:bg-amber-500/20 hover:text-amber-200 transition-colors text-amber-300 font-medium">Patungan Qurban</button>
                  <button onClick={() => handleTabClick('transparansi')} className="text-left px-4 py-2 hover:bg-amber-500/20 hover:text-amber-200 transition-colors text-amber-300 font-medium">Laporan Transparansi</button>
                  <button onClick={() => handleTabClick('edukasi')} className="text-left px-4 py-2 hover:bg-amber-500/20 hover:text-amber-200 transition-colors text-amber-300 font-medium">Edukasi ZISWAF</button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleTabClick('jadwal_khatib')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-semibold text-sm ${
                activeTab === 'jadwal_khatib'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-amber-300 hover:text-amber-200 hover:bg-blue-800/50'
              }`}
            >
              Kalender Kegiatan
            </button>

            {/* Tentang Kami Dropdown */}
            <div className="relative group">
              <button
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-semibold text-sm flex items-center gap-1 ${
                  ['sejarah', 'galeri'].includes(activeTab)
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-amber-300 hover:text-amber-200 hover:bg-blue-800/50'
                }`}
              >
                Tentang Kami <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl shadow-xl border border-[#172554] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 bg-[#1e3a8a]">
                <div className="py-2 flex flex-col">
                  <button onClick={() => handleTabClick('sejarah')} className="text-left px-4 py-2 hover:bg-amber-500/20 hover:text-amber-200 transition-colors text-amber-300 font-medium">Sejarah Tazkia</button>
                  <button onClick={() => handleTabClick('galeri')} className="text-left px-4 py-2 hover:bg-amber-500/20 hover:text-amber-200 transition-colors text-amber-300 font-medium">Galeri & Kajian</button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleTabClick('booking')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-semibold text-sm ${
                activeTab === 'booking'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-amber-300 hover:text-amber-200 hover:bg-blue-800/50'
              }`}
            >
              Booking Gedung
            </button>

            <button
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              className="px-3.5 py-2 rounded-xl transition-all cursor-pointer font-semibold text-sm text-amber-300 hover:text-amber-200 hover:bg-blue-800/50"
            >
              Kontak Kami
            </button>

            {session && session.isLoggedIn && hasDkmPortalAccess(session.role) && (
              <button
                onClick={() => setActiveTab('dkm_portal')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold text-sm ${
                  activeTab === 'dkm_portal'
                    ? 'bg-amber-400 text-blue-950 shadow-md'
                    : 'text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Portal DKM
              </button>
            )}

            {session && session.isLoggedIn && session.role === 'jamaah' && (
              <button
                onClick={() => setActiveTab('jamaah_portal')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold text-sm ${
                  activeTab === 'jamaah_portal'
                    ? 'bg-amber-400 text-blue-950 shadow-md'
                    : 'text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Portal Saya
              </button>
            )}
          </nav>
          {/* Action Buttons Right */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Supabase & Settings (Only for Admin/Ketua DKM) */}
            {session && session.isLoggedIn && ['admin_masjid', 'ketua_dkm'].includes(session.role) && (
              <button
                onClick={openSupabaseModal}
                className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer shadow-sm hidden sm:block ${
                  isDark 
                    ? 'bg-blue-800/60 text-amber-300 border-amber-400/40 hover:bg-blue-800' 
                    : 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100'
                }`}
                title="Database Settings (Admin Only)"
              >
                <Database className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            )}

            {/* AI Syariah (Desktop Only, mobile has floating nav) */}
            <button
              onClick={openAiAssistant}
              className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer shadow-sm hidden md:flex items-center gap-1.5 ${
                isDark 
                  ? 'bg-blue-800/60 text-amber-300 border-amber-400/40 hover:bg-blue-800' 
                  : 'bg-blue-50 text-amber-600 border-amber-300 hover:bg-amber-100'
              }`}
              title="Konsultasi AI Syariah"
            >
              <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="hidden lg:inline text-xs font-bold font-mono">Tanya AI</span>
            </button>
            
            {/* Login / Logout */}
            {session && session.isLoggedIn ? (
              <button
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin keluar dari sistem?')) {
                    window.location.reload();
                  }
                }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                  isDark
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white'
                    : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white'
                }`}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl flex items-center gap-1.5 font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                  isDark
                    ? 'bg-blue-800/60 text-white border border-blue-600/50 hover:bg-blue-700'
                    : 'bg-blue-50 text-blue-900 border border-blue-300 hover:bg-blue-100'
                }`}
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Login <span className="hidden sm:inline">Portal</span></span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Menu Susun Tiga) */}
      {mobileMenuOpen && (
        <div className="border-t border-[#172554] px-4 pt-4 pb-8 space-y-5 animate-fadeIn shadow-2xl max-h-[85vh] overflow-y-auto bg-[#1e3a8a] text-white">
          
          {/* Section 1: Halaman Utama Navigasi */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-blue-800/60 pb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pilih Halaman Yang Ingin Dilihat</span>
              </span>
              <span className="text-[9px] font-mono opacity-60">Menu Susun Tiga</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => { setActiveTab('beranda'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'beranda' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>1. Beranda Utama</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Dashboard</span>
              </button>

              <button
                onClick={() => { setActiveTab('program'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'program' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>2. Program ZISWAF</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Katalog Donasi</span>
              </button>

              <button
                onClick={() => { setActiveTab('jadwal_khatib'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'jadwal_khatib' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>3. Agenda Shalat Jumat</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Khatib & Imam</span>
              </button>

              <button
                onClick={() => { setActiveTab('qurban'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'qurban' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>4. Patungan Qurban</span>
                <span className="text-[10px] font-mono font-normal text-amber-300">1/7 Saham Sapi</span>
              </button>

              <button
                onClick={() => { setActiveTab('transparansi'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'transparansi' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>5. Laporan Transparansi</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Keuangan Realtime</span>
              </button>

              <button
                onClick={() => { setActiveTab('sejarah'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'sejarah' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>6. Sejarah Tazkia</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Profil & Visi</span>
              </button>

              <button
                onClick={() => { setActiveTab('edukasi'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'edukasi' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>7. Edukasi ZISWAF</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Artikel Fiqih</span>
              </button>

              <button
                onClick={() => { setActiveTab('galeri'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'galeri' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>8. Galeri & Kajian Umat</span>
                <span className="text-[10px] font-mono font-normal text-amber-300">Video & Foto</span>
              </button>

              <button
                onClick={() => { setActiveTab('booking'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'booking' ? 'bg-blue-700 text-white font-extrabold shadow-md' : 'bg-blue-950/40 hover:bg-blue-900/60 text-amber-300 hover:text-amber-200'
                }`}
              >
                <span>9. Booking Gedung</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Sewa Fasilitas</span>
              </button>

              {session && session.isLoggedIn && hasDkmPortalAccess(session.role) && (
                <button
                  onClick={() => { setActiveTab('dkm_portal'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 font-bold uppercase tracking-wider flex items-center justify-between border border-amber-500/40 col-span-1 sm:col-span-2"
                >
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-300" />
                    <span>9. Portal Pengurus DKM</span>
                  </span>
                  <span className="text-[10px] font-mono bg-amber-400 text-blue-950 font-black px-2 py-0.5 rounded">DKM ACCESS</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 2: Layanan & Fitur Digital Cepat */}
          <div className="space-y-2 pt-2 border-t border-blue-800/60">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-amber-300" />
              <span>Layanan & Fitur Digital Cepat</span>
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => { openDonationModal(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-sm"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="truncate">Donasi ZISWAF</span>
              </button>

              <button
                onClick={() => { openDigitalIbadah('quran'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl border flex items-center gap-2 bg-blue-950/80 border-blue-700 text-blue-200"
              >
                <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">Al-Qur'an Digital</span>
              </button>

              <button
                onClick={() => { openCalculator(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl border flex items-center gap-2 bg-blue-950/80 border-blue-700 text-blue-200"
              >
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="truncate">Kalkulator Zakat</span>
              </button>

              <div className="p-2.5 rounded-xl border flex items-center justify-between gap-2 bg-blue-950/80 border-blue-700 text-amber-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="truncate">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-1.5 border-l border-blue-700 pl-2">
                  <Compass className="w-4 h-4 shrink-0" />
                  <span className="truncate">295°</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};

