'use client'

import React, { useCallback, useMemo } from 'react'
import type { IRole } from '@adp/shared/types'
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
import { GET_USER, GET_ROLES_FOR_SELECT } from 'src/graphql/queries'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import { useTable } from 'src/components/table'
import * as Yup from 'yup'
import { UPDATE_USER } from 'src/graphql/mutations'
import { fData } from 'src/utils/format-number'
import { UploadAvatar } from 'src/components/upload'

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

type TUser = {
  id: number | null
  firstname: string | null
  lastname: string | null
  email: string | null
  telephone: string | null
  role: IRole | null
  file: File | null
}

const ModalEdit = (props: TProps) => {
  const { modal, refetch } = props
  const { enqueueSnackbar } = useSnackbar()
  const { selected, setSelected } = useTable()
  const [updateUser] = useMutation(UPDATE_USER)
  const userId = useMemo(() => Number(selected[0]), [selected])

  const rolesQuery = useQuery(GET_ROLES_FOR_SELECT)
  const roles: TRole[] = useMemo(() => {
    if (!rolesQuery.data) return []
    return rolesQuery.data.roles || []
  }, [rolesQuery.data])

  const formik = useFormik({
    initialValues: {
      id: null,
      firstname: '',
      lastname: '',
      email: '',
      password: '123',
      telephone: '',
      role: null as IRole | null,
      file: null,
    } as TUser,
    onSubmit: async (values, helpers: FormikHelpers<TUser>) => {
      try {
        await updateUser({
          variables: {
            id: values.id,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            telephone: values.telephone,
            roleId: Number(values.role?.id),
          },
        })
        enqueueSnackbar('Usuario editado correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
        setSelected([])
      } catch (error) {
        console.error(error)
        enqueueSnackbar('El usuario no pudo ser editado.', { variant: 'error' })
      }
    },
    validationSchema: userSchema,
  })

  const { loading } = useQuery(GET_USER, {
    variables: {
      id: userId,
    },
    skip: !userId,
    onCompleted: (data) => {
      const { user } = data
      if (user) {
        formik.setValues({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          telephone: user.telephone,
          role: roles.find((role) => role.id === Number(user.roleId)) || null,
          file: null,
        })
      }
    },
  })

  const handleDropAvatar = useCallback(
    (acceptedFiles: (File | null)[]) => {
      const newFile = acceptedFiles[0]
      if (newFile) {
        formik.setFieldValue(
          'file',
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        )
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
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editar usuario
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <UploadAvatar
            file={formik.values.file}
            onDrop={handleDropAvatar}
            validator={(fileData: File) => {
              if (fileData.size > 1000000) {
                return {
                  code: 'file-too-large',
                  message: `File is larger than ${fData(1000000)}`,
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
                <br /> Max {fData(3145728)}
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
                  disabled={loading}
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
                  id="telephone"
                  name="telephone"
                  label="Telefono"
                  variant="outlined"
                  fullWidth
                  value={formik.values.telephone}
                  error={Boolean(formik.errors.telephone)}
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
                  >
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
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
