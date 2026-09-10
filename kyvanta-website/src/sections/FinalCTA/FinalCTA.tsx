import { CTA } from '../../components/CTA/CTA'

export function FinalCTA() {
  return (
    <CTA
      label="Ready to Start?"
      title="Find where AI can create value in your business."
      description="Book a free AI Strategy Call or request an AI Opportunity Audit. We'll discuss your challenges, identify opportunities, and outline a practical approach — no obligations."
      primaryAction={{ label: 'Book an AI Strategy Call', to: '/contact' }}
      secondaryAction={{ label: 'Request Free AI Audit', to: '/audit' }}
      dark
    />
  )
}
