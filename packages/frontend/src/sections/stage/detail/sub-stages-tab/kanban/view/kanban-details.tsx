'use client'

import { IStage, STAGE_STATE } from '@adp/shared'
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
import { GET_SUB_STAGE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths'
import ModalDelete from './modal-delete'
import ModalEdit from './modal-edit'
import KanbanDetailsCommentInput from './kanban-details-comment-input'
import KanbanDetailsCommentList from './kanban-details-comment-list'
import ModalFinishSubStage from './modal-finish-substage'

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

export default function KanbanDetails(props: TProps) {
  const { stage, subStageItem, openDetails, onCloseDetails, refetch: stagesRefetch } = props
  const modalDelete = useBoolean()
  const modalEdit = useBoolean()
  const modalFinishSubStage = useBoolean()

  const stageQuery = useQuery(GET_SUB_STAGE, {
    variables: {
      id: subStageItem.id,
    },
    skip: !subStageItem.id,
  })

  const refetch = () => {
    stagesRefetch()
    stageQuery.refetch()
  }

  const subStage: IStage | null = useMemo(() => {
    if (!stageQuery.data) return null
    return stageQuery.data.subStage
  }, [stageQuery.data])

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
          <Tooltip title="Editar">
            <IconButton onClick={modalEdit.onTrue}>
              <Iconify icon="mdi:pencil" />
            </IconButton>
          </Tooltip>
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
    </Drawer>
  )
}
