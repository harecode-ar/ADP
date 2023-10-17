export default `#graphql
  type Role {
    id: Int
    name: String

    permissions: [Permission]
  }

  type Query {
    roles: [Role]
    role(id: Int, name: String): Role
  }
`
