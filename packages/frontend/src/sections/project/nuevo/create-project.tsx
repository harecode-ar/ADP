import React, { useMemo } from 'react'
import type { IArea } from '@adp/shared'
import { useRouter } from 'src/routes/hooks'
import { Button, Box, TextField, Grid, Autocomplete, Card, InputAdornment } from '@mui/material'

import { useFormik, FormikHelpers } from 'formik'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_PROJECT } from 'src/graphql/mutations'
import * as Yup from 'yup'
import { AREAS_FOR_SELECT } from 'src/graphql/queries/area'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
import { paths } from 'src/routes/paths'

const projectSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  area: Yup.object().required('Area requerida'),
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

type TFormikValues = {
  name: string
  description: string
  area: IArea | null
  cost: number
  startDate: string
  endDate: string
}

const CreateProject = () => {
  const [createProject] = useMutation(CREATE_PROJECT)
  const { enqueueSnackbar } = useSnackbar()
  const { data } = useQuery(AREAS_FOR_SELECT)
  const router = useRouter()
  const threeHours = 3 * 60 * 60 * 1000

  const areas: Pick<IArea, 'id' | 'name'>[] = useMemo(() => {
    if (data?.areas) return data.areas
    return []
  }, [data])

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      area: null,
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
            areaId: values.area?.id,
            cost: parseFloat(values.cost.toString()),
            startDate: values.startDate,
            endDate: values.endDate,
          },
        })
        enqueueSnackbar('Proyecto creado correctamente.', { variant: 'success' })
        router.push(paths.dashboard.project.list)
        helpers.resetForm()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('El proyecto no pudo ser creado.', { variant: 'error' })
      }
    },
    validationSchema: projectSchema,
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CustomBreadcrumbs
        heading="Crear proyecto"
        links={[{ name: 'Proyecto', href: paths.dashboard.project.root }, { name: 'Nuevo' }]}
        action={
          <Button variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
            Guardar
          </Button>
        }
      />

      <Card sx={{ p: 2 }}>
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
        </Grid>
      </Card>
    </Box>
  )
}

export default CreateProject
