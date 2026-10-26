import React from 'react';
import { useData } from '../context/DataContext';
import {
  TrendingUp,
  Clock,
  Briefcase,
  Target,
  Sparkles,
  Award,
  ArrowUpRight,
  SendHorizontal,
  ChevronRight,
  ShieldCheck,
  Zap,
  CalendarCheck2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { PageId } from '../components/Sidebar';

interface DashboardProps {
  onNavigate: (page: PageId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { internships, applications, skills, goals, events } = useData();

  const presentInternships = internships.filter(i => i.type === 'present');
  const pastInternships = internships.filter(i => i.type === 'past');

  // Stats calculation
  const totalApps = applications.length;
  const offersCount = applications.filter(a => a.status === 'Offer').length;
  const interviewsCount = applications.filter(a => a.status === 'Interview').length;
  const verifiedSkillsCount = skills.reduce(
    (acc, s) => acc + s.evidence.filter(e => e.verificationStatus === 'verified').length,
    0
  );

  // Application Pipeline Distribution
  const statusCounts = {
    Applied: applications.filter(a => a.status === 'Applied').length,
    Assessment: applications.filter(a => a.status === 'Assessment').length,
    Interview: applications.filter(a => a.status === 'Interview').length,
    Offer: applications.filter(a => a.status === 'Offer').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length
  };

  const funnelData = [
    { name: 'Applied', value: statusCounts.Applied, color: '#C6D8D3' },
    { name: 'Assessment', value: statusCounts.Assessment, color: '#FCD5CE' },
    { name: 'Interview', value: statusCounts.Interview, color: '#D8B4E2' },
    { name: 'Offer', value: statusCounts.Offer, color: '#B5E2FA' }
  ];

  // Skill category radar or bar
  const skillCategoryData = skills.slice(0, 6).map(s => ({
    name: s.name.split(' ')[0],
    current: s.currentLevel,
    target: s.targetLevel
  }));

  // Upcoming deadlines / events (next 5)
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F4EEF8] via-[#FCEFE8] to-[#EEF6F8] p-8 border border-white/60 shadow-sm">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#DED6F7]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-48 -mb-12 w-60 h-60 bg-[#FEDFD0]/30 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur border border-white text-xs font-semibold text-[#68588A] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A070C0]" />
            Career Momentum: Outstanding
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#27293D] tracking-tight mb-2">
            Welcome back, Leo.
          </h1>
          <p className="text-[#696C80] text-sm leading-relaxed mb-6">
            You currently have <strong className="text-[#323447]">{presentInternships.length} active internship</strong>,{' '}
            <strong className="text-[#323447]">{interviewsCount} pending interview stages</strong>, and{' '}
            <strong className="text-[#323447]">{offersCount} active offer</strong>. Your Career DNA has grown with {verifiedSkillsCount} verified proofs.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('career-dna')}
              className="px-4 py-2.5 rounded-xl bg-[#2D3142] text-white text-xs font-medium hover:bg-[#1E212D] transition shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Explore Career DNA Engine
            </button>
            <button
              onClick={() => onNavigate('opportunity-xray')}
              className="px-4 py-2.5 rounded-xl bg-white/90 border border-[#E4DFD7] text-[#42445A] text-xs font-medium hover:bg-white transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7E61B2]" />
              Run Opportunity X-Ray
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Internship */}
        <div
          onClick={() => onNavigate('present-internships')}
          className="p-5 rounded-2xl bg-white/80 border border-[#ECE8E1] hover:border-[#D1CAE4] transition cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#7C8097]">Present Internship</span>
            <div className="p-2 rounded-xl bg-[#E2F0D9] text-[#2D6A4F] group-hover:scale-105 transition">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-[#2B2D42]">
            {presentInternships.length > 0 ? presentInternships[0].company : 'None active'}
          </div>
          <p className="text-xs text-[#82869C] mt-1 flex items-center gap-1">
            {presentInternships.length > 0
              ? `${presentInternships[0].progressPercent}% sprint progress`
              : 'Add current role'}
          </p>
        </div>

        {/* Total Applications */}
        <div
          onClick={() => onNavigate('applications')}
          className="p-5 rounded-2xl bg-white/80 border border-[#ECE8E1] hover:border-[#D1CAE4] transition cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#7C8097]">Active Pipeline</span>
            <div className="p-2 rounded-xl bg-[#FFF1D6] text-[#B58300] group-hover:scale-105 transition">
              <SendHorizontal className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-[#2B2D42]">
            {totalApps} <span className="text-xs font-normal text-[#8B8FA3]">apps tracked</span>
          </div>
          <p className="text-xs text-[#82869C] mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-600">{offersCount} Offer</span> ·{' '}
            <span className="text-purple-600">{interviewsCount} In Interview</span>
          </p>
        </div>

        {/* Skill Inventory */}
        <div
          onClick={() => onNavigate('career-dna')}
          className="p-5 rounded-2xl bg-white/80 border border-[#ECE8E1] hover:border-[#D1CAE4] transition cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#7C8097]">Career DNA Skills</span>
            <div className="p-2 rounded-xl bg-[#E8E5F8] text-[#69548E] group-hover:scale-105 transition">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-[#2B2D42]">
            {skills.length} <span className="text-xs font-normal text-[#8B8FA3]">mastered</span>
          </div>
          <p className="text-xs text-[#69548E] mt-1 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> {verifiedSkillsCount} verified work proofs
          </p>
        </div>

        {/* Career Goals */}
        <div
          onClick={() => onNavigate('career-goals')}
          className="p-5 rounded-2xl bg-white/80 border border-[#ECE8E1] hover:border-[#D1CAE4] transition cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#7C8097]">Active Milestones</span>
            <div className="p-2 rounded-xl bg-[#FFE4E1] text-[#A84242] group-hover:scale-105 transition">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-[#2B2D42]">
            {goals.filter(g => g.status === 'In Progress').length} / {goals.length}
          </div>
          <p className="text-xs text-[#82869C] mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Key target: Winter 2027
          </p>
        </div>
      </div>

      {/* Main Charts & Highlights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Stage Distribution */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2B2D42]">
                Application Funnel & Pipeline
              </h3>
              <p className="text-xs text-[#888C9F]">Current status of your recruitment cycles</p>
            </div>
            <button
              onClick={() => onNavigate('applications')}
              className="text-xs font-medium text-[#77529E] hover:underline flex items-center gap-1"
            >
              Kanban Board <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 0 }}>
                <XAxis type="number" stroke="#A4A8BD" fontSize={11} allowDecimals={false} />
                <YAxis dataKey="name" type="category" stroke="#686C80" fontSize={12} width={80} />
                <Tooltip
                  cursor={{ fill: 'rgba(230, 230, 240, 0.4)' }}
                  contentStyle={{
                    backgroundColor: '#FAF9F6',
                    borderRadius: '12px',
                    borderColor: '#E2DFD6',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Proficiency Comparison */}
        <div className="p-6 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2B2D42]">Skill Proficiency</h3>
                <p className="text-xs text-[#888C9F]">Current vs Target (1–5 scale)</p>
              </div>
              <button
                onClick={() => onNavigate('career-dna')}
                className="text-xs text-[#77529E] font-medium hover:underline"
              >
                Graph <ArrowUpRight className="w-3.5 h-3.5 inline" />
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {skills.slice(0, 5).map(skill => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#3A3D52] truncate max-w-[140px]">
                      {skill.name}
                    </span>
                    <span className="text-[#84879C]">
                      Level {skill.currentLevel} / {skill.targetLevel}
                    </span>
                  </div>
                  <div className="w-full bg-[#EFECE6] h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-gradient-to-r from-[#B9A3E3] to-[#8675A9] h-full rounded-full transition-all"
                      style={{ width: `${(skill.currentLevel / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-[#F6F4FB] border border-[#EBE4F6] text-xs text-[#635185] flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-[#8E7AB5]" />
            <span>Updating skills requires verified evidence or explicit self-audit.</span>
          </div>
        </div>
      </div>

      {/* Lower Row: Present Internship Highlight + Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Present Internship Sprint Pulse */}
        <div className="p-6 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="font-serif font-bold text-lg text-[#2B2D42]">
                Active Work In Progress
              </h3>
            </div>
            <button
              onClick={() => onNavigate('present-internships')}
              className="text-xs text-[#77529E] font-medium hover:underline flex items-center gap-0.5"
            >
              Open workspace <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {presentInternships.length > 0 ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-tr from-[#F7FAF8] to-[#EEF5F1] border border-[#DCEDE2]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#244230]">
                      {presentInternships[0].company} — {presentInternships[0].role}
                    </h4>
                    <p className="text-xs text-[#52745F]">
                      Manager: {presentInternships[0].manager || 'Not specified'}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 font-medium">
                    {presentInternships[0].workMode}
                  </span>
                </div>

                <p className="text-xs text-[#385343] mb-3">
                  <strong>Current Objective:</strong> {presentInternships[0].currentSprintObjective}
                </p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-[#52745F]">
                    <span>Internship Completion</span>
                    <span>{presentInternships[0].progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#D5E8DB] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${presentInternships[0].progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Outstanding tasks */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#8B8EA1] uppercase tracking-wider">
                  Upcoming Sprints / Deliverables
                </p>
                {presentInternships[0].tasks?.slice(0, 3).map(task => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EFECE6] text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                          task.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-[#CBD0D8]'
                        }`}
                      >
                        {task.completed && '✓'}
                      </span>
                      <span className={task.completed ? 'line-through text-[#9DA0AF]' : 'text-[#333649]'}>
                        {task.title}
                      </span>
                    </div>
                    {task.dueDate && (
                      <span className="text-[11px] text-[#868A9E]">{task.dueDate}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-[#8A8E9E]">
              No active internship logged. Add one from the Present Internship tab!
            </div>
          )}
        </div>

        {/* Upcoming Calendar Events & Deadlines */}
        <div className="p-6 rounded-2xl bg-white/80 border border-[#ECE8E1] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-lg text-[#2B2D42]">Upcoming Deadlines</h3>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-xs text-[#77529E] font-medium hover:underline flex items-center gap-0.5"
            >
              Full Calendar <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map(event => {
              const badgeColors =
                event.type === 'Interview'
                  ? 'bg-purple-100 text-purple-700'
                  : event.type === 'Deadline'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-blue-100 text-blue-700';

              return (
                <div
                  key={event.id}
                  className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EFECE6] flex items-start justify-between gap-3 hover:bg-white transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeColors}`}>
                        {event.type}
                      </span>
                      <span className="text-xs font-semibold text-[#2C2E40]">
                        {event.company ? `${event.company} · ` : ''}
                        {event.title}
                      </span>
                    </div>
                    {event.notes && (
                      <p className="text-[11px] text-[#797D91] line-clamp-1">{event.notes}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-medium text-[#494C60]">{event.date}</span>
                    {event.time && (
                      <p className="text-[10px] text-[#8C8F9F]">{event.time}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
