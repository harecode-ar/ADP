'use client'

import { IStage } from '@adp/shared'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Scrollbar from 'src/components/scrollbar'
import { Tooltip, IconButton, Button, Box, Avatar, Typography, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import Iconify from 'src/components/iconify'
import { ERROR, INFO, WARNING } from 'src/theme/palette'

// ----------------------------------------------------------------------

type TProps = {
  stage: IStage
  openDetails: boolean
  onCloseDetails: VoidFunction
}

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: 100,
  flexShrink: 0,
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightSemiBold,
}))

const getColorVariant = (name: string) => {
  if (name === 'Nuevo') {
    return 'info'
  }
  if (name === 'En progreso') {
    return 'warning'
  }
  if (name === 'Completado') {
    return 'primary'
  }
  return 'error'
}

const getColor = (progress: number) => {
  if (progress >= 0.6) {
    return INFO.main
  }
  if (progress > 0.3 && progress <= 0.6) {
    return WARNING.main
  }
  return ERROR.main
}

export default function KanbanDetails(props: TProps) {
  const { stage, openDetails, onCloseDetails } = props
  const color = getColor(stage.progress)

  return (
    <Drawer
      open={openDetails}
      onClose={onCloseDetails}
      anchor="right"
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 480,
          },
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: (theme) => theme.spacing(2.5, 1, 2.5, 2.5),
        }}
      >
        <Tooltip title="Back">
          <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>
        </Tooltip>
        <Button size="small" variant="soft" color={getColorVariant(stage.state.name)}>
          {stage.state.name}
        </Button>
        <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
          <Tooltip title="Editar">
            <IconButton>
              <Iconify icon="mdi:pencil" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Divider />
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            pt: 3,
            pb: 5,
            px: 2.5,
          }}
        >
          <Box
            sx={{
              py: 0.75,
              borderRadius: 1,
              typography: 'h6',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'transparent',
            }}
          >
            {stage.name}
          </Box>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Area</StyledLabel>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {stage?.area?.name || 'Sin asignar'}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Responsable</StyledLabel>
            <Avatar alt={stage?.responsible?.fullname} src="/broken-image.jpg" sx={{ mr: 2 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {stage?.responsible?.fullname || 'Sin asignar'}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Fecha de inicio</StyledLabel>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {stage?.startDate?.split('T')[0].split('-').reverse().join('/')}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Fecha de finalización</StyledLabel>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {stage?.endDate?.split('T')[0].split('-').reverse().join('/')}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Progreso</StyledLabel>
            <Typography color={color} variant="subtitle2" sx={{ fontWeight: 700 }}>
              {stage?.progress !== null ? stage.progress * 100 : '0'}%
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Descripción</StyledLabel>
            <TextField
              fullWidth
              multiline
              size="small"
              value={stage?.description || 'Sin descripción'}
              InputProps={{ readOnly: true, sx: { typography: 'body2' } }}
            />
          </Stack>
        </Stack>
      </Scrollbar>
    </Drawer>
  )
}
