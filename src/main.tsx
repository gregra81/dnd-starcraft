import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* מדידת תנועה של Vercel. פעילה רק בפרודקשן, ללא עוגיות. */}
    <Analytics />
  </StrictMode>,
)
