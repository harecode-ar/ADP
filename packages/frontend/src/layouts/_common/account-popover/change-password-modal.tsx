import React from 'react'
import { Typography, Button, Modal, Box, TextField, Grid, Backdrop } from '@mui/material'
import { useFormik, FormikHelpers } from 'formik'
import Iconify from 'src/components/iconify'
// import * as Yup from 'yup'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'

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

// const areaSchema = Yup.object().shape({
//   actualPassword: Yup.string().required('Nombre requerido'),
// })

type TProps = {
  modal: ReturnType<typeof useBoolean>

}

type TformikValues = {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
};

const ChangePasswordModal = (props: TProps) => {
  // const router = useRouter()
  // const [createArea] = useMutation(CREATE_AREA)
  const { modal } = props
  const { enqueueSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    },
    onSubmit: async (
      values,
      helpers: FormikHelpers<TformikValues>
    ) => {
      try {
        console.log('values: ',values)
        console.log('contrasenia enviada')
    //     await createArea({
    //       variables: {
    //         newPass: values.newPassword,
    //         description: values.description,
    //         rolename: 'prueba',
    //         multiple: false,
    //       },
    //     })
          enqueueSnackbar('Contraseña modificada exitosamente.', { variant: 'success' })
          helpers.resetForm()
          modal.onFalse()
    //     router.push(paths.dashboard.root)
    //     refetch()
    } catch (error) {
        console.error(error)
        enqueueSnackbar('la contraseña no pudo ser cambiada.', { variant: 'error' })
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
              type="password"
              value={formik.values.currentPassword}
              error={Boolean(formik.errors.currentPassword)}
              helperText={formik.errors.currentPassword}
              onChange={formik.handleChange}
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
              type="password"
              value={formik.values.newPassword}
              error={Boolean(formik.errors.newPassword)}
              helperText={formik.errors.newPassword}
              onChange={formik.handleChange}
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
              type="password"
              value={formik.values.repeatPassword}
              error={Boolean(formik.errors.repeatPassword)}
              helperText={formik.errors.repeatPassword}
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
