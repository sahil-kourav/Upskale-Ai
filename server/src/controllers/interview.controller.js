const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @desc Generate an interview report based on the provided resume, self-description, and job description
 * @route POST /api/interview/
 * @access Private
 */

async function generateInterviewReportController(req, res) {
  try {
    const resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();

    const { selfDescription, jobDescription } = req.body;

    if (!resumeContent || !selfDescription || !jobDescription) {
      return res
        .status(400)
        .json({
          error: "Resume, self-description, and job description are required",
        });
    }

    const interviewReportByAI = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
    });

    res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to generate interview report" });
  }
}

/** 
 * @desc Get a specific interview report by its ID for the authenticated user
 * @route GET /api/interview/report/:interviewId
 * @access Private
 */

async function getInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({ error: "Interview report not found" });
    }

    res.status(200).json({
      message: "Interview report retrieved successfully",
      interviewReport,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to retrieve interview report" });
  }
}

/**
 * @desc Get all interview reports for the authenticated user
 * @route GET /api/interview/
 * @access Private
 */

async function getAllInterviewReportsController(req, res) {
  try {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
      message: "Interview reports retrieved successfully",
      interviewReports,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to retrieve interview reports" });
  }
}

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController
};
