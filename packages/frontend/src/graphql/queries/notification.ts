import { gql } from '@apollo/client'

export const GET_NOTIFICATIONS = gql`
  query getNotificatios {
    notifications {
      id
      title
      category
      createdAt
      read
    }
  }
`
