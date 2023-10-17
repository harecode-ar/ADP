import { ROLE_ARRAY } from '@adp/shared'
import type { IRole } from '@adp/shared'
import { Role } from '../models'

export const roleSeed = async (context: { transaction: any }): Promise<IRole[]> => {
  const { transaction } = context
  const rolesToCreate = ROLE_ARRAY.map((role) => ({
    name: role,
  }))
  return Role.bulkCreate(rolesToCreate, {
    transaction,
  })
}
