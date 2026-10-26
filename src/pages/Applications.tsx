import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  SendHorizontal,
  Plus,
  Kanban,
  ListFilter,
  Calendar,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  Trash2,
  Building
} from 'lucide-react';
import { Application, ApplicationStatus } from '../types';

const STATUS_COLUMNS: { status: ApplicationStatus; title: string; color: string; dotColor: string }[] = [
  { status: 'Applied', title: 'Applied', color: 'bg-[#F2EDFB] text-[#69548E]', dotColor: 'bg-[#8E7AB5]' },
  { status: 'Assessment', title: 'Assessment', color: 'bg-[#FFF3E3] text-[#B26E00]', dotColor: 'bg-[#FFAA00]' },
  { status: 'Interview', title: 'Interview', color: 'bg-[#EBF3FB] text-[#346294]', dotColor: 'bg-[#4B89DC]' },
  { status: 'Offer', title: 'Offer', color: 'bg-[#E3F4E9] text-[#25633F]', dotColor: 'bg-[#2ECC71]' },
  { status: 'Rejected', title: 'Rejected', color: 'bg-[#FDECEC] text-[#B03A2E]', dotColor: 'bg-[#E74C3C]' },
  { status: 'Withdrawn', title: 'Withdrawn', color: 'bg-[#F2EFE9] text-[#7A7E91]', dotColor: 'bg-[#A6ACB8]' }
];

export const Applications: React.FC = () => {
  const { applications, updateApplicationStatus, addApplication, deleteApplication, addInterviewRound } =
    useData();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [filterText, setFilterText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeAppForRound, setActiveAppForRound] = useState<Application | null>(null);

  // New application form
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('Applied');
  const [jobLink, setJobLink] = useState('');
  const [resumeVersion, setResumeVersion] = useState('Frontend_Platform_v2.pdf');
  const [compensation, setCompensation] = useState('');
  const [notes, setNotes] = useState('');

  // New interview round form
  const [roundName, setRoundName] = useState('');
  const [roundDate, setRoundDate] = useState('');
  const [roundNotes, setRoundNotes] = useState('');

  const filteredApps = applications.filter(
    a =>
      a.company.toLowerCase().includes(filterText.toLowerCase()) ||
      a.role.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleCreateApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;
    addApplication({
      company,
      role,
      status,
      jobLink: jobLink || undefined,
      appliedDate: new Date().toISOString().split('T')[0],
      resumeVersion,
      compensation: compensation || undefined,
      notes: notes || undefined,
      interviews: []
    });
    setShowAddModal(false);
    setCompany('');
    setRole('');
    setNotes('');
  };

  const handleAddRound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAppForRound || !roundName || !roundDate) return;
    addInterviewRound(activeAppForRound.id, roundName, roundDate, roundNotes);
    setActiveAppForRound(null);
    setRoundName('');
    setRoundDate('');
    setRoundNotes('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3E3] text-[#B26E00] text-xs font-semibold mb-2">
            <SendHorizontal className="w-3.5 h-3.5" />
            Recruitment Funnel
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2D42]">Applications Tracker</h1>
          <p className="text-sm text-[#74788D]">
            Manage recruiting stages, upcoming interview rounds, resumes used, and offers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Switcher */}
          <div className="flex items-center bg-white border border-[#E4DFD7] rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                viewMode === 'kanban'
                  ? 'bg-[#2B2D42] text-white'
                  : 'text-[#6F7387] hover:text-[#2B2D42]'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" /> Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                viewMode === 'list'
                  ? 'bg-[#2B2D42] text-white'
                  : 'text-[#6F7387] hover:text-[#2B2D42]'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" /> List
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1B1E2B] transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Application
          </button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/70 p-3 rounded-2xl border border-[#ECE8E1]">
        <input
          type="text"
          placeholder="Filter by company or role..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-white border border-[#E2DFD6] text-xs focus:outline-none focus:border-[#7A64A0] w-full sm:w-72"
        />

        <div className="flex items-center gap-4 text-xs text-[#7A7E91] px-2 overflow-x-auto">
          <span>
            Total: <strong className="text-[#2B2D42]">{applications.length}</strong>
          </span>
          <span>
            Interviews:{' '}
            <strong className="text-purple-700">
              {applications.filter(a => a.status === 'Interview').length}
            </strong>
          </span>
          <span>
            Offers:{' '}
            <strong className="text-emerald-700">
              {applications.filter(a => a.status === 'Offer').length}
            </strong>
          </span>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
          {STATUS_COLUMNS.map(col => {
            const columnApps = filteredApps.filter(a => a.status === col.status);
            return (
              <div
                key={col.status}
                className="bg-[#FAF8F5]/80 rounded-2xl border border-[#EBE7DF] p-3 space-y-3 min-h-[500px]"
              >
                {/* Column header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#EFECE6]">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <span className="font-serif font-bold text-xs text-[#2B2D42]">
                      {col.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C90A3] px-1.5 py-0.5 rounded-md bg-white">
                    {columnApps.length}
                  </span>
                </div>

                {/* Column cards */}
                <div className="space-y-3">
                  {columnApps.map(app => (
                    <div
                      key={app.id}
                      className="p-3.5 rounded-xl bg-white border border-[#E5E1D8] shadow-xs hover:border-[#7A64A0] transition group space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="font-bold text-xs text-[#2B2D42]">{app.company}</h4>
                          <p className="text-[11px] text-[#696C80] font-medium line-clamp-1">
                            {app.role}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-[#B0B4C6] hover:text-rose-600 transition opacity-0 group-hover:opacity-100 p-1"
                          title="Delete application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {app.compensation && (
                        <p className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit">
                          {app.compensation}
                        </p>
                      )}

                      {app.interviews.length > 0 && (
                        <div className="p-2 rounded-lg bg-[#F8F6FD] border border-[#E9E4F5] text-[10px] space-y-1">
                          <span className="font-semibold text-[#665389]">
                            {app.interviews.length} Round(s) scheduled
                          </span>
                          <p className="text-[#7D8197] truncate">
                            Next: {app.interviews[app.interviews.length - 1].roundName}
                          </p>
                        </div>
                      )}

                      {/* Quick stage selector */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#F2EFE8] text-[10px]">
                        <select
                          value={app.status}
                          onChange={e =>
                            updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                          }
                          className="bg-[#FAF9F6] border border-[#E2DFD6] rounded px-1.5 py-1 text-[#46495E] focus:outline-none"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Assessment">Assessment</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Withdrawn">Withdrawn</option>
                        </select>

                        <button
                          onClick={() => setActiveAppForRound(app)}
                          className="text-[#7A64A0] hover:underline font-medium"
                        >
                          + Round
                        </button>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="py-8 text-center text-[11px] text-[#A6ABB8]">
                      No roles here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white/80 rounded-2xl border border-[#ECE8E1] overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#7A7E92] font-semibold border-b border-[#ECE8E1]">
              <tr>
                <th className="py-3 px-4">Company & Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4">Resume Version</th>
                <th className="py-3 px-4">Interviews</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE8]">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-[#FAF9F6] transition">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#2B2D42]">{app.company}</p>
                    <p className="text-[11px] text-[#717589]">{app.role}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        app.status === 'Offer'
                          ? 'bg-[#E3F4E9] text-[#25633F]'
                          : app.status === 'Interview'
                          ? 'bg-[#EBF3FB] text-[#346294]'
                          : app.status === 'Assessment'
                          ? 'bg-[#FFF3E3] text-[#B26E00]'
                          : 'bg-[#F2EDFB] text-[#69548E]'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#66697D]">{app.appliedDate}</td>
                  <td className="py-3.5 px-4 text-[#66697D]">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <FileText className="w-3 h-3 text-[#9A9EAF]" /> {app.resumeVersion}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#66697D]">
                    {app.interviews.length > 0
                      ? `${app.interviews.length} round(s)`
                      : 'None recorded'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setActiveAppForRound(app)}
                        className="px-2 py-1 bg-[#FAF8F5] border border-[#E3DFD5] hover:border-[#7A64A0] rounded text-[11px] text-[#46495E]"
                      >
                        + Interview
                      </button>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="p-1 text-[#9A9EAF] hover:text-rose-600 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-lg w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">
              Add Job Application
            </h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Track a new position in your recruitment pipeline.
            </p>

            <form onSubmit={handleCreateApp} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Company</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Linear, Stripe, Airbnb"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Role Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Software Engineer Intern"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Initial Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as ApplicationStatus)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Compensation / Pay</label>
                  <input
                    type="text"
                    placeholder="e.g. $55/hr + housing"
                    value={compensation}
                    onChange={e => setCompensation(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Job Link / URL</label>
                <input
                  type="url"
                  placeholder="https://company.com/jobs/..."
                  value={jobLink}
                  onChange={e => setJobLink(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Resume Version Used</label>
                <input
                  type="text"
                  value={resumeVersion}
                  onChange={e => setResumeVersion(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Notes / Referral Info</label>
                <textarea
                  rows={2}
                  placeholder="Referred by Alex; recruiter reach out on LinkedIn"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
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
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Interview Round Modal */}
      {activeAppForRound && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">
              Add Interview Round
            </h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Schedule round for <strong className="text-[#2B2D42]">{activeAppForRound.company}</strong> (will also sync to Calendar).
            </p>

            <form onSubmit={handleAddRound} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Round Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Technical Screen, System Design, Final Onsite"
                  value={roundName}
                  onChange={e => setRoundName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Date</label>
                <input
                  required
                  type="date"
                  value={roundDate}
                  onChange={e => setRoundDate(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Preparation Notes</label>
                <textarea
                  rows={2}
                  placeholder="Key topics, interviewers, or focus areas"
                  value={roundNotes}
                  onChange={e => setRoundNotes(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveAppForRound(null)}
                  className="px-4 py-2 text-xs font-medium text-[#6F7387] hover:bg-[#EFECE6] rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#2B2D42] text-white rounded-xl hover:bg-[#1C1E2D] transition cursor-pointer"
                >
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
