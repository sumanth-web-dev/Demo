import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { clientProblems } from '../../data/problems'

export function ClientProblems() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <Container>
        <SectionHeading
          label="What We Help Solve"
          title="What can Kyvanta help your business solve?"
          description="Most businesses face the same operational bottlenecks. We help turn them into automated, intelligent systems."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clientProblems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group p-6 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {problem.description}
              </p>
              <Link
                to={`/solutions#${problem.solutionLink}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors duration-200"
              >
                See solution
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
