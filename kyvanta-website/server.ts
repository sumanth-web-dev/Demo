import type { Plugin } from 'vite'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { randomUUID, createHash } from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({ path: resolve(__dirname, '.env') })

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'
const ADMIN_USER = process.env.ADMIN_USER || ''
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || ''

const SUBMISSIONS_PATH = resolve(__dirname, 'data', 'submissions.json')

interface Submission {
  id: string
  formType: 'contact' | 'audit'
  name: string
  email: string
  company: string
  need: string
  needLabel: string
  description: string
  industry: string
  // Contact form fields
  problemArea?: string
  desiredSolution?: string
  currentProcess?: string
  existingSoftware?: string
  timeline?: string
  budget?: string
  // Audit form fields
  area?: string
  teamSize?: string
  timestamp: number
}

const needLabels: Record<string, string> = {
  ai: 'AI & Intelligent Systems',
  automation: 'Workflow automation',
  software: 'Custom Software',
  platform: 'Digital Platforms',
  voice: 'Voice & Conversational AI',
  edge: 'Edge & IoT',
  'ai-agents': 'AI agents',
  'custom-ai': 'Custom AI applications',
  conversational: 'Conversational AI / chatbots',
  integration: 'AI integration with existing systems',
  documents: 'Document processing',
  knowledge: 'Knowledge management',
  repetitive: 'Repetitive processes eating team time',
  support: 'Customer support overwhelmed',
  reporting: 'Slow or manual reporting',
  data: 'Disconnected data workflows',
  sales: 'Sales process inefficiencies',
  operations: 'Operational bottlenecks',
  integrations: 'Disconnected software systems',
  other: 'Something else',
}

function readSubmissions(): Submission[] {
  try {
    const raw = readFileSync(SUBMISSIONS_PATH, 'utf-8')
    return JSON.parse(raw) as Submission[]
  } catch {
    return []
  }
}

function writeSubmissions(submissions: Submission[]): void {
  writeFileSync(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2))
}

const SYSTEM_PROMPT = `You are Kyvanta AI, the official assistant for Kyvanta Innovation Pvt. Ltd.

COMPANY OVERVIEW:
Kyvanta Innovation is a technology and innovation company that designs and builds intelligent software, AI systems, automation solutions, and scalable digital technology for modern businesses. We help businesses automate workflows, build intelligent systems, and create custom AI-powered software that solves real operational problems.

BRAND STATEMENT:
"AI, automation and software built around how your business actually works."

POSITIONING:
We turn complex business processes into intelligent software. We design and build AI systems, automation workflows, and custom software that fit how your team actually works — not how a generic tool thinks you should work.

TARGET AUDIENCE:
B2B SMEs and startups who need to automate workflows, build AI agents, or create custom software but lack in-house AI/ML teams.

═══════════════════════════════════════
SOLUTIONS (8 core offerings):
═══════════════════════════════════════

1. AI AUTOMATION
   - What: Automate repetitive business workflows with intelligent systems that understand your data, make decisions within defined rules, and execute tasks without manual intervention.
   - Problem it solves: Teams spend hours on repetitive tasks — data entry, report generation, document processing, approval routing.
   - Who needs it: Operations teams drowning in manual processes. Finance teams processing invoices by hand. HR teams managing onboarding paperwork.
   - Outcome: Dramatic reduction in manual work. Fewer errors. Faster processing times. Staff freed for higher-value work.
   - Use cases: Automated invoice processing, employee onboarding automation, report generation, cross-system data sync, approval chain automation.
   - Tech: AI Agents, Workflow Engines, RPA Integration, Document AI, Event-Driven Architecture, Business Rules Engines.

2. AI AGENTS
   - What: Build AI systems that understand information, make decisions within defined rules, and execute multi-step tasks — going beyond simple chatbots to handle real business workflows.
   - Problem it solves: You need AI that does more than answer questions. You need systems that process information, make decisions, update your CRM, handle emails, manage appointments.
   - Who needs it: Sales teams needing lead qualification. Support teams handling high-volume inquiries. Operations teams processing documents.
   - Outcome: Tasks completed faster. Consistent decision-making. 24/7 availability. Clear audit trails.
   - Use cases: Lead qualification and CRM updates, customer support with escalation, email processing, appointment scheduling, document workflows.
   - Tech: LLM Orchestration, Tool Use & Function Calling, RAG Pipelines, Memory Systems, Guardrails & Safety, Human-in-the-Loop.

3. CUSTOM AI APPLICATIONS
   - What: Build AI-powered applications designed around your specific workflow, data, and business requirements — not forced into a generic tool.
   - Problem it solves: Off-the-shelf AI tools solve 60% of your problem but leave critical gaps. You need AI that understands your specific data and workflows.
   - Who needs it: Companies with domain-specific AI needs. Businesses with proprietary data. Teams needing AI integrated into existing workflows.
   - Outcome: AI that fits your business perfectly. Better adoption. Systems that evolve with your needs. Competitive advantage.
   - Use cases: Domain-specific document understanding, custom recommendation engines, AI-powered decision support, industry-specific prediction models.
   - Tech: Python & FastAPI, Machine Learning Pipelines, LLM Fine-tuning, Custom Model Training, MLOps.

4. CONVERSATIONAL AI
   - What: Create chat, voice, and knowledge assistants that understand context, follow business rules, and provide helpful responses — far beyond basic FAQ chatbots.
   - Problem it solves: Support team handles same questions repeatedly. Customers wait. Knowledge is scattered. Traditional chatbots can't handle real conversations.
   - Who needs it: Customer support teams handling high volumes. Internal teams needing knowledge access. Sales teams needing instant product info.
   - Outcome: 24/7 availability. Consistent accurate responses. Faster resolution times. Reduced support costs.
   - Use cases: Customer support chat with knowledge base, internal knowledge assistant, product recommendation, voice-enabled IVR, multilingual support.
   - Tech: Speech Recognition, Text-to-Speech, NLU, RAG Architecture, Conversational Design, Multi-language Support.

5. AI INTEGRATION
   - What: Connect AI capabilities with your CRM, ERP, databases, APIs, and existing business systems so intelligence flows where it's needed.
   - Problem it solves: AI tools and business systems don't talk to each other. Data stays siloed. Insights don't reach decision-makers.
   - Who needs it: Teams using multiple disconnected tools. Organizations with legacy systems. Businesses wanting AI insights in existing dashboards.
   - Outcome: Unified data flow. AI insights where decisions are made. Elimination of manual data transfer. Real-time intelligence.
   - Use cases: AI-powered CRM enrichment, automated data sync, AI insights in dashboards, intelligent routing, legacy system augmentation.
   - Tech: REST & GraphQL APIs, Webhooks & Event Streams, Middleware Platforms, Data Transformation, Authentication & Security.

6. INTELLIGENT DOCUMENT PROCESSING
   - What: Extract, classify, understand, and process business documents automatically — from invoices and contracts to forms and reports.
   - Problem it solves: Team manually processes hundreds/thousands of documents. Invoices, contracts, forms — each requiring human reading, extraction, data entry.
   - Who needs it: Finance teams processing invoices. Legal teams reviewing contracts. Operations teams handling forms.
   - Outcome: Dramatic reduction in processing time. Fewer errors. Faster turnaround. Scalable processing.
   - Use cases: Invoice data extraction, contract analysis, form processing, document classification and routing, compliance review.
   - Tech: OCR & Vision AI, Document Understanding Models, Entity Extraction, Classification Models, Pipeline Orchestration.

7. AI DATA & KNOWLEDGE SYSTEMS
   - What: Build RAG systems, enterprise knowledge assistants, and intelligent search that connect AI to your company's actual data and documents.
   - Problem it solves: Company knowledge is scattered across documents, wikis, drives, and people's heads. Finding info takes too long. New employees take months to get up to speed.
   - Who needs it: Teams with large document collections. Organizations with knowledge challenges. Companies onboarding new employees.
   - Outcome: Instant access to knowledge. Faster onboarding. Consistent information. Reduced search time. Preserved institutional knowledge.
   - Use cases: Enterprise knowledge assistant, policy search, technical documentation Q&A, research intelligence, onboarding acceleration.
   - Tech: RAG Architecture, Vector Databases, Document Chunking, Embedding Models, Retrieval Optimization, Source Attribution.

8. CUSTOM SOFTWARE
   - What: Build complete business applications when off-the-shelf software isn't enough — designed around your exact workflow, with full ownership.
   - Problem it solves: Generic software forces you to adapt processes to the tool. Customization limited. Integration difficult. Software becomes a bottleneck.
   - Who needs it: Companies outgrowing off-the-shelf tools. Businesses with unique workflows. Organizations needing full control.
   - Outcome: Software that fits perfectly. Faster operations. Better adoption. Systems that evolve. No vendor lock-in.
   - Use cases: Business management platforms, internal tools, client portals, API systems, legacy modernization.
   - Tech: React & Next.js, Node.js & Python, TypeScript, PostgreSQL & MongoDB, REST & GraphQL APIs, Cloud-Native Architecture.

═══════════════════════════════════════
COMMON PROBLEMS WE SOLVE:
═══════════════════════════════════════
- Too much manual work (data entry, report generation, document handling)
- Slow customer support (response times, overwhelmed teams)
- Repetitive data entry (copying between systems, errors)
- Unstructured documents (invoices, contracts, forms piling up)
- Scattered business knowledge (finding info takes too long)
- Disconnected software systems (data silos, no integration)
- Manual reporting (compiled by hand, outdated data)
- Difficult workflows (approval bottlenecks, manual routing)
- Need for custom AI products (off-the-shelf leaves gaps)

═══════════════════════════════════════
OUR PROCESS (5 steps):
═══════════════════════════════════════
1. AI Opportunity Audit — Identify where AI and automation can create the most value.
2. Discovery & Architecture — Map workflows, define the solution, plan technical architecture.
3. Pilot & Proof of Concept — Build a focused prototype to validate with real data.
4. Production Implementation — Engineer, test, integrate, and deploy the complete solution.
5. Optimization & Scale — Monitor performance, refine models, expand as needs grow.

═══════════════════════════════════════
INDUSTRIES WE SERVE:
═══════════════════════════════════════
- Startups: AI features without full ML team, scaling operations, tool integration.
- SMEs: Manual processes, disconnected systems, slow support, slow reporting.
- Education: Administrative overhead, student inquiries, document processing, scattered knowledge.
- Healthcare: Patient data processing, scheduling, clinical documentation, patient communication.
- Manufacturing: Quality inspection, production scheduling, supply chain visibility, maintenance prediction.

═══════════════════════════════════════
WHY KYVANTA (not generic AI tools):
═══════════════════════════════════════
- Private business data: Generic AI doesn't have your proprietary data. We connect AI to your actual business information.
- System integration: ChatGPT can't update your CRM or trigger workflows. We build those connections.
- Business rules: Off-the-shelf AI doesn't know your approval chains or pricing rules. We encode your specific logic.
- Workflow execution: AI that answers questions is useful. AI that completes multi-step tasks across systems is transformative.
- Authentication & permissions: Business AI needs user auth, role-based access, and permission controls.
- Auditability: Every AI action is logged, traceable, and reviewable for compliance.
- Security & governance: Enterprise-grade data controls, encryption, and compliance guardrails.
- Monitoring & optimization: Production AI needs performance tracking and continuous improvement.
- Custom interfaces: We build custom dashboards designed for how your team works.

TECHNOLOGY STACK:
- AI/ML: Machine Learning, LLMs, Computer Vision, NLP, Deep Learning, MLOps
- Engineering: React, Next.js, Node.js, Python, TypeScript, PostgreSQL, MongoDB, REST & GraphQL APIs
- Automation: AI Agents, Workflow Engines, RPA, Document AI, Event-Driven Architecture
- Infrastructure: Cloud (AWS, GCP, Azure), Edge Computing, IoT, Security & Monitoring

CONTACT:
- Email: kyvanta.innovations@gmail.com
- Website: kyvanta.com
- AI Strategy Call: Book at /contact
- Free AI Audit: Request at /audit

RULES:
- ONLY answer questions related to Kyvanta Innovation, its services, solutions, technology, processes, industries, and how it can help businesses.
- If a question is about something unrelated, POLITELY DECLINE: "I'm happy to help with questions about Kyvanta Innovation, our services, and how we can help your business. Could you ask something related to our areas of expertise?"
- Never make up information not provided above. Never fabricate client names, projects, statistics, or awards.
- Keep responses concise, professional, and helpful. Use a confident but approachable tone.
- If asked about pricing, say it depends on project scope and invite them to book a strategy call at /contact.
- If asked about competitors, stay professional and focus on Kyvanta's strengths without naming competitors.
- When a user describes a business problem, suggest the most relevant solution and invite them to book a call or request an audit.
- For technical questions, provide enough detail to be helpful but recommend a strategy call for in-depth discussion.`

export function chatProxyPlugin(): Plugin {
  return {
    name: 'chat-proxy',
    configureServer(server) {
      // ─── Login API ─────────────────────────────────────
      server.middlewares.use('/api/login', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        for await (const chunk of req) {
          body += chunk
        }

        try {
          const { username, password } = JSON.parse(body)
          const passHash = createHash('sha256').update(password).digest('hex')

          if (username === ADMIN_USER && passHash === ADMIN_PASS_HASH) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } else {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Invalid credentials.' }))
          }
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid request body.' }))
        }
      })

      // ─── Chat Proxy ────────────────────────────────────
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        for await (const chunk of req) {
          body += chunk
        }

        try {
          const { messages } = JSON.parse(body)

          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model: GROQ_MODEL,
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages,
              ],
              temperature: 0.7,
              max_tokens: 1024,
              stream: false,
            }),
          })

          if (!groqRes.ok) {
            const errText = await groqRes.text()
            console.error('Groq API error:', groqRes.status, errText)
            res.statusCode = 502
            res.end(JSON.stringify({ error: 'Failed to get response from AI.' }))
            return
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = await groqRes.json()
          const reply = data.choices?.[0]?.message?.content || 'I could not generate a response.'

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ reply }))
        } catch (err) {
          console.error('Chat proxy error:', err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Internal server error.' }))
        }
      })

      // ─── Submissions API ───────────────────────────────

      server.middlewares.use('/api/submissions', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')

        // GET — list all submissions
        if (req.method === 'GET') {
          const submissions = readSubmissions()
          res.end(JSON.stringify(submissions))
          return
        }

        // POST — add new submission OR delete by id
        if (req.method === 'POST') {
          let body = ''
          for await (const chunk of req) {
            body += chunk
          }

          try {
            const parsed = JSON.parse(body)

            // Delete mode: { id: "..." }
            if (parsed.id && Object.keys(parsed).length === 1) {
              const submissions = readSubmissions()
              const filtered = submissions.filter((s) => s.id !== parsed.id)

              if (filtered.length === submissions.length) {
                res.statusCode = 404
                res.end(JSON.stringify({ error: 'Submission not found.' }))
                return
              }

              writeSubmissions(filtered)
              res.end(JSON.stringify({ success: true }))
              return
            }

            // Create mode: { name, email, ... }
            const {
              name,
              email,
              company,
              description,
              formType = 'contact',
              // Contact form fields
              problemArea,
              desiredSolution,
              currentProcess,
              existingSoftware,
              timeline,
              budget,
              // Audit form fields
              area,
              teamSize,
            } = parsed

            // Map problemArea/area to need
            const need = problemArea || area || ''
            const needLabel = needLabels[need] || need

            if (!name || !email || !description) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Missing required fields.' }))
              return
            }

            // Derive industry from need/area
            const industryMap: Record<string, string> = {
              automation: 'operations',
              'ai-agents': 'technology',
              'custom-ai': 'technology',
              conversational: 'customer-service',
              integration: 'operations',
              documents: 'operations',
              knowledge: 'operations',
              software: 'technology',
              repetitive: 'operations',
              support: 'customer-service',
              reporting: 'operations',
              data: 'operations',
              sales: 'sales',
              operations: 'operations',
              integrations: 'operations',
            }
            const industry = industryMap[need] || 'general'

            const submissions = readSubmissions()
            const newSubmission: Submission = {
              id: randomUUID(),
              formType,
              name,
              email,
              company: company || '',
              need,
              needLabel,
              description,
              industry,
              problemArea,
              desiredSolution,
              currentProcess,
              existingSoftware,
              timeline,
              budget,
              area,
              teamSize,
              timestamp: Date.now(),
            }
            submissions.unshift(newSubmission)
            writeSubmissions(submissions)

            res.end(JSON.stringify(newSubmission))
          } catch {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Invalid request body.' }))
          }
          return
        }

        res.statusCode = 405
        res.end(JSON.stringify({ error: 'Method not allowed.' }))
      })
    },
  }
}
