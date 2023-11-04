export default `#graphql
  type Project {
    id: Int
    name: String
    description: String
    cost: String
    startDate: String
    endDate: String
    progress: Int
    stateId: Int
    areaId: Int

    createdAt: String
    updatedAt: String

    state: ProjectState
    area: Area
    stages: [Stage]
    responsible: User
  }

  type Query {
    projects: [Project]
    project(id: Int!): Project
    projectsByArea(areaId: Int): [Project]
  }

  type Mutation {
    createProject(
      name: String!
      description: String!
      areaId: Int!
      cost: String
      startDate: String!
      endDate: String!
    ): Project

    updateProject(
      id: Int!
      name: String
      description: String
      areaId: Int
      cost: String
      startDate: String
      endDate: String
      progress: Int
      stateId: Int
    ): Project

    deleteProject(id: Int!): Project
  }
`
