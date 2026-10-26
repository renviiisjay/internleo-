import { Skill, Internship, Application, ResumeVersion, CareerGoal, CalendarEvent } from '../types';

export const INITIAL_SKILLS: Skill[] = [
  {
    id: 'skill-react',
    name: 'React & TypeScript',
    category: 'Frontend',
    startingLevel: 2,
    currentLevel: 4,
    targetLevel: 5,
    lastUpdated: '2026-09-15',
    evidence: [
      {
        id: 'ev-1',
        type: 'internship',
        referenceTitle: 'Frontend Engineer Intern at Acme Labs',
        date: '2026-08-10',
        description: 'Architected reusable design system components used by 12 client-facing apps with full TypeScript coverage.',
        verificationStatus: 'verified'
      },
      {
        id: 'ev-2',
        type: 'project',
        referenceTitle: 'Collaborative Workspace Canvas',
        date: '2026-05-20',
        description: 'Engineered high-performance real-time whiteboard utilizing React 19 and WebSockets.',
        verificationStatus: 'verified'
      }
    ]
  },
  {
    id: 'skill-node',
    name: 'Node.js & Express',
    category: 'Backend',
    startingLevel: 1,
    currentLevel: 3,
    targetLevel: 4,
    lastUpdated: '2026-08-20',
    evidence: [
      {
        id: 'ev-3',
        type: 'internship',
        referenceTitle: 'Software Engineering Intern at Acme Labs',
        date: '2026-07-28',
        description: 'Created 4 RESTful microservices for telemetry data processing with Redis caching layer.',
        verificationStatus: 'verified'
      }
    ]
  },
  {
    id: 'skill-graphql',
    name: 'GraphQL & Apollo',
    category: 'Backend',
    startingLevel: 1,
    currentLevel: 2,
    targetLevel: 4,
    lastUpdated: '2026-06-10',
    evidence: [
      {
        id: 'ev-4',
        type: 'project',
        referenceTitle: 'E-commerce API Gateway',
        date: '2026-04-12',
        description: 'Configured federated GraphQL schema resolving product catalog and checkout cart services.',
        verificationStatus: 'unverified'
      }
    ]
  },
  {
    id: 'skill-sql',
    name: 'PostgreSQL & Supabase',
    category: 'Backend',
    startingLevel: 2,
    currentLevel: 4,
    targetLevel: 5,
    lastUpdated: '2026-10-01',
    evidence: [
      {
        id: 'ev-5',
        type: 'internship',
        referenceTitle: 'Product Analytics at DataBloom',
        date: '2026-09-20',
        description: 'Optimized complex query execution plans reducing 95th percentile query latency from 840ms to 95ms.',
        verificationStatus: 'verified'
      }
    ]
  },
  {
    id: 'skill-ui-ux',
    name: 'UI/UX Design & Figma',
    category: 'Product & Design',
    startingLevel: 2,
    currentLevel: 4,
    targetLevel: 4,
    lastUpdated: '2026-09-22',
    evidence: [
      {
        id: 'ev-6',
        type: 'internship',
        referenceTitle: 'Product Design Co-op at NovaScale',
        date: '2026-09-18',
        description: 'Designed unified dark/light theme tokens and ran usability testing with 18 enterprise users.',
        verificationStatus: 'verified'
      }
    ]
  },
  {
    id: 'skill-docker',
    name: 'Docker & CI/CD',
    category: 'DevOps & Cloud',
    startingLevel: 1,
    currentLevel: 3,
    targetLevel: 4,
    lastUpdated: '2026-07-15',
    evidence: [
      {
        id: 'ev-7',
        type: 'internship',
        referenceTitle: 'Acme Labs DevOps Guild',
        date: '2026-07-10',
        description: 'Standardized multi-stage container builds saving 40% pipeline execution time in GitHub Actions.',
        verificationStatus: 'verified'
      }
    ]
  },
  {
    id: 'skill-ai',
    name: 'LLM Prompting & RAG',
    category: 'Data & AI',
    startingLevel: 1,
    currentLevel: 3,
    targetLevel: 5,
    lastUpdated: '2026-10-12',
    evidence: [
      {
        id: 'ev-8',
        type: 'project',
        referenceTitle: 'DocuChat Retrieval Engine',
        date: '2026-10-05',
        description: 'Built vector semantic search with pgvector and chunk evaluation pipelines.',
        verificationStatus: 'verified'
      }
    ]
  },
  {
    id: 'skill-agile',
    name: 'Agile & Team Leadership',
    category: 'Core & Leadership',
    startingLevel: 2,
    currentLevel: 4,
    targetLevel: 5,
    lastUpdated: '2026-09-30',
    evidence: [
      {
        id: 'ev-9',
        type: 'internship',
        referenceTitle: 'Team Lead Intern at NovaScale',
        date: '2026-09-25',
        description: 'Facilitated bi-weekly sprint planning, retrospectives, and cross-functional design handoffs.',
        verificationStatus: 'verified'
      }
    ]
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'int-1',
    company: 'Acme Labs',
    role: 'Frontend Engineering Intern',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    type: 'past',
    startDate: '2026-05-15',
    endDate: '2026-08-25',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    manager: 'Elena Vance (Staff Engineer)',
    team: 'Core Platform & Design Systems',
    overview: 'Spearheaded design system modernization, accelerated frontend load times, and mentored two junior fellows.',
    projects: [
      {
        id: 'proj-1',
        title: 'Component Library v3 Overhaul',
        description: 'Migrated 45+ legacy components to accessible Radix primitives with zero regression.',
        impactMetrics: 'Adopted across 12 product teams; cut design bug reports by 48%',
        skillsUsed: ['React & TypeScript', 'UI/UX Design & Figma', 'Docker & CI/CD']
      },
      {
        id: 'proj-2',
        title: 'Telemetry Event Pipeline',
        description: 'Engineered lightweight client-side event batcher reducing redundant network payloads.',
        impactMetrics: 'Saved ~2.4GB data payload per user monthly',
        skillsUsed: ['React & TypeScript', 'Node.js & Express']
      }
    ],
    achievements: [
      'Awarded "High Impact Contributor" among summer cohort of 35 interns',
      'Authored engineering RFC on token-based design systems that became official company standard'
    ],
    certificates: [
      {
        id: 'cert-1',
        title: 'Advanced Web Architecture Certificate',
        issuer: 'Acme Engineering Guild',
        issueDate: '2026-08-20'
      }
    ],
    skillsAcquired: ['React & TypeScript', 'Node.js & Express', 'Docker & CI/CD']
  },
  {
    id: 'int-2',
    company: 'NovaScale AI',
    role: 'Full Stack & Product Engineer Intern',
    logoUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=120&auto=format&fit=crop&q=80',
    type: 'present',
    startDate: '2026-09-01',
    endDate: '2026-12-15',
    location: 'New York / Remote',
    workMode: 'Remote',
    manager: 'Marcus Sterling (Head of Product)',
    team: 'AI Agents & Growth Experience',
    overview: 'Building user-facing autonomy dashboards and evaluating agentic execution telemetry for enterprise customers.',
    weeklyHours: 25,
    progressPercent: 65,
    currentSprintObjective: 'Finalize real-time streaming tokens UI and hook up PostgreSQL telemetry views.',
    projects: [
      {
        id: 'proj-3',
        title: 'Agent Workflow Playground',
        description: 'Interactive canvas allowing non-technical enterprise users to chain custom prompts and web search tools.',
        impactMetrics: 'Increased pilot user activation by 35%',
        skillsUsed: ['React & TypeScript', 'LLM Prompting & RAG', 'PostgreSQL & Supabase']
      }
    ],
    achievements: [
      'Delivered sprint deliverables 4 days ahead of scheduled stakeholder demo',
      'Invited to present agent UX architecture at company-wide Tech Showcase'
    ],
    certificates: [],
    skillsAcquired: ['React & TypeScript', 'PostgreSQL & Supabase', 'LLM Prompting & RAG', 'Agile & Team Leadership'],
    tasks: [
      { id: 't-1', title: 'Implement WebSocket retry exponential backoff for stream disconnection', completed: true, dueDate: '2026-10-20', category: 'Task' },
      { id: 't-2', title: 'Conduct mid-term engineering check-in with Marcus', completed: true, dueDate: '2026-10-22', category: 'Milestone' },
      { id: 't-3', title: 'Ship multi-tenant permission gates on the Agent Playground', completed: false, dueDate: '2026-10-29', category: 'Deliverable' },
      { id: 't-4', title: 'Prepare end-of-internship presentation deck and impact report', completed: false, dueDate: '2026-11-20', category: 'Milestone' }
    ]
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    company: 'Stripe',
    role: 'Software Engineer Intern (Frontend / Infrastructure)',
    jobLink: 'https://stripe.com/jobs/swe-intern',
    appliedDate: '2026-09-28',
    status: 'Interview',
    resumeVersion: 'Frontend_Platform_v2.pdf',
    compensation: '$58/hr + Housing Stipend',
    location: 'San Francisco, CA (Hybrid)',
    followUpDate: '2026-10-28',
    notes: 'Passed initial coding assessment (100% on algorithmic questions). Onsite virtual interview scheduled for 2 rounds.',
    interviews: [
      {
        id: 'int-round-1',
        roundName: 'Online Assessment (HackerRank)',
        date: '2026-10-05',
        completed: true,
        notes: '2 questions: Dynamic programming and graph traversal.'
      },
      {
        id: 'int-round-2',
        roundName: 'Virtual Onsite: Technical & System Deep Dive',
        date: '2026-10-30',
        interviewer: 'David Chen (Senior SWE)',
        completed: false,
        notes: 'Focus on React performance, virtualization, and state synchronization.'
      }
    ],
    rating: 5
  },
  {
    id: 'app-2',
    company: 'Linear',
    role: 'Product Engineering Fellow',
    jobLink: 'https://linear.app/careers',
    appliedDate: '2026-10-02',
    status: 'Assessment',
    resumeVersion: 'Product_Focused_DesignEng.pdf',
    compensation: '$52/hr',
    location: 'San Francisco or Remote',
    followUpDate: '2026-10-29',
    notes: 'Take-home assignment sent: Build an offline-first keyboard-accessible issue list.',
    interviews: [
      {
        id: 'int-round-linear-1',
        roundName: 'Take-Home Project Evaluation',
        date: '2026-10-31',
        completed: false,
        notes: 'Emphasize micro-interactions and snappy 60fps animations.'
      }
    ],
    rating: 5
  },
  {
    id: 'app-3',
    company: 'Vercel',
    role: 'Frontend Cloud Intern',
    jobLink: 'https://vercel.com/careers',
    appliedDate: '2026-09-12',
    status: 'Offer',
    resumeVersion: 'Frontend_Platform_v2.pdf',
    compensation: '$60/hr + Relocation',
    location: 'Remote',
    followUpDate: '2026-11-05',
    notes: 'Offer letter received! Need to decide by Nov 10th. Very strong team culture and Next.js roadmap.',
    interviews: [
      { id: 'v-1', roundName: 'Screening', date: '2026-09-20', completed: true },
      { id: 'v-2', roundName: 'Pair Programming', date: '2026-09-29', completed: true },
      { id: 'v-3', roundName: 'Founder / Partner Chat', date: '2026-10-10', completed: true }
    ],
    rating: 5
  },
  {
    id: 'app-4',
    company: 'Datadog',
    role: 'Software Engineer Intern, Observability',
    jobLink: 'https://datadoghq.com/careers',
    appliedDate: '2026-09-22',
    status: 'Applied',
    resumeVersion: 'FullStack_Systems_v1.pdf',
    compensation: '$54/hr',
    location: 'Boston, MA',
    followUpDate: '2026-11-01',
    notes: 'Application confirmation received. Pending recruiter review.',
    interviews: [],
    rating: 4
  },
  {
    id: 'app-5',
    company: 'Figma',
    role: 'Software Engineer Intern - Canvas & Tools',
    jobLink: 'https://figma.com/careers',
    appliedDate: '2026-09-10',
    status: 'Rejected',
    resumeVersion: 'Product_Focused_DesignEng.pdf',
    compensation: '$62/hr',
    location: 'San Francisco, CA',
    notes: 'Highly competitive pool (over 10,000 applicants). Recruiter encouraged reapplying for new grad.',
    interviews: [
      { id: 'figma-1', roundName: 'Recruiter Screen', date: '2026-09-18', completed: true }
    ],
    rating: 5
  }
];

export const INITIAL_RESUMES: ResumeVersion[] = [
  {
    id: 'res-1',
    name: 'Frontend_Platform_v2.pdf',
    targetRole: 'Frontend & Design Systems Engineer',
    updatedAt: '2026-10-10',
    mappedSkills: ['React & TypeScript', 'UI/UX Design & Figma', 'Docker & CI/CD'],
    summary: 'Product-minded Frontend Engineer with deep experience crafting scalable design systems, optimizing web vitals, and shipping zero-latency interactive web apps.',
    bullets: [
      {
        id: 'rb-1',
        skillId: 'skill-react',
        experienceTitle: 'Acme Labs',
        actionVerb: 'Spearheaded',
        bulletText: 'Spearheaded the redesign and modular architecture of core UI component suite across 12 services, cutting developer friction and eliminating 48% of UI regressions.',
        quantifiableResult: 'Cut regressions by 48%',
        tags: ['React', 'Design Systems', 'Architecture']
      },
      {
        id: 'rb-2',
        skillId: 'skill-react',
        experienceTitle: 'NovaScale AI',
        actionVerb: 'Engineered',
        bulletText: 'Engineered low-latency live telemetry stream visualizer using React 19 concurrent features, handling 1,500+ events per second with 0 frame drops.',
        quantifiableResult: '1,500+ ev/sec at 60fps',
        tags: ['Performance', 'React 19', 'WebSockets']
      },
      {
        id: 'rb-3',
        skillId: 'skill-docker',
        experienceTitle: 'Acme Labs',
        actionVerb: 'Streamlined',
        bulletText: 'Streamlined CI/CD pipeline builds with Docker caching and turbo-repo prune, shaving average test & deploy run times by 40%.',
        quantifiableResult: 'Saved 40% build time',
        tags: ['CI/CD', 'Docker', 'Automation']
      }
    ]
  },
  {
    id: 'res-2',
    name: 'Product_Focused_DesignEng.pdf',
    targetRole: 'Product Engineer / Design Technologist',
    updatedAt: '2026-10-15',
    mappedSkills: ['React & TypeScript', 'UI/UX Design & Figma', 'PostgreSQL & Supabase'],
    summary: 'Full stack product developer sitting at the intersection of crisp design craft, robust technical implementation, and user empathy.',
    bullets: [
      {
        id: 'rb-4',
        skillId: 'skill-ui-ux',
        experienceTitle: 'NovaScale AI',
        actionVerb: 'Designed & Built',
        bulletText: 'Designed and built an intuitive Agent Workflow Playground from Figma wireframes to production release, driving 35% higher new user trial conversion.',
        quantifiableResult: '+35% user conversion',
        tags: ['Figma', 'Product Design', 'Growth']
      }
    ]
  }
];

export const INITIAL_GOALS: CareerGoal[] = [
  {
    id: 'goal-1',
    title: 'Achieve Level 5 in React & Modern Web Systems',
    category: 'Skill Mastery',
    targetDate: '2026-12-31',
    progress: 80,
    status: 'In Progress',
    actionSteps: [
      { id: 'as-1', text: 'Master React Server Components and Suspense streaming patterns', done: true },
      { id: 'as-2', text: 'Publish a public open-source lightweight component toolkit', done: true },
      { id: 'as-3', text: 'Write a comprehensive deep-dive blog post on Canvas rendering pipelines', done: false }
    ],
    relatedSkills: ['React & TypeScript']
  },
  {
    id: 'goal-2',
    title: 'Secure a Summer 2027 Tier-1 Return or New Grad SWE Offer',
    category: 'Target Company',
    targetDate: '2026-11-15',
    progress: 85,
    status: 'In Progress',
    actionSteps: [
      { id: 'as-4', text: 'Polish resume versions with verified metric-backed bullets', done: true },
      { id: 'as-5', text: 'Complete 50 Medium/Hard LeetCode problems covering DP and Graph algorithms', done: true },
      { id: 'as-6', text: 'Conduct 4 mock technical and system design interviews', done: true },
      { id: 'as-7', text: 'Make final decision between Stripe and Vercel offers', done: false }
    ],
    relatedSkills: ['Agile & Team Leadership', 'React & TypeScript']
  },
  {
    id: 'goal-3',
    title: 'Deploy an End-to-End Enterprise RAG Knowledge Assistant',
    category: 'Project',
    targetDate: '2027-01-20',
    progress: 45,
    status: 'In Progress',
    actionSteps: [
      { id: 'as-8', text: 'Set up hybrid dense/sparse vector indexing with pgvector', done: true },
      { id: 'as-9', text: 'Integrate reranking model (Cohere / BGE rerank)', done: false },
      { id: 'as-10', text: 'Benchmark retrieval precision against synthetic ground truth queries', done: false }
    ],
    relatedSkills: ['LLM Prompting & RAG', 'PostgreSQL & Supabase']
  }
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-cal-1',
    title: 'Stripe Onsite Interview (Virtual)',
    type: 'Interview',
    date: '2026-10-30',
    time: '14:00 - 16:30',
    company: 'Stripe',
    notes: '2 technical rounds: React state architecture and live debugging.',
    status: 'pending'
  },
  {
    id: 'ev-cal-2',
    title: 'Linear Take-Home Project Submission Deadline',
    type: 'Deadline',
    date: '2026-10-31',
    time: '23:59',
    company: 'Linear',
    notes: 'Package repo with clean README, keyboard shortcuts guide, and Loom video walkthrough.',
    status: 'pending'
  },
  {
    id: 'ev-cal-3',
    title: 'Vercel Offer Acceptance Deadline',
    type: 'Deadline',
    date: '2026-11-10',
    time: '17:00',
    company: 'Vercel',
    notes: 'Review equity, compensation, and team placement preferences.',
    status: 'pending'
  },
  {
    id: 'ev-cal-4',
    title: 'NovaScale Mid-Internship Showcase',
    type: 'Milestone',
    date: '2026-11-03',
    time: '11:00',
    company: 'NovaScale AI',
    notes: 'Demo the Agent Workflow Playground to leadership team.',
    status: 'pending'
  },
  {
    id: 'ev-cal-5',
    title: 'Follow-up with Datadog Campus Recruiter',
    type: 'Follow-up',
    date: '2026-11-01',
    time: '10:00',
    company: 'Datadog',
    notes: 'Send polite check-in email referencing application id #DD-8931.',
    status: 'pending'
  }
];
