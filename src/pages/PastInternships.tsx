import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Briefcase,
  Calendar,
  Award,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  FolderGit2
} from 'lucide-react';
import { Internship, InternshipProject } from '../types';

export const PastInternships: React.FC = () => {
  const { internships, addInternship, deleteInternship } = useData();
  const pastList = internships.filter(i => i.type === 'past');

  const [selectedInternshipId, setSelectedInternshipId] = useState<string>(
    pastList[0]?.id || ''
  );
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [overview, setOverview] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectMetrics, setProjectMetrics] = useState('');
  const [achievement, setAchievement] = useState('');

  const activeInternship = pastList.find(i => i.id === selectedInternshipId) || pastList[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;

    const skillsArray = skillsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const projects: InternshipProject[] = projectTitle
      ? [
          {
            id: `proj-${Date.now()}`,
            title: projectTitle,
            description: projectDesc,
            impactMetrics: projectMetrics,
            skillsUsed: skillsArray.slice(0, 3)
          }
        ]
      : [];

    const achievements = achievement ? [achievement] : [];

    addInternship({
      company,
      role,
      type: 'past',
      startDate: startDate || '2026-01-01',
      endDate: endDate || '2026-04-30',
      location: location || 'San Francisco, CA',
      workMode,
      overview,
      projects,
      achievements,
      certificates: [],
      skillsAcquired: skillsArray
    });

    setShowAddModal(false);
    // Reset form
    setCompany('');
    setRole('');
    setOverview('');
    setSkillsStr('');
    setProjectTitle('');
    setProjectDesc('');
    setProjectMetrics('');
    setAchievement('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8E5F8] text-[#5A487E] text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            Verified Track Record
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2D42]">Past Internships</h1>
          <p className="text-sm text-[#74788D]">
            Document your prior professional chapters, shipped systems, impact metrics, and certificates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1B1E2B] transition flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Past Internship
        </button>
      </div>

      {pastList.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#ECE8E1]">
          <Briefcase className="w-12 h-12 text-[#9A9EAF] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#2B2D42]">No past internships saved</h3>
          <p className="text-xs text-[#7F8396] max-w-sm mx-auto mt-1 mb-5">
            Log your previous internships to supply verified proof to your Career DNA graph.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#2D3142] text-white text-xs rounded-xl"
          >
            Add Past Experience
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Company Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            {pastList.map(item => {
              const isSelected = activeInternship?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedInternshipId(item.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#7E61B2] shadow-sm ring-2 ring-[#7E61B2]/10'
                      : 'bg-white/70 border-[#EBE7DF] hover:bg-white text-[#4A4D62]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-[#2B2D42]">
                      {item.company}
                    </h3>
                    <span className="text-[11px] font-medium text-[#7D8197] px-2 py-0.5 rounded-md bg-[#FAF8F5]">
                      {item.startDate.slice(0, 7)} — {item.endDate?.slice(0, 7)}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#65687F] mt-1">{item.role}</p>
                  <p className="text-xs text-[#8F93A8] mt-2 line-clamp-2">{item.overview}</p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F0EDE6] text-xs">
                    <span className="text-[#84879C]">
                      {item.projects?.length || 0} projects · {item.skillsAcquired.length} skills
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition ${
                        isSelected ? 'text-[#7E61B2]' : 'text-[#B0B4C6]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Experience View */}
          <div className="lg:col-span-8 space-y-6">
            {activeInternship && (
              <div className="p-7 rounded-3xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-6">
                {/* Header & Meta */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-6 border-b border-[#EFECE6]">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EAE8F7] text-[#5B497D]">
                      {activeInternship.workMode} · {activeInternship.location}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#2B2D42] mt-2">
                      {activeInternship.role} at {activeInternship.company}
                    </h2>
                    <p className="text-xs text-[#7F8399] mt-0.5">
                      {activeInternship.startDate} to {activeInternship.endDate} · Team:{' '}
                      {activeInternship.team || 'Platform'}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteInternship(activeInternship.id)}
                    className="p-2 text-[#9A9EAF] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Delete internship"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Overview Text */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A8EA2] mb-1.5">
                    Executive Summary
                  </h4>
                  <p className="text-sm text-[#43465B] leading-relaxed">
                    {activeInternship.overview}
                  </p>
                </div>

                {/* Projects Shipped */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A8EA2] mb-3">
                    Key Projects & Systems Shipped ({activeInternship.projects?.length || 0})
                  </h4>
                  <div className="space-y-3">
                    {activeInternship.projects?.map(proj => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EBE7DE] space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="font-serif font-bold text-sm text-[#2C2E42]">
                            {proj.title}
                          </h5>
                          {proj.impactMetrics && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#DDF1E7] text-[#25633F]">
                              {proj.impactMetrics}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5D6076] leading-relaxed">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.skillsUsed.map(skill => (
                            <span
                              key={skill}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-[#E3DFD5] text-[#55586E]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Achievements */}
                {activeInternship.achievements?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A8EA2] mb-2.5">
                      Honors & Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {activeInternship.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-[#393C52] p-2.5 rounded-xl bg-[#FFF9EE] border border-[#F4EAC8]"
                        >
                          <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Acquired & Graph Mapping */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A8EA2] mb-2.5">
                    Skills Recorded from this Internship
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeInternship.skillsAcquired.map(skill => (
                      <span
                        key={skill}
                        className="text-xs font-medium px-3 py-1 rounded-xl bg-[#EFECE6] text-[#3F4257] border border-[#E2DED5]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">
              Add Past Internship
            </h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Add your prior experiences, projects, and key quantitative impact.
            </p>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Company</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Acme Labs"
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
                    placeholder="e.g. SWE Intern"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
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
                  <label className="text-xs font-semibold text-[#44475D]">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Overview</label>
                <textarea
                  rows={2}
                  placeholder="Summary of responsibilities and scope"
                  value={overview}
                  onChange={e => setOverview(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">
                  Skills Used (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React & TypeScript, Node.js, GraphQL"
                  value={skillsStr}
                  onChange={e => setSkillsStr(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="p-3 bg-[#F4F1EA] rounded-2xl space-y-2">
                <span className="text-[11px] font-bold text-[#4F5268]">Primary Project Shipped</span>
                <input
                  type="text"
                  placeholder="Project title (e.g. Telemetry Event Pipeline)"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
                <input
                  type="text"
                  placeholder="Description of system and challenges"
                  value={projectDesc}
                  onChange={e => setProjectDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
                <input
                  type="text"
                  placeholder="Impact metric (e.g. Reduced payload by 40%)"
                  value={projectMetrics}
                  onChange={e => setProjectMetrics(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Achievement / Award</label>
                <input
                  type="text"
                  placeholder="e.g. Awarded Best Project Demo at Cohere Showcase"
                  value={achievement}
                  onChange={e => setAchievement(e.target.value)}
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
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
