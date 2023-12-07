import { PERMISSION_MAP } from '@adp/shared'
import type { IContact, IUser, IStage, IProject, IUpload } from '@adp/shared'
import { Contact, User, Stage, Project, ContactUser, ContactStage } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'
import { deleteFiles, uploadFile } from '../../services/storage'

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
    stageContacts: async (
      _: any,
      args: Pick<IStage, 'id'>,
      context: IContext
    ): Promise<IContact[]> => {
      try {
        needPermission([PERMISSION_MAP.CONTACT_READ], context)
        const foundStage = (await Stage.findByPk(args.id, {
          include: [
            {
              model: Contact,
              as: 'contacts',
            },
          ],
        })) as IStage | null
        if (!foundStage) throw new Error('No autorizado')
        return foundStage.contacts || []
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projectContacts: async (
      _: any,
      args: Pick<IProject, 'id'>,
      context: IContext
    ): Promise<IContact[]> => {
      try {
        needPermission([PERMISSION_MAP.CONTACT_READ], context)
        const foundProject = (await Project.findByPk(args.id, {
          include: [
            {
              model: Contact,
              as: 'contacts',
            },
          ],
        })) as IProject | null
        if (!foundProject) throw new Error('No autorizado')
        return foundProject.contacts || []
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
  Mutation: {
    createContact: async (
      _: any,
      args: Pick<IContact, 'name' | 'phone' | 'email'> & { image: IUpload | null },
      context: IContext
    ): Promise<Contact> => {
      const { user } = context
      try {
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_CREATE], context)
        const { name, phone, email, image } = args

        const contactData: {
          name: string
          phone: string
          email: string | null
          image: string | null
        } = {
          name,
          phone,
          email,
          image: null,
        }

        if (image) {
          const { createReadStream, filename: originalFilename } = await image
          const stream = createReadStream()
          const response = await uploadFile(stream, originalFilename)
          if (!response) throw new Error('Error al subir la imagen')
          const { filename } = response
          contactData.image = filename
        }

        const contact = await Contact.create(contactData)
        await ContactUser.create({
          userId: user.id,
          contactId: contact.id,
        })
        return contact
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    createStageContact: async (
      _: any,
      args: Pick<IContact, 'name' | 'phone' | 'email'> & { stageId: number; image: IUpload | null },
      context: IContext
    ): Promise<Contact> => {
      const { user } = context
      try {
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_CREATE], context)
        const { stageId, name, phone, email, image } = args

        const contactData: {
          name: string
          phone: string
          email: string | null
          image: string | null
        } = {
          name,
          phone,
          email,
          image: null,
        }

        if (image) {
          const { createReadStream, filename: originalFilename } = await image
          const stream = createReadStream()
          const response = await uploadFile(stream, originalFilename)
          if (!response) throw new Error('Error al subir la imagen')
          const { filename } = response
          contactData.image = filename
        }

        const contact = await Contact.create(contactData)
        await ContactStage.create({
          stageId,
          contactId: contact.id,
        })
        return contact
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    updateContact: async (
      _: any,
      args: Pick<IContact, 'id'> &
        Partial<Pick<IContact, 'name' | 'phone' | 'email'>> & {
          image: IUpload | null
        },
      context: IContext
    ): Promise<Contact> => {
      try {
        needPermission([PERMISSION_MAP.CONTACT_UPDATE], context)
        const { id, name, phone, email, image } = args
        const contact = await Contact.findByPk(id)
        if (!contact) throw new Error('No autorizado')

        const prevImage = contact.image

        const contactData: {
          name?: string
          phone?: string
          email?: string | null
          image?: string | null
        } = {}

        if (name) contactData.name = name
        if (phone) contactData.phone = phone
        if (email) contactData.email = email
        if (image) {
          const { createReadStream, filename: originalFilename } = await image
          const stream = createReadStream()
          const response = await uploadFile(stream, originalFilename)
          if (!response) throw new Error('Error al subir la imagen')
          const { filename } = response
          contactData.image = filename
        }
        await contact.update(contactData)
        if (image && prevImage) deleteFiles([prevImage])
        return contact
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    deleteUserContact: async (
      _: any,
      args: Pick<IContact, 'id'>,
      context: IContext
    ): Promise<boolean> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_DELETE], context)
        const { id } = args
        const contactUser = await ContactUser.findOne({
          where: {
            userId: user.id,
            contactId: id,
          },
        })
        if (!contactUser) throw new Error('No autorizado')
        await contactUser.destroy()
        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    deleteStageContact: async (
      _: any,
      args: Pick<IContact, 'id'> & { stageId: number },
      context: IContext
    ): Promise<boolean> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_DELETE], context)
        const { id, stageId } = args
        const contactStage = await ContactStage.findOne({
          where: {
            stageId,
            contactId: id,
          },
        })
        if (!contactStage) throw new Error('No autorizado')
        await contactStage.destroy()
        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
