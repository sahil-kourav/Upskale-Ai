import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import LoadingScreen from "../../../components/LoadingScreen.jsx";
import { CloudUpload, X } from 'lucide-react'
import { notify } from "../../../utils/toast";

const STEPS = [
  { title: "Paste job description", sub: "Tell the AI what role you're applying for." },
  { title: "Upload your resume",    sub: "AI will extract your skills automatically." },
  { title: "About yourself",        sub: "Helps personalize your interview questions." },
];

export default function CreateReport() {
  const { generateReport } = useInterview();
  const navigate = useNavigate();

  const [step, setStep]               = useState(0);
  const [jobDescription, setJd]       = useState("");
  const [selfDescription, setSd]      = useState("");
  const [resumeFile, setResumeFile]   = useState(null);
  const [isDragging, setIsDragging]   = useState(false);
  const [isGenerating, setGenerating] = useState(false);

  const fileRef = useRef();

const handleFile = (file) => {
  if (!file) return;

  if (file.type !== "application/pdf") {
    notify.error(
      notify.loading(),
      "Only PDF files are allowed"
    );
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    notify.error(
      notify.loading(),
      "Resume must be under 5 MB"
    );
    return;
  }

  setResumeFile(file);

};

  // const handleGenerate = async () => {
  //   if (!jobDescription || !selfDescription || !resumeFile) {
  //     alert("Please fill all fields");
  //     return;
  //   }
  //   try {
  //     setGenerating(true);
  //     const data = await generateReport({ jobDescription, selfDescription, resumeFile });
  //     navigate(`/interview/${data._id}`);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setGenerating(false);
  //   }
  // };


const handleGenerate = async () => {

  if (!jobDescription.trim()) {
    notify.error(
      notify.loading(),
      "Please enter job description"
    );
    return;
  }

  if (!resumeFile) {
    notify.error(
      notify.loading(),
      "Please upload resume"
    );
    return;
  }

  if (!selfDescription.trim()) {
    notify.error(
      notify.loading(),
      "Tell us about yourself"
    );
    return;
  }

  const toastId =
    notify.loading(
      "Generating interview report..."
    );
  try {

    setGenerating(true);

    const data =
      await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

    notify.success(
      toastId,
      "AI report ready! (-50 Credits)"
    );
    navigate(
      `/interview/${data._id}`
    );
  } catch (err) {
    notify.error(
      toastId,
      err?.response?.data?.error ||
      "Failed to generate report"
    );

  } finally {
    setGenerating(false);
  }
};


  const fileSizeLabel = resumeFile
    ? resumeFile.size > 1048576
      ? `${(resumeFile.size / 1048576).toFixed(1)} MB`
      : `${Math.round(resumeFile.size / 1024)} KB`
    : "";

  if (isGenerating) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e6edf3] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[560px]">

        {/* Step heading */}
        <div className="mb-8">
          <p className="text-[11px] text-[#484f58] uppercase tracking-widest mb-2">
            Step {step + 1} of 3
          </p>
          <h1 className="text-[22px] font-bold text-[#e6edf3]">
            {STEPS[step].title}
          </h1>
          <p className="text-[13px] text-[#484f58] mt-1">{STEPS[step].sub}</p>
        </div>

        {/* Step 0 — Job description */}
        {step === 0 && (
          <div>
            <label className="flex items-center gap-1.5 text-[12px] text-[#7d8590] mb-2">
              <span className="material-symbols-outlined text-sm">work</span>
              Job description <span className="text-[#ff2d78]">*</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJd(e.target.value.slice(0, 5000))}
              rows={10}
              className="w-full bg-[#111118] border border-[#1e2535] rounded-xl p-3.5 text-[13px] text-[#e6edf3] outline-none resize-none focus:border-[#ff2d7860] transition-colors leading-relaxed"
              placeholder={"Paste the full job description here — include role, responsibilities, and required skills..."}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-[#2a3348]">More detail = better questions</span>
              <span className="text-[11px] text-[#484f58]">{jobDescription.length} / 5000</span>
            </div>
          </div>
        )}

        {/* Step 1 — Resume */}
        {step === 1 && (
          <div>
            <label className="flex items-center gap-1.5 text-[12px] text-[#7d8590] mb-2">
              <span className="material-symbols-outlined text-sm">description</span>
              Resume (PDF) <span className="text-[#ff2d78]">*</span>
            </label>

            {!resumeFile ? (
              <div
                onClick={() => fileRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                className={`border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-2.5 cursor-pointer transition-all ${
                  isDragging
                    ? "border-[#ff2d78] bg-[#ff2d780a]"
                    : "border-[#1e2535] bg-[#111118] hover:border-[#ff2d7850]"
                }`}
              >
                <span className=" text-[#e0d2d7] text-4xl"> 
                  <CloudUpload className="w-16 h-16" />
                </span>
                <p className="text-[13px] font-semibold text-[#e6edf3]">Click to upload or drag & drop</p>
                <p className="text-[12px] text-[#484f58]">PDF only · max 5 MB</p>
              </div>
            ) : (
              <div className="bg-[#111118] border border-[#ff2d7830] rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-12 bg-[#ff2d7812] border border-[#ff2d7830] rounded-lg flex flex-col items-center justify-center gap-0.5 flex-shrink-0">
                  <span className="text-[9px] text-[#ff2d78] font-bold">PDF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#e6edf3] truncate">{resumeFile.name}</p>
                  <p className="text-[11px] text-[#7d8590] mt-0.5">{fileSizeLabel} · PDF</p>
                </div>
                <button
                  onClick={() => setResumeFile(null)}
                  className="text-[#484f58] hover:text-[#e6edf3] cursor-pointer transition-colors ml-1"
                  aria-label="Remove file"
                >
                  <span className="material-symbols-outlined text-base">
                    <X size={26}  />
                  </span>
                </button>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        )}

        {/* Step 2 — About you */}
        {step === 2 && (
          <div>
            <label className="flex items-center gap-1.5 text-[12px] text-[#7d8590] mb-2">
              <span className="material-symbols-outlined text-sm">person</span>
              About yourself <span className="text-[#ff2d78]">*</span>
            </label>
            <textarea
              value={selfDescription}
              onChange={(e) => setSd(e.target.value.slice(0, 3000))}
              rows={8}
              className="w-full bg-[#111118] border border-[#1e2535] rounded-xl p-3.5 text-[13px] text-[#e6edf3] outline-none resize-none focus:border-[#ff2d7860] transition-colors leading-relaxed"
              placeholder={"Your experience, skills, and what role you're targeting...\n\nExample: 3 years React + Node.js. Targeting a senior frontend role."}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-[#2a3348]">AI uses this to tailor your questions</span>
              <span className="text-[11px] text-[#484f58]">{selfDescription.length} / 3000</span>
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="flex justify-between items-center mt-8">
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? "20px" : "6px",
                  background: i === step ? "#ff2d78" : "#1e2535",
                }}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="border border-[#1e2535] cursor-pointer rounded-lg px-4 py-2 text-[13px] text-[#7d8590] hover:text-[#e6edf3] hover:border-[#2a3348] transition-all"
              >
                <span className="material-symbols-outlined text-sm"> ← </span>
                  Back
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="bg-[#ff2d78] text-white cursor-pointer rounded-lg px-5 py-2 text-[13px] font-semibold flex items-center gap-1.5 hover:bg-[#e0265f] transition-colors"
              >
                Continue
                <span className="material-symbols-outlined text-sm">→</span>
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="bg-[#ff2d78] text-white rounded-lg px-5 py-2 text-[13px] font-semibold flex items-center gap-1.5 hover:bg-[#e0265f] transition-colors"
              >
                Generate plan
                <span className="material-symbols-outlined text-sm">→</span>
              </button>
              
            )}
          </div>
        </div>

      </div>
    </div>
  );
}