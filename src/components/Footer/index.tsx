/**
 * Footer Component
 *
 * A simple footer component that displays copyright information and a link to the MIT license.
 * The current year is dynamically calculated on each render.
 */

import content from '@data/content.json'

function Footer() {
  return (
    <footer className="text-light" role="contentinfo">
      <div className="container-custom text-center">
        <p>{content.components.footer.text}</p>
      </div>
    </footer>
  )
}

export default Footer