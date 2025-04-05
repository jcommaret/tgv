/**
 * Navigation Component
 * 
 * This component renders the main navigation header for the application.
 * It uses data from the centralized alias file to build navigation links.
 * As a primary adapter in the hexagonal architecture, it presents domain data to the user.
 */

import { Link } from "react-router-dom"
import { navData, img } from "@infrastructure/config/alias"
import { NavLink } from "@domain/model/NavTypes"

function Nav(): JSX.Element {
  return (
    <header className="fixed top-0 w-full bg-dark shadow-md z-50">
      <nav className="container-custom flex justify-between items-center h-16 px-4">
        {/* Logo with link to home page */}
        <h1 className="text-light">
          <Link to={navData.links[0].path} className="flex items-center">
            <img 
              src={img.logo} 
              alt="logo" 
              className="h-12 w-auto"
            />
          </Link>
        </h1>
        
        {/* Navigation links dynamically generated from the navigation data */}
        <ul className="flex space-x-6">
          {navData.links.map((link: NavLink) => (
            <li key={link.text}>
              <Link 
                to={link.path}
                className="text-light "
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Nav