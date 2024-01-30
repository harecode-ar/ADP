import { ECustomEvent } from 'src/types'

export const dispatchCustomEvent = (eventName: ECustomEvent, detail: any = {}) => {
  const event = new CustomEvent(eventName, { detail })
  window.dispatchEvent(event)
}
