import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { siteData } from '../../data/site'

export function TrustStrip() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-6">
            {siteData.trustStrip.capabilities.map((cap, i) => (
              <motion.span
                key={cap}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-xs sm:text-sm font-medium text-slate-500 tracking-wide"
              >
                {cap}
              </motion.span>
            ))}
          </div>
          <p className="text-sm text-slate-400">
            {siteData.trustStrip.label}
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
