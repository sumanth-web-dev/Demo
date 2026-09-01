import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react'
import {
  checkCredentials,
  login,
  isAuthenticated,
  getAttempts,
  incrementAttempts,
  resetAttempts,
  isLockedOut,
  getLockoutRemaining,
} from '../../utils/auth'

export function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)
  const [lockoutSeconds, setLockoutSeconds] = useState(0)

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    setAttempts(getAttempts())
    setLocked(isLockedOut())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!locked) return
    const interval = setInterval(() => {
      const remaining = getLockoutRemaining()
      if (remaining <= 0) {
        setLocked(false)
        setAttempts(0)
        clearInterval(interval)
      } else {
        setLockoutSeconds(remaining)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [locked])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')

      if (isLockedOut()) {
        setLocked(true)
        setLockoutSeconds(getLockoutRemaining())
        return
      }

      setIsSubmitting(true)

      try {
        const valid = await checkCredentials(username, password)

        if (valid) {
          resetAttempts()
          login()
          navigate('/admin', { replace: true })
        } else {
          const newAttempts = incrementAttempts()
          setAttempts(newAttempts)
          if (newAttempts >= 5) {
            setLocked(true)
            setLockoutSeconds(getLockoutRemaining())
            setError('Too many failed attempts. Please try again later.')
          } else {
            setError(`Invalid credentials. ${5 - newAttempts} attempt${5 - newAttempts === 1 ? '' : 's'} remaining.`)
          }
        }
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [username, password, navigate],
  )

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/KyvantaLogo.png"
            alt="Kyvanta Innovation"
            className="h-10 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-slate-900">Admin Access</h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign in to access the admin dashboard.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200"
              >
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-[13px] font-medium text-slate-600 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={locked || isSubmitting}
                className="w-full px-4 py-3.5 text-sm bg-white border border-slate-200 rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-slate-600 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={locked || isSubmitting}
                  className="w-full px-4 py-3.5 pr-12 text-sm bg-white border border-slate-200 rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={locked || isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={locked || isSubmitting}
                className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:bg-slate-950 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Signing in...'
                ) : locked ? (
                  `Locked out — ${lockoutSeconds}s`
                ) : (
                  <>
                    Sign In
                    <Lock className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Attempts indicator */}
          {attempts > 0 && !locked && (
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                Failed attempts: {attempts}/5
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Kyvanta Innovation Pvt. Ltd.
        </p>
      </motion.div>
    </div>
  )
}
