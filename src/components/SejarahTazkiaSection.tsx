import React, { useState, useEffect } from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { useMasjidStore } from '../lib/store';

interface ProfilData {
  youtubeUrl: string;
  sejarah: string;
  visi: string;
  misi: string[];
}

export const SejarahTazkiaSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const store = useMasjidStore();
  
  // Group board members by roleType
  const pembina = store.state.boardMembers?.filter(m => m.roleType === 'pembina').sort((a,b) => a.orderIdx - b.orderIdx) || [];
  const pengurus = store.state.boardMembers?.filter(m => m.roleType === 'pengurus').sort((a,b) => a.orderIdx - b.orderIdx) || [];
  const [profilData, setProfilData] = useState<ProfilData>({
    youtubeUrl: 'https://youtu.be/-oT4ZYK2ZjI?si=-pEBAAicepgcMVPj',
    sejarah: `Andalusia Islamic Center hadir karena kepedulian akan masalah besar bangsa dan ummat Islam Indonesia yang didominasi oleh kemiskinan, keterbelakangan Pendidikan serta rendahnya moralitas baik di tingkat birokrasi maupun swasta. Besar harapan kami dengan segala kekurangan, Andalusia Islamic Center dapat menjadi Oase Spiritual, Intelektual dan Pemberdayaan finansial ummat yang berlandaskan nilai-nilai luhur spiritual Islam.\n\nSejak pendiriannya tahun 2006 oleh Prof. Dr. Syafii Antonio, M.Ec. Andalusia Islamic Center telah berkiprah dalam bidang sosial, dakwah dan pemberdayaan ekonomi yang meliputi:\n\n1. Sarana Ibadah\n2. Kajian Ke-Islaman harian, mingguan, dan bulanan\n3. Program Tahfidz untuk berbagai umur\n4. Pemberdayaan ekonomi mikro\n5. Santunan Yatim dan dhuafa\n6. Pembinaan muallaf\n7. Peringatan hari besar Islam`,
    visi: 'Menjadi Oase Spiritual dan Intelektual Islam yang memberikan pencerahan, kesejukan dan pemberdayaan serta wawasan Rahmatan Lil Alamin.',
    misi: [
      'Menyelenggarakan pelatihan dan konseling keumatan.',
      'Mengembangkan ekonomi kerakyatan berbasis syariah.',
      'Membina para muallaf agar istiqomah.'
    ]
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tazkia_profil_data');
      if (saved) {
        setProfilData(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Extract YouTube ID
  let youtubeId = '-oT4ZYK2ZjI';
  try {
    if (profilData.youtubeUrl.includes('youtu.be/')) {
      youtubeId = profilData.youtubeUrl.split('youtu.be/')[1].split('?')[0];
    } else if (profilData.youtubeUrl.includes('youtube.com/watch?v=')) {
      youtubeId = profilData.youtubeUrl.split('v=')[1].split('&')[0];
    }
  } catch(e) {}

  return (
    <section className="bg-white min-h-screen font-sans pb-24">
      {/* Header Blue */}
      <div className="bg-[#1e3a8a] text-white py-16 text-center">
        <p className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-blue-300 mb-3 uppercase">Tentang Kami</p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold">Mengenal Masjid Tazkia</h1>
        <p className="text-sm mt-3 text-blue-200 max-w-2xl mx-auto px-4 text-balance">
          Menjadi Oase Spiritual, Intelektual dan Pemberdayaan finansial umat yang berdasarkan nilai-nilai luhur&nbsp;Islam.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Row 1: Sejarah & Video */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-12 mb-12 flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-800 border-b-2 border-amber-500 pb-3 inline-block">Sejarah & Latar Belakang</h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap text-justify">
              {profilData.sejarah}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-video w-full bg-slate-900 relative">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0`} 
                title="Video Profil Masjid Tazkia" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Row 2: Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg p-8 relative overflow-hidden group hover:border-blue-300 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Visi</h3>
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap text-justify">
              {profilData.visi}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-amber-100 shadow-lg p-8 relative overflow-hidden group hover:border-amber-300 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Misi</h3>
            <ul className="text-sm text-slate-600 leading-relaxed space-y-3 text-justify">
              {profilData.misi.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-500 font-bold shrink-0">&bull;</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Dewan Pembina & Pengurus */}
        <div className="space-y-16">
          {/* Dewan Pembina */}
          {pembina.length > 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold font-serif text-blue-900 border-b-2 border-blue-500 pb-2 inline-block">Dewan Pembina Yayasan</h2>
              
              <div className="mt-8 flex flex-col gap-8 max-w-4xl mx-auto">
                {pembina.map(member => (
                  <div key={member.id} className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col md:flex-row text-left group hover:shadow-xl transition-all duration-300">
                    <div className="bg-slate-100 p-6 flex flex-col justify-end h-[350px] md:w-[35%] relative shrink-0">
                      <div 
                        className="absolute inset-0 bg-cover bg-top transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${member.imageUrl}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1b3679] via-[#1b3679]/70 to-transparent h-1/2 mt-auto"></div>
                      <div className="relative z-10 text-white">
                        <h4 className="font-bold text-[17px] font-serif leading-tight">{member.name}</h4>
                        <p className="text-[11px] text-blue-100 mt-1 font-sans">{member.position}</p>
                      </div>
                    </div>
                    {member.bio && (
                      <div className="p-8 md:p-12 relative flex-grow bg-white flex flex-col justify-center">
                        <div className="text-7xl text-blue-100 absolute top-6 left-8 font-serif opacity-40 leading-none">"</div>
                        <div className="text-[13px] text-slate-500 leading-[1.8] relative z-10 text-justify mt-4 whitespace-pre-wrap break-words">
                          {member.bio}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pengurus DKM */}
          {pengurus.length > 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold font-serif text-blue-900 border-b-2 border-blue-500 pb-2 inline-block">Pengurus DKM Masjid Tazkia</h2>
              
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pengurus.map(member => (
                  <div key={member.id} className="bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden flex flex-col text-left group hover:shadow-xl transition-all duration-300">
                    <div className="bg-slate-100 p-6 flex flex-col justify-end h-[280px] relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-top transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${member.imageUrl}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1b3679] via-[#1b3679]/70 to-transparent h-2/3 mt-auto"></div>
                      <div className="relative z-10 text-white">
                        <h4 className="font-bold text-[17px] font-serif leading-tight">{member.name}</h4>
                        <p className="text-[11px] text-blue-100 mt-1.5 font-sans tracking-wide uppercase">{member.position}</p>
                      </div>
                    </div>
                    {member.bio && (
                      <div className="p-7 relative flex-grow bg-white flex flex-col">
                        <div className="text-[13px] text-slate-500 leading-[1.7] relative z-10 text-justify whitespace-pre-wrap break-words">
                          {member.bio}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* LOKASI DAN FAQ SECTION */}
        <div className="mt-24 pt-12 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto text-left">
            
            {/* Left: Lokasi Kami */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-blue-900 mb-6">Lokasi Kami</h2>
              <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 h-[400px] w-full overflow-hidden relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.298950284065!2d106.86608931477051!3d-6.551817995277873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1187d9039bd%3A0xc64ef72d4ecf7f18!2sMasjid%20Tazkia%20Islamic%20Center!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '0.75rem' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Masjid Tazkia"
                ></iframe>
              </div>
            </div>

            {/* Right: Pertanyaan yang sering diajukan */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-blue-900 mb-6">Pertanyaan yang sering diajukan</h2>
              <div className="space-y-3">
                {[
                  { q: "Dimana lokasi Masjid Tazkia?", a: "Masjid Tazkia berlokasi di Jl. Ir. H. Djuanda No. 78, Sentul City, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810. Berlokasi di komplek Tazkia bersama dengan Kampus Universitas Tazkia, sangat strategis dan mudah diakses dari pintu tol Sentul Selatan dan pintu tol Bogor." },
                  { q: "Apa saja fasilitasnya?", a: "Masjid Tazkia merupakan masjid berkhidmat dengan fasilitas yang lengkap dan modern untuk mendukung ibadah, edukasi, dan pelayanan umat. Dilengkapi ruang utama ibadah yang nyaman, aula serbaguna, area parkir luas, ruang dan area bermain anak, fasilitas wudhu dan toilet modern, perpustakaan, klinik masjid, hingga guest house syariah. Masjid Tazkia juga menyediakan pusat informasi serta mualaf center." },
                  { q: "Apakah Ramah Disabilitas?", a: "Masjid Tazkia dirancang dengan konsep inklusif. Kami menyediakan jalur kursi roda (ramp), lift khusus difabel dan lansia, toilet khusus difabel, dan area sholat yang mudah diakses bagi jamaah berkebutuhan khusus." },
                  { q: "Apa saja kegiatan rutin yang diselenggarakan?", a: "Masjid Tazkia menyelenggarakan berbagai kegiatan rutin sepanjang pekan yang terbuka untuk umum, meliputi kajian keislaman, kelas tahsin Al-Quran, TPA, olahraga, hingga kegiatan sosial. Kegiatan dilaksanakan dari Senin hingga Ahad dengan jadwal teratur, seperti kajian muslimah, kajian rutin KOPI MANTUL, buka puasa sunnah, shalat Jumat berjamaah, distribusi Jumat Berkah, serta kajian ahad pagi." },
                  { q: "Bagaimana cara menyalurkan donasi?", a: "Penyaluran donasi ZISWAF (Zakat, Infaq, Shadaqah, Wakaf, Fidyah) dapat dilakukan dengan sangat mudah, aman, dan transparan melalui aplikasi ini pada menu ZISWAF. Anda bisa menggunakan QRIS, Virtual Account, atau Transfer Bank. Untuk donasi tunai atau natura, silakan datang langsung ke kantor layanan ZISWAF di area Masjid Tazkia." }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-blue-300 transition-colors">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none"
                    >
                      <span className="font-semibold text-blue-900 text-sm sm:text-base">{faq.q}</span>
                      <svg 
                        className={`w-5 h-5 text-blue-500 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === idx ? 'rotate-180' : ''}`} 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2 bg-slate-50/50 text-justify">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
