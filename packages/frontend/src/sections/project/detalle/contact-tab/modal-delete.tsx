'use client'

import { IContact, IProject } from '@adp/shared'
import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT_CONTACT } from 'src/graphql/mutations'

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

type TProps = {
  modal: ReturnType<typeof useBoolean>
  contact: IContact
  refetch: () => void
  project: IProject
}

export default function ModalDelete(props: TProps) {
  const { modal, contact, refetch, project } = props

  const { enqueueSnackbar } = useSnackbar()

  const [deleteStageContact] = useMutation(DELETE_PROJECT_CONTACT)

  const handleDelete = async () => {
    try {
      await deleteStageContact({
        variables: {
          id: contact.id,
          projectId: project.id,
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
      <Box sx={styleModal}>
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
