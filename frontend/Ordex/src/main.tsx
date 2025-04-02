import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.tsx'
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>

        <Router />
    </AuthProvider>
    
  </StrictMode>,
)
