import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize Parse, but don't let it break the app
try {
  import('./lib/parseInit.js');
} catch (error) {
  console.warn('Parse initialization failed:', error);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
