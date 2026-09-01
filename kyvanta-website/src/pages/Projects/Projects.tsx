import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { CTA } from '../../components/CTA/CTA'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'
import { projects } from '../../data/projects'

export function ProjectsPage() {
  return (
    <>
      <SEO
        title="Projects & Case Studies"
        description="View Kyvanta's project portfolio — AI systems, automation platforms, and custom software solutions built for real business challenges."
        path="/projects"
      />
      <WebPageSchema
        title="Projects & Case Studies"
        description="View Kyvanta's project portfolio — AI systems, automation platforms, and custom software solutions built for real business challenges."
        path="/projects"
      />
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-4">
              Projects
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
              Selected capabilities.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              Examples of what we can create. Each project demonstrates our approach to solving complex business challenges with technology.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Projects */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CTA
        label="Build Something Similar"
        title="Have a project in mind?"
        description="We'd love to hear about what you're trying to build. Tell us about your challenge and we'll explore how we can help."
        primaryAction={{ label: 'Start the Conversation', to: '/contact' }}
        secondaryAction={{ label: 'View All Solutions', to: '/solutions' }}
        dark
      />
    </>
  )
}
