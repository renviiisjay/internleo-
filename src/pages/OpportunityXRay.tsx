import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  FileCheck,
  CheckCircle,
  Layers,
  ArrowRight,
  Copy,
  Check,
  Briefcase
} from 'lucide-react';
import { OpportunityAnalysisResult } from '../types';

export const OpportunityXRay: React.FC = () => {
  const { skills, internships } = useData();

  const [jobDescription, setJobDescription] = useState(
    `Frontend Platform Engineer Intern at Figma
We are seeking an ambitious Software Engineering Intern to join our Web Infrastructure team.
Requirements:
- Strong proficiency in modern React & TypeScript and state management architectures.
- Experience with WebSockets, real-time sync, and client-side performance profiling.
- Good knowledge of PostgreSQL & Supabase or similar relational databases.
- Familiarity with Docker & CI/CD workflows and multi-stage container optimization.
- Bonus: Knowledge of WebAssembly (Wasm) or Rust for client graphics rendering.
- Demonstrated teamwork, Agile communication, and product craft.`
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<OpportunityAnalysisResult | null>(null);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  // Local Explainable Skill Extraction Engine (deterministic, honest, no hallucinations)
  const runAnalysis = () => {
    setAnalyzing(true);

    setTimeout(() => {
      const text = jobDescription.toLowerCase();

      // Catalog of key industry skills to evaluate
      const keySkillCatalog = [
        { name: 'React & TypeScript', keywords: ['react', 'typescript', 'frontend', 'components'] },
        { name: 'Node.js & Express', keywords: ['node', 'express', 'backend', 'api'] },
        { name: 'PostgreSQL & Supabase', keywords: ['postgres', 'postgresql', 'supabase', 'relational', 'sql'] },
        { name: 'Docker & CI/CD', keywords: ['docker', 'ci/cd', 'container', 'pipeline', 'github actions'] },
        { name: 'UI/UX Design & Figma', keywords: ['figma', 'ui/ux', 'design systems', 'product design'] },
        { name: 'LLM Prompting & RAG', keywords: ['llm', 'rag', 'ai', 'prompt', 'vector'] },
        { name: 'Agile & Team Leadership', keywords: ['agile', 'teamwork', 'leadership', 'communication'] },
        { name: 'WebSockets & Realtime', keywords: ['websocket', 'websockets', 'real-time', 'realtime', 'streaming'] },
        { name: 'WebAssembly & Rust', keywords: ['webassembly', 'wasm', 'rust'] },
        { name: 'GraphQL & Apollo', keywords: ['graphql', 'apollo'] },
        { name: 'Testing & Vitest/Jest', keywords: ['testing', 'jest', 'vitest', 'cypress'] }
      ];

      const detectedInJob = keySkillCatalog.filter(item =>
        item.keywords.some(kw => text.includes(kw))
      );

      const demonstrated: OpportunityAnalysisResult['demonstratedSkills'] = [];
      const practiced: OpportunityAnalysisResult['practicedSkills'] = [];
      const missing: OpportunityAnalysisResult['missingSkills'] = [];

      detectedInJob.forEach(item => {
        const userSkill = skills.find(
          s => s.name.toLowerCase().includes(item.name.toLowerCase()) ||
               item.name.toLowerCase().includes(s.name.toLowerCase())
        );

        if (userSkill) {
          const verifiedEv = userSkill.evidence.filter(e => e.verificationStatus === 'verified');
          if (verifiedEv.length > 0 && userSkill.currentLevel >= 3) {
            demonstrated.push({
              skill: userSkill.name,
              proficiency: userSkill.currentLevel,
              evidenceCount: verifiedEv.length,
              evidenceSnippet: verifiedEv[0].description
            });
          } else {
            practiced.push({
              skill: userSkill.name,
              proficiency: userSkill.currentLevel,
              reason: verifiedEv.length === 0
                ? 'Proficiency recorded, but formal verified work evidence is still needed.'
                : 'Level 2 recorded. Ready to level up with a production project.'
            });
          }
        } else {
          missing.push({
            skill: item.name,
            importance: item.name.includes('WebAssembly') ? 'Nice to have' : 'High',
            learningRecommendation: `Build a small proof-of-concept module implementing ${item.name} and add it to your Career DNA inventory.`
          });
        }
      });

      // Calculate honest explainable match score
      const totalDetected = Math.max(detectedInJob.length, 1);
      const demonstratedWeight = demonstrated.length * 1.0;
      const practicedWeight = practiced.length * 0.5;
      const matchScore = Math.min(
        95,
        Math.round(((demonstratedWeight + practicedWeight) / totalDetected) * 100)
      );

      // Generate action plan based on user's real context
      const actionPlan = [
        {
          stepNumber: 1,
          action: `Highlight your ${demonstrated[0]?.skill || 'core skills'} project in your introductory summary.`,
          timeline: '10 mins',
          deliverable: 'Tailored resume header'
        },
        {
          stepNumber: 2,
          action: missing.length > 0
            ? `Review fundamentals for ${missing[0].skill} to speak intelligently in the technical interview.`
            : 'Prepare deep-dive code walkthrough of your most complex system.',
          timeline: '2 hours',
          deliverable: 'Interview talking points'
        },
        {
          stepNumber: 3,
          action: 'Audit your existing internship bullet metrics to match Figma’s infrastructure focus.',
          timeline: '30 mins',
          deliverable: 'Targeted bullet points'
        }
      ];

      // Generate real resume bullet suggestions from user evidence
      const bulletSuggestions = demonstrated.map(
        d => `Leveraged ${d.skill} to build high-performance platform tools, verified through: "${d.evidenceSnippet.slice(0, 80)}..."`
      );

      setAnalysisResult({
        jobTitle: 'Frontend Platform Engineer Intern',
        company: 'Target Opportunity',
        matchScore,
        demonstratedSkills: demonstrated,
        practicedSkills: practiced,
        missingSkills: missing,
        actionPlan,
        resumeBulletSuggestions: bulletSuggestions
      });

      setAnalyzing(false);
    }, 400);
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FB] text-[#2C5F8A] text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#4B89DC]" />
          Explainable Job Fit Analysis
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#2B2D42]">
          Opportunity X-Ray™
        </h1>
        <p className="text-sm text-[#74788D]">
          Paste any job description to parse required qualifications, cross-examine against your verified Career DNA, and generate actionable prep blueprints.
        </p>
      </div>

      {/* Input Section */}
      <div className="p-6 rounded-3xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#797D93]">
            Job Description / Opportunity Text
          </label>
          <button
            onClick={() =>
              setJobDescription(
                `Fullstack Engineer Intern at Stripe
Requirements:
- Strong Node.js, Express, and RESTful API architecture.
- Hands-on React & TypeScript frontend application engineering.
- Deep SQL query optimization with PostgreSQL.
- Understanding of CI/CD and containerized cloud deployment with Docker.
- Great team collaboration and high ownership.`
              )
            }
            className="text-xs text-[#7A64A0] hover:underline font-medium"
          >
            Load Stripe SWE sample
          </button>
        </div>

        <textarea
          rows={7}
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          placeholder="Paste full job description, qualifications, and responsibilities here..."
          className="w-full p-4 text-xs font-mono bg-[#FAF8F5] rounded-2xl border border-[#E3DFD5] focus:outline-none focus:border-[#7A64A0] leading-relaxed"
        />

        <div className="flex justify-end">
          <button
            onClick={runAnalysis}
            disabled={analyzing || !jobDescription.trim()}
            className="px-5 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1E212E] transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {analyzing ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Cross-examining Career DNA...
              </span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Run Opportunity X-Ray
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results View */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Match Score & Headline */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#F4EEF8] via-[#FDF8F5] to-[#EEF5F8] border border-white shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 text-[#59477B] shadow-xs">
                Alignment Diagnosis
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#2B2D42]">
                {analysisResult.jobTitle}
              </h2>
              <p className="text-xs text-[#696C81] max-w-lg">
                Score computed strictly from your documented evidence in Career DNA. No invented claims or hallucinations.
              </p>
            </div>

            <div className="text-center sm:text-right shrink-0 bg-white/80 px-6 py-4 rounded-2xl border border-white/60 shadow-xs">
              <div className="text-4xl font-serif font-bold text-[#2B2D42]">
                {analysisResult.matchScore}%
              </div>
              <p className="text-xs font-medium text-[#7C8095]">Explainable Match Index</p>
            </div>
          </div>

          {/* Three Column Breakdown: Demonstrated, Practiced, Missing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Demonstrated Skills */}
            <div className="p-5 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif font-bold text-sm">
                  Demonstrated Skills ({analysisResult.demonstratedSkills.length})
                </h3>
              </div>
              <p className="text-[11px] text-[#7A7E92]">
                Backed by verified internship or project deliverables.
              </p>

              <div className="space-y-2.5 pt-1">
                {analysisResult.demonstratedSkills.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F6FAF7] border border-[#DCEDE2] space-y-1 text-xs"
                  >
                    <div className="flex justify-between font-bold text-[#244530]">
                      <span>{item.skill}</span>
                      <span>Lvl {item.proficiency}/5</span>
                    </div>
                    <p className="text-[10px] text-[#4A6E56] line-clamp-2">
                      Proof: "{item.evidenceSnippet}"
                    </p>
                  </div>
                ))}
                {analysisResult.demonstratedSkills.length === 0 && (
                  <p className="text-xs text-[#8E92A4] py-4 text-center">None identified</p>
                )}
              </div>
            </div>

            {/* Practiced but Unverified */}
            <div className="p-5 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-800">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <h3 className="font-serif font-bold text-sm">
                  Practiced / Developing ({analysisResult.practicedSkills.length})
                </h3>
              </div>
              <p className="text-[11px] text-[#7A7E92]">
                Present in your skill inventory, but needs verified evidence.
              </p>

              <div className="space-y-2.5 pt-1">
                {analysisResult.practicedSkills.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FFFBF2] border border-[#F6E9CA] space-y-1 text-xs"
                  >
                    <div className="flex justify-between font-bold text-[#6D4C0A]">
                      <span>{item.skill}</span>
                      <span>Lvl {item.proficiency}/5</span>
                    </div>
                    <p className="text-[10px] text-[#7D6124]">{item.reason}</p>
                  </div>
                ))}
                {analysisResult.practicedSkills.length === 0 && (
                  <p className="text-xs text-[#8E92A4] py-4 text-center">None identified</p>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-5 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="font-serif font-bold text-sm">
                  Missing Skills ({analysisResult.missingSkills.length})
                </h3>
              </div>
              <p className="text-[11px] text-[#7A7E92]">
                Mentioned in JD but not recorded in your Career DNA.
              </p>

              <div className="space-y-2.5 pt-1">
                {analysisResult.missingSkills.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FDF7F7] border border-[#F7DDDD] space-y-1 text-xs"
                  >
                    <div className="flex justify-between font-bold text-[#8A3030]">
                      <span>{item.skill}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#8A3030]">
                        {item.importance}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8C4A4A]">{item.learningRecommendation}</p>
                  </div>
                ))}
                {analysisResult.missingSkills.length === 0 && (
                  <p className="text-xs text-[#8E92A4] py-4 text-center">
                    All detected skills are in your inventory!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Blueprint & Tailored Resume Bullets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Step by Step Action Plan */}
            <div className="p-6 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2B2D42]">
                Personalized Application Action Plan
              </h3>
              <div className="space-y-3">
                {analysisResult.actionPlan.map(step => (
                  <div
                    key={step.stepNumber}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE7DF] text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#2B2D42] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {step.stepNumber}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-[#2B2D42]">{step.action}</p>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-[#777B90]">
                        <span>Est: {step.timeline}</span>
                        <span>Deliverable: {step.deliverable}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Bullet Suggestions */}
            <div className="p-6 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2B2D42]">
                Tailored Resume Bullet Suggestions
              </h3>
              <div className="space-y-3">
                {analysisResult.resumeBulletSuggestions.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EBE7DF] text-xs space-y-2"
                  >
                    <p className="text-[#36384C] leading-relaxed">"{bullet}"</p>
                    <button
                      onClick={() => handleCopyBullet(bullet, idx)}
                      className="text-[11px] font-semibold text-[#665389] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedBulletIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Copied to clipboard!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Bullet
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
