import { MIME_TYPE_MAP, PERMISSION_MAP } from '@adp/shared'
import type { IProjectNote, IUser, IFileRecord, IUpload } from '@adp/shared'
import { ProjectNote, User, FileRecord, ProjectNoteFile } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'
import { deleteFiles, uploadFile } from '../../services/storage'

export default {
  ProjectNote: {
    user: (projectNote: IProjectNote): Promise<IUser | null> => {
      if (projectNote.user) return Promise.resolve(projectNote.user)
      return User.findByPk(projectNote.userId)
    },
    files: async (projectNote: IProjectNote): Promise<IFileRecord[]> => {
      if (projectNote.files) return Promise.resolve(projectNote.files)
      const { id } = projectNote
      if (!id) throw new Error('No se encontro el id de la nota de proyecto')
      const projectNoteWithFiles = await ProjectNote.findByPk(id, {
        attributes: ['id'],
        include: [
          {
            model: FileRecord,
            as: 'files',
          },
        ],
      })
      if (!projectNoteWithFiles) throw new Error('No se encontro la nota de proyecto')
      const { files = [] } = projectNoteWithFiles as IProjectNote
      return files
    },
  },
  Query: {
    projectNotes: (
      _: any,
      args: { projectId: number },
      context: IContext
    ): Promise<IProjectNote[]> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_NOTE_READ], context)
        return ProjectNote.findAll({
          where: { projectId: args.projectId },
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
    createProjectNote: async (
      _: any,
      args: Pick<IProjectNote, 'message' | 'projectId'> & {
        files: IUpload[]
      },
      context: IContext
    ): Promise<IProjectNote> => {
      try {
        const { user } = context
        if (!user) throw new Error('No se encontro ningun usuario')
        needPermission([PERMISSION_MAP.PROJECT_NOTE_CREATE], context)
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

        const createdNote = await ProjectNote.create({
          ...rest,
          userId: user.id,
        })

        if (savedFiles.length > 0) {
          const createdFiles = await FileRecord.bulkCreate(savedFiles)
          await ProjectNoteFile.bulkCreate(
            createdFiles.map(({ id }) => ({
              projectNoteId: createdNote.id,
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

    deleteProjectNote: async (
      _: any,
      args: Pick<IProjectNote, 'id'>,
      context: IContext
    ): Promise<Omit<IProjectNote, 'user'>> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_NOTE_DELETE], context)
        const { id } = args
        const projectNote = await ProjectNote.findByPk(id, {
          include: [
            {
              model: FileRecord,
              as: 'files',
              attributes: ['id', 'filename'],
            },
          ],
        })
        if (!projectNote) {
          throw new Error('Nota de proyecto no encontrada')
        }
        // @ts-ignore
        const { files = [] } = projectNote

        if (files.length > 0) {
          await ProjectNoteFile.destroy({
            where: {
              projectNoteId: id,
            },
          })
          await FileRecord.destroy({
            where: {
              id: files.map(({ id: fileId }: IFileRecord) => fileId),
            },
          })
          deleteFiles(files.map(({ filename }: IFileRecord) => filename))
        }

        await projectNote.destroy()
        return projectNote
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
