'use client'

import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { IContact, IStage } from '@adp/shared'
import { useMutation } from '@apollo/client'
import { DELETE_STAGE_CONTACT } from 'src/graphql/mutations'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

type TProps = {
  modal: ReturnType<typeof useBoolean>
  contact: IContact
  refetch: () => void
  stage: IStage
}

export default function ModalDelete(props: TProps) {
  const { modal, contact, refetch, stage } = props

  const { enqueueSnackbar } = useSnackbar()

  const [deleteStageContact] = useMutation(DELETE_STAGE_CONTACT)

  const handleDelete = async () => {
    try {
      await deleteStageContact({
        variables: {
          id: contact.id,
          stageId: stage.id,
        },
      })
      refetch()
      modal.onFalse()
      enqueueSnackbar('Contacto eliminado', { variant: 'success' })
    } catch {
      enqueueSnackbar('Error al eliminar contacto', { variant: 'error' })
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
    >
      <Box sx={DEFAULT_STYLE_MODAL}>
        <Typography variant="h6" component="h2">
          Eliminar contacto
        </Typography>
        <Typography sx={{ mt: 2 }}>
          ¿Está seguro de que desea eliminar este contacto?
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
                  <Button onClick={modal.onFalse} variant="outlined" color="error">
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button variant="contained" color="error" onClick={handleDelete}>
                    <Iconify sx={{ mr: 1 }} icon="material-symbols:delete" />
                    Eliminar
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
