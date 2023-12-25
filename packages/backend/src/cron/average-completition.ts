import cron from 'node-cron'
import { Project, Stage } from '../database/models'
import { getAcp } from '../utils/average-completition'

// Run every 24 hours
cron.schedule('0 0 * * *', async () => {
  const [projects, stages] = await Promise.all([
    Project.findAll({
      attributes: ['id', 'startDate', 'endDate', 'finishedAt'],
    }),
    Stage.findAll({
      attributes: ['id', 'startDate', 'endDate', 'finishedAt'],
    }),
  ])

  await Promise.all([
    ...projects.map((project) => {
      const { acp, pacp } = getAcp(project)
      project.acp = acp
      project.pacp = pacp
      return project.save()
    }),
    ...stages.map((stage) => {
      const { acp, pacp } = getAcp(stage)
      stage.acp = acp
      stage.pacp = pacp
      return stage.save()
    }),
  ])
})
