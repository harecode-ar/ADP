import { useState } from 'react'

export const useMenu = (initialState: null | HTMLElement) => {
  const [element, setElement] = useState<null | HTMLElement>(initialState)

  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    setElement(event.currentTarget)
  }

  const close = () => setElement(null)

  const isOpen = Boolean(element)

  return { element, open, close, isOpen }
}

export type TUseMenu = ReturnType<typeof useMenu>
