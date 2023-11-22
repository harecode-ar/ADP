'use client'

import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useMutation } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { DELETE_PROJECT_NOTE } from 'src/graphql/mutations'

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
  refetch: () => void
  noteId: number
}

const ModalDelete = (props: TProps) => {
  const { modal, noteId, refetch } = props
  const [deleteProjectNote] = useMutation(DELETE_PROJECT_NOTE)
  const { enqueueSnackbar } = useSnackbar()

  const onDelete = async (id: number) => {
    try {
      await deleteProjectNote({
        variables: {
          id,
        },
      })
      enqueueSnackbar('Nota eliminada correctamente.', { variant: 'success' })
      modal.onFalse()
      refetch()
    } catch (err) {
      enqueueSnackbar('La Nota no pudo ser eliminada.', { variant: 'error' })
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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Eliminar nota
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ¿Está seguro de eliminar esta nota?
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
                  <Button variant="contained" color="error" onClick={() => onDelete(noteId)}>
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

export default ModalDelete
