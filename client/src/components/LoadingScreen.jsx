import { useEffect, useState } from "react";
import { PencilSparkles } from 'lucide-react'

const MESSAGES = [
  "Analysing your resume...",
  "Matching against job requirements...",
  "Identifying skill gaps...",
  "Building your interview plan...",
  "Generating AI feedback...",
];

export function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 200);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#0d1117] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-5">
         <p className="inline-flex items-center group">
              {/* Logo */}
              <div className="flex items-center justify-center transition mr-2 group-hover:scale-105">
                <PencilSparkles className="w-6 h-6 text-indigo-300/50" />
              </div>

              <div>
                <p className="text-indigo-300/50 text-[21px]  font-semibold tracking-tight">
                  Upskale AI
                </p>
              </div>
            </p>
      </div>

      {/* Progress bar */}
      <div className="w-[260px] h-[3px] bg-[#1a2235] rounded-full overflow-hidden relative mb-[18px]">
        <div className="h-full bg-indigo-500 rounded-full animate-[bar-fill_2.8s_cubic-bezier(0.4,0,0.2,1)_forwards]" />
        <div className="absolute inset-0 animate-[shimmer_1.8s_ease-in-out_infinite]"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)" }} />
      </div>

      {/* Pulse dots */}
      <div className="flex gap-1.5 mb-5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[5px] h-[5px] rounded-full bg-indigo-400 animate-[pulse-dot_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.2}s`, opacity: 0.3 }}
          />
        ))}
      </div>

      {/* Cycling message */}
      <p
        className="text-[14px] text-[#4b5675] tracking-wide transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(4px)" }}
      >
        {MESSAGES[msgIndex]}
      </p>
    </div>
  );
}

export default LoadingScreen;