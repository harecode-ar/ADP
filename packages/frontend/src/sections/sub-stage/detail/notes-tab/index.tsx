import { IStage, IStageNote } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_STAGE_NOTES } from 'src/graphql/queries'
import NotesForm from './notes-form'
import NoteItem from './note-item'

type TProps = {
  subStage: IStage
}

export default function NotesTab(props: TProps) {
  const { subStage } = props
  const { data, refetch } = useQuery(GET_STAGE_NOTES, {
    variables: { stageId: Number(subStage.id) },
    skip: !subStage,
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
      <NotesForm subStage={subStage} refetch={refetch} />
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
