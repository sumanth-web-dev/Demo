import { useEffect, useRef } from 'react'
import { trackPageView, trackCTAClick } from '../../utils/analytics'

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined

export function Analytics() {
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    if (GA_ID) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', GA_ID, { send_page_view: false })
    }

    trackPageView(window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const cta = target.closest('[data-track-cta]') as HTMLElement | null
      if (cta) {
        const label = cta.dataset.trackCta || 'unknown'
        trackCTAClick(label)
      }
    }
    document.addEventListener('click', handleClick, { passive: true })
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
