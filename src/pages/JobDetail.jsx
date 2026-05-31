import React from "react";
import { Link, useParams } from "react-router-dom";
import { JOBS, COMPANIES } from "../data/jobs";
import AuthPrompt from "../components/AuthPrompt";

export default function JobDetailPage() {
  const { id } = useParams();
  const [authPromptState, setAuthPromptState] = React.useState({
    isOpen: false,
    jobId: null,
  });
  const jobId = parseInt(id);
  const job = JOBS.find((j) => j.id === jobId);
  const company = COMPANIES.find((c) => c.name === job?.company);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center font-inter">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-900">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center p-4">
                  <img src={company?.logo} alt={job.company} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px]">business</span>
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px]">location_on</span>
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px]">payments</span>
                      {job.salary}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setAuthPromptState({ isOpen: true, jobId: job.id })}
                className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 whitespace-nowrap cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 flex flex-col gap-10">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {job.description || "As a " + job.title + " at " + job.company + ", you will play a critical role in our mission. We are looking for passionate individuals who want to make a real impact."}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
                <ul className="grid grid-cols-1 gap-4">
                  {(job.requirements || [
                    "Strong problem-solving skills",
                    "Ability to work in a fast-paced environment",
                    "Excellent communication and collaboration skills"
                  ]).map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <span className="material-symbols-outlined text-blue-600 mt-0.5">check_circle</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="flex flex-col gap-8">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Job Overview</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Job Type</span>
                    <span className="font-bold text-slate-900">{job.type || "Full-time"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Category</span>
                    <span className="font-bold text-slate-900">{job.domain}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Posted</span>
                    <span className="font-bold text-slate-900">2 days ago</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">About {job.company}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {company?.about || company?.description}
                </p>
                <Link to={`/companies/${company?.id}`}>
                  <button className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm cursor-pointer">
                    View Company Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AuthPrompt 
        isOpen={authPromptState.isOpen} 
        onClose={() => setAuthPromptState({ isOpen: false, jobId: null })} 
        jobId={authPromptState.jobId}
      />
    </div>
  );
}
