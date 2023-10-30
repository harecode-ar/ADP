'use client'

import React, { useMemo } from 'react'
import { Typography, Button, Modal, Box, TextField, Grid, Backdrop, Autocomplete } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER } from 'src/graphql/queries'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import { useTable } from 'src/components/table'
import * as Yup from 'yup'
import { UPDATE_USER } from 'src/graphql/mutations'

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
  roleId: Yup.number().required('Rol requerido'),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
}

type TUser = {
  id: number | null
  firstname: string | null
  lastname: string | null
  email: string | null
  telephone: string | null
  roleId: number | null
}

const ModalEdit = (props: TProps) => {
  const { modal, refetch } = props
  const { enqueueSnackbar } = useSnackbar()
  const { selected, setSelected } = useTable()
  const [updateUser] = useMutation(UPDATE_USER)
  const userId = useMemo(() => Number(selected[0]), [selected])

  const formik = useFormik({
    initialValues: {
      id: null,
      firstname: '',
      lastname: '',
      email: '',
      password: '123',
      telephone: '',
      roleId: null,
    } as TUser,
    onSubmit: async (values, helpers: FormikHelpers<TUser>) => {
      try {
        await updateUser({
          variables: {
            id: userId,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: '123',
            telephone: values.telephone,
            roleId: Number(values.roleId),
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
      console.log('userrrrrrr', user)
      if (user) {
        formik.setValues({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          telephone: user.telephone,
          roleId: user.roleId,
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
          Editar usuario
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                  // helperText={formik.errors.firstname}
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
                  // helperText={formik.errors.lastname}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="roleId"
                  name="roleId"
                  label="Role ID"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.roleId}
                  error={Boolean(formik.errors.roleId)}
                  onChange={formik.handleChange}
                />
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={formik.values.roleId}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Movie" />}
                /> */}
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
                  // helperText={formik.errors.telephone}
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
                  // helperText={formik.errors.email}
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
                  <Button onClick={() => {
                    modal.onFalse()
                    formik.resetForm()
                  }} color="primary" variant="outlined">
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
