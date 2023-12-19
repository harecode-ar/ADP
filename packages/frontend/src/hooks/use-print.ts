import { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export const usePrint = (): [React.RefObject<HTMLDivElement>, () => void] => {
  const ref = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })

  useEffect(() => {
    window.addEventListener('printScreen', handlePrint)
    return () => window.removeEventListener('printScreen', handlePrint)
  }, [handlePrint])

  return [ref, handlePrint]
}
