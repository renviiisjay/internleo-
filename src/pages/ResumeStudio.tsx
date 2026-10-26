import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  FileText,
  Plus,
  Trash2,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Tag,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ResumeVersion, ResumeBullet } from '../types';

export const ResumeStudio: React.FC = () => {
  const { resumes, skills, addResumeVersion, deleteResumeVersion, addResumeBullet } = useData();

  const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]?.id || '');
  const [showAddResumeModal, setShowAddResumeModal] = useState(false);
  const [showAddBulletModal, setShowAddBulletModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Resume form
  const [newResumeName, setNewResumeName] = useState('');
  const [newTargetRole, setNewTargetRole] = useState('');
  const [newSummary, setNewSummary] = useState('');

  // New Bullet form
  const [bulletVerb, setBulletVerb] = useState('Architected');
  const [bulletExperience, setBulletExperience] = useState('Acme Labs');
  const [bulletText, setBulletText] = useState('');
  const [bulletMetric, setBulletMetric] = useState('');
  const [bulletSkillId, setBulletSkillId] = useState(skills[0]?.id || '');

  const activeResume = resumes.find(r => r.id === selectedResumeId) || resumes[0];

  const handleCreateResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResumeName || !newTargetRole) return;
    addResumeVersion({
      name: newResumeName,
      targetRole: newTargetRole,
      mappedSkills: ['React & TypeScript'],
      summary: newSummary,
      bullets: []
    });
    setShowAddResumeModal(false);
    setNewResumeName('');
    setNewTargetRole('');
    setNewSummary('');
  };

  const handleCreateBullet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeResume || !bulletText) return;
    const skillObj = skills.find(s => s.id === bulletSkillId);
    addResumeBullet(activeResume.id, {
      experienceTitle: bulletExperience,
      actionVerb: bulletVerb,
      bulletText,
      quantifiableResult: bulletMetric,
      skillId: bulletSkillId,
      tags: skillObj ? [skillObj.name] : ['Core']
    });
    setShowAddBulletModal(false);
    setBulletText('');
    setBulletMetric('');
  };

  const copyBullet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE5F8] text-[#59477B] text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            Resume Tailoring Engine
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2D42]">Resume Studio</h1>
          <p className="text-sm text-[#74788D]">
            Manage targeted resume profiles, map skills to real accomplishments, and craft metric-driven achievement bullets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddResumeModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1B1E2B] transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Resume Version
          </button>
        </div>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#ECE8E1]">
          <FileText className="w-12 h-12 text-[#9A9EAF] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#2B2D42]">No resume profiles created</h3>
          <p className="text-xs text-[#7F8396] max-w-sm mx-auto mt-1 mb-5">
            Create resume variants tailored for specific roles (e.g. Frontend vs Systems vs AI).
          </p>
          <button
            onClick={() => setShowAddResumeModal(true)}
            className="px-4 py-2 bg-[#2D3142] text-white text-xs rounded-xl"
          >
            Create Resume Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Resume Version Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-[#8C90A4] uppercase tracking-wider">
                Profiles ({resumes.length})
              </span>
            </div>

            {resumes.map(res => {
              const isSelected = activeResume?.id === res.id;
              return (
                <div
                  key={res.id}
                  onClick={() => setSelectedResumeId(res.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#7E61B2] shadow-sm ring-2 ring-[#7E61B2]/10'
                      : 'bg-white/70 border-[#EBE7DF] hover:bg-white text-[#4A4D62]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2B2D42] truncate max-w-[190px]">
                      {res.name}
                    </span>
                    <span className="text-[10px] text-[#7E8296]">{res.updatedAt}</span>
                  </div>
                  <p className="text-xs font-medium text-[#65687F] mt-1">{res.targetRole}</p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F0EDE6] text-xs">
                    <span className="text-[#84879C]">{res.bullets?.length || 0} bullets</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition ${
                        isSelected ? 'text-[#7E61B2]' : 'text-[#B0B4C6]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Resume Workspace */}
          <div className="lg:col-span-8 space-y-6">
            {activeResume && (
              <div className="p-7 rounded-3xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-6">
                {/* Header & Meta */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 border-b border-[#EFECE6]">
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-[#2B2D42]">
                      {activeResume.targetRole}
                    </h2>
                    <p className="font-mono text-xs text-[#7A7E93] mt-0.5">
                      Filename: {activeResume.name} · Updated {activeResume.updatedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddBulletModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1E212E] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Bullet
                    </button>
                    <button
                      onClick={() => deleteResumeVersion(activeResume.id)}
                      className="p-2 text-[#9A9EAF] hover:text-rose-600 rounded-xl"
                      title="Delete profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A8EA2] mb-1.5">
                    Target Summary Statement
                  </h4>
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EBE7DE] text-xs text-[#43465B] leading-relaxed">
                    {activeResume.summary}
                  </div>
                </div>

                {/* Metric-backed Bullets */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A8EA2]">
                      Achievement-Driven Resume Bullets ({activeResume.bullets?.length || 0})
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {activeResume.bullets?.map(bullet => (
                      <div
                        key={bullet.id}
                        className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EBE7DE] space-y-2 group hover:border-[#7E61B2] transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#67548A]">
                            {bullet.experienceTitle}
                          </span>
                          {bullet.quantifiableResult && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#DDF1E7] text-[#25633F]">
                              {bullet.quantifiableResult}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#393C50] leading-relaxed">
                          {bullet.bulletText}
                        </p>

                        <div className="flex items-center justify-between pt-1 text-xs">
                          <div className="flex gap-1.5">
                            {bullet.tags?.map(t => (
                              <span
                                key={t}
                                className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#E3DFD5] text-[#55586E]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => copyBullet(bullet.bulletText, bullet.id)}
                            className="text-[11px] font-medium text-[#7E61B2] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {copiedId === bullet.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" /> Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}

                    {(!activeResume.bullets || activeResume.bullets.length === 0) && (
                      <div className="p-6 text-center text-xs text-[#8A8E9F] bg-[#FAF8F5] rounded-2xl border border-dashed border-[#DCD8CF]">
                        No bullets added for this resume version yet. Click "+ Add Bullet" above!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Resume Version Modal */}
      {showAddResumeModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">
              New Resume Profile
            </h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Create a distinct profile focused on a specific career target.
            </p>

            <form onSubmit={handleCreateResume} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Profile / File Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. AI_Engineer_2026.pdf"
                  value={newResumeName}
                  onChange={e => setNewResumeName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Target Role</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Machine Learning & Agents Engineer"
                  value={newTargetRole}
                  onChange={e => setNewTargetRole(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Professional Summary</label>
                <textarea
                  rows={3}
                  placeholder="2-3 sentences summarizing technical strengths and domain experience..."
                  value={newSummary}
                  onChange={e => setNewSummary(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddResumeModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#6F7387] hover:bg-[#EFECE6] rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#2B2D42] text-white rounded-xl hover:bg-[#1C1E2D] transition cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Bullet Modal */}
      {showAddBulletModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-lg w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">
              Add Achievement Bullet
            </h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Map this bullet to a verified experience and quantifiable impact metric.
            </p>

            <form onSubmit={handleCreateBullet} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Experience Reference</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Acme Labs"
                    value={bulletExperience}
                    onChange={e => setBulletExperience(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Action Verb</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Architected, Optimized"
                    value={bulletVerb}
                    onChange={e => setBulletVerb(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">
                  Complete Bullet Content
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Architected reusable design system components used by 12 client apps with zero regression..."
                  value={bulletText}
                  onChange={e => setBulletText(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">
                    Quantifiable Metric
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cut bug reports by 48%"
                    value={bulletMetric}
                    onChange={e => setBulletMetric(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Related Skill</label>
                  <select
                    value={bulletSkillId}
                    onChange={e => setBulletSkillId(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  >
                    {skills.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddBulletModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#6F7387] hover:bg-[#EFECE6] rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#2B2D42] text-white rounded-xl hover:bg-[#1C1E2D] transition cursor-pointer"
                >
                  Save Bullet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
