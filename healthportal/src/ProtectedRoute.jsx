import { Navigate } from 'react-router-dom';

/**
 * A wrapper component that protects routes from unauthorized access.
 * It checks if a user is logged in by looking for a 'username' in sessionStorage.
 * If not logged in, it redirects to the Login page.
 * If logged in, it renders the child components.
 */
export default function ProtectedRoute({ children }) {
  // Check if the user is logged in by retrieving the username from session storage
  const isLoggedIn = sessionStorage.getItem('username');

  // If the user is not logged in, redirect them to the Login page
  // The 'replace' prop prevents the user from going back to the protected page via the browser's back button
  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  // If the user is logged in, render the child components (the protected content)
  return children;
}
