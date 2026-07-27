import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, FileText } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase';

interface BookingGedungProps {
  isDark?: boolean;
}

const DEFAULT_BALLROOM_IMAGES = [
  'https://images.unsplash.com/photo-1598492212952-475ea7aeb6e2?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1598492212952-475ea7aeb6e2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
];

const FEATURES = [
  'Panggung Pelaminan',
  'Panggung Musik',
  'AC 10 Unit 5PK',
  'Kursi futura 150 pcs',
  'Ruang Rias',
  'Area Parkir Luas',
  'Akad di Masjid',
  'VIP Parking'
];

export const BookingGedung: React.FC<BookingGedungProps> = ({ isDark = false }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [images, setImages] = useState<string[]>(DEFAULT_BALLROOM_IMAGES);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return;
      
      try {
        const { data, error } = await supabase.storage.from('booking-assets').list();
        if (error) return;
        
        if (data && data.length > 0) {
          const imageFiles = data.filter(file => file.name.match(/\.(jpg|jpeg|png|webp|avif)$/i));
          if (imageFiles.length > 0) {
            const urls = imageFiles.map(file => supabase.storage.from('booking-assets').getPublicUrl(file.name).data.publicUrl);
            setImages(urls);
          }
          
          const pdfFile = data.find(file => file.name.match(/\.pdf$/i));
          if (pdfFile) {
            setPdfUrl(supabase.storage.from('booking-assets').getPublicUrl(pdfFile.name).data.publicUrl);
          }
        }
      } catch (err) {
        console.error('Failed to load booking assets', err);
      }
    };
    fetchAssets();
  }, []);

  const handleCekInfo = () => {
    window.open('https://wa.me/6285810008899?text=Assalamu%27alaikum%2C%20saya%20ingin%20bertanya%20tentang%20sewa%20Alhambra%20Ballroom%20Masjid%20Tazkia', '_blank');
  };

  return (
    <div className={`min-h-screen py-16 transition-colors ${isDark ? 'bg-[#0a1128] text-white' : 'bg-white text-slate-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative group">
              <img 
                src={images[activeImage] || images[0]} 
                alt="Alhambra Ballroom" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === idx 
                        ? 'border-blue-600 shadow-md' 
                        : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1e3a8a]'}`}>
                Alhambra Ballroom
              </h1>
              
              <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <p>
                  Alhambra Hall menawarkan suasana elegan dengan sentuhan arsitektur Islam modern. Dirancang khusus untuk mengakomodasi berbagai acara mulai dari resepsi pernikahan, seminar nasional, hingga kajian akbar.
                </p>
                <p>
                  Dengan luas area lebih dari 500m², ruangan ini mampu menampung hingga 800 tamu undangan. Dilengkapi dengan sistem pencahayaan yang hangat dan akustik ruangan yang telah disempurnakan untuk kenyamanan acara Anda.
                </p>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {FEATURES.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded-full shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCekInfo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer"
              >
                <span>Cek Info Gedung</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm w-full sm:w-auto cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Katalog PDF</span>
                </a>
              )}
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};
