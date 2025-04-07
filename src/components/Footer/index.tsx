/**
 * Footer Component
 *
 * A simple footer component that displays copyright information and a link to the MIT license.
 * The current year is dynamically calculated on each render.
 */

import content from '@data/content.json'


function Footer() {

  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-light bg-dark py-6" role="contentinfo">
      <div className="container-custom text-center px-4">
        <p>{currentYear} - {content.components.footer.text}</p>
      </div>
    </footer>
  )
}

export default Footer