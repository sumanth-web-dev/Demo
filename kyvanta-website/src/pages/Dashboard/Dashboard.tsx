import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Trash2,
  Mail,
  Building2,
  Tag,
  FileText,
  Clock,
  Server,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { logout } from '../../utils/auth'
import {
  sidebarItems,
  buildStats,
  systemInfo,
  type ActiveView,
} from '../../data/dashboard'

interface Submission {
  id: string
  name: string
  email: string
  company: string
  need: string
  needLabel: string
  description: string
  timestamp: number
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

let toastCounter = 0

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState<ActiveView>('overview')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [refreshKey, setRefreshKey] = useState(0)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = ++toastCounter
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch('/api/submissions')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSubmissions(data)
      })
      .catch(() => {})
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey, location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        showToast('Submission deleted successfully')
        setRefreshKey((k) => k + 1)
      } else {
        showToast('Failed to delete submission', 'error')
      }
    } catch {
      showToast('Failed to delete submission', 'error')
    }
  }

  const handleClearAll = async () => {
    if (submissions.length === 0) return
    let failed = false
    for (const sub of submissions) {
      try {
        const res = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: sub.id }),
        })
        if (!res.ok) failed = true
      } catch {
        failed = true
      }
    }
    if (failed) {
      showToast('Some submissions could not be deleted', 'error')
    } else {
      showToast('All submissions cleared')
    }
    setRefreshKey((k) => k + 1)
  }

  const stats = buildStats(submissions.length)

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
          <img src="/KyvantaLogo.png" alt="Kyvanta" className="h-8 w-auto" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                activeView === item.view
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.view === 'users' && submissions.length > 0 && (
                <span className="ml-auto text-[11px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded-full">
                  {submissions.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
          <div className="flex items-center justify-between px-5 sm:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900 font-medium capitalize">
                  {activeView}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-5 sm:px-8 py-8">
          <AnimatePresence mode="wait">
            {activeView === 'overview' && (
              <OverviewView
                key="overview"
                stats={stats}
                submissions={submissions}
              />
            )}
            {activeView === 'users' && (
              <UsersView
                key="users"
                submissions={submissions}
                onDelete={handleDelete}
                onClearAll={handleClearAll}
              />
            )}
            {activeView === 'projects' && <ProjectsView key="projects" />}
            {activeView === 'system' && <SystemView key="system" />}
          </AnimatePresence>
        </main>
      </div>

      {/* Toast notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-white border-green-200 text-green-700'
                  : 'bg-white border-red-200 text-red-700'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Overview ────────────────────────────────────────── */

function OverviewView({
  stats,
  submissions,
}: {
  stats: ReturnType<typeof buildStats>
  submissions: Submission[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here&apos;s what&apos;s happening across your projects today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-xl border border-slate-100 p-5 hover:border-slate-200 hover:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-medium text-slate-500">
                {stat.title}
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-slate-900">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-emerald-600 font-medium">
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent submissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-xl border border-slate-100 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">
            Recent Submissions
          </h2>
        </div>
        {submissions.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">
              No submissions yet. Contact form entries will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {submissions.slice(0, 5).map((sub) => (
              <div
                key={sub.id}
                className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors duration-150"
              >
                <div className="min-w-0">
                  <p className="text-sm text-slate-900 truncate">{sub.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {sub.email} — {sub.needLabel}
                  </p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {timeAgo(sub.timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ─── Users (Submissions) ─────────────────────────────── */

function UsersView({
  submissions,
  onDelete,
  onClearAll,
}: {
  submissions: Submission[]
  onDelete: (id: string) => void
  onClearAll: () => void
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Contact Submissions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            All inquiries received through the contact form.
          </p>
        </div>
        {submissions.length > 0 && (
          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 px-5 py-16 text-center">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            No submissions yet
          </h3>
          <p className="text-sm text-slate-500">
            When someone submits the contact form, their details will appear
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white rounded-xl border border-slate-100 overflow-hidden"
            >
              {/* Header row */}
              <button
                onClick={() =>
                  setExpanded(expanded === sub.id ? null : sub.id)
                }
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors duration-150"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                    {sub.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {sub.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {sub.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-md">
                    <Tag className="w-3 h-3" />
                    {sub.needLabel}
                  </span>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {timeAgo(sub.timestamp)}
                  </span>
                </div>
              </button>

              {/* Expanded details */}
              <AnimatePresence>
                {expanded === sub.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-5 pb-4 border-t border-slate-100 pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-2.5">
                          <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-slate-400 mb-0.5">
                              Email
                            </p>
                            <p className="text-sm text-slate-900">
                              {sub.email}
                            </p>
                          </div>
                        </div>
                        {sub.company && (
                          <div className="flex items-start gap-2.5">
                            <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 mb-0.5">
                                Company
                              </p>
                              <p className="text-sm text-slate-900">
                                {sub.company}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-2.5">
                          <Tag className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-slate-400 mb-0.5">
                              Service Needed
                            </p>
                            <p className="text-sm text-slate-900">
                              {sub.needLabel}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-slate-400 mb-0.5">
                              Submitted
                            </p>
                            <p className="text-sm text-slate-900">
                              {new Date(sub.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 mb-4">
                        <FileText className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400 mb-1">
                            Project Description
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {sub.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(sub.id)
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

/* ─── Projects (Placeholder) ──────────────────────────── */

function ProjectsView() {
  const projects = [
    { name: 'AI Platform v2', status: 'In Progress', progress: 72 },
    { name: 'Client Portal', status: 'Completed', progress: 100 },
    { name: 'IoT Dashboard', status: 'In Progress', progress: 45 },
    { name: 'Voice Assistant MVP', status: 'Planning', progress: 15 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          Projects
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of active and recent projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-xl border border-slate-100 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">
                {project.name}
              </h3>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                  project.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-600'
                    : project.status === 'Planning'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-blue-50 text-blue-600'
                }`}
              >
                {project.status}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {project.progress}% complete
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── System (Placeholder) ────────────────────────────── */

function SystemView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          System
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Infrastructure and deployment status.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <Server className="w-4 h-4 text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-900">
            System Information
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {systemInfo.map((item) => (
            <div
              key={item.label}
              className="px-5 py-3.5 flex items-center justify-between"
            >
              <span className="text-sm text-slate-500">{item.label}</span>
              <span className="text-sm font-medium text-slate-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
