export default `#graphql
  type Checklist {
    id: Int
    title: String
    userId: Int
    stageId: Int
    projectId: Int

    createdAt: String
    updatedAt: String

    checks: [Check]
    user: User
    stage: Stage
    project: Project
  }

  type Query {
    checklists(userId: Int, projectId: Int, stageId: Int): [Checklist]
    checklist(id: Int!): Checklist
  }

  type Mutation {
    createChecklist(
      title: String!
      userId: Int!
      stageId: Int
      projectId: Int
    ): Checklist

    updateChecklist(
      id: Int!
      title: String
      userId: Int
      stageId: Int
      projectId: Int
    ): Checklist

    deleteChecklist(id: Int!): Checklist
  }
`