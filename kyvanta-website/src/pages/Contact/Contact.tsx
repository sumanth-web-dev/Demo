import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mail, Phone, ChevronDown, Check, AlertCircle, Loader2 } from 'lucide-react'
import { Container } from '../../components/Container/Container'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'
import { trackFormStart, trackFormSubmit } from '../../utils/analytics'

const problemAreaOptions = [
  { value: '', label: 'Select an area' },
  { value: 'automation', label: 'Workflow automation' },
  { value: 'ai-agents', label: 'AI agents' },
  { value: 'custom-ai', label: 'Custom AI applications' },
  { value: 'conversational', label: 'Conversational AI / chatbots' },
  { value: 'integration', label: 'AI integration with existing systems' },
  { value: 'documents', label: 'Document processing' },
  { value: 'knowledge', label: 'Knowledge management' },
  { value: 'software', label: 'Custom software development' },
  { value: 'other', label: 'Something else' },
]

const timelineOptions = [
  { value: '', label: 'Select timeline' },
  { value: 'exploring', label: 'Just exploring' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '3-months', label: 'Within 3 months' },
  { value: '6-months', label: 'Within 6 months' },
  { value: 'urgent', label: 'ASAP' },
]

const budgetOptions = [
  { value: '', label: 'Select range' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-50k', label: '$15,000 - $50,000' },
  { value: '50k-plus', label: '$50,000+' },
  { value: 'unsure', label: 'Not sure yet' },
]

interface CustomDropdownProps {
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  required?: boolean
}

function CustomDropdown({ value, onChange, options, placeholder = 'Select', required: _required }: CustomDropdownProps) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen(!open)
          setFocused(!open)
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => !open && setFocused(false)}
        className={`
          w-full flex items-center justify-between gap-3
          px-4 py-3.5 text-sm text-left
          bg-white border rounded-xl
          outline-none transition-all duration-200 cursor-pointer
          ${focused || open ? 'border-slate-900 ring-4 ring-slate-900/5' : 'border-slate-200 hover:border-slate-300'}
          ${!value ? 'text-slate-400' : 'text-slate-900'}
        `}
      >
        <span className="truncate">{selected?.label || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-all duration-200 ${
            open ? 'text-slate-900 rotate-180' : 'text-slate-400'
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="
              absolute z-50 mt-2 w-full
              bg-white border border-slate-200 rounded-xl
              shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1),0_2px_6px_-2px_rgba(0,0,0,0.05)]
              overflow-hidden
              max-h-60 overflow-y-auto
            "
          >
            {options.filter(o => o.value !== '').map((opt) => {
              const isSelected = value === opt.value
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value)
                      setOpen(false)
                      setFocused(false)
                    }}
                    className={`
                      w-full flex items-center justify-between gap-3
                      px-4 py-3 text-sm
                      transition-colors duration-100 cursor-pointer
                      ${isSelected
                        ? 'bg-slate-50 text-slate-900 font-medium'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-slate-900 shrink-0" />
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    problemArea: '',
    desiredSolution: '',
    currentProcess: '',
    existingSoftware: '',
    timeline: '',
    budget: '',
    description: '',
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    trackFormStart('contact')

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, formType: 'contact' }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit form')
      }

      trackFormSubmit('contact')
      setSubmitted(true)
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase =
    'w-full px-4 py-3.5 text-sm bg-white border rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400'
  const inputNormal = 'border-slate-200 hover:border-slate-300'
  const inputFocused = 'border-slate-900 ring-4 ring-slate-900/5'

  return (
    <>
      <SEO
        title="Contact Us"
        description="Book an AI strategy call with Kyvanta Innovation. Tell us about your project and we'll help you find the right approach."
        path="/contact"
      />
      <WebPageSchema
        title="Contact Us"
        description="Book an AI strategy call with Kyvanta Innovation. Tell us about your project and we'll help you find the right approach."
        path="/contact"
      />
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
              Book an AI Strategy Call.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              Tell us what you're trying to solve. We'll discuss your challenges, identify AI opportunities, and outline a practical approach — no obligations.
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
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="p-8 rounded-2xl bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-7 h-7 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        Request received!
                      </h3>
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        Thank you for reaching out. We'll review your details and get back to you within one business day to schedule your strategy call.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false)
                          setFormState({ name: '', email: '', company: '', problemArea: '', desiredSolution: '', currentProcess: '', existingSoftware: '', timeline: '', budget: '', description: '' })
                        }}
                        className="text-sm font-medium text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-colors duration-200"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200"
                        >
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-red-600">{error}</p>
                        </motion.div>
                      )}

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

                      {/* Desired Solution + Current Process row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="desiredSolution"
                            className="block text-[13px] font-medium text-slate-600 mb-2"
                          >
                            Desired solution
                          </label>
                          <input
                            type="text"
                            id="desiredSolution"
                            name="desiredSolution"
                            value={formState.desiredSolution}
                            onChange={handleChange}
                            onFocus={() => setFocused('desiredSolution')}
                            onBlur={() => setFocused(null)}
                            className={`${inputBase} ${focused === 'desiredSolution' ? inputFocused : inputNormal}`}
                            placeholder="What are you looking to build?"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="existingSoftware"
                            className="block text-[13px] font-medium text-slate-600 mb-2"
                          >
                            Existing software
                          </label>
                          <input
                            type="text"
                            id="existingSoftware"
                            name="existingSoftware"
                            value={formState.existingSoftware}
                            onChange={handleChange}
                            onFocus={() => setFocused('existingSoftware')}
                            onBlur={() => setFocused(null)}
                            className={`${inputBase} ${focused === 'existingSoftware' ? inputFocused : inputNormal}`}
                            placeholder="CRM, ERP, tools you currently use"
                          />
                        </div>
                      </div>

                      {/* Current Process */}
                      <div>
                        <label
                          htmlFor="currentProcess"
                          className="block text-[13px] font-medium text-slate-600 mb-2"
                        >
                          Current process
                        </label>
                        <input
                          type="text"
                          id="currentProcess"
                          name="currentProcess"
                          value={formState.currentProcess}
                          onChange={handleChange}
                          onFocus={() => setFocused('currentProcess')}
                          onBlur={() => setFocused(null)}
                          className={`${inputBase} ${focused === 'currentProcess' ? inputFocused : inputNormal}`}
                          placeholder="How do you handle this today?"
                        />
                      </div>

                      {/* Problem Area + Timeline row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[13px] font-medium text-slate-600 mb-2">
                            What do you need help with? <span className="text-red-400">*</span>
                          </label>
                          <CustomDropdown
                            value={formState.problemArea}
                            onChange={(val) => setFormState({ ...formState, problemArea: val })}
                            options={problemAreaOptions}
                            placeholder="Select an area"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-medium text-slate-600 mb-2">
                            Timeline
                          </label>
                          <CustomDropdown
                            value={formState.timeline}
                            onChange={(val) => setFormState({ ...formState, timeline: val })}
                            options={timelineOptions}
                            placeholder="Select timeline"
                          />
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-[13px] font-medium text-slate-600 mb-2">
                          Approximate project range
                        </label>
                        <CustomDropdown
                          value={formState.budget}
                          onChange={(val) => setFormState({ ...formState, budget: val })}
                          options={budgetOptions}
                          placeholder="Select range"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-[13px] font-medium text-slate-600 mb-2"
                        >
                          Tell us about your challenge <span className="text-red-400">*</span>
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
                          placeholder="What problem are you trying to solve? What does your current process look like? What outcome are you hoping for?"
                        />
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:bg-slate-950 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Request Strategy Call
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                {/* What happens next */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">
                    What happens next?
                  </h3>
                  <ol className="space-y-3.5">
                    {[
                      'We review your project details.',
                      'We schedule a 30-minute strategy call.',
                      'We discuss your challenges and goals.',
                      'We identify AI opportunities and outline an approach.',
                      'If it makes sense, we propose a pilot or audit.',
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

                {/* Phone card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-slate-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Prefer a call?
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    Reach us directly and we'll get back to you within one
                    business day.
                  </p>
                  <a
                    href="tel:+919480700048"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-colors duration-200"
                  >
                    +91 9480700048
                  </a>
                </div>

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
                    href="mailto:kyvanta.innovations@gmail.com"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-colors duration-200"
                  >
                    kyvanta.innovations@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
