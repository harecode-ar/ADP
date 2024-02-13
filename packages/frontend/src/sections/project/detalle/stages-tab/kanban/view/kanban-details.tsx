'use client'

import { IStage, IProject, TASK_STATE, TASK_STATE_NAME } from '@adp/shared'
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
import { GET_STAGE, GET_STAGES_ASSIGNED_TO_USER } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import { ERROR, INFO, WARNING } from 'src/theme/palette'
import { paths } from 'src/routes/paths'
import ModalFinishStage from 'src/sections/project/detalle/stages-tab/kanban/view/modal-finish-stage'
import ModalStartTask from 'src/sections/stage/detail/sub-stages-tab/kanban/view/modal-start-task'
import ModalCancelStage from 'src/sections/stage/detail/modal-cancel-stage'
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
  if (name === TASK_STATE_NAME.NEW) {
    return 'info'
  }
  if (name === TASK_STATE_NAME.IN_PROGRESS) {
    return 'warning'
  }
  if (name === TASK_STATE_NAME.ON_HOLD) {
    return 'warning'
  }
  if (name === TASK_STATE_NAME.COMPLETED) {
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
  const modalStartTask = useBoolean()
  const modalFinishStage = useBoolean()
  const modalCancelTask = useBoolean()

  const stageQuery = useQuery(GET_STAGE, {
    variables: {
      id: stageId,
    },
    skip: !stageId,
  })

  const isStageAssignedToUserQuery = useQuery(GET_STAGES_ASSIGNED_TO_USER, {
    variables: {
      id: stageId,
    },
    skip: !stageId,
  })

  const refetch = () => {
    stagesRefetch()
    isStageAssignedToUserQuery.refetch()
    stageQuery.refetch()
  }

  const stage: IStage | null = useMemo(() => {
    if (!stageQuery.data) return null
    return stageQuery.data.stage
  }, [stageQuery.data])

  const isStageAssignedToUser: boolean = useMemo(() => {
    if (!isStageAssignedToUserQuery.data) return false
    return isStageAssignedToUserQuery.data.stageAssignedToUser
  }, [isStageAssignedToUserQuery.data])

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
          {stage.stateId === TASK_STATE.NEW && isStageAssignedToUser && (
            <Tooltip title="Cancelar etapa">
              <IconButton onClick={modalCancelTask.onTrue} color="error">
                <Iconify icon="material-symbols:cancel" />
              </IconButton>
            </Tooltip>
          )}
          {stage.stateId === TASK_STATE.IN_PROGRESS && isStageAssignedToUser && (
            <Tooltip title="Finalizar etapa">
              <IconButton onClick={modalFinishStage.onTrue} color="primary">
                <Iconify icon="lets-icons:done-ring-round" />
              </IconButton>
            </Tooltip>
          )}
          {stage.stateId === TASK_STATE.ON_HOLD && isStageAssignedToUser && (
            <Tooltip title="Comenzar etapa">
              <IconButton onClick={modalStartTask.onTrue} color="primary">
                <Iconify icon="mdi:stopwatch-start-outline" />
              </IconButton>
            </Tooltip>
          )}
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
          {stage &&
            stage.stateId !== TASK_STATE.CANCELLED &&
            stage.stateId !== TASK_STATE.COMPLETED && (
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
                {stage?.progress !== null ? (stage.progress * 100).toFixed(0) : '0'}%
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
      {modalFinishStage.value && (
        <ModalFinishStage modal={modalFinishStage} stageId={stage.id} refetch={refetch} />
      )}
      {modalStartTask.value && (
        <ModalStartTask
          modal={modalStartTask}
          project={null}
          stage={stage || null}
          subStage={null}
          refetch={refetch}
        />
      )}
      {modalCancelTask.value && (
        <ModalCancelStage modal={modalCancelTask} stage={stage} refetch={refetch} />
      )}
    </Drawer>
  )
}
