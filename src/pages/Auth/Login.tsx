// src/pages/LoginPage.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import loginimage from "../../images/login-page.png";
import logo from "../../images/finvita-logo.png";
import { motion } from "framer-motion";

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
    <>
      <Helmet>
        <title>Login - FinVista</title>
      </Helmet>

      <div className="min-h-screen grid lg:grid-cols-2 bg-base-100 text-base-content overflow-hidden">
        {/* Left Side Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-8 animate-fade-in">
          <img
            src={loginimage}
            alt="Login illustration"
            className="max-w-md w-full"
          />
        </div>

        {/* Right Side Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center px-6 sm:px-10 md:px-16"
        >
          <div className="w-full max-w-md mx-auto bg-base-100 p-8 rounded-2xl shadow-xs space-y-6">
            {/* Logo & Tagline */}
            <div className="text-center mb-6">
              <img src={logo} alt="FinVista Logo" className="h-14 mx-auto mb-5" />
              <p className="text-sm text-base-content mb-10">
                Seamless Access, Secure Connection –
                <br />
                Your Gateway to Smarter Finances.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <FaEnvelope className="absolute top-3.5 left-3 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Email or Username"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="input input-bordered w-full pl-10"
                  required
                />
              </div>

              <div className="relative">
                <FaLock className="absolute top-3.5 left-3 text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pl-10 pr-10"
                  required
                />
                <span
                  className="absolute top-3.5 right-3 text-base-content/50 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

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
                    <a href="#" className="text-primary underline">
                      terms & conditions
                    </a>
                  </span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>

              {error && <p className="text-error text-sm">{error}</p>}

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Login
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-semibold hover:underline"
              >
                Create One
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
