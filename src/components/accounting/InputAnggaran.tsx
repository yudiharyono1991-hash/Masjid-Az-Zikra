import React, { useState } from 'react';
import { useMasjidStore } from '../../lib/store';
import { Plus, Trash2, Save, X, Edit2 } from 'lucide-react';
import { ERPBudgetEntry } from '../../types';

export function InputAnggaran() {
  const { state, addErpBudget, updateErpBudget, deleteErpBudget } = useMasjidStore();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState(0);

  // Filter out only Revenue and Expense accounts for budgeting
  const eligibleAccounts = state.erpCoa.filter(
    acc => (acc.accountType === 'Revenue' || acc.accountType === 'Expense') && !acc.isHeader && acc.isActive
  );

  const currentBudgets = state.erpBudgets.filter(b => b.year === selectedYear);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId || amount <= 0) return;

    if (editingId) {
      updateErpBudget(editingId, { accountId, amount });
    } else {
      // Check if already exists
      const existing = currentBudgets.find(b => b.accountId === accountId);
      if (existing) {
        alert('Anggaran untuk akun ini pada tahun tersebut sudah ada. Silakan edit yang sudah ada.');
        return;
      }
      addErpBudget({
        id: `budg-${Date.now()}`,
        accountId,
        year: selectedYear,
        amount,
        createdAt: new Date().toISOString()
      });
    }

    resetForm();
  };

  const handleEdit = (budget: ERPBudgetEntry) => {
    setEditingId(budget.id);
    setAccountId(budget.accountId);
    setAmount(budget.amount);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Yakin ingin menghapus anggaran ini?')) {
      deleteErpBudget(id);
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setAccountId('');
    setAmount(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-blue-950">Input Anggaran (Budget)</h3>
          <p className="text-sm text-gray-500">Buat perencanaan anggaran pendapatan & pengeluaran tahunan</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 outline-none w-full sm:w-auto"
          >
            {[selectedYear - 1, selectedYear, selectedYear + 1].map(y => (
              <option key={y} value={y}>Tahun {y}</option>
            ))}
          </select>

          <button
            onClick={() => { resetForm(); setShowAddForm(true); }}
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Input Anggaran</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm animate-fadeIn">
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Pilih Akun Beban/Pendapatan</label>
              <select
                required
                value={accountId}
                onChange={e => setAccountId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">-- Pilih Akun --</option>
                {eligibleAccounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    [{acc.accountCode}] {acc.accountName} ({acc.accountType === 'Revenue' ? 'Pendapatan' : 'Beban'})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Nominal Anggaran setahun (Rp)</label>
              <input
                type="number"
                required
                min="0"
                value={amount || ''}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Misal: 120000000"
              />
            </div>

            <div className="md:col-span-1 flex items-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
              >
                <X className="w-4 h-4" /> Batal
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
              >
                <Save className="w-4 h-4" /> Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-bold">Kode Akun</th>
                <th className="p-4 font-bold">Nama Akun</th>
                <th className="p-4 font-bold">Tipe Akun</th>
                <th className="p-4 font-bold text-right">Nilai Anggaran (Rp)</th>
                <th className="p-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {currentBudgets.length > 0 ? (
                currentBudgets.map(budget => {
                  const acc = state.erpCoa.find(a => a.id === budget.accountId);
                  return (
                    <tr key={budget.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-4 font-mono font-medium text-gray-600">{acc?.accountCode || '-'}</td>
                      <td className="p-4 font-semibold text-gray-800">{acc?.accountName || 'Akun tidak ditemukan'}</td>
                      <td className="p-4 text-gray-500">{acc?.accountType === 'Revenue' ? 'Pendapatan' : 'Beban'}</td>
                      <td className="p-4 font-mono font-bold text-gray-900 text-right">
                        {budget.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(budget)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(budget.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Belum ada data anggaran untuk tahun {selectedYear}. Silakan input anggaran baru.
                  </td>
                </tr>
              )}
            </tbody>
            {currentBudgets.length > 0 && (
              <tfoot className="bg-gray-50 border-t border-gray-200">
                <tr>
                  <td colSpan={3} className="p-4 text-right font-bold text-gray-700">Total Anggaran:</td>
                  <td className="p-4 font-mono font-bold text-blue-700 text-right">
                    {currentBudgets.reduce((sum, b) => sum + b.amount, 0).toLocaleString('id-ID')}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
