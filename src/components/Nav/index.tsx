/**
 * Navigation Component
 * 
 * This component renders the main navigation header for the application.
 * It uses data from the centralized configuration file to build navigation links.
 * As a primary adapter in the hexagonal architecture, it presents domain data to the user.
 */

import { Link } from 'react-router-dom'
import content from '@data/content.json'
import img from '@assets/images'

function Nav() {
  return (
    <nav className="bg-dark py-4" role="navigation">
      <div className="flex items-center justify-between px-6">
        <Link to="/" className="flex items-center">
           <img src={img.logo} alt="Logo" className="h-8" />
        </Link>
        <ul className="flex space-x-6" role="list">
          {Object.entries(content.pages)
            .filter(([key]) => key !== 'error')
            .map(([key, page]) => (
              <li key={key}>
                <Link to={page.path} className="text-light">
                  {page.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav