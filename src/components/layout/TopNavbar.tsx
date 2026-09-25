import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Flame,
  AlertTriangle,
  User,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const {
    profile,
    theme,
    setTheme,
    notifications,
    searchQuery,
    setSearchQuery,
    setActiveTab,
    emergencyMode,
    setEmergencyMode,
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#0D0B10]/90 backdrop-blur-md border-b border-[#30283A]">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('Dashboard')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#663399] to-[#2E1A47] flex items-center justify-center text-lg shadow-md shadow-[#663399]/30 border border-[#A3779D]/30 group-hover:scale-105 transition-transform">
            🦋
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-wider bg-gradient-to-r from-white via-[#E6C7E6] to-[#A3779D] bg-clip-text text-transparent">
                NAYANA
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#663399]/40 border border-[#663399]/60 text-[#E6C7E6] font-semibold">
                OS
              </span>
            </div>
            <p className="text-[10px] font-medium text-[#A3779D] tracking-widest uppercase">
              AI Placement OS
            </p>
          </div>
        </button>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3779D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anything... (e.g. DSA, Tasks, Companies, Notes)"
            className="w-full pl-10 pr-12 py-2 text-sm bg-[#15121A] border border-[#30283A] rounded-xl text-[#F5F1F5] placeholder-[#82778A] focus:outline-none focus:border-[#663399] focus:ring-1 focus:ring-[#663399] transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1D1824] border border-[#30283A] text-[#B9B0BD]">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Actions, Theme, Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* 24-Hr Emergency Mode Toggle */}
        <button
          onClick={() => {
            setEmergencyMode(!emergencyMode);
            if (!emergencyMode) setActiveTab('Company Prep');
          }}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            emergencyMode
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
              : 'bg-[#15121A] text-[#B9B0BD] border-[#30283A] hover:border-amber-400/50 hover:text-amber-300'
          }`}
          title="Interview tomorrow? Activate 24-Hour Emergency Preparation Mode"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{emergencyMode ? 'Emergency Mode Active' : '24h Prep Mode'}</span>
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => setActiveTab('Notifications')}
          className="relative p-2 rounded-xl text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A] border border-transparent hover:border-[#30283A] transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full border border-[#0D0B10]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Theme Switcher */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A] border border-transparent hover:border-[#30283A] transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-purple-400" />}
        </button>

        {/* Profile Card & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl bg-[#15121A] border border-[#30283A] hover:border-[#663399]/50 transition-colors"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-7 h-7 rounded-lg object-cover border border-[#663399]/40"
            />
            <div className="hidden lg:block text-left text-xs leading-tight">
              <p className="font-bold text-[#F5F1F5]">{profile.name}</p>
              <p className="text-[10px] text-[#A3779D]">KL University | CSIT</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#B9B0BD]" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 p-2 bg-[#15121A] border border-[#30283A] rounded-2xl shadow-xl z-50 animate-in fade-in">
              <div className="p-3 border-b border-[#30283A]">
                <p className="text-sm font-bold text-[#F5F1F5]">{profile.fullName}</p>
                <p className="text-xs text-[#A3779D]">{profile.course} • Batch {profile.batch}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                    CGPA: {profile.cgpa}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                    {profile.placementTarget}
                  </span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveTab('Settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#1D1824] rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 text-[#A3779D]" />
                  <span>Student Profile & Settings</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('Career Explorer');
                    setProfileDropdownOpen(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#1D1824] rounded-lg transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Career Explorer</span>
                </button>
                <a
                  href="https://kluniversity.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-3 py-2 text-xs text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#1D1824] rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-[#A3779D]" />
                    <span>Superset Portal (KL)</span>
                  </span>
                </a>
              </div>

              <div className="pt-1 border-t border-[#30283A]">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setActiveTab('Settings');
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out / Switch Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
