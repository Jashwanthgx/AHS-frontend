import React from "react";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6 text-slate-900 relative overflow-hidden font-inter">
      {/* Subtle Background Elements for Splash Screen Feel */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-50 to-white opacity-50 z-0 pointer-events-none"></div>
      
      {/* Main Content Container */}
      <main className="max-w-[48rem] w-full relative z-10 flex flex-col items-center text-center">
        {/* AI Flourish & Success Icon */}
        <div className="relative mb-8">
          {/* Outer Glow / Halo */}
          <div className="absolute inset-0 bg-blue-50 rounded-full blur-2xl opacity-60 scale-150 animate-pulse" style={{ animationDuration: "3s" }}></div>
          
          {/* Icon Container */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative z-10 border border-slate-200 shadow-md">
            <span className="material-symbols-outlined text-blue-600 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
          </div>
          
          {/* Small Sparkle Detail */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center z-25 shadow-sm border border-slate-200">
            <span className="material-symbols-outlined text-blue-500 text-sm">auto_awesome</span>
          </div>
        </div>

        {/* Typography */}
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Application Received</h1>
        <p className="text-lg text-slate-500 max-w-[36rem] mx-auto mb-8 leading-relaxed">
          Thank you for applying. Our recruitment team has successfully recorded your details and is currently reviewing your profile against the role requirements.
        </p>

        {/* Next Steps Bento Grid */}
        <div className="w-full text-left bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">What happens next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                <span className="material-symbols-outlined">troubleshoot</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">AI Pre-Screen</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Our system highlights your key strengths and skills alignment for the hiring team.</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 -left-3 w-3 border-t-2 border-dashed border-slate-200"></div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Team Review</h3>
              <p className="text-slate-500 text-sm leading-relaxed">The hiring manager reviews your augmented profile and full application details.</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 -left-3 w-3 border-t-2 border-dashed border-slate-200"></div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Status Update</h3>
              <p className="text-slate-500 text-sm leading-relaxed">You will receive an email regarding the next steps within 2-3 business days.</p>
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <Link to="/" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95 duration-150 ease-in-out cursor-pointer">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Jobs
        </Link>
      </main>
    </div>
  );
}
