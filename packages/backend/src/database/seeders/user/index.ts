import type { IRole, IUser } from '@adp/shared'
import { User } from '../../models'
import { hashPassword } from '../../../utils/password'
import users from './data'

export const userSeed = async (context: { transaction: any; roles: IRole[] }): Promise<IUser[]> => {
  const { transaction, roles } = context
  return Promise.all(
    users.map(async (user) => {
      const role = roles.find((r) => r.name === user.role)
      const hashedPassword = await hashPassword(user.password)
      return User.create(
        {
          ...user,
          password: hashedPassword,
          roleId: role?.id,
        },
        {
          transaction,
        }
      )
    })
  ) as unknown as Promise<IUser[]>
}
