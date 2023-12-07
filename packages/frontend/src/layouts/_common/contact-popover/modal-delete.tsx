'use client'

import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { IContact } from '@adp/shared'
import { useMutation } from '@apollo/client'
import { DELETE_USER_CONTACT } from 'src/graphql/mutations'

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
}

export default function ModalDelete(props: TProps) {
  const { modal, contact, refetch } = props

  const { enqueueSnackbar } = useSnackbar()

  const [deleteContact] = useMutation(DELETE_USER_CONTACT)

  const handleDelete = async () => {
    try {
      await deleteContact({
        variables: {
          id: contact.id,
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
