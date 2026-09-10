import { SEO, OrganizationSchema, WebSiteSchema } from '../../components/SEO/SEO'
import { Hero } from '../../sections/Hero/Hero'
import { TrustStrip } from '../../sections/TrustStrip/TrustStrip'
import { ClientProblems } from '../../sections/ClientProblems/ClientProblems'
import { Solutions } from '../../sections/Solutions/Solutions'
import { WhyKyvanta } from '../../sections/WhyKyvanta/WhyKyvanta'
import { WhyNotChatGPT } from '../../sections/WhyNotChatGPT/WhyNotChatGPT'
import { AIAgentsExplainer } from '../../sections/AIAgentsExplainer/AIAgentsExplainer'
import { Process } from '../../sections/Process/Process'
import { Projects } from '../../sections/Projects/Projects'
import { ProjectCTA } from '../../sections/FinalCTA/ProjectCTA'
import { Trust } from '../../sections/Trust/Trust'
import { FinalCTA } from '../../sections/FinalCTA/FinalCTA'

export function Home() {
  return (
    <>
      <SEO
        title="AI, Automation & Custom Software Engineering"
        description="Kyvanta Innovation helps businesses automate workflows, build AI agents, and create custom software that solves real operational problems."
        path="/"
      />
      <OrganizationSchema />
      <WebSiteSchema />
      <Hero />
      <TrustStrip />
      <ClientProblems />
      <Solutions />
      <WhyKyvanta />
      <WhyNotChatGPT />
      <AIAgentsExplainer />
      <Process />
      <Projects />
      <ProjectCTA />
      <Trust />
      <FinalCTA />
    </>
  )
}
