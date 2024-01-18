import { MIME_TYPE_MAP, PERMISSION_MAP } from '@adp/shared'
import type { IFileRecord, IStageNote, IUpload, IUser } from '@adp/shared'
import { FileRecord, StageNote, StageNoteFile, User } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'
import { deleteFiles, uploadFile } from '../../services/storage'

export default {
  StageNote: {
    user: (stageNote: IStageNote): Promise<IUser | null> => {
      if (stageNote.user) return Promise.resolve(stageNote.user)
      return User.findByPk(stageNote.userId)
    },
    files: async (stageNote: IStageNote): Promise<IFileRecord[]> => {
      if (stageNote.files) return Promise.resolve(stageNote.files)
      const { id } = stageNote
      if (!id) throw new Error('No se encontro el id de la nota de la etapa')
      const stageNoteWithFiles = await StageNote.findByPk(id, {
        attributes: ['id'],
        include: [
          {
            model: FileRecord,
            as: 'files',
          },
        ],
      })
      if (!stageNoteWithFiles) throw new Error('No se encontro la nota de la etapa')
      const { files = [] } = stageNoteWithFiles as IStageNote
      return files
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
            {
              model: FileRecord,
              as: 'files',
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
    createStageNote: async (
      _: any,
      args: Pick<IStageNote, 'message' | 'stageId'> & {
        files: IUpload[]
      },
      context: IContext
    ): Promise<IStageNote> => {
      try {
        const { user } = context
        if (!user) throw new Error('No se encontro ningun usuario')
        needPermission([PERMISSION_MAP.STAGE_NOTE_CREATE], context)
        const { files = [], ...rest } = args

        const savedFiles = []
        try {
          // eslint-disable-next-line no-restricted-syntax
          for (const file of files) {
            // eslint-disable-next-line no-await-in-loop
            const { createReadStream, filename: originalFilename } = await file
            const stream = createReadStream()
            // eslint-disable-next-line no-await-in-loop
            const response = await uploadFile(stream, originalFilename)
            if (!response) throw new Error('Error al subir archivo')
            const { filename, size, extension } = response
            const mimeType = MIME_TYPE_MAP[extension as keyof typeof MIME_TYPE_MAP]
            savedFiles.push({
              originalName: originalFilename,
              filename,
              mimeType,
              size,
              userId: user.id,
            })
          }
        } catch (error) {
          deleteFiles(savedFiles.map(({ filename }) => filename))
          logger.error(error)
          throw error
        }

        const createdNote = await StageNote.create({
          ...rest,
          userId: user.id,
        })

        if (savedFiles.length > 0) {
          const createdFiles = await FileRecord.bulkCreate(savedFiles)
          await StageNoteFile.bulkCreate(
            createdFiles.map(({ id }) => ({
              stageNoteId: createdNote.id,
              fileRecordId: id,
            }))
          )
        }
        return createdNote
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
        const stageNote = await StageNote.findByPk(id, {
          include: [
            {
              model: FileRecord,
              as: 'files',
              attributes: ['id', 'filename'],
            },
          ],
        })

        if (!stageNote) {
          throw new Error('Nota de etapa no encontrada')
        }

        // @ts-ignore
        const { files = [] } = stageNote

        if (files.length > 0) {
          await StageNoteFile.destroy({
            where: {
              stageNoteId: id,
            },
          })
          await FileRecord.destroy({
            where: {
              id: files.map(({ id: fileId }: IFileRecord) => fileId),
            },
          })
          deleteFiles(files.map(({ filename }: IFileRecord) => filename))
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
