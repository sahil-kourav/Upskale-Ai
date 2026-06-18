const steps = [
  {
    num: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Upload Resume + Job Description + Self Description",
    desc: "Drop your resume and paste the job description. Our parser extracts every signal — skills, experience, achievements, and intent.",
  },
  {
    num: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.712-1.523 2.71l-1.741-.001" />
      </svg>
    ),
    title: "AI Deep Analysis",
    desc: "Our models score alignment, surface critical skill gaps, predict interview questions, and benchmark you against successful hires for this role.",
  },
  {
    num: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Get Your Personalized Plan",
    desc: "Receive a tailored study roadmap, an ATS-optimized resume, curated practice questions, and a live mock interview — ready to submit today.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-7xl mx-auto py-28 relative" id="how-it-works">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-64 bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">A Precise Path to Success</h2>
          <p className="text-[#8080a0] text-lg">From application to offer in three AI-led steps.</p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="group relative flex flex-col items-center text-center">
                {/* Icon circle */}
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#12121f] border border-white/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:border-indigo-500/50 group-hover:shadow-xl group-hover:shadow-indigo-500/10 transition-all duration-300">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold text-indigo-400 bg-[#0a0a12] border border-indigo-500/30 rounded-md px-1.5 py-0.5">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-[#8080a0] leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
