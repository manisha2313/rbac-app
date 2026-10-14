import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router/index.tsx'
import { RouterProvider } from 'react-router'
import { ErrorBoundary } from './ErrorBoundary.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
