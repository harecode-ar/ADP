import type { ISession, IBackendEnvironment } from '@adp/shared'
import dotenv from 'dotenv'
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { resolvers } from '.'
import { Session, User, Role, Permission } from '../database/models'
import type { IContext, TResolvers } from './types'

dotenv.config()

const { JWT_SECRET } = process.env as unknown as IBackendEnvironment

export const getContext = async ({ req }: { req: Request }): Promise<IContext> => {
  const context: IContext = {
    user: null,
    role: null,
    permissions: [],
    session: null,
    userAgent: null,
    resolvers: resolvers as unknown as TResolvers,
  }
  const { headers } = req
  const { authorization: token, 'user-agent': userAgent = null } = headers
  context.userAgent = userAgent

  try {
    if (!token) throw new Error('No token provided')

    const decryptedSession = jwt.verify(token, JWT_SECRET) as {
      id: string
      userAgent: string
      userId: string
    }

    context.session = (await Session.findOne({
      where: {
        id: decryptedSession.id,
        userId: decryptedSession.userId,
        userAgent,
      },
      include: [
        {
          model: User,
          as: 'user',
          include: [
            {
              model: Role,
              as: 'role',
              include: [
                {
                  model: Permission,
                  as: 'permissions',
                },
              ],
            },
          ],
        },
      ],
    })) as ISession | null

    if (!context.session) throw new Error('Invalid token')
    if (context.session.userAgent !== userAgent) throw new Error('Invalid token')
    if (!context.session.user) throw new Error('Invalid token')
    if (!context.session.user.role) throw new Error('Invalid token')
    if (!context.session.user.role.permissions) throw new Error('Invalid token')

    context.user = context.session.user
    context.role = context.session.user.role
    context.permissions = context.session.user.role.permissions
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  return context
}
