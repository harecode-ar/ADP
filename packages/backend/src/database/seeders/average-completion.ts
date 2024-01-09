import { Area, AreaAverageCompletition, Project, Stage } from '../models'
import { getAcp } from '../../utils/average-completition'
import { sequelize } from '..'

export const calculateAcp = async () => {
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

  const areas = await Area.findAll({ attributes: ['id'] })

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
}
