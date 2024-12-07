import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootRoute from './routes/RootRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <RootRoute />
    </Suspense>
  </StrictMode>,
)
