export interface Project {
  id: string
  title: string
  category: string
  challenge: string
  approach: string
  solution: string
  technologies: string[]
  outcome: string
}

export const projects: Project[] = [
  {
    id: 'intelligent-business-platform',
    title: 'Intelligent Business Platform',
    category: 'AI & Automation',
    challenge:
      'A growing organization struggled with disconnected tools for project management, client communication, and reporting. Teams spent hours each week consolidating data manually.',
    approach:
      'We mapped their complete workflow from client onboarding to project delivery. We identified three key automation opportunities and designed a unified platform architecture.',
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
      'Consolidated operations into a single platform. Reduced manual reporting time significantly. Improved cross-team visibility and decision-making speed.',
  },
  {
    id: 'conversational-ai',
    title: 'Conversational AI Interface',
    category: 'Voice & AI',
    challenge:
      'A service organization needed to handle increasing customer inquiries without proportionally growing their support team. Response times were increasing and customer satisfaction was declining.',
    approach:
      'We analyzed their most common customer interactions, designed a conversational flow that handled routine queries, and built a seamless escalation path for complex issues.',
    solution:
      'A voice and conversational AI interface that handled customer inquiries, provided account information, processed routine requests, and intelligently escalated complex cases to human agents.',
    technologies: [
      'Speech Recognition',
      'NLU Engine',
      'Real-time Processing',
      'Integration APIs',
      'Analytics Dashboard',
    ],
    outcome:
      'Handled a significant portion of routine inquiries automatically. Reduced average response time. Improved customer satisfaction scores. Freed support team for high-value interactions.',
  },
  {
    id: 'edge-intelligence',
    title: 'Edge Intelligence System',
    category: 'Edge & IoT',
    challenge:
      'An industrial operation needed real-time monitoring and anomaly detection across distributed equipment. Cloud-only processing introduced unacceptable latency for critical alerts.',
    approach:
      'We designed a hybrid architecture with intelligent edge processing for time-critical decisions and cloud-based analytics for long-term pattern analysis.',
    solution:
      'An edge computing platform that processed sensor data locally, detected anomalies in real time, predicted maintenance needs, and coordinated with a central management system.',
    technologies: [
      'Edge Computing',
      'MQTT',
      'Time-Series Database',
      'ML Models',
      'Real-time Stream Processing',
    ],
    outcome:
      'Enabled real-time anomaly detection without cloud latency. Reduced unplanned downtime. Improved maintenance scheduling based on predictive analytics.',
  },
]
