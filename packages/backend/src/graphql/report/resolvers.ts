import type { IProjectCountByState } from '@adp/shared'
import { PROJECT_STATE } from '@adp/shared'
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
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.NEW} THEN 1 END) AS new,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.IN_PROGRESS} THEN 1 END) AS inProgress,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.COMPLETED} THEN 1 END) AS completed,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.CANCELLED} THEN 1 END) AS cancelled
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
            SUM(CASE WHEN stateId = ${PROJECT_STATE.NEW} THEN cost END) AS new,
            SUM(CASE WHEN stateId = ${PROJECT_STATE.IN_PROGRESS} THEN cost END) AS inProgress,
            SUM(CASE WHEN stateId = ${PROJECT_STATE.COMPLETED} THEN cost END) AS completed,
            SUM(CASE WHEN stateId = ${PROJECT_STATE.CANCELLED} THEN cost END) AS cancelled
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
  },
}
