export interface PricingModel {
  serviceId: string
  serviceName: string
  model: string
  description: string
  entryPoint: string
  notes: string
}

export const pricingModels: PricingModel[] = [
  {
    serviceId: 'ai-automation',
    serviceName: 'AI Automation',
    model: 'Milestone-based / Monthly Retainer',
    description: 'Automation projects are scoped by workflow complexity. We use milestone-based pricing for implementation and monthly retainers for ongoing optimization.',
    entryPoint: 'AI Opportunity Audit (free)',
    notes: 'Pilot projects available for validating automation ROI before full implementation.',
  },
  {
    serviceId: 'ai-agents',
    serviceName: 'AI Agents',
    model: 'Fixed Scope + Usage',
    description: 'Agent development is fixed-scope based on complexity. Ongoing usage costs are based on API calls, tokens, and compute.',
    entryPoint: 'AI Opportunity Audit (free)',
    notes: 'Proof-of-concept pilot available to validate agent performance before production deployment.',
  },
  {
    serviceId: 'custom-ai-applications',
    serviceName: 'Custom AI Applications',
    model: 'Fixed Project / Milestone-based',
    description: 'Custom AI projects are scoped with fixed pricing based on requirements. Payment is milestone-based tied to deliverables.',
    entryPoint: 'Discovery & Architecture phase',
    notes: 'Architecture phase can be engaged separately to define scope before committing to full build.',
  },
  {
    serviceId: 'conversational-ai',
    serviceName: 'Conversational AI',
    model: 'Fixed Setup + Monthly Retainer',
    description: 'Initial build is fixed-scope. Ongoing knowledge base updates, monitoring, and optimization are monthly retainers.',
    entryPoint: 'AI Opportunity Audit (free)',
    notes: 'Includes initial knowledge base setup and training.',
  },
  {
    serviceId: 'ai-integration',
    serviceName: 'AI Integration',
    model: 'Fixed Project',
    description: 'Integration projects are scoped by the number of systems, data complexity, and real-time requirements.',
    entryPoint: 'Discovery & Architecture phase',
    notes: 'Complex integrations may be broken into phases.',
  },
  {
    serviceId: 'intelligent-document-processing',
    serviceName: 'Intelligent Document Processing',
    model: 'Fixed Project + Usage',
    description: 'System build is fixed-scope. Processing costs are usage-based on document volume.',
    entryPoint: 'AI Opportunity Audit (free)',
    notes: 'Pilot available with a sample document set to validate accuracy.',
  },
  {
    serviceId: 'ai-data-knowledge',
    serviceName: 'AI Data & Knowledge Systems',
    model: 'Fixed Setup + Monthly Retainer',
    description: 'RAG/knowledge system build is fixed-scope. Ongoing indexing, monitoring, and optimization are monthly retainers.',
    entryPoint: 'Discovery & Architecture phase',
    notes: 'Includes initial data ingestion and knowledge base setup.',
  },
  {
    serviceId: 'custom-software-development',
    serviceName: 'Custom Software',
    model: 'Fixed Project / Monthly Retainer',
    description: 'Software projects are fixed-scope with milestone-based payments. Ongoing development and maintenance are monthly retainers.',
    entryPoint: 'Discovery & Architecture phase',
    notes: 'Agile methodology with regular demos and feedback cycles.',
  },
]
