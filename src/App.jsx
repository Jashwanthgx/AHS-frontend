import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ATSProvider } from './context/ATSContext'
import MainLayout from './layouts/MainLayout'
import PublicLayout from './layouts/PublicLayout'
import Dashboard from './pages/Dashboard'
import Applicants from './pages/Applicants'
import Jobs from './pages/Jobs'
import Interviews from './pages/Interviews'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Companies from './pages/Companies'
import Login from './pages/auth/Login'
import Toast from './components/Toast'

// Candidate Page Imports
import Home from './pages/Home'
import JobDetail from './pages/JobDetail'
import Apply from './pages/Apply'
import Success from './pages/Success'
import Flow from './pages/Flow'
import Schedule from './pages/Schedule'
import CompanyDetail from './pages/CompanyDetail'

export default function App() {
  return (
    <ATSProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Candidate routes inside PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Standalone Candidate routes */}
          <Route path="/apply" element={<Apply />} />
          <Route path="/success" element={<Success />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/schedule" element={<Schedule />} />

          {/* Recruiter dashboard routes */}
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toast />
      </BrowserRouter>
    </ATSProvider>
  )
}
