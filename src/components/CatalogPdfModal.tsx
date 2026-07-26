import React, { useRef, useState } from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, Smartphone, Monitor, Server, Sparkles, X, Printer, ChevronRight, Layers, Database, AlertCircle, Edit3, History } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CatalogPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogPdfModal: React.FC<CatalogPdfModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Method 1: Generate PDF using html2canvas + jsPDF
  const handleDownloadPdf = async () => {
    if (!pdfContainerRef.current) return;
    setIsGenerating(true);
    setDownloadError(null);

    try {
      const element = pdfContainerRef.current;
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#FFFFFF',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.90);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width mm
      const pageHeight = 297; // A4 height mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Katalog_Perancangan_Aplikasi_Masjid_AzZikra_Sentul.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 10000);

      handlePrintPdf();
    } catch (err) {
      console.error('Failed generating PDF:', err);
      setDownloadError('Tab cetak/simpan PDF otomatis dibuka untuk Anda.');
      handlePrintPdf();
    } finally {
      setIsGenerating(false);
    }
  };

  // Method 2: Download HTML file for printing offline
  const handleDownloadHtml = () => {
    if (!pdfContainerRef.current) return;
    const content = pdfContainerRef.current.innerHTML;

    const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Katalog Perancangan Platform Digital Masjid Az-Zikra Sentul</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body { margin: 0; padding: 10mm; background: #fff; }
      @page { size: A4; margin: 10mm; }
      .no-print { display: none !important; }
    }
    body { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background: #fff; color: #1a1a1a; padding: 2rem 1rem; }
  </style>
</head>
<body class="bg-stone-50 min-h-screen">
  <div class="no-print max-w-[800px] mx-auto bg-[#064E3B] text-white p-5 rounded-2xl mb-6 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
    <div>
      <h2 class="font-bold text-base">📄 Dokumen Resmi Katalog Perancangan Aplikasi Masjid Az-Zikra Sentul</h2>
      <p class="text-xs text-white/80 mt-1">
        Tekan <strong>Ctrl + P</strong> (Cmd + P di Mac) lalu pilih Destination <strong>"Save as PDF"</strong> untuk menyimpan sebagai PDF.
      </p>
    </div>
    <button onclick="window.print()" class="bg-white text-[#064E3B] font-mono font-bold text-xs uppercase px-5 py-3 rounded-xl cursor-pointer shadow-md border-0">
      🖨️ Cetak / Simpan PDF
    </button>
  </div>

  <div class="max-w-[800px] mx-auto">
    ${content}
  </div>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Katalog_Perancangan_Aplikasi_Masjid_AzZikra_Sentul.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  // Method 3: Print window
  const handlePrintPdf = () => {
    if (!pdfContainerRef.current) return;
    const content = pdfContainerRef.current.innerHTML;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Katalog Perancangan Aplikasi Masjid Az-Zikra Sentul</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @media print {
                body { margin: 0; padding: 10mm; background: #fff; }
                @page { size: A4; margin: 10mm; }
                .no-print { display: none !important; }
              }
              body { font-family: ui-sans-serif, system-ui, sans-serif; background: #fff; color: #1a1a1a; padding: 20px; }
            </style>
          </head>
          <body class="p-6 max-w-4xl mx-auto">
            <div class="no-print bg-[#064E3B] text-white p-4 rounded-xl mb-6 flex justify-between items-center shadow-lg">
              <div>
                <p class="font-bold text-sm">🖨️ Dokumen Lembar Coretan & Persetujuan Pemesan Aplikasi</p>
                <p class="text-xs text-white/80 mt-1">Pilih "Save as PDF" / "Simpan sebagai PDF" di browser Anda.</p>
              </div>
              <button onclick="window.print()" style="background:#fff; color:#064E3B; font-weight:bold; padding:8px 16px; border-radius:8px; cursor:pointer; font-size:12px; border:none;">
                🖨️ SIMPAN / CETAK PDF
              </button>
            </div>
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        try {
          printWindow.print();
        } catch (e) {
          console.log('Auto print');
        }
      }, 300);
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-emerald-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-emerald-200 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-[#064E3B] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif italic font-semibold text-white">
                Katalog Perancangan & Lembar Persetujuan / Coretan Pemesan
              </h2>
              <p className="text-[11px] font-mono text-emerald-200 uppercase tracking-widest">
                Masjid Az-Zikra Sentul &bull; Dokumen Evaluasi &amp; Penyesuaian Fitur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadHtml}
              className="bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
              title="Unduh sebagai file HTML Offline"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Unduh HTML</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
              title="Cetak atau Simpan PDF via Browser"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="bg-amber-400 text-emerald-950 hover:bg-amber-300 font-mono font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                  <span>Proses...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-emerald-950" />
                  <span>Unduh PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable PDF Preview Area */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 bg-emerald-100">
          <div className="flex justify-between items-center text-xs font-mono text-emerald-700 pb-1">
            <span className="font-bold text-[#064E3B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Dokumen Spesifikasi Lengkap & Lembar Coretan / Tambahan Pemesan
            </span>
            <span>&bull; A4 Printable Format</span>
          </div>

          {/* Printable Document Sheet */}
          <div
            ref={pdfContainerRef}
            className="bg-white p-6 sm:p-12 border border-emerald-300 rounded-2xl shadow-xl text-emerald-900 space-y-8 max-w-[800px] mx-auto font-sans"
          >
            {/* Catalog Header */}
            <div className="border-b-2 border-[#064E3B] pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <div className="inline-block px-3 py-1 bg-emerald-100 text-[#064E3B] font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3 border border-emerald-300">
                  DOKUMEN EKSKLUSIF PERANCANGAN APLIKASI
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-900 leading-tight">
                  Katalog Perancangan Platform Digital <br />
                  <span className="font-serif italic text-[#064E3B]">Masjid Az-Zikra Sentul</span>
                </h1>
                <p className="text-xs text-emerald-600 mt-2 font-mono">
                  Kampung Sunnah Az-Zikra, Bukit Sentul, Babakan Madang, Kab. Bogor, Jawa Barat
                </p>
              </div>

              <div className="text-left sm:text-right font-mono text-[11px] text-emerald-600 space-y-1 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <p className="font-bold text-[#064E3B]">REVISI PERANCANGAN: 2026-07-26</p>
                <p>KODE MODUL: AZZIKRA-ENT-2026</p>
                <p>LEMBAR CORETAN: DAPAT DICETAK &amp; DITANDATANGANI</p>
              </div>
            </div>

            {/* Note for buyer */}
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs space-y-1 text-amber-900">
              <p className="font-bold flex items-center gap-1.5 text-amber-950 font-serif text-sm">
                <Edit3 className="w-4 h-4 text-amber-700" />
                Panduan Bagi Pemesan Aplikasi (Client Review Sheet):
              </p>
              <p className="leading-relaxed">
                Dokumen ini menampilkan seluruh rancangan fitur secara utuh. Cetak dokumen ini dalam bentuk kertas/PDF untuk dicoret-coret, dicentang `[ ] Setuju`, `[ ] Modifikasi`, atau `[ ] Hapus` pada bagian yang ingin disesuaikan sebelum diserahkan ke tim developer.
              </p>
            </div>

            {/* SECTION 1: MENELUSURI SEJARAH MASJID AZ-ZIKRA */}
            <div className="space-y-3">
              <h2 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#064E3B] border-b border-emerald-200 pb-1.5 flex items-center gap-2">
                <History className="w-4 h-4 text-[#064E3B]" />
                1. Modul Menelusuri Sejarah Masjid Az-Zikra Sentul
              </h2>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
                <p className="font-bold text-emerald-900 font-serif">A. Profil Sejarah & Warisan KH. Muhammad Arifin Ilham</p>
                <p className="text-emerald-600 leading-relaxed">
                  Menampilkan sejarah pendirian Masjid Az-Zikra di lahan 5 hektar Kampung Sunnah Bukit Sentul, biografi KH. Muhammad Arifin Ilham, 7 Sunnah Harian, tradisi Majelis Zikir Akbar, Pesantren Tahfidz, dan Muallaf Center.
                </p>
                <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1 font-bold text-emerald-800"><input type="checkbox" defaultChecked /> [x] Setuju / Standard</label>
                    <label className="flex items-center gap-1"><input type="checkbox" /> [ ] Modifikasi</label>
                    <label className="flex items-center gap-1 text-red-700"><input type="checkbox" /> [ ] Hapus</label>
                  </div>
                  <span className="text-emerald-400 italic">Coretan Catatan: ______________________</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: COMPREHENSIVE FEATURES CHECKLIST */}
            <div className="space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#064E3B] border-b border-emerald-200 pb-1.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#064E3B]" />
                2. Katalog Fitur Lengkap &amp; Lembar Evaluasi Pemesan
              </h2>

              <div className="space-y-3 font-sans text-xs">
                {[
                  {
                    title: 'A. Portal Beranda & Donasi Transparan ZISWAF',
                    desc: 'Display grafik akumulasi ZISWAF, feed mutasi kas realtime 10-detik, sertifikat transaksi digital, dan pembayaran via QRIS / Bank Transfer.'
                  },
                  {
                    title: 'B. Kalkulator Zakat Nisab Automatis',
                    desc: 'Penghitung Zakat Maal, Profesi, Emas simpanan, Tabungan, dan Pertanian berbasis harga emas nisab terkini (Rp 1.350.000/gram).'
                  },
                  {
                    title: 'C. Al-Qur\'an Digital 114 Surah + Murottal Audio Player',
                    desc: 'Teks Madinah, latin, terjemahan Indonesia, pemutar audio Murottal Sheikh Alafasy, pembacaan wajib Bismillah, dan auto-scroll highlight ayat.'
                  },
                  {
                    title: 'D. Jadwal Shalat, Adzan & Alarm Iqamah Sentul',
                    desc: 'Jadwal shalat presisi wilayah Sentul / Bogor, kompas Arah Kiblat GPS (295.2° WNW), alarm adzan, dan hitung mundur iqamah.'
                  },
                  {
                    title: 'E. Agenda Jumat & Manajemen Petugas Shalat (Admin DKM)',
                    desc: 'Manajemen jadwal Khatib, Imam, Muadzin, Bilal, topik khotbah Jumat, serta catatan kedisiplinan jamaah yang dapat diatur admin.'
                  },
                  {
                    title: 'F. Patungan Qurban & Management Shohibul Qurban',
                    desc: 'Sistem patungan sapi 1/7 saham, kambing individual, pendaftaran shohibul qurban, bukti lunas, dan laporan distribusi daging.'
                  },
                  {
                    title: 'G. Edukasi ZISWAF & Fiqih Muamalah',
                    desc: 'Modul edukasi lengkap rukun zakat, nisab, haul, adab berinfak, serta konsultasi fiqih syariah.'
                  },
                  {
                    title: 'H. Asisten AI Syariah Gemini (Az-Zikra AI Consultation)',
                    desc: 'Asisten kecerdasan buatan Gemini untuk menjawab pertanyaan zakat, waris, dan jadwal kegiatan masjid 24/7.'
                  },
                  {
                    title: 'I. Mode Display Digital Signage TV Masjid',
                    desc: 'Tampilan khusus layar TV masjid ruang shalat, running text pengumuman, jam digital besar, dan mode hitung mundur shalat.'
                  },
                  {
                    title: 'J. Portal Pengurus DKM & Akuntansi PSAK 109',
                    desc: 'Sistem kasir buku besar, jurnal keuangan, kas kecil imprest, manajemen inventaris, dan publikasi pengumuman masjid.'
                  }
                ].map((item, index) => (
                  <div key={index} className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-[#064E3B] font-serif text-xs">{item.title}</h3>
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        Siap Diuji
                      </span>
                    </div>
                    <p className="text-emerald-600 text-[11px] leading-relaxed">{item.desc}</p>
                    <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
                      <div className="flex gap-3">
                        <label className="flex items-center gap-1 font-bold text-emerald-800 cursor-pointer">
                          <input type="checkbox" defaultChecked /> [x] Disetujui
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="checkbox" /> [ ] Modifikasi
                        </label>
                        <label className="flex items-center gap-1 text-red-700 cursor-pointer">
                          <input type="checkbox" /> [ ] Hapus
                        </label>
                      </div>
                      <span className="text-emerald-400 italic">Catatan Pemesan: ___________________________</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: RESPONSIFITAS MOBILE & LAYAR TV */}
            <div className="space-y-3">
              <h2 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#064E3B] border-b border-emerald-200 pb-1.5 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#064E3B]" />
                3. Spesifikasi Presisi Tampilan Mobile (HP Android/iOS) &amp; Display TV
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                  <p className="font-bold text-[#064E3B]">📱 Mode Mobile Smartphone (HP)</p>
                  <p className="text-[11px] text-emerald-600 leading-relaxed font-sans">
                    Bottom navigation bar 5 menu, touch target minimal 44px, drawer responsive sheet, donasi kilat QRIS.
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                  <p className="font-bold text-[#064E3B]">📺 Mode Layar Signage TV Masjid</p>
                  <p className="text-[11px] text-emerald-600 leading-relaxed font-sans">
                    Layar penuh (fullscreen), running text marquee, countdown adzan &amp; iqamah, jam digital font raksasa.
                  </p>
                </div>
              </div>
            </div>

            {/* LEMBAR CORETAN DAN CATATAN BEBAS PEMESAN */}
            <div className="p-4 bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl space-y-3">
              <h3 className="font-serif font-bold text-sm text-emerald-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#064E3B]" />
                Lembar Coretan &amp; Catatan Tambahan Pemesan Aplikasi:
              </h3>
              <div className="space-y-2 font-mono text-xs text-emerald-400">
                <p className="border-b border-emerald-300 pb-2">1. ____________________________________________________________________________________</p>
                <p className="border-b border-emerald-300 pb-2">2. ____________________________________________________________________________________</p>
                <p className="border-b border-emerald-300 pb-2">3. ____________________________________________________________________________________</p>
              </div>
            </div>

            {/* Delivery Sign-off */}
            <div className="p-5 bg-[#064E3B] text-white rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-emerald-700 pb-2">
                <span className="font-mono font-bold text-xs uppercase tracking-widest text-emerald-200">
                  LEMBAR LEMBAR TANDA TANGAN &amp; PERSETUJUAN
                </span>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-amber-300">
                  AKAD DEPLOYMENT SYARIAH
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-2 font-mono text-[11px]">
                <div className="space-y-8">
                  <p className="font-bold text-white">Pihak Pengembang (Developer):</p>
                  <p className="border-t border-emerald-600 pt-1 text-emerald-200">Google AI Studio Build &amp; Engineering Team</p>
                </div>
                <div className="space-y-8 text-right">
                  <p className="font-bold text-white">Penerima Pemesan Aplikasi:</p>
                  <p className="border-t border-emerald-600 pt-1 text-emerald-200">DKM / Yayasan Masjid Az-Zikra Sentul</p>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="text-center font-mono text-[10px] text-emerald-500 pt-4 border-t border-emerald-200">
              © 2026 Masjid Az-Zikra. All Rights Reserved. &bull; Kampung Sunnah Az-Zikra, Bukit Sentul, Babakan Madang, Kabupaten Bogor
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-emerald-50 border-t border-emerald-200 flex flex-wrap justify-between items-center gap-3 shrink-0 font-mono text-xs">
          <div className="text-emerald-600 text-[11px] leading-tight">
            💡 <strong className="text-[#064E3B]">Cetak Katalog:</strong> Tekan <kbd className="bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-bold">Ctrl + P</kbd> lalu pilih <strong>"Save as PDF"</strong> untuk mengunduh versi cetak.
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            <button
              onClick={handleDownloadHtml}
              className="px-3.5 py-2 bg-white text-[#064E3B] border border-[#064E3B]/30 rounded-xl hover:bg-emerald-100 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#064E3B]" />
              <span>Unduh File HTML</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="px-3.5 py-2 bg-white text-[#064E3B] border border-[#064E3B]/30 rounded-xl hover:bg-emerald-100 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-[#064E3B]" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#064E3B] text-white rounded-xl hover:bg-[#04392b] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Unduh PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
