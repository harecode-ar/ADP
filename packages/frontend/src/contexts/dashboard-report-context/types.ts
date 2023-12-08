import { IArea } from '@adp/shared'
import React from 'react'

export type TArea = Pick<IArea, 'id' | 'name'>

export type TDashboardReportContextProps = {
  selectedAreas: TArea[]
  selectedInitialDate: string | null
  selectedFinalDate: string | null
  setSelectedAreas: React.Dispatch<React.SetStateAction<TArea[]>>
  setSelectedInitialDate: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedFinalDate: React.Dispatch<React.SetStateAction<string | null>>
}

export type TDashboardReportProviderProps = {
  children: React.ReactNode
}
