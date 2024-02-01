export default `#graphql
  type User {
    id: Int
    firstname: String
    lastname: String
    email: String
    telephone: String
    image: String
    roleId: Int

    role: Role
    fullname: String
    averageCompletition: UserAverageCompletition

    createdAt: String
    updatedAt: String
  }

  type Query {
    user(id: Int!): User
    users: [User]
    usersForReport: [User]
    countUserAssignations: Int
  }

  type Mutation {
    createUser(
      firstname: String!
      lastname: String!
      email: String!
      telephone: String
      roleId: Int!
      image: Upload
    ): User

    updateUser(
      id: Int!
      firstname: String!
      lastname: String!
      email: String!
      telephone: String
      roleId: Int!
      image: Upload
    ): User
    deleteUser(id: Int!): User
    forgotPassword(email: String!): Boolean
    newPassword(token: String!, email: String!, password: String!): Boolean
    changePassword(email: String!, newPassword: String!, oldPassword: String!): Boolean
  }
`
