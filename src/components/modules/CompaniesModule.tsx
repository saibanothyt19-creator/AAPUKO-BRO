import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Plus,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  FileText,
  UserCheck,
  Zap,
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

interface CompaniesModuleProps {
  initialTab?: 'Target Companies' | 'Applications' | 'Drives' | 'Company Prep';
}

export const CompaniesModule: React.FC<CompaniesModuleProps> = ({ initialTab = 'Target Companies' }) => {
  const {
    companies,
    updateCompany,
    addCompany,
    togglePrepTopic,
    profile,
    emergencyMode,
    setEmergencyMode,
    selectedCompanyForPrep,
    setSelectedCompanyForPrep,
    setActiveTab,
  } = useApp();

  const [activeTab, setActiveTabState] = useState(initialTab);
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);

  // New company form state
  const [newCompName, setNewCompName] = useState('');
  const [newCompRole, setNewCompRole] = useState('Software Engineer');
  const [newCompCTC, setNewCompCTC] = useState('8 - 12 LPA');
  const [newCompLocation, setNewCompLocation] = useState('Hyderabad');
  const [newCompMinCgpa, setNewCompMinCgpa] = useState(7.0);

  const selectedComp =
    companies.find((c) => c.id === selectedCompanyForPrep) || companies[0];

  const handleAddCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    addCompany({
      name: newCompName.trim(),
      logo: 'https://logo.clearbit.com/generic.com',
      role: newCompRole,
      ctc: newCompCTC,
      location: newCompLocation,
      eligibility: {
        minCgpa: Number(newCompMinCgpa) || 7.0,
        maxBacklogs: 0,
        allowedBranches: ['CSIT', 'CSE'],
        graduationYear: '2027',
        studentEligible: profile.cgpa >= Number(newCompMinCgpa) && profile.backlogs === 0,
      },
      applicationStatus: 'Interested',
      preparationPercentage: 20,
      prepTopics: [
        { name: 'Core DSA & Algorithms', completed: false },
        { name: 'OOP & System Concepts', completed: false },
        { name: 'Company Prior Assessment Patterns', completed: false },
      ],
    });

    setNewCompName('');
    setIsAddCompanyOpen(false);
  };

  const statusColors: Record<ApplicationStatus, string> = {
    Interested: 'bg-blue-500/20 text-blue-300',
    Eligible: 'bg-purple-500/20 text-purple-300',
    Applied: 'bg-indigo-500/20 text-indigo-300',
    Assessment: 'bg-amber-500/20 text-amber-300',
    'Technical Interview': 'bg-cyan-500/20 text-cyan-300',
    'HR Interview': 'bg-violet-500/20 text-violet-300',
    Selected: 'bg-emerald-500/20 text-emerald-300',
    Rejected: 'bg-rose-500/20 text-rose-300',
    Withdrawn: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* 24-Hour Emergency Mode Alert Banner */}
      {emergencyMode && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-[#15121A] to-rose-950/40 border-2 border-rose-500/60 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/30 text-rose-300 border border-rose-500/50">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500 text-white font-extrabold uppercase">
                  Emergency Mode Active
                </span>
                <span className="text-xs text-rose-300 font-semibold">
                  24-Hour Interview Readiness Sprint
                </span>
              </div>
              <p className="text-sm font-bold text-[#F5F1F5] mt-0.5">
                Targeted quick-revision checklist activated for your interview tomorrow.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('Interview Prep')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-500"
            >
              Start Rapid Technical Drill
            </button>
            <button
              onClick={() => setEmergencyMode(false)}
              className="px-3 py-2 text-xs font-medium text-[#B9B0BD] hover:text-[#F5F1F5] bg-[#1D1824] rounded-xl"
            >
              Exit Emergency Mode
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#E6C7E6]" />
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Company Pipeline & Drives</h1>
          </div>
          <p className="text-xs text-[#B9B0BD] mt-1">
            Track individual company eligibility cutoffs, Superset college drives, and tailored interview sprints.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0D0B10] border border-[#30283A]">
          {(['Target Companies', 'Applications', 'Drives', 'Company Prep'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTabState(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-[#663399] text-white shadow-md shadow-[#663399]/30'
                  : 'text-[#B9B0BD] hover:text-[#F5F1F5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Target Companies View */}
      {activeTab === 'Target Companies' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#A3779D] font-semibold uppercase tracking-wider">
              {companies.length} Tracked Target Companies
            </p>
            <button
              onClick={() => setIsAddCompanyOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Target Company</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map((c) => {
              const meetsEligibility =
                profile.cgpa >= c.eligibility.minCgpa && profile.backlogs <= c.eligibility.maxBacklogs;

              return (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] hover:border-[#663399]/60 transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#2E1A47] border border-[#663399]/40 flex items-center justify-center font-bold text-sm text-[#E6C7E6]">
                          {c.name.slice(0, 3).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-[#F5F1F5]">{c.name}</h3>
                            {c.portalLink && (
                              <a
                                href={c.portalLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#82778A] hover:text-[#E6C7E6]"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-[#A3779D] font-medium">{c.role}</p>
                        </div>
                      </div>

                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                          statusColors[c.applicationStatus] || 'bg-gray-500/20 text-gray-300'
                        }`}
                      >
                        {c.applicationStatus}
                      </span>
                    </div>

                    {/* Compensation & Location */}
                    <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-[#0D0B10] border border-[#30283A]/70 text-xs">
                      <div>
                        <p className="text-[10px] text-[#82778A]">Expected CTC</p>
                        <p className="font-bold text-[#E6C7E6]">{c.ctc}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#82778A]">Locations</p>
                        <p className="font-bold text-[#F5F1F5] truncate">{c.location}</p>
                      </div>
                    </div>

                    {/* Eligibility details */}
                    <div className="p-3 rounded-xl bg-[#1D1824] border border-[#30283A] text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#A3779D]">Eligibility Cutoff:</span>
                        <span className="font-bold text-[#F5F1F5]">
                          Min CGPA: {c.eligibility.minCgpa} • 0 Backlogs
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#A3779D]">Nayana Status:</span>
                        <span
                          className={`font-bold flex items-center gap-1 ${
                            meetsEligibility ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {meetsEligibility ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Eligible (CGPA 9.17)</span>
                            </>
                          ) : (
                            'Criteria Check Required'
                          )}
                        </span>
                      </div>
                      {c.notes && (
                        <p className="text-[10px] text-[#82778A] italic pt-1 border-t border-[#30283A]/50">
                          {c.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preparation Bar & Action */}
                  <div className="pt-2 border-t border-[#30283A]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#A3779D]">Preparation Progress</span>
                      <span className="font-bold text-[#E6C7E6]">{c.preparationPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#0D0B10] overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#663399] to-[#E6C7E6]"
                        style={{ width: `${c.preparationPercentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#82778A]">
                        Deadline: {c.applicationDeadline || 'Pending'}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedCompanyForPrep(c.id);
                          setActiveTabState('Company Prep');
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-[#E6C7E6] hover:underline"
                      >
                        <span>Open Prep Sprint</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Company Prep View */}
      {activeTab === 'Company Prep' && selectedComp && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#15121A] via-[#1D1824] to-[#2E1A47] border border-[#30283A] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#663399]/40 border border-[#663399] text-[#E6C7E6] font-bold">
                  Target Company Focus
                </span>
                <span className="text-xs text-amber-300 font-semibold">
                  Deadline: {selectedComp.applicationDeadline || 'Approaching'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#F5F1F5]">
                {selectedComp.name} – {selectedComp.role}
              </h2>
              <p className="text-xs text-[#B9B0BD] mt-1">
                Package: {selectedComp.ctc} • Location: {selectedComp.location} • Preparation: {selectedComp.preparationPercentage}%
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTab('Gemini AI');
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#663399] text-white font-bold text-xs hover:bg-[#663399]/90 shadow-lg shadow-[#663399]/30"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Generate 7-Day {selectedComp.name} Evening Plan</span>
            </button>
          </div>

          {/* Prep Topics Checklist */}
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
            <h3 className="text-base font-bold text-[#F5F1F5] mb-3">
              Required Preparation Milestones for {selectedComp.name}
            </h3>

            <div className="space-y-2.5">
              {selectedComp.prepTopics.map((topic, idx) => (
                <div
                  key={idx}
                  onClick={() => togglePrepTopic(selectedComp.id, idx)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                    topic.completed
                      ? 'bg-[#15121A] border-[#241D2D] opacity-80'
                      : 'bg-[#1D1824] border-[#30283A] hover:border-[#663399]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        topic.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-[#4A3D59]'
                      }`}
                    >
                      {topic.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <span
                      className={`text-xs font-semibold ${
                        topic.completed ? 'line-through text-[#82778A]' : 'text-[#F5F1F5]'
                      }`}
                    >
                      {topic.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A3779D]">
                    {topic.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Applications Pipeline View */}
      {activeTab === 'Applications' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A]">
            <h2 className="text-base font-bold text-[#F5F1F5]">KL Superset Placement Pipeline</h2>
            <p className="text-xs text-[#B9B0BD]">
              Track your stage progression from registration on Superset to online assessments and technical interview rounds.
            </p>
          </div>

          <div className="space-y-3">
            {companies.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[#15121A] border border-[#30283A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2E1A47] flex items-center justify-center font-bold text-xs text-[#E6C7E6]">
                    {c.name.slice(0, 3)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F1F5]">{c.name}</h3>
                    <p className="text-xs text-[#A3779D]">{c.role} • {c.ctc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={c.applicationStatus}
                    onChange={(e) => updateCompany(c.id, { applicationStatus: e.target.value as any })}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1D1824] border border-[#30283A] text-[#F5F1F5]"
                  >
                    <option value="Interested">Interested</option>
                    <option value="Eligible">Eligible</option>
                    <option value="Applied">Applied</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Technical Interview">Technical Interview</option>
                    <option value="HR Interview">HR Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Drives View */}
      {activeTab === 'Drives' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A]">
            <h2 className="text-base font-bold text-[#F5F1F5]">Upcoming College Placement Drives</h2>
            <p className="text-xs text-[#B9B0BD]">
              Real campus drive schedules coordinated via KL University Superset portal.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#15121A] border border-rose-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500 text-white font-bold">
                  Immediate Drive
                </span>
                <h3 className="text-base font-bold text-[#F5F1F5]">TCS Digital & Prime Drive</h3>
              </div>
              <span className="text-xs font-bold text-rose-400">2 Days Left</span>
            </div>
            <p className="text-xs text-[#B9B0BD]">
              Registration on Superset ends 28 Sep 2026. Online Assessment scheduled for 05 Oct 2026. Required criteria: CGPA 6.0 (Nayana: 9.17 ✅), 0 Backlogs ✅.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setSelectedCompanyForPrep('comp-tcs');
                  setActiveTabState('Company Prep');
                }}
                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90"
              >
                Open TCS Sprint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Company Modal */}
      {isAddCompanyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#15121A] border border-[#30283A] rounded-2xl p-6 text-[#F5F1F5]">
            <h2 className="text-base font-bold text-[#E6C7E6] mb-4">Add Target Company</h2>
            <form onSubmit={handleAddCompanySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A3779D] font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  placeholder="e.g. Microsoft, Oracle, Qualcomm"
                  className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                />
              </div>

              <div>
                <label className="block text-[#A3779D] font-semibold mb-1">Target Role</label>
                <input
                  type="text"
                  value={newCompRole}
                  onChange={(e) => setNewCompRole(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A3779D] font-semibold mb-1">CTC Range</label>
                  <input
                    type="text"
                    value={newCompCTC}
                    onChange={(e) => setNewCompCTC(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                  />
                </div>
                <div>
                  <label className="block text-[#A3779D] font-semibold mb-1">Min CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newCompMinCgpa}
                    onChange={(e) => setNewCompMinCgpa(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#30283A]">
                <button
                  type="button"
                  onClick={() => setIsAddCompanyOpen(false)}
                  className="px-4 py-2 text-[#B9B0BD] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#663399] text-white rounded-xl"
                >
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
