"use client";

import React from "react";
import Link from "next/link";

export default function EmployersPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-inter">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-zinc-200 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
            TalentBridge
          </Link>
          <div className="text-sm font-medium text-zinc-500">
            Employer Portal
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 w-full">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-6 group self-center md:self-auto md:mr-[320px]"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Home
        </Link>

        <div className="w-full max-w-[400px] sm:min-w-[380px] shrink-0 bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[32px]">business_center</span>
          </div>
          
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Employer Portal
          </h1>
          <p className="text-zinc-500 mb-8">
            Sign in to manage your job listings, review candidate profiles, and streamline your hiring process.
          </p>

          <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Work Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 shadow-sm">
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-100">
            <p className="text-sm text-zinc-500">
              Interested in hiring on TalentBridge? <a href="#" className="text-blue-600 hover:underline">Contact Sales</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
