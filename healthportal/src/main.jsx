import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Create the root element for the React application and render the component tree
createRoot(document.getElementById('root')).render(
  // StrictMode activates additional checks and warnings for its descendants
  <StrictMode>
    {/* BrowserRouter enables client-side routing using the HTML5 history API.
        It wraps the main App component to make routing features available throughout the app. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
