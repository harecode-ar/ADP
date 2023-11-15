import { NEXT_PUBLIC_APP_URL } from 'src/config-global'

export const getStorageFileUrl = (filename: string | null, defaultFile?: string): string =>
  filename ? `${NEXT_PUBLIC_APP_URL}/file/${filename}` : defaultFile || ''
