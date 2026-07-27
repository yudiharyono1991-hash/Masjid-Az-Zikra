import React, { useState, useEffect } from 'react';
import { Upload, FileText, Image as ImageIcon, Trash2, CheckCircle2, Building } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase';

export const SewaGedungAdmin: React.FC = () => {
  const [images, setImages] = useState<{name: string, url: string}[]>([]);
  const [pdf, setPdf] = useState<{name: string, url: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchAssets = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.storage.from('booking-assets').list();
      if (error) throw error;
      
      if (data) {
        const imageFiles = data.filter(file => file.name.match(/\.(jpg|jpeg|png|webp|avif)$/i));
        const pdfFile = data.find(file => file.name.match(/\.pdf$/i));
        
        setImages(imageFiles.map(file => ({
          name: file.name,
          url: supabase.storage.from('booking-assets').getPublicUrl(file.name).data.publicUrl
        })));
        
        if (pdfFile) {
          setPdf({
            name: pdfFile.name,
            url: supabase.storage.from('booking-assets').getPublicUrl(pdfFile.name).data.publicUrl
          });
        } else {
          setPdf(null);
        }
      }
    } catch (err) {
      console.error('Error fetching assets', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      alert("Supabase client not initialized.");
      return;
    }

    setUploading(true);
    setMessage('');
    
    try {
      const fileExt = file.name.split('.').pop();
      const isPdf = fileExt?.toLowerCase() === 'pdf';
      const fileName = isPdf ? `alhambra-terms-${Date.now()}.pdf` : `gallery-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('booking-assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (error) throw error;

      setMessage(`Berhasil mengunggah ${file.name}`);
      fetchAssets();
    } catch (err: any) {
      console.error('Upload error', err);
      setMessage(`Gagal mengunggah: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!window.confirm(`Hapus file ${fileName}?`)) return;

    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { error } = await supabase.storage.from('booking-assets').remove([fileName]);
      if (error) throw error;
      
      setMessage(`Berhasil menghapus ${fileName}`);
      fetchAssets();
    } catch (err: any) {
      console.error('Delete error', err);
      setMessage(`Gagal menghapus: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-blue-900 border border-blue-800 rounded-2xl p-6 shadow-lg">
        <h3 className="font-serif text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Building className="w-5 h-5 text-amber-400" />
          Kelola Aset Booking Gedung
        </h3>
        <p className="text-sm text-blue-200 mb-6">
          Unggah foto galeri Alhambra Ballroom dan file PDF Syarat & Ketentuan. Foto-foto ini akan otomatis ditampilkan pada halaman Booking Gedung di sisi pengguna. Pastikan nama bucket Supabase adalah <code className="bg-blue-950 px-1 rounded">booking-assets</code> dan berstatus Public.
        </p>

        {message && (
          <div className="bg-green-500/20 text-green-300 border border-green-500/30 p-3 rounded-xl text-sm mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {message}
          </div>
        )}

        <div className="flex items-center gap-4 mb-8">
          <label className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-colors shadow-md flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Mengunggah...' : 'Unggah File (Foto / PDF)'}</span>
            <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>

        {loading ? (
          <div className="text-blue-300 text-sm animate-pulse">Memuat data dari Supabase...</div>
        ) : (
          <div className="space-y-8">
            
            {/* PDF Section */}
            <div>
              <h4 className="font-bold text-amber-400 text-sm mb-3 font-mono uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" /> Katalog / Syarat PDF
              </h4>
              {pdf ? (
                <div className="flex items-center justify-between bg-blue-950/50 border border-blue-800 p-4 rounded-xl">
                  <a href={pdf.url} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white font-medium flex items-center gap-2 text-sm transition-colors">
                    <FileText className="w-4 h-4 text-rose-400" />
                    {pdf.name}
                  </a>
                  <button onClick={() => handleDelete(pdf.name)} className="text-rose-400 hover:bg-rose-500/20 p-2 rounded-lg transition-colors cursor-pointer" title="Hapus PDF">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-sm text-blue-400 italic">Belum ada file PDF yang diunggah.</div>
              )}
            </div>

            {/* Images Section */}
            <div>
              <h4 className="font-bold text-amber-400 text-sm mb-3 font-mono uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Foto Galeri ({images.length})
              </h4>
              {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map(img => (
                    <div key={img.name} className="relative group rounded-xl overflow-hidden border border-blue-800 bg-blue-950 aspect-[4/3]">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <span className="text-[10px] text-white truncate drop-shadow-md">{img.name}</span>
                        <button onClick={() => handleDelete(img.name)} className="self-end bg-rose-500 text-white p-1.5 rounded-lg hover:bg-rose-600 cursor-pointer shadow-md">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-blue-400 italic">Belum ada foto yang diunggah. (Akan menggunakan foto default saat ini).</div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
