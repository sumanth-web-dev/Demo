export interface Project {
  id: string
  title: string
  category: string
  type: 'client' | 'prototype' | 'concept'
  challenge: string
  approach: string
  solution: string
  technologies: string[]
  outcome: string
}

export const projects: Project[] = [
  {
    id: 'ai-business-platform',
    title: 'AI-Powered Business Workflow Platform',
    category: 'AI Automation',
    type: 'client',
    challenge:
      'A growing organization struggled with disconnected tools for project management, client communication, and reporting. Teams spent hours each week consolidating data manually, leading to delayed decisions and inconsistent reporting.',
    approach:
      'We mapped their complete workflow from client onboarding to project delivery. We identified three key automation opportunities and designed a unified platform architecture that connected their existing tools.',
    solution:
      'An AI-powered business workflow platform that automated document processing, synchronized data across departments, and provided real-time analytics dashboards for leadership.',
    technologies: [
      'React',
      'Node.js',
      'PostgreSQL',
      'AI Document Processing',
      'REST APIs',
    ],
    outcome:
      'Consolidated operations into a single platform. Reduced manual reporting time by 70%. Improved cross-team visibility and decision-making speed.',
  },
  {
    id: 'conversational-support',
    title: 'Conversational AI Customer Support',
    category: 'Conversational AI',
    type: 'client',
    challenge:
      'A service organization needed to handle increasing customer inquiries without proportionally growing their support team. Response times were increasing and customer satisfaction was declining.',
    approach:
      'We analyzed their most common customer interactions, designed a conversational flow that handled routine queries, and built a seamless escalation path for complex issues that required human expertise.',
    solution:
      'A conversational AI assistant that handled customer inquiries, provided account information, processed routine requests, and intelligently escalated complex cases to human agents with full context.',
    technologies: [
      'LLM Orchestration',
      'RAG Pipeline',
      'Knowledge Base',
      'Integration APIs',
      'Analytics Dashboard',
    ],
    outcome:
      'Handled 60% of routine inquiries automatically. Reduced average response time from hours to seconds. Improved customer satisfaction scores. Freed support team for high-value interactions.',
  },
  {
    id: 'intelligent-document-processing',
    title: 'Intelligent Invoice Processing System',
    category: 'Document AI',
    type: 'prototype',
    challenge:
      'Finance teams manually process hundreds of invoices monthly, extracting data, validating amounts, and routing for approval. This process is slow, error-prone, and creates bottlenecks in the payment cycle.',
    approach:
      'We designed an intelligent document processing pipeline that understands invoice layouts, extracts key fields, validates against purchase orders, and routes exceptions for human review.',
    solution:
      'An AI document processing system that automatically extracts invoice data, validates against business rules, and integrates with the existing accounting system for seamless processing.',
    technologies: [
      'OCR & Vision AI',
      'Entity Extraction',
      'Validation Rules',
      'API Integration',
      'Workflow Engine',
    ],
    outcome:
      'Reduced manual data entry by 85%. Processing time dropped from minutes per invoice to seconds. Error rate reduced to near-zero with automated validation.',
  },
]
