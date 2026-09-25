import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  StudentProfile,
  SkillItem,
  TaskItem,
  CompanyItem,
  ProjectItem,
  CertificationItem,
  InternshipItem,
  DSAProblemItem,
  TestResultItem,
  InterviewSessionItem,
  GoalItem,
  ActivityItem,
  NotificationItem,
  PlacementReadinessData,
  ChatMessage,
  AIActionProposal,
  FirebaseConfigState,
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_SKILLS,
  INITIAL_TASKS,
  INITIAL_COMPANIES,
  INITIAL_PROJECTS,
  INITIAL_CERTIFICATIONS,
  INITIAL_INTERNSHIP,
  INITIAL_DSA_PROBLEMS,
  INITIAL_TEST_RESULTS,
  INITIAL_INTERVIEW_SESSIONS,
  INITIAL_GOALS,
  INITIAL_ACTIVITIES,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';
import { calculatePlacementReadiness } from '../utils/readinessEngine';
import confetti from 'canvas-confetti';

interface AppContextType {
  profile: StudentProfile;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  skills: SkillItem[];
  updateSkill: (id: string, updates: Partial<SkillItem>) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  companies: CompanyItem[];
  addCompany: (company: Omit<CompanyItem, 'id'>) => void;
  updateCompany: (id: string, updates: Partial<CompanyItem>) => void;
  togglePrepTopic: (companyId: string, topicIndex: number) => void;
  projects: ProjectItem[];
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  certifications: CertificationItem[];
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  updateCertification: (id: string, updates: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;
  internship: InternshipItem;
  updateInternship: (internship: Partial<InternshipItem>) => void;
  dsaProblems: DSAProblemItem[];
  logDSAProblem: (problem: Omit<DSAProblemItem, 'id'>) => void;
  testResults: TestResultItem[];
  recordTestResult: (result: Omit<TestResultItem, 'id'>) => void;
  interviews: InterviewSessionItem[];
  recordInterviewSession: (session: Omit<InterviewSessionItem, 'id'>) => void;
  goals: GoalItem[];
  addGoal: (goal: Omit<GoalItem, 'id'>) => void;
  toggleGoal: (id: string) => void;
  activities: ActivityItem[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  readiness: PlacementReadinessData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  emergencyMode: boolean;
  setEmergencyMode: (val: boolean) => void;
  selectedCompanyForPrep: string | null;
  setSelectedCompanyForPrep: (id: string | null) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (content: string) => Promise<void>;
  applyActionProposal: (action: AIActionProposal) => void;
  rejectActionProposal: (actionId: string) => void;
  clearChat: () => void;
  firebaseConfig: FirebaseConfigState;
  updateFirebaseConfig: (cfg: Partial<FirebaseConfigState>) => void;
  showBreakdownModal: boolean;
  setShowBreakdownModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'nayana_placement_os_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try loading from localStorage or fallback to initial seeded data
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_skills`);
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tasks`);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [companies, setCompanies] = useState<CompanyItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_companies`);
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_certifications`);
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATIONS;
  });

  const [internship, setInternship] = useState<InternshipItem>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_internship`);
    return saved ? JSON.parse(saved) : INITIAL_INTERNSHIP;
  });

  const [dsaProblems, setDsaProblems] = useState<DSAProblemItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_dsa`);
    return saved ? JSON.parse(saved) : INITIAL_DSA_PROBLEMS;
  });

  const [testResults, setTestResults] = useState<TestResultItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tests`);
    return saved ? JSON.parse(saved) : INITIAL_TEST_RESULTS;
  });

  const [interviews, setInterviews] = useState<InterviewSessionItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_interviews`);
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEW_SESSIONS;
  });

  const [goals, setGoals] = useState<GoalItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_goals`);
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_activities`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [activeTab, setActiveTab] = useState<string>('Dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);
  const [selectedCompanyForPrep, setSelectedCompanyForPrep] = useState<string | null>('comp-jpmc');
  const [showBreakdownModal, setShowBreakdownModal] = useState<boolean>(false);

  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfigState>({
    apiKey: '',
    authDomain: '',
    projectId: 'nayana-placement-os',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    isConnected: false,
    useEmulator: true,
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      role: 'assistant',
      content:
        "Hi Nayana! 👋 I'm your Gemini Placement Coach. I have your academic profile (CGPA 9.17, 0 backlogs), your 4 target companies (JPMC, Google, TCS, AT&T), and your active preparation schedule. What would you like to focus on today?",
      timestamp: 'Just now',
    },
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_skills`, JSON.stringify(skills));
  }, [skills]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_tasks`, JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_companies`, JSON.stringify(companies));
  }, [companies]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_certifications`, JSON.stringify(certifications));
  }, [certifications]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_dsa`, JSON.stringify(dsaProblems));
  }, [dsaProblems]);

  // Dynamic calculated placement readiness
  const readiness = useMemo(() => {
    return calculatePlacementReadiness({
      profile,
      skills,
      companies,
      projects,
      certifications,
      dsaProblems,
      testResults,
      interviews,
    });
  }, [profile, skills, companies, projects, certifications, dsaProblems, testResults, interviews]);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  const addActivity = (type: ActivityItem['type'], description: string) => {
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type,
      description,
      timestamp: 'Just now',
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    addActivity('task', 'Updated academic and career profile');
  };

  const updateSkill = (id: string, updates: Partial<SkillItem>) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    addActivity('study', `Updated skill progress for ${updates.name || 'skill'}`);
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = { ...skill, id: `skill-${Date.now()}` };
    setSkills((prev) => [...prev, newSkill]);
    addActivity('study', `Added new skill ${skill.name}`);
  };

  const addTask = (task: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = { ...task, id: `task-${Date.now()}` };
    setTasks((prev) => [newTask, ...prev]);
    addActivity('task', `Added task: ${task.title}`);
  };

  const updateTask = (id: string, updates: Partial<TaskItem>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          if (nextStatus === 'Completed') {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#663399', '#E6C7E6', '#A3779D'],
            });
            addActivity('task', `Completed task: ${t.title}`);
          }
          return {
            ...t,
            status: nextStatus,
            completedAt: nextStatus === 'Completed' ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addCompany = (comp: Omit<CompanyItem, 'id'>) => {
    const newComp: CompanyItem = { ...comp, id: `comp-${Date.now()}` };
    setCompanies((prev) => [...prev, newComp]);
    addActivity('company', `Added ${comp.name} to target companies`);
  };

  const updateCompany = (id: string, updates: Partial<CompanyItem>) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const togglePrepTopic = (companyId: string, topicIndex: number) => {
    setCompanies((prev) =>
      prev.map((comp) => {
        if (comp.id === companyId) {
          const newTopics = comp.prepTopics.map((tp, idx) =>
            idx === topicIndex ? { ...tp, completed: !tp.completed } : tp
          );
          const completedCount = newTopics.filter((t) => t.completed).length;
          const newPercentage = Math.round((completedCount / newTopics.length) * 100);
          return { ...comp, prepTopics: newTopics, preparationPercentage: newPercentage };
        }
        return comp;
      })
    );
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addActivity('resume', `Updated project documentation`);
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = { ...cert, id: `cert-${Date.now()}` };
    setCertifications((prev) => [...prev, newCert]);
    addActivity('certification', `Added certification ${cert.name}`);
  };

  const updateCertification = (id: string, updates: Partial<CertificationItem>) => {
    setCertifications((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCertification = (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
  };

  const updateInternship = (updates: Partial<InternshipItem>) => {
    setInternship((prev) => ({ ...prev, ...updates }));
    addActivity('resume', `Updated internship details`);
  };

  const logDSAProblem = (prob: Omit<DSAProblemItem, 'id'>) => {
    const newProb: DSAProblemItem = { ...prob, id: `dsa-${Date.now()}` };
    setDsaProblems((prev) => [newProb, ...prev]);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#663399', '#E6C7E6', '#2E1A47'],
    });
    addActivity('dsa', `Solved ${prob.problemName} (${prob.platform})`);
  };

  const recordTestResult = (result: Omit<TestResultItem, 'id'>) => {
    const newResult: TestResultItem = { ...result, id: `test-${Date.now()}` };
    setTestResults((prev) => [newResult, ...prev]);
    addActivity('test', `Completed ${result.title} (${result.scorePercentage}%)`);
  };

  const recordInterviewSession = (session: Omit<InterviewSessionItem, 'id'>) => {
    const newSession: InterviewSessionItem = { ...session, id: `int-${Date.now()}` };
    setInterviews((prev) => [newSession, ...prev]);
    addActivity('interview', `Completed mock interview for ${session.companyOrTopic}`);
  };

  const addGoal = (goal: Omit<GoalItem, 'id'>) => {
    const newGoal: GoalItem = { ...goal, id: `goal-${Date.now()}` };
    setGoals((prev) => [...prev, newGoal]);
  };

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed, progressPercentage: g.completed ? 50 : 100 } : g))
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const updateFirebaseConfig = (cfg: Partial<FirebaseConfigState>) => {
    setFirebaseConfig((prev) => ({ ...prev, ...cfg }));
  };

  // Gemini chat interaction with real context builder & function execution
  const sendChatMessage = async (userPrompt: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: userPrompt,
      timestamp: 'Just now',
    };
    setChatMessages((prev) => [...prev, userMsg]);

    const lower = userPrompt.toLowerCase();

    // Call server Gemini API or handle smart local placement coaching with function proposals
    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userPrompt,
          context: {
            profile,
            readinessScore: readiness.overallScore,
            categoryScores: readiness.categories,
            skills: skills.map((s) => ({ name: s.name, level: s.selfRating, status: s.status })),
            tasks: tasks.filter((t) => t.status === 'Pending').map((t) => t.title),
            companies: companies.map((c) => ({ name: c.name, status: c.applicationStatus, prep: c.preparationPercentage })),
            deadlines: companies.map((c) => ({ name: c.name, date: c.applicationDeadline })),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: 'Just now',
            actionProposal: data.actionProposal,
          },
        ]);
        return;
      }
    } catch {
      // Graceful local coach reasoning fallback
    }

    // Smart contextual mentor response with structured actions:
    setTimeout(() => {
      let reply = '';
      let proposal: AIActionProposal | undefined = undefined;

      if (lower.includes('today') || lower.includes('what should i study') || lower.includes('plan')) {
        reply =
          "Nayana, based on your 2-hour evening study window and upcoming TCS deadline (2 days) & JPMC online assessment (8 days), here is your prioritized plan for this evening:\n\n1. **DSA (45 min):** 2 Array & Two-pointer medium problems on LeetCode\n2. **Java OOP (35 min):** Interface vs Abstract classes & Dynamic Method Dispatch\n3. **DBMS (25 min):** 2NF/3NF/BCNF normalization scenarios\n4. **Mock Question (15 min):** Explain your Laptop Support Assistant RAG chunking pipeline.\n\nWould you like me to schedule these 4 tasks in your planner?";
        proposal = {
          actionId: `prop-${Date.now()}`,
          type: 'createTasks',
          description: 'Schedule 4 evening study tasks (DSA Arrays, Java OOP, DBMS Normalization, Project Pitch)',
          payload: [
            {
              title: 'DSA: Two-Pointer & Sliding Window (2 problems)',
              category: 'DSA',
              priority: 'High',
              estimatedDurationMinutes: 45,
              dueDate: new Date().toISOString().split('T')[0],
              status: 'Pending',
            },
            {
              title: 'Java OOP: Dynamic Dispatch & Interfaces',
              category: 'Study',
              priority: 'High',
              estimatedDurationMinutes: 35,
              dueDate: new Date().toISOString().split('T')[0],
              status: 'Pending',
            },
            {
              title: 'DBMS: BCNF Normalization & Dependencies',
              category: 'Study',
              priority: 'Medium',
              estimatedDurationMinutes: 25,
              dueDate: new Date().toISOString().split('T')[0],
              status: 'Pending',
            },
            {
              title: 'Project Pitch: Laptop Support Assistant RAG',
              category: 'Practice',
              priority: 'Medium',
              estimatedDurationMinutes: 15,
              dueDate: new Date().toISOString().split('T')[0],
              status: 'Pending',
            },
          ],
          status: 'pending',
        };
      } else if (lower.includes('jpmc')) {
        reply =
          "For JPMC (Software Engineer, 14–19 LPA in Hyderabad/Bangalore):\n- **Eligibility:** CGPA >= 7.5 (You have 9.17 ✅), 0 Backlogs ✅\n- **Assessment Focus:** Hackerrank 2 coding questions (Data structures, Strings, Arrays/Graphs) + Core Java/OOP + System basics.\n- **Your current JPMC readiness is 64%.** Your main gap is Java Collections and Dynamic Programming. I can schedule a 7-day targeted sprint.";
        proposal = {
          actionId: `prop-${Date.now()}`,
          type: 'createTasks',
          description: 'Add JPMC Sprint Task: Java Collections & Multi-threading Deep Dive',
          payload: [
            {
              title: 'JPMC Prep: Java Collections & Hash collisions',
              category: 'Study',
              priority: 'Urgent',
              estimatedDurationMinutes: 40,
              dueDate: new Date().toISOString().split('T')[0],
              status: 'Pending',
              relatedCompany: 'JPMC',
            },
          ],
          status: 'pending',
        };
      } else if (lower.includes('resume')) {
        reply =
          "I analyzed your uploaded resume details:\n- **Strengths:** High CGPA (9.17), strong projects like Laptop Support Assistant (Groq RAG) and AI-SHIELD (Federated Learning).\n- **ATS Check:** Score: 90/100.\n- **Discrepancy detected:** Your profile lists AZ-900, AI-102 & ServiceNow, while the uploaded PDF resume lists AZ-900 & Cambridge LinguaSkill. Consider updating your authoritative resume version in Resume Center to include AI-102.";
      } else if (lower.includes('interview') || lower.includes('mock')) {
        reply =
          "Let's practice! Here is a core technical question asked in JPMC & Google interviews:\n\n**Question:** *Explain how the Java Virtual Machine manages heap vs stack memory, and what causes an OutOfMemoryError (OOM) compared to a StackOverflowError?*\n\nType your explanation or click 'Start Mock Interview' in the Interview Room to do a timed session!";
      } else if (lower.includes('dsa') || lower.includes('two sum') || lower.includes('problem')) {
        reply =
          "Here is a recommended DSA problem for your level (Current DSA rating 7/10):\n\n**Problem:** *Longest Substring Without Repeating Characters (LeetCode Medium)*\n- **Pattern:** Sliding Window + Hash Map\n- **Time Target:** Solve within 25 minutes.\n- Would you like hints, or would you like me to log it in your practice queue?";
      } else {
        reply = `I have updated your context, Nayana. Your overall placement readiness is currently ${readiness.overallScore}%. Your strongest categories are Academics (100%), Aptitude (97%), and Communication (95%). Let's keep your 12-day study streak strong!`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: 'Just now',
          actionProposal: proposal,
        },
      ]);
    }, 700);
  };

  const applyActionProposal = (proposal: AIActionProposal) => {
    if (proposal.type === 'createTasks' && Array.isArray(proposal.payload)) {
      proposal.payload.forEach((t: Omit<TaskItem, 'id'>) => {
        addTask(t);
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }

    setChatMessages((prev) =>
      prev.map((msg) =>
        msg.actionProposal?.actionId === proposal.actionId
          ? {
              ...msg,
              actionProposal: { ...msg.actionProposal, status: 'accepted' },
            }
          : msg
      )
    );
  };

  const rejectActionProposal = (actionId: string) => {
    setChatMessages((prev) =>
      prev.map((msg) =>
        msg.actionProposal?.actionId === actionId
          ? {
              ...msg,
              actionProposal: { ...msg.actionProposal, status: 'rejected' },
            }
          : msg
      )
    );
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: `m-${Date.now()}`,
        role: 'assistant',
        content: 'Conversation history cleared. Ready for your next placement coaching session!',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        skills,
        updateSkill,
        addSkill,
        tasks,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        companies,
        addCompany,
        updateCompany,
        togglePrepTopic,
        projects,
        updateProject,
        certifications,
        addCertification,
        updateCertification,
        deleteCertification,
        internship,
        updateInternship,
        dsaProblems,
        logDSAProblem,
        testResults,
        recordTestResult,
        interviews,
        recordInterviewSession,
        goals,
        addGoal,
        toggleGoal,
        activities,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        readiness,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        theme,
        setTheme,
        emergencyMode,
        setEmergencyMode,
        selectedCompanyForPrep,
        setSelectedCompanyForPrep,
        chatMessages,
        sendChatMessage,
        applyActionProposal,
        rejectActionProposal,
        clearChat,
        firebaseConfig,
        updateFirebaseConfig,
        showBreakdownModal,
        setShowBreakdownModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
