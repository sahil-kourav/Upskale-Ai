import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export async function analyzeResume(formData) {
  try {
    const response = await api.post(
      `/api/mock-interview/analyze-resume`,
      formData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function generateQuestions({
  role,
  experience,
  mode,
  resumeText,
  projects,
  skills,
}) {
  try {
    const response = await api.post(`/api/mock-interview/generate-questions`, {
      role,
      experience,
      mode,
      resumeText,
      projects,
      skills,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function submitAnswer({
  mockInterviewId,
  questionIndex,
  timeTaken,
  answer,
}) {
  try {
    const response = await api.post(`/api/mock-interview/submit-answer`, {
      mockInterviewId,
      questionIndex,
      timeTaken,
      answer,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getResult({ mockInterviewId }) {
  try {
    const response = await api.post(`/api/mock-interview/get-result`, {
      mockInterviewId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllMockInterviews() {
  try {
    const response = await api.get(
      `/api/mock-interview/get-all-mock-interviews`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMockInterviewById(id) {
  try {
    const response = await api.get(
      `/api/mock-interview/get-mock-interview/${id}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}