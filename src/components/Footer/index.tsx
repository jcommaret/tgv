/**
 * Footer Component
 *
 * Application footer with:
 * - Dynamic copyright year
 * - Footer text from content.json
 * - Optional social links
 * - Responsive layout
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import content from '@data/content.json'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-fg bg-surface py-8 mt-auto border-t border-line" role="contentinfo">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-fg-muted text-sm"
          >
            {currentYear} - {content.components.footer.text}
          </motion.p>

          {/* Quick Links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            aria-label="Liens de pied de page"
          >
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  to="/"
                  className="text-fg-muted hover:text-fg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  className="text-fg-muted hover:text-fg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </motion.nav>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-fg-subtle text-xs">
            Construit avec ❤️ et <span className="text-accent">TGV</span>
          </p>
          <p className="text-fg-subtle text-xs">
            Version {import.meta.env.VITE_APP_VERSION || '1.0.0'}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
