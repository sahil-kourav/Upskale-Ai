import { heroData } from "../content";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function Hero() {
  const {
    badges,
    headline,
    headlineAccent,
    body,
    ctaPrimary,
    ctaSecondary,
    dashboardStats,
  } = heroData;

  return (
    <section className="max-w-7xl mx-auto px-6 py-26 grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((b) => (
            <Badge
              key={b}
              className="border border-[#c0c1ff]/30 text-[#c0c1ff]"
            >
              {b}
            </Badge>
          ))}
        </div>

        <div className="space-y-7 max-w-xl">
          <h1 className="max-w-[650px] text-[48px] lg:text-[56px] font-serif leading-[1.15] tracking-[0.02em] text-[#b6bfca]">
            {headline}
            <br />

            <span className="inline-block mt-1 bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
              {headlineAccent}
            </span>
          </h1>
        </div>

        <p className="text-[18px] font-thin text-[#a0a0b8] leading-[1.6] tracking-[0.02em] max-w-xl">{body}</p>

          <div className="flex items-center gap-4 flex-wrap">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 flex items-center gap-2">
                  Get Started Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                See Demo
              </button>
            </div>
      </div>

      {/* Right Column - Dashboard Preview */}
      <div className="relative">
        <div
          className="rounded-2xl p-4 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          style={{
            background: "rgba(22,27,34,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid #1e2535",
          }}
        >
          {/* Window Bar */}
          <div className="flex items-center justify-between border-b border-[#464554]/30 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-xs font-medium tracking-[0.05em] text-[#908fa0]">
              {dashboardStats.version}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Match Score */}
            <div className="bg-[#1f1f27] rounded-lg p-6 text-center border border-[#464554]/20">
              <span className="text-xs font-medium tracking-[0.05em] text-[#908fa0] block mb-2">
                MATCH SCORE
              </span>
              <div className="text-[32px] font-semibold text-[#c0c1ff]">
                {dashboardStats.matchScore}
              </div>
              <div className="text-[12px] text-[#ffb783] mt-1 flex items-center justify-center">
                <span className="material-symbols-outlined text-[13px] mr-1">
                   Excellent Fit
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#1f1f27] rounded-lg p-6 border border-[#464554]/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#908fa0]">
                  Preparation Status
                </span>
                <span className="text-sm text-[#e4e1ed]">
                  {dashboardStats.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#908fa0]">Keywords</span>
                <span className="text-xs text-[#e4e1ed]">
                  {dashboardStats.keywords}
                </span>
              </div>
              <div className="w-full bg-[#464554]/30 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#c0c1ff] h-full"
                  style={{ width: dashboardStats.keywordsProgress }}
                ></div>
              </div>
            </div>

            {/* Code Block */}
            <div className="col-span-2 bg-[#1b1b23] rounded-lg p-6 border border-[#464554]/20 font-mono text-[13px] leading-[1.6]">
              <div className="text-[#c0c1ff] mb-1">
                Analyzing experience blocks...
              </div>
              <div className="text-[#c7c4d7] opacity-70">
                &gt; Found: React, Node.js, AWS
              </div>
              <div className="text-[#c7c4d7] opacity-70">
                &gt; Checking Job Description mismatch...
              </div>
              <div className="text-[#ffb783] mt-2">
                ! Recommendation: Add Kubernetes experience.
              </div>
            </div>
          </div>
        </div>

        {/* Floating Card */}
        <div
          className="absolute -bottom-8 -left-8 rounded-xl p-4 w-64 border-l-4 border-l-[#c0c1ff] animate-bounce shadow-xl"
          style={{
            background: "rgba(22,27,34,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid #1e2535",
            borderLeft: "4px solid #c0c1ff",
          }}
        >
          <span className="text-xs font-medium tracking-[0.05em] text-[#908fa0] block">
            Next What
          </span>
          <span className="font-bold text-[#e4e1ed]">
            {dashboardStats.nextTask}
          </span>
        </div>
      </div>
    </section>
  );
}
