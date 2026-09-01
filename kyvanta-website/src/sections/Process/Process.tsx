import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ProcessTimeline } from '../../components/ProcessTimeline/ProcessTimeline'
import { processSteps } from '../../data/process'

export function Process() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <Container>
        <SectionHeading
          label="How We Work"
          title="From problem to production."
          description="A proven process that turns complex challenges into reliable technology."
        />

        <ProcessTimeline steps={processSteps} />
      </Container>
    </section>
  )
}
