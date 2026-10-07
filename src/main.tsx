/**
 * Application Entry Point
 *
 * This file serves as the main entry point for the React application.
 * It sets up:
 * - Router configuration with lazy-loaded pages
 * - Global error boundary
 * - SEO provider (Helmet)
 * - Axe accessibility testing (development only)
 * - Global styles
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense, lazy } from 'react'

import '@styles/index.scss'

// Global components
import { ErrorBoundary } from '@shared/components/ErrorBoundary'
import { PageLoader } from '@shared/components/PageLoader'
import { ToastContainer } from '@shared/components/Toast'

// Layout (eager loaded as it's used on every page)
import Layout from '@/components/Layout'

// Lazy-loaded pages for better performance
const Home = lazy(() => import('@/pages/Home'))
const Documentation = lazy(() => import('@/pages/Documentation'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))

// Initialize axe for accessibility testing in development
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
  })
}

// Get root element with type safety
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// Create the root React element and render the application
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main route with layout */}
              <Route path="/" element={<Layout />}>
                {/* Index route (Home page) */}
                <Route index element={<Home />} />

                {/* Documentation page */}
                <Route path="documentation" element={<Documentation />} />

                {/* Catch all route for 404 */}
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </Suspense>

          {/* Global Toast Notifications */}
          <ToastContainer />
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
)
