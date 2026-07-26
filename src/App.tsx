import React, { useState } from 'react';
import { useMasjidStore } from './lib/store';
import { Program, ProgramCategory } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProgramCardsSection } from './components/ProgramCardsSection';
import { DonationModalFlow } from './components/DonationModalFlow';
import { ZiswafCalculatorModal } from './components/ZiswafCalculatorModal';
import { DigitalIbadahModal } from './components/DigitalIbadahModal';
import { TransparencySection } from './components/TransparencySection';
import { PengurusDkmDashboard } from './components/PengurusDkmDashboard';
import { TvDisplayMode } from './components/TvDisplayMode';
import { AzZikraAiAssistantModal } from './components/AzZikraAiAssistantModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { LoginModal } from './components/LoginModal';
import { CatalogPdfModal } from './components/CatalogPdfModal';
import { GallerySection } from './components/GallerySection';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { EdukasiZiswafSection } from './components/EdukasiZiswafSection';
import { FridayAgendaSection } from './components/FridayAgendaSection';
import { PatunganQurbanSection } from './components/PatunganQurbanSection';
import { SejarahAzzikraSection } from './components/SejarahAzzikraSection';
import { FloatingMobileNav } from './components/FloatingMobileNav';
import { Footer } from './components/Footer';

export default function App() {
  const {
    state,
    addDonation,
    addFinancialTransaction,
    addInventoryItem,
    deleteInventoryItem,
    updatePetugasJadwal,
    addPetugasJadwal,
    deletePetugasJadwal,
    addAnnouncement,
    addProgram,
    addJournalEntry,
    addPettyCashEntry,
    updateAdminSettings,
    addGalleryItem,
    deleteGalleryItem,
    likeGalleryItem,
    incrementGalleryViews,
    addQurbanParticipant,
    addQurbanGroup,
    updateQurbanGroup,
    deleteQurbanGroup,
    setPalette,
    setThemeMode,
    toggleThemeMode,
    login,
    logout,
    saveSupabaseKeys
  } = useMasjidStore();

  // Tab State
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // Modal Overlays State
  const [donationModalOpen, setDonationModalOpen] = useState<boolean>(false);
  const [selectedDonationCategory, setSelectedDonationCategory] = useState<string | undefined>();
  const [selectedDonationProgram, setSelectedDonationProgram] = useState<Program | undefined>();
  const [selectedDetailProgram, setSelectedDetailProgram] = useState<Program | null>(null);

  const [calculatorModalOpen, setCalculatorModalOpen] = useState<boolean>(false);

  const [digitalIbadahOpen, setDigitalIbadahOpen] = useState<boolean>(false);
  const [digitalIbadahTab, setDigitalIbadahTab] = useState<'quran' | 'salat' | 'kiblat' | 'doa'>('quran');

  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [tvModeOpen, setTvModeOpen] = useState<boolean>(false);
  const [catalogPdfOpen, setCatalogPdfOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Computed KPI figures matching PDF exact numbers or store
  const totalCollected = state.programs.reduce((sum, p) => sum + p.collectedAmount, 0);
  const activeDonors = state.programs.reduce((sum, p) => sum + p.donorsCount, 0);
  const totalDisbursed = 9700000000; // Rp 9.7M from PDF
  const efficiencyRate = 91; // 91% from PDF

  const handleOpenDonationModal = (category?: string) => {
    setSelectedDonationProgram(undefined);
    setSelectedDonationCategory(category);
    setDonationModalOpen(true);
  };

  const handleOpenDonationForProgram = (program: Program) => {
    setSelectedDonationProgram(program);
    setSelectedDonationCategory(program.category);
    setDonationModalOpen(true);
  };

  const handleOpenDigitalIbadah = (tab: 'quran' | 'salat' | 'kiblat' | 'doa' = 'quran') => {
    setDigitalIbadahTab(tab);
    setDigitalIbadahOpen(true);
  };

  const handleSelectAmountFromCalculator = (amount: number, category: string) => {
    setSelectedDonationCategory(category);
    setSelectedDonationProgram(state.programs.find(p => p.category === category));
    setDonationModalOpen(true);
  };

  // Theme Mode & Palette styling
  const isDark = state.themeMode === 'dark';
  const themeContainerBg = isDark
    ? 'bg-[#022C22] text-emerald-100 dark'
    : 'bg-[#F4FBF7] text-emerald-900';

  return (
    <div className={`min-h-screen ${themeContainerBg} font-sans selection:bg-emerald-600 selection:text-white transition-colors duration-300 pb-16 xl:pb-0`}>
      {/* 1. Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openDonationModal={handleOpenDonationModal}
        openCalculator={() => setCalculatorModalOpen(true)}
        openDigitalIbadah={handleOpenDigitalIbadah}
        openAiAssistant={() => setAiAssistantOpen(true)}
        openSupabaseModal={() => setSupabaseModalOpen(true)}
        openTvMode={() => setTvModeOpen(true)}
        openCatalogPdf={() => setCatalogPdfOpen(true)}
        session={state.session}
        openLoginModal={() => setLoginModalOpen(true)}
        palette={state.colorPalette}
        setPalette={setPalette}
        themeMode={state.themeMode}
        toggleThemeMode={toggleThemeMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 2. Main Views according to activeTab */}
      <main>
        {activeTab === 'beranda' && (
          <>
            <ProgramCardsSection
              programs={state.programs}
              openDonationForProgram={handleOpenDonationForProgram}
              onSelectProgramDetail={(prog) => setSelectedDetailProgram(prog)}
            />

            <HeroSection
              totalCollected={totalCollected}
              activeDonors={activeDonors}
              totalDisbursed={totalDisbursed}
              efficiencyRate={efficiencyRate}
              openDonationModal={handleOpenDonationModal}
              openCalculator={() => setCalculatorModalOpen(true)}
              openDigitalIbadah={handleOpenDigitalIbadah}
              openCatalogPdf={() => setCatalogPdfOpen(true)}
            />

            <FridayAgendaSection
              petugasList={state.petugas}
              isDark={isDark}
            />

            <PatunganQurbanSection
              qurbanGroups={state.qurbanGroups || []}
              onAddParticipant={addQurbanParticipant}
              onUpdateGroupImage={updateQurbanGroup}
              isDark={isDark}
              session={state.session}
            />

            <SejarahAzzikraSection isDark={isDark} />

            <EdukasiZiswafSection
              isDark={isDark}
              onOpenCalculator={() => setCalculatorModalOpen(true)}
              onSelectCategoryDonate={(cat) => handleOpenDonationModal(cat)}
            />

            <TransparencySection
              financials={state.financials}
              petugasList={state.petugas}
            />
          </>
        )}

        {activeTab === 'program' && (
          <>
            <ProgramCardsSection
              programs={state.programs}
              openDonationForProgram={handleOpenDonationForProgram}
              onSelectProgramDetail={(prog) => setSelectedDetailProgram(prog)}
            />
            <EdukasiZiswafSection
              isDark={isDark}
              onOpenCalculator={() => setCalculatorModalOpen(true)}
              onSelectCategoryDonate={(cat) => handleOpenDonationModal(cat)}
            />
          </>
        )}

        {activeTab === 'transparansi' && (
          <TransparencySection
            financials={state.financials}
            petugasList={state.petugas}
          />
        )}

        {activeTab === 'jadwal_khatib' && (
          <FridayAgendaSection
            petugasList={state.petugas}
            isDark={isDark}
          />
        )}

        {activeTab === 'qurban' && (
          <PatunganQurbanSection
            qurbanGroups={state.qurbanGroups || []}
            onAddParticipant={addQurbanParticipant}
            onUpdateGroupImage={updateQurbanGroup}
            isDark={isDark}
            session={state.session}
          />
        )}

        {activeTab === 'sejarah' && (
          <SejarahAzzikraSection isDark={isDark} />
        )}

        {activeTab === 'edukasi' && (
          <EdukasiZiswafSection
            isDark={isDark}
            onOpenCalculator={() => setCalculatorModalOpen(true)}
            onSelectCategoryDonate={(cat) => handleOpenDonationModal(cat)}
          />
        )}

        {activeTab === 'galeri' && (
          <GallerySection
            galleryItems={state.galleryItems}
            onLikeItem={likeGalleryItem}
            onIncrementView={incrementGalleryViews}
            isDark={isDark}
          />
        )}

        {activeTab === 'dkm_portal' && ['pengurus_dkm', 'admin_masjid', 'ketua_dkm'].includes(state.session.role) && (
          <PengurusDkmDashboard
            financials={state.financials}
            inventories={state.inventories}
            petugasList={state.petugas}
            announcements={state.announcements}
            programs={state.programs}
            journalEntries={state.journalEntries}
            glAccounts={state.glAccounts}
            pettyCash={state.pettyCash}
            adminSettings={state.adminSettings}
            galleryItems={state.galleryItems}
            qurbanGroups={state.qurbanGroups || []}
            onAddFinancial={addFinancialTransaction}
            onAddInventory={addInventoryItem}
            onDeleteInventory={deleteInventoryItem}
            onUpdatePetugas={updatePetugasJadwal}
            onAddPetugasJadwal={addPetugasJadwal}
            onDeletePetugasJadwal={deletePetugasJadwal}
            onAddAnnouncement={addAnnouncement}
            onAddProgram={addProgram}
            onAddJournalEntry={addJournalEntry}
            onAddPettyCashEntry={addPettyCashEntry}
            onUpdateAdminSettings={updateAdminSettings}
            onAddGalleryItem={addGalleryItem}
            onDeleteGalleryItem={deleteGalleryItem}
            onAddQurbanGroup={addQurbanGroup}
            onDeleteQurbanGroup={deleteQurbanGroup}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        openDonationModal={() => handleOpenDonationModal()}
        openCalculator={() => setCalculatorModalOpen(true)}
        openDigitalIbadah={handleOpenDigitalIbadah}
        openTvMode={() => setTvModeOpen(true)}
        openCatalogPdf={() => setCatalogPdfOpen(true)}
      />

      {/* 4. Modals & Overlays */}
      {selectedDetailProgram && (
        <ProgramDetailModal
          program={selectedDetailProgram}
          onClose={() => setSelectedDetailProgram(null)}
          onDonate={(prog) => handleOpenDonationForProgram(prog)}
        />
      )}

      <DonationModalFlow
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        programs={state.programs}
        initialCategory={selectedDonationCategory}
        initialProgram={selectedDonationProgram}
        adminSettings={state.adminSettings}
        onCompleteDonation={addDonation}
      />

      <ZiswafCalculatorModal
        isOpen={calculatorModalOpen}
        onClose={() => setCalculatorModalOpen(false)}
        onSelectAmountForDonation={handleSelectAmountFromCalculator}
      />

      <DigitalIbadahModal
        isOpen={digitalIbadahOpen}
        onClose={() => setDigitalIbadahOpen(false)}
        initialTab={digitalIbadahTab}
      />

      <AzZikraAiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      <CatalogPdfModal
        isOpen={catalogPdfOpen}
        onClose={() => setCatalogPdfOpen(false)}
      />

      <SupabaseConfigModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
        currentUrl={state.supabaseUrl}
        currentKey={state.supabaseAnonKey}
        onSave={saveSupabaseKeys}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        session={state.session}
        onLogin={login}
        onLogout={logout}
      />

      {/* Fullscreen TV Mode */}
      {tvModeOpen && (
        <TvDisplayMode
          onExit={() => setTvModeOpen(false)}
          announcements={state.announcements}
          petugasList={state.petugas}
          adminSettings={state.adminSettings}
        />
      )}
      {/* Floating Mobile Bottom Bar */}
      <FloatingMobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openDonationModal={handleOpenDonationModal}
        openDigitalIbadah={handleOpenDigitalIbadah}
        openAiAssistant={() => setAiAssistantOpen(true)}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        isDark={isDark}
      />
    </div>
  );
}
