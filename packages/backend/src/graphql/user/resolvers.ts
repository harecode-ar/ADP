import { ETokenType } from '@adp/shared/types'
import type { IUser } from '@adp/shared/types'
import dotenv from 'dotenv'
import { Role, User, Token } from '../../database/models'
import logger from '../../logger'
import { sendResetPasswordMail } from '../../services/nodemailer'
import { hashPassword } from '../../utils/password'

dotenv.config()

const { APP_URL } = process.env

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
    forgotPassword: async (
      _: any,
      args: {
        email: string
      }
    ): Promise<boolean> => {
      try {
        const { email } = args
        const user = await User.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error('No existe un usuario con el email ingresado')
        }
        const token = await Token.create({
          userId: user.id,
          type: ETokenType.NEW_PASSWORD,
        })
        const resetLink = `${APP_URL}/auth/nueva-clave/${token.token}`
        await sendResetPasswordMail(user, resetLink)
        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    newPassword: async (
      _: any,
      args: {
        token: string
        email: string
        password: string
      }
    ): Promise<boolean> => {
      try {
        const { token, email, password } = args
        const foundToken = await Token.findOne({
          where: {
            token,
            type: ETokenType.NEW_PASSWORD,
          },
        })
        if (!foundToken) {
          throw new Error('Token inválido')
        }
        const user = await User.findOne({
          where: {
            id: foundToken.userId,
            email,
          },
        })
        if (!user) {
          throw new Error('Usuario no encontrado')
        }
        const hashedPassword = await hashPassword(password)
        await user.update({
          password: hashedPassword,
        })
        await foundToken.destroy()
        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
