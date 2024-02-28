// @mui
import { alpha, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
// auth
import { useAuthContext } from 'src/auth/hooks'
// routes
import { paths } from 'src/routes/paths'
import { RouterLink } from 'src/routes/components'
// hooks
import { useResponsive } from 'src/hooks/use-responsive'
// theme
import { bgGradient } from 'src/theme/css'

// ----------------------------------------------------------------------

const METHODS = [
  {
    id: 'jwt',
    label: 'GoDevs',
    path: paths.auth.login,
    icon: '/assets/icons/auth/godevs.svg',
  },
]

type Props = {
  title?: string
  image?: string
  children: React.ReactNode
}

export default function AuthClassicLayout({ children, image, title }: Props) {
  const { method } = useAuthContext()

  const theme = useTheme()

  const mdUp = useResponsive('up', 'md')

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  )

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
        {title || 'Bienvenido'}
      </Typography>

      <Box
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/logo-gestor.png'}
        sx={{
          maxWidth: {
            xs: 480,
            lg: 560,
            xl: 720,
          },
        }}
      />

      <Stack direction="row" spacing={2}>
        {METHODS.map((option) => (
          <Tooltip key={option.label} title={option.label}>
            <Link component={RouterLink} href={option.path}>
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{
                  width: 96,
                  height: 96,
                  ...(method !== option.id && {
                    filter: 'grayscale(100%)',
                  }),
                }}
              />
            </Link>
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  )

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {mdUp && renderSection}

      {renderContent}
    </Stack>
  )
}
