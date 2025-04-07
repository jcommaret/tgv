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

// Import Roboto font variants
import "@fontsource/roboto/300.css"   // Light
import "@fontsource/roboto/400.css"   // Regular
import "@fontsource/roboto/500.css"   // Medium
import "@fontsource/roboto/700.css"   // Bold

import "@styles/index.scss"

// Import components from the primary adapters in the hexagonal architecture
import Root from "@/pages/Root"
import Home from "@/pages/Home"
import About from "@/pages/About"
import ErrorPage from "@/pages/ErrorPage"

// Create the root React element and render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Main route with outlet for nested routes */}
          <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            {/* Index route (default child route) */}
            <Route index element={<Home />} />
            {/* About page route */}
            <Route path="about" element={<About />} />
            {/* Catch all route for 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
)
