import { motion } from 'framer-motion'
import { Container } from '../../components/Container/Container'
import { CTA } from '../../components/CTA/CTA'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'
import { technologyCategories } from '../../data/technology'

export function TechnologyPage() {
  return (
    <>
      <SEO
        title="Technology Stack & Engineering Tools"
        description="Kyvanta's technology stack — AI frameworks, cloud platforms, programming languages, databases, and DevOps tools powering intelligent solutions."
        path="/technology"
      />
      <WebPageSchema
        title="Technology Stack & Engineering Tools"
        description="Kyvanta's technology stack — AI frameworks, cloud platforms, programming languages, databases, and DevOps tools powering intelligent solutions."
        path="/technology"
      />
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-4">
              Technology
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
              The technology behind the solution.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              We choose technology based on what serves the problem best. Every tool has a purpose, every architecture decision is intentional.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <div className="space-y-16">
            {technologyCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: catIndex * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                    {category.title}
                  </h2>
                  <p className="text-slate-500">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: itemIndex * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="bg-white rounded-xl border border-slate-100 p-6 hover:border-slate-200 transition-colors duration-300"
                    >
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        label="Explore What We Can Build"
        title="Have a specific technology need?"
        description="We'll help you identify the right technology stack and architecture for your project."
        primaryAction={{ label: 'Discuss Your Project', to: '/contact' }}
        secondaryAction={{ label: 'View Solutions', to: '/solutions' }}
      />
    </>
  )
}
