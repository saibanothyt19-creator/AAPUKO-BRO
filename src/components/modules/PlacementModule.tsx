import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Briefcase,
  Target,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const PlacementModule: React.FC = () => {
  const { readiness, profile, skills, companies, setActiveTab, setShowBreakdownModal } = useApp();
  const [subTab, setSubTab] = useState<'Readiness' | 'Roadmap' | 'Career Explorer'>('Readiness');

  // Career Explorer paths
  const careerPaths = [
    {
      title: 'AI / Machine Learning Engineer',
      tag: 'Primary Career Interest',
      matchScore: 88,
      status: 'High Alignment',
      overview: 'Designing intelligent agents, RAG systems, model evaluation, and NLP pipelines.',
      studentStrengths: ['Laptop Support Assistant (Groq RAG)', 'AI-driven Language Tech Coursework', 'AI-SHIELD (Federated GANs)'],
      skillGaps: ['Deep learning framework optimization (PyTorch/TensorRT)', 'Vector DB production indexing'],
      suggestedPrep: 'Complete 10 RAG evaluation benchmarks and deploy fine-tuned small language models on HuggingFace.',
      targetRoles: ['AI Engineer', 'ML Associate', 'Generative AI Developer'],
    },
    {
      title: 'Software Development Engineer (SDE)',
      tag: 'Core Placement Target',
      matchScore: 82,
      status: 'Strong Alignment',
      overview: 'Building resilient backend systems, low-latency algorithms, and distributed services.',
      studentStrengths: ['High C proficiency (9/10)', 'Hotel Management (Java & Docker)', 'CGPA 9.17 with 0 backlogs'],
      skillGaps: ['Java Collections Framework deep dive', 'Graph & Dynamic Programming DSA patterns'],
      suggestedPrep: 'Complete 30 LeetCode Mediums on Trees, Graphs, and DP, and master Java multithreading.',
      targetRoles: ['SDE 1', 'Software Engineer', 'Graduate Technology Associate (JPMC)'],
    },
    {
      title: 'Full Stack Development',
      tag: 'Secondary Interest',
      matchScore: 78,
      status: 'Good Alignment',
      overview: 'End-to-end web applications with modern frontend frameworks and microservice APIs.',
      studentStrengths: ['React.js component design', 'MySQL normalized relational databases', 'Node.js REST gateways'],
      skillGaps: ['Spring Boot production security (Spring Security + JWT)', 'Cloud deployment automation'],
      suggestedPrep: 'Connect Hotel Management backend to a modern React UI with automated CI/CD pipeline.',
      targetRoles: ['Full Stack Engineer', 'Web Applications Developer'],
    },
    {
      title: 'Cloud & Azure Solutions',
      tag: 'Certified Domain',
      matchScore: 85,
      status: 'High Alignment',
      overview: 'Cloud infrastructure provisioning, serverless automation, and enterprise Azure services.',
      studentStrengths: ['Microsoft Certified: Azure Fundamentals (AZ-900)', 'Eduskills Cloud Virtual Internship', 'AI-102 (Tracked)'],
      skillGaps: ['Terraform / Infrastructure as Code', 'Azure Kubernetes Service (AKS) basics'],
      suggestedPrep: 'Deploy containerized services on Azure Container Apps with managed identities.',
      targetRoles: ['Cloud Engineer', 'Azure Cloud Associate', 'DevOps Analyst'],
    },
    {
      title: 'Cybersecurity & Privacy',
      tag: 'Research Focus',
      matchScore: 76,
      status: 'Emerging Alignment',
      overview: 'Defensive architecture, threat honeypots, anomaly detection, and privacy-preserving ML.',
      studentStrengths: ['AI-SHIELD Capstone Project', 'Client Honeypots & Federated Learning research'],
      skillGaps: ['Network packet analysis (Wireshark)', 'OWASP Top 10 web exploitation testing'],
      suggestedPrep: 'Document defense benchmarks of AI-SHIELD against client poisoning attacks.',
      targetRoles: ['Security Engineer', 'Threat Intelligence Analyst'],
    },
    {
      title: 'ServiceNow Platform Specialist',
      tag: 'Enterprise IT',
      matchScore: 74,
      status: 'Specialized Track',
      overview: 'Enterprise CMDB, CSDM service architecture, and automated enterprise IT workflows.',
      studentStrengths: ['ServiceNow Data Foundations (CMDB & CSDM) certification'],
      skillGaps: ['ServiceNow Scripting (GlideRecord, Client Scripts)', 'Flow Designer workflows'],
      suggestedPrep: 'Build custom incident routing flow in ServiceNow personal developer instance.',
      targetRoles: ['ServiceNow Developer', 'ITSM Consultant'],
    },
  ];

  // 7-Phase Roadmap
  const roadmapPhases = [
    {
      phase: 'Phase 1: Academic & Baseline Verification',
      timeline: 'Completed • July - August 2026',
      status: 'Completed',
      items: [
        'Maintain CGPA 9.17 with zero backlogs (Meets 100% company cutoffs)',
        'AZ-900 & Cambridge LinguaSkill certification verified',
        'Superset student profile registration completed at KL University',
      ],
    },
    {
      phase: 'Phase 2: CS Core & DSA Ramp-up',
      timeline: 'Active Sprint • September 2026',
      status: 'In Progress',
      items: [
        'DSA Arrays, Hashing, Two Pointers (Target 60+ solved on LeetCode)',
        'Java OOP & Collections Framework revision for JPMC drive',
        'DBMS Normalization & SQL Queries practice (86.6% quiz score)',
        'TCS Digital/Prime registration deadline (28 Sep 2026)',
      ],
    },
    {
      phase: 'Phase 3: Company-Specific Mock Assessments',
      timeline: 'October 2026',
      status: 'Upcoming',
      items: [
        'JPMC Online Assessment (15-25 Oct 2026) preparation',
        'TCS NQT Advanced Coding & Aptitude simulation',
        'Project technical pitch for Laptop Support Assistant (Groq RAG)',
        'Complete 3 technical mock interview rounds with Gemini',
      ],
    },
    {
      phase: 'Phase 4: High-Tier Placement Drives & Capstone',
      timeline: 'November - December 2026',
      status: 'Upcoming',
      items: [
        'Google & Tier-1 Tech coding rounds (DP, Graphs, System design basics)',
        'AT&T campus drive interview rounds',
        'Finalize AI-SHIELD honeypot evaluation metrics for presentation',
      ],
    },
    {
      phase: 'Phase 5: Offers & Final Placement Closure',
      timeline: 'Early 2027',
      status: 'Target',
      items: [
        'Secure 6+ LPA target offer (JPMC / Tier-1 IT)',
        'Salary and role negotiation guidance with Gemini Placement Coach',
        'Graduation transition and final semester capstone sign-off',
      ],
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#E6C7E6]" />
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Placement Control Center</h1>
          </div>
          <p className="text-xs text-[#B9B0BD] mt-1">
            Engineered to guide Nayana from 4th-year preparation to securing a 6+ LPA placement offer.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0D0B10] border border-[#30283A]">
          {(['Readiness', 'Roadmap', 'Career Explorer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === tab
                  ? 'bg-[#663399] text-white shadow-md shadow-[#663399]/30'
                  : 'text-[#B9B0BD] hover:text-[#F5F1F5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Readiness View */}
      {subTab === 'Readiness' && (
        <div className="space-y-6">
          {/* Main Score Hero Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#15121A] via-[#1D1824] to-[#2E1A47]/40 border border-[#30283A] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {readiness.statusLabel}
              </span>
              <h2 className="text-2xl font-bold text-[#F5F1F5]">
                Dynamic Placement Readiness: {readiness.overallScore}%
              </h2>
              <p className="text-xs text-[#B9B0BD] leading-relaxed">
                Calculated across 10 distinct categories. You have high academic and aptitude standing (CGPA 9.17). Your primary growth leverage is advancing your Java OOP and DSA problem counts to unlock the 85%+ tier for Google and JPMC.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowBreakdownModal(true)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 transition-colors shadow-md shadow-[#663399]/30"
                >
                  Inspect Mathematical Breakdown
                </button>
                <button
                  onClick={() => setActiveTab('Gemini AI')}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#1D1824] text-[#E6C7E6] border border-[#30283A] hover:bg-[#2E1A47] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Ask Coach for Improvement Sprint</span>
                </button>
              </div>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0D0B10]/90 border border-[#30283A] shrink-0">
              <span className="text-5xl font-black text-[#F5F1F5] tracking-tight">
                {readiness.overallScore}%
              </span>
              <span className="text-xs text-[#A3779D] font-medium mt-1">Placement Preparedness</span>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+4% this week</span>
              </div>
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(readiness.categories).map((cat) => (
              <div
                key={cat.name}
                className="p-4 rounded-xl bg-[#15121A] border border-[#30283A] hover:border-[#663399]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#F5F1F5]">{cat.name}</span>
                    <span className="text-xs font-extrabold text-[#E6C7E6]">{cat.score}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#0D0B10] overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#663399] to-[#E6C7E6]"
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>

                  <p className="text-xs text-[#B9B0BD] leading-normal">{cat.explanation}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#30283A] text-[11px] text-amber-300 font-medium">
                  💡 {cat.improvementTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Roadmap View */}
      {subTab === 'Roadmap' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A] flex items-center justify-between">
            <div>
              <p className="text-xs text-[#A3779D] uppercase tracking-wider font-semibold">
                Student Preparation Timeline
              </p>
              <h2 className="text-base font-bold text-[#F5F1F5]">
                4th-Year Placement Milestone Progression
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('Gemini AI')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#663399] text-white text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Regenerate with Gemini</span>
            </button>
          </div>

          <div className="space-y-4">
            {roadmapPhases.map((phase, idx) => (
              <div
                key={phase.phase}
                className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        phase.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : phase.status === 'In Progress'
                          ? 'bg-[#663399]/40 text-[#E6C7E6] border border-[#663399]'
                          : 'bg-[#1D1824] text-[#82778A] border border-[#30283A]'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <h3 className="text-sm font-bold text-[#F5F1F5]">{phase.phase}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#A3779D]">{phase.timeline}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        phase.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : phase.status === 'In Progress'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-[#1D1824] text-[#82778A]'
                      }`}
                    >
                      {phase.status}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 pl-9">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-xs text-[#B9B0BD] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#663399]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Career Explorer View */}
      {subTab === 'Career Explorer' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A]">
            <h2 className="text-base font-bold text-[#F5F1F5] mb-1">
              Career Trajectory Explorer
            </h2>
            <p className="text-xs text-[#B9B0BD]">
              Nayana, your profile is versatile across AI/ML, Full Stack, SDE, Cloud, and Enterprise IT. Gemini provides guidance on each track, while you maintain full decision control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerPaths.map((path) => (
              <div
                key={path.title}
                className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] hover:border-[#663399]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2E1A47] text-[#E6C7E6] font-semibold">
                        {path.tag}
                      </span>
                      <h3 className="text-base font-bold text-[#F5F1F5] mt-1.5">{path.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-emerald-400">
                        {path.matchScore}%
                      </span>
                      <p className="text-[9px] text-[#A3779D] uppercase tracking-wider font-semibold">
                        Skill Match
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#B9B0BD] mb-3 leading-relaxed">{path.overview}</p>

                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="text-[10px] font-bold text-[#A3779D] uppercase tracking-wider">
                        Current Strengths:
                      </p>
                      <ul className="list-disc list-inside text-[#F5F1F5] text-[11px] mt-0.5 space-y-0.5">
                        {path.studentStrengths.map((s) => (
                          <li key={s} className="truncate">{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                        Skill Gaps to Address:
                      </p>
                      <ul className="list-disc list-inside text-[#B9B0BD] text-[11px] mt-0.5 space-y-0.5">
                        {path.skillGaps.map((g) => (
                          <li key={g} className="truncate">{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#30283A] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {path.targetRoles.slice(0, 2).map((role) => (
                      <span
                        key={role}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#1D1824] text-[#B9B0BD]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('Gemini AI');
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#E6C7E6] hover:underline"
                  >
                    <span>Plan Sprint</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
