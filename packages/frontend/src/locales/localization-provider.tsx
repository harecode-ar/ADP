'use client'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { es } from 'date-fns/locale'

type TProps = {
  children: any
}

export default function LocalizationProvider({ children }: TProps) {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      {children}
    </MuiLocalizationProvider>
  )
}
