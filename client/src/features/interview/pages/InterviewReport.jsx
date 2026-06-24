import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import Loading from "../../../components/Loading.jsx";

// tabs shown in the sidebar nav
const tabs = [
  { id: "overview", label: "Overview" },
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "plan", label: "Preparation Plan" },
  { id: "feedback", label: "AI Feedback" },
];

// helper functions for the match score box
function getStatusText(score) {
  if (score >= 85) return "Strong Candidate";
  if (score >= 70) return "Good Fit";
  if (score >= 55) return "High Rejection Risk";
  return "Does Not Meet Requirements";
}

function getStatusColor(score) {
  if (score >= 85) return "text-blue-400 bg-blue-500/10 border border-blue-500/30";
  if (score >= 70) return "text-green-400 bg-green-500/10 border border-green-500/30";
  if (score >= 55) return "text-yellow-400 bg-yellow-500/10 border border-yellow-500/30";
  return "text-red-400 bg-red-500/10 border border-red-500/30";
}

function getGapColor(severity) {
  if (severity === "high") return "bg-red-500";
  if (severity === "medium" || severity === "med") return "bg-yellow-500";
  return "bg-green-500";
}

// small reusable box for technical / behavioral questions
function QuestionBox({ question, index }) {
  const [show, setShow] = useState(false);

  return (
    <div className="border border-gray-800 rounded-md mb-3 bg-gray-900">
      <div
        className="flex justify-between items-center p-3 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <p className="font-medium text-sm pr-2 text-gray-200">
          {index + 1}. {question.question}
        </p>
        <span className="text-gray-500 font-bold">{show ? "-" : "+"}</span>
      </div>

      {show && (
        <div className="p-3 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-2">
            <b className="text-gray-300">Why this is asked: </b>
            {question.intention}
          </p>
          <p className="text-sm bg-gray-950 p-2 rounded text-gray-300">
            <b className="text-gray-200">Suggested Answer: </b>
            {question.answer}
          </p>
        </div>
      )}
    </div>
  );
}

function InterviewReport() {
  const [tab, setTab] = useState("overview");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return <Loading />;
  }

  const candidate = report.candidate || {};
  const feedback = report.aiFeedback || {};

  return (
    <div className="min-h-screen bg-[#0a0e16] p-2 sm:p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
        {/* left nav */}
        <div className="w-full md:w-1/5 bg-gray-900 border border-gray-800 rounded-md p-3">
          <h2 className="font-bold text-lg mb-3 hidden md:block text-white">
            Upskale AI
          </h2>
          <div className="flex md:flex-col gap-2 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={
                  "text-left px-3 py-2 rounded text-sm whitespace-nowrap " +
                  (tab === t.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-950 text-gray-400 hover:bg-gray-800")
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* main content */}
        <div className="w-full md:w-3/5 bg-gray-900 border border-gray-800 rounded-md p-4">
          {tab === "overview" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://thumbs.dreamstime.com/b/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276214145.jpg"
                  alt="candidate avatar"
                  className="w-16 h-16 rounded-full border border-gray-700"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {candidate.name || "Not available"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {candidate.role || "No role specified"}
                  </p>
                </div>
              </div>

              <h3 className="font-semibold mb-1 text-gray-200">Summary</h3>
              <p className="text-sm text-gray-400 mb-4">
                {candidate.summary || "No summary available"}
              </p>

              <h3 className="font-semibold mb-1 text-gray-200">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {candidate.skills && candidate.skills.length > 0 ? (
                  candidate.skills.map((s) => (
                    <span
                      key={s}
                      className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No skills listed</p>
                )}
              </div>

              {candidate.experience && candidate.experience.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-gray-200">
                    Experience
                  </h3>
                  {candidate.experience.map((exp, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-blue-500 pl-3 mb-3"
                    >
                      <p className="font-medium text-sm text-gray-200">
                        {exp.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {exp.company} - {exp.period}
                      </p>
                      {exp.technologies && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {exp.technologies.map((t) => (
                            <span
                              key={t}
                              className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {candidate.projects && candidate.projects.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-gray-200">
                    Projects
                  </h3>
                  {candidate.projects.map((p, i) => (
                    <div
                      key={i}
                      className="bg-gray-950 border border-gray-800 p-3 rounded mb-2"
                    >
                      <p className="font-medium text-sm text-gray-200">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        {p.description}
                      </p>
                      {p.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {p.technologies.map((t) => (
                            <span
                              key={t}
                              className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {candidate.education && candidate.education.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-gray-200">
                    Education
                  </h3>
                  {candidate.education.map((e, i) => (
                    <div key={i} className="mb-2">
                      <p className="text-sm font-medium text-gray-200">
                        {e.degree}
                      </p>
                      <p className="text-xs text-gray-500">
                        {e.institute} ({e.year})
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {candidate.certifications &&
                candidate.certifications.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-200">
                      Certifications
                    </h3>
                    {candidate.certifications.map((c, i) => (
                      <p key={i} className="text-sm mb-1 text-gray-400">
                        ✅ {c.name} - {c.issuer}{" "}
                        {c.issuedAt ? "(" + c.issuedAt + ")" : ""}
                      </p>
                    ))}
                  </div>
                )}
            </div>
          )}

          {tab === "technical" && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-white">
                Technical Questions ({report.technicalQuestions.length})
              </h2>
              {report.technicalQuestions.map((q, i) => (
                <QuestionBox key={i} question={q} index={i} />
              ))}
            </div>
          )}

          {tab === "behavioral" && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-white">
                Behavioral Questions ({report.behavioralQuestions.length})
              </h2>
              {report.behavioralQuestions.map((q, i) => (
                <QuestionBox key={i} question={q} index={i} />
              ))}
            </div>
          )}

          {tab === "plan" && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-white">
                {report.preparationPlan.length} Day Preparation Plan
              </h2>
              {report.preparationPlan.map((day) => (
                <div
                  key={day.day}
                  className="border-l-2 border-blue-500 pl-4 mb-4 relative"
                >
                  <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-blue-500"></span>
                  <p className="text-xs font-bold text-blue-400 mb-1">
                    Day {day.day} - {day.focusArea}
                  </p>
                  <ul className="list-disc ml-4 text-sm text-gray-400">
                    {day.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {tab === "feedback" && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-white">
                AI Feedback
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Personalized recommendations based on your resume,
                self-description and job requirements.
              </p>

              <h3 className="font-semibold mb-2 text-gray-200">
                Project Improvements
              </h3>
              {feedback.projectImprovements &&
              feedback.projectImprovements.length > 0 ? (
                feedback.projectImprovements.map((item, i) => (
                  <p
                    key={i}
                    className="text-sm bg-gray-950 border border-gray-800 p-2 rounded mb-2 text-gray-300"
                  >
                    {i + 1}. {item}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500 mb-2">
                  No project suggestions available
                </p>
              )}

              <h3 className="font-semibold mb-2 mt-4 text-gray-200">
                Resume Improvements
              </h3>
              {feedback.resumeImprovements &&
              feedback.resumeImprovements.length > 0 ? (
                feedback.resumeImprovements.map((item, i) => (
                  <p
                    key={i}
                    className="text-sm bg-gray-950 border border-gray-800 p-2 rounded mb-2 text-gray-300"
                  >
                    {i + 1}. {item}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500 mb-2">
                  No resume improvements available
                </p>
              )}

              <h3 className="font-semibold mb-2 mt-4 text-gray-200">
                Final Advice
              </h3>
              <p className="text-sm border-l-2 border-blue-500 pl-3 text-gray-400">
                {feedback.finalAdvice || "No final advice available"}
              </p>
            </div>
          )}
        </div>

        {/* right sidebar - score and skill gaps */}
        <div className="w-full md:w-1/5 bg-gray-900 border border-gray-800 rounded-md p-3">
          <h3 className="font-semibold text-sm mb-2 text-gray-200">
            Match Score
          </h3>
          <div className="text-center mb-3">
            <p className="text-3xl font-bold text-blue-400">
              {report.matchScore}%
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: report.matchScore + "%" }}
              ></div>
            </div>
            <span
              className={
                "inline-block mt-2 text-xs px-2 py-1 rounded " +
                getStatusColor(report.matchScore)
              }
            >
              {getStatusText(report.matchScore)}
            </span>
          </div>

          <hr className="my-3 border-gray-800" />

          <h3 className="font-semibold text-sm mb-2 text-gray-200">
            Skill Gaps
          </h3>
          <div className="flex flex-col gap-2 mb-3">
            {report.skillGaps.map((gap, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                <span
                  className={
                    "w-2 h-2 rounded-full " + getGapColor(gap.severity)
                  }
                ></span>
                <span>{gap.skill}</span>
              </div>
            ))}
          </div>

          <hr className="my-3 border-gray-800" />

          <button
            onClick={() => getResumePdf(interviewId)}
            className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewReport;