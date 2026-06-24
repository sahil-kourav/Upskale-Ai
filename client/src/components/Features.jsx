import React from "react";
import { motion } from "motion/react";

const features = [
  {
    category: "Resume",
    icon: "📄",
    title: "Resume Intelligence",
    desc: "Evaluate resume structure, missing keywords, strengths, and role alignment.",
    accent: "from-indigo-500 to-violet-500",
  },

  {
    category: "Matching",
    icon: "🎯",
    title: "Role Match Analysis",
    desc: "Measure profile fit and understand where improvements matter most.",
    accent: "from-purple-500 to-fuchsia-500",
  },

  {
    category: "Skills",
    icon: "📈",
    title: "Skill Gap Detection",
    desc: "Identify missing technical and communication skills before interviews.",
    accent: "from-cyan-500 to-blue-500",
  },

  {
    category: "Resume",
    icon: "🧾",
    title: "ATS Resume Optimization",
    desc: "Generate cleaner resume formats designed for better readability.",
    accent: "from-emerald-500 to-teal-500",
  },

  {
    category: "Interview",
    icon: "🎙️",
    title: "Interview Simulation",
    desc: "Practice realistic interview sessions and receive instant evaluation.",
    accent: "from-pink-500 to-rose-500",
  },

  {
    category: "Career",
    icon: "🧠",
    title: "Career Copilot",
    desc: "Receive preparation suggestions and structured improvement guidance.",
    accent: "from-amber-500 to-orange-500",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="uppercase tracking-[0.25em] text-indigo-400 text-xs">
            Capabilities
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-white">
            Built To Improve
            <br />
            Every Stage Of Preparation
          </h2>

          <p className="mt-5 text-zinc-400">
            Resume preparation, interview readiness, and structured improvement
            in one workflow.
          </p>
        </div>

        {/* Grid */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.06,
              }}
              className="group"
            >
              <div className="relative rounded-[30px] bg-[#0d111b]/90 border border-white/[0.06] p-7 hover:-translate-y-2 transition">
                <div
                  className={`absolute left-0 top-0 w-full h-[3px] rounded-full bg-gradient-to-r ${item.accent}`}
                />

                <div className="flex justify-between items-start">
                  <div className="text-4xl">{item.icon}</div>

                  <span className="text-xs text-zinc-500 uppercase">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
