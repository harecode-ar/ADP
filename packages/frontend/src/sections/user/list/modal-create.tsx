'use client'

import React, { useCallback, useMemo } from 'react'
import type { IRole } from '@adp/shared'
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
import { CREATE_USER } from 'src/graphql/mutations'
import { GET_ROLES_FOR_SELECT } from 'src/graphql/queries'
import * as Yup from 'yup'
import { fData } from 'src/utils/format-number'
import UploadAvatar from 'src/components/upload/upload-avatar'
import { DEFAULT_STYLE_MODAL } from 'src/constants'
import { logger } from 'src/utils/logger'

const userSchema = Yup.object().shape({
  firstname: Yup.string().required('Nombre requerido'),
  lastname: Yup.string().required('Apellido requerido'),
  email: Yup.string().email('Email inválido').required('Email requerido'),
  role: Yup.object().required('Rol requerido'),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
}

type TRole = Pick<IRole, 'id' | 'name'>

type TFormikValues = {
  firstname: string
  lastname: string
  email: string
  phone: string
  role: IRole | null
  file: File | null
  preview: string | null
}

const ModalCreate = (props: TProps) => {
  const [createUser, { loading }] = useMutation(CREATE_USER)
  const { modal, refetch } = props
  const { enqueueSnackbar } = useSnackbar()

  const rolesQuery = useQuery(GET_ROLES_FOR_SELECT)
  const roles: TRole[] = useMemo(() => {
    if (!rolesQuery.data) return []
    return rolesQuery.data.roles || []
  }, [rolesQuery.data])

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      role: null as IRole | null,
      email: '',
      phone: '',
      file: null,
      preview: null,
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await createUser({
          variables: {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            phone: values.phone,
            image: values.file,
            roleId: values.role?.id,
          },
        })
        enqueueSnackbar('Usuario creado correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        logger.error(error)
        enqueueSnackbar('El usuario no pudo ser creado.', { variant: 'error' })
      }
    },
    validationSchema: userSchema,
  })

  const handleDropAvatar = useCallback(
    (acceptedFiles: (File | null)[]) => {
      const newFile = acceptedFiles[0]
      if (newFile) {
        formik.setFieldValue('file', newFile)
        formik.setFieldValue('preview', URL.createObjectURL(newFile))
      }
    },
    [formik]
  )

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
          Nuevo usuario
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          <UploadAvatar
            file={formik.values.file}
            preview={formik.values.preview}
            onDrop={handleDropAvatar}
            validator={(fileData: File) => {
              if (fileData.size > 2000000) {
                return {
                  code: 'file-too-large',
                  message: `El archivo es muy grande, el tamaño máximo es de ${fData(2000000)}`,
                }
              }
              return null
            }}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.disabled',
                  marginBottom: 5,
                }}
              >
                Archivos *.jpeg, *.jpg, *.png
                <br /> Max {fData(2000000)}
              </Typography>
            }
          />

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="firstname"
                  name="firstname"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.firstname}
                  error={Boolean(formik.errors.firstname)}
                  helperText={formik.errors.firstname}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="lastname"
                  name="lastname"
                  label="Apellido"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.lastname}
                  error={Boolean(formik.errors.lastname)}
                  helperText={formik.errors.lastname}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  fullWidth
                  options={roles}
                  getOptionLabel={(option) => option.name}
                  value={formik.values.role}
                  onChange={(event, value) => {
                    formik.setFieldValue('role', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Rol"
                      error={Boolean(formik.errors.role)}
                      helperText={formik.errors.role}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Telefono"
                  variant="outlined"
                  fullWidth
                  value={formik.values.phone}
                  error={Boolean(formik.errors.phone)}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.email}
                  error={Boolean(formik.errors.email)}
                  helperText={formik.errors.email}
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
                  <Button
                    onClick={() => {
                      modal.onFalse()
                      formik.resetForm()
                    }}
                    color="primary"
                    variant="outlined"
                    disabled={loading}
                  >
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => formik.handleSubmit()}
                    disabled={loading}
                  >
                    <Iconify sx={{ mr: 1 }} icon="mingcute:check-fill" />
                    {loading ? 'Creando...' : 'Crear'}
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
