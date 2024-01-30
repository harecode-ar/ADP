import { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ECustomEvent } from 'src/types'

export const usePrint = (): [React.RefObject<HTMLDivElement>, () => void] => {
  const ref = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })

  useEffect(() => {
    window.addEventListener(ECustomEvent.printScreen, handlePrint)
    return () => window.removeEventListener(ECustomEvent.printScreen, handlePrint)
  }, [handlePrint])

  return [ref, handlePrint]
}
