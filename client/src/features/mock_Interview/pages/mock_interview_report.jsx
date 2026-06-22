import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import Step3Report from '../components/Step3Report';

const mock_interview_report = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchMockInterview = async () => {
      try {
        const response = await axios.get(          
          "http://localhost:8080/api/mock-interview/get-mock-interview/" + id,
          {
            withCredentials: true,
          }
        );
        console.log("Fetched mock interview report:", response.data);
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching mock interview:", error);
      }
    };

    fetchMockInterview();
  }, []);


  if(!report){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading report...</p>
      </div>
    )
  }

  return <Step3Report report={report} />
}

export default mock_interview_report