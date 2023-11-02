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
    responsibleId: Int

    createdAt: String
    updatedAt: String

    state: ProjectState
    area: Area
    stages: [Stage]
    responsible: User
  }

  type Query {
    projects: [Project]
    project(id: ID): Project
  }
`
