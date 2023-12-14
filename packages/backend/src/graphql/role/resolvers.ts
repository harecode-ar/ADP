import { PERMISSION_MAP as P } from '@adp/shared'
import type { IRole, IPermission } from '@adp/shared'
import { Role, Permission } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

// const roles = (_: any, __: any, context: IContext): Promise<IRole[]> => {
const roles = (_: any, __: any): Promise<IRole[]> => {
  try {
    // needPermission([P.ROLE_READ], context)
    return Role.findAll()
  } catch (error) {
    logger.error(error)
    throw error
  }
}

const role = (
  _: any,
  args: Pick<IRole, 'id' | 'name'>,
  context: IContext
): Promise<IRole | null> => {
  try {
    needPermission([P.ROLE_READ], context)
    return Role.findOne({
      where: args,
    })
  } catch (error) {
    logger.error(error)
    throw error
  }
}

const permissions = async (parent: IRole): Promise<IPermission[]> => {
  const { id } = parent
  const foundRol = (await Role.findByPk(id, {
    include: [
      {
        model: Permission,
        as: 'permissions',
      },
    ],
  })) as IRole | null
  return foundRol?.permissions || []
}

export default {
  Query: {
    roles,
    role,
  },
  Role: {
    permissions,
  },
}
