import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border border-slate-100 rounded-xl p-6 sm:p-8 bg-white hover:border-slate-200 hover:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
          {project.category}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        {project.title}
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
            Challenge
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
            Approach
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {project.approach}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
            Solution
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-50 rounded-md border border-slate-100"
            >
              {tech}
            </span>
          ))}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
            Outcome
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {project.outcome}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
