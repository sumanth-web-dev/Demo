import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { technologyCategories } from '../../data/technology'

export function Technology() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <Container>
        <SectionHeading
          label="Technology"
          title="The technology behind the solution."
          description="We use technology as a tool to solve problems, not as an end in itself."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technologyCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: catIndex * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white rounded-xl border border-slate-100 p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {category.title}
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                {category.description}
              </p>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">
                        {item.name}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
