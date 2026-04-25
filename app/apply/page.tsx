"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { JOBS } from "../data/jobs";

export default function ApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const selectedJob = JOBS.find(j => j.id === Number(jobId));

  const [step, setStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: "",
    email: "",
    phone: "",
    location: "",
    // Step 2: Docs & Links
    github: "",
    linkedin: "",
    resumeName: "", // We can't store File object in localStorage easily, so we store the name
    // Step 3: Experience
    experience: "",
    domain: "",
    skills: "",
    summary: "",
    // Step 4: Custom Questions
    whyRole: "",
    noticePeriod: "",
    salaryExpectation: "",
    // Consent
    antiBiasConsent: false,
  });

  // Local Storage Persistence
  useEffect(() => {
    const saved = localStorage.getItem("talentbridge_draft");
    if (saved) {
      try {
        setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  useEffect(() => {
    const { resumeName, ...rest } = formData; // Don't save transient UI state if needed
    localStorage.setItem("talentbridge_draft", JSON.stringify(formData));
  }, [formData]);

  const updateForm = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.phone && formData.location;
      case 2:
        return true; // Resume is technically optional in this mock for now, but we'll check profiles
      case 3:
        return formData.experience && formData.domain && formData.skills;
      case 4:
        return formData.whyRole && formData.noticePeriod;
      case 5:
        return formData.antiBiasConsent;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, 5));
      window.scrollTo(0, 0);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      nextStep();
      return;
    }

    if (!formData.antiBiasConsent) {
      alert("Please accept the Anti-Bias Consent.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    localStorage.removeItem("talentbridge_draft");
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
        updateForm("resumeName", droppedFile.name);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-inter">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
            TalentBridge
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500 bg-zinc-50 px-4 py-1.5 rounded-full border border-zinc-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Applying for: <span className="text-zinc-900 font-bold ml-1">{selectedJob?.title || "General Application"}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-3xl w-full bg-white rounded-[32px] shadow-2xl shadow-blue-600/5 border border-zinc-200 p-8 md:p-12 relative overflow-hidden">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12 relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -z-10 -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -z-10 -translate-y-1/2 transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            ></div>
            
            {[1, 2, 3, 4, 5].map((num) => (
              <div 
                key={num} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                  step >= num 
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                    : "bg-white text-zinc-300 border-zinc-100"
                }`}
              >
                {step > num ? <span className="material-symbols-outlined text-[20px]">check</span> : num}
              </div>
            ))}
          </div>

          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-zinc-900 mb-3">
              {step === 1 && "Personal Information"}
              {step === 2 && "Profiles & Resume"}
              {step === 3 && "Experience & Skills"}
              {step === 4 && "Job-Specific Questions"}
              {step === 5 && "Review & Submit"}
            </h1>
            <p className="text-zinc-500 font-medium">
              {step === 1 && "Start with the basics so we can get in touch."}
              {step === 2 && "Upload your CV and link your professional presence."}
              {step === 3 && "Tell us about your professional background."}
              {step === 4 && "Help us understand why you're a great fit for this role."}
              {step === 5 && "Almost there! Double check your details before sending."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Step 1: Personal */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-zinc-900 mb-2">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => updateForm("fullName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-900 mb-2">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-900 mb-2">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-zinc-900 mb-2">Current Location</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400"
                    placeholder="e.g. Bangalore, Mumbai or Remote"
                    value={formData.location}
                    onChange={(e) => updateForm("location", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Docs & Links */}
            {step === 2 && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-sm font-bold text-zinc-900 mb-3">Resume / CV (PDF Only)</label>
                  <div 
                    className={`w-full border-2 border-dashed rounded-[24px] p-12 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer relative group ${
                      isDragging 
                        ? "border-blue-600 bg-blue-50/50" 
                        : "border-zinc-200 hover:border-blue-600/30 hover:bg-zinc-50"
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
                            updateForm("resumeName", file.name);
                          } else {
                            alert("Please upload a PDF file.");
                          }
                        }
                      }}
                    />
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${isDragging ? 'bg-blue-600 text-white scale-110 rotate-12' : 'bg-white text-blue-600 shadow-xl shadow-blue-600/10 group-hover:scale-110'}`}>
                      <span className="material-symbols-outlined text-[36px]">
                        {isDragging ? 'file_download' : 'cloud_upload'}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-zinc-900 mb-1">
                        {formData.resumeName || (isDragging ? "Drop your resume here" : "Drag & drop your PDF resume")}
                      </div>
                      <div className="text-zinc-500 font-medium">
                        {formData.resumeName ? "Resume selected. Click to replace." : "or click to browse files (PDF only)"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">GitHub / Portfolio URL</label>
                    <input 
                      type="url" 
                      className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400"
                      placeholder="https://github.com/..."
                      value={formData.github}
                      onChange={(e) => updateForm("github", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">LinkedIn URL</label>
                    <input 
                      type="url" 
                      className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400"
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedin}
                      onChange={(e) => updateForm("linkedin", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Experience */}
            {step === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Years of Experience</label>
                    <select 
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium appearance-none cursor-pointer"
                      value={formData.experience}
                      onChange={(e) => updateForm("experience", e.target.value)}
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2371717a\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                    >
                      <option value="" disabled>Select range</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-9">6-9 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Primary Domain</label>
                    <select 
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium appearance-none cursor-pointer"
                      value={formData.domain}
                      onChange={(e) => updateForm("domain", e.target.value)}
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2371717a\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                    >
                      <option value="" disabled>Select domain</option>
                      <option value="frontend">Frontend Engineering</option>
                      <option value="backend">Backend Engineering</option>
                      <option value="fullstack">Fullstack Engineering</option>
                      <option value="data">Data Science / ML</option>
                      <option value="product">Product Management</option>
                      <option value="design">Product Design</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-900 mb-2">Core Skills</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400"
                    placeholder="e.g. React, TypeScript, AWS, Node.js"
                    value={formData.skills}
                    onChange={(e) => updateForm("skills", e.target.value)}
                  />
                  <p className="text-zinc-400 text-xs mt-2 font-medium">Separate multiple skills with commas</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-900 mb-2">Brief Professional Summary</label>
                  <textarea 
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400 resize-none"
                    placeholder="Highlight your most relevant achievements..."
                    value={formData.summary}
                    onChange={(e) => updateForm("summary", e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 4: Custom Questions */}
            {step === 4 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-sm font-bold text-zinc-900 mb-2">Why are you interested in joining {selectedJob?.company || "us"}?</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400 resize-none"
                    placeholder="What excites you about this role and company?"
                    value={formData.whyRole}
                    onChange={(e) => updateForm("whyRole", e.target.value)}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Notice Period</label>
                    <select 
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium appearance-none cursor-pointer"
                      value={formData.noticePeriod}
                      onChange={(e) => updateForm("noticePeriod", e.target.value)}
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2371717a\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                    >
                      <option value="" disabled>Select</option>
                      <option value="immediate">Immediate</option>
                      <option value="2-weeks">2 Weeks</option>
                      <option value="1-month">1 Month</option>
                      <option value="2-months+">2 Months+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Salary Expectation (Annual)</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 rounded-2xl border border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all bg-zinc-50 text-zinc-900 font-medium placeholder:text-zinc-400"
                      placeholder="e.g. $180,000"
                      value={formData.salaryExpectation}
                      onChange={(e) => updateForm("salaryExpectation", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-zinc-50 rounded-[24px] border border-zinc-100">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Personal Info</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">Name</span>
                        <span className="text-zinc-900 font-bold">{formData.fullName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">Email</span>
                        <span className="text-zinc-900 font-bold">{formData.email}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">Location</span>
                        <span className="text-zinc-900 font-bold">{formData.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-50 rounded-[24px] border border-zinc-100">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Experience</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">Experience</span>
                        <span className="text-zinc-900 font-bold">{formData.experience} Years</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">Domain</span>
                        <span className="text-zinc-900 font-bold capitalize">{formData.domain}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">Skills</span>
                        <span className="text-zinc-900 font-bold">{formData.skills}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50/50 rounded-[24px] border border-blue-100">
                  <div className="flex items-start gap-4">
                    <input 
                      type="checkbox" 
                      id="review-antibias"
                      required
                      className="w-5 h-5 mt-1 accent-blue-600 cursor-pointer"
                      checked={formData.antiBiasConsent}
                      onChange={(e) => updateForm("antiBiasConsent", e.target.checked)}
                    />
                    <label htmlFor="review-antibias" className="text-sm font-medium text-zinc-700 cursor-pointer leading-relaxed">
                      I confirm that all information provided is accurate. I agree to the <span className="text-blue-600 font-bold">Anti-Bias Hiring Process</span> which may hide my identity during the initial screening to ensure merit-based evaluation.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6 pt-8 border-t border-zinc-100">
              <button 
                type="button" 
                disabled={isSubmitting}
                onClick={step > 1 ? prevStep : () => router.back()}
                className="px-8 py-4 rounded-2xl border border-zinc-200 text-zinc-600 font-bold hover:bg-zinc-50 transition-all disabled:opacity-50"
              >
                {step === 1 ? "Cancel" : "Back"}
              </button>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-600/10 ${
                  isSubmitting ? "bg-zinc-100 text-zinc-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    {step === 5 ? "Submit Application" : "Continue"}
                    {step < 5 && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full py-8 text-center text-xs text-zinc-400 font-medium">
        © 2024 TalentBridge. The Modern Way to Hire Top Talent.
      </footer>
    </div>
  );
}
