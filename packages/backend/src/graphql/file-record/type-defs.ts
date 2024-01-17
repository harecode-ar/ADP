export default `#graphql
  type FileRecord {
    id: Int
    originalName: String
    filename: String
    mimeType: String
    size: Int
    userId: Int

    createdAt: String
    updatedAt: String
    deletedAt: String

    user: User
  }
`
