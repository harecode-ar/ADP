import type { IArea } from '@adp/shared'
import { useRouter } from 'src/routes/hooks'
import React, { useMemo } from 'react'
import { Button, Box, TextField, Grid, Autocomplete, Card } from '@mui/material'

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
  description: Yup.string().required('Descripcion requerida'),
  area: Yup.object().required('Area requerida'),
  cost: Yup.string().required('Costo requerido'),
  startDate: Yup.string().required('Fecha de inicio requerida'),
  endDate: Yup.string().required('Fecha de finalizacion requerida'),
})

type TFormikValues = {
  name: string
  description: string
  area: IArea | null
  cost: string
  startDate: string
  endDate: string
}

const CreateProject = () => {
  const [createProject] = useMutation(CREATE_PROJECT)
  const { enqueueSnackbar } = useSnackbar()
  const { data } = useQuery(AREAS_FOR_SELECT)
  const router = useRouter()

  const areas: Pick<IArea, 'id' | 'name'>[] = useMemo(() => {
    if (data?.areas) return data.areas
    return []
  }, [data])

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      area: null,
      cost: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await createProject({
          variables: {
            name: values.name,
            description: values.description,
            areaId: values.area?.id,
            cost: values.cost,
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
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={areas}
              getOptionLabel={(option) => option.name}
              value={formik.values.area}
              onChange={(_, value) => formik.setFieldValue('area', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Área a la que pertenece"
                  variant="outlined"
                  placeholder="Buscar área"
                  error={Boolean(formik.errors.area)}
                  helperText={formik.errors.area}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="cost"
              name="cost"
              label="Costo proyectado"
              variant="outlined"
              fullWidth
              multiline
              value={formik.values.cost}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.cost)}
              helperText={formik.errors.cost}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="date"
              id="startDate"
              name="startDate"
              label="Fecha de inicio"
              variant="outlined"
              fullWidth
              value={formik.values.startDate}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(formik.errors.startDate)}
              helperText={formik.errors.startDate}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="date"
              id="endDate"
              name="endDate"
              label="Fecha de finalizacion"
              variant="outlined"
              fullWidth
              value={formik.values.endDate}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
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
