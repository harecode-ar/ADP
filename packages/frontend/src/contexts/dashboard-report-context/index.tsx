'use client'

import React, { useState, useMemo, createContext, useContext } from 'react'
import type { TDashboardReportContextProps, TDashboardReportProviderProps, TArea } from './types'
import { DEFAULT_AREA } from './constants'

export const DashboardReportContext = createContext({} as TDashboardReportContextProps)

export const useDashboardReportContext = () => {
  const context = useContext(DashboardReportContext)

  if (!context)
    throw new Error('useDashboardReportContext must be use inside DashboardReportProvider')

  return context
}

export function DashboardReportProvider({ children }: TDashboardReportProviderProps) {
  const [selectedAreas, setSelectedAreas] = useState<TArea[]>([DEFAULT_AREA])
  const [selectedInitialDate, setSelectedInitialDate] = useState<string | null>(null)
  const [selectedFinalDate, setSelectedFinalDate] = useState<string | null>(null)

  const value = useMemo(
    () => ({
      selectedAreas,
      selectedInitialDate,
      selectedFinalDate,
      setSelectedAreas,
      setSelectedInitialDate,
      setSelectedFinalDate,
    }),
    [selectedAreas, selectedInitialDate, selectedFinalDate]
  )

  return <DashboardReportContext.Provider value={value}>{children}</DashboardReportContext.Provider>
}
