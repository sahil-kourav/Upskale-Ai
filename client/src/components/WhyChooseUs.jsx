import React from "react";
import { FaHeadset, FaBullseye, FaChartLine } from "react-icons/fa";

const highlights = [
  {
    icon: FaHeadset,
    title: "Practice Like A Real Interview",
    desc: "Experience structured sessions with realistic questions and voice interaction.",
    accent: "from-indigo-500 to-violet-500",
  },

  {
    icon: FaBullseye,
    title: "Feedback That Matches Your Goals",
    desc: "Insights generated from your resume, role requirements, and interview performance.",
    accent: "from-purple-500 to-fuchsia-500",
  },

  {
    icon: FaChartLine,
    title: "See Progress Over Time",
    desc: "Track readiness, confidence, and improvement across every attempt.",
    accent: "from-emerald-500 to-cyan-500",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-white">
            Why Candidates
            <br />
            Improve Faster
          </h2>

          <p className="mt-5 text-zinc-400">
            Built around preparation, feedback, and measurable progress.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="group">
                <div className="relative rounded-[30px] border border-white/[0.06] bg-[#0d111b]/90 p-8 hover:-translate-y-2 transition">
                  <div
                    className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${item.accent}`}
                  />

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white text-2xl`}
                  >
                    <Icon />
                  </div>

                  <h3 className="mt-8 text-2xl text-white font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
