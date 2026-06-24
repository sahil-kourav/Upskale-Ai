import { useContext } from "react";
import { MockInterviewContext, initialSetup } from "../mockInterview.context";
// ⚠️ adjust this path to wherever your auth hook actually lives
import { useAuth } from "../../auth/hooks/useAuth";
import {
  analyzeResume as analyzeResumeApi,
  generateQuestions,
  submitAnswer as submitAnswerApi,
  getResult,
  getAllMockInterviews,
  getMockInterviewById,
} from "../services/mockInterview.api";

export const useMockInterview = () => {
  const context = useContext(MockInterviewContext);
  const { user, setUser } = useAuth();

  const {
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
  } = context;

  const updateSetupField = (field, value) => {
    setSetup((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalyzeResume = async () => {
    if (!setup.resumeFile) {
      alert("Please upload a resume first.");
      return;
    }

    setAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", setup.resumeFile);

    try {
      const data = await analyzeResumeApi(formData);

      setSetup((prev) => ({
        ...prev,
        role: data.role || "",
        experience: data.experience || "",
        projects: data.projects || [],
        skills: data.skills || [],
        resumeText: data.resumeText || "",
        analysisDone: true,
      }));

      return data;
    } catch (err) {
      console.error("Error analyzing resume:", err);
      alert("Failed to analyze resume. Please try again.");
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  const handleStartInterview = async () => {
    setStartingInterview(true);

    try {
      const data = await generateQuestions({
        role: setup.role,
        experience: setup.experience,
        mode: setup.mode,
        resumeText: setup.resumeText,
        projects: setup.projects,
        skills: setup.skills,
      });

      if (user) {
        setUser({ ...user, credits: data.creditsLeft });
      }

      setMockInterviewData(data);
      setCurrentIndex(0);
      setAnswer("");
      setFeedback("");
      setStep(2);

      return data;
    } catch (err) {
      console.error("Error starting interview:", err);
      
      throw err;
    } finally {
      setStartingInterview(false);
    }
  };

  const handleSubmitAnswer = async (timeTaken) => {
    if (isSubmitting || !mockInterviewData) return;

    setIsSubmitting(true);

    try {
      const data = await submitAnswerApi({
        mockInterviewId: mockInterviewData.mockInterviewId,
        questionIndex: currentIndex,
        timeTaken,
        answer,
      });

      setFeedback(data.feedback);

      return data.feedback;
    } catch (err) {
      console.error("Error submitting answer:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextQuestion = () => {
    setAnswer("");
    setFeedback("");
    setCurrentIndex((prev) => prev + 1);
  };

  const handleFinishInterview = async () => {
    if (!mockInterviewData) return;

    setReportLoading(true);

    try {
      const data = await getResult({
        mockInterviewId: mockInterviewData.mockInterviewId,
      });

      setReport(data);
      setStep(3);

      return data;
    } catch (err) {
      console.error("Error finishing mock interview:", err);
      throw err;
    } finally {
      setReportLoading(false);
    }
  };

  const handleFetchReportById = async (id) => {
    setReportLoading(true);

    try {
      const data = await getMockInterviewById(id);

      setReport(data);

      return data;
    } catch (err) {
      console.error("Error fetching mock interview:", err);
      throw err;
    } finally {
      setReportLoading(false);
    }
  };

  const handleFetchHistory = async () => {
    setHistoryLoading(true);

    try {
      const data = await getAllMockInterviews();

      setHistory(data || []);

      return data;
    } catch (err) {
      console.error("Error fetching mock interviews:", err);
      setHistory([]);
      throw err;
    } finally {
      setHistoryLoading(false);
    }
  };

  const resetMockInterview = () => {
    setStep(1);
    setSetup(initialSetup);
    setMockInterviewData(null);
    setCurrentIndex(0);
    setAnswer("");
    setFeedback("");
    setReport(null);
  };

  return {
    // flow
    step,
    setStep,
    // setup
    setup,
    updateSetupField,
    analyzing,
    handleAnalyzeResume,
    startingInterview,
    handleStartInterview,
    // live interview
    mockInterviewData,
    currentIndex,
    answer,
    setAnswer,
    feedback,
    isSubmitting,
    handleSubmitAnswer,
    goToNextQuestion,
    handleFinishInterview,
    // report
    report,
    reportLoading,
    handleFetchReportById,
    // history
    history,
    historyLoading,
    handleFetchHistory,
    // reset
    resetMockInterview,
  };
};