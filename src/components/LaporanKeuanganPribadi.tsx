import React, { useState } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, Calendar, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { formatRupiahFull } from '../utils/format';

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'debit' | 'kredit';
  amount: number;
  balance: number;
}

const DUMMY_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-07-01', description: 'Gaji Bulanan', type: 'kredit', amount: 8000000, balance: 8000000 },
  { id: '2', date: '2026-07-03', description: 'Belanja Bulanan', type: 'debit', amount: 2500000, balance: 5500000 },
  { id: '3', date: '2026-07-05', description: 'Donasi ZISWAF', type: 'debit', amount: 500000, balance: 5000000 },
  { id: '4', date: '2026-07-10', description: 'Bonus Proyek', type: 'kredit', amount: 1500000, balance: 6500000 },
  { id: '5', date: '2026-07-12', description: 'Bayar Listrik & Air', type: 'debit', amount: 750000, balance: 5750000 },
  { id: '6', date: '2026-07-15', description: 'Sedekah Jumat', type: 'debit', amount: 100000, balance: 5650000 },
  { id: '7', date: '2026-07-18', description: 'Beli Bensin', type: 'debit', amount: 300000, balance: 5350000 },
  { id: '8', date: '2026-07-22', description: 'Makan Keluarga', type: 'debit', amount: 450000, balance: 4900000 },
  { id: '9', date: '2026-07-25', description: 'Honor Konsultasi', type: 'kredit', amount: 2000000, balance: 6900000 },
  { id: '10', date: '2026-07-28', description: 'Infaq Masjid', type: 'debit', amount: 200000, balance: 6700000 },
  { id: '11', date: '2026-07-29', description: 'Beli Pulsa & Paket Data', type: 'debit', amount: 150000, balance: 6550000 },
  { id: '12', date: '2026-07-30', description: 'Jajan Anak', type: 'debit', amount: 100000, balance: 6450000 },
].reverse(); // Terbalik agar yang terbaru di atas

export const LaporanKeuanganPribadi: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(DUMMY_TRANSACTIONS.length / itemsPerPage);
  const currentTransactions = DUMMY_TRANSACTIONS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const saldoAkhirBulan = DUMMY_TRANSACTIONS[0].balance; // Transaksi terbaru ada di index 0 karena di reverse
  const saldoTanggalBerjalan = saldoAkhirBulan;

  const totalPemasukan = DUMMY_TRANSACTIONS.filter(t => t.type === 'kredit').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPengeluaran = DUMMY_TRANSACTIONS.filter(t => t.type === 'debit').reduce((acc, curr) => acc + curr.amount, 0);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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
              <Calendar className="w-3.5 h-3.5" /> Estimasi Saldo Akhir Bulan
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

      {/* Transaction History Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Riwayat Transaksi Bulan Ini
          </h3>
          <div className="text-[10px] text-gray-500 font-bold bg-white px-2 py-1 rounded-md border border-gray-200 uppercase tracking-wider">
            Juli 2026
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
                </tr>
              ))}
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
