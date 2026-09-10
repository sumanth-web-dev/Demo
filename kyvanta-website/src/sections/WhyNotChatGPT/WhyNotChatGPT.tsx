import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { whyNotChatGPT } from '../../data/whyNotChatGPT'

export function WhyNotChatGPT() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <Container>
        <SectionHeading
          label="Why Not Just Use ChatGPT?"
          title="Generic AI tools are useful. But businesses often need more."
          description="We help turn AI capabilities into systems that actually operate inside your business."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyNotChatGPT.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-6 rounded-xl bg-white border border-slate-100 hover:border-slate-200 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 p-6 sm:p-8 rounded-xl bg-white border border-slate-100"
        >
          <p className="text-base sm:text-lg text-slate-700 font-medium">
            Generic AI tools answer questions. Kyvanta builds AI systems that take action.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
