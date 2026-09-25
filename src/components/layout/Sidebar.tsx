import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Code2,
  Building2,
  Briefcase,
  CalendarCheck,
  BarChart3,
  Sparkles,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  BookOpen,
  FolderGit2,
  FileText,
  Award,
  GraduationCap,
  Layers,
  Terminal,
  Zap,
} from 'lucide-react';

interface SidebarSection {
  title: string;
  icon: React.ElementType;
  items: string[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, notifications } = useApp();
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Placement: true,
    Preparation: true,
    Companies: true,
    Career: false,
    Planner: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections: SidebarSection[] = [
    {
      title: 'Placement',
      icon: Compass,
      items: ['Readiness', 'Roadmap', 'Career Explorer'],
    },
    {
      title: 'Preparation',
      icon: Code2,
      items: ['DSA', 'Programming', 'CS Fundamentals', 'Aptitude', 'Interview Prep', 'Study Room'],
    },
    {
      title: 'Companies',
      icon: Building2,
      items: ['Target Companies', 'Applications', 'Drives', 'Company Prep'],
    },
    {
      title: 'Career',
      icon: Briefcase,
      items: ['Projects', 'Resume', 'Certifications', 'GitHub & LinkedIn', 'Internship'],
    },
    {
      title: 'Planner',
      icon: CalendarCheck,
      items: ['Today', 'Calendar', 'Goals'],
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 bg-[#0D0B10] border-r border-[#30283A] overflow-y-auto px-3 py-4 select-none">
        {/* Dashboard Main Button */}
        <button
          onClick={() => setActiveTab('Dashboard')}
          className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 mb-3 ${
            activeTab === 'Dashboard'
              ? 'bg-[#663399] text-[#F5F1F5] shadow-lg shadow-[#663399]/40 border border-[#A3779D]/40 font-semibold'
              : 'text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        {/* Expandable Grouped Sections */}
        <div className="space-y-1">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isExpanded = expandedSections[sec.title];
            const hasActiveItem = sec.items.includes(activeTab);

            return (
              <div key={sec.title} className="space-y-0.5">
                <button
                  onClick={() => toggleSection(sec.title)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    hasActiveItem
                      ? 'text-[#E6C7E6]'
                      : 'text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#A3779D]" />
                    <span>{sec.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#82778A]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#82778A]" />
                  )}
                </button>

                {isExpanded && (
                  <div className="pl-6 space-y-0.5 py-0.5">
                    {sec.items.map((item) => {
                      const isActive = activeTab === item;
                      return (
                        <button
                          key={item}
                          onClick={() => setActiveTab(item)}
                          className={`flex items-center w-full px-3 py-1.5 text-xs rounded-lg transition-colors text-left ${
                            isActive
                              ? 'bg-[#1D1824] text-[#E6C7E6] font-semibold border-l-2 border-[#663399]'
                              : 'text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Separator */}
        <div className="my-3 border-t border-[#30283A]/80" />

        {/* Standalone Navigation Items */}
        <div className="space-y-1">
          {/* Analytics */}
          <button
            onClick={() => setActiveTab('Analytics')}
            className={`flex items-center gap-3 w-full px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
              activeTab === 'Analytics'
                ? 'bg-[#1D1824] text-[#E6C7E6] font-semibold border border-[#30283A]'
                : 'text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#A3779D]" />
            <span>Analytics</span>
          </button>

          {/* Gemini AI Coach */}
          <button
            onClick={() => setActiveTab('Gemini AI')}
            className={`flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'Gemini AI'
                ? 'bg-gradient-to-r from-[#663399]/40 to-[#2E1A47] text-[#E6C7E6] border border-[#663399]/60'
                : 'text-[#E6C7E6] hover:bg-[#15121A] border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Gemini AI</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('Notifications')}
            className={`flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
              activeTab === 'Notifications'
                ? 'bg-[#1D1824] text-[#E6C7E6] font-semibold border border-[#30283A]'
                : 'text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#A3779D]" />
              <span>Notifications</span>
            </div>
            {unreadNotifCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#663399] text-white">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveTab('Settings')}
            className={`flex items-center gap-3 w-full px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
              activeTab === 'Settings'
                ? 'bg-[#1D1824] text-[#E6C7E6] font-semibold border border-[#30283A]'
                : 'text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#A3779D]" />
            <span>Settings</span>
          </button>
        </div>

        {/* Bottom KL University Student Info Pill */}
        <div className="mt-auto pt-4 border-t border-[#30283A]/60">
          <div className="p-3 rounded-xl bg-[#15121A] border border-[#30283A]/80 text-[11px]">
            <div className="flex items-center justify-between text-[#A3779D] font-medium mb-1">
              <span>KL Placement Portal</span>
              <span className="text-emerald-400 font-semibold">Superset Sync</span>
            </div>
            <p className="text-[#B9B0BD] font-medium truncate">Bandla Nayana L. P.</p>
            <p className="text-[#82778A]">CSIT Y23 • 2027 Grad</p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 bg-[#0D0B10]/95 backdrop-blur-lg border-t border-[#30283A] px-2">
        <button
          onClick={() => setActiveTab('Dashboard')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium ${
            activeTab === 'Dashboard' ? 'text-[#E6C7E6] font-bold' : 'text-[#82778A]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('DSA')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium ${
            activeTab === 'DSA' ? 'text-[#E6C7E6] font-bold' : 'text-[#82778A]'
          }`}
        >
          <Code2 className="w-4 h-4 mb-0.5" />
          <span>DSA</span>
        </button>

        <button
          onClick={() => setActiveTab('Gemini AI')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium ${
            activeTab === 'Gemini AI' ? 'text-purple-300 font-bold' : 'text-[#82778A]'
          }`}
        >
          <div className="p-1 rounded-full bg-[#663399]/40 border border-[#663399]">
            <Sparkles className="w-4 h-4 text-purple-300" />
          </div>
          <span>AI Coach</span>
        </button>

        <button
          onClick={() => setActiveTab('Target Companies')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium ${
            activeTab === 'Target Companies' || activeTab === 'Companies'
              ? 'text-[#E6C7E6] font-bold'
              : 'text-[#82778A]'
          }`}
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span>Companies</span>
        </button>

        <button
          onClick={() => setActiveTab('Today')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium ${
            activeTab === 'Today' || activeTab === 'Planner'
              ? 'text-[#E6C7E6] font-bold'
              : 'text-[#82778A]'
          }`}
        >
          <CalendarCheck className="w-4 h-4 mb-0.5" />
          <span>Tasks</span>
        </button>
      </nav>
    </>
  );
};
