import React, { useState } from 'react';
import { AzzikraBrandLogo } from './AzzikraBrandLogo';
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
  Sun
} from 'lucide-react';
import { ColorPalette, UserSession, ThemeMode } from '../types';

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

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 ${
      isDark
        ? 'bg-[#022C22]/95 text-white border-b border-emerald-900/60'
        : 'bg-white/95 text-emerald-900 border-b border-emerald-200'
    }`}>
      {/* Top Quick Announcement Bar */}
      <div className={`border-b px-2 sm:px-4 py-1 text-[10px] sm:text-xs flex items-center justify-between gap-1 sm:gap-2 max-w-7xl mx-auto font-sans transition-colors overflow-x-auto whitespace-nowrap scrollbar-none ${
        isDark ? 'bg-[#042F2E] border-emerald-900 text-emerald-100' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
      }`}>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="bg-emerald-700 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest font-mono shadow-sm">
            Official
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">
            Masjid Az-Zikra Sentul <span className="hidden sm:inline">&bull; Kampung Sunnah, Bogor</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 ml-auto text-[10px] sm:text-[11px] font-mono uppercase tracking-wider shrink-0">
          <button
            onClick={() => openDigitalIbadah('salat')}
            className="hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer font-bold"
          >
            <Calendar className="w-3 h-3 text-amber-500" />
            <span className="hidden xs:inline">Jadwal</span> Shalat
          </button>
          <span className="opacity-30">|</span>
          <button
            onClick={() => openDigitalIbadah('kiblat')}
            className="hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer font-bold"
          >
            <Compass className="w-3 h-3 text-emerald-600" />
            <span>Kiblat</span>
          </button>
          <span className="opacity-30">|</span>
          <button
            onClick={openTvMode}
            className="text-amber-400 hover:bg-amber-500 hover:text-emerald-950 font-bold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full transition-all cursor-pointer border border-amber-500/30"
            title="Tampilan Layar TV Masjid"
          >
            <Tv className="w-3 h-3" />
            <span className="hidden sm:inline">Display TV</span>
          </button>

          {/* Theme Mode Toggle Button (Light/Dark) */}
          <span className="opacity-30">|</span>
          <button
            onClick={toggleThemeMode}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[9px] sm:text-[10px] tracking-wider transition-all cursor-pointer border ${
              isDark
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-emerald-900 text-amber-400 border-emerald-700 hover:bg-emerald-800'
            }`}
            title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Dark Mode)"}
          >
            {isDark ? (
              <>
                <Sun className="w-3 h-3 text-amber-400 animate-spin-slow" />
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
            title="Masjid Az-Zikra Sentul &bull; Beranda"
          >
            <AzzikraBrandLogo variant="navbar" isDark={isDark} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden">
            <button
              onClick={() => setActiveTab('beranda')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'beranda'
                  ? 'bg-emerald-700 text-white shadow-md font-extrabold'
                  : isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setActiveTab('program')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'program'
                  ? 'bg-emerald-700 text-white shadow-md font-extrabold'
                  : isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Program ZISWAF
            </button>
            <button
              onClick={() => openDonationModal()}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-amber-500" />
              Infaq & Shadaqah
            </button>
            <button
              onClick={() => setActiveTab('transparansi')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'transparansi'
                  ? 'bg-emerald-700 text-white shadow-md font-extrabold'
                  : isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Laporan Realtime
            </button>
            <button
              onClick={() => openDigitalIbadah('quran')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Al-Qur'an
            </button>
            <button
              onClick={() => setActiveTab('jadwal_khatib')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'jadwal_khatib'
                  ? 'bg-emerald-700 text-white shadow-md font-extrabold'
                  : isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Agenda Jumat
            </button>
            <button
              onClick={() => setActiveTab('qurban')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'qurban'
                  ? 'bg-emerald-700 text-white shadow-md font-extrabold'
                  : isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Patungan Qurban
            </button>
            <button
              onClick={() => setActiveTab('sejarah')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'sejarah'
                  ? 'bg-emerald-700 text-white shadow-md font-extrabold'
                  : isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Sejarah
            </button>
            <button
              onClick={() => setActiveTab('edukasi')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'edukasi'
                  ? 'bg-emerald-700 text-white shadow-md font-extrabold'
                  : isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Edukasi ZISWAF
            </button>
            <button
              onClick={() => setActiveTab('galeri')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'galeri'
                  ? 'bg-emerald-700 text-white shadow-md font-extrabold'
                  : isDark ? 'hover:text-emerald-300 hover:bg-emerald-900/60' : 'hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Galeri & Kajian
            </button>
            {session && ['pengurus_dkm', 'admin_masjid', 'ketua_dkm'].includes(session.role) && (
              <button
                onClick={() => setActiveTab('dkm_portal')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'dkm_portal'
                    ? 'bg-amber-500 text-emerald-950 font-black shadow-md'
                    : 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Portal DKM
              </button>
            )}
          </nav>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Catalog PDF Button */}
            <button
              onClick={openCatalogPdf}
              className="hidden md:flex bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-600 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Katalog Perancangan & Spesifikasi Aplikasi (PDF)"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="hidden lg:inline font-mono uppercase text-[10px] tracking-wider">Katalog PDF</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={openAiAssistant}
              className="hidden sm:flex bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold items-center gap-1.5 transition-all cursor-pointer"
              title="Az-Zikra AI Syariah Assistant"
            >
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              <span className="hidden md:inline font-mono uppercase text-[10px] tracking-wider">AI Syariah</span>
            </button>

            {/* Ziswaf Calculator Button */}
            <button
              onClick={openCalculator}
              className={`border px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold items-center gap-1.5 transition-all cursor-pointer hidden lg:flex shadow-sm ${
                isDark
                  ? 'bg-emerald-900 hover:bg-emerald-800 text-white border-emerald-700'
                  : 'bg-white hover:bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono text-[10px] uppercase tracking-wider">Hitung Zakat</span>
            </button>

            {/* Supabase & Settings (Only for Admin/Ketua DKM) */}
            {session && ['admin_masjid', 'ketua_dkm'].includes(session.role) && (
              <button
                onClick={openSupabaseModal}
                className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer shadow-sm hidden sm:block ${
                  isDark
                    ? 'bg-emerald-900 hover:bg-emerald-800 text-white border-emerald-700'
                    : 'bg-white hover:bg-emerald-50 text-emerald-900 border-emerald-200'
                }`}
                title="Pengaturan Database Supabase / Local"
              >
                <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            {/* User Login Portal Button */}
            <button
              onClick={openLoginModal}
              className="bg-[#064E3B] hover:bg-[#022C22] text-amber-300 border border-amber-500/40 font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs flex items-center gap-1 sm:gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">{session.isLoggedIn ? session.name : 'Akses Jamaah'}</span>
            </button>

            {/* Mobile Hamburger Toggle (Menu Susun Tiga) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`px-2.5 py-1.5 rounded-xl cursor-pointer flex items-center gap-1 font-bold font-mono text-[10px] uppercase tracking-wider shadow-sm transition-all ${
                isDark 
                  ? 'bg-emerald-800/60 text-amber-300 border border-amber-400/40 hover:bg-emerald-800' 
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
              }`}
              title="Menu Susun Tiga / Navigasi Halaman"
            >
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Menu Susun Tiga) */}
      {mobileMenuOpen && (
        <div className={`border-t px-4 pt-4 pb-8 space-y-5 animate-fadeIn shadow-2xl max-h-[85vh] overflow-y-auto ${
          isDark ? 'border-emerald-900 bg-[#022C22] text-white' : 'border-emerald-200 bg-white text-emerald-900'
        }`}>
          
          {/* Section 1: Halaman Utama Navigasi */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pilih Halaman Yang Ingin Dilihat</span>
              </span>
              <span className="text-[9px] font-mono opacity-60">Menu Susun Tiga</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => { setActiveTab('beranda'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'beranda' ? 'bg-emerald-700 text-white font-extrabold shadow-md' : isDark ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>1. Beranda Utama</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Dashboard</span>
              </button>

              <button
                onClick={() => { setActiveTab('program'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'program' ? 'bg-emerald-700 text-white font-extrabold shadow-md' : isDark ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>2. Program ZISWAF</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Katalog Donasi</span>
              </button>

              <button
                onClick={() => { setActiveTab('jadwal_khatib'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'jadwal_khatib' ? 'bg-emerald-700 text-white font-extrabold shadow-md' : isDark ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>3. Agenda Shalat Jumat</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Khatib & Imam</span>
              </button>

              <button
                onClick={() => { setActiveTab('qurban'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'qurban' ? 'bg-emerald-700 text-white font-extrabold shadow-md' : isDark ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>4. Patungan Qurban</span>
                <span className="text-[10px] font-mono font-normal text-amber-300">1/7 Saham Sapi</span>
              </button>

              <button
                onClick={() => { setActiveTab('transparansi'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'transparansi' ? 'bg-emerald-700 text-white font-extrabold shadow-md' : isDark ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>5. Laporan Transparansi</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Keuangan Realtime</span>
              </button>

              <button
                onClick={() => { setActiveTab('sejarah'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'sejarah' ? 'bg-emerald-700 text-white font-extrabold shadow-md' : isDark ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>6. Sejarah Az-Zikra</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Arsitektur & Tokoh</span>
              </button>

              <button
                onClick={() => { setActiveTab('edukasi'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'edukasi' ? 'bg-emerald-700 text-white font-extrabold shadow-md' : isDark ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>7. Edukasi ZISWAF</span>
                <span className="text-[10px] font-mono font-normal opacity-70">Fiqih & Panduan</span>
              </button>

              <button
                onClick={() => { setActiveTab('galeri'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'galeri' ? 'bg-emerald-700 text-white font-extrabold shadow-md' : isDark ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-100' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>8. Galeri & Kajian Umat</span>
                <span className="text-[10px] font-mono font-normal text-amber-300">Video & Foto</span>
              </button>

              {session && ['pengurus_dkm', 'admin_masjid', 'ketua_dkm'].includes(session.role) && (
                <button
                  onClick={() => { setActiveTab('dkm_portal'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 font-bold uppercase tracking-wider flex items-center justify-between border border-amber-500/40 col-span-1 sm:col-span-2"
                >
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>9. Portal Pengurus DKM</span>
                  </span>
                  <span className="text-[10px] font-mono bg-amber-500 text-emerald-950 font-black px-2 py-0.5 rounded">DKM ACCESS</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 2: Layanan & Fitur Digital Cepat */}
          <div className="space-y-2 pt-2 border-t border-emerald-800/60">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span>Layanan & Fitur Digital Cepat</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
              <button
                onClick={() => { openDonationModal(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-sm"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="truncate">Donasi ZISWAF</span>
              </button>

              <button
                onClick={() => { openDigitalIbadah('quran'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl border flex items-center gap-2 ${isDark ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-900'}`}
              >
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">Al-Qur'an Digital</span>
              </button>

              <button
                onClick={() => { openAiAssistant(); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl border flex items-center gap-2 ${isDark ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-900'}`}
              >
                <Bot className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">AI Syariah</span>
              </button>

              <button
                onClick={() => { openCalculator(); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl border flex items-center gap-2 ${isDark ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-900'}`}
              >
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">Kalkulator Zakat</span>
              </button>

              <button
                onClick={() => { openCatalogPdf(); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl border flex items-center gap-2 ${isDark ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-900'}`}
              >
                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">Katalog PDF</span>
              </button>

              <button
                onClick={() => { openTvMode(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-2"
              >
                <Tv className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">Display TV</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
