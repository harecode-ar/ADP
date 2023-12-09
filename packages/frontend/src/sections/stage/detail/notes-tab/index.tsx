import { IStage, IStageNote } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_STAGE_NOTES } from 'src/graphql/queries'
import NotesForm from './notes-form'
import NoteItem from './note-item'

type TProps = {
  stage: IStage
}

export default function NotesTab(props: TProps) {
  const { stage } = props
  const { data, refetch } = useQuery(GET_STAGE_NOTES, {
    variables: { stageId: Number(stage.id) },
    skip: !stage,
  })

  const notes: IStageNote[] = useMemo(() => {
    if (!data) return []
    return data.stageNotes || []
  }, [data])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <NotesForm stage={stage} refetch={refetch} />
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
        notes.map((note) => <NoteItem key={note.id} note={note} refetch={refetch} />)
      )}
    </Box>
  )
}
