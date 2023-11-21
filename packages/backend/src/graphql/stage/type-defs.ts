export default `#graphql
  type Stage {
    id: Int
    name: String
    description: String
    cost: String
    startDate: String
    endDate: String
    progress: Float
    stateId: Int
    areaId: Int
    projectId: Int
    parentStageId: Int

    createdAt: String
    updatedAt: String

    state: StageState
    area: Area
    responsible: User
    parentStage: Stage
    childStages: [Stage]
    project: Project
    notes: [StageNote]
  }

  type Query {
    stages: [Stage]
    stage(id: Int): Stage
    stagesByProject(projectId: Int): [Stage]
  }

  type Mutation {
    createStage(
      name: String!
      description: String!
      startDate: String!
      endDate: String!
      areaId: Int!
      projectId: Int!
      parentStageId: Int
    ): Stage

    updateStage(
      id: Int!
      name: String
      description: String
      startDate: String
      endDate: String
      stateId: Int
      progress: Float
      areaId: Int
      projectId: Int
      parentStageId: Int
    ): Stage

    deleteStage(id: Int!): Stage
  }
`
