/**
 * Navigation Component
 * 
 * This component renders the main navigation header for the application.
 * It uses data from the centralized configuration file to build navigation links.
 * As a primary adapter in the hexagonal architecture, it presents domain data to the user.
 */

import { Link } from 'react-router-dom'
import content from '@data/content.json'

function Nav() {
  return (
    <nav className="bg-white shadow-md" role="navigation">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </Link>
          <ul className="flex space-x-6" role="list">
            {Object.entries(content.pages)
              .filter(([key]) => key !== 'error')
              .map(([key, page]) => (
                <li key={key}>
                  <Link to={page.path} className="text-gray-700 hover:text-gray-900">
                    {page.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav