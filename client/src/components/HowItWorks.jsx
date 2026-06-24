import React from "react";
import { motion } from "motion/react";

const steps = [
  {
    id: "01",
    icon: "📄",
    title: "Upload Your Profile",
    desc: "Add your resume, job description, and career goals to generate a personalized evaluation.",
  },

  {
    id: "02",
    icon: "🧠",
    title: "Receive AI Insights",
    desc: "Detect missing skills, improve resume quality, and generate interview preparation tasks.",
  },

  {
    id: "03",
    icon: "🚀",
    title: "Prepare & Apply",
    desc: "Get a readiness report, practice interviews, and follow a personalized roadmap.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-28 overflow-hidden"
    >
      {/* Background */}

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}

        <motion.div
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
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-indigo-400 uppercase tracking-[0.25em] text-xs">
            How It Works
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-white">
            From Resume
            <br />
            To Interview Ready
          </h2>

          <p className="mt-5 text-zinc-400 text-lg">
            A guided process designed to move candidates from preparation to
            confidence.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative mt-20">
          <div className="hidden lg:block absolute left-0 right-0 top-14 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

          <div className="grid lg:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.12,
                }}
              >
                <div className="group relative rounded-[30px] border border-white/[0.06] bg-[#0d111b]/90 p-8 text-center hover:-translate-y-2 transition">
                  <div className="absolute top-5 right-5 text-indigo-400 text-sm font-bold">
                    {step.id}
                  </div>

                  <div className="text-5xl">{step.icon}</div>

                  <h3 className="mt-8 text-2xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
