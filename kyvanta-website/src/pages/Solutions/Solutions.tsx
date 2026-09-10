import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { CTA } from '../../components/CTA/CTA'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'
import { solutions } from '../../data/solutions'
import { pricingModels } from '../../data/pricing'

export function SolutionsPage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  return (
    <>
      <SEO
        title="AI, Automation & Software Solutions"
        description="Explore Kyvanta's solutions — AI automation, AI agents, custom AI applications, conversational AI, AI integration, intelligent document processing, and custom software development."
        path="/solutions"
      />
      <WebPageSchema
        title="AI, Automation & Software Solutions"
        description="Explore Kyvanta's solutions — AI automation, AI agents, custom AI applications, conversational AI, AI integration, intelligent document processing, and custom software development."
        path="/solutions"
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
              Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
              Technology designed around your business.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              We help businesses automate workflows, build AI agents, and create custom software that solves real operational problems. Each solution is built to fit how your team actually works.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Solutions detail */}
      {solutions.map((solution, index) => {
        const Icon = solution.icon
        return (
          <section
            key={solution.id}
            id={solution.id}
            className={`py-20 sm:py-28 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          >
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Left: Title and icon */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${solution.detailColor}10` }}
                  >
                    <span style={{ color: solution.detailColor }}>
                      <Icon className="w-6 h-6" />
                    </span>
                  </div>
                  <h2 className="text-3xl font-semibold text-slate-900 leading-tight mb-4">
                    {solution.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed">
                    {solution.description}
                  </p>
                </motion.div>

                {/* Right: Details */}
                <div className="lg:col-span-8 space-y-8">
                  {[
                    { label: 'The Problem', text: solution.customerProblem },
                    { label: 'Our Solution', text: solution.solution },
                    { label: 'Who Needs This', text: solution.whoNeedsIt },
                    { label: 'Business Outcome', text: solution.businessOutcome },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2">
                        {item.label}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">
                      Use Cases
                    </h3>
                    <ul className="space-y-2">
                      {solution.useCases.map((useCase) => (
                        <li key={useCase} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">
                      Technology
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {solution.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {(() => {
                    const pricing = pricingModels.find((p) => p.serviceId === solution.id)
                    if (!pricing) return null
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="p-5 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2">
                          Pricing Approach
                        </h3>
                        <p className="text-sm font-medium text-slate-900 mb-1">{pricing.model}</p>
                        <p className="text-sm text-slate-500 leading-relaxed mb-2">{pricing.description}</p>
                        <p className="text-xs text-slate-400">
                          Entry point: {pricing.entryPoint}
                        </p>
                      </motion.div>
                    )
                  })()}
                </div>
              </div>
            </Container>
          </section>
        )
      })}

      <CTA
        label="Next Step"
        title="Discuss your challenge."
        description="Tell us about the problem you're trying to solve, and we'll help you find the right approach."
        primaryAction={{ label: 'Book an AI Strategy Call', to: '/contact' }}
        secondaryAction={{ label: 'View Our Work', to: '/projects' }}
        dark
      />
    </>
  )
}
