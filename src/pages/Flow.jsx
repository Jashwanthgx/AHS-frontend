import React from "react";
import { Link } from "react-router-dom";

export default function FlowPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-inter text-slate-900">
      <main className="flex-grow flex flex-col w-full max-w-[1200px] mx-auto px-6 py-12 gap-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Job Application Flow</h1>
          <p className="text-lg text-slate-500 mt-4 max-w-[36rem] mx-auto">
            Follow this flow to apply for a job and schedule an interview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950 mb-4">Step 1: Apply</h2>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">Fill out your personal information and upload your resume.</p>
            </div>
            <Link to="/apply" className="bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95 duration-150 ease-in-out cursor-pointer inline-block">
              Start Application
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950 mb-4">Step 2: Schedule</h2>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">Choose a time for your initial AI or recruiter screening.</p>
            </div>
            <Link to="/schedule" className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer inline-block">
              View Schedule Options
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950 mb-4">Step 3: Success</h2>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">Your application is submitted and you're ready to go.</p>
            </div>
            <Link to="/success" className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer inline-block">
              View Success Screen
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
