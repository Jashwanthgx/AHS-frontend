"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    // Step 2
    experience: "",
    domain: "",
    skills: "",
    // Step 3
    antiBiasConsent: false,
    file: null as File | null,
  });

  const updateForm = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }
    // Final submission
    router.push("/success");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || droppedFile.name.toLowerCase().endsWith('.pdf')) {
        updateForm("file", droppedFile);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-inter">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            TalentBridge
          </Link>
          <div className="text-sm font-medium text-slate-500">
            Application Process
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-[48rem] w-full bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant p-8 relative overflow-hidden">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container-highest -z-10 -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-label-lg font-bold border-2 transition-colors ${
                  step >= num 
                    ? "bg-primary text-on-primary border-primary" 
                    : "bg-surface-container-lowest text-on-surface-variant border-outline-variant"
                }`}
              >
                {step > num ? <span className="material-symbols-outlined text-[20px]">check</span> : num}
              </div>
            ))}
          </div>

          <div className="mb-8 text-center">
            <h1 className="font-display-md text-display-md text-on-background mb-2">
              {step === 1 && "Identity & Links"}
              {step === 2 && "Quick Profile Filters"}
              {step === 3 && "Document Upload & Consent"}
            </h1>
            <p className="font-body-md text-on-surface-variant">
              {step === 1 && "Please provide your contact details and professional profiles."}
              {step === 2 && "Help us understand your background with a few quick questions."}
              {step === 3 && "Upload your resume and review our anti-bias commitment."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="col-span-1 md:col-span-2">
                  <label className="block font-label-md text-on-surface mb-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-4 py-3 rounded border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => updateForm("fullName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-on-surface mb-1">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-4 py-3 rounded border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-on-surface mb-1">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    className="w-full px-4 py-3 rounded border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-on-surface mb-1">GitHub / Portfolio URL</label>
                  <input 
                    type="url" 
                    className="w-full px-4 py-3 rounded border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    placeholder="https://github.com/janedoe"
                    value={formData.github}
                    onChange={(e) => updateForm("github", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-on-surface mb-1">LinkedIn URL</label>
                  <input 
                    type="url" 
                    className="w-full px-4 py-3 rounded border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    placeholder="https://linkedin.com/in/janedoe"
                    value={formData.linkedin}
                    onChange={(e) => updateForm("linkedin", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <label className="block font-label-md text-on-surface mb-1">Years of Experience</label>
                  <select 
                    required
                    className="w-full px-4 py-3 rounded border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    value={formData.experience}
                    onChange={(e) => updateForm("experience", e.target.value)}
                  >
                    <option value="" disabled>Select your experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-9">6-9 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-on-surface mb-1">Primary Domain</label>
                  <select 
                    required
                    className="w-full px-4 py-3 rounded border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    value={formData.domain}
                    onChange={(e) => updateForm("domain", e.target.value)}
                  >
                    <option value="" disabled>Select primary domain</option>
                    <option value="frontend">Frontend Engineering</option>
                    <option value="backend">Backend Engineering</option>
                    <option value="fullstack">Fullstack Engineering</option>
                    <option value="data">Data Science / ML</option>
                    <option value="product">Product Management</option>
                    <option value="design">Product Design</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-on-surface mb-1">Top 3 Core Skills</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    placeholder="e.g., React, Node.js, PostgreSQL"
                    value={formData.skills}
                    onChange={(e) => updateForm("skills", e.target.value)}
                  />
                  <p className="font-body-sm text-on-surface-variant mt-1 text-xs">Separate skills with commas</p>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <label className="block font-label-md text-on-surface mb-2">Resume / CV (PDF Only)</label>
                  <div 
                    className={`w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer relative group ${
                      isDragging 
                        ? "border-primary bg-primary/10" 
                        : "border-outline-variant hover:border-primary hover:bg-surface-container-low"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".pdf,application/pdf" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf')) {
                            updateForm("file", file);
                          } else {
                            alert("Please upload a PDF file.");
                          }
                        }
                      }}
                    />
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform ${isDragging ? 'bg-primary text-white scale-110' : 'bg-surface-container text-primary group-hover:scale-110'}`}>
                      <span className="material-symbols-outlined text-[32px]">
                        {isDragging ? 'file_download' : 'upload_file'}
                      </span>
                    </div>
                    <div className="font-title-md text-on-surface mt-4 text-center font-bold">
                      {formData.file ? formData.file.name : (isDragging ? "Drop PDF here" : "Drag & drop your PDF resume here")}
                    </div>
                    <div className="font-body-sm text-on-surface-variant text-center">
                      {formData.file ? "PDF selected. Click to change." : "or click to browse from your computer (PDF only)"}
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-4 rounded-lg flex items-start gap-4">
                  <div className="mt-1">
                    <input 
                      type="checkbox" 
                      id="antibias"
                      required
                      className="w-5 h-5 accent-primary cursor-pointer"
                      checked={formData.antiBiasConsent}
                      onChange={(e) => updateForm("antiBiasConsent", e.target.checked)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="antibias" className="font-title-md text-on-surface cursor-pointer">Anti-Bias Consent</label>
                    <p className="font-body-sm text-on-surface-variant text-sm mt-1">
                      I understand that TalentBridge uses skill-based matching. To reduce unconscious bias, certain identifying information (like name and photo) may be hidden from hiring managers during the initial review stages.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-outline-variant">
              <button 
                type="button" 
                onClick={step > 1 ? prevStep : () => router.back()}
                className="px-6 py-2 rounded border border-outline text-on-surface hover:bg-surface-container transition-colors font-label-md"
              >
                Back
              </button>
              
              <button 
                type="submit" 
                className="px-8 py-2 rounded bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors font-label-md flex items-center gap-2"
              >
                {step === 3 ? "Submit Application" : "Continue"}
                {step < 3 && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 w-full mt-auto py-6">
        <div className="text-center font-inter text-xs text-slate-500">
          © 2024 TalentBridge. The Modern Way to Hire Top Talent.
        </div>
      </footer>
    </div>
  );
}
