import React from 'react'
import { useState} from 'react'
import Step1SetUp from '../components/Step1SetUp'
import Step2Interview from '../components/Step2Interview'
import Step3Report from '../components/Step3Report'

 
const mock_interview = () => {

  const [step, setStep] = useState(1);
  const [mockInterviewData, setMockInterviewData] = useState(null);
  const [report, setReport] = useState(null);

  return (
    <div className= "min-h-screen bg-gray-800">
      {step===1 && (
          <Step1SetUp 
            onStart={(data)=>{
              setMockInterviewData(data);
              setStep(2);
            }}
          />
        )}

        {step===2 && (
          <Step2Interview mockInterviewData={mockInterviewData} 
          onFinish={(report)=>{
            setMockInterviewData(report);
            setStep(3);
          }}
          />
        )}

        {step===3 && (
          <Step3Report report={mockInterviewData} />
        )}


    </div>
  )
}

export default mock_interview