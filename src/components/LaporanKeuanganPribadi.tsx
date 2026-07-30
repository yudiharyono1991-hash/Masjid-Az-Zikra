import React, { useState } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, Calendar, ChevronLeft, ChevronRight, FileText, Download, Edit2, Trash2, Sparkles } from 'lucide-react';
import { formatRupiahFull } from '../lib/islamicUtils';

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'debit' | 'kredit';
  amount: number;
  balance: number;
}

const DUMMY_TRANSACTIONS: Transaction[] = [];

export const LaporanKeuanganPribadi: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(DUMMY_TRANSACTIONS.length / itemsPerPage);
  const currentTransactions = DUMMY_TRANSACTIONS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const saldoAkhirBulan = DUMMY_TRANSACTIONS.length > 0 ? DUMMY_TRANSACTIONS[0].balance : 0;
  const saldoTanggalBerjalan = saldoAkhirBulan;

  const totalPemasukan = DUMMY_TRANSACTIONS.filter(t => t.type === 'kredit').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPengeluaran = DUMMY_TRANSACTIONS.filter(t => t.type === 'debit').reduce((acc, curr) => acc + curr.amount, 0);

  const getPreviousMonthName = () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    return now.toLocaleDateString('id-ID', { month: 'long' });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getMonthDateRange = () => {
    const now = new Date();
    const month = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    return `1 - ${now.getDate()} ${month}`;
  };

  const [downloadDate, setDownloadDate] = useState<string | null>(null);
  
  const handleDownloadExcel = () => {
    const now = new Date();
    setDownloadDate(now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
    alert('Simulasi: Berkas Excel sedang diunduh...');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col justify-center h-full">
            <h3 className="text-blue-100 text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" /> Saldo Berjalan (Hari Ini)
            </h3>
            <p className="text-2xl font-bold">{formatRupiahFull(saldoTanggalBerjalan)}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col justify-center h-full">
            <h3 className="text-emerald-100 text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Saldo Final Bulan Lalu ({getPreviousMonthName()})
            </h3>
            <p className="text-2xl font-bold">{formatRupiahFull(saldoAkhirBulan)}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-start gap-3">
          <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl shrink-0">
            <ArrowDownRight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Total Pemasukan</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{formatRupiahFull(totalPemasukan)}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-start gap-3">
          <div className="bg-rose-100 text-rose-600 p-2 rounded-xl shrink-0">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Total Pengeluaran</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{formatRupiahFull(totalPengeluaran)}</p>
          </div>
        </div>
      </div>

      {/* AI Analysis Notification */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-4 flex gap-3 shadow-sm">
        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl shrink-0 h-min">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">Analisis Otomatis AI</h4>
          <p className="text-xs text-indigo-800 leading-relaxed">
            Berdasarkan riwayat transaksi Anda, pengeluaran bulan ini masih dalam batas aman. Pertimbangkan untuk menyisihkan sebagian saldo untuk tabungan masa depan dan target ZISWAF Anda. Anda bisa mulai dengan menambah infaq pekan ini.
          </p>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50/50">
          <div>
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Riwayat Transaksi
            </h3>
            <div className="text-[10px] text-gray-500 font-bold bg-white px-2 py-1 rounded-md border border-gray-200 uppercase tracking-wider inline-block mt-2">
              {getMonthDateRange()}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
            <button onClick={handleDownloadExcel} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors w-full sm:w-auto justify-center">
              <Download className="w-3.5 h-3.5" /> Unduh Excel
            </button>
            {downloadDate && (
              <span className="text-[9px] text-gray-400 font-mono">Diunduh: {downloadDate}</span>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="bg-gray-50/80 text-gray-400 font-bold uppercase text-[9px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-center w-10">No</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Keterangan</th>
                <th className="px-4 py-3 text-right text-emerald-600">Kredit (In)</th>
                <th className="px-4 py-3 text-right text-rose-600">Debit (Out)</th>
                <th className="px-4 py-3 text-right">Saldo</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {currentTransactions.map((trx, index) => (
                <tr key={trx.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3 text-center text-gray-400 font-mono">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {formatDate(trx.date)}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {trx.description}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-emerald-600">
                    {trx.type === 'kredit' ? `+ ${formatRupiahFull(trx.amount)}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-rose-500">
                    {trx.type === 'debit' ? `- ${formatRupiahFull(trx.amount)}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-gray-800 bg-gray-50/30">
                    {formatRupiahFull(trx.balance)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md transition" title="Hapus">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {currentTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    Belum ada riwayat transaksi pada rentang tanggal ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-3 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <span className="text-[10px] text-gray-500 font-medium">
              Hal. <strong className="text-gray-700">{currentPage}</strong> dari <strong className="text-gray-700">{totalPages}</strong>
            </span>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
