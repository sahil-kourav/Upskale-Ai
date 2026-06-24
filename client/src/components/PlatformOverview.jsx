import React from "react";
import { motion } from "motion/react";
import {
  FaFileAlt,
  FaMicrophoneAlt,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

const features = [
  {
    step: "01",
    icon: FaFileAlt,
    title: "Resume Intelligence",
    desc:
      "Upload your resume and discover ATS gaps, missing skills, and optimization opportunities.",

    gradient:
      "from-indigo-500 to-violet-500",
  },

  {
    step: "02",
    icon: FaMicrophoneAlt,
    title: "Interview Simulation",

    desc:
      "Practice realistic interviews and receive AI-powered evaluation instantly.",

    gradient:
      "from-purple-500 to-fuchsia-500",
  },

  {
    step: "03",
    icon: FaChartLine,
    title: "Progress Tracking",

    desc:
      "Track confidence, communication, and improvement across sessions.",

    gradient:
      "from-emerald-500 to-cyan-500",
  },

  {
    step: "04",
    icon: FaRobot,
    title: "Career Copilot",

    desc:
      "Receive personalized preparation paths and actionable guidance.",

    gradient:
      "from-amber-500 to-orange-500",
  },
];

const PlatformOverview = () => {
  return (
    <section
      id="overview"
      className="relative py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="max-w-3xl mx-auto text-center mb-16">


          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-white leading-tight">

            One Platform.
            <br />

            Multiple Ways To Improve.

          </h2>

          <p className="mt-5 text-zinc-400 text-lg">

            From resume analysis to interview preparation —
            everything works together to help candidates improve.

          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="group"
              >
                <div className="relative h-full rounded-[28px] overflow-hidden border border-white/[0.06] bg-[#0d111b]/90 p-7 hover:-translate-y-2 transition duration-500">

                  <div
                    className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${item.gradient}`}
                  />

                  <div className="flex items-center justify-between">

                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-xl`}
                    >
                      <Icon />
                    </div>

                    <span className="text-zinc-600 font-bold">

                      {item.step}

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
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PlatformOverview;
