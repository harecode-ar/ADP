import { gql } from '@apollo/client'

export const GET_STORAGE = gql`
  query storage {
    storage {
      occupiedStorageSize
      storageSize
      freeStorageSize
    }
  }
`
