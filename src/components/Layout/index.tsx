/**
 * Root Layout Component
 *
 * This component serves as the main layout wrapper for all pages.
 * It includes the navigation header and footer that appear on every page.
 * It uses React Router's Outlet to render child routes within this layout.
 */

import { Outlet, useLocation } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SEO from '@/components/Seo';
import content from '@data/content.json';

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '') || 'home';
  const pageKey = currentPath as keyof typeof content.pages;

  return (
    <div className="flex flex-col min-h-screen bg-dark font-roboto">
      <SEO pageKey={pageKey} />
      {/* Navigation header */}
      <Nav />

      {/* Main content area where child routes are rendered */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Layout;