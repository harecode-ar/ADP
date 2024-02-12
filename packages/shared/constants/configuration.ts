import { EConfigurationKey } from '../types'

export const CONFIGURATION_DEFAULT_VALUES: Record<EConfigurationKey, string> = {
  [EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT]: '0.1',
  [EConfigurationKey.PERCENTAGE_ALERT_MARGIN_STAGE]: '0.1',
}

export const CONFIGURATION_DESCRIPTIONS: Record<EConfigurationKey, string> = {
  [EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT]:
    'Es el porcentaje de margen de alerta de proyectos',
  [EConfigurationKey.PERCENTAGE_ALERT_MARGIN_STAGE]:
    'Es el porcentaje de margen de alerta de etapas',
}
