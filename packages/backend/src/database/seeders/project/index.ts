import { Project } from '../../models'
import projects from './data'

export const projectSeed = async (context: { transaction: any }) => {
  const { transaction } = context
  return Project.bulkCreate(projects, { transaction })
}
