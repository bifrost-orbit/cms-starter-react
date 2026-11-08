import type { CmsResolution } from '@bifrost-orbit-cms/sdk'
import { data, redirect, type LoaderFunctionArgs } from 'react-router'

import { cms } from '../lib/cms'
import { endPreview, previewToken } from '../lib/preview'

async function readDraft(path: string, token: string, signal: AbortSignal): Promise<CmsResolution | null> {
  const response = await fetch(`/api/draft?path=${encodeURIComponent(path)}`, { headers: { 'x-preview-token': token }, signal })
  if (response.status === 401) {
    endPreview()
    return null
  }
  if (!response.ok) throw new Error(`The preview server answered ${response.status}`)
  return response.json()
}

export async function loadPage({ request }: LoaderFunctionArgs) {
  const path = new URL(request.url).pathname.replace(/\/+$/, '') || '/'
  const token = previewToken(request)
  const result = (token && (await readDraft(path, token, request.signal))) || (await cms.resolve({ path, signal: request.signal }))

  if (result.kind === 'redirect') throw redirect(result.to, result.status)
  if (result.kind !== 'page') throw data(null, { status: 404 })
  return result.page
}
