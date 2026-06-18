const express = require('express');
const authMiddleware = require("../middleware/auth.middleware")
const upload = require("../middleware/file.middleware")
const interviewController = require('../controllers/interview.controller')
const router = express.Router()

/**
 * @route POST /api/interview/
 * @desc Generate an interview report based on the provided resume, self-description, and job description
 * @access Private
 */

router.post('/', authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Get the interview report by interview ID
 * @access Private
 */
router.get('/report/:interviewId', authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @desc Get all interview reports for the authenticated user
 * @access Private
 */
router.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportsController)
 

module.exports = router



