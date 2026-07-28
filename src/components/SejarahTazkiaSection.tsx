import React, { useState, useEffect } from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

interface ProfilData {
  youtubeUrl: string;
  sejarah: string;
  visi: string;
  misi: string[];
}

export const SejarahTazkiaSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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

        {/* Row 3: Dewan Pembina & Direktur */}
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif text-blue-900 border-b-2 border-blue-500 pb-2 inline-block">Dewan Pembina Yayasan</h2>
            
            <div className="mt-8 max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row text-left">
              <div className="sm:w-1/3 bg-gradient-to-b from-slate-100 to-blue-900 p-6 flex flex-col justify-end min-h-[300px] relative">
                {/* Photo - Prof. Dr. M. Syafii Antonio */}
                <div 
                  className="absolute inset-0 bg-cover bg-top"
                  style={{ backgroundImage: `url('https://www.masjidtazkia.com/_next/image?url=%2Fmsa.png&w=1920&q=75&dpl=dpl_52LWe9BbafS3V6pC1qph7pJgjnrx')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/30 to-transparent"></div>
                <div className="relative z-10 text-white">
                  <h4 className="font-bold text-lg font-serif">Prof. Dr. M. Syafii Antonio</h4>
                  <p className="text-xs text-blue-200 mt-1 font-mono">Ketua Dewan Pembina</p>
                </div>
              </div>
              <div className="sm:w-2/3 p-8 sm:p-10 relative">
                <div className="text-6xl text-blue-100 absolute top-4 left-6 font-serif opacity-50">"</div>
                <div className="text-sm text-slate-600 leading-relaxed relative z-10 space-y-4 text-justify">
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
                {/* Photo - Syaripudin Kusin */}
                <div 
                  className="absolute inset-0 bg-cover bg-top"
                  style={{ backgroundImage: `url('https://www.masjidtazkia.com/_next/image?url=%2Fsyarif.png&w=1920&q=75&dpl=dpl_52LWe9BbafS3V6pC1qph7pJgjnrx')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/30 to-transparent"></div>
                <div className="relative z-10 text-white">
                  <h4 className="font-bold text-lg font-serif">Syaripudin Kusin</h4>
                  <p className="text-xs text-blue-200 mt-1 font-mono">Direktur</p>
                </div>
              </div>
              <div className="sm:w-2/3 p-8 sm:p-10 relative">
                <div className="text-6xl text-blue-100 absolute top-4 left-6 font-serif opacity-50">"</div>
                <div className="text-sm text-slate-600 leading-relaxed relative z-10 space-y-4 text-justify">
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
                {/* Photo - Abdul Mughni */}
                <div 
                  className="absolute inset-0 bg-cover bg-top"
                  style={{ backgroundImage: `url('https://www.masjidtazkia.com/_next/image?url=%2Fmughni.png&w=1920&q=75&dpl=dpl_52LWe9BbafS3V6pC1qph7pJgjnrx')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/30 to-transparent"></div>
                <div className="relative z-10 text-white">
                  <h4 className="font-bold text-lg font-serif">Abdul Mughni</h4>
                  <p className="text-xs text-blue-200 mt-1 font-mono">Ketua DKM</p>
                </div>
              </div>
              <div className="sm:w-2/3 p-8 sm:p-10 relative">
                <div className="text-6xl text-blue-100 absolute top-4 left-6 font-serif opacity-50">"</div>
                <div className="text-sm text-slate-600 leading-relaxed relative z-10 space-y-4 text-justify">
                  <p>Ketua DKM Masjid Tazkia adalah pemimpin yang amanah dan berkomitmen dalam memakmurkan masjid sebagai pusat ibadah, dakwah, dan pemberdayaan umat.</p>
                  <p>Dengan mengedepankan nilai keikhlasan, kebersamaan, dan profesionalisme, beliau membina pengelolaan masjid yang transparan, inklusif, serta berlandaskan Al-Quran dan Sunnah, demi menghadirkan pelayanan terbaik bagi jamaah dan masyarakat luas.</p>
                </div>
              </div>
            </div>
          </div>
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
                  { q: "Apa saja fasilitasnya?", a: "Masjid Tazkia dilengkapi dengan ruang shalat utama yang luas dan ber-AC, Alhambra Ballroom untuk berbagai acara, ruang kelas/kajian, perpustakaan, area parkir yang memadai, serta fasilitas wudhu dan toilet yang representatif." },
                  { q: "Apakah Ramah Disabilitas?", a: "Ya, Masjid Tazkia menyediakan akses khusus berupa ramp (bidang miring) untuk pengguna kursi roda, serta fasilitas untuk memberikan kenyamanan bagi jamaah lansia dan disabilitas." },
                  { q: "Apa saja kegiatan rutin yang diselenggarakan?", a: "Kami menyelenggarakan kajian rutin Ba'da Subuh dan Maghrib, kelas Tahsin Al-Qur'an, TPA untuk anak-anak, program bahasa Arab, serta program semarak Ramadhan setiap tahunnya." },
                  { q: "Bagaimana cara menyalurkan donasi?", a: "Donasi, Zakat, Infaq, dan Sedekah (ZISWAF) dapat disalurkan melalui menu ZISWAF di website ini, transfer ke rekening resmi Yayasan Tazkia, atau melalui QRIS yang tersedia di area masjid." }
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
