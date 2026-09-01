import { Link } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { SolutionItem } from '../../components/SolutionItem/SolutionItem'
import { solutions } from '../../data/solutions'

export function Solutions() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <Container>
        <SectionHeading
          label="What We Build"
          title="We build technology around real business needs."
          description="Each solution is designed to solve a specific set of business challenges with the right technology."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((solution, index) => (
            <SolutionItem key={solution.id} solution={solution} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
          >
            View all solutions
            <span className="text-slate-400">→</span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
