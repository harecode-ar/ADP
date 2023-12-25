export enum EConfigurationKey {}

export interface IConfiguration {
  id: number
  key: EConfigurationKey
  value: string
  createdAt: string
  updatedAt: string
}
