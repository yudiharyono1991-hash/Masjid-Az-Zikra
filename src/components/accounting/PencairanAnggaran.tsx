import React, { useState } from 'react';
import { useMasjidStore } from '../../lib/store';
import { CheckCircle, XCircle, FileText, Send, AlertCircle, Clock } from 'lucide-react';
import { ERPDisbursementRequest } from '../../types';

export function PencairanAnggaran() {
  const { state, addErpDisbursement, updateErpDisbursementStatus } = useMasjidStore();
  const [activeTab, setActiveTab] = useState<'ajukan' | 'approval'>('ajukan');

  // Staf Form State
  const [selectedBudgetId, setSelectedBudgetId] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [purpose, setPurpose] = useState('');

  // Director Approval State
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const isDirector = state.session?.role === 'direktur' || state.session?.role === 'ketua_dewan_pembina';

  // Calculate budget utilization
  const getBudgetBalance = (budgetId: string) => {
    const budget = state.erpBudgets.find(b => b.id === budgetId);
    if (!budget) return 0;
    const approvedDisbursements = state.erpDisbursements
      .filter(d => d.budgetId === budgetId && d.status === 'Approved')
      .reduce((sum, d) => sum + d.amount, 0);
    return budget.amount - approvedDisbursements;
  };

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBudgetId || !amount || amount <= 0 || !purpose) return;

    const balance = getBudgetBalance(selectedBudgetId);
    if (amount > balance) {
      alert(`Nominal pengajuan (Rp ${amount.toLocaleString('id-ID')}) melebihi sisa anggaran yang tersedia (Rp ${balance.toLocaleString('id-ID')}).`);
      return;
    }

    addErpDisbursement({
      id: `REQ-${Date.now()}`,
      budgetId: selectedBudgetId,
      amount: Number(amount),
      purpose,
      requestDate: new Date().toISOString(),
      requestedBy: state.session?.name || 'Staf / Admin',
      status: 'Pending'
    });

    alert('Pengajuan pencairan berhasil dikirim dan menunggu persetujuan.');
    setSelectedBudgetId('');
    setAmount('');
    setPurpose('');
  };

  const handleApprove = (id: string) => {
    if (window.confirm('Setujui pengajuan ini?')) {
      updateErpDisbursementStatus(id, 'Approved', state.session?.name || 'Direktur');
    }
  };

  const submitReject = (id: string) => {
    if (!rejectionReason) {
      alert('Alasan penolakan wajib diisi.');
      return;
    }
    updateErpDisbursementStatus(id, 'Rejected', state.session?.name || 'Direktur', rejectionReason);
    setRejectingId(null);
    setRejectionReason('');
  };

  // Only show budgets that have a positive balance
  const activeBudgets = state.erpBudgets.map(b => ({
    ...b,
    balance: getBudgetBalance(b.id),
    account: state.erpCoa.find(c => c.id === b.accountId)
  })).filter(b => b.balance > 0);

  return (
    <div className="space-y-6">
      <div className="flex bg-white rounded-xl border border-gray-200 overflow-hidden text-sm font-semibold w-full sm:w-max shadow-sm">
        <button
          onClick={() => setActiveTab('ajukan')}
          className={`px-6 py-3 transition-colors ${activeTab === 'ajukan' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Form Pengajuan
        </button>
        {isDirector && (
          <button
            onClick={() => setActiveTab('approval')}
            className={`px-6 py-3 transition-colors flex items-center gap-2 ${activeTab === 'approval' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Persetujuan (Approval)
            {state.erpDisbursements.filter(d => d.status === 'Pending').length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {state.erpDisbursements.filter(d => d.status === 'Pending').length}
              </span>
            )}
          </button>
        )}
      </div>

      {activeTab === 'ajukan' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Buat Pengajuan Baru
            </h3>
            <form onSubmit={handleAjukan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Pilih Pos Anggaran</label>
                <select
                  required
                  value={selectedBudgetId}
                  onChange={e => setSelectedBudgetId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">-- Pilih Anggaran --</option>
                  {activeBudgets.map(b => (
                    <option key={b.id} value={b.id}>
                      Tahun {b.year} | {b.account?.accountName} (Sisa: Rp {b.balance.toLocaleString('id-ID')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Nominal Pencairan (Rp)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Contoh: 5000000"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Tujuan / Rincian Penggunaan</label>
                <textarea
                  required
                  rows={3}
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                  placeholder="Jelaskan untuk apa dana ini akan digunakan..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20"
              >
                <Send className="w-4 h-4" /> Kirim Pengajuan
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">Riwayat Pengajuan Saya</h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-white border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                    <th className="p-4 font-bold">Tgl Pengajuan</th>
                    <th className="p-4 font-bold">Pos Anggaran</th>
                    <th className="p-4 font-bold text-right">Nominal (Rp)</th>
                    <th className="p-4 font-bold">Tujuan</th>
                    <th className="p-4 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {state.erpDisbursements.length > 0 ? (
                    state.erpDisbursements.map(d => {
                      const budget = state.erpBudgets.find(b => b.id === d.budgetId);
                      const coa = state.erpCoa.find(c => c.id === budget?.accountId);
                      return (
                        <tr key={d.id} className="hover:bg-gray-50">
                          <td className="p-4 text-gray-600">{new Date(d.requestDate).toLocaleDateString('id-ID')}</td>
                          <td className="p-4 font-medium text-gray-800">{coa?.accountName || 'Anggaran Dihapus'}</td>
                          <td className="p-4 text-right font-mono font-bold text-gray-900">{d.amount.toLocaleString('id-ID')}</td>
                          <td className="p-4 text-gray-600 max-w-[200px] truncate" title={d.purpose}>{d.purpose}</td>
                          <td className="p-4 text-center">
                            {d.status === 'Pending' && <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold"><Clock className="w-3 h-3" /> Pending</span>}
                            {d.status === 'Approved' && <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold"><CheckCircle className="w-3 h-3" /> Disetujui</span>}
                            {d.status === 'Rejected' && <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold" title={d.rejectionReason}><XCircle className="w-3 h-3" /> Ditolak</span>}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">Belum ada riwayat pengajuan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'approval' && isAdminOrDirector && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-emerald-50">
            <h3 className="font-bold text-lg text-emerald-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Persetujuan Pencairan Anggaran
            </h3>
            <p className="text-sm text-emerald-700 mt-1">Review dan berikan persetujuan untuk dana yang akan dikeluarkan.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-bold">Pemohon & Tgl</th>
                  <th className="p-4 font-bold">Pos Anggaran</th>
                  <th className="p-4 font-bold text-right">Nominal (Rp)</th>
                  <th className="p-4 font-bold">Tujuan Penggunaan</th>
                  <th className="p-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {state.erpDisbursements.filter(d => d.status === 'Pending').length > 0 ? (
                  state.erpDisbursements.filter(d => d.status === 'Pending').map(d => {
                    const budget = state.erpBudgets.find(b => b.id === d.budgetId);
                    const coa = state.erpCoa.find(c => c.id === budget?.accountId);
                    
                    return (
                      <tr key={d.id} className="hover:bg-blue-50/50">
                        <td className="p-4">
                          <div className="font-bold text-gray-800">{d.requestedBy}</div>
                          <div className="text-xs text-gray-500">{new Date(d.requestDate).toLocaleDateString('id-ID')}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-blue-900">{coa?.accountName}</div>
                          <div className="text-xs text-gray-500">Sisa Pagu: Rp {getBudgetBalance(d.budgetId).toLocaleString('id-ID')}</div>
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-red-600">
                          Rp {d.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="p-4 text-gray-700">
                          {d.purpose}
                        </td>
                        <td className="p-4">
                          {rejectingId === d.id ? (
                            <div className="flex flex-col gap-2 min-w-[200px]">
                              <input 
                                type="text" 
                                value={rejectionReason}
                                onChange={e => setRejectionReason(e.target.value)}
                                placeholder="Alasan penolakan..." 
                                className="px-2 py-1.5 text-xs border border-gray-300 rounded outline-none"
                              />
                              <div className="flex gap-2">
                                <button onClick={() => submitReject(d.id)} className="flex-1 bg-red-600 text-white text-xs font-bold py-1.5 rounded">Tolak</button>
                                <button onClick={() => setRejectingId(null)} className="flex-1 bg-gray-200 text-gray-700 text-xs font-bold py-1.5 rounded">Batal</button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleApprove(d.id)}
                                className="px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1"
                              >
                                <CheckCircle className="w-3 h-3" /> Approve
                              </button>
                              <button
                                onClick={() => setRejectingId(d.id)}
                                className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1"
                              >
                                <XCircle className="w-3 h-3" /> Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex flex-col items-center text-gray-400">
                        <CheckCircle className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium text-gray-500">Tidak ada pengajuan pending</p>
                        <p className="text-sm mt-1">Semua pengajuan pencairan telah direview.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
