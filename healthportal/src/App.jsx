import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Home from './Pages/Home'
import Xray from './Pages/Xray'
import MRI from './Pages/MRI'
import Clinics from './Pages/Clinics'
import Wards from './Pages/Wards'
import WingMap from './Pages/WingMap'
import Quiz from './Pages/Quiz'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Department from './Pages/Department'
import MainLayout from './MainLayout'
import ProtectedRoute from './ProtectedRoute'

import { AgeGroupProvider } from './AgeGroupContext.jsx'

/**
 * The main application component that defines the routing structure.
 * It handles public routes, protected routes, and layout wrapping.
 */
function App() {
  return (
    <Routes>
      {/* Public Route: Login Page */}
      <Route path="/Login" element={<Login />} />
      {/* Public Route: Registration Page */}
      <Route path="/Register" element={<Register />} />

      {/* Protected Routes: These routes require authentication.
          They are wrapped in:
          1. ProtectedRoute: Checks if user is logged in.
          2. AgeGroupProvider: Provides age-group context to children.
          3. MainLayout: Renders the common layout (Navbar, Footer).
      */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AgeGroupProvider>
              <MainLayout />
            </AgeGroupProvider>
          </ProtectedRoute>
        }
      >
        {/* Nested routes rendered inside MainLayout's Outlet */}
        <Route path="Home" element={<Home />} />
        <Route path="Xray" element={<Xray />} />
        <Route path="MRI" element={<MRI />} />
        <Route path="Clinics" element={<Clinics />} />
        <Route path="Wards" element={<Wards />} />
        <Route path="WingMap" element={<WingMap />} />
        <Route path="Quiz" element={<Quiz />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Department" element={<Department />} />
      </Route>
      {/* Catch-all Route: Redirects any unknown paths to the Login page */}
      <Route path="*" element={<Navigate to="/Login" replace />} />
    </Routes>
  );
}

export default App
