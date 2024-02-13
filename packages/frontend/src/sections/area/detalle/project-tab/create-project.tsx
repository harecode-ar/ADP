'use client'

import React from 'react'
import {
  Button,
  Box,
  TextField,
  Grid,
  InputAdornment,
  Modal,
  Backdrop,
  Typography,
} from '@mui/material'
import { useFormik, FormikHelpers } from 'formik'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation } from '@apollo/client'
import { CREATE_PROJECT } from 'src/graphql/mutations'
import * as Yup from 'yup'
import { DEFAULT_STYLE_MODAL } from 'src/constants'
import { logger } from 'src/utils/logger'
import { useBoolean } from 'src/hooks/use-boolean'
import Iconify from 'src/components/iconify'

const projectSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  cost: Yup.number().required('Costo requerido'),
  startDate: Yup.string().required('Fecha de inicio requerida'),
  endDate: Yup.string()
    .required('Fecha de finalización requerida')
    .test(
      'is-start-date-before-end-date',
      'La fecha de finalización debe ser mayor o igual a la fecha de inicio',
      (value, { parent }) => {
        const { startDate } = parent
        return new Date(startDate) <= new Date(value)
      }
    ),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  areaId: number
  refetch: VoidFunction
}

type TFormikValues = {
  name: string
  description: string
  cost: number
  startDate: string
  endDate: string
}

const ModalCreate = (props: TProps) => {
  const { modal, areaId, refetch } = props
  const [createProject] = useMutation(CREATE_PROJECT)
  const { enqueueSnackbar } = useSnackbar()
  const threeHours = 3 * 60 * 60 * 1000

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      cost: 0,
      startDate: new Date(new Date().getTime() - threeHours).toISOString().split('T')[0],
      endDate: new Date(new Date().getTime() - threeHours).toISOString().split('T')[0],
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await createProject({
          variables: {
            name: values.name,
            description: values.description,
            areaId,
            cost: parseFloat(values.cost.toString()),
            startDate: values.startDate,
            endDate: values.endDate,
          },
        })
        enqueueSnackbar('Proyecto creado correctamente.', { variant: 'success' })
        refetch()
        helpers.resetForm()
        modal.onFalse()
      } catch (error) {
        logger.error(error)
        enqueueSnackbar('El proyecto no pudo ser creado.', { variant: 'error' })
      }
    },
    validationSchema: projectSchema,
  })

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
          Nuevo proyecto
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* nombre */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                />
              </Grid>
              {/* cost */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="cost"
                  name="cost"
                  label="Costo proyectado"
                  variant="outlined"
                  type="number"
                  fullWidth
                  required
                  multiline
                  maxRows={10}
                  value={formik.values.cost}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                  }}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.cost)}
                  helperText={formik.errors.cost}
                />
              </Grid>
              {/* startDate */}
              <Grid item xs={12} md={6}>
                <TextField
                  type="date"
                  id="startDate"
                  name="startDate"
                  label="Fecha de inicio"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.startDate)}
                  helperText={formik.errors.startDate}
                />
              </Grid>
              {/* endDate */}
              <Grid item xs={12} md={6}>
                <TextField
                  type="date"
                  id="endDate"
                  name="endDate"
                  label="Fecha de finalizacion"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.endDate)}
                  helperText={formik.errors.endDate}
                />
              </Grid>
              {/* description */}
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={10}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.description)}
                  helperText={formik.errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Button
                    onClick={() => {
                      modal.onFalse()
                      formik.resetForm()
                    }}
                    color="primary"
                    variant="outlined"
                  >
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
                    <Iconify sx={{ mr: 1 }} icon="mingcute:check-fill" />
                    Crear
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalCreate
