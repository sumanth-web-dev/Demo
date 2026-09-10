import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { CTA } from '../../components/CTA/CTA'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'

const contentPillars = [
  {
    title: 'AI Business Education',
    description: 'Practical guides explaining how AI can solve real business problems — without the hype.',
    status: 'Coming Soon',
  },
  {
    title: 'AI Automation',
    description: 'Real workflow examples showing how businesses automate repetitive processes with AI.',
    status: 'Coming Soon',
  },
  {
    title: 'AI Agents',
    description: 'Use cases demonstrating how AI agents handle multi-step business tasks.',
    status: 'Coming Soon',
  },
  {
    title: 'Build in Public',
    description: 'Behind-the-scenes looks at what we build and how we solve technical challenges.',
    status: 'Coming Soon',
  },
  {
    title: 'Case Studies',
    description: 'Detailed breakdowns of real projects — the problem, approach, solution, and outcomes.',
    status: 'Coming Soon',
  },
  {
    title: 'ROI & Strategy',
    description: 'How to evaluate AI investments, measure success, and build a practical AI strategy.',
    status: 'Coming Soon',
  },
]

export function InsightsPage() {
  return (
    <>
      <SEO
        title="Insights & Resources"
        description="AI business education, automation guides, agent use cases, and practical strategy resources from Kyvanta Innovation."
        path="/insights"
      />
      <WebPageSchema
        title="Insights & Resources"
        description="AI business education, automation guides, agent use cases, and practical strategy resources from Kyvanta Innovation."
        path="/insights"
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
              Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
              AI insights for business leaders.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              Practical resources on AI automation, AI agents, and building intelligent systems that solve real business problems.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 sm:p-8 rounded-xl bg-white border border-slate-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-900">{pillar.title}</h3>
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full">
                    {pillar.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        label="Stay Updated"
        title="Want AI insights for your business?"
        description="We're building a library of practical AI resources. In the meantime, book a free strategy call to discuss your specific challenges."
        primaryAction={{ label: 'Book a Strategy Call', to: '/contact' }}
        secondaryAction={{ label: 'View Solutions', to: '/solutions' }}
      />
    </>
  )
}
