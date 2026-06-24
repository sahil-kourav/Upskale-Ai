import { useState, createContext } from "react";

export const MockInterviewContext = createContext();

export const initialSetup = {
  role: "",
  experience: "",
  mode: "",
  resumeFile: null,
  resumeText: "",
  projects: [],
  skills: [],
  analysisDone: false,
};

export const MockInterviewProvider = ({ children }) => {
  // flow control
  const [step, setStep] = useState(1); // 1 = setup, 2 = live interview, 3 = report

  // step 1: setup form
  const [setup, setSetup] = useState(initialSetup);
  const [analyzing, setAnalyzing] = useState(false);
  const [startingInterview, setStartingInterview] = useState(false);

  // step 2: live interview
  const [mockInterviewData, setMockInterviewData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // step 3: report
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  // history
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  return (
    <MockInterviewContext.Provider
      value={{
        step,
        setStep,
        setup,
        setSetup,
        analyzing,
        setAnalyzing,
        startingInterview,
        setStartingInterview,
        mockInterviewData,
        setMockInterviewData,
        currentIndex,
        setCurrentIndex,
        answer,
        setAnswer,
        feedback,
        setFeedback,
        isSubmitting,
        setIsSubmitting,
        report,
        setReport,
        reportLoading,
        setReportLoading,
        history,
        setHistory,
        historyLoading,
        setHistoryLoading,
      }}
    >
      {children}
    </MockInterviewContext.Provider>
  );
};