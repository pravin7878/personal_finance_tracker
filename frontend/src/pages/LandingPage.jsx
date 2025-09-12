import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Take Control of Your <span className="text-indigo-600">Finances</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Track your income and expenses, manage your balance, and stay on top of your budget 
          with our simple and secure finance tracker.
        </p>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div className="p-6 shadow rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">💸 Track Spending</h3>
            <p className="text-gray-600">
              Record your transactions easily and see where your money goes.
            </p>
          </div>
          <div className="p-6 shadow rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">📊 See Balance</h3>
            <p className="text-gray-600">
              Get real-time updates on your current balance anytime, anywhere.
            </p>
          </div>
          <div className="p-6 shadow rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure Login</h3>
            <p className="text-gray-600">
              Your data is safe with us using authentication and encrypted storage.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-4">
        © {new Date().getFullYear()} Finance Tracker. All rights reserved.
      </footer>
    </div>
  );
}
