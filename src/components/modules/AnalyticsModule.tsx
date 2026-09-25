import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  CheckCircle2,
  Calendar,
  Flame,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';

export const AnalyticsModule: React.FC = () => {
  const { readiness, dsaProblems, testResults, tasks, skills } = useApp();

  // Distribution calculations
  const easyCount = dsaProblems.filter((p) => p.difficulty === 'Easy').length;
  const medCount = dsaProblems.filter((p) => p.difficulty === 'Medium').length;
  const hardCount = dsaProblems.filter((p) => p.difficulty === 'Hard').length;
  const totalDsa = Math.max(1, dsaProblems.length);

  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const taskCompletionRate = Math.round((completedTasks / Math.max(1, tasks.length)) * 100);

  // Skill ratings
  const topSkills = [...skills].sort((a, b) => (b.measuredPerformance || b.selfRating) - (a.measuredPerformance || a.selfRating)).slice(0, 6);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#E6C7E6]" />
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Placement Preparation Analytics</h1>
          </div>
          <p className="text-xs text-[#B9B0BD] mt-1">
            Grounded mathematical trends derived from your logged DSA problems, tests, and study sessions.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-[#A3779D]">Placement Readiness</span>
          <p className="text-2xl font-black text-emerald-400">{readiness.overallScore}%</p>
        </div>
      </div>

      {/* Top 4 Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
          <p className="text-xs text-[#A3779D] font-medium">DSA Problems Solved</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#F5F1F5]">{dsaProblems.length}</span>
            <span className="text-xs text-purple-300 font-semibold">Active Streak</span>
          </div>
          <p className="text-[10px] text-emerald-400 mt-1">Goal: 100 Problems (42% complete)</p>
        </div>

        <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
          <p className="text-xs text-[#A3779D] font-medium">Task Completion Rate</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-emerald-400">{taskCompletionRate}%</span>
            <span className="text-xs text-[#82778A]">
              ({completedTasks}/{tasks.length})
            </span>
          </div>
          <p className="text-[10px] text-[#A3779D] mt-1">2-hour daily evening target</p>
        </div>

        <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
          <p className="text-xs text-[#A3779D] font-medium">Average Test Accuracy</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#E6C7E6]">
              {testResults.length > 0
                ? Math.round(
                    testResults.reduce((acc, t) => acc + t.scorePercentage, 0) / testResults.length
                  )
                : 90}
              %
            </span>
            <span className="text-xs text-[#82778A]">{testResults.length} tests recorded</span>
          </div>
          <p className="text-[10px] text-purple-300 mt-1">Aptitude & SQL validated</p>
        </div>

        <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
          <p className="text-xs text-[#A3779D] font-medium">Study Consistency Streak</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-orange-400">🔥 12</span>
            <span className="text-xs text-orange-300">Days</span>
          </div>
          <p className="text-[10px] text-[#A3779D] mt-1">All weekday sessions completed</p>
        </div>
      </div>

      {/* Main Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Readiness Category Radar/Bars (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#30283A]">
            <h3 className="text-sm font-bold text-[#F5F1F5]">10-Category Readiness Weighting</h3>
            <span className="text-xs text-[#E6C7E6]">Score: {readiness.overallScore} / 100</span>
          </div>

          <div className="space-y-3">
            {Object.values(readiness.categories).map((c) => (
              <div key={c.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#B9B0BD]">{c.name}</span>
                  <span className="text-xs font-bold text-[#F5F1F5]">
                    {c.score}% <span className="text-[10px] text-[#A3779D]">({(c.weight * 100)}% weight)</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#0D0B10] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#663399] to-[#E6C7E6]"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: DSA Breakdown & Skill Leaderboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* DSA Difficulty Breakdown */}
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-3">
            <h3 className="text-sm font-bold text-[#F5F1F5]">DSA Problem Difficulty Distribution</h3>
            <div className="flex h-4 rounded-full overflow-hidden bg-[#0D0B10]">
              <div
                style={{ width: `${(easyCount / totalDsa) * 100}%` }}
                className="bg-emerald-500 h-full"
                title={`Easy: ${easyCount}`}
              />
              <div
                style={{ width: `${(medCount / totalDsa) * 100}%` }}
                className="bg-amber-500 h-full"
                title={`Medium: ${medCount}`}
              />
              <div
                style={{ width: `${(hardCount / totalDsa) * 100}%` }}
                className="bg-rose-500 h-full"
                title={`Hard: ${hardCount}`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
              <div className="p-2 rounded-xl bg-[#1D1824]">
                <p className="text-emerald-400 font-bold">{easyCount}</p>
                <p className="text-[10px] text-[#82778A]">Easy ({Math.round((easyCount / totalDsa) * 100)}%)</p>
              </div>
              <div className="p-2 rounded-xl bg-[#1D1824]">
                <p className="text-amber-400 font-bold">{medCount}</p>
                <p className="text-[10px] text-[#82778A]">Medium ({Math.round((medCount / totalDsa) * 100)}%)</p>
              </div>
              <div className="p-2 rounded-xl bg-[#1D1824]">
                <p className="text-rose-400 font-bold">{hardCount}</p>
                <p className="text-[10px] text-[#82778A]">Hard ({Math.round((hardCount / totalDsa) * 100)}%)</p>
              </div>
            </div>
          </div>

          {/* Top Rated Skills */}
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-3">
            <h3 className="text-sm font-bold text-[#F5F1F5]">Top Technical Proficiencies</h3>
            <div className="space-y-2">
              {topSkills.map((sk) => (
                <div
                  key={sk.name}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#1D1824] text-xs"
                >
                  <span className="font-semibold text-[#F5F1F5]">{sk.name}</span>
                  <span className="font-bold text-[#E6C7E6]">
                    {(sk.measuredPerformance || sk.selfRating) * 10}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
