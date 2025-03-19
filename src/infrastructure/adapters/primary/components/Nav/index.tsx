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
import "./index.scss"

function Nav(): JSX.Element {
  return (
    <>
      <header>
        <nav className="navigation">
          {/* Logo with link to home page */}
          <h1 className="navigation__logo">
            <Link to={navData.links[0].path}>
              <img src={img.logo} alt="logo" />
            </Link>
          </h1>
          
          {/* Navigation links dynamically generated from the navigation data */}
          <ul className="navigation__links">
            {navData.links.map((link: NavLink) => (
              <li key={link.text}>
                <Link to={link.path}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Nav 