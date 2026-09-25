import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, HelpCircle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const ReadinessBreakdownModal: React.FC = () => {
  const { readiness, showBreakdownModal, setShowBreakdownModal, setActiveTab } = useApp();

  if (!showBreakdownModal) return null;

  const categories = Object.values(readiness.categories);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#15121A] border border-[#30283A] rounded-2xl shadow-2xl p-6 text-[#F5F1F5]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#30283A]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#663399]/20 border border-[#663399]/40 text-[#E6C7E6]">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Placement Readiness Engine Breakdown
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#663399] text-[#F5F1F5] font-semibold">
                  {readiness.overallScore}% Overall
                </span>
              </h2>
              <p className="text-sm text-[#B9B0BD] mt-0.5">
                Every percentage point is mathematically calculated from your actual profile, skills, and activities.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowBreakdownModal(false)}
            className="p-1.5 rounded-lg text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#1D1824] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Callout */}
        <div className="my-5 p-4 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <p className="text-xs text-[#B9B0BD] font-medium uppercase tracking-wider">Placement Status</p>
              <p className="text-base font-semibold text-[#E6C7E6]">{readiness.statusLabel}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#B9B0BD]">Target For Top Tier (JPMC/Google)</p>
            <p className="text-sm font-bold text-emerald-400">85%+ Placement Ready</p>
          </div>
        </div>

        {/* Breakdown table / list */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A3779D]">
            Weighted Category Contributions (100% Total)
          </h3>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="p-3.5 rounded-xl bg-[#1D1824]/60 border border-[#30283A] hover:border-[#663399]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#F5F1F5]">{cat.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#2E1A47] text-[#E6C7E6]">
                      Weight: {Math.round(cat.weight * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#B9B0BD]">Performance: {cat.score}%</span>
                    <span className="text-sm font-bold text-[#E6C7E6]">
                      +{cat.contributedScore.toFixed(1)} pts
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-[#0D0B10] overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#663399] to-[#E6C7E6] transition-all duration-500"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>

                {/* Explanation & Tip */}
                <p className="text-xs text-[#B9B0BD] mb-1">{cat.explanation}</p>
                <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Action to improve: {cat.improvementTip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-[#30283A] flex items-center justify-between">
          <button
            onClick={() => {
              setShowBreakdownModal(false);
              setActiveTab('Gemini AI');
            }}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-[#2E1A47] text-[#E6C7E6] hover:bg-[#663399]/40 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            Ask Gemini how to reach 85% readiness
          </button>
          <button
            onClick={() => setShowBreakdownModal(false)}
            className="px-5 py-2 text-sm font-medium rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 transition-colors shadow-lg shadow-[#663399]/30"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
