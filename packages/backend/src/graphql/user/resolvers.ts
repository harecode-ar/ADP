import type { IUser } from '@adp/shared/types'
import { Role, User } from '../../database/models'
import logger from '../../logger'

export default {
  User: {
    role: async (parent: IUser) => {
      if (parent.role) return parent.role
      const { roleId } = parent
      const role = await Role.findByPk(roleId)
      return role
    },
    fullname: (parent: IUser) => {
      const { firstname, lastname } = parent
      return `${firstname} ${lastname}`
    },
  },
  Query: {
    user: (
      _: any,
      args: {
        id: number
      }
    ): Promise<IUser | null> => {
      try {
        const { id } = args
        return User.findByPk(id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    users: (): Promise<IUser[]> => {
      try {
        return User.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    createUser: (
      _: any,
      args: {
        firstname: string
        lastname: string
        email: string
        telephone: string
        password: string
        roleId: number
      }
    ): Promise<IUser> => {
      try {
        const { firstname, lastname, email, telephone, password, roleId } = args
        return User.create({
          firstname,
          lastname,
          email,
          telephone,
          password,
          roleId,
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    updateUser: async (
      _: any,
      args: {
        id: number
        firstname: string
        lastname: string
        email: string
        telephone: string
        password: string
        roleId: number
      }
    ): Promise<IUser | null> => {
      try {
        const { id, firstname, lastname, email, telephone, password, roleId } = args
        const user = await User.findByPk(id)
        if (!user) {
          throw new Error('User not found')
        }
        await user.update({
          firstname,
          lastname,
          email,
          telephone,
          password,
          roleId,
        })
        return user
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    deleteUser: async (
      _: any,
      args: {
        id: number
      }
    ): Promise<IUser | null> => {
      try {
        const { id } = args
        const user = await User.findByPk(id)
        if (!user) {
          throw new Error('User not found')
        }
        await user.destroy()
        return user
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
