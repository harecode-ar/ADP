'use client'

import React, { useMemo, useState } from 'react'
import { IUser } from '@adp/shared'
import {
  Box,
  Container,
  Card,
  Tab,
  Tabs,
  ListItemText,
  Stack,
  IconButton,
  Avatar,
  Divider,
  Typography,
} from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { usePrint } from 'src/hooks/use-print'
import { GET_USER_FOR_DETAIL } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import AvatarShape from 'src/assets/illustrations/avatar-shape'
import Iconify from 'src/components/iconify'
import { _socials } from 'src/_mock'
import { getStorageFileUrl } from 'src/utils/storage'
import AssignmentUserTab from './assignment-user-tab'
import AreasTab from './areas-tab'

enum ETab {
  ASSIGNMENT = 'Asignaciones',
  AREAS = 'Áreas',
}

type TProps = {
  userId: string
}

export default function UserDetailView(props: TProps) {
  const { userId } = props
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [ref] = usePrint()
  const [tab, setTab] = useState<ETab>(ETab.ASSIGNMENT)
  const settings = useSettingsContext()

  const userQuery = useQuery(GET_USER_FOR_DETAIL, {
    variables: { id: Number(userId) },
    skip: !userId,
    onCompleted: (d) => {
      if (!d.userForDetail) {
        enqueueSnackbar('Usuario no encontrado', { variant: 'error' })
        router.push(paths.dashboard.user.root)
      }
    },
  })

  const user: IUser | null = useMemo(() => {
    if (!userQuery.data) return null
    return userQuery.data.userForDetail
  }, [userQuery.data])

  const handleCall = () => {
    if (!user || !user.phone) return
    window.open(`tel:${user.phone}`)
  }
  const handleSendEmail = () => {
    if (!user) return
    window.open(`mailto:${user.email}`)
  }

  const {
    color: pAcpColor,
    text: pAcpText,
    boolean: pAcpBoolean,
  } = useMemo(() => {
    if (user?.averageCompletition && user.averageCompletition.projectAcp !== null) {
      if (user.averageCompletition.projectAcp <= 0)
        return {
          color: 'success.main',
          text: `${Math.abs(user.averageCompletition.projectAcp * 100).toFixed(1)}%`,
          boolean: true,
        }
      if (user.averageCompletition.projectAcp > 0)
        return {
          color: 'error.main',
          text: `${Math.abs(user.averageCompletition.projectAcp * 100).toFixed(1)}%`,
          boolean: false,
        }
    }
    return {
      color: 'text.primary',
      text: 'No tiene proyectos finalizados',
      boolean: null,
    }
  }, [user])

  const {
    color: sAcpColor,
    text: sAcpText,
    boolean: sAcpBoolean,
  } = useMemo(() => {
    if (user?.averageCompletition && user.averageCompletition.stageAcp !== null) {
      if (user.averageCompletition.stageAcp <= 0)
        return {
          color: 'success.main',
          text: `${Math.abs(user.averageCompletition.stageAcp * 100).toFixed(1)}%`,
          boolean: true,
        }
      if (user.averageCompletition.stageAcp > 0)
        return {
          color: 'error.main',
          text: `${Math.abs(user.averageCompletition.stageAcp * 100).toFixed(1)}%`,
          boolean: false,
        }
    }
    return {
      color: 'text.primary',
      text: 'No tiene etapas finalizadas',
      boolean: null,
    }
  }, [user])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginBottom: 4,
        }}
      >
        <CustomBreadcrumbs
          heading="Detalle de Usuario"
          links={[{ name: 'Usuario', href: paths.dashboard.user.root }, { name: 'Detalle' }]}
        />
        <Card sx={{ textAlign: 'center', mx: 'auto', width: '100%' }}>
          <Box sx={{ position: 'relative' }}>
            <AvatarShape
              sx={{
                left: 0,
                right: 0,
                zIndex: 10,
                mx: 'auto',
                bottom: -26,
                position: 'absolute',
              }}
            />
            <Avatar
              alt={user?.firstname}
              src={getStorageFileUrl(user?.image ?? '/broken-image.jpg')}
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                left: 0,
                right: 0,
                bottom: -32,
                mx: 'auto',
                position: 'absolute',
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: 125,
                backgroundColor: 'primary.darker',
              }}
            />
          </Box>

          <ListItemText
            sx={{ mt: 7, mb: 1 }}
            primary={`${user?.firstname} ${user?.lastname}`}
            secondary={user?.role?.name}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
          />

          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
            {user?.phone && (
              <IconButton onClick={handleCall}>
                <Iconify icon="solar:phone-bold" />
              </IconButton>
            )}
            <IconButton onClick={handleSendEmail}>
              <Iconify icon="fluent:mail-24-filled" />
            </IconButton>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box
            sx={{ py: 3, typography: 'subtitle1', display: 'flex', justifyContent: 'space-evenly' }}
          >
            <Box>
              <Typography
                variant="caption"
                component="div"
                sx={{ mb: 0.5, color: 'text.secondary' }}
              >
                Finalizaci&oacute;n de proyectos
              </Typography>
              {pAcpBoolean !== null && (
                <Typography variant="caption" component="div" sx={{ color: 'text.primary' }}>
                  {pAcpBoolean ? 'Antes de lo estimado' : 'Después de lo estimado'}
                </Typography>
              )}
              <Typography variant="h5" component="div" sx={{ color: pAcpColor }}>
                {pAcpText}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                component="div"
                sx={{ mb: 0.5, color: 'text.secondary' }}
              >
                Finalizaci&oacute;n de etapas
              </Typography>
              {sAcpBoolean !== null && (
                <Typography variant="caption" component="div" sx={{ color: 'text.primary' }}>
                  {sAcpBoolean ? 'Antes de lo estimado' : 'Después de lo estimado'}
                </Typography>
              )}
              <Typography variant="h5" component="div" sx={{ color: sAcpColor }}>
                {sAcpText}
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card sx={{ p: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
              <Tab label={ETab.ASSIGNMENT} value={ETab.ASSIGNMENT} />
              <Tab label={ETab.AREAS} value={ETab.AREAS} />
            </Tabs>
          </Box>
        </Card>
        {user && tab === ETab.AREAS && <AreasTab user={user} />}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: tab === ETab.ASSIGNMENT ? 'block' : 'none' }}>
            <AssignmentUserTab />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
