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

      {/* Top Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-base-100 sticky top-0 z-50 shadow-sm">
        <img src={logo} alt="FinVista Logo" className="h-12" />
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#preview" className="hover:text-primary">Preview</a>
          <a href="#testimonials" className="hover:text-primary">Testimonials</a>
          <a href="#newsletter" className="hover:text-primary">Contact</a>
        </nav>
        <div className="md:hidden">
          <button className="btn btn-sm btn-outline">☰</button>
        </div>
        <div className="hidden md:flex gap-3 items-center">
          <a href="/login" className="btn btn-sm btn-outline">Login</a>
          <a href="/register" className="btn btn-sm btn-primary">Sign Up</a>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section className="min-h-[80vh] bg-base-200 flex items-center justify-center px-6" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp}>
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold">
            Take Control of Your Money with <span className="text-primary">FinVista</span>
          </h1>
          <p className="mt-4 text-lg">
            Track income, manage expenses, grow your savings and investments — all in one place.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a href="/register" className="btn btn-primary">Get Started</a>
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
