// src/pages/LandingPage.tsx

import {
  ArrowTrendingUpIcon,
  ChartPieIcon,
  CurrencyRupeeIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import landigImage from "../../images/dashboard-preview.png";
import { Helmet } from "react-helmet";
import logo from "../../images/finvita-logo.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content text-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary border-t-transparent mb-4" />
        <h2 className="text-2xl font-semibold text-primary">FinVista</h2>
        <p className="mt-2 max-w-md">
          Smart Finance. Simple Decisions.
          <br />
          We’re getting your dashboard ready...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-base-100 text-base-content">
      <Helmet>
        <title>FinVista | Smart Finance. Simple Decisions.</title>
        <meta name="description" content="Track income, manage expenses, grow savings and investments with FinVista." />
      </Helmet>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-base-100 sticky top-0 z-50">
        <img src={logo} alt="FinVista Logo" className="h-12" />
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#preview" className="hover:text-primary">Preview</a>
          <a href="#testimonials" className="hover:text-primary">Testimonials</a>
          <a href="#tips" className="hover:text-primary">Tips</a>
          <a href="#newsletter" className="hover:text-primary">Contact</a>
        </nav>
        <div className="md:hidden">
          <button className="btn btn-sm btn-outline" aria-label="Open menu">☰</button>
        </div>
        <div className="hidden md:flex gap-3 items-center">
          <a href="/login" className="btn btn-sm btn-outline" aria-label="Login">Login</a>
          <a href="/register" className="btn btn-sm btn-primary" aria-label="Sign up for FinVista">Sign Up</a>
        </div>
      </header>

      {/* Hero */}
      <motion.section className="min-h-[80vh] bg-base-200 flex items-center justify-center px-6" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold">
            Take Control of Your Money with <span className="text-primary">FinVista</span>
          </h1>
          <p className="mt-4 text-lg">
            Track income, manage expenses, grow your savings and investments — all in one place.
          </p>
          <p className="text-sm text-base-content/70 mt-2">Still wondering where your money goes? FinVista gives you answers instantly.</p>
          <div className="mt-6 flex justify-center gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/register" className="btn btn-primary">Get Started</motion.a>
            <a href="/login" className="btn btn-outline">Login</a>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section id="features" className="py-12 bg-base-100" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">Everything You Need to Manage Finances</h2>
          <p className="text-base-content/70">Built for Individuals, Couples & Families</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 px-6">
          {[
            { icon: <CurrencyRupeeIcon className="w-8 h-8 text-primary" />, title: "Income & Expenses", desc: "Record and analyze your earnings and spending habits." },
            { icon: <RectangleStackIcon className="w-8 h-8 text-primary" />, title: "Savings Goals", desc: "Plan for dreams like travel, marriage, or emergency funds." },
            { icon: <ArrowTrendingUpIcon className="w-8 h-8 text-primary" />, title: "Investments", desc: "Track where you invest monthly (SIP, Stocks, etc)." },
            { icon: <ChartPieIcon className="w-8 h-8 text-primary" />, title: "Visual Dashboard", desc: "All-in-one view with graphs and top 5 expenses." },
          ].map((item, idx) => (
            <div key={idx} className="card bg-base-100 shadow hover:shadow-md transition">
              <div className="card-body items-center text-center">
                {item.icon}
                <h3 className="font-semibold text-lg mt-2">{item.title}</h3>
                <p className="text-sm text-base-content/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Preview */}
      <motion.section id="preview" className="bg-base-200 py-12 px-6 text-center" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-2xl font-bold mb-6">Preview Your Personal Dashboard</h3>
        <div className="flex justify-center">
          <img src={landigImage} alt="Dashboard Preview" className="rounded-2xl shadow-xl w-full max-w-4xl" loading="lazy" />
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section id="testimonials" className="py-12 bg-base-100 px-6" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">Why Users Love FinVista</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { msg: "I never knew where my money went. FinVista gave me total clarity and peace.", name: "– Arjun, Software Engineer" },
            { msg: "Helps our family track goals, save more and plan vacations better.", name: "– Rekha & Prabhu" },
            { msg: "The dashboard is super clean. I love the top 5 expenses section!", name: "– Sneha, Freelancer" },
          ].map((testi, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-base-200 shadow-sm">
              <p className="italic">“{testi.msg}”</p>
              <p className="mt-3 text-sm font-semibold text-primary">{testi.name}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Smart Finance Tips */}
      <motion.section id="tips" className="py-12 bg-base-100 px-6" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-2xl font-bold mb-4 text-center">💡 Learn While You Track</h3>
        <p className="text-center text-base-content/70 mb-8">
          Get bite-sized finance tips every time you open the app.
        </p>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-base-content/80">
          {["What is budgeting and why it matters", "Smart ways to save ₹1,000 every month", "Start investing with just ₹500", "Understanding inflation, mutual funds, and credit scores", "Simple budget planning based on your income", "Common money mistakes and how to avoid them"].map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Financial Wisdom Section */}
      <motion.section id="financial-wisdom" className="py-12 bg-base-200 px-6" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-2xl font-bold text-center mb-4">📘 Financial Wisdom for Everyday Life</h3>
        <p className="text-center text-base-content/70 mb-8 max-w-3xl mx-auto">
          Simple insights from <strong>Rich Dad Poor Dad</strong> and <strong>The Psychology of Money</strong> — directly applied to your financial journey.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[{
            title: "📊 Assets vs. Liabilities",
            tip: "Assets put money in your pocket. Liabilities take it out. Start tracking wisely today.",
          }, {
            title: "🧠 Behavior > Math",
            tip: "Consistency in saving is more powerful than high income. Habit > Hustle.",
          }, {
            title: "🚪 Room for Error",
            tip: "Always keep a safety fund. Life is uncertain — your money plan shouldn't be.",
          }, {
            title: "💸 Wealth is What You Don’t See",
            tip: "Real wealth is built silently — not by spending, but by saving and investing.",
          }].map((card, i) => (
            <div key={i} className="card bg-base-100 shadow hover:shadow-md border border-base-300 p-5 transition">
              <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
              <p className="text-sm text-base-content/80">{card.tip}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section id="newsletter" className="py-12 bg-base-100 text-center" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
        <h3 className="text-2xl font-bold">Stay Updated with FinVista</h3>
        <p className="text-base-content/70 mb-6">Get financial tips and product updates to your inbox.</p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-3 max-w-xl mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing!"); }}>
          <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
          <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
      </motion.section>

      {/* CTA */}
      <section className="py-10 bg-gradient-to-r from-primary to-secondary text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Ready to Take Control of Your Finances?</h3>
        <p>Join thousands who use FinVista to plan and grow wealth, easily.</p>
        <div className="mt-4">
          <a href="/register" className="btn btn-accent btn-wide">Create Account</a>
        </div>
      </section>

      {/* Mini Financial Awareness Quiz */}
      <section className="py-10 bg-base-100 px-6 text-center">
        <h3 className="text-xl font-semibold mb-2">📋 How Financially Aware Are You?</h3>
        <p className="text-base-content/70 mb-4">
          Answer 3 simple questions and get personalized tips.
        </p>
        <a href="/financial-quiz" className="btn btn-outline btn-primary">Take the Quiz</a>
      </section>

      {/* Footer */}
      <footer className="bg-base-200 py-6 px-4 text-center text-sm text-base-content/70">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms</a>
          <a href="mailto:support@finvista.com" className="hover:text-primary">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} FinVista. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;