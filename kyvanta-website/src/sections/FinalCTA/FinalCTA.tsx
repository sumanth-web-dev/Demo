import { CTA } from '../../components/CTA/CTA'

export function FinalCTA() {
  return (
    <CTA
      label="Start a Conversation"
      title="Let's solve something meaningful."
      description="Tell us what you're trying to build, improve, automate, or solve. We'll start by understanding the problem."
      primaryAction={{ label: 'Start the Conversation', to: '/contact' }}
      secondaryAction={{ label: 'Explore Solutions', to: '/solutions' }}
      dark
    />
  )
}
