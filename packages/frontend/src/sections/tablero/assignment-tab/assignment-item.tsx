import { IProject, IStage, TASK_STATE, TASK_STATE_ARRAY } from '@adp/shared'
import React, { useMemo } from 'react'
import NextLink from 'next/link'
import { Tooltip, Link, IconButton, Stack, Card, Box } from '@mui/material'
import { paths } from 'src/routes/paths'
import { fDate } from 'src/utils/format-time'
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import TextMaxLine from 'src/components/text-max-line'
import { colorFromAcpOrPacp, getTootipFromAcpOrPacp } from 'src/utils/average-completition'
import getLabelColor from 'src/utils/color-progress'
import { useBoolean } from 'src/hooks/use-boolean'
import ModalStartTask from './modal-start-task'

// ----------------------------------------------------------------------

type TProps = {
  project?: IProject | null
  stage?: IStage | null
  subStage?: IStage | null
}

export default function AssignmentItem(props: TProps) {
  const { project, stage, subStage } = props
  const modalStartTask = useBoolean()

  const { id, name, description, startDate, endDate, progress } = project ||
    stage ||
    subStage || {
    id: 0,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    progress: 0,
    stateId: 0,
  }

  const assignment = useMemo(() => {
    if (project)
      return {
        title: 'Proyecto',
        color: 'info',
        path: paths.dashboard.project.detail,
        acp: project.acp,
        pacp: project.pacp,
        stateId: project.stateId,
      }
    if (stage)
      return {
        title: 'Etapa',
        color: 'warning',
        path: paths.dashboard.stage.detail,
        acp: stage.acp,
        pacp: stage.pacp,
        stateId: stage.stateId,
      }
    if (subStage)
      return {
        title: 'Sub Etapa',
        color: 'success',
        path: paths.dashboard.subStage.detail,
        acp: subStage.acp,
        pacp: subStage.pacp,
        stateId: subStage.stateId,
      }
    return {
      title: '',
      color: 'default',
      path: '',
      acp: null,
      pacp: null,
      stateId: 0,
    }
  }, [project, stage, subStage])

  if (!project && !stage && !subStage) return null

  return (
    <Stack component={Card} direction="row">
      <Stack
        sx={{
          p: (theme) => theme.spacing(3, 3, 2, 3),
          width: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box>
            <Label variant="soft" sx={{ mr: 1 }} color={assignment.color as any}>
              {assignment.title}
            </Label>
            <Label variant="soft" color={getLabelColor(assignment.stateId)}>
              {TASK_STATE_ARRAY.find((state) => state.id === assignment.stateId)?.name || ''}
            </Label>
          </Box>
          <Box>
            {assignment.stateId === TASK_STATE.ON_HOLD && (
              <Tooltip title="Comenzar">
                <IconButton
                  // sx={{mr: -5}}
                  onClick={modalStartTask.onTrue}
                >
                  <Iconify icon="mdi:stopwatch-start-outline" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Ver detalle">
              <Link component={NextLink} href={assignment.path.replace(':id', String(id))}>
                <IconButton>
                  <Iconify icon="mdi:eye" />
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        </Stack>

        <Stack spacing={1} flexGrow={1}>
          <TextMaxLine variant="subtitle2" line={2}>
            {name}
          </TextMaxLine>

          <Tooltip title={description}>
            <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </TextMaxLine>
          </Tooltip>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              typography: 'caption',
              color: 'text.disabled',
            }}
          >
            <Tooltip
              title={getTootipFromAcpOrPacp(assignment.acp ?? null, assignment.pacp ?? null)}
            >
              <Box
                sx={{
                  backgroundColor: colorFromAcpOrPacp(
                    assignment.acp ?? null,
                    assignment.pacp ?? null
                  ),
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  marginRight: 1,
                }}
              />
            </Tooltip>
            {(progress * 100).toFixed(0)}%
          </Stack>
          <Stack
            spacing={1.5}
            flexGrow={1}
            direction="row"
            flexWrap="wrap"
            justifyContent="flex-end"
            sx={{
              typography: 'caption',
              color: 'text.disabled',
            }}
          >
            <Stack direction="row" alignItems="center">
              <Iconify icon="clarity:date-line" width={16} sx={{ mr: 0.5 }} />
              {fDate(new Date(startDate))} - {fDate(new Date(endDate))}
            </Stack>
          </Stack>
        </Stack>

        {modalStartTask.value && (
          <ModalStartTask
            modal={modalStartTask}
            project={project || null}
            stage={stage || null}
            subStage={subStage || null}
          />
        )}
      </Stack>
    </Stack>
  )
}
