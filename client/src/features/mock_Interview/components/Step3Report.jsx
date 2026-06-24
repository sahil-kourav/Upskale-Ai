import React from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "motion/react";
import {
  ResponsiveContainer, XAxis, YAxis, Area, AreaChart,
  CartesianGrid, Tooltip,
} from "recharts";
import { useMockInterview } from "../hooks/useMockInterview";

const Step3Report = () => {
  const { report } = useMockInterview();
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d1f]">
        <p className="text-slate-500 text-lg">Loading report...</p>
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
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";
  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const percentage = (finalScore / 10) * 100;
  // SVG ring: circumference of r=46 ≈ 289
  const ringOffset = 289 - (289 * percentage) / 100;

  return (
    <div className="min-h-screen text-slate-200 px-4 sm:px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100">
            Interview Analysis Dashboard
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            AI-generated insights and feedback based on your mock interview performance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 text-center"
          >
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-5">
              Overall Performance
            </p>
            <div className="mx-auto w-28 h-28">
              <svg viewBox="0 0 110 110" className="w-full h-full">
                <circle
                  cx="55" cy="55" r="46"
                  fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9"
                />
                <circle
                  cx="55" cy="55" r="46"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="9"
                  strokeDasharray="289"
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 55 55)"
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <text x="55" y="52" textAnchor="middle" fontSize="18"
                  fontWeight="700" fill="#f0f4ff">
                  {Math.round(finalScore)}/10
                </text>
                <text x="55" y="66" textAnchor="middle" fontSize="10" fill="#64748b">
                  score
                </text>
              </svg>
            </div>
            <p className="mt-4 text-sm font-medium text-violet-400">{performanceText}</p>
            <p className="text-xs text-slate-500 mt-1">{shortTagline}</p>
          </motion.div>

          {/* Skill Bars */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7"
          >
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-7">
              Skill Evaluation
            </p>
            <div className="space-y-5">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">{s.label}</span>
                    <span className="font-semibold text-violet-400">{s.value}/10</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.08] rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.value * 10}%`,
                        background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-5">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sm:p-6"
          >
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-5">
              Performance Trend
            </p>
            <div className="h-64 [&_*]:outline-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1e1b3a",
                      border: "1px solid rgba(167,139,250,0.2)",
                      borderRadius: "10px",
                      color: "#e2e8f0",
                      fontSize: "12px",
                    }}
                    cursor={{ stroke: "rgba(167,139,250,0.3)", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#a78bfa"
                    strokeWidth={2.5}
                    fill="url(#scoreGrad)"
                    dot={{ fill: "#7c3aed", strokeWidth: 2, stroke: "#0d0d1f", r: 4 }}
                    activeDot={{ r: 6, fill: "#a78bfa" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Question Breakdown */}
       <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15 }}
  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 sm:p-4"
>
  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">
    Question Breakdown
  </p>

  {/* 👇 Yahan max-h aur overflow-y-auto lagaya */}
  <div className="space-y-4 max-h-[540px] overflow-y-auto pr-2
    scrollbar-thin scrollbar-thumb-violet-600/50 scrollbar-track-white/5
    hover:scrollbar-thumb-violet-500/70">

    {questionWiseScore.map((q, i) => (
      <div
        key={i}
        className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 sm:p-3"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
          <div>
            <p className="text-xs text-slate-600 mb-0.5">Question {i + 1}</p>
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              {q.question || "Question not available"}
            </p>
          </div>
          <span className="shrink-0 bg-violet-500/10 text-violet-400 border border-violet-500/25 px-3 py-1 rounded-full text-xs font-semibold w-fit">
            {q.score ?? 0}/10
          </span>
        </div>
        <div className="bg-violet-950/40 border border-violet-500/20 rounded-lg p-3.5">
          <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1.5">
            AI Feedback
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            {q.feedback?.trim() || "No feedback available for this question."}
          </p>
        </div>
      </div>
    ))}
  </div>
</motion.div>
        </div>
      </div>
    </div>
  );
};

export default Step3Report;