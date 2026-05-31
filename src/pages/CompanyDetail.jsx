import React from "react";
import { Link, useParams } from "react-router-dom";
import { JOBS, COMPANIES } from "../data/jobs";

export default function CompanyProfilePage() {
  const { id } = useParams();
  const companyId = id;
  const company = COMPANIES.find((c) => c.id === companyId);
  const companyJobs = JOBS.filter((j) => j.company === company?.name);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center font-inter text-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-900">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center p-6 shrink-0">
              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{company.name}</h1>
              <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                {company.description}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6 text-slate-500 font-medium">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">location_on</span>
                  {company.location}
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">link</span>
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    {company.website.replace("https://", "")}
                  </a>
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">group</span>
                  1,000+ Employees
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About {company.name}</h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed space-y-6">
                <p>{company.about}</p>
                <p>
                  At {company.name}, we believe in fostering an inclusive environment where everyone can thrive. 
                  Our team is dedicated to pushing the boundaries of what's possible and delivering exceptional 
                  value to our customers worldwide.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Open Roles at {company.name}</h2>
              <div className="grid grid-cols-1 gap-4">
                {companyJobs.length > 0 ? (
                  companyJobs.map((job) => (
                    <Link key={job.id} to={`/jobs/${job.id}`}>
                      <div className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1 font-medium">
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.salary}</span>
                          </div>
                        </div>
                        <button className="bg-slate-50 text-blue-600 font-bold px-6 py-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all text-sm cursor-pointer">
                          View Details
                        </button>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No open roles currently listed.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-8 bg-blue-600 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-4">Want to work here?</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Get notified as soon as new roles open up at {company.name}.
              </p>
              <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg cursor-pointer">
                Follow {company.name}
              </button>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Company Values</h3>
              <ul className="space-y-6">
                {[
                  { title: "Innovation", desc: "Pushing the boundaries of technology." },
                  { title: "Inclusion", desc: "Building a team that reflects the world." },
                  { title: "Integrity", desc: "Doing the right thing, even when it's hard." }
                ].map((value, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <span className="font-bold text-slate-900">{value.title}</span>
                    <span className="text-sm text-slate-500">{value.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
