import type { IProjectCountByState } from '@adp/shared'
import { TASK_STATE } from '@adp/shared'
import { QueryTypes } from 'sequelize'
import logger from '../../logger'
import { sequelize } from '../../database'
import { TABLES } from '../../constants'

export default {
  Query: {
    projectCountByState: async (
      _: any,
      args: {
        areas: number[]
        startDate?: string
        endDate?: string
      }
    ): Promise<IProjectCountByState> => {
      try {
        const { areas, startDate, endDate } = args

        const startDateFilter = startDate ? `AND startDate >= '${startDate}'` : ''
        const endDateFilter = endDate ? `AND endDate <= '${endDate}'` : ''

        const query = `
          SELECT
            COUNT(CASE WHEN stateId = ${TASK_STATE.NEW} THEN 1 END) AS new,
            COUNT(CASE WHEN stateId = ${TASK_STATE.ON_HOLD} THEN 1 END) AS onHold,
            COUNT(CASE WHEN stateId = ${TASK_STATE.IN_PROGRESS} THEN 1 END) AS inProgress,
            COUNT(CASE WHEN stateId = ${TASK_STATE.COMPLETED} THEN 1 END) AS completed,
            COUNT(CASE WHEN stateId = ${TASK_STATE.CANCELLED} THEN 1 END) AS cancelled
          FROM ${TABLES.PROJECT}
          WHERE areaId IN (${areas.join(', ')}) ${startDateFilter} ${endDateFilter}
        `

        const result = await sequelize.query(query, {
          type: QueryTypes.SELECT,
        })
        // @ts-ignore
        return result[0] as IProjectCountByState
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projectCostByState: async (
      _: any,
      args: {
        areas: number[]
        startDate?: string
        endDate?: string
      }
    ): Promise<IProjectCountByState> => {
      try {
        const { areas, startDate, endDate } = args

        const startDateFilter = startDate ? `AND startDate >= '${startDate}'` : ''
        const endDateFilter = endDate ? `AND endDate <= '${endDate}'` : ''

        const query = `
          SELECT
            SUM(CASE WHEN stateId = ${TASK_STATE.NEW} THEN cost END) AS new,
            SUM(CASE WHEN stateId = ${TASK_STATE.ON_HOLD} THEN cost END) AS onHold,
            SUM(CASE WHEN stateId = ${TASK_STATE.IN_PROGRESS} THEN cost END) AS inProgress,
            SUM(CASE WHEN stateId = ${TASK_STATE.COMPLETED} THEN cost END) AS completed,
            SUM(CASE WHEN stateId = ${TASK_STATE.CANCELLED} THEN cost END) AS cancelled
          FROM ${TABLES.PROJECT}
          WHERE areaId IN (${areas.join(', ')}) ${startDateFilter} ${endDateFilter}
        `

        const result = await sequelize.query(query, {
          type: QueryTypes.SELECT,
        })
        // @ts-ignore
        return result[0] as IProjectCountByState
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projectMinMaxDate: async (): Promise<{ minDate: string; maxDate: string }> => {
      try {
        const query = `
          SELECT
            MIN(startDate) AS minDate,
            MAX(endDate) AS maxDate
          FROM ${TABLES.PROJECT}
        `

        const result = await sequelize.query(query, {
          type: QueryTypes.SELECT,
        })
        // @ts-ignore
        return result[0]
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
