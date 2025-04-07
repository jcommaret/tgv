/**
 * Navigation Component
 * 
 * This component renders the main navigation header for the application.
 * It uses data from the centralized configuration file to build navigation links.
 * As a primary adapter in the hexagonal architecture, it presents domain data to the user.
 */

import { Link } from "react-router-dom"
import { img } from "@/assets/alias"
import content from "@data/content.json"

function Nav(): JSX.Element {
  return (
    <header className="fixed top-0 w-full bg-dark shadow-md z-50">
      <nav className="container-custom flex justify-between items-center h-16 px-4">
        {/* Logo with link to home page */}
        <h1 className="text-light">
          <Link to={content.pages.home.path} className="flex items-center">
            <img 
              src={img.logo} 
              alt="logo" 
              className="h-12 w-auto"
            />
          </Link>
        </h1>
        
        {/* Navigation links dynamically generated from the configuration */}
        <ul className="flex space-x-6">
          {Object.values(content.pages)
            .filter(page => page.path !== '*')
            .map(page => (
              <li key={page.path}>
                <Link 
                  to={page.path}
                  className="text-light"
                >
                  {page.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  )
}

export default Nav