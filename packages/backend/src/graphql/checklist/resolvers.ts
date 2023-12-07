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
      return User.findByPk(checklist.userId)
    },
    stage: (checklist: IChecklist): Promise<IStage | null> => {
      if (checklist.stage) return Promise.resolve(checklist.stage)
      if (!checklist.stageId) return Promise.resolve(null)
      return Stage.findByPk(checklist.stageId)
        .then((result) => (result ? result.get() : null))
        .catch((error) => {
          console.error('Error fetching stage:', error)
          throw error
        })
    },
    project: (checklist: IChecklist): Promise<IProject | null> => {
      if (checklist.project) return Promise.resolve(checklist.project)
      if (!checklist.projectId) return Promise.resolve(null)
      return Project.findByPk(checklist.projectId)
        .then((result) => (result ? result.get() : null))
        .catch((error) => {
          console.error('Error fetching project:', error)
          throw error
        })
    },
    checks: (checklist: IChecklist): Promise<Omit<ICheck, 'checklist'>[]> => {
      if (checklist.checks) return Promise.resolve(checklist.checks)
      return Check.findAll({
        where: {
          checklistId: checklist.id
        }
      })
    }
  },
  Query: {
    checklist: (
      _: any,
      args: Pick<IChecklist, 'id'>,
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'> | null> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_READ], context)
        return Checklist.findByPk(args.id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    checklists: async (
      _: any,
      args: { userId?: number; projectId?: number; stageId?: number },
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>[] | null> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_READ], context);

        const where: Record<string, any> = {};

        if (args.userId) {
          where.userId = args.userId;
        }
        if (args.projectId) {
          where.projectId = args.projectId;
        }
        if (args.stageId) {
          where.stageId = args.stageId;
        }

        const checklists = await Checklist.findAll({
          where,
          order: [['createdAt', 'ASC']],
        });

        return checklists.map(checklist => checklist.get());
      } catch (error) {
        logger.error(error);
        throw error;
      }
    },
  },
  Mutation: {
    createChecklist: (
      _: any,
      args: Pick<IChecklist, 'title' | 'userId' | 'stageId' | 'projectId'>,
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_CREATE], context)
        const { title, userId, stageId, projectId } = args
        return Checklist.create({
          title,
          userId,
          stageId,
          projectId,
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    updateChecklist: async (
      _: any,
      args: Pick<IChecklist, 'id' | 'title' | 'userId' | 'stageId' | 'projectId'>,
      context: IContext
    ): Promise<Omit<IChecklist, 'checks' | 'user' | 'stage' | 'project'>> => {
      try {
        needPermission([PERMISSION_MAP.CHECKLIST_UPDATE], context)
        const { id, title, userId, stageId, projectId } = args
        const checklist = await Checklist.findByPk(id)
        if (!checklist) {
          throw new Error('Checklist not found')
        }
        await checklist.update({
          title,
          userId,
          stageId,
          projectId,
        })
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
        const checklist = await Checklist.findByPk(id, {
          include: [{ model: Check, as: 'checks' }],
        });
        if (!checklist) {
          throw new Error('Checklist not found')
        }
        // @ts-ignore
        const { checks } = checklist
        if (checks && checks.length > 0) {
          await Promise.all(checks.map((check: Check) => check.destroy()));
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
