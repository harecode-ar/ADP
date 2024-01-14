import {
  CONFIGURATION_DEFAULT_VALUES,
  CONFIGURATION_DESCRIPTIONS,
  EConfigurationKey,
} from '@adp/shared'
import type { IConfiguration } from '@adp/shared'
import { Configuration } from '../models'

type TEntry = [EConfigurationKey, string]

export const configurationSeed = (context: { transaction: any }): Promise<IConfiguration[]> => {
  const { transaction } = context
  return Configuration.bulkCreate(
    Object.entries(CONFIGURATION_DEFAULT_VALUES).map((entry) => {
      const [key, value] = entry as TEntry
      return {
        key,
        value,
        description: CONFIGURATION_DESCRIPTIONS[key] || '-',
      }
    }),
    {
      transaction,
    }
  )
}
