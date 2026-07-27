import React, { useState } from 'react';
import {
  FinancialTransaction,
  InventoryItem,
  PetugasJadwal,
  Announcement,
  Program,
  JournalEntry,
  GeneralLedgerAccount,
  PettyCashEntry,
  AppAdminSettings,
  GalleryItem,
  QurbanGroup,
  QurbanParticipant
} from '../types';
import { formatRupiahFull } from '../lib/islamicUtils';
import { generateSupabaseSQLSchema } from '../lib/store';
import {
  Plus,
  Trash2,
  Check,
  Send,
  Database,
  FileSpreadsheet,
  Package,
  Calendar,
  DollarSign,
  Megaphone,
  Copy,
  ShieldCheck,
  Sparkles,
  Settings,
  BookOpen,
  FileText,
  Wallet,
  Building,
  Eye,
  EyeOff,
  Sliders,
  CheckCircle2,
  Receipt,
  Image,
  Upload,
  Camera,
  X,
  ExternalLink,
  Video,
  Play,
  Heart
} from 'lucide-react';

import { ChartOfAccounts } from './accounting/ChartOfAccounts';
import { JurnalUmum } from './accounting/JurnalUmum';
import { BukuBesar } from './accounting/BukuBesar';
import { ReportPrinter } from './accounting/ReportPrinter';

interface PengurusDkmDashboardProps {
  financials: FinancialTransaction[];
  inventories: InventoryItem[];
  petugasList: PetugasJadwal[];
  announcements: Announcement[];
  programs: Program[];
  journalEntries?: JournalEntry[];
  glAccounts?: GeneralLedgerAccount[];
  pettyCash?: PettyCashEntry[];
  adminSettings?: AppAdminSettings;
  galleryItems?: GalleryItem[];
  qurbanGroups?: QurbanGroup[];
  onAddFinancial: (trx: Omit<FinancialTransaction, 'id'>) => void;
  onAddInventory: (item: Omit<InventoryItem, 'id'>) => void;
  onDeleteInventory: (id: string) => void;
  onUpdatePetugas: (petugas: PetugasJadwal) => void;
  onAddPetugasJadwal?: (p: Omit<PetugasJadwal, 'id'>) => void;
  onDeletePetugasJadwal?: (id: string) => void;
  onAddAnnouncement: (anc: Omit<Announcement, 'id' | 'date'>) => void;
  onAddProgram: (prog: Omit<Program, 'id' | 'collectedAmount' | 'donorsCount'>) => void;
  onDeleteProgram?: (id: string) => void;
  onAddJournalEntry?: (entry: Omit<JournalEntry, 'id'>) => void;
  onAddPettyCashEntry?: (entry: Omit<PettyCashEntry, 'id' | 'remainingBalance'>) => void;
  onUpdateAdminSettings?: (settings: Partial<AppAdminSettings>) => void;
  onAddGalleryItem?: (item: Omit<GalleryItem, 'id' | 'likesCount' | 'viewsCount'>) => void;
  onDeleteGalleryItem?: (id: string) => void;
  onAddQurbanGroup?: (group: Omit<QurbanGroup, 'id' | 'participants' | 'filledShares' | 'isCompleted'>) => void;
  onDeleteQurbanGroup?: (id: string) => void;
}

export const PengurusDkmDashboard: React.FC<PengurusDkmDashboardProps> = ({
  financials,
  inventories,
  petugasList,
  announcements,
  programs,
  journalEntries = [],
  glAccounts = [],
  pettyCash = [],
  adminSettings,
  galleryItems = [],
  qurbanGroups = [],
  onAddFinancial,
  onAddInventory,
  onDeleteInventory,
  onUpdatePetugas,
  onAddPetugasJadwal,
  onDeletePetugasJadwal,
  onAddAnnouncement,
  onAddProgram,
  onDeleteProgram,
  onAddJournalEntry,
  onAddPettyCashEntry,
  onUpdateAdminSettings,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onAddQurbanGroup,
  onDeleteQurbanGroup
}) => {
  const [dkmTab, setDkmTab] = useState<'keuangan' | 'akuntansi' | 'inventaris' | 'petugas' | 'broadcast' | 'program' | 'pengumuman' | 'galeri' | 'qurban' | 'pengaturan' | 'supabase'>('akuntansi');
  const [finSubTab, setFinSubTab] = useState<'mutasi' | 'jurnal' | 'bukubesar' | 'kaskecil' | 'psak109'>('mutasi');
  const [erpSubTab, setErpSubTab] = useState<'coa' | 'jurnal_umum' | 'buku_besar' | 'laporan'>('coa');

  // Preview Modal State for Photos
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);

  // Gallery Management Form Inputs
  const [showAddGal, setShowAddGal] = useState(false);
  const [galTitle, setGalTitle] = useState('');
  const [galSubtitle, setGalSubtitle] = useState('');
  const [galCategory, setGalCategory] = useState<'Kajian Rutin' | 'Tabligh Akbar' | 'Bakti Sosial' | 'Program Ramadhan' | 'Pendidikan & TPA' | 'Lainnya'>('Kajian Rutin');
  const [galMediaType, setGalMediaType] = useState<'photo' | 'video' | 'artikel'>('video');
  const [galMediaUrl, setGalMediaUrl] = useState('https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=800&q=80');
  const [galVideoEmbedUrl, setGalVideoEmbedUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [galUstadz, setGalUstadz] = useState('');
  const [galSummary, setGalSummary] = useState('');
  const [galArticleContent, setGalArticleContent] = useState('');
  const [galTagsStr, setGalTagsStr] = useState('Kajian, Sentul');

  const handleCreateGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle || !galArticleContent) return;
    const tags = galTagsStr.split(',').map(t => t.trim()).filter(Boolean);
    if (onAddGalleryItem) {
      onAddGalleryItem({
        title: galTitle,
        subtitle: galSubtitle,
        category: galCategory,
        mediaType: galMediaType,
        mediaUrl: galMediaUrl,
        videoEmbedUrl: galMediaType === 'video' ? galVideoEmbedUrl : undefined,
        date: new Date().toISOString().split('T')[0],
        ustadzName: galUstadz,
        summary: galSummary || galTitle,
        articleContent: galArticleContent,
        tags
      });
      setShowAddGal(false);
      setGalTitle('');
      setGalSubtitle('');
      setGalSummary('');
      setGalArticleContent('');
    }
  };

  // Form Modals / Toggles
  const [showAddTrx, setShowAddTrx] = useState(false);
  const [newTrxType, setNewTrxType] = useState<'masuk' | 'keluar'>('masuk');
  const [newTrxTitle, setNewTrxTitle] = useState('');
  const [newTrxCategory, setNewTrxCategory] = useState('Infaq');
  const [newTrxAmount, setNewTrxAmount] = useState(100000);
  const [newTrxDesc, setNewTrxDesc] = useState('');
  const [newTrxProofUrl, setNewTrxProofUrl] = useState('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80');

  // Jurnal Umum Form Inputs
  const [showAddJrn, setShowAddJrn] = useState(false);
  const [jrnVoucher, setJrnVoucher] = useState(`VCH-${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2,'0')}/0${Math.floor(Math.random()*90+10)}`);
  const [jrnAccountCode, setJrnAccountCode] = useState('1101');
  const [jrnAccountName, setJrnAccountName] = useState('Kas Utama Operasional Masjid');
  const [jrnDebit, setJrnDebit] = useState(500000);
  const [jrnCredit, setJrnCredit] = useState(0);
  const [jrnCategory, setJrnCategory] = useState<'Zakat' | 'Infaq' | 'Wakaf' | 'Amil' | 'Operasional'>('Infaq');
  const [jrnDesc, setJrnDesc] = useState('');

  // Kas Kecil Form Inputs
  const [showAddKasKecil, setShowAddKasKecil] = useState(false);
  const [kcPurpose, setKcPurpose] = useState('');
  const [kcPic, setKcPic] = useState('Pengurus DKM');
  const [kcType, setKcType] = useState<'Pencairan' | 'Pengeluaran'>('Pengeluaran');
  const [kcAmount, setKcAmount] = useState(250000);
  const [kcProof, setKcProof] = useState('Kuitansi / Nota Resmi');
  const [kcProofUrl, setKcProofUrl] = useState('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80');

  // Inventory Modal Inputs
  const [showAddInv, setShowAddInv] = useState(false);
  const [invName, setInvName] = useState('');
  const [invCategory, setInvCategory] = useState('Elektronik');
  const [invQty, setInvQty] = useState(1);
  const [invUnit, setInvUnit] = useState('Unit');
  const [invCondition, setInvCondition] = useState<'Baik' | 'Perlu Perbaikan' | 'Rusak'>('Baik');
  const [invLocation, setInvLocation] = useState('Ruang Utama');
  const [invImageUrl, setInvImageUrl] = useState('https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80');

  // Broadcast WA Input
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Program Input Modal
  const [showAddProg, setShowAddProg] = useState(false);
  const [progTitle, setProgTitle] = useState('');
  const [progSubtitle, setProgSubtitle] = useState('');
  const [progCategory, setProgCategory] = useState<'zakat' | 'infaq' | 'shadaqah' | 'wakaf'>('wakaf');
  const [progTarget, setProgTarget] = useState(1000000000);
  const [progDesc, setProgDesc] = useState('');
  const [progImageUrl, setProgImageUrl] = useState('https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=800&q=80');

  // Pengumuman Input
  const [showAddAnc, setShowAddAnc] = useState(false);
  const [ancTitle, setAncTitle] = useState('');
  const [ancContent, setAncContent] = useState('');
  const [ancCategory, setAncCategory] = useState<'Penting' | 'Kajian' | 'Kegiatan' | 'Keuangan'>('Kajian');
  const [ancAuthor, setAncAuthor] = useState('Pengurus DKM Tazkia');
  const [ancImageUrl, setAncImageUrl] = useState('https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80');

  // Admin Settings Image States
  const [logoUrlInput, setLogoUrlInput] = useState(adminSettings?.masjidLogoUrl || 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80');
  const [heroUrlInput, setHeroUrlInput] = useState(adminSettings?.masjidHeroPhotoUrl || 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80');
  const [qrisUrlInput, setQrisUrlInput] = useState(adminSettings?.qrisCodeImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');

  // Settings Saved State Notification
  const [savedSettingsMsg, setSavedSettingsMsg] = useState(false);

  // SQL Copy State
  const [copiedSql, setCopiedSql] = useState(false);

  // Helper file uploader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setUrl: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateTrx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrxTitle || newTrxAmount <= 0) return;
    onAddFinancial({
      type: newTrxType,
      title: newTrxTitle,
      category: newTrxCategory,
      amount: newTrxAmount,
      date: new Date().toISOString().split('T')[0],
      description: newTrxDesc || 'Pencatatan DKM Tazkia',
      proofUrl: newTrxProofUrl
    });
    setNewTrxTitle('');
    setShowAddTrx(false);
  };

  const handleCreateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jrnDesc || (!jrnDebit && !jrnCredit)) return;
    if (onAddJournalEntry) {
      onAddJournalEntry({
        date: new Date().toISOString().split('T')[0],
        voucherNo: jrnVoucher,
        accountCode: jrnAccountCode,
        accountName: jrnAccountName,
        debit: Number(jrnDebit),
        credit: Number(jrnCredit),
        category: jrnCategory,
        description: jrnDesc
      });
    }
    setJrnDesc('');
    setShowAddJrn(false);
  };

  const handleCreateKasKecil = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kcPurpose || kcAmount <= 0) return;
    if (onAddPettyCashEntry) {
      onAddPettyCashEntry({
        date: new Date().toISOString().split('T')[0],
        refNo: `PKC-${Math.floor(10 + Math.random()*90)}`,
        purpose: kcPurpose,
        picName: kcPic,
        type: kcType,
        amount: kcAmount,
        receiptProof: kcProof,
        proofUrl: kcProofUrl
      });
    }
    setKcPurpose('');
    setShowAddKasKecil(false);
  };

  const handleCreateInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invName) return;
    const code = `INV-${Math.floor(100 + Math.random() * 900)}`;
    onAddInventory({
      code,
      name: invName,
      category: invCategory,
      quantity: invQty,
      unit: invUnit,
      condition: invCondition,
      location: invLocation,
      lastMaintenance: new Date().toISOString().split('T')[0],
      imageUrl: invImageUrl
    });
    setInvName('');
    setShowAddInv(false);
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progTitle) return;
    onAddProgram({
      title: progTitle,
      subtitle: progSubtitle || 'Program Kebaikan DKM Tazkia',
      category: progCategory,
      targetAmount: progTarget,
      imageUrl: progImageUrl || 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&w=800&q=80',
      description: progDesc || 'Deskripsi program sosial dan ZISWAF.'
    });
    setProgTitle('');
    setShowAddProg(false);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ancTitle || !ancContent) return;
    onAddAnnouncement({
      title: ancTitle,
      content: ancContent,
      category: ancCategory,
      author: ancAuthor || 'Pengurus DKM Tazkia',
      imageUrl: ancImageUrl,
      isPinned: true
    });
    setAncTitle('');
    setAncContent('');
    setShowAddAnc(false);
  };

  const handleSaveAdminPhotos = () => {
    if (!onUpdateAdminSettings) return;
    onUpdateAdminSettings({
      masjidLogoUrl: logoUrlInput,
      masjidHeroPhotoUrl: heroUrlInput,
      qrisCodeImageUrl: qrisUrlInput
    });
    setSavedSettingsMsg(true);
    setTimeout(() => setSavedSettingsMsg(false), 2500);
  };

  const handleSendWaBroadcast = () => {
    if (!broadcastMessage) return;
    const text = encodeURIComponent(
      `ðŸ“¢ *BROADCAST RESMI Masjid Tazkia*\n` +
      `*${broadcastTitle || 'Pengumuman Jamaah'}*\n\n` +
      `${broadcastMessage}\n\n` +
      `_Pesan otomatis dikirim oleh Portal DKM Masjid Tazkia._`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(generateSupabaseSQLSchema());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleToggleSetting = (key: keyof AppAdminSettings) => {
    if (!adminSettings || !onUpdateAdminSettings) return;
    onUpdateAdminSettings({
      [key]: !adminSettings[key]
    });
    setSavedSettingsMsg(true);
    setTimeout(() => setSavedSettingsMsg(false), 2000);
  };

  const handleTextSettingChange = (key: keyof AppAdminSettings, val: any) => {
    if (!onUpdateAdminSettings) return;
    onUpdateAdminSettings({
      [key]: val
    });
    setSavedSettingsMsg(true);
    setTimeout(() => setSavedSettingsMsg(false), 2000);
  };

  return (
    <section className="py-12 bg-[#0b1329] text-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title Bar */}
        <div className="bg-gradient-to-r from-blue-950/80 via-blue-900 to-blue-950/80 border border-blue-500/30 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Portal Admin & Pengurus DKM Tazkia Sentul
                </h2>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                  Role: Pengurus / Administrator
                </span>
              </div>
              <p className="text-xs text-blue-400 mt-0.5">
                Manajemen Keuangan Akuntansi PSAK 109, Jurnal Umum, Buku Besar, Kas Kecil, & Pengaturan Visibilitas Modul
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Sub Navigation */}
        <div className="flex border-b border-blue-800 bg-blue-950 p-2 rounded-2xl gap-2 overflow-x-auto">
          {[
            { id: 'akuntansi', label: 'ERP Akuntansi', icon: BookOpen },
            { id: 'keuangan', label: 'Keuangan (Lama)', icon: DollarSign },
            { id: 'galeri', label: 'Galeri & Artikel Kajian', icon: Video },
            { id: 'qurban', label: 'Patungan Qurban', icon: Heart },
            { id: 'pengaturan', label: 'Pengaturan Admin & Foto Profil', icon: Settings },
            { id: 'inventaris', label: 'Inventaris & Foto Aset', icon: Package },
            { id: 'program', label: 'Program & Campaign', icon: Sparkles },
            { id: 'pengumuman', label: 'Pengumuman & Berita', icon: Image },
            { id: 'petugas', label: 'Jadwal Petugas & Jumat', icon: Calendar },
            { id: 'broadcast', label: 'Broadcast WhatsApp', icon: Megaphone },
            { id: 'supabase', label: 'Export Supabase SQL', icon: Database }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setDkmTab(tab.id as any)}
                className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  dkmTab === tab.id
                    ? 'bg-blue-500 text-blue-950 shadow-md shadow-blue-500/20 font-extrabold'
                    : 'text-blue-400 hover:text-blue-200 hover:bg-blue-900'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 2: GALERI & ARTIKEL KAJIAN UNLIMITED */}
        {dkmTab === 'galeri' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-900 border border-blue-800 p-5 rounded-2xl">
              <div>
                <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-300" />
                  <span>Manajemen Galeri Media & Artikel Kajian Unlimited</span>
                </h3>
                <p className="text-xs text-blue-400 mt-1">
                  Upload video YouTube kajian, foto dokumentasi kegiatan real pict, serta artikel berita & ilmu keislaman yang dipublikasikan langsung ke jamaah.
                </p>
              </div>

              <button
                onClick={() => setShowAddGal(!showAddGal)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shrink-0 border border-blue-400/30"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Media / Artikel Kajian</span>
              </button>
            </div>

            {/* Form Modal for Add Gallery/Article */}
            {showAddGal && (
              <form onSubmit={handleCreateGalleryItem} className="bg-blue-900 border-2 border-blue-500/40 p-6 rounded-2xl space-y-5 shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between border-b border-blue-800 pb-3">
                  <h4 className="font-serif font-bold text-amber-300 text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    <span>Form Publikasi Galeri Media & Artikel Baru</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAddGal(false)}
                    className="text-blue-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-blue-300 block mb-1">
                      Judul Artikel / Video / Kegiatan:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Tabligh Akbar - Fiqih Muamalah & ZISWAF..."
                      value={galTitle}
                      onChange={(e) => setGalTitle(e.target.value)}
                      required
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">
                      Sub-Judul / Label Pendukung:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Kajian Spesial Ahad..."
                      value={galSubtitle}
                      onChange={(e) => setGalSubtitle(e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">
                      Jenis Media Publikasi:
                    </label>
                    <select
                      value={galMediaType}
                      onChange={(e) => setGalMediaType(e.target.value as any)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-400 font-bold"
                    >
                      <option value="video">Video Kajian (YouTube / Video)</option>
                      <option value="photo">Foto Dokumentasi Kegiatan</option>
                      <option value="artikel">Artikel / Berita Tulis</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">
                      Kategori Kajian / Kegiatan:
                    </label>
                    <select
                      value={galCategory}
                      onChange={(e) => setGalCategory(e.target.value as any)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-400 font-bold"
                    >
                      <option value="Kajian Rutin">Kajian Rutin</option>
                      <option value="Tabligh Akbar">Tabligh Akbar</option>
                      <option value="Bakti Sosial">Bakti Sosial</option>
                      <option value="Program Ramadhan">Program Ramadhan</option>
                      <option value="Pendidikan & TPA">Pendidikan & TPA</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">
                      Nama Penceramah / Ustadz:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Dr. KH. M. Hidayatullah, M.A."
                      value={galUstadz}
                      onChange={(e) => setGalUstadz(e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Media Thumbnail & Video Embed URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-950 p-4 rounded-xl border border-blue-800">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-blue-300" />
                        <span>Foto Sampul / Poster Dokumentasi</span>
                      </label>
                      <label className="cursor-pointer bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-blue-500/30 flex items-center gap-1 transition-colors">
                        <Upload className="w-3 h-3" />
                        <span>Upload Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, setGalMediaUrl)}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={galMediaUrl}
                      onChange={(e) => setGalMediaUrl(e.target.value)}
                      className="w-full bg-blue-900 border border-blue-800 text-blue-200 text-xs rounded-xl px-3 py-2 outline-none"
                    />

                    {galMediaUrl && (
                      <img
                        src={galMediaUrl}
                        alt="Preview"
                        className="w-20 h-12 rounded-lg object-cover border border-blue-500/40"
                      />
                    )}
                  </div>

                  {galMediaType === 'video' && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-blue-300 block">
                        URL Embed Video YouTube:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: https://www.youtube.com/embed/XXXXX"
                        value={galVideoEmbedUrl}
                        onChange={(e) => setGalVideoEmbedUrl(e.target.value)}
                        className="w-full bg-blue-900 border border-blue-800 text-blue-200 text-xs rounded-xl px-3 py-2 outline-none font-mono"
                      />
                      <p className="text-[10px] text-blue-400">
                        Format URL embed YouTube disarankan: <code className="text-amber-300">https://www.youtube.com/embed/ID_VIDEO</code>
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-blue-300 block mb-1">
                    Ringkasan Singkat (Summary):
                  </label>
                  <input
                    type="text"
                    placeholder="Singkat 1-2 kalimat untuk pratinjau kartu media..."
                    value={galSummary}
                    onChange={(e) => setGalSummary(e.target.value)}
                    className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-blue-300 block mb-1">
                    Isi Artikel Lengkap Unlimited (Dapat Menampung Teks Panjang):
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tuliskan ulasan kajian, transkrip khutbah, atau laporan lengkap kegiatan. Pisahkan paragraf dengan baris baru."
                    value={galArticleContent}
                    onChange={(e) => setGalArticleContent(e.target.value)}
                    required
                    className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl p-3.5 outline-none focus:border-blue-400 leading-relaxed font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-blue-300 block mb-1">
                    Tag Kata Kunci (Dipisahkan Koma):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: KajianSentul, Fiqih, ZISWAF, Ramadhan"
                    value={galTagsStr}
                    onChange={(e) => setGalTagsStr(e.target.value)}
                    className="w-full bg-blue-950 border border-blue-800 text-blue-300 font-mono text-xs rounded-xl px-3.5 py-2 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddGal(false)}
                    className="px-5 py-2.5 rounded-xl text-xs text-blue-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-md border border-blue-400/30"
                  >
                    Terbitkan Ke Galeri Publik
                  </button>
                </div>
              </form>
            )}

            {/* List Table of Published Gallery Items */}
            <div className="bg-blue-900 border border-blue-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 bg-blue-950 border-b border-blue-800 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
                  Daftar Media & Artikel Terbit ({galleryItems.length} Item)
                </span>
                <span className="text-[11px] text-blue-400">
                  Dapat diperbarui langsung kapan saja oleh Pengurus DKM
                </span>
              </div>

              <div className="divide-y divide-blue-800">
                {galleryItems.map(item => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-blue-800/40 transition-colors">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover border border-blue-700 cursor-pointer shrink-0"
                        onClick={() => setPreviewPhotoUrl(item.mediaUrl)}
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-blue-500/20 text-blue-300 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span className="bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                            {item.mediaType}
                          </span>
                          <span className="text-[10px] text-blue-500 font-mono">
                            {item.date}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-white text-sm">
                          {item.title}
                        </h4>
                        {item.ustadzName && (
                          <p className="text-xs text-blue-300 font-mono">
                            Penceramah: {item.ustadzName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-blue-400 self-end sm:self-auto">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-blue-300" />
                        {item.viewsCount}
                      </span>
                      {onDeleteGalleryItem && (
                        <button
                          onClick={() => onDeleteGalleryItem(item.id)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer transition-colors"
                          title="Hapus Artikel / Media Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {dkmTab === 'akuntansi' && (
          <div className="space-y-6">
            <div className="flex bg-blue-900 border border-blue-800 p-1.5 rounded-2xl gap-2 overflow-x-auto text-xs font-mono">
              {[
                { id: 'coa', label: 'Bagan Akun (COA)' },
                { id: 'jurnal_umum', label: 'Jurnal Umum' },
                { id: 'buku_besar', label: 'Buku Besar' },
                { id: 'laporan', label: 'Laporan Keuangan' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setErpSubTab(sub.id as any)}
                  className={`px-4 py-2.5 rounded-xl cursor-pointer font-bold transition-all ${
                    erpSubTab === sub.id
                      ? 'bg-amber-400 text-blue-950 shadow'
                      : 'text-blue-400 hover:text-white hover:bg-blue-800'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-blue-800">
              {erpSubTab === 'coa' && <ChartOfAccounts />}
              {erpSubTab === 'jurnal_umum' && <JurnalUmum />}
              {erpSubTab === 'buku_besar' && <BukuBesar />}
              {erpSubTab === 'laporan' && <ReportPrinter />}
            </div>
          </div>
        )}

        {dkmTab === 'keuangan' && (
          <div className="space-y-6">
            {/* Financial Module Subtabs */}
            <div className="flex bg-blue-900 border border-blue-800 p-1.5 rounded-2xl gap-2 overflow-x-auto text-xs font-mono">
              {[
                { id: 'mutasi', label: 'Mutasi Kas Live', icon: FileSpreadsheet },
                { id: 'jurnal', label: 'Jurnal Umum (Voucher)', icon: BookOpen },
                { id: 'bukubesar', label: 'Buku Besar (Ledger)', icon: Building },
                { id: 'kaskecil', label: 'Kas Kecil (Petty Cash)', icon: Wallet },
                { id: 'psak109', label: 'Laporan Keuangan PSAK 109', icon: FileText }
              ].map(sub => {
                const SubIcon = sub.icon;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setFinSubTab(sub.id as any)}
                    className={`px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer font-bold transition-all ${
                      finSubTab === sub.id
                        ? 'bg-amber-400 text-blue-950 font-black shadow'
                        : 'text-blue-400 hover:text-white hover:bg-blue-800'
                    }`}
                  >
                    <SubIcon className="w-3.5 h-3.5" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>

            {/* SUBTAB 1.1: MUTASI KAS LIVE */}
            {finSubTab === 'mutasi' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white">
                      Pencatatan Pemasukan & Pengeluaran Kas Masjid
                    </h3>
                    <p className="text-xs text-blue-400">Stream transaksi penerimaan ZISWAF dan pengeluaran operasional.</p>
                  </div>

                  <button
                    onClick={() => setShowAddTrx(!showAddTrx)}
                    className="bg-blue-500 hover:bg-blue-400 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Mutasi Baru</span>
                  </button>
                </div>

                {/* Add Transaction Form Modal */}
                {showAddTrx && (
                  <form onSubmit={handleCreateTrx} className="bg-blue-900 border border-blue-500/30 p-5 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Jenis Transaksi:</label>
                        <select
                          value={newTrxType}
                          onChange={(e) => setNewTrxType(e.target.value as any)}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        >
                          <option value="masuk">Pemasukan (+)</option>
                          <option value="keluar">Pengeluaran (-)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Judul Transaksi:</label>
                        <input
                          type="text"
                          placeholder="Contoh: Infaq Kotak Jumat..."
                          value={newTrxTitle}
                          onChange={(e) => setNewTrxTitle(e.target.value)}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Nominal (Rp):</label>
                        <input
                          type="number"
                          value={newTrxAmount}
                          onChange={(e) => setNewTrxAmount(Number(e.target.value))}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs font-mono rounded-xl px-3 py-2 outline-none"
                        />
                      </div>
                    </div>

                    {/* Foto / Upload Nota Bukti Transaksi */}
                    <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-blue-400" />
                          <span>Foto Bukti Transaksi / Kuitansi Nota (Real Pict)</span>
                        </label>
                        <label className="cursor-pointer bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-blue-500/30 flex items-center gap-1 transition-colors">
                          <Upload className="w-3 h-3" />
                          <span>Upload Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, setNewTrxProofUrl)}
                          />
                        </label>
                      </div>

                      <input
                        type="text"
                        placeholder="Atau masukkan URL Foto Bukti Nota..."
                        value={newTrxProofUrl}
                        onChange={(e) => setNewTrxProofUrl(e.target.value)}
                        className="w-full bg-blue-900 border border-blue-800 text-blue-300 text-xs rounded-xl px-3 py-2 outline-none"
                      />

                      {newTrxProofUrl && (
                        <div className="flex items-center gap-3 pt-1">
                          <img
                            src={newTrxProofUrl}
                            alt="Preview Nota"
                            className="w-12 h-12 rounded-lg object-cover border border-blue-500/40 cursor-pointer"
                            onClick={() => setPreviewPhotoUrl(newTrxProofUrl)}
                          />
                          <span className="text-[10px] text-blue-400 font-mono">Pratinjau Foto Real Pict Nota</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddTrx(false)}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-blue-400 hover:text-white"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-blue-950 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
                      >
                        Simpan Transaksi
                      </button>
                    </div>
                  </form>
                )}

                {/* Financial Stream Table */}
                <div className="bg-blue-900 border border-blue-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-blue-300">
                    <thead className="bg-blue-950 text-blue-400 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Tanggal</th>
                        <th className="p-4">Jenis</th>
                        <th className="p-4">Uraian Transaksi</th>
                        <th className="p-4">Bukti Real Pict</th>
                        <th className="p-4 text-right">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-800">
                      {financials.map(f => (
                        <tr key={f.id} className="hover:bg-blue-800/40">
                          <td className="p-4 font-mono text-blue-500">{f.id}</td>
                          <td className="p-4 font-mono text-blue-400">{f.date}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              f.type === 'masuk' ? 'bg-blue-500/20 text-blue-400' : 'bg-rose-500/20 text-rose-300'
                            }`}>
                              {f.type}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-white">{f.title}</td>
                          <td className="p-4">
                            {f.proofUrl ? (
                              <button
                                onClick={() => setPreviewPhotoUrl(f.proofUrl!)}
                                className="flex items-center gap-1.5 bg-blue-950 border border-blue-800 hover:border-blue-500/50 px-2 py-1 rounded-lg text-[10px] font-mono text-blue-300 transition-all cursor-pointer"
                              >
                                <img src={f.proofUrl} alt="Bukti" className="w-6 h-6 rounded object-cover" />
                                <span>Lihat Nota</span>
                              </button>
                            ) : (
                              <span className="text-[10px] text-blue-600 font-mono">-</span>
                            )}
                          </td>
                          <td className={`p-4 text-right font-mono font-bold ${f.type === 'masuk' ? 'text-blue-400' : 'text-rose-400'}`}>
                            {formatRupiahFull(f.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUBTAB 1.2: JURNAL UMUM */}
            {finSubTab === 'jurnal' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                      Jurnal Umum Akuntansi (Double-Entry General Journal)
                    </h3>
                    <p className="text-xs text-blue-400">
                      Pencatatan voucher debet dan kredit berpasangan sesuai standar pencatatan ZISWAF.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddJrn(!showAddJrn)}
                    className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Input Voucher Jurnal</span>
                  </button>
                </div>

                {/* Add Journal Voucher Form */}
                {showAddJrn && (
                  <form onSubmit={handleCreateJournal} className="bg-blue-900 border border-amber-500/30 p-5 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">No. Voucher:</label>
                        <input
                          type="text"
                          value={jrnVoucher}
                          onChange={(e) => setJrnVoucher(e.target.value)}
                          className="w-full bg-blue-950 border border-blue-800 text-amber-300 font-mono text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Kode Akun / Nama Akun:</label>
                        <select
                          value={jrnAccountCode}
                          onChange={(e) => {
                            setJrnAccountCode(e.target.value);
                            const names: Record<string, string> = {
                              '1101': 'Kas Utama Operasional Masjid',
                              '1102': 'Bank BSI - Zakat Fitrah & Maal',
                              '1103': 'Kas Kecil Operasional Harian',
                              '2101': 'Kewajiban Penyaluran Mustahik',
                              '4101': 'Penerimaan Infaq & Shadaqah',
                              '5101': 'Beban Operasional & Pemeliharaan'
                            };
                            setJrnAccountName(names[e.target.value] || 'Akun ZISWAF');
                          }}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        >
                          <option value="1101">1101 - Kas Utama Operasional Masjid</option>
                          <option value="1102">1102 - Bank BSI - Zakat Fitrah & Maal</option>
                          <option value="1103">1103 - Kas Kecil Operasional Harian</option>
                          <option value="2101">2101 - Kewajiban Penyaluran Mustahik</option>
                          <option value="4101">4101 - Penerimaan Infaq & Shadaqah</option>
                          <option value="5101">5101 - Beban Operasional & Pemeliharaan</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Kategori Dana:</label>
                        <select
                          value={jrnCategory}
                          onChange={(e) => setJrnCategory(e.target.value as any)}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        >
                          <option value="Infaq">Infaq</option>
                          <option value="Zakat">Zakat</option>
                          <option value="Wakaf">Wakaf</option>
                          <option value="Amil">Amil</option>
                          <option value="Operasional">Operasional</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Debet (Rp):</label>
                        <input
                          type="number"
                          value={jrnDebit}
                          onChange={(e) => setJrnDebit(Number(e.target.value))}
                          className="w-full bg-blue-950 border border-blue-800 text-blue-400 font-mono text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Kredit (Rp):</label>
                        <input
                          type="number"
                          value={jrnCredit}
                          onChange={(e) => setJrnCredit(Number(e.target.value))}
                          className="w-full bg-blue-950 border border-blue-800 text-rose-400 font-mono text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Keterangan / Deskripsi Transaksi:</label>
                        <input
                          type="text"
                          placeholder="Tuliskan keterangan lengkap pencatatan jurnal..."
                          value={jrnDesc}
                          onChange={(e) => setJrnDesc(e.target.value)}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddJrn(false)}
                        className="px-4 py-2 rounded-xl text-xs text-blue-400 hover:text-white"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="bg-amber-400 text-blue-950 font-bold px-5 py-2 rounded-xl text-xs"
                      >
                        Simpan Voucher Jurnal
                      </button>
                    </div>
                  </form>
                )}

                {/* Journal Entries Table */}
                <div className="bg-blue-900 border border-blue-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-blue-300">
                    <thead className="bg-blue-950 text-blue-400 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-3">Tanggal</th>
                        <th className="p-3">No. Voucher</th>
                        <th className="p-3">Kode Akun</th>
                        <th className="p-3">Nama Akun & Keterangan</th>
                        <th className="p-3 text-right">Debet (Rp)</th>
                        <th className="p-3 text-right">Kredit (Rp)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-800 font-mono">
                      {journalEntries.map(j => (
                        <tr key={j.id} className="hover:bg-blue-800/40">
                          <td className="p-3 text-blue-400">{j.date}</td>
                          <td className="p-3 text-amber-300 font-bold">{j.voucherNo}</td>
                          <td className="p-3 text-blue-400 font-bold">{j.accountCode}</td>
                          <td className="p-3">
                            <span className="font-sans font-bold text-white block">{j.accountName}</span>
                            <span className="font-sans text-[11px] text-blue-400 block">{j.description}</span>
                          </td>
                          <td className="p-3 text-right text-blue-400 font-bold">
                            {j.debit > 0 ? formatRupiahFull(j.debit) : '-'}
                          </td>
                          <td className="p-3 text-right text-rose-400 font-bold">
                            {j.credit > 0 ? formatRupiahFull(j.credit) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUBTAB 1.3: BUKU BESAR */}
            {finSubTab === 'bukubesar' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-400" />
                      Buku Besar & Daftar Akun (Chart of Accounts / COA)
                    </h3>
                    <p className="text-xs text-blue-400">
                      Saldo kumulatif debet, kredit, dan saldo akhir setiap akun Aset, Kewajiban, dan Dana ZISWAF.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {glAccounts.map(acc => (
                    <div key={acc.code} className="bg-blue-900 border border-blue-800 rounded-2xl p-4 space-y-3 shadow-lg">
                      <div className="flex justify-between items-start border-b border-blue-800 pb-2">
                        <div>
                          <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded">
                            {acc.code}
                          </span>
                          <h4 className="font-serif font-bold text-white text-sm mt-1">{acc.name}</h4>
                        </div>
                        <span className="text-[10px] bg-blue-800 text-blue-300 font-mono px-2 py-0.5 rounded">
                          {acc.category}
                        </span>
                      </div>

                      <div className="space-y-1.5 font-mono text-xs">
                        <div className="flex justify-between text-blue-400">
                          <span>Saldo Awal:</span>
                          <span>{formatRupiahFull(acc.initialBalance)}</span>
                        </div>
                        <div className="flex justify-between text-blue-400">
                          <span>Total Debet (+):</span>
                          <span>{formatRupiahFull(acc.totalDebit)}</span>
                        </div>
                        <div className="flex justify-between text-rose-400">
                          <span>Total Kredit (-):</span>
                          <span>{formatRupiahFull(acc.totalCredit)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-amber-300 pt-2 border-t border-blue-800 text-sm">
                          <span>Saldo Akhir:</span>
                          <span>{formatRupiahFull(acc.endingBalance)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBTAB 1.4: KAS KECIL */}
            {finSubTab === 'kaskecil' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-amber-400" />
                      Sistem Kas Kecil Operasional (Petty Cash Imprest System)
                    </h3>
                    <p className="text-xs text-blue-400">
                      Dana tunai siap pakai untuk operasional harian, konsumsi pengajian, dan marbot masjid.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddKasKecil(!showAddKasKecil)}
                    className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Pengajuan Kas Kecil</span>
                  </button>
                </div>

                {/* Petty Cash Overview Balance Box */}
                <div className="bg-gradient-to-r from-amber-950/60 to-blue-900 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold block">
                      SALDO KAS KECIL SAAT INI (IMPREST LIMIT: RP 10.000.000)
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-white mt-1">
                      {formatRupiahFull(pettyCash.length > 0 ? pettyCash[0].remainingBalance : 5550000)}
                    </h2>
                  </div>

                  <div className="flex gap-2 text-xs font-mono">
                    <div className="bg-blue-950/80 px-3 py-2 rounded-xl border border-blue-800">
                      <span className="text-blue-400 block text-[9px]">Status Plafond</span>
                      <span className="text-blue-400 font-bold">Aman (â‰¥50%)</span>
                    </div>
                    <div className="bg-blue-950/80 px-3 py-2 rounded-xl border border-blue-800">
                      <span className="text-blue-400 block text-[9px]">Pengeluaran Bulan Ini</span>
                      <span className="text-rose-300 font-bold">Rp 1.450.000</span>
                    </div>
                  </div>
                </div>

                {/* Form Add Petty Cash */}
                {showAddKasKecil && (
                  <form onSubmit={handleCreateKasKecil} className="bg-blue-900 border border-amber-500/30 p-5 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Jenis Transaksi Kas Kecil:</label>
                        <select
                          value={kcType}
                          onChange={(e) => setKcType(e.target.value as any)}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        >
                          <option value="Pengeluaran">Pengeluaran Biaya (-)</option>
                          <option value="Pencairan">Pencairan Top-Up Bank (+)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Keperluan / Keterangan:</label>
                        <input
                          type="text"
                          placeholder="Contoh: Pembelian Sabun Pembersih & Snack..."
                          value={kcPurpose}
                          onChange={(e) => setKcPurpose(e.target.value)}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Penanggung Jawab (PIC):</label>
                        <input
                          type="text"
                          value={kcPic}
                          onChange={(e) => setKcPic(e.target.value)}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Nominal (Rp):</label>
                        <input
                          type="number"
                          value={kcAmount}
                          onChange={(e) => setKcAmount(Number(e.target.value))}
                          className="w-full bg-blue-950 border border-blue-800 text-amber-300 font-mono text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-blue-300 block mb-1">Bukti Kuitansi (Keterangan):</label>
                        <input
                          type="text"
                          value={kcProof}
                          onChange={(e) => setKcProof(e.target.value)}
                          className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                        />
                      </div>
                    </div>

                    {/* Photo Proof Upload for Kas Kecil */}
                    <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-amber-400" />
                          <span>Foto Kuitansi Kas Kecil (Real Pict Nota)</span>
                        </label>
                        <label className="cursor-pointer bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1 transition-colors">
                          <Upload className="w-3 h-3" />
                          <span>Upload Nota</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, setKcProofUrl)}
                          />
                        </label>
                      </div>

                      <input
                        type="text"
                        placeholder="Atau masukan URL Foto Kuitansi..."
                        value={kcProofUrl}
                        onChange={(e) => setKcProofUrl(e.target.value)}
                        className="w-full bg-blue-900 border border-blue-800 text-blue-300 text-xs rounded-xl px-3 py-2 outline-none"
                      />

                      {kcProofUrl && (
                        <div className="flex items-center gap-3 pt-1">
                          <img
                            src={kcProofUrl}
                            alt="Preview Kuitansi"
                            className="w-12 h-12 rounded-lg object-cover border border-amber-500/40 cursor-pointer"
                            onClick={() => setPreviewPhotoUrl(kcProofUrl)}
                          />
                          <span className="text-[10px] text-blue-400 font-mono">Pratinjau Foto Kuitansi Kas Kecil</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddKasKecil(false)}
                        className="px-4 py-2 rounded-xl text-xs text-blue-400 hover:text-white"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="bg-amber-400 text-blue-950 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
                      >
                        Simpan Klaim Kas Kecil
                      </button>
                    </div>
                  </form>
                )}

                {/* Petty Cash Table */}
                <div className="bg-blue-900 border border-blue-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-blue-300">
                    <thead className="bg-blue-950 text-blue-400 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-3">Ref No</th>
                        <th className="p-3">Tanggal</th>
                        <th className="p-3">Keperluan</th>
                        <th className="p-3">PIC / Penerima</th>
                        <th className="p-3">Foto Nota Real Pict</th>
                        <th className="p-3">Jenis</th>
                        <th className="p-3 text-right">Nominal</th>
                        <th className="p-3 text-right">Sisa Saldo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-800 font-mono">
                      {pettyCash.map(k => (
                        <tr key={k.id} className="hover:bg-blue-800/40">
                          <td className="p-3 text-amber-300 font-bold">{k.refNo}</td>
                          <td className="p-3 text-blue-400">{k.date}</td>
                          <td className="p-3 font-sans font-bold text-white">{k.purpose}</td>
                          <td className="p-3 font-sans text-blue-300">{k.picName}</td>
                          <td className="p-3 font-sans">
                            {k.proofUrl ? (
                              <button
                                onClick={() => setPreviewPhotoUrl(k.proofUrl!)}
                                className="flex items-center gap-1.5 bg-blue-950 border border-blue-800 hover:border-amber-500/50 px-2 py-1 rounded-lg text-[10px] font-mono text-amber-300 transition-all cursor-pointer"
                              >
                                <img src={k.proofUrl} alt="Nota" className="w-6 h-6 rounded object-cover" />
                                <span>Lihat Real Pict</span>
                              </button>
                            ) : (
                              <span className="text-[10px] text-blue-600 font-mono">-</span>
                            )}
                          </td>
                          <td className="p-3 font-sans">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              k.type === 'Pencairan' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              {k.type}
                            </span>
                          </td>
                          <td className="p-3 text-right font-bold text-white">
                            {formatRupiahFull(k.amount)}
                          </td>
                          <td className="p-3 text-right font-bold text-blue-400">
                            {formatRupiahFull(k.remainingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUBTAB 1.5: LAPORAN PSAK 109 */}
            {finSubTab === 'psak109' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-blue-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-400" />
                      Laporan Keuangan Standar Akuntansi Syariah PSAK 109
                    </h3>
                    <p className="text-xs text-blue-400">
                      Format standar Ikatan Akuntan Indonesia (IAI) untuk Amil Zakat, Infaq, Shadaqah, & Wakaf.
                    </p>
                  </div>
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono text-[10px] font-bold px-3 py-1 rounded-full">
                    AUDITED SYARIAH READY
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                  {/* Laporan Perubahan Dana Zakat */}
                  <div className="bg-blue-900 border border-blue-800 p-4 rounded-2xl space-y-3">
                    <h4 className="font-serif font-bold text-amber-300 text-sm flex items-center gap-1.5 border-b border-blue-800 pb-2">
                      <span>1. Laporan Perubahan Dana Zakat</span>
                    </h4>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-blue-300">
                        <span>Penerimaan Zakat Muzakki:</span>
                        <span className="text-blue-400 font-bold">Rp 3.850.000.000</span>
                      </div>
                      <div className="flex justify-between text-blue-300">
                        <span>Penyaluran Mustahik Fakir Miskin:</span>
                        <span className="text-rose-400 font-bold">(Rp 2.950.000.000)</span>
                      </div>
                      <div className="flex justify-between text-blue-300">
                        <span>Hak Amil Zakat (12.5%):</span>
                        <span className="text-rose-400 font-bold">(Rp 481.250.000)</span>
                      </div>
                      <div className="flex justify-between font-bold text-white pt-2 border-t border-blue-800">
                        <span>Saldo Dana Zakat Akhir:</span>
                        <span className="text-amber-300">Rp 418.750.000</span>
                      </div>
                    </div>
                  </div>

                  {/* Laporan Perubahan Dana Infaq / Sedekah */}
                  <div className="bg-blue-900 border border-blue-800 p-4 rounded-2xl space-y-3">
                    <h4 className="font-serif font-bold text-blue-300 text-sm flex items-center gap-1.5 border-b border-blue-800 pb-2">
                      <span>2. Laporan Perubahan Dana Infaq & Sedekah</span>
                    </h4>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-blue-300">
                        <span>Penerimaan Infaq Terikat & Bebas:</span>
                        <span className="text-blue-400 font-bold">Rp 12.450.000.000</span>
                      </div>
                      <div className="flex justify-between text-blue-300">
                        <span>Beban Program Sosial & Syiar:</span>
                        <span className="text-rose-400 font-bold">(Rp 8.200.000.000)</span>
                      </div>
                      <div className="flex justify-between text-blue-300">
                        <span>Beban Pemeliharaan & Energi:</span>
                        <span className="text-rose-400 font-bold">(Rp 1.150.000.000)</span>
                      </div>
                      <div className="flex justify-between font-bold text-white pt-2 border-t border-blue-800">
                        <span>Saldo Dana Infaq Akhir:</span>
                        <span className="text-blue-300">Rp 3.100.000.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PENGATURAN ADMIN & VISIBILITAS MODUL */}
        {dkmTab === 'pengaturan' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-blue-800 pb-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-blue-400" />
                  Pengaturan Modul & Kontrol Visibilitas Admin DKM
                </h3>
                <p className="text-xs text-blue-400">
                  Aktifkan atau sembunyikan modul aplikasi, atur parameter nisab zakat, running text TV signage, serta rekening bank.
                </p>
              </div>

              {savedSettingsMsg && (
                <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-500/40 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Pengaturan Tersimpan Otomatis!</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Sakelar Visibilitas Modul Aplikasi */}
              <div className="bg-blue-900 border border-blue-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-serif font-bold text-white text-sm flex items-center gap-2 border-b border-blue-800 pb-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>1. Visibilitas Modul Antarmuka Jamaah</span>
                </h4>

                <div className="space-y-3 text-xs">
                  {[
                    { key: 'showAiAssistant', label: 'Modul Tazkia AI Syariah Assistant (Gemini 2.5)', desc: 'Menampilkan tombol asisten konsultasi fiqih AI di navigasi.' },
                    { key: 'showTvSignageOption', label: 'Modul Mode Display TV Signage Masjid', desc: 'Menampilkan opsi layar penuh jadwal jam shalat TV masjid.' },
                    { key: 'showQuranModule', label: 'Modul Digital Ibadah (Al-Qur\'an, Shalat, Doa)', desc: 'Menyediakan fitur membaca surah mp3 & jadwal shalat.' },
                    { key: 'showLiveMutations', label: 'Stream Live Mutasi Kas Transparansi', desc: 'Menampilkan tabel live pencatatan keuangan ke publik.' },
                    { key: 'showTargetDonationBar', label: 'Bar Progress Target Donasi Program', desc: 'Menampilkan persentase pencapaian donasi di hero banner.' },
                    { key: 'allowAnonymousDonation', label: 'Izinkan Opsi Donasi Anonim ("Hamba Allah")', desc: 'Memungkinkan donatur menyembunyikan identitas nama.' }
                  ].map(item => {
                    const isChecked = adminSettings ? (adminSettings[item.key as keyof AppAdminSettings] as boolean) : true;
                    return (
                      <div key={item.key} className="flex items-center justify-between bg-blue-950 p-3 rounded-xl border border-blue-800">
                        <div>
                          <p className="font-bold text-white">{item.label}</p>
                          <p className="text-[10px] text-blue-400">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => handleToggleSetting(item.key as any)}
                          className={`px-3 py-1 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-all ${
                            isChecked ? 'bg-blue-500 text-blue-950' : 'bg-blue-800 text-blue-400'
                          }`}
                        >
                          {isChecked ? 'TAMPIL' : 'SEMBUNYI'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Box 2: Parameter Finansial & Signage TV */}
              <div className="bg-blue-900 border border-blue-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-serif font-bold text-white text-sm flex items-center gap-2 border-b border-blue-800 pb-2">
                  <Receipt className="w-4 h-4 text-amber-400" />
                  <span>2. Parameter Bank, QRIS, & Display TV</span>
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-blue-300 font-semibold block mb-1">
                      Pesan Running Text Display TV Signage Masjid:
                    </label>
                    <textarea
                      rows={3}
                      value={adminSettings?.runningTextTv || ''}
                      onChange={(e) => handleTextSettingChange('runningTextTv', e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 rounded-xl p-2.5 text-amber-300 font-sans text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-blue-300 font-semibold block mb-1">
                        Harga Acuan Emas/Gram (Nisab Zakat):
                      </label>
                      <input
                        type="number"
                        value={adminSettings?.goldNisabPrice || 1350000}
                        onChange={(e) => handleTextSettingChange('goldNisabPrice', Number(e.target.value))}
                        className="w-full bg-blue-950 border border-blue-800 rounded-xl p-2 font-mono text-blue-400 text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-blue-300 font-semibold block mb-1">
                        Countdown Timer Iqamah (Menit):
                      </label>
                      <input
                        type="number"
                        value={adminSettings?.iqamahCountdownMinutes || 10}
                        onChange={(e) => handleTextSettingChange('iqamahCountdownMinutes', Number(e.target.value))}
                        className="w-full bg-blue-950 border border-blue-800 rounded-xl p-2 font-mono text-amber-300 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-blue-300 font-semibold block mb-1">
                      Nomor Rekening BSI (ZISWAF):
                    </label>
                    <input
                      type="text"
                      value={adminSettings?.bankAccountBsi || ''}
                      onChange={(e) => handleTextSettingChange('bankAccountBsi', e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 rounded-xl p-2 text-white font-mono text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-blue-300 font-semibold block mb-1">
                      Nomor Rekening BSI (Wakaf):
                    </label>
                    <input
                      type="text"
                      value={adminSettings?.bankAccountBca || ''}
                      onChange={(e) => handleTextSettingChange('bankAccountBca', e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 rounded-xl p-2 text-white font-mono text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-blue-300 font-semibold block mb-1">
                      Nama Merchant QRIS Masjid:
                    </label>
                    <input
                      type="text"
                      value={adminSettings?.qrisMerchantName || ''}
                      onChange={(e) => handleTextSettingChange('qrisMerchantName', e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 rounded-xl p-2 text-blue-300 font-mono text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Pengaturan Foto Profil, Hero Banner, & Gambar QRIS Masjid */}
            <div className="bg-blue-900 border border-blue-500/30 rounded-2xl p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-blue-800 pb-3">
                <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-400" />
                  <span>3. Foto Profil, Banner Utama, & Barcode QRIS Masjid (Database Media)</span>
                </h4>
                <button
                  onClick={handleSaveAdminPhotos}
                  className="bg-blue-500 hover:bg-blue-400 text-blue-950 font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Semua Foto Database</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Logo Masjid */}
                <div className="bg-blue-950 p-4 rounded-xl border border-blue-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Image className="w-4 h-4 text-blue-400" />
                      Logo ResmÑ– Masjid
                    </span>
                    <label className="cursor-pointer bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 text-[10px] font-bold px-2 py-1 rounded-md border border-blue-500/30 flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setLogoUrlInput)}
                      />
                    </label>
                  </div>

                  <div className="h-32 bg-blue-900 rounded-lg overflow-hidden border border-blue-800 flex items-center justify-center relative group">
                    <img
                      src={logoUrlInput}
                      alt="Logo Masjid"
                      className="h-full w-full object-contain p-2 cursor-pointer"
                      onClick={() => setPreviewPhotoUrl(logoUrlInput)}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-blue-400 block mb-1">URL Foto Logo:</label>
                    <input
                      type="text"
                      value={logoUrlInput}
                      onChange={(e) => setLogoUrlInput(e.target.value)}
                      className="w-full bg-blue-900 border border-blue-800 text-xs text-blue-200 rounded-lg p-2 font-mono outline-none"
                    />
                  </div>
                </div>

                {/* 2. Hero Banner Foto Masjid */}
                <div className="bg-blue-950 p-4 rounded-xl border border-blue-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-blue-400" />
                      Foto Banner Hero Masjid
                    </span>
                    <label className="cursor-pointer bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 text-[10px] font-bold px-2 py-1 rounded-md border border-blue-500/30 flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setHeroUrlInput)}
                      />
                    </label>
                  </div>

                  <div className="h-32 bg-blue-900 rounded-lg overflow-hidden border border-blue-800 flex items-center justify-center relative group">
                    <img
                      src={heroUrlInput}
                      alt="Hero Masjid"
                      className="h-full w-full object-cover cursor-pointer"
                      onClick={() => setPreviewPhotoUrl(heroUrlInput)}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-blue-400 block mb-1">URL Foto Landscape Masjid:</label>
                    <input
                      type="text"
                      value={heroUrlInput}
                      onChange={(e) => setHeroUrlInput(e.target.value)}
                      className="w-full bg-blue-900 border border-blue-800 text-xs text-blue-200 rounded-lg p-2 font-mono outline-none"
                    />
                  </div>
                </div>

                {/* 3. Barcode QRIS Code Image */}
                <div className="bg-blue-950 p-4 rounded-xl border border-blue-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Receipt className="w-4 h-4 text-blue-400" />
                      Gambar Barcode QRIS Resmi
                    </span>
                    <label className="cursor-pointer bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 text-[10px] font-bold px-2 py-1 rounded-md border border-blue-500/30 flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setQrisUrlInput)}
                      />
                    </label>
                  </div>

                  <div className="h-32 bg-blue-900 rounded-lg overflow-hidden border border-blue-800 flex items-center justify-center relative group">
                    <img
                      src={qrisUrlInput}
                      alt="QRIS Barcode"
                      className="h-full w-full object-contain p-2 cursor-pointer"
                      onClick={() => setPreviewPhotoUrl(qrisUrlInput)}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-blue-400 block mb-1">URL Barcode QRIS:</label>
                    <input
                      type="text"
                      value={qrisUrlInput}
                      onChange={(e) => setQrisUrlInput(e.target.value)}
                      className="w-full bg-blue-900 border border-blue-800 text-xs text-blue-200 rounded-lg p-2 font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Box 4: Pengaturan Khutbah Jumat & Informasi Fitur Aplikasi */}
            <div className="bg-blue-900 border border-amber-500/30 rounded-2xl p-5 space-y-4">
              <h4 className="font-serif font-bold text-white text-base flex items-center gap-2 border-b border-blue-800 pb-3">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>4. Pengaturan Informasi Khutbah Jumat & Fitur Aplikasi</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section Khutbah Jumat */}
                <div className="bg-blue-950 p-4 rounded-xl border border-blue-800 space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase font-mono block border-b border-blue-800 pb-2">
                    ðŸ“‹ Parameter Petugas & Khutbah Jumat
                  </span>

                  <div>
                    <label className="text-xs text-blue-300 font-semibold block mb-1">
                      Topik / Tema Khutbah Jumat:
                    </label>
                    <input
                      type="text"
                      value={adminSettings?.jumatTopicTitle || ''}
                      onChange={(e) => handleTextSettingChange('jumatTopicTitle', e.target.value)}
                      placeholder="Contoh: Memperkokoh Ukhuwah & Transparansi..."
                      className="w-full bg-blue-900 border border-blue-800 rounded-xl p-2.5 text-amber-300 font-serif text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-blue-300 font-semibold block mb-1">
                        Nama Khatib Jumat:
                      </label>
                      <input
                        type="text"
                        value={adminSettings?.jumatKhatibName || ''}
                        onChange={(e) => handleTextSettingChange('jumatKhatibName', e.target.value)}
                        placeholder="Ustadz / Prof..."
                        className="w-full bg-blue-900 border border-blue-800 rounded-xl p-2 text-white text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-blue-300 font-semibold block mb-1">
                        Nama Imam Jumat:
                      </label>
                      <input
                        type="text"
                        value={adminSettings?.jumatImamName || ''}
                        onChange={(e) => handleTextSettingChange('jumatImamName', e.target.value)}
                        placeholder="Ustadz..."
                        className="w-full bg-blue-900 border border-blue-800 rounded-xl p-2 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-blue-300 font-semibold block mb-1">
                        Nama Muadzin Jumat:
                      </label>
                      <input
                        type="text"
                        value={adminSettings?.jumatMuadzinName || ''}
                        onChange={(e) => handleTextSettingChange('jumatMuadzinName', e.target.value)}
                        placeholder="Ustadz..."
                        className="w-full bg-blue-900 border border-blue-800 rounded-xl p-2 text-white text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-blue-300 font-semibold block mb-1">
                        Waktu Pelaksanaan:
                      </label>
                      <input
                        type="text"
                        value={adminSettings?.jumatTimeInfo || ''}
                        onChange={(e) => handleTextSettingChange('jumatTimeInfo', e.target.value)}
                        placeholder="Jumat Ini, 11:55 WIB"
                        className="w-full bg-blue-900 border border-blue-800 rounded-xl p-2 text-amber-300 font-mono text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Fitur & Kontak Masjid */}
                <div className="bg-blue-950 p-4 rounded-xl border border-blue-800 space-y-3">
                  <span className="text-xs font-bold text-blue-400 uppercase font-mono block border-b border-blue-800 pb-2">
                    ðŸ•Œ Info Fitur Aplikasi & Kontak DKM
                  </span>

                  <div>
                    <label className="text-xs text-blue-300 font-semibold block mb-1">
                      Deskripsi Ringkas Fitur Aplikasi:
                    </label>
                    <textarea
                      rows={2}
                      value={adminSettings?.featureInfoAnnouncement || ''}
                      onChange={(e) => handleTextSettingChange('featureInfoAnnouncement', e.target.value)}
                      placeholder="Informasi fitur aplikasi untuk publik..."
                      className="w-full bg-blue-900 border border-blue-800 rounded-xl p-2 text-blue-200 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-blue-300 font-semibold block mb-1">
                      Alamat Lengkap Masjid:
                    </label>
                    <input
                      type="text"
                      value={adminSettings?.masjidAddressInfo || ''}
                      onChange={(e) => handleTextSettingChange('masjidAddressInfo', e.target.value)}
                      placeholder="Jl. Ir. H. Juanda No. 78, Sentul City..."
                      className="w-full bg-blue-900 border border-blue-800 rounded-xl p-2 text-white text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-blue-300 font-semibold block mb-1">
                      No. Kontak WhatsApp Sekertariat DKM:
                    </label>
                    <input
                      type="text"
                      value={adminSettings?.masjidPhoneContact || ''}
                      onChange={(e) => handleTextSettingChange('masjidPhoneContact', e.target.value)}
                      placeholder="+62 812-9876-5432"
                      className="w-full bg-blue-900 border border-blue-800 rounded-xl p-2 text-blue-400 font-mono text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INVENTARIS MASJID */}
        {dkmTab === 'inventaris' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-white">
                Manajemen Aset & Inventaris Masjid
              </h3>

              <button
                onClick={() => setShowAddInv(!showAddInv)}
                className="bg-blue-500 hover:bg-blue-400 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Barang Inventaris</span>
              </button>
            </div>

            {/* Add Inventory Form */}
            {showAddInv && (
              <form onSubmit={handleCreateInventory} className="bg-blue-900 border border-blue-500/30 p-5 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Nama Barang:</label>
                    <input
                      type="text"
                      placeholder="Contoh: Wireless Mic Shure..."
                      value={invName}
                      onChange={(e) => setInvName(e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Kategori:</label>
                    <input
                      type="text"
                      value={invCategory}
                      onChange={(e) => setInvCategory(e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Jumlah & Satuan:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={invQty}
                        onChange={(e) => setInvQty(Number(e.target.value))}
                        className="w-20 bg-blue-950 border border-blue-800 text-white text-xs font-mono rounded-xl px-3 py-2 outline-none"
                      />
                      <input
                        type="text"
                        value={invUnit}
                        onChange={(e) => setInvUnit(e.target.value)}
                        className="flex-1 bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Upload & Real Pict Presets for Inventory */}
                <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <span>Foto Barang Real Pict Aset Inventaris</span>
                    </label>
                    <label className="cursor-pointer bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-blue-500/30 flex items-center gap-1 transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setInvImageUrl)}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="URL Foto Aset Inventaris..."
                    value={invImageUrl}
                    onChange={(e) => setInvImageUrl(e.target.value)}
                    className="w-full bg-blue-900 border border-blue-800 text-blue-300 text-xs rounded-xl px-3 py-2 outline-none"
                  />

                  {invImageUrl && (
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={invImageUrl}
                        alt="Preview Barang"
                        className="w-12 h-12 rounded-lg object-cover border border-blue-500/40 cursor-pointer"
                        onClick={() => setPreviewPhotoUrl(invImageUrl)}
                      />
                      <span className="text-[10px] text-blue-400 font-mono">Pratinjau Foto Aset Barang</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddInv(false)}
                    className="px-4 py-2 rounded-xl text-xs text-blue-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-blue-950 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
                  >
                    Simpan Barang
                  </button>
                </div>
              </form>
            )}

            <div className="bg-blue-900 border border-blue-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs text-blue-300">
                <thead className="bg-blue-950 text-blue-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-4">Foto Aset</th>
                    <th className="p-4">Kode Aset</th>
                    <th className="p-4">Nama Barang</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Jumlah</th>
                    <th className="p-4">Kondisi</th>
                    <th className="p-4">Lokasi</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-800">
                  {inventories.map(inv => (
                    <tr key={inv.id} className="hover:bg-blue-800/40">
                      <td className="p-4">
                        {inv.imageUrl ? (
                          <img
                            src={inv.imageUrl}
                            alt={inv.name}
                            className="w-10 h-10 rounded-lg object-cover border border-blue-700 cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => setPreviewPhotoUrl(inv.imageUrl!)}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-blue-800 flex items-center justify-center text-blue-500 text-[10px]">
                            No Foto
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-mono text-blue-400 font-bold">{inv.code}</td>
                      <td className="p-4 font-bold text-white">{inv.name}</td>
                      <td className="p-4 text-blue-400">{inv.category}</td>
                      <td className="p-4 font-mono font-bold text-blue-200">
                        {inv.quantity} {inv.unit}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inv.condition === 'Baik' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {inv.condition}
                        </span>
                      </td>
                      <td className="p-4 text-blue-400">{inv.location}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => onDeleteInventory(inv.id)}
                          className="text-rose-400 hover:text-rose-300 p-1 rounded cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: JADWAL PETUGAS */}
        {dkmTab === 'petugas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-lg font-bold font-serif text-white">
                Penjadwalan Imam, Muadzin, & Khatib Jumat
              </h3>
              <button
                onClick={() => setDkmTab('pengaturan')}
                className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-bold px-4 py-2 rounded-xl text-xs border border-amber-500/30 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <span>âš™ï¸ Pengaturan Khutbah Jumat Lengkap</span>
              </button>
            </div>

            {/* Featured Friday Khutbah Card */}
            <div className="bg-gradient-to-r from-blue-900 via-[#0e1d38] to-blue-900 border-2 border-amber-500/40 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                <span className="bg-amber-500 text-blue-950 font-bold font-mono text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  INFORMASI KHUTBAH JUMAT TERKINI (AKTIF DI TV SIGNAGE)
                </span>
                <span className="text-xs text-amber-300 font-mono font-bold">
                  {adminSettings?.jumatTimeInfo || 'Jumat Ini, 11:55 WIB'}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-amber-300">
                "{adminSettings?.jumatTopicTitle || 'Memperkokoh Ukhuwah & Transparansi Pengelolaan Aset Umat'}"
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-blue-200 font-sans pt-1">
                <div className="bg-blue-950/80 p-2.5 rounded-xl border border-blue-800">
                  <span className="text-[10px] text-blue-400 block font-mono">Khatib Jumat:</span>
                  <p className="font-serif font-bold text-white text-sm">{adminSettings?.jumatKhatibName || 'Prof. Dr. KH. Nasaruddin Umar, MA'}</p>
                </div>
                <div className="bg-blue-950/80 p-2.5 rounded-xl border border-blue-800">
                  <span className="text-[10px] text-blue-400 block font-mono">Imam Jumat:</span>
                  <p className="font-serif font-bold text-white text-sm">{adminSettings?.jumatImamName || 'Ustadz H. M. Zainuddin, Sq'}</p>
                </div>
                <div className="bg-blue-950/80 p-2.5 rounded-xl border border-blue-800">
                  <span className="text-[10px] text-blue-400 block font-mono">Muadzin Jumat:</span>
                  <p className="font-serif font-bold text-white text-sm">{adminSettings?.jumatMuadzinName || 'Ustadz Bilal Al-Hafiz'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {petugasList.map(p => (
                <div key={p.id} className="bg-blue-900 border border-blue-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center border-b border-blue-800 pb-2">
                    <span className="font-serif font-bold text-blue-400 text-sm">{p.dayName}, {p.date}</span>
                    <span className="text-[10px] bg-blue-800 text-blue-400 font-mono px-2 py-0.5 rounded">Jadwal Tugas</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-blue-400 text-[10px]">Imam Subuh:</span>
                      <p className="font-bold text-white">{p.subuh}</p>
                    </div>
                    <div>
                      <span className="text-blue-400 text-[10px]">Imam Dzuhur:</span>
                      <p className="font-bold text-white">{p.dzuhur}</p>
                    </div>
                    <div>
                      <span className="text-blue-400 text-[10px]">Imam Ashar:</span>
                      <p className="font-bold text-white">{p.ashar}</p>
                    </div>
                    <div>
                      <span className="text-blue-400 text-[10px]">Imam Maghrib:</span>
                      <p className="font-bold text-white">{p.maghrib}</p>
                    </div>
                  </div>

                  {p.khatibJumat && (
                    <div className="bg-blue-950 p-3 rounded-xl border border-blue-500/30 text-xs">
                      <span className="text-[10px] text-amber-400 font-bold uppercase block">Khatib & Imam Shalat Jumat</span>
                      <p className="font-serif font-bold text-white text-sm mt-0.5">{p.khatibJumat}</p>
                      <p className="text-[11px] text-blue-400 mt-1 italic">"{p.topikJumat || 'Kutbah Keutamaan Ketaatan'}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BROADCAST WHATSAPP */}
        {dkmTab === 'broadcast' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-serif text-white">
              Fitur Pengiriman Broadcast WhatsApp Resmi DKM
            </h3>

            <div className="bg-blue-900 border border-blue-800 rounded-2xl p-6 max-w-2xl mx-auto space-y-4">
              <div>
                <label className="text-xs font-semibold text-blue-300 block mb-1">
                  Judul Pengumuman:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Undangan Kajian Subuh Berkah..."
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full bg-blue-950 border border-blue-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-blue-300 block mb-1">
                  Isi Pesan Siaran:
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan isi pesan pengumuman untuk jamaah..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full bg-blue-950 border border-blue-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <button
                onClick={handleSendWaBroadcast}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan Siaran via WhatsApp</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB QURBAN: MANAJEMEN PATUNGAN QURBAN & AQIQAH */}
        {dkmTab === 'qurban' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-800 pb-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-white">
                  Manajemen Patungan Qurban & Shohibul Qurban Terdaftar
                </h3>
                <p className="text-xs text-blue-400 mt-0.5">
                  Kelola kelompok 1/7 Saham Sapi Qurban, Kambing Individual, dan Data Shohibul Qurban Jamaah.
                </p>
              </div>
            </div>

            {/* Qurban Groups List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {qurbanGroups.map(group => (
                <div key={group.id} className="bg-blue-900 border border-blue-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={group.imageUrl} alt={group.title} className="w-14 h-14 rounded-xl object-cover border border-blue-800" />
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">{group.animalType} ({group.weightEstimate})</span>
                      <h4 className="font-serif font-bold text-white text-sm">{group.title}</h4>
                      <p className="text-xs text-blue-400 font-mono font-bold mt-0.5">{formatRupiahFull(group.pricePerShare)} / Saham</p>
                    </div>
                  </div>

                  <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-blue-400">Slot Terisi:</span>
                      <span className="text-amber-300 font-bold">{group.filledShares} / {group.totalShares} Saham</span>
                    </div>

                    <span className="text-[10px] font-mono text-blue-300 uppercase block font-bold border-t border-blue-800 pt-2">
                      Daftar Shohibul Qurban ({group.participants.length}):
                    </span>
                    {group.participants.length > 0 ? (
                      <ul className="text-xs text-blue-300 space-y-1">
                        {group.participants.map(p => (
                          <li key={p.id} className="flex justify-between items-center text-[11px] font-mono">
                            <span className="truncate max-w-[170px]">â€¢ {p.mudhahhiName}</span>
                            <span className="text-blue-400 font-bold">Ref: {p.transactionRef}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[11px] text-blue-500 italic">Belum ada peserta terdaftar.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MANAJEMEN PROGRAM */}
        {dkmTab === 'program' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-white">
                Manajemen Campaign Program ZISWAF
              </h3>

              <button
                onClick={() => setShowAddProg(!showAddProg)}
                className="bg-blue-500 hover:bg-blue-400 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Program Donasi Baru</span>
              </button>
            </div>

            {showAddProg && (
              <form onSubmit={handleCreateProgram} className="bg-blue-900 border border-blue-500/30 p-5 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Judul Program:</label>
                    <input
                      type="text"
                      placeholder="Contoh: Wakaf Karpet Turki..."
                      value={progTitle}
                      onChange={(e) => setProgTitle(e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Kategori:</label>
                    <select
                      value={progCategory}
                      onChange={(e) => setProgCategory(e.target.value as any)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                    >
                      <option value="wakaf">Wakaf</option>
                      <option value="zakat">Zakat</option>
                      <option value="infaq">Infaq</option>
                      <option value="shadaqah">Shadaqah</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Target Dana (Rp):</label>
                    <input
                      type="number"
                      value={progTarget}
                      onChange={(e) => setProgTarget(Number(e.target.value))}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs font-mono rounded-xl px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                {/* Program Real Pict Upload */}
                <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <span>Foto Banner Campaign Program Real Pict</span>
                    </label>
                    <label className="cursor-pointer bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-blue-500/30 flex items-center gap-1 transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload Banner</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setProgImageUrl)}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="URL Banner Foto Program..."
                    value={progImageUrl}
                    onChange={(e) => setProgImageUrl(e.target.value)}
                    className="w-full bg-blue-900 border border-blue-800 text-blue-300 text-xs rounded-xl px-3 py-2 outline-none"
                  />

                  {progImageUrl && (
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={progImageUrl}
                        alt="Preview Program"
                        className="w-16 h-12 rounded-lg object-cover border border-blue-500/40 cursor-pointer"
                        onClick={() => setPreviewPhotoUrl(progImageUrl)}
                      />
                      <span className="text-[10px] text-blue-400 font-mono">Pratinjau Foto Campaign Program</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProg(false)}
                    className="px-4 py-2 rounded-xl text-xs text-blue-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-blue-950 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
                  >
                    Simpan Program
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programs.map(p => (
                <div key={p.id} className="bg-blue-900 border border-blue-800 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500/40 transition-all">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-20 h-20 rounded-xl object-cover border border-blue-700 cursor-pointer shrink-0"
                    onClick={() => setPreviewPhotoUrl(p.imageUrl)}
                  />
                  <div className="flex-1">
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold uppercase">
                      {p.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{p.title}</h4>
                    <p className="text-xs font-mono text-blue-400 mt-1">
                      Target: {formatRupiahFull(p.targetAmount)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {onDeleteProgram && (
                      <button
                        onClick={() => {
                          if (window.confirm('Apakah Anda yakin ingin menghapus program ini?')) {
                            onDeleteProgram(p.id);
                          }
                        }}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-colors border border-red-500/30 cursor-pointer"
                        title="Hapus Program"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: PENGUMUMAN & GALERI KEGIATAN */}
        {dkmTab === 'pengumuman' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-white">
                  Manajemen Pengumuman & Galeri Foto Kegiatan Masjid
                </h3>
                <p className="text-xs text-blue-400">
                  Kelola siaran berita, galeri dokumentasi kajian, & informasi kegiatan jamaah dengan foto real pict.
                </p>
              </div>

              <button
                onClick={() => setShowAddAnc(!showAddAnc)}
                className="bg-blue-500 hover:bg-blue-400 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Pengumuman / Foto Dokumentasi</span>
              </button>
            </div>

            {/* Add Announcement Form Modal */}
            {showAddAnc && (
              <form onSubmit={handleCreateAnnouncement} className="bg-blue-900 border border-blue-500/30 p-5 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Judul Pengumuman:</label>
                    <input
                      type="text"
                      placeholder="Contoh: Kajian Bulanan Fiqih..."
                      value={ancTitle}
                      onChange={(e) => setAncTitle(e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Kategori:</label>
                    <select
                      value={ancCategory}
                      onChange={(e) => setAncCategory(e.target.value as any)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                    >
                      <option value="Kajian">Kajian</option>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Penting">Penting</option>
                      <option value="Keuangan">Keuangan</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-300 block mb-1">Penulis / Redaksi:</label>
                    <input
                      type="text"
                      value={ancAuthor}
                      onChange={(e) => setAncAuthor(e.target.value)}
                      className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-blue-300 block mb-1">Isi Berita / Keterangan:</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan detail pengumuman atau laporan kegiatan..."
                    value={ancContent}
                    onChange={(e) => setAncContent(e.target.value)}
                    className="w-full bg-blue-950 border border-blue-800 text-white text-xs rounded-xl p-3 outline-none"
                  />
                </div>

                {/* Photo Upload for Announcement */}
                <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <span>Foto Dokumentasi Kegiatan Real Pict</span>
                    </label>
                    <label className="cursor-pointer bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-blue-500/30 flex items-center gap-1 transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setAncImageUrl)}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="URL Foto Dokumentasi..."
                    value={ancImageUrl}
                    onChange={(e) => setAncImageUrl(e.target.value)}
                    className="w-full bg-blue-900 border border-blue-800 text-blue-300 text-xs rounded-xl px-3 py-2 outline-none"
                  />

                  {ancImageUrl && (
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={ancImageUrl}
                        alt="Preview Foto"
                        className="w-16 h-12 rounded-lg object-cover border border-blue-500/40 cursor-pointer"
                        onClick={() => setPreviewPhotoUrl(ancImageUrl)}
                      />
                      <span className="text-[10px] text-blue-400 font-mono">Pratinjau Foto Dokumentasi Real Pict</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAnc(false)}
                    className="px-4 py-2 rounded-xl text-xs text-blue-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-blue-950 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
                  >
                    Terbitkan Pengumuman
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {announcements.map(a => (
                <div key={a.id} className="bg-blue-900 border border-blue-800 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all flex flex-col">
                  {a.imageUrl && (
                    <div className="h-40 bg-blue-950 overflow-hidden relative group">
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setPreviewPhotoUrl(a.imageUrl!)}
                      />
                      <span className="absolute top-3 left-3 bg-blue-950/80 backdrop-blur-md text-blue-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/30">
                        {a.category}
                      </span>
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-serif font-bold text-white text-base leading-snug">{a.title}</h4>
                      <p className="text-xs text-blue-400 mt-2 line-clamp-3">{a.content}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-blue-800 text-[10px] font-mono text-blue-500">
                      <span>{a.date}</span>
                      <span>By {a.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SUPABASE SQL EXPORTER */}
        {dkmTab === 'supabase' && (
          <div className="space-y-4">
            <div className="bg-blue-900 border border-amber-500/30 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-blue-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Skema SQL Supabase Siap Pakai
                  </h3>
                  <p className="text-xs text-blue-400">
                    Salin skema SQL di bawah ini dan tempelkan ke Supabase SQL Editor milik Anda untuk membuat seluruh tabel.
                  </p>
                </div>

                <button
                  onClick={handleCopySql}
                  className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  {copiedSql ? <Check className="w-4 h-4 text-blue-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSql ? 'Tersalin ke Clipboard!' : 'Salin Skema SQL'}</span>
                </button>
              </div>

              <pre className="bg-blue-950 p-4 rounded-2xl text-[11px] font-mono text-amber-300/90 overflow-x-auto max-h-96 border border-blue-800">
                {generateSupabaseSQLSchema()}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Zoom Photo Preview Modal */}
      {previewPhotoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-blue-900 border border-blue-500/30 rounded-3xl max-w-3xl w-full p-4 relative space-y-3 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-blue-800 pb-2">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                <span>Detail Foto Real Pict Database</span>
              </span>
              <button
                onClick={() => setPreviewPhotoUrl(null)}
                className="p-1 rounded-lg bg-blue-800 hover:bg-blue-700 text-blue-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-hidden rounded-2xl bg-black flex items-center justify-center">
              <img
                src={previewPhotoUrl}
                alt="Foto Database Full"
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-1 text-blue-400">
              <span className="truncate max-w-md">{previewPhotoUrl}</span>
              <a
                href={previewPhotoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Buka Gambar Asli</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


