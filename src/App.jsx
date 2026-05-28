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

export default function App() {
  return (
    <ATSProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Marketing routes */}
          <Route element={<PublicLayout />}>
            <Route path="/companies" element={<Companies />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Recruiter dashboard routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applicants" element={<Applicants />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toast />
      </BrowserRouter>
    </ATSProvider>
  )
}
