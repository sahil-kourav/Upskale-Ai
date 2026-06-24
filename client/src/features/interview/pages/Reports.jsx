import React from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import Loading from "../../../components/Loading.jsx";

// small score box shown on the left of each report card
function ScoreBox({ score }) {
  const value = score || 0;

  let color = "bg-red-500/10 text-red-400 border-red-500/20";
  let label = "Needs Work";

  if (value >= 85) {
    color = "bg-green-500/10 text-green-400 border-green-500/20";
    label = "Excellent";
  } else if (value >= 70) {
    color = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    label = "Good";
  }

  return (
    <div
      className={
        "w-20 h-20 rounded-xl border flex flex-col items-center justify-center " +
        color
      }
    >
      <p className="text-xl font-bold">{value}</p>
      <p className="text-[11px]">{label}</p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { loading, reports = [] } = useInterview();

  if (loading) {
    return <Loading />;
  }

  // no reports yet
  if (reports.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-400">No reports yet</h2>
        <p className="mt-3 text-gray-500 text-sm">
          Generate your first interview report to start tracking your
          progress.
        </p>
        <button
          onClick={() => navigate("/create-report")}
          className="mt-8 border-b cursor-pointer hover:border-blue-500 hover:text-blue-400 border-white text-gray-300 px-6 py-3 rounded-md"
        >
          Generate Report
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <h1 className="text-3xl sm:text-3xl font-semibold mt-1">
          My Interview Reports
        </h1>
        <p className="text-gray-500 mt-1">
          Track your interview performance and get AI-generated feedback
        </p>

        {/* report list */}
        <div className="mt-10 flex flex-col gap-4">
          {reports.map((report) => (
            <div
              key={report._id}
              onClick={() => navigate("/interview/" + report._id)}
              className="bg-gray-900/30 border border-gray-800 rounded-md p-4 sm:p-5 cursor-pointer hover:border-blue-500/40"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <ScoreBox score={report.matchScore} />

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <h3 className="text-lg font-semibold">{report.title}</h3>
                   
                  </div>

                  <p className="text-sm text-gray-400 mt-2">
                    {report.aiFeedback?.finalAdvice ||
                      "Interview report generated"}
                  </p>

                  {report.skills && report.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {report.skills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center flex-col sm:items-center gap-4 mt-3 sm:mt-0">
                   <span className="text-sm text-gray-400">
                      {new Date(report.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  <button className="border border-gray-700 px-4 py-2 mt-2 rounded-md text-sm hover:bg-gray-800 whitespace-nowrap">
                    Open Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}