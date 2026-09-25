import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, Tag, Flag } from 'lucide-react';
import { TaskCategory, Priority } from '../../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const { addTask, companies, skills } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('DSA');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [duration, setDuration] = useState<number>(30);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [relatedCompany, setRelatedCompany] = useState('');
  const [relatedSkill, setRelatedSkill] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      priority,
      estimatedDurationMinutes: Number(duration) || 30,
      dueDate,
      status: 'Pending',
      relatedCompany: relatedCompany || undefined,
      relatedSkill: relatedSkill || undefined,
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#15121A] border border-[#30283A] rounded-2xl shadow-2xl p-6 text-[#F5F1F5]">
        <div className="flex items-center justify-between pb-3 border-b border-[#30283A]">
          <h2 className="text-lg font-bold text-[#E6C7E6]">Add Preparation Task</h2>
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
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solve 2 Graph BFS problems on LeetCode"
              className="w-full px-3.5 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              >
                <option value="DSA">DSA</option>
                <option value="Study">Study (CS Fund.)</option>
                <option value="Practice">Practice</option>
                <option value="Interview">Interview Prep</option>
                <option value="Resume">Resume / Project</option>
                <option value="Application">Application</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="240"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Related Company (Optional)
              </label>
              <select
                value={relatedCompany}
                onChange={(e) => setRelatedCompany(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              >
                <option value="">None</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
                Related Skill (Optional)
              </label>
              <select
                value={relatedSkill}
                onChange={(e) => setRelatedSkill(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              >
                <option value="">None</option>
                {skills.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1">
              Notes / Sub-steps (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Focus on finding cycle using Kahn's algorithm or recursion..."
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
              Add to Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
