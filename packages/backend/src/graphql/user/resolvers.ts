import { ETokenType } from '@adp/shared/types'
import type { IUpload, IUser } from '@adp/shared/types'
import dotenv from 'dotenv'
import { Role, User, Token } from '../../database/models'
import logger from '../../logger'
import { sendResetPasswordMail } from '../../services/nodemailer/reset-password'
import { sendNewUserMail } from '../../services/nodemailer/new-user'
import { hashPassword, comparePassword, generateRandomPassword } from '../../utils/password'
import { deleteFiles, uploadFile } from '../../services/storage'

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
    createUser: async (
      _: any,
      args: {
        firstname: string
        lastname: string
        email: string
        telephone: string | null
        image: IUpload | null
        roleId: number
      }
    ): Promise<IUser> => {
      try {
        const { firstname, lastname, email, telephone, image, roleId } = args
        const password = generateRandomPassword(8)
        const hashedPassword = await hashPassword(password)

        const userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
          firstname,
          lastname,
          email,
          password: hashedPassword,
          telephone,
          image: null,
          roleId,
        }

        if (image) {
          const { createReadStream, filename: originalFilename } = await image
          const stream = createReadStream()
          const response = await uploadFile(stream, originalFilename)
          if (!response) throw new Error('Error al subir la imagen')
          const { filename } = response
          userData.image = filename
        }

        const createdUser = await User.create(userData)

        sendNewUserMail(createdUser, password).catch((error) => {
          logger.error(error)
        })

        return createdUser
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
        image: IUpload | null
        roleId: number
      }
    ): Promise<IUser | null> => {
      try {
        const { id, firstname, lastname, email, telephone, image, roleId } = args
        const user = await User.findByPk(id)
        if (!user) {
          throw new Error('User not found')
        }

        const prevImage = user.image

        const userData: Omit<IUser, 'id' | 'password' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
          firstname,
          lastname,
          email,
          telephone,
          image: prevImage,
          roleId,
        }

        if (image) {
          const { createReadStream, filename: originalFilename } = await image
          const stream = createReadStream()
          const response = await uploadFile(stream, originalFilename)
          if (!response) throw new Error('Error al subir la imagen')
          const { filename } = response
          userData.image = filename
        }

        await user.update(userData)

        if (image) deleteFiles([prevImage])

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

        const foundToken = await Token.findOne({
          where: {
            userId: user.id,
            type: ETokenType.NEW_PASSWORD,
          },
        })

        if (foundToken) {
          const now = new Date()
          const createdAt = new Date(foundToken.createdAt)
          const diff = now.getTime() - createdAt.getTime()
          const minutes = Math.floor(diff / 1000 / 60)
          if (minutes < 2) {
            throw new Error(
              'Ya se ha enviado un correo con un link para cambiar la clave, por favor espere unos minutos'
            )
          }
        }

        await Token.destroy({
          where: {
            userId: user.id,
            type: ETokenType.NEW_PASSWORD,
          },
        })

        const token = await Token.create({
          userId: user.id,
          type: ETokenType.NEW_PASSWORD,
        })
        const resetLink = `${APP_URL}/auth/nueva-clave/${token.token}`
        sendResetPasswordMail(user, resetLink).catch((error) => {
          logger.error(error)
        })
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
    changePassword: async (
      _: any,
      args: {
        email: string
        newPassword: string
        oldPassword: string
      }
    ): Promise<boolean> => {
      try {
        const { email, newPassword, oldPassword } = args

        const user = await User.findOne({
          where: {
            email,
          },
        })
        if (!user) throw new Error('Usuario no encontrado')

        const validPassword = await comparePassword(oldPassword, user.password)

        if (!validPassword) throw new Error('Usuario no encontrado')

        const hashedNewPassword = await hashPassword(newPassword)
        await user.update({
          password: hashedNewPassword,
        })
        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
