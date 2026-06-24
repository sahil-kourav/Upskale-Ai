import React from "react";
import { motion } from "motion/react";

const metrics = [
  { label: "Communication", value: 82, color: "bg-indigo-400" },
  { label: "Confidence", value: 75, color: "bg-purple-400" },
  { label: "Correctness", value: 88, color: "bg-emerald-400" },
];

const trend = [4, 5, 6, 6, 7, 8, 8.4];

const ReportsSection = () => {
  const max = 10;

  return (
    <section className=" py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-[#e4e1ed] tracking-[0.01em] leading-tight">
            Reports & Analytics
          </h2>
          <p className="mt-4 text-[#908fa0] text-sm sm:text-base leading-relaxed max-w-md">
            Track your growth across every interview session.
          </p>

          <div className="mt-8 space-y-5 max-w-sm">
            {metrics.map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-[#a0a0b8] mb-1.5">
                  <span>{m.label}</span>
                  <span className="text-[#c0c1ff] font-medium">{m.value}/100</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* right — score card + chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-[#0f0f1c]/80 border border-white/5 p-6 shadow-2xl shadow-indigo-900/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-[#7070a0]">Overall Score</p>
              <p className="text-3xl font-bold text-[#c0c1ff] mt-1">8.4/10</p>
            </div>
            <span className="text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1">
              Trending up
            </span>
          </div>

          <div className="flex items-end gap-2 h-28">
            {trend.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-indigo-500/30 to-indigo-400"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[10px] text-[#7070a0]">Q{i + 1}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReportsSection;