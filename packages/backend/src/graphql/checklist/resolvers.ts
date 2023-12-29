import { PERMISSION_MAP } from '@adp/shared'
import type { IChecklist, ICheck, IProject, IStage, IUser } from '@adp/shared'
import { Checklist, Check, Project, Stage, User } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Checklist: {
    user: (checklist: IChecklist): Promise<IUser | null> => {
      if (checklist.user) return Promise.resolve(checklist.user)
      if (!checklist.userId) return Promise.resolve(null)
      return User.findByPk(checklist.userId) as Promise<IUser | null>
    },
    stage: (checklist: IChecklist): Promise<IStage | null> => {
      if (checklist.stage) return Promise.resolve(checklist.stage)
      if (!checklist.stageId) return Promise.resolve(null)
      return Stage.findByPk(checklist.stageId) as Promise<IStage | null>
    },
    project: (checklist: IChecklist): Promise<IProject | null> => {
      if (checklist.project) return Promise.resolve(checklist.project)
      if (!checklist.projectId) return Promise.resolve(null)
      return Project.findByPk(checklist.projectId) as Promise<IProject | null>
    },
    checks: (checklist: IChecklist): Promise<Omit<ICheck, 'checklist'>[]> => {
      if (checklist.checks) return Promise.resolve(checklist.checks)
      return Check.findAll({
        where: {
          checklistId: checklist.id,
        },
      })
    },
  },
  Query: {
    checklist: (
      _: any,
      args: Pick<IChecklist, 'id'>,
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'> | null> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_READ], context)
        const { user } = context
        if (!user) throw new Error('No autorizado')
        return Checklist.findOne({
          where: { id: args.id, userId: user.id },
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userChecklists: async (
      _: any,
      __: any,
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>[] | null> => {
      try {
        const { user } = context
        if (!user) throw new Error('No autorizado')
        needPermission([PERMISSION_MAP.CHECKLIST_READ], context)
        const foundUser = (await User.findByPk(user.id, {
          include: [
            {
              model: Checklist,
              as: 'checklists',
            },
          ],
        })) as IUser | null
        if (!foundUser) throw new Error('No autorizado')
        // @ts-ignore
        return foundUser.checklists || []
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projectChecklists: (
      _: any,
      args: Pick<IChecklist, 'projectId'>,
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>[] | null> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_READ], context)
        const { user } = context
        if (!user) throw new Error('No autorizado')
        return Checklist.findAll({
          where: {
            userId: user.id,
            projectId: args.projectId,
          },
          order: [['createdAt', 'ASC']],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    stageChecklists: (
      _: any,
      args: Pick<IChecklist, 'stageId'>,
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>[] | null> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_READ], context)
        const { user } = context
        if (!user) throw new Error('No autorizado')
        return Checklist.findAll({
          where: {
            userId: user.id,
            stageId: args.stageId,
          },
          order: [['createdAt', 'ASC']],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    createChecklist: async (
      _: any,
      args: Pick<IChecklist, 'title' | 'stageId' | 'projectId'> & {
        checks: Pick<ICheck, 'title' | 'checked'>[]
      },
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_CREATE], context)
        const { title, stageId, projectId, checks } = args
        const { user } = context
        if (!user) throw new Error('No autorizado')
        const checklist = await Checklist.create({
          title,
          userId: user.id,
          stageId,
          projectId,
        })
        await Promise.all(
          checks.map((check) => Check.create({ ...check, checklistId: checklist.id }))
        )
        const allChecked = checks.every((check) => check.checked)
        await checklist.update({ finished: allChecked })

        return checklist
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    updateChecklist: async (
      _: any,
      args: Pick<IChecklist, 'id' | 'title' | 'stageId' | 'projectId'> & {
        checks: Pick<ICheck, 'title' | 'checked'>[]
      },
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_UPDATE], context)
        const { id, title, stageId, projectId, checks } = args
        const { user } = context
        if (!user) throw new Error('No autorizado')
        const checklist = await Checklist.findOne({
          where: {
            id,
            userId: user.id,
          },
        })
        if (!checklist) throw new Error('Checklist no encontrado')
        await checklist.update({
          title,
          stageId,
          projectId,
        })
        await Check.destroy({
          where: {
            checklistId: checklist.id,
          },
        })
        await Promise.all(
          checks.map((check) => Check.create({ ...check, checklistId: checklist.id }))
        )

        const allChecked = checks.every((check) => check.checked)
        await checklist.update({ finished: allChecked })

        return checklist
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    deleteChecklist: async (
      _: any,
      args: Pick<IChecklist, 'id'>,
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_DELETE], context)
        const { id } = args
        const { user } = context
        if (!user) throw new Error('No autorizado')
        const checklist = await Checklist.findOne({
          where: {
            id,
            userId: user.id,
          },
          include: [{ model: Check, as: 'checks' }],
        })
        if (!checklist) {
          throw new Error('Checklist no encontrado')
        }
        // @ts-ignore
        const { checks } = checklist
        if (checks && checks.length > 0) {
          await Promise.all(checks.map((check: Check) => check.destroy()))
        }

        await checklist.destroy()
        return checklist
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
