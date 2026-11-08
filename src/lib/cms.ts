import { createCmsClient } from '@bifrost-orbit-cms/sdk'

export const cms = createCmsClient({
  baseUrl: import.meta.env.VITE_CMS_API_URL,
  apiKey: import.meta.env.VITE_CMS_PUBLIC_KEY,
  defaultRegion: import.meta.env.VITE_CMS_REGION,
})
