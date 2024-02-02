import { gql } from '@apollo/client'

export const CALCULATE_ACP_CRON = gql`
  query calculateAcpCron {
    calculateAcpCron
  }
`

export const GENERATE_ACP_NOTIFICATION_CRON = gql`
  query generateAcpNotificationCron {
    generateAcpNotificationCron
  }
`

export const REMOVE_UNUSED_CONTACTS_CRON = gql`
  query removeUnusedContactsCron {
    removeUnusedContactsCron
  }
`

export const REMOVE_UNUSED_NOTIFICATIONS_CRON = gql`
  query removeUnusedNotificationsCron {
    removeUnusedNotificationsCron
  }
`

export const SET_TASK_STATE_CRON = gql`
  query setTaskStateCron {
    setTaskStateCron
  }
`
