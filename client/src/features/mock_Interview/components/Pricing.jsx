import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { motion } from "motion/react";
import axios from "axios";
import { useAuth } from "../../auth/hooks/useAuth";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect for beginners starting interview preparation.",
    features: [
      "100 AI Interview Credits",
      "Basic Performance Report",
      "Voice Interview Access",
      "Limited History Tracking",
    ],
    default: true,
  },
  {
    id: "go",
    name: "Go Pack",
    price: "₹299",
    credits: 450,
    description: "Great for focused practice and skill improvement.",
    features: [
      "450 AI Interview Credits",
      "Detailed Feedback",
      "Performance Analytics",
      "Full Interview History",
    ],
  },
  {
    id: "pro",
    name: "Pro Pack",
    price: "₹599",
    credits: 1000,
    description: "Best value for serious job preparation.",
    features: [
      "1000 AI Interview Credits",
      "Advanced AI Feedback",
      "Personalized Study Plan",
      "Full Interview History & Analytics",
    ],
    badge: "Best Value",
  },
];

const Pricing = () => {
  const { user, setUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const navigate = useNavigate();

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);
      const amount = plan.id === "go" ? 199 : plan.id === "pro" ? 399 : 0;

      const response = await axios.post(
        "http://localhost:8080/api/payment/create",
        {
          planId: plan.id,
          amount: amount,
          credits: plan.credits,
        },
        {
          withCredentials: true,
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: response.data.order.amount,
        currency: "INR",
        name: "Upskale Ai",
        description: `Purchase of ${plan.name}`,
        order_id: response.data.order.id,

        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:8080/api/payment/verify",
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
              {
                withCredentials: true,
              },
            );

            setUser(verifyResponse.data.updateUser);

            alert(
              `Payment successful! You now have ${verifyResponse.data.updateUser.credits} credits.`,
            );
            navigate("/");
          } catch (err) {
            console.error("Verification failed:", err.response?.data);
          } finally {
            setLoadingPlan(null);
          }
        },
        theme: {
          color: "#10b981",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoadingPlan(null);
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-16 px-6">
      <div className="max-w-6xl mx-auto mb-14 flex items-start gap-4">
        <button
          onClick={() => navigate("/")}
          className="mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-800">Choose Your Plan</h1>
          <p className="text-gray-500 mt-3 text-lg">
            Flexible pricing to match your interview preparation
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              whileHover={
                !plan.default ? { scale: isSelected ? 1.05 : 1.02 } : {}
              }
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-3xl p-6 bg-white border-2 transition-all duration-300
                ${
                  isSelected
                    ? "border-emerald-500 shadow-2xl shadow-emerald-200/60 ring-4 ring-emerald-100 scale-105 z-10"
                    : "border-gray-200 shadow-md hover:border-emerald-200 hover:shadow-lg"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >
              {/* Selected indicator - sits on top so it's unmistakable */}
              {isSelected && (
                <div className="absolute -top-3 -left-3 bg-emerald-500 text-white rounded-full p-2 shadow-lg">
                  <FaCheckCircle className="text-sm" />
                </div>
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 bg-emerald-600 text-white text-xs px-4 py-1 rounded-full shadow">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-6 right-6 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  Default
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-800">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-bold text-emerald-600">
                  {plan.price}
                </span>
                <p className="text-gray-500 mt-1">{plan.credits} Credits</p>
              </div>

              {/* Description */}
              <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-500 text-sm" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              {!plan.default && (
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id);
                    } else {
                      handlePayment(plan);
                    }
                  }}
                  className={`w-full mt-8 py-2.5 rounded-xl text-gray-900 font-normal cursor-pointer transition ${
                    isSelected
                      ? "bg-emerald-600 text-white hover:opacity-90"
                      : " border border-gray-300 hover:bg-emerald-50"
                  }`}
                >
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Payment"
                      : "Select Plan"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
