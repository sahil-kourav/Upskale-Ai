import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useMockInterview } from "../hooks/useMockInterview";

// returns a short message based on the final score
function getPerformanceText(score) {
  if (score >= 8) {
    return {
      text: "Ready for job opportunities.",
      tagline: "Excellent clarity and structured responses.",
    };
  } else if (score >= 5) {
    return {
      text: "Needs minor improvement before interviews.",
      tagline: "Good foundation, refine articulation.",
    };
  } else {
    return {
      text: "Significant improvement required.",
      tagline: "Work on clarity and confidence.",
    };
  }
}

const Step3Report = () => {
  const { report } = useMockInterview();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e16]">
        <p className="text-gray-500 text-lg">Loading report...</p>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: "Q" + (index + 1),
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  const performance = getPerformanceText(finalScore);

  return (
    <div className="min-h-screen bg-[#0a0e16] text-gray-300 px-4 sm:px-6 lg:px-10 py-8">
      {/* header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
          Interview Analysis Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          AI-generated insights and feedback based on your mock interview
          performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* left column */}
        <div className="flex flex-col gap-5">
          {/* overall score */}
          <div className="bg-gray-900 border border-gray-800 rounded-md p-5 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
              Overall Performance
            </p>
            <p className="text-4xl font-bold text-blue-400">
              {Math.round(finalScore)}
              <span className="text-lg text-gray-500">/10</span>
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: (finalScore / 10) * 100 + "%" }}
              ></div>
            </div>
            <p className="mt-4 text-sm font-medium text-blue-400">
              {performance.text}
            </p>
            <p className="text-xs text-gray-500 mt-1">{performance.tagline}</p>
          </div>

          {/* skill bars */}
          <div className="bg-gray-900 border border-gray-800 rounded-md p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
              Skill Evaluation
            </p>
            <div className="flex flex-col gap-4">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{s.label}</span>
                    <span className="font-semibold text-blue-400">
                      {s.value}/10
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: s.value * 10 + "%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-5">
          {/* trend chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-md p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
              Performance Trend
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#1f2937" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111827",
                      border: "1px solid #1f2937",
                      borderRadius: "8px",
                      color: "#e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="#3b82f6"
                    fillOpacity={0.15}
                    dot={{ fill: "#3b82f6", r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* question breakdown */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-md p-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Question Breakdown
            </p>

            <div className="flex flex-col gap-3 max-h-[540px] overflow-y-auto pr-1">
              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className="bg-gray-900/80 border border-gray-800 rounded-md p-3"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">
                        Question {i + 1}
                      </p>
                      <p className="text-sm font-medium text-gray-200">
                        {q.question || "Question not available"}
                      </p>
                    </div>
                    <span className="shrink-0 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold w-fit">
                      {q.score ?? 0}/10
                    </span>
                  </div>
                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-md p-3">
                    <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1">
                      AI Feedback
                    </p>
                    <p className="text-sm text-gray-400">
                      {q.feedback?.trim() ||
                        "No feedback available for this question."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Report;