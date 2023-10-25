'use client'

import React, { useMemo } from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useMutation } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { DELETE_AREA } from 'src/graphql/mutations'
import { useTable } from 'src/components/table'

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
}

const ModalDelete = (props: TProps) => {
  const { modal, refetch } = props
  const [deleteArea] = useMutation(DELETE_AREA)
  const { selected, setSelected } = useTable()
  const { enqueueSnackbar } = useSnackbar()

  const areaId = useMemo(() => Number(selected[0]), [selected])

  const onDelete = async (id: number) => {
    try {
      await deleteArea({
        variables: {
          id,
        },
      })
      enqueueSnackbar('Area borrada correctamente.', { variant: 'success' })
      modal.onFalse()
      refetch()
      setSelected([])
    } catch (err) {
      console.log(err)
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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Eliminar área
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ¿Está seguro de eliminar dicha area?
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
                  <Button variant="contained" color="error" onClick={() => onDelete(areaId)}>
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
