/**
 * Root Layout Component
 *
 * This component serves as the main layout wrapper for all pages.
 * It includes the navigation header and footer that appear on every page.
 * It uses React Router's Outlet to render child routes within this layout.
 */

import { Outlet } from 'react-router-dom';
import Nav from '@infrastructure/adapters/primary/components/Nav';
import Footer from '@infrastructure/adapters/primary/components/Footer';

function Root() {
  return (
    <div className="flex flex-col min-h-screen bg-dark font-roboto">
      {/* Navigation header */}
      <Nav />

      {/* Main content area where child routes are rendered */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Root;