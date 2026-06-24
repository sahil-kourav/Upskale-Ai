import React, { useState, useRef, useEffect, useMemo } from "react";
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
import { useMockInterview } from "../hooks/useMockInterview";

const Step2Interview = () => {
  const {
    mockInterviewData,
    currentIndex,
    answer,
    setAnswer,
    feedback,
    isSubmitting,
    handleSubmitAnswer,
    goToNextQuestion,
    handleFinishInterview,
  } = useMockInterview();

  const { questions, fullName } = mockInterviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex]
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
          voice.name.toLowerCase().includes("female")
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
          voice.name.toLowerCase().includes("male")
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
      const humanText = text
        .replace(/, /g, ", ... ")
        .replace(/\. /g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      // human like pacing
      utterance.rate = 0.92; // slightly slower than normal
      utterance.pitch = 1.05; // slightly higher pitch
      utterance.volume = 1; // full volume

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

        // when hard questions appear
        if (currentQuestion.difficulty === "hard") {
          await speakText(
            `Already, this is a challenging question, but I believe in your abilities. Take a deep breath, think carefully, and answer confidently. You've got this!`
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

  const handleSubmit = async () => {
    if (isSubmitting) return;
    stopMic();

    const feedbackText = await handleSubmitAnswer(
      (currentQuestion?.timeLimit || 60) - timeLeft
    );

    if (feedbackText) {
      speakText(feedbackText);
    }
  };

  const handleFinish = async () => {
    stopMic();
    setIsMicOn(false);
    await handleFinishInterview();
  };

  const handleNextQuestion = async () => {
    stopMic();
    setIsTransitioning(true);

    if (currentIndex + 1 >= questions.length) {
      await handleFinish();
      setIsTransitioning(false);
      return;
    }

    await speakText("Alright, let's move to the next question.");
    goToNextQuestion();

    setIsTransitioning(false);
  };

  useEffect(() => {
    if (isIntroPhase || !currentQuestion || feedback || isSubmitting) {
      return;
    }

    if (timeLeft === 0) {
      handleSubmit();
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
                onClick={handleSubmit}
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
                disabled={isTransitioning}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-2 font-medium disabled:opacity-50"
              >
                {isTransitioning ? "Loading..." : "Next Question"}{" "}
                <FaArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2Interview;