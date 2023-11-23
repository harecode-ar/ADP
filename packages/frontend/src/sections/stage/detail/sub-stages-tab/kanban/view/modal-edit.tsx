'use client'

import React, { useMemo } from 'react'
import type { IArea, IProjectState, IStage, IProject } from '@adp/shared'
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
import { useMutation, useQuery } from '@apollo/client'
import { AREAS_FOR_SELECT } from 'src/graphql/queries/area'
import { PROJECT_STATE_FOR_SELECT } from 'src/graphql/queries/project-state'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import * as Yup from 'yup'
import { UPDATE_STAGE } from 'src/graphql/mutations'

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 900,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  state: Yup.object().required('Estado requerido'),
  startDate: Yup.string()
    .required('Fecha de inicio requerida')
    .test(
      'is-end-date-in-range',
      'La fecha de inicio esta fuera del rango del proyecto',
      (value, { parent }) => {
        const { startDate } = parent
        const { projectStartDate, projectEndDate } = parent
        return startDate >= projectStartDate && startDate <= projectEndDate
      }
    ),
  endDate: Yup.string()
    .required('Fecha de finalizacion requerida')
    .test(
      'is-end-date-in-range',
      'La fecha de finalizacion esta fuera del rango del proyecto',
      (value, { parent }) => {
        const { endDate } = parent
        const { projectStartDate, projectEndDate } = parent
        return endDate >= projectStartDate && endDate <= projectEndDate
      }
    )
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
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  stage: IStage
  project: IProject
}

type TFormikValues = {
  id: number | null
  name: string
  state: IProjectState | null
  startDate: string
  endDate: string
  area: IArea | null
  description: string
  projectId: number | null
}

const ModalEdit = (props: TProps) => {
  const { modal, refetch, stage, project } = props
  const { enqueueSnackbar } = useSnackbar()
  const { data: dataAreas } = useQuery(AREAS_FOR_SELECT)
  const { data: dataProjectState } = useQuery(PROJECT_STATE_FOR_SELECT)
  const [updateStage] = useMutation(UPDATE_STAGE)

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
      name: stage.name,
      state: stage.state,
      startDate: stage.startDate,
      endDate: stage.endDate,
      area: stage.area,
      projectId: stage.projectId,
      description: stage.description,
      projectStartDate: project.startDate,
      projectEndDate: project.endDate,
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        const { errors } = await updateStage({
          variables: {
            id: stage.id,
            name: values.name,
            stateId: values.state?.id,
            startDate: values.startDate,
            endDate: values.endDate,
            areaId: values.area?.id,
            projectId: values.projectId,
            description: values.description,
          },
        })
        if (errors) throw new Error(errors[0].message)
        enqueueSnackbar('Etapa editada correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('La etapa no pudo ser editada.', { variant: 'error' })
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
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editar etapa
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
                />
              </Grid>
              {/* state */}
              <Grid item xs={12} md={6}>
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
                  <Button
                    onClick={() => {
                      formik.handleSubmit()
                    }}
                    color="primary"
                    variant="contained"
                  >
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