'use client'

import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useMutation } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { FINISH_PROJECT } from 'src/graphql/mutations'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  projectId: number
}

export default function ModalFinishProject(props: TProps) {
  const { modal, refetch, projectId } = props
  const [finishProject, { loading }] = useMutation(FINISH_PROJECT)
  const { enqueueSnackbar } = useSnackbar()

  const onAccept = async () => {
    if (loading) return
    try {
      const { errors } = await finishProject({
        variables: {
          id: projectId,
        },
      })
      if (errors) throw new Error(errors[0].message)
      enqueueSnackbar('Proyecto finalizado correctamente.', { variant: 'success' })
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
          Finalizar proyecto
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          ¿Está seguro que desea finalizar el proyecto?
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
                    Finalizar
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
