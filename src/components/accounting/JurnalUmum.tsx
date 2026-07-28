import React, { useState } from 'react';
import { useMasjidStore } from '../../lib/store';
import { ERPGeneralJournal, ERPJournalEntry } from '../../types';
import { Download, Plus, Save, Edit2, Trash2 } from 'lucide-react';
import { exportJurnalUmumToExcel } from '../../lib/excelUtils';

export function JurnalUmum() {
  const { state, addErpJournal, deleteErpJournal, updateErpJournal, addErpJournalEntry } = useMasjidStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingJournalId, setEditingJournalId] = useState<string | null>(null);
  const [rowSearches, setRowSearches] = useState<string[]>([]);
  
  const [journalData, setJournalData] = useState<Partial<ERPGeneralJournal>>({
    journalNo: `JU-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    description: '',
    reference: '',
  });

  const [entries, setEntries] = useState<Partial<ERPJournalEntry>[]>([
    { accountId: '', debit: 0, credit: 0, description: '' },
    { accountId: '', debit: 0, credit: 0, description: '' }
  ]);

  const handleExport = () => {
    exportJurnalUmumToExcel(state.erpJournals, state.erpJournalEntries);
  };

  const handleSave = () => {
    if (!journalData.description) return alert('Deskripsi jurnal harus diisi');
    
    const totalDebit = entries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
    const totalCredit = entries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);
    
    if (totalDebit !== totalCredit) return alert('Total Debit dan Kredit harus seimbang (Balance)');
    if (totalDebit === 0) return alert('Debit/Kredit tidak boleh 0');

    const journalId = editingJournalId || `JRN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newJournal: ERPGeneralJournal = {
      id: journalId,
      journalNo: journalData.journalNo || '',
      date: journalData.date || '',
      description: journalData.description || '',
      reference: journalData.reference || '',
      status: 'Posted',
      createdAt: new Date().toISOString()
    };

    const newEntries: ERPJournalEntry[] = entries
      .filter(entry => entry.accountId)
      .map(entry => {
        const account = state.erpCoa.find(a => a.id === entry.accountId);
        return {
          id: entry.id || `JE-${Math.floor(1000 + Math.random() * 9000)}`,
          journalId,
          accountId: entry.accountId!,
          accountCode: account?.accountCode,
          accountName: account?.accountName,
          debit: Number(entry.debit) || 0,
          credit: Number(entry.credit) || 0,
          description: entry.description || ''
        };
      });

    if (editingJournalId) {
      updateErpJournal(editingJournalId, newJournal, newEntries);
      alert('Alhamdulillah, koreksi Jurnal Umum berhasil disimpan!');
    } else {
      addErpJournal(newJournal);
      newEntries.forEach(ne => {
        addErpJournalEntry(ne);
      });
      alert('Alhamdulillah, Jurnal Umum berhasil disimpan!');
    }

    setIsAdding(false);
    setEditingJournalId(null);
    setRowSearches([]);
    setEntries([{ accountId: '', debit: 0, credit: 0, description: '' }, { accountId: '', debit: 0, credit: 0, description: '' }]);
    setJournalData({
      journalNo: `JU-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      description: '',
      reference: '',
    });
  };

  const handleEdit = (journal: ERPGeneralJournal) => {
    const journalEntries = state.erpJournalEntries.filter(e => e.journalId === journal.id);
    setEditingJournalId(journal.id);
    setJournalData(journal);
    setEntries(journalEntries.map(e => ({
      id: e.id,
      accountId: e.accountId,
      debit: e.debit,
      credit: e.credit,
      description: e.description
    })));
    setRowSearches(new Array(journalEntries.length).fill(''));
    setIsAdding(true);
  };

  const handleDelete = (journalId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jurnal ini? Tindakan ini akan menghapus jurnal dan seluruh entri terkait secara permanen.')) {
      deleteErpJournal(journalId);
      alert('Jurnal berhasil dihapus.');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingJournalId(null);
    setRowSearches([]);
    setEntries([{ accountId: '', debit: 0, credit: 0, description: '' }, { accountId: '', debit: 0, credit: 0, description: '' }]);
    setJournalData({
      journalNo: `JU-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      description: '',
      reference: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-blue-900">Jurnal Umum</h3>
        <div className="flex gap-2">
          <button onClick={handleExport} className="px-3 py-2 bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-100">
            <Download className="w-4 h-4" /> Ekspor
          </button>
          <button onClick={() => { setEditingJournalId(null); setIsAdding(true); }} className="px-3 py-2 bg-tazkia-primary text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-tazkia-light">
            <Plus className="w-4 h-4" /> Buat Jurnal Baru
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h4 className="font-bold text-sm text-blue-900 border-b pb-2">
            {editingJournalId ? 'Koreksi / Edit Jurnal Umum' : 'Buat Jurnal Baru'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">No Jurnal</label>
              <input value={journalData.journalNo} onChange={e => setJournalData({ ...journalData, journalNo: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-900" readOnly />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal</label>
              <input type="date" value={journalData.date} onChange={e => setJournalData({ ...journalData, date: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Referensi</label>
              <input value={journalData.reference} onChange={e => setJournalData({ ...journalData, reference: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900" placeholder="Ref Bukti" />
            </div>
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Keterangan Jurnal</label>
              <input value={journalData.description} onChange={e => setJournalData({ ...journalData, description: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900" placeholder="Keterangan Transaksi" />
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 font-semibold">
                  <th className="pb-2 w-1/3">Akun</th>
                  <th className="pb-2">Keterangan Baris</th>
                  <th className="pb-2 w-32">Debit (Rp)</th>
                  <th className="pb-2 w-32">Kredit (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => {
                  const searchVal = rowSearches[idx] || '';
                  const filteredCoa = state.erpCoa.filter(c => 
                    c.isActive && (
                      c.accountName.toLowerCase().includes(searchVal.toLowerCase()) ||
                      c.accountCode.includes(searchVal)
                    )
                  );

                  return (
                    <tr key={idx}>
                      <td className="py-1 pr-2">
                        <div className="flex gap-1.5 items-center">
                          <input 
                            type="text" 
                            placeholder="Cari..." 
                            value={searchVal}
                            onChange={e => {
                              const newSearches = [...rowSearches];
                              newSearches[idx] = e.target.value;
                              setRowSearches(newSearches);
                            }}
                            className="w-32 p-2 border border-gray-300 rounded-lg text-xs"
                            style={{ color: '#111827', backgroundColor: '#ffffff' }}
                          />
                          <select 
                            value={entry.accountId} 
                            onChange={e => {
                              const newEntries = [...entries];
                              newEntries[idx].accountId = e.target.value;
                              setEntries(newEntries);
                            }} 
                            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm min-w-[140px]"
                            style={{ color: '#111827', backgroundColor: '#ffffff' }}
                          >
                            <option value="" style={{ color: '#111827', backgroundColor: '#ffffff' }}>Pilih Akun...</option>
                            {filteredCoa.map(coa => (
                              <option key={coa.id} value={coa.id} style={{ color: '#111827', backgroundColor: '#ffffff' }}>[{coa.accountCode}] {coa.accountName}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="py-1 pr-2">
                        <input value={entry.description} onChange={e => {
                          const newEntries = [...entries];
                          newEntries[idx].description = e.target.value;
                          setEntries(newEntries);
                        }} className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 bg-white" placeholder="Keterangan..." />
                      </td>
                      <td className="py-1 pr-2">
                        <input type="number" value={entry.debit || ''} onChange={e => {
                          const newEntries = [...entries];
                          newEntries[idx].debit = Number(e.target.value);
                          newEntries[idx].credit = 0;
                          setEntries(newEntries);
                        }} className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 bg-white" placeholder="0" />
                      </td>
                      <td className="py-1">
                        <input type="number" value={entry.credit || ''} onChange={e => {
                          const newEntries = [...entries];
                          newEntries[idx].credit = Number(e.target.value);
                          newEntries[idx].debit = 0;
                          setEntries(newEntries);
                        }} className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 bg-white" placeholder="0" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={() => {
              setEntries([...entries, { accountId: '', debit: 0, credit: 0, description: '' }]);
              setRowSearches([...rowSearches, '']);
            }} className="text-sm text-blue-600 font-semibold mt-2 hover:underline">
              + Tambah Baris
            </button>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <button onClick={handleCancel} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200">Batal</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2">
              <Save className="w-4 h-4" /> {editingJournalId ? 'Simpan Koreksi' : 'Simpan Jurnal'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="p-4 font-semibold">Tanggal & No</th>
              <th className="p-4 font-semibold">Keterangan</th>
              <th className="p-4 font-semibold text-right">Debit</th>
              <th className="p-4 font-semibold text-right">Kredit</th>
              <th className="p-4 font-semibold text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {state.erpJournals.map(journal => {
              const journalEntries = state.erpJournalEntries.filter(e => e.journalId === journal.id);
              const totalDebit = journalEntries.reduce((s, e) => s + e.debit, 0);
              
              return (
                <React.Fragment key={journal.id}>
                  <tr className="bg-gray-50/50">
                    <td className="p-4 align-top w-1/4">
                      <div className="font-semibold text-gray-800">{journal.date}</div>
                      <div className="font-mono text-xs text-blue-600">{journal.journalNo}</div>
                      <div className="text-xs text-gray-400 mt-1">Ref: {journal.reference || '-'}</div>
                    </td>
                    <td className="p-4 align-top font-medium text-gray-700">
                      {journal.description}
                      <div className="mt-2 text-xs space-y-1">
                        {journalEntries.map(e => (
                          <div key={e.id} className="flex justify-between">
                            <span className={e.credit > 0 ? 'pl-4 text-gray-500' : 'text-gray-600'}>
                              [{e.accountCode}] {e.accountName}
                            </span>
                            <div className="flex gap-4 w-48 justify-end font-mono">
                              <span className="w-20 text-right">{e.debit > 0 ? e.debit.toLocaleString() : ''}</span>
                              <span className="w-20 text-right">{e.credit > 0 ? e.credit.toLocaleString() : ''}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 align-bottom text-right font-bold text-gray-800">
                      Rp {totalDebit.toLocaleString()}
                    </td>
                    <td className="p-4 align-bottom text-right font-bold text-gray-800">
                      Rp {totalDebit.toLocaleString()}
                    </td>
                    <td className="p-4 align-middle text-center">
                      <div className="flex justify-center gap-1.5">
                        <button 
                          onClick={() => handleEdit(journal)} 
                          title="Edit / Koreksi"
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(journal.id)} 
                          title="Hapus"
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
            {state.erpJournals.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">Belum ada transaksi Jurnal Umum.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
