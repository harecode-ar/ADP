import type { INotification } from '@adp/shared'
import { m } from 'framer-motion'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import {
  Tab,
  Tabs,
  List,
  Stack,
  Badge,
  Drawer,
  Divider,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'
import { useSnackbar } from 'src/components/snackbar'
import { usePrevious } from 'src/hooks/use-previous'
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import Scrollbar from 'src/components/scrollbar'
import { varHover } from 'src/components/animate'
import { GET_NOTIFICATIONS } from 'src/graphql/queries'
import { READ_ALL_NOTIFICATIONS } from 'src/graphql/mutations'
import NotificationItem from './notification-item'

// ----------------------------------------------------------------------

type TTab = {
  value: 'all' | 'unread' | 'read'
  label: string
  count: number
}

const checkForNewNotifications = (prev: INotification[], next: INotification[]) => {
  if (prev.length < next.length) return true
  return next.every((notification) => {
    const prevNotification = prev.find((p) => p.id === notification.id)
    return !prevNotification
  })
}

export default function NotificationsPopover() {
  const { enqueueSnackbar } = useSnackbar()

  const notificationQuery = useQuery(GET_NOTIFICATIONS, {
    pollInterval: 30 * 1000,
  })

  const [readAllNotifications] = useMutation(READ_ALL_NOTIFICATIONS, {
    onCompleted: () => {
      notificationQuery.refetch()
    },
  })

  const notifications: INotification[] = useMemo(() => {
    if (notificationQuery.data) {
      return notificationQuery.data.notifications
    }
    return []
  }, [notificationQuery.data])

  const prevNotifications = usePrevious(notifications)

  useEffect(() => {
    if (checkForNewNotifications(prevNotifications || [], notifications)) {
      enqueueSnackbar('Tienes nuevas notificaciones', {
        variant: 'info',
      })
    }
  }, [notifications, prevNotifications, enqueueSnackbar])

  const drawer = useBoolean()

  const smUp = useResponsive('up', 'sm')

  const [currentTab, setCurrentTab] = useState('unread')

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
  }, [])

  const handleMarkAllAsRead = () => {
    readAllNotifications()
  }

  const [readNotifications, unreadNotifications] = useMemo(
    () => [
      notifications.filter((notification) => notification.read),
      notifications.filter((notification) => !notification.read),
    ],
    [notifications]
  )

  const tabs: TTab[] = useMemo(
    () => [
      {
        value: 'all',
        label: 'Todas',
        count: notifications.length,
      },
      {
        value: 'unread',
        label: 'No leídas',
        count: unreadNotifications.length,
      },
      {
        value: 'read',
        label: 'Leídas',
        count: readNotifications.length,
      },
    ],
    [notifications, readNotifications, unreadNotifications]
  )

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notificaciones
      </Typography>

      {unreadNotifications.length > 0 && (
        <Tooltip title="Marcar todo como leído">
          <IconButton color="primary" onClick={handleMarkAllAsRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  )

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
              color={
                (tab.value === 'unread' && 'info') ||
                (tab.value === 'read' && 'success') ||
                'default'
              }
            >
              {tab.count}
            </Label>
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  )

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {(
          (currentTab === 'unread' && unreadNotifications) ||
          (currentTab === 'read' && readNotifications) ||
          notifications
        ).map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </List>
    </Scrollbar>
  )

  return (
    <React.Fragment>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={unreadNotifications.length} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
        </Stack>

        <Divider />

        {renderList}

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth size="large">
            View All
          </Button>
        </Box> */}
      </Drawer>
    </React.Fragment>
  )
}
