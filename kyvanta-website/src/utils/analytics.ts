declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

let _sid: string | null = null
function get_session_id(): string {
  if (!_sid) {
    _sid = sessionStorage.getItem('analytics_sid')
    if (!_sid) {
      _sid = Math.random().toString(36).substring(2) + Date.now().toString(36)
      sessionStorage.setItem('analytics_sid', _sid)
    }
  }
  return _sid
}

interface AnalyticsEvent {
  id: string
  type: string
  path: string
  label?: string
  timestamp: number
  sessionId: string
}

const STORAGE_KEY = 'kyvanta_analytics'
const MAX_EVENTS = 500

function getStoredEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function storeEvent(event: AnalyticsEvent) {
  try {
    const events = getStoredEvents()
    events.unshift(event)
    if (events.length > MAX_EVENTS) events.splice(MAX_EVENTS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch {
    // Storage full or unavailable
  }
}

function track(type: string, path: string, label?: string) {
  storeEvent({
    id: Math.random().toString(36).substring(2) + Date.now().toString(36),
    type,
    path,
    label,
    timestamp: Date.now(),
    sessionId: get_session_id(),
  })
}

export function getAnalytics(): AnalyticsEvent[] {
  return getStoredEvents()
}

export function trackPageView(path: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', { page_path: path })
  }
  track('pageview', path)
}

export function trackFormStart(formName: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'form_start', { event_category: 'conversion', event_label: formName })
  }
  track('form_start', window.location.pathname, formName)
}

export function trackFormSubmit(formName: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'form_submit', { event_category: 'conversion', event_label: formName })
  }
  track('form_submit', window.location.pathname, formName)
}

export function trackCTAClick(label: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', { event_category: 'conversion', event_label: label })
  }
  track('cta_click', window.location.pathname, label)
}
