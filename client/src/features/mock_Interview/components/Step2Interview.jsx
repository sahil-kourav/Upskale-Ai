// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import maleVideo from "../../../assets/Videos/male-ai.mp4";
// import femaleVideo from "../../../assets/Videos/female-ai.mp4";
// import Timer from "../../../components/Timer";
// import { motion } from "motion/react";
// import {
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa";
// import axios from "axios";

// const Step2Interview = ({ mockInterviewData, onFinish }) => {
//   const { mockInterviewId, questions, fullName } = mockInterviewData;
//   const [isIntroPhase, setIsIntroPhase] = useState(true);

//   const [isMicOn, setIsMicOn] = useState(true);
//   const recognitionRef = useRef(null);
//   const isListeningRef = useRef(false);

//   const [isAIPlaying, setIsAIPlaying] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [voiceGender, setVoiceGender] = useState("female");
//   const [subtitle, setSubtitle] = useState("");

//   const videoRef = useRef(null);

//   const currentQuestion = useMemo(
//     () => questions[currentIndex],
//     [questions, currentIndex],
//   );

//   useEffect(() => {
//     const loadVoices = () => {
//       const voices = window.speechSynthesis.getVoices();
//       if (!voices.length) {
//         window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
//         return;
//       }

//       // try known female voice first

//       const femaleVoice = voices.find(
//         (voice) =>
//           voice.name.toLowerCase().includes("zira") ||
//           // voice.name.toLowerCase().includes("susan") ||
//           voice.name.toLowerCase().includes("samantha") ||
//           voice.name.toLowerCase().includes("female"),
//       );

//       if (femaleVoice) {
//         setSelectedVoice(femaleVoice);
//         setVoiceGender("female");
//         return;
//       }

//       // TRy known male voices

//       const maleVoice = voices.find(
//         (voice) =>
//           voice.name.toLowerCase().includes("david") ||
//           voice.name.toLowerCase().includes("mark") ||
//           voice.name.toLowerCase().includes("michael") ||
//           voice.name.toLowerCase().includes("male"),
//       );

//       if (maleVoice) {
//         setSelectedVoice(maleVoice);
//         setVoiceGender("male");
//         return;
//       }

//       // Fallback to first voice
//       setSelectedVoice(voices[0]);
//       setVoiceGender("female");
//     };

//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

//   const speakText = (text) => {
//     return new Promise((resolve) => {
//       if (!window.speechSynthesis || !selectedVoice) {
//         resolve();
//         return;
//       }

//       window.speechSynthesis.cancel();

//       // Add natural pauses after comas and periods

//       const humanText = text.replace(/, /g, ", ... ").replace(/\. /g, ". ... ");

//       const utterance = new SpeechSynthesisUtterance(humanText);

//       utterance.voice = selectedVoice;

//       // human like paching
//       utterance.rate = 0.92; // slightly slower than normal
//       utterance.pitch = 1.05; // slightly higher pitch
//       utterance.volume = 1; // full volumn

//       utterance.onstart = () => {
//         setIsAIPlaying(true);
//         stopMic();
//         videoRef.current?.play();
//       };

//       utterance.onend = () => {
//         videoRef.current.pause();
//         videoRef.current.currentTime = 0;
//         setIsAIPlaying(false);

//         if (isMicOn) {
//           startMic();
//         }

//         setTimeout(() => {
//           setSubtitle("");
//           resolve();
//         }, 500);
//       };

//       setSubtitle(text);

//       window.speechSynthesis.speak(utterance);
//     });
//   };

//   useEffect(() => {
//     if (!selectedVoice) {
//       return;
//     }

//     const runIntro = async () => {
//       if (isIntroPhase) {
//         await speakText(`Hello ${fullName}, it's great to meet you. Welcome to your mock interview session. 
//           We will be going through a series of questions to help you prepare for your upcoming interviews. so let's start your interview!`);

//         await speakText(`Here's your first question:`);
//         setIsIntroPhase(false);
//       } else if (currentQuestion) {
//         await new Promise((r) => setTimeout(r, 800));

//         //  when hard questions appears
//         if (currentQuestion.difficulty === "hard") {
//           await speakText(
//             `Already, this is a challenging question, but I believe in your abilities. Take a deep breath, think carefully, and answer confidently. You've got this!`,
//           );
//         }

//         await speakText(currentQuestion.question);

//         if (isMicOn) {
//           startMic();
//         }
//       }
//     };

//     runIntro();
//   }, [selectedVoice, isIntroPhase, currentIndex]);

//   useEffect(() => {
//     if (isIntroPhase) return;

//     if (!currentQuestion) return;

//     // STOP TIMER AFTER ANSWER SUBMITTED
//     if (feedback) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);

//           setSubtitle("Time's up! Moving to the next question.");

//           return 0;
//         }

//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isIntroPhase, currentIndex, feedback]);

//   useEffect(() => {
//     if (!isIntroPhase && currentQuestion) {
//       setTimeLeft(currentQuestion?.timeLimit || 60);
//     }
//   }, [currentQuestion]);

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) return;

//     const recognition = new window.webkitSpeechRecognition();

//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onstart = () => {
//       isListeningRef.current = true;
//     };

//     recognition.onend = () => {
//       isListeningRef.current = false;
//     };

//     recognition.onerror = () => {
//       isListeningRef.current = false;
//     };

//     recognition.onresult = (event) => {
//       let transcript = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         if (event.results[i].isFinal) {
//           transcript += event.results[i][0].transcript;
//         }
//       }

//       if (transcript) {
//         setAnswer((prev) => `${prev} ${transcript}`.trim());
//       }
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       recognition.stop();
//     };
//   }, []);

//   const startMic = () => {
//     if (!recognitionRef.current || isAIPlaying || isListeningRef.current) {
//       return;
//     }

//     try {
//       recognitionRef.current.start();
//     } catch (error) {
//       console.log("Mic already running");
//     }
//   };

//   const stopMic = () => {
//     if (!recognitionRef.current) return;

//     try {
//       recognitionRef.current.stop();
//     } catch {}
//   };

//   const toggleMic = () => {
//     if (isMicOn) {
//       stopMic();
//     } else {
//       startMic();
//     }
//     setIsMicOn(!isMicOn);
//   };

//   const handleSubmitAnswer = async () => {
//     if (isSubmitting) return;

//     stopMic();
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/mock-interview/submit-answer`,
//         {
//           mockInterviewId,
//           questionIndex: currentIndex,
//           timeTaken: currentQuestion.timeLimit - timeLeft,
//           answer: answer,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       setFeedback(response.data.feedback);
//       speakText(response.data.feedback);
//     } catch (error) {
//       console.error("Error submitting answer:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleNextQuestion = async () => {
//     stopMic();
//     setIsSubmitting(true);
//     setAnswer("");
//     setFeedback("");

//     if (currentIndex + 1 >= questions.length) {
//       handleFinishMockInterview();
//       return;
//     }

//     await speakText("Alright, let's move to the next question.");

//     setCurrentIndex((prev) => prev + 1);

//     setIsSubmitting(false);
//   };

//   const handleFinishMockInterview = async () => {
//     stopMic();
//     setIsMicOn(false);

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/mock-interview/get-result`,
//         {
//           mockInterviewId,
//         },
//         {
//           withCredentials: true,
//         },
//       );
//       console.log("Mock interview result:", response.data);
//       onFinish(response.data);
//     } catch (error) {
//       console.error("Error finishing mock interview:", error);
//     }
//   };

//   useEffect(() => {
//     if (isIntroPhase || !currentQuestion || feedback || isSubmitting) {
//       return;
//     }

//     if (timeLeft === 0) {
//       handleSubmitAnswer();
//     }
//   }, [timeLeft, currentIndex]);

//   useEffect(() => {
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//         recognitionRef.current = null;
//       }

//       window.speechSynthesis.cancel();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6">
//       <div className="w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
//         {/* video section */}
//         <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">
//           <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
//             <video
//               src={videoSource}
//               key={videoSource}
//               ref={videoRef}
//               muted
//               playsInline
//               preload="auto"
//               className="w-full h-auto object-cover"
//             />
//           </div>

//           {/* SUbtitle bar */}
//           {subtitle && (
//             <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
//               <p className="text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed">
//                 {subtitle}
//               </p>
//             </div>
//           )}

//           {/* timer area */}
//           <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">Interview Status</span>

//               {isAIPlaying && (
//                 <span className="text-sm font-semibold text-emerald-600">
//                   {isAIPlaying ? "AI Speaking" : ""}
//                 </span>
//               )}
//             </div>

//             <div className="border-t border-gray-200 pt-4" />
//             <div className="flex justify-center items-center">
//               <Timer
//                 timeLeft={timeLeft}
//                 totalTime={currentQuestion?.timeLimit || 60}
//               />
//             </div>

//             <div className="h-px bg-gray-200"></div>
//             <div className="grid grid-cols-2 gap-6 text-2xl">
//               <div>
//                 <span className="text-2xl font-bold text-emerald-600">
//                   {currentIndex + 1}
//                 </span>
//                 <span className="text-xs text-gray-400">Current Question</span>
//               </div>
//               <div>
//                 <span className="text-2xl font-bold text-emerald-600">
//                   {questions.length}
//                 </span>
//                 <span className="text-xs text-gray-400">Total Questions</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Text section */}
//         <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative">
//           <h2 className="text-xl sm:text-2xl font-bold text-emerald-600 mb-6">
//             AI Smart Interview
//           </h2>

//           {!isIntroPhase && (
//             <div className="relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
//               <p className="text-xs sm:text-sm text-gray-400 mb-2">
//                 Question {currentIndex + 1} of {questions.length}
//               </p>

//               <div className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
//                 {currentQuestion?.question} Andthsi amskann{" "}
//                 {currentQuestion?.questions}
//               </div>
//             </div>
//           )}

//           <textarea
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Type your answer here..."
//             className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800"
//           />

//           {!feedback ? (
//             <div className="flex items-center gap-4 mt-6">
//               <motion.button
//                 onClick={toggleMic}
//                 whileTap={{ scale: 0.9 }}
//                 className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg"
//               >
//                 {isMicOn ? (
//                   <FaMicrophone size={20} />
//                 ) : (
//                   <FaMicrophoneSlash size={20} />
//                 )}
//               </motion.button>
//               <motion.button
//                 onClick={handleSubmitAnswer}
//                 disabled={isSubmitting}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit Answer"}
//               </motion.button>
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm"
//             >
//               <p className="text-emerald-700 font-medium mb-4">{feedback}</p>

//               <button
//                 onClick={handleNextQuestion}
//                 className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
//               >
//                 Next Question <FaArrowRight size={18} />
//               </button>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step2Interview;






















import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import maleVideo from "../../../assets/Videos/male-ai.mp4";
import femaleVideo from "../../../assets/Videos/female-ai.mp4";
import Timer from "../../../components/Timer";
import { motion } from "motion/react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";

const Step2Interview = ({ mockInterviewData, onFinish }) => {
  const { mockInterviewId, questions, fullName } = mockInterviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex],
  );

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) {
        window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
        return;
      }

      // try known female voice first

      const femaleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("zira") ||
          voice.name.toLowerCase().includes("samantha") ||
          voice.name.toLowerCase().includes("female"),
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      // Try known male voices

      const maleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("david") ||
          voice.name.toLowerCase().includes("mark") ||
          voice.name.toLowerCase().includes("michael") ||
          voice.name.toLowerCase().includes("male"),
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      // Fallback to first voice
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Add natural pauses after comas and periods

      const humanText = text.replace(/, /g, ", ... ").replace(/\. /g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      // human like paching
      utterance.rate = 0.92; // slightly slower than normal
      utterance.pitch = 1.05; // slightly higher pitch
      utterance.volume = 1; // full volumn

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) {
          startMic();
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 500);
      };

      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) {
      return;
    }

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(`Hello ${fullName}, it's great to meet you. Welcome to your mock interview session. 
          We will be going through a series of questions to help you prepare for your upcoming interviews. so let's start your interview!`);

        await speakText(`Here's your first question:`);
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));

        //  when hard questions appears
        if (currentQuestion.difficulty === "hard") {
          await speakText(
            `Already, this is a challenging question, but I believe in your abilities. Take a deep breath, think carefully, and answer confidently. You've got this!`,
          );
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }
    };

    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  useEffect(() => {
    if (isIntroPhase) return;

    if (!currentQuestion) return;

    // STOP TIMER AFTER ANSWER SUBMITTED
    if (feedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          setSubtitle("Time's up! Moving to the next question.");

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex, feedback]);

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion?.timeLimit || 60);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isListeningRef.current = true;
    };

    recognition.onend = () => {
      isListeningRef.current = false;
    };

    recognition.onerror = () => {
      isListeningRef.current = false;
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }

      if (transcript) {
        setAnswer((prev) => `${prev} ${transcript}`.trim());
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startMic = () => {
    if (!recognitionRef.current || isAIPlaying || isListeningRef.current) {
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.log("Mic already running");
    }
  };

  const stopMic = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
    } catch {}
  };

  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };

  const handleSubmitAnswer = async () => {
    if (isSubmitting) return;

    stopMic();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/mock-interview/submit-answer`,
        {
          mockInterviewId,
          questionIndex: currentIndex,
          timeTaken: currentQuestion.timeLimit - timeLeft,
          answer: answer,
        },
        {
          withCredentials: true,
        },
      );

      setFeedback(response.data.feedback);
      speakText(response.data.feedback);
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = async () => {
    stopMic();
    setIsSubmitting(true);
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      handleFinishMockInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex((prev) => prev + 1);

    setIsSubmitting(false);
  };

  const handleFinishMockInterview = async () => {
    stopMic();
    setIsMicOn(false);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/mock-interview/get-result`,
        {
          mockInterviewId,
        },
        {
          withCredentials: true,
        },
      );
      console.log("Mock interview result:", response.data);
      onFinish(response.data);
    } catch (error) {
      console.error("Error finishing mock interview:", error);
    }
  };

  useEffect(() => {
    if (isIntroPhase || !currentQuestion || feedback || isSubmitting) {
      return;
    }

    if (timeLeft === 0) {
      handleSubmitAnswer();
    }
  }, [timeLeft, currentIndex]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

      window.speechSynthesis.cancel();
    };
  }, []);

  const progressPercent = (currentIndex / questions.length) * 100;
  const isListeningNow = isMicOn && !isAIPlaying;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-7xl min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT — video call panel */}
        <div className="w-full lg:w-[38%] bg-gray-50 flex flex-col p-5 sm:p-6 border-r border-gray-200">
          {/* video frame with call-style overlays */}
          <div className="relative w-full aspect-[6/5] rounded-2xl overflow-hidden shadow-lg bg-slate-900">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />

            {/* interviewer name tag */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/45 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white text-xs font-medium">
                AI Interviewer
              </span>
            </div>

            {/* speaking indicator */}
            {isAIPlaying && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500 px-3 py-1 rounded-full">
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-white rounded-full animate-pulse" />
                  <span className="w-0.5 h-2 bg-white rounded-full animate-pulse [animation-delay:150ms]" />
                  <span className="w-0.5 h-full bg-white rounded-full animate-pulse [animation-delay:300ms]" />
                </span>
                <span className="text-white text-xs font-semibold">
                  Speaking
                </span>
              </div>
            )}

            {/* live captions over the video */}
            {subtitle && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pt-10 pb-3">
                <p className="text-white text-sm text-center leading-relaxed">
                  {subtitle}
                </p>
              </div>
            )}
          </div>

          {/* timer + question count */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center">
              <Timer
                timeLeft={timeLeft}
                totalTime={currentQuestion?.timeLimit || 60}
              />
              <span className="text-xs text-gray-400 mt-1">Time left</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-emerald-600">
                {currentIndex + 1}
                <span className="text-gray-300 text-base font-medium">
                  /{questions.length}
                </span>
              </span>
              <span className="text-xs text-gray-400 mt-1">Question</span>
            </div>
          </div>

          {/* overall progress */}
          <div className="mt-4">
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — question / answer panel */}
        <div className="flex-1 flex flex-col p-5 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              AI Smart Interview
            </h2>

            {!isIntroPhase && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Question {currentIndex + 1} of {questions.length}
              </span>
            )}
          </div>

          {!isIntroPhase && (
            <div className="mb-5 bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
                {currentQuestion?.question}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-500">
              Your answer
            </label>

            {isListeningNow && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Listening
              </span>
            )}
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here, or just speak — we're transcribing as you go."
            className="flex-1 min-h-40 bg-gray-50 p-4 sm:p-5 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-gray-800"
          />

          {!feedback ? (
            <div className="flex items-center gap-3 sm:gap-4 mt-5">
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                title={isMicOn ? "Mute microphone" : "Unmute microphone"}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white shadow-lg transition-colors ${
                  isMicOn ? "bg-slate-900" : "bg-red-500"
                }`}
              >
                {isMicOn ? (
                  <FaMicrophone size={20} />
                ) : (
                  <FaMicrophoneSlash size={20} />
                )}
              </motion.button>

              <motion.button
                onClick={handleSubmitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                  AI Feedback
                </span>
              </div>

              <p className="text-emerald-800 leading-relaxed mb-4">
                {feedback}
              </p>

              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-2 font-medium"
              >
                Next Question <FaArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2Interview;