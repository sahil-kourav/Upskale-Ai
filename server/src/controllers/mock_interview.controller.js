const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.mjs");
const { askAi } = require("../services/openRouter.service");
const mockInterviewModel = require("../models/mock_interview.model");
const userModel = require("../models/user.model");

async function analyzeResumeController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required." });
    }

    const filePath = req.file.path;

    const fileData = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileData);

    const pdfDOcument = await pdfjsLib.getDocument({ data: uint8Array })
      .promise;

    // Extract text from all pages
    let resumeText = "";

    for (let pageNum = 1; pageNum <= pdfDOcument.numPages; pageNum++) {
      const page = await pdfDOcument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const prompt = `You are an expert resume parser.
Your task is to extract structured information from the provided resume and return ONLY valid JSON.
Return output in STRICT JSON format.

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skills1", "skills2"]
} Return ONLY JSON.`;

    const messges = [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAi(messges);

    const parsedData = JSON.parse(aiResponse);

    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "Resume analyzed successfully.",
      role: parsedData.role,
      experience: parsedData.experience,
      projects: parsedData.projects,
      skills: parsedData.skills,
      resumeText,
    });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "Failed to analyze resume." });
    console.error("Error in analyzeResume:", err.message);
  }
}

async function generateQuestionsController(req, res) {
  try {
    let { role, experience, mode, resumeText, projects, skills } = req.body;

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res
        .status(400)
        .json({ error: "Role, experience and mode are required." });
    }

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.credits < 50) {
      return res
        .status(400)
        .json({
          error:
            "Oops insufficient credits. You need 50 credits to continue",
        });
    }

    const projectText =
      Array.isArray(projects) && projects.length ? projects.join(", ") : "None";
    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";
    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
    Role: ${role}
    Experience: ${experience}
    Mode: ${mode}
    Resume: ${safeResume}
    Projects: ${projectText}
    Skills: ${skillsText}
    `;

    if (!userPrompt.trim()) {
      return res.status(400).json({
        message: "Prompt content is empty.",
      });
    }

    const messages = [
      {
        role: "system",
        content: `
You are an experienced human interviewer conducting a real professional interview.

Talk naturally in simple English as if speaking directly to the candidate.

Your task is to generate personalized interview questions using:
- Candidate role
- Experience level
- Resume content
- Projects
- Skills and technologies
- Interview Mode

Generation Logic:
- Read the entire resume before generating questions.
- Adapt question depth to candidate experience.
- Prioritize projects and actual work over generic theory.
- Ask questions that reveal understanding, decision-making, debugging ability, and practical experience.
- If projects exist, generate project-specific questions.
- If experience is limited, focus on fundamentals and implementation.
- If experience is higher, include architecture, tradeoffs, scalability, and optimization.
- Avoid questions unrelated to the resume.

Difficulty Progression:
- First 5 questions → Easy → background, resume, fundamentals.
- Next 5 questions → Medium → implementation, project decisions, practical scenarios.
- Final 5 questions → Hard → debugging, edge cases, architecture, optimization, real-world tradeoffs.

Question Rules:
- Each question must contain 15–25 words.
- Each question must be exactly one complete sentence.
- Ask only one clear question at a time.
- Keep wording conversational and interviewer-like.
- Questions must feel realistic and practical.
- Avoid textbook definitions.
- Avoid theoretical-only questions.
- Avoid repeated concepts.
- Avoid multi-part questions.
- Avoid yes/no questions.
- Maintain natural interview flow where later questions build on earlier ones.

Output Rules:
- Generate exactly 15 questions.
- Output one question per line.
- Do NOT number questions.
- Do NOT include difficulty labels.
- Do NOT include explanations, notes, headings, markdown, or extra text.
- Return only raw questions.
 `,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const aiResponse = await askAi(messages);

    if (!aiResponse) {
      return res
        .status(500)
        .json({ error: "AI failed to generate questions." });
    }

    const questionsArray = aiResponse
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0)
      .slice(0, 15);

    if (questionsArray.length === 0) {
      return res
        .status(500)
        .json({ error: "AI failed to generate questions." });
    }

    user.credits -= 50;
    await user.save();

    const mockInterview = await mockInterviewModel.create({
      userId: user._id,
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: questionsArray.map((q, index) => ({
        question: q,
        // difficulty: ["Easy", "Medium", "Hard"][Math.floor(index / (questionsArray.length / 3))],
        // timeLimit: [60, 90, 120][Math.floor(index / (questionsArray.length / 3))]
        difficulty: [
          "Easy",
          "Easy",
          "Easy",
          "Easy",
          "Easy",
          "Medium",
          "Medium",
          "Medium",
          "Medium",
          "Medium",
          "Medium",
          "Hard",
          "Hard",
          "Hard",
          "Hard",
        ][index],
        timeLimit: [
          60, 60, 60, 60, 60, 90, 90, 90, 90, 90, 90, 120, 120, 120, 120,
        ][index],
      })),
    });

    res.status(200).json({
      message: "Mock interview questions generated successfully.",
      mockInterviewId: mockInterview._id,
      creditsLeft: user.credits,
      fullName: user.fullName,
      questions: mockInterview.questions,
    });
  } catch (err) {
    console.error("Error in generateQuestionsController:", err);
    return res.status(500).json({
      error: "Failed to generate mock interview questions.",
    });
  }
}

async function submitAnswerController(req, res) {
  try {
    const { mockInterviewId, questionIndex, answer, timeTaken } = req.body;

    const mockInterview = await mockInterviewModel.findById(mockInterviewId);

    if (!mockInterview) {
      return res
        .status(404)
        .json({ error: "Mock interview session not found." });
    }

    const question = mockInterview.questions[questionIndex];

    // if no answer

    if (!answer) {
      question.score = 0;
      question.feedback = "You did not submit an answer for this question.";
      question.answer = "";

      await mockInterview.save();

      return res.json({
        feedback: question.feedback,
      });
    }

    if (timeTaken > question.timeLimit) {
      question.score = 0;
      question.feedback = `You exceeded the time limit of ${question.timeLimit} seconds.`;
      question.answer = answer;

      await mockInterview.save();

      return res.json({
        feedback: question.feedback,
      });
    }

    const messages = [
      {
        role: "system",
        content: `
You are a professional human interviewer evaluating a candidate's answer in a real interview.

Evaluate naturally and fairly, like a real person would.

Score the answer in these areas (0 to 10):

1. Confidence – Does the answer sound clear, confident, and well-presented?
2. Communication – Is the language simple, clear, and easy to understand?
3. Correctness – Is the answer accurate, relevant, and complete?

Rules:
- Be realistic and unbiased.
- Do not give random high scores.
- If the answer is weak, score low.
- If the answer is strong and detailed, score high.
- Consider clarity, structure, and relevance.

Calculate:
finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

Feedback Rules:
- Write natural human feedback.
- 25 to 30 words only.
- Sound like real interview feedback.
- Can suggest improvement if needed.
- Do NOT repeat the question.
- Do NOT explain scoring.
- Keep tone professional and honest.

Return ONLY valid JSON in this format:

{
  "confidence": number,
  "communication": number,
  "correctness": number,
  "finalScore": number,
  "feedback": "short human feedback"
}
`,
      },
      {
        role: "user",
        content: `
Question: ${question.question}
Answer: ${answer}
`,
      },
    ];

    const aiResponse = await askAi(messages);

    const parsed = JSON.parse(aiResponse);

    question.answer = answer;
    question.confidence = parsed.confidence;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.score = Number(parsed.finalScore || 0);
    question.feedback = parsed.feedback;

    await mockInterview.save();

    return res.status(200).json({
      feedback: parsed.feedback,
      score: question.score,
      confidence: question.confidence,
      communication: question.communication,
      correctness: question.correctness,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to submit answer and get feedback.",
    });
  }
}

async function getMockInterviewResultController(req, res) {
  try {
    const { mockInterviewId } = req.body;
    const mockInterview = await mockInterviewModel.findById(mockInterviewId);
    if (!mockInterview) {
      return res
        .status(404)
        .json({ error: "Mock interview session not found." });
    }

    const totalQuestions = mockInterview.questions.length;

    let totalScore = 0;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    mockInterview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const finalScore = totalQuestions ? totalScore / totalQuestions : 0;
    const avgConfidence = totalQuestions ? totalConfidence / totalQuestions : 0;
    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;
    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    mockInterview.finalScore = finalScore;
    mockInterview.status = "Completed";

    await mockInterview.save();

    return res.status(200).json({
      finalScore: Number(finalScore.toFixed(1)),
      avgConfidence: Number(avgConfidence.toFixed(1)),
      avgCommunication: Number(avgCommunication.toFixed(1)),
      avgCorrectness: Number(avgCorrectness.toFixed(1)),
      questionsWiseScore: mockInterview.questions.map((q) => ({
        question: q.question,
        answer: q.answer || "",
        score: q.score || 0,
        feedback: q.feedback || 0,
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      })),
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to get mock interview result.",
    });
  }
}

async function getAllMockInterviewsController(req, res) {
  try {
    const userId = req.user.id;
    const mockInterviews = await mockInterviewModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .select("_id role experience mode finalScore status createdAt");

    return res.status(200).json(mockInterviews);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to get mock interview sessions.",
    });
  }
}

async function getMockInterviewController(req, res) {
  try {
    const { id } = req.params;
    const mockInterview = await mockInterviewModel.findById(id);

    if (!mockInterview) {
      return res
        .status(404)
        .json({ error: "Mock interview session not found." });
    }
    const totalQuestions = mockInterview.questions.length;

    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    mockInterview.questions.forEach((q) => {
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const avgConfidence = totalQuestions ? totalConfidence / totalQuestions : 0;
    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;
    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    return res.status(200).json({
      finalScore: mockInterview.finalScore || 0,
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: mockInterview.questions.map((q) => ({
        question: q.question,
        answer: q.answer || "",
        score: q.score || 0,
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
        feedback: q.feedback || "",
      })),
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to get mock interview session.",
    });
  }
}

module.exports = {
  analyzeResumeController,
  generateQuestionsController,
  submitAnswerController,
  getMockInterviewResultController,
  getAllMockInterviewsController,
  getMockInterviewController,
};
