'use client'

import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'src/components/snackbar'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { paths } from 'src/routes/paths'
import { RouterLink } from 'src/routes/components'
import { PasswordIcon } from 'src/assets/icons'
import Iconify from 'src/components/iconify'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import { useMutation } from '@apollo/client'
import { FORGOT_PASSWORD } from 'src/graphql/mutations'

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('Email es requerido').email('Email debe ser una direccion valida'),
})

export default function ForgotPasswordView() {

  const [forgotPassword] = useMutation(FORGOT_PASSWORD)

  const { enqueueSnackbar } = useSnackbar()

  const defaultValues = {
    email: '',
  }

  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword({
        variables: {
          email: data.email,
        },
      })
      enqueueSnackbar('Se ha enviado un enlace de restablecimiento de contraseña a su correo electronico', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(typeof error === 'string' ? error : error.message, {
        variant: 'error',
      })
    }
  })

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Email" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Enviar enlace de restablecimiento
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Volver a inicio de sesion
      </Link>
    </Stack>
  )

  const renderHead = (
    <React.Fragment>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">¿Olvidó su contraseña?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Ingrese su direccion de email para recibir un enlace de restablecimiento de contraseña
        </Typography>
      </Stack>
    </React.Fragment>
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  )
}
