import React, { useState } from 'react';
import { UserSession, JamaahProfile, DonationRecord, JamaahCalendarNote, JamaahFeedback } from '../types';
import { 
  User, 
  History, 
  Settings, 
  CreditCard, 
  Heart,
  TrendingUp,
  Award,
  RefreshCw,
  Bell,
  Calendar,
  Info,
  BookOpen,
  HeartHandshake,
  Clock,
  MapPin,
  QrCode,
  Compass,
  MessageCircle,
  CalendarDays
} from 'lucide-react';
import { formatRupiahFull } from '../lib/islamicUtils';
import { JamaahCalendar } from './JamaahCalendar';
import { QiblaCompass } from './QiblaCompass';
import { AdhanPlayer } from './AdhanPlayer';
import { ChatDkm } from './ChatDkm';
import { AlMatsurat } from './AlMatsurat';

interface PortalJamaahDashboardProps {
  session: UserSession;
  jamaahProfiles: JamaahProfile[];
  donations?: DonationRecord[];
  onUpdateProfile?: (id: string, updatedProfile: Partial<JamaahProfile>) => void;
  openDonationModal?: () => void;
  onNavigateToHome?: () => void;
  feedbacks?: JamaahFeedback[];
  calendarNotes?: JamaahCalendarNote[];
  onSendMessage?: (feedback: Omit<JamaahFeedback, 'id' | 'createdAt' | 'status'>) => void;
  onAddNote?: (note: Omit<JamaahCalendarNote, 'id'>) => void;
  onRemoveNote?: (id: string) => void;
}

export const PortalJamaahDashboard: React.FC<PortalJamaahDashboardProps> = ({
  session,
  jamaahProfiles,
  donations = [],
  onUpdateProfile,
  openDonationModal,
  onNavigateToHome,
  feedbacks = [],
  calendarNotes = [],
  onSendMessage,
  onAddNote,
  onRemoveNote
}) => {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'kalender' | 'kompas' | 'almatsurat' | 'chat' | 'histori' | 'pengaturan'>('ringkasan');
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const profile = jamaahProfiles.find(p => p.email === session.email) || {
    id: 'unknown',
    email: session.email,
    name: session.name,
    phone: session.phone || '-',
    joinDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    totalDonation: 0,
    monthlyDonationTarget: 0,
    targetDate: 1
  };

  const [monthlyTarget, setMonthlyTarget] = useState(profile.monthlyDonationTarget || 0);
  const [targetDate, setTargetDate] = useState(profile.targetDate || 1);
  const [editName, setEditName] = useState(profile.name);
  const [editPhone, setEditPhone] = useState(profile.phone);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('Alhamdulillah, data berhasil disegarkan!');
      setTimeout(() => setToastMessage(''), 3000);
    }, 1000);
  };

  const getFirstDayOfMonth = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  };
  const getToday = () => {
    return new Date().toISOString().split('T')[0];
  };

  const [filterStartDate, setFilterStartDate] = useState(getFirstDayOfMonth());
  const [filterEndDate, setFilterEndDate] = useState(getToday());

  const allUserDonations = donations.filter(d => d.donorName.toLowerCase() === session.name.toLowerCase());
  
  const filteredDonations = allUserDonations.filter(d => {
    const dDate = d.createdAt.split('T')[0];
    return dDate >= filterStartDate && dDate <= filterEndDate;
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi 1 Nomor WhatsApp 1 Akun
    if (editPhone && editPhone !== profile.phone) {
      const isPhoneUsed = jamaahProfiles.some(p => p.id !== profile.id && p.phone === editPhone);
      if (isPhoneUsed) {
        alert("Nomor WhatsApp ini sudah terdaftar di akun lain. Pastikan 1 Nomor WhatsApp 1 Akun.");
        return;
      }
    }

    if (onUpdateProfile && profile.id !== 'unknown') {
      onUpdateProfile(profile.id, {
        name: editName,
        phone: editPhone,
        monthlyDonationTarget: monthlyTarget,
        targetDate: targetDate
      });
    }
    setToastMessage('Alhamdulillah, pembaruan profil & target donasi berhasil disimpan!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] pt-4 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-24 right-4 z-50 bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in border border-emerald-400">
            <Award className="w-5 h-5 text-emerald-100" />
            {toastMessage}
          </div>
        )}

        {/* Header Profile Section */}
        <div className="bg-gradient-to-r from-blue-900 via-[#172554] to-blue-900 rounded-2xl p-4 sm:p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border-2 border-amber-400/50 flex items-center justify-center text-2xl sm:text-3xl font-bold text-amber-300 font-serif shadow-inner backdrop-blur-sm">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="bg-amber-500 text-blue-950 font-bold font-mono text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block shadow-sm">
                  Anggota Terverifikasi
                </span>
                {profile.totalDonation >= 5000000 ? (
                  <span className="bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 font-bold font-mono text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3" /> Gold Muhsinin
                  </span>
                ) : profile.totalDonation >= 1000000 ? (
                  <span className="bg-slate-300/20 text-slate-300 border border-slate-300/30 font-bold font-mono text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3" /> Silver Muhsinin
                  </span>
                ) : (
                  <span className="bg-amber-700/20 text-amber-500 border border-amber-700/30 font-bold font-mono text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3" /> Bronze Muhsinin
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide mt-1">
                {profile.name}
              </h2>
              <p className="text-blue-200 font-mono text-xs">{profile.email} • {profile.phone}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 pt-2">
                <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                  <p className="text-[9px] text-blue-300 font-mono uppercase">Total Kebaikan</p>
                  <p className="font-bold text-amber-300 text-sm sm:text-base">{formatRupiahFull(profile.totalDonation)}</p>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 hidden sm:block">
                  <p className="text-[9px] text-blue-300 font-mono uppercase">Bergabung Sejak</p>
                  <p className="font-bold text-white text-xs sm:text-sm mt-0.5">{new Date(profile.joinDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
                </div>
                <button
                  onClick={() => alert('Fitur Kartu Jamaah Digital sedang dalam pengembangan.')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-blue-100 flex flex-col items-center justify-center px-3 py-1.5 rounded-lg transition-colors"
                  title="Kartu Jamaah"
                >
                  <QrCode className="w-4 h-4 mb-0.5" />
                  <span className="text-[8px] font-mono font-bold uppercase">Kartu ID</span>
                </button>
                <button
                  onClick={() => {
                    alert('Alhamdulillah, sistem berhasil direfresh.');
                    window.location.reload();
                  }}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-blue-100 flex flex-col items-center justify-center px-3 py-1.5 rounded-lg transition-colors"
                  title="Refresh Data"
                >
                  <RefreshCw className="w-4 h-4 mb-0.5" />
                  <span className="text-[8px] font-mono font-bold uppercase">Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          {[
            { id: 'ringkasan', label: 'Ringkasan ZISWAF', icon: TrendingUp },
            { id: 'kalender', label: 'Kalender Pintar', icon: CalendarDays },
            { id: 'kompas', label: 'Arah Kiblat', icon: Compass },
            { id: 'almatsurat', label: 'Al-Ma\'tsurat', icon: BookOpen },
            { id: 'chat', label: 'Layanan DKM', icon: MessageCircle },
            { id: 'histori', label: 'Histori Transaksi', icon: History },
            { id: 'pengaturan', label: 'Pengaturan Profil', icon: Settings },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="bg-white border border-black/5 shadow-xl rounded-2xl p-4 sm:p-6 min-h-[400px]">
          
          {activeTab === 'ringkasan' && (
            <div className="space-y-6 animate-fade-in">
              {/* Jadwal Shalat Widget */}
              <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold font-serif flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-300" />
                      Jadwal Shalat Hari Ini
                    </h3>
                    <div className="text-[10px] bg-white/10 px-2 py-1 rounded border border-white/20 flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3" /> Bogor, ID
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    {[
                      { name: 'Subuh', time: '04:35' },
                      { name: 'Dzuhur', time: '11:58' },
                      { name: 'Ashar', time: '15:15' },
                      { name: 'Maghrib', time: '17:55', active: true },
                      { name: 'Isya', time: '19:08' },
                    ].map((waktu, idx) => (
                      <div key={idx} className={`rounded-lg p-2 ${waktu.active ? 'bg-emerald-500 shadow-lg scale-105 border border-emerald-400' : 'bg-white/5 border border-white/10'}`}>
                        <p className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${waktu.active ? 'text-white' : 'text-emerald-200'}`}>{waktu.name}</p>
                        <p className={`font-mono text-xs sm:text-sm font-bold ${waktu.active ? 'text-white' : 'text-emerald-100'}`}>{waktu.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold font-serif text-blue-950 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Capaian Ibadah Maliyah Anda
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji." (Al-Baqarah: 261)
                </p>
              </div>
              
              {monthlyTarget > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <div className="p-2 bg-amber-200/50 text-amber-600 rounded-lg shrink-0">
                    <Bell className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-900 mb-1 flex items-center gap-2">
                      Pengingat Target Donasi Bulanan
                    </h4>
                    <p className="text-xs text-amber-700/80 mb-2">
                      Anda memiliki komitmen target donasi bulanan sebesar <strong>{formatRupiahFull(monthlyTarget)}</strong> setiap tanggal <strong>{targetDate}</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="flex-1 w-full bg-white rounded-full h-2 overflow-hidden border border-amber-100">
                        <div 
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, (profile.totalDonation / (monthlyTarget || 1)) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-bold text-amber-700 shrink-0">
                        Tercapai: {formatRupiahFull(profile.totalDonation)} / {formatRupiahFull(monthlyTarget)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Zakat', amount: 0, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  { label: 'Total Infaq', amount: profile.totalDonation, color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { label: 'Total Wakaf', amount: 0, color: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { label: 'Partisipasi Qurban', amount: 0, color: 'bg-rose-50 text-rose-700 border-rose-200', prefix: ' Kali' }
                ].map((item, idx) => (
                  <div key={idx} className={`${item.color} border rounded-xl p-4 relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
                    <Heart className={`absolute -right-3 -bottom-3 w-16 h-16 opacity-10 group-hover:scale-110 transition-transform`} />
                    <p className="text-[10px] font-bold font-mono uppercase tracking-wider mb-1 opacity-80">{item.label}</p>
                    <h4 className="text-xl font-bold font-serif">
                      {item.prefix ? `${item.amount}${item.prefix}` : formatRupiahFull(item.amount)}
                    </h4>
                  </div>
                ))}
              </div>

              {/* Tambahan Fitur Modern: Rekomendasi Kajian & Program */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold font-serif text-blue-950 flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-emerald-600" />
                  Rekomendasi Untuk Anda
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card Kajian */}
                  <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-32 h-32" />
                    </div>
                    <span className="bg-emerald-500/30 text-emerald-100 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      Kajian Terdekat
                    </span>
                    <h4 className="text-lg font-bold font-serif mt-3 mb-1.5 leading-tight">
                      Kajian Ahad Pagi: Tafsir Al-Baqarah
                    </h4>
                    <p className="text-emerald-100 text-xs mb-3">
                      Bersama Ustadz H. M. Zainuddin, SQ. <br/>
                      Ruang Utama Masjid Tazkia, Ahad 08:00 WIB.
                    </p>
                    <button 
                      onClick={() => onNavigateToHome && onNavigateToHome()}
                      className="bg-white text-emerald-900 px-4 py-1.5 rounded-lg text-[11px] font-bold w-full sm:w-auto shadow-sm hover:bg-emerald-50 transition-colors relative z-10"
                    >
                      Lihat Jadwal Lengkap
                    </button>
                  </div>

                  {/* Card Program Pilihan */}
                  <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform">
                      <HeartHandshake className="w-32 h-32" />
                    </div>
                    <span className="bg-blue-500/30 text-blue-100 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-blue-400/30">
                      Program Pilihan
                    </span>
                    <h4 className="text-lg font-bold font-serif mt-3 mb-1.5 leading-tight">
                      Beasiswa Santri Tahfidz Qur'an
                    </h4>
                    <p className="text-blue-100 text-xs mb-3">
                      Mari bersama mencetak generasi penghafal Qur'an. Salurkan infaq terbaik Anda mulai Rp 50.000.
                    </p>
                    <button 
                      onClick={() => openDonationModal && openDonationModal()}
                      className="bg-amber-400 text-blue-950 px-4 py-1.5 rounded-lg text-[11px] font-bold w-full sm:w-auto shadow-sm hover:bg-amber-300 transition-colors relative z-10"
                    >
                      Donasi Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kalender' && (
            <div className="animate-fade-in">
              <JamaahCalendar 
                notes={calendarNotes} 
                onAddNote={onAddNote || (() => {})} 
                onRemoveNote={onRemoveNote || (() => {})} 
                jamaahId={profile.id} 
              />
            </div>
          )}

          {activeTab === 'kompas' && (
            <div className="animate-fade-in max-w-md mx-auto">
              <QiblaCompass />
            </div>
          )}

          {activeTab === 'almatsurat' && (
            <div className="animate-fade-in max-w-3xl mx-auto">
              <AlMatsurat />
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="animate-fade-in max-w-2xl mx-auto">
              <ChatDkm 
                jamaahId={profile.id}
                jamaahName={profile.name}
                feedbacks={feedbacks}
                onSendMessage={onSendMessage || (() => {})}
              />
            </div>
          )}

          {activeTab === 'histori' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold font-serif text-blue-950 flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  Histori Transaksi ZISWAF
                </h3>
                
                <div className="flex items-center gap-2 text-xs bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <input 
                    type="date" 
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    className="outline-none text-gray-700 bg-transparent font-medium w-[100px] sm:w-auto"
                  />
                  <span className="text-gray-400 font-bold">s/d</span>
                  <input 
                    type="date" 
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    className="outline-none text-gray-700 bg-transparent font-medium w-[100px] sm:w-auto"
                  />
                </div>
              </div>
              
              {filteredDonations.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
                  <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-semibold text-gray-700">Belum ada riwayat transaksi</p>
                  <p className="text-sm mt-1">Mulai berdonasi untuk melihat histori transaksi Anda di sini.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tanggal & Ref</th>
                          <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Program</th>
                          <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Nominal</th>
                          <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredDonations.slice(0, visibleHistoryCount).map(d => (
                          <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-3">
                              <p className="text-xs font-bold text-gray-800">{new Date(d.createdAt).toLocaleDateString('id-ID')}</p>
                              <p className="text-[9px] font-mono text-gray-500 mt-0.5">{d.transactionRef}</p>
                            </td>
                            <td className="p-3">
                              <p className="text-[9px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded-full uppercase inline-block mb-1">{d.category}</p>
                              <p className="text-[11px] text-gray-700 max-w-[150px] truncate" title={d.programTitle}>{d.programTitle}</p>
                            </td>
                            <td className="p-3 text-right">
                              <p className="text-xs font-bold font-mono text-emerald-600">{formatRupiahFull(d.totalAmount)}</p>
                              <p className="text-[9px] text-gray-500 mt-0.5">Via {d.paymentMethod}</p>
                            </td>
                            <td className="p-3 text-center">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg ${
                                d.status === 'berhasil' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                d.status === 'ditolak' ? 'bg-red-100 text-red-700 border border-red-200' :
                                'bg-amber-100 text-amber-700 border border-amber-200'
                              }`}>
                                {d.status === 'berhasil' ? 'Berhasil' :
                                 d.status === 'ditolak' ? 'Ditolak' :
                                 'Menunggu Verifikasi'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {visibleHistoryCount < filteredDonations.length && (
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                      <button
                        onClick={() => setVisibleHistoryCount(prev => prev + 10)}
                        className="px-6 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        Tampilkan Lebih Banyak
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'pengaturan' && (
            <div className="max-w-2xl animate-fade-in space-y-6">
              
              {/* Adhan Settings */}
              <div>
                <h3 className="text-lg font-bold font-serif text-blue-950 flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-emerald-500" />
                  Pengaturan Adzan & Notifikasi
                </h3>
                <AdhanPlayer 
                  profile={profile}
                  onUpdateSettings={(settings) => {
                    if (onUpdateProfile) {
                      onUpdateProfile(profile.id, { adhanSettings: settings });
                    }
                  }}
                  prayerTimes={[
                    { name: 'Fajr', time: '04:35' },
                    { name: 'Sunrise', time: '05:50' },
                    { name: 'Dhuhr', time: '11:58' },
                    { name: 'Asr', time: '15:15' },
                    { name: 'Maghrib', time: '17:55' },
                    { name: 'Isha', time: '19:08' }
                  ]}
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold font-serif text-blue-950 flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Informasi Profil
                </h3>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Email / User Name Saat Ini</label>
                  <input 
                    type="text" 
                    value={profile.email}
                    disabled
                    className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-xl px-3 py-2 text-sm outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Nomor WhatsApp</label>
                  <input 
                    type="text" 
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    Target Donasi Bulanan
                  </h4>
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      Tetapkan target sedekah bulanan Anda untuk membangun istiqomah. Kami akan memberikan pengingat di dashboard pada tanggal yang Anda tentukan.
                    </p>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Target Nominal (Rp)</label>
                      <input 
                        type="number" 
                        value={monthlyTarget}
                        onChange={(e) => setMonthlyTarget(Number(e.target.value))}
                        placeholder="Contoh: 500000"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Tanggal Pengingat Rutin (1 - 31)</label>
                      <input 
                        type="number" 
                        min="1" max="31"
                        value={targetDate}
                        onChange={(e) => setTargetDate(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-700 mb-3">Ubah Kata Sandi</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Kata Sandi Lama</label>
                      <input 
                        type="password" 
                        placeholder="Masukkan kata sandi lama"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Kata Sandi Baru</label>
                      <input 
                        type="password" 
                        placeholder="Masukkan kata sandi baru"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Konfirmasi Kata Sandi Baru</label>
                      <input 
                        type="password" 
                        placeholder="Ketik ulang kata sandi baru"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer w-full sm:w-auto mt-4">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};
