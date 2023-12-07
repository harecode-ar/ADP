export default `#graphql
  type Check {
    id: Int
    title: String
    checked: Boolean
    checklistId: Int

    createdAt: String
    updatedAt: String

    checklist: Checklist
  }

  type Query {
    checks: [Check]
    check(id: Int!): Check
  }

  type Mutation {
    createCheck(
      title: String!
      checked: Boolean
      checklistId: Int!
    ): Check

    updateCheck(
      id: Int!
      title: String
      checked: Boolean
      checklistId: Int
    ): Check

    deleteCheck(id: Int!): Check
  }
`
