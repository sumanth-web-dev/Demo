import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Chatbot } from './components/Chatbot/Chatbot'
import { Analytics } from './components/Analytics/Analytics'
import { AuthGuard } from './components/AuthGuard/AuthGuard'
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { SolutionsPage } from './pages/Solutions/Solutions'
import { TechnologyPage } from './pages/Technology/Technology'
import { ProjectsPage } from './pages/Projects/Projects'
import { IndustriesPage } from './pages/Industries/Industries'
import { InsightsPage } from './pages/Insights/Insights'
import { Audit } from './pages/Audit/Audit'
import { Contact } from './pages/Contact/Contact'
import { Privacy } from './pages/Privacy/Privacy'
import { Terms } from './pages/Terms/Terms'
import { Login } from './pages/Login/Login'
import { Dashboard } from './pages/Dashboard/Dashboard'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
