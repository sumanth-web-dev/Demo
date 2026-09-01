import {
  Brain,
  Workflow,
  Code2,
  Globe,
  Mic,
  Cpu,
} from 'lucide-react'
import type { ComponentType } from 'react'

export interface Solution {
  id: string
  title: string
  shortTitle: string
  icon: ComponentType<{ className?: string }>
  description: string
  challenge: string
  approach: string
  whatWeBuild: string
  businessValue: string
  technologies: string[]
  detailColor: string
}

export const solutions: Solution[] = [
  {
    id: 'ai-intelligent-systems',
    title: 'AI & Intelligent Systems',
    shortTitle: 'AI Systems',
    icon: Brain,
    description:
      'Build intelligent systems that help businesses understand information, automate decisions, and assist users with contextual awareness.',
    challenge:
      'Businesses generate massive amounts of data but lack the tools to extract meaningful insights. Manual analysis is slow, expensive, and often inaccurate. Decisions are delayed because information is scattered across systems.',
    approach:
      'We design AI systems around your specific business context. Rather than applying generic models, we build intelligence that understands your data, your workflows, and your decision-making requirements.',
    whatWeBuild:
      'Custom AI models, intelligent data processing pipelines, recommendation engines, predictive analytics systems, document understanding platforms, and AI-powered decision support tools.',
    businessValue:
      'Faster insights from your data. Reduced manual analysis. More accurate predictions. Better-informed decisions. Competitive advantage through intelligence.',
    technologies: [
      'Machine Learning',
      'Large Language Models',
      'Computer Vision',
      'Natural Language Processing',
      'Deep Learning',
      'MLOps',
    ],
    detailColor: '#3b82f6',
  },
  {
    id: 'intelligent-automation',
    title: 'Intelligent Automation',
    shortTitle: 'Automation',
    icon: Workflow,
    description:
      'Reduce repetitive work by connecting workflows, systems, and intelligent automation that adapts to your business processes.',
    challenge:
      'Operations teams spend hours on repetitive tasks—data entry, report generation, document processing, and system synchronization. These tasks drain resources and introduce errors.',
    approach:
      'We map your existing workflows, identify automation opportunities, and build intelligent systems that handle routine work while keeping humans in the loop for complex decisions.',
    whatWeBuild:
      'Workflow automation systems, intelligent document processing, automated reporting, cross-system integrations, approval workflows, and AI-assisted operations tools.',
    businessValue:
      'Dramatic reduction in manual work. Fewer errors. Faster processing times. Staff freed for higher-value work. Consistent, auditable processes.',
    technologies: [
      'AI Agents',
      'Workflow Engines',
      'RPA Integration',
      'Document AI',
      'Event-Driven Architecture',
      'Business Rules Engines',
    ],
    detailColor: '#22d3ee',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    shortTitle: 'Software',
    icon: Code2,
    description:
      'Design and build software around specific business processes instead of forcing businesses into generic tools that don\'t fit.',
    challenge:
      'Off-the-shelf software forces businesses to adapt their processes to the tool. Customization is limited. Integration is difficult. The software becomes a bottleneck as the business evolves.',
    approach:
      'We engineer software around your exact business requirements. Every feature, workflow, and interface is designed for how your team actually works.',
    whatWeBuild:
      'Business management platforms, internal tools, client portals, data dashboards, API systems, microservices architectures, and enterprise applications.',
    businessValue:
      'Software that fits your business perfectly. Faster operations. Better user adoption. Systems that evolve with your needs. Full ownership and control.',
    technologies: [
      'React & Next.js',
      'Node.js & Python',
      'TypeScript',
      'PostgreSQL & MongoDB',
      'REST & GraphQL APIs',
      'Cloud-Native Architecture',
    ],
    detailColor: '#3b82f6',
  },
  {
    id: 'digital-platforms',
    title: 'Digital Platforms',
    shortTitle: 'Platforms',
    icon: Globe,
    description:
      'Create scalable web and mobile platforms designed for real users and sustainable business growth.',
    challenge:
      'Launching a digital product requires more than code. Without proper architecture, platforms struggle to scale. Without good design, users abandon them. Without strategy, they fail to achieve business goals.',
    approach:
      'We build platforms with a focus on user experience, technical scalability, and business outcomes. Every decision is guided by what will serve your users and your growth.',
    whatWeBuild:
      'Web applications, mobile apps, SaaS platforms, marketplace systems, content platforms, customer-facing portals, and multi-tenant architectures.',
    businessValue:
      'A product your users love. Architecture that scales with demand. faster time to market. Reduced technical debt. A platform built for growth.',
    technologies: [
      'React & React Native',
      'Next.js & Remix',
      'Progressive Web Apps',
      'Mobile Development',
      'CDN & Edge Deployment',
      'Analytics & Monitoring',
    ],
    detailColor: '#22d3ee',
  },
  {
    id: 'voice-conversational-ai',
    title: 'Voice & Conversational AI',
    shortTitle: 'Voice AI',
    icon: Mic,
    description:
      'Create natural interfaces that allow users to interact with technology through voice and conversation.',
    challenge:
      'Traditional interfaces require users to navigate complex menus and forms. Voice and conversational interfaces can make technology more accessible and efficient for many use cases.',
    approach:
      'We design conversational experiences that feel natural and helpful. Our systems understand context, handle ambiguity, and learn from interactions.',
    whatWeBuild:
      'Voice assistants, conversational chatbots, IVR systems, speech-to-text pipelines, multilingual interfaces, and conversational analytics dashboards.',
    businessValue:
      'More natural user experiences. Reduced support costs. 24/7 availability. Accessibility for diverse users. New interaction paradigms for your business.',
    technologies: [
      'Speech Recognition',
      'Text-to-Speech',
      'Natural Language Understanding',
      'Conversational Design',
      'Real-time Processing',
      'Multi-language Support',
    ],
    detailColor: '#3b82f6',
  },
  {
    id: 'edge-iot',
    title: 'Edge & IoT',
    shortTitle: 'Edge/IoT',
    icon: Cpu,
    description:
      'Connect physical systems with software, data, and intelligent processing at the edge.',
    challenge:
      'Physical devices generate data that needs processing in real time. Sending everything to the cloud introduces latency, bandwidth costs, and privacy concerns.',
    approach:
      'We build edge intelligence that processes data where it matters. Our systems combine local processing with cloud coordination for optimal performance.',
    whatWeBuild:
      'Edge computing platforms, IoT data pipelines, device management systems, real-time monitoring, predictive maintenance, and industrial IoT solutions.',
    businessValue:
      'Real-time processing without cloud latency. Reduced bandwidth costs. Improved privacy. Reliable operation. Scalable device management.',
    technologies: [
      'Edge Computing',
      'MQTT & IoT Protocols',
      'Real-time Stream Processing',
      'Device Firmware',
      'Time-Series Databases',
      'Digital Twins',
    ],
    detailColor: '#22d3ee',
  },
]
