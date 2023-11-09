import { PERMISSION_MAP, STAGE_STATE } from '@adp/shared'
import type { IStage } from '@adp/shared/types'
import { Stage, Project } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {
    stages: (
      _: any,
      __: any,
      context: IContext
    ): Promise<Omit<IStage, 'state' | 'area' | 'parentStage' | 'childStages' | 'project'>[]> => {
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
      'state' | 'area' | 'parentStage' | 'childStages' | 'project'
    > | null> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        return Stage.findByPk(args.id)
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
    ): Promise<Omit<IStage, 'state' | 'area' | 'project' | 'parentStage' | 'childStages'>> => {
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

        return await Stage.create({
          name,
          description,
          startDate,
          endDate,
          stateId: state,
          areaId,
          projectId,
          parentStageId,
        })
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
        | 'stateId'
        | 'progress'
        | 'areaId'
        | 'projectId'
        | 'parentStageId'
      >,
      context: IContext
    ): Promise<Omit<IStage, 'state' | 'area' | 'project' | 'parentStage' | 'childStages'>> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const {
          id,
          name,
          description,
          startDate,
          endDate,
          stateId,
          progress,
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
          stateId,
          progress,
          areaId,
          parentStageId,
        })
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
    ): Promise<Omit<IStage, 'state' | 'area' | 'project' | 'parentStage' | 'childStages'>> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        const stage = await Stage.findByPk(args.id)
        if (!stage) {
          throw new Error('Stage not found')
        }
        await stage.destroy()
        return stage
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
