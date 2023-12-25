export enum EConfigurationKey {
  PERCENTAGE_ALERT_MARGIN = 'percentageAlertMargin',
}

export interface IConfiguration {
  id: number
  key: EConfigurationKey
  value: string
  createdAt: string
  updatedAt: string
}

export type TConfigurationInput = Pick<IConfiguration, 'key' | 'value'>
