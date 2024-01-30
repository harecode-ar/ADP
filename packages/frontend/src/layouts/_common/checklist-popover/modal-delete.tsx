'use client'

import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useMutation } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { DELETE_CHECKLIST } from 'src/graphql/mutations'
import { DEFAULT_STYLE_MODAL } from 'src/constants'
import { ECustomEvent } from 'src/types'

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  checklistId: number
}

const ModalDelete = (props: TProps) => {
  const { modal, refetch, checklistId } = props
  const [deleteChecklist] = useMutation(DELETE_CHECKLIST)
  const { enqueueSnackbar } = useSnackbar()

  const onDelete = async (id: number) => {
    try {
      await deleteChecklist({
        variables: {
          id,
        },
      })
      enqueueSnackbar('Checklist borrado correctamente.', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      })
      modal.onFalse()
      refetch()
      window.dispatchEvent(new Event(ECustomEvent.refetchProjectChecklist))
    } catch {
      enqueueSnackbar('El checklist no pudo ser borrada.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      })
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
      <Box sx={DEFAULT_STYLE_MODAL}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Eliminar checklist
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ¿Está seguro de eliminar dicho checklist?
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
                  <Button variant="contained" color="error" onClick={() => onDelete(checklistId)}>
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
