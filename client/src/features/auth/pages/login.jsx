import { useState } from "react";
import { FiMail, FiLock, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function Login() {
  const navigate = useNavigate();

  const { loading, handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Logging in as ${form.email}`);
    handleLogin({ email, password})
    navigate("/");
  };

  if(loading){
    return <Loading />
  }



  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />

      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 relative z-10">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <FiX size={18} />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 font-stretch-extra-expanded">
            JOBREADY AI
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Login to your account and get job ready with AI
          </p>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all duration-150 mb-4">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Login Heading */}
        {/* <h2 className="text-sm font-semibold text-gray-900 mb-3">Login to your account</h2> */}

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
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
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
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          {/* Forgot Password */}
          {/* <div className="text-right">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 hover:underline transition">
              Forgot password?
            </a>
          </div> */}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white text-sm font-semibold py-3 rounded-xl hover:bg-black active:scale-95 transition-all duration-150 mt-1"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-gray-900 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
