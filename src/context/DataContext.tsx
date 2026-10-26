import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Skill,
  Internship,
  Application,
  ResumeVersion,
  CareerGoal,
  CalendarEvent,
  SkillEvidence
} from '../types';
import {
  INITIAL_SKILLS,
  INITIAL_INTERNSHIPS,
  INITIAL_APPLICATIONS,
  INITIAL_RESUMES,
  INITIAL_GOALS,
  INITIAL_EVENTS
} from '../data/seedData';

interface DataContextType {
  skills: Skill[];
  internships: Internship[];
  applications: Application[];
  resumes: ResumeVersion[];
  goals: CareerGoal[];
  events: CalendarEvent[];
  
  // Skills CRUD & updates (Never assumes a skill is learned automatically!)
  addSkill: (skill: Omit<Skill, 'id' | 'lastUpdated'>) => void;
  updateSkillLevel: (skillId: string, currentLevel: number, note?: string) => void;
  addSkillEvidence: (skillId: string, evidence: Omit<SkillEvidence, 'id' | 'date'>) => void;
  deleteSkill: (skillId: string) => void;

  // Internships CRUD
  addInternship: (internship: Omit<Internship, 'id'>) => void;
  updateInternship: (id: string, internship: Partial<Internship>) => void;
  deleteInternship: (id: string) => void;
  toggleTask: (internshipId: string, taskId: string) => void;
  addTaskToInternship: (internshipId: string, taskTitle: string, category?: 'Task' | 'Milestone' | 'Deliverable', dueDate?: string) => void;

  // Applications CRUD
  addApplication: (app: Omit<Application, 'id'>) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  updateApplication: (id: string, app: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  addInterviewRound: (appId: string, roundName: string, date: string, notes?: string) => void;

  // Resumes CRUD
  addResumeVersion: (resume: Omit<ResumeVersion, 'id' | 'updatedAt'>) => void;
  updateResumeVersion: (id: string, resume: Partial<ResumeVersion>) => void;
  deleteResumeVersion: (id: string) => void;
  addResumeBullet: (resumeId: string, bullet: Omit<ResumeVersion['bullets'][0], 'id'>) => void;

  // Goals CRUD
  addGoal: (goal: Omit<CareerGoal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<CareerGoal>) => void;
  toggleActionStep: (goalId: string, stepId: string) => void;
  deleteGoal: (id: string) => void;

  // Calendar CRUD
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  toggleEventStatus: (id: string) => void;

  // Reset to sample data or clear
  resetToSampleData: () => void;
  clearAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SKILLS: 'internleo_skills_v1',
  INTERNSHIPS: 'internleo_internships_v1',
  APPLICATIONS: 'internleo_applications_v1',
  RESUMES: 'internleo_resumes_v1',
  GOALS: 'internleo_goals_v1',
  EVENTS: 'internleo_events_v1'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [internships, setInternships] = useState<Internship[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTERNSHIPS);
    return saved ? JSON.parse(saved) : INITIAL_INTERNSHIPS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [resumes, setResumes] = useState<ResumeVersion[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESUMES);
    return saved ? JSON.parse(saved) : INITIAL_RESUMES;
  });

  const [goals, setGoals] = useState<CareerGoal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  // LocalStorage persistence sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTERNSHIPS, JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  // Skill actions
  const addSkill = (newSkill: Omit<Skill, 'id' | 'lastUpdated'>) => {
    const id = `skill-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    setSkills(prev => [...prev, { ...newSkill, id, lastUpdated: today }]);
  };

  const updateSkillLevel = (skillId: string, currentLevel: number, note?: string) => {
    const today = new Date().toISOString().split('T')[0];
    setSkills(prev =>
      prev.map(s => {
        if (s.id !== skillId) return s;
        const newEvidence = note
          ? [
              ...s.evidence,
              {
                id: `ev-${Date.now()}`,
                type: 'task' as const,
                referenceTitle: 'Skill Level Self-Audit',
                date: today,
                description: note,
                verificationStatus: 'verified' as const
              }
            ]
          : s.evidence;
        return {
          ...s,
          currentLevel,
          lastUpdated: today,
          evidence: newEvidence
        };
      })
    );
  };

  const addSkillEvidence = (skillId: string, evidenceData: Omit<SkillEvidence, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newEv: SkillEvidence = {
      ...evidenceData,
      id: `ev-${Date.now()}`,
      date: today
    };
    setSkills(prev =>
      prev.map(s => {
        if (s.id !== skillId) return s;
        return {
          ...s,
          lastUpdated: today,
          evidence: [...s.evidence, newEv]
        };
      })
    );
  };

  const deleteSkill = (skillId: string) => {
    setSkills(prev => prev.filter(s => s.id !== skillId));
  };

  // Internships actions
  const addInternship = (internshipData: Omit<Internship, 'id'>) => {
    const id = `int-${Date.now()}`;
    setInternships(prev => [
      { ...internshipData, id },
      ...prev
    ]);
  };

  const updateInternship = (id: string, updatedFields: Partial<Internship>) => {
    setInternships(prev => prev.map(int => (int.id === id ? { ...int, ...updatedFields } : int)));
  };

  const deleteInternship = (id: string) => {
    setInternships(prev => prev.filter(int => int.id !== id));
  };

  const toggleTask = (internshipId: string, taskId: string) => {
    setInternships(prev =>
      prev.map(int => {
        if (int.id !== internshipId) return int;
        const updatedTasks = (int.tasks || []).map(t =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        // calculate new progress percent if present
        const total = updatedTasks.length;
        const done = updatedTasks.filter(t => t.completed).length;
        const progressPercent = total > 0 ? Math.round((done / total) * 100) : int.progressPercent;
        return { ...int, tasks: updatedTasks, progressPercent };
      })
    );
  };

  const addTaskToInternship = (internshipId: string, taskTitle: string, category: 'Task' | 'Milestone' | 'Deliverable' = 'Task', dueDate?: string) => {
    setInternships(prev =>
      prev.map(int => {
        if (int.id !== internshipId) return int;
        const newTask = {
          id: `t-${Date.now()}`,
          title: taskTitle,
          completed: false,
          category,
          dueDate
        };
        const updatedTasks = [...(int.tasks || []), newTask];
        const total = updatedTasks.length;
        const done = updatedTasks.filter(t => t.completed).length;
        const progressPercent = Math.round((done / total) * 100);
        return { ...int, tasks: updatedTasks, progressPercent };
      })
    );
  };

  // Application actions
  const addApplication = (appData: Omit<Application, 'id'>) => {
    const id = `app-${Date.now()}`;
    setApplications(prev => [{ ...appData, id }, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => (app.id === id ? { ...app, status } : app)));
  };

  const updateApplication = (id: string, fields: Partial<Application>) => {
    setApplications(prev => prev.map(app => (app.id === id ? { ...app, ...fields } : app)));
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const addInterviewRound = (appId: string, roundName: string, date: string, notes?: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== appId) return app;
        const newRound = {
          id: `round-${Date.now()}`,
          roundName,
          date,
          completed: false,
          notes
        };
        return {
          ...app,
          status: app.status === 'Applied' || app.status === 'Assessment' ? 'Interview' : app.status,
          interviews: [...app.interviews, newRound]
        };
      })
    );
    // Also auto-add to calendar
    const app = applications.find(a => a.id === appId);
    if (app) {
      addEvent({
        title: `${app.company} Interview: ${roundName}`,
        type: 'Interview',
        date,
        company: app.company,
        notes: notes || `Interview round for ${app.role}`,
        status: 'pending'
      });
    }
  };

  // Resume actions
  const addResumeVersion = (resumeData: Omit<ResumeVersion, 'id' | 'updatedAt'>) => {
    const id = `res-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    setResumes(prev => [{ ...resumeData, id, updatedAt: today }, ...prev]);
  };

  const updateResumeVersion = (id: string, fields: Partial<ResumeVersion>) => {
    const today = new Date().toISOString().split('T')[0];
    setResumes(prev => prev.map(r => (r.id === id ? { ...r, ...fields, updatedAt: today } : r)));
  };

  const deleteResumeVersion = (id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
  };

  const addResumeBullet = (resumeId: string, bullet: Omit<ResumeVersion['bullets'][0], 'id'>) => {
    const id = `rb-${Date.now()}`;
    setResumes(prev =>
      prev.map(r => {
        if (r.id !== resumeId) return r;
        return {
          ...r,
          bullets: [...r.bullets, { ...bullet, id }]
        };
      })
    );
  };

  // Goal actions
  const addGoal = (goalData: Omit<CareerGoal, 'id'>) => {
    const id = `goal-${Date.now()}`;
    setGoals(prev => [{ ...goalData, id }, ...prev]);
  };

  const updateGoal = (id: string, fields: Partial<CareerGoal>) => {
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, ...fields } : g)));
  };

  const toggleActionStep = (goalId: string, stepId: string) => {
    setGoals(prev =>
      prev.map(g => {
        if (g.id !== goalId) return g;
        const steps = g.actionSteps.map(s => (s.id === stepId ? { ...s, done: !s.done } : s));
        const total = steps.length;
        const done = steps.filter(s => s.done).length;
        const progress = total > 0 ? Math.round((done / total) * 100) : g.progress;
        const status = progress === 100 ? ('Completed' as const) : ('In Progress' as const);
        return { ...g, actionSteps: steps, progress, status };
      })
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Calendar actions
  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const id = `ev-${Date.now()}`;
    setEvents(prev => [...prev, { ...eventData, id, status: eventData.status || 'pending' }]);
  };

  const updateEvent = (id: string, fields: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...fields } : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const toggleEventStatus = (id: string) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === id
          ? { ...e, status: e.status === 'completed' ? 'pending' : 'completed' }
          : e
      )
    );
  };

  const resetToSampleData = () => {
    setSkills(INITIAL_SKILLS);
    setInternships(INITIAL_INTERNSHIPS);
    setApplications(INITIAL_APPLICATIONS);
    setResumes(INITIAL_RESUMES);
    setGoals(INITIAL_GOALS);
    setEvents(INITIAL_EVENTS);
  };

  const clearAllData = () => {
    setSkills([]);
    setInternships([]);
    setApplications([]);
    setResumes([]);
    setGoals([]);
    setEvents([]);
  };

  return (
    <DataContext.Provider
      value={{
        skills,
        internships,
        applications,
        resumes,
        goals,
        events,
        addSkill,
        updateSkillLevel,
        addSkillEvidence,
        deleteSkill,
        addInternship,
        updateInternship,
        deleteInternship,
        toggleTask,
        addTaskToInternship,
        addApplication,
        updateApplicationStatus,
        updateApplication,
        deleteApplication,
        addInterviewRound,
        addResumeVersion,
        updateResumeVersion,
        deleteResumeVersion,
        addResumeBullet,
        addGoal,
        updateGoal,
        toggleActionStep,
        deleteGoal,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleEventStatus,
        resetToSampleData,
        clearAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
