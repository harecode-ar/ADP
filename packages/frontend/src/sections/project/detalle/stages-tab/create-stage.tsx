'use client'

import React, { useMemo } from 'react'
import type { IArea, IProject } from '@adp/shared'
import {
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Grid,
  Backdrop,
  Autocomplete,
} from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_STAGE } from 'src/graphql/mutations'
import { AREAS_FOR_SELECT } from 'src/graphql/queries/area'
import * as Yup from 'yup'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  area: Yup.object().required('Área requerida'),
  startDate: Yup.string()
    .required('Fecha de inicio requerida')
    .test(
      'is-end-date-in-range',
      'La fecha de inicio esta fuera del rango del proyecto',
      (value, { parent }) => {
        const { startDate } = parent
        const { projectStartDate } = parent
        return new Date(startDate) >= new Date(projectStartDate)
      }
    ),
  endDate: Yup.string()
    .required('Fecha de finalización requerida')
    .test(
      'is-start-date-before-end-date',
      'La fecha de finalización debe ser mayor o igual a la fecha de inicio',
      (value, { parent }) => {
        const { startDate } = parent
        return new Date(startDate) <= new Date(value)
      }
    )
    .test(
      'is-end-date-in-range',
      'La fecha de finalizacion esta fuera del rango del proyecto',
      (value, { parent }) => {
        const { projectEndDate } = parent
        return new Date(value) <= new Date(projectEndDate)
      }
    ),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  project: IProject
  refetch: VoidFunction
}

type TFormikValues = {
  name: string
  area: IArea | null
  startDate: string
  endDate: string
  description: string
}

const ModalCreate = (props: TProps) => {
  const { modal, project, refetch } = props
  const [createStage] = useMutation(CREATE_STAGE)
  const { enqueueSnackbar } = useSnackbar()
  const { data } = useQuery(AREAS_FOR_SELECT)

  const areas: Pick<IArea, 'id' | 'name'>[] = useMemo(() => {
    if (data?.areas) return data.areas
    return []
  }, [data])

  const formik = useFormik({
    initialValues: {
      name: '',
      area: null,
      startDate: project.startDate,
      endDate: project.endDate,
      description: '',
      projectStartDate: project.startDate,
      projectEndDate: project.endDate,
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        const { errors } = await createStage({
          variables: {
            name: values.name,
            areaId: values.area?.id,
            startDate: values.startDate,
            endDate: values.endDate,
            description: values.description,
            projectId: project.id,
          },
        })
        if (errors) throw new Error(errors[0].message)
        enqueueSnackbar('Etapa creada correctamente.', { variant: 'success' })
        helpers.resetForm()
        refetch()
        modal.onFalse()
      } catch (error) {
        console.error(error)
        enqueueSnackbar(`La etapa no pudo ser creada. ${error.message}`, { variant: 'error' })
      }
    },
    validationSchema,
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
          Nueva etapa
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
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
              <Grid item xs={12} md={6}>
                <Autocomplete
                  noOptionsText="No hay areas"
                  options={areas}
                  getOptionLabel={(option) => option.name}
                  value={formik.values.area}
                  onChange={(_, value) => formik.setFieldValue('area', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Área asignada"
                      variant="outlined"
                      placeholder="Buscar área"
                      required
                      error={Boolean(formik.errors.area)}
                      helperText={formik.errors.area}
                    />
                  )}
                />
              </Grid>

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
