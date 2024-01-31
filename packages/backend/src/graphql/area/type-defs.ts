export default `#graphql
  type Area {
    id: Int
    name: String
    rolename: String
    description: String
    multiple: Boolean
    parentId: Int
    responsibleId: Int

    createdAt: String
    updatedAt: String
    deletedAt: String

    parent: Area
    children: [Area]
    responsible: User
    staff: [User]
    projects: [Project]
    averageCompletition: AreaAverageCompletition
  }

  type Query {
    area(id: Int!): Area
    areas: [Area]
    areasForDashboard: [Area]
    areasForReport: [Area]
    userAreasForSelect: [Area]
    areaTree(areaId: Int!): [Area]
    directAreaDescendants(areaId: Int!): [Area]
  }

  type Mutation {
    createArea(
      name: String!
      rolename: String!
      description: String!
      multiple: Boolean!
      parentId: Int
      responsibleId: Int
    ): Area

    updateArea(
      id: Int!
      name: String
      rolename: String
      description: String
      multiple: Boolean
      parentId: Int
      responsibleId: Int
    ): Area

    deleteArea(id: Int!): Area
  }
`
