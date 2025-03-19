/**
 * Footer Component
 * 
 * A simple footer component that displays copyright information and a link to the MIT license.
 * The current year is dynamically calculated on each render.
 */

// Styles
import "./index.scss"

// Component
function Footer() {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <p>
        {/* Copyright information with dynamic year */}
        © {currentYear} - Licence MIT - Ce projet est sous licence{" "}
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT
        </a>
      </p>
    </footer>
  )
}

export default Footer 