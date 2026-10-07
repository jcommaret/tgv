/**
 * Root Layout Component
 *
 * Main layout wrapper for all pages with:
 * - Skip to content link for accessibility
 * - Navigation header
 * - Main content area with Outlet
 * - Footer
 * - SEO meta tags
 */

import { Outlet, useLocation } from 'react-router-dom'
import { Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SEO from '@/components/Seo'
import { PageLoader } from '@shared/components/PageLoader'
import content from '@data/content.json'

type PageKey = keyof typeof content.pages

/** Resolve the content.json page matching a pathname, falling back to the 404 page */
function getPageKey(pathname: string): PageKey {
  const match = (Object.keys(content.pages) as PageKey[]).find(
    (key) => key !== 'error' && content.pages[key].path === pathname
  )
  return match ?? 'error'
}

function Layout() {
  const location = useLocation()
  const pageKey = getPageKey(location.pathname)

  return (
    <div className="flex flex-col min-h-screen bg-surface text-fg transition-colors duration-300">
      {/* Skip to content link for keyboard navigation */}
      {/* HashRouter owns the URL hash, so move focus instead of following the anchor */}
      <a
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
      >
        Aller au contenu principal
      </a>

      <SEO pageKey={pageKey} />

      {/* Navigation header */}
      <Nav />

      {/* Main content area with page transitions */}
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={<PageLoader fullPage={false} />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Layout
