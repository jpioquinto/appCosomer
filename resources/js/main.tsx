import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.tsx'
//import Login from './Login.tsx'
import AppRouter from './router'

createRoot(document.getElementById('app')!).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>,
  )
  