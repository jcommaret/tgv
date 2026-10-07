/**
 * Navigation Component
 *
 * Main navigation header with:
 * - Logo and home link
 * - Dynamic navigation from content.json
 * - Dark mode toggle
 * - Mobile responsive menu
 * - Full accessibility support
 */

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import content from '@data/content.json'
import img from '@assets/images'
import { useDarkMode } from '@hooks/useDarkMode'
import { useIsMobile } from '@hooks/useMediaQuery'

function Nav() {
  const location = useLocation()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = Object.entries(content.pages)
    .filter(([key]) => key !== 'error')
    .map(([key, page]) => ({
      key,
      path: page.path,
      title: page.title,
      isActive: location.pathname === page.path || (page.path === '/' && location.pathname === '/'),
    }))

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav
      className="bg-surface/95 py-4 sticky top-0 z-40 backdrop-blur-sm border-b border-line"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary rounded"
          onClick={closeMenu}
        >
          <img src={img.logo} alt="Logo TGV" className="h-8" />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.path}
                  className={`hover:text-accent transition-colors relative py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded ${
                    link.isActive ? 'text-accent' : 'text-fg'
                  }`}
                  aria-current={link.isActive ? 'page' : undefined}
                >
                  {link.title}
                  {link.isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-fg hover:bg-surface-raised transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
            aria-pressed={isDarkMode}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.svg
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-fg hover:bg-surface-raised transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-surface border-t border-line"
          >
            <ul className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={`block py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                      link.isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-fg hover:bg-surface-raised'
                    }`}
                    aria-current={link.isActive ? 'page' : undefined}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Nav
