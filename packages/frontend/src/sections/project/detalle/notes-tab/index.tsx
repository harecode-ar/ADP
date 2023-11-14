import { IProject, IProjectNote } from '@adp/shared'
import React, { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECT_NOTES } from 'src/graphql/queries'
import PostCommentForm from './notes-form'
import NoteItem from './note-item'

type TProps = {
  project: IProject
}

export default function NotesTab(props: TProps) {
  const { project } = props
  const { data, refetch } = useQuery(GET_PROJECT_NOTES, {
    variables: { projectId: Number(project.id) },
    skip: !project,
  })

  const notes: IProjectNote[] = useMemo(() => {
    if (!data) return []
    return data.projectNotes
  }, [data])

  return (
    <React.Fragment>
      <PostCommentForm project={project} refetch={refetch} />
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} refetch={refetch} />
      ))}
    </React.Fragment>
  )
}
