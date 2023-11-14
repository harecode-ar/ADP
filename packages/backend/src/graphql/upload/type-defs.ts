export default `#graphql
  scalar Upload

  type File {
    filename: String!
  }

  ## EXAMPLES
  # type Mutation {
  #   uploadFile(file: Upload!): File!
  #   uploadFiles(files: [Upload!]!): [File!]!
  # }
`
