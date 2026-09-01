import type { IncomingMessage, ServerResponse } from 'http'
import { createHash } from 'crypto'

const ADMIN_USER = process.env.ADMIN_USER || ''
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || ''

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

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    const body = await readBody(req)
    const { username, password } = JSON.parse(body)
    const passHash = createHash('sha256').update(password).digest('hex')

    if (username === ADMIN_USER && passHash === ADMIN_PASS_HASH) {
      res.end(JSON.stringify({ success: true }))
    } else {
      res.statusCode = 401
      res.end(JSON.stringify({ error: 'Invalid credentials.' }))
    }
  } catch {
    res.statusCode = 400
    res.end(JSON.stringify({ error: 'Invalid request body.' }))
  }
}
