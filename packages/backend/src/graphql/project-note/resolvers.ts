import { PERMISSION_MAP } from '@adp/shared'
import type { IProjectNote, IUser, IFileRecord } from '@adp/shared'
import { ProjectNote, User, FileRecord } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

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
    createProjectNote: (
      _: any,
      args: Pick<IProjectNote, 'message' | 'projectId'>,
      context: IContext
    ): Promise<IProjectNote> => {
      try {
        const { user } = context
        if (!user) throw new Error('No se encontro ningun usuario')
        needPermission([PERMISSION_MAP.PROJECT_NOTE_CREATE], context)
        return ProjectNote.create({
          ...args,
          userId: user.id,
        })
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
        const projectNote = await ProjectNote.findByPk(id)
        if (!projectNote) {
          throw new Error('Nota de proyecto no encontrada')
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
