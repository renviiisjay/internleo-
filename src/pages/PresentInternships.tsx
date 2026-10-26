import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Clock,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Award,
  ChevronDown,
  Building,
  Target
} from 'lucide-react';
import { Internship } from '../types';

export const PresentInternships: React.FC = () => {
  const { internships, updateInternship, toggleTask, addTaskToInternship, addInternship } =
    useData();

  const presentInternships = internships.filter(i => i.type === 'present');
  const [selectedId, setSelectedId] = useState<string>(
    presentInternships[0]?.id || ''
  );
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Task' | 'Milestone' | 'Deliverable'>('Task');
  const [newTaskDue, setNewTaskDue] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New internship form state
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [location, setLocation] = useState('Remote');
  const [manager, setManager] = useState('');
  const [overview, setOverview] = useState('');

  const currentRole = presentInternships.find(i => i.id === selectedId) || presentInternships[0];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !currentRole) return;
    addTaskToInternship(currentRole.id, newTaskTitle, newTaskCategory, newTaskDue || undefined);
    setNewTaskTitle('');
    setNewTaskDue('');
  };

  const handleCreateInternship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;
    addInternship({
      company,
      role,
      type: 'present',
      startDate: startDate || new Date().toISOString().split('T')[0],
      location,
      workMode: 'Remote',
      manager,
      overview,
      projects: [],
      achievements: [],
      certificates: [],
      skillsAcquired: [],
      weeklyHours: 30,
      progressPercent: 10,
      currentSprintObjective: 'Onboarding and first project kick-off',
      tasks: [
        { id: `t-${Date.now()}`, title: 'Complete workstation setup & dev environment', completed: true, category: 'Task' },
        { id: `t-${Date.now() + 1}`, title: 'First 1-on-1 alignment with manager', completed: false, category: 'Milestone' }
      ]
    });
    setShowAddModal(false);
    setCompany('');
    setRole('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2ECE5] text-[#2D6A4F] text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            Live Work In Progress
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2D42]">Present Internships</h1>
          <p className="text-sm text-[#74788D]">
            Track ongoing deliverables, sprints, weekly hours, and sprint retrospectives.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1B1E2B] transition flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Present Role
        </button>
      </div>

      {presentInternships.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#ECE8E1]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E2ECE5] flex items-center justify-center text-[#2D6A4F]">
            <Building className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#2B2D42]">No active internships logged</h3>
          <p className="text-sm text-[#7D8196] max-w-md mx-auto mt-2 mb-6">
            Currently working somewhere? Track your daily tasks, milestones, and objectives here to seamlessly turn work into verified resume evidence.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#2D3142] text-white text-xs font-medium"
          >
            Log Current Internship
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Role Details & Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="p-6 rounded-3xl bg-white/80 border border-[#ECE8E1] shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DDF1E7] text-[#25633F]">
                    Active · Started {currentRole.startDate}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#2B2D42] mt-2">
                    {currentRole.role}
                  </h2>
                  <p className="text-sm font-medium text-[#64677E] flex items-center gap-1.5 mt-0.5">
                    <span>{currentRole.company}</span> · <span>{currentRole.location}</span> ·{' '}
                    <span>{currentRole.workMode}</span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-serif font-bold text-[#2B2D42]">
                    {currentRole.progressPercent || 0}%
                  </div>
                  <p className="text-xs text-[#808499]">Term Completion</p>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full bg-[#EBE7DF] h-2.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-gradient-to-r from-[#86B99F] to-[#458C6B] h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentRole.progressPercent || 0}%` }}
                />
              </div>

              {/* Sprint Focus */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F7F6F2] to-[#FAF8F5] border border-[#EBE7E0] mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7355] mb-1">
                  <Target className="w-3.5 h-3.5" />
                  CURRENT SPRINT OBJECTIVE
                </div>
                <p className="text-sm text-[#383B4F] font-medium">
                  {currentRole.currentSprintObjective || 'No objective set for this cycle.'}
                </p>
              </div>

              {/* Deliverables & Tasks Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif font-bold text-base text-[#2B2D42]">
                    Tasks & Milestones ({currentRole.tasks?.filter(t => t.completed).length || 0} /{' '}
                    {currentRole.tasks?.length || 0})
                  </h3>
                </div>

                {/* Add new task form */}
                <form onSubmit={handleAddTask} className="flex flex-wrap gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Add task or milestone..."
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-[#E3DFD5] text-xs focus:outline-none focus:border-[#8675A9]"
                  />
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-[#FAF9F6] border border-[#E3DFD5] text-xs"
                  >
                    <option value="Task">Task</option>
                    <option value="Milestone">Milestone</option>
                    <option value="Deliverable">Deliverable</option>
                  </select>
                  <input
                    type="date"
                    value={newTaskDue}
                    onChange={e => setNewTaskDue(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#FAF9F6] border border-[#E3DFD5] text-xs"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1E212E] transition cursor-pointer"
                  >
                    Add
                  </button>
                </form>

                {/* Task items list */}
                <div className="space-y-2">
                  {currentRole.tasks && currentRole.tasks.length > 0 ? (
                    currentRole.tasks.map(task => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(currentRole.id, task.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                          task.completed
                            ? 'bg-[#F9FAF8] border-[#E2ECE5] text-[#868A9F]'
                            : 'bg-white border-[#E8E5DD] text-[#2B2D42] hover:border-[#D1CAE4]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {task.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#A8ACC0] shrink-0" />
                          )}
                          <div>
                            <span
                              className={`text-xs font-medium ${
                                task.completed ? 'line-through text-[#9094A8]' : ''
                              }`}
                            >
                              {task.title}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                                  task.category === 'Milestone'
                                    ? 'bg-purple-100 text-purple-700'
                                    : task.category === 'Deliverable'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {task.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        {task.dueDate && (
                          <span className="text-xs text-[#808499] flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {task.dueDate}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-[#8C90A4]">
                      No tasks added yet. Add one above to start tracking your sprint.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Acquired Skills */}
          <div className="space-y-6">
            {/* Metadata Card */}
            <div className="p-6 rounded-3xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2B2D42]">Role Logistics</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#868A9F]">Direct Manager:</span>
                  <p className="font-semibold text-[#303348]">{currentRole.manager || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-[#868A9F]">Team / Guild:</span>
                  <p className="font-semibold text-[#303348]">{currentRole.team || 'Engineering'}</p>
                </div>
                <div>
                  <span className="text-[#868A9F]">Weekly Commitment:</span>
                  <p className="font-semibold text-[#303348]">{currentRole.weeklyHours || 20} hours / week</p>
                </div>
                <div>
                  <span className="text-[#868A9F]">Scope Overview:</span>
                  <p className="text-[#4E5168] mt-1 leading-relaxed">
                    {currentRole.overview || 'Developing production features and customer-facing interfaces.'}
                  </p>
                </div>
              </div>
            </div>

            {/* In-flight Skills Proof Generator */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-[#F8F6FC] to-[#F1EEFB] border border-[#E6E0F5] shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-[#655288]">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-serif font-bold text-sm">Skills Used in this Role</h3>
              </div>
              <p className="text-xs text-[#6F6B84] mb-4">
                These tags connect to your Career DNA graph. Evidence is verified as you complete deliverables.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentRole.skillsAcquired.map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-xl bg-white/90 border border-[#E2DBF2] text-xs font-medium text-[#5B487F] shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding present internship */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-lg w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">
              Add Present Internship
            </h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Record your current workplace, deliverables, and targets.
            </p>

            <form onSubmit={handleCreateInternship} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Company Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. OpenAI, Notion, Stripe"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF] focus:outline-none focus:border-[#7A64A0]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Role Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Frontend Engineering Fellow"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF] focus:outline-none focus:border-[#7A64A0]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Manager Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Connor"
                    value={manager}
                    onChange={e => setManager(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Overview & Goals</label>
                <textarea
                  rows={3}
                  placeholder="What is your main focus this term?"
                  value={overview}
                  onChange={e => setOverview(e.target.value)}
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
                  className="px-4 py-2 text-xs font-medium bg-[#2B2D42] text-white rounded-xl hover:bg-[#1C1E2D] transition"
                >
                  Save Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
