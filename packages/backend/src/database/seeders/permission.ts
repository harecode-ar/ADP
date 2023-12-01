import { PERMISSION_ARRAY } from '@adp/shared'
import type { IPermission } from '@adp/shared'
import { Permission } from '../models'

export const permissionSeed = (context: { transaction: any }): Promise<IPermission[]> => {
  const { transaction } = context
  return Permission.bulkCreate(
    PERMISSION_ARRAY.map((permission) => ({
      name: permission,
    })),
    {
      transaction,
    }
  )
}
