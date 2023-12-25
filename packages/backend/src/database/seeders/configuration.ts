import { CONFIGURATION_DEFAULT_VALUES } from '@adp/shared'
import type { IConfiguration } from '@adp/shared'
import { Configuration } from '../models'

export const configurationSeed = (context: { transaction: any }): Promise<IConfiguration[]> => {
  const { transaction } = context
  return Configuration.bulkCreate(
    Object.entries(CONFIGURATION_DEFAULT_VALUES).map(([key, value]) => ({
      key,
      value,
    })),
    {
      transaction,
    }
  )
}
