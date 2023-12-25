import { IProject } from '@adp/shared'
import cron from 'node-cron'
import { Contact, User, Stage, Project } from '../database/models'

// Run every 24 hours
cron.schedule('0 0 * * *', async () => {
  const projects = (await Project.findAll({
    attributes: ['id', 'startDate', 'endDate', 'finishedAt'],
  })) as unknown as IProject[]
})
