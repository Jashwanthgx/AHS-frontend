import { useState } from 'react'
import { FiArrowRight, FiBriefcase, FiSearch } from 'react-icons/fi'

const COMPANIES = [
  {
    id: 1, name: 'Stripe', openRoles: 4, logo: '💳',
    description: 'Stripe is a financial infrastructure platform for the internet. Millions of companies—from the world\'s largest enterprises to the most ambitious startups—use Stripe t...',
  },
  {
    id: 2, name: 'OpenAI', openRoles: 3, logo: '🤖',
    description: 'OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity. We are building safe, beneficial...',
  },
  {
    id: 3, name: 'Vercel', openRoles: 3, logo: '▲',
    description: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration. We enable developers to build...',
  },
  {
    id: 4, name: 'Linear', openRoles: 3, logo: '⬡',
    description: 'Linear is a better way to build products. Meet the new standard for modern software development. Streamline issues, sprints, and product roadmaps.',
  },
  {
    id: 5, name: 'Supabase', openRoles: 5, logo: '⚡',
    description: 'Supabase is an open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions and Storage.',
  },
  {
    id: 6, name: 'Figma', openRoles: 2, logo: '🎨',
    description: 'Figma is a collaborative design tool that helps teams create, test, and ship better designs from start to finish.',
  },
  {
    id: 7, name: 'Notion', openRoles: 4, logo: '📝',
    description: 'Notion is the connected workspace where better, faster work happens. Combine your notes, docs, and projects — all in one place.',
  },
  {
    id: 8, name: 'Anthropic', openRoles: 6, logo: '🧠',
    description: 'Anthropic is an AI safety company working to build reliable, interpretable, and steerable AI systems.',
  },
]

export default function Companies() {
  const [search, setSearch] = useState('')

  const filtered = COMPANIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Find your next role at top engineering teams.</h1>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 mt-5 max-w-md shadow-sm">
          <FiSearch className="text-slate-400 w-4 h-4" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search companies…"
            className="bg-transparent outline-none text-sm text-slate-700 w-full placeholder-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(company => (
          <div key={company.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl">
                  <FiBriefcase className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{company.name}</h3>
                </div>
              </div>
              <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
            </div>

            <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
              {company.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                {company.openRoles} Open Role{company.openRoles !== 1 ? 's' : ''}
              </span>
              <button className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
