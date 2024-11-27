import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router'

createRoot(document.getElementById('app')!).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>,
  )
  