import { PERMISSION_MAP } from '@adp/shared'
import type { IConfiguration, TConfigurationInput } from '@adp/shared'
import { Configuration } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {
    configurations: async (_: any, __: any, context: IContext): Promise<IConfiguration[]> => {
      try {
        needPermission([PERMISSION_MAP.CONFIGURATION_READ], context)
        const configurations = await Configuration.findAll()
        return configurations
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    updateConfigurations: async (
      _: any,
      { input }: { input: TConfigurationInput[] },
      context: IContext
    ): Promise<IConfiguration[]> => {
      try {
        needPermission([PERMISSION_MAP.CONFIGURATION_UPDATE], context)
        const configurations = await Promise.all(
          input.map(async ({ key, value }) => {
            const configuration = await Configuration.findOne({ where: { key } })
            if (!configuration) throw new Error(`No se encontró la configuración ${key}`)
            await configuration.update({ value })
            return configuration
          })
        )
        return configurations
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
