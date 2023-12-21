import { PERMISSION_MAP } from '@adp/shared'
import type { IContact, IUser, IStage, IProject, IUpload } from '@adp/shared'
import {
  Contact,
  User,
  Stage,
  Project,
  ContactUser,
  ContactStage,
  ContactProject,
} from '../../database/models'
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
    createProjectContact: async (
      _: any,
      args: Pick<IContact, 'name' | 'phone' | 'email'> & {
        projectId: number
        image: IUpload | null
      },
      context: IContext
    ): Promise<Contact> => {
      const { user } = context
      try {
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_CREATE], context)
        const { projectId, name, phone, email, image } = args

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
        await ContactProject.create({
          projectId,
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
        if (typeof email !== undefined) contactData.email = email
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
    deleteProjectContact: async (
      _: any,
      args: Pick<IContact, 'id'> & { projectId: number },
      context: IContext
    ): Promise<boolean> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_DELETE], context)
        const { id, projectId } = args
        const contactProject = await ContactProject.findOne({
          where: {
            projectId,
            contactId: id,
          },
        })
        if (!contactProject) throw new Error('No autorizado')
        await contactProject.destroy()
        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    importProjectContacts: async (
      _: any,
      args: { projectId: number; contacts: number[] },
      context: IContext
    ): Promise<number[]> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_CREATE], context)
        const { projectId, contacts } = args
        const contactProjects = await ContactProject.findAll({
          where: {
            contactId: contacts,
            projectId,
          },
          attributes: ['contactId'],
        })
        if (!contactProjects.length) throw new Error('No hay contactos para importar')
        const contactIds = contactProjects.map((contactProject) => contactProject.contactId)
        const contactUsers = await ContactUser.findAll({
          where: {
            contactId: contactIds,
            userId: user.id,
          },
          attributes: ['contactId'],
        })
        const userContactIds = contactUsers.map((contactUser) => contactUser.contactId)
        const filteredContacts = contactIds.filter(
          (contactId) => !userContactIds.includes(contactId)
        )
        if (contacts.length === 1 && !filteredContacts.length)
          throw new Error('El contacto ya existe en el usuario')
        if (!filteredContacts.length) throw new Error('Los contactos ya existen en el usuario')
        await ContactUser.bulkCreate(
          filteredContacts.map((contactId) => ({
            contactId,
            userId: user.id,
          }))
        )
        return filteredContacts
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    importStageContacts: async (
      _: any,
      args: { stageId: number; contacts: number[] },
      context: IContext
    ): Promise<number[]> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_CREATE], context)
        const { stageId, contacts } = args
        const contactStages = await ContactStage.findAll({
          where: {
            contactId: contacts,
            stageId,
          },
          attributes: ['contactId'],
        })
        if (!contactStages.length) throw new Error('No hay contactos para importar')
        const contactIds = contactStages.map((contactStage) => contactStage.contactId)
        const contactUsers = await ContactUser.findAll({
          where: {
            contactId: contactIds,
            userId: user.id,
          },
          attributes: ['contactId'],
        })
        const userContactIds = contactUsers.map((contactUser) => contactUser.contactId)
        const filteredContacts = contactIds.filter(
          (contactId) => !userContactIds.includes(contactId)
        )
        if (contacts.length === 1 && !filteredContacts.length)
          throw new Error('El contacto ya existe en el usuario')
        if (!filteredContacts.length) throw new Error('Los contactos ya existen en el usuario')
        await ContactUser.bulkCreate(
          filteredContacts.map((contactId) => ({
            contactId,
            userId: user.id,
          }))
        )
        return filteredContacts
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    importUserContactsToProject: async (
      _: any,
      args: { projectId: number; contacts: number[] },
      context: IContext
    ): Promise<number[]> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_CREATE], context)
        const { projectId, contacts } = args
        const contactUsers = await ContactUser.findAll({
          where: {
            contactId: contacts,
            userId: user.id,
          },
          attributes: ['contactId'],
        })
        if (!contactUsers.length) throw new Error('No hay contactos para importar')
        const contactIds = contactUsers.map((contactUser) => contactUser.contactId)
        const contactProjects = await ContactProject.findAll({
          where: {
            contactId: contactIds,
            projectId,
          },
          attributes: ['contactId'],
        })
        const projectContactIds = contactProjects.map((contactProject) => contactProject.contactId)
        const filteredContacts = contactIds.filter(
          (contactId) => !projectContactIds.includes(contactId)
        )
        if (contacts.length === 1 && !filteredContacts.length)
          throw new Error('El contacto ya existe en el proyecto')
        if (!filteredContacts.length) throw new Error('Los contactos ya existen en el proyecto')
        await ContactProject.bulkCreate(
          filteredContacts.map((contactId) => ({
            contactId,
            projectId,
          }))
        )
        return filteredContacts
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    importUserContactsToStage: async (
      _: any,
      args: { stageId: number; contacts: number[] },
      context: IContext
    ): Promise<number[]> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CONTACT_CREATE], context)
        const { stageId, contacts } = args
        const contactUsers = await ContactUser.findAll({
          where: {
            contactId: contacts,
            userId: user.id,
          },
          attributes: ['contactId'],
        })
        if (!contactUsers.length) throw new Error('No hay contactos para importar')
        const contactIds = contactUsers.map((contactUser) => contactUser.contactId)
        const contactStages = await ContactStage.findAll({
          where: {
            contactId: contactIds,
            stageId,
          },
          attributes: ['contactId'],
        })
        const stageContactIds = contactStages.map((contactStage) => contactStage.contactId)
        const filteredContacts = contactIds.filter(
          (contactId) => !stageContactIds.includes(contactId)
        )
        if (contacts.length === 1 && !filteredContacts.length)
          throw new Error('El contacto ya existe en la etapa')
        if (!filteredContacts.length) throw new Error('Los contactos ya existen en la etapa')
        await ContactStage.bulkCreate(
          filteredContacts.map((contactId) => ({
            contactId,
            stageId,
          }))
        )
        return filteredContacts
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
