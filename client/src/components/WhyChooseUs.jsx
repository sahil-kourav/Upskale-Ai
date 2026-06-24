import React from "react";
import { FaHeadset, FaBullseye, FaChartLine } from "react-icons/fa";

const reasons = [
  {
    icon: <FaHeadset size={20} />,
    title: "Real Interview Experience",
    desc: "Voice-driven sessions that feel like the real thing, not a quiz.",
  },
  {
    icon: <FaBullseye size={20} />,
    title: "Personalized Feedback",
    desc: "Feedback tied to your resume, role, and actual answers.",
  },
  {
    icon: <FaChartLine size={20} />,
    title: "Continuous Improvement",
    desc: "Every session builds on the last, so progress is visible.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#0a0a12] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#e4e1ed] tracking-[0.01em]">
            Why choose our platform
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-4 bg-[#0f0f1c]/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                {r.icon}
              </div>
              <h3 className="text-base font-semibold text-white">{r.title}</h3>
              <p className="text-sm text-[#8080a0] leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;