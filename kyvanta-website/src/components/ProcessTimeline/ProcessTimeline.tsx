import { motion } from 'framer-motion'

interface ProcessStep {
  number: string
  title: string
  description: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative">
      {/* Desktop horizontal line */}
      <div className="hidden md:block absolute top-[1.625rem] left-0 right-0 h-px bg-slate-200" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="flex flex-col items-center md:items-start">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold mb-4 relative z-10">
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1.5 text-center md:text-left">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed text-center md:text-left">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
