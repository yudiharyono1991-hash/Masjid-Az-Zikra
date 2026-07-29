import React, { useRef, useState } from 'react';
import { useMasjidStore } from '../../lib/store';
import { Download, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function ReportPrinter() {
  const { state, addErpCoa, updateErpSignature } = useMasjidStore();
  const printRef = useRef<HTMLDivElement>(null);
  const [reportType, setReportType] = useState('Neraca');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Laporan_${reportType}_Masjid_Tazkia.pdf`);
  };

  const getBalances = () => {
    // simplified balance calculator
    const balances = state.erpCoa.map(coa => {
      let balance = 0;
      state.erpJournalEntries.filter(e => e.accountId === coa.id).forEach(entry => {
        const isDebitIncrease = coa.normalBalance === 'Debit';
        balance += isDebitIncrease ? entry.debit - entry.credit : entry.credit - entry.debit;
      });
      return { ...coa, balance };
    });
    return balances;
  };

  const balances = getBalances();
  const assets = balances.filter(b => b.accountType === 'Asset');
  const liabilities = balances.filter(b => b.accountType === 'Liability');
  const equities = balances.filter(b => b.accountType === 'Equity');

  const getRealisasiAnggaran = () => {
    // get budgets for selected year
    const budgets = state.erpBudgets.filter(b => b.year === selectedYear);
    
    return budgets.map(budget => {
      const coa = state.erpCoa.find(c => c.id === budget.accountId);
      let actual = 0;
      // sum actuals based on year (very simplified, usually need date parsing)
      state.erpJournalEntries.filter(e => e.accountId === budget.accountId).forEach(entry => {
        const journal = state.erpJournals.find(j => j.id === entry.journalId);
        if (journal && journal.date.startsWith(selectedYear.toString())) {
          // If Revenue, credit is positive. If Expense, debit is positive.
          if (coa?.accountType === 'Revenue') {
            actual += entry.credit - entry.debit;
          } else {
            actual += entry.debit - entry.credit;
          }
        }
      });
      return {
        ...budget,
        accountCode: coa?.accountCode || '-',
        accountName: coa?.accountName || 'Unknown',
        accountType: coa?.accountType || 'Unknown',
        actual,
        variance: budget.amount - actual,
        percentage: budget.amount > 0 ? (actual / budget.amount) * 100 : 0
      };
    }).sort((a, b) => a.accountType.localeCompare(b.accountType));
  };
  const realisasi = getRealisasiAnggaran();

  const totalAsset = assets.reduce((s, a) => s + a.balance, 0);
  const totalLiabEq = liabilities.reduce((s, a) => s + a.balance, 0) + equities.reduce((s, a) => s + a.balance, 0);

  // Fetch dynamic signatures from global store, sort by order index
  const hierarchy = [...(state.reportSignatories || [])].sort((a,b) => a.orderIdx - b.orderIdx);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm print:hidden">
        <h3 className="font-bold text-lg text-blue-900">Cetak Laporan Keuangan</h3>
        <div className="flex gap-2">
          <select 
            value={reportType} 
            onChange={e => setReportType(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-gray-50 outline-none"
          >
            <option value="Neraca">Laporan Posisi Keuangan (Neraca)</option>
            <option value="LabaRugi">Laporan Aktivitas (Laba/Rugi)</option>
            <option value="Realisasi">Laporan Realisasi Anggaran</option>
          </select>
          {reportType === 'Realisasi' && (
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-gray-50 outline-none"
            >
              {[selectedYear - 1, selectedYear, selectedYear + 1].map(y => (
                <option key={y} value={y}>Tahun {y}</option>
              ))}
            </select>
          )}
          <button onClick={handlePrint} className="px-3 py-2 bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-100">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button onClick={handleDownloadPdf} className="px-3 py-2 bg-tazkia-primary text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-tazkia-light">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-4xl mx-auto print:border-none print:shadow-none text-gray-900 print-area" ref={printRef}>
        <div className="text-center mb-8 border-b-4 border-double border-blue-900 pb-4">
          <h1 className="text-2xl font-bold text-blue-900 tracking-widest uppercase">MASJID TAZKIA</h1>
          <p className="text-gray-600 font-medium">Jl. Ir. H. Djuanda No. 78 Sentul City, Bogor</p>
          <h2 className="text-xl font-bold mt-4 uppercase underline">
            {reportType === 'Neraca' && 'Laporan Posisi Keuangan'}
            {reportType === 'LabaRugi' && 'Laporan Aktivitas'}
            {reportType === 'Realisasi' && `Laporan Realisasi Anggaran Tahun ${selectedYear}`}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Per {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        {reportType === 'Neraca' && (
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-bold border-b border-gray-300 pb-1 mb-2">ASET</h3>
              <div className="space-y-1">
                {assets.map(a => (
                  <div key={a.id} className="flex justify-between">
                    <span>{a.accountName}</span>
                    <span>Rp {a.balance.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold mt-4 pt-2 border-t border-gray-300">
                <span>TOTAL ASET</span>
                <span>Rp {totalAsset.toLocaleString()}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold border-b border-gray-300 pb-1 mb-2">KEWAJIBAN & EKUITAS</h3>
              <div className="space-y-1">
                {liabilities.map(a => (
                  <div key={a.id} className="flex justify-between">
                    <span>{a.accountName}</span>
                    <span>Rp {a.balance.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-2 font-bold text-gray-700">Ekuitas / Saldo Dana</div>
              <div className="space-y-1">
                {equities.map(a => (
                  <div key={a.id} className="flex justify-between">
                    <span>{a.accountName}</span>
                    <span>Rp {a.balance.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold mt-4 pt-2 border-t border-gray-300">
                <span>TOTAL KEWAJIBAN & EKUITAS</span>
                <span>Rp {totalLiabEq.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {reportType === 'LabaRugi' && (
          <div className="text-sm">
            <p className="italic text-gray-500 mb-4 text-center">(Contoh format Laporan Aktivitas, data diringkas untuk demo)</p>
            {/* Omitted for brevity in this MVP, similar to Neraca */}
          </div>
        )}

        {reportType === 'Realisasi' && (
          <div className="text-sm">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-2 border-r border-gray-300">Kode Akun</th>
                  <th className="p-2 border-r border-gray-300">Nama Akun</th>
                  <th className="p-2 border-r border-gray-300 text-right">Anggaran</th>
                  <th className="p-2 border-r border-gray-300 text-right">Realisasi</th>
                  <th className="p-2 border-r border-gray-300 text-right">Sisa (Varians)</th>
                  <th className="p-2 text-center">% Realisasi</th>
                </tr>
              </thead>
              <tbody>
                {realisasi.map(r => (
                  <tr key={r.id} className="border-b border-gray-200">
                    <td className="p-2 border-r border-gray-300">{r.accountCode}</td>
                    <td className="p-2 border-r border-gray-300">
                      <div className="font-medium">{r.accountName}</div>
                      <div className="text-xs text-gray-500">{r.accountType === 'Revenue' ? 'Pendapatan' : 'Beban'}</div>
                    </td>
                    <td className="p-2 border-r border-gray-300 text-right font-mono">Rp {r.amount.toLocaleString('id-ID')}</td>
                    <td className="p-2 border-r border-gray-300 text-right font-mono">Rp {r.actual.toLocaleString('id-ID')}</td>
                    <td className={`p-2 border-r border-gray-300 text-right font-mono ${r.variance < 0 && r.accountType === 'Expense' ? 'text-red-600 font-bold' : ''}`}>
                      Rp {r.variance.toLocaleString('id-ID')}
                    </td>
                    <td className={`p-2 text-center font-mono ${r.percentage > 100 && r.accountType === 'Expense' ? 'text-red-600 font-bold' : 'text-emerald-600'}`}>
                      {r.percentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
                {realisasi.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500 italic">Belum ada anggaran di tahun {selectedYear}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-20 pt-8 border-t-2 border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            {hierarchy.map((h, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="mb-16 font-medium text-gray-600">{h.role}</span>
                <span className="font-bold underline uppercase">{h.name}</span>
                <span className="text-xs text-gray-500">{h.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
