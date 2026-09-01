import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hello! I'm Kyvanta AI. I can help you understand our services, solutions, and how we can help your business.\n\nWhat would you like to know?",
}

const SUGGESTIONS = [
  'What services does Kyvanta offer?',
  'How does Kyvanta approach AI projects?',
  'What is your development process?',
  'How can I start a project?',
]

/* ── Markdown parser ─────────────────────────────────── */

function parseMarkdown(text: string): string {
  const lines = text.split('\n')
  const html: string[] = []
  let inUl = false
  let inOl = false
  let inTable = false
  let inCode = false
  let isHeaderDone = false
  let codeBuffer: string[] = []

  function closeLists() {
    if (inUl) { html.push('</ul>'); inUl = false }
    if (inOl) { html.push('</ol>'); inOl = false }
  }
  function closeTable() {
    if (inTable) { html.push('</table></div>'); inTable = false; isHeaderDone = false }
  }

  for (let idx = 0; idx < lines.length; idx++) {
    const trimmed = lines[idx].trim()

    /* ── Fenced code block ``` ── */
    if (trimmed.startsWith('```')) {
      if (inCode) {
        html.push(`<pre class="chat-code"><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`)
        codeBuffer = []
        inCode = false
      } else {
        closeLists()
        closeTable()
        inCode = true
      }
      continue
    }
    if (inCode) {
      codeBuffer.push(lines[idx])
      continue
    }

    /* ── Table row ── */
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (/^\|[\s-:|]+\|$/.test(trimmed)) {
        isHeaderDone = true
        continue
      }
      if (!inTable) {
        closeLists()
        html.push('<div class="chat-table-wrap"><table class="chat-table">')
        inTable = true
        isHeaderDone = false
      }
      const cells = trimmed.slice(1, -1).split('|').map((c) => c.trim())
      const tag = !isHeaderDone ? 'th' : 'td'
      html.push(`<tr>${cells.map((c) => `<${tag}>${inlineFormat(c)}</${tag}>`).join('')}</tr>`)
      continue
    }
    closeTable()

    /* ── Headings # ── */
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)/)
    if (headingMatch) {
      closeLists()
      const level = headingMatch[1].length
      const tag = `h${Math.min(level, 3)}` as 'h1' | 'h2' | 'h3'
      html.push(`<${tag} class="chat-heading">${inlineFormat(headingMatch[2])}</${tag}>`)
      continue
    }

    /* ── Horizontal rule ---  ***  ___ ── */
    if (/^[-*_]{3,}\s*$/.test(trimmed)) {
      closeLists()
      html.push('<hr class="chat-hr" />')
      continue
    }

    /* ── Blockquote > ── */
    if (/^>\s?/.test(trimmed)) {
      closeLists()
      html.push(`<blockquote class="chat-quote">${inlineFormat(trimmed.replace(/^>\s?/, ''))}</blockquote>`)
      continue
    }

    /* ── Unordered list ── */
    if (/^[-*+]\s+/.test(trimmed)) {
      if (!inUl) {
        if (inOl) { html.push('</ol>'); inOl = false }
        html.push('<ul class="chat-list">')
        inUl = true
      }
      html.push(`<li>${inlineFormat(trimmed.replace(/^[-*+]\s+/, ''))}</li>`)
      continue
    }

    /* ── Ordered list ── */
    if (/^\d+[.)]\s+/.test(trimmed)) {
      if (!inOl) {
        if (inUl) { html.push('</ul>'); inUl = false }
        html.push('<ol class="chat-list">')
        inOl = true
      }
      html.push(`<li>${inlineFormat(trimmed.replace(/^\d+[.)]\s+/, ''))}</li>`)
      continue
    }

    closeLists()

    /* ── Empty line ── */
    if (trimmed === '') {
      html.push('<br />')
      continue
    }

    /* ── Regular paragraph ── */
    html.push(`<p>${inlineFormat(trimmed)}</p>`)
  }

  if (inUl) html.push('</ul>')
  if (inOl) html.push('</ol>')
  if (inTable) html.push('</table></div>')
  if (inCode) html.push(`<pre class="chat-code"><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`)

  return html.join('\n')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function inlineFormat(text: string): string {
  return text
    /* `inline code` */
    .replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>')
    /* ~~strikethrough~~ */
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    /* **bold** */
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    /* *italic* (but not inside **…**) */
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
}

/* ── Component ───────────────────────────────────────── */

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || isLoading) return

    const userMessage: Message = { role: 'user', content }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: "I'm having trouble connecting right now. Please try again or email us at **kyvantainnovations@gmail.com**." },
        ])
        return
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm having trouble connecting right now. Please try again or email us at **kyvantainnovations@gmail.com**." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* ── Floating button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-slate-900 text-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.25)] hover:bg-slate-800 hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.3)] transition-all duration-200 flex items-center justify-center cursor-pointer group"
            aria-label="Open chat"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] h-[min(600px,calc(100vh-6rem))] bg-white rounded-2xl shadow-[0_8px_40px_-4px_rgba(0,0,0,0.15),0_2px_8px_-2px_rgba(0,0,0,0.06)] border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Kyvanta AI</h3>
                  <p className="text-[11px] text-slate-400">Ask about our services</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-150 cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} />
              ))}

              {/* Loading */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-[12px] px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-100 bg-white shrink-0">
              <div className="flex items-end gap-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-900/5 transition-all duration-200">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Kyvanta..."
                  rows={1}
                  className="flex-1 bg-transparent px-4 py-3 text-[13px] text-slate-900 placeholder:text-slate-400 outline-none resize-none max-h-24"
                  style={{ height: 'auto', minHeight: '44px' }}
                  onInput={(e) => {
                    const t = e.target as HTMLTextAreaElement
                    t.style.height = 'auto'
                    t.style.height = `${Math.min(t.scrollHeight, 96)}px`
                  }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 mb-1.5 rounded-lg flex items-center justify-center text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Kyvanta AI · Answers about our services only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Single message (with memoised parsing) ──────────── */

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  const renderedHtml = useMemo(
    () => (isUser ? '' : parseMarkdown(message.content)),
    [message.content, isUser],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-slate-500" />
        </div>
      )}

      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
          isUser
            ? 'bg-slate-900 text-white rounded-br-md'
            : 'bg-slate-100 text-slate-700 rounded-bl-md'
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <div
            className="chat-content"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        )}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5 text-white" />
        </div>
      )}
    </motion.div>
  )
}
