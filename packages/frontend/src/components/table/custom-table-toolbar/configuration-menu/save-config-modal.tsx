import React from 'react'
import {
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { useFormik } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import useTable from '../../use-table'

type SaveConfigModalProps = {
  modal: ReturnType<typeof useBoolean>
  id: string
  getConfigs: () => void
}

export default function SaveConfigModal(props: SaveConfigModalProps) {
  const { modal, id, getConfigs } = props
  const { saveConfig } = useTable()

  const handleSaveConfig = (name: string) => {
    saveConfig(id, name)
    modal.onFalse()
  }

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { resetForm }) => {
      const formattedName = values.name
        .replaceAll('-', ' ')
        .split(' ')
        .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
        .join('')
      handleSaveConfig(formattedName)
      resetForm()
      getConfigs()
    },
  })

  return (
    <Dialog open={modal.value} onClose={modal.onFalse}>
      <DialogTitle>Crear nueva configuración</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3 }}>
          Ingrese el nombre de la configuración que desea guardar
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Nombre"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={modal.onFalse} variant="text" color="inherit">
          Cancelar
        </Button>
        <Button onClick={() => formik.handleSubmit()} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
