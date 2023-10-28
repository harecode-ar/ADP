'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'src/components/snackbar'
import { yupResolver } from '@hookform/resolvers/yup';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks'
import { SentIcon } from 'src/assets/icons';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useMutation } from '@apollo/client'
import { NEW_PASSWORD } from 'src/graphql/mutations'

const newPasswordSchema = Yup.object().shape({
  email: Yup.string().required('El email es requerido').email('El email debe ser una direccion valida'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .required('La confirmacion de contraseña es requerida')
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
});

type TProps = {
  token: string
}

export default function ClassicNewPasswordView(props: TProps) {

  const { token } = props
  const [newPassword] = useMutation(NEW_PASSWORD)
  const showPassword = useBoolean();
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(newPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await newPassword({
        variables: {
          token,
          email: data.email,
          password: data.password,
        },
      })
      enqueueSnackbar('Se ha actualizado la contraseña', {
        variant: 'success',
      })
      router.push(paths.auth.login)
    } catch (error) {
      enqueueSnackbar(typeof error === 'string' ? error : error.message, {
        variant: 'error',
      })
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField
        name="email"
        label="Email"
      />

      <RHFTextField
        name="password"
        label="Nueva contraseña"
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

      <RHFTextField
        name="confirmPassword"
        label="Repetir nueva contraseña"
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
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Actualizar contraseña
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
  );

  const renderHead = (
    <>
      <SentIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Cambio de contraseña</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Escriba su email y la nueva contraseña
          <br />
          que desea utilizar
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
