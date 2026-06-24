import React from "react";
import { motion } from "motion/react";
import { FaFileAlt, FaMicrophoneAlt, FaChartLine, FaRobot } from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt size={20} />,
    title: "Resume Analysis",
    desc: "Upload resume and receive AI-powered insights.",
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: <FaMicrophoneAlt size={20} />,
    title: "Mock Interview",
    desc: "Practice realistic interviews with instant feedback.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: <FaChartLine size={20} />,
    title: "Performance Reports",
    desc: "Track communication, confidence, and improvement.",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: <FaRobot size={20} />,
    title: "AI Career Assistant",
    desc: "Get guidance and recommendations.",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
];

const PlatformOverview = () => {
  return (
    <section id="overview" className="bg-[#0a0a12] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#e4e1ed] tracking-[0.01em]">
            Everything you need, in one platform
          </h2>
          <p className="mt-3 text-[#908fa0] text-sm sm:text-base">
            Four tools that work together to take you from resume to offer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative bg-[#0f0f1c]/80 border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/20 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${f.color}`}
              >
                {f.icon}
              </div>

              <h3 className="text-base font-semibold text-white mb-2">
                {f.title}
              </h3>

              <p className="text-sm text-[#8080a0] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;