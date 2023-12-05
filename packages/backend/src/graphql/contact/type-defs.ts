export default `#graphql
  type Contact {
    id: Int
    name: String
    phone: String
    image: String

    createdAt: String
    updatedAt: String

    users: [User]
    stages: [Stage]
    projects: [Project]
  }

  type Query {
    userContacts: [Contact]
    contact(id: ID): Contact
  }

  type Mutation {
    createContact(name: String!, phone: String!, image: Upload): Contact
    updateContact(id: ID!, name: String, phone: String, image: Upload): Contact
    deleteContact(id: ID!): Contact
  }
`
