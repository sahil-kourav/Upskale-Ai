import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  FaArrowRight,
  FaHistory,
  FaCheckCircle,
  FaMicrophone,
} from "react-icons/fa";

const points = [
  "Interview questions built for your profile",
  "Voice interview practice",
  "Detailed feedback after every answer",
  "Track strengths and weak areas",
  "Clear improvement roadmap"
];

const stats = [
  { label: "Questions Generated", value: "12K+" },
  { label: "Interview Score", value: "8.4/10" },
  { label: "Completion Rate", value: "94%" },
];

const MockInterviewShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0a0a12] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl text-[#e4e1ed] font-sans font-black tracking-[0.01em] leading-tight">
            AI-Powered Mock Interviews 
          </h2>
          <p className="mt-4 text-[#908fa0] text-sm sm:text-base leading-relaxed max-w-xl">
            Experience a realistic interview environment with AI-driven questions
            and instant feedback.
          </p>
        

          <ul className="mt-6 space-y-3">
            {points.map((p, i) => (
              <li key={i} className="flex items-center gap-3 text-sm sm:text-base text-[#a0a0b8]">
                <FaCheckCircle className="text-indigo-400 shrink-0" size={15} />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/mock-interview")}
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-900/30 transition"
            >
              Start Interview
              <FaArrowRight size={13} />
            </button>

            <button
              onClick={() => navigate("/mock-interview-history")}
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-[#e4e1ed] font-medium px-6 py-3 rounded-xl transition"
            >
              View History
              <FaHistory size={13} />
            </button>
          </div>
        </motion.div>

        {/* right — preview card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-2xl bg-[#0f0f1c]/80 border border-white/5 p-5 sm:p-6 shadow-2xl shadow-indigo-900/20">
            <div className="relative aspect-video rounded-xl bg-[#12121f] border border-white/5 flex items-center justify-center overflow-hidden">
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white text-xs font-medium">AI Interviewer</span>
              </div>

              <div className="w-16 h-16 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                <FaMicrophone size={22} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-white text-xs text-center">
                  "Tell me about a challenging project you led."
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="text-center bg-[#12121f] border border-white/5 rounded-xl py-3"
                >
                  <p className="text-base sm:text-lg font-bold text-[#c0c1ff]">
                    {s.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#7070a0] mt-1 leading-tight">
                    {s.label}
                  </p>
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