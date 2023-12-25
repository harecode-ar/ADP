import cron from 'node-cron'
import { sequelize } from '../database'
import {
  Project,
  Stage,
  User,
  UserFinishedProject,
  UserFinishedStage,
  UserAverageCompletition,
  Area,
  AreaAverageCompletition,
} from '../database/models'
import { getAcp } from '../utils/average-completition'

// Run every 24 hours
cron.schedule('0 0 * * *', async () => {
  // Run every 1 minute
  // cron.schedule('*/1 * * * *', async () => {
  console.log('Running average completition cron job')
  const [projects, stages] = await Promise.all([
    Project.findAll({
      attributes: ['id', 'startDate', 'endDate', 'finishedAt'],
    }),
    Stage.findAll({
      attributes: ['id', 'startDate', 'endDate', 'finishedAt'],
    }),
  ])

  console.log('projects, stages')

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

  console.log('projects, stages saved')

  const [users, areas] = await Promise.all([
    User.findAll({
      attributes: ['id'],
      include: [
        {
          model: UserFinishedProject,
          as: 'finishedProjects',
          attributes: ['projectId'],
        },
        {
          model: UserFinishedStage,
          as: 'finishedStages',
          attributes: ['stageId'],
        },
      ],
    }),
    Area.findAll({ attributes: ['id'] }),
  ])

  console.log('users, areas')

  await Promise.all(
    users.map(async (user) => {
      // @ts-ignore
      const { id, finishedProjects, finishedStages } = user
      console.log('finishedProjects', finishedProjects.length)
      console.log('finishedStages', finishedStages.length)
      const projectIds = finishedProjects.map((project: UserFinishedProject) => project.projectId)
      const stageIds = finishedStages.map((stage: UserFinishedStage) => stage.stageId)

      if (!projectIds.length && !stageIds.length) {
        return
      }

      const [projectResult, stageResult] = await Promise.all([
        sequelize.query(`
        SELECT COUNT(*) as count, SUM(acp) as acp, SUM(pacp) as pacp FROM projects WHERE id IN (${projectIds.join(
          ','
        )})
      `),
        sequelize.query(`
        SELECT COUNT(*) as count, SUM(acp) as acp, SUM(pacp) as pacp FROM stages WHERE id IN (${stageIds.join(
          ','
        )})
      `),
      ])
      // @ts-ignore
      const { count: projectCount, acp: projectAcp, pacp: projectPacp } = projectResult[0][0]
      // @ts-ignore
      const { count: stageCount, acp: stageAcp, pacp: stagePacp } = stageResult[0][0]

      const [uac, wasCreated] = await UserAverageCompletition.findOrCreate({
        where: { userId: id },
        defaults: {
          userId: id,
          projectAcp: projectCount ? projectAcp / projectCount : null,
          projectPacp: projectCount ? projectPacp / projectCount : null,
          stageAcp: stageCount ? stageAcp / stageCount : null,
          stagePacp: stageCount ? stagePacp / stageCount : null,
        },
      })

      if (!wasCreated) {
        uac.projectAcp = projectCount ? projectAcp / projectCount : null
        uac.projectPacp = projectCount ? projectPacp / projectCount : null
        uac.stageAcp = stageCount ? stageAcp / stageCount : null
        uac.stagePacp = stageCount ? stagePacp / stageCount : null
        await uac.save()
      }
    })
  )

  console.log('users saved')

  await Promise.all(
    areas.map(async (area) => {
      const { id } = area
      const [projectResult, stageResult] = await Promise.all([
        sequelize.query(`
          SELECT COUNT(*) as count, SUM(acp) as acp, SUM(pacp) as pacp FROM projects WHERE areaId = ${id}
        `),
        sequelize.query(`
          SELECT COUNT(*) as count, SUM(acp) as acp, SUM(pacp) as pacp FROM stages WHERE areaId = ${id}
        `),
      ])
      // @ts-ignore
      const { count: projectCount, acp: projectAcp, pacp: projectPacp } = projectResult[0][0]
      // @ts-ignore
      const { count: stageCount, acp: stageAcp, pacp: stagePacp } = stageResult[0][0]

      const [aac, wasCreated] = await AreaAverageCompletition.findOrCreate({
        where: { areaId: id },
        defaults: {
          areaId: id,
          projectAcp: projectCount ? projectAcp / projectCount : null,
          projectPacp: projectCount ? projectPacp / projectCount : null,
          stageAcp: stageCount ? stageAcp / stageCount : null,
          stagePacp: stageCount ? stagePacp / stageCount : null,
        },
      })

      if (!wasCreated) {
        aac.projectAcp = projectCount ? projectAcp / projectCount : null
        aac.projectPacp = projectCount ? projectPacp / projectCount : null
        aac.stageAcp = stageCount ? stagePacp / stageCount : null
        aac.stagePacp = stageCount ? stagePacp / stageCount : null
        await aac.save()
      }
    })
  )

  console.log('areas saved')

  console.log('Finished average completition cron job')
})
