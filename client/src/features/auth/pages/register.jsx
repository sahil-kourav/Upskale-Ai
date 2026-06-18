import { PencilSparkles } from "lucide-react";
import { useState } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiPhone,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { notify } from "../../../utils/toast";
import { useAuth } from "../hooks/useAuth";
import Loading from "../../../components/Loading";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.warning("Password must contain at least 8 characters");

      return;
    }

    const toastId = notify.loading("Creating account...");

    try {
      await handleRegister({
        fullName,
        phone,
        email,
        password,
      });

      notify.success(toastId, "Welcome aboard 👋");

      navigate("/");
    } catch (err) {
      notify.error(
        toastId,

        err?.response?.data?.message || "Registration failed",
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-10">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 relative z-10">
          <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-700 cursor-pointer hover:text-gray-800 transition p-1 rounded-full hover:bg-gray-200"
          aria-label="Close"
        >
          <FiX size={18} />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
            <p className="inline-flex items-center group">
              {/* Logo */}
              <div className="flex items-center justify-center transition mr-2 group-hover:scale-105">
                <PencilSparkles className="w-5 h-5 text-gray-800" />
              </div>

              <div>
                <p className="text-gray-800 text-[20px]  font-semibold tracking-tight">
                  Upskale AI
                </p>
              </div>
            </p>
          <p className="text-sm text-gray-500 mt-2">
            Create your account and get job ready with AI
          </p>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-2 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all duration-150 mb-3"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Full Name */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-3 focus-within:border-gray-400 transition">
            <FiUser className="text-gray-400 shrink-0" size={16} />
            <input
              type="text"
              name="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              required
              autoComplete="name"
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-gray-800"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-3 focus-within:border-gray-400 transition">
            <FiMail className="text-gray-400 shrink-0" size={16} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
              autoComplete="email"
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-gray-800"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-3 focus-within:border-gray-400 transition">
            <FiPhone className="text-gray-400 shrink-0" size={16} />
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 12345 67890"
              required
              autoComplete="tel"
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-gray-800"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-3 focus-within:border-gray-400 transition">
            <FiLock className="text-gray-400 shrink-0" size={16} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={8}
              autoComplete="new-password"
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full group flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 cursor-pointer text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 mt-2 shadow-lg shadow-violet-500/25"
          >
            {loading ? (
              <>
                Creating account...
              </>
            ) : (
              <>
                Create account
                <FiArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-gray-900 font-semibold cursor-pointer hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
