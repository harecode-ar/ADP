'use client'

import { IStage, TASK_STATE, TASK_STATE_NAME } from '@adp/shared'
import React, { useMemo } from 'react'
import NextLink from 'next/link'
import Scrollbar from 'src/components/scrollbar'
import {
  Tooltip,
  IconButton,
  Button,
  Box,
  Avatar,
  Typography,
  TextField,
  Stack,
  Divider,
  Drawer,
  Link,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useBoolean } from 'src/hooks/use-boolean'
import { GET_STAGES_ASSIGNED_TO_USER, GET_SUB_STAGE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths'
import ModalCancelSubStage from 'src/sections/sub-stage/detail/modal-cancel-sub-stage'
import ModalDelete from './modal-delete'
import ModalEdit from './modal-edit'
import KanbanDetailsCommentInput from './kanban-details-comment-input'
import KanbanDetailsCommentList from './kanban-details-comment-list'
import ModalStartTask from './modal-start-task'
import ModalFinishSubStage from './modal-finish-sub-stage'

// ----------------------------------------------------------------------

type TProps = {
  stage: IStage
  subStageItem: IStage
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

export default function KanbanDetails(props: TProps) {
  const { stage, subStageItem, openDetails, onCloseDetails, refetch: stagesRefetch } = props
  const modalDelete = useBoolean()
  const modalEdit = useBoolean()
  const modalStartTask = useBoolean()
  const modalFinishSubStage = useBoolean()
  const modalCancelSubStage = useBoolean()

  const stageQuery = useQuery(GET_SUB_STAGE, {
    variables: {
      id: subStageItem.id,
    },
    skip: !subStageItem.id,
  })

  const isStageAssignedToUserQuery = useQuery(GET_STAGES_ASSIGNED_TO_USER, {
    variables: {
      id: Number(subStageItem.id),
    },
    skip: !subStageItem.id,
  })

  const refetch = () => {
    stagesRefetch()
    stageQuery.refetch()
    isStageAssignedToUserQuery.refetch()
  }

  const subStage: IStage | null = useMemo(() => {
    if (!stageQuery.data) return null
    return stageQuery.data.subStage
  }, [stageQuery.data])

  const isStageAssignedToUser: boolean = useMemo(() => {
    if (!isStageAssignedToUserQuery.data) return false
    return isStageAssignedToUserQuery.data.stageAssignedToUser
  }, [isStageAssignedToUserQuery.data])

  if (!subStage) return null

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
        <Button size="small" variant="soft" color={getColorVariant(subStage.state.name)}>
          {subStage.state.name}
        </Button>
        <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
          {subStage.stateId === TASK_STATE.NEW && isStageAssignedToUser && (
            <Tooltip title="Cancelar sub etapa">
              <IconButton onClick={modalCancelSubStage.onTrue} color="error">
                <Iconify icon="material-symbols:cancel" />
              </IconButton>
            </Tooltip>
          )}
          {subStage.stateId === TASK_STATE.IN_PROGRESS && isStageAssignedToUser && (
            <Tooltip title="Finalizar etapa">
              <IconButton onClick={modalFinishSubStage.onTrue} color="primary">
                <Iconify icon="lets-icons:done-ring-round" />
              </IconButton>
            </Tooltip>
          )}
          {subStage.stateId === TASK_STATE.ON_HOLD && isStageAssignedToUser && (
            <Tooltip title="Comenzar sub etapa">
              <IconButton onClick={modalStartTask.onTrue} color="primary">
                <Iconify icon="mdi:stopwatch-start-outline" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Detalle">
            <Link
              component={NextLink}
              href={paths.dashboard.subStage.detail.replace(':id', String(subStage.id))}
            >
              <IconButton>
                <Iconify icon="mdi:eye" />
              </IconButton>
            </Link>
          </Tooltip>

          {subStage &&
            subStage.stateId !== TASK_STATE.CANCELLED &&
            subStage.stateId !== TASK_STATE.COMPLETED && (
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
            {subStage.name}
          </Box>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Area</StyledLabel>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {subStage?.area?.name || 'Sin asignar'}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Responsable</StyledLabel>
            <Avatar alt={subStage?.responsible?.fullname} src="/broken-image.jpg" sx={{ mr: 2 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {subStage?.responsible?.fullname || 'Sin asignar'}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Fecha de inicio</StyledLabel>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {subStage?.startDate?.split('T')[0].split('-').reverse().join('/')}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Fecha de finalización</StyledLabel>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {subStage?.endDate?.split('T')[0].split('-').reverse().join('/')}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Descripción</StyledLabel>
            <TextField
              fullWidth
              multiline
              maxRows={10}
              size="small"
              value={subStage?.description || 'Sin descripción'}
              InputProps={{ readOnly: true, sx: { typography: 'body2' } }}
            />
          </Stack>
        </Stack>

        {!!subStage.notes?.length && <KanbanDetailsCommentList notes={subStage.notes} />}
      </Scrollbar>
      <KanbanDetailsCommentInput stageId={subStage.id} refetch={refetch} />
      {modalEdit.value && (
        <ModalEdit modal={modalEdit} stage={stage} subStage={subStage} refetch={refetch} />
      )}
      <ModalDelete modal={modalDelete} stageId={subStage.id} refetch={refetch} />
      {modalStartTask.value && (
        <ModalStartTask
          modal={modalStartTask}
          project={null}
          stage={null}
          subStage={subStage || null}
          refetch={refetch}
        />
      )}
      {modalFinishSubStage.value && (
        <ModalFinishSubStage
          modal={modalFinishSubStage}
          subStageId={subStage.id}
          refetch={refetch}
        />
      )}
      {modalCancelSubStage.value && (
        <ModalCancelSubStage modal={modalCancelSubStage} stage={subStage} refetch={refetch} />
      )}
    </Drawer>
  )
}
