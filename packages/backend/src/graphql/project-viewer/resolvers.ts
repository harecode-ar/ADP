import { ENotificationCategory, PERMISSION_MAP } from '@adp/shared'
import type { IProjectViewer } from '@adp/shared'
import { Project, User, ProjectViewer } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'
import { sendNotification } from '../../utils/notification'

export default {
  Mutation: {
    createProjectVisualizer: async (
      _: any,
      args: Pick<IProjectViewer, 'projectId' | 'userId'>,
      context: IContext
    ): Promise<IProjectViewer> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_UPDATE], context)
        const { projectId, userId } = args
        const project = await Project.findByPk(projectId)
        if (!project) {
          throw new Error('Proyecto no encontrado')
        }
        const user = await User.findByPk(userId)
        if (!user) {
          throw new Error('Usuario no encontrado')
        }
        const projectViewer = await ProjectViewer.create({
          projectId,
          userId,
        })

        sendNotification({
          title: `Ahora puedes visualizar el proyecto "${project.name}"`,
          category: ENotificationCategory.PROJECT,
          userIds: [user.id],
          email: true,
        })

        return projectViewer as unknown as IProjectViewer
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    removeProjectVisualizer: async (
      _: any,
      args: Pick<IProjectViewer, 'projectId' | 'userId'>,
      context: IContext
    ): Promise<IProjectViewer> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_UPDATE], context)
        const { projectId, userId } = args

        const project = await Project.findByPk(projectId)
        if (!project) {
          throw new Error('Proyecto no encontrado')
        }

        const user = await User.findByPk(userId)
        if (!user) {
          throw new Error('Usuario no encontrado')
        }

        const projectViewer = await ProjectViewer.findOne({
          where: {
            projectId,
            userId,
          },
        })
        if (!projectViewer) {
          throw new Error('Visualizador de proyecto no encontrado')
        }

        await projectViewer.destroy()

        sendNotification({
          title: `Ya no puedes visualizar el proyecto "${project.name}"`,
          category: ENotificationCategory.PROJECT,
          userIds: [user.id],
          email: true,
        })

        return projectViewer as unknown as IProjectViewer
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
