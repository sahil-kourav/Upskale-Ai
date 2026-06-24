import React from "react";
import { notify } from "../../../utils/toast";
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaCoins, 
  FaExclamationTriangle, 
  FaChartLine,
} from "react-icons/fa";
import { useMockInterview } from "../hooks/useMockInterview";

const Step1SetUp = () => {
  const {
    setup,
    updateSetupField,
    analyzing,
    handleAnalyzeResume,
    startingInterview,
    handleStartInterview,
  } = useMockInterview();

  const { role, experience, mode, resumeFile, analysisDone, projects, skills } =
    setup;



const startInterview = async () => {
  const toastId = notify.loading(
    "Preparing your AI interview..."
  );

  try {
    await handleStartInterview();

    notify.success(
      toastId,
      `Mock Interview unlocked! (-50 Credits)`
    );

  } catch (err) {

    notify.error(
      toastId,

      err?.response?.data?.message || "Oops insufficient credits — you need 50 credits to continue"
    );
  }
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center bg-[#0a0a12]/80 justify-center px-4"
    >
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        {/* Left side - simple info panel */}
        <div className="bg-blue-50 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Start Your AI Interview
          </h2>

          <p className="text-gray-600 mb-8">
            Practice real interview scenarios powered by AI. Improve your
            communication, technical skills, and confidence.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <FaUserTie className="text-blue-600" />
              <span className="text-gray-700 text-sm font-medium">
                Choose Role & Experience
              </span>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <FaMicrophoneAlt className="text-blue-600" />
              <span className="text-gray-700 text-sm font-medium">
                Smart Voice Interview
              </span>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <FaChartLine className="text-blue-600" />
              <span className="text-gray-700 text-sm font-medium">
                Performance Analytics
              </span>
            </div>
          </div>
        </div>

        {/* Right side - the actual form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Set Up Your Interview
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Role
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={role}
                onChange={(e) => updateSetupField("role", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Experience
              </label>
              <input
                type="text"
                placeholder="e.g. 2 years"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={experience}
                onChange={(e) => updateSetupField("experience", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Interview Mode
              </label>
              <select
                value={mode}
                onChange={(e) => updateSetupField("mode", e.target.value)}
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Interview Mode</option>
                <option value="HR">HR Interview</option>
                <option value="Technical">Technical Interview</option>
              </select>
            </div>

            {/* resume upload section - only show if not analyzed yet */}
            {!analysisDone && (
              <div
                onClick={() => document.getElementById("resumeUpload").click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
              >
                <FaFileUpload className="text-2xl mx-auto text-blue-600 mb-2" />

                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) =>
                    updateSetupField("resumeFile", e.target.files[0])
                  }
                />

                <p className="text-sm text-gray-600">
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload your resume (PDF)"}
                </p>

                {resumeFile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnalyzeResume();
                    }}
                    className="mt-3 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </button>
                )}
              </div>
            )}

            {/* show result after resume is analyzed */}
            {analysisDone && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Resume Analysis Result
                </p>

                {projects.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Projects:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={startInterview}
              disabled={!role || !experience || startingInterview}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold mt-2"
            >
              {startingInterview ? "Starting Interview..." : "Start Interview"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Step1SetUp;