// import { heroData } from "../content";
// import Badge from "../ui/Badge";
// import Button from "../ui/Button";

// export default function Hero() {
//   const {
//     badges,
//     headline,
//     headlineAccent,
//     body,
//     ctaPrimary,
//     ctaSecondary,
//     dashboardStats,
//   } = heroData;

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-26 grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
//       {/* Left Column */}
//       <div className="space-y-6">
//         <div className="flex flex-wrap gap-2 mb-4">
//           {badges.map((b) => (
//             <Badge
//               key={b}
//               className="border border-[#c0c1ff]/30 text-[#c0c1ff]"
//             >
//               {b}
//             </Badge>
//           ))}
//         </div>

//         <div className="space-y-7 max-w-xl">
//           <h1 className="max-w-[650px] text-[48px] lg:text-[56px] font-serif leading-[1.15] tracking-[0.02em] text-[#b6bfca]">
//             {headline}
//             <br />

//             <span className="inline-block mt-1 bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
//               {headlineAccent}
//             </span>
//           </h1>
//         </div>

//         <p className="text-[18px] font-thin text-[#a0a0b8] leading-[1.6] tracking-[0.02em] max-w-xl">{body}</p>

//           <div className="flex items-center gap-4 flex-wrap">
//                 <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 flex items-center gap-2">
//                   Get Started Free
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </button>
//               <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2">
//                 <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 See Demo
//               </button>
//             </div>
//       </div>

//       {/* Right Column - Dashboard Preview */}
//       <div className="relative">
//         <div
//           className="rounded-2xl p-4 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
//           style={{
//             background: "rgba(22,27,34,0.7)",
//             backdropFilter: "blur(12px)",
//             border: "1px solid #1e2535",
//           }}
//         >
//           {/* Window Bar */}
//           <div className="flex items-center justify-between border-b border-[#464554]/30 pb-4 mb-4">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
//               <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
//               <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
//             </div>
//             <span className="text-xs font-medium tracking-[0.05em] text-[#908fa0]">
//               {dashboardStats.version}
//             </span>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {/* Match Score */}
//             <div className="bg-[#1f1f27] rounded-lg p-6 text-center border border-[#464554]/20">
//               <span className="text-xs font-medium tracking-[0.05em] text-[#908fa0] block mb-2">
//                 MATCH SCORE
//               </span>
//               <div className="text-[32px] font-semibold text-[#c0c1ff]">
//                 {dashboardStats.matchScore}
//               </div>
//               <div className="text-[12px] text-[#ffb783] mt-1 flex items-center justify-center">
//                 <span className="material-symbols-outlined text-[13px] mr-1">
//                    Excellent Fit
//                 </span>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="bg-[#1f1f27] rounded-lg p-6 border border-[#464554]/20 space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-[#908fa0]">
//                   Preparation Status
//                 </span>
//                 <span className="text-sm text-[#e4e1ed]">
//                   {dashboardStats.status}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-xs text-[#908fa0]">Keywords</span>
//                 <span className="text-xs text-[#e4e1ed]">
//                   {dashboardStats.keywords}
//                 </span>
//               </div>
//               <div className="w-full bg-[#464554]/30 h-1.5 rounded-full overflow-hidden">
//                 <div
//                   className="bg-[#c0c1ff] h-full"
//                   style={{ width: dashboardStats.keywordsProgress }}
//                 ></div>
//               </div>
//             </div>

//             {/* Code Block */}
//             <div className="col-span-2 bg-[#1b1b23] rounded-lg p-6 border border-[#464554]/20 font-mono text-[13px] leading-[1.6]">
//               <div className="text-[#c0c1ff] mb-1">
//                 Analyzing experience blocks...
//               </div>
//               <div className="text-[#c7c4d7] opacity-70">
//                 &gt; Found: React, Node.js, AWS
//               </div>
//               <div className="text-[#c7c4d7] opacity-70">
//                 &gt; Checking Job Description mismatch...
//               </div>
//               <div className="text-[#ffb783] mt-2">
//                 ! Recommendation: Add Kubernetes experience.
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Card */}
//         <div
//           className="absolute -bottom-8 -left-8 rounded-xl p-4 w-64 border-l-4 border-l-[#c0c1ff] animate-bounce shadow-xl"
//           style={{
//             background: "rgba(22,27,34,0.7)",
//             backdropFilter: "blur(12px)",
//             border: "1px solid #1e2535",
//             borderLeft: "4px solid #c0c1ff",
//           }}
//         >
//           <span className="text-xs font-medium tracking-[0.05em] text-[#908fa0] block">
//             Next What
//           </span>
//           <span className="font-bold text-[#e4e1ed]">
//             {dashboardStats.nextTask}
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }











import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaArrowRight, FaBolt } from "react-icons/fa";

const trustIndicators = ["AI Powered", "Personalized Experience", "Career Focused"];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#0a0a12] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.05em] uppercase text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
            <FaBolt size={10} />
            AI Career Platform
          </span>

          <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.15] tracking-[0.01em] text-[#e4e1ed]">
            Prepare Smarter. Interview Better. Get Hired Faster.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#908fa0] leading-relaxed max-w-lg">
            An AI-powered career preparation platform that helps users improve
            resumes, practice mock interviews, analyze performance, and become
            job ready.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/create-report")}
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-900/30 transition"
            >
               Resume Analysis
              <FaArrowRight size={13} />
             </button>

            <a
              href="#overview"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-[#e4e1ed] font-medium px-6 py-3 rounded-xl transition"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2">
            {trustIndicators.map((t, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-[#7070a0]">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* right — dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-2xl bg-[#0f0f1c]/80 border border-white/5 backdrop-blur-sm shadow-2xl shadow-indigo-900/20 p-5 sm:p-6">
            <div className="flex items-center gap-1.5 mb-5">
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-3 text-xs text-[#908fa0]">Readiness Dashboard</span>
            </div>

            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 rounded-full grid place-items-center bg-[#12121f] border border-indigo-500/20 shrink-0">
                <span className="text-2xl font-bold text-[#c0c1ff]">87%</span>
                <span className="absolute -bottom-2 text-[10px] text-[#908fa0] bg-[#0a0a12] px-2 rounded-full border border-white/10">
                  Ready
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-[#908fa0] mb-1">
                    <span>Resume Match</span>
                    <span className="text-[#c0c1ff]">92%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[92%] bg-indigo-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#908fa0] mb-1">
                    <span>Interview Readiness</span>
                    <span className="text-[#c0c1ff]">81%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[81%] bg-purple-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 text-xs text-[#7070a0] leading-relaxed">
              <span className="text-emerald-400">●</span> Analysis complete — 2 skill
              gaps found, 1 mock interview suggested.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;