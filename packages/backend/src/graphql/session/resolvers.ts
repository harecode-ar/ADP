import cluster from 'cluster'
import type { IUser, ISession, IBackendEnvironment } from '@adp/shared'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User, Session } from '../../database/models'
import { comparePassword } from '../../utils/password'
import type { IContext } from '../types'
import logger from '../../logger'

dotenv.config()

const { JWT_SECRET } = process.env as unknown as IBackendEnvironment

export default {
  Session: {
    user: (parent: ISession): Promise<IUser | null> => {
      try {
        if (parent.user) return Promise.resolve(parent.user)
        return User.findOne({
          where: {
            id: parent.userId,
          },
        }) as Promise<IUser | null>
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    token: (parent: ISession): string => {
      try {
        if (parent.token) return parent.token
        return jwt.sign(
          {
            id: parent.id,
            userId: parent.userId,
          },
          JWT_SECRET,
          {
            expiresIn: '1d',
          }
        )
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Query: {
    getSession: (_: any, __: any, context: IContext): ISession | null => {
      try {
        const workerId = cluster.worker ? cluster.worker.id : 'MASTER'
        logger.info(`Worker ${workerId} - getSession`)
        return context.session
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    checkSession: (_: any, __: any, context: IContext): boolean => {
      try {
        return Boolean(context.session)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    login: async (
      _: ISession,
      args: {
        email: string
        password: string
      },
      context: IContext
    ) => {
      try {
        const { userAgent } = context
        const { email, password } = args
        const foundUser = await User.findOne({
          where: {
            email,
          },
        })

        if (!foundUser) {
          throw new Error('Nombre de usuario o contraseña incorrecta')
        }
        const isValidPassword = await comparePassword(password, foundUser.password)
        if (!isValidPassword) {
          throw new Error('Nombre de usuario o contraseña incorrecta')
        }

        await Session.destroy({
          where: {
            userId: foundUser.id,
          },
        })

        const newSession = await Session.create({
          userId: foundUser.id,
          userAgent,
        })

        const newToken = jwt.sign(
          {
            id: newSession.id,
            userId: newSession.userId,
          },
          JWT_SECRET,
          {
            expiresIn: '1d',
          }
        )

        return {
          ...newSession.dataValues,
          token: newToken,
          user: foundUser.dataValues,
        }
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    logout: async (_: any, __: any, context: IContext): Promise<boolean> => {
      if (!context.session) throw new Error('No hay sesión iniciada')
      await Session.destroy({
        where: {
          id: context.session.id,
        },
      })
      return true
    },
  },
}
