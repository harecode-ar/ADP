import type { IProjectCountByState } from '@adp/shared'
import { PROJECT_STATE } from '@adp/shared'
import { QueryTypes } from 'sequelize'
import logger from '../../logger'
import { sequelize } from '../../database'

export default {
  Query: {
    projectAreaReport: async (
      _: any,
      args: {
        areaId: number
      }
    ): Promise<IProjectCountByState> => {
      try {
        const { areaId } = args

        const query = `
          SELECT
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.NEW} THEN 1 END) AS new,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.IN_PROGRESS} THEN 1 END) AS inProgress,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.COMPLETED} THEN 1 END) AS completed,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.CANCELLED} THEN 1 END) AS cancelled
          FROM projects
          WHERE areaId = ${areaId}
        `

        const result = await sequelize.query(query, {
          type: QueryTypes.SELECT,
        })
        return result[0] as IProjectCountByState
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projectCountByState: async (
      _: any,
      args: {
        areas: number[]
      }
    ): Promise<IProjectCountByState> => {
      try {
        const { areas } = args

        const query = `
          SELECT
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.NEW} THEN 1 END) AS new,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.IN_PROGRESS} THEN 1 END) AS inProgress,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.COMPLETED} THEN 1 END) AS completed,
            COUNT(CASE WHEN stateId = ${PROJECT_STATE.CANCELLED} THEN 1 END) AS cancelled
          FROM projects
          WHERE areaId IN (${areas.join(', ')})
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
