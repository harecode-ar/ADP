'use client'

import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useMutation } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { START_PROJECT, START_STAGE_OR_SUB_STAGE } from 'src/graphql/mutations'
import { DEFAULT_STYLE_MODAL } from 'src/constants'
import { IProject, IStage } from '@adp/shared'

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  project: IProject | null
  stage: IStage | null
  subStage: IStage | null
}

export default function ModalStartProject(props: TProps) {
  const { modal, refetch, project, stage, subStage } = props
  const [startProject, { loading }] = useMutation(START_PROJECT)
  const [startStageOrSubStage, { loading: loadingStage }] = useMutation(START_STAGE_OR_SUB_STAGE)
  const { enqueueSnackbar } = useSnackbar()

  const onAccept = async () => {
    if (loading || loadingStage) return
    try {
      if (project) {
        const { errors } = await startProject({
          variables: {
            id: project.id
          },
        })
        if (errors) throw new Error(errors[0].message)
        enqueueSnackbar('El proyecto ha comenzado corractamente.', { variant: 'success' })
      }
      if (stage) {
        const { errors } = await startStageOrSubStage({
          variables: {
            id: stage.id
          },
        })
        if (errors) throw new Error(errors[0].message)
        enqueueSnackbar('La etapa ha comenzado corractamente.', { variant: 'success' })
      }
      if (subStage) {
        const { errors } = await startStageOrSubStage({
          variables: {
            id: subStage.id
          },
        })
        if (errors) throw new Error(errors[0].message)
        enqueueSnackbar('La subetapa ha comenzado corractamente.', { variant: 'success' })
      }
      modal.onFalse()
      refetch()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <Modal
      open={modal.value}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={DEFAULT_STYLE_MODAL}>
        <Typography id="modal-title" variant="h6" component="h2">
          Comenzar tarea
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          ¿Está seguro que desea comenzar la tarea?
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Button onClick={modal.onFalse} variant="outlined" color="primary">
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => onAccept()}>
                    <Iconify sx={{ mr: 1 }} icon="pajamas:todo-done" />
                    Comenzar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Typography>
      </Box>
    </Modal>
  )
}
