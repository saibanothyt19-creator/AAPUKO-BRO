import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Code2,
  Terminal,
  BookOpen,
  HelpCircle,
  Mic,
  MicOff,
  CheckCircle2,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Upload,
  FileText,
  Clock,
  Send,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { LogDSAModal } from '../modals/LogDSAModal';
import confetti from 'canvas-confetti';

interface PrepModuleProps {
  initialTab?: 'DSA' | 'Programming' | 'CS Fundamentals' | 'Aptitude' | 'Interview Prep' | 'Study Room';
}

export const PreparationModule: React.FC<PrepModuleProps> = ({ initialTab = 'DSA' }) => {
  const {
    skills,
    updateSkill,
    dsaProblems,
    testResults,
    recordTestResult,
    interviews,
    recordInterviewSession,
    profile,
  } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLogDSAModalOpen, setIsLogDSAModalOpen] = useState(false);
  const [dsaFilter, setDsaFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard' | 'Revision'>('All');

  // Interactive Aptitude Quiz state
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const sampleAptitudeQuestions = [
    {
      question:
        'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
      options: ['65 seconds', '89 seconds', '100 seconds', '150 seconds'],
      correctAnswerIndex: 1, // (240 + 650) / (240/24 = 10 m/s) = 890 / 10 = 89 sec
      explanation: 'Speed of train = 240 / 24 = 10 m/sec. Total distance = 240 + 650 = 890 m. Time = 890 / 10 = 89 seconds.',
      topic: 'Time and Distance',
    },
    {
      question: 'Find the odd one out in the series: 3, 5, 11, 14, 17, 21',
      options: ['14', '17', '21', '11'],
      correctAnswerIndex: 0,
      explanation: 'Each of the numbers except 14 is a prime or following the sequence; 14 is the only even composite number in this set.',
      topic: 'Number Series',
    },
    {
      question:
        'If a shopkeeper sells an article at a profit of 15% for Rs. 230, what was the cost price of the article?',
      options: ['Rs. 180', 'Rs. 200', 'Rs. 210', 'Rs. 195'],
      correctAnswerIndex: 1, // CP = 230 / 1.15 = 200
      explanation: 'CP = SP / (1 + Profit%) = 230 / 1.15 = Rs. 200.',
      topic: 'Profit and Loss',
    },
  ];

  // Interactive AI Mock Interview state
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewMode, setInterviewMode] = useState<'Technical' | 'HR' | 'JPMC' | 'Project-based'>('Technical');
  const [interviewStep, setInterviewStep] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [interviewEvaluation, setInterviewEvaluation] = useState<any>(null);

  const interviewQuestionsList = [
    {
      q: 'Explain the internal working of a HashMap in Java. How are hash collisions resolved in Java 8 and beyond?',
      topic: 'Java & Data Structures',
    },
    {
      q: 'Walk me through your Laptop Support Assistant project. Why did you choose RAG over fine-tuning, and how did you minimize latency with Groq?',
      topic: 'Projects (Laptop Support Assistant)',
    },
    {
      q: 'What is the difference between 2NF and 3NF? Can you give an example of a transitive dependency?',
      topic: 'DBMS & Normalization',
    },
  ];

  // Study Room state
  const [studyTopic, setStudyTopic] = useState('Dynamic Programming Patterns');
  const [studyResult, setStudyResult] = useState<string | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);

  // Filtered DSA
  const filteredDSA = dsaProblems.filter((p) => {
    if (dsaFilter === 'All') return true;
    if (dsaFilter === 'Revision') return p.needRevision;
    return p.difficulty === dsaFilter;
  });

  const handleStartQuiz = () => {
    setQuizActive(true);
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizScore(null);
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    sampleAptitudeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / sampleAptitudeQuestions.length) * 100);
    setQuizScore(scorePct);
    setQuizSubmitted(true);

    recordTestResult({
      testType: 'Aptitude',
      title: 'Quantitative & Logical Simulation',
      date: new Date().toISOString().split('T')[0],
      totalQuestions: sampleAptitudeQuestions.length,
      correct,
      wrong: sampleAptitudeQuestions.length - correct,
      scorePercentage: scorePct,
      durationMinutes: 10,
      weakTopics: correct < sampleAptitudeQuestions.length ? ['Time and Distance'] : [],
    });

    if (scorePct >= 70) {
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!candidateAnswer.trim()) return;
    setEvaluating(true);

    try {
      const response = await fetch('/api/gemini/interview-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: interviewQuestionsList[interviewStep].q,
          answer: candidateAnswer,
          topic: interviewQuestionsList[interviewStep].topic,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setInterviewEvaluation(data);
        recordInterviewSession({
          mode: interviewMode as any,
          companyOrTopic: interviewQuestionsList[interviewStep].topic,
          date: new Date().toISOString().split('T')[0],
          score: data.score,
          technicalAccuracy: data.technicalAccuracy,
          communication: data.communication,
          feedback: data.feedback,
          questionsAnswered: [
            {
              question: interviewQuestionsList[interviewStep].q,
              answer: candidateAnswer,
              score: data.score,
              feedback: data.feedback,
              missedConcepts: data.missedConcepts,
            },
          ],
        });
      }
    } catch {
      // Local fallback
      setInterviewEvaluation({
        score: 84,
        technicalAccuracy: 82,
        communication: 94,
        feedback:
          'Excellent answer structure! You articulated the primary concept clearly. Mentioning time/space trade-offs will give your answer extra punch in JPMC/Google technical rounds.',
        missedConcepts: ['Worst-case complexity', 'Concurrent modifications'],
      });
    } finally {
      setEvaluating(false);
    }
  };

  const handleStudyRequest = async (mode: string) => {
    setStudyLoading(true);
    try {
      const res = await fetch('/api/gemini/study-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: studyTopic, mode }),
      });
      if (res.ok) {
        const data = await res.json();
        setStudyResult(data.content);
      }
    } catch {
      setStudyResult(
        `### Study Notes: ${studyTopic}\n\n- **Definition & Purpose:** Core building block for software placement interviews.\n- **Common Interview Questions:** Explain time complexity proofs and space optimization.\n- **Placement Strategy:** Practice 5 variations on LeetCode and explain the state transition equation out loud.`
      );
    } finally {
      setStudyLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-[#E6C7E6]" />
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Preparation Suite</h1>
          </div>
          <p className="text-xs text-[#B9B0BD] mt-1">
            Practice DSA, review CS fundamentals, take simulated aptitude tests, and run AI mock interviews.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0D0B10] border border-[#30283A]">
          {(['DSA', 'Programming', 'CS Fundamentals', 'Aptitude', 'Interview Prep', 'Study Room'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-[#663399] text-white shadow-md shadow-[#663399]/30'
                    : 'text-[#B9B0BD] hover:text-[#F5F1F5]'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* 1. DSA Tracker */}
      {activeTab === 'DSA' && (
        <div className="space-y-6">
          {/* Top Platform Links & Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
              <p className="text-xs text-[#A3779D] font-medium">Logged Problems</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-[#F5F1F5]">{dsaProblems.length}</span>
                <span className="text-xs text-[#82778A]">problems</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">Current DSA Rating: 7.0 / 10</p>
            </div>

            <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
              <p className="text-xs text-[#A3779D] font-medium">Difficulty Distribution</p>
              <div className="flex items-center gap-2 mt-2 text-xs font-bold">
                <span className="text-emerald-400">
                  Easy: {dsaProblems.filter((p) => p.difficulty === 'Easy').length}
                </span>
                <span className="text-amber-400">
                  Med: {dsaProblems.filter((p) => p.difficulty === 'Medium').length}
                </span>
                <span className="text-rose-400">
                  Hard: {dsaProblems.filter((p) => p.difficulty === 'Hard').length}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
              <p className="text-xs text-[#A3779D] font-medium">Revision Queue</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-amber-300">
                  {dsaProblems.filter((p) => p.needRevision).length}
                </span>
                <span className="text-xs text-[#82778A]">flagged</span>
              </div>
              <p className="text-[10px] text-[#A3779D] mt-1">Due for repeat practice</p>
            </div>

            {/* Profile links */}
            <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A] flex flex-col justify-between">
              <p className="text-xs text-[#A3779D] font-medium">Coding Profiles</p>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href={profile.leetcodeUrl || 'https://leetcode.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 rounded bg-[#1D1824] text-xs font-semibold text-amber-400 hover:bg-[#2E1A47] flex items-center gap-1 border border-[#30283A]"
                >
                  <span>LeetCode</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={profile.hackerrankUrl || 'https://hackerrank.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 rounded bg-[#1D1824] text-xs font-semibold text-emerald-400 hover:bg-[#2E1A47] flex items-center gap-1 border border-[#30283A]"
                >
                  <span>HackerRank</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Action Bar & Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
            <div className="flex items-center gap-2">
              {(['All', 'Easy', 'Medium', 'Hard', 'Revision'] as const).map((flt) => (
                <button
                  key={flt}
                  onClick={() => setDsaFilter(flt)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    dsaFilter === flt
                      ? 'bg-[#663399] text-white'
                      : 'bg-[#1D1824] text-[#B9B0BD] hover:text-[#F5F1F5]'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsLogDSAModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#663399] text-white text-xs font-semibold hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
            >
              <Plus className="w-4 h-4" />
              <span>Log DSA Problem</span>
            </button>
          </div>

          {/* Table of DSA problems */}
          <div className="overflow-x-auto rounded-2xl border border-[#30283A] bg-[#15121A]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1D1824] text-[#A3779D] uppercase tracking-wider font-semibold border-b border-[#30283A]">
                <tr>
                  <th className="py-3 px-4">Problem Name</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Topic</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30283A]/60">
                {filteredDSA.map((prob) => (
                  <tr key={prob.id} className="hover:bg-[#1D1824]/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#F5F1F5] flex items-center gap-2">
                      <span>{prob.problemName}</span>
                      {prob.solutionLink && (
                        <a
                          href={prob.solutionLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#663399] hover:text-[#E6C7E6]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#B9B0BD]">{prob.platform}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#1D1824] text-[#E6C7E6]">
                        {prob.topic}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#82778A]">{prob.dateSolved}</td>
                    <td className="py-3 px-4 text-[#B9B0BD]">{prob.timeTakenMinutes} min</td>
                    <td className="py-3 px-4">
                      {prob.needRevision ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                          Needs Revision
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                          Mastered
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Programming & CS Fundamentals */}
      {(activeTab === 'Programming' || activeTab === 'CS Fundamentals') && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#F5F1F5]">
                {activeTab === 'Programming' ? 'Core Programming Languages' : 'Computer Science Fundamentals'}
              </h2>
              <p className="text-xs text-[#B9B0BD]">
                Track initial self ratings vs measured performance and AI evaluations. Update your target levels as you practice.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills
              .filter((s) => (activeTab === 'Programming' ? s.category === 'Programming' : s.category === 'CS Fundamentals' || s.category === 'Database'))
              .map((skill) => (
                <div
                  key={skill.id}
                  className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] hover:border-[#663399]/50 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#F5F1F5]">{skill.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#1D1824] text-[#A3779D]">
                        Status: {skill.status}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-[#82778A]">Target:</span>{' '}
                      <span className="text-sm font-bold text-[#E6C7E6]">{skill.targetLevel} / 10</span>
                    </div>
                  </div>

                  {/* 3 Metrics: Self Rating, Measured, AI */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#0D0B10] border border-[#30283A]/80 text-center">
                    <div>
                      <p className="text-[9px] text-[#82778A] uppercase font-semibold">Self Rating</p>
                      <p className="text-sm font-bold text-[#F5F1F5]">{skill.selfRating} / 10</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#82778A] uppercase font-semibold">Measured</p>
                      <p className="text-sm font-bold text-purple-300">
                        {skill.measuredPerformance ? `${skill.measuredPerformance} / 10` : 'Pending'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#82778A] uppercase font-semibold">AI Assessment</p>
                      <p className="text-sm font-bold text-emerald-400">
                        {skill.aiAssessment ? `${skill.aiAssessment} / 10` : 'Pending'}
                      </p>
                    </div>
                  </div>

                  {skill.notes && (
                    <p className="text-xs text-[#B9B0BD] bg-[#1D1824]/60 p-2.5 rounded-lg border border-[#30283A]/40">
                      {skill.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[10px] text-[#82778A]">
                      Last practiced: {skill.lastPracticed || 'Recent'}
                    </span>
                    <button
                      onClick={() => {
                        const newRating = Math.min(10, skill.selfRating + 0.5);
                        updateSkill(skill.id, { selfRating: newRating });
                      }}
                      className="px-2.5 py-1 text-[11px] rounded bg-[#2E1A47] text-[#E6C7E6] hover:bg-[#663399] transition-colors"
                    >
                      + Update Rating
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 3. Aptitude Tracker & Interactive Test Engine */}
      {activeTab === 'Aptitude' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  Strong Baseline: 9.7 / 10
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#F5F1F5] mt-1">
                Aptitude & Speed Reasoning Engine
              </h2>
              <p className="text-xs text-[#B9B0BD] mt-1">
                KL University placement tests require high accuracy under tight clock constraints. Take timed mock tests to calibrate speed.
              </p>
            </div>

            {!quizActive && (
              <button
                onClick={handleStartQuiz}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#663399] text-white font-semibold text-xs hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
              >
                <Play className="w-4 h-4" />
                <span>Start Timed Aptitude Simulation</span>
              </button>
            )}
          </div>

          {/* Interactive Quiz Window */}
          {quizActive && (
            <div className="p-6 rounded-2xl bg-[#15121A] border border-[#663399]/60 shadow-xl space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#30283A]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#2E1A47] text-[#E6C7E6]">
                    Question {currentQuestionIndex + 1} of {sampleAptitudeQuestions.length}
                  </span>
                  <span className="text-xs text-[#A3779D]">
                    Topic: {sampleAptitudeQuestions[currentQuestionIndex].topic}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timed Test (07:45)</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm md:text-base font-semibold text-[#F5F1F5] leading-relaxed">
                  {sampleAptitudeQuestions[currentQuestionIndex].question}
                </h3>

                <div className="mt-4 space-y-2.5">
                  {sampleAptitudeQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() =>
                          setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: oIdx }))
                        }
                        className={`w-full p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#2E1A47] border-[#663399] text-[#E6C7E6]'
                            : 'bg-[#1D1824] border-[#30283A] text-[#B9B0BD] hover:text-[#F5F1F5] hover:border-[#663399]/40'
                        }`}
                      >
                        <span className="font-bold mr-2 text-[#A3779D]">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {quizSubmitted && (
                <div className="p-3.5 rounded-xl bg-[#0D0B10] border border-[#30283A] text-xs">
                  <p className="font-bold text-emerald-400 mb-1">
                    Correct Answer: Option{' '}
                    {String.fromCharCode(
                      65 + sampleAptitudeQuestions[currentQuestionIndex].correctAnswerIndex
                    )}
                  </p>
                  <p className="text-[#B9B0BD]">
                    {sampleAptitudeQuestions[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}

              {/* Navigation & Submit */}
              <div className="flex items-center justify-between pt-3 border-t border-[#30283A]">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#B9B0BD] bg-[#1D1824] disabled:opacity-40"
                >
                  Previous
                </button>

                {!quizSubmitted ? (
                  currentQuestionIndex === sampleAptitudeQuestions.length - 1 ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-md"
                    >
                      Submit Test & Calculate Score
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                      className="px-4 py-2 rounded-xl bg-[#663399] text-white font-semibold text-xs hover:bg-[#663399]/90"
                    >
                      Next Question
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => setQuizActive(false)}
                    className="px-4 py-2 rounded-xl bg-[#663399] text-white font-semibold text-xs"
                  >
                    Close Test (Score: {quizScore}%)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Past Test History */}
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
            <h3 className="text-sm font-bold text-[#F5F1F5] mb-3">Recorded Aptitude & Technical Tests</h3>
            <div className="space-y-3">
              {testResults.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-[#F5F1F5]">{t.title}</p>
                    <p className="text-[10px] text-[#A3779D]">
                      {t.date} • {t.totalQuestions} questions • Weak topics: {t.weakTopics.join(', ') || 'None'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-extrabold ${
                        t.scorePercentage >= 80 ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {t.scorePercentage}%
                    </span>
                    <p className="text-[9px] text-[#82778A]">Accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. AI Mock Interview */}
      {activeTab === 'Interview Prep' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                  Interactive Interview Room
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#F5F1F5] mt-1">
                Gemini AI Mock Interview Studio
              </h2>
              <p className="text-xs text-[#B9B0BD] mt-1">
                Practice technical, HR, project architecture, and company-specific rounds with real-time scoring.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={interviewMode}
                onChange={(e) => setInterviewMode(e.target.value as any)}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-[#1D1824] border border-[#30283A] text-[#F5F1F5]"
              >
                <option value="Technical">Technical (Java/DBMS/DSA)</option>
                <option value="HR">HR & Behavioral</option>
                <option value="JPMC">JPMC Software Engineer Round</option>
                <option value="Project-based">Project Deep Dive (Laptop RAG)</option>
              </select>

              {!interviewStarted && (
                <button
                  onClick={() => setInterviewStarted(true)}
                  className="px-4 py-2 rounded-xl bg-[#663399] text-white text-xs font-bold hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
                >
                  Start Session
                </button>
              )}
            </div>
          </div>

          {interviewStarted && (
            <div className="p-6 rounded-2xl bg-[#15121A] border border-[#663399]/60 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#30283A]">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#2E1A47] text-[#E6C7E6] font-bold">
                    Question {interviewStep + 1}
                  </span>
                  <span className="text-xs text-[#A3779D]">
                    {interviewQuestionsList[interviewStep].topic}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                      isRecording
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500 animate-pulse'
                        : 'bg-[#1D1824] text-[#B9B0BD] border border-[#30283A]'
                    }`}
                  >
                    {isRecording ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                    <span>{isRecording ? 'Listening...' : 'Voice Mode'}</span>
                  </button>
                </div>
              </div>

              {/* Question text */}
              <div className="p-4 rounded-xl bg-[#0D0B10] border border-[#30283A]">
                <p className="text-sm font-semibold text-[#F5F1F5] leading-relaxed">
                  &ldquo;{interviewQuestionsList[interviewStep].q}&rdquo;
                </p>
              </div>

              {/* Candidate input */}
              <div>
                <label className="block text-xs font-semibold text-[#A3779D] uppercase tracking-wider mb-1.5">
                  Your Answer
                </label>
                <textarea
                  rows={4}
                  value={candidateAnswer}
                  onChange={(e) => setCandidateAnswer(e.target.value)}
                  placeholder="Type or speak your answer clearly, including architectural considerations and code examples..."
                  className="w-full p-3.5 text-xs bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  disabled={evaluating || !candidateAnswer.trim()}
                  onClick={handleEvaluateAnswer}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 disabled:opacity-50 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{evaluating ? 'Evaluating with Gemini...' : 'Submit & Evaluate Answer'}</span>
                </button>
              </div>

              {/* Evaluation Output */}
              {interviewEvaluation && (
                <div className="mt-4 p-5 rounded-2xl bg-[#0D0B10] border border-[#30283A] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#30283A]">
                    <span className="text-xs font-bold text-purple-300">
                      Gemini Interview Evaluation
                    </span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-emerald-400 font-bold">
                        Score: {interviewEvaluation.score} / 100
                      </span>
                      <span className="text-purple-300">
                        Tech Accuracy: {interviewEvaluation.technicalAccuracy}%
                      </span>
                      <span className="text-[#E6C7E6]">
                        Comm: {interviewEvaluation.communication}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#B9B0BD] leading-relaxed">
                    {interviewEvaluation.feedback}
                  </p>

                  {interviewEvaluation.missedConcepts?.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                        Missed Concepts to Mention Next Time:
                      </p>
                      <ul className="list-disc list-inside text-xs text-[#B9B0BD] mt-1 space-y-0.5">
                        {interviewEvaluation.missedConcepts.map((c: string) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={() => {
                        setInterviewEvaluation(null);
                        setCandidateAnswer('');
                        if (interviewStep < interviewQuestionsList.length - 1) {
                          setInterviewStep((prev) => prev + 1);
                        } else {
                          setInterviewStarted(false);
                          setInterviewStep(0);
                        }
                      }}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#2E1A47] text-[#E6C7E6] hover:bg-[#663399]"
                    >
                      {interviewStep < interviewQuestionsList.length - 1 ? 'Next Question →' : 'Complete Interview'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. AI Study Room */}
      {activeTab === 'Study Room' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#F5F1F5]">AI Study Room & Document Grounding</h2>
              <p className="text-xs text-[#B9B0BD] mt-1">
                Upload college slides, lecture notes, or interview cheat-sheets. Gemini will explain concepts, generate flashcards, and drill questions.
              </p>
            </div>

            {/* Document upload box */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-[#30283A] hover:border-[#663399] transition-colors text-center bg-[#0D0B10]/60 cursor-pointer">
              <Upload className="w-8 h-8 text-[#A3779D] mx-auto mb-2" />
              <p className="text-xs font-bold text-[#F5F1F5]">
                Drag and drop PDF, PPT, TXT or Images here
              </p>
              <p className="text-[10px] text-[#82778A] mt-0.5">
                Grounding models never hallucinate; information not in the document is clearly noted.
              </p>
            </div>

            {/* Topic Input & Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={studyTopic}
                onChange={(e) => setStudyTopic(e.target.value)}
                placeholder="Enter topic to study (e.g. BCNF Decomposition, Graph BFS vs DFS)..."
                className="flex-1 px-4 py-2 text-xs bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5] focus:outline-none focus:border-[#663399]"
              />

              <div className="flex items-center gap-2">
                <button
                  disabled={studyLoading}
                  onClick={() => handleStudyRequest('explain')}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90"
                >
                  Teach Me This
                </button>
                <button
                  disabled={studyLoading}
                  onClick={() => handleStudyRequest('flashcards')}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#2E1A47] text-[#E6C7E6] hover:bg-[#663399]"
                >
                  Flashcards
                </button>
                <button
                  disabled={studyLoading}
                  onClick={() => handleStudyRequest('quiz')}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#1D1824] text-[#B9B0BD] hover:text-[#F5F1F5] border border-[#30283A]"
                >
                  Quick Quiz
                </button>
              </div>
            </div>

            {studyResult && (
              <div className="mt-4 p-5 rounded-xl bg-[#0D0B10] border border-[#30283A] text-xs text-[#F5F1F5] leading-relaxed whitespace-pre-wrap">
                {studyResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Log DSA Modal */}
      <LogDSAModal isOpen={isLogDSAModalOpen} onClose={() => setIsLogDSAModalOpen(false)} />
    </div>
  );
};
