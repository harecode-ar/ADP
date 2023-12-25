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
        {
          model: Area,
          as: 'areas',
          attributes: ['id'],
        },
      ],
    }),
    Area.findAll({ attributes: ['id'] }),
  ])

  await Promise.all(
    users.map(async (user) => {
      // @ts-ignore
      const { id, finishedProjects, finishedStages, areas: userAreas } = user
      const projectIds = finishedProjects.map((project: UserFinishedProject) => project.projectId)
      const stageIds = finishedStages.map((stage: UserFinishedStage) => stage.stageId)
      const areaIds = userAreas.map((area: Area) => area.id)

      const [projectResult, stageResult] = await Promise.all([
        sequelize.query(`
        SELECT COUNT(*) as count, SUM(acp) as acp, SUM(pacp) as pacp FROM projects WHERE id IN (${[
          -1,
          ...projectIds,
        ].join(',')}) OR areaId IN (${[-1, ...areaIds].join(',')})
      `),
        sequelize.query(`
        SELECT COUNT(*) as count, SUM(acp) as acp, SUM(pacp) as pacp FROM stages WHERE id IN (${[
          -1,
          ...stageIds,
        ].join(',')}) OR areaId IN (${[-1, ...areaIds].join(',')})
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
          projectAcp: projectCount && projectAcp !== null ? projectAcp / projectCount : null,
          projectPacp: projectCount && projectPacp !== null ? projectPacp / projectCount : null,
          stageAcp: stageCount && stageAcp !== null ? stageAcp / stageCount : null,
          stagePacp: stageCount && stagePacp !== null ? stagePacp / stageCount : null,
        },
      })

      if (!wasCreated) {
        uac.projectAcp = projectCount && projectAcp !== null ? projectAcp / projectCount : null
        uac.projectPacp = projectCount && projectPacp !== null ? projectPacp / projectCount : null
        uac.stageAcp = stageCount && stageAcp !== null ? stageAcp / stageCount : null
        uac.stagePacp = stageCount && stagePacp !== null ? stagePacp / stageCount : null
        await uac.save()
      }
    })
  )

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
})
