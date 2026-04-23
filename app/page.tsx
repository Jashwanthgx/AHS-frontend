"use client";

import React, { useState } from "react";
import Link from "next/link";

const JOBS = [
  // Stripe
  { id: 1, title: "Senior Staff Software Engineer", company: "Stripe", location: "San Francisco, CA (Hybrid)", salary: "$200k - $280k", icon: "code" },
  { id: 2, title: "Payment Systems Architect", company: "Stripe", location: "Remote", salary: "$180k - $240k", icon: "account_balance" },
  { id: 3, title: "Data Engineer", company: "Stripe", location: "Seattle, WA", salary: "$150k - $210k", icon: "database" },
  { id: 4, title: "Product Marketing Manager", company: "Stripe", location: "New York, NY", salary: "$130k - $180k", icon: "campaign" },
  
  // Vercel
  { id: 5, title: "Frontend Developer", company: "Vercel", location: "New York, NY (Remote)", salary: "$150k - $210k", icon: "web" },
  { id: 6, title: "Developer Advocate", company: "Vercel", location: "San Francisco, CA", salary: "$140k - $190k", icon: "record_voice_over" },
  { id: 7, title: "Infrastructure Engineer", company: "Vercel", location: "Remote", salary: "$170k - $230k", icon: "dns" },
  { id: 8, title: "Technical Writer", company: "Vercel", location: "Remote", salary: "$110k - $150k", icon: "edit_document" },
  
  // OpenAI
  { id: 9, title: "Machine Learning Researcher", company: "OpenAI", location: "Remote", salary: "$250k - $350k", icon: "science" },
  { id: 10, title: "AI Alignment Engineer", company: "OpenAI", location: "San Francisco, CA", salary: "$200k - $300k", icon: "policy" },
  { id: 11, title: "Fullstack Engineer", company: "OpenAI", location: "San Francisco, CA", salary: "$180k - $250k", icon: "code" },
  { id: 12, title: "Research Scientist", company: "OpenAI", location: "Remote", salary: "$220k - $320k", icon: "biotech" },
  
  // Anthropic
  { id: 13, title: "Data Scientist", company: "Anthropic", location: "San Francisco, CA", salary: "$180k - $250k", icon: "data_exploration" },
  { id: 14, title: "Trust and Safety Analyst", company: "Anthropic", location: "Remote", salary: "$120k - $160k", icon: "security" },
  { id: 15, title: "Prompt Engineer", company: "Anthropic", location: "San Francisco, CA", salary: "$140k - $190k", icon: "keyboard" },
  { id: 16, title: "Backend Systems Engineer", company: "Anthropic", location: "Remote", salary: "$170k - $240k", icon: "memory" },
  
  // Google
  { id: 17, title: "Product Manager", company: "Google", location: "London, UK (Hybrid)", salary: "£120k - £160k", icon: "assignment" },
  { id: 18, title: "UX Designer", company: "Google", location: "Mountain View, CA", salary: "$140k - $190k", icon: "design_services" },
  { id: 19, title: "Cloud Solutions Architect", company: "Google", location: "Remote", salary: "$180k - $250k", icon: "cloud" },
  { id: 20, title: "Hardware Engineer", company: "Google", location: "Sunnyvale, CA", salary: "$160k - $210k", icon: "developer_board" },
  
  // Meta
  { id: 21, title: "VR Interaction Designer", company: "Meta", location: "Seattle, WA", salary: "$150k - $200k", icon: "view_in_ar" },
  { id: 22, title: "iOS Developer", company: "Meta", location: "Menlo Park, CA (Hybrid)", salary: "$160k - $220k", icon: "phone_iphone" },
  { id: 23, title: "Data Analytics Manager", company: "Meta", location: "Remote", salary: "$170k - $230k", icon: "analytics" },
  { id: 24, title: "Content Strategist", company: "Meta", location: "New York, NY", salary: "$110k - $160k", icon: "feed" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllJobs, setShowAllJobs] = useState(false);

  const filteredJobs = JOBS.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedJobs = showAllJobs || searchQuery ? filteredJobs : filteredJobs.slice(0, 7);

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
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md px-3 py-2 active:scale-95 duration-150 ease-in-out">
              Sign In
            </button>
            <button className="bg-white border border-blue-600 text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md transition-all active:scale-95 duration-150 ease-in-out">
              For Employers
            </button>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="font-headline-lg text-headline-lg text-on-background">Browse Jobs</h2>
            
            <div className="relative max-w-md w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input 
                type="text"
                placeholder="Search by title, company, or location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest text-on-surface"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            {displayedJobs.length === 0 ? (
              <div className="py-12 text-center text-on-surface-variant font-body-lg">
                No jobs found matching "{searchQuery}".
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
                {!showAllJobs && !searchQuery && filteredJobs.length > 7 && (
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
