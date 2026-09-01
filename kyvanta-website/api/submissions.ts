import type { IncomingMessage, ServerResponse } from 'http'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'

interface Submission {
  id: string
  name: string
  email: string
  company: string
  need: string
  needLabel: string
  description: string
  timestamp: number
}

const needLabels: Record<string, string> = {
  ai: 'AI & Intelligent Systems',
  automation: 'Intelligent Automation',
  software: 'Custom Software',
  platform: 'Digital Platforms',
  voice: 'Voice & Conversational AI',
  edge: 'Edge & IoT',
  other: 'Something else',
}

const DATA_PATH = join('/tmp', 'submissions.json')

function readSubmissions(): Submission[] {
  try {
    if (!existsSync(DATA_PATH)) return []
    const raw = readFileSync(DATA_PATH, 'utf-8')
    return JSON.parse(raw) as Submission[]
  } catch {
    return []
  }
}

function writeSubmissions(submissions: Submission[]): void {
  writeFileSync(DATA_PATH, JSON.stringify(submissions, null, 2))
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')

  // GET — list all submissions
  if (req.method === 'GET') {
    const submissions = readSubmissions()
    res.end(JSON.stringify(submissions))
    return
  }

  // POST — add new submission OR delete by id
  if (req.method === 'POST') {
    try {
      const body = await readBody(req)
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
      const { name, email, company, need, description } = parsed

      if (!name || !email || !need || !description) {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Missing required fields.' }))
        return
      }

      const submissions = readSubmissions()
      const newSubmission: Submission = {
        id: randomUUID(),
        name,
        email,
        company: company || '',
        need,
        needLabel: needLabels[need] || need,
        description,
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
}
