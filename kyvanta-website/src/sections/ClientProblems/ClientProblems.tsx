import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { clientProblems } from '../../data/problems'

export function ClientProblems() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <Container>
        <SectionHeading
          label="The Challenge"
          title="Complex problems deserve better technology."
          description="Many businesses struggle with systems that slow them down instead of helping them grow."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientProblems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors duration-300"
            >
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-100"
        >
          <p className="text-base sm:text-lg text-slate-700 font-medium">
            We help turn these challenges into practical, scalable technology solutions.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
