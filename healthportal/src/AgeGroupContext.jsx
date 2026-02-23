import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context object to hold the age group state
const AgeGroupContext = createContext();

/**
 * Custom hook to easily access the AgeGroupContext.
 * Returns the current age group value.
 */
export function useAgeGroup() {
  return useContext(AgeGroupContext);
}

/**
 * Provider component that wraps the application (or part of it) 
 * and makes the age group state available to all child components.
 */
export function AgeGroupProvider({ children }) {
  // Initialize state with the value from sessionStorage, if available
  const [ageGroup, setAgeGroup] = useState(sessionStorage.getItem('agegroup'));

  // Effect to listen for changes in sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // Update state if the 'agegroup' item in sessionStorage changes
      setAgeGroup(sessionStorage.getItem('agegroup'));
    };

    // Add event listener for storage changes and cleanup on unmount
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Render the provider with the current ageGroup value
  return <AgeGroupContext.Provider value={ageGroup}>{children}</AgeGroupContext.Provider>;
}