export default `#graphql
  type Stage {
    id: Int
    name: String
    description: String
    cost: String
    startDate: String
    endDate: String
    progress: Int
    stateId: Int
    areaId: Int
    projectId: Int
    parentStageId: Int

    createdAt: String
    updatedAt: String

    state: StageState
    area: Area
    parentStage: Stage
    childStages: [Stage]
    project: Project
  }

  type Query {
    stages: [Stage]
    stage(id: ID): Stage
  }
`
