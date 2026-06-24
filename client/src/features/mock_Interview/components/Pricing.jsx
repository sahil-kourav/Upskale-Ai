import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
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
      const amount = plan.id === "go" ? 299 : plan.id === "pro" ? 599 : 0;

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/payment/create`,
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
              `${import.meta.env.VITE_SERVER_URL}/api/payment/verify`,
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
    <div className="min-h-screen bg-[#161b27] py-16 px-6">
      <div className="max-w-6xl mx-auto mb-14 flex items-start gap-4">
        <div className="text-left sm:text-center w-full">
          <h1 className="text-4xl font-semibold text-gray-100">Choose Your Plan</h1>
          <p className="text-gray-400 mt-3 text-lg">
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
              className={`relative rounded-3xl p-6 bg-[#1c2333] border-2 transition-all duration-300
                ${
                  isSelected
                    ? "border-emerald-500 shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-500/20 scale-105 z-10"
                    : "border-[#2a3349] shadow-md hover:border-emerald-500/40 hover:shadow-lg"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >
              {/* Selected indicator - sits on top so it's unmistakable */}
              {isSelected && (
                <div className="absolute -top-3 -left-3 bg-emerald-500 text-white rounded-full p-2 shadow-lg shadow-emerald-500/40">
                  <FaCheckCircle className="text-sm" />
                </div>
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 bg-emerald-500 text-white text-xs px-4 py-1 rounded-full shadow shadow-emerald-500/30">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-6 right-6 bg-[#2a3349] text-gray-300 text-xs px-3 py-1 rounded-full">
                  Default
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-100">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-bold text-emerald-400">
                  {plan.price}
                </span>
                <p className="text-gray-400 mt-1">{plan.credits} Credits</p>
              </div>

              {/* Description */}
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-400 text-sm" />
                    <span className="text-gray-300 text-sm">{feature}</span>
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
                  className={`w-full mt-8 py-2.5 rounded-xl font-normal cursor-pointer transition ${
                    isSelected
                      ? "bg-emerald-500 text-white hover:bg-emerald-400"
                      : "border border-[#2a3349] text-gray-300 hover:bg-emerald-500/10 hover:border-emerald-500/40"
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