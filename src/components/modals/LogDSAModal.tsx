import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Code2, Link as LinkIcon, CheckCircle } from 'lucide-react';

interface LogDSAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogDSAModal: React.FC<LogDSAModalProps> = ({ isOpen, onClose }) => {
  const { logDSAProblem } = useApp();

  const [problemName, setProblemName] = useState('');
  const [platform, setPlatform] = useState<'LeetCode' | 'HackerRank' | 'CodeChef' | 'Other'>('LeetCode');
  const [topic, setTopic] = useState('Arrays & Hashing');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [timeTakenMinutes, setTimeTakenMinutes] = useState(25);
  const [solvedIndependently, setSolvedIndependently] = useState(true);
  const [needRevision, setNeedRevision] = useState(false);
  const [notes, setNotes] = useState('');
  const [solutionLink, setSolutionLink] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemName.trim()) return;

    logDSAProblem({
      problemName: problemName.trim(),
      platform,
      topic,
      difficulty,
      dateSolved: new Date().toISOString().split('T')[0],
      timeTakenMinutes: Number(timeTakenMinutes) || 20,
      attempts: 1,
      solvedIndependently,
      needRevision,
      notes: notes.trim() || undefined,
      solutionLink: solutionLink.trim() || undefined,
    });

    setProblemName('');
    setNotes('');
    setSolutionLink('');
    onClose();
  };

  const topicsList = [
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Stack',
    'Binary Search',
    'Linked Lists',
    'Trees',
    'Tries',
    'Heap / Priority Queue',
    'Backtracking',
    'Graphs',
    'Dynamic Programming',
    'Greedy',
    'Bit Manipulation',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#15121A] border border-[#30283A] rounded-2xl shadow-2xl p-6 text-[#F5F1F5]">
        <div className="flex items-center justify-between pb-3 border-b border-[#30283A]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#663399]/20 text-[#E6C7E6]">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#E6C7E6]">Log DSA Problem</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#B9B0BD] hover:text-[#F5F1F5] hover:bg-[#1D1824]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
              Problem Name *
            </label>
            <input
              type="text"
              required
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
              placeholder="e.g. 3Sum, Course Schedule, LRU Cache"
              className="w-full px-3.5 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              >
                <option value="LeetCode">LeetCode</option>
                <option value="HackerRank">HackerRank</option>
                <option value="CodeChef">CodeChef</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Time (mins)
              </label>
              <input
                type="number"
                min="1"
                max="180"
                value={timeTakenMinutes}
                onChange={(e) => setTimeTakenMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
              Topic / Tag
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
            >
              {topicsList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1D1824] border border-[#30283A] cursor-pointer">
              <input
                type="checkbox"
                checked={solvedIndependently}
                onChange={(e) => setSolvedIndependently(e.target.checked)}
                className="rounded accent-[#663399]"
              />
              <span className="text-xs font-medium text-[#F5F1F5]">Solved Independently</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1D1824] border border-[#30283A] cursor-pointer">
              <input
                type="checkbox"
                checked={needRevision}
                onChange={(e) => setNeedRevision(e.target.checked)}
                className="rounded accent-[#663399]"
              />
              <span className="text-xs font-medium text-amber-300">Add to Revision Queue</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
              Notes / Approach
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Map lookup for complement O(n) space and time..."
              className="w-full px-3.5 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#30283A]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#B9B0BD] hover:text-[#F5F1F5] rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 transition-colors shadow-md shadow-[#663399]/30"
            >
              Save Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
