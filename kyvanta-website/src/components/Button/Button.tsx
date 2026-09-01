import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  showArrow?: boolean
  href?: string
  children: React.ReactNode
}

const variantStyles = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950',
  secondary:
    'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50',
  ghost:
    'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      showArrow = false,
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center gap-2 font-medium rounded-md transition-colors duration-200 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...(props as Record<string, unknown>)}
      >
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
