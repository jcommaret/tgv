/**
 * Page Loader Component
 *
 * A full-page loading component used as a Suspense fallback
 * during lazy-loaded page transitions.
 */

import { motion } from 'framer-motion'
import LoadingSpinner from '../LoadingSpinner'

interface PageLoaderProps {
  /** Optional loading message */
  message?: string
  /** Show as full page or inline */
  fullPage?: boolean
}

export function PageLoader({ message = 'Chargement...', fullPage = true }: PageLoaderProps) {
  const containerClasses = fullPage
    ? 'fixed inset-0 flex items-center justify-center bg-surface z-50'
    : 'flex items-center justify-center py-20'

  return (
    <div className={containerClasses} role="status" aria-label={message}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <LoadingSpinner size="lg" variant="primary" label={message} />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-fg-muted text-sm"
        >
          {message}
        </motion.p>
      </motion.div>
      <span className="sr-only">{message}</span>
    </div>
  )
}

export default PageLoader
