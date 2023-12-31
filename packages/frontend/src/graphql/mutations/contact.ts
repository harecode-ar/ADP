import { gql } from '@apollo/client'

export const CREATE_CONTACT = gql`
  mutation createContact($name: String!, $phone: String!, $email: String, $image: Upload) {
    createContact(name: $name, phone: $phone, email: $email, image: $image) {
      id
    }
  }
`

export const CREATE_STAGE_CONTACT = gql`
  mutation createStageContact(
    $stageId: Int!
    $name: String!
    $phone: String!
    $email: String
    $image: Upload
  ) {
    createStageContact(
      stageId: $stageId
      name: $name
      phone: $phone
      email: $email
      image: $image
    ) {
      id
    }
  }
`

export const CREATE_PROJECT_CONTACT = gql`
  mutation createProjectContact(
    $projectId: Int!
    $name: String!
    $phone: String!
    $email: String
    $image: Upload
  ) {
    createProjectContact(
      projectId: $projectId
      name: $name
      phone: $phone
      email: $email
      image: $image
    ) {
      id
    }
  }
`

export const UPDATE_CONTACT = gql`
  mutation updateContact($id: ID!, $name: String, $phone: String, $email: String, $image: Upload) {
    updateContact(id: $id, name: $name, phone: $phone, email: $email, image: $image) {
      id
    }
  }
`

export const DELETE_USER_CONTACT = gql`
  mutation deleteUserContact($id: ID!) {
    deleteUserContact(id: $id)
  }
`

export const DELETE_STAGE_CONTACT = gql`
  mutation deleteStageContact($id: Int!, $stageId: Int!) {
    deleteStageContact(id: $id, stageId: $stageId)
  }
`

export const DELETE_PROJECT_CONTACT = gql`
  mutation deleteProjectContact($id: Int!, $projectId: Int!) {
    deleteProjectContact(id: $id, projectId: $projectId)
  }
`

export const IMPORT_PROJECT_CONTACTS = gql`
  mutation importProjectContacts($projectId: Int!, $contacts: [Int!]!) {
    importProjectContacts(projectId: $projectId, contacts: $contacts)
  }
`

export const IMPORT_STAGE_CONTACTS = gql`
  mutation importStageContacts($stageId: Int!, $contacts: [Int!]!) {
    importStageContacts(stageId: $stageId, contacts: $contacts)
  }
`

export const IMPORT_USER_CONTACTS_TO_PROJECT = gql`
  mutation importUserContactsToProject($projectId: Int!, $contacts: [Int!]!) {
    importUserContactsToProject(projectId: $projectId, contacts: $contacts)
  }
`

export const IMPORT_USER_CONTACTS_TO_STAGE = gql`
  mutation importUserContactsToStage($stageId: Int!, $contacts: [Int!]!) {
    importUserContactsToStage(stageId: $stageId, contacts: $contacts)
  }
`
