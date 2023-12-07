import { IChecklist } from '@adp/shared'
import { m } from 'framer-motion'
import React, { useMemo } from 'react'
import { IconButton, Stack, Typography, Divider, Drawer, Tooltip } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { paths } from 'src/routes/paths'
import { GET_USER_CHECKLISTS } from 'src/graphql/queries'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'
import { ChecklistItem } from './checklist-item'

export default function ChecklistPopover() {
  const drawer = useBoolean()
  const smUp = useResponsive('up', 'sm')
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const checklistQuery = useQuery(GET_USER_CHECKLISTS, {
    onCompleted: (d) => {
      if (!d.userChecklists) {
        enqueueSnackbar('Checklist no encontrado', { variant: 'error' })
        router.push(paths.dashboard.root)
      }
    },
  })

  const checklists: IChecklist[] = useMemo(() => {
    if (!checklistQuery.data) return []
    return checklistQuery.data.userChecklists
  }, [checklistQuery.data])

  return (
    <React.Fragment>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color="default"
        onClick={drawer.onTrue}
      >
        <Iconify icon="fluent:note-add-16-filled" width={24} />
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
        <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Checklist
          </Typography>

          <Tooltip title="Crear nuevo checklist">
            <IconButton onClick={() => null}>
              <Iconify icon="mdi:plus" />
            </IconButton>
          </Tooltip>

          {!smUp && (
            <IconButton onClick={drawer.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>
          )}
        </Stack>
        <Divider />

        <Stack
          sx={{
            p: 2.5,
          }}
          spacing={1}
        >
          {checklists?.map((checklist) => (
            <ChecklistItem
              key={checklist.id}
              checklist={checklist}
              refetch={checklistQuery.refetch}
            />
          ))}
        </Stack>
      </Drawer>
    </React.Fragment>
  )
}
