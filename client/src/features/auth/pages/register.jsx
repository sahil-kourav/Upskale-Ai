import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  //   const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const {loading, handleRegister} = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({fullName, phone, email, password})
    navigate("/")
  };

  if(loading){
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden py-10">
      {/* Background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold  text-gray-900">
            JOBREADY AI
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Create your account and get job ready with AI
          </p>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-2 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all duration-150 mb-3">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Heading */}
        {/* <h2 className="text-md font-semibold text-gray-900 mb-3">
          Create account
        </h2> */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Full Name */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-3 focus-within:border-gray-400 transition">
            <FiUser className="text-gray-400 shrink-0" size={16} />
            <input
              type="text"
              name="name"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value)}}
              placeholder="Full name"
              required
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
              onChange={(e) => { setEmail(e.target.value)}}
              placeholder="example@gmail.com"
              required
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
              onChange={(e) => {setPhone(e.target.value)}}
              placeholder="+91 12345 67890"
              required
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
              onChange={(e) => { setPassword(e.target.value)}}
              placeholder="Password"
              required
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-gray-800"
            />
            <button
              type="button"
              onClick={(e) => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          {/* Confirm Password */}
          {/* <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-gray-400 transition">
            <FiLock className="text-gray-400 shrink-0" size={16} />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div> */}

          {/* Password mismatch warning */}
          {/* {form.confirmPassword && form.password !== form.confirmPassword && (
            <p className="text-xs text-red-500 -mt-1">Passwords do not match</p>
          )} */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 cursor-pointer rounded-xl hover:bg-black active:scale-95 transition-all duration-150 mt-1"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-gray-900 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
