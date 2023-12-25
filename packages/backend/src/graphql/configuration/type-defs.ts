export default `#graphql
  type Configuration {
    id: Int
    key: String
    value: String

    createdAt: String
    updatedAt: String
  }

  input ConfigurationInput {
    key: String
    value: String
  }

  type Query {
    configurations: [Configuration]
  }

  type Mutation {
    updateConfigurations(input: [ConfigurationInput!]!): [Configuration]
  }
`
