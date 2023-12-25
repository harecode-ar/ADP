export enum EConfigurationKey {}

export enum EConfigurationValue {}

export interface IConfiguration {
  id: number
  key: EConfigurationKey
  value: EConfigurationValue
  createdAt: string
  updatedAt: string
}

export type TConfigurationInput = Pick<IConfiguration, 'key' | 'value'>
