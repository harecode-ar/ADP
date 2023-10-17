export default `#graphql
  type User {
    id: Int
    firstname: String
    lastname: String
    email: String
    password: String
    roleId: ID

    role: Role
    fullname: String

    createdAt: String
    updatedAt: String
  }
`
