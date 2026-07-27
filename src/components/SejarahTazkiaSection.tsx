import React, { useState, useEffect } from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

interface ProfilData {
  youtubeUrl: string;
  sejarah: string;
  visi: string;
  misi: string[];
}

export const SejarahTazkiaSection: React.FC = () => {
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
        <p className="text-sm mt-3 text-blue-200 max-w-2xl mx-auto px-4">
          Menjadi Oase Spiritual, Intelektual dan Pemberdayaan finansial umat yang berdasarkan nilai-nilai luhur Islam.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Row 1: Sejarah & Video */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-12 mb-12 flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-800 border-b-2 border-amber-500 pb-3 inline-block">Sejarah & Latar Belakang</h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap">
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
            <p className="text-sm text-slate-600 leading-relaxed">
              {profilData.visi}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-amber-100 shadow-lg p-8 relative overflow-hidden group hover:border-amber-300 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Misi</h3>
            <ul className="text-sm text-slate-600 leading-relaxed space-y-3">
              {profilData.misi.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-500 font-bold shrink-0">&bull;</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Dewan Pembina & Direktur */}
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif text-blue-900 border-b-2 border-blue-500 pb-2 inline-block">Dewan Pembina Yayasan</h2>
            
            <div className="mt-8 max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row text-left">
              <div className="sm:w-1/3 bg-gradient-to-b from-slate-100 to-blue-900 p-6 flex flex-col justify-end min-h-[300px] relative">
                {/* Photo Placeholder */}
                <div className="absolute inset-0 bg-blue-900 bg-cover bg-center mix-blend-luminosity opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent"></div>
                <div className="relative z-10 text-white">
                  <h4 className="font-bold text-lg font-serif">Prof. Dr. M. Syafii Antonio</h4>
                  <p className="text-xs text-blue-200 mt-1 font-mono">Ketua Dewan Pembina</p>
                </div>
              </div>
              <div className="sm:w-2/3 p-8 sm:p-10 relative">
                <div className="text-6xl text-blue-100 absolute top-4 left-6 font-serif opacity-50">"</div>
                <div className="text-sm text-slate-600 leading-relaxed relative z-10 space-y-4">
                  <p>Lahir di Sukabumi, 12 Mei 1965. Beliau adalah tokoh ekonomi syariah Indonesia yang memiliki latar belakang perjalanan spiritual yang unik dan inspiratif.</p>
                  <p>Tumbuh di lingkungan keluarga yang majemuk, beliau mengenal ajaran Islam melalui interaksi sosial sejak kecil. Ketertarikannya pada cara ibadah umat Islam membawanya pada pencarian kebenaran, hingga akhirnya memutuskan untuk bersyahadat.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif text-blue-900 border-b-2 border-blue-500 pb-2 inline-block">Direktur Masjid Tazkia Islamic Center</h2>
            
            <div className="mt-8 max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row text-left">
              <div className="sm:w-1/3 bg-gradient-to-b from-slate-100 to-blue-900 p-6 flex flex-col justify-end min-h-[300px] relative">
                <div className="absolute inset-0 bg-blue-900 bg-cover bg-center mix-blend-luminosity opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent"></div>
                <div className="relative z-10 text-white">
                  <h4 className="font-bold text-lg font-serif">Syaripudin Kusin</h4>
                  <p className="text-xs text-blue-200 mt-1 font-mono">Direktur</p>
                </div>
              </div>
              <div className="sm:w-2/3 p-8 sm:p-10 relative">
                <div className="text-6xl text-blue-100 absolute top-4 left-6 font-serif opacity-50">"</div>
                <div className="text-sm text-slate-600 leading-relaxed relative z-10 space-y-4">
                  <p>Direktur Operasional Masjid Tazkia adalah sosok profesional yang amanah dan berpengalaman luas dalam pengelolaan keuangan, audit, dan tata kelola organisasi. Dengan pengalaman lebih dari dua dekade di berbagai perusahaan dan lembaga, beliau berperan memastikan operasional masjid berjalan secara efektif, transparan, dan sesuai prinsip syariah.</p>
                  <p>Berkomitmen menjadikan masjid sebagai pusat ibadah, pendidikan, dan pemberdayaan umat, beliau mengedepankan nilai keikhlasan, profesionalisme, serta pelayanan terbaik bagi jamaah.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif text-blue-900 border-b-2 border-blue-500 pb-2 inline-block">Ketua DKM Masjid Tazkia Islamic Center</h2>
            
            <div className="mt-8 max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row text-left">
              <div className="sm:w-1/3 bg-gradient-to-b from-slate-100 to-blue-900 p-6 flex flex-col justify-end min-h-[300px] relative">
                <div className="absolute inset-0 bg-blue-900 bg-cover bg-center mix-blend-luminosity opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent"></div>
                <div className="relative z-10 text-white">
                  <h4 className="font-bold text-lg font-serif">Abdul Mughni</h4>
                  <p className="text-xs text-blue-200 mt-1 font-mono">Ketua DKM</p>
                </div>
              </div>
              <div className="sm:w-2/3 p-8 sm:p-10 relative">
                <div className="text-6xl text-blue-100 absolute top-4 left-6 font-serif opacity-50">"</div>
                <div className="text-sm text-slate-600 leading-relaxed relative z-10 space-y-4">
                  <p>Ketua DKM Masjid Tazkia adalah pemimpin yang amanah dan berkomitmen dalam memakmurkan masjid sebagai pusat ibadah, dakwah, dan pemberdayaan umat.</p>
                  <p>Dengan mengedepankan nilai keikhlasan, kebersamaan, dan profesionalisme, beliau membina pengelolaan masjid yang transparan, inklusif, serta berlandaskan Al-Quran dan Sunnah, demi menghadirkan pelayanan terbaik bagi jamaah dan masyarakat luas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
