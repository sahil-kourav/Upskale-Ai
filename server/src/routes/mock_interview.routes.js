const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const diskUpload = require("../middleware/diskUpload");
const mockInterview = require("../controllers/mock_interview.controller");
const mockRouter = express.Router();

mockRouter.post(
  "/analyze-resume",
  authMiddleware.authUser,
  diskUpload.single("resume"),
  mockInterview.analyzeResumeController,
);
mockRouter.post(
  "/generate-questions",
  authMiddleware.authUser,
  mockInterview.generateQuestionsController,
);
mockRouter.post(
  "/submit-answer",
  authMiddleware.authUser,
  mockInterview.submitAnswerController,
);
mockRouter.post(
  "/get-result",
  authMiddleware.authUser,
  mockInterview.getMockInterviewResultController,
);
mockRouter.get(
  "/get-all-mock-interviews",
  authMiddleware.authUser,
  mockInterview.getAllMockInterviewsController,
);

mockRouter.get(
  "/get-mock-interview/:id",
  authMiddleware.authUser,
  mockInterview.getMockInterviewController,
);

module.exports = mockRouter;
