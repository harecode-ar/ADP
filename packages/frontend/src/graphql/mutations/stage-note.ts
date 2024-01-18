import { gql } from '@apollo/client'

export const CREATE_STAGE_NOTE = gql`
  mutation createStageNote($message: String!, $stageId: Int!, $files: [Upload]) {
    createStageNote(message: $message, stageId: $stageId, files: $files) {
      id
    }
  }
`
export const DELETE_STAGE_NOTE = gql`
  mutation deleteStageNote($id: Int!) {
    deleteStageNote(id: $id) {
      id
    }
  }
`
