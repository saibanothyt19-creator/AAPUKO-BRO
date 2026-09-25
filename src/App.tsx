import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNavbar } from './components/layout/TopNavbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { PlacementModule } from './components/modules/PlacementModule';
import { PreparationModule } from './components/modules/PreparationModule';
import { CompaniesModule } from './components/modules/CompaniesModule';
import { CareerModule } from './components/modules/CareerModule';
import { PlannerModule } from './components/modules/PlannerModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';
import { GeminiChatModule } from './components/modules/GeminiChatModule';
import { NotificationsModule } from './components/modules/NotificationsModule';
import { SettingsModule } from './components/modules/SettingsModule';
import { ReadinessBreakdownModal } from './components/modals/ReadinessBreakdownModal';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  // Keyboard shortcut Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <TopNavbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-[calc(100vh-4rem)] pb-20 md:pb-6 overflow-y-auto">
          {activeTab === 'Dashboard' && <DashboardView />}

          {(activeTab === 'Readiness' ||
            activeTab === 'Roadmap' ||
            activeTab === 'Career Explorer' ||
            activeTab === 'Placement') && <PlacementModule />}

          {(activeTab === 'DSA' ||
            activeTab === 'Programming' ||
            activeTab === 'CS Fundamentals' ||
            activeTab === 'Aptitude' ||
            activeTab === 'Interview Prep' ||
            activeTab === 'Study Room' ||
            activeTab === 'Preparation') && (
            <PreparationModule
              initialTab={
                activeTab === 'Preparation'
                  ? 'DSA'
                  : (activeTab as any)
              }
            />
          )}

          {(activeTab === 'Target Companies' ||
            activeTab === 'Applications' ||
            activeTab === 'Drives' ||
            activeTab === 'Company Prep' ||
            activeTab === 'Companies') && (
            <CompaniesModule
              initialTab={
                activeTab === 'Companies'
                  ? 'Target Companies'
                  : (activeTab as any)
              }
            />
          )}

          {(activeTab === 'Projects' ||
            activeTab === 'Resume' ||
            activeTab === 'Certifications' ||
            activeTab === 'GitHub & LinkedIn' ||
            activeTab === 'Internship' ||
            activeTab === 'Career') && (
            <CareerModule
              initialTab={
                activeTab === 'Career'
                  ? 'Projects'
                  : (activeTab as any)
              }
            />
          )}

          {(activeTab === 'Today' ||
            activeTab === 'Calendar' ||
            activeTab === 'Goals' ||
            activeTab === 'Planner') && (
            <PlannerModule
              initialTab={
                activeTab === 'Planner'
                  ? 'Today'
                  : (activeTab as any)
              }
            />
          )}

          {activeTab === 'Analytics' && <AnalyticsModule />}

          {activeTab === 'Gemini AI' && <GeminiChatModule />}

          {activeTab === 'Notifications' && <NotificationsModule />}

          {activeTab === 'Settings' && <SettingsModule />}
        </main>
      </div>

      {/* Global Readiness Breakdown Modal */}
      <ReadinessBreakdownModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
