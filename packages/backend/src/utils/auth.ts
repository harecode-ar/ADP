import logger from '../logger'
import type { IContext } from '../graphql/types'

export const needPermission = (requiredPermissions: string[], context: IContext, strict = true) => {
  try {
    const { permissions, user } = context
    if (!user) throw new Error('Not authorized')
    if (!permissions) throw new Error('Not authorized')
    const hasPermission = strict
      ? requiredPermissions.every((permission) => permissions.find((p) => p.name === permission))
      : requiredPermissions.some((permission) => permissions.find((p) => p.name === permission))
    if (!hasPermission) throw new Error('Not authorized')
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const needRole = (requiredRoles: string[], context: IContext, strict = true) => {
  try {
    const { role: userRole } = context
    if (!userRole) throw new Error('Not authorized')
    const hasRole = strict
      ? requiredRoles.every((role) => role === userRole.name)
      : requiredRoles.some((role) => role === userRole.name)
    if (!hasRole) throw new Error('Not authorized')
  } catch (error) {
    logger.error(error)
    throw error
  }
}
