/**
 * Loading Spinner Component
 *
 * A reusable loading spinner with customizable size and color.
 * Uses Tailwind CSS for styling and supports different variants.
 */

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'light' | 'dark'
  /** Additional CSS classes */
  className?: string
  /** Accessible label for screen readers */
  label?: string
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
}

const variantClasses = {
  primary: 'border-primary border-t-transparent',
  secondary: 'border-secondary border-t-transparent',
  light: 'border-white border-t-transparent',
  dark: 'border-gray-800 border-t-transparent',
}

export function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  className = '',
  label = 'Chargement en cours...',
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <motion.div
        className={`rounded-full ${sizeClasses[size]} ${variantClasses[variant]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default LoadingSpinner
