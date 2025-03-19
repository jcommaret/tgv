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
import './index.scss';

function Root() {
  return (
    <>
      {/* Navigation header */}
      <Nav />
      
      {/* Main content area where child routes are rendered */}
      <main>
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  )
}

export default Root 