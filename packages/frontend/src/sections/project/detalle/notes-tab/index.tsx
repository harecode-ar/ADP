import { IProject, IProjectNote } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { GET_PROJECT_NOTES } from 'src/graphql/queries'
import NoteItem from 'src/sections/shared/note-item'
import PostCommentForm from './notes-form'
import ModalDelete from './modal-delete'

type TProps = {
  project: IProject
}

export default function NotesTab(props: TProps) {
  const { project } = props
  const [selectedNote, setSelectedNote] = React.useState<number | null>(null)
  const modalDelete = useBoolean()

  const { data, refetch } = useQuery(GET_PROJECT_NOTES, {
    variables: { projectId: Number(project.id) },
    skip: !project,
  })

  const notes: IProjectNote[] = useMemo(() => {
    if (!data) return []
    return data.projectNotes || []
  }, [data])

  const onDelete = (id: number) => {
    modalDelete.onTrue()
    setSelectedNote(id)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <PostCommentForm project={project} refetch={refetch} />
      {notes.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            color: 'text.disabled',
          }}
        >
          No hay notas
        </Box>
      ) : (
        notes.map((note) => <NoteItem key={note.id} note={note} onDelete={onDelete} />)
      )}
      {!!selectedNote && modalDelete.value && (
        <ModalDelete modal={modalDelete} refetch={refetch} noteId={selectedNote} />
      )}
    </Box>
  )
}
