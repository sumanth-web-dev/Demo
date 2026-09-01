const AUTH_KEY = 'kyvanta_admin_auth'
const ATTEMPTS_KEY = 'kyvanta_admin_attempts'
const LOCKOUT_KEY = 'kyvanta_admin_lockout'

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 60_000

export async function checkCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    return res.ok
  } catch {
    return false
  }
}

export function isAuthenticated(): boolean {
  try {
    const val = localStorage.getItem(AUTH_KEY)
    return val === 'true'
  } catch {
    return false
  }
}

export function login(): void {
  localStorage.setItem(AUTH_KEY, 'true')
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY)
}

export function getAttempts(): number {
  try {
    return parseInt(sessionStorage.getItem(ATTEMPTS_KEY) || '0', 10)
  } catch {
    return 0
  }
}

export function incrementAttempts(): number {
  const current = getAttempts()
  const next = current + 1
  try {
    sessionStorage.setItem(ATTEMPTS_KEY, String(next))
    if (next >= MAX_ATTEMPTS) {
      sessionStorage.setItem(LOCKOUT_KEY, String(Date.now()))
    }
  } catch { /* ignore */ }
  return next
}

export function resetAttempts(): void {
  try {
    sessionStorage.removeItem(ATTEMPTS_KEY)
    sessionStorage.removeItem(LOCKOUT_KEY)
  } catch { /* ignore */ }
}

export function isLockedOut(): boolean {
  try {
    const lockTime = sessionStorage.getItem(LOCKOUT_KEY)
    if (!lockTime) return false
    const elapsed = Date.now() - parseInt(lockTime, 10)
    if (elapsed >= LOCKOUT_MS) {
      sessionStorage.removeItem(LOCKOUT_KEY)
      sessionStorage.removeItem(ATTEMPTS_KEY)
      return false
    }
    return true
  } catch {
    return false
  }
}

export function getLockoutRemaining(): number {
  try {
    const lockTime = sessionStorage.getItem(LOCKOUT_KEY)
    if (!lockTime) return 0
    const elapsed = Date.now() - parseInt(lockTime, 10)
    return Math.max(0, Math.ceil((LOCKOUT_MS - elapsed) / 1000))
  } catch {
    return 0
  }
}
