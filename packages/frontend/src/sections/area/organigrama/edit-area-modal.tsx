'use client'

import type { IArea, IUser } from '@adp/shared'
import React, { useMemo } from 'react'
import { Typography, Button, Modal, Box, TextField, Grid, Backdrop, Autocomplete } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { GET_AREA } from 'src/graphql/queries'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import * as Yup from 'yup'
import { UPDATE_AREA } from 'src/graphql/mutations'
import UserPicker from 'src/components/user-picker'
import { USER_MOCK } from 'src/mocks'
import { useAreaTreeContext } from 'src/contexts/area-tree-context'

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

const areaSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  areas: IArea[]
}

type TArea = {
  id: number | null
  name: string | null
  description: string | null
  responsible: IUser | null
  parent: IArea | null
}

const EditAreaModal = (props: TProps) => {
  const { modal, refetch, areas } = props
  const { enqueueSnackbar } = useSnackbar()
  const { selected } = useAreaTreeContext()
  const [updateArea] = useMutation(UPDATE_AREA)

  const filteredAreas = useMemo(() => areas.filter((area) => area.id !== selected?.id), [areas, selected])

  const formik = useFormik({
    initialValues: {
      id: null,
      name: '',
      description: '',
      responsible: null,
      parent: null,
    } as TArea,
    onSubmit: async (values, helpers: FormikHelpers<TArea>) => {
      try {
        if (!values.id) return
        await updateArea({
          variables: {
            id: values.id,
            name: values.name,
            description: values.description,
            rolename: 'prueba',
            multiple: false,
            responsibleId: values.responsible?.id,
            parentId: values.parent?.id,
          },
        })
        enqueueSnackbar('Area editada correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('El Area no pudo ser editada.', { variant: 'error' })
      }
    },
    validationSchema: areaSchema,
  })

  const { loading } = useQuery(GET_AREA, {
    variables: {
      id: selected?.id,
    },
    skip: !selected,
    onCompleted: (data) => {
      const { area } = data
      if (area) {
        formik.setValues({
          id: area.id,
          name: area.name,
          description: area.description,
          responsible: area.responsible,
          parent: area.parent,
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
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editar área
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                  error={Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                  onChange={formik.handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserPicker
                  users={USER_MOCK}
                  value={formik.values.responsible}
                  onChange={(_, value) => formik.setFieldValue('responsible', value)}
                  label="Responsable"
                  placeholder="Buscar responsible"
                  variant="outlined"
                  disabled={loading}
                  error={Boolean(formik.errors.responsible)}
                  helperText={formik.errors.responsible}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={filteredAreas}
                  getOptionLabel={(option) => option.name}
                  value={formik.values.parent}
                  onChange={(_, value) => formik.setFieldValue('parent', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Area padre"
                      variant="outlined"
                      placeholder="Buscar area"
                      error={Boolean(formik.errors.parent)}
                      helperText={formik.errors.parent}
                    />
                  )}
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
                  disabled={loading}
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
                  <Button onClick={modal.onFalse} color="primary" variant="outlined">
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
                    <Iconify sx={{ mr: 1 }} icon="mingcute:check-fill" />
                    Editar
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

export default EditAreaModal
