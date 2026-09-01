import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, ChevronDown } from 'lucide-react'
import { Container } from '../../components/Container/Container'

const needOptions = [
  { value: '', label: 'Select an area' },
  { value: 'ai', label: 'AI & Intelligent Systems' },
  { value: 'automation', label: 'Intelligent Automation' },
  { value: 'software', label: 'Custom Software' },
  { value: 'platform', label: 'Digital Platforms' },
  { value: 'voice', label: 'Voice & Conversational AI' },
  { value: 'edge', label: 'Edge & IoT' },
  { value: 'other', label: 'Something else' },
]

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    need: '',
    description: '',
  })
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const inputBase =
    'w-full px-4 py-3.5 text-sm text-slate-900 bg-white border rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400'
  const inputNormal = 'border-slate-200 hover:border-slate-300'
  const inputFocused = 'border-slate-900 ring-4 ring-slate-900/5'

  return (
    <>
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-4">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
              Let's solve something meaningful.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              Tell us what you're trying to build, improve, automate, or solve.
              We'll start by understanding the problem.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Form */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[13px] font-medium text-slate-600 mb-2"
                    >
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      required
                      className={`${inputBase} ${focused === 'name' ? inputFocused : inputNormal}`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[13px] font-medium text-slate-600 mb-2"
                    >
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      className={`${inputBase} ${focused === 'email' ? inputFocused : inputNormal}`}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-[13px] font-medium text-slate-600 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    onFocus={() => setFocused('company')}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${focused === 'company' ? inputFocused : inputNormal}`}
                    placeholder="Company name"
                  />
                </div>

                {/* Select dropdown */}
                <div>
                  <label
                    htmlFor="need"
                    className="block text-[13px] font-medium text-slate-600 mb-2"
                  >
                    What do you need help with? <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="need"
                      name="need"
                      value={formState.need}
                      onChange={handleChange}
                      onFocus={() => setFocused('need')}
                      onBlur={() => setFocused(null)}
                      required
                      className={`${inputBase} appearance-none pr-10 cursor-pointer ${
                        focused === 'need' ? inputFocused : inputNormal
                      } ${!formState.need ? 'text-slate-400' : ''}`}
                    >
                      {needOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                      <ChevronDown
                        className={`w-4 h-4 transition-colors duration-200 ${
                          focused === 'need' ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-[13px] font-medium text-slate-600 mb-2"
                  >
                    Project description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    onFocus={() => setFocused('description')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={5}
                    className={`${inputBase} resize-none ${
                      focused === 'description' ? inputFocused : inputNormal
                    }`}
                    placeholder="Tell us about the problem you're trying to solve, the goals you have, or the outcome you're looking for..."
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:bg-slate-950 transition-colors duration-200 cursor-pointer"
                  >
                    Start the Conversation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Side info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="space-y-6">
                {/* Email card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-slate-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Prefer email?
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    Contact us directly and we'll get back to you within one
                    business day.
                  </p>
                  <a
                    href="mailto:hello@kyvanta.com"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-colors duration-200"
                  >
                    hello@kyvanta.com
                  </a>
                </div>

                {/* Steps card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">
                    What happens next?
                  </h3>
                  <ol className="space-y-3.5">
                    {[
                      'We review your project details.',
                      'We schedule an introductory call.',
                      'We understand your goals and challenges.',
                      'We propose an approach and timeline.',
                    ].map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-slate-600 leading-relaxed"
                      >
                        <span className="flex-none w-5 h-5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-500 flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
