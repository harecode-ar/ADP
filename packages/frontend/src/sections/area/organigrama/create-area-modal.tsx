'use client'

import { COLORS } from '@adp/shared'
import type { IArea, IUser } from '@adp/shared'
import React, { useMemo } from 'react'
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
import ColorPicker from 'src/components/color-picker'
import { useFormik, FormikHelpers } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation, useQuery } from '@apollo/client'
import { useAreaTreeContext } from 'src/contexts/area-tree-context'
import { CREATE_AREA } from 'src/graphql/mutations'
import * as Yup from 'yup'
import UserPicker from 'src/components/user-picker'
import { TAreaTree } from 'src/contexts/area-tree-context/types'
import { USERS_FOR_SELECT } from 'src/graphql/queries/user'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

const areaSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  // responsible: Yup.object().required('Responsable requerido'),
  parent: Yup.object().required('Area padre requerida'),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  areas: IArea[]
}

type TFormikValues = {
  name: string
  description: string
  color: {
    color: string
    label: string
  }
  responsible: IUser | null
  parent: TAreaTree | null
}

const CreateAreaModal = (props: TProps) => {
  const { modal, refetch, areas } = props
  const { selected } = useAreaTreeContext()
  const [createArea] = useMutation(CREATE_AREA)
  const { enqueueSnackbar } = useSnackbar()
  const { data } = useQuery(USERS_FOR_SELECT)

  const users: Pick<IUser, 'id' | 'fullname'>[] = useMemo(() => {
    if (data?.users) return data.users
    return []
  }, [data])

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      responsible: null as IUser | null,
      parent: selected,
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await createArea({
          variables: {
            name: values.name,
            description: values.description,
            color: values.color.color,
            rolename: 'prueba',
            multiple: false,
            responsibleId: values.responsible?.id,
            parentId: values.parent?.id,
          },
        })
        enqueueSnackbar('Area creada correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('El Area no pudo ser creada.', { variant: 'error' })
      }
    },
    validationSchema: areaSchema,
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
          Nueva área
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
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <UserPicker
                  users={users}
                  value={formik.values.responsible}
                  onChange={(_, value) => formik.setFieldValue('responsible', value)}
                  label="Responsable"
                  placeholder="Buscar responsible"
                  variant="outlined"
                  error={Boolean(formik.errors.responsible)}
                  helperText={formik.errors.responsible}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  noOptionsText="No hay areas"
                  options={areas}
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
                <ColorPicker
                  label="Color"
                  value={formik.values.color}
                  onChange={(_, value) => {
                    formik.setFieldValue('color', value)
                  }}
                  error={Boolean(formik.errors.color)}
                  helperText={String(formik.errors.color || '')}
                  options={COLORS}
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
                    Crear
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

export default CreateAreaModal
