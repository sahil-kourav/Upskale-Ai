import React from "react";
import Step1SetUp from "../components/Step1SetUp";
import Step2Interview from "../components/Step2Interview";
import Step3Report from "../components/Step3Report";
import { useMockInterview } from "../hooks/useMockInterview";

const mock_interview = () => {
  const { step } = useMockInterview();

  return (
    <div className="min-h-screen bg-gray-800">
      {step === 1 && <Step1SetUp />}
      {step === 2 && <Step2Interview />}
      {step === 3 && <Step3Report />}
    </div>
  );
};

export default mock_interview;