import { useState, useEffect } from 'react';
import {
  Program,
  DonationRecord,
  FinancialTransaction,
  PetugasJadwal,
  InventoryItem,
  Announcement,
  ColorPalette,
  UserSession,
  JournalEntry,
  GeneralLedgerAccount,
  PettyCashEntry,
  AppAdminSettings,
  ThemeMode,
  GalleryItem,
  QurbanGroup,
  QurbanParticipant,
  UserRole
} from '../types';
import {
  INITIAL_PROGRAMS,
  INITIAL_DONATIONS,
  INITIAL_FINANCIAL,
  INITIAL_PETUGAS,
  INITIAL_INVENTORY,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_GL_ACCOUNTS,
  INITIAL_PETTY_CASH,
  INITIAL_ADMIN_SETTINGS,
  INITIAL_GALLERY,
  INITIAL_QURBAN_GROUPS
} from './initialData';

const LOCAL_STORAGE_KEY = 'masjid_azzikra_app_state_v2';

export interface AppState {
  programs: Program[];
  donations: DonationRecord[];
  financials: FinancialTransaction[];
  petugas: PetugasJadwal[];
  inventories: InventoryItem[];
  announcements: Announcement[];
  journalEntries: JournalEntry[];
  glAccounts: GeneralLedgerAccount[];
  pettyCash: PettyCashEntry[];
  adminSettings: AppAdminSettings;
  galleryItems: GalleryItem[];
  qurbanGroups: QurbanGroup[];
  colorPalette: ColorPalette;
  themeMode: ThemeMode;
  session: UserSession;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

const defaultState: AppState = {
  programs: INITIAL_PROGRAMS,
  donations: INITIAL_DONATIONS,
  financials: INITIAL_FINANCIAL,
  petugas: INITIAL_PETUGAS,
  inventories: INITIAL_INVENTORY,
  announcements: INITIAL_ANNOUNCEMENTS,
  journalEntries: INITIAL_JOURNAL_ENTRIES,
  glAccounts: INITIAL_GL_ACCOUNTS,
  pettyCash: INITIAL_PETTY_CASH,
  adminSettings: INITIAL_ADMIN_SETTINGS,
  galleryItems: INITIAL_GALLERY,
  qurbanGroups: INITIAL_QURBAN_GROUPS,
  colorPalette: 'emerald_green',
  themeMode: 'light',
  session: {
    isLoggedIn: false,
    email: '',
    name: 'Jamaah Az-Zikra',
    role: 'jamaah'
  },
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};

export function getStoredState(): AppState {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        // Ensure initial fallback lists if empty
        programs: parsed.programs?.length ? parsed.programs : INITIAL_PROGRAMS,
        donations: parsed.donations?.length ? parsed.donations : INITIAL_DONATIONS,
        financials: parsed.financials?.length ? parsed.financials : INITIAL_FINANCIAL,
        petugas: parsed.petugas?.length ? parsed.petugas : INITIAL_PETUGAS,
        inventories: parsed.inventories?.length ? parsed.inventories : INITIAL_INVENTORY,
        announcements: parsed.announcements?.length ? parsed.announcements : INITIAL_ANNOUNCEMENTS,
        journalEntries: parsed.journalEntries?.length ? parsed.journalEntries : INITIAL_JOURNAL_ENTRIES,
        glAccounts: parsed.glAccounts?.length ? parsed.glAccounts : INITIAL_GL_ACCOUNTS,
        pettyCash: parsed.pettyCash?.length ? parsed.pettyCash : INITIAL_PETTY_CASH,
        adminSettings: parsed.adminSettings ? { ...INITIAL_ADMIN_SETTINGS, ...parsed.adminSettings } : INITIAL_ADMIN_SETTINGS
      };
    }
  } catch (e) {
    console.error('Failed to load local state', e);
  }
  return defaultState;
}


export function saveStoredState(state: AppState) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

// React custom hook for global state with automatic persistence
export function useMasjidStore() {
  const [state, setState] = useState<AppState>(getStoredState);

  useEffect(() => {
    saveStoredState(state);
  }, [state]);

  const addDonation = (newDonation: Omit<DonationRecord, 'id' | 'createdAt' | 'status'>) => {
    const id = `DON-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = new Date().toISOString();
    const created: DonationRecord = {
      ...newDonation,
      id,
      status: 'berhasil',
      createdAt
    };

    setState(prev => {
      // Update target collected in programs
      const updatedPrograms = prev.programs.map(p => {
        if (p.id === created.programId) {
          return {
            ...p,
            collectedAmount: p.collectedAmount + created.amount,
            donorsCount: p.donorsCount + 1
          };
        }
        return p;
      });

      // Also automatically create a financial transaction record
      const newFinancial: FinancialTransaction = {
        id: `FIN-${Math.floor(200 + Math.random() * 800)}`,
        type: 'masuk',
        title: `Donasi ${created.category.toUpperCase()} - ${created.programTitle}`,
        category: created.category.toUpperCase(),
        amount: created.amount,
        date: new Date().toISOString().split('T')[0],
        description: `Penerimaan donasi dari ${created.donorName} via ${created.paymentMethod} (Ref: ${created.transactionRef})`
      };

      return {
        ...prev,
        programs: updatedPrograms,
        donations: [created, ...prev.donations],
        financials: [newFinancial, ...prev.financials]
      };
    });

    return created;
  };

  const addFinancialTransaction = (trx: Omit<FinancialTransaction, 'id'>) => {
    const newTrx: FinancialTransaction = {
      ...trx,
      id: `FIN-${Math.floor(200 + Math.random() * 800)}`
    };
    setState(prev => ({
      ...prev,
      financials: [newTrx, ...prev.financials]
    }));
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: `INV-${Math.floor(100 + Math.random() * 900)}`
    };
    setState(prev => ({
      ...prev,
      inventories: [...prev.inventories, newItem]
    }));
  };

  const updateInventoryItem = (id: string, updated: Partial<InventoryItem>) => {
    setState(prev => ({
      ...prev,
      inventories: prev.inventories.map(inv => inv.id === id ? { ...inv, ...updated } : inv)
    }));
  };

  const deleteInventoryItem = (id: string) => {
    setState(prev => ({
      ...prev,
      inventories: prev.inventories.filter(inv => inv.id !== id)
    }));
  };

  const addAnnouncement = (anc: Omit<Announcement, 'id' | 'date'>) => {
    const newAnc: Announcement = {
      ...anc,
      id: `ANC-${Math.floor(10 + Math.random() * 90)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setState(prev => ({
      ...prev,
      announcements: [newAnc, ...prev.announcements]
    }));
  };

  const updatePetugasJadwal = (updatedPetugas: PetugasJadwal) => {
    setState(prev => ({
      ...prev,
      petugas: prev.petugas.map(p => p.id === updatedPetugas.id ? updatedPetugas : p)
    }));
  };

  const addPetugasJadwal = (newPetugas: Omit<PetugasJadwal, 'id'>) => {
    const created: PetugasJadwal = {
      ...newPetugas,
      id: `JDW-${Math.floor(10 + Math.random() * 90)}`
    };
    setState(prev => ({
      ...prev,
      petugas: [created, ...prev.petugas]
    }));
  };

  const deletePetugasJadwal = (id: string) => {
    setState(prev => ({
      ...prev,
      petugas: prev.petugas.filter(p => p.id !== id)
    }));
  };

  const addProgram = (prog: Omit<Program, 'id' | 'collectedAmount' | 'donorsCount'>) => {
    const newProg: Program = {
      ...prog,
      id: `prg-${Math.floor(10 + Math.random() * 90)}`,
      collectedAmount: 0,
      donorsCount: 0
    };
    setState(prev => ({
      ...prev,
      programs: [newProg, ...prev.programs]
    }));
  };

  const setPalette = (colorPalette: ColorPalette) => {
    setState(prev => ({ ...prev, colorPalette }));
  };

  const setThemeMode = (mode: ThemeMode) => {
    setState(prev => ({ ...prev, themeMode: mode }));
  };

  const toggleThemeMode = () => {
    setState(prev => ({ ...prev, themeMode: prev.themeMode === 'light' ? 'dark' : 'light' }));
  };

  const login = (email: string, name: string, role: UserRole, phone?: string) => {
    setState(prev => ({
      ...prev,
      session: {
        isLoggedIn: true,
        email,
        name,
        role,
        phone
      }
    }));
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      session: {
        isLoggedIn: false,
        email: '',
        name: 'Jamaah Az-Zikra',
        role: 'jamaah'
      }
    }));
  };

  const saveSupabaseKeys = (supabaseUrl: string, supabaseAnonKey: string) => {
    setState(prev => ({
      ...prev,
      supabaseUrl,
      supabaseAnonKey
    }));
  };

  const updateAdminSettings = (newSettings: Partial<AppAdminSettings>) => {
    setState(prev => ({
      ...prev,
      adminSettings: {
        ...prev.adminSettings,
        ...newSettings
      }
    }));
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const id = `JRN-${Math.floor(100 + Math.random() * 900)}`;
    const created: JournalEntry = { ...entry, id };
    setState(prev => ({
      ...prev,
      journalEntries: [created, ...prev.journalEntries]
    }));
  };

  const addPettyCashEntry = (entry: Omit<PettyCashEntry, 'id' | 'remainingBalance'>) => {
    const id = `KC-${Math.floor(100 + Math.random() * 900)}`;
    setState(prev => {
      const lastBal = prev.pettyCash.length > 0 ? prev.pettyCash[0].remainingBalance : 5000000;
      const newBal = entry.type === 'Pencairan' ? lastBal + entry.amount : lastBal - entry.amount;
      const created: PettyCashEntry = {
        ...entry,
        id,
        remainingBalance: newBal
      };
      return {
        ...prev,
        pettyCash: [created, ...prev.pettyCash]
      };
    });
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id' | 'likesCount' | 'viewsCount'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Math.floor(100 + Math.random() * 900)}`,
      likesCount: 0,
      viewsCount: 1
    };
    setState(prev => ({
      ...prev,
      galleryItems: [newItem, ...(prev.galleryItems || [])]
    }));
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setState(prev => ({
      ...prev,
      galleryItems: (prev.galleryItems || []).map(g => g.id === id ? { ...g, ...updated } : g)
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setState(prev => ({
      ...prev,
      galleryItems: (prev.galleryItems || []).filter(g => g.id !== id)
    }));
  };

  const likeGalleryItem = (id: string) => {
    setState(prev => ({
      ...prev,
      galleryItems: (prev.galleryItems || []).map(g => g.id === id ? { ...g, likesCount: g.likesCount + 1 } : g)
    }));
  };

  const incrementGalleryViews = (id: string) => {
    setState(prev => ({
      ...prev,
      galleryItems: (prev.galleryItems || []).map(g => g.id === id ? { ...g, viewsCount: g.viewsCount + 1 } : g)
    }));
  };

  const addQurbanParticipant = (groupId: string, participantData: Omit<QurbanParticipant, 'id' | 'createdAt' | 'transactionRef'>) => {
    const id = `p-${Math.floor(100 + Math.random() * 900)}`;
    const txRef = `QRB-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = new Date().toISOString().split('T')[0];

    setState(prev => {
      const groups = (prev.qurbanGroups || INITIAL_QURBAN_GROUPS).map(group => {
        if (group.id === groupId) {
          const participant: QurbanParticipant = {
            ...participantData,
            id,
            createdAt,
            transactionRef: txRef
          };
          const updatedParticipants = [participant, ...group.participants];
          const newFilled = group.filledShares + participantData.sharesCount;
          return {
            ...group,
            filledShares: newFilled,
            isCompleted: newFilled >= group.totalShares,
            participants: updatedParticipants
          };
        }
        return group;
      });

      // Also create a financial transaction record for transparency
      const newTrx: FinancialTransaction = {
        id: `FIN-QRB-${Math.floor(100 + Math.random() * 900)}`,
        type: 'masuk',
        title: `Penerimaan Setoran Qurban: ${participantData.mudhahhiName}`,
        category: 'Penerimaan Qurban',
        amount: participantData.totalPaid,
        date: createdAt,
        description: `Setoran Qurban ${participantData.sharesCount} Bagian (${participantData.groupTitle}) - Ref: ${txRef}`
      };

      return {
        ...prev,
        qurbanGroups: groups,
        financials: [newTrx, ...prev.financials]
      };
    });

    return { id, transactionRef: txRef };
  };

  const addQurbanGroup = (groupData: Omit<QurbanGroup, 'id' | 'participants' | 'filledShares' | 'isCompleted'>) => {
    const newGroup: QurbanGroup = {
      ...groupData,
      id: `qrb-${Math.floor(100 + Math.random() * 900)}`,
      filledShares: 0,
      isCompleted: false,
      participants: []
    };
    setState(prev => ({
      ...prev,
      qurbanGroups: [newGroup, ...(prev.qurbanGroups || [])]
    }));
  };

  const updateQurbanGroup = (id: string, updated: Partial<QurbanGroup>) => {
    setState(prev => ({
      ...prev,
      qurbanGroups: (prev.qurbanGroups || []).map(g => g.id === id ? { ...g, ...updated } : g)
    }));
  };

  const deleteQurbanGroup = (id: string) => {
    setState(prev => ({
      ...prev,
      qurbanGroups: (prev.qurbanGroups || []).filter(g => g.id !== id)
    }));
  };

  const resetToDefault = () => {
    setState(defaultState);
  };

  return {
    state,
    addDonation,
    addFinancialTransaction,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    addAnnouncement,
    updatePetugasJadwal,
    addPetugasJadwal,
    deletePetugasJadwal,
    addProgram,
    setPalette,
    setThemeMode,
    toggleThemeMode,
    login,
    logout,
    saveSupabaseKeys,
    updateAdminSettings,
    addJournalEntry,
    addPettyCashEntry,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    likeGalleryItem,
    incrementGalleryViews,
    addQurbanParticipant,
    addQurbanGroup,
    updateQurbanGroup,
    deleteQurbanGroup,
    resetToDefault
  };
}

export function generateSupabaseSQLSchema(): string {
  return `-- ==========================================
-- SUPABASE POSTGRESQL SCHEMA FOR MASJID AZ-ZIKRA
-- Paste ini ke Supabase SQL Editor untuk membuat tabel
-- ==========================================

-- 1. TABEL PROGRAM DONASI & ZISWAF
CREATE TABLE IF NOT EXISTS public.programs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL CHECK (category IN ('zakat', 'infaq', 'shadaqah', 'wakaf')),
  target_amount NUMERIC NOT NULL DEFAULT 0,
  collected_amount NUMERIC NOT NULL DEFAULT 0,
  donors_count INT NOT NULL DEFAULT 0,
  image_url TEXT,
  description TEXT,
  is_urgent BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL RIWAYAT DONASI
CREATE TABLE IF NOT EXISTS public.donations (
  id TEXT PRIMARY KEY,
  program_id TEXT REFERENCES public.programs(id) ON DELETE SET NULL,
  program_title TEXT NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  unique_code INT NOT NULL,
  total_amount NUMERIC NOT NULL,
  donor_name TEXT NOT NULL,
  donor_phone TEXT,
  payment_method TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  recurring_period TEXT DEFAULT 'none',
  status TEXT NOT NULL DEFAULT 'berhasil',
  transaction_ref TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL TRANSPARANSI KEUANGAN
CREATE TABLE IF NOT EXISTS public.financial_transactions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('masuk', 'keluar')),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  proof_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL JADWAL PETUGAS SALAT & KHATIB
CREATE TABLE IF NOT EXISTS public.petugas_jadwal (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  day_name TEXT NOT NULL,
  subuh TEXT,
  dzuhur TEXT,
  ashar TEXT,
  maghrib TEXT,
  isya TEXT,
  khatib_jumat TEXT,
  imam_jumat TEXT,
  topik_jumat TEXT
);

-- 5. TABEL INVENTARIS MASJID
CREATE TABLE IF NOT EXISTS public.inventories (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit TEXT DEFAULT 'Unit',
  condition TEXT CHECK (condition IN ('Baik', 'Perlu Perbaikan', 'Rusak')),
  location TEXT,
  last_maintenance DATE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL PENGUMUMAN & SIARAN
CREATE TABLE IF NOT EXISTS public.announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  author TEXT DEFAULT 'Pengurus DKM Az-Zikra',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABEL JURNAL UMUM & KAS KECIL
CREATE TABLE IF NOT EXISTS public.petty_cash (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  ref_no TEXT NOT NULL,
  purpose TEXT NOT NULL,
  pic_name TEXT NOT NULL,
  type TEXT CHECK (type IN ('Pencairan', 'Pengeluaran')),
  amount NUMERIC NOT NULL,
  remaining_balance NUMERIC NOT NULL,
  receipt_proof TEXT,
  proof_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABEL PENGATURAN AKUN & FOTO PROFIL MASJID
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id INT PRIMARY KEY DEFAULT 1,
  masjid_logo_url TEXT,
  masjid_hero_photo_url TEXT,
  qris_code_image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- HABILITASI ROW LEVEL SECURITY (RLS)
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.petugas_jadwal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- KEBIJAKAN AKSES PUBLIC READ (Membaca publik)
CREATE POLICY "Public Read Programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Public Read Donations" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Public Read Financials" ON public.financial_transactions FOR SELECT USING (true);
CREATE POLICY "Public Read Petugas" ON public.petugas_jadwal FOR SELECT USING (true);
CREATE POLICY "Public Read Inventories" ON public.inventories FOR SELECT USING (true);
CREATE POLICY "Public Read Announcements" ON public.announcements FOR SELECT USING (true);

-- KEBIJAKAN AKSES DONASI PUBLIC INSERT
CREATE POLICY "Public Insert Donations" ON public.donations FOR INSERT WITH CHECK (true);
`;
}
