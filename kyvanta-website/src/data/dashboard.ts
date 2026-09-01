import {
  Users,
  FolderOpen,
  TrendingUp,
  Activity,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'

export type ActiveView = 'overview' | 'users' | 'projects' | 'system'

export interface SidebarItem {
  label: string
  icon: LucideIcon
  view: ActiveView
}

export const sidebarItems: SidebarItem[] = [
  { label: 'Overview', icon: TrendingUp, view: 'overview' },
  { label: 'Users', icon: Users, view: 'users' },
  { label: 'Projects', icon: FolderOpen, view: 'projects' },
  { label: 'System', icon: Activity, view: 'system' },
]

export interface StatCard {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'neutral'
  icon: LucideIcon
}

export function buildStats(submissionCount: number): StatCard[] {
  return [
    {
      title: 'Total Inquiries',
      value: String(submissionCount),
      change: submissionCount > 0 ? `${submissionCount} this session` : 'No submissions yet',
      changeType: 'positive',
      icon: MessageSquare,
    },
    {
      title: 'Active Projects',
      value: '34',
      change: '+3 this week',
      changeType: 'positive',
      icon: FolderOpen,
    },
    {
      title: 'Response Rate',
      value: '100%',
      change: 'Within 24 hours',
      changeType: 'neutral',
      icon: TrendingUp,
    },
    {
      title: 'System Status',
      value: 'Operational',
      change: '99.9% uptime',
      changeType: 'neutral',
      icon: Activity,
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
