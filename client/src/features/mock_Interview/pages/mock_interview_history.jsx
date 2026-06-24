import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { HiCheck, HiClock } from "react-icons/hi";
import { useMockInterview } from "../hooks/useMockInterview";

const MockInterviewHistory = () => {
  const navigate = useNavigate();
  const { history, historyLoading, handleFetchHistory } = useMockInterview();

  useEffect(() => {
    handleFetchHistory();
  }, []);

  const completed = history.filter((i) => i.status === "Completed");
  const avgScore =
    completed.length > 0
      ? (
          completed.reduce((sum, i) => sum + (i.finalScore || 0), 0) /
          completed.length
        ).toFixed(1)
      : "—";

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "#0f1117" }}>
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-10">
        
          <div>
            <h1 className="text-xl font-semibold text-gray-100">
              Interview history
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Your previous mock interview sessions
            </p>
          </div>
        </div>

        {historyLoading ? (
          <div
            className="p-10 rounded-2xl border border-[#1e2336] text-center"
            style={{ background: "#161b27" }}
          >
            <p className="text-gray-500 text-sm">
              Loading your interview history...
            </p>
          </div>
        ) : history.length === 0 ? (
          <div
            className="p-12 rounded-2xl border border-[#1e2336] text-center"
            style={{ background: "#161b27" }}
          >
            <p className="text-gray-400 font-medium">No interviews yet</p>
            <p className="text-sm text-gray-600 mt-1">
              Start your first mock interview to see it here.
            </p>
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="flex flex-col gap-2.5">
              {history.map((item, index) => {
                const score = Math.round((item.finalScore || 0) * 10) / 10;
                const pct = Math.round((score / 10) * 100);
                const isDone = item.status === "Completed";

                return (
                  <div
                    key={index}
                    onClick={() =>
                      navigate(`/mock-interview-report/${item._id}`)
                    }
                    className="rounded-2xl border border-[#1e2336] p-5 cursor-pointer hover:border-[#2e3550] hover:bg-[#1a2035] transition-all duration-200"
                    style={{ background: "#161b27" }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Left */}
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium text-gray-100 truncate mb-1">
                          {item.role}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5 truncate">
                          <span>{item.experience}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-700 inline-block" />
                          <span>{item.mode}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                        {/* Score bar */}
                        <div className="mt-3">
                          <div
                            className="h-[3px] rounded-full overflow-hidden"
                            style={{ background: "#1e2336" }}
                          >
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Score circle */}
                        <div
                          className={`relative w-14 h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 shadow-md
      ${isDone ? "border-gray-500/40 " : "border-orange-500/40 "}`}
                        >
                          <span
                            className={`text-xl font-bold leading-none ${
                              isDone ? "text-gray-300" : "text-orange-300"
                            }`}
                          >
                            {score}
                          </span>

                          <span
                            className={`text-[12px] font-medium mt-0.5 ${
                              isDone ? "text-gray-400" : "text-orange-500"
                            }`}
                          >
                            /10
                          </span>
                        </div>

                        {/* Status badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-300
      ${isDone ? "border-gray-500/30" : "border-orange-500/30"}`}
                        >
                          {isDone ? (
                            <HiCheck className="text-xs" />
                          ) : (
                            <HiClock className="text-xs" />
                          )}

                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MockInterviewHistory;
