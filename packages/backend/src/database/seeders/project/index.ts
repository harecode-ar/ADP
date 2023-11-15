import { Project } from '../../models'
import { PROJECTS } from './data'

export const projectSeed = async (context: { transaction: any }) => {
  const { transaction } = context
  return Project.bulkCreate(PROJECTS, { transaction })
}
