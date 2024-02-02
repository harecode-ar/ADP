'use client'

import React, { useCallback } from 'react'
import { Box, Button, CircularProgress, Container, Stack } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { useLazyQuery } from '@apollo/client'
import { useSnackbar } from 'src/components/snackbar'
import {
  CALCULATE_ACP_CRON,
  GENERATE_ACP_NOTIFICATION_CRON,
  REMOVE_UNUSED_CONTACTS_CRON,
  REMOVE_UNUSED_NOTIFICATIONS_CRON,
  SET_TASK_STATE_CRON,
} from 'src/graphql/queries'
import { paths } from 'src/routes/paths'
import { usePrint } from 'src/hooks/use-print'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'

enum ECron {
  CALCULATE_ACP = 'Calcular ACP',
  GENERATE_ACP_NOTIFICATION = 'Generar notificaciones de ACP',
  REMOVE_UNUSED_CONTACTS = 'Eliminar contactos no utilizados',
  REMOVE_UNUSED_NOTIFICATIONS = 'Eliminar notificaciones no utilizadas',
  SET_TASK_STATE = 'Actualizar estado de tareas',
}

type TCronButtonProps = {
  cron: ECron
  loading: boolean
}

const formatMs = (ms: number): string => {
  if (ms < 1000) {
    return `${ms} milisegundos`
  }
  if (ms < 60000) {
    return `${Math.round(ms / 1000)} segundos`
  }
  return `${Math.round(ms / 60000)} minutos`
}

export default function ConfigurationView() {
  const [ref] = usePrint()
  const settings = useSettingsContext()
  const [loading, setLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const [calculateAcpCron] = useLazyQuery(CALCULATE_ACP_CRON)
  const [generateAcpNotificationCron] = useLazyQuery(GENERATE_ACP_NOTIFICATION_CRON)
  const [removeUnusedContactsCron] = useLazyQuery(REMOVE_UNUSED_CONTACTS_CRON)
  const [removeUnusedNotificationsCron] = useLazyQuery(REMOVE_UNUSED_NOTIFICATIONS_CRON)
  const [setTaskStateCron] = useLazyQuery(SET_TASK_STATE_CRON)

  const handleCron = async (cron: ECron) => {
    const currentDate = new Date()
    setLoading(true)
    switch (cron) {
      case ECron.CALCULATE_ACP:
        await calculateAcpCron()
        break
      case ECron.GENERATE_ACP_NOTIFICATION:
        await generateAcpNotificationCron()
        break
      case ECron.REMOVE_UNUSED_CONTACTS:
        await removeUnusedContactsCron()
        break
      case ECron.REMOVE_UNUSED_NOTIFICATIONS:
        await removeUnusedNotificationsCron()
        break
      case ECron.SET_TASK_STATE:
        await setTaskStateCron()
        break
      default:
        break
    }
    const newDate = new Date()
    const diff = newDate.getTime() - currentDate.getTime()
    setLoading(false)
    const formattedDiff = formatMs(diff)
    enqueueSnackbar(`Cron ${cron} ejecutado en ${formattedDiff}`, { variant: 'success' })
  }

  const CronButton = useCallback((props: TCronButtonProps) => {
    const { cron } = props
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCron(cron)}
        disabled={props.loading}
      >
        {props.loading && <CircularProgress size={24} color="inherit" thickness={5} />}
        {cron}
      </Button>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CustomBreadcrumbs
          heading="Cron"
          links={[{ name: 'Tablero', href: paths.dashboard.root }, { name: 'Cron' }]}
          action={null}
        />

        <Stack spacing={2}>
          <CronButton cron={ECron.CALCULATE_ACP} loading={loading} />
          <CronButton cron={ECron.GENERATE_ACP_NOTIFICATION} loading={loading} />
          <CronButton cron={ECron.REMOVE_UNUSED_CONTACTS} loading={loading} />
          <CronButton cron={ECron.REMOVE_UNUSED_NOTIFICATIONS} loading={loading} />
          <CronButton cron={ECron.SET_TASK_STATE} loading={loading} />
        </Stack>
      </Box>
    </Container>
  )
}
