import { PERMISSION_MAP } from '@adp/shared'
import type { IStageNote, IUser } from '@adp/shared'
import { StageNote, User } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  StageNote: {
    user: (stageNote: IStageNote): Promise<IUser | null> => {
      if (stageNote.user) return Promise.resolve(stageNote.user)
      return User.findByPk(stageNote.userId)
    },
  },
  Query: {
    stageNotes: (_: any, args: { stageId: number }, context: IContext): Promise<IStageNote[]> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_NOTE_READ], context)
        return StageNote.findAll({
          where: { stageId: args.stageId },
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
          order: [['createdAt', 'DESC']],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    createStageNote: (
      _: any,
      args: Pick<IStageNote, 'message' | 'stageId'>,
      context: IContext
    ): Promise<IStageNote> => {
      try {
        const { user } = context
        if (!user) throw new Error('No se encontro ningun usuario')
        needPermission([PERMISSION_MAP.STAGE_NOTE_CREATE], context)
        return StageNote.create({
          ...args,
          userId: user.id,
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    deleteStageNote: async (
      _: any,
      args: Pick<IStageNote, 'id'>,
      context: IContext
    ): Promise<Omit<IStageNote, 'user'>> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_NOTE_DELETE], context)
        const { id } = args
        const stageNote = await StageNote.findByPk(id)
        if (!stageNote) {
          throw new Error('Nota de etapa no encontrada')
        }
        await stageNote.destroy()
        return stageNote
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
