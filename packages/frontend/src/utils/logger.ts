import { EAppMode } from '@adp/shared'
import { NEXT_PUBLIC_APP_MODE } from 'src/config-global'

const IS_AVAILABLE = NEXT_PUBLIC_APP_MODE === EAppMode.LOCAL

export const logger = {
  log: (...args: any[]) => {
    if (!IS_AVAILABLE) return
    // eslint-disable-next-line no-console
    console.log(...args)
  },
  warn: (...args: any[]) => {
    if (!IS_AVAILABLE) return
    // eslint-disable-next-line no-console
    console.warn(...args)
  },
  error: (...args: any[]) => {
    if (!IS_AVAILABLE) return
    // eslint-disable-next-line no-console
    console.error(...args)
  },
}
