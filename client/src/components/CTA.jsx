import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaArrowRight, FaMicrophoneAlt } from "react-icons/fa";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Glow */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative max-w-6xl mx-auto px-6"
      >
        <div className="rounded-[36px] border border-white/[0.06] bg-[#0d111b]/90 backdrop-blur-xl overflow-hidden">
          <div className="p-12 lg:p-20 text-center">

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-white leading-[1.08]">
              Stop Preparing
              <br />
              Without Direction.
            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg leading-relaxed">
              Analyze your resume, practice interviews, and follow a
              personalized roadmap.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/create-report")}
                className="group px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-3 transition"
              >
                Generate My Report
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={() => navigate("/mock-interview")}
                className="px-8 py-4 rounded-2xl border border-white/10 text-white hover:bg-white/[0.03] flex items-center gap-3"
              >
                Start Mock Interview
                <FaMicrophoneAlt />
              </button>
            </div>

            <div className="mt-10 flex justify-center gap-10 flex-wrap">
              <div>
                <div className="text-white text-2xl font-bold">15 min</div>

                <div className="text-zinc-500 text-sm">Avg Analysis Time</div>
              </div>

              <div>
                <div className="text-white text-2xl font-bold">AI</div>

                <div className="text-zinc-500 text-sm">
                  Personalized Feedback
                </div>
              </div>

              <div>
                <div className="text-white text-2xl font-bold">Live</div>

                <div className="text-zinc-500 text-sm">Interview Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
