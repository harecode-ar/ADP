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
    checklist(id: Int!): Checklist
    userChecklists: [Checklist]
    checklistByProject(projectId: Int!): [Checklist]
    checklistByStage(stageId: Int!): [Checklist]
  }

  type Mutation {
    createChecklist(
      title: String!
      stageId: Int
      projectId: Int
    ): Checklist

    updateChecklist(
      id: Int!
      title: String
      stageId: Int
      projectId: Int
    ): Checklist

    deleteChecklist(id: Int!): Checklist
  }
`
