import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

/**
 * @desc Generate an interview report based on the provided resume, self-description, and job description
 */
export const generateInterviewReport = async ({
  resumeFile,
  selfDescription,
  jobDescription,
}) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const response = await api.post("/api/interview/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
};

/**
 * @desc Retrieve an interview report by its ID
 */

export const getInterviewReportById = async (interviewId) => {

    const response = await api.get(`/api/interview/report/${interviewId}`);

    return response.data;
};

/**
 * @desc Retrieve all interview reports
 */

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/");

    return response.data;
};


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}