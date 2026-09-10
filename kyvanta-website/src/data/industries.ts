export interface Industry {
  id: string
  name: string
  description: string
  problems: string[]
  opportunities: string[]
}

export const industries: Industry[] = [
  {
    id: 'startups',
    name: 'Startups',
    description:
      'Fast-growing companies that need to move quickly without building everything from scratch.',
    problems: [
      'Building AI features without a full ML team',
      'Scaling operations as the team grows',
      'Integrating multiple tools from day one',
      'Manual processes that don\'t scale',
    ],
    opportunities: [
      'AI-powered product features',
      'Automated customer onboarding',
      'Intelligent lead qualification',
      'Automated reporting and analytics',
    ],
  },
  {
    id: 'sme',
    name: 'SMEs',
    description:
      'Small and medium enterprises looking to automate operations and compete with larger organizations.',
    problems: [
      'Manual processes consuming team time',
      'Disconnected software systems',
      'Slow customer response times',
      'Reporting that takes too long',
    ],
    opportunities: [
      'Workflow automation across departments',
      'AI-powered customer support',
      'Automated document processing',
      'Integrated business dashboards',
    ],
  },
  {
    id: 'education',
    name: 'Education',
    description:
      'Educational institutions modernizing their operations and student experiences.',
    problems: [
      'Administrative overhead consuming teacher time',
      'Student inquiries going unanswered',
      'Document processing bottlenecks',
      'Knowledge scattered across departments',
    ],
    opportunities: [
      'AI teaching assistants',
      'Automated admissions processing',
      'Student support chatbots',
      'Institutional knowledge systems',
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description:
      'Healthcare organizations improving efficiency while maintaining compliance.',
    problems: [
      'Manual patient data processing',
      'Appointment scheduling inefficiencies',
      'Clinical documentation overhead',
      'Patient communication gaps',
    ],
    opportunities: [
      'Intelligent appointment scheduling',
      'Clinical document processing',
      'Patient communication automation',
      'Administrative workflow optimization',
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description:
      'Manufacturers optimizing operations through intelligent automation and data analysis.',
    problems: [
      'Manual quality inspection',
      'Production scheduling complexity',
      'Supply chain visibility gaps',
      'Maintenance prediction challenges',
    ],
    opportunities: [
      'Predictive maintenance systems',
      'Quality inspection automation',
      'Production optimization AI',
      'Supply chain intelligence',
    ],
  },
]
