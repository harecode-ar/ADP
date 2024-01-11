'use client'

import { IStage, IProject } from '@adp/shared'
import React, { useMemo } from 'react'
import NextLink from 'next/link'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Scrollbar from 'src/components/scrollbar'
import {
  Tooltip,
  IconButton,
  Button,
  Box,
  Avatar,
  Typography,
  TextField,
  Link,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useBoolean } from 'src/hooks/use-boolean'
import { GET_STAGE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import { ERROR, INFO, WARNING } from 'src/theme/palette'
import { paths } from 'src/routes/paths'
import ModalDelete from './modal-delete'
import ModalEdit from './modal-edit'
import KanbanDetailsCommentInput from './kanban-details-comment-input'
import KanbanDetailsCommentList from './kanban-details-comment-list'

// ----------------------------------------------------------------------

type TProps = {
  project: IProject
  stageId: number
  openDetails: boolean
  onCloseDetails: VoidFunction
  refetch: () => void
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
  const { project, stageId, openDetails, onCloseDetails, refetch: stagesRefetch } = props
  const modalDelete = useBoolean()
  const modalEdit = useBoolean()

  const stageQuery = useQuery(GET_STAGE, {
    variables: {
      id: stageId,
    },
    skip: !stageId,
  })

  const refetch = () => {
    stagesRefetch()
    stageQuery.refetch()
  }

  const stage: IStage | null = useMemo(() => {
    if (!stageQuery.data) return null
    return stageQuery.data.stage
  }, [stageQuery.data])

  if (!stage) return null
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
          <Tooltip title="Detalle">
            <Link
              component={NextLink}
              href={paths.dashboard.stage.detail.replace(':id', String(stageId))}
            >
              <IconButton>
                <Iconify icon="mdi:eye" />
              </IconButton>
            </Link>
          </Tooltip>
          {stage && stage.stateId !== 3 && stage.stateId !== 4 && (
            <Tooltip title="Editar">
              <IconButton onClick={modalEdit.onTrue}>
                <Iconify icon="mdi:pencil" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Eliminar">
            <IconButton onClick={modalDelete.onTrue}>
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
          {stage.hasStages ? (
            <Stack direction="row" alignItems="center">
              <StyledLabel>Progreso</StyledLabel>
              <Typography color={color} variant="subtitle2" sx={{ fontWeight: 700 }}>
                {stage?.progress !== null ? stage.progress * 100 : '0'}%
              </Typography>
            </Stack>
          ) : (
            ''
          )}
          <Stack direction="row" alignItems="center">
            <StyledLabel>Descripción</StyledLabel>
            <TextField
              fullWidth
              multiline
              maxRows={10}
              size="small"
              value={stage?.description || 'Sin descripción'}
              InputProps={{ readOnly: true, sx: { typography: 'body2' } }}
            />
          </Stack>
        </Stack>

        {!!stage.notes?.length && <KanbanDetailsCommentList notes={stage.notes} />}
      </Scrollbar>
      <KanbanDetailsCommentInput stageId={stage.id} refetch={stageQuery.refetch} />
      {modalEdit.value && (
        <ModalEdit modal={modalEdit} project={project} stage={stage} refetch={refetch} />
      )}
      <ModalDelete modal={modalDelete} stageId={stage.id} refetch={refetch} />
    </Drawer>
  )
}
