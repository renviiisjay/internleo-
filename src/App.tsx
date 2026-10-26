import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Sidebar, PageId } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { PresentInternships } from './pages/PresentInternships';
import { PastInternships } from './pages/PastInternships';
import { Applications } from './pages/Applications';
import { CareerDNAEngine } from './pages/CareerDNAEngine';
import { OpportunityXRay } from './pages/OpportunityXRay';
import { ResumeStudio } from './pages/ResumeStudio';
import { CareerGoals } from './pages/CareerGoals';
import { CalendarPage } from './pages/CalendarPage';
import {
  Menu,
  X,
  Sparkles,
  RotateCcw,
  Search,
  Bell,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const { internships, applications, resetToSampleData } = useData();

  const activePresentCount = internships.filter(i => i.type === 'present').length;
  const activeAppsCount = applications.filter(
    a => a.status === 'Applied' || a.status === 'Assessment' || a.status === 'Interview'
  ).length;

  const handleResetData = () => {
    if (window.confirm('Reset all demo internships, applications, and Career DNA skills?')) {
      resetToSampleData();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      setShowNotificationToast(true);
      setTimeout(() => setShowNotificationToast(false), 3000);
    }
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E8E5F8', '#FFE8DF', '#E1EDF8', '#8675A9']
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D3142] flex flex-col md:flex-row antialiased selection:bg-[#E8E5F8]">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#FAF8F5] border-b border-[#EFECE6] sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-[#E8E4DA] text-[#44475D]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-serif font-bold text-xl text-[#2B2D42]">
            Intern<span className="text-[#8675A9]">leo</span>
          </span>
        </div>

        <button
          onClick={handleCelebrate}
          className="p-2 rounded-xl bg-white border border-[#E8E4DA] text-[#8675A9]"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <div
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block fixed md:relative z-40 inset-0 md:inset-auto`}
      >
        {/* Mobile backdrop */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div className="relative z-50 h-full">
          <Sidebar
            currentPage={currentPage}
            onSelectPage={page => {
              setCurrentPage(page);
              setMobileMenuOpen(false);
            }}
            onResetData={handleResetData}
            activePresentCount={activePresentCount}
            activeAppsCount={activeAppsCount}
          />
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 min-w-0 min-h-screen flex flex-col overflow-y-auto">
        {/* Top Floating App Bar */}
        <header className="px-6 lg:px-10 py-4 flex items-center justify-between border-b border-[#EFECE6]/80 bg-[#FAF9F6]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif font-bold text-[#7E61B2] capitalize">
              {currentPage.replace('-', ' ')}
            </span>
            <span className="text-xs text-[#8A8EA2]">· Leo Martinez</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCelebrate}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#E6E1D6] hover:border-[#8675A9] text-xs font-medium text-[#50536A] flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8675A9]" />
              Celebrate Milestone
            </button>

            <button
              onClick={handleResetData}
              title="Reset Sample Data"
              className="px-3 py-1.5 rounded-xl bg-[#F4F1EA] hover:bg-[#EBE7DD] text-xs font-medium text-[#65697D] flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Demo
            </button>
          </div>
        </header>

        {/* Dynamic Page Component */}
        <div className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
          {currentPage === 'present-internships' && <PresentInternships />}
          {currentPage === 'past-internships' && <PastInternships />}
          {currentPage === 'applications' && <Applications />}
          {currentPage === 'career-dna' && <CareerDNAEngine />}
          {currentPage === 'opportunity-xray' && <OpportunityXRay />}
          {currentPage === 'resume-studio' && <ResumeStudio />}
          {currentPage === 'career-goals' && <CareerGoals />}
          {currentPage === 'calendar' && <CalendarPage />}
        </div>
      </main>

      {/* Toast notification */}
      {showNotificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2B2D42] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Demo data successfully refreshed!</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainLayout />
    </DataProvider>
  );
}
