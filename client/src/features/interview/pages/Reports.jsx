import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import Loading from "../../../components/Loading.jsx";


function ScoreArc({ score = 0 }) {
  const size = 72;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, score));
  const offset = c - (pct / 100) * c;

  const tone =
    pct >= 85 ? "#4ade80" : pct >= 70 ? "#fbbf24" : "#f87171";
  const label = pct >= 85 ? "Strong" : pct >= 70 ? "Borderline" : "At risk";

  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#1c2333"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={tone}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 600ms ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono text-base font-semibold leading-none"
            style={{ color: tone }}
          >
            {pct}
          </span>
          <span className="font-mono text-[9px] text-[#5b677a] leading-none mt-0.5">
            %
          </span>
        </div>
      </div>
      <span
        className="font-mono text-[10px] uppercase tracking-wide leading-none"
        style={{ color: tone }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { loading, reports = [] } = useInterview();


    if (reports.length === 0) {
    return (
      <section className=" bg-[#0d1117] text-gray-400 px-6">
        <div className="min-h-[90vh] flex items-center justify-center flex-col">
          <h2 className="text-2xl font-semibold ">You haven't generated any reports yet.</h2>

          <p className="mt-3 text-sm text-[#5b677a]">
            Generate your first AI interview report to get started.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0e14] text-[#e6edf3] py-12">
      <div className="max-w-6xl px-6 mx-auto">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-[#1c2333]">
          <div>
            <p className="font-mono text-xs tracking-widest text-[#5b677a] uppercase mb-2">
              Session log
            </p>
            <h1 className="text-3xl font-bold tracking-tight">My Reports</h1>
          </div>
          <p className="font-mono text-xs text-[#5b677a] hidden sm:block">
            {reports.length} {reports.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        {/* LEDGER */}
        <div className="flex flex-col gap-3">
          {reports.map((report, i) => (
            <div
              key={report._id}
              onClick={() => navigate(`/interview/${report._id}`)}
              className="
                group cursor-pointer
                rounded-xl border border-[#1c2333] bg-[#0f1420]
                px-5 py-5
                flex flex-col sm:flex-row sm:items-center gap-5
                transition-colors duration-200
                hover:border-[#39456b]
              "
            >
              {/* INDEX */}
              <span className="hidden md:block font-mono text-xs text-[#3a4458] w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* SCORE */}
              <ScoreArc score={report.matchScore || 0} />

              {/* MAIN CONTENT */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold group-hover:text-[#a3b8ff] transition-colors truncate">
                    {report.title}
                  </h3>
                  <time className="font-mono text-[11px] text-[#5b677a] shrink-0 pt-0.5">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </time>
                </div>

                <p className="mt-1.5 text-sm text-[#8b97a8] line-clamp-2">
                  {report.aiFeedback?.finalAdvice ||
                    "AI analysis generated successfully"}
                </p>

                {!!report.skills?.length && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {report.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#161c2c] text-[#7c9cf5] border border-[#232b42]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="hidden sm:flex items-center shrink-0 font-mono text-xs text-[#5b677a] group-hover:text-[#a3b8ff] transition-colors">
                View
                <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}