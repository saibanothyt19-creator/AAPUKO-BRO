export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Skipped' | 'Rescheduled';

export type TaskCategory = 'DSA' | 'Study' | 'Practice' | 'Interview' | 'Resume' | 'Application' | 'General';

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: Priority;
  estimatedDurationMinutes: number;
  dueDate: string; // YYYY-MM-DD
  status: TaskStatus;
  relatedSkill?: string;
  relatedCompany?: string;
  relatedGoal?: string;
  completedAt?: string;
}

export type SkillStatus = 'Not Started' | 'Learning' | 'Practicing' | 'Completed' | 'Needs Revision';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Core DSA' | 'CS Fundamentals' | 'Web' | 'Database' | 'Tools' | 'Specialization';
  selfRating: number; // 1-10
  measuredPerformance?: number; // 1-10 (calculated from test results)
  aiAssessment?: number; // 1-10 (from Gemini evaluation)
  status: SkillStatus;
  targetLevel: number; // 1-10
  notes?: string;
  resources?: string[];
  lastPracticed?: string;
  nextReview?: string;
  testScore?: number; // percentage
}

export interface StudentProfile {
  name: string;
  fullName: string;
  college: string;
  course: string;
  year: string;
  batch: string;
  expectedGraduation: string;
  cgpa: number;
  backlogs: number;
  placementTarget: string;
  preferredLocations: string[];
  primaryCareerInterest: string;
  otherCareerInterests: string[];
  studyAvailability: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  leetcodeUrl?: string;
  hackerrankUrl?: string;
  codechefUrl?: string;
}

export type ApplicationStatus =
  | 'Interested'
  | 'Eligible'
  | 'Applied'
  | 'Assessment'
  | 'Technical Interview'
  | 'HR Interview'
  | 'Selected'
  | 'Rejected'
  | 'Withdrawn';

export interface CompanyEligibility {
  minCgpa: number;
  maxBacklogs: number;
  allowedBranches: string[];
  graduationYear: string;
  studentEligible: boolean;
  notes?: string;
}

export interface CompanyItem {
  id: string;
  name: string;
  logo: string;
  role: string;
  ctc: string;
  location: string;
  eligibility: CompanyEligibility;
  applicationDeadline?: string;
  driveDate?: string;
  applicationStatus: ApplicationStatus;
  assessmentStatus?: string;
  technicalInterviewStatus?: string;
  hrInterviewStatus?: string;
  finalResult?: string;
  preparationPercentage: number;
  prepTopics: { name: string; completed: boolean }[];
  notes?: string;
  portalLink?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  status: 'In Progress' | 'Completed';
  technologies: string[];
  overview: string;
  progress: number;
  githubUrl?: string;
  demoUrl?: string;
  architectureNotes?: string;
  challenges?: string;
  solutions?: string;
  futureImprovements?: string;
  interviewExplanation: string;
  sampleInterviewQuestions: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  inUploadedResume: boolean;
  verified: boolean;
}

export interface InternshipItem {
  id: string;
  organization: string;
  role: string;
  domain: string;
  startDate: string;
  endDate: string;
  description: string;
  skillsGained: string[];
  resumeDescription: string;
  interviewExplanation: string;
}

export interface DSAProblemItem {
  id: string;
  problemName: string;
  platform: 'LeetCode' | 'HackerRank' | 'CodeChef' | 'Other';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dateSolved: string;
  timeTakenMinutes: number;
  attempts: number;
  solvedIndependently: boolean;
  needRevision: boolean;
  notes?: string;
  solutionLink?: string;
}

export interface AptitudeTopicItem {
  name: string;
  category: 'Quantitative Aptitude' | 'Logical Reasoning' | 'Verbal Ability' | 'Data Interpretation';
  attempted: number;
  correct: number;
  accuracy: number;
  weak: boolean;
}

export interface TestResultItem {
  id: string;
  testType: string;
  title: string;
  date: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  scorePercentage: number;
  durationMinutes: number;
  weakTopics: string[];
  detailedReview?: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface InterviewSessionItem {
  id: string;
  mode: 'HR' | 'Technical' | 'Company-specific' | 'Project-based' | 'Mixed';
  companyOrTopic: string;
  date: string;
  score: number; // 0-100
  technicalAccuracy: number;
  communication: number;
  feedback: string;
  questionsAnswered: {
    question: string;
    answer: string;
    score: number;
    feedback: string;
    missedConcepts?: string[];
  }[];
}

export interface GoalItem {
  id: string;
  title: string;
  targetDate: string;
  progressPercentage: number;
  category: string;
  completed: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'task' | 'dsa' | 'test' | 'company' | 'resume' | 'interview' | 'certification' | 'study';
  description: string;
  timestamp: string;
}

export interface CategoryReadiness {
  name: string;
  weight: number; // e.g. 0.15 for 15%
  score: number; // 0 - 100
  contributedScore: number; // score * weight
  explanation: string;
  improvementTip: string;
}

export interface PlacementReadinessData {
  overallScore: number;
  statusLabel: 'Needs Immediate Focus' | 'Building Foundation' | 'On Track' | 'Placement Ready';
  categories: {
    academics: CategoryReadiness;
    programming: CategoryReadiness;
    dsa: CategoryReadiness;
    csFundamentals: CategoryReadiness;
    aptitude: CategoryReadiness;
    communication: CategoryReadiness;
    projects: CategoryReadiness;
    resume: CategoryReadiness;
    interview: CategoryReadiness;
    companyPrep: CategoryReadiness;
  };
}

export interface AIActionProposal {
  actionId: string;
  type: 'createTasks' | 'updateSkill' | 'addCompany' | 'logDSA' | 'updateApplication';
  description: string;
  payload: any;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  actionProposal?: AIActionProposal;
  isStreaming?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'deadline' | 'drive' | 'task' | 'ai' | 'weekly';
  linkTab?: string;
}

export interface FirebaseConfigState {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  isConnected: boolean;
  useEmulator: boolean;
}
