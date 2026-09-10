import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '../../components/Container/Container'
import { CTA } from '../../components/CTA/CTA'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'
import { industries } from '../../data/industries'

export function IndustriesPage() {
  return (
    <>
      <SEO
        title="Industries We Serve"
        description="Kyvanta Innovation helps startups, SMEs, education, healthcare, and manufacturing organizations automate workflows and build AI-powered solutions."
        path="/industries"
      />
      <WebPageSchema
        title="Industries We Serve"
        description="Kyvanta Innovation helps startups, SMEs, education, healthcare, and manufacturing organizations automate workflows and build AI-powered solutions."
        path="/industries"
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
              Industries
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
              AI solutions built for your industry.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              We help organizations across industries automate workflows, build intelligent systems, and create custom software that solves real operational problems.
            </p>
          </motion.div>
        </Container>
      </section>

      {industries.map((industry, index) => (
        <section
          key={industry.id}
          id={industry.id}
          className={`py-20 sm:py-28 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-semibold text-slate-900 leading-tight mb-4">
                  {industry.name}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                  {industry.description}
                </p>
                <div className="mb-8">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">
                    Common Challenges
                  </h3>
                  <ul className="space-y-2">
                    {industry.problems.map((problem) => (
                      <li key={problem} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                        {problem}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="mb-8">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">
                    AI Opportunities
                  </h3>
                  <ul className="space-y-2">
                    {industry.opportunities.map((opp) => (
                      <li key={opp} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors duration-200"
                >
                  Discuss {industry.name} Solutions
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>
          </Container>
        </section>
      ))}

      <CTA
        label="Your Industry"
        title="Not listed? We can help."
        description="Tell us about your industry and operational challenges. We'll assess whether AI and automation can create value for your business."
        primaryAction={{ label: 'Book an AI Strategy Call', to: '/contact' }}
        secondaryAction={{ label: 'View All Solutions', to: '/solutions' }}
        dark
      />
    </>
  )
}
