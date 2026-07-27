import React, { useState } from 'react';
import { UserSession, UserRole } from '../types';
import {
  UserCheck,
  X,
  Mail,
  Lock,
  Calendar,
  Sparkles,
  History,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: UserSession;
  onLogin: (email: string, name: string, role: UserRole, phone?: string) => void;
  onLogout: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  session,
  onLogin,
  onLogout
}) => {
  const [email, setEmail] = useState(session.email || 'jamaah@tazkia.ac.id');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('jamaah');
  const [name, setName] = useState('Jamaah Tazkia');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roleNames: Record<UserRole, string> = {
      jamaah: 'Jamaah Setia Tazkia',
      ketua_dkm: 'Syaripudin Kusin',
      bendahara: 'Bendahara DKM',
      penghimpunan: 'Bagian Penghimpunan',
      penyaluran: 'Bagian Penyaluran',
      admin_masjid: 'Admin Masjid Tazkia',
      pengurus_dkm: 'Pengurus DKM Tazkia'
    };
    const finalName = name || roleNames[role];
    onLogin(email, finalName, role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#F9F8F4] border border-black/15 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative text-[#1A1A1A] my-8">
        {/* Header Bar */}
        <div className="bg-[#1e3a8a] text-white px-6 py-4 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif italic font-semibold text-white">
                Masjid Tazkia - Portal Keanggotaan
              </h3>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/80">
                Selamat Datang di Portal Transaksi ZISWAF Jamaah
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Grid matching Screenshot 3 Layout */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Left Side */}
          {session.isLoggedIn ? (
            <div className="space-y-4 text-center py-6 my-auto">
              <div className="w-16 h-16 rounded-full bg-blue-100 border border-blue-300 text-blue-700 flex items-center justify-center mx-auto text-2xl font-bold font-serif">
                {session.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-900 font-serif">{session.name}</h4>
                <p className="text-xs text-blue-600 font-mono mt-0.5">{session.email}</p>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded mt-2 inline-block uppercase">
                  Akses {session.role.replace(/_/g, ' ')}
                </span>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-md"
              >
                Keluar Akun (Logout)
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold text-blue-800 block">
                  Pilih Akses Peran (Role):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('jamaah');
                      setName('Jamaah Tazkia');
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      role === 'jamaah'
                        ? 'bg-amber-400 text-blue-950 border-amber-500'
                        : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                    }`}
                  >
                    Jamaah Umum
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('admin_masjid');
                      setName('Petugas Masjid Tazkia');
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      role === 'admin_masjid'
                        ? 'bg-blue-600 text-white border-blue-700'
                        : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                    }`}
                  >
                    Petugas Masjid
                  </button>
                </div>
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-blue-800 block mb-1">
                  Nama Lengkap:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-blue-300 focus:border-amber-500 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-xs text-blue-900 outline-none"
                />
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-blue-800 block mb-1">
                  Alamat Email:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-blue-300 focus:border-amber-500 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-blue-900 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-blue-800 block mb-1">
                  Kata Sandi (Password):
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-blue-300 focus:border-amber-500 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-blue-900 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Masuk Portal Keanggotaan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Right Highlights Panel matching Screenshot 3 Right Sidebar */}
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-4 my-auto">
            <h4 className="text-sm font-bold font-serif text-blue-900 border-b border-blue-200 pb-2">
              Fitur Portal Jamaah (Tersedia Setelah Login):
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-blue-900">Donasi Otomatis</p>
                  <p className="text-blue-600 text-[11px]">(Harian / Mingguan / Bulanan)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-blue-900">Kalkulator Zakat Pribadi</p>
                  <p className="text-blue-600 text-[11px]">Hitung nisab zakat mal & penghasilan</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <History className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-blue-900">Histori Transaksi Cepat</p>
                  <p className="text-blue-600 text-[11px]">Laporan tanda terima resmi DKM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-blue-900">Manajemen Profil</p>
                  <p className="text-blue-600 text-[11px]">Keanggotaan terverifikasi jamaah</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
