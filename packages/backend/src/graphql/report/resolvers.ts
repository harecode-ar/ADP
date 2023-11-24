import type { IProjectAreaReport } from '@adp/shared/types'
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
    ): Promise<IProjectAreaReport> => {
      try {
        const { areaId } = args

        const query = `
          SELECT
            COUNT(CASE WHEN stateId = 1 THEN 1 END) AS new,
            COUNT(CASE WHEN stateId = 2 THEN 1 END) AS inProgress,
            COUNT(CASE WHEN stateId = 3 THEN 1 END) AS completed,
            COUNT(CASE WHEN stateId = 4 THEN 1 END) AS cancelled
          FROM projects
          WHERE areaId = ${areaId}
        `

        const result = await sequelize.query(query, {
          type: QueryTypes.SELECT,
        })
        return result[0] as IProjectAreaReport
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
