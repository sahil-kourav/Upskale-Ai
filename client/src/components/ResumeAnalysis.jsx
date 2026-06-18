import { resumeAnalysisData } from '../content';

export default function ResumeAnalysis() {
  const { score, scoreLabel, badges, panelTitle, panelIcon, strengths, weakAreas } = resumeAnalysisData;

  return (
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-stretch py-16">
      {/* Score Panel */}
      <div
        className="lg:col-span-5 rounded-3xl p-10 flex flex-col items-center text-center justify-center"
        style={{ background: 'rgba(22,27,34,0.7)', backdropFilter: 'blur(12px)', border: '1px solid #1e2535' }}
      >
       
        <h3 className="text-2xl font-bold mb-8">Sample Analysis Result</h3>

        <div className="relative w-40 h-40 mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80" cy="80" r="72"
              fill="transparent"
              stroke="rgba(70,69,84,0.3)"
              strokeWidth="10"
            />
            <circle
              cx="80" cy="80" r="72"
              fill="transparent"
              stroke="#c0c1ff"
              strokeWidth="10"
              strokeDasharray="452.38"
              strokeDashoffset="36.19"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[32px] font-bold text-[#e4e1ed]">{score}</span>
            <span className="text-xs font-medium tracking-[0.05em] text-[#908fa0]">{scoreLabel}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {badges.map((b) => (
            <span key={b.label} className={`px-3 py-1 rounded-full text-xs font-medium ${b.style}`}>
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Feedback Panel */}
      <div className="lg:col-span-7">
        <div className="bg-[#292932] rounded-3xl p-10 border border-[#464554]/30 h-full">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined font-semibold text-[#c0c1ff]">{panelIcon}</span>
            <h4 className="font-bold text-md text-[#e4e1ed]">{panelTitle}</h4>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-xs font-medium tracking-[0.05em] text-[#c0c1ff] mb-2 font-bold uppercase">Strengths</div>
              <ul className="space-y-2 text-[#c7c4d7] text-sm">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#464554]/20">
              <div className="text-xs font-medium tracking-[0.05em] text-[#ffb4ab] mb-2 font-bold uppercase">Weak Areas</div>
              <ul className="space-y-2 text-[#c7c4d7] text-sm">
                {weakAreas.map((w, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#ffb4ab]">•</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}