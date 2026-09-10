import {
  Lock,
  Cog,
  Workflow,
  Shield,
  BarChart3,
  Plug,
  Key,
  FileCheck,
  Eye,
} from 'lucide-react'
import type { ComponentType } from 'react'

export interface WhyNotChatGPTItem {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

export const whyNotChatGPT: WhyNotChatGPTItem[] = [
  {
    icon: Lock,
    title: 'Private business data',
    description:
      'Generic AI tools don\'t have access to your proprietary data, documents, and knowledge. We connect AI to your actual business information.',
  },
  {
    icon: Plug,
    title: 'System integration',
    description:
      'ChatGPT can\'t update your CRM, process invoices in your accounting system, or trigger workflows in your tools. We build those connections.',
  },
  {
    icon: Cog,
    title: 'Business rules',
    description:
      'Off-the-shelf AI doesn\'t know your approval chains, pricing rules, or compliance requirements. We encode your specific business logic.',
  },
  {
    icon: Workflow,
    title: 'Workflow execution',
    description:
      'AI that answers questions is useful. AI that completes multi-step tasks across systems is transformative. We build agents that take action.',
  },
  {
    icon: Key,
    title: 'Authentication & permissions',
    description:
      'Business AI needs user authentication, role-based access, and permission controls. We build systems with proper identity management.',
  },
  {
    icon: Eye,
    title: 'Auditability',
    description:
      'Every AI action needs to be logged, traceable, and reviewable. We build systems with complete audit trails for compliance and governance.',
  },
  {
    icon: Shield,
    title: 'Security & governance',
    description:
      'Business AI needs data controls, encryption, and compliance guardrails. We build AI systems with enterprise-grade security.',
  },
  {
    icon: BarChart3,
    title: 'Monitoring & optimization',
    description:
      'Production AI needs performance tracking, error handling, and continuous improvement. We build systems that get better over time.',
  },
  {
    icon: FileCheck,
    title: 'Custom interfaces',
    description:
      'Generic chat interfaces don\'t fit every workflow. We build custom dashboards, dashboards, and interfaces designed for how your team works.',
  },
]
