import {
  Workflow,
  Bot,
  Code2,
  MessageSquare,
  Link2,
  FileText,
  Database,
  Cpu,
} from 'lucide-react'
import type { ComponentType } from 'react'

export interface Solution {
  id: string
  title: string
  shortTitle: string
  icon: ComponentType<{ className?: string }>
  description: string
  customerProblem: string
  solution: string
  whoNeedsIt: string
  businessOutcome: string
  useCases: string[]
  technologies: string[]
  detailColor: string
}

export const solutions: Solution[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation',
    shortTitle: 'AI Automation',
    icon: Workflow,
    description:
      'Automate repetitive business workflows with intelligent systems that understand your data, make decisions within defined rules, and execute tasks without manual intervention.',
    customerProblem:
      'Your team spends hours on repetitive tasks — data entry, report generation, document processing, approval routing. These tasks drain resources, introduce errors, and prevent staff from doing higher-value work.',
    solution:
      'We map your existing workflows, identify the highest-impact automation opportunities, and build intelligent systems that handle routine work while keeping humans in the loop for complex decisions.',
    whoNeedsIt:
      'Operations teams drowning in manual processes. Finance teams processing invoices by hand. HR teams managing onboarding paperwork. Customer service teams handling repetitive queries.',
    businessOutcome:
      'Dramatic reduction in manual work. Fewer errors. Faster processing times. Staff freed for higher-value work. Consistent, auditable processes that scale with your business.',
    useCases: [
      'Automated invoice processing and approval routing',
      'Employee onboarding workflow automation',
      'Automated report generation and distribution',
      'Cross-system data synchronization',
      'Approval chain automation',
    ],
    technologies: [
      'AI Agents',
      'Workflow Engines',
      'RPA Integration',
      'Document AI',
      'Event-Driven Architecture',
      'Business Rules Engines',
    ],
    detailColor: '#3b82f6',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    shortTitle: 'AI Agents',
    icon: Bot,
    description:
      'Build AI systems that understand information, make decisions within defined rules, and execute multi-step tasks — going beyond simple chatbots to handle real business workflows.',
    customerProblem:
      'You need AI that does more than answer questions. You need systems that can process information, make decisions, update your CRM, handle emails, manage appointments, and execute tasks across multiple systems.',
    solution:
      'We design AI agents around your specific business context. Each agent understands your data, follows your business rules, uses the right tools, and knows when to escalate to a human.',
    whoNeedsIt:
      'Sales teams needing lead qualification automation. Support teams handling high-volume inquiries. Operations teams processing documents and updating systems. Any team with multi-step information workflows.',
    businessOutcome:
      'Tasks completed faster. Consistent decision-making. 24/7 availability for routine operations. Staff focused on exceptions and high-value interactions. Clear audit trails for every action.',
    useCases: [
      'Lead qualification and CRM updates',
      'Customer support with intelligent escalation',
      'Email processing and automated responses',
      'Appointment scheduling and management',
      'Document workflow automation',
      'Internal knowledge retrieval and action',
    ],
    technologies: [
      'LLM Orchestration',
      'Tool Use & Function Calling',
      'RAG Pipelines',
      'Memory Systems',
      'Guardrails & Safety',
      'Human-in-the-Loop',
    ],
    detailColor: '#8b5cf6',
  },
  {
    id: 'custom-ai-applications',
    title: 'Custom AI Applications',
    shortTitle: 'Custom AI',
    icon: Code2,
    description:
      'Build AI-powered applications designed around your specific workflow, data, and business requirements — not forced into a generic tool that doesn\'t fit.',
    customerProblem:
      'Off-the-shelf AI tools solve 60% of your problem but leave critical gaps. You need AI that understands your specific data, your specific workflows, and your specific business rules.',
    solution:
      'We engineer AI applications around your exact requirements. Every feature, interface, and decision rule is designed for how your team actually works and what your business actually needs.',
    whoNeedsIt:
      'Companies with domain-specific AI needs. Businesses with proprietary data requiring custom models. Teams needing AI integrated deeply into existing workflows. Organizations with unique compliance requirements.',
    businessOutcome:
      'AI that fits your business perfectly. Better user adoption. Systems that evolve with your needs. Full ownership and control. Competitive advantage through custom intelligence.',
    useCases: [
      'Domain-specific document understanding',
      'Custom recommendation engines',
      'AI-powered decision support tools',
      'Industry-specific prediction models',
      'Custom AI dashboards and analytics',
    ],
    technologies: [
      'Python & FastAPI',
      'Machine Learning Pipelines',
      'LLM Fine-tuning',
      'Custom Model Training',
      'MLOps',
      'Model Evaluation',
    ],
    detailColor: '#3b82f6',
  },
  {
    id: 'conversational-ai',
    title: 'Conversational AI',
    shortTitle: 'Conversational AI',
    icon: MessageSquare,
    description:
      'Create chat, voice, and knowledge assistants that understand context, follow business rules, and provide helpful responses — far beyond basic FAQ chatbots.',
    customerProblem:
      'Your support team handles the same questions repeatedly. Customers wait for responses. Knowledge is scattered across documents and tribal knowledge. Traditional chatbots can\'t handle real conversations.',
    solution:
      'We build conversational AI systems connected to your actual knowledge base. They understand context, follow your brand voice, handle complex queries, and know when to bring in a human.',
    whoNeedsIt:
      'Customer support teams handling high volumes. Internal teams needing knowledge access. Sales teams needing instant product information. Any organization with scattered institutional knowledge.',
    businessOutcome:
      '24/7 availability for routine queries. Consistent, accurate responses. Faster resolution times. Staff freed for complex issues. Reduced support costs with improved satisfaction.',
    useCases: [
      'Customer support chat with knowledge base',
      'Internal knowledge assistant for employees',
      'Product recommendation and guidance',
      'Voice-enabled IVR systems',
      'Multilingual support interfaces',
    ],
    technologies: [
      'Speech Recognition',
      'Text-to-Speech',
      'Natural Language Understanding',
      'RAG Architecture',
      'Conversational Design',
      'Multi-language Support',
    ],
    detailColor: '#22d3ee',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    shortTitle: 'AI Integration',
    icon: Link2,
    description:
      'Connect AI capabilities with your CRM, ERP, databases, APIs, and existing business systems so intelligence flows where it\'s needed — not trapped in another tool.',
    customerProblem:
      'You have AI tools and you have business systems, but they don\'t talk to each other. Data stays siloed. Insights don\'t reach decision-makers. AI outputs require manual copy-paste into your actual tools.',
    solution:
      'We build the bridges between AI systems and your business tools. Data flows automatically. AI outputs reach the right systems. Your team gets intelligence where they already work.',
    whoNeedsIt:
      'Teams using multiple disconnected tools. Organizations with legacy systems needing AI capabilities. Businesses wanting AI insights in their existing dashboards. Companies with complex data ecosystems.',
    businessOutcome:
      'Unified data flow across systems. AI insights where decisions are made. Elimination of manual data transfer. Real-time intelligence in existing workflows. Reduced tool sprawl.',
    useCases: [
      'AI-powered CRM enrichment and updates',
      'Automated data sync between AI and business tools',
      'AI insights in existing dashboards and reports',
      'Intelligent routing across systems',
      'Legacy system AI augmentation',
    ],
    technologies: [
      'REST & GraphQL APIs',
      'Webhooks & Event Streams',
      'Middleware Platforms',
      'Data Transformation',
      'Authentication & Security',
      'Error Handling & Recovery',
    ],
    detailColor: '#3b82f6',
  },
  {
    id: 'intelligent-document-processing',
    title: 'Intelligent Document Processing',
    shortTitle: 'Document AI',
    icon: FileText,
    description:
      'Extract, classify, understand, and process business documents automatically — from invoices and contracts to forms and reports.',
    customerProblem:
      'Your team manually processes hundreds or thousands of documents. Invoices, contracts, forms, reports — each requiring human reading, extraction, and data entry. This is slow, expensive, and error-prone.',
    solution:
      'We build document AI systems that understand your specific document types. They extract the right fields, classify documents automatically, validate data, and route documents through your workflow.',
    whoNeedsIt:
      'Finance teams processing invoices. Legal teams reviewing contracts. Operations teams handling forms. Any organization with high-volume document workflows.',
    businessOutcome:
      'Dramatic reduction in document processing time. Fewer extraction errors. Faster turnaround. Staff freed for review and exception handling. Scalable processing that grows with volume.',
    useCases: [
      'Invoice data extraction and processing',
      'Contract analysis and key term extraction',
      'Form processing and validation',
      'Document classification and routing',
      'Compliance document review',
    ],
    technologies: [
      'OCR & Vision AI',
      'Document Understanding Models',
      'Entity Extraction',
      'Classification Models',
      'Validation Rules',
      'Pipeline Orchestration',
    ],
    detailColor: '#22d3ee',
  },
  {
    id: 'ai-data-knowledge',
    title: 'AI Data & Knowledge Systems',
    shortTitle: 'Knowledge AI',
    icon: Database,
    description:
      'Build retrieval-augmented generation (RAG) systems, enterprise knowledge assistants, and intelligent search that connect AI to your company\'s actual data and documents.',
    customerProblem:
      'Your company\'s knowledge is scattered across documents, wikis, drives, and people\'s heads. Finding the right information takes too long. New employees take months to get up to speed. Institutional knowledge walks out the door.',
    solution:
      'We build AI-powered knowledge systems that understand your documents, find relevant information instantly, and provide accurate answers grounded in your actual data — not hallucinated responses.',
    whoNeedsIt:
      'Teams with large document collections. Organizations with institutional knowledge challenges. Companies onboarding new employees. Any business where finding information is a daily bottleneck.',
    businessOutcome:
      'Instant access to organizational knowledge. Faster employee onboarding. Consistent information across teams. Reduced time spent searching. Preserved institutional knowledge.',
    useCases: [
      'Enterprise knowledge assistant',
      'Policy and procedure search',
      'Technical documentation Q&A',
      'Research and competitive intelligence',
      'Onboarding knowledge acceleration',
    ],
    technologies: [
      'RAG Architecture',
      'Vector Databases',
      'Document Chunking',
      'Embedding Models',
      'Retrieval Optimization',
      'Source Attribution',
    ],
    detailColor: '#8b5cf6',
  },
  {
    id: 'custom-software-development',
    title: 'Custom Software',
    shortTitle: 'Custom Software',
    icon: Cpu,
    description:
      'Build complete business applications when off-the-shelf software isn\'t enough — designed around your exact workflow, with full ownership and control.',
    customerProblem:
      'Generic software forces you to adapt your processes to the tool. Customization is limited. Integration is difficult. As you grow, the software becomes a bottleneck instead of an enabler.',
    solution:
      'We engineer software around your exact business requirements. Every feature, workflow, and interface is designed for how your team actually works, with architecture built for scale.',
    whoNeedsIt:
      'Companies outgrowing off-the-shelf tools. Businesses with unique workflow requirements. Organizations needing full control over their software. Teams requiring deep integration with existing systems.',
    businessOutcome:
      'Software that fits your business perfectly. Faster operations. Better user adoption. Systems that evolve with your needs. Full ownership with no vendor lock-in.',
    useCases: [
      'Business management platforms',
      'Internal tools and dashboards',
      'Client portals and customer-facing apps',
      'API systems and microservices',
      'Legacy system modernization',
    ],
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
]
