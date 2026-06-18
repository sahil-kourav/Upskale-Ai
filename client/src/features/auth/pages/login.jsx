import { Link } from "react-router";
import { PencilSparkles } from "lucide-react";
import { useState } from "react";
import {
  FiMail,
  FiArrowRight,
  FiLock,
  FiX,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { notify } from "../../../utils/toast";
import { useAuth } from "../hooks/useAuth";
import Loading from "../../../components/Loading";

export default function Login() {
  const navigate = useNavigate();

  const { handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = notify.loading("Logging in...");

    try {
      await handleLogin({
        email,
        password,
      });

      notify.success(toastId, "Welcome back 👋");

      navigate("/", {
        replace: true,
      });
    } catch (err) {
      notify.error(
        toastId,

        err?.response?.data?.message || "Invalid email or password",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 relative z-10">
        {/* Close Button */}
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
                <p className="text-gray-800 text-[20px] font-semibold tracking-tight">
                  Upskale AI
                </p>
              </div>
            </p>
          <p className="text-sm text-gray-500 mt-2">
            Login to your account and get job ready with AI
          </p>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 active:scale-95 transition-all duration-150 mb-4"
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
          {/* Email */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-gray-400 transition">
            <FiMail className="text-gray-400 shrink-0" size={16} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              autoComplete="email"
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-gray-800"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-gray-400 transition">
            <FiLock className="text-gray-400 shrink-0" size={16} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 cursor-pointer text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 mt-2 shadow-lg shadow-violet-500/25"
          >
            {loading ? (
              <>Signing in...</>
            ) : (
              <>
                Login in
                <FiArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-gray-900 cursor-pointer font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
