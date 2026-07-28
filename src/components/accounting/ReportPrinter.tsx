import React, { useRef, useState } from 'react';
import { useMasjidStore } from '../../lib/store';
import { Download, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function ReportPrinter() {
  const { state, addErpCoa, updateErpSignature } = useMasjidStore();
  const printRef = useRef<HTMLDivElement>(null);
  const [reportType, setReportType] = useState('Neraca');

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
          </select>
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
          <h2 className="text-xl font-bold mt-4 uppercase underline">{reportType === 'Neraca' ? 'Laporan Posisi Keuangan' : 'Laporan Aktivitas'}</h2>
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
