const express = require("express")
const router = express.Router()
const { createPaymentController, verifyPaymentController } = require("../controllers/payment.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/create", authMiddleware.authUser, createPaymentController)
router.post("/verify", authMiddleware.authUser, verifyPaymentController)

module.exports = router