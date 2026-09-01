import { SEO, OrganizationSchema, WebSiteSchema } from '../../components/SEO/SEO'
import { Hero } from '../../sections/Hero/Hero'
import { TrustStrip } from '../../sections/TrustStrip/TrustStrip'
import { ClientProblems } from '../../sections/ClientProblems/ClientProblems'
import { Solutions } from '../../sections/Solutions/Solutions'
import { WhyKyvanta } from '../../sections/WhyKyvanta/WhyKyvanta'
import { Technology } from '../../sections/Technology/Technology'
import { Process } from '../../sections/Process/Process'
import { Projects } from '../../sections/Projects/Projects'
import { FinalCTA } from '../../sections/FinalCTA/FinalCTA'

export function Home() {
  return (
    <>
      <SEO
        title="AI, Software & Intelligent Technology"
        description="Kyvanta Innovation builds intelligent software, AI systems, automation solutions, and scalable digital technology for modern businesses."
        path="/"
      />
      <OrganizationSchema />
      <WebSiteSchema />
      <Hero />
      <TrustStrip />
      <ClientProblems />
      <Solutions />
      <WhyKyvanta />
      <Technology />
      <Process />
      <Projects />
      <FinalCTA />
    </>
  )
}
