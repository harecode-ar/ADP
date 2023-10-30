import type { IRole, IPermission } from '@adp/shared/types'

export const hasRole = (requiredRoles: string[], role: IRole | null) => {
  if (requiredRoles.length === 0 || requiredRoles.includes(role?.name || '')) {
    return true
  }

  return false
}

export const hasPermission = (requiredPermissions: string[], permissions: IPermission[]) => {
  if (
    requiredPermissions.length === 0 ||
    requiredPermissions.some((permission: string) => permissions.find((p) => p.name === permission))
  ) {
    return true
  }

  return false
}
