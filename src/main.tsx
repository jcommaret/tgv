/**
 * Application Entry Point
 * 
 * This file serves as the main entry point for the React application.
 * It sets up the router configuration and renders the root component.
 */

import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { HashRouter as Router, Routes, Route } from "react-router-dom"

// Import components from the primary adapters in the hexagonal architecture
import Root from "@infrastructure/adapters/primary/pages/Root"
import Home from "@infrastructure/adapters/primary/pages/Home"
import About from "@infrastructure/adapters/primary/pages/About"
import ErrorPage from "@infrastructure/adapters/primary/pages/ErrorPage"

// Create the root React element and render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Main route with outlet for nested routes */}
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
          {/* Index route (default child route) */}
          <Route index element={<Home />} />
          {/* About page route */}
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
