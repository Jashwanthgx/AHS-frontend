"use client";

import React, { useState } from "react";
import Link from "next/link";

const JOBS = [
  // Stripe
  { id: 1, title: "Senior Staff Software Engineer", company: "Stripe", location: "San Francisco, CA (Hybrid)", salary: "$200k - $280k", icon: "code", domain: "Backend" },
  { id: 2, title: "Payment Systems Architect", company: "Stripe", location: "Remote", salary: "$180k - $240k", icon: "account_balance", domain: "Backend" },
  { id: 3, title: "Data Engineer", company: "Stripe", location: "Seattle, WA", salary: "$150k - $210k", icon: "database", domain: "Data" },
  { id: 4, title: "Product Marketing Manager", company: "Stripe", location: "New York, NY", salary: "$130k - $180k", icon: "campaign", domain: "Product" },
  
  // Vercel
  { id: 5, title: "Frontend Developer", company: "Vercel", location: "New York, NY (Remote)", salary: "$150k - $210k", icon: "web", domain: "Frontend" },
  { id: 6, title: "Developer Advocate", company: "Vercel", location: "San Francisco, CA", salary: "$140k - $190k", icon: "record_voice_over", domain: "Other" },
  { id: 7, title: "Infrastructure Engineer", company: "Vercel", location: "Remote", salary: "$170k - $230k", icon: "dns", domain: "Backend" },
  { id: 8, title: "Technical Writer", company: "Vercel", location: "Remote", salary: "$110k - $150k", icon: "edit_document", domain: "Other" },
  
  // OpenAI
  { id: 9, title: "Machine Learning Researcher", company: "OpenAI", location: "Remote", salary: "$250k - $350k", icon: "science", domain: "AI" },
  { id: 10, title: "AI Alignment Engineer", company: "OpenAI", location: "San Francisco, CA", salary: "$200k - $300k", icon: "policy", domain: "AI" },
  { id: 11, title: "Fullstack Engineer", company: "OpenAI", location: "San Francisco, CA", salary: "$180k - $250k", icon: "code", domain: "Frontend" }, // Can map to frontend or backend
  { id: 12, title: "Research Scientist", company: "OpenAI", location: "Remote", salary: "$220k - $320k", icon: "biotech", domain: "AI" },
  
  // Anthropic
  { id: 13, title: "Data Scientist", company: "Anthropic", location: "San Francisco, CA", salary: "$180k - $250k", icon: "data_exploration", domain: "Data" },
  { id: 14, title: "Trust and Safety Analyst", company: "Anthropic", location: "Remote", salary: "$120k - $160k", icon: "security", domain: "Other" },
  { id: 15, title: "Prompt Engineer", company: "Anthropic", location: "San Francisco, CA", salary: "$140k - $190k", icon: "keyboard", domain: "AI" },
  { id: 16, title: "Backend Systems Engineer", company: "Anthropic", location: "Remote", salary: "$170k - $240k", icon: "memory", domain: "Backend" },
  
  // Google
  { id: 17, title: "Product Manager", company: "Google", location: "London, UK (Hybrid)", salary: "£120k - £160k", icon: "assignment", domain: "Product" },
  { id: 18, title: "UX Designer", company: "Google", location: "Mountain View, CA", salary: "$140k - $190k", icon: "design_services", domain: "Design" },
  { id: 19, title: "Cloud Solutions Architect", company: "Google", location: "Remote", salary: "$180k - $250k", icon: "cloud", domain: "Backend" },
  { id: 20, title: "Hardware Engineer", company: "Google", location: "Sunnyvale, CA", salary: "$160k - $210k", icon: "developer_board", domain: "Other" },
  
  // Meta
  { id: 21, title: "VR Interaction Designer", company: "Meta", location: "Seattle, WA", salary: "$150k - $200k", icon: "view_in_ar", domain: "Design" },
  { id: 22, title: "iOS Developer", company: "Meta", location: "Menlo Park, CA (Hybrid)", salary: "$160k - $220k", icon: "phone_iphone", domain: "Frontend" },
  { id: 23, title: "Data Analytics Manager", company: "Meta", location: "Remote", salary: "$170k - $230k", icon: "analytics", domain: "Data" },
  { id: 24, title: "Content Strategist", company: "Meta", location: "New York, NY", salary: "$110k - $160k", icon: "feed", domain: "Product" },
];

const DOMAINS = ["All", "Frontend", "Backend", "AI", "Data", "Design", "Product"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [showAllJobs, setShowAllJobs] = useState(false);

  const filteredJobs = JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = activeDomain === "All" || job.domain === activeDomain;
    return matchesSearch && matchesDomain;
  });

  const displayedJobs = showAllJobs || searchQuery || activeDomain !== "All" ? filteredJobs : filteredJobs.slice(0, 7);

  return (
    <>
      {/* TopNavBar (Shared Component) */}
      <nav className="bg-white dark:bg-slate-900 font-inter text-sm antialiased sticky w-full top-0 z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">TalentBridge</div>
          <div className="hidden md:flex items-center gap-6">
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/#browse-jobs">Browse Jobs</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/#featured-companies">Featured Companies</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">Resources</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/#about">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => alert("TalentBridge is a no-login platform for candidates! You can apply to any job directly without creating an account.\n\n(Employers: Please use the 'For Employers' portal to sign in)")}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md px-3 py-2 active:scale-95 duration-150 ease-in-out"
            >
              Sign In
            </button>
            <Link href="/employers">
              <button className="bg-white border border-blue-600 text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md transition-all active:scale-95 duration-150 ease-in-out">
                For Employers
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col w-full max-w-[1200px] mx-auto px-6 py-12 gap-24">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 mt-8">
          <div className="flex-1 flex flex-col gap-6">

            <h1 className="font-display-lg text-display-lg text-on-background max-w-[42rem]">
              The Modern Way to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Hire Top Talent.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[36rem]">
              Streamline your hiring process and reduce time-to-hire by 40%. TalentBridge perfectly matches top professionals with the world's most innovative teams.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button 
                onClick={() => {
                  document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-on-primary-fixed-variant transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
              >
                Find Jobs
              </button>
              <button className="bg-surface-container-lowest text-on-background border border-outline-variant font-label-md text-label-md px-6 py-3 rounded hover:bg-surface-container-low transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">business_center</span>
                Hire Talent
              </button>
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-square max-w-[500px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-secondary-fixed opacity-50 rounded-2xl"></div>
            <img 
              alt="Professionals working" 
              className="absolute inset-4 object-cover rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] border border-outline-variant w-[calc(100%-2rem)] h-[calc(100%-2rem)]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8tPTqudrUIAtju6-KC7ESoiAVzZBBdb9gSxRUUKak4MoqXCxBc7GbbUKD7yuy3CeRZyoKHk5HKsfwSbshufj1GOjbPylaM8XSVZ5-Fco6A_GXQQeqXMsM3NziacpMhzes4LN3Tpr_BEnBSsOlDUVUtMfj92vmx9NewyhhUHPeEML1BUtmm6y3tJcN1ZXRc6zrPXTv-V5_VXVjWCBHBKurb38pau1UXGmu7jdyzpe0IKpbkxR8TTCPrOemmfXOJO4Mk-ni2Eg381A"
            />
          </div>
        </section>

        {/* Company Overview Ticker */}
        <section className="w-full border-y border-outline-variant/30 py-10 bg-surface/30 rounded-2xl">
          <p className="text-center font-label-md text-on-surface-variant mb-8 uppercase tracking-[0.2em]">Companies actively hiring on TalentBridge</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-16 gap-y-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-700 mt-4 mb-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8 w-auto object-contain drop-shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg" alt="Vercel" className="h-6 w-auto object-contain dark:invert drop-shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" className="h-7 w-auto object-contain dark:invert drop-shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Anthropic_logo.svg" alt="Anthropic" className="h-5 w-auto object-contain dark:invert drop-shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 w-auto object-contain drop-shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-5 w-auto object-contain drop-shadow-sm" />
          </div>
        </section>

        {/* Featured Companies Section */}
        <section id="featured-companies" className="flex flex-col gap-8 scroll-mt-24">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-lg text-headline-lg text-on-background">Featured Companies</h2>
            <button className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1">
              View all companies <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Company Card 1 */}
            <div 
              onClick={() => {
                setSearchQuery("Stripe");
                document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all flex flex-col gap-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-surface-container rounded border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">cloud</span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">12 Active Jobs</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-background group-hover:text-primary transition-colors">Stripe</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">Financial infrastructure platform for the internet. Millions of companies of all sizes use Stripe.</p>
              </div>
            </div>
            {/* Company Card 2 */}
            <div 
              onClick={() => {
                setSearchQuery("Vercel");
                document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all flex flex-col gap-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-surface-container rounded border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">public</span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">8 Active Jobs</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-background group-hover:text-primary transition-colors">Vercel</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">Vercel is the platform for frontend developers, providing the speed and reliability innovators need.</p>
              </div>
            </div>
            {/* Company Card 3 */}
            <div 
              onClick={() => {
                setSearchQuery("OpenAI");
                document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all flex flex-col gap-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-surface-container rounded border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">smart_toy</span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">24 Active Jobs</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-background group-hover:text-primary transition-colors">OpenAI</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">Creating safe AGI that benefits all of humanity. Join us in shaping the future of artificial intelligence.</p>
              </div>
            </div>
            {/* Company Card 4 */}
            <div 
              onClick={() => {
                setSearchQuery("Anthropic");
                document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all flex flex-col gap-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-surface-container rounded border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">data_exploration</span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">15 Active Jobs</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-background group-hover:text-primary transition-colors">Anthropic</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">An AI safety and research company building reliable, interpretable, and steerable AI systems.</p>
              </div>
            </div>
            {/* Company Card 5 */}
            <div 
              onClick={() => {
                setSearchQuery("Google");
                document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all flex flex-col gap-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-surface-container rounded border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">search</span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">42 Active Jobs</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-background group-hover:text-primary transition-colors">Google</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">Organize the world's information and make it universally accessible and useful.</p>
              </div>
            </div>
            {/* Company Card 6 */}
            <div 
              onClick={() => {
                setSearchQuery("Meta");
                document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all flex flex-col gap-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-surface-container rounded border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">share</span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">28 Active Jobs</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-background group-hover:text-primary transition-colors">Meta</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">Giving people the power to build community and bring the world closer together.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Browse Jobs Section */}
        <section id="browse-jobs" className="flex flex-col gap-8 mb-12 scroll-mt-24">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-headline-lg text-headline-lg text-on-background whitespace-nowrap">Browse Jobs</h2>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-[320px]">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                  <input 
                    type="text"
                    placeholder="Search titles, companies..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-medium hover:bg-on-primary-fixed-variant transition-colors flex-shrink-0 shadow-sm"
                  onClick={() => {
                    document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Domain Filters */}
            <div className="flex flex-wrap gap-2 mb-2">
              {DOMAINS.map(domain => (
                <button
                  key={domain}
                  onClick={() => setActiveDomain(domain)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeDomain === domain
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant hover:border-outline"
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            {displayedJobs.length === 0 ? (
              <div className="py-12 text-center text-on-surface-variant font-body-lg bg-surface-container-lowest rounded-lg border border-outline-variant">
                No jobs found matching your current filters.
              </div>
            ) : (
              <>
                {displayedJobs.map((job) => (
                  <div key={job.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-surface-container rounded border border-outline-variant flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">{job.icon}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-title-lg text-title-lg text-on-background">{job.title}</h3>
                        <div className="font-body-md text-body-md text-on-surface-variant flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>{job.company}</span>
                          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                          <span>{job.location}</span>
                          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                      <Link href="/apply" className="bg-surface-container text-primary font-label-md text-label-md px-4 py-2 rounded hover:bg-surface-container-high transition-colors">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
                {!showAllJobs && !searchQuery && activeDomain === "All" && filteredJobs.length > 7 && (
                  <button 
                    onClick={() => setShowAllJobs(true)}
                    className="mt-4 bg-surface-container-low text-on-surface border border-outline-variant font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-container transition-colors w-full md:w-auto md:self-center"
                  >
                    View All {filteredJobs.length} Jobs
                  </button>
                )}
              </>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="flex flex-col gap-8 scroll-mt-24">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 md:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-8 relative z-10">About TalentBridge</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="flex flex-col gap-6 font-body-lg text-on-surface-variant">
                <p>
                  TalentBridge is built on a simple premise: <strong>hiring should be about skills, not pedigree.</strong>
                </p>
                <p>
                  We are a modern recruitment portal that perfectly matches top professionals with the world's most innovative teams. 
                  Unlike traditional job boards, we've designed a completely frictionless, <strong>no-login required</strong> application experience for candidates.
                </p>
                <p>
                  Our advanced parsing technology and skill-based matching algorithms ensure that your application is evaluated on its true merit, seamlessly connecting you with your next big opportunity.
                </p>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant hover:border-primary transition-colors">
                  <h3 className="font-title-lg text-title-lg text-on-background mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    Anti-Bias Commitment
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    We actively work to reduce unconscious bias. During the initial review stages, certain identifying information (like your name and photo) is hidden from hiring managers, allowing your skills and experience to speak for themselves.
                  </p>
                </div>
                
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant hover:border-primary transition-colors">
                  <h3 className="font-title-lg text-title-lg text-on-background mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">bolt</span>
                    Frictionless Process
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    No passwords to remember. No lengthy profile setups. Just find a role you love, upload your PDF resume, answer a few quick questions, and you're done in under 2 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Shared Component) */}
      <footer className="bg-slate-50 dark:bg-slate-950 font-inter text-xs tracking-wide border-t border-slate-200 dark:border-slate-800 w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto w-full gap-4">
          <div className="text-lg font-black text-slate-900 dark:text-slate-100">TalentBridge</div>
          <div className="text-slate-500 dark:text-slate-500">© 2024 TalentBridge. The Modern Way to Hire Top Talent.</div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a className="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:underline transition-all opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:underline transition-all opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            <a className="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:underline transition-all opacity-80 hover:opacity-100" href="#">Cookie Policy</a>
            <a className="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:underline transition-all opacity-80 hover:opacity-100" href="#">Accessibility</a>
            <a className="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:underline transition-all opacity-80 hover:opacity-100" href="#">API Status</a>
          </div>
        </div>
      </footer>
    </>
  );
}
