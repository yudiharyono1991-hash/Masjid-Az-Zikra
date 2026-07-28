import React, { useState } from 'react';
import { UserSession, JamaahProfile, DonationRecord } from '../types';
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
  Info
} from 'lucide-react';
import { formatRupiahFull } from '../lib/islamicUtils';

interface PortalJamaahDashboardProps {
  session: UserSession;
  jamaahProfiles: JamaahProfile[];
  donations?: DonationRecord[];
  onUpdateProfile?: (updatedProfile: Partial<JamaahProfile>) => void;
}

export const PortalJamaahDashboard: React.FC<PortalJamaahDashboardProps> = ({
  session,
  jamaahProfiles,
  donations = [],
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
    totalDonation: 0,
    monthlyDonationTarget: 0,
    targetDate: 1
  };

  const [monthlyTarget, setMonthlyTarget] = useState(profile.monthlyDonationTarget || 0);
  const [targetDate, setTargetDate] = useState(profile.targetDate || 1);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('Alhamdulillah, data berhasil disegarkan!');
      setTimeout(() => setToastMessage(''), 3000);
    }, 1000);
  };

  const userDonations = donations.filter(d => d.donorName.toLowerCase() === session.name.toLowerCase());

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile(profile.id, {
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
              
              {monthlyTarget > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-3 bg-amber-200/50 text-amber-600 rounded-xl shrink-0">
                    <Bell className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-2">
                      Pengingat Target Donasi Bulanan
                    </h4>
                    <p className="text-sm text-amber-700/80 mb-3">
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
              
              {userDonations.length === 0 ? (
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
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal & Ref</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Program</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Nominal</th>
                          <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {userDonations.map(d => (
                          <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4">
                              <p className="text-sm font-bold text-gray-800">{new Date(d.createdAt).toLocaleDateString('id-ID')}</p>
                              <p className="text-[10px] font-mono text-gray-500 mt-1">{d.transactionRef}</p>
                            </td>
                            <td className="p-4">
                              <p className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full uppercase inline-block mb-1">{d.category}</p>
                              <p className="text-xs text-gray-700 max-w-[200px] truncate" title={d.programTitle}>{d.programTitle}</p>
                            </td>
                            <td className="p-4 text-right">
                              <p className="text-sm font-bold font-mono text-emerald-600">{formatRupiahFull(d.totalAmount)}</p>
                              <p className="text-[10px] text-gray-500 mt-1">Via {d.paymentMethod}</p>
                            </td>
                            <td className="p-4 text-center">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
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
                </div>
              )}
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
          )}

        </div>
      </div>
    </div>
  );
};
