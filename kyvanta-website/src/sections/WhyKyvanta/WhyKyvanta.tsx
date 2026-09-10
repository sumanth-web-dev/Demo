import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { principles } from '../../data/principles'

export function WhyKyvanta() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <Container>
        <SectionHeading
          label="Why Kyvanta"
          title="Why Kyvanta instead of a generic agency, freelancer, or off-the-shelf tool?"
          description="We combine business understanding with production-grade engineering. Here's what sets us apart."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-100 rounded-xl overflow-hidden">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`p-8 sm:p-10 ${
                index % 2 === 0 ? 'border-r border-slate-100' : ''
              } ${index < 2 ? 'border-b border-slate-100' : ''}`}
            >
              <span className="text-xs font-semibold text-slate-300 tracking-wider">
                {principle.number}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 mt-2 mb-3">
                {principle.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
