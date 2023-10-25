'use client'

import React, { useState } from 'react'
import Iconify from 'src/components/iconify'
import {
  Typography,
  Button,
  Modal,
  Box,
  Menu,
  MenuItem,
  TextField,
  Grid,
  Backdrop,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

const areaSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  responsable: Yup.string().required('Responsable requerido'),
})

const AreaOptions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [openModal, setOpenModal] = useState(false)
  const handleModalOpen = () => setOpenModal(true)
  const handleModalClose = () => setOpenModal(false)

  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<Iconify icon="ic:round-settings" />}
      >
        Opciones de Área
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleModalOpen}>
          <Iconify sx={{ mx: 1 }} icon="mingcute:add-fill" /> Nueva
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Iconify sx={{ mx: 1 }} icon="material-symbols:edit" /> Editar
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Iconify sx={{ mx: 1 }} icon="material-symbols:delete" /> Eliminar
        </MenuItem>
      </Menu>

      <Modal
        open={openModal}
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
            Nueva área
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="responsable"
                    name="responsable"
                    label="Responsable"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="success" sx={{ m: 1 }}>
                    <Iconify sx={{ mx: 1 }} icon="mingcute:check-fill" />
                    Enviar
                  </Button>
                  <Button onClick={handleModalClose} variant="contained" color="error">
                    <Iconify sx={{ mx: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default AreaOptions
