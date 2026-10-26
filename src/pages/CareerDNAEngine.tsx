import React, { useMemo, useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useData } from '../context/DataContext';
import {
  Dna,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  Info,
  Building,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Skill, SkillEvidence } from '../types';

export const CareerDNAEngine: React.FC = () => {
  const { skills, internships, updateSkillLevel, addSkillEvidence, addSkill } = useData();

  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(skills[0]?.id || null);
  const [selectedInternshipId, setSelectedInternshipId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Skill audit / level update modal
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [editLevel, setEditLevel] = useState(3);
  const [auditNote, setAuditNote] = useState('');

  // Add new skill modal
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState(3);
  const [newSkillTarget, setNewSkillTarget] = useState(5);

  const selectedSkill = skills.find(s => s.id === selectedSkillId) || null;
  const selectedInternship = internships.find(i => i.id === selectedInternshipId) || null;

  // Filter skills by search & category
  const filteredSkills = useMemo(() => {
    return skills.filter(s => {
      const matchQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = categoryFilter === 'All' || s.category === categoryFilter;
      return matchQuery && matchCat;
    });
  }, [skills, searchQuery, categoryFilter]);

  // Construct Constellation Graph Nodes and Edges
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Central DNA core node
    nodes.push({
      id: 'core-dna',
      type: 'default',
      position: { x: 380, y: 240 },
      data: {
        label: (
          <div className="p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-1 rounded-xl bg-gradient-to-tr from-[#9B86BD] to-[#E2BBE9] flex items-center justify-center text-white shadow-xs">
              <Dna className="w-4 h-4" />
            </div>
            <p className="font-serif font-bold text-xs text-[#2B2D42]">Leo Martinez</p>
            <p className="text-[10px] text-[#7A7E91]">Career DNA Core</p>
          </div>
        )
      },
      style: {
        background: 'rgba(255, 255, 255, 0.95)',
        border: '2px solid #8E7AB5',
        borderRadius: '24px',
        boxShadow: '0 8px 30px rgba(142, 122, 181, 0.25)',
        width: 140
      }
    });

    // Internship Nodes placed on left arc
    internships.forEach((intern, index) => {
      const isSelected = selectedInternshipId === intern.id;
      const angle = ((index + 1) / (internships.length + 1)) * Math.PI - Math.PI / 2;
      const radius = 320;
      const posX = 380 - Math.cos(angle) * radius;
      const posY = 240 + Math.sin(angle) * (radius * 0.9);

      const internNodeId = `node-int-${intern.id}`;
      nodes.push({
        id: internNodeId,
        type: 'default',
        position: { x: posX, y: posY },
        data: {
          label: (
            <div
              onClick={() => {
                setSelectedInternshipId(intern.id);
                setSelectedSkillId(null);
              }}
              className="p-2 text-left cursor-pointer"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] uppercase font-bold text-[#567A66]">
                  {intern.type === 'present' ? 'Present' : 'Experience'}
                </span>
              </div>
              <p className="font-bold text-xs text-[#2B2D42]">{intern.company}</p>
              <p className="text-[10px] text-[#696C80] truncate">{intern.role}</p>
            </div>
          )
        },
        style: {
          background: isSelected ? '#FAF8F5' : '#FFFFFF',
          border: isSelected ? '2px solid #2D6A4F' : '1px solid #D1DFD6',
          borderRadius: '16px',
          boxShadow: isSelected
            ? '0 6px 20px rgba(45, 106, 79, 0.25)'
            : '0 2px 8px rgba(0,0,0,0.04)',
          width: 160
        }
      });

      // Edge from core to internship
      edges.push({
        id: `edge-core-${internNodeId}`,
        source: 'core-dna',
        target: internNodeId,
        animated: intern.type === 'present',
        style: { stroke: isSelected ? '#2D6A4F' : '#CAD7D0', strokeWidth: isSelected ? 3 : 1.5 }
      });
    });

    // Skill Nodes placed on right arc
    filteredSkills.forEach((skill, index) => {
      const isSelected = selectedSkillId === skill.id;
      const angle = ((index + 1) / (filteredSkills.length + 1)) * Math.PI - Math.PI / 2;
      const radius = 360;
      const posX = 380 + Math.cos(angle) * radius;
      const posY = 240 + Math.sin(angle) * (radius * 0.95);

      const skillNodeId = `node-skill-${skill.id}`;
      const colorScheme =
        skill.category === 'Frontend'
          ? { bg: '#EBF3FB', border: '#B8D5E5', text: '#346294' }
          : skill.category === 'Backend'
          ? { bg: '#F2EDFB', border: '#D0C2EB', text: '#69548E' }
          : skill.category === 'Data & AI'
          ? { bg: '#FFF3E3', border: '#FAD5A5', text: '#9B5B00' }
          : { bg: '#E3F4E9', border: '#B6E2C6', text: '#25633F' };

      nodes.push({
        id: skillNodeId,
        type: 'default',
        position: { x: posX, y: posY },
        data: {
          label: (
            <div
              onClick={() => {
                setSelectedSkillId(skill.id);
                setSelectedInternshipId(null);
              }}
              className="p-2 text-left cursor-pointer"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold text-[#7E61B2]">
                  Lvl {skill.currentLevel}/5
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-white font-medium text-[#7D8197]">
                  {skill.category}
                </span>
              </div>
              <p className="font-bold text-xs text-[#2B2D42] truncate">{skill.name}</p>
              <div className="w-full bg-[#E3DFD5] h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-[#8E7AB5] h-full rounded-full"
                  style={{ width: `${(skill.currentLevel / 5) * 100}%` }}
                />
              </div>
            </div>
          )
        },
        style: {
          background: isSelected ? '#FAF8F5' : '#FFFFFF',
          border: isSelected ? '2px solid #7E61B2' : `1.5px solid ${colorScheme.border}`,
          borderRadius: '16px',
          boxShadow: isSelected
            ? '0 6px 20px rgba(126, 97, 178, 0.3)'
            : '0 2px 6px rgba(0,0,0,0.03)',
          width: 155
        }
      });

      // Edge from core to skill
      edges.push({
        id: `edge-core-${skillNodeId}`,
        source: 'core-dna',
        target: skillNodeId,
        style: { stroke: isSelected ? '#7E61B2' : '#E0D8ED', strokeWidth: isSelected ? 2.5 : 1 }
      });

      // Edges between internship and skills they gave!
      internships.forEach(intern => {
        const matchesSkill = intern.skillsAcquired.some(
          s => s.toLowerCase() === skill.name.toLowerCase()
        );
        if (matchesSkill) {
          const internNodeId = `node-int-${intern.id}`;
          const isHighlighted =
            selectedInternshipId === intern.id || selectedSkillId === skill.id;
          edges.push({
            id: `edge-int-${intern.id}-skill-${skill.id}`,
            source: internNodeId,
            target: skillNodeId,
            animated: isHighlighted,
            style: {
              stroke: isHighlighted ? '#7E61B2' : '#E8E5DD',
              strokeWidth: isHighlighted ? 2.5 : 1,
              strokeDasharray: isHighlighted ? '4 2' : undefined
            }
          });
        }
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [internships, filteredSkills, selectedSkillId, selectedInternshipId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync state whenever selection changes
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Handle Level Audit Save
  const handleSaveAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkill) return;
    updateSkillLevel(selectedSkill.id, editLevel, auditNote || 'User verified manual audit');
    setShowLevelModal(false);
    setAuditNote('');
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;
    addSkill({
      name: newSkillName,
      category: newSkillCategory,
      startingLevel: 1,
      currentLevel: newSkillLevel,
      targetLevel: newSkillTarget,
      evidence: []
    });
    setShowAddSkillModal(false);
    setNewSkillName('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Tagline Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE5F8] text-[#59477B] text-xs font-semibold mb-2">
            <Dna className="w-3.5 h-3.5 text-[#8675A9]" />
            Signature Showstopper
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2D42]">
            Career DNA Engine™
          </h1>
          <p className="text-sm text-[#74788D]">
            Interactive constellation graph bridging real experiences to verified skill proficiencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddSkillModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1B1E2B] transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Skill Node
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/70 rounded-2xl border border-[#ECE8E1]">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#9A9EAF]" />
          <input
            type="text"
            placeholder="Search constellation nodes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-[#2B2D42] placeholder-[#9A9EAF] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-[#9A9EAF] mr-1" />
          {['All', 'Frontend', 'Backend', 'Data & AI', 'Product & Design', 'DevOps & Cloud'].map(
            cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#2D3142] text-white'
                    : 'bg-[#F2EFE9] text-[#696C80] hover:bg-[#E7E3DC]'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Graph Canvas + Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* React Flow Constellation View */}
        <div className="lg:col-span-8 bg-[#FAF8F5] border border-[#E9E5DC] rounded-3xl h-[620px] relative overflow-hidden shadow-xs">
          {/* Subtle guide note badge */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur border border-[#E8E4DA] rounded-xl px-3 py-1.5 text-[11px] text-[#6B6E83] flex items-center gap-2 shadow-xs pointer-events-none">
            <Info className="w-3.5 h-3.5 text-[#8675A9]" />
            <span>Click any node to inspect evidence & verified audit trail</span>
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            minZoom={0.3}
            maxZoom={1.8}
          >
            <Background color="#D5D0C5" gap={20} size={1} />
            <Controls className="!bg-white !border !border-[#E3DFD5] !rounded-xl !shadow-xs" />
            <MiniMap
              nodeColor={n => (n.id.includes('skill') ? '#9B86BD' : '#73A580')}
              className="!bg-white/80 !border !border-[#E4DFD7] !rounded-xl !overflow-hidden"
            />
          </ReactFlow>
        </div>

        {/* Node Inspector Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Skill Inspector */}
          {selectedSkill ? (
            <div className="p-6 rounded-3xl bg-white/90 border border-[#ECE8E1] shadow-xs space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EAE5F8] text-[#604D81]">
                    {selectedSkill.category}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#2B2D42] mt-1.5">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-xs text-[#82869B] mt-0.5">
                    Audited {selectedSkill.lastUpdated}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditLevel(selectedSkill.currentLevel);
                    setShowLevelModal(true);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF8F5] border border-[#E0DCD3] hover:border-[#8675A9] text-[#44475D] transition cursor-pointer"
                >
                  Audit Level
                </button>
              </div>

              {/* Proficiency Gauge */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EDEAE3] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#75788E] font-medium">Proficiency Progression</span>
                  <span className="font-bold text-[#2B2D42]">
                    Level {selectedSkill.currentLevel} of 5
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <div
                      key={lvl}
                      className={`h-2.5 rounded-full transition-all ${
                        lvl <= selectedSkill.currentLevel
                          ? 'bg-gradient-to-r from-[#9B86BD] to-[#7E61B2]'
                          : lvl <= selectedSkill.targetLevel
                          ? 'bg-[#E3DFD5]'
                          : 'bg-[#F2EFE8]'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex justify-between text-[11px] text-[#7F8399] pt-1">
                  <span>Start: Lvl {selectedSkill.startingLevel}</span>
                  <span>Target: Lvl {selectedSkill.targetLevel}</span>
                </div>
              </div>

              {/* Verified Proofs / Evidence List */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#8A8EA2]">
                    Supporting Evidence ({selectedSkill.evidence.length})
                  </h4>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                    {
                      selectedSkill.evidence.filter(e => e.verificationStatus === 'verified')
                        .length
                    }{' '}
                    Verified
                  </span>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {selectedSkill.evidence.length > 0 ? (
                    selectedSkill.evidence.map(ev => (
                      <div
                        key={ev.id}
                        className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE7DF] space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#2D3043] flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            {ev.referenceTitle}
                          </span>
                          <span className="text-[10px] text-[#868A9F]">{ev.date}</span>
                        </div>
                        <p className="text-[11px] text-[#55586E] leading-relaxed">
                          {ev.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-[#9094A8] bg-[#FAF8F5] rounded-xl border border-dashed border-[#DCD8CF]">
                      No evidence recorded yet. Connect an internship deliverable or log a self-audit!
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF9EE] border border-[#F4EAC8] text-[11px] text-[#855B14] flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Growth Policy:</strong> Internleo never automatically increments
                  skill levels without explicit evidence or self-audit.
                </span>
              </div>
            </div>
          ) : selectedInternship ? (
            /* Internship Inspector */
            <div className="p-6 rounded-3xl bg-white/90 border border-[#ECE8E1] shadow-xs space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {selectedInternship.type === 'present' ? 'Present Role' : 'Past Experience'}
                </span>
                <h3 className="font-serif font-bold text-xl text-[#2B2D42] mt-1.5">
                  {selectedInternship.company}
                </h3>
                <p className="text-xs text-[#62657C] mt-0.5">{selectedInternship.role}</p>
              </div>

              <div className="text-xs space-y-2 text-[#46495E]">
                <p>
                  <strong>Duration:</strong> {selectedInternship.startDate} —{' '}
                  {selectedInternship.endDate || 'Present'}
                </p>
                <p>
                  <strong>Location:</strong> {selectedInternship.location} (
                  {selectedInternship.workMode})
                </p>
                <p className="leading-relaxed text-[#606377]">
                  {selectedInternship.overview}
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#8A8EA2] mb-2">
                  Skills Credited
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInternship.skillsAcquired.map(skill => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#FAF8F5] border border-[#E3DFD5] text-[#34374A]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#8A8E9F] bg-white/60 rounded-3xl border border-[#E8E4DC]">
              Select a node in the constellation to view details.
            </div>
          )}
        </div>
      </div>

      {/* Skill Level Audit Modal */}
      {showLevelModal && selectedSkill && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">
              Audit Skill: {selectedSkill.name}
            </h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Explicitly record your verified proficiency change with evidence.
            </p>

            <form onSubmit={handleSaveAudit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#44475D] block mb-2">
                  Select New Proficiency Level (1 to 5)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setEditLevel(lvl)}
                      className={`py-2 rounded-xl text-xs font-bold transition ${
                        editLevel === lvl
                          ? 'bg-[#2B2D42] text-white shadow-xs'
                          : 'bg-white border border-[#DDD8CE] text-[#55586D]'
                      }`}
                    >
                      Lvl {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">
                  Audit Note / What did you build to prove this?
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Architected complete state machine and shipped to 10k users..."
                  value={auditNote}
                  onChange={e => setAuditNote(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLevelModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#6F7387] hover:bg-[#EFECE6] rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#2B2D42] text-white rounded-xl hover:bg-[#1C1E2D] transition cursor-pointer"
                >
                  Confirm & Update DNA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#ECE8E1] rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h2 className="font-serif font-bold text-xl text-[#2B2D42] mb-1">
              Add Skill Node
            </h2>
            <p className="text-xs text-[#7B7E93] mb-4">
              Add a new capability to your professional constellation graph.
            </p>

            <form onSubmit={handleCreateSkill} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#44475D]">Skill Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Next.js, Rust, Kubernetes"
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44475D]">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={e => setNewSkillCategory(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Data & AI">Data & AI</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="Core & Leadership">Core & Leadership</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Current Level (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={newSkillLevel}
                    onChange={e => setNewSkillLevel(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#44475D]">Target Level (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={newSkillTarget}
                    onChange={e => setNewSkillTarget(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white rounded-xl border border-[#DED9CF]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddSkillModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#6F7387] hover:bg-[#EFECE6] rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#2B2D42] text-white rounded-xl hover:bg-[#1C1E2D] transition cursor-pointer"
                >
                  Create Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
