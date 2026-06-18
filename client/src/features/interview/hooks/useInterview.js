import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context.jsx";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams()

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
  }) => {
    setLoading(true);
    let data = null
    try {
      data = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });
      setReport(data.interviewReport);
    } catch (error) {
      console.log("Error generating interview report:", error);
    } finally {
      setLoading(false);
    }

    return data.interviewReport
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let data = null
    try {
      data = await getInterviewReportById(interviewId);
      setReport(data.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return data.interviewReport
  };

  const getReports = async () => {
    setLoading(true)
    let data = null
    try {
       data = await getAllInterviewReports();
      setReports(data.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return data.interviewReports
  };

  useEffect(()=>{
    if(interviewId){
      getReportById(interviewId)
    } else {
        getReports()
    }
  },[interviewId])

  return { loading, report, reports, generateReport, getReportById, getReports }
};
