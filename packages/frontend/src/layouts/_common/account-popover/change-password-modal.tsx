import React from 'react'
import { Typography, Button, Modal, Box, TextField, Grid, Backdrop } from '@mui/material'
import { useFormik, FormikHelpers } from 'formik'
import { useMutation} from '@apollo/client'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import IconButton from '@mui/material/IconButton'
import {UPDATE_PASSWORD} from 'src/graphql/mutations'
import * as Yup from 'yup'
import { useAuthContext } from 'src/auth/hooks'


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

type TProps = {
  modal: ReturnType<typeof useBoolean>
}

type TFormikValues = {
  currentPassword: string
  newPassword: string
  repeatPassword: string
}

const ChangePasswordModal = (props: TProps) => {

  const { user } = useAuthContext()
  const { modal } = props
  const { enqueueSnackbar } = useSnackbar()
  const [changePassword] = useMutation(UPDATE_PASSWORD)
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false)

  const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Es requerido'),
    newPassword: Yup.string()
      .required('Es requerido')
      .test(
        'notSamePass',
        'La contraseña nueva debe ser diferente a la anterior',
        (value, { parent }) => value !== parent.currentPassword
      ),
    repeatPassword: Yup.string()
      .required('Es requerido')
      .test(
        'samePass',
        'La contraseña nueva debe coincidir',
        (value, { parent }) => value === parent.newPassword
      ),
  })

  const togglePasswordVisibility = (field: any) => {
    switch (field) {
      case 'currentPassword':
        setShowCurrentPassword(!showCurrentPassword)
        break
      case 'newPassword':
        setShowNewPassword(!showNewPassword)
        break
      case 'repeatPassword':
        setShowRepeatPassword(!showRepeatPassword)
        break
      default:
        break
    }
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    },
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        if (!user?.email) return
        await changePassword({
          variables: {
            email: user.email,
            newPassword: values.newPassword,
            oldPassword: values.currentPassword
          },
        })
        enqueueSnackbar('Contraseña modificada exitosamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('la contraseña no pudo ser cambiada.', { variant: 'error' })
      }
    },
    validationSchema: changePasswordSchema,
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
          Cambiar Contraseña
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="currentPassword"
                  name="currentPassword"
                  label="Contraseña actual"
                  variant="outlined"
                  fullWidth
                  required
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={formik.values.currentPassword}
                  error={Boolean(formik.errors.currentPassword)}
                  helperText={formik.errors.currentPassword}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility('currentPassword')}
                        color="primary"
                      >
                        {showCurrentPassword ? (
                          <Iconify
                            icon="solar:eye-bold"
                            fontSize="small"
                            style={{ color: 'black' }}
                          />
                        ) : (
                          <Iconify
                            icon="solar:eye-closed-bold"
                            fontSize="small"
                            style={{ color: 'black' }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="newPassword"
                  name="newPassword"
                  label="Contraseña nueva"
                  variant="outlined"
                  fullWidth
                  required
                  type={showNewPassword ? 'text' : 'password'}
                  value={formik.values.newPassword}
                  error={Boolean(formik.errors.newPassword)}
                  helperText={formik.errors.newPassword}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility('newPassword')}
                        color="primary"
                      >
                        {showNewPassword ? (
                          <Iconify
                            icon="solar:eye-bold"
                            fontSize="small"
                            style={{ color: 'black' }}
                          />
                        ) : (
                          <Iconify
                            icon="solar:eye-closed-bold"
                            fontSize="small"
                            style={{ color: 'black' }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="repeatPassword"
                  name="repeatPassword"
                  label="Repetir contraseña"
                  variant="outlined"
                  fullWidth
                  required
                  type={showRepeatPassword ? 'text' : 'password'}
                  value={formik.values.repeatPassword}
                  error={Boolean(formik.errors.repeatPassword)}
                  helperText={formik.errors.repeatPassword}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility('repeatPassword')}
                        color="primary"
                      >
                        {showRepeatPassword ? (
                          <Iconify
                            icon="solar:eye-bold"
                            fontSize="small"
                            style={{ color: 'black' }}
                          />
                        ) : (
                          <Iconify
                            icon="solar:eye-closed-bold"
                            fontSize="small"
                            style={{ color: 'black' }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
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

export default ChangePasswordModal
