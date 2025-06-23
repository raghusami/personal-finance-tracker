// src/pages/LoginPage.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import loginimage from "../../images/login-page.png"; // <- Use your uploaded image path here

const LoginPage = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.get("http://localhost:4000/users");
      const user = res.data.find(
        (u: any) =>
          (u.email === usernameOrEmail || u.username === usernameOrEmail) &&
          u.password === password
      );

      if (user && agree) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Invalid credentials or terms not agreed.");
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  };

return (
  <div className="min-h-screen grid lg:grid-cols-2 bg-white overflow-hidden">
    {/* Left Side Illustration */}
    <div className="hidden lg:flex items-center justify-center bg-[#f9f6ff] p-8 animate-fade-in">
      <img
        src={loginimage}
        alt="Finance Infographic Illustration"
        className="max-w-md w-full"
      />
    </div>

    {/* Right Side Login Form */}
    <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl  animate-slide-up space-y-6">
        {/* Logo & Tagline */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#422ad5]">FinVista</h1>
          <p className="text-gray-500 text-sm mt-5">
            Seamless Access, Secure Connection – Your Gateway to Smarter Finances.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Email or Username"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-1 focus:ring-[#422ad5] transition-all duration-150"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-[#422ad5] transition-all duration-150"
              required
            />
            <span
              className="absolute top-3.5 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Checkbox + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <span>
                I agree to{" "}
                <a href="#" className="text-[#422ad5] underline">
                  terms and conditions
                </a>
              </span>
            </label>
            <a href="#" className="text-[#422ad5] hover:underline">
              Forgot Password?
            </a>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn bg-[#422ad5] hover:bg-[#341eae] text-white w-full text-md"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#422ad5] font-semibold hover:underline">
            Create One
          </Link>
        </p>
      </div>
    </div>
  </div>
);

};

export default LoginPage;
