import React from 'react';
import { TazkiaBrandLogo } from './TazkiaBrandLogo';
import {
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  BookOpen,
  Calendar,
  Sparkles,
  FileText,
  UserCheck
} from 'lucide-react';
import { useMasjidStore } from '../lib/store';

interface FooterProps {
  openDonationModal: () => void;
  openCalculator: () => void;
  openDigitalIbadah: (tab?: 'quran' | 'salat' | 'kiblat') => void;
  openTvMode: () => void;
  session?: any;
  isDark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  openDonationModal,
  openCalculator,
  openDigitalIbadah,
  openTvMode,
  session,
  isDark = false
}) => {
  const { state } = useMasjidStore();

  return (
    <footer className="pt-16 pb-12 border-t transition-colors bg-[#172554] text-white border-[#172554] relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url("/hero-1.jpg")` }}
      />
      <div className="absolute inset-0 z-0 bg-[#153476]/95 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <TazkiaBrandLogo variant="navbar" isDark={true} />

            <p className="text-xs leading-relaxed font-sans text-blue-200">
              Pusat ibadah, ZISWAF transparan, dan pelayanan umat di Sentul City, Bogor.
            </p>

            <div className="pt-2 text-xs space-y-1.5 font-mono text-blue-200">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">Jl. Ir. H. Djuanda No. 78 Sentul City, Bogor Indonesia</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>0858 1000 8899 (WA / Telp Sekretariat DKM)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>masjidtazkia@tazkia.ac.id</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigasi Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-blue-800 pb-2">
              Layanan Jamaah
            </h4>
            <ul className="space-y-2 text-xs font-medium text-blue-300">
              <li>
                <button onClick={openDonationModal} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>Donasi Zakat, Infaq & Wakaf</span>
                </button>
              </li>
              <li>
                <button onClick={openCalculator} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kalkulator ZISWAF Syariah</span>
                </button>
              </li>
              <li>
                <button onClick={() => openDigitalIbadah('quran')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Al-Qur'an Digital Audio Murottal</span>
                </button>
              </li>
              <li>
                <button onClick={() => openDigitalIbadah('salat')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Jadwal Shalat & Adzan</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Program Operasional */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-blue-800 pb-2">
              Daftar Program Saat Ini
            </h4>
            <ul className="space-y-2 text-xs font-medium text-blue-200">
              {state.programs.length > 0 ? (
                state.programs.slice(0, 5).map((p, index) => (
                  <li key={p.id}>{index + 1}. {p.title}</li>
                ))
              ) : (
                <li>Belum ada program.</li>
              )}
            </ul>
          </div>

          {/* Col 4: Pengurus DKM */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 border-b border-blue-800 pb-2">
              Pengurus DKM
            </h4>
            <div className="space-y-2 text-xs text-blue-200">
              {(state.boardMembers || []).sort((a, b) => a.orderIdx - b.orderIdx).slice(0, 3).map(member => (
                <div key={member.id} className="flex items-start gap-2 mb-3">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <strong className="text-blue-100 leading-snug">{member.groupTitle || member.position}</strong>
                    <span className="opacity-90 mt-0.5">{member.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {session && ['admin_masjid', 'ketua_dkm', 'pengurus_dkm'].includes(session.role) && (
              <button
                onClick={openTvMode}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-mono font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all border border-blue-500/40 mt-4"
              >
                <span>Tampilkan Mode TV Masjid</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom: Salam & Identitas Resmi */}
        <div className="rounded-2xl border p-6 space-y-4 bg-blue-950/50 border-blue-800">
          <p className="text-sm font-serif italic leading-relaxed text-amber-200">
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh.
          </p>
          <p className="text-xs leading-relaxed text-blue-200">
            Aplikasi digital <strong className="text-blue-100">Masjid Tazkia</strong> hadir untuk memudahkan jamaah dalam ber-ZISWAF,
            memantau transparansi keuangan, serta mengakses layanan ibadah dan informasi masjid secara modern dan amanah.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-[11px] font-mono text-blue-300">
            <p><span className="text-amber-400 font-bold">Nama Masjid:</span> Masjid Tazkia</p>
            <p><span className="text-amber-400 font-bold">Pengurus Utama:</span> {((state.boardMembers || []).sort((a,b)=>a.orderIdx-b.orderIdx)[0]?.name || 'Syarifudin Kusin')}</p>
            <p className="sm:col-span-2"><span className="text-amber-400 font-bold">Alamat:</span> Jl. Ir. H. Djuanda No. 78 Sentul City, Bogor Indonesia</p>
            <p><span className="text-amber-400 font-bold">Email:</span> masjidtazkia@tazkia.ac.id</p>
            <p><span className="text-amber-400 font-bold">Telp / WA:</span> 0858 1000 8899</p>
          </div>
        </div>

        {(() => {
          try {
            const saved = localStorage.getItem('tazkia_sponsors');
            if (saved) {
              const sponsors = JSON.parse(saved);
              if (sponsors && sponsors.length > 0) {
                return (
                  <div className="py-6 border-t border-blue-800/50">
                    <p className="text-center text-xs font-bold text-blue-300 mb-4 uppercase tracking-widest">Sponsored & Supported By</p>
                    <div className="flex flex-wrap justify-center gap-6 items-center">
                      {sponsors.map((sp: any) => (
                        <div key={sp.id} className="bg-white/90 p-2 rounded-xl hover:bg-white transition-colors">
                          <img src={sp.imageUrl} alt={sp.name} className="h-10 object-contain" title={sp.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            }
          } catch(e) {}
          return null;
        })()}

        <div className="pt-4 border-t border-blue-800 flex flex-col items-center justify-center text-xs text-blue-400 text-center">
          <div className="space-y-1">
            <p className="font-semibold text-blue-200 tracking-wide text-xs sm:text-sm">
              &copy; 2026 Masjid Tazkia. All Rights Reserved.
            </p>
            <p className="text-[11px] text-blue-400">
              Jl. Ir. H. Djuanda No. 78 Sentul City, Bogor Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
