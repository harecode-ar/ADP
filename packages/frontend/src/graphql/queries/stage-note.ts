import { gql } from '@apollo/client'

export const GET_STAGE_NOTES = gql`
  query stageNotes($stageId: Int!) {
    stageNotes(stageId: $stageId) {
      id
      message

      createdAt

      user {
        id
        fullname
        image
      }

      files {
        filename
        originalName
        mimeType
        size
      }
    }
  }
`
