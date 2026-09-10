import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Loader2, ChevronDown, ArrowRight } from 'lucide-react'
import { Container } from '../../components/Container/Container'
import { SEO, WebPageSchema } from '../../components/SEO/SEO'
import { trackFormStart, trackFormSubmit } from '../../utils/analytics'

const assessmentAreas = [
  { value: '', label: 'Select an area' },
  { value: 'repetitive', label: 'Repetitive processes eating team time' },
  { value: 'support', label: 'Customer support overwhelmed' },
  { value: 'documents', label: 'Manual document processing' },
  { value: 'knowledge', label: 'Scattered internal knowledge' },
  { value: 'reporting', label: 'Slow or manual reporting' },
  { value: 'data', label: 'Disconnected data workflows' },
  { value: 'sales', label: 'Sales process inefficiencies' },
  { value: 'operations', label: 'Operational bottlenecks' },
  { value: 'integrations', label: 'Disconnected software systems' },
  { value: 'other', label: 'Something else' },
]

interface CustomDropdownProps {
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
}

function CustomDropdown({ value, onChange, options, placeholder = 'Select' }: CustomDropdownProps) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => { setOpen(!open); setFocused(!open) }}
        onFocus={() => setFocused(true)}
        onBlur={() => !open && setFocused(false)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-sm text-left bg-white border rounded-xl outline-none transition-all duration-200 cursor-pointer ${focused || open ? 'border-slate-900 ring-4 ring-slate-900/5' : 'border-slate-200 hover:border-slate-300'} ${!value ? 'text-slate-400' : 'text-slate-900'}`}
      >
        <span className="truncate">{selected?.label || placeholder}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-all duration-200 ${open ? 'text-slate-900 rotate-180' : 'text-slate-400'}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.filter(o => o.value !== '').map((opt) => {
              const isSelected = value === opt.value
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => { onChange(opt.value); setOpen(false); setFocused(false) }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors duration-100 cursor-pointer ${isSelected ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-slate-900 shrink-0" />}
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

export function Audit() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    area: '',
    teamSize: '',
    description: '',
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    trackFormStart('audit')
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, formType: 'audit' }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
      }
      trackFormSubmit('audit')
      setSubmitted(true)
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase = 'w-full px-4 py-3.5 text-sm bg-white border rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400'
  const inputNormal = 'border-slate-200 hover:border-slate-300'
  const inputFocused = 'border-slate-900 ring-4 ring-slate-900/5'

  return (
    <>
      <SEO
        title="AI Opportunity Audit"
        description="Find where AI can create value in your business. Free AI Opportunity Audit from Kyvanta Innovation — identify automation opportunities, AI use cases, and practical next steps."
        path="/audit"
      />
      <WebPageSchema
        title="AI Opportunity Audit"
        description="Find where AI can create value in your business. Free AI Opportunity Audit from Kyvanta Innovation."
        path="/audit"
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
              Free Assessment
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
              Find where AI can create value in your business.
            </h1>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
              In 30 minutes, we'll identify your highest-impact AI and automation opportunities, estimate potential savings, and outline practical next steps — no obligations.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Request your free audit
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-8 rounded-2xl bg-white border border-slate-100 text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-7 h-7 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Audit request received!</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        We'll review your details and schedule your free 30-minute AI Opportunity Audit within one business day.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      {error && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-[13px] font-medium text-slate-600 mb-2">Name <span className="text-red-400">*</span></label>
                          <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} required className={`${inputBase} ${focused === 'name' ? inputFocused : inputNormal}`} placeholder="Your full name" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-[13px] font-medium text-slate-600 mb-2">Work Email <span className="text-red-400">*</span></label>
                          <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} required className={`${inputBase} ${focused === 'email' ? inputFocused : inputNormal}`} placeholder="you@company.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="company" className="block text-[13px] font-medium text-slate-600 mb-2">Company</label>
                          <input type="text" id="company" name="company" value={formState.company} onChange={handleChange} onFocus={() => setFocused('company')} onBlur={() => setFocused(null)} className={`${inputBase} ${focused === 'company' ? inputFocused : inputNormal}`} placeholder="Company name" />
                        </div>
                        <div>
                          <label htmlFor="teamSize" className="block text-[13px] font-medium text-slate-600 mb-2">Team Size</label>
                          <input type="text" id="teamSize" name="teamSize" value={formState.teamSize} onChange={handleChange} onFocus={() => setFocused('teamSize')} onBlur={() => setFocused(null)} className={`${inputBase} ${focused === 'teamSize' ? inputFocused : inputNormal}`} placeholder="e.g. 10-50" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-slate-600 mb-2">Biggest operational challenge <span className="text-red-400">*</span></label>
                        <CustomDropdown value={formState.area} onChange={(val) => setFormState({ ...formState, area: val })} options={assessmentAreas} placeholder="Select your biggest challenge" />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-[13px] font-medium text-slate-600 mb-2">Tell us about your challenge</label>
                        <textarea id="description" name="description" value={formState.description} onChange={handleChange} onFocus={() => setFocused('description')} onBlur={() => setFocused(null)} rows={4} className={`${inputBase} resize-none ${focused === 'description' ? inputFocused : inputNormal}`} placeholder="What processes take the most time? Where do you see the biggest bottlenecks?" />
                      </div>
                      <div className="pt-2">
                        <button type="submit" disabled={isSubmitting} className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors duration-200 cursor-pointer disabled:opacity-50">
                          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <>Request Free Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" /></>}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">What you'll receive</h3>
                  <ul className="space-y-3">
                    {[
                      '30-minute strategy call with an AI specialist',
                      'Assessment of your top 3 automation opportunities',
                      'Estimated time and cost savings per opportunity',
                      'Recommended AI approach for each use case',
                      'Practical next steps — whether you work with us or not',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">We assess these areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Repetitive processes', 'Customer support', 'Document processing', 'Internal knowledge', 'Reporting', 'Data workflows', 'Sales', 'Operations', 'Integrations'].map((area) => (
                      <span key={area} className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-md">{area}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900 text-white">
                  <h3 className="text-sm font-semibold mb-2">No obligations</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    This is a free assessment. We'll show you where AI can create value — whether you decide to work with us or pursue it internally.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
