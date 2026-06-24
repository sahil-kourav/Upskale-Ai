const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");
const userModel = require("../models/user.model")
/**
 * @desc Generate an interview report based on the provided resume, self-description, and job description
 * @route POST /api/interview/
 * @access Private
 */


async function generateInterviewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Resume is required",
      });
    }

    const { selfDescription, jobDescription } = req.body;

    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        error:
          "Self description and job description are required",
      });
    }

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        error:
          "Insufficient credits. You need at least 50 credits to generate a report.",
      });
    }


    const resumeContent =
      await new pdfParse.PDFParse(
        Uint8Array.from(req.file.buffer)
      ).getText();

    if (!resumeContent?.text) {
      return res.status(400).json({
        error: "Unable to read resume",
      });
    }


    const interviewReportByAI =
      await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
      });

    user.credits -= 50;

    await user.save();

    const interviewReport =
      await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI,
      });

    return res.status(201).json({
      message:
        "Interview report generated successfully",

      creditsLeft: user.credits,

      interviewReport,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error:
        "Failed to generate interview report",
    });
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


async function generateResumePdfController(req, res){

  const { interviewReportId } = req.params;

  const interviewReport = await interviewReportModel.findById(interviewReportId)

  if(!interviewReport) {
    res.status(404).json({
     message: "Interview report not found"
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport

  const pdfBuffer = await generateResumePdf({
    resume, jobDescription, selfDescription
  })

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
  })

  res.send(pdfBuffer)

}

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController
};
