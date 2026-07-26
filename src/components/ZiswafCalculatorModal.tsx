import React, { useState } from 'react';
import { formatRupiahFull } from '../lib/islamicUtils';
import { X, Sparkles, Calculator, HelpCircle, ArrowRight } from 'lucide-react';

interface ZiswafCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAmountForDonation: (amount: number, category: string) => void;
}

export const ZiswafCalculatorModal: React.FC<ZiswafCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSelectAmountForDonation
}) => {
  const [calcTab, setCalcTab] = useState<'profesi' | 'mal' | 'fitrah'>('profesi');

  // Zakat Profesi Inputs
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000000);
  const [monthlyBonus, setMonthlyBonus] = useState<number>(0);
  const [monthlyNeeds, setMonthlyNeeds] = useState<number>(0);

  // Zakat Mal Inputs (Emas / Tabungan / Saham)
  const [savingsValue, setSavingsValue] = useState<number>(100000000);
  const [goldGram, setGoldGram] = useState<number>(0);
  const goldPricePerGram = 1350000; // Harga emas standar IDR

  // Zakat Fitrah Inputs
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const ricePricePerKg = 15000;
  const fitrahRiceKgPerPerson = 2.5;

  if (!isOpen) return null;

  // Calculate Zakat Profesi (Nishab: 85 gram emas / 12 bulan = Rp 9.5M per bulan)
  const totalProfesiIncome = monthlyIncome + monthlyBonus - monthlyNeeds;
  const nishabProfesiBulan = (85 * goldPricePerGram) / 12;
  const isProfesiWajib = totalProfesiIncome >= nishabProfesiBulan;
  const zakatProfesiBulan = isProfesiWajib ? Math.round(totalProfesiIncome * 0.025) : 0;

  // Calculate Zakat Mal (Nishab: 85 gram emas = Rp 114.75M)
  const totalMalValue = savingsValue + (goldGram * goldPricePerGram);
  const nishabMalTahun = 85 * goldPricePerGram;
  const isMalWajib = totalMalValue >= nishabMalTahun;
  const zakatMalTahun = isMalWajib ? Math.round(totalMalValue * 0.025) : 0;

  // Calculate Zakat Fitrah
  const zakatFitrahRupiah = familyMembers * fitrahRiceKgPerPerson * ricePricePerKg;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b1329] border border-amber-500/30 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative text-slate-100 my-8">
        {/* Header Bar */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-white">
                Kalkulator ZISWAF Syariah
              </h3>
              <p className="text-xs text-slate-400">
                Hitung kewajiban Zakat Mal, Zakat Profesi, dan Fitrah sesuai nisab
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950 p-2 gap-2">
          {[
            { id: 'profesi', label: 'Zakat Penghasilan' },
            { id: 'mal', label: 'Zakat Mal & Emas' },
            { id: 'fitrah', label: 'Zakat Fitrah' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setCalcTab(t.id as any)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                calcTab === t.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* PROFESI TAB */}
          {calcTab === 'profesi' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Gaji / Penghasilan Rutin per Bulan (Rp):
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Bonus / Tunjangan / Pendapatan Tambahan (Rp):
                  </label>
                  <input
                    type="number"
                    value={monthlyBonus}
                    onChange={(e) => setMonthlyBonus(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Pengeluaran Kebutuhan Pokok & Cicilan (Rp):
                  </label>
                  <input
                    type="number"
                    value={monthlyNeeds}
                    onChange={(e) => setMonthlyNeeds(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              {/* Result Calculation Box */}
              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Nishab Bulanan (85gr Emas/12):</span>
                  <span className="font-mono text-slate-200">{formatRupiahFull(nishabProfesiBulan)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Status Wajib Zakat:</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${isProfesiWajib ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-300'}`}>
                    {isProfesiWajib ? 'WAJIB ZAKAT (2.5%)' : 'Belum Mencapai Nishab'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Zakat Wajib Ditunaikan / Bulan:</span>
                    <span className="text-2xl font-bold font-mono text-amber-400">
                      {formatRupiahFull(zakatProfesiBulan)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectAmountForDonation(zakatProfesiBulan || 100000, 'zakat');
                      onClose();
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <span>Salurkan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MAL TAB */}
          {calcTab === 'mal' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Nilai Deposito / Tabungan / Surat Berharga (Rp):
                  </label>
                  <input
                    type="number"
                    value={savingsValue}
                    onChange={(e) => setSavingsValue(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Kepemilikan Emas Murni (Gram):
                  </label>
                  <input
                    type="number"
                    value={goldGram}
                    onChange={(e) => setGoldGram(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    *Asumsi harga emas Rp 1.350.000 / gram
                  </span>
                </div>
              </div>

              {/* Result Calculation Box */}
              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Harta Tersimpan:</span>
                  <span className="font-mono text-slate-200">{formatRupiahFull(totalMalValue)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Nishab Zakat Mal (85g Emas):</span>
                  <span className="font-mono text-slate-200">{formatRupiahFull(nishabMalTahun)}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Kewajiban Zakat Mal / Tahun:</span>
                    <span className="text-2xl font-bold font-mono text-amber-400">
                      {formatRupiahFull(zakatMalTahun)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectAmountForDonation(zakatMalTahun || 250000, 'zakat');
                      onClose();
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <span>Salurkan Zakat Mal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FITRAH TAB */}
          {calcTab === 'fitrah' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Jumlah Jiwa / Tanggungan Keluarga:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                  />
                  <span className="text-xs text-slate-400 font-medium">Orang</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Zakat fitrah per orang disetarakan 2.5 kg beras (Rp 37.500 @ Rp 15.000/kg).
                </p>
              </div>

              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Zakat Fitrah ({familyMembers} Orang):</span>
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    {formatRupiahFull(zakatFitrahRupiah)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onSelectAmountForDonation(zakatFitrahRupiah, 'zakat');
                    onClose();
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <span>Bayar Zakat Fitrah</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
