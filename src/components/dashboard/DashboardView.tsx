import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Calendar,
  Clock,
  Flame,
  CheckCircle2,
  Circle,
  MoreVertical,
  Plus,
  ArrowRight,
  Sparkles,
  Paperclip,
  Mic,
  Send,
  Building2,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  FileText,
  Code2,
  HelpCircle,
  Check,
} from 'lucide-react';
import { AddTaskModal } from '../modals/AddTaskModal';

export const DashboardView: React.FC = () => {
  const {
    profile,
    readiness,
    tasks,
    toggleTask,
    companies,
    skills,
    activities,
    setActiveTab,
    setShowBreakdownModal,
    chatMessages,
    sendChatMessage,
    setSelectedCompanyForPrep,
  } = useApp();

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [companyFilter, setCompanyFilter] = useState<'All' | 'Applied' | 'Upcoming' | 'Interested'>('All');
  const [quickInput, setQuickInput] = useState('');

  // Quick stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const todayTasks = tasks.slice(0, 4);

  // Skill bars for dashboard
  const featuredSkills = [
    { name: 'C', level: 90 },
    { name: 'Java', level: 50 },
    { name: 'Python', level: 40 },
    { name: 'DSA', level: 70 },
    { name: 'SQL', level: 60 },
    { name: 'OOP', level: 55 },
    { name: 'DBMS', level: 50 },
    { name: 'OS', level: 40 },
  ];

  // Filtered companies
  const filteredCompanies = companies.filter((c) => {
    if (companyFilter === 'All') return true;
    if (companyFilter === 'Applied') return c.applicationStatus === 'Applied';
    if (companyFilter === 'Upcoming') return c.applicationStatus === 'Eligible';
    if (companyFilter === 'Interested') return c.applicationStatus === 'Interested';
    return true;
  });

  const handleQuickSend = (prompt?: string) => {
    const textToSend = prompt || quickInput;
    if (!textToSend.trim()) return;
    sendChatMessage(textToSend);
    setQuickInput('');
  };

  // Readiness circle calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readiness.overallScore / 100) * circumference;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* 1. Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#15121A] via-[#1D1824] to-[#15121A] border border-[#30283A] shadow-xl relative overflow-hidden">
        {/* Subtle decorative purple glow background */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#663399]/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F5F1F5] tracking-tight">
              Good evening, Nayana! 👋
            </h1>
          </div>
          <p className="text-xs md:text-sm text-[#B9B0BD] mt-1 font-medium">
            {profile.course} • {profile.year} • {profile.batch} • {profile.college}
          </p>
          <p className="text-xs italic text-[#A3779D] mt-1.5 flex items-center gap-1.5">
            <span>&ldquo;Discipline today, opportunities tomorrow.&rdquo;</span>
          </p>
        </div>

        {/* Right date & schedule badge */}
        <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0D0B10]/80 border border-[#30283A] text-xs">
            <Calendar className="w-4 h-4 text-[#A3779D]" />
            <span className="font-semibold text-[#F5F1F5]">Monday, 25 Sep 2026</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2E1A47]/60 border border-[#663399]/40 text-xs text-[#E6C7E6] font-medium">
            <Clock className="w-4 h-4 text-purple-300" />
            <span>2 hrs planned today</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center text-sm">
            🌿
          </div>
        </div>
      </div>

      {/* 2. Top Row: Placement Readiness, Academic Profile, Today's Progress, Study Streak */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Placement Readiness */}
        <div className="p-4 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-md flex flex-col justify-between hover:border-[#663399]/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A3779D] uppercase tracking-wider">
              <span className="p-1 rounded bg-[#663399]/20 text-[#E6C7E6]">📈</span>
              <span>Placement Readiness</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              {readiness.statusLabel}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-3 items-center my-1">
            {/* SVG Donut */}
            <div className="col-span-5 flex flex-col items-center justify-center relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="#241D2D"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="#663399"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-[#F5F1F5]">{readiness.overallScore}%</span>
                <span className="text-[9px] text-[#A3779D] font-medium">On Track</span>
              </div>
            </div>

            {/* Category Bars */}
            <div className="col-span-7 space-y-1 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-[#B9B0BD]">Academics</span>
                <span className="font-bold text-[#F5F1F5]">{readiness.categories.academics.score}%</span>
              </div>
              <div className="w-full h-1 bg-[#1D1824] rounded-full overflow-hidden">
                <div className="h-full bg-[#663399]" style={{ width: `${readiness.categories.academics.score}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#B9B0BD]">Programming</span>
                <span className="font-bold text-[#F5F1F5]">{readiness.categories.programming.score}%</span>
              </div>
              <div className="w-full h-1 bg-[#1D1824] rounded-full overflow-hidden">
                <div className="h-full bg-[#A3779D]" style={{ width: `${readiness.categories.programming.score}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#B9B0BD]">DSA</span>
                <span className="font-bold text-[#F5F1F5]">{readiness.categories.dsa.score}%</span>
              </div>
              <div className="w-full h-1 bg-[#1D1824] rounded-full overflow-hidden">
                <div className="h-full bg-[#E6C7E6]" style={{ width: `${readiness.categories.dsa.score}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#B9B0BD]">Aptitude</span>
                <span className="font-bold text-[#F5F1F5]">{readiness.categories.aptitude.score}%</span>
              </div>
              <div className="w-full h-1 bg-[#1D1824] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: `${readiness.categories.aptitude.score}%` }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBreakdownModal(true)}
            className="mt-3 flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold text-[#E6C7E6] bg-[#1D1824] hover:bg-[#2E1A47] rounded-xl border border-[#30283A] transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Academic Profile */}
        <div className="p-4 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-md flex flex-col justify-between hover:border-[#663399]/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A3779D] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Academic Profile</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-[#E6C7E6] font-medium">
              Verified
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#F5F1F5] tracking-tight">{profile.cgpa}</span>
              <span className="text-sm font-semibold text-[#82778A]">/ 10</span>
            </div>
            <p className="text-[11px] text-[#A3779D] font-medium">CGPA (KL University)</p>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 py-2 border-y border-[#30283A]/70 text-xs">
            <div>
              <p className="text-[10px] text-[#82778A]">Backlogs</p>
              <p className="font-bold text-emerald-400">{profile.backlogs} (Clean)</p>
            </div>
            <div>
              <p className="text-[10px] text-[#82778A]">Graduation</p>
              <p className="font-bold text-[#F5F1F5]">{profile.expectedGraduation}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#82778A]">Course</p>
              <p className="font-bold text-[#F5F1F5] truncate">{profile.course}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#82778A]">Target CTC</p>
              <p className="font-bold text-purple-300">{profile.placementTarget}</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('Settings')}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold text-[#B9B0BD] hover:text-[#F5F1F5] bg-[#1D1824] hover:bg-[#2E1A47] rounded-xl border border-[#30283A] transition-colors"
          >
            <span>View Full Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Today's Progress */}
        <div className="p-4 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-md flex flex-col justify-between hover:border-[#663399]/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A3779D] uppercase tracking-wider">
              <span className="p-1 rounded bg-[#663399]/20 text-[#E6C7E6]">🎯</span>
              <span>Today&apos;s Progress</span>
            </div>
            <span className="text-[10px] font-semibold text-[#E6C7E6]">
              {completedTasks}/{totalTasks} Done
            </span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <div className="w-16 h-16 rounded-full border-4 border-[#663399] border-t-purple-300 flex flex-col items-center justify-center">
              <span className="text-base font-extrabold text-[#F5F1F5]">
                {completedTasks}/{totalTasks}
              </span>
              <span className="text-[8px] text-[#82778A]">Tasks</span>
            </div>

            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#B9B0BD]">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  DSA
                </span>
                <span className="font-semibold text-[#F5F1F5]">1/2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#B9B0BD]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  DBMS
                </span>
                <span className="font-semibold text-[#F5F1F5]">1/1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#B9B0BD]">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Java
                </span>
                <span className="font-semibold text-[#F5F1F5]">1/1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#B9B0BD]">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  Interview
                </span>
                <span className="font-semibold text-[#F5F1F5]">0/1</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('Today')}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#663399] to-[#8040BF] rounded-xl shadow-md shadow-[#663399]/30 hover:opacity-95 transition-opacity"
          >
            <span>▶ Continue Next Task</span>
          </button>
        </div>

        {/* Card 4: Study Streak */}
        <div className="p-4 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-md flex flex-col justify-between hover:border-[#663399]/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A3779D] uppercase tracking-wider">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Study Streak</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-bold">
              Active
            </span>
          </div>

          <div className="my-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-[#F5F1F5]">🔥 12</span>
              <span className="text-sm font-semibold text-orange-300">days</span>
            </div>
            <p className="text-[11px] text-[#A3779D]">Evening consistency record</p>
          </div>

          {/* Weekday check circles S M T W T F S */}
          <div className="flex items-center justify-between my-2 py-2 border-y border-[#30283A]/70">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => {
              const completed = idx < 6; // Mon-Fri active
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-semibold text-[#82778A]">{day}</span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      completed
                        ? 'bg-[#663399] text-white'
                        : 'bg-[#1D1824] text-[#82778A] border border-[#30283A]'
                    }`}
                  >
                    {completed ? <Check className="w-3 h-3 stroke-[3]" /> : ''}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#B9B0BD] italic">
            <span>🌿 &ldquo;Consistency is more powerful than motivation.&rdquo;</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: Today's Tasks, Upcoming Deadlines, Gemini Assistant Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Today's Tasks & Deadlines */}
        <div className="lg:col-span-8 space-y-6">
          {/* Today's Tasks */}
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#663399]" />
                <h2 className="text-base font-bold text-[#F5F1F5]">Today&apos;s Tasks</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1D1824] text-[#A3779D]">
                  {tasks.filter((t) => t.status === 'Completed').length} / {tasks.length}
                </span>
              </div>
              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#2E1A47] text-[#E6C7E6] hover:bg-[#663399] transition-colors border border-[#663399]/40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {todayTasks.map((t) => {
                const isCompleted = t.status === 'Completed';
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-[#15121A]/50 border-[#241D2D] opacity-75'
                        : 'bg-[#1D1824] border-[#30283A] hover:border-[#663399]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTask(t.id);
                        }}
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-[#4A3D59] hover:border-[#663399]'
                        }`}
                      >
                        {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isCompleted ? 'line-through text-[#82778A]' : 'text-[#F5F1F5]'
                          }`}
                        >
                          {t.title}
                        </p>
                        {t.description && (
                          <p className="text-xs text-[#82778A] line-clamp-1 mt-0.5">{t.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-[#A3779D]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{t.estimatedDurationMinutes} min</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          t.priority === 'Urgent' || t.priority === 'High'
                            ? 'bg-rose-500/20 text-rose-300'
                            : t.category === 'DSA'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-indigo-500/20 text-indigo-300'
                        }`}
                      >
                        {t.priority === 'High' ? 'High' : t.category}
                      </span>
                      <MoreVertical className="w-4 h-4 text-[#82778A]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <h2 className="text-base font-bold text-[#F5F1F5]">Upcoming Deadlines</h2>
              </div>
              <button
                onClick={() => setActiveTab('Companies')}
                className="text-xs font-semibold text-[#E6C7E6] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                    TCS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F5F1F5]">TCS Application Deadline</p>
                    <p className="text-[10px] text-[#A3779D]">Digital & Prime Registration</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  🚨 2 days
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                    JPMC
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F5F1F5]">JPMC Online Assessment</p>
                    <p className="text-[10px] text-[#A3779D]">HackerRank Coding Test</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  🔷 8 days
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    AT&T
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F5F1F5]">AT&T Campus Drive</p>
                    <p className="text-[10px] text-[#A3779D]">Tentative Placement Schedule</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#2E1A47] text-[#E6C7E6]">
                  12 days
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    KL
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F5F1F5]">College Full Stack Workshop</p>
                    <p className="text-[10px] text-[#A3779D]">KL Placement Training</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#2E1A47] text-[#E6C7E6]">
                  15 days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Gemini AI Assistant Panel (Matching Screenshot!) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-b from-[#15121A] to-[#1D1824] border border-[#30283A] shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#30283A]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#663399]/20 text-[#E6C7E6]">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F5F1F5]">Gemini AI Assistant</h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online</span>
              </div>
            </div>

            {/* Greeting & Persona Bubble */}
            <div className="mt-4 p-3.5 rounded-2xl bg-[#0D0B10]/80 border border-[#30283A] flex items-start gap-3">
              <img
                src={profile.avatarUrl}
                alt="Gemini Coach"
                className="w-9 h-9 rounded-full object-cover border border-[#663399]"
              />
              <div className="text-xs text-[#B9B0BD] leading-relaxed">
                <p className="font-semibold text-[#F5F1F5] mb-0.5">Hi Nayana! 👋</p>
                <p>
                  I&apos;m your AI Placement Coach. I can help you plan, track, learn, practice and get
                  placement-ready.
                </p>
              </div>
            </div>

            {/* Suggested Prompt Pills */}
            <div className="mt-4 space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-[#A3779D] font-semibold">
                Quick Prompts
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'What should I study today?',
                  'Create a 7-day plan for JPMC',
                  'Explain DBMS normalization',
                  'Review my resume',
                  'Give me DSA questions',
                  'Start mock interview',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleQuickSend(prompt)}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-[#15121A] hover:bg-[#2E1A47] text-[#E6C7E6] border border-[#30283A] hover:border-[#663399]/50 transition-colors text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Chat Input Area */}
          <div className="mt-6 pt-3 border-t border-[#30283A]">
            <div className="relative flex items-center bg-[#0D0B10] border border-[#30283A] rounded-xl px-2.5 py-1.5 focus-within:border-[#663399]">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickSend()}
                placeholder="Ask me anything about your preparation..."
                className="w-full bg-transparent text-xs text-[#F5F1F5] placeholder-[#82778A] focus:outline-none pr-16"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('Study Room')}
                  className="p-1 rounded-lg text-[#82778A] hover:text-[#E6C7E6]"
                  title="Upload Document / Notes"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('Interview Prep')}
                  className="p-1 rounded-lg text-[#82778A] hover:text-[#E6C7E6]"
                  title="Voice Mock Interview"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSend()}
                  className="p-1.5 rounded-lg bg-[#663399] text-white hover:bg-[#663399]/90 shadow-sm"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Target Companies, Skill Progress, Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Target Companies (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-bold text-[#F5F1F5]">Target Companies</h2>
            </div>
            <button
              onClick={() => setActiveTab('Target Companies')}
              className="text-xs font-semibold text-[#E6C7E6] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mb-3">
            {(['All', 'Applied', 'Upcoming', 'Interested'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setCompanyFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  companyFilter === tab
                    ? 'bg-[#663399] text-white font-semibold'
                    : 'bg-[#1D1824] text-[#B9B0BD] hover:text-[#F5F1F5]'
                }`}
              >
                {tab} {tab === 'All' ? `(${companies.length})` : ''}
              </button>
            ))}
          </div>

          {/* Companies List */}
          <div className="space-y-2.5">
            {filteredCompanies.slice(0, 4).map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedCompanyForPrep(c.id);
                  setActiveTab('Company Prep');
                }}
                className="p-3 rounded-xl bg-[#1D1824] border border-[#30283A] hover:border-[#663399]/60 cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2E1A47] border border-[#663399]/40 flex items-center justify-center font-bold text-xs text-[#E6C7E6]">
                    {c.name.slice(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F5F1F5]">{c.name}</p>
                    <p className="text-[10px] text-[#A3779D]">{c.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      c.applicationStatus === 'Applied'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {c.applicationStatus}
                  </span>
                  <div className="text-[10px] text-[#82778A]">
                    <span>📅 {c.applicationDeadline || 'Nov 2026'}</span>
                  </div>
                  <span className="text-xs font-bold text-[#E6C7E6]">Prep: {c.preparationPercentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Progress (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-[#F5F1F5]">Skill Progress</h2>
            </div>
            <button
              onClick={() => setActiveTab('Programming')}
              className="text-xs font-semibold text-[#E6C7E6] hover:underline flex items-center gap-1"
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {featuredSkills.map((sk) => (
              <div key={sk.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#B9B0BD]">{sk.name}</span>
                  <span className="font-bold text-[#F5F1F5]">{sk.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#0D0B10] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#663399] to-[#E6C7E6]"
                    style={{ width: `${sk.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity (3 cols) */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-[#15121A] border border-[#30283A] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#F5F1F5]">Recent Activity</h2>
            <button
              onClick={() => setActiveTab('Today')}
              className="text-xs font-semibold text-[#E6C7E6] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-2.5 text-xs">
                <div className="mt-0.5 p-1 rounded bg-[#663399]/20 text-[#E6C7E6]">
                  {act.type === 'dsa' && <Code2 className="w-3.5 h-3.5" />}
                  {act.type === 'test' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {act.type === 'resume' && <FileText className="w-3.5 h-3.5 text-purple-300" />}
                  {act.type === 'company' && <Building2 className="w-3.5 h-3.5 text-amber-300" />}
                  {act.type === 'task' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#F5F1F5] line-clamp-1">{act.description}</p>
                  <p className="text-[10px] text-[#82778A]">{act.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
    </div>
  );
};
