import React, { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";
import { memo } from "react";
import Loading from "../../../components/Loading.jsx";

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      // People / soft skills
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
        <circle cx="17" cy="7" r="3" />
        <path d="M21 20c0-3-2.7-5-6-5" />
      </svg>
    ),
  },
  {
    id: "plan",
    label: "Preparation Plan",
    icon: (
      // Calendar / checklist
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    id: "feedback",
    label: "AI Feedback",
    icon: (
      // Sparkle / AI
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M5 19l.75 2.25L8 22l-2.25.75L5 25" />
        <path d="M19 3l.75 2.25L22 6l-2.25.75L19 9" />
      </svg>
    ),
  },
];

// ── QuestionCard ──────────────────────────────────────────────────────────────
function QuestionCard({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-800 p-1 border border-gray-700 rounded-xl mb-0 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start gap-3 cursor-pointer bg-gray-800 hover:bg-[#262b38] transition-colors"
      >
        <span className="mt-0.5 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>
        <span className="text-sm font-medium text-gray-300/95 leading-relaxed flex-1">
          {item.question}
        </span>
        <span
          className={`text-slate-400 text-xs mt-0.5 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 space-y-3 border-t border-slate-50">
          <div className="flex gap-2 pt-3">
            <span className="text-indigo-400 text-sm flex-shrink-0">💡</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              {item.intention}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Suggested answer
            </p>
            <div className="text-sm text-gray-300 leading-relaxed bg-indigo-950/30 border-l-2 border-indigo-500 rounded-r-lg px-4 py-3">
              {item.answer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ icon, children }) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-gray-500 mb-3">
      <span className="text-sm">{icon}</span>
      {children}
    </p>
  );
}

function TechTag({ label, accent = false }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${
        accent
          ? "bg-gray-700 text-gray-300 border-gray-600"
          : "bg-gray-700 text-gray-300 border-gray-600"
      }`}
    >
      {label}
    </span>
  );
}

function PeriodBadge({ period }) {
  return (
    <span className="flex-shrink-0 text-[11px] px-2 py-1 rounded bg-gray-800 text-indigo-300 border border-indigo-800">
      {period}
    </span>
  );
}

// ── Section cards ──────────────────────────────────────────────────────────────

function HeaderCard({ candidate, matchScore }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center gap-5">
        {/* Avatar with online dot */}
        <div className="relative flex-shrink-0">
          <div className="w-[72px] h-[72px] rounded-[18px] overflow-hidden border-2 border-indigo-700">
            <img
              src="https://thumbs.dreamstime.com/b/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276214145.jpg"
              alt={`${candidate.name ?? "Candidate"} avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-gray-800" />
        </div>

        {/* Name + role + badge */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-1">
            Welcome back
          </p>
          <h2 className="text-[22px] font-semibold text-white leading-tight mb-2">
            {candidate.name || "Not available"}
          </h2>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1.5 text-[13px] text-gray-400">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              {candidate.role || "No role specified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ summary }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
      <SectionLabel icon="≡">Summary</SectionLabel>
      <p className="text-sm text-gray-300 leading-7">
        {summary || "No summary available"}
      </p>
    </div>
  );
}

function SkillsCard({ skills }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
      <SectionLabel icon="⟨⟩">Technical skills</SectionLabel>
      {skills?.length ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <TechTag key={s} label={s} accent />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No skills listed</p>
      )}
    </div>
  );
}

function ExperienceCard({ experience }) {
  if (!experience?.length) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
      <SectionLabel icon="🏢">Experience</SectionLabel>

      <div className="flex gap-4">
        {/* Timeline dots */}
        <div className="flex flex-col items-center pt-1 flex-shrink-0">
          {experience.map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-2 h-2 rounded-full ${i === 0 ? "bg-indigo-900" : "bg-gray-600"}`}
              />
              {i < experience.length - 1 && (
                <div className="w-px flex-1 min-h-[36px] bg-gray-700 my-1" />
              )}
            </div>
          ))}
        </div>

        {/* Entries */}
        <div className="flex-1 min-w-0 space-y-4">
          {experience.map((exp, i) => (
            <div
              key={i}
              className={
                i < experience.length - 1 ? "pb-4 border-b border-gray-700" : ""
              }
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white leading-snug">
                    {exp.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{exp.company}</p>
                </div>
                <PeriodBadge period={exp.period} />
              </div>
              {exp.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {exp.technologies.map((t) => (
                    <TechTag key={t} label={t} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsCard({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
      <SectionLabel icon="▦">Projects</SectionLabel>
      <div className="space-y-3">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="rounded-xl bg-gray-900 border border-gray-700 p-4"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <p className="text-sm font-medium text-white">{proj.name}</p>
              <span className="text-gray-600 text-xs flex-shrink-0 mt-0.5">
                ↗
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              {proj.description}
            </p>
            {proj.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {proj.technologies.map((t) => (
                  <TechTag key={t} label={t} accent />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationCard({ education }) {
  if (!education?.length) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
      <SectionLabel icon="🎓">Education</SectionLabel>
      <div className="space-y-4">
        {education.map((e, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-700 border border-gray-600 flex items-center justify-center flex-shrink-0 text-base">
              🏛️
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white leading-snug">
                {e.degree}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{e.institute}</p>
              <PeriodBadge period={e.year} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsCard({ certifications }) {
  if (!certifications?.length) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
      <SectionLabel className="flex items-center mb-1.5">
        <span className="mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c0 1.657-1.343 3-3 3H6a3 3 0 0 1-3-3c0-1.657 1.343-3 3-3h12c1.657 0 3 1.343 3 3z" />
          </svg>
        </span>{" "}
        Certifications
      </SectionLabel>
      <div className="space-y-3">
        {certifications.map((c, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-700 border border-gray-700 flex items-center justify-center flex-shrink-0 text-base">
              🎖️
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white leading-snug truncate">
                {c.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {c.issuer || "N/A"}
                {c.issuedAt && (
                  <span className="text-gray-600"> From {c.issuedAt || "N/A"}</span>
                )}
              </p>
            </div>
            <span className="text-emerald-400 text-base flex-shrink-0">✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Section for Overview ────────────────────────────────────────────────────────────────

const SectionOverview = memo(function SectionOverview({ report }) {
  const candidate = report?.candidate ?? {};

  return (
    <div className="space-y-3">
      <HeaderCard candidate={candidate} />
      <SummaryCard summary={candidate.summary} />
      <SkillsCard skills={candidate.skills} />
      <ExperienceCard experience={candidate.experience} />
      <ProjectsCard projects={candidate.projects} />
      <EducationCard education={candidate.education} />
      <CertificationsCard certifications={candidate.certifications} />
    </div>
  );
});

// ── Shared primitives ──────────────────────────────────────────────────────────

function SectionEyebrow({ icon, children }) {
  return (
    <div className="flex items-center gap-1.5 mb-3.5">
      <span className="text-indigo-400 text-xs">{icon}</span>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
        {children}
      </p>
      <div className="flex-1 h-px bg-gray-700" />
    </div>
  );
}

function ProjectItem({ item, index }) {
  return (
    <div className="flex gap-3 items-start bg-gray-900/80 border border-gray-700/60 rounded-xl p-3.5">
      <div className="w-6 h-6 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 text-[11px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
        {index + 1}
      </div>
      <p className="text-sm text-gray-300/95 leading-6 pl-0.5">{item}</p>
    </div>
  );
}

function ResumeItem({ item, index }) {
  return (
    <div className="flex gap-3 items-start bg-gray-900/80 border border-gray-700/60 rounded-xl p-3.5">
      <div className="w-6 h-6 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 text-[11px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
        {index + 1}
      </div>
      <p className="text-sm text-gray-300/95 leading-6 pl-0.5">{item}</p>
    </div>
  );
}

// ── PreparationDay ────────────────────────────────────────────────────────────
const PreparationDay = ({ day }) => (
  <div
    className="flex flex-col gap-2 py-3 pl-14 relative
    before:content-[''] before:absolute before:left-[21px] before:top-[1.05rem]
    before:w-[14px] before:h-[14px] before:rounded-full
    before:bg-[#161b22] before:border-2 before:border-[#ff2d78]"
  >
    <div className="flex items-center gap-[0.6rem]">
      <span className="text-[0.7rem] font-bold text-[#ff2d78] bg-[rgba(255,45,120,0.1)] border border-[rgba(255,45,120,0.25)] px-2 py-[0.1rem] rounded-full">
        Day {day.day}
      </span>
      <h3 className="m-0 text-[0.95rem] font-semibold text-[#e6edf3]">
        {day.focusArea}
      </h3>
    </div>
    <ul className="list-none m-0 p-0 flex flex-col gap-[0.35rem]">
      {day.tasks.map((task, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-[0.845rem] text-[#9aa5b4] leading-[1.5]"
        >
          <span className="flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[#7d8590] mt-2" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

// ── Main section ───────────────────────────────────────────────────────────────
function SectionFeedback({ report }) {
  const feedback = report?.aiFeedback ?? {};

  return (
    <div className="space-y-3">
      <div className="bg-gray-800 border border-indigo-800/60 rounded-2xl p-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-indigo-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-white leading-snug">
              AI Feedback
            </h2>
            <p className="text-sm text-gray-400 mt-0.5 leading-relaxed">
              Personalized recommendations based on your resume,
              self-description, and job requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Project Improvements */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
        <SectionEyebrow icon="🚀">Project improvements</SectionEyebrow>
        {feedback.projectImprovements?.length ? (
          <div className="space-y-2">
            {feedback.projectImprovements.map((item, i) => (
              <ProjectItem key={i} item={item} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            No project suggestions available
          </p>
        )}
      </div>

      {/* Resume Improvements */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
        <SectionEyebrow icon="📄">Resume improvements</SectionEyebrow>
        {feedback.resumeImprovements?.length ? (
          <div className="space-y-2">
            {feedback.resumeImprovements.map((item, i) => (
              <ResumeItem key={i} item={item} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No resume improvements available
          </p>
        )}
      </div>
      {/* Final Advice */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              className="w-5 h-5 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className=" mb-2">
              <p className="text-sm font-semibold text-white">
                Final advice for your interview preparation
              </p>
            </div>
            <p className="text-sm text-gray-300/95 leading-6 border-l-2 border-indigo-700 pl-3.5">
              {feedback.finalAdvice || "No final advice available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Utility functions ─────────────────────────────────────────────────────────
function statusLabel(score) {
  if (score >= 85) return "Strong Candidate";
  if (score >= 70) return "Good Fit";
  if (score >= 55) return "High Rejection Risk";
  return "Does Not Meet Requirements";
}

function statusPillClass(score) {
  if (score >= 85) return "text-blue-400 bg-[#162032] border-[#1e3a5a]";
  if (score >= 70) return "text-emerald-400 bg-[#162032] border-[#134e3a]";
  if (score >= 55) return "text-amber-400 bg-[#2a1f0a] border-[#4a3208]";
  return "text-red-400 bg-[#2a0f0f] border-[#4a1212]";
}

function dotColor(severity) {
  if (severity === "high") return "bg-red-400";
  if (severity === "medium" || severity === "med") return "bg-amber-400";
  return "bg-emerald-400";
}

function badgeClass(severity) {
  if (severity === "high") return "text-red-300 bg-[#2a0f0f]";
  if (severity === "medium" || severity === "med")
    return "text-amber-300 bg-[#2a1a05]";
  return "text-emerald-300 bg-[#052016]";
}


// ── Main Component ────────────────────────────────────────────────────────────
const InterviewReport = () => {
  const [activeNav, setActiveNav] = useState("overview");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading || !report) {
    return <Loading />
  }

  return (
    /* Page shell */
    <div className="w-full min-h-screen p-4 bg-[#0d1117] text-[#e6edf3] font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] flex items-stretch box-border [&::-webkit-scrollbar]:hidden">
      {/* 3-column card */}
      <div className="flex w-full mx-auto bg-[#161b22] border border-[#2a3348] rounded-2xl justify-between">
        {/* ── Left Nav ── */}
        <nav className="w-[220px] flex-shrink-0 px-4 py-7 flex flex-col justify-between gap-1">
          <div>
            <p className="text-[0.9rem] font-semibold uppercase tracking-[0.05em] text-[#b6bfca] px-3 mb-3">
              Upskale AI
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-[0.6rem] w-full px-3 py-[0.65rem] bg-transparent border-0 rounded-lg text-sm cursor-pointer text-left transition-colors duration-150
                  ${
                    activeNav === item.id
                      ? "bg-[rgba(255,45,120,0.1)] text-[#ffffff] [&_svg]:stroke-[#ffffff]"
                      : "text-[#7d8590] hover:bg-[#191d28] hover:text-[#e6edf3]"
                  }`}
              >
                <span className="flex items-center flex-shrink-0">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          {/* <button
            onClick={() => getResumePdf(interviewId)}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-[#ff2d78] hover:bg-[#e0235f] text-white text-sm font-semibold cursor-pointer border-0 transition-colors duration-150"
          >
            <svg style={{ height: '0.8rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Download Resume
          </button> */}
        </nav>

        {/* Divider */}
        <div className="w-px bg-[#2a3348] flex-shrink-0" />

        {/* ── Center Content ── */}
        <main className="flex-1 px-8 py-7 overflow-y-auto max-h-[calc(100vh-3rem)] pb-20 [&::-webkit-scrollbar]:hidden">
          {activeNav === "overview" && <SectionOverview report={report} />}

          {/* Technical */}
          {activeNav === "technical" && (
            <section className="min-h-full">
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]">
                <h2 className="m-0 text-[1.1rem] font-bold text-[#e6edf3]">
                  Technical Questions
                </h2>
                <span className="text-[0.8rem] text-[#7d8590] bg-[#1c2230] border border-[#2a3348] px-[0.6rem] py-[0.15rem] rounded-full">
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Behavioral */}
          {activeNav === "behavioral" && (
            <section className="min-h-full">
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]">
                <h2 className="m-0 text-[1.1rem] font-bold text-[#e6edf3]">
                  Behavioral Questions
                </h2>
                <span className="text-[0.8rem] text-[#7d8590] bg-[#1c2230] border border-[#2a3348] px-[0.6rem] py-[0.15rem] rounded-full">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Preparation Plan */}
          {activeNav === "plan" && (
            <section className="min-h-full">
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]">
                <h2 className="m-0 text-[1.1rem] font-bold text-[#e6edf3]">
                  Preparation Plan
                </h2>
                <span className="text-[0.8rem] text-[#7d8590] bg-[#1c2230] border border-[#2a3348] px-[0.6rem] py-[0.15rem] rounded-full">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>

              {/* Timeline wrapper — vertical gradient line via pseudo on parent */}
              <div
                className="relative
                before:content-[''] before:absolute before:left-7 before:top-0 before:bottom-0
                before:w-0.5 before:rounded-sm
                before:bg-gradient-to-b before:from-[#ff2d78] before:to-[rgba(255,45,120,0.1)]"
              >
                {report.preparationPlan.map((day) => (
                  <PreparationDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "feedback" && <SectionFeedback report={report} />}
        </main>

        {/* Divider */}
        <div className="w-px bg-[#2a3348] flex-shrink-0" />

        {/* ── Right Sidebar ── */}
        <aside className="w-[260px] flex-shrink-0 flex flex-col gap-0 bg-[#0d1117] border-l border-[#1e2535] px-4 py-5">
          {/* Match Score */}
          <p className="text-[12px] font-semibold uppercase tracking-[.1em] text-[#4b5675] mb-3">
            Match Score
          </p>
          <div className="flex flex-col items-center gap-2.5 pb-2">
            {/* Arc ring */}
            <div className="relative w-[110px] h-[110px]">
              <svg viewBox="0 0 110 110" fill="none" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="scoreGrad"
                    x1="0"
                    y1="0"
                    x2="110"
                    y2="110"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <circle
                  cx="55"
                  cy="55"
                  r="44"
                  stroke="#1a2235"
                  strokeWidth="9"
                />
                <circle
                  cx="55"
                  cy="55"
                  r="44"
                  stroke="url(#scoreGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray="276.46"
                  strokeDashoffset={276.46 * (1 - report.matchScore / 100)}
                  transform="rotate(-90 55 55)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[26px] font-bold text-indigo-400 leading-none tracking-tight">
                  {report.matchScore}%
                </span>
                <span className="text-[12px] text-[#2e3857] font-medium mt-0.5">
                  /100
                </span>
              </div>
            </div>

            {/* Status pill */}
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md border ${statusPillClass(report.matchScore)}`}
            >
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 8l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {statusLabel(report.matchScore)}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#1a2235] my-4" />

          {/* Skill Gaps */}
          <p className="text-[12px] font-semibold uppercase tracking-[.1em] text-[#4b5675] mb-3.5">
            Skill Gaps
          </p>
          <div className="flex flex-col gap-2">
            {report.skillGaps.map((gap, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg bg-[#0f1623] border border-[#1a2235] hover:border-[#2a3555] transition-colors"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor(gap.severity)}`}
                />
                <span className="text-[12px] font-medium text-[#8fa3c8] flex-1">
                  {gap.skill}
                </span>
                {/* <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${badgeClass(gap.severity)}`}>
          {gap.severity}
        </span> */}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default InterviewReport;
