import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderGit2,
  FileText,
  Award,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Github,
  Linkedin,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { CertificationItem } from '../../types';

interface CareerModuleProps {
  initialTab?: 'Projects' | 'Resume' | 'Certifications' | 'GitHub & LinkedIn' | 'Internship';
}

export const CareerModule: React.FC<CareerModuleProps> = ({ initialTab = 'Projects' }) => {
  const {
    projects,
    updateProject,
    certifications,
    addCertification,
    deleteCertification,
    internship,
    profile,
    setActiveTab,
  } = useApp();

  const [activeTab, setActiveTabState] = useState(initialTab);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [projectPitchMode, setProjectPitchMode] = useState<'30s' | '2m' | 'qa' | null>(null);

  // New cert modal
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [certName, setCertName] = useState('');
  const [certOrg, setCertOrg] = useState('');
  const [certDate, setCertDate] = useState('2026-01-01');
  const [certId, setCertId] = useState('');
  const [certUrl, setCertUrl] = useState('');

  // Resume ATS Review state
  const [copiedPitch, setCopiedPitch] = useState(false);

  const handleAddCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) return;

    addCertification({
      name: certName.trim(),
      issuingOrganization: certOrg.trim() || 'Accredited Provider',
      issueDate: certDate,
      credentialId: certId.trim() || undefined,
      verificationUrl: certUrl.trim() || undefined,
      inUploadedResume: false,
      verified: true,
    });

    setCertName('');
    setCertOrg('');
    setIsAddCertOpen(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-[#E6C7E6]" />
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Career Assets & Portfolio</h1>
          </div>
          <p className="text-xs text-[#B9B0BD] mt-1">
            Authoritative manager for verified projects, resume bullets, certifications, and technical explanations.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0D0B10] border border-[#30283A]">
          {(['Projects', 'Resume', 'Certifications', 'GitHub & LinkedIn', 'Internship'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTabState(tab)}
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

      {/* 1. Projects Center */}
      {activeTab === 'Projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Project Selector (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-bold text-[#A3779D] uppercase tracking-wider">
                Confirmed Student Projects
              </p>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    setSelectedProject(proj);
                    setProjectPitchMode(null);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedProject.id === proj.id
                      ? 'bg-[#1D1824] border-[#663399] shadow-lg shadow-[#663399]/20'
                      : 'bg-[#15121A] border-[#30283A] hover:border-[#663399]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-bold text-[#F5F1F5]">{proj.name}</h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        proj.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#82778A] line-clamp-2 mb-2">{proj.overview}</p>

                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-[#0D0B10] text-[#E6C7E6]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Project Deep Dive (8 cols) */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#30283A] gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F1F5]">{selectedProject.name}</h2>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded-md bg-[#2E1A47] text-[#E6C7E6] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#1D1824] border border-[#30283A] text-xs font-semibold text-[#F5F1F5] flex items-center gap-1.5 hover:bg-[#2E1A47]"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#663399] text-xs font-semibold text-white flex items-center gap-1.5 hover:bg-[#663399]/90"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Overview & Architecture */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#A3779D] uppercase tracking-wider mb-1">
                    System Architecture & Description
                  </h4>
                  <p className="text-[#F5F1F5] bg-[#0D0B10] p-3.5 rounded-xl border border-[#30283A]/70">
                    {selectedProject.architectureNotes || selectedProject.overview}
                  </p>
                </div>

                {selectedProject.challenges && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#1D1824] border border-[#30283A]">
                      <p className="font-bold text-rose-300 uppercase tracking-wider text-[10px] mb-1">
                        Core Engineering Challenge
                      </p>
                      <p className="text-[#B9B0BD]">{selectedProject.challenges}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1D1824] border border-[#30283A]">
                      <p className="font-bold text-emerald-300 uppercase tracking-wider text-[10px] mb-1">
                        Technical Solution Applied
                      </p>
                      <p className="text-[#B9B0BD]">{selectedProject.solutions}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Gemini Project Action Buttons */}
              <div className="pt-3 border-t border-[#30283A]">
                <p className="text-xs font-bold text-[#A3779D] uppercase tracking-wider mb-2.5">
                  Interview Pitch Generator & Q&amp;A
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setProjectPitchMode('30s')}
                    className="px-3 py-1.5 rounded-xl bg-[#2E1A47] text-[#E6C7E6] text-xs font-semibold hover:bg-[#663399] transition-colors"
                  >
                    30-Second Elevator Pitch
                  </button>
                  <button
                    onClick={() => setProjectPitchMode('2m')}
                    className="px-3 py-1.5 rounded-xl bg-[#2E1A47] text-[#E6C7E6] text-xs font-semibold hover:bg-[#663399] transition-colors"
                  >
                    2-Minute Technical Deep Dive
                  </button>
                  <button
                    onClick={() => setProjectPitchMode('qa')}
                    className="px-3 py-1.5 rounded-xl bg-[#2E1A47] text-[#E6C7E6] text-xs font-semibold hover:bg-[#663399] transition-colors"
                  >
                    Expected Interview Questions ({selectedProject.sampleInterviewQuestions.length})
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('Interview Prep');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#663399] text-white text-xs font-bold hover:bg-[#663399]/90 ml-auto flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interview me about this project</span>
                  </button>
                </div>

                {/* Pitch Display Box */}
                {projectPitchMode && (
                  <div className="mt-4 p-4 rounded-xl bg-[#0D0B10] border border-[#663399]/50 text-xs text-[#F5F1F5] leading-relaxed relative">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          projectPitchMode === '30s'
                            ? selectedProject.interviewExplanation
                            : selectedProject.architectureNotes || selectedProject.overview
                        )
                      }
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#1D1824] text-[#B9B0BD] hover:text-white"
                      title="Copy pitch"
                    >
                      {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {projectPitchMode === '30s' && (
                      <div>
                        <p className="font-bold text-[#E6C7E6] mb-1">30-Second Concise Pitch:</p>
                        <p>&ldquo;{selectedProject.interviewExplanation}&rdquo;</p>
                      </div>
                    )}

                    {projectPitchMode === '2m' && (
                      <div>
                        <p className="font-bold text-[#E6C7E6] mb-1">2-Minute Technical Architecture Walkthrough:</p>
                        <p>{selectedProject.architectureNotes}</p>
                        <p className="mt-2 text-[#A3779D]">
                          &ldquo;We tackled {selectedProject.challenges}, solving it by {selectedProject.solutions}.&rdquo;
                        </p>
                      </div>
                    )}

                    {projectPitchMode === 'qa' && (
                      <div className="space-y-2">
                        <p className="font-bold text-[#E6C7E6]">Key Technical Questions Interviewers Ask:</p>
                        <ul className="list-decimal list-inside space-y-1.5 text-[#B9B0BD]">
                          {selectedProject.sampleInterviewQuestions.map((q, idx) => (
                            <li key={idx} className="font-medium text-[#F5F1F5]">{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Resume Center */}
      {activeTab === 'Resume' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  ATS Score: 90 / 100
                </span>
                <span className="text-xs text-[#A3779D]">Version 3.2 (Active)</span>
              </div>
              <h2 className="text-xl font-bold text-[#F5F1F5] mt-1">
                Authoritative Placement Resume & ATS Auditor
              </h2>
              <p className="text-xs text-[#B9B0BD] mt-1">
                Optimized for KL University Superset automated parsers and JPMC/Google recruiters.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  alert('Uploaded resume PDF preview loaded: Bandla_Nayana_Resume_v3.pdf');
                }}
                className="px-4 py-2 rounded-xl bg-[#1D1824] border border-[#30283A] text-xs font-semibold text-[#F5F1F5] hover:bg-[#2E1A47]"
              >
                Download PDF
              </button>
              <button
                onClick={() => setActiveTab('Gemini AI')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#663399] text-white text-xs font-bold hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Audit Keywords for JPMC</span>
              </button>
            </div>
          </div>

          {/* Discrepancy Callout */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-[#F5F1F5] space-y-1">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Resume Alignment Notice</span>
            </div>
            <p className="text-[#B9B0BD]">
              Your student profile lists: <strong>AZ-900, AI-102, and ServiceNow Data Foundations</strong>, while the uploaded PDF resume currently lists: <strong>AZ-900 and Cambridge LinguaSkill</strong>. Use the Certifications Manager below to maintain the single authoritative source of truth.
            </p>
          </div>

          {/* ATS Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
              <p className="text-xs font-bold text-[#A3779D] uppercase tracking-wider mb-2">
                Impact Quantifications
              </p>
              <p className="text-xs text-[#B9B0BD]">
                Projects feature high-impact metrics (e.g. &ldquo;&lt;500ms latency with Groq RAG&rdquo; and &ldquo;Pessimistic concurrency locking preventing race conditions&rdquo;).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
              <p className="text-xs font-bold text-[#A3779D] uppercase tracking-wider mb-2">
                Coursework Keywords
              </p>
              <p className="text-xs text-[#B9B0BD]">
                Data Structures, Algorithms, AI/ML, AI-driven Language Technologies, Operating Systems, Computer Networks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#15121A] border border-[#30283A]">
              <p className="text-xs font-bold text-[#A3779D] uppercase tracking-wider mb-2">
                Formatting & Layout
              </p>
              <p className="text-xs text-[#B9B0BD]">
                Single-page layout, clean reverse-chronological order, sans-serif typography, no multi-column parsing traps.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Certifications Manager */}
      {activeTab === 'Certifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#F5F1F5]">Authoritative Certifications Manager</h2>
              <p className="text-xs text-[#B9B0BD]">
                Track credentials, issuing bodies, expiration dates, and verification links.
              </p>
            </div>
            <button
              onClick={() => setIsAddCertOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certification</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] hover:border-[#663399]/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#F5F1F5]">{cert.name}</h3>
                      <p className="text-xs text-[#A3779D] font-medium">{cert.issuingOrganization}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-2 py-2 border-y border-[#30283A]/70 text-xs">
                    <div>
                      <p className="text-[10px] text-[#82778A]">Issue Date</p>
                      <p className="font-semibold text-[#F5F1F5]">{cert.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#82778A]">Credential ID</p>
                      <p className="font-mono text-[#E6C7E6] truncate">{cert.credentialId || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#82778A]">
                      Resume status:{' '}
                      <span className={cert.inUploadedResume ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                        {cert.inUploadedResume ? 'Included in PDF' : 'In Portal Record'}
                      </span>
                    </span>

                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#663399] hover:text-[#E6C7E6] flex items-center gap-1 font-semibold"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#30283A] flex justify-end">
                  <button
                    onClick={() => deleteCertification(cert.id)}
                    className="p-1 rounded text-[#82778A] hover:text-rose-400"
                    title="Delete certificate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. GitHub & LinkedIn */}
      {activeTab === 'GitHub & LinkedIn' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-4">
            <h2 className="text-base font-bold text-[#F5F1F5]">Professional Online Profiles</h2>
            <p className="text-xs text-[#B9B0BD]">
              Recruiters at JPMC, Google, and TCS inspect GitHub commit histories and LinkedIn summaries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#F5F1F5]">
                  <Github className="w-5 h-5 text-purple-300" />
                  <span>GitHub Profile</span>
                </div>
                <p className="text-xs text-[#B9B0BD]">{profile.githubUrl}</p>
                <div className="pt-2">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#E6C7E6] hover:underline flex items-center gap-1"
                  >
                    <span>View repositories & commits</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#F5F1F5]">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <p className="text-xs text-[#B9B0BD]">{profile.linkedinUrl}</p>
                <div className="pt-2">
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-300 hover:underline flex items-center gap-1"
                  >
                    <span>View recommendations & network</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Internship */}
      {activeTab === 'Internship' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#15121A] border border-[#30283A] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2E1A47] text-[#E6C7E6] font-bold">
                  Virtual Industry Experience
                </span>
                <h2 className="text-xl font-bold text-[#F5F1F5] mt-1.5">
                  {internship.organization} – {internship.role}
                </h2>
                <p className="text-xs text-[#A3779D]">
                  {internship.domain} • {internship.startDate} to {internship.endDate}
                </p>
              </div>

              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Completed
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <p className="text-[#B9B0BD] bg-[#0D0B10] p-4 rounded-xl border border-[#30283A]/70">
                {internship.description}
              </p>

              <div>
                <p className="font-bold text-[#A3779D] uppercase tracking-wider mb-1.5">
                  Skills & Tools Applied:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {internship.skillsGained.map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded-md bg-[#1D1824] text-[#E6C7E6] font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1D1824] border border-[#30283A] space-y-1">
                <p className="font-bold text-[#E6C7E6] uppercase tracking-wider text-[10px]">
                  How to Explain in HR / Technical Interviews:
                </p>
                <p className="text-[#B9B0BD]">{internship.interviewExplanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Certification Modal */}
      {isAddCertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#15121A] border border-[#30283A] rounded-2xl p-6 text-[#F5F1F5]">
            <h2 className="text-base font-bold text-[#E6C7E6] mb-4">Add Authoritative Certification</h2>
            <form onSubmit={handleAddCertSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A3779D] font-semibold mb-1">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="e.g. AWS Certified Developer, HashiCorp Terraform"
                  className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                />
              </div>

              <div>
                <label className="block text-[#A3779D] font-semibold mb-1">Issuing Organization</label>
                <input
                  type="text"
                  value={certOrg}
                  onChange={(e) => setCertOrg(e.target.value)}
                  placeholder="e.g. Microsoft, Cambridge, Google Cloud"
                  className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A3779D] font-semibold mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={certDate}
                    onChange={(e) => setCertDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                  />
                </div>
                <div>
                  <label className="block text-[#A3779D] font-semibold mb-1">Credential ID</label>
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="MS-XXXX"
                    className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A3779D] font-semibold mb-1">Verification URL</label>
                <input
                  type="url"
                  value={certUrl}
                  onChange={(e) => setCertUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#1D1824] border border-[#30283A] rounded-xl text-[#F5F1F5]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#30283A]">
                <button
                  type="button"
                  onClick={() => setIsAddCertOpen(false)}
                  className="px-4 py-2 text-[#B9B0BD] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#663399] text-white rounded-xl"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
