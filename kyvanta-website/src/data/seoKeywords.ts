export interface KeywordGroup {
  category: string
  keywords: {
    term: string
    intent: 'high' | 'problem' | 'educational'
    targetPage: string
  }[]
}

export const seoKeywords: KeywordGroup[] = [
  {
    category: 'High-intent (Services)',
    keywords: [
      { term: 'AI automation services', intent: 'high', targetPage: '/solutions#ai-automation' },
      { term: 'AI agent development', intent: 'high', targetPage: '/solutions#ai-agents' },
      { term: 'custom AI development', intent: 'high', targetPage: '/solutions#custom-ai-applications' },
      { term: 'AI consulting', intent: 'high', targetPage: '/contact' },
      { term: 'AI integration services', intent: 'high', targetPage: '/solutions#ai-integration' },
      { term: 'AI chatbot development', intent: 'high', targetPage: '/solutions#conversational-ai' },
      { term: 'intelligent document processing', intent: 'high', targetPage: '/solutions#intelligent-document-processing' },
      { term: 'custom software development', intent: 'high', targetPage: '/solutions#custom-software-development' },
    ],
  },
  {
    category: 'Problem intent',
    keywords: [
      { term: 'automate customer support', intent: 'problem', targetPage: '/solutions#conversational-ai' },
      { term: 'automate business workflows', intent: 'problem', targetPage: '/solutions#ai-automation' },
      { term: 'AI document processing', intent: 'problem', targetPage: '/solutions#intelligent-document-processing' },
      { term: 'AI internal knowledge assistant', intent: 'problem', targetPage: '/solutions#ai-data-knowledge' },
      { term: 'reduce manual data entry', intent: 'problem', targetPage: '/solutions#ai-automation' },
      { term: 'AI for SMEs', intent: 'problem', targetPage: '/industries#sme' },
    ],
  },
  {
    category: 'Educational',
    keywords: [
      { term: 'what is an AI agent', intent: 'educational', targetPage: '/solutions#ai-agents' },
      { term: 'AI automation vs chatbot', intent: 'educational', targetPage: '/solutions' },
      { term: 'how businesses can use AI', intent: 'educational', targetPage: '/audit' },
      { term: 'AI implementation strategy', intent: 'educational', targetPage: '/audit' },
      { term: 'AI opportunity audit', intent: 'educational', targetPage: '/audit' },
      { term: 'when to use custom AI vs off-the-shelf', intent: 'educational', targetPage: '/solutions#custom-ai-applications' },
    ],
  },
]
