import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

/**
 * MainLayout component serves as the wrapper for the application's pages.
 * It includes the persistent Navbar and Footer, and renders the current page content in between.
 */
export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      {/* Render the navigation bar at the top */}
      <Navbar />
      <div className="page-content">
        {/* Render the main content area. If 'children' are provided, they are rendered; 
            otherwise, the 'Outlet' from react-router-dom is used to render child routes. */}
        {children || <Outlet />}
      </div>
      {/* Render the footer at the bottom */}
      <Footer />
    </div>
  );
}