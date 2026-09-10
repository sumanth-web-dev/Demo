import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Filter,
  Search,
  ChevronDown,
  Eye,
  MousePointerClick,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { logout } from '../../utils/auth'
import { getAnalytics } from '../../utils/analytics'
import {
  sidebarItems,
  buildStats,
  systemInfo,
  buildAnalyticsStats,
  type ActiveView,
  type AnalyticsEvent,
} from '../../data/dashboard'

interface Submission {
  id: string
  formType: 'contact' | 'audit'
  name: string
  email: string
  company: string
  need: string
  needLabel: string
  description: string
  industry: string
  problemArea?: string
  desiredSolution?: string
  currentProcess?: string
  existingSoftware?: string
  timeline?: string
  budget?: string
  area?: string
  teamSize?: string
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState<ActiveView>('overview')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [analytics] = useState<AnalyticsEvent[]>(() => getAnalytics())
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
      .then((r) => r.json())
      .catch(() => [])
      .then((data) => {
        if (!cancelled) setSubmissions(Array.isArray(data) ? data : [])
      })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

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

  const stats = buildStats(
    submissions.length,
    submissions.filter((s) => s.formType === 'audit').length,
    submissions.filter((s) => s.formType === 'contact').length,
  )
  const analyticsStats = buildAnalyticsStats(analytics)

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
                analyticsStats={analyticsStats}
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
            {activeView === 'settings' && <SettingsView key="settings" />}
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
  analyticsStats,
}: {
  stats: ReturnType<typeof buildStats>
  submissions: Submission[]
  analyticsStats: ReturnType<typeof buildAnalyticsStats>
}) {
  const industryCounts = submissions.reduce(
    (acc, s) => {
      acc[s.industry] = (acc[s.industry] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const sortedIndustries = Object.entries(industryCounts).sort((a, b) => b[1] - a[1])
  const maxIndustryCount = sortedIndustries.length > 0 ? sortedIndustries[0][1] : 1

  const topPages = Object.entries(analyticsStats.viewsByPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const topCtas = Object.entries(analyticsStats.clicksByLabel)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Analytics and submission overview.
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
            <div className={`mt-1 text-xs font-medium ${
              stat.changeType === 'positive' ? 'text-emerald-600' : 'text-slate-500'
            }`}>
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visitor Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-[13px] font-medium text-slate-500">Page Views</span>
          </div>
          <div className="text-2xl font-semibold text-slate-900">
            {analyticsStats.totalPageviews}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {analyticsStats.uniqueSessions} unique sessions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-[13px] font-medium text-slate-500">CTA Clicks</span>
          </div>
          <div className="text-2xl font-semibold text-slate-900">
            {analyticsStats.totalCtaClicks}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {analyticsStats.totalFormStarts} form starts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-[13px] font-medium text-slate-500">Conversion</span>
          </div>
          <div className="text-2xl font-semibold text-slate-900">
            {analyticsStats.conversionRate}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {analyticsStats.totalFormSubmits} submissions
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Industry Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-xl border border-slate-100 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">
              Submissions by Industry
            </h2>
          </div>
          {sortedIndustries.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-slate-500">No data yet</p>
            </div>
          ) : (
            <div className="p-5 space-y-3">
              {sortedIndustries.map(([industry, count]) => (
                <div key={industry}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600">
                      {industryLabels[industry] || industry}
                    </span>
                    <span className="text-xs text-slate-500">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxIndustryCount) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-slate-900 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-xl border border-slate-100 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">
              Top Pages
            </h2>
          </div>
          {topPages.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-slate-500">No page views tracked yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {topPages.map(([path, views]) => (
                <div
                  key={path}
                  className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm text-slate-700 font-mono">{path}</span>
                  <span className="text-sm font-medium text-slate-900">{views}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-xl border border-slate-100 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">
              Top CTA Buttons
            </h2>
          </div>
          {topCtas.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-slate-500">No CTA clicks tracked yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {topCtas.map(([label, clicks]) => (
                <div
                  key={label}
                  className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm text-slate-700">{label}</span>
                  <span className="text-sm font-medium text-slate-900">{clicks}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-xl border border-slate-100 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">
              Recent Submissions
            </h2>
          </div>
          {submissions.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                No submissions yet.
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
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-slate-900 truncate">{sub.name}</p>
                      <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                        sub.formType === 'audit' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {sub.formType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {sub.needLabel}
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
      </div>
    </motion.div>
  )
}

/* ─── Custom Dropdown ─────────────────────────────────── */

interface DropdownOption {
  value: string
  label: string
  count?: number
}

function CustomDropdown({
  value,
  onChange,
  options,
  icon: Icon,
  placeholder,
}: {
  value: string
  onChange: (val: string) => void
  options: DropdownOption[]
  icon: LucideIcon
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 pl-3 pr-2 py-2 text-sm border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:border-slate-900 transition-colors bg-white cursor-pointer min-w-[160px]"
      >
        <Icon className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="flex-1 text-left truncate">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-50 transition-colors ${
                    value === opt.value ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-600'
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.count !== undefined && (
                    <span className="text-xs text-slate-400">{opt.count}</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Users (Submissions) ─────────────────────────────── */

const industryLabels: Record<string, string> = {
  operations: 'Operations',
  technology: 'Technology',
  'customer-service': 'Customer Service',
  sales: 'Sales',
  general: 'General',
}

const industryColors: Record<string, string> = {
  operations: 'bg-blue-100 text-blue-700',
  technology: 'bg-purple-100 text-purple-700',
  'customer-service': 'bg-green-100 text-green-700',
  sales: 'bg-orange-100 text-orange-700',
  general: 'bg-slate-100 text-slate-700',
}

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
  const [filterIndustry, setFilterIndustry] = useState<string>('all')
  const [filterFormType, setFilterFormType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = submissions.filter((s) => {
    if (filterIndustry !== 'all' && s.industry !== filterIndustry) return false
    if (filterFormType !== 'all' && s.formType !== filterFormType) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.company.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      )
    }
    return true
  })

  const industryCounts = submissions.reduce(
    (acc, s) => {
      acc[s.industry] = (acc[s.industry] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const industryOptions: DropdownOption[] = [
    { value: 'all', label: 'All Industries' },
    ...Object.entries(industryLabels).map(([key, label]) => ({
      value: key,
      label,
      count: industryCounts[key] || 0,
    })),
  ]

  const formTypeOptions: DropdownOption[] = [
    { value: 'all', label: 'All Forms' },
    { value: 'contact', label: 'Contact' },
    { value: 'audit', label: 'Audit' },
  ]

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
            Submissions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {submissions.length} total · {filtered.length} shown
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
          />
        </div>

        <CustomDropdown
          value={filterIndustry}
          onChange={setFilterIndustry}
          options={industryOptions}
          icon={Filter}
          placeholder="Industry"
        />

        <CustomDropdown
          value={filterFormType}
          onChange={setFilterFormType}
          options={formTypeOptions}
          icon={Tag}
          placeholder="Form Type"
        />
      </div>

      {/* Industry breakdown */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(industryCounts).map(([industry, count]) => (
          <button
            key={industry}
            onClick={() => setFilterIndustry(filterIndustry === industry ? 'all' : industry)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              filterIndustry === industry
                ? 'bg-slate-900 text-white'
                : `${industryColors[industry] || 'bg-slate-100 text-slate-700'} hover:opacity-80`
            }`}
          >
            {industryLabels[industry] || industry}
            <span className="opacity-70">{count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 px-5 py-16 text-center">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            No submissions found
          </h3>
          <p className="text-sm text-slate-500">
            {submissions.length === 0
              ? 'When someone submits a form, their details will appear here.'
              : 'Try adjusting your filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((sub, i) => (
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
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {sub.name}
                      </p>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded ${
                        sub.formType === 'audit' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {sub.formType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {sub.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md ${industryColors[sub.industry] || 'bg-slate-100 text-slate-700'}`}>
                    {industryLabels[sub.industry] || sub.industry}
                  </span>
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
                              <p className="text-sm text-sslate-900">
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
                        {sub.teamSize && (
                          <div className="flex items-start gap-2.5">
                            <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 mb-0.5">
                                Team Size
                              </p>
                              <p className="text-sm text-slate-900">
                                {sub.teamSize}
                              </p>
                            </div>
                          </div>
                        )}
                        {sub.timeline && (
                          <div className="flex items-start gap-2.5">
                            <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 mb-0.5">
                                Timeline
                              </p>
                              <p className="text-sm text-slate-900">
                                {sub.timeline}
                              </p>
                            </div>
                          </div>
                        )}
                        {sub.budget && (
                          <div className="flex items-start gap-2.5">
                            <Tag className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 mb-0.5">
                                Budget
                              </p>
                              <p className="text-sm text-slate-900">
                                {sub.budget}
                              </p>
                            </div>
                          </div>
                        )}
                        {sub.desiredSolution && (
                          <div className="flex items-start gap-2.5">
                            <Tag className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 mb-0.5">
                                Desired Solution
                              </p>
                              <p className="text-sm text-slate-900">
                                {sub.desiredSolution}
                              </p>
                            </div>
                          </div>
                        )}
                        {sub.currentProcess && (
                          <div className="flex items-start gap-2.5">
                            <FileText className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 mb-0.5">
                                Current Process
                              </p>
                              <p className="text-sm text-slate-900">
                                {sub.currentProcess}
                              </p>
                            </div>
                          </div>
                        )}
                        {sub.existingSoftware && (
                          <div className="flex items-start gap-2.5">
                            <Server className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 mb-0.5">
                                Existing Software
                              </p>
                              <p className="text-sm text-slate-900">
                                {sub.existingSoftware}
                              </p>
                            </div>
                          </div>
                        )}
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

/* ─── Settings ────────────────────────────────────────── */

function SettingsView() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [autoReply, setAutoReply] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure your dashboard preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Notifications</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                <p className="text-xs text-slate-500">Get notified when someone submits a form</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? 'bg-slate-900' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Auto-Reply</p>
                <p className="text-xs text-slate-500">Send automatic confirmation email</p>
              </div>
              <button
                onClick={() => setAutoReply(!autoReply)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoReply ? 'bg-slate-900' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoReply ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900">System Information</h2>
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
      </div>
    </motion.div>
  )
}
