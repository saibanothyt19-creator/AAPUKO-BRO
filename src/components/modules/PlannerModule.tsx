import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Clock,
  Sparkles,
  Plus,
  CheckCircle2,
  Circle,
  MoreVertical,
  Flame,
  TrendingUp,
  Target,
  ChevronRight,
  Check,
} from 'lucide-react';
import { AddTaskModal } from '../modals/AddTaskModal';
import confetti from 'canvas-confetti';

interface PlannerModuleProps {
  initialTab?: 'Today' | 'Calendar' | 'Goals';
}

export const PlannerModule: React.FC<PlannerModuleProps> = ({ initialTab = 'Today' }) => {
  const { tasks, toggleTask, addTask, goals, toggleGoal, addGoal, profile, readiness } = useApp();
  const [plannerTab, setPlannerTab] = useState(initialTab);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // New goal state
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDate, setGoalDate] = useState('2026-10-31');
  const [goalCat, setGoalCat] = useState('DSA');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((t) => t.dueDate === todayStr || !t.dueDate);
  const completedTodayCount = todayTasks.filter((t) => t.status === 'Completed').length;
  const totalMinutesPlanned = todayTasks.reduce((acc, t) => acc + t.estimatedDurationMinutes, 0);

  // "Generate My Day" handler using Gemini
  const handleGenerateMyDay = async () => {
    setIsGeneratingPlan(true);

    try {
      const res = await fetch('/api/gemini/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          availableMinutes: 120, // 2-hour evening study limit
          context: {
            profile,
            readiness: readiness.overallScore,
            targetCompanies: ['JPMC', 'TCS', 'Google', 'AT&T'],
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.tasks?.length) {
          data.tasks.forEach((t: any) => {
            addTask({
              title: t.title,
              category: t.category || 'Study',
              priority: t.priority || 'Medium',
              estimatedDurationMinutes: t.estimatedDurationMinutes || 30,
              dueDate: todayStr,
              status: 'Pending',
            });
          });
          confetti({ particleCount: 50, spread: 70 });
        }
      }
    } catch {
      // Fallback 2-hour evening tasks
      addTask({
        title: 'DSA: Sliding Window on LeetCode (2 problems)',
        category: 'DSA',
        priority: 'High',
        estimatedDurationMinutes: 45,
        dueDate: todayStr,
        status: 'Pending',
      });
      addTask({
        title: 'Java OOP: Abstract Classes vs Interfaces in Bytecode',
        category: 'Study',
        priority: 'High',
        estimatedDurationMinutes: 35,
        dueDate: todayStr,
        status: 'Pending',
      });
      addTask({
        title: 'DBMS: BCNF vs 3NF Dependency Preservation',
        category: 'Study',
        priority: 'Medium',
        estimatedDurationMinutes: 25,
        dueDate: todayStr,
        status: 'Pending',
      });
      addTask({
        title: 'Elevator Pitch Practice: Laptop Support Assistant RAG',
        category: 'Practice',
        priority: 'Medium',
        estimatedDurationMinutes: 15,
        dueDate: todayStr,
        status: 'Pending',
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleAddGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    addGoal({
      title: goalTitle.trim(),
      targetDate: goalDate,
      progressPercentage: 10,
      category: goalCat,
      completed: false,
    });

    setGoalTitle('');
    setIsAddGoalOpen(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-[#E6C7E6]" />
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Daily Planner & Study Routine</h1>
          </div>
          <p className="text-xs text-[#B9B0BD] mt-1">
            Engineered around your 2 hours/day evening study preference to prevent burnout while maximizing placement readiness.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0D0B10] border border-[#30283A]">
          {(['Today', 'Calendar', 'Goals'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPlannerTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                plannerTab === tab
                  ? 'bg-[#663399] text-white shadow-md shadow-[#663399]/30'
                  : 'text-[#B9B0BD] hover:text-[#F5F1F5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Today View */}
      {plannerTab === 'Today' && (
        <div className="space-y-6">
          {/* Hero Action Card: 2-Hour Evening Routine & "Generate My Day" */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#15121A] via-[#1D1824] to-[#2E1A47] border border-[#30283A] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#663399]/40 border border-[#663399] text-[#E6C7E6] font-bold">
                  Evening Study Budget
                </span>
                <span className="text-xs text-amber-300 font-semibold">
                  ⏱️ {totalMinutesPlanned} mins allocated (Target: 120 mins)
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#F5F1F5]">
                Today&apos;s Evening Preparation Sprint
              </h2>
              <p className="text-xs text-[#B9B0BD] leading-relaxed">
                Gemini balances your evening routine between high-weight DSA, Java collections revision for JPMC, and quick project pitches.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={isGeneratingPlan}
                onClick={handleGenerateMyDay}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#663399] text-white font-bold text-xs hover:bg-[#663399]/90 shadow-lg shadow-[#663399]/30 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span>{isGeneratingPlan ? 'Generating 2h Plan...' : 'Generate My Day'}</span>
              </button>
              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#1D1824] border border-[#30283A] text-xs font-semibold text-[#F5F1F5] hover:bg-[#2E1A47] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Today's Tasks List */}
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#30283A]">
              <span className="text-xs font-bold text-[#A3779D] uppercase tracking-wider">
                Scheduled Tasks ({completedTodayCount}/{todayTasks.length} Completed)
              </span>
              <span className="text-xs text-[#E6C7E6] font-medium">
                {Math.round((completedTodayCount / Math.max(1, todayTasks.length)) * 100)}% Complete
              </span>
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
                        ? 'bg-[#15121A] border-[#241D2D] opacity-75'
                        : 'bg-[#1D1824] border-[#30283A] hover:border-[#663399]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-[#4A3D59]'
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
                          t.priority === 'High' || t.priority === 'Urgent'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. Calendar & Weekly Review */}
      {plannerTab === 'Calendar' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-4">
            <h2 className="text-base font-bold text-[#F5F1F5]">Weekly Study Cadence & Review</h2>
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                <div key={d} className="p-3 rounded-xl bg-[#1D1824] border border-[#30283A]">
                  <p className="font-bold text-[#A3779D]">{d}</p>
                  <p className="text-sm font-extrabold text-[#F5F1F5] my-1">{20 + i} Sep</p>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      i < 6 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {i < 6 ? '2 hrs done' : 'Planned'}
                  </span>
                </div>
              ))}
            </div>

            {/* Weekly Summary */}
            <div className="p-4 rounded-xl bg-[#0D0B10] border border-[#30283A] text-xs text-[#B9B0BD] space-y-1.5">
              <p className="font-bold text-[#E6C7E6]">Gemini Weekly Retrospective:</p>
              <p>
                - <strong>What Improved:</strong> DSA Arrays & Two-pointer speed increased by 18%; SQL basics quiz achieved 86.6%.
              </p>
              <p>
                - <strong>Attention Required:</strong> Java Collections internal hashing and DBMS normalization anomalies need 2 focused evening blocks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Goals View */}
      {plannerTab === 'Goals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#F5F1F5]">Placement Key Results & Goals</h2>
              <p className="text-xs text-[#B9B0BD]">High-level milestones before 4th-year placements close.</p>
            </div>
            <button
              onClick={() => setIsAddGoalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((g) => (
              <div
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  g.completed
                    ? 'bg-[#15121A] border-[#241D2D] opacity-80'
                    : 'bg-[#1D1824] border-[#30283A] hover:border-[#663399]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#2E1A47] text-[#E6C7E6] font-semibold">
                    {g.category}
                  </span>
                  <span className="text-xs font-bold text-[#E6C7E6]">{g.progressPercentage}%</span>
                </div>

                <h3
                  className={`text-sm font-bold ${
                    g.completed ? 'line-through text-[#82778A]' : 'text-[#F5F1F5]'
                  }`}
                >
                  {g.title}
                </h3>

                <div className="w-full h-1.5 rounded-full bg-[#0D0B10] overflow-hidden my-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#663399] to-[#E6C7E6]"
                    style={{ width: `${g.progressPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#82778A]">
                  <span>Target Date: {g.targetDate}</span>
                  <span className={g.completed ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                    {g.completed ? 'Achieved' : 'In Progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />

      {/* Add Goal Modal */}
      {isAddGoalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#15121A] border border-[#30283A] rounded-2xl p-6 text-[#F5F1F5]">
            <h2 className="text-base font-bold text-[#E6C7E6] mb-4">Add Placement Goal</h2>
            <form onSubmit={handleAddGoalSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A3779D] font-semibold mb-1">Goal Title *</label>
                <input
                  type="text"
                  required
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. Master Graph BFS/DFS for Google round"
                  className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A3779D] font-semibold mb-1">Target Date</label>
                  <input
                    type="date"
                    value={goalDate}
                    onChange={(e) => setGoalDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                  />
                </div>
                <div>
                  <label className="block text-[#A3779D] font-semibold mb-1">Category</label>
                  <select
                    value={goalCat}
                    onChange={(e) => setGoalCat(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                  >
                    <option value="DSA">DSA</option>
                    <option value="Programming">Programming</option>
                    <option value="Company Prep">Company Prep</option>
                    <option value="Projects">Projects</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#30283A]">
                <button
                  type="button"
                  onClick={() => setIsAddGoalOpen(false)}
                  className="px-4 py-2 text-[#B9B0BD] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#663399] text-white rounded-xl"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
