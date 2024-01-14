import { EConfigurationKey } from '../types'

export const CONFIGURATION_DEFAULT_VALUES: Record<EConfigurationKey, string> = {
  [EConfigurationKey.PERCENTAGE_ALERT_MARGIN]: '0.1',
}

export const CONFIGURATION_DESCRIPTIONS: Record<EConfigurationKey, string> = {
  [EConfigurationKey.PERCENTAGE_ALERT_MARGIN]: 'Es el porcentaje de margen de alerta',
}
