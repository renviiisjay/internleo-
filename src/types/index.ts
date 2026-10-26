export interface SkillEvidence {
  id: string;
  type: 'internship' | 'project' | 'certification' | 'task';
  referenceTitle: string; // e.g. "Fintech Dashboard Redesign at Stripe"
  date: string;
  description: string;
  verificationStatus: 'verified' | 'unverified';
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Product & Design' | 'Data & AI' | 'DevOps & Cloud' | 'Core & Leadership';
  startingLevel: number; // 1-5
  currentLevel: number;  // 1-5
  targetLevel: number;   // 1-5
  lastUpdated: string;
  evidence: SkillEvidence[];
  notes?: string;
}

export interface InternshipProject {
  id: string;
  title: string;
  description: string;
  impactMetrics?: string; // e.g. "Reduced latency by 32%"
  skillsUsed: string[];
  link?: string;
}

export interface TaskMilestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  category: 'Task' | 'Milestone' | 'Deliverable';
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  logoUrl?: string;
  type: 'past' | 'present';
  startDate: string;
  endDate?: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  manager?: string;
  team?: string;
  overview: string;
  projects: InternshipProject[];
  achievements: string[];
  certificates: {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string;
  }[];
  skillsAcquired: string[]; // skill names or IDs
  
  // Specific to present internships
  tasks?: TaskMilestone[];
  weeklyHours?: number;
  progressPercent?: number;
  currentSprintObjective?: string;
}

export type ApplicationStatus = 'Applied' | 'Assessment' | 'Interview' | 'Offer' | 'Rejected' | 'Withdrawn';

export interface ApplicationInterview {
  id: string;
  roundName: string; // e.g. "Technical Screen", "System Design"
  date: string;
  interviewer?: string;
  notes?: string;
  completed: boolean;
}

export interface Application {
  id: string;
  company: string;
  role: string;
  jobLink?: string;
  appliedDate: string;
  status: ApplicationStatus;
  resumeVersion: string;
  compensation?: string;
  location?: string;
  followUpDate?: string;
  notes?: string;
  interviews: ApplicationInterview[];
  rating?: number; // 1-5 preference
}

export interface ResumeBullet {
  id: string;
  skillId?: string;
  experienceTitle: string;
  actionVerb: string;
  bulletText: string;
  quantifiableResult: string;
  tags: string[];
}

export interface ResumeVersion {
  id: string;
  name: string; // e.g. "Fullstack_Winter2025.pdf"
  targetRole: string;
  updatedAt: string;
  mappedSkills: string[];
  summary: string;
  bullets: ResumeBullet[];
}

export interface CareerGoal {
  id: string;
  title: string;
  category: 'Skill Mastery' | 'Target Company' | 'Certification' | 'Project' | 'Mentorship';
  targetDate: string;
  progress: number; // 0-100
  status: 'In Progress' | 'Completed' | 'Deferred';
  actionSteps: {
    id: string;
    text: string;
    done: boolean;
  }[];
  relatedSkills: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'Interview' | 'Deadline' | 'Follow-up' | 'Milestone' | 'Reminder';
  date: string; // ISO date string YYYY-MM-DD
  time?: string;
  company?: string;
  notes?: string;
  status?: 'pending' | 'completed';
}

export interface OpportunityAnalysisResult {
  jobTitle: string;
  company?: string;
  matchScore: number; // 0 - 100
  demonstratedSkills: {
    skill: string;
    proficiency: number;
    evidenceCount: number;
    evidenceSnippet: string;
  }[];
  practicedSkills: {
    skill: string;
    proficiency: number;
    reason: string;
  }[];
  missingSkills: {
    skill: string;
    importance: 'High' | 'Medium' | 'Nice to have';
    learningRecommendation: string;
  }[];
  actionPlan: {
    stepNumber: number;
    action: string;
    timeline: string;
    deliverable: string;
  }[];
  resumeBulletSuggestions: string[];
}
