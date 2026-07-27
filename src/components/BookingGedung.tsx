import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface BookingGedungProps {
  isDark?: boolean;
}

const BALLROOM_IMAGES = [
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80', // placeholder 1 (main)
  'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80', // placeholder 2
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80', // placeholder 3
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80', // placeholder 4
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

  const handleCekInfo = () => {
    // Open a whatsapp link or a PDF link
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
                src={BALLROOM_IMAGES[activeImage]} 
                alt="Alhambra Ballroom" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {BALLROOM_IMAGES.map((img, idx) => (
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

            <div className="pt-4">
              <button
                onClick={handleCekInfo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer"
              >
                <span>Cek Info Gedung</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};
