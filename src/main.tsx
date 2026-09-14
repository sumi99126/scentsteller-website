import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WizzTechProtectionProvider } from '@wizztech/protection'
import '@wizztech/protection/dist/style.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WizzTechProtectionProvider platformUrl={import.meta.env.VITE_WIZZTECH_PLATFORM_URL}>
      <App />
    </WizzTechProtectionProvider>
  </StrictMode>,
)
