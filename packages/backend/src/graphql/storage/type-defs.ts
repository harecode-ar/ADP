export default `#graphql
  type Storage {
    occupiedStorageSize: Int
    storageSize: Int
    freeStorageSize: Int
  }

  type Query {
    storage: Storage
  }
`
