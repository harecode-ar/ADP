import { PERMISSION_MAP } from '@adp/shared'
import type { IProject, IProjectState, IArea, IStage, IUser } from '@adp/shared/types'
import { Project, ProjectState, Area, Stage, User } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Project: {
    state: (project: IProject): Promise<IProjectState | null> => {
      if (project.state) return Promise.resolve(project.state)
      return ProjectState.findByPk(project.stateId)
    },
    area: (project: IProject): Promise<IArea | null> => {
      if (project.area) return Promise.resolve(project.area)
      if (!project.areaId) return Promise.resolve(null)
      return Area.findByPk(project.areaId)
    },
    stages: (
      project: IProject
    ): Promise<Omit<IStage, 'area' | 'state' | 'project' | 'parentStage' | 'childStages'>[]> => {
      if (project.stages) return Promise.resolve(project.stages)
      return Stage.findAll({ where: { projectId: project.id, parentStageId: null } })
    },
    responsible: async (project: IProject): Promise<IUser | null> => {
      if (project.responsible) return Promise.resolve(project.responsible)
      if (project.area && project.area.responsible) return Promise.resolve(project.area.responsible)
      if (project.areaId) {
        const area: IArea | null = await Area.findByPk(project.areaId, {
          include: {
            model: User,
            as: 'responsible',
          },
        })
        if (area && area.responsible) return Promise.resolve(area.responsible)
      }
      return Promise.resolve(null)
    },
  },
  Query: {
    projects: (
      _: any,
      __: any,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible'>[]> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    project: (
      _: any,
      args: Pick<IProject, 'id'>,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible'> | null> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.findByPk(args.id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    createProject: (
      _: any,
      args: Pick<
        IProject,
        'name' | 'description' | 'areaId' | 'cost' | 'startDate' | 'endDate' | 'stateId'
      >,
      context: IContext,
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible'>> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const { name, description, areaId, cost, startDate, endDate } = args
        return Project.create({
          name,
          description,
          areaId,
          cost,
          startDate,
          endDate,
          stateId: 1,
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    updateProject: async (
      _: any,
      args: Pick<
      IProject,
      'id' | 'name' | 'description' | 'areaId' | 'cost' | 'startDate' | 'endDate' | 'progress' | 'stateId'
      >,
      context: IContext,
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible'>> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const { id, name, description, areaId, cost, startDate, endDate, progress, stateId } = args
        const project = await Project.findByPk(id)
        if (!project) {
          throw new Error('Project not found')
        }
        await project.update({
          name,
          description,
          areaId,
          cost,
          startDate,
          endDate,
          progress,
          stateId,
        })
        return project
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    deleteProject: async (
      _: any,
      args: Pick<IProject, 'id'>,
      context: IContext,
      ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible'>> => {
        try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const { id } = args
        const project = await Project.findByPk(id)
        if (!project) {
          throw new Error('Project not found')
        }
        await project.destroy()
        return project
      } catch (error) {
        logger.error(error)
        throw error
      }
    }
  },
}
