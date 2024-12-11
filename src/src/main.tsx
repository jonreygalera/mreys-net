import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootRoute from './routes/RootRoute'
import PageLoader from './features/loader/PageLoader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<PageLoader/>}>
      <RootRoute />
    </Suspense>
  </StrictMode>,
)
