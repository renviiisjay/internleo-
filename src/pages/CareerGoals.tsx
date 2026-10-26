import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Target,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { CareerGoal } from '../types';

export const CareerGoals: React.FC = () => {
  const { goals, addGoal, toggleActionStep, deleteGoal } = useData();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CareerGoal['category']>('Skill Mastery');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const actionSteps = [];
    if (step1.trim()) actionSteps.push({ id: `step-${Date.now()}`, text: step1, done: false });
    if (step2.trim()) actionSteps.push({ id: `step-${Date.now() + 1}`, text: step2, done: false });

    addGoal({
      title: newTitle,
      category: newCategory,
      targetDate: newTargetDate || '2026-12-31',
      progress: 0,
      status: 'In Progress',
      actionSteps,
      relatedSkills: []
    });

    setShowAddModal(false);
    setNewTitle('');
    setStep1('');
    setStep2('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8DF] text-[#A64228] text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" />
            Milestone Trajectory
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2D42]">Career Goals</h1>
          <p className="text-sm text-[#74788D]">
            Set tangible learning targets, track action step checkpoints, and measure career velocity.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1B1E2B] transition flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Goal
        </button>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <div
            key={goal.id}
            className="p-6 rounded-3xl bg-white/80 border border-[#ECE8E1] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D1CAE4] transition"
          >
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#717589] border border-[#EBE7DF]">
                  {goal.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      goal.status === 'Completed'
                        ? 'bg-[#E3F4E9] text-[#25633F]'
                        : 'bg-[#FFF3E3] text-[#B26E00]'
                    }`}
                  >
                    {goal.status}
                  </span>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1 text-[#A8ACC0] hover:text-rose-600 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Deadline */}
              <h3 className="font-serif font-bold text-lg text-[#2B2D42] mt-1 mb-2">
                {goal.title}
              </h3>
              <p className="text-xs text-[#8A8EA2] flex items-center gap-1 mb-4">
                <Calendar className="w-3.5 h-3.5 text-[#A0A4B8]" /> Target: {goal.targetDate}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 mb-5">
                <div className="flex justify-between text-xs text-[#6F7389] font-medium">
                  <span>Milestone Completion</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="w-full bg-[#EBE7E0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#8E7AB5] to-[#B9A3E3] h-full rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Steps Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-[#8C90A4] uppercase tracking-wider block mb-1">
                  Checklist ({goal.actionSteps.filter(s => s.done).length} /{' '}
                  {goal.actionSteps.length})
                </span>
                {goal.actionSteps.map(step => (
                  <div
                    key={step.id}
                    onClick={() => toggleActionStep(goal.id, step.id)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs transition cursor-pointer ${
                      step.done
                        ? 'bg-[#F9FAF8] border-[#E2ECE5] text-[#8C90A4]'
                        : 'bg-[#FAF9F6] border-[#EAE6DD] text-[#333649] hover:border-[#8E7AB5]'
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#A8ACC0] shrink-0" />
                    )}
                    <span className={step.done ? 'line-through' : 'font-medium'}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Skills Tags */}
            {goal.relatedSkills.length > 0 && (
              <div className="pt-3 border-t border-[#F2EFE8] flex items-center gap-1.5 flex-wrap">
                {goal.relatedSkills.map(sk => (
                  <span
                    key={sk}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#55586E]"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">Create Career Goal</h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Commit to a specific growth target and break it into action steps.
            </p>

            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Goal Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Master React 19 Server Components"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  >
                    <option value="Skill Mastery">Skill Mastery</option>
                    <option value="Target Company">Target Company</option>
                    <option value="Certification">Certification</option>
                    <option value="Project">Project</option>
                    <option value="Mentorship">Mentorship</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Target Date</label>
                  <input
                    type="date"
                    value={newTargetDate}
                    onChange={e => setNewTargetDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">First Action Step</label>
                <input
                  type="text"
                  placeholder="e.g. Complete official docs & code sandbox"
                  value={step1}
                  onChange={e => setStep1(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Second Action Step</label>
                <input
                  type="text"
                  placeholder="e.g. Build demo app with 3 server actions"
                  value={step2}
                  onChange={e => setStep2(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#6F7387] hover:bg-[#EFECE6] rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#2B2D42] text-white rounded-xl hover:bg-[#1C1E2D] transition cursor-pointer"
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
