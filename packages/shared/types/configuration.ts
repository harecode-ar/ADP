export enum EConfigurationKey {
  PERCENTAGE_ALERT_MARGIN_PROJECT = 'percentageAlertMarginProject',
  PERCENTAGE_ALERT_MARGIN_STAGE = 'percentageAlertMarginStage',
}

export interface IConfiguration {
  id: number
  key: EConfigurationKey
  value: string
  description: string
  createdAt: string
  updatedAt: string
}

export type TConfigurationInput = Pick<IConfiguration, 'key' | 'value'>
