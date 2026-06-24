import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { HiCheck, HiClock } from "react-icons/hi";
import { useMockInterview } from "../hooks/useMockInterview";

const MockInterviewHistory = () => {
  const navigate = useNavigate();
  const { history, historyLoading, handleFetchHistory } = useMockInterview();

  useEffect(() => {
    handleFetchHistory();
  }, []);

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-white">
            Interview History
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Your previous mock interview sessions
          </p>
        </div>

        {historyLoading ? (
          <div className="bg-gray-900 border border-gray-800 rounded-md p-10 text-center">
            <p className="text-gray-500 text-sm">
              Loading your interview history...
            </p>
          </div>
        ) : history.length === 0 ? (
          <div className=" text-center mt-40">
            <p className="text-gray-400 text-xl font-medium">
              No mock interviews found
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Start your first mock interview to see it here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map((item, index) => {
              const score = Math.round((item.finalScore || 0) * 10) / 10;
              const pct = Math.round((score / 10) * 100);
              const isDone = item.status === "Completed";

              return (
                <div
                  key={index}
                  onClick={() =>
                    navigate("/mock-interview-report/" + item._id)
                  }
                  className=" bg-[#111118] border border-[#1e2535] rounded-xl p-4 cursor-pointer hover:border-blue-500/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* left side */}
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium text-gray-100 truncate mb-1">
                        {item.role}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
                        <span>{item.experience}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                        <span>{item.mode}</span>
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {new Date(item.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>

                      <div className="h-1.5 bg-gray-800 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: pct + "%" }}
                        ></div>
                      </div>
                    </div>

                    {/* right side */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div
                        className={
                          "w-14 h-16 rounded-md border flex flex-col items-center justify-center " +
                          (isDone
                            ? "border-gray-700"
                            : "border-blue-500/40")
                        }
                      >
                        <span
                          className={
                            "text-xl font-bold leading-none " +
                            (isDone ? "text-gray-200" : "text-blue-400")
                          }
                        >
                          {score}
                        </span>
                        <span
                          className={
                            "text-xs mt-0.5 " +
                            (isDone ? "text-gray-500" : "text-blue-500")
                          }
                        >
                          /10
                        </span>
                      </div>

                      <span
                        className={
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border " +
                          (isDone
                            ? "border-gray-700 text-gray-300"
                            : "border-blue-500/30 text-blue-400")
                        }
                      >
                        {isDone ? <HiCheck /> : <HiClock />}
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterviewHistory;