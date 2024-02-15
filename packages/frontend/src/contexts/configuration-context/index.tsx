'use client'

import { EConfigurationKey, IConfiguration } from '@adp/shared'
import React, { useMemo, createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CONFIGURATIONS } from 'src/graphql/queries'
import {
  DEFAULT_PERCENTAGE_ALERT_MARGIN_STAGE,
  DEFAULT_PERCENTAGE_ALERT_MARGIN_PROJECT,
} from 'src/constants'
import type { TConfigurationContextProps, TConfigurationProviderProps } from './types'

export const ConfigurationContext = createContext({} as TConfigurationContextProps)

export const useConfigurationContext = () => {
  const context = useContext(ConfigurationContext)
  if (!context) throw new Error('useConfigurationContext must be use inside ConfigurationProvider')
  return context
}

export function ConfigurationProvider({ children }: TConfigurationProviderProps) {
  const configurationQuery = useQuery(GET_CONFIGURATIONS, {
    pollInterval: 1000 * 30,
  })

  const configurations: IConfiguration[] = useMemo(() => {
    if (configurationQuery.data) {
      return configurationQuery.data.configurations || []
    }
    return []
  }, [configurationQuery.data])

  const { stagePercentageAlertMargin, projectPercentageAlertMargin } = useMemo(() => {
    const pams = configurations.find(
      (c) => c.key === EConfigurationKey.PERCENTAGE_ALERT_MARGIN_STAGE
    )
    const pamp = configurations.find(
      (c) => c.key === EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT
    )
    return {
      stagePercentageAlertMargin: pams ? Number(pams.value) : DEFAULT_PERCENTAGE_ALERT_MARGIN_STAGE,
      projectPercentageAlertMargin: pamp
        ? Number(pamp.value)
        : DEFAULT_PERCENTAGE_ALERT_MARGIN_PROJECT,
    }
  }, [configurations])

  const value = useMemo(
    () => ({
      loading: configurationQuery.loading,
      configurations,
      refetch: configurationQuery.refetch,
      stagePercentageAlertMargin,
      projectPercentageAlertMargin,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configurations, configurationQuery.loading]
  )

  return <ConfigurationContext.Provider value={value}>{children}</ConfigurationContext.Provider>
}
