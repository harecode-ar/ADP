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

  input CheckInput {
    title: String!
    checked: Boolean!
  }

  type Query {
    checklist(id: Int!): Checklist
    userChecklists: [Checklist]
    projectChecklists(projectId: Int!): [Checklist]
    stageChecklists(stageId: Int!): [Checklist]
  }

  type Mutation {
    createChecklist(
      title: String!
      stageId: Int
      projectId: Int
      checks: [CheckInput]
    ): Checklist

    updateChecklist(
      id: Int!
      title: String
      stageId: Int
      projectId: Int
      checks: [CheckInput]
    ): Checklist

    deleteChecklist(id: Int!): Checklist
  }
`
