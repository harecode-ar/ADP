'use client'

import React, { useState, useMemo, createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECT_MIN_MAX_DATE } from 'src/graphql/queries'
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
  const [minDate, setMinDate] = useState<string | null>(null)
  const [maxDate, setMaxDate] = useState<string | null>(null)

  useQuery(GET_PROJECT_MIN_MAX_DATE, {
    onCompleted: (data) => {
      if (data.projectMinMaxDate) {
        setMinDate(data.projectMinMaxDate.minDate || null)
        setMaxDate(data.projectMinMaxDate.maxDate || null)
        setSelectedInitialDate(null)
        setSelectedFinalDate(null)
      }
    },
  })

  const value = useMemo(
    () => ({
      selectedAreas,
      selectedInitialDate,
      selectedFinalDate,
      minDate,
      maxDate,
      setSelectedAreas,
      setSelectedInitialDate,
      setSelectedFinalDate,
      setMinDate,
      setMaxDate,
    }),
    [selectedAreas, selectedInitialDate, selectedFinalDate, minDate, maxDate]
  )

  return <DashboardReportContext.Provider value={value}>{children}</DashboardReportContext.Provider>
}
