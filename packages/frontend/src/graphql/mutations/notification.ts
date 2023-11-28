import { gql } from '@apollo/client'

export const READ_NOTIFICATION = gql`
  mutation readNotification($id: Int!) {
    readNotification(id: $id)
  }
`

export const READ_ALL_NOTIFICATIONS = gql`
  mutation readAllNotifications {
    readAllNotifications
  }
`
