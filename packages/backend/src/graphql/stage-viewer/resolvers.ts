import { ENotificationCategory, PERMISSION_MAP } from '@adp/shared'
import type { IStageViewer } from '@adp/shared'
import { Stage, User, StageViewer } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'
import { sendNotification } from '../../utils/notification'

export default {
  Mutation: {
    createStageViewer: async (
      _: any,
      args: Pick<IStageViewer, 'stageId' | 'userId'>,
      context: IContext
    ): Promise<IStageViewer> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const { stageId, userId } = args
        const stage = await Stage.findByPk(stageId)
        if (!stage) {
          throw new Error('Stage no encontrado')
        }
        const user = await User.findByPk(userId)
        if (!user) {
          throw new Error('Usuario no encontrado')
        }
        const stageViewer = await StageViewer.create({
          stageId,
          userId,
        })

        const params = {
          title: `Ahora puedes visualizar la etapa "${stage.name}"`,
          category: ENotificationCategory.STAGE,
          userIds: [user.id],
          email: true,
        }

        if (stage.parentStageId) {
          params.title = `Ahora puedes visualizar la sub etapa "${stage.name}"`
          params.category = ENotificationCategory.SUB_STAGE
        }

        sendNotification(params)

        return stageViewer as unknown as IStageViewer
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    removeStageViewer: async (
      _: any,
      args: Pick<IStageViewer, 'stageId' | 'userId'>,
      context: IContext
    ): Promise<IStageViewer> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const { stageId, userId } = args

        const stage = await Stage.findByPk(stageId)
        if (!stage) {
          throw new Error('Etapa no encontrada')
        }

        const user = await User.findByPk(userId)
        if (!user) {
          throw new Error('Usuario no encontrado')
        }

        const stageViewer = await StageViewer.findOne({
          where: {
            stageId,
            userId,
          },
        })
        if (!stageViewer) {
          throw new Error('Visualizador de etapa no encontrado')
        }

        await stageViewer.destroy()

        const params = {
          title: `Ya no puedes visualizar la etapa "${stage.name}"`,
          category: ENotificationCategory.STAGE,
          userIds: [user.id],
          email: true,
        }

        if (stage.parentStageId) {
          params.title = `Ya no puedes visualizar la sub etapa "${stage.name}"`
          params.category = ENotificationCategory.SUB_STAGE
        }

        sendNotification(params)

        return stageViewer as unknown as IStageViewer
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
