import { createServer } from 'node:http'
import { createCmsClient, verifyWebhook } from '@bifrost-orbit-cms/sdk'

const cms = createCmsClient({
  baseUrl: process.env.CMS_API_URL,
  apiKey: process.env.CMS_PUBLIC_KEY,
  previewKey: process.env.CMS_PREVIEW_KEY,
  defaultRegion: process.env.CMS_DEFAULT_REGION,
})

async function readBody(request) {
  const chunks = []
  for await (const chunk of request) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}

function send(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
  response.end(body === undefined ? undefined : JSON.stringify(body))
}

createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost')
  try {
    if (request.method === 'GET' && url.pathname === '/api/draft') {
      const preview = await cms.checkPreview(request.headers['x-preview-token'])
      if (!preview.valid) return send(response, 401, { error: 'invalid_token' })
      const path = url.searchParams.get('path') || '/'
      return send(response, 200, await cms.resolve({ path, preview: true }))
    }
    if (request.method === 'POST' && url.pathname === '/api/cms-webhook') {
      const secret = process.env.CMS_WEBHOOK_SECRET
      if (!secret) return send(response, 401)
      const result = await verifyWebhook({
        body: await readBody(request),
        timestamp: request.headers['x-orbit-timestamp'],
        signature: request.headers['x-orbit-signature'],
        secret,
      })
      if (!result.valid) return send(response, 401)
      console.log('CMS Orbit published', result.event, result.data.url ?? '')
      return send(response, 204)
    }
    send(response, 404, { error: 'not_found' })
  } catch (error) {
    console.error(error)
    send(response, 502, { error: 'cms_unavailable' })
  }
}).listen(Number(process.env.PORT ?? 8787))
