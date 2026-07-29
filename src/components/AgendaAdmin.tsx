import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Calendar as CalendarIcon, Clock, MapPin, Upload } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase';
import { useMasjidStore } from '../lib/store';
import { MasjidAgenda } from '../types';

export const AgendaAdmin = () => {
  const { state, addAgenda, updateAgenda, deleteAgenda } = useMasjidStore();
  const agendas = state.agendas || [];

  const [isEditing, setIsEditing] = useState(false);
  const [currentAgendaId, setCurrentAgendaId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<MasjidAgenda>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00 - 13:00',
    location: 'Ruang Utama Masjid Tazkia',
    speaker: '',
    description: '',
    category: 'Kajian',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      alert('Judul, Tanggal, dan Waktu wajib diisi.');
      return;
    }

    if (isEditing && currentAgendaId) {
      updateAgenda(currentAgendaId, formData);
      alert('Agenda berhasil diperbarui!');
    } else {
      addAgenda(formData as Omit<MasjidAgenda, 'id'>);
      alert('Agenda baru berhasil ditambahkan!');
    }

    resetForm();
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentAgendaId(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00 - 13:00',
      location: 'Ruang Utama Masjid Tazkia',
      speaker: '',
      description: '',
      category: 'Kajian',
      imageUrl: ''
    });
  };

  const handleEdit = (agenda: MasjidAgenda) => {
    setIsEditing(true);
    setCurrentAgendaId(agenda.id);
    setFormData(agenda);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus agenda "${title}"?`)) {
      deleteAgenda(id);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase not connected');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-agenda.${fileExt}`;
      const filePath = `agenda/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tazkia-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('tazkia-media')
        .getPublicUrl(filePath);

      setFormData({ ...formData, imageUrl: data.publicUrl });
      alert('Foto agenda berhasil diunggah!');
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Gagal mengunggah foto. Pastikan ukuran file tidak terlalu besar dan koneksi stabil.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-blue-900 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            {isEditing ? 'Edit Agenda' : 'Tambah Agenda Baru'}
          </h2>
          <p className="text-blue-200 text-sm mt-1">
            Kelola jadwal kegiatan masjid yang akan tampil di halaman utama kalender jamaah.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Nama Kegiatan / Agenda *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-white text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Kajian Subuh Tematik"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Kategori</label>
              <input
                list="kategori-list"
                value={formData.category || ''}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-3 bg-white text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Pilih atau ketik kategori..."
              />
              <datalist id="kategori-list">
                <option value="Kajian / Ceramah" />
                <option value="Rapat Kepengurusan" />
                <option value="Kegiatan Bakti Sosial / Acara" />
                <option value="Lainnya" />
                {Array.from(new Set(agendas.map(a => a.category))).filter(c => !['Kajian / Ceramah', 'Rapat Kepengurusan', 'Kegiatan Bakti Sosial / Acara', 'Lainnya', 'Kajian', 'Rapat', 'Kegiatan'].includes(c)).map(c => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Tanggal *</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 bg-white text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Waktu *</label>
              <input
                type="text"
                value={formData.time || ''}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-3 bg-white text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: 12:00 - 13:00 WIB"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Lokasi</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-white text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Ruang Utama Masjid"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Pengisi Acara / Pemateri</label>
              <input
                type="text"
                value={formData.speaker || ''}
                onChange={e => setFormData({ ...formData, speaker: e.target.value })}
                className="w-full p-3 bg-white text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Ust. Adi Hidayat (Kosongkan jika tidak ada)"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-slate-700">Deskripsi Singkat</label>
              <textarea
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-white text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Jelaskan detail agenda secara singkat..."
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-slate-700">Poster / Gambar Agenda (Opsional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="flex-1 p-3 bg-white text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Ketik URL gambar ATAU upload file..."
                />
                <label className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 rounded-xl flex items-center justify-center font-bold border border-blue-200 transition-colors">
                  {isUploading ? (
                    <span className="flex items-center gap-2 text-sm"><span className="animate-spin border-2 border-blue-700 border-t-transparent rounded-full w-4 h-4"></span></span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm"><Upload className="w-4 h-4" /> Upload</span>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors shadow-md flex justify-center items-center gap-2"
            >
              {isEditing ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isEditing ? 'Simpan Perubahan' : 'Tambah Agenda'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          Daftar Agenda Masjid
        </h3>

        <div className="space-y-4">
          {agendas.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(agenda => (
            <div key={agenda.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-xl hover:border-blue-300 transition-colors bg-slate-50">
              {agenda.imageUrl && (
                <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={agenda.imageUrl} alt={agenda.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-md mb-1 uppercase">
                      {agenda.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-lg">{agenda.title}</h4>
                    {agenda.speaker && <p className="text-sm text-blue-600 font-medium">Bersama: {agenda.speaker}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(agenda)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(agenda.id, agenda.title)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    {agenda.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {agenda.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {agenda.location}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {agendas.length === 0 && (
            <div className="text-center py-12 text-slate-500 border-2 border-dashed rounded-xl">
              Belum ada data agenda kegiatan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
