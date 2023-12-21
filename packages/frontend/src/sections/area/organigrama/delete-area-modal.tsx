'use client'

import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation } from '@apollo/client'
import { DELETE_AREA } from 'src/graphql/mutations'
import { useAreaTreeContext } from 'src/contexts/area-tree-context'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: VoidFunction
}

const DeleteAreaModal = (props: TProps) => {
  const { modal, refetch } = props
  const { selected, setSelected, deleteNode } = useAreaTreeContext()
  const { enqueueSnackbar } = useSnackbar()
  const [deleteArea] = useMutation(DELETE_AREA)

  const onDelete = async () => {
    try {
      if (!selected) return
      await deleteArea({
        variables: {
          id: selected.id,
        },
      })
      deleteNode(selected)
      enqueueSnackbar('Area borrada correctamente.', { variant: 'success' })
      refetch()
      modal.onFalse()
      setSelected(null)
    } catch {
      enqueueSnackbar('El Area no pudo ser borrada.', { variant: 'error' })
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
          Eliminar área
        </Typography>
        <Typography sx={{ mt: 2 }}>
          ¿Está seguro de eliminar el area <strong>{selected?.name || 'Desconocida'}</strong>?
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
                  <Button variant="contained" color="error" onClick={onDelete}>
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

export default DeleteAreaModal
