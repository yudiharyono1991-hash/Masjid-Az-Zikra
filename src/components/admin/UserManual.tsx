import React from 'react';
import { useMasjidStore } from '../../lib/store';
import { BookOpen, ShieldCheck, CheckCircle, HelpCircle, FileText } from 'lucide-react';

export function UserManual() {
  const { state } = useMasjidStore();
  const role = state.session?.role;

  const getManualContent = () => {
    switch (role) {
      case 'direktur':
      case 'ketua_dewan_pembina':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-900 border-b pb-2">Panduan Pimpinan (Direktur & Pembina)</h3>
            <p className="text-sm text-gray-700">Sebagai pimpinan, Anda memiliki akses penuh terhadap tata kelola dan rahasia data masjid. Berikut adalah fitur utama Anda:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li><strong>Persetujuan (Approval) Anggaran:</strong> Semua pencairan dana yang diajukan staf dan telah diverifikasi Bendahara serta disetujui Ketua DKM, membutuhkan persetujuan akhir Anda di menu <span className="font-semibold text-blue-600">Pencairan Anggaran</span>.</li>
              <li><strong>Laporan Keuangan & Audit:</strong> Anda dapat memantau seluruh arus kas, Buku Besar, Jurnal Umum, serta melihat log aktivitas (Audit Log) dari seluruh staf.</li>
              <li><strong>Manajemen Master Data:</strong> Anda dapat mengelola akun pengguna, hak akses, data rekening (COA), serta konfigurasi aplikasi dan database (Supabase).</li>
            </ul>
          </div>
        );
      case 'ketua_dkm':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-900 border-b pb-2">Panduan Ketua DKM</h3>
            <p className="text-sm text-gray-700">Sebagai Ketua DKM, Anda mengawasi seluruh operasional dan menyetujui anggaran tingkat pertama. Berikut adalah fitur utama Anda:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li><strong>Persetujuan Anggaran (Tahap 2):</strong> Setiap pengajuan yang diverifikasi Bendahara harus Anda setujui sebelum diteruskan ke Direktur. Lakukan persetujuan di menu <span className="font-semibold text-blue-600">Pencairan Anggaran</span>.</li>
              <li><strong>Operasional Masjid:</strong> Anda memiliki akses penuh ke manajemen jadwal petugas, pengumuman, program kegiatan, dan pengelolaan aset.</li>
              <li><strong>Keuangan:</strong> Anda dapat melihat seluruh metrik ringkasan keuangan dan memonitor anggaran tanpa bisa merubah catatan pembukuan historis secara langsung.</li>
            </ul>
          </div>
        );
      case 'bendahara':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-900 border-b pb-2">Panduan Bendahara</h3>
            <p className="text-sm text-gray-700">Tugas utama Anda adalah mengelola pembukuan, jurnal transaksi, dan verifikasi awal dana keluar.</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li><strong>Verifikasi Pengajuan (Tahap 1):</strong> Setiap pengajuan dana dari staf harus Anda verifikasi dan cek kesesuaiannya dengan Pagu Anggaran di menu <span className="font-semibold text-blue-600">Pencairan Anggaran</span>.</li>
              <li><strong>Jurnal Umum & Buku Besar:</strong> Anda wajib mencatat setiap pemasukan dan pengeluaran manual di Jurnal Umum, yang otomatis akan masuk ke Buku Besar sesuai Chart of Accounts (COA) PSAK 409.</li>
              <li><strong>Laporan:</strong> Sistem secara otomatis meng-generate Laporan Posisi Keuangan (Neraca) dan Aktivitas berdasarkan Jurnal yang Anda input.</li>
            </ul>
          </div>
        );
      case 'penghimpunan':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-900 border-b pb-2">Panduan Staf Penghimpunan (ZISWAF)</h3>
            <p className="text-sm text-gray-700">Tugas utama Anda adalah memantau dan mengonfirmasi donasi jamaah.</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li><strong>Verifikasi Donasi:</strong> Cek mutasi bank dan verifikasi donasi jamaah di menu <span className="font-semibold text-blue-600">Verifikasi ZISWAF</span> agar saldo program terupdate dan jamaah mendapatkan notifikasi riwayat.</li>
              <li><strong>Pengelolaan Program:</strong> Tambahkan atau update detail program kampanye donasi (misal: Wakaf Pembangunan, Sedekah Jumat).</li>
            </ul>
          </div>
        );
      case 'penyaluran':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-900 border-b pb-2">Panduan Staf Penyaluran (Program)</h3>
            <p className="text-sm text-gray-700">Tugas Anda berkaitan dengan penyaluran dana dan pengajuan kegiatan.</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li><strong>Pengajuan Anggaran:</strong> Jika program membutuhkan dana, ajukan pencairan melalui menu <span className="font-semibold text-blue-600">Pencairan Anggaran</span> (tab Ajukan).</li>
              <li><strong>Pemantauan:</strong> Pantau status persetujuan dari Bendahara, Ketua DKM, hingga Direktur. Dana baru bisa dicairkan setelah status menjadi 'Approved' oleh Direktur.</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-900 border-b pb-2">Panduan Umum Petugas</h3>
            <p className="text-sm text-gray-700">Selamat datang di Portal Admin Masjid Tazkia. Fitur yang tampil di layar Anda disesuaikan dengan wewenang yang diberikan oleh Administrator.</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>Untuk panduan pengajuan anggaran, buka tab <span className="font-semibold text-blue-600">Pencairan Anggaran</span>.</li>
              <li>Untuk mengelola jadwal dan operasional umum, gunakan menu terkait yang tersedia di atas.</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-fade-in max-w-4xl mx-auto my-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Buku Panduan Sistem</h2>
          <p className="text-sm text-gray-500">Petunjuk teknis tata kelola sesuai peran dan akses Anda</p>
        </div>
      </div>
      
      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
        {getManualContent()}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
          <HelpCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-gray-700">Butuh Bantuan Teknis?</h4>
            <p className="text-xs text-gray-500 mt-1">Jika sistem mengalami error atau Anda butuh perubahan hak akses, hubungi tim IT Masjid Tazkia.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-emerald-800">Keamanan Data</h4>
            <p className="text-xs text-emerald-600 mt-1">Sistem mencatat seluruh log aktivitas Anda. Pastikan untuk Logout setelah menggunakan komputer publik.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
