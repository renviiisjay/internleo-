import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Clock,
  SendHorizontal,
  Dna,
  FileText,
  Target,
  Calendar,
  Sparkles,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'present-internships'
  | 'past-internships'
  | 'applications'
  | 'career-dna'
  | 'opportunity-xray'
  | 'resume-studio'
  | 'career-goals'
  | 'calendar';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onResetData: () => void;
  activePresentCount: number;
  activeAppsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  onResetData,
  activePresentCount,
  activeAppsCount
}) => {
  const navItems = [
    { id: 'dashboard' as PageId, label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'present-internships' as PageId,
      label: 'Present Internship',
      icon: Clock,
      badge: activePresentCount > 0 ? `${activePresentCount} Active` : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-700'
    },
    { id: 'past-internships' as PageId, label: 'Past Internships', icon: Briefcase },
    {
      id: 'applications' as PageId,
      label: 'Applications',
      icon: SendHorizontal,
      badge: activeAppsCount > 0 ? `${activeAppsCount}` : undefined,
      badgeColor: 'bg-amber-100 text-amber-700'
    },
    {
      id: 'career-dna' as PageId,
      label: 'Career DNA Engine',
      icon: Dna,
      highlight: true
    },
    {
      id: 'opportunity-xray' as PageId,
      label: 'Opportunity X-Ray',
      icon: Sparkles,
      highlight: true
    },
    { id: 'resume-studio' as PageId, label: 'Resume Studio', icon: FileText },
    { id: 'career-goals' as PageId, label: 'Career Goals', icon: Target },
    { id: 'calendar' as PageId, label: 'Calendar', icon: Calendar }
  ];

  return (
    <aside className="w-72 bg-[#FAF8F5] border-r border-[#EFECE6] flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C5B4E3] via-[#B8D5E5] to-[#FDE2D6] p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-white/90 rounded-2xl flex items-center justify-center">
                <Dna className="w-5 h-5 text-[#6B5B95]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#2B2D42]">
                  Intern<span className="text-[#8675A9]">leo</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-[#E8E5F8] text-[#554971] rounded-md">
                  PRO
                </span>
              </div>
              <p className="text-xs text-[#8C8F9E] font-medium tracking-wide">
                Your journey, in progress.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-3 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-[#A0A3B1] tracking-wider uppercase mb-2">
            Workspace
          </p>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group text-left ${
                  isActive
                    ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[#2B2D42] font-semibold border border-[#EBE8E1]'
                    : 'text-[#6C7084] hover:bg-[#F2EFE9] hover:text-[#2B2D42]'
                } ${item.highlight && !isActive ? 'hover:bg-gradient-to-r hover:from-[#F4F0FB] hover:to-[#EBF3FB]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#E8E5F8] text-[#5F4B8B]'
                        : item.highlight
                        ? 'bg-[#F2EDFB] text-[#7E61B2] group-hover:bg-[#E8E2F6]'
                        : 'text-[#858A9F] group-hover:text-[#2B2D42]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E7AB5] animate-pulse" />
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#8675A9]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / User Profile & Controls */}
      <div className="p-4 border-t border-[#EFECE6] bg-[#FAF8F5]/80 space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F8D4C8] to-[#E3EAF7] flex items-center justify-center font-bold text-xs text-[#525266] border border-white shadow-sm">
              IL
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2B2D42]">Leo Martinez</p>
              <p className="text-[10px] text-[#8C8F9E]">SWE & Design Fellow</p>
            </div>
          </div>
          <button
            onClick={onResetData}
            title="Reset to Demo Data"
            className="p-1.5 text-[#8C8F9E] hover:text-[#2B2D42] hover:bg-white rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
