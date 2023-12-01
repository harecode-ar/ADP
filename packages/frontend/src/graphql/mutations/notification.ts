import { gql } from '@apollo/client'

export const READ_NOTIFICATIONS = gql`
  mutation readNotifications($ids: [Int!]!) {
    readNotifications(ids: $ids)
  }
`

export const UNREAD_NOTIFICATIONS = gql`
  mutation unreadNotifications($ids: [Int!]!) {
    unreadNotifications(ids: $ids)
  }
`

export const REMOVE_NOTIFICATIONS = gql`
  mutation removeNotifications($ids: [Int!]!) {
    removeNotifications(ids: $ids)
  }
`
