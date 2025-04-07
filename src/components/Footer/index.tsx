/**
 * Footer Component
 *
 * A simple footer component that displays copyright information and a link to the MIT license.
 * The current year is dynamically calculated on each render.
 */

import content from "@data/content.json"
// Component
function Footer() {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-6 mt-auto">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm">
            © {currentYear} - {content.components.footer.text}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              MIT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;