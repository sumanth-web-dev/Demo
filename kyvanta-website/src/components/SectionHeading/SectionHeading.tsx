import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-slate-900 leading-[1.15] tracking-tight max-w-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  )
}
