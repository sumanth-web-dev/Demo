import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { CTA } from '../../components/CTA/CTA'
import { siteData } from '../../data/site'

const beliefs = [
  'Technology should be useful.',
  'Technology should be reliable.',
  'Technology should be understandable.',
  'Technology should be scalable.',
  'Technology should be human-centered.',
]

const philosophy = [
  { title: 'Understand deeply.', description: 'We invest time in understanding the problem before touching any code.' },
  { title: 'Design simply.', description: 'Complexity is hidden. The experience is intuitive.' },
  { title: 'Build precisely.', description: 'Every line of code serves a purpose. Every feature solves a problem.' },
  { title: 'Improve continuously.', description: 'Great technology evolves with the business it serves.' },
]

export function About() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-4">
              About Kyvanta
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
              We are an engineering company built around innovation.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              {siteData.company.description}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl font-semibold text-slate-900 leading-tight mb-6">
                Why we exist.
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Kyvanta Innovation was founded on a simple observation: businesses need technology that works for them, not the other way around.
                </p>
                <p>
                  Too many organizations are held back by systems that don't fit, tools that create complexity instead of reducing it, and technology decisions made without understanding the actual problem.
                </p>
                <p>
                  We built Kyvanta to be the engineering partner that bridges the gap between business needs and technical solutions. We combine deep engineering capability with genuine business understanding.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-10">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3 block">
                    Our Mission
                  </span>
                  <p className="text-lg text-slate-700 font-medium">
                    Build useful technology that solves meaningful problems.
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3 block">
                    Our Vision
                  </span>
                  <p className="text-lg text-slate-700 font-medium">
                    Create intelligent systems that make technology more capable, accessible, and useful.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
              Engineering Philosophy
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 leading-tight">
              How we approach our work.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-6 rounded-xl border border-slate-100"
              >
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Beliefs */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
              What We Believe
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 leading-tight">
              Technology should be.
            </h2>
          </motion.div>

          <div className="space-y-4 max-w-2xl">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-4 p-4 rounded-lg bg-white border border-slate-100"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">
                  {belief}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        label="Work With Us"
        title="Let's build something that matters."
        description="We're always interested in hearing about challenging problems and ambitious projects."
        primaryAction={{ label: 'Start a Conversation', to: '/contact' }}
        secondaryAction={{ label: 'View Our Solutions', to: '/solutions' }}
      />
    </>
  )
}
