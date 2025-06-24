// src/pages/RegisterPage.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createUser } from "../../services/UserService";
import type { UserProfile } from "../../types/UserProfile";
import registerImage from "../../images/login-page.png";
import logo from "../../images/finvita-logo.png";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserProfile>({
    id: crypto.randomUUID(),
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    username: "",
    password: "",
    isCoupleModeEnabled: false,
    preferredCurrency: "INR",
    incomeGoal: undefined,
    savingGoal: undefined,
    investmentGoal: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(formData);
      setMessage("Registration successful!");
      navigate("/login");
    } catch {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - FinVista</title>
      </Helmet>

      <div className="grid lg:grid-cols-2 min-h-screen bg-base-100 text-base-content">
        {/* Left Side Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-10">
          <img
            src={registerImage}
            alt="Register Illustration"
            className="max-w-md w-full"
          />
        </div>

        {/* Right Side Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center px-4 sm:px-8 min-h-screen py-6"
        >
          <div className="w-full max-w-2xl bg-base-100 rounded-xl p-10 shadow-xs space-y-6">
            {/* Logo + Tagline */}
            <div className="text-center mb-2">
              <img src={logo} alt="FinVista Logo" className="h-12 mx-auto mb-2" />
              <p className="text-sm opacity-60">Track. Plan. Grow.</p>
            </div>

            <h2 className="text-2xl font-semibold text-center">
              Create Your Account
            </h2>

            {message && (
              <p className="text-success text-sm text-center">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isCoupleModeEnabled"
                  checked={formData.isCoupleModeEnabled}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">Enable Couple Mode</span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  name="incomeGoal"
                  placeholder="Income Goal"
                  value={formData.incomeGoal || ""}
                  onChange={handleChange}
                  className="input input-bordered"
                />
                <input
                  type="number"
                  name="savingGoal"
                  placeholder="Saving Goal"
                  value={formData.savingGoal || ""}
                  onChange={handleChange}
                  className="input input-bordered"
                />
                <input
                  type="number"
                  name="investmentGoal"
                  placeholder="Investment Goal"
                  value={formData.investmentGoal || ""}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>

              <div>
                <label className="label text-sm font-medium mb-1">
                  Preferred Currency
                </label>
                <select
                  name="preferredCurrency"
                  value={formData.preferredCurrency}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                </select>
              </div>

              <button
                type="submit"
                className={`btn btn-primary w-full mt-2 ${loading ? "loading" : ""}`}
              >
                {loading ? "Creating Account..." : "Register"}
              </button>

              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
