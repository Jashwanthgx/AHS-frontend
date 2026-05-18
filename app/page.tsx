"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JOBS, COMPANIES } from "./data/jobs";

const DOMAINS = ["All", "Frontend", "Backend", "AI", "Data", "Design", "Product"];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [showAllJobs, setShowAllJobs] = useState(false);

  const LOCATIONS = ["All", "Remote", "Bangalore", "Mumbai", "Pune", "Hyderabad", "Delhi NCR", "Chennai"];
  const TYPES = ["All", "Full-time", "Contract"];

  const filteredJobs = JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = activeDomain === "All" || job.domain === activeDomain;
    const matchesLocation = activeLocation === "All" || job.location.includes(activeLocation);
    const matchesType = activeType === "All" || job.type === activeType;
    return matchesSearch && matchesDomain && matchesLocation && matchesType;
  });

  const displayedJobs = showAllJobs || searchQuery || activeDomain !== "All" ? filteredJobs : filteredJobs.slice(0, 7);

  return (
    <>
      {/* TopNavBar (Shared Component) */}
      <nav className="bg-white dark:bg-zinc-900 font-inter text-sm antialiased sticky w-full top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">TalentBridge</div>
          <div className="hidden md:flex items-center gap-6">
            <a className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/#browse-jobs">Browse Jobs</a>
            <a className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/#featured-companies">Featured Companies</a>
            <a className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">Resources</a>
            <a className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/#about">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => alert("TalentBridge is a no-login platform for candidates! You can apply to any job directly without creating an account.\n\n(Employers: Please use the 'For Employers' portal to sign in)")}
              className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-md px-3 py-2 active:scale-95 duration-150 ease-in-out"
            >
              Sign In
            </button>
            <Link href="/employers">
              <button className="bg-white border border-blue-600 text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-md transition-all active:scale-95 duration-150 ease-in-out">
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
        </section>        {/* Company Overview Ticker */}
        <section className="w-full py-12 relative overflow-hidden bg-white border-y border-zinc-200 rounded-3xl my-8">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <p className="text-center font-label-md text-zinc-400 mb-8 uppercase tracking-[0.3em] text-[11px] font-semibold">
            Powering the world&apos;s most innovative teams
          </p>
          
          <div className="flex overflow-hidden">
            <div className="flex items-center gap-20 md:gap-32 animate-scroll pause-on-hover px-4">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-7 w-auto object-contain hover:scale-110 transition-all duration-300" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg" alt="Vercel" className="h-6 w-auto object-contain hover:scale-110 transition-all duration-300" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" className="h-7 w-auto object-contain hover:scale-110 transition-all duration-300" />
                  <img src="https://www.vectorlogo.zone/logos/anthropic/anthropic-ar21.svg" alt="Anthropic" className="h-6 w-auto object-contain hover:scale-110 transition-all duration-300" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-7 w-auto object-contain hover:scale-110 transition-all duration-300" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-5 w-auto object-contain hover:scale-110 transition-all duration-300" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* Featured Companies Section */}
        <section id="featured-companies" className="flex flex-col gap-12 scroll-mt-24 py-16 px-8 bg-white rounded-[40px] border border-zinc-100 my-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <h2 className="font-headline-lg text-headline-lg text-zinc-900 font-bold">Featured Companies</h2>
              <p className="text-zinc-500 mt-3 max-w-2xl leading-relaxed">Join the most innovative teams in the world. Explore roles at leading tech companies and AI startups.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMPANIES.map((company) => (
              <Link key={company.id} href={`/companies/${company.id}`}>
                <div className="group relative bg-zinc-50/50 border border-zinc-100 hover:border-blue-600/30 rounded-[28px] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500 cursor-pointer overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors"></div>
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-zinc-100 flex items-center justify-center p-3.5 group-hover:scale-110 transition-transform duration-500 ease-out">
                      <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-blue-50 text-blue-600 font-bold text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border border-blue-100/50 shadow-sm">
                        {JOBS.filter(j => j.company === company.name).length} Active Jobs
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{company.name}</h3>
                    <p className="text-zinc-500 mt-3 line-clamp-2 leading-relaxed">{company.description}</p>
                  </div>
                  <div className="mt-6 flex items-center text-blue-600 font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    View Company Profile <span className="material-symbols-outlined text-[18px] ml-1">chevron_right</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse Jobs Section */}
        <section id="browse-jobs" className="flex flex-col gap-12 scroll-mt-24 py-16 px-8 bg-white rounded-[40px] border border-zinc-100 my-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-zinc-900">Browse Jobs</h2>
                <p className="text-zinc-500 mt-3 max-w-2xl leading-relaxed">Find your next role at the world&apos;s most innovative companies. Filter by role, location, or company.</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors">search</span>
                  <input 
                    type="text" 
                    placeholder="Search by role, company, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                  />
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <select 
                    value={activeLocation}
                    onChange={(e) => setActiveLocation(e.target.value)}
                    className="pl-4 pr-10 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium appearance-none cursor-pointer min-w-[160px]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2371717a\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                  >
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc === "All" ? "Everywhere" : loc}</option>)}
                  </select>

                  <select 
                    value={activeType}
                    onChange={(e) => setActiveType(e.target.value)}
                    className="pl-4 pr-10 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium appearance-none cursor-pointer min-w-[140px]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2371717a\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                  >
                    {TYPES.map(type => <option key={type} value={type}>{type === "All" ? "All Types" : type}</option>)}
                  </select>
                </div>
              </div>

              {/* Domain Pills */}
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setActiveDomain(domain)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeDomain === domain 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedJobs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-zinc-500 bg-zinc-50 rounded-2xl border border-zinc-100">
                No jobs found matching your current filters.
              </div>
            ) : (
              displayedJobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => router.push(`/jobs/${job.id}`)}
                  className="cursor-pointer group bg-white hover:bg-zinc-50/30 p-6 rounded-[24px] border border-zinc-100 hover:border-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-300 h-full flex flex-col"
                >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-zinc-100 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-blue-600">{job.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">{job.domain}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1">{job.title}</h3>
                      <p className="text-zinc-500 text-sm mt-1 flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[16px]">business</span>
                        {job.company}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Location</span>
                        <span className="text-sm text-zinc-900 font-bold">{job.location.split("(")[0]}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Salary</span>
                        <span className="text-sm text-blue-600 font-bold">{job.salary}</span>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-xs text-zinc-400 font-medium">Posted 2d ago</span>
                      <Link href={`/apply?jobId=${job.id}`} onClick={(e) => e.stopPropagation()}>
                        <button className="bg-white border border-zinc-200 text-zinc-600 font-bold px-4 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all text-xs">
                          Apply Now
                        </button>
                      </Link>
                    </div>
                </div>
              ))
            )}
          </div>

          {!showAllJobs && !searchQuery && activeDomain === "All" && activeLocation === "All" && activeType === "All" && filteredJobs.length > 7 && (
            <button 
              onClick={() => setShowAllJobs(true)}
              className="bg-white border border-zinc-200 text-zinc-600 font-bold px-8 py-4 rounded-2xl hover:bg-zinc-50 transition-all self-center shadow-sm"
            >
              View All {filteredJobs.length} Jobs
            </button>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="flex flex-col gap-8 scroll-mt-24 py-12">
          <div className="bg-white border border-zinc-200 rounded-[32px] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-100/50 dark:bg-zinc-800/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-100/30 dark:bg-zinc-800/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
            
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-8 relative z-10">About TalentBridge</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="flex flex-col gap-6 font-body-lg text-on-surface-variant">
                <p className="leading-relaxed">
                  TalentBridge is built on a simple premise: <strong className="text-on-background">hiring should be about skills, not pedigree.</strong>
                </p>
                <p className="leading-relaxed">
                  We are a modern recruitment portal that perfectly matches top professionals with the world's most innovative teams. 
                  Unlike traditional job boards, we've designed a completely frictionless, <strong className="text-on-background">no-login required</strong> application experience for candidates.
                </p>
                <p className="leading-relaxed">
                  Our advanced parsing technology and skill-based matching algorithms ensure that your application is evaluated on its true merit, seamlessly connecting you with your next big opportunity.
                </p>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="bg-zinc-50/80 p-7 rounded-2xl border border-zinc-100 hover:border-blue-500/30 hover:bg-white transition-all duration-300 shadow-sm">
                  <h3 className="font-title-lg text-title-lg text-on-background mb-3 flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600">verified</span>
                    Anti-Bias Commitment
                  </h3>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">
                    We actively work to reduce unconscious bias. During the initial review stages, identifying information is hidden from hiring managers, allowing your skills to speak for themselves.
                  </p>
                </div>
                
                <div className="bg-zinc-50/80 p-7 rounded-2xl border border-zinc-100 hover:border-blue-500/30 hover:bg-white transition-all duration-300 shadow-sm">
                  <h3 className="font-title-lg text-title-lg text-on-background mb-3 flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600">bolt</span>
                    Frictionless Process
                  </h3>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">
                    No passwords to remember. No lengthy profile setups. Just find a role you love, upload your resume, and you're done in under 2 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Accel Style Black Footer - Compact */}
      <footer className="bg-black text-white pt-10 pb-6 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Compact Search Bar */}
          <div className="relative mb-10 group max-w-2xl">
            <input 
              type="text" 
              placeholder="Search for roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full bg-[#111] text-zinc-400 text-base py-3 px-5 rounded-lg border border-zinc-800 focus:outline-none focus:border-blue-600/40 transition-all placeholder:text-zinc-700 shadow-inner"
            />
            <button 
              onClick={() => document.getElementById('browse-jobs')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 group-hover:text-blue-500 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-5">
              <h2 className="text-xl md:text-2xl font-medium tracking-tight">Get in Touch</h2>
              <button 
                onClick={() => window.location.href = 'mailto:hello@talentbridge.com'}
                className="bg-[#c8d1b7] text-black font-bold px-4 py-1.5 rounded-md text-[10px] uppercase tracking-wider hover:bg-[#b8c1a7] active:scale-95 transition-all"
              >
                Contact Us
              </button>
            </div>

            <div className="flex flex-col items-end gap-4 w-full md:w-auto">
              <div className="flex items-center gap-6">
                <div 
                  className="flex items-center gap-2 cursor-pointer group/mode"
                  onClick={() => alert("Dark Mode is standard.")}
                >
                  <div className="w-6 h-3 bg-zinc-800 rounded-full relative p-0.5">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full translate-x-3"></div>
                  </div>
                  <span className="text-[12px] font-medium text-zinc-500 group-hover/mode:text-zinc-300">Dark Mode</span>
                </div>
                <Link href="/#browse-jobs" className="text-[12px] font-medium hover:text-blue-400">Jobs</Link>
                <div className="flex items-center gap-3">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><span className="material-symbols-outlined text-lg">play_circle</span></a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 font-bold text-sm">𝕏</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><span className="material-symbols-outlined text-lg">person</span></a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="text-white bg-zinc-900 w-4 h-4 flex items-center justify-center rounded text-[7px]">W</span>
                  <span>Made with Webflow</span>
                </div>
                <div>TalentBridge ©2026</div>
                <button onClick={() => alert("Legal coming soon.")} className="hover:text-white transition-colors">Legal</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
