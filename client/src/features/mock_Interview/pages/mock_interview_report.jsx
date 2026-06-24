import React, { useEffect } from "react";
import { useParams } from "react-router";
import Step3Report from "../components/Step3Report";
import { useMockInterview } from "../hooks/useMockInterview";

const mock_interview_report = () => {
  const { id } = useParams();
  const { report, reportLoading, handleFetchReportById } = useMockInterview();

  useEffect(() => {
    handleFetchReportById(id);
  }, [id]);

  if (reportLoading || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading report...</p>
      </div>
    );
  }

  return <Step3Report />;
};

export default mock_interview_report;