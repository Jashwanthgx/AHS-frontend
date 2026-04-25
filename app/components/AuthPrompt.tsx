"use client";

import React from "react";
import Link from "next/link";

interface AuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number | null;
}

export default function AuthPrompt({ isOpen, onClose, jobId }: AuthPromptProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 fade-in duration-300 border border-zinc-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[32px]">waving_hand</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Almost there!</h2>
          <p className="text-zinc-500">
            Sign in if you want to track your applications later, or just skip it and apply as a guest. We don&apos;t want to slow you down.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => alert("Simulated Social Login: In a real app, this would redirect to Google/LinkedIn OAuth.")}
            className="w-full flex items-center justify-center gap-3 bg-white border border-zinc-200 text-zinc-900 font-bold py-4 rounded-2xl hover:bg-zinc-50 transition-all active:scale-[0.98]"
          >
            <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
          
          <button 
            onClick={() => alert("Simulated Social Login: In a real app, this would redirect to LinkedIn OAuth.")}
            className="w-full flex items-center justify-center gap-3 bg-[#0077b5] text-white font-bold py-4 rounded-2xl hover:bg-[#006399] transition-all active:scale-[0.98]"
          >
            <img src="https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg" className="w-5 h-5 invert brightness-0" alt="LinkedIn" />
            Continue with LinkedIn
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-zinc-400 font-bold tracking-widest">Or</span>
            </div>
          </div>

          <Link 
            href={`/apply?jobId=${jobId}`}
            className="w-full bg-zinc-900 text-white text-center font-bold py-4 rounded-2xl hover:bg-zinc-800 transition-all active:scale-[0.98]"
          >
            Continue as Guest
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-400">
          By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
