import { IStage, IChecklist } from '@adp/shared'
import React, { useEffect, useMemo } from 'react'
import { Box, Button, Card, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_CHECKLIST_BY_STAGE } from 'src/graphql/queries'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { ECustomEvent } from 'src/types'
import { ChecklistItemTab } from './checklist-item-tab'
import ModalCreateTab from './checklist-create-modal-tab'

type TProps = {
  subStage: IStage
}

export default function ChechlistTab(props: TProps) {
  const { subStage } = props

  const modalCreate = useBoolean()

  const { data, refetch } = useQuery(GET_CHECKLIST_BY_STAGE, {
    variables: { stageId: Number(subStage.id) },
    skip: !subStage,
  })

  const checklists: IChecklist[] = useMemo(() => {
    if (!data) return []
    return data.stageChecklists || []
  }, [data])

  useEffect(() => {
    window.addEventListener(ECustomEvent.refetchSubStageChecklist, refetch)
    return () => window.removeEventListener(ECustomEvent.refetchSubStageChecklist, refetch)
  }, [refetch])

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
                <Grid item xs={12} md={6}>
                  <ChecklistItemTab key={checklist.id} checklist={checklist} refetch={refetch} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      {modalCreate.value && (
        <ModalCreateTab modal={modalCreate} subStage={subStage} refetch={refetch} />
      )}
    </Card>
  )
}
