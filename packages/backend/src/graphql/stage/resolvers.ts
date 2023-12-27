import { PERMISSION_MAP, STAGE_STATE } from '@adp/shared'
import type { IStage, IUser, IProjectState, IArea, IProject } from '@adp/shared'
import { Op } from 'sequelize'
import { Stage, Project, StageState, Area, User, StageNote, UserFinishedStage } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import { calculateProjectProgress } from '../../database/jobs/project'
import type { IContext } from '../types'
import { calculateStageProgress } from '../../database/jobs'

export default {
  Stage: {
    state: (stage: IStage): Promise<IProjectState | null> => {
      if (stage.state) return Promise.resolve(stage.state)
      return StageState.findByPk(stage.stateId)
    },
    area: (stage: IStage): Promise<IArea | null> => {
      if (stage.area) return Promise.resolve(stage.area)
      if (!stage.areaId) return Promise.resolve(null)
      return Area.findByPk(stage.areaId)
    },
    project: (stage: IStage): Promise<IProject | null> => {
      if (stage.project) return Promise.resolve(stage.project)
      return Project.findByPk(stage.projectId) as Promise<IProject | null>
    },
    parentStage: (stage: IStage): Promise<IStage | null> => {
      if (stage.parentStage) return Promise.resolve(stage.parentStage)
      if (!stage.parentStageId) return Promise.resolve(null)
      return Stage.findByPk(stage.parentStageId) as Promise<IStage | null>
    },
    responsible: async (stage: IStage): Promise<IUser | null> => {
      if (stage.responsible) return Promise.resolve(stage.responsible)
      if (stage.area && stage.area.responsible) return Promise.resolve(stage.area.responsible)
      if (stage.areaId) {
        const area: IArea | null = await Area.findByPk(stage.areaId, {
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
    progress: (stage: IStage): number => {
      if (stage.progress) return Number(stage.progress.toFixed(2))
      return 0
    },
    notes: (stage: IStage): Promise<IStage['notes']> => {
      if (stage.notes) return Promise.resolve(stage.notes)
      return StageNote.findAll({ where: { stageId: stage.id } })
    },
  },
  Query: {
    stages: (
      _: any,
      __: any,
      context: IContext
    ): Promise<
      Omit<
        IStage,
        'state' | 'area' | 'responsible' | 'parentStage' | 'childStages' | 'project' | 'notes'
      >[]
    > => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        return Stage.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    stage: (
      _: any,
      args: Pick<IStage, 'id'>,
      context: IContext
    ): Promise<Omit<
      IStage,
      'state' | 'area' | 'responsible' | 'parentStage' | 'childStages' | 'project' | 'notes'
    > | null> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        return Stage.findOne({
          where: { id: args.id, parentStageId: null },
          include: [
            {
              model: Area,
              as: 'area',
            },
            {
              model: StageState,
              as: 'state',
            },
            {
              model: Project,
              as: 'project',
            },
            {
              model: StageNote,
              as: 'notes',
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['id', 'firstname', 'lastname', 'image'],
                },
              ],
            },
          ],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    subStage: (
      _: any,
      args: Pick<IStage, 'id'>,
      context: IContext
    ): Promise<Omit<
      IStage,
      'state' | 'area' | 'responsible' | 'parentStage' | 'childStages' | 'project' | 'notes'
    > | null> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        return Stage.findOne({
          where: { id: args.id, parentStageId: { [Op.ne]: null } },
          include: [
            {
              model: Area,
              as: 'area',
            },
            {
              model: StageState,
              as: 'state',
            },
            {
              model: Project,
              as: 'project',
            },
            {
              model: Stage,
              as: 'parentStage',
            },
            {
              model: StageNote,
              as: 'notes',
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['id', 'firstname', 'lastname', 'image'],
                },
              ],
            },
          ],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    stagesByProject: (
      _: any,
      args: { projectId: number },
      context: IContext
    ): Promise<Omit<IStage, 'parentStage' | 'childStages' | 'project'>[]> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        return Stage.findAll({
          where: { projectId: args.projectId, parentStageId: null },
          include: [
            {
              model: Area,
              as: 'area',
            },
            {
              model: StageState,
              as: 'state',
            },
          ],
          order: [['startDate', 'ASC']],
        }) as unknown as Promise<Omit<IStage, 'parentStage' | 'childStages' | 'project'>[]>
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    subStagesByStage: (
      _: any,
      args: { stageId: number },
      context: IContext
    ): Promise<Omit<IStage, 'parentStage' | 'childStages' | 'project'>[]> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        return Stage.findAll({
          where: { parentStageId: args.stageId },
          include: [
            {
              model: Area,
              as: 'area',
            },
            {
              model: StageState,
              as: 'state',
            },
          ],
          order: [['startDate', 'ASC']],
        }) as unknown as Promise<Omit<IStage, 'parentStage' | 'childStages' | 'project'>[]>
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userStages: async (_: any, __: any, context: IContext) => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const foundUser = await User.findByPk(user.id, {
          attributes: ['id'],
          include: [
            {
              model: Area,
              as: 'areas',
              attributes: ['id'],
              include: [
                {
                  model: Stage,
                  as: 'stages',
                  order: [['startDate', 'ASC']],
                  where: { parentStageId: null },
                  attributes: [
                    'id',
                    'name',
                    'description',
                    'startDate',
                    'endDate',
                    'progress',
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
        const stages: Stage[] = areas.flatMap((area: Area) => area.stages)
        return stages
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userSubStages: async (_: any, __: any, context: IContext) => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const foundUser = await User.findByPk(user.id, {
          attributes: ['id'],
          include: [
            {
              model: Area,
              as: 'areas',
              attributes: ['id'],
              include: [
                {
                  model: Stage,
                  as: 'stages',
                  order: [['startDate', 'ASC']],
                  where: { parentStageId: { [Op.ne]: null } },
                  attributes: [
                    'id',
                    'name',
                    'description',
                    'startDate',
                    'endDate',
                    'progress',
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
        const subStages: Stage[] = areas.flatMap((area: Area) => area.stages)
        return subStages
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },

  Mutation: {
    createStage: async (
      _: any,
      args: Pick<
        IStage,
        'name' | 'description' | 'startDate' | 'endDate' | 'areaId' | 'projectId' | 'parentStageId'
      >,
      context: IContext
    ): Promise<
      Omit<
        IStage,
        'state' | 'area' | 'responsible' | 'project' | 'parentStage' | 'childStages' | 'notes'
      >
    > => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const { name, description, startDate, endDate, areaId, projectId, parentStageId } = args

        const actualDate = new Date().toISOString().slice(0, 10)
        const start = new Date(startDate).toISOString().slice(0, 10)
        const end = new Date(endDate).toISOString().slice(0, 10)
        if (start > end) throw new Error('End date must be greater than start date')

        const project = await Project.findByPk(projectId)
        if (!project) throw new Error('Project not found')
        const projectStart = new Date(project.startDate).toISOString().slice(0, 10)
        const projectEnd = new Date(project.endDate).toISOString().slice(0, 10)
        if (start < projectStart || end > projectEnd) throw new Error('Dates out of range')
        const state = start > actualDate ? STAGE_STATE.NEW : STAGE_STATE.IN_PROGRESS

        const stageCreated = await Stage.create({
          name,
          description,
          startDate,
          endDate,
          stateId: state,
          areaId,
          projectId,
          parentStageId,
        })
        try {
          await calculateProjectProgress(projectId)
        } catch (error) {
          logger.error(error)
        }

        return stageCreated
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    updateStage: async (
      _: any,
      args: Pick<
        IStage,
        | 'id'
        | 'name'
        | 'description'
        | 'startDate'
        | 'endDate'
        | 'hasStages'
        | 'stateId'
        | 'areaId'
        | 'projectId'
        | 'parentStageId'
      >,
      context: IContext
    ): Promise<
      Omit<
        IStage,
        'state' | 'area' | 'responsible' | 'project' | 'parentStage' | 'childStages' | 'notes'
      >
    > => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const {
          id,
          name,
          description,
          startDate,
          endDate,
          hasStages,
          areaId,
          projectId,
          parentStageId,
        } = args

        const stage = await Stage.findByPk(id)
        if (!stage) {
          throw new Error('Stage not found')
        }

        const project = await Project.findByPk(projectId)
        if (!project) throw new Error('Project not found')

        if (startDate) {
          const previousStageEnd = stage.endDate
          const newStageStart = new Date(startDate).toISOString().slice(0, 10)
          const projectStart = new Date(project.startDate).toISOString().slice(0, 10)
          if (newStageStart < projectStart)
            throw new Error('Start date is out of project date range')
          if (previousStageEnd < newStageStart) {
            if (endDate) {
              const newStageEnd = new Date(endDate).toISOString().slice(0, 10)
              if (newStageStart > newStageEnd)
                throw new Error('End date must be greater than start date')
            } else {
              throw new Error(
                'Start date is after previous stage end date, consider changing both dates simultaneously.'
              )
            }
          }
        }

        if (endDate) {
          const previousStageStart = stage.startDate
          const newStageEnd = new Date(endDate).toISOString().slice(0, 10)
          const projectEnd = new Date(project.endDate).toISOString().slice(0, 10)
          if (newStageEnd > projectEnd) throw new Error('End date is out of project date range')
          if (previousStageStart > newStageEnd) {
            if (startDate) {
              const newStageStart = new Date(startDate).toISOString().slice(0, 10)
              if (newStageStart > newStageEnd)
                throw new Error('End date must be greater than start date')
            } else {
              throw new Error(
                'End date is before previous stage start date, consider changing both dates simultaneously.'
              )
            }
          }
        }

        await stage.update({
          name,
          description,
          startDate,
          endDate,
          hasStages,
          areaId,
          parentStageId,
        })

        try {
          await calculateProjectProgress(projectId)
        } catch (error) {
          logger.error(error)
        }

        return stage
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    deleteStage: async (
      _: any,
      args: {
        id: number
      },
      context: IContext
    ): Promise<
      Omit<
        IStage,
        'state' | 'area' | 'responsible' | 'project' | 'parentStage' | 'childStages' | 'notes'
      >
    > => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const stage = await Stage.findByPk(args.id)
        if (!stage) {
          throw new Error('Stage not found')
        }

        const { projectId } = stage
        await stage.destroy()

        try {
          await calculateProjectProgress(projectId)
        } catch (error) {
          logger.error(error)
        }

        return stage
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    finishStage: async (
      _: any,
      args: Pick<IStage, 'id'>,
      context: IContext
    ): Promise<Stage> => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_UPDATE], context)
        const { id } = args
        let userId = user.id
        const stage = await Stage.findOne({
          where: {
            id,
            stateId: {
              [Op.not]: STAGE_STATE.COMPLETED,
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
        if (!stage) {
          throw new Error('Etapa no encontrada')
        }

        // @ts-ignore
        if (stage.area && stage.area.responsible) {
          // @ts-ignore
          userId = stage.area.responsible.id
        }

        await stage.update({
          stateId: STAGE_STATE.COMPLETED,
          progress: 1,
          finishedAt: new Date().toISOString().split('T')[0],
        })
        await UserFinishedStage.create({
          userId,
          stageId: stage.id,
        })

        await calculateProjectProgress(stage.projectId)
        
        return stage
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    createSubStage: async (
      _: any,
      args: Pick<
        IStage,
        'name' | 'description' | 'startDate' | 'endDate' | 'areaId' | 'parentStageId'
      >,
      context: IContext
    ): Promise<
      Omit<
        IStage,
        | 'state'
        | 'area'
        | 'responsible'
        | 'project'
        | 'parentStage'
        | 'childStages'
        | 'notes'
        | 'hasStages'
      >
    > => {
      try {
        if (!args.parentStageId) throw new Error('No se encontro etapa padre')
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const { name, description, startDate, endDate, areaId, parentStageId } = args

        const actualDate = new Date().toISOString().slice(0, 10)
        const start = new Date(startDate).toISOString().slice(0, 10)
        const end = new Date(endDate).toISOString().slice(0, 10)
        if (start > end)
          throw new Error('La fecha de finalizacion debe ser mayor a la fecha de inicio')

        const parentStage = await Stage.findByPk(parentStageId)
        if (!parentStage) throw new Error('Etapa padre no encontrada')
        const parentStageStart = new Date(parentStage.startDate).toISOString().slice(0, 10)
        const parentStageEnd = new Date(parentStage.endDate).toISOString().slice(0, 10)

        if (start < parentStageStart || end > parentStageEnd)
          throw new Error('Fechas fuera de rango')
        const state = start > actualDate ? STAGE_STATE.NEW : STAGE_STATE.IN_PROGRESS

        const stageCreated = await Stage.create({
          name,
          description,
          startDate,
          endDate,
          stateId: state,
          areaId,
          projectId: parentStage.projectId,
          parentStageId,
        })

        try {
          await parentStage.update({ projectId: parentStage.projectId, hasStages: true })
          await calculateStageProgress(parentStageId)
        } catch (error) {
          logger.error(error)
        }

        calculateProjectProgress(parentStage.projectId).catch((error) => {
          logger.error(error)
        })

        return stageCreated
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    updateSubStage: async (
      _: any,
      args: Pick<
        IStage,
        | 'id'
        | 'name'
        | 'description'
        | 'startDate'
        | 'endDate'
        | 'stateId'
        | 'areaId'
        | 'parentStageId'
      >,
      context: IContext
    ): Promise<
      Omit<
        IStage,
        'state' | 'area' | 'responsible' | 'project' | 'parentStage' | 'childStages' | 'notes'
      >
    > => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const { id, name, description, startDate, endDate, areaId, parentStageId } = args

        const subStage = await Stage.findByPk(id)
        if (!subStage) {
          throw new Error('Etapa no encontrada')
        }

        if (!subStage.parentStageId) throw new Error('No se encontro etapa padre')

        const stage = await Stage.findByPk(subStage.parentStageId)
        if (!stage) throw new Error('Etapa padre no encontrada')

        const project = await Project.findByPk(stage.projectId)
        if (!project) throw new Error('Proyecto no encontrado')

        if (startDate) {
          const previousStageEnd = subStage.endDate
          const newStageStart = new Date(startDate).toISOString().slice(0, 10)
          const projectStart = new Date(project.startDate).toISOString().slice(0, 10)
          if (newStageStart < projectStart)
            throw new Error('La fecha de inicio esta fuera del rango del proyecto')
          if (previousStageEnd < newStageStart) {
            if (endDate) {
              const newStageEnd = new Date(endDate).toISOString().slice(0, 10)
              if (newStageStart > newStageEnd)
                throw new Error('La fecha de finalizacion debe ser mayor a la fecha de inicio')
            } else {
              throw new Error(
                'La fecha de inicio es posterior a la fecha de finalizacion de la etapa anterior, considere cambiar ambas fechas simultaneamente.'
              )
            }
          }
        }

        if (endDate) {
          const previousStageStart = subStage.startDate
          const newStageEnd = new Date(endDate).toISOString().slice(0, 10)
          const projectEnd = new Date(project.endDate).toISOString().slice(0, 10)
          if (newStageEnd > projectEnd)
            throw new Error('La fecha de finalizacion esta fuera del rango del proyecto')
          if (previousStageStart > newStageEnd) {
            if (startDate) {
              const newStageStart = new Date(startDate).toISOString().slice(0, 10)
              if (newStageStart > newStageEnd)
                throw new Error('La fecha de finalizacion debe ser mayor a la fecha de inicio')
            } else {
              throw new Error(
                'La fecha de finalizacion es anterior a la fecha de inicio de la etapa anterior, considere cambiar ambas fechas simultaneamente.'
              )
            }
          }
        }

        await subStage.update({
          name,
          description,
          startDate,
          endDate,
          areaId,
          parentStageId,
        })

        try {
          await calculateStageProgress(stage.id)
        } catch (error) {
          logger.error(error)
        }

        calculateProjectProgress(project.id).catch((error) => {
          logger.error(error)
        })

        return subStage
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    deleteSubStage: async (
      _: any,
      args: {
        id: number
      },
      context: IContext
    ): Promise<
      Omit<
        IStage,
        'state' | 'area' | 'responsible' | 'project' | 'parentStage' | 'childStages' | 'notes'
      >
    > => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const subStage = await Stage.findByPk(args.id)
        if (!subStage) {
          throw new Error('Etapa no encontrada')
        }
        const { parentStageId } = subStage

        const { projectId } = subStage
        await subStage.destroy()

        if (parentStageId !== null) {
          try {
            await calculateStageProgress(parentStageId)
          } catch (error) {
            logger.error(error)
          }
        }

        calculateProjectProgress(projectId).catch((error) => {
          logger.error(error)
        })

        return subStage
      } catch (error) {
        logger.error(error)
        throw error
      }
    },

    finishSubStage: async (
      _: any,
      args: Pick<IStage, 'id'>,
      context: IContext
    ): Promise<Stage> => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_UPDATE], context)
        const { id } = args
        let userId = user.id
        const subStage = await Stage.findOne({
          where: {
            id,
            stateId: {
              [Op.not]: STAGE_STATE.COMPLETED,
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
        if (!subStage) {
          throw new Error('Etapa no encontrada')
        }

        // @ts-ignore
        if (subStage.area && subStage.area.responsible) {
          // @ts-ignore
          userId = subStage.area.responsible.id
        }

        await subStage.update({
          stateId: STAGE_STATE.COMPLETED,
          progress: 1,
          finishedAt: new Date().toISOString().split('T')[0],
        })
        await UserFinishedStage.create({
          userId,
          stageId: subStage.id,
        })

        if (subStage.parentStageId !== null) {
          const parentStage = await Stage.findByPk(subStage.parentStageId)
          if (parentStage) {
            try {
              await calculateStageProgress(parentStage.id)
            } catch (error) {
              logger.error(error)
            }
          }
        }

        calculateProjectProgress(subStage.projectId).catch((error) => {
          logger.error(error)
        })

        return subStage
      } catch (error) {
        logger.error(error)
        throw error
      }
    }
  },
}
