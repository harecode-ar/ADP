import { ROLE_ARRAY, ROLE_PERMISSION_MAP } from '@adp/shared'
import type { IPermission, IRole, IRolePermission } from '@adp/shared/types'
import { RolePermission } from '../models'

export const rolePermissionSeed = async (context: {
  transaction: any
  roles: IRole[]
  permissions: IPermission[]
}): Promise<IRolePermission[]> => {
  const { transaction, roles, permissions } = context
  const rolePermission = await Promise.all(
    ROLE_ARRAY.flatMap((roleName) => {
      const currentRole = roles.find((r) => r.name === roleName)
      const rolePermissions = ROLE_PERMISSION_MAP[roleName]
      const currentPermissions = rolePermissions.map((permissionName) => {
        const permission = permissions.find((p) => p.name === permissionName)
        if (!permission) throw new Error(`Permission ${permissionName} not found`)
        return permission
      })
      if (!currentRole) throw new Error(`Role ${roleName} not found`)
      return currentPermissions.map((permission) => ({
        roleId: currentRole.id,
        permissionId: permission.id,
      }))
    })
  )

  return RolePermission.bulkCreate(rolePermission, { transaction })
}
