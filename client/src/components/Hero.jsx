import React from "react";
import { useNavigate } from "react-router";
import { FaArrowRight, FaBolt, FaCheckCircle } from "react-icons/fa";

const HERO_DATA = {
  badge: "Upskale AI • Career Accelerator",

  title: "Turn Applications Into Interview Calls.",

  description:
    "Upload your resume, simulate interviews, discover weak areas, and improve with AI-generated guidance.",

  trust: ["ATS Optimization", "AI Interview Engine", "Progress Analytics"],

  metrics: [
    { label: "Resume Strength", value: 91 },
    { label: "Interview Confidence", value: 84 },
    { label: "Hiring Readiness", value: 88 },
  ],
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* left side */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
            <FaBolt size={11} />
            {HERO_DATA.badge}
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Turn Applications
            <span className="block text-gray-300">Into Interview Calls</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl">
            {HERO_DATA.description}
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/create-report")}
              className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              Start AI Analysis
              <FaArrowRight />
            </button>

            <a
              href="#overview"
              className="px-6 py-3 rounded-md border border-gray-800 hover:bg-gray-900 text-white"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-5">
            {HERO_DATA.trust.map((item) => (
              <div key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                <FaCheckCircle className="text-blue-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* right side - stats card */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-md p-6 sm:p-8">
          <p className="text-gray-300 mb-6">Career Readiness Snapshot</p>

          <div className="flex flex-col gap-6">
            {HERO_DATA.metrics.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className="text-white text-sm">{item.value}%</span>
                </div>

                <div className="h-2 rounded-full bg-gray-800">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: item.value + "%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-800 pt-5 text-sm text-gray-400">
            <span className="text-green-400">●</span> AI detected 3
            improvement areas and generated a preparation roadmap.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;