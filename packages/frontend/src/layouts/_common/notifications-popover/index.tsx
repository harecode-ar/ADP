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
import {
  READ_NOTIFICATIONS,
  REMOVE_NOTIFICATIONS,
  UNREAD_NOTIFICATIONS,
} from 'src/graphql/mutations'
import NotificationItem from './notification-item'
import DeleteModal from './delete-modal'

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
  const deleteModal = useBoolean()

  const notificationQuery = useQuery(GET_NOTIFICATIONS, {
    pollInterval: 30 * 1000,
  })

  const [readNotifications] = useMutation(READ_NOTIFICATIONS, {
    onCompleted: () => {
      notificationQuery.refetch()
    },
  })

  const [unreadNotifications] = useMutation(UNREAD_NOTIFICATIONS, {
    onCompleted: () => {
      notificationQuery.refetch()
    },
  })

  const [removeNotifications] = useMutation(REMOVE_NOTIFICATIONS, {
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

  const [readedNotifications, unreadedNotifications] = useMemo(
    () => [
      notifications.filter((notification) => notification.read),
      notifications.filter((notification) => !notification.read),
    ],
    [notifications]
  )

  useEffect(() => {
    if (
      unreadedNotifications.length > 0 &&
      checkForNewNotifications(prevNotifications || [], notifications)
    ) {
      enqueueSnackbar('Tienes nuevas notificaciones', {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [notifications, prevNotifications, unreadedNotifications.length, enqueueSnackbar])

  const drawer = useBoolean()

  const smUp = useResponsive('up', 'sm')

  const [currentTab, setCurrentTab] = useState('unread')
  const [selected, setSelected] = useState<INotification[]>([])

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
  }, [])

  const handleMarkSelectedAsRead = () => {
    readNotifications({
      variables: {
        ids: selected.map((notification) => notification.id),
      },
    })
    setSelected([])
  }

  const handleMarkSelectedAsUnread = () => {
    unreadNotifications({
      variables: {
        ids: selected.map((notification) => notification.id),
      },
    })
    setSelected([])
  }

  const handleRemoveSelected = () => {
    removeNotifications({
      variables: {
        ids: selected.map((notification) => notification.id),
      },
    })
    setSelected([])
    deleteModal.onFalse()
  }

  const handleSelectAll = () => {
    if (currentTab === 'all') {
      setSelected(notifications)
    } else if (currentTab === 'unread') {
      setSelected(unreadedNotifications)
    } else if (currentTab === 'read') {
      setSelected(readedNotifications)
    }
  }

  const handleDesselect = () => {
    setSelected([])
  }

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
        count: unreadedNotifications.length,
      },
      {
        value: 'read',
        label: 'Leídas',
        count: readedNotifications.length,
      },
    ],
    [notifications, readedNotifications, unreadedNotifications]
  )

  const someSelectedReadedNotification = useMemo(
    () => selected.some((notification) => notification.read),
    [selected]
  )
  const someSelectedUnreadedNotification = useMemo(
    () => selected.some((notification) => !notification.read),
    [selected]
  )

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notificaciones
      </Typography>

      <Tooltip title="Marcar seleccionadas como leídas">
        <IconButton
          color="primary"
          onClick={handleMarkSelectedAsRead}
          disabled={!someSelectedUnreadedNotification}
        >
          <Iconify icon="eva:done-all-fill" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Marcar seleccionadas como no leídas">
        <IconButton
          color="primary"
          onClick={handleMarkSelectedAsUnread}
          disabled={!someSelectedReadedNotification}
        >
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Eliminar seleccionadas">
        <IconButton color="error" onClick={deleteModal.onTrue} disabled={!(selected.length > 0)}>
          <Iconify icon="eva:trash-2-fill" />
        </IconButton>
      </Tooltip>

      {selected.length === 0 && (
        <Tooltip title="Seleccionar todas">
          <IconButton
            color="primary"
            onClick={handleSelectAll}
            disabled={!(notifications.length > 0)}
          >
            <Iconify icon="material-symbols:select" />
          </IconButton>
        </Tooltip>
      )}

      {selected.length > 0 && (
        <Tooltip title="Desmarcar todas">
          <IconButton color="primary" onClick={handleDesselect}>
            <Iconify icon="mdi:select-remove" />
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
              variant={(tab.value === currentTab && 'filled') || 'soft'}
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
          (currentTab === 'unread' && unreadedNotifications) ||
          (currentTab === 'read' && readedNotifications) ||
          notifications
        ).map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            checked={!!selected.find((n) => n.id === notification.id)}
            setSelected={setSelected}
          />
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
        <Badge badgeContent={unreadedNotifications.length} color="error">
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
      </Drawer>

      <DeleteModal modal={deleteModal} onDelete={handleRemoveSelected} />
    </React.Fragment>
  )
}
