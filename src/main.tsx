/**
 * Application Entry Point
 * 
 * This file serves as the main entry point for the React application.
 * It sets up the router configuration and renders the root component.
 */

import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async'


import "@styles/index.scss"

// Import components from the primary adapters in the hexagonal architecture
import Layout from "@/components/Layout"
import Home from "@/pages/Home"
import Documentation from "@/pages/Documentation"
import ErrorPage from "@/pages/ErrorPage"

// Create the root React element and render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Main route with outlet for nested routes */}
          <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            {/* Index route (default child route) */}
            <Route index element={<Home />} />
            {/* About page route */}
            <Route path="documentation" element={<Documentation />} />
            {/* Catch all route for 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
)
