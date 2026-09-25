import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  User,
  Palette,
  Bell,
  Sparkles,
  Shield,
  Database,
  Cloud,
  Save,
  CheckCircle2,
  ExternalLink,
  Flame,
} from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const {
    profile,
    updateProfile,
    theme,
    setTheme,
    firebaseConfig,
    updateFirebaseConfig,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'Profile' | 'Appearance' | 'Firebase' | 'AI' | 'Privacy'>('Profile');

  // Profile form state
  const [name, setName] = useState(profile.name);
  const [fullName, setFullName] = useState(profile.fullName);
  const [college, setCollege] = useState(profile.college);
  const [course, setCourse] = useState(profile.course);
  const [batch, setBatch] = useState(profile.batch);
  const [cgpa, setCgpa] = useState(profile.cgpa);
  const [backlogs, setBacklogs] = useState(profile.backlogs);
  const [targetSalary, setTargetSalary] = useState(profile.placementTarget);
  const [leetcodeUrl, setLeetcodeUrl] = useState(profile.leetcodeUrl || '');
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Firebase config state
  const [projectId, setProjectId] = useState(firebaseConfig.projectId);
  const [apiKey, setApiKey] = useState(firebaseConfig.apiKey);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      fullName,
      college,
      course,
      batch,
      cgpa: Number(cgpa),
      backlogs: Number(backlogs),
      placementTarget: targetSalary,
      leetcodeUrl,
      githubUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveFirebase = (e: React.FormEvent) => {
    e.preventDefault();
    updateFirebaseConfig({
      projectId,
      apiKey,
      isConnected: true,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#E6C7E6]" />
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Settings & Integration</h1>
          </div>
          <p className="text-xs text-[#B9B0BD] mt-1">
            Configure student profile information, theme preferences, and Firebase Firestore/AI Logic credentials.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Changes Saved Successfully</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#30283A] pb-3">
        {[
          { id: 'Profile', icon: User, label: 'Student Profile' },
          { id: 'Appearance', icon: Palette, label: 'Appearance' },
          { id: 'Firebase', icon: Database, label: 'Firebase Architecture' },
          { id: 'AI', icon: Sparkles, label: 'AI Preferences' },
          { id: 'Privacy', icon: Shield, label: 'Data Management' },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSection === tab.id
                  ? 'bg-[#663399] text-white shadow-md shadow-[#663399]/30'
                  : 'text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#15121A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Student Profile Section */}
      {activeSection === 'Profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#F5F1F5] mb-2">Student & Academic Credentials</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">College / University</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">Course / Department</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">Batch</label>
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">Current CGPA</label>
              <input
                type="number"
                step="0.01"
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">Active Backlogs</label>
              <input
                type="number"
                value={backlogs}
                onChange={(e) => setBacklogs(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">Target Package</label>
              <input
                type="text"
                value={targetSalary}
                onChange={(e) => setTargetSalary(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">LeetCode Profile URL</label>
              <input
                type="url"
                value={leetcodeUrl}
                onChange={(e) => setLeetcodeUrl(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-[#30283A]">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#663399] text-white font-bold hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Updates</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. Appearance Section */}
      {activeSection === 'Appearance' && (
        <div className="p-6 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-5 text-xs">
          <div>
            <h2 className="text-base font-bold text-[#F5F1F5]">Theme & Color Mode</h2>
            <p className="text-xs text-[#B9B0BD] mt-0.5">
              Select between Dark Mode (default Royal Amethyst / Midnight Plum) and Light Mode.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border text-left transition-all ${
                theme === 'dark'
                  ? 'bg-[#1D1824] border-[#663399] shadow-lg shadow-[#663399]/20'
                  : 'bg-[#15121A] border-[#30283A]'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-[#0D0B10] border border-[#663399] mb-2 flex items-center justify-center text-xs">
                🌙
              </div>
              <p className="font-bold text-[#F5F1F5]">Dark Mode</p>
              <p className="text-[10px] text-[#A3779D]">Default Midnight Plum palette</p>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border text-left transition-all ${
                theme === 'light'
                  ? 'bg-purple-100 border-[#663399] text-black shadow-lg shadow-[#663399]/20'
                  : 'bg-[#15121A] border-[#30283A]'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white border border-[#663399] mb-2 flex items-center justify-center text-xs">
                ☀️
              </div>
              <p className="font-bold text-[#F5F1F5]">Light Mode</p>
              <p className="text-[10px] text-[#A3779D]">High-contrast day theme</p>
            </button>
          </div>
        </div>
      )}

      {/* 3. Firebase Architecture & Config */}
      {activeSection === 'Firebase' && (
        <form onSubmit={handleSaveFirebase} className="p-6 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-5 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#663399]/30 text-[#E6C7E6] font-bold">
                Firebase AI Logic & Firestore
              </span>
              <span className="text-xs text-emerald-400 font-semibold">Local-First Storage Active</span>
            </div>
            <h2 className="text-base font-bold text-[#F5F1F5] mt-1">Firebase Configuration & Rules</h2>
            <p className="text-xs text-[#B9B0BD] mt-0.5">
              The application uses a local-first storage adapter with Firebase Firestore sync capability. Connect your Firebase project ID to synchronize data across devices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">Firebase Project ID</label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="nayana-placement-os"
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
            <div>
              <label className="block text-[#A3779D] font-semibold mb-1">API Key (Optional / Configured in .env)</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Configured server-side"
                className="w-full px-3.5 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
              />
            </div>
          </div>

          {/* Firestore Rules Blueprint */}
          <div className="p-4 rounded-xl bg-[#0D0B10] border border-[#30283A] space-y-2">
            <p className="font-bold text-[#E6C7E6]">Firestore Security Blueprint:</p>
            <pre className="text-[11px] font-mono text-[#B9B0BD] overflow-x-auto p-2 bg-[#15121A] rounded-lg">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`}
            </pre>
            <p className="text-[10px] text-[#82778A]">
              Ensures that Nayana&apos;s academic credentials and interview recordings remain completely private.
            </p>
          </div>

          <div className="flex justify-end pt-2 border-t border-[#30283A]">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#663399] text-white font-bold hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
            >
              Update Firebase Configuration
            </button>
          </div>
        </form>
      )}

      {/* 4. AI Preferences */}
      {activeSection === 'AI' && (
        <div className="p-6 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#F5F1F5]">Gemini AI Placement Coach Tuning</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#F5F1F5]">Strict Mentor Mode</p>
                <p className="text-[11px] text-[#B9B0BD]">
                  Coach gives direct constructive feedback when 2-hour daily evening goals are missed.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Enabled
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#F5F1F5]">Action Confirmation Gate</p>
                <p className="text-[11px] text-[#B9B0BD]">
                  Always prompt for confirmation before modifying or adding tasks in your planner.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Privacy & Data Management */}
      {activeSection === 'Privacy' && (
        <div className="p-6 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#F5F1F5]">Data Management & Reset</h2>
          <p className="text-xs text-[#B9B0BD]">
            Your data is stored locally with persistent browser caching. You can export a JSON backup or reset to initial seeded state.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                const data = localStorage.getItem('nayana_placement_os_state_v1_profile');
                const blob = new Blob([data || '{}'], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Nayana_Placement_OS_Backup.json';
                a.click();
              }}
              className="px-4 py-2 rounded-xl bg-[#1D1824] border border-[#30283A] font-semibold text-[#F5F1F5] hover:bg-[#2E1A47]"
            >
              Export JSON Backup
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset local state to default initial profile?')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold hover:bg-rose-500/30"
            >
              Reset to Factory Seed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
