import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Solution } from '../../data/solutions'
import { Link } from 'react-router-dom'

interface SolutionItemProps {
  solution: Solution
  index: number
}

export function SolutionItem({ solution, index }: SolutionItemProps) {
  const Icon = solution.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={`/solutions#${solution.id}`}
        className="group block p-6 sm:p-8 rounded-xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${solution.detailColor}10` }}
          >
            <span style={{ color: solution.detailColor }}>
              <Icon className="w-5 h-5" />
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all duration-200 mt-1" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {solution.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {solution.description}
        </p>
      </Link>
    </motion.div>
  )
}
