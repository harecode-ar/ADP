export default `#graphql
  type User {
    id: Int
    firstname: String
    lastname: String
    email: String
    telephone: String
    password: String
    roleId: ID

    role: Role
    fullname: String

    createdAt: String
    updatedAt: String
  }

  type Query {
    user(id: Int!): User
    users: [User]
  }

  type Mutation {
    createUser(
      firstname: String!
      lastname: String!
      email: String!
      telephone: String!
      password: String!
      roleId: Int
    ): User

    updateUser(
      id: Int!
      firstname: String!
      lastname: String!
      email: String!
      telephone: String!
      password: String!
      roleId: Int
    ): User
    deleteUser(id: Int!): User
    forgotPassword(email: String!): Boolean
    newPassword(token: String!, email: String!, password: String!): Boolean
  }
`
