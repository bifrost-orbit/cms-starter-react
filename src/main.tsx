import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { CmsError, CmsRoute } from './routes/cms-route'
import { loadPage } from './routes/load-page'
import './index.css'

const router = createBrowserRouter([
  { path: '*', loader: loadPage, Component: CmsRoute, ErrorBoundary: CmsError, HydrateFallback: () => null },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
