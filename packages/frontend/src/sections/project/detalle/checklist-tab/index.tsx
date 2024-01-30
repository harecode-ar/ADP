import { IProject, IChecklist } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box, Button, Card, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_CHECKLIST_BY_PROJECT } from 'src/graphql/queries'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { ChecklistItemTab } from './checklist-item-tab'
import ModalCreateTab from './checklist-create-modal-tab'

type TProps = {
  project: IProject
}

export default function ChechlistTab(props: TProps) {
  const { project } = props

  const modalCreate = useBoolean()

  const { data, refetch } = useQuery(GET_CHECKLIST_BY_PROJECT, {
    variables: { projectId: Number(project.id) },
    skip: !project,
  })

  const checklists: IChecklist[] = useMemo(() => {
    if (!data) return []
    return data.projectChecklists || []
  }, [data])

  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={modalCreate.onTrue}
            sx={{ width: 'fit-content' }}
          >
            <Iconify icon="mingcute:add-fill" mr={1} />
            Crear checklist
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {checklists.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                color: 'text.disabled',
              }}
            >
              No hay checklist
            </Box>
          ) : (
            <Grid container spacing={2}>
              {checklists.map((checklist) => (
                <Grid item xs={6}>
                  <ChecklistItemTab key={checklist.id} checklist={checklist} refetch={refetch} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      {modalCreate.value && (
        <ModalCreateTab modal={modalCreate} project={project} refetch={refetch} />
      )}
    </Card>
  )
}
