'use client'

import React, { useMemo, createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CONFIGURATIONS } from 'src/graphql/queries'
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

  const configurations = useMemo(() => {
    if (configurationQuery.data) {
      return configurationQuery.data.configurations || []
    }
    return []
  }, [configurationQuery.data])

  const value = useMemo(
    () => ({
      loading: configurationQuery.loading,
      configurations,
      refetch: configurationQuery.refetch,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configurations, configurationQuery.loading]
  )

  return <ConfigurationContext.Provider value={value}>{children}</ConfigurationContext.Provider>
}
