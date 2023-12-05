import { PERMISSION_MAP } from '@adp/shared'
import type { IContact, IUser, IStage, IProject } from '@adp/shared'
import { Contact, User, Stage, Project } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Contact: {
    users: async (parent: IContact): Promise<IUser[]> => {
      if (parent.users) return parent.users
      try {
        const contact = (await Contact.findByPk(parent.id, {
          include: [
            {
              model: User,
              as: 'users',
            },
          ],
        })) as IContact | null
        if (!contact) throw new Error('No autorizado')
        return contact.users || []
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    stages: async (parent: IContact): Promise<IStage[]> => {
      if (parent.stages) return parent.stages
      try {
        const contact = (await Contact.findByPk(parent.id, {
          include: [
            {
              model: Stage,
              as: 'stages',
            },
          ],
        })) as IContact | null
        if (!contact) throw new Error('No autorizado')
        return contact.stages || []
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projects: async (parent: IContact): Promise<IProject[]> => {
      if (parent.projects) return parent.projects
      try {
        const contact = (await Contact.findByPk(parent.id, {
          include: [
            {
              model: Project,
              as: 'projects',
            },
          ],
        })) as IContact | null
        if (!contact) throw new Error('No autorizado')
        return contact.projects || []
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Query: {
    userContacts: async (_: any, __: any, context: IContext): Promise<IContact[]> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_READ], context)
        const foundUser = (await User.findByPk(user.id, {
          include: [
            {
              model: Contact,
              as: 'contacts',
            },
          ],
        })) as IUser | null
        if (!foundUser) throw new Error('No autorizado')
        return foundUser.contacts || []
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    contact: (_: any, args: Pick<IContact, 'id'>, context: IContext): Promise<Contact | null> => {
      try {
        needPermission([PERMISSION_MAP.CONTACT_READ], context)
        return Contact.findByPk(args.id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
