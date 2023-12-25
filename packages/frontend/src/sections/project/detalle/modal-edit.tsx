'use client'

import React, { useMemo } from 'react'
import type { IArea, IProjectState } from '@adp/shared'
import {
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Grid,
  Backdrop,
  Autocomplete,
  InputAdornment,
} from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECT, AREAS_FOR_SELECT, PROJECT_STATE_FOR_SELECT } from 'src/graphql/queries'
import { UPDATE_PROJECT } from 'src/graphql/mutations'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import * as Yup from 'yup'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  state: Yup.object().required('Estado requerido'),
  cost: Yup.number().required('Costo requerido'),
  startDate: Yup.string().required('Fecha de inicio requerida'),
  endDate: Yup.string()
    .required('Fecha de finalizacion requerida')
    .test(
      'is-start-date-before-end-date',
      'La fecha de finalizacion debe ser mayor o igual a la fecha de inicio',
      (value, { parent }) => {
        const { startDate } = parent
        return new Date(startDate) <= new Date(value)
      }
    ),
  area: Yup.object().required('Area requerida'),
})

type TProps = {
  projectId: number
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
}

type TFormikValues = {
  id: number | null
  name: string
  state: IProjectState | null
  cost: number
  startDate: string
  endDate: string
  area: IArea | null
  description: string
}

const ModalEdit = (props: TProps) => {
  const { projectId, modal, refetch } = props
  const { enqueueSnackbar } = useSnackbar()
  const { data: dataAreas } = useQuery(AREAS_FOR_SELECT)
  const { data: dataProjectState } = useQuery(PROJECT_STATE_FOR_SELECT)
  const [updateProject] = useMutation(UPDATE_PROJECT)

  const areas: Pick<IArea, 'id' | 'name'>[] = useMemo(() => {
    if (dataAreas?.areas) return dataAreas.areas
    return []
  }, [dataAreas])

  const states: Pick<IProjectState, 'id' | 'name'>[] = useMemo(() => {
    if (dataProjectState?.projectStates) return dataProjectState.projectStates
    return []
  }, [dataProjectState])

  const formik = useFormik({
    initialValues: {
      id: null,
      name: '',
      state: null,
      cost: 0,
      startDate: '',
      endDate: '',
      area: null,
      description: '',
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await updateProject({
          variables: {
            id: projectId,
            name: values.name,
            stateId: values.state?.id,
            cost: parseFloat(values.cost.toString()),
            startDate: values.startDate,
            endDate: values.endDate,
            areaId: values.area?.id,
            description: values.description,
          },
        })
        enqueueSnackbar('Proyecto editado correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('El proyecto no pudo ser editado.', { variant: 'error' })
      }
    },
    validationSchema,
  })

  const { loading } = useQuery(GET_PROJECT, {
    variables: {
      id: projectId,
    },
    skip: !projectId,
    onCompleted: (dataProject) => {
      const { project } = dataProject
      if (project) {
        formik.setValues({
          id: project.id,
          name: project.name,
          state: project.state,
          cost: project.cost,
          startDate: new Date(project.startDate).toISOString().split('T')[0],
          endDate: new Date(project.endDate).toISOString().split('T')[0],
          area: project.area,
          description: project.description,
        })
      }
    },
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
          Editar proyecto
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* name */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.name}
                  error={Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                  onChange={formik.handleChange}
                  disabled={loading}
                />
              </Grid>
              {/* state */}
              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={states}
                  getOptionLabel={(option) => option.name}
                  value={formik.values.state}
                  onChange={(_, value) => formik.setFieldValue('state', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Estado"
                      variant="outlined"
                      placeholder="Buscar estado"
                      required
                      error={Boolean(formik.errors.state)}
                      helperText={formik.errors.state}
                    />
                  )}
                />
              </Grid>
              {/* cost */}
              <Grid item xs={12} md={3}>
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
              <Grid item xs={12} md={3}>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(formik.errors.startDate)}
                  helperText={formik.errors.startDate}
                />
              </Grid>
              {/* endDate */}
              <Grid item xs={12} md={3}>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(formik.errors.endDate)}
                  helperText={formik.errors.endDate}
                />
              </Grid>
              {/* area */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={areas}
                  getOptionLabel={(option) => option.name}
                  value={formik.values.area}
                  onChange={(_, value) => formik.setFieldValue('area', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Área"
                      variant="outlined"
                      placeholder="Buscar área"
                      required
                      error={Boolean(formik.errors.area)}
                      helperText={formik.errors.area}
                    />
                  )}
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
              {/* buttons */}
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
                  <Button onClick={() => formik.handleSubmit()} color="primary" variant="contained">
                    <Iconify sx={{ mr: 1 }} icon="mingcute:check-fill" />
                    Enviar
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

export default ModalEdit
