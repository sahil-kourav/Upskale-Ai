const paymentModel = require("../models/payment.model");
const userModel = require("../models/user.model");
const razorpay = require("../services/razorpay.service");
const crypto = require("crypto");

async function createPaymentController(req, res) {
  try {
    const { planId, amount, credits } = req.body;

    if (!amount || !credits) {
      return res
        .status(400)
        .json({ message: "Amount and credits are required" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await paymentModel.create({
      userId: req.user.id,
      planId,
      amount,
      credits,
      razorpayOrderId: order.id,
      status: "pending",
    });

    res
      .status(201)
      .json({ message: "Payment created successfully", order, payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating payment" });
  }
}

async function verifyPaymentController(req, res) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.error("Invalid signature:", {
        expected: expectedSignature,
        received: razorpaySignature,
      });
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payment = await paymentModel.findOne({ razorpayOrderId });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status === "completed") {
      return res.status(400).json({ message: "Payment already verified" });
    }

    payment.status = "completed";
    payment.razorpayPaymentId = razorpayPaymentId;
    await payment.save();

    const updateUser = await userModel.findByIdAndUpdate(
      payment.userId,
      {
        $inc: { credits: payment.credits },
      },
      { new: true },
    );

    res
      .status(200)
      .json({ message: "Payment verified successfully", payment, updateUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying payment" });
  }
}

module.exports = {
  createPaymentController,
  verifyPaymentController,
};
