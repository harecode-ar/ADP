import { PERMISSION_MAP, TASK_STATE } from '@adp/shared'
import type { IStage, IUser, ITaskState, IArea, IProject } from '@adp/shared'
import { Op } from 'sequelize'
import {
  Stage,
  Project,
  TaskState,
  Area,
  User,
  StageNote,
  UserFinishedStage,
} from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import { calculateProjectProgress } from '../../database/jobs/project'
import type { IContext } from '../types'
import { calculateStageProgress } from '../../database/jobs'
import { getAcp } from '../../utils/average-completition'

export default {
  Stage: {
    state: (stage: IStage): Promise<ITaskState | null> => {
      if (stage.state) return Promise.resolve(stage.state)
      return TaskState.findByPk(stage.stateId)
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
              model: TaskState,
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
              model: TaskState,
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
              model: TaskState,
              as: 'state',
            },
          ],
          order: [
            ['startDate', 'ASC'],
            ['createdAt', 'ASC'],
          ],
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
              model: TaskState,
              as: 'state',
            },
          ],
          order: [
            ['startDate', 'ASC'],
            ['createdAt', 'ASC'],
          ],
        }) as unknown as Promise<Omit<IStage, 'parentStage' | 'childStages' | 'project'>[]>
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userStages: async (
      _: any,
      args: {
        stateId: number[]
      },
      context: IContext
    ) => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const where = { parentStageId: null }
        if (args.stateId) {
          // @ts-ignore
          where.stateId = {
            [Op.in]: args.stateId,
          }
        }
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
                  order: [
                    ['stateId', 'DESC'],
                    ['startDate', 'ASC'],
                  ],
                  where,
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
        const stages: Stage[] = areas.flatMap((area: Area) => area.stages)
        return stages
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    userSubStages: async (
      _: any,
      args: {
        stateId: number[]
      },
      context: IContext
    ) => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const where = { parentStageId: { [Op.ne]: null } }
        if (args.stateId) {
          // @ts-ignore
          where.stateId = {
            [Op.in]: args.stateId,
          }
        }
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
                  order: [
                    ['stateId', 'DESC'],
                    ['startDate', 'ASC'],
                  ],
                  where,
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
        const subStages: Stage[] = areas.flatMap((area: Area) => area.stages)
        return subStages
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    stageAssignedToUser: async (
      _: any,
      args: Pick<IStage, 'id'>,
      context: IContext
    ): Promise<boolean> => {
      try {
        const { user, areas } = context
        if (!user) throw new Error('Usuario no encontrado')
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        const foundStage = await Stage.findOne({
          where: { id: args.id, areaId: { [Op.in]: areas ? areas.map((area) => area.id) : [] } },
        })
        if (!foundStage) throw new Error('Etapa no encontrada')
        return true
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

        const today = new Date(new Date().getTime() - 1000 * 60 * 60 * 3).toISOString().slice(0, 10)
        const start = new Date(startDate).toISOString().slice(0, 10)
        const end = new Date(endDate).toISOString().slice(0, 10)
        if (start > end)
          throw new Error('La fecha de finalizacion debe ser mayor a la fecha de inicio')

        const project = await Project.findByPk(projectId)
        if (!project) throw new Error('Proyecto no encontrado')

        if (project.stateId === TASK_STATE.COMPLETED || project.stateId === TASK_STATE.CANCELLED) {
          throw new Error('No se puede crear etapas en un proyecto finalizado')
        }

        const projectStart = new Date(project.startDate).toISOString().slice(0, 10)
        const projectEnd = new Date(project.endDate).toISOString().slice(0, 10)
        if (start < projectStart || end > projectEnd) throw new Error('Fecha fuera de rango')

        const stateId = today >= start ? TASK_STATE.ON_HOLD : TASK_STATE.NEW

        const { acp, pacp } = getAcp({ startDate, endDate, finishedAt: null })
        const stageCreated = await Stage.create({
          name,
          description,
          startDate,
          endDate,
          stateId,
          areaId,
          projectId,
          parentStageId,
          acp,
          pacp,
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
          throw new Error('Etapa no encontrada')
        }

        if (stage.stateId === TASK_STATE.COMPLETED) {
          throw new Error('No se puede modificar una etapa finalizada')
        }

        const project = await Project.findByPk(projectId)
        if (!project) throw new Error('Proyecto no encontrado')

        if (startDate) {
          const previousStageEnd = stage.endDate
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
          const previousStageStart = stage.startDate
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

        // if startDate is diferent from previous startDate and stateId is New or On_hold then if startDate is before today, set state to new
        let { stateId } = stage
        if (
          startDate &&
          startDate !== stage.startDate &&
          (stage.stateId === TASK_STATE.NEW || stage.stateId === TASK_STATE.ON_HOLD)
        ) {
          const today = new Date(new Date().getTime() - 1000 * 60 * 60 * 3)
            .toISOString()
            .slice(0, 10)
          stateId = today >= startDate ? TASK_STATE.ON_HOLD : TASK_STATE.NEW
        }

        const { acp, pacp } = getAcp({ startDate, endDate, finishedAt: stage.finishedAt })
        await stage.update({
          name,
          description,
          startDate,
          endDate,
          hasStages,
          areaId,
          parentStageId,
          acp,
          pacp,
          stateId,
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
          throw new Error('Etapa no encontrada')
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

    finishStage: async (_: any, args: Pick<IStage, 'id'>, context: IContext): Promise<Stage> => {
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
              [Op.eq]: TASK_STATE.IN_PROGRESS,
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
            {
              model: Stage,
              as: 'childStages',
              attributes: ['stateId'],
            },
          ],
        })
        if (!stage) {
          throw new Error('Etapa no encontrada')
        }

        // @ts-ignore
        const { childStages = [] } = stage
        // @ts-ignore
        const allSubStagesFinished = childStages.every(
          (subStage: Stage) =>
            subStage.stateId === TASK_STATE.COMPLETED || subStage.stateId === TASK_STATE.CANCELLED
        )

        if (!allSubStagesFinished) {
          throw new Error('No se puede finalizar la etapa porque tiene subetapas sin finalizar.')
        }

        // @ts-ignore
        if (stage.area && stage.area.responsible) {
          // @ts-ignore
          userId = stage.area.responsible.id
        }

        const finishedAt = new Date().toISOString().split('T')[0]
        const { acp, pacp } = getAcp({
          startDate: stage.startDate,
          endDate: stage.endDate,
          finishedAt,
        })
        await stage.update({
          stateId: TASK_STATE.COMPLETED,
          progress: 1,
          finishedAt,
          acp,
          pacp,
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

        const today = new Date(new Date().getTime() - 1000 * 60 * 60 * 3).toISOString().slice(0, 10)
        const start = new Date(startDate).toISOString().slice(0, 10)
        const end = new Date(endDate).toISOString().slice(0, 10)
        if (start > end)
          throw new Error('La fecha de finalizacion debe ser mayor a la fecha de inicio')

        const parentStage = await Stage.findByPk(parentStageId)
        if (!parentStage) throw new Error('Etapa padre no encontrada')

        if (
          parentStage.stateId === TASK_STATE.COMPLETED ||
          parentStage.stateId === TASK_STATE.CANCELLED
        ) {
          throw new Error('No se puede crear subetapas en una etapa finalizada')
        }

        const parentStageStart = new Date(parentStage.startDate).toISOString().slice(0, 10)
        const parentStageEnd = new Date(parentStage.endDate).toISOString().slice(0, 10)

        if (start < parentStageStart || end > parentStageEnd)
          throw new Error('Fechas fuera de rango')

        const stateId = today >= start ? TASK_STATE.ON_HOLD : TASK_STATE.NEW

        const { acp, pacp } = getAcp({ startDate, endDate, finishedAt: null })
        const stageCreated = await Stage.create({
          name,
          description,
          startDate,
          endDate,
          stateId,
          areaId,
          projectId: parentStage.projectId,
          parentStageId,
          acp,
          pacp,
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

        if (subStage.stateId === TASK_STATE.COMPLETED) {
          throw new Error('No se puede actualizar una subetapa finalizada')
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

        // if startDate is diferent from previous startDate and stateId is New or On_hold then if startDate is before today, set state to new
        let { stateId } = subStage
        if (
          startDate &&
          startDate !== subStage.startDate &&
          (subStage.stateId === TASK_STATE.NEW || subStage.stateId === TASK_STATE.ON_HOLD)
        ) {
          const today = new Date(new Date().getTime() - 1000 * 60 * 60 * 3)
            .toISOString()
            .slice(0, 10)
          stateId = today >= startDate ? TASK_STATE.ON_HOLD : TASK_STATE.NEW
        }

        const { acp, pacp } = getAcp({ startDate, endDate, finishedAt: subStage.finishedAt })
        await subStage.update({
          name,
          description,
          startDate,
          endDate,
          areaId,
          parentStageId,
          acp,
          pacp,
          stateId,
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

    finishSubStage: async (_: any, args: Pick<IStage, 'id'>, context: IContext): Promise<Stage> => {
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
              [Op.eq]: TASK_STATE.IN_PROGRESS,
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

        const finishedAt = new Date().toISOString().split('T')[0]
        const { acp, pacp } = getAcp({
          startDate: subStage.startDate,
          endDate: subStage.endDate,
          finishedAt,
        })
        await subStage.update({
          stateId: TASK_STATE.COMPLETED,
          progress: 1,
          finishedAt,
          acp,
          pacp,
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
    },
  },
}
