import React, { useState, useEffect } from 'react';
import { Settings, Upload, Image as ImageIcon, QrCode, Store, Trash2, Plus, Link as LinkIcon, Download } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabaseClient';

interface Sponsor {
  id: string;
  name: string;
  imageUrl: string;
  link: string;
}

export const AppManagerAdmin: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'qr' | 'sponsor'>('hero');
  const [heroImages, setHeroImages] = useState<{name: string, url: string}[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sponsor State
  const [sponsors, setSponsors] = useState<Sponsor[]>(() => {
    try {
      const saved = localStorage.getItem('tazkia_sponsors');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [{ id: '1', name: 'Tazkia Mart', imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&q=80', link: '#' }];
  });

  const [profilData, setProfilData] = useState(() => {
    try {
      const saved = localStorage.getItem('tazkia_profil_data');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      youtubeUrl: 'https://youtu.be/-oT4ZYK2ZjI?si=-pEBAAicepgcMVPj',
      sejarah: `Andalusia Islamic Center hadir karena kepedulian akan masalah besar bangsa dan ummat Islam Indonesia yang didominasi oleh kemiskinan, keterbelakangan Pendidikan serta rendahnya moralitas baik di tingkat birokrasi maupun swasta. Besar harapan kami dengan segala kekurangan, Andalusia Islamic Center dapat menjadi Oase Spiritual, Intelektual dan Pemberdayaan finansial ummat yang berlandaskan nilai-nilai luhur spiritual Islam.\n\nSejak pendiriannya tahun 2006 oleh Prof. Dr. Syafii Antonio, M.Ec. Andalusia Islamic Center telah berkiprah dalam bidang sosial, dakwah dan pemberdayaan ekonomi yang meliputi:`,
      visi: 'Menjadi Oase Spiritual dan Intelektual Islam yang memberikan pencerahan, kesejukan dan pemberdayaan serta wawasan Rahmatan Lil Alamin.',
      misi: [
        'Menyelenggarakan pelatihan dan konseling keumatan.',
        'Mengembangkan ekonomi kerakyatan berbasis syariah.',
        'Membina para muallaf agar istiqomah.'
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('tazkia_sponsors', JSON.stringify(sponsors));
  }, [sponsors]);

  useEffect(() => {
    localStorage.setItem('tazkia_profil_data', JSON.stringify(profilData));
  }, [profilData]);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { data, error } = await supabase.storage.from('hero-images').list();
      if (error) throw error;
      
      if (data) {
        const imageFiles = data.filter(file => file.name.match(/\.(jpg|jpeg|png|webp|avif)$/i));
        const formatted = imageFiles.map(file => {
          const { data: { publicUrl } } = supabase.storage.from('hero-images').getPublicUrl(file.name);
          return { name: file.name, url: publicUrl };
        });
        setHeroImages(formatted);
      }
    } catch (err) {
      console.error('Error fetching hero images', err);
    }
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      alert("Koneksi Supabase belum diatur!");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-hero.${fileExt}`;
      
      setUploadProgress(40);
      const { error } = await supabase.storage.from('hero-images').upload(fileName, file);
      
      if (error) throw error;
      
      setUploadProgress(100);
      alert('Foto berhasil diunggah!');
      fetchHeroImages();
    } catch (err: any) {
      alert(`Gagal mengunggah: ${err.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteHero = async (fileName: string) => {
    if (!window.confirm("Hapus gambar ini?")) return;
    
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { error } = await supabase.storage.from('hero-images').remove([fileName]);
      if (error) throw error;
      alert('Gambar dihapus');
      fetchHeroImages();
    } catch (err: any) {
      alert(`Gagal menghapus: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-blue-900 border border-blue-800 p-1.5 rounded-2xl gap-2 overflow-x-auto text-xs font-mono">
        {[
          { id: 'hero', label: 'Foto Animasi Beranda', icon: ImageIcon },
          { id: 'qr', label: 'Cetak QR Aplikasi', icon: QrCode },
          { id: 'sponsor', label: 'Sponsor & Mitra', icon: Store },
          { id: 'profil', label: 'Profil & Sejarah Masjid', icon: Settings }
        ].map(sub => {
          const SubIcon = sub.icon;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id as any)}
              className={`px-4 py-2.5 rounded-xl cursor-pointer font-bold transition-all flex items-center gap-2 ${
                activeSubTab === sub.id
                  ? 'bg-amber-400 text-blue-950 shadow'
                  : 'text-blue-400 hover:text-white hover:bg-blue-800'
              }`}
            >
              <SubIcon className="w-4 h-4" />
              {sub.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white/5 p-6 rounded-2xl border border-blue-800 space-y-6 text-white">
        
        {/* HERO TAB */}
        {activeSubTab === 'hero' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif mb-2">Manajemen Foto Animasi Beranda (Hero Slider)</h3>
              <p className="text-sm text-blue-300">Unggah beberapa foto lebar (resolusi tinggi) untuk ditampilkan berputar secara otomatis di bagian paling atas halaman Beranda Aplikasi.</p>
            </div>

            <div className="p-6 border-2 border-dashed border-blue-600/50 rounded-2xl text-center bg-blue-900/30">
              <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-white mb-4">Unggah Foto Baru</p>
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer inline-block transition-colors">
                Pilih Gambar
                <input type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} disabled={isUploading} />
              </label>
              {isUploading && (
                <div className="mt-4 max-w-xs mx-auto">
                  <div className="h-2 bg-blue-950 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-xs text-blue-300 mt-2">Mengunggah... {uploadProgress}%</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {heroImages.map((img, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border-2 border-blue-800 bg-blue-950 aspect-video">
                  <img src={img.url} alt={`Hero ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => handleDeleteHero(img.name)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 cursor-pointer">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {heroImages.length === 0 && (
                <div className="col-span-full py-8 text-center text-blue-400 text-sm">
                  Belum ada foto yang diunggah. Foto bawaan (default) akan ditampilkan.
                </div>
              )}
            </div>
          </div>
        )}

        {/* QR CODE TAB */}
        {activeSubTab === 'qr' && (
          <div className="space-y-6 text-center max-w-xl mx-auto">
            <div>
              <h3 className="text-xl font-bold font-serif mb-2">Cetak QR Code Aplikasi</h3>
              <p className="text-sm text-blue-300">QR Code ini dapat Anda cetak dan tempel di area masjid (mading, tiang, dll) agar jamaah bisa langsung membuka aplikasi ini di HP mereka.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl inline-block shadow-2xl relative print:shadow-none">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(window.location.origin)}`}
                alt="QR Code Aplikasi" 
                className="w-48 h-48 sm:w-64 sm:h-64 mx-auto"
              />
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-slate-800 font-bold text-sm sm:text-base uppercase tracking-wider mb-1">Scan Untuk Buka</p>
                <p className="text-blue-600 font-bold text-lg sm:text-xl font-serif">Aplikasi Masjid Tazkia</p>
                <p className="text-xs text-slate-500 mt-2 break-all">{window.location.origin}</p>
              </div>
            </div>

            <div className="print:hidden">
              <button onClick={() => window.print()} className="bg-amber-500 hover:bg-amber-600 text-blue-950 px-8 py-3 rounded-xl font-bold shadow-md cursor-pointer inline-flex items-center gap-2">
                <Download className="w-5 h-5" />
                Cetak Halaman (Print)
              </button>
            </div>
          </div>
        )}

        {/* SPONSOR TAB */}
        {activeSubTab === 'sponsor' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif mb-2">Sponsor & Mitra (Tazkia Mart)</h3>
                <p className="text-sm text-blue-300">Kelola logo sponsor atau unit usaha (seperti Tazkia Mart, Travel) yang akan ditampilkan di aplikasi.</p>
              </div>
              <button 
                onClick={() => {
                  const name = prompt("Nama Mitra/Sponsor:");
                  if (!name) return;
                  const imageUrl = prompt("URL Gambar Logo:");
                  if (!imageUrl) return;
                  setSponsors([...sponsors, { id: Date.now().toString(), name, imageUrl, link: '#' }]);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> Tambah Mitra
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sponsors.map((sp, idx) => (
                <div key={sp.id} className="bg-blue-900/50 p-4 rounded-xl border border-blue-800 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0 p-1">
                    <img src={sp.imageUrl} alt={sp.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{sp.name}</h4>
                    <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" /> Aktif
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      if(window.confirm("Hapus mitra ini?")) {
                        setSponsors(sponsors.filter(s => s.id !== sp.id));
                      }
                    }}
                    className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-xl">
              <p className="text-xs text-amber-400 leading-relaxed font-mono">
                <strong className="text-sm">Info:</strong> Menambah logo di sini secara otomatis akan memasukkan banner/ikon mitra ke area Footer dan Beranda (jika diaktifkan) sebagai tanda "Sponsored By".
              </p>
            </div>
          </div>
        )}

        {/* PROFIL MASJID TAB */}
        {activeSubTab === 'profil' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif mb-2">Profil & Sejarah Masjid Tazkia</h3>
                <p className="text-sm text-blue-300">Ubah data sejarah, Visi, Misi, dan link YouTube Profil Masjid. Perubahan akan langsung tampil di menu "Tentang Kami".</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-blue-200 mb-1">Link YouTube Video Profil</label>
                <input 
                  type="text" 
                  value={profilData.youtubeUrl}
                  onChange={(e) => setProfilData({...profilData, youtubeUrl: e.target.value})}
                  className="w-full bg-blue-950/50 border border-blue-800 rounded-xl px-4 py-2.5 text-white"
                  placeholder="https://youtu.be/..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-200 mb-1">Visi Masjid</label>
                <textarea 
                  value={profilData.visi}
                  onChange={(e) => setProfilData({...profilData, visi: e.target.value})}
                  className="w-full bg-blue-950/50 border border-blue-800 rounded-xl px-4 py-2.5 text-white h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-200 mb-1">Misi Masjid (pisahkan dengan baris baru)</label>
                <textarea 
                  value={profilData.misi.join('\n')}
                  onChange={(e) => setProfilData({...profilData, misi: e.target.value.split('\n')})}
                  className="w-full bg-blue-950/50 border border-blue-800 rounded-xl px-4 py-2.5 text-white h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-200 mb-1">Sejarah & Latar Belakang</label>
                <textarea 
                  value={profilData.sejarah}
                  onChange={(e) => setProfilData({...profilData, sejarah: e.target.value})}
                  className="w-full bg-blue-950/50 border border-blue-800 rounded-xl px-4 py-2.5 text-white h-48"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
