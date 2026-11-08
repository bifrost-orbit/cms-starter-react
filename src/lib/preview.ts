const STORAGE_KEY = 'cms-preview-token'

export function previewToken(request: Request): string | null {
  const token = new URL(request.url).searchParams.get('preview')
  if (token) sessionStorage.setItem(STORAGE_KEY, token)
  return sessionStorage.getItem(STORAGE_KEY)
}

export function endPreview() {
  sessionStorage.removeItem(STORAGE_KEY)
}
