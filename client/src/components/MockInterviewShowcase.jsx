import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  FaArrowRight,
  FaHistory,
  FaCheckCircle,
  FaMicrophone,
  FaWaveSquare,
} from "react-icons/fa";

const points = [
  "Questions personalized to resume and role",
  "Voice-based interview experience",
  "Instant answer evaluation",
  "Track confidence and communication",
  "Actionable improvement roadmap",
];

const insights = [
  {
    value: "82%",
    label: "Confidence",
  },

  {
    value: "8.6",
    label: "Communication",
  },

  {
    value: "91%",
    label: "Readiness",
  },
];

const MockInterviewShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <span className="uppercase tracking-[0.25em] text-indigo-400 text-xs">
            Interview Simulation
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-white leading-tight">
            Practice Interviews.
            <br />
            Improve Every Attempt.
          </h2>

          <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
            Experience AI-driven interviews with role-specific questions, answer
            evaluation, and detailed feedback.
          </p>

          <div className="mt-10 space-y-4">
            {points.map((item) => (
              <div key={item} className="flex gap-4 items-start">
                <FaCheckCircle className="text-indigo-400 mt-1" />

                <span className="text-zinc-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/mock-interview")}
              className="group bg-indigo-600 hover:bg-indigo-500 px-7 py-4 rounded-2xl text-white flex items-center gap-3"
            >
              Start Interview
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => navigate("/mock-interview-history")}
              className="px-7 py-4 rounded-2xl border border-white/10 text-white hover:bg-white/[0.03]"
            >
              View Sessions
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="rounded-[32px] bg-[#0d111b]/90 border border-white/[0.06] p-7">
            <div className="flex justify-between">
              <div>
                <div className="text-white">Frontend Developer Interview</div>

                <div className="text-zinc-500 text-sm">Question 03 / 10</div>
              </div>

              <div className="text-emerald-400 text-sm">● Live</div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/5 bg-[#111827] p-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <FaMicrophone className="text-indigo-300" size={26} />
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-white">
                  Explain a challenging backend problem you solved recently.
                </p>

                <div className="mt-6 flex justify-center">
                  <FaWaveSquare className="text-indigo-400" size={26} />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {insights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-[#121826] p-4 text-center"
                >
                  <div className="text-white font-bold text-xl">
                    {item.value}
                  </div>

                  <div className="text-zinc-500 text-xs mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MockInterviewShowcase;
