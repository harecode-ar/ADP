'use client'

import React, { useMemo } from 'react'
import type { IArea, ITaskState, IStage } from '@adp/shared'
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
import { AREAS_FOR_SELECT } from 'src/graphql/queries'
import { UPDATE_SUB_STAGE } from 'src/graphql/mutations'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import * as Yup from 'yup'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

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
  subStage: IStage
}

type TFormikValues = {
  id: number | null
  name: string
  state: ITaskState | null
  startDate: string
  endDate: string
  area: IArea | null
  description: string
}

const ModalEdit = (props: TProps) => {
  const { modal, refetch, stage, subStage } = props
  const { enqueueSnackbar } = useSnackbar()
  const { data: dataAreas } = useQuery(AREAS_FOR_SELECT)
  const [updateSubStage] = useMutation(UPDATE_SUB_STAGE)

  const areas: Pick<IArea, 'id' | 'name'>[] = useMemo(() => {
    if (dataAreas?.areas) return dataAreas.areas
    return []
  }, [dataAreas])

  const formik = useFormik({
    initialValues: {
      id: null,
      name: subStage.name,
      state: subStage.state,
      startDate: subStage.startDate,
      endDate: subStage.endDate,
      area: subStage.area,
      description: subStage.description,
      projectStartDate: stage.startDate,
      projectEndDate: stage.endDate,
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        const { errors } = await updateSubStage({
          variables: {
            id: subStage.id,
            name: values.name,
            stateId: values.state?.id,
            startDate: values.startDate,
            endDate: values.endDate,
            areaId: values.area?.id,
            description: values.description,
          },
        })
        if (errors) throw new Error(errors[0].message)
        enqueueSnackbar('Sub-etapa editada correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch {
        enqueueSnackbar('La sub-etapa no pudo ser editada.', { variant: 'error' })
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
          Editar sub-etapa
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* name */}
              <Grid item xs={12}>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(formik.errors.endDate)}
                  helperText={formik.errors.endDate}
                />
              </Grid>
              {/* area */}
              <Grid item xs={12}>
                <Autocomplete
                  noOptionsText="No hay areas"
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
