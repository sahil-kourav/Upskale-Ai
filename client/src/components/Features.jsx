const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "indigo",
    label: null,
    title: "Resume Analysis",
    desc: "Deep parse of your resume against role requirements. Surfaces hidden strengths and critical gaps instantly.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    color: "purple",
    label: null,
    title: "Job Match Score",
    desc: "Percentage score showing exactly how well your profile fits the role, powered by semantic similarity models.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    color: "blue",
    label: null,
    title: "Skill Gap Analysis",
    desc: "Identifies missing technologies or soft skills required by the job, with prioritized learning resources.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: "green",
    label: null,
    title: "ATS Resume Builder",
    desc: "Instant document formatting guaranteed to pass Workday, Greenhouse, and Lever automated screeners.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    color: "pink",
    label: null,
    title: "Live AI Mock Interview",
    desc: "Voice-based interview with real-time feedback, filler-word tracking, and a scored debrief report.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: "amber",
    label: "Pro",
    title: "AI Career Coach",
    desc: "On-demand coaching sessions covering negotiation, career pivots, and leadership positioning.",
  },
];

const colorMap = {
  indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

export default function Features() {
  return (
    <section className="w-full max-w-7xl mx-auto py-28 relative" id="features">
      <div className="relative px-6">
        <div className="mb-16">

          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-3">What We Offer</h2>
          <p className="text-[#9797b2] text-center">Tools built for serious software engineering candidates.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-[#0f0f1c]/80 border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:bg-[#12121f] hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Pro label */}
              {f.label && (
                <span className="absolute top-4 right-4 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md px-2 py-0.5 uppercase tracking-wide">
                  Pro
                </span>
              )}

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${colorMap[f.color]}`}>
                {f.icon}
              </div>

              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#7070a0] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
