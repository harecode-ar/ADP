import { IProject, IProjectNote } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_PROJECT_NOTES } from 'src/graphql/queries'
import NotesForm from './notes-form'
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
    return data.projectNotes || []
  }, [data])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <NotesForm project={project} refetch={refetch} />
      {notes.length === 0 ? (
        <Box style={{ textAlign: 'center', padding: '20px' }}>
          <p>No hay notas</p>
        </Box>
      ) : (
        notes.map((note) => <NoteItem key={note.id} note={note} refetch={refetch} />)
      )}
    </Box>
  )
}
