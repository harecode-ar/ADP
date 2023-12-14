import React from 'react'
import { Card, Avatar, Typography } from '@mui/material'
import { Theme, SxProps } from '@mui/material/styles'
import type { TAreaTree } from 'src/contexts/area-tree-context/types'
import { getStorageFileUrl } from 'src/utils/storage'

// ----------------------------------------------------------------------

type Props = {
  node: TAreaTree
  sx?: SxProps<Theme>
}

export default function Node({ node, sx }: Props) {
  const responsible = node.responsible ? node.responsible.fullname : 'Sin responsable'

  return (
    <Card
      sx={{
        p: 2,
        width: 180,
        borderRadius: 1.5,
        textAlign: 'left',
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        textTransform: 'capitalize',
        ...sx,
      }}
    >
      <Avatar
        alt={responsible}
        src={
          node?.responsible?.image
            ? getStorageFileUrl(node.responsible.image)
            : '/broken-image.jpg'
        }
        sx={{ mr: 2, mb: 1, width: 48, height: 48 }}
      />

      <Typography variant="subtitle2">{node.name}</Typography>

      <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
        {responsible}
      </Typography>
    </Card>
  )
}
