import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { testimonials, trustSignals } from '../../data/trust'

const metrics = [
  { label: 'Projects Delivered', value: trustSignals.projectsDelivered },
  { label: 'Client Satisfaction', value: trustSignals.clientSatisfaction },
  { label: 'Response Time', value: trustSignals.responseTime },
  { label: 'Years in Business', value: trustSignals.yearsInBusiness },
].filter((stat) => stat.value && !stat.value.includes('NEEDS BUSINESS INPUT'))

const hasTestimonials = testimonials.length > 0 && testimonials[0].author !== 'NEEDS BUSINESS INPUT'

export function Trust() {
  if (metrics.length === 0 && !hasTestimonials) return null

  return (
    <section className="py-24 sm:py-32 bg-white">
      <Container>
        <SectionHeading
          label="Trusted By Businesses"
          title="Built for companies that need production-grade AI."
          description="We combine deep engineering capability with genuine business understanding."
        />

        {/* Trust metrics */}
        {metrics.length > 0 && (
          <div className={`grid gap-6 mb-16 ${metrics.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' : 'grid-cols-2 sm:grid-cols-4'}`}>
            {metrics.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="text-center p-6 rounded-xl border border-slate-100"
              >
                <div className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        {hasTestimonials && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-100"
              >
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-xs text-slate-500">{testimonial.role}, {testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
