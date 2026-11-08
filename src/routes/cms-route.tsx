import { CmsLivePage, CmsPage } from '@bifrost-orbit-cms/sdk/react'
import { useEffect } from 'react'
import { isRouteErrorResponse, Link, useLoaderData, useRevalidator, useRouteError } from 'react-router'

import { registry } from '../cms/registry'
import { cms } from '../lib/cms'
import type { loadPage } from './load-page'

export function CmsRoute() {
  const page = useLoaderData<typeof loadPage>()
  const { revalidate } = useRevalidator()

  useEffect(() => {
    const refresh = () => document.visibilityState === 'visible' && revalidate()
    document.addEventListener('visibilitychange', refresh)
    return () => document.removeEventListener('visibilitychange', refresh)
  }, [revalidate])

  return (
    <main>
      <title>{page.seo.title}</title>
      <meta name="description" content={page.seo.description} />
      {page.draft ? (
        <>
          <CmsLivePage page={page} registry={registry} />
          <script async src={`${cms.origin}/bridge.js`} />
        </>
      ) : (
        <CmsPage page={page} registry={registry} />
      )}
    </main>
  )
}

export function CmsError() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404
  return (
    <main>
      <title>{notFound ? 'Page not found' : 'Something went wrong'}</title>
      <h1>{notFound ? 'Page not found' : 'Something went wrong'}</h1>
      <p>{notFound ? 'The page you were looking for is not here.' : 'Please try again in a moment.'}</p>
      <Link to="/">Go to the home page</Link>
    </main>
  )
}
