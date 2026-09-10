import { CTA } from '../../components/CTA/CTA'

export function ProjectCTA() {
  return (
    <CTA
      label="Have a project in mind?"
      title="We'd love to hear about what you're trying to build."
      description="Tell us about your challenge and we'll explore how we can help."
      primaryAction={{ label: 'Book an AI Strategy Call', to: '/contact' }}
      secondaryAction={{ label: 'View All Solutions', to: '/solutions' }}
    />
  )
}
