export default `#graphql
  type Area {
    id: Int
    name: String
    rolename: String
    description: String
    color: String
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

  }

  type Query {
    area(id: Int!): Area
    areas: [Area]
  }

  type Mutation {
    createArea(
      name: String!
      rolename: String!
      description: String!
      color: String!
      multiple: Boolean!
      parentId: Int
      responsibleId: Int
    ): Area

    updateArea(
      id: Int!
      name: String
      rolename: String
      description: String
      color: String!
      multiple: Boolean
      parentId: Int
      responsibleId: Int
    ): Area

    deleteArea(id: Int!): Area
  }
`
