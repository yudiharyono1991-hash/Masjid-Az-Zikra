import React, { useState } from 'react';
import { UserSession, JamaahProfile } from '../types';
import { 
  User, 
  History, 
  Settings, 
  CreditCard, 
  Heart,
  TrendingUp,
  Award,
  RefreshCw
} from 'lucide-react';
import { formatRupiahFull } from '../lib/islamicUtils';

interface PortalJamaahDashboardProps {
  session: UserSession;
  jamaahProfiles: JamaahProfile[];
  onUpdateProfile?: (updatedProfile: Partial<JamaahProfile>) => void;
}

export const PortalJamaahDashboard: React.FC<PortalJamaahDashboardProps> = ({
  session,
  jamaahProfiles,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'histori' | 'pengaturan'>('ringkasan');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const profile = jamaahProfiles.find(p => p.email === session.email) || {
    id: 'unknown',
    email: session.email,
    name: session.name,
    phone: session.phone || '-',
    joinDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    totalDonation: 0
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('Alhamdulillah, data berhasil disegarkan!');
      setTimeout(() => setToastMessage(''), 3000);
    }, 1000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Alhamdulillah, pembaruan profil berhasil disimpan!');
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
        <div className="bg-gradient-to-r from-blue-900 via-[#172554] to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/10 border-4 border-amber-400/50 flex items-center justify-center text-4xl sm:text-5xl font-bold text-amber-300 font-serif shadow-inner backdrop-blur-sm">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <span className="bg-amber-500 text-blue-950 font-bold font-mono text-[10px] px-3 py-1 rounded-full uppercase tracking-widest inline-block shadow-sm">
                Anggota Terverifikasi
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
                {profile.name}
              </h2>
              <p className="text-blue-200 font-mono text-sm">{profile.email} • {profile.phone}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-4 pt-3">
                <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="text-[10px] text-blue-300 font-mono uppercase">Total Kebaikan</p>
                  <p className="font-bold text-amber-300 text-lg">{formatRupiahFull(profile.totalDonation)}</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 hidden sm:block">
                  <p className="text-[10px] text-blue-300 font-mono uppercase">Bergabung Sejak</p>
                  <p className="font-bold text-white text-sm mt-1">{new Date(profile.joinDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                </div>
                <button
                  onClick={() => {
                    alert('Alhamdulillah, sistem berhasil direfresh.');
                    window.location.reload();
                  }}
                  className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 px-4 py-2 rounded-xl backdrop-blur-sm transition-all flex flex-col items-center justify-center cursor-pointer"
                  title="Refresh Dashboard"
                >
                  <RefreshCw className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px] font-mono uppercase font-bold">Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'ringkasan', label: 'Ringkasan ZISWAF', icon: TrendingUp },
            { id: 'histori', label: 'Histori Transaksi', icon: History },
            { id: 'pengaturan', label: 'Pengaturan Profil', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl whitespace-nowrap text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-700 text-white shadow-lg'
                    : 'bg-white text-blue-900 border border-blue-100 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="bg-white border border-black/5 shadow-xl rounded-3xl p-6 sm:p-8 min-h-[400px]">
          
          {activeTab === 'ringkasan' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold font-serif text-blue-950 flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-500" />
                  Capaian Ibadah Maliyah Anda
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji." (Al-Baqarah: 261)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Zakat', amount: 0, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  { label: 'Total Infaq', amount: profile.totalDonation, color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { label: 'Total Wakaf', amount: 0, color: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { label: 'Partisipasi Qurban', amount: 0, color: 'bg-rose-50 text-rose-700 border-rose-200', prefix: ' Kali' }
                ].map((item, idx) => (
                  <div key={idx} className={`${item.color} border rounded-2xl p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
                    <Heart className={`absolute -right-4 -bottom-4 w-20 h-20 opacity-10 group-hover:scale-110 transition-transform`} />
                    <p className="text-[11px] font-bold font-mono uppercase tracking-wider mb-2 opacity-80">{item.label}</p>
                    <h4 className="text-2xl font-bold font-serif">
                      {item.prefix ? `${item.amount}${item.prefix}` : formatRupiahFull(item.amount)}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'histori' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-serif text-blue-950 flex items-center gap-2">
                  <History className="w-6 h-6 text-blue-600" />
                  Histori Transaksi ZISWAF
                </h3>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
                <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-gray-700">Belum ada riwayat transaksi</p>
                <p className="text-sm mt-1">Mulai berdonasi untuk melihat histori transaksi Anda di sini.</p>
              </div>
            </div>
          )}

          {activeTab === 'pengaturan' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <h3 className="text-xl font-bold font-serif text-blue-950 flex items-center gap-2">
                <Settings className="w-6 h-6 text-slate-500" />
                Pengaturan Akun & Profil
              </h3>
              
              <form className="space-y-4" onSubmit={handleSaveProfile}>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    defaultValue={profile.name}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Email Saat Ini</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    disabled
                    className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-xl px-4 py-2.5 outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Nomor WhatsApp</label>
                  <input 
                    type="text" 
                    defaultValue={profile.phone}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
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
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer shadow-md">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
