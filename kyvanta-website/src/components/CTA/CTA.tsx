import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../Container/Container'

interface CTAProps {
  label?: string
  title: string
  description?: string
  primaryAction: { label: string; to: string }
  secondaryAction?: { label: string; to: string }
  dark?: boolean
}

export function CTA({
  label,
  title,
  description,
  primaryAction,
  secondaryAction,
  dark = false,
}: CTAProps) {
  return (
    <section
      className={`py-24 sm:py-32 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {label && (
            <span
              className={`inline-block text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 ${dark ? 'text-slate-400' : 'text-slate-400'}`}
            >
              {label}
            </span>
          )}
          <h2
            className={`text-3xl sm:text-4xl font-semibold leading-[1.15] tracking-tight mb-5 ${dark ? 'text-white' : 'text-slate-900'}`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`text-base sm:text-lg leading-relaxed mb-8 ${dark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              {description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={primaryAction.to}
              data-track-cta={`cta-${primaryAction.to.replace('/', '')}`}
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md bg-white text-slate-900 hover:bg-slate-100 transition-colors duration-200"
            >
              {primaryAction.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            {secondaryAction && (
              <Link
                to={secondaryAction.to}
                data-track-cta={`cta-${secondaryAction.to.replace('/', '')}`}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                  dark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
