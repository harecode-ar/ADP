import { PERMISSION_MAP, PROJECT_STATE, STAGE_STATE } from '@adp/shared'
import type { IProject, IProjectState, IArea, IStage, IUser, IProjectNote } from '@adp/shared'
import { Op } from 'sequelize'
import {
  Project,
  ProjectState,
  ProjectNote,
  Area,
  Stage,
  User,
  UserFinishedProject,
} from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'
import { getAcp } from '../../utils/average-completition'

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
    ): Promise<
      Omit<
        IStage,
        'area' | 'responsible' | 'state' | 'project' | 'parentStage' | 'childStages' | 'notes'
      >[]
    > => {
      if (project.stages) return Promise.resolve(project.stages)
      return Stage.findAll({ where: { projectId: project.id, parentStageId: null } })
    },
    responsible: async (project: IProject): Promise<IUser | null> => {
      if (project.responsible) return Promise.resolve(project.responsible)
      if (project.area && project.area.responsible) return Promise.resolve(project.area.responsible)
      if (project.areaId) {
        const area: IArea | null = await Area.findByPk(project.areaId, {
          include: [
            {
              model: User,
              as: 'responsible',
            },
          ],
        })
        if (area && area.responsible) return Promise.resolve(area.responsible)
      }
      return Promise.resolve(null)
    },
    notes: (project: IProject): Promise<Omit<IProjectNote, 'user'>[]> => {
      if (project.notes) return Promise.resolve(project.notes)
      return ProjectNote.findAll({ where: { projectId: project.id } })
    },
    progress: (project: IProject): number => {
      if (project.progress) return Number(project.progress.toFixed(2))
      return 0
    },
  },
  Query: {
    projects: (
      _: any,
      __: any,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible' | 'notes'>[]> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.findAll({
          order: [['startDate', 'ASC']],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    project: (
      _: any,
      args: Pick<IProject, 'id'>,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible' | 'notes'> | null> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.findByPk(args.id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projectsByArea: (
      _: any,
      args: Pick<IProject, 'areaId'>,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible' | 'notes'>[]> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.findAll({
          where: { areaId: args.areaId },
          include: [
            { model: Area, as: 'area' },
            { model: Stage, as: 'stages' },
            { model: ProjectState, as: 'state' },
          ],
          order: [['startDate', 'ASC']],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    inProgressProjectsByArea: (
      _: any,
      args: Pick<IProject, 'areaId'>,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible' | 'notes'>[]> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.findAll({
          where: { areaId: args.areaId, stateId: PROJECT_STATE.IN_PROGRESS },
          include: [
            { model: Area, as: 'area' },
            { model: Stage, as: 'stages' },
            { model: ProjectState, as: 'state' },
          ],
          order: [['startDate', 'ASC']],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projectsByAreaAndState: (
      _: any,
      args: Pick<IProject, 'areaId' | 'stateId'>,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible' | 'notes'>[]> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const where: any = { areaId: args.areaId }
        if (args.stateId) where.stateId = args.stateId
        return Project.findAll({
          where,
          include: [
            { model: Area, as: 'area' },
            {
              model: Stage,
              as: 'stages',
              where: {
                parentStageId: null,
              },
              required: false,
            },
            { model: ProjectState, as: 'state' },
          ],
          order: [['startDate', 'ASC']],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userProjects: async (_: any, args: {
      statedId?: number
    }, context: IContext) => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const where = {}
        if (args.statedId){
          // @ts-ignore
          where.stateId = args.statedId
        }
        const foundUser = await User.findByPk(user.id, {
          attributes: ['id'],
          include: [
            {
              model: Area,
              as: 'areas',
              attributes: ['id'],
              where,
              include: [
                {
                  model: Project,
                  as: 'projects',
                  order: [['startDate', 'ASC']],
                  attributes: [
                    'id',
                    'name',
                    'description',
                    'startDate',
                    'endDate',
                    'progress',
                    'acp',
                    'pacp',
                    'stateId',
                  ],
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
        return projects
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    countProjectsByArea: (
      _: any,
      args: Pick<IProject, 'areaId'>,
      context: IContext
    ): Promise<number> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.count({ where: { areaId: args.areaId } })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    createProject: async (
      _: any,
      args: Pick<
        IProject,
        'name' | 'description' | 'areaId' | 'cost' | 'startDate' | 'endDate' | 'stateId'
      >,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible' | 'notes'>> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const { name, description, areaId, cost, startDate, endDate } = args

        const projectStartDate = new Date(startDate).toISOString().slice(0, 10)
        const projectEndDate = new Date(endDate).toISOString().slice(0, 10)
        if (projectStartDate > projectEndDate) {
          throw new Error('Start date must be before end date')
        }

        const { acp, pacp } = getAcp({ startDate, endDate, finishedAt: null })
        const project = await Project.create({
          name,
          description,
          areaId,
          cost,
          startDate,
          endDate,
          acp,
          pacp,
          stateId: STAGE_STATE.NEW,
        })

        return project
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    updateProject: async (
      _: any,
      args: Pick<
        IProject,
        'id' | 'name' | 'description' | 'areaId' | 'cost' | 'startDate' | 'endDate' | 'progress'
      >,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible' | 'notes'>> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const { id, name, description, areaId, cost, startDate, endDate, progress } = args
        const project = await Project.findByPk(id)
        if (!project) {
          throw new Error('Project not found')
        }

        if (startDate) {
          const previousEndDate = project.endDate
          const newStartDate = new Date(startDate).toISOString().slice(0, 10)
          if (previousEndDate < newStartDate) {
            if (endDate) {
              const newEndDate = new Date(endDate).toISOString().slice(0, 10)
              if (newStartDate > newEndDate)
                throw new Error('End date must be greater than start date')
            } else {
              throw new Error(
                'Start date is after previous project end date, consider changing both dates simultaneously.'
              )
            }
          }
        }

        if (endDate) {
          const previousStartDate = project.startDate
          const newEndDate = new Date(endDate).toISOString().slice(0, 10)
          if (previousStartDate > newEndDate) {
            if (startDate) {
              const newStartDate = new Date(startDate).toISOString().slice(0, 10)
              if (newStartDate > newEndDate)
                throw new Error('End date must be greater than start date')
            } else {
              throw new Error(
                'End date is before previous project start date, consider changing both dates simultaneously.'
              )
            }
          }
        }

        const { acp, pacp } = getAcp({ startDate, endDate, finishedAt: project.finishedAt })
        await project.update({
          name,
          description,
          areaId,
          cost,
          startDate,
          endDate,
          progress,
          acp,
          pacp
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
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible' | 'notes'>> => {
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
    },

    finishProject: async (
      _: any,
      args: Pick<IProject, 'id'>,
      context: IContext
    ): Promise<Project> => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.PROJECT_UPDATE], context)
        const { id } = args
        let userId = user.id
        const project = await Project.findOne({
          where: {
            id,
            stateId: {
              [Op.not]: PROJECT_STATE.COMPLETED,
            },
          },
          include: [
            {
              model: Area,
              as: 'area',
              attributes: ['id'],
              include: [
                {
                  model: User,
                  as: 'responsible',
                  attributes: ['id'],
                },
              ],
            },
          ],
        })
        if (!project) {
          throw new Error('Proyecto no encontrado')
        }

        // @ts-ignore
        if (project.area && project.area.responsible) {
          // @ts-ignore
          userId = project.area.responsible.id
        }

        await project.update({
          stateId: PROJECT_STATE.COMPLETED,
          finishedAt: new Date().toISOString().split('T')[0],
        })
        await UserFinishedProject.create({
          userId,
          projectId: project.id,
        })
        
        const finishedAt =  new Date().toISOString().split('T')[0]
        const { acp, pacp } = getAcp({ startDate: project.startDate, endDate: project.endDate, finishedAt })
        await project.update({
          stateId: PROJECT_STATE.COMPLETED,
          finishedAt,
          acp,
          pacp
        })
        
        return project
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
