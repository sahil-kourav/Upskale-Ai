// import React, { useState } from "react";
// import { motion } from "motion/react";
// import {
//   FaUserTie,
//   FaBriefcase,
//   FaFileUpload,
//   FaMicrophoneAlt,
//   FaChartLine,
// } from "react-icons/fa";
// import axios from "axios";
// import { useAuth } from "../../auth/hooks/useAuth"

// const Step1SetUp = ({ onStart }) => {

//   const { user, setUser } = useAuth();

//   const [loading, setLoading] = useState(false);
//   const [role, setRole] = useState("");
//   const [experience, setExperience] = useState("");
//   const [mode, setMode] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [resumeText, setResumeText] = useState("");
//   const [analysisDone, setAnalysisDone] = useState(false);
//   const [analyzing, setAnalyzing] = useState(false);

//   const handleAnalyzeResume = async () => {
//     if (!resumeFile) {
//       alert("Please upload a resume first.");
//       return;
//     }

//     setAnalyzing(true);

//     const formData = new FormData();
//     formData.append("resume", resumeFile);

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/mock-interview/analyze-resume`,
//         formData,
//         {
//           withCredentials: true,
//         },
//       );

//       console.log("Resume analysis response:", response.data);
//       setRole(response.data.role || "");
//       setExperience(response.data.experience || "");
//       setProjects(response.data.projects || []);
//       setSkills(response.data.skills || []);
//       setResumeText(response.data.resumeText || "");
//       setAnalysisDone(true);
//       setAnalyzing(false);
//     } catch (error) {
//       console.error("Error analyzing resume:", error);
//       alert("Failed to analyze resume. Please try again.");
//     } finally {
//       setAnalyzing(false);
//     }
//   };


//   const handleStart = async ()=> {
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/mock-interview/generate-questions`,
//         {
//           role,
//           experience,
//           mode,
//           resumeText,
//           projects,
//           skills
//         },
//         {
//           withCredentials: true
//         })
//         console.log("response", response.data);

//         if(user){
//           setUser({...user, credits: response.data.creditsLeft })
//         }

//         setLoading(false);
//         onStart(response.data)

//     } catch (err){
//       console.error("Error starting interview:", err);
//       // alert("Failed to start interview. Please try again.");
//     } finally {
//       setLoading(false);
//     } 
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="min-h-screen flex items-center justify-center bg-[#0a0a12]/80 px-4"
//     >
//       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
//         <motion.div
//           initial={{ x: -80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.7 }}
//           className="relative bg-gradient-to-br from-green-50 to-green-100 p-8 flex flex-col justify-center"
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Start Your AI Interview
//           </h2>

//           <p className="text-gray-600 mb-10">
//             Practice real interview scenarios powered by AI. Improve
//             communication, technical skills, and confidence
//           </p>

//           <div className="space-y-6">
//             {[
//               {
//                 icon: <FaUserTie className="text-green-600 text-xl" />,
//                 text: "Choose Role & Experience",
//               },
//               {
//                 icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
//                 text: "Smart Voice Interview",
//               },
//               {
//                 icon: <FaChartLine className="text-green-600 text-xl" />,
//                 text: "Performance Analytics",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.3 + index * 0.15 }}
//                 whileHover={{ scale: 1.03 }}
//                 className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer"
//               >
//                 {item.icon}

//                 <span className="text-gray-700 font-medium">{item.text}</span>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ x: 80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.7 }}
//           className="p-8 bg-white"
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Set Up Your Interview
//           </h2>

//           <div className="space-y-3 text-gray-800">
//             <div className="relative">
//               <FaUserTie className="absolute top-4 left-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Enter role"
//                 className="w-full pl-12 pr-4 py-2.5 border text-gray-700 placeholder:text-gray-500 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
//                 onChange={(e) => setRole(e.target.value)}
//                 value={role}
//               />
//             </div>

//             <div className="relative">
//               <FaBriefcase className="absolute top-4 left-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Enter experience"
//                 className="w-full pl-12 pr-4 py-2.5 border text-gray-700 placeholder:text-gray-500 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
//                 onChange={(e) => setExperience(e.target.value)}
//                 value={experience}
//               />
//             </div>

//             <select
//               value={mode}
//               onChange={(e) => setMode(e.target.value)}
//               className="w-full py-2.5 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
//             >
//               <option value="">Select Interview Mode</option>
//               <option value="HR">HR Interview</option>
//               <option value="Technical">Technical Interview</option>

//             </select>

//             {!analysisDone && (
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 onClick={() => document.getElementById("resumeUpload").click()}
//                 className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
//               >
//                 <FaFileUpload className="text-4xl mx-auto text-green-600 mb-3" />

//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   id="resumeUpload"
//                   className="hidden"
//                   onChange={(e) => setResumeFile(e.target.files[0])}
//                 />

//                 <p className="text-gray-600 font-medium">
//                   {resumeFile
//                     ? resumeFile.name
//                     : "Click to upload your resume (PDF)"}
//                 </p>

//                 {resumeFile && (
//                   <motion.button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleAnalyzeResume();
//                     }}
//                     whileHover={{ scale: 1.02 }}
//                     className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
//                   >
//                     {analyzing ? "Analyzing..." : "Analyze Resume"}
//                   </motion.button>
//                 )}
//               </motion.div>
//             )}

//             {analysisDone && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4"
//               >
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Resume Analysis Result
//                 </h3>

//                 {projects.length > 0 && (
//                   <div>
//                     <p className="font-medium text-gray-700 mb-1">Projects:</p>

//                     <ul className="list-disc list-inside text-gray-600 space-y-1">
//                       {projects.map((p, i) => (
//                         <li key={i}>{p}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {skills.length > 0 && (
//                   <div>
//                     <p className="font-medium text-gray-700 mb-1">Skills:</p>

//                     <div className="flex flex-wrap gap-2 text-gray-600">
//                       {skills.map((s, i) => (
//                         <p key={i}
//                         className="capitalize bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
//                         >{s}</p>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             )}

//             <motion.button
//             onClick={ handleStart}
//               disabled={!role || !experience || loading}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full disabled:bg-gray-600 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md"
//             >
//               {loading ? "Starting Interview..." : "Start Interview"}
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Step1SetUp;

















import React, { useState } from "react";
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../auth/hooks/useAuth";

const Step1SetUp = ({ onStart }) => {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // sends the uploaded resume to backend and fills the form with the result
  const handleAnalyzeResume = async () => {
    if (!resumeFile) {
      alert("Please upload a resume first.");
      return;
    }

    setAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/mock-interview/analyze-resume`,
        formData,
        { withCredentials: true }
      );

      console.log("Resume analysis response:", response.data);
      setRole(response.data.role || "");
      setExperience(response.data.experience || "");
      setProjects(response.data.projects || []);
      setSkills(response.data.skills || []);
      setResumeText(response.data.resumeText || "");
      setAnalysisDone(true);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  // starts the interview using whatever role/experience/mode/resume info we have
  const handleStart = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/mock-interview/generate-questions`,
        {
          role,
          experience,
          mode,
          resumeText,
          projects,
          skills,
        },
        { withCredentials: true }
      );

      console.log("response", response.data);

      if (user) {
        setUser({ ...user, credits: response.data.creditsLeft });
      }

      onStart(response.data);
    } catch (err) {
      console.error("Error starting interview:", err);
    } finally {
      setLoading(false);
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
                onChange={(e) => setRole(e.target.value)}
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
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Interview Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
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
                  onChange={(e) => setResumeFile(e.target.files[0])}
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
              onClick={handleStart}
              disabled={!role || !experience || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold mt-2"
            >
              {loading ? "Starting Interview..." : "Start Interview"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Step1SetUp;