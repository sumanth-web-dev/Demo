import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { siteData } from '../../data/site'

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-white overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-50/60 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-50/40 via-transparent to-transparent rounded-full blur-3xl" />

        {/* Abstract workflow visual */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] opacity-[0.06]"
          viewBox="0 0 700 700"
          fill="none"
        >
          {/* Workflow nodes */}
          <circle cx="350" cy="200" r="24" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
          <circle cx="350" cy="200" r="4" fill="currentColor" className="text-blue-500" />
          <circle cx="350" cy="350" r="24" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
          <circle cx="350" cy="350" r="4" fill="currentColor" className="text-blue-500" />
          <circle cx="350" cy="500" r="24" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
          <circle cx="350" cy="500" r="4" fill="currentColor" className="text-blue-500" />
          <circle cx="200" cy="275" r="18" stroke="currentColor" strokeWidth="0.8" className="text-slate-900" />
          <circle cx="200" cy="275" r="3" fill="currentColor" className="text-cyan-400" />
          <circle cx="500" cy="275" r="18" stroke="currentColor" strokeWidth="0.8" className="text-slate-900" />
          <circle cx="500" cy="275" r="3" fill="currentColor" className="text-cyan-400" />
          <circle cx="200" cy="425" r="18" stroke="currentColor" strokeWidth="0.8" className="text-slate-900" />
          <circle cx="200" cy="425" r="3" fill="currentColor" className="text-cyan-400" />
          <circle cx="500" cy="425" r="18" stroke="currentColor" strokeWidth="0.8" className="text-slate-900" />
          <circle cx="500" cy="425" r="3" fill="currentColor" className="text-cyan-400" />
          {/* Connecting lines */}
          <line x1="350" y1="224" x2="350" y2="326" stroke="currentColor" strokeWidth="0.5" className="text-slate-900" />
          <line x1="350" y1="374" x2="350" y2="476" stroke="currentColor" strokeWidth="0.5" className="text-slate-900" />
          <line x1="218" y1="275" x2="326" y2="350" stroke="currentColor" strokeWidth="0.3" className="text-slate-900" />
          <line x1="482" y1="275" x2="374" y2="350" stroke="currentColor" strokeWidth="0.3" className="text-slate-900" />
          <line x1="218" y1="425" x2="326" y2="350" stroke="currentColor" strokeWidth="0.3" className="text-slate-900" />
          <line x1="482" y1="425" x2="374" y2="350" stroke="currentColor" strokeWidth="0.3" className="text-slate-900" />
        </svg>
      </div>

      <Container className="relative z-10 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">
              Kyvanta Innovation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-semibold text-slate-900 leading-[1.08] tracking-tight"
          >
            AI, automation and software
            <br />
            built around your business.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl"
          >
            {siteData.positioning.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              data-track-cta="hero-strategy-call"
              className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors duration-200"
            >
              <Calendar className="w-4 h-4" />
              Book an AI Strategy Call
            </Link>
            <Link
              to="/audit"
              data-track-cta="hero-free-audit"
              className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:border-slate-300 transition-all duration-200"
            >
              Request Free AI Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 sm:mt-16 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {['AI Automation', 'AI Agents', 'Custom Software', 'AI Integration'].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
                className="text-xs sm:text-sm font-medium text-slate-400"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
