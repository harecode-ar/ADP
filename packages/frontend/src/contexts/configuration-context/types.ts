import { IConfiguration } from '@adp/shared'
import React from 'react'

export type TConfigurationContextProps = {
  configurations: Pick<IConfiguration, 'key' | 'value'>[]
  refetch: () => void
  loading: boolean
  stagePercentageAlertMargin: number
  projectPercentageAlertMargin: number
}

export type TConfigurationProviderProps = {
  children: React.ReactNode
}
