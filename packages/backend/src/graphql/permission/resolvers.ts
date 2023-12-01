import { PERMISSION_MAP } from '@adp/shared'
import type { IPermission } from '@adp/shared'
import { Permission } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

const permissions = (_: any, __: any, context: IContext): Promise<IPermission[]> => {
  try {
    needPermission([PERMISSION_MAP.PERMISSION_READ], context)
    return Permission.findAll()
  } catch (error) {
    logger.error(error)
    throw error
  }
}

const permission = (
  _: any,
  args: Pick<IPermission, 'id' | 'name'>,
  context: IContext
): Promise<IPermission | null> => {
  try {
    needPermission([PERMISSION_MAP.PERMISSION_READ], context)
    return Permission.findOne({
      where: args,
    })
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export default {
  Query: {
    permissions,
    permission,
  },
}
