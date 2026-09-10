import { motion } from 'framer-motion'
import { MessageSquare, Bot, Cpu, Workflow } from 'lucide-react'
import { Container } from '../../components/Container/Container'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const agentTypes = [
  {
    icon: MessageSquare,
    title: 'Chatbot',
    description: 'Answers frequently asked questions using predefined responses or a knowledge base. Good for simple, repetitive queries.',
    capability: 'Answer questions',
    limit: 'No action-taking ability',
    color: '#94a3b8',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Understands context and provides helpful responses. Can handle more complex conversations and retrieve relevant information.',
    capability: 'Understand & respond',
    limit: 'Limited to conversation',
    color: '#60a5fa',
  },
  {
    icon: Cpu,
    title: 'AI Agent',
    description: 'Understands tasks, uses tools, makes decisions, and executes multi-step workflows across multiple systems.',
    capability: 'Take action & execute',
    limit: 'Needs defined rules & guardrails',
    color: '#8b5cf6',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Connects systems and automates processes based on triggers and rules. Predictable, repeatable, auditable.',
    capability: 'Automate processes',
    limit: 'Rule-based, not AI-driven',
    color: '#22d3ee',
  },
]

export function AIAgentsExplainer() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <Container>
        <SectionHeading
          label="Understanding AI"
          title="Chatbot vs AI Assistant vs AI Agent vs Workflow Automation"
          description="Not all AI is the same. Here's how different types of AI systems compare — and when each makes sense for your business."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agentTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${type.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: type.color }} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {type.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-700">{type.capability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-xs text-slate-500">{type.limit}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-100"
        >
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">Most businesses need a combination.</span>{' '}
            A chatbot for simple FAQs. An AI assistant for customer support. An AI agent for lead qualification and CRM updates. Workflow automation for connecting systems. We help you identify the right mix for your specific needs.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
