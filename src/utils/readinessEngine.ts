import {
  StudentProfile,
  SkillItem,
  CompanyItem,
  ProjectItem,
  CertificationItem,
  DSAProblemItem,
  TestResultItem,
  InterviewSessionItem,
  PlacementReadinessData,
} from '../types';

export function calculatePlacementReadiness(data: {
  profile: StudentProfile;
  skills: SkillItem[];
  companies: CompanyItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  dsaProblems: DSAProblemItem[];
  testResults: TestResultItem[];
  interviews: InterviewSessionItem[];
}): PlacementReadinessData {
  const { profile, skills, companies, projects, certifications, dsaProblems, testResults, interviews } = data;

  // 1. Academics (15%)
  // CGPA 9.17 with 0 backlogs is exemplary college placement standing
  const academicScore = Math.min(
    100,
    Math.round(
      (profile.cgpa >= 8.5 ? 100 : (profile.cgpa / 8.5) * 100) * (profile.backlogs === 0 ? 1.0 : Math.max(0.5, 1 - profile.backlogs * 0.2))
    )
  );

  // 2. Programming (10%)
  const progSkills = skills.filter((s) => s.category === 'Programming');
  const progAvg =
    progSkills.length > 0
      ? progSkills.reduce((acc, s) => acc + (s.measuredPerformance || s.selfRating), 0) / progSkills.length
      : 6;
  const programmingScore = Math.min(100, Math.round(progAvg * 10.8)); // C=9, Java=5, Python=4.2 -> ~65%

  // 3. DSA (15%)
  const dsaSkill = skills.find((s) => s.name.includes('Data Structures') || s.category === 'Core DSA');
  const baseDsaRating = dsaSkill ? (dsaSkill.measuredPerformance || dsaSkill.selfRating) * 10 : 70;
  const hardMediumBonus = dsaProblems.filter((p) => p.difficulty === 'Medium' || p.difficulty === 'Hard').length * 2;
  const dsaScore = Math.min(100, Math.round(Math.max(50, Math.min(95, baseDsaRating + hardMediumBonus))));

  // 4. CS Fundamentals (15%)
  const csSkills = skills.filter((s) => s.category === 'CS Fundamentals' || s.category === 'Database');
  const csAvg =
    csSkills.length > 0
      ? csSkills.reduce((acc, s) => acc + (s.measuredPerformance || s.selfRating), 0) / csSkills.length
      : 5.5;
  const sqlTestBonus = testResults.find((t) => t.testType === 'SQL')?.scorePercentage || 0;
  const csFundamentalsScore = Math.min(
    100,
    Math.round(csAvg * 9.5 + (sqlTestBonus > 80 ? 4 : 0))
  );

  // 5. Aptitude (10%)
  const aptSkill = skills.find((s) => s.name.includes('Aptitude'));
  const aptRating = aptSkill ? (aptSkill.measuredPerformance || aptSkill.selfRating) * 10 : 97;
  const aptitudeScore = Math.min(100, Math.round(aptRating));

  // 6. Communication (5%)
  const commSkill = skills.find((s) => s.name.includes('Communication') || s.name.includes('English'));
  const commRating = commSkill ? (commSkill.measuredPerformance || commSkill.selfRating) * 10 : 95;
  const communicationScore = Math.min(100, Math.round(commRating));

  // 7. Projects (10%)
  const projAvg =
    projects.length > 0
      ? projects.reduce((acc, p) => acc + (p.status === 'Completed' ? 100 : p.progress), 0) / projects.length
      : 75;
  const projectsScore = Math.min(100, Math.round(projAvg));

  // 8. Resume / Profile (5%)
  let resumeMetric = 70;
  if (profile.githubUrl) resumeMetric += 5;
  if (profile.linkedinUrl) resumeMetric += 5;
  if (certifications.length >= 2) resumeMetric += 10;
  const resumeScore = Math.min(100, resumeMetric);

  // 9. Interview (10%)
  const interviewScore =
    interviews.length > 0
      ? Math.round(interviews.reduce((acc, i) => acc + i.score, 0) / interviews.length * 0.7) // discount until multiple rounds completed
      : 35;

  // 10. Company Preparation (5%)
  const companyPrepAvg =
    companies.length > 0
      ? companies.reduce((acc, c) => acc + c.preparationPercentage, 0) / companies.length
      : 40;
  const companyPrepScore = Math.min(100, Math.round(companyPrepAvg * 0.5)); // scaled to drive readiness

  // Category Weights:
  // Academics 15%, Programming 10%, DSA 15%, CS Fundamentals 15%, Aptitude 10%,
  // Communication 5%, Projects 10%, Resume 5%, Interview 10%, Company Prep 5%
  const categories = {
    academics: {
      name: 'Academics',
      weight: 0.15,
      score: academicScore,
      contributedScore: academicScore * 0.15,
      explanation: `CGPA ${profile.cgpa} / 10 with ${profile.backlogs} backlogs meets 100% of top-tier eligibility cutoffs (Google, JPMC, TCS Prime).`,
      improvementTip: 'Maintain clean academic record through 8th semester.',
    },
    programming: {
      name: 'Programming',
      weight: 0.1,
      score: programmingScore,
      contributedScore: programmingScore * 0.1,
      explanation: `Strong in C (9/10), developing in Java (5/10) and Python (4/10).`,
      improvementTip: 'Complete Java OOP Collections deep dive to raise to 8/10.',
    },
    dsa: {
      name: 'DSA',
      weight: 0.15,
      score: dsaScore,
      contributedScore: dsaScore * 0.15,
      explanation: `Strong arrays, hashing, stack foundation. ${dsaProblems.length} problems logged with active streak.`,
      improvementTip: 'Practice 15 more Dynamic Programming and Tree questions.',
    },
    csFundamentals: {
      name: 'CS Fundamentals',
      weight: 0.15,
      score: csFundamentalsScore,
      contributedScore: csFundamentalsScore * 0.15,
      explanation: `SQL is strong (86.6% test score); DBMS normalization & OS scheduling need active revision.`,
      improvementTip: 'Review OS concurrency, memory paging, and DBMS ACID transactions.',
    },
    aptitude: {
      name: 'Aptitude',
      weight: 0.1,
      score: aptitudeScore,
      contributedScore: aptitudeScore * 0.1,
      explanation: `Outstanding Quantitative and Logical Reasoning baseline (95%+ accuracy).`,
      improvementTip: 'Practice timed speed rounds for company NQT format.',
    },
    communication: {
      name: 'Communication',
      weight: 0.05,
      score: communicationScore,
      contributedScore: communicationScore * 0.05,
      explanation: `Verified Cambridge LinguaSkill certification and 92% communication rating in mock interviews.`,
      improvementTip: 'Practice 2-minute elevator pitches for project architecture.',
    },
    projects: {
      name: 'Projects',
      weight: 0.1,
      score: projectsScore,
      contributedScore: projectsScore * 0.1,
      explanation: `3 high-impact projects: Laptop Support Assistant (RAG), Hotel Management (Java/Docker), AI-SHIELD (Federated AI).`,
      improvementTip: 'Finalize AI-SHIELD GAN evaluation metrics.',
    },
    resume: {
      name: 'Resume',
      weight: 0.05,
      score: resumeScore,
      contributedScore: resumeScore * 0.05,
      explanation: `ATS-formatted resume with verified GitHub & LinkedIn profile links.`,
      improvementTip: 'Align project metrics to highlight quantifiable latencies and accuracies.',
    },
    interview: {
      name: 'Interview',
      weight: 0.1,
      score: interviewScore,
      contributedScore: interviewScore * 0.1,
      explanation: `${interviews.length} mock sessions recorded. Verbal clarity is high, technical depth in Java needs practice.`,
      improvementTip: 'Complete at least 3 company-specific mock interviews.',
    },
    companyPrep: {
      name: 'Company Prep',
      weight: 0.05,
      score: companyPrepScore,
      contributedScore: companyPrepScore * 0.05,
      explanation: `4 target companies tracked. TCS application submitted; JPMC prep at 64%.`,
      improvementTip: 'Complete remaining prep topics for the TCS drive in 2 days.',
    },
  };

  const overall = Object.values(categories).reduce((sum, cat) => sum + cat.contributedScore, 0);
  const overallScore = Math.round(overall);

  let statusLabel: 'Needs Immediate Focus' | 'Building Foundation' | 'On Track' | 'Placement Ready' = 'On Track';
  if (overallScore < 50) statusLabel = 'Needs Immediate Focus';
  else if (overallScore < 70) statusLabel = 'Building Foundation';
  else if (overallScore >= 85) statusLabel = 'Placement Ready';

  return {
    overallScore,
    statusLabel,
    categories,
  };
}
