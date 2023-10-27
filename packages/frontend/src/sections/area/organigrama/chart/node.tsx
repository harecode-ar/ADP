import React from 'react'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Theme, SxProps } from '@mui/material/styles'
import Iconify from 'src/components/iconify'
import CustomPopover, { usePopover } from 'src/components/custom-popover'
import type { TAreaTree } from 'src/contexts/area-tree-context/types'

// ----------------------------------------------------------------------

type Props = {
  node: TAreaTree
  onEdit?: VoidFunction
  onDelete?: VoidFunction
  onAdd?: VoidFunction
  sx?: SxProps<Theme>
}

export default function Node({ node, onEdit, onDelete, onAdd, sx }: Props) {
  const popover = usePopover()
  const responsible = node.responsible ? node.responsible.fullname : 'Sin responsable'

  return (
    <React.Fragment>
      <Card
        sx={{
          p: 2,
          minWidth: 200,
          borderRadius: 1.5,
          textAlign: 'left',
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          textTransform: 'capitalize',
          ...sx,
        }}
      >
        <IconButton
          color={popover.open ? 'inherit' : 'default'}
          onClick={popover.onOpen}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>

        <Avatar
          alt={responsible}
          src="/assets/images/avatar/avatar_2.jpg"
          sx={{ mr: 2, mb: 1, width: 48, height: 48 }}
        />

        <Typography variant="subtitle2" noWrap>
          {node.name}
        </Typography>

        <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
          {responsible}
        </Typography>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="left-center"
        sx={{ width: 160 }}
      >
        {onAdd && (
          <MenuItem
            onClick={() => {
              popover.onClose()
              onAdd()
            }}
          >
            <Iconify icon="ic:baseline-plus" />
            Nuevo
          </MenuItem>
        )}

        {onEdit && (
          <MenuItem
            onClick={() => {
              popover.onClose()
              onEdit()
            }}
          >
            <Iconify icon="mdi:pencil" />
            Editar
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem
            onClick={() => {
              popover.onClose()
              onDelete()
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="mdi:trash" />
            Eliminar
          </MenuItem>
        )}
      </CustomPopover>
    </React.Fragment>
  )
}
