export default `#graphql
  type Project {
    id: Int
    name: String
    description: String
    cost: Float
    startDate: String
    endDate: String
    finishedAt: String
    progress: Float
    acp: Float
    pacp: Float
    stateId: Int
    areaId: Int

    createdAt: String
    updatedAt: String

    state: TaskState
    area: Area
    stages: [Stage]
    responsible: User
    notes: [ProjectNote]
  }

  type Query {
    projects: [Project]
    project(id: Int!): Project
    projectsByArea(areaId: Int): [Project]
    inProgressProjectsByArea(areaId: Int): [Project]
    projectsByAreaAndState(areaId: Int!, stateId: Int): [Project]
    userProjects(stateId: Int): [Project]
    countProjectsByArea(areaId: Int!): Int
    projectAssignedToUser(id: Int!): Boolean
  }

  type Mutation {
    createProject(
      name: String!
      description: String!
      areaId: Int!
      cost: Float
      startDate: String!
      endDate: String!
    ): Project

    updateProject(
      id: Int!
      name: String
      description: String
      areaId: Int
      cost: Float
      startDate: String
      endDate: String
      progress: Float
    ): Project

    deleteProject(id: Int!): Project

    finishProject(id: Int!): Project
  }
`
