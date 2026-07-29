import React, { useState } from 'react';
import { useMasjidStore } from '../lib/store';
import { BoardMember } from '../types';
import { Users, Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';
import { uploadMedia } from '../lib/mediaUpload';

export const BoardMemberAdmin: React.FC = () => {
  const store = useMasjidStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState<Omit<BoardMember, 'id'>>({
    name: '',
    position: '',
    groupTitle: '',
    roleType: 'pengurus',
    imageUrl: '',
    bio: '',
    orderIdx: 1
  });

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      groupTitle: '',
      roleType: 'pengurus',
      imageUrl: '',
      bio: '',
      orderIdx: 1
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (member: BoardMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      groupTitle: member.groupTitle || '',
      roleType: member.roleType,
      imageUrl: member.imageUrl,
      bio: member.bio || '',
      orderIdx: member.orderIdx
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Yakin ingin menghapus pengurus ini?')) {
      store.deleteBoardMember(id);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadMedia(file);
      if (url) {
        setFormData({ ...formData, imageUrl: url });
      } else {
        alert('Gagal mengunggah gambar.');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengunggah gambar.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      store.updateBoardMember(editingId, formData);
    } else {
      store.addBoardMember(formData);
    }
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-900 border border-blue-800 p-5 rounded-2xl">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-300" />
            <span>Manajemen Profil & Pengurus</span>
          </h3>
          <p className="text-xs text-blue-400 mt-1">
            Atur daftar dewan pembina, pengurus DKM, dan staf. Data ini akan ditampilkan di halaman "Tentang Kami".
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0 border border-blue-400/30"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pengurus</span>
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-blue-900 border-2 border-blue-500/40 p-6 rounded-2xl space-y-5 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-blue-800 pb-3">
            <h4 className="font-serif font-bold text-amber-300 text-base">
              {editingId ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}
            </h4>
            <button type="button" onClick={resetForm} className="text-blue-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-blue-300 block mb-1">Nama Lengkap & Gelar:</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
              />
            </div>
            
            <div>
              <label className="text-xs font-semibold text-blue-300 block mb-1">Jabatan (Position):</label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-blue-300 block mb-1">Judul Grup (Opsional):</label>
              <input
                type="text"
                value={formData.groupTitle || ''}
                onChange={(e) => setFormData({ ...formData, groupTitle: e.target.value })}
                placeholder="Contoh: Dewan Pembina Yayasan"
                className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-300 block mb-1">Tipe Role:</label>
              <select
                value={formData.roleType}
                onChange={(e) => setFormData({ ...formData, roleType: e.target.value as any })}
                className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
              >
                <option value="pembina">Dewan Pembina</option>
                <option value="pengurus">Pengurus Harian DKM</option>
                <option value="pengawas">Dewan Pengawas</option>
                <option value="staf">Staf Operasional</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-blue-300 block mb-1">Urutan Tampil (Semakin kecil = atas):</label>
              <input
                type="number"
                required
                value={formData.orderIdx}
                onChange={(e) => setFormData({ ...formData, orderIdx: Number(e.target.value) })}
                className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-blue-300 block mb-1">Link Foto Profil (URL) atau Upload:</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                />
                <label className="bg-blue-800 hover:bg-blue-700 text-blue-100 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center justify-center min-w-[100px]">
                  {isUploading ? (
                    'Loading...'
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                      Upload
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-blue-300 block mb-1">Bio Singkat (Opsional):</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none h-20"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/50">
              <Save className="w-4 h-4" />
              <span>{editingId ? 'Simpan Perubahan' : 'Tambah Pengurus'}</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...(store.state.boardMembers || [])].sort((a, b) => a.orderIdx - b.orderIdx).map((member) => (
          <div key={member.id} className="bg-blue-900 border border-blue-800 rounded-2xl p-4 flex gap-4">
            <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-xl object-cover bg-blue-950" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-white text-sm truncate">{member.name}</h4>
                <div className="flex gap-2 shrink-0 ml-2">
                  <button onClick={() => handleEdit(member)} className="text-blue-400 hover:text-amber-400 p-1 bg-blue-950 rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(member.id)} className="text-rose-400 hover:text-rose-300 p-1 bg-blue-950 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-blue-300 truncate">{member.position}</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 bg-blue-800 text-blue-200 text-[10px] rounded-md font-mono uppercase tracking-wider">
                {member.groupTitle || member.roleType}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
