import {
  Users,
  TrendingUp,
  Activity,
  MessageSquare,
  FileText,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'

export type ActiveView = 'overview' | 'users' | 'settings'

export interface SidebarItem {
  label: string
  icon: LucideIcon
  view: ActiveView
}

export const sidebarItems: SidebarItem[] = [
  { label: 'Overview', icon: TrendingUp, view: 'overview' },
  { label: 'Submissions', icon: Users, view: 'users' },
  { label: 'Settings', icon: Activity, view: 'settings' },
]

export interface StatCard {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'neutral' | 'negative'
  icon: LucideIcon
}

export function buildStats(submissionCount: number, auditCount: number, contactCount: number): StatCard[] {
  return [
    {
      title: 'Total Submissions',
      value: String(submissionCount),
      change: submissionCount > 0 ? 'All time' : 'No submissions yet',
      changeType: 'positive',
      icon: MessageSquare,
    },
    {
      title: 'Contact Forms',
      value: String(contactCount),
      change: contactCount > 0 ? `${Math.round((contactCount / Math.max(submissionCount, 1)) * 100)}% of total` : 'None yet',
      changeType: 'neutral',
      icon: FileText,
    },
    {
      title: 'Audit Requests',
      value: String(auditCount),
      change: auditCount > 0 ? `${Math.round((auditCount / Math.max(submissionCount, 1)) * 100)}% of total` : 'None yet',
      changeType: 'neutral',
      icon: ArrowUpRight,
    },
    {
      title: 'Response Time',
      value: '< 24h',
      change: 'Average response',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ]
}

export interface SystemInfo {
  label: string
  value: string
}

export const systemInfo: SystemInfo[] = [
  { label: 'Platform Version', value: '2.4.1' },
  { label: 'Last Deploy', value: 'Today, 09:14 AM' },
  { label: 'Database', value: 'PostgreSQL 16.2' },
  { label: 'Hosting', value: 'AWS us-east-1' },
  { label: 'SSL Certificate', value: 'Valid until Dec 2026' },
  { label: 'CDN', value: 'CloudFront' },
]

export interface AnalyticsEvent {
  id: string
  type: 'pageview' | 'cta_click' | 'form_start' | 'form_submit'
  path: string
  label?: string
  timestamp: number
  sessionId: string
}

export function buildAnalyticsStats(events: AnalyticsEvent[]) {
  const pageviews = events.filter((e) => e.type === 'pageview')
  const ctaClicks = events.filter((e) => e.type === 'cta_click')
  const formStarts = events.filter((e) => e.type === 'form_start')
  const formSubmits = events.filter((e) => e.type === 'form_submit')

  // Unique sessions
  const uniqueSessions = new Set(events.map((e) => e.sessionId)).size

  // Page views by path
  const viewsByPath: Record<string, number> = {}
  pageviews.forEach((e) => {
    viewsByPath[e.path] = (viewsByPath[e.path] || 0) + 1
  })

  // CTA clicks by label
  const clicksByLabel: Record<string, number> = {}
  ctaClicks.forEach((e) => {
    const label = e.label || 'unknown'
    clicksByLabel[label] = (clicksByLabel[label] || 0) + 1
  })

  // Events over time (last 7 days)
  const now = Date.now()
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
  const recentEvents = events.filter((e) => e.timestamp > sevenDaysAgo)

  const dailyViews: Record<string, number> = {}
  const dailySubmissions: Record<string, number> = {}
  recentEvents.forEach((e) => {
    const date = new Date(e.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    if (e.type === 'pageview') {
      dailyViews[date] = (dailyViews[date] || 0) + 1
    }
    if (e.type === 'form_submit') {
      dailySubmissions[date] = (dailySubmissions[date] || 0) + 1
    }
  })

  // Conversion rate
  const conversionRate = pageviews.length > 0
    ? Math.round((formSubmits.length / pageviews.length) * 100)
    : 0

  return {
    totalPageviews: pageviews.length,
    totalCtaClicks: ctaClicks.length,
    totalFormStarts: formStarts.length,
    totalFormSubmits: formSubmits.length,
    uniqueSessions,
    viewsByPath,
    clicksByLabel,
    dailyViews,
    dailySubmissions,
    conversionRate,
  }
}

export type { AnalyticsEvent as DashboardAnalyticsEvent }
