import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Chatbot } from './components/Chatbot/Chatbot'
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { SolutionsPage } from './pages/Solutions/Solutions'
import { TechnologyPage } from './pages/Technology/Technology'
import { ProjectsPage } from './pages/Projects/Projects'
import { Contact } from './pages/Contact/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  )
}

export default App
