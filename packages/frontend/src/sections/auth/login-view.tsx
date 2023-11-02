'use client'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import { RouterLink } from 'src/routes/components'
import { paths } from 'src/routes/paths'
import { useSearchParams, useRouter } from 'src/routes/hooks'
import { NEXT_PUBLIC_DEFAULT_EMAIL, NEXT_PUBLIC_DEFAULT_PASSWORD, PATH_AFTER_LOGIN } from 'src/config-global'
import { useBoolean } from 'src/hooks/use-boolean'
import { useAuthContext } from 'src/auth/hooks'
import Iconify from 'src/components/iconify'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import { Box } from '@mui/material'

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email es requerido').email('Email debe ser una direccion valida'),
  password: Yup.string().required('Contraseña es requerida'),
})

export default function JwtLoginView() {
  const { login } = useAuthContext()
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo')
  const showPassword = useBoolean()
  const defaultValues = {
    email: NEXT_PUBLIC_DEFAULT_EMAIL,
    password: NEXT_PUBLIC_DEFAULT_PASSWORD,
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password)

      router.push(returnTo || PATH_AFTER_LOGIN)
    } catch (error) {
      console.error(error)
      reset()
      setErrorMsg(typeof error === 'string' ? error : error.message)
    }
  })

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Iniciar sesión</Typography>
    </Stack>
  )

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email" />

      <RHFTextField
        name="password"
        label="Contraseña"
        type={showPassword.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={showPassword.onToggle} edge="end">
                <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Iniciar sesión
      </LoadingButton>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link
          variant="body2"
          color="inherit"
          underline="always"
          component={RouterLink}
          href={paths.auth.forgotPassword}
          sx={{ alignSelf: 'flex-end' }}
        >
          ¿Olvidó su contase&ntilde;a?
        </Link>
      </Box>
    </Stack>
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {renderForm}
    </FormProvider>
  )
}
