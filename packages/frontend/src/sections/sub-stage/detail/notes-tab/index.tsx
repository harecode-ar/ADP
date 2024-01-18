import { IStage, IStageNote } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { GET_STAGE_NOTES } from 'src/graphql/queries'
import NoteItem from 'src/sections/shared/note-item'
import NotesForm from './notes-form'
import ModalDelete from './modal-delete'

type TProps = {
  subStage: IStage
}

export default function NotesTab(props: TProps) {
  const { subStage } = props
  const [selectedNote, setSelectedNote] = React.useState<number | null>(null)
  const modalDelete = useBoolean()

  const { data, refetch } = useQuery(GET_STAGE_NOTES, {
    variables: { stageId: Number(subStage.id) },
    skip: !subStage,
  })

  const notes: IStageNote[] = useMemo(() => {
    if (!data) return []
    return data.stageNotes || []
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
      <NotesForm subStage={subStage} refetch={refetch} />
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
