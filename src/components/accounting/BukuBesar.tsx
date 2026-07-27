import React, { useState } from 'react';
import { useMasjidStore } from '../../lib/store';
import { Download } from 'lucide-react';
import { exportBukuBesarToExcel } from '../../lib/excelUtils';

export function BukuBesar() {
  const { state } = useMasjidStore();
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');

  const handleExport = () => {
    // If an account is selected, export only that account's ledger
    const accountsToExport = selectedAccountId 
      ? state.erpCoa.filter(a => a.id === selectedAccountId)
      : state.erpCoa;
    exportBukuBesarToExcel(accountsToExport, state.erpJournals, state.erpJournalEntries);
  };

  const account = state.erpCoa.find(a => a.id === selectedAccountId);
  
  // Calculate Ledger Entries
  let runningBalance = 0;
  const ledgerEntries = account ? state.erpJournalEntries
    .filter(e => e.accountId === account.id)
    .sort((a, b) => {
      const jA = state.erpJournals.find(j => j.id === a.journalId);
      const jB = state.erpJournals.find(j => j.id === b.journalId);
      if (!jA || !jB) return 0;
      return new Date(jA.date).getTime() - new Date(jB.date).getTime();
    })
    .map(entry => {
      const journal = state.erpJournals.find(j => j.id === entry.journalId);
      const isDebitIncrease = account.normalBalance === 'Debit';
      const change = isDebitIncrease ? entry.debit - entry.credit : entry.credit - entry.debit;
      runningBalance += change;
      return {
        ...entry,
        journalDate: journal?.date,
        journalNo: journal?.journalNo,
        journalDesc: journal?.description,
        runningBalance
      };
    }) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-blue-900">Buku Besar (General Ledger)</h3>
        <button onClick={handleExport} className="px-3 py-2 bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-100">
          <Download className="w-4 h-4" /> Ekspor Buku Besar
        </button>
      </div>

      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div className="max-w-md">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Akun</label>
          <select 
            value={selectedAccountId} 
            onChange={e => setSelectedAccountId(e.target.value)} 
            className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 outline-none focus:border-blue-500"
          >
            <option value="">-- Pilih Akun --</option>
            {state.erpCoa.map(coa => (
              <option key={coa.id} value={coa.id}>[{coa.accountCode}] {coa.accountName}</option>
            ))}
          </select>
        </div>
      </div>

      {account && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <div>
              <div className="text-xl font-bold text-blue-900">[{account.accountCode}] {account.accountName}</div>
              <div className="text-sm text-gray-500 mt-1">Saldo Normal: {account.normalBalance} | Tipe: {account.accountType}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Saldo Akhir</div>
              <div className={`text-2xl font-bold ${runningBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Rp {runningBalance.toLocaleString()}
              </div>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b border-gray-200 text-gray-600">
              <tr>
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold">No Bukti</th>
                <th className="p-4 font-semibold">Keterangan</th>
                <th className="p-4 font-semibold text-right">Debit</th>
                <th className="p-4 font-semibold text-right">Kredit</th>
                <th className="p-4 font-semibold text-right">Saldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ledgerEntries.map((e, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4">{e.journalDate}</td>
                  <td className="p-4 font-mono text-xs text-blue-600">{e.journalNo}</td>
                  <td className="p-4">{e.description || e.journalDesc}</td>
                  <td className="p-4 text-right font-mono">{e.debit > 0 ? e.debit.toLocaleString() : '-'}</td>
                  <td className="p-4 text-right font-mono">{e.credit > 0 ? e.credit.toLocaleString() : '-'}</td>
                  <td className="p-4 text-right font-mono font-semibold">{e.runningBalance.toLocaleString()}</td>
                </tr>
              ))}
              {ledgerEntries.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">Belum ada mutasi pada akun ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
