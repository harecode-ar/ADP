import type { IArea, IProject, IStage, IUpload, IUser, IUserAverageCompletition } from '@adp/shared'
import { ECacheKey, ETokenType, PERMISSION_MAP, getAreaAncestors } from '@adp/shared'
import dotenv from 'dotenv'
import { Op } from 'sequelize'
import {
  Role,
  User,
  Token,
  Project,
  Area,
  Stage,
  Cache,
  UserAverageCompletition,
  ProjectViewer,
  StageViewer,
} from '../../database/models'
import logger from '../../logger'
import { sendResetPasswordMail } from '../../services/nodemailer/reset-password'
import { sendNewUserMail } from '../../services/nodemailer/new-user'
import { hashPassword, comparePassword, generateRandomPassword } from '../../utils/password'
import { deleteFiles, uploadFile } from '../../services/storage'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

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
    averageCompletition: async (parent: IUser): Promise<IUserAverageCompletition> => {
      if (parent.averageCompletition) return Promise.resolve(parent.averageCompletition)
      const averageCompletition = await UserAverageCompletition.findOne({
        where: {
          userId: parent.id,
        },
      })
      if (!averageCompletition) throw new Error('No encontrado')
      return averageCompletition
    },
    sharedStages: async (parent: IUser): Promise<IStage[]> => {
      if (parent.sharedStages) return Promise.resolve(parent.sharedStages)
      const user = await User.findByPk(parent.id, {
        include: [
          {
            model: Stage,
            as: 'sharedStages',
            where: {
              parentId: null,
            },
          },
        ],
      })
      if (!user) throw new Error('Usuario no encontrado')
      // @ts-ignore
      return user.sharedStages
    },
    sharedSubStages: async (parent: IUser): Promise<IStage[]> => {
      if (parent.sharedSubStages) return Promise.resolve(parent.sharedSubStages)
      const user = await User.findByPk(parent.id, {
        include: [
          {
            model: Stage,
            as: 'sharedSubStages',
            where: {
              parentId: {
                [Op.ne]: null,
              },
            },
          },
        ],
      })
      if (!user) throw new Error('Usuario no encontrado')
      // @ts-ignore
      return user.sharedSubStages
    },
    sharedProjects: async (parent: IUser): Promise<IProject[]> => {
      if (parent.sharedProjects) return Promise.resolve(parent.sharedProjects)
      const user = await User.findByPk(parent.id, {
        include: [
          {
            model: Project,
            as: 'sharedProjects',
          },
        ],
      })
      if (!user) throw new Error('Usuario no encontrado')
      // @ts-ignore
      return user.sharedProjects
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
    userForDetail: (
      _: any,
      args: {
        id: number
      }
    ): Promise<IUser | null> => {
      try {
        const { id } = args
        return User.findByPk(id, {
          include: [
            {
              model: UserAverageCompletition,
              as: 'averageCompletition',
              attributes: ['projectAcp', 'projectPacp', 'stageAcp', 'stagePacp'],
            },
            {
              model: Role,
              as: 'role',
            },
          ],
        })
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
    usersForReport: async (): Promise<IUser[]> => {
      try {
        const users = await User.findAll({
          attributes: ['id', 'firstname', 'lastname'],
          include: [
            {
              model: UserAverageCompletition,
              as: 'averageCompletition',
              attributes: ['projectAcp', 'projectPacp', 'stageAcp', 'stagePacp'],
            },
          ],
        })
        return users
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    countUserAssignations: async (_: any, __: any, context: IContext) => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const foundUser = await User.findByPk(user.id, {
          attributes: ['id'],
          include: [
            {
              model: Area,
              as: 'areas',
              attributes: ['id'],
              include: [
                {
                  model: Project,
                  as: 'projects',
                  attributes: ['id'],
                },
                {
                  model: Stage,
                  as: 'stages',
                  attributes: ['id'],
                },
              ],
            },
          ],
        })
        if (!foundUser) throw new Error('Usuario no encontrado')
        // @ts-ignore
        const { areas = [] } = foundUser
        // @ts-ignore
        const projects: Project[] = areas.flatMap((area: Area) => area.projects)
        // @ts-ignore
        const stages: Stage[] = areas.flatMap((area: Area) => area.stages)
        return projects.length + stages.length
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userViewProject: async (_: any, args: { projectId: number }, context: IContext) => {
      try {
        const { projectId } = args
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const project = await Project.findByPk(projectId, {
          attributes: ['id', 'areaId'],
          include: [
            {
              model: Area,
              as: 'area',
              attributes: ['id', 'responsibleId'],
            },
          ],
        })
        if (!project) throw new Error('Proyecto no encontrado')

        // @ts-ignore
        if (project.area?.responsibleId === user.id) {
          return true
        }

        const projectViewer = await ProjectViewer.findOne({
          where: {
            projectId,
            userId: user.id,
          },
        })

        if (projectViewer) return true

        const cachedTree = await Cache.findOne({
          where: {
            key: ECacheKey.AREA_TREE,
          },
        })

        if (!cachedTree) throw new Error('Arbol de areas no encontrado')

        const tree: IArea[] = JSON.parse(cachedTree.value)
        const ancestors = getAreaAncestors(tree, Number(project.areaId))

        const areas = await Area.findAll({
          where: {
            id: {
              [Op.in]: ancestors.map((ancestor) => ancestor.id),
            },
          },
          attributes: ['responsibleId'],
        })

        if (areas.some((area) => area.responsibleId === user.id)) {
          return true
        }
        return false
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userViewStage: async (_: any, args: { stageId: number }, context: IContext) => {
      try {
        const { stageId } = args
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const stage = await Stage.findByPk(stageId, {
          attributes: ['id', 'areaId', 'projectId', 'parentStageId'],
          include: [
            {
              model: Area,
              as: 'area',
              attributes: ['id', 'responsibleId'],
            },
          ],
        })
        if (!stage) throw new Error('Etapa no encontrada')

        // @ts-ignore
        if (stage.area.responsibleId === user.id) {
          return true
        }

        const stageViewer = await StageViewer.findOne({
          where: {
            stageId,
            userId: user.id,
          },
        })

        if (stageViewer) return true

        const projectViewer = await ProjectViewer.findOne({
          where: {
            projectId: stage.projectId,
            userId: user.id,
          },
        })

        if (projectViewer) return true

        if (stage.parentStageId) {
          const parentStageViewer = await StageViewer.findOne({
            where: {
              stageId: stage.parentStageId,
              userId: user.id,
            },
          })

          if (parentStageViewer) return true
        }

        const cachedTree = await Cache.findOne({
          where: {
            key: ECacheKey.AREA_TREE,
          },
        })
        if (!cachedTree) throw new Error('Arbol de areas no encontrado')

        const tree: IArea[] = JSON.parse(cachedTree.value)
        const ancestors = getAreaAncestors(tree, Number(stage.areaId))

        const areas = await Area.findAll({
          where: {
            id: {
              [Op.in]: ancestors.map((ancestor) => ancestor.id),
            },
          },
          attributes: ['responsibleId'],
        })

        if (areas.some((area) => area.responsibleId === user.id)) {
          return true
        }

        return false
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userViewArea: async (_: any, args: { areaId: number }, context: IContext) => {
      try {
        const { areaId } = args
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        const area = await Area.findByPk(areaId, {
          attributes: ['id', 'responsibleId'],
        })
        if (!area) throw new Error('Area no encontrada')

        const [cachedTree] = await Promise.all([
          Cache.findOne({
            where: {
              key: ECacheKey.AREA_TREE,
            },
          }),
        ])
        if (!cachedTree) throw new Error('Arbol de areas no encontrado')

        const tree: IArea[] = JSON.parse(cachedTree.value)
        const ancestors = getAreaAncestors(tree, Number(areaId))

        const responsibleIds = await Area.findAll({
          where: {
            id: {
              [Op.in]: ancestors.map((ancestor) => ancestor.id),
            },
          },
          attributes: ['responsibleId'],
        })
        if (area.responsibleId === user.id) return true
        if (responsibleIds.some((responsible) => responsible.responsibleId === user.id)) {
          return true
        }
        return false
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    usersViewProject: async (_: any, args: { projectId: number }, context: IContext) => {
      try {
        const { projectId } = args
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const project = await Project.findByPk(projectId, {
          attributes: ['id'],
          include: [
            {
              model: User,
              as: 'viewers',
              attributes: ['id', 'firstname', 'lastname', 'email', 'phone', 'image'],
            },
          ],
        })

        if (!project) throw new Error('No se encontro el proyecto')

        // @ts-ignore
        return project.viewers || []
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    usersViewStage: async (_: any, args: { stageId: number }, context: IContext) => {
      try {
        const { stageId } = args
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const stage = await Stage.findByPk(stageId, {
          attributes: ['id'],
          include: [
            {
              model: User,
              as: 'viewers',
              attributes: ['id', 'firstname', 'lastname', 'email', 'phone', 'image'],
            },
          ],
        })

        if (!stage) throw new Error('No se encontro la etapa')

        // @ts-ignore
        return stage.viewers || []
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userAreas: async (_: any, args: { userId: number }, context: IContext) => {
      try {
        const { userId } = args
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        const foundUser = await User.findByPk(userId, {
          attributes: ['id'],
          include: [
            {
              model: Area,
              as: 'areas',
            },
          ],
        })
        if (!foundUser) throw new Error('Usuario no encontrado')
        // @ts-ignore
        return foundUser.areas || []
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
        phone: string | null
        image: IUpload | null
        roleId: number
      }
    ): Promise<IUser> => {
      try {
        const { firstname, lastname, email, phone, image, roleId } = args
        const password = generateRandomPassword(8)
        const hashedPassword = await hashPassword(password)

        const userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
          firstname,
          lastname,
          email,
          password: hashedPassword,
          phone,
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
        phone: string
        image: IUpload | null
        roleId: number
      }
    ): Promise<IUser | null> => {
      try {
        const { id, firstname, lastname, email, phone, image, roleId } = args
        const user = await User.findByPk(id)
        if (!user) {
          throw new Error('Usuario no encontrado')
        }

        const prevImage = user.image

        const userData: Omit<IUser, 'id' | 'password' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
          firstname,
          lastname,
          email,
          phone,
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
          throw new Error('Usuario no encontrado')
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
